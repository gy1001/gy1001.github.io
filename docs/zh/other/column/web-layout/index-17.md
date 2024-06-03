# 17-使用子网格构建 Web 布局

我们花了一节课（《[网格布局中的子网格和嵌套网格](https://juejin.cn/book/7161370789680250917/section/7160657953932967967)》）专门介绍了网格布局中的子网格和嵌套网格的基础知识。并且阐述了为什么需要子网格布局。这节课，我将带领大家了解子网格的一些潜在案例，即子网格可用于哪些 Web 中布局中。

## 卡片组件的布局

在 Web 布局中，常常会用到卡片组件，子网格来构建卡片组件布局是很有用的。接下来，我们一起来看两种卡片组件的布局。先来看第一种：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/083ae04152f24fd2a9347c2cfb246a1e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/zYaKmpZ>

相邻卡片是在块轴（Block Axis）方向（垂直方向）堆叠的，并且每张卡片都包括：

- 标题；
- 缩略图；
- 描述文本；
- 媒体列表。

它的基本结构如下：

```
<div class="cards"><!-- grid -->
    <div class="card"><!-- subgrid -->
        <h3>标题</h3>
        <img src="" alt="缩略图" />
        <p>描述文本</p>
        <span>列表1</span>
        <span>列表2</span>
        <span>列表3</span>
    </div>
</div>
```

卡片容器 `.cards` 分为五列，行随卡片 `.card` 的数量自动增加：

```
.cards {
    display: grid;
    
    grid-template-columns: 
        minmax(7em, 12em) 
        repeat(3, max-content)
        1fr;
    row-gap: 2rem;
}
```

第一列列轨道设置尺寸是 `minmax(7em, 12em)` ，这样做是让卡片上缩略图的大小控制在 `7em ~ 12em` 之间。由于媒体导航项的内容大小我们并不知，因此这里使用 `max-content` 来控制，最后一列设置 `1fr` ，将可用空间都留给这个列：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/399b5dacf7b9465db3114c6ab268e098~tplv-k3u1fbpfcp-zoom-1.image)

每张卡片（`.card`）它跨越五列（`grid-column: 1 / -1` 或 `grid-column: 1 / span 5`），可以在 `.card` 的 `grid-template-columns` 设置 `subgrid` ，继承父网格（`.cards`）的列轨道尺寸。另外在子网格上使用 `grid-template-rows` 重新定义自己的行网格轨道尺寸：

```
.card {
    display: inherit;
    
    grid-template-columns: subgrid;
    grid-template-rows: min-content max-content min-content;
    
    column-gap: 1em;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/455fdf53a2b9491184a716729db90793~tplv-k3u1fbpfcp-zoom-1.image)

创建好网格之后，卡片中的标题（`h3` ）、描述文本（`p`）、缩略图（`img`）和导航列表项（`span`）就可以根据子网格（`.card`）的网格线名称放置到指定位置：

```
h3 {
    grid-column: 1 / -1;
}

p {
    grid-column: 2 / -1;
}

img {
    grid-row: 2 / -1;
}
```

另一个卡片组件是像下图这样的，在内联轴方向平铺：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25268de6eed946a1a2fb2eae6832658e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/abKmQWj>

其实前面有一个示例类似这种卡片组件的布局。只不过这个示例，我改了一下，让其变得稍微复杂那么一点。上面布局所需的 HTML 结构如下：

```
<div class="cards"><!-- grid -->
    <div class="card"><!-- subgrid -->
        <div class="media"><!-- subgrid -->
            <img src="avatar.jpg" alt="media object" />
            <p>Media Content</p>
        </div>
        <h3>Card Title</h3>
        <img src="card--figure.jpg" alt="card figure" />
        <p>Card Describe</p>
        <svg>Like Icon</svg>
        <button>More Button</button>
    </div>
    <!-- 省略的 card -->
</div>
```

在最外层的卡片容器（`.cards`）上使用了 RAM 布局技术，让卡片在卡片容器中能能够根据空间自动断行，并且根据卡片组件的需要，使用 `grid-template-rows` 定义行网格轨道尺寸和数量：

```
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 18rem), 1fr));
    grid-template-rows: min-content min-content minmax(10rem, 14rem) auto auto;
    gap: 4rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a36815091a0c40d29f0445c5691c9167~tplv-k3u1fbpfcp-zoom-1.image)

每张卡片 `.card` 是父网格（`.cards`）的一个子网格，跨越父网格五行，并且继承父网格行网格轨道，不同的是重新定义了网格列轨道数量和尺寸，同时为了让卡片中的每个元素更易于放置，使用 `grid-template-areas` 在子网格上显式定义了网格区域名称。并且显式设置`gap` 值为 `0` ，重置了子网格轨道之间的间距：

```
.card {
  grid-row: span 5;

  display: inherit;
  grid-template-columns: 1rem min-content 1fr min-content 1rem;
  grid-template-rows: subgrid;
  grid-template-areas:
    ".       media    media    media ."
    ".       title    title    title ."
    "figure  figure   figure   figure    figure"
    ".       describe describe describe  ."
    ".       like     .        button    .";
  gap: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eda52a75ef34697aab07f7b4d814cdd~tplv-k3u1fbpfcp-zoom-1.image)

卡片中的每个网格项目就可以使用 `grid-area` 来指定位置：

```
.media {
    grid-area: media;
}

h3 {
    grid-area: title;
}

.card > img {
    grid-area: figure;
}

.card > p {
    grid-area: describe;
}

.card svg {
    grid-area: like;
}

.card button {
    grid-area: button;
}
```

在这个示例中，网格 `.card` 既是网格 `.cards` 的子网格，又是网格 `.media` 的父网格。因为，在 `.media` （网格项目）上也使用 `display: inherit` 定义了一个网格，同时继承其父网格 `.card` 的列网格轨道：

```
.media {
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-areas: "des    des    avatar";
    align-items: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dca94529b7344048ab48553992286e7~tplv-k3u1fbpfcp-zoom-1.image)

在`.media` 网格中的网格项目也可以使用 `grid-area` 放置到对应的网格区域中，因为我们在 `.media` 中使用 `grid-template-areas` 创建了网格区域：

```
.media p {
  grid-area: des;
}

.media img {
  grid-area: avatar;
  justify-self: end;
}
```

使用子网格`subgrid` 来构建卡片组件时，不管哪个网格项目的内容增加还是减少，卡片中的每个区域都可以对齐，让你的卡片组件整体视觉是好看的！

事实上，这种布局技术还可以用于 Web 上其他地方，比如页脚的导航、下拉菜单等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bb29df201de4ceb810755e19abc4d20~tplv-k3u1fbpfcp-zoom-1.image)

就拿页脚导航为例吧。构建这样的布局，你可能需要一个像下面这样的 HTML 结构：

```
<body>
    <div class="wrapper">
        <footer class="menu">
            <div class="menu__item">
                <h3 class="menu__heading">Title</h3>
                <ul class="menu__lists">
                    <li><a href="">Item</li>
                </ul>
            </div>
            <!-- 省略其他 menu__item -->
        </footer>
    </div>
</body>
```

我们要的是这样的一个效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/913208cb97e74c3189b7e8dadfe8a31b~tplv-k3u1fbpfcp-zoom-1.image)

