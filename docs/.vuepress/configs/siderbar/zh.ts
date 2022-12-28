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
        '/zh/skill/front/about/gulp.md',
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
      children: [
        '/zh/skill/front/mini-frame/mini-vue.md',
        '/zh/skill/front/mini-frame/mini-webpack.md',
      ],
    },
    {
      text: '源码解读',
      children: [
        '/zh/skill/front/source/axios.md',
        '/zh/skill/front/source/promise.md',
        '/zh/skill/front/source/utils.md',
        '/zh/skill/front/source/jquery.md',
        {
          text: 'Vue源码',
          children: [
            '/zh/skill/front/source/vue/mustache.md',
            '/zh/skill/front/source/vue/diff.md',
            '/zh/skill/front/source/vue/reactivity.md',
            '/zh/skill/front/source/vue/ast.md',
            '/zh/skill/front/source/vue/direct-method.md',
            '/zh/skill/front/source/vue/vue-question.md',
          ],
        },
      ],
    },
    {
      text: '一些翻译',
      children: ['/zh/skill/front/translate/require-js.md'],
    },
  ],
  '/zh/interview': [
    {
      text: 'Html 相关',
      children: ['/zh/interview/html/html.md'],
    },
    {
      text: 'Css 相关',
      children: [
        '/zh/interview/css/css-layout.md',
        '/zh/interview/css/css-position.md',
        '/zh/interview/css/css-graphics.md',
        '/zh/interview/css/css-reactive.md',
      ],
    },
    {
      text: 'JavaScript 相关',
      children: [
        '/zh/interview/javascript/basic-01.md',
        '/zh/interview/javascript/basic-02.md',
        '/zh/interview/javascript/basic-03.md',
        '/zh/interview/javascript/basic-04.md',
        '/zh/interview/javascript/basic-05.md',
        '/zh/interview/javascript/basic-06.md',
        '/zh/interview/javascript/basic-07.md',
        '/zh/interview/javascript/basic-08.md',
        '/zh/interview/javascript/basic-09.md',
        '/zh/interview/javascript/new.md',
        '/zh/interview/javascript/this.md',
      ],
    },
    {
      text: 'Webpack 相关',
      children: ['/zh/interview/webpack/webpack.md'],
    },
    {
      text: 'Vue 相关',
      children: ['/zh/interview/vue/vue-01.md'],
    },
    {
      text: 'React 相关',
      children: ['/zh/interview/react/react-01.md'],
    },
    {
      text: 'Http 相关',
      children: ['/zh/interview/http/http-01.md'],
    },
    {
      text: 'Node 相关',
      children: ['/zh/interview/node/node-01.md'],
    },
  ],
  '/zh/collect': [
    {
      text: 'Github大佬',
      collapsible: false,
      children: [
        '/zh/collect/github/github.md'
      ]
    },
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
        {
          text: '编程相关',
          children: [
            '/zh/collect/books/你不知道的JavaScript.md',
            '/zh/collect/books/JavaScript高级程序设计.md',
          ],
        },
      ],
    },
  ],
  '/zh/other': [
    {
      text: '其他推荐',
      children: ['/zh/other/', '/zh/other/video'],
    },
    {
      text: '常用快捷键',
      collapsible: false,
      children: ['/zh/other/hotkey/vscode.md'],
    },
    {
      text: '折腾笔记',
      children: [
        '/zh/other/toss/mac-in-windows.md',
        '/zh/other/toss/deepin.md',
      ],
    },
    {
      text: '问题合集',
      children: ['/zh/other/question/bug-list-01.md'],
    },
    {
      text: '课程笔记',
      collapsible: false,
      children: [
        '/zh/other/class/program-basic',
        '/zh/other/class/linear-algebra',
        '/zh/other/class/vue3-learn-practice',
        '/zh/other/class/interview-front',
        '/zh/other/class/ts+axios'
      ],
    },
  ],
}

export const sidebarEn: SidebarConfig = {}
