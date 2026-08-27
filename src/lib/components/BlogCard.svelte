<script>
    import { formatDate } from "$lib/utils/posts.js";

    let { post } = $props();
</script>

<article class="blog-card">
    <a href="/blog/{post.slug}" class="card-link">
        {#if post.image}
            <div class="card-image">
                <img src={post.image} alt={post.title} />
            </div>
        {/if}

        <div class="card-content">
            <div class="card-meta">
                <span class="category">{post.category}</span>
                <span class="date">{formatDate(post.date)}</span>
            </div>

            <h3 class="card-title">{post.title}</h3>

            {#if post.excerpt}
                <p class="card-excerpt">{post.excerpt}</p>
            {/if}

            <div class="card-footer">
                <span class="read-more">Read more →</span>
            </div>
        </div>
    </a>
</article>

<style>
    .blog-card {
        background: var(--color-bg-secondary);
        overflow: hidden;
        transition: all var(--transition-base);
        border: 1.5px solid var(--color-ink);
        height: 100%;
    }

    .blog-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
    }

    .card-link {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .card-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        position: relative;
        border-bottom: 1.5px solid var(--color-ink);
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
        filter: sepia(0.08) saturate(1.05);
    }

    .blog-card:hover .card-image img {
        transform: scale(1.05);
    }

    .card-content {
        padding: var(--space-6);
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .card-meta {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-4);
        font-size: var(--font-size-sm);
    }

    .category {
        font-family: var(--font-mono);
        border: 1px dashed var(--color-brick);
        color: var(--color-brick);
        padding: var(--space-1) var(--space-2);
        font-weight: 500;
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .date {
        font-family: var(--font-mono);
        color: var(--color-ink-faint);
        font-size: var(--font-size-xs);
    }

    .card-title {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-3);
        color: var(--color-ink);
        line-height: 1.3;
    }

    .card-excerpt {
        color: var(--color-ink-soft);
        margin-bottom: var(--space-4);
        line-height: 1.6;
        flex: 1;
    }

    .card-footer {
        margin-top: auto;
    }

    .read-more {
        color: var(--color-brick);
        font-weight: 600;
        font-family: var(--font-mono);
        font-size: var(--font-size-sm);
        transition: color var(--transition-fast);
    }

    .blog-card:hover .read-more {
        color: var(--color-brick-deep);
    }
</style>
