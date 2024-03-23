import{_ as o,M as t,p as l,q as s,R as e,t as i,N as d,a1 as c}from"./framework-e8cb8151.js";const a={},r=c('<h1 id="_15-grid-布局中的对齐方式" tabindex="-1"><a class="header-anchor" href="#_15-grid-布局中的对齐方式" aria-hidden="true">#</a> 15-Grid 布局中的对齐方式</h1><p>CSS 网格布局除了提供定义网格和放置网格项目的相关属性之外，也提供了一些控制对齐方式的属性。这些控制对齐方式的属性，和 Flexbox 布局中的对齐属性 <code>justify-*</code> 、<code>align-*</code> 、<code>*-items</code> 、<code>*-content</code> 、 <code>*-self</code> 等是相似的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cfe8d501cbf40e381c262cc65205e10~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在网格布局中可以用它们来控制网格项目在内联轴（Inline Axis）和块轴（Block Axis）的对齐方式；也可以用来控制网格轨道在内联轴（Inline Axis）和块轴（Block Axis）的对齐方式。</p>',4),p={href:"https://juejin.cn/book/7161370789680250917/section/7161623670622781471",target:"_blank",rel:"noopener noreferrer"},u=c(`<h2 id="网格布局中的轴线" tabindex="-1"><a class="header-anchor" href="#网格布局中的轴线" aria-hidden="true">#</a> 网格布局中的轴线</h2><p>对于大多数开发者来说，他们都知道 Web 有两根轴线：水平方向的 <code>x</code> 轴和垂直方向的 <code>y</code> 轴。只不过，在 Flexbox 布局中，不再称 <code>x</code> 轴和 <code>y</code> 轴了，它由 Flexbox 中的主轴（Main Axis）和侧轴（Cross Axis）替代了，并且 Flexbox 的主轴不再绝对的是 <code>x</code> 轴，侧轴也不再绝对的是 <code>y</code> 轴，它由 <code>flex-direction</code> 属性的值来决定：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c65c3b6710e34f3b806096d86c3f9a88~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>由于网格布局是唯一的二维布局，因此，网格布局中也有两条轴线，这两条轴线既不称为水平的 <code>x</code> 轴和垂直方向的 <code>y</code> 轴，也不像 Flexbox 布局中称为主轴和侧轴。它们有着新命名的两条轴线，即内联轴（Inline Axis）和块轴（Block Axis）：</p><ul><li><strong>内联轴（Inline Axis）</strong> ：主要定义网站的文本流方向，也就是文本的阅读方式，CSS 的 <code>direction</code> 或 HTML 的 <code>dir</code> 会影响内联轴的方向。</li><li><strong>块轴（Block Axis）</strong> ：主要定义网站文档（元素块）流，CSS 的书写模式 <code>writing-mode</code> 会影响块轴的方向。</li></ul><p>即，内联轴和块轴会受 CSS 的 <code>direction</code> 、<code>writing-mode</code> 和 HTML 的 <code>dir</code> 属性值的影响，这个有点类似于 Flexbox 布局的主轴和侧轴，不是固定不变的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee6bbb25e80440595cd2b888d685c59~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>网格布局中的内联轴（Inline Axis）和块轴（Block Axis）可以和网格中的行与列相映射，比如书写模式和阅读模式是 <code>ltr</code>（Left-To-Right）时，内联轴也称为行轴（Row Axis），块轴也称为列轴（Column Axis）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa6c0a8b030d479795e307cf8aafbcef~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>需要注意的是，虽然内联轴（Inline Axis）和块轴（Block Axis）会因 CSS 的书写模式或文档的阅读模式改变，但网格中的行轴和列轴是始终不变的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/116d44dec0a3439390088c8ed8547df1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>网格布局中，你就可以沿着这两条轴线来控制网格项目或网格轨道的对齐方式。</p><blockquote><p><strong>特别声明，如无特别指出，我们都以书写模式和阅读模式是</strong> <strong><code>ltr</code></strong> <strong>（Left-To-Right）为例，即可内联轴对应的是行轴，块轴对应的是列轴</strong> 。</p></blockquote><h2 id="网格布局中的对齐方式" tabindex="-1"><a class="header-anchor" href="#网格布局中的对齐方式" aria-hidden="true">#</a> 网格布局中的对齐方式</h2><p>在 Flexbox 布局中，可以在 Flex 容器的主轴和侧轴方向控制 Flex 项目的对齐方式。在 Grid 布局中，将按照内联轴和块轴两个方向来控制 <strong>网格轨道</strong> 和 <strong>网格项目</strong> 的对齐方式：</p><ul><li>控制“网格项目”沿块轴方向的对齐属性有： <code>align-items</code> 和 <code>align-self</code> ，其中 <code>align-items</code> 运用于网格容器上，<code>align-self</code> 运用于网格项目上。</li><li>控制“网格项目”沿内联轴方向的对齐属性有：<code>justify-items</code> 和 <code>justify-self</code> ，其中 <code>justify-items</code> 运用于网格容器上，<code>justify-self</code> 运用于网格项目上。</li><li>控制“网格轨道”沿块轴方向对齐的属性有：<code>align-content</code> ，该属性运用于网格容器上。</li><li>控制“网格轨道”沿内联轴方向对齐的属性有：<code>justify-content</code> ，该属性运用于网格容器上。</li></ul><p>也可以按下面这样的方式来划分：</p><ul><li><strong>对齐网格项目</strong> ：<code>justify-items</code> 和 <code>justify-self</code> 沿着内联轴方向对齐网格项目，而<code>align-items</code> 和 <code>align-self</code> 沿着块轴方向对齐网格项目，其中 <code>justify-items</code> 和 <code>align-items</code> 被运用于网格容器，而 <code>justify-self</code> 和 <code>align-self</code> 被运用于网格项目。</li><li><strong>对齐网格轨道</strong> ：<code>align-content</code> 沿着块联轴方向对齐网格轨道，<code>justify-content</code> 沿着内联轴方向对齐网格轨道，它们都被运用于网格容器。</li></ul><p>我们先来看网格项目的对齐。</p><h3 id="网格项目对齐" tabindex="-1"><a class="header-anchor" href="#网格项目对齐" aria-hidden="true">#</a> 网格项目对齐</h3><p>控制网格项目的对齐方式的属性主要有:</p><ul><li><code>justify-items</code> 和 <code>justify-self</code> 控制网格项目沿着内联轴（文本书写方向的行轴）方向对齐；</li><li><code>align-items</code> 和 <code>align-self</code> 控制网格项目沿着块轴（块方向的列轴）方向的对齐。</li></ul><p>这几个属性都可以接受 <code>auto</code> 、<code>normal</code> 、<code>start</code> 、<code>end</code> 、<code>center</code> 、<code>stretch</code> 、 <code>baseline</code> 、<code>first baseline</code> 和 <code>last baseline</code> 值，但常用的值只有 <code>start</code> 、<code>end</code> 、<code>center</code> 和 <code>stretch</code> （默认值）。其中 <code>start</code> 、<code>center</code> 和 <code>end</code> 表示相应轴的起点位置，中心位置和终点位置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44d0a3da72984dcab95c35a0d220fe6f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>注意，这几个属性都是用来控制网格项目在所处网格区域内的内联轴或块轴方向的对齐，如果没有跨网格单元格，则在对应的网格单元格内的内联轴或块轴方向的对齐。</p><p>假设你有下面这样的一个网格：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;!-- 此处省略四个 item --&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
.container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 80px;
    grid-auto-columns: 80px;
    grid-template-areas:
      &quot;a a a a b b b b&quot;
      &quot;a a a a b b b b&quot;
      &quot;c c c c d d d d&quot;
      &quot;c c c c d d d d&quot;;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码构建了一个四行十列（<code>4 x 10</code>）的隐式网格，并且使用 <code>grid-area</code> 分别将网格项目放置到指定的网格区域：</p><ul><li>网格项目一放置在网格区域 <code>a</code> ；</li><li>网格项目二放置在网格区域 <code>b</code> ；</li><li>网格项目三放置在网格区域 <code>c</code> ；</li><li>网格项目四放置在网格区域 <code>d</code> 。</li></ul><p>使用 <code>grid-row</code> 和 <code>grid-column</code> 将网格项目五放置指定的区域内（合并四行两列），相当于放置在 <code>grid-area: 1 / 9 / 5 \`\`/\`\` 11</code> 区域内：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377823c139f14cdbbb55085f88fe2187~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可以在网格容器上显式设置 <code>align-items</code> 属性的值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    align-items: var(--align-items, stretch);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bbe2af1d92547539266c5e186afe463~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示：</p><ul><li><code>start</code> 将网格项目和所处网格区域在块轴的起始位置重叠；</li><li><code>end</code> 将网格项目和所处网格区域在块轴的结束位置重叠；</li><li><code>center</code> 将网格项目和所处网格区域在块轴中心位置重叠（类似垂直居中）；</li><li><code>stretch</code> 将网格项目拉伸与所处网格区域高度相同，相当于与网格区域的块轴方向起始、结束位置同时重叠（类似垂直方向的拉伸）。</li></ul><p>另外，<code>align-items</code> 取值为 <code>auto</code> 、<code>normal</code> 和 <code>last baseline</code> 值时，与取值 <code>stretch</code> 值效果等同；<code>baseline</code> 和 <code>first baseline</code> 的效果与 <code>start</code> 等同：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b368a2fb244036879fee897cb936c9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,38),m={href:"https://codepen.io/airen/full/zYavJow",target:"_blank",rel:"noopener noreferrer"},v=c(`<p>一旦在网格容器上设置了 <code>align-items</code> 的值是 <code>stretch</code> 的其他值之后，所有网格项目的高度（块轴方向尺寸，<code>block-size</code>）都将会由其内容的高度决定。另外，在网格容器上显式设置了 <code>align-items</code> 的值，就相当于在所有网格项目上设置了 <code>align-self</code> 的值。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    align-items: var(--align-items, stretch);
}

