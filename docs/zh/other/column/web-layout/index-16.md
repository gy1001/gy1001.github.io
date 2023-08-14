# 16-网格布局中的子网格和嵌套网格

就网格布局而言，自诞生之日起，就是为二维布局和优化布局系统而设计，Web 设计师和开发人员也为此感到兴奋。通过前面课程的学习，我想你已经领略到了网格布局的魅力，**网格布局让你可以轻松地做许多以前做不到的事情** 。

尽管 CSS 网格是对 CSS 最伟大的补充之一，但它缺少一个重要的东西，**元素无法从其父元素中继承列或行**。也就是说，**嵌套网格不能继承其父网格的特性** 。但 CSS 的子网格可以做到这一点，而且该特性一直以来都被认为是一个很重要的功能。

一段时间以来，关于子网格（`subgrid` )的使用情况、如何实现它的问题有很多讨论，甚至还有一些关于是否需要它的辩论。很多观点是期望使用 “**嵌套网格** ” 和 “**`display:contents`** ”来替代子网格（`subgrid`）。

在本文中，我将花一些篇幅来阐述嵌套网格和子网格，我将尝试强调子网格预期要解决的问题、它的工作方式以及它的一些潜在用例。 对于 `display: contents` ，在后面的课程中将会以一个节的篇幅来向大家介绍。

那我们先从嵌套网格开始。

## 嵌套网格

如果你是一名经历过早期表格布局的 Web 开发者，那么对于嵌套网格就比较好理解。在 Web 布局技术匮乏的年代，要实现一个复杂的 Web 布局，往往需要在一个表格中嵌套一个或多个表格，比如下面这个 Web 页面：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fde83deb3c1d4cc3bb25c762f90d7419~tplv-k3u1fbpfcp-zoom-1.image)

上图中是一张 2003 年的 Web 页面，这张 Web 页面对于现在而言并不复杂，但在当初那个年代只能使用表格（HTML的 `<table>`）构建布局时，算是复杂的了，尤其是右侧的导航部分。因此使用了表格嵌套表格的技术来实现。

不知道大家是否还有印象，在介绍 Flexbox 布局时，我们有介绍过，在 Flexbox 布局中，任何一个 Flex 项目只要将 `display` 的值设置为 `flex` 或 `inline-flex` ，它自身既是一个 Flex 项目，也是它的子元素的 Flex 容器。也可以说是 Flex 容器嵌套了一个 Flex 容器。

我们要聊的嵌套网格和表格嵌套以及 Flex 容器嵌套是相似的。**如果你在网格项目显式设置了** **`display`** **属性的值为** **`grid`** **或** **`inline-grid`** **，那么该网格项目既是其父元素（网格容器）的一个网格项目了，同时也是其子元素的网格容器** 。如此一此，就实现了**网格嵌套网格** ，也就是我们所说的**嵌套网格** 。

比如：

```HTML
<!-- Flex 容器嵌套 Flex 容器 -->
<div class="flex__container--parent">
    <div class="flex__item">Flex 项目</div>
    <div class="flex__item flex__container--subflex"><!-- 既是 Flex 容器，也是 Flex 项目 -->
        <div class="flex__item">Flex 项目</div>
    </div>
</div>

<!-- Grid 嵌套 Grid -->
<div class="grid__container--parent">
    <div class="grid__item">Grid 项目</div>
    <div class="grid__item grid__container--subgrid"><!-- 既是 Grid 容器，也是 Grid 项目 -->
        <div class="grid__item">Grid 项目</div>
    </div>
</div>
```

```CSS
.flex__container--parent {
    display: flex; /* 或 inline-flex */
}

.flex__container--subflex {
    display: flex; /* 或 inline-flex */
    
    /* 也可以设置关键词 inherit ，表示继承其父元素的 display 值 */
    display: inherit;
}

.grid__container {
    display: grid; /* 或 inline-grid */
}

.grid__container--subgrid {
    display: grid; /* 或 inline-grid */
    
    /* 也可以设置关键词 inherit, 表示继承其父元素的 display 值 */
    display: inherit;
}
```

如果用 DOM 树来描述的话，它们的关系如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b184c3b4c5d34e778c0f6ee841dbf32b~tplv-k3u1fbpfcp-zoom-1.image)

我们来看一个嵌套网格的真实示例：

```HTML
<div class="container parent">
    <div class="item"></div>
    <div class="item subgrid">
        <div class="item"></div>
    </div>
</div>
```

