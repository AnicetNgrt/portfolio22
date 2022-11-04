<script>

	import SpinnyRolesBg from "./spinnyRolesBg.svelte";

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
                All rights reserved @ Anicet Nougaret 2022
            </p>
            <div style="height: 1rem"></div>
        </div>
        <div class="links">
            <a href="https://www.linkedin.com/in/anicet-nougaret-b7846b174/">⁕ Linkedin</a>
            <a href="https://github.com/AnicetNgrt">⁕ Github</a>
            <a href="https://twitter.com/AniC_dev">⁕ Twitter</a>
        </div>
    
    </div>
    <SpinnyRolesBg speed={0.4} size={5} lines={12} opacity={0.5} shift={100}/>
</div>

<style lang=sass>
    .footer-container
        position: relative

    .footer
        display: flex

        flex-direction: column-reverse
        padding: 5rem 3rem 
        justify-content: start
        align-items: start
        gap: 4rem

        backdrop-filter: blur(10px)

        @include for-size(tablet-landscape-up)
            padding: 8rem
            flex-direction: row 
            justify-content: center
            align-items: center
            gap: 8rem

        color: var(--color)
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
            color: $c1
</style>