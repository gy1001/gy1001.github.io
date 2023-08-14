# 14-网格项目的放置和层叠

通过前面几节课程的学习，我想你已经会使用 `grid-template-*` 、`grid-auto-*` 等属性定义一个符合 Web 布局的网格，但仅仅这样是不够的，我们还需要将网格项目放置到需要的（正确的）位置。那么在这节课程中，我们主要一起来探讨 CSS 网格布局中的网格项目是如何被放置的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e3d20d1c83341f481935b6a00faeab1~tplv-k3u1fbpfcp-zoom-1.image)

## 放置网格项目

在 CSS 网格系统中，每个网格项目都与一个网格区域（一个单元格也可以称为是一个网格区域）相关联，即每个网格项目都会放置在四条网格线（两条行网格线和两条列网格线）围绕着的区域，这是一个由网格项目所占据的相邻网格单元格组成的矩形集合。

这个网格区域定义了网格项的包含块，其中的自我对齐属性（`justify-self` 和 `align-self`）决定了它们的实际位置。一个网格项目所占据的单元格也会影响网格的行和列的大小。

 一个网格项目的网格区域在网格中的位置是由它的位置定义的，它由一个网格位置和一个网格跨度（网格跨度指的是合并网格单元格）组成。

- **网格位置（Grid Position）**：网格项目在网格中每个轴的位置。网格位置可以是明确指定的，也可以是自动放置的。
- **网格跨度（Grid Span）** ：网格项目在每个轴上占据多少个网格轨道。默认情况之下，在网格系统中，一个网格项目跨度总是确定的，即一个网格单元格，不过我们可以使用其他的方式来确定跨度（即将多个单元格合并成一个）。

如果不希望网格项目自动放置的话，可以使用 `grid-row` （或它的子属性 `grid-row-start` 和 `grid-row-end`）、`grid-column` （或它的子属性 `grid-column-start` 或 `grid-column-end` ）和 `grid-area` 等属性来明确指定网格项目在网格系统中的位置。  另外，在 `grid-row` 和 `grid-column` 属性上，还可以使用关键词 `span`，用来合并网格单元格。

在网格布局中，可以使用下面六个信息中任何一种，来明确指定网格项目在网格系统中的位置：

|                   | **网格行轨道（Row）**                                  | **网格列轨道（Column）**                                  |
| ----------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| **起点（Start）** | 行网格轨道开始的网格线，对应的是 `grid-row-start` 属性 | 列网格轨道开始的网格线，对应的是 `grid-column-start` 属性 |
| **终点（End）**   | 行网格轨道结束的网格线，对应的是 `grid-rows-end` 属性  | 列网格轨道结束的网格线，对应的是 `grid-column-end` 属性   |
| **跨度（Span）**  | 合并行网格轨道上的单元格，即合并行                     | 合并列网格轨道上的单元格，即合并列                        |

正如上表所示，在一个给定的维度中（网格的行或列），起点（Start）、终点（End）和跨度（Span）中任何两个的确定值都意味着第三个的值被确定。

另外，网格项目的位置和跨度是自动的还是指定的，是有相应条件的：

|              | **网格位置（Grid Position）** | **网格跨度（Grid Span）** | **备注**                             |
| ------------ | ----------------------------- | ------------------------- | ------------------------------------ |
| **明确指定** | 至少指定了一条网格线          | 显式、隐式或默认的跨度    | 指的是明确放置网格项目或网格项目跨度 |
| **自动**     | 没有明确指定的网格线          | 不适用                    | 指的是自动放置网格项目               |

CSS 网格布局中，网格项目的放置主要分为两种，第一种是由网格布局算法自动放置，第二种是由开发者指定的位置。其中第一种被称为**自动放置网格项目** ，而第二种称为**明确放置网格项目** 。由于自动放置网格项目会涉及到相关的布局算法，我们先从明确放置网格项目开始。

### 明确放置网格项目

在 CSS 网格布局中，有很多种方式将网格项目明确地放置到指定的位置。比如：

- 使用 `grid-row-start`、`grid-row-end`、`grid-column-start` 和 `grid-column-end` 指定网格线名称，放置网格项目；
- 使用 `grid-row-start`、`grid-row-end`、`grid-column-start` 和 `grid-column-end` 的简写属性 `grid-row` 和 `grid-column` 指定网格线名称，放置网格项目；
- 使用 `grid-area` 指定网格名称，或指定 `grid-template-areas` 定义的网格区域名称，放置网格项目；
- 在 `grid-row-start`、`grid-row-end`、`grid-column-start`、`grid-column-end` 或 `grid-row`、`grid-column` 指定网格线名称，并且使用 `span` 来指定合并的网格单元格，它们的结合来放置网格项目；
- 在 `grid-row-start`、`grid-row-end`、`grid-column-start`、`grid-column-end`（以及其简写属性`grid-row`、`grid-column`）或 `grid-area` 中，指定 `grid-template-rows`、`grid-template-columns` 和 `grid-template-areas` 定义的网格线名称，放置网格项目；
- 使用已命名的网格线名称和 `span` 关键词，放置网格项目；
- 在 `grid-area` 指定 `grid-template-areas` 或 `grid-template-rows` 和 `grid-template-columns` 创建的网格区域名称，放置网格项目。

示例代码如下：

```CSS
 /* 方法一 */  
 .item { 
     grid-column-start: 2; 
     grid-column-end: 3; 
     grid-row-start: 2; 
     grid-row-end: 3; 
     
     /* 等同于*/ 
     grid-column-start: 2; 
     grid-row-start: 2; 
} 

/* 方法二 */  
.item { 
    grid-row: 2 / 4;     /* grid-row-start / grid-row-end */ 
    grid-column: 2 / 4;  /* grid-column-start / grid-column-end */  
} 

/* 方法三 */
.item { 
    grid-area: 2 / 2 / 4 / 4; /* grid-row-start / grid-column-start / grid-row-end / grid-column-end */ 
} 

/* 方法四 */  
.item { 
    grid-row:  1 / span 2;      /* grid-row-start / span row-span-value */ 
    grid-column:  1 / span 2;   /* grid-column-start / span col-span-value */ 
} 

/* 方法五 */  
.item { 
    grid-column: head-col-start / head-col-end; 
    grid-row: content-row-end / footer-row-end; 
} 

/* 方法六 */ 
.item { 
    grid-row: row-name row-start-number/ row-name row-end-number; 
    grid-column: col-name col-start-number / span col-name col-to-span; 
} 

/* 方法七 */
.item { 
    grid-area: header; 
}
```

