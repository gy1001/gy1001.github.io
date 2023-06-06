# 13-动起来：计时器和JS动画

## 01：setTimeout与setInterval和新生代的requestAnimation与requestIdleCallback指南

### setInterVal-案例

* 有一个 setTimeout 4s 后触发一次，耗时 9s
* 同时，有一个定时器，setInterval 每 5s，触发一次，每次耗时 4s
* 用户在程序第三秒的时候，触发点击事件，添加 onClick，onClick 耗时 6s

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .warp {
      position: relative;
      height: 100px;
      background: red;
    }
  </style>

  <body>
    setIntervale
    <div id="progress" class="warp" style="width: 0">0%</div>
    <button id="start">开始</button>
    <script>
      //同步耗时操作
      function syncSleep(duration) {
        const now = Date.now()
        while (now + duration > Date.now()) {}
      }

      var interval = null
      var timeout = null
      var curCount = 0
      var timeLine = Date.now()
      var lastIntervalTime

      function printTime(text, isInterval) {
        if (isInterval) {
          var intervalTime = lastIntervalTime
            ? Date.now() - lastIntervalTime
            : '第一次执行'
          console.log(
            text,
            '==时间线：',
            Date.now() - timeLine,
            '上一次间隔：',
            intervalTime,
          )
          lastIntervalTime = Date.now()
        } else {
          console.log(text, '==时间线：', Date.now() - timeLine)
        }
      }

      function intervalFun(totalCount) {
        interval = setInterval(() => {
          printTime('执行interval', true)
          syncSleep(4000)
          printTime('执行interval完毕')
          curCount += 1
          if (curCount > totalCount) {
            window.clearInterval(interval)
          }
        }, 5000)
      }

      intervalFun(6)
      ;(timeout = setTimeout(() => {
        printTime('模拟click')
        start.click()
      }, 3000)),
        (timeout = setTimeout(() => {
          printTime('执行timeout')
          syncSleep(9000)
          printTime('执行timeout完毕')
        }, 4000)),
        (start.onclick = function () {
          printTime('执行onClick')
          syncSleep(6000)
          printTime('执行onClick完毕')
        })

      window.onbeforeunload = function (event) {
        console.log('卸载')
        if (timeout) {
          clearTimeout(timeout)
        }

        if (interval) {
          clearInterval(interval)
        }
      }

      //onclick（当前）                             3s + 6
      //onclick（当前）,timeout                     4s
      //onclick（当前），timeout,interval-1         5s
      //timeout（当前）,interval-1                  9s + 9
      //timeout（当前）,interval-1                  10s     interval-2
      //timeout（当前）,interval-1                  15s     interval-3
      //interval-1（当前）                          18s + 4
      //interval-1（当前）                          18s + 4
      //interval-1（当前）,interval-4               20s
      //interval-4（当前）                          22s + 4
      //interval-4（当前），interval-5              25s
      //interval-5（当前），                         26s + 4
      //interval-6                                 30s
      //interval-7                                 35s
    </script>
  </body>
</html>
```

执行结果如下

```shell
模拟click ==时间线： 3011
执行onClick ==时间线： 3011
执行onClick完毕 ==时间线： 9011
执行timeout ==时间线： 9011
执行timeout完毕 ==时间线： 18011
执行interval ==时间线： 18011 上一次间隔： 第一次执行
执行interval完毕 ==时间线： 22011
执行interval ==时间线： 22012 上一次间隔： 4001
执行interval完毕 ==时间线： 26012
执行interval ==时间线： 26012 上一次间隔： 4000
执行interval完毕 ==时间线： 30012
执行interval ==时间线： 30012 上一次间隔： 4000
执行interval完毕 ==时间线： 34012
执行interval ==时间线： 35012 上一次间隔： 5000
执行interval完毕 ==时间线： 39013
执行interval ==时间线： 40012 上一次间隔： 4999
执行interval完毕 ==时间线： 44013
执行interval ==时间线： 45013 上一次间隔： 5000
执行interval完毕 ==时间线： 49013
```

#### 为什么，定时器代码间隔会比预期要小？

* JS 主线程和计时器线程是相互独立的
* 宏任务队列一次只能执行一次
* setInterVal 在宏任务执行时，如果上一个还没有被执行，新的注册不会被注入

> 根据下图时序图中，interval 每隔 5s 尝试进行注册一个，如果之前有未执行的，那就不进行注册，每次执行 setInterVal 就会有一个 4s 的线程占用，结束时候进行定时器中的代码的运行。即打印

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49f13dda321e45d3bf783b6ce9c58646~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8acd4ceb58c451e976033ffda96bce1~tplv-k3u1fbpfcp-watermark.image?)

### setInterVal-累计效应

* 定时器代码执行之间的间隔可能比你预期的要小
* 定时器某些间隔被跳过

### setTimeout

* setTimeout 设置一个延时器，该定时器在指定时间到期后执行一个函数或者一段代码
* 设置的时间是最小延迟时间，真正的执行是在事件循环中执行，所以，真正去执行的时间大于最小延迟时间

### setTimeout 默认最低延迟

* 以chrome 浏览器为例，最低延迟为 1ms.如果延迟时间大于 2的 31次方 -1，那么就设置为 1ms

```javascript
// 设置最大值
setTimeout(() => {
  console.log('a')
}, 2 ** 31)