```CSS
/* 创建父网格容器 */ 
.parent { 
    display: grid; 
    grid-template-columns: 1fr 2fr 3fr 2fr 1fr; 
    grid-template-rows: 1fr 2fr 2fr 1fr; 
    gap: 1rem; 
} 

/* 创建嵌套网格 */ 
.subgrid { 
    grid-column: 2 / 5; 
    grid-row: 2 / 4; 
    display: inherit; 
    grid-template-columns: inherit; 
    grid-template-rows: inherit; 
    gap: inherit; 
 }
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bd105840b3e4367a4663ef3d7645b06~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/MWXyqmW>

示例中，元素 `.parent` 和 `.subgrid` 都是一个网格容器，其中 `.subgrid` 元素的 `display` 属性继承其父元素 `.parent` 的 `display` 值，即 `grid` 。并且在 `.parent` 元素上设置了 `grid-template-columns` 和 `grid-template-rows` 属性，显式定义了网格轨道的数量和尺寸，即 `.parent` 是一个四行五列（`4 x 5`）的网格。如此一来，`.parent` 元素就具备了网格该有的特性，比如网格线名称、网格轨道尺寸等。

与此同时，在网格项目三上使用 `grid-row` 和 `grid-column` 将其放置在了 `2 / 2 / 4 / 5` 网格线围绕的一个区域（合并了三列两行）。除此之外，该元素（`.subgrid`）也显式设置了 `display` 、`grid-tempalte-columns` 、`grid-template-rows` 和 `gap` 属性，并且都继承其父元素的相应属性的值：

```CSS
.subgrid {
    display: inherit;
    grid-template-columns: inherit;
    grid-template-rows: inherit;
    gap: inherit;
    
    /* 等同于 */
    display: grid;
    grid-template-columns: 1fr 2fr 3fr 2fr 1fr; 
    grid-template-rows: 1fr 2fr 2fr 1fr; 
    gap: 1rem; 
}
```

所以 `.subgrid` 也是一个四行五列（`4 x 5`）的网格。即：`.parent` 网格中嵌套了一个 `.subgrid` 网格，并且两个网格的特性是相同的：相同数量的网格轨道（行网格轨道和列网格轨道）、相同单位值的网格尺寸和相同的网格线名称以及相同的网格轨道间距。

正如上图中所示，草绿色网格线构建的是父网格（即 `.parent` 元素），褐色网格线构建的是子网格（即 `.subgrid` 元素），这两个网格是相互嵌套的关系。

虽然 `.subgrid` 子网格继承了其父网格 `.parent` 所有属性的值，但并不代表着它们是完全两个相同的网格。或者简单地说，**嵌套的两个网格都有自己独立的网格系统** ，比如网格轨道尺寸、网格线编号等。换句话说，你可以在两个网格容器上显式设置 `grid-template-*` 和 `grid-auto-*` 以及 `gap` 等属性的值，它们可以设置完全相同的值（比如上面这个示例），也可以是完全不同的值，比如：

```CSS
.parent {
    display: grid;
    
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    grid-template-rows: 100px 1fr 100px;
    grid-auto-rows: 100px;
    
    gap: 1rem;
}

.subgrid {
    display: inherit; /* 必不可少的，也可以设置为 grid 或 inline-grid */
    
    grid-template-columns: auto 1fr auto;
    grid-auto-rows: 1fr 120px;
    
    gap: 10px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46c5c1feb11b4347896b20610e3830af~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWxNZqE>

从上面的示例中，不难发现嵌套网格布局的缺陷。**嵌套网格是独立于父网格和相互之间的** ，即 **嵌套网格是独立的一个网格，但又是父网格的的一个网格项目**。这也意味着嵌套网格不会从父网格中获取它们的轨道尺寸，这使得嵌套网格项目与父网格的排列更加困难。

嵌套网格内所做的更改不会涉及父级容器，因此，在布局时需要考虑两个独立的网格，出错率就更大，维护更难，效率也变得更低。 嵌套网格还存在的一个问题就是它的灵活性，在响应式设计中会产生一个问题，即里面的元素溢出了网格容器元素的边界之外。

## 嵌套网格的痛楚

上面用了两个简单的示例向你展示了什么是 **嵌套网格** ，你也知道了嵌套网格的缺陷。当使用 CSS 网格来构建 Web 布局时，你已经可以使用嵌套网格了。但因为嵌套网格自身不可避免的缺陷，往往会给使用带来诸多的麻烦，比如你需要花时间去计算子网格轨道尺寸大小，而且你可能要不断地去计算。另外，随着嵌套的层级越深，维护起来就越困难。

比如，你有下面这样的一个 Web 布局，它是一个 `12` 列网格，其中父网格中分成 `A` 和 `B` 相等的两列；但是 `B` 列里又包含了个子网格，它被为 `B1` 和 `B2` 两列，而且 `B2` 列的宽度是 `B1` 列的两倍：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8a55fa023794d0e91c35d0b1dcfba31~tplv-k3u1fbpfcp-zoom-1.image)

