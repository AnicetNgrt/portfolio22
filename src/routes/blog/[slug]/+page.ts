import type { Article } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ params }) => {
    const article: Article = (await import(`../../../lib/articles/${params.slug}.ts`)).default
    return article
})