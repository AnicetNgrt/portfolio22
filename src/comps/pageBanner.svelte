<script lang=ts>
	import Marquee from "./marquee.svelte";
    import type { Page } from "../lib/content"

    export let pageName: string
    export let pageSubName: string = "-------------"

</script>

<a href="/" class="banner-container">
    <div class="indicator">
        <div class="banner-text">
            {"->"} Back to main page
        </div>
    </div>
    <Marquee speed={0.3}>
        <div class="banner-content">
            {#each [...new Array(3)] as _}
                {#each [pageName, pageSubName, "Anicet Nougaret's 2023 Portfolio & Blog"] as text}
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
    .indicator
        display: none
        position: absolute
        top: 0%
        left: 0%
        width: 100%
        height: 100%
        background-color: alpha(var(--color), 0.8)
        color: $c0
        z-index: 1
        justify-content: center
        align-items: center

    .banner-container
        // display: none
        // @include for-size(tablet-landscape-up)
        //     display: block
        width: 100%
        background-color: var(--color)
        padding: 0.2rem 0rem
        position: relative

    .banner-container:hover .indicator
        display: flex

    .banner-content
        display: flex
        border: solid 2px $c5
        border-left: none
        border-right: none
        align-items: center
        gap: 1rem
        padding: 0.2rem 0rem
        padding-right: 1rem

    .banner-text
        margin-right: 0.5ch
        line-height: 1.4rem
        font-size: 1.2rem
        color: $c0
        //opacity: 0.3
        font-weight: 400
        font-family: $font-mono

</style>

