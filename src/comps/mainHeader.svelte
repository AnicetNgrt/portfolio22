<script>
	import Header from "./header.svelte";

</script>

<Header>
    <div class="title-container">
        <div class="title">
            <h1>ANICET {"⁕"} NOUGARET<span class="apostroph">'s</span></h1>
            <p class="subtitle">2023 Portfolio & Blog</p>
        </div>
    </div>
</Header>

<style lang=sass>
    .title-container
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: 100%
        height: 100%
    
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

        margin-bottom: 2.5rem

        padding: 0rem 2rem
        @include for-size(tablet-landscape-up)
            padding: 0rem 3rem
            margin-bottom: 4rem

        .apostroph
            font-weight: 550
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
            font-weight: 550
            align-self: start
            @include font-size(2rem)
            margin-top: -0.4rem
            @include for-size(tablet-landscape-up)
                align-self: center
                margin-top: -1.5rem
                @include font-size(1.2rem)
            @include for-size(desktop-up)
                @include font-size(1.3rem)
            // border: double 3px $c5
</style>