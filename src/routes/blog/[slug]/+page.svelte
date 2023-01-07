<script lang=ts>
	import { pages } from "$lib/content";
	import PageBanner from "../../../comps/pageBanner.svelte";
	import Page from "../../../comps/page.svelte";
	import PageBodyAndNav from "../../../comps/pageBodyAndNav.svelte";
    import { marked } from "marked";
    import type { PageData } from './$types';

    export let data: PageData;

    const route = "/blog"

</script>

<Page>
    <PageBanner pageName={pages[route].title} pageSubName={data.title}/>
    <PageBodyAndNav subroute {route}>
        {#if data}
            <div class="article-container">
                <div class="article">
                    <h1>{data.title}</h1>
                    <p><i>Written by Anicet. Last updated: {data.date}</i></p>
                    {#await marked.parse(data.article ?? "", { async: true })}
                        ...
                    {:then article} 
                        {@html article}
                    {/await}
                </div>
            </div>
        {/if}
    </PageBodyAndNav>
</Page>

<style lang=sass>
    .article-container
        width: 100%
        display: flex
        padding-bottom: 1rem
</style>

