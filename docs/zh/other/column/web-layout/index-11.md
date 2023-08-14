# 11-定义一个网格布局

既然要使用 CSS 网格布局来构建 Web 布局，那就要先从如何定义一个网格开始，再到如何定义一个符合 Web 布局的网格。也就是说，定义一个网格主要包含两个事情，即 **定义一个网格** 和 **设置网格大小** 。而这两件事情使用几个 CSS 属性就可以完成，只不过这些属性深藏着很多不同的使用方式，而且带来的作用和灵活性都会不同。

那么我们先从定义网格开始！

## 定义网格的类型

CSS 中定义一个网格非常简单，只需要在一个元素上显式设置 `display` 的值为 `grid` 或 `inline-grid` 即可。比如：

```HTML
<div class="container">
    <div class="item"></div>
    <div class="item"></div>
</div>
```

```CSS
.container {
    display: grid; /* 或 inline-grid */
}
```

只不过这是一个最基础的网格，一个 “单列多行”的网格，而且行数由网格容器的子元素（包括其伪元素和文本节点）来决定：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17c85edabf4142409a07bc2dfcbf0bcb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/yLjRzOd>

默认的网格往往不能满足我们所需，也就是说，要构建一个符合要求的网格，还需要依赖其他的一些属性，比如 `grid-template-*` （即 `grid-template-rows` 、`grid-template-columns` 和 `grid-template-areas` 以及它们的简写属性 `grid-template`），或 `grid-auto-*` （即 `grid-auto-rows` 、`grid-auto-columns` 和 `grid-auto-flow`）。根据不同的属性定义的网格又分为 **显式网格** 和 **隐式网格** ：

- `grid-template-*` 属性定义的网格是一个显式网格；
- `grid-auto-*` 属性定义的网格是一个隐式网格。

## 使用 grid-template-columns 和 grid-template-rows  定义网格

我们先从定义一个显式网格开始，即先从 `grid-template-columns` 和 `grid-template-rows` 两个属性着手。你可以在网格容器上使用 `grid-template-rows` 和 `grid-template-columns` 属性来定义网格的行和列（即网格轨道），它们都接受 **用空格分隔开来的多个数值** ，这些值同时代表网格轨道的大小，而且数值之间的空格代表网格线。

比如，我们在一个网格容器上显示设置了 `grid-template-columns` 属性的值是 `180px 20% auto 1fr 10vw` ，即：

```CSS
.container {
    display: grid; /* 或 inline-grid */
    grid-template-columns: 180px 20% auto 1fr 10vw;
}
```

它将会告诉浏览器，定义了一个五列 N 行的网格，即将网格容器分成五列（沿网格容器内联轴 Inline Axis 方向），而且每列的列宽分别是 `180px` 、 `20%` 、 `auto` 、`1fr` 和 `10vw` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db55fe969b2149648556900c2e973ba5~tplv-k3u1fbpfcp-zoom-1.image)

正如你所见，`grid-template-columns` 属性的值可以是各种不同类型的长度值，比如以 `px` 为单位的固定值，以 `%` 、`vw` 为单位的相对值，还有像 `auto` 这样的关键词以及网格布局中独有的单位 `fr` 等。除此之外还可以是 CSS 的一些函数，比如 `min()` 、`minmax()` 等。

也就是说，可用于 `grid-template-columns` 的值类型大致可分为三种：

- 带有不同单位的长度值，比如 `px` 、`em` 、`rem` 、`vw` 、`vh` 、`%` 、`ch` 、`ex` 和 `fr` 等；
- 关键词，比如 `none` 、`auto` 、`min``-content` 和 `max-content` 等；
- CSS 函数，比如 `min()` 、`max()` 、`clamp()` 、`clac()` 、`fit-content()` 、`minmax()` 和 `repeat()` 等。

> 注意，其中有些类型值会涉及到网格布局中的计算，那么这部分将会单独放到一节课程中来介绍！

你也看到了，默认情况下，`grid-tempate-columns` 会根据值的数量来创建相应数量的列网格轨道，即使在没有相应数量的网格项目存在时，也一样会构建 `grid-tempate-columns` 属性指定的列数。比如上面的示例，如果网格容器中只有四个网格项目时，`grid-template-columns:  180px 20% auto 1fr 10vw` 同样会创建一个五列的网格，只不过最后一列是空的，因为没有相应的网格项目自动放置：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6f0a43c7a1c407ab75b3bbb37c0dc63~tplv-k3u1fbpfcp-zoom-1.image)

当然，如果我们网格容器的直接子元素（网格项目）超过了 `grid-template-columns` 值的数量时，默认情况下，会新增一个行网格轨道。比如 `grid-template-columns:  180px 20% auto 1fr 10vw` 碰到六个网格项目时，它会创建一个五列两行的网格：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/277c7243c88a4710aa6aaf5b8a269f3c~tplv-k3u1fbpfcp-zoom-1.image)

依此类推，最终你可能创建的是一个 `5 x N` 的网格（`N` 是行网格轨道数量）:

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d86190894c934b82bd9ba9ee1cfbb632~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/XWqxeyN>

上面这个示例中并没有显式使用 `grid-template-rows` 来指定行网格轨道尺寸，此时将会采用默认值 `auto` ，即可根据内容来决定网格行轨道的尺寸。当然，你也可以像使用 `grid-template-columns` 那样来使用 `grid-template-rows` ，即显示给网格定义行轨道的数量和尺寸：

```CSS
.container {
    display: grid;
    grid-template-columns: 180px 20% auto 1fr 10vw;
    grid-template-rows: auto 200px 10vh;
}
```

此时，`grid-template-columns` 和 `grid-template-rows` 一起构建了一个 `5 x 3` （五列三行）的网格（即使网格容器中没有`15` 个网格项目存在）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d0b5afd9bbc421b891cd2ba9007bef0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZEoqwEN>

