# 07-【加餐】原生 JS 项目 Vue 进阶改造

## 01：webpack 多配置文件改造

1. 新建`build`文件夹，并把`webpack.config.js`文件移动至此文件夹中（文件中的配置路径需要更改）

   ```javascript
   // build/webpack.config.js
   const path = require('path')
   const webapck = require('webpack')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const resolve = (dirPath) => path.resolve(__dirname, dirPath)

   module.exports = {
     mode: 'development',
     entry: {
       index: resolve('../src/index.js'),
       login: resolve('../src/login.js'),
     },
     output: {
       path: resolve('../dist'),
       filename: 'js/[name].[contenthash].js',
     },
     plugins: [
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: resolve('../public/index.html'),
         chunks: ['index'],
       }),
       new HtmlWebpackPlugin({
         filename: 'login.html',
         template: resolve('../public/login.html'),
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
         filename: 'css/[name].[contenthash:8].css',
         chunkFilename: 'css/[name].chunk.css',
       }),
       new CleanWebpackPlugin(),
     ],
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
           // use: ['ejs-loader'],
           // options: {
           //   esModule: false,
           // },
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
             filename: 'images/[name].[contenthash:6].[ext]', // 解决重名问题
           },
         },
       ],
     },
     devServer: {
       static: {
         directory: resolve('../dist'),
       },
       compress: true,
       port: 9000,
       hot: true,
     },
     optimization: {
       minimize: true, // 默认开发模式下不压缩
       minimizer: [
         new UglifyJsPlugin({ sourceMap: true }),
         new CssMinimizerPlugin(),
       ],
       splitChunks: {
         chunks: 'all',
         minSize: 300 * 1024,
         name: 'common',
         cacheGroups: {
           jquery: {
             name: 'jquery',
             test: /jquery/,
             chunks: 'all',
           },
         },
       },
     },
   }
   ```

2. 重新运行打包`npm run build`，运行`index.html`至浏览器，可以正常运行显示

## 02：完成 Vue 项目构建前的准备工作

1. 安装相关依赖

   ```shell
   npm install vue -S
   npm install -D @vue/compiler-sfc vue-template-compiler vue-loader -D
   ```

## 03: 编写 Vue 项目构建配置文件

1. 新建`build/webpack.vue.config.js`，内容如下

   ```javascript
   const path = require('path')
   const webapck = require('webpack')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const resolve = (dirPath) => path.resolve(__dirname, dirPath)
   // 对于 vue-loader 需要结合它的插件一起使用
   const { VueLoaderPlugin } = require('vue-loader')
   const config = {
     mode: 'development',
     // 入口文件修改为 main.js
     entry: resolve('../src/main.js'),
     output: {
       filename: 'js/[name].js',
       path: resolve('../dist'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: resolve('../public/index-vue.html'), // 模板改为 index-vue.html
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
         filename: 'css/[name].[contenthash:8].css',
         chunkFilename: 'css/[name].chunk.css',
       }),
       new CleanWebpackPlugin(),
       new VueLoaderPlugin(),
     ],
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
         {
           test: /\.vue$/,
           use: ['vue-loader'],
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
             filename: 'images/[name].[contenthash:6].[ext]', // 解决重名问题
           },
         },
       ],
     },
     devServer: {
       static: {
         directory: resolve('../dist'),
       },
       compress: true,
       port: 9000,
       hot: true,
     },
     optimization: {
       minimize: false,
       minimizer: [
         new UglifyJsPlugin({ sourceMap: true }), // 在本地运行时候需要把此处设置为 false,否则会报错
         new CssMinimizerPlugin(),
       ],
       splitChunks: {
         chunks: 'all',
         minSize: 300 * 1024,
         name: 'common',
         cacheGroups: {
           jquery: {
             name: 'jquery',
             test: /jquery/,
             chunks: 'all',
           },
         },
       },
     },
   }

   module.exports = config
   ```

2. 新建`src/main.js`、`src/App.vue`等，内容如下

   ```javascript
   // src/main.js
   import { createApp } from 'vue'
   import App from './App.vue'
   
   createApp(App).mount('#app')


   // src/App.vue
   <template>
     <div id="app">{{ msg }}</div>
   </template>
   <script>
   export default {
     data() {
       return {
         msg: 'hello world',
       }
     },
   }
   </script>

   <style scoped></style>
   ```

3. 新建`public/index-vue.html`文件，内容如下

   ```html
   <!DOCTYPE html>
   <html>
     <head lang="en">
       <meta charset="utf-8" />
       <title>最家</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
   </html>
   ```

