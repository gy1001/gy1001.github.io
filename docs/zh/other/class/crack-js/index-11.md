# 11-“永动机”- 事件循环

## 01：宏任务，微任务和事件循环

### 进程和线程

- 进程：资源分配的最小单位
- 线程：CPU 调度的最小单位
- 线程是依附于进程的，一个进程可以有多个线程。

### 浏览器-多进程

> 打开更多工具=>任务管理器

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24ac5b02e3854add9e2f57f423b79fc5~tplv-k3u1fbpfcp-watermark.image?)

#### 几个重要的进程

- 浏览器主进程：负责控制浏览器除标签页（渲染进程）以外的界面，地址栏，状态栏，前进后退，刷新等等
- 浏览器渲染进程：负责界面渲染，脚本执行，事件处理等等。默认情况下，每个 Tab 会创建一个渲染进程
- 网络进程：负责网络资源加载
- GPU 进程：负责浏览器界面的渲染，比如 3D 绘制

#### 浏览器多进程多线程

- 浏览器主进程
- 网络进程
- GPU 进程
- 插件进程
- 存储进程
- 音频进程：chrome76
- 渲染进程
  - JS 引擎线程
  - GUI 渲染线程
  - 事件触发线程
  - 定时器触发线程
  - 异步 http 请求线程

### 渲染进程中的线程

- JS 引擎线程：负责解析和执行 JS。JS 引擎线程和 GUI 渲染线程是互斥的，同时只能一个在执行。
- GUI 渲染线程：解析 HTML 和 CSS，构建 DOM 树，CSSOM 树，Render 渲染树、绘制页面等
- 事件触发线程：主要用于控制事件循环。比如计时器（setTimeout/setInterval)，异步网络请求等等，会把任务添加到事件触发线程，当任务符合触发条件时，就把任务添加到待处理队列的队尾，等 JS 引擎线程去处理。
- 异步 HTTP 请求线程：ajax 的异步请求，fetch 请求等。ajax 同步请求呢，没有异步任务
- 定时触发器线程：setTimeout 和 setInterval 计时的线程。定时的计时并不是由 JS 引擎线程负责的，JS 引擎线程如果阻塞会影响计时的准确性

### 异步操作

- 异步操作一般是浏览器的两个或者两个以上线程共同完成的
- ajax 异步请求：异步 Http 请求线程 + JS 引擎线程
- setTimeout: 定时触发引擎线程 + JS 引擎线程 + 事件触发线程

### 宏任务

- 执行一段程序、执行一个事件回调或者一个 interval/timeout 被触发之类的标准机制而被调度的任意 JavaScript 代码

  > **Events**
  >
  > 典型的就是用户交互事件，要注意并不是所有的事件都会走宏任务，有些是走其他队列
  >
  > **Parsing**
  >
  > 执行 html 解析
  >
  > **Callbacks**
  >
  > 执行专门的回调函数
  >
  > **Using a resource**
  >
  > 使用一项资源，比如网络请求，文件读取等
  >
  > **Reacting to DOM manipulation**
  >
  > 响应 DOM 解析之类

### 微任务

- Promise
- MutationObserver

### MutationObserver 小例子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div id="container"></div>

    <div>
      <button type="button" id="btnAdd">添加子节点</button>
    </div>

    <script>
      const containerEl = document.getElementById('container')
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true }

      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            console.log(
              `A child node has been added or removed. ${performance.now()}`,
            )
          } else if (mutation.type === 'attributes') {
            console.log(
              'The ' + mutation.attributeName + ' attribute was modified.',
            )
          }
        }
      }
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver(callback)
      // 以上述配置开始观察目标节点
      observer.observe(containerEl, config)

      btnAdd.onclick = function () {
        setTimeout(function () {
          console.log('setTimeout callback:', performance.now())
        })
        containerEl.append(`added node: ${performance.now()}`)
      }
    </script>
  </body>
</html>
```

### 浏览器事件循环机制

- 一次循环执行任务队列一个宏任务
- 然后执行所有的微任务

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b3e18d9768b498e913546f87faed0fe~tplv-k3u1fbpfcp-watermark.image?)

### 同源窗口之间共享事件循环

- 如果一个窗口打开了另一个窗口，它们可能共享一个事件循环
- 如果窗口是包含在 iframe 中，则它可能会和包含它的窗口共享一个事件循环
- 在多进程浏览器中多个窗口碰巧共享了同一个进程

#### 一个窗口打开另外一个窗口，共享事件循环

- index.html 点解蛋妞之后打开 other.html
- index.html 3000ms 之后，执行一个长达 6000ms 的任务（阻塞）
- 同时，other.html 打开之后会先打印当前时间，5000ms 之后在打印当前时间
- 如果两个窗口事件循环是独立的：other 的页面两次打印时间的时间是 5000ms 左右
- 反之，应该是：3000 + 6000 = 9000ms 左右，要是不想动脑子，就简单判断是不是明显大于 5000ms

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }

      button {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <!-- <iframe src="./other.html"></iframe> -->
    <button id="btnOpen">打开新窗口</button>
    <!-- <a id="btnOpen" target="_blank" href="./other.html" rel="noopener"> 打开新窗口 </a>-->
    <script>
      function printTime() {
        console.log('index.html:', new Date().toLocaleTimeString())
      }

      function asyncSleep(duration) {
        const now = Date.now()
        while (now + duration > Date.now()) {}
      }

      btnOpen.onclick = function () {
        window.open('./other.html')
        printTime()
        console.log('index.html: 3000ms之后执行')
        setTimeout(function () {
          asyncSleep(6000)
        }, 3000)
      }

      // btnOpen.click();
    </script>
  </body>
</html>
```

