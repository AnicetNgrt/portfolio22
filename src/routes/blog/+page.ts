import type { PageLoad } from './$types';
import articles from '$lib/articles';

export const load: PageLoad = (_) => {
    return articles
}