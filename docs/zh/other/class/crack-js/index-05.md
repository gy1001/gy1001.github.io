# 05-玩转数组高级技法

## 01：先看2个问题，再一起学习

### 批量制造数据

#### for 循环-(略low)

* 思路：for 循环，push

```javascript
function createData() {
  const data = []
  for (let i = 0; i < 1000; i++) {
    data.push({
      name: `name${i + 1}`,
    })
  }
  return data
}
const data = createData()
console.log(data)
```

#### Array.map

* 思路：创建空数组，然后 map
* 缺点：空数组，没有数据
* 理解：使用 new Array()创建的数组每一项都是 empty, 而 empty 是不参与运算的

```javascript
function createData() {
  return new Array(1000).map((v, i) => ({ name: `name${i + 1}` }))
}
const data = createData()
console.log(data) // [ <1000 empty items> ]
```

#### Array.map + fill

* 思路：创建空数组，填充 null 然后 map
* 缺点：性能变差

```javascript
function createData() {
  return new Array(1000).fill(null).map((v, i) => ({ name: `name${i + 1}` }))
}

const data = createData()
console.log(data)
```

#### Array.from（推荐）

* 思路：Array.from 第二个初始化函数返回数据
* 优点：代码整洁、高效

```javascript
function createData() {
  return Array.from({ length: 1000 }, (v, i) => ({ name: `name${i + 1}` }))
}

const data = createData()
console.log(data)
```

### 数组去重

#### Set

> ES6 的语法，那么 ES5 怎么办

```javascript
const arr1 = [1, 2, 3]
const arr2 = [3, 4, 5]

console.log(new Set([...arr1, ...arr2])) // Set(5) { 1, 2, 3, 4, 5 }
```

#### 非Set

* 思路：for 遍历，indexOf 判断是否存在

```javascript
const arr1 = [1, 2, 3]
const arr2 = [3, 4, 5]

function mergeArray(arr1, arr2) {
  // 克隆
  var arr = arr1.slice(0)
  var v
  for (let i = 0; i < arr2.length; i++) {
    v = arr2[i]
    // 这个操作，
    // 详情参见4.2位运算符的妙用：奇偶数，色值换算，换值， 编码等
    if (~arr.indexOf(v)) {
      continue
    }
    arr.push(v)
  }
  return arr
}

console.log(mergeArray(arr1, arr2)) // [ 1, 2, 3, 4, 5 ]
```

#### 非 Set 的去重 遇到 NaN 会如何 ？

```javascript
const arr1 = [1, 2, 3, NaN]
const arr2 = [3, 4, 5, NaN]

function mergeArray(arr1, arr2) {
  // 克隆
  var arr = [...arr1]
  var v
  for (let i = 0; i < arr2.length; i++) {
    v = arr2[i]
    // 这个操作，
    // 详情参见4.2位运算符的妙用：奇偶数，色值换算，换值， 编码等
    if (~arr.indexOf(v)) {
      continue
    }
    arr.push(v)
  }
  return arr
}

console.log(mergeArray(arr1, arr2))
// [ 1, 2,   3, NaN, 4, 5, NaN ]
```

#### 数组对象去重用 Set 可以吗？

> 不可以

```javascript
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
const arr2 = [{ id: 3 }, { id: 4 }, { id: 5 }]

console.log(new Set([...arr1, ...arr2]))
// 结果如下
Set(6) {
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 3 },
  { id: 4 },
  { id: 5 }
}
```

#### 数组对象引用去重用 Set 可以吗？

> 可以

```javascript
const obj3 = { id: 3 }
const arr1 = [{ id: 1 }, { id: 2 }, obj3]
const arr2 = [obj3, { id: 4 }, { id: 5 }]

console.log(new Set([...arr1, ...arr2]))
// Set(5) { { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 } }
```

#### 对象数组去重-for findIndex

