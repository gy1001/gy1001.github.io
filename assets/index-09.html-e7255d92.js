import{_ as s,M as c,p as t,q as a,R as e,t as i,N as l,a1 as d}from"./framework-e8cb8151.js";const o={},r=d(`<h1 id="_09-使用-flexbox-构建经典布局-10-种经典-web-布局" tabindex="-1"><a class="header-anchor" href="#_09-使用-flexbox-构建经典布局-10-种经典-web-布局" aria-hidden="true">#</a> 09-使用 Flexbox 构建经典布局：10 种经典 Web 布局</h1><p>Flexbox 是现代 Web 布局的主流技术之一，它提供了一种有效的方式来<strong>定位</strong> 、<strong>排序</strong> 和 <strong>分布</strong>元素，即使在视窗或元素大小不明确或动态变化时亦是如此。Flexbox 的优势可以用一句话来表达：“<strong>在不需要复杂的计算之下，元素的大小和顺序可以灵活排列</strong> ”，即“Flexbox 为您提供了元素大小和顺序的灵活性”。如此一来，可以让 Web 的布局变得简单地多。</p><p>在这节课程中，我将介绍如何使用 Flexbox 来构建 Web 中的一些经典布局（实践中常使用的 Web 布局）。这些布局在还没有 Flexbox 技术之前就在 Web 中很常见，比如<strong>等高布局</strong> 、<strong>分屏</strong> （或<strong>等分列</strong> ）、<strong>水平垂直居中</strong> 、<strong>Sticky Footer</strong> 、<strong>圣杯布局</strong> 和 <strong>Grid Frameworks（简单的网格系统）</strong> 等，只不过我们在使用以往的 Web 布局技术，比如浮动（<code>float</code>）、定位（<code>position</code>）和内联块（<code>display:inline-block</code>）等实现会比较困难，甚至还需要一定的 CSS 黑魔法（Hack 手段），但使用 Flexbox 就会显得容易得多。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7719eacf03f94609a99f2afdc714846c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在开始之前，我用一张图来帮助大家回忆一下前面几个有关于 Flexbox 课程的知识，（👇 <strong>点击查看大图</strong>）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff98355476f7467b84c9e078f90de1c2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="水平垂直居中" tabindex="-1"><a class="header-anchor" href="#水平垂直居中" aria-hidden="true">#</a> 水平垂直居中</h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c01198ca4dc464bb97deb46bed24b2c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>可以说，水平垂直居中在 Web 上的运用是随处可见，比如一个 Icon 图标在其容器中水平垂直居中，一个标题在导航栏中水平垂直居中。 CSS 中，可以实现水平垂直居中的技术方案也有很多种，至少不会少于十种不同的技术方案。不过，这里我们主讲 Flexbox 如何实现水平垂直居中。</p><p>首先，水平垂直居中常见的效果有两种，单行（或单列）水平垂直居中和多行（或多列）水平垂直居中。它对应的 HTML 结构可能会像下面这样：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- 单行（或单列）水平垂直居中 --&gt;
&lt;div class=&quot;container container--single&quot;&gt;
    &lt;img src=&quot;avatar.png&quot; alt=&quot;需要在容器中水平垂直居中&quot; /&gt;
&lt;/div&gt;

&lt;!-- 多行（或多列）水平垂直居中 --&gt;
&lt;div class=&quot;container container--multiple&quot;&gt;
    &lt;imag src=&quot;avatar&quot; alt=&quot;我们要水平垂直居中&quot; /&gt;
    &lt;h3&gt;大漠|W3cplus.com&lt;/h3&gt;
    &lt;p&gt;掘金小册.现代Web布局&lt;/p&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Flexbox 中，可以在 Flex 容器上使用：</p><ul><li><code>justify-content</code> 的 <code>center</code> 让 Flex 项目水平居中。</li><li>对于单行而言，可以使用 <code>align-items</code> 的 <code>center</code> 让 Flex 项目垂直居中；当然，使用 <code>align-content</code> 的 <code>center</code> 也可以让 Flex 项目垂直居中，但需要显式设置<code>flex-wrap</code> 的值为 <code>wrap</code> 或 <code>wrap-reverse</code>。</li><li>对于多行而言（<code>flex-direction</code> 显式设置了 <code>column</code>），则使用 <code>align-items</code> 的 <code>center</code> 让所有 Flex 项目水平居中，再配合 <code>justify-content</code> 的 <code>center</code> 实现垂直方向居中</li></ul><p>在 CSS 中，我们可以像下面这样编码，可以轻易实现水平垂直居中：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex; /* inline-flex */
}

/* 单行(或单列)水平垂直居中 */
.container--single {
   justify-content: center; /* 水平居中 */ 
   align-items: center;     /* 垂直居中 */
}

/* 多行（或多列）水平垂直居中 */
.container--multiple {
    flex-direction: column;
    align-items: center;     /* 水平居中 */
    justify-content: center; /* 垂直居中 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ad5d7986528497db38416b4b3d92a2e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),v={href:"https://codepen.io/airen/full/rNvpYJW",target:"_blank",rel:"noopener noreferrer"},u=d(`<p>单行或多行实现水平垂直居中，两者都可以在 Flex 容器上设置 <code>justify-content</code> 和 <code>align-items</code> 属性的值为 <code>center</code> ，不同的是，在多行的 Flex 容器上要显式设置 <code>flex-direction</code> 属性的值为 <code>column</code> 。</p><p>你还可以将 <code>justify-content</code> 和 <code>align-self</code> 配合起来实现水平垂直居中的效果：</p><ul><li>Flex 容器上设置 <code>justify-content</code> 的值为 <code>center</code> ，让 Flex 项目实现水平居中；</li><li>Flex 项目上（需要实现垂直居中的 Flex 项目）上设置 <code>align-self</code> 的值为 <code>center</code> 。</li></ul><p>比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
   &lt;div class=&quot;item&quot;&gt;(^_^)&lt;/div&gt;
&lt;div&gt;
&lt;style&gt;
  .container {
      display: flex; /* 或 inline-flex */
      justify-content: center;  /* Flex 项目水平居中 */
  }

  .item {
      align-self: center;
  }
&lt;/style&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/906e102c13a24fc0bd8fa79a48d41b4b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),m={href:"https://codepen.io/airen/full/abGqoqo",target:"_blank",rel:"noopener noreferrer"},b=d(`<p>注意，从效果上可以看得出来，如果在 Flex 项目上未显式设置 <code>align-self:center</code> 时，Flex 项目会被拉伸，这是因为 Flex 容器的 <code>align-items</code> 默认值为 <code>stretch</code> 。如果你需要避免 Flex 项目在侧轴被拉伸，可以重置 <code>align-items</code> 的值为 <code>stretch</code> 之外的值。</p><p>这种方法也同样适用于多行或多列水平垂直居中：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    justify-content: center;
}

.container &gt; * {
    align-self: center;
}

.container--multiple {
    flex-direction: column;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3017e1bb31f44908b346672802ee472~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),p={href:"https://codepen.io/airen/full/bGMLbzK",target:"_blank",rel:"noopener noreferrer"},g=d(`<p>如果实现单个元素（Flex 项目）在 Flex 容器中水平垂直居中，你还可以使用 <code>justify-content</code> 和 <code>align-content</code> 两者的简写属性 <code>place-content</code> ，并且将其设置为 <code>center</code>，但需要配合 <code>flex-wrap</code> 属性来使用，一般设置为 <code>wrap</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    
    /* 等同 */
    justify-content: center;
    align-content: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5c69c3d7a8841f383e11fefc07e2ea8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),f={href:"https://codepen.io/airen/full/zYjRYGv",target:"_blank",rel:"noopener noreferrer"},x=d(`<p>在特定场景或环境之下，这种方式也适用于多行水平垂直居中，比如 Flex 容器没有足够空间致使 Flex 项目断行：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ce6793707ed43f2806a19514d86f6a1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然使用一些 Hack 手段可以避免上图这样的现象出现，但这样的 Hack 手段会让 Web 布局失去一定的灵活性，在实际开发的过程中不建议这样使用。除非你能提前预判：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container &gt; .title {
  flex: 1 0 100%;
  text-align: center;
  white-space: nowrap;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f5ca83d6e594ede95f9e8b8d03afd44~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),h={href:"https://codepen.io/airen/full/poVaoEM",target:"_blank",rel:"noopener noreferrer"},S=d(`<p>如果你实在需要使用 <code>place-content</code> 来让元素水平垂直居中的话，可以考虑和 <code>place-items</code> 结合起来使用，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    place-content: center;
    place-items: center;
    
    /* place-content 等同于 */
    justify-content: center;
    align-content: center;
    
    /* place-items 等同于 */
    align-items: center;
    justify-items: center;
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于多个 Flex 项目时，需要在 Flex 容器显式设置 <code>flex-direction: column</code> 。其实它和前面的 <code>justify-content</code> 和 <code>align-items</code> 取值 <code>center</code> 是一样的原理，只不过这里使用了其简写属性。</p><p>我们前面的课程有介绍过，在 Flexbox 布局中，你可以在 Flex 项目上设置 <code>margin</code> 的值为 <code>auto</code> 来控制 Flex 项目位置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad6d0b9521444746980f89b38a99a519~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也就是说，如果你只是想控制单个 Flex 项目在 Flex 容器中水平垂直居中的话，使用 <code>margin:auto</code> 也是一种不错的选择：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
}

