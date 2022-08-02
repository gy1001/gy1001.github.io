# 一些工具库函数

## 1、函数相关

### 1.1 call/apply/bind

#### 1.1.1 call 函数封装实现

- 语法：call(fn, obj, ...args)
- 功能：执行 fn ，使 this 指向为 obj， 并将后面的 n 个参数传给 fn(功能等同于函数对象的 calll 方法)

```javascript
function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    // 根据 mdn 文档，this 为 undefined 或者 null 指向 全局对象
    obj = globalThis // globalThis 表示当前全局对象 ，window 或者 node
  }
  // 为 obj 添加临时的方法
  obj.temp = fn
  // 调用 temp方法
  let result = obj.temp(...args)
  // 删除 temp 属性方法
  delete obj.temp
  // 返回执行结果
  return result
}

// 测试代码

// 声明一个函数
function add(a, b) {
  console.log(this)
  return a + b + this.c
}
// 声明一个对象
let obj = {
  c: 521,
}

// 添加全局属性
window.c = 1314

// 执行 call 函数

let result = call(add, obj, 3, 4)
console.log(result)
const result2 = call(add, null, 31, 4)
console.log(result2)

// 原生函数的 call 方法
console.log(add.call(obj, 3, 4))
console.log(add.call(null, 31, 4))
```

#### 1.1.2 apply 函数封装实现

- 语法：apply(fn, obj, args)
- 功能：执行 fn, 使 this 为 obj, 并将 args 数组中的元素传给 fn（功能等同于函数对象的 apply 方法）

```javascript
// args 是一个数组类型
function apply(fn, obj, args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  // 为 obj 添加 临时方法
  obj.temp = fn
  // 执行方法
  const result = obj.temp(...args)
  // 删除 temp 属性方法
  delete obj.temp
  return result
}

// 声明一个函数
function add(a, b) {
  console.log(this)
  return a + b + this.c
}
// 声明一个对象
let obj = {
  c: 521,
}

// 添加全局属性
window.c = 1314

// 执行 apply 函数
let result = apply(add, obj, [3, 4])
console.log(result)
const result2 = apply(add, null, [31, 4])
console.log(result2)

// 原生函数的 apply 方法
console.log(add.apply(obj, [3, 4]))
console.log(add.apply(null, [31, 4]))
```

#### 1.1.3 bind 函数封装实现

- 语法：bind(fn, obj, ...args)
- 功能：给 fn 绑定 this 为 obj，并制定参数为后面的 n 个参数(功能等同于函数对象的 bind 方法 )

```javascript
// 实现方式依赖 call
function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = fn
  let result = obj.temp(...args)
  delete obj.temp
  return result
}

function bind(fn, obj, ...args) {
  // 返回一个新的函数
  return function (...args2) {
    // 指向 call 函数, 注意参数的顺序
    return call(fn, obj, ...args, ...args2)
  }
}

// 声明一个函数
function add(a, b) {
  console.log(this)
  return a + b + this.c
}
// 声明一个对象
let obj = { c: 521 }

// 添加全局属性
window.c = 1314

// 执行 bind 函数
let result = bind(add, obj, 3, 4)()
console.log(result)
const result2 = bind(add, null)(10, 20)
console.log(result2)

// 原生函数的 apply 方法
console.log(add.bind(obj, 3, 4)())
console.log(add.bind(null)(10, 20))
```

### 1.1.2 实现说明

- 区别：call/apply/bind
  - call(obj)/apply(obj)：调用函数，指定函数中的 this 为第一个参数的值
  - bind(obj)：返回一个新的函数，新函数内部会调用原来的函数，且 this 为 bind() 指定的第一参数的值
  - 注意：如果 obj 是 null/undefined, this 指向 全局对象 window / node
- 应用
  - call/apply 应用：根据伪数组生成真数组
  - bind 应用: react 中组件的自定义方法、vue 中的事件回调函数内部
- 自定义 call/apply
  - 给 obj 添加一个临时方法，方法名任意，值为当期函数
  - 通过 obj 调用这个临时方法，并将接收的参数传入
  - 删除 obj 上的这个临时方法属性
- 自定义 bind
  - 返回一个新函数
  - 在新函数内部通过原函数对象的 call 方法来执行原函数
  - 指定原函数的 this 为 obj
  - 指定参数为 bind 调用的参数和后面新函数调用的参数

### 1.2 函数节流与函数防抖

#### 1.2.1 相关理解

- 事件频繁触发可能造成的问题？
  - 一些浏览器事件：window.onresize/window.mouseomove 等，触发的频率非常高，会造成界面卡顿
  - 如果向后台发送请求，频繁请求，对服务器造成不必要的压力
- 如何限制事件处理函数频繁调用
  - 函数节流
  - 函数防抖
- 函数节流 throttle:
  - 理解
    - 在函数需要频繁触发时，函数执行一次后，只有大于设定的执行周期后才会执行第二次
    - 适合多次事件按平均时间做平均分配触发
  - 场景
    - 窗口调整 resize
    - 页面滚动 scroll
    - DOM 元素的拖拽功能实现 mousemove
    - 抢购疯狂点击 click
