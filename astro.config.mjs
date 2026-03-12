import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://portfolio-sage-nine-97.vercel.app',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 모든 컴포넌트에서 토큰 변수 자동 주입
          additionalData: `@use "/src/styles/_tokens.scss" as *;`,
          // Suppress legacy Sass JS API deprecation warning
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
});
