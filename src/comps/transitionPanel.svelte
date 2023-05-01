<script lang=ts>
	import { pages } from "$lib/content";
	import { transitionPanelState } from "$lib/panelsStores";
	import FullscreenMultiscroll from "./fullscreenMultiscroll.svelte";

    export let from: string
    export let to: string
</script>

{#if pages[to]}
    <FullscreenMultiscroll let:i state={transitionPanelState} speeds={[-0.1, 0.2, -0.4, 0.2, -0.1]} lines={5}>
        {#if i == 2}
            {#each [...new Array(10)] as _, j}
                {#if pages[from]}
                    <div class="transition-indicator">
                        {j % 2 == 0 ? pages[from].title : pages[to].title}
                    </div>
                    <div class="arrow">{j % 2 == 0 ? 'to' : 'from'}</div>
                {:else}
                    <div class="arrow">⁂ to</div>
                    <div class="transition-indicator">
                        {pages[to].title}
                    </div>
                {/if}
            {/each} 
        {:else if i == 1 || i == 3}
            {#each [...new Array(2)] as _}
            <div class="transition-decoration">
                {`<-▦-> Anicet Nougaret's 2023 Portfolio & Blog`}
            </div>
            {/each}
        {:else}
            {#each [...new Array(7)] as _}
            <div class="loading-emojis">
                <div>{"◑◐◕◔◯◷≜≉≣≢≨≚⊃≵≪≷⊈≼▥▩▤▣▢▨◬◭◆◮◺◈⊤⊫⊯⊥⊧⊨⊩⊦⊭⊮◴◉◵◶◌●"}</div>
            </div>
            {/each}
        {/if}
    </FullscreenMultiscroll>
{/if}

<style lang=sass>
    .loading-emojis
        color: var(--color)
        font-family: $font-mono
        font-weight: 700

    .transition-decoration
        font-family: $font-mono
        padding: 0em 0.5em
        color: var(--color)
        font-weight: 700

    .transition-indicator
        padding: 0em 0.5em
        font-size: 1.5em
        font-weight: 600

    .arrow
        font-family: $font-text
        font-size: 1.5em
        font-weight: 600
        color: var(--color)
</style>