- 列数能够根据视窗大小自动调整，即自动断行；
- 导航菜单中，同一行中的区域，其标题与标题对齐，菜单项与菜单项对齐。

实现第一个要求，在 CSS 网格布局中很简单，只需要使用 RAM 布局技术即可。但没有子网格（`subgrid`）的话，第二个要求实现起来就比较难，你得到的效果将会像下图这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45866cc5f95f4bf99064eb96fbe667ba~tplv-k3u1fbpfcp-zoom-1.image)

你可以像上面卡片示例一样，将 `.menu` 和 `.menu__item` 都定义为网格，而且 `.meun__item` 网格是 `.menu` 网格的子网格，在子网格 `.menu__item` 跨越两行，并且设置它的 `grid-template-rows` 值为 `subgrid` 。这样做是让子网格继承父网格的行网格轨道，当子网格行网格轨道尺寸变大时，它的父网格行网格轨道也会变大。你就可以实现第二个要求。

整个页脚导航的布局效果，除了运用了 CSS 子网格、RAM 布局技术之外，还使用了 Full-Bleed 布局技术，有关于布局的详细代码如下所示：

```
/* Full-Bleed 布局技术 */
body {
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

.wrapper {
    /* 从第一列跨越到最后一列*/
    grid-column: 1 / -1;

    display: inherit;
  
    /* 继承父网格 body 的网格特性*/
    grid-template-columns: subgrid;
}

footer {
    /* 将 footer 放置在中间列 */
    grid-column: 2 / 3;

    display: inherit;

    /* 使用 RAM 布局技术，实现网格项目的自动断行 */
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 20rem), 1fr));
    gap: 2rem;
}

.menu__item {
    /* 每个网格项目跨越两行，标题一行，菜单项一行 */
    grid-row: span 2;

    display: inherit;
    
    /* 继承父网格 footer 的网格特性 */
    grid-template-rows: subgrid;
    row-gap: 1rem;
}
```

不难发现，示例中的 `body` 、`.wrapper` 、`footer` 和 `.menu__item` 都是网格，它们之间的关系是：

- `.wrapper` 网格是 `body` 网格的子网格，并且在 `.wrapper` 上设置了 `grid-template-columns` 值为 `subgrid` ，`.wrapper` 网格将继承父网格 `body` 的列网格轨道数量和尺寸。
- `footer` 网格嵌套在 `.wrapper` 网格内，但并没有在 `grid-template-columns` 或 `grid-template-rows` 属性上显式设置值为 `subgrid` ，因此它们只是嵌套关系，`footer` 和 `.wrapper` 是两个独立的网格。
- `.menu__item` 网格是 `footer` 网格的子网格， `.menu__item` 项目跨越两行，同时将其 `grid-template-rows` 属性设置为 `subgrid` ，因此它将继承其父网格 `footer` 的行网格轨道特性。页脚菜单每一栏的标题相互对齐，菜单项相互对齐。

你最终看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/659526f8e7d64e459e50dbaf562aad28~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/poKNLbE>

感兴趣的同学，可以使用同样的技术（RAM 布局技术和子网格布局）来实现下图中下拉导航的布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0d4330200d84a579a2b8ae9d34fba7f~tplv-k3u1fbpfcp-zoom-1.image)

## 品牌页（区）布局

在 Web 页面的设计中，常常会有通栏的横幅的设计效果，往往把这种效果称为 **Branding** 。如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcb8b31b500a4760ac2e15ff0fa1e7b1~tplv-k3u1fbpfcp-zoom-1.image)

它包含了三个部分：

- 标题（Headline）；
- 特色功能区（Featured Section）；
- 普通卡片区（Card）。

它的 HTML 结构可以像下面这样：

```
<section class="branding">
    <div class="headline"></div>
    <div class="featured"></div>
    <div class="card"></div>
</div>
```

当然，你可以根据自己需要往相应的区域继续填充内容，比如：

```
<section class="branding">
    <div class="headline">
        <h3>主标题</h3>
        <h4>次标题</h4>
    </div>
    <div class="featured">
        <div class="featured__content"><!-- 内容区域 -->
            <h3>特色功能区域:标题</h3>
            <blockquote>特色功能区域：描述文本</blockquote>
        </div>
        <figure class="featured__thumbnail">
            <img src="featured--thumbnail.jpg" alt="特色功能区域缩略图" />
        </figure>    
    </div>
    <div class="card">
        <figure>
            <img src="card--thumbnail.jpg" alt="卡片缩略图" />
        </figure>
        <h3>卡片标题</h3>
        <p>卡片描述文本</p>
    </div>
</section>
```

假设设计师将整个 Branding 区域**均分为五列** ，除了“特色功能区域（Featured Section）” 占了三列之外，其他两个区域（Headline 和 Card）只各占一列，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe64e47f4264ef4b9739f66871ea895~tplv-k3u1fbpfcp-zoom-1.image)

使用网格布局很容易就将它均分成五份，使用网格线可以将它们放置到指定的区域：

```
.branding {
    display: grid;
    
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
}

.featured {
    grid-column: 2 / span 3;
}

.card {
    grid-column: 5;
}
```

`.featured` 网格项目（即 “特色功能区域” ）的 `grid-column` 属性设置了 `2 / span 3` 值，表示它将放置在列网格线`2` （起始位置），并且向右合并三列（`span 3`），相当于 `grid-column: 2 / 5` ，即从第二列起始网格线跨越到第五列起始网格线。

为了让 `.featured` 网格项目能继承父网格（`.branding`）的网格特性，得到更好的控制，需将其设置为一个子网格（`display` 设置为 `inherit` 或 `grid` ），并且将其 `grid-tempalte-columns` 设置为 `subgrid` ：

```
.featured {
    grid-column: 2 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
}
```

为了能更好地放置该网格中的网格项目（“特色功能区域”中的内容`.featured__content` 和缩略图 `.featured__thumbnail`），你还可以显式设置 `grid-template-areas` 属性的值：

```
.featured {
    grid-column: 2 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    
    grid-template-areas: "content thumbnail thumbnail";
}
```

内容区域占一列，缩略图占两列：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d1ce51ed1454125b86244b0c0a5b36c~tplv-k3u1fbpfcp-zoom-1.image)

```
.featured__content {
    grid-area: content;
}

.featured__thumbnail {
    grid-area: thumbnail;
}
```

> Demo 地址：<https://codepen.io/airen/full/oNyzOYj>

这样做，“特色功能区”中的主内容列和缩略图列，能与其父网格（`.branding`）所对应的列完全匹配，列轨道大小、列间距等。这一切都要归功于子网格（`subgrid`）的功能。

在这个基础上，你还可以稍微加点内容，改变一下结构，就可以构建出一个 Landing Page 页的布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac78cb4075084d77bbb940fcd8dee964~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/abKBLGJ>

在前一个示例的“特色功能区域”下面新增一个“标题”、“列表”和“按钮”，你可以考虑用一个 `<div>` 来包裹它们：

```
<div class="landing">
    <div class="headline">...</div>
    
    <!-- 使用一个 div 将特色功能区域、新增的标题、列表和按钮包裹起来 -->
    <div class="featured--section">
        <div class="featured"><!-- 特色功色区域结构不变 --></div>
        <h3>新增标题</h3>
        <ul><!-- 新增列表 -->
            <li>
                <span>01</span>
                <p>列表内容</p>
            </li>
            <!-- 此处省略两个一样的 li -->    
        </ul>
        <button>新增按钮</button>
    </div>
    <div class="card">...</div>
</div>
```

