# 50-promise

Promise 是一种简单的状态机实现。

当我们在实践中，涉及到一个状态，因为条件的不同而可能会产生两种不可逆的结果时，我们就会想到使用 Promise 来解决问题

因此，Promise 有三种状态：等待结果，结果 1，结果 2

例如你向暗恋对象表白时，发出一个想跟对方交往的请求，就会有三种状态

1. 还没有正面回答或者跟你说我在想想：pending
2. 同意跟你交往 fulfilled
3. 拒绝跟你交往 rejected

promise 表达的就是从发起请求开始，从没结果 pending 到 有结果 fulfilled/rejected 的这样一个过程

结果可能是请求被同意，可能是请求被拒绝。

在 promise 内部，使用 resolve 方法来同意请求，状态变成 fulfilled，使用 reject 方法来拒绝请求，状态变成 rejected。

> 在我初学的时候，同意请求之后状态变成了 fulfilled 让我感到非常困惑。为什么不是 resolved 的呢？这个小的细节让我在初学时感到很难受，因此为了统一概念，**我在文中，将表达被同意状态的单词 fulfilled 修改成了 resolved。**标准的文档中，使用 fulfilled / onFulfilled 来表示

```javascript
- resolve() -> fulfilled
+ resolve() -> resolved
  reject() -> rejected
```

单独的使用**完成**来表达状态并不准确，准确的表达应该是**请求被同意**，**请求被拒绝**

在实践中，Promise 是一个非常重要的概念，我们常常会使用 Promise 来解决反馈结果需要等待的场景。例如，前端向服务端发送一个接口请求。请求结果不会马上返回，而是需要等待一段时间。

例如，加载图片，需要等待一段时间。

例如，弹窗组件中，等待用户点击确认或者取消。

## 1-同步与异步

在代码的执行过程中，会涉及到两个不同的概念，**同步与异步**。

同步是指当发起一个请求时，如果未得到请求结果，代码逻辑将会等待，直到结果出来为止才会继续执行之后的代码。

异步是指当发起一个请求时，不会等待请求结果，直接继续执行后面的代码。请求结果的处理逻辑，会添加一个监听，等到反馈结果出来之后，在回调函数中处理对应的逻辑。

我们可以用一个两人问答的场景来比喻异步与同步。 A 向 B 问了一个问题之后，然后就笑呵呵的等着 B 回答，B 回答了之后他才会接着问下一个问题，这是同步。

A 向 B 问了一个问题之后，不等待 B 的回答，接着问下一个问题，这是异步。

在 JavaScript 中，也可以用代码来表示他们之间的区别。

读取文件内容需要花费一定的时间。因此要得到结果就需要等待一段时间。

同步的处理方式：

```javascript
// 伪代码
console.log('开始读取')
const res = readFileSync('a.txt')
console.log('读取结束，现在能拿到读取内容。')

// 输出结果：
// 开始读取
// 读取结束，现在能拿到读取内容。
```

异步的处理方式：

```javascript
// 伪代码
console.log('开始读取')
readFile((res) => {
  console.log('读取结束，现在能拿到读取内容。')
})
console.log('读取未结束，现在不能拿到读取内容，但是后续的逻辑继续执行。')

// 输出结果：
// 开始读取
// 读取未结束，现在不能拿到读取内容，但是后续的逻辑继续执行。
// 读取结束，现在能拿到读取内容。
```

也可以直接使用 Promise 来解读。

首先使用 `Promise` 模拟一个发起请求的函数，该函数执行后，将会 1s 之后返回数值 30。

```javascript
function fn() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(30)
    }, 1000)
  })
}
```

在该函数的基础上，我们可以使用 `async/await` 语法来模拟同步的效果。

```javascript
var foo = async function () {
  var t = await fn()
  console.log(t)
  console.log('next code')
}

foo()
```

输出结果为

```javascript
// 1s之后依次输出
30
next code
```

而异步效果则会有不同的输出结果。

```javascript
var foo = function () {
  fn().then(function (resp) {
    console.log(resp)
  })
  console.log('next code')
}
```

输出结果

```javascript
next code
// 停顿1s后继续输出
30
```

## 2-Promise

**ajax**

ajax 是网页与服务端进行数据交互的一种技术。

我们可以通过服务端提供的接口，利用 ajax 向服务端请求需要的数据。

整个过程的简单实现如下：

```javascript
// 简单的ajax原生实现

// 由服务端提供的接口
var url = 'http://www.demo.com/user/info'

var result

var XHR = new XMLHttpRequest()
XHR.open('GET', url, true)
XHR.send()

XHR.onreadystatechange = function () {
  if (XHR.readyState == 4 && XHR.status == 200) {
    result = XHR.response
    console.log(result)
  }
}
```

