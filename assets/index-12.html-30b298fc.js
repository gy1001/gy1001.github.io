import{_ as c,M as l,p as r,q as s,R as e,t as d,N as i,a1 as o}from"./framework-e8cb8151.js";const t={},a=o(`<h1 id="_12-grid-布局中的计算" tabindex="-1"><a class="header-anchor" href="#_12-grid-布局中的计算" aria-hidden="true">#</a> 12-Grid 布局中的计算</h1><p>通过前面课程的学习，我们可以使用 <code>grid-templte-rows</code> 和 <code>grid-template-columns</code> 设置显式网格轨道数量和尺寸，也可以使用 <code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 来设置隐式网格轨道尺寸。虽然它们服务的对象有所差异，但是使用方法几乎是相似的，只有个别函数不能用于 <code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 属性上，比如 <code>repeat()</code> 函数。</p><p>由于能给这些属性设置不同类型的值，因此在定义网格轨道的尺寸的时候就会涉及一些计算，比如 <code>%</code> 、<code>fr</code> 等。除此之外，还有其他的一些值类型，比如 <code>rem</code> 、 <code>em</code> 、<code>ex</code> 、<code>ch</code> 和视窗单位 <code>vw</code> 等，但这里只和大家聊聊 <code>%</code> 和 <code>fr</code> 单位，尤其是 <code>fr</code> 单位的计算。因为其他单位值的计算相对而言要更简单，比如：</p><ul><li><code>rem</code> 是相对于 HTML 根元素（<code>&lt;html&gt;</code> 元素）的 <code>font-size</code> 计算；</li><li><code>em</code> 是相对于元素自身的 <code>font-size</code> 计算；</li><li><code>ex</code> 是相对于它的字体上下文的 <code>x</code> 高度，其中 <code>x</code> 的高度由 <code>font-family</code> 和 <code>font-size</code> 两个因素决定，即它等于特定字体在特定<code>font-size</code> 下的 <code>x</code> 高度；</li><li><code>ch</code> 是基于特定字体下的 <code>0</code> 字形宽度来计算，它也会随字体而变化，一般情况下，它是一个估计值，因为 <code>0</code> 字形的宽度通常是字体的平均字符宽度；</li><li><code>vw</code> 、<code>vh</code> 、<code>vmin</code> 和 <code>vmax</code> 是视窗单位，它是相对于浏览器视窗的宽度和高度来计算的。</li></ul><p>我们先从百分比 <code>%</code> 开始吧！</p><h2 id="网格中百分比的计算" tabindex="-1"><a class="header-anchor" href="#网格中百分比的计算" aria-hidden="true">#</a> 网格中百分比的计算</h2><p>熟悉 CSS 的同学都应该知道，当元素的 <code>width</code> 值是个百分比值时，它是相对于其父容器的 <code>width</code> 计算的；同样，它的 <code>height</code> 值是相对于父容器的 <code>height</code> 计算的。在网格布局中，如果网格轨道的值是一个百分比值时，它的计算是相对于网格容器的 <code>width</code> 或 <code>height</code> 来计算，其中：</p><ul><li>列轨道的百分比（即 <code>grid-template-columns</code> 或 <code>grid-auto-columns</code> 属性的值是百分比值）是相对于网格容器宽度（<code>width</code>）计算，更为严格地说，它是相对网格容器的内联轴尺寸 <code>inline-size</code> 来计算。</li><li>行轨道的百分比（即 <code>grid-template-rows</code> 或 <code>grid-auto-rows</code> 属性的值是百分比值）是相对于网格容器高度（<code>height</code>）计算，更为严格地说，它是相对网格容器的块轴尺寸<code>block-size</code> 来计算。</li></ul><blockquote><p>注意，<code>inline-size</code> 和 <code>block-size</code> 涉及到 CSS 逻辑属性方面的知识，这里不做详细阐述，为了节约时间，减少课程的复杂度，这里只按书写模式 <code>ltr</code> 来举例！</p></blockquote><p>比如下面这个网格，我们显式设置网格容器的 <code>width</code> 和 <code>height</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    width: 800px;
    height: 400px;
    
    display: grid;
    grid-template-columns: 20% 50%  30%;
    grid-template-rows: repeat(2, 50%); /* 等同于 50% 50% */ 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>grid-template-columns</code> 和 <code>grid-template-rows</code> 分别相对于网格容器的 <code>width</code> 和 <code>height</code> ，可以计算出网格轨道（列轨道和行轨道）尺寸。如下所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15d4dc6f2306408abd5a08dedb2d2b9d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),p={href:"https://codepen.io/airen/full/ZEoVxNe",target:"_blank",rel:"noopener noreferrer"},m=o(`<p>注意，<code>grid-auto-columns</code> 计算等同于 <code>grid-template-columns</code> ；<code>grid-auto-rows</code> 计算等同于 <code>grid-template-rows</code> 。如果将上面示例代码改用 <code>grid-auto-*</code> 得到的结果是相似的：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    width: 800px;
    height: 400px;
    
    display: grid;
    grid-auto-columns: 20%  50%  30%; /* 相对于网格容器的 width 计算 */
    grid-auto-rows: 50% 50%;          /* 相对于网格容器的 height 计算 */
    
    grid-template-areas: &quot;col1 col2 col3&quot;; /* 显式指定列网格轨道数量 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>众所周知，当 <code>width</code> 值为 <code>100%</code> 且该元素显式设置了 <code>padding</code> 或 <code>border-width</code> 值时，并且 <code>box-sizing</code> 不是 <code>border-box</code> 时，设置宽度为 <code>100%</code> 的元素就会溢出容器；或者 <code>width</code> 为 <code>100%</code> 的元素碰到外边距 <code>margin</code> 也会引起元素溢出容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8772c0f25c20465383c772e95b560621~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在网格布局中同样会有类似的现象。当网格轨道的值都是百分比值，而且总值是 <code>100%</code> 时，要是加上 <code>gap</code> 设置网格轨道间距，就会造成总值超过网格容器，网格就会溢出。这是因为，网格轨道取值百分比时，它是基于网格容器的大小计算，并不会关心网格容中的其他情况。</p><p>比如上面示例，网格行轨道和列轨道值的总和都是 <code>100%</code> 了，此时网格容器要是设置 <code>gap:20px</code> ，其网格就会溢出网格容器：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    width: 800px;
    height: 400px;
    
    display: grid;
    grid-template-columns: 20% 50%  30%;
    grid-template-rows: repeat(2, 50%); /* 等同于 50% 50% */ 
    
    gap: 20px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48ea1ed402694b7fa792e179e53306fb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),u={href:"https://codepen.io/airen/full/bGMzVgz",target:"_blank",rel:"noopener noreferrer"},v=o(`<p>因此，给网格轨道设置百分比值要尤其小心，<strong>切勿让所有网格轨道都取百分比值</strong> ，因为这样就无法利用 <code>gap</code> 属性，你无法确认所有网格轨道的尺寸值总和不是 <code>100%</code> 。当然，在某些情况下，网格轨道取百分比值还是很有意义的，比如你想保证某条（列或行）网格轨道在网格容器中占一定比例。另外就是，当 <code>fr</code> 不能用于网格沟槽的情况下（注意，<code>gap</code> 属性值不能是带有 <code>fr</code> 单位的值），百比值也可以让 <code>gap</code> 属性有一个良好的值。</p><p>在 CSS 中，当容器子元素宽度总和是 <code>100%</code> 时，要是在任何子元素上设置<code>margin</code> 值，也会造成子元素溢出容器，比如下面这个示例：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;flex-container&gt;
    &lt;flex-item&gt;&lt;/flex-item&gt;
    &lt;!-- 总共有四个 Flex Item --&gt;
&lt;/flex-container&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.flex__container {
    width: 800px;
    height: 400px;
    
    display: flex;
    flex: 1 0 20%;
}

.flex__item {
    margin: 2rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/207390b724944ea7a8b8b68f6b3100a5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>不过，这一现象在网格中的表现却有所不同。网格轨道的尺寸值总和是 <code>100%</code> ，这个时候在网格项目上设置 <code>margin</code> 值时，并不会致使网格溢出容器，只会让网格项目距所在单元格（或网格区域）四边有一定的间距（<code>margin</code> 值）。它表现出来的现象就像是网格项目向内收缩一样：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: 20% 50% 30%;
    grid-template-rows: repeat(2, 50%);
}

.item {
    margin: 20px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e1ccfb815e64acfbb7e8458b0608733~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),g={href:"https://codepen.io/airen/full/BaxMjbL",target:"_blank",rel:"noopener noreferrer"},b=o(`<h2 id="网格中-fr-的计算" tabindex="-1"><a class="header-anchor" href="#网格中-fr-的计算" aria-hidden="true">#</a> 网格中 fr 的计算</h2><p><code>fr</code> 单位值仅能用于 CSS 网格布局中，即它只用于 <code>grid-template-rows</code> 、<code>grid-template-columns</code> 、<code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 属性上。它是一种特殊的大小调整方法，可以根据网格容器中可用空间份额比例来调整网格轨道大小。</p><p><code>fr</code> 的工作方式与 <code>flex</code> 中的 <code>auto</code> 非常类似。不过它的计算要比 Flexbox 中的 <code>flex</code> 简单得多。接下来，我们一起来看看它在网格中是如何计算的。</p><p>上一节中，我们聊到了“<strong>网格轨道取百分比值时，很易于造成网格溢出网格容器</strong> ”，比如上面展示的示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: 20% 50% 30%;
    grid-template-rows: repeat(2, 50%);
    gap: 20px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e25efb9d4cd94ce79501bb8276c958c0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如你所看到的，网格溢出了容器。</p><p>如果我们把示例中的<code>%</code> 单位换成 <code>fr</code> 单位呢：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: 20fr 50fr 30fr;
    grid-template-rows: repeat(2, 50fr);
    gap: 20px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你将看到，使用 <code>fr</code> 单位的网格，即 <code>gap</code> 设置的值为<code>20px</code> 也不会让网格溢出容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29d347af74be4ad284157d5a11ced44d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),f={href:"https://codepen.io/airen/full/xxjMOKV",target:"_blank",rel:"noopener noreferrer"},x=o(`<p>再来看一个示例，把<code>grid-template-columns</code> 的 <code>50%</code> （第二列）换成可调节的范围值，而其他的值都换成 <code>fr</code> 单位，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    
    grid-template-columns: 20fr var(--col, 50%) 30fr;
    grid-template-rows: repeat(2, 50fr);
    gap: 20px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，第一列和第三列轨道的大小会随着第二列轨道变化：</p><ul><li>当第二列轨道变大时，第一列和第三列就会变小；</li><li>当第二列轨道变小时，第一列和第三列就会变大。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10946ba807894e31b53945d41681f473~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),h={href:"https://codepen.io/airen/full/NWMoNxa",target:"_blank",rel:"noopener noreferrer"},S=o(`<p>这两个示例都向你展示了 <code>fr</code> 的特性。继续往下，MDN 是这样描述 <code>fr</code> 的：</p><blockquote><p><strong><code>fr</code></strong> <strong>单位代表网格容器中可用空间的一等份</strong> 。</p></blockquote><p>从这个描述中不难发现，网格轨道使用 <code>fr</code> 单位确定尺寸大小的话，该网格轨道就被称为<strong>弹性网格轨道</strong> ，因为它会根据网格容器可用空间对网格轨道进行弹性缩放，看上去有点类似于 <code>flex</code> 的特征。</p><p>网格轨道使用 <code>fr</code> 单位时，一般会按下面公式来计算：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/315892da25114b3bb75fdf965fb50ca2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>公式中所谓的<strong>弹性系数指的就是设置了</strong> <strong><code>fr</code></strong> <strong>单位的值</strong> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和
// 弹性系数指的就是设置了 fr 单位的值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，使用一个最基础的示例，来向大家阐述 <code>fr</code> 的功能和计算。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;
        CSS is Awesome!
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        W3cplus!
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;img src=&quot;https://loremflickr.com/200/100?random=1&quot; alt=&quot;&quot;&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        现代Web布局: CSS Grid Layout!
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
}