同样的，当网格项目超过 `grid-template-rows` 和 `grid-template-columns` 构建的网格单元格数量时，将会重新创建一个行网格轨道，并且以 `auto` 来计算行网格轨道尺寸。

从这两个示例中不难发现：

- 如果仅使用 `grid-template-columns` 属性来定义一个网格时，那么默认情况会创建一个**一行单列（或多列）** 的网格，即 `N x 1` ，其中 `N` 对应的是 `grid-template-columns` 属性值的数量。当网格项目的数量超过 `N` 时，会自动创建新的行网格轨道。
- 如果同时使用 `grid-template-columns` 和 `grid-template-rows` 属性来定义一个网格时，那么默认创建一个 `M x N` 的网格，其中 `M` 对应的是 `grid-template-rows` 属性值的数量，`N` 对应的是 `grid-template-columns` 属性值的数量。当网格项目的数量超过 `M x N` 时，会自动创建新的行网格轨道。
- 如果仅使用 `grid-template-rows` 属性来定义一个网格时，那么默认情况会创建一个**一行（或多行）单列** 的网格，即 `M x 1` ，其中 `M` 对应的是 `grid-template-rows` 属性值的数量。当网格项目的数量超过 `M` 时，会自动创建新的行网格轨道。

不过要注意的是，只有 `grid-template-rows` 和（或）`grid-template-columns` 属性值定义的网格才是一个显式网格，比如 `M x N` ，其中 `M` 是 `grid-template-rows` 属性值的数量，`N` 是 `grid-template-columns` 属性值的数量。如果因网格项目数量总和超过 `M x N` 而自动新创建行网格轨道，则会被称为是隐式网格。

> 多出的网格项目自动创建新的行网格轨道，主要原因是 `grid-auto-flow` 默认的值为 `row` ，而且网格项目自动放置的算法会首先根据 `grid-auto-flow` 属性值来决定流动的方向。有关于这方面的详细介绍，稍后会阐述！

当你使用 `grid-template-columns` 和 `grid-template-rows` 来创建一个网格时，它们主要做了三件事：

- 定义了网格线；
- 定义了网格轨道数量；
- 定义了网格轨道尺寸。

`grid-template-rows` 和 `grid-template-columns` 相当于：

```CSS
grid-template-columns: [列网格线1] [列网格轨道1尺寸] [列网格线2] [列网格轨道2尺寸] [...] [列网格轨道N的尺寸] [列网格线N+1]
grid-template-rows: [行网格线1] [行网格轨道1尺寸] [行网格线2] [行网格轨道2尺寸] [...] [行网格道M的尺寸] [行网格线M+1]
```

比如：

```CSS
.container {
    display: grid;
    
    grid-template-columns: 180px 20% 10em 1fr 10vw;
    grid-template-rows: 10em 200px 10vh;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd1430c677f34753898cdf963e34f034~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，`grid-template-columns` 和 `grid-template-rows` 创建的网格线默认是以数字进行索引的：

- `grid-template-columns` 创建的列网格线，它从左往右是从 `1` 到 `N+1` 进行索引（比如上图中的 `1 ~ 6`）；从右往左是从 `-1` 到 `-(N+1)` 进行索引（比如上图中的 `-1 ~ -6`）。
- `grid-template-rows` 创建的行网格线，它从上往下是从 `1` 到 `M + 1` 进行索引（比如上图中的 `1 ~ 4`），从下往上是从 `-1` 到 `-(M+1)` 进行索（比如上图中的 `-1 ~ -4`）。

> 注意，它们也会受 CSS 的书写模式和阅读模式的影响。为了节省篇幅，这里不做详细阐述！

既然默认是数字命名网格线名称，换句话说，就可以显式给网格线命名。你可以在 `grid-template-rows` 和 `grid-template-columns` 属性中定义网格轨道时给网格线命名。显式命名网格线名称时，网格线名称需要放置在中括号里（`[]`），即 `[line-name]` 。比如：

```CSS
/* 
grid-template-columns: [列网格线1] [列网格轨道1尺寸] [列网格线2] [列网格轨道2尺寸] [...] [列网格轨道N的尺寸] [列网格线N+1]
grid-template-rows: [行网格线1] [行网格轨道1尺寸] [行网格线2] [行网格轨道2尺寸] [...] [行网格道M的尺寸] [行网格线M+1]
*/

