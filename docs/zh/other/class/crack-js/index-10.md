# 10-爱上异步编程

## 01：异步编程有哪些问题以及方案

### 同步和异步

* 同步：执行某个任务时，没有得到结果之前，不会继续后续的操作

* 异步：一个异步任务执行后，没有得到结果之前，就可以继续执行后续操作。异步任务完成后，一般通过回调通知调用者。比如 `setTimeout`、`fetch`、`XMLHttpRequest` 请求等等

  ```javascript
  setTimeout(function () {
    console.log('inner message')
  }, 300)
  console.log('outer message')
  ```

  ```javascript
  function loadAsset(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function () {
      callback(xhr.response)
    }
    xhr.send()
  }
  loadAsset('//', function (res) {
    console.log('res:', res)
  })
  ```

### 回调函数-callback

```javascript
function login(callback) {
  setTimeout(() => {
    callback('token')
  }, 3000)
}

function getOrderId(token, callback) {
  if (token) {
    setTimeout(() => {
      callback('orderId')
    }, 2000)
  }
}

function orderDetails(orderId, callback) {
  if (orderId) {
    setTimeout(() => {
      callback('淘宝订单：购买xxx书一本')
    }, 1500)
  }
}

login((token) => {
  getOrderId(token, (orderId) => {
    orderDetails(orderId, (orderInfo) => {
      console.log(orderInfo)
    })
  })
})
```

### 回调函数-callback 异常时如何处理

```javascript
try {
  login((token) => {
    throw new Error('orderList')
    getOrderId(token, (orderId) => {
      orderDetails(orderId, (orderInfo) => {
        console.log(orderInfo)
      })
    })
  })
} catch (e) {
  console.log('try catch error:', e)
}
```

### 回调函数-callback 缺点

* 回调地狱
* 高度耦合
* 不易维护
* 不能直接 return 

### 事件驱动

* 异步任务的执行，取决于事件的驱动

  ```html
  <script>
    window.addEventListener('orderDetails-over', (e) => {
      console.log(e.detail)
    })
    login()
  </script>
  ```

#### 完整代码示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./login.js"></script>
    <script src="./getOrderId.js"></script>
    <script src="./orderDetails.js"></script>
  </head>
  <body>
    <script>
      window.addEventListener('orderDetails-over', (e) => {
        console.log(e.detail)
      })
      login()
    </script>
  </body>
</html>
```

```javascript
// login.js
let loginEvent = new CustomEvent('login-over', {
  detail: 'token',
})

function login() {
  setTimeout(() => {
    window.dispatchEvent(loginEvent)
  }, 3000)
}
```

```javascript
// getOrderId.js
const orderIdEvent = new CustomEvent('orderId-over', {
  detail: 'orderId',
})

function getOrderId(token) {
  if (token) {
    setTimeout(() => {
      window.dispatchEvent(orderIdEvent)
    }, 2000)
  }
}

function tokenListener(ev) {
  getOrderId(ev.detail)
}
//在window 上添加监听事件
window.addEventListener('login-over', tokenListener)
```

```javascript
// orderDetails.js
const orderDetailsEvent = new CustomEvent('orderDetails-over', {
  detail: '淘宝订单：购买xxx书一本',
})

function orderDetails(orderId) {
  if (orderId) {
    setTimeout(() => {
      window.dispatchEvent(orderDetailsEvent)
    }, 1500)
  }
}

function orderIdListener(ev) {
  orderDetails(ev.detail)
}

//在window 上添加监听事件
window.addEventListener('orderId-over', orderIdListener)
```

### 事件驱动-优缺点

#### 优点

* 去耦合
* 便于实现模块化

#### 缺点

* 运行过程不流畅
* 阅读代码困难

### 发布订阅

* 也是使用事件驱动，但是有一个消息中心，可以查看消息流转

#### 完成代码示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./start.js" type="module"></script>
    <script src="./getOrderId.js" type="module"></script>
    <script src="./orderDetails.js" type="module"></script>
  </head>

  <body>
    发布订阅模式
    <script>
      window.onload = function () {
        if (window.login) {
          window.login()
        }
      }
    </script>
  </body>
</html>
```

```javascript
// MsgCenter.js
/**
 * 消息中心
 * @class MsgCenter
 */
class MsgCenter {
  constructor() {
    this.listeners = {}
  }

  /**
   * 订阅
   * @memberOf MsgCenter
   */
  subscribe(type, listener) {
    if (this.listeners[type] === undefined) {
      this.listeners[type] = []
    }
    this.listeners[type].push(listener)
    console.log(`${type}消息订阅数：${this.listeners[type].length}`)
    return listener
  }

  /**
   * 发送
   * @memberOf MsgCenter
   */
  dispatch(type, args = {}) {
    if (!type) {
      throw new Error("Event object missing 'type' property.")
    }
    if (this.listeners[type] instanceof Array) {
      const listeners = this.listeners[type]
      for (let j = 0; j < listeners.length; j++) {
        listeners[j].call(this, type, args)
      }
    }
  }

  /**
   * 取消订阅
   * @memberOf MsgCenter
   */
  unSubscribe(type, listener) {
    if (this.listeners[type] instanceof Array) {
      const listeners = this.listeners[type]
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1)
          break
        }
      }
      console.log(`${type}消息订阅数：${this.listeners[type].length}`)
    }
  }

  /**
   * 获取某种消息所有订阅
   * @param {any} type
   * @returns
   *
   * @memberOf MsgCenter
   */
  getTypeSubscribe(type) {
    return this.listeners[type] || []
  }

  /**
   * 销毁
   * @memberOf MsgCenter
   */
  destroy() {
    this.listeners = null
  }
}

const MyMsgCenter = new MsgCenter()
export default MyMsgCenter
```

```javascript
// login.js
import MyMsgCenter from './MsgCenter.js'

export function login() {
  setTimeout(() => {
    MyMsgCenter.dispatch('login-over', { detail: 'token' })
  }, 3000)
}
```

```javascript
// start.js
import { login } from './login.js'
import MyMsgCenter from './MsgCenter.js'

function resultListener(type, ev) {
  console.log('收到结果：', ev.detail)
  MyMsgCenter.unSubscribe(type, resultListener)
}

MyMsgCenter.subscribe('orderDetails-over', resultListener)

window.login = login
```

```javascript
// getOrderId.js
import MyMsgCenter from './MsgCenter.js'

function getOrderId(token) {
  if (token) {
    setTimeout(() => {
      MyMsgCenter.dispatch('orderId-over', { detail: 'orderId' })
    }, 2000)
  }
}

function tokenListener(type, ev) {
  getOrderId(ev.detail)
  MyMsgCenter.unSubscribe(type, tokenListener)
}

MyMsgCenter.subscribe('login-over', tokenListener)
```

```javascript
// orderDetails.js
import MyMsgCenter from './MsgCenter.js'

function orderDetails(orderId) {
  if (orderId) {
    setTimeout(() => {
      MyMsgCenter.dispatch('orderDetails-over', {
        detail: '淘宝订单：购买xxx书一本',
      })
    }, 1500)
  }
}

function orderIdListener(type, ev) {
  orderDetails(ev.detail)
  MyMsgCenter.unSubscribe(type, orderIdListener)
}

MyMsgCenter.subscribe('orderId-over', orderIdListener)
```

### Promise

