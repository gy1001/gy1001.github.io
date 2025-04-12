# gy-webpack

[gy-webpack 代码仓库](https://github.com/gy1001/Javascript/tree/main/Webpack/zf-webpack/gy-webpack)

[gy-webpack-demo 代码仓库](https://github.com/gy1001/Javascript/tree/main/Webpack/zf-webpack/gy-webpack-demo)

> 这里我们创建一个 gy-webpack 项目，来模拟 webpack 的编译打包过程，包括 loader 和 plugin 的使用。当然只是简单的一个 demo，没有很复杂，旨在帮助理解 webpack 的编译打包过程。

## 01-初始化项目

```bash
mkdir gy-webpack && cd gy-webpack
npm init -y
```

并在 `package.json` 中添加 `bin`命令， 内容如下

```json
{
  "name": "gy-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "gy-webpack": "bin/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 02. 全局写入 gy-webpack 命令

新建 bin/index.js 文件，内容如下

```js
#! /usr/bin/env node
console.log('Hello world!')
```

接着在本项目根目录下，执行命令`npm link` 后，我们就可以在本机终端任意位置执行 `gy-webpack` 命令了。

```bash
npm link
```

在任意位置执行 `gy-webpack` 命令，会看到如下输出

```bash
gy-webpack

Hello world!
```

## 03. 开始编写逻辑

修改 bin/index.js 文件，逻辑如下

1. 这里我们从运行目录里面找到 webpack.config.js 文件,得到相应的配置信息
2. 创建一个 Compiler 实例，并传入配置信息
3. 调用 Compiler 实例的 run 方法，开始执行编译打包流程

```js
#! /usr/bin/env node
const path = require('path')

const config = require(path.resolve(process.cwd(), './webpack.config.js'))

const Compiler = require('../lib/Compiler')
const compiler = new Compiler(config)

compiler.run()
```

## 04. 完成 Compiler 类

### 4.1 创建 Compiler 类

新建 lib/Compiler.js 文件，内容如下

```js
class Compiler {
  constructor(config) {
    // 运行项目根目录
    this.rootPath = process.cwd()
    // 配置
    this.config = config
    // 入口文件路径
    this.entryPath = ''
    // 入口配置
    this.entry = config.entry
    // 输出
    this.output = config.output
    // 总体模块对象
    this.modules = {}
    // 要写入的静态资源 文件名 以及内容
    this.assets = {}
  }
  run() {}
}

module.exports = Compiler
```

### 4.2 初步架构：buildModule、emitFile

> 修改 Compiler 类，添加 `buildModule` 方法，内容如下

```js
const path = require('path')
class Compiler {
  // ...
  buildModule(modulePath, isEntry) {}

  emitFile() {}

  run() {
    // 从入口文件出发，开始构建模块
    this.buildModule(path.resolve(this.rootPath, this.entry), true)
    // 输出文件
    this.emitFile()
  }
}
module.exports = Compiler
```

### 4.3 构建模块逻辑: buildModule

1. 获取文件内容，并进行解析（如果是入口，需要赋值 entryPath, 将来打包使用），得到 AST，然后解析 AST 获取依赖关系
2. 递归构建依赖模块
3. 构建模块后，将模块内容写入到 modules 对象中

安装相关依赖

```bash
npm i -D @babel/parser @babel/traverse @babel/generator @babel/types
```

```js
const path = require('path')
const fs = require('fs')
// 依赖于 babel 的功能包
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const babelTypes = require('@babel/types')

class Compiler {
  getSourceCode(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf-8')
    return content
  }

  buildModule(modulePath, isEntry) {
    // 获取模块的文件内容
    const originSourceCode = this.getSourceCode(modulePath)
    // 优化文件名称
    const moduleName = './' + path.relative(this.rootPath, modulePath)
    // 解析文件内容
    const { sourceCode, dependencies } = this.parse(
      originSourceCode,
      path.dirname(moduleName),
    )
  }

  parse(sourceCode, parentPath) {
    // 解析文件内容, 得到 AST
    const ast = babelParser.parse(sourceCode)
    // 依赖模块收集
    const dependencies = []
    // 遍历 AST
    traverse(ast, {
      CallExpression(nodePath) {
        const node = nodePath.node
        // 判断是否是 require 调用
        if (node.callee.name === 'require') {
          // 修改 require 名称为 __webpack_require__
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          // 优化文件名称：是否有后缀名
          moduleName = path.extname(moduleName)
            ? moduleName
            : moduleName + '.js'
          // 优化文件名称：相对路径
          moduleName = './' + path.join(parentPath, moduleName)
          // 依赖模块收集
          dependencies.push(moduleName)
          // 修改 require 参数
          node.arguments = [babelTypes.stringLiteral(moduleName)]
        }
      },
    })
    return {
      sourceCode: generator(ast).code,
      dependencies,
    }
  }
}

module.exports = Compiler
```

### 4.4 输出文件逻辑: emitFile

> 这里我们借助于 ejs 模板引擎，来输出文件

新建 lib/templates.ejs 文件，内容如下

> 这里我们大部分框架都采用打包后的基本框架，只需要替换其中的 modules、entryId 即可

```txt
;(() => {
  // webpackBootstrap
  'use strict'
  var __webpack_modules__ = {
    <%for(let key in modules){%>
      "<%-key%>": (
        module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(`<%-modules[key]%>`)
      },
    <%}%>
  }
  var __webpack_module_cache__ = {}

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    })

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    return module.exports
  }
  ;(() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
        }
      }
    }
  })()
  ;(() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
  })()
  ;(() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
      }
      Object.defineProperty(exports, '__esModule', { value: true })
    }
  })()
  var __webpack_exports__ = __webpack_require__('<%-entryId%>')
})()

