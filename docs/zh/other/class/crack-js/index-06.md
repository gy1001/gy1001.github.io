# 06-从函数到函数式编程之路

## 01: 执行上下文、IIFE、闭包、作用域、变量提升、暂时性死区重要概念一览

### 执行上下文

> 执行上下文 Execution Context: this 变量环境(var)、词法环境(let、const)、外部环境

- JavaScript 代码被解析和执行时的环境
- 这个是以程序的角度出发的

```javascript
var gName = 'global的name'

function getName() {
  var name = 'name'
  let bName = 'bName'
  {
    let name = 'let的name'
    const bName = 'const的bName'
    console.log('name:', name, ',', 'otherName:', bName)
  }
  console.log('name:', name, ',', 'otherName:', bName)
  console.log('gName:', gName)
}

getName()

// 打印如下
name: let的name , otherName: const的bName
name: name , otherName: bName
gName: global的name
```

#### 上下文

- 全局执行上下文
- 函数执行上下文
- eval 函数执行上下文

#### 执行栈（调用栈）

- 是一种拥有(后进先出)数据结构的栈，被用来存储代码运行时创建的所有执行上下文

```javascript
function outer() {
  var outerName = 'outerName'
  console.log(outerName)
  inner()
}

function inner() {
  var innerName = 'innerName'
  console.log(innerName)
}
outer()

// 打印如下
outerName
innerName
```

```javascript
function sum1(num1) {
  function sum2(num2) {
    debugger
    const r = sum3(num2)
    debugger
    return r
  }

  function sum3(num3) {
    debugger
    const r = sum4(num3)
    debugger
    return r
  }

  function sum4(num4) {
    debugger
    const r = sum5(num4)
    debugger
    return r
  }

  function sum5(num5) {
    debugger
    return num5
  }

  return sum2(num1)
}
sum1(1)
```

```javascript
// 递归爆栈
function sum(num) {
  if (num === 1) {
    debugger
    return 1
  }
  return num + sum(num - 1)
}

sum(5)

// 浏览器中执行
sum(10464)

// chrome浏览器中爆栈
// sum(10465)
```

### 作用域

- 作用域：一个独立的区域。主要的用途就是隔离变量

- 全局作用域
- 函数作用域
- 块作用域（ES6）

```javascript
// 全局作用域
var name = 'global的name'

function getName() {
  let name = 'getName的name'
  console.log('getName:', name)
}

{
  console.log('块级作用域name', name)
}

console.log('全局作用域:', name)

getName()

var globalName = 'globalName'
function getName() {
  var name = 'getName的name'
  {
    console.log('name:', globalName)
  }
}
getName()
```

```javascript
// 函数作用域
function getName() {
  var test = '函数作用域'
  console.log('函数作用域test=', test)
}

{
  console.log('块级作用域test=', test) //ReferenceError: test is not defined
}

console.log('全局作用域test=', test) //ReferenceError: test is not defined

getName()
```

```javascript
// 块级作用域
{
  let test = '块级作用域'
  console.log('块级作用域:', test)
}

console.log('全局作用域:', test)

function showTest() {
  console.log('函数作用域:', test)
}

showTest()

for (var i = 0; i < 2; i++) {
  console.log('for var=', i)
  console.log('for var=', i)
}
console.log('var:', i)

for (let j = 0; j < 2; j++) {
  console.log('for let:', i)
}
console.log('let:', j)
```

#### 作用域链

- 作用域也可以根据代码层次分层，以便子作用域可以访问父级作用域，而不能从父作用域引用子作用域中的变量和引用

```javascript
var a = 1
function test() {
  console.log(a)
}
function test1() {
  var a = 2
  test()
}
test1()
```

### 执行上下文 VS 作用域

| 类别       | 创建时间         | 运行机制 |
| ---------- | ---------------- | -------- |
| 作用域     | 函数创建时已确定 | 静态     |
| 执行上下文 | 运行时创建       | 动态     |

### 变量提升

- 访问“后”声明的变量

```javascript
console.log('num1=', num1)
console.log('num2=', num2)

var num1 = 1
var num2 = 2

console.log('num1=', num1)
console.log('num2=', num2)

// ==> 等价于
// var num1;
// var num2;

// console.log("num1=",num1);
// console.log("num2=",num2);
// num1=1;
// num2=2;

// 运行结果
num1 = undefined
num2 = undefined
num1 = 1
num2 = 2
```

```javascript
// 变量提升2: 函数的提升
console.log('name:', name)

var name = 'name'
function name() {
  console.log('name')
}

// name: [Function: name]
```

### 暂时性死去

- let、const 变量显式赋值之前不能对变量进行读写，否则就会报错

```javascript
var num = 1
{
  num = 2
  let num
}

// ReferenceError: Cannot access 'num' before initialization
```

### 闭包

- 内部函数访问了上层作用域链中的变量对象

```javascript
// setTimeout函数不止有第三个参数，后面甚至可以紧跟无数个参数！三个以后得参数可以作为前面的回调函数的附加参数.

for (var i = 0; i < 5; ++i) {
  setTimeout(function () {
    console.log(i + ' ')
  }, 100)
}
// 5 5 5 5 5

for (var i = 0; i < 5; ++i) {
  setTimeout(
    function (i) {
      console.log(i + ' ')
    },
    100,
    i,
  )
}
// 0 1 2 3 4
```

```html
// 闭包
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      var globalScope = '全局作用域'

      function checkScope() {
        var a = 1
        var b = 1
        console.log('b:', b)
        function returnFun() {
          return a++
        }
        return returnFun
      }

      var test = checkScope()

      const a1 = test()
      console.log('a1:', a1)

      const a2 = test()
      console.log('a2:', a2)

      const a3 = test()
      console.log('a3:', a3)
    </script>
  </body>
</html>

// 执行效果如下 b: 1 a1: 1 a2: 2 a3: 3
```

```html
// 闭包
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      var globalScope = '全局作用域'

      function checkScope() {
        var a = 1
        var b = 1
        console.log('b:', b)
        function returnFun() {
          return a++
        }
        return returnFun
      }

      var test = checkScope()

      const a1 = test()
      console.log('a1:', a1)

      const a2 = test()
      console.log('a2:', a2)

      const a3 = test()
      console.log('a3:', a3)

      var test1 = checkScope()
      const a4 = test1()
      console.log('test1 a4:', a4)
    </script>
  </body>
</html>

// 执行结果如下 b: 1 a1: 1 a2: 2 a3: 3 b: 1 a4: 1
```

### IIFE

- Immediately Invoked Function Expressions 也就是立即调用函数表达式

```javascript
;(function (num1, num2) {
  console.log(num1 + num2)
})(7, 9)
;(function (num1, num2) {
  console.log(num1 + num2)
})(7, 9)
;+(function (num1, num2) {
  console.log(num1 + num2)
})(7, 9)
// + 也可以是 - void 等运算符
```

#### 应用

```javascript
// for(var i=0;i<5;i++){
//     setTimeout(function(){console.log(i)},i*1000);
// }

for (var i = 0; i < 5; i++) {
  setTimeout(
    (function (i) {
      console.log(i)
    })(i),
    i * 1000,
  )
}

for (var i = 0; i < 5; i++) {
  setTimeout(console.log, i * 1000, i)
}
```

## 02：name,length,caller 等重要却少被关注的属性

### Function.name

> 函数的 `name` 属性可用于在调试工具或错误消息中标识该函数。

```javascript
function sum(num1, num2) {
  return num1 + num2
}

console.log('name:', sum.name) // name: sum
```

#### Function.name 总结

