# 08-大型前端项目：进阶实战——架构升级需求分析+构建源码分析

## 01：vue2-elm架构升级需求分析 

### 准备工作

* 原项目源码：[https://github.com/bailicangdu/vue2-elm.git](https://github.com/bailicangdu/vue2-elm.git)

* 安装依赖和运行

  ```shell
  npm install 
  npm run dev
  ```

### 构建源码分析

* build
  * buiild.js: 打包执行文件
  * webpack.config.js: 项目配置公共文件
  * webpack.dev.config.js: 项目启动配置文件
  * wepack.dll.cofnig.js: 插件抽离第三方配置文件
  * webpack.prod.config.js: 项目打包配置文件
* config
  * 开发和线上环境的配置文件

## 02：vue2-elm项目启动+构建命令分析

上一节中我们通过脚本`npm run dev`来运行代码，发现页面正常渲染，

1. 我们分析`package.json`中的脚本

   ```javascript
   {
      "scripts": {
       "dev": "cross-env NODE_ENV=online node build/dev-server.js",
       "local": "cross-env NODE_ENV=local node build/dev-server.js",
       "build": "node build/build.js"
     },
   }
   ```

2. 通过语句前一部分`cross-env NODE_ENV=online` 可知我们通过`cross-env`库设置了`NODE_ENV`为`online`,为什么要用`cross-env`呢？可以参考下文[Node 的 cross-env 模块](https://juejin.cn/post/7006650325931130916)

3. 拓展知识：[webpack彻底搞懂系列之 - .env文件](https://juejin.cn/post/7069309414192185381)

4. 然后执行`node build/dev-server.js`

5. 查看`build/dev-server.js`文件，里面用到了很多直到现在还在使用的代码以及思想

   * webpack-dev-middleware
   * 热更新的一个实现
   * 等等

## 03：vue2-elm项目开发模式构建源码分析

### 分析源码的方式

* 直接阅读
* 运行起来，打日志(比如：`console.log`)
* 运行起来，在浏览器中打断点（因为运行时有一些上下文）

## 04：深入理解开发模式下时为什么要启动express服务

* vue-cli 在本地开发模式下，为什么采用 express 启动静态资源服务器

  * 解决线上部署后的资源路径问题
  * 解决 history 模式下的 URL fallback 问题

* 参考

  * [为什么vue+webpack需要用到node，如何部署项目到服务器？ ](https://www.cnblogs.com/zhuzhenwei918/p/6866094.html)
  * [Vue-Router:不同的历史模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

* 为什么`hisory模式下，刷新页面会报404`

  * 因为在history 模式下，只是动态的通过js 操作window.history 来改变有浏览器地址栏里的路径，并没有发起http请求，但当你直接 在浏览器里输入这个地址的时候 就一定要先对服务器放起http请求，但是这个目标在服务器上又不存在所以就返回了404了，怎么解决呢，就是把所有的请求全部转发到 `http://www.xxx.com/index.hmtl` 上就可以了　　

  * 解决方案:[https://webpack.docschina.org/configuration/dev-server/](https://webpack.docschina.org/configuration/dev-server/)

    ```javascript
    module.exports = {
      //...
      devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            bypass: function (req, res, proxyOptions) {
              if (req.headers.accept.indexOf('html') !== -1) {
                console.log('Skipping proxy for browser request.');
                return '/index.html';
              }
            },
          },
        },
      },
    };
    ```

## 05：http服务原理讲解+express服务快速搭建

一个 express 服务的一个访问流程

1. 用户通过浏览器访问某个域名后，发起一个 http 请求,打到指定的服务器上
2. 假如这里请求的是 80 端口，服务器中有一个 express 服务监听 80端口，会对这个端口进行处理
3. 假如请求的是`index.html`,其中还会请求其他的一些文件`app.js`、`index.css`等

### express 服务快速搭建

1. 新建文件夹`express-demo`,执行命令`npm init -y`

2. 安装相关依赖

   ```shell
   npm install express -S
   ```

3. 新建文件`server.js`

   ```javascript
   // 创建服务
   const express = require('express')
   const app = express()
   // 拦截路由
   app.get('/', function (req, res) {
     res.send("<html><body><div style='color: red;'>我是测试</div></body></html>")
   })
   // 监听端口，启动服务
   const port = 9001
   app.listen(port, function () {
     console.log('服务启动了')
   })
   ```

4. 打开浏览器`http://localhost:9001/`，可以看到如下界面

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8aa5a2698d19475eb38ff01aae1d1145~tplv-k3u1fbpfcp-watermark.image?)

5. 目前如果访问其他页面，会提示 error 页面，后续我们会通过中间件的形式来进行处理

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d427141b583243f0b18e836da0e0ba35~tplv-k3u1fbpfcp-watermark.image?)

   

## 06：express核心概念middleware深入讲解 

### 什么是中间件

*中间件*函数能够访问[请求对象](https://www.expressjs.com.cn/zh-cn/4x/api.html#req) (`req`)、[响应对象](https://www.expressjs.com.cn/zh-cn/4x/api.html#res) (`res`) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 `next` 的变量来表示。

中间件函数可以执行以下任务：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求/响应循环。
- 调用堆栈中的下一个中间件函数。

### 基础中间件

1. 我们修改`server.js`为如下

   ```javascript
   // 创建服务
   const express = require('express')
   const app = express()
   
   // 中间件: 处理请求的业务逻辑
   // 前置中间件
   // 可以理解为全局中间件：第一个参数为回调函数时，则针对所有请求生效
   app.use(function (req, res, next) {
     console.log('before middleware start')
     next()
     console.log('before middleware end')
   })
   
   // 拦截路由
   app.get('/', function (req, res, next) {
     console.log("拦截了 / 路由")
     res.send("<html><body><div style='color: red;'>我是测试</div></body></html>")
     next() // 如果不执行 next, 后续中间件不会执行
   })
   
   // 后置中间件
   app.use(function (req, res, next) {
     console.log('after middle start')
     next()
     console.log('after middle end')
   })
   
   // 监听端口，启动服务
   const port = 9001
   app.listen(port, function () {
     console.log('服务启动了')
   })
   ```

2. 重新运行`node server.js`

3. 刷新`localhost:9000`可以看到终端中有如下记录

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28eb8ae817df4aeeb3854b31433b08bb~tplv-k3u1fbpfcp-watermark.image?)

4. 这里我们可以看到它的一个执行顺序，遵循[洋葱模型](https://juejin.cn/post/6957258059022499854)

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/958d6af0fa994c15afbc9bfd21607af3~tplv-k3u1fbpfcp-watermark.image?)

### 路由器层中间件

1. 另外还可以，对固定的路由进行中间件处理，不符合规则不执行此中间件

   ```javascript
   // 在后置中间件前加入
   
   // 路由中间件，第一个参数为匹配路由，第二个参数为回调函数
   app.use('/test', function (req, res, next) {
      console.log("拦截了 /test 路由")
     res.send('text')
     next()
   })
   ```

2. 我们重新运行`node server.js`,

3. 访问`localhost:9000`，时候，打印结果如下

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28eb8ae817df4aeeb3854b31433b08bb~tplv-k3u1fbpfcp-watermark.image?)

4. 重新运行`node server.js`，访问`localhost:9000/test`时，打印结果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23ad322950a0400d9d709f98da92cb9b~tplv-k3u1fbpfcp-watermark.image?)

### 异常中间件

注意事项：

1. 异常中间件全局只包含一个
2. 异常中间件可以传递给普通中间件
3. 异常中间件需要放在所有中间件最后

## 07：express异常中间件和异常捕获机制详解



## 08：express https服务+静态资源服务搭建实战




