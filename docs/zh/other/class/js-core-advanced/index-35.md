# 35-封装拖拽对象

基础概念的掌握并不是很难，但是要真正的转化为自己的知识，则需要通过大量的实践才行。

## *1*

**如何让一个DOM元素动起来。**

拖拽的本质就是让 DOM 元素能够跟着鼠标运动起来。因此，让元素动起来，是我们首先要解决的问题。

设想一下，在我们的页面中仅有一个 `.autumn` 的 div 标签。它的基本样式如下：

```
<div class="autumn"></div>
.autumn {
  width: 20px;
  height: 20px;
  background-color: orange;
}
```

大家思考一下，当我们希望 `.autumn` 运动时 *（即让它的位置发生变化）*，可以通过哪些途径？

熟悉 CSS 的同学 5 秒钟就能够想到不少方法，例如改变`.autumn`的 margin 值，或者设置 `.autumn` 的定位方式为`relative`，修改其 `left/top` 属性。又或者直接修改它的 `translate` 值。

通常情况下不会去修改 margin 值让元素的位置发生改变，以避免对其他元素造成影响。

这里以修改 `left` 为例，一起来实现一下元素被点击一下就往右移动5个像素的效果。代码如下：

```
var autumn = document.querySelector('.autumn');
autumn.style.position = 'relative';

autumn.addEventListener('click', function() {
  this.style.left = (this.offsetLeft + 5) + 'px';
}, false);
```

但是当页面所处的环境支持css3属性 `translate` 时，我更建议大家在处理元素运动时去修改 `translate` 的值。因为修改 `left/top` 可能会导致频繁的重排与回流，而 `translate` 的属性，则会被作为合成图层，在 GPU 上进行渲染。结果更为流畅。

```
.autumn {
  transform: translateX(0px);
}
```

在我们使用 `translate` 时，不得不面临一个兼容性的问题。

不同浏览器的兼容写法包括如下几种：

```
['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform']
```

因此我们需要判断当前浏览器环境支持的 `transform` 属性是哪一种，方法如下：

```
// 获取当前浏览器支持的transform兼容写法
function getTransform() {
  var transform = '',
    divStyle = document.createElement('div').style,
    _transforms = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
    i = 0,
    len = _transforms.length;

  for (; i < len; i++) {
    if (_transforms[i] in divStyle) {
      // 找到之后立即返回，结束函数
      return transform = _transforms[i];
    }
  }

  // 如果没有找到，就直接返回空字符串
  return transform;
}
```

该方法用于获取当前浏览器支持的 `transform` 属性。如果返回空字符串，则表示浏览器不支持 `transform`，这个时候我们就需要退而求其次选择 `left/top`。

## *2*

**如何获取元素的初始位置**

为了获取元素的初始位置，我们需要声明一个专门用来获取元素样式的功能函数。获取元素样式在 IE 与其他浏览器中有所不同，因此需要一个兼容性的写法。代码如下：

```
function getStyle(elem, property) {
  // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
  return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] : elem.currentStyle[property];
}
```

有了这个方法之后，我们就可以动手来实现一个获取元素位置的方法了。代码如下：

```
function getTargetPos(elem) {
  var pos = { x: 0, y: 0 };
  var transform = getTransform();
  if (transform) {
    var transformValue = getStyle(elem, transform);
    if (transformValue == 'none') {
      elem.style[transform] = 'translate(0, 0)';
      return pos;
    } else {
      var temp = transformValue.match(/-?\d+/g);
      return pos = {
        x: parseInt(temp[4].trim()),
        y: parseInt(temp[5].trim())
      }
    }
  } else {
    if (getStyle(elem, 'position') == 'static') {
      elem.style.position = 'relative';
      return pos;
    } else {
      var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
      var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);
      return pos = {
        x: x,
        y: y
      }
    }
  }
}
```

在拖拽过程中，我们需要不停的设置目标元素的位置，这样他才能够移动起来。因此我们还需要声明一个设置元素位置的方法。

```
// pos = { x: 200, y: 100 }
function setTargetPos(elem, pos) {
  var transform = getTransform();
  if (transform) {
    elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
  } else {
    elem.style.left = pos.x + 'px';
    elem.style.top = pos.y + 'px';
  }
  return elem;
}
```

有了这几个工具方法，那么我们可以使用更为完善的方式来实现上述要求的效果。代码如下：

```
var autumn = document.querySelector('.autumn');

autumn.addEventListener('click', function () {
  var curPos = getTargetPos(this);
  setTargetPos(this, {
    x: curPos.x + 5,
    y: curPos.y
  });
}, false);
```

## *3*

**拖拽的原理**

可以结合`mousedown, mousemove, mouseup`这三个事件来帮助我们实现拖拽。

