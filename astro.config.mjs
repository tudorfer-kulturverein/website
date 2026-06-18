// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://tudorfer-kulturverein.github.io',
  base: '/website',
  integrations: [svelte()]
});