在前面的基础上稍微调整了一下网格的定义：

- 在 `.landing` 上定义了一个四行五列（`4 x 5`）的网格，这是最外层的主网格，和前面示例相比，这里显式定义网格的行网格轨道的数量和尺寸。
- 将新增的 `.featured--section` 容器合并三列四行，同时将 `grid-template-rows` 和 `grid-template-columns` 定义为 `subgrid` ，让该子网格继承其父网格 `.landing` 的网格特性。
- 在 `.featured--section` 的 `.featured` 和 `ul` （列表）也是一个子网格，它们都跨越三列，继承父网格 `.featured--section` 网格轨道。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/772204318c0a42b4a9713087480ba30e~tplv-k3u1fbpfcp-zoom-1.image)

```
.landing {
    display: grid;

    /* 主（父）网格，创建一个四行五列的网格 */
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(4, auto);
    
    gap: 1rem;
}

/* 子网格 */
.featured--section {
    /* 合并三列四行 */
    grid-column: 2 / span 3;
    grid-row: 1 / span 4;
    
    display: inherit;
    
    /* 继承父网格 .landing 的网格轨道数量和尺寸 */
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;

    /* 重置子网格的行网格轨道之间间距，子网格的列网格之间间距继承父网格的列网格轨道的间距 */
    row-gap: 1rem;
}

.featured {
    grid-column: 1 / span 3;

    display: inherit;
    
    /* 继承父网格 .featured--section 的列网格轨道 */
    grid-template-columns: subgrid;
    
    /* 显式给子网格命名网格区域名称 */
    grid-template-areas: "content thumbnail thumbnail";
}

.featured__content {
    grid-area: content;
    align-self: center;
}

.featured__thumbnail {
    grid-area: thumbnail;
}

.featured--section > h3 {
    grid-column: 1 / span 3;
    grid-row: 2;
    place-self: center;
}


ul {
    grid-column: 1 / span 3;

    display: inherit;
     
     /* 继承父网格 .featured--section 的列网格轨道  */
    grid-template-columns: subgrid;
}

ul li {
    display: inherit;
    
    /* 创建嵌套网格，不会继承父网格任何特性，是一个独立的网格 */
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 2rem 1fr 2rem;
    gap: 10px;
}

ul span {
    grid-area: 1 / 2 / 4 / 3;
    place-self: center;
}

ul p {
    grid-area: 2 / 2 / 3 / 4;
    z-index: 2;
}

button {
  grid-column: 2;
}

.card {
  grid-column: 5;
}
```

注意，示例中列表项的布局效果是一种**交叉叠加**的布局，这里采用了嵌套网格来实现，如果你感兴趣的话，可以尝试使用子网格来实现。

在“特色功能区域”中还可以与 CSS 的多列布局结合在一起，构建类似一个简单的报刊类的布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7144d19abba44e079f220f0b33d466d8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/GRGNyVO>

实现上图布局效果，HTML 结构调整并不大：

```
<section class="branding">
    <div class="headline">...</div>
    <div class="featured">
        <h3 class="featured__title">特色功能区域:标题</h3>
        <figure class="featured__thumbnail">
            <img src="featured--thumbnail.jpg" alt="特色功能区域缩略图" />
        </figure>    
        <div class="featured__content"><!-- 内容区域 -->
           <blockquote>特色功能区域：描述文本</blockquote>
        </div>
    </div>
    <div class="card">...</div>
</section>
```

只是把 `.featured` 网格区域的名称和结构做了一下调整：

```
.featured {
    grid-column: 2 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    
    grid-template-areas: 
       "title   thumbnail thumbnail"
       "content content   content";
}

.featured__content {
    grid-area: content;
}

.featured__thumbnail {
    grid-area: thumbnail;
}

.featured__title {
    grid-area: title;
    place-self: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad4801c8b6324cf882d4dca6ad05fc24~tplv-k3u1fbpfcp-zoom-1.image)

示例中，在内容区域`.featured__content` 使用 CSS 多列布局中的 `column-count` 、`column-gap` 和 `column-rule` 将其分成三列布局：

```
.featured__content {
    column-count: 3;                   /* 设置列数 */
    column-gap: 1rem;                  /* 设置列间距 */
    column-rule: 1px dashed aliceblue; /* 设置列之间分隔线 */
}
```

## 图片墙

子网格用来构建图片墙也是很有用的，比如下图这样的布局，左侧有一个内容区域，它包含了一个标题和一段描述文本，右侧是九宫的图片展示区：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad67a745e17f409090f010d0f9631f54~tplv-k3u1fbpfcp-zoom-1.image)

上图仅是图片墙的一种排列网格，其实右侧你可以根据自己的需要，设计出不同的九宫格网格，甚至是比九宫格风格复杂繁多的宫格，比如下图这些延伸的风格：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6b9538a3e5b43cc9e3a50d6c39e67f6~tplv-k3u1fbpfcp-zoom-1.image)

当然，你可能会说，不使用子网格也可以构建出所期望的图片墙的布局效果。的确如此，不使用子网格，你需要创建一个复杂的网格。如果使用子网格，你更多的关注点是在右图宫格的布局上，而这种九宫格的布局风格，CSS 网格是有天然优势的。

构建上面展示的图片墙布局效果，所需要的 HTML 结构如下所示：

```
<div class="gallery"><!-- 父网格 -->
    <div class="gallery__content">
        <h3>Gallery Title</h3>
        <p>Gallery Describe</p>
    </div>
    <div class="gallery__photo"><!-- 子网格 -->
        <img src="gallery-photo.jpg" alt="图片" />
        <!-- 省略其他的 img -->
    </div>
</div>
```

设计师将整个图片墙组件分成六列，内图和图片各占三列。右侧的图片展示区是一个三列 `N` 行的网格（行数`N` 会随图片增加而自动增加，即创建隐式的行网格轨道）。在这个示例中，将右侧图片展示区`.gallery__photo` 定义为 `.gallery` 网格的子网格，并且继承父网格的列网格轨道特性。

有关于布局的 CSS 代码如下所示：

```
.gallery {
    display: grid;
    gap: 2rem;
    
    grid-template-columns: repeat(6, minmax(0, 1fr));
}

.gallery__content {
    grid-column: 1 / span 3;
    place-self: center;
}

.gallery__photo {
    grid-column: 4 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: minmax(auto, 180px);
    row-gap: 1rem;
    
    grid-auto-flow: dense;
}

.gallery__photo img:nth-child(1) {
    grid-row: 1;
    grid-column: 1 / span 2;
}

.gallery__photo img:nth-child(2) {
    grid-row: 2;
    grid-column: 1 / 2;
}

.gallery__photo img:nth-child(3) {
    grid-row: 2;
    grid-column: 2 / 3;
}

.gallery__photo img:nth-child(4) {
    grid-row: 1 / span 2;
    grid-column: 3 / 4;
}

.gallery__photo img:nth-child(5) {
    grid-row: 3 / 4;
    grid-column: 1 / span 3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fda3f46191f84215b81b3223b6b07d8e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/eYKggqV>

你可以尝试着将右侧九宫格替换成你自己希望要的风格。

## 交叉叠加布局

不知道你平时浏览 Web 页面或 Web 设计，有没有留意到，Web 页面元素相互交叉叠加的布局效果越来越频繁，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c2da1b3ec142b4823ee41d57b339b5~tplv-k3u1fbpfcp-zoom-1.image)

