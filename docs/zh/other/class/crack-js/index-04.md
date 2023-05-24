# 04-运算符的妙用以及部分机理解析

推荐文章

[运算符:https://juejin.cn/post/7221418382107869242](https://juejin.cn/post/7221418382107869242)

 [【转载】(0, eval)(‘this’)](https://www.cnblogs.com/qianlegeqian/p/3950044.html)

[MDN-eval:直接应用+间接引用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)

## 01: 运算符的诡异现象

### 函数基础知识

- 普通函数调用时，this 指向的是调用函数的对象

```javascript
// 浏览器中执行

let myName = 'let的name' // let const 声明的变量 不会挂在 windows 属性上
const person = {
  myName: 'person的Name',
  getName() {
    return this.myName
  },
}

const getName = person.getName

const print = function (prefix, ...args) {
  console.log(prefix.padEnd(20, ' ') + ':', ...args)
}

print('getName', getName()) // undefined
print('person.getName', person.getName()) //  person的Name
print('(person.getName)', (person.getName)()) // person的Name
print('(0, person.getName)', (0, person.getName)()) // undefined
```

### let const 声明的变量不会挂载在 windows 上

```javascript
// 浏览器中执行

var nameVar = 'nameVar'
let nameLet = 'nameLet'
const nameConst = 'nameConst'

console.log('nameVar:', window.nameVar)
console.log('nameLet:', window.nameLet)
console.log('nameConst:', window.nameConst)
```

### 赋值

> (person.getName)()
>
> 有没有赋值操作？？
>
> 赋值的话值给了谁？？

#### 其中的引用

- 内部引用类型不是语言数据类型
- 用于解释诸如 delete typeof 和赋值操作符的行为
- 例如，赋值的**左操作数**应该产生一个引用记录

#### 引用相关的两个重要曹组

- GetValue(V): 即**取值**操作，返回的是确定的值
- PutValue(V,W): 设置值，对某个引用设置
- PutValue **要求第一个参数是引用（查看协议）**

#### v=v的理解

* 可以理解为 `v = GetValue(v)`
* v 在作为左手端的时候，它是引用
* 而作为右手端的时候，它是值

### 其他赋值操作

| *=赋值乘积 | /=赋值商   | %=赋值求余      |
| ---------- | ---------- | --------------- |
| +=赋值求和 | -=赋值求差 | <<==            |
| >>=        | >>>=       | &=              |
| ^=         | \|=        | &&=             |
|            |            | {a,b}={a:1,b:2} |

#### 分组运算符()

* 分组运算符里面可以是表达式，也可以是字面量的值
* **此算法不将 GetValue 应用于计算 Expression(表达式)的结果。这样做的主要原因是，诸如 delete typeof 等操作符可以应用于括号表达式**

#### (person.getName)()

* 并没有产生 getValue 操作，没有发生取值操作，也没有赋值操作

#### (0, person.getName)()

* 分组运算符
* 逗号运算符
  * MDN：逗号运算符，对它的的每个操作数**求值(从左到右)**,并返回最后一个操作数的值
* 此表达式，就产生了赋值操作，等同于(const getName = person.getName)()
* 那么 this 就是全局对象 window
* 结果就是 undefined

```javascript
// 赋值左操作数
var10 = 10;
10 = 10
// { a: 1 }  = { a: 1 }
```

### typeof 未声明变量为什么不报错(非严格模式)

* 未发生求值？？？
* 答案：引用不可答，直接返回 undefined

### 思考题

```javascript
// 浏览器中
var varNum = 10
function evalCode() {
  eval(`var varNum = 20`)
}

function evalCode2() {
  ;(0, eval)(`var varNum = 30`) 
  // 这里算是 eval 的间接引用，间接调用计算出来的是一个值，而不是引用
}
console.log('varNum:', varNum) // 10

evalCode()
console.log('varNum:', varNum) // 10
evalCode2()
console.log('varNum:', varNum) // 30
```

## 02：窥视delete语法的本质

### delete 的返回值是什么

* Boolean 类型
* true 不一定删除成功，代表**删除没有发生异常**
* false 代表一定没有删除成功

```javascript
var a = {
  p1: 1,
  p3: 5,
}

// 对象的属性
console.log('delete a.p1:', delete a.p1)
// 对象上不存在的属性
console.log('delete a.p2:', delete a.p2)
// 全局对象a
console.log('delete var a:', delete a)

console.log('')
console.log('var a:', a)

// 打印结果如下
delete a.p1: true
delete a.p2: true
delete var a: false

var a: { p3: 5 }
```

### delete 不能删除那些属性

```javascript
//var
function testVar() {
  var a = 1
  console.log('delete var a：：：', delete a)
  console.log('var a ：：：', a)
}
testVar()

//let const,
function testLet() {
  let a = 1
  console.log('delete let a：：：', delete a)
  console.log('let a ：：：', a)
}
//作用域在testLet 中
testLet()

//不可配置的
var obj = {}
Object.defineProperty(obj, 'name', { configurable: false })
console.log('delete obj.name', delete obj.name)
console.log('delete undefined：：：', delete undefined)
console.log(Object.getOwnPropertyDescriptor(window, 'undefined'))
console.log('delete Infinity：：：', delete Infinity)
console.log(Object.getOwnPropertyDescriptor(window, 'Infinity'))
console.log('delete NaN：：：', delete NaN)
console.log(Object.getOwnPropertyDescriptor(window, 'NaN'))
console.log('delete window：：：', delete window)
console.log(Object.getOwnPropertyDescriptor(window))
console.log('delete window.document：：：', delete window.document)
Object.getOwnPropertyDescriptor(window, 'document')
// 各种内置原型
console.log('delete Object.prototype：：：', delete Object.prototype)
Object.getOwnPropertyDescriptor(Object, 'prototype')
// 内置Math的函数
console.log('delete Math.PI：：：', delete Math.PI)
Object.getOwnPropertyDescriptor(Math, 'PI')
//函数
function fn() {}
console.log('delete fn：：：', delete fn)
console.log(Object.getOwnPropertyDescriptor(window, 'fn'))
```

* 任何使用 var 声明的属性，不能从全局作用域或者函数的作用域中删除

* 任何使用 let 或者 const 声明的属性，不能从它声明的作用域删除

  ```javascript
  // var let const 
  //var 
  function testVar() {
      var a = 1;
      console.log("delete var a:", delete a);
      console.log("var a :", a);
  }
  testVar();
  
  //let const,
  function testLet() {
      let a = 1;
      console.log("delete let a:", delete a);
      console.log("let a :", a);
  }
  //作用域在testLet 中
  testLet();

* 不可配置(configurable)的属性不能被删除

  ```javascript
  //不可配置的
  var obj = {};
  Object.defineProperty(obj, 'name', { configurable: false });
  console.log("delete obj.name", delete obj.name);
  
  // undefined
  console.log("delete undefined:", delete undefined);
  console.log(Object.getOwnPropertyDescriptor(global, "undefined"));
  
  // Infinity
  console.log("delete Infinity:", delete Infinity);
  console.log(Object.getOwnPropertyDescriptor(global, "Infinity"));
  
  // NaN
  console.log("delete NaN:", delete NaN);
  console.log(Object.getOwnPropertyDescriptor(global, "NaN"));
  
  // window
  // console.log("delete window:", delete window);
  // console.log(Object.getOwnPropertyDescriptor(window));
  
  // document
  // console.log("delete window.document", delete window.document);
  // Object.getOwnPropertyDescriptor(window, "document");
  ```

  ```javascript
  // delete 内置
  // 各种内置原型
  console.log("delete Object.prototype", delete Object.prototype); // false
  Object.getOwnPropertyDescriptor(Object, "prototype")
  
  // 内置Math的函数
  console.log("delete Math.PI", delete Math.PI); // false
  Object.getOwnPropertyDescriptor(Math, "PI")
  ```

### delete 删除原型属性

* delete 不会遍历原型链，或者说姿势不对
* delete Foo.prototype.bar

```javascript
// 原型上的属性
function Foo() {
  this.bar = 10
}
Foo.prototype.bar = 42
var foo = new Foo()
// 返回 true，因为删除的是 foo 对象的自身属性
delete foo.bar
// foo.bar 仍然可用，因为它在原型链上可用。
console.log(foo.bar) //42
// 从原型上删除属性
delete Foo.prototype.bar //true
// 由于已删除“ bar”属性，因此不能再从Foo继承它。
console.log(foo.bar) //undefined
```

````javascript
// delete 删除原型上的属性
function Foo() {
    this.bar = 10;
}
Foo.prototype.bar = 42;
var foo = new Foo();
// 返回 true，因为删除的是 foo 对象的自身属性
delete foo.bar;
// foo.bar 仍然可用，因为它在原型链上可用。
console.log("delete 删除自身属性：：：",foo.bar);   // 42
// 从原型上删除属性
delete Foo.prototype.bar; //true
// 由于已删除“ bar”属性，因此不能再从Foo继承它。
console.log("delete 删除原型属性：：：",foo.bar);    // undefined
````

### delete 到底删除的是什么

```javascript
delete 10; //true
var trees = ["redwood","bay","cedar","oak","maple"];
delete trees[3];
console.log("trees:",trees);
// trees：：：  ["redwood", "bay", "cedar", empty, "maple"]
delete {}
var x = 1;
delete x
// 浏览器中运行
var x = 1;
delete window.x;
```

#### delete 协议描述

> If ref is not a Reference Record, return true

#### delete 语法的本质是什么

* 操作表达式结果
* **值，字面量**，不操作，直接返回 true
* **引用类型**，删除引用

#### 严格模式

* SyntaxError: 变量，函数名，函数参数
* TypeError: configurable: false
* ReferenceError: 典型的就是 delete super.property

```javascript
// 严格 变量 SyntaxError 
'use strict'
// 变量
var name = 'name'
delete name

// 函数
function fn() {}
delete fn

function fnArg(name) {
  delete name
}
fnArg()
```

```javascript
// 严格 configurableTypeError  
'use strict'

var person = {
  name: '帅哥',
}

Object.defineProperty(person, 'name', {
  configurable: false,
})

delete person.name
```

```javascript
// 严格 refer
'use strict'

class Parent {
  constructor(name) {
    this.name = name
  }
  getName() {}
}

class Child extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  deleteAny() {
    console.log('super', super.getName)
    delete super.getName
  }
}

var child = new Child('child', 18)
delete child.deleteAny() // ReferenceError: Unsupported reference to 'super'
```

```javascript
// var 非var
var nameVar = 'nameVar'
nameNotVar = 'nameNotVar'
console.log('nameVar', Object.getOwnPropertyDescriptor(window, 'nameVar'))
console.log('nameNotVar', Object.getOwnPropertyDescriptor(window, 'nameNotVar'))

// 打印结果如下
nameVar {
  "value": "nameVar",
  "writable": true,
  "enumerable": true,
  "configurable": false
}
nameNotVar {
  "value": "nameNotVar",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
```

### 思考题

```javascript
console.log('delete null     :', delete null) // null 是一个常量 
console.log('delete 11       :', delete 11)
console.log('delete undefined:', delete undefined) // undefined是 window 的属性

a = { c: 12 }
console.log('delete a        :', delete a) 
// 不是通过 var 声明的 configurable 为true 可以被删除

var b = 12
console.log('delete b        :', delete b) 
// 通过 var 声明的 configurable 为false，不可被 delete

console.log('delete xxxxxxxxx:', delete xxxxxxxxx) 
// 不可达未定义，delete 直接返回 true

var obj = {}
console.log('delete .toString:', delete obj.toString)
console.log('obj.toString:', obj.toString)

// 打印结果如下(浏览器中使用)
delete null     : true
delete 11       : true
delete undefined: false
delete a        : true
delete b        : false
delete xxxxxxxxx: true
delete .toString: true
obj.toString: ƒ toString() { [native code] }
```

