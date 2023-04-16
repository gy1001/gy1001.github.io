# 11-Webpack 性能优化: 大型前端项目工程化升级实战

## 01：webpack 性能优化原理和目标

### 构建性能优化方法

- 查找并诊断性能瓶颈
  - 构建速度分析：影响构建性能和开发效率
  - 构建体积分析：影响页面性能
- 构建性能优化常用方法
  - 通过多进程加快构建速度
  - 通过分包减少构建目标容量
  - 减少构建目标加快构建速度

## 02：深入分析构建速度测量插件 speed-measure-webpack-plugin

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

## 03：深入分析构建体积检测插件 webpack-bundle-analyzer

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

## 04：构建性能优化之多进程 thread-loader

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

- parallel-webpack
- HappyPack

但是由于 happyPack 原作者对 js 的兴趣逐渐丢失，所以之后维护很少，webpack4 之后推荐使用 thread-loader

#### [Vue-cli 之 parallel：https://cli.vuejs.org/zh/config/#parallel](https://cli.vuejs.org/zh/config/#parallel)

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
      extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
      alias: {
        src: path.resolve(__dirname, './src'), // 注意这里路径有所更改
        assets: path.resolve(__dirname, './src/assets'), // 注意这里路径有所更改
        components: path.resolve(__dirname, './src/components'), // 注意这里路径有所更改
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      }),
    ],
  }),
}
```

## 05【精华】webpack5 分包策略详解

### 分包 DllPlugin & DllReferencePlugin

> 对于变化几率很小的一些第三方包，其实没有必要 build 的时候都要打包一次，可以把这些第三方包单独抽离出来，提前打包好。webpack 本身是要体现出模块间的关系，当我们将一些包抽离出来后，维护之前的依赖关系就需要 mainfest.json 这个文件。将 vue vue-loader vuex 等基础包和业务包打包成一个文件，使用 DllPlugin 进行分包，DllReferencePlugin 对 mainfest.json 引用。mainfest.json 是对分离出来的包的描述

分包的具体步骤

- 分包：定义 webpack.dll.config.js,使用 DllPlugin 配置分包，定义 scripts 命令，执行命令，完成分包
- 排除分包：在 vue.config.js 中，使用 DllReferecePlugin 引用 mainfest 文件排除分包
- 拷贝 dll: 将 dll 拷贝至项目目录下
- 引用 dll：使用 add-asset-html-webpack-plugin 引用分包文件

#### 1. 配置分包

```javascript
// build/weback.dll.config.js
const path = require("path");
const webpack = require("webpack");
const dllPath = "../dll";

module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    vue: ["vue", "vue-router", "showdown", "better-scroll"],
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    library: "[name]_[fullhash]",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      name: "[name]_[fullhash]",
      context: process.cwd(),
    }),
  ],
};
```

接下来在`package.json`中增加打包命令

```javascript
{
  "scripts": {
    "dll": "webpack --config ./build/webpack.dll.config.js"
  },
}
```

运行`npm run dll`命令，就可以看到产生了`dll/vue-mainfetst.json`、`dll/vue.dll.js`、`vue.dll.js.LICENSE.txt.`文件

#### 2. 排除分包

接下来在`webpack.config.js`中引入 dll 文件进行使用

```javascript
// vue.config.js
const { DllReferencePlugin } = require("webpack");

module.exports = {
	configureWebpack: {
    ...
    plugins: [
      new DllReferencePlugin({
        context: __dirname,
        manifest: path.resolve(__dirname, "./dll/vue-manifest.json"),
      }),
    ]
  }
}
```

#### 3. 拷贝 dll

1. 这里我们使用一个插件`copy-webpack-plugin`

   ```shell
   npm install copy-webpack-plugin -D
   ```

2. 配置文件中引入插件

   ```javascript
   // vue.config.js
   const CopyWebpackPlugin = require("copy-webpack-plugin");
   
   module.exports = {
     configureWebpack: smp.wrap({
       plugins: [
         new CopyWebpackPlugin({
           patterns: [
             {
               from: path.resolve(__dirname, "./dll/vue.dll.js"),
               to: path.resolve(__dirname, "./dist/js/vue.dll.js"),
             },
           ],
         }),
       ]
     })
   }
   ```

3. 再次执行`npm run build`命令

#### 4. 引用 dll

1. 安装插件`add-asset-html-webpack-plugin`

   ```shell
   npm install add-asset-html-webpack-plugin -D
   ```

2. 配置文件中引入该插件

   ```javascript
   // vue.config.js
   
   // 注意这里我们需要关闭 SpeedMeasuurePlugin 插件，否则引用不成功
   const smp = new SpeedMeasuurePlugin({
     disable: true,
   });
   
   module.exports = {
     configureWebpack: smp.wrap({
       plugins: [
         ...
         new AddSsetHtmlWebpackPlugin({
           filepath: path.resolve(__dirname, "./dll/vue.dll.js"),
         }),
       ]
     })
   }
   ```

3. 其实在这里我们用`add-asset-html-webpack-plugin`引用这个`vue.dll.js`时，它会帮助我们进行拷贝到dist 目录下

4. 所以我们不需要进行 复制 dll 文件，在配置文件中删除 copy-webpack-plugin 的使用即可，整体下来配置文件 `vue.config.js`内容如下

   ```json
   var path = require("path");
   const SpeedMeasuurePlugin = require("speed-measure-webpack-plugin");
   const { DllReferencePlugin } = require("webpack");
   const smp = new SpeedMeasuurePlugin({
     disable: true,
   });
   // const CopyWebpackPlugin = require("copy-webpack-plugin");
   const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
   const AddSsetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
   module.exports = {
     parallel: false,
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
         new DllReferencePlugin({
           context: __dirname,
           manifest: path.resolve(__dirname, "./dll/vue-manifest.json"),
         }),
         // new CopyWebpackPlugin({
         //   patterns: [
         //     {
         //       from: path.resolve(__dirname, "./dll/vue.dll.js"),
         //       to: path.resolve(__dirname, "./dist/js/vue.dll.js"),
         //     },
         //   ],
         // }),
         new AddSsetHtmlWebpackPlugin({
           filepath: path.resolve(__dirname, "./dll/vue.dll.js"),
         }),
       ],
     }),
   };
   ```

5. 重新运行`npm run build`,查看`dist/index.html`，可以看到页面中引用了`dll`文件

## 06：分包文件拷贝和模板的自动引用

上述步骤已经包含此节内容

## 07：利用 webpack5 cache 特性大幅提升构建性能

## 08：image-webpack-loader 实现图片 5 倍压缩

## 09：purgecss-webpack-plugin 优化 css 体积