```javascript
// 函数声明的名称: name 属性会返回函数的名称。
function doSomething() {}
doSomething.name // "doSomething"

//构造函数的名称: 使用new Function(...)语法创建的函数或只是 Function(...) create Function对象及其名称为“anonymous”。
new Function().name // "anonymous"

// 推断函数名称: 变量和方法可以从句法位置推断匿名函数的名称（ECMAScript 2015 中新增）。
var f = function () {}
var object = {
  someMethod: function () {},
}

console.log(f.name) // "f"
console.log(object.someMethod.name) // "someMethod"

// 你可以在 函数表达式中定义函数的名称：
var object = {
  someMethod: function object_someMethod() {},
}

console.log(object.someMethod.name) // "object_someMethod"

try {
  object_someMethod
} catch (e) {
  alert(e)
}
// ReferenceError: object_someMethod is not defined

// 你不能更改函数的名称，此属性是只读的：

//简写方法的名称
var o = { foo() {} }
o.foo.name // "foo";

// 绑定函数的名称: Function.bind() 所创建的函数将会在函数的名称前加上"bound " 。
function foo() {}
foo.bind({}).name // "bound foo"

// getters 和 setters 的函数名: 当通过 get 和 set 访问器来存取属性时，"get" 或 "set" 会出现在函数名称前。
var o = {
  get foo() {},
  set foo(x) {},
}

var descriptor = Object.getOwnPropertyDescriptor(o, 'foo')
descriptor.get.name // "get foo"
descriptor.set.name // "set foo";

// 类中的函数名称: 你可以使用obj.constructor.name来检查对象的“类”（但请务必阅读以下警告）：
function Foo() {} // ES2015 Syntax: class Foo {}
var fooInstance = new Foo()
console.log(fooInstance.constructor.name) // logs "Foo"

// Symbol 作为函数名称: 如果Symbol 被用于函数名称，并且这个 symbol 具有相应的描述符，那么方法的名字就是方括号中的描述符。
var sym1 = Symbol('foo')
var sym2 = Symbol()
var o = {
  [sym1]: function () {},
  [sym2]: function () {},
}
o[sym1].name // "[foo]"
o[sym2].name // ""
```

### Function.length 定义

- length 是函数对象的一个属性值，指该函数有多少个必须要换入的参数，即形参的个数
- 不包含剩余参数
- 不包含有默认值的参数
- bind 之后的 length：length - bind 的参数个数

```javascript
function sum(num1, num2) {
  return num1 + num2
}

console.log('length:', sum.length) // length: 2
```

```javascript
// 与 arguments.length 的区别
function sum(num1, num2) {
  console.log('arguments.length:', arguments.length)
  return num1 + num2
}
console.log('length:', sum.length)

sum(1, 2, 3, 4)

// 打印结果如下
length: 2
arguments.length: 4
```

```javascript
// 不包含剩余参数
function sum(num1, num2, ...args) {
  console.log('...args:', ...args)
  return num1 + num2
}

console.log('length:', sum.length) // length: 2
```

```javascript
// 不包含有默认值的参数
function sum(num1 = 1, num2 = 1) {
  return num1 + num2
}

console.log('length:', sum.length)
//length: 0
```

```javascript
// 仅包含第一个具有默认值之前的参数个数
function sum(num1, num2 = 1, num3) {
  return num1 + num2 + num3
}

console.log('length:', sum.length) // length: 1
```

```javascript
// bind之后的length
function sum(num1, num2, num3) {
  return num1 + num2 + num3
}

console.log('sum.length', sum.length)

const boundSum0 = sum.bind(null)
console.log('boundSum0.length:', boundSum0.length)

const boundSum1 = sum.bind(null, 1)
console.log('boundSum1.length:', boundSum1.length)

const boundSum2 = sum.bind(null, 1, 2)
console.log('boundSum2.length:', boundSum2.length)

const boundSum3 = sum.bind(null, 1, 2, 3)
console.log('boundSum3.length:', boundSum3.length)

const boundSum4 = sum.bind(null, 1, 2, 3, 4)
console.log('boundSum4.length:', boundSum4.length)

// 打印如下
sum.length 3
boundSum0.length: 3
boundSum1.length: 2
boundSum2.length: 1
boundSum3.length: 0
boundSum4.length: 0
```

#### 与 arguments.length 的区别

- arguments.length 是实际参数长度
- Function.length 是形参的长度

#### 用途

- 柯里化

### Function.caller

#### 特性

- 该特性为非标准，尽量不要在生产环境中使用
- 定义：返回调用特定函数的函数
- 全局作用域内被调用，返回 null
- 函数内部作用域调用，指向调用它的那个函数

```javascript
function sum(num1, num2) {
  console.log('caller:', sum.caller)
  return num1 + num2
}

sum(1, 2)

function doSum() {
  sum(1, 2)
}

doSum()

// 打印结果如下
caller: [Function (anonymous)]
caller: [Function: doSum]
```

```javascript
// caller node
function sum(num1, num2) {
  console.log('caller:', sum.caller.toString)
  return num1 + num2
}

sum(1, 2)

function doSum() {
  sum(1, 2)
}

doSum()

// 执行结果如下
caller: [Function: toString]
caller: [Function: toString]
```

#### 严格模式下

- caller callee arguments 属性都不可用

```javascript
function sum(num1, num2) {
  'use strict'
  console.log('caller:', sum.caller.toString())
  return num1 + num2
}

sum(1, 2)

// TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

#### 用途

- 调用栈信息收集
- 调用环境检查

```javascript
// 调用栈信息收集
function getStack(fn) {
  const stacks = []
  let caller = fn.caller
  while (caller) {
    stacks.unshift(caller.name)
    caller = caller.caller
  }
  return stacks
}

function a() {
  console.log('a')
  const stacks = getStack(a)
  console.log('stacks:', stacks)
}

function b() {
  a()
  console.log('b')
}

function c() {
  b()
  console.log('c')
}

c()

// 执行结果如下
a
stacks: ['', 'c', 'b']
b
c
```

```javascript
// 检查调用环境
function getCaller(fun) {
  const caller = fun.caller
  if (caller == null) {
    console.log('caller is global context')
  } else {
    console.log('caller.name:' + caller)
  }
  return fun.caller
}

function add() {
  getCaller(add)
}

add()

// 结果如下（node中，在浏览器中是不同的效果）
caller.name:function (exports, require, module, __filename, __dirname) {
function getCaller(fun) {
  const caller = fun.caller
  if (caller == null) {
    console.log('caller is global context')
  } else {
    console.log('caller.name:' + caller)
  }
  return fun.caller
}

function add() {
  getCaller(add)
}

add()

}
```

### arguments.callee

- 包含正在执行的函数
- 严格模式禁止使用

#### 起源

- 匿名函数递归问题

```javascript
function sumTotal(n) {
  if (n == 1) return 1
  return sumTotal(n - 1) + n
}

console.log([5, 10, 20].map(sumTotal)) // [ 15, 55, 210 ]

// [5, 10, 20].map(function (n) {
//     if (n == 1) return 1;
//     return /*这里写什么呢？没有方法名*/(n - 1) + n;
// })
```

```javascript
// 匿名函数
const result = [5, 10, 20].map(function (n) {
  if (n == 1) return 1
  return arguments.callee(n - 1) + n
})

console.log('arguments.callee:', result)
// arguments.callee: [ 15, 55, 210 ]
```

#### 注意点：

- 递归调用以后会获取到不同的 this 值

```javascript
var global = this

var test = function (recursed) {
  console.log('this:', this)
  if (!recursed) {
    return arguments.callee(true)
  }
  if (this !== global) {
    console.log('This is: ' + this)
  } else {
    console.log('This is the global')
  }
}

test()
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/918328e562374f94bad1e8fb07e7a3fe~tplv-k3u1fbpfcp-watermark.image?)

## 03: 函数的 this 之全解析

### this 是什么

- 执行上下文（global function 或者 eval）的一个属性
- 在非严格模式下，总是指向一个对象
- 在严格模式下可以是任意值

#### 绑定规则

- 默认绑定
- 隐式绑定
- 显式绑定
- new
- 箭头函数

#### 默认绑定

##### 非严格模式

- 浏览器：this 指向 window
- nodejs: this 指向 globel

##### 严格模式

- 浏览器：undefined
- nodejs: undefined

```javascript
// 非严格模式
var name = '哈士奇'
function getName() {
  console.log('this:', this)
  return this.name
}
console.log('name:', getName())
console.log('this:', this)
```

```javascript
// 严格模式
'use strict'
var name = '哈士奇'
function getName() {
  console.log('this:', this === global, this)
  return this.name
}

console.log('this:', this)
console.log('name:', getName())
```

### 隐式绑定

- 作为某个对象的属性被调用的时候

```javascript
var name = '哈士奇'
function getName() {
  console.log('this:', this)
  return this.name
}

var person = {
  name: 'person的name',
  getName,
}

console.log('name:', person.getName())

// 打印结果如下
this: { name: 'person的name', getName: [Function: getName] }
name: person的name
```

