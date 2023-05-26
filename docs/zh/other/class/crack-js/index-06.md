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
