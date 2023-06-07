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

