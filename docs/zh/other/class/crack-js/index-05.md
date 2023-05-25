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