.container {
    grid-template-columns: [col1] 180px [col2] 20% [col3] 10em [col4] 1fr [col5] 10vw [col6];
    grid-template-rows: [row1] 10em [row2] 200px [row3] 10vh [row4];
}
```

这样会在默认的网格线索引号上新增已命名的网格线名称：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8670c4623494f29b0b10fdf2a7189db~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNvqRaj>

注意，它们是相互叠加的关系，并不是相互替换的关系。

从前面的课程中可以得知，在网格容器中设置 `gap` 属性时，可以给网格轨道之间设置间距。如果你使用浏览器调试工具查看带有 `gap` 设置的网格时，你会发现相邻两个网格轨道有两条线网格线存在。很多初学者会误认为这是两条网格线，其实它就是一条网格线：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa9cc6095dca41e9b412f1b253150b5f~tplv-k3u1fbpfcp-zoom-1.image)

但是我们可以换一种思路来理解，它可以是两条网格线，只不过前者是以 `-end` 命名的网格线，后者是 `-start` 命名的网格线：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc3944f7331f4f1cb87fa074bfa849c6~tplv-k3u1fbpfcp-zoom-1.image)

因此，你可以以 `-end` 和 `-start` 给同一条网格线命名：

```CSS
grid-template-columns: [列网格线1 列网格线1-start] 列网格轨道1的尺寸 [列网格线1-end 列网格线2-start] 列网格轨道2尺寸 [列网格线2-end 列网格线N-start] 列网格轨道N的尺寸 [列网格线N-end 列网格线(N+1)-start]
grid-template-row: [行网格线1 行网格线1-start] 行网格轨道1的尺寸 [行网格线1-end 行网格线2-start] 行网格轨道2尺寸 [行网格线2-end 行网格线M-start] 行网格轨道M的尺寸 [行网格线M-end 行网格线(M+1)-start]
```

来看一个具体的示例：

```CSS
.container {
    display: grid;
    grid-template-columns: 
        [col1 col1-start] 180px 
        [col1-end col2 col2-start] 20% 
        [col2-end col3 col3-start] 10em 
        [col3-end col4 col4-start] 1fr 
        [col4-end col5 col5-start] 10vw 
        [col5-end col6 col6-start];
    grid-template-rows:
        [row1 row1-start] 10em 
        [row1-end row2 row2-start] 200px 
        [row2-end row3 row3-start] 10vh 
        [row3-end row4 row4-start];
        
    gap: 2rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f199517e24f74c6cb4f3ac18fb431f13~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/oNdaVVV>

你可以在 `[]` 中放置任意数量的网格线名称，但它们之间需要用**空格**隔开。不过在给网格线命名的时候，建议你尽可能使用具有语义化名称，更利于多人协作开发。更有意思的是，你还可以使用表情符（**Emoji** ）或 HTML 的实体符来命名，比如：

```CSS
.container {
    display: grid;
    grid-template-columns:
     [aside-start 👉] 1fr
     [🤜 aside-end main-start 👐] 4fr
     [🤛 main-end sidebar-start 🤲] 1fr
     [👈 sidebar-end];
    grid-template-rows: [👆] 1fr [🖐️] 1fr [🤘] 1fr [👇];
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1460f476b00a4048acaf3c23cc2efe99~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/PoexZPN>

在给网格线显式命名时，除了给网格线定义一个具有语义化的名称之外，还应该避免使用 CSS 的关键词给其命名，尤其是 `span` 、`auto` 、`inherit` 、`initial` 、`unset` 、`all` 、`revert` 等。因为使用这些关键词给网格线命名会令 `grid-template-rows` 和 `grid-template-columns` 属性失效。

我想你肯定会好奇，使用 `grid-template-columns` 和 `grid-template-rows` 属性定义一个网格时，就自动创建了数字索引的网格线名称了，为什么还需要显式给网格线命名呢？这里简单说一下。

CSS 网格布局中，使用 `grid-template-columns` 和 `grid-template-rows` 属性定义好一个网格时，它的子元素（网格项目）默认情况之下**只会按照自动放置算法来放置网格项目** ，即按照 HTML 文档源顺序在网格中从第一个网格单元格开始放置，从左往向，从上往下依次放置（书写顺序和阅读模式为 `ltr` 情况下）。

但要真正构建一个符合需求的 Web 布局时，还需要通过 `grid-column` 、`grid-row` 或 `grid-area` 属性来指定网格项目放置在什么位置。而且这几个属性都是根据网格线的名称来指定网格项目放置在哪，如此一来，要是没有给网格线显式命名，我们只能使用数字索引编号的网格线名称，比如：

```HTML
<div class="container">
    <header></header>
    <main></main>
    <nav></nav>
    <aside></aside>
    <footer></footer>
</div>
```

```CSS
.container {
    display: grid;
    grid-template-columns: 220px 1fr 220px;
    grid-template-rows: auto 1fr auto;
}

header {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
}

main {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
}

nav {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

aside {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
}

footer {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
}
```

你将看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/909866500c784ae7930ec67c0cb19743~tplv-k3u1fbpfcp-zoom-1.image)

这已经是我们常见的一种 Web 布局了（三列布局）。如果显式给网格线命名了呢？

```CSS
.container {
    grid-template-columns:
        [header-start nav-start footer-start] 220px
        [nav-end main-start] 1fr
        [main-end aside-start] 220px
        [aside-end header-end footer-end];
    grid-template-rows:
        [header-start] auto
        [header-end nav-start main-start aside-start] 1fr
        [nav-end main-end aside-end footer-start] auto
        [footer-end];
}

header {
    grid-column: header-start / header-end;
    grid-row: header-start / header-end;
}

nav {
    grid-column: nav-start / nav-end;
    grid-row: nav-start / nav-end;
}

main {
    grid-column: main-start / main-end;
    grid-row: main-start / main-end;
}

aside {
    grid-column: aside-start / aside-end;
    grid-row: aside-start / aside-end;
}

footer {
    grid-column: footer-start / footer-end;
    grid-row: footer-start / footer-end;
}
```

这样一来，你甚至可以使用 `grid-area` 来指定网格项目的位置：

```CSS
header {
    grid-area: header;
}

main {
    grid-area: main;
}

nav {
    grid-area: nav;
}

aside {
    grid-area: aside;
}

footer {
    grid-area: footer;
}
```

它们得到的布局效果都是等同的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c91401282c9412b8508ff151b974134~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/OJZaMxW>

示例中的 `grid-row` 、`grid-column` 和 `grid-area` 属性是用来指定网格项目在网格中的位置，具体的使用将放在后面的课程中阐述，这里你只需要知道它用来放置网格项目即可。

## 使用 grid-template-areas 定义网格

网格布局中，除了使用 `grid-template-columns` 和 `grid-template-rows` 创建一个显式网格之外，还可以使用 `grid-template-areas` 来创建。

该属性可以用来给网格区域命名，并且指定了命名的网格区域不与任何特定的网格项目关联，但可以将已命名好的网格区域名称用在 `grid-row` 、`grid-column` 和 `grid-area` 属性上，这些属性会按照网格区域名称来放置网格项目。它除了给网格区域命名之外，还提供了网格结构的可视化，使网格容器的整体布局更容易理解。该属性主要接受的值有：

- `none` ：表示没有命名的网格区域，同样也没有显式的网格轨道被这个属性定义（尽管显式的网格轨道仍然可以由 `grid-template-columns` 或 `grid-template-rows` 创建）。
- `<string>` ：为`grid-template-areas` 属性列出的每一个单独的字符串创建一行，用空格分隔的每一个字符串代表的是一个单元格，对应会创建一列网格轨道。多个同名的，跨越相邻行或列的单元格称为网格区域。非矩形的网格区域是无效的。

简单地说，`grid-template-areas` 中的每个字符串值都代表网格中的单元格，每行字符串（由多个空格隔开的字符串）代表网格中的行轨道，每个字符串中以空格分隔的一组值代表网格中的列轨道。比如下面这个示例：

```CSS
.container {
    grid-template-areas:
        "header  header  header"
        "nav     main    aside"
        "footer  footer  footer"
}
```

`grid-template-areas` 属性值等同于绘制了一个`3 x 3` （三行三列）的网格：

```CSS
----------------------------------
|  header  |  header  |  header  |
----------------------------------
|  nav     |  main    |  aside   |
----------------------------------
| footer   |  footer  |  footer  |
----------------------------------
```

即：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc38354733914e109f80bab1b03ac18f~tplv-k3u1fbpfcp-zoom-1.image)

如此一来，你可以使用 `grid-template-areas` 结构化（可视化）来构建 Web 布局，比如我们常见的一个 Web 布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f59394d7045472c9151ecb884c38f37~tplv-k3u1fbpfcp-zoom-1.image)

```HTML
<div class="container">
    <header>Primary Navigation Or Tools</header>
    <nav>Secondary Navigation</nav>
    <main>Main Content Space</main>
    <aside>Tertiary Navigation</aside>
    <footer>Miscellaneous Information</footer>
</div>
```

```CSS
.container {
    display: grid;
    grid-template-areas:
        "header   header   header"
        "nav      main     aside"
        "nav      footer   footer"
}

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
    grid-area: aside;
}

footer {
    grid-area: footer;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cd38cf9f20e4609a7a01c36883f2423~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/xxjQVGG>

注意，为了让示例更符合我们所需要的 Web 布局效果，示例中将 `grid-template-columns` 和 `grid-template-rows` 属性的值设置为 `auto 1fr auto` ，用来指定网格轨道的尺寸。

在 CSS 网格布局中，使用 `grid-template-areas` 定义一个显式网格是很容易的，但使用它给网格区域命名时有一定的规则，如果你在使用的时候违反了这些规则，将会造成 `grid-template-areas` 失效，甚至定义出来的网格不是你所期望的网格。

这里简单的给大家整理了 `grid-template-areas` 属性给网格区域命名的六条规则：

- 规则① ：必须描述一个完整的网格，即网格上的每一个单元格都必须被填充；
- 规则② ：一连串的空白，代表什么都没有，将造成 `grid-template-areas` 语法错误；
- 规则③ ：在网格命名中可以使用一个或多个`.`（`U+002E`），代表一个空单元格；
- 规则④ ： 多个相同单元格命名（令牌）创建一个具有相同名称的命名网格区域。简单地说，跨行或列命名相同的网格区域名称，可以达到合并单元格的作用；
- 规则⑤ ：任何其他字符的序列，会代表一个垃圾标记（Trash Token），会使声明无效；
- 规则⑥ ：当序列化 `grid-template-areas` 的 `<string>` 值是指定值或计算值时，相邻两字符串（网格区域命名）被一个空格（`U+0020`）隔开，当两者之间有多个空格符时，会被视为一个，其他空格将会被忽略。

先来看第一条规则。

> **规则① ：必须描述一个完整的网格，即网格上的每一个单元格都必须被填充** 。

比如：

```CSS
.container {
    grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer"
}

.container {
    grid-template-areas:
        "header   header   header  header"
        "nav      main     main    aside"
        "footer   footer   footer  footer"
}
```

虽然创建的网格是不一样的，一个是 `3 x 3` 的网格，一个是 `4 x 3` 的网格，但最终的布局效果是一样的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7704a436d43e466ea973280f565e6600~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/XWqyKLq>

从上图的效果中可以得知，**每个命名对应的是一个网格单元格** 。

第二条规则：

> **规则② ：一连串的空白，代表什么都没有，将造成** **`grid-template-areas`** **语法错误。**

即，**使用一连串空格来代表一个命名区域** 。在上面的示例基础中做一下调整：

```CSS
.container {
    grid-template-areas:
        "header   header   header  header"
        "nav      main     main    aside"
        "footer   footer   footer  footer"
}

.container {
    grid-template-areas:
        "header   header   header       "
        "nav      main     main    aside"
        "footer   footer   footer  footer"
}
```

在第二个`.container` 中，使用了一连串的空格来替代`header` ，此时，浏览器会视 `grid-tempate-areas` 的值是一个无效值，造成 `grid-template-areas` 属性语法错误，创建的网格也就是一个不符合要求的网格：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9917cf45afc54439a458d114ba5d3bd8~tplv-k3u1fbpfcp-zoom-1.image)

使用**规则①** 可以实现区域填充网格且不留空余空间，但不能使用**规则②** 来给网格留出一个空的或几个空的单元格。可实际生产中，Web 布局有时的确需要有空的单元格存在。比如下图这样的 Web 布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc2891bc68f746418016f0b6d88c8c68~tplv-k3u1fbpfcp-zoom-1.image)

