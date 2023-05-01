<script lang=ts>
	import { pages, sections } from "$src/lib/content";

    export let route: string
    export let subroute: boolean = false
    
    let bg: string = pages[route].bg ?? ""

    let sortedSections = sections.filter(s => s != pages[route]) 
    let backSection = subroute ? pages[route] : null
    
    const thumbnail = "anicetnougaret.fr/" + pages[route].cover;
</script>

<svelte:head>
    {#if !subroute}
        <meta property="og:image" content="http://{thumbnail}" />
        <meta property="og:image:secure_url" content="https://{thumbnail}" /> 
        <meta property="og:image:type" content="image/jpeg" /> 
        <meta property="og:image:width" content="2859" /> 
        <meta property="og:image:height" content="2144" />
    {/if}
</svelte:head>

<div class="nav-container">
    <div class="nav">
        <a class:hide={!backSection} class="landscape-only subroute nav-link" href={backSection?.href}>
            <div class="nav-link-title">
                {"<-"} {backSection?.title}
            </div>
        </a>
        {#each sortedSections as section}
            <a class="nav-link route" href={section.href}>
                <div class="nav-link-title">
                    {section.title}
                </div>
            </a>
        {/each}
        <a class:hide={!backSection} class="portrait-only subroute nav-link" href={backSection?.href}>
            <div class="nav-link-title">
                {"<-"} {backSection?.title}
            </div>
        </a>
    </div>
</div>

<div class="body">
    <div class="content-container">
        <div class={"content bg-pattern " + bg}>
            <slot/>
        </div>
    </div>
</div>

<style lang=sass>
    .nav-container
        @include for-size(tablet-landscape-up)
            position: sticky
            top: 0px
        width: 100%
        background-color: $c0
        //border-bottom: solid 0.2rem $c5 //alpha(var(--color), 0.7)
        @include for-size(tablet-landscape-up)
            //border-bottom: solid 0.2rem $c5 //alpha(var(--color), 0.3)
            box-shadow: 0rem 0.4rem 1rem transparentize($c5, 0.9) //alpha(var(--color), 0.1)
            z-index: 2

    .nav
        display: flex
        flex-wrap: wrap
        max-width: 100%
        width: 100%
        background-color: transparentize($c5, 0) //alpha(var(--color), 0.2)
    
    .nav-link
        flex-grow: 1
        text-decoration: none
        padding: 1rem 1rem
        @include for-size(tablet-landscape-up)
            padding: 0.8rem 0rem
        color: transparentize($c0, 0.3)
        background-color: transparentize($c0, 0.9)

    .nav-link:nth-child(2), .nav-link:nth-child(5), .nav-link:nth-child(6)
        background-color: transparentize($c0, 0.85)

    @include for-size(desktop-up)
        .nav-link:nth-child(2n)
            background-color: transparentize($c0, 0.85)

        .nav-link:nth-child(2n+1)
            background-color: transparentize($c0, 0.9)

    .nav-link:hover
        text-decoration: underline
        text-decoration-thickness: 0.1rem
        color: $c0
        text-decoration-color: $c0
        background-color: var(--color)

    .nav-link.subroute
        background-color: alpha(var(--color), 0.3)
        color: var(--color)
        text-decoration-color: var(--color)

    .nav-link.subroute:hover
        color: $c0
        text-decoration-color: $c0
        background-color: alpha(var(--color), 0.6)

    .nav-link-title
        line-height: 1.2rem
        font-size: 1rem
        width: 40vw
        @include for-size(desktop-up)
            line-height: 1.4rem
            font-size: 1.2rem
            text-align: center
            width: 100%
            min-width: 10ch
        
        max-width: 40vw
        //opacity: 0.3
        font-weight: 400
        font-family: $font-mono
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        max-height: 1.4rem

    .body
        @include for-size(tablet-landscape-up)
            padding: 0.2rem
        padding-bottom: 0rem
        width: 100%
        max-width: 100%
        display: flex
        background-color: $c0
        background-attachment: fixed

    .content-container
        // @include for-size(tablet-landscape-up)
        //     border: solid 0.5rem alpha(var(--color), 0.5)
        border-bottom: none
        // @include for-size(tablet-landscape-up)
        //     padding: 0.2rem
        flex-grow: 1
        max-width: 100%
        min-height: 100vh
        overflow-x: hidden
    
    .content
        padding: 0rem
        padding-top: 2rem
        @include for-size(tablet-landscape-up)
            padding: 2rem 2.5rem 2.5rem 4rem
        display: flex
        flex-direction: column
        gap: 2rem
        max-width: 100%
        height: fit-content
        min-height: 100%

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

