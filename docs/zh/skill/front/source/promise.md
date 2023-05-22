# 自定义 Promise

## 1、基本结构

```javascript
function Promise(executor) {}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {}

let p = new Promise((resolve, reject) => {
  resolve('ok')
})
p.then((value1) => {
  console.log('value1', value1)
}).then((value2) => {
  console.log('value2', value2)
})
```

## 2、resolve 与 reject

```javascript
function Promise(executor) {
  // 执行器函数在内部是同步调用的
  function resolve(data) {}

  function reject(error) {}

  executor(resolve, reject)
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {}

let p = new Promise((resolve, reject) => {
  resolve('ok')
})
p.then((value1) => {
  console.log('value1', value1)
}).then((value2) => {
  console.log('value2', value2)
})
```

## 3、resolve 与 reject 内部实现

```javascript
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 保存实例对象的this值
  const self = this
  // 执行器函数在内部是同步调用的
  function resolve(data) {
    // 修改对象的状态(promiseState)
    self.PromiseState = 'fulfilled'
    // 设置对象的结果值(promiseResult)
    self.PromiseResult = data
  }

  function reject(error) {
    self.PromiseState = 'rejected'
    self.PromiseResult = error
  }

  executor(resolve, reject)
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {}

let p = new Promise((resolve, reject) => {
  resolve('ok')
})
console.log(p)
p.then((value1) => {
  console.log('value1', value1)
})
```

## 4、throw 抛出异常改变状态

```javascript
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 保存实例对象的this值
  const self = this
  // 执行器函数在内部是同步调用的
  function resolve(data) {
    // 修改对象的状态(promiseState)
    self.PromiseState = 'fulfilled'
    // 设置对象的结果值(promiseResult)
    self.PromiseResult = data
  }

  function reject(error) {
    self.PromiseState = 'rejected'
    self.PromiseResult = error
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    // 修改 promise 的状态为失败
    reject(error)
  }
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {}

let p = new Promise((resolve, reject) => {
  // resolve('ok')
  throw 'error'
})
console.log(p)
p.then((value1) => {
  console.log('value1', value1)
})
```

## 5、promise 对象状态只能修改一次

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  const self = this
  function resolve(data) {
    // 增加判断状态逻辑
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {}

let p = new Promise((resolve, reject) => {
  reject('error')
  resolve('ok')
  // throw 'error'
})
console.log(p)
p.then((value1) => {
  console.log('value1', value1)
})
```

## 6、then 方法执行回调

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  // 调用回调函数
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  } else if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }
}
```

## 7、异步任务回调的 then 方法实现

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = {}
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.onResolved) {
      self.callback.onResolved(data)
      self.callback = {}
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.onRejected) {
      self.callback.onRejected(error)
      self.callback = {}
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  } else if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }
  // 增加pending 的一个判断
  if (this.PromiseState === 'pending') {
    // 需要保存回调函数
    this.callback = {
      onResolved,
      onRejected,
    }
  }
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
    // reject('error')
    // throw 'error'
  }, 1000)
})
console.log(p)
p.then(
  (value1) => {
    console.log('value1', value1)
  },
  (error1) => {
    console.log('error1', error1)
  },
)
```

## 8、指定多个回调的实现

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 修改为数组
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    // 遍历 调用成功的回调函数
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    // 遍历 调用失败的回调函数
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  } else if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }
  if (this.PromiseState === 'pending') {
    // 需要保存回调函数
    this.callback.push({
      onResolved,
      onRejected,
    })
  }
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
    // reject('error')
    // throw 'error'
  }, 1000)
})
p.then(
  (value1) => {
    console.log('value1', value1)
  },
  (error1) => {
    console.log('error1', error1)
  },
)
p.then((value2) => {
  console.log('value2', value2)
})
```

## 9、同步封装状态 then 方法结果返回

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    if (this.PromiseState === 'fulfilled') {
      try {
        // 如果结果为 promise
        let result = onResolved(this.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          // 结果的对象状态为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    } else if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved,
        onRejected,
      })
    }
  })
}

