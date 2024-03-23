import{_ as c,M as l,p as a,q as r,R as e,t as d,N as n,a1 as o}from"./framework-e8cb8151.js";const s={},t=o(`<h1 id="_11-定义一个网格布局" tabindex="-1"><a class="header-anchor" href="#_11-定义一个网格布局" aria-hidden="true">#</a> 11-定义一个网格布局</h1><p>既然要使用 CSS 网格布局来构建 Web 布局，那就要先从如何定义一个网格开始，再到如何定义一个符合 Web 布局的网格。也就是说，定义一个网格主要包含两个事情，即 <strong>定义一个网格</strong> 和 <strong>设置网格大小</strong> 。而这两件事情使用几个 CSS 属性就可以完成，只不过这些属性深藏着很多不同的使用方式，而且带来的作用和灵活性都会不同。</p><p>那么我们先从定义网格开始！</p><h2 id="定义网格的类型" tabindex="-1"><a class="header-anchor" href="#定义网格的类型" aria-hidden="true">#</a> 定义网格的类型</h2><p>CSS 中定义一个网格非常简单，只需要在一个元素上显式设置 <code>display</code> 的值为 <code>grid</code> 或 <code>inline-grid</code> 即可。比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid; /* 或 inline-grid */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只不过这是一个最基础的网格，一个 “单列多行”的网格，而且行数由网格容器的子元素（包括其伪元素和文本节点）来决定：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17c85edabf4142409a07bc2dfcbf0bcb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),u={href:"https://codepen.io/airen/full/yLjRzOd",target:"_blank",rel:"noopener noreferrer"},m=o(`<p>默认的网格往往不能满足我们所需，也就是说，要构建一个符合要求的网格，还需要依赖其他的一些属性，比如 <code>grid-template-*</code> （即 <code>grid-template-rows</code> 、<code>grid-template-columns</code> 和 <code>grid-template-areas</code> 以及它们的简写属性 <code>grid-template</code>），或 <code>grid-auto-*</code> （即 <code>grid-auto-rows</code> 、<code>grid-auto-columns</code> 和 <code>grid-auto-flow</code>）。根据不同的属性定义的网格又分为 <strong>显式网格</strong> 和 <strong>隐式网格</strong> ：</p><ul><li><code>grid-template-*</code> 属性定义的网格是一个显式网格；</li><li><code>grid-auto-*</code> 属性定义的网格是一个隐式网格。</li></ul><h2 id="使用-grid-template-columns-和-grid-template-rows-定义网格" tabindex="-1"><a class="header-anchor" href="#使用-grid-template-columns-和-grid-template-rows-定义网格" aria-hidden="true">#</a> 使用 grid-template-columns 和 grid-template-rows 定义网格</h2><p>我们先从定义一个显式网格开始，即先从 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 两个属性着手。你可以在网格容器上使用 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 属性来定义网格的行和列（即网格轨道），它们都接受 <strong>用空格分隔开来的多个数值</strong> ，这些值同时代表网格轨道的大小，而且数值之间的空格代表网格线。</p><p>比如，我们在一个网格容器上显示设置了 <code>grid-template-columns</code> 属性的值是 <code>180px 20% auto 1fr 10vw</code> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid; /* 或 inline-grid */
    grid-template-columns: 180px 20% auto 1fr 10vw;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将会告诉浏览器，定义了一个五列 N 行的网格，即将网格容器分成五列（沿网格容器内联轴 Inline Axis 方向），而且每列的列宽分别是 <code>180px</code> 、 <code>20%</code> 、 <code>auto</code> 、<code>1fr</code> 和 <code>10vw</code> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db55fe969b2149648556900c2e973ba5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如你所见，<code>grid-template-columns</code> 属性的值可以是各种不同类型的长度值，比如以 <code>px</code> 为单位的固定值，以 <code>%</code> 、<code>vw</code> 为单位的相对值，还有像 <code>auto</code> 这样的关键词以及网格布局中独有的单位 <code>fr</code> 等。除此之外还可以是 CSS 的一些函数，比如 <code>min()</code> 、<code>minmax()</code> 等。</p><p>也就是说，可用于 <code>grid-template-columns</code> 的值类型大致可分为三种：</p><ul><li>带有不同单位的长度值，比如 <code>px</code> 、<code>em</code> 、<code>rem</code> 、<code>vw</code> 、<code>vh</code> 、<code>%</code> 、<code>ch</code> 、<code>ex</code> 和 <code>fr</code> 等；</li><li>关键词，比如 <code>none</code> 、<code>auto</code> 、<code>min\`\`-content</code> 和 <code>max-content</code> 等；</li><li>CSS 函数，比如 <code>min()</code> 、<code>max()</code> 、<code>clamp()</code> 、<code>clac()</code> 、<code>fit-content()</code> 、<code>minmax()</code> 和 <code>repeat()</code> 等。</li></ul><blockquote><p>注意，其中有些类型值会涉及到网格布局中的计算，那么这部分将会单独放到一节课程中来介绍！</p></blockquote><p>你也看到了，默认情况下，<code>grid-tempate-columns</code> 会根据值的数量来创建相应数量的列网格轨道，即使在没有相应数量的网格项目存在时，也一样会构建 <code>grid-tempate-columns</code> 属性指定的列数。比如上面的示例，如果网格容器中只有四个网格项目时，<code>grid-template-columns: 180px 20% auto 1fr 10vw</code> 同样会创建一个五列的网格，只不过最后一列是空的，因为没有相应的网格项目自动放置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6f0a43c7a1c407ab75b3bbb37c0dc63~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当然，如果我们网格容器的直接子元素（网格项目）超过了 <code>grid-template-columns</code> 值的数量时，默认情况下，会新增一个行网格轨道。比如 <code>grid-template-columns: 180px 20% auto 1fr 10vw</code> 碰到六个网格项目时，它会创建一个五列两行的网格：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/277c7243c88a4710aa6aaf5b8a269f3c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>依此类推，最终你可能创建的是一个 <code>5 x N</code> 的网格（<code>N</code> 是行网格轨道数量）:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d86190894c934b82bd9ba9ee1cfbb632~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),p={href:"https://codepen.io/airen/full/XWqxeyN",target:"_blank",rel:"noopener noreferrer"},v=o(`<p>上面这个示例中并没有显式使用 <code>grid-template-rows</code> 来指定行网格轨道尺寸，此时将会采用默认值 <code>auto</code> ，即可根据内容来决定网格行轨道的尺寸。当然，你也可以像使用 <code>grid-template-columns</code> 那样来使用 <code>grid-template-rows</code> ，即显示给网格定义行轨道的数量和尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: 180px 20% auto 1fr 10vw;
    grid-template-rows: auto 200px 10vh;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，<code>grid-template-columns</code> 和 <code>grid-template-rows</code> 一起构建了一个 <code>5 x 3</code> （五列三行）的网格（即使网格容器中没有<code>15</code> 个网格项目存在）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d0b5afd9bbc421b891cd2ba9007bef0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),g={href:"https://codepen.io/airen/full/ZEoqwEN",target:"_blank",rel:"noopener noreferrer"},b=o(`<p>同样的，当网格项目超过 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 构建的网格单元格数量时，将会重新创建一个行网格轨道，并且以 <code>auto</code> 来计算行网格轨道尺寸。</p><p>从这两个示例中不难发现：</p><ul><li>如果仅使用 <code>grid-template-columns</code> 属性来定义一个网格时，那么默认情况会创建一个<strong>一行单列（或多列）</strong> 的网格，即 <code>N x 1</code> ，其中 <code>N</code> 对应的是 <code>grid-template-columns</code> 属性值的数量。当网格项目的数量超过 <code>N</code> 时，会自动创建新的行网格轨道。</li><li>如果同时使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性来定义一个网格时，那么默认创建一个 <code>M x N</code> 的网格，其中 <code>M</code> 对应的是 <code>grid-template-rows</code> 属性值的数量，<code>N</code> 对应的是 <code>grid-template-columns</code> 属性值的数量。当网格项目的数量超过 <code>M x N</code> 时，会自动创建新的行网格轨道。</li><li>如果仅使用 <code>grid-template-rows</code> 属性来定义一个网格时，那么默认情况会创建一个<strong>一行（或多行）单列</strong> 的网格，即 <code>M x 1</code> ，其中 <code>M</code> 对应的是 <code>grid-template-rows</code> 属性值的数量。当网格项目的数量超过 <code>M</code> 时，会自动创建新的行网格轨道。</li></ul><p>不过要注意的是，只有 <code>grid-template-rows</code> 和（或）<code>grid-template-columns</code> 属性值定义的网格才是一个显式网格，比如 <code>M x N</code> ，其中 <code>M</code> 是 <code>grid-template-rows</code> 属性值的数量，<code>N</code> 是 <code>grid-template-columns</code> 属性值的数量。如果因网格项目数量总和超过 <code>M x N</code> 而自动新创建行网格轨道，则会被称为是隐式网格。</p><blockquote><p>多出的网格项目自动创建新的行网格轨道，主要原因是 <code>grid-auto-flow</code> 默认的值为 <code>row</code> ，而且网格项目自动放置的算法会首先根据 <code>grid-auto-flow</code> 属性值来决定流动的方向。有关于这方面的详细介绍，稍后会阐述！</p></blockquote><p>当你使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 来创建一个网格时，它们主要做了三件事：</p><ul><li>定义了网格线；</li><li>定义了网格轨道数量；</li><li>定义了网格轨道尺寸。</li></ul><p><code>grid-template-rows</code> 和 <code>grid-template-columns</code> 相当于：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: [列网格线1] [列网格轨道1尺寸] [列网格线2] [列网格轨道2尺寸] [...] [列网格轨道N的尺寸] [列网格线N+1]
grid-template-rows: [行网格线1] [行网格轨道1尺寸] [行网格线2] [行网格轨道2尺寸] [...] [行网格道M的尺寸] [行网格线M+1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    
    grid-template-columns: 180px 20% 10em 1fr 10vw;
    grid-template-rows: 10em 200px 10vh;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd1430c677f34753898cdf963e34f034~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示，<code>grid-template-columns</code> 和 <code>grid-template-rows</code> 创建的网格线默认是以数字进行索引的：</p><ul><li><code>grid-template-columns</code> 创建的列网格线，它从左往右是从 <code>1</code> 到 <code>N+1</code> 进行索引（比如上图中的 <code>1 ~ 6</code>）；从右往左是从 <code>-1</code> 到 <code>-(N+1)</code> 进行索引（比如上图中的 <code>-1 ~ -6</code>）。</li><li><code>grid-template-rows</code> 创建的行网格线，它从上往下是从 <code>1</code> 到 <code>M + 1</code> 进行索引（比如上图中的 <code>1 ~ 4</code>），从下往上是从 <code>-1</code> 到 <code>-(M+1)</code> 进行索（比如上图中的 <code>-1 ~ -4</code>）。</li></ul><blockquote><p>注意，它们也会受 CSS 的书写模式和阅读模式的影响。为了节省篇幅，这里不做详细阐述！</p></blockquote><p>既然默认是数字命名网格线名称，换句话说，就可以显式给网格线命名。你可以在 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 属性中定义网格轨道时给网格线命名。显式命名网格线名称时，网格线名称需要放置在中括号里（<code>[]</code>），即 <code>[line-name]</code> 。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 
grid-template-columns: [列网格线1] [列网格轨道1尺寸] [列网格线2] [列网格轨道2尺寸] [...] [列网格轨道N的尺寸] [列网格线N+1]
grid-template-rows: [行网格线1] [行网格轨道1尺寸] [行网格线2] [行网格轨道2尺寸] [...] [行网格道M的尺寸] [行网格线M+1]
*/

.container {
    grid-template-columns: [col1] 180px [col2] 20% [col3] 10em [col4] 1fr [col5] 10vw [col6];
    grid-template-rows: [row1] 10em [row2] 200px [row3] 10vh [row4];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样会在默认的网格线索引号上新增已命名的网格线名称：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8670c4623494f29b0b10fdf2a7189db~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,19),f={href:"https://codepen.io/airen/full/rNvqRaj",target:"_blank",rel:"noopener noreferrer"},h=o(`<p>注意，它们是相互叠加的关系，并不是相互替换的关系。</p><p>从前面的课程中可以得知，在网格容器中设置 <code>gap</code> 属性时，可以给网格轨道之间设置间距。如果你使用浏览器调试工具查看带有 <code>gap</code> 设置的网格时，你会发现相邻两个网格轨道有两条线网格线存在。很多初学者会误认为这是两条网格线，其实它就是一条网格线：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa9cc6095dca41e9b412f1b253150b5f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>但是我们可以换一种思路来理解，它可以是两条网格线，只不过前者是以 <code>-end</code> 命名的网格线，后者是 <code>-start</code> 命名的网格线：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc3944f7331f4f1cb87fa074bfa849c6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>因此，你可以以 <code>-end</code> 和 <code>-start</code> 给同一条网格线命名：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>grid-template-columns: [列网格线1 列网格线1-start] 列网格轨道1的尺寸 [列网格线1-end 列网格线2-start] 列网格轨道2尺寸 [列网格线2-end 列网格线N-start] 列网格轨道N的尺寸 [列网格线N-end 列网格线(N+1)-start]
grid-template-row: [行网格线1 行网格线1-start] 行网格轨道1的尺寸 [行网格线1-end 行网格线2-start] 行网格轨道2尺寸 [行网格线2-end 行网格线M-start] 行网格轨道M的尺寸 [行网格线M-end 行网格线(M+1)-start]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>来看一个具体的示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f199517e24f74c6cb4f3ac18fb431f13~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),S={href:"https://codepen.io/airen/full/oNdaVVV",target:"_blank",rel:"noopener noreferrer"},w=o(`<p>你可以在 <code>[]</code> 中放置任意数量的网格线名称，但它们之间需要用<strong>空格</strong>隔开。不过在给网格线命名的时候，建议你尽可能使用具有语义化名称，更利于多人协作开发。更有意思的是，你还可以使用表情符（<strong>Emoji</strong> ）或 HTML 的实体符来命名，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns:
     [aside-start 👉] 1fr
     [🤜 aside-end main-start 👐] 4fr
     [🤛 main-end sidebar-start 🤲] 1fr
     [👈 sidebar-end];
    grid-template-rows: [👆] 1fr [🖐️] 1fr [🤘] 1fr [👇];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1460f476b00a4048acaf3c23cc2efe99~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),q={href:"https://codepen.io/airen/full/PoexZPN",target:"_blank",rel:"noopener noreferrer"},k=o(`<p>在给网格线显式命名时，除了给网格线定义一个具有语义化的名称之外，还应该避免使用 CSS 的关键词给其命名，尤其是 <code>span</code> 、<code>auto</code> 、<code>inherit</code> 、<code>initial</code> 、<code>unset</code> 、<code>all</code> 、<code>revert</code> 等。因为使用这些关键词给网格线命名会令 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 属性失效。</p><p>我想你肯定会好奇，使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性定义一个网格时，就自动创建了数字索引的网格线名称了，为什么还需要显式给网格线命名呢？这里简单说一下。</p><p>CSS 网格布局中，使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性定义好一个网格时，它的子元素（网格项目）默认情况之下<strong>只会按照自动放置算法来放置网格项目</strong> ，即按照 HTML 文档源顺序在网格中从第一个网格单元格开始放置，从左往向，从上往下依次放置（书写顺序和阅读模式为 <code>ltr</code> 情况下）。</p><p>但要真正构建一个符合需求的 Web 布局时，还需要通过 <code>grid-column</code> 、<code>grid-row</code> 或 <code>grid-area</code> 属性来指定网格项目放置在什么位置。而且这几个属性都是根据网格线的名称来指定网格项目放置在哪，如此一来，要是没有给网格线显式命名，我们只能使用数字索引编号的网格线名称，比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;header&gt;&lt;/header&gt;
    &lt;main&gt;&lt;/main&gt;
    &lt;nav&gt;&lt;/nav&gt;
    &lt;aside&gt;&lt;/aside&gt;
    &lt;footer&gt;&lt;/footer&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你将看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/909866500c784ae7930ec67c0cb19743~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这已经是我们常见的一种 Web 布局了（三列布局）。如果显式给网格线命名了呢？</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，你甚至可以使用 <code>grid-area</code> 来指定网格项目的位置：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它们得到的布局效果都是等同的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c91401282c9412b8508ff151b974134~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,14),x={href:"https://codepen.io/airen/full/OJZaMxW",target:"_blank",rel:"noopener noreferrer"},_=o(`<p>示例中的 <code>grid-row</code> 、<code>grid-column</code> 和 <code>grid-area</code> 属性是用来指定网格项目在网格中的位置，具体的使用将放在后面的课程中阐述，这里你只需要知道它用来放置网格项目即可。</p><h2 id="使用-grid-template-areas-定义网格" tabindex="-1"><a class="header-anchor" href="#使用-grid-template-areas-定义网格" aria-hidden="true">#</a> 使用 grid-template-areas 定义网格</h2><p>网格布局中，除了使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 创建一个显式网格之外，还可以使用 <code>grid-template-areas</code> 来创建。</p><p>该属性可以用来给网格区域命名，并且指定了命名的网格区域不与任何特定的网格项目关联，但可以将已命名好的网格区域名称用在 <code>grid-row</code> 、<code>grid-column</code> 和 <code>grid-area</code> 属性上，这些属性会按照网格区域名称来放置网格项目。它除了给网格区域命名之外，还提供了网格结构的可视化，使网格容器的整体布局更容易理解。该属性主要接受的值有：</p><ul><li><code>none</code> ：表示没有命名的网格区域，同样也没有显式的网格轨道被这个属性定义（尽管显式的网格轨道仍然可以由 <code>grid-template-columns</code> 或 <code>grid-template-rows</code> 创建）。</li><li><code>&lt;string&gt;</code> ：为<code>grid-template-areas</code> 属性列出的每一个单独的字符串创建一行，用空格分隔的每一个字符串代表的是一个单元格，对应会创建一列网格轨道。多个同名的，跨越相邻行或列的单元格称为网格区域。非矩形的网格区域是无效的。</li></ul><p>简单地说，<code>grid-template-areas</code> 中的每个字符串值都代表网格中的单元格，每行字符串（由多个空格隔开的字符串）代表网格中的行轨道，每个字符串中以空格分隔的一组值代表网格中的列轨道。比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header  header  header&quot;
        &quot;nav     main    aside&quot;
        &quot;footer  footer  footer&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>grid-template-areas</code> 属性值等同于绘制了一个<code>3 x 3</code> （三行三列）的网格：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>----------------------------------
|  header  |  header  |  header  |
----------------------------------
|  nav     |  main    |  aside   |
----------------------------------
| footer   |  footer  |  footer  |
----------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc38354733914e109f80bab1b03ac18f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如此一来，你可以使用 <code>grid-template-areas</code> 结构化（可视化）来构建 Web 布局，比如我们常见的一个 Web 布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f59394d7045472c9151ecb884c38f37~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;header&gt;Primary Navigation Or Tools&lt;/header&gt;
    &lt;nav&gt;Secondary Navigation&lt;/nav&gt;
    &lt;main&gt;Main Content Space&lt;/main&gt;
    &lt;aside&gt;Tertiary Navigation&lt;/aside&gt;
    &lt;footer&gt;Miscellaneous Information&lt;/footer&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-areas:
        &quot;header   header   header&quot;
        &quot;nav      main     aside&quot;
        &quot;nav      footer   footer&quot;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cd38cf9f20e4609a7a01c36883f2423~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),C={href:"https://codepen.io/airen/full/xxjQVGG",target:"_blank",rel:"noopener noreferrer"},j=o(`<p>注意，为了让示例更符合我们所需要的 Web 布局效果，示例中将 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性的值设置为 <code>auto 1fr auto</code> ，用来指定网格轨道的尺寸。</p><p>在 CSS 网格布局中，使用 <code>grid-template-areas</code> 定义一个显式网格是很容易的，但使用它给网格区域命名时有一定的规则，如果你在使用的时候违反了这些规则，将会造成 <code>grid-template-areas</code> 失效，甚至定义出来的网格不是你所期望的网格。</p><p>这里简单的给大家整理了 <code>grid-template-areas</code> 属性给网格区域命名的六条规则：</p><ul><li>规则① ：必须描述一个完整的网格，即网格上的每一个单元格都必须被填充；</li><li>规则② ：一连串的空白，代表什么都没有，将造成 <code>grid-template-areas</code> 语法错误；</li><li>规则③ ：在网格命名中可以使用一个或多个<code>.</code>（<code>U+002E</code>），代表一个空单元格；</li><li>规则④ ： 多个相同单元格命名（令牌）创建一个具有相同名称的命名网格区域。简单地说，跨行或列命名相同的网格区域名称，可以达到合并单元格的作用；</li><li>规则⑤ ：任何其他字符的序列，会代表一个垃圾标记（Trash Token），会使声明无效；</li><li>规则⑥ ：当序列化 <code>grid-template-areas</code> 的 <code>&lt;string&gt;</code> 值是指定值或计算值时，相邻两字符串（网格区域命名）被一个空格（<code>U+0020</code>）隔开，当两者之间有多个空格符时，会被视为一个，其他空格将会被忽略。</li></ul><p>先来看第一条规则。</p><blockquote><p><strong>规则① ：必须描述一个完整的网格，即网格上的每一个单元格都必须被填充</strong> 。</p></blockquote><p>比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header header header&quot;
        &quot;nav    main   aside&quot;
        &quot;footer footer footer&quot;
}