在 ajax 的原生实现中，利用了 onreadystatechange 事件，当该事件触发并且符合一定条件时，就能拿到我们想要的数据，之后我们才能开始处理数据。

我们发现，这其实就是一个异步操作。

这样做看上去并没有什么麻烦，但是如果这个时候，我们还需要做另外一个 ajax 请求，这个新的 ajax 请求的其中一个参数，得从上一个 ajax 请求中获取，这个时候我们就不得不如下这样做：

```javascript
var url = 'http://www.demo.com/user/info';
var result;

var XHR = new XMLHttpRequest();
XHR.open('GET', url, true);
XHR.send();

XHR.onreadystatechange = function() {
  if (XHR.readyState == 4 && XHR.status == 200) {
    result = XHR.response;
    console.log(result);

    // 伪代码
    var url2 = 'http:xxx.yyy.com/zzz?ddd=' + result.someParams;
    var XHR2 = new XMLHttpRequest();
    XHR2.open('GET', url, true);
    XHR2.send();
    XHR2.onreadystatechange = function() {
        ...
    }
  }
}
```

当出现第三个 ajax (甚至更多)仍然依赖上一个请求的时候，代码就变成了一场灾难。

我们需要不停的嵌套回调函数，以确保下一个接口所需要的参数的正确性。这样的灾难，我们称之为 **回调地狱**。

`Promise` 可以帮助我们解决这个问题。

我们知道，如果要确保某代码在谁之后执行，可以利用函数调用栈，将想要执行的代码放入回调函数中。

```javascript
// 一个简单的封装
function want() {
  console.log('这是你想要执行的代码')
}

function fn(want) {
  console.log('这里表示执行了一大堆各种代码')

  // 其他代码执行完毕，最后执行回调函数
  want && want()
}

fn(want)
```

除此之外，还可以利用队列机制。

```javascript
function want() {
  console.log('这是你想要执行的代码')
}

function fn(want) {
  // 将想要执行的代码放入队列中，根据事件循环的机制，我们就不用非得将它放到最后面了，由你自由选择
  want && setTimeout(want, 0)
  console.log('这里表示执行了一大堆各种代码')
}

fn(want)
```

与 setTimeout 类似，Promise 也可以认为是一种任务分发器，它将任务分配到 Promise 队列中，通常的流程是我们会首先发起一个请求，然后等待(等待时间我们无法确定)并处理请求结果。

简单的用法大概如下：

```javascript
var tag = true
var p = new Promise(function (resolve, reject) {
  if (tag) {
    resolve('tag is true')
  } else {
    reject('tag is false')
  }
})

p.then(function (result) {
  console.log(result)
}).catch(function (err) {
  console.log(err)
})
```

运行这段代码，并通过修改`tag`的值来感受一下运行结果的不同。

然后接下来我们来了解 Promise 的相关基础知识。

**创建**

使用 `new Promise()` 可以创建一个 Promise 实例。

```
const p = new Promise()
```

`Promise` 函数中的第一个参数为一个回调函数，我们也可以称之为 `executor`。通常情况下，在这个函数中，我们将会执行发起请求操作，并修改结果的状态值。

```javascript
const p = new Promise((resolve, reject) => {
  if (true) {
    resolve()
  }
  if (false) {
    reject()
  }
})
```

promise 有三种状态，他们分别是

- `pending` 请求等待中，表示还没有得到结果
- `resolved` 得到了我们想要的结果，请求被同意
- `rejected` 得到了我们不想要的结果，请求被拒绝

promise 的默认状态为 `pending`

在 `executor` 函数中，我们可以分别使用 `resolve` 与 `reject` 将状态修改为对应的 `resolved` 与`rejected`。

`resolve、reject` 是 `executor` 函数的两个参数。他们能够将请求结果的具体数据传递出去。

**then**

Promise 实例拥有的 `then` 方法，用来处理当请求结果的状态变成 `resolved` 时的逻辑。`then` 的第一个参数也为一个回调函数，该函数的参数则是 `resolve` 传递出来的数据。在上面的例子中，`result` 的值为 `tag is true`。

then 方法执行返回一个新的 Promise 对象。因此 then 方法支持链式调用，上一个 then 方法中的回调函数的返回值，将传递给下一个 then 方法

```javascript
Promise.resolve('abc')
  .then((string) => {
    return string + 'defg'
  })
  .then((res) => {
    console.log(res)
    // res: abcdefg
  })
```

**catch**

Promise 实例拥有的 `catch` 方法，用来处理当请求结果的状态变成 `rejected` 时的逻辑。`catch` 的第一个参数也为一个回调函数，该函数的参数则是 `reject` 传递出来的数据。在上面的例子中，`err = tag is false`。