在还没有 CSS 网格布局技术之前，Web 开发者一般都是采用绝对定位来构建。虽然绝对定位可以实现上图中交叉叠加的布局效果，但缺乏灵活性和适配性，无法较好地适配更多的终端设备。不过，使用 CSS 网格布局，尤其是结合子网格特性，就显得要容易得多，而且适配性、灵活性都要比绝对定位强很多。

我们一起来看一个很有创意性的示例，这个示例是 [@Michelle Barker 在 Codepen 上写的](https://codepen.io/michellebarker/full/JjGNdNY)，我觉得很有创意，就拿来和大家一起探讨。示例的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cc1ca79ec2647ee8dac6fc5fb7a4b4a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/poKRPxz> 注意，上图这个效果是在 [@Michelle Barker](https://codepen.io/michellebarker/full/JjGNdNY)提供的案例上做了改良的 ！

基于卡片的 UI 是 Web 页同上常见的一种设计模式，但构建一个需要悬浮（`:hover`）或获得焦点（`:focus`）效果应用于整个卡片的 UI 并不常见。像上图这种交互效果，很多 Web 开发者往往会采用一种粗暴的策略，即在整个卡片的悬浮或获得焦点状态时，改变相应元素的 UI 效果：

```
.card:hover img,
.card:focus img {
    /* 卡片悬浮或获得焦点状态下改变 img 样式*/
}

.card:hover .card__content,
.card:focus .card__content {
    /* 卡片悬浮或获得焦点状态下改变 卡片内容样式 */
}
```

这种策略有一个显著的缺点，鼠标只要悬浮到卡片上（或只要卡片获得焦点），相应的图片和卡片内容样式就会发生改变。这种策略实现的效果是不符合 Web 设计师预期的。

因为 Web 设计预期的效果是 “鼠标悬浮到图片或卡片内容时，才改变相应的样式”（如上图所示）。为了达到这样的交互效果，我们添加了一个空的链接标签`<a>` ，并且使用其伪元素 `::before` 和 `::after`来生成一个空白区域，分别遮盖在卡片的图片和内容区域上面：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22a63f3a5d794cce86743b4fa9fc4739~tplv-k3u1fbpfcp-zoom-1.image)

```
.link:hover ~ img,
.link:focus ~ img {
     /* 链接悬浮或获得焦点状态下改变图片样式 */
}
.link:hover ~ .grid__card,
.link:focus ~ .grid__card {
    /* 链接悬浮或获得焦点状态下改变卡片内容样式 */
}
```

类似下图这样的一个效果就实现了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e991d1fbc883462da7e33a78fdda8065~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/shadeed/full/jOOwwpY/66e9c2039b50463d96a2a9832f05ec0f>

伪元素实现该交互效果的详细介绍并不是我们这个课程要介绍的重点，如果你对这种技术感兴趣，可以移步阅读 @Ahmad Shadeed的《[Uncommon Use Cases For Pseudo Elements](https://ishadeed.com/article/unusual-use-cases-pseudo-elements/)》，或早前我整理的一篇关于 CSS 伪元素的教程《[伪元素能帮我们做些什么？](https://www.w3cplus.com/css/use-case-pseudo-elements.html)》。

如今我们知道实现这种交互效果的技术方案了，但还需要一个更灵活的布局。以往一般采用的是绝对定位，将伪元素分别定位到图片和内容区域的上面。刚才提到过了，它是有缺陷的，很多时候我们并不知道输出的图片、内容区域大小。

庆幸的是，使用 CSS 网格布局，这一切就显得那么简单。你实现这个卡片，可能会需要一个像下面这样的 HTML 结构：

```
<div class="grid">
    <!-- 这个空链接标签很重要，实现交互效果我们需要用到它的伪元素，另外该标签一定要放在图片和卡片内容标签前面 -->
    <a href="" class="link"></a>
    
    <!-- 卡片上的缩略图 -->
    <div class="grid__img">
        <img src='https://picsum.photos/800?random=5' alt='卡片图片'>
    </div>
    
    <!-- 卡片上的内容 -->
    <div class="grid__card">
        <h2>卡片标题</h2>
        <p>卡片描述文本</p>
        
        <!-- 这是链接提示文案 -->
        <span class="fake-link">阅读更多<span>→</span></span>
  </div>
</div>
```

上面结构看上去很简单，但其中有一个细节尤其重要。添加了一个空的链接标签`<a>` ，它的位置必须放置在卡片图片 `.grid__img` 和 卡片内容 `.grid__card` 的前面。我们将使用 CSS 的相邻选择器（`E ~ F`）来选中它们：

```
.link:hover ~ .grid__img,
.link:focus ~ .grid__img {
    
}

.link:hover ~ .grid__card,
.link:focus ~ .grid__card {

}
```

简单地分析一下布局的策略。

- 将卡片容器 `.grid` 定义为一个三行三列的网格，将它的 `grid-template-columns` 和 `grid-tempate-rows` 属性的值都设置为 `repeat(3, minmax(0, 1fr))`。
- 使用 `grid-area` 属性，根据网格线名称，将图片 `.grid__img` 和 `.grid__card` 放置到相应的位置，比如图片放在卡片左上角，卡片内容放置在卡片右下角，两者在卡片正中间相互交叉与叠加。

```
body {
    display: grid;
  
    /* RAM 布局技术，实现卡片自动断行*/
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 3rem, 30rem), 1fr));
    gap: 2rem;
    align-content: start;
}

.grid {
    display: grid;
    
    /* 创建一个三行三列的网格 */
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
}

/* 将卡片上的缩略图放置到指定的位置 */
.grid__img {
    grid-area: 1 / 1 / 3 / 3;
}

/* 单双数卡片上缩略图位置刚好相反 */
.grid:nth-child(2n) .grid__img {
    grid-area: 2 / 2 / 4 / 4;
}

/* 将卡片上的内容放置到指定的位置 */
.grid__card {
    grid-area: 2 / 2 / 4 / 4;
}

/* 单双数卡片上的内容位置刚好相反 */
.grid:nth-child(2n) .grid__card {
    grid-area: 1 / 1 / 3 / 3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16edb28bda4c42ec83f9fe10af4b1ba7~tplv-k3u1fbpfcp-zoom-1.image)

我们需要将 `a.link` 的伪元素 `::before` 和 `::after` 分别遮盖在卡片的图片`.grid__img` 和 `.grid__card` 上面，为了位置和大小能和它们完全相匹配，采用子网格是较好的一种策略。我们需要做的是：

- `.link` 要和父网格一样的大，简单地说，合并三行三列，使用 `grid-area` 就可以轻易地实现，因为它也是父网格 `.grid` 的一个网格项目。
- 将 `.link` 也定义为一个网格，并且将它的 `grid-template-columns` 和 `grid-templage-rows` 都设置为 `subgrid` ，这样就完全继承父网格 `.grid` 的特性。
- 像放置卡片上的缩略图和内容一样，使用 `grid-area` 将链接`.link` 的伪元素 `.link::before` 、`.link::after` 放置到指定位置，它们的位置和卡片上缩略图和内容区域是相同的：

```
.link {
  grid-area: 1 / 1 / -1 / -1;

  display: inherit;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  z-index: 3;
}

.link::before {
  grid-area: 1 / 1 / 3 / 3;
}
.link::after {
  grid-area: 2 / 2 / 4 / 4;
}


.grid:nth-child(2n) .link::before {
  grid-area: 1 / 1 / 3 / 3;
}

.grid:nth-child(2n) .link::after {
  grid-area: 2 / 2 / 4 / 4;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a4a7a5fed434adcb214806ef1dfd7c9~tplv-k3u1fbpfcp-zoom-1.image)

由于卡片上的缩略图（`.grid__img`）、内容区域（`.grid__card`）、链接伪元素（`.link::before` 和 `.link::after`）会有一定区域的交叉和层叠：

- 内容区域（`.grid__card`）和缩略图（`.grid__img`）有一定交叉区域（网格线 `2 / 2 / 3 / 3` 围绕的区域），并且在 `z` 轴上，内容区域是高于缩略图的，因此要显式设置 `z-index` 的话，`.grid__card` 的 `z-index` 要大于 `.grid__img` 的。
- 链接伪元素 `.link::before` 和 `.link::after` 同样在网格线 `2 / 2 / 3 / 3` 围绕的区域相互交叉，并且在 `z` 轴上 `.link::after` 高于 `.link::before` 。
- 链接伪元素 `.link::before` 和 `.link::after` 分别与卡片缩略图 `.grid__img` 和内容区域 `.grid__card` 相互重叠。在该示例中，为了保证交互效果不出问题，需要确保 `.link::before` 和 `.link::after` 在 `z` 轴上高于 `.grid__img` 和 `.grid__card`。

在这个示例中，默认情况下（即，各个元素上未显式设置 `z-index` 值），`.link` 在 `z` 轴上层级低于 `.grid__img` 和 `.grid__card` ，这也造成 `.link::before` 和 `.link::after` 两个伪元素在 `z` 轴上也低于 `.grid__img` 和 `.grid__card` 。

而 `.grid__card` 在 `z` 轴上的层级是高于 `.grid__img` 。这是因为，在 CSS 中如果网格项目未显式设置 `z-index` 的值，它将按照元素在 HTML 文档源码中出现的顺序为参照值，越在后面出现，在 `z` 轴的层级越高。

为了避免卡片内容被缩略图遮盖，同时为了保证卡片上交互正常，我们可以给 `.link` 和 `.grid__content` 的 `z-index` 属性设置一个值：

```
.link {
    grid-area: 1 / 1 / -1 / -1;
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    
    z-index: 3; /* 确保该值大于 .grid__card 值*/
}

.grid__card {
    grid-area: 2 / 2 / 4 / 4;
    
    z-index: 2;
}
```

再来看一个运用 `subgrid` 布局的卡片组件：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5a8cfff72c34bdcbbd664a69de0476d~tplv-k3u1fbpfcp-zoom-1.image)