.container {
    grid-template-areas:
        &quot;header   header   header  header&quot;
        &quot;nav      main     main    aside&quot;
        &quot;footer   footer   footer  footer&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然创建的网格是不一样的，一个是 <code>3 x 3</code> 的网格，一个是 <code>4 x 3</code> 的网格，但最终的布局效果是一样的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7704a436d43e466ea973280f565e6600~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),y={href:"https://codepen.io/airen/full/XWqyKLq",target:"_blank",rel:"noopener noreferrer"},z=o(`<p>从上图的效果中可以得知，<strong>每个命名对应的是一个网格单元格</strong> 。</p><p>第二条规则：</p><blockquote><p><strong>规则② ：一连串的空白，代表什么都没有，将造成</strong> <strong><code>grid-template-areas</code></strong> <strong>语法错误。</strong></p></blockquote><p>即，<strong>使用一连串空格来代表一个命名区域</strong> 。在上面的示例基础中做一下调整：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header   header   header  header&quot;
        &quot;nav      main     main    aside&quot;
        &quot;footer   footer   footer  footer&quot;
}

.container {
    grid-template-areas:
        &quot;header   header   header       &quot;
        &quot;nav      main     main    aside&quot;
        &quot;footer   footer   footer  footer&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在第二个<code>.container</code> 中，使用了一连串的空格来替代<code>header</code> ，此时，浏览器会视 <code>grid-tempate-areas</code> 的值是一个无效值，造成 <code>grid-template-areas</code> 属性语法错误，创建的网格也就是一个不符合要求的网格：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9917cf45afc54439a458d114ba5d3bd8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用<strong>规则①</strong> 可以实现区域填充网格且不留空余空间，但不能使用<strong>规则②</strong> 来给网格留出一个空的或几个空的单元格。可实际生产中，Web 布局有时的确需要有空的单元格存在。比如下图这样的 Web 布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc2891bc68f746418016f0b6d88c8c68~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果想给网格留出空白区域（空白的单元格），那就要使用规则三：</p><blockquote><p><strong>规则③ ：在网格命名中可以使用一个或多个 <code>.</code>（<code>U+002E</code>），代表一个空单元格</strong>。</p></blockquote><p>可以在 <code>grid-template-areas</code> 中使用一个点（<code>.</code>）或多个点（<code>...</code>）来告诉浏览器，这个单元格是空白单元格，如果连续有几个都是用点来表示的单元格，则连接区域是一个空白区域。比如上图左侧的布局，中间部分距离浏览器左右两侧都是空白区域，你就可以这样来设置 <code>grid-template-areas</code> 属性的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header  header  header  header  header  header   header    header&quot;
        &quot;...     main    main    main    main    sidebar  sidebar   ...&quot;
        &quot;...     twin-a  twin-a  twin-a  twin-b  twin-b   twin-b    ...&quot;
        &quot;footer  footer  footer  footer  footer  footer   footer     footer&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca931485f3d846b8bd04bafcd2b380de~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,14),M={href:"https://codepen.io/airen/full/KKRraRg",target:"_blank",rel:"noopener noreferrer"},N=o(`<p>另一个布局也是类似的：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header  header  menu    menu    menu    menu    menu    menu&quot;
        &quot;hero    hero    hero    hero    hero    hero    hero    hero&quot;
        &quot;main    main    main    main    main    ...     image   image&quot;
        &quot;main    main    main    main    main    ...     extra   extra&quot;
        &quot;...     brand   brand   brand   brand   brand   brand   ...&quot;
        &quot;footer  footer  footer  footer  footer  footer  footer  footer&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af3030dfa54c4ba1a37fef7bc8677225~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),L={href:"https://codepen.io/airen/full/MWGzJzo",target:"_blank",rel:"noopener noreferrer"},T=o(`<p>示例中使用了<code>...</code> 来代表空单元格，你可以根据自己的喜好，设置任意数量的点号<code>.</code> ，比如 <code>....</code> ，它们和使用一个点（<code>.</code>）所起的作用是等同的。即 <strong><code>.</code>、 <code>..</code>、 <code>...</code> 和 <code>....</code> 等同，在 <code>grid-template-areas</code> 中代表的是一个空单元格</strong> 。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header header header header&quot;
        &quot;.      main   aside  .&quot;
        &quot;footer footer footer footer&quot;;
        
    /* 等同于 */ 
    grid-template-areas:
        &quot;header header header header&quot;
        &quot;...    main   aside  ...&quot;
        &quot;footer footer footer footer&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但在使用多个点代表空单元格时有一个细节尤其要注意，那就是<strong>点与点之间不能有任何空格，否则将会代表多个空单元格</strong> ，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header header header header&quot;
        &quot;nav    main    main   aside&quot;
        &quot;. .    footer  ...&quot;; 
    /* 等同于 */
    grid-template-areas:
        &quot;header header header  header&quot;
        &quot;nav    main   main    aside&quot;
        &quot;.      .      footer  ...&quot;; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba218064b35942cb8b7288810340a951~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),D={href:"https://codepen.io/airen/full/vYjQvNo",target:"_blank",rel:"noopener noreferrer"},W=o(`<p>第四条规则：</p><blockquote><p><strong>规则④ ： 多个相同单元格命名（令牌）创建一个具有相同名称的命名网格区域。简单<strong><strong>地</strong></strong>说，跨行或列命名相同的网格区域名称，可以达到合并单元格的作用</strong>。</p></blockquote><p>其实，前面的示例中已经有<strong>规则④</strong> 存在了。这里还是单独拿一个示例来介绍，大家更易于理解。例如下图这个示例，需要将侧边栏（<code>sidebar</code>）和页脚（<code>footer</code>）合并起来（<code>main</code> 和 <code>footer</code> 区域具有相同的宽度）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/521be410deea4823a5ef43ac4358bc28~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>可以像下面这样给网格区域命名：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header  header&quot;
        &quot;sidebar main&quot;
        &quot;footer  footer&quot;
}

