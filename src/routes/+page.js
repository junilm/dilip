import { getLatestPosts } from '$lib/utils/posts.js';

export async function load() {
    const latestPosts = await getLatestPosts(4);

    return {
        latestPosts
    };
}
