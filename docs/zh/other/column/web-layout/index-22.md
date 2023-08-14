# 22-Web 中的向左向右：Flexbox 和 Grid 布局中的 LTR 与 RTL

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fe85803de6642a5b6a04f00b0993c1f~tplv-k3u1fbpfcp-zoom-1.image)

几米的绘本《向左走，向右走》自1999年出版，就一直是爱情的代名词。在 Web 的世界中有着同样的故事，即 Web 的向左向右，指的就是 Web 的排版方式（比如，左浮动、右浮动）、对齐方式（比如左对齐、右对齐）、书写模式（比如从左向右、从右向左）等。而 Web 中的向左向右和书写模式、阅读方式有着紧密的关系，它将直接影响着 Web 布局的最终呈现。

从这节课开始，我将花两节课的篇幅和大家一起来探讨与这方面有关的一些 CSS 技术，使构建一个多语言 Web 网站或应用的过程变得更容易。更希望下次你需要做同样的事情时，能借鉴课程中的一些技术来实现你的项目。

## 简介

世界上有很多种语言（简称[世界语言](https://zh.wikipedia.org/wiki/%E4%B8%96%E7%95%8C%E8%AA%9E%E8%A8%80)），比如汉语、英语、印度斯坦语、西班牙语、阿拉伯语、俄语、葡萄牙语、德语和法语等。在互联中也有一些常用语言，比如英语、汉语、西班牙语、葡萄牙语、印尼语（马来语）、法语、日语、俄语和德语等。 如果你的团队有一些国际业务，这种现象对于你来说一定不会感到陌生。

其实，你在访问互联网的 Web 页面，或者使用 Web App 时，很多 Web 网站或 Web 应用都提供了多语言设置。在 Web 中，不同的语言在电子屏幕上有着不同的呈现方式，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44e446f56a2a4b5384e73ab0407d2e26~tplv-k3u1fbpfcp-zoom-1.image)

上图截取于“[联合国教科文组织](https://zh.unesco.org/)”官网，上图所列的语言也是[联合国常用语言种类](https://en.wikipedia.org/wiki/Official_languages_of_the_United_Nations)。

从上图可以看出，在互联网上有些语言是从左到右排列（查看），比如中文、英语、法语等，也有一些语言是从右到左排列（查看），比如阿拉伯语、波斯语、乌尔都语，维吾尔语，哈萨克语等（这些都是阿位伯语系）。

阿拉伯语系是互联网语言的第七大最常用的语言，全世界大约有超过 2.92 亿人将阿拉伯语作为第一语言。阿拉伯语网站或应用的数量每天都在不断增加。然而，奇怪的是，阿拉伯语系（大部分是在中东市场）要求的设计不仅要符合他们的需求和用户的舒适度，而且还要符合他们的语言标准，这使得开发者在开发相关应用的过程变得更为复杂。考虑到阿拉伯系都是从右到左书写和阅读的，开发人员在开发的时候常常会面临一系列问题。

> 注意：阿拉伯语不是唯一从右向左书写的语言。波斯语和希伯来语也是以同样的方式书写的。

虽然这看起来没什么大不了的，但是从右到左（`RTL`）语言的开发需要注意很多相关的细节，而且这方面的资源也不多。对于开发者而言，仅从右向左（`RTL`）或从左向右（`LTR`）单方面而言，事情会相对更简单，但是如果两种方式混合在一起，事情就会变得较为复杂。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/312fadea1a5e4073a767f388e7a66f21~tplv-k3u1fbpfcp-zoom-1.image)

简单地说呢，就是按照书写模式来呈现不同的效果。就目前来看，主要的方式就是从左向右（`LTR`）或从右向左（`RTL`），在某些场景下也有垂直方向的书写模式，比如从上往下（古代的汉文就是这样的书写模式）。对于开发者而言，从左向右（`LTR`）并不是件难事，因为我们平时做的，处理方式都是这种。但我们不能仅局限于以往，很有可能你面对的用户群体是阿拉伯语系，那你就要改变以往的处理方式。

面对不同语言场景，你可能会先想到，“界面必须翻转”。看上去很诡异，但这也是 `LTR` 转换成 `RTL`要做的第一件事情。比如 Facebook 官网的首页：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43654b83eef84c239e5caac0e48dbfd5~tplv-k3u1fbpfcp-zoom-1.image)

如果你查看过其源码的话，你会发现在 `<body>` 元素上设置了 `dir` 属性，同时在 CSS 中设置了`direction` 属性：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d0273d8cf194385bcabb69adcf0d52a~tplv-k3u1fbpfcp-zoom-1.image)

从技术角度上来说，Web 开发者需要做两件事，在 HTML 标记中，会使用 `lang` 属性指定使用的语言，`dir` 指定阅读模式，一般和语言相匹配。

```html
<!-- 阿拉伯语 -->
<html lang="ar">
    <body dir="rtl"></body>
</html>
​
<!-- 简体中文 -->
<html lang="zh-Hans">
    <body dir="ltr"></body>
</html>
```

客户端默认会根据 `lang` 和 `dir` 的设置，提供最初始的样式设置：

```
/* 阿拉伯语 */
html[Attributes Style] {
    -webkit-locale: "ar";
}
​
body[Attributes Style] {
    direction: rtl;
    unicode-bidi: isolate;
}
​
/* 简体中文 */
html[Attributes Style] {
    -webkit-locale: "zh-Hans";
}
​
body[Attributes Style] {
    direction: ltr;
    unicode-bidi: isolate;
}
```

Web 开发者也会使用 `direction` 重置客户端的初始化样式：

```
/* 阿拉伯语 */
body {
    direction: rtl;
    unicode-bidi: embed;
}
​
/* 简体中文 */
body {
    direction: ltr;
    unicode-bidi: embed;
}
```

正如上图中示例所示，改变语言和内容是最容易的部分，但当你这样做的时候，有时你要改变的语言有一个不同的方向。例如上图示例中的“简体中文”的文本内容（以及布局）从左到右流动，而阿拉伯语中的文本内容（以及布局）从右到左。

根据语言不同，对于 Web 开发者而言“改变内容容易，适配布局就不易”。如上面代码所示， HTML 的 `dir` 和 CSS 的 `direction` 除了可以控制文档流的方向，还会对 CSS 的部分属性产生影响。我想你可能想知道会对哪些属性有影响，有着什么影响对吧。要是感兴趣，请继续往下阅读！

## 和方向有关的 CSS 功能模块

在 CSS 中，可以控制排版方向的特性有很多，比如我们熟悉的：

