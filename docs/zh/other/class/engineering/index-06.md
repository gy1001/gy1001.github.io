# 06-原生 js 项目：进阶实战——如何实现项目性能优化？

## 01：项目优化进阶之多 js 分离

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

## 02：项目开发模式配置+CopyWebpackPlugin 自动拷贝配置

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
       ...new CopyWebpackPlugin({
         patterns: [
           {
             from: path.resolve(__dirname, './src/img'),
             to: path.resolve(__dirname, './dist/img'),
           },
         ],
       }),
     ],
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
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')

   module.exports = {
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
       ],
     },
     plugins: [
       ...new MiniCssExtractPlugin({
         filename: 'css/[name].[contenthash:8].css',
         chunkFilename: 'css/[name].chunk.css',
       }),
     ],
   }
   ```

3. 删除`dist`目录，重新进行`npm run build`

4. 可以看到`dist`目录下分别产生了`css/index.xxx.css`以及`css/login.xxx.css`文件，并且在`index.html`和`login.html`页面内部分别进行了引入

## 04：性能优化之 js&css 压缩+treeshaking 特性详解

### js&css 压缩

1. 压缩`js`我们使用`[uglifyjs-webpack-plugin]`[https://webpack.docschina.org/plugins/uglifyjs-webpack-plugin/](https://webpack.docschina.org/plugins/uglifyjs-webpack-plugin/)

   ```shell
   npm install uglifyjs-webpack-plugin --save-dev
   ```

2. 然后把插件添加到你的 `webpack.config.js` 配置中

   ```javascript
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

   module.exports = {
     optimization: {
       minimize: true, // 默认开发模式下不压缩
       minimizer: [new UglifyJsPlugin({ sourceMap: true })],
     },
   }
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
   }
   ```

### tree shaking

> treeshaking 的触发条件
>
> - 通过解构的方式获取方法，可以触发 tree shakin
> - 调用的 npm 包必须使用 ES Module 规范

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

## 05： 精化：详细讲解 treeshaking 的使用前提和触发条件

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
     mode: 'production',
   }
   ```

6. 重新进行打包`npm run build`,查看`dist/js/index.xxx.js`文件,搜索`test1`、`test2`发现`test2`不能被搜索到了，这样就完成了**同一个文件下的 treeshaking**

**注意**：一定要使用**解构**来加载模块，模块中也不要一股脑导出一个对象，否则`treeshaking`会失效

## 06：划重点：详细讲解 splitChunk 特性

1. 修改`webpack.config.js`文件中的`mode`为`development`

   ```javascript
   module.exports = {
     mode: 'development',
   }
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
   }
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
   // index.html <%= require("../ejs/header.ejs")({title:'我是首页'}) %> //
   (支持传入变量) header.ejs 需要被变量渲染的地方写入 <%= title %>
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
         ...{
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
       ],
     },
   }
   ```

5. 重新打包`npm run build`，打开`index.html`可以看到页面中`header`那部分被 ejs 中的 header.ejs 文件内容替换，并且写入了变量名字

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
     plugins: [...new CleanWebpackPlugin()],
   }
   ```

3. 重新运行打包`npm run build`，可以看到`dist`目录中不会再保留上次打包留下的文件

## 09：【拓展】webpack 常用优化手段

### 写在前面

在第五、六章中，我们完成了原生 js 项目到 webpack5 的模块化框架升级和 ZBestPC 项目进阶升级的学习。在这两章内容中，我们接触到了

webpack 工程化应用的高级技巧。接下来，是我们的加餐环节：了解 webpack 的常用优化手段。在开始阅读之前，我希望大家能先思考一个问

我们进行优化打包的目的是什么？

### webpack 打包優化方向

- 打包速度：优化打包速度，主要提升了我们的开发效率，更快的打包构建过程，将让你保持一颗愉悦的心
- 打包体积：优化打包体积，主要是提升产品的使用体验，降低服务器资源成本，更快的页面加载，让产品显得更加“丝滑”，同时也可以让我们访问更快

### webpack 打包速度优化

webpack 进行打包速度优化有七中常用问题

#### 1. 优化 loader 搜索范围

对于 loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转换为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码。项目越大，转换代码越多，效率就越低。优化正则匹配，使用 include 和 exclude 指定需要处理的文件，忽略不需要处理的文件

```javascript
rules: [
  {
    // 优化正则匹配
    test: /\.js$/,
    // 指定需要处理的目录
    include: path.resolve(__dirname, 'src'),
    // 理论上只有 includer 就够了，但是某些情况需要排除文件的时候可以使用这个，排除不需要处理文件
    exclude: [],
  },
]
```

#### 2. 多线程/多进程

受限于 node 是单线程运行的，所以 webpack 在打包过程中也是单线程的，特别是再执行 loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。我们可以使用一些方法将 loader 的同步执行转换为并行，这样就能充分利用系统资源来提高打包速度了

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'thread-loader',
      options: {
        workers: 3 // 进程3个
      }
    },
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  ]
}
```

