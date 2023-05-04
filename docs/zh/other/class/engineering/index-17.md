# 17: 工程化脚手架：高阶实战——深入工程化脚手架插件机制+Vue插件开发

> 这里我们参考之前的项目：zbestpc_update 中的配置文件，进行参考改造

## 01：webpack初始配置mode开发

1. 修改`imooc-build/plugins/initPlugin/index.js`中的代码如下

   ```javascript
   module.exports = function initPlugin(api, params) {
     console.log('init plugin')
     // 增加如下内容，
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     // 获取构建模式，默认为 development
     const mode = process.env.IMOOC_BUILD_MODE || 'development'
     config.mode(mode)
     console.log("mode", config.toConfig())
   }
   ```

2. 在`imooc-build/samples/`文件夹下安装`cross-env`

   ```bash
   npm install cross-env -D
   ```

3. 修改`samples/package.json`,增加如下脚本

   ```json
   {
      "dev:env": "cross-env IMOOC_BUILD_MODE=production imooc-build start -d"
   }
   ```

4. 在`samples`文件夹下运行终端命令`npm run dev:env`，效果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b5a739c632f485abd4451d2c1703271~tplv-k3u1fbpfcp-watermark.image?)

## 02: entry 和 output 配置移植

### 设置 entry

1. 修改`lib/service/Service.js`文件，内容如下

   ```javascript
   class Service {
     async start() {
       await this.resolveConfig()
       await this.registerWebpackConfig()
       await this.registerHooks()
       await this.emitHooks(HOOK_START)
       await this.registerPlugin()
       await this.runPlugin()
       await this.initWebpack()
       // 增加如下代码
       log.verbose('webpack config', this.webpackConfig.toConfig())
     }
     
     // 先注释掉 registerWebpackConfig 方法内部代码
     registerWebpackConfig() {
       // entry: { inedx: "index.js" }
       // this.webpackConfig
       //   .entry('index')
       //   .add('src/index.js')
       //   .end()
       //   .output.path('dist')
       //   .filename('[name].bundle.js')
       // const entry = this.webpackConfig.entry('index')
       // entry.clear()
       // entry.add('src/main.js').add('src/bundle.js')
       // if (entry.has('src/main.js')) {
       //   entry.delete('src/main.js')
       // }
       // this.webpackConfig.module
       //   .rule('lint')
       //   .test('/.js$/')
       //   .include.add('src')
       //   .end()
       //   .exclude.add('node_modules')
       //   .end()
       //   .use('eslint')
       //   .loader('eslint-loader')
       //   .options({
       //     rules: {
       //       semi: 'off',
       //     },
       //   })
       // const lintRule = this.webpackConfig.module.rule('lint') // 注意这个名字和前面一致
       // lintRule.include.clear()
       // lintRule.exclude.clear()
       // lintRule.uses.clear()
       // log.verbose(
       //   'webpack config',
       //   JSON.stringify(this.webpackConfig.toConfig(), null, 2),
       // )
       // this.webpackConfig.plugin('clean').use('webpack-chain', [{ root: '/dir' }])
       // log.verbose('webpack config', this.webpackConfig.toConfig())
     }
   }
   module.exports = Service
   ```

2. 修改`imooc-build/plugins/initPlugin/index.js`，内容如下

   ```javascript
   const path = require('path')
   
   module.exports = function initPlugin(api, params) {
     console.log('init plugin')
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     const mode = process.env.IMOOC_BUILD_MODE || 'development'
     config.mode(mode)
     // 增加代码：设置默认 entry
     const dir = process.cwd()
     config.entry('index').add(path.resolve(dir, './src/index.js'))
   }
   ```

3. 修改`imooc-build/samples/plugins/imooc-build-plugin-one.js`文件，在测试实例中另增加入口文件，代码如下

   ```javascript
   const path = require('path')
   module.exports = function startPluginFirst(api, params) {
     const { getWebpackConfig } = api
     const dir = process.cwd()
     const config = getWebpackConfig()
     // 增加 login 入口文件
     config
       .entry('login')
       .add(path.resolve(dir, 'src/login.js'))
       .end()
   }
   ```