- 函数防抖 debounce
  - 理解
    - 在函数需要频繁触发时：在规定时间内，只让最后一次生效，前面的不生效
    - 适合多次事件一次响应的情况
  - 场景
    - 输入框实时搜索联想 keyup/input
- 区别函数节流与防抖
  - 函数节流：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
  - 函数防抖：n 秒后再执行该事件，若在 n 秒内重复触发，则重新计时

#### 1.2.2 API 说明

- throttle 节流
  - 语法：throttle(callback, wait)
  - 功能：创建一个节流函数，在 wait 毫秒内最多执行 callback 一次
- debounce 防抖
  - 语法：debounce(callback, wait)
  - 功能：创建一个防抖动函数，该函数从上一次被调用后，延迟 wait 毫秒后调用 callback

#### 1.2.3 编码实现

1. 函数节流实现

   ```javascript
   function throttle(callback, wait) {
     // 定义开始时间
     let start = 0
     // 返回结果是一个函数
     return function (e) {
       // 只有距离上次处理的时间间隔超过了wait 时，才执行处理事件的函数
       const current = Date.now()
       if (current - start > wait) {
         callback.call(this, event) // 指定 this 和 参数
         start = current
       }
     }
   }

   // 调用方式
   window.addEventListener(
     'scroll',
     throttle(function () {
       console.log(Date.now())
     }, 500)
   )
   ```

2. 函数防抖

   ```javascript
   // html:  <button id="btn">测试函数防抖</button>

   function debounce(callback, wait) {
     // 用来 保存定时器任务的标识 id
     let timerId = null
     return function (event) {
       if (timerId) {
         // 如果定时器存在就清除
         clearTimeout(timerId)
       }
       // 启动延迟 wait 时间后执行的定时器任务
       timerId = setTimeout(() => {
         // 调用 callback 处理事件
         callback.call(this, event)
         // 处理后重置定时器标识
         timerId = null
       }, wait)
     }
   }

   const btn = document.getElementById('btn')
   btn.onclick = debounce(function () {
     console.log('点击事件触发了')
   }, 500)
   ```

## 2、数组相关

### 2.1 数组声明式系列方式

#### map 函数

> 返回一个由回调函数的返回值组成的新数组

```javascript
// map 函数：接受一个数组 和 一个回调函数
function map(arr, callback) {
  const newArr = []
  for (let index = 0; index < arr.length; index++) {
    newArr.push(callback(arr[index], index))
  }
  return newArr
}
// 测试代码
const arr = [1, 2, 3, 4, 5, 6, 7, 8]
const result = map(arr, (item) => {
  return item * 10
})
console.log(result)
```

#### reduce 函数

> 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值