.container {
    grid-template-areas:
        &quot;header  header&quot;
        &quot;sidebar main&quot;
        &quot;sidebar footer&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f9104c9819d40f3818799617b09a9f6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),H={href:"https://codepen.io/airen/full/BaxGMmx",target:"_blank",rel:"noopener noreferrer"},E=o(`<p>两者差异如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/123220480c894bc3ad83d30f1e1d00f0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>通过给网格区域命名来达到合并多个单元格时，你只能按行轨道或列轨道方向合并。也就是说，<strong>一个命名的网格区域跨越多个网格单元格时，它们必须要形成一个单一的填充矩形，否则会造成</strong> <strong><code>grid-template-areas</code></strong> <strong>属性失效</strong> ，比如说一个 <code>L</code> 的形状：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7b389309edf475d8c6b1281c4d5953d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><strong>规则⑤</strong> 提到了，给网格区域命名并不是任何名称都是有效的：</p><blockquote><p><strong>规则⑤ ：任何其他字符的序列，会代表一个垃圾标记（Trash Token），会使声明无效。</strong></p></blockquote><p>在显式给网格区域命名时，尽可能使用有语义的名称，比如前面示例中所示的<code>header</code> 、<code>nav</code> 等等。切勿使用一些数字、标点符号以及它们的组合等，比如 <code>1</code> 、<code>#</code> 、<code>1st</code> 等，将会被视为无效的声明。如果命名的名称是无效的，那么 <code>grid-template-areas</code> 属性也会被视为无效：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 请不要像这样给网格区域命名 */
.container {
    grid-template-areas:
        &quot;1    1     a%b    a%b&quot;
        &quot;1st  main  main   main&quot;
        &quot;1st  3rd   3rd    3rd&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，也可以像给网格线命名那样，使用表情符（Emoji）或（和）HTML 的实体符：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;↤     ↤     ↤    ↤     ↤     ↤&quot;
        &quot;⺗    ✨    ✨    ✨    ①    ①&quot;
        &quot;⺗    ☑     ☑     ☑    ☑     ☑&quot;;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4ade54df6064b6fb28de9ed3ba745f6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),R={href:"https://codepen.io/airen/full/JjvezzZ",target:"_blank",rel:"noopener noreferrer"},V=o(`<p>虽然可以这么使用，但强烈建议不要在生产中这样使用！</p><p>最后一条规则：</p><blockquote><p><strong>规则⑥ ：当序列化</strong> <strong><code>grid-template-areas</code></strong> <strong>的</strong> <strong><code>&lt;string&gt;</code></strong> <strong>值是指定值或计算值时，<strong><strong>相邻两字符串（网格区域命名）被一个空格（</strong></strong><code>U+0020</code>）隔开，当两者之间有多个空格符时，会被视为一个，其他空格将会被忽略</strong> 。</p></blockquote><p>简单地说，<code>grid-template-areas</code> 属性中同一行相邻的两个名称（<code>&lt;string&gt;</code>）之间的空格符的数量总是会被视为只有一个。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81cc8e011080481e8a56d298a1ac98a9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图中，两个<code>grid-template-areas</code> 的值最终被浏览器解析出来的结果是一样的。</p><p>也就是说，在使用 <code>grid-template-areas</code> 定义网格时，命名应该遵循这些规则，不然容易造成语法上的错误，使该属性失效：</p><ul><li>规则① ：必须描述一个完整的网格，即网格上的每一个单元格都必须被填充；</li><li>规则② ：一连串的空白，代表什么都没有，将造成 <code>grid-template-areas</code> 语法错误；</li><li>规则③ ：在网格命名中可以使用一个或多个<code>.</code>（<code>U+002E</code>），代表一个空单元格；</li><li>规则④ ： 跨行命名相同的网格区域名称，可以达到合并单元格的作用；</li><li>规则⑤ ：任何其他字符的序列，会代表一个垃圾标记（Trash Token），会使声明无效。</li></ul><p><code>grid-template-areas</code> 在显式给网格区域命名的同时，也隐式创建了相应的行网格线与列网格线，并且网格线的名称是以 <strong><code>网格区域名称-start</code></strong> 和 <strong><code>网格区域名称-end</code></strong> 方式命名。例如，网格区域的名称叫 <code>header</code> ，则围绕该区域会创建四条隐式网格线：</p><ul><li>行网格线，<code>header-start</code> 和 <code>header-end</code> ；</li><li>列网格线， <code>header-start</code> 和 <code>header-end</code>。</li></ul><p>随意拿前面的一个示例来看：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-areas:
        &quot;header header header&quot;
        &quot;nav    main   aside&quot;
        &quot;footer footer footer&quot;;
}

