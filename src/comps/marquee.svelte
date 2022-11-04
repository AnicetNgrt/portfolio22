<script lang=ts>
	import { onDestroy, onMount } from "svelte";

    export let speed: number;
    export let speedMultiplier: number = 1
    export let stop: boolean = false
    export let stopIfFpsBelow: number = 8
    export let slowdownWithLag: boolean = true

    let wasDestroyed = false;
    let stopped = false;
    let stoppedPerformance = stopIfFpsBelow != 0;
    let hovering = false;
    let width: number;
    let height: number;

    let shift = Math.random()*10;

    $: trullyStopped = stopped || hovering || stop || stoppedPerformance

    let progress = 0
    const minLatency = 1/144
    const maxLatency = 1/(stopIfFpsBelow+1)
    let latency = minLatency
    let restartIfFpsAbove = stopIfFpsBelow * 2.5

    let t0 = performance.now();
    let perfs: number[] = []
    let lag = 0.5
    let moy = 0
    let lastReportedPerf = 1/(stopIfFpsBelow+1)
    $: latency = (lag*(maxLatency-minLatency))+minLatency
    $: latencyScale = ((latency - minLatency) / (maxLatency - minLatency))
    $: trueSpeed = trullyStopped ? 0 : speed * speedMultiplier * (slowdownWithLag ? Math.min(1.1-latencyScale, 1) : 1)

    let i = 0

    function animate() {
        let t1 = performance.now();
        if (trullyStopped) t1 -= 1000
        
        perfs.push(t1-t0);
        if (perfs.length > 3) perfs = perfs.slice(1)
        moy = perfs.reduce((sum, perf) => sum+perf, 0) / perfs.length / 1000
        t0 = performance.now();

        if (i % 20 == 0) {
            let scale = Math.max((moy - latency) / ((2*latency) - latency), 0)
            let perfDelta = ((scale*1.6)+0.1)
            lag = Math.min(lag * perfDelta, 1)
        }

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

    function reportPerfs() {
        if (slowdownWithLag == false)
            console.log(`latency: ${(1/latency).toFixed(4)} | fps: ${(1/moy).toFixed(4)} | lsc: ${latencyScale}`)

        if (1/moy <= stopIfFpsBelow) {
            console.log("STOPPING COZ LAG")
            stoppedPerformance = true
        } else if (1/moy >= restartIfFpsAbove) {
            console.log("RESTARTING")
            stoppedPerformance = false
        }

        lastReportedPerf = 1/moy

        if (!wasDestroyed)
            setTimeout(reportPerfs, 500)
    }

    onMount(() => {
        animate()
        setTimeout(reportPerfs, Math.random()*6000)
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
    style={`--shift: ${-shift}%; height: ${height}px; /*filter: blur(${stoppedPerformance ? 2 : 0}px);*/ opacity: ${stoppedPerformance ? (lastReportedPerf/restartIfFpsAbove)+0.1 : 1}`}  
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