* 思路：for 遍历，find | findIndex 判断是否存在
* 缺点：局限性（目前代码是根据 id 来判断）、性能消耗高（使用find | findIndex消耗高）

```javascript
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
const arr2 = [{ id: 3 }, { id: 4 }, { id: 5 }]

function mergeArray(arr1, arr2) {
  // 克隆
  var arr = arr1.slice(0)
  var v
  for (var i = 0; i < arr2.length; i++) {
    v = arr2[i]
    // 这个操作，
    // 详情参见4.2位运算符的妙用：奇偶数，色值换算，换值， 编码等
    if (~arr.findIndex((el) => el.id === v.id)) {
      continue
    }
    arr.push(v)
  }
  return arr
}

console.log(mergeArray(arr1, arr2))
// [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 } ]
```

## 02：深入浅出类数组

### 创建数组的几种方式

* 数组对象字面量
* new Array
* Array.from (ES6)
* Array.of (ES6)
* Array.prototype.slice、Array.prototype.concat 等

```javascript
// 字面量
const arr = [1, 2, 3, ...[4, 5, 6]] // 1,2,3,4,5,6
const arr1 = [, , , , ,] // [empty × 5]
console.log('arr==', arr)
console.log('arr1==', arr1)

// new Array
const arr2 = new Array(1, 2, 3) // 1,2,3
const arr3 = new Array('a') //["a"]
const arr4 = new Array(5) // [empty × 5]
console.log('arr2 new Array==', arr2)
console.log('arr3 new Array==', arr2)
console.log('arr4 new Array==', arr3)

// Array.of
const arr5 = Array.of(5) // [5]
console.log('arr5 Array.of ==', arr5)

// Array.from
const arr6 = Array.from([1, 2, 3]) // [1,2,3]
const arr7 = Array.from({ length: 3 }, function (value, index) {
  return index + 1
}) // [1,2,3]
const arr8 = Array.from({ 0: 'a', 1: 'b', 2: 'c', length: 3 }) // ["a", "b", "c"]
console.log('arr6 Array.from ==', arr6)
console.log('arr7 Array.from ==', arr7)
console.log('arr8 Array.from ==', arr8)

// Array.prototype.slice
const arr9 = Array.prototype.slice.call(document.querySelectorAll('div')) // [div, div, div....]
console.log('arr9 Array.prototype.slice ==', arr9)
// Array.prototype.concat
const arr10 = Array.prototype.concat.call([], [1, 2, 3]) // [1,2,3]
console.log('arr9 Array.prototype.concat ==', arr10)
```

### 什么是类数组

> 是有一个 length 属性和**从零开始索引的属性**，但是没有 Array 的内置方法，比如 forEach 和 map 等一种特殊对象

#### 类数组特征

* 是一个普通对象
* 必须有 length 属性，可以有非负整数索引
* 本身不具备数组所具备的方法

```javascript
const arrayLike = {
  0: 'a',
  1: 'b',
  4: '124',
  name: 'test',
  length: 3,
  push: Array.prototype.push, //自己实现
  splice: Array.prototype.splice,
}

console.log(arrayLike[0]) //"a"

// 由于类数组对象length属性声明了对象有多少个属性,所以可以使用for遍历对象属性:
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i])
}

// 非类数组
const obj = {
  0: 'a',
  1: 'b',
  2: 'c',
}
```

### 常见的类数组

#### arguments 对象

```javascript
function person(name, age, sex) {
  console.log('person arguments:', arguments)
  console.log('person type::', Object.prototype.toString.call(arguments))
}
person('name', 'age', 'sex')
```

#### DOM

* NodeList, HTMLCollection, DOMTokenList 等

```javascript
//Dom 方法的返回结果
var domList = document.querySelectorAll('.s-center-box')
console.log('querySelectorAll type::', Object.prototype.toString.call(domList))
```

#### 奇特-字符串

* 字符串：具备类数组的所有特性，**但是类数组一般是指对象**

