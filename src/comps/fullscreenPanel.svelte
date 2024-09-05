<script lang=ts>
    import type { PanelState } from "$lib/panelState"
	import { onMount } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { tweened } from "svelte/motion";
	import type { Writable } from "svelte/store";

    export let state: Writable<PanelState>
    
    let fadeProgress = tweened(0.05)

    state.subscribe(state => {
        console.log(state)
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
            console.log("-> SHOWING")
            state.set("SHOWING")
        }
        if (progress <= 0 && $state != "HIDDEN") {
            state.set("HIDDEN")
        }
    })
    
    let isFirefox = false
    
    onMount(() => {
        isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

        window.onscroll = function () { 
            if ($state == "SHOWING") {
                window.scrollTo(0, 0);
            }
        };
    })

</script>

{#if $state != "HIDDEN"}
    <div class:firefox={isFirefox} style={`--progress: ${$fadeProgress}`} class="fullscreen">
        <div class="bg bg-pattern bg-stars"></div>
        <slot/>
    </div>
{/if}

<style lang=sass>
    @import "../styles/helpers.sass"

    @import "../styles/helpers.sass"

    .bg
        position: absolute
        top: 0%
        left: 0%
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.3

    .fullscreen
        position: fixed
        //top: 0
        left: 0
        height: 100vh
        width: 100vw
        background: linear-gradient($c5 -50%, var(--color) 150%) 
        z-index: 3
        display: flex
        flex-direction: column
        justify-content: space-around
        padding: 1rem 0rem
        backface-visibility: hidden

        // filter: blur(calc(calc(1 - var(--progress)) * 5px))
        // opacity: calc(var(--progress) + 0.5)

    .fullscreen:not(.firefox)
        transform: translateY(calc(calc(1 - var(--progress)) * -100vh))

    .fullscreen.firefox
        margin-top: calc(calc(1 - var(--progress)) * -100vh)

</style>