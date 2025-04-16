# Babel

## 推荐阅读

[姜瑞涛的官方网站-Babel 教程](https://www.jiangruitao.com/babel/)

[一文搞懂 core-js@3、@babel/polyfill、@babel/runtime、@babel/runtime-corejs3 的作用与区别](https://juejin.cn/post/7062621128229355528)

## Babel 是什么

`Babel` 是一个 `JavaScript` 解释器，它能够将 `ECMAScript 2015+` 版本的代码转换为向后兼容的 `JavaScript` 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

使用 `Babel` 进行 `ES6` 转 `ES5` 时，转化之后默认是严格模式

## Babel 转码依赖以及基本配置

- `@babel/core`：Babel 核心代码，用于转码
- `@babel/cli`：Babel 的命令行工具，用于在命令行转码文件
  - `npm install @babel/cli -D`
- `@babel/preset-env`：Babel 预设环境，用于转码 ES6+ 语法
  - `npm install @babel/preset-env -D`

```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [],
}
```

一个完整的 `Babel` 转码工程通常包括如下

1. `Babel` 配置文件
2. `Babel` 相关依赖包
3. 需要转码的源代码文件

## 引入 `polyfill`

### 为什么要引入 `polyfill`

因为 `Babel` 默认只会转换新的 `JavaScript` 语法，而不会转换新的 API

新的 API 一类是诸如 `Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、`Symbol`、`Promise` 等全局对象，以及一些定义在全局对象上的方法（比如 `Object.assign`、`Promise.resolve`）

一类是新的实例方法，比如 `Array.from`、`Array.of`、`String.padStart` 等

### 什么是 polyfill

`polyfill` 是一种 `JavaScript` 文件，它包含一些代码，用来为旧浏览器提供它没有原生支持的较新的 `JavaScript` 功能。

`polyfill` 提供了全局的 ES6 对象以及通过修改原型链 `Array.prototype` 等实现对实例的实现。

我们可以直接在 html 文件引入 `polyfill.js` 文件来作为全局环境垫片， `polyfill.js` 有 `Babel` 官方的 `polyfill.js`，也有第三方的。

## Babel 配置文件

### Babel 配置文件格式

Babel 配置文件默认会在当前目录寻找，主要有`.babelrc`和`babel.config.js`两种配置文件,也可以在 package.json 中配置，推荐使用`babel.config.js`

```js
module.exports = {
  presets: ['es2015', 'react'],
  plugins: ['transform-decorators-legacy', 'transform-class-properties'],
}
```

对于 package.json，就是在 package.json 中增加一个 babel 属性和值，它的配置是这样子

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "babel": {
    "presets": ["es2015", "react"],
    "plugins": ["transform-decorators-legacy", "transform-class-properties"]
  }
}
```

## 插件 plugins 与预设 presets

### 内容的区别

babel 插件有很多，比如处理 ES 2015 的就有

- `@babel/plugin-transform-arrow-functions`
- `@babel/plugin-transform-block-scoped-functions`
- `@babel/plugin-transform-block-scoping`
- ……

`babel` 插件实在太多，我们不可能一一记住、安装并写入配置插件中，预设 `presets` 就是为了解决这一问题的。

预设 `presets` 就是一系列插件的集合，它包含了一组插件，可以让我们一次性安装和配置这些插件。例如 `babel-preset-env` 预设包含了所有 ES 2015+ 的语法转换插件，我们只需要安装它，就可以直接使用了。

`babel` 官方已经对常用的环境做了一写 `presets` 包

- `@babel/preset-env`
- `@babel/preset-flow`
- `@babel/preset-react`
- `@babel/preset-typescript`

### 执行顺序的区别

如果两个插件或预设都要处理同一个代码片段，那么会根据插件和预设的顺序来执行。规则如下：

- 插件比预设先执行
- 插件的顺序是插件数组从前往后执行
- 预设的顺序是预设数组从后往前执行

### Babel 插件和预设的参数

如果要给插件和预设设置参数，那么成员就不能写字符串了，而要改写一个数组。数组第一项是插件或者预设的名字字符串，第二个参数是插件或者预设的参数对象。示例如下

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

### 插件和预设的选择

Babel 官方的 preset，我们实际可能会用到的其实就只有 4 个：

- `@babel/preset-env`
- `@babel/preset-flow`
- `@babel/preset-react`
- `@babel/preset-typescript`

目前比较常用的插件只有

- `@babel/plugin-transform-runtime`

目前我做过的几个项目，前端工程已经很少见到里使用其它的插件了。

## Babel-polyfill

总体来说，Babel 官方的 polyfill 使用方法主要有如下几种：

1. 直接在 html 文件引入 Babel 官方的 polyfill.js 脚本文件；
2. 在前端工程的入口文件里引入 polyfill.js；
3. 在前端工程的入口文件里引入@babel/polyfill；
4. 在前端工程的入口文件里引入 core-js/stable 与 regenerator-runtime/runtime；
5. 在前端工程构建工具的配置文件入口项引入 polyfill.js；
6. 在前端工程构建工具的配置文件入口项引入@babel/polyfill；
7. 在前端工程构建工具的配置文件入口项引入 core-js/stable 与 regenerator-runtime/runtime；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script src="https://cdn.bootcss.com/babel-polyfill/7.6.0/polyfill.js"></script>
  </head>

  <body></body>
  <script>
    var fn = (num) => num + 2
    var promise = Promise.resolve('ok')
  </script>
</html>
```

```js
import './polyfill.js'

var promise = Promise.resolve('ok')
console.log(promise)
```

```js
// 需要安装： npm install --save @babel/polyfill
import '@babel/polyfill'

var promise = Promise.resolve('ok')
console.log(promise)
```

```js
// 需要安装： npm install --save core-js regenerator-runtime
import 'core-js/stable'
import 'regenerator-runtime/runtime'

var promise = Promise.resolve('ok')
console.log(promise)
```

```js
// a.js
var promise = Promise.resolve('ok')
console.log(promise)

// webpack.config.js
const path = require('path')

module.exports = {
  entry: ['./polyfill.js', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, ''),
  },
  mode: 'development',
}
```

```js
// 需要安装：  npm install --save @babel/polyfill
// a.js
var promise = Promise.resolve('ok')
console.log(promise)

// webpack.config.js
const path = require('path')

module.exports = {
  entry: ['@babel/polyfill', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, ''),
  },
  mode: 'development',
}
```

```js
// 需要安装：  npm install --save core-js regenerator-runtime
// a.js
var promise = Promise.resolve('ok')
console.log(promise)

