/**
 * Testimonials API — runs as a Cloudflare Worker in front of the static site.
 *
 *   GET  /api/testimonials                 public: approved testimonials (+ Turnstile site key)
 *   POST /api/testimonials                 public: submit a testimonial (stored as "pending")
 *   GET  /api/admin/testimonials           admin (Bearer token): all testimonials
 *   POST /api/admin/testimonials/:id       admin: { action: "approve" | "reject" | "delete" }
 *
 * Everything else falls through to the static assets (the SvelteKit build).
 * Bindings: DB (D1), ASSETS. Secrets: ADMIN_TOKEN, TURNSTILE_SECRET (optional).
 * Vars: TURNSTILE_SITE_KEY (optional).
 */

const LIMITS = { name: 80, location: 80, trip: 100, message: 1000, minMessage: 20 };
const MAX_PENDING_PER_IP_PER_HOUR = 3;

let schemaReady = false;

async function ensureSchema(db) {
	if (schemaReady) return;
	await db.batch([
		db.prepare(`CREATE TABLE IF NOT EXISTS testimonials (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			location TEXT,
			trip TEXT,
			rating INTEGER,
			message TEXT NOT NULL,
			status TEXT NOT NULL DEFAULT 'pending',
			ip_hash TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			approved_at TEXT
		)`),
		db.prepare(`CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials (status, created_at)`)
	]);
	schemaReady = true;
}

function json(data, status = 200, extraHeaders = {}) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'content-type': 'application/json; charset=utf-8', ...extraHeaders }
	});
}

async function sha256(text) {
	const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
	if (typeof a !== 'string' || typeof b !== 'string') return false;
	const enc = new TextEncoder();
	const ab = enc.encode(a);
	const bb = enc.encode(b);
	if (ab.length !== bb.length) return false;
	let diff = 0;
	for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
	return diff === 0;
}

function adminAuth(request, env) {
	const expected = String(env.ADMIN_TOKEN || '').trim();
	if (!expected) return 'unconfigured'; // secret not set on this Worker
	const header = request.headers.get('authorization') || '';
	const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
	return safeEqual(token, expected) ? 'ok' : 'denied';
}

function clean(value, max) {
	return String(value ?? '')
		.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
		.trim()
		.slice(0, max);
}

async function verifyTurnstile(token, ip, env) {
	if (!env.TURNSTILE_SECRET) return true; // Turnstile not configured — skip
	if (!token) return false;
	const body = new FormData();
	body.append('secret', env.TURNSTILE_SECRET);
	body.append('response', token);
	if (ip) body.append('remoteip', ip);
	const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body
	});
	const data = await res.json();
	return data.success === true;
}

async function handlePublicList(env) {
	const { results } = await env.DB.prepare(
		`SELECT id, name, location, trip, rating, message, created_at
		 FROM testimonials WHERE status = 'approved'
		 ORDER BY approved_at DESC, id DESC LIMIT 100`
	).all();
	return json(
		{ testimonials: results, turnstileSiteKey: env.TURNSTILE_SITE_KEY || null },
		200,
		{ 'cache-control': 'public, max-age=60' }
	);
}

async function handleSubmit(request, env) {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request.' }, 400);
	}

	// Honeypot: real visitors never fill this hidden field. Pretend success for bots.
	if (body.website) return json({ ok: true }, 201);

	const name = clean(body.name, LIMITS.name);
	const location = clean(body.location, LIMITS.location);
	const trip = clean(body.trip, LIMITS.trip);
	const message = clean(body.message, LIMITS.message);
	const rating = Number.isInteger(body.rating) && body.rating >= 1 && body.rating <= 5 ? body.rating : null;

	if (!name) return json({ error: 'Please enter your name.' }, 400);
	if (message.length < LIMITS.minMessage)
		return json({ error: `Please write at least ${LIMITS.minMessage} characters.` }, 400);
	if (/https?:\/\/|www\./i.test(message))
		return json({ error: 'Links are not allowed in testimonials.' }, 400);

	const ip = request.headers.get('cf-connecting-ip') || '';
	if (!(await verifyTurnstile(body.turnstileToken, ip, env)))
		return json({ error: 'Spam check failed. Please try again.' }, 400);

	const ipHash = await sha256(`${ip}:${env.ADMIN_TOKEN || 'salt'}`);
	const recent = await env.DB.prepare(
		`SELECT COUNT(*) AS n FROM testimonials
		 WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')`
	)
		.bind(ipHash)
		.first();
	if (recent && recent.n >= MAX_PENDING_PER_IP_PER_HOUR)
		return json({ error: 'Too many submissions. Please try again later.' }, 429);

	await env.DB.prepare(
		`INSERT INTO testimonials (name, location, trip, rating, message, ip_hash)
		 VALUES (?, ?, ?, ?, ?, ?)`
	)
		.bind(name, location || null, trip || null, rating, message, ipHash)
		.run();

	return json({ ok: true }, 201);
}

async function handleAdminList(env) {
	const { results } = await env.DB.prepare(
		`SELECT id, name, location, trip, rating, message, status, created_at, approved_at
		 FROM testimonials ORDER BY
		   CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
		   id DESC LIMIT 500`
	).all();
	return json({ testimonials: results }, 200, { 'cache-control': 'no-store' });
}

async function handleAdminAction(request, env, id) {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request.' }, 400);
	}
	const action = body.action;
	if (action === 'approve') {
		await env.DB.prepare(
			`UPDATE testimonials SET status = 'approved', approved_at = datetime('now') WHERE id = ?`
		)
			.bind(id)
			.run();
	} else if (action === 'reject') {
		await env.DB.prepare(`UPDATE testimonials SET status = 'rejected' WHERE id = ?`).bind(id).run();
	} else if (action === 'delete') {
		await env.DB.prepare(`DELETE FROM testimonials WHERE id = ?`).bind(id).run();
	} else {
		return json({ error: 'Unknown action.' }, 400);
	}
	return json({ ok: true }, 200, { 'cache-control': 'no-store' });
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname.replace(/\/+$/, '');

		if (!path.startsWith('/api/')) return env.ASSETS.fetch(request);

		try {
			await ensureSchema(env.DB);

			if (path === '/api/testimonials') {
				if (request.method === 'GET') return await handlePublicList(env);
				if (request.method === 'POST') return await handleSubmit(request, env);
				return json({ error: 'Method not allowed.' }, 405);
			}

			if (path.startsWith('/api/admin/testimonials')) {
				const auth = adminAuth(request, env);
				if (auth === 'unconfigured')
					return json({ error: 'ADMIN_TOKEN is not set on the server yet.' }, 503);
				if (auth === 'denied') return json({ error: 'Unauthorized.' }, 401);
				if (path === '/api/admin/testimonials' && request.method === 'GET')
					return await handleAdminList(env);
				const match = path.match(/^\/api\/admin\/testimonials\/(\d+)$/);
				if (match && request.method === 'POST')
					return await handleAdminAction(request, env, Number(match[1]));
				return json({ error: 'Not found.' }, 404);
			}

			return json({ error: 'Not found.' }, 404);
		} catch (err) {
			console.error(err);
			return json({ error: 'Something went wrong. Please try again.' }, 500);
		}
	}
};
