# 08-编写高质量代码 - 正确，完整，清晰，鲁棒

> 能在规定时间内写出功能健全、思路清晰、格式规整的代码，这是前端工程师的必备技能，所以面试时必考手写代码。本章将通过多个面试题，讲解前端常考的写代码问题，并总结出高质量代码的关键点。

## 01: 开始

能在规定时间内写出功能健全、思路清晰、格式规整的代码，这是前端工程师的必备技能，所以面试时必考手写代码。本章将通过多个面试题，讲解前端常考的写代码问题，并总结出高质量代码的关键点。

### 为何要考察

代码是成员的一张脸。如果代码都写不好，那不具备基本的工作能力。所以，面试都要考察手写代码。

而且，实际工作中，多人协同做项目，你自己写不好代码，会影响整个项目。所以，代码写不好，工作找不到。

### 考察重点

- 代码规范性
- 功能完整性
- 鲁棒性(健壮性)

### 注意事项

面试不一定要求在纸上写代码，所以建议带着自己的笔记本电脑去面试，写代码时可以咨询面试官可否在电脑上写。

### 看几个题目

- 请手写一个 JS 函数，实现数组扁平化（Array Flatten)
- 请手写一个 LazyMan（实现 sleep 机制）
- 请手写一个 EventBus（自定义事件）

## 02: 高质量代码的特点

软件工程师日常工作主要就是写代码，工作产出也是代码。代码是我们的一张脸，能写出高质量的代码，本身就应该是我们自己对自己的要求。

对于企业来讲，更希望能招聘到产出高质量代码的员工。企业的软件产品都是多个程序员合作写出来的，如果一旦有一位程序员产出代码质量不高，则会严重影响整个软件产品的质量。

很多同学面试完了之后，觉得自己写的代码也都对，正常执行也都没问题。但是最后面试没有通过，就很纳闷，觉得自己非技术方面有问题。其实不然，也许是你的代码是对的，但质量不高。

### 规范性

记得前些年和一位同事（也是资深面试官）聊天时，他说到：一个候选人写完了代码，不用去执行，你打眼一看就知道他水平怎样。看写的是不是整洁、规范、易读，好的代码应该是简洁漂亮的，应该能明显的表达出人的思路。

