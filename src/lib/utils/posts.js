/**
 * Utility functions for managing blog posts
 */

/**
 * Get all blog posts from the posts directory
 * @returns {Promise<Array>} Array of post objects with metadata
 */
export async function getAllPosts() {
    const postFiles = import.meta.glob('/src/posts/*.md');
    const posts = [];

    for (const path in postFiles) {
        const post = await postFiles[path]();
        const slug = path.split('/').pop().replace('.md', '');

        posts.push({
            slug,
            title: post.metadata.title,
            date: post.metadata.date,
            author: post.metadata.author || 'Dilip Shakya',
            category: post.metadata.category || 'Uncategorized',
            excerpt: post.metadata.excerpt || '',
            image: post.metadata.image || '/images/default-post.jpg'
        });
    }

    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a specific post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object>} Post object with content and metadata
 */
export async function getPostBySlug(slug) {
    try {
        const post = await import(`../../posts/${slug}.md`);
        return {
            slug,
            content: post.default,
            ...post.metadata
        };
    } catch (error) {
        return null;
    }
}

/**
 * Get the N most recent posts
 * @param {number} count - Number of posts to retrieve
 * @returns {Promise<Array>} Array of recent post objects
 */
export async function getLatestPosts(count = 3) {
    const allPosts = await getAllPosts();
    return allPosts.slice(0, count);
}

/**
 * Calculate reading time for a post
 * @param {string} content - The post content
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format a date string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