```javascript
var name = '哈士奇'
function getName() {
  console.log('this:', this)
  return this.name
}
var person1 = {
  name: 'person1的name',
  getName,
}
var person2 = {
  name: 'person2的name',
  getName,
}

console.log(person1.getName())
console.log(person2.getName())

// 打印结果如下
this: { name: 'person1的name', getName: [Function: getName] }
person1的name
this: { name: 'person2的name', getName: [Function: getName] }
person2的name
```

```javascript
// 多层属性时候
var name = '哈士奇'
function getName() {
  console.log('this:', this)
  return this.name
}
const person1 = {
  name: 'person1的name',
  getName,
  person2: {
    name: 'person2的name',
    getName,
  },
}

console.log(person1.getName())
console.log(person1.person2.getName())

// 打印结果如下
this: {
  name: 'person1的name',
  getName: [Function: getName],
  person2: { name: 'person2的name', getName: [Function: getName] }
}
person1的name
this: { name: 'person2的name', getName: [Function: getName] }
person2的name
```

### 一些神秘的隐式绑定

- EventTarget, FileReader 等
-

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
    <button id="btn" type="button">按钮</button>
    <script>
      btn.addEventListener('click', function () {
        console.log('this:btn', this) // btn
      })

      var request = new XMLHttpRequest()
      request.open('GET', './')
      request.send()
      request.onloadend = function () {
        console.log('this:XMLHttpRequest', this) // XMLHttpRequest
      }
    </script>
  </body>
</html>

// 执行结果如下 this:XMLHttpRequest XMLHttpRequest {onreadystatechange: null,
readyState: 4, timeout: 0, withCredentials: false, upload:
XMLHttpRequestUpload, …} // 点击按钮后，打印如下 this:btn
<button id="btn" type="button">按钮</button>
```

### 显式绑定

- 显式表达谁是 this
- Function.prototype.call
- Function.prototype.apply
- Function.prototype.bind
- 属性绑定符

```javascript
// call
var obj = { name: '张三' }

function logName() {
  console.log(this.name, this)
}
logName.call(obj)
// 张三 { name: '张三' }
```

```javascript
// apply
var obj = { name: '张三' }

function logName() {
  console.log(this.name, this)
}
logName.apply(obj)
// 张三 { name: '张三' }
```

```javascript
// bind
var obj = { name: '张三' }

function logName() {
  console.log(this.name, this)
}
var bindLogName = logName.bind(obj)
bindLogName()
// 张三 { name: '张三' }
```

```javascript
// 连续 bind 只有第一次生效
var person1 = {
  name: 'name1',
}
var person2 = {
  name: 'name2',
}

function getName() {
  console.log(this)
  return this.name
}

console.log(getName.bind(person1).bind(person2)())

// 打印结果如下
{
  name: 'name1'
}
name1
```

```javascript
// bind 额外的传递参数
function add(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4
}

const add2 = add.bind(null, 10, 20)
console.log(add2(30, 40)) // 100
```

```javascript
// 传递 null undefined 时使用默认的绑定规则
// 浏览器中执行

var name = '全局的name'
function getName() {
  return this.name
}

const log = console.log
log(getName.call(null))
log(getName.call(undefined))

log(getName.call({ name: 'name' }))

// 在浏览器中执行结果如下
全局的name
全局的name
name
```

### 属性绑定符号冒号::

```javascript
function logName() {
  console.log(this.name, this)
}
;({ name: '123' })::logName() // 需要 babel 转换
//等同于 logName.call({name:"123"})
```

```javascript
// 也可以连续使用
function getPerson() {
  return this.person
}

function getName() {
  return this.name
}

var obj = {
  person: {
    name: 'Tom',
  },
}

obj::getPerson()::getName()
```

### new

- 实例化一个函数或者 ES6 的 class
- 对于 Function return 会影响返回值
  - return 非对象时，实际返回系统内部的对象
  - return 对象时，实际返回该对象

```javascript
function Person(name) {
  this.name = name

  this.getName = function () {
    return this.name
  }
}

var person = new Person('二哈')
console.log(person.getName()) // 二哈
```

```javascript
// new return
function MyObject() {
  this.name = 'myObject'
}

function MyObject2() {
  this.name = 'myObject'
  return {
    name: 'myObject2',
  }
}

function MyObject3() {
  this.name = 'myObject3'
  return undefined
}

console.log(new MyObject())
console.log(new MyObject2())
console.log(new MyObject3())

// 打印如下
MyObject { name: 'myObject' }
{ name: 'myObject2' }
MyObject3 { name: 'myObject3' }
```

#### new 解密

- 创建一个空对象
- 设置空对象的原型
- 指向构造函数的方法，把相关属性和方法添加到对象上
- 返回对象。如果构造函数返回的值是对象类型，就直接返回该对象，反之返回第一步创建的对象

```javascript
// 模拟 new
const slice = Array.prototype.slice
function newObject(constructor) {
  var args = slice.call(arguments, 1)
  var obj = {} // 1
  obj.__proto__ = constructor.prototype // 2
  var res = constructor.apply(obj, args) //3
  return res instanceof Object ? res : obj //4
}

function Person(name) {
  this.name = name
}

function Person2(name) {
  this.name = name
  return {
    name: '超级帅哥',
  }
}

var person = newObject(Person, '帅哥')
var person2 = newObject(Person2, '帅哥')
console.log(person.name) // 帅哥
console.log(person2.name) // 超级帅哥
```

### 箭头函数

#### 特点

- 简单
- 没有自己的 this, arguments, super, new.target
- 适合需要匿名函数的地方
- 不能用于构造函数

```javascript
// 浏览器中执行
var log = console.log
var name = '全局的name'
var getName = () => this.name
log(getName()) // 全局的name

var person = {
  name: 'person的name',
  getName: () => this.name,
}
log(person.getName()) // 全局的name

var person2 = {
  name: 'person2的name',
  getPerson() {
    return {
      getName: () => this.name,
    }
  },
}
log(person2.getPerson().getName()) // person2的name
```

```javascript
// 嵌套下的箭头函数
class Person {
  constructor(name) {
    this.name = name
  }

  getName() {
    return {
      getName2: () => ({
        getName3: () => ({
          getName4: () => this.name,
        }),
      }),
    }
  }
}

var log = console.log
var p = new Person('person的name')
log(p.getName().getName2().getName3().getName4())
// person的name
```

```javascript
// 箭头函数的this 是上层作用域的 this，如果上层 this 发生了变化，箭头函数的 this 自然也会发生变化
// 浏览器中执行
var name = 'global.name'
var person = {
  name: 'person.name',
  getName() {
    return () => this.name
  },
}

var log = console.log
log(person.getName()()) // person.name
log(person.getName.call({ name: 'name' })()) // name
```

### this 绑定的优先级

1. 箭头函数
2. 显式绑定
3. new
4. 隐式绑定
5. 默认绑定

### 练习题

#### 1

```javascript
var name = 'window'
var obj = { name: '张三' }

function logName() {
  console.log(this.name)
}

function logName2() {
  'use strict'
  console.log(this.name)
}

var person = {
  name: 'person',
  logName,
  logName2: () => logName(),
}

logName()
person.logName()
person.logName2()
logName.bind(obj)()
logName2()

// 浏览器下结果如下
window
person
window
张三
VM580:10 Uncaught TypeError: Cannot read properties of undefined (reading 'name') at logName2 (<anonymous>:10:20)
```

### 动态 this

```javascript
// 浏览器中执行
var name = 'window'
function logName() {
  console.log(this.name, this)
}

function logName2() {
  'use strict'
  console.log('this:', this)
}

var person = {
  name: 'person',
  logName,
}

logName()
logName2()
person.logName()
// 打印结果如下
// window Window {window: Window, self: Window, document: document, name: 'window', location: Location, …}
// this: undefined
// person {name: 'person', logName: ƒ}
```

### 锁定 this 的方式

- bind
- 箭头函数

### 课后思考题

- 被显式绑定后，能不能解除绑定????

```javascript
// 浏览器
var name = 'window'
var obj = { name: '张三' }

function logName() {
  console.log(this.name)
}

var person = { name: 'person', logName }

// 升级版本
person.logName()
;(1, person.logName)()
;(false || person.logName)()

// person window window
```

## 04: 神奇的 call.call, call.call.call

### call 的美好回忆

```javascript
function a() {
  console.log(this, 'a')
}
function b() {
  console.log(this, 'b')
}

