# 02-前端面试技能拼图 1 ：数据结构和算法（上），大厂面试必考

## 01：开始

### 数据结构和算法

数据结构和算法，是大厂前端面试的“拦路虎”，很多同学都望而生畏。其实如果了解常用数据结构，掌握基本的算法思维，就不能应对。本章将通过多个面试题，为你讲解算法面试题的解题思路，同时复习常用数据结构和算法思维。

### 为何要考察

如果在短时间之内快速判断一个工程师是否优秀？考察算法是最合理的方式 —— 这是业界多年的经验积累。

前端面试考算法不是因为内卷。算法一直在后端面试中被考察，现在前端也考查，说明前端能做的工作越来越多了。这是好事。

### 考察的重点

- 算法的时间复杂度和空间复杂度
- 三大算法思维：贪心，二分，动态规划
- 常见数据结构

### 注意事项

- 算法，有难度，请耐心学习
- 一个问题的解决方案有很多种，要找出最优解(重要！！！)
- 不仅关注题目本身，更要关注知识点和解题思路
- 按顺序学习（本章课程按顺序设计的）

### 看几个面试题

列举几个代表性的面试题，具体参考视频。

- 题目 1：定义一个函数，实现数组的旋转。
  > 如输入 `[1, 2, 3, 4, 5, 6, 7]` 和 `key = 3`， 输出 `[5, 6, 7, 1, 2, 3, 4]`<br>
  > 考虑时间复杂度和性能
- 题目 2：快速排序

  > 用 Javascript 实现快速排序，并说明时间复杂度。

- 题目 3：是否匹配指定字符
  > 一个字符串 s 可能包含 {} () [] 三种符号
  >
  > 判断 s 是否是括号匹配的
  >
  > 如 `(a{b}c)` 匹配，而 `{a(b}c)` 就不匹配
- 题目 4：反转单向链表
  > 输入一个单向链表，输出它的反转（头变尾，尾变头）

## 02: 科普-算法复杂度

- 什么是复杂度
- 时间复杂度
- 空间复杂度

### 什么是复杂度

- 程序执行时需要的计算量和内存空间（和代码是否简洁无关）
- 复杂度是**数量级**（方便记忆、推广），不是具体的数字
- 一般针对一个具体的算法，而非一个完整的系统

![image](./img/02/时间复杂度.png)

### 时间复杂度

> 程序执行时需要的计算量(CPU)

- O(1) 一次就够（数量级）,无循环
- O(n) 和传输的数据量一样（数量级）,单次循环
- O(n^2) 数据量的平方 (数量级), 嵌套循环
- O(logn) 数据量的对数 (数量级), 二分法
- O(nlogn) 数据量 \* 数据量的对数 (数量级): 单次循环 & 二分法

【注意】如果你用到了 API （如数组 `unshift`）要结合数据结构去分析复杂度。**要看到代码的本质**。

### 空间复杂度

> 程序执行时需要的内存空间(CPU)

- O(1) 有限的、可数的空间（数量级）
- O(n) 和 输入的数据量相同的空间（数量级）

前端算法通常不太考虑空间复杂度，或者它比时间复杂度要次要的多。

因为前端环境，通常内存都是足够的，或者内存不够通常也是其他因素（如媒体文件）。

### 程序员必须掌握算法复杂度

- 如果你没有复杂度的概念和敏感度，写程序是非常危险的
- 例如，代码功能测试正常，但是数据量大了，程序就会崩溃
- 对于前端开发，尤其是时间复杂度(重时间，轻空间)

PS: 算法达到 O(n^2), 算法基本是不可用的

## 03: 旋转数组

> 把一个数组旋转 k 步-代码演示和单元测试

### 题目

- 定义一个函数，实现数组的旋转。
- 如输入 `[1, 2, 3, 4, 5, 6, 7]` 和 `key = 3`， 输出 `[5, 6, 7, 1, 2, 3, 4]`
- 考虑时间复杂度和性能

### 实现思路

1. 思路 1

- 将 `k` 后面的元素，挨个 `pop` 然后 `unshift` 到数组前面

2. 思路 2

- 将 `k` 后面的所有元素拿出来作为 `part1`
- 将 `k` 前面的所有元素拿出来作为 `part2`
- 返回 `part1.concat(part2)`

