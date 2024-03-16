# 51-手写 Promise

我们自己封装一个 Promise 对象有一定的难度。

但是只要我们抓住封装的核心思想：**如何封装与如何使用息息相关**，事情就会变得简单。

来分析一下：

以图片加载为例，Promise 的使用如下

```javascript
function imageLoad(url) {
  const img = new Image()
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve('图片加载成功')
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
  })
}
```

封装好之后，我们就可以利用 `imageLoad` 来执行图片加载完成之后的逻辑

```javascript
imageLoad('xxx.png')
  .then((res) => {
    console.log(res) // 此时的 res 为字符串：图片加载成功
  })
  .catch((err) => {
    console.log(err) // 此时的 err 为字符串：图片加载失败
  })
```

我们要抓住的核心关键是： Promise 最终的目的是，是为了执行 then 中的回调函数，我们给它取个名字为 `then_cb`。

因此，我们就应该思考，如何在 Promise 对象内部，让 `then_cb` 执行。

显而易见，Promise 对象中，包含有原型方法 then，构造函数需要传入回调函数 `executor`：该回调函数包含两个参数，resolve 与 reject。

因此我们可以依据这些已知点，得到如下结果：

```javascript
class MyPromise {
  constructor(executor) {
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {}

  _reject(value) {}

  then(then_cb) {}
}
```

我们目的是为了让 `then_cb` 执行。因此我们要回到 `imageLoad` 里， 去思考它的执行时机在哪里？

此时我们在 `imageLoad` 中发现，执行时机，只有 `resolve`。

我们添加了一个 onload 事件的监听，当图片加载成功时，执行 resolve。

很显然，我们可以得出结论，`then_cb` 的执行需要被 resolve 触发。

但是目前来看，如果没有额外的手段，resolve 是无法执行 `then_cb` 的。要怎么办？

最简单的解决方案就是在 then 中抛出引用，在 resolve 中执行该引用。于是代码演变如下：

```javascript
class MyPromise {
  constructor(executor) {
    this.thencallback = null
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    this.thencallback(value)
  }

  _reject(value) {}

  then(then_cb) {
    this.thencallback = then_cb
  }
}
```

同理，继续演变，解决 catch 的执行问题。

```javascript
class MyPromise {
  constructor(executor) {
    this.thencallback = null
    this.rejectcallback = null
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    this.thencallback(value)
  }

  _reject(value) {
    this.rejectcallback(value)
  }

  then(then_cb, onRejected) {
    this.thencallback = then_cb
    this.rejectcallback = onRejected
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }
}
```

如果不追求别的特性的话，我们的 Promise 对象就已经封装好，并且可以使用了。

写个例子简单验证一下

```javascript
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('异常信息')
  }, 1000)
})

p.catch((res) => {
  console.log(res)
})
```

完全符合预期。

然后简单调整，模拟将 then_cb 放入队列中执行，简单调整如下：

```javascript
class MyPromise {
  constructor(executor) {
    this.thencallback = null
    this.rejectcallback = null
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    setTimeout(() => {
      this.thencallback(value)
    }, 0)
  }

  _reject(value) {
    setTimeout(() => {
      this.rejectcallback(value)
    }, 0)
  }

  then(then_cb, onRejected) {
    this.thencallback = then_cb
    this.rejectcallback = onRejected
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }
}
```

> 如果在面试中，被问到如何手写 Promise，实在想不起来，就把这段最简单的代码丢出去，基本上也能拿不错的高分啦。按照我的思路来想，十分简单。

将 Promise 的三种状态以及传递的值加入，让代码更规范一点

pending -> resolved

pending -> rejected

```javascript
const pending = 'PENDING'
const resolved = 'RESOLVED'
const rejected = 'REJECTED'

class MyPromise2 {
  constructor(executor) {
    this.thencallback = undefined
    this.rejectcallback = undefined
    this._value = undefined
    this._status = pending
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    if (!pending) return
    this._status = resolved
    this._value = value
    setTimeout(() => {
      this.thencallback(value)
    }, 0)
  }

  _reject(value) {
    if (!pending) return
    this._status = rejected
    this._value = value
    setTimeout(() => {
      this.rejectcallback(value)
    }, 0)
  }

  then(then_cb, onRejected) {
    this.thencallback = then_cb
    console.log(then_cb)
    this.rejectcallback = onRejected
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }
}

window.MyPromise2 = MyPromise2
```