- **文本对齐** ：CSS Text Module [Level 3](https://www.w3.org/TR/css-text-3/#text-align-property) 或 [Level 4](https://www.w3.org/TR/css-text-4/#text-align-property) 中的 `text-align`，用来设置文本的对齐方式；
- **浮动** ：[CSS Page Floats](https://www.w3.org/TR/css-page-floats-3/#float-property) 中的 `float` 属性，用来改变流的水平方向；
- **定位** ：[CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/#box-offsets-trbl) 的 `position` 以及 `left` 、`right` 也可以改变水平流的方向；
- **Flexbox 布局** ：[CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/) 中的 `flex-direction`；
- **Grid布局** ：[CSS Grid Layout Module Level 1](https://www.w3.org/TR/css-grid-1/) 中的 `grid-auto-flow`；
- **CSS 框对齐方式** ：[CSS Box Alignment Module Level 3](https://www.w3.org/TR/css-align-3/) ；
- **书写模式** ：[CSS Writing Modes Level 3](https://www.w3.org/TR/css-writing-modes-3/)。

我们来看一个示例：

```
<div class="media">
    <figure class="media__object">
        <img src="" alt="" />
    </figure>
    <div class="media__content">
        <h3 class="media__title">Card Title</h3>
        <p class="media__describe">Card Describe</p>
    </div>
</div>
```

我们分别使用浮动、Flexbox 和 Grid 三种布局模式来构建布局，并且通过 CSS 的 `direction` 显式改变书写模式或阅读模式。相比较而言，CSS Flexbox 和 CSS Grid 布局要比 CSS Float 容易得多，只需要在 `.media` 容器上显式设置 `display` 值为 `flex` 或 `grid` ，当然，CSS Grid 布局要指定列网格轨道尺寸之类，具体代码如下：

```
/* CSS Flexbox Layout */
.flex .media {
    display: flex;
    gap: 1rem;
}
​
.flex .media__content {
    flex: 1 1 0%;
    min-width: 0
}
​
/* CSS Grid Layout */
.grid .media {
    display: grid;
    gap: 1rem;
    grid-template-columns: fit-content(120px) minmax(0, 1fr);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b5c49d4bfc445d9906e5b7979a9c1b7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxzmbgw>

CSS Flexbox 和 CSS Grid 布局，不管是 `ltr` 还是 `trl` ，都不需要针对不同的书写模式或阅读模式添加额外的 CSS 规则。但对于像 CSS Float 布局，要实现类似 CSS Flexbox 或 Grid 的布局，就需要针对不同的书写模式或阅读模式设置不同的 CSS 样式规则：

```
.float .media {
    display: flow-root; /* 清除浮动 */
}
​
.float .media__object {
    float: left;
    margin-right: 1rem;
}
​
.float [dir="rtl"] .media__object {
    float: right;
    margin-left: 1rem;
    margin-right: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f6e4d1300024052a1535bf143937a47~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxzmbgw>

如果仅从效果上来看，这样的方案的确是解决了`dir` 或 `direction` 带来的差异性，但这同时也为开发者增加了不少的工作量，代码也变得更难维护。事实上呢？在 Web 中的 `RTL` 还有很多事情需要做，甚至是很多技术细节，只有掌握这些，才能在 `RTL` 这样的场景中游刃有余。

## 多语言布局核心概念

多语言 Web 布局，需要了解和掌握的核心概念主要有：

- RTL；
- CSS 逻辑特性；
- CSS 书写模式。

我们先从 RTL 开始！

### RTL 简介

RTL 是 “Right To Left” 首字母的缩写，简单地说就是从右到左，在 Web 中主要是指布局和浏览方式。来看一个 RTL 的 Web 示例图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd7f2172a6ef45f18dffac117ca97fdb~tplv-k3u1fbpfcp-zoom-1.image)

国内大多数 Web 开发者面对的 Web 排版方式（或者说书写方式）大多是 LTR（即“Left To Right”）。如果你使用浏览器开发者工具审查代码，你会发现客户端下的 `<html>` 元素的 `dir` 或它对应的 `direction` 属性的默认值会是 `ltr` 。

注意，HTML 标签元素的 `dir` 和 CSS 的 `direction` 属性的值主要有 `ltr` 和 `rtl` ，它们分别对应两种书写模式或阅读模式：

- **LTR** 书写模式或阅读模式下，HTML 的 `dir` 和 CSS 的 `driection` 属性对应的值是 `ltr` ，表示从左往右书写（或阅读）；
- **RTL** 书写模式或阅读模式下，HTML 的 `dir` 和 CSS 的 `direction` 属性对应的值是 `rtl` ，表示从右往左书写（或阅读）。

两者在 Web 布局中对应的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cf6994c962748d3992131327f113adf~tplv-k3u1fbpfcp-zoom-1.image)

正如你所看到的，对于 RTL，文本是从右向左读取的，这正好与 LTR 相反。幸运的是，客户端（比如浏览器）对这方面有较好的支持。如果我们希望切换文档语言的排列方向，最简单的方式就是在文档根元素（即 `<html>`）显式地设置 `dir` 属性：

```
<html dir="rtl">
    <!-- HTML 中其他元素 -->
</html> 
```

当 `dir` 属性的值被更改时，Web 中的元素会自动切换（但有一个前提，这些元素没有设置其他的属性，比如 `float`、`text-align`等）。不过需要特别提出的是，`dir` 属性值要是为 `auto` 时，它根据解析的内容自动切换方向。就这一点而言，[HTML规范也有相关的描述](https://www.w3.org/TR/2011/WD-html5-author-20110809/global-attributes.html)：

> **当文本的排列方向确实未知时，建议开发者仅将此值（****`dir="auto"`****）作为最后的手段，并且不能应用于服务端** 。

另外，除了在 `<html>` 根元素上之外的任何元素上，我们都可以显式设置 `dir` 属性。当元素显式设置了 `dir` 属性值时，客户端会根据 `dir` 属性做出相应的客户端样式解析。比如：

```
<p dir="ltr">我是一个段落</p> 
```

客户端对应的样式：

```
p[Attributes Style] { 
    direction: ltr; 
    unicode-bidi: isolate; 
}     
```

如果显式在元素上设置 `dir` 的值为 `rtl` ：

```
<p dir="rtl">أهلا وسهلا بك في المقال!</p> 
```

客户端对应的样式则会变成：

```
 p[Attributes Style] { 
     direction: rtl; 
     unicode-bidi: isolate; 
}
```

上面我们看到的是 HTML 元素上 `dir` 属性取值不同带来的差异。除此之外，在 CSS 中可以通过`direction` 属性来做相应的调整。如果你去查看Facebook的中文版本和阿拉伯语版本，就会发现它们之间的差异。

先来看中文版本，通过浏览器开发者工具，你会看到像下图这样的结果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad0ae376b5ac416c8c179b11509f51c7~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，显式地在 `body` 中设置了 `direction: ltr`（正好和 `<body>` 中 `dir` 的 `ltr` 相匹配）。对于 `unicode-bidi` 属性，这里暂且忽略，就当这个属性未显式地在样式中设置。接着继续看另外一种场景（切换到阿拉伯版本的 Facebook），你会发现在阿拉伯语版本的时候，`<body>` 中的 `dir` 属性的值变成了 `rtl`，同时浏览器默认的 `direction` 和 CSS 中显式地在 `body` 中设置的`direction` 都有所调整：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b461e92d3c6241588427e1744e87a8b7~tplv-k3u1fbpfcp-zoom-1.image)

从最佳实践来看，更建议在 `<html>` 根元素上定义 `dir` 属性的值，以确保在没有显式设置 CSS 的 `direction` 样式的情况下也能较好实现双向布局。

也就是说，你在构建一个多语言的 Web 网站或 Web 应用时，首先要做的是在 `<html>` 标签元素上显式设置 `dir` 属性，最好也显式设置 `lang` 属性，因为 `lang` 设置的语言的默认书写方式和阅读方式和 `dir` 属性的值是相匹配的。比如：

```
<!-- 简体中文 -->
<html lang="zh-Hans" dir="ltr"></html>

<!-- 阿拉伯语 -->
<html lang="ar" dir="rtl"></html>

<!-- 英文 -->
<html lang="en" dir="ltr"></html>
```

### LTR 和 RTL 设计上的差异

如果你以前开发主要针对的是 LTR 模式，现在突然要过渡到 RTL 模式。给你最直观的差异就是 **UI 设计上的变化** ，简单地说，**RTL 相对于 LTR 就是一个水平翻转的设计** 。正如前面向大家展示的 Facebook 中文版（LTR）和阿拉伯语版本（RTL）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06c149cf100a49ca95e7bdb0782cecf9~tplv-k3u1fbpfcp-zoom-1.image)

为了更好地展示 LTR 和 RTL 在翻转设计上的差异，我们把事情缩小一些，就拿最典型的一个模块来举例，即媒体对象（Media Object）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bdef22949ca445d9b3d265fb9c23927~tplv-k3u1fbpfcp-zoom-1.image)

针对于这样的一个模块，HTML 结构可能像下面这样：

```
<!-- LTR -->
<div class="media" dir="ltr">
    <figure class="media__object">
        <img src="media-object.jpg" alt="Meida object" />
    </figure>
    <div class="media__content">
        <h3 class="media__title">Card Title</h3>
        <p class="media__describe">Card Describe</p>
    </div>
</div>

<!-- RTL -->
<div class="media" dir="rtr">
    <figure class="media__object">
        <img src="media-object.jpg" alt="وسائط الإعلام الكائن" />
    </figure>
    <div class="media__content">
        <h3 class="media__title">بطاقة العنوان</h3>
        <p class="media__describe">(وصف</p>
    </div>
</div>
```

> 注意，整站是同一种书写模式或阅读模式，`dir` 最好设置在 `<html>` 或 `<body>` 元素上。

两者最大的差别，就是 `<div class="media">` 容器中 `dir` 的值分别是 `ltr` （LTR）和 `rtl` （RTL）。

添加一些非布局的样式，你将看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/716431447a104dc19a72a00e81efd34f~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，浏览器可以根据 HTML 的 `dir` 属性值来识别文本书写方式，因为它是在 Unicode 字符集中分配的。但对于 Web 布局，还是需要额外通过 CSS 代码来实现。

你可以使用 CSS Flexbox 或 CSS Grid 来构建，这里使用 CSS Flexbox ：

```
.media {
    display: flex;
    gap: 1rem;
}

.media__content {
    flex: 1 1 0%;
    min-width: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6127ec895434157a7ae5450280da5f6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/wvXRaZK>

这就是 CSS Flexbox （或 CSS Grid）构建 LTR 和 RTL 布局的优势之一，具体原因，稍后会介绍。如果换成其他的布局方式，你要做的事情就会更多一些，比如 CSS 浮动布局。如果你只对 `figure` 做一个左浮动：

```
.media__object {
    float: left; 
    margin-right: 1rem;
}
```

你将看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8b5e3b8bf9b40c99291bdc78f546289~tplv-k3u1fbpfcp-zoom-1.image)

为了达到让阿拉伯语（LRT）布局也能达到预期效果，在还没有 CSS 逻辑属性之前，你需要在 `[dir="rtl"]` 下调整浮动的方向：

```
.media__object {
    float:left;
    margin-right: 1rem;
}

[dir="rtl"] .media__object {
    float: right;
    margin-left: 1rem;
    margin-right: 0;
}
```

当然，如果使用逻辑属性来替代上面的物理属性，也会变得容易一些：

```
.media__object {
    float: inline-start;
    margin-inline-end: 1rem;
}

/* 降级处理 */
@supports not (float: inline-start) {
    .media__object {
        float: left;
        margin-right: 1rem;
    }

    [dir="rtl"] .media__object {
        float: right;
        margin-left: 1rem;
        margin-right: 0;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1e13e9d1084456ca241982d8eded2f7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/jOKXbEB>

你可能发现了，使用浮动布局，主要因为我们使用的都是物理属性，如果将物理属性更换成逻辑属性，事情也会变得容易得多。当然，要是你从未接触过 CSS 逻辑属性，你现在并不知道 CSS 逻辑属性是什么，这也不要紧，稍后我们会详细介绍 CSS 逻辑属性在多语言布局中的作用和对应的优势！

### LTR 和 RTL 混合，让阅读变得更困难

就 LTR 或者 RTL 单方面而言，都不是太难的事情，但是要将两者混合使用，比如中文（或英文）与阿拉伯语系混合在一起排版，而且布局是 LTR，将会发生什么呢？它们混合在一起的排版效果可能看起来像下图这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09b5415973de4454bfd7d605c36f4ae7~tplv-k3u1fbpfcp-zoom-1.image)

就上图而言（默认是 LTR），对于一位阿拉伯语的用户来说，阅读起来是痛苦的，因为排版很混乱。它的读取顺序如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbcf59f6b38046f0bde513ae3d39ce70~tplv-k3u1fbpfcp-zoom-1.image)

为了避免这个现象，我们应该尽可能设置适当的语言方向。

```
<!-- 中文和阿拉伯文混合 Left To Right -->
<div class="media" dir="ltr">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/182774/blueberry-cheesecake.jpg" alt="蓝莓芝士蛋糕" class="media__object" />
    <div class="media__body">
        <h3 class="media__heading">بالتوت البري 蓝莓芝士蛋糕كيفية عمل  كيفية عمل</h3>
        <p>هنا سيكون شرح معين عن هذه الوصفة. Where the recipe is described. كيفية عمل بالتوت البري。</p>
    </div>
</div>

<!-- 中文和阿拉伯文混合 Right To Left -->
<div class="media" dir="rtl">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/182774/blueberry-cheesecake.jpg" alt="蓝莓芝士蛋糕" class="media__object" />
    <div class="media__body">
        <h3 class="media__heading">بالتوت البري 蓝莓芝士蛋糕كيفية عمل  كيفية عمل</h3>
        <p>هنا سيكون شرح معين عن هذه الوصفة. Where the recipe is described. كيفية عمل بالتوت البري。</p>
     </div>
</div>
```

比如我们显式地在元素上设置 `dir="rtl"`，结果就会更符合预期的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a33cc29354e4191b01c36920dda747c~tplv-k3u1fbpfcp-zoom-1.image)

对于混合排版的场景，我们还可以显式地给 `dir` 设置属性值为 `auto`。这样可以由用户代理（比如浏览器）来决定方向。它在解析元素中字符时会运用一个基本算法，直到发现一个具有强方向性的字符，然后将这一方向应用于整个元素。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a651a72eec648c4ba3c7e942cff54f5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/jOKXpQa>

### CSS 书写模式

在 Web 开发中，你除了在 HTML 中使用 `dir` 属性之外，还可以在 CSS 中设置 `direction` 属性，它们有着相似的特性：

- 取值为 `ltr` 可以实现从左到右排版（Left-To-Right）；
- 取值为 `rtl` 可以实现从右到左排版（Right-To-Left）。

除此之外，你还可以在 CSS 中使用 `writing-mode` 属性来定义内容在屏幕上的排版方式，而且它具备的能力要比 `dir` 或 `direction` 更强：

- **`horizontal-tb`** ：定义了内容从左到右水平流动（内联流），从上到下垂直流动（块流）。下一条水平线位于上一条线下方；
- **`vertical-rl`** ：定义了内容从上到下垂直流动（内联流），从右到左水平流动（块流）。下一条垂直线位于上一行的左侧；
- **`vertical-lr`** ：定义了内容从上到下垂直流动（内联流），从左到右水平流动 （块流）。下一条垂直线位于上一行的右侧；
- **`sideways-rl`** ：定义了内容从上到下垂直流动，所有字形，甚至是垂直脚本中的字形，都设置在右侧；
- **`sideways-lr`** ：内容从上到下垂直流动，所有字形，甚至是垂直脚本中的字形，都设置在左侧。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88fed7100532488b9e1449c253f34cdf~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/poKqOoK>

这里所说的块流和文本流，主要指的是 HTML 块元素的流动方向和文本内容的流动方向，其中文本流也常称“内联方向”：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fb3d1483ced4e9f91eb143d228199b5~tplv-k3u1fbpfcp-zoom-1.image)

在 Web 中除了文档有流方向一说之外，对于文本同样有流的概念，比如说英文，一般是从左到右，阿拉伯文是从右到左，而日文（古代的中文）从上到下，从右到左：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a05873bc3dd4409ba36cee911eb3e338~tplv-k3u1fbpfcp-zoom-1.image)

