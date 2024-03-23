import{_ as l,M as r,p as a,q as c,R as e,t as i,N as n,a1 as s}from"./framework-e8cb8151.js";const t={},o=s(`<h1 id="_16-网格布局中的子网格和嵌套网格" tabindex="-1"><a class="header-anchor" href="#_16-网格布局中的子网格和嵌套网格" aria-hidden="true">#</a> 16-网格布局中的子网格和嵌套网格</h1><p>就网格布局而言，自诞生之日起，就是为二维布局和优化布局系统而设计，Web 设计师和开发人员也为此感到兴奋。通过前面课程的学习，我想你已经领略到了网格布局的魅力，<strong>网格布局让你可以轻松地做许多以前做不到的事情</strong> 。</p><p>尽管 CSS 网格是对 CSS 最伟大的补充之一，但它缺少一个重要的东西，<strong>元素无法从其父元素中继承列或行</strong>。也就是说，<strong>嵌套网格不能继承其父网格的特性</strong> 。但 CSS 的子网格可以做到这一点，而且该特性一直以来都被认为是一个很重要的功能。</p><p>一段时间以来，关于子网格（<code>subgrid</code> )的使用情况、如何实现它的问题有很多讨论，甚至还有一些关于是否需要它的辩论。很多观点是期望使用 “<strong>嵌套网格</strong> ” 和 “<strong><code>display:contents</code></strong> ”来替代子网格（<code>subgrid</code>）。</p><p>在本文中，我将花一些篇幅来阐述嵌套网格和子网格，我将尝试强调子网格预期要解决的问题、它的工作方式以及它的一些潜在用例。 对于 <code>display: contents</code> ，在后面的课程中将会以一个节的篇幅来向大家介绍。</p><p>那我们先从嵌套网格开始。</p><h2 id="嵌套网格" tabindex="-1"><a class="header-anchor" href="#嵌套网格" aria-hidden="true">#</a> 嵌套网格</h2><p>如果你是一名经历过早期表格布局的 Web 开发者，那么对于嵌套网格就比较好理解。在 Web 布局技术匮乏的年代，要实现一个复杂的 Web 布局，往往需要在一个表格中嵌套一个或多个表格，比如下面这个 Web 页面：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fde83deb3c1d4cc3bb25c762f90d7419~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图中是一张 2003 年的 Web 页面，这张 Web 页面对于现在而言并不复杂，但在当初那个年代只能使用表格（HTML的 <code>&lt;table&gt;</code>）构建布局时，算是复杂的了，尤其是右侧的导航部分。因此使用了表格嵌套表格的技术来实现。</p><p>不知道大家是否还有印象，在介绍 Flexbox 布局时，我们有介绍过，在 Flexbox 布局中，任何一个 Flex 项目只要将 <code>display</code> 的值设置为 <code>flex</code> 或 <code>inline-flex</code> ，它自身既是一个 Flex 项目，也是它的子元素的 Flex 容器。也可以说是 Flex 容器嵌套了一个 Flex 容器。</p><p>我们要聊的嵌套网格和表格嵌套以及 Flex 容器嵌套是相似的。<strong>如果你在网格项目显式设置了</strong> <strong><code>display</code></strong> <strong>属性的值为</strong> <strong><code>grid</code></strong> <strong>或</strong> <strong><code>inline-grid</code></strong> <strong>，那么该网格项目既是其父元素（网格容器）的一个网格项目了，同时也是其子元素的网格容器</strong> 。如此一此，就实现了<strong>网格嵌套网格</strong> ，也就是我们所说的<strong>嵌套网格</strong> 。</p><p>比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- Flex 容器嵌套 Flex 容器 --&gt;
&lt;div class=&quot;flex__container--parent&quot;&gt;
    &lt;div class=&quot;flex__item&quot;&gt;Flex 项目&lt;/div&gt;
    &lt;div class=&quot;flex__item flex__container--subflex&quot;&gt;&lt;!-- 既是 Flex 容器，也是 Flex 项目 --&gt;
        &lt;div class=&quot;flex__item&quot;&gt;Flex 项目&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Grid 嵌套 Grid --&gt;
&lt;div class=&quot;grid__container--parent&quot;&gt;
    &lt;div class=&quot;grid__item&quot;&gt;Grid 项目&lt;/div&gt;
    &lt;div class=&quot;grid__item grid__container--subgrid&quot;&gt;&lt;!-- 既是 Grid 容器，也是 Grid 项目 --&gt;
        &lt;div class=&quot;grid__item&quot;&gt;Grid 项目&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.flex__container--parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果用 DOM 树来描述的话，它们的关系如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b184c3b4c5d34e778c0f6ee841dbf32b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们来看一个嵌套网格的真实示例：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container parent&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;item subgrid&quot;&gt;
        &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 创建父网格容器 */ 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bd105840b3e4367a4663ef3d7645b06~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,21),u={href:"https://codepen.io/airen/full/MWXyqmW",target:"_blank",rel:"noopener noreferrer"},v=s(`<p>示例中，元素 <code>.parent</code> 和 <code>.subgrid</code> 都是一个网格容器，其中 <code>.subgrid</code> 元素的 <code>display</code> 属性继承其父元素 <code>.parent</code> 的 <code>display</code> 值，即 <code>grid</code> 。并且在 <code>.parent</code> 元素上设置了 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性，显式定义了网格轨道的数量和尺寸，即 <code>.parent</code> 是一个四行五列（<code>4 x 5</code>）的网格。如此一来，<code>.parent</code> 元素就具备了网格该有的特性，比如网格线名称、网格轨道尺寸等。</p><p>与此同时，在网格项目三上使用 <code>grid-row</code> 和 <code>grid-column</code> 将其放置在了 <code>2 / 2 / 4 / 5</code> 网格线围绕的一个区域（合并了三列两行）。除此之外，该元素（<code>.subgrid</code>）也显式设置了 <code>display</code> 、<code>grid-tempalte-columns</code> 、<code>grid-template-rows</code> 和 <code>gap</code> 属性，并且都继承其父元素的相应属性的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.subgrid {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以 <code>.subgrid</code> 也是一个四行五列（<code>4 x 5</code>）的网格。即：<code>.parent</code> 网格中嵌套了一个 <code>.subgrid</code> 网格，并且两个网格的特性是相同的：相同数量的网格轨道（行网格轨道和列网格轨道）、相同单位值的网格尺寸和相同的网格线名称以及相同的网格轨道间距。</p><p>正如上图中所示，草绿色网格线构建的是父网格（即 <code>.parent</code> 元素），褐色网格线构建的是子网格（即 <code>.subgrid</code> 元素），这两个网格是相互嵌套的关系。</p><p>虽然 <code>.subgrid</code> 子网格继承了其父网格 <code>.parent</code> 所有属性的值，但并不代表着它们是完全两个相同的网格。或者简单地说，<strong>嵌套的两个网格都有自己独立的网格系统</strong> ，比如网格轨道尺寸、网格线编号等。换句话说，你可以在两个网格容器上显式设置 <code>grid-template-*</code> 和 <code>grid-auto-*</code> 以及 <code>gap</code> 等属性的值，它们可以设置完全相同的值（比如上面这个示例），也可以是完全不同的值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46c5c1feb11b4347896b20610e3830af~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),m={href:"https://codepen.io/airen/full/QWxNZqE",target:"_blank",rel:"noopener noreferrer"},p=s(`<p>从上面的示例中，不难发现嵌套网格布局的缺陷。<strong>嵌套网格是独立于父网格和相互之间的</strong> ，即 <strong>嵌套网格是独立的一个网格，但又是父网格的的一个网格项目</strong>。这也意味着嵌套网格不会从父网格中获取它们的轨道尺寸，这使得嵌套网格项目与父网格的排列更加困难。</p><p>嵌套网格内所做的更改不会涉及父级容器，因此，在布局时需要考虑两个独立的网格，出错率就更大，维护更难，效率也变得更低。 嵌套网格还存在的一个问题就是它的灵活性，在响应式设计中会产生一个问题，即里面的元素溢出了网格容器元素的边界之外。</p><h2 id="嵌套网格的痛楚" tabindex="-1"><a class="header-anchor" href="#嵌套网格的痛楚" aria-hidden="true">#</a> 嵌套网格的痛楚</h2><p>上面用了两个简单的示例向你展示了什么是 <strong>嵌套网格</strong> ，你也知道了嵌套网格的缺陷。当使用 CSS 网格来构建 Web 布局时，你已经可以使用嵌套网格了。但因为嵌套网格自身不可避免的缺陷，往往会给使用带来诸多的麻烦，比如你需要花时间去计算子网格轨道尺寸大小，而且你可能要不断地去计算。另外，随着嵌套的层级越深，维护起来就越困难。</p><p>比如，你有下面这样的一个 Web 布局，它是一个 <code>12</code> 列网格，其中父网格中分成 <code>A</code> 和 <code>B</code> 相等的两列；但是 <code>B</code> 列里又包含了个子网格，它被为 <code>B1</code> 和 <code>B2</code> 两列，而且 <code>B2</code> 列的宽度是 <code>B1</code> 列的两倍：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8a55fa023794d0e91c35d0b1dcfba31~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用嵌套网格很容易就能实现：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;parent--grid&quot;&gt;
    &lt;div class=&quot;item item--a&quot;&gt;A&lt;/div&gt;
    &lt;div class=&quot;sub--grid item--b item&quot;&gt;
        &lt;div class=&quot;item&quot;&gt;B1&lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;B2&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent--grid {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当父网格（<code>.parent--grid</code>）和子网格（<code>.sub--grid</code>）的列网格轨道比率是相同时，那么这个嵌套网格是完美的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f679aaba81748a7a5fee665868da53f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),b={href:"https://codepen.io/airen/full/XWYKpdP",target:"_blank",rel:"noopener noreferrer"},g=s(`<p>它还可以进一步优化，父网格是两列，你可以将 <code>grid-template-columns</code> 设置为 <code>repeat(2, minmax(0, 1fr))</code> ，实现真正的两列列宽相等的效果。同时将子网格的 <code>grid-template-columns</code> 属性的值设置为 <code>1fr 2fr</code> ，实现 <code>B2</code> 列的列宽是 <code>B1</code> 列的列宽的两倍：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent--grid {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现的效果是相同的，也算是完美的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b16807a1c184fe1b49d66978b491118~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),f={href:"https://codepen.io/airen/full/NWzrdYw",target:"_blank",rel:"noopener noreferrer"},h=s('<p>看上去似乎是完美的，事实上你看到的是一种假象。你可以尝试着往里面填充真实的内容， <code>B1</code> 和 <code>B2</code> 计算出来的列网格轨道尺寸就有可能会小于其 <code>min-content</code> 尺寸。这个时候，子网格中网格项目的内容就会溢出网格容器，也将打破 Web 布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6cef0eec3984e97b6481a7aa0a2b44b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>即使你在网格项目上显式设置了 <code>min-width</code> 的值为 <code>0</code> ，避免网格轨道尺寸小于网格项内容的最小尺寸（<code>min-content</code>），同样会造成内容溢出网格项目：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e06dc16cb7ea4e4e84b59aff0fbf2218~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>因为 Web 的内容是动态的，你无法掌握输出的内容是什么？</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21cf53f855ac4ada9d25ecbff440844d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',6),_={href:"https://codepen.io/airen/full/RwJRKEo",target:"_blank",rel:"noopener noreferrer"},S=s('<p>你已经看到了由于内容的不同，子网格的 <code>B2</code> 列是 <code>B1</code> 两倍宽已不存在了，即使在网格项目上设置 <code>min-width</code> 为 <code>0</code> ，网格轨道尺寸符合要求（ <code>B2</code> 列是 <code>B1</code> 两倍宽），内容也会溢出，布局效果也不再完美。</p><p>就这个示例而言，父网格和子网格的网格轨道尺寸的比率刚好相匹配，它们的网格轨道看上去重叠在一起（有点像是子网格继承了父网格的网格轨道），但很多时候构建的嵌套网格，父网格轨道和子网格轨道尺寸不是这么相匹配的，比如上面示例，将子网格的 <code>grid-template-colums</code> 设置为 <code>3fr 5fr</code> ，这个时候，子网格轨道和父网格轨道就不怎么相互匹配了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04537f9c24de4210bd402b38735a0bf8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',3),x={href:"https://codepen.io/airen/full/ZEROeZQ",target:"_blank",rel:"noopener noreferrer"},k=s(`<p>嵌套网格的网格轨道与父网格的网格轨道没有关系。这意味着，如果我们想要将嵌套网格的轨道与外部网格（父网格）的轨道对齐，就必须使用计算轨道大小的方法来确保所有轨道保持相等（父网格轨道比例相匹配）。在上面的例子中，内外两个网格的网格轨道看起来是对齐的，直到一个较大尺寸的项目（比如 <code>B2</code> ）被添加到网格的一个单元格中(其使用更多的空间)。</p><p>对于列，相对而言还可以通过计算或限制网格的灵活性来避免上述情况。比如将 <code>1fr</code> 换成 <code>minmax(0, 1fr)</code> ，或者在网格项目上显式设置 <code>min-width: 0</code> ，以便在进行空间分配时忽略网格项目大小。甚至你还可以将网格轨道尺寸使用百分比来描述，只是这样的计算更为复杂。要是这样做，这就失去了使用网格的一些好处。另外，当涉及到嵌套网格行排列时，上面示例中提到的方法就不起作用了。</p><p>比如，拿卡片排列为例，父网格（外网格）是一个可以断行排列的网格，使用前面介绍的 RAM 布局技术（即 <code>repeat()</code> 、<code>auto-fill</code> 或 <code>auto-fit</code> 、<code>minmax()</code> ）就可以实现。</p><p>假设每张卡片都由“标题”，“缩略图”，“描述内容”和“页脚” 组成，并且还希望每张卡片的“标题”和“页脚”都能对齐。对于每张卡片的布局，你可能也想使用一个网格来构建（一列多行的网格）。即使是使用了嵌套网格构建，但也无法达到预期的效果（每张卡生标题和页面脚对齐），即 <strong>只要子网格中任何一网格项目（行网格轨道中的网格项目）内容不同，它们就无法对齐</strong> 。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29ec74472e5f45ad96ebe078e16e9a79~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),y={href:"https://codepen.io/airen/full/JjZKNNp",target:"_blank",rel:"noopener noreferrer"},w=e("p",null,[i("然而，在现代 Web 布局中并不是无法可解，上图中 Web 设计师所期待的效果，我们还是有办法的，比如接下来要介绍的 "),e("strong",null,"子网格"),i(" 就是一种很好的解决方案。除此之外， "),e("code",null,"display: contents"),i(" 也是一种解决方案，这种方案我们将在后面的课程中详细介绍！")],-1),q=e("h2",{id:"什么是子网格-subgrid",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#什么是子网格-subgrid","aria-hidden":"true"},"#"),i(" 什么是子网格（"),e("code",null,"subgrid"),i("）？")],-1),C={href:"https://www.w3.org/TR/css-grid-2/#subgrids",target:"_blank",rel:"noopener noreferrer"},j=e("code",null,"subgrid",-1),z=s(`<p>简单地说，子网格也像上面介绍的嵌套网格一样，子网格存在于另一个网格当中。你同样需要在子网格元素上显式设置 <code>display</code> 的值为 <code>grid</code> 或 <code>inline-grid</code> ，当然，也可以使用 <code>inherit</code> 关键词，继承父元素的 <code>display</code> 属性值。</p><p>网格布局中的子网格（<code>subgrid</code>）不会使用 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 指定具体的网格轨道尺寸和数量，否则它又将是嵌套网格。你只需要将子网格的 <code>grid-template-columns</code> 和（或）<code>grid-template-rows</code> 属性的值设置为 <code>subgrid</code> 。</p><p>具体的语法规则如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> grid-template-rows: subgrid &lt;line-name-list&gt;? 
 grid-template-columns: subgrid &lt;line-name-list&gt;? 
 &lt;line-name-list&gt;      = [ &lt;line-names&gt; | &lt;name-repeat&gt; ]+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>grid-template-rows</code> 、 <code>grid-template-columns</code> 或两者都显式设置了 <code>subgrid</code> 的值，嵌套网格将采用其父网格定义的网格轨道。子网格的项目将参与任何与父网格共享的网格轨道的内在尺寸计算。从本质上讲，子网格提供了通过嵌套元素向下传递网格参数的能力，以及将其基于内容信息向上传递到父网格的能力。</p><p>如果在 <code>subgrid</code> 后面指定了 <code>&lt;line-name-list&gt;</code> 参数的话，将允许对与父网格共享的网格线进行本地命名：如果给出了 <code>&lt;line-name-list&gt;</code>，指定的 <code>&lt;line-name&gt;</code>（网格线名称）将被分配给子网格的显式网格线，每条一个，从第一条网格线开始，并且多余的网格线名称会被忽略。</p>`,6),W=e("code",null,"subgrid",-1),B={href:"https://caniuse.com/?search=subgrid",target:"_blank",rel:"noopener noreferrer"},M=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1e06535bae140cd8c2841171377c1b8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>所以接下来的示例，都以在 Firefox 71+ 浏览器渲染的效果为最终结果。对于不支持 <code>subgrid</code> 的浏览器，可以使用 <code>@\`\`supports</code> 来做降级处理。只不过，我们课程中的示例将不做任何降级处理。</p><blockquote><p>简单地说，该小册不考虑 <code>subgrid</code> 的兼容性，但接下来示例效果都是 Firefox 浏览器中的效果！</p></blockquote><p>比如下面这个示例，可以初步体验一下子网格（<code>subgrid</code>）与嵌套网格的差异：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e261d6bc261d43d6aa54f0eadbbba49f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),D={href:"https://codepen.io/airen/full/BaVzeOa",target:"_blank",rel:"noopener noreferrer"},R=s(`<h2 id="嵌套网格-vs-子网格" tabindex="-1"><a class="header-anchor" href="#嵌套网格-vs-子网格" aria-hidden="true">#</a> 嵌套网格 vs. 子网格</h2><p>首先来说嵌套网格和子网格的共同之处。嵌套网格和子网格都存在于另一个网格之中，简单地说，网格中有另一个网格存在。嵌套网格和子网格只有在网格项目跨越多个网格单元格才有意义（你可以使用 <code>grid-row</code> 、 <code>grid-column</code> 或 <code>grid-area</code> 实现这一点），当然，在单独的一个网格单元格也可以被似为网格区域，但这样做不是太有意义。</p><p>只不过，默认情况下，网格项目的子项目不是网格布局的一部分。如果没有子网格功能，你就需要创建一个嵌套网格并重新计算网格轨道，以便嵌套网格复制网格布局。事实上，嵌套网格和子网格并不是一回事。</p><p>正如前面所述，你可以在 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性上设置 <code>subgrid</code> 值，来显式创建一个子网格。例如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent--grid{
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56234b9e0f4472a9809cd968d1e0632~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),F={href:"https://codepen.io/airen/full/GRGqaeV",target:"_blank",rel:"noopener noreferrer"},L=s(`<p>使用这种语法，<code>.subgrid</code> 是 <code>.parent--grid</code> 网格中的一个内嵌网格，也是一个子网格。它将继承外部网格（父网格）的网格轨道。</p><p>嵌套网格不能继承父网格的网格轨道，但在 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 以及 <code>gap</code> 属性值为 <code>inherit</code> 时可以复制父网格；也可以在 <code>grid-template-columns</code> 、 <code>grid-template-rows</code> 和 <code>gap</code> 设置独立的值，创建一个独立的网格。比如下面这个代码，就是复制一个父网格：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent--grid {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f078c1202aa4bf7a231520a63cc750d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),E={href:"https://codepen.io/airen/full/zYaBVxj",target:"_blank",rel:"noopener noreferrer"},N=e("p",null,[i("使用此语法，"),e("code",null,".nested--grid"),i(" 将复制 "),e("code",null,".parent--grid"),i(" 的网格轨道。这两个网格是独立的两个网格。")],-1),T=e("p",null,"虽然嵌套网格仍然独立于父网格(我们有两个网格)，但子网格是父网格的一部分(我们有一个网格)，因为子网格包含在相同的网格布局中——使用相同的行、列和间距。",-1),H=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8adf60fd781e4d1da97d710144a3d4fd~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),G={href:"https://codepen.io/airen/full/WNyxqrR",target:"_blank",rel:"noopener noreferrer"},K=s(`<p>从上图中不难发现，<strong>左侧的嵌套网格和父网格是两个独立的网格，右侧的子网格和父网格是有关系的，子网格只是父网格的一部分，它被包含在同一个布局中，使用相同的网格轨道和网格线</strong> 。</p><h2 id="为什么需要子网格" tabindex="-1"><a class="header-anchor" href="#为什么需要子网格" aria-hidden="true">#</a> 为什么需要子网格？</h2><p>一个值得我们深思的问题是，既然可以通过在一个网格项目上将 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 独立创建一个有别于父网格或继承父网格的轨道的嵌套网格，那么为什么还需要子网格呢（即在一个网格项目上将 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 设置为 <code>subgrid</code>）？</p><p>前面多次提到过，嵌套网格是独立的一个网格系统，它不会继承父网格的网格轨道。这样一来，在一个网格上构建一个网格就会产生问题，我们不得不管理两个独立的网格。</p><p>在有 <code>subgrid</code> （子网格）之前，嵌套网格还存在另一个问题，<strong>它对响应式 Web 布局不够灵活</strong> 。由于今天市场上充斥着不同的移动设备屏幕，响应性是至关重要的。创建一个嵌套网格有时会使里面的元素溢出网格容器元素的边界之外。因此，需要一个新的属性来满足 Web 开发者的需求。这个新属性就是 <code>subgrid</code>。</p><p>我将用下面两个示例来描述，网格布局中为什么要子网格（<code>subgrid</code>）。</p><p>先来看一个卡片列表的布局。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e97c8e647ad44e09791afe007dd07cb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图是我们常见的一个布局模式，每一行有多个卡片。每张卡片由一个<strong>标题</strong> 、<strong>缩略图</strong>和<strong>正文</strong>三个部分组成 。卡片在设计的时候，通常都是完美的，比如说标题长度是确定好的、图片高度是一致的、正文内容是相同的。然而，在生产过程中，事情往往会有一些不同。标题和正文的长度在不同的卡片之间会有很大的差异。这可能会破坏整个行中漂亮均匀的卡片美感。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cad9455e358b4d93b731c28258decb2e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>有一些方法可以解决这个问题，你可以限制允许使用的内容，在元素上设置一个最小高度或指定具体高度，以保持对齐，但这些都限制了内容，或者会导致视觉美感被牺牲掉。</p><p>你可能想知道 Flexbox 是否是一个可能的解决方案。它们可以让你实现大部分需求，但你可能需要牺牲设计和（或）语义来达到预期的结果。你可以考虑嵌套网格，但问题是每个单独嵌套的网格都不知道其他网格的大小，这意味着轨道不会对齐，这与 Flexbox 的情况相似。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3825492715a46b885d23f469a97e948~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然卡片排列正确，但设计感就差了。</p><p>如果我们使用 <code>subgrid</code> 呢？<code>subgrid</code> 让嵌套的网格容器能够继承父网格轨道的尺寸。如果不继承父网格轨道的尺寸，网格项目就会有独立的尺寸，这与前面提到的 Flexbox 或嵌套网格的例子相同。 由于父网格为三个轨道提供了尺寸，嵌套的子网格将继承父轨道的尺寸，并调整为整个行的最大网格单元。这样一来，项目就排成了一排！</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e00d2b4af4d43b99ec89a524c308d7e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>假设实现上面示意图的效果，我们有一个像下面这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;!-- Card --&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;h3&gt;卡片标题&lt;/h3&gt;
        &lt;figure&gt;&lt;img src=&quot;&quot; alt=&quot;&quot; /&gt;&lt;/figure&gt;&lt;!-- 卡片缩略图 --&gt;
        &lt;p&gt; 卡片描述 &lt;/p&gt;
    &lt;/div&gt;
    
    &lt;!-- 省略多个 card 结构 --&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;h3&gt;卡片标题&lt;/h3&gt;
        &lt;figure&gt;&lt;img src=&quot;&quot; alt=&quot;&quot; /&gt;&lt;/figure&gt;&lt;!-- 卡片缩略图 --&gt;
        &lt;p&gt; 卡片描述 &lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在卡片外部容器，我们可以使用 <strong>RAM</strong> 布局技术来实现：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% -2rem, 300px), 1fr));
    gap: 1rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每张卡片在块轴方向跨越三个行网格轨道：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
    grid-row: span 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你将在浏览器看到的效果像下面这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b92bec884aa143589764d6e42618d614~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可能会认为上图中网格线是用于卡片（卡片是一个网格项目）上的（卡片的标题、缩略图和描述）。但是，这些网格线是用于网格容器 <code>.container</code> 的，只有网格项目 <code>.card</code> 可以使用它们，可以在卡片 <code>.card</code> 通过 <code>grid-row</code> 、<code>grid-column</code> 或 <code>grid-area</code> 使用这些网格线名称。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
    grid-rows: span 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每张卡片<code>.card</code> 跨越<code>.container</code> 网格的三行。这意味着，卡片上的标题、缩略图和描述没有被包含在这些行中。这也就是为什么上图中卡片的标题、缩略图和描述并没有按行对齐，因为第一张卡片的描述文本内容更多。</p><p>而我们期望的是父网格（<code>.container</code>）的行网格轨道能传递给卡片的“标题”、“缩略图”和“描述”使用：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/785f340fcb41412ba35275d87eb83e3e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>要达到这个诉求，你需要在 <code>.card</code> 上使用下面的代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
    /* 创建一个网格 */
    display: inherit;
    
    /* 继承父网格的网格轨道 */
    grid-template-rows: subgrid;
    
    /* 重置网格轨道之间的间距*/
    gap: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用子网格时，相当于卡片 <code>.card</code> 继承父网格 <code>.container</code> 的相关特性，即继承 <code>grid-template-columns</code> 、 <code>grid-template-rows</code> 和 <code>gap</code> 属性的值。有了它，网格看起来像这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b727ab7d4a784ad190129c18287ced00~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,33),V={href:"https://codepen.io/airen/full/OJEXerm",target:"_blank",rel:"noopener noreferrer"},X=s(`<p>现在，卡片（<code>.card</code>）的每个内部项（标题、缩略图和描述）都放在一行中。这意味着，如果任何内部项的内容变长，它的行将扩展（变高）以适应内容。这是非常有用的，它将为我们提供更多的方法来实现 CSS 网格之前不可能实现的功能。</p><h2 id="如何创建子网格" tabindex="-1"><a class="header-anchor" href="#如何创建子网格" aria-hidden="true">#</a> 如何创建子网格？</h2><p>在 CSS 网格布局中，定义显式网格的 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性引入了一个新的属性值，即 <code>subgrid</code> 。如此一来，子网格将会继承父网格的相关特性，比如网格轨道的尺寸和网格之间的间距等。换句话说，子网格可以沿着单个轴（行或列）或沿两个轴采用其父网格的轨道尺寸。</p><p>简单地说，在一个网格项目上显式设置 <code>display</code> 的值为 <code>grid</code> 或 <code>inline-grid</code> ，或者继承其父网格容器的 <code>display</code> 值，就意味着该网格项目是一个独立的网格格式化上下文。同时，子网格的 <code>grid-template-columns</code> 和（或）<code>grid-template-rows</code> 显式设置值为 <code>subgrid</code> 时，就意味着子网格的内容参与其父网格的格式化上下文，而不会建立一个新的网格格式化上下文。</p><p>比如下面这个示例，在 <code>.parent</code> 元素上使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 创建了一个三行六列（<code>3 x 6</code>）的父网格（外部网格）。同时子网格（内部嵌套的网格）是父网格的一个网格项目（<code>.subgrid</code>），它合并了四列两行，而且在子网格上显式设置 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 的值为 <code>subgrid</code> 。这意味着子网格（嵌套网格）现在是一个两行四列（<code>2 x 4</code>）的网格，并且网格轨道（行和列）的大小与父网格的网格轨道大小是相等的。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2fa022aefbc4887819d3a92caded8a7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),Y={href:"https://codepen.io/airen/full/ExRgmYg",target:"_blank",rel:"noopener noreferrer"},Z=s(`<p>这意味着父网格中的网格轨道（或网格项目）尺寸的任何改变都会延伸到其子网格相应的网格轨道（网格项目）；同样子，子网格的网格轨道的尺寸改变也会影响父网格轨道的尺寸。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f9b0e63a3ed4d659095058d93e1f91e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你还可以只在一个维度中使用子网格，并在另一个维度中指定网格轨道数量和尺寸。意思是说，你只在 <code>grid-template-columns</code> 或 <code>grid-template-rows</code> 中的一个属性显式设置值为 <code>subgrid</code> ，另一个未显式设置 <code>subgrid</code> 值的属性可以设置其他的值。</p><p>比如下面这个示例，你只在 <code>grid-template-columns</code> 属性上显式设置值为 <code>subgrid</code> ， <code>grid-template-rows</code> 属性设置为其他值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4b0f45743b4e618508b0d2b697bd9e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),O={href:"https://codepen.io/airen/full/xxzEdeW",target:"_blank",rel:"noopener noreferrer"},J=s(`<p>正如你所看到的，子网格（<code>.subgrid</code>）的列网格轨道和父网格（<code>.parent</code>）的列网格轨道是保持一致的（子网格继承了父网格的列网格轨道），大小会相互影响；但行网格轨道是独立于父网格的行网格轨道，这是因为子网格的 <code>grid-template-rows</code> 是一个重新设置的值。在此情况之下，子网格的行轨道之间的间距（<code>gap</code>）被视为<code>0</code> ，没有继承父网格的行网格轨道之间的间距 <code>1rem</code> 。</p><p>同样的，你可以让子网格的行网格轨道继承父网格的行网格轨道，在子网格中单独为列网格轨道设置独立的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4ab44a435dc4162b1c23ee979cd4500~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),A={href:"https://codepen.io/airen/full/dyKpRXr",target:"_blank",rel:"noopener noreferrer"},Q=s(`<p>你也可以在子网格中的其中一个维度设置子网格（<code>subgrid</code>），在另一个维度使用隐式网格轨道（<code>grid-auto-rows</code> 或 <code>grid-auto-columns</code>）。在下面这个示例中，没有显式指定任何行网格轨道（即没有显式设置<code>grid-template-rows</code> 属性的值），而是使用 <code>grid-auto-rows</code> 为网格设置隐式行网格轨道尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da24509ae5594292ae029f433f9d4c55~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),I={href:"https://codepen.io/airen/full/dyKpRVB",target:"_blank",rel:"noopener noreferrer"},P=s(`<p>子网格（<code>.subgrid</code>）将会按照 <code>grid-auto-rows</code> 属性的值指定行网格轨道尺寸，并且会创建隐式的行网格轨道，也会像前面的示例一样，父网格将需要为这些行提供空间。</p><p>虽然子网格两个维度（<code>grid-template-columns</code> 和 <code>grid-template-rows</code>）都显式设置值为 <code>subgrid</code> 时，子网格会继承父网格轨道尺寸，但子网格的默认网格线编号（数字索引编号）不会继承父网格的，它将按照网格系统网格线编号进行编号。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d73b8b589a04ce89d52348b853e5946~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),U={href:"https://codepen.io/airen/full/xxzErme",target:"_blank",rel:"noopener noreferrer"},$=s(`<p>然而，如果父网格上有任何网格线名称（显式命名的网格线名称），它们将被子网格继承，但也可以提供子网格自己的网格线名称。父网格将不能使用子网格线命名的网格线名称。它们只适用于子网格。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;header&gt;.header&lt;/header&gt;
    &lt;aside&gt;.sidbar&lt;/aside&gt;
    &lt;main class=&quot;subgrid&quot;&gt;
        &lt;header&gt;.sub-header&lt;/header&gt;
        &lt;aside&gt;.sub-sidebar&lt;/aside&gt;
        &lt;main&gt;.sub-main&lt;/main&gt;
        &lt;nav&gt;.sub-nav&lt;/nav&gt;
        &lt;footer&gt;.sub-footer&lt;/footer&gt;
    &lt;/main&gt;
    &lt;nav&gt;.nav&lt;/nav&gt;
    &lt;footer&gt;.footer&lt;/footer&gt;
&lt;div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fd9e07ed36f44f3b4da61910f2ccc54~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),ee={href:"https://codepen.io/airen/full/MWXjodB",target:"_blank",rel:"noopener noreferrer"},ie=s(`<p>如果上面示例过于复杂，你可以看下面这个简化的示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e714dfa59bc45c6a4dbdef28ee308c6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),de={href:"https://codepen.io/airen/full/zYaKENN",target:"_blank",rel:"noopener noreferrer"},ne=s(`<p>子网格除了可以继承父网格的网格轨道之外，当子网格的 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 都显式设置值为 <code>subgrid</code> 时，子网格也会继承父网格的 <code>gap</code> 值。</p><p>如果子网格只在一个维度显式设置值为 <code>subgrid</code> 时，那么只有在相对应的维度才会继承父网格的 <code>gap</code> ，即子网格没有显式设置 <code>subgrid</code> 维度是不会继承父网格的 <code>gap</code> 值。除此之外，子网格还可以不继承父网格的<code>gap</code> 值，只需要在子网格上显式设置 <code>gap</code> 值与父网格的 <code>gap</code> 值不同即可。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2461279a73d4cf78d258c8c291a1bdd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),se={href:"https://codepen.io/airen/full/gOKwGGZ",target:"_blank",rel:"noopener noreferrer"},le=e("p",null,"这就是网格布局中如何创建子网格的姿势。网格布局中的子网格是非常有用的，它将为我们提供更多的方法来实现 CSS 网格之前不可能实现的功能。",-1),re=e("h2",{id:"小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#小结","aria-hidden":"true"},"#"),i(" 小结")],-1),ae=e("p",null,"上面介绍的主要是网格中的子网格和嵌套相关的理论以及它们之间的差异，并且着重介绍了 Web 布局中为什么需要子网格和如何创建子网格。我想通过这节课程的学习，你对网格中的子网格与嵌套网格有了根本性的认识。",-1),ce=e("p",null,"为了加强大家对其理解，我们将在下一节课程中一起学习 Web 布局中，哪些场景可使用子网格来构建，以及如何构建。",-1);function te(oe,ue){const d=r("ExternalLinkIcon");return a(),c("div",null,[o,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",u,[i("https://codepen.io/airen/full/MWXyqmW"),n(d)])])]),v,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",m,[i("https://codepen.io/airen/full/QWxNZqE"),n(d)])])]),p,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",b,[i("https://codepen.io/airen/full/XWYKpdP"),n(d)])])]),g,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",f,[i("https://codepen.io/airen/full/NWzrdYw"),n(d)])])]),h,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",_,[i("https://codepen.io/airen/full/RwJRKEo"),n(d)])])]),S,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",x,[i("https://codepen.io/airen/full/ZEROeZQ"),n(d)])])]),k,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",y,[i("https://codepen.io/airen/full/JjZKNNp"),n(d)])])]),w,q,e("p",null,[i("由于嵌套网格布局存在一定的缺陷，同时为了避免嵌套网格给布局带来的不利因素，"),e("a",C,[i("CSS Grid 布局模块 Level 2"),n(d)]),i(" 新增了一个 "),j,i(" （子网格）的新功能。")]),z,e("p",null,[i("只不过，到目前为止，网格布局中的 "),W,i(" 只得到了 "),e("a",B,[i("Firefox 71+ 和 Safari 16 支持"),n(d)]),i("：")]),M,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",D,[i("https://codepen.io/airen/full/BaVzeOa"),n(d)])])]),R,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",F,[i("https://codepen.io/airen/full/GRGqaeV"),n(d)])])]),L,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",E,[i("https://codepen.io/airen/full/zYaBVxj"),n(d)])])]),N,T,H,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",G,[i("https://codepen.io/airen/full/WNyxqrR"),n(d)])])]),K,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",V,[i("https://codepen.io/airen/full/OJEXerm"),n(d)])])]),X,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Y,[i("https://codepen.io/airen/full/ExRgmYg"),n(d)])])]),Z,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",O,[i("https://codepen.io/airen/full/xxzEdeW"),n(d)])])]),J,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",A,[i("https://codepen.io/airen/full/dyKpRXr"),n(d)])])]),Q,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",I,[i("https://codepen.io/airen/full/dyKpRVB"),n(d)])])]),P,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",U,[i("https://codepen.io/airen/full/xxzErme"),n(d)])])]),$,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ee,[i("https://codepen.io/airen/full/MWXjodB"),n(d)])])]),ie,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",de,[i("https://codepen.io/airen/full/zYaKENN"),n(d)])])]),ne,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",se,[i("https://codepen.io/airen/full/gOKwGGZ"),n(d)])])]),le,re,ae,ce])}const me=l(t,[["render",te],["__file","index-16.html.vue"]]);export{me as default};
