# 09-HMR 原理解析: vue-cli 核心源码解析

## 01: 核心中间件：webpack-dev-middleware实例化源码解析

上一章节了解了中间件的基本知识，再次看到`vue-elm/dev-server.js`就可以看到这里面有两个核心的中间件

* webpack-dev-middleware: 核心用途，把 webpack 的输出路径改为内存中，并且获取资源的路径也通过内存中获取
* webpack-hot-middleware: 帮助我们实现 HMR 功能

## 02：devMiddleware中间件核心处理逻辑解析

我们先看 `devMiddleware`

```javascript
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')
var compiler = webpack(webpackConfig)
// 核心用途
// 1. 修改 webpack 的 fs 为 MemoryFileSystem 并将构建结果全部存储在内存中
// 2. 实现请求中间件，用于处理所有资源请求，并到内存中查询相应文件并返回
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var server = express()
server.use(devMiddleware)
```

## 03：深入讲解HMR实现原理

### webpack-hot-middleware

接下里继续看`hotMiddleware`

```javascript
// 核心功能：实现 HMR（HotModuleReplacement）机制
// 复杂点：
// 1. 需要客户端和服务端同时配合实现（HotModuleReplacementPlugin 和 webpack-hot-middleware联动使用）
// 2. 客户端和服务端双向通信机制复杂 
var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})
```

### HMR（HotModuleReplacement）原理

1. webpack 监听 bundle 的变化并进行自动构建
2. webpack 构建时通过 HotModuleReplacementPlugin 生成 hot-update.json 和 hot-update.js
3. webpack 将构建结果 bundle 存入 webpack-dev-middleware 的 MemoryFileSystem
4. webpack-hot-middle 服务端和客户端通过 EventSource 进行双向通信，当 bundle 发生变化时，服务端通知客户端，状态分别为 building、built、sync
5. webpack-hot-middleware 客户端接收到服务端状态为 sync 时，调用 processMessge 方法
6. processMessage 方法调用 HRM runtime 的 hotCheck 方法
7. HRM runtime 模块会 fetch hot-update.js 和 hot-update.json 并完成 HRM 

### HTML5 Server-Sent Events

[参考教程][https://www.runoob.com/html/html5-serversentevents.html](https://www.runoob.com/html/html5-serversentevents.html)

服务器端事件流的语法是非常简单的。把 "Content-Type" 报头设置为 "text/event-stream"。现在，您可以开始发送事件流了。

如何通过服务端写入 evnet-stream ？ 

```javascript
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/event-stream;charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no"
}
```

## 04：hotMiddleware源码执行流程详解



## 05：HMR客户端实现原理详解



## 06：vue-cli构建源码流程梳理

