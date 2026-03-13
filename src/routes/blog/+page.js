import { getAllPosts } from '$lib/utils/posts.js';

export async function load() {
    const posts = await getAllPosts();

    return {
        posts
    };
}
