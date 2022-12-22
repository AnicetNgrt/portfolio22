<script lang=ts>
	import { pages } from "$lib/content";
	import PageBanner from "../../comps/pageBanner.svelte";
	import Page from "../../comps/page.svelte";
	import PageBodyAndNav from "../../comps/pageBodyAndNav.svelte";
	import Caroussel from "../../comps/caroussel.svelte";

    const route = "/resume"

    type CareerStep = {
        title: string
        description: string
        type: string
        location: string
        city: string
        logo: string
        pictures: {src: string, alt: string, width: number, height: number}[][]
        startMonth: number
        startYear: number
        endMonth: number
        endYear: number
    }
    const career: CareerStep[] = [
        {
            title: "Frontend engineering advisor (previously Co-Founder, CTO & Frontend lead engineer)",
            description: `
            After ranking 7th at a hackathon in April 2022, my team of fellow CS students and I, decided to launch a startup aiming to develop a state of the art decentralized exchange for the NEAR blockchain.
            <br>
            Choosing NEAR for its fast growth potential and low energy consumption, this entrepreneurship journey made me go above and beyond my comfort zone. 
            <br>
            For instance, I lead the frontend engineering, design and branding of a MVP for 1 month during the hackathon, with cutting edge technologies such as SvelteKit and Rust. 
            <br>
            Then I did the same thing for the private beta version released 4 months after the hackathon, including many new features, design iterations and redesigning the whole branding and app 2 times of my own.
            <br>
            I also built and designed a landing page that brought 2.5k users to our private beta.
            <br>
            Then, I pitched the project in front of 50+ people during a business trip at NEAR CON 2022 in Lisbon. There, I established some useful & lasting business contacts.
            <br>
            Since November, I voluntarily stepped down from my co-founding and CTO roles, seeking a better work and studies balance. From then on, I'll only be giving expertise to the team and maintaining the Frontend codebase, trying to perfect the user-facing part of the product towards the big public release.
            <br>
            In conclusion: Although I want to use my skills in other fields than web3 and blockchain in the future, I learned so much about business, profesional relationships, team work, blockchain, and of course, software development during this journey.
            `,
            type: "Entrepreneurship",
            location: "theFar (farswap)",
            city: "remote",
            logo: "https://media-exp1.licdn.com/dms/image/D4D0BAQF6Ofy89F8uSQ/company-logo_200_200/0/1666162368958?e=1677110400&v=beta&t=NC_M6E2_b7jabn3Q_Ye2ZPAyIlprY9w_EFvyIj2-tw0",
            pictures: [
                [
                    { src: "/pictures/projects/farswap/screen3.png", alt: "Screenshot of the landing page. Desktop dark design", width: 1918, height: 862},
                    { src: "/pictures/projects/farswap/screen2.png", alt: "Screenshot of private beta app. Desktop light (top-right) and dark (bottom-left) design", width: 1920, height: 866},
                    { src: "/pictures/projects/farswap/screen0.png", alt: "Screenshot of private beta app. Old desktop light design", width: 1920, height: 867},
                    { src: "/pictures/projects/farswap/logoNameLight.png", alt: "Logo for the main product.", width: 2024, height: 1012},
                    { src: "/pictures/projects/farswap/logoNameLight2.png", alt: "Logo for the startup, featuring the mascot I also designed.", width: 1012, height: 506},
                ],
                [
                    { src: "/pictures/projects/farswap/screen5.png", alt: "Screenshot of private beta app. Mobile light design", width: 373, height: 756},
                    { src: "/pictures/projects/farswap/screen4.png", alt: "Screenshot of the landing page. Mobile dark design", width: 356, height: 756},
                ],
                [
                    { src: "/pictures/projects/farswap/lisbon (4).JPG", alt: "Photograph at NEAR CON 2022 in Lisbon.", width: 3000, height: 4000},
                    { src: "/pictures/projects/farswap/lisbon (3).JPG", alt: "Photograph at NEAR CON 2022 in Lisbon.", width: 4000, height: 3000},
                    { src: "/pictures/projects/farswap/lisbon (2).JPG", alt: "Photograph at NEAR CON 2022 in Lisbon.", width: 3000, height: 4000},
                    { src: "/pictures/projects/farswap/lisbon (1).JPG", alt: "Photograph at NEAR CON 2022 in Lisbon.", width: 3000, height: 4000},
                    { src: "/pictures/projects/farswap/lisbon (5).JPG", alt: "Photograph at NEAR CON 2022 in Lisbon.", width: 4000, height: 3000},
                ]
            ],
            startMonth: 4,
            startYear: 22,
            endMonth: -1,
            endYear: -1
        },
        // {
        //     title: "Backend developer & volunteer",
        //     description: `
        //     <ul><li>Engineered a C# ASP.NET Core API for an accessible & low data consumption audio-based Youtube alternative that empowers both literate and illiterate Togolese people online. Used Agile methodology.</li> 
        //     <li>Invested myself in humanitarian tasks such as giving daily computer lessons to more than 60 kids and orphans.</li><ul/>
        //     `,
        //     type: "Entrepreneurship",
        //     location: "AJVDEC-Togo",
        //     city: "Lomé, Togo",
        //     logo: "https://media-exp1.licdn.com/dms/image/C560BAQEc1MfqjlFawA/company-logo_200_200/0/1519912599922?e=1677110400&v=beta&t=VJCk4perEdVhM6JmcA9NaiMnAvjLzqi1M5fmXdjm6U0",
        //     pictures: [],
        //     startMonth: 4,
        //     startYear: 22,
        //     endMonth: 11,
        //     endYear: 22
        // },
    ]
</script>

<Page>
    <PageBanner page={pages[route]}/>
    <PageBodyAndNav {route}>
        <h1>{pages[route].title}</h1>
        <div class="resume">
            {#each career as step}
                {#each step.pictures as collection}
                    <Caroussel width={950} height={450} pictures={collection} />
                {/each}
            {/each}
        </div>
    </PageBodyAndNav>
    
    <svelte:fragment slot="bg">
        <div class="bg"></div>
    </svelte:fragment>
</Page>

<style lang=sass>
    .resume
        display: flex
        flex-direction: column


    h1
        line-height: 2.5rem
        font-size: 2.5rem
        color: var(--color)
        font-weight: 500

    p
        font-size: 2rem
        width: 65ch
        max-width: 100%
        opacity: 1

    .bg
        width: 100vw
        height: 100vh
        position: fixed
        background-size: contain
        //background: radial-gradient(900px at top 0% right 20%, #150944b6, transparent), radial-gradient(800px at top 4% left 30%, #14556a55, transparent), radial-gradient(900px at bottom 25% right 10%, rgba(255, 242, 1, 0.163), transparent), radial-gradient(700px at bottom 0% left 20%, #41033b, #030006)
</style>

