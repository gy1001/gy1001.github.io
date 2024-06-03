# 26-如何构建响应式 UI？

说到响应式 UI，大家可能首先想到的是响应式 Web 布局，也就是基于 CSS 媒体查询或容器查询，在不同的断点上来调整 UI。换句话说，让 Web UI 能根据断点（视窗宽度断点或容器宽度断点）做出响应。但在移动端布局中还有一种适配方式，这种适配方式更像是让 UI 根据屏幕大小进行缩放，从而让 Web UI 也具备响应式的效果。

那么，今天我们主要聊的就是移动端上适配布局的方案。我将从移动端适配的过往开始，逐步介绍未来一种更具精确性、完美性的适配，我把这种方案称之为 **响应式 UI** 。因为我们所用到的 CSS 技术不仅仅可以用于布局，还可以用于 Web UI 上的其他响应。

## 移动端的主流布局技术

在国内用于移动端的适配布局主要有 **REM** 和 **VW** 两种，或者在该基础上衍生出来的其他类似布局方案，比如 **VW + REM** 布局。即使到现在，REM 适配方案还是很受业内欢迎，但我想很多 Web 开发者并不知道这些布局是如何来的，它的设计原理和初衷是什么。

也正因此，很多移动开发者都误以为 CSS 中的 `rem` 和 `vw` 两种单位就是移动端的适配。但事实并非如此，它们只是 CSS 的两种单位，而所说的移动端适配方案 REM 和 VW 是一种设计思想，而且它们是出于同一设计思路，只是发生的时间先后不同。

你可能对其中的设计思想感到好奇吧！如果是，请继续！

### 移动端开发的痛点

就 Web 开发而言，移动端的 Web 页面（大家常说的 H5 页面）其实要比 PC 端或平板端的页面简单得多，就 UI 组件的还原、页面的布局而言，也要容易得多。但对于移动端的 Web 开发者而言，他们更为痛苦的不是 UI 的还原，页面的布局，而是要面对众多不同的移动端设备：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6506afa00fb24ea4962a8a405d9214ae~tplv-k3u1fbpfcp-zoom-1.image)

在这种环境之下，CSS 的媒体查询已经无法满足我们的需求了。

另外，早期移动端开发，只有 Android 系列存在终端适配问题，因为当时安卓品牌琳琅满目，而且很多设计师常常忽略 Android 适配问题，只出一套 iOS 设计稿。但随着 iPhone6，iPhone6+ 的出现，不仅 Android 系列有终端适配问题了，iOS系列也进入到多分辨率的时代，也从这个时候起，移动端适配全面进入到“杂屏”时代。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5051c38527134bf1ac80db92bce29dc4~tplv-k3u1fbpfcp-zoom-1.image)

> 上图来自于[paintcodeapp.com](http://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)

### 设计师和 Web 开发者的协作模式

为了应对这多么的终端设备，设计师和 Web 开发者之间开始在思考应该采用什么协作模式。比如，手淘设计师和 Web 开发者的适配协作的基本思路是：

- 选择一种尺寸作为设计和开发基准；
- 定义一套适配规则，自动适配剩下的两种尺寸(其实不仅这两种，你懂的)；
- 特殊要求之下，设计师会额外提供新的设计效果。

还是上一张图吧，一图胜过千言万语：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ae9d9096d2452c967c0d3695aa2aab~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，**手淘设计师常选择 iPhone6 作为基准设计尺寸，交付给 Web 开发者的设计尺寸是按** **`750px x 1334px`** **为准(高度会随着内容多少而改变)。 Web 开发者通过一套适配规则自动适配到其他的尺寸** 。

根据上面所说的，设计师给我们的设计图是一个 `750px x 1600px` 的页面：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29de11280da544deb136b24931bfc988~tplv-k3u1fbpfcp-zoom-1.image)

### 移动端适配设计思想

设计师将设计稿交到 Web 开发者手中之后，剩下就是 Web 开发者的事情了。我们就需有一套适配方案，让开发出来的 Web 页面能适配不同的移动终端。但在那个时候（大约是 2013 年和 2015 年之间），CSS 的技术还没达到现在这么先进，比如 CSS 的视窗单位 `vw` 、`vh` 之类就还没有得到支持。

除此之外，Web 开发者要设计一套适配不同的移动终端，所涉及到的知识点也非常地多，比如**视窗 （viewport）** 、**物理像素（Physical Pixel）** 、**设备独立像素（Density-Independent Pixel）** 、**CSS 像素** 、**屏幕密度** 、**设备像素比（Device Pixel Ratio）** 、**`meta`** **标签** 和 **CSS单位**（比如，`rem` 、`vw` 和 `vh` 等）。

就拿视窗为例吧，它又分为： **布局视窗** 、**视觉视窗**和**理想视窗** ，它们在屏幕适配中起着非常重要的作用。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62f1715ef32a48f7b8fa6af7683fbd52~tplv-k3u1fbpfcp-zoom-1.image)

上图展示的是**布局视窗（Layout Viewport）** 的示意图。是我们可以进行网页布局区域的大小，以 CSS 像素做计量单位。移动设备默认会设置一个较大的视窗尺寸（比如，iOS 一般默认是 `980px`），布局视窗的宽度是大于浏览器可视区域的宽度的。布局视窗的尺寸可以通过下面 API 来获取：

```
布局视窗宽度 = document.documentElement.clientWidth 
布局视窗高度 = document.documentElement.clientHeight
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9721b060a92e4a889f7298201895941a~tplv-k3u1fbpfcp-zoom-1.image)

上图是**视觉视窗（Visual Viewport）** 的示意图。它就是设备的像素分辨率。视觉视窗的尺寸可以通过下面 API 来获取：

```
 视觉视窗宽度 = window.innerWidth 
 视觉视窗高度 = window.innerHeight 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f1660363d6d479ab34a653ff28d7827~tplv-k3u1fbpfcp-zoom-1.image)

上图所示的就是**理想视窗（Ideal Viewport）** 了，它是一个能完美适配移动设备的视窗（Viewport）。无论是在何种密度屏幕，何种分辨率下，显示出来的大小都差不多。

理想视窗并没有一个固定的尺寸，不同的设备有不同的理想视窗。理想视窗与设备的宽度一致，例如 iPhone8 的理想视口是 `375px`。 理想视窗的意义在于，无论在何种分辨率的屏幕下，针对理想视窗而设计的网站，不需要缩放和横向滚动条都可以完美地呈现给用户。理想视窗的尺寸通过下面 API 可获取：

```
理想视窗宽度 = window.screen.width 
理想视窗高度 = window.screen.Height
```

我们除了要面对不同视窗之外，移动设备还可以被用户随时旋转。当设备旋转之后，屏幕方向也会有变化，所以才会有**横屏**和**竖屏**之分：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fae8209441a349d19a6b349599030744~tplv-k3u1fbpfcp-zoom-1.image)

可以使用 `window.orientation` 来判断设备是横屏还是竖屏：

```
window.addEventListener("resize", ()=>{ 
    if (window.orientation === 180 || window.orientation === 0) { 
        // 正常方向或屏幕旋转180度 console.log('竖屏'); 
    }; 
    
    if (window.orientation === 90 || window.orientation === -90) { 
        // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度 console.log('横屏'); 
    } 
}); 
```

也可以使用 CSS 的媒体查询来区分屏幕的方向：

```
@media screen and (orientation: portrait) { 
    /*竖屏...*/ 
} 
​
@media screen and (orientation: landscape) { 
    /*横屏...*/ 
}
```

> 其他的相关概念和理论就不在这里阐述，我们将会在响应设计的课程中有相关的介绍。

这里特意拿视窗出来介绍是有原因的。对于 Web 开发者而言，拿到设计师提供的设计稿之后，他们要做的是让设计稿能在移动终端的“**视觉视窗** ”中完美呈现，即百分百填充在视觉视窗中，也就是移动终端的屏幕可视区。

既然是**百分百**，那么 CSS 的百分比单位就比较贴切，我们可以使用百分比来计算，但问题来了。使用百分计算，它需要一个参考物，那我们应该是相对于设备视觉视窗宽度来计算呢，还是相对于设计稿的宽度来计算呢？它们又如何和设计稿上的元素尺寸协作呢？这一系列的问题都将会让开发者感到头痛。

更为麻烦的是，CSS 中的属性值取百分比，它的计算更为复杂，不同属性相对的参考对象将不同，比如 `with` 、`padding` 、`margin` 和 `font-size` 等参考物都不一样。基于这些原因，CSS 的百分比单位是不利于 Web 开发者的，也就很少被考虑用来做移动端的适配处理。

庆幸的是，CSS 中有一种单位，叫**视窗单位** ，它能自动根据设备的“视觉视窗”的尺寸来计算：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdac1316f6684703a12154ecbeaf5de9~tplv-k3u1fbpfcp-zoom-1.image)

例如，如果浏览器的高是 `900px` ，`1vh` 的值就是 `9px`。同理，如果浏览器视窗宽度为 `750px` ，`1vw` 的值就是 `7.5px`。

`vh` 和 `vw` 总是与视窗的高度和宽度有关，与之不同的，`vmin` 和 `vmax` 是与视窗宽度和高度的最大值或最小值有关，取决于哪个更大和更小。例如，如果浏览器设置为 `1100px` 宽、`700px` 高，`1vmin` 会是`7px` ，`1vmax` 为 `11px`。然而，如果宽度设置为 `800px`，高度设置为`1080px`，`1vmin` 将会等于 `8px`，而`1vmax` 将会是 `10.8px`。

按理来说，视窗单位应该是一个较佳的选择，尤其是用于不同移动终端设备的适配上。但在当时，大约也就是 2013 年至 2015 年左右，CSS 的视窗单位 `vw` 、`vh` 、`vmin` 和 `vmax` 等还未得到主流浏览器的支持。所以，也不得不暂时放弃使用视窗单位来做移动端的适配。

也就是这个时候，手淘的开发者选择了 CSS 的 `rem` 单位来为移动端适配做方案设计。也就有了流行的 REM 适配方案（它专业名称是“**Flexible** ”）。

选择 CSS `rem` 单位来做适配方案设计主要原因是，**任何元素的属性值取** **`rem`** **作为单位的值，它始终都是相对于 HTML 的根元素** **`<html>`** **的** **`font-size`** **来计算** 。即，任何值为 `1rem` 的元素都等于 `16px`，当然，其前提是浏览器默认的 `font-size` 没有被用户重置，或者未显式地给 `html` 元素设置`font-size` 值；另外，`rem` 可以不管它的父元素的 `font-size` 如何！

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb51162ad5794dfa9f47c9cd2eb32ecf~tplv-k3u1fbpfcp-zoom-1.image)

从上图可以看出，就算在 `body` 中显式设置了 `font-size` 的值，也不会影响其子元素 `h3` 的 `font-size`，`h3` 的 `font-size` 始终都是相对于根元素 `<html>` 的 `font-size` 来计算的。

另外，`rem` 和 `em` 有点类似，能接受 `<length>` 为值的属性都可以以 `rem` 为单位，而且都是相对于根元素 `html` 的 `font-size` 进行计算，并且跟 DOM 的层级没有任何的关系。

换句话说，我们只需要在不同的终端设备中调整根元素 `html` 的 `font-size` 的值，元素的属性值设置 `rem` 单位值就可以轻易地实现不同终端设备的适配。而且它的兼容性又比 `vw` 等视窗单位好，计算又比百分比简单。

另外一个问题是，Web 开发者拿到的设计稿都是以 `px` 为单位，如何将 `px` 转为 `rem` 单位呢？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bfad31c916a47ab9f5d36850434d955~tplv-k3u1fbpfcp-zoom-1.image)