### 代码演示

- 思路 1

  ```typescript
  /**
   * 旋转数组 k 步 - 使用 pop 和 unshift
   * @param arr arr
   * @param k k
   * @returns arr
   */
  export function rotate1(arr: number[], k: number): number[] {
    const length = arr.length
    if (!k || length === 0) return arr
    const step = Math.abs(k % length) // abs 取绝对值
  
    // O(n^2)
    for (let i = 0; i < step; i++) {
      const n = arr.pop()
      if (n != null) {
        arr.unshift(n) // 数组是一个有序结构，unshift 操作非常慢！！！ O(n)
      }
    }
    return arr
  }
  ```

  测试代码如下

  ```typescript
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const k = 3
  
  const res = rotate1(arr, k)
  ```

* 思路 2

  ```typescript
  /**
   * 旋转数组 k 步 - 使用 concat
   * @param arr arr
   * @param k k
   */
  export function rotate2(arr: number[], k: number): number[] {
    const length = arr.length
    if (!k || length === 0) return arr
    const step = Math.abs(k % length) // abs 取绝对值
  
    // O(1)
    const part1 = arr.slice(-step) // O(1)
    const part2 = arr.slice(0, length - step)
    const part3 = part1.concat(part2)
    return part3
  }
  ```

  测试代码如下

  ```typescript
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const k = 3
  
  const res = rotate2(arr, k)
  ```

### 复杂度分析

时间复杂度

- 思路 1 - 看代码时间复杂度是 `O(n)`，**但数组是有序结构 `unshift` 本身就是 `O(n)` 复杂度**，所以实际复杂度是 `O(n^2)`

  - 使用`unshift`这样的方法会导致延迟，因为我们必须移动数组中每个元素的索引。因此，`unshift`操作的复杂度为**O(n)**
  - 同样复杂度操作的 API 还有 `splice`、`shift`

- 思路 2 - `O(1)`。`slice` 和 `concat` 不会修改原数组，而数组是有序结构，复杂度是 `O(1)` 。

空间复杂度

- 思路 1 - `O(1)`
- 思路 2 - `O(n)`

经过性能测试，知道“思路 2”性能更优。看来，思路简单并不一定性能最优。

【注意】我看到网上有很多人为“思路 1”的写法点赞，要保持独立思考，不要从众！

### 答案

整体分析，选择“思路 2”

### 划重点

- 考虑参数非法情况，代码鲁棒性
- 算法复杂度
  - 要看到全部的时间复杂度（包括 API）
  - 重时间，轻空间
- 识破内置 API 的时间复杂度
  - 数组是有序结构，`shift` `unshift` 等要慎用
- 单元测试，考虑参数非法情况，提升代码健壮性

### 扩展 - 不要过度优化

其实还有一种思路，时间复杂度 `O(n)` ，空间复杂度 `O(1)` ，思路：

- k 前面的元素移动到 `i + (length - k)` 的位置
- k 后面的元素移动到 `i - k` 的位置

但不推荐这样的做法

- 前端重时间、轻空间，优先考虑时间复杂度，而非空间复杂度
- 代码是否易读，是否易沟通 —— 这个比性能更重要！人力成本永远是最贵的！！

## 04: 括号匹配

### 题目

一个字符串内部可能包含 `{ }` `( )` `[ ]` 三种括号，判断该字符串是否是括号匹配的。<br>
如 `(a{b}c)` 就是匹配的， `{a(b` 和 `{a(b}c)` 就是不匹配的。

### 栈 Stack

该题目的考察目的很明确 —— **栈**

栈，先进后出，基本的 API

- push
- pop
- length

和栈相关的数据结构（后面讲）

- 队列，先进先出
- 堆，如常说的“堆栈模型”

![image](./img/02/%E6%A0%88.png)

### 逻辑结构和物理结构

- 栈和数组有什么区别？—— **没有可比性，两者不一个级别**。就像：房子和石头有什么区别？

- 栈是一种逻辑结构，一种理论模型，它可以脱离编程语言单独讲。

- 数组是一种物理结构，代码的实现，不同的语言，数组语法是不一样的。

