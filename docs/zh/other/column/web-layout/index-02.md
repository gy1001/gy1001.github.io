# 02-现代 Web 布局技术术语

Web 发展的每个不同时期都有新的技术为 Web 布局提供支持，但不管是哪个时期，Web 布局相关的概念和术语都是相同的。如果你想彻底或者更好地掌握 Web 布局，那么首先需要对 Web 布局相关的技术术语有所了解。

在这一节中，我们一起来探讨 Web 布局相关的术语。

## Web 坐标轴

坐标轴不只是存在于数学中，它同样存在于 Web 世界中。在 Web 中，我们常称之为 **Web** **坐标轴** 或 **CSS** **坐标系统** 。

在 Web 中，默认原点是给定上下文的左上角，也就是元素盒子的左上角，它分为 `x` 轴（也称为水平轴），向右为正值，向左为负值；`y` 轴（垂直轴），向上为负值，向下为正值：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdeb002f45ad4a188983e435151b3967~tplv-k3u1fbpfcp-zoom-1.image)

> 请注意，这与大多数数学模型不同，其中原点位于*左下角*，正 `y` 坐标值位于原点上方。

事实上，除了大家熟悉的平面画布中的 `x` 和 `y` 轴之外，还有控制第三维度的 `z` 轴。比如使用 CSS 的 `transform` 绘制 3D 图形或使用第三维度从前往后对对象进行分层：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1de13af895c64954acec35c282505e8f~tplv-k3u1fbpfcp-zoom-1.image)

也会在定位元素（显式使用`position` 属性值为非 `static` 的元素）上使用 `z-index` 控制其层叠的顺序（`z` 轴上的层叠顺序），它表示的是用户与屏幕的这条看不见的垂直线：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25f58e85cf3545a69a4b7e0da0b3dde1~tplv-k3u1fbpfcp-zoom-1.image)

上面我们看到的 CSS 坐标系，只是最初的坐标系的定义。随着 CSS 的逻辑属性出现，CSS 的坐标系也随之改变。它分为 **内联轴** （Inline Axis）和 **块轴** （Block Axis）。

众所周知，在 CSS 中，每个元素都是一个盒子，默认情况之下，盒子会根据元素类型分为块盒子（比如块元素 `div` ）和 内联盒子（比如`span`）。其中块盒会在垂直方向从上往下堆叠，内联盒子将会按照书写方式从左往右排列：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52c710846e504b5390bda406de0149b9~tplv-k3u1fbpfcp-zoom-1.image)

当我们的书写方式改变时，块盒子和内联盒子也会有相应的变化，就拿内联盒子为例，书写模式改变之后，它的方向也会随之改变：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fa96422579f4ebba966a04a3046c860~tplv-k3u1fbpfcp-zoom-1.image)

简而言之，**块元素遵循流方向，内联元素遵循写入方向**：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d46de45a34cb4982a4512afd9e8de5c8~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，随着 CSS 的逻辑属性的出现，CSS 的坐标系就不再以 `x` 轴 和 `y` 轴来定义，而是以 **内联** （Inline）和 **块** （Block）来区分，并且内联方向的称之为 **内联轴** （Inline Axis），也就是书写模式的方向；块方向的称之为 **块轴** （Block Axis），也就是块盒子自然流的方向。它们随着 CSS 的书写模式改变，如下图所示：

![fig-02-07.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29035d923f5341289fb3c0527dca42d4~tplv-k3u1fbpfcp-watermark.image?)

如此一来，在 CSS 中就有**物理坐标系** 和 **逻辑坐标系** 之分，它们的对应关系如下：

| **物理属性**   | **逻辑属性(`horizontal-tb`)** | **逻辑属性(`vertical-lr`)** | **逻辑属性(`vertical-rl`)** |
| ---------- | --------------------------------------- | ------------------------------------ | ------------------------------------ |
| `x` 轴（水平轴） | Inline 轴（内联轴）                           | Block 轴（块轴）                          | Block 轴（块轴）                          |
| `y` 轴（垂直轴） | Block 轴（块轴）                             | Inline 轴（内联轴）                        | Inline 轴（内联轴）                        |