正如上面代码所示，明确放置网格项目主要是有两种方式来指定：

- 根据网格线名称来指定网格项目放置的位置；
- 根据网格区域名称来指定网格项目放置的位置。

从前面的课程中可以得知，任何一个网格都会有默认的网格线名称，即数字编号的网格线，这些数字就是网格线的默认名称；或者是通过 `grid-template-rows` 、`grid-template-columns` 或 `grid-template-areas` 显式命名的网格线。比如下面这个示例：

```CSS
.container {
    display: grid;
    gap: 1rem;
    
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}
```

使用 `grid-template-columns` 和 `grid-template-rows` 创建了一个三行三列（`3 x 3`）的网格（显式网格），相应的也就给对应的网格线赋予了数字编号：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b088f0c8a4347b9a8b00d049b95edb1~tplv-k3u1fbpfcp-zoom-1.image)

这样一来，你就可以在  `grid-row` （它的子属性 `grid-row-start` 或 `grid-row-end` ）、`grid-column` （它的子属性 `grid-column-start` 或 `grid-column-end`）或 `grid-area` 指定相应的网格线数字编号（即默认的网格线名称）。比如：

```CSS
.item:nth-child(1) {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9f10711c043452292b6e78bce08223a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/rNKNOoJ>

网格项目一从默认的位置（行`1`，行`2` ，列`1` 和列`2` 围绕的单元格）变成横跨两列两行的新位置（行`1` ，行`3` ，列`1` 和列`3` 围绕的网格区域）。这个示例可能给你带来的感观不是特别的强，你可以尝试将上面的代码换成：

```CSS
.item:nth-child(1) {
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5948869a1974507a3e6b7b5a8a8ee82~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/eYKYJgj>

是不是有点似曾相识，看上去和 CSS 的 `position` 的绝对定位（`absolute`）有点相似。

从这两个简单示例可以得知，在 CSS 网格布局中，你可以使用 `grid-row-start` 、`grid-row-end` 、 `grid-column-start` 和 `grid-column-end` 将一个网格项目放置到任何你想要的位置。其中：

- `grid-row-start` 表示行网格线的起始位置；
- `grid-row-end` 表示行网格线的结束（或终点）位置；
- `grid-column-start` 表示列网格线的起始位置；
- `grid-column-end` 表示列网格线的结束（或终点）位置。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66b01a45915e4d1096186d6446e3f30b~tplv-k3u1fbpfcp-zoom-1.image)

当然，你也可以把 `-start` 和 `-end` 的网格线编号互换，也能达到相同的效果：