- 栈可以用数组来表达，也可以用链表来表达，也可以自定义 `class MyStack {...}` 自己实现…

* 在 JS 中，栈一般情况下用数组实现。

### 思路

- 遇到左括号 `{ ( [` 则压栈
- 遇到右括号 `} ) ]` 则判断栈顶，相同的则出栈
- 最后判断栈 length 是否为 0

### 划重点

- 栈
- 逻辑结构和物理结构

### 代码实现

```typescript
/**
 * 判断左右括号是否匹配
 * @param left 左括号
 * @param right 右括号
 */
function isMatch(left: string, right: string): boolean {
  if (left === '{' && right === '}') return true
  if (left === '[' && right === ']') return true
  if (left === '(' && right === ')') return true
  return false
}

/**
 * 判断是否括号匹配
 * @param str str
 */
export function matchBracket(str: string): boolean {
  const length = str.length
  if (length === 0) return true

  const stack = []

  const leftSymbols = '{[('
  const rightSymbols = '}])'

  for (let i = 0; i < length; i++) {
    const s = str[i]

    if (leftSymbols.includes(s)) {
      // 左括号，压栈
      stack.push(s)
    } else if (rightSymbols.includes(s)) {
      // 右括号，判断栈顶（是否出栈）
      const top = stack[stack.length - 1]
      if (isMatch(top, s)) {
        stack.pop()
      } else {
        // 如果一个不匹配，就直接返回 false
        return false
      }
    }
  }

  return stack.length === 0
}
```

测试代码

```javascript
const str = '{a(b[c]d)e}f'
// const str = '{a(b[(c]d)e}f'
// const str = '{a(b[c]d}e)f'
const res = matchBracket(str)
```

### 性能分析

- 时间复杂度 O(n)
- 空间复杂度 O(n)

> 注意：这里的 inlcudes 与字符串长度是有关系的，因为此处字符串 leftSymbols 的长度是固定的，所以我们认为时间复杂度 是 O(n)

### 划重点

- 栈
- 逻辑结构 VS 物理结构

## 05：用两个栈实现一个队列

### 题目

- 请用两个栈，实现一个队列
- 实现功能 `add` `delete` `length` 。

### 队列 Queue

- 栈，先进后出

- 队列，先进先出，API 包括

  - `add`

  - `delete`

  - `length`

常见的“消息队列”就是队列的一种应用场景

- A 系统向 B 系统持续发送海量的消息
- A 系统先把一条一条消息放在一个 queue
- B 系统再从 queue 中逐条消费（按顺序，先进先出）

![image](./img/02/队列.png)

### 逻辑结构 VS 物理结构

- 队列和栈一样，是一种逻辑结构。它可以用数组、链表等实现。
- 简单的，可以用数组、链表实现
- 复杂的队列服务（如海量数据，内存不够用），需要单独设计

思考：用数组实现队列，性能会怎样 —— add 怎样？delete 怎样？

### 题目分析

- 队列 add 方法
  - 往 stack1 push 元素
- 队列 delete 方法
  - 将 stack1 所有元素 pop 出来，push 到 stack2
  - 将 stack2 执行一次 pop，取出栈顶
  - 再将 stack2 所有元素 pop 出来，push 进 stack1

### 代码示例

```typescript
export class MyQueue {
  private stack1: number[] = []
  private stack2: number[] = []

  /**
   * 入队
   * @param n n
   */
  add(n: number) {
    this.stack1.push(n)
  }

  /**
   * 出队
   */
  delete(): number | null {
    let res

    const stack1 = this.stack1
    const stack2 = this.stack2

    // 将 stack1 所有元素移动到 stack2 中
    while (stack1.length) {
      const n = stack1.pop()
      if (n != null) {
        stack2.push(n)
      }
    }

    // stack2 pop
    res = stack2.pop()

    // 将 stack2 所有元素“还给”stack1
    while (stack2.length) {
      const n = stack2.pop()
      if (n != null) {
        stack1.push(n)
      }
    }

    return res || null
  }

  get length(): number {
    return this.stack1.length
  }
}

// // 功能测试
// const q = new MyQueue()
// q.add(100)
// q.add(200)
// q.add(300)
// console.info(q.length)
// console.info(q.delete())
// console.info(q.length)
// console.info(q.delete())
// console.info(q.length)
```