a.call(b)
// [Function: b] a
```

### 小试牛刀

```javascript
function a() {
  console.log(this, 'a')
}
function b() {
  console.log(this, 'b')
}

a.call(b)
a.call.call(b, 'b')

// 打印如下
ƒ b() { console.log(this, 'b') } 'a'
String {'b'} 'b'
```

### 升级

```javascript
function a() {
  console.log(this, typeof this, 'a')
}
function b() {
  console.log(this, typeof this, 'b')
}
a.call.call(b, 'b')
a.call.call.call(b, 'b')
a.call.call.call.call(b, 'b')

// 打印结果如下
String {'b'} 'object' 'b'
String {'b'} 'object' 'b'
String {'b'} 'object' 'b'
```

### 以上代码带来的疑问？

- 为什么被调用的是 b 函数
- 为什么 this 是 String{'b'}
- 为什么 2，3，4 个 call 的结果是一样

#### call 和 this 的简单回顾

- call: 使用一个指定的 this 值和单独给出的一个或者多个参数来调用一个函数
- this: 执行上下文的一个变量
- this: 有另外一种不严谨的说法，**this 指向调用者**

#### call 的一种虚拟语法

- fn.call(obj, ...args) === (obj.fn = fn, obj.fn(...args))

```javascript
function getName() {
  return this.name
}

var obj = {
  name: 'name',
}

getName.call(obj)

// 等同于
obj.getName = getName
obj.getName()
```

#### 解答：为什么 2 3 4 个 call 的结果是一样的？

- a.call(b): a 被调用
- a.call.call(b): a.call 被调用
- a.call.call.call(b): a.call.call 被调用

```javascript
a.call = Function.prototype.call // true
a.call === a.call.call // true
a.call === a.call.call.call // true
```

```javascript
function a() {
  console.log(this, 'a')
}
function b() {
  console.log(this, 'b')
}

var log = console.log

log(a.call === Function.prototype.call) // true
log(a.call === a.call.call) // true
log(a.call === a.call.call.call) // true
```

#### 解答：为什么被调用的事 b 函数

```javascript
function a() {
  console.log(this, 'a')
}
function b() {
  console.log(this, 'b')
}

// (a.call).call(b, 'b')

// 公式：fun.call(obj, ...args)  ===  (  obj.fun = fun; obj.fun(...args) )
// 1. 一个函数进行call调用，等同于在一个对象上执行该函数
// 等于在b对象上调用 a.call函数
// 2. a.call === Function.prototype.call
var call = Function.prototype.call

// (a.call).call(b, 'b')
// call === a.call === Function.prototype.call;
// 等同于 在b调用call函数
b.fn = call
b.fn('b')
b.call('b')
```

#### 解答：为什么 this 是 String{'b'}

- this：在非严格模式下，Objec 包装
- this：在严格模式下，任意值（传递什么是什么）

```javascript
// 严格模式下
'use strict'
function a() {
  console.log(this, 'a')
}
function b() {
  console.log(this, 'b')
}

// (a.call).call(b, 'b')

// 公式：fun.call(obj, ...args)  ===  (  obj.fun = fun; obj.fun(...args) )
// 1. 一个函数进行call调用，等同于在一个对象上执行该函数
// 等于在b对象上调用 a.call函数
// 2. a.call === Function.prototype.call
var call = Function.prototype.call

// (a.call).call(b, 'b')
// call === a.call === Function.prototype.call;
// 等同于 在b调用call函数
b.fn = call
b.fn('b')
b.call('b')

// 打印如下
b b
b b
```

### 万能的函数调用方法

```javascript
var call = Function.prototype.call.call.bind(Function.prototype.call)

var person = {
  hello() {
    console.log('hello', this.name)
  },
}

call(person.hello, { name: 'tom' }) // hello tom
```

### 小结

- call 简单吗 ？
- 复杂的都是简单的组合体

## 05：纯函数，副作用，高阶函数等函数式编程概念

### 编程范式 - 面向过程编程

* 特点：主要采取过程调用或者函数调用的方式来进行流程控制。流程则由包含一系列运算步骤的过程，子过程，方法或者函数来控制
* 代表：C 语言等

### 编程范式 - 面向过程编程

* 特点：它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性，对象里的程序可以访问及经常修改对象相关联的数据。在面向对象程序编程里，计算机程序会被设计成彼此相关的对象
* 代表：Python、C++ Java C# 等

### 编程范式 - 纯函数编程

* 特点：函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程
* 代表：Haskell Scala等

### 函数式编程的优点

* 代码简洁，优雅
* 语法灵活，复用性高
* 容易测试
* 容易升级
* 并发友好
* 可维护性好

### 纯函数

* 定义：纯函数就是相同的输入，永远得到相同的输出，并且没有任何副作用
* **同入同出**
* **无副作用**

```javascript
var a = 1

// 不是纯函数
function sum(num1, num2) {
  return num1 + num2 + a
}

console.log('a=1:', sum(1, 2))
a = 3
console.log('a=2:', sum(1, 2))
// 结果如下
a=1: 4
a=2: 6
```

```javascript
var arr = [1, 2, 3]

const log = console.log

// 纯
log(arr.slice(0), arr)
log(arr.slice(0), arr)

// 不纯
log(arr.splice(0), arr)
log(arr.splice(0), arr)

// 结果如下
[ 1, 2, 3 ] [ 1, 2, 3 ]
[ 1, 2, 3 ] [ 1, 2, 3 ]
[ 1, 2, 3 ] []
[] []
```

### 纯函数的优点

* 安全：无副作用，不破坏外面的状态
* 可测试：入参固定，输出固定，好断言
* 可缓存：同入同出，便于缓存，提升效率

### 函数的副作用

#### 定义

* 定义：函数调用时，除了返回函数值以外，还对外界产生附加的影响

#### 副作用包含哪些呢？

* 修改了变量
* 修改了入参
* 输出了日志
* 操作了 DOM
* 发送了 Http 请求
* 操作客户端存储
* 与 service worker、iframe 通讯
* 其他不该做的事情

```javascript
// 修改了变量
var rate = 1;
function sum(sum1, sum2) {
    rate = 2;
    return sum1 + sum2
}

var log = console.log;
log("rate:", rate); // rate: 1
sum(1, 2);
log("rate:", rate); // rate: 2
```

```javascript
// 修改了入参
function getName(obj) {
  obj.age = 10
  return obj.name
}

var obj = {
  name: 'obj的name',
  age: 20,
}

