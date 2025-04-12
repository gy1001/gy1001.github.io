import {defineConfig, type DefaultTheme} from "vitepress";

export const zh = defineConfig({
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/zh/skill/front/": {
        base: '/zh/skill/front/',
        items: sidebarFront()
      }
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2022-${new Date().getFullYear()} G.Y`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航',
      level: 'deep'
    },
  },
});


function nav(): DefaultTheme.NavItem[] {
  return [
    {text: '首页', link: '/zh/'},
    {
      text: '技术相关',
      link: '/zh/skill/front/swordsman/',
      activeMatch: '/zh/skill/front/',
    },
    {
      text: '面试相关',
      link: '/zh/interview/',
      activeMatch: '/zh/interview/',
    },
    {
      text: '美文推荐',
      link: '/zh/collect/',
      activeMatch: '/zh/collect/',
    },
    {
      text: '其他',
      link: '/zh/other/',
      activeMatch: '/zh/other/',
    },
  ]
}

function sidebarFront(): DefaultTheme.SidebarItem[] {
  return [
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
        {text: "Module-模块化", link: "about/module"},
        {text: 'Axios', link: "about/axios"},
        {text: 'Babel', link: "about/babel"},
        {text: 'Grunt', link: "about/grunt"},
        {text: 'Gulp', link: "about/gulp"},
        {text: 'JQuery', link: "about/jquery"},
        {text: 'Promise', link: "about/promise"},
        {text: 'TypeScript', link: "about/typescript"},
        {text: 'Webpack', link: "about/webpack"},
        {text: 'Todo', link: "about/todo"},
      ]
    },
    {
      text: '包管理相关',
      collapsed: true,
      items: [
        {text: 'Npm', link: "package/npm"},
        {text: 'Npm Vs Yarn Vs Pnpm', link: "package/npm-yarn-pnpm"},
        {text: 'Pnpm', link: "package/pnpm"},
        {text: 'Yarn', link: "package/yarn"},
      ]
    },
    {
      text: '前端框架',
      items: [
        {text: 'Vue', link: 'frame/vue.md'},
        {text: 'React', link: 'frame/react.md'},
      ],
    },
    {
      text: 'mini-前端框架',
      items: [
        {
          text: 'mini-vue', link: 'mini-frame/mini-vue.md'
        },
        {
          text: 'mini-webpack',
          items: [
            {text: 'gy-webpack', link: 'mini-frame/mini-webpack/gy-webpack.md'},
            {text: 'loader', link: 'mini-frame/mini-webpack/loader.md'},
            {text: 'plugin', link: 'mini-frame/mini-webpack/plugin.md'},
          ],
        },
        {text: 'mini-router', link: 'mini-frame/mini-router.md'},
        {text: 'mini-vue-router', link: 'mini-frame/mini-vue-router.md'},
        {text: 'mini-pinia', link: 'mini-frame/mini-pinia.md'},
      ],
    },
    {
      text: '源码解读',
      items: [
        {text: 'Axios', link: 'source/axios.md'},
        {text: 'Promise', link: 'source/promise.md'},
        {text: 'Utils', link: 'source/utils.md'},
        {text: 'JQuery', link: 'source/jquery.md'},
        {
          text: 'Vue源码',
          collapsed: false,
          items: [
            {text: 'Mustache', link: 'source/vue/mustache.md'},
            {text: 'Diff', link: 'source/vue/diff.md'},
            {text: 'Reactivity', link: 'source/vue/reactivity.md'},
            {text: 'AST', link: 'source/vue/ast.md'},
            {text: 'Direct', link: 'source/vue/direct-method.md'},
            {text: 'Vue-Question', link: 'source/vue/vue-question.md'},
          ],
        },
        {text: 'Vuex源码', link: 'source/vuex.md'},
        {text: '自定义Router', link: 'source/router.md',},
      ],
    },
    {
      text: '一些翻译',
      items: [
        {text: 'RequireJs', link: 'translate/require-js.md'}
      ]
    },
  ]
}