### 划重点

- 队列
- 逻辑结构 VS 物理结构

- 画图，帮助梳理解题思路

## 06: 反转链表

### 题目

定义一个函数，输入一个单向链表的头节点，反转该链表，并输出反转之后的头节点

### 链表

- 链表是一种物理结构（非逻辑结构），是数组的补充。
- 数组需要一段连续的内存空间，而链表不需要。

数据结构

- 单向链表 `{ value, next }`
- 双向链表 `{ value, prev, next }`

![](./img/02/链表.png)

### 链表 VS 数组

- 都是有序结构， 而对象、Set 是无序结构
- 链表：查询慢 `O(n)`, 新增和删除快 `O(1)`
- 数组：查询快 `O(1)`, 新增和删除慢 `O(n)`

### 应用场景

`React Fiber` 就把 `vdom` 树转换为一个链表，这样才有可能随时中断、再继续进行。

如果 vdom 是树，那只能递归一次性执行完成，中间无法断开。

![](./img/02/react-fiber-链表.png)

### 分析

反转链表，画图很好理解。没有捷径，遍历一边，重新设置 next 指向即可。

但实际写代码，却并不简单，很容易造成 nextNode 丢失。

因此，遍历过程中，至少要存储 3 个指针 `prevNode` `curNode` `nextNode`

时间复杂度 `O(n)`

### 代码展示

- 根据数组创建单向链表

  ```typescript
  export interface ILinkListNode {
    value: number
    next?: ILinkListNode
  }

  /**
   * 根据数组创建单向链表
   * @param arr number arr
   */
  export function createLinkList(arr: number[]): ILinkListNode {
    const length = arr.length
    if (length === 0) throw new Error('arr is empty')

    let curNode: ILinkListNode = {
      value: arr[length - 1],
    }
    if (length === 1) return curNode

    for (let i = length - 2; i >= 0; i--) {
      curNode = {
        value: arr[i],
        next: curNode,
      }
    }

    return curNode
  }
  ```

- 反转单向链表

  ```typescript
  /**
   * 反转单向链表，并返回反转之后的 head node
   * @param listNode list head node
   */
  export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
    // 定义三个指针
    let prevNode: ILinkListNode | undefined = undefined
    let curNode: ILinkListNode | undefined = undefined
    let nextNode: ILinkListNode | undefined = listNode

    // 以 nextNode 为主，遍历链表
    while (nextNode) {
      // 第一个元素，删掉 next ，防止循环引用
      if (curNode && !prevNode) {
        delete curNode.next
      }

      // 反转指针
      if (curNode && prevNode) {
        curNode.next = prevNode
      }

      // 整体向后移动指针
      prevNode = curNode
      curNode = nextNode
      nextNode = nextNode?.next
    }

    // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next
    curNode!.next = prevNode

    return curNode!
  }
  ```

- 测试代码

  ```typescript
  const arr = [100, 200, 300, 400, 500]
  const list = createLinkList(arr)
  console.info('list:', list)
  
  const list1 = reverseLinkList(list)
  console.info('list1:', list1)
  ```

### 划重点

- 链表
- 链表和数组的不同
  - 内存占用
  - 查询、新增、删除的效率
- 如何保证 `nextNode` 不丢失
- 链表的代码逻辑比较繁琐，调试成本高

### 扩展

思考：用数组和链表实现队列，哪个性能更好？

## 07：连环问：链表和数组，哪个实现队列更快

### 分析

- 数组是连续存储，`push` 很块，`shift` 很慢
- 链表是非连续存储，`add` 和 `delete`都很快，但是**查找很慢**

- 结论：链表实现队列更快

### 链表实现队列

- 单向链表，但要同时记录 `head` 和 `tail`
- 要从尾部 `tail` 入队，从 `head` 出队，否则出队时 `tail` 不好定位
- `length` 要实时记录，不可遍历链表获取

### 代码演示