不管是文档流还是文本流，它们都具有相应的物理特性，比如从左到右，从右到左，从上到下，从下到上。即，它们都没有离开 `top`、`right`、`bottom` 和 `left` 方向。 如此一来，一旦流被书写模式改变了，那么一些物理方向就会造成混乱了，比如 LTR 换成 RTL，`left` 就不再是 `left` 了。

```
.card__heading { 
    border-radius: 6px 6px 0 0; 
} 

[data-lang="Japanese"] .card__heading{ 
    border-radius: 0 6px 6px 0; 
} 

[data-lang="Mongolian"] .card__heading{ 
    border-radius: 6px 0 0 6px 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2ae56cb1f094ce9aa2fdc00702d637c~tplv-k3u1fbpfcp-zoom-1.image)

甚至有的时候宽度不是宽度，比如 `horizontal-tb` 切换到 `vertical-rl` 模式时，宽度就变成了高度。

因此，原本这些描述 CSS 特性的物理属性，尤其是和方向有关的，都会随着书写模式 `writing-mode` 有所变动。简单地说，**在构建多语言 Web 布局时，在 CSS 中要使用流相对值来替代相应的物理值** 。

首先我们要使用块（Block）和内联（inline）两个维度来替代大家熟悉的 `x` 轴（水平）和 `y` 轴（垂直）。

- 内联维度是在使用的书写模式中运行的文本行（文本流）所在的维度。即，对应于文本流（阅读方式）的轴线。例如，英文是从左到右的文本流（或阿拉伯文从右到左），因此内联轴是水平的；对于日文，它的阅读方式是自上而下，因此内联轴是垂直的。
- 块维度是另一个维度，以及块（如段落）相继显示的方向。在英语和阿拉伯语中，这些是垂直的，而在任何垂直书写模式中，这些是水平的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2810f49556f4a82bb065666f5a85bcd~tplv-k3u1fbpfcp-zoom-1.image)

我们可以换过一种方式来理解：

- **块轴** ：主要定义网站文档（元素块）流，CSS 的书写模式 `writing-mode` 会影响块轴的方向；
- **内联轴** ：主要定义网站的文本流方向，也就是文本的阅读方式，CSS 的 `direction` 或 HTML 的`dir` 会影响内联轴的方向。

简单地说，**`writing-mode`** **能很好****地****和块轴、行内轴、阅读模式以及书写模式结合起来** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f549ea3458834984a1cd82797b98dfa6~tplv-k3u1fbpfcp-zoom-1.image)

为了更好地匹配书写模式或者说多语言的 Web 布局，我们需要从一些理念上做出改变。

首先是用“开始”和“结束”来替代以往的 TRBL（即 `top` 、`right` 、`bottom` 和 `left` ）：

- **开始（`start`）** 这对应于文本的方向，并反映了文本的侧边，你将从哪里开始阅读。对于英文，开始对应于左。对于阿位伯文来说，对应于右。
- **结束（`end`）** 这也对应于文本的方向，并反映了文本的侧边，你将在哪里结束阅读。对于英文，结束对应于右。对于阿拉伯文来说，对应于左。

另一个就是“逻辑维度”来替代“物理维度”。前面的内联轴、块轴、开始和结束结合起来可以构建 CSS 逻辑属性中的流相对值。即 `block-start` 、`block-end` 、 `inline-start` 和 `inline-end` 。这几个属性也被称为**逻辑维度** ，其实就是用来指定在对应轴上的开始和结束位置。它们对应的就是我们熟悉的 `top` 、`right` 、 `bottom` 和 `left` 几个物理方向。

换句话说，在 CSS 逻辑中，使用流相对值来代替相应的物理值。正如前面所述，流相对值（逻辑维度）和 CSS 的书写模式 `writing-mode` 或阅读方式 `direction` 有关。

接下来，我们通过几种典型的语言为例，来向大家阐述逻辑维度和物理维度的映射关系。 首先来看英文，英文的阅读方式一般是从左往右（即 `dirction: ltr` 和 `writing-mode:horizontal-tb` ），这种模式常称为 **LTR** （Left-To-Right）。它的内联轴是水平的，块轴是垂直的，相应的逻辑维度和物理维度映射关系如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/775aa7a121834eb380ed7dc450bacaae~tplv-k3u1fbpfcp-zoom-1.image)

| **逻辑维度**       | **物理维度** |
| -------------- | -------- |
| `inline-start` | `left`   |
| `inline-end`   | `right`  |
| `block-start`  | `top`    |
| `block-end`   | `bottom` |

接着来看阿拉伯文，它的阅读方式是从右往左（即 `direction: rtl` 和 `writing-mode:horizontal-tb`），这种模式常称为 **RTL** （Right-To-Left）。它的内联轴是水平的，块轴是垂直的，相应的逻辑维度和物理维度映射关系如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/630cafe59bd34c2d9e7e10da90523857~tplv-k3u1fbpfcp-zoom-1.image)

| **逻辑维度**       | **物理维度** |
| -------------- | -------- |
| `inline-start` | `right`  |
| `inline-end`   | `left`   |
| `block-start`  | `top`    |
| `block-end`   | `bottom` |

再来看日文，竖排（有点类似中国古代的汉字书写模式），对应的 `writing-mode: vertical-rl` 。它的内联轴是垂直的，块轴是水平的，相应的逻辑维度和物理维度映射关系如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57d642bbcc9a419e9b46a02578639404~tplv-k3u1fbpfcp-zoom-1.image)

**逻辑维度**       | **物理维度** |
| -------------- | -------- |
| `inline-start` | `left`   |
| `inline-end`   | `right`  |
| `block-start`  | `top`    |
| `block-end`    | `bottom`

最后再来看蒙文，也是竖排，和日文不同的是 `writing-mode: vertical-lr` 。它的内联轴是垂直的，块轴是水平的，相应的逻辑维度和物理维度映射关系如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6da342e400a3430e976fc503bf1e7ed2~tplv-k3u1fbpfcp-zoom-1.image)

**逻辑维度**       | **物理维度** |
| -------------- | -------- |
| `inline-start` | `right`  |
| `inline-end`   | `left`   |
| `block-start`  | `top`    |
| `block-end`    | `bottom`

### CSS 逻辑属性

正如前面你所看到的，如果你要构建一个多语言的 Web 网站或 Web 应用，你需要同时考虑 LTR 和 RTL 的排版，甚至还需要考虑垂直方向的排版。在这种环境之下，以前的物理特性就不能很好地满足 Web 的布局所需，即使是能满足，也会给 Web 开发者增加额外的工作量，这些额外增加的代码，也会让你的项目代码变得冗余，不易于维护。比如下面这个示例。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91670e8b5d2c4143b1b389368ec987ba~tplv-k3u1fbpfcp-zoom-1.image)

```
.media__object {
    float: left;
    margin-right: 1rem;
}
​
[dir="rtl"] .media__object {
    float: right;
    margin-left: 1rem;
    margin-right: 0;
}
```

注意，使用 CSS Flexbox 或 CSS Grid 不会这么复杂，这里拿浮动布局为例，让大家对物理属性和逻辑属性有一个明显的感观。

同样是实现上面示例的效果，要是换 CSS 逻辑属性来实现，就显得要简单地多：

```
.media__object {
    float: inline-start;
    margin-inline-end: 1rem;
}
```

我想你已经感受到两者（CSS 物理属性和逻辑属性）之间的差异了，如果还没有体会到，我想用下图来向大家展示它们之间的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/361d9aa77108497eb12a36f1370ad4a6~tplv-k3u1fbpfcp-zoom-1.image)

使用 CSS 逻辑属性时，只需要设置 `float` 的值为 `inline-start` ，另外间距只需要设置 `margin-inline-end`，就可以将根据 HTML 文档的方向（`dir` 的值）自动匹配。这不是很强大吗?

这个示例也从侧面说明了 CSS 逻辑属性的作用以及它在多语言排版中的重要性。其实，自 CSS 引入逻辑属性之后，CSS 带有方向性的属性都有相应的变化。尤其是我们熟悉的 CSS 盒模型相关属性，比如 `margin` 、`padding` 、`width` 和 `height` ；元素定位属性，比如 `top` 、`right` 、`bottom` 和 `left` ；浮动方向、文本对齐方向等都可以映射到对应的 CSS 逻辑属性上。

简单地说，

- 只要 CSS 带有 `-top` 、`-right` 、`-bottom` 和 `-left` 属性，比如 `margin-left` 、`padding-top` 等，都可以映射到 `-start` 和 `-end` 属性上，比如 `margin-inline-start` 和 `padding-block-start` 等。
- 只要 CSS 的属性值带有 `-top` 、`-right` 、`-bottom` 和 `-left` ，比如 `float: left` ，都可以映射到 `-start` 和 `-end` 上，比如 `float: inline-start`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b91af72f9e0482e8ab517462c007a41~tplv-k3u1fbpfcp-zoom-1.image)

CSS 物理属性和逻辑属性之间映射关系，更详细的如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4575cc9f4e934048945c56a7be38da1a~tplv-k3u1fbpfcp-zoom-1.image)

为了加深大家对 CSS 逻辑属性和物理属性差异的理解，我们再来看 Inline 和 Block之间的差异。

在使用 CSS 逻辑属性时，你经常会看到关键字 `inline` 或 `block` 。简单地说，CSS 逻辑属性使用 `inline` （内联维度）和 `block` （块维度）替代了 CSS 物理属性中的 `x` （水平维度）和 `y` （垂直维度）。为什么要这么做呢？我们来看下面这个示例。

在还没有 CSS 逻辑属性之前，Web 开发者一般在 `x` 和 `y` 维度分别会使用：

- `width` 、`min-width` 和 `max-width` 来描述元素盒子在水平方向的尺寸，即宽度；
- `height` 、`min-height` 和 `max-height` 来描述元素盒子在垂直方向的尺寸，即高度。

```
.box {
    width: 50vw;
    height: 50vh;
}
```

基于这个模式之下，如果我们只是调整 HTML 的 `dir` 或 CSS 的 `direction` 值，这个布局不会有什么太大的影响，那是因为 `ltr` 或 `rtl` ，宽度依然还是宽度，高度依然还是高度，它改变的只是文本流的方向：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/514b368392844fe38b2a57ddec49f48d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/MWXZxKo>

但如果使用 `writing-mode` 来改变书写模式，比如从 `horizontal-tb` 切换到 `vertical-lr` （或 `vertical-rl`），正常情况之下，宽度要切换成高度，高度切换成宽度。但实际情渲染出来的情形并非如此，它依旧是宽度是宽度，高度是高度，但元素的内容排版却不一样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d41a7eeb41f244f98331e2d4af12e167~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/MWXLOWb>

如果需要符合预期，就需要使用逻辑属性来替代物理属性：

```
.box {
    inline-size: 50vw;
    block-size: 50vh;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/359d531bbaca42cf9d514c5980e0159c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/NWzowrG>

同样拿不同的语言为例，比如英文（`writing-mode: horizontal-tb` 和 `direction: ltr`）、阿拉伯文（`writing-mode: horizontal-tb` 和 `direction: rtl`）、日文（`writing-mode: vertical-rl`）和蒙文（`writing-mode: vertical-lr`）。具体的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05a4539626f84dff884713b87a5547f5~tplv-k3u1fbpfcp-zoom-1.image)

