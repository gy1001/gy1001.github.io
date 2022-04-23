### 3.9 Shimming 的作用

### 4.0 环境变量的使用方法

> 此用法不建议，只做了解就可，主流的不用这种

1. 修改打包脚本命令如下

   ```javascript
   "scripts": {
      "dev-build": "webpack --config webpack.common.js",
      "prod-build": "webpack --env production --config webpack.common.js"
   },
   ```

2. 修改 `webpack.common.js` 文件内容如下
   ```javascript
   ...
   const { merge } = require('webpack-merge')
   const devConfig = require('./webpack.dev')
   const prodConfig = require('./webpack.prod')
   const commonConfig = {
     entry:{ ...},
   ...
   }
   module.exports = (env) => {
     if (env && env.production) {
       return merge(commonConfig, prodConfig)
     }
     return merge(commonConfig, devConfig)
   }
   ```
3. 再次执行如下打包命令

   ```shell
   npm run dev-build  // 产生测试环境的结果
   npm run prod-build // 产生生产环境的结果
   ```

[webpack 使用环境变量](https://webpack.js.org/guides/environment-variables/)

## 4. Webpack 实战配置案例讲解

### 4.1 Library 的打包

#### 4.1.1 没有使用依赖的自有库 library

> 上面的教程更多是开发业务代码，除了打包应用程序，webpack 还可以用于打包 JavaScript library。以下指南适用于希望简化打包策略的 library 作者。

1. 新创建一个文件夹，名字比如叫做 `library`

2. 进行初始化

   ```javascript
   npm init
   ```

3. 安装 webpack webpack-cli

   ```shell
   npm install webpack webpack-cli
   ```

4. 创建 `index.js`、`math.js`、`string.js` 文件，内容如下

   ```javascript
   // index.js: 注意这里写法不同，引入方式也会不同
   export * from './math'
   export * from './string'

   // math.js
   export function add(a, b) {
   	return a + b
   }

   export function minus(a, b) {
   	return a - b
   }

   export function multiply(a, b) {
   	return a * b
   }

   export function division(a, b) {
   	return a / b
   }

   // string.js
   export function join(a, b) {
   	return a + '' + b
   }
   ```

5. 创建 `webpack.config.js`，内容如下

   ```javascript
   const path = require('path')

   module.exports = {
   	mode: 'production',
   	entry: './src/index.js',
   	output: {
   		filename: 'library.js',
   		path: path.resolve(__dirname, 'dist'),
   	},
   }
   ```

6. 修改`package.json`文件中的打包命令，更改如下

   ```javascript
    "scripts": {
       "build": "webpack build"
     },
   ```

7. 运行打包命令`npm run build`, 进行打包，结果输出`dist` 目录和`librarya.js`文件

8. 这时候，显然作为业务代码开发是上面的流程，也是可以使用。但是如果作为库文件供其他开发者使用，显然是不可以的

9. 首先，作为开发者，使用第三方依赖库有如下几种调用方式

   ```javascript
   // 第一种:es6方式
   import library from "library"

   // 第二种:commonjs方式
   const library = require('library')

   // 第三种:AMD方式
   define("library", function(library){

   })

   // 第四种:script标签引入
   <script src="http://xxx.com/library.js"></script>
   <script>
     // 这里直接使用 library
   </script>
   ```

10. 我们可以在`webpack.config.js`中的`output`项目中在添加一项`libraryTarget`

    ```javascript
    output:{
      ...
      // libraryTarget: 'umd',
      // library: 'library'
      // 上述写法在官网提到：未来可能会移除，建议更改为如下写法
      //
      library: {
        name: 'library',
        type: 'umd',
      },
    }
    ```

11. 注意：这里的 `libraryTarget`、`library`有几种不同的配置(官方网站建议更改为：[`output.library.type`](https://webpack.docschina.org/configuration/output/#outputlibrarytype))

    > 类型默认包括 `'var'`、`'module'`、`'assign'`、`'assign-properties'`、`'this'`、`'window'`、`'self'`、`'global'`、`'commonjs'`、`'commonjs2'`、`'commonjs-module'`、`'commonjs-static'`、`'amd'`、`'amd-require'`、`'umd'`、`'umd2'`、`'jsonp'` 以及 `'system'`，除此之外也可以通过插件添加。

    1. var：当 library 加载完成，**入口起点的返回值**将分配给一个变量：
    2. This：**入口起点的返回值** 将会被赋值给 this 对象下的 `output.library.name` 属性。
    3. global：**入口起点的返回值** 将会被复制给全局对象下的 `output.library.name`。取决于 [`target`](https://webpack.docschina.org/configuration/target/) 值，全局对象可以分别改变,例如，`self`、`global` 或者 `globalThis`。
    4. window：**入口起点的返回值**将使用 `output.library` 中定义的值，分配给 `window` 对象的这个属性下。

12.