```

安装依赖包

```bash
npm install ejs -D
```

完成逻辑如下

1. 读取 template.ejs 模板内容, 写入 modules、entryId 对象
2. 把输入文件全路径 写入到 assets 对象中
3. 遍历 assets 对象，输出文件

```js
const ejsLoader = require('ejs')

class Compiler {
  emitFile() {
    const templateStr = this.getSourceCode(
      path.resolve(__dirname, 'template.ejs'),
    )
    const outPutCodeStr = ejsLoader.render(templateStr, {
      entryId: this.entryPath,
      modules: this.modules,
    })
    // 输出目录以及文件名
    const outFileName = path.resolve(this.output.path, this.output.filename)
    this.assets[outFileName] = outPutCodeStr
    for (let file in this.assets) {
      fs.writeFileSync(file, outPutCodeStr)
    }
  }
}
module.exports = Compiler
```

### 4.5 完成 Compiler 类

至此，初步完成了 Compiler 类, 完成了打包编译，输出文件

最终全代码如下

```js
// bin/index.js
#! /usr/bin/env node
const path = require('path')

const config = require(path.resolve(process.cwd(), './webpack.config.js'))

const Compiler = require('../lib/Compiler')
const compiler = new Compiler(config)

compiler.run()
```

```js
// lib/Compiler.js
const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const babelTypes = require('@babel/types')
const ejsLoader = require('ejs')

class Compiler {
  constructor(config) {
    // 运行项目根目录
    this.rootPath = process.cwd()
    // 配置
    this.config = config
    // 入口文件路径
    this.entryPath = ''
    // 入口配置
    this.entry = config.entry
    // 输出
    this.output = config.output
    // 总体模块对象
    this.modules = {}
    // 要写入的静态资源 文件名 以及内容
    this.assets = {}
  }

  getSourceCode(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf-8')
    return content
  }

  buildModule(modulePath, isEntry) {
    const originSourceCode = this.getSourceCode(modulePath)
    // 优化文件名称
    const moduleName = './' + path.relative(this.rootPath, modulePath)
    // 解析文件内容
    const { sourceCode, dependencies } = this.parse(
      originSourceCode,
      path.dirname(moduleName),
    )
    // 保存模块
    this.modules[moduleName] = sourceCode
    // 如果是入口文件，记录文件路径
    if (isEntry) {
      this.entryPath = moduleName
    }
    // 递归构建依赖模块
    dependencies.forEach((dep) => {
      // 此时非入口文件，所以是 false
      this.buildModule(path.resolve(this.rootPath, dep), false)
    })
  }

