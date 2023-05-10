# 19-抢先实战：零基础——Vite 快速入门

[[<img src="https://cn.vitejs.dev/logo.svg" alt="img" style="height: 15px" />Vite 官方中文文档](https://cn.vitejs.dev/)](https://cn.vitejs.dev/guide/)

[ViteConf 2022回顾：Vite是如何诞生的？](https://juejin.cn/post/7156429071478423588)

## 01：什么是vite？它为什么能这么快

### Vite

vite 是 vue 作者尤雨溪在开发 vue3.0的时候开发的一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的服务器启动。Vite 是一种新型前段构建工具，能够显著提升前段开发体验，他主要由两部分组成

* 一个开发服务器，它基于 **[原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** 提供了 [**丰富的内建功能**](https://cn.vitejs.dev/guide/features.html)，如速度快到惊人的 [**模块热更新（HMR）**](https://cn.vitejs.dev/guide/features.html#hot-module-replacement)。
* 一套构建指令，它使用 [**Rollup**](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite 意在提供开箱即用的配置，同时它的 [插件 API](https://cn.vitejs.dev/guide/api-plugin.html) 和 [JavaScript API](https://cn.vitejs.dev/guide/api-javascript.html) 带来了高度的可扩展性，并有完整的类型支持。

### ESBuild

> [**esbuild 中文文档**](https://esbuild.docschina.org/)

Esbuild 是基于 Go 语言开发的 JavaScript Bundler, 它的构建速度是 webpack 的几十倍，由 Figma 前 CTO Evan Wallace 开发，并且也被 Vite 用于开发环境的依赖解析和 Transform

#### 实现原理

ESBuild的实现

* 由 Go 实现并编译成本地代码
* 重度使用并行计算
* ESBuild 中的一切带阿米从零开始
* 对内存的高效使用

#### 优缺点

##### 优点

* Golang 开发：采用 Go 语言开发，可以充分利用多线程打包。并且线程之间可以共享内容，直接编译成机器码，大大节省了程序运行时间
* 多核并行：得益于 Go 当中多线程共享内存的优势，内部打包算法充分利用多核 CPU 优势
* 从零造轮子：没有任何第三方库的黑盒逻辑，保证极致的代码性能
* 高效利用内存：ESBuild 中从头到尾尽可能地复用一份 AST 节点数据，从而大大提高了内存的利用效率，提升编译性能

##### 缺点

* 没有 TS 类型检查
* 不能操作 AST
* 不支持装饰器语法
* 产物 Targe 无法降级到 ES5 及以下

### SWC

[SWC官方文档](https://swc.rs/docs/getting-started)

[新一代的编译工具 SWC](https://juejin.cn/post/7052644023651008548)

## 02: vite从零开发原生js项目

### 原生 js 项目

项目地址：[https://github.com/gy1001/Vue-Related](https://github.com/gy1001/Vue-Related)中的 Vite/01-vite-demo 项目

1. 在`01-vite-demo`项目中运行终端命令，执行初始化

   ```bash
   npm init -y
   ```

2. 新建`index.html`,代码如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Vite Test</title>
     </head>
     <body>
       <div>this is vite test page</div>
     </body>
     <script src="./src/index.js"></script>
   </html>
   ```

3. 新建`src/inedx.js`、`src/utils.js`文件

   ```javascript
   // src/index.js
   import utils from './utils.js'
   console.log('hello vite')
   utils()
   
   
   // src/utils.js
   export default function () {
     console.log('utils')
   }
   ```

4. 此时运行`index.html`至浏览器中，就会报错，内容如下

   ```bash
   Uncaught SyntaxError: Cannot use import statement outside a module
   ```

5. 此时修改`index.html`中的引入方式

   ```html
   <script type="module" src="./src/index.js"></script>
   ```

6. 然后使用`vscode`的`live server`功能打开`index.html`就可以看到页面正常显示运行

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52eab433d5064eb38faf5d1d89a5d69a~tplv-k3u1fbpfcp-watermark.image?)

### 使用 vite

1. 安装相关依赖库

   ```bash
   npm install vite -D
   ```

2. 修改`package.json`中的脚本命令

   ```json
   {
     "scripts": {
       "dev": "vite"
     },
   }
   ```

3. 终端运行`npm run dev`,根据提示打开指定地址` http://localhost:5173/`

4. 运行至浏览器中，可以正常显示

5. 这里我们看到以下几点优势

   * 启动非常快速
   * 基本不需要配置，便可以启动

## 03：vite如何打包和发布原生js项目？

### vite 基本命令

1. 修改`package.json`文件，增加脚本命令

   ```json
   {
     "scripts": {
       "build": "vite build",
       "preview": "vite preview"
     },
   }
   ```

2. 终端运行`npm run build`即可看到打包结果

   ```bash
   gaoyuan@gaoyuandeMac 01-vite-demo % npm run build
   
   > 01-vite-demo@1.0.0 build
   > vite build
   
   vite v4.3.5 building for production...
   ✓ 4 modules transformed.
   dist/index.html                0.40 kB │ gzip: 0.28 kB
   dist/assets/index-57edac96.js  0.78 kB │ gzip: 0.43 kB
   ✓ built in 112ms
   ```

3. 也可以运行`npm run preview` 来查看

   > 注意：这里必须先打包产生 dist 文件，因为默认会使用 dist 目录来作为资源目录

### vite 配置文件

1. 新建`vite.config.js`文件，具体内容如下

   ```javascript
   import { defineConfig } from 'vite'
   
   export default defineConfig({
     base: '/test', // 文件路径会增加 test 
   })
   ```

2. 执行以下命令

   ```bash
   npm run build
   npm run preview
   ```

3. 可以看到如下结果

   ```bash
   gaoyuan@gaoyuandeMac 01-vite-demo % npm run preview
   
   > 01-vite-demo@1.0.0 preview
   > vite preview
   
     ➜  Local:   http://localhost:4173/test
     ➜  Network: use --host to expose
   ```

## 04：vite支持vue3项目开发

1. 新建`02-vite-vue3`文件夹

2. 执行以下命令

   ```bash
   npm init -y
   npm install vue vite @vitejs/plugin-vue less -D
   ```

3. 新建`src/main.js`,内容如下

   ```javascript
   import { createApp } from 'vue'
   import App from './App.vue'
   
   createApp(App).mount('#app')
   ```

4. 新建`src/App.vue`

   ```vue
   <template>
     <div class="test">
       this is vite page
       <div class="test-2">this is test2</div>
     </div>
   </template>
   
   <script>
   export default {}
   </script>
   
   <style lang="less" scoped>
   @import './index.less';
   </style>
   ```

5. 新建`src/index.less`,内容如下

   ```less
   .test{
     color: red;
     .test-2{
       color: yellow;
     }
   }
   ```

6. 新建`index.html`文件，内容如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Vite Test</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
     <script type="module" src="./src/main.js"></script>
   </html>
   ```

7. 新建`vite.config.js`，内容如下

   ```javascript
   import { defineConfig } from 'vite'
   import pluginVue from '@vitejs/plugin-vue'
   export default defineConfig({
     plugins: [pluginVue()],
   })
   ```

8. 修改`package.json`中的脚本命令

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
   }
   ```

9. 终端运行`npm run dev`,打开指定地址`http://localhost:5173/`至浏览器即可

## 05：vite支持react18项目开发

1. 新建`03-vite-react18`文件夹

2. 执行以下命令

   ```bash
   npm init -y
   npm install react react-dom -S
   npm install vite less -D
   npm install @vitejs/plugin-react -D 
   ```

3. 新建`src/index.jsx`

   ```javascript
   import React from 'react'
   import { createRoot } from 'react-dom/client'
   import Button from './Buton'
   import './index.less'
   
   function App() {
     return (
       <div className='test'>
         this is vite page
         <div className='test-2'>this is test2</div>
         <Button></Button>
       </div>
     )
   }
   const container = document.getElementById('app')
   const root = createRoot(container)
   root.render(React.createElement(App))
   ```

4. 新建`src/Button.jsx`，

   ```javascript
   export default function Button() {
     const handler = () => {
       alert('click')
     }
     return <button onClick={handler}>我是按钮</button>
   }
   ```

5. 新建`src/index.less`

   ```less
   .test{
     color: red;
     .test-2{
       color: yellow;
     }
   }
   ```

6. 根目录下新建`index.html`

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
     <script type="module" src="./src/index.jsx"></script>
   </html>
   ```

7. 新建`vite.config.js`

   ```javascript
   import { defineConfig } from 'vite'
   import pluginReact from '@vitejs/plugin-react'
   export default defineConfig({
     plugins: [pluginReact()],
   })
   ```

8. 修改`package.json`，增加脚本命令

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
   }
   ```

9. 运行`pnpm run dev`，可以看到效果如下(按钮点击有点击效果)

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35a5a20eaab64ef49a4c3d267bfbdcc1~tplv-k3u1fbpfcp-watermark.image?)

10. 运行`pnpm run build`打包正常

11. 然后执行`pnpm run preview`运行正常

## 06：如何让vite打包代码支持低版本浏览器运行？

> [官方插件 @vitejs/plugin-legacy: 为打包后的文件提供传统浏览器兼容性支持。](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

1. 回到`02-vite-vue3`项目中，安装依赖库

   ```bash
   npm install @vitejs/plugin-legacy -D
   ```

2. 修改`vite.config.js`，增加如下内容

   ```javascript
   import legacyPlugin from '@vitejs/plugin-legacy'
   
   export default defineConfig({
     plugins: [
       legacyPlugin({
         targets: ['defaults', 'not IE 11'],
       }),
     ],
   })
   ```

3. 这样执行`npm run build`后，我们看到以下效果

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/592ee433194848c8b2192c53cd68ea07~tplv-k3u1fbpfcp-watermark.image?)

4. 打包后的结果多了个`polyfills-legacy-2fc23d6e.js`显然他是用来处理兼容性的

## 07：vite vue+react官方项目模板搭建

[官方文档：搭建第一个 Vite 项目](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

1. 执行命令`npm create vite@latest`, 然后按照提示操作即可！

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e07838e9a6ae4a5788ff05529c6e82b1~tplv-k3u1fbpfcp-watermark.image?)

2. 然后进入项目，执行`npm install`，其他根据提示操作即可
