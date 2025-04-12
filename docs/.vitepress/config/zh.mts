import {defineConfig, type DefaultTheme} from "vitepress";

export const zh = defineConfig({
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/zh/skill/front/": {
        base: '/zh/skill/front/',
        items: sidebarFront()
      },
      '/zh/interview/': {
        base: '/zh/interview/',
        items: sidebarInterview()
      },
      '/zh/collect/': {
        base: '/zh/collect/',
        items: sidebarCollect()
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
      link: '/zh/interview/scope',
      activeMatch: '/zh/interview',
    },
    {
      text: '美文推荐',
      link: '/zh/collect/index',
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

function sidebarInterview(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '面试题',
      items: [
        {text: '作用域', link: 'scope/'},
      ]
    },
    {text: '简历相关', link: 'resume/index'},
    {text: 'Html 相关', link: 'html/html.md'},
    {
      text: 'Css 相关',
      items: [
        {text: 'Css 面试题', link: 'css/index-01.md'},
        {text: 'Css 布局', link: 'css/css-layout.md'},
        {text: 'Css 定位', link: 'css/css-position.md'},
        {text: 'Css 图形', link: 'css/css-graphics.md'},
        {text: 'Css 响应式', link: 'css/css-reactive.md'},
      ],
    },
    {
      text: 'JavaScript 相关',
      items: [
        {text: 'JavaScript 面试题', link: 'javascript/basic-00.md'},
        {text: '变量类型和计算', link: 'javascript/basic-01.md'},
        {text: '原型和原型链', link: 'javascript/basic-02.md'},
        {text: '作用域和闭包', link: 'javascript/basic-03.md'},
        {text: '异步和单线程', link: 'javascript/basic-04.md'},
        {text: '异步进阶', link: 'javascript/basic-05.md'},
        {text: 'JS-Web-API-DOM', link: 'javascript/basic-06.md'},
        {text: 'JS-Web-API-BOM操作', link: 'javascript/basic-07.md'},
        {text: 'JS-Web-API-事件', link: 'javascript/basic-08.md'},
        {text: 'JS-Web-API-Ajax', link: 'javascript/basic-09.md'},
        {text: 'JS-Web-API-存储', link: 'javascript/basic-10.md'},
        {text: 'New 关键字', link: 'javascript/new.md'},
        {text: 'This', link: 'javascript/this.md'},
      ],
    },
    {
      text: 'ES6 相关', link: 'es6/index-01.md'
    },
    {
      text: 'TS 相关', link: 'ts/index-01.md'
    },
    {
      text: '工程化相关', link: 'engineering/index-01.md'
    },
    {
      text: 'Webpack 相关', link: 'webpack/index-01.md'
    },
    {
      text: 'Vue 相关', link: 'vue/index-01.md'
    },
    {
      text: 'React 相关', link: 'react/index-01.md'
    },
    {
      text: 'Http 相关', link: 'http/http-01.md'
    },
    {
      text: 'Node 相关', link: 'node/node-01.md'
    },
    {
      text: '开发环境', link: 'environment/development/01.md'
    },
    {
      text: '运行环境', link: 'environment/production/01.md'
    },
    {
      text: '算法相关',
      items: [{text: '01', link: 'algorithm/01.md'},
        {text: '02', link: 'algorithm/02.md'}],

    },
    {text: '面试真题', link: 'questions/01.md'},
  ]
}

function sidebarCollect(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Github大佬', link: 'github/github.md'},
    {
      text: '技术相关',
      items: [
        {
          text: '简书',
          items: [],
        },
        {
          text: '掘金',
          items: [],
        },
        {
          text: '其他',
          items: [
            {
              text: '设计模式',
              base: 'https://',
              link: 'refactoringguru.cn/design-patterns',
            },
            {
              text: '数据结构',
              base: 'https://',
              link: 'mp.weixin.qq.com/s/PzncE_ofS4M0b6KB9ESWnA',
            },
          ],
        },

      ]
    },
    {
      text: '读书笔记',
      items: [
        {
          text: '简书',
          items: [],
        },
        {
          text: '掘金',
          items: [
            {text: 'Vue 组件间的属性透传 (01)--Vue2.x', link: 'note/jue-jin/index-01.md'},
            {text: 'Vue 组件间的事件透传 (02)--Vue2.x', link: 'note/jue-jin/index-02.md'},
            {text: 'Vue 组件间的属性透传 (03)--Vue3.x', link: 'note/jue-jin/index-03.md'},
            {text: 'Vue 组件间的事件透传 (04)--Vue3.x', link: 'note/jue-jin/index-04.md'},
            {text: 'Vue 组件间的属性、事件透传 (05)–实际应用', link: 'note/jue-jin/index-05.md'},
          ],
        },
        {
          text: '编程相关',
          items: [
            {text: '你不知道的JavaScript', link: 'books/你不知道的JavaScript.md'},
            {text: 'JavaScript高级程序设计', link: 'books/JavaScript高级程序设计.md'},
          ],
        },
      ],
    },
  ]
}