* 拉平回调函数，把回调嵌套变为链式调用

  ```javascript
  function login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('token')
      }, 3000)
    })
  }
  
  function getOrderId(token) {
    return new Promise((resolve, reject) => {
      if (token) {
        setTimeout(() => {
          resolve('orderId')
        }, 2000)
      }
    })
  }
  
  function orderDetails(orderId) {
    return new Promise((resolve, reject) => {
      if (orderId) {
        setTimeout(() => {
          resolve('淘宝订单：购买xxx书一本')
        }, 1500)
      }
    })
  }
  
  login()
    .then(getOrderId)
    .then(orderDetails)
    .then((result) => {
      console.log(result)
    })
  
  //还可以这样写
  // const resultPromise=login().then(getOrderId).then(orderDetails);
  
  // resultPromise.then((result)=>{
  //     console.log(result);
  // })
  ```

### Promise-优缺点

#### 优点

* 链式调用，流程清晰

#### 缺点

* 代码冗余，不够简洁
* 无法取消 promise
* 错误需要通过回调函数捕获

### Generator 

* generator 最大特点就是可以控制函数执行

```javascript
function* execute() {
  const token = yield login()
  const orderId = yield getOrderId(token)
  const orderInfo = yield orderDetails(orderId)
}

let g = execute()

let { value, done } = g.next()

value.then((token) => {
  console.log('token==', token)
  let { value, done } = g.next(token)
  value.then((orderId) => {
    console.log('orderId==', orderId)
    let { value, done } = g.next(orderId)
    value.then((orderInfo) => {
      console.log('orderInfo==', orderInfo)
    })
  })
})

function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('token')
    }, 3000)
  })
}

function getOrderId(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      setTimeout(() => {
        resolve('orderId')
      }, 2000)
    }
  })
}

function orderDetails(orderId) {
  return new Promise((resolve, reject) => {
    if (orderId) {
      setTimeout(() => {
        resolve('淘宝订单：购买xxx书一本')
      }, 1500)
    }
  })
}
```

### Generator-优缺点

#### 优点

* 可以控制函数执行

#### 缺点

* 执行时机太过麻烦

### 异步终极方案-async+await

* async 函数是 Generator 函数的语法糖

  ```javascript
  function login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('token')
      }, 3000)
    })
  }
  
  function getOrderId(token) {
    return new Promise((resolve, reject) => {
      if (token) {
        setTimeout(() => {
          resolve('orderId')
        }, 2000)
      }
    })
  }
  
  function orderDetails(orderId) {
    return new Promise((resolve, reject) => {
      if (orderId) {
        setTimeout(() => {
          resolve('淘宝订单：购买xxx书一本')
        }, 1500)
      }
    })
  }
  
  async function execute() {
    const token = await login()
    const orderId = await getOrderId(token)
    const orderInfo = await orderDetails(orderId)
    console.log(orderInfo)
  }
  
  execute()
  ```

### async+await 优缺点

#### 优点

* 内置执行器
* 语义更好

#### 缺点

* 函数声明 async 蝴蝶效应（一处await 处处 await）

### 异步方案总结

* 异步编程进化史: callback => promise => generator => Async + await
* Promise 最大贡献就是统一了 JavaScript 异步编程规范(Generator, Async/await)

## 02: 理解现代异步编程的核心Promise

### Promise 三种状态

> 只能是单向的转换，pendding => fulfilled 或者 pendding => rejected

* pendding(待定)：初始状态，既没有兑现，也没有被拒绝
* fulfilled(已兑现)：意味着操作成功
* rejected(已拒绝)：意味着操作失败

### ES6 Promise API

#### Promise 静态方法

* all(ES2015): 全部 promise 执行成功，或者任意一个执行失败
* allSettled(ES2020): 执行多个 Promise，不论成功失败，结果全部返回
* any(ES2021): 接受一个Promise集合，返回第一个成功者
* race(ES2015): Promise 集合中，返回最快的 Promise 触发结果
* resolve: 返回一个解析过参数的 Promise 对象
* reject：返回一个状态为失败的 Promise 对象

#### Promise 原型方法

* prototype.then: 返回一个Promise,两个参数，成功和失败后的回调函数
* prototype.catch: 返回一个Promise,并处理被拒绝的情况
* prototype.finally: 返回一个Promise，在 Promise 结束时，无论成功或者失败，都执行回调

### Promise 高级用法-延迟函数

#### 不使用 Promise 时候的处理方式

```javascript
/**
 * @param {any} fn 需要延迟的方法
 * @param {any} delay 延迟时间
 * @param {any} context 上下文
 * @returns
 */
function delay(fn, delay, context) {
  let defaultDelay = delay || 5000
  let ticket
  return {
    run(...args) {
      ticket = setTimeout(async () => {
        fn.apply(context, args)
      }, defaultDelay)
    },
    cancel: () => {
      clearTimeout(ticket)
    },
  }
}

const { run, cancel } = delay(() => {
  console.log('111')
}, 3000)

run()

setTimeout(() => {
  cancel()
}, 1000)
```

#### 使用 Promise 处理

```javascript
function isFunction(fn) {
  return typeof fn === 'function' || fn instanceof Function
}

/**
 * @param {any} fn 需要延迟的方法
 * @param {any} delay 延迟时间
 * @param {any} context 上下文
 * @returns
 */
function delay(fn, delay, context) {
  let defaultDelay = delay || 5000
  if (!isFunction(fn)) {
    return {
      run: () => Promise.resolve(),
      cancel: noop,
    }
  }
  let ticket
  let executed = false
  return {
    run(...args) {
      return new Promise((resolve, reject) => {
        if (executed === true) {
          return
        }
        executed = true
        ticket = setTimeout(async () => {
          try {
            const res = await fn.apply(context, args)
            resolve(res)
          } catch (err) {
            reject(err)
          } finally {
            clearTimeout(ticket)
          }
        }, defaultDelay)
      })
    },
    cancel: () => {
      clearTimeout(ticket)
    },
  }
}

//测试

const { run, cancel } = delay(() => {
  return '函数执行结果'
}, 3000)

run().then((result) => {
  console.log('result:', result)
})

run().then(() => {
  console.log('多次调用run result:', result)
})
```

### 使用 Promise 重试多次

```javascript
function isFunction(fn) {
  return typeof fn === 'function' || fn instanceof Function
}

function retry(fun, count, assert = () => false) {
  if (!isFunction(fun)) {
    return Promise.resolve()
  }
  return new Promise(async (resolve, reject) => {
    let error = null //错误值
    for (let tryCount = 1; tryCount <= count; tryCount++) {
      try {
        const value = await fun(tryCount)
        if (assert(value, tryCount)) {
          return resolve(value)
        }
      } catch (e) {
        error = e
      }
    }
    reject(new Error('多次尝试失败'))
  })
}

// retry(()=>{
//     throw new Error("错误")
// },3).catch((e)=>{
//     console.log("捕获到错误：",e)
// });

let index = 0

function createPromise(tryCount) {
  console.log('尝试次数:', tryCount)
  return new Promise((resolve, reject) => {
    index++
    setTimeout(() => {
      resolve(index)
    }, 1000)
  })
}

retry(createPromise, 10, (res) => {
  return res == 5
})
  .then((res) => {
    console.log('当前的数据:', res)
  })
  .catch((e) => {
    console.log('捕获到错误：', e)
  })
```

