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
const path = require('path')
const webpack = require('webpack')
const dllPath = '../dll'

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vue: ['vue', 'vue-router', 'showdown', 'better-scroll'],
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    library: '[name]_[fullhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]_[fullhash]',
      context: process.cwd(),
    }),
  ],
}
```

这里需要安装`webpack webpack-cli`

```shell
npm install webpack webpack-cli -D
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
   const CopyWebpackPlugin = require('copy-webpack-plugin')

   module.exports = {
     configureWebpack: smp.wrap({
       plugins: [
         new CopyWebpackPlugin({
           patterns: [
             {
               from: path.resolve(__dirname, './dll/vue.dll.js'),
               to: path.resolve(__dirname, './dist/js/vue.dll.js'),
             },
           ],
         }),
       ],
     }),
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

   const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
   // 注意这里我们需要关闭 SpeedMeasuurePlugin 插件，否则引用不成功
   const smp = new SpeedMeasuurePlugin({
     disable: true,
   })

   module.exports = {
     configureWebpack: smp.wrap({
       plugins: [
         ...new AddAssetHtmlWebpackPlugin({
           filepath: path.resolve(__dirname, './dll/vue.dll.js'),
         }),
       ],
     }),
   }
   ```

3. 其实在这里我们用`add-asset-html-webpack-plugin`引用这个`vue.dll.js`时，它会帮助我们进行拷贝到 dist 目录下

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
   const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
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
         new AddAssetHtmlWebpackPlugin({
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

### 利用缓存提升二次构建速度

cache 默认在 node_modules/.cache/terser-plugin 文件下，通过 SHA 或者 base64 编码之前的文件处理结果，并保存文件映射关系，方便下一次处理文件时可以查看之前同文件（同内容）是否有可用缓存，默认存放在内存中，可以修改将缓存存放在硬盘中

背景：webpack4 在运行时是有缓存的，只不过缓存只存在于内存中。所以，一旦 webpack 的运行程序被关闭，这些缓存就丢失了。这就导致我们 npm run start/build 的时候根本无缓存可用，而在 webpack5 中，cache 配置了除了原本的 true 和 false 外，还增加了许多自配置项。可以将缓存文件存储在硬盘中

- type: 缓存类型。值为 memory 或者 filesystem, 分别代表基于内存的临时缓存，以及基于文件系统的持久化缓存。在选择 filesystem 的情况下，下面介绍的其他属性生效

- cacheDirectory: 缓存目录。默认目录为 node_modules/.cache/webpack

- name: 缓存名称。同时也是 cacheDirectory 中的子目录命名，默认值为 webpack 的 ${config.name}-${config.mode} 比如：default-production

- cacheLocation: 缓存真正的存放地址。默认使用的是上述两个属性的组合：

  path.resolve(cache.cacheDirectory, cache.name) 该属性在赋值情况下将忽略上面的 cacheDirectory 和 name 属性

```javascript
// vue.config.js
module.exports = {
  configureWebpack: smp.wrap({
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, './node_modules/.temp_cache'),
    },
  }),
}
```

[Cache 官方文档: https://webpack.docschina.org/configuration/cache/#root](https://webpack.docschina.org/configuration/cache/#root)

## 08：image-webpack-loader 实现图片 5 倍压缩

### 减少构建目标

背景：当我们使用 loader 对项目进行编译的使用，webpack 是对我们整个项目进行处理的，这里也包括 node_modules 中的文件，这样会增加我们构建项目所消耗的时间，有没有办法可以跳过 node_modules 文件的处理呢，其实这个是有的，module/rules 中的 test、include、exclude 都是针对处理当前的 rule 的 loader 做范围限制的，loader 会针对依赖图中的所有 modules 进行匹配逻辑，如果匹配了，则用当前 loader 进行处理。在使用 loader 时可以通过 test、include、exclude 三个配置项来命中 Loader 要应用规则的文件，为了尽可能少的让文件被 Loader 处理，可以通过 include 去命中只有哪些文件需要被整理

- exclude: 指定要排除的文件
- inclue: 指定要包含的文件
- exclude 优先级高于 include,在 include 和 exclude 中使用绝对路径数组，尽量避免 exclude,而更倾向于使用 include
- 使用 include 和 exclude 指定需要处理的文件，忽略不需要处理的文件

```javascript
{
   module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|svg|webp)$/i,
          exclude: /node_modules/,
          loader: "xxx",
        },
      ],
    },
}
```

### 图片压缩

背景：vue-cli 中已经默认帮我们做了很多优化处理，包括静态资源输出、样式处理、代码分割等等，我们需要自己手动配置的事情更少了，而图片压缩处理就是其中的一件，vue 项目中的图片文件过大，会导致打包体积增大，需要将大文件的图片进行压缩从而缩小打包体积。

#### image-webpack-loader（已不更新）

[image-webpack-loader 已归档不再更新:https://github.com/tcoopman/image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)

注意：安装 image-webpack-loader 之后打包的项目可能会遇到 Cannot find module image-gifsicle 报错，需要在 package.json 中 增加 image-gifsicle 然后在 node_modules 中删除 image-webpack-loader 后重新安装 cnpm install image-webpack-loader

参考文档：[https://blog.csdn.net/weixin_57605398/article/details/121944815](https://blog.csdn.net/weixin_57605398/article/details/121944815)

```javascript
npm install image-webpack-loader -D