REM 的适配方案会将基于 `750px` 的设计稿分成 `100` 个等份（这样设计的初衷是为了能更好地从 `rem` 过渡到 `vw` ），而每一等份被定义成一个单位 `a`。同时 `1rem` 单位被认定为 `10a`。针对我们这份视觉稿（基于 `750px` 的设计稿）可以计算出：

```
 1a   = 7.5px 
 1rem = 75px
```

那么我们这个示例的稿子就分成了 `10a`，也就是整个宽度为 `10rem` ，即 `750px` ；`<html>` 对应的 `font-size` 为 `75px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6672195f9f70492ab9e73dd3cbe51628~tplv-k3u1fbpfcp-zoom-1.image)

这样一来，对于视觉稿上的元素尺寸换算，只需要原始的 `px` 值除以 `rem` 基准值即可。例如此例视觉稿中的图片，其尺寸是 `176px x 176px`，转换成为 `2.346667rem x 2.346667rem`。

前面也说过了，不同移动终端设备的视觉视窗宽度是不一样的，它可能刚好是 `750px` （和设计稿匹配），但也可能小于或大于 `750px` 。对于刚好与设计稿匹配的设备，`html` 的 `font-size` 值为 `75px` 是刚好的，但其他情况之下，`html` 的 `font-size` 就需要进行调整。所以，我们需要动根据不同设备的视觉视窗的宽度来调整根元素 `html` 的 `font-size` 。

虽然 CSS 媒体查询可以调整 `html` 的 `font-size` 值，但我们需要一个更动态的方案，所以最终选择 JavaScript 脚本来动态计算 `html` 的 `font-size` 值：

```
(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1
​
  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();
​
  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }
​
  setRemUnit()
​
  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
​
  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
```

> 注意，上面代码来自于 lib-flexible 库： <https://github.com/amfe/lib-flexible/blob/2.0/index.js> ！所以称为 Flexible 适配，社区称为 REM 适配！

这也是，为什么使用 REM 为移动端做适配处理，需要一个 `lib-flexible` 的脚本库！

有了这个基础之后，Web 开发者不再需要花时间去考虑适配的处理，开发的时候只需要按照设计的像素值设置即可。比如：

```
.box {
    width: 176px;
    height: 176px;
}
```

因为单位的自动转换（`px` 转 `rem`）会交给工程去完成，适配会交给 lib-flexible 完成。

> 注意，现在 `px` 转 `rem` 一般使用 PostCSS 插件：<https://github.com/songsiqi/px2rem-postcss>

直到 2018 年，CSS 的视窗单位得到主流浏览器的支持，手淘前端团队将 REM 的适配方案开始切换到 VW 的适配方案。其整个设计思路不变，所做的变化就是：

- 把 `px` 转 `rem` 单位换成 `px` 转 `vw` 单位；
- 从工程中干掉 `lib-flexible` 脚本库；
- 工程体系中将 `px2rem` 替换成 `px2vw` （<https://www.npmjs.com/package/@moohng/postcss-px2vw>）。

对于开发者而言是无感的，因为将 `px` 转换为 `vw`，并不会改变开发者的开发习惯。

直到目前为止，设计师提供的设计稿，依旧是使用 `750px` 宽度的（至少我了解的都是这样），那么 `100vw = 750px`，即 `1vw = 7.5px`。如此一来，我们可以根据设计图上的 `px` 值直接转换成对应的 `vw` 值。Web 开发者和使用 REM 适配方案一样，Web 开发者在实际撸码过程，不需要进行任何的计算，直接在代码中写 `px`，比如：

```
.test {
    border: .5px solid black;
    border-bottom-width: 4px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
}
```

编译出来的 CSS：

```
.test { 
    border: .5px solid #000; 
    border-bottom-width: .533vw; 
    font-size: 1.867vw; 
    line-height: 2.667vw; 
    position: relative; 
}
```

这就是 REM 和 VW 布局的由来。

### REM 和 VW 布局的缺陷

虽然说 REM 和 VW 布局是主流的移动端布局技术，但它们始终都是以缩放为基准的。除此之外，它们也相应有着自己的缺陷。比如 REM 适配，早期的时候会在大于一定屏幕的基础上左右留白：

```
.wrapper {
    max-width: 10rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b17c3fbd8f7c44fd801a41c73dfbec29~tplv-k3u1fbpfcp-zoom-1.image)

但现在的 m.taobao.com 已经取消了最大宽度的限制：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51726fdaa0d048a898ecc301a88d67cd~tplv-k3u1fbpfcp-zoom-1.image)

另外在一些大屏幕下（比如，京东），页面的呈现是有一定缺陷的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdc75130a604424383f70a8f01f25de8~tplv-k3u1fbpfcp-zoom-1.image)

这就是 REM 适配布局带来的一定缺陷。

相对而言，VW 比 REM 更易于适配百分百的屏幕，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4dbc8ea50f9c4b0591c4485ccc4f7799~tplv-k3u1fbpfcp-zoom-1.image)

> 上图录制于手淘的金币庄园：<https://pages.tmall.com/wow/z/tmtjb/town/home-wx?spm=a215s.7406091.icons.6>

但 VW 也有很大的缺陷，比如给页面设置一个最大宽度，让页面水平居中，VW 是无法做到的，因为整个页面的元素尺寸大小都是以 `vw` 单位来计算的。如果你在容器上显式设置一个最大值，就会造成页面布局的混乱：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9766cadf8cc462f869caf94e474e597~tplv-k3u1fbpfcp-zoom-1.image)

即使没有最大宽度的要求，在宽屏的时候，页面上一些组件 UI 也会有一定的缺陷，比如弹框：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7c7e435af3a4b6b98f1a35b8cb488ac~tplv-k3u1fbpfcp-zoom-1.image)

正因为它们有一定的缺陷，我们应该有新的布局适配方案，来满足更多的终端设备，甚至是未来不知的设备。正基于此原因，我们需要一个更灵活，更稳定的响应式 UI 布局。

## 构建响应式 UI

随着 CSS 更多优秀的特性越来越多，让我们构建响应式的 UI 越来越容易，而且并不像使用 `rem` 和 `vw` 那样对 UI 直接做缩放处理。换句话说，即使要构建一个缩放 UI 体系，这些新特性也会让 Web 开发者变得更容易，更完善！

接下来，我们一起来探讨如何构建一个响应式 UI，让整个 UI 或 Web 页面能更好地适配不同的终端设备。构建一个响应式 UI 需要具备一定的基础知识：

- CSS 的数学计算：`calc()` 、`min()` 、`max()` 和 `clamp()`；
- CSS 的自定义属性。

对一个响应式 UI 或者布局而言，需要响应的大部分是：

- 响应元素的大小；
- 响应元素的位置；
- 响应元素的排版。

我们就先从基础知识开始吧。

### CSS 的数学计算

到目前为止，在 CSS 中，可以直接用于数学计算的函数，除了 `calc()` 之外，还有 CSS 的比较函数 `min()` 、`max()` 和 `clamp()`。

相对而言，Web 开发者对 `calc()` 函数更为熟悉，都知道 `calc()` 允许你进行基本的数学运算，比如给 `width` 的值做 加（`+`） 、 减（`-`） 、 乘（`×`） 和 除（`÷`） 四则运算。并且可以在单位之间做插值计算，比如不同单位之间的混合计算，如 `calc(100% - 20px)`，运算式中的 `%` 和 `px` 单位，客户端会自己进行插件计算。

`calc()` 还有一个最大的好处是，允许在 CSS 中进行基本的数学四则运算，从而避免使用 JavaScript 来做相应的数学计算。特别是在 CSS 自定义属性的使用中，`calc()` 的身影随处可见。比如下面这个示例，使用 `calc()` 将一个数值变成带有 `%` 的值：

