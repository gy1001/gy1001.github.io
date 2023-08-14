# 15-Grid 布局中的对齐方式

CSS 网格布局除了提供定义网格和放置网格项目的相关属性之外，也提供了一些控制对齐方式的属性。这些控制对齐方式的属性，和 Flexbox 布局中的对齐属性 `justify-*` 、`align-*` 、`*-items` 、`*-content` 、 `*-self` 等是相似的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cfe8d501cbf40e381c262cc65205e10~tplv-k3u1fbpfcp-zoom-1.image)

在网格布局中可以用它们来控制网格项目在内联轴（Inline Axis）和块轴（Block Axis）的对齐方式；也可以用来控制网格轨道在内联轴（Inline Axis）和块轴（Block Axis）的对齐方式。

接下来，在这节课程中，我将演示网格布局中的对齐方式是如何工作的，你会发现很多属性和值与 Flexbox 布局中的用法是类似的（Flexbox 布局对齐方式请参阅读前面课程：《[04 | Flexbox 布局中的对齐方式](https://juejin.cn/book/7161370789680250917/section/7161623670622781471) 》）。不过，网格布局是二维的，Flexbox 布局是一维的，所以你也会发现它们有一些小区别。我们就从处理网格对齐时用到的两条轴线开始吧。

## 网格布局中的轴线

对于大多数开发者来说，他们都知道 Web 有两根轴线：水平方向的  `x` 轴和垂直方向的 `y` 轴。只不过，在 Flexbox 布局中，不再称 `x` 轴和 `y` 轴了，它由 Flexbox 中的主轴（Main Axis）和侧轴（Cross Axis）替代了，并且 Flexbox 的主轴不再绝对的是 `x` 轴，侧轴也不再绝对的是 `y` 轴，它由 `flex-direction` 属性的值来决定：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c65c3b6710e34f3b806096d86c3f9a88~tplv-k3u1fbpfcp-zoom-1.image)

由于网格布局是唯一的二维布局，因此，网格布局中也有两条轴线，这两条轴线既不称为水平的 `x` 轴和垂直方向的 `y` 轴，也不像 Flexbox 布局中称为主轴和侧轴。它们有着新命名的两条轴线，即内联轴（Inline Axis）和块轴（Block Axis）：

- **内联轴（Inline Axis）** ：主要定义网站的文本流方向，也就是文本的阅读方式，CSS 的 `direction` 或 HTML 的 `dir` 会影响内联轴的方向。
- **块轴（Block Axis）** ：主要定义网站文档（元素块）流，CSS 的书写模式 `writing-mode` 会影响块轴的方向。

即，内联轴和块轴会受 CSS 的 `direction` 、`writing-mode` 和 HTML 的 `dir` 属性值的影响，这个有点类似于 Flexbox 布局的主轴和侧轴，不是固定不变的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee6bbb25e80440595cd2b888d685c59~tplv-k3u1fbpfcp-zoom-1.image)

网格布局中的内联轴（Inline Axis）和块轴（Block Axis）可以和网格中的行与列相映射，比如书写模式和阅读模式是 `ltr`（Left-To-Right）时，内联轴也称为行轴（Row Axis），块轴也称为列轴（Column Axis）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa6c0a8b030d479795e307cf8aafbcef~tplv-k3u1fbpfcp-zoom-1.image)

需要注意的是，虽然内联轴（Inline Axis）和块轴（Block Axis）会因 CSS 的书写模式或文档的阅读模式改变，但网格中的行轴和列轴是始终不变的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/116d44dec0a3439390088c8ed8547df1~tplv-k3u1fbpfcp-zoom-1.image)

网格布局中，你就可以沿着这两条轴线来控制网格项目或网格轨道的对齐方式。

> **特别声明，如无特别指出，我们都以书写模式和阅读模式是** **`ltr`** **（Left-To-Right）为例，即可内联轴对应的是行轴，块轴对应的是列轴** 。

## 网格布局中的对齐方式

在 Flexbox 布局中，可以在 Flex 容器的主轴和侧轴方向控制 Flex 项目的对齐方式。在 Grid 布局中，将按照内联轴和块轴两个方向来控制 **网格轨道** 和 **网格项目** 的对齐方式：

- 控制“网格项目”沿块轴方向的对齐属性有： `align-items` 和 `align-self` ，其中 `align-items` 运用于网格容器上，`align-self` 运用于网格项目上。
- 控制“网格项目”沿内联轴方向的对齐属性有：`justify-items` 和 `justify-self` ，其中 `justify-items` 运用于网格容器上，`justify-self` 运用于网格项目上。
- 控制“网格轨道”沿块轴方向对齐的属性有：`align-content` ，该属性运用于网格容器上。
- 控制“网格轨道”沿内联轴方向对齐的属性有：`justify-content` ，该属性运用于网格容器上。

也可以按下面这样的方式来划分：