then 可以多次调用，因此，缓存 then 的回调的引用，对应的应该是一个队列/数组。这样才能保证多次调用的 then_cb 都能执行。

因此，收集回调的 `then` 方法 与执行回调的 `_resolve/_reject` 都需要进行简单的调整

基于这个思路继续优化。

```javascript
const pending = 'PENDING'
const resolved = 'RESOLVED'
const rejected = 'REJECTED'

const isFunction = (fn) => typeof fn === 'function'

class MyPromise2 {
  constructor(executor) {
    this.onResolvedQueue = []
    this.onRejectedQueue = []
    this._value = undefined
    this._status = pending
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    if (!pending) return
    const run = () => {
      this._status = resolved
      let cb
      // 执行队列中收集的回调，执行一个，删除一个，
      // 队列思路：先进先出
      while ((cb = this.onResolvedQueue.shift())) {
        this._value = value
        cb(value)
      }
    }

    setTimeout(run, 0)
  }

  _reject(value) {
    if (!pending) return
    const run = () => {
      this._status = rejected
      this._value = value
      if (this.onRejectedQueue.length == 0) {
        throw new Error(value)
      }
      let cb
      while ((cb = this.onRejectedQueue.shift())) {
        cb(value)
      }
    }

    setTimeout(run, 0)
  }

  then(onResolved, onRejected) {
    // 根据不同的状态执行不同的逻辑
    if (this._status === pending) {
      if (isFunction(onResolved)) {
        this.onResolvedQueue.push(onResolved)
      }

      if (isFunction(onRejected)) {
        this.onRejectedQueue.push(onRejected)
      }
    }
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }
}

window.MyPromise2 = MyPromise2
```

验证一下，完美通过。

```javascript
const p = new MyPromise2((resolve, reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})

p.then((res) => {
  console.log(res)
})

p.then((res) => {
  console.log('2 then', res)
})

p.catch((err) => {
  console.log('catch', err)
})
```

then 方法执行之后，返回的仍然是 Promise 对象，并且可以链式调用。

这一点要如何支持呢？

先不管那么多，因为要返回的 Promise 对象，因此

```javascript
then(onResolved, onRejected) {
  const {_status, _value} = this
  return new MyPromise2((resolveNext, rejectNext) => {
 // do something
  })
}
```

而我们要谨记，then 方法是收集状态改变之后的回调逻辑，但是此时要返回新的 Promise 对象，因此回调逻辑就不仅仅只包含 onResolved 了。可能还包含其他的逻辑。

因此我们需要封装一个新的函数来顶替 onResolved 的回调。并且新的函数在条件满足的情况下要执行 onResolved。

因此，代码演变如下

```javascript
then(onResolved, onRejected) {
  const {_status, _value} = this
  return new MyPromise2((resolveNext, rejectNext) => {
    const _resolved = (value) => {
      if (xxx) {
        onResolved(value)
      }
    }

    const _rejected = (value) => {
      if (xxx) {
        onRejected(value)
      }
    }

    switch(_status) {
      // 状态为 pending 时，收集回调
      case pending:
        this.onResolvedQueue.push(_resolved)
        this.onRejectedQueue.push(_rejected)
        break
      // 状态已经改变了，就直接执行回调
      case resolved:
        _resolved(_value)
        break
      case rejected:
        _rejected(_value)
        break
    }
  })
 }
```

接下来关键就是我们重新自定义的 `_resolved` 的内部逻辑应该怎么办的问题。

而这个也要结合使用来看。

关键就在于要思考 then 的第一个参数，是否是函数，并且，该函数的返回值类型是什么来判断。

逻辑如下：

```javascript
const _resolved = (value) => {
  try {
    if (!isFunction(onResolved)) {
      resolveNext(value)
    } else {
      const res = onResolved(value)
      if (res instanceof MyPromise2) {
        res.then(resolveNext, rejectNext)
      } else {
        resolveNext(res)
      }
    }
  } catch (err) {
    rejectNext(err)
  }
}
```

于是完整代码新鲜出炉

