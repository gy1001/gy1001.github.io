# 19-抢先实战：零基础——Vite 快速入门

[[<img src="https://cn.vitejs.dev/logo.svg" alt="img" style="height: 15px" />Vite 官方中文文档](https://cn.vitejs.dev/)](https://cn.vitejs.dev/guide/)

[ViteConf 2022回顾：Vite是如何诞生的？](https://juejin.cn/post/7156429071478423588)

## 01：什么是vite？它为什么能这么快

### Vite

vite 是 vue 作者尤雨溪在开发 vue3.0的时候开发的一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的服务器启动。Vite 是一种新型前段构建工具，能够显著提升前段开发体验，他主要由两部分组成

* 一个开发服务器，它基于 **[原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** 提供了 [**丰富的内建功能**](https://cn.vitejs.dev/guide/features.html)，如速度快到惊人的 [**模块热更新（HMR）**](https://cn.vitejs.dev/guide/features.html#hot-module-replacement)。
* 一套构建指令，它使用 [**Rollup**](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite 意在提供开箱即用的配置，同时它的 [插件 API](https://cn.vitejs.dev/guide/api-plugin.html) 和 [JavaScript API](https://cn.vitejs.dev/guide/api-javascript.html) 带来了高度的可扩展性，并有完整的类型支持。

### ESBuild

> [**esbuild 中文文档**](https://esbuild.docschina.org/)

Esbuild 是基于 Go 语言开发的 JavaScript Bundler, 它的构建速度是 webpack 的几十倍，由 Figma 前 CTO Evan Wallace 开发，并且也被 Vite 用于开发环境的依赖解析和 Transform

#### 实现原理

ESBuild的实现

* 由 Go 实现并编译成本地代码
* 重度使用并行计算
* ESBuild 中的一切带阿米从零开始
* 对内存的高效使用

#### 优缺点

##### 优点

* Golang 开发：采用 Go 语言开发，可以充分利用多线程打包。并且线程之间可以共享内容，直接编译成机器码，大大节省了程序运行时间
* 多核并行：得益于 Go 当中多线程共享内存的优势，内部打包算法充分利用多核 CPU 优势
* 从零造轮子：没有任何第三方库的黑盒逻辑，保证极致的代码性能
* 高效利用内存：ESBuild 中从头到尾尽可能地复用一份 AST 节点数据，从而大大提高了内存的利用效率，提升编译性能

##### 缺点

* 没有 TS 类型检查
* 不能操作 AST
* 不支持装饰器语法
* 产物 Targe 无法降级到 ES5 及以下

### SWC

[SWC官方文档](https://swc.rs/docs/getting-started)

[新一代的编译工具 SWC](https://juejin.cn/post/7052644023651008548)