```
:root { 
    --h: 180; 
    --s: 50; 
    --l: 50; 
} 

.icon__container { 
    color: hsl(var(--h) calc(var(--s) * 1%) calc(var(--l) * 1%)); 
} 

.icon__container--like { 
    --h: 32; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f103c7fc5b0401d98217d5aa1c6cd83~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/VwBLZVG>

而比较函数 `min()`、`max()` 、 `clamp()` 和 `calc()` 类似，除了可以接受 加（`+`）、减（`-`）、乘（`×`） 和 除（`÷`） 四则运算之外，还可以接受一个值列表参数，浏览器则会从这个值列表中确定使用哪个值。

- **`min(<value-list>)`** ：从逗号分隔的表达式列表中选择最小值（最小负数），**相当于使用** **`min()`** **设置最大值；**
- **`max(<value-list>)`** ：从逗号分隔的表达式列表中选择最大值（最大正数），与 `min()` 刚好相反，**相当于 使用`max()`** **设置最小值；**
- **`clamp(<min>, <ideal>, <max>)`** ：根据设定的理想值(`<ideal>`），将值限定在上限（`<max>`）与下限（`<min>`）之间，**相当于使用了** **`min()`** **和** **`max()`** **函数， 即** **`clamp(<min>, <ideal>, <max>)`** **等于** **`max(<min>, min(<ideal>, <max>))`。**

我们可以从下面的录屏中窥探出 `min()` 、`max()` 和 `clamp()` 函数带来的作用。先来看 `min()` 函数：

```
.element {
    width: min(50vw, 500px);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/426730e281d54b008da35063492ead24~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/zYLGYxp>

我们可以**使用`min()`函数给元素设置最大值**。比如：

```
.element {
    width: min(50vw, 500px);
    
    /* 等同于 */
    width: 50px;
    max-width: 500px;
}
```

`max()` 函数的使用和 `min()` 函数类似：

```
.element {
    width: max(50vw, 500px);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b067e7b1a64c41a8bf08a08d7a65c8a0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWBbWNK>

同样的，我们可以**使用** **`max()`** **函数给元素设置最小值**：

```
.element {
    width: max(50vw, 500px);
    
    /* 等同于 */
    width: 50vw;
    min-width: 500px;
}
```

`clamp()` 函数要比 `min()` 和 `max()` 函数要复杂一点，它返回的是一个区间值。`clamp()` 函数接受三个参数，即 `clamp(MIN, VAL, MAX)`，其中：

- **`MIN`** 表示最小值；
- **`VAL`** 表示首选值；
- **`MAX`** 表示最大值。

它们之间：

- 如果 `VAL` 在 `MIN` 和 `MAX` 之间，则使用 `VAL` 作为函数的返回值；
- 如果 `VAL` 大于 `MAX` ，则使用 `MAX` 作为函数的返回值；
- 如果 `VAL` 小于 `MIN` ，则使用 `MIN` 作为函数的返回值。

```
.element {
    width: clamp(100px, 50vw, 500px);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8105685c5d674d8b9e9cccd9f0dda275~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZEjGEKa>

就该示例而言，`clamp(100px, 50vw, 500px)` 可以这样来理解：

- 元素 `.element` 的宽度不会小于 `100px`（有点类似于元素设置了 `min-width: 100px`）；
- 元素 `.element` 的宽度不会大于 `500px`（有点类似于元素设置了 `max-width: 500px`）；
- 首选值 `VAL` 为 `50vw` ，只有当浏览器视窗的宽度大于 `200px` 且小于 `1000px` 时才会有效，即元素 `.element` 的宽度为 `50vw`（有点类似于元素设置了 `width:50vw`）。

如果使用了 `clamp()` 函数的话，相当于使用了 `min()` 和 `max()` 函数，具体地说：

```
clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))
```

就上面示例而言：

```
.element { 
    width: clamp(100px, 50vw, 500px);
    
    /* 等同于 */
    width: max(100px, max(50vw, 500px));
 } 
```

正如前面所述，`clamp()` 的计算会经历以下几个步骤：

```
.element { 
    width: clamp(100px, 50vw, 500px); 
    
    /* 50vw 相当于视窗宽度的一半，如果视窗宽度是 760px 的话，那么 50vw 相当等于 380px */ 
    width: clamp(100px, 380px, 500px); 
    
    /* 用 min() 和 max() 描述*/ 
    width: max(100px, min(380px, 500px));
    
    /* min(380px, 500px) 返回的值是 380px */ 
    width: max(100px, 380px);
    
    /* max(100px, 380px) 返回的值是 380px */ 
    width: 380px; 
} 
```

这和前面介绍 `clamp(MIN,VAL,MAX)` 时计算出来结果一致（`VAL` 大于 `MIN` 且小于 `MAX` 会取首选值 `VAL`）。

你有没有发现，在前面的示例中，我们在 `min()`、`max()` 和 `clamp()` 函数参数使用 `vw` 时，最终的计算值是依据视窗的宽度来计算的。换句话说，我们在使用这些函数时，参数中运用的不同值单位对最终值是有一定影响的，也就是说： **`min()`** **、`max()`和`clamp()`函数中的参数，计算的值取决于上下文** 。

在 CSS 中，很多取值的单位是和上下文有关系的，比如我们熟悉的 `vw`、`vh`、`%`、`rem` 和 `em` 等。就拿 `%`单位来说吧，如果元素是 `<body>` 子元素，那么它的计算方式就是基于浏览器视窗宽度来计算，如果元素是另一个元素的子元素，那这个时候可能会基于它的父元素来计算。

再比如说，`rem` 单位，它始终会基于 `<html>` 元素的 `font-size` 来计算。 可以说，这些相对单位对于 `min()`、`max()`、`clamp()`返回值有着直接的影响。比如下面这个示例：

```
.element { 
    width: min(10vw, 10rem, 100px);
} 
```

其中 `10vw` 和浏览器视窗宽度有关，`rem` 和 `html` 的 `font-size` 有关（默认为 `16px`）。在 `10vw` ， `10rem` ，`100px` 三个值中，前两个是相对长度值，最后一个是固定长度值。因此，就该示例来说，`width` 计算值最大就是 `100px` 。

而 `width` 真实的值和视窗宽度以及 `html` 元素的 `font-size` 有关，假设浏览器视窗宽度处在 `1200px` 位置处，那么 `10vw` 对应的就是 `120px` ，假设 `html` 的 `font-size` 采用的是默认值（`16px`），那么 `10rem` 对应的值是 `160px` 。在这样的上下文信息中 `min(10vw, 10rem, 100px)` 对应的就是 `min(120px, 160px, 100px)`，即，最后 `width` 的值为 `100px`。

同样这个示例，如果视窗宽度处在 `760px` 位置，那么 `10vw` 对应的值就是 `76px`，同时假设 `html` 的 `font-size` 显式修改为 `12px`，那么 `10rem` 对应的就是 `120px` ，这个时候 `min(10vw, 10rem, 100px)` 对应的值就是 `min(76px, 120px, 100px)`，即 `min()` 函数最终返回的值就是 `10vw`（即浏览器视窗宽度处在`760px` 位置处时，`76px`）。

对于 `vw`、`vh`、`vmin`、`vmax` 和 `rem` 等相对单位计算起来还是很简单的，它们的依赖关系很明确。但对于像 `%` 和 `em` 相对单位，那和环境之间的关系就很紧密了。

前面也提到过了，`min()`、`max()` 和 `clamp()` 函数可以像 `calc()` 函数一样，使用数学表达式。但有一个细节需要注意，如果表达式中用到加法（`+`）和减法（`-`）时，其前后必须要有空格；对于乘法（`*`）和除法（`/`）前面可以没有空格。但为了避免这样书写方式引起的错误，个人建议平时在写代码的时候，在运算符前后都留一定的空格。

除了可以在函数中使用数学表达式之外，还可以嵌套使用，比如：

```
.element { 
    width: max(100px, min(50vw, 500px)); 
    border: min(10px, calc(2px * 1vw)) solid #f36; 
    box-shaodw: max(2vh, var(--x)) min(2vh, var(--y)) 0 rgba(0,0,0,.25);
} 
```

嵌套层级越深越易造成错误，因此在没有特性情况（非必要）之下，不建议在函数中嵌套函数。如果要用到多个参数时，建议使用 `clamp()`：

```
.clamp-type {
    /* font-size 保持在 12px ~ 100px 之间 */
    font-size: clamp(12px, 10 * (1vw + 1vh) / 2, 100px);
}
```

我们使用 `min()`、`max()` 和 `clamp()` 函数，主要是用来确保值不超过“**安全**”限制。例如，`font-size` 使用了视窗单位（比如 `vw`），但为了可访问性，会设置一个最小的值，确保文本可阅读。这个时候，我们可以像下面这样使用：

```
body { 
    font-size: max(10 * (1vw + 1vh) / 2, 12px);
} 
```

我们在使用 `min()` 和 `max()` 函数时，偶尔也会造成一定的混淆，比如在 `max()` 函数中对某个值设置了最小值（即，`min-width` 有效地使用 `max()`）；同样的在 `min()` 函数中设置了最大值（即，`max-width` 有效地使用了 `min()`）。为了便于理解和可读，使用 `clamp()` 函数会更自然些，因为数值介于最小值和最大值之间：

```
body { 
    font-size: clamp(12px, 10 * (1vw + 1vh) / 2, 100px); 
}
```

但要注意，比如 `clamp()` 函数中值有“**顺序错误** ”，即**它的最小值（`MIN`）超过了最大值（`MAX`）** 。即 `clamp(100px, 50vw, 50px)`，它会被解析为 `100px`。针对这个示例，我们来看看它的计算过程。 当浏览器视窗宽度处在 `170px` 位置时:

```
clamp(100px, 50vw, 50px) ➜ clamp(100px, 85px, 50px) 
```

这个时候 `VAL` 大于 `MAX` ，但同时也小于 `MIN` 。前面的内容告诉我们，当 `VAL` 大于 `MAX` 时，`clamp()` 函数返回的是 `MAX`，但在这个示例中，`VAL` 同时也小于 `MIN`，按照前面所说的，`VAL` 小于 `MIN` 时，`clamp()` 函数会返回 `MIN`。看上去没矛盾，但看上去又有矛盾。而事实上呢，这个场景之下，`clamp()` 函数返回的值的的确确是 `MIN` 的值，即 `100px`。

针对这种场景，规范也有过相应的描述：

- **`MAX`** **大于** **`MIN`** ：`clamp(min(MIN, MAX), VAL, MAX)`，如果希望避免重复计算，可以将嵌套在 `clamp()` 中函数的参数反转过来，即 `clamp(min(MAX, max(MIN, VAL)))`；
- **`MAX`** **和** **`MIN`** **顺序交换** ：`clamp(min(MIN, MAX), VAL, max(MIN, MAX))`。不幸的是，没有一种简单的方法可以做到不重复 `MIN` 和 `MAX`。

这里有一点特别提出，在使用 `min()`、`max()` 和 `clamp()` 函数时，里面的值都应该显式指定值单位，即使是值为 `0` 也应该带上相应单位，比如：

```
.element { 
    padding: clamp(0, 2vw, 10px); 
    margin: min(0, 10px);
    width: max(0, 10px);
} 
```

上面的样式规则将是无效的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e60c9e541a74c4a89b49962e6f86db8~tplv-k3u1fbpfcp-zoom-1.image)

### CSS 比较函数给设计带来的变化

随着 CSS 新特性的出现，不管是对于 Web 设计师还是 Web 开发者都不是件易事，因为要考虑的场景会越来越复杂。CSS 比较函数的到来，Web 设计师估计在提供设计稿的时候也要有一些思想上的变化。比如说，在这之前，Web 设计师可能会根据不同的场景为设计元素提供不同的尺寸：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb0efaf264e54349b282902cd947507c~tplv-k3u1fbpfcp-zoom-1.image)

但现在或不久的将来，会像下面这样针对不同的场景来做设计：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff2bb39a71449348a57564c072db825~tplv-k3u1fbpfcp-zoom-1.image)

拿实际案例来说吧，在响应式设计中，希望在不同的终端上，文本的字号有所不同，那么就可以像下面这样使用：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0f17fc9ab074d1580bc8c7829e9739b~tplv-k3u1fbpfcp-zoom-1.image)

这和我们前面介绍的 `clamp()` 函数非常匹配：

```
 body { 
     font-size: clamp(16px, 5vw, 50px);
 } 
```

这样的设计对于一些需要动态改变值的场景非常有用。 尤其是构建响应式 UI 的场景，这些功能显得更为重要和灵活。

### 响应布局

先拿典型的两列布局为例。希望侧边栏在大屏幕下有足够宽的空间，但同时也希望它有一个最小的宽度。在这之前，我们可能会这样来写 CSS：

```
aside { 
    width: 30vw; 
    min-width: 220px; 
} 
```

如果是用 CSS Grid 布局的话，可以使用 `minmax()` 函数：

```
 .container { 
     display: grid; 
     grid-template-column: minmax(220px, 30vw) 1fr;
 } 
```

而现在，我们可以使用 `max()` 函数来处理：

```
aside { 
    flex-basis: max(30vw, 220px);
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b23600910094e1f8f3182624f5c1f00~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/zYLGpjg>

再来看另一个两列布局示例，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30f5567eb681461496b577dc0e3aa68b~tplv-k3u1fbpfcp-zoom-1.image)

就上图这布局，对于 CSS Flexbox 和 CSS Grid 而言，一点难度都没有。

```
body {
     --aside-w: 320px;
     --gap: 20px;
  
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

aside { 
    flex: 1 0 var(--aside-w); 
} 

main { 
    flex: 1 1 calc(100% - var(--aside-w) - var(--gap)); 
}
```

不过，我们可以在这个基础上做得更好，可以给 `main` 设置一个最佳的值，比如：

```
main { 
    flex: 1 1 calc(100% - var(--aside-w) - var(--gap)); 
    min-width: min(100%, 18ch); 
}
```

在 `min-width` 属性上使用 `min()` 函数，给 Flex 项目 `main` 设置一个下限值。根据上下文环境计算，当 `18ch` 长度值小于 `100%`（父容器宽度的 `100%`），`min()` 函数会返回 `18ch`，反之则会返回 `100%`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/239b2d70c7464a28983ac5cd675a8a75~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZEjGvPd>

不知道你有没有发现，让浏览器视窗宽度小于 `320px` 的时候，页面的布局还是不够完美的。即：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccd96a0c4ead441cb5e561d55593e3e6~tplv-k3u1fbpfcp-zoom-1.image)

我们可以在 `aside` 的 `flex-basis` 上使用 `min()` 函数，让它变得更为完善：

```
aside { 
    flex: 1 0 min(100%, var(--aside-w)); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05aedcd95d2149c28c1b177b57bd18f0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/gOjpvpe>

如此一来，构建的布局不会那么容易被打破，具有较强的动态性和响应性，而且还不需要依赖任何的 JavaScript 脚本和 CSS 媒体查询（或其他的条件查询）。

不知道大家是否还有印象，CSS Grid 构建的 Full-Bleed 和 RAM 布局中都有 CSS 比较函数的身影：

```
/* CSS Grid Layout: Full-Bleed Layout */
.full-bleed {
    --limit-max-container-width: 1024px;
    --limit-min-container-width: 320px;
    --gutter: 1rem;
    
    display: grid;
    grid-template-columns:
        minmax(var(--gutter), 1fr)
        minmax(
            min(var(--limit-min-container-width), 100% - var(--gutter) * 2),
            var(--limit-max-container-width)
        )
        minmax(var(--gutter), 1fr);
    row-gap: var(--gutter);
}

/* CSS Grid Layout: RAM Layout */
.ram-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 380px), 1fr));
    gap: 1rem;
}
```

上面示例向大家展示了使用 CSS 比较函数构建的布局，除了具有一定的响应之外，还可以给元素设置一个界限值。其实，使用它们还可以构建一些更有意思的布局，比如 [@Temani Afif](https://twitter.com/ChallengesCss) 的《[Responsive Layouts, Fewer Media Queries](https://css-tricks.com/responsive-layouts-fewer-media-queries/)》文章中所介绍的，使用 `clamp()` 函数来构建理想列。

> **"理想列"这个词是我根据“理想宽度”提出来的**！

简单地说，在一些特殊场景中，可以不依赖任何 CSS 媒体特性就能实现，可以让你的布局离 CSS 容器查询更近一步。比如下面这样的布局：

```
:root { 
    --item-size: 400px; 
    --gap: 1rem; 
} 

/* CSS Flexbox Layout */
.flex { 
    display: flex; 
    flex-wrap: wrap; 
    gap: var(--gap); 
} 

.flex li { 
    flex: 1 1 var(--item-size); 
 } 
 
/* CSS Grid Layout: RAM */
.grid { 
    display: grid; 
    gap: var(--gap); 
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--item-size)), 1fr)); 
}
```

能让卡片随容器尺寸做出响应：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b71d51612a144fc8066dbf5bbaa9cb7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/abjOxBx>

虽然上面的效果已经不错了，但还是没法在指定的视窗断点下显示具体的列数。有意思的是，我们可以使用 `clamp()` 来实现该效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc391ef5063448bca3507a5343b61001~tplv-k3u1fbpfcp-zoom-1.image)

上图的意思是，可以随着浏览器视窗宽度来改变排列的列数：

- 视窗宽度小于或等于 `W3` 断点（比如，`768px`）时，每行保持 `M` 列（比如 `M = 1` ）显示；
- 视窗宽度在 `W3 ~ W2` （比如 `768px ~ 992px`）范围内，每行保持 `N` 列（比如 `N = 2` )显示；
- 视窗宽度在 `W2 ~ W1` （比如 `992px ~ 1200px`） 范围内，每行保持 `O` 列（比如 `O = 3` )列显示；
- 视窗宽度大于或等于 `W1` （比如 `1200px`）时，每行保持 `P` （比如 `P = 4` ）列显示。