下面通过几个简单的例子来感受一下 Promise 的用法。

例子 1：

```javascript
function fn(num) {
  // 创建一个Promise实例
  return new Promise(function (resolve, reject) {
    if (typeof num == 'number') {
      // 修改结果状态值为resolved
      resolve()
    } else {
      // 修改结果状态值为rejected
      reject()
    }
  })
    .then(function () {
      console.log('参数是一个number值')
    })
    .catch(function () {
      console.log('参数不是一个number值')
    })
}

// 修改参数的类型观察输出结果
fn('12')

// 注意观察该语句的执行顺序
console.log('next code')
```

例子 2：

```javascript
function fn(num) {
  return new Promise(function (resolve, reject) {
    // 模拟一个请求行为，2s以后得到结果
    setTimeout(function () {
      if (typeof num == 'number') {
        resolve(num)
      } else {
        var err = num + ' is not a number.'
        reject(err)
      }
    }, 2000)
  })
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

// 修改传入的参数类型观察结果变化
fn('abc')

// 注意观察该语句的执行顺序
console.log('next code')
```

因为 fn 函数运行的结果是返回的一个 Promise 对象，因此我们也可以将上面的例子修改如下：

```javascript
function fn(num) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof num == 'number') {
        resolve(num)
      } else {
        var err = num + ' is not a number.'
        reject(err)
      }
    }, 2000)
  })
}

fn('abc')
  .then(function (resp) {
    console.log(resp)
  })
  .catch(function (err) {
    console.log(err)
  })

// 注意观察该语句的执行顺序
console.log('next code')
```

`then` 方法可以接收两个参数，第一个参数用来处理`resolved`状态的逻辑，第二个参数用来处理 `rejected` 状态的逻辑。

```javascript
// 修改上面例子中的部分代码
fn('abc').then(
  function (resp) {
    console.log(resp)
  },
  function (err) {
    console.log(err)
  },
)
```

因此`catch`方法其实与下面的写法等价。

```javascript
fn('abc').then(null, function (err) {
  console.log(err)
})
```

`then` 方法因为返回的仍然是一个 Promise 实例对象，因此 then 方法可以嵌套使用，在这个过程中，通过在内部函数末尾 `return` 的方式，能够将数据持续往后传递。下面的例子中，注意观察数据传递过程中的变化。

```javascript
function fn(num) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof num == 'number') {
        resolve(num)
      } else {
        var err = num + ' is not a number.'
        reject(err)
      }
    }, 2000)
  })
}

fn(20)
  .then(function (result) {
    console.log(result) //20
    return result + 1
  })
  .then(function (result) {
    console.log(result) // 21
    return result + 1
  })
  .then(function (result) {
    console.log(result) // 22
    return result + 1
  })
  .then(function (result) {
    console.log(result) // 23
  })
  .then(function (result) {
    console.log(result) // undefined
  })

// 注意观察该语句的执行顺序
console.log('next code')
```

OK，了解了这些基础知识之后，我们再回过头来看看最开始我们提到过的 `ajax` 的例子。我们可以进行一个简单的封装。详细见代码。

```javascript
var url = 'http://www.demo.com/user/info'

// 封装一个get请求的方法
function getJSON(url) {
  return new Promise(function (resolve, reject) {
    // 利用ajax发送一个请求
    var XHR = new XMLHttpRequest()
    XHR.open('GET', url, true)
    XHR.send()

    // 等待结果
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4) {
        if (XHR.status == 200) {
          try {
            var response = JSON.parse(XHR.responseText)
            //  得到正确的结果修改状态并将数据传递出去
            resolve(response)
          } catch (e) {
            reject(e)
          }
        } else {
          // 得到错误结果并抛出异常
          reject(new Error(XHR.statusText))
        }
      }
    }
  })
}

// 封装好之后，使用就很简单了
getJSON(url).then(function (resp) {
  console.log(resp)
  // 之后就是处理数据的具体逻辑
})
```

现在所有的库几乎都将 ajax 请求利用 Promise 进行了封装，当然也包括 jQuery，因此我们在使用 jQuery 等库中的 ajax 请求时，都可以利用 Promise 来让我们的代码更加优雅和简单。

```javascript
$.get(url)
  .then(function (resp) {
    // ... 处理success的结果
  })
  .catch(function (err) {
    // ...
  })
```

**Promise.all**

当有一个 ajax 请求，它的参数需要另外 2 个甚至更多请求都有返回结果之后才能确定，那么这个时候，就需要用到 Promise.all 来帮助我们应对这个场景。

`Promise.all` 接收一个由 Promise 对象组成的数组作为参数，当这个数组所有的 Promise 对象状态都变成 resolved 或者 rejected 的时候，它才会去调用 then 方法。

