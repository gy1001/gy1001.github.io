# ES6 面试题

## 1. ECMASCRIPT 怎么写 class, 为何会出现 class?

class 是一个语法糖，它只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHello() {
    console.log(`你好，我叫${this.name}，今年${this.age}岁`)
  }
}
let p = new Person('张三', 18)
p.sayHello() // 你好，我叫张三，今年18岁
```

为何会出现 class

> 在 ES5 中，主要通过子类-子类原型-父类的关系，通过构造函数和原型实现继承。
>
> ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。
>
> 通过 class 关键字，可以定义类。**Class 的出现主要是为了让对象原型的写法更加清晰，更像面向对象编程的语法。**

## 2. ES5 和 ES6 的区别

1. let 声明变量，const 声明常量，块级作用域， es5 没有，var 会变量提升
2. 箭头函数，es5 没有
3. 模板字符串，es5 没有
4. 解构赋值 (从数组对象中提取值，对变量进行赋值)，es5 没有
5. 扩展运算符，es5 没有
6. 对象属性简写，es5 没有
7. Promise，es5 没有
8. Set 和 Map，es5 没有
9. Proxy，es5 没有
10. Symbol，es5 没有
11. for...of（循环遍历数组），es5 没有
12. class 类，es5 没有
13. 模块化 import export，es5 没有
14. 修饰器 @decorator，es5 没有
15. 异步 async await，es5 没有

## 3. ES6 的模板字符串有哪些新特新？并实现一个模板字符串的功能？

字符串格式化
表达式嵌入到模板字符串中，进行拼接
${expression}

特性

- 模板字符串可以包含多行文本。
- 模板字符串中的变量可以被嵌入到文本中。
- 模板字符串可以进行嵌套。

```js
let name = '张三'
let age = 18
let str = `你好，我叫${name}，今年${age}岁`
console.log(str)
```

仿写

```js
function template(str, data) {
  return str.replace(/\${(\w*)}/g, function(match, $index) {
    return data[$index];
  });
}

// 使用示例
const message = template`你好，我的名字是 ${name}，我今年 ${age} 岁。`, {name: 'Alice', age: 25};
console.log(message);
```

```js
// 定义一个函数用于处理模板字符串
function templateString(strings, ...values) {
  // 将模板字符串和变量值拼接成一个字符串
  let result = ''
  for (let i = 0; i < strings.length; i++) {
    result += strings[i] + values[i]
  }
  return result
}

// 使用示例
const name = 'Alice'
const age = 25

// 使用模板字符串
const message = templateString`你好，我的名字是 ${name}，我今年 ${age} 岁。`
console.log(message)
```

## 4. 说说你对 Generator 的理解

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

迭代器生成函数,返回一个迭代器，可以异步调用，支持挂起操作。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有一个星号；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。

```js
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

var hw = helloWorldGenerator()
console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'ending', done: true }
```

## 5. Promise 有几种状态，什么时候进入 catch?

> Promise 状态不可逆

- Pending: 初始状态，既不是成功，也不是失败状态。
- Fulfilled: 意味着操作成功完成。
- Rejected: 意味着操作失败。

当执行器函数抛出错误时，promise 对象会进入 rejected 状态。

```js
const promise = new Promise((resolve, reject) => {
  throw new Error('出错了')
})

