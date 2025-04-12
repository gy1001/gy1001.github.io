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
      },
      '/zh/other/': {
        base: '/zh/other/',
        items: sidebarOther()
      },
      '/zh/study-note/': {
        base: '/zh/study-note/',
        items: sideBarStudyNote()
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
      text: '学习笔记',
      link: '/zh/study-note/class/vue3-learn-practice',
      activeMatch: '/zh/study-note/',
    },
    {
      text: '其他',
      link: '/zh/other/index',
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
      collapsed: false,
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
      collapsed: false,
      items: [
        {text: 'Npm', link: "package/npm"},
        {text: 'Npm Vs Yarn Vs Pnpm', link: "package/npm-yarn-pnpm"},
        {text: 'Pnpm', link: "package/pnpm"},
        {text: 'Yarn', link: "package/yarn"},
      ]
    },
    {
      text: '前端框架',
      collapsed: false,
      items: [
        {text: 'Vue', link: 'frame/vue.md'},
        {text: 'React', link: 'frame/react.md'},
      ],
    },
    {
      text: 'mini-前端框架',
      collapsed: false,
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
      collapsed: false,
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
      collapsed: false,
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
      collapsed: false,
      items: [
        {text: '作用域', link: 'scope/'},
      ]
    },
    {text: '简历相关', link: 'resume/index'},
    {text: 'Html 相关', link: 'html/html.md'},
    {
      text: 'Css 相关',
      collapsed: false,
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
      collapsed: false,
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
      text: 'JavaScript 进阶相关',
      collapsed: false,
      items: [
        {text: 'ES6 相关', link: 'es6/index-01.md'},
        {text: 'TS 相关', link: 'ts/index-01.md'},
        {text: '工程化相关', link: 'engineering/index-01.md'},
        {text: 'Webpack 相关', link: 'webpack/index-01.md'},
        {text: 'Vue 相关', link: 'vue/index-01.md'},
        {text: 'React 相关', link: 'react/index-01.md'},
        {text: 'Http 相关', link: 'http/http-01.md'},
        {text: 'Node 相关', link: 'node/node-01.md'},
        {text: '开发环境', link: 'environment/development/01.md'},
        {text: '运行环境', link: 'environment/production/01.md'},
      ]
    },
    {
      text: '算法相关',
      collapsed: false,
      items: [{text: '01', link: 'algorithm/01.md'},
        {text: '02', link: 'algorithm/02.md'}],

    },
    {text: '面试真题', link: 'questions/01.md'},
  ]
}

function sidebarCollect(): DefaultTheme.SidebarItem[] {
  return [
    {text: 'Github大佬', link: 'github/github.md'},
    {
      text: '技术相关',
      collapsed: false,
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
          collapsed: false,
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
      collapsed: false,
      items: [
        {
          text: '简书',
          items: [],
        },
        {
          text: '掘金',
          collapsed: false,
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
          collapsed: false,
          items: [
            {text: '你不知道的JavaScript', link: 'books/你不知道的JavaScript.md'},
            {text: 'JavaScript高级程序设计', link: 'books/JavaScript高级程序设计.md'},
          ],
        },
      ],
    },
  ]
}

function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '推荐',
      collapsed: false,
      items: [
        {text: 'APP 推荐', link: 'index.md'},
        {text: '影视博主推荐', link: 'video.md'},
      ]
    },
    {
      text: '常用快捷键',
      collapsed: false,
      items: [
        {text: 'VSCode', link: 'hotkey/vscode.md'},
        {text: 'Chrome', link: 'hotkey/chrome.md'},
        {text: 'Karabiner Elements', link: 'hotkey/karabiner-elements.md'},
      ],
    },
    {
      text: '折腾笔记',
      collapsed: false,
      items: [
        {text: 'Mac 在 Windows 下使用', link: 'toss/mac-in-windows.md'},
        {text: 'Deepin', link: 'toss/deepin.md'},
      ],
    },
    {
      text: 'Bug 问题合集',
      collapsed: false,
      items: [{
        text: '工作中遇到的问题',
        link: 'question/bug-list-01.md'
      }],
    },
  ]
}