如果想给网格留出空白区域（空白的单元格），那就要使用规则三：

> **规则③ ：在网格命名中可以使用一个或多个 `.`（`U+002E`），代表一个空单元格**。

可以在 `grid-template-areas` 中使用一个点（`.`）或多个点（`...`）来告诉浏览器，这个单元格是空白单元格，如果连续有几个都是用点来表示的单元格，则连接区域是一个空白区域。比如上图左侧的布局，中间部分距离浏览器左右两侧都是空白区域，你就可以这样来设置 `grid-template-areas` 属性的值：

```CSS
.container {
    grid-template-areas:
        "header  header  header  header  header  header   header    header"
        "...     main    main    main    main    sidebar  sidebar   ..."
        "...     twin-a  twin-a  twin-a  twin-b  twin-b   twin-b    ..."
        "footer  footer  footer  footer  footer  footer   footer     footer";
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca931485f3d846b8bd04bafcd2b380de~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/KKRraRg>

另一个布局也是类似的：

```CSS
.container {
    grid-template-areas:
        "header  header  menu    menu    menu    menu    menu    menu"
        "hero    hero    hero    hero    hero    hero    hero    hero"
        "main    main    main    main    main    ...     image   image"
        "main    main    main    main    main    ...     extra   extra"
        "...     brand   brand   brand   brand   brand   brand   ..."
        "footer  footer  footer  footer  footer  footer  footer  footer";
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af3030dfa54c4ba1a37fef7bc8677225~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/MWGzJzo>

示例中使用了`...` 来代表空单元格，你可以根据自己的喜好，设置任意数量的点号`.` ，比如 `....` ，它们和使用一个点（`.`）所起的作用是等同的。即 **`.`、 `..`、 `...` 和 `....` 等同，在 `grid-template-areas` 中代表的是一个空单元格** 。

```CSS
.container {
    grid-template-areas:
        "header header header header"
        ".      main   aside  ."
        "footer footer footer footer";
        
    /* 等同于 */ 
    grid-template-areas:
        "header header header header"
        "...    main   aside  ..."
        "footer footer footer footer";
}
```

但在使用多个点代表空单元格时有一个细节尤其要注意，那就是**点与点之间不能有任何空格，否则将会代表多个空单元格** ，比如：

```CSS
.container {
    grid-template-areas:
        "header header header header"
        "nav    main    main   aside"
        ". .    footer  ..."; 
    /* 等同于 */
    grid-template-areas:
        "header header header  header"
        "nav    main   main    aside"
        ".      .      footer  ..."; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba218064b35942cb8b7288810340a951~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/vYjQvNo>

第四条规则：

> **规则④ ： 多个相同单元格命名（令牌）创建一个具有相同名称的命名网格区域。简单****地****说，跨行或列命名相同的网格区域名称，可以达到合并单元格的作用**。

其实，前面的示例中已经有**规则④** 存在了。这里还是单独拿一个示例来介绍，大家更易于理解。例如下图这个示例，需要将侧边栏（`sidebar`）和页脚（`footer`）合并起来（`main` 和 `footer` 区域具有相同的宽度）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/521be410deea4823a5ef43ac4358bc28~tplv-k3u1fbpfcp-zoom-1.image)

可以像下面这样给网格区域命名：

```CSS
.container {
    grid-template-areas:
        "header  header"
        "sidebar main"
        "footer  footer"
}

.container {
    grid-template-areas:
        "header  header"
        "sidebar main"
        "sidebar footer"
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f9104c9819d40f3818799617b09a9f6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/BaxGMmx>

两者差异如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/123220480c894bc3ad83d30f1e1d00f0~tplv-k3u1fbpfcp-zoom-1.image)

通过给网格区域命名来达到合并多个单元格时，你只能按行轨道或列轨道方向合并。也就是说，**一个命名的网格区域跨越多个网格单元格时，它们必须要形成一个单一的填充矩形，否则会造成** **`grid-template-areas`** **属性失效** ，比如说一个 `L` 的形状：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7b389309edf475d8c6b1281c4d5953d~tplv-k3u1fbpfcp-zoom-1.image)