```javascript
var url = 'http://www.demo.com/user/info'
var url1 = 'http://www.demo.com/shop'

function renderAll() {
  return Promise.all([getJSON(url), getJSON(url1)])
}

renderAll().then(function (value) {
  // 建议大家在浏览器中看看这里的value值
  console.log(value)
})
```

#### Promise.race

与 Promise.all 相似的是，Promise.race 都是以一个 Promise 对象组成的数组作为参数，不同的是，只要当数组中的其中一个 Promsie 状态变成 resolved 或者 rejected 时，就可以调用.then 方法了。而传递给 then 方法的值也会有所不同，大家可以再浏览器中运行下面的例子与上面的例子进行对比。

```javascript
function renderRace() {
  return Promise.race([getJSON(url), getJSON(url1)])
}

renderRace().then(function (value) {
  console.log(value)
})
```

**async/await**

异步问题除了可以使用前面学到的 `Promise` 来解决之外，我们还可以用 `async/await` 来搞定。

`async/await` 是 ES7 中新增的新语法。虽然现在最新的 chrome 浏览器已经支持了该语法，但是在实际使用中，我们需要在构建工具中配置对该语法的支持才能放心使用。因此如果你目前的开发经验还没有涉及到构建工具的使用，你可以暂时跳过该语法的学习。

在函数声明的前面，加上关键字 `async`，这就是 `async` 的具体使用。

```javascript
async function fn() {
  return 30
}

// 或者
const fn = async () => {
  return 30
}
```

我们可以打印出 fn 函数的运行结果

```javascript
console.log(fn())

// result
Promise = {
  __proto__: Promise,
  [[PromiseStatus]]: 'resolved',
  [[PromiseValue]]: 30,
}
```

发现 fn 函数运行返回的是一个标准的 `Promise` 对象。因此我们可以猜想到，`async` 其实是 Promise 的一个语法糖，目的是为让写法更加简单。于是，我们就可以使用 `Promise` 的相关语法来处理后续的逻辑。

```javascript
fn().then((res) => {
  console.log(res) // 30
})
```

await 的含义为等待。意思就是代码需要等待 await 后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果。

但是我们需要注意的是，await 关键字只能在 async 函数中使用。并且 await 后面的函数运行后必须返回一个 Promise 对象才能实现同步的效果。

当我们使用一个变量去接收 await 的返回值时，该返回值为 Promise 中 resolve 传递出来的值（也就是 PromiseValue）。

```javascript
// 定义一个返回Promise对象的函数
function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(30)
    }, 1000)
  })
}

// 然后利用async/await来完成代码
const foo = async () => {
  const t = await fn()
  console.log(t)
  console.log('next code')
}

foo()

// result:
// 30
// next code
```

运行这个例子我们可以看出，当在 async 函数中，运行遇到 await 时，就会等待 await 后面的函数运行完毕，而不会直接执行 next code。

如果我们直接使用 then 方法的话，想要达到同样的结果，就不得不把后续的逻辑写在 then 方法中。

```javascript
const foo = () => {
  return fn().then((t) => {
    console.log(t)
    console.log('next code')
  })
}

foo()
```

很显然如果使用 async/await 的话，代码结构会更加简洁，逻辑也更加清晰。

**异常处理**

在 Promise 中，我们知道是通过 catch 的方式来捕获异常。而当我们使用 async 时，则通过 try/catch 来捕获异常。

```javascript
function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('some error.')
    }, 1000)
  })
}

const foo = async () => {
  try {
    await fn()
  } catch (e) {
    console.log(e) // some error
  }
}

foo()
```

如果有多个 await 函数，那么只会返回第一个捕获到的异常。

```javascript
function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('some error fn1.')
    }, 1000)
  })
}

function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('some error fn2.')
    }, 1000)
  })
}

const foo = async () => {
  try {
    await fn1()
    await fn2()
  } catch (e) {
    console.log(e) // some error fn1.
  }
}

foo()
```

在实践中我们遇到异步场景最多的就是接口请求，那么这里就以 jquery 中的 $.get 为例简单展示一下如何配合 async/await 来解决这个场景。

```javascript
// 先定义接口请求的方法，由于jquery封装的几个请求方法都是返回Promise实例，因此可以直接使用await函数实现同步
const getUserInfo = () => $.get('xxxx/api/xx')

const clickHandler = async () => {
  try {
    const resp = await getUserInfo()
    // resp为接口返回内容，接下来利用它来处理对应的逻辑
    console.log(resp)

    // do something
  } catch (e) {
    // 处理错误逻辑
  }
}
```

> 为了保证逻辑的完整性，在实践中 try/catch 必不可少。
