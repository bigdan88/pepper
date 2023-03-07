import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Inspect from 'vite-plugin-inspect'

const config: UserConfig = {
	plugins: [sveltekit(), Inspect()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
