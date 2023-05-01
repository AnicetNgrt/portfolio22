<script lang=ts>
	import type { Page } from "$lib/content";

	export let page: Page
	export let i = -1;
</script>

<a class="section-container" href={page.href}>
	<div class="section">
		<div class="top">
			<div class="icon top-left">
                <!-- {page.topLeft} -->
            </div>
			<div />
			<div class="icon">
                {page.topRight}
            </div>
			<div />
            <div class="title">
                <h2>{@html page.title}</h2>
                <h4>{@html page.desc ?? ""}</h4>
            </div>
			<div class="right">
				<!-- <div>{page.right}</div> -->
			</div>
		</div>
        <div class="bottom">
            <div class="icon">
                <!-- {page.botLeft} -->
            </div>
            <div class="description">
                <!-- {@html page.fr} -->
            </div>
            <div class="number">
                {#if i > -1}
                    <span class="num">0</span>{i}
                {/if}
            </div>
        </div>
        <div class={"bottom-alt " + (page.bg ?? "")}>
            <div class="arrow">
                <!-- {`※`} -->
            </div>
            <div class="cta">
                {page.title}
                <!-- {emojis[href]} -->
            </div>
            <div class="arrow">{`->`}</div>
        </div>
		<img src={page.cover} alt={page.title} />
	</div>
</a>

<style lang="sass">
    .title
        z-index: 1
        display: flex
        flex-direction: column
        gap: 0.5rem
        h2
            color: $c0
            font-weight: 600
        h4
            max-width: 50ch
            color: $c0
            font-weight: 400

    .section-container
        width: 100%
        height: calc(calc(100vh - 3rem) / 3)
        @include for-size(tablet-landscape-up)
            height: calc(calc(100vh - 3rem) / 2)
            border-radius: 0.3rem

        border: solid 0.2rem $c0
        max-width: 100%
        overflow: hidden
        background-color: var(--color)
        padding: 0.2rem

    .section
        position: relative
        width: 100%
        height: 100%
        background-color: $c0
        border-radius: 0rem
        overflow: hidden
        // border: solid 3px $c5

        .top, .bottom
            background-color: transparentize($c5, 0.4)
            color: var(--color)        

        .bottom
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)

        .bottom-alt
            position: relative
            backdrop-filter: blur(30px)
            -webkit-backdrop-filter: blur(30px)
            background-color: alpha(var(--color), 0.7)
            color: transparentize($c0, 0.5)
            clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)

            &::after
                content: ""
                position: absolute
                top: 7%
                height: 90%
                width: 100%
                // border: dotted 0.3rem $c5
                border-left: none
                border-right: none

        .top, .bottom, .bottom-alt
            position: absolute
            width: 100%
            display: grid

            align-items: start
            justify-content: start

            > *
                width: 100%
                height: 100%
                display: flex
                font-family: $font-mono

            .title
                h2
                    font-family: $font-display
            
            transition: clip-path 0.1s

        .bottom-alt, .bottom
            padding: 0.5rem
            gap: 0.5rem
            @include for-size(tablet-landscape-up)
                padding: 2rem
                gap: 2rem

            padding-top: 0.5rem
            grid-template-columns: 2rem 1fr 2rem
            grid-template-rows: 2rem
            top: calc(100% - 3rem)
            @include for-size(tablet-landscape-up)
                padding-top: 2rem
                grid-template-columns: 3rem 1fr 3rem
                grid-template-rows: 1.6rem
                top: calc(100% - 5.6rem)

        .top
            padding: 0.5rem
            gap: 0.5rem
            @include for-size(tablet-landscape-up)
                padding: 2rem
                gap: 2rem

            padding-bottom: 0rem

            grid-template-columns: 2rem 1fr 2rem
            grid-template-rows: 2rem 1fr
            height: calc(100% - 3rem)
            @include for-size(tablet-landscape-up)
                grid-template-columns: 3rem 1fr 3rem
                grid-template-rows: 3rem 1fr
                height: calc(100% - 5.6rem)

        .lastRow
            background-color: red

        .description
            justify-content: end
            align-items: center
            @include font-size(0.8rem)
            @include for-size(tablet-landscape-up)
                @include font-size(1rem)
            //grid-column-end: span 2

        .icon, .number, .arrow
            align-items: center
            justify-content: center

        .arrow
            @include for-size(tablet-landscape-up)
                @include font-size(2.2rem)

            font-family: $font-mono
            color: $c5

        .cta
            font-family: $font-display
            font-weight: 500
            color: $c0
            @include for-size(tablet-landscape-up)
                @include font-size(2.2rem)

            margin-top: 0.07em
            align-items: center
            justify-content: end

        .top-left
            @include for-size(tablet-landscape-up)
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
                left: -2.5rem
                @include font-size(0.5rem)
                @include for-size(tablet-landscape-up)
                    @include font-size(0.7rem)
                    left: -3.55rem
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

        .title
            h2
                font-family: $font-display
                @include font-size(4.8rem)
                @include rfs(4.8rem, line-height)
                font-weight: 800
                @include for-size(tablet-landscape-up)
                    @include font-size(5rem)
                    @include rfs(5rem, line-height)
                    max-width: 90%  

        img
            width: 100%
            height: 100%
            max-width: 100%
            object-fit: cover

    .section:hover
        .bottom-alt
            transition: clip-path 0.2s
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)

        .bottom
            transition: clip-path 0.2s
            clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)

        .top
            backdrop-filter: blur(0px)
            -webkit-backdrop-filter: blur(0px)
            background-color: alpha(var(--color), 0.1)

        .top-left 
            @include for-size(tablet-landscape-up)
                transition: transform 1s
                transform: rotate(376deg)

        .title
            opacity: 0
</style>