接下来通过示例来解释上图。假设我们期望的每行显示 `P` 列，这个 `P = 4` ，并且列与列之间有一个间距 `gap` 。我们就可以通过下面这个公式计算出每列的初始列宽：

```
初始宽度 = 容器宽度的 100% ÷ 列数 - （列数 - 1） × 列间距 = 100% ÷ P - (P - 1) × gap = 100% ÷ 4 - (4 - 1) × gap
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ac525a1011d40cd82aae5d7c49c0316~tplv-k3u1fbpfcp-zoom-1.image)

我们可以使用 CSS 自定义属性来替代上面所描述的参数：

```
:root {
    --P: 4;      /* 期望每行显示的列数 */
    --gap: 1rem; /* 期望的列间距 */
    
    /* 根据公式计算出初始尺寸 100% ÷ P - (P - 1) × gap */
    --initial-size: calc(100% / var(--P) - (var(--P) - 1) * var(--gap));
}
```

将计算出来的 `--initial-size` 值分别用于 Flex 项目和 Grid 项目：

```
/* CSS Flexbox Layout */
.container--flex {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
}

.flex__item {
    flex: 1 1 var(--initial-size);
}

/* CSS Grid Layout */
.container--grid {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(var(--initial-size), 1fr));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10905aaaf3864ec2ba5bb8aa83517c27~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/jOpPRoQ>

你可能发现了，不管是 CSS Flexbox 还是 CSS Grid 构建的布局，每行都能显示四列（它符合我们最初的期望），而且不管浏览器视窗大小，大多数情况都能保持每行四列的呈现。只不过浏览器视窗越小，Flex 项目和 Grid 项目的尺寸也会随之变得越小。另外就是，CSS Flexbox 看上去一切都很正常，但对于 CSS Grid 来说，该示例已失去了 RAM 布局的特性。

不过，我们可以在此基础上，将 CSS 比较函数的 `max()` 运用于 `--initial-size` 中，这样就允许你给 Flex 项目或 Grid 项目设置一个理想宽度值。而整个布局效果要比上一个示例更完善（CSS Grid 中的 RAM 又重新起作用了）：

```
:root {
    --P: 4;               /* 期望每行显示的列数 */
    --gap: 1rem;          /* 期望的列间距 */
    --ideal-size: 400px;  /* 理想宽度 */
    
    /* 根据公式计算出初始尺寸 100% ÷ P - (P - 1) × gap */
    --initial-size: max(var(--ideal-size), 100% / var(--P) - (var(--P) - 1) * var(--gap));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db9a95d633764efaa3d0c93ea4e26a88~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/MWBwMdQ>

上面的示例中，我们都显式设置了列间距 `gap` 。我们也可以把 `gap` 去除，相应的公式就变成：

```
/* 优化前公式 */
width = 100% ÷ P - (P - 1) × gap

/* 优化后公式 */
width = 100% ÷ (P + 1) + 0.1%
```

其逻辑是 “**告诉浏览器，每个 Flex 或Grid 项目的宽度等于** **`100% / (P + 1)`** ”，因此每行都会有 `P + 1` 个项目。每个项目宽度增加 `0.1%` 是 CSS 的一个小魔法，就是让**第** **`P + 1`** **个项目换行** 。所以，最后呈现的是每行 `P` 个项目排列：

```
:root { 
    --ideal-size: 400px; /* 理想宽度*/
    --P: 4;              /* 期望每行显示的列数（理想列数）*/
    --gap: 20px;         /* 列间距 */    
    --responsive-size: max( var(--ideal-size), 100% / (var(--P) + 1) + 0.1% ); /* 具有响应式的列宽 */
} 

/* CSS Flexbox Layout */
.container--flex { 
    display: flex; 
    flex-wrap: wrap; 
    gap: var(--gap); 
} 

.flex__item { 
    flex: var(--responsive-size); 
 } 
 
 /* CSS Grid Layout: RAM */
.grid { 
    display: grid; 
    gap: var(--gap); 
    grid-template-columns: repeat( auto-fit, minmax(var(--responsive-size), 1fr)); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec8e1de69aff4e4f81855bfc32925cfb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/vYaOoGN>

你会发现，每个项目最小宽度会是 `400px`（即 `--ideal-size`）：

- 当容器有足够空间（等于 `4 x 400px + 3 x 20px`）容纳时，每行刚好会呈现四列（`4 x 400px`）加上三个列间距（`--gap`）；
- 当容器有足够空间（大于 `4 x 400px + 3 x 20px`）容纳时，每行也将呈现四列，但每个项目的宽度会扩展，**扩展值是均分容器剩余空间** ；
- 当容器无足够空间（小于 `4 x 400px + 3 x 20px` ）容纳时，每行呈现的列数将会小于 `4`，且每个项目的宽度会扩展，扩展值是均分容器剩余空间。

不过，这个方案运用于 CSS Grid 的轨道尺寸设置时会有一定的缺陷：当网格容器小于 `--ideal-size` 时，网格项目会溢出网格容器：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ab7c6d157bd466eb3ca67df9c082851~tplv-k3u1fbpfcp-zoom-1.image)

我们可以使用 CSS 比较函数中的 `clamp()` 替换示例中的 `max()` ：

```
/* max() 函数计算的 Responsive Size */ 
width = max(var(--ideal-size),100% / (P + 1) + 0.1%) 

/* clamp() 函数计算的 Responsive Size */ 
width = clamp(100% / (P + 1) + 0.1%, var(--ideal-size), 100%)
```

它的作用是：

- 当容器宽度较大时，`100% / (P + 1) + 0.1%` 的值（或可能）会大于 `--ideal-size`，相当于 `clamp(MIN, VAL, MAX)` 函数中的 `MIN` 值大于 `VAL` 值，`clamp()` 函数会返回 `MIN` 值，即 `100% / (P + 1) + 0.1%` 。这样就保证了对每行最大项目数（`P`）的控制；
- 当容器宽度较小时，`100%` 的值（或可能）会小于 `--ideal-size` ，相当于 `clamp(MIN, VAL, MAX)` 函数中的 `MAX` 值小于 `VAL` 值，`clamp()` 函数会返回 `MAX` 值，即 `100%`。这样就保证了项目（主要是网格项目）不会溢出容器；
- 当容器宽度存在一个最理想状态，即 `--ideal-size` 介于 `100 / (P + 1) + 0.1%` 和 `100%` 之间，相当于 `clamp(MIN, VAL, MAX)` 函数中的 `VAL` 在 `MIN` 和 `MAX` 之间，`clamp()` 函返回 `VAL` 值，即 `--ideal-size`。

将上面的示例稍作修改：

```
 :root { 
     --ideal-size: 400px; 
     --P: 4; 
     --gap: 20px; 
     --responsive-size: clamp( 100% / (var(--P) + 1) + 0.1%, var(--ideal-size), 100% ); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48f7c6276b8d4aeea0166f54bb562593~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/WNKvVJz>

现在你可以很好地控制每行显示多少列了，但还没法做到不同断点范围的每行列数设置。其中主要原因是，我们并无法知道断行在什么时候发生，它受制于多个因素，比如理想宽度（`--ideal-size`）、间距（`--gap`）、容器宽度等。为了控制这一点，需要对 `clamp()` 函数中的参数值做进一步改进：

```
/* 改进前 */  
:root { 
    --ideal-size: 400px;
    --P: 4;
    --gap: 1rem;
    
    --responsive-size: clamp( 100% / (var(--P) + 1) + 0.1%, var(--ideal-size), 100% ); 
 } 
 
 /* 改进后 */
 :root { 
     --ideal-size: 400px;
     --P: 400px;
     --gap: 1rem;
     
     --responsive-item-size: clamp( 
         100% / (var(--P) + 1) + 0.1%,       /* MIN 值 */
         (var(--ideal-size) - 100vw) * 1000, /* VAL 值 */
         100%                                /* MAX 值 */
     ) 
}
```

简单解释一下这样做的意义：

- 当容器宽度（最大是浏览器视窗宽度，即 `100vw`）大于 `--ideal-size` 时， `var(--ideal-size) - 100vw` 会产生一个负值，会小于 `100% / (var(--P) + 1) + 0.1%`，也就确保每行保持 `--P` 个项目；
- 当容器宽度（最大是浏览器视窗宽度，即 `100vw`）小于 `--ideal-size` 时， `var(--ideal-size) - 100vw` 是一个正值，并乘以一个较大值（比如， `1000` ），它会大于 `100%`，也就确保了项目的宽度将是 `100%`。

到此为止，我们完成了 `P` 列到 `1` 列的响应。有了这个基础，要从 `P` 列到 `O` 列响应也就不是难事了。只需将 `O` 列参数引入到 `clamp()` 函数中：

```
width = clamp( 100% / (P + 1) + 0.1%, (var(--ideal-size) - 100vw) * 1000, 100% / (O + 1) + 0.1%)
```

使用这个公式来替换前面的示例：

```
:root { 
    --P: 4; 
    --O: 3; 
    --ideal-size: 400px; 
    --responsive-size: clamp( 
        100% / (var(--P) + 1) + 0.1%, 
        (var(--ideal-size) - 100vw) * 1000, 
        100% / (var(--O) + 1) + 0.1% );
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f93137aeb78418eafa0af3cde25608f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/KKBpOOb>

正如上图所示，它始终是从 `P` 列到 `O` 列变化，即使容器再小，也会是 `O` 列，除非将 `O` 的值设置为 `1` 。

继续加码。如果期望每行列数从 `P ▶ O ▶ 1` 进行响应。要实现这样的响应，从代码上来看会比前面的复杂，需要引入浏览器视窗的断点值，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c03621062a9b413aa122e4afe65860ff~tplv-k3u1fbpfcp-zoom-1.image)

