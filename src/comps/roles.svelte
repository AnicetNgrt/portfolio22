<script lang=ts>
	import { shuffle, wave } from "$lib/math";
	import Marquee from "./marquee.svelte";

    export let size: number
    export let index: number
    export let quantity: number
    export let stop: boolean
    export let speed: number
    export let onPerfRecorded: (perf: number) => void
    export let stoppedPerformance: boolean
    
    $: distance = (quantity-(index+1))/quantity
    $: inverseDistance = 1 - distance
    $: computedSpeed = (distance-0.5)*0.5

    const ROLES = [
        "and an indie game creator",
        "currently living in Lyon",
        "with experience in Web3",
        "always exploring multiple paradigms",
        "and I am a full-stack engineer",
        "who also does UX/UI design",
        "whom can work in Paris too",
        "currently 21 years old if I don't forget to update this website",
        "sometimes a private programming tutor",
        "and an INSA Lyon Computer Science 4th year student",
        "whom speaks French and English fluently",
        "knowing some Spanish and Russian as well",
        "as a significant programming language polyglot",
        "hobbyist illustrator as well",
        "and a gamejamer",
        "also a pixelartist",
        "spending days optimizing effects like this on mobile",
        "understanding some Rust",
        "called a front-end ninja by some",
        "co-founding a tiny DeFi startup",
        "and I extensively used Vim, honestly use paper instead",
        "while winning hackathons",
        "and proficient with software architecture",
        "totally able to do complex backend tasks as well",
        "and absolutely doing too many things at once",
        "and enjoying the creative web as you may have guessed",
    ]
    let roles = [...ROLES]
    shuffle(roles)
</script>

{#if size}
    <div class="marquee-container">
        <Marquee {stoppedPerformance} {onPerfRecorded} externalStop={stop} speed={computedSpeed} speedMultiplier={speed}>
            <div class="marquee-content">
                {#each roles as role, i}
                    <div class="role" style={`opacity: ${wave(distance)+0.2}; filter: blur(${(1-(wave(distance)))*10}px) hue-rotate(${(inverseDistance*(ROLES.indexOf(role)/ROLES.length))*380}deg); line-height: ${(0.4+inverseDistance*size)*1.5}rem; font-size: ${0.4+inverseDistance*size}rem`}>
                        {role}
                    </div>
                {/each}
                <div></div>
            </div>
        </Marquee>
    </div>
{/if}

<style lang=sass>
    .marquee-container
        height: fit-content

    .marquee-content
        @include font-size(1rem)
        display: flex
        gap: 1em
        font-family: $font-mono

        .role
            letter-spacing: -0.07em
            min-width: fit-content
            font-weight: 500
            color: var(--color)

</style>