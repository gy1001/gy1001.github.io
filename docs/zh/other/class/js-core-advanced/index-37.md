# 37-封装无缝滚动对象

刚开始学习 JavaScript 的时候，真心觉得无缝滚动是一个神奇的功能。为什么明明只有几个方块，就是滚不到头？背后到底是怎么回事？

明白了原理之后，才知道原来是使用了一些障眼法来实现。

## 1-原理

假如需要无缝滚动的元素是一个 `ul.items` 中的 6 个 `li.item`。我们将控制 `ul.items` 在容器 `.wrap` 中滚动。

> ul.items 表示 className 为 items 的 ul 元素。

html 代码如下

```html
<div class="wrap">
  <ul class="items">
    <li class="item"><div>1</div></li>
    <li class="item"><div>2</div></li>
    <li class="item"><div>3</div></li>
    <li class="item"><div>4</div></li>
    <li class="item"><div>5</div></li>
    <li class="item"><div>6</div></li>
  </ul>
</div>
```

我们的目标是实现水平方向上的滚动，因此需要 `li.item` 水平排列。此处，我们使用 `display: inline-block` 的方式来达到布局目的。但是我们知道，这样的布局，元素之间会存在默认的间隙，我们可以使用 `<!-- -->` 的方式来消除间隙。

另外，我们还需要控制页面元素的移动。可以通过改变元素的 `left, top, translateX, translateY` 等方式来做到，布局的选择，同时也会影响到最终的方案。

在布局上，超出容器的部分，需要隐藏，此处的隐藏，是给`ul.items`的，注意与 float 布局的区别。

```css
.items {
  overflow: hidden;
}
```

`ul.items` 的内容不能折行，因此

```css
.items {
  white-space: nowrap;
}
```

需要适配到移动端，因此，`li.item`的宽度就必然会随着设备宽度的变小而变小。

```css
@media (max-width: 780px) {
  .item {
    width: 190px;
  }
}

@media (max-width: 580px) {
  .item {
    width: 160px;
  }
}
```

最后一个核心需要关注的问题，就是无缝滚动的障眼法，到底是什么呢？本来用图片描述可能会更直观一点，这里我偷个懒，用文字描述一下。

我们有子元素 123456，复制一份，就变成 123456123456。让元素们整体向左移动，如果我们在移动到第二个 1 的时候，将整体的位置瞬间重置为初始位置，此时中间发生的变化我们无法用肉眼识别出来，就会给人一种，一直在向左移动，永远都停不下来的感觉。

这就是障眼法的真谛。

## 2-功能实现

一说到运动，我们常常想到的方法可能是利用 `setTimeout/setInterval`，不过，html5 中，为我们提供了一个性能更加优秀的方法 `requestAnimationFrame`。

代码声明如下：

```javascript
nextFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    var currTime = + new Date,
      delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
    lastTime = currTime + delay;
    return setTimeout(callback, delay);
  },
cancelFrame = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  clearTimeout,
```

我们需要知道滚动什么位置时，整个过程回到初始状态，这个位置刚好就是复制之前所有子元素加在一起的总长度。但是子元素的宽度会因为设备的改变而改变，因此配合布局，我们需要做如下处理：

```javascript
// 此处结合 jQuery 来实现，
if ($items.children().eq(0).width() == 190) {
  itemW = 190
}
if ($items.children().eq(0).width() == 160) {
  itemW = 160
}
target = itemW * $items.children().length
```

> 该例子特地结合 jQuery 来实现，也是为了让大家感知一下语法不同，但原理万变不离其宗的感受

为了实现障眼法，需要复制一份子元素

```javascript
$items.html($items.html() + $items.html())
```

定义一个运动函数，这里的运动为匀速运动，因此比较简单，只需要一直 +1 即可。如果需要运动快一点，就多加一点

```javascript
function adAni() {
  timer = nextFrame(function () {
    scrollX += 1
    if (scrollX >= target) {
      scrollX = 0
    }
    $items.scrollLeft(scrollX)
    adAni()
  })
}
```

还有一些其他的需求。比如，鼠标 mouseover 时，需要停止滚动，离开之后又要重新启动滚动。因为需求的变化，在移动端还需要能够滑动 items.ul，手指松开之后继续滚动。因此我们需要一个区别 pc 与移动端的函数。通过 UA 的不同来区分。

```javascript
// 判断是否在移动端
function isMobile() {
  return 'ontouchstart' in document
}
```

在移动端，可以左右滑动，滑动时停止自动滚动，松开之后继续自动滚动。移动端的滑动事件，主要通过 touchstart, touchmove, touchend 来实现，与 pc 端的 mousedown, mousemove, mouseup 类似。

```javascript
var sX, sL
$items
  .on('touchstart', function (e) {
    cancelFrame(timer)
    sX = e.originalEvent.changedTouches[0].pageX
    sL = $items.scrollLeft()
  })
  .on('touchmove', function (e) {
    var dis = e.originalEvent.changedTouches[0].pageX - sX
    var nowX = sL - dis
    if (nowX > target) {
      nowX = 0
    }
    $items.scrollLeft(nowX)
  })
  .on('touchend', function (e) {
    scrollX = $items.scrollLeft()
    if (scrollX >= target) {
      scrollX = 0
    }
    adAni()
  })
```

到这里，功能基本上就已经搞定了，完整代码如下

```javascript
;(function ($) {
  var $items = $('.items'),
    lastTime = 0,
    nextFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        var currTime = +new Date(),
          delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime))
        lastTime = currTime + delay
        return setTimeout(callback, delay)
      },
    cancelFrame =
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      clearTimeout,
    scrollX = 0,
    itemW = 240,
    target = 0,
    timer = null

  if ($items.children().eq(0).width() == 190) {
    itemW = 190
  }
  if ($items.children().eq(0).width() == 160) {
    itemW = 160
  }
  target = itemW * $items.children().length

  $items.html($items.html() + $items.html())

  adAni()

  function adAni() {
    timer = nextFrame(function () {
      scrollX += 1
      if (scrollX >= target) {
        scrollX = 0
      }
      $items.scrollLeft(scrollX)
      adAni()
    })
  }
  if (!isMobile()) {
    $items
      .on('mouseover', function () {
        cancelFrame(timer)
      })
      .on('mouseout', function () {
        adAni()
      })
  }

  var sX, sL
  $items
    .on('touchstart', function (e) {
      cancelFrame(timer)
      sX = e.originalEvent.changedTouches[0].pageX
      sL = $items.scrollLeft()
    })
    .on('touchmove', function (e) {
      var dis = e.originalEvent.changedTouches[0].pageX - sX
      var nowX = sL - dis
      if (nowX > target) {
        nowX = 0
      }
      $items.scrollLeft(nowX)
    })
    .on('touchend', function (e) {
      scrollX = $items.scrollLeft()
      if (scrollX >= target) {
        scrollX = 0
      }
      adAni()
    })

  // 判断是否在移动端
  function isMobile() {
    return 'ontouchstart' in document
  }
})(jQuery)
```

那么，如何封装成为一个 jQuery 插件，就交给大家自己来完成啦！动手实践一下，应该不难搞定。
