<script lang=ts>
	import { mod, randint } from "$lib/math";

    export let width: number
    export let height: number
    export let pictures: {src: string, alt: string, width: number, height: number}[]

    let index = 0

    const min = 16
    const max = 22
    let slotsTopLeft = [...new Array(8)].map(_ => ({ sx: randint(-1*max, -1*min), sy: randint(-1*max, -1*min) }))
    let slotsBotRight = [...new Array(8)].map(_ => ({ sx: randint(min, max), sy: randint(min, max) }))
    let slotsTopRight = [...new Array(8)].map(_ => ({ sx: randint(min, max), sy: randint(-1*max, -1*min) }))
    let slotsBotLeft = [...new Array(8)].map(_ => ({ sx: randint(-1*max, -1*min), sy: randint(min, max) }))
    let slots = [slotsTopLeft, slotsBotRight, slotsTopRight, slotsBotLeft]
    if (randint(0, 2) >= 1) slots = [slots[2], slots[3], slots[0], slots[1]]
    if (randint(0, 2) >= 1) slots = slots.reverse()

    console.log(slots)
</script>

<div class="caroussel" style={`--width: ${width}px; --height: ${height}px`}>
    <div class="pictures">
        {#each pictures.filter((_, i) => i != index) as picture, i}
        <div class="img behind" style={`opacity: ${(i+1)/pictures.length}; --ratio: ${picture.width/picture.height}; --tx: ${slots[i % 4][Math.round(i/4) % 8].sx}%; --ty: ${slots[i % 4][Math.round(i/4) % 8].sy}%`}>
            <img src={picture.src} alt={picture.alt}>
        </div>
        {/each}
        <div class="img" style={`--ratio: ${pictures[index].width/pictures[index].height}`}>
            <img src={pictures[index].src} alt={pictures[index].alt}>
            <div class="caption">{pictures[index].alt}</div>
        </div>
    </div>
    <div class="controls">
        <button class="arrow-button" on:click={() => index = mod(index - 1, pictures.length)}>
            <div class="arrow">{"<-"}</div>
        </button>
        <button class="arrow-button" on:click={() => index = mod(index + 1, pictures.length)}>
            <div class="arrow">{"->"}</div>
        </button>
    </div>
</div>

<style lang=sass>
    @import "../styles/helpers.sass"

    @import "../styles/helpers.sass"

    .caroussel
        display: flex
        flex-direction: column
        gap: 1rem

        --scale: 0.7
        @include for-size(tablet-portrait-up)
            --scale: 0.8
        @include for-size(tablet-landscape-up)
            --scale: 0.9
        @include for-size(desktop-up)
            --scale: 1
        @include for-size(big-desktop-up)
            --scale: 1.1

        width: calc(var(--width) * var(--scale))
        height: calc(calc(var(--height) * var(--scale)) + 4rem)

    .pictures
        position: relative
        width: 100%
        height: calc(100% - 4rem)
        display: flex
        align-items: center
        justify-content: center

    .controls
        width: 100%
        flex-grow: 1
        display: flex
        justify-content: center
        gap: 1rem
        z-index: 1

        .arrow-button
            background-color: alpha(var(--color), 0.5)
            color: $c0
            display: flex
            justify-content: center
            align-items: center
            height: 3rem
            font-family: $font-mono
            border: solid 0.125rem var(--color)
            box-shadow: -0.25rem 0.25rem 0rem alpha(var(--color), 0.5)
            border-radius: 100%
            aspect-ratio: 1
            font-weight: 600
            font-size: 1.5rem
            cursor: pointer

        .arrow-button:hover
            background-color: var(--color)

    .img
        --inner-scale: 0.85
        @include for-size(tablet-portrait-up)
            --inner-scale: 0.8
        @include for-size(tablet-landscape-up)
            --inner-scale: 0.75

        position: relative
        width: min(calc(calc(var(--height) * var(--ratio)) * var(--inner-scale)), calc(calc(var(--width) * var(--scale)) * var(--inner-scale)))
        height: calc(calc(var(--height) * var(--scale)) * var(--inner-scale))

        z-index: 1
        border-radius: 0.7rem
        border: solid 0.2rem var(--color)

        @include for-size(tablet-landscape-up)
            padding: 0.2rem
            border-radius: 1rem
            background-color: $c0
            border: solid 0.25rem var(--color)
            box-shadow: -0.5rem 0.5rem 0rem alpha(var(--color), 0.5)

        .caption
            width: 120%
            position: absolute
            top: calc(100% + 0.5rem)
            left: 50%
            transform: translateX(-50%)
            font-size: 0.9rem
            @include for-size(tablet-landscape-up)
                top: calc(100% + 1rem)
                font-size: 1.2rem
            padding: 0rem 0.4rem
            border-radius: 0.2rem
            font-weight: 500
            text-align: center
            background-color: transparentize($c0, 0.5)
            backdrop-filter: blur(5px)
            -webkit-backdrop-filter: blur(5px)
            opacity: 1

        img
            height: 100%
            width: 100%
            object-fit: cover
            border-radius: 0.5rem

    .img.behind
        position: absolute
        z-index: 0
        top: 50%
        left: 50%
        transform: translate(calc(calc(var(--tx) * 0.7) - 50%), calc(calc(var(--ty) * 0.7) - 50%))
        @include for-size(tablet-landscape-up)
            transform: translate(calc(var(--tx) - 50%), calc(var(--ty) - 50%))
        opacity: 0.5
        //border: dashed 0.2rem var(--color)
        border: none
        box-shadow: none
        background-color: transparent

        img
            filter: blur(10px) saturate(5)
</style>
