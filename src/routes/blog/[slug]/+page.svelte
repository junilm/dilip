<script>
	import { formatDate } from "$lib/utils/posts.js";

	let { data } = $props();
</script>

<svelte:head>
	<title
		>{data.error ? "Post Not Found" : data.metadata.title} - Dilip Shakya</title
	>
	<meta
		name="description"
		content={data.error
			? "Blog post not found"
			: data.metadata.excerpt || data.metadata.title}
	/>
</svelte:head>

{#if data.error}
	<div class="error-page">
		<div class="container">
			<h1>Post Not Found</h1>
			<p>The blog post you're looking for doesn't exist.</p>
			<a href="/blog" class="btn btn-primary">Back to Blog</a>
		</div>
	</div>
{:else}
	<article class="blog-post">
		<div class="container">
			<header class="post-header">
				<a href="/blog" class="back-link">← Back to Blog</a>

				<div class="post-meta">
					<span class="category"
						>{data.metadata.category || "Uncategorized"}</span
					>
					<span class="date">{formatDate(data.metadata.date)}</span>
				</div>

				<h1 class="post-title">{data.metadata.title}</h1>

				{#if data.metadata.excerpt}
					<p class="post-excerpt">{data.metadata.excerpt}</p>
				{/if}

				<div class="post-author">
					<span>By {data.metadata.author || "Dilip Shakya"}</span>
				</div>
			</header>

			{#if data.metadata.image}
				<div class="post-image">
					<img src={data.metadata.image} alt={data.metadata.title} />
				</div>
			{/if}

			<div class="post-content prose">
				<svelte:component this={data.content} />
			</div>

			<footer class="post-footer">
				<a href="/blog" class="btn btn-secondary">← Back to Blog</a>
			</footer>
		</div>
	</article>
{/if}

<style>
	.error-page {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.error-page h1 {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--space-4);
	}

	.error-page p {
		font-size: var(--font-size-lg);
		color: var(--color-ink-soft);
		margin-bottom: var(--space-8);
	}

	.blog-post {
		padding: var(--space-20) 0;
	}

	.post-header {
		max-width: 800px;
		margin: 0 auto var(--space-12);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		color: var(--color-ink-soft);
		font-weight: 500;
		margin-bottom: var(--space-6);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-brick);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
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
	}

	.post-title {
		font-size: var(--font-size-5xl);
		line-height: 1.2;
		margin-bottom: var(--space-6);
	}

	.post-excerpt {
		font-size: var(--font-size-xl);
		color: var(--color-ink-soft);
		line-height: 1.6;
		margin-bottom: var(--space-6);
	}

	.post-author {
		color: var(--color-ink-faint);
		font-size: var(--font-size-base);
	}

	.post-image {
		max-width: 1000px;
		margin: 0 auto var(--space-12);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	.post-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	.post-content {
		max-width: 800px;
		margin: 0 auto;
		font-size: var(--font-size-lg);
		line-height: 1.8;
	}

	.post-footer {
		max-width: 800px;
		margin: var(--space-16) auto 0;
		padding-top: var(--space-12);
		border-top: 1.5px solid var(--color-bg-tertiary);
	}

	@media (max-width: 768px) {
		.blog-post {
			padding: var(--space-12) 0;
		}

		.post-title {
			font-size: var(--font-size-3xl);
		}

		.post-excerpt {
			font-size: var(--font-size-lg);
		}

		.post-content {
			font-size: var(--font-size-base);
		}
	}
</style>
