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
            <h1>Anicet Nougaret<span class="apostroph">'s</span></h1>
            <p class="subtitle">2022 Portfolio</p>
        </div>
    </div>
</div>

<div class="bottom">
    <Marquee speed={0.15}>
        <div class="content">
            <p>
                scroll down ⁕ scrollez vers le bas ⁕ desplazarse hacia abajo ⁕ 向下滚动 ⁕ 下へスクロール ⁕ прокрутить вниз ⁕ 
            </p>
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
                        0<span class="num">{i}</span>
                    </div>
                </div>
                <img src={cover} alt={name}>
            </div>
        </div>
    {/each}
</div>

<div class="footer">

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
        background-color: $blue

        .content
            display: flex
            justify-content: center
            align-items: center
            font-size: 1.5rem
            font-weight: 300
            color: $c0
            height: 2.5rem
            padding-right: 0.8rem
            border-top: solid 2px $c0
            border-bottom: solid 2px $c0
            font-family: 'Jetbrains Mono', monospace

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
        background: $blue
        
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
                color: $blue
                display: grid

                padding: 0.5rem
                gap: 0.5rem
                @include for-size(tablet-landscape-up)
                    padding: 2rem
                    gap: 2rem

                grid-template-columns: 1.5rem 1fr 2rem
                grid-template-rows: 1.5rem 1fr 2rem
                @include for-size(tablet-landscape-up)
                    grid-template-columns: 2rem 1fr 3rem
                    grid-template-rows: 2rem 1fr 3rem

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
                    //grid-column-end: span 2

                .icon, .number
                    align-items: center
                    justify-content: center

                .top-left
                    border: dashed 2px $blue
                    border-radius: 0.8rem
                    transform: rotate(20deg)
                    box-shadow: -2px 4px 0px transparentize($blue, 0.8)


                .right
                    position: relative
                    width: 100%
                    height: 100%

                    > div
                        position: absolute
                        width: 10rem
                        height: 2rem
                        top: 2.25rem
                        left: -3.4rem
                        @include font-size(0.75rem)
                        @include for-size(tablet-landscape-up)
                            @include font-size(0.7rem)
                            height: 3rem

                        display: flex
                        align-items: center
                        transform: rotate(90deg)
                        opacity: 0.3

                .number
                    @include font-size(1.5rem)
                    color: transparentize($blue, 0.8)

                    .num
                        color: $blue

                h2
                    font-family: $font-display
                    @include font-size(3rem)
                    @include rfs(3rem, line-height)
                    font-weight: 400
                    @include for-size(tablet-landscape-up)
                        max-width: 70%  

                *
                    opacity: 1
                    transition: all 1s

                transition: all 1s

            .top:hover
                transition: all 1s
                backdrop-filter: blur(0px)
                background-color: transparentize($c0, 0.8)
                cursor: pointer

                *
                    transition: all 0.5s
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
        border: double 0.5rem $blue

    .title
        max-width: 100%
        width: fit-content

        color: $blue

        display: flex
        flex-direction: column

        padding: 0rem 2rem
        @include for-size(tablet-landscape-up)
            padding: 0rem 3rem

        margin-bottom: 3rem

        .apostroph
            @include font-size(1.5rem)

        h1
            @include font-size(7rem)
            @include rfs(5.5rem, line-height)
            width: max-content
            max-width: 100%

            // color: transparent
            // background-clip: text
            // background-image: linear-gradient($blue, $c5)
            
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
        z-index: 3
        background-color: $c0
        height: 100vh
        width: 100%
</style>