- 大于 `W1` 断点时每行保持 `P` 个项目；
- 大于 `W2` 断点时每行保持 `O` 个项目；
- 小于 `W2` 断点时每行保持 `1` 个项目。

除了引入 `W1` 和 `W2` 两个断点之外，还需要使用 `clamp()` 嵌套 `clamp()`：

```
clamp( 
    clamp( 
        100% / (P + 1) + 0.1%, 
        (W1 - 100vw) * 1000, 
        100% / (O + 1) + 0.1% 
    ), 
    (W2 - 100vw) * 1000, 
    100% 
) 
```

有了前面的基础，要理解这个就容易多了。你可以从里面往外面去理解，先看里面的 `clamp()`：

- 当屏幕宽度小于断点 `W1` 时，会保持每行 `O` 个项目呈现；
- 当屏幕宽度大于断点 `W1` 时，会保持每行 `P` 个项目呈现。

再看外面那个 `clamp()`：

- 当屏幕宽度小于断点 `W2` 时，会保持每行 `1` 个项目呈现；
- 当屏幕宽度大于断点 `W2` 时，将会按里面的 `clamp()` 返回值来做决定。

如果使用这个公式来构建 `P ▶ O ▶ 1` 列响应的示例，其代码看起来如下：

```
 :root { 
     --gap: 20px;   /* 列间距 */
     --W1: 1024px; /* 第一个断点 W1 */ 
     --W2: 719px; /* 第二个断点 W2 */ 
     --P: 4;      /* 大于断点 W1 时，每行显示的列数 */ 
     --O: 2;      /* W2 ~ W1 断点之间，每行显示的列数*/ 
     --responsive-size: clamp( 
         clamp( 
             100% / (var(--P) + 1) + 0.1%, 
             (var(--W1) - 100vw) * 1000, 
             100% / (var(--O) + 1) + 0.1% 
         ), 
         (var(--W2) - 100vw) * 1000, 
         100% 
      );
 } 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8d123bbcc7e49ccbf1ebd7b0e6d41dc~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/ExpVgeq>

同样的原理，要实现更多的列响应，只需要新增断点和 `clamp()` 的嵌套，比如前面我们说的 `P ▶ O ▶ N ▶ 1` 的列响应：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ede875d6865245a0b34a424e6c53bf6d~tplv-k3u1fbpfcp-zoom-1.image)

```
:root {
    --gap: 20px;
    --W1: 1200px;
    --P: 4;
    --W2: 992px;
    --O: 3;
    --W3: 768px;
    --N: 2;
    --responsive-size: clamp(
        clamp(
            clamp(
                100% / (var(--P) + 1) + 0.1%,
                (var(--W1) - 100vw) * 1000,
                100% / (var(--O) + 1) + 0.1%
            ),
            (var(--W2) - 100vw) * 1000,
            100% / (var(--N) + 1) + 0.1%
        ),
        (var(--W3) - 100vw) * 1000,
        100%
    );
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/388d690f42b941878a7416fd81c89a39~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/eYjpBwd>

依此类推，就可以在不同断点下控制不同列数的呈现。

### 响应元素大小

上面的示例都是围绕着 Flex 项目和 Grid 项目尺寸，前者是响应 Flex 项目的 `flex-basis` ，后者是响应 Grid 的列网格轨道。事实上，除此之外，CSS 比较函数还可以用来调整任何元素的 `width` 或 `height`。比如，下面这个示例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/039ac58776eb4f8995f6390e58876cb4~tplv-k3u1fbpfcp-zoom-1.image)

在以往，我们一般会像下面这样编写 CSS 代码：

```
.page__wrapper {
    width: 1024px;
    padding: 0 16px;
    margin: 0 auto;
}
​
/* 或者 */
.page__wrapper {
    width: 100%;
    max-width: 1024px;
    padding: 0 16px;
    margin: 0 auto;
}
```

这样的布局场景，我们可以直接使用 `min()` 来替代 `max-width`：

```
.page__wrapper { 
    width: min(1024px, 100% - 32px); 
    padding: 0 16px; 
    margin: 0 auto; 
} 
```

这段代码的意思是，当浏览器视窗宽度大于或等于 `1024px` 时，`.page__wrapper` 宽度是 `1024px`；一旦浏览器视窗宽度小于 `1024px` 时，`.page__wrapper` 的宽度是 `100% - 32px`（这里的 `32px` 是设置了 `padding-left` 和 `padding-right` 的和）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0136090e5d743b98df51a6eef27e625~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZEjbLee>

我们还可以把上面示例中的 `min()` 函数换成 `clamp()` 函数，给 `.page__wrapper` 设置一个更理想的宽度：

```
:root { 
    --max-viewport-size: 100vw;    /* 最大视窗尺寸，100vw 等于视窗宽度的 100% */
    --ideal-viewport-size: 1024px; /* 理想视窗尺寸 */
    --min-viewport-size: 320px;   /* 最小视窗尺寸 */ 
    --gap: 1rem; 
    --padding: 1rem; 
} 
​
.page__wrapper { 
    width: clamp(
        var(--min-viewport-size), 
        var(--ideal-viewport-size), 
        var(--max-viewport-size)
   ); 
   padding: 0 var(--padding); 
   margin: 0 auto; 
}
```

使用该机制，我们可以给一个元素尺寸设置上限值、下限值等。所设你正在开发一个阅读类的 Web 应用，可以使用 `clamp()` 函数给文本段落设置一个更适合阅读的理想宽度。

比如，“**衬线字体的单列页面，一般认为一行** **`45 ~ 75`** **个字符的长度是比较理想的** ”。为了确保文本块不少于 `45` 个字符，也不超过 `75` 个字符，你可以使用 `clamp()` 和 `ch` 单位给文本块设置尺寸，比如给段落 `p` 设置宽度：

```
p { 
    width: clamp(45ch, 100%, 75ch); 
}
```

基于该原理，如果我们把最小尺寸的值设置为 `0` 时，就可以让一个元素不可见。即，**使用** **`clamp()`** **函数可以让一个元素根据屏幕尺寸来显示或隐藏** （以往要实现这样的效果需要使用媒体查询或 JavaScript）：

```
.toggle--visibility { 
    max-width: clamp(0px,(100vw - 500px) * 1000,100%); 
    max-height:clamp(0px,(100vw - 500px) * 1000,1000px); 
    margin:clamp(0px,(100vw - 500px) * 1000,10px); 
    overflow:hidden; 
 }
```

基于屏幕宽度（`100vw`），把元素的 `max-width`（最大宽度）和 `max-height`（最大宽度）限制在：

- `0px` ，元素不可见；
- `100%` ，元素可见。

注意，示例中 `max-height` 并没有设置 `100%`，而是取了一个较大的因定值 `1000px`，主要是因为`max-height` 取百分比，会致使用例失效（如果其父容器未显式设置 `height` 值，`max-height` 取百分比值会无效）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff626029a2fa4e7392950a47aceb5138~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/BaPopOo>

如上图所示，浏览器视窗宽度小于 `500px` 时，绿色盒子不可见。

利用这个原理，就可以使用 `clamp()` 函数来实现内容切换的效果。比如，让我们根据浏览器视窗的断点来对内容进行切换：

```
<button> 
    Contact Us 
    <svg> </svg> 
</button>
.contact { 
    --w: 600px; 
    --c: (100vw - var(--w)); 
    padding: clamp(10px, var(--c) * -1000, 20px); 
    font-size: clamp(0px, var(--c) * 1000, 30px); 
    border-radius: clamp(10px, var(--c) * -1000, 100px); 
} 
​
.contact svg { 
    width: 1em; 
    height: 1em; 
    font-size: clamp(0px, var(--c) * -1000, 30px); 
 }
```

注意，示例中 `svg` 的 `width` 和 `height` 设置为 `1em` 很关键，可以让 `svg` 图标的大小相对于 `font-size` 进行计算。你可以尝试改变浏览器视窗的大小，当视窗宽度小于 `600px` 时，文本按钮会自动切换成一个图标按钮：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72a90ff808c84657884f18428250676a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/gOjazYp>

### 响应间距

在 CSS 中，可用来设置元素之间间距的属性主要有 `margin` 、`padding` 和 `gap` 。在这个属性上使用 CSS 比较函数 `min()` 、`max()` 和 `clamp()` 返回值，可以让元素之间和周围间距具有动态响应能力。这将帮助我们能更好地设计响应式 UI。

大家是否有碰到过设计师提这样的需求：“**希望在宽屏时内距大一点，窄屏时内距小一点** ”。以往要实现这样的效果，通常是使用 CSS 媒体查询在不同断点下给元素设置不同的 `padding` 值。现在，我们使用 `min()` 或 `max()` 就可以很轻易实现。比如：

```
.wrapper { 
    padding-inline: max(2rem, 50vw - var(--contentWidth) / 2);
} 
```

甚至设计师还会跟你说：“**内距随着容器宽度增长和缩小，而且永远不会小于** **`1rem`，也不会大于** **`3rem`** ”。面对这样的需求，可以使用 `clamp()` 给元素设置 `padding` 值：

```
.element { 
    padding-inline:  clamp(1rem, 3%, 3rem); 
} 
```

与媒体查询相比，这里最重要的好处是，定义的 `padding` 是相对于元素的，当元素在页面上有更多的空间时，它就会变大，反之就会变小，并且这个变化始终界于 `1rem ~ 3rem` 之间。如此一来，你就可以像下面这样来定义 `padding`：

```
:root { 
    --padding-sm: clamp(1rem, 3%, 1.5rem); 
    --padding-md: clamp(1.5rem, 6%, 3rem); 
    --padding-lg: clamp(3rem, 12%, 6rem); 
} 
```

这样做，除了能满足设计需求之外，对于 Web 可访问性也是有益的。[WCAG Success Criterion 1.4.10 - Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) 有过这样一段描述：

> Reflow is the term for supporting desktop zoom up to 400%. On a 1280px wide resolution at 400%, the viewport content is equivalent to 320 CSS pixels wide. The intent of a user with this setting is to trigger content to reflow into a single column for ease of reading.

这个规则定义了 Reflow（回流）的标准。Reflow 是支持桌面缩放的一个技术术语，其最高可达 `400%`。在 `1280px` 宽分辨率为 `400%` 的情况下，视口内容相当于 `320` CSS 像素宽。用户使用此设置的目的是触发内容回流到单个列中，以便于阅读。换句话说，该标准定义了对浏览器放大到 `400%` 的期望。在这一点上，屏幕的计算宽度被假定为 `320px` 左右。

结合前面的内容，我们可以像下面这样设置样式，能给用户一个较好的阅读体验：

