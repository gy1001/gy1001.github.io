# 24-内在 Web 设计

在响应式 Web 设计（Responsive Web Design）诞生八周年之际，曾任 Mozilla 的设计师（现任苹果Safari Web 开发者体验团队的布道者） [@Jen Simmons](https://twitter.com/jensimmons)在美国马萨诸塞州波士顿举办的 **An Event Apart Boston** 大会上分享的《[Designing Intrinsic Layouts](https://talks.jensimmons.com/15TjNW)》话题中，首次提出了**内在 Web 设计** 的概念。在过去的几年里，@Jen Simmons 也称之为“**响应式网页设计+** ”。但它到底是什么？它与响应式网页设计有什么不同？内在 Web 设计又将会用到哪些 CSS 技术？接下来，我们就一起来探讨这方向的话题！

## 什么是内在 Web 设计？

直到现在，大多数的 Web 设计和布局都是以设计为导向，因为在构建 Web 布局时，都是基于设计师提供的设计稿（模板）来完成。因此，你不难发现，现存于线上的很多 Web 页面上的元素大小（尺寸）基本上都设置了固定的尺寸，而且这些尺寸是根据最初设计师提供的稿子定义的。

事实上呢？Web 的数据是动态的，服务端吐出的数据与最初设计稿内容有可能并不匹配（有多，也有少），此时呈现给用户的 Web 页面并不是最佳的（有可能很多空白空间未利用，有可能内容溢出容器，打破布局）。反之，Web 的内在尺寸设计就不同，在 Web 布局时，页面元素大小是根据真实内容（服务端吐出的数据）来决定的。

来看一个简单地示例，假设你从设计师手上拿到这样的一张设计稿：

![img](./assets/df4cb69bc0a14291b11508d0689efec8~tplv-k3u1fbpfcp-zoom-1.jpeg)

拿示例中的 “View Themes” 按钮为例吧。大部分 Web 开发者拿到设计图，就会测量该按钮的几个视觉重要参数，比如 `width` 、`height` 和 `padding` 之类（如上图所示），然后就会根据设计稿所提供的模板尺寸进行开发：

```CSS
button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 60px;
    padding: 24px 46px;
    text-transform: uppercase;
    border: 2px solid currentColor;
    color: #fff;
} 
```

默认情况之下， Web 开发者还原出来的结果都符合设计稿需求，但突然说输出给按钮的内容不是设计稿模板提供的内容，或者说按钮字号稍微调整。还原出来的结果就不一定符合设计稿的需求了：

![img](./assets/534b72f30b5e4b2faafcbe0ce43b9729~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/dyKENyW>

这就是典型的以设计为主，而不是以内容为主。如果我们在开发的时候，能以内容为主，而不是以设计为主时，事情一节都变得更美好。

我不关心你输出的内容是什么，我的样式也能更接近设计稿，比如把上面样式中的 `width` 和 `height` 的值替换成其他值，比如 `auto` 或 `min-content` 或 `max-content` ，就不会出现上图所示现象：

```CSS
button {
    width: max-content;
    min-width: 230px;
    min-height: 60px;
}
```

![img](./assets/b655e2bf26b5421c9802dca727262df9~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/KKeLazj>

**这就是内在 Web 设计的优势和主要特性之一，即 以内容来驱动设计 。**

与将设计人员和开发人员都限制在 Web 的“预定义规则”中不同，内在 Web 设计（Intrinsic Web Design）使他们能够灵活地将传统的、久经考验的 Web 布局技术和现代布局方法和工具（比如 Flexbox，Grid 等）结合起来，以便根据 Web 的内在内容创造独特的布局 。

用最简单的术语来说：

> **内在 Web 设计（Intrinsic Web Design）不是内容以设计为导向（Content Design-Driven），而是只专注于让设计受内容驱动（Design Content-Driven）** 。

就 Web 布局来说，它是继响应式 Web 设计之后又一个布局技术转折点：

![img](./assets/b3ed00218975473e94e05c6041631c06~tplv-k3u1fbpfcp-zoom-1.jpeg)

自从 Web 诞生以来，Web 开发者一直都在使用大量的 Hack 来完成所有与 Web 布局相关的事情，比如使用浮动（`float`）、引用外部第三方 CSS 框架（CSS Frameworks）和库（比如 Bootstrap）。而“内在 Web 设计”可以在“用最少的代码和复杂 Web 设计”之间取得完美的平衡。

## 内在 Web 设计的关键原则

这么多年来，流动布局（Fluid Layout）和固定宽度布局（Fixed Width Layout）还是绝大多数开发者采用的布局方式，即使是响应式 Web 设计（RWD：Responsive Web Design）出现之后，也未得到较大的改善。而 Jen 提出的内在 Web 设计（IWD：Intrinsic Web Design）相对而言却有很大的不同，就拿和 RWD 的三个关键原则相比（了解 RWD 的同学都知道，它具有三大关键原则，即**流体网格 Fluid Grids** 、**灵活的图片 Flexible Images** 和**媒体查询 Media Queries** ）：

- RWD 具有灵活的图片（Flexible Images），而根据情况，**IWD 允许你使用灵活的图片和固定尺寸的图片**；
- RWD 的流体网格（Fluid Grids）仅仅只是列（即流体列 Fluid Columns），它是一维的（这里所说的Grids 并不是 CSS 的 Grid 模块，是我们常说的网格系统），而 **IWD 使用的是二维的流体网格，它的列和行都是流体的，即原生的 CSS Grid 模块**；
- RWD 需要借助 CSS 媒体查询模块特性才能让 Web 页面具有响应，而 **IWD 不一定要依赖媒体查询**。

换句话说，每一种设计都有自己的关键原则，内在 Web 设计也是如此。Jen 在她的分享中说“内在 Web 设计具有六个关键原则”：

![img](./assets/8ade138acb3045f9a8effb6cad95e08e~tplv-k3u1fbpfcp-zoom-1.jpeg)

即：

- **Fluid & fixed** ：内在 Web 设计不只是使用灵活的图像，而是提倡根据上下文同时使用固定和流体的方法。此外，利用 CSS `object-fit` 属性，你现在可以在垂直和水平方向调整图像大小，而不会让图像失去宽高比。
- **Stages of Squishiness** ：内在 Web 设计有更宽松的选择，在 CSS Grid 模块中引入了布局如何响应 Web 页面的内在上下文的新方法。对于 Web 开发者而言，有更宽松的选择，比如网格轨道的尺寸设置，开发者可以给网格轨道设置固定的尺寸大小、根据可用空间让客户端自动给网格轨道分配大小（CSS Grid 的 `fr` 单位，有点类似 Flexbox 的 `flex`）、使用 `minmax(min,max)` 给网格轨道尺寸大小设置一个范围或给网格轨道设置 `auto` 值，让其根据其上下文内容来决定网格轨道尺寸。你可以将它们组合起来使用，让 Web 元素更好地交互和相互协作。
- **Rows & Columns** ：指的是在 CSS Grid 模块的帮助下，内在 Web 设计使你能够构建一个真正的二维布局。现在不仅有灵活的列，还有灵活的行，以及上一条提到的几个宽松点，都可以用于列和行。你甚至可以在块方向（Block Axis）和内联轴方向（Inline Axis）创建布局所需的空白区域。
- **Nested Contexts** ：内在 Web 布局中，你可以拥有嵌套的上下文，比如 Flexbox（FFC）中嵌套 Grid(GFC)、Grid（GFC）嵌套 Flexbox（FFC）等，你可以选择和混合最好的布局方法构建一个最具灵活性的 Web 布局。
- **Ways Expand & Contract** ：在内在 Web 设计中引入了几种新的方法来对 Web 页面上的内容进行扩展和收缩，即挤压和收缩（如灵活的图片 Flexible Images）、换行和回流（像处理文本一样，可以自动换行）、添加和删除空白（比如间距会扩展和收缩）以及重叠（像定位一样，一个元素重叠在另一个元素上）。现在，你可以做很多事情，比如不依赖媒体查询来根据屏幕大小调整页面元素的尺寸。
- **Media Queries, As Needed** ：内在 Web 设计中，是可以不依赖 CSS 媒体查询让 Web 页面作出响应的，比如 CSS Grid 布局中的 RAM 布局技术（`repeat()`、`minmax()` 和 `auto-fill` 或 `auto-fit` 的组合），比如 CSS 的比较函数 `min()`、`max()` 和 `clamp()`， 都可以让我们不依赖 CSS 媒体查询实现响应式布局。

这就是内在 Web 设计的关键原则，也可以说是内在 Web 设计的美丽和力量！

值得一提的是，时至今日，原生的 CSS Grid 相关特性也可以运用于 RWD 中，只不过当初提出响应式设计概念时，原生 CSS Grid 模块还不够完善，浏览器对其支持度也欠佳。但这几年中，CSS 技术得到突飞猛进的发展，而且主流浏览器对CSS 新持性支持的响应速度越来越快。或者说，我们在不同的时间节点，对 Web 布局技术提法（或者说概念）是有一定差异的，新的概念对应新的布局方法。

## 内在 Web 设计可能会用到的 CSS 技术

我想大家更为关注的是，构建一个内在 Web 设计时会使用到哪些 CSS 技术，这里简单地说，它可能会涉及到：

- CSS 内在尺寸与外在尺寸；
- 图片的适配处理；
- 不依赖 CSS 媒体查询让 Web 具备响应式能力；
- 内在 Web 设计的上下文之间间距；
- CSS 容器查询。

先来看 CSS 内在尺寸与外在尺寸。

### CSS 内在尺寸与外在尺寸

对于 Web 布局而言，它有两个关键，即 **大小和 上下文** 。其中大小是用来确定元素的尺寸，上下文是用来确定视觉呈现的模式。这两个概念在 CSS 中是最基础不过的两个。

在 CSS 的世界中，任何一个元素都会被视作为一个盒子，就像我们的柜子一样：

![img](./assets/7bbf1faa5b474d80ab0bce1720888871~tplv-k3u1fbpfcp-zoom-1.png)

每一个盒子就是一个框，框的大小是由 CSS 的盒模型相关属性决定的。随着 CSS 逻辑属性的出现，CSS 的盒模型也可以分为 物理盒模型 和 逻辑盒模型，两种盒模型都有其对应的 CSS 属性：

![img](./assets/fbd1ba0c882f47caab90b13c349b44b6~tplv-k3u1fbpfcp-zoom-1.png)

抛开盒模型中其他属性不说（比如 `border` 和 `padding`，它们也会影响框的大小），其中 `width` 和 `height`（物理属性）；`inline-size` 和 `block-size` （逻辑属性）是用来设置框大小最直接的 CSS 属性。

> `width`、`height`、`inline-size` 和 `block-size` 都可以在其前面添加前缀 `min-` 或 `max-`，用来限制框大小的下限或上限。

这些用于决定框大小的 CSS 属性都可以接受 `auto`、`<length-percentage>`、`min-content`、`max-content`、`fit-content(<length-percentage>)`，除此之外，在未来它们还可以接受 `stretch`、`fit-content` 和 `contain`（这几个属性值是在 [CSS Box Sizing Module Level 4](https://www.w3.org/TR/css-sizing-4/) 模块中定义的）。

> 注意，其中 `min-*` 开头的属性（`min-width`、`min-height`、`min-inline-size` 和 `min-block-size`）的初始值是 `auto`，它们不接受 `none` 值；反过来，`max-*` 开头的属性（`max-width`、`max-height`、`max-inline-size` 和 `max-block-size`）的初始值是 `none`，它们不接受 `auto` 值。

这些属性值都是用来决定框尺寸的大小，但它们之间是有差异的，其中有些属性值会让框的大小由框里的内容（元素中的内容）来决定，有些属性值会让框的大小由上下文来决定。

换句话说，**在 CSS 中给一个元素框设置大小时，有的是根据元素框内在的内容来决定，有的是根据上下文来决定的** 。它们分别就是 CSS 中的“**内在尺寸（Intrinsic Size）** ”和“**外在尺寸（Extrinsic Size）** ”：

- **内在尺寸** ：元素根据自身的内容（包括其后代元素）决定大小，而不需要考虑其上下文，其中 `min-content`、`max-content` 和 `fit-content` 能根据元素内容来决定元素大小，因此它们统称为**内在尺寸**。  
- **外在尺寸** ：元素不会考虑自身的内容，而是根据上下文来决定大小，最为典型的案例，就是 `width`、`min-width`、`max-width` 等属性使用了 `%` 单位的值 。

来看一个简单的示例：

```CSS
/* 外在尺寸 */
.box-demo {
    width: 400px;
    height: 400px;
}

/* 内在尺寸 */
.box-demo[data-sizing="intrinsic"] {
    width: max-content;
    height: max-content;
}

.box-layout {
    display: grid;
    width: max-content;
    gap: 0.5rem;
    grid-template-columns: 1fr min-content;
}
```

![img](./assets/ec7b0c8b047345c4b11a778603d18aec~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/qBKGrEK>

上面聊到的是决定盒子大小的因数，只不过在 CSS 中，每个盒子可以具有不同类型的盒子。不同类型的盒子又被称为视觉格式化模型，也常称上下文格式化模型，它主要由 CSS 的 `display` 属性来决定。换句话说，`display` 取不同值时，可以得到不同类型的视觉格式模型，比如大家常说的 BFC、FFC、GFC 等。

视觉格式化模型对于 Web 布局有着决定性的影响，因为它会决定 CSS 中每个盒子的位置，甚至也会影响到盒子的尺寸大小。尤其是在 Flexbox 和 Grid 布局中，很多时候即使你显式设置了一个固定尺寸，也会受到影响。比如在 Flexbox 或 Grid 布局中改变对齐方式；Flexbox 布局中显式给 Flex 项目设置 `flex:1` ；网格轨道以 `fr` 单位来设置等等。

这主要是因为，在 FFC 或 GFC 模型下，将会影响上下文中的盒子尺寸的计算。具体怎么影响，这里就不详细展开了，就拿内在尺寸 `fit-content`、`max-content`和`min-content`为例，其中 `fit-content` 容器的可用空间有极强的关联。

在阐述 `min-content` 、`max-content` 和 `fit-content` 之前，有几个以前未介绍的概念有必要与大家简单介绍一下，这有助于大家更好理解这几个属性值：

- **允分利用可用空间** ： 在 HTML 中有一些块元素（块盒子），如果不做任何样式的设置，客户端对这些块元素的宽度解析的值是 `100%`。这种允分利用可用空间的行为常称为 **`fill-available`** 。
- **收缩与包裹** ： 在 CSS 中，我们可以通过一些样式改变元素在浏览器中默认显示的行为，比如在一个 `div` 元素上使用 `display` 改变其格式化上下文；比如使用 `float`、`position` 让元素脱离文档流。其实这个时候也会让元素有一个收缩行为，根据内容将元素大小收缩到最合适之处（刚刚好容纳下元素内容）。这种行为事实上和 CSS 的 `fit-content` 很相似。
- **收缩到最小** ： 大家是否还记得 `table` 用来布局，或者做数据统计表的时候，会发现单元格 `td` 的宽度总是会受到其他单元格的影响，哪怕是显式地给 `td` 设置了 `width`。该表现行为和 CSS 的`min-content` 是相似的。
- **超出容器限制** ： 这个大家应该熟悉，比如在文本内容中有 `url` 长地址出现时，就有可能会溢出容器显示。在 CSS 中使用 `white-space: nowrap` 也可以让文本不断行，溢出容器显示。CSS 的`max-content` 和这个表现行为有类似之处。

我在 Twitter 上看到 [@stefanjudis](https://twitter.com/stefanjudis) 录制了[一个视频](https://twitter.com/stefanjudis/status/1329345425640464384)，来展示 `min-content` 、`max-content` 和 `fit-content` 之间的差异，我觉得非常形象：

![img](./assets/6c481a2f1f374d8dbc228c38b7ba55ee~tplv-k3u1fbpfcp-zoom-1.gif)

我们通过下面这个示例来向大家阐述内在尺寸 `min-content` 、`max-content` 和 `fit-content` 之间的差异：

![img](./assets/d54c70a686e04ae883cd35abde11b2c2~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/jOKoBMM>

首先在示例中创建一个 `div`，该 `div` 作为容器，里成包含了一个 `img` 和两个段落标签：

```HTML
<div class="content" id="variable"> 
    <img src="/avatar_207.png" alt=""> 
    <p>Extrinsic sizing d...</p> 
    <p>Web自1989到今年刚好走过30年历程。。。</p> 
</div>
```

当 `div` 没有显式设置 `width` 时，它通常会水平扩展到容器允许的宽度。在垂直方向上，它可以根据自己的内容进行折叠。比如下图所示：

![img](./assets/50a03d6c1327477cbe75d4a5c9b74a7a~tplv-k3u1fbpfcp-zoom-1.jpeg)

上图就是 `div` 块元素默认渲染行为。 如果在 `div` 元素上运用 `min-content`：

```CSS
.min-content { 
    width: min-content; 
}
```

容器宽度会成为最窄的宽度，其大小适合最宽的子元素。在这个示例中，是 `img` 元素的宽度：

![img](./assets/6d6fbff7c31e48f884fe24a7f9e1e6f6~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果我们把 `img` 元素删除，那么宽度将是最长英文单词的宽度和把英文这个段落删除，只留下中文：

![img](./assets/00fcb8ac70af4b22abb8cf0eb3d2e12c~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果把 `div` 的宽度设置为:

```CSS
.max-content { 
    width: max-content; 
} 
```

你会发现效果就好比在 `p` 元素上设置了：

```CSS
p { 
    white-space: nowrap; 
}
```

 `div` 中的内容不会被分解成更小的块，而是完全不考虑容器的大小，直接溢出容器（除非内容总宽度不足容器的宽度之外）：

![img](./assets/de2855f1a7de4f4387418a6846a1f8d5~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果把 `div` 的 `width` 设置为 `fit-content`，将会试图容纳最宽的内容，同时仍然尊重它的容器：

![img](./assets/4aa4da1590d84e609aceeec70fb2f3c0~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果上面这个示例过于复杂，我们来看一个简单示例，分别给 `h1` 的 `width` 设置了`auto`、`min-content` 、`max-content` 和 `fit-content` ：

```CSS
h1[data-width="auto"] {
    width: auto;
}

h1[data-width="min-content"] {
    width: min-content;
}

h1[data-width="max-content"] {
    width: max-content;
}

h1[data-width="fit-content"] {
    width: fit-content;
}
```

![img](./assets/f3c558b3ae8a46d49f688a95eb3a18f8~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/mdKYWjy>

回过头来说，元素 `width` 取值 `<length>` 、`<percentage>` 、`auto` 、`min-content` 和 `max-content` 对于大家来说都易于理解，但当取值为 `fit-content` 时多少会令大家感到困惑。对于 `fit-content` ，它会检查可用空间（**`fill-available`**）与 `max-content` 和 `min-content` 大小，最后决定 `width` 取值：

![img](./assets/faae224268a74ff9ad31f7ee261c11d3~tplv-k3u1fbpfcp-zoom-1.jpeg)

另外，从本质上讲，`fit-content` 是以下内容的简写模式：

```CSS
.box {
    width: fit-content;
}

/* 等同于 */
.box {
    width: auto;
    min-width: min-content;
    max-width: max-content;
}
```

也就是说，在 CSS 中，我们现在有两种设置大小的方式：**内部尺寸设置** 和 **外部尺寸设置** 。后者是最常见的，这意味着使用固定的元素宽度或高度值。这样做有一个极大的缺陷，**内容断行或内容溢出** ：

![img](./assets/7ca171b28a80483abb714c78bb047ce0~tplv-k3u1fbpfcp-zoom-1.jpeg)

很多时候我们并不知道容器的内容会是什么，所占宽度是多少，这就会造成上图的现象。所以我们设置元素尺寸大小时，使用 `min-content`、`max-content` 和 `fit-content` 就可以让元素的大小取决于它的内容大小。避免内容溢出或断行等现象。

`min-content` 、`max-content` 和 `fit-content` 除了可以当作元素的 `width` 值之外，也可以作为 `flex-basis` 的值。当然，我们通过 《[08 | Flexbox 布局中的 flex-basis：谁能决定 Flex 项目的大小？](https://juejin.cn/book/7161370789680250917/section/7161623717074698247)》学习知道，Flexbox 中的 `flex-basis` 计算是复杂的。有关于它的计算这里不再重复累述。我们来看看 `min-content` 、`max-content` 和 `fit-content` 在 Flex 项目上的使用。分两种情况。

当 Flex 容器有足够空间时容纳所有 Flex 项目（Flex 项目未显式设置具体的宽度值），那么 Flex 项目的 `flex-basis` 值为 `max-content` 和 `fit-content` 的效果等同于 `auto` ：

![img](./assets/61878575d31a44148ecfafefde881e20~tplv-k3u1fbpfcp-zoom-1.jpeg)

当 Flex 容器空间不足时，由于 `flex-shrink` 的默认值为 `1` ，Flex 项目会按照 `flex-shrink` 的计算公式（《[07 | Flexbox 中的计算：通过收缩因子比例收缩 Flex 项目](https://juejin.cn/book/7161370789680250917/section/7164357320367931399)》）对 Flex 项目的 `flex-basis` 进行计算，直到 Flex 项目的 `flex-basis` 计算值等于 `min-content` 为止（不再进行收缩）：

![img](./assets/9f4823309da6426da84a70b44a6ce1a6~tplv-k3u1fbpfcp-zoom-1.jpeg)

只不过要将 `flex-shrink` 的值由 `1` 变成 `0` ，让所有 Flex 项目不可收缩，那么 `flex-basis` 取值 `max-content` 时就会和 Flex 容器有足够的空间表现一样，不同的是 Flex 项目会溢出 Flex 容器：

![img](./assets/1edfba722e9f4e19917690670fc70d96~tplv-k3u1fbpfcp-zoom-1.gif)

`flex-basis` 取值为 `min-content` 时，不管 Flex 容器是否有足够空间容纳 Flex 项目，它们的表现都是相似的，都以最长字符串的单词计算值为最终值：

![img](./assets/0ba60fdbccf74602b673d911cedd6b0f~tplv-k3u1fbpfcp-zoom-1.jpeg)

`flex-basis` 取值为 `min-content` 时，Flex 项目的 `flex-shrink` 的值不管是不是 `1` ，它始终以 `min-content` 为计算值。同样的，Flex 容器足够小，小到无法容纳所有 Flex 项目的 `min-content` 计算值总和时，Flex 项目会溢出 Flex 容器：

![img](./assets/1ac53acb87fa40d08823938cf5810bb5~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/eYKaXEp>

注意，上面示例中的 `flex-grow` 值是默认值 `0` ，而且前面关于 Flexbox 的课程中有多次提到过，Flex 项目的 `flex-basis` 最终计算值会受 Flex 容器大小（剩余空间和不足空间）、Flex 项目扩展因子（`flex-grow`）和 Flex 项目的收缩因子（`flex-shrink`）等参数影响。

同样的，`min-content` 、`max-content` 也可以用于 CSS Grid 的布局中，可以用来设置网格轨道的尺寸。它们可以用于 `grid-template-columns` 、`grid-template-rows` 、`grid-auto-columns` 和 `grid-auto-rows` 属性上。它们运用于网格轨道的设置上要比用于 CSS Flexbox 布局中的 `flex-basis` 简单得多。

另外，**CSS 的** **`fit-content`** **用于网格轨道尺寸设置时会被视为一个无效值** ，但在网格布局布局中，有一个 `fit-content(<length-percentage>)` 函数可用于设置网格轨道尺寸。我们需要注意的是 `fit-content` 和 `fit-content(<length-percentage>)` 是完全不同的特性。

有关于 `fit-content()` 函数在网格中的使用，更详细的介绍可以阅读前面的课程《[13 | 可用于 Grid 布局中的函数](https://juejin.cn/book/7161370789680250917/section/7161624041885958151) 》。除此之外，`min-content` 和 `max-content` 还可以和 `minmax(MIN, MAX)` 函数结合起来使用，有关于这方面更详细的介绍，也在前面的课程（《[13 | 可用于 Grid 布局中的函数](https://juejin.cn/book/7161370789680250917/section/7161624041885958151) 》）中详细介绍，这里不再重复阐述。

接下来，将 `grid-template-columns` 分别取 `auto` 、 `min-content` 和 `max-content` 值，来设置列网格轨道尺寸为例。

记得在 《[18 | 使用 Grid 构建经典布局：10 种经典布局](https://juejin.cn/book/7161370789680250917/section/7161624078397210638) 》这节课中，介绍网格轨道尺寸设置为 `auto` 和 `1fr` 差别时介绍过，`grid-template-rows` 和 `grid-template-columns` 属性取值为 `auto` 时，意味着网格轨道占用可用空间来容纳内容。如果网格容器有剩余空间，那么 `auto` 是很“贪婪的”，它将占用容纳内容的空间加上它可以占用的最大剩余空间。

- **作为最大值** ：将是以网格轨道的网格项目的最大内容为最终计算值，与 `max-content` 不同的是，它允许通过对齐属性来扩展网格轨道尺寸。
- **作为最小值** ：将是以网格轨道中的最大网格项目的最小尺寸为最终计算值，这主要由网格项目的 `min-width` 、`min-height` 或它们对应的逻辑属性 `min-inline-size` 或 `min-block-size` 指定。

简单地说，比如下面这个示例：

```CSS
.grids {
    display: grid;
    grid-template-columns: repeat(3, auto);
}
```

按照对 `auto` 的一般理解，当 `grid-template-columns` 在设置列网格轨道尺寸的值为 `auto` 时，每列的宽度应该是所在列中网格项目内容最多的尺寸。应该内容有多长，列网格轨道尺寸就有多大，相当于 `max-content` ：

![img](./assets/2a21fc2e46bb49feb76ef0202ccdd2cb~tplv-k3u1fbpfcp-zoom-1.gif)

需要记住的是，**当网格项目内容相同时，那么** **`auto`** **和** **`1fr`** **具有相同的效果，即平均占用网格容器可用空间。**

就上例而言，如果将所有列网格轨道的尺寸都换成 `min-content` ，它最终的尺寸也像是 Flexbox 布局一样，以最长字符串长度为最终长度：

![img](./assets/15e4562aa578496e8cab30eeabe688b3~tplv-k3u1fbpfcp-zoom-1.jpeg)

当网格列轨道尺寸都设置为 `max-content` 时，要是网格容器空间小于所有网格项目最大尺寸（`max-content`）总和，网格项目会溢出网格容器：

![img](./assets/90304d3d716d4a46b72593359c4812d8~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/wvXbZmM>

`max-content` 它代表了单元格“最理想的大小”。单元格最小的宽度围绕着它的内容。例如，如果单元格的内容是一个句子，理想的单元格的宽度是整个句子的长度，无论长度是多少，单元格的内容都不会断行。

正如前面课程《[13 | 可用于 Grid 布局中的函数](https://juejin.cn/book/7161370789680250917/section/7161624041885958151) 》中所述，在 `minmax()` 函数中的最小值和最大值都设置 `min-content` ，也更好地说明了 `min-content` 和 `max-content` 的差异：

![img](./assets/bc64b27acd7446efbfecd81e7b832ca4~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/hkdc/full/EXRjpJ>

有一点需要注意，当网格项目中的内容是一张图片 `<img>` ，而且该图片设置了:

```CSS
img {
    display: block;
    max-width: 100%;
    height: auto;
}
```

那么当网格轨道的尺寸被设置为 `min-content` 时，那么 `img` 会被视为 `width: 0` ，造成图片不可见：

![img](./assets/5133919b879045b8ab53f8366d36be15~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/NWzVZpe>

避免这种现象出现，最好的办法是使用 `minmax()` 函数，并且将该函数的 `MIN` 值设置一个具体的值，比如 `100px` ，然后将 `MAX` 值设置为 `min-content` ：

![img](./assets/b0737a2328ac405e8c933dee93c8dfdb~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/eYKawep>

上面我们主要介绍了 CSS 内在尺寸和外在尺寸理论方面的知识，接下来我们一起来看几个真实场景的使用案例。

先来看一个带标题的图片示例，标题的宽度是其父元素宽度的 `100%` （默认情况之下），因为标题它自身就是一个块元素：

```HTML
<figure>
    <img src="thumbnail.jpg" alt="" />
    <figcaption>
        <p>欢迎来到小册，该小册全面介绍现代 Web 布局技术。这一节主要介绍的是内在 Web 布局，我们将详细介绍内在 Web 布局将会使用到的 CSS 技术，比如 min-content、max-content、 fit-content 等特性的使用 ...</p>
    </figcaption>
</figure>
```

如果你需要让图片宽度和标题宽度一样宽，原本以为在 `figure` 上设置 `width` 的值为 `max-content` 即可：

```CSS
figure {
    width: max-content;
}

figure img {
    display: block;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}
```

最终渲染出来的结果和我们所期待的是有所差异的。

通过前面的内容，可以知道，当 `figure` 的 `width` 设置为 `max-content` 时，它的宽度等于其内容：

- 当 `img` 的原始宽度大于图片标题（`figcaption`）时，将会以 `img` 的原始宽度作为 `figure` 的宽度；
- 当 `img` 的原始宽度小于图片标题（`figcaption`）时，将会以 `figcaption` 的内容宽度做为 `figure` 的宽度。

只有当 `img` 的原始宽度和 `figcaption` 内容宽度相等之时，才能实现图片和标题一样宽度的效果。要实现这个效果，需要将 `figure` 的 `width` 设置为 `fit-content` ：

```CSS
figure {
    width: fit-content;
    
    /* 它等同于 */
    width: auto;
    min-width: min-content;
    max-width: max-content;
}
```

如此一来，如果图像的宽度非常大，它也不会超过视窗宽度：

![img](./assets/e3a6a4b7c90f410295f26ef46d8970d8~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/ZERNdjQ>

接着看一个带有下划线的标题示例：

![img](./assets/9de7db63d5524b1884a81ef62b48d0c3~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/BaVgoar>

以往我们实现下划线的宽度和标题内容等宽效果，会像下面这样来实现。第一种方式对标题 `h2` （它是一个块元素）改变视觉格式化模型，即改变它的 `display` 值，比如：

```CSS
h2 {
    display: inline-flex;
    padding-bottom: .25em;
    border-bottom: 2px solid;
}
```

也有不少同学会选择在 `h2` 中套一个内联元素，比如 `span` ：

```HTML
<h2>
    <span>爆款直降</span>
</h2>
```

然后在内联元素 `span` 设置边框效果：

```CSS
h2 span {
    padding-bottom: .25em;
    border-bottom: 2px solid;
}
```

现在我们可以在不额外嵌套内联标签元素，并且不改变元素的 `display` 属性值时，直接将元素的 `width` 设置为 `fit-content` 就可以实现相同的 UI 效果：

```CSS
h2 {
    width: fit-content;
    padding-bottom: .25em;
    border-bottom: 2px solid;
}
```

如果有一天，设计师希望你实现的页面导航栏的宽度不再是和视窗宽度等宽，而是希望由内容的多少来决定导航栏的大小。现在，你只需要将导航栏容器的宽度 `width` 设置为 `max-content` 即可，你也不用再担心因为内容改变，来不断调整 `width` 的值：

```CSS
header {
    width: max-content;
}
```

![img](./assets/2f9b1187af154440b1e3790104434c26~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/QWxXjKY>

接着来看一个 Todo List App 页面的布局：

![img](./assets/0502d0cf947e43cfb96ec4d51588ec13~tplv-k3u1fbpfcp-zoom-1.jpeg)

我们可以使用 CSS Grid 来构建该页面的布局：

```CSS
.todo--lists {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
}
```

![img](./assets/6462c64b9c0b4741be8b6e2fe3159b30~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/WNyqyxj>

要知道，当 `grid-template-columns` 和 `grid-template-rows` 中同时出现 `auto` 和 `fr` 时，那么 `fr` 将“赢得”网格容器剩余空间的战斗，而 `auto` 将失去了它的宽度值，缩小到其元素内容所需的空间。**剩下的网格空间被分成由** **`fr`** **单位定义的列或行，定义为** **`auto`** **的列或行不会获得更多的剩余空间** 。

事实上，要实现该布局效果，除了上面方法之外，还可以使用下面这两种方式，能达到同等布局效果：

```CSS
.todo--lists {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    
    /* 或者 */
    grid-template-rows: min-content minmax(0, 1fr) min-content;
    
    /* 或者 */
    grid-template-rows: min-content auto min-content;
}
```

![img](./assets/2056dd42c0974733bafb4ad11e9bca74~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/WNyqKvK>

在顶部和底部使用 `min-content` ，那么顶部和底部的高度就不会超过它们各自的内容所占高度！基于该原理，Web 中很多应用程序都可以采用相似的布局技术，比如市面上的一些聊天应用（如微信）：

![img](./assets/9f7eb221accf4387b18cca38b2a3c780~tplv-k3u1fbpfcp-zoom-1.jpeg)

拿其中一个为例：

![img](./assets/1fbc49287e6b437d95c661eae9bb356d~tplv-k3u1fbpfcp-zoom-1.jpeg)

构建上图，你可能会需要下面这样的一个 HTML 结构：

```HTML
<div class="chat">
    <!-- 最左侧（第一列）：菜单列  -->
    <nav>
        <!-- 用户头像 -->
        <figure></figure>
        
        <!-- 工具列表 -->
        <div class="tools--bar">
        </div>
    </nav>

    <!-- 中间列（第二列）：用户列表 -->
    <aside class="users">
        <!-- 搜索表单 -->
        <form class="search"></form>
        <ul class="user--lists"></ul>
    </aside>
    
    <!-- 最右侧（第三列）： 聊天内容 -->
    <main class="message--wrapper">
        <!-- 页头 -->
        <header></header>
        
        <!-- 聊天区 -->
        <section class="messages"></section>
        
        <!-- 页脚: 发信息 -->
        <footer></footer>
    </main>
</div>
```

同样使用 CSS Grid 来构建布局，我们可以像下图这样来定义网格列轨道和行轨道：

![img](./assets/bbc08636fe60445c8d65a36ee15cafa3~tplv-k3u1fbpfcp-zoom-1.jpeg)

```CSS
.chat {
    display: grid;
    grid-template-columns: min-content fit-content(24rem) minmax(0, 1fr);
    grid-template-rows: min-content minmax(0, 1fr) min-content;
}
```

配合 CSS Grid 的子网格 `subgrid` 会让你的布局更灵活。上图中，我们可以让 `nav` 、`aside` 和 `main` 都跨三行，并且将它们的 `grid-template-rows` 都设置为 `subgrid` 。

```CSS
nav,
aside, 
main {
    grid-row: span 3;
    display: inherit;
    grid-template-rows: subgrid;
}

nav {
    grid-column: 1;
}

aside {
    grid-column: 2;
}

main {
    grid-column: 3;
}
```

初步结果出来了：

![img](./assets/386b3a44326e47bc9fe2856ce296edcf~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/KKejxRg>

注意，这是一个未完成的案例，我希望没完成的任务由小伙伴们自己接着完成！

最后再来看一个内在尺寸的用例。下图这种英雄（Hero）区域的设计在 Web 页面上很常见：

![img](./assets/6eeff8ced60d4f1ea5437bb0ad85bbb7~tplv-k3u1fbpfcp-zoom-1.jpeg)

上图虚线框框起来的部分包含一个“标题”和“描述文本”。如果设计师期望“**描述文本的宽度不要超过标题的宽度**”。以往都是将“标题”和“描述文本”设置同一个宽度值，但这样做有着明显的缺陷，因为内容是动态的，很有可能输出的标题内容宽度会超出所设置的宽度，造成标题断行。严重的甚至会影响设计的美观，这估计是设计师无法接受的。为了满足设计的需求，我想也有不少同学会借助 JavaScript 脚本来实现该设计需求。

现在，我们使用 CSS 的内在尺寸就可以轻松实现上述的需求。我们只需要在“标题”和“描述文本”外部同时嵌套一个包裹元素，比如：

```HTML
<section class="hero__content">
    <h3 class="hero__title">CSS is awesome</h3>
    <p class="hero__describe">CSS is awesome, it's simple but it's not easy! Many developers have a love-hate relationship with CSS!</p>
</section>
```

然后，把容器 `.hero__content` 的 `width` 设置为 `min-content` ，同时将标题 `.hero__title` 的 `width` 设置为 `max-content`：

```CSS
.hero__content {
    width: min-content;
    text-align: center;
}

.hero__title {
    width: max-content;
}
```

![img](./assets/2495df9f89d1427e8e291df4a6999596~tplv-k3u1fbpfcp-zoom-1.jpeg)

看上去很完美了，但在移动端还是要对标题 `.hero__title` 的 `width` 做相应处理的，不然会让页面出现水平滚动条。为此，你可以考虑使用 CSS 媒体查询，调整 `.hero__title` 的 `width` 值，比如：

```CSS
@media only screen and (max-width: 441px) {
    .hero__title {
        width: min(100% - 1rem, 400px);
    }
}
```

![img](./assets/56acf9cf5cc9417792bcd137b0ac3424~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/KKeOMVG>

### 图片的适配处理

响应式 Web 设计（RWD）其中有一个最大的特色，那就它具有灵活的图片（Flexible Images）。事实上，接触过响应式设计的同学都知道，在构建响应式 Web 设计时，图片的适配处理是较为麻烦的，时常令 Web 开发者感到头痛。其中原委这里不展开了，后面关于响应式 Web 设计的课程中会有相关的阐述。

对于大多数 Web 开发者，处理响应式 Web 布局中的图片适配，最简单粗暴的方式就是：

```CSS
img {
    display: block;
    max-width: 100%;
    height: auto;
}
```

它能满足大部分的场景。但有的时候会因为图片尺寸小于容器尺寸，造成图片拉伸扭曲：

![img](./assets/b5ce4eb531474d5593ff8969038a1688~tplv-k3u1fbpfcp-zoom-1.png)

其实，如果希望做得更好，我们应该利用更现代的 Web 技术来处理图片的适配处理。比如 `img` 图片元素，它新增了 `object-fit` 属性设置 `img` 图片样式：

![img](./assets/dd0e4c3ebbb7424baea36bb2a26603f1~tplv-k3u1fbpfcp-zoom-1.jpeg)

对于背景图片，也有一个相似的属性 `background-size` ：

> `background-size` 取值为 `cover` 和 `contain` 的表现与 `object-fit` 取值为 `cover` 和 `contain` 相同。但 `oject-fit` 不能像 `background-size` 那样，取 `<length-percentage>` 值。

大家需要注意的是，`background-size` 、`object-fit` 包括从未介绍过的 `mask-size` 取 `cover` 和 `contain` 值时，它的计算都是复杂的。它们如何计算已经超出我们这个课程的范畴了，这里不详细阐述。但是为了满足大家的好奇心，我把 `cover` 和 `contain` 计算所涉及到的公式告诉大家。就拿 `background-size` 为例吧：

![img](./assets/2f57050b208d47dab5f52bfc3fceac44~tplv-k3u1fbpfcp-zoom-1.jpeg)

`background-size` 取值为 `cover` 时，背景图片的尺寸计算：

```JavaScript
/** 
* Rimage     » 背景图片内在宽高比 » Rimage = Wimage ÷ Himage 
* Wimage     » 背景图片宽度（原始宽度） 
* Himage     » 背景图片高度（原始高度） 
* W'         » 计算后的背景图片宽度 
* H'         » 计算后的背景图片高度 
* R'         » 计算后的背景图片宽高比，与背景图片内在宽高比相等 » R' = Rimage * Wcontainer » 容器宽度（容器元素的width） 
* Hcontainer » 容器高度（容器元素的height） 
**/ 
if (Rimage ≥ Rcontainer) { 
    H' = Hcontainer 
    W' = H' x Rimage = Hcontainer x Rimage 
} else { 
    W' = Wcontainer 
    H' = W' ÷ Rimage = Wcontainer ÷ Rimage 
} 
```

再来看 `background-size` 取值为 `contain` 的效果：

![img](./assets/ba25d84b379c44ffbfe859aed83a507e~tplv-k3u1fbpfcp-zoom-1.jpeg)

它和 `cover` 是惊人的相似，从计算来讲，`contain` 的逻辑和 `cover` 刚好相反：

```JavaScript
/** 
* Rimage     » 背景图片内在宽高比 » Rimage = Wimage ÷ Himage 
* Wimage     » 背景图片宽度（原始宽度） 
* Himage     » 背景图片高度（原始高度） 
* W'         » 计算后的背景图片宽度 
* H'         » 计算后的背景图片高度 
* R'         » 计算后的背景图片宽高比，与背景图片内在宽高比相等 » R' = Rimage 
* Wcontainer » 容器宽度（容器元素的width） 
* Hcontainer » 容器高度（容器元素的height） 
**/ 
if (Rimage ≥ Rcontainer) { 
    W' = Wcontainer 
    H' = W' ÷ Rimage = Wcontainer ÷ Rimage 
} else { 
    H' = Hcontainer 
    W' = H' x Rimage = Hcontainer x Rimage 
} 
```

|                           | **`cover`**                                                | **`contain`**                                              | **描述**                           |
| ------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------- |
| **`Rimage ≥ Rcontainer`** | `H' = Hcontainer;``W' = H' x Rimage = Hcontainer x Rimage` | `W' = Wcontainer;``H' = W' ÷ Rimage = Wcontainer ÷ Rimage` | 背景图片是横屏的，`width > height` |
| **`Rimage ≤ Rcontainer`** | `W' = Wcontainer;``H' = W' ÷ Rimage = Wcontainer ÷ Rimage` | `H' = Hcontainer;``W' = H' x Rimage = Hcontainer x Rimage` | 背景图片是竖屏的，`width < height` |

![img](./assets/a69e72c2fd4047c1858e3416536a8da0~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/MWXNjGb>

有一点需要注意的是，这里提到的计算公式只适用于具有内在尺寸和比例的背景图片，比如位图。如果我们把背景图片换成 `<gradient>` 或部分矢量图，就不适用了。

除了在 CSS 方面为图片适配处理提供了更多属性之外， HTML 也有一定的革新，比如 `<img>` 标签新增了 `srcset` 、`sizes` 等新属性，另外还新增了 `<picuture>` 标签元素。让 Web 开发者有了更多的选择：

![img](./assets/9ef8d6aeec2f42f4ab11125d128b7de8~tplv-k3u1fbpfcp-zoom-1.png)

> **注意，有关于** **`<img>`** **的** **`srcset`** **和** **`sizes`** **特性以及** **`<picture>`** **已超出本节课的范畴，因此不在这里做过多阐述。感兴趣的同学，可以自己搜索相应关键词进行扩展阅读！**

对于内在 Web 设计，上述图片适配（用于 RWD 中灵活的图片）相关技术同样也可以用于内在 Web 设计（IWD）中。而且根据情况，**IWD 除了允许你使用灵活的图片之外**，**还可以使用固定尺寸的图片**。

使用一个示例来阐述 IWD 设计中为什么还可以使用固定尺寸的图片，以及它和 RWD 中灵活的图片技术差异。

![img](./assets/3c671faea8e44733a4996d16b4d1fcf3~tplv-k3u1fbpfcp-zoom-1.jpeg)

就我个人经验来看，实现上面页头的效果，对于 Logo 图，基本上是在 Logo 外套一个标签元素，并且在该元素上显式设置具体的宽高值，比如：

```CSS
.logo__wrapper {
    width: 120px;
    aspect-ratio: 1;
}

.logo__wrapper img {
    max-width: 100%;
    height: auto;
}
```

或者：

```CSS
.logo__wrapper {
    width: 120px;
    aspect-ratio: 1;
}

.logo__wrapper img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

看上去都没有问题。前提条件是 Web 开发者知道 Logo 图像的尺寸大小。突然，设计师的需求变了，他们需要 Logo 的图像尺寸变大或变小， Web 开发者不得不重新根据设计需求去手动调整 Logo 图像容器的尺寸，比如：

```CSS
/* Logo 变小 */
.logo__wrapper {
    width: 80px;
    aspect-ratio: 1;
}

/* Logo 变大 */
.logo__wrapper {
    width: 200px;
    aspect-ratio: 1;
}
```

简单地说，即使在响应式 Web 设计中，只要设计对 Logo 尺寸有所调整， Web 开发者不得不跟进，手动调整尺寸。这其实也是响应式设计或者说常规情况之下，Web 开发者不得不去做的事情。

庆幸的是，如果采用内在尺寸来构建同样的 Web 布局，事情会变得容易得多。我们只需要将 Logo 容器的尺寸定义为 `max-content` 即可，这样一来，不管设计师有何需求变化，都可以自动匹配：

```CSS
.logo__wrapper {
    width: max-content;
    aspect-ratio: 1;
}
```

在该示列中，我们定义网格轨道的时候，是这样定义的：

```CSS
header {
  display: grid;
  grid-template-columns: max-content auto auto;
}
```

你可以尝试一下，不管 Logo 尺寸怎么变化，Web 开发者都不需要去做额外的事情，整个导般布局中的 Logo 随时都可以符合设计师所需要的要求：

![img](./assets/ec2d4a17dfd54a8ea4c4d84842e67ce3~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/ExRqgOo>

我想再次提醒 Web 开发者的是，不管是 RWD 还是 IWD 中，图片的处理都不仅局限于课程中提到的相关的技术，要较好地处理图片的适配处理，我们所要涉及到的知识点是很多的，只不过这些知识点不适合于这里跟大家展开讨论。如果大家感兴趣，我们可以私下讨论。

### 不依赖 CSS 媒体查询让 Web 具备响应式能力

在以往的技术条件之下，我们要构建一个具有响应式能力的 Web 页面，基本上离不开 CSS 媒体查询相关的特性。庆幸的是，现在，在特定的环境之下，我们可以脱离 CSS 媒体查询的特性。最为典型的就是 CSS Grid 布局中的 **RAM**  布局技术，我们不需要任何 CSS 媒体查询相关的特性就可以达到相应的效果：

```CSS
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 400px), 1fr));
    gap: 1rem;
}
```

这是 CSS Grid 布局技术中最为典型的布局之一。比如下面所示的效果，没有依赖任何 CSS 媒体查询特性，也能让每张卡片的布局适配任何终端：

![img](./assets/3bd2c5f81d4f4d28917c33e5a6586090~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/GRGVNPj>

同样的，使用 CSS Flexbox 来布局，在某些情形之下，同样可以不依赖 CSS 媒体查询，可以响应不同环境下的布局效果：

![img](./assets/f09b8741525d4207b6de3b24923cf5df~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/WNyVRrJ>

如果你掌握了前面的 CSS Flexbox 课程的知识，构建上面的效果，对你来说是件非常容易的事情：

```HTML
<div class="card">
    <div class="media"></div>
    <div class="content"></div>
</div>
```

```CSS
.card {
    display: flex;
    flex-wrap: wrap;
    background: #27536d;
}

.card > * {
    flex: 1 1 280px;
}

.media {
    background: black;
    min-height: 280px;
}
```

在上面示例的基础上，稍微调整样式，就可以实现下图这样的布局效果，同样是不依赖任何 CSS 媒体查询就可以实现：

![img](./assets/5b8ba04adeeb43f8a9d5c57870aef1b5~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/KKeOaar>

```CSS
body {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 calc(280px + 1rem);
}

.card > * {
    flex: 1 1 280px;
}
```

### 内在 Web 设计的上下文之间间距

通过前面的学习，我们了解了元素的 `width` 设置 `min-content` 、`max-content` 和 `fit-content` 的差异，也清楚在 CSS Flexbox 和 CSS Grid 布局中不依赖任何 CSS 媒体查询，也可以让 Web 布局具有一定的响应式能力，尤其是 CSS Grid 布局的 RAM 布局技术。

除此之外，在 CSS Grid 布局中还可以使用 `fit-content(<length-percentage>)` 。使用 `fit-content()` 函数意味着我们可以提供自己的**首选最大值**，就像下面这个示例一样，侧边栏的最大值为 `20ch` ：

```CSS
body {
    display: grid;
    grid-template-columns: fit-content(20ch) minmax(0, 1fr);
    gap: 1rem; 
}
```

![img](./assets/51f4b1e3546b44b7891484aa6920da8e~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/yLEmMYN>

总的来说，这条规则产生的行为是，如果容器（浏览器视窗）有足够空间，侧边栏宽度是 `20ch` ，如果没有足够的空间（或受其他元素挤压），侧边栏最小的宽度也将是 `min-content`。

我们可以通过再次包含自定义属性来提高此规则的灵活性。比如：

```CSS
body {
    --sidebar-max: 220px;
    display: grid;
    grid-template-columns: fit-content(var(--sidebar-max, 20ch)) minmax(50%, 1fr);
    gap: 1rem;
}
```

回过头来想，我们现在知道了内在 Web 设计具备：

- 收缩和扩展：设计可适应可变空间的变化；
- 灵活性：将 CSS Flexbox 和 CSS Grid 与更多新的 CSS 单位特性结合使用，使我们的 Web 布局能够以不同的方式适应可用空间。

除了上面这些，我们还可以使用 CSS 的比较函数 `min()` 、`max()` 和 `clamp()` 让元素尺寸更灵活。就拿 `clamp()` 函数来说，它接受三个值：最小值、理想值和最大值。它允许你提供灵活的约束，在 CSS 中它也是一个多功能的 CSS 函数，也是内在 Web 设计中的关键。它最为巧妙之处在于，在设置理想值时，必须使用视窗单位（或与其类似的动态单位）来触发该函数中的最小值和最大值之间的过渡。比如：

```CSS
.title {
    font-size: clamp(1rem, 4vw + 2rem, 3rem);
}
```

它的意思是，`.title` 的 `font-size` 值为 `clamp(1rem, 4vw + 2rem, 3rem)` ，其中：

- 最小值 `MIN = 1rem`；
- 最大值 `MAX = 3rem`；
- 理想值 `VAL= 4vw + 2rem` 。

使用 `clamp(MIN, VAL, MAX)` 函数时，具体返回值会根据 `MIN` 、`VAL` 和 `MAX` 三个值比较得出：

- 如果 `VAL` 在 `MIN` 和 `MAX` 之间，则使用 `VAL` 作为函数的返回值；
- 如果 `VAL` 大于 `MAX`，则使用 `MAX` 作为函数的返回值；
- 如果 `VAL` 小于 `MIN`，则使用 `MIN` 作为函数的返回值。

也就是说，最终 `font-size` 值将会根据 `4vw` 值来决定，字体大小将随着浏览器视窗大小的增大和缩小而调整，但它永远不会小于 `1rem` 或大于 `3rem` 。

与其类似的还有 `min()` 和 `max()` 函数，它们都可以提供上下文相关的选项，最终返回较为适合的值。简单地说，它们都可以接受两个或多个值。

- 对于 `min()` 函数，浏览器将使用最小的计算值，即 `min()` 函数返回参数列表中的最小值；
- 对于 `max()` 函数，浏览器将使用最大的计算值，即 `max()` 函数返回参数列表中的最大值。

它们还拥有另外一个特性，不需要嵌套 `calc()` 函数就可以做四则运算。比如：

```CSS
.box {
    width: min(100vw - 3rem, 72ch);
}

.box {
    width: max(100vw - 3rem, 72ch);
}

.box {
    font-size: clamp(1rem, 3vw + 1.5rem, 2rem)
}
```

> 注意，这是有关于 `min()` 、`max()` 和 `clamp()` 函数最基本的使用，但这里不深入介绍，更详细的内容将会放在后面的“响应式 UI”的课程中介绍。

先抛开 `min()` 、`max()` 和 `clamp()` 更深入的介绍不说。事实上，它们都是内在 Web 设计中很重要的一部分。另外，到目前为止，我们所讨论的是如何影响元素尺寸（它如何占用空间的和大小）。还未讨论如何影响元素之间的间距，比如：

- 相邻元素之间的间距，对应 CSS 中 `margin` 的使用；
- 内部元素与父元素（或祖先元素）之间的间距，对应 CSS 中的 `padding` 的使用。

就内在 Web 设计，我们有必要熟悉或掌握它们之间的关系，因为它将帮助我们最大限度地利用内在 Web 设计的特性。比如，我们可以使用 `min()`、`max()` 和 `clamp()` 几个比较函数来设置元素之间的间距，`padding` 或 `margin`，甚至是边框的粗细 `border`，圆角的大小 `border-radius` 等。

```CSS
:root {
    --padding-sm: clamp(1rem,    3%, 1.5rem);
    --padding-md: clamp(1.5rem,  6%,   3rem);
    --padding-lg: clamp(3rem,   12%,   6rem);

    --margin-sm: min(2rem,  4vh);
    --margin-md: min(4rem,  8vh);
    --margin-lg: min(8rem, 16vh);

    --gap-sm: clamp(1rem,   3vmax, 1.5rem);
    --gap-md: clamp(1.5rem, 6vmax,   3rem);
    --gap-lg: clamp(3rem,   8vmax,   4rem);
} 

.box {
    padding-inline: var(--padding-md);
    margin-block: var(--margin-md);
}
```

利用该特性，我们就可以很容易实现类似一些具备条件判断的 UI 效果。比如在窄屏幕下，元素的圆角是 `0px` ，宽屏的时候是 `8px` ：

![img](./assets/a138d24fb8e14de4ab40b750f8577005~tplv-k3u1fbpfcp-zoom-1.jpeg)

```CSS
:root { 
    --w: 760px; 
    --max-radius: 8px; 
    --min-radius: 0px; /* 这里的单位不能省略 */ 
    --radius: (100vw - var(--w)); 
    --responsive-radius: clamp( var(--min-radius), var(--radius) * 1000, var(--max-radius) ); 
} 

.box { 
    border-radius: var(--responsive-radius, 0); 
}
```

![img](./assets/3559cef5fabe420a8f98e1b48b803d23~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/ExRqmvd>

我们还可以将 `min()` 和 `max()` 函数结合起来，实现等同的效果：

![img](./assets/5b6f2012cbe7457ca7776898f0bc6696~tplv-k3u1fbpfcp-zoom-1.jpeg)

```CSS
.box { 
    --min-radius: 0px; 
    --max-radius: 8px; 
    --ideal-radius: 4px; 
    border-radius: max( 
        var(--min-radius), 
        min(var(--max-radius), (100vw - var(--ideal-radius) - 100%) * 9999) 
    ); 
}
```

![img](./assets/84ceebc1ca6e4410a0cfad97608d6dd4~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/VwdobRv>

甚至更为复杂的 UI，我们都可以采用这套技术体系来构建，比如：

![img](./assets/fa010ac589904fd1922677c504cedf36~tplv-k3u1fbpfcp-zoom-1.gif)

> **注意，上图这个效果是响应 UI 的最终效果，将会在后面花一节课来专门介绍，CSS 如何构建上图这种响应 UI 的布局技术** 。

### CSS 容器查询

内在 Web 设计还有一个可用的 CSS 特性就是 **CSS 容器查询特性** 。该特性一直以来都是 Web 开发者最为期待的特性：

![img](./assets/3ae8c541a4d54761b0b19da45a208d91~tplv-k3u1fbpfcp-zoom-1.jpeg)

> 自 2019 年开始，每年年底都会有一份关于 CSS 发展状态相关的报告（[2019](https://2019.stateofcss.com/)、[2020](https://2020.stateofcss.com/en-US/) 和 [2021](https://2021.stateofcss.com/en-US/)），其中 CSS 容器查询一直以来位居榜首！

比如上面，响应式圆角的效果，如果我们使用 CSS 容器查询，可以像下面这样来编写：

```CSS
.card--container { 
    container-type: inline-size; 
} 

.card { 
    border-radius: 0; 
} 

@container (width > 700px) { 
    .card { 
        border-radius: 8px; 
    } 
}
```

![img](./assets/8c272065c28a4bd8a634ab518d992cec~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/wvXVeMp>

你可能现在不知道 CSS 容器查询 `@container` 特性是怎么一回事，那也不用担心，因为我们在介绍下一代响应式 Web 设计的时候有专门一节课会介绍该特性。如果你实在等不及，可以先行了解 CSS 容器查询特性是什么东东！

## 案例

[@Jen Simmons 在她分享的 PPT](https://talks.jensimmons.com/15TjNW/slides) 中介绍了一些如何使用 CSS Flexbox 和 CSS Grid 布局技术实现内在 Web 设计的案例。你可以从 labs.jensimmons.com 中获取到相关的案例：

![img](./assets/0597d05feff94aee9920504abba9bfe2~tplv-k3u1fbpfcp-zoom-1.jpeg)

另外，使用课程中介绍的 CSS 技术，你还可以实现类似上图中这种杂志封面的布局效果：

![img](./assets/67e81b382ed445289e6ca08a3f9bfe96~tplv-k3u1fbpfcp-zoom-1.jpeg)

看上去是不是很有挑战性，我想很多 Web 开发者都会认为上图中的效果是很难使用 CSS 技术来实现的。事实上，现在使用 CSS 实现起来已经不是难事了。比如下图这个示例：

![img](./assets/0868b83797054b19adda6b88ecb4f56d~tplv-k3u1fbpfcp-zoom-1.jpeg)

构建上图这种效果，你可能需要一个像下面这样的 HTML 结构：

```HTML
<header role="banner">
    <h1 class="site__name">
        <span>G</span>
        <span>r</span>
        <span>a</span>
        <span>p</span>
        <span>h</span>
        <span>i</span>
        <span>c</span>
        <span>D</span>
        <span>e</span>
        <span>s</span>
        <span>i</span>
        <span>g</span>
        <span>n</span>
    </h1>
    <nav role="navigation" class="main__menu">
        <ul class="menu">
            <li><a href="">Home</a></li>
            <li><a href="">Episodes</a></li>
            <li><a href="">Guests</a></li>
            <li><a href="">Subscribe</a></li>
            <li><a href="">About</a></li>
        </ul>
    </nav>
    <img src="https://picsum.photos/300/600?random=21" alt="Beyonce looking fierce">
</header>
```

你可能发现了，我们把 “Graphicdesign” 中每个字母放在一个 `<span>` 元素中，这样做是因为效果中的每个字母都在不同的位置。

首先我们可以在 `header` 元素上使用 `grid-template-columns` 和 `grid-template-rows` 属性定义一个四列五行（`4 x 5`）的网格，并且使用 `gap` 设置网格轨道之间的间距：

```CSS
header {
    display: grid;
    grid-template-columns: 0 max-content 5rem auto;
    grid-template-rows: 1.5rem 50px min-content auto auto;
    gap: 0 1rem;
}
```

![img](./assets/99ff70a1e96c437daeeaaac5291ed2d0~tplv-k3u1fbpfcp-zoom-1.jpeg)

使用 `grid-row` 和 `grid-column` 将元素放置到需要的位置：

```CSS
.site__name {
    grid-column: 1 / 3;
    grid-row: 1 / 5;
}

.main__menu {
    grid-column: 3 / 5;
    grid-row: 3;
}

header img {
    grid-column: 3 / 5;
    grid-row: 3 / 6;
}
```

![img](./assets/0a139e52490a4bce82ebc701986c19ed~tplv-k3u1fbpfcp-zoom-1.jpeg)

现在基本布局已经有了，我们还需要在 `h1.site__name` 上再创建一个网格，使用同样的方式来放置“Graphicdesign” 词中的每个字母：

```CSS
.site__name {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
}

/* G */
.site__name span:nth-child(1) { 
    grid-column: 2;
    grid-row: 1;
}

/* R */
.site__name span:nth-child(2) { 
    grid-column: 3;
    grid-row: 1;
}

/* A */
.site__name span:nth-child(3) { 
    grid-column: 6;
    grid-row: 1;
}

/* P */
.site__name span:nth-child(4) { 
    grid-column: 3;
    grid-row: 2;
}

/* H */
.site__name span:nth-child(5) { 
    grid-column: 4;
    grid-row: 2;
}

/* I */
.site__name span:nth-child(6) { 
    grid-column: 5;
    grid-row: 3;
}

/* C */
.site__name span:nth-child(7) { 
    grid-column: 6;
    grid-row: 3;
}

/* D */
.site__name span:nth-child(8) { 
    grid-column: 1;
    grid-row: 4;
}

/* E */
.site__name span:nth-child(9) { 
    grid-column: 2;
    grid-row: 4;
}

/* S */
.site__name span:nth-child(10) { 
    grid-column: 5;
    grid-row: 5;
}

/* I */
.site__name span:nth-child(11) { 
    grid-column: 3;
    grid-row: 6;
}

/* G */
.site__name span:nth-child(12) { 
    grid-column: 5;
    grid-row: 6;
}

/* N */
.site__name span:nth-child(13) { 
    grid-column: 8;
    grid-row: 7;
}
```

![img](./assets/a5cc567f6e2645be8696ee93066ca721~tplv-k3u1fbpfcp-zoom-1.jpeg)

再加上一些美化的样式规则，整体效果就出来了：

![img](./assets/cb93a711754a47fe83ad7e7215fa2cd4~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/ExRqMXY>

感兴趣的同学，可以使用同样的方法来实现下图这个效果：

![img](./assets/d594dde7bcca42e38b9ddf031bb8f4ff~tplv-k3u1fbpfcp-zoom-1.jpeg)

> 参考链接： labs.jensimmons.com/2019/01-004.html

可能很多同学会说上面示例实用性不强，那我们再来看一个更趋向于工作中的示例吧。比如类似 [An Event Apart](https://aneventapart.com/) 的 [landing pages](https://aneventapart.com/24ways) 的效果：

![img](./assets/08e4a2c4a7064beba12993ae7cbef4ac~tplv-k3u1fbpfcp-zoom-1.image)

我在该示例基础上做了一些调整，接下来将要完成的是像下图这样的一个示例：

![img](./assets/6d0956c58b8a403688c9e7793bd2dcd2~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/JjZgVoE> （请使用 Firefox 浏览器查看，效果更佳）

构建这个效果，我们需要一个 HTML ：

```HTML
<header>
    <h1>An Event Apart:Set yourself Apart.</h1>
    <p>Build your skills in the company of the smartest developers, designers, and strategists in the industry.</p>
</header>
<main>
    <ul class="monoliths">
        <li>
            <a href="">
                <picture>
                  <img src="https://aneventapart.com/assets/img/landing/monoliths/rachel-andrew.jpg" alt="">
                </picture>
                <h4>Rachel Andrew</h4>
                <span>New CSS Features</span>
            </a>
        </li>
    </ul>
</main>
```

首先在 `body` 上定义一个网格，可以让图片展示区域 `main` 占用除 `header` 之外的剩余区域：

```CSS
body {
    display: grid;
    grid-template-rows: auto min-content;
}
```

使用 `grid-row` 和 `grid-column` 分别将 `header` 和 `main` 放置到指定的网格区域：

```CSS
header {
    grid-row: 2 / 3;
}
main {
    grid-row: 1 / 2;
}
```

![img](./assets/d431ef46573c4e9784673125939d9695~tplv-k3u1fbpfcp-zoom-1.jpeg)

同时在 `header` 定义一个网格（它嵌套 `body` 网格中）：

```CSS
header {
    display: grid;
    grid-template-rows: 2rem min-content min-content;
    gap: 1rem;
}
```

![img](./assets/882ceec03a17483b9bb5fb5014b8315c~tplv-k3u1fbpfcp-zoom-1.jpeg)

在这个示例中，使用 `header` 的伪元素 `::after` 绘制了一个斑马线效果，并且使用 `grid-row` 指定其放置的位置：

```CSS
header::before {
    grid-row: 1 / 2;
}
```

`header` 的另外两个子元素，使用的是网格自动放置的方式来指定其位置。

现在剩下的是主区域 `main` 的布局。在分享者列表 `.monoliths` 中重新定义了一个网格，一个 `17 x 3` （`17` 列，`3` 行的网格），每一列的列宽都是 `minmax(0, 1fr)` （相当于 `1fr` ），行网格轨道高度是，图片区域占用剩下区域空间，列表中的标题 `h4` 和描述文本 `span` 占用的高度是根据其自身内容高度来决定，即 `min-content` ：

```CSS
.monoliths {
    display: grid;
    grid-template-columns: repeat(17, minmax(0, 1fr));
    grid-template-rows: auto min-content min-content;
}
```

![img](./assets/946a046f99eb4f80aaea6166547faafd~tplv-k3u1fbpfcp-zoom-1.jpeg)

这里有一点需要特别注意，每个列表项跨越了 `5` 列，并且相邻的列都有一个单元格是相互重叠的：

```CSS
.monoliths li {
    grid-row-start: 1;
    grid-row-end: span 3;
    grid-column-end: span 5;
}

.monoliths li:nth-child(1) {
    grid-column-start: 1;
}

.monoliths li:nth-child(2) {
    grid-column-start: 5;
}

.monoliths li:nth-child(3) {
    grid-column-start: 9;
}

.monoliths li:nth-child(4) {
    grid-column-start: 13;
}
```

![img](./assets/e39d181f48c042e4b6f39dda27e7268c~tplv-k3u1fbpfcp-zoom-1.jpeg)

这样做的主要目的是，为了避免在每个列表项中使用 `clip-path` 来裁剪列表项时，造成较大的空间：

![img](./assets/812008395afe4520a1783b7af775043a~tplv-k3u1fbpfcp-zoom-1.jpeg)

我们真正期望的是 `li` 运用 `clip-path` 达到下图这样的效果，所以需要列与列之间有一个列轨道是相互重叠的：

```CSS
.monoliths li {
    clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
}
```

![img](./assets/acb126f9ad764e5cb040cf37bbf09f85~tplv-k3u1fbpfcp-zoom-1.jpeg)

另外，为了更好控制每一列的参数，图片 `picture` 、标题 `h4` 和描述文本 `span` 能更好的对齐。这里还使用了 CSS Grid 布局中的子网格 `subgrid` 特性。即，在 `li` 上定义了一个网格，并且使用 `subgrid` 特性，继承其父网格行网格轨道的相关参数：

```CSS
.monoliths li {
    display: inherit;
    grid-template-rows: subgrid;
    row-gap: 0.2rem;
}
```

需要注意的是，在该示例中，`<picture>` 、`<h4>` 和 `<span>` 都被包裹在 `<a>` 标签元素内，它们不是 `<li>` 标签的子元素，也就无法成为 `li` 网格（它定义为一个网格）的网格项目。所以，需要显式将 `<a>` 元素的 `display` 的值设置为 `contents` ：

```CSS
.monoliths a {
    display: contents;
}
```

这样做的好处是，可以让 `<picture>` 、`<h4>` 和 `<span>` 变成 `<li>` 网格中的网格项目，它们也可以使用 `grid-row` 和 `grid-column` 来放置位置：

```CSS
.monoliths h4 {
    grid-row: 2;
    grid-column: 1 / -1;
}

.monoliths span {
    grid-row: 3;
    grid-column: 1 / -1;
}

.monoliths li::after {
    grid-row: 2 / 4;
    grid-column: 1 / -1;
    z-index: -1;
}
```

![img](./assets/87d6396392724c28ba6d4c8d34378907~tplv-k3u1fbpfcp-zoom-1.jpeg)

到此，基本布局你就已经完成了。再添加一些装饰性的 CSS 规则，你将完成最终的效果：

![img](./assets/a85d04beb34848b0bacadfe0ff7109df~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/JjZgVoE>

## 小结

花了较长时间和大家一起探讨了内在 Web 设计，主要是通过这些基础性的内容让大家能更好领略到内在 Web 设计的魅力。正如 @Jen 分享当中所说： 内在 Web 设计是 Web 布局的新时代，它超越了响应式设计。我们正在使用 Web 本身作为一种媒介（设计受内容驱动），而不是试图模拟印刷设计（内容以设计为导向）。更为重要的是，内在 Web 布局不仅上下文的流畅，适应性高，还能够在 Web 布局和当前的 CSS 功能集上发挥真正的创造力。
