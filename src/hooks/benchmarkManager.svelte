<script lang=ts>
    import { loadingPanelState } from "$lib/panelsStores"
	import { benchmarking, loading, perf, reportPerformance } from "$lib/perfStores";
	import FullscreenPanel from "$src/comps/fullscreenPanel.svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

    let loaded = false

    const maxPerf = 24
    const minPerf = 0
    let predictedPerf: number = Math.round((maxPerf+minPerf)/3)

    const sampleSize = 20
    $: predictedDeltas = [...new Array(sampleSize)].map(_ => 8)

    loadingPanelState.set("SHOWING")

    reportPerformance.set((fpsToAnimateScale: number) => {
        if ($loading < 70) {
            let predictedDelta = Math.round(((fpsToAnimateScale/2) * (maxPerf-minPerf)) + minPerf) - predictedPerf
            predictedPerf = predictedPerf + predictedDelta
            predictedDeltas.push(predictedDelta)
            if (predictedDeltas.length > sampleSize) predictedDeltas = predictedDeltas.slice(1)

            //console.log(`predicted perf: ${predictedPerf} | predicted delta ${predictedDelta}`)
        } else {
            benchmarking.set(false)
        }
    })

    function updateLoading() {
        const meanPredDelta = predictedDeltas.reduce((sum, d) => sum+d, 0) / predictedDeltas.length

        const newLoading = $loading + 4 - (meanPredDelta/8)
        
        if (newLoading > 70 && $perf != predictedPerf) {
            perf.set(predictedPerf)
            
            localStorage.setItem("benchmark", JSON.stringify({
                when: Date.now(),
                perf: predictedPerf
            }))
        }
        if (newLoading >= 100) {
            loadingPanelState.set("FADE_OUT")
        }

        if (newLoading < 100)
            setTimeout(() => window.requestAnimationFrame(updateLoading), 50)

        loading.set(newLoading)
    }

    onMount(() => {
        loaded = true
        let willLoad = true

        const benchmarkStr = localStorage.getItem("benchmark")
        if (benchmarkStr != null) {
            const benchmark = JSON.parse(benchmarkStr)
            if (Date.now() - benchmark.when < 3600*1000) {
                predictedPerf = benchmark.perf
                perf.set(benchmark.perf)
                loading.set(100)
                loadingPanelState.set("FADE_OUT")
                willLoad = false
            }
        }

        if (willLoad) {
            benchmarking.set(true)
            loading.set(0)
            perf.set(predictedPerf)
            window.requestAnimationFrame(updateLoading)
        }
    })
</script>

<FullscreenPanel state={!loaded ? writable("SHOWING") : writable("HIDDEN")}></FullscreenPanel>

<slot/>