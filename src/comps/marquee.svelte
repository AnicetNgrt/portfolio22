<script lang=ts>
	import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";

    export let speed: number;
    export let speedMultiplier: number = 1
    export let externalStop: boolean = false
    export let stoppedPerformance = false
    export let onPerfRecorded: (perf: number) => void = _ => {}

    let wasDestroyed = false;
    let hovering = false;
    let width: number;
    let height: number;

    let shift = Math.random()*10;

    $: trullyStopped = hovering || externalStop || stoppedPerformance
    let stopped = false

    let progress = 0

    $: trueSpeed = trullyStopped ? 0 : speed * speedMultiplier /* * (slowdownWithLag ? Math.min(1.1-latencyScale, 1) : 1)*/

    let i = 0

    let previousTimeStamp = performance.now()
    const animate: FrameRequestCallback = (timestamp) => {
        const elapsed = timestamp - previousTimeStamp;
        const latency = elapsed/1000
        
        onPerfRecorded(elapsed)

        if (!trullyStopped) {
            let duration = Math.pow(width, 0.001)/((trueSpeed+0.0001)/10)
    
            if (isNaN(progress)) progress = 0
            let newProgress = progress + (latency/duration)
            if (newProgress > 1) {
                progress = newProgress - 1
            } else if (newProgress < 0) {
                progress = 1 - newProgress
            } else {
                progress = newProgress
            }
        }

        i += 1

        previousTimeStamp = timestamp;

        if (wasDestroyed || externalStop || hovering) {
            stopped = true
        } else {
            window.requestAnimationFrame(animate);
        }
    }

    onMount(() => {
        window.requestAnimationFrame(animate);
    })

    $: if (stopped && (!externalStop && !hovering)) {
        stopped = false
        window.requestAnimationFrame(animate);
    }

    onDestroy(() => {
        wasDestroyed = true
    })
</script>
<!-- 
on:mouseenter={() => hovering = true} 
on:mouseleave={() => hovering = false} 
on:click={() => stopped = !stopped} -->

<div 
    bind:clientWidth={width}
    style={`--shift: ${-shift}%; height: ${height}px;  opacity: ${stopped || stoppedPerformance ? 0.5 : 1}`}  
    class="marquee-container"
>
    <div bind:clientHeight={height} style={`transform: translateX(${progress*-100}%)`} class="marquee-a"><slot/></div>
    <div style={`transform: translateX(${(1-progress)*100}%)`} class="marquee-b"><slot/></div>
</div>

<style>
    .marquee-container {
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .stopped .marquee-a {
        animation-play-state: paused;
    }

    .marquee-a {
        position: absolute;
        top: 0;
        left: var(--shift);
        height: fit-content;
        width: max-content;
        /* animation: scrollNormal var(--duration) linear 0s infinite var(--direction); */
    }

    /* .stopped .marquee-b {
        animation-play-state: paused;
    } */

    .marquee-b {
        position: absolute;
        top: 0;
        left: var(--shift);
        height: fit-content;
        width: max-content;
        /* animation: scrollMirror var(--duration) linear 0s infinite var(--direction); */
    }

    @keyframes -global-scrollNormal {
        0% {
            transform: translateX(0%);
        }

        100% {
            transform: translateX(-100%);
        }
    }

    @keyframes -global-scrollMirror {
        0% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(0%);
        }
    }
</style>