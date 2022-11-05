<script lang=ts>
	import { onMount } from "svelte";
	import Marquee from "./marquee.svelte";

    export let lines: number
    export let startUnshowing: boolean
    export let show: boolean
    export let speeds: number[] = []
    export let animIn: boolean

    let mounted = false
    
    onMount(() => {
        mounted = true

        window.onscroll = function () { 
            if (show && !startUnshowing) {
                window.scrollTo(0, 0);
            }
        };
    })
</script>

{#if show}
<div class:anim-in={animIn} class:unshow={startUnshowing} class="fullscreen">
    {#if mounted}
    {#each [...new Array(lines)] as _, i}
    <div class="multiscroll" style={`font-size: ${25/lines}vh`}>
        <Marquee speed={speeds.length-1 >= i ? speeds[i] : 0.1*(0.5-Math.random()) }>
            <div class="content">
                <slot {i}/>
            </div>
        </Marquee>
    </div>
    {/each}
    {/if}
</div>
{/if}

<style lang=sass>
    .fullscreen
        position: fixed
        top: 0
        left: 0
        height: 100vh
        width: 100vw
        background-color: alpha(var(--color), 0.3)
        backdrop-filter: blur(30px)
        z-index: 3
        display: flex
        flex-direction: column
        justify-content: space-around
        padding: 1rem 0rem

    .fullscreen.anim-in
        animation: anim-in 0.5s
        margin-top: 0%
        filter: blur(0px)
        opacity: 1

    .fullscreen.unshow
        animation: anim-out 3s
        margin-top: -100%
        filter: blur(30px)
        opacity: 1

    .multiscroll
        height: fit-content
        width: 100%
        background: transparentize($c0, 0.2)
        padding: 0.5rem 0rem
        display: flex
        align-items: center

    .content
        height: fit-content
        display: flex
        align-items: center
        margin-left: -0.1em
        padding: 0.1em 0em
        border: dotted 0.2em alpha(var(--color), 0.2)
        border-left: none
        border-right: none
        color: var(--color)

    @keyframes anim-in
        0%
            margin-top: -100%
            filter: blur(30px)
            opacity: 1
        100%
            margin-top: 0
            filter: blur(0px)
            opacity: 1

    @keyframes anim-out
        0%
            margin-top: 0%
            filter: blur(0px)
            opacity: 1
        100%
            margin-top: -100%
            filter: blur(30px)
            opacity: 1

</style>