// 设置最小值
setTimeout(() => {
  console.log('b')
}, 1)

setTimeout(() => {
  console.log('c')
}, 0.5)

//设置0,也是 1ms
setTimeout(() => {
  console.log('d')
}, 0)
```

执行结果是

```shell
a b c d 
```

#### SetTimeout 嵌套

```javascript
let t1 = performance.now()
//打印时间
function printTime(count) {
  const now = performance.now()
  console.log(count, '==时间差：', now - t1)
  t1 = now
}

setTimeout(() => {
  printTime(1)
  setTimeout(() => {
    printTime(2)
    setTimeout(() => {
      printTime(3)
      setTimeout(() => {
        printTime(4)
        setTimeout(() => {
          printTime(5)
          setTimeout(() => {
            printTime(6)
          }, 0)
        }, 0)
      }, 0)
    }, 0)
  }, 0)
}, 0)
```

指向结果如下

```shell
1 '==时间差：' 0.30000000074505806
2 '==时间差：' 0.09999999962747097
3 '==时间差：' 0.09999999962747097
4 '==时间差：' 0.09999999962747097
5 '==时间差：' 5.200000001117587
6 '==时间差：' 5.199999999254942
```

### setTimeout 与 setInterval 的区别

* setTimeout 递归循环可以保障，每次至少延迟某些特定时间执行
* setInterval 每次定时触发执行回调函数，不关心前一个回调函数是否执行。

### requsetAnimationFrame

* requestAnimationFrame 告诉浏览器，你希望执行一个动画，并要求浏览器在下次重绘之前执行指定的回调函数更新动画
* 回调函数执行次数与浏览器屏幕的刷新次数匹配。一般为每秒 60次

### requsetAnimationFrame在事件循环中的执行时机

* 事件循环步骤：1个宏任务 => 所有微任务 => 是否需要渲染 => 渲染 UI
* 在事件循环中，requsetAnimationFrame 实际上就是在渲染 UI 中执行的

### requsetAnimationFrame 对比 setTimeout

* 由系统决定回调函数的执行时机。不需要使用 setTimeout 等计算刷新时间。节省了不必要的浪费，动画看起来更加流畅

#### 使用 requsetAnimationFrame 执行动画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .animate-ele {
      position: relative;
      width: 100px;
      height: 100px;
      background: red;
    }
    * {
      font-size: 28px;
    }
  </style>

  <body>
    <div id="animateEle" class="animate-ele"></div>
    <button id="start">开始</button>
    <script>
      const element = document.getElementById('animateEle')
      let count = 0
      function step() {
        count++

        if (count < 500) {
          element.style.transform = 'translateX(' + count + 'px)'
          window.requestAnimationFrame(step)
        }
      }

      start.onclick = function () {
        window.requestAnimationFrame(step)
      }
    </script>
  </body>
</html>
```

#### 使用 setTimeout 执行动画

