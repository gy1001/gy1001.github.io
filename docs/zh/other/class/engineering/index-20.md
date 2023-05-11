# 20-抢先实战：进阶实战——Vite 接入工程化脚手架

## 01: wp2vite 移植 zbestpc 项目工程化配置

### wp2vite

一个前端项目，可以让 webpack 项目支持 vite, wp2vite 不会删除你的项目中的 webpack 的配置文件，但是会在你的项目中插入 vite 的配置文件，相较于 webpack、vite开发环境构建速度提升 80% 左右，构建生产环境能够提升 50% 左右。目前已经被 vite 官方收录

### wp2vite 使用

1. 全局安装 wp2vite

   ```bash
   npm install -g wp2vite
   ```

2. 使用方式

   ```bash
   cd yourwork/your_project // go to your project catalog
   wp2vite
   or 
   wp2vite --config=./webpack.config.js // with config file
   wp2vite -v // check wp2vite version
   npm install // install dependencies
   ```

### 项目移植

1. 先全局安装`wp2vite`

   ```bash
   npm install -g wp2vite
   ```

2. 来到`https://github.com/gy1001/Vue-Related/tree/master/imooc-build/examples/zbestpc_update`这项目下

3. 执行终端命令, 如下

   ```bash
   gaoyuan@gaoyuandeMac zbestpc_update % wp2vite -v
   wp2vite/2.0.9 darwin-x64 node-v16.16.0
   
   gaoyuan@gaoyuandeMac zbestpc_update % wp2vite --config ./build/webpack.config.js
   [wp2vite-env]:开始分析项目属性
   [wp2vite-env]:项目属性分析完成
   [wp2vite-start]:开始转换项目
   [wp2vite-start]:wp2vite 认为是*Vue3*项目
   [wp2vite-alias]:根据webpack配置文件处理alias
   [wp2vite-entry]:根据webpack的配置获取入口
   [wp2vite-entry]:入口获取完成，入口为: /src/index.js,/src/login.js
   [wp2vite-html]:将入口写入到html文件
   [wp2vite-html]:html处理完成
   [wp2vite-vite]:将import写入到vite的配置文件
   [wp2vite-vite]:将alias写入到vite的配置文件
   [wp2vite-vite]:将proxy写入到vite的配置文件
   [wp2vite-vite]:将esbuild写入到vite的配置文件
   [wp2vite-vite]:将define写入到vite的配置文件
   [wp2vite-vite]:将plugin写入到vite的配置文件
   [wp2vite-vite]:将optimizeDeps写入到vite的配置文件
   [wp2vite-vite]:将rollupOptions写入到vite的配置文件
   [wp2vite-vite]:汇总并写入到vite.config.js
   [wp2vite-pack]:依赖写入
   [wp2vite-pack]:依赖写入完成
   [wp2vite-start]:项目转换完成
   [wp2vite-todo]:npm install && npm run vite-start
   [wp2vite-todo]:前往 https://github.com/vitejs/awesome-vite 查看你可能需要的插件
   ```

4. 完成可见到，有以下文件改动

   * 新建`index.html`至根目录

     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head lang="en">
         <meta charset="utf-8" />
         <title>最家</title>
       </head>
     <body>
     <div id="app"></div>
     <script type="module" src="/src/index.js"></script><script type="module" src="/src/login.js"></script>
     </body>
     </html>
     ```

   * 新建`vite.config.js`至根目录

     ```javascript
     /* eslint-disable */
     import legacyPlugin from '@vitejs/plugin-legacy';
     import * as path from 'path';
     import vuePlugin from '@vitejs/plugin-vue';
     // @see https://cn.vitejs.dev/config/
     export default ({
       command,
       mode
     }) => {
       let rollupOptions = {};
     
     
       let optimizeDeps = {};
     
     
       let alias = {}
     
       let proxy = {}
     
       // todo 替换为原有变量
       let define = {
         'process.env.NODE_ENV': command === 'serve' ? '"development"' : '"production"',
       }
     
       let esbuild = {}
     
       return {
         base: './', // index.html文件所在位置
         root: './', // js导入的资源路径，src
         resolve: {
           alias,
         },
         define: define,
         server: {
           // 代理
           proxy,
         },
         build: {
           target: 'es2015',
           minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
           manifest: false, // 是否产出maifest.json
           sourcemap: false, // 是否产出soucemap.json
           outDir: 'build', // 产出目录
           rollupOptions,
         },
         esbuild,
         optimizeDeps,
         plugins: [
           legacyPlugin({
             targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
           }), vuePlugin(),
         ],
         css: {
           preprocessorOptions: {
             less: {
               // 支持内联 JavaScript
               javascriptEnabled: true,
             },
           },
         },
       };
     };
     ```

   * 新增加响应脚本以及依赖库，`package.json`中的变动

     ```json
     {
       "scripts": {
         ... 
       	"vite-dev": "vite",
     		"start": "vite",
     		"preview": "vite preview",
     		"vite-build": "vite build"  
       }
       "devDependencies": {
       	...
         "vite": "2",
     		"@vitejs/plugin-legacy": "^1.4.4",
     		"@vitejs/plugin-vue": "latest"
     	}
     }
     ```

5. 终端执行以下命令

   ```bash
   npm install 
   npm run vite-dev
   ```

6. 执行后，运行报错

   ```bash
   failed to load config from /Users/gaoyuan/Documents/Code/learn/MyGithub/Vue-Related/imooc-build/examples/zbestpc_update/vite.config.js
   error when starting dev server:
   TypeError: vite.createFilter is not a function
   ```

7. 报错原因：vite版本与安装的依赖版本不匹配(我本地全局安装的是 3.0，这里项目安装的是 2.0)

8. 执行以下命令

   ```bash
   npm install -D vite@^3
   ```

9. 再次运行`npm run vite-dev`就可以看到，服务正常启动了

10. 打开浏览器。报错信息如下

    ```bash
    Uncaught ReferenceError: $ is not defined
    ```

11. 我们下一节进行修复进行修复

## 02：rollup-plugin-inject解决全局变量注入

1. 安装插件，并添加配置

   ```bash
   npm install rollup-plugin-inject -S
   ```

2. 修改`vite.config.js`,添加如下配置

   ```javascript
   import inject from "rollup-plugin-inject"
   
   plugins: [
     inject({
       $: 'jquery',
       jQuery: 'jquery',
     }),
   ],
   ```

3. 配置完成后，刷新页面，发现模板文件没有渲染，但是如果修改`src/index.js`中添加打印代码，可以在控制台中实时看到
