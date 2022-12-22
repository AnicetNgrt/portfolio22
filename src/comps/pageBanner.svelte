<script lang=ts>
	import Marquee from "./marquee.svelte";
    import type { Page } from "../lib/content"

    export let page: Page

</script>

<a href="/" class="banner-container">
    <Marquee speed={0.3}>
        <div class="banner-content">
            {#each [...new Array(3)] as _}
                {#each [page.title, page.fr, "Anicet Nougaret's 2022 Portfolio"] as text}
                    <div class="banner-text">
                        {text}
                    </div>
                    <div class="banner-text">
                        {"⁕"}
                    </div>
                {/each}
            {/each}
        </div>
    </Marquee>
</a>

<style lang=sass>
    .banner-container
        width: 100%
        background-color: alpha(var(--color), 0.8)
        padding: 0.2rem 0rem

    .banner-content
        display: flex
        border: dotted 0.2rem transparentize($c0, 0.4)
        border-left: none
        border-right: none
        align-items: center
        gap: 1rem
        padding: 0.2rem 0rem
        padding-right: 1rem

    .banner-text
        margin-right: 0.5ch
        line-height: 1.1rem
        font-size: 1rem
        color: transparentize($c0, 0.4)
        //opacity: 0.3
        font-weight: 400
        font-family: $font-mono

</style>