> 通过查看性能分析，可以得知，在每一个 16.7 ms 中定时器进行了调用，但是并没有进行绘制，只有在 16.7ms左右进行了绘制

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    * {
      font-size: 28px;
    }
    .animate-ele {
      position: relative;
      width: 100px;
      height: 100px;
      background: red;
    }
  </style>
  <body>
    setTimeout 实现动画
    <div id="animateEle" class="animate-ele"></div>
    <button id="start">开始</button>
    <script>
      var timeout = null

      function test(callback) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        timeout = setTimeout(() => {
          test(callback)
          const flag = callback()
          if (flag) {
            if (timeout) {
              clearTimeout(timeout)
              timeout = null
            }
          }
        }, 0)
      }

      start.onclick = function () {
        let count = 0
        const animateEle = document.getElementById('animateEle')
        test(() => {
          count++
          if (count < 500) {
            animateEle.style.transform = 'translateX(' + count + 'px)'
            return false
          }
          return true
        })
      }
    </script>
  </body>
</html>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e410b5fae6e4479a1eae41a816e87cb~tplv-k3u1fbpfcp-watermark.image?)

### requestAnimationFrame 优点

#### 优点

* dom 操作与浏览器刷新频率保持一致，保障动画流畅
* 在隐藏或者不可见的元素中，requestAnimationFrame 将不进行重绘和回流，节省 CPU GPU
* 页面不是激活状态，动画会自动暂停，节省 CPU 开销

#### 注意：

* 如果时间循环由任务耗时特别长，requestAnimationFrame 的动画效果会大大折扣

### requestIdleCallback

* requestIdleCallback 方法将在浏览器的空闲时段调用函数排队
* requestIdleCallback.callback：事件空间时被调用函数的引用
* requestIdleCallback.options
  * timeout: 为正值，超时没执行，就放到下次事件循环中排队执行

### requestIdleCallback 空闲时间计算

* 存在连续渲染的两帧，空间时间就是帧的频率减去执行任务的时间，减去绘制的时间
* 当一段时间没有绘制或者没有任务发生，空闲时间将尽可能变大，但是不会超过 50ms

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5cec9112b054acf9c836c29e79d3287~tplv-k3u1fbpfcp-watermark.image?)

### requestIdleCallback 如何使用

* 低优先级的任务使用空闲回调
* 空闲回调尽量不超过可分配的时间
* 由于该回调时再 render 之后，尽量避免在回调中改变 DOM
* 避免运行时间无法预测的任务
* **在你需要的时候使用 timeout(timeout 会改变执行时机)**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .animate-ele {
      position: relative;
      width: 100px;
      height: 100px;
      background: red;
    }
    * {
      font-size: 28px;
    }
  </style>

  <body>
    <div id="animateEle" class="animate-ele"></div>
    <button id="start">开始</button>
    <script>
      //同步耗时操作
      function syncSleep(duration) {
        const now = Date.now()
        while (now + duration > Date.now()) {}
      }

      const element = document.getElementById('animateEle')
      let count = 0

      function step(timestamp) {
        console.log('渲染帧')
        count++
        if (count < 500) {
          element.style.transform = 'translateX(' + count + 'px)'
          window.requestAnimationFrame(step)
        }
      }

      start.onclick = function () {
        console.log('启动帧')
        window.requestAnimationFrame(step)
        requestIdleCallback(
          (idleDeadline) => {
            // didTimeout表示是否超时正在执行
            const didTimeout = idleDeadline.didTimeout
              ? '超时正在执行'
              : '未超时执行'
            // timeRemaining()表示当前帧还剩余多少时间（以毫秒计算）
            const timeRemaining = idleDeadline.timeRemaining()
            console.log('didTimeout==', didTimeout, '==', timeRemaining)
          },
          { timeout: 50 }
        )

        console.log('执行onClick')
        setTimeout(() => {
          console.log('执行timeout')
          syncSleep(1000)
          console.log('执行timeout完成')
          Promise.resolve().then(function () {
            console.log('promise 微任务')
          })
        }, 30)
        syncSleep(1000)
        console.log('执行onClick完毕')
      }
    </script>
  </body>
</html>
```

### 总结

* setInterval 本身存在累计效应
* setTimeout 存在最低延迟时间，实现动画，无法与屏幕刷新保持步调一致
* requestAnimationFrame 系统自动调用，保障刷新频率
* requestIdleCallback 处理低优先级任务，空闲时调用