```html
// other.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>Other页面</div>

    <script>
      function printTime() {
        console.log('other.html:', new Date().toLocaleTimeString())
      }

      printTime()
      console.log('other.html: 5000ms之后执行')
      setTimeout(() => {
        printTime()
      }, 5000)
    </script>
  </body>
</html>
```

运行后结果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2a044ae96694e368a5d9bbfc9854f2e~tplv-k3u1fbpfcp-watermark.image?)\*\*\*\*

假如把新窗口动作变为如下代码,就可以使其不共用一个事件循环了

```html
// index.html
<!--  <button id="btnOpen">打开新窗口</button> -->
<a id="btnOpen" target="_blank" href="./other.html" rel="noopener">
  打开新窗口
</a>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7952a1ab395049e0a796c0689a81a9ac~tplv-k3u1fbpfcp-watermark.image?)

### NodeJS 的事件循环

- **timers**: 此阶段执行由 `setTimeout()` 和 `setInterval()` 调度的回调。
- **pending callbacks**: 执行 I/O 回调推迟到下一个循环 迭代。为什么是下一个，因为每个队列单次有最大数量的限制，不能保证全部被执行完，只能下次。
- **idle, prepare**: 仅在内部使用。
- **poll**: 检索新的 I/O 事件; 执行与 I/O 相关的几乎任何回调（由“计时器”或 “`setImmediate()`”所设的紧邻回调除外); node 将在适当时机在此处暂停。
- **check**: `setImmediate()` 回调在此处被调用。
- **close callbacks**：一些关闭的回调函数，如：`socket.on('close', ...)`。

```shell
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

> 注意：每个框被称为事件循环机制的一个阶段。

### queuseMicrotask

- 在事件循环结束前插入一个微任务。比 setTimeout(fn, 0)更快
- 注意：添加的微任务，未提供取消的手段
- 语法：`queueMicrotask(function)`

#### 示例 1

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btn">queueMicrotask + setTimeout</button>

    <script>
      btn.onclick = function () {
        setTimeout(function () {
          console.log('setTimeout:callback', performance.now())
        }, 0)
        queueMicrotask(() => {
          console.log('queueMicrotask:callback', performance.now())
        })
      }
    </script>
  </body>
</html>
```

此时的执行结果如下

```shell
queueMicrotask:callback 4248.5
setTimeout:callback 4249.20000000298
```

#### 示例 2

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btn">queueMicrotask + setTimeout</button>

    <script>
      btn.onclick = function () {
        // 同步的代码
        console.log('onclick:start', performance.now())
        // 产生微任务，此时微任务队列: promise:callback
        Promise.resolve().then(function () {
          console.log('promise:callback', performance.now())
        })
        // 产生宏任务，此时宏任务队列: setTimeout:callback
        setTimeout(function () {
          console.log('setTimeout:callback', performance.now())
        }, 0)
        // 产生微任务, 追加，此时微任务队列: promise:callback, queueMicrotask:callback
        queueMicrotask(() => {
          console.log('queueMicrotask:callback', performance.now())
        })
        // 同步的代码
        console.log('onclick:end', performance.now())
        // 此时宏任务队列: setTimeout:callback
        // 此时微任务队列: promise:callback, queueMicrotask:callback
      }
    </script>
  </body>
</html>
```

执行结果如下

```shell
onclick:start 4541.10000000149
onclick:end 4541.5
promise:callback 4541.60000000149
queueMicrotask:callback 4541.80000000447
setTimeout:callback 4542.30000000447
```

### queueMicrotask polyfill(垫片)

```javascript
if (typeof window.queueMicrotask !== 'function') {
  window.queueMicrotask = function (callback) {
    Promise.resolve()
      .then(callback)
      .catch((e) =>
        setTimeout(() => {
          throw e
        }),
      )
  }
}
```

### 示例: 无尽微任务(queueMicrotask 产生)

> 会导致页面卡死，后续宏任务无法输出

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div id="container" style="height: 100px; border: 1px solid #333"></div>
    <button type="button" id="btn">queueMicrotask + setTimeout</button>

    <script>
      let count = 0

      function addMicroTask() {
        console.log('queueMicrotask:callback', performance.now())
        count++
        if (count < 1000) {
          queueMicrotask(addMicroTask)
        }
      }

      btn.onclick = function () {
        // 产生宏任务，此时宏任务队列: setTimeout:callback
        setTimeout(function () {
          const message = 'setTimeout:callback' + performance.now()
          container.innerHTML = message
          console.log(message)
        }, 0)

        addMicroTask()
      }

      //   if (typeof window.queueMicrotask !== 'function') {
      //     window.queueMicrotask = function (callback) {
      //       Promise.resolve()
      //         .then(callback)
      //         .catch((e) =>
      //           setTimeout(() => {
      //             throw e
      //           }),
      //         )
      //     }
      //   }
    </script>
  </body>
</html>
```