```javascript
// 字符串
var str = 'abc'
console.log(Array.from(str))
```

### 类数组和数组的区别

| 方法          | 数组              | 类数组             |
| ------------- | ----------------- | ------------------ |
| toString 返回 | [object Array]    | [object Object]    |
| instanceof    | Array             | Object             |
| constructor   | [Fucntion: Array] | [Fcuntion: Object] |
| Array.isArray | true              | false              |

```javascript
function person(name, age, sex) {
  console.log('类数组 type::', Object.prototype.toString.call(arguments))
  console.log('类数组 instanceof object::', arguments instanceof Object)
  console.log('类数组 constructor::', arguments.constructor)
  console.log('类数组 isArray::', Array.isArray(arguments))
}
person('name', 'age', 'sex')

const array = ['name', 'age', 'sex']
console.log('数组 type::', Object.prototype.toString.call(array))
console.log('数组 instanceof array::', array instanceof Array)
console.log('数组 constructor::', array.constructor)
console.log('数组 isArray::', Array.isArray(array))
// 结果如下
类数组 type:: [object Arguments]
类数组 instanceof object:: true
类数组 constructor:: [Function: Object]
类数组 isArray:: false

数组 type:: [object Array]
数组 instanceof array:: true
数组 constructor:: [Function: Array]
数组 isArray:: true
```

### 代码判断类数组

```javascript
//使用 isFinite() 在检测无穷数：
function isArrayLikeObject(arr) {
  const typeStr = typeof arr
  // if (typeStr === 'string') {
  //     return true
  // }
  if (arr == null || typeStr !== 'object') return false

  const lengthMaxValue = Math.pow(2, 53) - 1
  if (!Object.prototype.hasOwnProperty.call(arr, 'length')) return false
  if (typeof arr.length != 'number') return false
  if (!isFinite(arr.length)) return false
  if (Array === arr.constructor) return false

  if (arr.length >= 0 && arr.length < lengthMaxValue) {
    return true
  } else {
    return false
  }
}

console.log('arr==', isArrayLikeObject(null))

const arr = { 0: 1, 2: 3, length: 2 }
console.log('arr==', isArrayLikeObject(arr))

const arr1 = { 0: 1, 2: 3, length: '' }
console.log('arr==', isArrayLikeObject(arr1))

const arr2 = { 0: 1, 2: 3 }
console.log('arr==', isArrayLikeObject(arr2))

const arr3 = [1, 2]
console.log('arr==', isArrayLikeObject(arr3))

// 结果如下
arr== false
arr== true
arr== false
arr== false
arr== false
```

### 类数组转换为数组

#### Array.prototype.slice、concat等

#### Array.from

#### Array.applay

#### 复制遍历

```javascript
// Array.prototype.slice、concat等
// 类数组
const arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
}
const array1 = Array.prototype.slice.call(arrayLikeObj)
console.log(array1) // [ 1, 2 ]

const array2 = Array.prototype.concat.apply([], arrayLikeObj)
console.log(array2) // [ 1, 2 ]
```

```javascript
// Array.from
// 类数组
const arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
}
console.log(Array.from(arrayLikeObj)) // [1,2]

const str = 'abc'
console.log(Array.from(str)) // [ 'a', 'b', 'c' ]
```

```javascript
// Array.apply
var arrayLike = {
  length: 2,
  0: 1,
}

console.log(Array.apply(null, arrayLike)) 
// [ 1, undefined ]
```

```javascript
// 遍历复制
var arr = []
var arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
}

for (let i = 0; i < arrayLikeObj.length; i++) {
  arr[i] = arrayLikeObj[i]
}

console.log(arr) //  [1, 2]
```

```javascript
// Symbol.iterator
// 借用其他数组的Symbol.iterator
var arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
  [Symbol.iterator]: [][Symbol.iterator],
}
console.log([...arrayLikeObj]) // [1,2]

// 自己实现一个 Symbol.iterator

var arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        if (index < self.length) {
          return {
            value: self[index++],
            done: false,
          }
        }
        return { value: undefined, done: true }
      },
    }
  },
}

console.log([...arrayLikeObj]) // [1, 2]
```

