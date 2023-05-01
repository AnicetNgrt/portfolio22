<script lang=ts>
    import type { PageData } from './$types';

    export let data: PageData;

    const description = data.article?.slice(0, 100) ?? "Anicet Nougaret's portfolio & blog.";
    const title = data.title ?? "Anicet Nougaret's portfolio & blog.";
    const application_name = "Anicet Nougaret's portfolio & blog.";
    const keywords = data.keywords.join(" ") ?? "RUST, MACHINE_LEARNING, ELIXIR, SVELTE, DEV, FRANCE, PARIS, LYON, INSA, IUT, INFORMATIQUE, JAVASCRIPT, TYPESCRIPT, REACT, NODE, EUROPE, STUDENT, TOGO"
    const thumbnail = "anicetnougaret.fr/" + data.cover ?? "/pictures/art/skyscrapper_1.jpg";
</script>

<svelte:head>
    <meta name="application-name" content={application_name}/>
    <meta name="keywords" content={keywords}/>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@AniC_dev" />
    <meta name="twitter:creator" content="@AniC_dev" />
    <meta property="og:url" content="https://anicetnougaret.fr" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="http://{thumbnail}" />
    <meta property="og:image:secure_url" content="https://{thumbnail}" /> 
    <meta property="og:image:type" content="image/jpeg" /> 
    <meta property="og:image:width" content="710" /> 
    <meta property="og:image:height" content="527" />
</svelte:head>