使用嵌套网格很容易就能实现：

```HTML
<div class="parent--grid">
    <div class="item item--a">A</div>
    <div class="sub--grid item--b item">
        <div class="item">B1</div>
        <div class="item">B2</div>
    </div>
</div>
```

```CSS
.parent--grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr); /* 可以将 1fr 换成 minmax(0, 1fr) */
    gap: 20px;
}

.item--a {
    grid-column: 1 / span 6;
}

.item--b {
    grid-column: 6 / span 6;
}

.sub--grid {
    display: inherit;
    gap: inherit;
    grid-template-columns: repeat(6, 1fr); /* 可以将 1fr 换成 minmax(0, 1fr) */
}
```

当父网格（`.parent--grid`）和子网格（`.sub--grid`）的列网格轨道比率是相同时，那么这个嵌套网格是完美的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f679aaba81748a7a5fee665868da53f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/XWYKpdP>

它还可以进一步优化，父网格是两列，你可以将 `grid-template-columns` 设置为 `repeat(2, minmax(0, 1fr))` ，实现真正的两列列宽相等的效果。同时将子网格的 `grid-template-columns` 属性的值设置为 `1fr 2fr` ，实现 `B2` 列的列宽是 `B1` 列的列宽的两倍：

```CSS
.parent--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.item--a {
    grid-column: 1;
}

.item--b {
    grid-column: 2;
}

.sub--grid {
    grid-template-columns: 1fr 2fr;
}
```

实现的效果是相同的，也算是完美的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b16807a1c184fe1b49d66978b491118~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/NWzrdYw>

看上去似乎是完美的，事实上你看到的是一种假象。你可以尝试着往里面填充真实的内容， `B1` 和 `B2` 计算出来的列网格轨道尺寸就有可能会小于其 `min-content` 尺寸。这个时候，子网格中网格项目的内容就会溢出网格容器，也将打破 Web 布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6cef0eec3984e97b6481a7aa0a2b44b~tplv-k3u1fbpfcp-zoom-1.image)

即使你在网格项目上显式设置了 `min-width` 的值为 `0` ，避免网格轨道尺寸小于网格项内容的最小尺寸（`min-content`），同样会造成内容溢出网格项目：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e06dc16cb7ea4e4e84b59aff0fbf2218~tplv-k3u1fbpfcp-zoom-1.image)

因为 Web 的内容是动态的，你无法掌握输出的内容是什么？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21cf53f855ac4ada9d25ecbff440844d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/RwJRKEo>

你已经看到了由于内容的不同，子网格的 `B2` 列是 `B1` 两倍宽已不存在了，即使在网格项目上设置 `min-width` 为 `0` ，网格轨道尺寸符合要求（ `B2` 列是 `B1` 两倍宽），内容也会溢出，布局效果也不再完美。

就这个示例而言，父网格和子网格的网格轨道尺寸的比率刚好相匹配，它们的网格轨道看上去重叠在一起（有点像是子网格继承了父网格的网格轨道），但很多时候构建的嵌套网格，父网格轨道和子网格轨道尺寸不是这么相匹配的，比如上面示例，将子网格的 `grid-template-colums` 设置为 `3fr 5fr` ，这个时候，子网格轨道和父网格轨道就不怎么相互匹配了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04537f9c24de4210bd402b38735a0bf8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/ZEROeZQ>

嵌套网格的网格轨道与父网格的网格轨道没有关系。这意味着，如果我们想要将嵌套网格的轨道与外部网格（父网格）的轨道对齐，就必须使用计算轨道大小的方法来确保所有轨道保持相等（父网格轨道比例相匹配）。在上面的例子中，内外两个网格的网格轨道看起来是对齐的，直到一个较大尺寸的项目（比如 `B2` ）被添加到网格的一个单元格中(其使用更多的空间)。

对于列，相对而言还可以通过计算或限制网格的灵活性来避免上述情况。比如将 `1fr` 换成 `minmax(0, 1fr)` ，或者在网格项目上显式设置 `min-width: 0` ，以便在进行空间分配时忽略网格项目大小。甚至你还可以将网格轨道尺寸使用百分比来描述，只是这样的计算更为复杂。要是这样做，这就失去了使用网格的一些好处。另外，当涉及到嵌套网格行排列时，上面示例中提到的方法就不起作用了。