> **注意** ，不管是在物理坐标系还是逻辑坐标系中，`z` 轴是不变的！

## 容器和容器空间

容器这个概念很简单。熟悉 CSS 的同学都知道，HTML 的每一个元素在 CSS 中都是一个盒子，这个盒子又被称为 **容器** 。只不过，这个容器会随着盒子的类型不同，容器的称呼也会有不同。它主要由 CSS 的 `display` 属性的值来决定，比如：

- `block` 时称为块容器；

<!---->

- `inline` 时称为内联容器；

<!---->

- `flex` 或 `inline-flex` 时称为Flexbox容器；

<!---->

- `grid` 或 `inline-grid` 时称为 Grid 容器（网格容器）。

每个容器就像生活中的器皿一样，不管是什么类型的容器，它都有空间。只不过这个空间的大小是由 CSS 盒模型相关的属性来决定的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac2e7f9fb85644bba2eb64740984ea60~tplv-k3u1fbpfcp-zoom-1.image)

只不过，Web 开发者习惯性以 `width` 、`height` 、 `min-*` 或 `max-*` 以及它们对应的逻辑属性来显式指定一个容器空间的大小：

![fig-02-09.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f03b42bd971488db2132556d5b7102b~tplv-k3u1fbpfcp-watermark.image?)

而且容器大小计算方式也会受 CSS 的 `box-sizing` 属性的值影响：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4c37c1f5cce489a81ce5e56521dc128~tplv-k3u1fbpfcp-zoom-1.image)

每个容器中都有可能会放置内容（文本内容或其他元素），随着容器中放置的内容多少，可能会造成指定大小的容器无法容纳嵌套的内容，造成内容溢出（超出指定容器的大小）；也有可能放置的内容较少，无法填充满整个容器。

按此呈现模式，每个容器的大小（空间）又有**可用空间** （也称为 **剩余空间** ）和 **不可用空间** （也称为 **不足空间** ）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9be439c2389c4c03afdb1b6d26e8a249~tplv-k3u1fbpfcp-zoom-1.image)

## 间距

Web 是由很多个元素堆叠而成的，为了让 Web 页面给用户提供更好的体验，Web 设计师在设计时，会根据美学相关的理论来设计元素与元素之间，元素内容与元素盒子边缘之间的间距：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f0042bf96b940c3a29b1adb7c6210d2~tplv-k3u1fbpfcp-zoom-1.image)

只不过，在 Web 布局中，我们常常是使用 CSS 的 `margin` 、`padding` 和 `gap` 三个属性来设置间距。不同的是：

- 框与框（也就是元素与元素）之间的间距一般采用 `margin` 或 `gap` 属性来设置，也常称为 **外距** ；

<!---->

- 内容与框的边缘（元素内容与元素框边缘）之间的间距一般采用 `padding` 来设置，也常称为 **内距**。

如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6d6adba3fbb47aaaf154bebf4e3f770~tplv-k3u1fbpfcp-zoom-1.image)

特别要提出来的是，CSS 中的 `margin` 和 `gap` 表现形式是有较大差异的，它们之间的差异用下图来阐述：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ffbb85f59be433d921d03a031188398~tplv-k3u1fbpfcp-zoom-1.image)

## 书写模式

