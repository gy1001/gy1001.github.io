# 00: JS 面试题

## 1. 使用迭代方式实现 flatten 函数

```js
const arr = [1, [2, [3, [4, 5]]]]

const flattenOne = (arr) => {
  while (arr.some((v) => Array.isArray(v))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flattenOne(arr))

const flattenTwo = (arr) => {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flattenTwo(val) : val)
  }, [])
}
console.log(flattenTwo(arr))
```

## 2. 数组的随机排序

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const randomSortOne = (arr) => {
  const arrLength = arr.length
  for (let i = 0; i < arrLength; i++) {
    const randomIndex = Math.floor(Math.random() * arrLength)
    const temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}

console.log(randomSortOne(arr))

const randomSortTwo = (arr) => {
  arr.sort(() => Math.random() - 0.5)
  return arr
}

console.log(randomSortTwo(arr))
```

## 3. 如何提取 URL 中的参数

```js
let url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'

const queryUrlParamsOne = (url) => {
  let urlArr = url.split('?')
  let paramsArr = urlArr[1].split('&')
  let paramsObj = {}
  paramsArr.forEach((item) => {
    let itemArr = item.split('=')
    paramsObj[itemArr[0]] = decodeURIComponent(itemArr[1])
  })
  return paramsObj
}
console.log(queryUrlParamsOne(url))

const queryUrlParamsTwo = (URL) => {
  const url = URL.split('?')[1]
  const urlSearchParams = new URLSearchParams(url)
  const paramsObj = Object.fromEntries(urlSearchParams.entries())
  return paramsObj
}
console.log(queryUrlParamsTwo(url))
```

## 4. 打印 100 以内的质数

```js
// 质数：只能被 1 和 自身整除
const resultArr = [1]
for (let index = 2; index <= 100; index++) {
  let count = 0
  for (let j = 1; j <= index; j++) {
    if (index % j === 0) {
      count++
    }
  }
  if (count === 2) {
    resultArr.push(index)
  }
}
console.log(resultArr)
```

## 5. 如何获得指定范围内的随机数

- Math.random() 生成 0-1 之间的随机数 (大于等于 0 且小于 1 )
- Math.floor() 向下取整
- Math.ceil() 向上取整
- Math.round() 四舍五入

```js
const randomNum = (min, max) => {
  // 不包含两端的处理：(min, max)
  // return Math.round(Math.random() * (max - min - 2) + min + 1)
  // 包含两端的处理：[min, max]
  // return Math.round(Math.random() * (max - min) + min)
  // 包含尾部的处理：(min, max]
  // return Math.ceil(Math.random() * (max - min) + min)
  // 包含头部的处理：[min, max)
  return Math.floor(Math.random() * (max - min) + min)
}
console.log(randomNum(1, 10))
```

## 6. 数组去重

```js
const arr = [
  {},
  {},
  '',
  '',
  233,
  233,
  'abc',
  undefined,
  null,
  null,
  NaN,
  NaN,
  123,
  [2],
  [2],
  [2, 3],
]
Array.prototype.myUnique = function () {
  // 第一种：使用 set 方法
  // return Array.from(new Set(this)) 这种方式并不能过滤掉数组，对象等

  //  第二种：使用 includes 来进行判断，结果如上
  // let arr = []
  // for (let i = 0; i < this.length; i++) {
  //   if (!arr.includes(this[i])) {
  //     arr.push(this[i])
  //   }
  // }
  // return arr

  //  第三种：使用 filter 方法
  return this.filter((item, index) => this.indexOf(item) === index) // 同样无法避免引用类型重复的问题
}
```

以上三种方式基本可以解决常见的去重问题

## 7. 自定义实现 unshift

> unshift: 在数组的开头添加一个或多个元素，并返回新的长度

```js
const arr = [1, 2, 3, 4, 5]
Array.prototype.myUnshift = function (...args) {
  // 1. 获取到数组中的所有元素
  // 2. 把所有元素添加到 args 数组中
  for (let index = args.length - 1; index >= 0; index--) {
    this.splice(0, 0, args[index]) // splice() 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。
  }
  return this.length
}
console.log(arr.myUnshift(6, 7, 8), arr)
```

## 8. 说说 Object.defineProperty 和 Proxy 的区别

- Vue2.x 使用 Object.defineProperty 实现响应式

1. Object.defineProperty 只能劫持对象的属性，从而需要对每个对象的每个属性进行遍历
2. Object.defineProperty 无法监听原生支持数组(其实可以的，只是尤大回答：性能代价和获得的用户体验收益不成正比)，需要特殊处理
3. Object.defineProperty 对新增属性需要手动进行 Observe

- Vue3.x 使用了 Proxy 实现响应式