.container {
    grid-template-areas:
        &quot;header header header header&quot;
        &quot;nav    main   main   aside&quot;
        &quot;footer footer footer footer&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d520eead57cc4725b08e76941ca5e79d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如此一来，结合前面的内容，我们可以得知，给网格线命名时，就可以：</p><ul><li>几乎可在中括号 <code>[]</code> 中使用除关键词 <code>span</code> 、<code>inherit</code> 、<code>initial</code> 、<code>revert</code> 、<code>all</code> 、<code>unset</code> 和 <code>auto</code> 等之外的任意 <code>&lt;string&gt;</code> 符，也包括表情符（Emoji）和 HTML 实体符；</li><li><code>grid-template-areas</code> 创建的网格区域名称，会以 <code>-start</code> 和 <code>-end</code> 为后缀创建四条隐式命名网格线名称；</li><li>可以在中括号 <code>[]</code> 中同时给同一条网格线命名多个名称，多个名称之间需要用空格分隔；</li><li>多条网格线可以有相同的名字，引用时在名字后面附上网格线对应的数字索引号；</li><li>在未显式给网格线命名时，将会以数字为网格线编号。</li></ul><blockquote><p><strong>使用</strong> <strong><code>grid-template-columns</code></strong> <strong>、<code>grid-template-rows</code></strong> <strong>和</strong> <strong><code>grid-template-areas</code></strong> <strong>属性定义的网格是一个显式网格</strong> 。有明确的网格轨道（行或列）和单元格数量。</p></blockquote><h2 id="使用-grid-auto-columns-和-grid-auto-rows-定义网格" tabindex="-1"><a class="header-anchor" href="#使用-grid-auto-columns-和-grid-auto-rows-定义网格" aria-hidden="true">#</a> 使用 grid-auto-columns 和 grid-auto-rows 定义网格</h2><p>通过前面课程的学习，我们知道了什么是显式网格，以及如何定义一个显式网格。在 CSS 网格布局中，除了使用 <code>grid-template-*</code> （<code>grid-template-columns</code> 、<code>grid-template-rows</code> 和 <code>grid-template-areas</code>）之外，还可以使用 <code>grid-auto-*</code> （即 <code>grid-auto-columns</code> 、<code>grid-auto-rows</code> 和 <code>grid-auto-flow</code>）来定义一个网格。</p><p>这里先从 <code>grid-auto-columns</code> 和 <code>grid-auto-rows</code> 属性开始。</p><p>你已经知道了，可以在网格容器上显式设置 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 值定义一个网格，并且指定网格轨道的尺寸大小。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    gap: 4px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>grid-template-columns</code> 告诉浏览器创建了一个两列（列宽是 <code>200px</code>）的网格，但并没有告诉浏览器，网格有几行以及行高是多少。这个时候浏览器会根据网格项目来创建行轨道。</p><p>当网格容器只有一个或两个网格项目时，它创建的是一个 <code>1 x 2</code> （一行两列）的网格；当网格项目超过<code>2</code> （即网格列轨道数量，<code>grid-template-columns</code> 属性的值，此例为<code>2</code>）时，浏览器会新创建一个行轨道，并且以内容高度为行轨道高度，依此类推：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ff1f82677894aab8d057ba14cf1b2b9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,24),Z={href:"https://codepen.io/airen/full/oNdQRZL",target:"_blank",rel:"noopener noreferrer"},G=e("p",null,[d("浏览器会这样处理，是因为我们并没有明确地把网格项目放置到指定的网格单元格（或网格区域上），因此它会被 "),e("strong",null,"自动放置（Auto Placement）"),d(" 。默认情况下，每个网格项目在行轴和列轴上的跨度（"),e("code",null,"span"),d("）都是 "),e("code",null,"1"),d(" ，所以它们都会被放置到下一个可用的网格单元格中。")],-1),J={href:"https://www.w3.org/TR/css-grid/#grid-auto-flow-property",target:"_blank",rel:"noopener noreferrer"},O=o(`<blockquote><p>Grid items that aren’t explicitly placed are automatically placed into an unoccupied space in the grid container.</p></blockquote><p>大致意思是 “<strong>没有明确放置的网格项目会被自动放置到网格容器中一个未被占用的空间（网格单元格）</strong> ”。但它有一个最基本的规则：</p><blockquote><p><strong>网格中的网格项目会把自已摆放到网格中，每一个网格会有一个网格项目。默认的流向是按行排列网格项目。这是因为</strong> <strong><code>grid-auto-flow</code></strong> <strong>属性默认值为</strong> <strong><code>row</code></strong> 。</p></blockquote><p>上面这个示例的效果也验证了这一基本原则。在网格中这个新增的行被称为<strong>隐式行轨道</strong> ，被自动创建的隐式行轨道的尺寸是自适应大小的，它会根据它所包含的内容来设定行轨道尺寸，以保证内容不溢出网格。</p><p>从这里，我们可以获得两点信息：</p><ul><li>由自动放置网格项目而创建新的隐式行轨道，它的尺寸也是可以被显式设置的；</li><li>虽然网格默认流向是按行排列网格项目，但是我们也可以让它按列排列，只需要更改 <code>grid-auto-flow</code> 属性的值。</li></ul><p>第一点比较好理解，在网格布局中，有一个类似于 <code>grid-template-rows</code> 的属性，即 <code>grid-auto-rows</code> ，该属性主要用来显式指定隐式行轨道的尺寸。比如，我们在上面的示例中新增一行代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    gap: 4px;
    
    /* 设置隐式行轨道尺寸 */
    grid-auto-rows: 200px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候 <code>grid-auto-rows</code> 指定了隐式行网格轨道的尺寸是 <code>200px</code> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da18c53d6efd4be79023389bcedbde90~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),Q={href:"https://codepen.io/airen/full/oNdQrbo",target:"_blank",rel:"noopener noreferrer"},X=o(`<p><code>grid-auto-rows</code> 属性和 <code>grid-template-rows</code> 属性类似，可以设置多个值，并且每个值之间使用空格隔开。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-columns: repeat(2, 200px);
    
    grid-auto-rows: 100px 160px 1fr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15290f5cde984865987e6065ac904605~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),P={href:"https://codepen.io/airen/full/jOxXLZL",target:"_blank",rel:"noopener noreferrer"},B=o(`<p>不难发现，<code>grid-auto-rows</code> 属性的值是不断循环的，将所设置的值按创建的隐式行轨道循环下去。比如上面示例中的 <code>grid-auto-rows: 100px 160px 1fr</code> ，当：</p><ul><li>只有一行行网格轨道时，它的尺寸是 <code>100px</code>；</li><li>有两行行网格轨道时，第一行是 <code>100px</code>，第二行是 <code>160px</code>；</li><li>有三行行网格轨道时，第一行是 <code>100px</code> ，第二行是 <code>160px</code> ，第三行是 <code>1fr</code>；</li><li>有四行网格轨道时，第一行是 <code>100px</code> ，第二行是 <code>160px</code> ，第三行是 <code>1fr</code> ，第四行将开始重新循环，即它的行高是 <code>100px</code>；</li><li>依此类推 ……</li></ul><p>这个特性是 <code>grid-template-rows</code> 属性没有的，那是因为 <code>grid-template-rows</code> 指定的值数量是设置显式网格的，如果网格行轨道超过 <code>grid-template-rows</code> 属性值的数量时，它将自动创建隐式的行网格轨道，在没有显式设置 <code>grid-auto-rows</code> 时，将会默认以 <code>auto</code> 值来设置创建的隐式行网格轨道尺寸：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: 100px 200px 1fr;
}