世界上有很多种语言（简称[世界语言](https://zh.wikipedia.org/wiki/%E4%B8%96%E7%95%8C%E8%AA%9E%E8%A8%80)），比如汉语、英语、印度斯坦语、西班牙语、阿拉伯语、俄语、葡萄牙语、德语和法语等。在互联中也有一些常用语言，比如英语、汉语、西班牙语、葡萄牙语、印尼语（马来语）、法语、日语、俄语和德语等。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb0c5f7661b94655a798afc7b22169c2~tplv-k3u1fbpfcp-zoom-1.image)

不同的语系，它们的书写模式（阅读模式）是有差异的：

- **拉丁语体系** 是从左往右，比如英语、西班牙语、德语、法语等；

<!---->

- **阿拉伯语体系** 是从右往左，比如阿拉伯语、希伯来语等；

<!---->

- **汉语体系** 有两种方式，有可能是从左往右，也有从上向往下，比如中文、日文、韩文等。

正因为语言的书写方式不同，在 Web 中呈现不同语系时，CSS 中的块（Block）和 内联（Inline）表现的方式也会不同。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7aa755e28f84cc795fd21245db2609d~tplv-k3u1fbpfcp-zoom-1.image)

在 Web 布局中，尤其是针对多语言的 Web 布局，我们可以通过 HTML 元素的 `dir` 属性或 CSS 的 `direction` 属性来控制书写模式，比如 `ltr` （Left-To-Right，也就是从左往右的书写方式），`rtl` （Right-To-Left，也就是从右往左的书写方式）。除此之外，还可以使用 CSS 的 `writing-mode` 属性来控制：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe03b3367a9d4aba91f4c1e49b8415d9~tplv-k3u1fbpfcp-zoom-1.image)

正因为语系不同书写模式不同，也将造成 CSS 中布局相关属性最终呈现给用户的效果有所差异，比如 Flexbox 中的 `flex-direction` 属性，CSS Box Alignment 模块中的属性以及 Grid 布局等。

## 逻辑属性

我们构建的 Web 页面不仅是局限于单语种中，你负责的业务有可能是国际业务。这样一来，你构建的 Web 页面是一个多语种的 Web 页面，那么你的布局会因为语种不同有所差异。比如 Facebook 的登录页面：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2a1d5e7540249699d91e3f19fe73b0f~tplv-k3u1fbpfcp-zoom-1.image)

> 上图中左侧是汉语体系的布局效果，右侧是阿拉伯语体系的布局效果。

众所周知，CSS 中有很多属性和值是遵循 **TRBL** (Top、Right、Bottom 和 Left ) 模式的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f128a6f27e746548793726ac7c0f1be~tplv-k3u1fbpfcp-zoom-1.image)

比如，我们熟悉的元素位置会映射到 `top` 、`right`、`bottom` 和 `left`，除此之外，像 `border` 、 `margin` 、`padding` 和 `border-radius`等属性的子属性也会映射到 TRBL 上，如 `margin-top` 、`margin-right` 、`margin-bottom` 和 `margin-left` 。它们带有明确的方向性。只不过，针对多语言布局时，它给布局带来很大的局限性，比如下面这个简单地示例：

```
.thumb {
    margin-right: 1rem;
}
```

在`ltr` 模式（比如英文）和 `rtl` 模式（比如阿拉伯文），效果将会是像下图一样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd102861221c42cca2f900a2aad60c34~tplv-k3u1fbpfcp-zoom-1.image)

这个效果并不是我们所期待的，如果希望达到预期的效果，在以往编码的时候，需要做额外的处理：