let p = new Promise((resolve, reject) => {
  resolve('ok1')
})
p.then(
  (value1) => {
    // console.log('value1', value1)
    // return new Promise((resolve1) => {
    //   resolve1('i am success')
    // })
    throw 'FAILURE'
  },
  (error1) => {
    console.log('error1', error1)
  },
).then(
  (value) => {
    console.log('result2', value)
  },
  (error) => {
    console.log('error2', error)
  },
)
```

## 10、异步修改状态 then 方法结果返回

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    if (this.PromiseState === 'fulfilled') {
      try {
        let result = onResolved(this.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          // 结果的对象状态为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    } else if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult)
    }
    // 增加pending 的一个判断
    if (this.PromiseState === 'pending') {
      // 需要保存回调函数,
      this.callback.push({
        onResolved: function () {
          // console.log('success')
          // 执行成功的回调函数
          try {
            const result = onResolved(self.PromiseResult)
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v)
                },
                (e) => {
                  reject(e)
                },
              )
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        },
        onRejected: function () {
          try {
            const result = onRejected(self.PromiseResult)
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v)
                },
                (e) => {
                  reject(e)
                },
              )
            } else {
              reject(result)
            }
          } catch (error) {
            reject(error)
          }
        },
      })
    }
  })
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1')
  }, 1000)
})
const result = p
  .then(
    (value1) => {
      console.log('value1', value1)
      // return 'i am success'
      // return new Promise((resolve1) => {
      //   resolve1('i am success')
      // })
      throw 'FAILURE'
    },
    (error1) => {
      console.log('error1', error1)
    },
  )
  .then(
    (value) => {
      console.log('result2', value)
    },
    (error) => {
      console.log('error2', error)
    },
  )
console.log(result)
```

