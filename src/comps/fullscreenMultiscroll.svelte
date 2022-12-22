<script lang=ts>
    import type { PanelState } from "$lib/panelState"
	import { onMount } from "svelte";
	import { cubicOut, quadIn, quadOut, quintIn, quintOut } from "svelte/easing";
	import { tweened } from "svelte/motion";
	import type { Writable } from "svelte/store";
	import Marquee from "./marquee.svelte";

    export let lines: number
    export let speeds: number[] = []
    export let state: Writable<PanelState>

    let fadeProgress = tweened(1)

    state.subscribe(state => {
        //console.log(state)
        if (state == "FADE_IN") {
            fadeProgress.set(1, { duration: 1500, easing: cubicOut })
        }
        if (state == "FADE_OUT") {
            fadeProgress.set(0, { duration: 1500, easing: cubicOut })
        }
        if (state == "HIDDEN" && $fadeProgress != 0) {
            fadeProgress.set(0, { duration: 0 })
        }
        if (state == "SHOWING" && $fadeProgress != 1) {
            fadeProgress.set(1, { duration: 0 })
        }
    })

    fadeProgress.subscribe(progress => {
        if (progress >= 1 && $state != "SHOWING") {
            state.set("SHOWING")
        }
        if (progress <= 0 && $state != "HIDDEN") {
            state.set("HIDDEN")
        }
    })
    
    onMount(() => {
        window.onscroll = function () { 
            if ($state == "SHOWING") {
                window.scrollTo(0, 0);
            }
        };
    })
</script>

{#if $state != "HIDDEN"}
    <div style={`--progress: ${$fadeProgress}`} class="fullscreen">
        {#each [...new Array(lines)] as _, i}
        <div class="multiscroll" style={`font-size: ${25/lines}vh`}>
            <Marquee speed={speeds.length-1 >= i ? speeds[i] : 0.1*(0.5-Math.random()) }>
                <div class="content">
                    <slot {i}/>
                </div>
            </Marquee>
        </div>
        {/each}
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
        -webkit-backdrop-filter: blur(30px)
        z-index: 3
        display: flex
        flex-direction: column
        justify-content: space-around
        padding: 1rem 0rem

        margin-top: calc(calc(1 - var(--progress)) * -100vh)
        // filter: blur(calc(calc(1 - var(--progress)) * 5px))
        // opacity: calc(var(--progress) + 0.5)

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
</style>