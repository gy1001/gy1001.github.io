import { defineUserConfig, defaultTheme } from 'vuepress'
import { sidebarZh, sidebarEn } from '../.vuepress/configs/siderbar/zh'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { photoSwipePlugin } from 'vuepress-plugin-photo-swipe'
import { commentPlugin } from 'vuepress-plugin-comment2'
import { searchPlugin } from '@vuepress/plugin-search'
// https://vuepress-theme-hope.github.io/v2/md-enhance/guide/mermaid.html#sequence-diagram
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
export default defineUserConfig({
  base: '/',
  port: 9000,
  head: [['meta', { name: 'referrer', content: 'no-referrer' }]],
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
  // 站点配置
  lang: 'zh-CN',
  title: 'gyfly.top',
  description: '随便写写',
  theme: defaultTheme({
    contributors: false,
    lastUpdated: true,
    lastUpdatedText: '上次更新',
    logo: '/images/logo.png',
    locales: {
      '/': {
        sidebar: sidebarEn,
        navbar: [],
      },
      '/zh/': {
        sidebar: sidebarZh,
        navbar: [
          {
            text: '技术相关',
            link: '/zh/skill/front/',
          },
          {
            text: '面试相关',
            link: '/zh/interview',
          },
          {
            text: '美文推荐',
            link: '/zh/collect',
          },
          {
            text: '其他',
            link: '/zh/other/',
          },
          {
            text: '休闲娱乐',
            children: [
              {
                text: '更新日志',
                link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
              },
            ],
          },
        ],
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
      },
    },
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
    copyCodePlugin({
      // 插件选项
    }),
    photoSwipePlugin({}),
    commentPlugin({
      provider: 'Waline',
      serverURL: 'https://gy1001-comment.vercel.app',
      dark: 'auto',
      login: 'enable',
    }),
    mdEnhancePlugin({
      // Enable mermaid
      mermaid: true,
      flowchart: true,
    }),
  ],
  markdown: {
    code: {
      lineNumbers: true,
    },
  },
})
