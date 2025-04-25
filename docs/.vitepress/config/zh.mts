import {defineConfig, type DefaultTheme} from "vitepress";
import fs from "node:fs"
import path from "node:path"

const rootPath = process.cwd()

function generatorMdFileArr(modulePath, linkPath) {
  const resolvedModulePath = path.resolve(rootPath, "docs" + modulePath)
  return fs.readdirSync(resolvedModulePath).filter((item) => {
    return item.includes('.md')
  }).map(item => {
    const itemName = item.replace('.md', '')
    return {
      text: itemName,
      link: linkPath + itemName
    }
  })
}

const generatorColumnMdFileFunc = (path) => generatorMdFileArr('/zh/column/' + path, path)
const generatorClassMdFileFunc = (path) => generatorMdFileArr('/zh/class/' + path, path)
const generatorSkillFrontMdFileFunc = (path) => generatorMdFileArr('/zh/skill/front/' + path, path)
const generatorInterviewMdFileFunc = (path) =>  generatorMdFileArr('/zh/interview/' + path, path)
const generatorCollectMdFileFunc = (path) => generatorMdFileArr('/zh/collect/' + path, path)

// column 相关
const EngineeringProjectArr = generatorColumnMdFileFunc('engineering-project/')
const WebpackEngineeringArr = generatorColumnMdFileFunc('webpack-engineering/')
const FrontMasterAdvancedArr = generatorColumnMdFileFunc("front-master-advanced/")
const WebLayoutArr = generatorColumnMdFileFunc('web-layout/')
const VisualH5Arr = generatorColumnMdFileFunc('visual-h5/')
const NestH5Arr = generatorColumnMdFileFunc('nest-h5/')
const ComponentEssentialsArr = generatorColumnMdFileFunc('component-essentials/')
const TaroMultiEndedArr = generatorColumnMdFileFunc('taro-multi-ended/')
const ReviewStudyArr = generatorColumnMdFileFunc('review-study/')
const BusinessThinkingArr = generatorColumnMdFileFunc('business-thinking/')
const LowCodeArr = generatorColumnMdFileFunc('low-code/')
const gitRelatedArr = generatorColumnMdFileFunc("git-related/")
const EmotionalIntelligenceLessonsArr = generatorColumnMdFileFunc('emotional-intelligence-lessons/')
const DesignPatternDepthColumnsArr = generatorColumnMdFileFunc("design-pattern-depth/")
const DockerK8sArr = generatorColumnMdFileFunc('docker-k8s/')
// class 相关
const FeInterview100Arr = generatorClassMdFileFunc('fe-interview-100/')
const ProgramBasicArr = generatorClassMdFileFunc('program-basic/')
const FrameProjectInterviewArr = generatorClassMdFileFunc('frame-project-interview/')
const DevelopPointArr = generatorClassMdFileFunc('develop-point/')
const HyBirdAppArr = generatorClassMdFileFunc('hyBird-app/')
const VimClassArr = generatorClassMdFileFunc('vim-class/')
const TddBddArr = generatorClassMdFileFunc('tdd-bdd/')
const Vue3LearnArr = generatorClassMdFileFunc("vue3-learn/")
const ViteNoviceToMasteryArr = generatorClassMdFileFunc("vite-novice-to-mastery/")
const ViteDeeplyUnderstandArr = generatorClassMdFileFunc('vite-deeply-understand/')

const FrontEngineeringArr = generatorClassMdFileFunc('front-engineering/')
const TypescriptSimpleArr = generatorClassMdFileFunc('typescript-simple/')
const TypescriptSupplementArr = generatorClassMdFileFunc('typescript-supplement/')
const CrackJsArr = generatorClassMdFileFunc('crack-js/')
const FrontLayoutArr = generatorClassMdFileFunc('front-layout/')
const DuYiMasterArr = generatorClassMdFileFunc('duyi-master/')
const TypescriptAdvancedArr = generatorClassMdFileFunc('typescript-advanced/')
const DesignPatternClassArr = generatorClassMdFileFunc("design-pattern/")
const PerformanceOptimizationStandardArr = generatorClassMdFileFunc('performance-optimization-standard/')
const PerformanceOptimizationIntroductionArr = generatorClassMdFileFunc('performance-optimization-introduction/')
const JavascriptCoreAdvancedArr = generatorClassMdFileFunc("javascript-core-advanced/")
const JavascriptCorePrincipleArr = generatorClassMdFileFunc('javascript-core-principle/')
const HttpProtocolLarnArr = generatorClassMdFileFunc("http-protocol-learn/")
const HttpProtocolArr = generatorClassMdFileFunc("http-protocol/")
const ReactNativeXiaoHongShuArr = generatorClassMdFileFunc("react-native/xiaohongshu/")