4. 增加脚本命令，`packages.json`中添加如下脚本

   ```javascript
   {
     "scripts": {
       "build": "webpack build --config ./build/webpack.config.js",
       "dev": "webpack-dev-server --config ./build/webpack.config.js",
        // 添加如下脚本
       "dev:vue": "webpack-dev-server --config ./build/webpack.vue.config.js",
       "build:vue": "webpack build --config ./build/webpack.vue.config.js"
     },
   }
   ```

5. 执行`npm run build:vue`，发现可以正常打包，然后运行至浏览器，`dom结构`也正常渲染

6. 执行`npm run dev:vue`，打开`http://localhost:9000/`也可以正常渲染

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e671975f43a94f87a927345bd5729441~tplv-k3u1fbpfcp-watermark.image?)

## 04：首页和登录页面移植到 Vue 框架

1. 新建`src/Home.vue`文件，把`ZBestPC-master/index.html`中`body部分`代码进行拷贝,并删除`js引用`部分,以及引入`src/index.js`中的`css、js`引用代码

   ```vue
   <template>
     <div>ZBestPC-master/index.html`中`body部分</div>
   </template>
   
   <script>
   import './css/public.css'
   import './css/index.css'
   
   import 'jquery'
   import './js/public'
   import './js/nav'
   
   export default {}
   </script>
   
   <style scoped></style>
   ```

2. 修改`App.vue`，引用`Home.vue`组件

   ```vue
   <template>
     <HomeVue></HomeVue>
   </template>
   <script>
   import HomeVue from './Home.vue'
   export default {
     components: {
       HomeVue,
     },
     data() {
       return {}
     },
   }
   </script>
   
   <style scoped></style>
   ```

3. 运行`npm run dev:vue`,打开`http://localhost:9000/`可以看到页面正常渲染

4. 接下里，由于我们涉及到路由跳转，所以增加`vue-router`插件

   ```shell
   npm install vue-router -S
   ```

5. 新建`src/router.js`，内容如下（这里我们暂时使用 `hashHistory` 模式）

   ```javascript
   import { createRouter, createWebHashHistory } from 'vue-router'
   import Home from './Home.vue'
   import Login from './Login.vue'
   
   const routes = [
     { path: '/', redirect: '/home' },
     { path: '/home', component: Home },
     { path: '/login', component: Login },
   ]
   
   const router = createRouter({
     history: createWebHashHistory(),
     routes, // `routes: routes` 的缩写
   })
   
   export default router
   ```

6. 接着，新建`src/login.vue`

   ```vue
   <template>
     <div class="login">
       <form action="#" method="post">
         <h1>
           <a><img src="img/temp/logo.png" /></a>
         </h1>
         <p></p>
         <div class="msg-warn hide">
           <b></b>公共场所不建议自动登录，以防账号丢失
         </div>
         <p>
           <input type="text" name="" value="" placeholder="昵称/邮箱/手机号" />
         </p>
         <p><input type="text" name="" value="" placeholder="密码" /></p>
         <p><input type="submit" name="" value="登  录" /></p>
         <p class="txt">
           <a class="" href="reg.html">免费注册</a>
           <a href="forget.html">忘记密码？</a>
         </p>
       </form>
     </div>
   </template>
   
   <script>
   // 引入 样式
   import './css/public.css'
   import './css/login.css'
   export default {}
   </script>
   
   <style scoped></style>
   ```

7. 这里我们要修改`App.vue`，如下

   ```vue
   <template>
     // 修改为 router-view 内置组件
     <router-view></router-view> 
   </template>
   <script>
   export default {
     data() {
       return {}
     },
   }
   </script>
   
   <style scoped></style
   ```

8. 修改首页中的登录方法

   ```vue
   <template>
       <a @click="toLogin" id="login">登录</a>
   </template>
   <script>
   import './css/public.css'
   import './css/index.css'
   
   import 'jquery'
   import './js/public'
   import './js/nav'
   
   export default {
     methods: {
       // 增加 点击登录调用方法，去登录界面
       toLogin() {
         this.$router.push('/login')
       },
     },
   }
   </script>
   ```

9. 运行`npm run dev:vue`，打开`http://localhost:9000/`首页正常显示，点击登录跳转登录页面，也正常显示

### 使用 history 模式

1. 我们修改`router.js`中为`createWebHashHistory`

   ```javascript
   import { createRouter, createWebHashHistory } from 'vue-router'
   import Home from './Home.vue'
   import Login from './Login.vue'
   
   const routes = [
     { path: '/', redirect: '/home' },
     { path: '/home', component: Home },
     { path: '/login', component: Login },
   ]
   
   const router = createRouter({
     history: createWebHashHistory(),
     routes, 
   })
   export default router
   ```

2. 运行`npm run dev:vue`，打开`http://localhost:9000/`首页正常显示，点击登录跳转登录页面，也正常显示