比如，拿卡片排列为例，父网格（外网格）是一个可以断行排列的网格，使用前面介绍的 RAM 布局技术（即 `repeat()` 、`auto-fill` 或 `auto-fit` 、`minmax()` ）就可以实现。

假设每张卡片都由“标题”，“缩略图”，“描述内容”和“页脚” 组成，并且还希望每张卡片的“标题”和“页脚”都能对齐。对于每张卡片的布局，你可能也想使用一个网格来构建（一列多行的网格）。即使是使用了嵌套网格构建，但也无法达到预期的效果（每张卡生标题和页面脚对齐），即 **只要子网格中任何一网格项目（行网格轨道中的网格项目）内容不同，它们就无法对齐** 。

```CSS
body {
    display: grid;
    gap: 1.5rem;
    
    /* RAM 布局技术 */
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 3rem, 400px), 1fr));
}

.card {
    display: inherit;
    gap: 10px;
    grid-template-rows: auto auto 1fr auto;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29ec74472e5f45ad96ebe078e16e9a79~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/JjZKNNp>

然而，在现代 Web 布局中并不是无法可解，上图中 Web 设计师所期待的效果，我们还是有办法的，比如接下来要介绍的 **子网格** 就是一种很好的解决方案。除此之外， `display: contents` 也是一种解决方案，这种方案我们将在后面的课程中详细介绍！

## 什么是子网格（`subgrid`）？

由于嵌套网格布局存在一定的缺陷，同时为了避免嵌套网格给布局带来的不利因素，[CSS Grid 布局模块 Level 2](https://www.w3.org/TR/css-grid-2/#subgrids) 新增了一个 `subgrid` （子网格）的新功能。

简单地说，子网格也像上面介绍的嵌套网格一样，子网格存在于另一个网格当中。你同样需要在子网格元素上显式设置 `display` 的值为 `grid` 或 `inline-grid` ，当然，也可以使用 `inherit` 关键词，继承父元素的 `display` 属性值。

网格布局中的子网格（`subgrid`）不会使用 `grid-template-rows` 和 `grid-template-columns` 指定具体的网格轨道尺寸和数量，否则它又将是嵌套网格。你只需要将子网格的 `grid-template-columns` 和（或）`grid-template-rows` 属性的值设置为 `subgrid` 。

具体的语法规则如下：

```CSS
 grid-template-rows: subgrid <line-name-list>? 
 grid-template-columns: subgrid <line-name-list>? 
 <line-name-list>      = [ <line-names> | <name-repeat> ]+
```

当 `grid-template-rows` 、 `grid-template-columns` 或两者都显式设置了 `subgrid` 的值，嵌套网格将采用其父网格定义的网格轨道。子网格的项目将参与任何与父网格共享的网格轨道的内在尺寸计算。从本质上讲，子网格提供了通过嵌套元素向下传递网格参数的能力，以及将其基于内容信息向上传递到父网格的能力。

如果在 `subgrid` 后面指定了 `<line-name-list>` 参数的话，将允许对与父网格共享的网格线进行本地命名：如果给出了 `<line-name-list>`，指定的 `<line-name>`（网格线名称）将被分配给子网格的显式网格线，每条一个，从第一条网格线开始，并且多余的网格线名称会被忽略。

只不过，到目前为止，网格布局中的 `subgrid` 只得到了 [Firefox 71+ 和 Safari 16 支持](https://caniuse.com/?search=subgrid)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1e06535bae140cd8c2841171377c1b8~tplv-k3u1fbpfcp-zoom-1.image)

所以接下来的示例，都以在 Firefox 71+ 浏览器渲染的效果为最终结果。对于不支持 `subgrid` 的浏览器，可以使用 `@``supports` 来做降级处理。只不过，我们课程中的示例将不做任何降级处理。

> 简单地说，该小册不考虑 `subgrid` 的兼容性，但接下来示例效果都是 Firefox 浏览器中的效果！

比如下面这个示例，可以初步体验一下子网格（`subgrid`）与嵌套网格的差异：

```CSS
.container { 
    display: grid; 
    grid-template-columns: 1fr 2fr 3fr 2fr 1fr; 
    grid-template-rows: 1fr 2fr 2fr 1fr; 
    gap: 1rem; 
} 

.grid__container--nested, 
.grid__container--subgrid { 
    grid-column: 2 / 5; 
    grid-row: 2 / 4; 
    gap: inherit; 
} 

