<script>
    import { onMount, tick } from "svelte";

    let testimonials = $state([]);
    let loaded = $state(false);
    let loadFailed = $state(false);
    let turnstileSiteKey = $state(null);

    let showForm = $state(false);
    let submitting = $state(false);
    let submitted = $state(false);
    let errorMessage = $state("");

    let name = $state("");
    let location = $state("");
    let trip = $state("");
    let rating = $state(5);
    let message = $state("");
    let consent = $state(false);
    let website = $state(""); // honeypot
    let turnstileToken = $state("");
    let turnstileEl = $state();
    let turnstileRendered = false;

    onMount(async () => {
        try {
            const res = await fetch("/api/testimonials");
            if (!res.ok) throw new Error("bad response");
            const data = await res.json();
            testimonials = data.testimonials ?? [];
            turnstileSiteKey = data.turnstileSiteKey;
        } catch {
            loadFailed = true;
        } finally {
            loaded = true;
        }
    });

    function loadTurnstile() {
        return new Promise((resolve) => {
            if (window.turnstile) return resolve();
            const s = document.createElement("script");
            s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
            s.async = true;
            s.onload = () => resolve();
            document.head.appendChild(s);
        });
    }

    async function openForm() {
        showForm = true;
        if (turnstileSiteKey && !turnstileRendered) {
            await loadTurnstile();
            await tick(); // wait for the container to exist
            if (turnstileEl && window.turnstile) {
                window.turnstile.render(turnstileEl, {
                    sitekey: turnstileSiteKey,
                    callback: (token) => (turnstileToken = token),
                    "expired-callback": () => (turnstileToken = ""),
                });
                turnstileRendered = true;
            }
        }
    }

    async function submit(event) {
        event.preventDefault();
        errorMessage = "";
        submitting = true;
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name,
                    location,
                    trip,
                    rating,
                    message,
                    website,
                    turnstileToken,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                errorMessage = data.error || "Something went wrong. Please try again.";
                if (window.turnstile && turnstileRendered) {
                    window.turnstile.reset();
                    turnstileToken = "";
                }
                return;
            }
            submitted = true;
            showForm = false;
        } catch {
            errorMessage = "Could not reach the server. Please try again.";
        } finally {
            submitting = false;
        }
    }

    function stars(n) {
        return "★".repeat(n ?? 0) + "☆".repeat(5 - (n ?? 0));
    }
</script>

