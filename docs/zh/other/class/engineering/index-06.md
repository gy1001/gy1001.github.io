# 06-【性能优化】原生 JS 项目工程化性能优化

## 01：项目优化进阶之多js分离

目前`index.html`和`login.html`同时引用了`main.js`，`main.js`对应`src/index.js`,该文件同时引用了`index.html`和`login.html`的依赖资源，这样会导致`src/index.js`随着项目规模的扩大越来越臃肿，要解决这个需要指定`index.html`和`login.html`分别引用不同的`js`文件，这就需要涉及`webpack`多入口配置

1. 修改`index.js`和`login.js`

   ```javascript
   // index.js
   import './css/public.css'
   import './css/index.css'
   
   import 'jquery'
   import './js/public'
   import './js/nav'
   
   // 新增 src/login.js
   import './css/public.css'
   import './css/login.css'
   ```

2. 修改`webpack.config.js`，增加多入口配置

   ```javascript
   module.exports = {
     ...
     entry: {
       index: "./src/index.js",
       login: "./src/login.js"
     },
      plugins: [
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './public/index.html',
         chunks: ['index'], // 新增加
       }),
       new HtmlWebpackPlugin({
         filename: 'login.html',
         template: './public/login.html',
         chunks: ['login'], // 新增加
       }),
      ]
   }
   ```

3. 重新运行`npm run build`，可以看到`dist`目录下分别产生了`index.js`文件和`login.js`文件，并且`index.html`和`login.html`分别进行了引用

## 02：项目开发模式配置+CopyWebpackPlugin自动拷贝配置

1. 安装`webpack-dev-server`

   ```shell
   npm install webpack-dev-server --save-dev
   ```

2. 在`webpack.config.js`中增加配置

   ```javascript
    devServer: {
     static: {
       directory: path.resolve(__dirname, 'dist'),
     },
     compress: true,
     port: 9000,
     hot: true,
   },
   ```

3. `package.json`中增加脚本命令

   ```javascript
   "scripts": {
     "dev": "webpack-dev-server"
   },
   ```

4. 看到终端中，正常运行启动，打开`localhost:9000`即可打开页面。此时发现页面中图片均没有加载，因为路径错误

5. 这里新安装一个插件`copy-webpack-plugin`

   ```shell
   npm install copy-webpack-plugin --save-dev
   ```

6. 修改`webpack.config.js`文件

   ```javascript
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   
   module.exports = {
     plugins: [
       ...
       new CopyWebpackPlugin({
         patterns: [
           {
             from: path.resolve(__dirname, './src/img'),
             to: path.resolve(__dirname, './dist/img'),
           },
         ],
       }),
     ]
   }
   ```

7. 全局修改`index.html`页面中的`../src/img`为`img`

8. 重新运行`npm run dev`，打开页面，即可正常显示

## 03：性能优化之从 bundle 剥离 css 资源

1. 安装`mini-css-extract-plugin`

   ```shell
   npm install mini-css-extract-plugin --save-dev
   ```

2. 接着在 `webpack.config.js` 配置中加入该插件

   ```javascript
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   module.exports = {
     plugins: [
       ...
       new MiniCssExtractPlugin({
         filename: 'css/[name].[hash].css',
         chunkFilename: 'css/[name].chunk.css',
       }),
     ]
   }
   ```

3. 删除`dist`目录，重新进行`npm run build`

4. 可以看到`dist`目录下分别产生了`css/index.xxx.css`以及`css/login.xxx.css`文件，并且在`index.html`和`login.html`页面内部分别进行了引入

## 04：性能优化之js&css压缩+treeshaking特性详解

### js&css压缩

