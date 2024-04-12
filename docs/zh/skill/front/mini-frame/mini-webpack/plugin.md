# plugin 专题

## webpack 中的 plugin

webpack 通过 plugins 实现各种功能。开发者可以通过插件引入它们自己的行为到 webpack 构建流程中。但是需要理解一些 webpack 底层特性来做相应的钩子

## webpacK 编译流程

![image-20240412183603919](./assets/image-20240412183603919.png)

![img](./assets/d77fc560-a658-11eb-85f6-6fac77c0c9b3.png)

## 加载插件的对象

| 对象                    | 钩子                            |
| :---------------------- | ------------------------------- |
| Compiler 编译对象       | run 开始运行                    |
|                         | compile 开始编译                |
|                         | compilation 创建编译对象        |
|                         | make 创建模块对对象             |
|                         | emit 发射文件                   |
|                         | done 完成                       |
| Compilation 资源构建    | buildModule 创建模块            |
|                         | normalModuleLoader 普通模块加载 |
|                         | succeedModule 模块加载完成      |
|                         | finishModules 所依赖的模块完成  |
|                         | seal 封装整理代码               |
|                         | optimize 优化                   |
|                         | after-seal 封装后               |
| Module Factory 模块处理 | beforeResolver 解析前           |
|                         | afterResolver 解析后            |
|                         | parser 解析                     |
| Module 模块             |                                 |
| Parser 解析             | program 开始遍历                |
|                         | statement 语句                  |
|                         | call 调用                       |
|                         | expression 处理表达式           |
| Template                | hash 处理 hash                  |
|                         | bootstrap 启动                  |
|                         | localVars 变量                  |
|                         | render 渲染                     |

在插件开发中最终的两个资源就是 compiler 和 compilation 对象。compiler 对象代表了完整的 webpack 环境配置。compilation 对象代表了一次资源版本构建

## 自定义插件 同步插件和异步插件

[代码参考 DonePlugin.js](https://github.com/gy1001/Javascript/blob/main/Webpack/zf-webpack/self-plugin/plugins/DonePlugin.js)

[代码参考 AsyncPlugin.js](https://github.com/gy1001/Javascript/blob/main/Webpack/zf-webpack/self-plugin/plugins/AsyncPlugin.js)

### 同步插件 DonePlugin

```js
class DonePlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('编译完成')
      // console.log(stats)
    })
  }
}

module.exports = DonePlugin
```

### 异步插件 AsyncPlugin

```js
class AsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, callback) => {
      // 模拟异步操作
      setTimeout(() => {
        console.log('异步插件执行了')
        callback()
      }, 1000)
    })

    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      // 模拟异步操作
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('异步promise插件执行了')
          resolve()
        }, 1000)
      })
    })
  }
}

module.exports = AsyncPlugin
```

### 对应的 webpack.config.js 文件

```js
const path = require('path')
const DonePlugin = require('./plugins/DonePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin')
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // ...
    new DonePlugin(),
    new AsyncPlugin(),
  ],
}
```

执行`npm run dev` 后，结果如下

```bash
npm run dev
# 1s 后
异步插件执行了
# 再 1s 后
异步promise插件执行了
编译完成
```