你会发现，多语言 Web 布局和 LTR 和 RTL（阅读模式）、CSS 书写模式（水平、垂直）和 CSS 逻辑属性有着紧密的关系。同时不难发现，正因为阅读模式、书写模式的不同，以前的物理特性是无法满足多语言 Web 布局的。

庆幸的是，在 CSS Flexbox 和 CSS Grid 布局中，和具体的物理方向性已无太紧密关系。比如在 Flexbox 中，不再关注方向，而是更关注主轴和侧轴，而且每根轴不是以物理方向来描述，而是以逻辑方向来描述，即 `start` 、`end` 替代以前的 `left` 、`right` 、`top` 和 `bottom` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7881e640db8b4e5fbcf181315fa1413b~tplv-k3u1fbpfcp-zoom-1.image)

特别是进入到 CSS Grid 的时代，方向性更不重要了。因为在 Grid 的时代变成了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/141ce180c8fe4739ad9f13a18e5cc3ab~tplv-k3u1fbpfcp-zoom-1.image)

在 Flexbox 和 Grid 中，不再有具体的方向性的概念，有的只是开始（`start`）和结束（`end`）。如果你用过了 Flexbox 布局或 Grid 布局，我想你已经有用到框对齐（Box Alignment）模块中的对齐属性，比如 `justify-*` （`justify-content` 、 `justify-self`）。它们可以取物理值的 `left` 和 `right` ，但在实际使用的时候，却更多使用的是 `flex-start` 、`flex-end` （Flexbox 布局中对齐）和 `start` 、 `end` （CSS Grid 布局中对齐）。

