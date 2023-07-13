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

- 拆分配置 和 merge
  - webpack.common.js
  - webpack.dev.js
  - webpack.prod.js
- 启动本地服务
- 处理 ES6
- 处理样式
- 模块化
- 懒加载
- 处理 JSX
- 处理 vue

## 04: webpack 如何配置多入口

### webpack 高级配置

- 基本配置只能做 demo, 不能做线上项目
- 面试考察基本配置，只是为了快读判断是否用过 webpack
- 以下高级配置，也是通过面试的必备条件

### webpack 高阶配置特性

- 多入口
- 抽离压缩 css 文件
- 抽离公共代码

### 配置如下

- entry 添加多入口
- output 的 filename 进行名字的配置 `filename: '[name].[contentHash:8].js'`
- HtmlWebpackPlugin 使用不同入口的 `xxx.html` 文件, 并配置 `chunks` 使用对应入口的 文件

```javascript
// webpack.common.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  // entry 是多入口的
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/,
      },
      // {
      //     test: /\.css$/,
      //     // loader 的执行顺序是：从后往前
      //     loader: ['style-loader', 'css-loader']
      // },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'], // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: path.join(srcPath, 'index.html'),
    //     filename: 'index.html'
    // })

    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['index'], // 只引用 index.js
    }),
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      chunks: ['other'], // 只引用 other.js
    }),
  ],
}
```

```javascript
// webpack.prod.js: output 的 filename 进行更改
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
    filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,
            // 打包到 img 目录下
            outputPath: '/img1/',
            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production'),
    }),
  ],
})
```

## 05: webpack 如何抽离压缩 css 文件

```javascript
// 配置代码如下
// webpack.dev.js 我们使用 不抽离 css 文件没有问题
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
  mode: 'development',
  module: {
    rules: [
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader',
      },
      // {
      //     test: /\.css$/,
      //     // loader 的执行顺序是：从后往前
      //     loader: ['style-loader', 'css-loader']
      // },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'], // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('development'),
    }),
  ],
  devServer: {
    port: 8080,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩

    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': '',
        },
      },
    },
  },
})
```

打包生产配置时，就需要进行抽离了，配置如下

```javascript
// webpack.prod.js
const path = require('path')
const webpack = require('webpack')
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
    filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 打包到 img 目录下
            outputPath: '/img1/',

            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
      // 抽离 css
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'postcss-loader',
        ],
      },
      // 抽离 less --> css
      {
        test: /\.less$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production'),
    }),

    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css',
    }),
  ],

  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
})
```

## 06: webpack 如何抽离公共代码和第三方代码

> 注意代码中的 splitChunks 配置

```javascript
// webpack.prod.js
const path = require('path')
const webpack = require('webpack')
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
    filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 打包到 img 目录下
            outputPath: '/img1/',

            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
      // 抽离 css
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'postcss-loader',
        ],
      },
      // 抽离 less
      {
        test: /\.less$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production'),
    }),

    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css',
    }),
  ],

  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
        initial 入口 chunk，对于异步导入的文件不处理
        async 异步 chunk，只对异步导入的文件处理
        all 全部 chunk
      */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0, // 大小限制
          minChunks: 1, // 最少复用过几次
        },

        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次
        },
      },
    },
  },
})
```

## 07: webpack 如何实现异步加载 JS

### 异步加载 js

```javascript
setTimeout(() => {
  // 回顾下 vue react 的 异步加载方式
  import('./dynamic-data.js').then((res) => {
    // 注意这里的 default
    console.log(res.default.message)
  })
})
```

### 处理 jsx

> 使用 babel

```shell
npm install --save-dev @babel/preset-react
```

