# 10-webpack 和 babel

[深入浅出 Webpack](http://webpack.wuhaolin.cn/)

## 01:webpack 考点梳理

### webpack

- webpack 已是前端项目构建的不二选择
- 每日必用，面试必考
- 成熟的工具，重点在于配置和使用，原理并不高优

### 讲解配置

- 基本配置
- 高级配置
- 优化打包效率
- 优化产出代码
- 构建流程概述
- babel

### webpack 和 babel 相关知识点

#### 基本使用

- 安装配置
- dev-server
- 解析 ES6
- 解析样式
- 解析图片文件
- 常见 loader 和 plugin

#### 高级特性

- 多入口
- 抽离和 压缩 css
- 抽离公共代码
- 懒加载
- 处理 React 和 Vue

#### 性能优化

##### 优化构建速度

- 优化 babel-loader
- IngorePlugin
- noParse
- happyPack
- paralleluglifyplugin
- 自动刷新
- 热更新
- DllPlugin

##### 优化产出代码

- 使用生产 1 环境
- 小图片 base64 环境
- bundle 加 hash
- 使用 CDN
- 提取公共代码
- 懒加载
- scope hosting

##### babel

- polyfill
- runtime

### 回顾之前的 webpack 面试题

- 前端代码为何要进行构建和打包？
- module chunk bundle 分别是什么意思，有何区别？
- loader 和 plugin 的区别
- webpack 如何实现懒加载？
- webpack 常见性能优化
- babel-runtime 和 babel-polyfill 的区别

## 02: 使用 webpack5

- webpack5 主要是内部效率的优化
- 对比 webpack4, 没有太多使用上的改动
- 你可以直接使用 webpack5 来学习课程

### webpack4 demo

升级 webpack5 以及周边插件后，代码需要做出的调整：

- package.json 的 dev-server 命令改了 `"dev": "webpack serve --config build/webpack.dev.js",`
- 升级新版本 `const { merge } = require('webpack-merge')`
- 升级新版本 `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
- `module.rules` 中 `loader: ['xxx-loader']` 换成 `use: ['xxx-loader']`
- `filename: 'bundle.[contenthash:8].js'` 其中 `h` 小写，不能大写

## 03: webpack 基本配置串讲

- vue-cli create-react-app
- 常用上述脚手架，而不会自己配置 webpack??
- 则面试不会通过

### webpack 基本配置

- 拆分配置和 merge
  - webpack.common.js
  - webpack.dev.js
  - webpack.prod.js
- 启动本地服务
- 处理 ES6
- 处理样式

## 04: webpack 如何配置多入口

## 05: webpack 如何抽离压缩 css 文件

## 06: webpack 如何抽离公共代码和第三方代码

## 07: webpack 如何实现异步加载 JS

## 08: module chunk bundle 的区别

## 09: webpack 优化构建速度-知识点串讲

## 10: 用 IngorePlugin 忽略无用文件

## 11: happyPack 是什么

## 12: webpack 如何配置热更新

## 13: 何时使用 DllPlugin

## 14: webpack 优化构建速度-考点总结和复习

## 15: webpack 优化产出代码-考点串讲

## 16: 什么是 Tree-Shaking

## 17: ES Module 和 Commonjs 的区别

## 18: 什么是 Scope Hosting?

## 19: babel 基本概念串讲

## 20: babel-polyfill 是什么?

## 21: babel-polyfill 如何按需引入?

## 22: babel-runtime 是什么?

## 23: babel-runtime 是什么?

## 24: webpack 面试真题-前端代码为何要打包

## 25: webpack 面试真题-为何 Proxy 不能被 Polyfill

## 26: webpack 面试真题-常见性能优化方法

## 27:【任务】从 0 配置 webpack5 开发环境
