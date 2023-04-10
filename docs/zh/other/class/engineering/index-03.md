# 03-【初探】原生前端项目工程化改造



## 01: webpack 快读上手

### webpack 核心概念

* entry：入口模块文件路径
* output：输出 bundle 文件路径
* module: 模块，webpack 构建对象
* bundle：输出文件，webpack 构建产物
* chunk：中间文件，webpack 构建的中间产物
* loader：文件转换器
* plugin：插件，执行特定任务

##  02: webpack快速入门+基础代码演示

### Quick Start

1. 新建文件夹`wepack-demo`

   ```shell
   mkdir webpack-demo
   ```

2. 执行初始化命令,根据提示输入内容

   ```shell
   cd webpack-demo
   npm init
   ```

3. 创建`src/index.js`

   ```shell
   mkdir src
   cd src
   touch index.js
   ```

   写入如下内容

   ```javascript
   console.log('hello webpack')
   ```

4. 创建`public/index.html`

   ```shell
   mkdir public
   cd public
   touch index.html
   ```

   写入如下内容(引入未来打包构建的`dist/bundle.js`文件)

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body></body>
     <script src="../dist/bundle.js"></script>
   </html>
   
   ```

5. 创建`wepack.config.js`，并写入配置如下

   ```javascript
   const path = require('path')
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, './dist'),
       filename: 'bundle.js',
     },
   }
   ```

6. 安装依赖

   ```shell
   npm install -D webpack webpack-cli
   ```

7. 配置`build`命令为`webpack`,在`package.json`中增加如下内容

   ```javascript
   {
     "scripts": {
       "build": "webpack"
     },
   }
   ```

8. 执行打包命令，完成打包构建

   ```shell
   npm run build
   ```

9. 运行`public/index.html`，可以看到打印结果









