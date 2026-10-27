# Testimonials setup

Visitors submit testimonials on the site; they stay hidden until approved at `/admin`.
Backed by a Cloudflare Worker (`worker/index.js`) + D1 database. The table is created automatically.

## One-time setup
1. `npx wrangler login`
2. `npx wrangler d1 create dilip-testimonials` → copy the `database_id` into `wrangler.jsonc`
3. Commit + push (Cloudflare redeploys)
4. In Cloudflare dashboard → your Worker → Settings → Variables and Secrets, add secret `ADMIN_TOKEN` (long random string)
5. (Recommended) Spam protection with Turnstile: create a widget at dash.cloudflare.com → Turnstile, put the site key in `wrangler.jsonc` → `vars.TURNSTILE_SITE_KEY`, and add secret `TURNSTILE_SECRET`

## Moderating
Open `https://dilipshakya.com.np/admin`, sign in with the admin token, approve / reject / delete.

## Local testing
`npm run cf:dev` (builds, then runs the Worker + site on localhost:8787). Add `--var ADMIN_TOKEN:test` to set a token locally.