webpack 配置文件: 使用 babel-loader 解析 js 文件

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: path.join(srcPath, 'index.html'),
    //     filename: 'index.html'
    // })

    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['index', 'vendor', 'common'], // 要考虑代码分割
    }),
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      chunks: ['other', 'common'], // 考虑代码分割
    }),
  ],
}
```

babel 配置文件如下:

- 不带参数

  ```json
  {
    "presets": ["@babel/preset-react"]
  }
  ```

* 带参数

  ```json
  {
    "presets": [
      [
        "@babel/preset-react",
        {
          "pragma": "dom", // 默认是 React.createElement（仅在经典的运行时中）
          "pragmaFrag": "DomFrag", // 默认是 React.Fragment（仅在经典的运行时中）
          "throwIfNamespace": false, // 默认是 true
          "runtime": "classic" // 默认是 classic
          // "importSource": "custom-jsx-library" // 默认是 react（仅在经典的运行时中）
        }
      ]
    ]
  }
  ```

### 处理 vue

> 使用 vue-loader, 配置同上道理

## 08: module chunk bundle 的区别

- module: 各个源码文件，webpack 中一切皆模块
- chunk: 多模块的合成，如 entry import splitChunk
- bundle: 最终的输出文件

综上所述，Module 是 Webpack 中最小的单元，它们组成了 Chunk，而 Chunk 则最终被合并成 Bundle。Bundle 是最终生成的文件，可以被直接加载到浏览器中运行。

用一句话说明三者之间的关系：

module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。
![img](https://img-blog.csdnimg.cn/65e7fbf7dddb4821a1c32c8cb7d754c9.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE3MTc1MDEz,size_16,color_FFFFFF,t_70)

## 09: webpack 优化构建速度-知识点串讲

[学习 Webpack5 之路（优化篇）- 近 7k 字](https://juejin.cn/post/6996816316875161637#heading-16)

- 大厂必考，社区热议话题
- 优化打包构建速度 --- 开发体验和效率
- 优化产出代码 --- 产品性能

### 优化打包构建速度

[webpack 高级配置-优化构建速度](https://zhuanlan.zhihu.com/p/118397517)

- 优化 babel-loader

  ```javascript
  {
    test: /\.js$/,
    loader: ['babel-loader?cacheDirectory'], // 开启缓存
    include: path.resolve(__dirname, "src"), // 明确范围
    // 排除范围： include 和 exclude 两者选一个即可
    // exclude: path.resolve(__dirname, /node_modules/) ,
  },
  ```

- IgnorePlugin
- noParse
- happyPack

  > 因为 happyPack 作者目前很少从事 JavaScript 工作，所以不维护了，推荐使用 thread-loader。
  >
  > [【实操】使用 thread-load 替换 happyPack 实现 loader 多线程](https://juejin.cn/post/7052240512593428494)

- ParallelUglifyPlugin
  > 你可能有听过 ParallelUglifyPlugin 插件，它可以帮助我们多进程压缩 JS，webpack5 的 TerserWebpackPlugin 默认就开启了多进程和缓存，无需再引入 ParallelUglifyPlugin。
  >
  > [官方文档：TerserWebpackPlugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/)
- 自动刷新
- 热更新
- DllPlugin: [何时使用-dllplugin](#_13-何时使用-dllplugin)
  > Vue 和 React 官方 2018 都不再使用 dll 了，

<!-- ### 优化产出代码 -->

## 10: 用 IgnorePlugin 忽略无用文件

避免引入无用模块

IgnorePlugin 是一个 webpack 内置的插件，可以直接使用 webpack.IgnorePlugin 来获取。

这个插件用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去。例如我们使用 moment.js，直接引用后，里边有大量的 i18n 的代码，导致最后打包出来的文件比较大，而实际场景并不需要这些 i18n 的代码，这时我们可以使用 IgnorePlugin 来忽略掉这些代码文件，配置如下：

- 比如使用 `moment` ，使用这种方式引入

  ```javascript
  import moment from 'moment'
  //设置语言
  moment.locale('zh-cn')
  let r = moment().endOf('day').fromNow()
  console.log(r)
  ```

- 默认会引入所有语言 js 代码，代码过大
- 如何只引入中文 ？？

修改配置如下

```javascript
// 代码演示
module.exports = {
  // ...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 配置的参数第一个是匹配引入模块路径的正则表达式，第二个是匹配模块的对应上下文即所在目录名。
  ],
}
```

问题存在与解决

> 我们虽然按照上面的方法忽略了包含’./locale/'该字段路径的文件目录,但是也使得我们使用的时候不能显示中文语言了，所以这个时候可以手动引入中文语言的目录

更改代码如下

```javascript
import moment from 'moment'
//设置语言
//手动引入所需要的语言包
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