### 总结

| 方法/特征     | 数组             | 类数组            |
| ------------- | ---------------- | ----------------- |
| 自带方法      | 多个方法         | 五                |
| length 属性   | 有               | 有                |
| toString 返回 | [object Array]   | [object Object]   |
| instanceof    | Array            | Object            |
| constructor   | [Function Array] | [Function Object] |
| Array.isArray | true             | false             |

## 03: 数组方法使用注意事项

### 各个数组的长度是多少

```javascript
const arr1 = [1]
const arr2 = [1, ,]
const arr3 = new Array('10')
const arr4 = new Array(10)

console.log('arr1 length: ' + arr1.length)
console.log('arr2 length: ' + arr2.length)
console.log('arr3 length: ' + arr3.length)
console.log('arr4 length: ' + arr4.length)

// 结果如下 
arr1 length: 1
arr2 length: 2
arr3 length: 1
arr4 length: 10
```

### 数组空元素 empty

* empty: 数组的空位，指数组的某一位置没有任何值。简单来说，就是数组上没有对应的属性
* 一般的遍历，自动跳过空位，forEach reduce 等

```javascript
const arr2 = [1, ,]

console.log('arr2', arr2)
// arr2 [ 1, <1 empty item> ]
```

#### 基于值进行运算，空位的值作为 undefined

* find findIndex includes等，indexOf 除外
* 被作为迭代的时候，参与 Object.entries、扩展运算符、for.of 等

```javascript
const arr = [1, ,]
console.log('arr:', arr) 
// arr: [ 1, <1 empty item> ]

// 长度
console.log('arr.length:', arr.length)
// arr.length: 2

// 键
console.log('keys', Object.keys(arr))
// keys [ '0' ]

// empty 空位的值为undefined
console.log('0:', arr[0], ',1:', arr[1])
// 0: 1 ,1: undefined

// 怎么判断空位
console.log('hasOwn:0', Object.prototype.hasOwnProperty.call(arr, '1'))
// hasOwn:0 false

console.log('hasOwn:1', Object.prototype.hasOwnProperty.call(arr, '1'))
// hasOwn:1 false
```

#### Join 和 toString，空位怎么处理

> toString 会调用内部 join 方法

* 视为空字符串

```javascript
const arr = [1, , 3]

// 基于键遍历
arr.forEach(function (v, index) {
  console.log('forEach:', v)
})

// 基于值运算
const index = arr.findIndex((v) => v === undefined)
// forEach: 1
// forEach: 3

console.log('findIndex:', index)
// findIndex: 1

console.log('join:', arr.toString())
// join: 1,,3
```

### 稀疏数组

* 有空元素的数组，就是稀疏数组

#### 如何避免创建稀疏数组

* Array.appy(null, Array(3))
* [...new Array(3)]
* Array.from(new Array(3))

### 数组不会自动添加分号