#### 3. 分包

在使用 webpack 进行打包的时候，对于依赖的第三方库，比如 vue、vuex 等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处就是每次更改我本地的代码文件的时候，webpack 只需要打包我们项目本身的文件代码，而不会再编译第三方库，那么第三方在第一次打包的时候只打包一次，以后只要我们不升级第三方依赖包，那么 webpack 就不会对这些库进行打包，这样可以**快读提高打包的速度**。因为为了解决这个问题，**DllPlugin** 和 **DllReferencePlugin** 插件就产生了。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案

```javascript
// webpack.dll.config.js
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'false',
  entry: {
    vue: ['vue', 'vue-router', 'vuex'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'lib/[name]_[hash:4].dll.js',
    library: '[name]_[hash:4]',
  },
  performance: {
    hints: false,
    maxAssetSize: 300 * 1024, // 单文件超过 300k.命令行告警
    maxEntrypointSize: 300 * 1024, // 首次加载文件综合超过 300k，命令行告警
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, '../dist/lib', '[name]-mainfest.json'),
      name: '[name]_[hash:4]',
    }),
  ],
}

// webpack.prod.config.js
plugins: [
  new webpack.DllReferencePlugin({
    context: __dirname,
    mainfest: require('../dist/lib/vue-mainfest.json'),
  }),
]
```

#### 4. 开发缓存

当设置 cache.type: "filesystem" 时，webpack 会在内部以分层方式启用文件系统缓存和内存缓存，将处理结果存放到内存中，下次打包直接使用缓存结果而不需要重新打包

```javascript
{
  type: "filesystem",
  // cacheDirectory 默认路径是 node_modules/.cache/webpack
  // cacheDirectory: path.resolve(__dirname, "temp_cache")
}
```

#### 5. 打包分析工具

显示测量打包过程中各个插件和 loader 每一步所消耗的时间，然后让我们可以有针对的分析项目中耗时的模块对其进行处理

```javascript
 npm install speed-measure-webpack-plugin -D

// webpack.prod.config.js
const SpeedMeasureWebpackPlugin = require('speed-measur-webpck-plugin')
const smp = new SpeedMeasureWebpackPlugin()
ver webpackConfig = merge(beseWebpackConfig, {})
====> 修改为如下格式
var webpackConfig = { ... }
module.exports = webpackConfig
====> 修改为如下格式
module.exprots = smp.wrap(beaseWebpackConfig,webpackConfig)
```

#### 6. ignorePlugin

这是 webpack 内置插件，它的作用是忽略第三方指定目录，让这些指定目录不要被打包进去，放止在 import 或者 require 调用时，生成以下正则表达式匹配的模块

- requestRegExp 匹配（test)资源请求路径的正则表达式
- contextRegExp（可选）匹配（test）资源上下问（目录）的正则表达式

```javascript
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/test$/,
  contextRegExp: /test$/,
})
```

#### 7. 优化文件路径

- alias: 省下搜索文件的时间，让 webpack 更快找到路径
- mainFiles: 解析目录时需要使用的文件名
- extensions: 指定需要检查的扩展名，匹配之后可以不用在 require 或者 import 的时候加文件扩展名，会依次尝试添加扩展名进行匹配

```javascript
 resolve: {
   extensions: ['.js', '.vue'],
   mainFiles: ['index'],
   alias: {
     "@": path.resolve(__dirname, "src")
   }
 }
```

### webpack 打包体积优化

#### 1. 构建体积分析

`npm run build`构建，会打开`http:127.0.0.1:8888`，可以看到各个包的体积，分析项目各个模块的大小，可以按需优化

