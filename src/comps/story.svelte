<script lang=ts>
	import type { Story } from "$lib/content";
    import IntersectionObserver from "svelte-intersection-observer";

    export let story: Story
    export let index: number = 0
    export let collapsed: boolean = false
    export let selected: boolean = false
    export let onclick: () => void
    
    let intersecting: boolean = false
    let indicator: HTMLDivElement

    let imgIndex = 0
    let nextImgIndex = 0
    let state: "set" | "trans" = "set" 

    function runCaroussel() {
        if (!collapsed && intersecting) {
            nextImgIndex = imgIndex+1
            state = "trans"
            setTimeout(() => {
                imgIndex = nextImgIndex
                state = "set"
                setTimeout(runCaroussel, Math.random()*7000+3000)
            }, 1000)
        } else {
            setTimeout(runCaroussel, Math.random()*7000+3000)
        }
    }

    setTimeout(runCaroussel, Math.random()*7000+3000)
</script>

<button on:click={() => onclick()} class:selected={selected} class:collapsed={collapsed} class="story-container">
    <IntersectionObserver element={indicator} bind:intersecting={intersecting}>
        <div class="indicator" bind:this={indicator}></div>
    </IntersectionObserver>
    <div class="bg-cover" style={`filter: hue-rotate(${(index*(90))}deg)`}></div>
    <div class="story">
        <div style={`animation-play-state: ${!collapsed && intersecting ? "running" : "paused"}`} class="pictures">
            {#if state == "trans"}
                <img class="transition" src={story.covers[nextImgIndex % story.covers.length]} alt="">
            {/if}
            <img src={story.covers[imgIndex % story.covers.length]} alt="">
        </div>
        {#if !collapsed}
            <h2 class="category">
                {story.category}
            </h2>
            <h1 class="title">
                {story.title}
            </h1>
            <h3 class="infos">
                {#if story.institution}
                    📍 {story.institution}
                    <br>
                {/if}
                {#if story.place}
                    🌍 {story.place}
                    <br>
                {/if}
                {#if story.start}
                    📆 {story.start}
                {/if}
                {#if story.end}
                    → {story.end}
                {/if}
            </h3>
            <div class="expand-indicator">click to know more</div>
        {/if}
    </div>
</button>

<style lang=sass>
    .story-container
        text-align: left
        z-index: 1
        cursor: pointer
        width: calc(73vh * calc(9 / 16))
        height: 73vh
        border-radius: 1rem
        border: none
        box-shadow: -0.5rem 0.5rem 0rem alpha(var(--color), 0.4)
        padding: 0.2rem
        position: relative

        .indicator
            width: 3rem
            height: 3rem
            position: absolute
            top: 1rem
            left: 1rem
            //background-color: red
            z-index: 1

        .bg-cover
            position: absolute
            width: calc(100% - 0.4rem)
            height: calc(100% - 0.4rem)
            border-radius: 0.8rem
            background: linear-gradient(150deg, alpha(var(--color), 1) 15%, alpha(var(--color), 0.0) 120%)
            transition: border-radius 0.2s
        
        transition: width 0.5s, height 0.5s, border-radius 0.2s

    .story-container.collapsed
        transition: width 0.5s, height 0.5s, border-radius 0.2s linear 0.3s
        border-radius: 100%
        width: 5rem
        height: 5rem

        .bg-cover
            transition: border-radius 0.2s linear 0.3s
            border-radius: 100%

        .story
            transition: border-radius 0.2s linear 0.3s
            border-radius: 100%

    .story-container.selected
        border: solid 0.2rem $c0
        background-color: $c5

    .story
        border-radius: 0.8rem
        width: 100%
        height: 100%
        position: relative
        overflow: hidden
        padding: 1rem 1.5rem
        display: flex
        flex-direction: column
        align-items: start
        gap: 0.3rem


        .category
            font-size: 1.5rem
            font-weight: 500
            color: $c0
            

        .infos
            font-size: 1.1rem
            font-weight: 500
            color: $c0
            margin-top: 1rem

        .expand-indicator
            position: absolute
            top: 100%
            left: 50%
            width: max-content
            display: flex
            align-items: center
            justify-content: center
            transform: translate(calc(-50% - 0rem), calc(-100% - 0.8rem))
            padding: 0.2rem 1rem
            border-radius: 2rem
            font-weight: 500
            font-size: 1.3rem
            color: $c0
            opacity: 0.6

        .title
            z-index: 1
            font-size: 2.8rem
            line-height: 2.6rem
            font-weight: 500
            color: $c0
            transition: line-height 1s, font-size 1s

        .pictures
            position: absolute
            top: 50%
            left: 50%
            z-index: -1
            @include for-size(desktop-up)
                animation: move 40s linear 0s infinite alternate
            width: 100%
            height: 100%
            transform: translate(-50%, -50%)
        
        img
            filter: saturate(150%)
            z-index: -2
            object-fit: cover
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            width: fit-content 
            max-width: 60rem
            min-height: 100%
            max-height: 100%

        img.transition
            z-index: -1
            animation: fade-in 1s
            opacity: 1

        transition: border-radius 0.2s
    
    .story-container:hover
        transition: all 0.2s
        transform: translate(0.5rem, -0.5rem)
        box-shadow: -1rem 1rem 0rem alpha(var(--color), 0.4)

        .bg-cover
            transition: all 0.2s

        .story
            transition: all 0.2s
            .expand-indicator
                background-color: var(--color)
                opacity: 0.8

            img
                transition: filter 0.2s
                filter: saturate(200%) brightness(120%)

    .story-container:hover.collapsed
        transform: translate(-0.2rem, 0.2rem)
        box-shadow: -0.3rem 0.3rem 0rem alpha(var(--color), 0.4)

        .story
            .expand-indicator
                background-color: var(--color)
                opacity: 0.8

            img
                transition: filter 0.2s
                filter: saturate(200%) brightness(120%)

    @keyframes fade-in
        0%
            opacity: 0
        100%
            opacity: 1

    @keyframes move
        0%
            transform: translate(-50%, -50%) scale(1)

        25%
            transform: translate(-60%, -55%) scale(1.1)

        50%
            transform: translate(-75%, -45%) scale(1.2)

        75%
            transform: translate(-35%, -50%) scale(1.2)

        100%
            transform: translate(-50%, -50%) scale(1)
</style>