* (, [, +, -, /, 其作为一行代码的开头，很可能产生意外的情况，所以，没事代码最后写个分号，保准没错

```javascript
const objA = { a: 1 }['a']
console.log(objA) // 1

const objB = ['a']['a']
console.log(objB) // undefined


var a = [[1, 2], 2, 3]
console.log(a) // [ [ 1, 2 ], 2, 3 ]
;[0, 2, 3].map((v) => console.log(v * v)) // 去掉分号就回报异常
console.log(a) // 0 4 9 

// =>
// var a = [[1,2],2,3]
// console.log(a);
// [0,2,3].map(v=> console.log(v*v))
// console.log(a)
```

### indexOf 与 includes

| 方法     | 返回值  | 是否能查找NaN | [...] | undefined |
| -------- | ------- | ------------- | ----- | --------- |
| indexOf  | number  | 否            | 否    | 可        |
| includes | boolean | 可            | 可    | 可        |

```javascript
const array1 = [NaN]
console.log('array.includes NaN:', array1.includes(NaN))
console.log('array.indexOf NaN:', array1.indexOf(NaN) > -1)

const array2 = [1, ,]
console.log('array.includes ,,:', array2.includes(undefined))
console.log('array.indexOf ,,:', array2.indexOf(undefined) > -1)

const array3 = [undefined]
console.log('array.includes undefined:', array3.includes(undefined))
console.log('array.indexOf undefined:', array3.indexOf(undefined) > -1)

// 运行结果如下
array.includes NaN: true
array.indexOf NaN: false
array.includes ,,: true
array.indexOf ,,: false
array.includes undefined: true
array.indexOf undefined: true
```

### 数组可变长度问题

* length 代表数组中元素个数，数组额外附加属性不计算在内
* length 可写，可以通过修改 length 改变数组的长度
* 数组操作不存在越界，找不到下标，返回 undefined

```javascript
const array = [1, 2, 3, 4, 5, 6]
array[10] = 10
console.log('array.length:', array.length)

array['test'] = 11
console.log('array.length:', array.length)

array.length = 3
console.log('array.length:', array.length)

console.log('array.length:', array.length)
console.log('array value:', array[Number.MAX_VALUE + 1000])

// 打印如下
array.length: 11
array.length: 11
array.length: 3
array.length: 3
array value: undefined
```

### 数组查找或者过滤

| 方法      | 返回结果类型        | 是否短路操作 | 是否全部满足 | 遍历空元素 |
| --------- | ------------------- | ------------ | ------------ | ---------- |
| some      | boolean             | 可           | 不可         | 不可       |
| find      | undefined \| object | 可           | 不可         | 可         |
| findIndex | numebr              | 可           | 不可         | 可         |
| every     | boolean             | 可           | 可           | 不可       |
| filter    | array               | 不可         | 不可         | 不可       |

```javascript
const array = [
  { name: '张三', age: 15 },
  ,
  { name: '李四', age: 25 },
  { name: '王五', age: 36 },
]

//some
const isExist = array.some((item, index, arr) => {
  console.log('some index:', index)
  return item && item.age > 24
})
console.log('array some:', isExist)

//find
const item = array.find((item, index, arr) => {
  console.log('find index:', index)
  return item && item.age > 24
})
console.log('array find:', item)

//findIndex
const index = array.findIndex((item, index, arr) => {
  console.log('findIndex index:', index)
  return item && item.age > 24
})
console.log('array findIndex:', index)

//every
const isAll = array.every((item, index, arr) => {
  console.log('every index:', index)
  return item && item.age > 15
})
console.log('array every:', isAll)

const result = array.filter((item, index, arr) => {
  console.log('filter index:', index)
  return item && item && item.age > 24
})
console.log('array filter:', result)
```

### 改变自身的方法

* pop、shift、splice 
* unshift、push、sort、reverse
* ES6: copyWithin、fill

```javascript
let array = [1, 2, 3, 4, 5, 6, 7]

array.pop()
console.log('array pop:', array)

array.shift()
console.log('array shift:', array)

array.unshift('unshift')
console.log('array unshift:', array)

array.push('push')
console.log('array push:', array)

array.reverse()
console.log('array reverse:', array)

array.sort()
console.log('array sort:', array)

array.splice(2, 1)
console.log('array splice:', array)

array.copyWithin(2, 0)
console.log('array copyWithin:', array)

array.fill('fill', 3)
console.log('array fill:', array)
```

### sort 注意事项

* 默认按照 ASII 码先后书写顺序排序（10排在2前面）

```javascript
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
array.sort()
console.log('array sort:', array)
// array sort: [ 1, 10, 2, 3, 4, 5,  6, 7, 8, 9 ]
console.log('10:'.charCodeAt()) // 49
console.log('1:'.charCodeAt()) // 49
```

### 数组操作非线性存储问题

* 数组默认存储为线性存储
* 存储结构改变必然产生不必要代价，我们尽量线性增加

```html
// 以下代码会破坏 数组的线性存储
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
		class MyArray extends Array {
			constructor() {
				super(...arguments)
			}
		};
		var myArray = new MyArray()
		myArray[0] = "1"
		myArray[1] = "1"
		myArray[2] = "1"
		myArray[3] = "1"
		myArray[4] = "1"
		myArray[5] = "1"
		myArray[6] = "1"
		myArray[7] = "1"
		myArray[8] = "1"
		myArray[9] = "1"
		myArray[10] = "1"
		myArray[11] = "1"
		console.log(myArray)
		function operation() {
			myArray[10000] = "1"
			console.log("myArray[10000]:", myArray)
		}

	</script>
	<button onclick="operation()">操作</button>
</body>
</html>
```

运行代码至浏览器中，可以看到如下操作前的快照如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11c0a6a47ffb450b8bc7249e1d50d487~tplv-k3u1fbpfcp-watermark.image?)

点击操作按钮后，快照如下（顺序已经被打乱了）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80f110596b4342be9c6d81fdba9d65db~tplv-k3u1fbpfcp-watermark.image?)

