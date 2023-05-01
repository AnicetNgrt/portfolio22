<script lang=ts>
	import Marquee from "./marquee.svelte"
</script>

<div class="scroll-hint">
    <div class="languette">
        <div class="arrow">⬇</div>
    </div>
    <!-- <Marquee speed={0.2}>
        <div class="content">
            {#each [...new Array(2)] as _}
                <p>
                    <i>scroll down ⁕ scrollez vers le bas ⁕ desplazarse hacia abajo ⁕ 向下滚动 ⁕ 下へスクロール ⁕ прокрутить вниз ⁕ </i>
                </p>
            {/each}
        </div>
    </Marquee> -->
</div>

<style lang=sass>
    .languette
        position: absolute
        left: 50%
        top: 0%
        transform: translate(-50%, -100%)
        background-color: transparentize($c0, 0.8) //alpha(var(--color), 0.5)
        backdrop-filter: blur(10px)
        padding: 0.4rem 1.25rem 0rem 1.25rem
        border-radius: 3rem 3rem 0rem 0rem
        border: dotted 0.2rem $c5
        border-bottom: none

        .arrow
            font-size: 2.5rem
            transform: scaleX(1.5)
            color: $c5

    .scroll-hint
        position: sticky
        top: 0
        z-index: 2
        height: 0.25rem
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
            border-top: solid 2px $c5
            border-bottom: solid 2px $c5
            font-weight: 500

            p
                margin-bottom: 0.05rem

</style>