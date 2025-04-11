import { defineConfig } from 'vitepress';
import { zh } from './zh.mjs';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  rewrites: {
    'en/:rest*': ':rest*',
  },
  title: 'gy-fly.top',
  description: 'my website',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  locales: {
    root: { label: 'English', lang: 'en-US' },
    zh: { label: '中文', lang: 'zh-CN', ...zh },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022-${new Date().getFullYear()} G.Y`,
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
