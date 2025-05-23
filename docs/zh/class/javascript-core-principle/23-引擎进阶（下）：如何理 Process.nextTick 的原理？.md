# 23-引擎进阶（下）：如何理 Process.nextTick 的原理？

在日常开发中，`Process.nextick` 在浏览器端代码中很少使用，但在 `Node.js` 开发种却极为常见，所以要好好掌握。

在开始前请先思考：

1. `Process.nextick` 和其他微任务方法在一起的时候，执行顺序是怎么样的？
2. `Vue `也有个 `nextick`，它的逻辑又是什么样的？

## 1. 基本语法

`Process.nextick` 的语法有两个参数：

process.nextTick(callback[, ...args])

- callback:回调函数
- args：调用 `callback `时额外传的参数，是可选参数

再来看下 `Process.nextick` 的运行逻辑：

1. `Process.nextick` 会将 `callback `添加到`“next tick queue”`；
2. `“next tick queue”`会在当前 `JavaScript stack `执行完成后，下一次 `event loop` 开始执行前按照 `FIFO `出队；
3. 如果递归调用 `Process.nextick` 可能会导致一个无限循环，需要去适时终止递归。

可能你已经注意到 `Process.nextick` 其实是微任务，同时也是异步 `API `的一部分。但是从技术上来说 `Process.nextick` 并不是事件循环（`eventloop`）的一部分，相反地，`“next tick queue”`将会在当前操作完成之后立即被处理，而不管当前处于事件循环的哪个阶段。

思考一下上面的逻辑，如果任何时刻你在一个给定的阶段调用 `Process.nextick`，则所有被传入 `Process.nextick` 的回调将在事件循环继续往下执行前被执行。这可能会导致一些很糟的情形，因为它允许用户递归调用 `Process.nextick` 来挂起 `I/O` 进程的进行，这会导致事件循环永远无法到达轮询阶段。

## 2. 为什么使用 Process.nextTick()

那么为什么 `Process.nextick` 这样的 `API `会被允许出现在 `Node.js `中呢？一部分原因是设计理念，`Node.js` 中的 `API `应该总是异步的，即使是那些不需要异步的地方。下面的代码片段展示了一个例子：

```javascript
function apiCall(arg, callback) {
  if (typeof arg !== 'string'){
    return process.nextTick(callback, new TypeError('argument should be     string'));
  }
}
```

通过上面的代码检查参数，如果检查不通过，它将一个错误对象传给回调。`Node.js API` 进行了更新，其已经允许向 `Process.nextick` 中传递参数来作为回调函数的参数，而不必写嵌套函数。

我们所做的就是将一个错误传递给用户，但这只允许在用户代码被执行完毕后执行。使用 `Process.nextick` 我们可以保证 `apicall() `的回调总是在用户代码被执行后，且在事件循环继续工作前被执行。为了达到这一点，`JS `调用栈被允许展开，然后立即执行所提供的回调。该回调允许用户对 `Process.nextick` 进行递归调用，而不会达到 `RangeError`，即 `V8 `调用栈的最大值。

这种设计理念会导致一些潜在的问题，观察下面的代码片段：

```javascript
let bar;
function someAsyncApiCall(callback) { callback(); }
someAsyncApiCall(() => {
  console.log('bar', bar);   // undefined
});
bar = 1;
```

用户定义函数 `someAsyncApiCall() `有一个异步签名，但实际上它是同步执行的。当它被调用时，提供给 `someAsyncApiCall()` 的回调函数会在执行 `someAsyncApiCall() `本身的同一个事件循环阶段被执行，因为 `someAsyncApiCall()` 实际上并未执行任何异步操作。结果就是，即使回调函数尝试引用变量 `bar`，但此时在作用域中并没有改变量。因为程序还没运行到对 `bar `赋值的部分。

将回调放到 `Process.nextick` 中，程序依然可以执行完毕，且所有的变量、函数等都在执行回调之前被初始化，它还具有不会被事件循环打断的优点。以下是将上面的例子改用 `Process.nextick` 的代码：

```javascript
let bar;
function someAsyncApiCall(callback) {
  process.nextTick(callback);
}
someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});
bar = 1;
```

通过这个例子，你就可以体会到 `Process.nextick` 的作用了。其实在日常的 `Node.js `开发中，这样的情况也经常会遇见，之前我有讲过 `EventEmitter`，那么我们看下 `EventEmitter `在`Node.js`的使用的一个例子。