### delete 误区

* delete 删除数组元素，后面元素不会补齐，delete 删除引用

```javascript
const array = [1, 2, 3, 4, 5]
delete array[2]
console.log('delete array:', array)
// delete array: [ 1, 2, <1 empty item>, 4, 5 ]
```

### push VS concat

* concat 会返回新的数组，而 push 不会
* concat 数据量大时候更加消耗性能，所以推荐使用 push

```javascript
const count = 10000
const array1 = [1, 2, 4, 5, 6]

let newArray = []

console.time('push')
for (let i = 0; i < count; i++) {
  newArray.push(array1[0], array1[1], array1[2], array1[3], array1[4])
}
console.timeEnd('push')

console.time('concat')
for (let i = 0; i < count; i++) {
  newArray = newArray.concat(
    array1[0],
    array1[1],
    array1[2],
    array1[3],
    array1[4],
  )
}
console.timeEnd('concat')
// 结果如下: 性能差异很大啊
push: 4.615ms
concat: 7.116s
```

## 04：数组高级用法（上）

### 万能数据生成器

```javascript
const createValues = (creator, length = 10) => Array.from({ length }, creator)
```

#### 随机数生成器

```javascript
const createRandomValues = (len) => createValues(Math.random, len)
const values = createRandomValues()
console.log('values:', values.length, values)
```

#### 序列生成器

```javascript
const createValues = (creator, length = 10) => Array.from({ length }, creator)

const createRange = (start, stop, step) => createValues((_, i) => start + i * step, (stop - start) / step + 1)
const values = createRange(1, 100, 3)
console.log(values)
// [ 1,  4,  7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88, 91, 94, 97, 100 ]
```

#### 数据生成器

```javascript
const createValues = (creator, length = 10) => Array.from({ length }, creator)

function createUser(v, index) {
  return {
    name: `user-${index}`,
    age: (Math.random() * 100) >> 0,
  }
}
const users = createValues(createUser, 1000)
console.log('users:', users)
```

### 清空数组

* Array.prototype.splice(0)
* Array.prototype.length = 0

```javascript
const arr = [1, 2, 3]
arr.splice(0)
console.log('splice:', arr)

const arr1 = [1, 2, 3]
arr1.length = 0
console.log('length:', arr1)

// 结果如下
splice: []
length: []
```

### 数组去重

* Array.from(new Set(arr))
* 问题：对于属性健和属性值都相同的对象没有作用
* Array.prototype.filter + key 唯一
  * 问题：如何确保 key 唯一