.item {
    margin: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/597d875282984f93bdc90d1f456dd7a6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),q={href:"https://codepen.io/airen/full/JjvpjLy",target:"_blank",rel:"noopener noreferrer"},k=d(`<p>你可以在 Flexbox 布局中使用不同的方式来实现水平垂直居中的效果，至于选择哪一种方案，可以根据实际情况来选择。如果你实在不知道如何选择，还可以借助浏览器调试工具来辅助你快速选择：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3fbdb55eef2475f8e4eb26eb07002cf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>留个小作业，请使用 Flexbox 来实现 Logo 图标在其容器中水平垂直居中：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36524057468a4a87bc4c37c460e069e5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="等高布局" tabindex="-1"><a class="header-anchor" href="#等高布局" aria-hidden="true">#</a> 等高布局</h2><p>Web 设计师为了让页面或组件的 UI 更美观，往往会考虑像等高布局这样的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/562140b9b64a4d5ab8a459dd5ac43d2a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如上图所示，右侧等高布局看起来总是要比左侧的不等高布局更舒服一些。虽然等高布局在 UI 上会令人感到更舒服，但在以往的布局技术中要实现等高布局还是有点麻烦的。</p><p>主要原因是<strong>我们并不知道元素的高度是多少</strong> ，即使知道了，如果给元素上直接设置一个 <code>height</code> 值，很有可能就会造成内容溢出容器，甚至是打破 Web 布局。那么，使用 Flexbox （包括后面要介绍的 Grid）布局技术，实现等高布局就会轻易地多，甚至可以说是没有任何难度可言。比如，我们要实现一个等高布局的卡片组件：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a4eb84cb8c74a60a54c3722efef95f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图中的三张卡片排列在一起，它们：</p><ul><li>每一张卡片的视觉高度相等（列高相等），并且取最大的列；</li><li>每一张卡片有相同的宽度，也可以自适应；</li><li>每一张卡片都有<strong>缩略图</strong> 、<strong>标题</strong> 、<strong>描述文本</strong>和一个<strong>按钮</strong> ，并且卡片缩略图大小是相等的，而且按钮不管卡片标题和描述文本的长短，<strong>始终位于卡片底部</strong>。</li></ul><p>如果不采用 Flexbox 布局技术方案，当未给卡片设置一个最小高度时，往往实现的效果会像下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8cb1a029a484b96a750f61638438f51~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果使用 Flexbox 布局技术，实现起来就很简单：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;cards&quot;&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;figure&gt;
            &lt;img src=&quot;thumb.png&quot; alt=&quot;缩略图&quot; /&gt;
        &lt;/figure&gt;
        &lt;h3&gt;Card Title&lt;/h3&gt;
        &lt;p&gt;Card Describe&lt;/p&gt;
        &lt;button&gt;Button&lt;/button&gt;
    &lt;/div&gt;
    &lt;!-- 其他 Card --&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与布局相关的 CSS 代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，卡片<code>.card</code> 和其容器 <code>.cards</code> 都是 Flex 容器，并且每张卡片的初始化尺寸是 <code>300px</code> （即 <code>flex-basis</code> 的值为 <code>300px</code>），而且容器 <code>.cards</code> 无法容纳所有卡片 <code>.card</code> 时，它会自动换行，并且最后一个卡片宽度变宽了，这是因为卡片 <code>.card</code> 设置了<code>flex-grow:1</code> 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2fb01b8e6df41a98827da197e2b950c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可能会感到好奇，为什么会这样，又将如何解决？接下来的内容中你会找到答案。我们回到等高布局中来，你可能已经发现了，只要告诉浏览器卡片容器 <code>.cads</code> 是一个 Flex 容器，那么所有卡片 <code>.card</code> 的高度就相等了，而且会以最高的那张卡片为主：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24870361a4b044b2a31cbb560f9ec5be~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这是因为，Flex 容器 <code>.cards</code> 的 <code>align-items</code> 属性的默认值是 <code>stretch</code> ，如果没有调整 <code>align-items</code> 属性的值，那么该容器中的所有子元素（即 Flex 项目 <code>.card</code>）在侧轴方向就会被拉伸，并且等于侧轴尺寸。反之，就会得到一个不等高的卡片，比如，你在 <code>.cards</code> 上显式设置了 <code>align-items</code> 的值为 <code>flex-start</code> ，你将看到的效果如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cards {
    align-items: flex-start;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43522adf07c24fa4acf69692d7218970~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也就是说，<strong>默认情况之下，Flex 容器中的所有 Flex 项目都是相等的</strong> ，这也是 Flexbox 实现等高布局很容易的主要原因。</p><p>虽然说，将 <code>.cards</code> 创建为一个 Flex 容器就实现了卡片等高的效果，但这个效果还不是设计师所期待的，比如第二和第三张卡，因卡片标题和描述内容比第一张卡片更少，造成按钮偏上，卡片底部留下一定的空白空间（设计师期望的是，所有卡片的按钮都能在底部对齐）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/783ac5bc36714bd48fd5c8e89eca0e80~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>要实现上图左侧的效果，在 Flexbox 布局中也有多种方式，比如我们这个示例，每张卡片 <code>.card</code> 本身就是一个 Flex 容器，你只需要将剩余空间分配给卡片中的 <code>p</code> 元素（描述文本）即可，就是将其 <code>flex-grow</code> 值设置为 <code>1</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card p {
    flex-grow: 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6feb2bd16cc64635849125b1041cd6f3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,31),_={href:"https://codepen.io/airen/full/VwxQLyj",target:"_blank",rel:"noopener noreferrer"},y=d(`<p>除了上面这种方案之外，还可以在 <code>button</code> 元素显式设置 <code>margin-top</code> 的值为 <code>auto</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card button {
    margin-top: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c0127ba822b4d64bb8d7337cb36c6c6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),j={href:"https://codepen.io/airen/full/PoeQPVL",target:"_blank",rel:"noopener noreferrer"},F=d(`<p>如果你不希望按钮宽度占满整个卡片，还可以改变 <code>button</code> 的 <code>algin-self</code> 值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 按钮居左 */
.card button {
    align-self: flex-start; 
}

/* 按钮居右 */
.card button {
    align-self: flex-end;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你将得到下面这样的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7242fb19032e44399869fbd7c478aab7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>小作业，请使用 Flexbox 布局技术，实现一个等高布局的 Web 页面：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feaf995a0ce4422294cf1668f5da8143~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>简单化一下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28925d530dfc4b83a1cd2054e49fff6b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="均分列-等分列-布局" tabindex="-1"><a class="header-anchor" href="#均分列-等分列-布局" aria-hidden="true">#</a> 均分列（等分列）布局</h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62633b76141b42afa2ed9a2a87d26658~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示，在 Web 中均分列的布局效果很多，尤其是在移动端的开发当中，底部的菜单栏中的列大多都是均分的。</p><blockquote><p><strong>均分列又称为等分列或等列，它的最大特征就是列的宽度是相等的</strong> ！</p></blockquote><p>以往 CSS 实现等分列都是通过百分比来计算，比如：</p><ul><li>列数（<code>--column</code>）；</li><li>列间距（<code>--gap</code>）。</li></ul><p>一般情况下，列宽就是：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>列宽 = （容器宽度 - （列数 - 1）× 列间距）÷ 列数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设是一个三列，列间距为<code>0</code>，那么每列的宽度将会是：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.coumn {
    /**
     * 容器宽度 ➜ 100%
     * 列数    ➜ --columns = 3
     * 列间距  ➜  --gap = 0
     * 列宽 = ((100% - (3 - 1)  × 0) ÷ 3 = 33.3333% 
    **/
    width: 33.33333%; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者使用 <code>calc()</code> 函数和 CSS 的自定义属性结合：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root {
    --container-width: 100%; /* 容器宽度 */
    --columns: 3;            /* 列数 */
    --gap: 0 ;               /* 列间距 */
}

.column {
    width: calc((var(--container-width) - (var(--columns) - 1) * var(--gap)) / var(--columns));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但不管是哪种方式，开发者都需要提前知道等分的列数、列间距等，对于构建一个动态的等分列，上面方案的缺陷就出来了。<strong>开发者需要不断地去做数学计算，而且是需要知道参数的情况之下才行</strong> 。</p><p>如果换成 Flexbox 技术来构建的话，开发者就不需要去考虑这些参数了。比如下面这个移动端的底部工具栏的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5e7069ceed440eba14e4bcb05f54468~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>构建它的 HTML 结构并不复杂：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;footer&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;Icon /&gt; Icon name
    &lt;/div&gt;
    &lt;!-- 省略其他的菜单项 --&gt;
&lt;/footer&gt;
&lt;style&gt;
  footer {
      display: flex;
  }

  .item {
      flex: 1;
      min-width: 0; /* 这行代码很重要 */
  }

  /* 菜单项图标和文字的布局 */
  .item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d145c42cec042f185896965b53644d2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,26),C={href:"https://codepen.io/airen/full/GRdQZYv",target:"_blank",rel:"noopener noreferrer"},w=d(`<p>使用 <code>flex:1</code> 来均分列（即平均分配 Flex 容器可用空间）并不是完全可以的，它需要配合 <code>min-width:0</code> 一起使用。因为在 Flex 项目上显式设置 <code>flex:1</code> 时已重置了 <code>flex</code> 的初始值（<code>flex: 0 1 auto</code>），浏览器会把 <code>flex:1</code> 计算成：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>flex-basis</code> 为 <code>auto</code> 时， Flex 项目的宽度是 <code>max-content</code> （除非 Flex 容器空间完全不足）。也就是说，<code>flex:1</code> 时，<code>flex-basis</code> 值从 <code>auto</code> 变成了<code>0%</code> ，这将覆盖 Flex 项目的内在尺寸（<code>min-content</code> ），Flex 项目的基本尺寸现在是 <code>0</code> ，但由于 <code>flex-grow</code> 的存在，Flex 项目会扩展以填补空的空间（Flex 容器的剩余空间）。</p><p>而实际上，在这种情况下，<code>flex-shrink</code> 不再做任何事情，因为所有 Flex 项目现在的宽度都是 <code>0</code> ，并且正在增长以填补可用空间。只不过， Flex 容器有可能存在没有剩余空间的情况，甚至是有不足空间的情况存在。此时，<code>flex:1</code> 也就不能均分 Flex 容器的可用空间。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9579e0459c94f988c189573c98fb5b7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示，最后一个 Flex 项目的宽度要更大，它的 <code>max-content</code> 都比其他 Flex 项目大（它有四个汉字宽）。</p><p>事实上，<strong>默认情况之下，设置了</strong> <strong><code>flex:1</code></strong> <strong>的 Flex 项目在收缩的时候，其宽度不会小于其最小内容尺寸（<strong><strong><code>min-content</code></strong></strong>）。如果要改变这一点，需要显式设置</strong> <strong><code>min-width</code></strong> <strong>（或</strong> <strong><code>min-inline-size</code>）或</strong> <strong><code>min-height</code></strong> <strong>（或</strong> <strong><code>min-block-size</code>）的值</strong>。</p><p>CSS 中它们的值为 <code>auto</code> 时，会被浏览器计算为 <code>0</code> 。但在 Flexbox 中，Flex 项目的 <code>min-width</code> 或 <code>min-height</code> 的值又不会被计算为 <code>0</code> ，它的值被计算为 <code>max-content</code> 。</p><p>为此，要真正达到均分列，只在 Flex 项目上显式设置 <code>flex:1</code> 是不够的，还需要在 Flex 项目上显式设置 <code>min-width</code> 值为 <code>0</code> 。这也就是说，为什么 <code>min-width:0</code> 很重要。</p><p>不过，在使用 <code>flex:1</code> 的时候，需要额外注意的是，这个 <code>1</code> 会被视为 <code>flex-grow</code> 的值。如果你要使用 <code>flex</code> ，更建议的做法是，显式地使用 <code>flex</code> 属性的三个值，比如 <code>flex: 1 1 0%</code> 或 <code>flex: 1 1 100%</code> 。</p><blockquote><p>特别提醒，这里涉及到了 <code>flex</code> 的相关计算，有关于这方面的介绍，可以阅读我们前面课程的 06～08 讲。</p></blockquote><p>小作业，卡片等宽且等高：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e857f24ee5b4fe0a5e68fc51903dd21~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="圣杯布局" tabindex="-1"><a class="header-anchor" href="#圣杯布局" aria-hidden="true">#</a> 圣杯布局</h2><p>圣杯布局（Holy Grail Layout）是 Web 中典型的布局模式。它看上去像下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2904ccedf47a4d54a320943b95d3b96a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就上图而言，这就是一个非常普通的三列布局。对圣杯布局有一定了解的同学都应该知道，构建圣杯布局时，对 HTML 的结构是有一定的要求，即 <strong>主内容为先</strong> 。早期这样做，是让用户在 Web 页面加载缓慢时，就能先看到主内容。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- HTML --&gt;
&lt;header&gt;
    &lt;!-- 页头 --&gt;
&lt;/header&gt;
&lt;main&gt;
    &lt;!-- 页面主体，它包含两个侧边栏和一个主内容列 --&gt;
    &lt;article&gt;
        &lt;!-- 页面主内容列，需要排在 nav 和 aside 前面 --&gt;
    &lt;/article&gt;
    &lt;nav&gt;
        &lt;!-- 侧边导航栏 --&gt;
    &lt;/nav&gt;
    &lt;aside&gt;
        &lt;!-- 侧边内容栏，比如广告栏 --&gt;
    &lt;/aside&gt;
&lt;/main&gt;
&lt;footer&gt;
    &lt;!-- 页脚 --&gt;
&lt;/footer&gt;    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于经典的圣杯布局，它有：</p><ul><li>页头 <code>&lt;header&gt;</code>；</li><li>页脚 <code>&lt;footer&gt;</code>；</li><li>主内容 <code>&lt;article&gt;</code>；</li><li>左侧边栏 <code>&lt;aside&gt;</code>；</li><li>右侧边栏 <code>&lt;aside&gt;</code>。</li></ul><p>它应该具备的能力：</p><ul><li>在 HTML 文档的源码中，主内容 <code>&lt;article&gt;</code> 要位于两个侧边栏 <code>&lt;aside&gt;</code> 之前；</li><li>页头 <code>&lt;header&gt;</code> 和页脚 <code>&lt;footer&gt;</code> 并没有固定高度，即它们的 <code>height</code> 为 <code>auto</code>，由其内容或相关盒模型属性值（比如 <code>padding</code> 、<code>margin</code> 或 <code>border</code>）决定大小；</li><li>在垂直方向，中间三列（<code>&lt;main&gt;</code>）的高度占据 <code>&lt;header&gt;</code> 和 <code>&lt;footer&gt;</code> 之外的浏览器视窗高度，并且随着内容增多而变高；</li><li>在水平方向，一般情况之下两个侧边栏也是由其内容来决定大小，但多数情况之下会给两个侧边栏设置一个固定宽度，比如左侧边栏是 <code>220px</code> ，右侧边栏是 <code>320px</code> 。中间主内容列 <code>&lt;article&gt;</code> 占据两侧边栏之外的浏览器视窗宽度，并且随着内容增加，不会出现水平滚动条。</li></ul><p>我们来看一个真实的圣杯布局案例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ef432a1c8a647ef955746fa8ce67a12~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>实现该页面，你可能需要的 HTML 结构如下：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;header&gt;
    &lt;h1&gt;W3cplus&lt;/h1&gt;
    &lt;nav&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;home&lt;/a&gt;&lt;/li&gt;
            &lt;!-- 其他导航项 --&gt;
        &lt;/ul&gt;
    &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
    &lt;article&gt;
        &lt;h2&gt;现代 Web 布局技术&lt;/h2&gt;
        &lt;p&gt;使用 CSS Flexbox 技术构建圣杯布局（Holy Grail Layout）&lt;/p&gt;
    &lt;/article&gt;
    &lt;aside&gt;
        &lt;h3&gt;左侧列&lt;/h3&gt;
    &lt;/aside&gt;
    &lt;aside&gt;
        &lt;h3&gt;右侧列&lt;/h3&gt;
    &lt;/aside&gt;    
&lt;/main&gt;
&lt;footer&gt;
    &lt;ul&gt;
        &lt;li&gt;&lt;a href=&quot;home&quot;&gt;home&lt;/a&gt;&lt;/li&gt;
        &lt;!-- 其他导航项 --&gt;
    &lt;/ul&gt;
&lt;/footer&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在没有 CSS 加载的情况之下，你看到的圣杯布局会是下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9bce0d4ca284f58b0e14d5f01d5fb06~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，内容先行的原则</strong> ！</p></blockquote><p>我们可以像下面这样使用 Flexbox 来构建圣杯布局：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-height: 100vh;
}

main {
  flex: 1 1 0%;
  min-height: 0;

  display: flex;
  gap: 1px;
}

aside:nth-of-type(1) {
  order: -1;
  min-width: 220px;
  max-width: 220px;
}

aside:nth-of-type(2) {
  min-width: 320px;
  max-width: 320px;
}

article {
  flex: 1 1 0%;
  min-width: 0;
}

header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

footer {
  display: flex;
  justify-content: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以结合 CSS 的媒体查询，在小屏幕下调整布局，构建一个具有响应式能力的圣杯布局：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media screen and (max-width: 800px) {
  main {
    flex-direction: column;
  }
  main aside {
    width: 100%;
    max-width: none !important;
  }

  aside:nth-of-type(1) {
    order: 1;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e4af644a35b4e9dacd26576b7286c02~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,34),L={href:"https://codepen.io/airen/full/YzLeRZx",target:"_blank",rel:"noopener noreferrer"},z=d(`<p>小作业，使用 Flexbox 构建下图这样的 Web 布局：</p><ul><li>主内容列能随浏览器视窗大小改变；</li><li>侧边栏固定宽度；</li><li>页头和页脚高度由内容决定。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bbab70579ea45fbacc5eff348f72863~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="sticky-footer-布局" tabindex="-1"><a class="header-anchor" href="#sticky-footer-布局" aria-hidden="true">#</a> Sticky Footer 布局</h2><p>首先用下图来解释什么是 Sticky Footer 布局:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec3967489822463985ef32323a5804fb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>页脚（Footer）的位置会随着页头（Header）和主内容（Content）高度而变化，但当页头和主内容内容较小，其高度总和小于浏览器视窗高度时，页脚要始终位于浏览器视窗底部。</p><p>对于 Sticky Footer 的布局，使用 Flexbox 再容易不过了，只需要保持主内容容器（它也是一个 Flex 项目）能随着它的父容器（Flex 容器）的剩余空间扩展。简单地说，给主内容设置一个 <code>flex-grow</code> 值为 <code>1</code> 即可。具体代码如下：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;body&gt;
    &lt;header&gt;
    &lt;/header&gt;
    &lt;main&gt;
    &lt;/main&gt;
    &lt;footer&gt;
    &lt;/footer&gt;
&lt;/body&gt;
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex-grow: 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你不希望浏览器视窗高度较小时，主内容的高度进行收缩，你可以将其 <code>flex-shrink</code> 设置为 <code>0</code> ，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>main {
    flex: 1 0 auto;
    
    /* 等同于 */
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样地，为了避免页头和页脚因浏览器视窗高度较小时被挤压，建议在它们上面设置 <code>flex-shrink</code> 值为 <code>0</code> 。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

header, footer {
    flex-shrink: 0;
}

main {
    flex: 1 0 auto;
    min-height: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c016d75442d949938e591edd0d4c5136~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,14),M={href:"https://codepen.io/airen/full/XWqZOao",target:"_blank",rel:"noopener noreferrer"},H=d(`<p>除了上面这种方法之外，还可以在 <code>footer</code> 上使用 <code>margin-top:auto</code> 来实现 Sticky Footer 的布局效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

body &gt; * {
    flex-shrink: 0;
}

footer {
    margin-top: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/063f5253fd884831bde57dd404f327d9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),T={href:"https://codepen.io/airen/full/RwyQvJG",target:"_blank",rel:"noopener noreferrer"},W=d(`<h2 id="百分百无滚动布局" tabindex="-1"><a class="header-anchor" href="#百分百无滚动布局" aria-hidden="true">#</a> 百分百无滚动布局</h2><p>百分百无滚动布局在 Web 中也是很常见的一种布局，比如下面这样的一个案例（这是一个真实的案例，2019年双11主互动项目中的弹窗）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fc9cb0f980645e980395aa1cccb73f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><strong>图中红色虚框中的内容是带有滚动的</strong> 。因为容器的高度是固定的（<code>100vh</code>），内容很有可能会超过容器的高度。</p><p>我把整个弹窗（Modal）分为两个部分：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- 整个 Modal 高度是 100vh --&gt;
&lt;modal&gt;
    &lt;modal-header&gt;
        &lt;!-- 固定高度 --&gt;
    &lt;/modal-header&gt;
    &lt;modal-content&gt;
        &lt;!-- 滚动容器：flex: 1 --&gt;
    &lt;/modal-content&gt;
&lt;/modal&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c2481b4dbfe4cc09f6c1af2f9671dc8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>很典型的一个 Flexbox 布局：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>modal {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

modal-header {
    height: 120px; /* 一个固定高度值 */
}

modal-content {
    flex: 1 1 0%;     /* 或 flex: 1*/
    overflow-y: auto; /* 内容超过容器高度时出现滚动条 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看上去似乎没有问题，但实际上我们在 iOS 系统上触发了一个 Flexbox 的 Bug，就是在<strong>滚动容器上显示设置</strong> <strong><code>overflow-y:scroll</code></strong> <strong>，滚动依旧失效</strong> 。造成这个 Bug 是因为我们上面的 CSS 代码触发了 Flex 项目的边缘情况。如果要避免这个 Bug 的出现，需要对结构做出一定的调整：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b437393646ee44cf8671be0725d11b24~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>对应上图的 HTML 代码如下：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;main-container&quot;&gt; &lt;!-- flex-direction: column --&gt;
    &lt;div class=&quot;fixed-container&quot;&gt;Fixed Container&lt;/div&gt;&lt;!-- eg. height: 100px --&gt;
    &lt;div class=&quot;content-wrapper&quot;&gt;&lt;!-- min-height: 0, 这个很重要 --&gt;
        &lt;div class=&quot;overflow-container&quot;&gt;&lt;!-- 滚动容器，overflow-y: auto &amp; flex: 1 --&gt;
            &lt;div class=&quot;overflow-content&quot;&gt;Overflow Content&lt;/div&gt;&lt;!-- 内容容器 --&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键的 CSS 代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.main-container {
    display: flex;
    flex-direction: column;
}

.fixed-container {
    height: 100px; /* 固定容器的高度值，任何一个你想的固定值 */
}

.content-wrapper {
    display: flex;
    flex: 1;       /* 可以是 flex: 1 1 0% */
    min-height: 0; /* 这个很重要 */
}

.overflow-container {
    flex: 1;
    overflow-y: auto; /* 内容超出滚动容器高度时，会出现滚动条 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4378590856b44862b5a99a56ea84ac55~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>来看一个具体 Demo 的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3b8ad871cfe4934bb6bcde391579767~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),D={href:"https://codepen.io/airen/full/JjvpzPY",target:"_blank",rel:"noopener noreferrer"},Y=d('<p>关键部分是 <strong>设置</strong> <strong><code>flex:1</code></strong> <strong>的 Flex 项目需要显式设置</strong> <strong><code>min-height</code></strong> <strong>的值为</strong> <strong><code>0</code></strong> <strong>，即滚动容器的父元素</strong> 。即， <strong>在设置了</strong> <strong><code>flex:1</code></strong> <strong>的 Flex 项目上应该尽可能<strong><strong>地</strong></strong>重置它的最小尺寸值，当主轴在水平方向时（<strong><strong><code>flex-direction: row</code></strong></strong>），设置<code>min-width</code></strong> <strong>（或</strong> <strong><code>min-inline-size</code>）的值为</strong> <strong><code>0</code></strong> <strong>；当主轴在垂直方向时（<strong><strong><code>flex-direction: column</code></strong></strong>），设置</strong> <strong><code>min-height</code></strong> <strong>（或</strong> <strong><code>min-block-size</code>）的值为</strong> <strong><code>0</code></strong> 。</p><p>小作业，使用 Flexbox 构建一个弹窗（Modal）的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dce0510ca21647f592509c3c6f481b1a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="_12-列网格布局" tabindex="-1"><a class="header-anchor" href="#_12-列网格布局" aria-hidden="true">#</a> 12 列网格布局</h2>',4),G={href:"https://960.gs/",target:"_blank",rel:"noopener noreferrer"},Z=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf0cb706f6af44b5b266d5d543da42f6~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),J=e("code",null,"float",-1),N={href:"https://getbootstrap.com/docs/5.2/layout/grid/",target:"_blank",rel:"noopener noreferrer"},A=d(`<p>相对而言，使用 Flexbox 技术构建 960gs 网格系统要比浮动技术简单得多，你只需要在一个 Flex 容器放置所需要的列数，每一列对应着一个 Flex 项目。比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- 12列：flex 容器中包含 12 个 flex 项目 --&gt;
&lt;flex-container&gt;
    &lt;flex-item&gt; 1 of 12&lt;/flex-item&gt;
    &lt;!-- 中间省略 10个 flex-item --&gt;
    &lt;flex-item&gt; 1 of 12&lt;/flex-item&gt;
&lt;/flex-container&gt;

&lt;!-- 6列： flex 容器中包含 6个 flex 项目 --&gt;
&lt;flex-container&gt;
    &lt;flex-item&gt; 1 of 6 &lt;/flex-item&gt;
    &lt;!-- 中间省略 4 个 flex-item --&gt;
    &lt;flex-item&gt;1 of 6 &lt;/flex-item&gt;
&lt;/flex-container&gt;

&lt;!-- 4列： flex 容器中包含 4 个 flex 项目 --&gt;
&lt;flex-container&gt;
    &lt;flex-item&gt; 1 of 4 &lt;/flex-item&gt;
    &lt;!-- 中间省略 2 个 flex-item --&gt;
    &lt;flex-item&gt;1 of 4 &lt;/flex-item&gt;
&lt;/flex-container&gt;

&lt;!-- 3列：flex 容器中包含 3 个 flex 项目 --&gt;
&lt;flex-container&gt;
    &lt;flex-item&gt; 1 of 3&lt;/flex-item&gt;
    &lt;flex-item&gt; 1 of 3&lt;/flex-item&gt;
    &lt;flex-item&gt; 1 of 3&lt;/flex-item&gt;
&lt;/flex-container&gt;

&lt;!-- 2列： flex 容器中包含 2个 flex 项目 --&gt;
&lt;flex-container&gt;
    &lt;flex-item&gt; 1 of 2&lt;/flex-item&gt;
    &lt;flex-item&gt; 1 of 2&lt;/flex-item&gt;
&lt;/flex-container&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 CSS 而言，主要使用 Flexbox 的 <code>gap</code> 属性来设置列与列之间的间距，然后在 Flex 项目上使用 <code>flex</code> 属性即可，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>flex-container {
    display: flex;
    gap: var(--gap, 1rem)
}

flex-item {
    flex: 1 1 0%;
    min-width: 0; /* 建议加上 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9085b09237534c4688a6454cebe95a35~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),E={href:"https://codepen.io/airen/full/qBYxwXK",target:"_blank",rel:"noopener noreferrer"},R=d(`<p>当然，你也可以根据实际需要，给 Flex 项目指定明确的值，即给 Flex 项目的 <code>flex-basis</code> 初始化一个值，同时 <code>flex-grow</code> 和 <code>flex-shrink</code> 都重置为 <code>0</code> ，告诉浏览器，该 Flex 项目不能扩展和收缩：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4fb3c7f577e4bcc9c7007cbc6efc513~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>比如上图所示：</p><ul><li><code>auto</code> 标记的列，表示 <code>flex</code> 的值为 <code>1 1 0%</code> 或 <code>1 1 auto</code></li><li><code>50%</code> 、<code>33.33%</code> 和<code>25%</code> 标记的列，表示<code>flex-basis</code> 的值为 <code>var(--flex-basis)</code> ，同时 <code>flex-grow</code> 和 <code>flex-shrink</code> 都重置为 <code>0</code></li></ul><p>这样的场景，可以借助 CSS 自定义属性会让你编码更容易一些：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;grid&quot;&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;div class=&quot;grid&quot;&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;column fixed&quot; style=&quot;--flex-basis: 50%&quot;&gt;50%&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;column fixed&quot; style=&quot;--flex-basis: 33.33%&quot;&gt;33.33%&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;column fixed&quot; style=&quot;--flex-basis: 25%&quot;&gt;25%&lt;/div&gt;
        &lt;div class=&quot;column&quot;&gt;Auto&lt;/div&gt;
        &lt;div class=&quot;column fixed&quot; style=&quot;--flex-basis: 33.33%&quot;&gt;33.33%&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid {
    display: flex;
    flex-direction: column;
    gap: var(--gap-row);
}

.row {
    display: flex;
    gap: var(--gap-column);
}

.column {
    flex:1 1 var(--flex-basis, 0%);
    min-width: 0;
}

.column.fixed {
    flex: 0 0 var(--flex-basis);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),Q={href:"https://codepen.io/airen/full/ZEorZVa",target:"_blank",rel:"noopener noreferrer"},V=d(`<h2 id="九宫格布局" tabindex="-1"><a class="header-anchor" href="#九宫格布局" aria-hidden="true">#</a> 九宫格布局</h2><p>九宫格简单地说就是一个 <code>3 × 3</code> 的网格（三行三列），它也常用于 Web 布局中，而且你可以基于它演变出很多种不同的布局风格：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f747844a3ce840fc962381a2042b0a4a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在 Web 布局中，我们把这些布局效果都称为 <strong>九宫格布局</strong> 。它们常被运用于 Web 中展示图片（它有自己的专业术语，称之为<strong>图片墙</strong> <strong>Image Galler</strong> ）。这样的布局对于图片展示来说，可以更好地突出需要展示的图片。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db685e4cd7394e3289f5ebf00f356096~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然使用 Flexbox 可以构建一个网格布局，但 Flexbox 布局毕竟是一种<strong>一维布局</strong> ，用它来构建上图这样的九宫格布局效果，还是有一定的局限性，需要通过 HTML 结构强力配合才能实现。比如下面这个示例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5044df132544bc58782aa64b5d66e0b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>实现上图的布局效果，所需要的 HTML 结构可能会像下面这样：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;card&quot;&gt;
    &lt;div class=&quot;card__heading&quot;&gt;
        &lt;h3 class=&quot;card__title&quot;&gt;现代 Web 布局&lt;/h3&gt;
        &lt;p class=&quot;card__describe&quot;&gt;使用 Flexbox 技术构建九宫格布局&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card__grid&quot;&gt;
        &lt;div class=&quot;card__row&quot;&gt;
            &lt;div class=&quot;card__column&quot;&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;cat.png&quot; alt=&quot;&quot; /&gt;
                &lt;/figure&gt;
            &lt;/div&gt;
            &lt;div class=&quot;card__column&quot;&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;cat.png&quot; alt=&quot;&quot; /&gt;
                &lt;/figure&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;cat.png&quot; alt=&quot;&quot; /&gt;
                &lt;/figure&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;cat.png&quot; alt=&quot;&quot; /&gt;
                &lt;/figure&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;cat.png&quot; alt=&quot;&quot; /&gt;
                &lt;/figure&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键的 CSS 代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card__grid {
  display: flex;
  flex-direction: column;
}

.card__row {
  display: flex;
  gap: 1rem;
}

.card__column {
  flex: 1 1 calc((100% - 1rem) / 2);
  min-width: 0;

  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card__column:nth-child(2) figure {
  flex: 1 1 calc((100% - 1rem) / 2);
  min-width: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有一个关键，就是 Flex 项目的 <code>flex-basis</code> 值，使用了 <code>calc()</code> 根据列数和列间距计算得出来的，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>列宽（flex-basis） = （100%容器宽度（Flex 容器）- （列数 - 1）× (列间距)）÷ 列数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就我们这个示例，是 <code>2</code> 列，列间距是 <code>1rem</code> ，所以 <code>flex-basis</code> 的初始值设置为 <code>calc((100% - 1rem) \`\`/ 2\`\`)</code> 。最终得到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/613a65775ab34c9fb2f6e7903dace483~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),B={href:"https://codepen.io/airen/full/yLjKzgp",target:"_blank",rel:"noopener noreferrer"},K=d(`<p>你甚至可以使用 12 列网格布局的方式来完成九宫格的布局。但很多时候九宫格布局中的每个元素 （Flex 项目）具有一定的宽高比：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76550027a2874769b1207bda43642d5a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>比如上图的布局效果。它是一个由几行组成的布局，而且每行的两张图片都有固定的宽高比。每行的两张图片有相同的高度，并且会填满整行（我们知道每行就是一个 Flex 容器）。图片的宽高比从 <code>16:9</code> 到 <code>3:2</code> 不等。</p><p>自 2021 年开始，你可以在 CSS 中直接使用 <code>aspect-ratio</code> 属性设置元素的宽高比（不需要使用 <code>padding-top</code> 或 <code>padding-bottom</code> 来模拟了）。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.aspect-ratio-box {
    width: 400px;
    aspect-ratio: 16 / 9;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样你就可以得到一个宽高比是 <code>16:9</code> 的盒子，浏览器会根据元素的 <code>width</code> 和宽高比 <code>aspect-ratio</code> 的值计算出 <code>height</code> 的值：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/934a411110de4c3e80efb1ca3f150af4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),P={href:"https://codepen.io/airen/full/oNdqobL",target:"_blank",rel:"noopener noreferrer"},I=d(`<p>当然，浏览器也会根据元素的高度 <code>height</code> 值和宽高比 <code>aspect-ratio</code> 的值计算出宽度 <code>width</code> 的值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.aspect-ratio-box {
    aspect-ratio: 16 / 9;
    height: 225px;
}

/* 可以根据 宽高比 和 高度 的值计算出 宽度的值 */
aspect-ratio = width ÷ height = 16 ÷ 9 = 1.778
width = height × aspect-ratio = 225 x (16 ÷ 9) = 400
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面就是 CSS 的 <code>aspect-ratio</code> 属性最基础的使用，有关于它更详细的介绍这里不展开。我们回到示例中来。先把上面的示例简化一下，比如说，在一个 Flex 容器中有两个 Flex 项目，它们的高度是相同的，其中一个 Flex 项目的宽高比是 <code>4:3</code> ，另一个 Flex 项目的宽高比是 <code>2:3</code> 。你可能像下面这样将 <code>aspect-ratio</code> 运用到 Flex 项目上：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container grid-row&quot;&gt;
    &lt;div class=&quot;item grid-column&quot; style=&quot;--ratio: 4 / 3&quot;&gt;4:3&lt;/div&gt;
    &lt;div class=&quot;item grid-column&quot; style=&quot;--ratio: 2 / 3&quot;&gt;2:3&lt;/div&gt;
&lt;/div&gt;
.container {
  display: flex;
  align-items: flex-start;
}

.item {
  aspect-ratio: var(--ratio);
  flex: 1 1 0%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6d45da301c949e5b41546ff09888806~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如你所见，两个 Flex 项目的宽度相等，但高度不同。你可能会认为将 Flex 项目的高度 <code>height</code> 设置为 <code>100%</code> 即可，事实并非如你所愿，因为 CSS 的 <code>height</code> 取<code>%</code> （百分比）值时，如果父元素（Flex 容器）未显式设置 <code>height</code> 的值，那么 Flex 项目即使设置 <code>height:100%</code> ，浏览器计算出来的也会是 <code>0</code> 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ea841db252a48cd9e67d1efb02c4d55~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),O={href:"https://codepen.io/airen/full/eYrMeWq",target:"_blank",rel:"noopener noreferrer"},X=d(`<p>这也并不是无解，在 Flexbox 布局中有两种解决方案。先来看第一种解决方案，就是 Flex 容器的宽高比要等于它的所有 Flex 项目的宽高比之和。比如上面这个示例，在 Flex 容器上需要显式设置它的宽高比为 <code>6:3</code> ，即：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器的 aspect-ratio = (4 ÷ 3) + (2 ÷ 3) = 6 ÷ 3 = 6 : 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0e8375028be4c258141f7e7a2a7272c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container grid-row&quot;&gt;
    &lt;div class=&quot;item grid-column&quot; style=&quot;--ratio: 4 / 3&quot;&gt;4:3&lt;/div&gt;
    &lt;div class=&quot;item grid-column&quot; style=&quot;--ratio: 2 / 3&quot;&gt;2:3&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
  display: flex;
  align-items: flex-start;
  aspect-ratio: 6 / 3;
}

.item {
  aspect-ratio: var(--ratio);
  flex: 1 1 0%;
  height: 100%; /* 这个很重要 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Flex 容器设置了 <code>aspect-ratio</code> 值之后，浏览器就可以计算出它的高度值，此时在 Flex 项目上显式设置 <code>height: 100%</code> 才有了意义，保证了同一行的 Flex 项目是相等的，宽度根据各自的 <code>aspect-ratio</code> 计算得到。这个时候，你看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/289d53df61674b3483762cbb48473e98~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),U={href:"https://codepen.io/airen/full/WNJzdYw",target:"_blank",rel:"noopener noreferrer"},$=d(`<p>注意，如果你不想花太多时间去做数学计算的话，可以借助 CSS 自定义属性来辅助你：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container grid-row&quot;&gt;
    &lt;div class=&quot;item grid-column&quot;&gt;4:3&lt;/div&gt;
    &lt;div class=&quot;item grid-column&quot;&gt;2:3&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root {
    --ratio-4-3: 4 / 3;
    --ratio-2-3: 2 / 3;
    --flex-container-ratio: calc(var(--ratio-4-3) + var(--ratio-2-3)); 
}

.container {
  display: flex;
  align-items: flex-start;
  aspect-ratio: var(--flex-container-ratio);
}

.item {
  aspect-ratio: var(--ratio)
  flex: 1 1 0%;
  height: 100%; /* 这个很重要 */
}

.item:nth-child(1) {
    --ratio: var(--ratio-4-3);
}

.item:nth-child(2) {
    --ratio: var(--ratio-2-3);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),ee={href:"https://codepen.io/airen/full/jOxzZPm",target:"_blank",rel:"noopener noreferrer"},ie=d(`<p>不过这个方案有一定的缺陷存在，<strong>必须知道 Flex 项目的数量及其容器上的宽高比</strong> 。容器中的 Flex 项目一旦发生变化或容器中的 Flex 项目宽高比发生变化，开发者就需要重新计算 Flex 容器的宽高比，否则布局就不是按照相应的宽高比构建的。另外就是 Flex 容器要是设置了 <code>gap</code> 值，对 Flex 项目的计算也有一定的影响。</p><p>接着我们来看另一种解决方案，该方案 <strong>不需要根据 Flex 项目的宽高比来计算 Flex 容器的宽高比</strong> ，我们<strong>可以利用 Flex 项目的</strong> <strong><code>flex-grow</code></strong> <strong>属性的特性来完成所需的布局</strong> 。简单地说，如果 Flex 项目的宽高比的“<strong>分母</strong>”相同，则只需要在相应的 Flex 项目设置它的 <code>flex-grow</code> 值为“<strong>分子</strong> ”，同时显式设置 <code>flex-basis</code> 的值为 <code>0%</code> 。比如前面的示例，我们可以像这样来编写你的 CSS:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
} 

.item {
    flex-basis: 0%;
    aspect-ratio: var(--ratio);
}

.item:nth-child(1) {
    flex-grow: 4;
}

.item:nth-child(2) {
    flex-grow: 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),ne={href:"https://codepen.io/airen/full/YzLaeEP",target:"_blank",rel:"noopener noreferrer"},le=d(`<p>如果 Flex 项目的宽高比的分母不同，你同样需要借助 CSS 自定义属性来完成，这样会让事情变得简单些：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container row&quot;&gt;
    &lt;div style=&quot;--ratio: 3 / 2;&quot; class=&quot;item column&quot;&gt;3:2&lt;/div&gt;
    &lt;div style=&quot;--ratio: 16 / 9;&quot; class=&quot;item column&quot;&gt;16:9&lt;/div&gt;
    &lt;div style=&quot;--ratio: 1 / 1;&quot; class=&quot;item column&quot;&gt;1:1&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
}

.item {
    flex-basis: 0%;
    aspect-ratio: var(--ratio);
    flex-grow: calc(var(--ratio))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是把 Flex 项目的 <code>flex-grow</code> 值为宽高比的计算值，比如 Flex 项目的宽高比是 <code>4 : 3</code> ，那么对应的 <code>flex-grow</code> 值就是 <code>1.333333</code> （即 <code>4 ÷ 3 = 1.3333</code>）。这种方案，还有一个优势，那就是 Flex 容器的 <code>gap</code> 值不会影响 Flex 项目的宽高比的计算。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    gap: 5px;
}

.item {
    flex-basis: 0%;
    aspect-ratio: var(--ratio);
    flex-grow: calc(var(--ratio))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be2292f8c177481089755170a0535499~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),de={href:"https://codepen.io/airen/full/OJZvQop",target:"_blank",rel:"noopener noreferrer"},se=e("p",null,[i("添点料进去（加上"),e("code",null,"<img>"),i("），那么具有宽高比的图片墙（九宫格）布局效果就有了：")],-1),ce=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dd08f8caed04bedbc520503e7f6c88c~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),te={href:"https://codepen.io/airen/full/QWrmmGZ",target:"_blank",rel:"noopener noreferrer"},ae=d(`<p>小作业，请使用 Flexbox 和 <code>aspect-ratio</code> 构建下图这样的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6131cb0a0b4648e0a4b4c9e11447e7af~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="具有不同对齐方式的导航栏" tabindex="-1"><a class="header-anchor" href="#具有不同对齐方式的导航栏" aria-hidden="true">#</a> 具有不同对齐方式的导航栏</h2><p>在 Web 应用或 Web 页面中，导航栏（导航菜单）是 Web 中必不可少的一部分。我想很多同学在实际开发中碰到各式各样的导航栏的布局效果，抛开其他的 UI 样式不谈，只聊导航栏的对齐，就足以让不少同学感到头痛。</p><p>就导航栏对齐方式来说，很多同学都认为 “使用 Flexbox 的对齐方式” 就足以搞定，事实上呢？并非如此。虽然 Flexbox 的对齐方式很强大，但有些场景我们是不能使用 Flexbox 来布局，或者说使用 Flexbox 布局并不是最合适的。比如下图中，红色框中的导航栏的对齐效果，如果使用 Flexbox 就不太适合：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca48a36541004c7e8b85e23f03c1dcf1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如你看到的，上图中红色框是不太适合使用 Flexbox 来布局，但蓝色框中的布局效果，使用 Flexbox 就比较适合。</p><p>以下图中的导航栏为例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d92b0390c465481c9586ff30b146a87c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>很常见的几种对齐方式：</p><ul><li>居中对齐；</li><li>居左对齐；</li><li>两端对齐；</li><li>居右对齐。</li></ul><p>这四种对齐方式，在 Flexbox 布局中真的是太容易。前面三个，只需要在相应的 Flex 容器中设置 <code>justify-content</code> 属性的值即可，最后一个需要稍微加点样式，因为你无法直接使用 <code>justify-content</code> 的 <code>space-between</code> 就能达到所需要的效果，因此，只需在相应的 Flex 项目上设置 <code>margin-left</code> 为 <code>auto</code> 即可：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- 样式一 --&gt;
&lt;header class=&quot;container&quot;&gt;
    &lt;NavMenu /&gt;
&lt;/header&gt;

&lt;!-- 样式二 和 样式三 --&gt;
&lt;header class=&quot;container&quot;&gt;
    &lt;Logo /&gt;
    &lt;NavMenu /&gt;
&lt;/header&gt;

&lt;!-- 样式四 --&gt;
&lt;header class=&quot;container&quot;&gt;
    &lt;Logo /&gt;
    &lt;NavMenu /&gt;
    &lt;Cart /&gt;
&lt;/header&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    algin-items: center;
}

.container:nth-child(1) {
    justify-content: center;
}

.container:nth-child(3) {
    justify-content: space-between;
}

.container:nth-child(4) .cart{
    margin-left: auto;
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),oe={href:"https://codepen.io/airen/full/ExLELgm",target:"_blank",rel:"noopener noreferrer"},re=d(`<h2 id="灵活的弹性框" tabindex="-1"><a class="header-anchor" href="#灵活的弹性框" aria-hidden="true">#</a> 灵活的弹性框</h2><p>Flexbox 布局最大的优势之一就是使用该技术构建的布局灵活性，适配性很强。Flex 项目的大小能很好适应它的容器（Flex 容器）。比如下面这个两列布局，左侧栏固定宽度，主内容列能随着它的父容器大小自适应，即父容器变大，它变宽；父容器小，它变窄：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b4bacf532ab4c6ab26a2f6879759bff~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
    &lt;aside&gt;&lt;/aside&gt;
    &lt;main&gt;&lt;/main&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中原理很简单，只需要将 <code>main</code> 元素的 <code>flex</code> 设置为 <code>1 1 auto</code> 或者 <code>1 1 0%</code> 即可。这样一来 <code>main</code> 就会根据 Flex 容器的空间自动调整自身的大小：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
}

aside {
    width: var(--fixed-width, 200px);
}

main {
    flex: 1 1 0%;
    min-width: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),ve={href:"https://codepen.io/airen/full/GRdxGpg",target:"_blank",rel:"noopener noreferrer"},ue=d(`<p>这样的效果还经常配合文本截取的特性一起使用。比如一行长文本，当 Flex 容器有足够空间时，显示所有文本，当 Flex 容器空间变小，无法展示所有文本时，文本会被剪切，并在文本末尾添加指示器（三个点 <code>...</code>）：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;target&quot;&gt;
  &lt;div class=&quot;target__title&quot;&gt;
    &lt;strong&gt;Flexbox Layout:&lt;/strong&gt; Text here is very very long that it might
    get truncate if this box get resized too small
  &lt;/div&gt;
  &lt;div class=&quot;target__emoji&quot;&gt;
    🎃
  &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.target {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.target__title {
  overflow: hidden;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.target__emoji {
  width: max-content;
  margin-left: auto;
  flex-shrink: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0816d87afffe46c698364b2aabe761ae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),me={href:"https://codepen.io/airen/full/zYjWaZJ",target:"_blank",rel:"noopener noreferrer"},be=d(`<p>注意，在这个示例中，弹性框 <code>.target__title</code> 使用了 <code>flex</code> 的默认值，即 <code>flex: 0 1 auto</code> 。</p><p>再来看一个关于 <code>text-overflow: ellipsis</code> 在 Flexbox 布局中的实例。比如下面这样的一个场景，在我们平时的开发中也是很常见的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565a113fd3374632a67fa716da17823a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>设计师期望的是“徽标过多时，最好提供省略号指示器，并不是直接截断或断行”。对于开发者来说，可能会使用像下面这样的一个 HTML 结构来构建徽标列表：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- HTML --&gt; 
&lt;ul class=&quot;badges&quot;&gt;
    &lt;li&gt;Fast food&lt;/li&gt;
    &lt;!-- ... --&gt;
    &lt;li&gt;Fruits&lt;/li&gt; 
&lt;/ul&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能会认为，直接给 <code>.badges</code> 元素添加下面几行代码就可以达到 Web 设计师预期的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.badges { 
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的处理方式，最终在浏览器中呈现出来的效果是“溢出容器的徽标被裁剪了”：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf35e662f5e5423f8dd9a05ead209ef6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果把 <code>text-overflow</code> 相关的样式设置到 <code>&lt;li&gt;</code> 标签上：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.badges li { 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然不会像上面一样，把溢出的徽标裁剪掉，但这样做的话，虽然能在容器空间中将徽标罗列出来，但会在每个徽标上添加省略号的指示器，也不符合预期效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70370e1aae6943518603934c3eac46e6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果<code>li</code>元素是一个 Flex 容器的话，达到上图效果还需要额外添加一个标签来包裹文本：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code> &lt;ul class=&quot;badges&quot;&gt; 
     &lt;li&gt;&lt;span&gt;Fast food&lt;/span&gt;&lt;/li&gt; 
     &lt;!-- ... --&gt; 
     &lt;li&gt;&lt;span&gt;Fruits&lt;/span&gt;&lt;/li&gt; 
&lt;/ul&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，在 CSS 中还是有方案可以达到设计师预期想要的效果的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39ae09d88c374793865036130dd9cb0c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>达到上图的效果，在 CSS 中有两种方式可以实现，先来看第一种，即 <strong>使用 <code>line-clamp</code><strong><strong>替代</strong></strong><code>text-overflow</code></strong> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .badges { 
     overflow: hidden; 
     text-overflow: ellipsis; 
     display: -webkit-box; 
     -webkit-line-clamp: 1; 
     -webkit-box-orient: vertical; 
 } 
 
 .badges li { 
     display: inline-flex; /* inline-block */ 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一种，还是继续使用 <code>text-overflow</code>，但需要改变每个<code>li</code>视觉模型，即 <strong>将</strong> <strong><code>display</code></strong> <strong>设置为</strong> <strong><code>inline-block</code></strong> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .badges  { 
     white-space: nowrap; 
     overflow: hidden; 
     text-overflow: ellipsis; 
 } 
 
 .badges li { 
     display: inline-block; /* inline-flex */ 
 } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),pe={href:"https://codepen.io/airen/full/KKRoexo",target:"_blank",rel:"noopener noreferrer"},ge=e("p",null,[i("小作业，请使用 Flexbox 和 文本截取等功能，构建下图这样的一个布局效果，列表项标题较长时（文本多）会被截断，并且提供省略号指示符（"),e("code",null,"..."),i("），反之则不会：")],-1),fe=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f06264b0eee94db6b3b019c7e8621559~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1);function xe(he,Se){const n=c("ExternalLinkIcon");return t(),a("div",null,[r,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",v,[i("https://codepen.io/airen/full/rNvpYJW"),l(n)])])]),u,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",m,[i("https://codepen.io/airen/full/abGqoqo"),l(n)])])]),b,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",p,[i("https://codepen.io/airen/full/bGMLbzK"),l(n)])])]),g,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",f,[i("https://codepen.io/airen/full/zYjRYGv"),l(n)])])]),x,e("blockquote",null,[e("p",null,[i("Demo: "),e("a",h,[i("https://codepen.io/airen/full/poVaoEM"),l(n)])])]),S,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",q,[i("https://codepen.io/airen/full/JjvpjLy"),l(n)])])]),k,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",_,[i("https://codepen.io/airen/full/VwxQLyj"),l(n)])])]),y,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",j,[i("https://codepen.io/airen/full/PoeQPVL"),l(n)])])]),F,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",C,[i("https://codepen.io/airen/full/GRdQZYv"),l(n)])])]),w,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",L,[i("https://codepen.io/airen/full/YzLeRZx"),l(n)])])]),z,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",M,[i("https://codepen.io/airen/full/XWqZOao"),l(n)])])]),H,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",T,[i("https://codepen.io/airen/full/RwyQvJG"),l(n)])])]),W,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",D,[i("https://codepen.io/airen/full/JjvpzPY"),l(n)])])]),Y,e("p",null,[i("12 列网格布局最早源于 "),e("a",G,[i("960gs 网格布局系统"),l(n)]),i("，它和 CSS 原生的网格系统不是同一个东西。简单地说，960gs 就是将页面分成12列，有列宽和列间距，然后页面的布局划分到具体的列上面，如下图所示：")]),Z,e("p",null,[i("早期的 960gs 都是使用 CSS 的浮动（"),J,i("）来构建的，不过现在很多 CSS 框（CSS Frameworks）中的网格系统都采用 Flexbox 来构建，比如 "),e("a",N,[i("Bootstrap的网格系统"),l(n)]),i(" 现在就是采用 Flexbox 布局构建的。")]),A,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",E,[i("https://codepen.io/airen/full/qBYxwXK"),l(n)])])]),R,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Q,[i("https://codepen.io/airen/full/ZEorZVa"),l(n)])])]),V,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",B,[i("https://codepen.io/airen/full/yLjKzgp"),l(n)])])]),K,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",P,[i("https://codepen.io/airen/full/oNdqobL"),l(n)])])]),I,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",O,[i("https://codepen.io/airen/full/eYrMeWq"),l(n)])])]),X,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",U,[i("https://codepen.io/airen/full/WNJzdYw"),l(n)])])]),$,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ee,[i("https://codepen.io/airen/full/jOxzZPm"),l(n)])])]),ie,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ne,[i("https://codepen.io/airen/full/YzLaeEP"),l(n)])])]),le,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",de,[i("https://codepen.io/airen/full/OJZvQop"),l(n)])])]),se,ce,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",te,[i("https://codepen.io/airen/full/QWrmmGZ"),l(n)])])]),ae,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",oe,[i("https://codepen.io/airen/full/ExLELgm"),l(n)])])]),re,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ve,[i("https://codepen.io/airen/full/GRdxGpg"),l(n)])])]),ue,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",me,[i("https://codepen.io/airen/full/zYjWaZJ"),l(n)])])]),be,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",pe,[i("https://codepen.io/airen/full/KKRoexo"),l(n)])])]),ge,fe])}const ke=s(o,[["render",xe],["__file","index-09.html.vue"]]);export{ke as default};