### Promise 高级用法-其他工具库

* promise-fun: 基于 promise 封装了很多花样的工具库

### 注意事项：异常捕获-catch

```javascript
Promise.resolve('success')
  .then((res) => {
    console.log('res1:', res)
    throw new Error('then error')
    return 'fail'
  })
  .then((res) => {
    console.log('res2:', res)
  })
  .catch((e) => {
    console.log('捕获到Promise 错误:', e)
  })
```

### 注意事项-异常捕获-监听 unhandledrejection

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      window.addEventListener('unhandledrejection', (event) => {
        console.error(`捕获到错误1: ${event.reason}`)
      })

      window.onunhandledrejection = (event) => {
        console.error(`捕获到错误2: ${event.reason}`)
      }

      const p1 = new Promise((resolve, reject) => {
        throw new Error('错误')
        resolve(5)
      })
    </script>
  </body>
</html>
```

### 注意事项-异常捕获-onError

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      window.addEventListener('unhandledrejection', (event) => {
        console.error(`捕获到错误1: ${event.reason}`)
      })

      window.onunhandledrejection = (event) => {
        console.error(`捕获到错误2: ${event.reason}`)
      }
      
      window.onerror = (event) => {
        console.error(`onerror 捕获到错误: ${event.reason}`)
      }

      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          throw new Error('错误')
          resolve(5)
        }, 1000)
      })
    </script>
  </body>
</html>
```

### 注意事项-过早处理reject影响链式调用

```javascript
const p1 = new Promise((resolve, reject) => {
  reject(5)
})

p1.then(
  (res) => {
    //不会执行
    console.log('res1', res)
  },
  (rejectResult) => {
    //执行
    console.log('处理reject result', rejectResult)
    return rejectResult
  },
)
  .then((res) => {
    //执行
    console.log('res2', res)
  })
  .catch((e) => {
    //不会执行
    console.log('reject 错误：', e)
  })
```

```javascript
// 推荐做法
const p1 = new Promise((resolve, reject) => {
  reject(5)
})

// 推荐，最后统一catch处理
p1.then((res) => {
  //不会执行
  console.log('res1', res)
})
  .then((res) => {
    //不会执行
    console.log('res2', res)
  })
  .catch((e) => {
    console.log('reject 错误：', e)
  })
```

### Promise 执行顺序

```javascript
console.log('1')

const p1 = new Promise((resolve) => {
  console.log('2')
  // 请注意
  resolve('resolve')
  // 不会终止，会继续执行后面的代码
  console.log('继续执行')
})

// 微任务
p1.then((result) => {
  console.log('p1 result')
})

// 宏任务
setTimeout(() => {
  console.log('3')
})

console.log('4')
// 1 2 "继续执行" 4 "p1 result" 3
```

### 注意事项-Promise resolve 以后，再报错无效

> 状态不可逆

```javascript
const p2 = new Promise((resolve, reject) => {
  resolve(5)
  throw new Error('自定义错误')
})

p2.then((res) => {
  //不会执行
  console.log('res1', res)
  return res + 1
})
  .then((res) => {
    //不会执行
    console.log('res2', res)
  })
  .catch((e) => {
    console.log('reject 错误：', e)
  })
```

### 注意事项-then传入非函数，值穿透

```javascript
const p2 = new Promise((resolve, reject) => {
  resolve(5)
})

p2.then(1)
  .then((res) => {
    console.log('res2', res)
    return 2
  })
  .catch((e) => {
    console.log('reject 错误：', e)
  })
```

### 注意事项-all,rece等 reject 以后，其他并没有停止执行

#### race 

```javascript
let p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('执行p1')
    resolve('https://aaa.flv 开始播放')
  }, 5000)
})
let p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('执行p2')
    resolve('https://bbb.flv 开始播放')
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行p3')
    reject('https://ccc.flv 播放失败')
  }, 1000)
})

Promise.race([p1, p2, p3]).then((res) => {
  console.log('已经获取到合适的结果了===', res)
})
```

#### all

```javascript
let p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('执行p1')
    resolve('P1 fetch 请求成功')
  }, 5000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行p2')
    reject('P2 fetch 请求失败')
  }, 2000)
})
let p3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('执行p3')
    resolve('P3 fetch 请求成功')
  }, 1000)
})

Promise.all([p1, p2, p3])
  .then((res) => {
    console.log('已经获取到合适的结果了===', res)
  })
  .catch((e) => {
    console.log('发生异常=', e)
  })
```

### 实现 Promise-构造实现

```javascript
// const p1=new Promise((resolve,reject)=>{});
// console.log(p1);

//定义promise 三种状态
const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('Rejected')

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending
    this.PromiseValue = null
    //绑定函数this指向
    this.initBind()
    //执行回调
    callback(this.resolve, this.reject)
  }

  initBind() {
    this.reject = this.reject.bind(this)
    this.resolve = this.resolve.bind(this)
  }

  /**
   *
   *
   * 失败
   * @memberOf MyPromise
   */
  reject() {}

  /**
   *
   *
   * 成功
   * @memberOf MyPromise
   */
  resolve() {}
}
```

### 实现 Promise-resolve和reject实现

```javascript
const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('Rejected')

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending
    this.PromiseValue = null
    //绑定函数this指向
    this.initBind()
    //执行回调
    callback(this.resolve, this.reject)
  }

  initBind() {
    this.reject = this.reject.bind(this)
    this.resolve = this.resolve.bind(this)
  }

  /**
   *
   * 改变Promise状态
   * @param {any} statusType 状态类型
   * @param {any} value   最终结果
   * @returns
   *
   * @memberOf MyPromise
   */
  changePromiseStatus(statusType, value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return
    //改变状态
    this.PromiseStatus = statusType
    this.PromiseValue = value
  }

  /**
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    this.changePromiseStatus(rejected, value)
  }

  /**
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    this.changePromiseStatus(fulfilled, value)
  }
}
```

### 实现 Promise-resolve 和 reject 报错异常捕获

```javascript
const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('Rejected')

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending
    this.PromiseValue = null
    //绑定函数this指向
    this._initBind()
    //执行回调
    this._execute(callback)
  }

  _initBind() {
    this.reject = this.reject.bind(this)
    this.resolve = this.resolve.bind(this)
  }

  /**
   * 捕获异常，调用reject
   * @param {any} callback
   *
   * @memberOf MyPromise
   */
  _execute(callback) {
    try {
      callback(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  /**
   * 改变Promise状态
   * @param {any} statusType 状态类型
   * @param {any} value   最终结果
   * @returns
   *
   * @memberOf MyPromise
   */
  _changePromiseStatus(statusType, value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return
    //改变状态
    this.PromiseStatus = statusType

    this.PromiseValue = value
  }

  /**
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    this._changePromiseStatus(rejected, value)
  }

  /**
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    this._changePromiseStatus(fulfilled, value)
  }
}

// const p4=new MyPromise((resolve,reject)=>{
//     throw new Error("自定义错误");
// });
// console.log(p4);
```

### 实现 Promise-then回调参数同步和异步执行实现

