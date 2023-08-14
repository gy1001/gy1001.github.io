# 13-可用于 Grid 布局中的函数

在 CSS 中有很多种类型的函数，其中可用于尺寸属性的函数主要有 `calc()` 、`min()` 、`max()` 、`clamp()` 等。这些 CSS 函数都可用来设置网格轨道尺寸，除此之外，还有一些专门用于设置网格轨道的函数，比如 `repeat()` 、`minmax()` 和 `fit-content()` 等。接下来，我们主要来看看这些函数是如何用于设置网格轨道尺寸的，它们给网格布局又能带来哪些不一样。

## repeat() 函数

我们先从 `repeat()` 函数开始。

在前面介绍网格轨道尺寸设置的课程中，常会看到给 `grid-template-columns` 、`grid-tempalte-rows` 、 `grid-auto-columns` 和 `grid-auto-rows` 设置多个相同的长度值，比如：

```CSS
.container {
    grid-template-columns: 1fr 1fr 1fr;
}
```

表示列轨道设置了三个相同的值。针对于这样的场景，网格布局中提供了一个 `repeat()` 函数，可以让上面的代码变得更简洁：

```CSS
.container {
    grid-template-columns: 1fr 1fr 1fr;
    
    /* 等同于 */
    grid-template-columns: repeat(3, 1fr);
}
```

网格中的 `repeat()` 函数主要用来设置网格轨道列表（`<track-lists>`）的重复片段，允许以更紧凑的形式写入大量显示重复模式的网格轨道（列或行）。该函数可以用于 `grid-template-columns` 和 `grid-template-rows` 属性，用来设置网格轨道尺寸大小，但它不能用于 `grid-auto-rows` 和 `grid-auto-columns`。

`repeat()` 函数具有一定的语法规则，它接受两个参数：

- 第一个参数表示重复的次数，比如 `repeat(3, 1fr)` 中的 `3` ，该参数除了可以是**正整数**之外，还可以是 **`auto-fit`** 和 **`auto-fill`** 两关键词。
- 第二个参数是一个长度列表值，即重复的网格轨道的列表值，比如 `repeat(3, 1fr)` 中的 `1fr` ；另外该参数的值还可以是一个复合值，比如 `repeat(3, 1fr 20px [col])` 中的 `1fr 20px [col]`。

我们通过几个示例来向大家展示 `repeat()` 函数的几种常用的使用方式。先从最简单的开始，即：

```CSS
.container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    
    /* 使用 repeat() 函数 */
    grid-template-columns: repeat(4, 1fr);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce95f8f9bfc64e3f805ef32ab9fef539~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxjNjeL>

`repeat()` 函数中的第二个参数还可以是一个列表值，比如 `1fr 200px`：

```CSS
.container {
    grid-template-columns: repeat(3, 1fr 200px);
    
    /* 等同于 */
    grid-template-columns: 1fr 200px 1fr 200px 1fr 200px;
}
```

代码中的 `repeat(3, 1fr 200px)` 意思是 `1fr 200px` 会重复 `3` 次，相当于创建了一个六列的网格：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66eb94f3d15e423698a0e0fa8a550d0f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/RwymJZO>

`repeat()` 函数的第二个值除了可以是网格轨道列表值之外，也可以显式给网格线命名，比如：

```CSS
.container {
    grid-template-columns: repeat(3, 1fr [col]);
    
    /* 等同于 */
    grid-template-columns: 1fr [col] 1fr [col] 1fr [col];
}
```

要是在 `repeat()` 函数中重复网格线名称的话，结束的网格线名称最终会与下一条开始网格线名称共享同一个网格线名称：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40c4dae0850747a3b25343fdb6bf0de6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/WNJBKVg>

如果你在使用 `repeat()` 给网格轨道设置尺寸时需要显式命名网格线名称，还可以像下面这样使用：

```CSS
.container {
    grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
    
    /* 等同于 */
    grid-template-columns: 
        [col-start] 1fr
        [col-end col-start] 1fr
        [col-end col-start] 1fr
        [col-end];
}
```

另外，可用于设置网格轨道尺寸的值，都可以被用于 `repeat()` 函数的第二个参数，比如：

```CSS
.container {
    grid-template-columns: repeat(3, minmax(min(300px, 100%), 1fr));
    
    /* 等同于 */
    grid-template-columns: 
        minmax(min(300px, 100%), 1fr) 
        minmax(min(300px, 100%), 1fr) 
        minmax(min(300px, 100%), 1fr);
}