promise.catch((error) => {})
```

## 6. Set、Map、WeakSet、WeakMap 有什么区别？

1.Set

> set 表示集合，可以存储原始值和对象引用，存储的数据必须是唯一值

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身就是一个构造函数，用来生成 Set 数据结构。

成员唯一、无序且不重复；

[value, value]，键值与键名是一致的（或者说只有键值，没有键名）；

可以遍历，方法有：add、delete、has。

```js
size()
add()
delete()
has()
clear()
```

2.WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

成员都是对象；

成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏；

不能遍历，没有 size 属性，方法有限 add、delete、has。

3.Map

> map 表示字典，用键值对的形式存放数据，键和值可以是原始值和对象引用

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作按键。这给它的使用带来了很大的限制。

可以遍历，方法很多，可以跟各种数据格式转换。

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如 0 和-0 就是一个键，布尔值 true 和字符串 true 则是两个不同的键。另外，undefined 和 null 也是两个不同的键。虽然 NaN 不严格相等于自身，但 Map 将其视为同一个键。

```js
size()
set(key, value)
get(key)
has(key)
delete key
clear()
```

4.WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。

只接受对象最为键名（null 除外），不接受其他类型的值作为键名；

键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的；

不能遍历，方法有限 get、set、has、delete。

## 7. var let const 之间的区别

- var 声明的变量，可以重复声明,存在变量提升，在声明之前可以使用，值为 undefined。
- let 声明的变量，不存在变量提升，在声明之前不能使用，值为暂时性死区。
- const 声明的变量，不存在变量提升，在声明之前不能使用，值为暂时性死区。
- var 不受限于块级，let const 受限制于块级
- const 声明后必须赋值，否则报错，var let 不受限制
- const 用于声明常量，不能更改

## 8. 将下面的 for 循环改写为 for...of 循环

```js
let arr = [1, 2, 3, 4, 5]
let sum = 0
for (let i = 0; i < arr.length; i++) {
  sum += arr[i]
}
```

使用 for of

```js
for (const value of arr) {
  sum += value
}
```

## 9. forEach for...in 和 for...of 的区别

- forEach 遍历数组，
- for...in 遍历数组
- for...of 遍历数组或者对象
- for in 循环出的时 key,for of 循环出的是 value

## 10. 模块化开发

export 导出

一个模块就是一个独立的文件，内部变量，外部无法获取

```js
// 用法 1
export var name = 'shang'
export var age = 20

// 用法 2
var name = 'shang'
var age = 20
export { name, age }

// 用法 3: 重新命名导出
var name = 'shang'
var age = 20
export { name as name1, age as age1 }
```

export default 默认导出，只能有一个

```js
export var name = 'shang'
export default var age = 20
```

import 导入

```js
import { name, age } from './module.js'
// 如果 默认导出 age
import age {name} from "./module.js"
```

## 11. 请问对象的扩展有哪些？

遍历方式

- Object.keys()
- Object.values()
- Object.entries()
- Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
- Object.is() 判断两个值是否相等
- Object.assign() 对象合并，复制到目标对象，浅拷贝

```js
const obj = {
  name: 'shang',
  age: 20,
  gender: 'male',
}
const obj2 = {
  sex: 'male',
  height: 180,
}

for (const key of Object.keys(obj)) {
  console.log(key) // 输出：name age gender
}

for (const value of Object.values(obj)) {
  console.log(value) // 输出：shang 20 male
}

for (const [key, value] of Object.entries(obj)) {
  console.log(key, value) // 输出：name shang  age 20  gender male
}

console.log(Object.is(1, 1)) // true
console.log(Object.is(NaN, NaN)) // true

console.log(Reflect.ownKeys(obj)) // 输出：["name", "age", "gender"]

console.log(Object.assign(obj, obj2)) // 浅拷贝
```

## 12. 请问字符串增添哪些方法 ？

```js
let name = '张三'
let age = 18
let str = `你好，我叫${name}，今年${age}岁`

// includes 判断字符串里面是否包含某个字符串
const str2 = '张三李四王五'

console.log(str2.includes('张三')) // true
console.log(str2.includes('张三', 1)) // false 第二个参数是：在字符串中开始搜索 searchString 的位置，默认 0
console.log(str2.includes('张三', 1, 3)) // false

// startsWith 判断字符串是否以某个字符串开头
console.log(str2.startsWith('张三')) // true
console.log(str2.startsWith('张三', 1)) // false

// endsWith 判断字符串是否以某个字符串结尾
console.log(str2.endsWith('王五')) // true
console.log(str2.endsWith('王五', 1)) // false

// repeat 重复字符串
console.log(str2.repeat(2)) // 张三李四王五张三李四王五

// padStart padEnd 字符串补全
let str3 = '123'
console.log(str3.padStart(5, '0')) // 00123
console.log(str3.padEnd(5, '0')) // 12300