```
p { 
    width: clamp(45ch, 100%, 75ch); 
    padding-inline: clamp(1rem, 3%, 1.5rem); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b64818f07194416db2be6d7d48fe16c0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/GRBpdpp>

上面示例中，`padding` 值采用百分比单位的话，它是相对于元素的 `width` （或 `inline-size`）计算的，这对于 `clamp()` 特别友好，可以使用百分比作为一个动态值。除此之外，还可以使用视窗单位，比如 `vw` 、 `vh`之类，它们特别适用于那些相对于视窗大小来动态调整值的场景。

同样的，你也可以将 `min()` 、`max()` 和 `clamp()` 用于 `margin` 和 `gap` ：

```
:root { 
    --block-flow-sm: min(2rem, 4vh); 
    --block-flow-md: min(4rem, 8vh); 
    --block-flow-lg: min(8rem, 16vh); 
    
    --layout-gap-sm: clamp(1rem, 3vmax, 1.5rem); 
    --layout-gap-md: clamp(1.5rem, 6vmax, 3rem); 
    --layout-gap-lg: clamp(3rem, 8vmax, 4rem);
}
```

### 边框和圆角半径的响应

在一些设计方案中，有些元素的边框（`border-width`）和圆角半径（`border-radius`）很大，但希望在移动端上更小一些。比如下图这个设计：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86bde0372fa4451db32687a322f541f1~tplv-k3u1fbpfcp-zoom-1.image)

桌面端（宽屏）中卡片的圆角 `border-radius` 是 `8px`，移动端（窄屏）是 `0`。以往你可能是这样来写：

```
.card { 
    border-radius: 0; 
} 
​
@media only screen and (min-width: 700px) { 
    .card { 
        border-radius: 8px; 
    } 
} 
```

未来你还可以使用 CSS 容器查询，像下面这样编写代码：

```
.card--container { 
    container-type: inline-size; 
} 
​
.card { 
    border-radius: 0; 
} 
​
@container (width > 700px) { 
    .card { 
        border-radius: 8px; 
    } 
}
```

其实，除了使用 CSS 查询特性之外，CSS 中还有一些其他的方式来实现上图的效果。简单地说，**根据上下文环境来改变属性的值** 。

比如，使用 CSS 的 `clamp()` 函数，就是一个不错的选择：

```
:root { 
    --w: 760px; 
    --max-radius: 8px; 
    --min-radius: 0px; /* 这里的单位不能省略 */ 
    --radius: (100vw - var(--w)); 
    --responsive-radius: clamp( 
        var(--min-radius), 
        var(--radius) * 1000, 
        var(--max-radius) ); 
} 
​
div { 
    border-radius: var(--responsive-radius, 0); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48bcd2f53ae9491f9b49646cf8814b97~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/vYaLYBj>

你也可以将 `min()` 和 `max()` 组合起来一起使用，达到 `clamp()` 相似的功能，即 `clamp(MIN, VAL, MAX)` 等同于 `max(MIN, min(VAL, MAX))` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76a3836fb5ff43cda99335eed9614149~tplv-k3u1fbpfcp-zoom-1.image)

> **注意，`min()`** **、`max()`** **函数中可以直接进行四则运算，不需要使用** **`calc()`** **函数。**

```
.box { 
    --min-radius: 0px; 
    --max-radius: 8px; 
    --ideal-radius: 4px; 
    border-radius: max( var(--min-radius), min(var(--max-radius), (100vw - var(--ideal-radius) - 100%) * 9999) ); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13507848e6df4bf19864f1187af95bb0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNrxNOM>

你可能已经想到了，这里提到的技术也适用于其他需要动态响应的 UI 属性上，比如边框、阴影等。

### 响应背景尺寸和位置

`min()` 、`max()` 和 `clamp()` 还有一个特殊的用处，**可以对背景图片尺寸或位置做一些界限限制** 。

或许你要提供一个背景颜色和图像分层效果，与其使用 `cover`（`background-size` 的一个值），让图像填满整个容器空间，还不如为图像的增长上设置上限。

比如下面这个示例，在 `background-size` 中使用 `min()` 函数，确保背景图片不超过 `600px`，同时通过设置 `100%` 允许图像与元素一起向下响应。也就是说，它将增长到 `600px`，当元素的宽度小于 `600px` 时，它将调整自己的大小来匹配元素的宽度：

```
.element { 
    background: #1f1b1c url(https://picsum.photos/800/800) no-repeat center; 
    background-size: min(600px, 100%); 
} 
```

反过来，也可以使用 `clamp()` 根据断点来设置 `background-size` 的值。比如：

```
 .element { 
     --w: 760px; 
     --min-size: 600px; 
     --max-size: 100%; 
     background-size: clamp(var(--min-size), var(--w) * 1000, var(--max-size)) auto; 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48199281f88844ebb094f17a3d6b3852~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxJZxLp>

再来看一个渐变的示例。我们平时可能会像下面这样，给元素添加一个渐变背景效果：

```
.element { 
    background: linear-gradient(135deg, #2c3e50, #2c3e50 60%, #3498db); 
}
```

但很少有同学会留意，上面的渐变效果在不同屏幕（或不同尺寸的元素上）的效果是有一定差异的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3471aad7f5da4ed69ee5fed69e206d7d~tplv-k3u1fbpfcp-zoom-1.image)

如果想让渐变的效果在桌面端和移动端上看上去基本一致，一般会使用媒体查询来调整渐变颜色的位置：

```
.element { 
    background: linear-gradient(135deg, #2c3e50, #2c3e50 60%, #3498db); 
}
​
@media only screen and (max-width: 700px) { 
    .element { 
        background: linear-gradient(135deg, #2c3e50, #2c3e50 25%, #3498db); 
    } 
}
```

现在，我们可以使用 `min()` 函数，让事情变得更简单：

