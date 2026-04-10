import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fivezzza.pages.dev', // update once you have a custom domain
  integrations: [sitemap()],
});
