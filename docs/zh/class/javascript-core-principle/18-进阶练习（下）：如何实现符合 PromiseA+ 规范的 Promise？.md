# 18-进阶练习（下）：如何实现符合 Promise/A+ 规范的 Promise？

我在上一讲带你实现了一个浏览器端的 EventEmitter，那么这一讲还是继续进阶，我们来实现一个符合 Promise/A+ 规范的 Promise。

其实在“14 | 异步编程（中）：如何深入理解异步编程的核心 Promise”中，我已经专门介绍了 Promise 的基本原理和使用情况。由于 Promise 在异步编程中的重要性不言而喻，因此在很多互联网大厂面试中，
现场实现 Promise 相关方法的题目经常会出现，比如 all、race 或者 any 等。

因此这一讲，我将要带你一步步实现一个符合标准的 Promise，希望你在遇到相关题目时能够游刃有余。

在课程开始前请你先思考一下：

- Promise/A+ 约定了哪些规范？
- 在手动实现 Promise 的过程中都遇到过哪些问题？

在开始手动实现 Promise 之前，你有必要先了解 Promise/A+ 的规范。

## 1. Promise/A+ 规范

只有对规范进行解读并且形成明确的认知，才能更好地实现 Promise。官方的地址为：[https://promisesaplus.com](https://promisesaplus.com/) 这是一个英文的版本，我把其中比较关键的部分挑了出来。

### 1.1. 术语

先来看看 Promise/A+ 规范的基本术语，如下所示。

“promise” is an object or function with a then method whose behavior conforms to this specification.
“thenable” is an object or function that defines a then method.
“value” is any legal JavaScript value (including undefined, a thenable, or a promise).
“exception” is a value that is thrown using the throw statement.
“reason” is a value that indicates why a promise was rejected.

翻译过来，它所描述的就是以下五点。

- “`promise`”：是一个具有 `then `方法的对象或者函数，它的行为符合该规范。
- “`thenable`”：是一个定义了 `then `方法的对象或者函数。
- “`value`”：可以是任何一个合法的 `JavaScript `的值（包括 `undefined`、`thenable `或 `promise`）。
- “`exception`”：是一个异常，是在 `Promise `里面可以用 `throw `语句抛出来的值。
- “`reason`”：是一个 `Promise `里 `reject `之后返回的拒绝原因。

### 1.2. 状态描述

看完了术语部分，我们再看下Promise/A+ 规范中，对 Promise 的内部状态的描述，如下所示。

A promise must be in one of three states: pending, fulfilled, or rejected.
When pending, a promise:
may transition to either the fulfilled or rejected state.
When fulfilled, a promise:
must not transition to any other state.
must have a value, which must not change.
When rejected, a promise:
must not transition to any other state.
must have a reason, which must not change.
Here, “must not change” means immutable identity (i.e. ===), but does not imply deep immutability.

将上述描述总结起来，大致有以下几点。

- 一个 `Promise `有三种状态：`pending`、`fulfilled `和 `rejected`
- 当状态为 `pending `状态时，即可以转换为 `fulfilled `或者 `rejected `其中之一。
- 当状态为 `fulfilled `状态时，就不能转换为其他状态了，必须返回一个不能再改变的值。
- 当状态为 `rejected `状态时，同样也不能转换为其他状态，必须有一个原因的值也不能改变。

### 1.3. then 方法

关于 then 方法的英文解读和翻译，我直接总结了出来：**一个 Promise 必须拥有一个 then 方法来访问它的值或者拒绝原因。**

then 方法有两个参数：

```javascript
promise.then(onFulfilled, onRejected)
```

`onFulfilled `和 `onRejected `都是可选参数。

- 如果 `onFulfilled `是函数，则当 `Promise `执行结束之后必须被调用，最终返回值为 `value`，其调用次数不可超过一次
- `onRejected `除了最后返回的是 `reason `外，其他方面和 `onFulfilled `在规范上的表述基本一样

### 1.4. onFulfilled 和 onRejected 特性

如果 onFulfilled 是函数，则当 Promise 执行结束之后必须被调用，最终返回值为 value，其调用次数不可超过一次。

而 onRejected 除了最后返回的是 reason 外，其他方面和 onFulfilled 在规范上的表述基本一样。

### 1.5. 多次调用 

`then` 方法其实可以被一个 `Promise `调用多次，且必须返回一个 `Promise `对象。`then `的写法如下所示，其中 `Promise1 `执行了 `then `的方法之后，返回的依旧是个 `Promise2`，然后我们拿着 `Promise2 `又可以执行 `then `方法，而 `Promise2 `是一个新的 `Promise `对象，又可以继续进行 `then `方法调用。

```javascript
promise2 = promise1.then(onFulfilled, onRejected);
```

规范里面还有很大一部分讲解的是 Promise 的解决过程。其实只看规范的话，整体感觉很空洞，方才我已经将规范的主要部分为你讲解了，这些内容基本可以指导我们自己实现一个 Promise 了。

那么下面我们就理论结合实践，动手实现一个 Promise 吧。

## 2. 一步步实现 Promise

按照 Promise/A+ 的规范，第一步就是构造函数。

### 2.1. 构造函数

这一步的思路是：Promise 构造函数接受一个 executor 函数，executor 函数执行完同步或者异步操作后，调用它的两个参数 resolve 和 reject。请看下面的代码，大致的构造函数框架就是这样的。

```javascript
function Promise(executor) {
  var self = this
  self.status = ‘pending’ // Promise当前的状态
  self.data = undefined // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集
  self.onRejectedCallback = [] // Promise reject时的回调函数集
  executor(resolve, reject) // 执行executor并传入相应的参数
}
```

从上面的代码中可以看出，我们先定义了一个 Promise 的初始状态 pending，以及参数执行函数 executor，并且按照规范设计了一个 resolve 回调函数集合数组 onResolvedCallback 以及 一个 reject 回调函数集合数组，那么构造函数的初始化就基本完成了。

接下来我们看看还需要添加什么东西呢？那就是需要在构造函数中完善 resolve 和 reject 两个函数，完善之后的代码如下。

```javascript
function Promise(executor) {
  var self = this
  self.status = ‘pending’ // Promise当前的状态
  self.data = undefined // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集
  self.onRejectedCallback = [] // Promise reject时的回调函数集
  function resolve(value) {
    // TODO
  }
  function reject(reason) {
    // TODO
  }
  try { // 考虑到执行过程中有可能出错，所以我们用try/catch块给包起
    executor(resolve, reject) // 执行executor
  } catch(e) {
    reject(e)
  }
}
```

resolve 和 reject 内部应该怎么实现呢？我们根据规范知道这两个方法主要做的事情就是返回对应状态的值 value 或者 reason，并把 Promise 内部的 status 从 pending 变成对应的状态，并且这个状态在改变了之后是不可以逆转的。

那么这两个函数应该怎么写呢？可以看下面的这段代码。

```javascript
function Promise(executor) {
  // …上面的省略
  function resolve(value) {
    if (self.status === ‘pending’) {
      self.status = ‘resolved’
      self.data = value
      for(var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallbacki
      }
    }
  }

  function reject(reason) {
    if (self.status === ‘pending’) {
      self.status = ‘rejected’
      self.data = reason
      for(var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallbacki
      }
    }
  }
  // 下面的省略
}
```

上述代码所展示的，基本就是在判断状态为 pending 之后，把状态改为相应的值，并把对应的 value 和 reason 存在内部的 data 属性上面，之后执行相应的回调函数。逻辑比较简单，无非是由于 onResolveCallback 和 onRejectedCallback 这两个是数组，需要通过循环来执行，这里就不多解释了，你应该会知道。

好了，构造函数基本就实现了，那么我们再看看如何实现 then 方法，从而保证可以实现链式调用。

### 2.2. 实现 then 方法

根据标准，我们要考虑几个问题。

**then 方法是 Promise 执行完之后可以拿到 value 或者 reason 的方法**，并且还要保持 then 执行之后，返回的依旧是一个 Promise 方法，还要支持多次调用（上面标准中提到过）。

因此 then 方法实现的思路也有了，请看下面的一段代码。

```javascript
// then方法接收两个参数onResolved和onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  // 根据标准，如果then的参数不是function，则需要忽略它
  onResolved = typeof onResolved === ‘function’ ? onResolved : function(v) {}
  onRejected = typeof onRejected === ‘function’ ? onRejected : function(r) {}
  if (self.status === ‘resolved’) {
    return promise2 = new Promise(function(resolve, reject) {})
  }
  if (self.status === ‘rejected’) {
    return promise2 = new Promise(function(resolve, reject) {})
  }
  if (self.status === ‘pending’) {
    return promise2 = new Promise(function(resolve, reject) {})
  }
}
```

从上面的代码中可以看到，我们在 then 方法内部先初始化了 Promise2 的对象，用来存放执行之后返回的 Promise，并且**还需要判断 then 方法传参进来的两个参数必须为函数，这样才可以继续执行**。

上面我只是搭建了 then 方法框架的整体思路，但是不同状态的返回细节处理也需要完善，通过仔细阅读标准，完善之后的 then 的代码如下。

```javascript
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  // 根据标准，如果then的参数不是function，则需要忽略它
  onResolved = typeof onResolved === ‘function’ ? onResolved : function(value) {}
  onRejected = typeof onRejected === ‘function’ ? onRejected : function(reason) {}
  if (self.status === ‘resolved’) {
    // 如果promise1的状态已经确定并且是resolved，我们调用onResolved，
    // 考虑到有可能throw，所以还需要将其包在try/catch块里
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) {
          // 如果onResolved的返回值是一个Promise对象，直接取它的结果作为promise2的结果
          x.then(resolve, reject)
        }
        resolve(x) // 否则，以它的返回值作为promise2的结果
      } catch (e) {
        reject(e) // 如果出错，以捕获到的错误作为promise2的结果
      }
    })
  }
  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数
  if (self.status === ‘rejected’) {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  if (self.status === ‘pending’) {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确定如何处理
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
```

根据上面的代码可以看出，我们基本实现了一个符合标准的 then 方法。但是标准里提到了，还要支持不同的 Promise 进行交互，关于不同的 Promise 交互其实Promise 标准说明中有提到。其中详细指定了如何通过 then 的实参返回的值来决定 Promise2 的状态。

关于为何需要不同的 Promise 实现交互，原因应该是 Promise 并不是 JS 一开始存在的标准，如果你使用的某一个库中封装了一个 Promise 的实现，想象一下如果它不能跟你自己使用的 Promise 实现交互的情况，其实还是会有问题的，因此我们还需要调整一下 then 方法中执行 Promise 的方法。

另外还有一个需要注意的是，在 Promise/A+ 规范中，onResolved 和 onRejected 这两项函数需要异步调用，关于这一点，标准里面是这么说的：

In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack.

所以我们需要对代码做一点变动，即在处理 Promise 进行 resolve 或者 reject 的时候，加上 setTimeout(fn, 0)。

下面我就结合上面两点调整，给出完整版的代码，你可以根据注释关注一下我所做的调整。

### 2.3. 完整版的代码

```javascript
try {
  module.exports = Promise
} catch (e) {
}
function Promise(executor) {
  var self = this
  self.status = ‘pending’
  self.onResolvedCallback = []
  self.onRejectedCallback = []
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === ‘pending’) {
        self.status = ‘resolved’
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallbacki
        }
      }
    })
  }
  function reject(reason) {
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === ‘pending’) {
        self.status = ‘rejected’
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallbacki
        }
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false
  if (promise2 === x) {
    return reject(new TypeError(‘Chaining cycle detected for promise!’))
  }
  if (x instanceof Promise) {
    if (x.status === ‘pending’) {
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }
  if ((x !== null) && ((typeof x === ‘object’) || (typeof x === ‘function’))) {
    try {
      then = x.then
      if (typeof then === ‘function’) {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  onResolved = typeof onResolved === ‘function’ ? onResolved : function(v) { return v }
  onRejected = typeof onRejected === ‘function’ ? onRejected : function(r) { throw r }
  if (self.status === ‘resolved’) {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onResolved
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  if (self.status === ‘rejected’) {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onRejected
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  if (self.status === ‘pending’) {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，
    // 而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
    })
  }
}
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}
// 最后这个是测试用的，后面会说
Promise.deferred = Promise.defer = function() {
  var dfd = {}
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
```

上面这段代码就是通过一步步优化调整出来的最终版，其中细节也是比较多的，介于篇幅问题，暂时能讲的点就先说这么多。如果你还有哪里不清楚的，最好还是动手实践去理解。

最终版的 Promise 的实现还是需要经过规范的测试（Promise /A+ 规范测试的工具地址为：https://github.com/promises-aplus/promises-tests），需要暴露一个 deferred 方法（即 exports.deferred 方法），上面提供的代码中我已经将其加了进去。

最后，执行如下代码 npm 安装之后，即可执行测试。

```javascript
npm i -g promises-aplus-tests
promises-aplus-tests Promise.js
```

## 3. 总结

讲到这里，你可以再思考一下 Promise /A+ 规范中的一些细节，以及实现过程中需要注意的问题，如果你能够在面试中实现一个这样的 Promise，就基本可以满足岗位的需求了。

通过这一讲的学习，你应该能理解 Promise 底层的实现逻辑了，虽然并不一定有场景适合落地业务，但是整个手动实现的过程对于你 JS 编码能力的提升会很有帮助。

关于 Promise 还有很多 API 的方法，在已经实现的 Promise 的版本之上，你可以再尝试实现 all、race 以及 any 等方法，学会举一反三，才能在工作中游刃有余。

下一讲开始，我们就要进入一个新的模块——JS 引擎篇，我要带你了解 JS 引擎中的垃圾回收机制、事件轮询等，这对于写出高性能的 JavaScript 代码有着很好的帮助。

我们到时见。