```javascript
const pending = 'PENDING'
const resolved = 'RESOLVED'
const rejected = 'REJECTED'

const isFunction = (fn) => typeof fn === 'function'

class MyPromise2 {
  constructor(executor) {
    this.onResolvedQueue = []
    this.onRejectedQueue = []
    this._value = undefined
    this._status = pending
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    if (!pending) return
    const run = () => {
      this._status = resolved
      let cb
      // 执行队列中收集的回调，执行一个，删除一个，
      // 队列思路：先进先出
      while ((cb = this.onResolvedQueue.shift())) {
        this._value = value
        cb(value)
      }
    }

    setTimeout(run, 0)
  }

  _reject(value) {
    if (!pending) return
    const run = () => {
      this._status = rejected
      this._value = value
      if (this.onRejectedQueue.length == 0) {
        throw new Error(value)
      }
      let cb
      while ((cb = this.onRejectedQueue.shift())) {
        cb(value)
      }
    }

    setTimeout(run, 0)
  }

  then(onResolved, onRejected) {
    const { _status, _value } = this
    return new MyPromise2((resolveNext, rejectNext) => {
      const _resolved = (value) => {
        try {
          if (!isFunction(onResolved)) {
            resolveNext(value)
          } else {
            const res = onResolved(value)
            if (res instanceof MyPromise2) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (err) {
          rejectNext(err)
        }
      }

      const _rejected = (value) => {
        try {
          if (!isFunction(onRejected)) {
            rejectNext(value)
          } else {
            const res = onRejected(value)
            if (res instanceof MyPromise2) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (err) {
          rejectNext(err)
        }
      }

      switch (_status) {
        // 状态为 pending 时，收集回调
        case pending:
          this.onResolvedQueue.push(_resolved)
          this.onRejectedQueue.push(_rejected)
          break
        // 状态已经改变了，就直接执行回调
        case resolved:
          _resolved(_value)
          break
        case rejected:
          _rejected(_value)
          break
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

window.MyPromise2 = MyPromise2
```

再次验证一下，完整通过测试。链式调用生效。

```javascript
const p = new MyPromise2((resolve, reject) => {
  setTimeout(() => {
    resolve('World')
  }, 1000)
})

p.then((res) => {
  console.log('1 then：', res)
  return 'hello ' + res
})
  .then((res) => {
    console.log('2 then：', res)
  })
  .catch((err) => {
    console.log('catch', err)
  })
```

Promise 的封装是不是很简单！

这里我们运用的核心方法，是通过使用结果，反向思考封装逻辑应该如何处理。

这种思考方式在实践中非常有用，往往怎么使用，就决定了怎么封装。

用同样的思考，继续添加 Promise 的几个静态方法。

```javascript
// 添加静态方法：resolve
static resolve(value) {
  // 如果参数是MyPromise实例，直接返回这个实例
  if (value instanceof MyPromise2) return value
  // 如果参数是thenable对象，则返回一个Promise对象，并且其回调为thenable对象中的then属性
  if (value && value.then && isFunction(value.then)) return new MyPromise2(value.then)
  // 其他情况
  return new MyPromise2(resolve => resolve(value))
}
// 添加静态方法：reject
static reject(err) {
  return new MyPromise2((resolve, reject) => reject(err))
}
// 添加静态方法：all
static all(list) {
  return new MyPromise2((resolve, reject) => {
    // 返回值的集合
    let values = []
    let count = 0
    // 兼容String类型
    typeof list === 'string' ? list = list.split('') : ''
    for (let [i, p] of list.entries()) {
      // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
      this.resolve(p).then(res => {
        values[i] = res
        count++
        // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
        if (count === list.length) resolve(values)
      }, err => {
        // 有一个被rejected时返回的MyPromise状态就变成rejected
        reject(err)
      })
    }
  })
}
// 添加静态方法：race
static race(list) {
  return new MyPromise2((resolve, reject) => {
    // 兼容String类型
    typeof list === 'string' ? list = list.split('') : ''
    for (let p of list) {
      // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
      this.resolve(p).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    }
  })
}
// 添加done方法
done(onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => {
        throw reason
      }, 0)
    })
}
// 添加finally方法
finally(callback) {
  let P = this.constructor
  return this.then(value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
```
