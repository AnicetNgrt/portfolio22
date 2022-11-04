<script lang=ts>
	import { onDestroy, onMount } from "svelte";

    export let speed: number;
    export let speedMultiplier: number = 1
    export let stop: boolean = false
    export let latency: number = 1/144
    export let stoppedPerformance = false
    export let onPerfRecorded: (perf: number) => void = _ => {}

    let wasDestroyed = false;
    let hovering = false;
    let width: number;
    let height: number;

    let shift = Math.random()*10;

    $: trullyStopped = hovering || stop || stoppedPerformance

    let progress = 0

    let t0 = performance.now();
    $: trueSpeed = trullyStopped ? 0 : speed * speedMultiplier /* * (slowdownWithLag ? Math.min(1.1-latencyScale, 1) : 1)*/

    let i = 0

    function animate() {
        let t1 = performance.now();
        if (trullyStopped) t1 -= 1000
        
        if (Math.random() > 0.99) {
            onPerfRecorded(Math.max(t1-t0, 1000/144))
        }
        t0 = performance.now();

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
        let finalLatency = trullyStopped ? (latency*1000 + 1000) : latency*1000
        if (!wasDestroyed)
            setTimeout(animate, finalLatency)
    }

    onMount(() => {
        animate()
    })

    onDestroy(() => {
        wasDestroyed = true
        console.log("oh no I'm dying")
    })
</script>
<!-- 
on:mouseenter={() => hovering = true} 
on:mouseleave={() => hovering = false} 
on:click={() => stopped = !stopped} -->

<div 
    bind:clientWidth={width}
    style={`--shift: ${-shift}%; height: ${height}px; /*filter: blur(${stoppedPerformance ? 2 : 0}px);*/ opacity: ${stoppedPerformance ? 0.5 : 1}`}  
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