```typescript
interface IListNode {
  value: number
  next: IListNode | null
}

export class MyQueue {
  private head: IListNode | null = null
  private tail: IListNode | null = null
  private len = 0

  /**
   * 入队，在 tail 位置
   * @param n number
   */
  add(n: number) {
    const newNode: IListNode = {
      value: n,
      next: null,
    }

    // 处理 head
    if (this.head == null) {
      this.head = newNode
    }

    // 处理 tail
    const tailNode = this.tail
    if (tailNode) {
      tailNode.next = newNode
    }
    this.tail = newNode

    // 记录长度
    this.len++
  }

  /**
   * 出队，在 head 位置
   */
  delete(): number | null {
    const headNode = this.head
    if (headNode == null) return null
    if (this.len <= 0) return null

    // 取值
    const value = headNode.value

    // 处理 head
    this.head = headNode.next

    // 记录长度
    this.len--

    return value
  }

  get length(): number {
    // length 要单独存储，不能遍历链表来获取（否则时间复杂度太高 O(n)）
    return this.len
  }
}
```

### 功能测试代码

```typescript
// 功能测试
const q = new MyQueue()
q.add(100)
q.add(200)
q.add(300)
console.info('length1', q.length)
console.log(q.delete())
console.info('length2', q.length)
console.log(q.delete())
console.info('length3', q.length)
console.log(q.delete())
console.info('length4', q.length)
console.log(q.delete())
console.info('length5', q.length)
```

### 性能测试

```typescript
// 性能测试
const q1 = new MyQueue()
console.time('queue with list')
for (let i = 0; i < 10 * 10000; i++) {
  q1.add(i)
}
for (let i = 0; i < 10 * 10000; i++) {
  q1.delete()
}
console.timeEnd('queue with list') // 17ms

const q2 = []
console.time('queue with array')
for (let i = 0; i < 10 * 10000; i++) {
  q2.push(i) // 入队
}
for (let i = 0; i < 10 * 10000; i++) {
  q2.shift() // 出队
}
console.timeEnd('queue with array') // 431ms
```

### 划重点

- 链表，链表 VS 数组
- 数组结构的选择，要比算法优化更重要
- 要有时间复杂度的敏感性，如 length 不能遍历查找

## 05：二分查找

### 题目

用 Javascript 实现二分查找（针对有序数组），说明它的时间复杂度

### 一个故事

N 年前，百度，一个复杂的后台系统出现了问题，因为太大找不到问题所在。
一个工程师，使用二分法，很快找到了问题原因。

无论多么大的数据量，一旦有了二分，便可快速搞定

二分法，是算法的一个重要思维。

但二分法有一个条件：**需要有序数据**。

### 分析

二分查找是一种固定的算法，没什么可分析的。

两种实现思路

- 递归 - 代码逻辑更加简洁
- 循环 - 性能更好（就调用一次函数，而递归需要调用很多次函数，创建函数作用域会消耗时间）

时间复杂度 `O(logn)`

### 代码演示

#### 循环

```typescript
/**
 * 二分查找（循环）
 * @param arr arr
 * @param target target
 */
export function binarySearch1(arr: number[], target: number): number {
  const length = arr.length
  if (length === 0) return -1

  let startIndex = 0 // 开始位置
  let endIndex = length - 1 // 结束位置

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]
    if (target < midValue) {
      // 目标值较小，则继续在左侧查找
      endIndex = midIndex - 1
    } else if (target > midValue) {
      // 目标值较大，则继续在右侧查找
      startIndex = midIndex + 1
    } else {
      // 相等，返回
      return midIndex
    }
  }
  return -1
}
```

#### 递归

```typescript
/**
 * 二分查找（递归）
 * @param arr arr
 * @param target target
 * @param startIndex start index
 * @param endIndex end index
 */
export function binarySearch2(
  arr: number[],
  target: number,
  startIndex?: number,
  endIndex?: number,
): number {
  const length = arr.length
  if (length === 0) return -1

  // 开始和结束的范围
  if (startIndex == null) startIndex = 0
  if (endIndex == null) endIndex = length - 1

  // 如果 start 和 end 相遇，则结束
  if (startIndex > endIndex) return -1

  // 中间位置
  const midIndex = Math.floor((startIndex + endIndex) / 2)
  const midValue = arr[midIndex]

  if (target < midValue) {
    // 目标值较小，则继续在左侧查找
    return binarySearch2(arr, target, startIndex, midIndex - 1)
  } else if (target > midValue) {
    // 目标值较大，则继续在右侧查找
    return binarySearch2(arr, target, midIndex + 1, endIndex)
  } else {
    // 相等，返回
    return midIndex
  }
}
```