// webpack.config.js
const path = require('path')

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, ''),
  },
  mode: 'development',
}
```

## @babel/preset-env

### browserslist

如果你使用过 vue 或 react 的官方脚手架 cli 工具，你一定会在其 package.json 里看到 browserslist 项，下面该项配置的一个例子：

```json
{
  "browserslist": ["> 1%", "not ie <= 8"]
}
```

上面的配置含义是，目标环境是市场份额大于 1%的浏览器并且不考虑 IE8 及以下的 IE 浏览器。

`Browserslist` 叫做目标环境配置表，除了写在 package.json 里，也可以单独写在工程目录下 `.browserslistrc` 文件里。

我们用 `browserslist` 来指定代码最终要运行在哪些浏览器或 node.js 环境。

`Autoprefixer`、`postcss` 等就可以根据我们的 `browserslist`，来自动判断是否要增加 CSS 前缀（例如'-webkit-'）。

我们的 Babel 也可以使用 browserslist，如果你使用了@babel/preset-env 这个预设，此时 Babel 就会读取 browserslist 的配置。

如果我们的@babel/preset-env 不设置任何参数，Babel 就会完全根据 browserslist 的配置来做语法转换。如果没有 browserslist，那么 Babel 就会把所有 ES6 的语法转换成 ES5 版本。

注意，Babel 使用 browserslist 的配置功能依赖于@babel/preset-env，如果 Babel 没有配置任何预设或插件，那么 Babel 对转换的代码会不做任何处理，原封不动生成和转换前一样代码

### 参数项：targets

该参数项可以取值为字符串、字符串数组或对象，不设置的时候取默认值空对象{}。

该参数项的写法与 browserslist 是一样的，下面是一个例子

```js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          chrome: '58',
          ie: '11',
        },
      },
    ],
  ],
  plugins: [],
}
```

如果我们对@babel/preset-env 的 targets 参数项进行了设置，那么就不使用 browserslist 的配置，而是使用 targets 的配置。

如不设置 targets，那么就使用 browserslist 的配置。

如果 targets 不配置，browserslist 也没有配置，那么@babel/preset-env 就对所有 ES6 语法转换成 ES5 的。

正常情况下，我们推荐使用 browserslist 的配置而很少单独配置@babel/preset-env 的 targets。

### 参数项：useBuiltIns

useBuiltIns 项取值可以是"usage" 、 "entry" 或 false。如果该项不进行设置，则取默认值 false。

- 配置为 false 时，polyfill 就是我们上节课讲的那样，会全部引入到最终的代码里。
- 配置为 entry 时，Babel 会根据配置的目标环境找出需要的 polyfill 进行部分引入
  - 使用'entry'这种方式的时候，只能 import polyfill 一次，一般都是在入口文件。如果进行多次 import，会发生错误。
- 配置为 usage 时，Babel 除了会考虑配置的目标环境缺失的 API 模块，同时考虑我们项目代码里使用到的 ES6 特性。比如：只有我们使用到的 ES6 特性 API 在目标环境缺失的时候，Babel 才会引入 core-js 的 API 补齐模块。
  - 使用 usage 不需要我们手动引入 polyfill, Babel 会在需要的时候自动引入。

### 参数项：corejs

> 这个参数项只有 useBuiltIns 设置为'usage'或'entry'时，才会生效。

corejs 项取值可以是 2、3 或 false。如果该项不进行设置，则取默认值 2。

某些新 API 只有 core-js@3 里才有，例如数组的 flat 方法，我们需要使用 core-js@3 的 API 模块进行补齐，这个时候我们就把该项设置为 3。

### 参数项：modules

modules 项取值可以是"amd"、"umd"、"systemjs"、"commonjs"、"cjs"、"auto" 或 false。如果该项不进行设置，则取默认值 auto

该项用来设置是否把 ES6 的模块化语法改成其它模块化语法。

我们常见的模块化语法有两种：（1）ES6 的模块法语法用的是 import 与 export；（2）commonjs 模块化语法是 require 与 module.exports。

在该参数项值是'auto'或不设置的时候，会发现我们转码前的代码里 import 都被转码成 require 了。

如果我们将参数项改成 false，那么就不会对 ES6 模块化进行更改，还是使用 import 引入模块。

使用 ES6 模块化语法有什么好处呢。在使用 Webpack 一类的打包工具，可以进行静态分析，从而可以做 tree shaking 等优化措施。

## @babe/plugin-transform-runtime

### 其三大作用：

1.自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers 里的辅助函数来替代；

2.当代码里使用了 core-js 的 API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的 core-js/stable;

3.当代码里使用了 Generator/async 函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的 regenerator-runtime/runtime；

### 作用 1 示例

#### 示例一：

> 使用 @babel/preset-env 做语法转换：
> 配置文件内容如下

```json
{
  "presets": ["@babel/env"],
  "plugins": []
}
```

转换前的代码使用了 ES6 的 class 类语法：

```js
class Person {
  sayname() {
    return 'name'
  }
}
var john = new Person()
console.log(john)
```

Babel 转换后的代码如下

```js
'use strict'
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}
var Person = /*#__PURE__*/ (function () {
  function Person() {
    _classCallCheck(this, Person)
  }
  _createClass(Person, [
    {
      key: 'sayname',
      value: function sayname() {
        return 'name'
      },
    },
  ])
  return Person
})()
var john = new Person()
console.log(john)
```

可以看到转换后的代码上面增加了好几个函数声明，这就是注入的函数，我们称之为**辅助函数**。

@babel/preset-env 在做语法转换的时候，注入了这些函数声明，以便语法转换后使用。

但样这做存在一个问题。在我们正常的前端工程开发的时候，少则几十个 js 文件，多则上千个。如果每个文件里都使用了 class 类语法，那会导致每个转换后的文件上部都会注入这些相同的函数声明。这会导致我们用构建工具打包出来的包非常大。

那么怎么办？一个思路就是，我们把这些函数声明都放在一个 npm 包里，需要使用的时候直接从这个包里引入到我们的文件里。这样即使上千个文件，也会从相同的包里引用这些函数。通过 webpack 这一类的构建工具打包的时候，我们只会把使用到的 npm 包里的函数引入一次，这样就做到了复用，减少了体积。

@babel/runtime 就是上面说的这个 npm 包，@babel/runtime 把所有语法转换会用到的辅助函数都集成在了一起。

#### 示例二：

> 使用 @babel/preset-env 做语法转换：

安装相关依赖包

```bash
npm install --save @babel/runtime
npm install --save-dev @babel/cli @babel/core  @babel/preset-env
```

我们手动把辅助函数替换掉函数声明，之前文件的代码就变成如下所示：

```js
'use strict'
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck')
var _defineProperties = require('@babel/runtime/helpers/defineProperties')
var _createClass = require('@babel/runtime/helpers/createClass')
var Person = /*#__PURE__*/ (function () {
  function Person() {
    _classCallCheck(this, Person)
  }
  _createClass(Person, [
    {
      key: 'sayname',
      value: function sayname() {
        return 'name'
      },
    },
  ])
  return Person
})()
var john = new Person()
console.log(john)
```

这样就解决了代码复用和最终文件体积大的问题。

不过，这么多辅助函数要一个个记住并手动引入，平常人是做不到的，我也做不到。

这个时候，Babel 插件@babel/plugin-transform-runtime 就来帮我们解决这个问题。

#### 示例三：

> 我们使用 @babel/plugin-transform-runtime 来自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers 里的辅助函数来替代。这样就减少了我们手动引入的麻烦。

修改 babel 配置文件的代码

```json
{
  "presets": ["@babel/env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

转换前源代码

```js
class Person {
  sayname() {
    return 'name'
  }
}
var john = new Person()
console.log(john)
```

转换后的代码

```js
'use strict'
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck'),
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass'),
)
var Person = /*#__PURE__*/ (function () {
  function Person() {
    ;(0, _classCallCheck2['default'])(this, Person)
  }
  ;(0, _createClass2['default'])(Person, [
    {
      key: 'sayname',
      value: function sayname() {
        return 'name'
      },
    },
  ])
  return Person
})()
var john = new Person()
console.log(john)
```

可以看到，它生成的代码比我们完全手动引入@babel/runtime 里的辅助函数更加优雅。

实际前端开发的时候，我们除了安装 @babel/runtime 这个包外，一定会安装@babel/plugin-transform-runtime 这个 Babel 插件包的。

### 作用 2 示例

对于上一节的配置文件，转换如下代码

```js
var obj = Promise.resolve()
```

转换后的结果仍然是

```js
var obj = Promise.resolve()
```

polyfill 只是补齐了浏览器的 window.Promise 对。不过这里修改的原型上或者全局上的变量.

这里就会产生一个问题，如果我用到一个库文件或者 npm 包，它的内容是通过修改全局上的变量来达到兼容低版本浏览器的，如果我们项目中也适用此类修改，并且是不同版本的，就会产生一些冲突。

那么有没有办法开发一个库文件或者 npm 包时，不污染全局变量，同时兼容低版本浏览器呢？

答案是有的，就是@babel/plugin-transform-runtime 插件。

使用配置文件

安装依赖包

```bash
npm install --save @babel/runtime-corejs3
npm install --save-dev @babel/cli @babel/core  @babel/preset-env @babel/plugin-transform-runtime
```

```json
{
  "presets": ["@babel/env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

转换前的代码

```js
var obj = Promise.resolve()
```

转换后的代码

```js
'use strict'

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault')
var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/promise'),
)
var obj = _promise.default.resolve()
```

看到效果了没？@babel/plugin-transform-runtime 把我们代码里的 Promise 变成了\_promise["default"]，而\_promise["default"]拥有 ES 标准里 Promise 所有的功能。现在，即使浏览器没有 Promise，我们的代码也能正常运行。

细心的你可能已经发现了，我们安装 npm 包的时候，安装的是@babel/runtime-corejs3，而上一节我们安装的是@babel/runtime。

看名字挺像的，那么这两者有什么不同呢？

在我们不需要开启 core-js 相关 API 转换功能的时候，我们只需要安装@babel/runtime 就可以了。上一节我们已经知道，@babel/runtime 里存放的是 Babel 做语法转换的辅助函数。

在我们需要开启 core-js 相关 API 转换功能的时候，就需要安装@babel/runtime 的进化版@babel/runtime-corejs3。这个 npm 包里除了包含 Babel 做语法转换的辅助函数，也包含了 core-js 的 API 转换函数。

除了这两个包，还有一个@babel/runtime-corejs2 的包。它和@babel/runtime-corejs3 的功能是一样的，只是里面的函数是针对 core-js2 版本的。

上面的例子主要是拿 Promise 来讲的，它属于作用 2，即对 core-js 的 API 进行转换。其实理解了作用 2，也就理解了作用 3。

下面简单说一下作用 3。

在之前章节，若我们转码前代码里有 Generator 函数或 async 函数，转码后需要引入'regenerator-runtime/runtime'做全局 API 补齐。全局 API 补齐必然会对浏览器的 window 对象进行修改，如果我们不想要污染 window，那么我们就不能引入'regenerator-runtime/runtime'了。

这个时候，我们可以开启@babel/plugin-transform-runtime 的作用 3，对 Generator/async 进行 API 转换。需要注意的是，@babel/plugin-transform-runtime 对 Generator/async 进行 API 转换功能，默认是开启的，不需要我们设置。

### @babe/plugin-transform-runtime 配置项

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
// 默认值如下
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        "corejs": false,
        "regenerator": true,
        "useESModules": false,
        "absoluteRuntime": false,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
```

#### helpers

该项是用来设置是否要自动引入辅助函数包，这个我们当然要引入了，这是@babel/plugin-transform-runtime 的核心用途。该项取值是布尔值，我们设置为 true，其默认值也是 true，所以也可以省略不填。

#### corejs 和 regenerator

这两项是用来设置是否做 API 转换以避免污染全局环境，regenerator 取值是布尔值，corejs 取值是 false、2 和 3。在前端业务项目里，我们一般对 corejs 取 false，即不对 Promise 这一类的 API 进行转换。而在开发 JS 库的时候设置为 2 或 3。regenerator 取默认的 true 就可以

#### useESModules

该项用来设置是否使用 ES6 的模块化用法，取值是布尔值。默认是 fasle，在用 webpack 一类的打包工具的时候，我们可以设置为 true，以便做静态分析。

#### absoluteRuntime

该项用来自定义@babel/plugin-transform-runtime 引入@babel/runtime/模块的路径规则，取值是布尔值或字符串。没有特殊需求，我们不需要修改，保持默认 false 即可。

## 其他

### @babel/polyfill = core-js + regenerator-runtime

要是浏览器不支持的 API 可以自己写一个模拟函数，这些模拟函数叫做 `polyfill`。比如要使用的新的 API 比较 Promise、WeakMap 等新的内置类型 或者 `Array.from`、`Object.assign` 等新的内置对象方法，我们需要使用 `core-js3` 这个 npm 库。要使用生成器函数 `（function *）`需要使用 `regenerator-runtime` 这个 npm 库。

`@babel/polyfill` 这个库已经不推荐使用。它实际上就是 `core-js2` 和 `regenerator-runtime` 的集合。`corejs-2` 也已经不推荐使用，现在单独安装和引用 `corejs-3` 和 `regenerator-runtime` 就行。

另外，@babel/runtime 用来抽离公共辅助函数。这样可以把每个项目里都注入的辅助函数抽离出来，减少代码体积。为了自动使用 @babel/runtime 里的函数，还需要 @babel/plugin-transform-runtime 插件。

### @babel/plugin-transform-runtime

为了使用这些函数，需要在 babel 的配置文件配置`@babel/preset-env`。

安装依赖库

```bash
npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/plugin-transform-runtime
npm install --save @babel/runtime core-js@3
```

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

### @babel/runtime-corejs3 避免污染全局环境

安装依赖库

```bash
npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/plugin-transform-runtime
npm install --save @babel/runtime-corejs3
```

> @babel/runtime-corejs3 相当于 @babel/runtime + 不污染环境的 core-js@3。

上面的方案默认会影响全局变量，在日常开发项目时是没有关系的。但是如果是用来开发 JS 库或者 npm 库的时候，就需要避免污染全局变量。我们就需要使用 @babel/runtime-corejs3

```json
{
  "presets": [["@babel/preset-env"]],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
