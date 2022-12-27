<script lang=ts>
	import { loadingEmojis } from "$lib/content";
	import { loadingPanelState } from "$lib/panelsStores";
	import { loading } from "$lib/perfStores";
	import FullscreenMultiscroll from "./fullscreenMultiscroll.svelte";

</script>

<FullscreenMultiscroll let:i state={loadingPanelState} speeds={[-0.4, 0.2, -0.1, 0.2, -0.4]} lines={5}>
    {#if i == 2}
        {#each [...new Array(13)] as _}
            <div class="loading-indicator">
                <div class="loading">LOADING</div>
                <div class="number">
                    <span class="zeroes">{ $loading < 10 ? "00" : $loading < 100 ? "0" : "" }</span>{Math.min($loading, 100).toFixed(0)}
                </div>
                <div class="percent">%</div>
            </div>
            <div class="arrow">{'<-▨->'}</div>
        {/each}
    {:else if i == 1 || i == 3}
        {#each [...new Array(10)] as _}
        <div class="loading-disclaimer">
            anicetnougaret.fr
        </div>
        {/each}        
    {:else}
        {#each [...new Array(4)] as _}
        <div class="loading-emojis">
            <div>{loadingEmojis}</div>
        </div>
        {/each}
    {/if}
</FullscreenMultiscroll>

<style lang=sass>
    .loading-disclaimer
        font-weight: 500
        font-family: $font-display
        font-size: 1em
        color: var(--color)
        padding: 0em 0.2em

    .loading-emojis
        font-size: 1.4em
        display: flex
        line-height: 1.1em
        filter: saturate(0.9) sepia(0.2)
        flex-direction: column
        padding: 0.3em 0.1em
        align-items: center

    .loading-indicator
        padding: 0em 1em
        display: flex
        align-items: center
        font-size: 1em
        font-weight: 600
        font-family: $font-display

        .percent, .number
            font-weight: 500
            font-family: $font-mono

        .percent
            margin-left: 0.2em
            color: var(--color)
            font-size: 0.6em

        .number 
            margin-left: 0.25em

            .zeroes
                color: var(--color)

    .arrow
        font-weight: 500
        font-family: $font-mono
        color: var(--color)
</style>