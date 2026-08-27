<script>
    import BlogCard from "$lib/components/BlogCard.svelte";
    import PhotoGallery from "$lib/components/PhotoGallery.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Dilip Shakya - Tour and Trekking Guide in Nepal</title>
    <meta
        name="description"
        content="Experienced tour and trekking guide in Nepal. Explore Nepal's culture, food, and beautiful landscapes with Dilip Shakya."
    />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
    <div class="container hero-grid">
        <div class="hero-content animate-fade-in">
            <span class="eyebrow">Lalitpur, Nepal</span>
            <h1 class="hero-title">
                Namaste, I'm
                <span class="ink-underline"
                    >Dilip
                    <svg viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                        <path
                            d="M2 8.5C40 3 80 3 100 6.5C120 10 160 3 198 6"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                        />
                    </svg>
                </span>
            </h1>
            <p class="hero-subtitle">
                Your trekking and cultural guide through the valleys, trails
                and temples of Nepal — from Himalayan passes to the brick
                courtyards of the Kathmandu Valley.
            </p>
            <div class="hero-buttons">
                <a href="#contact" class="btn btn-primary">Get in Touch</a>
                <a href="/blog" class="btn btn-secondary">Read the Journal</a>
            </div>
        </div>

        <div class="hero-photo">
            <div class="photo-frame">
                <img src="/images/welcome.jpg" alt="Himalayan mountain view" />
            </div>
            <p class="photo-caption">Annapurna region, on the trail</p>
        </div>
    </div>

    <div class="hero-stamps">
        <div class="stamp">
            <span class="stamp-value">15+ yrs</span>
            <span class="stamp-label">Guiding</span>
        </div>
        <div class="stamp">
            <span class="stamp-value">Newari</span>
            <span class="stamp-label">Heritage</span>
        </div>
        <div class="stamp">
            <span class="stamp-value">EN / NP</span>
            <span class="stamp-label">Spoken</span>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="about">
    <div class="container about-grid">
        <div class="about-photo">
            <div class="photo-frame small">
                <img src="/images/gallery-1.jpg" alt="Trekking in the Himalayas" />
            </div>
        </div>
        <div class="about-text">
            <span class="eyebrow">About</span>
            <h2>A guide raised in the valley</h2>
            <p class="lead">
                I am Dilip Shakya, a tour and trekking guide based in
                Lalitpur — one of the three old royal cities of the
                Kathmandu Valley.
            </p>
            <p>
                For many years I've walked travelers through the
                Himalayas and through the brick lanes of Patan and
                Bhaktapur alike, sharing the two halves of Nepal I know
                best: its mountains and its Newari culture. Whether
                you're here for high passes, ancient temples, or a proper
                Newari feast, I'll show you the Nepal I grew up in.
            </p>
            <div class="about-highlights">
                <div class="highlight">
                    <h3>Mountain routes</h3>
                    <p>Years guiding treks across the Himalayan trails.</p>
                </div>
                <div class="highlight">
                    <h3>Cultural heritage</h3>
                    <p>Deep roots in the valley's temples and towns.</p>
                </div>
                <div class="highlight">
                    <h3>Newari cuisine</h3>
                    <p>A proper guide to the valley's traditional feasts.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Photo Gallery Section -->
<PhotoGallery />