.container {
    grid-template-columns: repeat(3, min-content auto max-content);
    
    /* 等同于 */
    grid-template-columns: 
        min-content auto max-content 
        min-content auto max-content
        min-content auto max-content;
}
```

但需要注意的是，**`repeat()`** **函数中不能嵌套** **`repeat()`** **函数！**

### auto-fill  vs. auto-fit

你可能已经发现了，前面几个示例中 `repeat()` 函数的第一个参数都是整数值。一般在你已经知道网格轨道要重复的次数时才用，但很多时候，你可能并不知道网格轨道重复的数量，更希望的是它能自动匹配。

庆幸的是，`repeat()` 函数的第一个参数除了可以接受一个整数值之外，还可以接受 **`atuto-fit`** 和 **`auto-fill`** 两个关键词。它们会告诉浏览器处理网格轨道的大小和断行（或断列），以便当容器空间不足以容纳元素时，元素会自动换行（或列）而不会造成溢出。但 `auto-fill` 和 `auto-fit` 两者之间还是有一些细微差异的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d21f9de878af480cb3895bc65fa6a7e0~tplv-k3u1fbpfcp-zoom-1.image)

- **`auto-fill`** ：在同一行中填充尽可能多的列。因此，只要能容纳新的列，就会自动创建隐式列，因为它试图在同一行中填充尽可能多的列。新添加的列（隐式列）可以是空的，但是它们仍然会在行中占据指定的空间。
- **`auto-fit`** ：将当前可用的列扩展到空间中，以便它们占用容器可用空间。当容器有可用空间时，浏览器会将可用空间均分给列，让列自动变宽填满整个容器；当容器可用空间为负值时，会另起一行排列。

简单地说，**`auto-fit`** **将扩展网格项目以填补可用空间，而** **`auto-fill`** **不会扩展网格项目。相反，`auto-fill`** **将保留可用的空间，而不改变网格项目的宽度** 。

在实际使用过程中，网格容器中有多个和仅有一个网格项目时，使用 `auto-fill` 与 `auto-fit` 的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fd772d07e1742c699a3038b2a5a15f4~tplv-k3u1fbpfcp-zoom-1.image)

上面两张图展示了 `auto-fit` 和 `auto-fill` 在网格布局中的差异。那它们两者又是如何工作的呢？我们以一个实例来向大家介绍 `auto-fit` 和 `auto-fill` 是如何工作的。

```HTML
<div class="container">
    <div class="item"></div>
    <!-- 此处省略两个 Item -->
    <div class="item"></div>
