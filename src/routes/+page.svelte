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
    <div class="hero-background"></div>
    <div class="container">
        <div class="hero-content animate-fade-in">
            <h1 class="hero-title">
                Welcome to <span class="gradient-text">Nepal</span>
            </h1>
            <p class="hero-subtitle">
                Namaste! I'm Dilip Shakya, your experienced tour and trekking
                guide. Let me help you discover the beauty, culture, and
                adventure of Nepal.
            </p>
            <div class="hero-buttons">
                <a href="#contact" class="btn btn-primary">Get in Touch</a>
                <a href="/blog" class="btn btn-secondary">Read My Blog</a>
            </div>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="about">
    <div class="container">
        <div class="about-content">
            <div class="about-text animate-slide-in-left">
                <h2>About Me</h2>
                <p>
                    Namaste Guest, I am Dilip Shakya, a passionate tour and
                    trekking guide based in Lalitpur, Nepal. With many years of
                    experience guiding travelers through the magnificent
                    landscapes and rich cultural heritage of Nepal, I've had the
                    privilege of sharing unforgettable experiences with people
                    from around the world.
                </p>
                <p>
                    My deep knowledge of Nepal's culture, traditions, and
                    natural beauty allows me to create authentic and memorable
                    journeys. Whether you're interested in trekking through the
                    Himalayas, exploring ancient temples, or experiencing
                    traditional Newari cuisine, I'm here to guide you every step
                    of the way.
                </p>
                <div class="about-highlights">
                    <div class="highlight glass">
                        <h3>🏔️ Mountain Expert</h3>
                        <p>Years of trekking experience in the Himalayas</p>
                    </div>
                    <div class="highlight glass">
                        <h3>🏛️ Cultural Guide</h3>
                        <p>Deep knowledge of Nepal's rich heritage</p>
                    </div>
                    <div class="highlight glass">
                        <h3>🍜 Food Enthusiast</h3>
                        <p>Expert in traditional Newari cuisine</p>
                    </div>
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
            <h2>Latest Stories</h2>
            <p>Discover Nepal through my experiences and adventures</p>
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
        <div class="contact-content glass">
            <h2>Get in Touch</h2>
            <p>Ready to explore Nepal? Let's plan your adventure together!</p>

            <div class="contact-info">
                <div class="contact-item">
                    <h3>📧 Email</h3>
                    <a href="mailto:info@dilipshakya.com.np"
                        >info@dilipshakya.com.np</a
                    >
                </div>

                <div class="contact-item">
                    <h3>📍 Location</h3>
                    <p>Lalitpur, Nepal</p>
                </div>

                <div class="contact-item">
                    <h3>🌐 Social Media</h3>
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
        position: relative;
        min-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: var(--space-20) 0;
    }

    .hero-background {
        position: absolute;
        inset: 0;
        background: radial-gradient(
                circle at 20% 50%,
                rgba(200, 90, 255, 0.15) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 80% 50%,
                rgba(90, 200, 255, 0.15) 0%,
                transparent 50%
            );
        z-index: -1;
    }

    .hero-content {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .hero-title {
        font-size: var(--font-size-6xl);
        margin-bottom: var(--space-6);
        line-height: 1.1;
    }

    .hero-subtitle {
        font-size: var(--font-size-xl);
        color: var(--color-text-secondary);
        margin-bottom: var(--space-8);
        line-height: 1.6;
    }

    .hero-buttons {
        display: flex;
        gap: var(--space-4);
        justify-content: center;
        flex-wrap: wrap;
    }

    /* About Section */
    .about {
        padding: var(--space-20) 0;
    }

    .about-content {
        max-width: var(--max-width-lg);
        margin: 0 auto;
    }

    .about h2 {
        font-size: var(--font-size-4xl);
        margin-bottom: var(--space-6);
        background: var(--color-accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .about p {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        line-height: 1.8;
        margin-bottom: var(--space-6);
    }

    .about-highlights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-6);
        margin-top: var(--space-10);
    }

    .highlight {
        padding: var(--space-6);
        border-radius: var(--radius-xl);
        transition: transform var(--transition-base);
    }

    .highlight:hover {
        transform: translateY(-5px);
    }

    .highlight h3 {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-3);
    }

    .highlight p {
        font-size: var(--font-size-base);
        margin-bottom: 0;
    }

    /* Latest Posts Section */
    .latest-posts {
        padding: var(--space-20) 0;
        background: var(--color-bg-secondary);
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--space-12);
    }

    .section-header h2 {
        font-size: var(--font-size-4xl);
        margin-bottom: var(--space-4);
        background: var(--color-accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-header p {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
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
        color: var(--color-text-secondary);
        font-size: var(--font-size-lg);
        padding: var(--space-12) 0;
    }

    /* Contact Section */
    .contact {
        padding: var(--space-20) 0;
    }

    .contact-content {
        max-width: var(--max-width-md);
        margin: 0 auto;
        padding: var(--space-12);
        border-radius: var(--radius-2xl);
        text-align: center;
    }

    .contact h2 {
        font-size: var(--font-size-4xl);
        margin-bottom: var(--space-4);
        background: var(--color-accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .contact-content > p {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        margin-bottom: var(--space-10);
    }

    .contact-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-8);
        text-align: left;
    }

    .contact-item h3 {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-3);
    }

    .contact-item p,
    .contact-item a {
        color: var(--color-text-secondary);
        font-size: var(--font-size-base);
    }

    .contact-item a:hover {
        color: var(--color-accent-primary);
    }

    .social-links {
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero {
            min-height: 70vh;
            padding: var(--space-12) 0;
        }

        .hero-title {
            font-size: var(--font-size-4xl);
        }

        .hero-subtitle {
            font-size: var(--font-size-lg);
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