也就是说，虽然 `justify-*` 可以取值 `left` 和 `right` 值，但它们基本被逻辑属性值 `start` 和 `end` 替代（在 CSS Flexbox 中还有 `flex-start` 和 `flex-end`）。对于大部分开发者来说，它可能就从未使用过 `left` 和 `right` 属性值。

## CSS Flexbox 中的 LTR 和 RTL

Flexbox 是现代 Web 布局中最受欢迎的模式之一。主要是因为有较大的灵活性，而且在大多数情况之下消除了为 RTL 开发重新写样式。简单地说，LTR 和 RTL可以完美的融入到 Flexbox 布局中。

Flexbox 具备这样的特性主要是因为它是基于文档的书写模式，而书写模式又主要用于指定块在页面上的布局方式。在 Flexbox 布局中，Flex 项目根据文档的书写模式来分配。在英语和阿拉伯语中，书写模式（`writing-mode`）的默认值是`horizontal-tb` ，只是 `dir` 分别是 `ltr` （英语）和 `rtl` （阿拉伯文）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49533eb13b3a496c9e1789119922d1e3~tplv-k3u1fbpfcp-zoom-1.image)

了解 Flexbox 的同学都知道，在 Flexbox 容器中有一个 `flex-direction` 属性，在主轴方向（Main Axis）有两个属性值 `row`（默认值）和 `row-reverse`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97eb7e4938c345499f1dd935e12d99ed~tplv-k3u1fbpfcp-zoom-1.image)