// vue.config.js
module.exports = {
 configureWebpack: smp.wrap({
   module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
 })
}
```

运行`npm run build`,新版本中的运行保如下错误

```shell
 Failed to compile with 1 error                                  13:53:35

 error  in ./src/images/activity.png

Syntax Error: Error


 ERROR  HookWebpackError: Cannot read properties of undefined (reading 'toString')
HookWebpackError: Cannot read properties of undefined (reading 'toString')
    at /Users/gaoyuan/Downloads/vue2-elm-master/node_modules/.store/webpack@5.79.0/node_modules/webpack/lib/HookWebpackError.js:65:13
    at eval (eval at create (/Users/gaoyuan/Downloads/vue2-elm-master/node_modules/.store/tapable@2.2.1/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:38:1)
-- inner error --
TypeError: Cannot read properties of undefined (reading 'toString')
    at /Users/gaoyuan/Downloads/vue2-elm-master/node_modules/.store/webpack@5.79.0/node_modules/webpack/lib/cache/PackFileCacheStrategy.js:1217:53
    at async Promise.all (index 62)
```

暂时没有找到解决方案

#### 目前推荐使用：image-minimizer-webpack-plugin

[建议使用 ImageMinimizerWebpackPlugin:https://www.webpackjs.com/plugins/image-minimizer-webpack-plugin/](https://www.webpackjs.com/plugins/image-minimizer-webpack-plugin/)

```shell
npm install image-minimizer-webpack-plugin imagemin --save-dev
```

官方文档：图片有两种压缩方式

1. [Lossless](https://en.wikipedia.org/wiki/Lossless_compression) (without loss of quality).
2. [Lossy](https://en.wikipedia.org/wiki/Lossy_compression) (with loss of quality).

**Recommended imagemin plugins for lossless optimization**

```shell
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

**Recommended imagemin plugins for lossy optimization**

```shell
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

```javascript
// vue.config.js
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
module.exports = {
  configureWebpack: smp.wrap({
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: 'asset',
        },
      ],
    },
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: 'http://www.w3.org/2000/svg' },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
    },
  }),
}
```

重新运行`npm run build`可以最终看到`dist`目录下, `activity.xxx.png`由最开始的 300 多 k 减少为 181kb 左右

## 09：purgecss-webpack-plugin 优化 css 体积

[purgecss-webpack-plugin:https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin](https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin)

背景：一个项目经过长期的迭代更新，可能会产生一些无用的 css 样式更新，如果将这些无用的样式文件进行打包会增加项目体积，如果使用人工删除的方式会增加工作量，css 能不能像 js 那样通过 tree shaking 的方式将没有使用到的样式文件进行删除呢？purgecss-webpack-plugin 就是帮我们把项目中一些没有使用过的代码删除，减少项目体积的插件

```javascript
npm install purgecss-webpack-plugin glob -D

const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");
const PATHS = {
  src: path.join(__dirname, "src"),
};
// vue.config.js
module.exports = {
  configureWebpack: smp.wrap({
    plugins: [
      ...
      new PurgeCSSPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
    ]
  })
}
```

重新打包`npm run build`可以看到 css 文件夹使用插件之前为 309k 左右，使用插件后，内部多了一些`xxx.css.map`，其他的`css`文件总大小为 12kb 左右
