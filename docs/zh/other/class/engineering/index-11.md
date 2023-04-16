# 11-Webpack 性能优化: 大型前端项目工程化升级实战

## 01：webpack性能优化原理和目标

### 构建性能优化方法

* 查找并诊断性能瓶颈
  * 构建速度分析：影响构建性能和开发效率
  * 构建体积分析：影响页面性能
* 构建性能优化常用方法
  * 通过多进程加快构建速度
  * 通过分包减少构建目标容量
  * 减少构建目标加快构建速度

## 02：深入分析构建速度测量插件speed-measure-webpack-plugin

### 构建速度分析 speed-measure-webpack-plugin

> ```npm
> speed-measure-webpack-plugin
> ```
>
> [https://github.com/stephencookdev/speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)

使用方式如下

```javascript
npm install --save-dev speed-measure-webpack-plugin

// vue.config.js
var path = require("path");
const SpeedMeasuurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasuurePlugin();
module.exports = {
  configureWebpack: smp.wrap({
    resolve: {
      extensions: ["", ".js", ".vue", ".less", ".css", ".scss"],
      alias: {
        src: path.resolve(__dirname, "./src"), // 注意这里路径有所更改
        assets: path.resolve(__dirname, "./src/assets"), // 注意这里路径有所更改
        components: path.resolve(__dirname, "./src/components"), // 注意这里路径有所更改
      },
    },
  }),
};
```

重新运行`npm run dev`可以大概看到如下结果

```shell
SMP  ⏱  
General output time took 2.089 secs

 SMP  ⏱  Loaders
modules with no loaders took 1.4 secs
  module count = 101
_css-loader@6.7.3@css-loader, and 
_vue-loader@17.0.1@vue-loader, and 
_postcss-loader@6.2.1@postcss-loader, and 
_sass-loader@13.2.2@sass-loader, and 
_vue-loader@17.0.1@vue-loader took 1.16 secs
  module count = 54
_vue-loader@17.0.1@vue-loader took 0.888 secs
  module count = 275
_css-loader@6.7.3@css-loader, and 
_postcss-loader@6.2.1@postcss-loader took 0.299 secs
  module count = 1
_vue-loader@17.0.1@vue-loader, and 
_vue-style-loader@4.1.3@vue-style-loader, and 
_css-loader@6.7.3@css-loader, and 
_postcss-loader@6.2.1@postcss-loader, and 
_sass-loader@13.2.2@sass-loader, and 
_vue-loader@17.0.1@vue-loader took 0.06 secs
  module count = 108
_html-webpack-plugin@5.5.0@html-webpack-plugin took 0.024 secs
  module count = 1
_vue-style-loader@4.1.3@vue-style-loader, and 
_css-loader@6.7.3@css-loader, and 
_postcss-loader@6.2.1@postcss-loader took 0 secs
  module count = 1
```

下面说一些他得配置项目

```javascript
const smp = new SpeedMeasurePlugin(options);

options.disable: Type: Boolean Default: false ,是否关闭插件，默认是 false
options.outputFormat Type: String|Function Default: "human" 输出格式 json|| human || humanVerbose || Function
options.outputTarget: Type: String|FunctionDefault: console.log
...
```

## 03：深入分析构建体积检测插件webpack-bundle-analyzer

### 构建体积分析：webpck-bundle-analyzer

> [https://github.com/webpack-contrib/webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```json
npm install --save-dev webpack-bundle-analyzer

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

`npm run dev`执行后会自动打开`http://127.0.0.1:8888/`即可看到打包的一个情况

## 04：构建性能优化之多进程thread-loader

### 多进程/多实例 thread-loader

> [thread-loader:https://github.com/webpack-contrib/thread-loader](https://github.com/webpack-contrib/thread-loader)
>
> [webpack 之 thread-loader:https://www.webpackjs.com/loaders/thread-loader/](https://www.webpackjs.com/loaders/thread-loader/)

```javascript
npm install thread-loader -D

// webpack.base.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
     				// {
            //   loader: "babel-loader",
            //   options: {
            //     presets: ["@babel/preset-env"],
            //     plugins: ["@babel/plugin-transform-runtime"],
            //   },
            // },
          },
        ],
      },
    ],
  },
}
```

当然还有其他的可选方案

* parallel-webpack
* HappyPack

但是由于 happyPack 原作者对 js 的兴趣逐渐丢失，所以之后维护很少，webpack4 之后推荐使用 thread-loader

#### [Vue-cli之parallel：https://cli.vuejs.org/zh/config/#parallel](https://cli.vuejs.org/zh/config/#parallel)

对于 vue-cli，官方有一个配置选项

> ### [parallel](https://cli.vuejs.org/zh/config/#parallel)
>
> - Type: `boolean`
>
> - Default: `require('os').cpus().length > 1`
>
>   是否为 Babel 或 TypeScript 使用 `thread-loader`。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。

```javascript
// vue.config.js
module.exports = {
  // parallel 选项
  parallel: true,
  configureWebpack: smp.wrap({
    resolve: {
      extensions: ["", ".js", ".vue", ".less", ".css", ".scss"],
      alias: {
        src: path.resolve(__dirname, "./src"), // 注意这里路径有所更改
        assets: path.resolve(__dirname, "./src/assets"), // 注意这里路径有所更改
        components: path.resolve(__dirname, "./src/components"), // 注意这里路径有所更改
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled", // 不启动展示打包报告的http服务器
      }),
    ],
  }),
};
```

## 05【精华】webpack5分包策略详解



## 06：分包文件拷贝和模板的自动引用

## 07：利用webpack5 cache特性大幅提升构建性能

## 08：image-webpack-loader实现图片5倍压缩

## 09：purgecss-webpack-plugin优化css体积