看上去很普通的一个卡片组件，但它有一个很显著的特征，图片的标注和卡片标题是对齐，并且主内容与图片之间有一定的空白间距：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91ea82684caa4552a2a4cec900cc0d24~tplv-k3u1fbpfcp-zoom-1.image)

你可能会说，CSS 实现上图这样的布局效果已经是非常容易的了。这样说并不错，但是在一定的结构限制之下，比如说，为了让 Web 可访问性做得更好一些，对屏幕阅读器更友好一些，构建上图的 HTML 结构可能会是下面这样：

```
<div class="card">
    <figure>
        <img src="thumb.jpg" alt="卡片缩略图" />
        <figcaption>图片标注</figcaption>
    </figure>
    
    <h3 class="title">卡片标题</h3>
    <p>卡片描述</p>
</div>
```

试想一下，不管你是准备使用 Flexbox 还是 Grid 来构建布局，要实现上图的效果是没有那么容易的。所以说，当 HTML 结构有一定的限制时，常用的 Web 布局技术要实现起来就显得没那么容易了。不过，使用 CSS 子网格来构建这种卡片布局，就容易很多了。

我们可以在卡片 `.card` 上像下面这样定义一个网格：

```
 .card { 
     display: grid; 
     grid-template-columns: 1fr 1fr 50px 50px 1fr 1fr; 
     grid-template-rows: repeat(3, min-content); 
     gap: 1rem 1.25rem; 
 }
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd058b67da34458b33595b31e2b40b7~tplv-k3u1fbpfcp-zoom-1.image)

同时 `figure` 跨五列两行：

```
 figure { 
     grid-row: 2 / span 2; 
     grid-column: 1 / span 5; 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9359f11102f48f79a3c9f3e934fc68c~tplv-k3u1fbpfcp-zoom-1.image)

此时，在 `figure` 上使用 `subgrid` ，并将 `img` 和 `figcaption` 按网格线放置到指定位置：

```
figure { 
    display: grid; 
    grid-template-rows: subgrid; 
    grid-template-columns: subgrid; 
} 

figure img { 
    grid-column: 1 / span 3; 
    grid-row: 1 / span 2; 
} 

figcaption { 
    grid-row: 2; 
    grid-column: 4 / span 2; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/853fe9fe141e49148d07375d531b2003~tplv-k3u1fbpfcp-zoom-1.image)

你最终看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cde0a86c6863420cb972207dc1bb1459~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/YzvZKxV>

## 百分百宽度的条纹布局

百分百宽度的条纹布局其实是 **Full-Bleed** 布局效果的延伸，它看起来像下面这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a229d20e4d943359897c304d489af44~tplv-k3u1fbpfcp-zoom-1.image)

上图这种布局效果也是 Web 布局中常见的一种，它有着自己的特色，比如有全屏的、距离左侧或右侧有一定空白空间的。

如果我们把整个布局分成三列，类似于 Full-Bleed 布局，左侧和右侧都是自适应的，主栏是固定宽度的。那么：

- 全屏就是跨越网格三列；
- 距离左侧有一定空白空间就是跨越两列，而且是从主栏起始到右侧栏结束位置；
- 距离右侧有一定空白空间就是跨越两列，而且从左侧栏起始到主栏结束位置。

使用 CSS 网格可以很容易实现 **Full-Bleed** 布局：

```
<div class="container">
  <h1>现代 Web 布局：使用 CSS 网格构建 Full-Bleed 布局</h1>
  <p>Meaning that a ...</p>
  <section class="full__bleed">
    <img src="https://picsum.photos/2568/600?random=1" width="2568" height="600" alt="" />
  </section>
  <p>Meaning that ...</p>
