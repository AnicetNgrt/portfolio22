import farswapXp from "./articles/farswap-xp"
import insaXp from "./articles/insa-xp"
import tutoringXp from "./articles/tutoring-xp"

export const loadingEmojis = "🧙‍♂️🪄⚡🗝️👔📫✨🐦🛣️📡🔗👋🌐🎲🎨🎴🗼"

export interface Page {
    title: string
    href: string
    bg?: string
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
        title: "career & studies",
        cover: "/pictures/insa/memories_insa (1).webp",
        topLeft: "👔",
        topRight: "◥",
        botLeft: "◣",
        right: "← ← ← ← ← ← ← ←",
        fr: "Carrière et études",
        href: "/resume",
        emojis: "🚹👔🎓📜✏️🌁💼🦺📂📌🏢🥼",
        bg: "bg-topo"
    },
    "/web": {
        title: "Fullstack web development",
        cover: "/pictures/projects/farswap/screen0.webp",
        topLeft: "✨",
        topRight: "◪",
        botLeft: "◩",
        right: "<div>Hello</div>",
        fr: "Développement web fullstack",
        href: "/"
    },
    "/gamedev": {
        title: "Game creation & development",
        cover: "/pictures/projects/zugzwang/captureOld.webp",
        topLeft: "🎲",
        topRight: "▨",
        botLeft: "▦",
        right: "« It's dangerous to go alone! Take this. »",
        fr: "Développement de jeux-vidéo",
        href: "/"
    },
    "/branding": {
        title: "Brand identity & design",
        cover: "/pictures/projects/farswap/banner.webp",
        topLeft: "🎴",
        topRight: "⫸",
        botLeft: "⫷",
        right: "—————————————————————",
        fr: "Identités de marques et design",
        href: "/"
    },
    "/art": {
        title: "Art gallery",
        cover: "/pictures/art/skyscrapper_1.webp",
        topLeft: "🎨",
        topRight: "◒",
        botLeft: "◓",
        right: "« Le vent se lève, il faut tenter de vivre. »",
        fr: "Travaux artistiques",
        href: "/"
    },
    "/blog": {
        title: "Blog",
        cover: "/pictures/portraits/portrait0.webp",
        topLeft: "📓",
        topRight: "◈",
        botLeft: "◆",
        right: "HTTP/2 200 OK",
        fr: "Blog",
        href: "/blog",
        emojis: "✏️📓📂🌍💾💡📙📜📰",
        bg: "bg-wigle"
    },
}

export const sections = Object.values(pages)

export interface Article {
    title: string
    cover: string
    date: string
    article: string
}

export interface Story {
    category: string
    title: string
    covers: string[]
    institution?: string
    place?: string
    start?: string
    end?: string
    article?: string
}

export const stories: {[key:string]: Story[]} = {
    "/resume": [
        {
            category: "studies",
            title: "Computer Science engineering student",
            covers: [
                "/pictures/insa/memories_insa (3).webp",
                "/pictures/insa/memories_insa (4).webp",
                "/pictures/insa/memories_insa (2).webp",
                "/pictures/insa/memories_insa (1).webp"
            ],
            institution: "INSA de Lyon",
            place: "Lyon, France",
            start: "09/2021",
            end: "09/2024",
            article: insaXp.article
        },
        {
            category: "freelancing",
            title: "Computer Science & programming private tutor",
            covers: [
                "/pictures/tutoring/tutoring%20(5).webp",
                "/pictures/tutoring/tutoring%20(4).webp",
                "/pictures/tutoring/tutoring%20(3).webp",
                "/pictures/tutoring/tutoring%20(2).webp",
                "/pictures/tutoring/tutoring%20(6).webp"
            ],
            place: "Remote",
            start: "09/2021",
            end: "now",
            article: tutoringXp.article
        },
        {
            category: "entrepreneurship",
            title: "DeFi startup Co-Founder, lead front-end engineer & branding designer",
            covers: [
                "/pictures/projects/farswap/lisbon (5).webp",
                "/pictures/projects/farswap/screen0.webp",
                "/pictures/projects/farswap/lisbon (1).webp",
                "/pictures/projects/farswap/lisbon (2).webp",
                "/pictures/projects/farswap/screen1.webp",
                "/pictures/projects/farswap/lisbon (3).webp",
                "/pictures/projects/farswap/lisbon (4).webp",
                "/pictures/projects/farswap/screen2.webp",
            ],
            institution: "farswap",
            place: "Lyon, France & Lisbon, Portugal",
            start: "04/2023",
            end: "12/2023",
            article: farswapXp.article
        },
        {
            category: "internship",
            title: "Volunteer teacher & back-end developer for a Togolese non-profit",
            covers: [
                "/pictures/projects/tingo/photo (1).webp",
                "/pictures/projects/tingo/classes.webp",
                "/pictures/projects/tingo/photo (2).webp",
                "/pictures/projects/tingo/photo (3).webp",
                "/pictures/projects/tingo/photo (4).webp",
                "/pictures/projects/tingo/uxdesign.webp"
            ],
            institution: "AJVDEC-Togo",
            place: "Lomé, Togo",
            start: "06/2023",
            end: "08/2023",
            article: `
Article coming soon.            
`
        },
        {
            category: "internship",
            title: "Full-stack development intern",
            covers: [
                "/pictures/paris/paris (2).webp",
                "/pictures/projects/freeday/screen3.webp",
                "/pictures/projects/blogc/blogc_desktop_2.webp",
                "/pictures/projects/freeday/screen2.webp",
                "/pictures/projects/blogc/blogc_desktop_3.webp",
                "/pictures/projects/freeday/screen1.webp",
                "/pictures/projects/blogc/blogc_desktop_1.webp",
            ],
            institution: "Coddity",
            place: "Paris, France",
            start: "04/2021",
            end: "06/2021",
            article: `
Article coming soon.            
`
        },
        {
            category: "job",
            title: "Contracted Computer Science freshmen's mentor",
            covers: [
                "/pictures/paris/paris (3).webp",
                "/pictures/paris/paris (1).webp"
            ],
            institution: "IUT de Paris Rives de Seine",
            place: "Paris, France",
            start: "04/2021",
            end: "06/2021",
            article: `
Article coming soon.            
`
        },
        {
            category: "studies",
            title: "Technical Computer Science university student",
            covers: [
                "/pictures/iut/400.webp",
                "/pictures/iut/me.webp",
                "/pictures/iut/ddcBrette.webp"
            ],
            institution: "IUT de Paris Rives de Seine",
            place: "Paris, France",
            start: "09/2019",
            end: "07/2021",
            article: `
Article coming soon.            
`
        }
    ]
}