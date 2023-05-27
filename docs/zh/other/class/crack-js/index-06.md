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

* 全局执行上下文
* 函数执行上下文
* eval 函数执行上下文

#### 执行栈（调用栈）

* 是一种拥有(后进先出)数据结构的栈，被用来存储代码运行时创建的所有执行上下文

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

* 作用域：一个独立的区域。主要的用途就是隔离变量

* 全局作用域
* 函数作用域
* 块作用域（ES6）

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

* 作用域也可以根据代码层次分层，以便子作用域可以访问父级作用域，而不能从父作用域引用子作用域中的变量和引用

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

* 访问“后”声明的变量

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
num1= undefined
num2= undefined
num1= 1
num2= 2
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

* let、const 变量显式赋值之前不能对变量进行读写，否则就会报错

```javascript
var num = 1
{
  num = 2
  let num
}

// ReferenceError: Cannot access 'num' before initialization
```

### 闭包

* 内部函数访问了上层作用域链中的变量对象

```javascript
// setTimeout函数不止有第三个参数，后面甚至可以紧跟无数个参数！三个以后得参数可以作为前面的回调函数的附加参数.

for (var i = 0; i < 5; ++i) {
  setTimeout(
    function () {
      console.log(i + ' ')
    },
    100
  )
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
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>
    var globalScope = "全局作用域"

    function checkScope() {
      var a = 1
      var b = 1
      console.log("b:", b)
      function returnFun() {
        return a++
      }
      return returnFun
    }

    var test = checkScope()

    const a1 = test()
    console.log("a1:", a1)

    const a2 = test()
    console.log("a2:", a2)

    const a3 = test()
    console.log("a3:", a3);

  </script>
</body>

</html>

// 执行效果如下
b: 1
a1: 1
a2: 2
a3: 3
```

```html
// 闭包
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
    var globalScope = "全局作用域"

    function checkScope() {
      var a = 1
      var b = 1
      console.log("b:", b)
      function returnFun() {
        return a++
      }
      return returnFun
    }

    var test = checkScope()

    const a1 = test()
    console.log("a1:", a1)

    const a2 = test()
    console.log("a2:", a2)

    const a3 = test()
    console.log("a3:", a3)


    var test1 = checkScope()
    const a4 = test1()
    console.log("test1 a4:", a4);
  </script>
</body>

</html>

// 执行结果如下 
b: 1
a1: 1
a2: 2
a3: 3
b: 1
a4: 1
```

### IIFE

* Immediately Invoked Function Expressions 也就是立即调用函数表达式

```javascript
;(function (num1, num2) {
  console.log(num1 + num2)
})(7, 9)
;((function (num1, num2) {
  console.log(num1 + num2)
})(7, 9))
;+ function (num1, num2) {
  console.log(num1 + num2)
}(7, 9)
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

## 02：name,length,caller等重要却少被关注的属性

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
function doSomething() { }
doSomething.name;  // "doSomething"

//构造函数的名称: 使用new Function(...)语法创建的函数或只是 Function(...) create Function对象及其名称为“anonymous”。
(new Function).name; // "anonymous"

// 推断函数名称: 变量和方法可以从句法位置推断匿名函数的名称（ECMAScript 2015 中新增）。
var f = function() {};
var object = {
  someMethod: function() {}
};

console.log(f.name); // "f"
console.log(object.someMethod.name); // "someMethod"

// 你可以在 函数表达式中定义函数的名称：
var object = {
  someMethod: function object_someMethod() {}
};

console.log(object.someMethod.name); // "object_someMethod"

try { object_someMethod } catch(e) { alert(e); }
// ReferenceError: object_someMethod is not defined

// 你不能更改函数的名称，此属性是只读的： 

//简写方法的名称
var o = { foo(){} };
o.foo.name; // "foo";

// 绑定函数的名称: Function.bind() 所创建的函数将会在函数的名称前加上"bound " 。
function foo() {};
foo.bind({}).name; // "bound foo"

// getters 和 setters 的函数名: 当通过 get 和 set 访问器来存取属性时，"get" 或 "set" 会出现在函数名称前。
var o = {
  get foo(){},
  set foo(x){}
};

var descriptor = Object.getOwnPropertyDescriptor(o, "foo");
descriptor.get.name; // "get foo"
descriptor.set.name; // "set foo";

// 类中的函数名称: 你可以使用obj.constructor.name来检查对象的“类”（但请务必阅读以下警告）：
function Foo() {}  // ES2015 Syntax: class Foo {}
var fooInstance = new Foo();
console.log(fooInstance.constructor.name); // logs "Foo"

// Symbol 作为函数名称: 如果Symbol 被用于函数名称，并且这个 symbol 具有相应的描述符，那么方法的名字就是方括号中的描述符。
var sym1 = Symbol("foo");
var sym2 = Symbol();
var o = {
  [sym1]: function(){},
  [sym2]: function(){}
};
o[sym1].name; // "[foo]"
o[sym2].name; // ""

```

