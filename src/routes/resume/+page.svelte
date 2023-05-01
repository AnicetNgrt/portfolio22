<script lang=ts>
	import { pages, stories } from "$lib/content";
	import PageBanner from "../../comps/pageBanner.svelte";
	import Page from "../../comps/page.svelte";
	import PageBodyAndNav from "../../comps/pageBodyAndNav.svelte";
	import Story from "../../comps/story.svelte";
	import { tweened } from "svelte/motion";
	import { expoOut } from "svelte/easing";
    import { marked } from "marked";
    import IntersectionObserver from "svelte-intersection-observer";

    const route = "/resume"
    
    let selected = -1
    let collapsed = false
    let shift = tweened(0, { duration: 250, easing: expoOut })

    let leftIndicator: HTMLElement;
    let leftIntersecting: boolean = false;

    let rightIndicator: HTMLElement;
    let rightIntersecting: boolean = false;

    function onRightSwipe() {
        if (!leftIntersecting && Number.isInteger($shift))
            shift.set(Math.max($shift-1, 0))
    }

    function onLeftSwipe() {
        if (!rightIntersecting && Number.isInteger($shift))
            shift.set($shift+1)
    }

    let touchstartX = 0
    let touchendX = 0
</script>

<Page>
    <PageBanner/>
    <PageBodyAndNav {route}>
        <div 
        class="stories-nav" 
        on:touchstart={e => {
            touchstartX = e.changedTouches[0].screenX
        }}
        on:touchend={e => {
            touchendX = e.changedTouches[0].screenX
            if (touchendX < touchstartX && Math.abs(touchendX-touchstartX) > 40) onLeftSwipe()
            if (touchendX > touchstartX && Math.abs(touchendX-touchstartX) > 40) onRightSwipe()
        }}
        >
            <div class="stories-top">
                <h1>{pages[route].title.toLocaleUpperCase()}</h1>
                <div class:useless={leftIntersecting && rightIntersecting} class="controls">
                        <button class:disabled={leftIntersecting} on:click={onRightSwipe}>{"<-"}</button>
                        <button class:disabled={rightIntersecting} on:click={onLeftSwipe}>{"->"}</button>
                </div>
            </div>
            <div class:collapsed={collapsed} style={`transform: ${collapsed ? `translateX(-${$shift*6.5}rem)` : `translateX(calc(-${$shift} * calc(calc(73vh * calc(9 / 16)) + 1.5rem)))`}`} class="stories">
                <IntersectionObserver element={leftIndicator} bind:intersecting={leftIntersecting}>
                    <div class="indicator left" bind:this={leftIndicator}></div>
                </IntersectionObserver>
                <IntersectionObserver element={rightIndicator} bind:intersecting={rightIntersecting}>
                    <div class="indicator right" bind:this={rightIndicator}></div>
                </IntersectionObserver>
                {#each stories[route] as story, i}
                    <Story 
                        onclick={() => {
                            if (selected != i) {
                                if (!collapsed) shift.set(0)
                                selected = i
                                collapsed = true
                            } else {
                                selected = -1
                                collapsed = false
                            }
                        }} 
                        selected={selected == i}
                        {collapsed} 
                        {story} 
                        index={i}
                    />
                {/each}
                {#if collapsed}
                    <button on:click={() => {
                        collapsed = false
                        selected = -1
                    }} class="uncollapse">≡</button>
                {/if}
            </div>
        </div>
        {#if selected != -1}
            <div class="article-container">
                <div class="article">
                    <h1>My experience as a {stories[route][selected].title}</h1>
                    {#await marked.parse(stories[route][selected].article ?? "", { async: true })}
                        ...
                    {:then article} 
                        {@html article}
                    {/await}
                </div>
            </div>
        {/if}
    </PageBodyAndNav>
    
    <svelte:fragment slot="bg">
        <div class="bg"></div>
    </svelte:fragment>
</Page>

<style lang=sass>
    .indicator
        position: absolute
        height: 5rem
        width: 1rem

        &.right
            left: 100%

    .stories-nav
        width: 100%
        display: flex
        flex-direction: column
        gap: 2rem
        padding: 1.5rem
        @include for-size(desktop-up)
            align-items: center

    .article-container
        width: 100%
        display: flex

    .stories-top
        display: flex
        gap: 3rem
        align-items: center

        .controls
            display: flex
            flex-direction: column
            @include for-size(tablet-landscape-up)
                flex-direction: row
            gap: 0.25rem

            &.useless
                opacity: 0.25
                pointer-events: none
                position: relative

                background-color: var(--color)
                height: 0.2rem
                border-radius: 0.5rem
                    

                button
                    opacity: 0

        button
            display: flex
            justify-content: center
            align-items: center
            font-size: 2rem
            line-height: 1rem
            padding: 0.5rem 2rem
            font-family: $font-mono
            background-color: alpha(var(--color), 0.3)
            border: solid 0.2rem var(--color)
            color: $c0
            border-radius: 2rem
            cursor: pointer

        button.disabled
            opacity: 0.3
            pointer-events: none

    .stories
        position: relative
        display: flex
        align-self: start
        flex-direction: row
        @include for-size(tablet-landscape-up)
            flex-direction: row
        width: fit-content
        gap: 1.5rem

        .uncollapse
            display: flex
            justify-content: center
            align-items: center
            font-size: 2.5rem
            line-height: 1rem
            width: 5rem
            height: 5rem
            font-family: $font-text
            background-color: alpha(var(--color), 0.3)
            border: solid 0.2rem var(--color)
            color: $c0
            border-radius: 5rem
            cursor: pointer

    .stories.collapsed
        @include for-size(desktop-up)
            align-self: center

    h1
        line-height: 2.5rem
        font-size: 2.5rem
        color: var(--color)
        font-weight: 600

    .bg
        width: 100vw
        height: 100vh
        position: fixed
        background-size: contain
        // background: radial-gradient(900px at top 0% right 20%, #150944b6, transparent), radial-gradient(800px at top 4% left 30%, #14556a55, transparent), radial-gradient(900px at bottom 25% right 10%, rgba(255, 242, 1, 0.163), transparent), radial-gradient(700px at bottom 0% left 20%, #41033b, #030006)
</style>