4. 至此，入口文件增加完成，运行终端命令，看下配置结果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/275c4d9783474027a4c20be090bfc438~tplv-k3u1fbpfcp-watermark.image?)

### 设置 output

1. 继续修改`imooc-build/plugins/initPlugin/index.js`，内容如下

   ```javascript
   const path = require('path')
   
   module.exports = function initPlugin(api, params) {
     console.log('init plugin')
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     const mode = process.env.IMOOC_BUILD_MODE || 'development'
     config.mode(mode)
     const dir = process.cwd()
     config.entry('index').add(path.resolve(dir, './src/index.js'))
     // 设置 output
     config.output.filename('js/[name].js').path(path.resolve(dir, './dist'))
   }
   ```

2. 重新运行终端命令，效果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b798adc1ce524cd5b9b02d78948d8419~tplv-k3u1fbpfcp-watermark.image?)

## 03: webpackloader 配置移植

### zbestpc_update 项目中的 module:rules配置如下

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|png|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'img/[name].[contenthash:6][ext]', // 解决重名问题
        },
      },
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
    ],
  },
```

### 代码移植

1. 我们在内置插件中需要配置以上`rules`,其中有依赖库，我们需要在`imooc-build`项目下安装相关依赖

   ```bash
   npm install mini-css-extract-plugin css-loader ejs-loader -D
   ```

2. 修改`imooc-build/plugins/initPlugin/index.js`内容如下

   ```javascript
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   
   module.exports = function initPlugin(api, params) {
   	...
     // 配置 module
     config.module
       .rule('css')
       .test(/\.css$/)
       .exclude.add(/node_modules/)
       .end()
       .use('min-css')
       .loader(MiniCssExtractPlugin.loader)
       .end()
       .use('css-loader')
       .loader('css-loader')
       .end()
     config.module
       .rule('asset')
       .test(/\.(png|svg|jpg|png|jpeg|gif)$/i)
       .type('asset')
       .parser({
         dataUrlCondition: {
           maxSize: 8 * 1024,
         },
       })
     config.module.rule('asset').set('generator', {
       filename: 'img/[name].[contenthash:6][ext]', // 解决重名问题
     })
     // .generator({
     //   filename: 'img/[name].[contenthash:6][ext]', // 解决重名问题
     // })
     config.module
       .rule('ejs')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.ejs$/)
       .use('ejs-loader')
       .options({
         esModule: false,
       })
   }
   ```

3. 修改`service/Service.js`中的打印信息,代码如下

   ```javascript
   class Service {
     async start() {
       ...
       log.verbose('webpack config', this.webpackConfig.toConfig().module.rules)
     }
   }
   ```

4. 重新运行终端命令，结果如下

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b8291440c93474780bfa2acb43247fc~tplv-k3u1fbpfcp-watermark.image?)

## 04：webpack plugin 配置移植

### 原项目下的配置

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webapck = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = (dirPath) => path.resolve(__dirname, dirPath)

plugins: [
    // 增加多入口模板文件
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve('../public/index-vue.html'),
    chunks: ['index'],
  }),
  new HtmlWebpackPlugin({
    filename: 'login.html',
    template: resolve('../public/index-vue.html'),
    chunks: ['login'],
  }),
  new webapck.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: resolve('../src/img'),
        to: resolve('../dist/img'),
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name][contenthash:8].css',
    chunkFilename: 'css/[name].chunk.css',
  }),
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
],
```

### 代码移植

1. 在`imooc-build`项目中安装相关依赖

   ```bash
   npm install copy-webpack-plugin html-webpack-plugin clean-webpack-plugin -D
   ```