.container {
    grid-template-columns: repeat(2, 200px);
    grid-auto-rows: 100px 200px 1fr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f5044678e094b2e8a957a667b450a0e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当然，在网格布局中，你可以将 <code>grid-tempalte-rows</code> 和 <code>grid-auto-rows</code> 组合在一起使用，它们将会告诉浏览器，显式行网格轨道尺寸按照 <code>grid-template-rows</code> 属性值计算，隐式行网格轨道尺寸按照 <code>grid-auto-rows</code> 属性值计算。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: repeat(2, 100px);
    
    grid-auto-rows: 80px 1fr 160px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/181617aa9ad54000b732a01ed194c938~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),K={href:"https://codepen.io/airen/full/xxjmLYm",target:"_blank",rel:"noopener noreferrer"},U=o('<p>也就是说，在 CSS 网格布局中，<code>grid-template-rows</code> 和 <code>grid-auto-rows</code> 都是用来设置网格行轨道尺寸的，不同的是：</p><ul><li><code>grid-template-rows</code> 设置<strong>显式行网格轨道尺寸</strong>；</li><li><code>grid-auto-rows</code> 设置<strong>隐式行网格轨道尺寸</strong>。</li></ul><p>它们可以用的值类型几乎是一致的，即可用于<code>grid-template-rows</code> 属性的值都可以用在 <code>grid-auto-rows</code> 属性上，需要注意的是 <code>repeat()</code> 函数用于 <code>grid-auto-rows</code> 时会失效，当其失效时，<code>grid-auto-rows</code> 会取其默认值 <code>auto</code> 。</p><blockquote><p><strong><code>grid-auto-columns</code></strong> <strong>的使用和</strong> <strong><code>grid-auto-rows</code></strong> <strong>一样，不同的是它用来创建隐式列轨道和隐式列轨道尺寸</strong> 。</p></blockquote><h2 id="使用-grid-auto-flow-改变网格排列方向" tabindex="-1"><a class="header-anchor" href="#使用-grid-auto-flow-改变网格排列方向" aria-hidden="true">#</a> 使用 grid-auto-flow 改变网格排列方向</h2><blockquote><p>CSS 网格中的 <code>grid-auto-flow</code> 属性有点类似于 Flexbox 布局中的 <code>flex-direction</code> 属性！</p></blockquote><p>如果你没有在网格容器上显式设置 <code>grid-template-columns</code> 、<code>grid-template-rows</code> 和 <code>grid-template-areas</code> 属性值的话，那么默认情况，网格项目是沿着块轴（Block Axis）方向顺流下来的。由于我们使用的语言，其阅读和书写方式默认是 <code>ltr</code> （Left-To-Right），所以你看到的是会新增行网格轨道来自动放置网格项目。</p><p>要是你调整 CSS 的书写模式，即 <code>writing-mode</code> 的值或者 <code>direction</code> 的值，你会看到网格项目流的方向会做出相应调整，但始终默认是沿着块轴方向放置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5a74e54982b425fa02868c19b410bcb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',9),A={href:"https://codepen.io/airen/full/gOzZGvX",target:"_blank",rel:"noopener noreferrer"},I=o(`<p>即网格流受书写模式影响：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54d99ecf2edd4899b92243d7c3c417a0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，如果没有特殊声明，我们的书写模式都是</strong> <strong><code>ltr</code></strong> <strong>模式</strong> ！</p></blockquote><p>在网格布局中，我们可以使用 <code>grid-auto-flow</code> 来控制流的方向。该属性可以接受的值主要有：</p><ul><li><code>row</code> ：自动放置算法，通过依次填充每一行来放置网格项目，必要时添加新行。如果既没有提供行也没有提供列，则假定是行。</li><li><code>column</code> ：自动放置算法，通过依次填充每一列来放置网格项目，必要时添加新的列。</li><li><code>dense</code> ：如果 <code>grid-auto-flow</code> 属性指定了该值，自动放置算法使用 <code>dense</code> （“密集”）包装算法，如果较小的网格项目出现在网格中，它将尝试在较早的时间内填入洞（“网格单元格”）。这可能会导致网格项目不按顺序出现，而这样做会填补大网格项目留下的洞（“单元格”）。如果省略了该值，则使用 <code>sparse</code> （“稀疏”）算法，自动放置算法在放置网格项目时，只在网格中“向前（<code>forward</code>）”移动，从不回溯以填补漏洞。这确保了所有自动放置的网格项目都是“按顺序”出现的，即使是留下了可以由后来的网格项目填补的洞（“网格单元格”）。</li></ul><blockquote><p><strong>注意，<code>dense</code></strong> <strong>只是改变了网格项目的视觉顺序，可能会导致它们出现失序，这对 Web 可访问性是不利的。</strong></p></blockquote><p>简单地说，<code>grid-auto-flow</code> 可以接受 <code>row</code> （即默认值），<code>column</code> ，<code>dense</code> 以及 <code>row</code> 、<code>column</code> 和 <code>dense</code> 的组合值，即 <code>row dense</code> 和 <code>column dense</code> 。</p><p>比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(2, 100px);
    gap: 1rem;
    
    grid-auto-flow: var(--grid-auto-flow, row);
    grid-auto-columns: 200px; /* 指定隐式列轨道尺寸 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>grid-auto-flow</code> 取值为 <code>row</code> （即<code>--grid-auto-flow</code> 的值为 <code>row</code> ），这个时候网格项目自动放置是从第一个网格单元格开始，从左往右依次排列，当网格列轨道数量不够时（示例中显式设置的是 <code>3</code> 列），会自动换行：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506632dde6134ac69f87ad7e53ac1c0c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当 <code>grid-auto-flow</code> 取值为 <code>column</code> 时，网格项目自动放置会从第一列第一个网格单元格开始，从上往下排列，当网格行轨道数量不够时，会新创建一列网格轨道：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd30f5e99a2d40029e7c49252f934655~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>grid-auto-flow</code> 取值为 <code>row</code> 和 <code>column</code> 时网格项目自动放置流方向对比如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e10924ec3a34874adf1d8db41ffb3ec~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),Y={href:"https://codepen.io/airen/full/wvjRpoM",target:"_blank",rel:"noopener noreferrer"},F=o(`<p>注意，在这个示例中，你看不到 <code>grid-auto-flow</code> 取值为 <code>dense</code> 以及 <code>row dense</code> 和 <code>column dense</code> 带来的变化，因为我们示例是一个按顺序，按方向自动放置网格项目的。</p><p>我们把上面示例调整一下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，<code>grid-auto-flow</code> 值为 <code>row</code> 或 <code>column</code> 时，都会有空的单元格出现，而这些空的单元格也称为“网格洞”。意思就是，应该按照顺序填充的单元格却没有被填充，好比在一个布局挖了几个洞。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f2a71db95d54e60b36d70812ded4a87~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在网格中会产生这样的网格洞（网格缺口），是因为对于自动放置的网格项目，如果网格轨道的大小不适合放入一个网格项目，这个网格项目就会自动被移到下一行，直到它找到了可以容纳它的空间。</p><p>在网格布局中，我们并不希望有上面示例这种现象产生，即<strong>产生网格缺口</strong> 。如果你想避免这种现象产生，需要在网格容器上显式将 <code>grid-auto-flow</code> 的值设置为 <code>dense</code> 。如果网格流的顺序是 <code>row</code> 时，可以使用 <code>row dense</code> ，但它的效果和 <code>dense</code> 一样，这主要是因为 <code>grid-auto-flow</code> 的默认值是 <code>row</code> 。如果你网格流的顺序是 <code>column</code> ，那就需要显式设置 <code>column dense</code> 才能避免网格缺口出现。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afbebd2dcfdb405ca1bf5c98d07c1ca7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>row</code> 、<code>column</code> 、<code>dense</code> 、<code>row dense</code> 和 <code>column dense</code> 效果对比如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dcb35b16ffb4bdc91507268d9508cd6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),$={href:"https://codepen.io/airen/full/JjvwMeV",target:"_blank",rel:"noopener noreferrer"},ee=o(`<p>这个功能，在创建图片墙时非常有用:</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;ul class=&quot;gallery&quot;&gt;
    &lt;li&gt;
        &lt;img src=&quot;https://source.unsplash.com/random?iran&quot; alt=&quot;&quot; /&gt;
    &lt;/li&gt;
    &lt;!-- ... 此处省略14个 --&gt;
&lt;/ul&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.gallery {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc0a9e1f7c6640589d1402243dfcc50d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),de={href:"https://codepen.io/airen/full/oNdJEqz",target:"_blank",rel:"noopener noreferrer"},ie=o('<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>在 CSS 网格中，网格容器的 <code>grid-template-rows</code> 、<code>grid-template-columns</code> 和 <code>grid-template-areas</code> 属性定义了显式网格的固定数量的网格轨道。当网格项目被定位在这些界限之外时，网格容器会通过向网格添加隐式网格线来生成隐式网格轨道。这些网格线与显式网格线一起构建了隐式网格。</p><p>另外，网格容器的 <code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 属性对这些隐式网格轨道，以及由 <code>grid-template-areas</code> 创建但未被 <code>grid-template-rows</code> 或 <code>grid-template-columns</code> 明确调整大小的任何显式网格轨道进行调整。</p><p>同时，网格容器的 <code>grid-auto-flow</code> 属性控制没有明确位置的网格项目的自动放置。一旦显式网格被填满（或没有显式网格），自动放置也会创建隐式网格。</p><p>我们可以这样来理解：</p><ul><li><code>grid-template-rows</code> 、<code>grid-template-columns</code> 和 <code>grid-template-areas</code> 定义显式网格，但 <code>grid-template-areas</code> 无法指定网格轨道尺寸大小。</li><li><code>grid-template-rows</code> 和 <code>grid-template-columns</code> 可用来指定显式网格轨道数量和尺寸。</li><li><code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 以及 <code>grid-auto-flow</code> 可用来创建隐式网格。</li><li><code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 可用来指定隐式网格轨道尺寸。</li><li><code>grid-auto-flow</code> 可以用来控制网格流的方向以及自动放置网格项目的算法。</li><li><code>grid-row</code> 、<code>grid-column</code> 和 <code>grid-area</code> 将网格项目放置在显式网格之外时也将会创建隐式网格，即使未使用 <code>grid-template-rows</code> 、<code>grid-template-columns</code> 和 <code>grid-template-areas</code> 也能创建隐式网格。</li></ul><p>来到这里，我们已经知道了如何创建（或定义）一个网格，一个符合自己要求的网格。但这只是使用网格布局的基础之一，我们还需要知道如何设置网格轨道的尺寸。网格轨道尺寸的设置涉及到了一些网格的计算。那么接下来的课程，我们主要来介绍网格中的计算。</p>',7);function ne(oe,ce){const i=l("ExternalLinkIcon");return a(),r("div",null,[t,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",u,[d("https://codepen.io/airen/full/yLjRzOd"),n(i)])])]),m,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",p,[d("https://codepen.io/airen/full/XWqxeyN"),n(i)])])]),v,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",g,[d("https://codepen.io/airen/full/ZEoqwEN"),n(i)])])]),b,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",f,[d("https://codepen.io/airen/full/rNvqRaj"),n(i)])])]),h,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",S,[d("https://codepen.io/airen/full/oNdaVVV"),n(i)])])]),w,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",q,[d("https://codepen.io/airen/full/PoexZPN"),n(i)])])]),k,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",x,[d("https://codepen.io/airen/full/OJZaMxW"),n(i)])])]),_,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",C,[d("https://codepen.io/airen/full/xxjQVGG"),n(i)])])]),j,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",y,[d("https://codepen.io/airen/full/XWqyKLq"),n(i)])])]),z,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",M,[d("https://codepen.io/airen/full/KKRraRg"),n(i)])])]),N,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",L,[d("https://codepen.io/airen/full/MWGzJzo"),n(i)])])]),T,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",D,[d("https://codepen.io/airen/full/vYjQvNo"),n(i)])])]),W,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",H,[d("https://codepen.io/airen/full/BaxGMmx"),n(i)])])]),E,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",R,[d("https://codepen.io/airen/full/JjvezzZ"),n(i)])])]),V,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",Z,[d("https://codepen.io/airen/full/oNdQRZL"),n(i)])])]),G,e("p",null,[d("对于自动放置（Auto Placement），"),e("a",J,[d("W3C 规范中有明确的定义"),n(i)]),d("：")]),O,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",Q,[d("https://codepen.io/airen/full/oNdQrbo"),n(i)])])]),X,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",P,[d("https://codepen.io/airen/full/jOxXLZL"),n(i)])])]),B,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",K,[d("https://codepen.io/airen/full/xxjmLYm"),n(i)])])]),U,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",A,[d("https://codepen.io/airen/full/gOzZGvX"),n(i)])])]),I,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",Y,[d("https://codepen.io/airen/full/wvjRpoM"),n(i)])])]),F,e("blockquote",null,[e("p",null,[d("Demo 地址： "),e("a",$,[d("https://codepen.io/airen/full/JjvwMeV"),n(i)])])]),ee,e("blockquote",null,[e("p",null,[d("Demo 地址："),e("a",de,[d("https://codepen.io/airen/full/oNdJEqz"),n(i)])])]),ie])}const ae=c(s,[["render",ne],["__file","index-11.html.vue"]]);export{ae as default};
