<script lang=ts>
    import "../styles/app.sass"
	import Footer from "../comps/footer.svelte";
	import SpinnyRolesBg from "../comps/spinnyRolesBg.svelte";
    import { browser } from '$app/environment';
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
	import { loading } from "$lib/loadingStore";
	import { onMount } from "svelte";

    function randint(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    const HSLToRGB = (h: number, s: number, l: number) => {
        h = h/360
        s = s/100
        l = l/100
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2RGB = (p: number, q: number, t: number) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2RGB(p, q, h + 1/3);
            g = hue2RGB(p, q, h);
            b = hue2RGB(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    const RGBToHSL = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s
            ? l === r
            ? (g - b) / s
            : l === g
            ? 2 + (b - r) / s
            : 4 + (r - g) / s
            : 0;
        return [
            60 * h < 0 ? 60 * h + 360 : 60 * h,
            100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
            (100 * (2 * l - s)) / 2,
        ];
    };

    const newRGB = (rgb: number[]) => {
        let h = RGBToHSL(rgb[0], rgb[1], rgb[2])[0]

        return HSLToRGB(
            randint(h+100, h+180) % 360,
            randint(50, 100),
            randint(75, 90)
        )
    }

    const refreshColor = () => {
        rgb = newRGB(rgb)
        r.set(rgb[0])
        g.set(rgb[1])
        b.set(rgb[2])
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

    let rgb = newRGB([0, 0, 0])

    const r = tweened(rgb[0], {
        duration: 200,
        easing: linear
    })

    const g = tweened(rgb[1], {
        duration: 200,
        easing: linear 
    })

    const b = tweened(rgb[2], {
        duration: 200,
        easing: linear 
    })

    let speed = tweened(newSpeed(targetSpeed), {
        duration: 1000,
        easing: linear
    })

    if (browser) {
        window.onclick = () => {
            rgb = newRGB(rgb)
            r.set(rgb[0])
            g.set(rgb[1])
            b.set(rgb[2])
            
            setTimeout(() => speed.set(newSpeed($speed)), 500)
        }
    }

    const refreshSpeedLoop = () => {
        speed.set(newSpeed($speed))

        setTimeout(refreshSpeedLoop, 1000)
    }

    setTimeout(refreshSpeedLoop, 1000)

    $: hsl = RGBToHSL($r, $g, $b)

    let startUnshowingLoading = false
    let showLoading = true

    loading.subscribe((loading: number) => {
        if (loading >= 100) {
            startUnshowingLoading = true
            setTimeout(() => showLoading = false, 2000)
        }
    })

    const maxLines = 32
    const minLines = 8
    let predictedLines: number = (maxLines+minLines)/2
    let lines: number = (maxLines+minLines)/2
    $: size = 32/lines

    const sampleSize = 20
    $: predictedDeltas = [...new Array(sampleSize)].map(_ => 8)


    function onFpsToAnimateScaleChange(fpsToAnimateScale: number) {
        if ($loading < 70) {
            let predictedDelta = Math.round(((fpsToAnimateScale/2) * (maxLines-minLines)) + minLines) - predictedLines
            predictedLines = predictedLines + predictedDelta
            predictedDeltas.push(predictedDelta)
            if (predictedDeltas.length > sampleSize) predictedDeltas = predictedDeltas.slice(1)

            console.log(`predicted lines: ${predictedLines} | predicted delta ${predictedDelta}`)
        }
    }

    function updateLoading() {
        const meanPredDelta = predictedDeltas.reduce((sum, d) => sum+d, 0) / predictedDeltas.length

        loading.update((loading: number) => loading + 2 - (meanPredDelta/8))
        
        if ($loading > 70 && lines != predictedLines) {
            lines = predictedLines
        }

        setTimeout(() => window.requestAnimationFrame(updateLoading), Math.random()*200)
    }

    onMount(() => {
        window.requestAnimationFrame(updateLoading)
        window.onscroll = function () { 
            if (!startUnshowingLoading) {
                window.scrollTo(0, 0);
            }
        };
    })
</script>

<div  class="page" style={`--color-h: ${hsl[0]}; --color: hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}>
    {#if showLoading}
        <div class:unshow={startUnshowingLoading} class="loading">
            <h1><span class="zeroes">{$loading < 10 ? "00" : $loading < 100 ? "0" : ""}</span>{Math.min(Math.round($loading), 100)}<span class="percent">%</span></h1>
        </div>
    {/if}

    <div class="content">
        <slot/>
    </div>
    <Footer {lines}/>
    <div class="bg-container">
        <SpinnyRolesBg {onFpsToAnimateScaleChange} {lines} {size} stop={false} speed={Number($speed.toFixed(3))} opacity={1} shift={37}/>
    </div>
</div>

<style lang=sass>
    .loading
        position: fixed
        top: 0
        left: 0
        height: 100vh
        width: 100vw
        background-color: $c0
        z-index: 3
        display: flex
        justify-content: center
        align-items: center

        h1
            @include font-size(5rem)
            font-family: $font-mono
            font-weight: 400
            color: var(--color)

            .percent
                font-family: $font-display
                margin-left: 0.2rem
                opacity: 0.5
                @include font-size(2rem)

            .zeroes
                opacity: 0.5

    .loading.unshow
        transition: opacity 2s
        opacity: 0

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

    .page.loading
        overflow-y: hidden

    .content
        display: flex
        flex-direction: column
        align-items: center
        // border: double 3px $c5
        width: 100%
        height: max-content
</style>