```javascript
function reduce(arr, callback, initValue) {
  let result = initValue
  for (let index = 0; index < arr.length; index++) {
    // 调用回调函数将返回的结果赋值给result
    result = callback(result, arr[index])
  }
  return result
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = reduce(
  arr,
  (prev, next) => {
    console.log(prev, next)
    prev.push(next * 2)
    return prev
  },
  []
)
console.log(result) // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

#### filter 函数

> 将所有在过滤函数中返回 `true`的 数组元素放进一个数组中并返回

```javascript
function filter(arr, callback) {
  const newArr = []
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      newArr.push(arr[index])
    }
  }
  return newArr
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = filter(arr, (item) => {
  return item % 2 === 0
})
console.log(result) // [2,4,6,8,10]
```

#### find 函数

> 找到第一个满足测试函数的元素并返回这个元素的值，如果找不到，则返回 undefined

```javascript
function find(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      return arr[index]
    }
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = find(arr, (item) => {
  return item % 2 === 0
})
console.log(result) // 2
```

#### findIndex 函数

> 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，返回 -1

```javascript
function findIndex(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      return index
    }
  }
  return -1
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = findIndex(arr, (item) => {
  return item / 2 === 5
})
console.log(result) // 9
```

#### every 函数

> 如果数组中的每个元素都符合测试函数，则返回 true， 否则返回 false

```javascript
function every(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    // 只要有一个回调函数结果为false, 则立即返回 false
    if (!callback(arr[index], index)) {
      return false
    }
  }
  // 否则返回 true
  return true
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = every(arr, (item) => {
  return item > 0
})
console.log(result)
```

#### some 函数

> 如果数组中至少有一个元素满足测试函数，则返回 true， 否则返回 false

```javascript
function some(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      return true
    }
  }
  return false
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = some(arr, (item) => {
  return item > 9
})
console.log(result)
```

### 2.2 数组去重

#### 2.2.1 API 说明

根据当前数组产生一个去重重复元素后的新数组

#### 2.2.2 实现思路

1. 利用 forEach 和 indexOf()
   - 说明：本质是双重遍历，效率差些
2. 利用 forEach() + 对象容器
   - 说明：只需一重遍历，效率高些
3. 利用 ES6 语法：from + Set 或者 ... + Set
   - 说明：编码简洁

#### 2.2.3 代码实现

1. 第一版：使用 forEach 和 indexOf 方法

   ```javascript
   function unique1(arr) {
     const newArr = []
     for (let index = 0; index < arr.length; index++) {
       if (newArr.indexOf(arr[index]) === -1) {
         newArr.push(arr[index])
       }
     }
     return newArr
   }

   const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
   const result = unique1(arr)
   console.log(result)
   ```

2. 第二版：使用 forEach 和 对象容器

   ```javascript
   function unique2(arr) {
     const newArr = []
     const newObj = {}
     for (let index = 0; index < arr.length; index++) {
       const item = arr[index]
       if (!newObj.hasOwnProperty(item)) {
         newObj[item] = true
         newArr.push(item)
       }
     }
     return newArr
   }

   const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
   const result = unique2(arr)
   console.log(result)
   ```

3. 第三版：使用 ES6 语法

   ```javascript
   function unique3(arr) {
     return [...new Set(arr)]
   }

   const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
   const result = unique3(arr)
   console.log(result)
   ```

### 2.3 数组合并与切片

#### concat()：合并函数

- 语法： var newArr = concat(array, value1 [, value2, ...[,valueN]])

- 功能：将 n 个数组或值与当前数组合并在一个新数组，原始数组不会被改变

- 编码实现

  ```javascript
  function concat(arr, ...value) {
    const newArr = [...arr]
    value.forEach((item) => {
      if (Array.isArray(item)) {
        newArr.push(...item)
      } else {
        newArr.push(item)
      }
    })
    return newArr
  }

  const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
  const result = concat(arr, [10, 11], 12, 13, 14)
  console.log(result) // [2, 3, 2, 7, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 14]
  ```

#### slice()：切片函数

- 语法：var newArr = slice(array, [begin, [,end]])

- 功能：返回一个由 begin 和 end 决定的原数组的浅拷贝，原始数组不会被改变

- 编码实现

  ```javascript
  function slice(arr, begin, end) {
    // 如果当前数组是 [], 直接返回[]
    if (arr.length === 0) {
      return []
    }
    begin = begin || 0
    // 如果 begin 超过最大下标，直接返回[]
    if (begin >= arr.length) {
      return []
    }

    // 如果数组超过数组长度，则截取到数组长度
    end = end || arr.length
    if (end > arr.length) {
      end = arr.length
    }
    // 如果 end 小于 begin, 则直接返回 []
    if (end <= begin) {
      return []
    }

    const newArr = []
    // 取出下标在 [begin,end) 区间的元素，并保存到最终的数组中
    for (let index = begin; index < end; index++) {
      newArr.push(arr[index])
    }
    return newArr
  }

  const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
  const result = slice(arr)
  console.log(result)
  console.log(slice(arr, 2))
  console.log(slice(arr, 5))
  ```

### 2.4 数组扁平化

#### 2.4.1 API 说明

- 语法：flatten(array)
- 取出嵌套数组（多维）中的所有元素放到一个新数组中(一维)中
- 如：[1,[3,[2,4]]] => [1,2,3,4]

#### 2.4.2 编码实现

1. 方法 1: 使用 递归 + reduce + concat

   ```javascript
   function flatten1(arr) {
     return arr.reduce((prev, item) => {
       if (Array.isArray(item) && item.some((cItem) => Array.isArray(cItem))) {
         return prev.concat(flatten1(item))
       } else {
         return prev.concat(item)
       }
     }, [])
   }

   const arr = [1, [3, [2, 4, [5, 65, 6, 7888, [8]]]]]
   const result = flatten1(arr)
   console.log(result) // [1, 3, 2, 4, 5, 65, 6, 7888, 8]
   ```

2. 方法 2: some + concat

   ```javascript
   function flatten2(arr) {
     // 先创建一个总数组
     let newArr = [].concat(...arr)
     // 遍历：只要数组中还有数组，就进行合并展开处理，直至数组中没有数组
     while (newArr.some((item) => Array.isArray(item))) {
       newArr = [].concat(...newArr)
     }
     return newArr
   }

   const arr = [1, [3, [2, 4, [5, 65, 6, 7888, [8]]]]]
   const result = flatten2(arr)
   console.log(result) // [1, 3, 2, 4, 5, 65, 6, 7888, 8]
   ```

### 2.5 数组分块

#### 2.5.1 API 说明

- 语法：chunk(array, size)

- 功能：将数组拆分为多个 size 长度的区块，每个区块组成小数组，整体组成一个二维数组

- 如 [1,3,5,6,7,8] 调用 chunk(arr, 4) ====> [[1,3,5,6], [7,8]]

- 编码实现

  ```javascript
  function chunk(array, size) {
    if (array.length === 0) {
      return []
    }
    size = size || 1
    const bigArr = []
    let smallArr = []
    array.forEach((item) => {
      if (smallArr.length === 0) {
        bigArr.push(smallArr)
      }
      smallArr.push(item)
      // 巧妙的用到了地址引用
      if (smallArr.length === size) {
        smallArr = []
      }
    })
    return bigArr
  }
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  console.log(chunk(arr, 4)) // [[1, 2, 3, 4], [5, 6, 7, 8]， [9, 10], [9, 10]]

  // 上述示例涉及到一个地址引用的情况，会有一定的理解代价，可以更简单一点，如下
  function chunk2(array, size) {
    const outPutArr = []
    const forTime = Math.ceil(array.length / size)
    for (let i = 0; i < forTime; i++) {
      outPutArr.push(array.slice(i * size, (i + 1) * size))
    }
    return outPutArr
  }
  console.log(chunk2([1, 2, 3, 4, 5, 6, 7], 3))
  ```

### 2.6 数组取差异

#### 2.6.1 API 说明

- 语法：difference(arr1, arr2)

- 功能：得到当前数组中所有不在 arr 中的元素组成的数组(不改变原数组)

- 例子：difference([1,3,5,7,8], [5,8]) ===> [1,3,7]

- 编码实现

  ```javascript
  function difference(arr1, arr2) {
    if (arr1.length === 0) {
      return []
    } else if (arr2.length === 0) {
      return arr1
    }
    return arr1.filter((item) => arr2.indexOf(item) === -1)
  }

  console.log(difference([1, 3, 4, 5, 7, 8], [1, 5, 8, 3])) // [4, 7]
  ```

### 2.7 删除数组中部分元素

#### 2.7.1 pull (array, ...values)

- 删除原数组中与 value 相同的元素，返回所有删除元素的数组

- 说明：原数组发生了改变

- 如 pull([1,3,5,3,7],2,7,3,7) ====> 原数组变为 [1,5] 返回值为 [3,3,7]

- 编码实现

  ```javascript
  function pull(arr1, ...values) {
    if (arr1.length === 0 || values.length === 0) {
      return []
    }
    const result = []
    for (let index = 0; index < arr1.length; index++) {
      const element = arr1[index]
      if (values.indexOf(element) !== -1) {
        arr1.splice(index, 1)
        result.push(element)
        index--
      }
    }
    return result
  }

  var arr = [1, 3, 5, 3, 7]
  console.log(pull(arr, 2, 7, 3, 7)) // [3, 3, 7]
  console.log(arr) // [1, 5]
  ```

#### 2.7.2 pullArr(arry, values)

- 功能与 pull 一直，只是参数变为数组

- 如：pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组 1 变为[1, 5], 返回值为[3,3,7]

- 编码实现

  ```javascript
  function pull(arr1, ...values) {
    if (arr1.length === 0 || values.length === 0) {
      return []
    }
    const result = []
    for (let index = 0; index < arr1.length; index++) {
      const element = arr1[index]
      if (values.indexOf(element) !== -1) {
        arr1.splice(index, 1)
        result.push(element)
        index--
      }
    }
    return result
  }

  function pullAll(arr1, values) {
    if (!values || !Array.isArray(values)) {
      return []
    }
    return pull(arr1, ...values)
  }

  var arr = [1, 3, 5, 3, 7]
  console.log(pullAll(arr, [2, 7, 3, 7])) // [3, 3, 7]
  console.log(arr) // [1, 5]
  ```

### 2.8 得到数组的部分元素

#### 2.8.1 drop(array, count)

- 得到当前数组过滤左边 count 个 后剩余元素组成的数组

- 说明：不改变当前数组，count 默认是 1

- 如：drop([1,3,5,7], 2) =====> [5, 7]

- 编码实现

  ```javascript
  // 两种方式均可
  function drop1(arr, number) {
    number = number || 1
    const newArr = []
    for (let index = number; index < arr.length; index++) {
      const element = arr[index]
      newArr.push(element)
    }
    return newArr
  }

  function drop(arr, number = 1) {
    if (arr.length === 0 || number >= arr.length) {
      return []
    }
    return arr.filter((item, index) => index >= number)
  }

  console.log(drop([1, 3, 5, 7], 2)) // [5,7]
  console.log(drop([1, 3, 5, 7], 4)) // []
  console.log(drop([1, 3, 5, 7])) // [3,5,7]
  ```

#### 2.8.2 dropRight(array, count)

- 得到当前数组过滤掉右边 count 个后剩余元素组成的数组

- 说明：不改变当前数组，count 默认是 1

- 如：dropRight([1,3,5,7], 2) ====> [1,3]

- 编码实现

  ```javascript
  function dropRight(array, count = 1) {
    if (array.length === 0 || count >= array.length) {
      return []
    }
    return array.filter((item, index) => index < array.length - count)
  }

  console.log(dropRight([1, 3, 5, 7], 2)) // [1,3]
  console.log(dropRight([1, 3, 5, 7], 4)) // []
  console.log(dropRight([1, 3, 5, 7])) // [1,3,5]
  ```

## 3、对象相关

### 3.1 newInstance （自定义 new）

- 语法：newInstance(Fn, ...args)

- 功能：创建 Fn 构造函数的实例对象

- 编码实现

  ```javascript
  function newInstance(Fn, ...args) {
    // 创建一个空的 object 实例对象 obj, 作为 Fn 的实例对象
    const obj = {}
    // 将 Fn 的 prototype 属性值赋值给 obj 的 __proto__ 属性值
    obj.__proto__ = Fn.prototype
    // 调用 Fn, 指定 this 为 obj, 参数为 args 列表
    const result = Fn.call(obj, ...args)
    // 如果 Fn 返回的是一个对象类型，那返回的就不再是 obj, 而是 Fn返回的对象
    // 否则返回 obj
    return result instanceof Object ? result : obj
  }

  function Person(name, age) {
    this.name = name
    this.age = age
    // return {}
    // return []
    // return function (){}
    // return 1
    // return undefined
  }

  const p = new Person('tom', 12)
  console.log(p)

  const p2 = newInstance(Person, 'Jack', 13)
  console.log(p2)
  console.log(p2.constructor)
  ```

### 3.2 myInstanceOf (自定义 instanceOf)

- 语法：myInstacenOf(obj, Type)

- 功能：判断 obj 是否是 Type 类型的实例

- 实现：Type 的原型对象是否是 obj 的原型链上的某个对象，如果返回是 true, 否则返回 false

- 编码实现

  ```javascript
  function myInstanceOf(obj, Type) {
    // 得到原型对象
    let protoObj = obj.__proto__
    // 只要原型对象存在
    while (protoObj) {
      // 如果原型对象是 Type 的原型对象，返回 true
      if (protoObj === Type.prototype) {
        return true
      }
      // 指定原型对象的原型对象
      protoObj = protoObj.__proto__
    }
    return false
  }

  function Person(name, age) {
    this.name = name
    this.age = age
  }
  const p = new Person('tom', 12)

  console.log(myInstanceOf(p, Object), p instanceof Object) // true true
  console.log(myInstanceOf(p, Person), p instanceof Person) // true true
  console.log(myInstanceOf(p, Function), p instanceof Function) // false false

  function Parent() {}
  const p1 = new Parent()
  // 注意以下关系
  console.log(p1.__proto__ === Parent.prototype)
  console.log(Parent.prototype.__proto__ === Object.prototype)
  console.log(Object.prototype.__proto__ === null)

  console.log(p1.constructor === Parent)
  console.log(Parent.prototype.constructor === Parent)
  console.log(Parent.constructor === Function)
  console.log(Function.constructor === Function)

  console.log(Parent.__proto__ === Function.prototype)
  console.log(Function.prototype.__proto__ === Object.prototype)
  console.log(Object.prototype.__proto__ === null)
  ```

- 关系图如下

  ![image](https://segmentfault.com/img/remote/1460000021232137/view)

- 参考文章：[一张图搞定 JS 原型&原型链](https://segmentfault.com/a/1190000021232132)

### 3.3 合并多个对象 mergeObject

- 语法：mergeObject(...objs)

- 功能：合并多个对象，返回一个合并后的对象(不改变原对象)

- 例子

  - obj1: { a: [{ x: 2 }, { y: 4 }], b: 1}
  - obj2: { a: { z: 3}, b: [2, 3], c: 'foo'}
  - 合并后：{ a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

- 源码实现：

  ```javascript
  function mergeObject(...objs) {
    const result = []
    objs.forEach((item) => {
      Object.keys(item).forEach((key) => {
        // 如果 result 还没有 key 属性值
        if (!result.hasOwnProperty(key)) {
          result[key] = item[key]
        } else {
          // 否则合并属性
          result[key] = [].concat(result[key], item[key])
        }
      })
    })
    return result
  }

  const object = {
    a: [{ x: 2 }, { y: 4 }],
    b: 1,
    d: { a: 22 },
  }
  const other = {
    a: { z: 3 },
    b: [2, 3],
    c: 'foo',
    d: { b: 33 },
  }
  console.log(mergeObject(object, other))
  ```

### 3.4 对象/数组拷贝

#### 3.4.1 区分浅拷贝与深拷贝

- 纯语言表达
  - 浅拷贝：只是复制了 对象属性或者数组元素本身（只是引用地址值）
  - 深拷贝：不仅复制了对象属性或数组元素本身，还复制了指向的对象（使用递归）
- 举例说明：拷贝 persons 数组（多个人对象的数组）
  - 浅拷贝：只是拷贝了每个 person 对象的引用地址值，每个 person 对象只有一份
  - 深拷贝：每个 person 对象也被复制了一份新的

#### 3.4.2 实现浅拷贝 clone

1. 实现方式 1：使用 ES6 语法

   ```javascript
   // 实现浅拷贝方式1
   function clone1(target) {
     // 如果是对象（不是函数，也就是可能是object对象或者数组）
     if (target != null && typeof target === 'object') {
       if (target instanceof Array) {
         //
         return [...target]
       } else {
         return { ...target }
       }
     }
     // 基本类型或者函数，直接返回
     return target
   }

   const obj1 = { x: 'abc', y: { m: 1 } }
   const obj2 = clone1(obj1)
   console.log(obj2, obj2 === obj1, obj2.x === obj1.x, obj2.y === obj1.y)

   const arr1 = ['abc', { m: 1 }]
   const arr2 = clone1(arr1)
   console.log(arr2, arr2 === arr1, arr2[0] === arr1[0], arr2[1] === arr1[1])

   // 对克隆后的数据进行深层次属性的改变，会影响原来的数据
   obj2.y.m = '2222'
   console.log(obj1.y.m)
   ```

2. 实现方式 2：使用 ES5 语法， for...in

   ```javascript
   // 实现深拷贝方式2
   // 利用 ES5语法，for...in
   function clone2(target) {
     // 如果是对象（不是函数，也就是可能是object对象或者数组）
     if (target != null && typeof target === 'object') {
       const cloneTarget = Array.isArray(target) ? [] : {}
       for (const key in target) {
         if (target.hasOwnProperty(key)) {
           cloneTarget[key] = target[key]
         }
       }
       return cloneTarget
     }
     // 基本类型或者函数，直接返回
     return target
   }

   const obj1 = { x: 'abc', y: { m: 1 } }
   const obj2 = clone2(obj1)
   console.log(obj2, obj2 === obj1, obj2.x === obj1.x, obj2.y === obj1.y)

   const arr1 = ['abc', { m: 1 }]
   const arr2 = clone2(arr1)
   console.log(arr2, arr2 === arr1, arr2[0] === arr1[0], arr2[1] === arr1[1])

   // 对克隆后的数据进行深层次属性的改变，会影响原来的数据
   obj2.y.m = '2222'
   console.log(obj1.y.m)
   ```

#### 3.4.3 实现深拷贝 deepClone

1. 方法一：大众乞丐版

   - 问题 1：函数属性丢失（JSON 不支持转换函数）
   - 问题 2：循环引用会出错

   ```javascript
   function deepClone1(target) {
     // 通过数据创建 JSON 格式的字符串
     return JSON.parse(JSON.stringify(target))
   }

   const obj1 = {
     a: 1,
     b: ['e', 'f', 'g'],
     c: { h: { i: 2 } },
     // JSON 不能转换方法，使用这种方式克隆后会丢失
     d: function () {},
   }
   obj1.b.push(obj1.c)
   // obj1.c.j = obj1.b // 这里属性进行了循环引用，会报错
   const obj2 = deepClone1(obj1)
   console.log(obj2)
   // console.log(obj2, obj2.c === obj1.c, obj2.d === obj1.d)
   ```

2. 方法二：面试基础版

   - 解决问题 1：函数属性还没丢失

   - 编码实现

     ```javascript
     function deepClone2(target) {
       if (target !== null && typeof target === 'object') {
         const cloneTarget = target instanceof Array ? [] : {}
         for (const key in target) {
           if (target.hasOwnProperty(key)) {
             cloneTarget[key] = deepClone2(target[key])
           }
         }
         return cloneTarget
       }
       return target
     }

     const obj1 = {
       a: 1,
       b: ['e', 'f', 'g'],
       c: { h: { i: 2 } },
       d: function () {},
     }
     obj1.b.push(obj1.c)
     // obj1.c.j = obj1.b // 这里属性进行了循环引用，会报错
     const obj2 = deepClone2(obj1)
     console.log(obj2)
     console.log(obj2.c === obj1.c, obj2.d === obj1.d) // false true
     ```

3. 方法三：面试加强版

   - 解决问题 2：循环引用正常

     注：方法二中的深拷贝之所以在循环引用问题出现错误，原因在于遍历 属性时候，出现了重复调用，导致一直 for 循环遍历下去，现在加一个缓存中间值，如果之前遍历过就直接返回。

   - 编码实现

     ```javascript
     function deepClone3(target, map = new Map()) {
       if (target !== null && typeof target === 'object') {
         // 从容器中读取克隆对象
         let cloneTarget = map.get(target)
         // 如果存在，返回前面缓存的克隆对象
         if (cloneTarget) {
           return cloneTarget
         }
         // 创建克隆对象(可能是{}或者是[])
         cloneTarget = target instanceof Array ? [] : {}
         // 缓存到map中
         map.set(target, cloneTarget)
         for (const key in target) {
           if (target.hasOwnProperty(key)) {
             // 递归调用，深度克隆对象，且传入缓存容器map
             cloneTarget[key] = deepClone3(target[key], map)
           }
         }
         return cloneTarget
       }
       return target
     }

     const obj1 = {
       a: 1,
       b: ['e', 'f', 'g'],
       c: { h: { i: 2 } },
       d: function () {},
     }
     obj1.b.push(obj1.c)
     obj1.c.j = obj1.b // 这里属性进行了循环引用
     const obj2 = deepClone3(obj1)
     console.log(obj2)
     console.log(obj2.c === obj1.c, obj2.d === obj1.d) // false true
     ```

4. 方法四：深拷贝面试加强版本 2（优化遍历性能）

   - 数组：while|for|forEach 优于 for...in | keys && froEach

   - 对象：for...in 与 keys()&forEach() 差不多

   - 编码实现

     ```javascript
     function deepClone4(target, map = new Map()) {
       if (target !== null && typeof target === 'object') {
         // 从容器中读取克隆对象
         let cloneTarget = map.get(target)
         // 如果存在，返回前面缓存的克隆对象
         if (cloneTarget) {
           return cloneTarget
         }
         // 创建克隆对象(可能是[]或者{})
         if (target instanceof Array) {
           cloneTarget = []
           // 缓存到map中
           map.set(target, cloneTarget)
           target.forEach((item, index) => {
             cloneTarget[index] = deepClone4(item, map)
           })
         } else {
           cloneTarget = {}
           // 缓存到 map中
           map.set(target, cloneTarget)
           Object.keys(target).forEach((key) => {
             cloneTarget[key] = deepClone4(target[key], map)
           })
         }
         return cloneTarget
       }
       return target
     }

     const obj1 = {
       a: 1,
       b: ['e', 'f', 'g'],
       c: { h: { i: 2 } },
       d: function () {},
     }
     obj1.b.push(obj1.c)
     obj1.c.j = obj1.b // 这里属性进行了循环引用
     const obj2 = deepClone4(obj1)
     console.log(obj2)
     console.log(obj2.c === obj1.c, obj2.d === obj1.d) // false true
     ```

## 4、字符串相关

### 4.1 字符串倒序：reverseString(str)

- 语法：reverseString(str)

- 功能：生成一个倒序的字符串

- 编码实现

  ```javascript
  function reverseString(str) {
    // return str.split('').reverse().join('')
    // return [...str].reverse().join('')
    return Array.from(str).reverse().join('')
  }
  const string = 'abcdefghijklmnopqrstuvwxyz'
  console.log(reverseString(string))
  ```

### 4.2 字符串是否回文：palindrome(str)

- 语法: palindrome(str)

- 功能：如果给定的字符串是回文，则返回 true，否则返回 false

  - 注意：回文，英文 palindrome，指一个顺着读和反过来读都一样的字符串，比如 madam、我爱我

- 编码实现：

  ```javascript
  function reverseString(str) {
    // return str.split('').reverse().join('')
    // return [...str].reverse().join('')
    return Array.from(str).reverse().join('')
  }

  function palindrome(str) {
    return str === reverseString(str)
  }
  console.log(palindrome('abcb')) // false
  console.log(palindrome('abcba')) // true
  ```

### 4.3 截取字符串 truncate(str, num)

- 语法：truncate(str, num)

- 功能：如果字符串的长度超过了 num, 截取前面 num 长度部分，并以 ... 结束

- 编码实现

  ```javascript
  function truncate(str, num) {
    return str.length > num ? str.slice(0, num) + '...' : str
  }
  const string = 'abcdefg'
  console.log(truncate(string, 5)) // abcde...
  console.log(truncate(string, 10)) // abcdefg
  ```

## 5、手写 DOM 事件监听(带委托)

### 5.1 理解事件冒泡与事件委托

#### 5.1.1 事件冒泡

- 基于 DOM 树形结构

- 事件在目标元素上处理后，会由内向外逐层传递

- 应用场景：事件代理、委托、委派

- 图解?

  <img src='https://zxfjd3g.github.io/atguigu_utils-docs/assets/img/image-20201215141059095.a3dce0aa.png' align='left'>

#### 5.1.2 事件委托

- 将多个子元素的同类事件监听委托给（绑定在）共同的一个父组件上
- 好处
  - 减少内存占用（事件监听回调从 n 变为 1）
  - 动态添加的内部元素也能响应

### 5.2 API 相关

- 语法：addEventListener(element, type, fn ,selector)
- 说明：如果 selector 没有，直接给 element 绑定事件，如果 selector 有，将 selector 对应的多个元素的事件委托给父元素 element

### 5.3 编码实现

```javascript
function addEventListener(el, type, fn, selector) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  // 如果没有指定 selector 普通的事件绑定
  if (!selector) {
    element.addEventListener(type, fn)
    return
  }
  el.addEventListener(type, function (event) {
    // 得到真正发生事件的目标元素
    const target = event.target
    // 如果与选择器匹配
    if (target.matches(selector)) {
      // 调用处理事件的回调fn, 并指定this为目标元素, 参数为event
      fn.call(target, event)
    }
  })
}