```javascript
const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('Rejected')

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending
    this.PromiseValue = null
    //初始化集合
    this._initCollection()
    //绑定函数this指向
    this._initBind()
    //执行回调
    this._execute(callback)
  }

  _initCollection() {
    /**
        var p = new MyPromise((resolve, reject) => { setTimeout(resolve)});
        p.then(()=>console.log("..."));
        p.then(()=>console.log("..."))
    */
    //初始化成功回调集合
    this.fulfilledCallbacks = []
    //初始化失败回调集合
    this.rejectedCallbacks = []
  }

  _initBind() {
    this.reject = this.reject.bind(this)
    this.resolve = this.resolve.bind(this)
  }

  /**
   * 捕获异常，调用reject
   * @param {any} callback
   *
   * @memberOf MyPromise
   */
  _execute(callback) {
    try {
      callback(this.resolve, this.reject)
    } catch (e) {
      this.reject(e.message)
    }
  }

  /**
   * 触发执行集合
   * @param {any} array
   *
   * @memberOf MyPromise
   */
  _triggerExecuteCollection(array) {
    while (array.length > 0) {
      array.shift()(this.PromiseValue)
    }
  }

  /**
   * 改变Promise状态
   * @param {any} statusType 状态类型
   * @param {any} value   最终结果
   * @returns
   *
   * @memberOf MyPromise
   */
  _changePromiseStatus(statusType, value) {
    //改变状态
    this.PromiseStatus = statusType
    this.PromiseValue = value
  }

  /**
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return
    this._changePromiseStatus(rejected, value)
    this._triggerExecuteCollection(this.rejectedCallbacks)
  }

  /**
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return
    this._changePromiseStatus(fulfilled, value)
    this._triggerExecuteCollection(this.fulfilledCallbacks)
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {}
    onRejected = typeof onRejected === 'function' ? onRejected : () => {}

    //没有结果
    if (this.PromiseStatus === pending) {
      //添加成功回调，真正调用等成功 resolve 函数执行触发
      this.fulfilledCallbacks.push(onFulfilled.bind(this))
      //添加失败回调，真正调用等拒绝 reject 函数执行触发
      this.rejectedCallbacks.push(onRejected.bind(this))
      return
    }

    //有结果，立即执行
    if (this.PromiseStatus === fulfilled) {
      onFulfilled(this.PromiseValue)
      return
    }

    if (this.PromiseStatus === rejected) {
      onRejected(this.PromiseValue)
      return
    }
  }
}

// new MyPromise((resolve,reject)=>{
//     resolve("5")
// }).then((res)=>{
//     console.log("收到结果",res);
// })

// new MyPromise((resolve,reject)=>{
//     reject(new Error("eee"))
// }).then((res)=>{
//     console.log("收到结果",res);
// },(err)=>{
//     console.log(err)
// })

// new MyPromise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("异步")
//     },3000)
// }).then((res)=>{
//     console.log("收到结果",res);
// })

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('异步')
  }, 3000)
})

p2.then((a) => {
  console.log('第一次：', a)
})

p2.then((a) => {
  console.log('第二次', a)
})

p2.then((a) => {
  console.log('第三次', a)
})
```

### 实现 Promise-then链式调用

当一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 完成（`fulfilled`）或者失败（`rejected`）时，返回函数将被异步调用（由当前的线程循环来调度完成）。具体的返回值依据以下规则返回。如果 `then` 中的回调函数：

- 返回了一个值，那么 `then` 返回的 `Promise` 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
- 没有返回任何值，那么 `then` 返回的 `Promise` 将会成为接受状态，并且该接受状态的回调函数的参数值为 `undefined`。
- 抛出一个错误，那么 `then` 返回的 `Promise` 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
- 返回一个已经是接受状态的 `Promise`，那么 `then` 返回的 `Promise` 也会成为接受状态，并且将那个 `Promise` 的接受状态的回调函数的参数值作为该被返回的 `Promise` 的接受状态回调函数的参数值。
- 返回一个已经是拒绝状态的 `Promise`，那么 `then` 返回的 `Promise` 也会成为拒绝状态，并且将那个 `Promise` 的拒绝状态的回调函数的参数值作为该被返回的 `Promise` 的拒绝状态回调函数的参数值。
- 返回一个未定状态（`pending`）的 `Promise`，那么 `then` 返回 `Promise` 的状态也是未定的，并且它的终态与那个 `Promise` 的终态相同；同时，它变为终态时调用的回调函数参数与那个 `Promise` 变为终态时的回调函数的参数是相同的。

```javascript
const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('Rejected')

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending
    this.PromiseValue = null
    //初始化集合
    this._initCollection()
    //绑定函数this指向
    this._initBind()
    //执行回调
    this._execute(callback)
  }

  _initCollection() {
    //初始化成功回调集合
    this.fulfilledCallbacks = []
    //初始化失败回调集合
    this.rejectedCallbacks = []
  }

  _initBind() {
    this.reject = this.reject.bind(this)
    this.resolve = this.resolve.bind(this)
  }

  /**
   *
   * 捕获异常，调用reject
   * @param {any} callback
   *
   * @memberOf MyPromise
   */
  _execute(callback) {
    try {
      callback(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  /**
   *
   * 触发执行集合
   * @param {any} array
   *
   * @memberOf MyPromise
   */
  _triggerExecuteCollection(array) {
    while (array.length > 0) {
      array.shift()(this.PromiseValue)
    }
  }

  /**
   *
   * 改变Promise状态
   * @param {any} statusType 状态类型
   * @param {any} value   最终结果
   * @returns
   *
   * @memberOf MyPromise
   */
  _changePromiseStatus(statusType, value) {
    //改变状态
    this.PromiseStatus = statusType

    this.PromiseValue = value
  }

  /**
   *
   *
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return
    setTimeout(() => {
      this._changePromiseStatus(rejected, value)
      this._triggerExecuteCollection(this.rejectedCallbacks)
    })
  }

  /**
   *
   *
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    if (this.PromiseStatus !== pending) return
    setTimeout(() => {
      this._changePromiseStatus(fulfilled, value)
      this._triggerExecuteCollection(this.fulfilledCallbacks)
    })
  }

  then(onFulfilled, onRejected) {
    //不是函数,默认返回当前的值
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err
          }

    const nextPromise = new MyPromise((resolve, reject) => {
      //没有结果
      if (this.PromiseStatus === pending) {
        //添加成功回调，真正调用等成功 resolve 函数执行触发
        this.fulfilledCallbacks.push(() => {
          try {
            /**
             new MyPromise((resolve, reject) => {
                resolve(5);
              }).then((res) => {
                return res + 6;  // onFulfilled
              }).then((res) => {
                console.log("最终结果：", res)
              })
            */

            // 当前Promise执行成功的结果
            let result = onFulfilled(this.PromiseValue)
            // 根据返回结果，来决定当前nextPromise的状态
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            //抛出一个错误
            reject(e)
          }
        })
        //添加失败回调，真正调用等拒绝 reject 函数执行触发
        this.rejectedCallbacks.push(() => {
          try {
            let result = onRejected(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        return
      }

      //有结果，立即执行
      if (this.PromiseStatus === fulfilled) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        return
      }

      if (this.PromiseStatus === rejected) {
        setTimeout(() => {
          try {
            let result = onRejected(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return nextPromise
  }
}

/**
 * 处理运算结果
 * @memberOf MyPromise
 */
const handlePromiseResult = function (
  resultValue,
  thenPromise,
  resolve,
  reject,
) {
  //2.3.1 实现
  if (resultValue === thenPromise) {
    //不能将自身传入
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  //2.3.2 实现 返回类型为MyPromise
  if (resultValue instanceof MyPromise) {
    //2.3.2.1 实现,结果为pending状态
    if (resultValue.PromiseStatus === pending) {
      //FunResult的resolve,reject回调还没有执行，我们添加then等结果即可。
      //这里
      resultValue.then((result) => {
        //获取到resultValue的promise结果以后，再去判断结果是否为Promise.
        handlePromiseResult(result, thenPromise, resolve, reject)
      }, reject)
      return
    }
    //2.3.2.2 实现，结果为fulfilled状态
    if (resultValue.PromiseStatus === fulfilled) {
      resolve(resultValue.PromiseValue)
      return
    }
    //2.3.2.3 实现，结果为rejected状态
    if (resultValue.PromiseStatus === rejected) {
      reject(resultValue.PromiseValue)
      return
    }
    return
  }
  const resultValueType = typeof resultValue
  //2.3.3 实现
  if (
    resultValue !== null &&
    (resultValueType === 'object' || resultValueType === 'function')
  ) {
    let then
    //2.3.3.2 实现
    try {
      //2.3.3.1 实现
      then = resultValue.then
    } catch (thenError) {
      return reject(thenError)
    }
    //2.3.3.3 实现
    if (typeof then == 'function') {
      //2.3.3.3.4,try catch
      let called = false
      try {
        then.call(
          resultValue,
          (y) => {
            // 2.3.3.3.3
            if (called) return
            called = true
            //2.3.3.1
            handlePromiseResult(y, thenPromise, resolve, reject)
          },
          (r) => {
            // 2.3.3.3.3
            if (called) return
            called = true
            //2.3.3.2
            reject(r)
          },
        )
      } catch (callError) {
        //2.3.3.3.4.1 已经调用则略
        if (called) return
        called = true
        reject(callError)
      }
      return
    }

    //2.3.3.4 不是一个方法，一个对象
    resolve(resultValue)
    return
  }

  //2.3.4 不是object,不是function, 没有返回值。
  return resolve(resultValue)
}

//测试
new MyPromise((resolve, reject) => {
  resolve(5)
})
  .then((res) => {
    return res + 6
  })
  .then((res) => {
    console.log('最终结果：', res)
  })
```