// skill front 相关
const AboutArr = generatorSkillFrontMdFileFunc("about/")
const PackageArr = generatorSkillFrontMdFileFunc("package/")
const FrameArr = generatorSkillFrontMdFileFunc("frame/")
const MiniWebpackArr = generatorSkillFrontMdFileFunc("mini-frame/mini-webpack/")
const SourceArr = generatorSkillFrontMdFileFunc("source/")
const VueSourceArr = generatorSkillFrontMdFileFunc("source/vue/")
// interview 相关
const JavaScriptArr = generatorInterviewMdFileFunc("javascript/")
const QuestionsArr = generatorInterviewMdFileFunc("questions/")
const JavaScriptAdvancedArr = generatorInterviewMdFileFunc("javascript-advanced/")
const AlgorithmArr = generatorInterviewMdFileFunc("algorithm/")
const CssArr = generatorInterviewMdFileFunc("css/")
// collect 相关
const NoteJueJinArr = generatorCollectMdFileFunc("note/jue-jin/")
const BooksArr = generatorCollectMdFileFunc("books/")

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
      '/zh/class/': {
        base: '/zh/class/',
        items: sideBarClass()
      },
      '/zh/column/': {
        base: '/zh/column/',
        items: sidebarColumn()
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
      link: '/zh/collect/github/github',
      activeMatch: '/zh/collect/',
    },
    {
      text: '课程笔记',
      link: '/zh/class/vue3-learn-practice',
      activeMatch: '/zh/class',
    },
    {
      text: '专栏学习',
      link: '/zh/column/emotional-intelligence-lessons/01-开篇词',
      activeMatch: '/zh/column/',
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
      items: AboutArr,
    },
    {
      text: '包管理相关',
      collapsed: false,
      items: PackageArr,
    },
    {
      text: '前端框架',
      collapsed: false,
      items: FrameArr,
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
          items: MiniWebpackArr,
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
        ...SourceArr,
        {
          text: 'Vue源码',
          collapsed: false,
          items: VueSourceArr,
        },

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
      items: CssArr,
    },
    {
      text: 'JavaScript 相关',
      collapsed: false,
      items: JavaScriptArr,
    },
    {
      text: 'JavaScript 进阶相关',
      collapsed: false,
      items: JavaScriptAdvancedArr,
    },
    {
      text: '算法相关',
      collapsed: false,
      items: AlgorithmArr,
    },
    {
      text: '面试真题',
      collapsed: false,
      items: QuestionsArr,
    },
  ]
}

function sidebarCollect(): DefaultTheme.SidebarItem[] {
  return [
    {text: 'Github大佬', link: 'github/github.md'},
    {text: '推荐', link: 'index'},
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
            {
              text: 'vue组件之间的传递',
              items: NoteJueJinArr,
              collapsed: true
            },
          ],
        },
        {
          text: '编程相关',
          collapsed: true,
          items: BooksArr
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
      items: [
        {
          text: '工作中遇到的问题',
          link: 'question/bug-list-01.md'
        }
      ],
    },
  ]
}

