<script lang=ts>
	export let topLeft: string;
	export let topRight: string;
	export let title: string;
	export let right: string;
	export let botLeft: string;
	export let desc: string;
	export let cover: string;
	export let i = -1;
</script>

<div class="section-container">
	<div class="section">
		<div class="top">
			<div class="icon top-left">{topLeft}</div>
			<div />
			<div class="icon">{topRight}</div>
			<div />
			<h2>{@html title}</h2>
			<div class="right">
				<div>{right}</div>
			</div>
			<div class="icon">{botLeft}</div>
			<div class="description">
				{@html desc}
			</div>
			<div class="number">
				{#if i > -1}
					<span class="num">0</span>{i}
				{/if}
			</div>
		</div>
		<img src={cover} alt={title} />
	</div>
</div>

<style lang="sass">
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
            backdrop-filter: blur(5px)
            background-color: transparentize($c0, 0.4)
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
                transition: opacity 1s, filter 1s

            transition: opacity 1s, background-color 1s, backdrop-filter 1s

        .top:hover, .top:active
            transition: backdrop-filter 0.3s, background-color 0.3s
            backdrop-filter: blur(0px)
            background-color: alpha(var(--color), 0.1)
            cursor: pointer

            *
                transition: opacity 0.3s, filter 0.3s
                filter: blur(3px)
                opacity: 0

            h2
                opacity: 0

        img
            width: 100%
            height: 100%
            max-width: 100%
            object-fit: cover
</style>