从效果上看， `flex-direction` 可以很轻易地实现类似 LTR 和 RTL 的效果。但事实上，它和 `dir`（或 `direction`）有着紧密的关系。

如果 `dir` (或 `direction` )的值为 `ltr` 时，则 `flex-direction` 取值为 `row` 时，Flex 项目从左到右排列，如果取值为 `rtl` 时，则 Flex 项目从右到左排列。而 `flex-direction` 取值为 `row-reverse` 时效果刚好与 `row` 相反。简单地说，HTML 的 `dir` 和 CSS 的 `direction` 取值对 `flex-direction` 渲染结果有着直接的影响：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2753aae3c83d4d4e813e925b278f7442~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/oNympPL>

从上面示例我们可以得知，默认情况之下，`flex-direction: row` 就相当于 `dir="ltr"` （或 `direction: ltr`），`flex-direction:row-reverse` 相当于 `dir="rtl"` （或 `direction: rtl`）。这也给开发者造成一种错误的认识，不少开发者会为不同阅读模式排版提供不同的样式规则。比如：

```
/* 拉丁语体系 Left To Right*/
[dir="ltr"] .flex--container {
    display: flex;
}
​
/* 阿拉伯语体系 Right To Left*/
[dir="rtl"] .flex--container {
    display: flex;
    flex-direction:row-reverse
}
```

事实上，在 CSS Flexbox 布局中，元素是根据文档的书写模式分布的。拉丁语体系（比如英文）和阿位伯语体系（比如阿拉伯语）的默认书写模式为 `horizontal-tb`。即 **内容从左到右水平流动，从上到下垂直流动。下一条水平线位于前一条平线的下方**。