addEventListener(
  '#ul',
  'click',
  function (event) {
    console.log(this.innerHTML, event)
  },
  'li'
)
```

## 6、手写事件总线

### 6.1 API 说明

1. eventBus：包含所有功能的事件总线对象
2. eventBus.on(eventName, listener)：监听事件监听
3. eventBus.emit(eventName, data): 分发事件
4. eventBus.off(eventName)：解绑指定事件名的事件监听，如果没有指定解绑所有

### 6.2 编码实现

```javascript
const eventBus = {
  callbacks: {},
}

eventBus.on = function (type, callback) {
  if (this.callbacks[type]) {
    this.callbacks[type].push(callback)
  } else {
    this.callbacks[type] = [callback]
  }
}

// 分发事件
eventBus.emit = function (type, data) {
  const callbacks = this.callbacks[type]
  if (callbacks && callbacks.length > 0) {
    callbacks.forEach((callback) => {
      callback(data)
    })
  }
}
// 移除事件监听
eventBus.off = function (eventName) {
  if (eventName) {
    //  如果移除事件类型有值，表示移除某种类型
    delete this.callbacks[eventName]
  } else {
    // 如果没有值，表示移除所有
    this.callbacks = {}
  }
}

eventBus.on('login', (data) => {
  console.log('add', data)
})
eventBus.on('login', (data) => {
  console.log('login2', data)
})
eventBus.on('logout', (data) => {
  console.log('logout', data)
})

