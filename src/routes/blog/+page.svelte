<script>
    import BlogCard from "$lib/components/BlogCard.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Blog - Dilip Shakya</title>
    <meta
        name="description"
        content="Read about Nepal's culture, food, trekking experiences, and more from Dilip Shakya's blog."
    />
</svelte:head>

<div class="blog-page">
    <div class="container">
        <header class="page-header">
            <span class="eyebrow">The Journal</span>
            <h1>Stories from the Trail</h1>
            <p>Culture, food, and trekking notes from across Nepal</p>
        </header>

        {#if data.posts && data.posts.length > 0}
            <div class="posts-grid">
                {#each data.posts as post}
                    <BlogCard {post} />
                {/each}
            </div>
        {:else}
            <div class="no-posts">
                <p>No blog posts available yet. Check back soon!</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .blog-page {
        padding: var(--space-20) 0;
        min-height: 70vh;
    }

    .page-header {
        text-align: center;
        margin-bottom: var(--space-16);
    }

    .page-header .eyebrow {
        justify-content: center;
    }

    .page-header h1 {
        font-size: var(--font-size-5xl);
        margin-bottom: var(--space-4);
    }

    .page-header p {
        font-size: var(--font-size-xl);
        color: var(--color-ink-soft);
    }

    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: var(--space-8);
    }

    .no-posts {
        text-align: center;
        padding: var(--space-20) 0;
    }

    .no-posts p {
        font-size: var(--font-size-lg);
        color: var(--color-ink-soft);
    }

    @media (max-width: 768px) {
        .blog-page {
            padding: var(--space-12) 0;
        }

        .page-header h1 {
            font-size: var(--font-size-4xl);
        }

        .posts-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
