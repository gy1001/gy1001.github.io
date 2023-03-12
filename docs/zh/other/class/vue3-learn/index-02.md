# 02：Vue3 源码结构-搭建框架雏形

## 01：前言

从本章节我们将要去搭建自己的 vue 框架项目了，我们叫他 `vue-next-mini`

在搭建的过程中，我们将会参考 `vue`源代码的项目结构和构建方案，从而可以构建出一个**小而美**的`vue`框架

所以本章的内容将会分为两个大的部分

1. **vue 源码解析**：在这部分，我们需要下载 vue 的源代码，同事对它进行 debugger 和 源码阅读
2. **构建vue-next-mini**: 在这部分，我们会参考 vue 源代码的基本结构，来创建我们的`vue-next-mini`

那么明确好以上内容之后，接下来就让我们开始本章节的学习吧

## 02:探索源码设计：Vue3 源码设计大解析

本小节中，我们需要做两件事情

1. 下载 `vue`源代码(这里使用版本 v3.2.37)
2. 了解 `vue`的源码结构

### 下载 vue 源代码（版本 v3.2.37）

大家可以点击[这里](https://github.com/vuejs/core/releases/tag/v3.2.37)进入 vue3 的源代码的 github 仓库

或者点击[这里](https://github.com/lgd8981289/vue-next-3.2.37)下载老师fork的仓库

### vue 源码结构

下载好 vue 源码以后，我们看下它的基本结构

```javascript
|-- core-3.2.37
    |-- tsconfig.json // typescript 配置文件
    |-- rollup.config.js // rollup 的配置文件
    |-- packages // 核心代码区
        |-- vue-compat // 用于兼容 vue2 的代码
        |-- vue // 重要：测试实例、打包之后的 dist 都会放在这里
        |-- template-explorer // 提供了一个线上的测试(https://template-explorer.vuejs.org) 用于把template 转为 render
        |-- size-check // 测试运行时包大小
        |-- shared // 重要：共享的工具类
        |-- sfc-playground // sfc 工具 如：https://sfc.vuejs.org/
        |-- server-render // 服务端渲染
			  |-- runtime-test // runtime 测试相关
			  |-- runtime-dom // 重要：基于浏览器平台的运行时
			  |-- runtime-core // 重要：运行时的核心代码，内部针对不同平台进行了实现
			  |-- reactivity-transform // 已过期，无需关注
			  |-- reactivity // 重要：响应性的核心模块
			  |-- global.d.ts // 全局的 ts 声明
			  |-- compiler-ssr // 服务器端渲染的编译模块
			  |-- compiler-sfc // 单文件组件(.vue)的编译模块
			  |-- compiler-dom // 重要：浏览器相关的编译模块
			  |-- compiler-core // 重要：浏览器核心代码
    |-- package.json // npm 包管理工具
    |-- netlify.toml // 自动化部署相关
    |-- jest.config.js // 测试相关
    |-- api.extractor.json // Typescript 的 API 分析工具
    |-- SECURITY.md // 报告漏洞，危害安全的声明文件
    |-- README.md   // 项目声明文件
    |-- LICENSE // 开源协议
    |-- CHANGLOG.md // 更新日志
    |-- BACKERS.md // 赞助声明
    |-- test-dts // 测试相关，不需要关注
    |-- scripts // 配置文件相关，不需要关注
    |-- pnpm-workspace.yaml // pnpm 相关配置
    |-- pnpm-lock.yaml  // 使用 pnpm 下载的依赖包版本
```



## 03：创建测试实例：在Vue源码中运行测试实例

现在我们已经大概了解了 vue 源代码的基本结构，那么接下来我们来看下，如何在 vue3 中运行测试实例，并进行 debugger

### 运行 Vue3 源代码

1. 因为 `vue3`是通过`pnpm`作为包管理工具的，所以想要运行`vue3`那么首先需要安装 `pnpm`

2. 我们可以通过如下命令安装 `pnpm`

   ```shell
   npm install -g pnpm
   ```

3. `pnpm`会通过一个**集中管理**的方式来管理**电脑中所有项目**的依赖包，以达到**节约电脑磁盘**的目的，具体可以点击[这里](https://www.pnpm.cn/)查看

4. 安装完`pnpm`后，接下来在项目根目录中运行脚本，来安装依赖包

   ```shell
   pnpm i
   ```

5. 等待所有的依赖包安装完成之后，执行如下命令进行打包

   ```shell
   pnpm run build
   ```

6. 执行完毕以后，可以发现`packages/vue/dist` 文件夹下，生成乳腺癌文件

   ```javascript
   |-- dist
       |-- vue.cjs.js
    		|-- vue.cjs.prod.js
    		|-- vue.esm-broser.js
    		|-- vue.esm-bundler.js
    		|-- xxxx
   ```

### 运行测试实例

之前说过 `packags/vue/examples`下放的是测试的实例，所以我们可以在这里新建一个文件夹，用来表示代码的测试实例

1. 创建 `/packages/vue/example/mine`文件夹，

2. 在该文件夹中创建一个测试实例`reactive.html`，比恩写入以下代码

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
     <script src="../../dist/vue.global.js"></script>
     <script>
       // 从 Vue 中解构出 reactive effect 方法
       const { reactive, effect } = Vue
       // 声明响应式数据 obj
       const obj = reactive({
         name: '孙悟空',
         age: 500
       })
       // 调用 effect 方法
       effect(() => {
         document.querySelector('#app').innerText = obj.name
       })
       // 定时修改数据，视图发生变化
       setTimeout(() => {
         obj.name = '猪八戒'
       }, 2000)
     </script>
   </html>
   ```

3. 利用 vscode 的 `live server`插件，用浏览器打开此网页服务，就可以看到数据定时修改后的效果

## 04:跟踪解析运行行为：为 Vue 开启 sourceMap

此时，我们已经成功的运行了一个测试实例代码，但是在这样的一个测试实例代码中，Vue内部是如何执行的呢？

如果想要知道这个，那么我们需要对`vue`代码进行`debugger`来操作`vue`代码的执行

那么问题来了，**如何对 Vue进行 debugger 操作呢？**

如果想要对`Vue`进行`debugger`操作，那么我们必须开启 vue 的 `source-map`功能

### 开启 Vue 的 SourceMap

那么如何开启`Vue`的`source-map`呢？

1. 打开`package.json`可以发现，当我们执行`npm run build`时，其实执行的是`node scripts/build.js` 指令

2. 这就意味着，它的配置文件读取的是`scripts/build.js`这个文件

3. 那么在该文件中存在如下的代码

   ```javascript
   const args = require('minimist')(process.argv.slice(2))
   
   const sourceMap = args.sourcemap || args.s
   
   await execa(
       'rollup',
     	[
         '-c',
         '--environment',
       	[
           `COMMIT:${commit}`,
           `NODE_ENV:${env}`,
           `TARGET:${target}`,
           formats ? `FORMATS:${formats}` : ``,
           buildTypes ? `TYPES:true` : ``,
           prodOnly ? `PROD_ONLY:true` : ``,
           sourceMap ? `SOURCE_MAP:true` : `` // sourceMap 配置项
       	]
           .filter(Boolean)
           .join(',')
     	],
      { stdio: 'inherit' }
   )
   ```

4. 上面的`sourceMap`相关的配置最终会被 `rollup`读取

5. 而根据[**minimist包文档**](https://www.npmjs.com/package/minimist)实例，可以看出，它是获取运行参数的，官网示例如下

   ```javascript
   var argv = require('minimist')(process.argv.slice(2));
   console.log(argv);
   
   node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
   {
   	_: ['foo', 'bar', 'baz'],
   	x: 3,
   	y: 4,
   	n: 5,
   	a: true,
   	b: true,
   	c: true,
   	beep: 'boop'
   }
   ```

6. 所以我们在`package.json`中修改`build`命令如下

   ```shell
   "build": "node scripts/build.js -s",
   ```

7. 然后重新运行`npm run build` 就可以看到新打包的文件中，产生了`xxx.js.map`

8. 如此，我们就为 vue 开启了 sourceMap

## 05: 授人以鱼：如何针对源码进行 debugger 

此时我们已经成功的开启了`sourceMap`，那么开启了`SourceMap`之后有什么变化呢？

此时我们在来看刚才启动的项目

在刚才启动的项目中，按住 `F12`打开控制台，进入`srouces`模块，此时可以看到如下内容

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f8bc5d8f1a149e98330be1d6ab473dd~tplv-k3u1fbpfcp-watermark.image?)

其中左侧展示的，就是当期使用的 vue 源代码了。

那么我们知道此时我们是使用了`reactive`方法声明的响应式数据，`reactive`方法对应的代码位置在`packages/reactivity/src/reactive.ts`中的第90行

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ad84efa8b8c4b658ca961f908f4eb0c~tplv-k3u1fbpfcp-watermark.image?)

那么此时我们就可以在这里打上一个断点，来跟踪整个`reactive`的代码执行逻辑, 然后刷新页面，可以看到，此时代码已经进入了`debugger`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/190c1e1ba4f747e6a6f69545fac0e33c~tplv-k3u1fbpfcp-watermark.image?)

**因为我们目前还没有开始学习 vue 源码内容，所以我们此时先到此为止，大家可以根据自己的情况，看一下是否要继续跟踪执行**

那么这样我们就已经成功的为 vue 测试实例开启了 debugger 功能，后续我们的开发之中，就可以利用这样的方式，来跟踪并查看 vue 源码的执行逻辑

那么我们最后在总结一下这几个小节所介绍的步骤

想要对 vue 代码执行 debugger，那么共分为以下几个步骤

1. 下载 vue 源代码，推荐通过[该仓库](https://github.com/lgd8981289/vue-next-3.2.37)下载指定版本（注意：**直接下载 ZIP 文件会导致 build 出错**）
2. 为源代码开启`sourcemap`,以方便后续进行`debugger`
3. 再`packages/vue/examples`中，创建文件，导入`../../dist/vue.global.js`，书写测试实例
4. 通过 `Live Server`启动服务
5. 在浏览器控制台的`Sources`中查看运行代码，并进行`debugger`

## 06: 授人以渔：如何阅读源码

那么上一小节中我们已经知道了如何对`vue`的源代码进行`debugger`，但是如果想要学习或者了解 vue 的代码执行，那么光靠 debugger 是不够的，除此之外我们还需要掌握另外一个能力，就是**如何阅读源代码**

### 阅读源代码的误区

很多同学在阅读源代码的时候，都会面临一个**误区**，那就是：**我需要把源代码中每一行代码都读得明白**

这是一个非常不对的行为 ，很容易让我们**事倍功半**

所以在这里我们需要先给大家明确一点：**阅读源码绝对不是要读明白其中每一行代码的意思，而是在众多的业务代码中寻找到主线，跟随这个主线来进行阅读**

### 阅读源码的正确姿势

想要快速、轻松的阅读源码，正确的姿势非常重要，主要有两点

1. 摒弃边缘情况
2. 跟随一条主线

#### 摒弃边缘情况

在大型项目的源码中，都会充斥着非常多的业务代码，这些业务代码是用来处理很多**边缘情况**的，如果我们过分深入这些业务代码则会让我们陷入一个**代码泥潭中**，在繁琐的业务中找不到方向

所以，我们在阅读源代码之前，必须要明确一点，那就是**仅阅读核心逻辑**

#### 跟随一条主线

对于像 Vue 这种重量级的项目来说，哪怕我们只是去阅读它的核心代码，你也会发现是非常困难的，我们之前说过 vue 的核心大致可以分为三块

1. 响应性
2. 运行时
3. 编译器

每一块的内容又分为很多的业务分支，所以哪怕阅读核心代码已然是一个浩大的工作量

所以我们还需要另外一个方式，那就是**跟随一条主线**

> 举个例子，我们以前面的 packages/examples/mine/reactive.html 为例

在该代码中，我们通过 reactive 声明了一个响应式数据

```javascript
// 声明响应式数据 obj
const obj = reactive({
  name: '张三'
})
```

那么我们就可以以该代码为主，来去查看 reactive 方法的主线逻辑

1. 首先要在`reactive`方法中进行了一个逻辑判断，判断 `target`是否为只读的，如果是只读的，就直接返回`target`,意思是：传的是啥返回啥

2. 如果不是只读的，则触发`createReactiveObject`方法

   ```javascript
   export function reactive(target: object) {
     // if trying to observe a readonly proxy, return the readonly version.
     if (isReadonly(target)) {
       return target
     }
     return createReactiveObject(
       target,
       false,
       mutableHandlers,
       mutableCollectionHandlers,
       reactiveMap
     )
   }
   ```

3. 在`createReactiveObject`方法中，又进行了一堆判断，最后返回了`proxy`实例对象，所以我们得到 `obj`应该就是一个`proxy`实例

   ```javascript
   function createReactiveObject(target: Target,
     isReadonly: boolean,
     baseHandlers: ProxyHandler<any>,
     collectionHandlers: ProxyHandler<any>,
     proxyMap: WeakMap<Target, any>){
     
    	...
     const proxy = new Proxy(
       target,
       targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
     )
     proxyMap.set(target, proxy)
     return proxy
   }
   ```

4. 打印 obj 你会发现确实如此

这样的一个简单的例子，就是告诉大家应该如何来通过`debugger`配合`正确姿势`来快速的阅读源代码

### 总结

这一小节我们讲解了如何阅读源代码，以上方式不知可以应用到 vue 中，也可以应用到其他的框架之中，所以我们把这一小节叫做`授人以渔`

当然，我们这里只是通过一个简单的方式来进行了举例，在大家实际阅读的过程之中，肯定还会遇到很多的困难的，不过好在，在这个过程中，我们会一起进行阅读

## 07: 开始搭建自己的框架：创建vue-next-mini

那么经过我们现在的学习，我们大概已经了解了 `vue` 源码中的一些大概模块，并且也知道了如何对`vue` 的代码进行实例测试、代码追踪与代码阅读

那么明确好了这些之后，接下来我们就可以创建自己的 vue 框架项目：`vue-next-mini`

创建`vue-next-mini`与我们之前创建项目不同，不可以再借助`vue-cli`或者`vite`等脚手架工具快速生成`vue`项目基本架构了，所以我们需要从0 来搭建这样一个项目

1. 创建`vue-next-mini`文件夹

2. 通过 vscode 打开

3. 在终端中执行如下命令，创建`package.json`

   ```shell
   npm init -y
   ```

4. 创建`packages`文件夹，作为**核心代码**区域

5. 创建`packages/vue`文件夹：打包、测试实例、项目整体入口模块

6. 创建`packages/shared`文件夹：共享公共方法模块

7. 创建`packages/compiler-core`文件夹：编译器核心模块

8. 创建`packages/compiler-dom`文件夹：浏览器部分编辑器模块

9. 创建`packages/reactivity`文件夹：响应式模块

10. 创建`packages/runtime-core`文件夹：运行时核心模块

11. 创建`packages/runtime-dom`文件夹：浏览器部分运行时模块

因为 Vue3 是使用 TS 进行构建的，所以在我们的项目中，也将通过 TS 进行构建整个项目，那么我们又应该如何在项目中使用 TS 呢？

## 08: 为框架进行配置：导入 ts

想要在项目中使用 ts 构建(课程使用的 ts 版本为 4.7.4)，那么首先我们在项目中创建对应的`tsconfig.json`配置文件

1. 在项目根目录中，创建`tsconfig.json`文件

2. 该`tsconfig.json`文件指定编译项目所需的`入口文件`和`编译器`配置

3. 我们也可以通过以下指令来生成`包含默认配置`的`tsconfig.json`文件

   ```shell
   // 需要首先安装 ts
   npm install -g typescript@4.7.4
   // 生成默认配置
   tsc --init
   ```

4. 在`tsconfig.json`中指定如下配置

   ```json
   // http:www.typescriptlang.org/tsconfig 也可以使用 tsc -init 生成默认的 tsconfig.jso 文件进行属性查找
   {
     // 编译器配置
     "compilerOptions": {
       // 根目录
       "rootDir": ".",
       // 严格模式标志
       "strict": true,
       // 指定类型脚本如何从给定的模块说明符查找文件
       "moduleResolution": "node",
       "esModuleInterop": true,                             
       // js 语言版本
       "target": "es5",
       // 允许未读取局部变量
       "noUnusedLocals": false,
       // 允许未读取的参数
       "noUnusedParameters": false,
       // 允许解析 json
       "resolveJsonModule": true,
        // 支持语法迭代
       "downlevelIteration": true, 
       // 允许使用隐式的any 类型（有助于我们简化 ts 的复杂度，从而更加专注于逻辑本身）
       "noImplicitAny": false,
       // 模块化
       "module": "esnext",
       // 转换为 Javascript 时从 Typescript 文件中删除所有注释
       "removeComments": false,
       // 禁用 sourceMap
       "sourceMap": false,
       "lib": ["esnext", "dom"]
     },
     // 入口
     "include": [
       "packages/*/src"
     ]
   }
   ```

5. 配置项的详细介绍，大家可以点击[这里](https://www.staging-typescript.org/tsconfig)进行查看

6. 注意：在`packages`文件夹下，为每一个文件创建一个`src`文件夹，并依次新建`index.ts`文件

## 09: 引入代码格式化工具：prettier 让你的代码结构更加规范

因为对于 vue 而言，他是一个开源的可以被众多开发者贡献的框架项目，所以为了保证整个项目的代码书写具备统一风格，`vue` 导入了 `eslint` 和 `prettier` 进行代码格式化的控制

但是对于我们而言，因为这并不是一个开源的代码仓库，所以我们无需专门导入`eslint`增加项目的额外复杂度，只需要导入`prettier`帮助我们控制代码格式化即可

1. 在`vscode`扩展中，安装`prettier`辅助插件

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba7850e9c1b74e84b27232f4527a8c79~tplv-k3u1fbpfcp-watermark.image?)

2. 在项目根目录下，创建`.prettierrc`文件

   ```json
   {
     // 结尾无分号
     "semi": false,
     // 全部使用单引号
     "singleQuote": true,
     // 每行长度为 80
     "printWidth": 80,
     // 不添加尾随 , 号
     "trailingComma": "none",
     // 省略箭头函数括号
     "arrowParens": "avoid"
   }
   ```

3. 至此，`prettier`配置成功

将来我们就可以指定`prettier`作为项目的代码格式化工具了

## 10： 模块打包器：rollup

`rollup`是一个模块打包器，和`webpack`一样可以将`javascript`打包为指定的模块

但是不同的是，对于`webpack`而言，它在打包的时候会产生`冗余的代码`，这样的一种情况在我们开发大型项目的时候没有什么影响，但是如果我们是开发一个`库`的时候，那么这些冗余的代码就会大大增加库体积，这就不美好了

所以我们需要一个**小而美**的模块打包器，这就是`rollup`

> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，如 library或者应用程序

因为 rollup 并不是咱们课程的重点，所以我们不会花费大量的篇幅来讲解 rollup 的概念，只会讲解`rollup`的一些基础概念，能够满足我们当前的使用即可。大家可以把 `rollup`理解为一个`打包库`的模块打包器，而在应用程序的打包中选择 `webpack`

### rollup

我们可以在项目根目录下，创建`rollup.config.js`文件作为`rollup`的配置文件(就像`webpack.config.js`一样)

```js
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
// 默认导出一个数组，数组的每一个对象都是一个单独的导出文件配置，
// 详细可查： https://www.rollupjs.com/guide/big-list-of-options
export default [
  {
    // 入口文件
    input: "packages/vue/src/index.ts",
    // 打包出口
    output: [
      // 导出 iife 模式的包
     	{
        // 开启 sourceMap 
        sourcemap: true,
        // 导出文件地址
        file: "./packages/vue/dist/vue.js",
        // 生成包的格式
        format: "iife",
        // 变量名
        name: "Vue"
      }
    ],
    // 插件
  	plugins: [
      // ts 支持
      typescript({
        sourceMap: true
      }),
      // 模块导入的路径补全
      resolve(),
      // 将 commonjs 转换为 ESM
      commonjs()
    ]
  },
]
```

依赖包的详细版本为

```json
"devDependencies": {
  "@rollup/plugin-commonjs": "22.0.1",
  "@rollup/plugin-node-resolve": "^13.3.0",
  "@rollup/plugin-typescript": "^8.3.4"
}
```

那么至此我们就配置了一个基本的`rollup`的配置文件

然后我们可以在`input`路径下创建对应的`index.ts`，冰鞋去初始化代码

```js
console.log("hello vue-next-mini")
```

同时因为我们使用的是 ts ，所以还需要安装 `tslib` `typescript`

``` shell
npm install --save-dev tslib@2.4.0 typescript@4.7.4
```

那么至此，所有的配置完成

此时我们可以在`package.json`中新增一个`scripts`

```json
"build": "rollup -c"
```

执行 `npm run build`可以看到 `packages/vue/dist/vue.js`产生了，内容如下

```js
(function () {
	'use strict';

	console.log("hello ");

})();
//# sourceMappingURL=vue.js.map
```

## 11: 初见框架雏形：配置路径映射

我们知道在当前的项目中 ，`shared`文件夹内承担的事公开的工具方法，比如我们可以创建如下文件:`packages/shared/src`

```javascript
// 判断是否为一个数组
export const isArray = Array.isArray
```

那么这个方法可能会在多项目的多个地方被使用，所以我们可能会经常使用到如下代码`packages/vue/src/index.ts`

```javascript
import { isArray } from "@vue/shared"
console.log(isArray([]))
```

其中我们希望可以通过`@vue/shared`来直接导入 `packages/shared/index.ts`下的 `isArray`方法

那么如果想要达到这样的效果 ，那么就必须要设置 `tsconfig`的[**路径映射**](https://www.staging-typescript.org/tsconfig#paths)功能

在`tsconfig.json`中添加如下代码

```json
{
  // 编辑器配置
  compilerOptions: {
    // 设置快捷导入
    "baseUrl": ".",
    "paths": {
      "@vue/*": [
        "packages/*/src"
      ]
    }
  }
}
```

这表示，我们可以通过`@vue/*`来代替 `packages/*/src/index`的路径

那么此时，我们的导入即可成功，可重新执行`npm run build`进行测试

## 12： 总结

在本章节中，我们主要做了两件事情

1. 了解了`vue`的源码设计，同时也知道了如何对阅读框架的源代码，并且对`vue`的源码进行了`debugger`
2. 创建了咱们自己的`vue-next-mini`库，并且对该项目进行了结构和配置上的初始化

那么做完了这些之后，从下一章节开始我们就要开始逐步的接触到`vue`的核心代码和设计内容了，并且逐步实现`vue-next-mini`了

那么让我们拭目以待吧