function sideBarStudyNote(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '课程学习笔记',
      collapsed: false,
      base: '/zh/study-note/class/',
      items: [
        {text: 'Vue3 从入门到实战', link: 'vue3-learn-practice'},
        {
          text: '编程基础',
          collapsed: false,
          items: [
            {text: '编程基础-01', link: 'program-basic/index-01'},
            {text: '编程基础-02', link: 'program-basic/index-02'},
          ]
        },
        {text: '专为程序员设计的线性代数课程', link: 'linear-algebra'},
        {text: '快速搞定前端技术一面', link: 'interview-front'},
        {
          text: '2周刷完100道前端优质面试真题',
          collapsed: false,
          items: [
            {text: '课程简介', link: 'fe-interview-100/index-01'},
            {text: '数据结构和算法（上），大厂面试必考', link: 'fe-interview-100/index-02'},
            {text: '数据结构和算法（下），大厂面试必考', link: 'fe-interview-100/index-03'},
            {text: '前端基础知识，必知必会', link: 'fe-interview-100/index-04'},
            {text: '知识深度-原理和源码', link: 'fe-interview-100/index-05'},
            {text: '知识广度 - 从前端到全栈', link: 'fe-interview-100/index-06'},
            {text: '实际工作经验', link: 'fe-interview-100/index-07'},
            {text: '编写高质量代码', link: 'fe-interview-100/index-08'},
            {text: '分析和解决问题的思路', link: 'fe-interview-100/index-09'},
            {text: '项目设计', link: 'fe-interview-100/index-10'},
            {text: '软技能', link: 'fe-interview-100/index-11'},
          ]
        },
        {
          text: '框架项目－聚焦Vue3/React/Webpack',
          collapsed: true,
          items: [
            {text: '课程导学', link: 'frame-project-interview/index-01'},
            {text: '课程介绍', link: 'frame-project-interview/index-02'},
            {text: 'Vue 使用', link: 'frame-project-interview/index-03'},
            {text: 'Vue 原理', link: 'frame-project-interview/index-04'},
            {text: 'Vue 面试真题演练', link: 'frame-project-interview/index-05'},
            {text: 'Vue3 学习', link: 'frame-project-interview/index-06'},
            {text: 'webpack 和 babel', link: 'frame-project-interview/index-10'},
            {text: '项目设计', link: 'frame-project-interview/index-11'},
            {text: '项目流程', link: 'frame-project-interview/index-12'},
          ],
        },
        {text: '使用 typescript 封装 axios', link: 'axios-typescript'},
        {text: '从0到1开发一款IOS APP', link: 'ios-development/01',},
        {
          text: 'Vue3 源码解析，打造自己的 Vue3 框架，领悟尤大思维精髓',
          collapsed: false,
          items: [
            {text: '01-框架设计前瞻', link: 'vue3-learn/index-01'},
            {text: '02-Vue3 源码结构', link: 'vue3-learn/index-02'},
            {text: '03-响应系统的核心设计原则', link: 'vue3-learn/index-03'},
            {text: '04-初见 reactivity 模块', link: 'vue3-learn/index-04'},
            {text: '05-响应系统-ref 的响应性', link: 'vue3-learn/index-05'},
            {text: '06-响应系统-compute && watch', link: 'vue3-learn/index-06'},
            {text: '07-runtime 运行时-运行时核心设计原则', link: 'vue3-learn/index-07'},
            {text: '08-runtime 运行时-构建 h 函数，生成 VNode', link: 'vue3-learn/index-08'},
            {text: '09-runtime 运行时-构建 renderer 渲染器', link: 'vue3-learn/index-09'},
            {text: '10-runtime 运行时-组件的设计原理与渲染方案', link: 'vue3-learn/index-10'},
            {text: '11-runtime 运行时-diff 算法核心实现', link: 'vue3-learn/index-11'},
            {text: '12-compiler 编译器-编译时核心设计原则', link: 'vue3-learn/index-12'},
            {text: '13-compiler 编译器-构建 compile 编译器', link: 'vue3-learn/index-13'},
            {text: '14-compiler 编译器 - 深入编辑器处理逻辑（困难）', link: 'vue3-learn/index-14'},
            {text: '15-运行时+编译时-合并 vue 处理逻辑', link: 'vue3-learn/index-15'},
            {text: '16-总结', link: 'vue3-learn/index-16'},
          ],
        },
        {
          text: '吃透前端工程化，大厂级实战项目以战带练',
          collapsed: true,
          items: [
            {text: '01-为什么前端工程化必须学？', link: 'engineering/index-01'},
            {text: '02-零基础：极速入门前端工程化基石之模块化技术', link: 'engineering/index-02'},
            {text: '03-入门到进阶：玩转 Webpack 打包构建', link: 'engineering/index-03'},
            {text: '04-原生 js 项目：零基础', link: 'engineering/index-04'},
            {text: '05-原生 js 项目：零基础', link: 'engineering/index-05'},
            {text: '06-原生 js 项目：进阶实战', link: 'engineering/index-06'},
            {text: '07-原生 js 项目：进阶实战', link: 'engineering/index-07'},
            {text: '08-大型前端项目：进阶实战', link: 'engineering/index-08'},
            {text: '09-HMR 原理解析: vue-cli 核心源码解析', link: 'engineering/index-09'},
            {text: '10-Vue3 框架升级', link: 'engineering/index-10'},
            {text: '11-Webpack 性能优化', link: 'engineering/index-11'},
            {text: '12-大型前端项目：尝鲜', link: 'engineering/index-12'},
            {text: '13-通关：前端工程化脚手架设计', link: 'engineering/index-13'},
            {text: '14-工程化脚手架：进阶实战', link: 'engineering/index-14'},
            {text: '15-工程化脚手架：进阶实战', link: 'engineering/index-15'},
            {text: '16-工程化脚手架：进阶实战', link: 'engineering/index-16'},
            {text: '17-工程化脚手架：进阶实战', link: 'engineering/index-17'},
            {text: '18-工程化脚手架：进阶实战', link: 'engineering/index-18'},
            {text: '19-抢先实战：零基础 Vite 快速入门', link: 'engineering/index-19'},
            {text: '20-抢先实战：进阶实战——Vite 接入工程化脚手架', link: 'engineering/index-20'},
            {text: '21-加餐：高阶实战', link: 'engineering/index-21'},
            {text: '22-高阶实战——webpack5 源码解析', link: 'engineering/index-22'},
            {text: '23-高阶实战——vue-loader 源码解析', link: 'engineering/index-23'},
            {text: '24-高阶实战——vue-cli5 源码解析', link: 'engineering/index-24'},
          ],
        },

        {
          text: '专为小白设计的TypeScript入门课',
          collapsed: false,
          items: [
            {text: '01-都 2022 了，还不抓紧学 TypeScript?', link: 'typescript-simple/index-01'},
            {text: '02-TypeScript 基础语法入门', link: 'typescript-simple/index-02'},
            {text: '03-使用 TypeScript 编写爬虫工具', link: 'typescript-simple/index-03'},
            {text: '04-TypeScript 语法进阶', link: 'typescript-simple/index-04'},
            {text: '05-使用 Express 框架开发数据爬取及展示接口', link: 'typescript-simple/index-05'},
            {text: '06-TypeScript 高级语法', link: 'typescript-simple/index-06'},
            {text: '07-Express 项目代码改良', link: 'typescript-simple/index-07'},
            {text: '08-使用 React 编写爬取数据的展示页面', link: 'typescript-simple/index-08'},
            {text: '09-课程总结及后续学习方法推荐', link: 'typescript-simple/index-09'},
          ],
        },
        {
          text: 'TS 从入门到深度掌握，晋级TypeScript高手',
          collapsed: true,
          items: [
            {text: '01-课程介绍', link: 'typescript-advanced/index-01'},
            {text: '02-深入 TS 核心语法+各种实战应用（上）', link: 'typescript-advanced/index-02'},
            {text: '03-深入 TS 核心语法+各种实战应用（下）', link: 'typescript-advanced/index-03'},
            {text: '04-tsconfig.json 核心配置和系列相关问题', link: 'typescript-advanced/index-04'},
            {text: '05-深学 TS 必会的 JS 技术【不会 JS 原型继承的进入学习】', link: 'typescript-advanced/index-05'},
            {
              text: '06-TS 高频使用技能: 类型断言、类型守卫、自定义守卫+ 多态+类型守卫组合应用',
              link: 'typescript-advanced/index-06'
            },
            {text: '07-泛型从入门到深度掌握', link: 'typescript-advanced/index-07'},
            {text: '08-泛型晋级', link: 'typescript-advanced/index-08'},
            {
              text: '09-深入 infer、TS 高级类型、泛型再进阶【全方位深度掌握 TS 泛型】',
              link: 'typescript-advanced/index-09'
            },
            {text: '10-TS 声明文件，TS 模块', link: 'typescript-advanced/index-10'},
            {
              text: '11-从装饰器应用，底层 JS 到 仿 Nestjs 实战，路由器底层复杂泛型（上）',
              link: 'typescript-advanced/index-11'
            },
            {text: '13-运用 TS 手写 Promise 源码', link: 'typescript-advanced/index-13'},
          ],
        },
        {
          text: 'TS 相关补充',
          collapsed: false,
          items: [
            {text: '02-全栈思维全面深度掌握 TS 类', link: 'typescript-supplement/index-02'},
            {text: '03-TS 类方法代码优化的三大法宝', link: 'typescript-supplement/index-03'},
            {text: '04-TS 类易被忽视的重要技能', link: 'typescript-supplement/index-04'},
            {text: '05-TS 继承深入+手写优化底层源码', link: 'typescript-supplement/index-05'},
          ],
        },
        {
          text: '破解JavaScript高级玩法，成为精通 JS 的原生专家',
          collapsed: true,
          items: [
            {text: '01-课堂介绍', link: 'crack-js/index-01'},
            {text: '02-数据类型容易忽略的细节', link: 'crack-js/index-02'},
            {text: '03-对象认知升级', link: 'crack-js/index-03'},
            {text: '04-运算符的妙用以及部分机理解析', link: 'crack-js/index-04'},
            {text: '05-玩转数组高级技法', link: 'crack-js/index-05'},
            {text: '06-从函数到函数式编程之路', link: 'crack-js/index-06'},
            {text: '07-如果不用 vue，react 框架，如何操作 DOM？', link: 'crack-js/index-07'},
            {text: '08-被我们忽视的 BOM', link: 'crack-js/index-08'},
            {text: '09-深入探索网络请求', link: 'crack-js/index-09'},
            {text: '10-爱上异步编程', link: 'crack-js/index-10'},
            {text: '11-“永动机”- 事件循环', link: 'crack-js/index-11'},
            {text: '12-玩转客户端存储', link: 'crack-js/index-12'},
            {text: '13-动起来：计时器和JS动画', link: 'crack-js/index-13'},
            {text: '14-亡羊补牢-异常处理', link: 'crack-js/index-14'},
            {text: '15-ES高级特性', link: 'crack-js/index-15'},
            {text: '16-绕不过坎，字符编码', link: 'crack-js/index-16'},
            {text: '17-综合案例-事件分析库', link: 'crack-js/index-17'},
          ],
        },
        // {
        //   text: '前端主流布局系统进阶与实战',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/front-layout/README.md',
        //     '/zh/other/class/front-layout/index-01.md',
        //     '/zh/other/class/front-layout/index-02.md',
        //     '/zh/other/class/front-layout/index-03.md',
        //     '/zh/other/class/front-layout/index-04.md',
        //     '/zh/other/class/front-layout/index-05.md',
        //     '/zh/other/class/front-layout/index-06.md',
        //     '/zh/other/class/front-layout/index-07.md',
        //     '/zh/other/class/front-layout/index-08.md',
        //     '/zh/other/class/front-layout/index-09.md',
        //   ],
        // },
        // {
        //   text: '快速掌握前端必会的7种设计模式',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/design-pattern/index-01.md',
        //     '/zh/other/class/design-pattern/index-02.md',
        //     '/zh/other/class/design-pattern/index-03.md',
        //     '/zh/other/class/design-pattern/index-04.md',
        //     '/zh/other/class/design-pattern/index-05.md',
        //     '/zh/other/class/design-pattern/index-06.md',
        //     '/zh/other/class/design-pattern/index-07.md',
        //     '/zh/other/class/design-pattern/index-08.md',
        //     '/zh/other/class/design-pattern/index-09.md',
        //     '/zh/other/class/design-pattern/index-10.md',
        //     '/zh/other/class/design-pattern/index-11.md',
        //     '/zh/other/class/design-pattern/index-12.md',
        //     '/zh/other/class/design-pattern/index-13.md',
        //   ],
        // },
        // {
        //   text: '高阶前端进阶必修，自主打造同比AntD的React组建库',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/component-lib/index-01.md',
        //     '/zh/other/class/component-lib/index-02.md',
        //   ],
        // },
        // {
        //   text: '渡一大师课',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/duyi-master/index-01.md',
        //     '/zh/other/class/duyi-master/index-02.md',
        //     '/zh/other/class/duyi-master/index-03.md',
        //     '/zh/other/class/duyi-master/index-04.md',
        //     '/zh/other/class/duyi-master/index-05.md',
        //     '/zh/other/class/duyi-master/index-06.md',
        //   ],
        // },
        // {
        //   text: '前端性能优化 掌握行业实用专业前沿的解决方案',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/performance-optimization-standard/index-01.md',
        //     '/zh/other/class/performance-optimization-standard/index-02.md',
        //     '/zh/other/class/performance-optimization-standard/index-03.md',
        //     '/zh/other/class/performance-optimization-standard/index-04.md',
        //     '/zh/other/class/performance-optimization-standard/index-05.md',
        //     '/zh/other/class/performance-optimization-standard/index-06.md',
        //     '/zh/other/class/performance-optimization-standard/index-07.md',
        //     '/zh/other/class/performance-optimization-standard/index-08.md',
        //     '/zh/other/class/performance-optimization-standard/index-09.md',
        //     '/zh/other/class/performance-optimization-standard/index-10.md',
        //   ],
        // },
        // {
        //   text: '前端性能优化入门与案例实战',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/performance-optimization-introduction/index-01.md',
        //     '/zh/other/class/performance-optimization-introduction/index-02.md',
        //     '/zh/other/class/performance-optimization-introduction/index-03.md',
        //     '/zh/other/class/performance-optimization-introduction/index-04.md',
        //     '/zh/other/class/performance-optimization-introduction/index-05.md',
        //   ],
        // },
        // {
        //   text: '六大场景 梳理开发痛点 解锁前端进阶路',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/develop-point/index-01.md',
        //     '/zh/other/class/develop-point/index-02.md',
        //     '/zh/other/class/develop-point/index-03.md',
        //     '/zh/other/class/develop-point/index-04.md',
        //     '/zh/other/class/develop-point/index-05.md',
        //     '/zh/other/class/develop-point/index-06.md',
        //   ],
        // },
        // {
        //   text: '2小时搞定移动端混合开发基础入门',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/hyBird-app/index-01.md',
        //     '/zh/other/class/hyBird-app/index-02.md',
        //     '/zh/other/class/hyBird-app/index-03.md',
        //   ],
        // },
        // {
        //   text: '玩转Vim 从放弃到爱不释手',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/vim-class/index-01.md',
        //     '/zh/other/class/vim-class/index-02.md',
        //   ],
        // },
        // {
        //   text: '前端要学的测试课 从Jest入门到TDD/BDD双实战',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/tdd-bdd/index-01.md',
        //     '/zh/other/class/tdd-bdd/index-02.md',
        //     '/zh/other/class/tdd-bdd/index-03.md',
        //     '/zh/other/class/tdd-bdd/index-04.md',
        //     '/zh/other/class/tdd-bdd/index-05.md',
        //     '/zh/other/class/tdd-bdd/index-06.md',
        //   ],
        // },
        // {
        //   text: '编程必备基础-大话 HTTP 协议',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/http-protocol/index-01.md',
        //     '/zh/other/class/http-protocol/index-02.md',
        //   ],
        // },
        // {
        //   text: 'JavaScript 核心进阶',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/js-core-advanced/index-01.md',
        //     '/zh/other/class/js-core-advanced/index-02.md',
        //     '/zh/other/class/js-core-advanced/index-03.md',
        //     '/zh/other/class/js-core-advanced/index-04.md',
        //     '/zh/other/class/js-core-advanced/index-05.md',
        //     '/zh/other/class/js-core-advanced/index-06.md',
        //     '/zh/other/class/js-core-advanced/index-07.md',
        //     '/zh/other/class/js-core-advanced/index-08.md',
        //     '/zh/other/class/js-core-advanced/index-09.md',
        //     '/zh/other/class/js-core-advanced/index-10.md',
        //     '/zh/other/class/js-core-advanced/index-11.md',
        //     '/zh/other/class/js-core-advanced/index-12.md',
        //     '/zh/other/class/js-core-advanced/index-13.md',
        //     '/zh/other/class/js-core-advanced/index-14.md',
        //     '/zh/other/class/js-core-advanced/index-15.md',
        //     '/zh/other/class/js-core-advanced/index-16.md',
        //     '/zh/other/class/js-core-advanced/index-17.md',
        //     '/zh/other/class/js-core-advanced/index-18.md',
        //     '/zh/other/class/js-core-advanced/index-19.md',
        //     '/zh/other/class/js-core-advanced/index-20.md',
        //     '/zh/other/class/js-core-advanced/index-21.md',
        //     '/zh/other/class/js-core-advanced/index-22.md',
        //     '/zh/other/class/js-core-advanced/index-23.md',
        //     '/zh/other/class/js-core-advanced/index-24.md',
        //     '/zh/other/class/js-core-advanced/index-25.md',
        //     '/zh/other/class/js-core-advanced/index-26.md',
        //     '/zh/other/class/js-core-advanced/index-27.md',
        //     '/zh/other/class/js-core-advanced/index-28.md',
        //     '/zh/other/class/js-core-advanced/index-29.md',
        //     '/zh/other/class/js-core-advanced/index-30.md',
        //     '/zh/other/class/js-core-advanced/index-31.md',
        //     '/zh/other/class/js-core-advanced/index-32.md',
        //     '/zh/other/class/js-core-advanced/index-33.md',
        //     '/zh/other/class/js-core-advanced/index-34.md',
        //     '/zh/other/class/js-core-advanced/index-35.md',
        //     '/zh/other/class/js-core-advanced/index-36.md',
        //     '/zh/other/class/js-core-advanced/index-37.md',
        //     '/zh/other/class/js-core-advanced/index-38.md',
        //     '/zh/other/class/js-core-advanced/index-39.md',
        //     '/zh/other/class/js-core-advanced/index-40.md',
        //     '/zh/other/class/js-core-advanced/index-41.md',
        //     '/zh/other/class/js-core-advanced/index-42.md',
        //     '/zh/other/class/js-core-advanced/index-43.md',
        //     '/zh/other/class/js-core-advanced/index-44.md',
        //     '/zh/other/class/js-core-advanced/index-45.md',
        //     '/zh/other/class/js-core-advanced/index-46.md',
        //     '/zh/other/class/js-core-advanced/index-47.md',
        //     '/zh/other/class/js-core-advanced/index-48.md',
        //     '/zh/other/class/js-core-advanced/index-49.md',
        //     '/zh/other/class/js-core-advanced/index-50.md',
        //     '/zh/other/class/js-core-advanced/index-51.md',
        //     '/zh/other/class/js-core-advanced/index-52.md',
        //     '/zh/other/class/js-core-advanced/index-53.md',
        //     '/zh/other/class/js-core-advanced/index-54.md',
        //     '/zh/other/class/js-core-advanced/index-55.md',
        //     '/zh/other/class/js-core-advanced/index-56.md',
        //     '/zh/other/class/js-core-advanced/index-57.md',
        //     '/zh/other/class/js-core-advanced/index-58.md',
        //     '/zh/other/class/js-core-advanced/index-59.md',
        //     '/zh/other/class/js-core-advanced/index-60.md',
        //     '/zh/other/class/js-core-advanced/index-61.md',
        //     '/zh/other/class/js-core-advanced/index-62.md',
        //     '/zh/other/class/js-core-advanced/index-63.md',
        //     '/zh/other/class/js-core-advanced/index-64.md',
        //     '/zh/other/class/js-core-advanced/index-65.md',
        //     '/zh/other/class/js-core-advanced/index-66.md',
        //   ],
        // },
        // {
        //   text: 'React Native 保姆教程及实战小红书',
        //   collapsible: true,
        //   children: [
        //     '/zh/other/class/react-native/xiaohongshu/index-01.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-02.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-03.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-04.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-05.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-06.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-07.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-08.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-09.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-10.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-11.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-12.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-13.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-14.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-15.md',
        //     '/zh/other/class/react-native/xiaohongshu/index-16.md',
        //   ],
        // },
        // {
        //   text: 'Node.js工程师养成计划',
        //   children: ['/zh/other/class/node-nurture/index-01.md'],
        // },
      ]
    }
  ]
}