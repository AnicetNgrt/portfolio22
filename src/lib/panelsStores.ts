import { writable } from "svelte/store"
import type { PanelState } from "./panelState"

export const loadingPanelState = writable<PanelState>("HIDDEN")

export const transitionPanelState = writable<PanelState>("HIDDEN")