### Function.length 定义

* length 是函数对象的一个属性值，指该函数有多少个必须要换入的参数，即形参的个数
* 不包含剩余参数
* 不包含有默认值的参数
* bind 之后的length：length -  bind 的参数个数

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

* arguments.length 是实际参数长度
* Function.length 是形参的长度

#### 用途

* 柯里化

### Function.caller

#### 特性

* 该特性为非标准，尽量不要在生产环境中使用
* 定义：返回调用特定函数的函数
* 全局作用域内被调用，返回 null
* 函数内部作用域调用，指向调用它的那个函数

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

* caller callee arguments 属性都不可用

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

* 调用栈信息收集
* 调用环境检查

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
stacks: [ '', 'c', 'b' ]
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

* 包含正在执行的函数
* 严格模式禁止使用

#### 起源

* 匿名函数递归问题

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

* 递归调用以后会获取到不同的 this 值

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

## 03: 函数的this之全解析

### this 是什么

* 执行上下文（global function 或者 eval）的一个属性
* 在非严格模式下，总是指向一个对象
* 在严格模式下可以是任意值

#### 绑定规则

* 默认绑定
* 隐式绑定
* 显式绑定
* new
* 箭头函数

#### 默认绑定

##### 非严格模式

* 浏览器：this 指向 window
* nodejs: this 指向 globel

##### 严格模式

* 浏览器：undefined
* nodejs: undefined

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

* 作为某个对象的属性被调用的时候

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

* EventTarget, FileReader 等
* 

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
  <button id="btn" type="button">按钮</button>
  <script>
    btn.addEventListener("click", function () {
      console.log("this:btn", this)   // btn
    })


    var request = new XMLHttpRequest()
    request.open("GET", "./")
    request.send()
    request.onloadend = function () {
      console.log("this:XMLHttpRequest", this)  // XMLHttpRequest
    }
  </script>
</body>

</html>

// 执行结果如下
this:XMLHttpRequest XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}

// 点击按钮后，打印如下
this:btn <button id="btn" type="button">按钮</button>
```

### 显式绑定

* 显式表达谁是 this
* Function.prototype.call
* Function.prototype.apply
* Function.prototype.bind
* 属性绑定符

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

````javascript
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
{ name: 'name1' }
name1
````

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

* 实例化一个函数或者 ES6 的 class
* 对于 Function return 会影响返回值
  * return 非对象时，实际返回系统内部的对象
  * return 对象时，实际返回该对象

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

* 创建一个空对象
* 设置空对象的原型
* 指向构造函数的方法，把相关属性和方法添加到对象上
* 返回对象。如果构造函数返回的值是对象类型，就直接返回该对象，反之返回第一步创建的对象

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

* 简单
* 没有自己的 this, arguments, super, new.target
* 适合需要匿名函数的地方
* 不能用于构造函数

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
log(person.getName())  // 全局的name

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

### 动态this

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

* bind
* 箭头函数

### 课后思考题

* 被显式绑定后，能不能解除绑定????

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
;(1, person.logName)();
(false || person.logName)()

// person window window
```

## 04: 神奇的call.call, call.call.call