- `mousedown`: 鼠标按下时触发
- `mousemove`: 鼠标移动时触发
- `mouseup`: 鼠标松开时触发

我们能够在这些事件触发的回调函数中得到一个**事件对象**。通过事件对象能够获取到当前鼠标所处的精确位置。鼠标位置信息是实现拖拽的关键。

当鼠标按下(mousedown触发)时，我们需要记住鼠标的初始位置与目标元素的初始位置。当鼠标移动时，目标元素也跟着移动，那么鼠标与目标元素的位置则有如下的关系：

**移动后鼠标位置 - 鼠标初始位置 = 移动后目标元素位置 - 目标元素初始位置**

如果鼠标位置的差值我们用变量`dis`来表示，那么目标元素的位置就等于：

**移动后目标元素位置 = dis + 目标元素的初始位置**

通过事件对象中提供的鼠标精确位置信息，在鼠标移动时我们可以很轻易的计算出鼠标移动位置的差值。然后根据上面的关系，计算出目标元素的当前位置，这样拖拽就能够实现了。

## *4*

**代码实现**

**part1: 准备工作。**

```
// 获取目标元素对象
var autumn = document.querySelector('.autumn');

// 声明2个变量用来保存鼠标初始位置的x，y坐标
var startX = 0;
var startY = 0;

// 声明2个变量用来保存目标元素初始位置的x，y坐标
var sourceX = 0;
var sourceY = 0;
```

**part2: 功能函数**

因为之前已经贴过代码，就不再重复

```
// 获取当前浏览器支持的transform兼容写法
function getTransform() {}

// 获取元素属性
function getStyle(elem, property) {}

// 获取元素的初始位置
function getTargetPos(elem) {}

// 设置元素的初始位置
function setTargetPos(elem, potions) {}
```

**part3: 声明三个事件的回调**

```
function move(event) {
  // 获取鼠标当前位置
  var currentX = event.pageX;
  var currentY = event.pageY;

  // 计算差值
  var distanceX = currentX - startX;
  var distanceY = currentY - startY;

  // 计算并设置元素当前位置
  setTargetPos(autumn, {
    x: (sourceX + distanceX).toFixed(),
    y: (sourceY + distanceY).toFixed()
  })
}

function end(event) {
  document.removeEventListener('mousemove', move);
  document.removeEventListener('mouseup', end);
  // do other things
}
```

OK，一个简单的拖拽，就这样愉快的实现了。

## *5*

**封装**

在前面一章我们学习了面向对象的基础知识。基于这些基础知识我们来将上面实现的拖拽封装为一个拖拽对象。我们的目标是，只要我们声明一个拖拽实例，那么传入的目标元素将自动具备可以被拖拽的功能。

在实际开发中，一个对象我们常常会单独放在一个js文件中，这个js文件将单独作为一个模块，利用各种模块的方式组织起来使用。当然这里没有复杂的模块交互，因为这个例子，我们只需要一个模块即可。

为了避免变量污染，我们需要将模块放置于一个函数自执行方式模拟的块级作用域中。

```
;
(function() {
  ...
})();
```

> 在普通的模块组织中，我们只是单纯的将许多js文件压缩成为一个js文件，因此此处的第一个分号则是为了防止上一个模块的结尾不用分号导致报错。必不可少。当然在通过require或者ES6模块等方式就不会出现这样的情况。

我们知道，在封装一个对象的时候，我们可以将属性与方法放置于构造函数或者原型中，而在增加了自执行函数之后，我们又可以将属性和方法防止与模块的内部作用域。这是闭包的知识。

**那么我们面临的挑战就在于，如何合理的处理属性与方法的位置。**

当然，每一个对象的情况都不一样，不能一概而论，我们需要清晰的知道这三种位置的特性才能做出最适合的决定。

- 构造函数中： 属性与方法为当前实例单独拥有，只能被当前实例访问，并且每声明一个实例，其中的方法都会被重新创建一次。
- 原型中： 属性与方法为所有实例共同拥有，可以被所有实例访问，新声明实例不会重复创建方法。
- 模块作用域中：属性和方法不能被任何实例访问，但是能被内部方法访问，新声明的实例，不会重复创建相同的方法。

对于方法的判断比较简单。

因为在构造函数中的方法总会在声明一个新的实例时被重复创建，因此我们声明的方法都尽量避免出现在构造函数中。

而如果你的方法中需要用到构造函数中的变量，或者想要公开，那就需要放在原型中。

如果方法需要私有不被外界访问，那么就放置在模块作用域中。

对于属性放置于什么位置有的时候很难做出正确的判断，因此我很难给出一个准确的定义告诉你什么属性一定要放在什么位置，这需要在实际开发中不断的总结经验。但是总的来说，仍然要结合这三个位置的特性来做出最合适的判断。