### 测试 MyPromise

* promise-aplus-tests 工具库测试

```json
// package.json
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests MyPromise"
  }
}
```

```javascript
// MyPromise.js
const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('Rejected')

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending
    this.PromiseValue = null
    //初始化集合
    this._initCollection()
    //绑定函数this指向
    this._initBind()
    //执行回调
    this._execute(callback)
  }

  _initCollection() {
    //初始化成功回调集合
    this.fulfilledCallbacks = []
    //初始化失败回调集合
    this.rejectedCallbacks = []
  }

  _initBind() {
    this.reject = this.reject.bind(this)
    this.resolve = this.resolve.bind(this)
  }

  /**
   *
   * 捕获异常，调用reject
   * @param {any} callback
   *
   * @memberOf MyPromise
   */
  _execute(callback) {
    try {
      callback(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  /**
   *
   * 触发执行集合
   * @param {any} array
   *
   * @memberOf MyPromise
   */
  _triggerExecuteCollection(array) {
    while (array.length > 0) {
      array.shift()(this.PromiseValue)
    }
  }

  /**
   *
   * 改变Promise状态
   * @param {any} statusType 状态类型
   * @param {any} value   最终结果
   * @returns
   *
   * @memberOf MyPromise
   */
  _changePromiseStatus(statusType, value) {
    //改变状态
    this.PromiseStatus = statusType

    this.PromiseValue = value
  }

  /**
   *
   *
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return
    setTimeout(() => {
      this._changePromiseStatus(rejected, value)
      this._triggerExecuteCollection(this.rejectedCallbacks)
    })
  }

  /**
   *
   *
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    if (this.PromiseStatus !== pending) return
    setTimeout(() => {
      this._changePromiseStatus(fulfilled, value)
      this._triggerExecuteCollection(this.fulfilledCallbacks)
    })
  }

  then(onFulfilled, onRejected) {
    //不是函数,默认返回当前的值
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err
          }

    const nextPromise = new MyPromise((resolve, reject) => {
      //没有结果
      if (this.PromiseStatus === pending) {
        //添加成功回调，真正调用等成功 resolve 函数执行触发
        this.fulfilledCallbacks.push(() => {
          try {
            let result = onFulfilled(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            //抛出一个错误
            reject(e)
          }
        })
        //添加失败回调，真正调用等拒绝 reject 函数执行触发
        this.rejectedCallbacks.push(() => {
          try {
            let result = onRejected(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        return
      }

      //有结果，立即执行
      if (this.PromiseStatus === fulfilled) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        return
      }

      if (this.PromiseStatus === rejected) {
        setTimeout(() => {
          try {
            let result = onRejected(this.PromiseValue)
            handlePromiseResult(result, nextPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return nextPromise
  }
}

/**
 *
 *
 * 处理运算结果
 * @memberOf MyPromise
 */
const handlePromiseResult = function (
  resultValue,
  thenPromise,
  resolve,
  reject,
) {
  //2.3.1 实现
  if (resultValue === thenPromise) {
    //不能将自身传入
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  //2.3.2 实现 返回类型为MyPromise
  if (resultValue instanceof MyPromise) {
    //2.3.2.1 实现
    if (resultValue.PromiseStatus === pending) {
      //FunResult的resolve,reject回调还没有执行，我们添加then等结果即可。
      //这里
      resultValue.then((result) => {
        //获取到resultValue的promise结果以后，再去判断结果是否为Promise.
        handlePromiseResult(result, thenPromise, resolve, reject)
      }, reject)
      return
    }
    //2.3.2.2 实现
    if (resultValue.PromiseStatus === fulfilled) {
      resolve(resultValue.PromiseValue)
      return
    }
    //2.3.2.3 实现
    if (resultValue.PromiseStatus === rejected) {
      reject(resultValue.PromiseValue)
      return
    }
    return
  }
  const resultValueType = typeof resultValue
  //2.3.3 实现
  if (
    resultValue !== null &&
    (resultValueType === 'object' || resultValueType === 'function')
  ) {
    let then
    //2.3.3.2 实现
    try {
      //2.3.3.1 实现
      then = resultValue.then
    } catch (thenError) {
      return reject(thenError)
    }
    //2.3.3.3 实现
    if (typeof then == 'function') {
      //2.3.3.3.4,try catch
      let called = false
      try {
        then.call(
          resultValue,
          (y) => {
            // 2.3.3.3.3
            if (called) return
            called = true
            //2.3.3.1
            handlePromiseResult(y, thenPromise, resolve, reject)
          },
          (r) => {
            // 2.3.3.3.3
            if (called) return
            called = true
            //2.3.3.2
            reject(r)
          },
        )
      } catch (callError) {
        //2.3.3.3.4.1 已经调用则略
        if (called) return
        called = true
        reject(callError)
      }
      return
    }

    //2.3.3.4 不是一个方法
    resolve(resultValue)
    return
  }

  //2.3.4 不是object,不是function
  return resolve(resultValue)
}

MyPromise.deferred = function () {
  let result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise
```

## 03: async的本质和注意事项

### Generator 函数（生成器函数）

* 首先它是一个普通函数

  ```javascript
  (function *generator(){ }) instanceof Function // true
  ```

