import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/skill/front/': [
    {
      text: 'HTML5三剑客',
      children: [
        '/zh/skill/front/',
        '/zh/skill/front/swordsman/html.md',
        '/zh/skill/front/swordsman/css.md',
        '/zh/skill/front/swordsman/js.md',
      ],
    },
    {
      text: 'JavaScript相关',
      children: [
        '/zh/skill/front/about/module.md',
        '/zh/skill/front/about/jquery.md',
        '/zh/skill/front/about/grunt.md',
        '/zh/skill/front/about/webpack.md',
        '/zh/skill/front/about/axios.md',
        '/zh/skill/front/about/typeScript.md',
        '/zh/skill/front/about/promise.md',
        '/zh/skill/front/about/todo.md',
      ],
    },
    {
      text: '前端框架',
      children: [
        '/zh/skill/front/frame/vue.md',
        '/zh/skill/front/frame/react.md',
      ],
    },
    {
      text: 'mini-前端框架',
      children: ['/zh/skill/front/mini-frame/mini-vue.md'],
    },
    {
      text: '源码解读',
      children: ['/zh/skill/front/source/axios.md'],
    },
    {
      text: '一些翻译',
      children: ['/zh/skill/front/translate/require-js.md'],
    },
  ],

  '/zh/collect': [
    {
      text: '技术相关',
      collapsible: false,
      children: [
        {
          text: '简书',
          children: [],
        },
        {
          text: '掘金',
          children: [],
        },
        {
          text: '其他',
          children: [
            {
              text: '设计模式',
              link: 'https://refactoringguru.cn/design-patterns',
            },
            {
              text: '数据结构',
              link: 'https://mp.weixin.qq.com/s/PzncE_ofS4M0b6KB9ESWnA',
            },
          ],
        },
      ],
    },
    {
      text: '读书笔记',
      collapsible: false,
      children: [
        {
          text: '简书',
          children: [],
        },
        {
          text: '掘金',
          children: [],
        },
      ],
    },
  ],
  '/zh/other/': [
    {
      text: '其他推荐',
      collapsible: false,
      children: ['/zh/other/', '/zh/other/video'],
    },
    {
      text: '课程笔记',
      collapsible: false,
      children: [
        '/zh/other/class/program-basic',
        '/zh/other/class/linear-algebra',
        '/zh/other/class/vue3-learn-practice',
      ],
    },
  ],
}

export const sidebarEn: SidebarConfig = {}
