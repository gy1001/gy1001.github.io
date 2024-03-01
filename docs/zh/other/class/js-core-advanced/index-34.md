# 34-jQuery 封装思想

早几年学习前端，大家都非常热衷于研究 jQuery 源码。我还记得当初从 jQuery 源码中学到一星半点应用技巧的时候常会有一种发自内心的惊叹，“原来 JavaScript 居然可以这样用！”

虽然随着前端的发展，另外几种前端框架的崛起，jQuery 慢慢变得不再是必须，因此大家对于 jQuery 的热情低了很多。但是许多从 jQuery 中学到的技巧用在实践中仍然非常好用。了解它有助于我们更加深入的理解 JavaScript。

这里我们把 jQuery 的实现作为一个学习案例，帮助我们进一步掌握面向对象的使用。也为有兴趣的朋友，进一步学习 jQuery源码一个铺垫，算是一个简单的抛砖引玉。

## *1*

**基本实现**

使用 jQuery 时，我们通常会这样写：

```
// 声明一个 jquery 实例
$('.target')

// 获取元素的css属性
$('.target').css('width')

// 获取元素的微信信息
$('target').offset()
```

咦？很奇怪，和普通的对象实例不太一样，**new** 关键字哪里去了？`$` 符号又是什么？

带着这些疑问，我们来实现一个简化版的 jQuery 库。

首先，一个库就是一个单独的模块，使用自执行函数的方式模拟一个模块。

```
(function() {
  // do something
});
```

第二步，我们能够在全局直接调用 jQuery，说明 jQuery 被挂载在了全局对象上。因此当我们在模块中对外提供接口时，可以采取 `window.jQuery` 的方式。

```
// 先声明一个构造函数
var jQuery = function() {}

// ...

window.jQuery = jQuery
```

在使用时，并没有用 jQuery，而是使用了 $, 其实是多加了一个赋值操作。

```
window.$ = window.jQuery = jQuery
```

我们在使用时，直接使用 `$`，也就是说直接调用了构造函数 jQuery 来创建了一个实例，而没有使用 new。但是我们知道，创建一个实例 new 关键字肯定是必不可少的。因此说明 new 的操作被放在了 jQuery 方法中来实现。而 jQuery 也并不是真正的构造函数。

前面一节的学习我们知道，每一个函数都可能是任何角色，因此 jQuery 内部的实现正是利用了这一点，在具体实现时，改变了内部某些函数的 prototype 指向。先看实现代码，再来一步步分析。

```
;(function (ROOT) {
  // 构造函数
  var jQuery = function (selector) {
    // 在该方法中直接返回new过的实例，因此这里的init才是真正的构造函数
    return new jQuery.fn.init(selector);
  }

  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    version: '1.0.0',
    init: function (selector) {
      var elem, selector;
      elem = document.querySelector(selector);
      this[0] = elem;

      // 在jquery中返回的是一个由所有原型属性方法组成的数组，我们这里做了简化，直接返回this即可
      return this;
    },

    // 在原型上添加一堆方法
    toArray: function () { },
    get: function () { },
    each: function () { },
    ready: function () { },
    first: function () { },
    slice: function () { }
    // ... more
  }

  // 让init方法的原型，指向jQuery的原型
  jQuery.fn.init.prototype = jQuery.fn;

  ROOT.jQuery = ROOT.$ = jQuery;
})(window);
```

首先在 jQuery 构造函数中声明了一个 fn 属性，并将其指向了原型 `jQuery.prototype`。随后在原型对象中添加了init方法。

```
jQuery.fn = jQuery.prototype = {
  init: function() {}
}
```

之后又将 init 的原型，指向了 jQuery.prototype.

```
jQuery.fn.init.prototype = jQuery.fn;
```

而在构造函数jQuery中，则返回了init的实例对象。

```
var jQuery = function(selector) {
  return new jQuery.fn.init(selector);
}
```

最后对外暴露接口时，将字符 $ 与方法 jQuery 对等起来。

```
ROOT.jQuery = ROOT.$ = jQuery;
```

因此当我们使用 `$('#test')` 创建一个 jQuery 实例时，实际上是调用的 `jQuery('#test')` 创建的一个 init 实例。这里真正的构造函数是原型中的 init 方法。

下面用图例展示下这中间的逻辑变化。

## *2*

**扩展方法**

我们在使用 jQuery 时还知道，jQuery 提供了两个扩展接口来帮助我们自定义 jQuery 的方法。通常称自定义的 jQuery 方法为 jQuery 插件。那么这两个扩展方法是如何实现的呢？在上面的实现基础上我们继续添加代码，如下。

```
;
(function (ROOT) {

  // 构造函数
  var jQuery = function (selector) {
    // 在该方法中直接返回new过的实例，因此这里的init才是真正的构造函数
    return new jQuery.fn.init(selector);
  }

  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    version: '1.0.0',
    init: function (selector) {
      var elem, selector;
      elem = document.querySelector(selector);
      this[0] = elem;

      // 在jquery中返回的是一个由所有原型属性方法组成的数组，我们这里做了简化，直接返回this即可
      return this;
    },

    // 在原型上添加一堆方法
    toArray: function () { },
    get: function () { },
    each: function () { },
    ready: function () { },
    first: function () { },
    slice: function () { }
    // ... more
  }

  // 让init方法的原型，指向jQuery的原型
  jQuery.fn.init.prototype = jQuery.fn;

  // 实现jQuery的两种扩展方法
  jQuery.extend = jQuery.fn.extend = function (options) {
    // 在jquery源码中会根据参数不同进行不同的判断，我们这里假设只有一种方式
    var target = this;
    var copy;

    for (name in options) {
      copy = options[name];
      target[name] = copy;
    }
    return target;
  }

  // jQuery中利用上面实现的扩展机制，添加了许多方法，其中

  // 添加静态扩展方法，即工具方法
  jQuery.extend({
    isFunction: function () { },
    type: function () { },
    parseHTML: function () { },
    parseJSON: function () { },
    ajax: function () { }
    // ...
  })

  // 添加原型方法
  jQuery.fn.extend({
    queue: function () { },
    promise: function () { },
    attr: function () { },
    prop: function () { },
    addClass: function () { },
    removeClass: function () { },
    val: function () { },
    css: function () { }
    // ...
  })

  ROOT.jQuery = ROOT.$ = jQuery;
})(window);
```

在上面的代码中，我们通过下面的方式简单的实现了两个扩展方法。

```
jQuery.extend = jQuery.fn.extend = function (options) {

  // 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了
  var target = this;
  var copy;

  for (name in options) {
    copy = options[name];
    target[name] = copy;
  }
  return target;
}
```

要理解它的实现，首先要明确的知道内部 this 的指向。相信学习过前面的章节对于 this 的掌握已经不是问题了。传入的参数 options 对象是一个 key-value 模式的对象。我们通过 for in 遍历 options，将 key 作为新的属性，value 作为该属性对应的新方法，分别添加到 jQuery 与 jQuery.fn 中。

也就是说，当我们通过 `$.extend` 扩展 jQuery 时，方法被添加到了静态方法中，而当我们通过 `$.fn.extend` 扩展 jQuery 时，方法被添加到了原型对象中。

静态方法可以直接调用，因此常常也被称为工具方法。例如：

```
$.ajax()
$.isFunction()
$.each()
//...
```

原型方法则必须通过声明的实例才能调用。

```
$('#test').css();
$('#test').attr();

// ...
```