2. 修改`imooc-build/plugins/initPlugin/index.js`内容如下

   ```javascript
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const webapck = require('webpack')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   module.exports = function initPlugin(api, params) {
     
   	// 配置 plugins
     config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
       {
         filename: 'css/[name][contenthash:8].css',
         chunkFilename: 'css/[name].chunk.css',
       },
     ])
     config.plugin('indexHtml').use(HtmlWebpackPlugin, [
       {
         filename: 'index.html',
         template: path.resolve(dir, './public/index.html'),
         chunks: ['index'],
       },
     ])
     config.plugin('loginHtml').use(HtmlWebpackPlugin, [
       {
         filename: 'login.html',
         template: path.resolve(dir, './public/index.html'),
         chunks: ['login'],
       },
     ])
     config
       .plugin('provide')
       .use(webapck.ProvidePlugin, [{ $: 'jquery', jQuery: 'jquery' }])
     config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [
       {
         patterns: [
           {
             from: path.resolve(dir, './src/img'),
             to: path.resolve(dir, './dist/img'),
           },
         ],
       },
     ])
     config.plugin('cleanWebpack').use(CleanWebpackPlugin, [])
   }
   ```

3. 修改`service/Service.js`中的打印信息,代码如下

   ```javascript
   class Service {
     async start() {
       ...
       log.verbose('webpack config plugins', this.webpackConfig.toConfig().plugins)
     }
   }
   ```

4. 重新运行终端命令，效果如下

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be742de3efe44f928bae1d661a70699e~tplv-k3u1fbpfcp-watermark.image?)

## 05：webpack optimization配置移植

### 原项目下的配置

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

