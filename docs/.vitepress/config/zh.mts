import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/zh/skill/front/": {
        base: '/zh/skill/front/',
        items: [
          {
            text: 'HTML5三剑客',
            collapsed: false,
            items: [
              {
                text: '前端发展史',
                link: 'swordsman/index'
              },
              {
                text: 'HTML',
                link: 'swordsman/html'
              },
              {
                text: 'CSS',
                link: 'swordsman/css'
              },
              {
                text: 'JavaScript',
                link: 'swordsman/js'
              }
            ]
          },
          {
            text: 'JavaScript相关',
            collapsed: true,
            items: [
              {text:"Module-模块化", link:"about/module"}
            ]
          }
        ]
      }
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2022-${new Date().getFullYear()} G.Y`,
    },
  },
});


function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/zh/' },
    {
      text: '技术相关',
      link: '/zh/skill/front/swordsman',
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
  ]
}