.grid__container--nested { 
    display: inherit; 
    grid-template-columns: inherit; 
    grid-template-rows: inherit; 
 } 
 
.grid__container--subgrid { 
    display: inherit; 
    grid-template-columns: subgrid; 
    grid-template-rows: subgrid; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e261d6bc261d43d6aa54f0eadbbba49f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/BaVzeOa>

## 嵌套网格 vs. 子网格

首先来说嵌套网格和子网格的共同之处。嵌套网格和子网格都存在于另一个网格之中，简单地说，网格中有另一个网格存在。嵌套网格和子网格只有在网格项目跨越多个网格单元格才有意义（你可以使用 `grid-row` 、 `grid-column` 或 `grid-area` 实现这一点），当然，在单独的一个网格单元格也可以被似为网格区域，但这样做不是太有意义。

只不过，默认情况下，网格项目的子项目不是网格布局的一部分。如果没有子网格功能，你就需要创建一个嵌套网格并重新计算网格轨道，以便嵌套网格复制网格布局。事实上，嵌套网格和子网格并不是一回事。

正如前面所述，你可以在 `grid-template-columns` 和 `grid-template-rows` 属性上设置 `subgrid` 值，来显式创建一个子网格。例如：

```CSS
.parent--grid{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
}
.subgrid {
    grid-column: 2 / 5;        
    grid-row: 1 / 3;
    
    display: inherit; /* 或 grid 或 inline-grid */
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56234b9e0f4472a9809cd968d1e0632~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/GRGqaeV>

使用这种语法，`.subgrid` 是 `.parent--grid` 网格中的一个内嵌网格，也是一个子网格。它将继承外部网格（父网格）的网格轨道。

嵌套网格不能继承父网格的网格轨道，但在 `grid-template-columns` 和 `grid-template-rows` 以及 `gap` 属性值为 `inherit` 时可以复制父网格；也可以在 `grid-template-columns` 、 `grid-template-rows`  和 `gap` 设置独立的值，创建一个独立的网格。比如下面这个代码，就是复制一个父网格：

```CSS
.parent--grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}
.nested--grid {
  grid-column: 2 / 5;
  grid-row: 1 / 3;

  display: inherit; 
  grid-template-columns: inherit;
  grid-template-rows: inherit;
  gap: inherit;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f078c1202aa4bf7a231520a63cc750d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/zYaBVxj>

使用此语法，`.nested--grid` 将复制 `.parent--grid` 的网格轨道。这两个网格是独立的两个网格。

虽然嵌套网格仍然独立于父网格(我们有两个网格)，但子网格是父网格的一部分(我们有一个网格)，因为子网格包含在相同的网格布局中——使用相同的行、列和间距。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8adf60fd781e4d1da97d710144a3d4fd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/WNyxqrR>

从上图中不难发现，**左侧的嵌套网格和父网格是两个独立的网格，右侧的子网格和父网格是有关系的，子网格只是父网格的一部分，它被包含在同一个布局中，使用相同的网格轨道和网格线** 。

## 为什么需要子网格？

一个值得我们深思的问题是，既然可以通过在一个网格项目上将 `grid-template-columns` 和 `grid-template-rows` 独立创建一个有别于父网格或继承父网格的轨道的嵌套网格，那么为什么还需要子网格呢（即在一个网格项目上将 `grid-template-columns` 和 `grid-template-rows` 设置为 `subgrid`）？

前面多次提到过，嵌套网格是独立的一个网格系统，它不会继承父网格的网格轨道。这样一来，在一个网格上构建一个网格就会产生问题，我们不得不管理两个独立的网格。

在有 `subgrid` （子网格）之前，嵌套网格还存在另一个问题，**它对响应式 Web 布局不够灵活** 。由于今天市场上充斥着不同的移动设备屏幕，响应性是至关重要的。创建一个嵌套网格有时会使里面的元素溢出网格容器元素的边界之外。因此，需要一个新的属性来满足 Web 开发者的需求。这个新属性就是 `subgrid`。

我将用下面两个示例来描述，网格布局中为什么要子网格（`subgrid`）。

先来看一个卡片列表的布局。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e97c8e647ad44e09791afe007dd07cb~tplv-k3u1fbpfcp-zoom-1.image)

