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

4. 注意安装时候提示

   ```shell
   $ pnpm install rollup-plugin-inject -S
    WARN  deprecated rollup-plugin-inject@3.0.2: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-inject.
   ```

5. 这里我们执行以下命令

   ```bash
   npm uninstall rollup-plugin-inject
   npm install @rollup/plugin-inject -S
   ```

6. 修改`vite.config.js`，修改如下

   ```javascript
   // import inject from "rollup-plugin-inject"
   import inject from "@rollup/plugin-inject"
   plugins: [
     inject({
       $: 'jquery',
       jQuery: 'jquery',
     }),
   ],
   ```

7. 配置完成后，刷新页面，发现模板文件没有渲染，但是如果修改`src/index.js`中添加打印代码，可以在控制台中实时看到

## 03：模板文件编译和注入

1. 添加模板插件

   ```bash
   npm install vite-plugin-html -D
   ```

2. 修改`vite.config.js` ,引入插件

   ```javascript
   import { createHtmlPlugin } from 'vite-plugin-html'
   
   plugins: [
     createHtmlPlugin({
       entry: './src/index.js',
       filname: 'index.html',
       template: 'index-vite.html',
     }),
   ],
   ```

3. 根目录下新建`index-vite.html`,把`public/index.html`文件内容拷贝进来，并导入相应`index.js`

   ```html
   <script type="module" src="/src/index.js"></script>
   ```

4. 项目中如果使用 ejs ，我们先把 ejs 中的模板拷贝进来，后续抽离为一个组件

5. 目前运行终端，页面中显示了，但是图片都没有显示，可以修改一下图片地址，`img/`改为`../src/img/`,然后图片就可以正常显示了

6. 执行`npm run vite-build`时候报错，

   ```shell
   Error: Missing "./legacy-polyfills" export in "vite" package
   ```

   

6. 推测是版本依赖不一致,执行以下命令

   ```bash
   npm uninstall @vitejs/plugin-legacy
   npm install @vitejs/plugin-legacy -D
   ```

7. 修改`vite.config.js`中的打包输出路径

   ```javascript
   {
     build: {
       outDir: 'dist', // 产出目录
     }
   }
   ```

8. 重新运行`npm run vite-build`发现打包成功

## 04：vite+vue3项目移植

## 05：工程化脚手架 build 命令开发

1. 修改`imooc-build/lib/build/buildServer.js`中的代码，修改如下

   ```javascript
   const Service = require('../service/Service')
   module.exports = async function build(arg, opts, cmd) {
     const args = {
       customWebpackPath: arg.customWebpackPath || '',
       stopServer: !!arg.stopServer,
     }
     process.env.NODE_ENV = 'production'
     const service = new Service('build', args)
     service.build()
   }
   ```

2. 修改`service/Service.js`，增加如下代码

   ```javascript
   class Service {
     
     async build() {
       await this.resolveConfig()
       await this.registerWebpackConfig()
       await this.registerHooks()
       await this.emitHooks(HOOK_START)
       await this.registerPlugin()
       await this.runPlugin()
       if (!this.args.stopServer) {
         await this.initWebpack()
         await this.doBuileService()
       }
     }
     
     doBuileService() {
       let compiler
       try {
         const selfWebapck = require(this.webpack)
         const webpackConfig = this.webpackConfig.toConfig()
         compiler = selfWebapck(webpackConfig, (err, stats) => {
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
               log.info(
                 'COMPILE SUCCESSFULLY!',
                 'Compile finish in ' + result.time / 1000 + 's',
               )
             }
           }
         })
       } catch (error) {
         log.error('service startServer', error)
       }
     }
   }
   ```

3. 修改`imooc-build/examples/zbestpc_update/package.json`文件，增加打包命令

   ```json
   {
     "scripts": {
       "build:imooc": "imooc-build build"
     }
   }
   ```

4. 在`examples/zbestpc_update`中运行终端命令`npm run build:imooc`即可看到产生了`dist`文件夹

## 06：zbestpc项目build命令改造

## 07：工程化脚手架vite插件开发

[参考文档：https://cn.vitejs.dev/guide/api-javascript.html](https://cn.vitejs.dev/guide/api-javascript.html)

## 08：zbestpc项目移植imooc-build+vite脚手架