optimization: {
  minimize: true, // 默认开发模式下不压缩
  usedExports: true, // treeshaking
  minimizer: [
    new UglifyJsPlugin({ sourceMap: false }),
    new CssMinimizerPlugin(),
  ],
  splitChunks: {
    chunks: 'all',
    minSize: 300 * 1024,
    name: 'common',
    automaticNameDelimiter: '_',
    cacheGroups: {
      jquery: {
        name: 'jquery',
        test: /jquery/,
        chunks: 'all',
      },
    },
  },
},
```

### 代码移植

1. 安装相关依赖

   ```bash
   npm install css-minimizer-webpack-plugin uglifyjs-webpack-plugin -D
   ```

2. 修改`imooc-build/plugins/initPlugin/index.js`内容如下

   ```javascript
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
   
   module.exports = function initPlugin(api, params) {
     
   	// 配置 optimization
     config.optimization
       .minimize(true)
       .usedExports(true)
       .splitChunks({
         chunks: 'all',
         minSize: 300 * 1024,
         name: 'common',
         automaticNameDelimiter: '_',
         cacheGroups: {
           jquery: {
             name: 'jquery',
             test: /jquery/,
             chunks: 'all',
           },
         },
       })
     config.optimization
       .minimizer('UglifyJsPlugin')
       .use(UglifyJsPlugin, [{ sourceMap: false }])
     config.optimization.minimizer('CssMinimizerPlugin').use(CssMinimizerPlugin)
   }
   ```

3. 修改`service/Service.js`中的打印信息,代码如下

   ```javascript
   class Service {
     async start() {
       ...
       log.verbose('webpack config optimization',this.webpackConfig.toConfig().optimization)
     }
   }
   ```

4. 重新运行终端命令，效果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36b604f948144a909d7f68ccac574186~tplv-k3u1fbpfcp-watermark.image?)

## 06: webpack构建逻辑开发

1. 修改`service/Service.js`，增加`startServer`方法，代码如下(并删除无关打印)

   ```javascript
   class Service {
     async start() {
       ...
       await this.startServer()
       // log.verbose( 'webpack config optimization', this.webpackConfig.toConfig().optimization )
     }
   
     async startServer() {
       let compiler
       try {
         // 这来我们可能有用到自定义的 webpack
         const selfWebapck = require(this.webpack)
         const webpackConfig = this.webpackConfig.toConfig()
         // 运行相关配置
         selfWebapck(webpackConfig, (err, stats) => {})
       } catch (error) {
         log.error('service startServer', error)
       }
     }
   }
   ```

2. 在之前的移植配置过程中，我们看到入口文件是`sample/src/public/index.html`以及相关`index.js`和`login.js`

   ```html
   // 新建 src/public/index.html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body></body>
   </html>
   ```

   ```javascript
   // samples/src/index.js
   console.log("i am index.js")
   
   // samples/src/login.js
   console.log("i am login.js")
   ```

3. 在`samples`文件夹下，运行终端，执行命令`npm run dev:noconfig`

4. 可以看到`samples`文件夹下，多产生了`dist`目录

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d23a32bfb6b41e5bcf9975ef59ad09e~tplv-k3u1fbpfcp-watermark.image?)

5. 运行`index.html`、`login.html`就可以看到相关打印信息

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45429275ed8a4707b8e2939d4d274ce5~tplv-k3u1fbpfcp-watermark.image?)

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f25480b45b5d433297aa44726eb19e75~tplv-k3u1fbpfcp-watermark.image?)

## 07：编译错误和警告逻辑处理+构建时间获取

1. 修改`service/Service.js`，代码如下

   ```javascript
   class Service {
     async startServer() {
       let compiler
       try {
         const selfWebapck = require(this.webpack)
         const webpackConfig = this.webpackConfig.toConfig()
         compiler = selfWebapck(webpackConfig, (err, stats) => {
           // 这里晚于 compiler.hooks.done.tap('compileHook' 回调执行
           if (err) {
             log.error('ERROR!', err)
           } else {
             const result = stats.toJson({
               all: false,
               errors: true,
               warnings: true,
               timings: true,
             })
             if (result.errors && result.errors.length > 0) {
               log.error('COMPILE ERROR')
               result.errors.forEach((error) => {
                 log.error('ERROR MESSAGE: ', error.message)
               })
             } else if (result.warnings && result.warnings.length > 0) {
               log.warn('COMPILE WARNING')
               result.warnings.forEach((warning) => {
                 log.warn('WARNING MESSAGE: ', warning.message)
               })
             } else {
               log.info('COMPILE SUCCESSFULLY!', 'Compile finish in ' + result.time / 1000 + 's')
             }
           }
         })
         // 这里我们可以通过钩子执行某些回调代码
         compiler.hooks.done.tap('compileHook', () => {
           console.log('done!!!')
         })
       } catch (error) {
         log.error('service startServer', error)
       }
     }
   }
   ```

2. 在`samples`文件夹下运行终端命令`npm run dev:noconfig`，可能会有报错，根据报错信息修改即可

   > 我这里遇到的问题是：src/img 文件夹找不到，我们可以把配置文件中的对这个文件夹做的处理去掉，或者新建文件夹img并需要传入一张照片

3. 再次运行，即可正常，效果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dcb54c4be8b4d30bef6f2cf411f4425~tplv-k3u1fbpfcp-watermark.image?)

## 08: 工程化脚手架处理html模板

上述配置代码中，我们在`initPlugin/index.js`代码中，增加了两个模板文件，并经过打包可以在`dist` 目录中看到，不过实际开发中应该会是默认是一个入口文件，这里就不在此做修改了。

## 09：Webpack DevServer API启动服务开发

1. 在`imooc-build`目录下安装`webpack-dev-server`

   ```bash
   npm install webpack-dev-server -D
   ```

2. 修改`service/Service.js`，增加如下代码

   ```javascript
   const WebpackDevServer = require('webpack-dev-server')
   class Service {
   	async startServer() {
       let compiler
       let devServer
       let serverConfig
       try {
         const selfWebapck = require(this.webpack)
         const webpackConfig = this.webpackConfig.toConfig()
         compiler = selfWebapck(
           webpackConfig,
           // 这里回调需要注释掉，否则就会报错：ConcurrentCompilationError: You ran Webpack twice. Each instance only supports a single concurrent compilation at a time.(原因未知，临时解决办法)
           // (err, stats) => {
           //     if (err) {
           //       log.error('ERROR!', err)
           //     } else {
           //       const result = stats.toJson({
           //         all: false,
           //         errors: true,
           //         warnings: true,
           //         timings: true,
           //       })
           //       if (result.errors && result.errors.length > 0) {
           //         log.error('COMPILE ERROR')
           //         result.errors.forEach((error) => {
           //           log.error('ERROR MESSAGE: ', error.message)
           //         })
           //       } else if (result.warnings && result.warnings.length > 0) {
           //         log.warn('COMPILE WARNING')
           //         result.warnings.forEach((warning) => {
           //           log.warn('WARNING MESSAGE: ', warning.message)
           //         })
           //       } else {
           //         log.info(
           //           'COMPILE SUCCESSFULLY!',
           //           'Compile finish in ' + result.time / 1000 + 's',
           //         )
           //       }
           //     }
           // }
         )
         compiler.hooks.done.tap('compileHook', () => {
           console.log('done!!!')
         })
         serverConfig = {
           port: this.args.port || 9002,
           host: this.args.host || '0.0.0.0',
           https: this.args.https || false,
           open: true,
         }
         devServer = new WebpackDevServer(serverConfig, compiler)
         devServer.startCallback((err) => {
           if (err) {
             log.error('WEBPACK-DEV-SERVER ERROR!!!')
             log.error('ERROR MESSAGE', err.toString())
           } else {
             log.info('WEBPACK-DEV-SERVER LANCH SUCCESSFULLY')
           }
         })
       } catch (error) {
         log.error('service startServer', error)
       }
     }
   }
   ```

3. 在`samples`文件夹下运行终端命令，会自动打开浏览器，以及终端打印效果如下

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/226e9a936be14d91b5d7552a5c590b1a~tplv-k3u1fbpfcp-watermark.image?)

## 10: 文件修改监听+dev和build模式插件分离

### 文件监听

1. 修改`initPlugin/index.js`文件，添加`watch`处理函数

   ```javascript
   module.exports = function initPlugin(api, params) {	
     ...
     // 配置监听函数
     config.watch(true)
   }
   ```

2. 在`samples`运行终端命令，浏览器打开页面

3. 修改`samples/src/index.js`,随意修改内容，可以看到终端中会重新编译，浏览器中也会重新渲染更新

4. 如果此时我们新建`src/utils.js`,内容如下

   ```javascript
   export function utils() {
     console.log('utils')
   }
   
   ```

5. 修改`samples/src/index.js`，并引入`utils.js`

   ```javascript
   import { utils } from './utils'
   console.log('i am index.js')
   utils()
   ```

6. 此时，终端和浏览器中均会重新渲染更新

### dev+build模式插件分离

1. 我们在`imooc-build/plugins/initPlugin`下新建`dev`和`build.js`,内容可以复制`initPlugin/index.js`内容，然后做部分删减修改

2. 接着修改`service/Service.js`，修改如下

   ```javascript
   // const InitPlugin = require('../../plugins/initPlugin/index')
   const InitDevPlugin = require('../../plugins/initPlugin/dev')
   const InitBuildPlugin = require('../../plugins/initPlugin/build')
   
   class Service {
     // 增加 cmd 参数，用来区分是 dev 还是 build，以便于区分使用哪个模式
     constructor(cmd, opts) {
       this.cmd = cmd || "start"
     }
     
     async registerPlugin() {
       let { plugins } = this.config
       // 这里做判断，使用哪个插件文件
       const buildInPlugins = this.cmd === 'start' ? [InitDevPlugin] : [InitBuildPlugin]
     }
   }
   ```

3. 修改`imooc-build/lib/start/devService.js`文件，修改内容如下

   ```javascript
   // 实例化时候，传入参数 start
   const service = new Service("start", args)
   service.start()
   ```

## 11: zbest-pc项目工程化脚手架移植

### imooc-build 项目涉及的改动

1. 修改`service/Service.js`中的错误提示

   ```javascript
   // console.log('配置文件不存在，终止执行')
   // 改为如下
   log.error('配置文件不存在，终止执行')
   ```

2. `initPlugin/dev.js`和`initPlugin/build.js`文件中，分别删除不需要预置的插件

   ```javascript
   // const CopyWebpackPlugin = require('copy-webpack-plugin')
   /*
   config.module
       .rule('ejs')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.ejs$/)
       .use('ejs-loader')
       .options({
         esModule: false,
       })
   */
   
   // config.plugin('indexHtml').use(HtmlWebpackPlugin, [])
   // 修改为
   config.plugin('index').use(HtmlWebpackPlugin, [])
   
   /*
    	config.module
       .rule('ejs')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.ejs$/)
       .use('ejs-loader')
       .options({
         esModule: false,
       })
   	config.plugin('loginHtml').use(HtmlWebpackPlugin, [
       {
         filename: 'login.html',
         template: path.resolve(dir, './public/index.html'),
         chunks: ['login'],
       },
     ])
     config
       .plugin('provide')
       .use(webapck.ProvidePlugin, [{ $: 'jquery', jQuery: 'jquery' }])
     config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [
       {
         patterns: [
           {
             from: path.resolve(dir, './src/img'),
             to: path.resolve(dir, './dist/img'),
           },
         ],
       },
     ])
   */
   ```

### zbest-pc 项目改造

1. 在`zbestpc-update`项目中新建脚本命令,修改`package.json`

   ```javascript
   {
     "scripts": {
       "start:imooc": "imooc-build start --debug"
     }
   }
   ```

2. 运行终端命令提示：**配置文件不存在**

3. 新建配置文件`zbestpc_update/imooc-build.config.json`，内容如下

   ```json
   {
     "plugins": [ "./plugins/zbestpc-plugin.js" ]
   }
   ```

4. 新建`zbestpc_update/plugins/zbestpc-plugin.js`文件，内容如下

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const webapck = require('webpack')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   
   module.exports = function (api, params) {
     console.log('this is zbest-pc plugin')
     const config = api.getWebpackConfig()
     const dir = process.cwd()
     config.entry('login').add(path.resolve(dir, './src/login.js'))
   
     config.plugin('login').use(HtmlWebpackPlugin, [
       {
         filename: 'login.html',
         template: path.resolve(dir, './public/login.html'),
         chunks: ['login'],
       },
     ])
   
     config.module
       .rule('ejs')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.ejs$/)
       .use('ejs-loader')
       .options({
         esModule: false,
       })
   
     config
       .plugin('provide')
       .use(webapck.ProvidePlugin, [{ $: 'jquery', jQuery: 'jquery' }])
   
     config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [
       {
         patterns: [
           {
             from: path.resolve(dir, './src/img'),
             to: path.resolve(dir, './dist/img'),
           },
         ],
       },
     ])
   }
   ```

