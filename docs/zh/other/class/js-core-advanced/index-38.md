# 38-封装运动框架

单从技术的角度来看，JavaScript 动画能力的掌握与否，会将前端程序员的能力水平划分到不同的 level 中。很显然，大多数人并不知道如何使用 JavaScript 封装一个动画函数，去满足日常的动画需求。因此，不管你承认还是不承认，不掌握动画能力，你自己就会感觉比别人弱一等。这就是动画的重要性。

当然，使用原生代码自己封装动画，也并非那么困难，跟着我的思路，一起来思考并动手实践就能搞定。

## *1*

**如何让元素动起来**

在封装拖拽和封装无缝滚动时，我们都有思考过这个问题。此时我们还需要继续思考。

如果我是想改变元素的位置信息，那么就可以通过改变元素的 `left, top, translate` 等属性，让元素的位置发生改变，这时元素就能动起来。

如果我是想改变元素的宽度，那么就可以通过改变元素的 `width` 属性就能做到。

如果我是想改变元素的颜色，那么就可以通过改变元素的`color` 属性就能做到。

因此，运动的实现，与 css 属性息息相关。

此时我们还需要思考一个非常重要的问题，在实践中，我们**使用动画的目的是什么？** 这关系到动画原理的核心。

例如我们修改元素的宽度，想要从 100px 修改成为 200px，如果不使用动画，可以直接修改为 200px。而使用动画的目的，是为了让这个改变的效果更为直观，看上去逼格更高，页面功能更生动。因此，本来能一次就做到的事情，我们分成很多次来完成。

这就是动画的核心：**将目标分片，并连续执行**

这里面涉及到两个概念需要我们搞清楚，一个是如何切分目标。二个是如何连续执行，

## *2*

**如何将目标分片**

要思考如何将目标分片，那么必然的，就必须知道目标是多少。例如我们希望元素能够移动 100 像素，那么目标就是 100 像素。

这时方案就有很多种，

我们可以每一次就移动 1px，移动 100 次。也可以每一次就移动 2px，移动 50 次。那么应该如何选择，这里面的已知条件有哪些？

很显然，就是时间。

一个是**目标时间**。我们常常会将移动的总时间作为参数，传入到运动过程中，告诉函数，这 100px，需要在 1s 之内完成。

另外一个还需要重视的知识点，就是**时间间隔**。只有存在时间间隔，才能延长动画总时间。而时间间隔应该取多少比较合适呢？这和浏览器的渲染频率有关系。

大多数浏览器的渲染频率是 1 秒钟，渲染 60次「刷新率60Hz」。在这个频率之下，浏览器能够流畅的完成自己的工作。也就是说，合理的时间间隔应该是 1000/60 约等于 16.7 ms.

如果我们设定的间隔时间小于了 16.7 ms，那么对于浏览器来说，就造成了额外的压力，页面就会卡顿，甚至掉帧「分片的某一片被跳过而无法渲染」。

于是，有了总时间，有了间隔时间，有了目标距离，那么如何分片就变得很简单

```
// 执行多少次 = 目标时间 / 间隔时间
const count = 1000 / (1000/60)

// 每一次运动多少距离 = 目标距离 / 次数
const s = 100 / count
```

## *3*

**如何连续执行**

要连续执行，又跟间隔时间有关系，我们很自然就能够想到定时器函数 `setInterval/setTimeout/requestAnimationFrame`。

但是了解 `setInterval` 内部机制的同学应该知道，`setInterval` 设置的间隔时间，包含了函数的执行时间。

比如如下一个例子。我们试图每隔 100ms 执行一次函数 foo。实现如下：

```
var i = 0;
// 伪函数
setInterval(function() {
  foo(i++)
}, 100)
```

这 100ms，会包含函数 foo 的执行时间。如下图所示。

也就是说，函数的真实间隔时间，会小于 100ms。而如果函数的执行时间，超过了 100ms，那么真实间隔实践就会变得不存在。

基于这个原因，通常清晰下我们不会选择 `setInterval` 来达到我们连续执行的目的。

如果我们使用 setTimeout 应该怎么做呢？

setTimeout 自身并不具备连续执行的特性，因此需要使用递归在符合条件的情况下，反复创建新的 setTimeout 函数。代码大概如下：

```
var timer = null
ani()
function ani() {
  // 打个 log 观察一下函数执行
  console.log('ani 执行了一次')
  clearTimeout(timer)
  if (true) {    
    timer = setTimeout(ani, 1000 / 60)
  }
}
```

`requestAnimationFrame` 同样能够使用与 setTimeout 类似的方式，做到连续执行。