```
.element { 
    background: linear-gradient(135deg, #2c3e50, #2c3e50 min(20vw, 60%), #3498db); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cfdc5bca7d34298b3ccdffd3c32fd18~tplv-k3u1fbpfcp-zoom-1.image)

另外，平时在处理图片上文字效果时，为了增强文本可阅读性，你可能会在文本和图片之间增加一层渐变效果。那么这个时候，使用 `max()` 函数控制渐变中透明颜色位置就会有意义得多：

```
.element { 
    background: linear-gradient(to top, #000 0, transparent max(20%, 20vw)); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39a04a8cb7144da989226bf05e7b8053~tplv-k3u1fbpfcp-zoom-1.image)

### 流畅的排版

为了实现流畅的排版，[@Mike Riethmeuller 推广了一种技术](https://twitter.com/mikeriethmuller)。该技术使用 `calc()` 函数来设置最小字体大小、最大字体大小，并允许从最小值过渡至最大值。社区也把这种技术称为 **CSS 锁（CSS Locks）** 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4615ab205aef4d7d86e81a183b608d01~tplv-k3u1fbpfcp-zoom-1.image)

如果用 CSS 来描述的话会像下面这样：

```
 /** 
 * 1. minf: 最小font-size 
 * 2. maxf: 最大font-size 
 * 3. minw: 视窗最小宽度 
 * 4. maxw: 视窗最大宽度 
 **/ 
html {
   font-size: calc([minf]px + ([maxf] - [minf]) * ( (100vw - [minw]px) / ([maxw] - [minw]) )); 
}
 
 @media only screen and (max-width: [minw]px) { 
     html {
         font-size: [minf]px; 
     }
 }
 
 @media only screen and (min-width: [maxw]px) { 
     html{
         font-size: [maxf]px; 
     }
}
```

比如：

```
@media screen and (min-width: 25em){ 
    html { 
        font-size: calc( 16px + (24 - 16) * (100vw - 400px) / (800 - 400) ); 
    } 
} 
​
@media screen and (min-width: 25em){ 
    html { 
        font-size: calc( 16px + (24 - 16) * (100vw - 400px) / (800 - 400) ); 
    } 
} 
​
@media screen and (min-width: 50em){ 
    html { 
        font-size: calc( 16px + (24 - 16) * (100vw - 400px) / (800 - 400) ); 
    } 
} 
```

基于该原理，社区中也有不少开发者使用这种方式来处理移动端的适配，它有一个专业名称，即 **`vw + rem`** ：

```
html {
    font-size: 16px;
}
​
@media screen and (min-width: 375px) {
    html {
        /* iPhone6 的 375px 尺寸作为 16px 基准，414px 正好 18px 大小, 600px 正好 20px 大小 */
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 414px-1000px 每 100 像素宽字体增加 1px(18px-22px) */
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 600px) {
    html {
        /* 600px-1000px 每 100 像素宽字体增加 1px(20px-24px) */
        font-size: calc(20px + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 1000px 往后是每 100 像素 0.5px 增加 */
        font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
    }
} 
```

CSS 的 `clamp()` 函数的出现，我们可以将上面的公式变得更简单，比如：

```
html { 
    font-size: clamp(1rem, 1vw + 0.75rem, 1.5rem); 
}
```

开发者可以直接使用 [Adrian Bece 提供的在线工具 Modern Fluid Typography Editor](https://modern-fluid-typography.vercel.app/)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57c8e06b254d40a9803bde8b70abd0c0~tplv-k3u1fbpfcp-zoom-1.image)

使用 `clamp()` （或 `max()`）能让我们轻易实现文本大小随视窗宽度（或容器宽度）动态响应（进行缩放），直到达到设定的界限（最大值和最小值），从而实现流畅的排版效果。只不过，该技术对于 Web 可访问性是有一定伤害性的。

在 WCAG 1.4.4 调整文本大小 (`AA`) 下，利用 `max()` 或 `clamp()` 限制文本大小可能导致 WCAG 失败，因为用户可能无法将文本缩放到其原始大小的 `200%`。因此，在实际运用当中，还需要开发者根据具体的需求做出正确的选择。

## 如何像素级完美还原一个可缩放的 UI 界面？

[@Georgi Nikoloff 在 Codepen 上提供了一个可具缩放的 UI 界面示例](https://codepen.io/gbnikolov/full/oNZRNQR)。以一种方式对下面这样的设计稿进行了完美地缩放，并保留所有文本的行数、边距、图像尺寸等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4a02af9cf9845cb8f528a241965b396~tplv-k3u1fbpfcp-zoom-1.image)

Web 开发者对上图这样的设计应该很熟悉，特别是对常开发 PC 端产品或大屏幕的同学而言，更没有什么特殊性，也没有什么花哨的东西。

另外，上图的设计是基于 `1600px` 宽度进行设计的。在这个设计尺寸状态下，我们可以获取到设计稿中所有 UI 元素下的像素值，比如元素的宽度、高度，文本的字号等。就拿设计稿中卡片上的标题字号为例，它是 `16px`。此时，我们可以这样来理解，UI 界面在 `1600px` 时，卡片标题大小在“理想状态”（和设计稿宽度 `1600px` 容器相匹配）下，应该是 `16px`。事实上，设计稿也是这样设计的。

现在我们有了“理想”容器宽度下的字体大小，让我们使用当前“视窗宽度”来相应地调整我们的 CSS 像素值。

```
/** 
* ①：设计师提供设计稿时，容器宽度（理解成页面宽度）是 1600px 
* ②：用户当前设备视窗宽度 
**/ 
​
:root { 
    --ideal-viewport-width: 1600;    /* ① */ 
    --current-viewport-width: 100vw; /* ② */ 
} 
​
.card__heading { 
    /** 
    * ①：UI 设计希望在 1600px 视窗宽度下卡片标题最理想的字体大小是 16px 
    * ②：计算实际的字体大小。计算公式 理想字体大小 x (当前视窗宽度 / 理想视窗宽度) 
    **/ 
    --ideal-font-size: 16; /* ① */ 
    font-size: calc(var(--ideal-font-size) * (var(--current-viewport-width) / var(--ideal-viewport-width))) 
} 
```

正如你所看到的，我们将以设计稿中获得的理想字体大小作为一个基数，并将其乘以当前视窗宽度和理想视窗宽度之间的比率。

```
 --current-device-width: 100vw; /* 代表理想宽度（设计稿宽度）或屏幕的全宽 */  
 --ideal-viewport-width: 1600;  /* 理想宽度和当前宽度是相匹配的 */  
 --ideal-font-size: 16; 
 
 /* 相当于 */  
 font-size: calc(16 * 1600px / 1600); 
 
 /* 等同于 */ 
 font-size: calc(16 * 1px); 
 
 /* 最终结果 */  
 font-size: 16px 
```

由于我们的视窗宽度和理想宽度完全吻合，字体大小在理想视窗宽度 `1600px` 下正好是 `16px`。假设你的移动设备（比如笔记本）的视窗宽度是 `1366px`，也就是说，在笔记本上浏览这个页面（`1600px` 设计稿下对应的页面），按照上面的计算方式，那会是：

```
/* 视窗宽度变成 1366px */  
font-size: calc(16 * 1366px / 1600); 
​
/* 等同于 */  
font-size: calc(16 * .85375px); 
​
/* 结果 */ 
font-size: 13.66px 
```

如果换成在 `1920px` 宽的显示器浏览时，计算就变成：

```
/* 视窗宽度 1920px */  
font-size: calc(16 * 1920px / 1600); 
​
/* 等同于 */  
font-size: calc(16 * 1.2px); 
​
/* 最终结果 */  
font-size: 19.2px
```

尽管我们使用像素值作为参考，但实际上能够根据理想视窗宽度和当前视窗宽度之间的比例来调整 CSS 属性的值。

上面我们演示的是 `font-size` 下的计算方式，但在还原一个 UI 设计稿的时候，有很多元素的 CSS 属性都会用到长度单位的值，比如 `width`、`height`、`border-width`、`padding` 和 `margin` 等。那么对于这些要采用长度单位值的属性，我们都可以采用同样的方式来做计算。比如说，卡片的宽度在设计稿状态下是 `690px`，那么我们可以像 `font-size` 这样来对 `width` 进行计算：

```
 :root { 
     --ideal-viewport-width: 1600; 
     --current-viewport-width: 100vw; 
 } 
 
 .card { 
     --ideal-card-width: 690; /* 卡片宽度 */ 
     width: calc(var(--ideal-card-width) * (var(--current-viewport-width) / var(--ideal-viewport-width))) 
 } 
```

当你的设备的视窗宽度刚好和理想的视窗宽度相等，即 `1600px`，那么：

```
width: calc(690 * 1600px / 1600); 
​
/* 等同于 */  
width: calc(690 * 1px); 
​
/* 结果 */
width: 690px;
```

你设备视窗宽度从 `1600px` 换到 `1366px` 时（相当于 `--current-viewport-width` 的 `100vw` 就是`1366px`），那么：

```
width: calc(690 * 1366px / 1600); 
​
/* 等同于 */  
width: calc(690 * 0.85375px); 
​
/* 结果 */  
width: 589.0875px; 
```

同样的，视窗宽度换到 `1920px` 时：

```
width: calc(690 * 1920px / 1600); 
​
/* 等同于 */  
width: calc(690 * 1.2px); 
​
/* 结果 */  
width: 828px;
```

@Georgi Nikoloff 就是采用这种方式对各个元素做了计算，最终看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ea8f816f4a940f9a194a8a7b18cb5a6~tplv-k3u1fbpfcp-zoom-1.image)

按照前面的介绍，我们可以得到一个像素缩放计算的公式：

```
元素像素缩放计算值 = 设计稿上元素尺寸基数 x  100vw / 设计稿视窗宽度基数 
```

- **设计稿上元素尺寸基数**：指的是设计稿上 UI 元素尺寸的基数值，不带任何单位。比如设计稿上的某个 UI 元素的字号是 `16px`，那么代表 `font-size` 的基数值是`16`，该值也被称为理想尺寸值；
- **`100vw`**：代表访问应用设备当前视窗的宽度；
- **设计稿视窗宽度基数**：指的是设计稿的尺寸宽度，该宽度也被称为理想视窗宽度，比如目前移动端设计稿都是`750px` 宽度做的设计，那么这个理想视窗宽度（设计稿视窗宽度基数）就是 `750`；
- **元素像素缩放计算值**：指的就是 UI 元素根据计算公式得到的最终计算值，它会随着设备的当前视窗宽度值做缩放。

上面这几个值中，“设计稿上元素尺寸基数”和“设计稿视窗宽度基数”是固定值，除非设计师将设计稿整体尺寸做了调整。`100vw` 大家都应该熟悉，它的单位 `vw` 是 CSS 单位中的视窗单位，会随着用户设备当前视窗宽度做变化。这也造成最终计算出来的值（元素像素缩放计算值）也是一个动态值，会随用户当前设备视窗宽度做出调整。

使用上面这种方式，虽然能让 UI 元素尺寸大小根据视窗大小做出动态计算，从而实现完美的像素级缩放，但其还是略有不完美之处，因为不管视窗的大小，最终都会影响到计算值，也会影响到 UI 界面的最终效果。为此，我们可以给这种方式添加一把锁。即，使用 CSS 的 `clamp()` 函数来控制用户的最小视窗和最大视窗的宽度。

比如说，你的最小视窗是 `320px`，最大视窗是 `3840px`。也就是说，我们可以使用 `clamp(320px, 100vw, 3840px)` 来替代 `--current-viewport-width`（即 `100vw`）。这就意味着，如果我们在视窗宽度为 `5000px` 的设备上浏览 Web 应用或页面时，整个页面的布局（UI元素的尺寸大小）将被锁定在 `3840px`。 如果我们把 `clamp()` 放到计算公式中，可以像下面这样来做计算：

```
:root { 
    /* 理想视窗宽度，就是设计稿宽度 */ 
    --ideal-viewport-width: 1600; 
    
    /* 当前视窗宽度 100vw */ 
    --current-viewport-width: 100vw; 
    
    /* 最小视窗宽度 */ 
    --min-viewport-wdith: 320px; 
    
    /* 最大视窗宽度 */ 
    --max-viewport-width: 3840px; 
    
    /** 
    * clamp() 接受三个参数值，MIN、VAL 和 MAX，即 clamp(MIN, VAL, MAX) 
    * MIN：最小值，对应的是最小视窗宽度，即 --min-viewport-width 
    * VAL：首选值，对应的是100vw，即 --current-viewport-width 
    * MAX：最大值，对应的是最大视窗宽度，即 --max-viewport-width 
    **/ 
    --clamped-viewport-width: clamp( var(--min-viewport-width), var(--current-viewport-width), var(--max-viewport-width) ) 
 } 
 
 .card__heading { 
     /* 理想元素尺寸基数 */ 
     --ideal-font-size: 16; 
     
     /* 1600px 设计稿中卡片标题的字号，理想字号 */ 
     font-size: calc( var(--ideal-font-size) * var(--clamped-viewport-width) / var(--ideal-viewport-width) ) 
 } 
 
 .card { 
     /* 理想元素尺寸基数 */ 
     --ideal-card-width: 690; 
     
     /* 1600px 设计稿中卡片宽度，理想宽度 */ 
     width: calc( var(--ideal-card-width) * var(--clamped-viewport-width) / var(--ideal-viewport-width) ) 
} 
```

你可能已经发现了，如果我们在每个元素上涉及到长度单位的属性都要像下面这样写的话会感到很痛苦：

```
 :root { 
     --ideal-viewport-width: 1600; 
     --current-viewport-width: 100vw; 
     --min-viewport-width: 320px; 
     --max-viewport-width: 1920px; 
     --clamped-viewport-width: clamp( var(--min-viewport-width), var(--current-viewport-width), var(--max-viewport-width) ) 
} 
​
.card { 
    font-size: calc( 14 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    width: calc( 500 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    border: calc( 2 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ) solid rgb(0 0 0 / .8); 
    box-shadow: calc(2 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) calc(2 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) calc(6 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) calc(10 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) rgb(0 0 0 / .5) 
} 
```

上面这样的代码除了写起来痛苦之外，维护起来也是非常的蛋疼。不过，我们可以借助 CSS 处理器来辅助我们，让事情变得更简单一些。比如说，可以使用 SCSS 的函数特性，编写一个具有像素缩放值的函数：

```
/** 
* @param {Number} $value - 理想尺寸基数，不带任何单位，设计稿对应的元素尺寸值，eg 设计稿元素宽度是500，$value = 500 
* @param {Number} $idealViewportWidth - 理想视窗宽度基数，不带单位，设计稿的宽度 
* @param {String} $min - 最小视窗宽度 * @param {String} $max - 最大视窗宽度 
**/ 
​
@function scalePixelValue($value, $idealViewportWidth: 1600, $min: 320px, $max: 3480px) { 
    @return calc( #{$value} * (clamp(#{$min}, 100vw, #{$max}) / #{$idealViewportWidth})) 
}
```

有了这个函数之后，我们可以像下面这样使用：

```
.card { 
    font-size: #{scalePixelValue(14)}; 
    width: #{scalePixelValue(500)}; 
    border: #{scalePixelValue(2)} solid rgb(0 0 0 / .8); 
    box-shadow: #{scalePixelValue(2)} #{scalePixelValue(2)} #{scalePixelValue(6)} #{scalePixelValue(10)} rgb(0 0 0 / .5) 
}
```

编译出来的代码如下：

```
 .card { 
     font-size: calc( 14 * (clamp(320px, 100vw, 3480px) / 1600) ); 
     width: calc( 500 * (clamp(320px, 100vw, 3480px) / 1600) ); 
     border: calc( 2 * (clamp(320px, 100vw, 3480px) / 1600) ) solid rgba(0, 0, 0, 0.8); 
     box-shadow: calc( 2 * (clamp(320px, 100vw, 3480px) / 1600) ) calc( 2 * (clamp(320px, 100vw, 3480px) / 1600) ) calc( 6 * (clamp(320px, 100vw, 3480px) / 1600) ) calc( 10 * (clamp(320px, 100vw, 3480px) / 1600) ) rgba(0, 0, 0, 0.5); 
} 
```

还可以像下面这样使用 `scalePixelValue()` 函数，传你自己想要的值：

```
.card { 
    font-size: #{scalePixelValue(14, 1600, 320px, 1920px)}; 
    width: #{scalePixelValue(500, 1600, 320px, 1920px)}; 
    border: #{scalePixelValue(2, 1600, 320px, 1920px)} solid rgb(0 0 0 / .8); 
    box-shadow: #{scalePixelValue(2, 1600, 320px, 1920px)} #{scalePixelValue(2, 1600, 320px, 1920px)} #{scalePixelValue(6, 1600, 320px, 1920px)} #{scalePixelValue(10, 1600, 320px, 1920px)} rgb(0 0 0 / .5); 
}
```

编译出来的代码：

```
.card { 
    font-size: calc( 14 * (clamp(320px, 100vw, 1920px) / 1600) ); 
    width: calc( 500 * (clamp(320px, 100vw, 1920px) / 1600) ); 
    border: calc( 2 * (clamp(320px, 100vw, 1920px) / 1600) ) solid rgba(0, 0, 0, 0.8); 
    box-shadow: calc( 2 * (clamp(320px, 100vw, 1920px) / 1600) ) calc( 2 * (clamp(320px, 100vw, 1920px) / 1600) ) calc( 6 * (clamp(320px, 100vw, 1920px) / 1600) ) calc( 10 * (clamp(320px, 100vw, 1920px) / 1600) ) rgba(0, 0, 0, 0.5); 
} 
```

除了上面这样编写一个 SCSS 的函数之外，你还可以编写其他 CSS 处理器的函数。如果熟悉 PostCSS 插件开发的话，还可以编写一个 PostCSS 插件。

### 移动端上的实战

现在我们经常开发的都是移动端上的页面，大部分采用的都是 REM 适配 和 VW 适配方案。那么我们来尝试今天介绍的方案，在移动端上会是一个什么样的效果。接下来，我们以下图为例，真正实战一下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f9b895113804e22bfb92015abc99ba8~tplv-k3u1fbpfcp-zoom-1.image)

我们接下来只会还原上图中蓝色框框起的那张卡片。

目前为止，针对于移动端（移动手机设备）的设计稿都是以 `750px` 宽度的设计稿为基础。按照上面所介绍的内容，那么 `--ideal-viewport-width` （理想视窗宽度）是 `750`：

```
:root { 
    --ideal-viewport-width: 750;
} 
```

而当前视窗宽度同样是 `100vw`，即 `--current-viewport-width` 是 `100vw` ：

```
root { 
    --ideal-viewport-width: 750; 
    --current-viewport-width: 100vw; 
}
```

如果你想给其加把锁，限制缩放在某个范围，可以根据现在主流移动手持设备的屏幕分辨率来做选择：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd483f587eb14b2094d8fae6410ea133~tplv-k3u1fbpfcp-zoom-1.image)

比如说在 `320px ~ 1440px` 范围内，即`--min-viewport-width` 是 `320px`，`--max-viewport-width` 是 `1440px`：

```
:root { 
    --ideal-viewport-width: 750; 
    --current-viewport-width: 100vw; 
    --min-viewport-width: 320px; 
    --max-viewport-width: 1440px; 
} 
```

如此一来，就可以获得 `--clamped-viewport-width`：

```
:root { 
    --ideal-viewport-width: 750; 
    --current-viewport-width: 100vw; 
    --min-viewport-width: 320px; 
    --max-viewport-width: 720px; 
    --clamped-viewport-width: clamp( 
        var(--min-viewport-width), 
        var(--current-viewport-width), 
        var(--max-viewport-width)); 
} 
```

有了这些基本参数，就可以根据设计稿的尺寸得出相应的缩放像素值。

```
<!-- HTML --> 
<div class="root"> 
    <div class="tab__content"> 
        <div class="card"> 
            <div class="card__media"> 
                <div class="media__object"> 
                    <img src="https://picsum.photos/180/180?random=2" alt=""> 
                </div> 
            </div> 
            <div class="card__content"> 
                <h3 class="card__heading">星巴克猫爪杯八个字</h3> 
                <p class="card__body">这是一段推荐文字九十一二三四五</p> 
                <div class="card__footer"> 
                    <div class="card__price"> 
                        <div class="card__price--current"> <span>&yen;</span> <strong>1</strong> </div> 
                        <del class="card__price--orgion">&yen;280.06</del> 
                    </div> 
                    <button class="card__button">1元抢</button> 
                </div> 
                <div class="card__badge">本周特推</div> 
            </div> 
        </div> 
    </div> 
</div>
/* CSS */ 
* { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
} 
​
body { 
    width: 100vw; 
    min-height: 100vh; 
    display: flex; 
    justify-content: center; 
    background-color: #ffce00; 
    color: #fff; 
    padding: 20px; 
} 
​
.tab__content { 
    background: #ff9500; 
    border-radius: 36px; 
    padding: 22px; 
    width: 702px; 
} 
​
.card { 
    display: flex; 
    background: #ffffff; 
    position: relative; 
    box-shadow: 0 4px 4px 0 #ff5400, inset 0 -2px 0 0 rgba(255, 255, 255, 0.51), inset 0 -7px 6px 3px #ffcca4; 
    border-radius: 38px; 
    padding: 24px; 
} 
​
.card__media { 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    overflow: hidden; 
    width: 170px; 
    height: 170px; 
    border-radius: 24px; 
    margin-right: 20px; 
} 
​
.card__media img { 
    width: 100%; 
    aspect-ratio: 1 / 1; 
    display: block; 
    border-radius: 24px; 
} 
​
.card__content { 
    flex: 1; 
    min-width: 0; 
    display: flex; 
    flex-direction: column; 
} 
​
.card__content > * { 
    width: 100%; 
} 
​
.card__heading { 
    color: #000; 
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis; 
    font-weight: 900; 
    font-size: 30px; 
    margin-bottom: 6px; 
} 
​
.card__body { 
    color: #5b5b5b; 
    font-size: 24px; 
} 
​
.card__footer { 
    display: flex; 
    margin-top: auto; 
    align-items: flex-end; 
    justify-content: space-between; 
} 
​
button { 
    display: inline-flex; 
    justify-content: center; 
    align-items: center; 
    font-weight: 600; 
    border: none 0; 
    color: #fff; 
    border-radius: 10rem; 
    background-image: linear-gradient(180deg, #f74b4b 0%, #e32828 99%); 
    min-width: 210px; 
    min-height: 62px; 
    padding: 0 20px; 
    font-size: 26px; 
} 
​
.card__price { 
    display: flex; 
    color: #5b5b5b; 
    align-items: flex-end; 
    line-height: 1; 
    font-size: 22px; 
} 
​
.card__price--current { 
    font-weight: 600; 
    color: #ff1300; 
    font-size: 24px; 
} 
​
.card__price--current span { 
    margin-right: -4px; 
} 
​
.card__price--current strong { 
    font-size: 46px; 
} 
​
.card__price--orgion { 
    text-decoration: none; 
    position: relative; 
    margin-left: 8px; 
    bottom: 0.1325em; 
} 
​
.card__price--orgion::after { 
    content: ""; 
    position: absolute; 
    left: 0; 
    right: 0; 
    background-color: currentColor; 
    z-index: 2; 
    top: 50%; 
    transform: translate3d(0, -50%, 0); 
    height: 2px; 
} 
​
.card__badge { 
    position: absolute; 
    z-index: 2; 
    top: 0; 
    left: 0; 
    display: inline-flex; 
    justify-content: center; 
    align-items: center; 
    background-image: linear-gradient(180deg, #f74b4b 0%, #e32828 99%); 
    font-weight: 600; 
    font-size: 24px; 
    border-radius: 36px 0 36px 0; 
    min-width: 146px; 
    min-height: 42px; 
} 
```

你将看到一个使用 `px` 单位实现的固定尺寸的卡片：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab062231aad84995b5d2e801c4849cc1~tplv-k3u1fbpfcp-zoom-1.image)

目前没有任何可缩放而言。大家不要急，我们先把示例中使用到的固定单位 `px` 单独巴拉出来，为后续实现可缩放性做准备：

```
body { 
    padding: 20px; 
} 
​
.tab__content { 
    border-radius: 36px; 
    padding: 22px; 
    width: 702px; 
} 
​
.card { 
    box-shadow: 0 4px 4px 0 #ff5400, inset 0 -2px 0 0 rgba(255, 255, 255, 0.51), inset 0 -7px 6px 3px #ffcca4; 
    border-radius: 38px; 
    padding: 24px; 
} 
​
.card__media { 
    width: 170px; 
    height: 170px; 
    border-radius: 24px; 
    margin-right: 20px; 
} 
​
.card__media img { 
    border-radius: 24px; 
} 
​
.card__heading { 
    font-size: 30px; 
    margin-bottom: 6px; 
} 
​
.card__body { 
    font-size: 24px; 
} 
​
button { 
    min-width: 210px; 
    min-height: 62px; 
    padding: 0 20px; 
    font-size: 26px; 
} 
​
.card__price { 
    font-size: 22px; 
} 
​
.card__price--current { 
    font-size: 24px; 
} 
​
.card__price--current span { 
    margin-right: -4px; 
} 
​
.card__price--current strong { 
    font-size: 46px; 
} 
​
.card__price--orgion { 
    margin-left: 8px; 
} 
​
.card__price--orgion::after { 
    height: 2px; 
} 
​
.card__badge { 
    font-size: 24px; 
    border-radius: 36px 0 36px 0; 
    max-width: 146px; 
    min-height: 42px; 
}
```

将前面定义好的基础变量引入进来，并按像素缩放公式将上面的代码替换成：

```
:root { 
    --ideal-viewport-width: 750; 
    --current-viewport-width: 100vw; 
    --min-viewport-width: 320px; 
    --max-viewport-width: 1440px; 
    --clamped-viewport-width: clamp( 
        var(--min-viewport-width), 
        var(--current-viewport-width), 
        var(--max-viewport-width)); 
} 
​
body { 
    padding: calc( 20 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.tab__content { 
    border-radius: calc( 36 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    padding: calc( 22 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    width: calc( 702 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card { 
    box-shadow: 0 calc(4 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) calc(4 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) 0 #ff5400, inset 0 calc(-2 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) 0 0 rgba(255, 255, 255, 0.51), inset 0 calc(-7 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) calc(6 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) calc(3 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) #ffcca4; 
    border-radius: calc( 38 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    padding: calc( 24 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__media { 
    width: calc( 170 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    height: calc( 170 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    border-radius: calc( 24 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    margin-right: calc( 20 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__media img { 
    border-radius: calc( 24 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__heading { 
    font-size: calc( 30 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    margin-bottom: calc( 6 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__body { 
    font-size: calc( 24 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
button { 
    min-width: calc( 210 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    min-height: calc( 62 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    padding: 0 calc(20 * var(--clamped-viewport-width) / var(--ideal-viewport-width)); 
    font-size: calc( 26 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__price { 
    font-size: calc( 22 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__price--current { 
    font-size: calc( 24 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__price--current span { 
    margin-right: calc( -4 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__price--current strong { 
    font-size: calc( 46 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__price--orgion { 
    margin-left: calc( 8 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
​
.card__price--orgion::after { 
    height: calc(2 * var(--clamped-viewport-width) / var(--ideal-viewport-width)); 
} 
​
.card__badge { 
    font-size: calc( 24 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    border-radius: calc( 36 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ) 0 calc(36 * var(--clamped-viewport-width) / var(--ideal-viewport-width)) 0; 
    max-width: calc( 146 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
    min-height: calc( 42 * var(--clamped-viewport-width) / var(--ideal-viewport-width) ); 
} 
```

效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8faba83e7b54fba91a82d8a4bf5cf00~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxJZGPV>

我们再来验证一下，上面示例在真机上的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78bf0d20d9f34e86a26fd0df7e80b591~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，我们在构建 UI 界面时，特别是构建一个响应式 UI 界面时，我们应该将前面所介绍的内容结合在一起。因为我们知道了，在现代 Web 开发中，使用 `min()`、`max()` 、`calc()` 、`clamp()` 以及 CSS 的相对单位（比如，`rem`、`em`、`%`、`vw`、`vh` 等），尤其是 `clamp()` ，CSS 属性的值随着断点变化来动态响应。

如果不想把事情复杂化，我们可以简单地理解，使用 CSS 的一些现代技术，比如 CSS的自定义属性，CSS 的计算函数，CSS 相对单位等，让 CSS 相关的 UI 属性的值具备动态响应能力：

- 容器大小，`width`、`height`、`inline-size`、`block-size` 等；
- 边框大小，`border-width`；
- 阴影大小，`box-shadow`、`text-shadow` 等；
- 排版属性，`font-size`，`line-height` 等。

我们把这些放在一起，就可以实现一个完美缩放（或者说一致、流畅地缩放）的 UI 界面。

简单地说：**一致、流畅地缩放字体和间距。** 这是我们构建响应式 UI 的终极目标 **。**

## 小结

回过头来想，这种像素缩放技术和 [Bootstap 团队提出的 RFS 技术](https://github.com/twbs/rfs)是非常相似的，只不过 RFS 技术更专注于字号随着视窗大小调整。而我们今天探讨的技术更像是百分百缩放的技术。这种技术最大的亮点就是**像素理想值视为纯数值，并将其乘以当前视窗宽度与设计稿理想宽度比率** 。

它虽然能规避 REM 适配 和 VW 适配方案的一些缺陷，但它也会让代码变得更冗余，也更难以理解和维护。不过，我们可以借助 SCSS 或 PostCSS 这样的 CSS 处理器，让开发者编码变得简易，甚至是无脑还原。只是编译出来代码，一些开发者阅读和理解起来还是有一定难度的。

虽然这种技术方案有一定的缺陷，但它更具扩展性，配合 CSS 媒体查询和容器查询等特性，可能会让未来的布局更具扩展和灵活性，而且也能更好地适配于更多的智能终端。或许说，哪一天它将会是未来的主流适配方案之一。如果大家感兴趣的话，不妨一试。

最后提醒大家一下，在一些设备上它还是有一定兼容性风险的，主要是 CSS 比较函数，以及 CSS 的容器查询，支持的设备到目前为止还是有一定的限制。但我还是想说，这不是阻碍我们向前探索新技术的障碍，另外任何新技术，只有更多的人用起来，才会得到更好的支持。