var log = console.log
log('age:', obj.age)
getName(obj)
log('age:', obj.age)
// 打印如下
age: 20
age: 10
```

### 高阶函数

#### 特点

* 定义：就是一个接受函数作为参数或者函数作为输出返回的函数
* 特征：函数入参，函数作为返回值，满足任一条件即可

#### 数组中经常用到的高阶函数

* Array.prototype.filter
* Array.prototype.find
* Array.prototype.map

#### 高阶函数的应用

* 柯里化
* Function.prototype.bind

```javascript
// 柯里化
function curryingAdd(num1) {
  return function (num2) {
    return num1 + num2
  }
}
```

#### 高阶函数衍生：高阶组件

* 定义：包装了另外一个组件的组件

```javascript
function PropsHOC(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
```

### 其他函数式编程的概念

* compose（组合），pipe(管道)
* 偏函数，柯里化
* chain 链式调用

### 思考题

#### 幂等性和纯函数的相似和区别

* 所谓的幂等性，是分布式环境下的一个常见问题，一般是指我们在进行多次操作时，所得到的结果是一样的，即多次运算结果是一致的。

  也就是说，用户对于同一操作，无论是发起一次请求还是多次请求，最终的执行结果是一致的，不会因为多次点击而产生副作用。

[什么是幂等？如何解决幂等性问题？](https://www.zhihu.com/question/534651475)

## 06：深入理解原型链与继承

[彻底搞懂Function，Object，__proto__，prototype之间的关系](https://juejin.cn/post/6844903930216841230)

### 深入浅出原型链

### 原型

#### 原型是"借"来的

* 原型不是 JavaScript 首创
* 借鉴 Self 语言，基于原型(prototype)的实现继承机制

#### 原型解决了什么问题

* 实现继承
* 共享数据，减少空间占用，节省内存

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  this.getName = function () {
    return this.name
  }
  this.getAge = function () {
    return this.age
  }
}

var person = new Person()
var person2 = new Person()

console.log(person.getName === person2.getName) // false
```

```javascript
// 使用原型后
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.getName = function () {
  return this.name
}
Person.prototype.getAge = function () {
  return this.age
}

var person = new Person()
var person2 = new Person()

console.log(person.getName === person2.getName) // true
```

#### 原型三件套

* prototype
* \_\_proto\_\_
* constructor

##### prototype

* 无处不在
* 本质就是一个普通对象

```javascript
var obj = {}
console.log(obj.toString()) // [object Object]
// toString 方法是不是来自原型
console.log(obj.toString === Object.prototype.toString) // true
console.log(obj instanceof Object) // true
```

##### \_\_proto\_\_

* \_\_proto\_\_：\_\_proto\_\_ 属性是一个访问器属性（一个 getter 函数和一个 setter 函数），暴露了通过它访问的对象的内部[[prototype]] 一个对象或者 null
* 等于 构造函数的原型 prototype
* 推荐使用 Object.getPrototypeof

```javascript
var des = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')
console.log(des)

// __proto__ 构造函数的原型
var obj = {}
console.log(obj.__proto__ === obj.constructor.prototype)

// Object.getPrototypeOf 替代
console.log(Object.getPrototypeOf(obj) === obj.__proto__)

// 打印结果如下
{
  get: [Function: get __proto__],
  set: [Function: set __proto__],
  enumerable: false,
  configurable: true
}
true
true
```

##### constructor

```javascript
var obj = {}
console.log(obj.constructor === Object) // true
```

#### 谁都有谁

* prototype 属性本质就是一个普通对象
* 普通对象有 \_\_proto\_\_ 属性
* 普通函数或者 class 既有 prototype 属性，又有 \_\_proto\_\_ 属性

#### prototype \_\_proto\_\_ constructor 小结

* prototype
  * 函数或者 class 的共享属性
  * 作用：节约内存、实现继承
  * 本质就是一个普通的对象
* \_\_proto\_\_
  * 构造函数的原型
  * Object.prototype.\_\_proto\_\_ = null
  * 基于此形成原型链
* constructor
  * 实现对象的构造函数
  * 可以被更改
  * 普通对象，其在原型上

### 原型链

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.getName = function () {
  return this.name
}

Person.prototype.getAge = function () {
  return this.age
}

var person = new Person()
console.log(person.toString()) // [object Object]

// 完成的原型链
person.__proto__ => Person.prototype
Person.prototype.__proto__ => Object.prototype
Object.prototype.__proto__ => null
```

#### 原型链的尽头

* 原型链的尽头是 `null`: `Object.prototype.__proto__ = null`

#### 万法始祖

![原型经典图.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57ecdd6d4edb4ac58b346fb0bb4a4cc0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.getName = function () {
  return this.name
}
Person.prototype.getAge = function () {
  return this.age
}

var person = new Person()

// var log = console.log;
// log(person.__proto__ ===  Person.prototype);
// log(Person.prototype.__proto__ ===  Object.prototype);
// log(Object.prototype.__proto__ ===  null);
```

### 知识点总结

* 函数最终的本质上是对象
* 普通对象有 `constructor` 指向自己的构造函数，可以被改变，不一样安全
* 函数和 `class` 的 `prototype.constructor` 指向函数自身
* `Function 、Object、 Regexp、 Error` 等本质上都是函数，`Function.constructor === Function`
* 普通对象都有`__proto__` ，其等于构造函数的原型，推荐使用 `Object.getPrototypeOf`
* 所有普通对象的构造函数都是` Function ES6`有出现的函数种类 `AsyncFunction` `GeneratorFunction`
* 原型链的尽头是`null`: `Object.prototype.__proto__ = null`
* `Function.__proto__` 指向 `Function.prototype`

### 趣味知识

* 普通对象的二次`__proto__`是 null
* 普通函数的三次`__proto__`是 null
* 如果是经历 `n` 次显式继承，被实例化的普通对象，`n+3`层的`__proto__`是 null

```javascript
var obj = {}
var log = console.log
log(obj.__proto__.__proto__) // null
```

```javascript
function a() {}
function A() {}
var log = console.log
log(a.__proto__.__proto__.__proto__) // null
log(new A().__proto__.__proto__.__proto__) // null
```

Javascript规定，`Function.prototype.__proto__ === Object.prototype`,`Object.prototype.__proto__ === null`，是原型链有终点。也就是在原型链的终点处有2个特殊情况。

```javascript
// 传统的被继承后
function Grandpa() {}
function Parent() {}
Parent.prototype = new Grandpa()

function Child() {}
Child.prototype = new Parent()

var child = new Child()

var log = console.log
//  2 + 3
log(child.__proto__.__proto__.__proto__.__proto__.__proto__) // null
// 以下为求解过程
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.__proto__ === Parent.prototype) // true
console.log(child.__proto__.__proto__.__proto__ === Grandpa.prototype) // true
console.log(child.__proto__.__proto__.__proto__.__proto__ === Object.prototype) // true
```

```javascript
class Grandpa {}
class Parent extends Grandpa {}
class Child extends Parent {}
var child = new Child()

var log = console.log
//  2 + 3
log(child.__proto__.__proto__.__proto__.__proto__.__proto__) // null
```

### 纯净对象

#### 特点

* 什么是纯净对象，就是干干净净的对象，没有原型
* 怎么创建：Object.create(null)

#### 优点

* 空间上，少了原型链的信息，必然节省空间
* 时间上，没有原型链，查找一步到位

```javascript
var obj = Object.create(null)
console.log(obj.__proto__) // undefined
console.log(obj.toString) // undefined

for (var p in obj) {
  console.log(p)
}
```

### 课后练习

* 推导：如果是经历过 n 次显式继承，被实例化后的普通对象，n + 3 层的`__proto__`是 null

## 07: 组合和继承，谁与争锋 

> 优先使用组合

### 组合（has-a 关系）

* 在一个 类/对象 内使用其他的 类/对象
* has-a：包含关系，体现的是**整体和部分**的思想
* **黑盒复用**：对象的内部细节不可见，知道怎么使用就可以了

```javascript
class Logger {
  log() {
    console.log(...arguments)
  }
  error() {
    console.error(...arguments)
  }
}

class Reporter {
  constructor(logger) {
    this.logger = logger || new Logger()
  }
  report() {
    // TODO:
    this.logger.log('report')
  }
}

var reporter = new Reporter()
reporter.report()
```

### 组合的优点

* 功能相对独立，松耦合
* 扩展性好
* 复合单一职责，复用性好
* 支持动态组合，即程序运行中组合
* 具备按需组装的能力

### 组合的缺点

* 使用上相对继承，更加复杂一些
* 容易产生过多的类、对象

### 继承(is - a 关系)

* 继承是 is-a 的关系，比如人是动物
* 白盒复用：你需要了解父类的实现细节，从而决定怎么重写父类的方法

```javascript
// 继承
class Logger {
  log() {
    console.log(...arguments)
  }
  error() {
    console.error(...arguments)
  }
}

class Reporter extends Logger {
  report() {
    // TODO:
    this.log('report')
  }
}

var reporter = new Reporter()
reporter.report()
```

### 继承的优点

* 初始化简单，子类自动具备父类的能力
* 无需显式初始化父类

### 继承的缺点

* 继承层级多时，会导致代码混乱，可读性变差
* 耦合紧
* 扩展性相对组合较差

### 组合和继承的最终目的

* 逻辑复用，代码复用

### 多态

* 事物在运行过程中存在不同的状态

### 多态形成的条件

* 需要有继承关系
* 子类重写父类的方法
* 父类指向子类

```typescript
class Animal {
  eat() {
    console.log('Animal is eating')
  }
}

class Person extends Animal {
  eat() {
    console.log('Person is eating')
  }
}

var animal: Animal = new Animal()
animal.eat()

var person: Animal = new Person()
person.eat()
```

### 何时使用谁

* 有多态的需求的时候，考虑使用继承
* 如果有多重继承的需求，考虑使用组合
* 既有多态又有多重继承，考虑使用继承+组合

### ES5中的继承方式

* 原型链继承
* 构造函数继承
* 原型式继承
* 组合继承
* 寄生式继承
* **寄生组合继承**

```javascript
// 寄生组合继承
function Animal(options) {
  this.age = options.age || 0
  this.sex = options.sex || 1
  this.testProperties = [1, 2, 3]
}

Animal.prototype.eat = function (something) {
  console.log('eat:', something)
}

function Person(options) {
  // 初始化父类, 独立各自的属性
  Animal.call(this, options)
  this.name = options.name || ''
}

// 设置原型
Person.prototype = Object.create(Animal.prototype)
// 修复构造函数
Person.prototype.constructor = Person

Person.prototype.eat = function eat(something) {
  console.log(this.name, ':is eating', something)
}
Person.prototype.walk = function walk() {
  console.log(this.name, ':is waking')
}

var person = new Person({ sex: 1, age: 18, name: '小红' })
person.eat('大米')
person.walk()
person.testProperties.push('4') // person.testProperties 进行更改，不会影响 person2.testProperties

var person2 = new Person({ sex: 1, age: 18, name: '小红' })
console.log(person2.testProperties)

// 打印如下
小红 :is eating 大米
小红 :is waking
[ 1, 2, 3 ]
```

### 寄生组合继承解决的问题

* 各个实例的属性独立，不会发生修改一个实例，影响另外一个实例
* 实例化过程中没有多余的函数调用
* 原型上的 constructor 属性指向正确的构造函数

### 继承的一种变体：mixin

* mixin: 混入
* 把属性拷贝到原型，让其实例也有相应的属性

```javascript
class Logger {
  log() {
    console.log('Logger::', ...arguments)
  }
}

class Animal {
  eat() {
    console.log('Animal:: is eating')
  }
}

class Person extends Animal {
  walk() {
    console.log('Person:: is walking')
  }
}

const whiteList = ['constructor']
function mixin(targetProto, sourceProto) {
  const keys = Object.getOwnPropertyNames(sourceProto)
  keys.forEach((k) => {
    if (whiteList.indexOf(k) <= 0) {
      targetProto[k] = sourceProto[k]
    }
  })
}

mixin(Person.prototype, Logger.prototype)

console.log(Person.prototype)
var person = new Person()
person.log('log test')

// 打印结果如下
Animal { log: [Function: log] }
Logger:: log test
```

### ES6实现继承

* extends 关键字
* super 访问父类

```javascript
class Animal {
  constructor(options) {
    this.age = options.age || 0
    this.sex = options.sex || 1
  }

  eat(something) {
    console.log('eat:', something)
  }
}

class Person extends Animal {
  // 私有变量
  #friends = []

  constructor(options) {
    super(options)
    this.name = options.name || name
  }
  eat(something) {
    console.log(this.name, 'eat:', something)
  }
  // 这样写是原型方法
  run() {
    return `${this.name}正在跑步`
  }
	// 这样写是实例方法
  say = () => {
    console.log('say==', say)
  }
}

var p1 = new Person({ name: '张三' })
console.log('name:', p1.name)
p1.eat('鲍鱼')
// console.log("p1.friends:", p1.friends, p1.#friends)
console.log(Object.getOwnPropertyNames(p1.__proto__))

// 结果如下
name: 张三
张三 eat: 鲍鱼
[ 'constructor', 'eat', 'run' ]
```

```javascript
// es6 添加原型上的属性 
class Animal {
  constructor() {
    this.name = 'animal'
  }

  eat() {
    console.log('eat')
  }

  get gname() {
    return 'getter name'
  }
}
Animal.prototype.name = 'prototype的name'

class Person extends Animal {}

var person = new Person()
console.log(person.name)
console.log(person.gname)
console.log(person.__proto__.eat)
console.log(person.__proto__.name)

// 打印如下
animal
getter name
[Function: eat]
prototype的name
```

### ES6继承注意点

* 构造函数 this 使用前，必须先调用 super 方法
* 注意箭头函数形式的属性
* class 若是想在原型上添加非函数的属性，还得依赖 prototype

## 08: 柯里化：整体到部分。反柯里化呢？

[函数式编程 — 柯里化与偏函数](https://juejin.cn/post/6846687600917348365)

### 柯里化

* 定义：柯里化是一个 N 元函数转换为 N 个一元函数，它持续的返回一个新的函数，直到所有的参数用尽为止，然后柯里化链中最后一个函数被返回并且执行时，才会全部执行
* 元：指的是函数参数的数量
* 一句话：柯里化其实就是一种函数转换，多元函数转换为一元函数

### 简单的例子

```javascript
function calcSum(num1, num2, num3) {
  return num1 + num2 + num3
}

function curryCalcSum(num1) {
  return function (num2) {
    return function (num3) {
      return num1 + num2 + num3
    }
  }
}

console.log('calcSum:', calcSum(3, 4, 5)) // 12
console.log('curryCalcSum:', curryCalcSum(3)(4)(5)) // 12
```

### 怎么实现通用柯里化

* 接受一个需要柯里化的方法
* 存放多次函数调用的参数
* 函数树木不够原函数参数数目，不调用原函数，返回新的函数继续接受下一个参数，反之调用函数

### 智能版本

```javascript
var slice = Array.prototype.slice
var curry = function (fn) {
  var args = slice.call(arguments, 1)
  return _curry.apply(this, [fn, fn.length].concat(args))
}

function _curry(fn, len) {
  var oArgs = slice.call(arguments, 2)
  return function () {
    var args = oArgs.concat(slice.call(arguments))
    if (args.length >= len) {
      return fn.apply(this, args)
    } else {
      return _curry.apply(this, [fn, len].concat(args))
    }
  }
}

//使用
function calcSum(num1, num2, num3) {
  return num1 + num2 + num3
}
const calcSumCurry = curry(calcSum, 3)

const log = console.log
log(calcSumCurry(4, 5))
log(calcSumCurry(4)(5))

// 但是这样有缺陷，就是函数不能设置默认参数，否则会出现问题，如下会报错
function calcSum(num1, num2 = 2, num3) {
  return num1 + num2 + num3
}
```

### 手动 + 智能版本

```javascript
var slice = Array.prototype.slice
var curry = function (fn, length) {
  var args = slice.call(arguments, 2)
  return _curry.apply(this, [fn, length || fn.length].concat(args))
}

function _curry(fn, len) {
  var oArgs = slice.call(arguments, 2)
  return function () {
    var args = oArgs.concat(slice.call(arguments))
    if (args.length >= len) {
      return fn.apply(this, args)
    } else {
      return _curry.apply(this, [fn, len].concat(args))
    }
  }
}

//使用
function calcSum() {
  return [...arguments].reduce((pre, value, index) => {
    return pre + value
  }, 0)
}

const calcSumCurry = curry(calcSum, 3, 3)

console.log(calcSumCurry(4, 5)) // 12
console.log(calcSumCurry(4)(5)) // 12
```

### 手动 + 智能版本存在的问题？

```javascript
var slice = Array.prototype.slice
var curry = function (fn, length) {
  var args = slice.call(arguments, 2)
  return _curry.apply(this, [fn, length || fn.length].concat(args))
}

function _curry(fn, len) {
  var oArgs = slice.call(arguments, 2)
  return function () {
    var args = slice.call(arguments).concat(oArgs)
    if (args.length >= len) {
      return fn.apply(this, args)
    } else {
      return _curry.apply(this, [fn, len].concat(args))
    }
  }
}

//使用
function calcSum() {
  return [...arguments].reduce((pre, value, index) => {
    return pre + value
  }, 0)
}
const calcSumCurry = curry(calcSum, 3, 3)
console.log(calcSumCurry(4, 5)) // 12
// 参数多传递: 如果多传递参数，就会报错
console.log(calcSumCurry(4, 5)(6)) // TypeError: calcSumCurry(...) is not a function
```

### 改进：柯里化变体

```javascript
// 最后没有参数传递时候，就认为是最后的调用
function curry(fn) {
  const curArgs = []
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, curArgs)
    }
    Array.prototype.push.apply(curArgs, [].slice.call(arguments))
    return arguments.callee
  }
}
function calcSum() {
  return [...arguments].reduce((pre, value, index) => {
    return pre + value
  }, 0)
}
const fn = curry(calcSum)
console.log('执行添加:', fn(2, 3)(5)(8)()) // 执行添加: 18
// console.log("手动调用:", fn())
```

### 改进：柯里化变体2

```javascript
var slice = Array.prototype.slice
// 也支持传递参数个数
var curry = function (fn, length) {
  var args = slice.call(arguments, 2)
  return _curry.apply(this, [fn, length || fn.length].concat(args))
}

function _curry(fn, len) {
  var oArgs = slice.call(arguments, 2)
  return function () {
    var args = oArgs.concat(slice.call(arguments))
    // 不传递参数时候，进行判断
    if (arguments.length === 0) {
      if (args.length >= len) {
        return fn.apply(this, args)
      }
      // 不够时候就进行提示
      return console.warn('curry:参数长度不足')
    } else {
      return _curry.apply(this, [fn, len].concat(args))
    }
  }
}

function calcSum() {
  return [...arguments].reduce((pre, value, index) => {
    return pre + value
  }, 0)
}

const fn = curry(calcSum, 5)
console.log('执行添加:', fn(2, 3)(5)())
console.log('手动调用:', fn())
```

### 占位符版本

```javascript
// lodash: https://www.lodashjs.com/docs/lodash.curry

var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
 
curried(1, 2)(3);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(1)(_, 3)(2); // 占位符版本
// => [1, 2, 3]
```

### 柯里化的作用

* 参数复用，逻辑复用
* 延迟计算、执行

```javascript
var slice = Array.prototype.slice
var curry = function (fn, length) {
  var args = slice.call(arguments, 2)
  return _curry.apply(this, [fn, length || fn.length].concat(args))
}

function _curry(fn, len) {
  var oArgs = slice.call(arguments, 2)
  return function () {
    var args = oArgs.concat(slice.call(arguments))
    if (args.length >= len) {
      return fn.apply(this, args)
    } else {
      return _curry.apply(this, [fn, len].concat(args))
    }
  }
}

function log(logLevel, msg) {
  console.log(`${logLevel}:${msg}:::${Date.now()}`)
}

//柯里化log 方法
const curryLog = curry(log)
const debugLog = curryLog('debug')
const errLog = curryLog('error')

//复用参数debug
debugLog('testDebug1')
debugLog('testDebug2')

//复用参数error
errLog('testError1')
errLog('testError2')
```

### 偏函数

* 偏函数就是固定一部分参数，然后产生更小单元的函数
* 简单理解就是：分为两次传递参数

```javascript
function calcSum(num1, num2, num3) {
  return num1 + num2 + num3
}

function curryCalcSum(num1) {
  return function (num2, num3) {
    return num1 + num2 + num3
  }
}

const pCalcSum = curryCalcSum(10)

console.log(pCalcSum(11, 12)) // 33
console.log(pCalcSum(15, 20)) // 45 
console.log(pCalcSum(22, 30)) // 62
```

```javascript
// 通用偏函数
function partial(fn) {
  const args = [].slice.call(arguments, 1)
  return function () {
    const newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

function calcSum(num1, num2, num3) {
  return num1 + num2 + num3
}
const pCalcSum = partial(calcSum, 10)

console.log(pCalcSum(11, 12)) // 33
```

### 偏函数与柯里化的区别

* 柯里化是将一个多参数转换为单参数的函数，将一个 N 元函数转换为 N 个一元函数
* 偏函数是固定一部分参数（一个或者多个参数），将一个 N 元函数转换成一个 N - X 函数

### 反柯里化

* 一句话就是：非我之物，为我所用。是一种拿来主义
* 反柯里化的作用就是扩大适用性，使原来作为特定对象所拥有的功能的函数可以被任意对象使用

```javascript
// 反柯里化基础版
function unCurry(fn) {
  return function (context) {
    return fn.apply(context, Array.prototype.slice.call(arguments, 1))
  }
}
```

```javascript
// 反柯里化其他版本
Function.prototype.unCurry = function () {
  var self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}
Function.prototype.unCurry = function () {
  return this.call.bind(this)
}
Function.prototype.unCurry = function () {
  return (...args) => this.call(...args)
}
```

```javascript
// 反柯里化高级版本
Function.prototype.unCurry = function () {
  var self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}
```

#### 实际应用

```javascript
// 数组push
Function.prototype.unCurry = function () {
  const self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}

const push = Array.prototype.push.unCurry()
const obj = {}
push(obj, 4, 5, 6)
console.log(obj) // { '0': 4, '1': 5, '2': 6, length: 3 }
```

### 反柯里化使用场景

* 借用数组方法
* 复制数组

```javascript
// 复制数组
Function.prototype.unCurry = function () {
  const self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}

const clone = Array.prototype.slice.unCurry()
var a = [1, 2, 3]
var b = clone(a)

console.log('a==b:', a === b)
console.log(a, b)

// 打印如下
a==b: false
[ 1, 2, 3 ] [ 1, 2, 3 ]
```

```javascript
// 发送事件
Function.prototype.unCurry = function () {
  const self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}

const dispatch = EventTarget.prototype.dispatchEvent.unCurry()

window.addEventListener('event-x', (ev) => {
  console.log('event-x', ev.detail) // event-x ok
})

dispatch(window, new CustomEvent('event-x', { detail: 'ok' }))
```

## 09：链式调用的本质

### 熟知的案例

* jQuery
* 数组
* ES6异步大杀器 Promise
* EventEmitter

```javascript
// jquery
$('.testNode').css('color', 'red').show(200).removeClass('class1')
```

```javascript
// 数组
[1, 2, 3, 4].filter(filterFn).map(mapFn).join('')
```

```javascript
// promise
fetch(url)
    .then(res => res.json())
    .then(result => { })
    .then(result => { })
```

```javascript
// EventEmitter
const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter
  .on('message', function () {
    console.log('message')
  })
  .on('message1', function () {
    console.log('message1')
  })

emitter.emit('message')
emitter.emit('message1')
```

### 链式调用的本质

* 返回对象本身
* 返回同类型的实例对象

### 其他优秀案例

* 2万多 star 的 RxJs
* 5万多 star 的 lodash
* 9万多 star 的 axios

### 链式调用的优点

* 可读性强，语义好理解
* 代码简洁
* 易于维护

### 链式调用的缺点

* 对程序员要求高
* 调试起来不太方便
* 消耗可能大

### 链式调用适用场景

* 需要多次计算或者赋值
* 逻辑上有特定的顺序
* 相似业务的集中处理

### 实战练习一：写一个计算器

* 第一种：返回本身
* 第二种：返回同类型对象实例

```javascript
// 返回 this
class Calculator {
  constructor(val) {
    this.val = val
  }

  double() {
    this.val = this.val * 2
    return this
  }

  add(num) {
    this.val = this.val + num
    return this
  }

  minus(num) {
    this.val = this.val - num
    return this
  }

  multi(num) {
    this.val = this.val * num
    return this
  }

  divide(num) {
    this.val = this.val / num
    return this
  }

  pow(num) {
    this.val = Math.pow(this.val, num)
    return this
  }

  // ES5 getter, 表现得像个属性，实则是一个方法
  get value() {
    return this.val
  }
}

const cal = new Calculator(10)

const val = cal
  .add(10) // 20
  .minus(5) // 15
  .double() // 30
  .multi(10) // 300
  .divide(2) // 150
  .pow(2).value // 22500
console.log(val) // 22500
```

```javascript
// 返回同类型对象实例
class Calculator {
  constructor(val) {
    this.val = val
  }

  double() {
    const val = this.val * 2
    return new Calculator(val)
  }

  add(num) {
    const val = this.val + num
    return new Calculator(val)
  }

  minus(num) {
    const val = this.val - num
    return new Calculator(val)
  }

  multi(num) {
    const val = this.val * num
    return new Calculator(val)
  }

  divide(num) {
    const val = this.val / num
    return new Calculator(val)
  }

  pow(num) {
    const val = Math.pow(this.val, num)
    return new Calculator(val)
  }

  get value() {
    return this.val
  }
}

const cal = new Calculator(10)

const val = cal
  .add(10) // 20
  .minus(5) // 15
  .double() // 30
  .multi(10) // 300
  .divide(2) // 150
  .pow(2).value // 22500
console.log(val) // 22500
```

### 其他类似的方案

* compose 或者 pipe

```javascript
function double(val) {
  return val * 2
}

function add(val, num) {
  return val + num
}

function minus(val, num) {
  return val - num
}

function multi(val, num) {
  return val * num
}

function divide(val, num) {
  return val / num
}

function pow(val, num) {
  return Math.pow(val, num)
}

function pipe(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduceRight(
    (a, b) =>
      (...args) =>
        a(b(...args)),
  )
}

const cal = pipe(
  (val) => add(val, 10),
  (val) => minus(val, 5),
  double,
  (val) => multi(val, 10),
  (val) => divide(val, 2),
  (val) => pow(val, 2),
)

console.log(cal(10))
```

### 练习题

* 手写一个简单的 MyQuery ,实现类似功能

```javascript
MyQuery('.myclass')
  .addClass('classA')
  .style({ height: '100px' })
  .attr('title', '哈哈')
```

## 10: 深入了解动态解析和执行函数

### 动态解析和执行两匹骏马

* eval
* new Function

### eval

* 功能：会将传入的字符串当做 JavaScript 代码进行执行
* 语法： eval(string)
* 基本使用：eval("2+2")

### eval 试用场景

1. 系统内部的 setTimeout 或者 setInterval
2. JSON 字符串对象
3. 前端模板
4. 动态生成函数或者变量
5. 有需要跳出严格模式的场景
6. 其他场景

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>
    tTimeout('console.log("setTimeout:", Date.now())', 1000)
    tInterval('console.log("setInterval", Date.now())', 3000)
  </script>
</body>

</html>
```

```javascript
// 计时器, 浏览器中执行
// setTimeout('console.log("setTimeout:", Date.now())', 1000)
// setInterval('console.log("setInterval", Date.now())', 5000)

console.log()
// JSON字符串转对象
var jsonStr = `{a:1, b:1}`
var obj = eval('(' + jsonStr + ')')
console.log('eval json:', obj, typeof obj)

// 生成函数
var sumAdd = eval(`(function add(num1, num2){
    return num1 + num2
}
)`)
console.log('sumAdd:', sumAdd(10, 20))

// 数字数组相加
var arr = [1, 2, 3, 7, 9]
var r = eval(arr.join('+'))
console.log('数组相加:', r)

// 获取全局对象
var globalThis = (function () {
  return (void 0, eval)('this')
})()

console.log('globalThis:', globalThis)

// 结果如下
eval json: {a: 1, b: 1} object
sumAdd: 30
数组相加: 22
globalThis: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

```html
// debug
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>

<body>
  <script>
    var sumAdd = eval(`(function add(num1, num2){
          console.log(this, num1, num2);
          debugger;
          return num1 + num1
        }
      )`)
    console.log("sumAdd", sumAdd)
    debugger
    sumAdd(10, 20);

  </script>
</body>

</html>
```

### eval 注意事项

* 安全性
* 调试困难
* 性能低
* 过于神秘，不好把握（分为直接调用和间接调用）
* 可读性可维护性也比较差

### 直接调用和间接调用

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>
    var name = "全局的name"
    function test() {
      var name = "local的name"
      console.log(eval(`name`)) // 直接调用, 直接调用时有正常的作用域链
      console.log(window.eval(`name`)) // 间接调用，只有全局的作用域
    }

    test();
  </script>
</body>

</html>

// 执行后打印结果如下
local的name
全局的name
```

| 调用方式 | 作用域           | 是否是严格模式 |
| -------- | ---------------- | -------------- |
| 直接调用 | ”正常的作用域链“ | 继承当前       |
| 间接调用 | ”只有全局作用域“ | 非严格模式     |

### eval 直接调用

* eval
* (eval)
* eval = window.eval
* {eval} = window
* with({eval})

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>

    var name = "全局的name"
    var log = console.log

    // 直接调用
    function test1() {
      var name = "local的name"
      log(eval('name'))
    }

    // 直接分组
    function test2() {
      var name = "local的name"
      log((eval)('name'))
    }

    // 直接复制，不修改名字
    function test3() {
      var name = "local的name"

      var eval = window.eval
      log(eval('name'))
    }

    // 解构不修改名字
    function test4() {
      var name = "local的name"

      // 切记，不能修改名字
      const { eval } = window
      log(eval('name'))
    }

    // with
    function test5() {
      var name = "local的name"
      with ({ eval }) {
        log(eval('name'))
      }
    }

    test1()
    test2()
    test3()
    test4()
    test5();
  </script>
</body>

</html>

// 输出如下
local的name
local的name
local的name
local的name
local的name
```

```html
// 间接调用
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>

    var name = "全局的name"
    var log = console.log

    // ,分组
    function test1() {
      var name = "local的name"
      log((0, eval)('name'))
    }

    // 直接复制，修改名字
    function test2() {
      var name = "local的name"

      var eval = window.eval
      var eval2 = eval
      log(eval2('name'))
    }

    // 解构修改名字
    function test3() {
      var name = "local的name"

      // 切记，不能修改名字
      const { eval: eval2 } = window
      log(eval2('name'))
    }

    test1()
    test2()
    test3();
  </script>
</body>

</html>

// 打印结果如下
全局的name
全局的name
全局的name
```

### new Function

* 作用：创建一个新的 Function
* 语法：`new Function([ arg1[,arg2,[...argN]],] functionBody)`
* 基本使用：`new Function("a", "b", "return a + b")(10,20)`

### new Function 经典案例

* webpack 的事件通知系统 tapable
* fast-josn-stringify

### new Function 注意事项

* new Function 基于全局环境创建
* 方法的 name 属性是 "anonymous"

```javascript
const fnStr = `console.log("name:", name)`

global.name = 'global的name'

var obj = {
  test() {
    var name = 'test的name'
    const fn = new Function(fnStr)
    fn()
  },
  testEval() {
    var name = 'testEval的name'
    const fn = eval(`(function() {${fnStr}})`)
    fn()
  },
}

obj.test() // name: global的name
obj.testEval() // name: testEval的name
```

```javascript
// 对象上的调用
global.name = 'global的name'
var fn = new Function(`console.log("name:", this.name)`)

var obj = {
  name: 'obj的name',
  fn,
}
fn() // name: global的name
obj.fn() // name: obj的name
```

### new Function 经典应用

* 获取全局 this
* 在线代码运行器
* 模板引擎

```javascript
var globalObj = new Function('return this')()
console.log(globalObj === global)
```

```html
// 在线代码运行器

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>在线代码编辑器</title>
  <style>
    textarea {
      overflow-y: auto;
      font-size: 22px;
    }
  </style>
</head>

<body>
  <div> <button type="button" id="btn">运行</button></div>
  <textarea id="code" rows="30" cols="80"></textarea>
  <div id="result"></div>
  <script>

    var scriptStr = `
function sum(num1, num2){
    return num1+ num2
}
return sum(10,20)
        `
    var codeEl = document.getElementById("code")
    var resultEl = document.getElementById("result")
    var btnEl = document.getElementById("btn")

    codeEl.value = scriptStr

    function createFun(body) {
      return new Function(body)
    }

    btnEl.addEventListener("click", () => {
      const fn = createFun(codeEl.value)
      var result = fn()
      resultEl.innerHTML = result
    })
  </script>
</body>
</html>
```

```html
// 模板引擎
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>模板</title>
</head>

<body>
  <div id="template">
    <div>名字:${name}</div>
    <div>年龄:${age}</div>
    <div>性别:${sex}</div>
    <div>性别:${c.b}</div>
    <div>商品:${products.join(",")}</div>
  </div>
  <script>
    function parse(source, data) {
      return new Function('data', `
                with(data){
                    return \`${source}\`
                }
            `)(data)
    }

    const result = parse(template.innerHTML, {
      name: "帅哥",
      age: 18,
      sex: "男",
      products: ["杯子", "瓜子"],
      c: {
        b: "哈哈"
      }
    })

    template.innerHTML = result;
  </script>
</body>

</html>
```

### eval VS new Function

| 名字         | 相同点                                                       | 不同点                                                       |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| eval         | 1. 动态编译和执行<br />2. 调试困难<br />3. 可读可维护性比较差<br />4. 可以被禁用(内容安全策略（CSP）) | 1. 直接调用和间接调用运行环境不一样<br />2. 安全性低<br />3. 不仅仅局限于创建环境 |
| new Function | 1. 动态编译和执行<br />2. 调试困难<br />3. 可读可维护性比较差<br />4. 可以被禁用 | 1. 被创建于全局环境                                          |

### 课后练习题

* 创建一个函数，动态执行异步代码

```javascript
var fn = createAsyncFun(`
    const res = await fetch("/");
    console.log("res:");
    return res.text();
`)
fn()
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err)
  })
```

```javascript
var AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

function createAsyncFun(...args) {
  return new AsyncFunction(...args)
}
```