当页面的方向被更改为 RTL 时（即 `dir="rtl"` 或 `direction: trl`），Flexbox 会相应地翻转它的元素（Flex 项目）。这是一个巨大的好处！下面图展示了如何根据方向翻转 Flexbox 轴（主轴）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fadcf12f55841b7a363c6e5271c69d8~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，使用 CSS Flexbox 构建 Web 布局时，我们不需要针对 LTR 和 RTL 提供不同的样式，它可以根据 `dir` 或 `direction` 自动翻转。 `flex-direction:row` 和 `dir` 结合起来就可以很好地实现 LTR 和 RTL 的布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cb13870d43f41d0b2f2e698ba8608a3~tplv-k3u1fbpfcp-zoom-1.image)

利用上面说到的特性，重新来构造媒体对象的布局效果（中文版本和阿拉伯语版本），它会比 CSS 浮动简单地多：

```
/* CSS Float Layout: CSS 逻辑属性 */
.media {
    display: flow-root;
}
​
.media__object {
    float: inline-start;
    margin-inline-end: 1rem;
}
​
.media__content {
    display: table-cell;
}
​
/* CSS Float Layout: CSS 物理属性 */
@supports not (float: inline-start) {
    .media__object {
        float: left;
        margin-right: 1rem;
    }
​
    [dir="rtl"] .media__object {
        float: right;
        margin-left: 1rem;
        margin-right: 0;
    }
}
​
/* CSS Flexbox Layout */
​
.media {
    display: flex;
    gap: 1rem;
}
​
.media__object {
    flex-shrink: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d75f3609c0e438fb91569f0a779f4bb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/KKeJQaj>

刚才提到过，Flexbox 是基于文档书写模式来布局的，而且在介绍 `flex-direction` 以及 Flexbox 中对齐方式时有说过，“**CSS 书写模式** **`writing-mode`** **会影响** **`flex-direction`** **和对齐方式的渲染结果** ”。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3823bd3b33c420ea300828595ee87b3~tplv-k3u1fbpfcp-zoom-1.image)

从效果上来看，`writing-mode` 取值为 `horizontal-tb` 时，LTR 、RTL 和 `flex-direction: row` 结合效果都是完美的。但是将 `writing-mode` 更换为垂直排版（`vertical-lr` 和 `vertical-rl`）时，整体的效果就不是那么的理想了。

如果你需要在竖排的时候效果也不错，那就要在设计上做一些调整，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d2091ea03e648579708d5346f5a21b1~tplv-k3u1fbpfcp-zoom-1.image)

针对这种情况，需要在竖排模式下，`flex-direction` 从默认值 `row` 更换成 `column` 。有关`writing-mode` 、`dir` 对 `flex-direction` 取值的影响如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fed663371024f1785131318fd8eda68~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/gOKEavY>

来看一个简单示例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b70242f85a66428097d576db7fbed1a2~tplv-k3u1fbpfcp-zoom-1.image)

```
<div class="wrapper">
    <h1>Winter Hiking</h1>
    <div class="figures">
        <figure><img src="" alt="" /></figure>
        <figure><img src="" alt="" /></figure>
        <figure><img src="" alt="" /></figure>
    </div>
</div>
.wrapper {
    display: flex;
    gap: 10rem;
    writing-mode: var(--writing-mode, vertical-lr);
    flex-direction: column;
    align-items: center;
}
​
.figures {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(9, 1fr);
}
​
figure:nth-child(1) {
    grid-column: 4 / 7;
    grid-row: 1 / 5;
}
​
figure:nth-child(2) {
    grid-row: 4 / 9;
    grid-column: 1 / 5;
    z-index: 2;
}
​
figure:nth-child(3) {
    grid-column: 6 / 10;
    grid-row: 3 / 10;
    z-index: 2;
}
​
h1.lr {
    transform: rotate(180deg);
}
```

在这个示例中，采用的是 Flexbox 和 Grid 结合的布局，图片区域采用的是 CSS 网格布局，标题和图片区域采用的是 Flexbox 布局。在 Flex 容器 `.wrapper` 设置 `writing-mode` 的值为 `vertical-lr` 或 `vertical-rl` （相互切换）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1516e879d6d84ba389db5c740d4833ea~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/bGKZVZw>

## CSS Grid 中的 LTR 和 RTL

和 CSS Flexbox一样，CSS Grid 也依赖于文档的书写模式布局，这和使用 Flexbox 有同样的好处。同样拿媒体对象（Media Object）为例，当方向是 LTR 时，缩略图 `.media__objeft` 在左侧，主内容 `.media__content` 在右侧，反之亦然。而且，使用CSS Grid 时，翻转将根据页面的方向自动完成。

```
<!-- LTR: Left To Right-->
<div class="media" dir="ltr">
    <figure class="media__object">
        <img src="media-object.jpg" alt="Meida object" />
    </figure>
    <div class="media__content">
        <h3 class="media__title">Card Title</h3>
        <p class="media__describe">Card Describe</p>
    </div>
