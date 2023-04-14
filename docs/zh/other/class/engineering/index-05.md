# 05-原生 js 项目：零基础——项目工程架构升级

## 01: 原生 js 项目集成 webpack

1. 新建文件夹`zbestpc_update`

2. 执行以下命令

   ```shell
   npm init -y
   touch webpack.config.js
   mkdir src
   cd src
   touch index.js
   mkdir public
   cd public
   touch index.html
   cd ../
   npm install webpack webpack-cli -D
   ```

3. 修改文件为如下内容

   ```javascript
   // webpack.config.js
   const path = require('path')
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, './dist'),
       filename: 'bundle.js',
     },
   }

   // index.js
   console.log('hello world')
   ```

   ```html
   // index.html
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

4. 配置打包命令,修改`package.json`文件内容，添加脚本

   ```javascript
   {
     "scripts": {
       "build": "webpack build"
     },
   }
   ```

## 02: 使用 html-webpack-plugin 实现自动注入 bundle

1. 安装`html-webpack-plugin`

   ```shell
   npm install html-webpack-plugin -D
   ```

2. 修改`webpack.config.js`文件如下

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, './dist'),
       // 文件名更改
       filename: '[name].[hash].js',
     },
     // 使用插件
     plugins: [
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './public/index.html',
       }),
     ],
   }
   ```

3. 修改`public/index.html`文件，内容如下（删除引用的 js 代码，因为会自动引入）

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
   </html>
   ```

4. 复制`ZBestPC-master/index.html`内容至`public/index.html`中，并删除引用的文件代码

5. 并复制`ZBestPC-master/img`文件夹至`src/`文件夹下

6. 复制`ZBestPC-master/css`文件及至`src/`文件夹下

7. 复制`ZBestPC-master/js`文件及至`src/`文件夹下

## 03：首页 css 移植+webpack5 图片打包新特性详解

1. 在`src/index.js`中引入`css文件`

   ```javascript
   import './css/public.css'
   import './css/index.css'
   ```

2. 安装`loader`

   ```shell
   npm install style-loader css-loader -D
   ```

3. 在`webpack.config.js`中增加配置

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
   }
   ```

4. 完成后重新执行`npm run build`发现`css`已经打包为`js`文件，但是由于`css`文件中存在图片引用，所以需要对图片进行处理

5. 我们通常会使用`file-loader url-loader`来进行处理，这里我们用一个新特性[module.parser](https://www.webpackjs.com/configuration/module/#moduleparser)，增加如下配置

   ```javascript
   module.exports = {
     module: {
       rules: [
         ...{
           test: /\.(png|svg|jpg|png|jpeg|gif)$/i,
           type: 'asset',
           parser: {
             dataUrlCondition: {
               maxSize: 8 * 1024,
             },
           },
           generator: {
             filename: 'images/[name].[hash:6].[ext]', // 解决重名问题
           },
         },
       ],
     },
   }
   ```

6. 执行打包命令后，发现有错误（因为部分图片没有找到，我们可以删除或者注释相应的 css 中的引用部分）

7. 重新打包，运行`dist/index.html`至浏览器，就可以看到样式已经添加了（部分小图片已经被转换为 base64 位流），图片暂时还没有添加上

## 04： 首页 js 移植+ProvidePlugin 注入全局变量

1. 在`src/index.js`中添加`js`引用

   ```javascript
   import './js/jquery-1.12.4.min.js'
   import './js/public'
   import './js/nav'
   import './js/jquery.flexslider-min'
   ```

2. 重新打包，运行`index.html`至浏览器中，发现如下错误

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5c15812c54e41b8b3c112db5faeea20~tplv-k3u1fbpfcp-watermark.image?)

3. 安装相关依赖库

   ```shell
   pnpm install -S jquery flexslider
   ```

4. 把`public/index.html`底部 js 代码移动到`nav.js` 中, 并在顶部引入

   ```javascript
   import 'flexslider'
   ```

5. 修改配置文件如下

   ```javascript
   const webapck = require('webpack')

   module.exports = {
     plugins: [
       ...new webapck.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
       }),
     ],
   }
   ```

6. 修改 `src/index.js`内容如下

   ```javascript
   import 'jquery' // 修改为引用 jquery
   import './js/public'
   import './js/nav'
   // import './js/jquery.flexslider-min' // 删除这一行引用
   ```

7. 重新运行`npm run build`后，刷新浏览器可以看到不在报错了

8. 打开`index.html`，全局替换`img/`为`../src/img/`后，重新刷新浏览器，就可以看到页面中图片正常显示，以及轮播图正常轮播

## 05：zbestpc 项目登录页面移植

1. 拷贝`ZBestPC-master/login.html`至`src/`下, 并删除`css/js`的引用，修改`img/`为`../src/img/`

2. `index.js`中引入`login.css`

   ```javascript
   import './css/login.css'
   ```

3. `webpack.config.js`中增加配置

   ```javascript
   module.exports = {
     ...
     plugins: [
       ...
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './public/index.html',
       }),
       new HtmlWebpackPlugin({
         filename: 'login.html',
         template: './public/login.html',
       }),
     ]
   }
   ```

4. 修改`src/index.html`中的代码,更改登录跳转链接

   ```html
   <p class="fl">
     <a href="login.html" id="login">登录</a>
     <a href="#" id="reg">注册</a>
   </p>
   ```

5. 重新执行`npm run build`命令，运行`dist/index.html`，并点击登录，可以成功跳转至`login.html`页面

6. 至此，首页和登录页面移植完成