```
var timer = null
function step() {
  cancelAnimationFrame(timer)
  console.log('step 执行了一次')
  if (true) {
    timer = requestAnimationFrame(step)
  }
}

timer = requestAnimationFrame(step)
```

这里需要注意的是，该 api 对应的是浏览器的渲染次数，也就是说，每一次渲染，都能够执行一次，所以我们并不用去为它设置间隔时间，默认的间隔时间，就是浏览器的渲染间隔 1000 / 60。

相比于 setTimeout，requestAnimationFrame 有几个明显的优势。

1. requestAnimationFrame 的执行与浏览器渲染严格一致，例如在页面切换等常见下，浏览器不再绘制页面，它也会停止绘制，这种同步能够极大的节省资源。
2. setTimeout 需要独立绘制，而多个 requestAnimationFrame 可以同时进行，因此，当多个动画执行时，流畅度 setTimeout 完败。
3. 通过事件循环我们可以知道，setTimeout 只能串行执行，会影响到其他 js 代码的处理。

综合评估之下，使用 requestAnimationFrame 性能更佳，交互体验更流畅。

因此我们在实践中，只要浏览器支持，就会优先考虑使用 requestAnimationFrame。

兼容代码如下：

```
const nextFrame = window.requestAnimationFrame || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame || 
                  window.msRequestAnimationFrame ||
                  function(callback) {
                    let curtime = +new Date, delay = Math.max(1000 / 60, 1000 / 60 - (curtime - lasttime));
                    lasttime = curtime + delay
                    return setTimeout(callback, delay)
                  };

// 偷个懒                  
const cancelFrame = window.cancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    clearTimeout;
```

## *4*

**动画函数**

在使用 css3 实现动画时，我们知道通过设置不同的动画函数就能够做到不同的运动曲线。例如 `linear, ease, ease-in, ease-out, ease-in-out`。使用 JavaScript 也能够做到同样的事情。

动画函数的作用在于帮助我们在给目标分片时，让每一帧运行的分片不同。以此来让运动速度发生变化。

有许多大神已经研究出来了许多常用的动画函数，我们直接使用即可。

JavaScript 有一个工具库 Tween 与之对应的，我们可以搜索使用，在本案例中，我们就从其中拿几个出来完成运动的实现。

```
// 动画函数
const tween = {
  linear: function (t, b, c, d) { return c * t / d + b; },
  ease: function (t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
  'ease-in': function (t, b, c, d) { return c * (t /= d) * t * t + b; },
  'ease-out': function (t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; },
  'ease-in-out': function (t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b; },
  bounce: function (t, b, c, d) { if ((t /= d) < (1 / 2.75)) { return c * (7.5625 * t * t) + b; } else if (t < (2 / 2.75)) { return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b; } else if (t < (2.5 / 2.75)) { return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b; } else { return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b; } }
}
```

完整代码如下：

```
let lasttime = 0
const nextFrame = window.requestAnimationFrame || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame || 
                  window.msRequestAnimationFrame ||
                  function(callback) {
                    let curtime = +new Date, delay = Math.max(1000 / 60, 1000 / 60 - (curtime - lasttime));
                    lasttime = curtime + delay
                    return setTimeout(callback, delay)
                  };

// 偷个懒                  
const cancelFrame = window.cancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    clearTimeout;


// 动画函数
const tween = {
  linear: function (t, b, c, d) { return c * t / d + b; },
  ease: function (t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
  'ease-in': function (t, b, c, d) { return c * (t /= d) * t * t + b; },
  'ease-out': function (t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; },
  'ease-in-out': function (t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b; },
  bounce: function (t, b, c, d) { if ((t /= d) < (1 / 2.75)) { return c * (7.5625 * t * t) + b; } else if (t < (2 / 2.75)) { return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b; } else if (t < (2.5 / 2.75)) { return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b; } else { return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b; } }
}

const rect = document.querySelector('.rect');
// 动画持续时间                    
const duration = 1000;
let timer = null

// target 为目标距离
function slideTo(target) {
  const stime = Date.now()
  cancelFrame(timer)
  ani()
  function ani() {
    const offset = Math.min(duration, Date.now() - stime)
    const s = tween.ease(offset, 0, 1, duration)
    if (offset < duration) {
      rect.style.left = `${s * target}px`
      timer = nextFrame(ani)
    }
  }
}

slideTo(400)
```

## *5*

**思考题**

1、如果要进一步封装成为一个工具方法应该怎么做？变量是什么？公共逻辑又是什么？

```
function animate(element, duration, target, easing = 'linear') {
  // todo
}
```

2、如果修改的是 width 或者透明度等其他属性动画应该怎么做呢？