# 04-场景四：通用 Nodejs 后台打通全栈第一脉

## 01： API 接口安全相关知识（加密&算法&HTTPS）最近学习

### 登录鉴权

![image-20230726222952796](./assets/image-20230726222952796.png)

### 核心概念

- 鉴权 !== 算法/加密 !== HTTPS
- 鉴权
  - 基础鉴权
  - session/cookie
  - JWT
  - Oauth
  - …
- 算法加密
  - Base64
  - MD5/SHA-1
  - DES/AES
  - RSA/ECC
  - …
- HTTPS
  - SSL
  - HTTP 劫持
  - 数据篡改
  - 敏感信息
  - 中间人
  - …

### 常见的鉴权方式

> [4 种常见的鉴权方式及说明](https://juejin.cn/post/6993478996872658952)
>
> [https://juejin.cn/post/6844904178456723464](https://juejin.cn/post/6844904178456723464)

- Session Cookie
  - 优点：较易扩展，简单
  - 缺点：**安全性低**、性能低、服务端存储，多服务器同步 session 困难，跨平台困难
- JWT
  - 优点：易扩展、支持移动设备、跨应用调用、安全、承载信息丰富
  - 缺点：**刷新与过期处理**，payload 不宜过大，中间人攻击
- Oauth：
  - 优点：开放、安全、简单、权限指定
  - 缺点：**需要增加授权服务器**，增加网络请求

### 什么是 JWT

> [五分钟带你了解啥是 JWT](https://zhuanlan.zhihu.com/p/86937325)

一个典型的 JWT 看起来是这个样子的：`xxxxx.yyyyy.zzzzz`

- Header

  - 典型的由两部分组成：token 的类型（“JWT”）和算法名称（比如：HMAC SHA256 或者 RSA 等等）。

  - ```json
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```

- Payload

- Signature

#### JWT 特点

> [https://jwt.io/#debugger-io](https://jwt.io/#debugger-io)

- 防 CSRF（主要是伪造请求，带上 Cookie）
- 适合移动端应用
- **无状态，编码数据**

典型的 jwt 样子

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

![image-20230726233012193](./assets/image-20230726233012193.png)

#### JWT 工作原理

> 注意：中间人攻击，可以考虑通信信道加密

![image-20230726233141053](./assets/image-20230726233141053.png)

### 算法/加密

> 算法中的指令描述的是一个计算，当其运行时能从一个初始状态和初始输入（可能为空）开始，经过一系列**有限而清晰定义的状态**最终产生输出并停止于一个状态

> **数据加密**的基本过程，就是对原来为**明文**的文件或者数据按照**某种算法**进行处理，使其成为**不可读**的一段代码，通常称为**密文**。通过这样的途径，来达到**保护数据**不被**非法人窃取**、阅读的目的

![image-20230726234521542](./assets/image-20230726234521542.png)

### 安全传输协议 HTTPS

**https**(HyperText Transfer Protocol Secure) 超文本传输安全协议，常称为 HTTP over TLS 、HTTP over SSL 或者 HTTP Secure ，是一种通过计算机网络进行安全通信的传输协议

### API 安全设计

- 通信信道加密：使用 HTTPS
- 通信数据加密：密文 + 加密关键数据
- **通信安全策略：授权中间层、尝试次数、过期策略。。。**

## 02：Nodejs 写接口：初识 Web 框架 Koa

### Koa 简介

> [https://koa.bootcss.com/](https://koa.bootcss.com/)

- Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。
- 通过利用 **async 函数**，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并**没有捆绑任何中间件**，而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

### Koa 核心概念

- **Koa Application(应用程序)**
- Context(上下文)
- Request(请求)、Response(响应)

![image-20230726235757941](./assets/image-20230726235757941.png)

### 看个代码

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'hello world !!'
})
app.listen(3000, () => {
  console.log('服务器启动了')
})
```

## 03：Request 属性、路由基础用法、app.use 链式处理

```javascript
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// 1. request、method、response
app.use(async (ctx) => {
  console.log(ctx)
  console.log(ctx.request)
  ctx.body = 'hello world !!'
})

// 2. api url => function router?
router.get('/api', (ctx) => {
  console.log(ctx)
  console.log(ctx.request)
  ctx.body = 'i am hello world !!'
})

// 3. ctx async

app.user(router.routes()).use(router.allowMethods())

app.listen(3000, () => {
  console.log('服务器启动了')
})
```

```javascript
// middleware.js
const Koa = require('koa')
const app = new Koa()
const middleware = function async(ctx, next){
  console.log('this is a middleware')
  console.log(ctx.request.path) 
  next()
  console.log('this is a middleware ending')
}
const middleware2 = function async(ctx, next){
  console.log('this is a middleware2')
  console.log(ctx.request.path) 
  next()
  console.log('this is a middleware2 ending')
}
const middleware3 = function async(ctx, next){
  console.log('this is a middleware3')
  console.log(ctx.request.path) 
  next()
  console.log('this is a middleware3 ending')
}

// 调整这里的顺序，可以看到输出结果
app.use(middleware)
app.use(middleware2)
app.use(middleware3)

app.listen(3000, () => {
  console.log('服务器启动了')
})

// 执行 node middleware.js 文件，可以看到输出的顺序
```

### Koad 工作原理

* **执行的顺序：顺序执行**
* 回调的顺序：反向执行
* 先进先出

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5c5a6359c994812a746d448224509a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在上图中，洋葱内的每一层都表示一个独立的中间件，用于实现不同的功能，比如异常处理、缓存处理等。每次请求都会从左侧开始一层层地经过每层的中间件，当进入到最里层的中间件之后，就会从最里层的中间件开始逐层返回。因此对于每层的中间件来说，在一个 **请求和响应** 周期中，都有两个时机点来添加不同的处理逻辑。



## 04：Koa 开发热加载、ES6 语法支持

## 05：JWT 鉴权方式：koa-jwt 集成

## 06：动态路由加载：Routes 入口优化 require.context

## 07：项目作业