### Generator 函数特征

* **星号**：function 关键字与函数名之间有一个型号

  ```javascript
  function* generator1(){ } // 推荐
  function *generator2(){ }
  function * generator3(){ } 
  function*generator4(){ }
  ```

* **yield表达式**，遇到 yeild 会暂停执行代码，等待外面调用 next，返回对应状态值。反复反复，直到遇到 return 或者没有语句

  ```javascript
  function* numGenerator() {
    yield 1
    yield 2
    return 3
  }
  var log = console.log
  var gen = numGenerator()
  log(gen.next()) // {value: 1, done: false}
  log(gen.next()) // {value: 2, done: false}
  log(gen.next()) // {value: 3, done: true}
  log(gen.next()) // { value: undefined, done: true }
  ```

### Genarator 对象

* Generator 函数执行会返回的对象。叫做 Generator 对象。JS 中的对象模型也叫做 Generator

  ```javascript
  Generator
  方法
  Generator.prototype.next()
  Generator.prototype.return()
  Generator.prototype.throw()
  ```

* next：获取下一个状态

* return：给定的值并结束生成器

* throw: 向生成器抛出异常，并恢复生成器的执行，返回带有 code 以及 value 两个属性的对象

* 符合可迭代协议盒迭代器协议

### 动态创建 Generator 函数实例

```javascript
// var GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor
var GeneratorFunction = function* () {}.constructor
var numGenerator = new GeneratorFunction(`
  yield 1;
  yield 2;
  return 3;
`)

var log = console.log
var gen = numGenerator()
log(gen.next()) // {value: 1, done: false}
log(gen.next()) // {value: 2, done: false}
log(gen.next()) // {value: 3, done: true}
log(gen.next()) // { value: undefined, done: true }
```

### 判断是不是 Generator 函数

```javascript
var GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor
function* numGenerator() {
  yield 1;
  yield 2;
  return 3;
}

// 推荐
console.log(numGenerator.constructor === GeneratorFunction)
// 不推荐
console.log(numGenerator instanceof GeneratorFunction.__proto__)
```

### 延伸：判断一个函数是不是异步函数（async 函数）

```javascript
(async function aaa(){}).constructor
ƒ AsyncFunction() { [native code] }

const AsyncFunction = (async function aaa(){}).constructor
console.log(fn.constructor === AsyncFunction) // 判断 fn 函数是不是 异步函数
```

### Generator对象：throw

* 如果 Generartor 不捕获该错误，会导致调用程序异常

#### Generator 对象捕获 throw异常

```javascript
function* generator() {
  var val = 1
  while (true) {
    try {
      yield val++
    } catch (e) {
      console.log('Error caught!')
    }
  }
}

var log = console.log
var gen = generator()
gen.next() // { value: 1, done: false }
log(gen.throw(new Error('Something went wrong'))) // "Error caught!"  {value: 2, done: false}
log(gen.next()) // { value: 3, done: false }
```

#### Generator 对象不捕获 throw异常

```javascript
function* generator() {
  var val = 1
  while (true) {
    yield val++
  }
}

var log = console.log
var gen = generator()
gen.next() // { value: 1, done: false }
log(gen.throw(new Error('Something went wrong'))) // "Error caught!"  {value: 2, done: false}
log(gen.next()) // { value: 3, done: false }
```

### 迭代器协议

* 定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值

* 只有实现了一个拥有以下语义（semantic）的 **`next()`** 方法，一个对象才能成为迭代器：

  - `next()`

    无参数或者接受一个参数的函数，并返回符合 `IteratorResult` 接口的对象（见下文）。如果在使用迭代器内置的语言特征（例如 `for...of`）时，得到一个非对象返回值（例如 `false` 或 `undefined`），将会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)（`"iterator.next() returned a non-object value"`）。

  所有迭代器协议的方法（`next()`、`return()` 和 `throw()`）都应返回实现 `IteratorResult` 接口的对象。它必须有以下属性：

  - `done` 可选

    如果迭代器能够生成序列中的下一个值，则返回 `false` 布尔值。（这等价于没有指定 `done` 这个属性。）如果迭代器已将序列迭代完毕，则为 `true`。这种情况下，`value` 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。

  - `value` 可选

    迭代器返回的任何 JavaScript 值。`done` 为 `true` 时可省略。

  实际上，两者都不是严格要求的；如果返回没有任何属性的对象，则实际上等价于 `{ done: false, value: undefined }`。

  如果一个迭代器返回一个 `done: true` 的结果，则对任何 `next()` 的后续调用也返回 `done: true`，尽管这在语言层面不是强制的。

  `next` 方法可以接受一个值，该值将提供给方法体。任何内置的语言特征都将不会传递任何值。传递给[生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) `next` 方法的值将成为相应 `yield` 表达式的值。

  可选地，迭代器也实现了 **`return(value)`** 和 **`throw(exception)`** 方法，这些方法在调用时告诉迭代器，调用者已经完成迭代，并且可以执行任何必要的清理（例如关闭数据库连接）。

  - `return(value)` 可选

    无参数或者接受一个参数的函数，并返回符合 `IteratorResult` 接口的对象，其 `value` 通常等价于传递的 `value`，并且 `done` 等于 `true`。调用这个方法表明迭代器的调用者不打算调用更多的 `next()`，并且可以进行清理工作。

  - `throw(exception)` 可选

    无参数或者接受一个参数的函数，并返回符合 `IteratorResult` 接口的对象，通常 `done` 等于 `true`。调用这个方法表明迭代器的调用者监测到错误的状况，并且 `exception` 通常是一个 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error) 实例。

### 可迭代协议

* 允许 JavaScript 对象定义或者定制它们的迭代行为，例如，在一个 for...of 结构中，哪些值可以被遍历到

