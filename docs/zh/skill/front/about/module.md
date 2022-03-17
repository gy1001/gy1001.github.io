# Module-模块化

JavaScript 语言诞生至今，模块规范化之路曲曲折折。社区先后出现了各种解决方案，包括 **AMD、CMD、CommonJS** 等，而后 ECMA 组织在 JavaScript 语言标准层面，增加了模块功能（因为该功能是在 ES2015 版本引入的，所以在下文中将之称为 **ES6 module** ）。

今天我们就来聊聊，为什么会出现这些不同的模块规范，它们在所处的历史节点解决了哪些问题？

## 何谓模块化？

或根据功能、或根据数据、或根据业务，将一个大程序拆分成互相依赖的小文件，再用简单的方式拼装起来。

## 模块化之前的引用方式

### 最开始的样子

```html
<script>
	function add(a, b) {
		return a + b
	}
	add(1, 2)
</script>
```

这样带来的问题

1. 代码复用率低
2. 全局作用域污染：无法保证不与其他模块发生变量名冲突，而且模块成员之间没什么关系。
3. 可维护性差

### 命名空间和 IIEF

为了解决以上问题，就出现了**命名空间、IIEF**

#### 命名空间

```javascript
var namespace = {}
namespace.add = function (a, b) {
	return a + b
}
namespace.add(1, 2)
```

这样书写解决了以上问题，但是还有一些问题没有解决，那就是需要注意

##### 缺点：

###### 文件依赖的顺序

```html
<script src="./jquery.js"></script>
<script src="./utils.js"></script>
// 如果 utils.js 依赖于 jquery.js， 那么引用顺序就必须是 jquery 在前面，否则就会报错
```

###### 外部可以随意修改内部成员

```javascript
// 例如外部调用
utils.add = 100
// 其他地方在调用 utils.add(1,2) 就会报错
```

### IIEF: 立即执行函数

> 可以通过立即函数可以达到隐藏细节的目的，这样在模块外部无法修改我们暴露的变量、函数

```javascript
// IIEF
var utils = (function () {
	var module = {}
	module.add = function (a, b) {
		return a + b
	}
	return module
})()
utils.add(1, 2)
```

### 再增强一点：引入依赖

> 这就是模块模式，也是现代模块实现的基石

```javascript
var Module = (function ($) {
	var _$body = $('body')
	var foo = function () {
		console.log(_$body)
	}
	return {
		foo: foo,
	}
})(jQuery)
Module.foo()
```

## 为什么要模块化

1. 网页变为单页面应用
2. 复杂度增加
3. 解耦性越来越被需要
4. 部署希望得到优化，提高性能

## 模块化希望带来的好处

1. 避免命名冲突，减少命名空间污染
2. 更好的文件分离，按需加载
3. 更高的复用性
4. 更高的维护性

## 模块化以后带来的问题

页面由引用一个 js 文件变为引用多个 js 文件

```html
<scirpt src="a.js"></scirpt>
<scirpt src="b.js"></scirpt>
<scirpt src="c.js"></scirpt>
<scirpt src="d.js"></scirpt>
<scirpt src="e.js"></scirpt>
<scirpt src="f.js"></scirpt>
```

意味着请求数量变多，同时可能存在依赖顺序的问题

### 带来的缺点

1. 请求多
2. 依赖模糊
3. 难以维护

## 模块化规范

### CommonJs 或者叫做 CJS：用在服务器端

> 网页端没有模块化编程时候只是页面 JS 逻辑复杂，但还是可以工作下去，在服务端却一定要有模块，所以 JS 发展这么多年，第一个流行的模块化规范却是由服务端的 JS 应用带来的，CommonJS 规范是由 nodejs 发扬光大，这标志着 JS 模块化正式登上舞台

1. 定义模块

   根绝 CommonJS 规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义的变量为 global 对象的属性

2. 模块输出

   模块只有一个输出，**module.exports** 对象，我们需要把模块希望输出的内容放入该对象

3. 暴露模块方式（暴露的模块本质都是是 exports 对象）

   1. exports.xxx = value
   2. module.exports = xxxx

4. 加载模块：

   加载模块使用 **require** 方法，该方法读取一个文件并执行，返回文件内部的 **module.exports** 对象

5. 实现

   1. 服务器端实现： Node.js

   2. 浏览器端实现：Browserify （Browserify 是一个 node.js 模块，主要用于改写现有的 CommonJS 模块，使得浏览器端也可以使用这些模块。）

      注意：浏览器不识别 require 方法，需要提前编译打包处理