5. 在`zbestpc_update`重新运行终端命令`npm run start:imooc`,可以看到正常运行，以及打开的页面正常跳转

## 12：zbest-pc 项目 HtmlWebpackPlugin

目前`imooc-build`项目中的默认模板配置如下

```javascript
config.plugin('index').use(HtmlWebpackPlugin, [
  {
    filename: 'index.html',
    template: path.resolve(dir, './public/index.html'),
    chunks: ['index'],
  },
])
```

如果存在模板路径不一致，你可以在项目配置文件中进行修改覆盖

## 13：vue3项目工程化插件开发

1. 在`zbest-pc`项目中新建脚本文件

   ```javascript
   {
     "scripts": {
       "start:imooc-vue": "imooc-build start --config imooc-build.vue.config.json --debug"
     }
   }
   ```

2. 新建`imooc-build.vue.config.json`，文件内容如下

   ```javascript
   {
     "plugins": [ "./plugins/zbestpc-vue-plugin.js" ]
   }
   ```

3. 新建`plugins/zbestpc-vue-plugin.js`文件，内容如下

   ```javascript
   const path = require('path')
   const dir = process.cwd()
   const webpack = require('webpack')
   const { VueLoaderPlugin } = require('vue-loader')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = function (api, params) {
     console.log('i am a vue plugin')
     // 配置内容有所修改
     const config = api.getWebpackConfig()
     config.entry('index').clear().add(path.resolve(dir, './src/main.js'))
     config.entry('login').add(path.resolve(dir, './src/login.js'))
     config.plugin('index').use(HtmlWebpackPlugin, [
       {
         filename: 'index.html',
         template: path.resolve(dir, './public/index-vue.html'),
         chunks: ['index'],
       },
     ])
     config.module
       .rule('ejs')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.ejs$/)
       .use('ejs-loader')
       .options({
         esModule: false,
       })
     config.module
       .rule('vue')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.vue$/)
       .use('vue-loader')
       .loader('vue-loader')
   
     config
       .plugin('provide')
       .use(webpack.ProvidePlugin, [{ $: 'jquery', jQuery: 'jquery' }])
   
     config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [
       {
         patterns: [
           {
             from: path.resolve(dir, './src/img'),
             to: path.resolve(dir, './dist/img'),
           },
         ],
       },
     ])
   
     config.plugin('VueLoaderPlugin').use(VueLoaderPlugin)
     config.devServer
       .compress(true)
       .proxy({
         '/': {
           target: 'http://localhost:8080',
           // 只需要添加该方法，然后当请求的是html，则重定向到index.html
           bypass: function (req, res, proxyOptions) {
             if (req.headers.accept.indexOf('html') !== -1) {
               console.log('Skipping proxy for browser request.')
               return '/index.html'
             }
           },
         },
       })
       .set('static', { directory: path.resolve(dir, './dist') })
   }
   ```

