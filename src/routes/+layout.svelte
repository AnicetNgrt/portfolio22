<script lang=ts>
    import "../styles/reset.css"
    import "../styles/app.sass"
	import { page } from "$app/stores";
	import { hsl } from "$lib/colorStores";

    const description = "Anicet Nougaret's portfolio. Computer Science student, Full-Stack and Machine Learning developer, indie games creator. Come and discover my programming projects and artistic works.";
    const title = "Anicet Nougaret's portfolio & blog.";
    const application_name = "Anicet Nougaret's portfolio & blog.";
    const keywords = "RUST, MACHINE_LEARNING, ELIXIR, SVELTE, DEV, FRANCE, PARIS, LYON, INSA, IUT, INFORMATIQUE, JAVASCRIPT, TYPESCRIPT, REACT, NODE, EUROPE, STUDENT, TOGO"
</script>

<svelte:head>
    <meta name="application-name" content={application_name}/>
    <meta name="keywords" content={keywords}/>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@AniC_dev" />
    <meta name="twitter:creator" content="@AniC_dev" />
    <meta property="og:url" content={$page.url.toString()} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
</svelte:head>


<!-- <svelte:window on:click={() => hsl.set(newHSL($hsl))}></svelte:window> -->

<div  class="page" style={`--color-h: ${$hsl[0]}; --color-s:${$hsl[1]}%; --color-l:${$hsl[2]}%; --color: hsl(${$hsl[0]}, ${$hsl[1]}%, ${$hsl[2]}%)`}>
    <!-- <LoadingPanel/>
    <TransitionPanel {from} {to}/> -->

    <slot/>
</div>

<style lang=sass>
    @import "../styles/helpers.sass"

    .page
        position: relative
        min-height: 100vh
        width: 100%
</style>