* 要成为**可迭代**对象，该对象必须实现 **`@@iterator`** 方法，这意味着对象（或者它[原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 [`Symbol.iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 访问该属性：

  - `[Symbol.iterator]`

    **一个无参数的函数，其返回值为一个符合[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#迭代器协议)的对象。**

  当一个对象需要被迭代的时候（比如被置入一个 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环时），首先，会不带参数调用它的 `@@iterator` 方法，然后使用此方法返回的**迭代器**获得要迭代的值。

  值得注意的是调用此无参数函数时，它将作为对可迭代对象的方法进行调用。因此，在函数内部，`this` 关键字可用于访问可迭代对象的属性，以决定在迭代过程中提供什么。

  此函数可以是普通函数，也可以是生成器函数，以便在调用时返回迭代器对象。在此生成器函数的内部，可以使用 `yield` 提供每个条目。

### Generator 函数的参数传递

#### 外界向生成器函数传递参数

1. 生成器函数本身可以接收初始话参数
2. Generator.prototype.next 可以向生成器函数传递参数
3. Generator.prototype.return 可以向生成器函数传递参数
4. Generator.prototype.throw 可以向生成器函数抛出异常

#### 生成器函数向外输出结果

* Generator.prototype.next 的返回值

```javascript
function* addGenerator(num1) {
  let num2 = 0
  while (true) {
    num2 = yield (num1 = num1 + num2)
  }
}
const gen = addGenerator(10)
// num1 = 10, num2 = 0 （第一次不能传参）
console.log(gen.next()) // 10
// num2 = 20, num1 = 10
console.log(gen.next(20)) // 30
// num2 = 30, num1 = 30
console.log(gen.next(30)) // 60
```

### Generator 的妙用：序列生成器

```javascript
function* sequenceGenerator(start = 0, step = 1, end = Number.MAX_SAFE_INTEGER) {
  let current = start;
  while (current <= end) {
    yield current;
    current = current + step;
  }
}

// const gen = sequenceGenerator(0, 3, 6);
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

const gen2= sequenceGenerator(0, 3, 6);
var numbers = [...gen2];
console.log(numbers);

const gen3= sequenceGenerator(0, 3, 6);
for(let v of gen3){
  console.log("v:", v);
}
```

### Generator 的妙用：状态机

```javascript
//PDCA 循环 .Plan-Do-Check-Action 
function* stateMachineGenerator(states, state) {
  const len = states.length;
  let index =  Math.max(states.findIndex(s => s === state) , 0);
  while (true) {
    yield states[(++index) % len];
  }
}
const startState = "Do";
const stateMachine = stateMachineGenerator(["Plan", "Do", "Check", "Action"], startState );

console.log(startState);                // Do
console.log(stateMachine.next().value); // Check
console.log(stateMachine.next().value); // Action
console.log(stateMachine.next().value); // Plan
console.log(stateMachine.next().value); // Do
console.log(stateMachine.next().value); // Check
console.log(stateMachine.next().value); // Action
console.log(stateMachine.next().value); // Plan
```

### redux-sage

```javascript
import { take, call, put } from "redux-saga/effects"
import Api from "..."

function* authorize(user, password){
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({ type: "LOGIN_SUCCESS", token })
    return token
  } catch {
    yield put({ type: "LOGIN_ERROR", error })
  }
}
```

### async 函数简介

* async 函数是使用 async 关键字声明的函数。async 函数是 AsyncFunction 构造函数的实例，并且其中允许使用 await 关键字。async 和 await 关键字让我们可以用一种更简洁的方式基于 Promise 的异步行为，而无需刻意地链式调用 promise

  ```javascript
  async function test() {
    const r1 = await 1
    const r2 = await 2
  
    console.log('result:', r1 + r2)
  }
  
  test()
  ```

### async 函数的本质是什么呢？

* 使用 tsc 命令转换为 ES6 的代码

  ```typescript
  // 源代码
  async function test() {
    const r1 = await 1
    const r2 = await 2
  
    console.log('result:', r1 + r2)
  }
  
  test()
  ```

  转换后的代码

  ```javascript
  'use strict'
  var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  function test() {
    return __awaiter(this, void 0, void 0, function* () {
      const r1 = yield 1
      const r2 = yield 2
      console.log('result:', r1 + r2)
    })
  }
  test()
  ```

  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92b4d3b1265943e1aa9fa7c4b2b2b426~tplv-k3u1fbpfcp-watermark.image?)

* 本质就是对 generator 的一种封装，一种新的语法糖

### co库

```javascript
var gen = function* () {
  const start = Date.now()
  var num1 = yield getData(1000, 10)
  var num2 = yield getData(2000, 20)
  console.log('result:', num1 + num2, ', cost:', Date.now() - start)
}

co(gen)
```

#### 简化 co库后的代码逻辑

```javascript
function isPromise(obj) {
  return 'function' == typeof obj.then
}

function toPromise(obj) {
  if (!obj) return obj
  if (isPromise(obj)) return obj

  // 简化
  return Promise.resolve(obj)

  // 额外处理了很多其他的数据类型
  // if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  // if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  // if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  // if (isObject(obj)) return objectToPromise.call(this, obj);
  // return obj;
}

function co(gen) {
  var ctx = this
  var args = Array.prototype.slice.call(arguments, 1)
  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()
    function onFulfilled(res) {
      var ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function onRejected(err) {
      var ret
      try {
        ret = gen.throw(err)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }
    function next(ret) {
      // 检查是否结束
      if (ret.done) return resolve(ret.value)

      // 转为Promise
      var value = toPromise.call(ctx, ret.value)
      // 检查是不是Promise
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
      return onRejected(
        new TypeError(
          'You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' +
            String(ret.value) +
            '"',
        ),
      )
    }
  })
}

function getData(duration, data) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(data * 2)
    }, duration)
  })
}

var gen = function* () {
  const start = Date.now()
  var num1 = yield getData(1000, 10)
  var num2 = yield getData(2000, 20)
  console.log('result:', num1 + num2, ', cost:', Date.now() - start)
}

co(gen)
```

### async 函数的缺点和注意事项

* async 函数里面，不是所有异步代码都需要 await, 主要是看业务上是否有依赖关系。不然，就是无用的等待

## 04：基于Promise的通用异步方案

### 基于事件通讯的场景：与服务端的通讯

* WebSocket, socketIO, mqtt, SSE 等

  ```javascript
  const mqtt = require('mqtt')
  const client = mqtt.connect("mqtt://test.sie.org")
  client.on('connect', () => {
    client.subscribe("presence", (err) => {
      if(!err){
        client.publish("presence", "hello mqtt")
      }
    })
  })
  
  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    client.end()
  })
  ```

### 基于事件通讯的场景：客户端相互之间

* webview 与原生之间，页面与iframe, EventEmitter 订阅发布中心等等

### 技术角度的两种场景

* 一发一收：类似 http 请求，一次发送只期待一次返回结果
* 单纯的接收。就是单纯期望收到服务的消息，比如直播业务，土豪们送出礼物后，我们会在聊天室监听到礼物消息，然后触发礼物特效，让送礼物的人活得满足感，直播知道来钱了。

### 一发一收可以 Promise

```javascript
import EventEmitter from 'events'

const emitter = new EventEmitter()
// 被请求方, 模拟server
emitter.on('message-client-req', ({ type, data }) => {
  console.log('server: message-client-req', type, data)
  emitter.emit('message-client-res', {
    type,
    data: data,
    from: 'server',
  })
})

// 请求
function invoke(type: string, data: any = {}) {
  return new Promise((resolve, _reject) => {
    console.log('client:发送请求')
    emitter.once('message-client-res', function (data) {
      resolve(data)
    })
    emitter.emit('message-client-req', { type, data })
  })
}

invoke('ccc', 'req1').then((res) => console.log('client:req1', res))
```

执行结果如下

```shell
client:发送请求
server: message-client-req ccc req1
client:req1 { type: 'ccc', data: 'req1', from: 'server' }
```

### once 异步存在的问题

> 下面代码，结果是不准确的

```typescript
import EventEmitter from 'events'

const emitter = new EventEmitter()

// 被请求方, 模拟server
emitter.on('message-client-req', ({ type, data }) => {
  console.log('server: message-client-req', type, data)
  setTimeout(() => {
    emitter.emit('message-client-res', {
      type,
      data: data,
      from: 'server',
    })
  }, 16) // 响应一般都是异步的
})

// 请求
function invoke(type: string, data: any = {}) {
  return new Promise((resolve, _reject) => {
    console.log('client:发送请求')
    emitter.once('message-client-res', function (data) {
      resolve(data)
    })
    emitter.emit('message-client-req', { type, data })
  })
}

