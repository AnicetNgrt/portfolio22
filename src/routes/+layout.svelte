<script lang=ts>
    import "../styles/app.sass"
    import Roles from '../comps/roles.svelte';

    const lines = 14
    let indexes: number[] = []
    for (let i = 0; i < lines; i++) indexes.push(i)

    let scrollY: number
    let t = Math.random()*1000

    function incT() {
        t += 0.01
        setTimeout(incT, 100)
    }

    incT()

    function curve(n: number) {
        return (Math.sin(n)/2)+0.5
    }
</script>

<div class="page" style={`--color-h: ${(curve(t+3.14)+0.3)*360}; --color: hsl(${(curve(t+3.14)+0.3)*360}, ${(curve(t*10)+0.3)*50}%, var(--color-l))`}>
    <div class="content">
        <slot/>
    </div>
    <div class="spinnybg" style={`${scrollY > 100 && "filter: blur(7px) grayscale(1)"}`}>
        <div class="desc">
            {#each [...indexes].reverse() as index}
                <Roles stop={scrollY > 100} {index} quantity={lines}/>
            {/each}
        </div> 
        <div class="desc">
            {#each indexes as index}
                <Roles stop={scrollY > 100} {index} quantity={lines}/>
            {/each}
        </div>
    </div>
</div>

<svelte:window bind:scrollY={scrollY} />

<style lang=sass>
    .page
        position: relative
        min-height: 100vh
        width: 100vw

    .content
        display: flex
        flex-direction: column
        align-items: center
        // border: double 3px $c5
        width: 100%

    .spinnybg
        z-index: -1
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: calc(100vh + 20%)
        transform: translateY(-10%)
        background-color: $c0

        .desc
            display: flex
            flex-direction: column

            width: 100%
            height: 55vh
            justify-content: space-around
            opacity: 0.5

        @include for-size(tablet-landscape-up)
            flex-grow: 1

</style>