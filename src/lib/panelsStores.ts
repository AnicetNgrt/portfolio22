import { writable } from "svelte/store"
import type { PanelState } from "./panelState"

export const loadingPanelState = writable<PanelState>("SHOWING")

export const transitionPanelState = writable<PanelState>("HIDDEN")