<script lang=ts>
    import IntersectionObserver from "svelte-intersection-observer";
	import Marquee from "./marquee.svelte";

    export let size: number
    export let index: number
    export let quantity: number
    export let stop: boolean
    export let speed: number

    // function getRandomArbitrary(min: number, max: number) {
    //     return Math.random() * (max - min) + min;
    // }

    function shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let distance = (quantity-(index+1))/quantity
    let inverseDistance = 1 - distance
    let computedSpeed = ((distance-0.5)*0.5 + (Math.random()*0.05))

    let roles = [
        "▦",
        "⁂",
        "♪",
        "::<T>",
        "typedef struct _A {} A",
        "@dataclass",
        "realloc(pfPtr, portfolio)",
        "new Hashmap()",
        "my name is Anicet Nougaret",
        "Я говорю на испанском",
        "Estoy aprendiendo ruso",
        "Wow, regardez ça tourne !",
        "日本語は話せませんが、書道が好きです",
        "It took hours to tweak this ;)",
        "lambda: x -> log(x, 4)",
        "if i % 2 == 0 { 10 } else { 20 }",
        "|> IO.stream(bytes)",
        "Indie game creator",
        "Living in Lyon",
        "DeFi founder",
        "Multi-paradigm programmer",
        "Full-stack engineer",
        "Designer",
        "From Paris",
        "Private programming tutor",
        "INSA Lyon Computer Science student",
        "Hobbyist illustrator",
        "Gamejamer",
        "Pixelartist",
        "Rustacean",
        "Front-end ninja",
        "Co-Founder & CTO of a tiny startup",
        "Hackathons enjoyer (and winner sometimes)",
        "Doing too many things at once",
        "Please enjoy this website"
    ]
    shuffle(roles)
</script>

{#if size}
    <div class="marquee-container">
        <Marquee stop={stop} speed={computedSpeed} speedMultiplier={speed}>
            <div class="marquee-content">
                {#each [...roles, roles[0], roles[1], roles[2]] as role, i}
                    <div class="role" style={`opacity: ${inverseDistance*0.8}; filter: blur(${(inverseDistance-0.2)*6}px) hue-rotate(${(inverseDistance*Math.random())*380}deg); line-height: ${(0.4+inverseDistance*size)*1.5}rem; font-size: ${0.4+inverseDistance*size}rem`}>
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
        gap: 3em
        font-family: $font-mono

        .role
            min-width: fit-content
            font-weight: 500
            color: var(--color)

</style>