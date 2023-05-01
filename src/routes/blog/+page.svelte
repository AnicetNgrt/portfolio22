<script lang=ts>
	import { pages } from "$lib/content";
	import PageBanner from "../../comps/pageBanner.svelte";
	import Page from "../../comps/page.svelte";
	import PageBodyAndNav from "../../comps/pageBodyAndNav.svelte";
    import type { PageData } from './$types';

    const route = "/blog"

    export let data: PageData;
</script>

<Page>
    <PageBodyAndNav {route}>
        <div class="body">
            <h1>Anicet's blog</h1>
            <div class="articles">
                {#each Object.entries(data) as [articleId, article], i}
                    <div class="article-link-container">
                        <a class="article-link" href={`/blog/${articleId}`}>
                            <div class="front">
                                <h3 class="title">{article.title}</h3>
                                <div class="meta">Anicet ⁕ {article.date}</div>
                            </div>
                            <div class="cover" style={`filter: hue-rotate(${(i*(90))}deg)`}></div>
                            <img src={article.cover} alt={article.title}>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </PageBodyAndNav>
</Page>

<style lang=sass>
    .body
        display: flex
        flex-direction: column
        gap: 3rem
        @include for-size(tablet-landscape-up)
            gap: 3rem
        align-items: center
        padding: 2rem 1rem

    h1
        line-height: 2.5rem
        font-size: 2.5rem
        color: var(--color)
        font-weight: 600

    .articles
        max-width: 100%
        width: 75rem
        display: flex
        flex-wrap: wrap
        gap: 1rem
        padding: 0rem 1rem
        @include for-size(tablet-landscape-up)
            gap: 2rem
        margin-bottom: 2rem

    .article-link-container
        width: 100%
        @include for-size(tablet-landscape-up)
            width: calc(50% - 2rem)
        background-color: $c0
        border-radius: 1rem
        padding: 0.2rem
        border: solid 0.2rem $c5
        box-shadow: -0.5rem 0.5rem 0rem alpha(var(--color), 0.5)

    .article-link-container:hover
        transition: all 0.2s
        transform: translate(0.5rem, -0.5rem)
        box-shadow: -1rem 1rem 0rem alpha(var(--color), 0.5)

    .article-link
        position: relative
        width: 100%
        height: fit-content
        padding: 1rem 1.25rem
        @include for-size(tablet-landscape-up)
            padding: 2rem 2.5rem
        overflow: hidden
        z-index: 1
        text-decoration: none
        color: $c0
        border-radius: 0.8rem
        background-color: transparentize($c5, 0)
        display: flex

        .front
            display: flex
            flex-direction: column
            gap: 1rem

            .meta
                font-family: $font-mono

        .title
            font-size: 1.8rem
            line-height: 2.1rem
            @include for-size(tablet-landscape-up)
                font-size: 2.2rem
                line-height: 2.5rem
            font-weight: 500
            max-width: 17.5ch
            height: 8.7rem
            @include for-size(tablet-landscape-up)
                height: 10.8rem

        img
            object-fit: cover
            position: absolute
            z-index: -2
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            min-width: 100%
            opacity: 0.5
            filter: saturate(150%)

        .cover
            position: absolute
            z-index: -1
            top: 0%
            left: 0%
            width: 100%
            height: 100%
            background: linear-gradient(170deg, alpha(var(--color), 0.5), transparent)

    .article-link-container:nth-child(odd)
        @include for-size(tablet-landscape-up)
            border-radius: 0.2rem 1rem 0.2rem 1rem
        
        .article-link
            @include for-size(tablet-landscape-up)
                border-radius: 0.1rem 0.8rem 0.1rem 0.8rem

    .article-link-container:nth-child(even) 
        @include for-size(tablet-landscape-up)
            border-radius: 1rem 0.2rem 1rem 0.2rem
        
        .article-link
            @include for-size(tablet-landscape-up)
                border-radius: 0.8rem 0.1rem 0.8rem 0.1rem

</style>

