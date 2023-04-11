# 04-原生js项目: 项目源码分析+工程化改造流程分析

## 01: ZBestPC项目改造前源码分析

1. 下载[ZBestPC项目](https://github.com/NewCoder798/ZBestPC)

源码分析：

首页

* css: 引用了 css/public.css 和 css/index.css

* js

  * 引用了 js/jquery-1.12.4.min.js

  * 引用了 js/public.js

  * 引用了 js/nav.js

  * 引用了 js/jquery.flexslider-min.js

  * 内置了一段 script

## 02： ZBestPC项目工程化存在的问题分析

* css 和 js 资源多，且全部采用同步加载，渲染时需多次请求和加载，降低页面加载性能
* css 和 js 资源未压缩
* 开发模式陈旧，需要同时维护 html、js、css，代码逻辑和结构不清晰，迭代困难

## 03：工程化改造流程梳理和难点解析

## 04：项目预备知识梳理

### **webpack**

* html-webpack-plugin : 该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
* ProvidePlugin ：注册全局引用的变量
* copy-webpack-plugin：在 webpack 中拷贝文件和文件夹
* Tree-shaking：tree shaking 是一个术语，通常用于描述移除 js 上下文中的未引用代码(dead-code)
* SplitChunks：Webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的 js 文件
* ClaenWebpackPlugin：用于删除/清理构建文件夹的 webpack 插件。
* mini-css-extract-plugin：将 css 提取到单独的文件中，为每个包含 css 的 js 文件创建一个 css 文件，并且支持 css 和 SourceMaps 的按需加载。
* webpack-dev-server：提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能
* optimize-css-assets-webpack-plugin：压缩 css 文件
* ejs-loader：EJS 模板引擎的加载程序,将 EJS 模板文件当做一个函数输出。

### vue

* vue：一套用于构建用户界面的渐进式框架
* vue-router ：Vue.js 的官方路由
* MAP：多页面应用。在 MPA 中，每个页面都是一个主页面，都是独立的。当我们访问另一个页面的时候，都需要重新加载 html、css、js 文件，公共文件则根据需求加载