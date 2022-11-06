<script lang=ts>
	import SectionCard from "../comps/sectionCard.svelte";
    import MainHeader from "../comps/mainHeader.svelte";
    import Marquee from "../comps/marquee.svelte";

    const sections = [
        {
            title: "Resume & contact",
            cover: "/pictures/portraits/portrait0.jpg",
            topLeft: "👔",
            topRight: "◥",
            botLeft: "◣",
            right: "← ← ← ← ← ← ← ←",
            desc: "CV et contact",
            href: "/resume"
        },
        {
            title: "Front-end development",
            cover: "/pictures/projects/farswap/screen0.png",
            topLeft: "✨",
            topRight: "◪",
            botLeft: "◩",
            right: "<div>Hello</div>",
            desc: "Développement front-end",
            href: "/resume"
        },
        {
            title: "Back-end development",
            cover: "/pictures/projects/tingo/classes.png",
            topLeft: "💾",
            topRight: "◈",
            botLeft: "◆",
            right: "HTTP/2 200 OK",
            desc: "Développement back-end",
            href: "/resume"
        },
        {
            title: "Game development",
            cover: "/pictures/projects/zugzwang/captureOld.png",
            topLeft: "🎲",
            topRight: "▨",
            botLeft: "▦",
            right: "« It's dangerous to go alone! Take this. »",
            desc: "Développement de jeux-vidéo",
            href: "/resume"
        },
        {
            title: "Art gallery",
            cover: "/pictures/art/skyscrapper_1.jpg",
            topLeft: "🎨",
            topRight: "◒",
            botLeft: "◓",
            right: "« Le vent se lève, il faut tenter de vivre. »",
            desc: "Travaux artistiques",
            href: "/resume"
        },
        {
            title: "Brand identity & design",
            cover: "/pictures/projects/farswap/banner.png",
            topLeft: "🎴",
            topRight: "⫸",
            botLeft: "⫷",
            right: "—————————————————————",
            desc: "Identités de marques et design",
            href: "/resume"
        }
    ]
</script>

<MainHeader/>

<div class="scroll-hint">
    <Marquee speed={0.15}>
        <div class="content">
            {#each [...new Array(2)] as _}
                <p>
                    <i>scroll down ⁕ scrollez vers le bas ⁕ desplazarse hacia abajo ⁕ 向下滚动 ⁕ 下へスクロール ⁕ прокрутить вниз ⁕ </i>
                </p>
            {/each}
        </div>
    </Marquee>
</div>
<div class="sections">
    {#each sections as section, i}
        <SectionCard {...section} {i}/>
    {/each}
</div>

<style lang="sass">
    .scroll-hint
        position: sticky
        top: 0
        z-index: 2
        height: 3rem
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        background-color: var(--color)

        .content
            display: flex
            justify-content: center
            align-items: center
            font-size: 1.5rem
            color: $c0
            height: 2.5rem
            padding-right: 0.4rem
            border-top: solid 2px $c0
            border-bottom: solid 2px $c0
            font-weight: 500

            p
                margin-bottom: 0.05rem

    .sections
        z-index: 1
        display: grid
        grid-template-columns: repeat(1, 100%)
        @include for-size(tablet-landscape-up)
            grid-template-columns: repeat(2, 50%)
            // padding: 3rem
        
        // grid-column-gap: 0rem
        // grid-row-gap: 0rem
        
        width: 100%
        padding: 3px
        padding-top: 0px
        gap: 3px
        background: var(--color)
</style>