let r = moment().endOf('day').fromNow()
console.log(r)
```

### noParse 避免重复打包

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。对于一些不需要解析依赖（即无依赖）的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。module.noParse 可以告诉 Webpack 忽略未采用模块系统文件的处理，可以有效地提高性能。比如常见的 jQuery 非常大，又没有采用模块系统，让 Webpack 解析这类型文件完全是浪费性能。

module.noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。注：这里一定要确定被排除出去的模块代码中不能包含 import、require、define 等内容，以保证 webpack 的打包包含了所有的模块，不然会导致打包出来的 js 因为缺少模块而报错。

```javascript
module.exports = {
  module: {
    noParse: [/react\.min\.js$/], // 完整的`react.min.js`文件就没有采用模块化
    // 忽略对`react.min.js`文件的递归解析处理
  },
}
```

### noParse VS IgnorePlugin：

- IgnorePlugin 直接不引入，代码里没有;
- noParse 引入，但不打包(不进行编译不进行模块化分析)

## 11: happyPack 是什么

[【实操】使用 thread-load 替换 happyPack 实现 loader 多线程](https://juejin.cn/post/7052240512593428494)

> 因为 happyPack 作者目前很少从事 JavaScript 工作，所以不维护了，推荐使用 thread-loader。

运行在 node.js 之上的 Webpack 是单线程模型的，也就是说 Webpack 需要处理的任务需要一件件挨着做，无法多个时间并行，当有大量文件需要读写和处理时尤其是当文件数量变多后，Webpack 构建慢的问题就会尤为严重。由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力只能通过多进程去实现，而无法通过多线程实现。HappyPack 能发挥多核 CPU 电脑的性能优势让 Webpack 同一时刻处理多个任务，它把任务分解成多个子进程去并发执行，子进程处理完毕后再将结果发送给主进程。

### 关于开启多进程

- 项目较大，打包较慢，开启多进程能提高速度
- 项目较小，打包很快，开启多进程会降低速度（进程开销）
- 按需使用

## 12: webpack 如何配置热更新

[webpack 热更新原理(面试大概率会问)](https://juejin.cn/post/7160939003212988424)

### 自动刷新

要用 webpack-devserver：

```javascript
module.export = {
  watch: true, // 开启监听，默认为false
  // 注意：开启监听后，webpack-dev-server会自动开启刷新浏览器

  // 监听配置：
  watchOptions: {
    ignored: /node_modules/, // 忽略哪些文件
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 判断文件是否发生变化是通过不停地去询问系统指定文件有没有变化实现的
    poll: 1000, // 默认每隔1000毫秒询问一次
  },
}
```

### 热更新

- 自动刷新： 整个网页全部刷新，速度较慢
- 自动刷新：这个那个网页全部刷新啊，转态丢失
- 热更新：新代码生效，网页不刷新，状态不丢失

> 模块热替换（Hot Module Replacement）的好处是只替换更新的部分，而不是整个页面都重新加载。

模块热替换能做到在不重新加载整个网页的情况下，通过将被更新过的模块替换老的模块，再重新执行一次来实现实时预览。 模块热替换相对于默认的刷新机制能提供更快的响应和更好的开发体验。 模块热替换默认是关闭的，要开启模块热替换，你只需在启动 DevServer 时带上--hot 参数，重启 DevServer 后再去更新文件就能体验到模块热替换了。

```javascript
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = smart(webpackCommonConf, {
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.join(srcPath, 'index.js'),
    ],
    other: path.join(srcPath, 'other.js'),
  },
  module: {},
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    port: 8080,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩

    hot: true,
  },
})
```

```javascript
// index.js要开启
// 增加，开启热更新之后的代码逻辑
if (module.hot) {
  module.hot.accept('./library.js', function () {
    // 使用更新过的 library 模块执行某些操作...
  })
}
```

## 13: 何时使用 DllPlugin

- 前端框架如 vue react 体积大，构建慢
- 较稳定，不常升级版本
- 同一个版本只构建一次即可，不用每次都重新构建
- webpack 已内置了 DllPlugin 支持, 不用额外 npm install
- DllPlugin - 打包出 dll 文件
- DllReferencePlugin - 使用 dll 文件

[你真的需要 Webpack DllPlugin 吗？](https://www.cnblogs.com/skychx/p/webpack-dllplugin.html)

> 抛弃 DLL：Vue & React 官方的共同选择: 所以说，如果项目上了 webpack 4，再使用 dll 收益并不大。我拿实际项目的代码试了一下，加入 dll 可能会有 1-2 s 的速度提升，对于整体打包时间可以说可以忽略不计。
>
> Vue 和 React 官方 2018 都不再使用 dll 了，现在 2019 年都快过去了，所以说我上面说的都没用了，都不用学了，是不是感觉松了一口气（疯狂暗示点赞）？

### 比 DLL 更优秀的插件 HardSourceWebpackPlugin

> 貌似这个技术直接放到了 webpack 5 里

```javascript
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  // ......
  plugins: [
    new HardSourceWebpackPlugin(), // <- 直接加入这行代码就行
  ],
}
```

## 14: webpack 优化构建速度(可用于生产环境)-考点总结和复习

### 可用于生产环境

- 优化 babel-loader
- IgnorePlugin
- noParse
- happyPack
- ParallelUglifyPlugin

### 不可用于生产环境

- 自动刷新
- 热更新
- DllPlugin
  > 双越： 生产环境要考虑打包的体积，和加载的性能。DllPlugin 解决的是打包的速度。这两者不一个目的。如果生产环境用了 DllPlugin ，可能会和打包体积、打包合并的逻辑，产生冲突

## 15: webpack 优化产出代码-考点串讲

- 体积更小
- 合理分包，不重复加载
- 速度更快，内存使用更小

### webpack 性能优化-产出代码

- 小图片 base64 编码
- bundle 加 hash
- 懒加载
- 提取公共代码
- IgnorePlugin
- 使用 CDN 加速
- 使用 production
- Scope Hosting

### 使用 production

- 自动开启压缩代码
- Vue React 等会自动删除调试代码（如开发环境的 warning）
- 启动 Tree-Shaking

## 16: 什么是 Tree-Shaking

> 按照 webpack 官网的解释，tree shaking 通常用于描述移除 JavaScript 上下文中的未引用代码（dead-code）。它依赖于 ESM 的静态分析能力，例如 import 和 export。用大白话解释就是，如果是使用模块化开发的话，就可以删除那些引入某个模块中用不到的函数。
>
> 为什么叫 tree shaking， 我个人觉得这个名次叫的很形象呀。你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

## 17: ES Module 和 Commonjs

- ES6 module 是静态引入，编译时引入
- Commonjs 是动态引入，执行时引入
- 只有 ES6 Module 才能静态分析，实现 Tree-Shaking

```javascript
let apiList = require('../config/api.js')
if (isDev) {
  // 可以动态引入，执行时引入
  apiList = require('../config/api_dev.js')
}
```

```javascript
import apiList from '../config/api.js'
if (isDev) {
  // 编译时报错，只能静态引入
  import apiList from '../config/api_dev.js'
}
```

## 18: 什么是 Scope Hosting?

> Scope Hoisting 它可以让 webpack 打包出来的代码文件更小，运行更快，它可以被称作为 "作用域提升"。 是在 webpack3 中提出来的，当然现在 webpack4 也是支持的。

scope hoisting 原理

原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

对比：通过 scope hoisting 可以减少函数声明代码和内存开销

简单理 scope hoisting 就是把多个作用域用一个作用域取代，以减少内存消耗并减少包裹块代码，从每个模块有一个包裹函数变成只有一个包裹函数包裹所有的模块，但是有一个前提就是，当模块的引用次数大于 1 时，比如被引用了两次或以上，那么这个效果会无效，也就是被引用多次的模块在被 webpack 处理后，会被独立的包裹函数所包裹

**注意**：但 scope hoisting 的启用是有前提的，如果遇到某些模块多次被其他模块引用，或者使用了动态导入的模块，或者是非 ESM 的模块，都不会有 scope hoisting。

### 代码演示

```javascript
// hello.js
export default 'hello 双越'