```javascript
// Set 去重
const arr = [
  'apple',
  'banana',
  1,
  1,
  3,
  3,
  undefined,
  undefined,
  ,
  ,
  NaN,
  NaN,
  null,
  null,
  'true',
  true,
  { a: 1 },
]

const arr1 = Array.from(new Set(arr))
console.log('set:', arr1)

// 结果如下
set: [ 'apple', 'banana', 1, 3, undefined, NaN, null, 'true', true, { a: 1 } ]
```

```javascript
// Set 去重2
function uniqueArray(arr) {
  return Array.from(new Set(arr))
}

const arr = [{ a: 1 }, { a: 1 }]
console.log('set 不同引用：', uniqueArray(arr))

const obj1 = { a: 1 }
const arr2 = [obj1, obj1]
console.log('set 同一引用：', uniqueArray(arr2))

// 结果如下
set 不同引用： [ { a: 1 }, { a: 1 } ]
set 同一引用： [ { a: 1 } ]
```

```javascript
// 数组去重
function uniqueArray(arr = [], key) {
  const keyValues = new Set()
  let val
  return arr.filter((obj) => {
    val = obj[key]
    if (keyValues.has(val)) {
      return false
    }
    keyValues.add(val)
    return true
  })
}

var arr = [{ a: 1 }, { a: 1 }, { a: 2 }]
console.log('filter 去重：', uniqueArray(arr, 'a'))
// filter 去重： [ { a: 1 }, { a: 2 } ]
```

### 求交集

* Arry.prototype.filter + includes 判断
* 问题：
  * 引用类型相同的判断
  * 性能问题
* 引用类型：Array.prototype.forEach + Map + key 唯一
* 基础数据：Array.prototype.forEach + Map + filter

```javascript
// 别人的代码:Arry.prototype.filter + includes 
const arr1 = [0, 1, 2]
const arr2 = [3, 2, 0]

function intersectSet(arr1, arr2) {
  return [...new Set(arr1)].filter((item) => arr2.includes(item))
}
const values = intersectSet(arr1, arr2)
console.log(values) // [ 0, 2 ]
```

```javascript
// 优化
// 引用类型
function intersect(arr1, arr2, key) {
  const map = new Map()
  arr1.forEach((val) => map.set(val[key]))

  return arr2.filter((val) => {
    return map.has(val[key])
  })
}

// 原始数据类型
function intersectBase(arr1, arr2) {
  const map = new Map()
  arr1.forEach((val) => map.set(val))

  return arr2.filter((val) => {
    return map.has(val)
  })
}

var arr1 = [{ p: 0 }, { p: 1 }, { p: 2 }]
var arr2 = [{ p: 3 }, { p: 2 }, { p: 1 }]
const result = intersect(arr1, arr2, 'p')
console.log('result:', result)

const arr3 = [0, 1, 2]
const arr4 = [3, 2, 0]
const result1 = intersectBase(arr3, arr4)
console.log('result1:', result1)

// 结果如下：
result: [ { p: 2 }, { p: 1 } ]
result1: [ 2, 0 ]
```

### 求交集性能对比

| 数组长度 | intersectSet(ms) | intersecBase(ms) |
| -------- | ---------------- | ---------------- |
| 1000     | 0.714            | 0.231            |
| 10000    | 58.058           | 2.106            |
| 100000   | 5221.376         | 24215            |

```javascript
function intersectSet(arr1, arr2) {
  return [...new Set(arr1)].filter((item) => arr2.includes(item))
}

// 原始数据类型
function intersectMap(arr1, arr2) {
  const map = new Map()
  arr1.forEach((val) => map.set(val))

  return arr2.filter((val) => {
    return map.has(val)
  })
}

function createData(length) {
  return Array.from({ length }, (val, i) => {
    return ~~(Math.random() * length)
  })
}

console.time('createData')
var data1 = createData(100000)
var data2 = createData(100000)
console.timeEnd('createData')

console.time('intersectSet')
intersectSet(data1, data2)
console.timeEnd('intersectSet')

console.time('intersectBase')
intersectMap(data1, data2)
console.timeEnd('intersectBase')

// 结果如下
createData: 24.611ms
intersectSet: 4.741s
intersectBase: 21.625ms
```

