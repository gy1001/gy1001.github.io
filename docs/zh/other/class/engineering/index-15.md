# 工程化脚手架：进阶实战——工程化脚手架启动流程实战

## 01: Node文件监听chokidar库详解

1. 安装依赖库

   ```bash
   npm install chokidar -S
   ```

2. 修改`lib/start/startServer.js`文件，内容如下

   ```javascript
   const chokidar = require('chokidar')
   const path = require('path')
   
   function runServer() {
     // 启动 webpack 服务
   }
   
   function runWatcher() {
     // 启动配置监听服务
     // 使用三方库：chokidar
     const configPath = path.resolve('./config.js')
     // 这里先通过监听 start 文件夹来查看回调数据
     chokidar
       .watch(path.resolve(__dirname, '../start'))
       .on('all', (eventName, path) => {
         console.log(eventName, path)
       })
   }
   
   module.exports = function startServer(args, opts, cmd) {
     console.log('start server')
     // 1. 通过子进程启动一个 webpack-dev-server 服务
     // 1.1 子进程启动可以避免主进程收到影响
     // 1.2 子进程启动可以方便重启，解决修改配置后无法重启的问题
     runServer()
   
     // 2. 监听配置修改
     runWatcher()
   }
   ```

3. 新建`lib/start/config.js`，内容如下

   ```{  a: '1'}
   { a: '1' }
   ```

4. 运行如下命令，及相应效果如下(可以看到此时监听了三个项目：`start文件夹、config.js、startServer.js`)

   ```bash
   $  imooc-build start
   start server
   addDir /Users/gaoyuan/Desktop/imooc-build/lib/start
   add /Users/gaoyuan/Desktop/imooc-build/lib/start/config.js
   add /Users/gaoyuan/Desktop/imooc-build/lib/start/startServer.js
   ```

## 02: chokidar实现原理和源码分析





























































