<script lang=ts>
	import { pages } from "$lib/content";
	import { transitionPanelState } from "$lib/panelsStores";
	import FullscreenMultiscroll from "./fullscreenMultiscroll.svelte";

    export let from: string
    export let to: string
</script>

<FullscreenMultiscroll let:i state={transitionPanelState} speeds={[-0.1, 0.2, -0.4, 0.2, -0.1]} lines={5}>
    {#if i == 2}
        {#each [...new Array(10)] as _, j}
            <div class="transition-indicator">
                {j % 2 == 0 ? pages[from].title : pages[to].title}
            </div>
            <div class="arrow">{j % 2 == 0 ? 'to' : 'from'}</div>
        {/each} 
    {:else if i == 1 || i == 3}
        {#each [...new Array(2)] as _}
        <div class="transition-decoration">
            {`<-▦-> Anicet Nougaret's 2022 portfolio`}
        </div>
        {/each}
    {:else}
        {#each [...new Array(7)] as _}
        <div class="loading-emojis">
            <div>{pages[to].emojis}</div>
        </div>
        {/each}
    {/if}
</FullscreenMultiscroll>

<style lang=sass>
    .transition-decoration
        font-family: $font-mono
        padding: 0em 0.5em
        opacity: 0.2
        font-weight: 700

    .transition-indicator
        padding: 0em 0.5em
        font-size: 1.5em
        font-weight: 600

        + .arrow
            font-family: $font-text
            font-size: 1.5em
            font-weight: 600
            opacity: 0.2
</style>