/* 等同于 */
.container &gt; * {
    align-self: var(--align-items, stretch)；
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，你也可以在单个网格项目上显式设置 <code>align-self</code> 的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    align-self: start;
}

.item:nth-child(2) {
    align-self: end;
}

.item:nth-child(3) {
    align-self: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ae4d6b56ab9494faedfbe9687127fa8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),b={href:"https://codepen.io/airen/full/VwdvELO",target:"_blank",rel:"noopener noreferrer"},g=c(`<p>你可以同时显式设置网格容器的 <code>align-items</code> 和单个网格项目的 <code>align-self</code> 的值，只不过最终由网格项目上的 <code>align-self</code> 值来决定（没有显式设置 <code>align-self</code> 的网格项目则由 <code>align-items</code> 决定）。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    align-items: var(--align-items, stretch);
}

.item:nth-child(1) {
    align-self: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个示例，网格项目一在块轴方向始终是是垂直居中的，因为它显式设置了 <code>align-self</code> 的值为 <code>center</code> ，其他网格项目在块轴的对齐方式则由网格容器上的 <code>align-items</code> 属性的值来决定：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f74ae2a117834dffb6b0439f4051e5a2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),f={href:"https://codepen.io/airen/full/NWzGOpp",target:"_blank",rel:"noopener noreferrer"},h=c(`<p>与 <code>align-items</code> 和 <code>align-self</code> 相似的是，你可以在网格容器上设置 <code>justify-items</code> 属性和在网格项目上设置 <code>justify-self</code> 属性，控制网格项目在内联轴的对齐方式。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    justify-items: var(--justify-items, stretch);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4492253aa2274f1283fe3873ea35e392~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示：</p><ul><li><code>start</code> 将网格项目和所处网格区域在内联轴的起始位置重叠；</li><li><code>end</code> 将网格项目和所处网格区域在内联轴的结束位置重叠；</li><li><code>center</code> 将网格项目和所处网格区域在内联轴中心位置重叠（类似水平居中）；</li><li><code>stretch</code> 将网格项目拉伸与所处网格区域宽度相同，相当于与网格区域的内联轴方向起始、结束位置同时重叠（类似水平方向的拉伸）。</li></ul><p>同样的，<code>justify-items</code> 取值是 <code>auto</code> 、<code>normal</code> 和 <code>last baseline</code> 时与 <code>stretch</code> 值效果等同；<code>baseline</code> 和 <code>first baseline</code> 的效果与 <code>start</code> 等同：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/047a6004abeb4eb995708829bdb6011a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),x={href:"https://codepen.io/airen/full/gOKaBvw",target:"_blank",rel:"noopener noreferrer"},j=c(`<p>和 <code>align-items</code> 一样，当你在网格容器上设置了 <code>justify-items</code> 时，就等同于在所有网格项目上设置了 <code>justify-self</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    justify-items: var(--justify-items, stretch);
}

/* 等同于 */
.container &gt; * {
    justify-self: var(--justify-items, stretch);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以根据需要，在网格项目上单独设置 <code>justify-self</code> 属性的值，控制单独网格项目在内联轴方向的对齐：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item:nth-child(1) {
    justify-self: start;
}

.item:nth-child(2) {
    justify-self: center;
}

.item:nth-child(3) {
    justify-self: end;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62fd3473635043629d7d54dd4be44f79~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),S={href:"https://codepen.io/airen/full/qBKOJLW",target:"_blank",rel:"noopener noreferrer"},y=c(`<p>如果在网格容器上设置了 <code>justify-items</code> 属性的值，并且在网格项目上也显式设置了 <code>justify-self</code> 属性的值，那么最终网格项目在内联轴方向的对齐由 <code>justity-self</code> 属性的值来决定。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    justify-items: var(--justify-items, stretch);
}