</div>
.container {
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

.container > * {
    grid-column: 2;
}

.container .full__bleed {
    grid-column: 1 / -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6d063337c2a49ec8eaf06df9110a258~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/vYrxErN>

我们只需要将上面的代码稍微调整一下，就可以基于子网格 `subgrid` 的功能来实现 Full-Bleed 布局。比如：

```
.container {
    --limit-max-container-width: 1024px;
    --limit-min-container-width: 320px;
    --gutter: 1rem;

    display: grid;
    grid-template-columns:
        [fullbleed-start] minmax(var(--gutter), 1fr)
        [main-start]
        minmax(
          min(var(--limit-min-container-width), 100% - var(--gutter) * 2),
          var(--limit-max-container-width)
        )
        [main-end]
        minmax(var(--gutter), 1fr)
        [fullbleed-end];
    row-gap: var(--gutter);
}

.container > * {
    grid-column: main;
    
    display: inherit;
    grid-template-columns: subgrid;
}

.container > * {
    grid-column: main;

    display: inherit;
    grid-template-columns: subgrid;
}

.full__bleed,
.full__bleed > * {
    grid-column: fullbleed;
}
```

示例中，在 `grid-template-columns` 定义网格轨道的时候，也显式给网格线命名。`.container` 容器中所有子元素都被定义为一个子网格，并且 `grid-template-columns` 设置为 `subgrid` 。我们都知道，子网格会继承父网格所有特性，你可以使用已命名好的网格线名称来放置网格项目：

- 除全宽（百分百宽度）的元素 `.full__bleed` 之外的其他元素都被放置在 `main-start / main-end` 列；
- 全宽（百分百宽度）的元素 `.full__bleed` 放置在 `fullbleed-start / fullbleed-end` 列。

加上 `.container` 所有子元素的 `display` 属性值设置为 `inherit` ，因此它们都是一个网格（是 `.container` 网格的子网格），所以它们的子元素，比如 `.full__bleed` 的子元素 `img` 也是网格项目。它们都是全宽，即 `fullbleed-start / fullbleed-end` 。

使用子网格和直接使用网格构建出来的 Full-Bleed 布局效果是一样的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10eff151fd6b4b148fe04ac06a03359d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/gOKmbQL>

有了这个基础，我们就可以来看子网格构建“百分百宽度的条纹布局”了。把 HTML 结构调整一下：

```
<div class="container">
  <h1>百分百宽度的条纹布局（Subgrid）</h1>
  <p>Meaning that a ...</p>
  <section class="full__bleed fullwidth">
    <img src="" width="2568" height="600" alt="" />
  </section>
  <p>Meaning that ...</p>
  <section class="full__bleed left">
    <img src="" width="2568" height="600" alt="" />
  </section>
  <p>Meaning that ...</p>
  <section class="full__bleed right">
    <img src="" width="2568" height="600" alt="" />
  </section>
  <p>Meaning that ...</p>
</div>
```

我们可以像下图这样来定义网格：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bd27b363f8644eda92ddcb51cac7004~tplv-k3u1fbpfcp-zoom-1.image)

正如你所看到的：

- 网格第一列和最后一列是一个较小的空白间距，相当于间距一样，比如说 `1rem`；
- 网格第二列和第四列是相等的，占用容器的可用空间，可以使用 `fr` 单位值来定义，我们这里设置为 `minmax(0, 1fr)`；
- 网格第三列（中间列），它是用来放置居中内容的一列，为了更好地适配不同终端的浏览器屏幕的尺寸，可以将 `minmax()` 和 `min()` 函数结合起来使用，比如 `minmax(min(var(--limit-min-container-width), 100% - var(--gutter) * 2),var(--limit-max-container-width))`

具体代码如下：

```
.container {
    --limit-max-container-width: 960px;
    --limit-min-container-width: 320px;
    --gutter: 1rem;
​
    display: grid;
    grid-template-columns:
        [fullwidth-start]
        var(--gutter)
        [left-start]
        minmax(0, 1fr)
        [main-start right-start]
        minmax(
          min(var(--limit-min-container-width), 100% - var(--gutter) * 2),
          var(--limit-max-container-width)
        )
        [main-end left-end]
        minmax(0, 1fr)
        [right-end]
        var(--gutter)
        [fullwidth-end];
  row-gap: var(--gutter);
}
```

和实现 Full-Bleed 布局示例一样，把网格容器 `.container` 的所有子元素（所有网格项目）设置为子网格，并且显式设置 `grid-template-columns` 的值为 `subgrid` ：

```
.container > * {
    display: inherit;
    grid-template-columns: subgrid;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1b343aaef8943f4a45949c7d3df1f64~tplv-k3u1fbpfcp-zoom-1.image)

这样，你就可以使用网格线名称，将网格项目放置到相应的位置，完成最终所需要的布局效果：

```
.container > *:not(.full__bleed) {
    grid-column: main;
}
​
.full__bleed.fullwidth {
    grid-column: fullwidth;
}
​
.fullwidth img {
    grid-column: fullwidth;
}
​
.fullwidth figcaption {
    grid-column: main;
    justify-self: center;
}
​
.full__bleed.left {
    grid-column: left;
}
​
.left > img {
    grid-column: left;
}
​
.left > figcaption {
    grid-column: main;
    justify-self: end;
}
​
.full__bleed.right {
    grid-column: right;
}
​
.right > img {
    grid-column: right;
}
​
.right > figcaption {
    grid-column: main;
}
```

最终效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/721b53c9f1034ce984799df277ae29d3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZEReYVq>

注意，你也可以在上面示例基础上进一步加工，实现下图这样的布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ce60203dffd4b78ba92f17f55352ed8~tplv-k3u1fbpfcp-zoom-1.image)

就当上图是个小作业，感兴趣的同学不妨试一试，看看你能用多少种布局方案实现上图的布局效果。

## 时间轴（Timeline）组件

时间轴卡片组件也是 Web 中常见的一种设计，我们可以在上面的“百分百宽度的条纹布局”技术方案的基础上来构建时间轴卡片组件。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05ed74596f6d4812be9a29d6018f3948~tplv-k3u1fbpfcp-zoom-1.image)

使用网格和子网格，再借助 CSS 媒体查询，你就可以很轻易构建出上图所示的时间轴卡片组件。

- 当浏览器视窗宽度大于 `768px` ，卡片在时间轴上是错开排列的，单数居右，双数居中；
- 当浏览器视窗宽度小于 `768px` ，卡片在块轴方向垂直排列。

另外，每张卡片的数字指示器，都能和卡片的标题垂直对齐：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24e5367e137b47e2bdcc4818a269ad01~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/KKeWVNq>

上图所示的时间轴卡片组件所需的 HTML 的结构可能会像下面这样：

```
<div class="timeline">
    <!-- 卡片容器 -->
    <div class="card--wrapper">
        <!-- 每张卡片的 HTML 结构 -->
        <div class="card">
            <h3 class="title">卡片标题</h3>
            <div class="card__content">
                <p>卡片描述内容</p>
            </div>
            <!-- 卡片脚部 -->
            <blockquote>
                <svg viewBox="0 0 512 512" width="80" title="quote-left" class="quote-icon">
                  <path d="M46..." fill="currentColor" />
                </svg>
                <p>Dolor ce...</p>
            </blockquote>
        </div>
    </div>
    <!-- 省略其他卡片的 HTML 结构 -->
</div>
```

对于构建上图这样的响应式时间轴卡片组件，我们遵循**移动端先行**的原则，即：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0b18e99b46a41ea86b7a13f767bc876~tplv-k3u1fbpfcp-zoom-1.image)

你已经看到了，时间轴卡片组件的**轴和卡片的数字指示器**都在卡片的左侧，这样一来：

- 轴和卡片的数字指示器都在第一列；
- 卡片在第二列。

所以，我们可以在 `.timeline` 中创建一个两列网格，第一列是用来放置轴和卡片数字指示器的，你可以考虑设定，比如 `4rem` ，第二列可以把网格的可用空间（除第一列和列间距之外的空间）都留给卡片，可以设置 `1fr` ：

```
.timeline {
    display: grid;
    grid-template-columns: minmax(4rem, max-content) 1fr;
    gap: 2rem 4px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19582dcd1e8e4bc7978fc1365c8059e7~tplv-k3u1fbpfcp-zoom-1.image)

按照网格项目放置的方法，将时间轴和卡片放置到指定的位置：

```
.timeline::before {
    grid-column: 1 / 2;
}

.card--wrapper {
    grid-column: 1 / 3;
}
```

注意，示例中的轴线（上图中的“白色竖条”）使用了 `.timeline` 的伪元素 `::before` 绘制的，为了让 HTML 结构更简洁以及少嵌套一层子网格，对于时间轴的轴线采用了绝对定位，看上去就像是跨越了网格 `.timeline` 的所有行：

```
.timeline::before {
    /* 将时间轴线放置在 timeline 网格的第一列中 */
    grid-column: 1 / 2;
    
    /* 绘制时间轴线 */
    content: "";
    width: 10px;
    background-color: #fff;
    border-radius: 5px;
    
    /* 采用绝对定位，让时间轴线跨越 timeline 网格的所有行, 并采用绝对定位，让其水平居中 */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
```

不难发现，每张卡片都有两个部分组成，即**卡片数字指示器**和**卡片自身**， 而且卡片数字指示器也是放在第一列，和时间轴线重叠在一起。所以，我们可以将 `.card--wrapper` 也定义为一个网格，并且继承其父网格 `.timeline` 的列网格轨道数量和尺寸，即设置 `grid-template-columns` 的值为 `subgrid` ：

```
.card--wrapper {
    grid-column: 1 / 3;
​
    display: inherit;
    grid-template-columns: subgrid;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/169386e8a3ad47be9e6b00bf742e01d8~tplv-k3u1fbpfcp-zoom-1.image)

这样你就可以使用网格线，将卡片数字指示器 `.card--wrapper::before` 和卡片 `.card` 放置到指定的位置：

```
.card--wrapper::before {
    grid-column: 1 / 2;
}
​
.card {
    grid-column: 2;
    grid-row: span 3;
}
```

> 特别声明，示例中的卡片数字指示器使用的是 CSS 的计算数器相关特性 `counter-reset` 、`counter-increment` 、`counter()` 和 CSS 伪元素自动生成的。这方面的内容已超出我们这个小册介绍的范围，感兴趣的同学请查阅示例相关源码！

为了让卡片计数器能和卡片标题始终保持垂直对齐，还需要进一步将 `.card` 也定义为子网格，并且需要将它的 `grid-template-rows` 设置为 `subgrid` ：

```
.card--wrapper::before {
    grid-column: 1 / 2;
    align-self: center;
}

.card {
    grid-column: 2;
    grid-row: span 3;
  
    display: inherit;
    grid-template-rows: subgrid;
}
```

离目标越来越近了，只需要使用媒体查询 `@media` 在浏览器视窗宽度大于 `768px` 的条件下，重新定义父网格 `.timelne` 的列网格轨道的数量和尺寸，并且调整卡时间轴线、卡片数字指示器和卡片的位置，就可以完成最终想要的效果：

```
@media only screen and (min-width: 768px) {
    /* 将网格列调整为三列 */
    .timeline {
        grid-template-columns: 1fr minmax(4rem, max-content) 1fr;
    }

    /* 时间轴线放置在第二列中 */
    .timeline::before {
        grid-column: 2 / 3;
    }

    /* 奇数卡片容器从第二列开始，并且跨越两列 */
    .card--wrapper:nth-of-type(2n + 1) {
        grid-column: 2 / span 2;
    }

    /* 偶数卡片容器从第一列开始，也跨越两列 */
    .card--wrapper:nth-of-type(2n) {
        grid-column: 1 / span 2;
    }
    
    /* 偶数卡片放置在第一列 */
    .card--wrapper:nth-of-type(2n) .card {
        grid-column: 1;
        grid-row: 1 / span 3;
    
        /* 偶数卡片其他样式的微调整 */
        filter: drop-shadow(-6px 6px 0px black);
        margin-left: 0;
        margin-right: 0.8rem;
    }

    /* 调整偶数卡片三角指向标的位置 */
    .card--wrapper:nth-of-type(2n) .title::after {
        right: auto;
        left: calc(100% - 15px);
        transform: translateY(-50%) rotate(-135deg);
    }

    /* 调整偶数卡片数字指示器位置 */
    .card--wrapper:nth-of-type(2n)::before {
        grid-column: 2 / 3;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2103dcd6f9f64f5db52bdd6062442254~tplv-k3u1fbpfcp-zoom-1.image)

## 表单布局

表单是 Web 中不可或缺的部分，因为 Web 需要用表单来和用户进行交流，所以将表单布局设计的好就显得尤为重要。比如下面这个登录表单：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c20e8654d3347d88d1e8924b09f0663~tplv-k3u1fbpfcp-zoom-1.image)

这是一个具有响应式能力的登录表单。暂且抛开其 UI 不谈，就只聊表单控件。在移动端上，布局相对较为简单，表单控件的标签 `<label>` 、表单控件（比如 `<input>`）、验证信息等都是垂直排列的。平板和桌面端，由于空间变大，更好地利用水平方向的空间，会把垂直排列的布局，调整为水平排列的布局，即 表单控件标签居左，表单控件和验证信息居右，甚至有的元素占两列，比如上图中的“登录按钮”。

另外，大多数构建表单一般会采用下面这样的 HTML 结构：

```
<form>
    <div class="control">
        <label for="id--name">标签名</label>
        <input type="text" id="id--name" name="user-name" placeholder="用户名" />
        <p class="control__help">验证信息</p>
    </div>
</form>
```

就上面的 HTML 的结构而言，要实现水平排列的布局是有难度的。即使是没有验证信息这一项，使用 Flexbox 布局也有一定的局限性，尤其是控件标签字数不同，你不得不在标签上 `label` 设置一个 `min-width` 值。

要是使用 CSS 网格来构建的话，就会方便很多，也不用担心标签控件字数，以及有没有其他的辅助元素，因为我们可以使用网格线名称，将元素放置到任意我们想要放置的位置。

接下来，就以上图为例，一起来看看怎么使用 CSS 网格和子网格实现所需要的表单布局。先来看 HTML 结构：

```
<div class="form--wrapper">
    <div class="form">
        <form>
            <h3>登录</h3>
            <div class="control">
                <label for="user--name">昵称：</label>
                <input type="text" placeholder="请输入用户 ID" name="user-name" id="user--name" />
                <p>用户 ID 不存在</p>
            </div>
            <div class="control">
                <label for="user--password">密码：</label>
                <input type="password" placeholder="请输入登录密码" name="user-password" id="user--password" />
                <p>密码输入错误</p>
            </div>
            <div class="control">
                <label for="remember">
                    <input type="checkbox" id="remember" name="remember">
                    请记住我!
                </label>  
            </div>
            <div class="control">
                <button>登录</button>
            </div>
            <div class="control">
                <label>没有账号？<a href="">点击我注册</a></label>
            </div>
        </form>
        <figure>
            <img src="" alt="封面图" />
        </figure>    
    </div>
</div>
```

简单地分析一下，基于上面这个 HTML 结构，构建上图表单布局，可能会定义的网格有：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17c33b5d1f0747a29e0d57e418e8260d~tplv-k3u1fbpfcp-zoom-1.image)

