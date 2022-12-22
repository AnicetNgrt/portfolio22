<script lang=ts>
    import "../styles/app.sass"
    import { transitionPanelState  } from "$lib/panelsStores"
	import { onMount } from "svelte";
	import { beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LoadingPanel from "../comps/loadingPanel.svelte";
	import TransitionPanel from "../comps/transitionPanel.svelte";
	import BenchmarkManager from "../hooks/benchmarkManager.svelte";
	import { hsl, newHSL } from "$lib/colorStores";
	import { browser } from "$app/environment";

    let from = "/"
    let to = "/"
    let exiting = false

    page.subscribe(page => {
        if (page.url.pathname == to) {
            console.log("ARRIVED")
            exiting = false
            setTimeout(() => transitionPanelState.set("FADE_OUT"), 100)
        }
    })

    beforeNavigate(navigation => {
        if (exiting) return
        
        if (navigation.to?.url.pathname) {
            to = navigation.to?.url.pathname.slice()
            console.log(to)
        }
        if (navigation.from?.url.pathname) {
            from = navigation.from?.url.pathname.slice()
        }

        if (to == from && to != null) return

        //console.log(to)
        //console.log(from)

        if (from.length > 0 && to.length > 0) {
            transitionPanelState.set("FADE_IN")

            const unsub = transitionPanelState.subscribe(state => {
                if (state == "SHOWING") {
                    exiting = true
                    console.log(`->>> ${to}`)
                    unsub()
                    goto(to)
                }
            })

            navigation.cancel()
        }

    })
</script>

<svelte:window on:click={() => hsl.set(newHSL($hsl))}></svelte:window>

<BenchmarkManager />

<div  class="page" style={`--color-h: ${$hsl[0]}; --color-s:${$hsl[1]}%; --color-l:${$hsl[2]}%; --color: hsl(${$hsl[0]}, ${$hsl[1]}%, ${$hsl[2]}%)`}>
    <LoadingPanel/>
    <TransitionPanel {from} {to}/>

    <slot/>
</div>

<style lang=sass>
    .page
        position: relative
        min-height: 100vh
        width: 100%
</style>