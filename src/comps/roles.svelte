<script lang=ts>
    import IntersectionObserver from "svelte-intersection-observer";
	import Marquee from "./marquee.svelte";

    export let size: number
    export let index: number
    export let quantity: number
    export let stop: boolean
    export let speed: number
    export let onPerfRecorded: (perf: number) => void
    export let stoppedPerformance: boolean

    // function getRandomArbitrary(min: number, max: number) {
    //     return Math.random() * (max - min) + min;
    // }

    function shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    $: distance = (quantity-(index+1))/quantity
    $: inverseDistance = 1 - distance
    $: computedSpeed = (distance-0.5)*0.5

    let roles = [
        "and an indie game creator",
        "currently living in Lyon",
        "with experience in Web3",
        "while exploring multiple paradigms",
        "and is a full-stack engineer",
        "who also does UX/UI design",
        "whom can work in Paris too",
        "currently 21 years old if I don't forget to update this website",
        "sometimes a private programming tutor",
        "an INSA Lyon Computer Science 4th year student",
        "can speak French and English very fluently",
        "knowing some Spanish and Russian as well",
        "significant programming language polyglot",
        "hobbyist illustrator as well",
        "and a gamejamer",
        "also a pixelartist",
        "spending days optimizing effects like this on mobile",
        "understanding some Rust",
        "called a front-end ninja by some",
        "co-founding a tiny DeFi startup",
        "extensively used Vim in the past, honestly use paper instead",
        "winning hackathons",
        "proficient with software architecture",
        "totally able to do complex backend tasks as well",
        "and absolutely doing too many things at once",
        "enjoying the creative web",
        "as you guessed, who likes spinny things"
    ]
    shuffle(roles)

    function wave(x: number) {
        return (Math.cos(2*Math.PI*x + Math.PI)/2)+0.5
    }
</script>

{#if size}
    <div class="marquee-container">
        <Marquee {stoppedPerformance} {onPerfRecorded} externalStop={stop} speed={computedSpeed} speedMultiplier={speed}>
            <div class="marquee-content">
                {#each [...roles] as role, i}
                    <div class="role" style={`opacity: ${wave(distance)+0.2}; filter: blur(${(1-(wave(distance)))*10}px) hue-rotate(${(inverseDistance*Math.random())*380}deg); line-height: ${(0.4+inverseDistance*size)*1.5}rem; font-size: ${0.4+inverseDistance*size}rem`}>
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