</div>
```

```CSS
.container {
    --width: 100%,
    --auto-size: auto-fit;
    
    display: grid;
    grid-template-columns: repeat(var(--auto-size), 120px);
    gap: 10px;
    
    width: var(--width); /* 它的父元素 width = 1000px */
    padding: 10px;
}
```

示例中网格容器的宽度是 `1000px` ，并且设置了 `10px` 的内距（`padding`），`grid-template-columns` 指定的列网格轨道尺寸是 `120px` ，网格沟槽（列网格轨道之间的间距）是 `10px` 。

你会发现，`repeat()` 函数的第一个参数不管是 `auto-fit` 还是 `auto-fill` ，浏览器都会根据相关的参数（比如网格容器的宽度、网格轨道尺寸和网格沟槽等）创建出最适合于网格容器可用空间的网格列轨道数量，即，**在保证网格项目不溢出网格容器之下，创建最多数量的网格列（或行）轨道** 。

```CSS
网格容器宽度 = 网格列轨道尺寸 × 网格列轨道数量 + (网格列轨道数量 - 1) × 网格沟槽
980       =   120px      ×     ?          (     ?      - 1) × 10     
```

浏览器计算出这个“**`?`** ” 大约会是 `7.66667` ，所以浏览创建了一个七列的网格。不同的是 `auto-fit` 会把空的网格轨道折叠在一起（空网格轨道是指没有放置网格项目的网格轨道）。折叠的轨道尺寸大小会被视为 `0px`。浏览器为了找到自动重复的轨道数，会将轨道尺寸限制为用户代理指定的值（比如 `1px`），来避免被零除。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19a88ff0221a4759a89a9471fd9e606c~tplv-k3u1fbpfcp-zoom-1.image)

`auto-fill` 则不会将创建的空网格轨道折叠在一起：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/750ab74773d148709b2275d655f85c58~tplv-k3u1fbpfcp-zoom-1.image)

`repeat()` 函数中使用 `auto-fit` 或 `auto-fill` 关键词替代重复的次数时，又被称为**自动换行** 。当网格容器无法容纳网格轨道时（有网格项目的），就会自动创建新的一行：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7abdedb5027468d825615feb7d66b07~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/PoevxOp>

虽然在 `repeat()` 函数中使用 `auto-fit` 或 `auto-fill` 都可能创建尽可能多的列，但每个网格轨道的尺寸是固定的，它并不是一个自动尺寸。不过，可以将 `fr` 单位值和 `minmax()` 函数结合在一起，让网格轨道尺寸是**自动的** ，即网格轨道尺寸是自动匹配的（在一个范围内）。

把上面示例稍微调整一下，将 `repeat(var(--auto-size), 120px)` 中的 `120px` 替换成 `minmax(120px, 1fr)` ，即：

```CSS
.container {
    --width: 100%,
    --auto-size: auto-fit;
    
    display: grid;
    
    grid-template-columns: repeat(var(--auto-size), minmax(120px, 1fr));
    
    gap: 10px;
    
    width: var(--width); /* 它的父元素 width = 1000px */
    padding: 10px;
}
```

`auto-fit` 时，创建的重复轨道尺寸是 `0` ，网格轨道的尺寸会介于 `120px ~ 1fr` 之间，最小是 `120px` ，最大是 `1fr` ，而且 `1fr` 会根据网格容器可用空间计算出网格轨道尺寸。由于创建的重复轨道尺寸是 `0` ，所以网格容器可用空间更大（`1000px - 10px × 2 - 10px × 3 = 950px`），对应的 `1fr = 1 / 4 = 25% × 950px = 237.5px` ，所以你将看到的网格项目被拉伸了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcad7d6b673443798c6becc0dfb59948~tplv-k3u1fbpfcp-zoom-1.image)

`auto-fill` 创建的重复轨道尺寸也是 `minmax(120px, 1fr)` ，而且不会被折叠，所以网格容器的可用空间分的等份就更多（因为创建的三个空网格轨道，它位置占着），即 `7` 个 `fr` 。同时网格容器可用空间也更小 （`1000px - 10px × 2 - 10px × 6 = 920px`），对应的 `1fr = 1 / 7 = 14.28% × 920px = 131.43px` ，即网格轨道尺寸是介于 `120px ~ 1fr` （相当于 `120px ~ 131.43px`）之间：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c60767dffe4c42cf903f85b053c79e6f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/mdLZwey>

你要是将 `repeat()` 函数和 `minmax(min,max)`、`1fr` 和 `auto-fill`（或 `auto-fit`）结合起来，可以很容易帮我们实现像下图这样的响应式布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75f1124edc114dac903e13aababe952e~tplv-k3u1fbpfcp-zoom-1.image)

实现上图这样的效果，代码很简单：

```CSS
.container { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    gap: 20px; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa65abf944fe46178f5e64a4ec3a7563~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/mdLZMBp>

这种布局技术也被称为 **RAM（Repeat, Auto, Minmax）** 布局，一种无需依赖任何 CSS 媒体查询特性的响应式布局。

## minmax() 函数

`minmax()` 函数是用于设置网格轨道尺寸的另一个函数，它可以用于 `grid-template-columns` 、 `grid-template-rows` 、`grid-auto-columns` 和 `grid-auto-rows` 属性上。该函数可以接受两个参数值，即 **`MIN`**  和 **`MAX`** 。每个参数都可以是：

- `<length-percentage>` 值，比如 `px` 和 `%`；
- `<flex>` 值，比如 `fr`；
- 关键词，比如 `auto` 、`min-content` 、`max-content`；
- 函数表达式，比如 `min()` 、`max()` 、`clamp()` 和 `clac()`。

`minmax(MIN, MAX)` 可以输出一个范围值，**它定义了一个大于或等于** **`MIN`** **值且小于或等于** **`MAX`** **值的尺寸范围** 。简单地说，`minmax(MIN, MAX)` 函数将返回`MIN ~ MAX` 范围中的一个值。我们可以像下面这样使用 `minmax(MIN, MAX)` 函数：

```CSS
grid-template-columns: minmax(200px, 300px);
grid-template-columns: minmax(min-content, 320px);
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-template-columns: minmax(min(200px, 100%), 1fr);
grid-template-columns: minmax(300px, 50%);
```

接下来，我们花点时间来看看， `minmax(MIN, MAX)` 函数取不同类型值是如何工作的。

先来看最简单的 `<length>` 值类型，比如：

```CSS
.container {
    grid-template-columns: minmax(100px, 220px) 1fr 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7f756cb2b124a6288fe56576a71375d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/JjvQrJp>

使用 `minmax(100px, 220px)` 指定网格第一列的列宽保持在 `100px` 至 `220px` 之间，随着网格容器尺寸的变化，该列的宽度也会有改变，但总是在这两个值的范围内变化：

- 当网格容器宽度足够宽时，`minmax(100px, 220px)` 返回的值是 `220px`，即第一列的网格轨道宽度是 `220px`（`MAX`的值）。
- 当网格容器宽度调到很小时（比如 `222.5px`），`minmax(100px, 220px)` 返回的值是 `100px`，即第一列的网格轨道宽度是 `100px`（`MIN`的值）。
- 另外，`minmax(100px, 220px)` 还会返回一个 `100px ~ 220px` 之间的值，比如当容网格容器宽度是 `300px` 时，`minmax(100px, 220px)` 返回的值就是 `177.34px`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0990112159dc40c9bb61bf62fa15b869~tplv-k3u1fbpfcp-zoom-1.image)

正如你所看到的，示例中网格的第二、第三列的收缩和扩展会根据网格容器可用空间变化（因为它们的轨道宽度设置的值是 `1fr`），但第一列网格轨道的宽度总是保持在 `100px` 至 `220px` 之间，最小不小于 `100px` ，最大不大于 `220px` 。

我们把上面这个示例中的 `220px` 换成一个`<percentage>` （`%` 值），比如 `50%` ：

```CSS
.container {
    grid-template-columns: minmax(100px, 50%) 1fr 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec222bbeffdd4457a9fda7874c9f18b9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWrXOJm>

当`minmax(MIN, MAX)` 的值为百分比值时（示例中的 `MAX=50%`），那么它们就是一个动态值。上一节课程中我们聊到过，网格轨道的值是一个百分比值时：

- `grid-template-columns` 或 `grid-auto-columns` 值是百分比值时，它相对于网格容器内联轴（`inline-size`）尺寸计算；
- `grid-template-rows` 或 `grid-auto-rows` 值是百分比值时，它相对于网格容器块轴（`block-size`）尺寸计算。

所以我们示例中的 `MAX` 值相对于网格容器宽度来计算，即示例中的 `MAX` 的值等于 `W × 50%` （其中 `W` 是网格容器的宽度）：

- 当 `W = 1000px` 时，`MAX = 50% × (1000px - 20px) = 490px`；
- 当 `W = 800px` 时， `MAX = 50% × (800px - 20px) = 390px`；
- 当 `W = 500px` 时， `MAX = 50% × (500px - 20px) = 240px`；
- 当 `W = 300px` 时， `MAX = 50% × (300px - 20px) = 140px`；
- 当 `W = 200px` 时， `MAX = 50% × (200px - 20px) = 90px`。

这样一来，`minmax(100px, 50%)` 代表的范围值也会随着网格容器宽度而变化，并且计算出来的 `MAX` 值也有可能会比 `MIN` 值小，比如当你把网格容器宽度调整到 `200px` 时，计算出来的 `MAX` 值就要比 `MIN` 值小。出现这种现象时，`MAX` 值将会被忽略，`minmax(MIN, MAX)` 函数最终会取 `MIN` 值作为函数的返回值。

这个观点是通用的：

> **`minmax(MIN, MAX)` 函数，如果 `MAX` 小于 `MIN` 时， `MAX`** **将会被忽略，最终** **`minmax(MIN, MAX)`** **函数将会返回** **`MIN`** **的值** 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48808eb7bd614295bfee7c08e75a38c7~tplv-k3u1fbpfcp-zoom-1.image)

`minmax(MIN, MAX)` 函数中的两个参数都可以取百分比（`%`）值，比如：

```CSS
.container {
    grid-template-columns: minmax(30%, 50%) 1fr 1fr;
}
```

但是这样使用，有可能计算出来的值会比网格轨道中网格项目内容（元素）的最小尺寸（`min-content`）还会小，甚至网格列宽会趋于 `0` ，将会造成网格项目溢出网格列轨道：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e1355afd66447708e4a31ea70d30c80~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/BaxXydr>

因此，在使用 `minmax(MIN, MAX)` 函数设置网格轨道时，不建议 `MIN` 和 `MAX` 都取 `<percentage>` （`%`）值，更建议在 `minmax(MIN, MAX)` 中把 `%` 值和其他类型值结合起来使用，比如：

```CSS
/* <inflexible-breadth>, <track-breadth> 值 */ 
minmax(400px, 50%)        /* ~> MIN = 400px;         MAX = 50% */
minmax(30%, 300px)        /* ~> MIN = 30%;           MAX = 300px */

/* <fixed-breadth>, <track-breadth> 值 */ 
minmax(1fr, 50%)           /* ~> MIN = 1fr;          MAX = 50% */ 
minmax(400px, 50%)         /* ~> MIN = 400px;        MAX = 50% */
minmax(30%, 300px)         /* ~> MIN = 30%;          MAX = 300px */ 
minmax(50%, min-content)   /* ~> MIN = 50%;          MAX = min-content */ 

/* <inflexible-breadth>, <fixed-breadth> 值 */ 
minmax(400px, 50%)         /* ~> MIN = 400px;        MAX = 50% */ 
minmax(30%, 300px)         /* ~> MIN = 30%;          MAX = 300px */
minmax(min-content, 50%)   /* ~> MIN = min-content   MAX = 50% */
```

在 `minmax(MIN, MAX)` 函数中的参数值还可以是一个 `<flex>` 值（`fr` 单位值），如果该函数的有一个值是 `fr` 单位的值时，它会按 `fr` 计算来取值，而且和其他设置了 `fr` 单位值一起计算，分配网格容器可用空间。比如：

```CSS
.container {
    grid-template-columns: minmax(100px, 1fr) 1fr 1fr;
}
```

当 `minmax(100px, 1fr)` 取 `MIN` 值时，则返回的是 `100px` ；当它取 `MAX` 值时，则返回的是 `1fr` ，此时 `grid-template-columns` 的值相当于 `1fr  1fr  1fr` 。每个 `fr` 则等于网格容器可用空间的三分之一（因为总共有`3` 个 `fr` ，即 `1fr + 1fr + 1fr`）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1abc1ad323243348635bf45d4bae92b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/VwxoYor>

当你改变网格容器尺寸时，你会发现，如果网格容器有足够空间，`minmax(100px, 1fr)` 则会取 `1fr` ，反之则会取 `100px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a770ad430c0c4d73b3019bf555f665b2~tplv-k3u1fbpfcp-zoom-1.image)

不过需要注意的是，`minmax(MIN, MAX)` 函数取 `fr` 单位值时，不能同时给 `MIN` 和 `MAX` 都设置 `fr` 单位的值，因为两个参数值都取 `fr` 单位值，浏览器会视该属性值无效：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd1ca9bac4b642ef89425b5559052de1~tplv-k3u1fbpfcp-zoom-1.image)

针对这一点，W3C 规范中有做过相应的描述：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba52f4c5236c4ae78813c829be5b8d8f~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，**在** **`minmax(MIN, MAX)`** **函数中使用** **`fr`** **单位值时，只能用于** **`MAX`** **值中** 。换句话说，`minmax(MIN, MAX)` 中 `MAX` 取 `fr` 单位值，可以和其他单位（除 `fr`之外）类型 `MIN` 值混合使用，比如示例中的 `minmax(100px, 1fr)`。即使是这样，也有可能 `1fr` 计算出来的值会小于`100px`，要是出现这种现象，`minmax(100px, 1fr)`并不会无效，它最终会返回 `MIN` 的值（即 `100px` ）。

在介绍 `fr` 的时候，我们聊到所有设置 `1fr` 值的列网格轨道，并不一定能让所有网格列轨道宽度相等，但可以使用 `minmax(0, 1fr)` 来替代 `1fr` ，实现列相等（均分列）的布局效果：

```CSS
.container {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr); 
    
    /* 等同于 */
    grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b03dbeeb5d2342949d69da397f3a0dc0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxjvwqQ>

正如你所看到的，设置 `minmax(0, 1fr)` 的网格轨道的宽度是在 `0 ~ 1fr` 之间变化，最小为 `0`，最大不会超过 `1fr`。

当然，你也可以将 `MAX` 设置为`0` ，比如 `minmax(100px, 0)` 、`minmax(30%, 0)` 都是有效的，只不过最终会取 `MIN` 的值作为 `minmax(MIN, MAX)` 函数的返回值，这也符合前面的规则，**当 `minmax(MIN, MAX)`** **函数中的** **`MAX`** **值小于** **`MIN`** **值时，会返回** **`MIN`** **值** 。

另外需要注意的是，示例中 `minmax(0, 1fr)` 是一个有效值，但 **`minmax(1fr, 0)` 则是一个无效值。这是因为 `minmax(MIN, MAX)` 函数只能在 `MAX` 参数设置 `fr` 单位值，否则 `minmax(MIN, MAX)` 也将是一个无效值** 。

`minmax(MIN, MAX)` 函数参数除了可以取长度值之外，还可以取一些描述长度的关键词，比如 `auto` 、`min-content` 、`max-content` 等。比如：

```CSS
grid-template-columns: minmax(auto, auto) minmax(min-content, min-content) minmax(max-content, max-content);
```

依旧通过几个简单的示例向大家展示 `minmax(MIN, MAX)` 函数取关键词作为值时，对网格轨道尺寸有何影响。先来看 `auto` 值：

```CSS
.container {
    grid-template-columns: minmax(auto, auto)  1fr 1fr;
}
```

在 `minmax(MIN, MAX)` 函数中使用关键词 `auto` 时：

- 当 `auto` 作为 `MAX`值（`minmax(100px, auto)`），`auto`值相当于 `max-content`（`minmax(100px, max-content)`），即 `minmax(100px, auto)` 等同于 `minmax(100px, max-content)`。
- 当 `auto` 作为 `MIN` 值（`minmax(auto, 1fr)`），它的值由对应网格轨道中内容的最小尺寸指定，`auto` 有时相当于 `min-content` （`minmax(min-content, 1fr)`），即 `minmax(auto, 1fr)` 等同于 `minmax(min-content, 1fr)`，但并非总是如此，因为有时候会受网格项目的 `min-width` （ `min-inline-size`）或 `min-height` （ `min-block-size`）值影响。如果显式指定网格项目的`min-width` 或 `min-inline-size` ，那么 `min-content` 等于 `min-width` 或 `min-inline-size`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce624f9266e0407db568c15b5fb2974b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/VwxovVY>

当 `minmax(MIN, MAX)` 函数取 `min-content` 值时，它的大小由相应网格轨道中的内容来决定，在网格列轨道中，`min-content` 的值将等同于所在列网格轨道中网格项目的内容最小尺寸。

```CSS
.container {
    grid-template-columns: minmax(min-content, min-content)  1fr 1fr;
}
```

示例中的第一列尺寸始终等于所有列的内容最小尺寸：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7351bf5bf48140e69fb388c0f45f8e4b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/oNdKjKX>

`min-content` 值可以只是 `minmax(MIN, MAX)` 函数当中的某一个参数值，它可以和其他值类型混合使用，但需要注意：

- 当 `minmax(MIN, MAX)` 中的 `MAX` 值为 `min-content` 时，如果`min-content` 计算出来的值小于 `MIN` ，`minmax(MIN, MAX)` 函数返回的则是 `MIN` 值，反之则返回的是 `MIN` 至 `min-content` 之间的一个范围值。
- 当 `minmax(MIN, MAX)` 中的 `MIN` 值为 `min-content` 时，如果 `min-content` 计算出来的值大于 `MAX` ，`minmax(MIN, MAX)`函数返回的是 `min-content`，反之则返回的是 `min-content` 至 `MAX` 之间的一个范围值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5c63b2b1e164594b5f1f9ee8ec38e0d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/Vwxoejj>

`minmax(MIN, MAX)` 取 `max-content` 值时有点类似于 `min-content` ，不同的是取最大长度，这个长度也称为“理想大小”，它可以容纳它包含的内容。比如网格项目是一个句子，那么理想长度就是这个句子长度，而且不用考虑长度，也不会换行：

```CSS
.container {
    grid-template-columns: minmax(max-content, max-content)  1fr 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c07765b02ba14240853634e81b011c47~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNvXxvN>

同样的，`max-content` 在 `minmax(MIN, MAX)` 函数中与其他类型值混合使用，需要注意的是：

- 当 `minmax(MIN, MAX)` 函数中的 `MAX` 值为 `max-content` 时，如果 `max-content` 的计算值大于 `MIN` 值时，`minmax(MIN, MAX)` 函数返回的值是一个 `MIN` 至 `max-content` 计算值之间的范围值；反之会忽略 `max-content` ，函数返回的是 `MIN` 值。
- 当 `minmax(MIN, MAX)` 函数中的 `MIN` 值为 `max-content` 时，如果 `max-content` 的计算值小于 `MAX` 值时，`minmax(MIN, MAX)` 函数返回的值是一个 `max-content` 至 `MAX` 之间的范围值；反之则会返回 `max-content`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21df176dfdb749e6a8c60748ccb83a82~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/poVMgxm>

这样一来，在 `minmax(MIN, MAX)` 函数中同时使用 `min-content` 和 `max-content` 时，你可以得到一个响应式极强的布局效果，网格项目的内容永远不会溢出所在网格轨道：

```CSS
.container {
    grid-template-columns: minmax(min-content, max-content)  1fr 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/251ffdf7aed14968a8f08ded4aff26b6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/zYjgrVq>

我们来看一个真实的 Web 布局案例。使用 `minmax(MIN, MAX)` 函数来构建一个博客文章展示的页面：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e2e7378215a4af8913e428ec0bd365c~tplv-k3u1fbpfcp-zoom-1.image)

实现上图这种带有响应式布局效果，仅仅使用几行 CSS 代码即可：

```HTML
<body>
    <main>
        <h2>现代 Web 布局</h2>
    </main>
</body>
```

```CSS
body {
    grid-template-columns: minmax(1rem, 1fr)  minmax(auto, 70ch)  minmax(1rem, 1fr);
}

main {
    grid-column: 2 / 3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5725dcadda8e470188c67379296dcd5b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/BaxXKNv>

示例中的 `grid-template-columns` 创建了一个三列网格布局，其中第一列和第三列的宽度是由 `minmax(1rem, 1fr)` 决定，当视窗足够宽时，这两列的宽度是 `1fr` ，当视窗没有足够宽的时候，这两列的宽度是 `1rem` ，所以你会看到，在桌面端上，`mian` （主内容）两侧有很大的空白空间，实现了类似主内容水平居中的效果；在平板和手机端上时，两侧只有 `1rem` 的间距。而主内容（即第二列）列宽是 `minmax(auto, 70ch)` ，浏览器有足够空间时，它的宽度是 `70ch` ，如果浏览器视窗空间不足时，则由 `main` 自己的内容来决定（即 `auto` ）。

网格布局中，使用 `repeat()` 函数，`minmax(MIN, MAX)` 和 `auto-fit` 或 `auto-fill` （**RAM布局技术** ）可以构建一个无媒体查询的响应式布局。

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}
```

虽然效果上看上去不错，但它有一个缺陷存在，当浏览器视窗的宽度小于 `minmax(MIN, MAX)` 中的 `MIN` 值时，浏览器就会出现水平滚动条或溢出内容被裁剪：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0aee213420f46e39356f991ea5327e0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/mdLZMBp>

其实，我们可以在 `minmax(MIN, MAX)` 函数中嵌套 CSS 的比较函数（`min()` 、`max()` 、`clamp()`），可以让该布局更为完美。比如，你可以在 `minmax(MIN, MAX)` 函数中嵌套一个 `min()` 函数：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 1.5rem;
}
```

在 `minmax(MIN, MAX)` 函数中嵌套了一个 `min(100%, 250px)` 函数。在我们这个示例中，`min()` 函数中的百分比也是相对于网格容器的内联轴方向尺寸（即宽度）计算，`min()` 函数中的两个参数会相互比较，并且取更小的值作为该函数的返回值，它有点类似于设置了一个 `max-width` 值，即 `min(100%, 250px)` 相当于 `max-width: 250px` 。

就该例而言，网格容器的宽度会随着浏览器视窗宽度变小，也就是说，当浏览器视窗宽度小到一个临界值时，`min(100%, 250px)` 返回的值就会小于 `250px` ，此时， `min(100%, 250px)` 函数返回的值就是 `100%` ，这样一来，就可以避免浏览器出现水平滚动条（除非小到无法容纳内容）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0fd4242e3d84cbca975e75066873c1f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/NWzKwwN>

## min() 、 max() 和 clamp() 函数

> **`min()` 、 `max()`** **和** **`clamp()`** **统称为 CSS 比较函数，可以给这些函数传入一个列表值，并对这些值做相应的比较，最终返回一个最适合的值。它们也可以像** **`clac()`** **函数，****支持****使用加法 (****`+`****)、减法 (****`-`****)、乘法 (****`\*`****) 和除法 (****`/`****) 的数学表达式作为值** 。

CSS 网格布局中，这些函数都可以用于设置网格轨道和网格沟槽的大小。比如：

```CSS
.container{
    grid-template-columns: 1fr min(65ch, 100%) 1fr;
    gap: clamp(1.5rem, 6vmax, 3rem);
}
```

`min()` 、`max()` 和 `clamp()` 函数用来设置网格轨道尺寸时和 `minmax(MIN, MAX)` 是有一定差异的：

- `minmax(MIN, MAX)` 返回的是 `MIN ~ MAX` 之间的一个值，最小是 `MIN`，最大是 `MAX`；
- `min()` 返回的是函数列表参数中最小的值，比如 `min(100px, 200px)` 返回的是 `100px`；
- `max()` 返回的是函数列表参数中最大的值，比如 `max(100px, 200px)` 返回的是 `200px`；
- `clamp(MIN, VAL, MAX)` 更类似于 `minmax(MIN, MAX)`，返回的是一个区间值。即 `clamp(MIN, VAL, MAX)`，其中 `MIN` 表示最小值，`VAL` 表示首选值，`MAX` 表示最大值。如果 `VAL` 在 `MIN` 和 `MAX` 之间（`MIN < VAL < MAX`），则使用 `VAL` 作为函数的返回值；如果`VAL` 大于 `MAX` （`VAL > MAX`），则使用 `MAX` 作为函数的返回值；如果 `VAL` 小于 `MIN` （`VAL < MIN`），则使用 `MIN` 作为函数的返回值。

我们来看一个 CSS 比较函数用于网格轨道尺寸设置的示例。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ad2f311e5484263893cf3f5b595075d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/BaxXKNv>

这个示例是前面介绍 `minmax(MIN, MAX)` 函数的示例：

```CSS
body {
  display: grid;
  grid-template-columns: minmax(1rem, 1fr) minmax(auto, 70ch) minmax(1rem, 1fr);
}
```

使用 `minmax(auto, 70ch)` 设置了主内容列的尺寸，对于同等效果，我们还可以使用 `min()` 函数来替换：

```CSS
body {
  display: grid;
  grid-template-columns: minmax(1rem, 1fr) min(100% - 2rem, 70ch) minmax(1rem, 1fr);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/404c7f79b25549979f9a3c7662b22c60~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/dyKbZLB>

两个方法构建出来的布局效果是等同的。这里使用 `min(100% - 2rem, 70ch)` 替代了 `minmax(auto, 70ch)` ，它所起的作用是：

- 当浏览器视窗宽度足够大时（宽屏），`100% - 2rem` 计算出值会大于 `70ch` ，因此 `min(100% - 2rem, 70ch)` 将返回 `70ch`；
- 当浏览器视窗宽度不够大时（窄屏），`100% - 2rem` 计算出值就会小于 `70ch` ，因此 `min(100% - 2rem, 70ch)` 将返回 `100% - 2rem`。

你可能会好奇，为什么会是 `100% - 2rem` 呢？这是因为示例中第一列和第三列，它设置值是 `minmax(1rem, 1fr)` ，输出的最小值就是 `1rem`，而且只有在浏览器视窗宽度较小时才会出现。在这种现象下，如果 `min()` 函数设置 `min(100%, 70ch)`， 就会造成浏览器出现水平滚动条或内容溢出。为了避免该现象，把 `min()` 函数中的 `100%` 替换成 `100% - 2rem` 。

你还可以使用 `clamp()` 函数来替代上面示例中的 `min()` 函数，让布局在一个尺寸范围具有一个更好的效果：

- 设置一个最小屏尺寸，比如 `320px - 2rem` （浏览器视窗最小宽度是 `320px`）；
- 设置一个最大屏尺寸，比如 `70c`；
- 设置一个最佳值，比如 `100vw - 2rem`。

```CSS
body {
  display: grid;
  grid-template-columns:
    minmax(1rem, 1fr) 
    clamp(320px - 2rem, 100vw - 2rem, 70ch) 
    minmax(1rem, 1fr);
}
```

效果几乎是一样的，但浏览器视窗小于 `320px` 时，将会出现水平滚动条：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54ae20bbd0d14fa48dfa6ae4ac1b1edb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/GRGKygZ>

在实际使用的时候，更建议将 CSS 的比较函数与 `minmax(MIN, MAX)` 以及关键词 `min-content` 或 `max-content` 结合起来使用。这样能更好地帮助你构建一个内在 Web 布局。

## fit-content() 函数

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60623a8491c446dca01fdc76ff09690c~tplv-k3u1fbpfcp-zoom-1.image)