如果属性值只能被实例单独拥有，比如person对象的name，只能属于某一个person实例，又比如这里拖拽对象中，某一个元素的初始位置，也仅仅只是这个元素的当前位置，这个属性，则适合放在构造函数中。

而如果一个属性仅仅供内部方法访问，这个属性就适合放在模块作用域中。

> 关于面向对象，上面的几点思考我认为是这篇文章最值得认真思考的精华。如果在封装时没有思考清楚，很可能会遇到很多你意想不到的bug，所以建议大家结合自己的开发经验，多多思考，总结出自己的观点。

根据这些思考，大家可以自己尝试封装一下。然后与我的做一些对比，看看我们的想法有什么不同，在下面例子的注释中，我将自己的想法表达出来。

```
;
(function () {
  // 这是一个私有属性，不需要被实例访问
  var transform = getTransform();

  function Drag(selector) {
    // 放在构造函数中的属性，都是属于每一个实例单独拥有
    this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector);
    this.startX = 0;
    this.startY = 0;
    this.sourceX = 0;
    this.sourceY = 0;

    this.init();
  }


  // 原型
  Drag.prototype = {
    constructor: Drag,

    init: function () {
      // 初始时需要做些什么事情
      this.setDrag();
    },

    // 稍作改造，仅用于获取当前元素的属性，类似于getName
    getStyle: function (property) {
      return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem, false)[property] : this.elem.currentStyle[property];
    },

    // 用来获取当前元素的位置信息，注意与之前的不同之处
    getPosition: function () {
      var pos = { x: 0, y: 0 };
      if (transform) {
        var transformValue = this.getStyle(transform);
        if (transformValue == 'none') {
          this.elem.style[transform] = 'translate(0, 0)';
        } else {
          var temp = transformValue.match(/-?\d+/g);
          pos = {
            x: parseInt(temp[4].trim()),
            y: parseInt(temp[5].trim())
          }
        }
      } else {
        if (this.getStyle('position') == 'static') {
          this.elem.style.position = 'relative';
        } else {
          pos = {
            x: parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
            y: parseInt(this.getStyle('top') ? this.getStyle('top') : 0)
          }
        }
      }

      return pos;
    },

    // 用来设置当前元素的位置
    setPostion: function (pos) {
      if (transform) {
        this.elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
      } else {
        this.elem.style.left = pos.x + 'px';
        this.elem.style.top = pos.y + 'px';
      }
    },

    // 该方法用来绑定事件
    setDrag: function () {
      var self = this;
      this.elem.addEventListener('mousedown', start, false);
      function start(event) {
        self.startX = event.pageX;
        self.startY = event.pageY;

        var pos = self.getPosition();

        self.sourceX = pos.x;
        self.sourceY = pos.y;

        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', end, false);
      }

      function move(event) {
        var currentX = event.pageX;
        var currentY = event.pageY;

        var distanceX = currentX - self.startX;
        var distanceY = currentY - self.startY;

        self.setPostion({
          x: (self.sourceX + distanceX).toFixed(),
          y: (self.sourceY + distanceY).toFixed()
        })
      }

      function end(event) {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', end);
        // do other things
      }
    }
  }

  // 私有方法，仅仅用来获取transform的兼容写法
  function getTransform() {
    var transform = '',
      divStyle = document.createElement('div').style,
      transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

      i = 0,
      len = transformArr.length;

    for (; i < len; i++) {
      if (transformArr[i] in divStyle) {
        return transform = transformArr[i];
      }
    }

    return transform;
  }

  // 一种对外暴露的方式
  window.Drag = Drag;
})();

// 使用：声明2个拖拽实例
new Drag('target');
new Drag('target2');
```

这样一个拖拽对象就封装完毕了。

建议大家根据我提供的思维方式，多多尝试封装一些组件。比如封装一个弹窗，封装一个循环轮播等。练得多了，面向对象就不再是问题了。这种思维方式，在未来任何时候都是能够用到的。

## *6*

**扩展为 jQuery 插件**

在前面的学习我们已经知道了可以使用`$.extend`扩展jquery工具方法，使用`$.fn.extend`扩展原型方法。当然，这里的拖拽插件扩展为原型方法是最合适的。

```
// 通过扩展方法将拖拽扩展为jQuery的一个实例方法
(function ($) {
  $.fn.extend({
    canDrag: function () {
      new Drag(this[0]);
      return this;   // 注意：为了保证jQuery所有的方法都能够链式访问，每一个方法的最后都需要返回this，即返回jQuery实例
    }
  })
})(jQuery);
```

这样我们就能够很轻松的让目标DOM元素具备拖拽能力。

```
$('target').canDrag();
```