**规则⑤** 提到了，给网格区域命名并不是任何名称都是有效的：

> **规则⑤ ：任何其他字符的序列，会代表一个垃圾标记（Trash Token），会使声明无效。**

在显式给网格区域命名时，尽可能使用有语义的名称，比如前面示例中所示的`header` 、`nav` 等等。切勿使用一些数字、标点符号以及它们的组合等，比如 `1` 、`#` 、`1st` 等，将会被视为无效的声明。如果命名的名称是无效的，那么 `grid-template-areas` 属性也会被视为无效：

```CSS
/* 请不要像这样给网格区域命名 */
.container {
    grid-template-areas:
        "1    1     a%b    a%b"
        "1st  main  main   main"
        "1st  3rd   3rd    3rd"
}
```

不过，也可以像给网格线命名那样，使用表情符（Emoji）或（和）HTML 的实体符：

```CSS
.container {
    grid-template-areas:
        "↤     ↤     ↤    ↤     ↤     ↤"
        "⺗    ✨    ✨    ✨    ①    ①"
        "⺗    ☑     ☑     ☑    ☑     ☑";
}

header {
    grid-area: ↤;
}

nav {
    grid-area: ⺗;
}

aside {
    grid-area: ①;
}

main {
    grid-area: ✨;
}

footer {
    grid-area: ☑;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4ade54df6064b6fb28de9ed3ba745f6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/JjvezzZ>

虽然可以这么使用，但强烈建议不要在生产中这样使用！

最后一条规则：

> **规则⑥ ：当序列化** **`grid-template-areas`** **的** **`<string>`** **值是指定值或计算值时，****相邻两字符串（网格区域命名）被一个空格（****`U+0020`）隔开，当两者之间有多个空格符时，会被视为一个，其他空格将会被忽略** 。

简单地说，`grid-template-areas` 属性中同一行相邻的两个名称（`<string>`）之间的空格符的数量总是会被视为只有一个。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81cc8e011080481e8a56d298a1ac98a9~tplv-k3u1fbpfcp-zoom-1.image)

上图中，两个`grid-template-areas` 的值最终被浏览器解析出来的结果是一样的。

也就是说，在使用 `grid-template-areas` 定义网格时，命名应该遵循这些规则，不然容易造成语法上的错误，使该属性失效：

- 规则① ：必须描述一个完整的网格，即网格上的每一个单元格都必须被填充；
- 规则② ：一连串的空白，代表什么都没有，将造成 `grid-template-areas` 语法错误；
- 规则③ ：在网格命名中可以使用一个或多个`.`（`U+002E`），代表一个空单元格；
- 规则④ ： 跨行命名相同的网格区域名称，可以达到合并单元格的作用；
- 规则⑤ ：任何其他字符的序列，会代表一个垃圾标记（Trash Token），会使声明无效。

`grid-template-areas` 在显式给网格区域命名的同时，也隐式创建了相应的行网格线与列网格线，并且网格线的名称是以 **`网格区域名称-start`** 和 **`网格区域名称-end`** 方式命名。例如，网格区域的名称叫 `header` ，则围绕该区域会创建四条隐式网格线：

- 行网格线，`header-start` 和 `header-end` ；
- 列网格线， `header-start` 和 `header-end`。

随意拿前面的一个示例来看：

```CSS
.container {
    grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer";
}