```
.thumb {
    margin-right: 1rem;
}
​
[dir="rtl"] .thumb {
    margin-left: 1rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea763a01c628466f8cdf938c72117d0b~tplv-k3u1fbpfcp-zoom-1.image)

为了解决类似上图这样的问题，2017 年 5 月 18 日，W3C 的 CSS 工作组（CSS Working Group） 发布了 [CSS逻辑属性和值](https://www.w3.org/TR/css-logical-1/#intro)（CSS Logical Properties and Values Level 1） 的首份工作草案（First Public Working Draft）。

在这个模块中并没有方向性的概念，只有开始（`start` ）、结束（`end`）、块（`block`）和 内联（`inline` ）的概念。这样一来，在从左到右的（`ltr`）中，`start` 对应的是 `left` ，但在从右到左（`rtl`）中，`start` 对应的是 `right` 。也就是说，逻辑属性更易于适应不同的书写模式。

当然，逻辑属性出现之后，很多 CSS 属性和属性值也随之有了变化，在原有的物理属性的基础上映射了一份逻辑属性。尤其是 CSS 的盒模型相关的属性（比如 `width`、`height` 、`min-*` 、`max-*` 、`border` 、`margin` 、`padding`）、定位位移相关的属性（比如 `top` 、`right` 、`bottom` 和 `left`）、排版方面的（比如`float` 属性的值 `left` 和 `right`）以及圆角 `border-radius` 等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/561d5783ec354850ae689d61e86ab6fb~tplv-k3u1fbpfcp-zoom-1.image)

而且映射关系与 CSS 的 `writing-mode` 属性值也有关系，对应关系如下图所示：

![fig-02-23.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e171d25a3145466bb16a812e4af3bd2c~tplv-k3u1fbpfcp-watermark.image?)

有了逻辑属性之后，构建多语言 Web 的布局就要方便得多：

```
.thumb {
    margin-inline-end: 1rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee89006d8eb946a2b9bf5cc24c88752b~tplv-k3u1fbpfcp-zoom-1.image)

## 对齐方式

这里所说的对齐方式指的是 [CSS Box Alignment 模块](https://www.w3.org/TR/css-align-3/)，该模块的出现可以说改善了 CSS 中非常有限的对齐能力。在以往，我们控制对齐方式主要是依赖于 CSS 的 `text-align` （水平方向文本对齐）和 `vertical-align` （垂直方向文本对齐）两个属性，对于块的对齐方式主要依赖于 `float` 属性。它们是无法满足 Web 布局中的对齐控制。

庆幸的是，随着 CSS Flexbox 特性出现之后，CSS 新增了像 `justify-content` 、`align-content` 、`align-items` 、`justify-items` 和 `justify-self` 以及 `align-self` 等属性，用来控制 Web 布局上的对齐方式。最初这些属性是在 Flexbox 相关规范中定义的，但随着 CSS Grid 布局出现之后，W3C 的 CSS 工作组将这些属性单独划分到一个模块中，即 CSS Box Alignment 模块。

正如 [@Pratham](https://twitter.com/Prathkum) 发的 [Twitter 信息上所说](https://twitter.com/prathkum/status/1388118908326928392?lang=gl)：

> CSS Box Alignment 模块是 Web 布局不可或缺的部分，而且其中有很多概念是极易于混淆的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d194cbe7fc845f8be3a6671cfa7fad5~tplv-k3u1fbpfcp-zoom-1.image)

CSS Box Alignment 模块中，取不同的值时，能得到不同的对齐结果，比如靠左（开始）、靠右（结束）、中间对齐、两端对齐等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a964cea745874ab18339f42497116af9~tplv-k3u1fbpfcp-zoom-1.image)

> 注意，上图由 [@Pratham](https://twitter.com/Prathkum) 绘制！

需要注意的是， CSS Box Alignment 模块中的属性同时可以运用于 CSS Flexbox 和 CSS Grid 布局中，在运用于 CSS Flexbox 和 CSS Grid 布局中时略有差异，具体我们会在后面介绍 Flexbox 和 Grid 布局中会提到，在这里不详细阐述，大家只要知道，在现代 Web 布局技术中，对齐方式新增了该模块！

## 小结

在这篇文章中，我们主要和大家一起探讨了 Web 布局相关的概念和术语。从我们最为熟悉的坐标系统开始，到我们熟悉的容器以及容器空间，再到新增的书写模式、逻辑属性以及对齐方式等。我们花一个节课来介绍这方面，主要是为了和大家把布局相关的概念统一起来，为后续布局打下基础。

有了这些基础和认识之后，就可以开启现代布局中的 Flexbox 布局了 ！Let's Go! (^_^)
