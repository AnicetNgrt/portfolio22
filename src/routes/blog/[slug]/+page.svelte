<script lang=ts>
	import Page from "../../../comps/page.svelte";
	import PageBodyAndNav from "../../../comps/pageBodyAndNav.svelte";
    import { marked } from "marked";
    import {markedHighlight} from "marked-highlight";
    import hljs from 'highlight.js';
    import 'highlight.js/styles/stackoverflow-light.css';
    import type { PageData } from './$types';

    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        async: true,
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));

    export let data: PageData;

    const route = "/blog"

    const description = data.article?.slice(0, 100) ?? "Anicet Nougaret's portfolio & blog.";
    const title = data.title ?? "Anicet Nougaret's portfolio & blog.";
    const application_name = "Anicet Nougaret's portfolio & blog.";
    const keywords = data.keywords?.join(" ") ?? "RUST, MACHINE_LEARNING, ELIXIR, SVELTE, DEV, FRANCE, PARIS, LYON, INSA, IUT, INFORMATIQUE, JAVASCRIPT, TYPESCRIPT, REACT, NODE, EUROPE, STUDENT, TOGO"
    const thumbnail = "anicetnougaret.fr" + data.cover ?? "/pictures/art/skyscrapper_1.jpg";

    // check whether thumbnail finishes with jpg, JPG or png and generate the correct og:image:type
    const thumbnail_type = thumbnail.slice(-3) == "jpg" || thumbnail.slice(-3) == "JPG" ? "image/jpeg" : "image/png";
</script>

<svelte:head>
    <meta name="application-name" content={application_name}/>
    <meta name="keywords" content={keywords}/>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@AniC_dev" />
    <meta name="twitter:creator" content="@AniC_dev" />
    <meta property="og:url" content="https://anicetnougaret.fr" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="http://{thumbnail}" />
    <meta property="og:image:secure_url" content="https://{thumbnail}" /> 
    <meta property="og:image:type" content={thumbnail_type} /> 
    <meta property="og:image:width" content="710" /> 
    <meta property="og:image:height" content="527" />
</svelte:head>

<Page>
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

