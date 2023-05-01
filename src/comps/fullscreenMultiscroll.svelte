<script lang=ts>
    import type { PanelState } from "$lib/panelState"
	import type { Writable } from "svelte/store";
	import FullscreenPanel from "./fullscreenPanel.svelte";
	import Marquee from "./marquee.svelte";

    export let lines: number
    export let speeds: number[] = []
    export let state: Writable<PanelState>
</script>

<FullscreenPanel {state}>
    {#each [...new Array(lines)] as _, i}
        <div class="multiscroll
        " style={`font-size: ${25/lines}vh`}>
            <Marquee speed={speeds.length-1 >= i ? speeds[i] : 0.1*(0.5-Math.random()) }>
                <div class="content">
                    <slot {i}/>
                </div>
            </Marquee>
        </div>
    {/each}
</FullscreenPanel>

<style lang=sass>
    .multiscroll
        opacity: 0.8
        height: fit-content
        width: 100%
        background-color: transparentize($c5, 0.2) //alpha(var(--color), 0.8)
        //background-attachment: fixed
        padding: 0.5rem 0rem
        display: flex
        align-items: center

    .content
        height: fit-content
        display: flex
        align-items: center
        margin-left: -0.1em
        padding: 0.1em 0em
        border: dotted 0.4rem alpha(var(--color), 0.3)
        border-left: none
        border-right: none
        color: $c0
</style>