## 11、then 方法完善与优化

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
      self.callback = []
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    // 增加 callback 函数
    function callback(typeFunc) {
      try {
        let result = typeFunc(this.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            }
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    } else if (this.PromiseState === 'rejected') {
      callback(onrejected)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function ()
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

 let p = new Promise((resolve, reject) => {
   setTimeout(() => {
     // resolve('ok1')
     reject('error')
   }, 1000)
 })
 const result = p
   .then(
     (value1) => {
       console.log('value1', value1)
       // return 'i am success'
       // return new Promise((resolve1) => {
       //   resolve1('i am success')
       // })
       throw 'FAILURE'
     },
     (error1) => {
       console.log('error1', error1)
     }
   )
   .then(
     (value) => {
       console.log('result2', value)
     },
     (error) => {
       console.log('error2', error)
     }
   )
 console.log(result)
```

## 12、catch 方法-异常穿透与值传递

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  // onRejected、onRejected 兼容处理为空时候的处理
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }

  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  return new Promise((resolve, reject) => {
    function callback(typeFunc) {
      try {
        let result = typeFunc(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    } else if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}
// catch 其实就是调用 then
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok1')
    reject('error122')
  }, 1000)
})
const result = p
  .then()
  .then(
    (value1) => {
      return 'i am success'
    },
    (error1) => {
      console.log('error1', error1)
    },
  )
  .then(
    (res) => {
      console.log('res2', res)
    },
    (error2) => {
      console.log('error2', error2)
    },
  )
  .then((res3) => {
    console.log('res3', res3)
  })
  .catch((error) => {
    console.log(3333, error)
  })
```

## 13、resolve 方法封装

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  return new Promise((resolve, reject) => {
    function callback(typeFunc) {
      try {
        let result = typeFunc(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    } else if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
// 不属于函数实例，是构造函数方法
Promise.resolve = function (resultVal) {
  // 返回 promise
  return new Promise((resolve, reject) => {
    if (resultVal instanceof Promise) {
      resultVal.then(
        (v) => {
          resolve(v)
        },
        (err) => {
          reject(err)
        },
      )
    } else {
      resolve(resultVal)
    }
  })
}

const p1 = Promise.resolve('ok啊')
console.log(p1)
const p2 = Promise.resolve(
  new Promise((resolve, reject) => {
    reject('error我是错误信息')
  }),
)
console.log(p2)
const p3 = Promise.resolve(Promise.resolve('我是成功信息'))
console.log(p3)
```

## 14、reject 方法封装

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  return new Promise((resolve, reject) => {
    function callback(typeFunc) {
      try {
        let result = typeFunc(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    } else if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
// 不属于函数实例，是构造函数方法
Promise.resolve = function (resultVal) {
  // 返回 promise
  return new Promise((resolve, reject) => {
    if (resultVal instanceof Promise) {
      resultVal.then(
        (v) => {
          resolve(v)
        },
        (err) => {
          reject(err)
        },
      )
    } else {
      resolve(resultVal)
    }
  })
}
Promise.reject = function (rejectVal) {
  // 这里不用做如下处理，暂时留个疑问
  // return new Promise((resolve, reject) => {
  //   if (rejectVal instanceof Promise) {
  //     rejectVal.then(
  //       ((result) => {
  //         resolve(result)
  //       },
  //       (error) => {
  //         reject(error)
  //       })
  //     )
  //   } else {
  //     reject(rejectVal)
  //   }
  // })
  return new Promise((resolve, reject) => {
    reject(rejectVal)
  })
}

const p1 = Promise.reject('error啊')
console.log(p1)
const p2 = Promise.reject(
  new Promise((resolve, reject) => {
    reject('error我是错误信息')
  }),
)
console.log(p2)
const p3 = Promise.reject(Promise.resolve('我是resolve信息'))
console.log(p3)
const p4 = Promise.reject(Promise.reject('我是错误信息'))
console.log(p4)
```

## 15、all 方法封装

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  return new Promise((resolve, reject) => {
    function callback(typeFunc) {
      try {
        let result = typeFunc(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    } else if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
Promise.resolve = function (resultVal) {
  return new Promise((resolve, reject) => {
    if (resultVal instanceof Promise) {
      resultVal.then(
        (v) => {
          resolve(v)
        },
        (err) => {
          reject(err)
        },
      )
    } else {
      resolve(resultVal)
    }
  })
}
Promise.reject = function (rejectVal) {
  return new Promise((resolve, reject) => {
    reject(rejectVal)
  })
}

Promise.all = function (promises) {
  // 返回的结果为一个promise 对象
  return new Promise((resolve, reject) => {
    // 声明变量
    let count = 0
    let resultArr = []
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(
        (result) => {
          count++
          // 这里不能直接用push，因为涉及到执行顺序的问题
          resultArr[index] = result
          // resultArr.push(result)
          if (count === promises.length) {
            //都成功时候才能调用 resolve 改变状态
            resolve(resultArr)
          }
        },
        (err) => {
          reject(err)
        },
      )
    }
  })
}

const p1 = new Promise((resolve, reject) => {
  resolve('OK')
})
const p2 = Promise.resolve('success')
const p3 = Promise.resolve('oh Yeah')
// const p3 = Promise.reject('oh error le')
const pAll = Promise.all([p1, p2, p3])
console.log(pAll)
```

## 16、race 方法封装

```javascript
function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onResolved(data)
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      self.callback.forEach((item) => {
        item.onRejected(error)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  return new Promise((resolve, reject) => {
    function callback(typeFunc) {
      try {
        let result = typeFunc(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    } else if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
Promise.resolve = function (resultVal) {
  return new Promise((resolve, reject) => {
    if (resultVal instanceof Promise) {
      resultVal.then(
        (v) => {
          resolve(v)
        },
        (err) => {
          reject(err)
        },
      )
    } else {
      resolve(resultVal)
    }
  })
}
Promise.reject = function (rejectVal) {
  return new Promise((resolve, reject) => {
    reject(rejectVal)
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let resultArr = []
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(
        (result) => {
          count++
          resultArr[index] = result
          if (count === promises.length) {
            resolve(resultArr)
          }
        },
        (err) => {
          reject(err)
        },
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(
        (v) => {
          resolve(v)
        },
        (error) => {
          reject(error)
        },
      )
    }
  })
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK')
  }, 1000)
})
const p2 = Promise.resolve('success')
const p3 = Promise.resolve('oh Yeah')
// const p3 = Promise.reject('oh error le')
const pAll = Promise.race([p1, p2, p3])
console.log(pAll)
```

## 17、回调函数-异步执行

```javascript
// 存在的问题：下面代码的执行顺序应该是 11 33 22，但是按照之前自定义then函数会导致的顺序执行有误，所以需要解决
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK')
  }, 1000)
  console.log(11)
})
p1.then((value) => {
  console.log(22)
})
console.log(33)

function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callback = []
  const self = this
  function resolve(data) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.length > 0) {
      // 增加定时器回调
      setTimeout(() => {
        self.callback.forEach((item) => {
          item.onResolved(data)
        })
      })
    }
  }

  function reject(error) {
    if (self.PromiseState !== 'pending') {
      return
    }
    self.PromiseState = 'rejected'
    self.PromiseResult = error
    if (self.callback.length > 0) {
      // 增加定时器回调
      setTimeout(() => {
        self.callback.forEach((item) => {
          item.onRejected(error)
        })
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  return new Promise((resolve, reject) => {
    function callback(typeFunc) {
      try {
        let result = typeFunc(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (e) => {
              reject(e)
            },
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      // 增加定时器回调
      setTimeout(() => {
        callback(onResolved)
      })
    } else if (this.PromiseState === 'rejected') {
      // 增加定时器回调
      setTimeout(() => {
        callback(onRejected)
      })
    }
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
Promise.resolve = function (resultVal) {
  return new Promise((resolve, reject) => {
    if (resultVal instanceof Promise) {
      resultVal.then(
        (v) => {
          resolve(v)
        },
        (err) => {
          reject(err)
        },
      )
    } else {
      resolve(resultVal)
    }
  })
}
Promise.reject = function (rejectVal) {
  return new Promise((resolve, reject) => {
    reject(rejectVal)
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let resultArr = []
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(
        (result) => {
          count++
          resultArr[index] = result
          if (count === promises.length) {
            resolve(resultArr)
          }
        },
        (err) => {
          reject(err)
        },
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(
        (v) => {
          resolve(v)
        },
        (error) => {
          reject(error)
        },
      )
    }
  })
}

// 存在的问题：下面代码的执行顺序应该是 11 33 22，但是自定义then函数中导致的顺序执行有误，所以需要解决
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK')
  }, 1000)
  console.log(11)
})
p1.then((value) => {
  console.log(22)
})
console.log(33)
```

## 18、class 版本的实现

```javascript
class Promise {
  constructor(executor)
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callback = []
    const self = this
    function resolve(data) {
      if (self.PromiseState !== 'pending') {
        return
      }
      self.PromiseState = 'fulfilled'
      self.PromiseResult = data
      if (self.callback.length > 0) {
        setTimeout(() => {
          self.callback.forEach((item) => {
            item.onResolved(data)
          })
        })
      }
    }

    function reject(error) {
      if (self.PromiseState !== 'pending') {
        return
      }
      self.PromiseState = 'rejected'
      self.PromiseResult = error
      if (self.callback.length > 0) {
        setTimeout(() => {
          self.callback.forEach((item) => {
            item.onRejected(error)
          })
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    const self = this
    if (typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason
      }
    }
    if (typeof onResolved !== 'function') {
      onResolved = (value) => value
    }
    return new Promise((resolve, reject) => {
      function callback(typeFunc) {
        try {
          let result = typeFunc(self.PromiseResult)
          if (result instanceof Promise) {
            result.then(
              (v) => {
                resolve(v)
              },
              (e) => {
                reject(e)
              }
            )
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onResolved)
        })
      } else if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
      }
      if (this.PromiseState === 'pending') {
        this.callback.push({
          onResolved: function () {
            callback(onResolved)
          },
          onRejected: function () {
            callback(onRejected)
          },
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve(resultVal) {
    return new Promise((resolve, reject) => {
      if (resultVal instanceof Promise) {
        resultVal.then(
          (v) => {
            resolve(v)
          },
          (err) => {
            reject(err)
          }
        )
      } else {
        resolve(resultVal)
      }
    })
  }
  static reject(rejectVal) {
    return new Promise((resolve, reject) => {
      reject(rejectVal)
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      let resultArr = []
      for (let index = 0; index < promises.length; index++) {
        promises[index].then(
          (result) => {
            count++
            resultArr[index] = result
            if (count === promises.length) {
              resolve(resultArr)
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        promises[index].then(
          (v) => {
            resolve(v)
          },
          (error) => {
            reject(error)
          }
        )
      }
    })
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK')
  }, 1000)
  console.log(11)
})
p1.then((value) => {
  console.log(22)
})
console.log(33)
```
