<script lang=ts>
	import Marquee from "../comps/marquee.svelte";

    const sections = [
        {
            name: "Resume & contact",
            cover: "/pictures/portraits/portrait0.jpg",
            topLeft: "👔",
            topRight: "◥",
            botLeft: "◣",
            right: "← ← ← ← ← ← ← ←",
            desc: "CV et contact"
        },
        {
            name: "Front-end development",
            cover: "/pictures/projects/farswap/screen0.png",
            topLeft: "✨",
            topRight: "◪",
            botLeft: "◩",
            right: "<div>Hello</div>",
            desc: "Développement front-end"
        },
        {
            name: "Back-end development",
            cover: "/pictures/projects/tingo/classes.png",
            topLeft: "💾",
            topRight: "◈",
            botLeft: "◆",
            right: "HTTP/2 200 OK",
            desc: "Développement back-end"
        },
        {
            name: "Game development",
            cover: "/pictures/projects/zugzwang/captureOld.png",
            topLeft: "🎲",
            topRight: "▨",
            botLeft: "▦",
            right: "« It's dangerous to go alone! Take this. »",
            desc: "Développement de jeux-vidéo"
        },
        {
            name: "Art gallery",
            cover: "/pictures/art/skyscrapper_1.jpg",
            topLeft: "🎨",
            topRight: "◒",
            botLeft: "◓",
            right: "« Le vent se lève, il faut tenter de vivre. »",
            desc: "Travaux artistiques"
        },
        {
            name: "Brand identity & design",
            cover: "/pictures/projects/farswap/banner.png",
            topLeft: "🎴",
            topRight: "⫸",
            botLeft: "⫷",
            right: "—————————————————————",
            desc: "Identité de marques et design"
        }
    ]
</script>

<div class="header">
    <div class="title-container">
        <div class="title">
            <h1><span class="baguette">🪄</span> Anicet Nougaret<span class="apostroph">'s</span></h1>
            <p class="subtitle">2022 Portfolio</p>
        </div>
    </div>
</div>