.container {
    grid-template-areas:
        "header header header header"
        "nav    main   main   aside"
        "footer footer footer footer";
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d520eead57cc4725b08e76941ca5e79d~tplv-k3u1fbpfcp-zoom-1.image)

如此一来，结合前面的内容，我们可以得知，给网格线命名时，就可以：

- 几乎可在中括号 `[]` 中使用除关键词 `span` 、`inherit` 、`initial` 、`revert` 、`all` 、`unset` 和 `auto` 等之外的任意 `<string>` 符，也包括表情符（Emoji）和 HTML 实体符；
- `grid-template-areas` 创建的网格区域名称，会以 `-start` 和 `-end` 为后缀创建四条隐式命名网格线名称；
- 可以在中括号 `[]` 中同时给同一条网格线命名多个名称，多个名称之间需要用空格分隔；
- 多条网格线可以有相同的名字，引用时在名字后面附上网格线对应的数字索引号；
- 在未显式给网格线命名时，将会以数字为网格线编号。

> **使用** **`grid-template-columns`** **、`grid-template-rows`** **和** **`grid-template-areas`** **属性定义的网格是一个显式网格** 。有明确的网格轨道（行或列）和单元格数量。

## 使用 grid-auto-columns 和 grid-auto-rows 定义网格

通过前面课程的学习，我们知道了什么是显式网格，以及如何定义一个显式网格。在 CSS 网格布局中，除了使用 `grid-template-*` （`grid-template-columns` 、`grid-template-rows` 和 `grid-template-areas`）之外，还可以使用 `grid-auto-*` （即 `grid-auto-columns` 、`grid-auto-rows` 和 `grid-auto-flow`）来定义一个网格。

这里先从 `grid-auto-columns` 和 `grid-auto-rows` 属性开始。

你已经知道了，可以在网格容器上显式设置 `grid-template-columns` 和 `grid-template-rows` 值定义一个网格，并且指定网格轨道的尺寸大小。比如：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    gap: 4px;
}
```

`grid-template-columns` 告诉浏览器创建了一个两列（列宽是 `200px`）的网格，但并没有告诉浏览器，网格有几行以及行高是多少。这个时候浏览器会根据网格项目来创建行轨道。

当网格容器只有一个或两个网格项目时，它创建的是一个 `1 x 2` （一行两列）的网格；当网格项目超过`2` （即网格列轨道数量，`grid-template-columns` 属性的值，此例为`2`）时，浏览器会新创建一个行轨道，并且以内容高度为行轨道高度，依此类推：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ff1f82677894aab8d057ba14cf1b2b9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/oNdQRZL>

浏览器会这样处理，是因为我们并没有明确地把网格项目放置到指定的网格单元格（或网格区域上），因此它会被 **自动放置（Auto Placement）** 。默认情况下，每个网格项目在行轴和列轴上的跨度（`span`）都是 `1` ，所以它们都会被放置到下一个可用的网格单元格中。

对于自动放置（Auto Placement），[W3C 规范中有明确的定义](https://www.w3.org/TR/css-grid/#grid-auto-flow-property)：

> Grid items that aren’t explicitly placed are automatically placed into an unoccupied space in the grid container.

大致意思是 “**没有明确放置的网格项目会被自动放置到网格容器中一个未被占用的空间（网格单元格）** ”。但它有一个最基本的规则：

> **网格中的网格项目会把自已摆放到网格中，每一个网格会有一个网格项目。默认的流向是按行排列网格项目。这是因为** **`grid-auto-flow`** **属性默认值为** **`row`** 。

上面这个示例的效果也验证了这一基本原则。在网格中这个新增的行被称为**隐式行轨道** ，被自动创建的隐式行轨道的尺寸是自适应大小的，它会根据它所包含的内容来设定行轨道尺寸，以保证内容不溢出网格。

从这里，我们可以获得两点信息：

- 由自动放置网格项目而创建新的隐式行轨道，它的尺寸也是可以被显式设置的；
- 虽然网格默认流向是按行排列网格项目，但是我们也可以让它按列排列，只需要更改 `grid-auto-flow` 属性的值。

第一点比较好理解，在网格布局中，有一个类似于 `grid-template-rows` 的属性，即 `grid-auto-rows` ，该属性主要用来显式指定隐式行轨道的尺寸。比如，我们在上面的示例中新增一行代码：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    gap: 4px;
    
    /* 设置隐式行轨道尺寸 */
    grid-auto-rows: 200px;
}
```

这个时候 `grid-auto-rows` 指定了隐式行网格轨道的尺寸是 `200px` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da18c53d6efd4be79023389bcedbde90~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/oNdQrbo>

`grid-auto-rows` 属性和 `grid-template-rows` 属性类似，可以设置多个值，并且每个值之间使用空格隔开。比如：