.item {
    padding: 10px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，示例中的所有元素的 <code>box-sizing</code> 都是 <code>border-box</code>。</p><p>当<code>grid-template-columns</code> 的值是 <code>repeat(4, min-content)</code> 时：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: repeat(4, min-content);

    /* 等同于 */
    grid-template-columns: min-content min-content min-content min-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有列网格轨道的尺寸都设置为 <code>min-content</code> 。在 Flexbox 的课程中我们介绍过 <code>min-content</code> 值，放到网格布局中是一样的，它对应的就是所在网格项目最小内容的长度。在我们这个示例中，这个时候网格容器会有一定的剩余空间出现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/989ad249a92d402483080d7c4b0ee275~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>前面说了，设置了 <code>fr</code> 单位的网格轨道就是弹性网格轨道，它能像 Flexbox 布局中的设置了 <code>flex:auto</code> 的 Flex 项目一样，按照相应的弹性系数来分配空间（在网格中分配的是可用空间）。比如每个列网格轨道都显式设置是 <code>1fr</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: repeat(4, 1fr);
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照 <code>fr</code> 的计算公式，我们可以得知：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>步骤1 »» 网格容器内联轴可用空间 = 800px
步骤2 »» 总弹性系数 = 1fr × 4 = 4fr
步骤3 »» 每一个fr, 即 1fr = 800px ÷ 4 = 200px;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该示例的每个网格列轨道都<strong>将分配到网格容器可用空间的一个等份，即</strong> <strong><code>1fr</code></strong> ，因为我们显式示设置了 <code>grid-template-columns</code> 的值是 <code>repeat(4, 1fr)</code> （相当于 <code>1fr 1fr 1fr 1fr</code>）。根据公式计算，网格每个列轨道尺寸应该都相等，都应该是等于 <code>200px</code> ，即 :</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
网格列轨道2尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
网格列轨道3尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
网格列轨道4尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但事实上并非如此，浏览器计算出来的结果不是你想象的那样，每个列网格轨道尺寸是 <code>200px</code> ，实际计算出来的如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dfc472f412d4d14acbfd681dd172e32~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>造成这种现象，是因为第三列网格轨道触发了最小尺寸的现象（它的最小尺寸是 <code>220px</code>）。简单地说，计算出来的网格轨道尺寸不能小于其内容的最小尺寸（即计算出来的 <code>1fr</code> 尺寸<code>200px</code> 小于<code>min-content</code> 的尺寸<code>220px</code>），即<strong>计算出来的值不能小于 <code>min-content</code></strong> 。</p><p>如果出现这种现象，浏览器会再次进行计算，将多出来的值（<code>220px - 200px = 20px</code>）分配到其他的网格轨道上。也就是说，第三列网格轨道多出来的 <code>20px</code> 要重新分配到另外三个列网格轨道上，此时每一个 <code>fr</code> 就等于 <code>6.667px</code> （<code>20px ÷ 3fr = 6.667px</code> ）。第一、二和四列网格轨道重新计算后的尺寸是：</p><ul><li>第一列网格轨道尺寸：<code>200px - 6.667px = 193.33px</code>；</li><li>第二列网格轨道尺寸：<code>200px - 6.667px = 193.33px</code>；</li><li>第四列网格轨道尺寸：<code>200px - 6.667px = 193.33px</code>。</li></ul><p>这就是为什么浏览器计算出来的第一、二和四列网格轨道尺寸是 <code>193.33px</code> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36e07254da0483b9a8f7d0491b57f63~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>浏览器在计算网格轨道的尺寸时是循环遍历的一个过程。要是重新计算出来的网格轨道尺寸小于其最小尺寸，就需要再次按照上面的方式进行计算，直到符合要求为止。</p><p>换句话说，如果计算出来的网格轨道值都大于其所在网格项目中最小尺寸（<code>min-content</code>）时，浏览器就不需要做多次的计算，比如上例中，如果我们把第三列的值换成 <code>2fr</code> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: 1fr 1fr 2fr 1fr;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，总的弹性系数就是 <code>5fr</code> （<code>1fr + 1fr + 2fr + 1fr = 5fr</code>），每个<code>fr</code> 计算出来的值 <code>1fr = 800px ÷ 5fr = 800 ÷ 5 = 160px</code> ，根据公式可以计算出相应列网格轨道尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × 800px ÷ 5fr = 1 × 800 ÷ 5 = 160px
网格列轨道2尺寸 = 1fr × 800px ÷ 5fr = 1 × 800 ÷ 5 = 160px
网格列轨道3尺寸 = 2fr × 800px ÷ 5fr = 2 × 800 ÷ 5 = 320px
网格列轨道4尺寸 = 1fr × 800px ÷ 5fr = 1 × 800 ÷ 5 = 160px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2282abbd84484e24a94def1a80a53643~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,34),k={href:"https://codepen.io/airen/full/wvjNWYb",target:"_blank",rel:"noopener noreferrer"},_=o(`<p>在给网格轨道设置尺寸时，你还可以将 <code>fr</code> 单位值和别的单位值混合使用，比如将上例中的第三列网格轨道尺寸设置为 <code>220px</code> ，其他列网格轨道继续设置为 <code>fr</code> 单位值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: 1fr 1fr 220px 1fr;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于第三列网格轨道的尺寸是一个固定值（<code>220px</code>），因此它不是一个弹性网格轨道（即大小是固定不变的，不会因为内容尺寸变大而变大，也不会因内容尺寸变小而变小）。这样一来，它就占去容器可用空间的一部分空间。弹性轨道的可用容器空间就会产生变化，需要在原来的尺寸上减去第三列所占空间，即 <code>800px - 220px = 580px</code> 。相应的每个<code>fr</code> 对应的值就等于 <code>193.33px</code> （<code>580px ÷ 3fr = 193.33px</code> ）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: 1fr 1fr 220px 1fr;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px = 580px (第三列网格轨道尺寸是一个固定值，即 220px)
步骤2 »» 总弹性系数 = 1fr × 3 = 3fr
步骤3 »» 每一个fr, 即 1fr = （800px - 220px） ÷ 3fr = (800 - 220) ÷ 3 = 193.33px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算出来的网格列轨道尺寸分别是：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × (800px - 220px) ÷ 3fr = 1 × 580 ÷ 3 = 193.33px
网格列轨道2尺寸 = 1fr × (800px - 220px) ÷ 3fr = 1 × 580 ÷ 3 = 193.33px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 1fr × (800px - 220px) ÷ 3fr = 1 × 580 ÷ 3 = 193.33px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef1b42b2a1af4148830d6e6f2c7302db~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),C={href:"https://codepen.io/airen/full/wvjNReB",target:"_blank",rel:"noopener noreferrer"},j=o(`<p>同样的，CSS 的 <code>gap</code> 属性的值也会影响 <code>fr</code> 计算。如果你显式设置了 <code>gap</code> 属性的值，它也会占用网格容器的部分可用空间。比如在上面的示例基础上，你设置了 <code>gap</code> 的值为 <code>20px</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: 1fr 1fr 220px 1fr;
    
    gap: 20px;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，网格容器的可用空间等于 <code>520px</code> （即 <code>800px - 220px - 20px × 3 = 520px</code>），弹性总系数是 <code>3fr</code> ，对应的每个 <code>fr</code> 的值是 <code>173.33px</code> （即 <code>520px ÷ 3 = 173.33px</code> ）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: 1fr 1fr 220px 1fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 1fr × 3 = 3fr
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 3fr = (800 - 220 - 20 x 3) ÷ 3 = 173.33px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算出来的网格轨道尺寸就会是：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × (800px - 220px - 20px × 3) ÷ 3fr = 1 × 520 ÷ 3 = 173.33px
网格列轨道2尺寸 = 1fr × (800px - 220px - 20px × 3) ÷ 3fr = 1 × 520 ÷ 3 = 173.33px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 1fr × (800px - 220px - 20px × 3) ÷ 3fr = 1 × 520 ÷ 3 = 173.33px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed9f58fce30c470faf71c54285b30df5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),y={href:"https://codepen.io/airen/full/YzLBBXz",target:"_blank",rel:"noopener noreferrer"},q=o(`<p>注意，除了 <code>gap</code> 属性之外，设置非 <code>fr</code> 值的轨道值都会对 <code>fr</code> 计算产生影响，比如示例中的固定单位 <code>px</code> 值。</p><p>前面几个示例向大家展示的是 <code>fr</code> 的值都是整数值，比如 <code>1fr</code> 、<code>2fr</code> ，其实在给网格轨道设置<code>fr</code> 值时也可以是小数值，比如 <code>0.1fr</code> ，<code>1.5fr</code> 等。接下来，通过两个示例来向大家展示 <code>fr</code> 值是带有小数值时如何计算，以及网格容器可用空间是如何分配的。比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: .5fr .5fr 220px .5fr;
    
    gap: 20px;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例中将第一列、第二列和第四列网格轨道都设置为 <code>0.5fr</code> 。通过前面示例我们可以得知，网格容器可用空间是 <code>520px</code> （即 <code>800px - 220px - 20px × 3 = 520px</code> ），弹性系数总值是 <code>1.5fr</code> （即 <code>0.5fr × 3 = 1.5fr</code>）。注意，<strong>弹性系数总值是大于 <code>1</code></strong> <strong>的</strong> 。它的计算过程如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: 0.5fr 0.5fr 220px 0.5fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.5fr × 3 = 1.5fr (弹性系数总和是大于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1.5fr = (800 - 220 - 20 x 3) ÷ 1.5 = 346.667px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 0.5fr × (800px - 220px - 20px × 3) ÷ 1.5fr = 0.5 × 520 ÷ 1.5 = 173.33px
网格列轨道2尺寸 = 0.5fr × (800px - 220px - 20px × 3) ÷ 1.5fr = 0.5 × 520 ÷ 1.5 = 173.33px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.5fr × (800px - 220px - 20px × 3) ÷ 1.5fr = 0.5 × 520 ÷ 1.5 = 173.33px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce88d4d05aa54d7caa98ca16cf2b064c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>该示例的所有弹性列网格轨道总系数是 <code>1.5fr</code> ，它大于 <code>1fr</code> 。网格布局中 <strong><code>1</code> 个 <code>fr</code> （即 <code>1fr</code>）就是 <code>100%</code></strong> 网格容器可用空间，也正因为如此，弹性列网格轨道把网格容器可用空间都按弹性系数分完了，<strong>网格容器也就不会有任何的剩余空间产生</strong>。</p><p>既然弹性总和会有大于等于<code>1</code> 的情况，那也有可能会是小于 <code>1</code> 的情景。在网格布局中，如果弹性网格系数总和小于 <code>1</code> ，那计算 <code>fr</code> 的值就不能再使用前面的计算公式了，它需要按照下面的公式来计算网格轨道尺寸：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be5508b4e1bc4841982f62bd03605ff6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，你可以不改变计算公式，只不过当弹性系数小于 <code>1</code></strong> <strong>时，那么</strong> <strong><code>1fr</code></strong> <strong>就是网格容器可用空间</strong> !</p></blockquote><p>比如，我们将列网格轨道的值设置为：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: .3fr .2fr 220px .2fr;
    
    gap: 20px;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例中所有列网格轨道弹性系数总和是 <code>0.7fr</code> （即 <code>0.3fr + 0.2fr + 0.2fr</code>），<strong>它小于 <code>1fr</code></strong> 。根据公式，我们可以计算出相应的列网格轨道尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: 0.3fr 0.2fr 220px 0.2fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.3fr + 0.2fr + 0.2fr = 0.7fr (弹性系数总和是小于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1fr = (800 - 220 - 20 x 3) ÷ 1 = 520px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 20px × 3) = 0.3 × 520 = 156px
网格列轨道2尺寸 = 0.2fr × (800px - 220px - 20px × 3) = 0.2 × 520 = 104px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.2fr × (800px - 220px - 20px × 3) = 0.2 × 520 = 104px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算之后的所有列网格轨道的尺寸总和是 <code>584px</code> （即 <code>156px + 104px + 220px + 104px = 584px</code>），即使加上列网格轨道之间的间距，总占用网格容器的空间是<code>644px</code> （<code>584px + 20px × 3 = 644px</code>），都小于网格容器的可用空间 <code>800px</code> 。也就是说，<strong>当所有网格轨道弹性系数（<strong><strong><code>fr</code></strong></strong>）之和小于</strong> <strong><code>1</code></strong> <strong>时，它们将占用小于</strong> <strong><code>100%</code></strong> <strong>的网格容器的可用空间，即网格容器会有剩余空间出现</strong> 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0320d765d784dd1a3c5010b2e63514c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>值得注意的是，当网格轨道的弹性系数是一个小于 <code>1</code> 的值时，更易于触及网格轨道最小尺寸的边缘。</p><p>前面我们说过，网格轨道的尺寸最小不能小于其内容的最小尺寸，即 <code>min-content</code> 。一旦触发了，浏览器在计算弹性轨道尺寸时，就会重新遍历网格轨道，有可能会进行多次计算。不同的是，所有网格轨道弹性系数小于 <code>1</code> ，且触发最小尺寸时，浏览器会循环遍历网格轨道，重新计算网格容器的可用空间。比如，将上面示例的 <code>grid-template-columns</code> 值调整为 <code>0.3fr 0.1fr 220px 0.1fr</code>，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: .3fr .1fr 220px .1fr;
    
    gap: 20px;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有弹性列网格轨道的弹性系数总和是 <code>0.5fr</code> ，它小于 <code>1fr</code> ，根据相关公式，我们可以计算出对应的网格轨道尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: 0.3fr 0.1fr 220px 0.1fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.3fr + 0.1fr + 0.1fr = 0.5fr (弹性系数总和是小于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1fr = (800 - 220 - 20 x 3) ÷ 1 = 520px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 20px × 3) = 0.3 × 520 = 156px &gt;  min-content, 即96.58px
网格列轨道2尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px &lt; min-content，即89.08px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px &lt; min-content，即75.38px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从第一次计算的结果中不难发现，第二列和第四列的计算值都小于其最小尺寸（<code>min-content</code>），此时浏览器将会再次计算网格容器的可用空间。浏览器第一次计算出来的第二列和第四列的值小于它们的最小尺寸（<code>min-content</code>），加上网格轨道尺寸是不能小于其最小尺寸，要是小于最小尺寸，将会取其 <code>min-content</code> 作为对应网格轨道的尺寸。如此一来：</p><ul><li>第二列的<code>min-content</code> 尺寸值等于 <code>89.08px</code> ，浏览器会将该值作为第二列网格轨道尺寸的计算值；</li><li>第四列的 <code>min-content</code> 尺寸值等于 <code>75.38px</code> ，浏览器会将该值作为第四列网格轨道尺寸的计算值。</li></ul><p>根据这些值，浏览器会重新计算出网格容器的可用空间，即 <code>800px - 220px - 20px × 3 - 89.08px - 75.38px = 355.54px</code> 。网格第一列根据公式可以计算出 <code>0.3fr</code> 对应的值，即 <code>0.3 × 355.54px = 106.66px</code> 。</p><p>整个计算过程如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: 0.3fr 0.1fr 220px 0.1fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.3fr + 0.1fr + 0.1fr = 0.5fr (弹性系数总和是小于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1fr = (800 - 220 - 20 x 3) ÷ 1 = 520px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 20px × 3) = 0.3 × 520 = 156px &gt;  min-content, 即96.58px
网格列轨道2尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px &lt; min-content，即89.08px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px &lt; min-content，即75.38px

网格轨道尺寸不能小于其内容最小尺寸 min-content
当有网格轨道尺寸小于其最小尺寸时，将最小尺寸设置为网格轨道尺寸，浏览器重新计算网格容器的可用空间

-----浏览器重新计算网格容器的可用空间------
网格容器的可用空间 = 800px - 220px - 89.08px - 75.38px - 20px × 3 = 355.54px
每一个fr，即 1fr = (800px - 220px - 89.08px - 75.38px - 20px × 3) ÷ 1fr = 355.54px

网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 89.08px - 75.38px - 20px × 3)  = 0.3 × 355.54 = 106.66px &gt;  min-content, 即96.58px
网格列轨道2尺寸 =  min-content = 89.08px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = min-content = 75.38px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/497468ee3c9444d385561b65fc7a66e4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,27),w={href:"https://codepen.io/airen/full/XWqOOpy",target:"_blank",rel:"noopener noreferrer"},z=o(`<p>如果上面的计算公式和过程让你还是对 <code>fr</code> 计算感到困惑，那么你可以尝试着换下面的这种方式来理解 <code>fr</code> 的计算，用你熟悉的 <code>%</code> 知识来理解 <code>fr</code> 。</p><p>简单地说：</p><blockquote><p><strong><code>1</code><strong><strong>个</strong></strong><code>fr</code><strong><strong>（即</strong></strong><code>1fr</code><strong><strong>）就是</strong></strong><code>100%</code><strong><strong>网格容器的可用空间；</strong></strong><code>2</code><strong><strong>个</strong></strong><code>fr</code><strong><strong>（即</strong></strong><code>2fr</code><strong><strong>）是各</strong></strong><code>50%</code><strong><strong>网格容器的可用空间，即</strong></strong><code>1fr</code><strong><strong>是</strong></strong><code>50%</code><strong><strong>网格容器的可用空间。以此类推</strong></strong>，要是你有<code>25</code><strong><strong>个</strong></strong><code>fr</code><strong><strong>（即</strong></strong><code>25fr</code><strong><strong>），那么每个</strong></strong><code>fr</code><strong><strong>（</strong></strong><code>1fr</code>）就是</strong> <strong><code>1/25</code></strong> <strong>或</strong> <strong><code>4%</code></strong> 。</p></blockquote><p>使用饼图可以很形象地描述<code>fr</code>：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90bd56460a144ea6b88badeed11d63b9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><strong>注意，一个饼图（圆）就相当于网格容器的可用空间，分割的份数就相当于设置了弹性系数的网格轨道</strong> 。</p><p>无论你是要使用 <code>fr</code> 还是 <code>%</code> 来设置网格轨道的值，都可以按下面的方式来执行：</p><ul><li>①：决定有多少个网格轨道（列或行） ；</li><li>②：进行计算 ；</li><li>③：创建轨道 ；</li><li>④：将数值应用于每个网格轨道 。</li></ul><p>先使用 <code>%</code>。假设网格容器宽度是 <code>800px</code>（在无其他网格属性显式设置之下，这个值也是网格容器的可用空间），并且该网格有四列（为了好区别，给每个网格列轨道分别取个名，比如“<strong>Tom</strong> ”、&quot;<strong>Jack</strong> &quot;、&quot;<strong>Lucy</strong> &quot;和&quot;<strong>Nick</strong> &quot;）。 同时希望列宽相等，而且填充整个网格容器（网格容器可用空间全部用完），那么每列设置的值就是 <code>100 ÷ 4 × 100% = 25%</code>：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
    width: 800px; 
    display: grid; 
    
    grid-template-columns: 25% 25% 25% 25%; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每列网格轨道宽度都是网格容器可用空间（<code>800px</code>）的 <code>25%</code>，即：<code>800px × 25% = 200px</code>：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a552cdf095142d99097dd0263bf0caf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,12),L={href:"https://codepen.io/airen/full/mdLvYME",target:"_blank",rel:"noopener noreferrer"},T=o(`<p>后来你决定让其中一列的宽度（比如“Tom”）是其他列的宽度的两倍，即 <code>2x + 1x + 1x + 1x = 100</code>，那么 <code>x</code> 是多少？如果仅仅是粗暴地将“Tom”列设置为 <code>50%</code>，其他依旧是 <code>25%</code>，这样就假设 <code>x = 25%</code> 了：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
    grid-template-columns: 50% 25% 25% 25%; 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>网格“Nick”列轨道溢出了网格容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a44debe3a74424297ac992ceb88a95e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),N={href:"https://codepen.io/airen/full/rNvPgRg",target:"_blank",rel:"noopener noreferrer"},M=o(`<p><strong>前面介绍</strong> <strong><code>%</code></strong> <strong>时说过，网格轨道取值</strong> <strong><code>%</code></strong> <strong>是相对于网格容器宽度计算</strong> 。</p><p>如果我们希望网格轨道不溢出网格容器，就需要重新计算 <code>x</code> 的值，即 <code>2x + 1x + 1x + 1x = 100</code>，就可以算出 <code>x = 100 ÷ 5 = 20</code>，一个 <code>x</code> 就是网格容器可用宽度的 <code>20%</code>，对应的就是<code>160px</code>：</p><ul><li>①：“Tom” 列宽就是 <code>2x = 2 x 20% = 40%</code>；</li><li>②：“Jack”列宽就是 <code>1x = 1 x 20% = 20%</code>；</li><li>③：“Lucy”列宽就是 <code>1x = 1 x 20% = 20%</code>；</li><li>④：“Nick”列宽就是 <code>1x = 1 x 20% = 20%</code>。</li></ul><p>算出每个 <code>x</code> 值之后，需要重新改变每一列的轨道值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .container { 
     grid-template-columns: 40% 20% 20% 20%; 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新计算并设置网格列轨道值之后，网格列不会溢出网格容器了，但每列的列宽就变了，但还是保持了“Tom”列宽是其他列宽的两倍：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c19d05ea2f11485396c80c743efafc87~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),D={href:"https://codepen.io/airen/full/NWMoZGL",target:"_blank",rel:"noopener noreferrer"},V=o(`<p>如果说需要再新增一列（比如“<strong>Tony</strong> ”），这样一来网格容器就有五列，且每列网格轨道都是 <code>25%</code>。即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
    grid-template-columns: 25% 25% 25% 25% 25%; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增的“Tony”列将会溢出网格容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6e8b46f60e4b618aa32c5f0ae89d20~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),W={href:"https://codepen.io/airen/full/QWrYXvY",target:"_blank",rel:"noopener noreferrer"},Y=o(`<p>如果不希望新增的列溢出网格容器，那么就需要五列加起来的总数是 <code>100</code>，每列是 <code>100 ÷ 5 = 20%</code>。需要调整每列的宽度：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
    grid-template-columns: 20% 20% 20% 20% 20%; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，网格列轨道的尺寸使用百分比值，在新增或删除一列，或添加网格沟槽，或改变它们的大小，都需要：</p><ul><li>重新计算每一列网格轨道的大小；</li><li>将新的尺寸值重新应用于每列网格轨道。</li></ul><p>而 <code>fr</code> 将改变这一切。同样的，需要创建四列，每一列的宽度是 <code>1fr</code>：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .container { 
     grid-template-columns: 1fr 1fr 1fr 1fr; 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f92b645f8c249cb89b3459d3beba333~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),B={href:"https://codepen.io/airen/full/wvjNLjR",target:"_blank",rel:"noopener noreferrer"},R=o(`<p>我们可以使用饼图来拆分上图中 <code>fr</code> 的计算。把网格容器可用空间（<code>800px</code>）当作是一张饼，它被网格列轨道（“Tom”，“Jack”，“Lucy”和“Nick”）分成了四份（即<code>4</code>个<code>1fr</code>），每份（<code>1fr</code>）等于 <code>1 ÷ 4 = 0.25</code>（即<code>25%</code>）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/591fb0281fde47cc96766a0a893557d5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>和 <code>%</code> 有点类似，如果你想“Tom”列是其他列的两倍，只需要将这一列设置为 <code>2fr</code>。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
    grid-template-columns: 2fr 1fr 1fr 1fr; 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/583a34bcdd094b1c884175b56e53bb2a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),H={href:"https://codepen.io/airen/full/GRdLqVd",target:"_blank",rel:"noopener noreferrer"},O=o('<p>同样的，网格容器的可用空间这张饼图（<code>800px</code>）分成了四份，其中“Tom”列是 <code>2fr</code>，等于<code>2</code>个<code>fr</code>，而且是其他列（“Jack”，“Lucy”和“Nick”）的两倍（<code>1fr</code>）。所以<code>1fr</code>的值是<code>1 ÷ 5 = 20%</code>（<code>2fr + 1fr + 1fr + 1fr = 5fr</code>）。因此，“Tom”列的 <code>2fr</code> 是 <code>2/5</code>（<code>40%</code>）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdb39336b49c422186fd73d14e16c91a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>网格轨道使用 <code>fr</code> 单位时，如果饼图大小改变了（网格容器可用空间改变了），我们也不需要重新调整网格轨道的值：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf666fd8b53427f9e2ce6617348c71b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>网格容器 <code>.container</code> 从 <code>800px</code> 宽度变到 <code>1200px</code> 时，<code>fr</code> 单位会根据网格容器可用空间自动调整网格项目大小：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2569adb389e2434b989879fd97948532~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',6),X={href:"https://codepen.io/airen/full/xxjeRye",target:"_blank",rel:"noopener noreferrer"},J=o(`<p>同样的原理，即使有网格沟槽的出现（比如 <code>20px</code>），或者新增非 <code>fr</code> 的网格轨道出现（比如“Tony”列列宽是 <code>200px</code>）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .container { 
     grid-template-columns: 1fr 1fr 1fr 1fr 200px; 
     gap: 20px; 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17157b7177e24f56ae252716ac6c1b3b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),F={href:"https://codepen.io/airen/full/Poegbrp",target:"_blank",rel:"noopener noreferrer"},G=o('<p>正如上图所示，“Tony”列先从饼图中分去 <code>200px</code>，其中网格沟槽占用了 <code>80px</code>（即 <code>20px x 4</code>），整个饼图并不完整了，只剩下 <code>520px</code>（<code>800px - 280px</code>），相当于网格容器可用空间只有 <code>520px</code>。不过，剩下的饼图同样分成了四分，“Tom”、“Jack”、“Lucy”和“Nick” 分到相同的等份，即<code>1</code>个<code>fr</code>（<code>1fr</code>），每个<code>fr</code>是 <code>1/4</code>（<code>25%</code>）。</p><p>如此一来，<code>1fr</code> 可以用两种方式来描述：</p><ul><li><p><strong>用分数表示</strong> ：<code>1fr = 1 ÷ 所有网格轨道弹性系数总和</code>（<code>fr</code>总和）；</p></li><li><p><strong>用百分比表示</strong> ：<code>1fr = 100 ÷ 所有网格轨道弹性系数总和</code>（<code>fr</code>总和）。</p></li></ul><p>用示例来描述的话：</p><ul><li>①：所有网格列轨道是<code>4</code>列，且每列宽都是<code>1fr</code>，那么 <code>1fr = 1 ÷ 4 = 1/4 = 25%</code>，即网格容器可用空间的<code>25%</code>。</li><li>②：设置网格容器可用空间是 <code>800px</code>，那么每个 <code>fr</code> 计算出来的值是 <code>800 x 1/4 = 200px</code>（<code>800 x 25% = 200px</code>）。</li><li>③：如果网格容器新增一列，此时所有网格列轨道就是<code>5</code>，那么 <code>1fr = 1 ÷ 5 = 1/5 = 20%</code>，即网格容器可用空间的<code>20%</code>。</li><li>④：如果设置第一列（或某个列）的宽度是<code>2fr</code>，其他列宽仍然是 <code>1fr</code>，那么<code>fr</code>总和是 <code>2fr + 1fr + 1fr + 1fr + 1fr = 6fr</code>。</li><li>⑤：此时，<code>1fr = 1/6 = 16.6667%</code>，即网格容器可用空间的 <code>16.6667%</code>；第一列是<code>2fr</code>，它的值是 <code>2fr = 2/6 = 33.33%</code>，即网格容器可用空间的<code>33.33%</code>。</li><li>⑥：如果设置第一列宽度是<code>200px</code>，其他列仍然是<code>1fr</code>宽。现在的总数是 <code>200px + 1fr + 1fr + 1fr + 1fr = 200px + 4fr</code>，那么所有列的 fr 总和就是<code>4fr</code>，对应的<code>1fr = 1/4 = 25%</code>，即网格容器可用空间的<code>25%</code>。由于第一列宽度是<code>200px</code>，那么网格容器可用空间就是 <code>800px - 200px = 600px</code>（即网格容器宽度减去第一列列宽）。也就是说，<code>1fr</code>等于网格容器可用空间<code>600px</code>的<code>25%</code>，等于<code>600 x 25% = 150px</code>（即<code>1fr=150px</code>）。</li></ul><p>在 CSS 网格布局中，<code>1fr</code> 的计算大致就是这样的一个过程。</p><h3 id="网格项目中的最小尺寸" tabindex="-1"><a class="header-anchor" href="#网格项目中的最小尺寸" aria-hidden="true">#</a> 网格项目中的最小尺寸</h3><p>不过值得一提的是，<strong>设置</strong> <strong><code>1fr</code></strong> <strong>的网格轨道并不代表着网格轨道的列宽（或行高）都是相等的</strong> 。这个就好比 Flexbox 布局中的 <code>flex</code> 属性，即 <strong>所有设置</strong> <strong><code>flex:1</code></strong> <strong>的</strong> <strong>Flex</strong> <strong>项目并不一定就是相等的（或者说均分容器）</strong>。</p><p>这是因为，它和网格轨道中的内容有着关联。换句话说，<strong>只要内容是灵活的（网格项目大小会随着内容扩大或收缩），一个</strong> <strong><code>fr</code></strong> <strong>单位就是总量的一部分</strong> 。意思是说，<strong>只要网格项目中的内容能够缩放以适合该网格轨道（列或行），设置</strong> <strong><code>1fr</code></strong> <strong>网格轨道的大小就相等</strong> 。</p><p>然而，一旦网格项目内容停止缩放以适应网格轨道，设置 <code>fr</code> 值的网格轨道就会被重新调整，使内容能更好的适配。比如，如果网格布局中有一列具有一个固定宽度的网格项目，该网格列轨道的宽度将永远不会小于这个网格项目的宽度。</p><p>因此，一个具有 <code>1fr</code> 的网格列轨道，其最小值等于内容的最小宽度（即 <code>min-content</code>），其中 <code>min-content</code> 可以是网格轨道中网格项目的一个固定尺寸的元素，比如图片的宽度，也可以是一个文本节点中最长的字。如果这种情况在网格布局中产生的话，那么其他设置 <code>1fr</code> 值的网格轨道就会相应地按比例缩小。</p><p>简单地说：</p><blockquote><p><strong>将所有网格列（或行）轨道的值为</strong> <strong><code>1fr</code></strong> <strong>，并不一定能让所有网格列（或行）轨道相等</strong> 。</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eafe541c03ca4c7e86ebaba4b2faceb9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>碰到这种现象并不等于无解，还是可以通过一些技术手段来规避这种现象产生的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e1b897b96f44161af5808844045bc99~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',16),Z={href:"https://codepen.io/airen/full/eYrovrg",target:"_blank",rel:"noopener noreferrer"},E=o(`<p>为了增强大家的理解，我们以上面示例为例，一步一步来阐述。</p><p>这个示例是一个 <code>3 x 1</code> （三列一行）的网格，在 <code>grid-template-columns</code> 属性设置 <code>repeat(3, 1fr)</code> 值，表示三列网格轨道尺寸都是 <code>1fr</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    inline-size: 1000px;
    
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当网格轨道中的内容（网格项目）的尺寸小于 <code>1fr</code> 时，三列是均等的，达到了均分容器宽度的效果。即 <code>1fr</code> 等于网格容器可用空间（<code>1000px - 20px × 2rem</code> ）的 <code>1/3=33.333%</code> 。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;h4&gt;1fr&lt;/h4&gt;
        &lt;p&gt;Tom&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;h4&gt;1fr&lt;/h4&gt;
        &lt;p&gt;Jack&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;h4&gt;1fr&lt;/h4&gt;
        &lt;p&gt;Lucy&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d43f66268cb442f4b61e182cdd05f1f4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),P={href:"https://codepen.io/airen/full/zYjXwbe",target:"_blank",rel:"noopener noreferrer"},K=e("p",null,[d("如果你在 “Tom” 列加入一张 "),e("code",null,"480px"),d(" 宽的图片时，并且样式中没有对 "),e("code",null,"img"),d(" 设置 "),e("code",null,"max-width: 100%"),d(" 或者 "),e("code",null,"aspect-ratio"),d(" 相关的样式（假设没有设置其他与该图片尺寸有关的任何 CSS 样式规则），你将看到的效果如下：")],-1),Q=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f83fd74faee847baa2a25c008331889f~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),U={href:"https://codepen.io/airen/full/vYjMZLX",target:"_blank",rel:"noopener noreferrer"},I=o('<p>按照 <code>1fr</code> 的计算方式，在该例中，<code>1fr = 322.67px</code>，而事实上，包含图片的“Tom”列，其列宽度不可能小于 <code>500px</code> ，即 图片的宽度 <code>480px</code> 加上网格项目的内距 <code>10px</code> 。也就是说，“Tom” 列的宽度要比 <code>1fr</code> 计算出来值要更大。即使如此，也不代表着该列的 <code>1fr</code> 就等于 <code>500px</code>，它仅能代表的是该列的列宽现在是 <code>500px</code>（因为该列的最小内容宽度就是 <code>img</code> 的 <code>width</code> 值）。</p><p>同时“Tom”列占用网格容器可用空间中的 <code>500px</code>，相应留给 <code>fr</code> 计算的空间就只剩下 <code>468px</code> （<code>1000px - 500px - 2 × 2rem</code> ，其中<code>1rem</code> 是 <code>16px</code> ），其他两列各占剩余空间的 <code>1fr</code>，即 <code>1fr = 1/2=50%</code>，“Jack” 和 “Lucy” 两例计算出来的列宽约是 <code>234px</code> 。</p><p>如果在网格项目中有长单词，或没有任何连字符（<code>-</code>）和空格的字符，比如一个 URL，也有可能会致使所在网格列轨道变宽（比计算出来的 <code>1fr</code> 值要大）。比如，你 “Tom” 列中的 <code>&lt;img ``/&gt;</code> 换成长字符，你会发现，它所在列轨道也要比其他列宽，即三列不相等：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57a64aff9f734604a9c0d14486a408d0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',4),A={href:"https://codepen.io/airen/full/NWMmVRN",target:"_blank",rel:"noopener noreferrer"},$=o('<p>示例中在 “Tom” 列添加了一个长字单词，其字符形长度大约是 <code>507.74px</code> ，另一个是 URL 地址，在没有中连字符（<code>-</code>）和空格等条件之下，也会被视为一个长字符，其字形长度大约是<code>659.7px</code> 。也就是说，“Tom” 列内容最小尺寸（<code>min-content</code>）就是 URL 地址所用字符长度。</p><p>所以，“Tom” 列的列宽大约是 <code>679.7px</code> （URL 字符长度加上所在网格项目内距，<code>659.7px + 20px</code>），网格容器留给 “Jack” 和 “Lucy” 两列可分的空间就只剩下 <code>288.30px</code> （<code>1000px - 679.7px - 2 × 16px</code> ，共中 <code>1rem</code> 等于 <code>16px</code>），对应的 <code>1fr = 1 / 2 = 50%</code> ，“Jack” 和 “Lucy” 两列的列宽是 <code>144.15px</code> （<code>288.30× 50%</code> ）。</p><p>从这两个示例展示的效果中不难发现，<code>fr</code> 会自动设置<strong>最小值（<strong><strong><code>min-width</code></strong></strong>）</strong> ，这将尊重里面的内容，相当于 <code>min-width</code> 的值为 <code>min-content</code>。对于<code>fr</code>来说：</p><blockquote><p><strong>最小值（<strong><strong><code>min-width</code></strong></strong>）是自动设置的（相当于</strong>**<code>min-content</code><strong><strong>）；最大值（</strong></strong><code>max-width</code>**）就是显式设置的值（比如 <strong><code>1fr</code></strong>、 <strong><code>2fr</code></strong>、 <strong><code>3fr</code></strong> 等）。</p></blockquote><p><code>1fr</code> 的底层实现逻辑其实就是 <code>minmax(auto,1fr)</code> （<code>minmax()</code> 是用来设置网格轨道尺寸一个 CSS 函数），意味着 <code>min=auto</code>（即<code>min-width: min-content</code>），<code>max=1fr</code>。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa1b3da0eeae45e6b79207c4d3aafebb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',6),ee={href:"https://codepen.io/airen/full/VwxNOqZ",target:"_blank",rel:"noopener noreferrer"},de=o('<p>也就是说，如果你真的需要均分列（所有设置 <code>1fr</code> 的列宽相等），就应该使用 <code>minmax(0, 1fr)</code> 来替代 <code>1fr</code> ，将 <code>1fr</code> 的默认<code>min-width</code> 从 <code>min-content</code> （即 <code>auto</code>）重置为 <code>0</code> 。这样就允许网格轨道尺寸保持在 <code>0</code> 至 <code>1f</code> 范围内（最小小到 <code>0</code> ，最大大到 <code>1fr</code>），从而创建保持相等的列。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24c575f300c942909a22c0251c312aae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',2),ne={href:"https://codepen.io/airen/full/BaxeByB",target:"_blank",rel:"noopener noreferrer"},ie=o('<p>但是，请注意，如果网格轨道中有元素内容最小尺寸大于 <code>1fr</code> 计算出来的网格轨道尺寸时，这将导致内容溢出，比如上面示例中的图片和长字符单词。如果需要避免内容溢出，则需要通过其他的 CSS 来处理，比如在 <code>img</code> 上设置 <code>max-width: 100%</code> ，对长字符设置 <code>word-break</code> 或在包裹它们的网格项目上设置 <code>overflow</code> 的值为 <code>scroll</code> 或 <code>hidden</code> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed8c82dff0c2440ebe8e70a27483b1c7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',2),oe={href:"https://codepen.io/airen/full/eYraOey",target:"_blank",rel:"noopener noreferrer"},ce=o(`<p><code>fr</code> 这个表现行为和 Flexbox 中的 <code>flex:1</code> 有点类似，除了使用 <code>minmax(0, 1fr)</code> 来替代 <code>1fr</code> 之外，可以在网格项目上显式设置 <code>min-width: 0</code> 来达到同等的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.item {
    min-width: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88e6f69281e643a69e537a4b66108e01~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),le={href:"https://codepen.io/airen/full/XWqwJRK",target:"_blank",rel:"noopener noreferrer"},re=o(`<p>同样的，对于图像或长字符单词，需要做额外处理，不然会有溢出的可能。</p><p>在 CSS 网格布局中，<code>fr</code> 是一个非常有用的单位，也是 CSS 网格布局中独有的特性。虽然 <code>fr</code> 很强大，但也不能说随时随地都可以使用<code>fr</code>。比如说：</p><ul><li>在<code>calc()</code> 表达式中使用 <code>fr</code> 就无效，因为 <code>fr</code> 的 <code>&lt;flex&gt;</code> 值类型，它和其他 <code>&lt;length&gt;</code>值类型不兼容；</li><li><code>gap</code> 属性中也不能使用 <code>fr</code>，因为 <code>fr</code> 是用来指定网格轨道尺寸的，不是用来指定网格沟槽大小的；</li><li><code>calc()</code> 中使用 <code>var()</code> 和 <code>fr</code> 计算也是一种无效行为，比如 <code>.container{--fr: 2; grid-template-columns: calc(var(--fr) * 1fr)</code>。</li></ul><p><code>fr</code> 有点类似 <code>flex</code>，一般情况都将其视为默认动态单位，可以根据容器可用空间来指定网格轨道。类似 <code>fr</code> 这样的动态单位，特别适用于自适应布局中。比如两列布局，侧边栏固定宽度，主内容自动分割网格容器的可用空间：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container { 
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 220px 1fr;  /* 1fr 也可以使用 minmax(0, 1fr) 替代 */
    gap: 20px; 
}   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e0785e75418497685f842136fdf24d2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),se={href:"https://codepen.io/airen/full/NWMVPBQ",target:"_blank",rel:"noopener noreferrer"},te=o(`<p>使用 <code>fr</code> 虽然能很好地帮助我们构建 Web 布局的效果，尤其是一些弹性布局的效果，但还是要尽可能地规避其最小值的状况。也就是说，我们在使用 <code>fr</code> 构建一些布局时，可以在网格项目上显式设置 <code>min-width</code> 的值为 <code>0</code> 。这样你的代码更具防御性，你构建的 Web 布局也更健壮。</p><p>比如下面这个文本截取的案例（它属于十大经典 Web 案例之一，介绍 Flexbox 的时候有专门介绍过）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b1642549e854b3ab52418657a84ba2d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们使用 CSS Grid 可以这样来完成：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;target&quot;&gt;
  &lt;div class=&quot;target__title&quot;&gt;
    &lt;strong&gt;Grid Layout:&lt;/strong&gt; Text here is very very long that it might
    get truncate if this box get resized too small
  &lt;/div&gt;
  &lt;div class=&quot;target__emoji&quot;&gt;
    🎃
  &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.target {
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  align-items: center;
  gap: 1rem;
}

.target__title {
  overflow: hidden;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),ae={href:"https://codepen.io/airen/full/VwxOYVd",target:"_blank",rel:"noopener noreferrer"},pe=o('<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>前面只是和大家一起探讨了网格布局中的百分比值和 <code>fr</code> 值的计算：</p><ul><li><code>&lt;percentage&gt;</code>： 非负值的百分比值，它相对于网格容器宽度（或高度）计算。采用百分比时有一个细节需要注意，如果网格容器的尺寸大小依赖网格轨道大小时，百分比值将被视为 <code>auto</code>；</li><li><code>&lt;flex&gt;</code> ： 非负值，用单位 <code>fr</code> 来定义网格轨道大小的弹性系数，有点类似于 Flexbox 布局中的 <code>flex</code> 属性，按比例分配网格容器的剩余空间。</li></ul><p>但这绝不是说网格中涉及到计算的就这两种值，其实还有很多其他值也会涉及到计算，比如 <code>grid-template-columns</code> 取值为 <code>auto</code> 、<code>min-content</code> 、<code>max-content</code> 关键词，以及一些 CSS 函数，比如 <code>fit-content()</code> 、<code>minmax()</code>、<code>min()</code> 、<code>max()</code> 、<code>clamp()</code> 和 <code>clac()</code> 等。</p><ul><li><code>max-content</code>：表示以同一网格轨道中内容最大内容的网格项目来计算格轨道网格轨道尺寸。</li><li><code>min-content</code>：表示以同一网格轨道中最大的最小内容的网格项目来计算网格轨道尺寸。</li><li><code>auto</code> ： 如果轨道为最大时，等同于 <code>&lt;max-content&gt;</code>，为最小时，则等同于 <code>&lt;min-content&gt;</code>。</li><li><code>minmax(min, max)</code> ： 是一个来定义大小范围的函数，大于等于 min 值，并且小于等于 max 值。如果 max 值小于 min 值，则该值会被视为 min 值。最大值可以设置为网格轨道系数值 <code>&lt;flex&gt;</code>，但最小值则不行。</li><li><code>fit-content([&lt;length&gt; | &lt;percentage&gt;])</code> ： 相当于 <code>min(max-content, max(auto, argument))</code>，类似于 <code>auto</code> 的计算（即 <code>minmax(auto, max-content)</code>），除非网格轨道大小值是确定下来的，否则该值都大于 <code>auto</code> 的最小值。</li><li><code>repeat([&lt;positive-integer&gt; | auto-fill | auto-fit], &lt;track-list&gt;)</code>： 表示网格轨道的重复部分，以一种更简洁的方式去表示大量而且重复列的表达式</li></ul><p>你会发现，这些尺寸的计算大多会和内容有关，因此有关于这方面更详细的介绍，将放到内在尺寸 Web 设计这节课程中介绍。</p><p>这里要提醒大家的是，<strong>虽然本节课程中的示例大都以</strong> <strong><code>grid-template-columns</code></strong> <strong>属性为例，但不代表这些计算只存在于该属性上，相关的理论与细节也同样存在于</strong> <strong><code>grid-template-rows</code></strong> <strong>、<code>grid-auto-rows</code></strong> <strong>和</strong> <strong><code>grid-auto-columns</code>，只不过部分 CSS 的函数可以运用于</strong> <strong><code>grid-auto-rows</code></strong> <strong>和</strong> <strong><code>grid-auto-columns</code></strong> <strong>属性上，比如</strong> <strong><code>repeat()</code></strong> <strong>函数</strong> 。</p>',7);function me(ue,ve){const n=l("ExternalLinkIcon");return r(),s("div",null,[a,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",p,[d("https://codepen.io/airen/full/ZEoVxNe"),i(n)])])]),m,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",u,[d("https://codepen.io/airen/full/bGMzVgz"),i(n)])])]),v,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",g,[d("https://codepen.io/airen/full/BaxMjbL"),i(n)])])]),b,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",f,[d("https://codepen.io/airen/full/xxjMOKV"),i(n)])])]),x,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",h,[d("https://codepen.io/airen/full/NWMoNxa"),i(n)])])]),S,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",k,[d("https://codepen.io/airen/full/wvjNWYb"),i(n)])])]),_,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",C,[d("https://codepen.io/airen/full/wvjNReB"),i(n)])])]),j,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",y,[d("https://codepen.io/airen/full/YzLBBXz"),i(n)])])]),q,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",w,[d("https://codepen.io/airen/full/XWqOOpy"),i(n)])])]),z,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",L,[d("https://codepen.io/airen/full/mdLvYME"),i(n)])])]),T,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",N,[d("https://codepen.io/airen/full/rNvPgRg"),i(n)])])]),M,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",D,[d("https://codepen.io/airen/full/NWMoZGL"),i(n)])])]),V,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",W,[d("https://codepen.io/airen/full/QWrYXvY"),i(n)])])]),Y,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",B,[d("https://codepen.io/airen/full/wvjNLjR"),i(n)])])]),R,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",H,[d("https://codepen.io/airen/full/GRdLqVd"),i(n)])])]),O,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",X,[d("https://codepen.io/airen/full/xxjeRye"),i(n)])])]),J,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",F,[d("https://codepen.io/airen/full/Poegbrp"),i(n)])])]),G,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",Z,[d("https://codepen.io/airen/full/eYrovrg"),i(n)])])]),E,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",P,[d("https://codepen.io/airen/full/zYjXwbe"),i(n)])])]),K,Q,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",U,[d("https://codepen.io/airen/full/vYjMZLX"),i(n)])])]),I,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",A,[d("https://codepen.io/airen/full/NWMmVRN"),i(n)])])]),$,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",ee,[d("https://codepen.io/airen/full/VwxNOqZ"),i(n)])])]),de,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",ne,[d("https://codepen.io/airen/full/BaxeByB"),i(n)])])]),ie,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",oe,[d("https://codepen.io/airen/full/eYraOey"),i(n)])])]),ce,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",le,[d("https://codepen.io/airen/full/XWqwJRK"),i(n)])])]),re,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",se,[d("https://codepen.io/airen/full/NWMVPBQ"),i(n)])])]),te,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",ae,[d("https://codepen.io/airen/full/VwxOYVd"),i(n)])])]),pe])}const be=c(t,[["render",me],["__file","index-12.html.vue"]]);export{be as default};