invoke('ccc', 'req1').then((res) => console.log('client:req1:res', res))
invoke('ccc', 'req2').then((res) => console.log('client:req2:res', res))
```

执行结果如下(req1 的定时器触发时候，已经有两个 once 监听 message-client-res函数已经被实例化注册，所以两次 data 都是 req1 )

```shell
client:发送请求
server: message-client-req ccc req1
client:发送请求
server: message-client-req ccc req2
client:req1:res { type: 'ccc', data: 'req1', from: 'server' }
client:req2:res { type: 'ccc', data: 'req1', from: 'server' }
```

### 一个请求对应一个响应

* 维护一个响应列表
* 统一响应处理。通过 type 查找对应的响应函数

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e284a3af10a4739a01a622f08317428~tplv-k3u1fbpfcp-watermark.image?)

#### 初步代码

```javascript
import EventEmitter from 'events'

const emitter = new EventEmitter()
// 被请求方, 模拟server
emitter.on('message-client-req', ({ type, data }) => {
  console.log('server: message-client-req', { type, data })
  setTimeout(() => {
    emitter.emit('message-client-res', {
      type,
      data: data,
      from: 'server',
    })
  }, 16)
})

// 等待响应列表
const queues = []
// 请求
function invoke(type, data) {
  return new Promise((resolve, _reject) => {
    console.log('client:发送请求')
    queues.push({
      type,
      resolve,
    })
    emitter.emit('message-client-req', { type, data })
  })
}

// 统一的响应处理
emitter.on('message-client-res', function (data) {
  // 去列表里面查找对应的回调
  const index = queues.findIndex((c) => c.type === data.type)
  console.log('index:', index)
  if (index >= 0) {
    const qItem = queues[index]
    // 执行回调
    qItem.resolve(data)
    // 删除
    queues.splice(index, 1)
  }
})

invoke('ccc', 'req1').then((res) => console.log('client:req1:res', res))
invoke('ccc', 'req2').then((res) => console.log('client:req2:res', res))
```

响应结果如下

```shell
client:发送请求
server: message-client-req { type: 'ccc', data: 'req1' }
client:发送请求
server: message-client-req { type: 'ccc', data: 'req2' }
index: 0
client:req1:res { type: 'ccc', data: 'req1', from: 'server' }
index: 0
client:req2:res { type: 'ccc', data: 'req2', from: 'server' }
```

#### 初步代码存在的问题

* 上述代码，异步回调时间目前是一样的都是 16ms,但是现实中，有可能存在后发的请求先响应，这个时候就会出错

#### 改进响应时间，复现问题

```javascript
import EventEmitter from 'events'

const emitter = new EventEmitter()
// 被请求方, 模拟server
emitter.on('message-client-req', ({ type, data }) => {
  // console.log("server: message-client-req", { type, data });
  const time = Math.random() * 1000
  console.log('server: cost', time, data)
  setTimeout(
    (resData) => {
      emitter.emit('message-client-res', {
        type,
        data: resData,
        from: 'server',
      })
      // 第三个参数传递数据
    },
    time,
    data,
  )
})

// 等待响应的队列
const queues = []
// 统一的响应处理
emitter.on('message-client-res', function (data) {
  // 去队列里面查找对应的回调
  const index = queues.findIndex((c) => c.type === data.type)
  if (index >= 0) {
    const qItem = queues[index]
    // 执行回调
    qItem.resolve(data)
    // 删除
    queues.splice(index, 1)
  }
})

// 请求
function invoke(type, data) {
  return new Promise((resolve, _reject) => {
    console.log('client:发送请求')
    queues.push({
      type,
      resolve,
    })
    emitter.emit('message-client-req', { type, data })
  })
}

invoke('ccc', 'req1').then((res) => console.log('client:req1:res', res))
invoke('ccc', 'req2').then((res) => console.log('client:req2:res', res))
```

执行后，结果如下

> 可以看到，响应 req1 时，收到的结果是 req2,

```shell
client:发送请求
server: cost 767.1614596370722 req1
client:发送请求
server: cost 579.2201539984825 req2
client:req1:res { type: 'ccc', data: 'req2', from: 'server' }
client:req2:res { type: 'ccc', data: 'req1', from: 'server' }
```

#### 优化：一个请求一个响应-添加 key

* 对应一个请求携带 key
* 响应时返回请求的 key
* 请求方收到响应用 key 作比较

```javascript
import EventEmitter from 'events'

const emitter = new EventEmitter()
// 被请求方, 模拟server
emitter.on('message-client-req', ({ type, data, key }) => {
  // console.log("server: message-client-req", { type, data });
  const time = Math.random() * 1000
  console.log('server: cost', time, data, key)
  setTimeout(
    (resData, reqKey) => {
      emitter.emit('message-client-res', {
        type,
        key: reqKey, // 携带请求的key
        data: resData,
        from: 'server',
      })
      // 第三个参数传递数据
      // 第四个参数传递key
    },
    time,
    data,
    key,
  )
})

// 等待响应的队列
const queues = []
// 统一的响应处理
emitter.on('message-client-res', function (data) {
  // 去队列里面查找对应的回调
  const index = queues.findIndex((c) => {
    // 查询条件增加对key的比较
    return c.type === data.type && c.key === data.key
  })
  if (index >= 0) {
    const qItem = queues[index]
    // 执行回调
    qItem.resolve(data)
    // 删除
    queues.splice(index, 1)
  }
})

// 请求
function invoke(type, data) {
  return new Promise((resolve, _reject) => {
    console.log('client:发送请求')
    // 如果有key，就使用，不然自己生成一个
    const key = data.key || `${Math.random()}-${Math.random()}`
    queues.push({
      key,
      type,
      resolve,
    })
    emitter.emit('message-client-req', { type, data, key })
  })
}

invoke('ccc', 'req1').then((res) => console.log('client:req1:res', res))
invoke('ccc', 'req2').then((res) => console.log('client:req2:res', res))
```

执行结果如下

```shell
client:发送请求
server: cost 864.4191609453147 req1 0.8320851352265157-0.4586881094670998
client:发送请求
server: cost 814.8233222602943 req2 0.3391706938667791-0.9642916309001359
client:req2:res {
  type: 'ccc',
  key: '0.3391706938667791-0.9642916309001359',
  data: 'req2',
  from: 'server'
}
client:req1:res {
  type: 'ccc',
  key: '0.8320851352265157-0.4586881094670998',
  data: 'req1',
  from: 'server'
}
```

### 通用方案的设计

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8db6f0acdb2545d092de48bcb90c45c9~tplv-k3u1fbpfcp-watermark.image?)

#### 额外的考虑

* 超时处理
* 要兼容不是一发一收的通讯情况
* 要兼容服务端不能处理 key 的情况

#### 子类必须实现

* subscribe: 订阅消息
* invoke: 实际发送消息的操作

#### 子类可以重写的方法

* getReqCategory: 获取请求的类别
* getReqKey: 获取请求的唯一 key
* getResCategory: 获取相应的类别
* getResKey: 获取对应的 key, 用于和请求的 key 对比，来查找对应的回调函数，然后让 Promise 继续执行

### 代码示例

[[基于Promise的通用异步方案](https://github.com/gy1001/Javascript/tree/main/JavaScript-Crack/10. 爱上异步编程/10.4 基于Promise的通用异步方案)](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/10.%20%E7%88%B1%E4%B8%8A%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/10.4%20%E5%9F%BA%E4%BA%8EPromise%E7%9A%84%E9%80%9A%E7%94%A8%E5%BC%82%E6%AD%A5%E6%96%B9%E6%A1%88/src/index.ts)