<script lang=ts>
    import "../styles/app.sass"
	import Footer from "../comps/footer.svelte";
	import SpinnyRolesBg from "../comps/spinnyRolesBg.svelte";
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
    import { loadingPanelState, transitionPanelState  } from "$lib/panelsStores"
	import { onMount } from "svelte";
	import { beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LoadingPanel from "../comps/loadingPanel.svelte";
	import TransitionPanel from "../comps/transitionPanel.svelte";
	import { randint } from "$lib/math";

    let loading = 0

    const newHSL = (hsl: number[]) => {
        let h = hsl[0]
        return [
            randint(h+100, h+180) % 360,
            randint(50, 100),
            randint(75, 90)
        ]
    }

    const refreshColor = () => {
        hsl = newHSL(hsl)
    }

    let targetSpeed = -50

    const newSpeed = (speed: number) => {
        if (Math.abs(speed) < Math.abs(targetSpeed)) return speed * 1.1
        if (Math.sign(speed) == Math.sign(targetSpeed)) {
            targetSpeed = targetSpeed * -1
            refreshColor()
        }
        return targetSpeed * 0.01
    }

    let hsl = newHSL([0, 0, 0])

    let speed = tweened(newSpeed(targetSpeed), {
        duration: 1000,
        easing: linear
    })

    const refreshSpeedLoop = () => {
        speed.set(newSpeed($speed))

        setTimeout(refreshSpeedLoop, 1000)
    }

    setTimeout(refreshSpeedLoop, 1000)

    let from = "/"
    let to = "/"
    let exiting = false

    const maxLines = 32
    const minLines = 8
    let predictedLines: number = Math.round((maxLines+minLines)/3)
    let lines: number = predictedLines
    $: size = 32/lines

    const sampleSize = 20
    $: predictedDeltas = [...new Array(sampleSize)].map(_ => 8)

    function onFpsToAnimateScaleChange(fpsToAnimateScale: number) {
        if (loading < 70) {
            let predictedDelta = Math.round(((fpsToAnimateScale/2) * (maxLines-minLines)) + minLines) - predictedLines
            predictedLines = predictedLines + predictedDelta
            predictedDeltas.push(predictedDelta)
            if (predictedDeltas.length > sampleSize) predictedDeltas = predictedDeltas.slice(1)

            //console.log(`predicted lines: ${predictedLines} | predicted delta ${predictedDelta}`)
        }
    }

    function updateLoading() {
        const meanPredDelta = predictedDeltas.reduce((sum, d) => sum+d, 0) / predictedDeltas.length

        loading = loading + 2 - (meanPredDelta/8)
        
        if (loading > 70 && lines != predictedLines) {
            lines = predictedLines
            
            localStorage.setItem("benchmark", JSON.stringify({
                when: Date.now(),
                lines: lines
            }))
        }
        if (loading >= 100) {
            loadingPanelState.set("FADE_OUT")
        }

        if (loading < 100)
            setTimeout(() => window.requestAnimationFrame(updateLoading), Math.random()*200)
    }

    onMount(() => {
        const benchmarkStr = localStorage.getItem("benchmark")
        if (benchmarkStr != null) {
            const benchmark = JSON.parse(benchmarkStr)
            if (Date.now() - benchmark.when < 360*1000) {
                predictedLines = benchmark.lines
                lines = benchmark.lines
                loading = 100
                loadingPanelState.set("FADE_OUT")
            }
        }

        if ($loadingPanelState == "SHOWING") {
            window.requestAnimationFrame(updateLoading)
        }

        window.onclick = () => {
            hsl = newHSL(hsl)
            
            setTimeout(() => speed.set(newSpeed($speed)), 500)
        }
    })

    page.subscribe(page => {
        if (page.url.pathname == to) {
            console.log("ARRIVED")
            exiting = false
            setTimeout(() => transitionPanelState.set("FADE_OUT"), 1000)
        }
    })

    beforeNavigate(navigation => {
        if (exiting) return
        
        if (navigation.to?.url.pathname) {
            to = navigation.to?.url.pathname.slice()
        }
        if (navigation.from?.url.pathname) {
            from = navigation.from?.url.pathname.slice()
        }

        console.log(to)
        console.log(from)

        if (from.length > 0 && to.length > 0) {
            transitionPanelState.set("FADE_IN")
            navigation.cancel()

            transitionPanelState.subscribe(state => {
                if (state == "SHOWING") {
                    exiting = true
                    console.log(`->>> ${to}`)
                    goto(to)
                }
            })
        }

    })
</script>


<div  class="page" style={`--color-h: ${hsl[0]}; --color-s:${hsl[1]}%; --color-l:${hsl[2]}%; --color: hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}>
    <LoadingPanel  {loading}/>
    <TransitionPanel {from} {to}/>

    <div class="content">
        <slot/>
    </div>
    <Footer {lines}/>
    <div class="bg-container">
        <SpinnyRolesBg benchmarking={loading >= 70} {onFpsToAnimateScaleChange} {lines} {size} stop={false} speed={Number($speed.toFixed(3))} opacity={1} shift={37}/>
    </div>
</div>

<style lang=sass>
    .bg-container
        position: absolute
        top: 0
        left: 0
        height: 100vh
        width: 100%

    .page
        position: relative
        min-height: 100vh
        width: 100%

    .content
        display: flex
        flex-direction: column
        align-items: center
        // border: double 3px $c5
        width: 100%
        height: max-content
</style>