- **对齐网格项目** ：`justify-items` 和 `justify-self` 沿着内联轴方向对齐网格项目，而`align-items` 和 `align-self` 沿着块轴方向对齐网格项目，其中 `justify-items` 和 `align-items` 被运用于网格容器，而 `justify-self` 和 `align-self` 被运用于网格项目。
- **对齐网格轨道** ：`align-content` 沿着块联轴方向对齐网格轨道，`justify-content` 沿着内联轴方向对齐网格轨道，它们都被运用于网格容器。

我们先来看网格项目的对齐。

### 网格项目对齐

控制网格项目的对齐方式的属性主要有:

- `justify-items` 和 `justify-self` 控制网格项目沿着内联轴（文本书写方向的行轴）方向对齐；
- `align-items` 和 `align-self` 控制网格项目沿着块轴（块方向的列轴）方向的对齐。

这几个属性都可以接受 `auto` 、`normal` 、`start` 、`end` 、`center` 、`stretch` 、 `baseline` 、`first baseline` 和 `last baseline` 值，但常用的值只有 `start` 、`end` 、`center` 和 `stretch` （默认值）。其中 `start` 、`center` 和 `end` 表示相应轴的起点位置，中心位置和终点位置：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44d0a3da72984dcab95c35a0d220fe6f~tplv-k3u1fbpfcp-zoom-1.image)

注意，这几个属性都是用来控制网格项目在所处网格区域内的内联轴或块轴方向的对齐，如果没有跨网格单元格，则在对应的网格单元格内的内联轴或块轴方向的对齐。

假设你有下面这样的一个网格：

```HTML
<div class="container">
    <div class="item"></div>
    <!-- 此处省略四个 item -->
    <div class="item"></div>
</div>
.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 80px;
    grid-auto-columns: 80px;
    grid-template-areas:
      "a a a a b b b b"
      "a a a a b b b b"
      "c c c c d d d d"
      "c c c c d d d d";
}

.item:nth-child(1) {
    grid-area: a;
}

.item:nth-child(2) {
    grid-area: b;
}

.item:nth-child(3) {
    grid-area: c;
}

.item:nth-child(4) {
    grid-area: d;
}

.item:nth-child(5) {
    grid-row: 1 / -1;
    grid-column: span 2;
}
```

上面的代码构建了一个四行十列（`4 x 10`）的隐式网格，并且使用 `grid-area` 分别将网格项目放置到指定的网格区域：

- 网格项目一放置在网格区域 `a` ；
- 网格项目二放置在网格区域 `b` ；
- 网格项目三放置在网格区域 `c` ；
- 网格项目四放置在网格区域 `d` 。

使用 `grid-row` 和 `grid-column` 将网格项目五放置指定的区域内（合并四行两列），相当于放置在 `grid-area: 1  /  9  / 5 ``/`` 11` 区域内：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377823c139f14cdbbb55085f88fe2187~tplv-k3u1fbpfcp-zoom-1.image)

你可以在网格容器上显式设置 `align-items` 属性的值，比如：

```CSS
.container {
    align-items: var(--align-items, stretch);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bbe2af1d92547539266c5e186afe463~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示：

- `start` 将网格项目和所处网格区域在块轴的起始位置重叠；
- `end` 将网格项目和所处网格区域在块轴的结束位置重叠；
- `center` 将网格项目和所处网格区域在块轴中心位置重叠（类似垂直居中）；
- `stretch` 将网格项目拉伸与所处网格区域高度相同，相当于与网格区域的块轴方向起始、结束位置同时重叠（类似垂直方向的拉伸）。

另外，`align-items` 取值为 `auto` 、`normal` 和 `last baseline` 值时，与取值 `stretch` 值效果等同；`baseline` 和  `first baseline` 的效果与 `start` 等同：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b368a2fb244036879fee897cb936c9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/zYavJow>

一旦在网格容器上设置了 `align-items` 的值是 `stretch` 的其他值之后，所有网格项目的高度（块轴方向尺寸，`block-size`）都将会由其内容的高度决定。另外，在网格容器上显式设置了 `align-items` 的值，就相当于在所有网格项目上设置了 `align-self` 的值。比如：

```CSS
.container {
    align-items: var(--align-items, stretch);
}

/* 等同于 */
.container > * {
    align-self: var(--align-items, stretch)；
}
```

当然，你也可以在单个网格项目上显式设置 `align-self` 的值：

```CSS
.item:nth-child(1) {
    align-self: start;
}

.item:nth-child(2) {
    align-self: end;
}

