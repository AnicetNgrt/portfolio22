<script lang=ts>
    import "../styles/app.sass"
	import Footer from "../comps/footer.svelte";
	import SpinnyRolesBg from "../comps/spinnyRolesBg.svelte";
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
	import { loading } from "$lib/loadingStore";
	import { onMount } from "svelte";
	import FullscreenMultiscroll from "../comps/fullscreenMultiscroll.svelte";
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";

    let mounted = false

    function randint(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

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

    let startUnshowingLoading: boolean
    let showLoading: boolean
    
    let startUnshowingTransition: boolean
    let showTransition: boolean
    let from = ""
    let to = ""
    let exiting = false

    loading.subscribe((loading: number) => {
        if (loading >= 100) startUnshowingLoading = true
    })

    const maxLines = 32
    const minLines = 8
    let predictedLines: number = Math.round((maxLines+minLines)/3)
    let lines: number = predictedLines
    $: size = 32/lines

    const sampleSize = 20
    $: predictedDeltas = [...new Array(sampleSize)].map(_ => 8)

    function onFpsToAnimateScaleChange(fpsToAnimateScale: number) {
        if ($loading < 70) {
            let predictedDelta = Math.round(((fpsToAnimateScale/2) * (maxLines-minLines)) + minLines) - predictedLines
            predictedLines = predictedLines + predictedDelta
            predictedDeltas.push(predictedDelta)
            if (predictedDeltas.length > sampleSize) predictedDeltas = predictedDeltas.slice(1)

            //console.log(`predicted lines: ${predictedLines} | predicted delta ${predictedDelta}`)
        }
    }

    function updateLoading() {
        const meanPredDelta = predictedDeltas.reduce((sum, d) => sum+d, 0) / predictedDeltas.length

        loading.update((loading: number) => loading + 2 - (meanPredDelta/8))
        
        if ($loading > 70 && lines != predictedLines) {
            lines = predictedLines
            
            localStorage.setItem("benchmark", JSON.stringify({
                when: Date.now(),
                lines: lines
            }))
        }

        setTimeout(() => window.requestAnimationFrame(updateLoading), Math.random()*200)
    }

    onMount(() => {
        mounted = true

        const benchmarkStr = localStorage.getItem("benchmark")
        if (benchmarkStr != null) {
            const benchmark = JSON.parse(benchmarkStr)
            if (Date.now() - benchmark.when < 360*1000) {
                predictedLines = benchmark.lines
                lines = benchmark.lines
                showLoading = false
                loading.set(100)
            } else {
                showLoading = true
                startUnshowingLoading = false
            }
        } else {
            showLoading = true
            startUnshowingLoading = false
        }

        if (showLoading) {
            window.requestAnimationFrame(updateLoading)
        }

        window.onclick = () => {
            hsl = newHSL(hsl)
            
            setTimeout(() => speed.set(newSpeed($speed)), 500)
        }
    })

    beforeNavigate(navigation => {
        if (exiting) return
        
        startUnshowingTransition = false
        showTransition = false
        to = navigation.to?.url.pathname ?? ""
        from = navigation.from?.url.pathname ?? ""

        if (from.length > 0 && to.length > 0) {
            exiting = true
            showTransition = true
            navigation.cancel()
    
            const url = navigation.to?.url.toString() ?? "/"
            setTimeout(() => {
                goto(url)
            }, 500)
        }

    })

    afterNavigate(_ => {
        exiting = false
        setTimeout(() => {
            startUnshowingTransition = true
        }, 1500)
    })
</script>


<div  class="page" style={`--color-h: ${hsl[0]}; --color-s:${hsl[1]}%; --color-l:${hsl[2]}%; --color: hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}>
    <FullscreenMultiscroll animIn={true} let:i speeds={[-1, 0.2, -0.1, 0.2, -1]} show={showLoading} lines={5} startUnshowing={startUnshowingLoading}>
        {#if i == 2}
            {#each [...new Array(13)] as _}
                <div class="loading-indicator">
                    <div class="loading">LOADING</div>
                    <div class="number">
                        <span class="zeroes">{ $loading < 10 ? "00" : $loading < 100 ? "0" : "" }</span>{Math.min($loading, 100).toFixed(0)}
                    </div>
                    <div class="percent">%</div>
                </div>
                <div class="arrow">{'<-▨->'}</div>
            {/each}
        {:else if i == 1 || i == 3}
            {#each [...new Array(10)] as _}
            <div class="loading-disclaimer">
                anicetnougaret.fr
            </div>
            {/each}        
        {:else}
            {#each [...new Array(4)] as _}
            <div class="loading-emojis">
                <div>🧙‍♂️🪄⚡🗝️👔📫✨🐦🛣️📡🔗👋🌐🎲🎨🎴🗼</div>
            </div>
            {/each}
        {/if}
    </FullscreenMultiscroll>

    <FullscreenMultiscroll animIn={true} let:i speeds={[-1.5, 1, -0.5, 1, -1.5]} show={showTransition} lines={5} startUnshowing={startUnshowingTransition}>
        {#if i == 2}
            {#each [...new Array(10)] as _, j}
                <div class="transition-indicator">
                    {j % 2 == 0 ? from : to}
                </div>
                <div class="arrow">{j % 2 == 0 ? '==>' : '<=='}</div>
            {/each} 
        {:else if i == 1 || i == 3}
            {#each [...new Array(2)] as _}
            <div class="transition-decoration">
                {`<-▦-> Anicet Nougaret's 2022 portfolio`}
            </div>
            {/each}
        {:else}
            {#each [...new Array(4)] as _}
            <div class="loading-emojis">
                <div>🧙‍♂️🪄⚡🗝️👔📫✨🐦🛣️📡🔗👋🌐🎲🎨🎴🗼</div>
            </div>
            {/each}
        {/if}
    </FullscreenMultiscroll>


    <div class="content">
        <slot/>
    </div>
    <Footer {lines}/>
    <div class="bg-container">
        <SpinnyRolesBg {onFpsToAnimateScaleChange} {lines} {size} stop={false} speed={Number($speed.toFixed(3))} opacity={1} shift={37}/>
    </div>
</div>

<style lang=sass>
    .loading-disclaimer
        font-weight: 500
        font-family: $font-display
        font-size: 1em
        opacity: 0.5
        padding: 0em 0.2em

    .loading-emojis
        font-size: 1.4em
        display: flex
        line-height: 1.1em
        filter: saturate(0.9) sepia(0.2)
        flex-direction: column
        padding: 0.3em 0.1em
        align-items: center

    .transition-decoration
        font-family: $font-mono
        padding: 0em 0.5em
        opacity: 0.2
        font-weight: 700

    .transition-indicator
        padding: 0em 0.5em
        font-size: 1.5em
        font-weight: 600

        + .arrow
            font-size: 1em

    .loading-indicator
        padding: 0em 1em
        display: flex
        align-items: center
        font-size: 1em
        font-weight: 600
        font-family: $font-display

        .percent, .number
            font-weight: 500
            font-family: $font-mono

        .percent
            margin-left: 0.2em
            opacity: 0.5
            font-size: 0.6em

        .number 
            margin-left: 0.25em

            .zeroes
                opacity: 0.5

    .arrow
        font-weight: 500
        font-family: $font-mono
        opacity: 0.2

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