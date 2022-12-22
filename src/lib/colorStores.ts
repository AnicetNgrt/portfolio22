import { writable } from "svelte/store"
import { randint } from "./math"


// export const newHSL = (hsl: number[]) => {
//     let h = hsl[0]
//     return [
//         randint(h+100, h+180) % 360,
//         randint(50, 100),
//         randint(75, 90)
//     ]
// }

export const newHSL = (hsl: number[]) => {
    let h = hsl[0]

    let newHue = h
    while(Math.abs(newHue - h) < 50 || (newHue > 40 && newHue < 90)) {
        newHue = randint(0, 359)
    }

    return [
        newHue,
        randint(55, 75),
        randint(15, 25)
    ]
}

export const hsl = writable(newHSL([0, 0, 0])) 