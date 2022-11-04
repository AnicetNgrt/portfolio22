<script lang=ts>
	import { loading } from "$lib/loadingStore";
	import { onMount } from "svelte";
    import IntersectionObserver from "svelte-intersection-observer";

    import Roles from '../comps/roles.svelte';
    
    export let stop: boolean = false
    export let lines: number
    export let size: number
    export let shift: number
    export let speed: number
    export let opacity: number = 1

    let indexes: number[] = []
    for (let i = 0; i < lines; i++) indexes.push(i)
    
    let fullIndicator: HTMLElement;
    let fullIntersecting: boolean = false;

    let topIndicator: HTMLElement;
    let topIntersecting: boolean = false;

    let botIndicator: HTMLElement;
    let botIntersecting: boolean = false;
    
    let stopIfFpsBelow = 8
    let stoppedPerformance = true
    const minLatency = 1/144
    const maxLatency = 1/(stopIfFpsBelow+1)
    let restartIfFpsAbove = stopIfFpsBelow * 2.5

    const sampleSize = 4*lines
    let perfs: number[] = [...new Array(sampleSize)].map(_ => maxLatency)
    let lag = 0.5
    let moy = 0
    let lastReportedPerf = 1/(stopIfFpsBelow+1)
    let latency = minLatency
    let latencyScale = 1

    let reportedCount = 0

    const onPerfRecorded = (perf: number) => {
        if (Math.random() > 0.5) {
            perfs.push(perf)
            if (perfs.length > sampleSize) perfs = perfs.slice(1)
            moy = perfs.reduce((sum, perf) => sum+perf, 0) / perfs.length / 1000
        }
        if (reportedCount % 20 == 0) {
            let scale = Math.max((moy - latency) / ((2*latency) - latency), 0)
            let perfDelta = ((scale*0.6)+0.7)
            lag = Math.min(lag * perfDelta, 1)
            latency = (lag*(maxLatency-minLatency))+minLatency
            latencyScale = ((latency - minLatency) / (maxLatency - minLatency))
        }

        reportedCount += 1
        if (reportedCount % 5 == 0 &&  $loading < 100) {
            loading.set((reportedCount/(sampleSize))*100)
        }
    } 

    function reportPerfs() {
        console.log(`latency: ${(1/latency).toFixed(4)} | fps: ${(1/moy).toFixed(4)} | lsc: ${latencyScale}`)

        if (1/moy <= stopIfFpsBelow && !stoppedPerformance) {
            console.log("STOPPING COZ LAG")
            stoppedPerformance = true
        } else if (1/moy >= restartIfFpsAbove && stoppedPerformance) {
            console.log("RESTARTING")
            stoppedPerformance = false
        }

        lastReportedPerf = 1/moy
        setTimeout(reportPerfs, 1000)
    }

    onMount(() => {
        setTimeout(reportPerfs, 1000)
    })
    
</script>

<div
    class="spinnybg" style={`${stop && "filter: blur(2px)"}; height: ${100+shift}%; transform: translateY(${shift/-2}%); opacity: ${opacity}`}>
    
    {#if fullIntersecting}
        <div class="desc">
            {#each [...indexes].reverse() as index}
                <Roles {latency} {stoppedPerformance} {onPerfRecorded} speed={speed} size={size} stop={stop || !topIntersecting || !botIntersecting} {index} quantity={lines}/>
            {/each}
        </div> 
        <div class="desc">
            {#each indexes as index}
                <Roles {latency} {stoppedPerformance} {onPerfRecorded} speed={speed} size={size} stop={stop || !topIntersecting || !botIntersecting} {index} quantity={lines}/>
            {/each}
        </div>
    {/if}
</div>

<IntersectionObserver element={fullIndicator} bind:intersecting={fullIntersecting}>
    <div class="indicator" bind:this={fullIndicator}></div>
</IntersectionObserver>

<IntersectionObserver element={topIndicator} bind:intersecting={topIntersecting}>
    <div class="indicator top-indicator" bind:this={topIndicator}></div>
</IntersectionObserver>

<IntersectionObserver element={botIndicator} bind:intersecting={botIntersecting}>
    <div class="indicator bottom-indicator" bind:this={botIndicator}></div>
</IntersectionObserver>

<style lang=sass>
    .indicator
        z-index: -2
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 90%
        //background-color: transparentize(red, 0.5)

    .top-indicator
        height: 10px

    .bottom-indicator
        height: 5rem
        top: calc(100% - 5rem)

    .spinnybg
        z-index: -1
        position: fixed
        top: 0
        left: 0
        width: 100%

        .desc
            animation: fade-in 0.25s ease-in-out
            display: flex
            flex-direction: column

            width: 100%
            height: 50%
            max-height: 50%
            overflow-y: hidden
            justify-content: center
            opacity: 1

        @include for-size(tablet-landscape-up)
            flex-grow: 1

    @keyframes fade-in
        0%
            opacity: 0
        100%
            opacity: 1
</style>