// main.js
import str from './hello.js'
console.log(str)
```

默认打包结果如下

```javascript
;[
  function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1)
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__['a'])
  },
  function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__['a'] = 'hello 双越'
  },
]
```

开启 Scope Hoisting 之后：

```javascript
;[
  function (module, __webpack_exports__, __webpack_require__) {
    var util = 'Hello,Webpack'
    console.log(util)
  },
]
```

开启

```javascript
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  plugins: [
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
```

## 19: babel 基本概念串讲

- 前端开发环境必备工具
- 同 webpack，需要了解基本的配置和使用
- 面试考察概率不高，但要求必会

### babel

[姜瑞涛的个人网站：Babel 简介](https://www.jiangruitao.com/babel/introduction/)

- 环境搭建 & 基本配置
- babel-polyfill
- babel-runtime

### babel 环境搭建和基本配置

[https://github.com/gy1001/Javascript/tree/main/frame-project-interview/babel-demo](https://github.com/gy1001/Javascript/tree/main/frame-project-interview/babel-demo)

- 环境搭建
- .babelrc 配置
- presets 和 plugins

## 20: babel-polyfill 是什么?

> [一文搞懂 core-js@3、@babel/polyfill、@babel/runtime、@babel/runtime-corejs3 的作用与区别](https://juejin.cn/post/7062621128229355528)

> babel 只转化语法，不转换新的 API

- 什么是 polyfill
  > Polyfill 的准确意思为： 用于实现浏览器并不支持的原生 API 的代码。
- 什么是 core-js 和 regenerator

- babel-polyfill 即两者的集合
  > 从 babel7.4 开始，官方不推荐再使用@babel/polyfill 了，因为@babel/polyfill 本身其实就是两个 npm 包的集合：core-js 与 regenerator-runtime。
  >
  > 官方推荐直接使用这两个 npm 包。虽然 @babel/polyfill 还在进行版本升级，但其使用的 core-js 包为 2.x.x 版本，而 core-js 这个包本身已经发布到了 3.x.x 版本了，@babel/polyfill 以后也不会使用 3.x.x 版本的包了。新版本的 core-js 实现了许多新的功能，例如数组的 includes 方法。

### babel-polyfill 现在已被弃用

- Babel 7.4 以后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator
- 但是不影响面试会考察它

## 21: babel-polyfill 如何按需引入?

- babel-polyfill 文件较大
- 实际中只用到了一部分功能, 无需全量引入
- 配置按需引入

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

### babel-polyfill 的问题

- 污染全局变量
  > babel-polyfill 通过向全局对象和内置对象的 prototype 上添加方法来实现的。所以这会造成全局空间污染。
- 如果做一个独立的 web 系统，则无所谓
- 如果做一个第三方 lib，就会有问题（引用这个库的项目中的全局变量被污染了，也有可能会有版本的冲突）

那么有没有一种办法,根据实际代码中用到的 ES6 新增 API ,来使用对应的垫片,而不是全部加载进去呢? 是的，有的。那就是 babel-runtime & babel-plugin-transform-runtime，他们可以实现按需加载。

## 22: babel-runtime 是什么?

[掘金：babel polyfill 到底怎么用？](https://juejin.cn/post/6844904063402770439)

### babel-runtime

简单说 babel-runtime 更像是一种按需加载的实现，比如你哪里需要使用 Promise，只要在这个文件头部引入即可

```javascript
import Promise from 'babel-runtime/core-js/promise'
```

不过如果你许多文件都要使用 Promise，难道每个文件都要 import 一下吗？当然不是，Babel 官方已考虑这种情况，只需要使用 babel-plugin-transform-runtime 就可以解决手动 import 的苦恼了。

### babel-plugin-transform-runtime

babel-plugin-transform-runtime 装了就不需要装 babel-runtime 了，因为前者依赖后者。
总的来说，babel-plugin-transform-runtime 就是可以在我们使用新 API 时 自动 import babel-runtime 里面的 polyfill，具体插件做了以下三件事情：

- 当我们使用 async/await 时，自动引入 babel-runtime/regenerator
- 当我们使用 ES6 的静态事件或内置对象时，自动引入 babel-runtime/core-js
- 移除内联 babel helpers 并替换使用 babel-runtime/helpers 来替换

babel-plugin-transform-runtime 优点：

- 不会污染全局变量
- 多次使用只会打包一次
- 依赖统一按需引入,无重复引入,无多余引入
- 避免 babel

```json
{
  "plugins": ["tranform-runtime"]
}
```

[详细讲解：姜瑞涛-大佬的文章](https://www.jiangruitao.com/babel/transform-runtime/)

## 24: webpack 面试真题-前端代码为何要打包

## 25: webpack 面试真题-为何 Proxy 不能被 Polyfill

## 26: webpack 面试真题-常见性能优化方法

## 27:【任务】从 0 配置 webpack5 开发环境