4. 这里我们配置了`devServer`，所以要修改`service/Service.js`中的代码

5. 修改`service/Service.js`中的代码，如下

   ```javascript
   serverConfig = {
     port: this.args.port || 9002,
     host: this.args.host || '0.0.0.0',
     https: this.args.https || false,
     // 增加这一行代码，把插件中可能存在的更改应用到我们启动的 webpackDevServer 中
     ...webpackConfig.devServer,
   }
   devServer = new WebpackDevServer(serverConfig, compiler)
   
   ```

## 14：通用vue插件开发和npm发布

1. 新建文件夹`imooc-build-vue-plugin`文件夹，并运行终端

   ```bash
   npm init -y
   ```

2. 把原项目中相关`vue`配置的代码移动到这里文件夹下的`index.js`

   ```javascript
   const { VueLoaderPlugin } = require('vue-loader')
   
   module.exports = function (api, params) {
     const config = api.getWebpackConfig()
     config.module
       .rule('vue')
       .exclude.add(/node_modules/)
       .end()
       .test(/\.vue$/)
       .use('vue-loader')
       .loader('vue-loader')
     config.plugin('VueLoaderPlugin').use(VueLoaderPlugin)
   }
   ```

3. 安装相关依赖

   ```bash
   npm install vue-loader -S
   ```

4. 这里我们需要发布到`npm`上，这里步骤就不在赘述

5. 假设我们已经发步`imooc-build-vue-plugin`库至`npm`服务上

6. 我们在`imooc-build/examples/zbestpc_update`文件夹下运行终端，安装这个依赖

   ```bash
   npm install imooc-build-vue-plugin -D
   ```

7. 然后修改`zbestpc_update/imooc-build.vue.config.json`文件，引入插件，内容如下

   ```json
   {
     "plugins": [
       "imooc-build-vue-plugin",
       "./plugins/imooc-build-vue-plugin.js"
     ]
   }
   ```

   
