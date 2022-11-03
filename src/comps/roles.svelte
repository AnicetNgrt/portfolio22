<script lang=ts>
	import Marquee from "./marquee.svelte";

    export let index: number
    export let quantity: number
    export let stop: boolean

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
    let speed = ((distance-0.5)*0.5 + (Math.random()*0.05))*2

    let roles = [
        "Private programming tutor",
        "▦",
        "⁂",
        "♪",
        "::",
        "<T>",
        "new Hashmap()",
        "lambda: x -> log(x, 4)",
        "if i % 2 == 0 { 10 } else { 20 }",
        "|> IO.stream(bytes)",
        "Indie game creator",
        "Living in Lyon",
        "Computer Science major",
        "DeFi founder",
        "Multi-paradigm programmer",
        "Full-stack engineer",
        "Designer",
        "From Paris",
        "INSA Lyon student",
        "Hobbyist illustrator",
        "Gamejamer",
        "Pixelartist",
        "Rustacean",
        "Front-end ninja",
        "CTO of a Web3 startup",
        "Hackathons enjoyer",
        "Doing too many things at once"
    ]
    shuffle(roles)

    function wi(i: number): number {
        return (Math.abs((i+1)-(roles.length/2))/roles.length)
    } 

</script>

<div class="marquee-container">
    <Marquee {stop} speed={speed}>
        <div class="marquee-content">
            {#each [...roles, roles[0], roles[1], roles[2]] as role, i}
                <div class="role" style={`opacity: ${inverseDistance*0.8}; filter: blur(${distance*4}px) hue-rotate(${(inverseDistance*Math.random())*380}deg); line-height: ${(0.4+inverseDistance*1.82)*1.1}rem; font-size: ${0.4+inverseDistance*1.82}rem`}>
                    {role}
                </div>
            {/each}
            <div></div>
        </div>
    </Marquee>
</div>

<style lang=sass>

    // .planet
    //     position: relative

    //     .circle
    //         position: absolute
    //         top: 50%
    //         left: 50%
    //         transform: translate(-50%, -50%)
    //         background: radial-gradient(circle at left 60% top 20%, $c0, var(--color), $c5)
    //         border-radius: 100%

    .marquee-container
        height: fit-content

    .marquee-content
        @include font-size(1rem)
        display: flex
        @include rfs(1rem, gap) 
        font-family: 'Jetbrains mono'

        .role
            min-width: fit-content
            font-weight: 500
            color: var(--color)

</style>