.item:nth-child(3) {
    align-self: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ae4d6b56ab9494faedfbe9687127fa8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/VwdvELO>

你可以同时显式设置网格容器的 `align-items` 和单个网格项目的 `align-self` 的值，只不过最终由网格项目上的 `align-self` 值来决定（没有显式设置 `align-self` 的网格项目则由 `align-items` 决定）。比如：

```CSS
.container {
    align-items: var(--align-items, stretch);
}

.item:nth-child(1) {
    align-self: center;
}
```

上面这个示例，网格项目一在块轴方向始终是是垂直居中的，因为它显式设置了 `align-self` 的值为 `center` ，其他网格项目在块轴的对齐方式则由网格容器上的 `align-items` 属性的值来决定：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f74ae2a117834dffb6b0439f4051e5a2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/NWzGOpp>

与 `align-items` 和 `align-self` 相似的是，你可以在网格容器上设置 `justify-items` 属性和在网格项目上设置 `justify-self` 属性，控制网格项目在内联轴的对齐方式。比如：

```CSS
.container {
    justify-items: var(--justify-items, stretch);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4492253aa2274f1283fe3873ea35e392~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示：

- `start` 将网格项目和所处网格区域在内联轴的起始位置重叠；
- `end` 将网格项目和所处网格区域在内联轴的结束位置重叠；
- `center` 将网格项目和所处网格区域在内联轴中心位置重叠（类似水平居中）；
- `stretch` 将网格项目拉伸与所处网格区域宽度相同，相当于与网格区域的内联轴方向起始、结束位置同时重叠（类似水平方向的拉伸）。

同样的，`justify-items` 取值是 `auto` 、`normal` 和 `last baseline` 时与 `stretch` 值效果等同；`baseline` 和  `first baseline` 的效果与 `start` 等同：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/047a6004abeb4eb995708829bdb6011a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/gOKaBvw>

和 `align-items` 一样，当你在网格容器上设置了 `justify-items` 时，就等同于在所有网格项目上设置了 `justify-self` ：

```CSS
.container {
    justify-items: var(--justify-items, stretch);
}

/* 等同于 */
.container > * {
    justify-self: var(--justify-items, stretch);
}
```

你也可以根据需要，在网格项目上单独设置 `justify-self` 属性的值，控制单独网格项目在内联轴方向的对齐：

```CSS
.item:nth-child(1) {
    justify-self: start;
}

.item:nth-child(2) {
    justify-self: center;
}

.item:nth-child(3) {
    justify-self: end;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62fd3473635043629d7d54dd4be44f79~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/qBKOJLW>

如果在网格容器上设置了 `justify-items` 属性的值，并且在网格项目上也显式设置了 `justify-self` 属性的值，那么最终网格项目在内联轴方向的对齐由 `justity-self` 属性的值来决定。比如：

```CSS
.container {
    justify-items: var(--justify-items, stretch);
}

.item:nth-child(1) {
    justify-self: center; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b080e916920b4fc4a294a5c9a7845d81~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/RwJWeOG>

你可能已经发现了，当 `justify-items` 或 `justify-self` 属性的值不是默认值 `strecth` 时，网格项目的宽度（内联轴方向的尺寸，`inline-size`）就会发生变化，与 `auto` 值相似。

在网格布局中，`justify-items` 和 `align-items` 还可能简写成 `place-items` ；`justify-self` 和 `align-self` 可以简写成 `place-self` ，即：

```CSS
place-items: <align-items>  <justify-items>
place-self:  <align-self>  <justify-self>
```

当 `place-items` 和 `place-self` 只取一个值时，表示两个属性的值相同，否则第一个值用于 `align-*` ，第二个值则用于 `justif-*` ，比如：

```CSS
.container {
    place-items: center end;
    
    /* 等同于 */
    align-items: center;
    justify-items: end;
}

.item:nth-child(1) {
    place-self: center end;
    
    /* 等同于 */
    align-self: center;
    justify-self: end;
}
```

> **注意，`justify-items`** **和** **`justify-self`** **两属性不能运用于 Flexbox 布局，主要是因为 Flexbox 布局是一个一维布局，在单个轴上有很多个元素（Flex 项目），无法单独对齐其中某一个元素（Flex 项目）** 。

不知道你是否已经发现了，在 Web 布局中，又多了两种实现水平居中的布局技术。在网格布局中，你可以使用下面这两种技术，让某个元素（Grid 项目）水平垂直居中在另一个元素（网格区域）中：

```HTML
<div class="container">
    <div class="item">我要水平垂直居中</div>
</div>
.container {
  display: grid;
  place-items: center;
  
  /* 等同于 */
  align-items: center;
  justify-items: center;
}

.item {
  grid-area: 1 / 1 / -1 / -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d977a0a1f10049e9a8fc9264361e4a27~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/YzvyRGN>

上面这个示例效果，你还可以在网格项目上使用 `place-self` 来替代网格容器上的 `place-items` ：

```CSS
.container {
  display: grid;
}

.item {
  grid-area: 1 / 1 / -1 / -1;
  
  place-self: center;
  
  /* 等同于 */
  align-self: center;
  justify-self: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaaa316b4c8443599a7c53ec9b5b39b7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/qBKbwKp>

再次强调一下，`justify-items` 、`align-items` 、`justify-self` 和 `align-self` 都是用来控制网格项目自身所处网格区域的内联轴和块轴方向的对齐，如果网格项目没有明确放置，将按自动放置的算法来计算网格区域，一般就是网格单元格，因为网格单元格也是一个网格区域，网格中默认的最小网格区域：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    gap: 1rem;
    
    /* 设置所有网格项目在内联轴和块轴方向的对齐 */
    place-items: var(--align-items, stretch)  var(--justify-items, stretch)
}


/* 只设置网格项目一在内联轴和块轴方向的对齐 */
.item:nth-child(1) {
    place-self: var(--align-self, stretch)  var(--justify-self, stretch)
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b4952c534814c58bc6aa009e81a7112~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxzwQpV>

用下面这张图来总结网格项目在内联轴和块轴上对齐方式的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34f95b07e31d4bfe9805b51a6d2cc1e1~tplv-k3u1fbpfcp-zoom-1.image)

### 网格轨道对齐

CSS Grid 布局中的对齐方式和 Flexbox 布局中的对齐方式最大的不同之处是：

> **在网格布局中，除了可以控制网格项目在内联轴和块轴的方向对齐之外，还可以控制网格轨道在内联轴和块轴方向的对齐** 。

在网格布局中，所有网格轨道尺寸所占据的空间可能会小于网格容器空间：

- **内联轴方向** ：所有列网格轨道的尺寸总和小于网格容器内联轴方向的尺寸（`inline-size`），即在 `grid-template-columns` （或 `grid-auto-columns`）定义的列轨道尺寸总和小于网格容器的宽度；
- **块轴方向** ：所有行网格轨道的尺寸总和小于网格容器块轴方向的尺寸（`block-size`），即在 `grid-tempalte-rows` （或 `grid-auto-rows`）定义的行轨道尺寸总和小于网格容器高度。

这样你就可以分别在网格容器的：

- **内联轴方向** ：`justify-content` 控制列网格轨道在内联轴方向的对齐方式，即控制网格列的对齐；
- **块轴方向** ：`align-content` 控制行网格轨道在块轴方向的对齐方式，即控制网格行的对齐。

它们（`justify-content` 和 `align-content` 属性）可设置的值是：`normal` 、`start` 、`end` 、`center` 、`stretch` 、`space-around` 、`space-between` 、`space-evenly` 、`baseline` 、`first baseline` 和 `last baseline` 。

同样的，我们使用下面这个示例来向大家展示 `justify-content` 和 `align-content` 取不同值的效果会是什么？

假设你有一个 `500px x 500px` 的网格容器，即网格容器的内联轴方向的尺寸（`inline-size`）和块轴方向尺寸（`block-size`）都是 `500px` 。使用 `grid-template-columns` 和 `grid-template-rows` 定义了一个三行三列（`3 x 3` ）的网格，并且网格轨道尺寸都是 `100px` ，同时网格轨道之间有 `10px` 的间距：

```CSS
.container {
    inline-size: 500px;
    block-size: 500px;
    
    display: grid;
    gap: 10px;
    
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fbd1df278d24d5e9719dbf630449e7a~tplv-k3u1fbpfcp-zoom-1.image)

可以像 Flexbox 布局中的 `justify-content` 和 `align-content` 一样，将剩余空间分配到网格轨道之间。

在网格容器上将 `align-content` 设置不同值：

```CSS
.container {
    align-content: var(--align-content, start);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c6b387290941e2935ba6535e347df8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/MWXKjVj>

你会发现，在这个示例中，`align-content` 取值为 `normal` 、`stretch` 、`baseline` 、`first baseline` 、`last baseline` 的效果与 `start` 是等同的。事实上，`algin-content` 取值 `stretch` 时会对网格轨道进行拉伸，但并不是所有情景都是如此，它对网格轨道尺寸的设置是有一定要求的。有关于这方面，我们将放到后面与 `justify-content` 统一阐述。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcb789f9d9e64410a1f585f06d4b7c0f~tplv-k3u1fbpfcp-zoom-1.image)

虽然说 `align-content` 是用来控制网格行轨道在网格容器块轴方向的对齐方式，但从另一个角度来说，也是将网格容器的剩余空间分配给网格轨道之间。比如：

`align-content` 取值为 `center` 时，网格容器的剩余空间将一分为二，第一行网格轨道在块轴的起始位置与网格容器块轴方向超始位置的距离等于最后一行网格轨道在块轴的结束位置与网格容器块轴方向结束位置的距离：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/510a9f2f859443c2bfe6c1c6d0d58f7a~tplv-k3u1fbpfcp-zoom-1.image)

> **如果网格容器只有一行行网格轨道时，可以实现垂直居中的效果** 。

`align-content` 取值为 `space-around` 时，分配给相邻两行网格道之间的网格容器的剩余空间，是第一行网格轨道块轴起始位置距网格容器块轴方向起始位置之间距离的两倍，也是最后一行网格轨道块轴结束位置距网格容器块轴方向结束位置之间距离的两倍。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54d029f1bd774f739104a20ed319287d~tplv-k3u1fbpfcp-zoom-1.image)

`align-content` 取值 `space-evenly` 的效果和 `space-around` 有点相似，只不过，分配给相邻两行网格轨道之间的网格容器的剩余空间，和第一行网格轨道块轴方向起始位置与网格容器块轴方向起始位置之间的距离相等，也和最后一行网格轨道块轴方向结束位置与网格容器块轴方向结束位置之间的距离相等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e3f779172674a9ba1a6c74a463d5f70~tplv-k3u1fbpfcp-zoom-1.image)

`align-content` 取值为 `space-between` 会令行网格轨道在网格容器块轴方向两端对齐，即网格容器的剩余空间会平均分配到相邻两行行网格轨道之间：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2ed5e7fd2ff4ec5a5ee9c342c0cd417~tplv-k3u1fbpfcp-zoom-1.image)

需要注意的是，当行网格轨道的尺寸是 `fr` 值时，`align-content` 取任何值的效果都和其默认值 `start` 等同。比如：

```CSS
.container {
    grid-template-rows: 1fr 100px 100px;
    
    /* 或 */
    grid-template-rows: minmax(100px, 1fr) 100px 100px;
    
    /* 或 */
    grid-auto-rows: 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb4627d5c6864a25bcd2f65255d6433a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/poKgeMR>

也就是说，**当网格容器没有剩余空间时，**`align-content` **各值的效果都相同，即等同于** **`align-content`** **的** **`start`** **（默认值效果）** 。

既然网格容器有剩余空间，也就有可能会有不足空间出现，比如将示例中的行网格轨道尺寸设置为：

```CSS
.container {
    grid-template-rows: 70% 120px 120px; 
}
```

网格项目溢出网格容器：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ccf09937ed24168bd77d0500c057692~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/dyKGWYa>

网格项目溢出网格容器时，`align-content` 取值不同时，溢出方向也有所差异：

- `start` ，网格项目在网格容器块轴方向结束位置溢出；
- `end` ，网格项目在网格容器块轴方向起始位置溢出；
- `center` ，网格项目在网格容器块轴两个方向溢出；
- `stretch` 与 `start` 等同；
- `space-around` 与 `center` 等同；
- `space-between` 与 `start` 等同；
- `space-evenly` 与 `center` 等同。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08d4124aaa042a5bc66ed1d00639258~tplv-k3u1fbpfcp-zoom-1.image)

在网格容器上显式设置 `align-content` 值时，还有可能会造成网格区域变大。比如下面这个示例，网格项目一合并了两行两列。当 `align-content` 取值 `space-around` 、`sapce-evenly` 和 `space-between` 时，行网格轨道之间的间距就会产生变化，这样对于合并多行的网格项目一来说，尺寸（块轴方向尺寸，`block-size`）也会产生相应变化：

```CSS
.container {
    inline-size: 500px;
    block-size: 500px;
    
    display: grid;
    gap: 10px;
    
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
}

.item:nth-child(1) {
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80a173fcce0b40f5a427e93e2d9ffdf0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/OJEMmxN>

上面看到的都是行网格轨道在网格容器块轴方向的对齐方式（分配网格容器块轴方向剩余空间）。接下来在前面的示例基础上，将 `align-content` 换成 `justify-content` 。

```CSS
.container {
    justify-content: var(--justify-content, start);
}
```

不难发现，`justify-content` 取值和 `align-content` 值效果是相同的，唯一不同的是， **`justify-content`** **是用来控制列网格轨道在网格容器的内联轴方向的对齐方式，即 分配网格容器内联轴方向的剩余空间** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3db8586d00914a5db8fe5c825f38676b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/eYKJWer>

`justify-content` 取值为 `center` 、`space-around` 、`space-evenly` 和 `space-between` 分配网格容器内联轴方向剩余空间如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/540f709a36c54396afe67e4c81bba7cd~tplv-k3u1fbpfcp-zoom-1.image)

> **注意，如果网格只有一列，****`justify-content`****取值****`center`****可以实现水平居中效果** 。

如果 `grid-tempalte-columns` 或 `grid-auto-columns` 设置列网格轨道尺寸时，设置了 `fr` 单位值，那么 `justify-content` 取任何值的效果都与默认值 `start` 等同：

```CSS
.container {
    grid-template-columns: minmax(100px, 1fr) 100px 100px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f396d35a084c4a59b1956fb82a8219ae~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/yLEeXOR>

网格项目在内联轴方向溢出网格容器时，`justify-content` 取值不同，溢出方向也有所差异：

- `start` ，网格项目在网格容器内联轴方向结束位置溢出；
- `end` ，网格项目在网格容器内联轴方向起始位置溢出；
- `center` ，网格项目在网格容器内联轴两个方向溢出；
- `stretch` 与 `start` 等同；
- `space-around` 与 `center` 等同；
- `space-between` 与 `start` 等同；
- `space-evenly` 与 `center` 等同。

```CSS
.container {
    grid-template-columns: 70% 120px 120px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e25856418d33428c82afa058525fb089~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/oNybwWx>

`justify-content` 和 `align-content` 一样，取值为 `space-around` 、`space-evenly` 和 `space-between` 会影响网格区域内联尺寸方向的尺寸（`inline-size`），即宽度会变大：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2d94a25c3ff40e3a5f294f93a4cc3c9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/YzvwQrN>

刚才有提到过，`align-content` 和 `justify-content` 在我们演示的示例中取值为 `stretch` 的效果和 `start` 是一样的。这主要是因为示例中的网格轨道尺寸是一个固定值，你可以尝试将示例中的 `grid-template-columns` 和 `grid-template-rows` 中的值调整为 `auto 100px auto` ，即有些轨道尺寸由内容来决定：

```CSS
.container {
    grid-template-columns: auto 100px auto;
    grid-template-rows: auto 100px auto;
    justify-content: stretch;
    align-content: stretch;
}
```

那么，

- 当 `justify-content` 取值为 `stretch` 时，设置内在尺寸的列网格轨道在内联轴方向会被拉伸，网格项目会沿着网格容器的内联轴方向填满（整个网格容器内联轴方向可用空间）；
- 当 `align-content` 取值为 `stretch` 时，设置内在尺寸的行网格轨道在块轴方向被拉伸，网格项目会沿着网格容器块轴方向填满（整个网格容器块轴方向可用空间）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/894eb8aeea544df8a992069189ba2d13~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/GRGoEwQ>

另外，当网格项目因合并网格单元格创建了一个隐式网格，并且隐式网格轨道尺寸为 `auto` 时，`justify-cotent` 和 `align-content` 取值为 `stretch` 时，同样会对网格项目进行拉伸：

```CSS
.container {
    inline-size: 500px;
    block-size: 500px;
    
    display: grid;
    gap: 10px;
  
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    grid-auto-flow: dense;

    justify-content: stretch;
    align-content: stretch;
}

.item:nth-child(1) {
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
}

.item:nth-child(5) {
    grid-column: 3 / span 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a28a34ec24eb4beeaf133a07be50d376~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/GRGoEwQ>

在使用的时候，你还可以将 `justify-content` 和 `align-content` 简写成 `place-content` ，即：

```CSS
place-content: <align-content> <justify-content>
```

当 `place-content` 只有一个值时，表示 `align-content` 和 `justify-content` 值相同，如果有两个值时，第一个值是 `align-content` ，第二个则是 `justify-content` ：

```CSS
.container {
    place-content: center end;
    /* 等同 */
    align-content: center;
    justify-content: end;
    
    place-content: center;
    /* 等同 */
    align-content: center;
    justify-content: center;
}
```

这样一来， Web 中又多了一种实现水平垂直居中的布局效果，即 `place-content` 属性的值设置为 `center` 。不过，使用 `place-content` 实现水平垂直居中，它有一个条件限制，**网格容器中只有一个网格轨道，即 需要在网格容器中水平垂直居中的元素，它既是行网格轨道，也是列网格轨道** ：

```HTML
<div class="container">
    <div class="item">我需要水平垂直居中</div>
</div>
.container {
    display: grid;
    place-content: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce8f7fb82a1149b581f825b72d39aa64~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/XWYmypr>

用下图简单地总结一下，网格容器上设置 `justify-content` 或 `align-content` 属性的值，网格轨道的对齐方式如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e2a2625b9ed491abf3aa42bdfeef853~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/RwJrXrQ>

网格布局中，你可以同时使用多个对齐属性来控制网格中的对齐（网格项目或网格轨道），比如：

```CSS
.container {
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    
    /* 等同于 */
    place-content: space-evenly;
    place-items: center;
}
```

正如你所看到的，由于可用于网格布局中的对齐属性很多种，如果你对网格布局中的对齐属性不是很了解的话，往往设置了对齐属性，却达不到预期的效果。这里有一个小技巧，你在网格布局中使用网格对齐相关的属性时，你需要做确认：

- 你是要对网格轨道设置对齐吗？如果是，使用 `place-content` 属性；如果希望只控制网格轨道沿着网格容器块轴方向的对齐，则使用 `align-content`；如果希望只控制网格轨道沿着内联轴方向的对齐，则使用 `justify-content`。
- 你是要对所有网格项目设置对齐吗？如果是，使用 `place-items` 属性；如果希望只控制网格项目沿着网格区域块轴方向对齐，则使用 `align-items` ；如果希望只控制网格项目沿着网格区域内联轴方向对齐，则使用 `justify-items`。
- 你是要对单个网格项目设置对齐吗？如果是，使用 `place-self` 属性；如果只希望控制单个网格项目沿着网格区域块轴方向对齐，则使用 `align-self` ；如果只希望控制单个网格项目沿着网格区域内联轴方向对齐，则使用 `justify-self`。

比如下面这样的一个示列：

```HTML
<div class="container">
    <div class="item"></div>
    <!-- 这里省略七个 item -->
    <div class="item"></div>
  </div>
```

```CSS
.container {
    inline-size: 100%;
    max-width: 50vw;
    margin: 0 auto;
    aspect-ratio: 1;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 120px auto);
    grid-auto-rows: 120px auto;
    grid-auto-flow: dense;
}

.item:nth-child(1) {
    grid-row: span 2;
    grid-column: span 2;
}
```

使用上面的代码，构建了一个像下面这样的网格，其中网格项目一合并了两行两列：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9189ca12b08d4c229a8e72413d8081ea~tplv-k3u1fbpfcp-zoom-1.image)

目前为止，并没有显式地设置任何与对齐有关的属性。事实上，它相当于在网格容器上显式设置了 `place-items` 的值为 `stretch` ，即：

```CSS
.container {
    place-items: var(--align-items, stretch)  var(--justify-items, stretch)；
}
```

因为网格项目的 `place-items` （即 `align-items` 和 `justify-items`）的默认值是 `stretch` 。它也相当于在所有网格项目上设置了 `place-self` 的值为 `stretch` ：

```CSS
.container > * {
    place-self: var(--align-self, stretch) var(--justify-self, stretch);
}
```

当你在网格容器 `.container` 显式设置 `place-items` 的值不是 `stretch` （非默认值）时，那么所有网格项目的对齐方式都会得到改变：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5d7c2f1fe664993a181f61f1145cd3e~tplv-k3u1fbpfcp-zoom-1.image)

这个时候，要是你在单个网格项目上（比如网格项目一）显式设置了 `place-self` 的值为 `stretch` ，你会发现网格项目一在合并的网格区域的块轴和内联轴方向都会被拉伸，填满整个网格区域。即使是网格容器上显式设置了 `place-items` 的值为 `center  stretch` ：

```CSS
.container {
    place-items: center stretch;
}

.item:nth-child(1) {
    place-self: stretch;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5937ed70081e4e4a9b9a26fccbf01f19~tplv-k3u1fbpfcp-zoom-1.image)

单个设置 `place-self` 的权重要大于在网格容器上设置的 `place-items`。正如你所看到的，网格项目一最终以自身 `place-self` 的值来控制对齐方式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24c103abf3714a83b1fde13290239072~tplv-k3u1fbpfcp-zoom-1.image)

需要注意的是，`place-content` 的默认值是 `start` ，但这并不意味着网格容器默认就是 `place-content` 取值 `start` 的效果。就拿上面这个示例来说，在网格容器上设置 `place-content` 属性值为 `start` 前后的效果是不一样的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b2b49e1d53746a6b5f8b258b18e7430~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，**如果网格容器上未显式设置** **`place-content`** **时，并不会以默认的** **`place-content: start`** **来控制网格轨道的对齐** 。

换句话说，只要在网格容器上显式设置了 `place-content` 属性（或它的子属性 `align-content` 或 `justify-content`）的值，就会改变设置值为 `auto` 的轨道尺寸，也会改变网格轨道之间的间距，但它不会改变网格项目的对齐方式。

你也可以简单的这么理解：

- `place-content` 改变网格的对齐方式和网格轨道之间的间距，但不会改变网格项目在网格区域的对齐方式；
- `place-items` 和 `place-self` 会改变网格项目在网格区域的对齐方式，同时也会改变网格项目的尺寸，但不会改变网格轨道之间的间距；
- `place-items` 用于网格容器，会改变所有网格项目；`place-self` 用于网格项目，只会改变设置了该值的网格项目。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f57ff81584444d5b8639a0060c0a59eb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：[codepen.io](https://codepen.io/airen/full/vYrLoaz)

## 网格项目的 `margin:auto`

通过前面课程的学习，你已经知道了在 Flex 项目中设置 `margin` 属性的值为 `auto` 时，可以达到 Flex 项目对齐的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce3f33aa26b545689e44f8efe4cb9a5d~tplv-k3u1fbpfcp-zoom-1.image)

网格布局中，在网格项目上设置 `margin` 的值为 `auto` 时也能达到相似的效果。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12da10c18ec84b17ba78fe1e6fe807e2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/YzvqKgz>

正如你所看到的，在网格布局中，你可以在网格项目上显式设置 `margin: auto` 实现水平垂直居中的效果：

```CSS
.container {
    display: grid;
}

.item {
    grid-area: 1 / 1 / -1 / -1;
    margin: auto;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48930c11de1b409d94862351a165f2eb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxzVxoV>

除了在网格项目上显式设置 `margin` 的值为 `auto` 之外，也可以将其设置为 `<length-percentage>` 值，用来控制网格项目之间的间距。不过，它和网格容器上的 `gap` 属性还是有所区别的：

- `gap` 是用来设置网格轨道之间的间距；
- `margin` 是用来设置网格项目外侧边缘和网格区域边缘之间的间距。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91353fda231c4be4887cc730a02d5e3f~tplv-k3u1fbpfcp-zoom-1.image)

你会发现，网格项目上设置 `margin` 值时，网格项目会向里收缩！另外，网格布局中网格项目或网格轨道的对齐都是沿着网格容器的块轴方向或内联轴方向，所以使用 `margin` 值为 `auto` 达到对齐效果时，更建议采用相应的逻辑属性，比如：

- `magin-inline-start` 替代 `margin-left` ，相当于在网格项目上设置 `justify-self: end`；
- `margin-inline-end` 替代 `margin-right` ，相当于在网格项目上设置 `justify-self: start`；
- `margin-block-start` 替代 `margin-top` ，相当于在网格项目上设置 `align-self: end`；
- `margin-block-end` 替代 `margin-bottom` ，相当于在网格项目上设置 `align-self: start`。

你也可以设置：

- `margin-inline` 的值为 `auto` 实现水平居中，等同于 `justify-self: center`；
- `margin-block` 的值为 `auto` 实现垂直居中，等同于 `align-self: center`。

## 小结

网格布局中的对齐和 Flexbox 布局中的对齐有点相似，只不过网格布局中主要分为三种使用情景：

- `place-content` （它的子属性 `align-content` 和 `justify-content`）控制网格轨道在网格容器的块轴和内联轴方向的对齐；
- `place-items` （它的子属性 `align-items` 和 `justify-items` ）控制所有网格项目在网格区域的块轴和内联轴方向的对齐；
- `place-self` （它的子属性 `align-self` 和 `justify-self` ）控制单个网格项目在网格区域的块轴和内联轴方向的对齐。

它的 Flexbox 布局的 `align-content` 、`justify-content` 、`alig``n-items` 以及 `align-self` 还是有所差异的：

| **对齐属性**          | **Flexbox 布局中的对齐**                                | **Grid 布局中的对齐**                         | **备注**                                                     |
| --------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **`align-content`**   | Flex行在 Flexbox 容器侧轴方向的对齐                     | 行网格轨道在网格容器的块轴方向的对齐          | Flex 行是指 Flexbox 容器上显式设置 `flex-wrap` 的值为 `wrap` 或 `wrap-reverse` 产生断行。每个 Flex 行都有主轴和侧轴方向 |
| **`justify-content`** | Flex 项目在 Flex 容器主轴方向的对齐                     | 列网格轨道在网格容器的内联轴方向的对齐        |                                                              |
| **`place-content`**   | **`place-content: <align-contetn>  <justify-content>`** |                                               |                                                              |
| **`align-items`**     | Flex 项目在 Flex 容器侧轴方向的对齐                     | 所有网格项目在网格区域的块轴方向的对齐        |                                                              |
| **`justify-items`**   |                                                         | 所有网格项目在网格区域的内联轴方向的对齐      | Flexbox 布局中不支持 `justify-items`                         |
| **`place-items`**     |                                                         | `place-items: <align-items>  <justify-items>` |                                                              |
| **`align-self`**      | 单个 Flex 项目在 Flex 容器侧轴方向的对齐                  | 单个网格项目在网格区域的块轴方向的对齐        |                                                              |
| **`justify-self`**    |                                                         | 单个网格项目在网格区域的内联轴方向的对齐      | Flexbox 布局中不支持 `justify-self`                          |
| **`place-self`**      |                                                         | `place-self: <align-self>  <justify-self>`    |                                                              |

不管是 Flexbox 布局中的对齐还是网格布局中的对齐，它们都受 CSS 的书写模式或阅读模式的影响！

另外，网格布局中的网格项目上，也可以显式设置 `margin` 的值来达到单个网格项目对齐，这个和 Flexbox 布局中的 Flex 项目设置 `margin: auto` 是等同的：

| **属性：值**              | **Flexbox 布局**                                             | **Grid 布局**                                                |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`margin-left: auto`**   | 如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flex 容器上设置 `justify-content` 的值为 `flex-end` 或 `end` | 等同于在网格项目上设置 `justify-self: end`如果 Grid 容器中只有一个 Grid 项目时，等同于在网格容器上设置 `justify-items: end` 或 `justify-content: end` |
| **`margin-right: auto`**  | 如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flex 容器上设置 `justify-content` 的值为 `flex-start` 或 `start` | 等同于在网格项目上设置 `justify-self: start` 如果 Grid 容器中只有一个 Grid 项目时，等同于在网格容器上设置 `justify-items: start` 或 `justify-content: start` |
| **`margin-top: auto`**    | 等同于在 Flex 项目上设置 `align-self: end` 或 `align-self: flex-end` 如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flexbox 容器上设置 `align-items` 的值为 `end` 或 `flex-end` | 等同于在 Grid 项目上设置 `align-self: end` 如果 Grid 容器中只有一个 Grid 项目时，等同于在 Grid 容器上设置 `align-items: end` 或 `align-content: end` |
| **`margin-bottom: auto`** | 等同于在 Flex 项目上设置 `align-self: start` 或 `align-self: flex-start` 如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flexbox 容器上设置 `align-items` 的值为 `start` 或 `flex-start` | 等同于在 Grid 项目上设置 `align-self: start` 如果 Grid 容器中只有一个 Grid 项目时，等同于在 Grid 容器上设置 `align-items: start` 或 `align-content: start` |

不管是在 Flexbox 布局中还是 Grid 布局中，在 Flex 项目或 Grid 项目上设置：

- `magin-inline: auto` 可以实现水平居中；
- `margin-block: auto` 可以实现垂直居中。

需要注意的是，因为 Flexbox 布局是一种一维布局，所以在 Flexbox 布局中没有 `justify-items` 和 `justify-self` 两个属性！

到这里，小册分了两节课分别介绍了 Flexbox 和 Grid 布局中的对齐。两个布局模块中都有相同的属性以及值，但所起的作用是略有差异的，但也有互通的。因此，在 CSS 规范中，将它们都纳入了 CSS Box Alignment 模块中。不过，在我们小册中不做展开性的阐述。因此，有关于对齐的部分我们就介绍到这里了。
