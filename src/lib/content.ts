export const loadingEmojis = "🧙‍♂️🪄⚡🗝️👔📫✨🐦🛣️📡🔗👋🌐🎲🎨🎴🗼"

export interface Page {
    title: string
    href: string
    emojis?: string
    cover?: string
    topLeft?: string
    topRight?: string
    botLeft?: string
    right?: string
    fr?: string
    ru?: string
}

export const pages: {[key: string]: Page} = {
    "/": {
        title: "Main page",
        topLeft: "🧭",
        href: "/",
        emojis: "🌐🪐🌍🧭🌟🌚"
    },
    "/resume": {
        title: "Career & studies",
        cover: "/pictures/portraits/portrait0.jpg",
        topLeft: "👔",
        topRight: "◥",
        botLeft: "◣",
        right: "← ← ← ← ← ← ← ←",
        fr: "Carrière et études",
        href: "/resume",
        emojis: "🚹👔🎓📜✏️🌁💼🦺📂📌🏢🥼"
    },
    "/frontend": {
        title: "Front-end development",
        cover: "/pictures/projects/farswap/screen0.png",
        topLeft: "✨",
        topRight: "◪",
        botLeft: "◩",
        right: "<div>Hello</div>",
        fr: "Développement front-end",
        href: "/frontend"
    },
    "/backend": {
        title: "Back-end development",
        cover: "/pictures/projects/tingo/classes.png",
        topLeft: "💾",
        topRight: "◈",
        botLeft: "◆",
        right: "HTTP/2 200 OK",
        fr: "Développement back-end",
        href: "/backend"
    },
    "/gamedev": {
        title: "Game creation & development",
        cover: "/pictures/projects/zugzwang/captureOld.png",
        topLeft: "🎲",
        topRight: "▨",
        botLeft: "▦",
        right: "« It's dangerous to go alone! Take this. »",
        fr: "Développement de jeux-vidéo",
        href: "/gamedev"
    },
    "/art": {
        title: "Art gallery",
        cover: "/pictures/art/skyscrapper_1.jpg",
        topLeft: "🎨",
        topRight: "◒",
        botLeft: "◓",
        right: "« Le vent se lève, il faut tenter de vivre. »",
        fr: "Travaux artistiques",
        href: "/art"
    },
    "/branding": {
        title: "Brand identity & design",
        cover: "/pictures/projects/farswap/banner.png",
        topLeft: "🎴",
        topRight: "⫸",
        botLeft: "⫷",
        right: "—————————————————————",
        fr: "Identités de marques et design",
        href: "/branding"
    }
}

export const sections = Object.values(pages)

export interface Story {
    title: string
    covers: string[]
    institution?: string
    place?: string
    start?: string
    end?: string
}

export const stories: {[key:string]: Story[]} = {
    "/resume": [
        {
            title: "Computer Science engineering student",
            covers: [
                "/pictures/insa/memories_insa (3).jpg",
                "/pictures/insa/memories_insa (4).jpg",
                "/pictures/insa/memories_insa (2).jpg",
                "/pictures/insa/memories_insa (1).jpg",
                "/pictures/insa/mountains.gif"
            ],
            institution: "INSA de Lyon",
            place: "Lyon, France",
            start: "09/2021",
            end: "09/2024"
        },
        {
            title: "DeFi startup Co-Founder, lead front-end engineer & branding designer",
            covers: [
                "/pictures/projects/farswap/lisbon (5).JPG",
                "/pictures/projects/farswap/screen0.png",
                "/pictures/projects/farswap/lisbon (1).JPG",
                "/pictures/projects/farswap/logos cropped (1).png",
                "/pictures/projects/farswap/lisbon (2).JPG",
                "/pictures/projects/farswap/screen1.png",
                "/pictures/projects/farswap/lisbon (3).JPG",
                "/pictures/projects/farswap/lisbon (4).JPG",
                "/pictures/projects/farswap/screen2.png",
            ],
            institution: "farswap",
            place: "Lyon, France & Lisbon, Portugal",
            start: "04/2022",
            end: "12/2022"
        },
        {
            title: "Volunteer teacher & back-end developer in a Togolese non-profit",
            covers: [
                "/pictures/projects/tingo/photo (1).jpg",
                "/pictures/projects/tingo/classes.png",
                "/pictures/projects/tingo/photo (2).jpg",
                "/pictures/projects/tingo/photo (3).jpg",
                "/pictures/projects/tingo/photo (4).jpg",
                "/pictures/projects/tingo/uxdesign.png"
            ],
            institution: "AJVDEC-Togo",
            place: "Lomé, Togo",
            start: "06/2022",
            end: "08/2022"
        },
        {
            title: "Full-stack development intern",
            covers: [
                "/pictures/paris/paris (2).JPG",
                "/pictures/projects/freeday/screen3.png",
                "/pictures/projects/blogc/blogc_desktop_2.PNG",
                "/pictures/projects/freeday/screen2.png",
                "/pictures/projects/blogc/blogc_desktop_3.PNG",
                "/pictures/projects/freeday/screen1.png",
                "/pictures/projects/blogc/blogc_desktop_1.PNG",
            ],
            institution: "Coddity",
            place: "Paris, France",
            start: "04/2021",
            end: "06/2021"
        },
        {
            title: "Contracted Computer Science freshmen's mentor",
            covers: [
                "/pictures/paris/paris (3).JPG",
                "/pictures/paris/paris (1).JPG"
            ],
            institution: "Université de Paris Rives de Seine",
            place: "Paris, France",
            start: "04/2021",
            end: "06/2021"
        },
        {
            title: "Technical Computer Science university student",
            covers: [
                "/pictures/iut/400.PNG",
                "/pictures/iut/me.png",
                "/pictures/iut/ddcBrette.PNG"
            ],
            institution: "IUT de Paris Rives de Seine",
            place: "Paris, France",
            start: "09/2019",
            end: "07/2021"
        }
    ]
}