### 功能测试

```typescript
const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
const target = 40
// console.info(binarySearch2(arr, target))
```

### 性能测试

```typescript
console.time('binarySearch1')
for (let i = 0; i < 100 * 10000; i++) {
  binarySearch1(arr, target)
}
console.timeEnd('binarySearch1') // 17ms

console.time('binarySearch2')
for (let i = 0; i < 100 * 10000; i++) {
  binarySearch2(arr, target)
}
console.timeEnd('binarySearch2') // 34ms
```

### 划重点

- 凡有序，必二分
- 凡二分，时间复杂度必包含 `O(logn)` !!!
- 递归 VS 非递归

## 06：两数之和

### 题目

输入一个递增的数字数组，和一个数字 `n` 。求和等于 `n` 的两个数字。

例如输入 `[1, 2, 4, 7, 11, 15]` 和 `15` ，返回两个数 `[4, 11]`

### 分析

注意题目的要点

\- 递增，从小打大排序

\- 只需要两个数字，而不是多个

### 常规思路

嵌套循环，找个一个数，然后再遍历剩余的数，求和，判断。

时间复杂度 `O(n^2)` ，基本不可用。

### 利用递增的特性

**数组是递增的**

- 随便找两个数
- 如果和大于 n ，则需要向前寻找
- 如果和小于 n ，则需要向后寻找 —— **二分法**

**双指针（指针就是索引，如数组的 index）**

- i 指向头，j 指向尾， 求 i + j 的和
- 和如果大于 n ，则说明需要减少，则 j 向前移动（递增特性）
- 和如果小于 n ，则说明需要增加，则 i 向后移动（递增特性）

**时间复杂度降低到 `O(n)`**

### 代码

#### 普通嵌套循环

```typescript
/**
 * 寻找和为 n 的两个数（嵌套循环）
 * @param arr arr
 * @param n n
 */
export function findTowNumbers1(arr: number[], n: number): number[] {
  const res: number[] = []

  const length = arr.length
  if (length === 0) return res

  // O(n^2)
  for (let i = 0; i < length - 1; i++) {
    const n1 = arr[i]
    let flag = false // 是否得到了结果

    for (let j = i + 1; j < length; j++) {
      const n2 = arr[j]

      if (n1 + n2 === n) {
        res.push(n1)
        res.push(n2)
        flag = true
        break
      }
    }

    if (flag) break
  }

  return res
}
```

#### 双指针查找

```typescript
/**
 * 查找和为 n 的两个数（双指针）
 * @param arr arr
 * @param n n
 */
export function findTowNumbers2(arr: number[], n: number): number[] {
  const res: number[] = []

  const length = arr.length
  if (length === 0) return res

  let i = 0 // 头
  let j = length - 1 // 尾

  // O(n)
  while (i < j) {
    const n1 = arr[i]
    const n2 = arr[j]
    const sum = n1 + n2

    if (sum > n) {
      // sum 大于 n ，则 j 要向前移动
      j--
    } else if (sum < n) {
      // sum 小于 n ，则 i 要向后移动
      i++
    } else {
      // 相等
      res.push(n1)
      res.push(n2)
      break
    }
  }

  return res
}
```

### 代码测试

#### 功能测试

```typescript
const arr = [
  1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
  1, 2, 4, 7, 11, 15,
]
// console.info(findTowNumbers2(arr, 15))
```

#### 性能测试

```typescript
console.time('findTowNumbers1')
for (let i = 0; i < 100 * 10000; i++) {
  findTowNumbers1(arr, 15)
}
console.timeEnd('findTowNumbers1') // 730ms

console.time('findTowNumbers2')
for (let i = 0; i < 100 * 10000; i++) {
  findTowNumbers2(arr, 15)
}
console.timeEnd('findTowNumbers2') // 102
```

### 划重点

- 时间复杂度 O(n^2), 是不可用的算法
- 凡有序，必二分！！！
- 优化嵌套循环，可以考虑 **“双指针”**
