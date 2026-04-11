import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://fivezzza.pages.dev', // update once you have a custom domain
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [sitemap(), icon()],
  build: {
    inlineStylesheets: 'always',
  },
});
