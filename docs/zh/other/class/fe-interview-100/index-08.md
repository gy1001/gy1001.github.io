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
