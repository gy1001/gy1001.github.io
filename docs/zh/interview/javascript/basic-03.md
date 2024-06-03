# 作用域和闭包

## 1. 作用域
- 全局作用域
- 函数作用域
- 块级作用域（ES6 新增）

```javascript
// ES6块级作用域
if (true) {
  let x = 100
}
console.log(x) // 会报错
```

```javascript
let a = 0
function fn1 () {
  let a1 = 100
  function fn2 () {
    let a2 = 200
    function fn3 () {
      let a3 = 300
      return a1 + a2 + a3
    }
    fn3()
  }
  fn2()
}
fn1()
```

## 2. 自由变量
> 示例 1 中的代码就用到了自由变量

- 一个变量在当前作用域没有定义，但是被使用了
- 向上级作用域，一层一层依次寻找，直到找到为止
- 如果找到全局作用域都没有找到，则报错 `xxx is not defined`

## 3. 闭包

* 作用域应用的特殊情况，有两种表现
  - 函数作为参数被传递
  - 函数作为返回值被返回
* (注意：) 所有的自由变量的查找，是在函数定义的地方，向上级作用域查找，而不是在执行的地方

```javascript 
// 函数作为返回值
function create () {
  let a = 100
  return function () {
    console.log(a)
  }
}
let fn = create()
let a = 200
fn() // 100
```

```javascript
// 函数作为参数
function print (fn) {
  let a = 20
  fn()
}
let a = 100
function fn () {
  console.log(a)
}
print(fn) // 100
```

## 4. this 
> this 取什么值，是在函数执行时确认的，不是在函数定义的时候

- 作为普通函数调用
- 使用 call apply bind 被调用
- 作为对象方法被调用
- 在 class 方法中调用
- 箭头函数

```javascript
function fn1 () {
  console.log(this)
}
fn1() // window

fn1().call({ x: 100 }) // { x:100 }
const fn2 = fn1.bind({ x: 200 })
fn2() // { x:200 }

const zhangSan = {
  name: '张三',
  sayHi () {
    // this 即当前对象
    console.log(this)
  },
  wait () {
    setTimeout(function () {
      // this === window
      console.log(this)
    })
  }
}
zhangSan.sayHi()
zhangSan.wait()

const liSi = {
  name: '李四',
  sayHi () {
    // this 即当前对象
    console.log(this)
  },
  wait () {
    // 箭头函数中的this取的是它的上一级的作用域的 this 值
    setTimeout(() => {
      // this 即当前对象
      console.log(this)
    })
  }
}

class People {
  constructor (name) {
    this.name = name
    this.age = 20
  }
  sayHi () {
    console.log(this)
  }
}
const people = new People('张三')
people.sayHi() // people 对象
```

## 问题
### 1. this 的不同应用场景下，如何取值
- 作为普通函数调用：**指向 window**
- 使用 call apply bind 被调用: **指向传入绑定的值**
- 作为对象方法被调用：**指向对象本身**
- 在 class 方法中调用：**当前实例本身**
- 箭头函数：**上一级作用域的 this 值**

### 2. 手写 bind 函数

```javascript
Function.prototype.bind1 = function () {
  // 将参数解析为数组
  const args = Array.prototype.slice.call(arguments)
  // 获取 this（取出数组第一项，数组剩余的就是传递的参数）
  const that = args.shift()
  const self = this // 当前函数
  // 返回一个函数
  return function () {
    // 执行原函数，并返回结果
    return self.apply(that, args)
  }
}

function fn1 (a,b,c) {
  console.log(this,"this")
  console.log(a,b,c)
  return "this is fn1"
}
const fn2 = fn1.bind1({ x: 100 }, 10, 20, 30)
const res = fn2()
console.log(res)
```

### 3. 实际开发中闭包的应用场景，举例说明
- 隐藏数据
- 做一个简单的 cache 工具

```javascript
// 闭包隐藏数据，只提供 API
function createCache () {
  const data = {} // 闭包中的数据，被隐藏，不能被外界访问
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    }
  }
}
const c = createCache()
c.set('a', 100)
console.log(c.get('a'))
```
### 4. 创建 10 个 a 标签,点击的时候弹出对应的序号

```javascript
let i, a
for (i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br/>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
```
上述代码执行后，进行点击，弹出的始终是 10

```javascript
// 优化后的代码:
let a
for (let i = 0; i < 10; i++) {
  // 因为这里使用let ,就产生了一个块级作用域
  a = document.createElement('a')
  a.innerHTML = i + '<br/>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
```



<CommentService />