```CSS
.container {
    grid-template-columns: repeat(2, 200px);
    
    grid-auto-rows: 100px 160px 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15290f5cde984865987e6065ac904605~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/jOxXLZL>

不难发现，`grid-auto-rows` 属性的值是不断循环的，将所设置的值按创建的隐式行轨道循环下去。比如上面示例中的 `grid-auto-rows: 100px 160px 1fr` ，当：

- 只有一行行网格轨道时，它的尺寸是 `100px`；
- 有两行行网格轨道时，第一行是 `100px`，第二行是 `160px`；
- 有三行行网格轨道时，第一行是 `100px` ，第二行是 `160px` ，第三行是 `1fr`；
- 有四行网格轨道时，第一行是 `100px` ，第二行是 `160px` ，第三行是 `1fr` ，第四行将开始重新循环，即它的行高是 `100px`；
- 依此类推 ……

这个特性是 `grid-template-rows` 属性没有的，那是因为 `grid-template-rows` 指定的值数量是设置显式网格的，如果网格行轨道超过 `grid-template-rows` 属性值的数量时，它将自动创建隐式的行网格轨道，在没有显式设置 `grid-auto-rows` 时，将会默认以 `auto` 值来设置创建的隐式行网格轨道尺寸：

```CSS
.container {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: 100px 200px 1fr;
}

.container {
    grid-template-columns: repeat(2, 200px);
    grid-auto-rows: 100px 200px 1fr;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f5044678e094b2e8a957a667b450a0e~tplv-k3u1fbpfcp-zoom-1.image)

当然，在网格布局中，你可以将 `grid-tempalte-rows` 和 `grid-auto-rows` 组合在一起使用，它们将会告诉浏览器，显式行网格轨道尺寸按照 `grid-template-rows` 属性值计算，隐式行网格轨道尺寸按照 `grid-auto-rows` 属性值计算。比如：

```CSS
.container {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: repeat(2, 100px);
    
    grid-auto-rows: 80px 1fr 160px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/181617aa9ad54000b732a01ed194c938~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxjmLYm>

也就是说，在 CSS 网格布局中，`grid-template-rows` 和 `grid-auto-rows` 都是用来设置网格行轨道尺寸的，不同的是：

- `grid-template-rows` 设置**显式行网格轨道尺寸**；
- `grid-auto-rows` 设置**隐式行网格轨道尺寸**。

它们可以用的值类型几乎是一致的，即可用于`grid-template-rows` 属性的值都可以用在 `grid-auto-rows` 属性上，需要注意的是 `repeat()` 函数用于 `grid-auto-rows` 时会失效，当其失效时，`grid-auto-rows` 会取其默认值 `auto` 。

> **`grid-auto-columns`** **的使用和** **`grid-auto-rows`** **一样，不同的是它用来创建隐式列轨道和隐式列轨道尺寸** 。

## 使用 grid-auto-flow 改变网格排列方向

> CSS 网格中的 `grid-auto-flow` 属性有点类似于 Flexbox 布局中的 `flex-direction` 属性！

如果你没有在网格容器上显式设置 `grid-template-columns` 、`grid-template-rows` 和 `grid-template-areas` 属性值的话，那么默认情况，网格项目是沿着块轴（Block Axis）方向顺流下来的。由于我们使用的语言，其阅读和书写方式默认是 `ltr` （Left-To-Right），所以你看到的是会新增行网格轨道来自动放置网格项目。

要是你调整 CSS 的书写模式，即 `writing-mode` 的值或者 `direction` 的值，你会看到网格项目流的方向会做出相应调整，但始终默认是沿着块轴方向放置：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5a74e54982b425fa02868c19b410bcb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/gOzZGvX>

即网格流受书写模式影响：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54d99ecf2edd4899b92243d7c3c417a0~tplv-k3u1fbpfcp-zoom-1.image)

> **注意，如果没有特殊声明，我们的书写模式都是** **`ltr`** **模式** ！

在网格布局中，我们可以使用 `grid-auto-flow` 来控制流的方向。该属性可以接受的值主要有：

- `row` ：自动放置算法，通过依次填充每一行来放置网格项目，必要时添加新行。如果既没有提供行也没有提供列，则假定是行。
- `column` ：自动放置算法，通过依次填充每一列来放置网格项目，必要时添加新的列。
- `dense` ：如果 `grid-auto-flow` 属性指定了该值，自动放置算法使用 `dense` （“密集”）包装算法，如果较小的网格项目出现在网格中，它将尝试在较早的时间内填入洞（“网格单元格”）。这可能会导致网格项目不按顺序出现，而这样做会填补大网格项目留下的洞（“单元格”）。如果省略了该值，则使用 `sparse` （“稀疏”）算法，自动放置算法在放置网格项目时，只在网格中“向前（`forward`）”移动，从不回溯以填补漏洞。这确保了所有自动放置的网格项目都是“按顺序”出现的，即使是留下了可以由后来的网格项目填补的洞（“网格单元格”）。

> **注意，`dense`** **只是改变了网格项目的视觉顺序，可能会导致它们出现失序，这对 Web 可访问性是不利的。**

简单地说，`grid-auto-flow` 可以接受 `row` （即默认值），`column` ，`dense` 以及 `row` 、`column` 和 `dense` 的组合值，即 `row dense` 和 `column dense` 。

比如下面这个示例：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(2, 100px);
    gap: 1rem;
    
    grid-auto-flow: var(--grid-auto-flow, row);
    grid-auto-columns: 200px; /* 指定隐式列轨道尺寸 */
}
```

当 `grid-auto-flow` 取值为 `row` （即`--grid-auto-flow` 的值为 `row` ），这个时候网格项目自动放置是从第一个网格单元格开始，从左往右依次排列，当网格列轨道数量不够时（示例中显式设置的是 `3` 列），会自动换行：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506632dde6134ac69f87ad7e53ac1c0c~tplv-k3u1fbpfcp-zoom-1.image)

