# 变量类型和计算
## 1. 值类型和引用类型

> 值类型在栈中存储
> 引用类型，值的大小不固定。栈内存中存放地址，地址指向堆内存中的对象，是按引用访问的。

```javascript
// 值类型
let a = 100
let b = a
a = 200
console.log(b) // 100
// 引用类型
let a = { age: 20 }
let b = a
b.age = 21
console.log(a.age) // 21
```
## 2. 栈、堆内存的优缺点
1. 在JS中，基本数据类型变量大小固定，并且操作简单容易，所以把它们放入栈中存储。 引用类型变量大小不固定，所以把它们分配给堆中，让他们申请空间的时候自己确定大小，这样把它们分开存储能够使得程序运行起来占用的内存最小。

2. 栈内存由于它的特点，所以它的系统效率较高。 堆内存需要分配空间和地址，还要把地址存到栈中，所以效率低于栈。 

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06b2402afbf84123a023574882d6da09~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

深入分析：基本类型的值是存放在 栈区 的，即内存中的栈内存，引用类型的值是同时保存在 栈内存和堆内存 的
(这么做是为了性能)
[相关阅读](https://learnku.com/articles/38192)

## 3. 常见值类型
**常见值类型：undefined string number null symbol undefined boolean**
```javascript
const a // undefined
const s = "abc" 
const n = 100
const b = true
const s = Symbol('s')
```

## 4. 常见引用类型
**常见引用类型：Array Function Object Date RegExp 等**（注意：Function 是一个特殊引用类型，但不用于存储数据，所以没有拷贝、复制函数这一说）
```javascript
const obj = { x: 100 }
const arr = ['a', 'b', 'c']
const n = null // 特殊引用类型，指针指向为空地址
// 特殊引用类型，但不用于存储数据，所以没有"拷贝、负值函数"一说
function fn () {}
```
## 4. typeof 运算符
- 识别所有值类型
- 识别函数
- 能识别引用类型（但是不能在细分）

```javascript
let a
console.log(typeof a) // "undefined"
const str = 'abc'
console.log(typeof str) // "string"
const n = 100
console.log(typeof n) // "number"
const b = true
console.log(typeof b) // "boolean"
const s = Symbol('s')
console.log(typeof s) // "symbol"
console.log(typeof console.log) // "function"
console.log(typeof function () {}) // "function"
// 能识别引用类型（但是不能在细分）
typeof null // "object"
typeof ['a', 'b'] //"object"
typeof { x: 100 } // "object"
```

## 5. 手写深拷贝

- 注意判断值类型和引用类型
- 注意判断是数组还是对象
- 递归

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>js -深拷贝</title>
  </head>
  <body></body>
  <script>
    /*
     * 深拷贝
     * obj: 要拷贝的对象
     */
    function deepClone (obj) {
      // obj 是null 或者 不是数组和对象，就直接返回
      if (typeof obj !== 'object' || obj === null) {
        return obj
      }
      // 初始化返回结果
      let result
      if (obj instanceof Array) {
        result = []
      } else {
        result = {}
      }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // 保证key不是原型的属性
          // 递归调用
          result[key] = deepClone(obj[key])
        }
      }
      return result
    }
    const objA = {
      age: 20,
      name: '孙悟空',
      address: {
        city: '北京'
      },
      arr: ['a', 'b', 'c']
    }
    const objB = deepClone(objA)
    const objC = objA
    objA.address.city = '北京市朝阳区'
    console.log(objB.address.city) // 北京
    console.log(objC.address.city) // 北京市朝阳区
  </script>
</html>
```
## 6. 变量计算-类型转换

### 6.1 字符串拼接
```javascript
const a = 100 + 10 // 110
const b = 100 + '10' // "10010"
const c = true + '10' // "true10"
```
### 6.2 == 运算符
```javascript
100 == '100' // true
0 == '' // true
0 == false // true
false == '' // true
null == undefined // true

// 除了 == null 之外，其他都一律用 === 例如
const obj = { x: 100 }
if (obj.a == null) { }
// 相当于
// if (obj.a === null || obj.a === undefined) { }
```

## 6.3 if 语句和逻辑运算
- truthy 变量：  !!a === true 的变量
- falsy 变量：!!a === false 的变量

```javascript
// 以下是 falsy 变量，除此之外都是 truthy 变量
!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undefined === false
!!false === false
// 逻辑判断
console.log(10 && 0) // 0
console.log('' || 'abc') // "abc"
console.log(!window.abc) // true
// 等等
```
## 回答题目
### 1. typeof 能判断哪些类型
- 识别所有值类型
- 识别函数
- 能识别引用类型（但是不能在细分）

### 2. 何时使用 === 何时使用 ==
> 除了 == null 之外，其他都一律用 === 例如
```javascript
const obj = { x: 100 }
if (obj.a == null) {
}
// 相当于
// if (obj.a === null || obj.a === undefined) { }
```

### 3. 值类型和引用类型的区别
- 存储位置不一样
  - 值类型的变量会保存在栈内存中。
  - 引用类型的变量名会保存在栈内存中，但是变量值会存储在堆内存中。
- 赋值方式不一样
  - 值类型的变量直接赋值就是深复制。
  - 引用类型的变量直接赋值实际上是传递引用，只是浅复制。
- 值类型无法添加属性和方法，引用类型可以添加属性和方法
- 值类型的比较是值的比较，引用类型的比较是引用地址的比较

```javascript
const obj1 = { x: 100, y: 200 }
const obj2 = obj1
let x1 = obj1.x
obj2.x = 101
x1 = 102
console.log(obj1) // { x: 101, y: 200 }
```
### 4. 手写深拷贝

参考上述答案
