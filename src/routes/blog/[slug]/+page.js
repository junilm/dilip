export async function entries() {
    const postFiles = import.meta.glob('/src/posts/*.md');
    const entries = [];

    for (const path in postFiles) {
        const slug = path.split('/').pop().replace('.md', '');
        entries.push({ slug });
    }

    return entries;
}

export async function load({ params }) {
    try {
        const post = await import(`../../../posts/${params.slug}.md`);

        return {
            content: post.default,
            metadata: post.metadata
        };
    } catch (error) {
        return {
            error: 'Post not found'
        };
    }
}
