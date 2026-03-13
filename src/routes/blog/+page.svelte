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
            <h1 class="gradient-text">Blog</h1>
            <p>Stories, experiences, and insights from Nepal</p>
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

    .page-header h1 {
        font-size: var(--font-size-5xl);
        margin-bottom: var(--space-4);
    }

    .page-header p {
        font-size: var(--font-size-xl);
        color: var(--color-text-secondary);
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
        color: var(--color-text-secondary);
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
