import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://portfolio-sage-nine-97.vercel.app',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/_tokens.scss" as *;`,
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
});