</div>
​
<!-- RTL: Right To Left -->
<div class="media" dir="rtr">
    <figure class="media__object">
        <img src="media-object.jpg" alt="وسائط الإعلام الكائن" />
    </figure>
    <div class="media__content">
        <h3 class="media__title">بطاقة العنوان</h3>
        <p class="media__describe">(وصف</p>
    </div>
</div>
.media {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto minmax(0, 1fr);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78f40113b0e04576ae88f5a91299ee71~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/JjZzXLW>

同样的，CSS Grid 也会受 `writing-mode` 的影响，比如上面示列，当 `writing-mode` 的值为 `vertical-lr` 和 `vertical-rl` 时的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5afc164432f24b06bbd60ad1c1b1d29a~tplv-k3u1fbpfcp-zoom-1.image)

我们一起来看一个有关于 Logo 的布局设计，它是使用 CSS Grid 和 `writing-mode` 结合的案例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cefddeae48946e48330276684a74053~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/jOKJrmq>

这个案例需要的 HTML 结构：

```
<h1>
    <span>made</span>
    <span>by</span>
    <span>few</span>
</h1>
h1 {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-template-rows: repeat(3, min-content);
    place-content: center;
    place-items: center;
}
​
span:nth-child(1) {
    grid-column: 1 / -1;
    grid-row: 1;
    font-size: 150%;
}
​
span:nth-child(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 80%;
}
​
span:nth-child(3) {
    grid-row: 2 / 4;
    grid-column: 2;
    font-size: 165%;
}
```

再来看一个 [@JENSIMMONS](http://twitter.com/jensimmons) 的 [Layout Lab](https://labs.jensimmons.com/) 网站首页 Hero 区域的布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08cb604f650747ceab9e439a3cc8e192~tplv-k3u1fbpfcp-zoom-1.image)

```
<header class="header">
    <h1>The Experimental Layout Lab</h1><h1>of Jen Simmons</h1>
    <div class="demo-list">
        <h2>The Conference Talks</h2>
        <ol>
            <li><a href="https://youtu.be/jreccgYLfx8">Modern Layouts: Getting Out of Our Ruts</a></li>
            <li><a href="https://youtu.be/aYgMExb-mlo">Revolutionize Your Page: Real Art Direction on the Web</a></li>
            <li><a href="https://youtu.be/t0b3uBoDkBs">Designing with Grid</a></li>
            <li><a href="https://youtu.be/jBwBACbRuGY">Everything You Know About Web Design Just Changed</a></li>
            <li><a href="https://youtu.be/AMPKmh98XLY">Designing Intrinsic Layouts</a></li>
        </ol>
    </div>
    <p class="follow-links">Follow <a href="http://twitter.com/jensimmons">@jensimmons</a> on Twitter for more as it happens.</p>
    <div class="workshop-link">
        <ul>
            <li><a href="https://youtube.com/layoutland">Layout Land videos</a></li>
            <li><a href="http://jensimmons.com">jensimmons.com</a></li>
        </ul>
    </div>
</header> 
```

关键性的 CSS 代码：

```
header {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr 0.5fr;
    grid-template-rows: auto 1fr 1fr auto auto;
    gap: 1rem;
    transform: rotate(-45deg);
}
​
header h1:nth-child(1) {
    grid-column: 1 / 4;
    text-align: right;
}
header h1:nth-child(2) {
    writing-mode: vertical-lr;
    grid-column: 3 / 4;
    grid-row: 2 / 5;
    justify-self: end;
}
​
header .demo-list {
    grid-column: 1 / 3;
    grid-row: 4 / span 2;
    align-self: end;
}
​
.follow-links {
    grid-column: 3 / 6;
    grid-row: 5;
    align-self: start;
    justify-content: end;
}
​
header .workshop-link {
    grid-row: 3;
    grid-column: 4 / 6;
    align-self: start;
}
```

> Demo 地址：<https://codepen.io/airen/full/vYrPKaw>

## 小结

如果你要开发一个多语言网站，或即将要开发一个多语言网站，那么这节课程所介绍的 CSS 知识对于你来说应该会有很大的帮助。开发一个多语言网站，我们需要面对的不是简单翻转设计的需求，我们需要根据不同的书写模式、阅读模式来调整设计，优化 Web 布局。

庆幸的是，CSS 提供很多特性，可以让我们开发多语言网站变得容易得多。

- **CSS Grid 和 CSS Flexbox** ：这两个特性已经用新的逻辑属性方法构建了，不需要更新它们。因为它们都是基于书写模式的布局，以 `start` 和 `end` 等方式替代了以往的物理模式 `top` 、`right` 、`bottom` 和 `left`。
- **使用逻辑属性理解工作流** ：在使用到方向相关的特性时，使用逻辑属性来替代物理属性，这样你在编写样式时，就不需要担心跨语言支持。你只需要使用逻辑属性，它就能轻易匹配到你首选的语言。
- **根据语言应用对齐** ：逻辑属性可以让我们定义块轴对齐方式(文档流方向，即块流)和行内轴对齐方式(我们读取文本的方向，即文本流)。简单地说，语言会根据自身特性在块轴（Block Axis）和内联轴（Inline Axis）来应用对齐方式。一般情况下，`justify-*` 用于内联轴（Inline Axis），`align-*` 用于块轴（Block Axis）对齐。
- **方向属性** ：定义文本是从左到右还是从右到左开始，但只有 `writing-mode` 取值为 `horizontal-tb` 时才生效。如果把书写模式改成垂直模式，文本的实际方向(从左到右)就会变成从上到下。或者相反，使用 `rtl` (右到左)值，它将变成从下到上。

正如前面示例所示，如果你的 Web 网站或 Web 应用是基于 CSS Flexbox 或 CSS Grid 布局，并且把物理属性都使用逻属性来替代，例如：

- 使用 `inline-size` 替代了 `width`；
- 使用 `block-size` 替代了 `height`。

或者：

- 使用 `inline-start` 替代了 `left`；
- 使用 `inline-end` 替代了 `right`；
- 使用 `block-start` 替代了 `top`；
- 使用 `block-end` 替代了 `bottom`。

或者:

- 使用 `*-inline-start` 替代了 `*-left` ，比如 `margin-inline-start` 替代 `margin-left`；
- 使用 `*-inline-end` 替代了 `*-right`， 比如 `border-inline-end-width` 替代 `border-right-width`；
- 使用 `*-block-start` 替代了 `*-top` ，比如 `padding-block-start` 替代了 `padding-top`；
- 使用 `*-block-end` 替代了 `*-bottom` ，比如 `border-block-end-width` 替代了 `border-bottom-width`。

比如下面这个示例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a85d3b3e41bd445fa60341dc28ac4810~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNKRMKR>

```
.inline-list  {
    display: flex;
    align-items: center;
}
​
.inline-list li:not(:last-child) {
    margin-inline-end: 1rem;
}
​
.inline-form {
    display: flex;
}
​
.inline-form--field {
    border: 1px solid #aaa;
    padding: 0.5rem;
    border-inline-end: 0;
    margin-inline-end: 0;
  
    border-start-start-radius: 10px;
    border-end-start-radius: 10px;
}
​
.inline-form--button {
    border: 1px solid #aaa;
    padding: 0.5rem;
    margin-inline-start: 0;
  
    border-start-end-radius: 10px;
    border-end-end-radius: 10px;
}
​
blockquote {
    border-inline-start: 4px solid #aaa;
    padding: 0.75rem;
    padding-inline-start: 1.75rem;
    background-color: #f5f5f5;
}
```

基于这些情况之下，你只需要一行代码就可以实现 LTR 和 RTL 的翻转设计：

```
/* LTR */
html[lang="en"] {
    direction: ltr;
}
​
/* RTL */
html[lang="ar"] {
    direction: rtl;
}
```

或者直接改变 HTML 元素的 `dir` 属性值：

```
<!-- LTR -->
<html lang="en" dir="ltr"></html>

<!-- RTL -->
<html lang="ar" dir="rtl"></html>
```

当然，多语言网站绝不仅仅只是一种翻转设计，它会涉及到其他一些细节和知识点。在下一节课中，我们将一起探讨 LTR 切换到 RTL 时常见的一些错误！希望对大家以后在构建多语言网站时有所帮助！
