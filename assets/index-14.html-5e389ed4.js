import{_ as l,M as s,p as a,q as c,R as e,t as i,N as n,a1 as r}from"./framework-e8cb8151.js";const o={},t=r(`<h1 id="_14-网格项目的放置和层叠" tabindex="-1"><a class="header-anchor" href="#_14-网格项目的放置和层叠" aria-hidden="true">#</a> 14-网格项目的放置和层叠</h1><p>通过前面几节课程的学习，我想你已经会使用 <code>grid-template-*</code> 、<code>grid-auto-*</code> 等属性定义一个符合 Web 布局的网格，但仅仅这样是不够的，我们还需要将网格项目放置到需要的（正确的）位置。那么在这节课程中，我们主要一起来探讨 CSS 网格布局中的网格项目是如何被放置的。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e3d20d1c83341f481935b6a00faeab1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="放置网格项目" tabindex="-1"><a class="header-anchor" href="#放置网格项目" aria-hidden="true">#</a> 放置网格项目</h2><p>在 CSS 网格系统中，每个网格项目都与一个网格区域（一个单元格也可以称为是一个网格区域）相关联，即每个网格项目都会放置在四条网格线（两条行网格线和两条列网格线）围绕着的区域，这是一个由网格项目所占据的相邻网格单元格组成的矩形集合。</p><p>这个网格区域定义了网格项的包含块，其中的自我对齐属性（<code>justify-self</code> 和 <code>align-self</code>）决定了它们的实际位置。一个网格项目所占据的单元格也会影响网格的行和列的大小。</p><p>一个网格项目的网格区域在网格中的位置是由它的位置定义的，它由一个网格位置和一个网格跨度（网格跨度指的是合并网格单元格）组成。</p><ul><li><strong>网格位置（Grid Position）</strong>：网格项目在网格中每个轴的位置。网格位置可以是明确指定的，也可以是自动放置的。</li><li><strong>网格跨度（Grid Span）</strong> ：网格项目在每个轴上占据多少个网格轨道。默认情况之下，在网格系统中，一个网格项目跨度总是确定的，即一个网格单元格，不过我们可以使用其他的方式来确定跨度（即将多个单元格合并成一个）。</li></ul><p>如果不希望网格项目自动放置的话，可以使用 <code>grid-row</code> （或它的子属性 <code>grid-row-start</code> 和 <code>grid-row-end</code>）、<code>grid-column</code> （或它的子属性 <code>grid-column-start</code> 或 <code>grid-column-end</code> ）和 <code>grid-area</code> 等属性来明确指定网格项目在网格系统中的位置。 另外，在 <code>grid-row</code> 和 <code>grid-column</code> 属性上，还可以使用关键词 <code>span</code>，用来合并网格单元格。</p><p>在网格布局中，可以使用下面六个信息中任何一种，来明确指定网格项目在网格系统中的位置：</p><table><thead><tr><th></th><th><strong>网格行轨道（Row）</strong></th><th><strong>网格列轨道（Column）</strong></th></tr></thead><tbody><tr><td><strong>起点（Start）</strong></td><td>行网格轨道开始的网格线，对应的是 <code>grid-row-start</code> 属性</td><td>列网格轨道开始的网格线，对应的是 <code>grid-column-start</code> 属性</td></tr><tr><td><strong>终点（End）</strong></td><td>行网格轨道结束的网格线，对应的是 <code>grid-rows-end</code> 属性</td><td>列网格轨道结束的网格线，对应的是 <code>grid-column-end</code> 属性</td></tr><tr><td><strong>跨度（Span）</strong></td><td>合并行网格轨道上的单元格，即合并行</td><td>合并列网格轨道上的单元格，即合并列</td></tr></tbody></table><p>正如上表所示，在一个给定的维度中（网格的行或列），起点（Start）、终点（End）和跨度（Span）中任何两个的确定值都意味着第三个的值被确定。</p><p>另外，网格项目的位置和跨度是自动的还是指定的，是有相应条件的：</p><table><thead><tr><th></th><th><strong>网格位置（Grid Position）</strong></th><th><strong>网格跨度（Grid Span）</strong></th><th><strong>备注</strong></th></tr></thead><tbody><tr><td><strong>明确指定</strong></td><td>至少指定了一条网格线</td><td>显式、隐式或默认的跨度</td><td>指的是明确放置网格项目或网格项目跨度</td></tr><tr><td><strong>自动</strong></td><td>没有明确指定的网格线</td><td>不适用</td><td>指的是自动放置网格项目</td></tr></tbody></table><p>CSS 网格布局中，网格项目的放置主要分为两种，第一种是由网格布局算法自动放置，第二种是由开发者指定的位置。其中第一种被称为<strong>自动放置网格项目</strong> ，而第二种称为<strong>明确放置网格项目</strong> 。由于自动放置网格项目会涉及到相关的布局算法，我们先从明确放置网格项目开始。</p><h3 id="明确放置网格项目" tabindex="-1"><a class="header-anchor" href="#明确放置网格项目" aria-hidden="true">#</a> 明确放置网格项目</h3><p>在 CSS 网格布局中，有很多种方式将网格项目明确地放置到指定的位置。比如：</p><ul><li>使用 <code>grid-row-start</code>、<code>grid-row-end</code>、<code>grid-column-start</code> 和 <code>grid-column-end</code> 指定网格线名称，放置网格项目；</li><li>使用 <code>grid-row-start</code>、<code>grid-row-end</code>、<code>grid-column-start</code> 和 <code>grid-column-end</code> 的简写属性 <code>grid-row</code> 和 <code>grid-column</code> 指定网格线名称，放置网格项目；</li><li>使用 <code>grid-area</code> 指定网格名称，或指定 <code>grid-template-areas</code> 定义的网格区域名称，放置网格项目；</li><li>在 <code>grid-row-start</code>、<code>grid-row-end</code>、<code>grid-column-start</code>、<code>grid-column-end</code> 或 <code>grid-row</code>、<code>grid-column</code> 指定网格线名称，并且使用 <code>span</code> 来指定合并的网格单元格，它们的结合来放置网格项目；</li><li>在 <code>grid-row-start</code>、<code>grid-row-end</code>、<code>grid-column-start</code>、<code>grid-column-end</code>（以及其简写属性<code>grid-row</code>、<code>grid-column</code>）或 <code>grid-area</code> 中，指定 <code>grid-template-rows</code>、<code>grid-template-columns</code> 和 <code>grid-template-areas</code> 定义的网格线名称，放置网格项目；</li><li>使用已命名的网格线名称和 <code>span</code> 关键词，放置网格项目；</li><li>在 <code>grid-area</code> 指定 <code>grid-template-areas</code> 或 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 创建的网格区域名称，放置网格项目。</li></ul><p>示例代码如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> /* 方法一 */  
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面代码所示，明确放置网格项目主要是有两种方式来指定：</p><ul><li>根据网格线名称来指定网格项目放置的位置；</li><li>根据网格区域名称来指定网格项目放置的位置。</li></ul><p>从前面的课程中可以得知，任何一个网格都会有默认的网格线名称，即数字编号的网格线，这些数字就是网格线的默认名称；或者是通过 <code>grid-template-rows</code> 、<code>grid-template-columns</code> 或 <code>grid-template-areas</code> 显式命名的网格线。比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    gap: 1rem;
    
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 创建了一个三行三列（<code>3 x 3</code>）的网格（显式网格），相应的也就给对应的网格线赋予了数字编号：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b088f0c8a4347b9a8b00d049b95edb1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这样一来，你就可以在 <code>grid-row</code> （它的子属性 <code>grid-row-start</code> 或 <code>grid-row-end</code> ）、<code>grid-column</code> （它的子属性 <code>grid-column-start</code> 或 <code>grid-column-end</code>）或 <code>grid-area</code> 指定相应的网格线数字编号（即默认的网格线名称）。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9f10711c043452292b6e78bce08223a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,29),v={href:"https://codepen.io/airen/full/rNKNOoJ",target:"_blank",rel:"noopener noreferrer"},m=r(`<p>网格项目一从默认的位置（行<code>1</code>，行<code>2</code> ，列<code>1</code> 和列<code>2</code> 围绕的单元格）变成横跨两列两行的新位置（行<code>1</code> ，行<code>3</code> ，列<code>1</code> 和列<code>3</code> 围绕的网格区域）。这个示例可能给你带来的感观不是特别的强，你可以尝试将上面的代码换成：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5948869a1974507a3e6b7b5a8a8ee82~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),u={href:"https://codepen.io/airen/full/eYKYJgj",target:"_blank",rel:"noopener noreferrer"},b=r(`<p>是不是有点似曾相识，看上去和 CSS 的 <code>position</code> 的绝对定位（<code>absolute</code>）有点相似。</p><p>从这两个简单示例可以得知，在 CSS 网格布局中，你可以使用 <code>grid-row-start</code> 、<code>grid-row-end</code> 、 <code>grid-column-start</code> 和 <code>grid-column-end</code> 将一个网格项目放置到任何你想要的位置。其中：</p><ul><li><code>grid-row-start</code> 表示行网格线的起始位置；</li><li><code>grid-row-end</code> 表示行网格线的结束（或终点）位置；</li><li><code>grid-column-start</code> 表示列网格线的起始位置；</li><li><code>grid-column-end</code> 表示列网格线的结束（或终点）位置。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66b01a45915e4d1096186d6446e3f30b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当然，你也可以把 <code>-start</code> 和 <code>-end</code> 的网格线编号互换，也能达到相同的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row-start: 4;
    grid-row-end: 2;
    grid-column-start: 4;
    grid-column-end: 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68501898d862445695cc1b709a597ae5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),g={href:"https://codepen.io/airen/full/gOKOPKm",target:"_blank",rel:"noopener noreferrer"},p=r(`<p>但不建议这样使用，更建议和轴的方向相匹配，比如，阅读模式是 <code>ltr</code> （Left-To-Right）时，行网格线的起始编号是 <code>2</code> ，结束编号是 <code>4</code> ，列网格线的起始编号是 <code>2</code> ，结束编号是 <code>4</code> 。保持这样使用网格线编号不易于造成混乱。即使你想改变网格线的起始和终点位置，建议使用负数的网格线编号：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row-start: -1;
    grid-row-end: -3;
    grid-column-start: -1;
    grid-column-end: -3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c8ee6f5ceb8464baadae0d4991e5ada~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),f={href:"https://codepen.io/airen/full/jOKOWvx",target:"_blank",rel:"noopener noreferrer"},h=r(`<p>你还可以使用 <code>grid-row-start</code> 、<code>grid-row-end</code> 、<code>grid-column-start</code> 和 <code>grid-column-end</code> 的简写属性 <code>grid-row</code> 和 <code>grid-column</code> 来放置网格项目。在使用简写属性时， <code>start</code> 和 <code>end</code> 之间要用 <strong>斜杠（<strong><strong><code>/</code></strong></strong>）</strong> 来分隔，其中 <code>/</code> 前面代表的是 <code>start</code> （起始）网格线编号（名称），<code>/</code> 后面代表的是 <code>end</code> （结束）网格线编号（名称）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row: 2 / 4;
    grid-column: 2 / 4;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/027dce4f33024478be01eecd75f497af~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),S={href:"https://codepen.io/airen/full/LYrYZPe",target:"_blank",rel:"noopener noreferrer"},w=r(`<p>前面这几个示例向大家展示了，在 CSS 网格布局中，你可以使用不同的方式达到相同的效果。在这几个示例中，虽然都是以默认网格线名称（数字索引号）指定网格项目一的位置，但它们都有一个共同的效果，就是网格项目一实际上合并了四个网格单元格，即 <strong>行和列都合并了两个</strong>。</p><p>其实，在网格布局中，使用 <code>grid-row</code> 和 <code>grid-column</code> （或它们的子属性）时，还可以使用关键词 <code>span</code> （注意这个 <code>span</code> 不是 HTML 中的 <code>&lt;span&gt;</code> 标签元素）来合并网格单元格。 <code>span</code> 后面紧跟一个正整数，这个正整数表示要合并的单元格数量。比如实现上面示例的效果，可以这样编写 CSS 代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row: 2 / span 2;
    grid-column: 2 / span 2;
    
    /* 等同于 */
    grid-row-start: 2;
    grid-row-end: span 2;
    grid-column-start: 2;
    grid-column-end: span 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9a2dff2e6ec430f8957dad96f8af14c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),_={href:"https://codepen.io/airen/full/vYrYKjP",target:"_blank",rel:"noopener noreferrer"},k=r('<p>在这个示例中，虽然没有在 <code>grid-row-end</code> 和 <code>grid-column-end</code> 显式指定网格线的名称（数字编号），但其值 <code>span 2</code> 以及 <code>grid-row-start</code> 和 <code>grid-column-start</code> 隐式决定了相应的网格线位置：</p><ul><li><code>grid-row: 2 ``/`` span 2</code> 会告诉浏览器，网格项目一放置的位置，行起始位置是行<code>2</code>，并向下合并两行（<code>span 2</code>）；</li><li><code>grid-column: 2 ``/`` span 2</code> 会告诉浏览器，网格项目一放置的位置，列起始位置是列<code>2</code> ，并向右合并两列（<code>span 2</code>）。</li></ul><p>在使用 <code>span</code> 关键词来合并网格单元格时，<code>span</code> 和其后面的正整数值 <code>&lt;integer&gt;</code> 之间要使用 <strong>空隔符</strong> 分开。另外，在 <code>grid-row</code> 和 <code>grid-column</code> 中使用 <code>span</code> 来合并网格单元格时，<code>span</code> 关键词都放置在 <code>/</code> 之后，并且需要和它之间用空隔分隔。</p><p>这是 <code>span</code> 较佳的一种使用方式。当然，这并不代表着只能在 <code>grid-row</code> 和 <code>grid-column</code> 属性上使用，它也可以用于它们的子属性 <code>grid-row-start</code> 、 <code>grid-row-end</code> 、<code>grid-column-start</code> 和 <code>grid-column-end</code> 上，只不过在这几个属性上使用 <code>span</code> 时，无法显式指定网格线编号（名称）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {\n    grid-row-start: span 2;\n    grid-row-end: span 3;\n    grid-column-start: span 3;\n    grid-column-end: span 4;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d62f400cd314cfd9f32605cc139b52b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',6),C={href:"https://codepen.io/airen/full/JjZjRbV",target:"_blank",rel:"noopener noreferrer"},x=r(`<p>正如你所看到的，网格项目一合并了两行（<code>grid-row-start: span 2</code>）三列（<code>grid-column-start: span 3</code>），而且行和列的起始网格线都是它所处位置所对应的网格线（在这个示例中因为它是第一个网格项目，并且没有被其他网格项目推开，所以行和列默认的起始网格线都是 <code>1</code> ）。如果第一个网格单元格被其他网格项目占用，那么它的行和列起始网格线就会有所变化：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd1ced559e57414da64c0f42b0fcc97f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),j={href:"https://codepen.io/airen/full/LYrYbKO",target:"_blank",rel:"noopener noreferrer"},q=r(`<p>你可能已经发现了，这两个示例中的网格项目一的 <code>grid-row-end: span 3</code> 和 <code>grid-column-end: span 4</code> 被忽略了（虽然是有效的属性，但未用于计算网格单元格的合并）。因此，<strong>不建议同时在</strong> <strong><code>grid-*-start</code></strong> <strong>和</strong> <strong><code>grid-*-end</code></strong> <strong>属性上使用</strong> <strong><code>span</code></strong> <strong>来合并网格单元格</strong> 。</p><p>即使在单个属性上使用，也更建议在 <code>grid-*-start</code> 属性上指定网格项目起始网格线编号，在 <code>grid-*-end</code> 属性上使用 <code>span</code> 关键词，指定合并的行数或列数。所以，像下面这样使用是较佳的一种方式：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-row-start: 2;       /* 显式指定起始行网格线编号 */
    grid-column-start: 2;    /* 显式指定起始列网格线编号 */
    
    grid-row-end: span 2;    /* 合并两行 */
    grid-column-end: span 2; /* 合并两列 */
    
    /* 等同于 */
    grid-row: 2 / span 2;
    grid-column: 2 / span 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，要是你想显式指定网格线起始位置，那么可以分组结合 <code>span</code> 来合并网格单元格：</p><ul><li><code>grid-row-start</code> 和 <code>grid-column-start</code> 中使用 <code>span</code>；</li><li><code>grid-row-end</code> 和 <code>grid-column-end</code> 中使用 <code>span</code>。</li></ul><p>比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/076287ce832e46d5b442ad3f592600cb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),y={href:"https://codepen.io/airen/full/mdKdRpg",target:"_blank",rel:"noopener noreferrer"},z=r(`<p>示例效果还向大家展示了，<strong>在网格布局时使用</strong> <strong><code>span</code></strong> <strong>除了可以合并网格单元格之外，还很容易创建一个隐式网格</strong> 。</p><p>这个示例中的 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 定义的只是一个三行三列（<code>3 x 3</code>）的网格，但由于网格项目一和网格项目二合并的行与列已经超出显式网格的范围，此时就会在显式网格基础上进行延伸，创建一个新的网格，也就是一个隐式网格，最终这个网格是一个六行四列（<code>6 x 4</code>）的网格，而且对应的隐式列网格轨道由 <code>grid-auto-columns</code> 属性指定大小（<code>150px</code>），隐式行网格轨道由 <code>grid-auto-rows</code> 属性指定大小（<code>150px</code>）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b67075ddd284e329d17612c7b427aac~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>有意思的是，下面这两种组合方式都会被视为有效的：</p><ul><li><code>&lt;integer&gt; span</code> ，比如 <code>2 span</code>；</li><li><code>span &lt;integer&gt;</code> ，比如 <code>span 2</code>。</li></ul><p>但 <code>&lt;integer&gt; span &lt;integer&gt;</code> 是无效的，比如 <code>2 span 2</code> 。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3514af5db2fc41a29dbb1e2bc46b7289~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),K={href:"https://codepen.io/airen/full/qBKBvOP",target:"_blank",rel:"noopener noreferrer"},Y=r(`<p>虽然 <code>&lt;integer&gt; span</code> 是一个有效值，但它无法指定起始网格线，因此不建议这样使用。如果你真的需要使用 <code>span</code> 来合并网格单元格，建议使用 <code>span &lt;integer&gt;</code> 模式。</p><p>在 CSS 网格中，网格单元格是最小单元体，同样有四条网格线围绕着，同时网格单元格也是最小网格区域。也就是说，<code>grid-row-start</code> 、<code>grid-column-start</code> 、<code>grid-row-end</code> 和 <code>grid-column-end</code> 四个属性指定的网格线围绕的区域就是一个<strong>网格区域</strong> （它有可能比网格单元格更大）。</p><p>前面有不少示例是使用这四个属性指定的网格线名称来放置网格项目，其实你还可以使用一个更简单的属性，即 <strong><code>grid-area</code></strong> 属性。该属性也可以显式指定网格线名称来放置网格项目。</p><p><code>grid-area</code> 属性可以接受 <strong>斜杠（<strong><strong><code>/</code></strong></strong>）</strong> 分隔的 <code>1 ~ 4</code> 个值，但它始终是 <code>grid-row-start</code> 、<code>grid-column-start</code> 、<code>grid-row-end</code> 和 <code>grid-column-end</code> 四个属性的简写，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只不过，省略的值对应的属性取值为 <code>auto</code> ，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* grid-area 显式设置四个值 */
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/353639a276514b9da6c74f23305affa0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),D={href:"https://codepen.io/airen/full/LYrYajd",target:"_blank",rel:"noopener noreferrer"},L=r(`<p><code>grid-area</code> 属性上也可以和 <code>span</code> 关键词结合起来使用，实现单元格合并的效果。虽然在每个值上都可以使用 <code>span</code> 关键词，但不建议这样使用。应该尽可能地在后面两个参数上使用 <code>span</code> ，来实现单元格合并的效果。这样做的原因是：</p><ul><li>前两个值可以用来指定行和列网格线的起始位置；</li><li>后两个值可以用来指定行和列的合并数量。</li></ul><p>比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(2) {
    grid-area: 2 / 2 / span 2 / span 2;
    
    /* 等同于 */
    grid-row-start: 2;       /* 指定行网格线的起始位置 */
    grid-column-start: 2;    /* 指定列网格线的起始位置*/
    grid-row-end: span 2;    /* 合并两行，同时确定行网格线的结束位置 */
    grid-column-end: span 2; /* 合并两列，同时确定列网格线的结束位置 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46bac7bab912480b8e690525df599d80~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),W={href:"https://codepen.io/airen/full/KKeKEYa",target:"_blank",rel:"noopener noreferrer"},O=r(`<p>CSS 网格布局中，网格线的名称除了是数字索引编号之外，还可以在 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 定义网格轨道时给网格线命名，或者 <code>grid-template-areas</code> 定义网格区域时生成隐式的网格线名称。</p><p>这些命名之后的网格线名称同样可以用于 <code>grid-row</code> （它的子属性<code>grid-row-start</code> 和 <code>grid-row-end</code>）、<code>grid-column</code> （它的子属性 <code>grid-column-start</code> 和 <code>grid-column-end</code>） 和 <code>grid-area</code> 来放置网格项目。</p><p>比如，我们要构建下图这样的一个常见的 Web 布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ed188d0c37b48ac8694dd4088e94e08~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 定义网格轨道时，可以同时给网格线命名：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样除了会有默认的数字编码的网格线名称，还会有 <code>header-start</code> 、<code>header-end</code> 等命名的网格线名称：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b182015a18475188e2b0c7b2b8c2ff~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如此一来，就可以在 <code>grid-row</code> 、<code>grid-column</code> 或 <code>grid-area</code> 属性上使用已命名的网格线名称来放置网格项目：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code>grid-area</code> 来替代 <code>grid-row</code> 和 <code>grid-column</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实示例中的 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 在定义网格轨道尺寸和给网格线命名时，已经隐式地创建了网格区域。因此，还可以使用 <code>grid-area</code> 直接引用隐式的网格区域名称，也能达到相同的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b3d19365c494a438a14c0c5a79bbac0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),E={href:"https://codepen.io/airen/full/RwJwmYx",target:"_blank",rel:"noopener noreferrer"},R=r(`<p>同样地，你还可以使用 <code>grid-template-areas</code> 显式给网格区域命名，然后再使用 <code>grid-area</code> 、<code>grid-row</code> 或 <code>grid-column</code> 引用 <code>grid-template-areas</code> 隐式命名的网格线名称放置网格项目，达到上面示例相同的布局效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: grid;
    gap: 1.25rem 2rem;

    /* 定义网格轨道尺寸 */
    grid-template-columns: minmax(min-content, 280px) 1fr;
    grid-template-rows: auto 1fr auto;
  
    /* 显式命名网格区域名称，同时隐式给网格线命名 */
    grid-template-areas:
      &quot;header  header&quot;
      &quot;sidebar main&quot;
      &quot;footer  footer&quot;;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),T={href:"https://codepen.io/airen/full/mdKdZLo",target:"_blank",rel:"noopener noreferrer"},N=r(`<p>现在你可以使用 CSS 网格布局技术构建你想要的 Web 布局了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c67d8ee428ac4820ba5588816953d88c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>简单地说，使用 CSS 网格布局分两步：</p><ul><li>使用 <code>grid-template-*</code> 和（或）<code>grid-auto-*</code> 定义一个网格，在定义所需要的网格的同时，定义了网格轨道尺寸以及网格线；</li><li>使用 <code>grid-row</code> 、<code>grid-column</code> 和（或）<code>grid-area</code> 将网格项目放置到指定的位置。</li></ul><p>以一个经典 Web 布局为例，即 <strong>Full-Bleed 布局</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c92b8aecbb6445ecbe786899a056b203~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
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

body &gt; * {
    grid-column: main-start / main-end;
}

.full__bleed {
    width: 100%;
    grid-column: full__bleed-start / full__bleed-end;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c9d84a4e4ac4400bedbe98728c7145e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>代码就不解释了，最终你将看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df7cc3eeb2704d418948be542e4ae251~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),P={href:"https://codepen.io/airen/full/jOKEZLv",target:"_blank",rel:"noopener noreferrer"},B=r(`<p>你也可以结合 CSS 媒体查询特性，可以很轻易实现 Web 布局框架的响应，比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcff82e1d7564bae8f579023e6c4bfee~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;body&gt;
    &lt;header&gt;Header&lt;/header&gt;
    &lt;nav&gt;Nav&lt;/nav&gt;
    &lt;aside&gt;Sidebar&lt;/aside&gt;
    &lt;main&gt;Main&lt;/main&gt;
    &lt;section&gt;Ads&lt;/section&gt;
    &lt;footer&gt;Footer&lt;/footer&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移动端先行，即构建一个 <strong>一列多行</strong> 的网格，并且使用 <code>grid-template-areas</code> 给网格区域命名，<code>grid-template-rows</code> 定义行网格轨道尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: grid;
    gap: 20px;
    
    grid-template-rows: auto auto 1fr auto auto auto;
    grid-template-areas: 
        &quot;header&quot;
        &quot;nav&quot;
        &quot;main&quot;
        &quot;sidebar&quot;
        &quot;ads&quot;
        &quot;footer&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着使用 <code>grid-area</code> 属性，将相应的网格项目放置到对应的网格区域：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/584e347d30bd4ba5b246783b93851637~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在平板端（Tablet），Web 页面由移动端的一列变成两列，六行变成四行，因此我们要在平板端调整 <code>grid-template-areas</code> 和 <code>grid-template-rows</code> 属性的值，并且新增 <code>grid-template-columns</code> 属性控制列网格轨道尺寸，构建一个四行两列的网格：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media only screen and (min-width: 768px) {
    body {
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: minmax(min-content, 220px) 1fr;
        grid-template-areas: 
            &quot;header   header&quot;
            &quot;nav      nav&quot;
            &quot;sidebar  main&quot;
            &quot;ads      footer&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5cc06b6f654481086b231b77440aed4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>按同样的方式，在浏览器视窗 <code>1024px</code> 断点下调整 <code>grid-template-rows</code> 、<code>grid-template-columns</code> 和 <code>grid-template-areas</code> 属性的值，构建符合桌面端（Desktop）的网格（四行三列）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media only screen and (min-width: 1024px) {
    body {
        grid-template-columns: minmax(min-content, 220px) 1fr minmax(min-content, 220px);
        grid-template-areas:
            &quot;header   header  header&quot;
            &quot;sidebar  nav     ads&quot;
            &quot;sidebar  main    ads&quot;
            &quot;footer   footer  footer&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c57c45719444731a5808fe433723ba2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>最终效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/621e0fae3f8248659f17129920dfea72~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),M={href:"https://codepen.io/airen/full/WNybzvW",target:"_blank",rel:"noopener noreferrer"},H=e("p",null,"你甚至还可以使用这些布局技术构建更为复杂的 Web 布局，比如报刊杂志类的布局效果：",-1),J=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d31f9852048e4ab797878961c1981cf4~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),V={href:"https://codepen.io/airen/full/GRGgdeq",target:"_blank",rel:"noopener noreferrer"},Z=r('<h3 id="自动放置网格项目" tabindex="-1"><a class="header-anchor" href="#自动放置网格项目" aria-hidden="true">#</a> 自动放置网格项目</h3><p>现在你应该知道了，在 CSS 网格布局中，只要在网格项目上使用 <code>grid-row</code> （<code>grid-row-start</code> 、<code>grid-row-end</code>）、<code>grid-column</code> （<code>grid-column-start</code> 、<code>grid-column-end</code>） 或 <code>grid-area</code> 属性指定具体的网格线名称或网格区域名称，那么网格项目就会<strong>被放置到明确指定的位置</strong> ，这种方式被称为<strong>明确放置网格项目</strong> 。</p><p>言外之意，没有使用这些属性指定明确位置的网格项目，它被称为 <strong>自动放置网格项目</strong> 。比如下图这种，网格项目根据 <code>grid-auto-flow</code> 指定的方向自动放置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f46cf02b5c9d4855b38304e0f4e4bebd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',4),G={href:"https://codepen.io/airen/full/yLEyEyq",target:"_blank",rel:"noopener noreferrer"},F=e("p",null,"也有可能会因为别的网格项目位置被调整而被迫调整，比如：",-1),I=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac60a1064d76440e91dcd59f7beaf804~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),A={href:"https://codepen.io/airen/full/vYrYKjP",target:"_blank",rel:"noopener noreferrer"},Q=r(`<p>你可能会好奇，它们是按照什么样的机制来放置网格项目的呢？其实，在 CSS 网格布局中，自动放置网格项目是由一个算法机制来决定的：</p><blockquote><p><strong>将网格项目的自动位置解析为明确的位置，确保每个网格项目都有一个明确的网格区域来放置（一个网格单元格也可以称为是一个网格区域）</strong>。</p></blockquote><p>在网格项目自动放置的算法中，网格跨度是不需要特别解决的。因为未显式指定 <code>span</code> 的值，即是默认值 <code>1</code>。另外，如果在一个显式网格系统中没有空间放置明确指定的网格项目，就有可能根据网格自动放置算法创建隐式的网格轨道（创建隐式的行或列），从而创建一个隐式网格。</p><p>另外，网格系统中的每个网格单元格（在显式网格或隐式网格中）都可以被占用或不被占用。如果一个网格单元格被一个有明确网格位置的网格项目覆盖，该网格单元格就被占用；否则，该网格单元格就未被占用。在这个算法中，一个网格单元格的占用或未占用状态是可以被改变的。</p><p>简单地说，自动放置网格项目会按下面五个步骤来放置网格项目：</p><ul><li>①：匿名网格项目的生成；</li><li>②：使用显式网格线名称（或网格区域）明确放置网格项目；</li><li>③：仅明确指定行位置；</li><li>④：确定隐式网格中的列数；</li><li>⑤：放置剩余的网格项目。</li></ul><p>用一个简单的示例来解释自动放置网格项目的五个步骤。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    我是一个文本节点(TextNode) &lt;!-- 文本节点被称为匿名网格项目 --&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="步骤-1-创建匿名网格项目" tabindex="-1"><a class="header-anchor" href="#步骤-1-创建匿名网格项目" aria-hidden="true">#</a> 步骤 ①：创建匿名网格项目</h4><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当自动放置网格项目算法试图将所有网格项目放在一个网格系统内时，发生的第一件事就是<strong>创建“匿名网格项目”</strong> （这个和 Flexbox 布局是相似的）。在网格系统中，<strong>网格容器内的文本节点，被称为匿名网格项目</strong> 。比如代码中的“<strong><code>我是一个文本节点(TextNode)</code></strong> ” 是网格容器 <code>.container</code> 直接内容，所以这行文本也是网格容器中的一个网格项目（即匿名网格项目）。</p><blockquote><p><strong>注意，网格容器的伪元素</strong> <strong><code>::before</code></strong> <strong>和</strong> <strong><code>::after</code></strong> <strong>生成的内容也被称为网格项目</strong> ，但它们不是匿名网格项目。</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d944ca2a84434a839c2bbd3094872ab2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),U={href:"https://codepen.io/airen/full/zYaxaWY",target:"_blank",rel:"noopener noreferrer"},X=r(`<p>CSS 中是没有相关的选择器可以选中网格容器中的“文本节点”的，因此，你也无法使用网格项目相关的属性（比如 <code>grid-row</code> 、<code>grid-column</code> 或 <code>grid-area</code> 等）来明确放置“匿名网格项目”。换句话说，网格中的“匿名网格项目”的位置，是按照网格系统中自动放置的算法来指定位置的。</p><h4 id="步骤2-使用显式网格线名称-或网格区域-明确放置网格项目" tabindex="-1"><a class="header-anchor" href="#步骤2-使用显式网格线名称-或网格区域-明确放置网格项目" aria-hidden="true">#</a> 步骤②：使用显式网格线名称（或网格区域）明确放置网格项目</h4><p>在网格布局中，总是有网格项目会使用 <code>grid-row</code> 、<code>grid-column</code> 或 <code>grid-area</code> 属性放置到指定的位置（根据网格线名称或网格区域名称），比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    grid-area: 1 / 2 / 2 / 4;
}

.item:nth-child(2) {
    grid-area: 2 / 1 / 4 / 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>网格项目 ①</code></strong> 和 <strong><code>网格项目 ②</code></strong> 各自的 <code>grid-area</code> 属性的值来定位（放置）：</p><ul><li>使用 <code>grid-area</code> 属性的第一个（<code>grid-row-start</code>）和第二个值（<code>grid-column-start</code>）来设置网格项目 <strong><code>网格项目 ①</code></strong> 和 <strong><code>网格项目 ②</code></strong> 的“左上角”的位置；</li><li>使用 <code>grid-area</code> 属性的第三个（<code>grid-row-end</code>）和第四个值（<code>grid-column-end</code>）来设置 <strong><code>网格项目 ①</code></strong> 和 <strong><code>网格项目 ②</code></strong> 的“右下角”的位置。</li></ul><p>即 <strong><code>网格项目 ①</code></strong> 和 <strong><code>网格项目 ②</code></strong> 被放置到指定位置，其他网格项目未显式指定位置，它们会按自动放置算法来放置。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9fae14c7aec4289bfe298e9f18ed4a7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),$={href:"https://codepen.io/airen/full/PoawBoB",target:"_blank",rel:"noopener noreferrer"},ee=r(`<h4 id="步骤3-仅明确指定行位置" tabindex="-1"><a class="header-anchor" href="#步骤3-仅明确指定行位置" aria-hidden="true">#</a> 步骤③：仅明确指定行位置</h4><p>通过前面的内容学习，可以获知，即使是根据网格线名称来明确放置网格项目，也不一定会指定四条网格线名称，往往可能只是指定了行的网格线位置（名称），但没有指定列的网格线位置（名称）。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container::before {
    grid-row: 1 / 4;
}

.item:nth-child(4) {
    grid-row: 3 / 5;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>::before</code> 伪元素和 <code>网格项目④</code> 使用 <code>grid-row</code> 指定了行网格线的起始和结束位置。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2197b98a63774bf99391d9fe76a082d8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),ie={href:"https://codepen.io/airen/full/ZERYjdK",target:"_blank",rel:"noopener noreferrer"},de=r(`<p>对于每个有明确行位置的网格项目（即 <code>grid-row-start</code>、<code>grid-row-end</code> 或 <code>grid-row</code> 明确放置的网格项目）只确定行位置，但列的位置并没有确定。此时，网格项目将按照修改后的文档顺序放置。换句话说，为了确定没有明确设置的列的位置（即，没有显式使用 <code>grid-column-start</code>、<code>grid-column-end</code> 或 <code>grid-column</code> 放置网格项目），该算法根据下面模式来处理：</p><ul><li><strong>稀疏算法（Sparse）</strong> ，也是默认算法：将其放置的列开始网格线设置为最早的（最小的正指数）网格线索引值，以确保此网格项目的网格区域不会与任何被占用的网格单元格重叠，并且该行超过了之前放置在此行的任何网格项目。</li><li><strong>密集算法（Dense）</strong> ：将其放置的列开始网格线设置为最早的（最小的正指数）网格线索引值，以确保这个网格项目的网格区域不会与任何占用的网格单元格重叠 。</li></ul><p>简单地说，默认的“<strong>稀疏算法（Sparse）</strong>”会产生网格洞（空的网格单元格）现象。比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/801a6de594664a6595dc9032bef23558~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>而“<strong>密集算法（Dense）</strong>”不会出现该现象。如果你在使用网格布局时，不想出现网格洞的现象，可以使用 <code>grid-auto-flow</code> 来改变，只需要使用 <code>row dense</code> 来替代 <code>row</code> ，<code>column dense</code> 替代 <code>column</code> 即可：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-auto-flow: row dense;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abd10f9034454a58a525faeaf4345c14~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),ne={href:"https://codepen.io/airen/full/rNKaqWR",target:"_blank",rel:"noopener noreferrer"},re=r(`<p>注意，由于 <code>grid-auto-flow</code> 的默认值是 <code>row</code> ，所以你会看到 <code>grid-auto-flow</code> 取 <code>dense</code> 和 <code>row dense</code> 的效果是一样的。</p><h4 id="步骤4-确定隐式网格中的列数" tabindex="-1"><a class="header-anchor" href="#步骤4-确定隐式网格中的列数" aria-hidden="true">#</a> 步骤④：确定隐式网格中的列数</h4><p>接下来，该算法试图确定隐式网格中的列数。可以通过下面的步骤来完成：</p><ul><li>该算法从显式网格中的列数开始；</li><li>然后，它遍历所有有明确列位置的网格项目，并在隐式网格的开头和结尾增加列轨道，以容纳所有网格项目；</li><li>最后，它通过所有没有明确列位置的网格项目。如果所有没有明确列位置的网格项目中最大的列跨度大于显式网格的宽度，则在网格的末端增加列以适应这个列跨度。</li></ul><p>在上面的示例中，<code>grid-template-columns</code> 和 <code>grid-template-rows</code> 创建了一个三行三列（<code>3 x 3</code> ）的网格：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    grid-auto-columns: 100px;
    grid-auto-rows: 100px;
    grid-auto-flow: var(--auto-flow);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时使用 <code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 指定了隐式网格轨道尺寸，示例中因个别网格项目放置的位置超出了显式网格区域，因此创建了部分隐式行网格轨道。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例中 <strong><code>网格项目④</code></strong> 明确指定了起始列网格线位置，即网格线编号是 <code>4</code> （<code>grid-column-start: 4</code>），同时使用 <code>span 2</code> 向右合并两列（<code>grid-column-end: span 2</code>）。这意味着 <strong><code>网格项目④</code></strong> 放置在显式网格之外，也会因该网格项目新增两列隐式列网格轨道。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38f7d35ae5764d12a4e329b9dcd1e482~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),le={href:"https://codepen.io/airen/full/dyKopPq",target:"_blank",rel:"noopener noreferrer"},se=r(`<h4 id="步骤5-放置剩余的网格项目" tabindex="-1"><a class="header-anchor" href="#步骤5-放置剩余的网格项目" aria-hidden="true">#</a> 步骤⑤：放置剩余的网格项目</h4><p>剩余的网格项目指的是没有显式使用 <code>grid-row</code> 、<code>grid-column</code> 、<code>grid-area</code> 属性放置的网格项目，同时也没有使用 <code>span</code> 合并网格单元格的项目。对于这些网格项目而言，最终位置是由 <code>grid-auto-flow</code> 属性来决定，该属性会确定网格项目的两个东西：</p><ul><li><strong>方向</strong> ：<code>row</code>（默认）或 <code>column</code>，定义了在需要插入自动放置网格项目时，网格要增长的方向（增长行或列）；</li><li><strong>模式</strong> ：稀疏（Sparse，默认的）或 密集（Dense），根据打包模式，算法将在插入自动放置的网格项目时，尝试密集（填充）或稀疏（不填充）网格中的所有洞（没有被占用的网格单元格）。</li></ul><p>因此，<code>grid-auto-flow</code> 属性的值可以是<code>row dense</code>、<code>column dense</code> 或 <code>dense</code> 等，用来决定网格项目自动放置的所需行为。</p><p>也就是说，在 CSS 网格中除了使用明确指定网格项目位置的属性之外，还可以使用 <code>grid-auto-flow</code> 有不同模式来自动放置网格项目。</p><h2 id="网格项目重叠" tabindex="-1"><a class="header-anchor" href="#网格项目重叠" aria-hidden="true">#</a> 网格项目重叠</h2><p>到目前为止，我们所阐述的网格项目都是用不同的网格区域来放置网格项目，但网格布局中的网格项目有可能是会重叠在一起的。因为我们在放置网格项目或合并网格单元格时，可能会让网格项目位置位于同一个网格单元格，即 <strong>在同一个网格单元格或网格区域重叠</strong> 。</p><p>简单地说，<strong>欲让网格项目重叠，则必须把网格项目放置在相同的网格单元格中</strong> 。 在 CSS 网格布局中有多种不同的方法可以达到这个目的：</p><ul><li>使用网格线索引号；</li><li>使用命名的网格线；</li><li>使用命名的网格区域；</li><li>合并网格单元格（即，跨越网格项目）。</li></ul><p>比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码，将：</p><ul><li>网格项目 <code>header</code> 放置在第一行，并且跨三列；</li><li>网格项目 <code>footer</code> 放置在第三行，并且跨三列；</li><li>网格项目 <code>nav</code> 放置在第一列，并且跨三行，它和网格项目 <code>header</code> 在第一行第一列的位置相互重叠，和网格项目 <code>footer</code> 在第三行第一列的位置相互重叠；</li><li>网格项目 <code>main</code> 放置在第二行第二列；</li><li>网格项目 <code>sidebar</code> 放置在第三列，它和网格项目 <code>header</code> 在第一行和第三列的位置相互重叠，和网格项目 <code>footer</code> 在第三行第三列相互重叠。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eb9a0602c8045a78dbedb77726efb9c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,14),ae={href:"https://codepen.io/airen/full/dyKopwB",target:"_blank",rel:"noopener noreferrer"},ce=r(`<p>既然有网格项目相互重叠（<code>z</code> 轴上的重叠），就有必要控制其 <code>z</code> 轴的优先级。在网格布局中，网格项目的定位元素（<code>position</code> 值不是 <code>static</code> 的元素）相似，可以使用 CSS 的 <code>z-index</code> 属性来控制其在 <code>z</code> 轴上的层级。简单地说，<code>z-index</code> 越大，它越在顶层；如果没有显式设置 <code>z-index</code> 值来改变 <code>z</code> 轴上的层级，将会由网格项目在文档中出现的先后顺序来决定，越往后出现，它在 <code>z</code> 轴的层级越高。</p><p>比如上面的示例中，网格项目 <code>header</code> 在 <code>z</code> 轴的最底下，网格项目 <code>nav</code> 和网格项目 <code>sidebar</code> 在 <code>z</code> 轴上比网格项目 <code>header</code> 更高（所以重叠部分会遮盖网格项目 <code>header</code>），但又比网格项目 <code>footer</code> 低，所以与网格项目 <code>footer</code> 重叠部分被网格项目 <code>footer</code> 遮盖了。你可以像下面这样，在网格项目 <code>header</code> 上显式设置 <code>z-index</code> 的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header{
    z-index: 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ba50f7753664140af0b31eb80020084~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>因此，使用 CSS 网格布局，可以轻易实现一些重叠的 Web 布局效果，比如下面这个效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa020f9ffe9a4592a0f9e95649d795e0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>具体实现的代码如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>main {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddbed5ea5ff14a4daef8df3e77e310f9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),oe={href:"https://codepen.io/airen/full/OJEVWRo",target:"_blank",rel:"noopener noreferrer"},te=r(`<p>你还可以利用网格项目重叠的特性，实现类似下图杂志排版的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/967e6fa9e77745b1a8ebf579958c9fb6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>可以将上图这样的杂类效果的布局分解成一个网格，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb8e0ee641064d9fadc0feeebb5b3b64~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.magazine  { 
    display: grid; 
    grid-template-rows: 130px 2fr 1fr; 
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 定义了一个 <code>3 x 4</code> 的网格（三行四列）。外侧的列比内侧的列要宽一些。第一行高度为 <code>130px</code>，第二行是第三行的两倍高。不过内容（即 HTML 的结构有点让你感到蛋疼）拆分有点小细节需要注意：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc64d7f5b2f14db585bef7f9bf7eedff~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>对应的 HTML：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code> &lt;div class=&quot;magazine&quot;&gt; 
     &lt;!-- 区域1 --&gt; 
     &lt;div class=&quot;item green&quot;&gt;&lt;/div&gt; 
     
     &lt;!-- 区域2 --&gt; 
     &lt;div class=&quot;item blue&quot;&gt;&lt;/div&gt; 
     
     &lt;!-- 区域3 --&gt; 
     &lt;div class=&quot;item purple&quot;&gt;&lt;/div&gt; 
     
     &lt;!-- 区域4 --&gt; 
     &lt;div class=&quot;item orange&quot;&gt;&lt;/div&gt; 
     
     &lt;!-- 区域5 --&gt; 
     &lt;div class=&quot;item meired&quot;&gt;&lt;/div&gt; 
     
     &lt;!-- 区域6 --&gt; 
     &lt;div class=&quot;item black&quot;&gt;&lt;/div&gt; 
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按上面示意图放置每个网格项目的位置：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.green { 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加额外的样式，我们就实现了一个类似杂志的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd96d13968674d59bc970467b6ebf886~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,14),ve={href:"https://codepen.io/airen/full/vYrOgwV",target:"_blank",rel:"noopener noreferrer"},me=r('<p>很有意思吧。我们仅使用网格重叠相关的特性就实现了类似杂志的布局。事实上，通过重叠的网格项目，我们还可以实现很多很酷的效果。感兴趣的同学也不妨一试。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>到了这里，我想你已经对 CSS 网格布局有了一定的了解。你可以在基于 <code>grid-template-*</code> 和 <code>grid-auto-*</code> 等属性定义的网格上，使用 <code>grid-row</code> （<code>grid-row-start</code> 和 <code>grid-row-end</code> ）、<code>grid-column</code> （<code>grid-column-start</code> 和 <code>grid-column-end</code>）或 <code>grid-area</code> 属性指定网格线名称或网格区域名称，将网格项目放置到任意位置。这个位置可以是 <code>grid-template-*</code> 等属性创建的显式网格上，也可以是 <code>grid-auto-*</code> 等属性创建的显式网格上。</p><p>在网格布局中，<code>grid-row</code> 、<code>grid-column</code> 和 <code>grid-area</code> 除了可以将网格项目放置到指定位置之外，还可以创建隐式网格，即，它们将网格项目放置到显式网格之外的同时也创建了一个隐式网格。</p><p>另外，网格布局中的网格项目除了根据网格线名称或网格区域名称放置到指定位置之外，还可以自动放置。换句话说，如果没有明确指定位置的网格项目都属于自动放置，<code>grid-auto-flow</code> 属性的值可以决定自动放置网格项目的方向和模式。</p><p>网格项目在被开发者放置到指定位置时，很容易造成网格项目的重叠，你可以通过 <code>z-index</code> 来控制重叠的网格项目在 <code>z</code> 轴的优先级。而且可以利用该特性构建一些重叠的布局效果，比如类似杂志的 Web 布局效果。甚至你还可以发挥你的创意，构建更多有创意的 Web 布局。</p>',6);function ue(be,ge){const d=s("ExternalLinkIcon");return a(),c("div",null,[t,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",v,[i("https://codepen.io/airen/full/rNKNOoJ"),n(d)])])]),m,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",u,[i("https://codepen.io/airen/full/eYKYJgj"),n(d)])])]),b,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",g,[i("https://codepen.io/airen/full/gOKOPKm"),n(d)])])]),p,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",f,[i("https://codepen.io/airen/full/jOKOWvx"),n(d)])])]),h,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",S,[i("https://codepen.io/airen/full/LYrYZPe"),n(d)])])]),w,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",_,[i("https://codepen.io/airen/full/vYrYKjP"),n(d)])])]),k,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",C,[i("https://codepen.io/airen/full/JjZjRbV"),n(d)])])]),x,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",j,[i("https://codepen.io/airen/full/LYrYbKO"),n(d)])])]),q,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",y,[i("https://codepen.io/airen/full/mdKdRpg"),n(d)])])]),z,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",K,[i("https://codepen.io/airen/full/qBKBvOP"),n(d)])])]),Y,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",D,[i("https://codepen.io/airen/full/LYrYajd"),n(d)])])]),L,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",W,[i("https://codepen.io/airen/full/KKeKEYa"),n(d)])])]),O,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",E,[i("https://codepen.io/airen/full/RwJwmYx"),n(d)])])]),R,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",T,[i("https://codepen.io/airen/full/mdKdZLo"),n(d)])])]),N,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",P,[i("https://codepen.io/airen/full/jOKEZLv"),n(d)])])]),B,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",M,[i("https://codepen.io/airen/full/WNybzvW"),n(d)])])]),H,J,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",V,[i("https://codepen.io/airen/full/GRGgdeq"),n(d)])])]),Z,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",G,[i("https://codepen.io/airen/full/yLEyEyq"),n(d)])])]),F,I,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",A,[i("https://codepen.io/airen/full/vYrYKjP"),n(d)])])]),Q,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",U,[i("https://codepen.io/airen/full/zYaxaWY"),n(d)])])]),X,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",$,[i("https://codepen.io/airen/full/PoawBoB"),n(d)])])]),ee,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ie,[i("https://codepen.io/airen/full/ZERYjdK"),n(d)])])]),de,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ne,[i("https://codepen.io/airen/full/rNKaqWR"),n(d)])])]),re,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",le,[i("https://codepen.io/airen/full/dyKopPq"),n(d)])])]),se,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ae,[i("https://codepen.io/airen/full/dyKopwB"),n(d)])])]),ce,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",oe,[i("https://codepen.io/airen/full/OJEVWRo"),n(d)])])]),te,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ve,[i("https://codepen.io/airen/full/vYrOgwV"),n(d)])])]),me])}const fe=l(o,[["render",ue],["__file","index-14.html.vue"]]);export{fe as default};