// trim trimStart trimEnd 去除字符串两端空格
let str4 = '  123  '
console.log('-' + str4.trim() + '-') // -123-
console.log('-' + str4.trimStart() + '-') // -123  -
console.log('-' + str4.trimEnd() + '-') // -  123-
```

## 13. 如何使用 Set 去重

```js
const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
const set = new Set(arr)
const newArr = Array.from(set)
console.log(newArr) // [1, 2, 3, 4, 5]
```

## 14. 使用 class 手写一个 Promise

```js
Class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = null
    this.callbacks = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.callbacks.forEach(callback => {
          callback.onFulfilled(value)
        })
    }

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.value = reason
        this.callbacks.forEach(callback => {
          callback.onRejected(reason)
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        const x = onFulfilled(this.value)
        if (x instanceof MyPromise) {
          x.then(resolve, reject)
          return
        }
        resolve(x)

      }
      if (this.state === 'rejected') {
        const x = onRejected(this.value)
        if (x instanceof MyPromise) {
          x.then(resolve, reject)
          return
        }
        reject(x)
      }

      if (this.state === 'pending') {
        this.callbacks.push({
          onFulfilled: value => {
            const x = onFulfilled(value)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
              return
            }
            resolve(x)
          },
          onRejected: reason => {
            const x = onRejected(reason)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
              return
            }
            reject(x)
          }
        })
      }
  })

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(value) {
    return new MyPromise(resolve => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = []
      let count = 0
      for (let i = 0; i < promises.length; i++) {

        promises[i].then(value => {
          count++
          results[i] = value
          if (count === promises.length) {
            resolve(results)
          }
        })

        .catch(reason => {
          reject(reason)
        })
      }
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {

        promises[i].then(value => {
          resolve(value)
        })
        .catch(reason => {
          reject(reason)
        })
      }
    })
  }
}
```

## 15. 使用箭头函数需要注意什么

- this 不能使用 call apply bind 改变
- 没有 arguments 对象
- 没有原型
- 不能作为构造函数
- 没有 super
- 不能使用 new.target 关键字

## 16. 数组新增哪些方法，并指明它的用法？

- Array.prototype.from() : 将类数组转换成数组，比如：对象、set、map
- Array.prototype.of() : 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
- Array.prototype.find() : 返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined
- Array.prototype.fill() : 使用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
- Array.prototype.findIndex() : 返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1
- Array.prototype.keys() : 返回一个包含数组中每个索引键的 Array Iterator 对象
- Array.prototype.values() : 返回一个包含数组中每个索引键的 Array Iterator 对象
- Array.prototype.entries() : 返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对
- Array.prototype.includes() : 判断一个数组是否包含一个指定的值
- Array.prototype.flat() : 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
- Array.prototype.flatMap() : 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。它等价于在调用 map() 方法后再调用深度为 1 的 flat() 方法（arr.map(...args).flat()），但比分别调用这两个方法稍微更高效一些。

```js
Array.of(3, 11, 2) // [3, 11, 2]
Array.of(3) // [3]
Array.of(3).length // 1

const array1 = [1, 2, 3, 4]
// Fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4))
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(array1.fill(5, 1))
// Expected output: Array [1, 5, 5, 5]

console.log(array1.fill(6))
// Expected output: Array [6, 6, 6, 6]

const arr = [1, 2, 3, 4, 5]
const newArr = arr.find((item) => item > 3)
console.log(newArr) // 4

console.log(arr.findIndex((item) => item > 3)) // 3

// keys
const array1 = ['a', 'b', 'c']
const iterator = array1.keys()

for (const key of iterator) {
  console.log(key)
}

// entries
const a = ['a', 'b', 'c']

for (const [index, element] of a.entries()) {
  console.log(index, element)
}

// 0 'a'
// 1 'b'
// 2 'c'

const array1 = ['a', 'b', 'c']
const iterator1 = array1.entries()
console.log(iterator1.next().value)
// Expected output: Array [0, "a"]

console.log(iterator1.next().value)
// Expected output: Array [1, "b"]

// flat
const arr1 = [0, 1, 2, [3, 4]]

console.log(arr1.flat())
// expected output: Array [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]]

console.log(arr2.flat())
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log(arr2.flat(2))
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

console.log(arr2.flat(Infinity))
// expected output: Array [0, 1, 2, 3, 4, 5]

// flatMap
const arr3 = [1, 2, 3, 4]

console.log(arr3.flatMap((x) => [x, x * 2]))
// [1, 2, 2, 4, 3, 6, 4, 8]
```

## 17. 说一说箭头函数和普通函数的区别

- 比普通函数更加简洁
- 没有 arguments 对象
- 没有 prototype 属性 this 指向
- 箭头函数不能用作构造函数，没有 super, 没有 new.target
- 使用 call bind apply 无法改变 this 指向
- 箭头函数没有 generator 属性, 不能使用 yield 关键字

```js
function A(a) {
  console.log(arguments)
}
A(1, 2, 3) // 1 2 3

const B = (a) => {
  console.log(arguments)
}
B(1, 2, 3) // undefined

const BRest = (...c) => {
  console.log(c)
}
BRest(1, 2, 3) // [1, 2, 3]
```
