<script lang=ts>
	import { loading } from "$lib/loadingStore";
	import { onMount } from "svelte";
    import IntersectionObserver from "svelte-intersection-observer";

    import Roles from '../comps/roles.svelte';
    
    export let stop: boolean = false
    export let shift: number
    export let speed: number
    export let opacity: number = 1

    const maxLines = 32
    const minLines = 8
    let predictedLines: number = (maxLines+minLines)/2
    let lines: number = (maxLines+minLines)/2
    $: size = 32/lines

    let indexes: number[] = []
    $: {
        indexes = []
        for (let i = 0; i < lines; i++) indexes.push(i)
    }
    
    let fullIndicator: HTMLElement;
    let fullIntersecting: boolean = false;

    let topIndicator: HTMLElement;
    let topIntersecting: boolean = false;

    let botIndicator: HTMLElement;
    let botIntersecting: boolean = false;
    
    let stoppedPerformance = false
    const minFps = 15
    const maxFps = 144
    const targetFps = (minFps+maxFps)/2
    let restartIfFpsAbove = minFps * 2.5

    $: sampleSize = 10*lines
    $: recordedLatencies = [...new Array(sampleSize)].map(_ => (1/targetFps)*1000)
    let lag = 0.5
    let meanFps = targetFps
    let fpsScale = 0.5

    const onPerfRecorded = (perf: number) => {
        recordedLatencies.push(perf)
        if (recordedLatencies.length > sampleSize) recordedLatencies = recordedLatencies.slice(1)
    } 

    function reportPerfs() {
        if (fullIntersecting) {
            const meanLatency = recordedLatencies.reduce((sum, perf) => sum+perf, 0) / recordedLatencies.length / 1000
            meanFps = 1/meanLatency
            let fpsScale = Math.min(Math.max((meanFps - minFps) / ((targetFps) - minFps), 0), 1)
            let fpsToAnimateScale = Math.max((meanFps - minFps) / ((targetFps) - minFps), 0)
            let perfDelta = ((fpsToAnimateScale*0.9)+0.1)
            lag = Math.min(lag * perfDelta, 1)

            console.log(`fps: ${meanFps.toFixed(3)} | scale: ${fpsScale.toFixed(3)} | restart: ${fpsToAnimateScale.toFixed(3)}`)
            
            if ($loading < 70) {
                predictedLines = Math.round(((fpsToAnimateScale/2) * (maxLines-minLines)) + minLines)
                console.log(`predicted lines: ${predictedLines}`)
            } else {
                if (meanFps <= minFps && !stoppedPerformance) {
                    console.log(`STOPPING COZ LAG ${meanFps} ${minFps}`)
                    stoppedPerformance = true
                } else if (meanFps >= restartIfFpsAbove && stoppedPerformance) {
                    console.log("RESTARTING")
                    stoppedPerformance = false
                }
            }
        }
        window.requestAnimationFrame(reportPerfs)
    }


    function updateLoading() {
        loading.update((loading: number) => loading + Math.random()*1)
        
        if ($loading < 100) setTimeout(updateLoading, Math.random()*200)
        if ($loading > 70 && lines != predictedLines) {
            lines = predictedLines
        }

        setTimeout(() => window.requestAnimationFrame(updateLoading), 1000)
    }

    onMount(() => {
        setTimeout(reportPerfs, 1000)
        window.requestAnimationFrame(updateLoading)
        window.requestAnimationFrame(reportPerfs)
    })
    
</script>

<div
    class="spinnybg" style={`${stop && "filter: blur(2px)"}; height: ${100+shift}%; transform: translateY(${shift/-2}%); opacity: ${opacity}`}>
    
    {#if fullIntersecting}
        <div class="desc">
            {#each [...indexes].reverse() as index}
                <Roles {stoppedPerformance} {onPerfRecorded} speed={speed*fpsScale} size={size} stop={stop || !topIntersecting || !botIntersecting} {index} quantity={lines}/>
            {/each}
        </div> 
        <div class="desc">
            {#each indexes as index}
                <Roles {stoppedPerformance} {onPerfRecorded} speed={speed*fpsScale} size={size} stop={stop || !topIntersecting || !botIntersecting} {index} quantity={lines}/>
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