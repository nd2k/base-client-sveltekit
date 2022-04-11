import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const sassPath = `./src/lib/styles/`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import '${sassPath}variables.scss';`
		}
	}),

	kit: {
		adapter: adapter({
			outDir: 'build'
		})
	}
};

export default config;
