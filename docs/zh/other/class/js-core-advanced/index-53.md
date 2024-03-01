# 53-模块化

我们在前面学习了很多方法，用于拆分代码的规模。例如把一段逻辑封装为函数，把一些实例提炼成为类。

我们在用很多方式把一个大的问题，化解为小的问题。

**模块化**，就是在这种思路下提炼出来的工程化解决方案。因此，我们可以在一定的规范之下，引入别人已经封装好的模块用于解决自己的问题，而不需要自己重复封装。

模块最核心的思想是隔离。要有自己的内部属性，内部方法，以及自己来决定哪些属性与方法能够被其他模块访问。但是 JavaScript 在最初并没有模块相关的支持语法。因此我们只能利用许多别的类似的，具备隔离属性的方式来模拟模块。

## 01-模块的发展历程

了解模块发展历程有助于增加我们的知识厚度。目前在实践中，我们仅使用最新的模块化语法。

**1、函数自执行**

因为没有模块化语法，我们常常用自执行函数来模拟模块。

```javascript
// 自执行函数模拟模块化

// Person 模块
(() => {
  // 实例个数，模块内部变量，外部无法直接访问，
  let number = 0
  function Person(name, age) {
    number ++
    this.name = name
    this.age = age
  }

  Person.prototype.getName = function() {
    return this.name
  }

  Person.getInstanceNumber = function() {
    return number
  }

  // 对外抛出接口
  window.Person = Person
})();


// main 模块
(() => {
  // 引入模块
  const Person = window.Person

  const p1 = new Person('Tom', 20)
  const p2 = new Person('Jake', 20)
  const p3 = new Person('Alex', 20)

  p1.getName()

  console.log('实例化个数', Person.getInstanceNumber())
})()
```

**2、CommonJS 规范**

Node 应用的模块，就是采用 CommonJS 规范来实现。

在 nodejs 中，每一个文件就是一个模块，有自己的作用域。因此，在该文件中，定义的变量、函数、类都是私有的。

每个模块内部，`module` 用于代表当前模块。

并且使用 `module.exports` 对外暴露接口。

在其他模块，可以使用 `require` 加载该模块，加载的结果，就是 `module.exports` 的合集。

```javascript
// person 模块
// person.js
let number = 0
function Person(name, age) {
  number++
  this.name = name
  this.age = age
}

// 对外暴露接口
Person.prototype.getName = function () {
  return this.name
}

// 对外暴露接口
module.exports.getInstanceNumber = function () {
  return number
}
module.exports.Person = Person
// main.js
// 引入模块
const person = require('./person.js')

const {Person, getInstanceNumber} = person

const p1 = new Person('Tom', 20)
const p2 = new Person('Jake', 20)
const p3 = new Person('Alex', 20)

p1.getName()
p2.getName()
p3.getName()

console.log('实例化个数', getInstanceNumber())
```

**3、AMD**

AMD 是适用于浏览器环境的异步加载模块规范，它是一种依赖前置的规范。

> 依赖前置：所有的 require 都会提前执行

`require.js` 与 `curl.js` 实现了该规范。该规范使用 `define` 定义一个模块

```javascript
// person.js
define(function() {
  let number = 0
  function Person(name, age) {
    number++
    this.name = name
    this.age = age
  }

  // 对外暴露接口
  Person.prototype.getName = function () {
    return this.name
  }

  function getInstanceNumber() {
    return number
  }

  // 对外暴露接口
  return {
    getInstanceNumber,
    Person
  }
})
// main.js
// 引入模块
define(['./person.js'], function(person) {
  const { Person, getInstanceNumber } = person

  const p1 = new Person('Tom', 20)
  const p2 = new Person('Jake', 20)
  const p3 = new Person('Alex', 20)

  p1.getName()
  p2.getName()
  p3.getName()

  console.log('实例化个数', getInstanceNumber())
})
```

**4、CMD**

CMD 规范是模仿 CommonJS，由阿里玉伯提出，`sea.js` 实现了该规范，这是一种就近依赖的规范

> 就近依赖：下载完之后，并不执行加载，回调函数中遇到 require 时才执行

```javascript
// person.js
define(function(require, exports, module) {
  let number = 0
  function Person(name, age) {
    number++
    this.name = name
    this.age = age
  }

  // 对外暴露接口
  Person.prototype.getName = function () {
    return this.name
  }

  // 对外暴露接口
  module.exports.getInstanceNumber = function () {
    return number
  }
  module.exports.Person = Person
})
// mian.js
define(function(require) {
  const person = require('./person.js')
  const { Person, getInstanceNumber } = person

  const p1 = new Person('Tom', 20)
  const p2 = new Person('Jake', 20)
  const p3 = new Person('Alex', 20)

  p1.getName()
  p2.getName()
  p3.getName()

  console.log('实例化个数', getInstanceNumber())
})
```

**5、UMD**

UMD 是一个兼容写法，一个开源模块可能会提供给 CommonJS 标准的项目中实现，也可能提供给 AMD 标准的项目使用。UMD 应运而生。

```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['person'], factory)
  } else if (typeof define === 'function' && define.cmd) { // CMD
    define(function(require, exports, module) {
      module.exports = factory()
    })
  } else if (typeof exports === 'object') { // CommonJS
    module.exports = factory()
  } else { // global
    root.person = factory()
  }
})(this, function() {
  let number = 0
  function Person(name, age) {
    number++
    this.name = name
    this.age = age
  }

  // 对外暴露接口
  Person.prototype.getName = function () {
    return this.name
  }

  function getInstanceNumber () {
    return number
  }

  return {
    Person,
    getInstanceNumber
  }
})
```

很多开源模块都会采用这种兼容性的写法。

**6、ES6 Modules**

ES6 提出了新的模块化语法规范。

这也是目前我们在实践开发中，使用得最多的规范。

```javascript
// person.js
let number = 0
export function Person(name, age) {  // 暴露接口
  number++
  this.name = name
  this.age = age
}

// 对外暴露接口
Person.prototype.getName = function () {
  return this.name
}

// 对外暴露接口
export const getInstanceNumber = function () {
  return number
}
// main.js
// 引入模块
import {Person, getInstanceNumber} from './person.js'

const p1 = new Person('Tom', 20)
const p2 = new Person('Jake', 20)
const p3 = new Person('Alex', 20)

p1.getName()
p2.getName()
p3.getName()

console.log('实例化个数', getInstanceNumber())
```