function sideBarClass(): DefaultTheme.SidebarItem[] {
  return [
    {text: 'Vue3 从入门到实战', link: 'vue3-learn-practice'},
    {
      text: 'Vite 相关',
      collapsed: true,
      items: [
        {
          text: 'Vite 从入门到精通',
          collapsed: true,
          items: ViteNoviceToMasteryArr,
        },
        {
          text: 'Vite 深入浅出',
          collapsed: true,
          items: ViteDeeplyUnderstandArr,
        }
      ]
    },
    {
      text: '编程基础',
      collapsed: true,
      items: ProgramBasicArr,
    },
    {text: '专为程序员设计的线性代数课程', link: 'linear-algebra'},
    {text: '快速搞定前端技术一面', link: 'interview-front'},
    {
      text: '2周刷完100道前端优质面试真题',
      collapsed: true,
      items: FeInterview100Arr
    },
    {
      text: '框架项目－聚焦Vue3/React/Webpack',
      collapsed: true,
      items: FrameProjectInterviewArr,
    },
    {text: '使用 typescript 封装 axios', link: 'axios-typescript'},
    {text: '从0到1开发一款IOS APP', link: 'ios-development/01',},
    {
      text: 'Vue3 源码解析，打造自己的 Vue3 框架，领悟尤大思维精髓',
      collapsed: true,
      items: Vue3LearnArr,
    },
    {
      text: '吃透前端工程化，大厂级实战项目以战带练',
      collapsed: true,
      items: FrontEngineeringArr,
    },
    {
      text: '专为小白设计的TypeScript入门课',
      collapsed: true,
      items: TypescriptSimpleArr,
    },
    {
      text: 'TS 从入门到深度掌握，晋级TypeScript高手',
      collapsed: true,
      items: TypescriptAdvancedArr,
    },
    {
      text: 'TS 相关补充',
      collapsed: true,
      items: TypescriptSupplementArr,
    },
    {
      text: '破解JavaScript高级玩法，成为精通 JS 的原生专家',
      collapsed: true,
      items: CrackJsArr,
    },
    {
      text: '前端主流布局系统进阶与实战',
      collapsed: true,
      items: FrontLayoutArr,
    },
    {
      text: '快速掌握前端必会的7种设计模式',
      collapsed: true,
      items: DesignPatternClassArr,
    },
    {
      text: '高阶前端进阶必修，自主打造同比AntD的React组建库',
      collapsed: true,
      items: [
        {text: '01-搭建开发环境', link: "component-lib/index-01.md"},
        {text: '02-完整的写一个 Button 组件', link: "component-lib/index-02.md"},
      ],
    },
    {
      text: '渡一大师课',
      collapsed: true,
      items: DuYiMasterArr
    },
    {
      text: '前端性能优化 掌握行业实用专业前沿的解决方案',
      collapsed: true,
      items: PerformanceOptimizationStandardArr,
    },
    {
      text: '前端性能优化入门与案例实战',
      collapsed: true,
      items: PerformanceOptimizationIntroductionArr,
    },
    {
      text: '六大场景 梳理开发痛点 解锁前端进阶路',
      collapsed: true,
      items: DevelopPointArr,
    },
    {
      text: '2小时搞定移动端混合开发基础入门',
      collapsed: true,
      items: HyBirdAppArr,
    },
    {
      text: '玩转Vim 从放弃到爱不释手',
      collapsed: true,
      items: VimClassArr,
    },
    {
      text: '前端要学的测试课 从Jest入门到TDD/BDD双实战',
      collapsed: true,
      items: TddBddArr,
    },
    {
      text: '编程必备基础-大话 HTTP 协议',
      collapsed: true,
      items: HttpProtocolArr,
    },
    {
      text: 'Http 协议',
      collapsed: true,
      items: HttpProtocolLarnArr,
    },
    {
      text: 'JavaScript 核心进阶',
      collapsed: true,
      items: JavascriptCoreAdvancedArr,
    },
    {
      text: 'JavaScript 核心原理精讲',
      collapsed: true,
      items: JavascriptCorePrincipleArr
    },
    {
      text: 'React Native 保姆教程及实战小红书',
      collapsed: true,
      items: ReactNativeXiaoHongShuArr,
    },
    {
      text: 'Node.js工程师养成计划',
      collapsed: true,
      items: [
        {text: '01-Node 脚手架篇 - 打造自己的脚手架工具', link: 'node-nurture/index-01.md'},
        {text: '02-Node原生实战篇-项目基建-原生Node开发Web服务器', link: 'node-nurture/index-02.md'}
      ],
    },
  ]
}

function sidebarColumn(): DefaultTheme.sidebaritem[] {
  return [
    {
      text: '给程序员的职场情商课',
      collapsed: true,
      items: EmotionalIntelligenceLessonsArr,
    },
    {
      text: 'Git原理详解与实操指南',
      collapsed: true,
      items: gitRelatedArr,
    },
    {
      text: 'JavaScript 设计模式精讲',
      collapsed: true,
      items: DesignPatternDepthColumnsArr,
    },
    {
      text: '跟BAT技术专家学Docker + K8s',
      collapsed: true,
      items: DockerK8sArr,
    },
    {
      text: '现代web布局',
      collapsed: true,
      items: WebLayoutArr,
    },
    {
      text: '前端高手进阶',
      collapsed: true,
      items: FrontMasterAdvancedArr,
    },
    {
      text: 'Webpack 从零入门到工程化实战',
      collapsed: true,
      items: WebpackEngineeringArr,
    },
    {
      text: '从 0 到 1 落地前端工程化',
      collapsed: true,
      items: EngineeringProjectArr,
    },
    {
      text: '从零开发H5可视化搭建项目',
      collapsed: true,
      items: VisualH5Arr,
    },
    {
      text: '掘金小册 Nest 通关秘籍',
      collapsed: true,
      items: NestH5Arr,
    },
    {
      text: 'Vue.js 组件精讲',
      collapsed: true,
      items: ComponentEssentialsArr,
    },
    {
      text: 'Taro 多端开发实现原理与项目实战',
      collapsed: true,
      items: TaroMultiEndedArr,
    },
    {
      text: '跟着高手学复盘',
      collapsed: true,
      items: ReviewStudyArr,
    },
    {
      text: '商业思维案例笔记',
      collapsed: true,
      items: BusinessThinkingArr,
    },
    {
      text: '说透低代码',
      collapsed: true,
      items: LowCodeArr,
    },
  ]
}