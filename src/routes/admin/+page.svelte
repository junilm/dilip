<script>
    import { onMount } from "svelte";

    let token = $state("");
    let authed = $state(false);
    let items = $state([]);
    let loading = $state(false);
    let error = $state("");
    let tab = $state("pending");

    onMount(() => {
        const saved = sessionStorage.getItem("admin-token");
        if (saved) {
            token = saved;
            load();
        }
    });

    async function api(path, options = {}) {
        const res = await fetch(path, {
            ...options,
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token.trim()}`,
            },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw Object.assign(new Error(data.error || "Request failed"), { status: res.status });
        return data;
    }

    async function load() {
        loading = true;
        error = "";
        try {
            const data = await api("/api/admin/testimonials");
            items = data.testimonials;
            authed = true;
            sessionStorage.setItem("admin-token", token.trim());
        } catch (e) {
            authed = false;
            sessionStorage.removeItem("admin-token");
            error =
                e.status === 401
                    ? "Wrong token."
                    : e.status === 503
                      ? "The server has no ADMIN_TOKEN secret yet. Add it in Cloudflare (Settings → Variables and Secrets) and deploy."
                      : e.message;
        } finally {
            loading = false;
        }
    }

    async function act(id, action) {
        if (action === "delete" && !confirm("Delete this testimonial permanently?")) return;
        try {
            await api(`/api/admin/testimonials/${id}`, {
                method: "POST",
                body: JSON.stringify({ action }),
            });
            await load();
        } catch (e) {
            error = e.message;
        }
    }

    function logout() {
        sessionStorage.removeItem("admin-token");
        token = "";
        authed = false;
        items = [];
    }

    let shown = $derived(items.filter((i) => i.status === tab));
    let counts = $derived({
        pending: items.filter((i) => i.status === "pending").length,
        approved: items.filter((i) => i.status === "approved").length,
        rejected: items.filter((i) => i.status === "rejected").length,
    });
</script>

<svelte:head>
    <title>Admin · Testimonials</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="admin">
    <div class="container">
        <span class="eyebrow">Private</span>
        <h1>Testimonials</h1>

        {#if !authed}
            <form
                class="login"
                onsubmit={(e) => {
                    e.preventDefault();
                    load();
                }}
            >
                <label>
                    <span>Admin token</span>
                    <input type="password" bind:value={token} autocomplete="current-password" required />
                </label>
                <button class="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Checking…" : "Sign in"}
                </button>
                {#if error}<p class="error">{error}</p>{/if}
            </form>
        {:else}
            <div class="toolbar">
                <div class="tabs">
                    {#each ["pending", "approved", "rejected"] as t}
                        <button class:active={tab === t} onclick={() => (tab = t)}>
                            {t} ({counts[t]})
                        </button>
                    {/each}
                </div>
                <button class="link" onclick={logout}>Sign out</button>
            </div>

            {#if error}<p class="error">{error}</p>{/if}

            {#if shown.length === 0}
                <p class="empty">Nothing {tab} right now.</p>
            {/if}

            <ul class="list">
                {#each shown as t (t.id)}
                    <li class="item">
                        <div class="item-head">
                            <strong>{t.name}</strong>
                            {#if t.rating}<span class="rating">{"★".repeat(t.rating)}</span>{/if}
                            <span class="meta">
                                {[t.location, t.trip].filter(Boolean).join(" · ")}
                            </span>
                            <span class="meta">{t.created_at} UTC</span>
                        </div>
                        <p class="message">{t.message}</p>
                        <div class="actions">
                            {#if t.status !== "approved"}
                                <button class="btn btn-primary" onclick={() => act(t.id, "approve")}>Approve</button>
                            {/if}
                            {#if t.status !== "rejected"}
                                <button class="btn btn-secondary" onclick={() => act(t.id, "reject")}>Reject</button>
                            {/if}
                            <button class="link danger" onclick={() => act(t.id, "delete")}>Delete</button>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .admin {
        padding: var(--space-16) 0;
        min-height: 70vh;
    }

    h1 {
        font-size: var(--font-size-4xl);
        margin: var(--space-2) 0 var(--space-8);
    }

    .login {
        max-width: 380px;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    label {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-ink-soft);
    }

    input {
        font-size: var(--font-size-base);
        padding: var(--space-3);
        background: var(--color-bg-secondary);
        border: 1.5px solid var(--color-ink);
        border-radius: var(--radius-sm);
        color: var(--color-ink);
    }

    .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--space-4);
        margin-bottom: var(--space-6);
    }

    .tabs {
        display: flex;
        gap: var(--space-2);
        flex-wrap: wrap;
    }

    .tabs button {
        font-family: var(--font-mono);
        font-size: var(--font-size-sm);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: var(--space-2) var(--space-4);
        background: transparent;
        color: var(--color-ink);
        border: 1.5px solid var(--color-ink);
        cursor: pointer;
    }

    .tabs button.active {
        background: var(--color-ink);
        color: var(--color-bg-primary);
    }

    .link {
        background: none;
        border: none;
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: var(--font-size-sm);
        color: var(--color-brick);
        text-decoration: underline;
    }

    .link.danger {
        margin-left: auto;
    }

    .list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
    }

    .item {
        background: var(--color-bg-secondary);
        border: 1.5px solid var(--color-ink);
        padding: var(--space-5);
    }

    .item-head {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
    }

    .rating {
        color: var(--color-brass);
    }

    .meta {
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        color: var(--color-ink-faint);
        text-transform: uppercase;
    }

    .message {
        white-space: pre-line;
        color: var(--color-ink);
    }

    .actions {
        display: flex;
        gap: var(--space-3);
        align-items: center;
        flex-wrap: wrap;
    }

    .actions .btn {
        padding: var(--space-2) var(--space-5);
    }

    .error {
        color: var(--color-error);
        font-weight: 500;
    }

    .empty {
        color: var(--color-ink-soft);
    }
</style>
