<script lang=ts>
	import SectionCard from "../comps/sectionCard.svelte";
    import MainHeader from "../comps/mainHeader.svelte";
	import ScrollHint from "../comps/scrollHint.svelte";
    import Page from "../comps/page.svelte"
    import { sections } from "$lib/content"
	import SpinnyRolesBg from "../comps/spinnyRolesBg.svelte";
	import { perf } from "$lib/perfStores";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";
	import { hsl, newHSL } from "$lib/colorStores";
	import BenchmarkManager from "../hooks/benchmarkManager.svelte";

    let targetSpeed = 50

    const newSpeed = (speed: number) => {
        if (Math.abs(speed) < Math.abs(targetSpeed)) return speed * 1.1
        if (Math.sign(speed) == Math.sign(targetSpeed)) {
            targetSpeed = targetSpeed * -1
            hsl.set(newHSL($hsl))
        }
        return targetSpeed * 0.01
    }

    let speed = tweened(newSpeed(targetSpeed), {
        duration: 1000,
        easing: linear
    })

    const refreshSpeedLoop = () => {
        speed.set(newSpeed($speed))

        setTimeout(refreshSpeedLoop, 1000)
    }

    setTimeout(refreshSpeedLoop, 1000)

    onMount(() => {
        window.onclick = () => {
            setTimeout(() => speed.set(newSpeed($speed)), 500)
        }
    })

</script>

<BenchmarkManager />

<Page>
    <MainHeader/>
    
    <div class="content">
        <ScrollHint/>

        <div class="presentation bg-pattern bg-stars">
            <div class="portrait-container">
                <img class="portrait" src="/pictures/portraits/portrait1_square.webp" alt='August 22 - Last stair of \"Hotel 2 Février\" in Lomé, Togo.'>
            </div>
            <div class="text">
                Hi 👋! I'm Anicet Nougaret, a 21 year old passionate about programming, software engineering, design and art. Currently studying CS engineering at INSA in Lyon, France, working on many side-projects and trying to learn new things every day.
            </div>
        </div>

        <div class="sections">
            {#each sections.filter((_, i) => i != 0) as section, i}
                <SectionCard page={section} {i}/>
            {/each}
        </div>
    </div>

    <svelte:fragment slot="bg">
        <SpinnyRolesBg fixed benchmarking={true} lines={$perf+8} size={32/($perf+8)} speed={Number($speed.toFixed(3))} opacity={1} shift={37}/>
    </svelte:fragment>
</Page>



<style lang="sass">
    .content
        z-index: 1
        width: 100%
        background-color: $c0

    @keyframes hue-cycle
        0%
            filter: blur(30px) hue-rotate(180deg)

        30%
            filter: blur(0px) hue-rotate(0deg)

        70%
            filter: blur(0px) hue-rotate(0deg)

        100%
            filter: blur(30px) hue-rotate(180deg)

    .presentation
        padding: 2rem
        padding-top: 6rem
        padding-bottom: 3rem
        @include for-size(tablet-landscape-up)
            min-height: 100vh
        @include for-size(tablet-landscape-up)
            padding: 6rem 0rem 5rem 0rem

        display: flex
        flex-wrap: wrap
        row-gap: 4rem
        column-gap: 8rem
        color: $c5
        width: 100%
        justify-content: center
        align-items: center

        .text
            font-size: 1.5rem
            line-height: 1.7rem 

            @include for-size(tablet-landscape-up)
                font-size: 2.5rem
                line-height: 2.9rem
            font-weight: 450
            width: 30ch

        .portrait-container
            border-radius: 0.2rem
            overflow: hidden
            @include for-size(tablet-landscape-up)
                transform: perspective(800px) rotateY(20deg) rotateX(8deg)
                box-shadow: -0.6rem 0.3rem 0rem alpha(var(--color), 0.8), -0.5rem 0.25rem 0rem alpha(var(--color), 0.8), -0.4rem 0.2rem 0rem alpha(var(--color), 0.8), -0.3rem 0.15rem 0rem alpha(var(--color), 0.8),-0.2rem 0.1rem 0rem alpha(var(--color), 0.8) ,-0.1rem 0.05rem 0rem alpha(var(--color), 0.8)

        .portrait
            width: 30rem
            max-width: 100%
            height: min-content
            background-color: transparentize($c0, 0.2)
            @include for-size(tablet-landscape-up)
                box-shadow: inset -0.4rem 0.2rem 0rem alpha(var(--color), 0.8)
            padding: 1.3rem 1.7rem 1.3rem 1.3rem
            border: solid 0.8rem alpha(var(--color), 0.5)//transparentize($c5, 0.1)
            // @include for-size(tablet-landscape-up)
            //     box-shadow: -1rem 1rem 3rem alpha(var(--color), 0.5), -2rem 2rem 0rem alpha(var(--color), 0.3)

    .sections
        display: grid
        box-sizing: border-box
        grid-template-columns: repeat(1, 100%)
        padding: 0rem
        gap: 0rem
        @include for-size(tablet-landscape-up)
            grid-template-columns: repeat(2, calc(50% - 1rem))
            padding: 2rem
            gap: 2rem
            // padding: 3rem
        
        // grid-column-gap: 0rem
        // grid-row-gap: 0rem
        
        width: 100%
        background-color: alpha(var(--color), 0.5) //alpha(var(--color), 0.5)
</style>