当 `grid-auto-flow` 取值为 `column` 时，网格项目自动放置会从第一列第一个网格单元格开始，从上往下排列，当网格行轨道数量不够时，会新创建一列网格轨道：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd30f5e99a2d40029e7c49252f934655~tplv-k3u1fbpfcp-zoom-1.image)

`grid-auto-flow` 取值为 `row` 和 `column` 时网格项目自动放置流方向对比如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e10924ec3a34874adf1d8db41ffb3ec~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/wvjRpoM>

注意，在这个示例中，你看不到 `grid-auto-flow` 取值为 `dense` 以及 `row dense` 和 `column dense` 带来的变化，因为我们示例是一个按顺序，按方向自动放置网格项目的。

我们把上面示例调整一下：

```CSS
.container {
    display: grid;
    /* 显式创建了一个 4 x 2, 四列两行的网格 */
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: repeat(2, 100px);
    
    gap: 1rem;
    
    /* 网格默认流的向就是 row */
    grid-auto-flow: var(--grid-auto-flow, row);
    
    /* 设置隐式列网格轨道和隐式行网格轨道尺寸 */
    grid-auto-columns: 200px;
    grid-auto-rows: 100px;
}

/* 根据网格线编号来放置网格项目 */

.item:nth-child(4n+1) { 
  grid-column-end: span 2; 
  grid-row-end: span 2; 
} 

.item:nth-child(2) { 
  grid-column: 3; 
  grid-row: 2 / 4; 
} 

.item:nth-child(5) { 
  grid-column: 1 / 3; 
  grid-row: 1 / 3; 
}
```

此时，`grid-auto-flow` 值为 `row` 或 `column` 时，都会有空的单元格出现，而这些空的单元格也称为“网格洞”。意思就是，应该按照顺序填充的单元格却没有被填充，好比在一个布局挖了几个洞。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f2a71db95d54e60b36d70812ded4a87~tplv-k3u1fbpfcp-zoom-1.image)

在网格中会产生这样的网格洞（网格缺口），是因为对于自动放置的网格项目，如果网格轨道的大小不适合放入一个网格项目，这个网格项目就会自动被移到下一行，直到它找到了可以容纳它的空间。

在网格布局中，我们并不希望有上面示例这种现象产生，即**产生网格缺口** 。如果你想避免这种现象产生，需要在网格容器上显式将 `grid-auto-flow` 的值设置为 `dense` 。如果网格流的顺序是 `row` 时，可以使用 `row dense` ，但它的效果和 `dense` 一样，这主要是因为 `grid-auto-flow` 的默认值是 `row` 。如果你网格流的顺序是 `column` ，那就需要显式设置 `column dense` 才能避免网格缺口出现。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afbebd2dcfdb405ca1bf5c98d07c1ca7~tplv-k3u1fbpfcp-zoom-1.image)

`row` 、`column` 、`dense` 、`row dense` 和 `column dense` 效果对比如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dcb35b16ffb4bdc91507268d9508cd6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/JjvwMeV>

这个功能，在创建图片墙时非常有用:

```HTML
<ul class="gallery">
    <li>
        <img src="https://source.unsplash.com/random?iran" alt="" />
    </li>
    <!-- ... 此处省略14个 -->
</ul>
```

```CSS
.gallery {
    display: grid;
    grid-template-columns: repeat(4, 8vw);
    grid-template-rows: repeat(4, 8vw);
    grid-auto-rows: 8vw;
    grid-auto-columns: 8vw;
    grid-auto-flow: var(--grid-auto-flow, row);
    gap: 1rem;
}

.gallery li:nth-child(2),
.gallery li:nth-child(4),
.gallery li:nth-child(6) {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery li:nth-child(5),
.gallery li:nth-child(7),
.gallery li:nth-child(9) {
  grid-column: span 3;
  grid-row: span 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc0a9e1f7c6640589d1402243dfcc50d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/oNdJEqz>

## 小结

在 CSS 网格中，网格容器的 `grid-template-rows` 、`grid-template-columns` 和 `grid-template-areas` 属性定义了显式网格的固定数量的网格轨道。当网格项目被定位在这些界限之外时，网格容器会通过向网格添加隐式网格线来生成隐式网格轨道。这些网格线与显式网格线一起构建了隐式网格。

另外，网格容器的 `grid-auto-rows` 和 `grid-auto-columns` 属性对这些隐式网格轨道，以及由 `grid-template-areas` 创建但未被 `grid-template-rows` 或 `grid-template-columns` 明确调整大小的任何显式网格轨道进行调整。

同时，网格容器的 `grid-auto-flow` 属性控制没有明确位置的网格项目的自动放置。一旦显式网格被填满（或没有显式网格），自动放置也会创建隐式网格。

我们可以这样来理解：

- `grid-template-rows` 、`grid-template-columns` 和 `grid-template-areas` 定义显式网格，但 `grid-template-areas` 无法指定网格轨道尺寸大小。
- `grid-template-rows` 和 `grid-template-columns` 可用来指定显式网格轨道数量和尺寸。
- `grid-auto-rows` 和 `grid-auto-columns` 以及 `grid-auto-flow` 可用来创建隐式网格。
- `grid-auto-rows` 和 `grid-auto-columns` 可用来指定隐式网格轨道尺寸。
- `grid-auto-flow` 可以用来控制网格流的方向以及自动放置网格项目的算法。
- `grid-row` 、`grid-column`  和 `grid-area` 将网格项目放置在显式网格之外时也将会创建隐式网格，即使未使用 `grid-template-rows` 、`grid-template-columns` 和 `grid-template-areas` 也能创建隐式网格。

来到这里，我们已经知道了如何创建（或定义）一个网格，一个符合自己要求的网格。但这只是使用网格布局的基础之一，我们还需要知道如何设置网格轨道的尺寸。网格轨道尺寸的设置涉及到了一些网格的计算。那么接下来的课程，我们主要来介绍网格中的计算。