  parse(sourceCode, parentPath) {
    const ast = babelParser.parse(sourceCode)
    const dependencies = []
    traverse(ast, {
      CallExpression(nodePath) {
        const node = nodePath.node
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          moduleName = path.extname(moduleName)
            ? moduleName
            : moduleName + '.js'
          moduleName = './' + path.join(parentPath, moduleName)
          dependencies.push(moduleName)
          node.arguments = [babelTypes.stringLiteral(moduleName)]
        }
      },
    })
    return {
      sourceCode: generator(ast).code,
      dependencies,
    }
  }

  emitFile() {
    const templateStr = this.getSourceCode(
      path.resolve(__dirname, 'template.ejs'),
    )
    const outPutCodeStr = ejsLoader.render(templateStr, {
      entryId: this.entryPath,
      modules: this.modules,
    })
    // 输出目录以及文件名
    const outFileName = path.resolve(this.output.path, this.output.filename)
    this.assets[outFileName] = outPutCodeStr
    for (let file in this.assets) {
      fs.writeFileSync(file, outPutCodeStr)
    }
  }

  run() {
    // 从入口文件出发，开始构建模块
    this.buildModule(path.resolve(this.rootPath, this.entry), true)
    // 输出文件
    this.emitFile()
  }
}

module.exports = Compiler
```

lib/templates.ejs 内容如下

```txt
;(() => {
  // webpackBootstrap
  'use strict'
  var __webpack_modules__ = {
    <%for(let key in modules){%>
      "<%-key%>": (
        module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(`<%-modules[key]%>`)
      },
    <%}%>
  }
  var __webpack_module_cache__ = {}

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    })

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    return module.exports
  }
  ;(() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
        }
      }
    }
  })()
  ;(() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
  })()
  ;(() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
      }
      Object.defineProperty(exports, '__esModule', { value: true })
    }
  })()
  var __webpack_exports__ = __webpack_require__('<%-entryId%>')
})()
```

## 05. 加入 loader

> 如果我们想要加入 loader，很显然是要在读取文件内容的时候进行处理

```js
class Compiler {
  getSourceCode(modulePath) {
    // 如果匹配到 module 中的 rules
    let content = fs.readFileSync(modulePath, 'utf-8')
    const rules = this.config.module.rules
    // 遍历 rules
    rules.forEach((rule) => {
      if (rule.test.test(modulePath)) {
        const loaders = rule.use
        // 遍历 loaders，且是从后往前遍历
        for (let i = loaders.length - 1; i >= 0; i--) {
          const loader = loaders[i]
          // 依次加载处理内容
          content = require(loader)(content)
        }
      }
    })
    // 读取文件内容
    return content
  }
}
module.exports = Compiler
```

## 06. 加入 plugin

> plugin 需要我们使用 tapable 依赖库，来实现发布订阅，从而实现插件机制

```js
// lib/Compiler.js
const { SyncHook } = require('tapable')

class Compiler {
  constructor(config) {
    ...
    //  ...
    // 加入一些钩子函数，也可以理解为生命周期
    this.hooks = {
      entryOption: new SyncHook(),
      afterPlugins: new SyncHook(),
      afterResolve: new SyncHook(),
      beforeRun: new SyncHook(),
      run: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      emit: new SyncHook(),
      afterEmit: new SyncHook(),
      done: new SyncHook(),
    }
    this.handlePlugins()
  }

   // 处理配置中的插件
  handlePlugins() {
    const { plugins } = this.config
    if (Array.isArray(plugins) && plugins.length) {
      plugins.forEach((plugin) => {
        plugin.apply(this)
      })
    }
    // 在相应的时机调用相应的钩子函数
    this.hooks.afterPlugins.call()
  }

  emitFile() {
    // ...
    // 调用输出文件钩子
    this.hooks.emit.call()
  }

  run() {
    // 在 webpack 中的 entry 配置处理过之后
    this.hooks.entryOption.call()
    this.buildModule(path.resolve(this.rootPath, this.entry), true)
    // 输出文件
    this.emitFile()
  }
}
```
