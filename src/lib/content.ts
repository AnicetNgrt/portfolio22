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
        title: "Game development",
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