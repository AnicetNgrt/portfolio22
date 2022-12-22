export function randint(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

export function sum(array: number[]) {
    return array.reduce((acc, val) => acc+val, 0)
}

export function wave(x: number) {
    return (Math.cos(2*Math.PI*x + Math.PI)/2)+0.5
}