<!-- Latest Blog Posts -->
<section class="latest-posts">
    <div class="container">
        <div class="section-header">
            <span class="eyebrow">The Journal</span>
            <h2>Latest Stories</h2>
            <p>Notes from the trail and the valley</p>
        </div>

        {#if data.latestPosts && data.latestPosts.length > 0}
            <div class="posts-grid">
                {#each data.latestPosts as post}
                    <BlogCard {post} />
                {/each}
            </div>

            <div class="view-all">
                <a href="/blog" class="btn btn-primary">View All Posts</a>
            </div>
        {:else}
            <p class="no-posts">
                No blog posts available yet. Check back soon!
            </p>
        {/if}
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact">
    <div class="container">
        <div class="contact-content">
            <div class="contact-heading">
                <span class="eyebrow">Get in Touch</span>
                <h2>Plan your trip</h2>
                <p>Write to me and let's put a route together.</p>
            </div>

            <div class="contact-info">
                <div class="contact-item">
                    <h3>Email</h3>
                    <a href="mailto:info@dilipshakya.com.np"
                        >info@dilipshakya.com.np</a
                    >
                </div>

                <div class="contact-item">
                    <h3>Location</h3>
                    <p>Lalitpur, Nepal</p>
                </div>

                <div class="contact-item">
                    <h3>Social</h3>
                    <div class="social-links">
                        <a
                            href="https://www.facebook.com/dilip.shakya.750"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-secondary"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.instagram.com/whiteyshakyadilip/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-secondary"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Hero Section */
    .hero {
        padding: var(--space-16) 0 0;
    }

    .hero-grid {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: var(--space-12);
        align-items: center;
    }

    .eyebrow {
        margin-bottom: var(--space-4);
    }

    .hero-title {
        font-size: var(--font-size-6xl);
        margin-bottom: var(--space-6);
        line-height: 1.1;
    }

    .hero-subtitle {
        font-size: var(--font-size-xl);
        color: var(--color-ink-soft);
        margin-bottom: var(--space-8);
        line-height: 1.6;
        max-width: 46ch;
    }

    .hero-buttons {
        display: flex;
        gap: var(--space-4);
        flex-wrap: wrap;
    }

    .hero-photo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .photo-frame {
        width: 100%;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        border: 10px solid var(--color-bg-secondary);
        outline: 1.5px solid var(--color-ink);
        box-shadow: var(--shadow-xl);
        transform: rotate(2deg);
        background: var(--color-bg-secondary);
    }

    .photo-frame.small {
        aspect-ratio: 3 / 4;
        transform: rotate(-2deg);
    }

    .photo-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .photo-caption {
        margin-top: var(--space-4);
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-ink-faint);
    }

    .hero-stamps {
        display: flex;
        justify-content: center;
        gap: var(--space-10);
        flex-wrap: wrap;
        padding: var(--space-16) 0 var(--space-16);
    }

    /* About Section */
    .about {
        padding: var(--space-20) 0;
        background: var(--color-bg-secondary);
    }

    .about-grid {
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: var(--space-12);
        align-items: start;
    }

    .about-text h2 {
        margin-bottom: var(--space-6);
    }

    .about-text .lead {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-style: italic;
        color: var(--color-ink);
        line-height: 1.5;
    }

    .about-text p {
        font-size: var(--font-size-base);
        color: var(--color-ink-soft);
        line-height: 1.8;
        margin-bottom: var(--space-6);
    }

    .about-highlights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: var(--space-6);
        margin-top: var(--space-8);
        padding-top: var(--space-8);
        border-top: 1.5px solid var(--color-bg-tertiary);
    }

    .highlight h3 {
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-2);
        color: var(--color-brick);
    }

    .highlight p {
        font-size: var(--font-size-sm);
        margin-bottom: 0;
    }

    /* Latest Posts Section */
    .latest-posts {
        padding: var(--space-20) 0;
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

    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-8);
        margin-bottom: var(--space-12);
    }

    .view-all {
        text-align: center;
    }

    .no-posts {
        text-align: center;
        color: var(--color-ink-soft);
        font-size: var(--font-size-lg);
        padding: var(--space-12) 0;
    }

    /* Contact Section */
    .contact {
        padding: var(--space-20) 0;
        background: var(--color-indigo);
    }

    .contact-content {
        max-width: var(--max-width-md);
        margin: 0 auto;
    }

    .contact-heading {
        margin-bottom: var(--space-10);
    }

    .contact-heading .eyebrow {
        color: var(--color-brass);
    }

    .contact-heading .eyebrow::before {
        background: var(--color-brass);
    }

    .contact-heading h2 {
        color: var(--color-bg-primary);
        margin-bottom: var(--space-3);
    }

    .contact-heading > p {
        font-size: var(--font-size-lg);
        color: #C6C2B8;
    }

    .contact-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-8);
        text-align: left;
        border-top: 1.5px solid var(--color-indigo-soft);
        padding-top: var(--space-10);
    }

    .contact-item h3 {
        font-family: var(--font-mono);
        font-size: var(--font-size-xs);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-brass);
        margin-bottom: var(--space-3);
    }

    .contact-item p,
    .contact-item a {
        color: var(--color-bg-primary);
        font-size: var(--font-size-base);
    }

    .contact-item a:hover {
        color: var(--color-brass);
    }

    .social-links {
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    }

    .social-links .btn-secondary {
        border-color: var(--color-bg-primary);
        color: var(--color-bg-primary);
    }

    .social-links .btn-secondary:hover {
        background: var(--color-bg-primary);
        color: var(--color-indigo);
    }

    /* Responsive Design */
    @media (max-width: 900px) {
        .hero-grid,
        .about-grid {
            grid-template-columns: 1fr;
        }

        .hero-photo {
            order: -1;
            max-width: 340px;
            margin: 0 auto;
        }

        .about-photo {
            max-width: 280px;
        }
    }

    @media (max-width: 768px) {
        .hero-subtitle {
            font-size: var(--font-size-lg);
        }

        .hero-stamps {
            gap: var(--space-6);
            padding: var(--space-12) 0;
        }

        .about,
        .latest-posts,
        .contact {
            padding: var(--space-12) 0;
        }

        .posts-grid {
            grid-template-columns: 1fr;
        }

        .contact-info {
            grid-template-columns: 1fr;
        }
    }
</style>
