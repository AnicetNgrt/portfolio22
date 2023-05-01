import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess';
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const filePath = dirname(fileURLToPath(import.meta.url))
const sassPath = `${filePath}/src/styles`

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		sass: {
			prependData: `@import '${sassPath}/helpers'`
		}
	}),

	kit: {
		alias: {
			"$src": "src",
			"$src/*": "src/*",
			"$lib": "src/lib",
			"$lib/*": "src/lib/*"
		},
		adapter: adapter(),
		prerender: {
			entries: [
				"/blog/insa-xp"
			]
		}
	}
};

export default config;
