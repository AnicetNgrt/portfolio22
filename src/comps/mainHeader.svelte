<div class="header">
    <div class="title-container">
        <div class="title">
            <h1><span class="baguette">🪄</span> Anicet Nougaret<span class="apostroph">'s</span></h1>
            <p class="subtitle">2022 Portfolio</p>
        </div>
    </div>
</div>

<style lang=sass>
    .header     
        position: sticky
        top: 0
        height: calc(100vh - 8rem)
        @include for-size(tablet-landscape-up)
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
</style>