```javascript
// utils.js文件
function add(a, b) {
	return a + b
}
module.exports = { add }

// main.js
var nameModule = require('./utils.js')
nameModule.add(1, 2)
```

缺点：**加载模块是同步的**，只有加载完后才能执行后面的操作；**现加载现用**，在服务器端编程，加载的模块一般存在本地硬盘里，加载起来比较快，不用考虑异步加载的问题，因为 CommonJS 规范比较适用。然后，并不适用于浏览器环境，同步意味着阻塞线程，浏览器资源的加载方式是异步的。

解决方式之一：开发一个服务端组件，对模块化代码最静态分析，将模块与它的依赖列表一起返回浏览器。这确实很好使，不过需要服务端加载额外的组件，需要调整底层架构，不太友好

另一个思路，用一套标准模板来封装定义，但是对于模块怎么定义和怎么加载，产生了分歧？

### AMD

> AMD 是`"Asynchronous Module Definition"`的缩写，意思就是"异步模块定义"。

它采用异步加载方式加载模块，模块的加载不影响它后面的语句的运行，所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完毕之后，这个回调函数才会执行。

由于不是 JS 原生支持，使用 AMD 规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎的 RequireJ，实际上 AMD 是 requireJS 在推广过程中对模块定义的规范化的产生。

Requirejs 也是采用 require() 加载模块，但是不同于 CommonJS，它要求两个参数

```javascript
require([module], callback)
```

第一个参数 module 是一个数组，里面的成员就是要加载的模块，第二个参数是 callback 则是加载成功之后的回调函数。

Requirejs 它也定义了一个函数 define, 他是全局变量，用来定义模块：

```javascript
define(id?, dependencies?, factory)
```

参数说明

- id: 指定义中模块的名字，可选，如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级的”和绝对的（不允许相对名字）

- dependencies: 是一个当前模块依赖的，已经被模块定义的模块标识的数组字面量。依赖参数是可选的，如果忽略此参数，他应该默认为 ["require", "exports", "module" ]. 然而，如果工厂方法的长度属性小于 3，加载器会选择以函数的长度属性指定的参数个数调用工厂方法

  - define(name，[] , callback); 这个 name 可以省掉，默认是文件名称；当然也可以自定义，一旦我们定义了 name，根据源代码我们可以发现 define 函数内部其实就是把这个 name 以及依赖模块、回调函数作为一个对象存储在全局的数组当中，也就是 defQueue.push([name,deps,callback])；那么这个 name 就是这个组件注册的的 ID
  - require（[name , name2],callback）; 系统首先会在全文检索 path 中是否对应的路径，如果没有自然把他作为路径拼接在 baseUrl 上去异步加载这个 js 文件，加载时从源代码中可以看到 ,var data = getScriptData(evt)；返回的 data.id 其实就是 name，然后执行 contex.completeLoad(node.id)，其内部就很清楚了，把 define 中注册的 name 和这里得到的 name 进行比较如果相等就执行
  - **所以道理就是：require 和 define 的 name 必须保证一致！**

- factory: 工厂方法，模块初始化要执行的函数或者对象。如果为函数，他应该只执行一次，如果是对象，此对象应该为模块的输出值。

  举个例子

  ```javascript
  require(['foo', 'bar'],
      function ( foo, bar ) {
          foo.doSomething();
          bar.doSomething();
      }，
      function(err){
          console.log(err)
      }
  );
  ```

### CMD

> CMD 即`Common Module Definition`通用模块定义

CMD 规范是国内发展起来的，就像 AMD 有一个 requirejs, CMD 有个浏览器的实现 SeaJS. SeaJS 要解决的问题和 requirejs 一样，只不过在模块定义方式和模块加载(可以说运行、解析) 时机上有所不同。

在 CMD 中，一个模块就是一个文件，代码的书写格式如下：

```javascript
// 定义有依赖的模块
define(function(require, exports, module){
  // 模块代码
  // 引入依赖模块(同步)
  var module2 = require('./module2')
  // 引入依赖模块(异步)
  require.sync("./module3", function(m3){
    // 模块代码
  })
  // 暴露模块
  export.xxx = value
})
```

- require 是可以把其他模块导入进来的一个参数
- exports 是可以把模块内的一些属性和方法导出，
- module 是一个对象，上面存储了与当前模块相关联的一些属性和方法

### 注意区别 AMD 和 CMD：

**AMD 是依赖关系前置，在定义模块的时候就要声明其依赖的模块**

**CMD 是按需加载依赖就近，只有在用到某个模块的时候再去 require**

