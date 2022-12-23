<script lang=ts>
	import { mod, randint } from "$lib/math";

    export let width: number
    export let height: number
    export let pictures: {src: string, alt: string, width: number, height: number}[]

    let index = 0
</script>