<section id="testimonials" class="testimonials">
    <div class="container">
        <div class="section-header">
            <span class="eyebrow">Guest Book</span>
            <h2>Words from the Trail</h2>
            <p>What travelers say about walking Nepal together</p>
        </div>

        {#if loaded && testimonials.length > 0}
            <div class="grid">
                {#each testimonials as t (t.id)}
                    <figure class="card">
                        <span class="quote-mark" aria-hidden="true">“</span>
                        <blockquote>{t.message}</blockquote>
                        <figcaption>
                            {#if t.rating}
                                <span class="rating" aria-label="{t.rating} out of 5 stars"
                                    >{stars(t.rating)}</span
                                >
                            {/if}
                            <span class="who">{t.name}</span>
                            {#if t.location || t.trip}
                                <span class="meta"
                                    >{[t.location, t.trip].filter(Boolean).join(" · ")}</span
                                >
                            {/if}
                        </figcaption>
                    </figure>
                {/each}
            </div>
        {:else if loaded && !loadFailed}
            <p class="empty">No reviews yet — be the first to share your experience.</p>
        {/if}

        <div class="cta">
            {#if submitted}
                <div class="thanks" role="status">
                    <h3>Dhanyabad — thank you!</h3>
                    <p>
                        Your words have been received and will appear here once
                        Dilip has had a look.
                    </p>
                </div>
            {:else if !showForm}
                <button class="btn btn-primary" onclick={openForm}>
                    Share your experience
                </button>
            {/if}
        </div>

        {#if showForm}
            <form class="form" onsubmit={submit}>
                <h3>Leave a testimonial</h3>

                <div class="row">
                    <label>
                        <span>Your name *</span>
                        <input type="text" bind:value={name} maxlength="80" required />
                    </label>
                    <label>
                        <span>Where are you from?</span>
                        <input type="text" bind:value={location} maxlength="80" placeholder="e.g. Berlin, Germany" />
                    </label>
                </div>

                <label>
                    <span>Which trip or tour did you take?</span>
                    <input type="text" bind:value={trip} maxlength="100" placeholder="e.g. Annapurna Circuit, Patan heritage walk" />
                </label>

                <fieldset class="rating-field">
                    <legend>Your rating</legend>
                    <div class="rating-input">
                        {#each [1, 2, 3, 4, 5] as n}
                            <button
                                type="button"
                                class="star"
                                class:on={n <= rating}
                                aria-label="{n} star{n > 1 ? 's' : ''}"
                                aria-pressed={n === rating}
                                onclick={() => (rating = n)}>★</button
                            >
                        {/each}
                    </div>
                </fieldset>

                <label>
                    <span>Your experience *</span>
                    <textarea bind:value={message} rows="5" minlength="20" maxlength="1000" required></textarea>
                    <small>{message.length} / 1000</small>
                </label>

                <!-- honeypot: hidden from people, tempting to bots -->
                <div class="hp" aria-hidden="true">
                    <label>Website <input type="text" tabindex="-1" autocomplete="off" bind:value={website} /></label>
                </div>

                <label class="consent">
                    <input type="checkbox" bind:checked={consent} required />
                    <span>I agree that my name and testimonial may be shown publicly on this website.</span>
                </label>

                {#if turnstileSiteKey}
                    <div bind:this={turnstileEl}></div>
                {/if}

                {#if errorMessage}
                    <p class="error" role="alert">{errorMessage}</p>
                {/if}

                <div class="actions">
                    <button type="submit" class="btn btn-primary" disabled={submitting || (turnstileSiteKey && !turnstileToken)}>
                        {submitting ? "Sending…" : "Submit testimonial"}
                    </button>
                    <button type="button" class="btn btn-secondary" onclick={() => (showForm = false)}>
                        Cancel
                    </button>
                </div>
            </form>
        {/if}
    </div>
</section>

<style>
    .testimonials {
        padding: var(--space-20) 0;
        background: var(--color-bg-secondary);
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--space-12);
    }

    .section-header .eyebrow {
        justify-content: center;
    }

    .section-header h2 {
        margin-bottom: var(--space-3);
    }

    .section-header p {
        font-size: var(--font-size-lg);
        color: var(--color-ink-soft);
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-8);
        margin-bottom: var(--space-12);
    }

    .card {
        position: relative;
        background: var(--color-bg-primary);
        border: 1.5px solid var(--color-ink);
        padding: var(--space-8) var(--space-6) var(--space-6);
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    .quote-mark {
        position: absolute;
        top: -6px;
        left: var(--space-5);
        font-family: var(--font-display);
        font-size: 5rem;
        line-height: 1;
        color: var(--color-brass);
        pointer-events: none;
    }

    blockquote {
        font-family: var(--font-display);
        font-size: var(--font-size-lg);
        line-height: 1.55;
        color: var(--color-ink);
        margin-top: var(--space-6);
        white-space: pre-line;
    }

    figcaption {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        margin-top: auto;
        padding-top: var(--space-4);
        border-top: 1.5px dashed var(--color-bg-tertiary);
    }

    .rating {
        color: var(--color-brass);
        letter-spacing: 0.15em;
    }

    .who {
        font-family: var(--font-display);
        font-weight: 600;
        color: var(--color-ink);
    }

    .meta {
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-ink-faint);
    }

    .empty {
        text-align: center;
        color: var(--color-ink-soft);
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-8);
    }

    .cta {
        text-align: center;
    }

    .thanks {
        display: inline-block;
        max-width: 480px;
        padding: var(--space-6) var(--space-8);
        border: 1.5px dashed var(--color-brick);
    }

    .thanks h3 {
        color: var(--color-brick);
        margin-bottom: var(--space-2);
        font-size: var(--font-size-2xl);
    }

    .thanks p {
        margin: 0;
        color: var(--color-ink-soft);
    }

    /* Form */
    .form {
        max-width: var(--max-width-md);
        margin: var(--space-8) auto 0;
        padding: var(--space-8);
        background: var(--color-bg-primary);
        border: 1.5px solid var(--color-ink);
        box-shadow: var(--shadow-lg);
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
    }

    .form h3 {
        font-size: var(--font-size-2xl);
    }

    .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-5);
    }

    label {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    label > span,
    legend {
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-ink-soft);
    }

    input[type="text"],
    textarea {
        font-family: var(--font-body);
        font-size: var(--font-size-base);
        color: var(--color-ink);
        background: var(--color-bg-secondary);
        border: 1.5px solid var(--color-ink);
        border-radius: var(--radius-sm);
        padding: var(--space-3);
        width: 100%;
    }

    input[type="text"]:focus,
    textarea:focus {
        outline: 2px solid var(--color-brick);
        outline-offset: 1px;
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }

    small {
        align-self: flex-end;
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        color: var(--color-ink-faint);
    }

    fieldset {
        border: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .rating-input {
        display: flex;
        gap: var(--space-1);
    }

    .star {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.75rem;
        line-height: 1;
        color: var(--color-bg-tertiary);
        padding: var(--space-1);
        transition: color var(--transition-fast), transform var(--transition-fast);
    }

    .star.on {
        color: var(--color-brass);
    }

    .star:hover {
        transform: scale(1.12);
    }

    .consent {
        flex-direction: row;
        align-items: flex-start;
        gap: var(--space-3);
    }

    .consent span {
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        letter-spacing: 0;
        text-transform: none;
    }

    .consent input {
        margin-top: 4px;
        accent-color: var(--color-brick);
    }

    .hp {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    .error {
        color: var(--color-error);
        font-weight: 500;
        margin: 0;
    }

    .actions {
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    }

    .btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        transform: none;
    }

    @media (max-width: 768px) {
        .testimonials {
            padding: var(--space-12) 0;
        }

        .grid {
            grid-template-columns: 1fr;
        }

        .row {
            grid-template-columns: 1fr;
        }

        .form {
            padding: var(--space-6);
        }
    }
</style>