上图是我们常见的一个布局模式，每一行有多个卡片。每张卡片由一个**标题** 、**缩略图**和**正文**三个部分组成 。卡片在设计的时候，通常都是完美的，比如说标题长度是确定好的、图片高度是一致的、正文内容是相同的。然而，在生产过程中，事情往往会有一些不同。标题和正文的长度在不同的卡片之间会有很大的差异。这可能会破坏整个行中漂亮均匀的卡片美感。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cad9455e358b4d93b731c28258decb2e~tplv-k3u1fbpfcp-zoom-1.image)

有一些方法可以解决这个问题，你可以限制允许使用的内容，在元素上设置一个最小高度或指定具体高度，以保持对齐，但这些都限制了内容，或者会导致视觉美感被牺牲掉。

你可能想知道 Flexbox 是否是一个可能的解决方案。它们可以让你实现大部分需求，但你可能需要牺牲设计和（或）语义来达到预期的结果。你可以考虑嵌套网格，但问题是每个单独嵌套的网格都不知道其他网格的大小，这意味着轨道不会对齐，这与 Flexbox 的情况相似。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3825492715a46b885d23f469a97e948~tplv-k3u1fbpfcp-zoom-1.image)

虽然卡片排列正确，但设计感就差了。

如果我们使用 `subgrid` 呢？`subgrid` 让嵌套的网格容器能够继承父网格轨道的尺寸。如果不继承父网格轨道的尺寸，网格项目就会有独立的尺寸，这与前面提到的 Flexbox 或嵌套网格的例子相同。 由于父网格为三个轨道提供了尺寸，嵌套的子网格将继承父轨道的尺寸，并调整为整个行的最大网格单元。这样一来，项目就排成了一排！

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e00d2b4af4d43b99ec89a524c308d7e~tplv-k3u1fbpfcp-zoom-1.image)

假设实现上面示意图的效果，我们有一个像下面这样的 HTML 结构：

```HTML
<div class="container">
    <!-- Card -->
    <div class="card">
        <h3>卡片标题</h3>
        <figure><img src="" alt="" /></figure><!-- 卡片缩略图 -->
        <p> 卡片描述 </p>
    </div>
    
    <!-- 省略多个 card 结构 -->
    <div class="card">
        <h3>卡片标题</h3>
        <figure><img src="" alt="" /></figure><!-- 卡片缩略图 -->
        <p> 卡片描述 </p>
    </div>
</div>
```

在卡片外部容器，我们可以使用 **RAM** 布局技术来实现：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% -2rem, 300px), 1fr));
    gap: 1rem;
}
```

每张卡片在块轴方向跨越三个行网格轨道：

```CSS
.card {
    grid-row: span 3;
}
```

你将在浏览器看到的效果像下面这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b92bec884aa143589764d6e42618d614~tplv-k3u1fbpfcp-zoom-1.image)

你可能会认为上图中网格线是用于卡片（卡片是一个网格项目）上的（卡片的标题、缩略图和描述）。但是，这些网格线是用于网格容器 `.container` 的，只有网格项目 `.card` 可以使用它们，可以在卡片 `.card` 通过 `grid-row` 、`grid-column` 或 `grid-area` 使用这些网格线名称。比如：

```CSS
.card {
    grid-rows: span 3;
}
```

每张卡片`.card` 跨越`.container` 网格的三行。这意味着，卡片上的标题、缩略图和描述没有被包含在这些行中。这也就是为什么上图中卡片的标题、缩略图和描述并没有按行对齐，因为第一张卡片的描述文本内容更多。

而我们期望的是父网格（`.container`）的行网格轨道能传递给卡片的“标题”、“缩略图”和“描述”使用：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/785f340fcb41412ba35275d87eb83e3e~tplv-k3u1fbpfcp-zoom-1.image)

要达到这个诉求，你需要在 `.card` 上使用下面的代码：

```CSS
.card {
    /* 创建一个网格 */
    display: inherit;
    
    /* 继承父网格的网格轨道 */
    grid-template-rows: subgrid;
    
    /* 重置网格轨道之间的间距*/
    gap: 0;
}
```

当使用子网格时，相当于卡片 `.card` 继承父网格 `.container` 的相关特性，即继承 `grid-template-columns` 、 `grid-template-rows` 和 `gap` 属性的值。有了它，网格看起来像这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b727ab7d4a784ad190129c18287ced00~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/OJEXerm>

现在，卡片（`.card`）的每个内部项（标题、缩略图和描述）都放在一行中。这意味着，如果任何内部项的内容变长，它的行将扩展（变高）以适应内容。这是非常有用的，它将为我们提供更多的方法来实现 CSS 网格之前不可能实现的功能。

## 如何创建子网格？

在 CSS 网格布局中，定义显式网格的 `grid-template-columns` 和 `grid-template-rows` 属性引入了一个新的属性值，即 `subgrid` 。如此一来，子网格将会继承父网格的相关特性，比如网格轨道的尺寸和网格之间的间距等。换句话说，子网格可以沿着单个轴（行或列）或沿两个轴采用其父网格的轨道尺寸。

简单地说，在一个网格项目上显式设置 `display` 的值为 `grid` 或 `inline-grid` ，或者继承其父网格容器的 `display` 值，就意味着该网格项目是一个独立的网格格式化上下文。同时，子网格的 `grid-template-columns` 和（或）`grid-template-rows` 显式设置值为 `subgrid` 时，就意味着子网格的内容参与其父网格的格式化上下文，而不会建立一个新的网格格式化上下文。

比如下面这个示例，在 `.parent` 元素上使用 `grid-template-columns` 和 `grid-template-rows` 创建了一个三行六列（`3 x 6`）的父网格（外部网格）。同时子网格（内部嵌套的网格）是父网格的一个网格项目（`.subgrid`），它合并了四列两行，而且在子网格上显式设置 `grid-template-columns` 和 `grid-template-rows` 的值为 `subgrid` 。这意味着子网格（嵌套网格）现在是一个两行四列（`2 x 4`）的网格，并且网格轨道（行和列）的大小与父网格的网格轨道大小是相等的。

```CSS
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr  2fr);
    grid-template-rows: auto auto auto;
    gap: 1rem;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2fa022aefbc4887819d3a92caded8a7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/ExRgmYg>

