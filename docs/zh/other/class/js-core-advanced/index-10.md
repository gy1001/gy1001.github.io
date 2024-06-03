# 10-函数

函数是参与程序运行的重要个体。

常见的函数形式有四种情况，分别是函数声明、函数表达式、匿名函数与自执行函数。

## 01-函数声明

函数声明是指利用关键字 function 来声明一个函数。

```javascript
function fn() {
  console.log('function')
}
```

每一个函数都会产生一个自己的作用域，函数内部可以访问上层函数作用域中的变量。

```javascript
function fn() {
  var a = 20
  function bar() {
    var b = 10
    return a + b
  }

  return bar()
}

fn() // 30
```

## 02-函数表达式

函数表达式是将一个函数体赋值给一个变量的过程。

```javascript
const fn = function () {}
```

因此，我们理解函数表达式时，可以与变量共同理解。如果我们使用 var 来声明变量，那么执行顺序其实如下：

```javascript
var fn = undefined
fn = function () {}
```

此时需要考虑到变量提升带来的影响，这是与函数声明不同的地方

```javascript
fn() // TypeError: fn is not a function

var fn = function () {
  console.log('function')
}
```

我们也可以使用箭头函数的语法，来表示函数体

```javascript
const fn = () => {
  console.log('function')
}

// 等价于
const fn = function () {
  console.log('function')
}
```

函数体赋值的操作，我们还可以在其他很多场景能够遇到，如下。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  // 在构造函数内部中添加方法
  this.getAge = function () {
    return this.age
  }

  // 箭头函数，表示返回 this.name
  this.getName = () => this.name
}

// 给原型添加方法
Person.prototype.getName = function () {
  return this.name
}

// 在对象中添加方法
var a = {
  m: 20,
  getM: function () {
    return this.m
  },
}
```

## 03-匿名函数

顾名思义，匿名函数就是没有名字的函数。通常匿名函数并没有使用一个变量来保存它的引用，匿名函数可以作为一个参数，也作为一个返回值。

setTimeout 中的参数。

```javascript
const timer = setTimeout(function () {
  console.log('延迟1000ms执行该匿名函数')
}, 1000)

// 箭头函数
const timer = setTimeout(() => {
  console.log('延迟1000ms执行该匿名函数')
}, 1000)
```

数数组方法中的参数。

```javascript
const arr = [1, 2, 3]

arr.map(function (item) {
  return item + 1
})

// 箭头函数
arr.forEach((item) => {
  // do something
})
```

匿名函数作为一个返回值。

```javascript
function add() {
  const a = 10
  return function () {
    return a + 20
  }
}

add()()
```

在实际开发中，当匿名函数作为一个返回值时，为了方便调试，我们常常会将匿名函数添加一个名字。这样在 chrome 开发者工具中我们就能知道是它。

```javascript
function add() {
  const a = 10
  return function bar() {
    return a + 20
  }
}

add()()
```

## 04-自执行函数

自执行函数是匿名函数的一个非常重要的应用场景。因为函数会产生独立的作用域，因此我们常常会利用自执行函数来模拟块级作用域。并进一步在此基础上实现模块化的运用。

```javascript
;(function () {
  // ...
})()

// 自执行函数的另外两种写法
;+(function () {})()
!(function () {})()
```

模块化的重要性需要反复强调，我希望读者能够在学习这些基础知识的过程中，慢慢养成对于模块化思维的一个认知与习惯。我们会在闭包的学习章节，对模块化进行深入的学习与分析，这里我们先借助自执行函数来了解模块化。

一个模块可以包括：私有变量、私有方法、公有变量、公有方法。

当我们使用自执行函数创建一个模块，也就意味着，外界已经无法访问该模块内部的任何属性与方法。好在有闭包，作为模块之间能够相互交流的桥梁，让模块能够在我们自己的控制中，选择性地对外开放属性与方法。

```javascript
;(function () {
  // 私有变量
  const age = 20
  const name = 'Tom'

  // 私有方法
  function getName() {
    return `your name is ` + name
  }

  // 共有方法
  function getAge() {
    return age
  }

  // 将引用保存在外部执行环境的变量中，这是一种简单的对外开放方法的方式
  window.getAge = getAge
})()
```

我们可以基于模块化的思路，实现一个简单的状态管理模块。前面的章节中我们已经创建过一个简单的状态管理模块。这里我们将扩展它，以便应对更加复杂的场景。

```javascript
// 自执行创建模块
;(function () {
  // states 结构预览
  // states = {
  //   a: 1,
  //   b: 2,
  //   m: 30,
  //   o: {}
  // }
  var states = {} // 私有变量，用来存储状态与数据

  // 判断数据类型
  function type(elem) {
    if (elem == null) {
      return elem + ''
    }
    return toString
      .call(elem)
      .replace(/[\[\]]/g, '')
      .split(' ')[1]
      .toLowerCase()
  }

  /**
   * @Param name 属性名
   * @Description 通过属性名获取保存在states中的值
   */
  function get(name) {
    return states[name] ? states[name] : ''
  }

  function getStates() {
    return states
  }

  /*
   * @param options {object} 键值对
   * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
   * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
   */
  function set(options, target) {
    var keys = Object.keys(options)
    var o = target ? target : states

    keys.map(function (item) {
      if (typeof o[item] == 'undefined') {
        o[item] = options[item]
      } else {
        type(o[item]) == 'object'
          ? set(options[item], o[item])
          : (o[item] = options[item])
      }
      return item
    })
  }

  // 对外提供接口
  window.get = get
  window.set = set
  window.getStates = getStates
})()

// 具体使用如下

set({ a: 20 }) // 保存 属性a
set({ b: 100 }) // 保存属性b
set({ c: 10 }) // 保存属性c

// 保存属性o, 它的值为一个对象
set({
  o: {
    m: 10,
    n: 20,
  },
})

// 修改对象o 的m值
set({
  o: {
    m: 1000,
  },
})

// 给对象o中增加一个c属性
set({
  o: {
    c: 100,
  },
})
console.log(getStates())
```

## 05-思考题

从参数传入的角度，如何分析如下写法：

```javascript
;(function (ROOT, undefined) {
  function get() {}
  function set() {}
  function getStates() {}

  ROOT.get = get
  ROOT.set = set
  ROOT.getStates = getStates
})(window)
```

```javascript
// 许多 js 的工具库常常会采用这样的方式来封装模块，例如 jQuery
// 或者声明一个 Person 对象
;(function (window, struct, undefined) {
  struct.prototype.getName = function () {
    return this.name
  }

  struct.prototype.getAge = function () {
    return this.age
  }

  window.Person = struct
})(window, function (name, age) {
  this.name = name
  this.age = age
})
```