```javascript
npm install webpack-bundle-analyzer -D

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

#### 2. 项目图片资源优化压缩处理

> 对打包后的图片进行压缩和优化，降低图片分辨率，压缩图片体积

```javascript
npm install image-webpack-loader -D

// webpack.base.config.js
modulee.exports = {
  rules: [
    {
      test: /\(.gif|png|jpg?g|svg|webp)$/i,
      use: [
        {
					loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngqant: {
              quality: [0.5, 0.65],
            },
            gifsicle: {
              interlaced: false
            },
            webp: {
              quality: 75
            }
          }
        }
      ],
      type: "asset/resource",
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024
        }
      },
      generator: {
        filename: "images/[name].[hash:6][ext]"
      },
    }
  ],
}
```

#### 3. 删除无用的 css 央视

有时候一些项目中可能会存在一些 css 样式呗迭代废弃，需要将其删除，可以使用`purgecss-webpack-plugin`插件，该插件可以去除 未使用的`css`

```javascript
npm install purgecss-webpack-plugin glod -D

// webpack.prod.config.js
const PurgeCssPlugin = require("purgecess-webpack-plugin")
const glob = require('glob')
const PATHS = {
  src: path.join(__dirname, "src")
}
// plugins
module.exports = {
  plugins: [
    new PurgeCssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,{ nodir: true }),
      safelist: ['body']
    })
  ]
}
```

#### 4. 代码压缩

对 js 文件进行压缩，从而减少 js 文件的体积，还可以压缩 html css 代码

[官方文档:terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/)

```javascript
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  optimization: {
    minimize: true, //代码压缩
    usedExports: true, // treeshaking
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // Deprecated
          output: null,
          format: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
}
```

#### 5. 开启 Scope Hoisting

Scope Hoisting 又译作"作用域提升".只需要在配置文件中添加一个新的插件，就可以让`webpack`打包出来的代码文件更小、运行的更快，Scope Hoisting 会分析模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中，然后适当地重命名一些变量以防止命名冲突。`new webpack.optimize.ModuleConcatenationPlugin()`

#### 6. 提供公共代码

将项目中的公共模块提出来，可以减少代码的冗余度，提高代码的运行效率和页面的加载速度。

`new webpack.optimize.CommonsChunkPlugin(options)`

#### 7. 代码分离

代码分离能够将工程代码分离到各个文件中，然后按需加载或并行加载这些文件，也用于获取更小的`bundle`,以及控制资源加载优先级，在配置文件中配置多入口，输出多个`chunk`。多入口配置 最终输出两个 `chunk`

```javascript
module.exports = {
  entry: {
    index: 'index.js',
    login: 'login.js',
  },
  output: {
    // 对于多入口配置需要指定[name]否则会出现重名问题
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

#### 8. Tree-shaking

`treeshaking`是一个术语，通常用于描述移除`javaScript`山下文中未引用代码（dead-code）.它依赖于 ES205 模块语法的静态结构特性，例如：import 和 export

#### 9. CDN 加速

CDN 的全程是 Content DeliveryNetWork，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有**内容存储和分发技术**。在项目中以 CDN 的方式加载资源，项目中不需要对资源进行打包，大大减少打包后的文件体积

#### 10. 生产环境关闭 sourceMap

sourceMap 本质上是一种映射关系，打包出来的 js 文件中的代码可以映射到代码文件的具体位置，这种映射关系会帮助我们直接找到在源代码中的错误。但是这样会使项目打包速度减慢，项目体积变大，可以在生产环境关闭 sourceMap

#### 11. 按需加载

在开发项目的时候，项目中都会存在几十甚至更多的路由页面，如果我们将这些页面全部打包进一个文件的话，虽然将多个请求合并了，但是同样也记载了很多并不需要 的代码，耗费了更长的时间。那么为了页面能更快地呈现给用户，我们肯定是希望页面能加载的文件体积越小越好，这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件，。以下就是常见的按需加载的场景

- 路由组件按需加载
- 按需加载引入第三方插件
- 对于一些插件，如果只是在个别组件中用得到，也可以不要在 main.js 里面引入，而是在组件中按需引入

### 参考文档

[webpack 打包优化](https://juejin.cn/post/7160596941452574727#heading-14)

[一套骚操作下来，webpack 项目打包速度飞升 🚀、体积骤减 ↓](https://juejin.cn/post/7046616302521155614)

[一文搞定 webpack 构建优化策略](https://juejin.cn/post/6953790342613172237)