这意味着父网格中的网格轨道（或网格项目）尺寸的任何改变都会延伸到其子网格相应的网格轨道（网格项目）；同样子，子网格的网格轨道的尺寸改变也会影响父网格轨道的尺寸。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f9b0e63a3ed4d659095058d93e1f91e~tplv-k3u1fbpfcp-zoom-1.image)

你还可以只在一个维度中使用子网格，并在另一个维度中指定网格轨道数量和尺寸。意思是说，你只在 `grid-template-columns` 或 `grid-template-rows` 中的一个属性显式设置值为 `subgrid` ，另一个未显式设置 `subgrid` 值的属性可以设置其他的值。

比如下面这个示例，你只在 `grid-template-columns` 属性上显式设置值为 `subgrid` ， `grid-template-rows` 属性设置为其他值：

```CSS
.parent {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr;
    grid-template-rows: auto auto auto;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: repeat(2, 100px 1fr);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4b0f45743b4e618508b0d2b697bd9e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxzEdeW>

正如你所看到的，子网格（`.subgrid`）的列网格轨道和父网格（`.parent`）的列网格轨道是保持一致的（子网格继承了父网格的列网格轨道），大小会相互影响；但行网格轨道是独立于父网格的行网格轨道，这是因为子网格的 `grid-template-rows` 是一个重新设置的值。在此情况之下，子网格的行轨道之间的间距（`gap`）被视为`0` ，没有继承父网格的行网格轨道之间的间距 `1rem` 。

同样的，你可以让子网格的行网格轨道继承父网格的行网格轨道，在子网格中单独为列网格轨道设置独立的值：

```CSS
.parent {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr;
    grid-template-rows: auto auto auto;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;
    
    display: inherit;
    grid-template-columns: repeat(2, 100px 1fr);
    grid-template-rows: subrid;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4ab44a435dc4162b1c23ee979cd4500~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/dyKpRXr>

你也可以在子网格中的其中一个维度设置子网格（`subgrid`），在另一个维度使用隐式网格轨道（`grid-auto-rows` 或 `grid-auto-columns`）。在下面这个示例中，没有显式指定任何行网格轨道（即没有显式设置`grid-template-rows` 属性的值），而是使用 `grid-auto-rows` 为网格设置隐式行网格轨道尺寸：

```CSS
.parent {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr;
    grid-template-rows: auto auto auto;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    grid-auto-rows: minmax(200px, auto);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da24509ae5594292ae029f433f9d4c55~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/dyKpRVB>

子网格（`.subgrid`）将会按照 `grid-auto-rows` 属性的值指定行网格轨道尺寸，并且会创建隐式的行网格轨道，也会像前面的示例一样，父网格将需要为这些行提供空间。

虽然子网格两个维度（`grid-template-columns` 和 `grid-template-rows`）都显式设置值为 `subgrid` 时，子网格会继承父网格轨道尺寸，但子网格的默认网格线编号（数字索引编号）不会继承父网格的，它将按照网格系统网格线编号进行编号。

```CSS
 .parent {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr;
    grid-template-rows: auto auto auto;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    grid-auto-rows: subgrid;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d73b8b589a04ce89d52348b853e5946~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxzErme>

然而，如果父网格上有任何网格线名称（显式命名的网格线名称），它们将被子网格继承，但也可以提供子网格自己的网格线名称。父网格将不能使用子网格线命名的网格线名称。它们只适用于子网格。

```HTML
<div class="parent">
    <header>.header</header>
    <aside>.sidbar</aside>
    <main class="subgrid">
        <header>.sub-header</header>
        <aside>.sub-sidebar</aside>
        <main>.sub-main</main>
        <nav>.sub-nav</nav>
        <footer>.sub-footer</footer>
    </main>
    <nav>.nav</nav>
    <footer>.footer</footer>
<div>
```

```CSS
.parent {
    display: grid;
    grid-template-columns: 
        [header-start sidebar-start footer-start] 200px 
        [sidebar-end main-start] auto 
        1fr 
        auto 
        [main-end nav-start] 220px 
        [header-end nav-end footer-end];
    grid-template-rows: 
        [header-start] auto 
        [header-end sidebar-start main-start nav-start] auto 
        1fr 
        auto [sidebar-end main-end nav-end footer-start] 
        auto [footer-end];
    gap: 1rem;
}

.subgrid {
    display: inherit;
  
    grid-template-columns: 
        subgrid 
        [sub-header-start sub-sidebar-start sub-footer-start] 
        [sub-sidebar-end sub-main-start] 
        [sub-main-end sub-nav-start] 
        [sub-header-end sub-nav-end sub-footer-end];
    grid-template-rows:
        subgrid 
        [sub-header-start] 
        [sub-sidebar-start sub-header-end sub-main-start sub-nav-start] 
        [sub-sidebar-end sub-main-end sub-nav-end sub-footer-start] 
        [sub-footer-end];
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fd9e07ed36f44f3b4da61910f2ccc54~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/MWXjodB>

如果上面示例过于复杂，你可以看下面这个简化的示例：

```CSS
.parent {
    display: grid;
    grid-template-columns: [a] 1fr [b] 2fr [c] 1fr [d] 2fr [e] 1fr [f] 2fr [g];
    grid-template-rows: auto auto auto;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;
    
    display: inherit;
    grid-template-columns: subgrid [sub-a] [sub-b] [sub-c] [sub-d] [sub-e];
    grid-template-rows: subgrid [sub-row-a] [sub-row-b] [sub-row-c];
}

.subitem {
    grid-column: c / e;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e714dfa59bc45c6a4dbdef28ee308c6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/zYaKENN>

子网格除了可以继承父网格的网格轨道之外，当子网格的 `grid-template-columns` 和 `grid-template-rows` 都显式设置值为 `subgrid` 时，子网格也会继承父网格的 `gap` 值。

如果子网格只在一个维度显式设置值为 `subgrid` 时，那么只有在相对应的维度才会继承父网格的 `gap` ，即子网格没有显式设置 `subgrid` 维度是不会继承父网格的 `gap` 值。除此之外，子网格还可以不继承父网格的`gap` 值，只需要在子网格上显式设置 `gap` 值与父网格的 `gap` 值不同即可。

```CSS
.parent {
    display: grid;
    grid-template-columns: [a] 1fr [b] 2fr [c] 1fr [d] 2fr [e] 1fr [f] 2fr [g];
    grid-template-rows: auto auto auto;
    gap: 2rem;
}

.subgrid {
    grid-column: 2 / 6;
    grid-row: 1 / 3;

    display: inherit;
    grid-template-columns: subgrid [sub-a] [sub-b] [sub-c] [sub-d] [sub-e];
    grid-template-rows: subgrid [sub-row-a] [sub-row-b] [sub-row-c];
    gap: 1rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2461279a73d4cf78d258c8c291a1bdd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/gOKwGGZ>

这就是网格布局中如何创建子网格的姿势。网格布局中的子网格是非常有用的，它将为我们提供更多的方法来实现 CSS 网格之前不可能实现的功能。

## 小结

上面介绍的主要是网格中的子网格和嵌套相关的理论以及它们之间的差异，并且着重介绍了 Web 布局中为什么需要子网格和如何创建子网格。我想通过这节课程的学习，你对网格中的子网格与嵌套网格有了根本性的认识。

为了加强大家对其理解，我们将在下一节课程中一起学习 Web 布局中，哪些场景可使用子网格来构建，以及如何构建。
