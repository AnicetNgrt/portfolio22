<script lang=ts>
	import { benchmarking, perf } from "$lib/perfStores";
	import Footer from "./footer.svelte";
	import SpinnyRolesBg from "./spinnyRolesBg.svelte";

    let pageElement: HTMLDivElement
</script>

<div class="content" bind:this={pageElement}>
    <slot {pageElement}/>

    <div class="bg-container">
        {#if $benchmarking}
            <SpinnyRolesBg benchmarking={true} lines={$perf+8} size={32/($perf+8)} speed={1} opacity={1} shift={37}/>
        {:else}
            <slot name="bg"/>
        {/if}
    </div>

    <Footer lines={$perf+8}/>
</div>

<style lang=sass>
    .bg-container
        z-index: -1
        position: absolute
        top: 0
        left: 0
        height: 100%
        width: 100%

    .content
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        // border: double 3px $c5
        width: 100%
        height: fit-content
</style>