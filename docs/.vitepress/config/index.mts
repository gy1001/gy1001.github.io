import { defineConfig } from 'vitepress';
import { zh } from './zh.mjs';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  rewrites: {
    'en/:rest*': ':rest*',
  },
  title: 'G.Y Fly',
  description: 'my website',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  locales: {
    root: { label: 'English', lang: 'en-US' },
    zh: { label: '中文', lang: 'zh-CN', ...zh },
  },
  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
  ],

  ignoreDeadLinks: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],
    logo: { src: '/images/logo.png', width: 24, height: 24 },
    sidebar: [],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022-${new Date().getFullYear()} G.Y`,
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gy1001/gy1001.github.io' },
    ],
  },
});