```javascript
// CMD
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  // 此处略去 100 行
  var b = require('./b') // 依赖可以就近书写
  b.doSomething()
  // ...
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
  a.doSomething()
  // 此处略去 100 行
  b.doSomething()
  ...
})
```

tips: RequireJS 其实也是支持 CMD 这种写法的

### UMD

> `UMD (Universal Module Definition)`，就是一种`javascript`通用模块定义规范，让你的模块能在`javascript`所有运行环境中发挥作用。

UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式, 在判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

```javascript
;(function (root, factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		console.log('是commonjs模块规范，nodejs环境')
		module.exports = factory()
	} else if (typeof define === 'function' && define.amd) {
		console.log('是AMD模块规范，如require.js')
		define(factory())
	} else if (typeof define === 'function' && define.cmd) {
		console.log('是CMD模块规范，如sea.js')
		define(function (require, exports, module) {
			module.exports = factory()
		})
	} else {
		console.log('没有模块环境，直接挂载在全局对象上')
		root.umdModule = factory()
	}
})(this, function () {
	return {
		name: '我是一个umd模块',
	}
})
```

### ES6 modules

> 也需要对依赖模块进行编译打包, 使用 **Babel**

```javascript
// a.js
import { age } from './b.js'

console.log(age)
setTimeout(() => {
	console.log(age)
	import('./b.js').then(({ age }) => {
		console.log(age)
	})
}, 100)

// b.js
export let age = 1

setTimeout(() => {
	age = 2
}, 10)
// 打开 index.html 引用的是 a.js
// 执行结果：
// 1
// 2
// 2
```

### CommonJS 与 ES6 的区别

1. **CommonJS 是运行时候加载，ES6 模块是编译时候输出接口**

   原因：因为 CommonJS 加载的时候是一个对象 (即 module.exports 属性)，该对象只有在脚本运行完才会生成；而 ES6 模块不是对象，它的对外接口只是一个静态定义，在代码静态解析阶段就会生成。

   ES6 模块的设计思想是尽量放入静态化，使得在编译时候就确定依赖关系

   而 CommonJS 就只能在运行时候确定这些输入和输出的变量

2. **CommonJS 模块输出的是一个值的复制，ES6 模块输出的值是值的引用**

3. CommonJS 加载的是整个模块，即将所有的方法全部加载出来，ES6 可以单独加载其中某个方法

4. CommonJS 中的 this 指向当前模块，ES6 中的 this 指向 undefined

5. CommonJS 默认非严格模式，ES6 的模块自动采用严格模式

举个例子

```javascript
// CommonJS 模块
let { stat, exists, readFile } = require('fs')
// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile
// 上面代码的实质就是整体加载 fs 模块，生成一个对象 _fs，然后再从这个对象上面读取需要的三个方法，这种加载方式称为“运行时加载”，因为只有运行时候才能得到这个对象，导致完全无法在编译时候做到 "静态优化"
```

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs'
// 上面代码的实质就是从 fs 模块加载三个方法，其他方法不加载。这种加载方式成为 "编译时加载"或者 "静态加载"，即ES6 可以在编译时候就完成模块加载，效率要比 CommonJS 模块的加载方式高。
```

## 参考文献

[【深度全面】前端 JavaScript 模块化规范进化论](https://segmentfault.com/a/1190000023711059)

[前端模块化](https://www.cnblogs.com/dolphinX/p/4381855.html)

[理解 CommonJS、AMD、CMD 三种规范](https://zhuanlan.zhihu.com/p/26625636)

[阮一峰：Javascript 模块化编程（三）：require.js 的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

[RequireJS 用法解析](https://www.jianshu.com/p/e355aaa9ebce)

[前端模块化（CommonJs,AMD 和 CMD）](https://www.jianshu.com/p/d67bc79976e6)

[从 CommonJS 到 Sea.js #269](https://github.com/seajs/seajs/issues/269)

[可能是最详细的 UMD 模块入门指南](https://www.jianshu.com/p/9f5a0351a532)

## 推荐文章

[深入学习 CommonJS 和 ES6 模块化规范](https://zhuanlan.zhihu.com/p/346405395)

[js 当中 CommonJS 和 es6 的模块化引入方案以及比较](https://blog.csdn.net/jackTesla/article/details/80796936)

[阮一峰：Node.js 如何处理 ES6 模块](http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

## 视频链接

[尚硅谷 JS 模块化教程(js 模块化精讲含 commonjs、AMD、ES6、](https://www.bilibili.com/video/BV18s411E7Tj?spm_id_from=333.999.0.0)

<CommentService />