- `body` 定义一个网格，主要用于整体的页面布局，构建一个 Full-Bleed 布局；
- `.form--wrapper` 定义一个网格，是构建表单 UI 主体布局，也是主网格；
- `.form` 是 `.form--wrapper` 的一个子网格，用于控制 `form` 和 `figure` 以及 `.form::before` 和 `.form::after` 四个网格项目的位置；
- `form` 重新定义一个网格，用于表单元素上的布局；
- `.control` 是 `form` 网格的子网格，控制表单标签、表单控件、验证信息等位置。

接下来简单介绍一个涉及到布局的 CSS 代码。

```
body {
    display: grid;
    grid-template-columns: 
        minmax(1rem, 1fr) 
        minmax(min(100% - 2rem, 1134px), 1fr) 
        minmax(1rem,1fr);
}
```

这段代码就不多说了，前面出现很多次了，即 Full-Bleed 布局代码。

```
.form--wrapper {
    grid-column: 2 / 3;

    display: inherit;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, auto);
}

.form {
    grid-area: 1 / 1 / -1 / -1;
    margin: clamp(1rem, 2vw + 1.5rem, 3rem);
    z-index: 2;

    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;

    justify-items: center;
}
```

`.form` 网格是 `.form--wrapper` 网格的子网格，它继承了其父网格所有参数：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6234181631c54978acb6c62a0cfad323~tplv-k3u1fbpfcp-zoom-1.image)

