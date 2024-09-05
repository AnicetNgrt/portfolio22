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
        "⇆⇇⇉⇆⇇⇉",
        "⇝⇦⇨⇝⇦⇨",
        "○◍◓◎◉◒",
        "◑◐◕◔◯◷",
        "◴◉◵◶◌●",
        "∑ↇ∇∏∞∁∅ↀ",
        "≜≉≣≢≨≚⊃≵≪≷⊈≼",
        "▥▩▤▣▢▨",
        "⨝⨉⨁⨀⨞⨠⨳",
        "◬◭◆◮◺◈",
        "⊤⊫⊯⊥⊧⊨⊩⊦⊭⊮",
        "⋽⋺⋹⋸⋻⋼⋴⋶⋵⋐",
        "⨌⨎⨒⨘⨏⨕⨙⨔⨜",
        "⇆⇇⇉⇆⇇⇉",
        "⇝⇦⇨⇝⇦⇨",
        "○◍◓◎◉◒",
        "◑◐◕◔◯◷",
        "◴◉◵◶◌●",
        "∑ↇ∇∏∞∁∅ↀ",
        "≜≉≣≢≨≚⊃≵≪≷⊈≼",
        "▥▩▤▣▢▨",
        "⨝⨉⨁⨀⨞⨠⨳",
        "◬◭◆◮◺◈",
        "⊤⊫⊯⊥⊧⊨⊩⊦⊭⊮",
        "⋽⋺⋹⋸⋻⋼⋴⋶⋵⋐",
        "⨌⨎⨒⨘⨏⨕⨙⨔⨜",
        // "indie game creator",
        // "currently living in Lyon",
        // "with experience in Web3",
        // "always exploring multiple paradigms",
        // "full-stack engineer",
        // "who also does UX/UI design",
        // "from Paris",
        // "currently 21 years old if I don't forget to update this website",
        // "private programming tutor",
        // "INSA Lyon Computer Science 4th year student",
        // "speaking French and English fluently",
        // "knowing some Spanish and Russian",
        // "programming language polyglot",
        // "hobbyist illustrator",
        // "occasional gamejamer",
        // "hobbyist pixelartist",
        // "spending days optimizing effects like this on mobile",
        // "understanding some Rust",
        // "trying to become a front-end ninja",
        // "using paper instead of Vim",
        // "occasional hackathon finalist and winner",
        // "proficient with software architecture",
        // "doing complex backend tasks as well",
        // "learning too many things at once",
        // "enjoying the creative web",
        // "consistently happy with bold design choices"
    ]
    let roles = [...ROLES]
    shuffle(roles)
</script>

{#if size}
    <div class="marquee-container">
        <Marquee {stoppedPerformance} {onPerfRecorded} externalStop={stop} speed={computedSpeed} speedMultiplier={speed}>
            <div class="marquee-content">
                {#each roles as role, i}
                    <div class="role" style={`opacity: ${(wave(distance)*0.5)+0.2}; filter: blur(${(1-(wave(distance)))*10}px) hue-rotate(${(ROLES.indexOf(role)/ROLES.length)*1800-900}deg); line-height: ${(0.4+inverseDistance*size)*1.5}rem; font-size: ${0.4+inverseDistance*size}rem`}>
                        {role}
                    </div>
                {/each}
                <div></div>
            </div>
        </Marquee>
    </div>
{/if}

<style lang=sass>
    @import "../styles/helpers.sass"

    .marquee-container
        height: fit-content

    .marquee-content
        @include font-size(1rem)
        display: flex
        gap: 0.15em
        font-family: $font-mono

        .role
            letter-spacing: 0em
            min-width: fit-content
            font-weight: 500
            color: var(--color)

</style>