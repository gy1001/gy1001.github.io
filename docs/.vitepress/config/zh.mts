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

const EngineeringProjectArr = generatorMdFileArr(
  '/zh/column/engineering-project/',
  "engineering-project/"
)
const WebpackEngineeringArr = generatorMdFileArr("/zh/column/webpack-engineering/", 'webpack-engineering/')
const FrontMasterAdvancedArr = generatorMdFileArr("/zh/column/front-master-advanced/", 'front-master-advanced/')
const WebLayoutArr = generatorMdFileArr('/zh/column/web-layout/', 'web-layout/')
const FeInterview100Arr = generatorMdFileArr('/zh/class/fe-interview-100/', 'fe-interview-100/')
const ProgramBasicArr = generatorMdFileArr('/zh/class/program-basic/', 'program-basic/')
const VisualH5Arr = generatorMdFileArr('/zh/column/visual-h5/', 'visual-h5/')
const NestH5Arr = generatorMdFileArr('/zh/column/nest-h5/', 'nest-h5/')
const ComponentEssentialsArr = generatorMdFileArr(
  '/zh/column/component-essentials/', 'component-essentials/'
)
const TaroMultiEndedArr = generatorMdFileArr(
  '/zh/column/taro-multi-ended/', 'taro-multi-ended/'
)
const ReviewStudyArr = generatorMdFileArr('/zh/column/review-study/', 'review-study/')
const BusinessThinkingArr = generatorMdFileArr(
  '/zh/column/business-thinking/', 'business-thinking/'
)
const LowCodeArr = generatorMdFileArr('/zh/column/low-code/', 'low-code/')
const gitRelatedArr = generatorMdFileArr("/zh/column/git-related/", "git-related/")
const FrameProjectInterviewArr = generatorMdFileArr('/zh/class/frame-project-interview/', 'frame-project-interview/')
const DevelopPointArr = generatorMdFileArr('/zh/class/develop-point/', 'develop-point/')
const HyBirdAppArr = generatorMdFileArr('/zh/class/hyBird-app/', 'hyBird-app/')
const EmotionalIntelligenceLessonsArr = generatorMdFileArr('/zh/column/emotional-intelligence-lessons/', 'emotional-intelligence-lessons/')
const Vue3LearnArr = generatorMdFileArr("/zh/class/vue3-learn/", "vue3-learn/")
const ViteLearnArr = generatorMdFileArr("/zh/class/vite-learn/", "vite-learn/")
const FrontEngineeringArr = generatorMdFileArr('/zh/class/front-engineering/', 'front-engineering/')
const TypescriptSimpleArr = generatorMdFileArr('/zh/class/typescript-simple', 'typescript-simple/')
const TypescriptSupplementArr = generatorMdFileArr('/zh/class/typescript-supplement/', 'typescript-supplement/')
const CrackJsArr = generatorMdFileArr('/zh/class/crack-js', 'crack-js/')
const FrontLayoutArr = generatorMdFileArr('/zh/class/front-layout/', 'front-layout/')
const DuYiMasterArr = generatorMdFileArr('/zh/class/duyi-master/', 'duyi-master/')
const TypescriptAdvancedArr = generatorMdFileArr('/zh/class/typescript-advanced/', 'typescript-advanced/')
const DesignPatternClassArr = generatorMdFileArr("/zh/class/design-pattern/", "design-pattern/")
const designPatternDepthColumnsArr = generatorMdFileArr("/zh/column/design-pattern-depth/", "design-pattern-depth/")
const JsCoreAdvancedArr = generatorMdFileArr("/zh/class/js-core-advanced/", "js-core-advanced/")
const HttpProtocolLarnArr = generatorMdFileArr("/zh/class/http-protocol-learn/", "http-protocol-learn/")
const ReactNativeXiaoHongShuArr = generatorMdFileArr("/zh/class/react-native/xiaohongshu/", "react-native/xiaohongshu/")
const CssArr = generatorMdFileArr("/zh/interview/css/", "css/")
const AboutArr = generatorMdFileArr("/zh/skill/front/about/", "about/")
const PackageArr = generatorMdFileArr("/zh/skill/front/package/", "package/")
const FrameArr = generatorMdFileArr("/zh/skill/front/frame/", "frame/")
const MiniWebpackArr = generatorMdFileArr("/zh/skill/front/mini-frame/mini-webpack/", "mini-frame/mini-webpack/")
const SourceArr = generatorMdFileArr("/zh/skill/front/source/", "source/")
const VueSourceArr = generatorMdFileArr("/zh/skill/front/source/vue/", "source/vue/")
const JavaScriptArr = generatorMdFileArr("/zh/interview/javascript/", "javascript/")
const QuestionsArr = generatorMdFileArr("/zh/interview/questions/", "questions/")
const NoteJueJinArr = generatorMdFileArr("/zh/collect/note/jue-jin/", "note/jue-jin/")
const BooksArr = generatorMdFileArr("/zh/collect/books/", "books/")
const AlgorithmArr = generatorMdFileArr("/zh/interview/algorithm/", "algorithm/")
const JavaScriptAdvancedArr = generatorMdFileArr("/zh/interview/javascript-advanced/", "javascript-advanced/")

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
      text: 'Vite 从入门到精通',
      collapsed: true,
      items: ViteLearnArr,
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
      items: [
        {text: '01-课程介绍', link: "performance-optimization-standard/index-01.md"},
        {text: '02-性能优化的指标和工具', link: "performance-optimization-standard/index-02.md"},
        {text: '03-渲染优化', link: "performance-optimization-standard/index-03.md"},
        {text: '04-代码优化', link: "performance-optimization-standard/index-04.md"},
        {text: '05-优化(经典性能优化解决方案)', link: "performance-optimization-standard/index-05.md"},
        {text: '06-构建优化', link: "performance-optimization-standard/index-06.md"},
        {text: '07-传输加载优化', link: "performance-optimization-standard/index-07.md"},
        {text: '08-前沿优化解决方案', link: "performance-optimization-standard/index-08.md"},
        {text: '09-性能优化问题面试指南', link: "performance-optimization-standard/index-09.md"},
        {text: '10-互联网外企offer与立足之道', link: "performance-optimization-standard/index-10.md"},
      ],
    },
    {
      text: '前端性能优化入门与案例实战',
      collapsed: true,
      items: [
        {text: '01-前端进阶核心技能-性能优化介绍', link: "performance-optimization-introduction/index-01.md"},
        {text: '02-了解页面生命周期', link: "performance-optimization-introduction/index-02.md"},
        {text: '03-前端性能优化常见的四种方法', link: "performance-optimization-introduction/index-03.md"},
        {text: '04-前端性能检测工具', link: "performance-optimization-introduction/index-04.md"},
        {text: '05-总结', link: "performance-optimization-introduction/index-05.md"},
      ],
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
      items: [
        {text: '01-玩转vim 从放弃到爱不释手', link: "vim-class/index-01.md"},
        {text: '02-初识 Vim，想说爱你不容易', link: "vim-class/index-02.md"},
      ],
    },
    {
      text: '前端要学的测试课 从Jest入门到TDD/BDD双实战',
      collapsed: true,
      items: [
        {text: '01-课程导学', link: "tdd-bdd/index-01.md"},
        {text: '02-Jest 前端自动化测试框架基础入门', link: "tdd-bdd/index-02.md"},
        {text: '03-Jest难点进阶', link: "tdd-bdd/index-03.md"},
        {text: '04-Vue 中的 TDD 与 单元测试', link: "tdd-bdd/index-04.md"},
        {text: '05-Vue 中的 BDD 与 集成测试', link: "tdd-bdd/index-05.md"},
        {text: '06-测试的思考总结', link: "tdd-bdd/index-06.md"},
      ],
    },
    {
      text: '编程必备基础-大话 HTTP 协议',
      collapsed: true,
      items: [
        {text: '01-整体介绍', link: "http-protocol/index-01.md"},
        {text: '02-HTTP初相识--了解HTTP协议', link: "http-protocol/index-02.md"},
      ],
    },
    {
      text: 'Http 协议',
      collapsed: true,
      items: HttpProtocolLarnArr,
    },
    {
      text: 'JavaScript 核心进阶',
      collapsed: true,
      items: JsCoreAdvancedArr,
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
      items: designPatternDepthColumnsArr,
    },
    {
      text: '跟BAT技术专家学Docker + K8s',
      collapsed: true,
      items: [
        {text: '01-开篇词', link: 'docker-k8s/index-01.md'},
        {text: '02-成王败寇容器的发展之路', link: 'docker-k8s/index-02.md'},
        {text: '03-Docker 安装与运行', link: 'docker-k8s/index-03.md'},
        {text: '04-小身材大能量：Docker 概览', link: 'docker-k8s/index-04.md'},
        {text: '05-立足之本 Docker 镜像介绍', link: 'docker-k8s/index-05.md'},
        {text: '06-葵花宝典：Docker 操作参数详解', link: 'docker-k8s/index-06.md'},
        {text: '07-统一镜像管理镜像仓库介绍', link: 'docker-k8s/index-07.md'},
        {text: '08-站在巨人的肩膀上', link: 'docker-k8s/index-08.md'},
        {text: '09-站在巨人的肩膀上', link: 'docker-k8s/index-09.md'},
        {text: '10-站在巨人的肩膀上', link: 'docker-k8s/index-10.md'},
        {text: '11-动手实践从 0 到 1 构建自己的 Docker 应用', link: 'docker-k8s/index-11.md'},
        {text: '12-Docker 隔离的本质 namespace', link: 'docker-k8s/index-12.md'},
        {text: '13-Docker 资源限制的幕后主使：cgroup', link: 'docker-k8s/index-13.md'},
        {text: '14-Docker 镜像你真的理解了吗？', link: 'docker-k8s/index-14.md'},
        {text: '15-Docker 的本质是进程', link: 'docker-k8s/index-15.md'},
        {text: '16-镜像构建指南Dockerfile', link: 'docker-k8s/index-16.md'},
        {text: '17-Docker 网络初探', link: 'docker-k8s/index-17.md'},
        {text: '18-Docker 网络模式', link: 'docker-k8s/index-18.md'},
        {text: '19-容器间网络通信link 的技术原理解析', link: 'docker-k8s/index-19.md'},
        {text: '20-数据存储Docker 数据存储的三种模式', link: 'docker-k8s/index-20.md'},
        {text: '21-数据共享volume 的使用指南', link: 'docker-k8s/index-21.md'},
        {text: '22-Dockerfile 你真的会用吗？', link: 'docker-k8s/index-22.md'},
        {text: '23-Docker 最佳实践如何构建最小的镜像', link: 'docker-k8s/index-23.md'},
        {text: '24-Docker 最佳实践tag 如何使用？', link: 'docker-k8s/index-24.md'},
        {text: '25-为什么说容器是个单进程模型', link: 'docker-k8s/index-25.md'},
        {text: '26-大话容器设计模式', link: 'docker-k8s/index-26.md'},
        {text: '27-Docker 容器监控方案概览', link: 'docker-k8s/index-27.md'},
        {text: '28-从 0 到 1 构建分布式高可用的 web 应用', link: 'docker-k8s/index-28.md'},
        {text: '29-云原生技术简介', link: 'docker-k8s/index-29.md'},
        {text: '30-Kubernetes 是什么？', link: 'docker-k8s/index-30.md'},
        {text: '31-资源隔离Namespace 剖析', link: 'docker-k8s/index-31.md'},
        {text: '32-Kubernetes 核心概念解析：Pod（一）', link: 'docker-k8s/index-32.md'},
        {text: '33-Kubernetes 核心概念解析：Pod（二）', link: 'docker-k8s/index-33.md'},
        {text: '34-配置管理ConfigMap 和 Secret', link: 'docker-k8s/34-jQuery 封装思想.md'},
        {text: '35-容器化守护进程 DaemonSet', link: 'docker-k8s/index-35.md'},
        {text: '36-Kubernetes ReplicationController 和 ReplicaSet 介绍', link: 'docker-k8s/index-36.md'},
        {text: '37-Kubernetes Deployment 使用', link: 'docker-k8s/index-37.md'},
        {text: '38-Kubernetes 批处理介绍：Job 和 CronJob', link: 'docker-k8s/index-38.md'},
        {text: '39-Kubernetes 控制器模式介绍', link: 'docker-k8s/index-39.md'},
        {text: '40-Kubernetes 有状态应用管理 StatefulSet', link: 'docker-k8s/index-40.md'},
        {text: '41-使用 Service 访问一组特定的 Pod', link: 'docker-k8s/index-41.md'},
        {text: '42-Kubernetes Service 类型', link: 'docker-k8s/index-42.md'},
      ],
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