```javascript
const EventEmitter = require('events');
const util = require('util');
function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

无法在构造函数中立即触发一个事件，因为此时程序还未运行到将回调赋值给事件的那段代码。因此，在构造函数内部，你可以使用 `Process.nextick` 设置一个回调以在构造函数执行完毕后触发事件，下面的代码满足了我们的预期。

```javascript
const EventEmitter = require('events');
const util = require('util');
function MyEmitter() {
  EventEmitter.call(this);
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

通过上面的改造可以看出，使用 `Process.nextick `就可以解决问题了，即使 `event `事件还没进行绑定，但也可以让代码在前面进行触发，因为根据代码执行顺序，`Process.nextick ` 是在每一次的事件循环最后执行的。因此这样写，代码也不会报错，同样又保持了代码的逻辑。

通过这两个例子你应该对`Process.nextick`这个知识有了更好的理解了吧？下面我们再来看看浏览器端 `Vue `框架的 `nextick `是干什么用的，注意不要将二者混淆了，前面讲的是 `Node.js` 服务端的事情，而下面要说的是浏览器端 `Vue `框架的知识。

## 3. Vue 的 nextick 又是什么意思？

我们看下 `Vue `官网最直白的解释：

Vue 异步执行 DOM 的更新。当数据发生变化时，Vue 会开启一个队列，用于缓冲在同一事件循环中发生的所有数据改变的情况。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后在下一个的事件循环“tick”中。例如：当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。

我们细细地根据 `Vue `的官网理解一下，其实是不是有点像 `EventLoop `的味道，这里只不过是 `Vue `开启了一个队列，当你在 `nextick `方法中改变数据的时候，视图层不会立马更新，而是要在下次的时间循环队列中更新。

这点是不是类似上面讲的 `Node.js` 的 `Process.nextick` 的意思？虽然运行的环境不一样，但是这个意思你可以细细品味一下。这里我们再来看一段 `Vue `代码，让你理解 `Vue `的 `nextick `的作用。

```vue
<template>
  <div class="app">
    <div ref="msg">{{msg}}</div>
    <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
    <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
    <button @click="changeMsg">
      Change the Message
    </button>
  </div>
</template>
<script>
  new Vue({
    el: '.app',
    data: {
      msg: 'Vue',
      msg1: '',
      msg2: '',
    },
    methods: {
      changeMsg() {
        this.msg = "Hello world."
        this.msg1 = this.$refs.msg.innerHTML
        this.$nextTick(() => {
          this.msg2 = this.$refs.msg.innerHTML
        })
      }
    }
  })
</script>
```

你可以将这一段代码放到自己的 `Vue` 的项目里执行一下，看看通过按钮点击之后，`div `里面的 `msg1 `和 `msg2 `的变化情况。你会发现第一次点击按钮调用 `changeMsg `方法时，其实 `msg2 `并没有变化，因为 `msg2 `的变化是在下一个 `tick `才进行执行的。

最后我们再来看下 `Vue `中 `nextick `的源码。在 `Vue 2.5+ `之后的版本中，有一个单独的 `JS `文件来维护，路径是在 `src/core/util/next-tick.js` 中,篇幅原因，源码这里就不展示了。

整体代码不是太多，注释比较多，其核心部分代码比较精简，主要在` 40~80` 行之间，核心在于 `timerFunc `这个函数的逻辑实现，`timerFunc `这个函数采用了好几种处理方式，主要是针对系统以及 `Promise `的支持几个情况同时进行兼容性处理。处理逻辑情况是这样的：

1. 首先判断是否原生支持 `Promise`，支持的话，利用 `promise `来触发执行回调函数；
2. 如果不支持 `Promise`，再判断是否支持 `MutationObserver`，如果支持，那么生成一个对象来观察文本节点发生的变化，从而实现触发执行所有回调函数；
3. 如果 `Promise `和 `MutationObserver `都不支持，那么使用 `setTimeout `设置延时为 0。

## 4. 总结

最后，针对 `Process.nextick() `和 `Vue `的 `nextick `这两种不同的 `tick `，总结了下面这个表格，方便深入理解。

|                    | Process.nextick                                              | Vue nextick                                         |
| ------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| 执行顺序           | 每一次`Eventloop`执行之前，如果有多个`Process.nextick`,会影响下一次时间循环的执行时间 | nextick方法中每次数据更新将会在下一次作用到视图更新 |
| 运行环境           | Node.js服务端                                                | 浏览器Vue框架                                       |
| 是否轮询           | 是                                                           | 是                                                  |
| 对应实现的数据结构 | 类似队列                                                     | 队列                                                |