上图这样的两列布局是一种很常见的布局，即 **侧边栏固定尺寸，主内容栏能随浏览器视窗尺寸进动调整** 。你可以像下面这样使用 CSS Grid 来构建：

```CSS
body {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 250px 1fr;
    grid-template-areas: "sidebar  main";
}
```

但是，如果浏览器的视窗尺寸较小，有可能因为缺少足够的空间导致样式出现问题。为了避免这种情况发生，通常会在 CSS Grid 布局中使用媒体查询：

```CSS
body { 
    display: grid; 
    gap: 1.5rem; 
    grid-template-areas: 
        "sidebar" 
        "main"; 
} 

@media (min-width: 760px) { 
    body { 
        grid-template-columns: 250px 1fr; 
        grid-template-areas: "sidebar main"; 
    } 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35b23501ff344a9ba03eabcab7a18d92~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/PoaYEpp>

示例中的侧边栏（网格第一列）是一个固定尺寸，即 `250px` 。不过，我们希望它的尺寸能更灵活些：

- 当浏览器视窗足够宽的时候，它的宽度能大一些，比如是 `250px`；
- 当浏览器视窗比较窄时，它的宽度能小一些，比如根据内容来决定。

你可能会想到使用 `minmax(min-content, 250px)` 来实现。在网格布局中除了使用 `minmax(MIN, MAX)` 函数之外，还可以使用 `fit-content()` 函数。你可以给 `fit-content()` 函数传一个 `<length-percentage>` 值，比如上面的示例，可以将 `250px` 换成 `fit-content(250px)` ：

```CSS
body {
    grid-template-columns: fit-content(250px) 1fr;
}
```

![fig-12-37.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5baca12885fc44d39fdbca4460d23dba~tplv-k3u1fbpfcp-watermark.image?)

> Demo 地址： <https://codepen.io/airen/full/jOKNZXO>

示例中的 `fit-content(250px)` 其实相当于：

```CSS
fit-content(250px) = min(min(max-content, available-size), max(min-content, 250px)) 
```

公式中的 **`available-size`** **指的是网格中的可用宽度** 。

除此之外，规范中还提供了另一种公式来描述 `fit-content()`:

```CSS
fit-content(<length-percentage>) = max(minimum, min(limit, max-content))
```

其中：

- ①：`minimum` 代表自动最小值（通常但不总是等于 `min-content` 最小值）；
- ②：`limit` 是作为参数传给 `fit-content()` 参数，即 `<length-percentage>`，比如示例中的 `250px`；  
- ③：`min()` 返回 `limit` 和 `max-content` 中更小的值，比如这个示例，`min()` 返回的是 `250px` 和 `max-content` 更小的一个；
- ④：`max()` 返回是 `minimum` 和 `min(limit, max-content)` 两个值中更大的一个。

如果上面的描述不易于理解的话，我们可以这样来理解。比如示例中的 `fit-content(250px)`，表示该列网格轨道宽度不会超过 `250px`，并且可以在内容很短的情况下缩小到 `250px` 以下。

另外，一般使用 `fit-content()` 函数时，传递给该函数的参数 `<length-percentage>` 一般都是小于元素的 `max-content` 值。比如 `fit-content(250px)`，其中 `250px` 是小于元素 `max-content` 值。

在这种情况下，元素最终的渲染尺寸介于 `min-content` 和 `250px` 之间。具体是多少，还要看当前的可用空间尺寸（`available-size`），如果可用空间充足，会使用最大的 `250px`，如果可用空间小，就会取 `min-content` 到 `250px` 之间的某个值，如果可用空间不充足（比 `min-content` 还小），那就会使用最小值 `min-content`，不能再小。

当然，如果 `fit-content()` 函数中的值比元素的 `max-content` 还大，那么元素最终渲染尺寸介于 `min-content` 和 `max-content` 之间。具体是多少还要看当前的可用空间大小，与上面类似。

总之，`fit-content()` 返回的最小值是 `min-content`，不能比 `min-content` 值更小。

需要注意的是，使用 `fit-content()` 函数设置网格轨道时，该函数只能接受一个 `<length-percentage>` （即 `<length>` 值，比如 `250px`；或 `<percentage>` 值，比如 `25%`）。其他值用于该函数将会被视为一个无效值，比如一个 `<flex>` 类型的值 `1fr` 。

## 小结

在这一节课程中，主要和大家一起探讨了可用于网格轨道尺寸设置的 CSS 函数，其中 `repeat()` 、`minmax()` 和 `fit-content()` 函数是 CSS 网格布局中独有的，而 `min()` 、`max()` 和 `clamp()` 函数（**CSS 比较函数** ）类似于 CSS 的 `calc()` 函数，除了可以用来设置网格轨道尺寸之外，还可以用于其他长度属性上，比如 `padding` 、`margin` 、`width` 和 `font-size` 等。

除了 `repeat()` 函数之外，其他函数都可以用于 `grid-template-columns` 、`grid-template-rows` 、`grid-auto-columns` 和 `grid-auto-rows` 属性上。 `repeat()` 函数只用于 `grid-template-columns` 和 `grid-template-rows` 属性上设置显式网格轨道尺寸。

在 CSS 网格布局中，我们应该尽可能避免使用像 `<length>` 和 `<percentage>` 这样的长度值来设置网格轨道尺寸，尽可能地使用这些函数与关键词 `min-content` 、`max-content` 、`auto` 和 `<flex>` （`fr`）值来设置网格轨道大小，这样做可能让你的网格更灵活，不容易造成内容溢出打破 Web 布局！