3. 但是在登录`http://localhost:9000/login`时候，刷新页面就会报错`error`

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4828bf0344bb4b898754e7e9ea7a4ac4~tplv-k3u1fbpfcp-watermark.image?)

4. 此时我们需要修改`devserver`中的配置`webpack.vue.config.js`[具体参考webpack-devserver文档](https://webpack.docschina.org/configuration/dev-server/)

   ```javascript
   module.exports = {
     devServer: {
       proxy: {
         '/': {
           target: 'http://localhost:9000',
           // 只需要添加该方法，然后当请求的是html，则重定向到index.html
           bypass: function (req, res, proxyOptions) {
             if (req.headers.accept.indexOf('html') !== -1) {
               console.log('Skipping proxy for browser request.')
               return '/index.html'
             }
           },
         },
       },
     }
   }
   ```

5. 修改了配置文件，重新执行`npm run dev:vue`，打开`http://localhost:9000/`首页正常显示，点击登录跳转登录页面，然后刷新页面也正常显示

6. 另外，登录界面目前没有显示图片，经过排查是因为我们在`index-vue.html`少了一段样式,加入即可

   ```html
   <style>
     body,
     #app {
       width: 100%;
       height: 100%;
     }
   </style>
   ```

## 05：Vue MPA 应用移植和工程问题解决

目前我们的页面是单页面，打包后只有一个`index.html`，对seo 不是很友好，所以我们接下来进行`MPA`应用的一个开发

1. 复制一份`webpack.vue.config.js`为`webpack.vue.mpa.config.js`（注意：`entry` 是多入口，以及 `plugins` 中模板也需要多个）

   ```javascript
   const path = require('path')
   const webapck = require('webpack')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const resolve = (dirPath) => path.resolve(__dirname, dirPath)
   const { VueLoaderPlugin } = require('vue-loader')
   const config = {
     mode: 'development',
     entry: {
       // 增加多入口文件
       home: resolve('../src/mpa/home.js'),
       login: resolve('../src/mpa/login.js'),
     },
     output: {
       filename: 'js/[name].js',
       path: resolve('../dist'),
     },
     plugins: [
       // 增加多入口模板文件
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: resolve('../public/index-vue.html'),
         chunks: ['home'],
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
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
         {
           test: /\.vue$/,
           use: ['vue-loader'],
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
       ],
     },
     devServer: {
       static: {
         directory: resolve('../dist'),
       },
       compress: true,
       port: 9000,
       hot: true,
       proxy: {
         '/': {
           target: 'http://localhost:9000',
           // 只需要添加该方法，然后当请求的是html，则重定向到index.html
           bypass: function (req, res, proxyOptions) {
             if (req.headers.accept.indexOf('html') !== -1) {
               console.log('Skipping proxy for browser request.')
               return '/index.html'
             }
           },
         },
       },
     },
     optimization: {
       minimize: true, // 默认开发模式下不压缩
       minimizer: [
         new UglifyJsPlugin({ sourceMap: false }),
         new CssMinimizerPlugin(),
       ],
       splitChunks: {
         chunks: 'all',
         minSize: 300 * 1024,
         name: 'common',
         cacheGroups: {
           jquery: {
             name: 'jquery',
             test: /jquery/,
             chunks: 'all',
           },
         },
       },
     },
   }
   
   module.exports = config
   ```

2. 新增加`src/mpa/home.js`、`src/map/login.js`

   ```javascript
   // src/mpa/home.js
   import { createApp } from 'vue'
   import Home from '../Home.vue'
   createApp(Home).mount('#app')
   
   // src/mpa.login.js
   import { createApp } from 'vue'
   import Login from '../Login.vue'
   createApp(Login).mount('#app')
   ```

3. 增加配置`package.json`中的脚本命令

   ```json
   {
     "scripts": {
       "dev:vueMpa": "webpack-dev-server --config ./build/webpack.vue.mpa.config.js",
       "build:vueMpa": "webpack build --config ./build/webpack.vue.mpa.config.js"
     },
   }
   ```

4. 修改`src/Home.vue`中的登录跳转逻辑

   ```html
   <!-- <a @click="toLogin" id="login">登录</a> -->
   <a href="login.html" id="login">登录</a>
   ```

5. 重新运行`npm run dev:vueMap`命令，打开`http://localhost:9000/`首页正常显示，点击登录跳转登录页面

6. 重新运行`npm run build:vueMap`命令，打开`dist/index.html`，中可以到页面正常渲染，点击登录按钮，正常跳转显示

## 06：Vue2 升级 Vue3 原理讲解+构建脚本升级

## 07：Vue2 升级 Vue3 源码改造
