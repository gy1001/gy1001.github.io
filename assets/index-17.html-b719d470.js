import{_ as s,M as a,p as r,q as c,R as e,t as i,N as d,a1 as l}from"./framework-e8cb8151.js";const t={},v=e("h1",{id:"_17-使用子网格构建-web-布局",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_17-使用子网格构建-web-布局","aria-hidden":"true"},"#"),i(" 17-使用子网格构建 Web 布局")],-1),u={href:"https://juejin.cn/book/7161370789680250917/section/7160657953932967967",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"卡片组件的布局",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#卡片组件的布局","aria-hidden":"true"},"#"),i(" 卡片组件的布局")],-1),o=e("p",null,"在 Web 布局中，常常会用到卡片组件，子网格来构建卡片组件布局是很有用的。接下来，我们一起来看两种卡片组件的布局。先来看第一种：",-1),b=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/083ae04152f24fd2a9347c2cfb246a1e~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),p={href:"https://codepen.io/airen/full/zYaKmpZ",target:"_blank",rel:"noopener noreferrer"},g=l(`<p>相邻卡片是在块轴（Block Axis）方向（垂直方向）堆叠的，并且每张卡片都包括：</p><ul><li>标题；</li><li>缩略图；</li><li>描述文本；</li><li>媒体列表。</li></ul><p>它的基本结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;cards&quot;&gt;&lt;!-- grid --&gt;
    &lt;div class=&quot;card&quot;&gt;&lt;!-- subgrid --&gt;
        &lt;h3&gt;标题&lt;/h3&gt;
        &lt;img src=&quot;&quot; alt=&quot;缩略图&quot; /&gt;
        &lt;p&gt;描述文本&lt;/p&gt;
        &lt;span&gt;列表1&lt;/span&gt;
        &lt;span&gt;列表2&lt;/span&gt;
        &lt;span&gt;列表3&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>卡片容器 <code>.cards</code> 分为五列，行随卡片 <code>.card</code> 的数量自动增加：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.cards {
    display: grid;
    
    grid-template-columns: 
        minmax(7em, 12em) 
        repeat(3, max-content)
        1fr;
    row-gap: 2rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一列列轨道设置尺寸是 <code>minmax(7em, 12em)</code> ，这样做是让卡片上缩略图的大小控制在 <code>7em ~ 12em</code> 之间。由于媒体导航项的内容大小我们并不知，因此这里使用 <code>max-content</code> 来控制，最后一列设置 <code>1fr</code> ，将可用空间都留给这个列：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/399b5dacf7b9465db3114c6ab268e098~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>每张卡片（<code>.card</code>）它跨越五列（<code>grid-column: 1 / -1</code> 或 <code>grid-column: 1 / span 5</code>），可以在 <code>.card</code> 的 <code>grid-template-columns</code> 设置 <code>subgrid</code> ，继承父网格（<code>.cards</code>）的列轨道尺寸。另外在子网格上使用 <code>grid-template-rows</code> 重新定义自己的行网格轨道尺寸：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card {
    display: inherit;
    
    grid-template-columns: subgrid;
    grid-template-rows: min-content max-content min-content;
    
    column-gap: 1em;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/455fdf53a2b9491184a716729db90793~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>创建好网格之后，卡片中的标题（<code>h3</code> ）、描述文本（<code>p</code>）、缩略图（<code>img</code>）和导航列表项（<code>span</code>）就可以根据子网格（<code>.card</code>）的网格线名称放置到指定位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>h3 {
    grid-column: 1 / -1;
}

p {
    grid-column: 2 / -1;
}

img {
    grid-row: 2 / -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个卡片组件是像下图这样的，在内联轴方向平铺：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25268de6eed946a1a2fb2eae6832658e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),f={href:"https://codepen.io/airen/full/abKmQWj",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>其实前面有一个示例类似这种卡片组件的布局。只不过这个示例，我改了一下，让其变得稍微复杂那么一点。上面布局所需的 HTML 结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;cards&quot;&gt;&lt;!-- grid --&gt;
    &lt;div class=&quot;card&quot;&gt;&lt;!-- subgrid --&gt;
        &lt;div class=&quot;media&quot;&gt;&lt;!-- subgrid --&gt;
            &lt;img src=&quot;avatar.jpg&quot; alt=&quot;media object&quot; /&gt;
            &lt;p&gt;Media Content&lt;/p&gt;
        &lt;/div&gt;
        &lt;h3&gt;Card Title&lt;/h3&gt;
        &lt;img src=&quot;card--figure.jpg&quot; alt=&quot;card figure&quot; /&gt;
        &lt;p&gt;Card Describe&lt;/p&gt;
        &lt;svg&gt;Like Icon&lt;/svg&gt;
        &lt;button&gt;More Button&lt;/button&gt;
    &lt;/div&gt;
    &lt;!-- 省略的 card --&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在最外层的卡片容器（<code>.cards</code>）上使用了 RAM 布局技术，让卡片在卡片容器中能能够根据空间自动断行，并且根据卡片组件的需要，使用 <code>grid-template-rows</code> 定义行网格轨道尺寸和数量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 18rem), 1fr));
    grid-template-rows: min-content min-content minmax(10rem, 14rem) auto auto;
    gap: 4rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a36815091a0c40d29f0445c5691c9167~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>每张卡片 <code>.card</code> 是父网格（<code>.cards</code>）的一个子网格，跨越父网格五行，并且继承父网格行网格轨道，不同的是重新定义了网格列轨道数量和尺寸，同时为了让卡片中的每个元素更易于放置，使用 <code>grid-template-areas</code> 在子网格上显式定义了网格区域名称。并且显式设置<code>gap</code> 值为 <code>0</code> ，重置了子网格轨道之间的间距：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card {
  grid-row: span 5;

  display: inherit;
  grid-template-columns: 1rem min-content 1fr min-content 1rem;
  grid-template-rows: subgrid;
  grid-template-areas:
    &quot;.       media    media    media .&quot;
    &quot;.       title    title    title .&quot;
    &quot;figure  figure   figure   figure    figure&quot;
    &quot;.       describe describe describe  .&quot;
    &quot;.       like     .        button    .&quot;;
  gap: 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eda52a75ef34697aab07f7b4d814cdd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>卡片中的每个网格项目就可以使用 <code>grid-area</code> 来指定位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.media {
    grid-area: media;
}

h3 {
    grid-area: title;
}

.card &gt; img {
    grid-area: figure;
}

.card &gt; p {
    grid-area: describe;
}

.card svg {
    grid-area: like;
}

.card button {
    grid-area: button;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，网格 <code>.card</code> 既是网格 <code>.cards</code> 的子网格，又是网格 <code>.media</code> 的父网格。因为，在 <code>.media</code> （网格项目）上也使用 <code>display: inherit</code> 定义了一个网格，同时继承其父网格 <code>.card</code> 的列网格轨道：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.media {
    display: inherit;
    grid-template-columns: subgrid;
    grid-template-areas: &quot;des    des    avatar&quot;;
    align-items: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dca94529b7344048ab48553992286e7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在<code>.media</code> 网格中的网格项目也可以使用 <code>grid-area</code> 放置到对应的网格区域中，因为我们在 <code>.media</code> 中使用 <code>grid-template-areas</code> 创建了网格区域：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.media p {
  grid-area: des;
}

.media img {
  grid-area: avatar;
  justify-self: end;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用子网格<code>subgrid</code> 来构建卡片组件时，不管哪个网格项目的内容增加还是减少，卡片中的每个区域都可以对齐，让你的卡片组件整体视觉是好看的！</p><p>事实上，这种布局技术还可以用于 Web 上其他地方，比如页脚的导航、下拉菜单等：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bb29df201de4ceb810755e19abc4d20~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就拿页脚导航为例吧。构建这样的布局，你可能需要一个像下面这样的 HTML 结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
    &lt;div class=&quot;wrapper&quot;&gt;
        &lt;footer class=&quot;menu&quot;&gt;
            &lt;div class=&quot;menu__item&quot;&gt;
                &lt;h3 class=&quot;menu__heading&quot;&gt;Title&lt;/h3&gt;
                &lt;ul class=&quot;menu__lists&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;&quot;&gt;Item&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
            &lt;!-- 省略其他 menu__item --&gt;
        &lt;/footer&gt;
    &lt;/div&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们要的是这样的一个效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/913208cb97e74c3189b7e8dadfe8a31b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li>列数能够根据视窗大小自动调整，即自动断行；</li><li>导航菜单中，同一行中的区域，其标题与标题对齐，菜单项与菜单项对齐。</li></ul><p>实现第一个要求，在 CSS 网格布局中很简单，只需要使用 RAM 布局技术即可。但没有子网格（<code>subgrid</code>）的话，第二个要求实现起来就比较难，你得到的效果将会像下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45866cc5f95f4bf99064eb96fbe667ba~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可以像上面卡片示例一样，将 <code>.menu</code> 和 <code>.menu__item</code> 都定义为网格，而且 <code>.meun__item</code> 网格是 <code>.menu</code> 网格的子网格，在子网格 <code>.menu__item</code> 跨越两行，并且设置它的 <code>grid-template-rows</code> 值为 <code>subgrid</code> 。这样做是让子网格继承父网格的行网格轨道，当子网格行网格轨道尺寸变大时，它的父网格行网格轨道也会变大。你就可以实现第二个要求。</p><p>整个页脚导航的布局效果，除了运用了 CSS 子网格、RAM 布局技术之外，还使用了 Full-Bleed 布局技术，有关于布局的详细代码如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Full-Bleed 布局技术 */
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不难发现，示例中的 <code>body</code> 、<code>.wrapper</code> 、<code>footer</code> 和 <code>.menu__item</code> 都是网格，它们之间的关系是：</p><ul><li><code>.wrapper</code> 网格是 <code>body</code> 网格的子网格，并且在 <code>.wrapper</code> 上设置了 <code>grid-template-columns</code> 值为 <code>subgrid</code> ，<code>.wrapper</code> 网格将继承父网格 <code>body</code> 的列网格轨道数量和尺寸。</li><li><code>footer</code> 网格嵌套在 <code>.wrapper</code> 网格内，但并没有在 <code>grid-template-columns</code> 或 <code>grid-template-rows</code> 属性上显式设置值为 <code>subgrid</code> ，因此它们只是嵌套关系，<code>footer</code> 和 <code>.wrapper</code> 是两个独立的网格。</li><li><code>.menu__item</code> 网格是 <code>footer</code> 网格的子网格， <code>.menu__item</code> 项目跨越两行，同时将其 <code>grid-template-rows</code> 属性设置为 <code>subgrid</code> ，因此它将继承其父网格 <code>footer</code> 的行网格轨道特性。页脚菜单每一栏的标题相互对齐，菜单项相互对齐。</li></ul><p>你最终看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/659526f8e7d64e459e50dbaf562aad28~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,32),x={href:"https://codepen.io/airen/full/poKNLbE",target:"_blank",rel:"noopener noreferrer"},_=l(`<p>感兴趣的同学，可以使用同样的技术（RAM 布局技术和子网格布局）来实现下图中下拉导航的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0d4330200d84a579a2b8ae9d34fba7f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="品牌页-区-布局" tabindex="-1"><a class="header-anchor" href="#品牌页-区-布局" aria-hidden="true">#</a> 品牌页（区）布局</h2><p>在 Web 页面的设计中，常常会有通栏的横幅的设计效果，往往把这种效果称为 <strong>Branding</strong> 。如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcb8b31b500a4760ac2e15ff0fa1e7b1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>它包含了三个部分：</p><ul><li>标题（Headline）；</li><li>特色功能区（Featured Section）；</li><li>普通卡片区（Card）。</li></ul><p>它的 HTML 结构可以像下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;section class=&quot;branding&quot;&gt;
    &lt;div class=&quot;headline&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;featured&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;card&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，你可以根据自己需要往相应的区域继续填充内容，比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;section class=&quot;branding&quot;&gt;
    &lt;div class=&quot;headline&quot;&gt;
        &lt;h3&gt;主标题&lt;/h3&gt;
        &lt;h4&gt;次标题&lt;/h4&gt;
    &lt;/div&gt;
    &lt;div class=&quot;featured&quot;&gt;
        &lt;div class=&quot;featured__content&quot;&gt;&lt;!-- 内容区域 --&gt;
            &lt;h3&gt;特色功能区域:标题&lt;/h3&gt;
            &lt;blockquote&gt;特色功能区域：描述文本&lt;/blockquote&gt;
        &lt;/div&gt;
        &lt;figure class=&quot;featured__thumbnail&quot;&gt;
            &lt;img src=&quot;featured--thumbnail.jpg&quot; alt=&quot;特色功能区域缩略图&quot; /&gt;
        &lt;/figure&gt;    
    &lt;/div&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;figure&gt;
            &lt;img src=&quot;card--thumbnail.jpg&quot; alt=&quot;卡片缩略图&quot; /&gt;
        &lt;/figure&gt;
        &lt;h3&gt;卡片标题&lt;/h3&gt;
        &lt;p&gt;卡片描述文本&lt;/p&gt;
    &lt;/div&gt;
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设设计师将整个 Branding 区域<strong>均分为五列</strong> ，除了“特色功能区域（Featured Section）” 占了三列之外，其他两个区域（Headline 和 Card）只各占一列，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe64e47f4264ef4b9739f66871ea895~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用网格布局很容易就将它均分成五份，使用网格线可以将它们放置到指定的区域：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.branding {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.featured</code> 网格项目（即 “特色功能区域” ）的 <code>grid-column</code> 属性设置了 <code>2 / span 3</code> 值，表示它将放置在列网格线<code>2</code> （起始位置），并且向右合并三列（<code>span 3</code>），相当于 <code>grid-column: 2 / 5</code> ，即从第二列起始网格线跨越到第五列起始网格线。</p><p>为了让 <code>.featured</code> 网格项目能继承父网格（<code>.branding</code>）的网格特性，得到更好的控制，需将其设置为一个子网格（<code>display</code> 设置为 <code>inherit</code> 或 <code>grid</code> ），并且将其 <code>grid-tempalte-columns</code> 设置为 <code>subgrid</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.featured {
    grid-column: 2 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了能更好地放置该网格中的网格项目（“特色功能区域”中的内容<code>.featured__content</code> 和缩略图 <code>.featured__thumbnail</code>），你还可以显式设置 <code>grid-template-areas</code> 属性的值：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.featured {
    grid-column: 2 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    
    grid-template-areas: &quot;content thumbnail thumbnail&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内容区域占一列，缩略图占两列：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d1ce51ed1454125b86244b0c0a5b36c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.featured__content {
    grid-area: content;
}

.featured__thumbnail {
    grid-area: thumbnail;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),q={href:"https://codepen.io/airen/full/oNyzOYj",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,[i("这样做，“特色功能区”中的主内容列和缩略图列，能与其父网格（"),e("code",null,".branding"),i("）所对应的列完全匹配，列轨道大小、列间距等。这一切都要归功于子网格（"),e("code",null,"subgrid"),i("）的功能。")],-1),y=e("p",null,"在这个基础上，你还可以稍微加点内容，改变一下结构，就可以构建出一个 Landing Page 页的布局效果：",-1),w=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac78cb4075084d77bbb940fcd8dee964~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),j={href:"https://codepen.io/airen/full/abKBLGJ",target:"_blank",rel:"noopener noreferrer"},z=l(`<p>在前一个示例的“特色功能区域”下面新增一个“标题”、“列表”和“按钮”，你可以考虑用一个 <code>&lt;div&gt;</code> 来包裹它们：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;landing&quot;&gt;
    &lt;div class=&quot;headline&quot;&gt;...&lt;/div&gt;
    
    &lt;!-- 使用一个 div 将特色功能区域、新增的标题、列表和按钮包裹起来 --&gt;
    &lt;div class=&quot;featured--section&quot;&gt;
        &lt;div class=&quot;featured&quot;&gt;&lt;!-- 特色功色区域结构不变 --&gt;&lt;/div&gt;
        &lt;h3&gt;新增标题&lt;/h3&gt;
        &lt;ul&gt;&lt;!-- 新增列表 --&gt;
            &lt;li&gt;
                &lt;span&gt;01&lt;/span&gt;
                &lt;p&gt;列表内容&lt;/p&gt;
            &lt;/li&gt;
            &lt;!-- 此处省略两个一样的 li --&gt;    
        &lt;/ul&gt;
        &lt;button&gt;新增按钮&lt;/button&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card&quot;&gt;...&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在前面的基础上稍微调整了一下网格的定义：</p><ul><li>在 <code>.landing</code> 上定义了一个四行五列（<code>4 x 5</code>）的网格，这是最外层的主网格，和前面示例相比，这里显式定义网格的行网格轨道的数量和尺寸。</li><li>将新增的 <code>.featured--section</code> 容器合并三列四行，同时将 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 定义为 <code>subgrid</code> ，让该子网格继承其父网格 <code>.landing</code> 的网格特性。</li><li>在 <code>.featured--section</code> 的 <code>.featured</code> 和 <code>ul</code> （列表）也是一个子网格，它们都跨越三列，继承父网格 <code>.featured--section</code> 网格轨道。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/772204318c0a42b4a9713087480ba30e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.landing {
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
    grid-template-areas: &quot;content thumbnail thumbnail&quot;;
}

.featured__content {
    grid-area: content;
    align-self: center;
}

.featured__thumbnail {
    grid-area: thumbnail;
}

.featured--section &gt; h3 {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，示例中列表项的布局效果是一种<strong>交叉叠加</strong>的布局，这里采用了嵌套网格来实现，如果你感兴趣的话，可以尝试使用子网格来实现。</p><p>在“特色功能区域”中还可以与 CSS 的多列布局结合在一起，构建类似一个简单的报刊类的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7144d19abba44e079f220f0b33d466d8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),S={href:"https://codepen.io/airen/full/GRGNyVO",target:"_blank",rel:"noopener noreferrer"},M=l(`<p>实现上图布局效果，HTML 结构调整并不大：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;section class=&quot;branding&quot;&gt;
    &lt;div class=&quot;headline&quot;&gt;...&lt;/div&gt;
    &lt;div class=&quot;featured&quot;&gt;
        &lt;h3 class=&quot;featured__title&quot;&gt;特色功能区域:标题&lt;/h3&gt;
        &lt;figure class=&quot;featured__thumbnail&quot;&gt;
            &lt;img src=&quot;featured--thumbnail.jpg&quot; alt=&quot;特色功能区域缩略图&quot; /&gt;
        &lt;/figure&gt;    
        &lt;div class=&quot;featured__content&quot;&gt;&lt;!-- 内容区域 --&gt;
           &lt;blockquote&gt;特色功能区域：描述文本&lt;/blockquote&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card&quot;&gt;...&lt;/div&gt;
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只是把 <code>.featured</code> 网格区域的名称和结构做了一下调整：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.featured {
    grid-column: 2 / span 3;
    
    display: inherit;
    grid-template-columns: subgrid;
    
    grid-template-areas: 
       &quot;title   thumbnail thumbnail&quot;
       &quot;content content   content&quot;;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad4801c8b6324cf882d4dca6ad05fc24~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>示例中，在内容区域<code>.featured__content</code> 使用 CSS 多列布局中的 <code>column-count</code> 、<code>column-gap</code> 和 <code>column-rule</code> 将其分成三列布局：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.featured__content {
    column-count: 3;                   /* 设置列数 */
    column-gap: 1rem;                  /* 设置列间距 */
    column-rule: 1px dashed aliceblue; /* 设置列之间分隔线 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图片墙" tabindex="-1"><a class="header-anchor" href="#图片墙" aria-hidden="true">#</a> 图片墙</h2><p>子网格用来构建图片墙也是很有用的，比如下图这样的布局，左侧有一个内容区域，它包含了一个标题和一段描述文本，右侧是九宫的图片展示区：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad67a745e17f409090f010d0f9631f54~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图仅是图片墙的一种排列网格，其实右侧你可以根据自己的需要，设计出不同的九宫格网格，甚至是比九宫格风格复杂繁多的宫格，比如下图这些延伸的风格：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6b9538a3e5b43cc9e3a50d6c39e67f6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当然，你可能会说，不使用子网格也可以构建出所期望的图片墙的布局效果。的确如此，不使用子网格，你需要创建一个复杂的网格。如果使用子网格，你更多的关注点是在右图宫格的布局上，而这种九宫格的布局风格，CSS 网格是有天然优势的。</p><p>构建上面展示的图片墙布局效果，所需要的 HTML 结构如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;gallery&quot;&gt;&lt;!-- 父网格 --&gt;
    &lt;div class=&quot;gallery__content&quot;&gt;
        &lt;h3&gt;Gallery Title&lt;/h3&gt;
        &lt;p&gt;Gallery Describe&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;gallery__photo&quot;&gt;&lt;!-- 子网格 --&gt;
        &lt;img src=&quot;gallery-photo.jpg&quot; alt=&quot;图片&quot; /&gt;
        &lt;!-- 省略其他的 img --&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设计师将整个图片墙组件分成六列，内图和图片各占三列。右侧的图片展示区是一个三列 <code>N</code> 行的网格（行数<code>N</code> 会随图片增加而自动增加，即创建隐式的行网格轨道）。在这个示例中，将右侧图片展示区<code>.gallery__photo</code> 定义为 <code>.gallery</code> 网格的子网格，并且继承父网格的列网格轨道特性。</p><p>有关于布局的 CSS 代码如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.gallery {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fda3f46191f84215b81b3223b6b07d8e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,19),C={href:"https://codepen.io/airen/full/eYKggqV",target:"_blank",rel:"noopener noreferrer"},L=e("p",null,"你可以尝试着将右侧九宫格替换成你自己希望要的风格。",-1),W=e("h2",{id:"交叉叠加布局",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#交叉叠加布局","aria-hidden":"true"},"#"),i(" 交叉叠加布局")],-1),B=e("p",null,"不知道你平时浏览 Web 页面或 Web 设计，有没有留意到，Web 页面元素相互交叉叠加的布局效果越来越频繁，比如：",-1),T=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c2da1b3ec142b4823ee41d57b339b5~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),N=e("p",null,"在还没有 CSS 网格布局技术之前，Web 开发者一般都是采用绝对定位来构建。虽然绝对定位可以实现上图中交叉叠加的布局效果，但缺乏灵活性和适配性，无法较好地适配更多的终端设备。不过，使用 CSS 网格布局，尤其是结合子网格特性，就显得要容易得多，而且适配性、灵活性都要比绝对定位强很多。",-1),D={href:"https://codepen.io/michellebarker/full/JjGNdNY",target:"_blank",rel:"noopener noreferrer"},H=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cc1ca79ec2647ee8dac6fc5fb7a4b4a~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),K={href:"https://codepen.io/airen/full/poKRPxz",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://codepen.io/michellebarker/full/JjGNdNY",target:"_blank",rel:"noopener noreferrer"},F=l(`<p>基于卡片的 UI 是 Web 页同上常见的一种设计模式，但构建一个需要悬浮（<code>:hover</code>）或获得焦点（<code>:focus</code>）效果应用于整个卡片的 UI 并不常见。像上图这种交互效果，很多 Web 开发者往往会采用一种粗暴的策略，即在整个卡片的悬浮或获得焦点状态时，改变相应元素的 UI 效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card:hover img,
.card:focus img {
    /* 卡片悬浮或获得焦点状态下改变 img 样式*/
}

.card:hover .card__content,
.card:focus .card__content {
    /* 卡片悬浮或获得焦点状态下改变 卡片内容样式 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种策略有一个显著的缺点，鼠标只要悬浮到卡片上（或只要卡片获得焦点），相应的图片和卡片内容样式就会发生改变。这种策略实现的效果是不符合 Web 设计师预期的。</p><p>因为 Web 设计预期的效果是 “鼠标悬浮到图片或卡片内容时，才改变相应的样式”（如上图所示）。为了达到这样的交互效果，我们添加了一个空的链接标签<code>&lt;a&gt;</code> ，并且使用其伪元素 <code>::before</code> 和 <code>::after</code>来生成一个空白区域，分别遮盖在卡片的图片和内容区域上面：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22a63f3a5d794cce86743b4fa9fc4739~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.link:hover ~ img,
.link:focus ~ img {
     /* 链接悬浮或获得焦点状态下改变图片样式 */
}
.link:hover ~ .grid__card,
.link:focus ~ .grid__card {
    /* 链接悬浮或获得焦点状态下改变卡片内容样式 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似下图这样的一个效果就实现了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e991d1fbc883462da7e33a78fdda8065~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),V={href:"https://codepen.io/shadeed/full/jOOwwpY/66e9c2039b50463d96a2a9832f05ec0f",target:"_blank",rel:"noopener noreferrer"},R={href:"https://ishadeed.com/article/unusual-use-cases-pseudo-elements/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.w3cplus.com/css/use-case-pseudo-elements.html",target:"_blank",rel:"noopener noreferrer"},G=l(`<p>如今我们知道实现这种交互效果的技术方案了，但还需要一个更灵活的布局。以往一般采用的是绝对定位，将伪元素分别定位到图片和内容区域的上面。刚才提到过了，它是有缺陷的，很多时候我们并不知道输出的图片、内容区域大小。</p><p>庆幸的是，使用 CSS 网格布局，这一切就显得那么简单。你实现这个卡片，可能会需要一个像下面这样的 HTML 结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;grid&quot;&gt;
    &lt;!-- 这个空链接标签很重要，实现交互效果我们需要用到它的伪元素，另外该标签一定要放在图片和卡片内容标签前面 --&gt;
    &lt;a href=&quot;&quot; class=&quot;link&quot;&gt;&lt;/a&gt;
    
    &lt;!-- 卡片上的缩略图 --&gt;
    &lt;div class=&quot;grid__img&quot;&gt;
        &lt;img src=&#39;https://picsum.photos/800?random=5&#39; alt=&#39;卡片图片&#39;&gt;
    &lt;/div&gt;
    
    &lt;!-- 卡片上的内容 --&gt;
    &lt;div class=&quot;grid__card&quot;&gt;
        &lt;h2&gt;卡片标题&lt;/h2&gt;
        &lt;p&gt;卡片描述文本&lt;/p&gt;
        
        &lt;!-- 这是链接提示文案 --&gt;
        &lt;span class=&quot;fake-link&quot;&gt;阅读更多&lt;span&gt;→&lt;/span&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面结构看上去很简单，但其中有一个细节尤其重要。添加了一个空的链接标签<code>&lt;a&gt;</code> ，它的位置必须放置在卡片图片 <code>.grid__img</code> 和 卡片内容 <code>.grid__card</code> 的前面。我们将使用 CSS 的相邻选择器（<code>E ~ F</code>）来选中它们：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.link:hover ~ .grid__img,
.link:focus ~ .grid__img {
    
}

.link:hover ~ .grid__card,
.link:focus ~ .grid__card {

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单地分析一下布局的策略。</p><ul><li>将卡片容器 <code>.grid</code> 定义为一个三行三列的网格，将它的 <code>grid-template-columns</code> 和 <code>grid-tempate-rows</code> 属性的值都设置为 <code>repeat(3, minmax(0, 1fr))</code>。</li><li>使用 <code>grid-area</code> 属性，根据网格线名称，将图片 <code>.grid__img</code> 和 <code>.grid__card</code> 放置到相应的位置，比如图片放在卡片左上角，卡片内容放置在卡片右下角，两者在卡片正中间相互交叉与叠加。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16edb28bda4c42ec83f9fe10af4b1ba7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们需要将 <code>a.link</code> 的伪元素 <code>::before</code> 和 <code>::after</code> 分别遮盖在卡片的图片<code>.grid__img</code> 和 <code>.grid__card</code> 上面，为了位置和大小能和它们完全相匹配，采用子网格是较好的一种策略。我们需要做的是：</p><ul><li><code>.link</code> 要和父网格一样的大，简单地说，合并三行三列，使用 <code>grid-area</code> 就可以轻易地实现，因为它也是父网格 <code>.grid</code> 的一个网格项目。</li><li>将 <code>.link</code> 也定义为一个网格，并且将它的 <code>grid-template-columns</code> 和 <code>grid-templage-rows</code> 都设置为 <code>subgrid</code> ，这样就完全继承父网格 <code>.grid</code> 的特性。</li><li>像放置卡片上的缩略图和内容一样，使用 <code>grid-area</code> 将链接<code>.link</code> 的伪元素 <code>.link::before</code> 、<code>.link::after</code> 放置到指定位置，它们的位置和卡片上缩略图和内容区域是相同的：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.link {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a4a7a5fed434adcb214806ef1dfd7c9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>由于卡片上的缩略图（<code>.grid__img</code>）、内容区域（<code>.grid__card</code>）、链接伪元素（<code>.link::before</code> 和 <code>.link::after</code>）会有一定区域的交叉和层叠：</p><ul><li>内容区域（<code>.grid__card</code>）和缩略图（<code>.grid__img</code>）有一定交叉区域（网格线 <code>2 / 2 / 3 / 3</code> 围绕的区域），并且在 <code>z</code> 轴上，内容区域是高于缩略图的，因此要显式设置 <code>z-index</code> 的话，<code>.grid__card</code> 的 <code>z-index</code> 要大于 <code>.grid__img</code> 的。</li><li>链接伪元素 <code>.link::before</code> 和 <code>.link::after</code> 同样在网格线 <code>2 / 2 / 3 / 3</code> 围绕的区域相互交叉，并且在 <code>z</code> 轴上 <code>.link::after</code> 高于 <code>.link::before</code> 。</li><li>链接伪元素 <code>.link::before</code> 和 <code>.link::after</code> 分别与卡片缩略图 <code>.grid__img</code> 和内容区域 <code>.grid__card</code> 相互重叠。在该示例中，为了保证交互效果不出问题，需要确保 <code>.link::before</code> 和 <code>.link::after</code> 在 <code>z</code> 轴上高于 <code>.grid__img</code> 和 <code>.grid__card</code>。</li></ul><p>在这个示例中，默认情况下（即，各个元素上未显式设置 <code>z-index</code> 值），<code>.link</code> 在 <code>z</code> 轴上层级低于 <code>.grid__img</code> 和 <code>.grid__card</code> ，这也造成 <code>.link::before</code> 和 <code>.link::after</code> 两个伪元素在 <code>z</code> 轴上也低于 <code>.grid__img</code> 和 <code>.grid__card</code> 。</p><p>而 <code>.grid__card</code> 在 <code>z</code> 轴上的层级是高于 <code>.grid__img</code> 。这是因为，在 CSS 中如果网格项目未显式设置 <code>z-index</code> 的值，它将按照元素在 HTML 文档源码中出现的顺序为参照值，越在后面出现，在 <code>z</code> 轴的层级越高。</p><p>为了避免卡片内容被缩略图遮盖，同时为了保证卡片上交互正常，我们可以给 <code>.link</code> 和 <code>.grid__content</code> 的 <code>z-index</code> 属性设置一个值：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.link {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来看一个运用 <code>subgrid</code> 布局的卡片组件：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5a8cfff72c34bdcbbd664a69de0476d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>看上去很普通的一个卡片组件，但它有一个很显著的特征，图片的标注和卡片标题是对齐，并且主内容与图片之间有一定的空白间距：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91ea82684caa4552a2a4cec900cc0d24~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可能会说，CSS 实现上图这样的布局效果已经是非常容易的了。这样说并不错，但是在一定的结构限制之下，比如说，为了让 Web 可访问性做得更好一些，对屏幕阅读器更友好一些，构建上图的 HTML 结构可能会是下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;card&quot;&gt;
    &lt;figure&gt;
        &lt;img src=&quot;thumb.jpg&quot; alt=&quot;卡片缩略图&quot; /&gt;
        &lt;figcaption&gt;图片标注&lt;/figcaption&gt;
    &lt;/figure&gt;
    
    &lt;h3 class=&quot;title&quot;&gt;卡片标题&lt;/h3&gt;
    &lt;p&gt;卡片描述&lt;/p&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>试想一下，不管你是准备使用 Flexbox 还是 Grid 来构建布局，要实现上图的效果是没有那么容易的。所以说，当 HTML 结构有一定的限制时，常用的 Web 布局技术要实现起来就显得没那么容易了。不过，使用 CSS 子网格来构建这种卡片布局，就容易很多了。</p><p>我们可以在卡片 <code>.card</code> 上像下面这样定义一个网格：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> .card { 
     display: grid; 
     grid-template-columns: 1fr 1fr 50px 50px 1fr 1fr; 
     grid-template-rows: repeat(3, min-content); 
     gap: 1rem 1.25rem; 
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd058b67da34458b33595b31e2b40b7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>同时 <code>figure</code> 跨五列两行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> figure { 
     grid-row: 2 / span 2; 
     grid-column: 1 / span 5; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9359f11102f48f79a3c9f3e934fc68c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>此时，在 <code>figure</code> 上使用 <code>subgrid</code> ，并将 <code>img</code> 和 <code>figcaption</code> 按网格线放置到指定位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>figure { 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/853fe9fe141e49148d07375d531b2003~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你最终看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cde0a86c6863420cb972207dc1bb1459~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,37),I={href:"https://codepen.io/airen/full/YzvZKxV",target:"_blank",rel:"noopener noreferrer"},O=l(`<h2 id="百分百宽度的条纹布局" tabindex="-1"><a class="header-anchor" href="#百分百宽度的条纹布局" aria-hidden="true">#</a> 百分百宽度的条纹布局</h2><p>百分百宽度的条纹布局其实是 <strong>Full-Bleed</strong> 布局效果的延伸，它看起来像下面这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a229d20e4d943359897c304d489af44~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图这种布局效果也是 Web 布局中常见的一种，它有着自己的特色，比如有全屏的、距离左侧或右侧有一定空白空间的。</p><p>如果我们把整个布局分成三列，类似于 Full-Bleed 布局，左侧和右侧都是自适应的，主栏是固定宽度的。那么：</p><ul><li>全屏就是跨越网格三列；</li><li>距离左侧有一定空白空间就是跨越两列，而且是从主栏起始到右侧栏结束位置；</li><li>距离右侧有一定空白空间就是跨越两列，而且从左侧栏起始到主栏结束位置。</li></ul><p>使用 CSS 网格可以很容易实现 <strong>Full-Bleed</strong> 布局：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;现代 Web 布局：使用 CSS 网格构建 Full-Bleed 布局&lt;/h1&gt;
  &lt;p&gt;Meaning that a ...&lt;/p&gt;
  &lt;section class=&quot;full__bleed&quot;&gt;
    &lt;img src=&quot;https://picsum.photos/2568/600?random=1&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; /&gt;
  &lt;/section&gt;
  &lt;p&gt;Meaning that ...&lt;/p&gt;
&lt;/div&gt;
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

.container &gt; * {
    grid-column: 2;
}

.container .full__bleed {
    grid-column: 1 / -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6d063337c2a49ec8eaf06df9110a258~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),A={href:"https://codepen.io/airen/full/vYrxErN",target:"_blank",rel:"noopener noreferrer"},U=l(`<p>我们只需要将上面的代码稍微调整一下，就可以基于子网格 <code>subgrid</code> 的功能来实现 Full-Bleed 布局。比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.container {
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

.container &gt; * {
    grid-column: main;
    
    display: inherit;
    grid-template-columns: subgrid;
}

.container &gt; * {
    grid-column: main;

    display: inherit;
    grid-template-columns: subgrid;
}

.full__bleed,
.full__bleed &gt; * {
    grid-column: fullbleed;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例中，在 <code>grid-template-columns</code> 定义网格轨道的时候，也显式给网格线命名。<code>.container</code> 容器中所有子元素都被定义为一个子网格，并且 <code>grid-template-columns</code> 设置为 <code>subgrid</code> 。我们都知道，子网格会继承父网格所有特性，你可以使用已命名好的网格线名称来放置网格项目：</p><ul><li>除全宽（百分百宽度）的元素 <code>.full__bleed</code> 之外的其他元素都被放置在 <code>main-start / main-end</code> 列；</li><li>全宽（百分百宽度）的元素 <code>.full__bleed</code> 放置在 <code>fullbleed-start / fullbleed-end</code> 列。</li></ul><p>加上 <code>.container</code> 所有子元素的 <code>display</code> 属性值设置为 <code>inherit</code> ，因此它们都是一个网格（是 <code>.container</code> 网格的子网格），所以它们的子元素，比如 <code>.full__bleed</code> 的子元素 <code>img</code> 也是网格项目。它们都是全宽，即 <code>fullbleed-start / fullbleed-end</code> 。</p><p>使用子网格和直接使用网格构建出来的 Full-Bleed 布局效果是一样的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10eff151fd6b4b148fe04ac06a03359d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),P={href:"https://codepen.io/airen/full/gOKmbQL",target:"_blank",rel:"noopener noreferrer"},Z=l(`<p>有了这个基础，我们就可以来看子网格构建“百分百宽度的条纹布局”了。把 HTML 结构调整一下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;百分百宽度的条纹布局（Subgrid）&lt;/h1&gt;
  &lt;p&gt;Meaning that a ...&lt;/p&gt;
  &lt;section class=&quot;full__bleed fullwidth&quot;&gt;
    &lt;img src=&quot;&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; /&gt;
  &lt;/section&gt;
  &lt;p&gt;Meaning that ...&lt;/p&gt;
  &lt;section class=&quot;full__bleed left&quot;&gt;
    &lt;img src=&quot;&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; /&gt;
  &lt;/section&gt;
  &lt;p&gt;Meaning that ...&lt;/p&gt;
  &lt;section class=&quot;full__bleed right&quot;&gt;
    &lt;img src=&quot;&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; /&gt;
  &lt;/section&gt;
  &lt;p&gt;Meaning that ...&lt;/p&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以像下图这样来定义网格：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bd27b363f8644eda92ddcb51cac7004~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如你所看到的：</p><ul><li>网格第一列和最后一列是一个较小的空白间距，相当于间距一样，比如说 <code>1rem</code>；</li><li>网格第二列和第四列是相等的，占用容器的可用空间，可以使用 <code>fr</code> 单位值来定义，我们这里设置为 <code>minmax(0, 1fr)</code>；</li><li>网格第三列（中间列），它是用来放置居中内容的一列，为了更好地适配不同终端的浏览器屏幕的尺寸，可以将 <code>minmax()</code> 和 <code>min()</code> 函数结合起来使用，比如 <code>minmax(min(var(--limit-min-container-width), 100% - var(--gutter) * 2),var(--limit-max-container-width))</code></li></ul><p>具体代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.container {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和实现 Full-Bleed 布局示例一样，把网格容器 <code>.container</code> 的所有子元素（所有网格项目）设置为子网格，并且显式设置 <code>grid-template-columns</code> 的值为 <code>subgrid</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.container &gt; * {
    display: inherit;
    grid-template-columns: subgrid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1b343aaef8943f4a45949c7d3df1f64~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这样，你就可以使用网格线名称，将网格项目放置到相应的位置，完成最终所需要的布局效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.container &gt; *:not(.full__bleed) {
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
.left &gt; img {
    grid-column: left;
}
​
.left &gt; figcaption {
    grid-column: main;
    justify-self: end;
}
​
.full__bleed.right {
    grid-column: right;
}
​
.right &gt; img {
    grid-column: right;
}
​
.right &gt; figcaption {
    grid-column: main;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/721b53c9f1034ce984799df277ae29d3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),J={href:"https://codepen.io/airen/full/ZEReYVq",target:"_blank",rel:"noopener noreferrer"},Q=l('<p>注意，你也可以在上面示例基础上进一步加工，实现下图这样的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ce60203dffd4b78ba92f17f55352ed8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就当上图是个小作业，感兴趣的同学不妨试一试，看看你能用多少种布局方案实现上图的布局效果。</p><h2 id="时间轴-timeline-组件" tabindex="-1"><a class="header-anchor" href="#时间轴-timeline-组件" aria-hidden="true">#</a> 时间轴（Timeline）组件</h2><p>时间轴卡片组件也是 Web 中常见的一种设计，我们可以在上面的“百分百宽度的条纹布局”技术方案的基础上来构建时间轴卡片组件。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05ed74596f6d4812be9a29d6018f3948~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用网格和子网格，再借助 CSS 媒体查询，你就可以很轻易构建出上图所示的时间轴卡片组件。</p><ul><li>当浏览器视窗宽度大于 <code>768px</code> ，卡片在时间轴上是错开排列的，单数居右，双数居中；</li><li>当浏览器视窗宽度小于 <code>768px</code> ，卡片在块轴方向垂直排列。</li></ul><p>另外，每张卡片的数字指示器，都能和卡片的标题垂直对齐：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24e5367e137b47e2bdcc4818a269ad01~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',10),X={href:"https://codepen.io/airen/full/KKeWVNq",target:"_blank",rel:"noopener noreferrer"},$=l(`<p>上图所示的时间轴卡片组件所需的 HTML 的结构可能会像下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;timeline&quot;&gt;
    &lt;!-- 卡片容器 --&gt;
    &lt;div class=&quot;card--wrapper&quot;&gt;
        &lt;!-- 每张卡片的 HTML 结构 --&gt;
        &lt;div class=&quot;card&quot;&gt;
            &lt;h3 class=&quot;title&quot;&gt;卡片标题&lt;/h3&gt;
            &lt;div class=&quot;card__content&quot;&gt;
                &lt;p&gt;卡片描述内容&lt;/p&gt;
            &lt;/div&gt;
            &lt;!-- 卡片脚部 --&gt;
            &lt;blockquote&gt;
                &lt;svg viewBox=&quot;0 0 512 512&quot; width=&quot;80&quot; title=&quot;quote-left&quot; class=&quot;quote-icon&quot;&gt;
                  &lt;path d=&quot;M46...&quot; fill=&quot;currentColor&quot; /&gt;
                &lt;/svg&gt;
                &lt;p&gt;Dolor ce...&lt;/p&gt;
            &lt;/blockquote&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- 省略其他卡片的 HTML 结构 --&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于构建上图这样的响应式时间轴卡片组件，我们遵循<strong>移动端先行</strong>的原则，即：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0b18e99b46a41ea86b7a13f767bc876~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你已经看到了，时间轴卡片组件的<strong>轴和卡片的数字指示器</strong>都在卡片的左侧，这样一来：</p><ul><li>轴和卡片的数字指示器都在第一列；</li><li>卡片在第二列。</li></ul><p>所以，我们可以在 <code>.timeline</code> 中创建一个两列网格，第一列是用来放置轴和卡片数字指示器的，你可以考虑设定，比如 <code>4rem</code> ，第二列可以把网格的可用空间（除第一列和列间距之外的空间）都留给卡片，可以设置 <code>1fr</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.timeline {
    display: grid;
    grid-template-columns: minmax(4rem, max-content) 1fr;
    gap: 2rem 4px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19582dcd1e8e4bc7978fc1365c8059e7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>按照网格项目放置的方法，将时间轴和卡片放置到指定的位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.timeline::before {
    grid-column: 1 / 2;
}

.card--wrapper {
    grid-column: 1 / 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，示例中的轴线（上图中的“白色竖条”）使用了 <code>.timeline</code> 的伪元素 <code>::before</code> 绘制的，为了让 HTML 结构更简洁以及少嵌套一层子网格，对于时间轴的轴线采用了绝对定位，看上去就像是跨越了网格 <code>.timeline</code> 的所有行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.timeline::before {
    /* 将时间轴线放置在 timeline 网格的第一列中 */
    grid-column: 1 / 2;
    
    /* 绘制时间轴线 */
    content: &quot;&quot;;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不难发现，每张卡片都有两个部分组成，即<strong>卡片数字指示器</strong>和<strong>卡片自身</strong>， 而且卡片数字指示器也是放在第一列，和时间轴线重叠在一起。所以，我们可以将 <code>.card--wrapper</code> 也定义为一个网格，并且继承其父网格 <code>.timeline</code> 的列网格轨道数量和尺寸，即设置 <code>grid-template-columns</code> 的值为 <code>subgrid</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card--wrapper {
    grid-column: 1 / 3;
​
    display: inherit;
    grid-template-columns: subgrid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/169386e8a3ad47be9e6b00bf742e01d8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这样你就可以使用网格线，将卡片数字指示器 <code>.card--wrapper::before</code> 和卡片 <code>.card</code> 放置到指定的位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card--wrapper::before {
    grid-column: 1 / 2;
}
​
.card {
    grid-column: 2;
    grid-row: span 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>特别声明，示例中的卡片数字指示器使用的是 CSS 的计算数器相关特性 <code>counter-reset</code> 、<code>counter-increment</code> 、<code>counter()</code> 和 CSS 伪元素自动生成的。这方面的内容已超出我们这个小册介绍的范围，感兴趣的同学请查阅示例相关源码！</p></blockquote><p>为了让卡片计数器能和卡片标题始终保持垂直对齐，还需要进一步将 <code>.card</code> 也定义为子网格，并且需要将它的 <code>grid-template-rows</code> 设置为 <code>subgrid</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card--wrapper::before {
    grid-column: 1 / 2;
    align-self: center;
}

.card {
    grid-column: 2;
    grid-row: span 3;
  
    display: inherit;
    grid-template-rows: subgrid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>离目标越来越近了，只需要使用媒体查询 <code>@media</code> 在浏览器视窗宽度大于 <code>768px</code> 的条件下，重新定义父网格 <code>.timelne</code> 的列网格轨道的数量和尺寸，并且调整卡时间轴线、卡片数字指示器和卡片的位置，就可以完成最终想要的效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@media only screen and (min-width: 768px) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2103dcd6f9f64f5db52bdd6062442254~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="表单布局" tabindex="-1"><a class="header-anchor" href="#表单布局" aria-hidden="true">#</a> 表单布局</h2><p>表单是 Web 中不可或缺的部分，因为 Web 需要用表单来和用户进行交流，所以将表单布局设计的好就显得尤为重要。比如下面这个登录表单：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c20e8654d3347d88d1e8924b09f0663~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这是一个具有响应式能力的登录表单。暂且抛开其 UI 不谈，就只聊表单控件。在移动端上，布局相对较为简单，表单控件的标签 <code>&lt;label&gt;</code> 、表单控件（比如 <code>&lt;input&gt;</code>）、验证信息等都是垂直排列的。平板和桌面端，由于空间变大，更好地利用水平方向的空间，会把垂直排列的布局，调整为水平排列的布局，即 表单控件标签居左，表单控件和验证信息居右，甚至有的元素占两列，比如上图中的“登录按钮”。</p><p>另外，大多数构建表单一般会采用下面这样的 HTML 结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;form&gt;
    &lt;div class=&quot;control&quot;&gt;
        &lt;label for=&quot;id--name&quot;&gt;标签名&lt;/label&gt;
        &lt;input type=&quot;text&quot; id=&quot;id--name&quot; name=&quot;user-name&quot; placeholder=&quot;用户名&quot; /&gt;
        &lt;p class=&quot;control__help&quot;&gt;验证信息&lt;/p&gt;
    &lt;/div&gt;
&lt;/form&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就上面的 HTML 的结构而言，要实现水平排列的布局是有难度的。即使是没有验证信息这一项，使用 Flexbox 布局也有一定的局限性，尤其是控件标签字数不同，你不得不在标签上 <code>label</code> 设置一个 <code>min-width</code> 值。</p><p>要是使用 CSS 网格来构建的话，就会方便很多，也不用担心标签控件字数，以及有没有其他的辅助元素，因为我们可以使用网格线名称，将元素放置到任意我们想要放置的位置。</p><p>接下来，就以上图为例，一起来看看怎么使用 CSS 网格和子网格实现所需要的表单布局。先来看 HTML 结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;form--wrapper&quot;&gt;
    &lt;div class=&quot;form&quot;&gt;
        &lt;form&gt;
            &lt;h3&gt;登录&lt;/h3&gt;
            &lt;div class=&quot;control&quot;&gt;
                &lt;label for=&quot;user--name&quot;&gt;昵称：&lt;/label&gt;
                &lt;input type=&quot;text&quot; placeholder=&quot;请输入用户 ID&quot; name=&quot;user-name&quot; id=&quot;user--name&quot; /&gt;
                &lt;p&gt;用户 ID 不存在&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class=&quot;control&quot;&gt;
                &lt;label for=&quot;user--password&quot;&gt;密码：&lt;/label&gt;
                &lt;input type=&quot;password&quot; placeholder=&quot;请输入登录密码&quot; name=&quot;user-password&quot; id=&quot;user--password&quot; /&gt;
                &lt;p&gt;密码输入错误&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class=&quot;control&quot;&gt;
                &lt;label for=&quot;remember&quot;&gt;
                    &lt;input type=&quot;checkbox&quot; id=&quot;remember&quot; name=&quot;remember&quot;&gt;
                    请记住我!
                &lt;/label&gt;  
            &lt;/div&gt;
            &lt;div class=&quot;control&quot;&gt;
                &lt;button&gt;登录&lt;/button&gt;
            &lt;/div&gt;
            &lt;div class=&quot;control&quot;&gt;
                &lt;label&gt;没有账号？&lt;a href=&quot;&quot;&gt;点击我注册&lt;/a&gt;&lt;/label&gt;
            &lt;/div&gt;
        &lt;/form&gt;
        &lt;figure&gt;
            &lt;img src=&quot;&quot; alt=&quot;封面图&quot; /&gt;
        &lt;/figure&gt;    
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单地分析一下，基于上面这个 HTML 结构，构建上图表单布局，可能会定义的网格有：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17c33b5d1f0747a29e0d57e418e8260d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li><code>body</code> 定义一个网格，主要用于整体的页面布局，构建一个 Full-Bleed 布局；</li><li><code>.form--wrapper</code> 定义一个网格，是构建表单 UI 主体布局，也是主网格；</li><li><code>.form</code> 是 <code>.form--wrapper</code> 的一个子网格，用于控制 <code>form</code> 和 <code>figure</code> 以及 <code>.form::before</code> 和 <code>.form::after</code> 四个网格项目的位置；</li><li><code>form</code> 重新定义一个网格，用于表单元素上的布局；</li><li><code>.control</code> 是 <code>form</code> 网格的子网格，控制表单标签、表单控件、验证信息等位置。</li></ul><p>接下来简单介绍一个涉及到布局的 CSS 代码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body {
    display: grid;
    grid-template-columns: 
        minmax(1rem, 1fr) 
        minmax(min(100% - 2rem, 1134px), 1fr) 
        minmax(1rem,1fr);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码就不多说了，前面出现很多次了，即 Full-Bleed 布局代码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.form--wrapper {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.form</code> 网格是 <code>.form--wrapper</code> 网格的子网格，它继承了其父网格所有参数：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6234181631c54978acb6c62a0cfad323~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在移动端下，网格项目都层叠在一起，如上图所示，整个表单 <code>&lt;form&gt;</code> 堆叠在图片 <code>&lt;figure&gt;</code> 之上。这在网格布局中是很容易就能做到的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.form &gt; * {
    grid-area: 1 / 1 / -1 / -1;
}

.form::before,
.form::after {
    grid-area: 1 / 1 / -1 / -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在平板和桌面端时，使用 CSS 媒体查询特性来调整 <code>.form</code> 网格的列轨道，并且将 <code>&lt;form&gt;</code> 和 <code>&lt;figure&gt;</code> 位置调整为水平排列，不再是堆叠在一起了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfae34b4f659486899e2d44f81decef3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@media only screen and (min-width: 768px) {
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
    .form &gt; form {
        grid-column: 2 / 3;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用同样的方法，分别将 <code>form</code> 和 <code>.control</code> 定义为网格。注意，这里的 <code>form</code> 网格只是 <code>.from</code> 网格的嵌套网格，它们是两个相互独立的网格，但 <code>.control</code> 网格却是 <code>form</code> 网格的子网格：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>form {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/891e6f508d5c42b59da552323a608339~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>根据网格线，将网格项目放置到指定位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>form &gt; * {
    grid-column: span 2;
}
​
.control &gt; * {
    grid-column: 1 / -1;
}
​
.control:nth-last-child(-n + 3) {
    grid-row: span 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在桌面端时，调整相关的位置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@media only screen and (min-width: 1024px) {
    .control {
        grid-row: span 2;
    }
​
    .control &gt; label {
        grid-column: 1;
        justify-self: end;
    }
​
    .control &gt; input {
        grid-column: 2;
    }
​
    .control &gt; p {
        grid-row: 2;
        grid-column: 2;
    }
​
    .control:nth-last-child(3) &gt; label,
    .control:last-child &gt; label {
        grid-column: 1 / -1;
        justify-self: start;
    }
​
    form h3 {
        justify-self: start;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终示例用到的布局代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body {
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
.form &gt; * {
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
form &gt; * {
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
.control &gt; * {
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
    .form &gt; form {
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
    .control &gt; label {
        grid-column: 1;
        justify-self: end;
    }
​
    .control &gt; input {
        grid-column: 2;
    }
​
    .control &gt; p {
        grid-row: 2;
        grid-column: 2;
    }
​
    .control:nth-last-child(3) &gt; label,
    .control:last-child &gt; label {
        grid-column: 1 / -1;
        justify-self: start;
    }
​
    form h3 {
        justify-self: start;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终的效果如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92984e5b70f54a61a92242f9278811b2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,59),ee={href:"https://codepen.io/airen/full/LYrWMwP",target:"_blank",rel:"noopener noreferrer"},ie=e("h2",{id:"小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#小结","aria-hidden":"true"},"#"),i(" 小结")],-1),ne=e("p",null,[i("上面提到的示例只是使用子网格布局的几个常见的案例，事实上在 Web 布局中还有很多潜在的用例可以使用子网格来构建。简单地说，"),e("strong",null,"CSS 子网格将打开许多以前不可能的可能性"),i("。正如上面示例所展示的一样，在 CSS 子网格布局的基础上，你只需要添加一点点媒体查询的代码，就可以构建出适配更多终端平台的布局。")],-1),de=e("p",null,"事实上，除了子网格和媒体查询结合之外，我们还可以使用容器查询和子网格一起来构建出组件式响应的布局。你将会感觉到，CSS 怎么能这么容易就实现了响应式布局。有关于这方面更详细的介绍，我们将在响应式布局的课程中与大家探讨。",-1),le=e("p",null,"心动不如行动，最后给大家布置一个小作业，请使用 CSS 子网格构建下图中天气组件的布局：",-1),se=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afff8ca9c9ec4cde8820b8a9250726cc~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1);function ae(re,ce){const n=a("ExternalLinkIcon");return r(),c("div",null,[v,e("p",null,[i("我们花了一节课（《"),e("a",u,[i("网格布局中的子网格和嵌套网格"),d(n)]),i("》）专门介绍了网格布局中的子网格和嵌套网格的基础知识。并且阐述了为什么需要子网格布局。这节课，我将带领大家了解子网格的一些潜在案例，即子网格可用于哪些 Web 中布局中。")]),m,o,b,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",p,[i("https://codepen.io/airen/full/zYaKmpZ"),d(n)])])]),g,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",f,[i("https://codepen.io/airen/full/abKmQWj"),d(n)])])]),h,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",x,[i("https://codepen.io/airen/full/poKNLbE"),d(n)])])]),_,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",q,[i("https://codepen.io/airen/full/oNyzOYj"),d(n)])])]),k,y,w,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",j,[i("https://codepen.io/airen/full/abKBLGJ"),d(n)])])]),z,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",S,[i("https://codepen.io/airen/full/GRGNyVO"),d(n)])])]),M,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",C,[i("https://codepen.io/airen/full/eYKggqV"),d(n)])])]),L,W,B,T,N,e("p",null,[i("我们一起来看一个很有创意性的示例，这个示例是 "),e("a",D,[i("@Michelle Barker 在 Codepen 上写的"),d(n)]),i("，我觉得很有创意，就拿来和大家一起探讨。示例的效果如下：")]),H,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",K,[i("https://codepen.io/airen/full/poKRPxz"),d(n)]),i(" 注意，上图这个效果是在 "),e("a",Y,[i("@Michelle Barker"),d(n)]),i("提供的案例上做了改良的 ！")])]),F,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",V,[i("https://codepen.io/shadeed/full/jOOwwpY/66e9c2039b50463d96a2a9832f05ec0f"),d(n)])])]),e("p",null,[i("伪元素实现该交互效果的详细介绍并不是我们这个课程要介绍的重点，如果你对这种技术感兴趣，可以移步阅读 @Ahmad Shadeed的《"),e("a",R,[i("Uncommon Use Cases For Pseudo Elements"),d(n)]),i("》，或早前我整理的一篇关于 CSS 伪元素的教程《"),e("a",E,[i("伪元素能帮我们做些什么？"),d(n)]),i("》。")]),G,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",I,[i("https://codepen.io/airen/full/YzvZKxV"),d(n)])])]),O,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",A,[i("https://codepen.io/airen/full/vYrxErN"),d(n)])])]),U,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",P,[i("https://codepen.io/airen/full/gOKmbQL"),d(n)])])]),Z,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",J,[i("https://codepen.io/airen/full/ZEReYVq"),d(n)])])]),Q,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",X,[i("https://codepen.io/airen/full/KKeWVNq"),d(n)])])]),$,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ee,[i("https://codepen.io/airen/full/LYrWMwP"),d(n)])])]),ie,ne,de,le,se])}const ve=s(t,[["render",ae],["__file","index-17.html.vue"]]);export{ve as default};