1. 压缩`js`我们使用`[uglifyjs-webpack-plugin]`[https://webpack.docschina.org/plugins/uglifyjs-webpack-plugin/](https://webpack.docschina.org/plugins/uglifyjs-webpack-plugin/)

   ```shell
   npm install uglifyjs-webpack-plugin --save-dev
   ```

2. 然后把插件添加到你的 `webpack.config.js` 配置中

   ```javascript
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
   
   module.exports = {
     optimization: {
       minimize: true, // 默认开发模式下不压缩
       minimizer: [new UglifyJsPlugin({ sourceMap: true })],
     },
   };
   ```

3. 重新运行`npm run build`，可以看到`js`代码被要压缩了

4. 压缩`css`我们使用`CssMinimizerWebpackPlugin`

   ```shell
   npm install css-minimizer-webpack-plugin --save-dev
   ```

5. 然后把插件添加到你的 `webpack.config.js` 配置中

   ```javascript
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
   
   module.exports = {
     optimization: {
       minimize: true, // 默认开发模式下不压缩
       minimizer: [
         new UglifyJsPlugin({ sourceMap: true }),
         new CssMinimizerPlugin(),
       ],
     },
   };
   ```

### tree shaking

> treeshaking 的触发条件
>
> * 通过解构的方式获取方法，可以触发 tree shakin
> * 调用的 npm 包必须使用 ES Module 规范

1. 这里我们先用`lodash`包进行演示

   ```shell
   npm install lodash --save-dev
   ```

2. `index.js`中进行引用

   ```javascript
   console.log(_.get({ a: 1 }, 'a'))
   import _ from 'lodash'
   ```

3. 执行打包命令`npm run build`，重新运行`index.html`可以看到如下效果

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/617ecafd961f40b1946af4309ebe8462~tplv-k3u1fbpfcp-watermark.image?)

4. 修改`index.js`中的代码如下

   ```javascript
   // import _ from 'lodash'
   // treeshaking 的触发条件
   // 1. 通过解构的方式获取方法，可以触发 tree shakin
   // 2. 调用的 npm 包必须使用 ES Module 规范
   import { get } from 'lodash'
   console.log(get({ a: 1 }, 'a'))
   ```

5. 这时候重新打包`npm run build`，重新运行`index.html`，发现`index.js`大小并没有发生变化

6. 这是为什么呢？因为你不符合第二个调用条件：**调用的 npm 包必须使用 ES Module 规范**，`lodash`源码中随便打开一个文件可以看到这样一句，可以看出来它使用的是 `Commonjs` 规范，所以并不满足`treeshaking`的一个要求

   ```javascript
   module.exports = xxxx
   // /node_modules/lodash/_apply.js 最后一句是 module.exports = apply;
   ```

7. 那应该怎么办呢？我们可以使用`lodash-es`

   ```shell
   npm install lodash-es --save-dev
   ```

8. 修改`index.js`中的引用

   ```javascript
   // import { get } from 'lodash'
   import { get } from 'lodash-es'
   console.log(get({ a: 1 }, 'a'))
   ```

9. 重新打包，打开`index.html`，查看`inde.js`大小，已经减少一半

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4c73a5758474c60ad84ae1f1a07b564~tplv-k3u1fbpfcp-watermark.image?)

## 05： 精化：详细讲解treeshaking的使用前提和触发条件

上一节中我们使用的对于不同的`treeshaking`，就是说`lodash`库包下面有很多`js`文件，比如`get.js、has.js、indexOf.js`等等文件，上一节中我们只是使用`get.js`文件，对于同一个库下面的其他文件，做了`treeshakign`处理，

那么对于同一个文件中的`js`文件呢？

1. 新建`src/tool.js`文件

   ```javascript
   export function test1() {
     console.log('test1')
   }
   
   export function test2() {
     console.log('test2')
   }
   ```

2. `index.js`中进行引用

   ```javascript
   import { test1 } from './tool'
   console.log(test1)
   ```

3. 运行`npm run build`命令，查看`dist/js/index.xxx.js`文件,搜索`test1`、`test2`发现均可以搜到，我们得知目前情况下同一个文件下是没有触发`treeshaking`的

4. 如果想要对同一个文件也使用`treeshaking`，这就需要第三个条件：**mode=production**

5. 修改配置文件`webpack.config.js`，

   ```javascript
   module.exports = {
     mode: 'production'
   };
   ```

6. 重新进行打包`npm run build`,查看`dist/js/index.xxx.js`文件,搜索`test1`、`test2`发现`test2`不能被搜索到了，这样就完成了**同一个文件下的treeshaking**

**注意**：一定要使用**解构**来加载模块，模块中也不要一股脑导出一个对象，否则`treeshaking`会失效

## 06：划重点：详细讲解 splitChunk 特性

1. 修改`webpack.config.js`文件中的`mode`为`development`

   ```javascript
   module.exports = {
     mode: 'development'
   };
   ```

2. 目前整体模块还不算大，我们修改`index.js`文件，全量引入`lodash`

   ```javascript
   import _ from 'lodash-es'
   console.log(_.get({ a: 1 }, 'a'))
   ```