.item:nth-child(1) {
    justify-self: center; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b080e916920b4fc4a294a5c9a7845d81~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),k={href:"https://codepen.io/airen/full/RwJWeOG",target:"_blank",rel:"noopener noreferrer"},_=c(`<p>你可能已经发现了，当 <code>justify-items</code> 或 <code>justify-self</code> 属性的值不是默认值 <code>strecth</code> 时，网格项目的宽度（内联轴方向的尺寸，<code>inline-size</code>）就会发生变化，与 <code>auto</code> 值相似。</p><p>在网格布局中，<code>justify-items</code> 和 <code>align-items</code> 还可能简写成 <code>place-items</code> ；<code>justify-self</code> 和 <code>align-self</code> 可以简写成 <code>place-self</code> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>place-items: &lt;align-items&gt;  &lt;justify-items&gt;
place-self:  &lt;align-self&gt;  &lt;justify-self&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>place-items</code> 和 <code>place-self</code> 只取一个值时，表示两个属性的值相同，否则第一个值用于 <code>align-*</code> ，第二个值则用于 <code>justif-*</code> ，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>注意，<code>justify-items</code></strong> <strong>和</strong> <strong><code>justify-self</code></strong> <strong>两属性不能运用于 Flexbox 布局，主要是因为 Flexbox 布局是一个一维布局，在单个轴上有很多个元素（Flex 项目），无法单独对齐其中某一个元素（Flex 项目）</strong> 。</p></blockquote><p>不知道你是否已经发现了，在 Web 布局中，又多了两种实现水平居中的布局技术。在网格布局中，你可以使用下面这两种技术，让某个元素（Grid 项目）水平垂直居中在另一个元素（网格区域）中：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;我要水平垂直居中&lt;/div&gt;
&lt;/div&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d977a0a1f10049e9a8fc9264361e4a27~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),C={href:"https://codepen.io/airen/full/YzvyRGN",target:"_blank",rel:"noopener noreferrer"},z=c(`<p>上面这个示例效果，你还可以在网格项目上使用 <code>place-self</code> 来替代网格容器上的 <code>place-items</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
  display: grid;
}

