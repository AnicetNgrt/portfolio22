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
	import Caroussel from "../comps/carousselV1.svelte";

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

<Page>
    <MainHeader/>
    
    <div class="content">
        <ScrollHint/>

        <div class="presentation">
            <img class="portrait" src="/pictures/portraits/portrait1_square.jpg" alt='August 22 - Last stair of \"Hotel 2 Février\" in Lomé, Togo.'>
            <!-- <Caroussel width={450} height={450} pictures={[
                { 
                    src: "/pictures/portraits/portrait0_square.jpg", 
                    alt: "August 22 - Last stair of \"Hotel 2 Février\" in Lomé, Togo.",
                    width: 476,
                    height: 466
                },
                { 
                    src: "/pictures/portraits/portrait1_square.jpg", 
                    alt: "October 22 - Paris, France",
                    width: 1651,
                    height: 1668
                },
                { 
                    src: "/pictures/portraits/portrait2_square.jpg", 
                    alt: "September 22 - \"INSA de Lyon\", Lyon, France",
                    width: 1893,
                    height: 1803
                }
            ]}/> -->
            <div class="text">
                Hi 👋! I'm <b>Anicet Nougaret</b>, a 21 year old passionate about programming, software engineering, design and art. Currently <b>studying CS engineering</b> at INSA in Lyon, France, <b>working on many side-projects</b>, travelling and <b>learning new things every day</b>. <br><br> <b>Welcome to my portfolio!</b> I hope you will have a nice time discovering my work and passion.
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
        background-color: $c0
        padding: 2rem
        padding-top: 3rem
        padding-bottom: 6rem
        min-height: 100vh
        @include for-size(tablet-landscape-up)
            padding: 6rem 0rem 8rem 0rem

        display: flex
        flex-wrap: wrap
        row-gap: 4rem
        column-gap: 8rem
        color: var(--color)
        width: 100%
        justify-content: center
        align-items: center
        background: radial-gradient(500px at left 20% top 10%, alpha(var(--color), 0.3), transparent), radial-gradient(300px at left 100% top 100%, alpha(var(--color), 0.2), transparent), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter) saturate(0) contrast(200%) blur(0.5px)' opacity='0.5'/%3E%3C/svg%3E")
        backdrop-filter: blur(30px)
        -webkit-backdrop-filter: blur(30px)

        .text
            font-size: 1.5rem
            line-height: 2rem 

            @include for-size(tablet-landscape-up)
                font-size: 2.5rem
                line-height: 2.9rem
            font-weight: 400
            width: 30ch

        .portrait
            width: 30rem
            border-radius: 0.2rem
            padding: 0.2rem
            border: solid 0.3rem alpha(var(--color), 0.8)
            @include for-size(tablet-landscape-up)
                box-shadow: -1rem 1rem 3rem alpha(var(--color), 0.5), -2rem 2rem 0rem alpha(var(--color), 0.3)

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
        border-bottom: solid 0.2rem var(--color) 
</style>