```CSS
.item:nth-child(1) {
    grid-row-start: 4;
    grid-row-end: 2;
    grid-column-start: 4;
    grid-column-end: 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68501898d862445695cc1b709a597ae5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/gOKOPKm>

但不建议这样使用，更建议和轴的方向相匹配，比如，阅读模式是 `ltr` （Left-To-Right）时，行网格线的起始编号是 `2` ，结束编号是 `4` ，列网格线的起始编号是 `2` ，结束编号是 `4` 。保持这样使用网格线编号不易于造成混乱。即使你想改变网格线的起始和终点位置，建议使用负数的网格线编号：

```CSS
.item:nth-child(1) {
    grid-row-start: -1;
    grid-row-end: -3;
    grid-column-start: -1;
    grid-column-end: -3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c8ee6f5ceb8464baadae0d4991e5ada~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/jOKOWvx>

你还可以使用 `grid-row-start` 、`grid-row-end` 、`grid-column-start` 和 `grid-column-end` 的简写属性 `grid-row` 和 `grid-column` 来放置网格项目。在使用简写属性时， `start` 和 `end` 之间要用 **斜杠（****`/`****）** 来分隔，其中 `/` 前面代表的是 `start` （起始）网格线编号（名称），`/` 后面代表的是 `end` （结束）网格线编号（名称）：

```CSS
.item:nth-child(1) {
    grid-row: 2 / 4;
    grid-column: 2 / 4;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/027dce4f33024478be01eecd75f497af~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/LYrYZPe>

前面这几个示例向大家展示了，在 CSS 网格布局中，你可以使用不同的方式达到相同的效果。在这几个示例中，虽然都是以默认网格线名称（数字索引号）指定网格项目一的位置，但它们都有一个共同的效果，就是网格项目一实际上合并了四个网格单元格，即 **行和列都合并了两个**。

其实，在网格布局中，使用 `grid-row` 和 `grid-column` （或它们的子属性）时，还可以使用关键词 `span` （注意这个 `span` 不是 HTML 中的 `<span>` 标签元素）来合并网格单元格。 `span` 后面紧跟一个正整数，这个正整数表示要合并的单元格数量。比如实现上面示例的效果，可以这样编写 CSS 代码：

```CSS
.item:nth-child(1) {
    grid-row: 2 / span 2;
    grid-column: 2 / span 2;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-row-end: span 2;
    grid-column-start: 2;
    grid-column-end: span 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9a2dff2e6ec430f8957dad96f8af14c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/vYrYKjP>

在这个示例中，虽然没有在 `grid-row-end` 和 `grid-column-end` 显式指定网格线的名称（数字编号），但其值 `span 2` 以及 `grid-row-start` 和 `grid-column-start` 隐式决定了相应的网格线位置：

- `grid-row: 2 ``/`` span 2` 会告诉浏览器，网格项目一放置的位置，行起始位置是行`2`，并向下合并两行（`span 2`）；
- `grid-column: 2 ``/`` span 2` 会告诉浏览器，网格项目一放置的位置，列起始位置是列`2` ，并向右合并两列（`span 2`）。

在使用 `span` 关键词来合并网格单元格时，`span` 和其后面的正整数值 `<integer>` 之间要使用 **空隔符** 分开。另外，在 `grid-row` 和 `grid-column` 中使用 `span` 来合并网格单元格时，`span` 关键词都放置在 `/` 之后，并且需要和它之间用空隔分隔。

这是 `span` 较佳的一种使用方式。当然，这并不代表着只能在 `grid-row` 和 `grid-column` 属性上使用，它也可以用于它们的子属性 `grid-row-start` 、 `grid-row-end` 、`grid-column-start` 和 `grid-column-end` 上，只不过在这几个属性上使用 `span` 时，无法显式指定网格线编号（名称）：

```CSS
.item:nth-child(1) {
    grid-row-start: span 2;
    grid-row-end: span 3;
    grid-column-start: span 3;
    grid-column-end: span 4;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d62f400cd314cfd9f32605cc139b52b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/JjZjRbV>

正如你所看到的，网格项目一合并了两行（`grid-row-start: span 2`）三列（`grid-column-start: span 3`），而且行和列的起始网格线都是它所处位置所对应的网格线（在这个示例中因为它是第一个网格项目，并且没有被其他网格项目推开，所以行和列默认的起始网格线都是 `1` ）。如果第一个网格单元格被其他网格项目占用，那么它的行和列起始网格线就会有所变化：

```CSS
.container {
    display: grid;
    gap: 1rem;
    
    /* 定义显式网格轨道尺寸 */
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  
    /* 定义隐式网格轨道尺寸 */
    grid-auto-columns: 150px;
    grid-auto-rows: 150px;
    
    /* 自动放置网格项目按照密集算法排列，避免网格洞 */
    grid-auto-flow: dense;
}

.item:nth-child(1) {
    grid-row-start: span 2;
    grid-row-end: span 3;
    grid-column-start: span 3;
    grid-column-end: span 4;
}

/* 网格项目1默认位置被网格项目2占用 */
.item:nth-child(2) {
    grid-row: 1 / 3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd1ced559e57414da64c0f42b0fcc97f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/LYrYbKO>

你可能已经发现了，这两个示例中的网格项目一的 `grid-row-end: span 3` 和 `grid-column-end: span 4` 被忽略了（虽然是有效的属性，但未用于计算网格单元格的合并）。因此，**不建议同时在** **`grid-*-start`** **和** **`grid-*-end`** **属性上使用** **`span`** **来合并网格单元格** 。

即使在单个属性上使用，也更建议在 `grid-*-start` 属性上指定网格项目起始网格线编号，在 `grid-*-end` 属性上使用 `span` 关键词，指定合并的行数或列数。所以，像下面这样使用是较佳的一种方式：

```CSS
.item:nth-child(1) {
    grid-row-start: 2;       /* 显式指定起始行网格线编号 */
    grid-column-start: 2;    /* 显式指定起始列网格线编号 */
    
    grid-row-end: span 2;    /* 合并两行 */
    grid-column-end: span 2; /* 合并两列 */
    
    /* 等同于 */
    grid-row: 2 / span 2;
    grid-column: 2 / span 2;
}
```

当然，要是你想显式指定网格线起始位置，那么可以分组结合 `span` 来合并网格单元格：

- `grid-row-start` 和 `grid-column-start` 中使用 `span`；
- `grid-row-end` 和 `grid-column-end` 中使用 `span`。

比如下面这个示例：

```CSS
.container {
    display: grid;
    gap: 1rem;
    
    /* 定义显式网格轨道尺寸 */
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  
    /* 定义隐式网格轨道尺寸 */
    grid-auto-columns: 150px;
    grid-auto-rows: 150px;
    
    /* 自动放置网格项目按照密集算法排列，避免网格洞 */
    grid-auto-flow: dense;
}

/* 网格项目1 合并两行三列 */
.item:nth-child(1) {
    grid-row-start: span 2;
    grid-column-start: span 3;
}

/* 网格项目2 合并三行四列 */
.item:nth-child(2) {
    grid-row-end: span 3;
    grid-column-end: span 4;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/076287ce832e46d5b442ad3f592600cb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/mdKdRpg>

示例效果还向大家展示了，**在网格布局时使用** **`span`** **除了可以合并网格单元格之外，还很容易创建一个隐式网格** 。

这个示例中的 `grid-template-rows` 和 `grid-template-columns` 定义的只是一个三行三列（`3 x 3`）的网格，但由于网格项目一和网格项目二合并的行与列已经超出显式网格的范围，此时就会在显式网格基础上进行延伸，创建一个新的网格，也就是一个隐式网格，最终这个网格是一个六行四列（`6 x 4`）的网格，而且对应的隐式列网格轨道由 `grid-auto-columns` 属性指定大小（`150px`），隐式行网格轨道由 `grid-auto-rows` 属性指定大小（`150px`）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b67075ddd284e329d17612c7b427aac~tplv-k3u1fbpfcp-zoom-1.image)

有意思的是，下面这两种组合方式都会被视为有效的：

- `<integer> span` ，比如 `2 span`；
- `span <integer>` ，比如 `span 2`。

但 `<integer>  span <integer>` 是无效的，比如 `2 span 2` 。

```CSS
.item:nth-child(1) {
  grid-row-start: 2 span;
}

.item:nth-child(2) {
  grid-row-start: span 2;
}

.item:nth-child(3) {
  grid-row-end: 2 span;
}

.item:nth-child(4) {
  grid-row-end: span 2;
}

.item:nth-child(5) {
  grid-column-start: span 2;
}

.item:nth-child(6) {
  grid-column-start: 2 span;
}

.item:nth-child(7) {
  grid-column-end: span 2;
}

.item:nth-child(8) {
  grid-column-end: 2 span;
}

/* 无效值 */
.item:nth-child(9) {
  grid-row-start: 2 span 2;
}

/* 无效值 */
.item:nth-child(10) {
  grid-column-start: 2 span 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3514af5db2fc41a29dbb1e2bc46b7289~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/qBKBvOP>

虽然 `<integer> span` 是一个有效值，但它无法指定起始网格线，因此不建议这样使用。如果你真的需要使用 `span` 来合并网格单元格，建议使用 `span <integer>` 模式。

在 CSS 网格中，网格单元格是最小单元体，同样有四条网格线围绕着，同时网格单元格也是最小网格区域。也就是说，`grid-row-start` 、`grid-column-start` 、`grid-row-end` 和 `grid-column-end` 四个属性指定的网格线围绕的区域就是一个**网格区域** （它有可能比网格单元格更大）。

前面有不少示例是使用这四个属性指定的网格线名称来放置网格项目，其实你还可以使用一个更简单的属性，即 **`grid-area`** 属性。该属性也可以显式指定网格线名称来放置网格项目。

`grid-area` 属性可以接受 **斜杠（****`/`****）** 分隔的 `1 ~ 4` 个值，但它始终是 `grid-row-start` 、`grid-column-start` 、`grid-row-end` 和 `grid-column-end` 四个属性的简写，即：

```CSS
grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end
```

只不过，省略的值对应的属性取值为 `auto` ，比如：

```CSS
/* grid-area 显式设置四个值 */
.item:nth-child(1) {
    grid-area: 2 / 2 / 4 / 4;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-column-start: 2;
    grid-row-end: 4;
    grid-column-end: 4;
}

/* grid-area 显式设置三个值 */
.item:nth-child(1) {
    grid-area: 2 / 2 / 4;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-column-start: 2;
    grid-row-end: 4;
    grid-column-end: auto;
}

/* grid-area 显式设置两个值 */
.item:nth-child(1) {
    grid-area: 2 / 2;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-column-start: 2;
    grid-row-end: auto;
    grid-column-end: auto;
}

/* grid-area 显式设置一个值 */
.item:nth-child(1) {
    grid-area: 2;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-column-start: auto;
    grid-row-end: auto;
    grid-column-end: auto;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/353639a276514b9da6c74f23305affa0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/LYrYajd>

`grid-area` 属性上也可以和 `span` 关键词结合起来使用，实现单元格合并的效果。虽然在每个值上都可以使用 `span` 关键词，但不建议这样使用。应该尽可能地在后面两个参数上使用 `span` ，来实现单元格合并的效果。这样做的原因是：

- 前两个值可以用来指定行和列网格线的起始位置；
- 后两个值可以用来指定行和列的合并数量。

比如：

```CSS
.item:nth-child(2) {
    grid-area: 2 / 2 / span 2 / span 2;
    
    /* 等同于 */
    grid-row-start: 2;       /* 指定行网格线的起始位置 */
    grid-column-start: 2;    /* 指定列网格线的起始位置*/
    grid-row-end: span 2;    /* 合并两行，同时确定行网格线的结束位置 */
    grid-column-end: span 2; /* 合并两列，同时确定列网格线的结束位置 */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46bac7bab912480b8e690525df599d80~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/KKeKEYa>

CSS 网格布局中，网格线的名称除了是数字索引编号之外，还可以在 `grid-template-rows` 和 `grid-template-columns` 定义网格轨道时给网格线命名，或者 `grid-template-areas` 定义网格区域时生成隐式的网格线名称。

这些命名之后的网格线名称同样可以用于 `grid-row` （它的子属性`grid-row-start` 和 `grid-row-end`）、`grid-column` （它的子属性 `grid-column-start` 和 `grid-column-end`） 和 `grid-area` 来放置网格项目。

比如，我们要构建下图这样的一个常见的 Web 布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ed188d0c37b48ac8694dd4088e94e08~tplv-k3u1fbpfcp-zoom-1.image)

使用 `grid-template-columns` 和 `grid-template-rows` 定义网格轨道时，可以同时给网格线命名：

```CSS
body {
    display: grid;
    gap: 1.25rem 2rem ;
    
    grid-template-columns: 
        [header-start sidebar-start footer-start] minmax(min-content, 280px) 
        [sidebar-end main-start] 1fr 
        [header-end main-end footer-end];
    grid-template-rows: 
        [header-start] auto
        [header-end sidebar-start main-start] 1fr
        [sidebar-end main-end footer-start] auto
        [footer-end];
}
```

这样除了会有默认的数字编码的网格线名称，还会有 `header-start` 、`header-end` 等命名的网格线名称：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b182015a18475188e2b0c7b2b8c2ff~tplv-k3u1fbpfcp-zoom-1.image)

如此一来，就可以在 `grid-row` 、`grid-column` 或 `grid-area` 属性上使用已命名的网格线名称来放置网格项目：

```CSS
header {
  grid-row: header-start / header-end;
  grid-column: header-start / header-end;
}

aside {
  grid-row: sidebar-start / sidebar-end;
  grid-column: sidebar-start / sidebar-end;
}

main {
  grid-row: main-start / main-end;
  grid-column: main-start / main-end;
}

footer {
  grid-row: footer-start / footer-end;
  grid-column: footer-start / footer-end;
}
```

可以使用 `grid-area` 来替代 `grid-row` 和 `grid-column` ：

```CSS
header {
    grid-area: header-start / header-start / header-end / header-end;
    
    /* 等同于 */
    grid-row: header-start / header-end;
    grid-column: header-start / header-end;

    /* 等同于 */
    grid-row-start: header-start;
    grid-column-start: header-start;
    grid-row-end: header-end;
    grid-column-end: header-end;
}

aside {
    grid-area: sidebar-start / sidebar-start / sidebar-end / sidebar-end;
    
    /* 等同于 */
    grid-row: sidebar-start / sidebar-end;
    grid-column: sidebar-start / sidebar-end;
    
    /* 等同于 */
    grid-row-start: sidebar-start;
    grid-column-start: sidebar-start;
    grid-row-end: sidebar-end;
    grid-column-end: sidebar-endl;
}

main {
    grid-area: main-start / main-start / main-end / main-end;
    
    /* 等同于 */
    grid-row: main-start / main-end;
    grid-column: main-start / main-end;
    
    /* 等同于 */
    grid-row-start: main-start;
    grid-column-start: main-start;
    grid-row-end: main-end;
    grid-column-end: main-end;
}

footer {
    grid-area: footer-start / footer-start / footer-end / footer-end;
    
    /* 等同于 */
    grid-row: footer-start / footer-end;
    grid-column: footer-start / footer-end;
    
    /* 等同于 */
    grid-row-start: footer-start;
    grid-column-start: footer-start;
    grid-row-end: footer-end;
    grid-column-end: footer-end;
}
```

其实示例中的 `grid-template-rows` 和 `grid-template-columns` 在定义网格轨道尺寸和给网格线命名时，已经隐式地创建了网格区域。因此，还可以使用 `grid-area` 直接引用隐式的网格区域名称，也能达到相同的效果：

```CSS
header {
    grid-area: header;
}

aside {
    grid-area: sidebar;
}

main {
    grid-area: main;
}

footer {
    grid-area: footer;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b3d19365c494a438a14c0c5a79bbac0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/RwJwmYx>

同样地，你还可以使用 `grid-template-areas` 显式给网格区域命名，然后再使用 `grid-area` 、`grid-row` 或 `grid-column` 引用 `grid-template-areas` 隐式命名的网格线名称放置网格项目，达到上面示例相同的布局效果：

```CSS
body {
    display: grid;
    gap: 1.25rem 2rem;

    /* 定义网格轨道尺寸 */
    grid-template-columns: minmax(min-content, 280px) 1fr;
    grid-template-rows: auto 1fr auto;
  
    /* 显式命名网格区域名称，同时隐式给网格线命名 */
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
}

header {
    grid-area: header;

    /* 等同于 */
    grid-area: header-start / header-start / header-end / header-end;

    /* 等同于 */
    grid-row: header-start / header-end;
    grid-column: header-start / header-end;

    /* 等同于 */
    grid-row-start: header-start;
    grid-column-start: header-start;
    grid-row-end: header-end;
    grid-column-end: header-end;
}

aside {
    grid-area: sidebar;

    /* 等同于 */
    grid-area: sidebar-start / sidebar-start / sidebar-end / sidebar-end;

    /* 等同于 */
    grid-row: sidebar-start / sidebar-end;
    grid-column: sidebar-start / sidebar-end;

    /* 等同于 */
    grid-row-start: sidebar-start;
    grid-column-start: sidebar-start;
    grid-row-end: sidebar-end;
    grid-column-end: sidebar-end;
}

main {
    grid-area: main;

    /* 等同于 */
    grid-area: main-start / main-start / main-end / main-end;

    /* 等同于 */
    grid-row: main-start / main-end;
    grid-column: main-start / main-end;

    /* 等同于 */
    grid-row-start: main-start;
    grid-column-start: main-start;
    grid-row-end: main-end;
    grid-column-end: main-end;
}

footer {
    grid-area: footer;

    /* 等同于 */
    grid-area: footer-start / footer-start / footer-end / footer-end;

    /* 等同于 */
    grid-row: footer-start / footer-end;
    grid-column: footer-start / footer-end;

    /* 等同于 */
    grid-row-start: footer-start;
    grid-column-start: footer-start;
    grid-row-end: footer-end;
    grid-column-end: footer-end;
}
```

> Demo 地址： <https://codepen.io/airen/full/mdKdZLo>

现在你可以使用 CSS 网格布局技术构建你想要的 Web 布局了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c67d8ee428ac4820ba5588816953d88c~tplv-k3u1fbpfcp-zoom-1.image)

简单地说，使用 CSS 网格布局分两步：

- 使用 `grid-template-*` 和（或）`grid-auto-*` 定义一个网格，在定义所需要的网格的同时，定义了网格轨道尺寸以及网格线；
- 使用 `grid-row` 、`grid-column` 和（或）`grid-area` 将网格项目放置到指定的位置。

以一个经典 Web 布局为例，即 **Full-Bleed 布局** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c92b8aecbb6445ecbe786899a056b203~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
body {
    --limit-max-container-width: 65ch;
    --limit-min-container-width: 23ch;
    --gutter: 1rem;

    display: grid;
    grid-template-columns:
        [full__bleed-start] minmax(var(--gutter), 1fr) [main-start]
        minmax(
            min(var(--limit-min-container-width), 100% - var(--gutter) * 2),
            var(--limit-max-container-width)
        )
        [main-end]
        minmax(var(--gutter), 1fr) [full__bleed-end];
     row-gap: var(--gutter);
}

body > * {
    grid-column: main-start / main-end;
}

.full__bleed {
    width: 100%;
    grid-column: full__bleed-start / full__bleed-end;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c9d84a4e4ac4400bedbe98728c7145e~tplv-k3u1fbpfcp-zoom-1.image)

代码就不解释了，最终你将看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df7cc3eeb2704d418948be542e4ae251~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/jOKEZLv>

你也可以结合 CSS 媒体查询特性，可以很轻易实现 Web 布局框架的响应，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcff82e1d7564bae8f579023e6c4bfee~tplv-k3u1fbpfcp-zoom-1.image)

```HTML
<body>
    <header>Header</header>
    <nav>Nav</nav>
    <aside>Sidebar</aside>
    <main>Main</main>
    <section>Ads</section>
    <footer>Footer</footer>
</body>
```

移动端先行，即构建一个 **一列多行** 的网格，并且使用 `grid-template-areas` 给网格区域命名，`grid-template-rows` 定义行网格轨道尺寸：

```CSS
body {
    display: grid;
    gap: 20px;
    
    grid-template-rows: auto auto 1fr auto auto auto;
    grid-template-areas: 
        "header"
        "nav"
        "main"
        "sidebar"
        "ads"
        "footer";
}
```

接着使用 `grid-area` 属性，将相应的网格项目放置到对应的网格区域：

```CSS
header {
    grid-area: header;
}

nav {
    grid-area: nav;
}

main {
    grid-area: main;
}

aside {
    grid-area: sidebar;
}

section {
    grid-area: ads;
}

footer {
    grid-area: footer;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/584e347d30bd4ba5b246783b93851637~tplv-k3u1fbpfcp-zoom-1.image)

在平板端（Tablet），Web 页面由移动端的一列变成两列，六行变成四行，因此我们要在平板端调整 `grid-template-areas` 和 `grid-template-rows` 属性的值，并且新增 `grid-template-columns` 属性控制列网格轨道尺寸，构建一个四行两列的网格：

```CSS
@media only screen and (min-width: 768px) {
    body {
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: minmax(min-content, 220px) 1fr;
        grid-template-areas: 
            "header   header"
            "nav      nav"
            "sidebar  main"
            "ads      footer";
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5cc06b6f654481086b231b77440aed4~tplv-k3u1fbpfcp-zoom-1.image)

按同样的方式，在浏览器视窗 `1024px` 断点下调整 `grid-template-rows` 、`grid-template-columns` 和 `grid-template-areas` 属性的值，构建符合桌面端（Desktop）的网格（四行三列）：

```CSS
@media only screen and (min-width: 1024px) {
    body {
        grid-template-columns: minmax(min-content, 220px) 1fr minmax(min-content, 220px);
        grid-template-areas:
            "header   header  header"
            "sidebar  nav     ads"
            "sidebar  main    ads"
            "footer   footer  footer";
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c57c45719444731a5808fe433723ba2~tplv-k3u1fbpfcp-zoom-1.image)

最终效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/621e0fae3f8248659f17129920dfea72~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/WNybzvW>

你甚至还可以使用这些布局技术构建更为复杂的 Web 布局，比如报刊杂志类的布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d31f9852048e4ab797878961c1981cf4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/GRGgdeq>

### 自动放置网格项目

现在你应该知道了，在 CSS 网格布局中，只要在网格项目上使用 `grid-row` （`grid-row-start` 、`grid-row-end`）、`grid-column` （`grid-column-start` 、`grid-column-end`） 或 `grid-area` 属性指定具体的网格线名称或网格区域名称，那么网格项目就会**被放置到明确指定的位置** ，这种方式被称为**明确放置网格项目** 。

言外之意，没有使用这些属性指定明确位置的网格项目，它被称为 **自动放置网格项目** 。比如下图这种，网格项目根据 `grid-auto-flow` 指定的方向自动放置：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f46cf02b5c9d4855b38304e0f4e4bebd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/yLEyEyq>

也有可能会因为别的网格项目位置被调整而被迫调整，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac60a1064d76440e91dcd59f7beaf804~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/vYrYKjP>

你可能会好奇，它们是按照什么样的机制来放置网格项目的呢？其实，在 CSS 网格布局中，自动放置网格项目是由一个算法机制来决定的：

> **将网格项目的自动位置解析为明确的位置，确保每个网格项目都有一个明确的网格区域来放置（一个网格单元格也可以称为是一个网格区域）**。

在网格项目自动放置的算法中，网格跨度是不需要特别解决的。因为未显式指定 `span` 的值，即是默认值 `1`。另外，如果在一个显式网格系统中没有空间放置明确指定的网格项目，就有可能根据网格自动放置算法创建隐式的网格轨道（创建隐式的行或列），从而创建一个隐式网格。

另外，网格系统中的每个网格单元格（在显式网格或隐式网格中）都可以被占用或不被占用。如果一个网格单元格被一个有明确网格位置的网格项目覆盖，该网格单元格就被占用；否则，该网格单元格就未被占用。在这个算法中，一个网格单元格的占用或未占用状态是可以被改变的。

简单地说，自动放置网格项目会按下面五个步骤来放置网格项目：

- ①：匿名网格项目的生成；
- ②：使用显式网格线名称（或网格区域）明确放置网格项目；
- ③：仅明确指定行位置；
- ④：确定隐式网格中的列数；
- ⑤：放置剩余的网格项目。

用一个简单的示例来解释自动放置网格项目的五个步骤。

```HTML
<div class="container">
    <div class="item"></div>
    <div class="item"></div>
    我是一个文本节点(TextNode) <!-- 文本节点被称为匿名网格项目 -->
    <div class="item"></div>
    <div class="item"></div>
</div>
```

#### 步骤 ①：创建匿名网格项目

```CSS
.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
}
```

当自动放置网格项目算法试图将所有网格项目放在一个网格系统内时，发生的第一件事就是**创建“匿名网格项目”** （这个和 Flexbox 布局是相似的）。在网格系统中，**网格容器内的文本节点，被称为匿名网格项目** 。比如代码中的“**`我是一个文本节点(TextNode)`** ” 是网格容器 `.container` 直接内容，所以这行文本也是网格容器中的一个网格项目（即匿名网格项目）。

> **注意，网格容器的伪元素** **`::before`** **和** **`::after`** **生成的内容也被称为网格项目** ，但它们不是匿名网格项目。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d944ca2a84434a839c2bbd3094872ab2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/zYaxaWY>

CSS 中是没有相关的选择器可以选中网格容器中的“文本节点”的，因此，你也无法使用网格项目相关的属性（比如 `grid-row` 、`grid-column` 或 `grid-area` 等）来明确放置“匿名网格项目”。换句话说，网格中的“匿名网格项目”的位置，是按照网格系统中自动放置的算法来指定位置的。

#### 步骤②：使用显式网格线名称（或网格区域）明确放置网格项目

在网格布局中，总是有网格项目会使用 `grid-row` 、`grid-column` 或 `grid-area` 属性放置到指定的位置（根据网格线名称或网格区域名称），比如：

```CSS
.item:nth-child(1) {
    grid-area: 1 / 2 / 2 / 4;
}

.item:nth-child(2) {
    grid-area: 2 / 1 / 4 / 3;
}
```

**`网格项目 ①`** 和 **`网格项目 ②`** 各自的 `grid-area` 属性的值来定位（放置）：

- 使用 `grid-area` 属性的第一个（`grid-row-start`）和第二个值（`grid-column-start`）来设置网格项目 **`网格项目 ①`** 和 **`网格项目 ②`** 的“左上角”的位置；
- 使用 `grid-area` 属性的第三个（`grid-row-end`）和第四个值（`grid-column-end`）来设置 **`网格项目 ①`** 和 **`网格项目 ②`** 的“右下角”的位置。

即 **`网格项目 ①`** 和 **`网格项目 ②`** 被放置到指定位置，其他网格项目未显式指定位置，它们会按自动放置算法来放置。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9fae14c7aec4289bfe298e9f18ed4a7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/PoawBoB>

#### 步骤③：仅明确指定行位置

通过前面的内容学习，可以获知，即使是根据网格线名称来明确放置网格项目，也不一定会指定四条网格线名称，往往可能只是指定了行的网格线位置（名称），但没有指定列的网格线位置（名称）。

```CSS
.container::before {
    grid-row: 1 / 4;
}

.item:nth-child(4) {
    grid-row: 3 / 5;
}
```

`::before` 伪元素和 `网格项目④` 使用 `grid-row` 指定了行网格线的起始和结束位置。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2197b98a63774bf99391d9fe76a082d8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZERYjdK>

对于每个有明确行位置的网格项目（即 `grid-row-start`、`grid-row-end` 或 `grid-row` 明确放置的网格项目）只确定行位置，但列的位置并没有确定。此时，网格项目将按照修改后的文档顺序放置。换句话说，为了确定没有明确设置的列的位置（即，没有显式使用 `grid-column-start`、`grid-column-end` 或 `grid-column` 放置网格项目），该算法根据下面模式来处理：

- **稀疏算法（Sparse）** ，也是默认算法：将其放置的列开始网格线设置为最早的（最小的正指数）网格线索引值，以确保此网格项目的网格区域不会与任何被占用的网格单元格重叠，并且该行超过了之前放置在此行的任何网格项目。
- **密集算法（Dense）** ：将其放置的列开始网格线设置为最早的（最小的正指数）网格线索引值，以确保这个网格项目的网格区域不会与任何占用的网格单元格重叠 。

简单地说，默认的“**稀疏算法（Sparse）**”会产生网格洞（空的网格单元格）现象。比如下面这个示例：

```CSS
.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    grid-auto-columns: 100px;
    grid-auto-rows: 100px;
}

.item:nth-child(1) {
    grid-area: 3 / 2 / 4 / 3;
}

.item:nth-child(2) {
    grid-area: 1 / 3 / 3 /4;
}

.item:nth-child(3) {
    grid-row: 3 / 5;
}

.item:nth-child(4) {
    grid-row: 3 / 5;
}

.item:nth-child(5) {
    grid-column-start: span 2;
}

.container::before {
    grid-row-start: 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/801a6de594664a6595dc9032bef23558~tplv-k3u1fbpfcp-zoom-1.image)

而“**密集算法（Dense）**”不会出现该现象。如果你在使用网格布局时，不想出现网格洞的现象，可以使用 `grid-auto-flow` 来改变，只需要使用 `row  dense` 来替代 `row` ，`column dense` 替代 `column` 即可：

```CSS
.container {
    grid-auto-flow: row dense;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abd10f9034454a58a525faeaf4345c14~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNKaqWR>

注意，由于 `grid-auto-flow` 的默认值是 `row` ，所以你会看到 `grid-auto-flow` 取 `dense` 和 `row  dense` 的效果是一样的。

#### 步骤④：确定隐式网格中的列数

接下来，该算法试图确定隐式网格中的列数。可以通过下面的步骤来完成：

- 该算法从显式网格中的列数开始；
- 然后，它遍历所有有明确列位置的网格项目，并在隐式网格的开头和结尾增加列轨道，以容纳所有网格项目；
- 最后，它通过所有没有明确列位置的网格项目。如果所有没有明确列位置的网格项目中最大的列跨度大于显式网格的宽度，则在网格的末端增加列以适应这个列跨度。

在上面的示例中，`grid-template-columns` 和 `grid-template-rows` 创建了一个三行三列（`3 x 3` ）的网格：

```CSS
.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    grid-auto-columns: 100px;
    grid-auto-rows: 100px;
    grid-auto-flow: var(--auto-flow);
}
```

同时使用 `grid-auto-rows` 和 `grid-auto-columns` 指定了隐式网格轨道尺寸，示例中因个别网格项目放置的位置超出了显式网格区域，因此创建了部分隐式行网格轨道。

```CSS
.item:nth-child(1) {
  grid-area: 1 / 3 / 2 / 3;
}

.item:nth-child(2) {
  grid-area: 2 / 2 / 4 / span 2;
}

.item:nth-child(3) {
  grid-row: 3 / 5;
}

.item:nth-child(4) {
  grid-row: 3 / 5;
  grid-column: 4 / span 2;
}

.item:nth-child(5) {
  grid-column-start: span 2;
}

.container::before {
  grid-row-start: 2;
}
.container::after {
  grid-column: span 2;
}
```

示例中 **`网格项目④`** 明确指定了起始列网格线位置，即网格线编号是 `4` （`grid-column-start: 4`），同时使用 `span 2` 向右合并两列（`grid-column-end: span 2`）。这意味着 **`网格项目④`** 放置在显式网格之外，也会因该网格项目新增两列隐式列网格轨道。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38f7d35ae5764d12a4e329b9dcd1e482~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/dyKopPq>

#### 步骤⑤：放置剩余的网格项目

剩余的网格项目指的是没有显式使用 `grid-row` 、`grid-column` 、`grid-area` 属性放置的网格项目，同时也没有使用 `span` 合并网格单元格的项目。对于这些网格项目而言，最终位置是由 `grid-auto-flow` 属性来决定，该属性会确定网格项目的两个东西：

- **方向** ：`row`（默认）或 `column`，定义了在需要插入自动放置网格项目时，网格要增长的方向（增长行或列）；
- **模式** ：稀疏（Sparse，默认的）或 密集（Dense），根据打包模式，算法将在插入自动放置的网格项目时，尝试密集（填充）或稀疏（不填充）网格中的所有洞（没有被占用的网格单元格）。

因此，`grid-auto-flow` 属性的值可以是`row dense`、`column dense` 或 `dense` 等，用来决定网格项目自动放置的所需行为。

也就是说，在 CSS 网格中除了使用明确指定网格项目位置的属性之外，还可以使用 `grid-auto-flow` 有不同模式来自动放置网格项目。

## 网格项目重叠

到目前为止，我们所阐述的网格项目都是用不同的网格区域来放置网格项目，但网格布局中的网格项目有可能是会重叠在一起的。因为我们在放置网格项目或合并网格单元格时，可能会让网格项目位置位于同一个网格单元格，即 **在同一个网格单元格或网格区域重叠** 。

简单地说，**欲让网格项目重叠，则必须把网格项目放置在相同的网格单元格中** 。 在 CSS 网格布局中有多种不同的方法可以达到这个目的：

- 使用网格线索引号；
- 使用命名的网格线；
- 使用命名的网格区域；
- 合并网格单元格（即，跨越网格项目）。

比如下面这个示例：

```CSS
.container {
    display: grid;
    gap: 16px;
    
    grid-template-columns:minmax(min-content, 220px)  1fr  minmax(min-content, 220px);
    grid-template-rows: auto 1fr auto;
}

header {
    grid-row: 1;
    grid-column: 1 / -1;
}

nav {
    grid-column: 1;
    grid-row: 1 / -1;
}

main {
    grid-row: 2;
    grid-column: 2;
}

aside {
    grid-column: 3;
    grid-row: 1 / -1;
}

footer {
    grid-row: 3;
    grid-column: 1 / -1;
}
```

上面的代码，将：

- 网格项目 `header` 放置在第一行，并且跨三列；
- 网格项目 `footer` 放置在第三行，并且跨三列；
- 网格项目 `nav` 放置在第一列，并且跨三行，它和网格项目 `header` 在第一行第一列的位置相互重叠，和网格项目 `footer` 在第三行第一列的位置相互重叠；
- 网格项目 `main` 放置在第二行第二列；
- 网格项目 `sidebar` 放置在第三列，它和网格项目 `header` 在第一行和第三列的位置相互重叠，和网格项目 `footer` 在第三行第三列相互重叠。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eb9a0602c8045a78dbedb77726efb9c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/dyKopwB>

既然有网格项目相互重叠（`z` 轴上的重叠），就有必要控制其 `z` 轴的优先级。在网格布局中，网格项目的定位元素（`position` 值不是 `static` 的元素）相似，可以使用 CSS 的 `z-index` 属性来控制其在 `z` 轴上的层级。简单地说，`z-index` 越大，它越在顶层；如果没有显式设置 `z-index` 值来改变 `z` 轴上的层级，将会由网格项目在文档中出现的先后顺序来决定，越往后出现，它在 `z` 轴的层级越高。

比如上面的示例中，网格项目 `header` 在 `z` 轴的最底下，网格项目 `nav` 和网格项目 `sidebar` 在 `z` 轴上比网格项目 `header` 更高（所以重叠部分会遮盖网格项目 `header`），但又比网格项目 `footer` 低，所以与网格项目 `footer` 重叠部分被网格项目 `footer` 遮盖了。你可以像下面这样，在网格项目 `header` 上显式设置 `z-index` 的值：

```CSS
header{
    z-index: 1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ba50f7753664140af0b31eb80020084~tplv-k3u1fbpfcp-zoom-1.image)

因此，使用 CSS 网格布局，可以轻易实现一些重叠的 Web 布局效果，比如下面这个效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa020f9ffe9a4592a0f9e95649d795e0~tplv-k3u1fbpfcp-zoom-1.image)

具体实现的代码如下：

```CSS
main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 2fr;
    grid-template-rows: 2fr 1fr 1fr 2fr;
}

main:nth-child(1) header,
main:nth-child(1) section {
    grid-row: 2 / 4;
    padding: 2rem;
    grid-column: 2 / 4;
    align-self: center;
    z-index: 2;
}

main:nth-child(2) header {
    grid-row: 2 / 4;
    grid-column: 2 / 4;
    z-index: 2;
}

figure:nth-of-type(1) {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
    align-self: end;
}

figure:nth-of-type(2) {
    grid-row: 1 / 3;
    grid-column: 3 / 5;
    align-self: end;
}

figure:nth-of-type(3) {
    grid-row: 3 / 5;
    grid-column: 1 / 3;
}

figure:nth-of-type(4) {
    grid-row: 3 / 5;
    grid-column: 3 / 5;
}

figure {
    margin: 0;
    padding: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddbed5ea5ff14a4daef8df3e77e310f9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/OJEVWRo>

你还可以利用网格项目重叠的特性，实现类似下图杂志排版的布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/967e6fa9e77745b1a8ebf579958c9fb6~tplv-k3u1fbpfcp-zoom-1.image)

可以将上图这样的杂类效果的布局分解成一个网格，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb8e0ee641064d9fadc0feeebb5b3b64~tplv-k3u1fbpfcp-zoom-1.image)

即：

```CSS
.magazine  { 
    display: grid; 
    grid-template-rows: 130px 2fr 1fr; 
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr; 
} 
```

使用 `grid-template-rows` 和 `grid-template-columns` 定义了一个 `3 x 4` 的网格（三行四列）。外侧的列比内侧的列要宽一些。第一行高度为 `130px`，第二行是第三行的两倍高。不过内容（即 HTML 的结构有点让你感到蛋疼）拆分有点小细节需要注意：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc64d7f5b2f14db585bef7f9bf7eedff~tplv-k3u1fbpfcp-zoom-1.image)

对应的 HTML：

```HTML
 <div class="magazine"> 
     <!-- 区域1 --> 
     <div class="item green"></div> 
     
     <!-- 区域2 --> 
     <div class="item blue"></div> 
     
     <!-- 区域3 --> 
     <div class="item purple"></div> 
     
     <!-- 区域4 --> 
     <div class="item orange"></div> 
     
     <!-- 区域5 --> 
     <div class="item meired"></div> 
     
     <!-- 区域6 --> 
     <div class="item black"></div> 
</div>
```

按上面示意图放置每个网格项目的位置：

```CSS
.green { 
    grid-row: 1; 
    grid-column: 1 / 3; 
} 

.blue { 
    grid-row: 2 / 4; 
    grid-column: 1 / 2; 
} 

.purple { 
    grid-row: 3 / 4; 
    grid-column: 2 / 4; 
} 

.black { 
    grid-row: 2; 
    grid-column: 4; 
} 

.meired { 
    grid-row: 1 / 3; 
    grid-column: 2 / 5; 
} 

.orange { 
    grid-row: 3; 
} 
```

添加额外的样式，我们就实现了一个类似杂志的布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd96d13968674d59bc970467b6ebf886~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/vYrOgwV>

很有意思吧。我们仅使用网格重叠相关的特性就实现了类似杂志的布局。事实上，通过重叠的网格项目，我们还可以实现很多很酷的效果。感兴趣的同学也不妨一试。

## 小结

到了这里，我想你已经对 CSS 网格布局有了一定的了解。你可以在基于 `grid-template-*` 和 `grid-auto-*` 等属性定义的网格上，使用 `grid-row` （`grid-row-start` 和 `grid-row-end` ）、`grid-column` （`grid-column-start` 和 `grid-column-end`）或 `grid-area` 属性指定网格线名称或网格区域名称，将网格项目放置到任意位置。这个位置可以是 `grid-template-*` 等属性创建的显式网格上，也可以是 `grid-auto-*` 等属性创建的显式网格上。

在网格布局中，`grid-row` 、`grid-column` 和 `grid-area` 除了可以将网格项目放置到指定位置之外，还可以创建隐式网格，即，它们将网格项目放置到显式网格之外的同时也创建了一个隐式网格。

另外，网格布局中的网格项目除了根据网格线名称或网格区域名称放置到指定位置之外，还可以自动放置。换句话说，如果没有明确指定位置的网格项目都属于自动放置，`grid-auto-flow` 属性的值可以决定自动放置网格项目的方向和模式。

网格项目在被开发者放置到指定位置时，很容易造成网格项目的重叠，你可以通过 `z-index` 来控制重叠的网格项目在 `z` 轴的优先级。而且可以利用该特性构建一些重叠的布局效果，比如类似杂志的 Web 布局效果。甚至你还可以发挥你的创意，构建更多有创意的 Web 布局。
