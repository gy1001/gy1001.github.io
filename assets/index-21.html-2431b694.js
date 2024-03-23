import{_ as s,M as o,p as t,q as c,R as e,t as i,N as d,a1 as l}from"./framework-e8cb8151.js";const a={},r=l('<h1 id="_21-display-contents-改变-flexbox-和-grid-布局模式" tabindex="-1"><a class="header-anchor" href="#_21-display-contents-改变-flexbox-和-grid-布局模式" aria-hidden="true">#</a> 21-display：contents 改变 Flexbox 和 Grid 布局模式</h1><p>在 CSS 中，<code>display</code> 属性是一个非常重要的基础属性，也正因为它重要， W3C 以一个独立的模块在维护它。不过，对于很多 Web 开发者来说，只知道 <code>display</code> 可以设置类似 <code>block</code> 、<code>inline</code> 、<code>inline-block</code> 、<code>flex</code> 、<code>inline-flex</code> 、<code>grid</code> 和 <code>inline-grid</code> 等值，却不知道它也可以取 <code>contents</code> 值。</p><p>更为重要的一点是，在制定 <code>subgrid</code> （子网格）相关的规范时，社区中不少开发者建议使用 <code>display: contents</code> 来替代 <code>subgrid</code> ，也有不少关于 <code>display: content</code> 和 <code>subgrid</code> 的争论。那么，<code>display: contents</code> 是什么？它又将对 CSS Flexbox 和 Grid 布局带来哪些变化呢？你可以在接下来的内容中找到答案。</p><h2 id="display-给文档流带来的变化" tabindex="-1"><a class="header-anchor" href="#display-给文档流带来的变化" aria-hidden="true">#</a> display 给文档流带来的变化</h2>',4),u=e("code",null,"display",-1),v={href:"https://www.w3.org/TR/css-display-3/#box-generation",target:"_blank",rel:"noopener noreferrer"},m=e("code",null,"contents",-1),b=e("code",null,"display: contents",-1),p=e("code",null,"display",-1),g=l('<p>从 CSS 盒模型中可以知道，文档树中的每个元素都是一个矩形框（盒子）。广义上讲，这个“矩形框”由两部分组成。首先，我们有实际的盒子，由 <code>border</code>、<code>padding</code> 和 <code>margin</code> 区域组成；其次，我们有盒子的内容，即内容区域：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/514973f508d341c6878f41b4237603e7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>默认情况之下，浏览器解析任何一个文档时，将会按下图方式来渲染文档流：</p><ul><li><strong>垂直流</strong> ，也称为块流，一般就是块元素默认流向，在不改变书写模式下，它一般由上往下垂直排列；</li><li><strong>水平流</strong> ，也称为内联流，一般就是文档所用语言的书写方式或阅读方式的流向。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d5ce7709aa44094a71d8a1db7799dfc~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们可以通过 CSS 的 <code>display</code> 属性将任何一个文档流做出改变，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3a2a0dd076b46f39cfc71d176c25acc~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>稍微对 CSS 有认识的 Web 开发者都知道，使用 CSS 的 <code>display</code> 属性可以改变元素盒子及其后代元素以不同的上下文格式（即，产生不同的视觉格式化模型）在浏览器中渲染。每个格式化上下文都拥有不同的渲染规则，而这些规则是用来决定其子元素如何定位，以及和其他元素的关系。通俗点讲，它就有点像把水倒进不同的器皿中，会有不同的形态：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36affa3c16de4ebbbb4685c61454a35e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>具体点说，当 <code>display</code> 取值为：</p><ul><li><code>inline</code> 时，会创建一个 IFC （Inline Formatting Context）；</li><li><code>block</code> 时，会创建一个 BFC （Block Formatting Context）；</li><li><code>grid</code> 或 <code>inline-grid</code> 时，会创建一个 GFC （Grid Formatting Context）；</li><li><code>flex</code> 或 <code>inline-flex</code> 时，会创建一个 FFC （Flexbox Formatting Context）。</li></ul><p>注意，这里所列的是几个常见的值，<code>display</code> 还可以取值为 <code>list-item</code> 、<code>inline-block</code> 、<code>flow-root</code> 、<code>table</code> 、<code>table-row</code> 、<code>table-cell</code> 、<code>none</code> 和 <code>contents</code> 等。</p><p>不同的是，<code>display</code> 属性有两个值，<strong>是用来控制标记中定义的元素是否产生一个盒子</strong> ：</p><ul><li><strong><code>none</code></strong> ：将导致盒子或其内容在页面上不被绘制，比如，CSS 中常用它来隐藏一个元素；</li><li><strong><code>contents</code></strong> ：将导致盒子的内容（<code>content-box</code>）被正常绘制，但周围的盒子（<code>border-box</code> 、<code>padding-box</code> 和 <code>margin-box</code>）被完全忽略。</li></ul><p>有了这个基础之后，就可以先来回答 <code>display: contents</code> 是什么？</p><h2 id="display-contents-是什么" tabindex="-1"><a class="header-anchor" href="#display-contents-是什么" aria-hidden="true">#</a> display: contents 是什么？</h2>',16),f={href:"https://www.w3.org/TR/css-display-3/#box-generation",target:"_blank",rel:"noopener noreferrer"},h=l(`<blockquote><p><strong>显式设置</strong> <strong><code>display</code></strong> <strong>属性值为</strong> <strong><code>contents</code></strong> <strong>的元素自身不会产生任何盒子，但它的子元素和伪元素仍会产生盒子，文本运行也正常。对于盒子的生成和布局，该元素必须被视为在元素树中被其内容所取代，包括其源文件的子元素和伪元素，比如</strong> <strong><code>::before</code></strong> <strong>和</strong> <strong><code>::after</code></strong> <strong>伪元素，它们在该元素的子元素之前或之后****正常生成</strong> 。</p></blockquote><p>简单地说，<strong><code>display</code></strong> <strong>为</strong> <strong><code>contents</code> 时</strong>，<strong>允许你以某种方式从盒子树（Box Tree）中移除一个元素，但仍保留其内容</strong> 。</p><p>注意，由于只有盒子树受到影响，任何基于文档树的语义，如选择器匹配、事件处理和属性继承，都不会受到影响。但它也会阻止可访问性工具（比如屏幕阅读器）访问该元素的语义。</p><h2 id="display-contents-会给-flexbox-和-grid-布局带来什么变化" tabindex="-1"><a class="header-anchor" href="#display-contents-会给-flexbox-和-grid-布局带来什么变化" aria-hidden="true">#</a> display: contents 会给 Flexbox 和 Grid 布局带来什么变化？</h2><p>我们先抛开 <code>display: contents</code> 会给 Flexbox 和 Grid 布局带来什么变化不说，先来看看一个元素显式设置 <code>display:contents</code> 会发生什么变化？理解使用 <code>diplay: contents</code> 时会发生什么，最简单方法是 <strong>想象元素的开始和结束标签被从标记中省略</strong> 。严格地说，对于盒子的生成和布局，该元素必须被视为在元素树中被其内容所取代。</p><p>我们通过下面的示例来阐述可能更易于大家理解。假设我们有一个类似下面这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;section&gt; 
    我是 section 元素的文本节点（文本内容） 
    &lt;p&gt;我是一个 p 元素，同时是 section 元素的子元素&lt;/p&gt; 
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别给 <code>section</code> 和 <code>p</code> 元素添加一点 CSS 规则：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>section { 
    border: 6px solid #f44336; 
    padding: 2rem; 
    background-image: linear-gradient(to right, #09f, #90f); 
    text-shadow: 1px 1px 0 rgb(0 0 0 / .85); 
    filter: drop-shadow(8px 8px 1px rgb(0 0 0 / .85)); 
    margin: 2rem;
    width: 50vw;
} 

p { 
    background-color:#607d8b; 
    padding: 2rem 1rem; 
    font-size: 80%; 
    color: #cddc39; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你将看到下图这样的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36baad87ff4b4b4285a29b66294d3c32~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>section</code> 元素的各种盒子样式都存在：</p><ul><li><code>padding-box</code> ，元素有 <code>2rem</code> 内距（<code>padding</code>）；</li><li><code>border-box</code> ，元素有 <code>6px</code> 实线边框 （<code>border</code>）；</li><li><code>margin-box</code> ，元素有 <code>2rem</code> 外距（<code>margin</code>）。</li></ul><p>除此之外，还设置了其他一些样式，比如 <code>width</code> （宽度）、<code>filter</code> （滤镜）、<code>text-shadow</code> （文本阴影）、<code>background-image</code> （背景图片）等。</p><blockquote><p>注意，<code>section</code> 元素盒子宽度尺寸 <code>width</code> 与元素的 <code>box-sizing</code> 取值有关，这里显式设置了 <code>box-sizing</code> 的值为 <code>border-box</code> ，包含了 <code>border-width</code> 和 <code>padding</code> 大小。</p></blockquote><p>尝试着在 <code>section</code> 元素上设置 <code>display</code> 属性的值为 <code>contents</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>section {
    display: contents;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cd4f94f6b434d189ff11cf85966650b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你会发现， <code>section</code> 元素的 <code>display</code> 属性值为 <code>contents</code> 时，该元素自身的样式规则就像是被丢失或禁用了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbfeb9282a604d56a27f492d830b8ef5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,20),x={href:"https://codepen.io/airen/full/vYrzMvQ",target:"_blank",rel:"noopener noreferrer"},q=l(`<p>其实，设置了 <code>display</code> 为 <code>contents</code> 的 <code>section</code> 元素，其渲染就有点像是其父元素伪元素生成了内容，并且这个伪元素没有设置任何样式规则：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;section class=&quot;contents&quot;&gt;
    我是 section 元素的文本节点（文本内容）
    &lt;p&gt;我是一个 p 元素，同时是 section 元素的子元素&lt;/p&gt;
&lt;/section&gt;
  
&lt;section class=&quot;pseudo-elements&quot;&gt;
    &lt;p&gt;我是一个 p 元素，同时是 section 元素的子元素&lt;/p&gt;
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.contents {
    border: 6px solid #f44336; 
    padding: 2rem; 
    background-image: linear-gradient(to right, #09f, #90f); 
    text-shadow: 1px 1px 0 rgb(0 0 0 / .85); 
    filter: drop-shadow(8px 8px 1px rgb(0 0 0 / .85)); 
    margin: 2rem;
    width: 50vw;
    
    display: var(--display, initial);
} 

.pseudo-elements::before {
    content:&quot;我是 section 元素的文本节点（文本内容）&quot;;
}

p { 
    background-color:#607d8b; 
    padding: 2rem 1rem; 
    font-size: 80%; 
    color: #cddc39; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fdc3c4c15014b9785ca8dbbf9d192b5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),y={href:"https://codepen.io/airen/full/OJEoYXP",target:"_blank",rel:"noopener noreferrer"},S=l(`<p>事实上，设置了 <code>display</code> 值为 <code>contents</code> 元素，就好比该元素的开始标签和结束标签都丢失了：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>我是 section 元素的文本节点（文本内容）
&lt;p&gt;我是一个 p 元素，同时是 section 元素的子元素&lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>用一句话来描述的话，元素设置 <code>display: contents</code> 行为就是：</p><blockquote><p><strong>自身样式规则都被丢失，只剩下文本内容和其后代元素，包括它的伪元素。好比元素的开始和闭合标签被删除。但不会影响后代元素的样式规则</strong> ！</p></blockquote><p>也就是说，<strong><code>display:contents</code></strong> <strong>只影响该元素在页面上绘制的视觉效果，但不影响文档中的标记，包括标签元素的属性</strong> 。比如下面这样的一个示例：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- HTML --&gt; 
&lt;div class=&quot;control&quot;&gt;
    &lt;label id=&quot;label&quot; style=&quot;display: contents;&quot;&gt;我是大漠&lt;/label&gt; 
    &lt;button aria-labelledby=&quot;label&quot;&gt;&lt;button&gt; 
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>&lt;button&gt;</code> 上的 <code>aria-labelledby</code> 和 <code>label</code> 还是具有相应的绑定关系。当屏幕阅读器在<code>&lt;button&gt;</code> 获得焦点时，就会朗读出 <code>id=&quot;label&quot;</code> 元素的内容，即 “我是大漠”。</p><p>而且，<strong>带有</strong> <strong><code>display: contents</code></strong> <strong>的元素的 JavaScipt 事件不会受影响</strong> ，比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- HTML --&gt; 
&lt;button id=&quot;contents&quot; style=&quot;display: contents&quot;&gt;我是一个按钮&lt;/button&gt; 

&lt;!-- JavaScript --&gt;
&lt;script&gt; 
    const contentsEle = document.getElementById(&quot;contents&quot;); 
    contentsEle.addEventListener(&quot;click&quot;, (etv) =&gt; { 
        alert(etv.target.textContent); 
    }); 
&lt;/script&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2516f67430a4206b4681c618b1c93e8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),k={href:"https://codepen.io/airen/full/vYrzwRB",target:"_blank",rel:"noopener noreferrer"},_=l(`<p>除此之外，<strong>带有</strong> <strong><code>display: contents</code></strong> <strong>的元素的伪元素（比如</strong> <strong><code>::before</code></strong> <strong>和</strong> <strong><code>::after</code></strong>）会被认为是其子元素的一部分，同样能正常显示 ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.contents {
    border: 6px solid #f44336; 
    padding: 2rem; 
    background-image: linear-gradient(to right, #09f, #90f); 
    text-shadow: 1px 1px 0 rgb(0 0 0 / .85); 
    filter: drop-shadow(8px 8px 1px rgb(0 0 0 / .85)); 
    margin: 2rem;
    width: 50vw;
    
    display: var(--display, initial);
}

.contents::before,
.contents::after {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color:#607d8b; 
    color: #cddc39; 
    border: 1px solid currentColor;
    border-radius: 4px;
    margin-inline: 10px;
    padding: .2em .5em;
}

.contents::before {
    content: &quot;Start&quot;;
}

.contents::after {
    content: &quot;End&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc842e7cc48e409c8e106bfb54f4d644~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),C={href:"https://codepen.io/airen/full/mdKGYGe",target:"_blank",rel:"noopener noreferrer"},w=l(`<p>上面我们看到的都是一些普通元素设置 <code>display</code> 为 <code>contents</code> 的表现。可 HTML 中有一些标签元素具有一些特殊的行为，比如 <code>&lt;img&gt;</code> 、<code>&lt;input&gt;</code> 等。换句话说，<strong>在表单元素（部分表单控件）、图片和可替换元素上设置</strong> <strong><code>display</code></strong> <strong>属性值为</strong> <strong><code>contents</code></strong> <strong>时，浏览器对其渲染与其他普通元素不一样</strong> 。我们来看 <code>&lt;img&gt;</code> 元素上设置 <code>display</code> 为 <code>contents</code> 的表现结果：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;img src=&quot;https://picsum.photos/800/600?random=2&quot; alt=&quot;&quot; class=&quot;contents&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.contents {
    border: 6px solid #f44336;
    background-image: linear-gradient(to right, #09f, #90f);
    filter: drop-shadow(8px 8px 1px rgb(0 0 0 / 0.85));
    width: 50vw;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 16 / 9;

    display: var(--display, initial);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0aada3157d145c4bd7485127f2bef74~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),j={href:"https://codepen.io/airen/full/NWzLVog",target:"_blank",rel:"noopener noreferrer"},L=l('<p>正如你所看到的，图片元素 <code>img</code> 的 <code>display</code> 取值为 <code>contents</code> 时，渲染结果等同于 <code>display</code> 为 <code>none</code> 的结果。这是因为，<code>&lt;img&gt;</code> 元素是一个<strong>可替换元素</strong> ，而 <code>display:content</code> 的作用就是会移动盒子，对于可替换元素移除盒子其实是没有意义的，因为它并不完全清楚“盒子”是什么。整个盒子和元素的内容根本不在页面上。</p><blockquote><p><strong>可替换元素是指一些元素，比如</strong> <strong><code>&lt;img&gt;</code></strong> <strong>，其外观和盒子是由外部资源控制的</strong> 。</p></blockquote><p>同样的现象也会发生在一些表单控件上。这是因为，部分表单元素并不是由一个单一的“盒子”组成的，但对于浏览器引擎来说，表单元素是由几个较小的元素组成的。与可替换元素相似，删除盒子也没有意义，因为它们并没有一个盒子。因此，像 <code>&lt;select&gt;</code> 、<code>&lt;input&gt;</code> 和 <code>&lt;textarea&gt;</code> 等表单控件元素，设置 <code>display</code> 的 <code>contents</code> 和 <code>none</code> 效果一样。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c885c4d8c0714bc99ab7ccd44472cc0e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',4),T={href:"https://codepen.io/airen/full/VwdGovM",target:"_blank",rel:"noopener noreferrer"},M=l(`<p>正如示例所示，<code>&lt;button&gt;</code> 、<code>&lt;summary&gt;</code> 和 <code>&lt;fieldset&gt;</code> 只移除视觉效果，内容还留着；而其他表单元素表现和 <code>display:none</code> 一样。</p><p>简单总结一下，HTML 的元素设置 <code>display</code> 为 <code>contents</code> 会有何不同表现。</p><ul><li>链接 <code>&lt;a&gt;</code> 元素有点类似于 <code>&lt;button&gt;</code> 元素，元素周围的盒子被视觉化地移除，留下链接的内容。由于属性通常不受这个 CSS 规则的影响，链接仍然可以正常工作，并且可以像正常一样用来导航。</li><li>HTML中的 <code>&lt;br&gt;</code>、<code>&lt;wbr&gt;</code>、<code>&lt;meter&gt;</code>、<code>&lt;progress&gt;</code>、<code>&lt;canvas&gt;</code>、<code>&lt;embed&gt;</code>、<code>&lt;object&gt;</code>、<code>&lt;audio&gt;</code>、<code>&lt;iframe&gt;</code>、<code>&lt;img&gt;</code>、<code>&lt;video&gt;</code>、<code>&lt;frame&gt;</code>、<code>&lt;frameset&gt;</code>、<code>&lt;input&gt;</code>、<code>&lt;textarea&gt;</code> 和 <code>&lt;select&gt;</code> 等元素设置为 <code>display: contents</code> 时和 <code>display: none</code> 相同。</li><li>HTML 中的 <code>&lt;legend&gt;</code> 不是一个已渲染的图例，因此，是否设置 <code>display: contents</code>，它的表现都是正常的。</li><li><code>&lt;button&gt;</code>、<code>&lt;details&gt;</code> 和 <code>&lt;fieldset&gt;</code> 这些元素没有任何特殊的行为，设置 <code>display</code> 为<code>contents</code> 时，只是移除它们的主框（视觉框），而它的内容则正常表现。</li><li><code>&lt;svg&gt;</code> 元素，<code>display: contents</code> 会被计算为 <code>display: none；</code>。</li><li><code>&lt;use&gt;</code> 元素使用 <code>display:contents</code> 时，会将该元素从格式化树中剥离，并将共内容提升到显示位置。</li><li>任何其他 SVG 元素，<code>display: contents</code> 都会计算成 <code>display: none</code>。</li><li>其他 HTML 元素的 <code>display: contents</code> 表现都很正常。</li></ul><p>花了不少篇幅向大家介绍<code>display: contents</code> 会给 HTML 元素带来什么样的变化。那么我们回过头来想想，不管是 CSS Flexbox 还是 CSS Grid 布局，只要在某个元素上显式设置了 <code>display</code> 的值为：</p><ul><li><code>flex</code> 或 <code>inline-flex</code> ，该元素就是一个 Flex 容器，它的直接子元素、伪元素、文本内容都被称为 Flex 项目；</li><li><code>grid</code> 或 <code>inline-grid</code> ，该元素就是一个网格容器，它的直接子元素、伪元素、文本内容都被称为网格项目。</li></ul><p>它们都有一个共同之处，<strong>后代元素不是 Flex 项目（或网格项目）</strong>。比如下面这个示例：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;header&gt;
    &lt;h1&gt;Logo&lt;/h1&gt;
    &lt;ul class=&quot;nav&quot;&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;Service&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;Blog&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;Contact us&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/header&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    display: flex; /* inline-flex*/
}

/* 或者 */
header {
    display: grid; /* inline-grid */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b21717c9b764362b74d1dfaf09f92c3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你也看到了，当 <code>header</code> 元素的 <code>display</code> 值为：</p><ul><li><code>flex</code> 或 <code>inline-flex</code> ，<code>header</code> 元素就是一个 Flex 容器，它的直接子元素 <code>h1</code> 和 <code>ul</code> 就成了 Flex 项目；</li><li><code>grid</code> 或 <code>inline-grid</code> ，<code>header</code> 元素就是一个网格容器，它的直接子元素 <code>h1</code> 和 <code>ul</code> 就成了网格项目。</li></ul><p>但如果你希望 <code>header</code> 的后代元素，比如 <code>li</code> 元素也变成 Flex 项目或网格项目，以往我们的做法就是在 <code>li</code> 的父元素 <code>ul</code> 上设置 <code>display</code> 的值为 <code>flex</code> 或 <code>grid</code> ，或者直接继承它父元素的 <code>display</code> 值（<code>inherit</code>）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    display: flex; /* inline-flex*/
}

/* 或者 */
header {
    display: grid; /* inline-grid */
}

ul {
    display: inherit;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/471eacdcb8054593b8283ce2c43d8bb7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然这样操作，<code>li</code> 变成了 Flex 项目或网格项目，但它们与 Flex 容器或网格容器 <code>header</code> 没有一点关系，它始终只是 Flex 容器或网格容器 <code>ul</code> 的 Flex 项目或网格项目。同时，<code>ul</code> 既是 <code>header</code> 的 Flex 项目或网格项目，也是 <code>li</code> 的 Flex 容器或网格容器。如此一来就产生了嵌套的 Flexbox 或网格。也可以说，Flex 项目或网格项目 <code>li</code> 始终无法上升到 Flex 容器或网格容器 <code>header</code> 的项目。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ef88f0646144bc285bbb4a3683fe215~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>庆幸的是，如果我们显式把 <code>ul</code> 的 <code>display</code> 属性值设置为 <code>contents</code> ，那么 <code>li</code> 就能上升直接变成 Flex 容器或网格容器 <code>header</code> 的 Flex 项目或网格项目。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    display: flex; /* inline-flex */
}

/* 或者 */
header {
    display: grid; /* inline-grid */
}

ul {
    display: contents;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面提到过了，当元素（一般是指 HTML 中的普通元素，除可替换元素和表单控件之外的元素）的 <code>display</code> 设置为 <code>contents</code> 时，就相当于该元素的开始和闭合标签被丢弃。<code>li</code> 就相当于变成了 <code>header</code> 的子元素了（这只是一种理解方式，并不是真实的变成了<code>header</code> 的子元素），它就顺理成章的变成了 <code>header</code> 的项目（Flex 项目或网格项目）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f571e2e7da4fe0ac38ebc992efc534~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,20),F={href:"https://codepen.io/airen/full/PoadMaL",target:"_blank",rel:"noopener noreferrer"},H=l('<p>我想，这个示例已经能很好地说明，<code>display: contents</code> 会给 Flexbox 和 Grid 布局带来什么变化。如果用一句话来概述的话，那就是：</p><blockquote><p><strong><code>display: contents</code></strong> <strong>将 Flexbox 与 Flexbox （或 Grid 与 Grid）的嵌套关系拍平了！</strong></p></blockquote><h2 id="display-contents-有什么作用" tabindex="-1"><a class="header-anchor" href="#display-contents-有什么作用" aria-hidden="true">#</a> display: contents 有什么作用？</h2><p>你可能会问，<code>display: contents</code> 有什么用呢？@Rachel Andrew 曾对 <code>display: contents</code> 作用有过这样的一段描述：</p>',4),z={href:"https://rachelandrew.co.uk/archives/2016/01/29/vanishing-boxes-with-display-contents/",target:"_blank",rel:"noopener noreferrer"},G=l(`<p>大致意思是说：“如果你想添加一些元素，这个值就很有用，因为<strong>它在文档语义方面有意义，但在视觉呈现上没有意义</strong> 。也许你在构建一个 Web 页面时，需要添加一些语义的标签元素，然后该标签在你的布局中是一个 Flex 项目，但你真正想要的 Flex 项目是该元素的后代元素。与其扁平化标记而去删除一些有意义的标签，使其内部元素成为 Flexbox 布局的一部分，那还不如使用 <code>display: contents</code> 来删除该元素生成盒子框。这样，你就可以同时获得两个优点，即 <strong>语义标记和设计所需的视觉呈现</strong> ”。</p><p>如果这段话不易于理解（或者我翻译不够正确）的话，我想用下面这个示例来解释。假设我们要构建像下图这样的一个页头：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22c47d81a3ab49db96c0b8d9c0412c47~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就我个人习惯而言，为了让 Web 页面（比如该导航）更具可访问性，我会使用像下面这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- Template 01: 我喜欢的一种模板结构 --&gt;
&lt;header&gt;
    &lt;a href=&quot;&quot; class=&quot;logo&quot;&gt;
        &lt;svg&gt;&lt;!-- logo 图标 --&gt;&lt;/svg&gt;
        &lt;span&gt;Codepen&lt;/span&gt;
    &lt;/a&gt;
    &lt;ul class=&quot;nav&quot;&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;service&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;about&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;blog&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;&quot;&gt;contact us&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/header&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，在实际开发的时候，我发现不少 Web 开发者为了使用 CSS Flexbox 或 CSS Grid 布局更容易，在编写 HTML 模板时会删除一些标签元素，比如把菜单栏中的 <code>ul</code> 和 <code>li</code> 直接删除了，来达到结构的扁平化：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- Template 02: 我不喜欢的一种模板结构  --&gt;
&lt;header&gt;
    &lt;svg&gt;&lt;!-- logo 图标 --&gt;&lt;/svg&gt;
    &lt;span&gt;Codepen&lt;/span&gt;
    &lt;a href=&quot;&quot;&gt;home&lt;/a&gt;
    &lt;a href=&quot;&quot;&gt;service&lt;/a&gt;
    &lt;a href=&quot;&quot;&gt;about&lt;/a&gt;
    &lt;a href=&quot;&quot;&gt;blog&lt;/a&gt;
    &lt;a href=&quot;&quot;&gt;contact us&lt;/a&gt;
&lt;/header&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的结构是足够扁平了，也符合结构尽量简洁，能不嵌套就不嵌套的一种说法。但它最大的不足之处是，失去了语义，让你构建的 Web 页面可访问性较差。就算不考虑像屏幕阅读器访问你的 Web 页面，就只是在没有样式（样式失效）的情况下，这两种结构给用户带来的体验就有着很大的差别，前者用户易于访问，后者用户阅读起来还是很痛苦的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a8899d60fb547bfac5610fb1fe8fa94~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>与其牺牲有语义化的标签来简化实现符合视觉呈现的过程，比如减少 Flexbox 的嵌套，还不如使用 <code>display: contents</code> 。换句话说，在基于第一种我喜欢的模板结构上，使用 <code>display: contents</code> 也减少 Flexbox 嵌套的使用，类似达到第二种不好的模板结构的效果。</p><p>实际对比一下，你会有更深的体会。基于模板结构一，使用 CSS Flexbox 来实现上图的布局效果，你可能需要这样来编写 CSS 代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.flex {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.flex .logo {
    display: inherit; /* 继承其父元素的 display 值，相当于 flex */
    align-items: center;
    gap: 5px;
}

.flex ul {
    display: inherit; /* 继承其父元素的 display 值，相当于 flex */
    align-items: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5691051057c42bfb4eda472735f30f7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在 <code>.logo</code> 和 <code>ul</code> 上设置 <code>display: contents</code> 就可以将相关的子元素上升为 <code>header</code> 的 Flex 项目，实现相同的视觉效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.contents {
    display: flex;
    align-items: center;
    gap: 5px;
}

.contents .logo,
.contents ul {
    display: contents;
}

.logo span {
    margin-right: calc(1rem - 5px);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b4601e491294f13bea88423ce745d68~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),W={href:"https://codepen.io/airen/full/wvXYvOx",target:"_blank",rel:"noopener noreferrer"},B=l(`<p>上面这个示例向大家展示的是 <code>display: contents</code> 在 CSS Flexbox 布局中的作用。接着我们再来看看 <code>display: contents</code> 在 CSS Grid 布局中的作用。</p><p>先来看一个表单方面的案例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/566b3de16f3b4a28a87fc6255c13100b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>CSS 网格布局中的 <code>subgrid</code> （子网格）非常适用于表单中 <code>&lt;label&gt;</code> 、<code>&lt;input&gt;</code> 和 “验证信息” 几个部分的布局。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d720711da97d4ba4916ce1914a4b27d5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>对于类似这样的布局，也很适用于 <code>display: contents</code> ，毕竟 <code>subgrid</code> 的支持度还是有一定的不足。也可以这么说吧，你可以把 <code>display: contents</code> 当作是 <code>subgrid</code> 的降级处理。当然，要不是为了向大家阐述 <code>display: contents</code> 作用，个人是不建议使用它来替代 <code>subgrid</code> 的。</p><p>简单地说：<strong><code>display:contents</code></strong> <strong>可以用来模拟网格布局中的</strong> <strong><code>subgrid</code></strong> <strong>，但不会用来替代</strong> <strong><code>subgrid</code></strong> 。这也是为什么社区中有另一种的争论，为什么是 <code>subgrid</code> ，而不是 <code>display:contents</code> 。</p><p>就拿上图为例吧，先来看 CSS 网格布局中的 <code>subgrid</code> 是如何实现的。整个页面的 HTML 结构可能会像是下面这样：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;form--container&quot;&gt;
    &lt;h1&gt;Welcome&lt;/h1&gt;
    &lt;form class=&quot;sign-in&quot;&gt;
        &lt;div class=&quot;control&quot;&gt;
            &lt;label for=&quot;user&quot;&gt;Username or Email&lt;/label&gt;
            &lt;input type=&quot;text&quot; name=&quot;user&quot; id=&quot;user&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;control&quot;&gt;
            &lt;label for=&quot;password&quot;&gt;Password&lt;/label&gt;
            &lt;input type=&quot;text&quot; name=&quot;password&quot; id=&quot;password&quot; /&gt;
            &lt;p class=&quot;help--info&quot;&gt;Forgot your password?&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class=&quot;control&quot;&gt;
            &lt;button class=&quot;button button--primary&quot;&gt;Sign In&lt;/button&gt;
        &lt;/div&gt;
    &lt;/form&gt;
    &lt;div class=&quot;sign-up&quot;&gt;
        &lt;p&gt;Don&#39;t have an account yet?&lt;/p&gt;
        &lt;button class=&quot;button button--outline&quot;&gt;Sing Up&lt;/button&gt;
    &lt;/div&gt;
    &lt;figure&gt;
        &lt;img src=&quot;&quot; alt=&quot;welcom branner&quot; /&gt;
    &lt;/figure&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.form--container {
    display: grid;
    grid-template-columns: 1.5rem max-content minmax(0, 1fr) minmax(0, 1.5fr);
    grid-auto-flow: dense;
    grid-template-areas:
        &quot;... title     title     thumbnail&quot;
        &quot;... sign-in   sign-in   thumbnail&quot;
        &quot;... division  division  thumbnail&quot;
        &quot;... sign-up   sign-up   thumbnail&quot;;
    column-gap: 1.5rem;
}

.form--container h1 {
    grid-area: title;
}

.sign-in {
    grid-area: sign-in;
}

.sign-up {
    grid-area: sign-up;
    display: inherit;
    row-gap: 10px;
    grid-template-columns: subgrid;
    place-items: center;
    align-content: center;
}

figure {
    grid-area: thumbnail;
}

.form--container::after {
    grid-area: division;
}

.sign-in {
    display: inherit;
    grid-template-columns: subgrid;
    row-gap: 3rem;
    align-content: center;
}

.sign-in .control {
    grid-column: span 2;
    display: inherit;
    grid-template-columns: subgrid;
}

.sign-in p {
    grid-column: 2;
    justify-self: end;
    margin-top: 8px;
}

.sign-in label {
    place-self: center end;
}

.sign-in button {
    place-self: center;
    grid-column: span 2;
}

.sign-up * {
    grid-column: 1 / -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你在 Firefox 浏览器将看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c989660fd34190a51a526fd25d50c7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,12),D={href:"https://codepen.io/airen/full/oNyaLjN",target:"_blank",rel:"noopener noreferrer"},E=l(`<p>简单地分析一下，在最外面的容器 <code>.form--container</code> 上使用 <code>grid-template-columns</code> 定义了一个四列的网格，同时指定了每列的列宽；使用 <code>grid-template-areas</code> 显式地命名了网格区域名称，用于方便放置元素：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.form--container {
    display: grid;
    grid-template-columns: 1.5rem max-content minmax(0, 1fr) minmax(0, 1.5fr);
    grid-auto-flow: dense;
    grid-template-areas:
        &quot;... title     title     thumbnail&quot;
        &quot;... sign-in   sign-in   thumbnail&quot;
        &quot;... division  division  thumbnail&quot;
        &quot;... sign-up   sign-up   thumbnail&quot;;
    column-gap: 1.5rem;
}

.form--container h1 {
    grid-area: title;
}

.sign-in {
    grid-area: sign-in;
}

.sign-up {
    grid-area: sign-up;
}

figure {
    grid-area: thumbnail;
}

.form--container::after {
    grid-area: division;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c3c1a49aae44069b224280dcbe6e5dd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可以看到，其中页面标题 <code>h1</code> 、登录表单 <code>.sign-in</code> 、分割线、注册信息都跨越了两列。这样做的原因之一是，登录表单中 <code>label</code> 和 <code>input</code> 是水平排列。</p>`,4),V={href:"https://juejin.cn/book/7161370789680250917/section/7160657953932967967",target:"_blank",rel:"noopener noreferrer"},N={href:"https://juejin.cn/book/7161370789680250917/section/7161624149717155870",target:"_blank",rel:"noopener noreferrer"},Y=e("code",null,".sign-in",-1),P=e("code",null,"sign-up",-1),R=e("code",null,"grid-template-columns",-1),I=e("code",null,"subgrid",-1),U=l(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.sign-in {
    grid-area: sign-in;
    
    display: inherit;
    grid-template-columns: subgrid;
    
    row-gap: 3rem;
    align-content: center;
}

.sign-up {
    grid-area: sign-up;
    
    display: inherit;
    grid-template-columns: subgrid;
    
    row-gap: 10px;
    place-items: center;
    align-content: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0188c7c18120410098ca0f09554fb481~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>但这还没有结束，示例中的 <code>label</code> 和 <code>input</code> 外面还有一层容器 <code>div.control</code> ，要让它们水平排列，还要按类似的方法，将 <code>div.control</code> 也定义成一个网格，继承它父网格 <code>.sign-in</code> 的列轨道：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.sign-in .control {
    grid-column: span 2;
    display: inherit;
    grid-template-columns: subgrid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是在不牺牲标签语义化的前提下，使用 CSS 网格的子网格 <code>subgrid</code> 功能构建登录页面的整个过程。</p><p>就这个登录表单的案例，如果不想使用 <code>subgrid</code> 来实现，又不牺牲语义化标签，那么可以尝试着使用 <code>display: contents</code> 来实现。前面介绍过，<code>display:contents</code> 可以让网格项目上升到需要的地方。即：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f621f2aa2fc4b019b72109e0b788b19~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当 <code>.sign-in</code> 、<code>sign-up</code> 和 <code>.control</code> 的 <code>display</code> 设置为 <code>contents</code> 时，HTML 结构就相当于变成，实际上 HTML 结构不会有任何的改变：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;form--container&quot;&gt;
    &lt;h1&gt;Welcome&lt;/h1&gt;
    &lt;label for=&quot;user&quot;&gt;Username or Email&lt;/label&gt;
    &lt;input type=&quot;text&quot; name=&quot;user&quot; id=&quot;user&quot; /&gt;
    &lt;label for=&quot;password&quot;&gt;Password&lt;/label&gt;
    &lt;input type=&quot;text&quot; name=&quot;password&quot; id=&quot;password&quot; /&gt;
    &lt;p class=&quot;help--info&quot;&gt;Forgot your password?&lt;/p&gt;
    &lt;button class=&quot;button button--primary&quot;&gt;Sign In&lt;/button&gt;
    &lt;p&gt;Don&#39;t have an account yet?&lt;/p&gt;
    &lt;button class=&quot;button button--outline&quot;&gt;Sing Up&lt;/button&gt;
    &lt;figure&gt;
        &lt;img src=&quot;&quot; alt=&quot;welcom branner&quot; /&gt;
    &lt;/figure&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个基础之后，可以使用 <code>grid-template-columns</code> 和 <code>grid-template-areas</code> 重新定义网格 <code>.form--container</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.form--container {
    display: grid;
    grid-template-columns: 1.5rem max-content minmax(0, 1fr) minmax(0, 1.5fr);
    grid-auto-flow: dense;
    grid-template-areas:
        &quot;... title       title          thumbnail&quot;
        &quot;... user        user-input     thumbnail&quot;
        &quot;... password    password-input thumbnail&quot;
        &quot;... ...         help-info      thumbnail&quot;
        &quot;... primary     primary        thumbnail&quot;
        &quot;... division    division       thumbnail&quot;
        &quot;... signup-des  signup-des     thumbnail&quot;
        &quot;... outline     outline        thumbnail&quot;;
    gap: 3rem 1.5rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>grid-area</code> 把相应元素放置到已命名的网格区域中，并且调整它们各自的对齐方式，就实现了我们所期望的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de4dfd5823dd4e18914c3f2795bd92b6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),J={href:"https://codepen.io/airen/full/BaVqPap",target:"_blank",rel:"noopener noreferrer"},O=l(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.form--container h1 {
    grid-area: title;
}

label[for=&quot;user&quot;] {
    grid-area: user;
}

input[name=&quot;user&quot;] {
    grid-area: user-input;
}

label[for=&quot;password&quot;] {
    grid-area: password;
}

input[name=&quot;password&quot;] {
    grid-area: password-input;
}

.help--info {
    grid-area: help-info;
    margin-top: calc(10px - 3.5rem);
    justify-self: end;
}

.button--primary {
    grid-area: primary;
}

.sign-up p {
    grid-area: signup-des;
    place-self: center;
}

.button--outline {
    grid-area: outline;
    margin-top: calc(10px - 4rem);
}

figure {
    grid-area: thumbnail;
}

.form--container::after {
    grid-area: division;
}

.sign-in input {
    align-self: center;
}

.sign-in label {
    place-self: center end;
}

button {
    place-self: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>subgrid</code> 和 <code>display: contents</code> 最终效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24897400a3954c3ca753f968732b770d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可能已经发现了，虽然两者效果差不多，但使用 <code>display: contents</code> 时使用的代码量要多得多，你不得不对使用 <code>grid-area</code> （或 <code>grid-row</code> 和 <code>grid-column</code>）明确指定每个网格项目的位置。而且，随着网格项目数量变多，你需要做的事情也多，相应的代码量也将变得更多。</p><p>就我个人而言，虽然 <code>display: contents</code> 能模拟出 <code>subgrid</code> 的效果，但并不代表着 <code>display: contents</code> 就能和 <code>subgrid</code> 一样。如果不考虑代码的冗余，不考虑其响应式的能力，在 <code>subgrid</code> 还未得到更多浏览器支持的时候，可以考虑用其来模拟。但不建议任何情景之下都采用 <code>display: contents</code> 来模拟 <code>subgrid</code>。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>在这一节课中，主要和大家探讨了 <code>display: contents</code> 是什么，它对文档流会有什么变化，尤其是它的到来会给 CSS Flexbox 和 CSS Grid 布局带来什么样的变化。</p><p>最后简单的归纳一下：</p><ul><li><code>display: contents</code> 将会移除元素的各种外框，只保留元素的内容和其后代元素，相当于元素标签的开始和结束标签被丢失，样式被丢弃（无任何 CSS 样式），但标签的属性和对应的事件不会受影响。</li><li>HTML 中的部分元素，比如可替换元素，部分 SVG 中的元素，设置 <code>display: contents</code> 的表现形为和 <code>display: none</code> 一样。</li><li>在 CSS Flexbox 和 CSS Grid 布局中，在项目（Flex 项目或网格项目）上设置 <code>display: contents</code> 可以让其后代元素上升为项目，避免 Flexbox 与 Flexbox，网格与网格的相互嵌套。</li><li>在 CSS Grid 布局中，可以使用 <code>display: contents</code> 来模拟子网格 <code>subgrid</code> ，但不建议这样做，因为会让你的代码变得更难维护，构建出来的布局效果响应式能力也不强。</li></ul>`,9);function X(A,K){const n=o("ExternalLinkIcon");return t(),c("div",null,[r,e("p",null,[i("CSS 的 "),u,i(" 属性是 W3C CSS 规范中的一个独立模块，"),e("a",v,[i("在该模块的 Level 3 版本中"),d(n)]),i("，它新增了一些属性值，其中就有 "),m,i(" 值。在具体解释 "),b,i(" 是什么之前，我们有必要花点时间了解一下 "),p,i(" 属性会给文档流带来什么样的变化。")]),g,e("p",null,[e("a",f,[i("W3C 规范是这样描述 display: contents 的"),d(n)]),i("：")]),h,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",x,[i("https://codepen.io/airen/full/vYrzMvQ"),d(n)])])]),q,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",y,[i("https://codepen.io/airen/full/OJEoYXP"),d(n)])])]),S,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",k,[i("https://codepen.io/airen/full/vYrzwRB"),d(n)])])]),_,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",C,[i("https://codepen.io/airen/full/mdKGYGe"),d(n)])])]),w,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",j,[i("https://codepen.io/airen/full/NWzLVog"),d(n)])])]),L,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",T,[i("https://codepen.io/airen/full/VwdGovM"),d(n)])])]),M,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",F,[i("https://codepen.io/airen/full/PoadMaL"),d(n)])])]),H,e("blockquote",null,[e("p",null,[i("This value becomes useful if you want to add some element because it makes sense in terms of document semantics, but doesn’t in terms of display. Perhaps you have some content that makes sense marked up as an article, that article is then a flex item in your layout BUT the elements you really would like to be flex items are nested inside that article. Rather than flattening your markup and remove the article element to enable these inner elements to be part of the flex layout, you could remove the boxes generated by article using display: contents. You then get the best of both worlds, semantic markup plus the visual display your design requires. That sounds good to me. —— "),e("a",z,[i("@Rachel Andrew"),d(n)])])]),G,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",W,[i("https://codepen.io/airen/full/wvXYvOx"),d(n)])])]),B,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",D,[i("https://codepen.io/airen/full/oNyaLjN"),d(n)])])]),E,e("p",null,[i("通过前面的课程（《"),e("a",V,[i("16 | 网格布局中的子网格和嵌套网格"),d(n)]),i(" 》和《"),e("a",N,[i("17 | 使用子网格构建 Web 布局"),d(n)]),i(" 》）学习，我们知道，可以将登录表单 "),Y,i(" 和注册信息 "),P,i(" 定义为网格，并且将 "),R,i(" 设置为 "),I,i(" ，这样一来它们就是子网格，可以继承父网格的相关特性，比如网格列轨道尺寸、网格线、网格轨道之间间距等。")]),U,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",J,[i("https://codepen.io/airen/full/BaVqPap"),d(n)])])]),O])}const Z=s(a,[["render",X],["__file","index-21.html.vue"]]);export{Z as default};
