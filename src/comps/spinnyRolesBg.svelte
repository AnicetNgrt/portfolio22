<script lang=ts>
    import IntersectionObserver from "svelte-intersection-observer";

    import Roles from '../comps/roles.svelte';
    
    export let stop: boolean = false
    export let lines: number
    export let size: number
    export let shift: number
    export let speed: number
    export let opacity: number = 1

    let indexes: number[] = []
    for (let i = 0; i < lines; i++) indexes.push(i)
    
    let fullIndicator: HTMLElement;
    let fullIntersecting: boolean = false;

    let topIndicator: HTMLElement;
    let topIntersecting: boolean = false;

    let botIndicator: HTMLElement;
    let botIntersecting: boolean = false;
</script>

<div
    class="spinnybg" style={`${stop && "filter: blur(2px)"}; height: ${100+shift}%; transform: translateY(${shift/-2}%); opacity: ${opacity}`}>
    
    {#if fullIntersecting}
        <div class="desc">
            {#each [...indexes].reverse() as index}
                <Roles speed={speed} size={size} stop={stop || !topIntersecting || !botIntersecting} {index} quantity={lines}/>
            {/each}
        </div> 
        <div class="desc">
            {#each indexes as index}
                <Roles speed={speed} size={size} stop={stop || !topIntersecting || !botIntersecting} {index} quantity={lines}/>
            {/each}
        </div>
    {/if}
</div>

<IntersectionObserver element={fullIndicator} bind:intersecting={fullIntersecting}>
    <div class="indicator" bind:this={fullIndicator}></div>
</IntersectionObserver>

<IntersectionObserver element={topIndicator} bind:intersecting={topIntersecting}>
    <div class="indicator top-indicator" bind:this={topIndicator}></div>
</IntersectionObserver>

<IntersectionObserver element={botIndicator} bind:intersecting={botIntersecting}>
    <div class="indicator bottom-indicator" bind:this={botIndicator}></div>
</IntersectionObserver>

<style lang=sass>
    .indicator
        z-index: -2
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 90%
        //background-color: transparentize(red, 0.5)

    .top-indicator
        height: 10px

    .bottom-indicator
        height: 5rem
        top: calc(100% - 5rem)

    .spinnybg
        z-index: -1
        position: fixed
        top: 0
        left: 0
        width: 100%

        .desc
            animation: fade-in 0.25s ease-in-out
            display: flex
            flex-direction: column

            width: 100%
            height: 50%
            max-height: 50%
            overflow-y: hidden
            justify-content: center
            opacity: 1

        @include for-size(tablet-landscape-up)
            flex-grow: 1

    @keyframes fade-in
        0%
            opacity: 0
        100%
            opacity: 1
</style>