import{_ as s,M as a,p as r,q as c,R as e,t as i,N as l,a1 as d}from"./framework-e8cb8151.js";const t={},o=d(`<h1 id="_20-flexbox-or-grid-如何选择合适的布局" tabindex="-1"><a class="header-anchor" href="#_20-flexbox-or-grid-如何选择合适的布局" aria-hidden="true">#</a> 20-Flexbox or Grid：如何选择合适的布局？</h1><p>在当下，可用于 Web 布局的 CSS 特性有很多，而且这个集合越来越强大。自从 Flexbox 的兼容性越来越完善，它替代了浮动布局，成为主流的布局技术。只不过，近几年来，CSS Grid 快速得到主流浏览器的支持，在圈中不乏有了新的声音，<strong>CSS Grid 布局将替代 Flexbox 布局，而且对于 CSS Flexbox 和 CSS Grid 哪个更好的争执也越来越多</strong>。</p><p>这节课我们就一起来聊聊这个话题，在构建 Web 布局时，什么时候使用 Flexbox 布局，什么时候又应该使用 Grid 布局。我希望通过学习这节课，你在构建 Web 布局时，能更好地做出选择。</p><h2 id="grid-布局会替代-flexbox-布局吗" tabindex="-1"><a class="header-anchor" href="#grid-布局会替代-flexbox-布局吗" aria-hidden="true">#</a> Grid 布局会替代 Flexbox 布局吗？</h2><p>CSS Grid 和 CSS Flexbox 都是当前 Web 布局的两大主流工具。可在万千世界中，任何事情都具有双面性， CSS Flexbox 能让前端开发人员更好地构建 Web 布局或 Web 组件，但也让前端开发人员不时地误解和误用它。许多 Web 布局问题可能用 CSS Grid 更好解决，却被 CSS Flexbox 所取代。</p><p>当然，我们也不能绝对地说，使用 Grid 布局就比 Flexbox 布局更好。</p><p>正如我们将要看到的某些布局，显然知道是用 Flexbox 或 Grid 构建会更适合，但可以想象其他布局，用一个（只用 Flexbox 或 Grid）或两个（同时用 Flexbox 和 Grid）构建，所以你可能有一个组件，其中外层是用 Grid 构建的，里面的东西是用 Flexbox 构建的，反之亦然！它们没有对与错，只要有效即可。</p><p>除此之外，CSS Grid 和 CSS Flexbox 两者之间还有很多相互重叠的特性：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd976e4788a44dc2ad53a9b8f9c4cf16~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>所以说，如果你是一名 Web 开发者，不应该考虑的是 CSS Grid 会替代 CSS Flexbox ，也不应该考虑 CSS Grid 和 CSS Flexbox 两者谁更好。而是要考虑，什么时候使用 CSS Grid，什么时候使用 CSS Flexbox。要掌握这一点，那我们就需要对 CSS Grid 和 CSS Flexbox 有较深的了解，了解它们之间异同，只有这样，你才能做出正确的、适合的选择！</p><h2 id="css-grid-vs-css-flexbox" tabindex="-1"><a class="header-anchor" href="#css-grid-vs-css-flexbox" aria-hidden="true">#</a> CSS Grid vs. CSS Flexbox</h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c758af8012c54113bea4083401b8c30d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>CSS Grid 和 CSS Flexbox 的差异，我们主要可以从三个方面来对比：</p><ul><li>CSS Grid 是二维，CSS Flexbox 是一维；</li><li>CSS Grid 布局优先（外在），CSS Flexbox 内容优先（内在）；</li><li>CSS Grid 用于页面布局（宏观布局），CSS Flexbox 用于组件布局（微观布局）。</li></ul><h3 id="二维-vs-一维" tabindex="-1"><a class="header-anchor" href="#二维-vs-一维" aria-hidden="true">#</a> 二维 vs. 一维</h3><p>CSS Grid 和 CSS Flexbox 最核心的区别就是维度方面：<strong>二维 vs. 一维</strong> 。</p><p><strong>CSS Grid 是二维的。</strong> 即， Grid 是为二维布局而设计的，你可以同时沿着内联轴和块轴排列元素。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb6258bab20944799ba662d2fc519465~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>而 <strong>CSS Flexbox 是一维布局，</strong> 这意味着可以将元素按行或列排列，但不能同时按行或列排列：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f54ec5b1e704cf29788e88e59884721~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>通常情况之下，如果一个布局是二维的（同时需要在行和列排列元素），则使用 CSS Grid 来布局；如果一个布局是一维的（只在行或列排列元素），则使用 CSS Flexbox 来布局。</p><p>当然，Grid 也可以用于一维布局，所以大家在使用 Grid 来布局时不要陷入到这样思维中，即 <strong>构建单维的布局而不能使用 Grid 布局</strong> 。比如下面这个示例，Flexbox 和 Grid 容器中都有多个元素：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;flex&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;1&lt;/div&gt;
    &lt;!-- 省略多个 --&gt;
    &lt;div class=&quot;item&quot;&gt;6&lt;/div&gt;
&lt;/div&gt;

&lt;div class=&quot;grid&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;1&lt;/div&gt;
    &lt;!-- 省略多个 --&gt;
    &lt;div class=&quot;item&quot;&gt;6&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Flex 容器 <code>.flex</code> 上设置了 <code>flex-wrap</code> 的值为 <code>wrap</code> ，并且 Flex 项目的基础主尺寸 <code>flex-basis</code> 为 <code>220px</code> ，同时 Flex 项目能根据 Flex 容器剩余（或不足）空间进行扩展（或收缩）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.flex {
    display: flex;
    flex-wrap: wrap;
}

.flex .item {
    flex: 1 1 220px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cb4d2ba1a354555af832ccb8afad454~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,26),v={href:"https://codepen.io/airen/full/KKeoJoY",target:"_blank",rel:"noopener noreferrer"},u=d(`<p>你可以看到 Flex 项目会因为 Flex 容器空间不足自动换行。换行的 Flex 项目共享了同一行的中主轴（Main Axis）方向的可用空间，并且有可能会和上一行的 Flex 项目无法对齐。这是因为当你允许 Flex 项目换行时，每个新行都变成了一个新的 Flex 容器。空间分布只在同一行主轴方向进行。</p><p>如果你希望换行的元素能与前一行的元素对齐，这时就需要使用二维布局了，即使用 CSS 网格布局。我们使用 CSS 网格布局中的 <strong>RAM</strong> 布局技术，来实现网格项目因网格容器空间不足时自动断行的效果，而且还能做到每一行元素都能对齐：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d74406ae887c4b90a9a5608cef1b2d62~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),m={href:"https://codepen.io/airen/full/KKeoJoY",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,[i("你也可能发现了，虽然 Flexbox 和 Grid 布局都能让元素因容器空间不足自动换行，但两者还是有差异的，"),e("strong",null,"Flexbox 布局总是可以让 Flex 项目在同一行主轴方向均分容器空间，Grid 布局并不总是如此"),i(" 。换句话说，"),e("strong",null,"当容器收缩时，网格项目保持完美对齐，而 Flex 项目则根据可用空间来伸缩它们的尺寸和对齐方式"),i(" ：")],-1),p=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68907bcf6e1c4c0ba01aa7d59e974ce0~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),g={href:"https://codepen.io/airen/full/KKeoJoY",target:"_blank",rel:"noopener noreferrer"},f=d(`<p>既然 CSS 网格可以用于构建一维布局，那么 CSS Flexbox 也可以用来伪造一个看起来像网格的布局，只不过 Flexbox 算法却不知道第二个维度。比如下面这个常见的页面结构布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/735a6838de5e4a248cccee000e38095e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图所示是一个典型的二维布局，使用 CSS Grid 实现该布局效果有着天然的优势：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;grid&quot;&gt;
    &lt;header class=&quot;header&quot;&gt;header&lt;/header&gt;
    &lt;main class=&quot;main&quot;&gt;main&lt;/main&gt;
    &lt;div class=&quot;hero&quot;&gt;hero&lt;/div&gt;
    &lt;nav class=&quot;sidebar&quot;&gt;sidebar&lt;/nav&gt;
    &lt;div class=&quot;extra&quot;&gt;extra&lt;/div&gt;
    &lt;aside class=&quot;aside&quot;&gt;aside&lt;/aside&gt;
    &lt;div class=&quot;ads&quot;&gt;ads&lt;/div&gt;
    &lt;footer class=&quot;footer&quot;&gt;footer&lt;/footer&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr) 220px;
    grid-template-rows: repeat(5, minmax(10vh, auto));
    grid-template-areas: 
        &quot;header   header  header&quot;
        &quot;hero     main    main&quot;
        &quot;sidebar  main    main&quot;
        &quot;sidebar  extra   extra&quot;
        &quot;aside    aside   ads&quot;
        &quot;footer   footer  footer&quot;;
    gap: 1rem;
}

.header {
    grid-area: header;
}

.hero {
    grid-area: hero;
}

.main {
    grid-area: main;
}

.sidebar {
    grid-area: sidebar;
}

.extra {
    grid-area: extra;
}

.aside {
    grid-area: aside;
}

.ads {
    grid-area: ads;
}

.footer {
    grid-area: footer;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80453f3ad2954dd495de3437bf38e1d6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果使用 CSS Flexbox 布局来实现的话，你在 HTML 结构上就需要做相关的处理，添加额外的容器：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;flex&quot;&gt;
    &lt;header class=&quot;header&quot;&gt;header&lt;/header&gt;
    
    &lt;div class=&quot;flex-container&quot;&gt;&lt;!-- 包裹另外两个 flex container --&gt;
        &lt;div class=&quot;flex-container&quot;&gt;&lt;!-- 用来包裹 main 和 extra --&gt;
            &lt;main class=&quot;main&quot;&gt;main&lt;/main&gt;
            &lt;div class=&quot;extra&quot;&gt;extra&lt;/div&gt;
        &lt;/div&gt;
        
        &lt;div class=&quot;flex-container&quot;&gt;&lt;!-- 用来包裹 hero 和 sidebar --&gt;
            &lt;div class=&quot;hero&quot;&gt;hero&lt;/div&gt;
            &lt;nav class=&quot;sidebar&quot;&gt;sidebar&lt;/nav&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div class=&quot;flex-container&quot;&gt;&lt;!-- 用来包裹 aside 和 ads --&gt;
        &lt;aside class=&quot;aside&quot;&gt;aside&lt;/aside&gt;
        &lt;div class=&quot;ads&quot;&gt;ads&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;footer class=&quot;footer&quot;&gt;footer&lt;/footer&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 CSS Flexbox 布局，需要创建多个 Flex 容器，还需要使用 <code>flex-direction: column</code> 控制 Flex 项目的排列方向，并且通过 <code>flex</code> 相关属性控制 Flex 项目的伸缩性等。因此，CSS 代码就会冗余很多：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flex &gt; .flex-container {
  display: flex;
  gap: 1rem;
}

.flex-container &gt; .flex-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.flex-container &gt; .flex-container:nth-of-type(1) {
  flex: 1 1 0%;
  min-width: 0;
  order: 2;
}

.flex-container &gt; .flex-container:nth-of-type(2) {
  flex-basis: 220px;
  flex-shrink: 0;
}

.flex .aside {
  flex: 1 1 0%;
  min-width: 0;
}

.flex .ads {
  flex-basis: 220px;
  flex-shrink: 0;
}

.flex .sidebar,
.flex .main {
  min-height: 30vh;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3968bb5046ce48adb6cbd291a569a8e7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>最终实现的布局效果是相似的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/857f5b58fd1842de873538031366fa7c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),x={href:"https://codepen.io/airen/full/dyKmLxG",target:"_blank",rel:"noopener noreferrer"},S=e("p",null,"从上面这两个示例，我们可以得出一个简单的结论。当你面对选择 CSS Flexbox 还是 CSS Grid 来构建 Web 布局时，你可以尝试着问自己：",-1),h=e("ul",null,[e("li",null,"只需要按行或列控制布局？那就选择 CSS Flexbox ；"),e("li",null,"同时需要按行或列控制布局？那就选择 CSS Grid 。")],-1),q=e("h3",{id:"布局优先-外在-vs-内容优先-内在",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#布局优先-外在-vs-内容优先-内在","aria-hidden":"true"},"#"),i(" 布局优先（外在）vs. 内容优先（内在）")],-1),C=e("p",null,[i("CSS Grid 和 CSS Flexbox 除了一维和二维的区别之外，还有另一个区别："),e("strong",null,"布局优先（外在）vs. 内容优先（内在） 。")],-1),_=e("strong",null,"Flexbox 会监听它的内容，所以它是内容优先（内在）",-1),k={href:"https://www.w3.org/TR/css-flexbox-1/#overview",target:"_blank",rel:"noopener noreferrer"},F=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8b822b4916d47f3b5c0e2e4cf463713~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),y={href:"https://www.w3.org/TR/css-flexbox-1/#overview",target:"_blank",rel:"noopener noreferrer"},j=d(`<p>大致意思是说，“作为回报，它获得了简单而强大的工具，以 Web 应用程序和复杂的 Web 页面经常需要的方式分配空间和对齐内容”。换句话说，Flexbox 会对浏览器说：</p><blockquote><p>嘿，这是我的内容，只要找出在给定空间的基础上，以最好的方式水平（或垂直）分布它的最佳方式。</p></blockquote><p>使用 CSS Flexbox 布局的理想情形是你有一组元素，希望它们：</p><ul><li>能平均地分布在 Flex 容器中；</li><li>内容的大小决定每个元素占据多少空间；</li><li>如果元素换到了新的一行，它们会根据新行的可用空间决定它们自己的大小。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/791460baba704307a47270a1d50bb42c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>CSS Grid 则是从布局入手。它提供了一种机制，你可以根据你预想的大小和结构来创建一个网格，然后再把元素放入网格中（放到一个网格单元格，或一个网格区域中），或者元素自动放置到网格中（根据网格项目自动放置算法放置）。</p><p>不过，CSS Grid 无论如何，都将坚持它的行和列，所以它是布局优先（一种外在的行为）。当然，如果你愿意，你也可以让布局保持完全相同，尽管你可能不希望这样。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bfb9fb1d1e14a4a975422dfa1839010~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也就是说，当你在抉择使用 CSS Flexbox 还是 CSS Grid 来布局时，你还可以问自己：</p><ul><li>脑海中有布局结构了？那请选择 CSS Grid；</li><li>不用担心布局，只想让所有东西都适合？那请选择 CSS Flexbox。</li></ul><h3 id="页面布局-宏观布局-vs-组件布局-微观布局" tabindex="-1"><a class="header-anchor" href="#页面布局-宏观布局-vs-组件布局-微观布局" aria-hidden="true">#</a> 页面布局（宏观布局） vs. 组件布局（微观布局）</h3><p>CSS Grid 和 CSS Flexbox 还有一个明显的差异就是：<strong>CSS Grid 用于页面布局，它是一种宏观布局；CSS Flexbox 用于组件布局，它是一种微观布局</strong> 。这可能是最直观、最易于描述 CSS Grid 和 CSS Flexbox 差异的了。</p><p>事实上，在构建整个页面布局时，我不会对使用哪种技术有任何疑问，也不会过于强调哪种技术最好，我更强调的应该根据场景和需求选择最适合的技术。比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ca061278174015997d8bf7b51e67f1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就上图展示的 Web 页面布局效果而言，在 CSS Grid 出现之前，我们大多数人都是使用 CSS Flexbox 来完成的：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;body&gt;
    &lt;header class=&quot;header&quot;&gt;header&lt;/header&gt;
    &lt;section class=&quot;hero&quot;&gt;hero&lt;/section&gt;
    &lt;main class=&quot;main&quot;&gt;content&lt;/main&gt;
    &lt;div class=&quot;form&quot;&gt;sign up&lt;/div&gt;
    &lt;article class=&quot;feature feature--books&quot;&gt;feature books&lt;/article&gt;
    &lt;article class=&quot;feature feature--users&quot;&gt;feature users&lt;/article&gt;
    &lt;article class=&quot;feature feature--story&quot;&gt;feature story&lt;/article&gt;
    &lt;footer class=&quot;footer&quot;&gt;footer&lt;/footer&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.main {
    flex: 1 1 50vh;
}

/* Tablet */
@media only screen and (min-width: 401px) and (max-width: 960px) {
    body {
        flex-direction: row;
    }

    body &gt; *:not(.form, .feature) {
        width: 100%;
    }

    .form,
    .feature {
        width: 50%;
    }

    .main {
     flex: none;
    }
}

/* Desktop */
@media only screen and (min-width: 961px) {
    body {
        flex-direction: row;
    }

    body &gt; *:not(.form, .feature) {
        width: 100%;
    }

    .feature {
        width: calc(100% / 3);
    }

    .form {
        width: 100%;
        order: 1;
    }

    .main {
        flex: none;
        order: 2;
    }
    
    .footer {
        order: 3;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a47d50b7b79a4a48922fd45bf9a740e0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),G={href:"https://codepen.io/airen/full/vYrjJEw",target:"_blank",rel:"noopener noreferrer"},w=d(`<p>正如示例代码所示，使用 CSS Flexbox 布局技术虽然能完成所需要 Web 页面布局效果，但是使用 CSS Flexbox 创建布局还是需要做一些计算，尤其是构建类似网格类的布局，可以说是从来就没有真正“弹性”的感觉，而且总是会遇到一些令人头疼的问题。</p><p>另外，即使是使用 CSS Flexbox 可以实现所需要的页面布局，也往往需要需要牺牲 HTML 结构的简洁性，添加额外的容器，使用多个 Flexbox。</p><p>另一方面， CSS Grid 就是为此而生的，比如上面的页面布局，使用 CSS Grid 要更容易地多：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: grid;
    grid-template-rows: repeat(2, auto) minmax(0, 1fr) repeat(5, auto);
    grid-template-areas:
        &quot;header&quot;
        &quot;hero&quot;
        &quot;content&quot;
        &quot;signup&quot;
        &quot;books&quot;
        &quot;users&quot;
        &quot;story&quot;
        &quot;footer&quot;;
}

.header {
    grid-area: header;
}

.hero {
    grid-area: hero;
}

.main {
    grid-area: content;
}

.form {
    grid-area: signup;
}

.feature--books {
    grid-area: books;
}

.feature--users {
    grid-area: users;
}

.feature--story {
    grid-area: story;
}

.footer {
    grid-area: footer;
}

/* Tablet */
@media only screen and (min-width: 401px) and (max-width: 960px) {
    body {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, auto) minmax(0, 1fr) repeat(3, auto);
        grid-template-areas:
          &quot;header   header&quot;
          &quot;hero     hero&quot;
          &quot;content  content&quot;
          &quot;signup   books&quot;
          &quot;users    story&quot;
          &quot;footer   footer&quot;;
    }
}

/* Desktop */
@media only screen and (min-width: 961px) {
    body {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(4, auto) minmax(0, 1fr) auto;
        grid-template-areas:
          &quot;header   header  header&quot;
          &quot;hero     hero    hero&quot;
          &quot;books    users   story&quot;
          &quot;signup   signup  signup&quot;
          &quot;content  content content&quot;
          &quot;footer   footer  footer&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab8599da3eb44c268fbb3ff26a980212~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),z={href:"https://codepen.io/airen/full/WNyyXQL",target:"_blank",rel:"noopener noreferrer"},L=d(`<p>对于大多数 Web 开发者，一说到 Web 布局就通常会想到是页面级的设计。但是页面中的小组件可以有自己独立的布局。</p><p>理想情况下，这些小组件无论在页面上的位置如何，小组件布局都将自动调整。在某些情况下，你可能不知道组件将被放置在主内容列或侧边栏中，或两者都放置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/658cd63736224a7395ad20e8984ee691~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在不确定一个组件会在哪里放置的情况下，你需要确保组件可以随着环境调整布局。依旧拿卡片组件为例，你可能需要为同一个卡片小组件提供不同的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b3f8fde8e8e46889eae58fe90e78045~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>简单地说，在不确定一个组件会在哪里结束的情况下，你需要确保组件可以根据其容器进行自我调整。在 CSS 的众多布局技术中，CSS Flexbox 很适用于这些小组件的布局。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;card&quot;&gt; 
    &lt;img src=&quot;https://picsum.photos/2568/600?random=1&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; class=&quot;card__thumbnail&quot; /&gt; 
    &lt;div class=&quot;card__badge&quot;&gt;Must Try&lt;/div&gt; 
    &lt;div class=&quot;card__content&quot;&gt;
        &lt;h3 class=&quot;card__title&quot;&gt;Best Brownies in Town&lt;/h3&gt; 
        &lt;p class=&quot;card__describe&quot;&gt;High quality ingredients and best in-class chef. Light, tender, and easy to make~&lt;/p&gt; 
        &lt;button class=&quot;card__button&quot;&gt;Order now&lt;/button&gt; 
    &lt;/div&gt;
&lt;/div&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 1rem;
}

.card__badge {
    position: absolute;
    top: 0;
    left: 0;
}

.card__button {
    margin-left: auto;
}

.card__content {
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media only screen and (min-width: 768px) {
    .card {
        flex-direction: row;
    }

    .card__thumbnail {
        max-width: 300px;
        border-radius: 24px 0 0 24px;
    }

    .card__content {
        flex: 1;
        padding: 20px 20px 20px 0;
    }

    .card__button {
        margin-top: auto;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cbf9bbb2c0149bba353265063a05a2b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),M={href:"https://codepen.io/airen/full/JjZZOBy",target:"_blank",rel:"noopener noreferrer"},T=d(`<p>正如你所看到的，使用 CSS Flexbox 和 CSS 媒体查询，可以让卡片在浏览器不同的视窗宽度下有不同的布局。也不难发现，使用 CSS Flexbox 布局，不得不牺牲 HTML 的结构，使用 <code>div.card__content</code> 来包裹 <code>.card__title</code> 、<code>.card__describe</code> 和 <code>.card__button</code> 。</p><p>事实证明，在创建小组件时，CSS Grid 也很棒，而且还可以避免 HTML 结构的冗余。比如上面示例的卡片组件，如果使用 CSS Grid 布局，就可以将 <code>.card__content</code> 这个容器删除，让结构变得更扁平：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;card&quot;&gt; 
    &lt;img src=&quot;https://picsum.photos/2568/600?random=1&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; class=&quot;card__thumbnail&quot; /&gt; 
    &lt;div class=&quot;card__badge&quot;&gt;Must Try&lt;/div&gt; 
    &lt;h3 class=&quot;card__title&quot;&gt;Best Brownies in Town&lt;/h3&gt; 
    &lt;p class=&quot;card__describe&quot;&gt;High quality ingredients and best in-class chef. Light, tender, and easy to make~&lt;/p&gt; 
    &lt;button class=&quot;card__button&quot;&gt;Order now&lt;/button&gt; 
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
    display: grid;
    grid-template-areas:
        &quot;thumbnail&quot;
        &quot;title&quot;
        &quot;describe&quot;
        &quot;button&quot;;
    gap: 1rem;
}

.card__title,
.card__describe {
    padding: 0 20px;
}

.card__button {
    margin: 0 20px 20px auto;
    grid-area: button;
}

.card__thumbnail {
    grid-area: thumbnail;
}

.card__title {
    grid-area: title;
}

.card__badge {
    grid-area: thumbnail;
    z-index: 2;
}

.card__describe {
    grid-area: describe;
}

@media only screen and (min-width: 768px) {
    .card {
        grid-template-columns: fit-content(300px) minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto;
        grid-template-areas:
            &quot;thumbnail  title&quot;
            &quot;thumbnail  describe&quot;
            &quot;thumbnail  button&quot;;
    }

    .card__thumbnail {
        border-radius: 24px 0 0 24px;
    }

    .card__title {
        padding: 20px 20px 0 0;
    }

    .card__describe {
        padding: 0 20px 0 0;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4944314ec00a41bbb18575a31f2b2de1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),H={href:"https://codepen.io/airen/full/bGKKaGG",target:"_blank",rel:"noopener noreferrer"},W=d(`<p>这两个示例还是基于媒体查询来调整小组件布局。虽然看上去没有问题，但这小组件同时在页面中的不同位置时，媒体查询还是无法达到预期效果。不过，随着 CSS 容器查询的实现，可以让小组件布局适应其容器变得更容易。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card__container {
    container-type: inline-size;
}

.card {
    display: grid;
    grid-template-areas:
        &quot;thumbnail&quot;
        &quot;title&quot;
        &quot;describe&quot;
        &quot;button&quot;;
    gap: 1rem;
}

.card__title,
.card__describe {
    padding: 0 20px;
}

.card__button {
    margin: 0 20px 20px auto;
    grid-area: button;
}

.card__thumbnail {
    grid-area: thumbnail;
}

.card__title {
    grid-area: title;
}

.card__badge {
    grid-area: thumbnail;
    z-index: 2;
}

.card__describe {
    grid-area: describe;
}

@container (width &gt; 400px) {
    .card {
        grid-template-columns: fit-content(300px) minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto;
        grid-template-areas:
            &quot;thumbnail  title&quot;
            &quot;thumbnail  describe&quot;
            &quot;thumbnail  button&quot;;
    }

    .card__thumbnail {
        border-radius: 24px 0 0 24px;
    }

    .card__title {
        padding: 20px 20px 0 0;
    }

    .card__describe {
        padding: 0 20px 0 0;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d511f3d440d49c69b51442c6d5c2ada~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),K={href:"https://codepen.io/airen/full/oNyypLP",target:"_blank",rel:"noopener noreferrer"},D=d('<h3 id="对齐方式" tabindex="-1"><a class="header-anchor" href="#对齐方式" aria-hidden="true">#</a> 对齐方式</h3><p>对于很多人来说，CSS Flexbox 除了可以让 Flex 项目能根据容器主尺寸进行伸缩扩展之外，还有一个，就是强大的对齐能力。这让 Web 开发者构建<strong>水平垂直居中</strong> 、<strong>等高</strong>等布局变得很容易。当然，CSS Grid 也拥有强大的对齐能力，只不过，CSS Grid 和 CSS Flexbox 的对齐方式略有差异：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3d91e407b5a4eb48c2a938f30888c01~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在 CSS Flexbox 中，其对齐方式主要分为：</p><ul><li><code>justify-content</code> 可以控制所有 Flex 项目在 Flex 容器主轴方向的对齐；</li><li><code>align-items</code> 可以控制所有 Flex 项目在 Flex 容器侧轴方向的对齐；</li><li><code>align-content</code> 可以控制 Flex 行在 Flex 容器侧轴方向的对齐，前提是 <code>flex-wrap</code> 属性的值是 <code>wrap</code> 或 <code>wrap-reverse</code>；</li><li><code>algin-self</code> 可以控制单个 Flex 项目在 Flex 容器侧轴方向的对齐；</li><li>由于 Flexbox 是一维布局，它不支持 <code>justify-items</code> 和 <code>justify-self</code> 两个属性。</li></ul><p>CSS Grid 中，对齐方式有些与 Flexbox 对齐方式是相似的，但其要分为三种使用情景：</p><ul><li><code>place-content</code> （它的子属性 <code>align-content</code> 和 <code>justify-content</code>）控制网格轨道在网格容器的块轴和内联轴方向的对齐；</li><li><code>place-items</code> （它的子属性 <code>align-items</code> 和 <code>justify-items</code> ）控制所有网格项目在网格区域的块轴和内联轴方向的对齐；</li><li><code>place-self</code> （它的子属性 <code>align-self</code> 和 <code>justify-self</code> ）控制单个网格项目在网格区域的块轴和内联轴方向的对齐。</li></ul><p>不管是 Flexbox 布局中的对齐还是网格布局中的对齐，它们都受 CSS 的书写模式或阅读模式的影响！</p><p>另外，CSS Grid 和 CSS Flexbox 中的项目（网格项目和 Flex 项目）都可以显式设置 <code>margin</code> 的值来达到单个网格项目对齐。你可以在这两种布局技术中，设置网格项目或 Flex 项目的 <code>margin-inline</code> 或 <code>margin-block</code> 值为 <code>auto</code> ，实现水平居中或垂直居中：</p><ul><li><code>magin-inline: auto</code> 可以实现水平居中；</li><li><code>margin-block: auto</code> 可以实现垂直居中。</li></ul><h3 id="z-轴上的层叠" tabindex="-1"><a class="header-anchor" href="#z-轴上的层叠" aria-hidden="true">#</a> <code>z</code> 轴上的层叠</h3><p>了解 CSS 的 Web 开发者，都知道我们可以在 <code>position</code> 属性值为非 <code>static</code> 的元素上设置 <code>z-index</code> 属性值来控制元素在 <code>z</code> 轴上的层级。那么，CSS Flexbox 和 CSS Grid 布局时，Flex 项目和网格项目都可以通过 <code>z-index</code> 的值来控制它们在 <code>z</code> 轴上的层级。</p><p>不同的是，CSS Grid 布局实现层叠布局要比 CSS Flexbox 更适合。因为：</p><ul><li>在 CSS Flexbox 布局中，要实现多个 Flex 项目相互交叉且在 <code>z</code> 轴上层叠的布局，依旧要通过 CSS 的定位（<code>position</code>）布局来实现；</li><li>在 CSS Grid 布局中，除了可以使用定位（<code>position</code>）布局实现网格项目相互交叉且在 <code>z</code> 轴上层叠布局之外，网格项目还可以使用 <code>grid-column</code> 、<code>grid-row</code> 或 <code>grid-area</code> 来实现，并且要比定位布局更灵活。</li></ul><p>就拿下面这个示例来说：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f16ef6be429487a972fa41b9a2a3b50~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',16),N={href:"https://codepen.io/airen/full/zYaaQLV",target:"_blank",rel:"noopener noreferrer"},B=d(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid { 
    grid-template-columns: 1fr repeat(10, minmax(3rem, 1fr)) 1fr; 
    grid-template-rows: minmax(3rem, auto) 3rem auto 6rem auto; 
} 

.grid::after { 
    grid-column: 1 / -3; 
    grid-row: 3; 
} 

h2 { 
    grid-column: 1 / span 8; 
    grid-row: 1 / span 2; 
} 

.grid__img { 
    grid-column: 6 / -1; 
    grid-row: 2 / span 3; 
 } 
 
 blockquote { 
     grid-column: 3 / span 4; 
     grid-row: 4 / span 2; 
} 

p { 
    grid-column: 7 / span 5; 
    grid-row: 5 / span 1; 
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e06c2238149447c5943724c094460a75~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可能已经发现了，虽然有多个网格项目重叠，但这里并没有定位（<code>position</code>）相关属性的身影。在 Grid 布局，我们可以直接使用 <code>grid-column</code> 和 <code>grid-row</code> 属性放置网格项目（指定网格线名称，将网格项目放在指定的位置）上。</p><p>这种布局看上去似乎很复杂，灵活性不够。其实不然，只要我们使用灵活的网格轨道（<code>grid-template-columns</code> 和 <code>grid-template-rows</code> 定义网格轨道），那么我们的布局仍然会适应内容（比如有更长的标题、段落等）。</p><p>除了能灵活适配更多的内容之外，还可以使用 <code>grid-column</code> 和 <code>grid-row</code> 移动网格项目，使其在不同的位置呈现。简单地说，可以在该组件的基础上，得到更多的组件变体。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c6236fc2d2d4388a1d324587ab3ab33~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),Y={href:"https://codepen.io/airen/full/vYrrwvg",target:"_blank",rel:"noopener noreferrer"},E=d(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid {
    display: grid;
    gap: var(--pad);
}

.grid__img {
    aspect-ratio: 16 / 9;
    align-self: center;
}

@media (min-width: 45em) {
    .grid {
        grid-template-columns: 1fr repeat(10, minmax(0, 6rem)) 1fr;
        grid-template-rows: 1fr  minmax(3rem, auto)  1fr;
    }

    h2 {
        grid-column: 2 / span 6;
        grid-row: 2;
    }

    .grid__img {
        grid-column: 7 / -1;
        grid-row: 1 / span 3;
    }

    p {
        grid-column: 2 / span 4;
        grid-row: 3;
    }

    .grid:nth-child(even) h2 {
        grid-column: span 6 / -2;
    }

    .grid:nth-child(even) p {
        grid-column: span 4 / -2;
    }

    .grid:nth-child(2n) .grid__img {
        grid-column: 1 / span 6;
    }

    .grid:nth-child(3n) .grid__img {
        grid-column: span 6 / -2;
    }

    .grid:nth-child(4n) .grid__img {
        grid-column: 2 / span 6;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，这里并没有说 CSS Flexbox 不能实现类似上面这种层叠布局，只是说 CSS Grid 更适合。在不使用 CSS Grid 布局技术，要实现该示例的效果，你将付出的代价会大得多，即使实现了，也很难达到 CSS Grid 实现的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28399ca35e834ab59dccfce7f2fad099~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="项目的伸缩扩展" tabindex="-1"><a class="header-anchor" href="#项目的伸缩扩展" aria-hidden="true">#</a> 项目的伸缩扩展</h3><p>CSS Flexbox 和 CSS Grid 布局中，Flex 容器和网格容器的直接子元素都被称为<strong>项目</strong> （Flex 项目和网格项目），它们都具备伸缩扩展的特性。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/681b98a934f346d1ba9d7b8bab848a54~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li>CSS Flexbox 布局中，在 Flex 项目上设置 <code>flex</code> 属性值为 <code>1 1 0%</code> （通常大部分开发者直接设置为 <code>1</code>），Flex 项目将根据 Flex 容器的剩余空间或不足空间进行收缩扩展；</li><li>CSS Grid 布局中，是在网格容器的 <code>grid-template-rows</code> 或 <code>grid-template-columns</code> 属性上设置 <code>fr</code> 单位的值（设置网格轨道尺寸），网格项目将根据网格容器的可用空间来进行收缩扩展。</li></ul><p>如果你要实现一个均分列（等宽）布局。要是使用 CSS Flexbox 布局，可以在 Flex 项目上设置 <code>flex</code> 和 <code>min-width</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.flex-container {
    display: flex;
}

.flex-item {
    flex: 1 1 0%;
    min-width: 0;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要是使用 CSS Grid 布局，需要将网格容器的 <code>grid-template-columns</code> 设置为：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr)); 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意，示例代码中 <code>repeat()</code> 函数中的 <code>4</code> 是指你想要均分的列数。这里是将网格容器平均分为四列！</p></blockquote><p>如果你不将 <code>fr</code> 与 <code>minmax()</code> 结合使用，则需要网格项目上显式设置 <code>min-width</code> 的值为 <code>0</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.grid-item {
    min-width: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，CSS 网格布局中，<code>fr</code> 与 <code>minmax()</code> 函数结合（一般是 <code>minmax(0, 1fr)</code>）使用时，<code>fr</code> 单位值可以让网格项目与 CSS Flexbox 中的 Flex 项目上设置 <code>flex</code> 属性达到非常相似的结果。只不过，CSS 网格仍然创建的是一个二维布局。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b1a14bcdc594f39a60bd7fed1121189~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),O={href:"https://codepen.io/airen/full/bGKKPrO",target:"_blank",rel:"noopener noreferrer"},J=d('<p>当然，就等宽布局来说，上面这两种方案都是一样的。但要是在 Flex 容器中显示式设置 <code>flex-wrap</code> 属性的值为 <code>wrap</code> 时，它们之间还是有差异的。</p><blockquote><p>注意，在使用 CSS Flexbox 布局时，我个人建议在 Flex 容器上显式设置 <code>flex-wrap</code> 的值为 <code>wrap</code> ，除非你明确地知道不需要断行。这样做的好处是，你编写的 CSS 更健壮，构建的 Web 布局不易于被打破！</p></blockquote><p>当你拖拽改变浏览器视窗大小时，你会发现：</p><ul><li>CSS Flexbox 布局可以根据可用空间适当地调整行中元素（Flex 项目）个数，当有足够的空间时，全部的六个 Flex 项目在同一行中展示，当容器变的过窄时，每行则可能只展示一个 Flex 项目；</li><li>CSS Grid 则不同，始终保持五列网格列轨道。虽然网格列轨道会自动拉伸，但始终会保持我们定义网格时的列轨道数量，在这个示例是六列。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/257e799c91704c79a254820a8fc2809e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',5),V={href:"https://codepen.io/airen/full/yLEEdxN",target:"_blank",rel:"noopener noreferrer"},X=d(`<h3 id="排列方向与换行" tabindex="-1"><a class="header-anchor" href="#排列方向与换行" aria-hidden="true">#</a> 排列方向与换行</h3><p>通过前面课程的学习，我们知道了，在任何一个元素上显式设置 <code>display</code> 的值为 <code>grid</code> （或 <code>inline-grid</code>）、<code>flex</code> （或 <code>inline-flex</code>），就定义了一个网格容器和 Flex 容器，它们的直接子元素就都成了网格项目或 Flex 项目。但 CSS Grid 和 CSS Flexbox 在声明网格格式化上下文和 Flexbox 格式化上下文时，其表现形式还是略有差异的：</p><ul><li>CSS Flexbox 布局中，不管是 <code>flex</code> 还是 <code>inline-flex</code>，默认情况下，都会让所有 Flex 项目排在一行或一列 ；</li><li>CSS Grid 布局中，不管是 <code>grid</code> 还是 <code>inline-grid</code>，默认情况下，都不会改变 Grid 项目的排列方式，将按照 HTML 结构中的源顺序排列，除非你在声明网格容器的时候，显式使用 <code>grid-template-*</code>（比如，<code>grid-template-columns</code>、<code>grid-template-rows</code> ）改变其排列方式；</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f108c3ea67354b889be6660ec2794994~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>不过，不管是 CSS Grid 布局还是 CSS Flexbox 布局，如果你需要，可以显式改变排列方向。</p><ul><li>在 CSS Flexbox 中，可以通过 <code>flex-direction</code> 属性来改变 Flex 项目在 Flex 容器中排列方式；</li><li>在 CSS Grid 中，可以通过 <code>grid-auto-flow</code> 属性来改变网格项目在网格容器中默认的排列方式。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a0c5ad5b86f4390890db8ebcadc99dd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>不同的是，CSS Grid 布局还可以使用 <code>grid-template-rows</code> 或 <code>grid-template-columns</code> 来改变网格排列。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid-container {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr) 220px;
    grid-template-rows: repeat(3, 100px);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，还可以在网格项目上使用 <code>grid-row</code> 、<code>grid-column</code> 或 <code>grid-area</code> 来改变网格项目的默认排列位置。这是在 CSS Flexbox 布局中做不到的。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ea35cf5c99d4d4282536aef5aab9df2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>刚才有提到过，使用 CSS Flexbox 构建布局时，建议在 Flex 容器上显式设置 <code>flex-wrap</code> 的值为 <code>wrap</code> 。这样做的好处是，当 Flex 容器没有足够多的空间时，Flex 项目会自动换行（或列），不至于让 Flex 项目溢出 Flex 容器，打破 Web 布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eff76cdc0404d0d98f6a32b746b4e6e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>而在 CSS Grid 布局中要实现自动换行（列），就需要采用网格布局中的 RAM 布局技术，即 <code>repeat()</code> 、<code>minmax()</code> 函数结合起来，并且指定列（行）网格轨道数量时，不能使用具体的数值，要使用 <code>auto-fit</code> 或 <code>auto-fill</code> 关键词：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/074bd93a9c6c416a92c09b5bda09b25f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然都能实现自动换行（列），但它们还是有差异的。</p><ul><li>在 CSS Flexbox 布局中，如果 Flex 项目具有伸缩扩展性（即 <code>flex: 1</code>），最后一行 Flex 项目有可能会填充整个 Flex 容器，比如最后一行只有一个 Flex 项目；</li><li>在 CSS Grid 布局中，所有网格项目都会的大小都会由 <code>minmax(MIN,MAX)</code> 函数来决定，最小值是 <code>MIN</code> ，最大值是 <code>MAX</code> （一般是 <code>1fr</code>）。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/194c647811d04fc68f80bc86cd55207f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* CSS Flexobox */
.flex {
    --columns: 3;
    --gap: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
}

.flex .item {
    flex: 1 1 calc((100% - (var(--columns) - 1) * var(--gap)) / var(--columns));
}

/* CSS Grid */
.grid {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>CSS Flexbox 效果</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/976ed0aa3eb54160ad77a95bdf6035be~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><strong>CSS Grid 效果</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e8846a731924d12930fc32417be14de~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,23),R={href:"https://codepen.io/airen/full/yLEqBzq",target:"_blank",rel:"noopener noreferrer"},A=d(`<h3 id="改变顺序和间距" tabindex="-1"><a class="header-anchor" href="#改变顺序和间距" aria-hidden="true">#</a> 改变顺序和间距</h3><p>前面所列的几条是 CSS Flexbox 和 CSS Grid 有相似与差异之处，但它们有几个特性是完全一样的。比如改变项目的顺序。</p><p>你可以在项目（网格项目或 Flex 项目）上显式设置 <code>order</code> 的值改变默认的排列位置：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item {
    order: 1; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code>order</code> 的默认值是 <code>0</code> ，默认排列顺序是以出现在 HTML 文档的顺序排序。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3103734ca4bb414393470a53a1fa6b39~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),P={href:"https://codepen.io/airen/full/BaVPBXr",target:"_blank",rel:"noopener noreferrer"},Q=d(`<p>另一个相同的特性是 <code>gap</code> ，在 Flex 容器和网格容器上设置 <code>gap</code> （或其子属性 <code>column-gap</code> 和 <code>row-gap</code>）属性，视觉表现结果是一致的，不同的是：</p><ul><li>CSS Flexbox 是用来控制 Flex 项目之间的间距；</li><li>CSS Grid 是用来控制网格轨道之间的间距。</li></ul><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    gap: 1rem;
    
    /* 等同于 */
    row-gap: 1rem;
    column-gap: 1rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da865bae44ad4db1a170ffb0035fbb61~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),I={href:"https://codepen.io/airen/full/dyKjyMv",target:"_blank",rel:"noopener noreferrer"},Z=d(`<p>有关于 CSS Flexbox 和 CSS Grid 主要的差异就介绍到这了，这里附上它们之间特性的对比图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b280751f69943b6946059e2e11bad88~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>猛击图片，查看大图</strong> ！</p></blockquote><h2 id="什么时候使用-css-grid-和-css-flexbox" tabindex="-1"><a class="header-anchor" href="#什么时候使用-css-grid-和-css-flexbox" aria-hidden="true">#</a> 什么时候使用 CSS Grid 和 CSS Flexbox?</h2><p>我猜到这里，你对 CSS Grid 和 CSS Flexbox 两者之间的异同有了更进一步的了解。但对于很多 Web 开发者，尤其是刚接触 CSS 的开发者，在很多时候，面对选择还是有一定的困惑。我觉得，在面对选择的时候，你可以尝试着按下面这样来做选择。</p><p>当出现以下情况时，你应该考虑选择使用 CSS Flexbox：</p><ul><li>当你需要实现一个小的布局时，可以考虑 Flexbox；</li><li>当你需要对齐元素时，Flexbox 非常适合；</li><li>当你需要一个内容优先的设计，尤其是你不知道你的内容看起来是什么样子的，那么 Flexbox 是完美的选择；</li><li>当你需要实现的布局就是一个一维布局，可以考虑 Flexbox。</li></ul><p>当出现以下情况时，你应该考虑选择使用 CSS Grid：</p><ul><li>当你需要实现一个复杂的设计，可以考虑 Grid；</li><li>当你需要一个布局优先时，尤其是在你的脑海中已经有了布局设计结构，使用 CSS Grid 更容易构建；</li><li>当你的布局上元素相互交叉和层叠较多时，CSS Grid 更完美，更简单；</li><li>当你需要实现的布局是一个二维布局，那最好是选择 CSS Grid。</li></ul><p>或者你也可以这样相互比较之后再做抉择：</p><ul><li>如果布局比内容更重要，请选择 CSS Grid；如果内容比布局更重要，请选择 CSS Flexbox；</li><li>如果要创建一个严格对齐的，基于网格的布局，无论元素包含什么内容都保持不变；那么 CSS Grid 更适合；</li><li>如果你想创建一个更灵活的布局，尤其是在你不知道输出的内容是什么，有多少种情况之下，那么 CSS Flexbox 更适合。</li></ul><p>不管怎么选择，在决定使用哪一个之前，请不要忘记：</p><blockquote><p><strong>CSS Grid 是二维布局，布局先行（外在）；CSS Flexbox 是一维布局，内容先行（内在）</strong></p></blockquote><p>另外，不管怎么选择，二者都不是相互替代的关系，它们是一种共存的关系。CSS Grid 可以完成 CSS Flexbox 可以做的大部分事情，而且多得多。所以我更倾向于：</p><p><strong>除了那些使用 CSS Flexbox 更好处理的少数情况之外，大多都选择 CSS Grid</strong> !</p><p>如果基于上面这些列表项，你还是无法做出选择的话，那么我们一起来看几个 Web 布局相关的示例，希望你能从这几个示例中找到你想要的答案，在未来构建 Web 布局时，你能做出正确的选择。</p><p>先来看一个 Web 中最常见的小组件——按钮组件：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac8a3cdef4f2475e939f8cc960c82110~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这是一个再普通不过的按钮组件了。大家肯定会说，这有啥好思考的呢？不管是 Grid 还是 Flexbox ，这不都是分分钟的事情吗？如果仅考虑视觉上的展示，的确是如此。使用 Grid 和 Flexbox 都可以：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;button&gt; Sign up &lt;svg&gt;&lt;/svg&gt; &lt;/button&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关键CSS代码：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.button--flex { 
    display: inline-flex; 
    flex-wrap: wrap; 
} 

.button--grid { 
    display: inline-grid; 
    grid-template-columns: 1fr auto; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2598a63f9a924e478bbcc6efe3711861~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,23),U={href:"https://codepen.io/airen/full/GRGByzK",target:"_blank",rel:"noopener noreferrer"},$=d(`<p>正如你所看到的，使用 Flexbox 和 Grid 实现的按钮视觉效果都是一样的。但是，该按钮组件要是放置在某个容器中，且这个容器空间较小时，希望按钮能自动换行，而不是溢出容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4822b04e828b4c34b976ac8ef4eff889~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图左侧是我们期望的效果，右侧是我们不想要的效果！ 在这样的交互或场景下，使用 Flexbox 来构建组件布局要比 Grid 灵活的多。</p><p>我们只需要在 Flexbox 容器上显式设置 <code>flex-wrap</code> 的值为 <code>wrap</code> 即可，使用 Grid 来构建组件布局的话，要麻烦得多，你不得不去做一些额外的工作，比如根据媒体查询或容器查询来改变 <code>grid-template-columns</code> 的值或者显式调整网格项目（<code>svg</code>）的放置位置。</p><p>事实上，Flexbox 本质上做的事就是沿着不同的线条包装元素，每个元素只关心在给定其不同的宽度时在可用空间中分配它的元素，而与上下线条没有任何关系。所以，如果我不追求完美对齐的行和列的网格外观，我会选择 Flexbox。</p><p>此外，Flexbox 可以让你毫不费力地调整子元素的大小，这也是使用 Grid 更不适合之处，比如上面所演示的按钮组件。而且，像这样的场景到处可见：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19d62f97a9e94d86b16b16fcb817dd12~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外一个我更愿意使用 Flexbox 而不是 Grid 的原因是，如果我想创建一个设计，两个或多个元素水平对齐，其中一个沿着可用空间伸展，而其他元素保持其自然宽度。比如下图这样的场景：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f3bd7001564439a949d85bc4841d6ac~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;bar&quot;&gt;
    &lt;span class=&quot;icon&quot;&gt;&lt;svg&gt;&lt;/svg&gt;&lt;/span&gt;
    &lt;!-- 其他 icon --&gt;
    &lt;span class=&quot;icon&quot;&gt;&lt;svg&gt;&lt;/svg&gt;&lt;/span&gt;
    &lt;div class=&quot;form&quot;&gt;
        &lt;input type=&quot;input&quot;&gt;
        &lt;span class=&quot;icon&quot;&gt;&lt;svg&gt;&lt;/svg&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;span class=&quot;icon&quot;&gt;&lt;svg&gt;&lt;/svg&gt;&lt;/span&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.bar {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.form {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.form input {
    flex: 1 1 auto;
    min-width: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别在 <code>.bar</code> 和 <code>.form</code> 两个元素上创建了 Flex 容器，同时让 <code>.form</code> 和 <code>input</code> 两个元素上设置 <code>flex: 1 1 auto</code> ，让它们能在主轴上根据 Flex 容器空间进行伸缩扩展：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/187240bfae1d4cf6a081ad6160d3cc47~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当你改变容器大小时，你将看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/894f8e39b97747cb8676b0095256b2ae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),ee={href:"https://codepen.io/airen/full/wvXxmZO",target:"_blank",rel:"noopener noreferrer"},ie=d(`<p>我认为使用 Flexbox 可以更好地满足这个组件所需的灵活性，尽管使用 Grid 可以很容易地实现相同的设计。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.bar {
    display: grid;
    grid-template-columns: repeat(4, min-content) minmax(0, 1fr) min-content;
    align-items: center;
    gap: 1rem;
}

.form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) min-content;
    gap: 1rem;
    align-items: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42193a8df55a47b5bf86749138b1c60d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),ne={href:"https://codepen.io/airen/full/yLEqjVJ",target:"_blank",rel:"noopener noreferrer"},le=d(`<p>虽然最终结果是一样的，但我认为 Flexbox 是更好的选择，原因是，如果你以后决定在搜索栏两侧添加更多的图标时，你不需要修改任何的 CSS 样式：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff61afcd9cc4d4089f910359c9ef22d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>换作是 Grid 布局，虽然向搜索栏的右侧添加额外的图标，布局看起来还行，但向搜索栏的左侧添加额外的图标时，就会打乱原先的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d47dbf4f783a4144ad9e78e5a5fd30e6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这意味着你还必须根据新增的图标数量来调整CSS，比如在搜索栏左侧新增两个，右侧新增一个，你要像下面这样调整网格轨道数量：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.bar {
    display: grid;
    grid-template-columns: repeat(6, min-content)  minmax(0, 1fr)  repeat(2, min-content);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/349303ec5b124e5a81930f7bd2ad9c62~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),de={href:"https://codepen.io/airen/full/jOKpxaq",target:"_blank",rel:"noopener noreferrer"},se=d(`<p>这个示例也再次验证了，<strong>如果你无法预判输出内容时，最好是使用 CSS Flexbox 构建布局</strong> 。</p><p>再来看一个页头相关的布局。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d960f35d509c44198360d080f52b0108~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如下图所示，这个页面有三个部分组成：</p><ul><li>左边有网站的 Logo（居左）；</li><li>中间是一个导航菜单 （水平居中）；</li><li>右侧是用户头像，昵称和一个购物车按钮 （居右）。</li></ul><p>估计不少开发者会采用 Flexbox 布局，并且设置它们两端对齐：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    display: flex;
    justify-content: space-between;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Flex 容器的剩余空间是按 <code>space-between</code> 分配给了相邻 Flex 项目之间，并且第一个 Flex 项目（网站 Logo）紧挨着 Flex 容器左侧边缘（主轴起始边缘），最后一个 Flex 项目（用户头加购物车）紧挨着 Flex 容器右侧边缘（主轴的结束边缘）。或者说，两端是对齐了，但这个示例中本该水平居中的导航菜单却有一点点偏左：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4903f159ebd4df6906084fc1331e2a9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>造成这种现象的主要原因是，<strong>导航菜单两边的 Flex 项目宽度不相等</strong> 。所以最终渲染出来的结果并不符合设计要求的视觉效果。也就是说，构建这个页头的布局，使用 Flexbox 其实是不太适合的，如果你一定要使用 Flexbox 不是不可以，你需要添加额外的代码。如果使用 Grid 来布局的话，就会简单地多：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header { 
    display: grid; 
    grid-template-columns: 1fr auto 1fr; 
    gap: 1rem; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置了一个三列网格，并且第二列的列宽是根据导航菜单的宽度来决定的（<code>auto</code>），并且把 Grid 容器可用空间（除导航栏宽度与列轨道间距之外的空间）均分成两等份（第一列和第三列列宽是 <code>1fr</code>），一份给了第一列（Logo 所占列），另一份给了第三列（用户头像、昵称和购物车按钮所在列）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af13fa370694957b7a5ebd2312b771f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，就页面中导栏菜单和右侧的用户信息栏，我们可以使用 Flexbox 来布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c0d88175c3c4f7b8a2790ee84c9da3b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这也是一个典型的 CSS Grid 和 CSS Flexbox 混合在一起使用的案例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c4b1c1b68a14276adb995a95a77cd5c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,17),ae={href:"https://codepen.io/airen/full/NWYmQmB",target:"_blank",rel:"noopener noreferrer"},re=d(`<p>卡片组件在 Web 中是另一个常见的组件。像下图这样排列卡片的布局也是到处可见：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1204f0df4d5142d888f6568af63ee443~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;article class=&quot;cta&quot;&gt;
    &lt;img src=&#39;https://picsum.photos/2568/600?random=1&#39;&gt;
    &lt;div class=&quot;cta__text-column&quot;&gt;
        &lt;h2&gt;We Don’t Have the Right: A Decolonized Approach to Innovation&lt;/h2&gt;
        &lt;p&gt;This image has an aspect ratio of 3/2.&lt;/p&gt;
        &lt;a href=&quot;&quot;&gt;Read all about it&lt;/a&gt;
    &lt;/div&gt;
&lt;/article&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能已经想到了，CSS Flexbox 的 <code>flex-direction</code> 就可以轻易实现：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cta {
    display: flex;
    flex-wrap: wrap;
}

.cta:nth-child(2n) {
     flex-direction: row-reverse;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只不过，它在卡片标题（<code>h2</code>）、描述内容（<code>p</code>）和按钮（<code>a</code>）外面需要额外添加一个容器（<code>div</code>）。</p><p>相对而言，要是使用 CSS Grid 来实现这个布局效果的话，它的 HTML 结构能更简洁和扁平化：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;article class=&quot;cta&quot;&gt;
    &lt;img src=&#39;https://picsum.photos/2568/600?random=1&#39;&gt;

     &lt;h2&gt;We Don’t Have the Right: A Decolonized Approach to Innovation&lt;/h2&gt;
     &lt;p&gt;This image has an aspect ratio of 3/2.&lt;/p&gt;
     &lt;a href=&quot;&quot;&gt;Read all about it&lt;/a&gt;

&lt;/article&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，你需要写的 CSS 代码要比 Flebox 多得多：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    grid-template-rows: repeat(3, auto);
    row-gap: min(1.5rem, 2.5vw);
    grid-template-areas: 
        &quot;cta-title    cta-img&quot;
        &quot;cta-describe cta-img&quot;
        &quot;cta-button   cta-img&quot;;
}

.grid img {
    grid-area: cta-img;
}

.grid h2 {
    grid-area: cta-title;
}

.grid p {
    grid-area: cta-describe;
}

.grid a {
    grid-area: cta-button;
}

.grid:nth-child(even) {
    grid-template-columns: 340px minmax(0, 1fr);
    grid-template-areas: 
        &quot;cta-img cta-title&quot;
        &quot;cta-img cta-describe&quot;
        &quot;cta-img cta-button&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8de2d5fe271451b8dfa85534cf6e28c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),ce={href:"https://codepen.io/airen/full/gOKjKQm",target:"_blank",rel:"noopener noreferrer"},te=d(`<p>继续以卡片组件为例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6fb920592c24a47aa5401542be2d835~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图涉及到单张卡片和多张卡的布局。在 CSS Grid 没使用之前，不管是单张卡片还是多张卡片的布局，Web 开发者首先的布局方案是使用 CSS Flexbox。对于单张卡片的布局，使用 CSS Flexbox 一点问题都不存在。</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;ul class=&quot;cards&quot;&gt;
    &lt;li class=&quot;card&quot;&gt;
        &lt;figure&gt;&lt;img src=&quot;thumbnail.jpg&quot; alt=&quot;卡片缩略图&quot; /&gt;&lt;/figure&gt;
        &lt;h3&gt;卡片标题&lt;/h3&gt;
        &lt;p&gt;卡片描述&lt;/p&gt;
        &lt;button&gt;&lt;svg&gt;&lt;/svg&gt;卡片按钮&lt;/button&gt;
    &lt;/li&gt;
    &lt;!-- 省略其他卡片 --&gt;
&lt;/ul&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于单张卡片来说，使用 Flexbox 只是用来控制对齐方式、间距之类的。就这两方面来说，不使用 Flexbox 也可以。如果希望底部的按钮都能对齐，那就需要使用 Flexbox 来布局，这样可以很容易实现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1482a9950e574cd5ad503031bde77e30~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 单个 card 布局 */
.card {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    align-items: center;
}

button {
    margin-top: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于多张卡片的排列，如果你不希望卡片换行排列，又希望卡片能根据容器空间进行伸缩扩展，往往会使用 CSS 自定义属性来和 CSS 的 <code>calc()</code> 函数计算每张卡片（Flex 项目）的基础主尺寸 <code>flex-basis</code> 的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root {
    --columns: 4; /* 每行要展示的列数 */
    --gap: 1rem;  /* 列间距 */
    --flex-basis: calc(
        (100% - (var(--columns) - 1) * var(--gap)) / var(--columns)
    ); /* Flex 项目的基础主尺寸，即每张卡片的 flex-basis 值 */
}

/* cards layout */
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
}

/* card layout */
.card {
    flex: 1 1 var(--flex-basis);
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    align-items: center;
}

button {
    margin-top: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候效果看上去还是不错的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcc68b136cdc42c6a997a62868f52c43~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),oe={href:"https://codepen.io/airen/full/dyKjgGE",target:"_blank",rel:"noopener noreferrer"},ve=d(`<p>但突然有一天，设计师说，每行只排列三张卡片（<code>--columns: 3</code>）或者说卡片最小宽度不能小于某个尺寸，比如说 <code>300px</code> 。或者说，服务端输出的卡片数量不只四个，那么上面的布局就会因为设计需求调整或内容输出的变化，造成卡片换行展示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b45471af206143faa328e71f84f96b91~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>而且，你还会发现，新换行的卡片宽度会根据 Flex 容器的空间伸缩扩展：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6667f95ce006485182f53cc865f7d596~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然换行的卡片能自动进行伸缩扩展，但可能不符合预期的布局效果。如果要让布局符合预期，就需要你做一些其他的设置，比如说：</p><ul><li>给卡片设置相同的 <code>min-width</code> 和 <code>max-width</code> 值；</li><li>不允许卡片（Flex 项目）能根据 Flex 容器空间自动伸缩扩展，即 <code>flex: 0 0 var(--flex-basis)</code>。</li></ul><p>如果这样做的话，又将失去了 CSS Flexbox 的优势，Flex 项目不具弹性了。不过，我们可以考虑将 CSS Flexbox 和 CSS Grid 两种技术结合起来构建所需的 Web 布局。即，<strong>单张卡片</strong> <strong><code>.card</code></strong> <strong>使用 CSS Flexbox 布局，多张卡片排列</strong> <strong><code>.cards</code></strong> <strong>则使用 CSS Grid 布局</strong> 。你将会发现，这样构建出来的布局完全能符合你预期想要的效果。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 300px), 1fr));
    gap: 1rem;
}

.card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

button {
    margin-top: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c16da7c0556842d1929da65b39e9eab4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),ue={href:"https://codepen.io/airen/full/WNygGVx",target:"_blank",rel:"noopener noreferrer"},me=d(`<p>另外，CSS Flexbox 有一个效果实现起来难度也是非常的大。比如说，每张卡片每个元素区域在垂直方向都要对齐：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a0495856caa43cb950b3e022cde3c07~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就上图所示效果，对于 CSS Grid 布局来说，一点难度都没有。我们可以使用 CSS Grid 中的 <code>subgrid</code> (子网格)来实现：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 300px), 1fr));
    gap: 1rem;
}

.card {
    grid-row: span 4;
    display: grid;
    grid-template-rows: subgrid;
    gap: 1rem;
}

button {
    place-self: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/385e45217ac74f3db917ab12f892ceb9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>最终你在支持 <code>subgrid</code> 浏览器中看到的效果是很完美的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23a1df0f7e234a6c975bbeea4bca723a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),be={href:"https://codepen.io/airen/full/oNyPYXm",target:"_blank",rel:"noopener noreferrer"},pe=d(`<p>虽然 CSS Flexbox 能实现大部分 Web 布局，但也有不少布局是不太适用的，尤其是层叠类的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9ebed597017470f9afa7392cb2ecd6a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们来看一个层叠方面的示例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f20acb2f1798436f82d0f8f08ff7b5d4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cards {
    width: min(100% - 2rem, 768px);
    margin: auto;
    
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
}

li:nth-of-type(1) {
    grid-column: 1 / -1;
}

.card {
    display: grid;
    grid-template-rows: 3rem repeat(4, auto) 3rem;
    grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
    grid-template-areas:
        &quot;...    ...       ...&quot;
        &quot;...    subtitle  ...&quot;
        &quot;...    title     ...&quot;
        &quot;...    content   ...&quot;
        &quot;...    button    ...&quot;
        &quot;...    ...       ...&quot;;
    row-gap: 1.25rem;
}

.card &gt; *:not(figure) {
    z-index: 2;
    justify-self: center;
}

.card figure,
.card::before {
    grid-area: 1 / 1 / -1 / -1;
}

.card::before {
    z-index: 1;
}

.card .subtitle {
    grid-area: subtitle;
}

.card h3 {
    grid-area: title;
}

.card p {
    grid-area: content;
}

.card button {
    grid-area: button;
    align-self: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用了嵌套网格来实现的布局效果。父网格 <code>.cards</code> 构建一个九宫格的布局，每张卡片 <code>.card</code> 是一个内网格，并且使用 <code>grid-template-areas</code> 命名了网格区域，方便使用 <code>grid-area</code> 来放置网格项目（卡片上的每个元素）。其中最为关键的部分是 <code>figure</code> 和 <code>.card::before</code> 都跨越了整个网格列轨道和网格行轨道，填充整个网格，并且显式设置 <code>z-index</code> 值，指定其在 <code>z</code> 轴的层级。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bec2186c052d46279522a0950a4fd77e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),ge={href:"https://codepen.io/airen/full/YzvONXW",target:"_blank",rel:"noopener noreferrer"},fe=e("h2",{id:"小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#小结","aria-hidden":"true"},"#"),i(" 小结")],-1),xe=e("p",null,"在这节课中，我们主要一起探讨了 CSS Grid 和 CSS Flex 之间差异，并且通过具体的示例讨论了几种选择使用 CSS Grid 还是 CSS Flexbox 布局的方法。",-1),Se=e("p",null,[i("课程中所介绍的经验法则并没有什么指导性的，我认为没有哪一种布局是绝对性优胜于其他布局的，也没有哪一种布局是绝对性地替代其他布局的。它们应该是"),e("strong",null,"共存的"),i(" 、"),e("strong",null,"互补的"),i(" 、"),e("strong",null,"协作的等。")],-1);function he(qe,Ce){const n=a("ExternalLinkIcon");return r(),c("div",null,[o,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",v,[i("https://codepen.io/airen/full/KKeoJoY"),l(n)])])]),u,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",m,[i("https://codepen.io/airen/full/KKeoJoY"),l(n)])])]),b,p,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",g,[i("https://codepen.io/airen/full/KKeoJoY"),l(n)])])]),f,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",x,[i("https://codepen.io/airen/full/dyKmLxG"),l(n)])])]),S,h,q,C,e("p",null,[i("从前面的课程中，我们可以得知，"),_,i(" 。 "),e("a",k,[i("W3C 规范在介绍 Flexbox 时这样描述过"),l(n)]),i("：")]),F,e("blockquote",null,[e("p",null,[i("In return it gains simple and powerful tools for distributing space and aligning content in ways that web apps and complex web pages often need. —— "),e("a",y,[i("W3C Flexbox 规范"),l(n)])])]),j,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",G,[i("https://codepen.io/airen/full/vYrjJEw"),l(n)])])]),w,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",z,[i("https://codepen.io/airen/full/WNyyXQL"),l(n)])])]),L,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",M,[i("https://codepen.io/airen/full/JjZZOBy"),l(n)])])]),T,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",H,[i("https://codepen.io/airen/full/bGKKaGG"),l(n)])])]),W,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",K,[i("https://codepen.io/airen/full/oNyypLP"),l(n)])])]),D,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",N,[i("https://codepen.io/airen/full/zYaaQLV"),l(n)])])]),B,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Y,[i("https://codepen.io/airen/full/vYrrwvg"),l(n)])])]),E,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",O,[i("https://codepen.io/airen/full/bGKKPrO"),l(n)])])]),J,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",V,[i("https://codepen.io/airen/full/yLEEdxN"),l(n)])])]),X,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",R,[i("https://codepen.io/airen/full/yLEqBzq"),l(n)])])]),A,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",P,[i("https://codepen.io/airen/full/BaVPBXr"),l(n)])])]),Q,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",I,[i("https://codepen.io/airen/full/dyKjyMv"),l(n)])])]),Z,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",U,[i("https://codepen.io/airen/full/GRGByzK"),l(n)])])]),$,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ee,[i("https://codepen.io/airen/full/wvXxmZO"),l(n)])])]),ie,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ne,[i("https://codepen.io/airen/full/yLEqjVJ"),l(n)])])]),le,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",de,[i("https://codepen.io/airen/full/jOKpxaq"),l(n)])])]),se,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ae,[i("https://codepen.io/airen/full/NWYmQmB"),l(n)])])]),re,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ce,[i("https://codepen.io/airen/full/gOKjKQm"),l(n)])])]),te,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",oe,[i("https://codepen.io/airen/full/dyKjgGE"),l(n)])])]),ve,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ue,[i("https://codepen.io/airen/full/WNygGVx"),l(n)])])]),me,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",be,[i("https://codepen.io/airen/full/oNyPYXm"),l(n)])])]),pe,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ge,[i("https://codepen.io/airen/full/YzvONXW"),l(n)])])]),fe,xe,Se])}const ke=s(t,[["render",he],["__file","index-20.html.vue"]]);export{ke as default};