在移动端下，网格项目都层叠在一起，如上图所示，整个表单 `<form>` 堆叠在图片 `<figure>` 之上。这在网格布局中是很容易就能做到的：

```
.form > * {
    grid-area: 1 / 1 / -1 / -1;
}

.form::before,
.form::after {
    grid-area: 1 / 1 / -1 / -1;
}
```

在平板和桌面端时，使用 CSS 媒体查询特性来调整 `.form` 网格的列轨道，并且将 `<form>` 和 `<figure>` 位置调整为水平排列，不再是堆叠在一起了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfae34b4f659486899e2d44f81decef3~tplv-k3u1fbpfcp-zoom-1.image)

```
@media only screen and (min-width: 768px) {
    .form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
​
    .form figure {
        grid-column: 1 / 2;
    }
​
    .form::before,
    .form::after {
        grid-column: 1 / 2;
    }
​
    .form > form {
        grid-column: 2 / 3;
    }
}
```

使用同样的方法，分别将 `form` 和 `.control` 定义为网格。注意，这里的 `form` 网格只是 `.from` 网格的嵌套网格，它们是两个相互独立的网格，但 `.control` 网格却是 `form` 网格的子网格：

```
form {
    display: inherit;
    grid-template-columns: max-content 1fr;
    gap: 1rem;
}
​
.control {
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    gap: 0.25rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/891e6f508d5c42b59da552323a608339~tplv-k3u1fbpfcp-zoom-1.image)

根据网格线，将网格项目放置到指定位置：

```
form > * {
    grid-column: span 2;
}
​
.control > * {
    grid-column: 1 / -1;
}
​
.control:nth-last-child(-n + 3) {
    grid-row: span 1;
}
```

在桌面端时，调整相关的位置：

```
@media only screen and (min-width: 1024px) {
    .control {
        grid-row: span 2;
    }
​
    .control > label {
        grid-column: 1;
        justify-self: end;
    }
​
    .control > input {
        grid-column: 2;
    }
​
    .control > p {
        grid-row: 2;
        grid-column: 2;
    }
​
    .control:nth-last-child(3) > label,
    .control:last-child > label {
        grid-column: 1 / -1;
        justify-self: start;
    }
​
    form h3 {
        justify-self: start;
    }
}
```

最终示例用到的布局代码：

```
body {
    display: grid;
    grid-template-columns: 
        minmax(1rem, 1fr) 
        minmax(min(100% - 2rem, 1134px), 1fr) 
        minmax(1rem,1fr);
}
​
.form--wrapper {
    grid-column: 2 / 3;
​
    display: inherit;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, auto);
}
​
.form--wrapper::before {
    grid-area: 1 / 3 / 2 / 4;
}
​
.form--wrapper::after {
    grid-area: 3 / 1 / 4 / 3;
    align-self: end;
}
​
.form {
    grid-area: 1 / 1 / -1 / -1;
    margin: clamp(1rem, 2vw + 1.5rem, 3rem);
    z-index: 2;
​
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
​
    justify-items: center;
}
​
.form > * {
    grid-area: 1 / 1 / -1 / -1;
}
​
.form::before,
.form::after {
    grid-area: 1 / 1 / -1 / -1;
}
​
form {
    width: 100%;
    z-index: 3;
    padding: clamp(1rem, 2vw + 1.5rem, 3rem);
}
​
figure {
    z-index: 1;
}
​
.form::before {
    z-index: 2;
}
​
form {
    display: inherit;
    place-content: center;
    grid-template-columns: max-content 1fr;
    gap: 1rem;
}
​
form > * {
    grid-column: span 2;
}
​
form h3 {
    justify-self: center;
    margin-bottom: 2rem;
}
​
.control {
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    gap: 0.25rem;
    align-items: center;
}
​
.control > * {
    grid-column: 1 / -1;
}
​
.control:nth-last-child(-n + 3) {
    grid-row: span 1;
}
​
@media only screen and (min-width: 768px) {
    .form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
​
    .form figure {
        grid-column: 1 / 2;
    }
​
    .form::before,
    .form::after {
        grid-column: 1 / 2;
    }
​
    .form > form {
        grid-column: 2 / 3;
        color: #333;
        text-shadow: none;
    }
    .control p {
        text-shadow: none;
    }
}
​
@media only screen and (min-width: 1024px) {
    .control {
        grid-row: span 2;
    }
​
    .control > label {
        grid-column: 1;
        justify-self: end;
    }
​
    .control > input {
        grid-column: 2;
    }
​
    .control > p {
        grid-row: 2;
        grid-column: 2;
    }
​
    .control:nth-last-child(3) > label,
    .control:last-child > label {
        grid-column: 1 / -1;
        justify-self: start;
    }
​
    form h3 {
        justify-self: start;
    }
}
```

最终的效果如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92984e5b70f54a61a92242f9278811b2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/LYrWMwP>

## 小结

上面提到的示例只是使用子网格布局的几个常见的案例，事实上在 Web 布局中还有很多潜在的用例可以使用子网格来构建。简单地说，**CSS 子网格将打开许多以前不可能的可能性**。正如上面示例所展示的一样，在 CSS 子网格布局的基础上，你只需要添加一点点媒体查询的代码，就可以构建出适配更多终端平台的布局。

事实上，除了子网格和媒体查询结合之外，我们还可以使用容器查询和子网格一起来构建出组件式响应的布局。你将会感觉到，CSS 怎么能这么容易就实现了响应式布局。有关于这方面更详细的介绍，我们将在响应式布局的课程中与大家探讨。

心动不如行动，最后给大家布置一个小作业，请使用 CSS 子网格构建下图中天气组件的布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afff8ca9c9ec4cde8820b8a9250726cc~tplv-k3u1fbpfcp-zoom-1.image)
