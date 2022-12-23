<script lang=ts>
	import { sections } from "$lib/content";

    export let route: string

    let open = true
</script>

<div class="body">
    <!-- <div class="left-nav">
        <button class="nav-switch" on:click={() => open = !open}>
            <div>ME ⁝⁝⁝</div>
            <div>⁝⁝⁝ NU</div>
        </button>
        {#each sections as s, i}
            <a class:current={s.href == route} href={s.href} style={"" + (s.href != route && `filter: hue-rotate(${Math.random()*100 - 50}deg);`)} class="nav-button">
                <div class="emoji">{s.topLeft}</div>
            </a>
        {/each}
    </div> -->
    <div class="content-container">
        <div class="content">
            <slot/>
        </div>
    </div>
</div>

<style lang=sass>
    .body
        padding: 0.2rem
        padding-bottom: 0rem
        width: 100%
        max-width: 100%
        display: flex
        background: radial-gradient(1500px at left 20% top 10%, alpha(var(--color), 0.3), transparent), radial-gradient(300px at left 100% top 100%, alpha(var(--color), 0.2), transparent), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter) saturate(0) contrast(200%) blur(0.1px)' opacity='0.1'/%3E%3C/svg%3E")
        background-attachment: fixed

    .content-container
        border: double 0.5rem $c5
        border-bottom: none
        padding: 1rem
        flex-grow: 1
        max-width: 100%
        min-height: 100vh
    
    .content
        padding: 1rem
        @include for-size(tablet-landscape-up)
            padding: 2rem 2.5rem 2.5rem 4rem
        display: flex
        flex-direction: column
        gap: 2rem
        max-width: 100%
        height: fit-content
        transform: translateZ(0)
        transform-style: preserve-3d

    // .nav-button, .nav-switch
    //     display: flex
    //     align-items: center
    //     justify-content: center
    //     text-decoration: none

    // .nav-button
    //     opacity: 0.8
    //     height: 6rem
    //     width: 6rem
    //     border-radius: 100%//0.25rem
    //     background-color: alpha(var(--color), 0.5)
    //     color: $c0

    //     .emoji
    //         display: block
    
    // .nav-button.current
    //     cursor: forbidden
    //     background-color: alpha(var(--color), 0.2)
    //     border-radius: 2rem
    //     border: solid 0.2rem var(--color)
    //     opacity: 1

    // .nav-switch
    //     cursor: pointer
    //     //border: solid 0.25rem var(--color)
    //     border: none
    //     border-bottom: solid 0.2rem var(--color)
    //     border-radius: 0.2rem 0rem 0rem 0rem
    //     background-color: alpha(var(--color), 0.5)
    //     color: var(--color)
    //     padding-right: 0.9rem
    //     font-weight: normal
    //     width: 100%
    //     display: flex
    //     flex-direction: column
    //     align-items: center
    //     padding: 1.4rem 1rem
    //     justify-content: center

    //     div
    //         font-family: $font-display
    //         font-weight: 500
    //         line-height: 1.8rem
    //         font-size: 2rem

    // .left-nav
    //     position: sticky
    //     top: 0.2rem
    //     height: calc(100vh - 3.3rem)
    //     width: 6.8rem
    //     background-color: alpha(var(--color), 0.2)
    //     display: flex
    //     flex-direction: column
    //     justify-content: space-between
    //     align-items: center
    //     //border: dotted 0.25rem var(--color)
    //     border-radius: 0.2rem 0rem 3.3rem 3.3rem
    //     border-bottom: none
    //     font-size: 3.3rem
    //     font-weight: 800
    //     font-family: $font-mono
    //     padding-bottom: 0.5rem
    //     margin-bottom: 0.5rem
</style>

