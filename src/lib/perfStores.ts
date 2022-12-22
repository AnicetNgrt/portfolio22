import { writable } from "svelte/store";

export const benchmarking = writable(false)
export const loading = writable(0)
export const reportPerformance = writable((_fpsToAnimateScale: number) => {})
export const perf = writable(0)