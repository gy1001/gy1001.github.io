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

## 02：CSS的动画实现

### 参考文档

[CSS3-animation动画详解: https://juejin.cn/post/6970883520168198158#heading-6](https://juejin.cn/post/6970883520168198158#heading-6)

### CSS 动画实现方式

* animations: 指定一组或者多组动画，每组动画之间用逗号相隔
* transition: 指定一个或者多个 css 属性过渡效果，多个属性用逗号相隔

### 内置贝塞尔函数运动效果

> [MDN文档：https://developer.mozilla.org/zh-CN/docs/Glossary/Bezier_curve](https://developer.mozilla.org/zh-CN/docs/Glossary/Bezier_curve)

* linear: 动画以恒定速度运行。此关键词表示缓冲函数 `cubic-bezier(0.0, 0.0, 1.0, 1.0)`。
* ease: 动画缓慢开始，然后突然加速，最后缓慢移向目标。此关键词表示缓冲函数 `cubic-bezier(0.25, 0.1, 0.25, 1.0)`.。它与 [`ease-in-out`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function#ease-in-out) 类似，但它在开始时加速更快。
* ease-in: 动画缓慢开始，然后逐渐加速直到结束，在结束点时突然停止。此关键词表示缓冲函数 `cubic-bezier(0.42, 0.0, 1.0, 1.0)`。
* ease-in-out: 动画缓慢开始，然后加速，最后减速直至结束。此关键词表示缓冲函数 `cubic-bezier(0.42, 0.0, 0.58, 1.0)`。开始时，其表现与 [`ease-in`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function#ease-in) 函数类似；结束时，与 [`ease-out`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function#ease-out) 函数类似。
* ease-out: 此动画突然开始，然后逐渐减速直至结束。此关键词表示缓冲函数 `cubic-bezier(0.0, 0.0, 0.58, 1.0)`。
* 自定义

```html
// 各个动画对比
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>内置贝塞尔的运动</title>
    <style>
      * {
        font-size: 28px;
        color: #fff;
        font-weight: bold;
      }

      .bg-red {
        background-color: red;
      }

      .bg-green {
        background-color: green;
      }

      .bg-blue {
        background-color: blue;
      }

      .bg-sliver {
        background-color: silver;
      }

      .bg-aqua {
        background-color: aqua;
      }

      .transition div {
        height: 100px;
        width: 100px;
        position: relative;
        left: 0;
      }

      .transition-s {
        transition-property: left;
        transition-duration: 3000ms;
      }

      .transition-fn-ease {
        transition-timing-function: ease;
      }

      .transition-fn-ease-in {
        transition-timing-function: ease-in;
      }

      .transition-fn-linear {
        transition-timing-function: linear;
      }

      .transition-fn-ease-out {
        transition-timing-function: ease-out;
      }

      .transition-fn-ease-in-out {
        transition-timing-function: ease-in-out;

        /* transition-timing-function: cubic-bezier(.95,.05,.59,.75) */
      }

      .transition.ani div {
        left: calc(100% - 100px);
      }
    </style>
  </head>

  <body>
    <div class="transition">
      <div class="bg-red transition-s transition-fn-ease" data-t="ease">
        ease
      </div>
      <div class="bg-green transition-s transition-fn-linear" data-t="linear">
        linear
      </div>
      <div class="bg-blue transition-s transition-fn-ease-in" data-t="ease-in">
        ease-in
      </div>
      <div
        class="bg-sliver transition-s transition-fn-ease-out"
        data-t="ease-out"
      >
        ease-out
      </div>
      <div
        class="bg-aqua transition-s transition-fn-ease-in-out"
        data-t="ease-in-out"
      >
        ease-in-out
      </div>
    </div>
    <div>
      <button id="btnStart" style="color: red">开始</button>
    </div>

    <script>
      var el = document.querySelector('.transition')
      document
        .getElementById('btnStart')
        .addEventListener('click', function () {
          el.classList.add('ani')
        })

      document
        .querySelector('.transition-s')
        .addEventListener('transitionend', function () {
          el.classList.remove('ani')
        })
    </script>
  </body>
</html>
```

### 自定义贝塞尔曲线要点

* 曲线越陡峭，速度越快，反之，速度越慢
* 控制点的位置会影响曲线形状

### 贝塞尔曲线应用场景

* svg
* canvas/webgl
* css动画
* animation Web API

### CSS 动画案例实现效果

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

    .warp {
      position: absolute;
      width: 100px;
      height: 300px;
      border: 1px solid #f60093;
      overflow: hidden;
    }

    .progress-in {
      position: relative;
      width: 100%;
      height: 100%;
      background: red;
      animation: 3s linear 0s progress forwards;
      transform: translateY(100%);
      animation-play-state: paused;
    }

    @keyframes progress {
      from {
        transform: translateY(100%);
      }

      to {
        transform: translateY(0%);
      }
    }

    #start {
      position: absolute;
      width: 100px;
      left: 200px;
    }
  </style>

  <body>
    <div class="warp">
      <div class="progress-in"></div>
    </div>
    <button id="start">开始</button>
    <script>
      const progressIn = document.querySelector('.progress-in')
      start.onclick = function () {
        // progressIn.style.animationPlayState = `running`;
        const state = progressIn.style.animationPlayState
        progressIn.style.animationPlayState =
          state == `running` ? 'paused' : 'running'
      }

      progressIn.addEventListener(
        'webkitAnimationEnd',
        (ele) => {
          window.alert(`动画结束`)
        },
        true,
      )
    </script>
  </body>
</html>
```

### CSS 动画实现-animations

* animation-name: 动画名称，默认值 none, 名称代表 @keyframes 动画序列
* animation-duration: 动画周期时长，默认为0
* animation-timing-function: 用于定义时间函数，通过这个选项，可配置动画随时间的运动速率和轨迹。
  * linear： 动画从头到尾的速度是相同的。
  * ease（缓解）：**`默认值`**：动画以低速开始，然后加快，在结束前变慢。
  * ease-in： 动画以低速开始。
  * ease-out：动画以低速结束。
  * ease-in-out：动画以低速开始和结束。
  * cubic-bezier(*n*,*n*,*n*,*n*)：贝塞尔曲线（自定义数值），可到[相关网站](https://link.juejin.cn?target=https%3A%2F%2Fcubic-bezier.com%2F)可视化设置。
* animation-delay：用于设置动画延迟时间，单位为`s`
* `animation-iteration-count`：用于设置动画执行的次数，默认值为`1`只执行一次。
  * 具体number数值
  * `infinite`: 执行无限次
* `animation-direction`用于设置动画执行方向，具体来说可设置为以下值：
  * normal：默认值。动画按正常播放
  * reverse：动画反向播放
  * alternate（交替的）：动画正向交替执行（正向->反向）Loop。
  * alternate-reverse：动画反向交替执行（反向->正向）Loop
  * inherit：从父元素继承该属性
* `animation-fill-mode`:用于设置动画的填充模式，主要应用的属性值为：
  * none: 默认值。动画在动画执行前后，不会应用任何样式到目标元素。
  * forwards: 在动画结束后（**由 animation-iteration-count 决定**），目标元素将保持应用`最后帧`动画。
  * backwards: 在动画结束后（**由 animation-iteration-count 决定**），目标元素将保持应用`起始帧`动画。
  * both: 动画将遵循`forwards`和`backwards`的规则，从而在两个方向上扩展动画属性。
* **`animation-play-state`**: [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性设置动画是运行还是暂停。
  * running：当前**动画**正在**运行**。
  * paused：当前**动画**已被**停止**。

### CSS 动画案例实现-animation技巧使用

* 动画暂停与启动：animation-play-state
* webkit-动画的事件监听：webkit-animationEnd, webkitAnimationStart, webkitAniamtionIteration

### CSS 动画实现-transition属性

* transition-property: 应用过渡属性的名称，默认值为 all
  * none: 没有过度动画
  * all: 所有属性
* `transition-duration`: 定义动画的过渡时间，默认值为`0s`,也就是说，如果不设置该属性，默认是没有过渡效果的。
* `animation-timing-function`: 定义动画事件函数，`animation`族属性中也有该属性，该属性可以改变动画的执行速率以及轨迹。
  * linear： 动画从头到尾的速度是相同的。
  * ease（缓解）：**`默认值`**：动画以低速开始，然后加快，在结束前变慢。
  * ease-in： 动画以低速开始。
  * ease-out：动画以低速结束。
  * ease-in-out：动画以低速开始和结束。
  * cubic-bezier(*n*,*n*,*n*,*n*)：贝塞尔曲线（自定义数值），可到[相关网站](https://link.juejin.cn?target=https%3A%2F%2Fcubic-bezier.com%2F)可视化设置。
* `transition-delay`: 用于设置动画延迟时间，单位为`s`

### CSS 动画实现-transition 案例实现

```css
.progress-in {
  position: relative;
  width: 100%;
  height: 100%;
  background: red;
  opacity: 1;
  transform: translateY(100%);
  transition: transform 3s, opacity 3s;
}
```

### CSS 动画实现-transition 注意事项

* 不是所有的属性都可以用来做动效
* 不支持动画的属性：background-image, float, display, position, visibility
* 多种属性同事变化，用逗号分割，同时事件的触发次数也会是多次

#### [Transition 所支持的css属性](https://www.cnblogs.com/yunkou/p/4235469.html)

transition-property是用来指定当元素其中一个属性改变时执行transition效果: 所支持的属性类型如下：

1. `color`: 通过红、绿、蓝和透明度组件变换（每个数值处理）如：background-`color,border-color`,`color`,`outline-color`等css属性；
2. `length`: 真实的数字 如：`word-spacing`,`width`,`vertical-align`,`top`,`right`,`bottom`,`left`,`padding`,`outline-width`,`margin`,`min-width`,`min-height`,`max-width`,`max-height`,`line-height`,`height`,`border-width`,`border-spacing`,`background-position`等属性；
3. `percentage`:真实的数字 如：`word-spacing`,`width`,`vertical-align`,`top`,`right`,`bottom`,`left`,`padding`,`outline-width`,`margin`,`min-width`,`min-height`,`max-width`,`max-height`,`line-height`,`height`,`border-width`,`border-spacing`,`background-position`等属性；
4. `integer`离散步骤（整个数字），在真实的数字空间，以及使用floor()转换为整数时发生 如：`outline-offset`,`z-index`等属性；
5. `number`真实的（浮点型）数值，如：`zoom`,`opacity`,`font-weight`,等属性；
6. `transform` list
7. `rectangle`:通过x, y, width 和 height（转为数值）变换，如：`crop`
8. `visibility`: 离散步骤，在0到1数字范围之内，0表示“隐藏”，1表示完全“显示”,如：`visibility`
9. `shadow`: 作用于color, x, y 和 blur（模糊）属性,如：`text-shadow`
10. `gradient`: 通过每次停止时的位置和颜色进行变化。它们必须有相同的类型（放射状的或是线性的）和相同的停止数值以便执行动画,如：`background-image`
11. paint server (SVG): 只支持下面的情况：从`gradient`到`gradient`以及`color`到`color`，然后工作与上面类似
12. space-separated list of above:如果列表有相同的项目数值，则列表每一项按照上面的规则进行变化，否则无变化
13. a shorthand property: 如果缩写的所有部分都可以实现动画，则会像所有单个属性变化一样变化

#### transition 动画示例：普通运动动画

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
      position: absolute;
      width: 100px;
      height: 300px;
      border: 1px solid #f60093;
      overflow: hidden;
    }

    .progress-in {
      position: relative;
      width: 100%;
      height: 100%;
      background: red;
      opacity: 1;
      transform: translateY(100%);
      transition: transform 3s, opacity 3s;
    }

    #start {
      position: absolute;
      width: 100px;
      height: 30px;
      left: 200px;
    }
  </style>

  <body>
    <div class="warp">
      <div class="progress-in"></div>
    </div>
    <button id="start">开始</button>
    <script>
      const progressIn = document.querySelector('.progress-in')
      start.onclick = function () {
        progressIn.style.transform = `translateY(0%)`
        progressIn.style.opacity = 0.4
      }

      progressIn.addEventListener(
        'transitionend',
        (ele) => {
          console.log(
            `过渡动画完成：过渡属性${ele.propertyName}=过渡时间：${ele.elapsedTime}s`,
          )
        },
        true,
      )
    </script>
  </body>
</html>
```

#### transition 动画示例2: 点击产生雪花

```html
// 雪花
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Snow</title>
    <style>
      body {
        background-color: black;
        overflow: hidden;
        height: 100vh;
        cursor: pointer;
      }

      .ts {
        transition-property: all;
        transition-timing-function: ease;
      }

      img {
        height: 15px;
        position: absolute;
        top: 0;
        left: 50vw;
        transform: translate(-50%);
      }
    </style>
  </head>

  <body></body>
  <script>
    var animating = false
    var created = false
    function createSnows() {
      if (created) {
        return
      }
      for (var i = 0; i < 800; i++) {
        var img = document.createElement('img')
        img.src = './snow.png'
        img.className = 'ts'

        var w = 10 + Math.round(Math.random() * 30) + 'px'
        img.style.width = w
        img.style.height = w
        document.body.appendChild(img)
      }
      created = true
    }

    function updateSnows() {
      ;[...document.images].forEach(function (el, i) {
        el.classList.add('ts')
        el.style.transitionDuration =
          3000 + Math.floor((Math.random() * i * 1000) / 800) + 'ms'
        el.style.left =
          50 + (Math.random() > 0.49 ? 1 : -1) * Math.random() * 200 + 'vw'
        el.style.top = 100 + 1 * Math.round(Math.random() * 50) + 'vh'
        el.style.transitionTimingFunction = `cubic-bezier(${Math.random().toFixed(
          2,
        )},${Math.random().toFixed(2)},${Math.random().toFixed(
          2,
        )},${Math.random().toFixed(2)})`
      })
    }

    function resetSnows() {
      ;[...document.images].forEach(function (el, i) {
        el.style.transition = ''
        el.style.top = '0'
        el.style.left = '50vw'
        el.classList.remove('ts')
      })
    }

    createSnows()

    document.body.addEventListener('click', function () {
      resetSnows()
      window.getComputedStyle(document.body)
      requestAnimationFrame(updateSnows)
    })
  </script>
</html>
```

#### transition 动画示例3：购物车抛物线

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>购物车抛物线</title>
    <style>
      html,
      body {
        margin: 0;
      }

      body {
        position: relative;
      }

      .container {
        /* width: 30vw; */
        margin: auto;
        height: 94vh;
        background-color: #fff4e8;
        position: relative;
        padding-top: 50px;
      }

      .container section {
        display: flex;
        margin: 8px;
        max-width: 500px;
        margin: auto;
      }

      .container section div {
        align-self: center;
      }

      .container .add-car {
        background: #e54346;
        height: 30px;
        text-align: center;
        align-self: center;
      }

      .fixed-bottom {
        position: fixed;
        bottom: 0px;
        z-index: 999;
        width: 100vw;
        height: 6vh;
      }

      .bottom-wrapper {
        width: 30vw;
        margin: auto;
        border: silver solid 1px;
        position: relative;
        overflow: hidden;
      }

      .car {
        height: 5vh;
        margin-left: 10px;
      }

      .prod-img {
        border: 1px solid #eee;
      }

      .moving-point {
        height: 20px;
        position: absolute;
        display: none;
        transform: translate(-50%, -50%);
        z-index: 999;
      }

      @media screen and (max-width: 500px) {
        .container section {
          max-width: 100vw;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <section>
        <img
          class="prod-img"
          src="//img10.360buyimg.com/cms/s80x80_jfs/t18700/63/435443749/91471/d622467/5a780f67Nc9f4b35b.jpg"
        />
        <div>花王碧柔（Biore）轻透倍护防晒乳SPF50+ PA+++ 40ml 轻透</div>
        <img src="./add.jpg" class="add-car" />
      </section>
      <section>
        <img
          class="prod-img"
          src="//img10.360buyimg.com/cms/s80x80_jfs/t18700/63/435443749/91471/d622467/5a780f67Nc9f4b35b.jpg"
        />
        <div>花王碧柔（Biore）轻透倍护防晒乳SPF50+ PA+++ 40ml 轻透</div>
        <img src="./add.jpg" class="add-car" />
      </section>
      <section>
        <img
          class="prod-img"
          src="//img10.360buyimg.com/cms/s80x80_jfs/t18700/63/435443749/91471/d622467/5a780f67Nc9f4b35b.jpg"
        />
        <div>花王碧柔（Biore）轻透倍护防晒乳SPF50+ PA+++ 40ml 轻透</div>
        <img src="./add.jpg" class="add-car" />
      </section>
      <section>
        <img
          class="prod-img"
          src="//img10.360buyimg.com/cms/s80x80_jfs/t18700/63/435443749/91471/d622467/5a780f67Nc9f4b35b.jpg"
        />
        <div>花王碧柔（Biore）轻透倍护防晒乳SPF50+ PA+++ 40ml 轻透</div>
        <img src="./add.jpg" class="add-car" />
      </section>
      <section>
        <img
          class="prod-img"
          src="//img10.360buyimg.com/cms/s80x80_jfs/t18700/63/435443749/91471/d622467/5a780f67Nc9f4b35b.jpg"
        />
        <div>花王碧柔（Biore）轻透倍护防晒乳SPF50+ PA+++ 40ml 轻透</div>
        <img src="./add.jpg" class="add-car" />
      </section>
      <section>
        <img
          class="prod-img"
          src="//img10.360buyimg.com/cms/s80x80_jfs/t18700/63/435443749/91471/d622467/5a780f67Nc9f4b35b.jpg"
        />
        <div>花王碧柔（Biore）轻透倍护防晒乳SPF50+ PA+++ 40ml 轻透</div>
        <img src="./add.jpg" class="add-car" />
      </section>
    </div>

    <div class="fixed-bottom">
      <div class="bottom-wrapper">
        <img src="./car.jpg" alt="" class="car" />
      </div>
    </div>

    <img src="./add.jpg" alt="" class="moving-point" />

    <script>
      var animating = false
      var carEl = document.querySelector('.car')
      var pointEl = document.querySelector('.moving-point')

      document
        .querySelector('.container')
        .addEventListener('click', function (ev) {
          const el = ev.target
          if (el.classList.contains('add-car')) {
            if (animating) {
              return
            }
            animating = true
            reset()
            var sourcePos = {
              x: ev.x,
              y: ev.y,
            }

            pointEl.style.top = numberToPx(sourcePos.y)
            pointEl.style.left = numberToPx(sourcePos.x)
            pointEl.style.display = 'block'

            window.getComputedStyle(document.body)

            requestAnimationFrame(transition)
          }
        })

      function reset() {
        pointEl.style.transition = ''
      }

      function transition() {
        var targetPos = getTargetPos()

        pointEl.style.transition = `top 500ms ease-in,left 500ms linear`
        pointEl.style.top = numberToPx(targetPos.y)
        pointEl.style.left = numberToPx(targetPos.x)
      }

      function numberToPx(n) {
        return n + 'px'
      }

      function getTargetPos() {
        var pos = carEl.getBoundingClientRect()
        return {
          x: pos.x + pos.width / 2,
          y: pos.y + pos.height / 2,
        }
      }

      pointEl.addEventListener('transitionend', function () {
        animating = false
        pointEl.style.transition = ''
        pointEl.style.display = 'none'
      })
    </script>
  </body>
</html>
```

#### transition 动画示例4：加载进度条

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>加载进度条</title>
    <style>
      html,
      body {
        height: 100%;
        cursor: pointer;
      }
      body {
        padding-top: 100px;
        background-color: rgba(0, 0, 0);
      }
      .outer {
        margin: auto;
        width: 90%;
        height: 10px;
        border-radius: 8px;
        background-color: #000;
        border-left: 2px solid rgba(0, 198, 255, 0.3);
        border-top: 2px solid rgba(0, 198, 255, 0.3);
        border-right: 2px solid rgba(0, 198, 255, 0.3);
        border-bottom: 2px solid rgba(0, 198, 255, 0.3);
      }
      .inner {
        height: 10px;
        box-shadow: 0px 0px 10px rgba(0, 198, 255, 1) inset;
        width: 0;
        border-radius: 8px;
      }

      .ts {
        transition: width 5000ms ease 20ms;
      }

      .title {
        text-align: center;
        margin: 10px;
        color: #fff;
      }

      .progress {
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div class="title">来来来， 点击任何地方开始加载</div>
    <div class="outer">
      <div class="inner"></div>
    </div>

    <script>
      var innerEl = document.querySelector('.inner')
      function reset() {
        innerEl.classList.remove('progress')
        innerEl.classList.remove('ts')
      }
      document.body.addEventListener('click', function () {
        reset()
        window.getComputedStyle(document.body)
        requestAnimationFrame(function () {
          innerEl.classList.add('ts')
          if (!innerEl.classList.contains('progress')) {
            innerEl.classList.add('progress')
          }
        })
      })
    </script>
  </body>
</html>
```

### animation 和 transition 的区别

| 区别                                | animation | transition              |
| ----------------------------------- | --------- | ----------------------- |
| 动画周期                            | 有        | 有                      |
| 动画的速度曲线                      | 有        | 有                      |
| 动画何时开始（delay)                | 有        | 有                      |
| 动画播放次数控制                    | 有        | 没有（只支持一次）      |
| 是否可以逆向播放                    | 有        | 没有                    |
| 动画暂停以及启动                    | 有        | 没有                    |
| 设置动画停止之后位置状态(fill-mode) | 有        | 没有                    |
| 是否可以自动播放                    | 有        | 没有(hover 或者 js触发) |
| 控制多个关键帧                      | 有        | 没有(只有开始和结束)    |

### 动画性能vs-500个节点js动画

[CSS代码示例](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/13.%20%E8%AE%A1%E6%97%B6%E5%99%A8%E5%92%8CJS%E5%8A%A8%E7%94%BB/13.2%20%E5%9F%BA%E4%BA%8E%E4%BC%A0%E7%BB%9F%E5%AE%9A%E6%97%B6%E5%99%A8%E7%9A%84%E5%8A%A8%E7%94%BB%E5%AE%9E%E7%8E%B0/vs/css.html)

[JS+requestAnimationFrame](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/13.%20%E8%AE%A1%E6%97%B6%E5%99%A8%E5%92%8CJS%E5%8A%A8%E7%94%BB/13.2%20%E5%9F%BA%E4%BA%8E%E4%BC%A0%E7%BB%9F%E5%AE%9A%E6%97%B6%E5%99%A8%E7%9A%84%E5%8A%A8%E7%94%BB%E5%AE%9E%E7%8E%B0/vs/requestAnimationFrame.html)

### 动画注意事项

* css 动画可以开启 GPU 加速，js 动画同样可以设置 translate3d() 或者 matrix3d() 来开启 GPU 加速
* GPU 有图像存储限制，一旦 GPU 的存储空间用完，速度会急剧下降
* 不是所有 CSS 属性都能获得 GPU 加速
* GPU 加速也有自己的开销，可以由 CSS 属性 will-change 来解决
* 大多数 CSS 属性都会引起布局更改和重新绘制，因此尽可能优先考虑使用 opactity 和 css transforms

### 如何选择

* 两个状态之间的简单切换，使用 CSS 动画
* 复杂动画，使用 JS 动画，可控性更好

## 03：复杂动画也不用怕，Web Animation API

### 动画手段

* requsetAnimationFrame/setTimout/setInterval  + 属性改变
* CSS3 动画
* Web Animations API 简称 WAAPI

### 示例1：落球

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>落球</title>
    <style>
      .ball {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-left: 180px;
        background: radial-gradient(circle at 70% 30%, #0aafe6, #222222);
        cursor: pointer;
      }

      .desk {
        height: 200px;
        width: 200px;
        border-right: 1px solid #000;
        border-top: 1px solid #000;
      }
    </style>
  </head>

  <body>
    <button type="button" onclick="location.reload();">重置</button>
    <div class="ball"></div>
    <div class="desk"></div>

    <script>
      const ballEl = document.querySelector('.ball')
      ballEl.addEventListener('click', function () {
        let fallAni = ballEl.animate(
          {
            transform: [
              'translate(0, 0)',
              'translate(20px, 8px)',
              'translate(50px, 200px)',
            ],
          },
          {
            easing: 'cubic-bezier(.68,.08,.89,-0.05)',
            duration: 2000,
            fill: 'forwards',
          },
        )
      })
    </script>
  </body>
</html>
```

### 示例2：直播的世界消息或者播报

* 滑入（消息先运动到屏幕中间）
* 暂停（如果消息过长，消息还需要匀速滚动）
* 滑出屏幕

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>广播</title>
    <style>
      button {
        font-size: 28px;
      }

      .stage {
        height: 500px;
        width: 800px;
        background-color: #000;
        position: relative;
      }

      .danmu {
        color: #fff;
        position: absolute;
        top: 240px;
        font-size: 24px;
        width: 500px;
        overflow: hidden;
        height: 40px;
        /* position: relative; */
      }

      .danmu-content {
        position: absolute;
        /*  不换行 */
        /* width: 100%; */
        white-space: nowrap;
        text-align: center;
        display: inline-block;
        min-width: 500px;
      }
    </style>
  </head>

  <body>
    <div>
      <button type="button" onclick="broadcast(1)">长消息广播</button>
      <button type="button" onclick="broadcast(0)">短消息广播</button>
    </div>
    <div>
      <div class="stage"></div>
    </div>

    <script>
      const DANMU_WIDTH = 500
      const stageWidth = 800
      const shortMessage = '短消息'
      const longMessage =
        '我是长消息我是长消息我是长消息我是长消息我是长消息我是长消息我是长消息我是长消息我是长消息我是长消息'

      const stageEl = document.querySelector('.stage')
      let danmuEl

      // 创建消息节点并播报
      function broadcast(type) {
        danmuEl = createDanmuEl(type ? longMessage : shortMessage)
        stageEl.appendChild(danmuEl)
        startAnimate()
      }

      // 创建消息节点
      function createDanmuEl(message) {
        const el = document.createElement('div')
        el.className = 'danmu'

        const contentWrapper = document.createElement('div')
        contentWrapper.className = 'danmu-content-wrapper'

        const contentEl = document.createElement('div')
        contentEl.className = 'danmu-content'
        contentEl.textContent = message

        contentWrapper.appendChild(contentEl)

        el.appendChild(contentWrapper)
        return el
      }

      async function startAnimate() {
        // 滑入
        const totalWidth = stageWidth + DANMU_WIDTH
        const centerX = stageWidth * 0.5 - DANMU_WIDTH * 0.5

        // 计算偏移量
        const kfsIn = {
          transform: [
            `translateX(${totalWidth}px)`,
            `translateX(${centerX}px)`,
          ],
        }
        await danmuEl.animate(kfsIn, {
          duration: 2000,
          fill: 'forwards',
          easing: 'ease-out',
        }).finished

        // 暂停部分
        const contentEl = danmuEl.querySelector('.danmu-content')
        // 获取消息元素的长度
        const itemWidth = contentEl.getBoundingClientRect().width
        // 计算需要滚动的长度
        const gapWidth = Math.max(0, itemWidth - DANMU_WIDTH)
        // 计算需要滚动的时间
        const duration = Math.max(0, Math.floor(gapWidth / 200) * 1000)
        const translateX = duration > 0 ? gapWidth : 0
        // 偏移量
        const kfsTxt = {
          transform: [`translateX(0px)`, `translateX(-${gapWidth}px)`],
        }
        await contentEl.animate(kfsTxt, {
          duration,
          delay: 2000,
          fill: 'forwards',
          easing: 'linear',
        }).finished
        // 滑出
        const kfsOut = {
          transform: [
            `translateX(${centerX}px)`,
            `translateX(-${DANMU_WIDTH}px)`,
          ],
        }
        await danmuEl.animate(kfsOut, {
          duration: 2000,
          fill: 'forwards',
          easing: 'ease-in',
        }).finished

        if (danmuEl) {
          stageEl.removeChild(danmuEl)
        }
        isAnimating = false
      }
    </script>
  </body>
</html>
```

### web Animations API 两个核心的对象

* KeyframeEffect: 描述动画属性
* Animation: 动画控制

#### KeyframeEffect

* 创建一组可动画的属性和值，称为关键帧。然后可以使用功能 Animation() 构造哈数来播放这些内容
* 构造函数：着重看第二种
* 可以显式的去创建 KeyframeEffect, 然后交付给 Animation 去播放。但是我们通常不需要这么做，有更加简单的 API, 这就是后面要说的 Element.animate
* new KeyframeEffect(keyEffect)基于当前复制，然后多处使用

```javascript
target: 目标
keyframes: 关键帧
options: 动画属性

new KeyframeEffect(target, keyframes)
new KeyframeEffect(target, keyframse, options)
new KeyframeEffect(source)
```

```javascript
const box1ItemEl = document.querySelector('.box1')
const kyEffect1 = new KeyframeEffect(
  box1ItemEl,
  {
    transform: ['translateX(0)', 'translateX(500px)'],
  },
  {
    duration: 3000,
    fill: 'forwards',
  },
)
const ky1 = new KeyframeEffect(kyEffect1)
new Animation(ky1).play()
```

#### 示例1：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KeyframeEffect</title>
    <style>
      .box1,
      .box2 {
        height: 100px;
        width: 100px;
        background-color: #000;
      }

      .box2 {
        margin-top: 50px;
      }

      #btnPlay {
        margin-top: 50px;
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
    <div>
      <button type="button" id="btnPlay">播放</button>
    </div>

    <script>
      const box1ItemEl = document.querySelector('.box1')
      const box2ItemEl = document.querySelector('.box2')

      btnPlay.onclick = () => {
        const kyEffect1 = new KeyframeEffect(
          null,
          {
            transform: ['translateX(0)', 'translateX(500px)'],
          },
          {
            duration: 3000,
            fill: 'forwards',
          },
        )

        const ky1 = new KeyframeEffect(kyEffect1)
        ky1.target = box1ItemEl
        new Animation(ky1).play()

        const ky2 = new KeyframeEffect(kyEffect1)
        ky2.target = box2ItemEl
        new Animation(ky2).play()
      }
    </script>
  </body>
</html>
```

### 示例2：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KeyframeEffect</title>
    <style>
      .box1,
      .box2 {
        height: 100px;
        width: 100px;
        background-color: #000;
      }

      .box2 {
        margin-top: 50px;
      }

      #btnPlay {
        margin-top: 50px;
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
    <div>
      <button type="button" id="btnPlay">播放</button>
    </div>

    <script>
      const box1ItemEl = document.querySelector('.box1')
      const box2ItemEl = document.querySelector('.box2')

      btnPlay.onclick = () => {
        const kyEffect1 = new KeyframeEffect(
          null,
          {
            transform: ['translateX(0)', 'translateX(500px)'],
          },
          {
            duration: 3000,
            fill: 'forwards',
          },
        )

        const kyEffect2 = new KeyframeEffect(
          null,
          {
            transform: ['rotate(0)', 'rotate(720deg)'],
          },
          {
            duration: 6000,
            fill: 'forwards',
          },
        )
        kyEffect1.target = box1ItemEl
        kyEffect2.target = box2ItemEl
        new Animation(kyEffect1).play()
        new Animation(kyEffect2).play()
      }
    </script>
  </body>
</html>
```

### Animation

* 提供播放控制、动画节点或者源的时间轴。可以接受使用 KeyframeEffect 构造函数创建的对象作为参数
* 常用方法
  * cancel(): 取消
  * finish(): 完成
  * pause(): 暂停
  * play(): 播放
  * reverse(): 逆转播放方向

### Animation 事件监听

* event 方式

* Promise 形式

  ```javascript
  animation.onfinish = function () {
    element.remove()
  }
  animation.addEventListener('finish', function () {
    element.remove()
  })
  animation.finished.then(() => {
    element.remove()
  })
  ```

* 常用事件类型

  * oncancel: 取消
  * onfinish: 完成
  * onremove: 删除

### 便捷的 Element.animate

> MDN:[https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate)

* 任何 Element 都具备该方法

* 语法；

  ```javascript
  animate(keyframes, options)
  ```

#### Element.animate: keyframes

* 数组形式

  ```javascript
  element.animate([
    { opactity: 1 },
    { opactity: 0.1, offset: 0.7 },
    { opactity: 0. }
  ], 2000)
  ```

* 对象形式

  ```javascript
  element.animate({
    opactity: [0, 0.9, 1],
    offset: [0, 0.8], // [0,0.8,1]的简写
    easing: ["ease-in", "ease-out"]
  }, 2000)
  ```

#### Element.animate: options

* 和 new KeyframeEffect(target, keyframes, options) 的第三个参数基本一致，但是多了一个可选属性，就是 id, 用来标记动画，也方便在 Element.getAnimations 结果中精确的查找

#### Element.getAnimations

* 我们可以通过 Element.animate 或者 创建 Animation 给 Element 添加很多动画，通过这个方法可以获得所有 Animation 的实例

* 在需要批量修改参数，或者批量停止动画的时候，那可是大杀器

  ```javascript
  box1ItemEl.getAnimations().forEach(ani => ani.pause())// 暂停全部动画
  ```

#### 示例1：监听播放完成的两种形式

> callback + Promise 形式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Animation</title>
    <style>
      .box1,
      .box2 {
        height: 100px;
        width: 100px;
        background-color: #000;
      }

      .box2 {
        margin-top: 50px;
      }

      #btnPlay,
      #btnPlayPromise {
        margin-top: 50px;
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
    <div>
      <button type="button" id="btnPlay">播放 callback</button>
      <button type="button" id="btnPlayPromise">播放 Promise</button>
    </div>

    <script>
      const box1ItemEl = document.querySelector('.box1')
      const box2ItemEl = document.querySelector('.box2')

      const kyEffect = new KeyframeEffect(
        null,
        {
          transform: ['translateX(0)', 'translateX(500px)'],
        },
        {
          duration: 3000,
          fill: 'forwards',
        },
      )
      btnPlay.onclick = () => {
        const ky1 = new KeyframeEffect(kyEffect)
        ky1.target = box1ItemEl
        const ani = new Animation(ky1)
        ani.play()
        ani.onfinish = function () {
          console.log('box1 animation finished')
        }
        ani.addEventListener('finish', function () {
          console.log('box1 animation finished: addEventListener')
        })
      }

      btnPlayPromise.onclick = async () => {
        const ky1 = new KeyframeEffect(kyEffect)
        ky1.target = box2ItemEl
        const ani = new Animation(ky1)
        ani.play()
        await ani.finished
        console.log('box2 animation finished')
      }
    </script>
  </body>
</html>
```

#### 示例2：getAnimations

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Animation getAnimations</title>
    <style>
      .box1 {
        height: 100px;
        width: 100px;
        background-color: #000;
        position: absolute;
      }

      #btnPlay {
        margin-top: 50px;
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div style="overflow: hidden; height: 150px">
      <div class="box1"></div>
    </div>
    <div>
      <button type="button" id="btnPlay">播放</button>
    </div>

    <script>
      const box1ItemEl = document.querySelector('.box1')

      const kyEffect1 = new KeyframeEffect(
        box1ItemEl,
        {
          left: ['0', '100px'],
        },
        {
          duration: 3000,
          fill: 'forwards',
        },
      )

      const kyEffect2 = new KeyframeEffect(
        box1ItemEl,
        {
          transform: ['rotate(0)', 'rotate(720deg)'],
        },
        {
          duration: 6000,
          fill: 'forwards',
        },
      )

      btnPlay.onclick = () => {
        new Animation(kyEffect1).play()
        new Animation(kyEffect2).play()

        Promise.all(box1ItemEl.getAnimations().map((a) => a.finished)).then(
          function () {
            console.log('all animations finished')
          },
        )
      }
    </script>
  </body>
</html>
```

### 优势

* 相对 CSS 动画，更加灵活
* 相对于 requestAnimation/setTimeout/setInterval 动画，性能更好，代码更简洁
* 部分 API 天然支持 Promise

### 与 CSS 动画参数属性键对照表

| Web Animation API | CSS                       |
| ----------------- | ------------------------- |
| delay             | animation-delay           |
| duration          | animation-duration        |
| iterations        | animation-iteration-count |
| directions        | animation-direction       |
| easing            | animation-timing-function |
| fill              | animation-fill-mode       |

### 与 CSS 参数设置上的区别

* duration 参数只支持毫秒
* 迭代次数无限使用的 JS 是 Infinity, 不是字符串的 "infinite"
* 默认动画的贝塞尔是 linear, 而不是 css 的 ease

### 兼容性

* safari 偏差
* 如果不行，可以使用垫片 [https://github.com/web-animations/web-animations-js](https://github.com/web-animations/web-animations-js)

## 04: 其他动画方案

### 动画绘制技术

* Canvas
* SVG
* HTML

### Canvas

#### 定义

* Canvas 是 H5 新增的一个元素对象，其实就是一个画布，浏览器 js 具有相应的 API，直接绘制即可实现动画
* 基于 Canvas 的游戏引擎
  * Three.js
  * Cocos
  * LayaAir
  * ...

#### Canvas 优势

* 定制型更强
* 动画性能较高

#### Canvas 劣势

* 事件分发由 canvas 处理，绘制的内容事件需要自己做处理
* 依赖于像素，无法高效保真
* 文本渲染较弱
* 自己编写太过麻烦

### Gif 动画

#### 定义

* 原理：多张静态图片压缩组合在一起，长连贯播放

#### Gif 动画 优势

* 开发成本低
* 沟通成本少
* 兼容性好

#### Gif 动画 劣势

* 体积较大
* 支持的透明度有限
* 只能循环播放，不好控制

### aPng 动画

#### 原理

> 通过算法计算帧之间的差异，只存储帧之间的差异，而不是存储全帧，使得 APNG 文件大小有显著的减少

#### aPng 动画 优势

* 相比 gif 可以容纳更多色彩
* 向下兼容 png 格式图片
* 支持透明通道
* 体积比 gif 要小

#### aPng 动画 劣势

* 兼容性问题
* 不易控制

### webP 动画

* WebP 是一种新的图像格式。WebP图像的尺寸缩小了大约 30%, 最重要的是在压缩率上全面超越了 gif 和 apng

### 帧动画

#### 定义

* 通常是一张一张序列帧连续播放的效果。100张图片就需要请求100次，一般我们做成精灵图

#### 帧动画优势

* 适配性好
* 开发成本中等

#### 帧动画劣势

* 合成的精灵图较大，不同分辨率可能失真

### SVG 动画

* svg 是一种用于描述二维的矢量图形，基于 XML 标记语言
* 最重要的一点就是：它允许沿着运动路径运行。svg 有很多自己的元素标签，比如 animate 元素

### lottie

* lottie 可以渲染类型为：svg, canvas, html
* 通过官方的 lottie 库，解析 lottie 的配置文件 .json 文件，然后根据设计师画图的参数，渲染出相对应的 内容

### svgas

* 原理:设计师将动画脚本导出，然后在对应的客户端重新合成这些位图。与Lottie的区别在于导出方式以及库解析方式不一样，都有各自的标准，SVGA 使用的是另外一套逻辑，SVGA 不关心关键顿，因为 SVGA 里面的每一顺都是关键帧! 也就是说，SVGA已经在导出动画的时候，把每一的信息都计算好了。这样，Player 也就不用关心插值计算的过程
* 弊端：需要与设计师多次沟通，询问 ImageKey

### VAP 动效

* VAP(Video Animation Player) 是企鹅电竞开发，用于播放酷炫动画的实现方案
* 相比 Webp, Apng 动图方案，具有高压缩率（素材更小）、硬件编码（解码更快）的优点
* 相比Lottie, 能实现更复杂的动画效果（比如粒子特效）

### Video 播放 mp4 视频动画

```html
<video src="xxxx" autoplay muted loop poster="xxx" controls="false"> </video>
```

## 05: 计时器面向 next 编程

### 定时器

* 前端常见三大定时器：setTimeout、setInterval、requestAnimationFrame
* 多次调用规律：处理完数据后，进入**下一个**周期

### 一个 setTimeout 的例子：倒计时

* setTimeout 回调函数暂停时间
* clearTimeout 暂停或者结束计时
* 结束时，启动一个新的计时器（next)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>setTimeout</title>
    <style>
      * {
        font-size: 28px;
      }

      .wrapper {
        margin: 50px;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <span id="seconds">60</span>
      <div>
        <button id="btnPause">暂停</button>
        <button id="btnContinue">继续</button>
      </div>
    </div>

    <script>
      const secondsEl = document.getElementById('seconds')
      const INTERVAL = 1000
      let ticket
      let seconds = 60
      function setSeconds(val) {
        secondsEl.innerText = val
      }

      function onTimeout() {
        seconds--
        setSeconds(seconds)
        ticket = setTimeout(onTimeout, INTERVAL)
      }

      ticket = setTimeout(onTimeout, INTERVAL)

      document.getElementById('btnPause').addEventListener('click', () => {
        clearTimeout(ticket)
      })

      document.getElementById('btnContinue').addEventListener('click', () => {
        ticket = setTimeout(onTimeout, INTERVAL)
      })
    </script>
  </body>
</html>
```

### 上述例子，存在的问题？

* INTERVAL ticket 和 setTimeout 满天飞，不够优雅，我们应该更关心业务的处理
* 有多处类似的逻辑，就得重复的书写 setTimeout, 缺少复用
* 语义不好

### 一个 setTimeout 的例子：next 版本

> 代码在后面

* start 开始
* next 继续
* cancal 取消
* continute 继续

```javascript
nextFactory.start(function (next) {
  seconds--;
  setSeconds(seconds);
  next();
});

document.getElementById("btnPause").addEventListener("click", () => {
  nextFactory.cancel();
});

document.getElementById("btnContinue").addEventListener("click", () => {
  nextFactory.continue();
});
```

### requestAnimationFrame：canvas 绘制

* requestAnimationFrame 回调绘制时间
* cancelAnimationFrame 取消计划
* **新的 requestAnimationFrame 启动下次， next **

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>requestAnimationFrame</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div style="margin: 50px">
      <canvas id="canvas" height="300" width="300"></canvas>
    </div>
    <div>
      <div>
        <button id="btnPause">暂停</button>
        <button id="btnContinue">继续</button>
      </div>
    </div>

    <script>
      let ticket
      let count = 0

      let lastTime
      const canvasEl = document.getElementById('canvas')
      const ctx = canvasEl.getContext('2d')
      ctx.fillStyle = '#f00'
      ctx.fillRect(0, 0, 300, 300)

      function drawTime() {
        ctx.clearRect(0, 0, 300, 300)
        ctx.fillStyle = '#f00'
        ctx.fillRect(0, 0, 300, 300)

        ctx.fillStyle = '#000'
        ctx.font = 'bold 20px Arial'
        ctx.fillText(Date.now(), 100, 100)
      }

      function onRequestAnimationFrame() {
        count++
        drawTime()
        const now = Date.now()
        console.log('cost:', now - lastTime)
        lastTime = now
        ticket = requestAnimationFrame(onRequestAnimationFrame)
      }

      lastTime = Date.now()
      ticket = requestAnimationFrame(onRequestAnimationFrame)

      document.getElementById('btnPause').addEventListener('click', () => {
        cancelAnimationFrame(ticket)
      })

      document.getElementById('btnContinue').addEventListener('click', () => {
        requestAnimationFrame(onRequestAnimationFrame)
      })
    </script>
  </body>
</html>
```

### requestAnimationFrame：canvas 绘制 next 版本

* start 开始
* next 继续
* cancal 取消
* continute 继续

```javascript
nextFactory.start((next) => {
  count++
  console.log(count)
  drawTime()
  const now = Date.now()
  console.log('cost:', now - lastTime)
  lastTime = now
  next()
})

document.getElementById('btnPause').addEventListener('click', () => {
  nextFactory.cancel()
})

document.getElementById('btnContinue').addEventListener('click', () => {
  nextFactory.continue()
})
```

以上示例统一会使用 createRequestAnimationFrameGenerator方法

### createTimeoutGenerator 的背后

* timeoutGenerator 函数返回有 execute 与 cancel属性的对象，作为入参例化了一个 NextGenerator

* NextGenerator 是核心

  ```typescript
  export function createTimeoutGenerator(interval: number = 1000) {
    const timeoutGenerator: NextFnGenerator = function (cb: Function) {
      let ticket: number;
      function execute() {
        ticket = setTimeout(cb, interval);
      }
      return {
        execute,
        cancel: function () {
          clearTimeout(ticket);
        },
      } as NextFnInfo;
    };
    const factory = new NextGenerator(timeoutGenerator);
    return factory;
  }

### createRequestAnimationFrameGenerator

```typescript
export function createRequestAnimationFrameGenerator() {
  const requestAnimationFrameGenerator: NextFnGenerator = function (cb: FrameRequestCallback) {
    let ticket: any;
    function execute() {
      ticket = window.requestAnimationFrame(cb);
    }

    return {
      execute,
      cancel: function () {
        cancelAnimationFrame(ticket);
      },
    } as NextFnInfo;
  };

  const factory = new NextGenerator(requestAnimationFrameGenerator);
  return factory;
}
```

### 随心所欲的 next ?

* 构造有 execute 与 cancel 方法的一个对象
* 传入 NextGenerator 就拥有了 next 的能力

### 翻倍的计时器

* 翻倍的计时器，第一次 100ms, 第二次 200ms, 第三次 400ms

```javascript
export function createStepUpGenerator(interval: number = 1000) {
  let isFirst = true;
  const stepUpGenerator: NextFnGenerator = function (cb: Function) {
    let ticket: any;
    function execute() {
      interval = isFirst ? interval : interval * 2;
      ticket = setTimeout(cb, interval);
      isFirst = false;
    }

    return {
      execute,
      cancel: function () {
        clearTimeout(ticket);
      },
    } as NextFnInfo;
  };

  const factory = new NextGenerator(stepUpGenerator);
  return factory;
}
```

...

### 实战代码

[计时器面向next编程](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/13.%20%E8%AE%A1%E6%97%B6%E5%99%A8%E5%92%8CJS%E5%8A%A8%E7%94%BB/13.4%20%E5%AE%9E%E6%88%98%EF%BC%9A%E8%AE%A1%E6%97%B6%E5%99%A8%E9%9D%A2%E5%90%91next%E7%BC%96%E7%A8%8B/index.ts)