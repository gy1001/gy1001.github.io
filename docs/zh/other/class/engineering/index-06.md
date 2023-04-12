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
