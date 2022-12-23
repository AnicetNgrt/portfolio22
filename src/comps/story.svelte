<script lang=ts>
	import type { Story } from "$lib/content";

    export let story: Story
    export let index: number = 0
    
    let imgIndex = 0
    let nextImgIndex = 0
    let state: "set" | "trans" = "set" 

    function runCaroussel() {
        nextImgIndex = imgIndex+1
        state = "trans"
        setTimeout(() => {
            imgIndex = nextImgIndex
            state = "set"
            setTimeout(runCaroussel, Math.random()*7000+3000)
        }, 1000)
    }

    setTimeout(runCaroussel, Math.random()*7000+3000)
</script>

<div class="story-container">
    <div class="bg-cover" style={`filter: hue-rotate(${(index*72)}deg)`}></div>
    <div class="story">
        <div class="pictures">
            {#if state == "trans"}
                <img class="transition" src={story.covers[nextImgIndex % story.covers.length]} alt="">
            {/if}
            <img src={story.covers[imgIndex % story.covers.length]} alt="">
        </div>
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
    </div>
</div>

<style lang=sass>
    .story-container
        cursor: pointer
        aspect-ratio: 9/16
        height: 73vh
        border-radius: 2rem
        border: solid 0.2rem $c5
        box-shadow: -0.5rem 0.5rem 0rem alpha(var(--color), 0.4)
        padding: 0.2rem
        position: relative

        .bg-cover
            position: absolute
            width: calc(100% - 0.4rem)
            height: calc(100% - 0.4rem)
            border-radius: 1.7rem
            background: linear-gradient(150deg, alpha(var(--color), 1), alpha(var(--color), 0.0))
    
    .story
        border-radius: 1.7rem
        width: 100%
        height: 100%
        position: relative
        overflow: hidden
        padding: 1.5rem
        display: flex
        flex-direction: column
        gap: 1rem

        .infos
            font-size: 1rem
            font-weight: 500
            color: $c0

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
            font-size: 3rem
            line-height: 2.8rem
            font-weight: 500
            color: $c0

        .pictures
            position: absolute
            top: 50%
            left: 50%
            z-index: -1
            animation: move 40s linear 0s infinite alternate
            width: 100%
            height: 100%
        
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
    
    .story-container:hover
        transition: all 0.2s
        transform: translate(0.5rem, -0.5rem)
        box-shadow: -1rem 1rem 0rem alpha(var(--color), 0.4)

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