3. 重新运行`npm run build`，查看打包后的`dist/index.xxx.js`文件大小为`1.9M`，显然这个大小有点过大

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4965f7d5a4734c808d78312bdbed051a~tplv-k3u1fbpfcp-watermark.image?)

4. 然后进行分割。修改配置文件如下

   ```javascript
   module.exports = {
     ...
     optimization: {
       ... 
       // 添加 splitChunks 属性配置
       splitChunks: {},
     },
   }
   ```

5. 重新打包，发现大小并没有发生变化，这是为什么呢？

6. 我们查看[官方文档](https://webpack.docschina.org/plugins/split-chunks-plugin#root),知悉其默认配置如下

   ```javascript
   module.exports = {
     //...
     optimization: {
       splitChunks: {
         chunks: 'async', // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
         minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
         minRemainingSize: 0,
         minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
         maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
         maxInitialRequests: 30, // 入口点的最大并行请求数。
         enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略。
         cacheGroups: {
           defaultVendors: {
             test: /[\\/]node_modules[\\/]/,
             priority: -10,
             reuseExistingChunk: true,
           },
           default: {
             minChunks: 2,
             priority: -20,
             reuseExistingChunk: true,
           },
         },
       },
     },
   };
   ```

7. 我们修改为如下配置

   ```javascript
   module.exports = {
     ...
     optimization: {
       ... 
       splitChunks: {
         chunks: "all",
         minSize: 300 * 1024,
       },
     },
   }
   ```

8. 删除`dist`目录，重新打包`npm run build`，可以看到多了一个文件`vendors-node_modules_pnpm_flexslider_2_7_2_node_modules_flexslider_jquery_flexslider_js-node_-bf1d5e.5f06f1cc8de30c0397b7.js`,根绝文件名字大概可以猜到它是把`jquery、flexslider`等打包到一起

9. 我们可以修改文件名字,配置如下，重新打包，就可以得到`common.xxxx.js`文件

   ```javascript
   module.exports = {
     ...
     optimization: {
       ... 
       splitChunks: {
         chunks: "all",
         minSize: 300 * 1024,
         name: "common"
       },
     },
   }
   ```

10. 我们也可以对某一组组件进行打包

    ```javascript
    module.exports = {
      ...
      optimization: {
        ... 
        splitChunks: {
          chunks: "all",
          minSize: 300 * 1024,
          name: "common"
        },
        // 增加 cacheGroups 属性
        cacheGroups: {
          jquery: {
            name: 'jquery',
            test: /jquery/,
            chunks: 'all',
          },
        },
      },
    }
    ```

## 07：利用 ejs 实现公共代码复用

我们发现`index.html`中的`footer、header`部分是可以抽离出来的，

1. 新建`ejs/header.ejs`文件，吧`index.html`中的`header`部分移动出来，剪切入`header.ejs`中

2. 在`index.html`中之间`header`部分添加如下代码

   ```html
   // index.html
   <%= require("../ejs/header.ejs")({title:'我是首页'}) %>
      
   // (支持传入变量)
   header.ejs  需要被变量渲染的地方写入 <%= title %>
   ```

3. 安装`ejs-loader`

   ```shell
   npm install ejs-loader --save-dev
   ```

4. 修改`webpack.config.js`配置文件如下

   ```javascript
   module.exports = {
     module: {
       rules: [
         ...
         {
           test: /\.ejs$/,
           use: [
             {
               loader: 'ejs-loader',
               options: {
                 esModule: false,
               },
             },
           ],
         },
       ]
     }
   }
   ```

5. 重新打包`npm run build`，打开`index.html`可以看到页面中`header`那部分被ejs中的header.ejs文件内容替换，并且写入了变量名字

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d75b4f20d05e45639c9f16e2a1aee34c~tplv-k3u1fbpfcp-watermark.image?)

6. 同理，你可以按照上述操作完成 `footer.ejs`不分



## 08：利用 CleanWebpackPlugin 清空 dist 目录

1. 安装`clean-webpack-plugin`插件

   ```shell
   npm install clean-webpack-plugin --save-dev
   ```

2. 修改`webpack.config.js`中引入即可

   ```javascript
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   module.exports = {
     plugins: [
       ...
       new CleanWebpackPlugin(),
     ]
   }
   ```

3. 重新运行打包`npm run build`，可以看到`dist`目录中不会再保留上次打包留下的文件
