# 加餐 2-手写 Promise、async await

Promise、async/await 已经逐渐成为主流的异步处理方式，所以了解其实现原理非常重要。这一课时我们就来讲讲 Promise 和 async/await 的实现。

### Promise/A+ 规范

在编写 Promise 之前，我们必须了解 Promise/A+ 规范。由于内容较长，下面我总结了几点，更详细的内容可以查阅 [Promise/A+ 规范](https://promisesaplus.com/)。

Promise 是一个对象或者函数，对外提供了一个 then 函数，内部拥有 3 个状态。

#### then 函数

then 函数接收两个函数作为可选参数：

```javascript
promise.then(onFulfilled, onRejected)
```

同时遵循下面几个规则：

- 如果可选参数不为函数时应该被忽略；
- 两个函数都应该是异步执行的，即放入事件队列等待下一轮 tick，而非立即执行；
- 当调用 onFulfilled 函数时，会将当前 Promise 的值作为参数传入；
- 当调用 onRejected 函数时，会将当前 Promise 的失败原因作为参数传入；
- then 函数的返回值为 Promise。

#### Promise 状态

Promise 的 3 个状态分别为 pending、fulfilled 和 rejected。

- pending：“等待”状态，可以转移到 fulfilled 或者 rejected 状态
- fulfilled：“执行”（或“履行”）状态，是 Promise 的最终态，表示执行成功，该状态下不可再改变。
- rejected：“拒绝”状态，是 Promise 的最终态，表示执行失败，该状态不可再改变。

#### Promise 解决过程

Promise 解决过程是一个抽象的操作，即接收一个 promise 和一个值 x，目的就是对 Promise 形式的执行结果进行统一处理。需要考虑以下 4 种情况。

**情况 1： x 等于 promise**

抛出一个 TypeError 错误，拒绝 promise。

**情况 2：x 为 Promise 的实例**

如果 x 处于等待状态，那么 promise 继续等待至 x 执行或拒绝，否则根据 x 的状态执行/拒绝 promise。

**情况 3：x 为对象或函数**

该情况的核心是取出 x.then 并调用，在调用的时候将 this 指向 x。将 then 回调函数中得到结果 y 传入新的 Promise 解决过程中，形成一个递归调用。其中，如果执行报错，则以对应的错误为原因拒绝 promise。

这一步是处理拥有 then() 函数的对象或函数，这类对象或函数我们称之为“thenable”。注意，它只是拥有 then() 函数，并不是 Promise 实例。

**情况 4：如果 x 不为对象或函数**

以 x 作为值，执行 promise。

### Promise 实现

下面我们就根据规范来逐步实现一个 Promise。

#### Promise() 函数及状态

由于 Promise 只有 3 个 状态，这里我们可以先创建 3 个“常量”来消除魔术字符串：

```javascript
var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected
```

由于 Promise 可以被实例化，所以可以定义成类或函数，这里为了增加难度，先考虑在 ES5 环境下实现，所以写成构造函数的形式。

使用过 Promise 的人肯定知道，在创建 Promise 的时候会传入一个回调函数，该回调函数会接收两个参数，分别用来执行或拒绝当前 Promise。同时考虑到 Promise 在执行时可能会有返回值，在拒绝时会给出拒绝原因，我们分别用 value 和 reason 两个变量来表示。具体代码如下：

```javascript
function Promise(execute) {
  var self = this
  self.state = PENDING
  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED
      self.value = value
    }
  }
  function reject(reason) {
    if (self.state === PENDING) {
      self.state = REJECTED
      self.reason = reason
    }
  }
  try {
    execute(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
```

我们在第 09 课时中提过，Promise 是单次执行的，所以需要判断状态为 PENDING 的时候再执行函数 resolve() 或函数 reject() 。同时 Promise 的内部异常不能直接抛出，所以要进行异常捕获。

#### then() 函数

每个 Promise 实例都有一个 then() 函数，该函数会访问 Promise 内部的值或拒绝原因，所以通过函数原型 prototype 来实现。then() 函数接收两个回调函数作为参数，于是写成下面的形式：

```javascript
Promise.prototype.then = function (onFulfilled, onRejected) {}
```

根据第 1 条原则，如果可选参数不为函数时应该被忽略，所以在函数 then() 内部加上对参数的判断：

```javascript
onFulfilled =
  typeof onFulfilled === 'function'
    ? onFulfilled
    : function (x) {
        return x
      }
onRejected =
  typeof onRejected === 'function'
    ? onRejected
    : function (e) {
        throw e
      }
```

根据第 2 条规则，传入的回调函数是异步执行的。要模拟异步，可以通过 setTimeout 来延迟执行。再根据第 3 条和第 4 条规则，应根据 Promise 的状态来执行对应的回调，执行状态下调用 onFulfilled() 函数，拒绝状态下调用 onRejected() 函数。

```javascript
var self = this
switch (self.state) {
  case FULFILLED:
    setTimeout(function () {
      onFulfilled(self.value)
    })
    break
  case REJECTED:
    setTimeout(function () {
      onRejected(self.reason)
    })
    break
  case PENDING:
    // todo
    break
}
```

等待状态下就有些麻烦了，需要等到 Promise 状态转变时才能调用。

按照常规处理方式，可以建立一个监听，监听 Promise 的状态值改变。由于浏览器环境和 Node.js 环境的事件监听不一样，考虑兼容性，这种实现会比较复杂。

换个角度来看，在不考虑异常的情况下 Promise 的状态改变只依赖于构造函数中的 resolve() 函数和 reject() 函数执行。所以可考虑将 onFulfilled() 和 onRejected() 函数先保存到 Promise 属性 onFulfilledFn 和 onRejectedFn 中，等到状态改变时再调用。

```javascript
case PENDING:
  self.onFulfilledFn = function () {
    onFulfilled(self.value);
  }
  self.onRejectedFn = function () {
    onRejected(self.reason);
  }
  break;
```

最后看第 5 条规则，then() 被调用时应该返回一个新的 Promise，所以在上面的 3 种状态的处理逻辑中，都应该创建并返回一个 Promise 实例。以执行状态为例，可以改成下面的样子。

```javascript
case FULFILLED:
  promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        onFulfilled(self.value);
      } catch (e) {
        reject(e)
      }
    })
  });
  break;
```

同时，它带来的另一个效果是**支持链式调用**。在链式调用的情况下，如果 Promise 实例处于等待状态，那么需要保存多个 resolve() 或 reject() 函数，所以 onFulfilledFn 和 onRejectedFn 应该改成数组。

```javascript
case PENDING:
  promise = new Promise(function (resolve, reject) {
    self.onFulfilledFn.push(function () {
      try {
        onFulfilled(self.value);
      } catch (e) {
        reject(e)
      }
    });
    self.onRejectedFn.push(function () {
      try {
        onRejected(self.reason);
      } catch (e) {
        reject(e)
      }
    })
  });
  break;
```

对应的，Promise 构造函数中应该初始化属性 onFulfilledFn 和 onRejectedFn 为数组，同时 resolve() 和 reject() 函数在改变状态时应该调用这个数组中的函数，并且这个调用过程应该是异步的。

```javascript
function Promise(execute) {
  ...
  self.onFulfilledFn = [];
  self.onRejectedFn = [];
  ...
  function resolve(value) {
    setTimeout(function() {
      ...
      self.onFulfilledFn.forEach(function (f) {
        f(self.value)
      })
    })
  }
  function reject(reason) {
    setTimeout(function() {
      ...
      self.onRejectedFn.forEach(function (f) {
        f(self.reason)
      })
    })
  }
}
```

#### resolvePromise() 函数

前面提到解决过程函数有两个参数及 3 种情况，先来考虑第 1 种情况，promise 与 x 相等，应该直接抛出 TypeError 错误：

```javascript
function resolvePromise(promise, x) {
  if (promise === x) {
    return reject(new TypeError('x 不能与 promise 相等'))
  }
}
```

情况 2，x 为 Promise 的实例，应该尝试让 promise 接受 x 的状态，怎么接受呢？

直接改变 promise 状态肯定是不可取的，首先状态信息属于内部变量，其次也无法调用属性 onResolvedFn 和 onFulfilledFn 中的待执行函数。所以必须要通过调用 promise 在构造时的函数 resolve() 和 reject() 来改变。

如果 x 处于等待状态，那么 promise 继续保持等待状态，等待解决过程函数 resolvePromise() 执行，否则应该用相同的值执行或拒绝 promise。我们无法从外部拒绝或执行一个 Promise 实例，只能通过调用构造函数传入的 resolve() 和 reject() 函数来实现。所以还需要把这两个函数作为参数传递到 resolvePromise 函数中。

在函数 resolvePromise() 内部加上情况 2 的判断，代码如下：

```javascript
function resolvePromise(promise, x, resolve, reject) {
  ...
  if (x instanceof Promise) {
    if (x.state === FULFILLED) {
      resolve(x.value)
    } else if (x.state === REJECTED) {
      reject(x.reason)
    } else {
      x.then(function (y) {
        resolvePromise(promise, y, resolve, reject)
      }, reject)
    }
  }
}
```

再来实现情况 3，将 x.then 取出然后执行，并将执行结果放入解决过程函数 resolvePromise() 中。 考虑到 x 可能只是一个 thenable 而非真正的 Promise，所以在调用 then() 函数的时候要设置一个变量 excuted 避免重复调用。同时记得在执行时添加异常捕获并及时拒绝当前 promise。

```javascript
if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
  var executed
  try {
    var then = x.then
    if (typeof then === 'function') {
      then.call(
        x,
        function (y) {
          if (executed) return
          executed = true
          return resolvePromise(promise, y, resolve, reject)
        },
        function (e) {
          if (executed) return
          executed = true
          reject(e)
        },
      )
    } else {
      resolve(x)
    }
  } catch (e) {
    if (executed) return
    executed = true
    reject(e)
  }
}
```

情况 4 就很简单了，直接把 x 作为值执行。

```javascript
resolve(x)
```

### Promise 测试

编写测试代码永远是一个好习惯，为了验证编写的 Promise 正确性，引用一个专门用来测试 Promise 规范性的模块 [promises-aplus-tests](https://github.com/promises-aplus/promises-tests)，该模块内置了数百个测试案例，支持命令行一键测试。只是在导出模块的时候需要遵循 CommonJS 规范，并且按照要求导出对应的函数。[最终代码地址请点击这里获取](https://github.com/yalishizhude/course/tree/master/plus2)。

测试结果如下图所示：

![image (16).png](https://s0.lgstatic.com/i/image/M00/2B/DD/CgqCHl7_DEeALZgpAAALJ4MkJtQ487.png)

### async/await

async 是 ES2017 标准推出的用于处理异步操作的关键字，从本质上来说，它就是 Generator 函数的语法糖。

#### 什么是 Generator 函数？

Generator 函数是 ES6 提出的除 Promise 之外的另一种**异步解决方案**，不同于常见的异步回调，它的用法有些“奇怪”。这里我们只简单介绍一下它的主要用法。

当声明一个 Generator 函数时，需要在 function 关键字与函数名之间加上一个星号，像下面这样：

```java
function* fn() {
  ...
}
```

当调用 Generator 函数后，函数并不会立即执行，而是返回一个迭代器对象。

- 函数体内部使用 yield 表达式，定义不同的内部状态。
- 当函数体外部调用迭代器的 next() 函数时，函数会执行到下一个 yield 表达式的位置，并返回一个对象，该对象包含属性 value 和 done，value 是调用 next() 函数时传入的参数，done 为布尔值表示是否执行完成。

下面是一个将异步回调函数改写成 Generator 函数的示例代码：

```javascript
function asyncFn(cb) {
  setTimeout(cb, 1000, 1)
}
function* fn() {
  var result = yield asyncFn(function (data) {
    it.next(data)
  })
  console.log(result) // 1
}
var it = fn()
it.next()
```

下面讲讲这段代码的执行逻辑。

- asyncFn() 是一个自定义的异步回调函数，1 秒后返回数值 1。
- 先调用 Generator 函数得到迭代器 it，但此时函数并没有执行，需要执行迭代器的 next() 函数才能调用函数 fn() 。
- Generator 函数 fn() 内部调用异步函数 asyncFn 时使用了 yield 关键字，代表此处暂停执行，等到异步函数 asyncFn 执行完成后再执行后面的代码。
- 1 秒后，匿名回调函数内部得到的返回值 1，通过 it.next() 函数返回这个值，并告诉迭代器继续执行后面的 console.log。

#### async/await 原理

虽然说 Generator 函数号称是解决异步回调问题，但却带来了一些麻烦，比如函数外部无法捕获异常，比如多个 yield 会导致调试困难。所以相较之下 Promise 是更优秀的异步解决方案。

async/await 做的事情就是将 Generator 函数转换成 Promise。下面代码描述的是 async 的实现逻辑：

```javascript
function generator2promise(generatorFn) {
  return function () {
    var gen = generatorFn.apply(this, arguments)
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function (value) {
              step('next', value)
            },
            function (err) {
              step('throw', err)
            },
          )
        }
      }
      return step('next')
    })
  }
}
```

它将 Generator 函数包装成了一个新的匿名函数，调用这个匿名函数时返回一个 Promise。在这个 Promise 内部会创建一个 step() 函数，该函数负责递归调用 Generator 函数对应的迭代器，当迭代器执行完成时执行当前的 Promise，失败时则拒绝 Promise。

### 总结

本课时通过代码实例深入分析了 Promise/A+ 规范以及 async/await 的实现原理。对于手写 Promise 的过程，重点不在于实现结果，而在于实现过程，即先理解清楚规范，然后根据规范一步一步地去实现和优化。对于 async/await 语法糖，结合 Generator 函数，理解其封装原理即可。

最后布置一道练习题：学完本课时内容后，试着自己动手写一个 Promise，看看能否通过测试用例。

---

### 精选评论

##### \*晨：

> Promise 解决过程是一个抽象的操作，即接收一个 promise 和一个值 x，目的就是对 Promise 形式的执行结果进行统一处理。需要考虑以下 3 种情况。在这里讲到的一个值 x 是什么意思呀？？这块儿的看的不是很明白

###### &nbsp;&nbsp;&nbsp; 讲师回复：

> &nbsp;&nbsp;&nbsp; 可以简单地理解为 Promise 执行成功的返回值。

##### \*\*翔：

> self.onFulfilledFn.forEach(function (f) {
> f(self.value)
> ">self.onFulfilledFn.push(function () {
> ">try {

">catch (e) {
reject(e)
}
})
老师这里的 self.value 参数可以不传的吧？我看后面也没用到呢

###### &nbsp;&nbsp;&nbsp; 讲师回复：

> &nbsp;&nbsp;&nbsp; 嗯，也可以~

##### \*\*池：

> 虽然说 Generator 函数号称是解决异步回调问题，但却带来了一些麻烦，比如函数外部无法捕获异常，比如多个 yield 会导致调试困难。所以相较之下 Promise 是更优秀的异步解决方案。老师可以举例一下 yield 调试上的困难主要体现在什么地方吗？🙌

###### &nbsp;&nbsp;&nbsp; 讲师回复：

> &nbsp;&nbsp;&nbsp; 你可以把两个异步回调函数改成类似 Promise.all 的形式进行调用试试~

##### \*蕾：

> 在决议程序中的情况判断是不是可以不写，情况 3 中已经包含了这种判断

###### &nbsp;&nbsp;&nbsp; 讲师回复：

> &nbsp;&nbsp;&nbsp; 同学，建议你试一下去掉你认为多余的判断，并执行一下测试代码~

##### 123：

> 写的很清晰

##### \*晨：

> x 为对象或函数 为什么会有 then？

###### &nbsp;&nbsp;&nbsp; 讲师回复：

> &nbsp;&nbsp;&nbsp; 比如  x = {then() {...}}，这就是一个拥有  then  函数的对象