<div class="bottom">
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
    {#each sections as { name, cover, desc, topRight, topLeft, botLeft, right }, i}
        <div class="section-container">
            <div class="section">
                <div class="top">
                    <div class="icon top-left">{topLeft}</div>
                    <div></div>
                    <div class="icon">{topRight}</div>
                    <div></div>
                    <h2>{@html name}</h2>
                    <div class="right">
                        <div>{right}</div>
                    </div>
                    <div class="icon">{botLeft}</div>
                    <div class="description">
                        {desc}
                    </div>
                    <div class="number">
                        <span class="num">0</span>{i}
                    </div>
                </div>
                <img src={cover} alt={name}>
            </div>
        </div>
    {/each}
</div>

<div class="footer">
    <div class="statements">
        <p>
            Made with ❤️ in Lyon, France.
        </p>
        <p>
            Tech used: SvelteKit, SASS
        </p>
        <p>
            All rights reserved @ Anicet Nougaret 2022
        </p>
    </div>
    <div class="links">
        <a href="https://www.linkedin.com/in/anicet-nougaret-b7846b174/">⁕ Linkedin</a>
        <a href="https://github.com/AnicetNgrt">⁕ Github</a>
        <a href="https://twitter.com/AniC_dev">⁕ Twitter</a>
    </div>
</div>

<style lang="sass">
    .bottom
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
            font-weight: 300
            color: $c0
            height: 2.5rem
            padding-right: 0.4rem
            border-top: solid 2px $c0
            border-bottom: solid 2px $c0
            font-weight: 800

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
        
        .section-container
            position: sticky
            top: 3rem
            width: 100%
            height: calc(calc(100vh - 3rem) / 3)
            @include for-size(tablet-landscape-up)
                height: calc(calc(100vh - 3rem) / 2)

            max-width: 100%

        .section
            position: relative
            width: 100%
            height: 100%
            background-color: $c0
            border-radius: 0rem
            overflow: hidden
            // border: solid 3px $c5
            
            .top
                position: absolute
                width: 100%
                height: 100%
                backdrop-filter: blur(30px)
                background-color: transparentize($c0, 0.3)
                color: var(--color)
                display: grid

                padding: 0.5rem
                gap: 0.5rem
                @include for-size(tablet-landscape-up)
                    padding: 2rem
                    gap: 2rem

                grid-template-columns: 2rem 1fr 2rem
                grid-template-rows: 2rem 1fr 2rem
                @include for-size(tablet-landscape-up)
                    grid-template-columns: 3rem 1fr 3rem
                    grid-template-rows: 3rem 1fr 3rem

                align-items: start
                justify-content: start

                > *
                    width: 100%
                    height: 100%
                    display: flex
                    font-family: $font-mono

                .description
                    justify-content: end
                    align-items: center
                    @include font-size(0.8rem)
                    @include for-size(tablet-landscape-up)
                        @include font-size(1rem)
                    //grid-column-end: span 2

                .icon, .number
                    align-items: center
                    justify-content: center

                .top-left
                    @include for-size(tablet-landscape-up)
                        border: solid 2px var(--color)
                        border-radius: 1.1rem
                        @include font-size(2rem)

                    transform: rotate(20deg)

                .right
                    position: relative
                    width: 100%
                    height: 100%

                    > div
                        position: absolute
                        width: 7rem
                        height: 3rem
                        top: 2.25rem
                        left: -2.4rem
                        @include font-size(0.5rem)
                        @include for-size(tablet-landscape-up)
                            @include font-size(0.7rem)
                            left: -3.4rem
                            width: 10rem
                            height: 3rem

                        display: flex
                        align-items: center
                        transform: rotate(90deg)
                        opacity: 0.3

                .number
                    @include font-size(1.5rem)
                    
                    color: var(--color)

                    .num
                        opacity: 0.5

                h2
                    font-family: $font-display
                    @include font-size(5.5rem)
                    @include rfs(5.5rem, line-height)
                    font-weight: 800
                    @include for-size(tablet-landscape-up)
                        @include font-size(4.5rem)
                        @include rfs(4.5rem, line-height)
                        max-width: 70%  

                *
                    opacity: 1
                    transition: opacity 1s

                transition: opacity 1s, backdrop-filter 1s, background-color 1s

            .top:hover, .top:active
                transition: backdrop-filter 1s, background-color 1s
                backdrop-filter: blur(0px)
                background-color: transparentize($c0, 0.8)
                cursor: pointer

                *
                    transition: opacity 0.5s, filter 0.5s
                    filter: blur(5px)
                    opacity: 0

            img
                width: 100%
                height: 100%
                max-width: 100%
                object-fit: cover
    
    .header     
        position: sticky
        top: 0
        height: calc(100vh - 3rem)
        max-width: 100%
        width: 100%
        padding: 0.2rem

    .title-container
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        border: double 0.5rem var(--color)
    
    .baguette
        display: none
        @include for-size(tablet-landscape-up)
            display: inline

    .title
        max-width: 100%
        width: fit-content

        color: var(--color)

        display: flex
        flex-direction: column

        padding: 0rem 2rem
        @include for-size(tablet-landscape-up)
            padding: 0rem 3rem
            margin-left: -3rem

        margin-bottom: 3rem

        .apostroph
            @include font-size(1.5rem)

        h1
            @include font-size(7rem)
            @include rfs(5.5rem, line-height)
            width: max-content
            max-width: 100%
            font-weight: 800

            // color: transparent
            // background-clip: text
            // background-image: linear-gradient(var(--color), $c5)
            
            @include for-size(tablet-portrait-up)
                @include font-size(6rem)
                @include rfs(5rem, line-height)

            @include for-size(tablet-landscape-up)
                @include font-size(3.5rem)
                @include rfs(4.5rem, line-height)

            @include for-size(desktop-up)
                @include font-size(4.5rem)
                @include rfs(4.5rem, line-height)
        
        .subtitle
            align-self: end
            @include font-size(0.95rem)
            margin-top: -0.4rem
            @include for-size(tablet-landscape-up)
                margin-top: -1.5rem
                @include font-size(1.2rem)
            @include for-size(desktop-up)
                @include font-size(1.3rem)
            // border: double 3px $c5


    .footer
        display: flex

        flex-direction: column-reverse
        padding: 5rem 3rem 
        justify-content: start
        align-items: start
        gap: 4rem

        @include for-size(tablet-landscape-up)
            padding: 8rem
            flex-direction: row 
            justify-content: center
            align-items: center
            gap: 8rem

        color: var(--color)
        z-index: 3
        background-color: $c0
        height: 100vh
        width: 100%

        .statements
            display: flex
            flex-direction: column
            height: fit-content

        .links
            display: flex
            flex-direction: column
            gap: 1rem
            height: fit-content

        p
            @include font-size(1.5rem)
            @include rfs(2rem, line-height)
            @include for-size(tablet-landscape-up)
                @include font-size(2rem)
                @include rfs(2.5rem, line-height)

        a
            font-family: $font-display
            color: var(--color)
            font-weight: 800
            @include font-size(4rem)
            @include rfs(4rem, line-height)

        a:hover
            color: $c1
</style>