setTimeout(() => {
  eventBus.emit('login', '我是用户名还有密码')
}, 2000)

setTimeout(() => {
  eventBus.off('login')
  console.log('已经取消监听login事件了，再触发login，就无效了')
  eventBus.emit('login')
}, 4000)
```

## 7、手写消息订阅与发布

### 7.1 API 说明

1. PubSub：包含所有功能的订阅/发布消息的管理者
2. PubSub.subscribe(msg, subscriber)：订阅消息：指定消息名和订阅者回调函数
3. PubSub.publish(msg, data)：异步发布消息：指定消息名和数据
4. PubSub.publishSync(msg, data)：同步发布消息：指定消息名和数据
5. PubSub.unsubscribe(flag)：取消订阅：根据标识取消某个或者某些消息的订阅

### 7.2 编码实现

```javascript
const PubSub = {}
// 保存所有回调的容器
let callbacksObj = {}
// 用于生成token的标记
let id = 0

// 订阅消息
PubSub.subscribe = function (msgName, callback) {
  const token = 'token_' + ++id
  // 取出当前消息对应的callbacks
  const callbacks = callbacksObj[msgName]
  if (!callbacks) {
    callbacksObj[msgName] = {
      [token]: callback,
    }
  } else {
    callbacks[token] = callback
  }
  // 返回 token
  return token
}
// 发布异步消息
PubSub.publish = function (msgName, data) {
  // 取出当前消息对应的callbacks
  let callbacks = callbacksObj[msgName]
  // 如果有值
  if (callbacks) {
    // 启动定时器，异步执行所有的回调函数
    setTimeout(() => {
      Object.values(callbacks).forEach((callback) => {
        callback(data)
      })
    })
  }
}
// 发布同步消息
PubSub.publishSync = function (msgName, data) {
  // 取出当前消息对应的callbacks
  const callbacks = callbacksObj[msgName]
  // 如果有值
  if (callbacks) {
    // 立即同步执行所有的回调函数
    Object.values(callbacks).forEach((callback) => {
      callback(data)
    })
  }
}
// 取消订阅消息
// 1. 没有传值，flag为 undefined
// 2. 传入 token 字符串
// 3. msgName 字符串
PubSub.unsubscribe = function (flag) {
  // 如果 flag 没有指定或者为 null, 取消所有
  if (flag === undefined) {
    callbacksObj = {}
  } else if (typeof flag === 'string') {
    if (flag.indexOf('token_') === 0) {
      // 如果 flag 是 token
      // 找到 flag 对应的 callbacks
      const callbacks = Object.values(callbacksObj).find((callbacks) =>
        callbacks.hasOwnProperty(flag)
      )
      // 如果存在，删除对应的属性
      if (callbacks) {
        delete callbacks[flag]
      }
    } else {
      // 否则就是 msgName
      delete callbacksObj[flag]
    }
  }
}

// 测试代码
const payToken1 = PubSub.subscribe('pay', (data) => {
  console.log('商家接到了订单，准备开始制作', data)
})

const payToken2 = PubSub.subscribe('pay', (data) => {
  console.log('骑手接到了订单，准备开始去取餐', data)
})

const cancelToken1 = PubSub.subscribe('cancel', (data) => {
  console.log('商家接到了取消的通知', data)
})

setTimeout(() => {
  // 发布消息
  PubSub.publish('pay', {
    title: '鱼香肉丝',
    price: 20,
    pos: '三年二班',
  })
}, 2000)

setTimeout(() => {
  PubSub.unsubscribe(payToken1)
  console.log(callbacksObj)
}, 3000)

setTimeout(() => {
  PubSub.unsubscribe('pay')
  console.log(callbacksObj)
}, 4000)
```