### 求差集

* 与求交集类似

```javascript
// 引用类型
function difference(arr1, arr2, key) {
  const map = new Map()
  arr1.forEach((val) => map.set(val[key]))

  return arr2.filter((val) => {
    return !map.has(val[key])
  })
}

// 原始数据类型
function differenceBase(arr1, arr2) {
  const map = new Map()
  arr1.forEach((val) => map.set(val))

  return arr2.filter((val) => {
    return !map.has(val)
  })
}

var arr1 = [{ p: 0 }, { p: 1 }, { p: 2 }]
var arr2 = [{ p: 3 }, { p: 2 }, { p: 1 }]
const result = difference(arr1, arr2, 'p')
console.log('result:', result)

const arr3 = [0, 1, 2]
const arr4 = [3, 2, 0]
const result1 = differenceBase(arr3, arr4)
console.log('result1:', result1)

// 结果如下
result: [ { p: 3 } ]
result1: [ 3 ]
```

### 从数组中删除虚值

> 虚值：就是那个转换为布尔值为false的值

* Array.prototype.filter(Boolean)

```javascript
const array = [false, 0, undefined, , '', NaN, 9, true, undefined, null, 'test']
const newArray = array.filter(Boolean)
console.log(newArray) // [ 9, true, 'test' ]
```

### 获取数组中的最大值和最小值

* Math.max.apply(Math, numArray)
* Math.min.apply(Math, numArray)

```javascript
const numArray = [1, 3, 8, 666, 22, 9982, 11, 0]
const max = Math.max.apply(Math, numArray)
const min = Math.min.apply(Math, numArray)
console.log('max:', max + ',min:' + min)
// max: 9982, min:0
```

```javascript
const createValues = (creator, length = 10) => Array.from({ length }, creator)

function createUser(v, index) {
  return {
    name: `user-${index}`,
    age: (Math.random() * 100) >> 0,
  }
}

const users = createValues(createUser, 10)
const ages = users.map((u) => u.age)

const max = Math.max.apply(Math, ages)
const min = Math.min.apply(Math, ages)
console.log(ages)
console.log('max:', max + ',min:' + min)

```

### 05：数组高级用法（下）

### queryString

#### 什么是 queryString

* 作用：页面传递参数
* 规律：地址 url 问号？拼接的键值对

#### 现代 Web API 查询 queryString

* URLSearchParams

* URL

  > urlObj.searchParams instanceof URLSearchParams // true

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URLSearchParams</title>
</head>

<body>
  <script>
    const urlSP = new URLSearchParams(location.search)
    function getQueryString(key) {
      return urlSP.get(key)
    }
    console.log("words:", getQueryString("words"))  // vue
    console.log("wordss:", getQueryString("wordss"))  // null
  </script>
</body>

</html>
```

```html
// URL
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL</title>
</head>

<body>
  <script>
    const urlObj = new URL(location.href)
    function getQueryString(key) {
      return urlObj.searchParams.get(key)
    }

    console.log("words:", getQueryString("words")) // vue
    console.log("wordss:", getQueryString("wordss")) // null
  </script>
</body>

</html>
```

```html
// 使用 reduce
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>reduce</title>
</head>
<body>
  <script>
    const urtObj = location.search.slice(1)
      .split("&")
      .filter(Boolean)
      .reduce(function (obj, cur) {
        var arr = cur.split("=")
        if (arr.length != 2) {
          return obj
        }
        obj[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1])
        return obj
      }, {})

    function getQueryString(key) {
      return urtObj[key]
    }
    console.log("words:", getQueryString("words")) // vue
    console.log("wordss:", getQueryString("wordss")) // null

  </script>
</body>
</html>
```