代码规范性，包括两部分。<br>
第一，就是我们日常用 [eslint](https://eslint.org/) 配置的规则。例如用单引号还是双引号，哪里应该有空格，行尾是否有分号等。这些是可以统一规定的。

第二，就是代码可读性和逻辑清晰性。
例如变量、函数的命名应该有语义，不能随便 `x1` `x2` 这样命名。再例如，一个函数超过 100 行代码就应该拆分一下，否则不易读。
再例如，一段代码如果被多个地方使用，应该抽离为一个函数，复用。像这些是 eslint 无法统一规定的，需要我们程序员去判断和优化。
再例如，在难懂的地方加注释。

PS：发现很多同学写英文单词经常写错，这是一个大问题。可以使用一些工具来做提醒，例如 [vscode spell checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)。

### 完整性

代码功能要完整，不能顾头不顾尾。例如，让你找到 DOM 节点子元素，结果只返回了 Element ，没有返回 Text 和 Comment 。

要保证代码的完整性，需要两个要素。第一，要有这个意识，并且去刻意学习、练习。第二，需要全面了解代码操作对象的完整数据结构，不能只看常用的部分，忽略其他部分。

### 鲁棒性

“鲁棒”是英文 Robust 的音译，意思是强壮的、耐用的。即，不能轻易出错，要兼容一些意外情况。

例如你定义了一个函数 `function ajax(url, callback) {...}` ，我这样调用 `ajax('xxx', 100)` 可能就会报错。因为 `100` 并不是函数，它要当作函数执行会报错的。

再例如，一些处理数字的算法，要考虑数字的最大值、最小值，考虑数字是 `0` 或者负数。在例如，想要通过 `url` 传递一些数据，要考虑 `url` 的最大长度限制，以及浏览器差异。

PS：使用 Typescript 可以有效的避免类型问题，是鲁棒性的有效方式。

### 总结

高质量代码的特点：

- 规范性：符合代码规范，逻辑清晰可读
- 完整性：考虑全面所有功能
- 鲁棒性：处理异常输入和边界情况

## 03: 手写一个 JS 函数，实现数组扁平化 Array Flatten

### 题目

写一个函数，实现 Array flatten 扁平化，只减少一个嵌套层级<br>
例如输入 `[1, 2, [3, 4, [100, 200], 5], 6]` 返回 `[1, 2, 3, 4, [100, 200], 5, 6]`

### 解答

- 遍历数组
- 如果 item 是数字，则累加
- 如果 item 是数组，则 forEach 累加其元素

代码参考 array-flatten.ts

```typescript
/**
 * 数组扁平化，使用 push
 * @param arr arr
 */
export function flatten1(arr: any[]): any[] {
  const res: any[] = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((n) => res.push(n))
    } else {
      res.push(item)
    }
  })

  return res
}

/**
 * 数组扁平化，使用 concat
 * @param arr arr
 */
export function flatten2(arr: any[]): any[] {
  let res: any[] = []

  arr.forEach((item) => {
    res = res.concat(item)
  })

  return res
}

// // 功能测试
// const arr = [1, [2, [3], 4], 5]
// console.info( flatten2(arr) )
```

## 04: 连环问：如果想要彻底扁平，忽略所有嵌套层级？

像 lodash [flattenDepth](https://www.lodashjs.com/docs/lodash.flattenDepth) ，例如输入 `[1, 2, [3, 4, [100, 200], 5], 6]` 返回 `[1, 2, 3, 4, 100, 200, 5, 6]`

最容易想到的解决方案就是**递归**，代码参考 array-flatten-deep.ts （注意单元测试，有全面的数据类型）

```typescript
/**
 * 数组深度扁平化，使用 push
 * @param arr arr
 */
export function flattenDeep1(arr: any[]): any[] {
  const res: any[] = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep1(item) // 递归
      flatItem.forEach((n) => res.push(n))
    } else {
      res.push(item)
    }
  })

  return res
}

/**
 * 数组深度扁平化，使用 concat
 * @param arr arr
 */
export function flattenDeep2(arr: any[]): any[] {
  let res: any[] = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep2(item) // 递归
      res = res.concat(flatItem)
    } else {
      res = res.concat(item)
    }
  })

  return res
}

// // 功能测试
// const arr = [1, [2, [3, ['a', [true], 'b'], 4], 5], 6]
// console.info( flattenDeep2(arr) )
```

还有一种 hack 的方式 `toString` —— 但遇到引用类型的 item 就不行了。

```js
const nums = [1, 2, [3, 4, [100, 200], 5], 6]
nums.toString() // '1,2,3,4,100,200,5,6'

// 但万一数组元素是 {x: 100} 等引用类型，就不可以了
```

### 划重点

- 高质量代码的特点：规范性、完整性、鲁棒性
- 题目示例是 number 类型，但是你需要考虑其他类型
- 慎用那些看似巧妙的类型，可能会有坑

## 05: 手写一个 getType 函数，获取详细的数据类型

### 题目

实现一个 `getType` 函数，传入一个变量，能准确的获取它的类型。
如 `number` `string` `function` `object` `array` `map` `regexp` 等。

### 类型判断

常规的类型判断一般用 `typeof` 和 `instanceof` ，但这俩也有一些缺点

- `typeof`只能判断值类型， 无法继续区分 `object` 类型
- `instanceof` 需要知道构造函数，即需要两个输入,而不是获取类型

### 枚举不是好方法

你可能觉得 `typeof` 和 `instanceof` 结合起来可以判断，枚举所有的类型。<br>
这并不是一个好方法，因为**手动枚举是不靠谱的**，不具备完整性。<br>

- 第一，你有可能忽略某些类型，如；
- 第二，ES 如果有会继续增加新的类型，需要修改代码，如 `Symbol` `BigInt`

```ts
function getType(x: any): string {
  if (typeof x === 'object') {
    if (Array.isArray(x)) return 'array'
    if (x instance of Map) return 'map'
    // 继续枚举...
  }
  return typeof x
}
```

### 使用 `Object.prototype.toString`

注意，必须用 `Object.prototype.toString` ，不可以直接用 `toString`。后者可能是子类重写的。

```js
;[1, 2].toString() // '1,2' （ 这样使用的其实是 Array.prototype.toString ）
Object.prototype.toString.call([1, 2]) // '[object Array]'
```

代码参考 get-type.ts

```typescript
/**
 * 获取详细的数据类型
 * @param x x
 */
export function getType(x: any): string {
  const originType = Object.prototype.toString.call(x) // '[object String]'
  const spaceIndex = originType.indexOf(' ')
  const type = originType.slice(spaceIndex + 1, -1) // 'String'
  return type.toLowerCase() // 'string'
}

// // 功能测试
console.info(getType(null)) // 'null'
console.info(getType(undefined)) // 'undefined'
console.info(getType(100)) // 'number'
console.info(getType('abc')) // 'string'
console.info(getType(true)) // 'boolean'
console.info(getType(Symbol())) // 'symbol'
console.info(getType({})) // 'object'
console.info(getType([])) // 'array'
console.info(getType(() => {})) // 'function'
console.info(getType(new Set())) // set
console.info(getType(new WeakSet())) // weakset
console.info(getType(new Date())) // date
console.info(getType(new RegExp(''))) // regexp
console.info(getType(new Error())) // error
console.info(getType(Promise.resolve())) // promise
```

## 06: new 一个对象的过程是什么，手写代码表示

```javascript
function myNew(Fn) {
  if (typeof Fn !== 'function') {
    throw new TypeError('This is not a constructor') // Fn校验
  }
  var args = Array.from(arguments).slice(1) // 取入参
  // 1.创建一个空的简单JavaScript对象（即`  {}  `）
  var obj = {}
  // 2.  为步骤1新创建的对象添加属性`  __proto__  `，将该属性链接至构造函数的原型对象
  obj.__proto__ = Fn.prototype
  // 3.  将步骤1新创建的对象作为this的上下文并传入参数；
  var res = Fn.call(obj, ...args)
  // 4.  如果该函数没有返回对象，则返回this。
  return Object(res) === res ? res : obj
}
```

### 题目

new 一个对象内部发生了什么，手写代码表示

### class 是语法糖

ES6 使用 class 代替了 ES6 的构造函数

```js
class Foo {
  constructor(name) {
    this.name = name
    this.city = '北京'
  }
  getName() {
    return this.name
  }
}
const f = new Foo('双越')
```

其实 class 就是一个语法糖，它本质上和构造函数是一样的

```js
function Foo(name) {
  this.name = name
  this.city = '北京'
}
Foo.prototype.getName = function () {
  // 注意，这里不可以用箭头函数
  return this.name
}
const f = new Foo('双越')
```

### new 一个对象的过程

- 创建一个空对象 obj，继承构造函数的原型
- 执行构造函数（将 obj 作为 this）
- 返回 obj

### 实现 new

代码参考 new.ts

```typescript
export function customNew<T>(constructor: Function, ...args: any[]): T {
  // 1. 创建一个空对象，继承 constructor 的原型
  const obj = Object.create(constructor.prototype)
  // 2. 将 obj 作为 this ，执行 constructor ，传入参数
  constructor.apply(obj, args)
  // 3. 返回 obj
  return obj
}
```

## 07: 面试连环问：Object.create 和 {} 的区别

- `Object.create` 可以指定原型，创建一个空对象。<br>
- `{}` 就相当于 `Object.create(Object.prototype)` ，即根据 `Object` 原型的空对象。

PS：对 JS 原型和原型链还不了解的需要抓紧恶补。

## 08: 遍历一个 DOM 树(深度有优先和广度优先)

### 题目

写一个函数遍历 DOM 树，分别用深度优先和广度优先

PS：注意回顾 “Node 和 Element 和区别”

### 深度优先 vs 广度优先

![](./img/08/dom-tree.png)

深度优先的结果 `<div> <p> "hello" <b> "world" <img> 注释 <ul> <li> "a" <li> "b"`

广度优先的结果 `<div> <p> <img> 注释 <ul> "hello" <b> <li> <li> "world" "a" "b"`

访问节点

```typescript
/**
 * 访问节点
 * @param n node
 */
function visitNode(n: Node) {
  if (n instanceof Comment) {
    // 注释
    console.info('Comment node ---', n.textContent)
  }
  if (n instanceof Text) {
    // 文本
    const t = n.textContent?.trim()
    if (t) {
      console.info('Text node ---', t)
    }
  }
  if (n instanceof HTMLElement) {
    // element
    console.info('Element node ---', `<${n.tagName.toLowerCase()}>`)
  }
}
```

### 深度优先

一般通过**递归**实现，代码参考 dom-traverse.ts

```typescript
/**
 * 深度优先遍历
 * @param root dom node
 */
function depthFirstTraverse1(root: Node) {
  visitNode(root)

  const childNodes = root.childNodes // .childNodes 和 .children 不一样
  if (childNodes.length) {
    childNodes.forEach((child) => {
      depthFirstTraverse1(child) // 递归
    })
  }
}
```

不用递归的情况下

```typescript
function depthFirstTraverse2(root: Node) {
  const stack: Node[] = []
  // 根节点压栈
  stack.push(root)
  while (stack.length > 0) {
    const curNode = stack.pop() // 出栈
    if (curNode == null) break
    visitNode(curNode)
    // 子节点压栈
    const childNodes = curNode.childNodes
    if (childNodes.length > 0) {
      // reverse 反顺序压栈
      Array.from(childNodes)
        .reverse()
        .forEach((child) => stack.push(child))
    }
  }
}
```

### 广度优先

一般通过**队列**实现，代码参考 dom-traverse.ts

```typescript
/**
 * 广度优先遍历
 * @param root dom node
 */
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = [] // 数组 vs 链表
  // 根节点入队列
  queue.unshift(root)
  while (queue.length > 0) {
    const curNode = queue.pop()
    if (curNode == null) break
    visitNode(curNode)
    // 子节点入队
    const childNodes = curNode.childNodes
    if (childNodes.length) {
      childNodes.forEach((child) => queue.unshift(child))
    }
  }
}
```

### 解答

- 深度优先，递归, 贪心
- 广度优先，队列（数组 VS 链表）
- 注意：children 和 childNodes 不同

## 09: 连环问：深度优先可以不用递归吗？

深度优先遍历，可以使用**栈**代替递归，递归本质上就是栈。代码参考如上

递归和非递归哪个更好？

- 递归逻辑更加清晰，但容易出现 `stack overflow` 错误（可使用`尾递归`，编译器有优化）
- 非递归效率更高，但使用栈，逻辑稍微复杂一些

## 10: 手写一个 LazyMan，实现 sleep 机制

### 题目

手写 LazyMan ，实现 `sleep` 和 `eat` 两个方法，支持链式调用。
代码示例：

```js
const me = new LazyMan('双越')
me.eat('苹果').eat('香蕉').sleep(5).eat('葡萄') // 打印结果如下：

// '双越 eat 苹果'
// '双越 eat 香蕉'
// （等待 5s）
// '双越 eat 葡萄'
```

### 设计 class 框架

```js
class LazyMan {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  eat(x: string) {
    // 打印 eat 行为
    // 支持链式调用
    return this
  }
  sleep(seconds: number) {
    // 等待 10s 的处理逻辑
    // 支持链式调用
    return this
  }
}
```

### 处理 sleep 逻辑

初始化一个任务队列，执行 `eat` 和 `sleep` 是都往队列插入一个函数。依次执行队列的任务，遇到 `sleep` 就延迟触发 `next` 。

![](./img/08/sleep.png)

代码参考 lazy-man.ts

```typescript
class LazyMan {
  private name: string
  private tasks: Function[] = [] // 任务列表

  constructor(name: string) {
    this.name = name
    // 等待队列中投入任务完毕，在进行执行
    setTimeout(() => {
      this.next()
    })
  }

  private next() {
    const task = this.tasks.shift() // 取出当前 tasks 的第一个任务
    if (task) {
      task()
    }
  }

  eat(food: string) {
    const task = () => {
      console.info(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this // 链式调用
  }

  sleep(seconds: number) {
    const task = () => {
      console.info(`${this.name} 开始睡觉`)
      setTimeout(() => {
        console.info(`${this.name} 已经睡完了 ${seconds}s，开始执行下一个任务`)
        this.next() // xx 秒之后再执行下一个任务
      }, seconds * 1000)
    }
    this.tasks.push(task)
    return this // 链式调用
  }
}

const me = new LazyMan('双越')
me.eat('苹果').eat('香蕉').sleep(5).eat('葡萄').eat('西瓜').sleep(2).eat('橘子')
```

### 总结

- 任务队列
- 链式调用
- 延迟触发

## 11: 手写 curry 函数，实现函数柯里化

### 题目

写一个 `curry` 函数，可以把其他函数转为 curry 函数

```js
function add(a, b, c) {
  return a + b + c
}
add(1, 2, 3) // 6

const curryAdd = curry(add)
curryAdd(1)(2)(3) // 6
```

### 分析

- curry 返回的是一个函数 fn
- 执行 fn, 中间状态返回函数，如 add(1) 或者 add(1)(2)
- 最后返回执行结果，如 add(1)(2)(3)

### 解答

代码参考 curry.ts

```typescript
export function curry(fn: Function) {
  const fnArgsLength = fn.length // 传入函数的参数长度
  let args: any[] = []

  // ts 中，独立的函数，this 需要声明类型
  function calc(this: any, ...newArgs: any[]) {
    // 积累参数
    args = [...args, ...newArgs]
    if (args.length < fnArgsLength) {
      // 参数不够，返回函数
      return calc
    } else {
      // 参数够了，返回执行结果
      return fn.apply(this, args.slice(0, fnArgsLength))
    }
  }

  return calc
}

function add(a: number, b: number, c: number): number {
  return a + b + c
}
add(10, 20, 30) // 60

const curryAdd = curry(add)
const res = curryAdd(10)(20)(30)
console.info(res) // 60
```

### 划重点

- 工作不常用，面试很爱考（工作和面试不完全一样）
- 如果有 this, 慎用 箭头函数

### 总结

- 判断参数长度
- 中间态返回函数，最后返回执行结果
- 如用 this 慎用箭头函数

## 12: instanceof 原理是什么，请写代码表示

### 题目

instanceof 的原理是什么，请用代码来表示

### 原型链

![](./img/08/原型链.png)

### instanceof 原理

例如 `a instanceof b` 就是：顺着 `a` 的 `__proto__` 链向上找，能否找到 `b.prototype`

代码参考 instanceof.ts

```typescript
export function myInstanceof(instance: any, origin: any): boolean {
  if (instance == null) return false // null undefined

  const type = typeof instance
  if (type !== 'object' && type !== 'function') {
    // 值类型
    return false
  }

  let tempInstance = instance // 为了防止修改 instance
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true // 配上了
    }
    // 未匹配
    tempInstance = tempInstance.__proto__ // 顺着原型链，往上找
  }

  return false
}

// 功能测试
console.info(myInstanceof({}, Object))
console.info(myInstanceof([], Object))
console.info(myInstanceof([], Array))
console.info(myInstanceof({}, Array))
console.info(myInstanceof('abc', String)) // false
```

### 总结

- JS 原型和原型链
- 通过 while 循环一致向上查找原型链判断

## 13: 手写函数 bind 功能

## 题目

请手写实现函数 bind

### bind 应用

- 返回一个新的函数（旧函数不会更改）
- 绑定 `this` 和部分参数
- 箭头函数，无法改变 `this` ，只能改变参数

```js
function fn(a, b, c) {
  console.log(this, a, b, c)
}
const fn1 = fn.bind({ x: 100 })
fn1(10, 20, 30) // {x: 100} 10 20 30
const fn2 = fn.bind({ x: 100 }, 1, 2)
fn2(10, 20, 30) // {x: 100} 1 2 10 （注意第三个参数变成了 10）

fn(10, 20, 30) // window 10 20 30 （旧函数不变）
```

### 解答

代码参考 bind.ts

```typescript
// @ts-ignore
Function.prototype.customBind = function (context: any, ...bindArgs: any[]) {
  // context 是 bind 传入的 this
  // bindArgs 是 bind 传入的各个参数
  const self = this // 当前的函数本身
  return function (...args: any[]) {
    // 拼接参数
    const newArgs = bindArgs.concat(args)
    return self.apply(context, newArgs)
  }
}

// 功能测试
function fn(this: any, a: any, b: any, c: any) {
  console.info(this, a, b, c)
}
// @ts-ignore
const fn1 = fn.customBind({ x: 100 }, 10)
fn1(20, 30)
```

要点

- 返回新函数
- 拼接参数（bind 参数 + 执行参数）
- 重新绑定 `this`

## 14: 连环问：手写函数 call 和 apply

`bind` 生成新函数，暂不执行。而 `call` `apply` 会直接立即执行函数

- 重新绑定 `this` （箭头函数不支持）
- 传入执行参数

### 分析：如何在函数执行时绑定 this

- 如 `const obj = { x: 100, fn() { return  this.x}}`
- 执行 obj.fn() 此时内部的 this 就指向 obj
- 可以借此来实现 this

```js
function fn(a, b, c) {
  console.log(this, a, b, c)
}
fn.call({ x: 100 }, 10, 20, 30)
fn.apply({ x: 100 }, [10, 20, 30])
```

代码参考 `call-apply.ts`

```typescript
// @ts-ignore
Function.prototype.customCall = function (context: any, ...args: any[]) {
  if (context == null) context = globalThis
  if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

  const fnKey = Symbol() // 不会出现属性名称的覆盖
  context[fnKey] = this // this 就是当前的函数

  const res = context[fnKey](...args) // 绑定了 this

  delete context[fnKey] // 清理掉 fn ，防止污染

  return res
}
```

```typescript
// @ts-ignore
Function.prototype.customApply = function (context: any, args: any[] = []) {
  if (context == null) context = globalThis
  if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

  const fnKey = Symbol() // 不会出现属性名称的覆盖
  context[fnKey] = this // this 就是当前的函数

  const res = context[fnKey](...args) // 绑定了 this

  delete context[fnKey] // 清理掉 fn ，防止污染

  return res
}
```

```typescript
function fn(this: any, a: any, b: any, c: any) {
  console.info(this, a, b, c)
}
// @ts-ignore
fn.customCall({ x: 100 }, 10, 20, 30)
// @ts-ignore
fn.customApply({ x: 200 }, [100, 200, 300])
```

- 使用 `obj.fn` 执行，即可设置 `fn` 执行时的 `this`
- 考虑 `context` 各种情况
- 使用 `symbol` 类型扩展属性

注意：有些同学用 `call` 来实现 `apply` （反之亦然），这样是不符合面试官期待的。

### 划重点

- 想用 call 实现 apply, 用 apply 实现 call 这不可取
- 原生 call apply 的 this 如果是值类型，也会被 new Object(...)
- Symbol 的作用

## 15：手写 EventBus 自定义事件

Bus 不是“车”，而是“总线”

### 题目

请手写 EventBus 自定义事件，实现 `no` `once` `emit` 和 `off`

### EventBus 功能

```js
const event = new EventBus()

function fn1(a, b) {
  console.log('fn1', a, b)
}
function fn2(a, b) {
  console.log('fn2', a, b)
}
function fn3(a, b) {
  console.log('fn3', a, b)
}

event.on('key1', fn1)
event.on('key1', fn2)
event.once('key1', fn3)
event.on('xxxxxx', fn3)

event.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

event.off('key1', fn1)

event.emit('key1', 100, 200) // 触发 fn2
```

### 分析

- on 和 once 注册函数，存储起来
- emit 时找到对应的函数，执行
- off 找到对应的函数，从对象中删除

### 注意区分 on 和 once

- on 绑定的事件可以连续执行，除非 off
- once 绑定的函数 emit 一次即可删除，也可以未执行而被 off
- 数据结构上要标识出 on 和 once

### 实现

- `class` 结构
- 注意区分 `on` 和 `off`

代码参考 event-bus.ts

```typescript
export default class EventBus {
  /**
   * {
   *    'key1': [
   *        { fn: fn1, isOnce: false },
   *        { fn: fn2, isOnce: false },
   *        { fn: fn3, isOnce: true },
   *    ]
   *    'key2': [] // 有序
   *    'key3': []
   * }
   */
  private events: {
    [key: string]: Array<{ fn: Function; isOnce: boolean }>
  }

  constructor() {
    this.events = {}
  }

  on(type: string, fn: Function, isOnce: boolean = false) {
    const events = this.events
    if (events[type] == null) {
      events[type] = [] // 初始化 key 的 fn 数组
    }
    events[type].push({ fn, isOnce })
  }

  once(type: string, fn: Function) {
    this.on(type, fn, true)
  }

  off(type: string, fn?: Function) {
    if (!fn) {
      // 解绑所有 type 的函数
      this.events[type] = []
    } else {
      // 解绑单个 fn
      const fnList = this.events[type]
      if (fnList) {
        this.events[type] = fnList.filter((item) => item.fn !== fn)
      }
    }
  }

  emit(type: string, ...args: any[]) {
    const fnList = this.events[type]
    if (fnList == null) return

    // 注意
    this.events[type] = fnList.filter((item) => {
      const { fn, isOnce } = item
      fn(...args)

      // once 执行一次就要被过滤掉
      if (!isOnce) return true
      return false
    })
  }
}
```

## 16: 手写 EventBus 自定义事件-on 和 once 分开存储

```typescript
/**
 * @description Event Bus - 拆分保存 on 和 once 事件
 * @author 双越老师
 */

export default class EventBus2 {
  private events: { [key: string]: Array<Function> } // { key1: [fn1, fn2], key2: [fn1, fn2] }
  private onceEvents: { [key: string]: Array<Function> }

  constructor() {
    this.events = {}
    this.onceEvents = {}
  }

  on(type: string, fn: Function) {
    const events = this.events
    if (events[type] == null) events[type] = []
    events[type].push(fn)
  }

  once(type: string, fn: Function) {
    const onceEvents = this.onceEvents
    if (onceEvents[type] == null) onceEvents[type] = []
    onceEvents[type].push(fn)
  }

  off(type: string, fn?: Function) {
    if (!fn) {
      // 解绑所有事件
      this.events[type] = []
      this.onceEvents[type] = []
    } else {
      // 解绑单个事件
      const fnList = this.events[type]
      const onceFnList = this.onceEvents[type]
      if (fnList) {
        this.events[type] = fnList.filter((curFn) => curFn !== fn)
      }
      if (onceFnList) {
        this.onceEvents[type] = onceFnList.filter((curFn) => curFn !== fn)
      }
    }
  }

  emit(type: string, ...args: any[]) {
    const fnList = this.events[type]
    const onceFnList = this.onceEvents[type]

    if (fnList) {
      fnList.forEach((f) => f(...args))
    }
    if (onceFnList) {
      onceFnList.forEach((f) => f(...args))

      // once 执行一次就删除
      this.onceEvents[type] = []
    }
  }
}

// const e = new EventBus2()

// function fn1(a: any, b: any) { console.log('fn1', a, b) }
// function fn2(a: any, b: any) { console.log('fn2', a, b) }
// function fn3(a: any, b: any) { console.log('fn3', a, b) }

// e.on('key1', fn1)
// e.on('key1', fn2)
// e.once('key1', fn3)
// e.on('xxxxxx', fn3)

// e.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

// e.off('key1', fn1)

// e.emit('key1', 100, 200) // 触发 fn2
```

### 划重点

- 区分 on 和 once
- 合理的数据结构，比算法优化更有效

## 17: 连环问：EventBus 里的数组可以换成 Set 吗？

数组和 Set 比较 （除了语法 API）

- 数组，有序结构，查找、中间插入、中间删除比较慢
- Set 不可排序的，插入和删除都很快

Set 初始化或者 `add` 时是一个有序结构，但它无法再次排序，没有 `index` 也没有 `sort` 等 API

验证

- 生成一个大数组，验证 `push` `unshift` `includes` `splice`
- 生成一个大 Set ，验证 `add` `delete` `has`

答案：**不可以，Set 是不可排序的，如再增加一些“权重”之类的需求，将不好实现。**

### Map 和 Object

Object 是无序的

```js
const data1 = { 1: 'aaa', 2: 'bbb', 3: 'ccc', 测试: '000' }
Object.keys(data1) // ["1", "2", "3", "测试"]
const data2 = { 测试: '000', 1: 'aaa', 3: 'ccc', 2: 'bbb' }
Object.keys(data2) // ["1", "2", "3", "测试"]
```

Map 是有序的

```js
const m1 = new Map([
  ['1', 'aaa'],
  ['2', 'bbb'],
  ['3', 'ccc'],
  ['测试', '000'],
])
m1.forEach((val, key) => {
  console.log(key, val)
})
const m2 = new Map([
  ['测试', '000'],
  ['1', 'aaa'],
  ['3', 'ccc'],
  ['2', 'bbb'],
])
m2.forEach((val, key) => {
  console.log(key, val)
})
```

另外，**Map 虽然是有序的，但它的 `get` `set` `delete` 速度非常快**，和 Object 效率一样。它是被优化过的有序结构。

## 18: 用 JS 实现一个 LRU 缓存-分析数据结构特点，使用 Map

### 题目

用 JS 实现一个 LRU 缓存

### 什么是 LRU 缓存

- LRU-Least Recently Used 最近使用
- 如果内存有限，只缓存最近使用的，删除“沉水”数据
- 核心 API 两个：get set

### LRU 使用

Least Recently Used 最近最少使用<br>
即淘汰掉最近最少使用的数据，只保留最近经常使用的资源。它是一个固定容量的缓存容器。

```js
const lruCache = new LRUCache(2) // 最大缓存长度 2
lruCache.set(1, 1) // 缓存是 {1=1}
lruCache.set(2, 2) // 缓存是 {1=1, 2=2}
lruCache.get(1) // 返回 1
lruCache.set(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lruCache.get(2) // 返回 null
lruCache.set(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lruCache.get(1) // 返回 null
lruCache.get(3) // 返回 3 { 4=4, 3=3}
lruCache.get(4) // 返回 4 { 3=3, 4=4}
```

### 分析

- 哈希表，即 `{ k1: v1, k2: v2, ... }` 形式。可以 `O(1)` 事件复杂度存取 `key` `value`
- 必须是**有序的**，常用数据放在前面，“沉水”数据放在后面
- 哈希表 + 有序，就是 MAP ---- 其他都不行

JS 内置的数据结构类型 `Object` `Array` `Set` `Map` ，恰好 `Map` 符合这两条要求

### Map 是有序的

Map 有序，Object 无序

### 实现

代码参考 LRU.ts

注意，`get` `set` 时都要把操作数据移动到 Map 最新的位置。

```typescript
export default class LRUCache {
  private length: number
  private data: Map<any, any> = new Map()

  constructor(length: number) {
    if (length < 1) throw new Error('invalid length')
    this.length = length
  }

  set(key: any, value: any) {
    const data = this.data
    if (data.has(key)) {
      data.delete(key)
    }
    data.set(key, value)
    if (data.size > this.length) {
      // 如果超出了容量，则删除 Map 最老的元素
      // keys() 返回一个引用的迭代器对象。它包含按照顺序插入 Map 对象中每个元素的 key 值。
      const delKey = data.keys().next().value
      data.delete(delKey)
    }
  }

  get(key: any): any {
    const data = this.data
    if (!data.has(key)) return null
    const value = data.get(key)
    data.delete(key)
    data.set(key, value)
    return value
  }
}

const lruCache = new LRUCache(2)
lruCache.set(1, 1) // {1=1}
lruCache.set(2, 2) // {1=1, 2=2}
console.info(lruCache.get(1)) // 1 {2=2, 1=1}
lruCache.set(3, 3) // {1=1, 3=3}
console.info(lruCache.get(2)) // null
lruCache.set(4, 4) // {3=3, 4=4}
console.info(lruCache.get(1)) // null
console.info(lruCache.get(3)) // 3 {4=4, 3=3}
console.info(lruCache.get(4)) // 4 {3=3, 4=4}
```

### 划重点

- 如果面试时你不知道 LRU（或者其他名词），你可以问面试官
- 考虑功能，还有考虑性能
- 选择合理数据结构

### 扩展

实际项目中可以使用第三方 lib

- [https://www.npmjs.com/package/quick-lru](https://www.npmjs.com/package/quick-lru)
- [https://www.npmjs.com/package/lru-cache](https://www.npmjs.com/package/lru-cache)
- [https://www.npmjs.com/package/tiny-lru](https://www.npmjs.com/package/tiny-lru)
- [https://www.npmjs.com/package/mnemonist](https://www.npmjs.com/package/mnemonist)

## 19:【连环问】不用 Map 实现 LRU 缓存-分析问题，使用双向链表

LRU cache 是很早就有的算法，而 Map 仅仅是这几年才加入的 ES 语法。

### LRU 使用 Map 是基于两个特点

- 哈希表（get、set 速度表）
- 有序
- 如果没有 map, 可结合 Object + Array

```javascript
// 执行 lru.set('a', 1) lru.set('b', 2) lru.set('c', 3) 后的数据

const obj1 = { value: 1, key: 'a' }
const obj2 = { value: 2, key: 'b' }
const obj3 = { value: 3, key: 'c' }

const data = [obj1, obj2, obj3]
const map = { a: obj1, b: obj2, c: obj3 } // 对象，是无序列表
```

### 但是依然存在性能问题：Array 操作慢

- 移出 “沉水” 数据，使用数组 shift 效率太低
- get set 时移动数据，用数组 splice 效率太低

### 改造：Array 改为双向链表

- 可快速增加元素
- 可快速删除元素
- 可快速移动元素

数组有问题，就需要使用新的数据结构 **双向链表**

```ts
Interface INode {
  value: any
  next?: INode
  prev?: INode
}
```

双向链表可以快速移动元素。末尾新增元素 D 很简单，开头删除 A 元素也很简单。

![](./img/08/双向链表-1.png)

要把中间的元素 B 移动到最后（如 LRU `set` `get` 时移动数据位置），只需要修改前后的指针即可，效率很高。

![](./img/08/双向链表-2.png)

### 实现代码

```typescript
interface IListNode {
  value: any
  key: string // 存储 key ，方便删除（否则删除时就需要遍历 this.data )
  prev?: IListNode
  next?: IListNode
}
export default class LRUCache {
  private length: number
  private data: { [key: string]: IListNode } = {}
  private dataLength: number = 0
  private listHead: IListNode | null = null
  private listTail: IListNode | null = null

  constructor(length: number) {
    if (length < 1) throw new Error('invalid length')
    this.length = length
  }

  private moveToTail(curNode: IListNode) {
    const tail = this.listTail
    if (tail === curNode) return

    // -------------- 1. 让 prevNode nextNode 断绝与 curNode 的关系 --------------
    const prevNode = curNode.prev
    const nextNode = curNode.next
    if (prevNode) {
      if (nextNode) {
        prevNode.next = nextNode
      } else {
        delete prevNode.next
      }
    }
    if (nextNode) {
      if (prevNode) {
        nextNode.prev = prevNode
      } else {
        delete nextNode.prev
      }

      if (this.listHead === curNode) this.listHead = nextNode
    }

    // -------------- 2. 让 curNode 断绝与 prevNode nextNode 的关系 --------------
    delete curNode.prev
    delete curNode.next

    // -------------- 3. 在 list 末尾重新建立 curNode 的新关系 --------------
    if (tail) {
      tail.next = curNode
      curNode.prev = tail
    }
    this.listTail = curNode
  }

  private tryClean() {
    while (this.dataLength > this.length) {
      const head = this.listHead
      if (head == null) throw new Error('head is null')
      const headNext = head.next
      if (headNext == null) throw new Error('headNext is null')

      // 1. 断绝 head 和 next 的关系
      delete headNext.prev
      delete head.next

      // 2. 重新赋值 listHead
      this.listHead = headNext

      // 3. 清理 data ，重新计数
      delete this.data[head.key]
      this.dataLength = this.dataLength - 1
    }
  }

  get(key: string): any {
    const data = this.data
    const curNode = data[key]

    if (curNode == null) return null

    if (this.listTail === curNode) {
      // 本身在末尾（最新鲜的位置），直接返回 value
      return curNode.value
    }

    // curNode 移动到末尾
    this.moveToTail(curNode)

    return curNode.value
  }

  set(key: string, value: any) {
    const data = this.data
    const curNode = data[key]

    if (curNode == null) {
      // 新增数据
      const newNode: IListNode = { key, value }
      // 移动到末尾
      this.moveToTail(newNode)

      data[key] = newNode
      this.dataLength++

      if (this.dataLength === 1) this.listHead = newNode
    } else {
      // 修改现有数据
      curNode.value = value
      // 移动到末尾
      this.moveToTail(curNode)
    }

    // 尝试清理长度
    this.tryClean()
  }
}

const lruCache = new LRUCache(2)
lruCache.set('1', 1) // {1=1}
lruCache.set('2', 2) // {1=1, 2=2}
console.info(lruCache.get('1')) // 1 {2=2, 1=1}
lruCache.set('3', 3) // {1=1, 3=3}
console.info(lruCache.get('2')) // null
lruCache.set('4', 4) // {3=3, 4=4}
console.info(lruCache.get('1')) // null
console.info(lruCache.get('3')) // 3 {4=4, 3=3}
console.info(lruCache.get('4')) // 4 {3=3, 4=4}
```

### 划重点

- 数据结果设计： data、list 分别存储什么
- 双向链表的操作非常繁琐，代码很容易写错，不容易调试
- 链表 node 要存储 node.key, 否则需要遍历 data 删除
- 长度也要累加

## 20: 手写 JS 深拷贝-考虑各种数据类型和循环引用

### 题目

手写 JS 深拷贝

### 分析

这是一个很常见的问题，看似也很简单，但是如果考虑到“高质量代码”的要求，写起来还是挺麻烦的。<br>
别说写代码，就本节所有的情况你能否考虑全面，这都不一定。

### 错误答案 1

使用 `JSON.stringify` 和 `JSON.parse`

- 无法转换函数
- 无法转换 `Map` `Set`
- 无法转换循环引用

PS：其实普通对象使用 JSON API 的运算速度很快，但功能不全

### 错误答案 2

使用 `Object.assign` —— 这根本就不是深拷贝，是浅拷贝 ！！！

### 错误答案 3

只考虑了普通的对象和数组

- 无法转换 `Map` `Set`
- 无法转换循环引用

```javascript
function cloneDeep(obj: any) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result: any
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = cloneDeep(obj[key]) // 递归调用
    }
  }
  return result
}

// 功能测试
const a: any = {
  set: new Set([10, 20, 30]),
  map: new Map([
    ['x', 10],
    ['y', 20],
  ]),
}
a.self = a
console.log(cloneDeep(a)) // 无法处理 Map Set 和循环引用
```

### 正确答案

参考代码 `clone-deep.ts`

```typescript
/**
 * 深拷贝
 * @param obj obj
 * @param map weakmap 为了避免循环引用
 */
export function cloneDeep(obj: any, map = new WeakMap()): any {
  if (typeof obj !== 'object' || obj == null) return obj

  // 避免循环引用
  const objFromMap = map.get(obj)
  if (objFromMap) return objFromMap

  let target: any = {}
  map.set(obj, target)

  // Map
  if (obj instanceof Map) {
    target = new Map()
    obj.forEach((v, k) => {
      const v1 = cloneDeep(v, map)
      const k1 = cloneDeep(k, map)
      target.set(k1, v1)
    })
  }

  // Set
  if (obj instanceof Set) {
    target = new Set()
    obj.forEach((v) => {
      const v1 = cloneDeep(v, map)
      target.add(v1)
    })
  }

  // Array
  if (obj instanceof Array) {
    target = obj.map((item) => cloneDeep(item, map))
  }

  // Object
  for (const key in obj) {
    const val = obj[key]
    const val1 = cloneDeep(val, map)
    target[key] = val1
  }

  return target
}

// 功能测试
const a: any = {
  set: new Set([10, 20, 30]),
  map: new Map([
    ['x', 10],
    ['y', 20],
  ]),
  info: {
    city: '北京',
  },
  fn: () => {
    console.info(100)
  },
}
a.self = a
console.log(cloneDeep(a))
```

### 划重点

- 功能完整性：考虑多种数据结构
- 鲁棒性：考虑循环引用
- （有时面试官不给你要求，你能否想到这几点）

## 21: 扩展补充：根据一个 DOM 树，写出一个虚拟 DOM 对象

### 题目

讲以下 DOM 结构转换为 vnode 数据

```html
<div id="div1" style="border: 1px solid #ccc; padding: 10px;">
  <p>一行文字<a href="xxx.html" target="_blank">链接</a></p>
  <img src="xxx.png" alt="图片" class="image" />
  <button click="clickHandler">点击</button>
</div>
```

### 答案

vdom 就是用 JS 对象的形式来表示 DOM 结构。vnode 即对应着 DOM 结构的一个 node 节点。

```js
const vnode = {
  tag: 'div', // <div>
  data: {
    id: 'div1',
    style: {
      'border': '1px solid #ccc',
      'padding': '10px'
    }
  },
  children: [
    {
      tag: 'p', // <p>
      data: {},
      children: [
        '一行文字',
        {
          tag: 'a', // <a>
          data: {
            href: 'xxx.html',
            target: '_blank'
          },
          children: ['链接']
        }
      ]
    },
    {
      tag: 'img', // <img>
      data: {
        className: 'image', // 注意，这里要用 className
        src: 'xxx.png',
        alt: '图片'
      }
    },
    {
      tag: 'button', // <button>
      data: {
        events: {
          click: clickHandler
        }
      }
      children: ['点击']
    }
  ]
}
```

### 注意事项

- vdom 结构没有固定的标准，例如 `tag` 可以改为 `name` ，`data` 可以改为 `props` 。只要能合理使用 JS 数据表达 DOM 即可。
- `style` 和 `events` 要以对象的形式，更易读，更易扩展
- `class` 是 ES 内置关键字，要改为 `className` 。其他的还有如 `for` 改为 `htmlFor`

## 22: 总结

### 内容总结

本章讲解编写高质量代码的面试题，即常见的“手写代码”面试题。有比较基础的类型判断、手写 `new`，也有比较复杂的 LazyMan 和 LRU 缓存。

### 划重点

- 编码规范性
- 功能完整性
- 鲁棒性（健壮性）

### 注意事项

- 能写单元测试的，就直接写出来