.item {
  grid-area: 1 / 1 / -1 / -1;
  
  place-self: center;
  
  /* 等同于 */
  align-self: center;
  justify-self: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaaa316b4c8443599a7c53ec9b5b39b7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),q={href:"https://codepen.io/airen/full/qBKbwKp",target:"_blank",rel:"noopener noreferrer"},F=c(`<p>再次强调一下，<code>justify-items</code> 、<code>align-items</code> 、<code>justify-self</code> 和 <code>align-self</code> 都是用来控制网格项目自身所处网格区域的内联轴和块轴方向的对齐，如果网格项目没有明确放置，将按自动放置的算法来计算网格区域，一般就是网格单元格，因为网格单元格也是一个网格区域，网格中默认的最小网格区域：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b4952c534814c58bc6aa009e81a7112~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),w={href:"https://codepen.io/airen/full/xxzwQpV",target:"_blank",rel:"noopener noreferrer"},G=c(`<p>用下面这张图来总结网格项目在内联轴和块轴上对齐方式的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34f95b07e31d4bfe9805b51a6d2cc1e1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="网格轨道对齐" tabindex="-1"><a class="header-anchor" href="#网格轨道对齐" aria-hidden="true">#</a> 网格轨道对齐</h3><p>CSS Grid 布局中的对齐方式和 Flexbox 布局中的对齐方式最大的不同之处是：</p><blockquote><p><strong>在网格布局中，除了可以控制网格项目在内联轴和块轴的方向对齐之外，还可以控制网格轨道在内联轴和块轴方向的对齐</strong> 。</p></blockquote><p>在网格布局中，所有网格轨道尺寸所占据的空间可能会小于网格容器空间：</p><ul><li><strong>内联轴方向</strong> ：所有列网格轨道的尺寸总和小于网格容器内联轴方向的尺寸（<code>inline-size</code>），即在 <code>grid-template-columns</code> （或 <code>grid-auto-columns</code>）定义的列轨道尺寸总和小于网格容器的宽度；</li><li><strong>块轴方向</strong> ：所有行网格轨道的尺寸总和小于网格容器块轴方向的尺寸（<code>block-size</code>），即在 <code>grid-tempalte-rows</code> （或 <code>grid-auto-rows</code>）定义的行轨道尺寸总和小于网格容器高度。</li></ul><p>这样你就可以分别在网格容器的：</p><ul><li><strong>内联轴方向</strong> ：<code>justify-content</code> 控制列网格轨道在内联轴方向的对齐方式，即控制网格列的对齐；</li><li><strong>块轴方向</strong> ：<code>align-content</code> 控制行网格轨道在块轴方向的对齐方式，即控制网格行的对齐。</li></ul><p>它们（<code>justify-content</code> 和 <code>align-content</code> 属性）可设置的值是：<code>normal</code> 、<code>start</code> 、<code>end</code> 、<code>center</code> 、<code>stretch</code> 、<code>space-around</code> 、<code>space-between</code> 、<code>space-evenly</code> 、<code>baseline</code> 、<code>first baseline</code> 和 <code>last baseline</code> 。</p><p>同样的，我们使用下面这个示例来向大家展示 <code>justify-content</code> 和 <code>align-content</code> 取不同值的效果会是什么？</p><p>假设你有一个 <code>500px x 500px</code> 的网格容器，即网格容器的内联轴方向的尺寸（<code>inline-size</code>）和块轴方向尺寸（<code>block-size</code>）都是 <code>500px</code> 。使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 定义了一个三行三列（<code>3 x 3</code> ）的网格，并且网格轨道尺寸都是 <code>100px</code> ，同时网格轨道之间有 <code>10px</code> 的间距：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    inline-size: 500px;
    block-size: 500px;
    
    display: grid;
    gap: 10px;
    
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fbd1df278d24d5e9719dbf630449e7a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>可以像 Flexbox 布局中的 <code>justify-content</code> 和 <code>align-content</code> 一样，将剩余空间分配到网格轨道之间。</p><p>在网格容器上将 <code>align-content</code> 设置不同值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    align-content: var(--align-content, start);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c6b387290941e2935ba6535e347df8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),L={href:"https://codepen.io/airen/full/MWXKjVj",target:"_blank",rel:"noopener noreferrer"},D=c(`<p>你会发现，在这个示例中，<code>align-content</code> 取值为 <code>normal</code> 、<code>stretch</code> 、<code>baseline</code> 、<code>first baseline</code> 、<code>last baseline</code> 的效果与 <code>start</code> 是等同的。事实上，<code>algin-content</code> 取值 <code>stretch</code> 时会对网格轨道进行拉伸，但并不是所有情景都是如此，它对网格轨道尺寸的设置是有一定要求的。有关于这方面，我们将放到后面与 <code>justify-content</code> 统一阐述。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcb789f9d9e64410a1f585f06d4b7c0f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然说 <code>align-content</code> 是用来控制网格行轨道在网格容器块轴方向的对齐方式，但从另一个角度来说，也是将网格容器的剩余空间分配给网格轨道之间。比如：</p><p><code>align-content</code> 取值为 <code>center</code> 时，网格容器的剩余空间将一分为二，第一行网格轨道在块轴的起始位置与网格容器块轴方向超始位置的距离等于最后一行网格轨道在块轴的结束位置与网格容器块轴方向结束位置的距离：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/510a9f2f859443c2bfe6c1c6d0d58f7a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>如果网格容器只有一行行网格轨道时，可以实现垂直居中的效果</strong> 。</p></blockquote><p><code>align-content</code> 取值为 <code>space-around</code> 时，分配给相邻两行网格道之间的网格容器的剩余空间，是第一行网格轨道块轴起始位置距网格容器块轴方向起始位置之间距离的两倍，也是最后一行网格轨道块轴结束位置距网格容器块轴方向结束位置之间距离的两倍。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54d029f1bd774f739104a20ed319287d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>align-content</code> 取值 <code>space-evenly</code> 的效果和 <code>space-around</code> 有点相似，只不过，分配给相邻两行网格轨道之间的网格容器的剩余空间，和第一行网格轨道块轴方向起始位置与网格容器块轴方向起始位置之间的距离相等，也和最后一行网格轨道块轴方向结束位置与网格容器块轴方向结束位置之间的距离相等：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e3f779172674a9ba1a6c74a463d5f70~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>align-content</code> 取值为 <code>space-between</code> 会令行网格轨道在网格容器块轴方向两端对齐，即网格容器的剩余空间会平均分配到相邻两行行网格轨道之间：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2ed5e7fd2ff4ec5a5ee9c342c0cd417~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>需要注意的是，当行网格轨道的尺寸是 <code>fr</code> 值时，<code>align-content</code> 取任何值的效果都和其默认值 <code>start</code> 等同。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-rows: 1fr 100px 100px;
    
    /* 或 */
    grid-template-rows: minmax(100px, 1fr) 100px 100px;
    
    /* 或 */
    grid-auto-rows: 1fr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb4627d5c6864a25bcd2f65255d6433a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),M={href:"https://codepen.io/airen/full/poKgeMR",target:"_blank",rel:"noopener noreferrer"},W=c(`<p>也就是说，<strong>当网格容器没有剩余空间时，</strong><code>align-content</code> <strong>各值的效果都相同，即等同于</strong> <strong><code>align-content</code></strong> <strong>的</strong> <strong><code>start</code></strong> <strong>（默认值效果）</strong> 。</p><p>既然网格容器有剩余空间，也就有可能会有不足空间出现，比如将示例中的行网格轨道尺寸设置为：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-rows: 70% 120px 120px; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>网格项目溢出网格容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ccf09937ed24168bd77d0500c057692~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),K={href:"https://codepen.io/airen/full/dyKGWYa",target:"_blank",rel:"noopener noreferrer"},R=c(`<p>网格项目溢出网格容器时，<code>align-content</code> 取值不同时，溢出方向也有所差异：</p><ul><li><code>start</code> ，网格项目在网格容器块轴方向结束位置溢出；</li><li><code>end</code> ，网格项目在网格容器块轴方向起始位置溢出；</li><li><code>center</code> ，网格项目在网格容器块轴两个方向溢出；</li><li><code>stretch</code> 与 <code>start</code> 等同；</li><li><code>space-around</code> 与 <code>center</code> 等同；</li><li><code>space-between</code> 与 <code>start</code> 等同；</li><li><code>space-evenly</code> 与 <code>center</code> 等同。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08d4124aaa042a5bc66ed1d00639258~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在网格容器上显式设置 <code>align-content</code> 值时，还有可能会造成网格区域变大。比如下面这个示例，网格项目一合并了两行两列。当 <code>align-content</code> 取值 <code>space-around</code> 、<code>sapce-evenly</code> 和 <code>space-between</code> 时，行网格轨道之间的间距就会产生变化，这样对于合并多行的网格项目一来说，尺寸（块轴方向尺寸，<code>block-size</code>）也会产生相应变化：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80a173fcce0b40f5a427e93e2d9ffdf0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),A={href:"https://codepen.io/airen/full/OJEMmxN",target:"_blank",rel:"noopener noreferrer"},T=c(`<p>上面看到的都是行网格轨道在网格容器块轴方向的对齐方式（分配网格容器块轴方向剩余空间）。接下来在前面的示例基础上，将 <code>align-content</code> 换成 <code>justify-content</code> 。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    justify-content: var(--justify-content, start);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不难发现，<code>justify-content</code> 取值和 <code>align-content</code> 值效果是相同的，唯一不同的是， <strong><code>justify-content</code></strong> <strong>是用来控制列网格轨道在网格容器的内联轴方向的对齐方式，即 分配网格容器内联轴方向的剩余空间</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3db8586d00914a5db8fe5c825f38676b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),B={href:"https://codepen.io/airen/full/eYKJWer",target:"_blank",rel:"noopener noreferrer"},N=c(`<p><code>justify-content</code> 取值为 <code>center</code> 、<code>space-around</code> 、<code>space-evenly</code> 和 <code>space-between</code> 分配网格容器内联轴方向剩余空间如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/540f709a36c54396afe67e4c81bba7cd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>**注意，如果网格只有一列，****<code>justify-content</code><strong><strong>取值</strong></strong><code>center</code>**<strong>可以实现水平居中效果</strong> 。</p></blockquote><p>如果 <code>grid-tempalte-columns</code> 或 <code>grid-auto-columns</code> 设置列网格轨道尺寸时，设置了 <code>fr</code> 单位值，那么 <code>justify-content</code> 取任何值的效果都与默认值 <code>start</code> 等同：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-columns: minmax(100px, 1fr) 100px 100px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f396d35a084c4a59b1956fb82a8219ae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),Y={href:"https://codepen.io/airen/full/yLEeXOR",target:"_blank",rel:"noopener noreferrer"},H=c(`<p>网格项目在内联轴方向溢出网格容器时，<code>justify-content</code> 取值不同，溢出方向也有所差异：</p><ul><li><code>start</code> ，网格项目在网格容器内联轴方向结束位置溢出；</li><li><code>end</code> ，网格项目在网格容器内联轴方向起始位置溢出；</li><li><code>center</code> ，网格项目在网格容器内联轴两个方向溢出；</li><li><code>stretch</code> 与 <code>start</code> 等同；</li><li><code>space-around</code> 与 <code>center</code> 等同；</li><li><code>space-between</code> 与 <code>start</code> 等同；</li><li><code>space-evenly</code> 与 <code>center</code> 等同。</li></ul><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-columns: 70% 120px 120px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e25856418d33428c82afa058525fb089~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),O={href:"https://codepen.io/airen/full/oNybwWx",target:"_blank",rel:"noopener noreferrer"},V=c('<p><code>justify-content</code> 和 <code>align-content</code> 一样，取值为 <code>space-around</code> 、<code>space-evenly</code> 和 <code>space-between</code> 会影响网格区域内联尺寸方向的尺寸（<code>inline-size</code>），即宽度会变大：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2d94a25c3ff40e3a5f294f93a4cc3c9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',2),E={href:"https://codepen.io/airen/full/YzvwQrN",target:"_blank",rel:"noopener noreferrer"},J=c(`<p>刚才有提到过，<code>align-content</code> 和 <code>justify-content</code> 在我们演示的示例中取值为 <code>stretch</code> 的效果和 <code>start</code> 是一样的。这主要是因为示例中的网格轨道尺寸是一个固定值，你可以尝试将示例中的 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 中的值调整为 <code>auto 100px auto</code> ，即有些轨道尺寸由内容来决定：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-columns: auto 100px auto;
    grid-template-rows: auto 100px auto;
    justify-content: stretch;
    align-content: stretch;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，</p><ul><li>当 <code>justify-content</code> 取值为 <code>stretch</code> 时，设置内在尺寸的列网格轨道在内联轴方向会被拉伸，网格项目会沿着网格容器的内联轴方向填满（整个网格容器内联轴方向可用空间）；</li><li>当 <code>align-content</code> 取值为 <code>stretch</code> 时，设置内在尺寸的行网格轨道在块轴方向被拉伸，网格项目会沿着网格容器块轴方向填满（整个网格容器块轴方向可用空间）。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/894eb8aeea544df8a992069189ba2d13~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Q={href:"https://codepen.io/airen/full/GRGoEwQ",target:"_blank",rel:"noopener noreferrer"},I=c(`<p>另外，当网格项目因合并网格单元格创建了一个隐式网格，并且隐式网格轨道尺寸为 <code>auto</code> 时，<code>justify-cotent</code> 和 <code>align-content</code> 取值为 <code>stretch</code> 时，同样会对网格项目进行拉伸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a28a34ec24eb4beeaf133a07be50d376~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),X={href:"https://codepen.io/airen/full/GRGoEwQ",target:"_blank",rel:"noopener noreferrer"},P=c(`<p>在使用的时候，你还可以将 <code>justify-content</code> 和 <code>align-content</code> 简写成 <code>place-content</code> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>place-content: &lt;align-content&gt; &lt;justify-content&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当 <code>place-content</code> 只有一个值时，表示 <code>align-content</code> 和 <code>justify-content</code> 值相同，如果有两个值时，第一个值是 <code>align-content</code> ，第二个则是 <code>justify-content</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    place-content: center end;
    /* 等同 */
    align-content: center;
    justify-content: end;
    
    place-content: center;
    /* 等同 */
    align-content: center;
    justify-content: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来， Web 中又多了一种实现水平垂直居中的布局效果，即 <code>place-content</code> 属性的值设置为 <code>center</code> 。不过，使用 <code>place-content</code> 实现水平垂直居中，它有一个条件限制，<strong>网格容器中只有一个网格轨道，即 需要在网格容器中水平垂直居中的元素，它既是行网格轨道，也是列网格轨道</strong> ：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;我需要水平垂直居中&lt;/div&gt;
&lt;/div&gt;
.container {
    display: grid;
    place-content: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce8f7fb82a1149b581f825b72d39aa64~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),U={href:"https://codepen.io/airen/full/XWYmypr",target:"_blank",rel:"noopener noreferrer"},Z=e("p",null,[i("用下图简单地总结一下，网格容器上设置 "),e("code",null,"justify-content"),i(" 或 "),e("code",null,"align-content"),i(" 属性的值，网格轨道的对齐方式如下：")],-1),$=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e2a2625b9ed491abf3aa42bdfeef853~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),ee={href:"https://codepen.io/airen/full/RwJrXrQ",target:"_blank",rel:"noopener noreferrer"},ie=c(`<p>网格布局中，你可以同时使用多个对齐属性来控制网格中的对齐（网格项目或网格轨道），比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    
    /* 等同于 */
    place-content: space-evenly;
    place-items: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如你所看到的，由于可用于网格布局中的对齐属性很多种，如果你对网格布局中的对齐属性不是很了解的话，往往设置了对齐属性，却达不到预期的效果。这里有一个小技巧，你在网格布局中使用网格对齐相关的属性时，你需要做确认：</p><ul><li>你是要对网格轨道设置对齐吗？如果是，使用 <code>place-content</code> 属性；如果希望只控制网格轨道沿着网格容器块轴方向的对齐，则使用 <code>align-content</code>；如果希望只控制网格轨道沿着内联轴方向的对齐，则使用 <code>justify-content</code>。</li><li>你是要对所有网格项目设置对齐吗？如果是，使用 <code>place-items</code> 属性；如果希望只控制网格项目沿着网格区域块轴方向对齐，则使用 <code>align-items</code> ；如果希望只控制网格项目沿着网格区域内联轴方向对齐，则使用 <code>justify-items</code>。</li><li>你是要对单个网格项目设置对齐吗？如果是，使用 <code>place-self</code> 属性；如果只希望控制单个网格项目沿着网格区域块轴方向对齐，则使用 <code>align-self</code> ；如果只希望控制单个网格项目沿着网格区域内联轴方向对齐，则使用 <code>justify-self</code>。</li></ul><p>比如下面这样的一个示列：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;!-- 这里省略七个 item --&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上面的代码，构建了一个像下面这样的网格，其中网格项目一合并了两行两列：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9189ca12b08d4c229a8e72413d8081ea~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>目前为止，并没有显式地设置任何与对齐有关的属性。事实上，它相当于在网格容器上显式设置了 <code>place-items</code> 的值为 <code>stretch</code> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    place-items: var(--align-items, stretch)  var(--justify-items, stretch)；
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为网格项目的 <code>place-items</code> （即 <code>align-items</code> 和 <code>justify-items</code>）的默认值是 <code>stretch</code> 。它也相当于在所有网格项目上设置了 <code>place-self</code> 的值为 <code>stretch</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container &gt; * {
    place-self: var(--align-self, stretch) var(--justify-self, stretch);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你在网格容器 <code>.container</code> 显式设置 <code>place-items</code> 的值不是 <code>stretch</code> （非默认值）时，那么所有网格项目的对齐方式都会得到改变：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5d7c2f1fe664993a181f61f1145cd3e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这个时候，要是你在单个网格项目上（比如网格项目一）显式设置了 <code>place-self</code> 的值为 <code>stretch</code> ，你会发现网格项目一在合并的网格区域的块轴和内联轴方向都会被拉伸，填满整个网格区域。即使是网格容器上显式设置了 <code>place-items</code> 的值为 <code>center stretch</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    place-items: center stretch;
}

.item:nth-child(1) {
    place-self: stretch;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5937ed70081e4e4a9b9a26fccbf01f19~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>单个设置 <code>place-self</code> 的权重要大于在网格容器上设置的 <code>place-items</code>。正如你所看到的，网格项目一最终以自身 <code>place-self</code> 的值来控制对齐方式：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24c103abf3714a83b1fde13290239072~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>需要注意的是，<code>place-content</code> 的默认值是 <code>start</code> ，但这并不意味着网格容器默认就是 <code>place-content</code> 取值 <code>start</code> 的效果。就拿上面这个示例来说，在网格容器上设置 <code>place-content</code> 属性值为 <code>start</code> 前后的效果是不一样的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b2b49e1d53746a6b5f8b258b18e7430~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也就是说，<strong>如果网格容器上未显式设置</strong> <strong><code>place-content</code></strong> <strong>时，并不会以默认的</strong> <strong><code>place-content: start</code></strong> <strong>来控制网格轨道的对齐</strong> 。</p><p>换句话说，只要在网格容器上显式设置了 <code>place-content</code> 属性（或它的子属性 <code>align-content</code> 或 <code>justify-content</code>）的值，就会改变设置值为 <code>auto</code> 的轨道尺寸，也会改变网格轨道之间的间距，但它不会改变网格项目的对齐方式。</p><p>你也可以简单的这么理解：</p><ul><li><code>place-content</code> 改变网格的对齐方式和网格轨道之间的间距，但不会改变网格项目在网格区域的对齐方式；</li><li><code>place-items</code> 和 <code>place-self</code> 会改变网格项目在网格区域的对齐方式，同时也会改变网格项目的尺寸，但不会改变网格轨道之间的间距；</li><li><code>place-items</code> 用于网格容器，会改变所有网格项目；<code>place-self</code> 用于网格项目，只会改变设置了该值的网格项目。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f57ff81584444d5b8639a0060c0a59eb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,27),ne={href:"https://codepen.io/airen/full/vYrLoaz",target:"_blank",rel:"noopener noreferrer"},de=c('<h2 id="网格项目的-margin-auto" tabindex="-1"><a class="header-anchor" href="#网格项目的-margin-auto" aria-hidden="true">#</a> 网格项目的 <code>margin:auto</code></h2><p>通过前面课程的学习，你已经知道了在 Flex 项目中设置 <code>margin</code> 属性的值为 <code>auto</code> 时，可以达到 Flex 项目对齐的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce3f33aa26b545689e44f8efe4cb9a5d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>网格布局中，在网格项目上设置 <code>margin</code> 的值为 <code>auto</code> 时也能达到相似的效果。比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12da10c18ec84b17ba78fe1e6fe807e2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',5),ce={href:"https://codepen.io/airen/full/YzvqKgz",target:"_blank",rel:"noopener noreferrer"},oe=c(`<p>正如你所看到的，在网格布局中，你可以在网格项目上显式设置 <code>margin: auto</code> 实现水平垂直居中的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
}

.item {
    grid-area: 1 / 1 / -1 / -1;
    margin: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48930c11de1b409d94862351a165f2eb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),te={href:"https://codepen.io/airen/full/xxzVxoV",target:"_blank",rel:"noopener noreferrer"},le=c('<p>除了在网格项目上显式设置 <code>margin</code> 的值为 <code>auto</code> 之外，也可以将其设置为 <code>&lt;length-percentage&gt;</code> 值，用来控制网格项目之间的间距。不过，它和网格容器上的 <code>gap</code> 属性还是有所区别的：</p><ul><li><code>gap</code> 是用来设置网格轨道之间的间距；</li><li><code>margin</code> 是用来设置网格项目外侧边缘和网格区域边缘之间的间距。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91353fda231c4be4887cc730a02d5e3f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你会发现，网格项目上设置 <code>margin</code> 值时，网格项目会向里收缩！另外，网格布局中网格项目或网格轨道的对齐都是沿着网格容器的块轴方向或内联轴方向，所以使用 <code>margin</code> 值为 <code>auto</code> 达到对齐效果时，更建议采用相应的逻辑属性，比如：</p><ul><li><code>magin-inline-start</code> 替代 <code>margin-left</code> ，相当于在网格项目上设置 <code>justify-self: end</code>；</li><li><code>margin-inline-end</code> 替代 <code>margin-right</code> ，相当于在网格项目上设置 <code>justify-self: start</code>；</li><li><code>margin-block-start</code> 替代 <code>margin-top</code> ，相当于在网格项目上设置 <code>align-self: end</code>；</li><li><code>margin-block-end</code> 替代 <code>margin-bottom</code> ，相当于在网格项目上设置 <code>align-self: start</code>。</li></ul><p>你也可以设置：</p><ul><li><code>margin-inline</code> 的值为 <code>auto</code> 实现水平居中，等同于 <code>justify-self: center</code>；</li><li><code>margin-block</code> 的值为 <code>auto</code> 实现垂直居中，等同于 <code>align-self: center</code>。</li></ul><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>网格布局中的对齐和 Flexbox 布局中的对齐有点相似，只不过网格布局中主要分为三种使用情景：</p><ul><li><code>place-content</code> （它的子属性 <code>align-content</code> 和 <code>justify-content</code>）控制网格轨道在网格容器的块轴和内联轴方向的对齐；</li><li><code>place-items</code> （它的子属性 <code>align-items</code> 和 <code>justify-items</code> ）控制所有网格项目在网格区域的块轴和内联轴方向的对齐；</li><li><code>place-self</code> （它的子属性 <code>align-self</code> 和 <code>justify-self</code> ）控制单个网格项目在网格区域的块轴和内联轴方向的对齐。</li></ul><p>它的 Flexbox 布局的 <code>align-content</code> 、<code>justify-content</code> 、<code>alig``n-items</code> 以及 <code>align-self</code> 还是有所差异的：</p><table><thead><tr><th><strong>对齐属性</strong></th><th><strong>Flexbox 布局中的对齐</strong></th><th><strong>Grid 布局中的对齐</strong></th><th><strong>备注</strong></th></tr></thead><tbody><tr><td><strong><code>align-content</code></strong></td><td>Flex行在 Flexbox 容器侧轴方向的对齐</td><td>行网格轨道在网格容器的块轴方向的对齐</td><td>Flex 行是指 Flexbox 容器上显式设置 <code>flex-wrap</code> 的值为 <code>wrap</code> 或 <code>wrap-reverse</code> 产生断行。每个 Flex 行都有主轴和侧轴方向</td></tr><tr><td><strong><code>justify-content</code></strong></td><td>Flex 项目在 Flex 容器主轴方向的对齐</td><td>列网格轨道在网格容器的内联轴方向的对齐</td><td></td></tr><tr><td><strong><code>place-content</code></strong></td><td><strong><code>place-content: &lt;align-contetn&gt; &lt;justify-content&gt;</code></strong></td><td></td><td></td></tr><tr><td><strong><code>align-items</code></strong></td><td>Flex 项目在 Flex 容器侧轴方向的对齐</td><td>所有网格项目在网格区域的块轴方向的对齐</td><td></td></tr><tr><td><strong><code>justify-items</code></strong></td><td></td><td>所有网格项目在网格区域的内联轴方向的对齐</td><td>Flexbox 布局中不支持 <code>justify-items</code></td></tr><tr><td><strong><code>place-items</code></strong></td><td></td><td><code>place-items: &lt;align-items&gt; &lt;justify-items&gt;</code></td><td></td></tr><tr><td><strong><code>align-self</code></strong></td><td>单个 Flex 项目在 Flex 容器侧轴方向的对齐</td><td>单个网格项目在网格区域的块轴方向的对齐</td><td></td></tr><tr><td><strong><code>justify-self</code></strong></td><td></td><td>单个网格项目在网格区域的内联轴方向的对齐</td><td>Flexbox 布局中不支持 <code>justify-self</code></td></tr><tr><td><strong><code>place-self</code></strong></td><td></td><td><code>place-self: &lt;align-self&gt; &lt;justify-self&gt;</code></td><td></td></tr></tbody></table><p>不管是 Flexbox 布局中的对齐还是网格布局中的对齐，它们都受 CSS 的书写模式或阅读模式的影响！</p><p>另外，网格布局中的网格项目上，也可以显式设置 <code>margin</code> 的值来达到单个网格项目对齐，这个和 Flexbox 布局中的 Flex 项目设置 <code>margin: auto</code> 是等同的：</p><table><thead><tr><th><strong>属性：值</strong></th><th><strong>Flexbox 布局</strong></th><th><strong>Grid 布局</strong></th></tr></thead><tbody><tr><td><strong><code>margin-left: auto</code></strong></td><td>如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flex 容器上设置 <code>justify-content</code> 的值为 <code>flex-end</code> 或 <code>end</code></td><td>等同于在网格项目上设置 <code>justify-self: end</code>如果 Grid 容器中只有一个 Grid 项目时，等同于在网格容器上设置 <code>justify-items: end</code> 或 <code>justify-content: end</code></td></tr><tr><td><strong><code>margin-right: auto</code></strong></td><td>如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flex 容器上设置 <code>justify-content</code> 的值为 <code>flex-start</code> 或 <code>start</code></td><td>等同于在网格项目上设置 <code>justify-self: start</code> 如果 Grid 容器中只有一个 Grid 项目时，等同于在网格容器上设置 <code>justify-items: start</code> 或 <code>justify-content: start</code></td></tr><tr><td><strong><code>margin-top: auto</code></strong></td><td>等同于在 Flex 项目上设置 <code>align-self: end</code> 或 <code>align-self: flex-end</code> 如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flexbox 容器上设置 <code>align-items</code> 的值为 <code>end</code> 或 <code>flex-end</code></td><td>等同于在 Grid 项目上设置 <code>align-self: end</code> 如果 Grid 容器中只有一个 Grid 项目时，等同于在 Grid 容器上设置 <code>align-items: end</code> 或 <code>align-content: end</code></td></tr><tr><td><strong><code>margin-bottom: auto</code></strong></td><td>等同于在 Flex 项目上设置 <code>align-self: start</code> 或 <code>align-self: flex-start</code> 如果 Flexbox 容器中只有一个 Flex 项目时，等同于在 Flexbox 容器上设置 <code>align-items</code> 的值为 <code>start</code> 或 <code>flex-start</code></td><td>等同于在 Grid 项目上设置 <code>align-self: start</code> 如果 Grid 容器中只有一个 Grid 项目时，等同于在 Grid 容器上设置 <code>align-items: start</code> 或 <code>align-content: start</code></td></tr></tbody></table><p>不管是在 Flexbox 布局中还是 Grid 布局中，在 Flex 项目或 Grid 项目上设置：</p><ul><li><code>magin-inline: auto</code> 可以实现水平居中；</li><li><code>margin-block: auto</code> 可以实现垂直居中。</li></ul><p>需要注意的是，因为 Flexbox 布局是一种一维布局，所以在 Flexbox 布局中没有 <code>justify-items</code> 和 <code>justify-self</code> 两个属性！</p><p>到这里，小册分了两节课分别介绍了 Flexbox 和 Grid 布局中的对齐。两个布局模块中都有相同的属性以及值，但所起的作用是略有差异的，但也有互通的。因此，在 CSS 规范中，将它们都纳入了 CSS Box Alignment 模块中。不过，在我们小册中不做展开性的阐述。因此，有关于对齐的部分我们就介绍到这里了。</p>',19);function se(ae,re){const n=t("ExternalLinkIcon");return l(),s("div",null,[r,e("p",null,[i("接下来，在这节课程中，我将演示网格布局中的对齐方式是如何工作的，你会发现很多属性和值与 Flexbox 布局中的用法是类似的（Flexbox 布局对齐方式请参阅读前面课程：《"),e("a",p,[i("04 | Flexbox 布局中的对齐方式"),d(n)]),i(" 》）。不过，网格布局是二维的，Flexbox 布局是一维的，所以你也会发现它们有一些小区别。我们就从处理网格对齐时用到的两条轴线开始吧。")]),u,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",m,[i("https://codepen.io/airen/full/zYavJow"),d(n)])])]),v,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",b,[i("https://codepen.io/airen/full/VwdvELO"),d(n)])])]),g,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",f,[i("https://codepen.io/airen/full/NWzGOpp"),d(n)])])]),h,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",x,[i("https://codepen.io/airen/full/gOKaBvw"),d(n)])])]),j,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",S,[i("https://codepen.io/airen/full/qBKOJLW"),d(n)])])]),y,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",k,[i("https://codepen.io/airen/full/RwJWeOG"),d(n)])])]),_,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",C,[i("https://codepen.io/airen/full/YzvyRGN"),d(n)])])]),z,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",q,[i("https://codepen.io/airen/full/qBKbwKp"),d(n)])])]),F,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",w,[i("https://codepen.io/airen/full/xxzwQpV"),d(n)])])]),G,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",L,[i("https://codepen.io/airen/full/MWXKjVj"),d(n)])])]),D,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",M,[i("https://codepen.io/airen/full/poKgeMR"),d(n)])])]),W,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",K,[i("https://codepen.io/airen/full/dyKGWYa"),d(n)])])]),R,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",A,[i("https://codepen.io/airen/full/OJEMmxN"),d(n)])])]),T,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",B,[i("https://codepen.io/airen/full/eYKJWer"),d(n)])])]),N,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Y,[i("https://codepen.io/airen/full/yLEeXOR"),d(n)])])]),H,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",O,[i("https://codepen.io/airen/full/oNybwWx"),d(n)])])]),V,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",E,[i("https://codepen.io/airen/full/YzvwQrN"),d(n)])])]),J,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Q,[i("https://codepen.io/airen/full/GRGoEwQ"),d(n)])])]),I,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",X,[i("https://codepen.io/airen/full/GRGoEwQ"),d(n)])])]),P,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",U,[i("https://codepen.io/airen/full/XWYmypr"),d(n)])])]),Z,$,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ee,[i("https://codepen.io/airen/full/RwJrXrQ"),d(n)])])]),ie,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ne,[i("codepen.io"),d(n)])])]),de,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ce,[i("https://codepen.io/airen/full/YzvqKgz"),d(n)])])]),oe,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",te,[i("https://codepen.io/airen/full/xxzVxoV"),d(n)])])]),le])}const ue=o(a,[["render",se],["__file","index-15.html.vue"]]);export{ue as default};
