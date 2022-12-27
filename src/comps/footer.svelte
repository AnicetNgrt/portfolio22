<script lang=ts>
	import SpinnyRolesBg from "$src/comps/spinnyRolesBg.svelte";
    
    export let lines: number;
    $: size = 64/lines
</script>

<div class="footer-container">
    <div class="footer">
        <div class="statements">
            <p>
                Made with 🪄 in Lyon, France.
            </p>
            <p>
                Tech used: SvelteKit, SASS
            </p>
            <p>
                All rights reserved @ Anicet Nougaret 2023
            </p>
            <div style="height: 1rem"></div>
        </div>
        <div class="links">
            <a href="https://www.linkedin.com/in/anicet-nougaret-b7846b174/">⁕ Linkedin</a>
            <a href="https://github.com/AnicetNgrt">⁕ Github</a>
            <a href="https://twitter.com/AniC_dev">⁕ Twitter</a>
        </div>
    
    </div>
    <SpinnyRolesBg {size} lines={Math.round(lines/1.5)} speed={0.5} opacity={0.5} shift={90}/>
</div>

<style lang=sass>
    .footer-container
        position: relative
        background-color: $c0
        width: 100%
        height: 100vh
        z-index: 1
        overflow: hidden

    .footer
        z-index: 3
        display: flex

        flex-direction: column-reverse
        padding: 5rem 3rem 
        justify-content: start
        align-items: start
        gap: 4rem

        border-top: solid 0.2rem alpha(var(--color), 0.5)

        backdrop-filter: blur(9px)
        -webkit-backdrop-filter: blur(9px)

        @include for-size(tablet-landscape-up)
            padding: 8rem
            flex-direction: row 
            justify-content: center
            align-items: center
            gap: 8rem

        color: $c5
        font-weight: 500
        z-index: 3
        //background-color: $c0
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
            filter: brightness(50%)
</style>