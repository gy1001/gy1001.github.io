import{_ as c,M as s,p as o,q as t,R as e,t as i,N as d,a1 as l}from"./framework-e8cb8151.js";const a={},r=e("h1",{id:"_24-内在-web-设计",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_24-内在-web-设计","aria-hidden":"true"},"#"),i(" 24-内在 Web 设计")],-1),m={href:"https://twitter.com/jensimmons",target:"_blank",rel:"noopener noreferrer"},u=e("strong",null,"An Event Apart Boston",-1),p={href:"https://talks.jensimmons.com/15TjNW",target:"_blank",rel:"noopener noreferrer"},v=e("strong",null,"内在 Web 设计",-1),b=e("strong",null,"响应式网页设计+",-1),g=l(`<h2 id="什么是内在-web-设计" tabindex="-1"><a class="header-anchor" href="#什么是内在-web-设计" aria-hidden="true">#</a> 什么是内在 Web 设计？</h2><p>直到现在，大多数的 Web 设计和布局都是以设计为导向，因为在构建 Web 布局时，都是基于设计师提供的设计稿（模板）来完成。因此，你不难发现，现存于线上的很多 Web 页面上的元素大小（尺寸）基本上都设置了固定的尺寸，而且这些尺寸是根据最初设计师提供的稿子定义的。</p><p>事实上呢？Web 的数据是动态的，服务端吐出的数据与最初设计稿内容有可能并不匹配（有多，也有少），此时呈现给用户的 Web 页面并不是最佳的（有可能很多空白空间未利用，有可能内容溢出容器，打破布局）。反之，Web 的内在尺寸设计就不同，在 Web 布局时，页面元素大小是根据真实内容（服务端吐出的数据）来决定的。</p><p>来看一个简单地示例，假设你从设计师手上拿到这样的一张设计稿：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df4cb69bc0a14291b11508d0689efec8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>拿示例中的 “View Themes” 按钮为例吧。大部分 Web 开发者拿到设计图，就会测量该按钮的几个视觉重要参数，比如 <code>width</code> 、<code>height</code> 和 <code>padding</code> 之类（如上图所示），然后就会根据设计稿所提供的模板尺寸进行开发：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 60px;
    padding: 24px 46px;
    text-transform: uppercase;
    border: 2px solid currentColor;
    color: #fff;
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况之下， Web 开发者还原出来的结果都符合设计稿需求，但突然说输出给按钮的内容不是设计稿模板提供的内容，或者说按钮字号稍微调整。还原出来的结果就不一定符合设计稿的需求了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/534b72f30b5e4b2faafcbe0ce43b9729~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),f={href:"https://codepen.io/airen/full/dyKENyW",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>这就是典型的以设计为主，而不是以内容为主。如果我们在开发的时候，能以内容为主，而不是以设计为主时，事情一节都变得更美好。</p><p>我不关心你输出的内容是什么，我的样式也能更接近设计稿，比如把上面样式中的 <code>width</code> 和 <code>height</code> 的值替换成其他值，比如 <code>auto</code> 或 <code>min-content</code> 或 <code>max-content</code> ，就不会出现上图所示现象：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>button {
    width: max-content;
    min-width: 230px;
    min-height: 60px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b655e2bf26b5421c9802dca727262df9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),S={href:"https://codepen.io/airen/full/KKeLazj",target:"_blank",rel:"noopener noreferrer"},_=l('<p><strong>这就是内在 Web 设计的优势和主要特性之一，即 以内容来驱动设计 。</strong></p><p>与将设计人员和开发人员都限制在 Web 的“预定义规则”中不同，内在 Web 设计（Intrinsic Web Design）使他们能够灵活地将传统的、久经考验的 Web 布局技术和现代布局方法和工具（比如 Flexbox，Grid 等）结合起来，以便根据 Web 的内在内容创造独特的布局 。</p><p>用最简单的术语来说：</p><blockquote><p><strong>内在 Web 设计（Intrinsic Web Design）不是内容以设计为导向（Content Design-Driven），而是只专注于让设计受内容驱动（Design Content-Driven）</strong> 。</p></blockquote><p>就 Web 布局来说，它是继响应式 Web 设计之后又一个布局技术转折点：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3ed00218975473e94e05c6041631c06~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>自从 Web 诞生以来，Web 开发者一直都在使用大量的 Hack 来完成所有与 Web 布局相关的事情，比如使用浮动（<code>float</code>）、引用外部第三方 CSS 框架（CSS Frameworks）和库（比如 Bootstrap）。而“内在 Web 设计”可以在“用最少的代码和复杂 Web 设计”之间取得完美的平衡。</p><h2 id="内在-web-设计的关键原则" tabindex="-1"><a class="header-anchor" href="#内在-web-设计的关键原则" aria-hidden="true">#</a> 内在 Web 设计的关键原则</h2><p>这么多年来，流动布局（Fluid Layout）和固定宽度布局（Fixed Width Layout）还是绝大多数开发者采用的布局方式，即使是响应式 Web 设计（RWD：Responsive Web Design）出现之后，也未得到较大的改善。而 Jen 提出的内在 Web 设计（IWD：Intrinsic Web Design）相对而言却有很大的不同，就拿和 RWD 的三个关键原则相比（了解 RWD 的同学都知道，它具有三大关键原则，即<strong>流体网格 Fluid Grids</strong> 、<strong>灵活的图片 Flexible Images</strong> 和<strong>媒体查询 Media Queries</strong> ）：</p><ul><li>RWD 具有灵活的图片（Flexible Images），而根据情况，<strong>IWD 允许你使用灵活的图片和固定尺寸的图片</strong>；</li><li>RWD 的流体网格（Fluid Grids）仅仅只是列（即流体列 Fluid Columns），它是一维的（这里所说的Grids 并不是 CSS 的 Grid 模块，是我们常说的网格系统），而 <strong>IWD 使用的是二维的流体网格，它的列和行都是流体的，即原生的 CSS Grid 模块</strong>；</li><li>RWD 需要借助 CSS 媒体查询模块特性才能让 Web 页面具有响应，而 <strong>IWD 不一定要依赖媒体查询</strong>。</li></ul><p>换句话说，每一种设计都有自己的关键原则，内在 Web 设计也是如此。Jen 在她的分享中说“内在 Web 设计具有六个关键原则”：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ade138acb3045f9a8effb6cad95e08e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>即：</p><ul><li><strong>Fluid &amp; fixed</strong> ：内在 Web 设计不只是使用灵活的图像，而是提倡根据上下文同时使用固定和流体的方法。此外，利用 CSS <code>object-fit</code> 属性，你现在可以在垂直和水平方向调整图像大小，而不会让图像失去宽高比。</li><li><strong>Stages of Squishiness</strong> ：内在 Web 设计有更宽松的选择，在 CSS Grid 模块中引入了布局如何响应 Web 页面的内在上下文的新方法。对于 Web 开发者而言，有更宽松的选择，比如网格轨道的尺寸设置，开发者可以给网格轨道设置固定的尺寸大小、根据可用空间让客户端自动给网格轨道分配大小（CSS Grid 的 <code>fr</code> 单位，有点类似 Flexbox 的 <code>flex</code>）、使用 <code>minmax(min,max)</code> 给网格轨道尺寸大小设置一个范围或给网格轨道设置 <code>auto</code> 值，让其根据其上下文内容来决定网格轨道尺寸。你可以将它们组合起来使用，让 Web 元素更好地交互和相互协作。</li><li><strong>Rows &amp; Columns</strong> ：指的是在 CSS Grid 模块的帮助下，内在 Web 设计使你能够构建一个真正的二维布局。现在不仅有灵活的列，还有灵活的行，以及上一条提到的几个宽松点，都可以用于列和行。你甚至可以在块方向（Block Axis）和内联轴方向（Inline Axis）创建布局所需的空白区域。</li><li><strong>Nested Contexts</strong> ：内在 Web 布局中，你可以拥有嵌套的上下文，比如 Flexbox（FFC）中嵌套 Grid(GFC)、Grid（GFC）嵌套 Flexbox（FFC）等，你可以选择和混合最好的布局方法构建一个最具灵活性的 Web 布局。</li><li><strong>Ways Expand &amp; Contract</strong> ：在内在 Web 设计中引入了几种新的方法来对 Web 页面上的内容进行扩展和收缩，即挤压和收缩（如灵活的图片 Flexible Images）、换行和回流（像处理文本一样，可以自动换行）、添加和删除空白（比如间距会扩展和收缩）以及重叠（像定位一样，一个元素重叠在另一个元素上）。现在，你可以做很多事情，比如不依赖媒体查询来根据屏幕大小调整页面元素的尺寸。</li><li><strong>Media Queries, As Needed</strong> ：内在 Web 设计中，是可以不依赖 CSS 媒体查询让 Web 页面作出响应的，比如 CSS Grid 布局中的 RAM 布局技术（<code>repeat()</code>、<code>minmax()</code> 和 <code>auto-fill</code> 或 <code>auto-fit</code> 的组合），比如 CSS 的比较函数 <code>min()</code>、<code>max()</code> 和 <code>clamp()</code>， 都可以让我们不依赖 CSS 媒体查询实现响应式布局。</li></ul><p>这就是内在 Web 设计的关键原则，也可以说是内在 Web 设计的美丽和力量！</p><p>值得一提的是，时至今日，原生的 CSS Grid 相关特性也可以运用于 RWD 中，只不过当初提出响应式设计概念时，原生 CSS Grid 模块还不够完善，浏览器对其支持度也欠佳。但这几年中，CSS 技术得到突飞猛进的发展，而且主流浏览器对CSS 新持性支持的响应速度越来越快。或者说，我们在不同的时间节点，对 Web 布局技术提法（或者说概念）是有一定差异的，新的概念对应新的布局方法。</p><h2 id="内在-web-设计可能会用到的-css-技术" tabindex="-1"><a class="header-anchor" href="#内在-web-设计可能会用到的-css-技术" aria-hidden="true">#</a> 内在 Web 设计可能会用到的 CSS 技术</h2><p>我想大家更为关注的是，构建一个内在 Web 设计时会使用到哪些 CSS 技术，这里简单地说，它可能会涉及到：</p><ul><li>CSS 内在尺寸与外在尺寸；</li><li>图片的适配处理；</li><li>不依赖 CSS 媒体查询让 Web 具备响应式能力；</li><li>内在 Web 设计的上下文之间间距；</li><li>CSS 容器查询。</li></ul><p>先来看 CSS 内在尺寸与外在尺寸。</p><h3 id="css-内在尺寸与外在尺寸" tabindex="-1"><a class="header-anchor" href="#css-内在尺寸与外在尺寸" aria-hidden="true">#</a> CSS 内在尺寸与外在尺寸</h3><p>对于 Web 布局而言，它有两个关键，即 <strong>大小和 上下文</strong> 。其中大小是用来确定元素的尺寸，上下文是用来确定视觉呈现的模式。这两个概念在 CSS 中是最基础不过的两个。</p><p>在 CSS 的世界中，任何一个元素都会被视作为一个盒子，就像我们的柜子一样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bbf1faa5b474d80ab0bce1720888871~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>每一个盒子就是一个框，框的大小是由 CSS 的盒模型相关属性决定的。随着 CSS 逻辑属性的出现，CSS 的盒模型也可以分为 物理盒模型 和 逻辑盒模型，两种盒模型都有其对应的 CSS 属性：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbd1ba0c882f47caab90b13c349b44b6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>抛开盒模型中其他属性不说（比如 <code>border</code> 和 <code>padding</code>，它们也会影响框的大小），其中 <code>width</code> 和 <code>height</code>（物理属性）；<code>inline-size</code> 和 <code>block-size</code> （逻辑属性）是用来设置框大小最直接的 CSS 属性。</p><blockquote><p><code>width</code>、<code>height</code>、<code>inline-size</code> 和 <code>block-size</code> 都可以在其前面添加前缀 <code>min-</code> 或 <code>max-</code>，用来限制框大小的下限或上限。</p></blockquote>',28),x=e("code",null,"auto",-1),k=e("code",null,"<length-percentage>",-1),C=e("code",null,"min-content",-1),j=e("code",null,"max-content",-1),w=e("code",null,"fit-content(<length-percentage>)",-1),W=e("code",null,"stretch",-1),y=e("code",null,"fit-content",-1),q=e("code",null,"contain",-1),z={href:"https://www.w3.org/TR/css-sizing-4/",target:"_blank",rel:"noopener noreferrer"},R=l(`<blockquote><p>注意，其中 <code>min-*</code> 开头的属性（<code>min-width</code>、<code>min-height</code>、<code>min-inline-size</code> 和 <code>min-block-size</code>）的初始值是 <code>auto</code>，它们不接受 <code>none</code> 值；反过来，<code>max-*</code> 开头的属性（<code>max-width</code>、<code>max-height</code>、<code>max-inline-size</code> 和 <code>max-block-size</code>）的初始值是 <code>none</code>，它们不接受 <code>auto</code> 值。</p></blockquote><p>这些属性值都是用来决定框尺寸的大小，但它们之间是有差异的，其中有些属性值会让框的大小由框里的内容（元素中的内容）来决定，有些属性值会让框的大小由上下文来决定。</p><p>换句话说，<strong>在 CSS 中给一个元素框设置大小时，有的是根据元素框内在的内容来决定，有的是根据上下文来决定的</strong> 。它们分别就是 CSS 中的“<strong>内在尺寸（Intrinsic Size）</strong> ”和“<strong>外在尺寸（Extrinsic Size）</strong> ”：</p><ul><li><strong>内在尺寸</strong> ：元素根据自身的内容（包括其后代元素）决定大小，而不需要考虑其上下文，其中 <code>min-content</code>、<code>max-content</code> 和 <code>fit-content</code> 能根据元素内容来决定元素大小，因此它们统称为<strong>内在尺寸</strong>。</li><li><strong>外在尺寸</strong> ：元素不会考虑自身的内容，而是根据上下文来决定大小，最为典型的案例，就是 <code>width</code>、<code>min-width</code>、<code>max-width</code> 等属性使用了 <code>%</code> 单位的值 。</li></ul><p>来看一个简单的示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 外在尺寸 */
.box-demo {
    width: 400px;
    height: 400px;
}

/* 内在尺寸 */
.box-demo[data-sizing=&quot;intrinsic&quot;] {
    width: max-content;
    height: max-content;
}

.box-layout {
    display: grid;
    width: max-content;
    gap: 0.5rem;
    grid-template-columns: 1fr min-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec7b0c8b047345c4b11a778603d18aec~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),F={href:"https://codepen.io/airen/full/qBKGrEK",target:"_blank",rel:"noopener noreferrer"},M=l("<p>上面聊到的是决定盒子大小的因数，只不过在 CSS 中，每个盒子可以具有不同类型的盒子。不同类型的盒子又被称为视觉格式化模型，也常称上下文格式化模型，它主要由 CSS 的 <code>display</code> 属性来决定。换句话说，<code>display</code> 取不同值时，可以得到不同类型的视觉格式模型，比如大家常说的 BFC、FFC、GFC 等。</p><p>视觉格式化模型对于 Web 布局有着决定性的影响，因为它会决定 CSS 中每个盒子的位置，甚至也会影响到盒子的尺寸大小。尤其是在 Flexbox 和 Grid 布局中，很多时候即使你显式设置了一个固定尺寸，也会受到影响。比如在 Flexbox 或 Grid 布局中改变对齐方式；Flexbox 布局中显式给 Flex 项目设置 <code>flex:1</code> ；网格轨道以 <code>fr</code> 单位来设置等等。</p><p>这主要是因为，在 FFC 或 GFC 模型下，将会影响上下文中的盒子尺寸的计算。具体怎么影响，这里就不详细展开了，就拿内在尺寸 <code>fit-content</code>、<code>max-content</code>和<code>min-content</code>为例，其中 <code>fit-content</code> 容器的可用空间有极强的关联。</p><p>在阐述 <code>min-content</code> 、<code>max-content</code> 和 <code>fit-content</code> 之前，有几个以前未介绍的概念有必要与大家简单介绍一下，这有助于大家更好理解这几个属性值：</p><ul><li><strong>允分利用可用空间</strong> ： 在 HTML 中有一些块元素（块盒子），如果不做任何样式的设置，客户端对这些块元素的宽度解析的值是 <code>100%</code>。这种允分利用可用空间的行为常称为 <strong><code>fill-available</code></strong> 。</li><li><strong>收缩与包裹</strong> ： 在 CSS 中，我们可以通过一些样式改变元素在浏览器中默认显示的行为，比如在一个 <code>div</code> 元素上使用 <code>display</code> 改变其格式化上下文；比如使用 <code>float</code>、<code>position</code> 让元素脱离文档流。其实这个时候也会让元素有一个收缩行为，根据内容将元素大小收缩到最合适之处（刚刚好容纳下元素内容）。这种行为事实上和 CSS 的 <code>fit-content</code> 很相似。</li><li><strong>收缩到最小</strong> ： 大家是否还记得 <code>table</code> 用来布局，或者做数据统计表的时候，会发现单元格 <code>td</code> 的宽度总是会受到其他单元格的影响，哪怕是显式地给 <code>td</code> 设置了 <code>width</code>。该表现行为和 CSS 的<code>min-content</code> 是相似的。</li><li><strong>超出容器限制</strong> ： 这个大家应该熟悉，比如在文本内容中有 <code>url</code> 长地址出现时，就有可能会溢出容器显示。在 CSS 中使用 <code>white-space: nowrap</code> 也可以让文本不断行，溢出容器显示。CSS 的<code>max-content</code> 和这个表现行为有类似之处。</li></ul>",5),H={href:"https://twitter.com/stefanjudis",target:"_blank",rel:"noopener noreferrer"},D={href:"https://twitter.com/stefanjudis/status/1329345425640464384",target:"_blank",rel:"noopener noreferrer"},L=e("code",null,"min-content",-1),G=e("code",null,"max-content",-1),N=e("code",null,"fit-content",-1),T=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c481a2f1f374d8dbc228c38b7ba55ee~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),I=e("p",null,[i("我们通过下面这个示例来向大家阐述内在尺寸 "),e("code",null,"min-content"),i(" 、"),e("code",null,"max-content"),i(" 和 "),e("code",null,"fit-content"),i(" 之间的差异：")],-1),K=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d54c70a686e04ae883cd35abde11b2c2~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),E={href:"https://codepen.io/airen/full/jOKoBMM",target:"_blank",rel:"noopener noreferrer"},A=l(`<p>首先在示例中创建一个 <code>div</code>，该 <code>div</code> 作为容器，里成包含了一个 <code>img</code> 和两个段落标签：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;content&quot; id=&quot;variable&quot;&gt; 
    &lt;img src=&quot;/avatar_207.png&quot; alt=&quot;&quot;&gt; 
    &lt;p&gt;Extrinsic sizing d...&lt;/p&gt; 
    &lt;p&gt;Web自1989到今年刚好走过30年历程。。。&lt;/p&gt; 
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>div</code> 没有显式设置 <code>width</code> 时，它通常会水平扩展到容器允许的宽度。在垂直方向上，它可以根据自己的内容进行折叠。比如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50a03d6c1327477cbe75d4a5c9b74a7a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图就是 <code>div</code> 块元素默认渲染行为。 如果在 <code>div</code> 元素上运用 <code>min-content</code>：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.min-content { 
    width: min-content; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>容器宽度会成为最窄的宽度，其大小适合最宽的子元素。在这个示例中，是 <code>img</code> 元素的宽度：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d6fbff7c31e48f884fe24a7f9e1e6f6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果我们把 <code>img</code> 元素删除，那么宽度将是最长英文单词的宽度和把英文这个段落删除，只留下中文：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00fcb8ac70af4b22abb8cf0eb3d2e12c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果把 <code>div</code> 的宽度设置为:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.max-content { 
    width: max-content; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现效果就好比在 <code>p</code> 元素上设置了：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>p { 
    white-space: nowrap; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>div</code> 中的内容不会被分解成更小的块，而是完全不考虑容器的大小，直接溢出容器（除非内容总宽度不足容器的宽度之外）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de2855f1a7de4f4387418a6846a1f8d5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果把 <code>div</code> 的 <code>width</code> 设置为 <code>fit-content</code>，将会试图容纳最宽的内容，同时仍然尊重它的容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4aa4da1590d84e609aceeec70fb2f3c0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果上面这个示例过于复杂，我们来看一个简单示例，分别给 <code>h1</code> 的 <code>width</code> 设置了<code>auto</code>、<code>min-content</code> 、<code>max-content</code> 和 <code>fit-content</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>h1[data-width=&quot;auto&quot;] {
    width: auto;
}

h1[data-width=&quot;min-content&quot;] {
    width: min-content;
}

h1[data-width=&quot;max-content&quot;] {
    width: max-content;
}

h1[data-width=&quot;fit-content&quot;] {
    width: fit-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3c558b3ae8a46d49f688a95eb3a18f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,21),V={href:"https://codepen.io/airen/full/mdKYWjy",target:"_blank",rel:"noopener noreferrer"},X=l(`<p>回过头来说，元素 <code>width</code> 取值 <code>&lt;length&gt;</code> 、<code>&lt;percentage&gt;</code> 、<code>auto</code> 、<code>min-content</code> 和 <code>max-content</code> 对于大家来说都易于理解，但当取值为 <code>fit-content</code> 时多少会令大家感到困惑。对于 <code>fit-content</code> ，它会检查可用空间（<strong><code>fill-available</code></strong>）与 <code>max-content</code> 和 <code>min-content</code> 大小，最后决定 <code>width</code> 取值：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faae224268a74ff9ad31f7ee261c11d3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，从本质上讲，<code>fit-content</code> 是以下内容的简写模式：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.box {
    width: fit-content;
}

/* 等同于 */
.box {
    width: auto;
    min-width: min-content;
    max-width: max-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，在 CSS 中，我们现在有两种设置大小的方式：<strong>内部尺寸设置</strong> 和 <strong>外部尺寸设置</strong> 。后者是最常见的，这意味着使用固定的元素宽度或高度值。这样做有一个极大的缺陷，<strong>内容断行或内容溢出</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ca171b28a80483abb714c78bb047ce0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>很多时候我们并不知道容器的内容会是什么，所占宽度是多少，这就会造成上图的现象。所以我们设置元素尺寸大小时，使用 <code>min-content</code>、<code>max-content</code> 和 <code>fit-content</code> 就可以让元素的大小取决于它的内容大小。避免内容溢出或断行等现象。</p>`,7),J=e("code",null,"min-content",-1),B=e("code",null,"max-content",-1),Y=e("code",null,"fit-content",-1),Z=e("code",null,"width",-1),O=e("code",null,"flex-basis",-1),U={href:"https://juejin.cn/book/7161370789680250917/section/7161623717074698247",target:"_blank",rel:"noopener noreferrer"},Q=e("code",null,"flex-basis",-1),P=e("code",null,"min-content",-1),$=e("code",null,"max-content",-1),ee=e("code",null,"fit-content",-1),ie=e("p",null,[i("当 Flex 容器有足够空间时容纳所有 Flex 项目（Flex 项目未显式设置具体的宽度值），那么 Flex 项目的 "),e("code",null,"flex-basis"),i(" 值为 "),e("code",null,"max-content"),i(" 和 "),e("code",null,"fit-content"),i(" 的效果等同于 "),e("code",null,"auto"),i(" ：")],-1),ne=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61878575d31a44148ecfafefde881e20~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),de=e("code",null,"flex-shrink",-1),le=e("code",null,"1",-1),ce=e("code",null,"flex-shrink",-1),se={href:"https://juejin.cn/book/7161370789680250917/section/7164357320367931399",target:"_blank",rel:"noopener noreferrer"},oe=e("code",null,"flex-basis",-1),te=e("code",null,"flex-basis",-1),ae=e("code",null,"min-content",-1),re=l('<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f4823309da6426da84a70b44a6ce1a6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>只不过要将 <code>flex-shrink</code> 的值由 <code>1</code> 变成 <code>0</code> ，让所有 Flex 项目不可收缩，那么 <code>flex-basis</code> 取值 <code>max-content</code> 时就会和 Flex 容器有足够的空间表现一样，不同的是 Flex 项目会溢出 Flex 容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1edfba722e9f4e19917690670fc70d96~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>flex-basis</code> 取值为 <code>min-content</code> 时，不管 Flex 容器是否有足够空间容纳 Flex 项目，它们的表现都是相似的，都以最长字符串的单词计算值为最终值：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ba60fdbccf74602b673d911cedd6b0f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>flex-basis</code> 取值为 <code>min-content</code> 时，Flex 项目的 <code>flex-shrink</code> 的值不管是不是 <code>1</code> ，它始终以 <code>min-content</code> 为计算值。同样的，Flex 容器足够小，小到无法容纳所有 Flex 项目的 <code>min-content</code> 计算值总和时，Flex 项目会溢出 Flex 容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ac53acb87fa40d08823938cf5810bb5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',7),me={href:"https://codepen.io/airen/full/eYKaXEp",target:"_blank",rel:"noopener noreferrer"},ue=l("<p>注意，上面示例中的 <code>flex-grow</code> 值是默认值 <code>0</code> ，而且前面关于 Flexbox 的课程中有多次提到过，Flex 项目的 <code>flex-basis</code> 最终计算值会受 Flex 容器大小（剩余空间和不足空间）、Flex 项目扩展因子（<code>flex-grow</code>）和 Flex 项目的收缩因子（<code>flex-shrink</code>）等参数影响。</p><p>同样的，<code>min-content</code> 、<code>max-content</code> 也可以用于 CSS Grid 的布局中，可以用来设置网格轨道的尺寸。它们可以用于 <code>grid-template-columns</code> 、<code>grid-template-rows</code> 、<code>grid-auto-columns</code> 和 <code>grid-auto-rows</code> 属性上。它们运用于网格轨道的设置上要比用于 CSS Flexbox 布局中的 <code>flex-basis</code> 简单得多。</p><p>另外，<strong>CSS 的</strong> <strong><code>fit-content</code></strong> <strong>用于网格轨道尺寸设置时会被视为一个无效值</strong> ，但在网格布局布局中，有一个 <code>fit-content(&lt;length-percentage&gt;)</code> 函数可用于设置网格轨道尺寸。我们需要注意的是 <code>fit-content</code> 和 <code>fit-content(&lt;length-percentage&gt;)</code> 是完全不同的特性。</p>",3),pe=e("code",null,"fit-content()",-1),ve={href:"https://juejin.cn/book/7161370789680250917/section/7161624041885958151",target:"_blank",rel:"noopener noreferrer"},be=e("code",null,"min-content",-1),ge=e("code",null,"max-content",-1),fe=e("code",null,"minmax(MIN, MAX)",-1),he={href:"https://juejin.cn/book/7161370789680250917/section/7161624041885958151",target:"_blank",rel:"noopener noreferrer"},Se=e("p",null,[i("接下来，将 "),e("code",null,"grid-template-columns"),i(" 分别取 "),e("code",null,"auto"),i(" 、 "),e("code",null,"min-content"),i(" 和 "),e("code",null,"max-content"),i(" 值，来设置列网格轨道尺寸为例。")],-1),_e={href:"https://juejin.cn/book/7161370789680250917/section/7161624078397210638",target:"_blank",rel:"noopener noreferrer"},xe=e("code",null,"auto",-1),ke=e("code",null,"1fr",-1),Ce=e("code",null,"grid-template-rows",-1),je=e("code",null,"grid-template-columns",-1),we=e("code",null,"auto",-1),We=e("code",null,"auto",-1),ye=l(`<ul><li><strong>作为最大值</strong> ：将是以网格轨道的网格项目的最大内容为最终计算值，与 <code>max-content</code> 不同的是，它允许通过对齐属性来扩展网格轨道尺寸。</li><li><strong>作为最小值</strong> ：将是以网格轨道中的最大网格项目的最小尺寸为最终计算值，这主要由网格项目的 <code>min-width</code> 、<code>min-height</code> 或它们对应的逻辑属性 <code>min-inline-size</code> 或 <code>min-block-size</code> 指定。</li></ul><p>简单地说，比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.grids {
    display: grid;
    grid-template-columns: repeat(3, auto);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照对 <code>auto</code> 的一般理解，当 <code>grid-template-columns</code> 在设置列网格轨道尺寸的值为 <code>auto</code> 时，每列的宽度应该是所在列中网格项目内容最多的尺寸。应该内容有多长，列网格轨道尺寸就有多大，相当于 <code>max-content</code> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a21fc2e46bb49feb76ef0202ccdd2cb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>需要记住的是，<strong>当网格项目内容相同时，那么</strong> <strong><code>auto</code></strong> <strong>和</strong> <strong><code>1fr</code></strong> <strong>具有相同的效果，即平均占用网格容器可用空间。</strong></p><p>就上例而言，如果将所有列网格轨道的尺寸都换成 <code>min-content</code> ，它最终的尺寸也像是 Flexbox 布局一样，以最长字符串长度为最终长度：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15e4562aa578496e8cab30eeabe688b3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当网格列轨道尺寸都设置为 <code>max-content</code> 时，要是网格容器空间小于所有网格项目最大尺寸（<code>max-content</code>）总和，网格项目会溢出网格容器：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90304d3d716d4a46b72593359c4812d8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),qe={href:"https://codepen.io/airen/full/wvXbZmM",target:"_blank",rel:"noopener noreferrer"},ze=e("p",null,[e("code",null,"max-content"),i(" 它代表了单元格“最理想的大小”。单元格最小的宽度围绕着它的内容。例如，如果单元格的内容是一个句子，理想的单元格的宽度是整个句子的长度，无论长度是多少，单元格的内容都不会断行。")],-1),Re={href:"https://juejin.cn/book/7161370789680250917/section/7161624041885958151",target:"_blank",rel:"noopener noreferrer"},Fe=e("code",null,"minmax()",-1),Me=e("code",null,"min-content",-1),He=e("code",null,"min-content",-1),De=e("code",null,"max-content",-1),Le=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc64b27acd7446efbfecd81e7b832ca4~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Ge={href:"https://codepen.io/hkdc/full/EXRjpJ",target:"_blank",rel:"noopener noreferrer"},Ne=l(`<p>有一点需要注意，当网格项目中的内容是一张图片 <code>&lt;img&gt;</code> ，而且该图片设置了:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>img {
    display: block;
    max-width: 100%;
    height: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么当网格轨道的尺寸被设置为 <code>min-content</code> 时，那么 <code>img</code> 会被视为 <code>width: 0</code> ，造成图片不可见：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5133919b879045b8ab53f8366d36be15~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),Te={href:"https://codepen.io/airen/full/NWzVZpe",target:"_blank",rel:"noopener noreferrer"},Ie=e("p",null,[i("避免这种现象出现，最好的办法是使用 "),e("code",null,"minmax()"),i(" 函数，并且将该函数的 "),e("code",null,"MIN"),i(" 值设置一个具体的值，比如 "),e("code",null,"100px"),i(" ，然后将 "),e("code",null,"MAX"),i(" 值设置为 "),e("code",null,"min-content"),i(" ：")],-1),Ke=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0737a2328ac405e8c933dee93c8dfdb~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Ee={href:"https://codepen.io/airen/full/eYKawep",target:"_blank",rel:"noopener noreferrer"},Ae=l(`<p>上面我们主要介绍了 CSS 内在尺寸和外在尺寸理论方面的知识，接下来我们一起来看几个真实场景的使用案例。</p><p>先来看一个带标题的图片示例，标题的宽度是其父元素宽度的 <code>100%</code> （默认情况之下），因为标题它自身就是一个块元素：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;figure&gt;
    &lt;img src=&quot;thumbnail.jpg&quot; alt=&quot;&quot; /&gt;
    &lt;figcaption&gt;
        &lt;p&gt;欢迎来到小册，该小册全面介绍现代 Web 布局技术。这一节主要介绍的是内在 Web 布局，我们将详细介绍内在 Web 布局将会使用到的 CSS 技术，比如 min-content、max-content、 fit-content 等特性的使用 ...&lt;/p&gt;
    &lt;/figcaption&gt;
&lt;/figure&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你需要让图片宽度和标题宽度一样宽，原本以为在 <code>figure</code> 上设置 <code>width</code> 的值为 <code>max-content</code> 即可：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>figure {
    width: max-content;
}

figure img {
    display: block;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终渲染出来的结果和我们所期待的是有所差异的。</p><p>通过前面的内容，可以知道，当 <code>figure</code> 的 <code>width</code> 设置为 <code>max-content</code> 时，它的宽度等于其内容：</p><ul><li>当 <code>img</code> 的原始宽度大于图片标题（<code>figcaption</code>）时，将会以 <code>img</code> 的原始宽度作为 <code>figure</code> 的宽度；</li><li>当 <code>img</code> 的原始宽度小于图片标题（<code>figcaption</code>）时，将会以 <code>figcaption</code> 的内容宽度做为 <code>figure</code> 的宽度。</li></ul><p>只有当 <code>img</code> 的原始宽度和 <code>figcaption</code> 内容宽度相等之时，才能实现图片和标题一样宽度的效果。要实现这个效果，需要将 <code>figure</code> 的 <code>width</code> 设置为 <code>fit-content</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>figure {
    width: fit-content;
    
    /* 它等同于 */
    width: auto;
    min-width: min-content;
    max-width: max-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此一来，如果图像的宽度非常大，它也不会超过视窗宽度：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3a6a4b7c90f410295f26ef46d8970d8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,12),Ve={href:"https://codepen.io/airen/full/ZERNdjQ",target:"_blank",rel:"noopener noreferrer"},Xe=e("p",null,"接着看一个带有下划线的标题示例：",-1),Je=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9de7db63d5524b1884a81ef62b48d0c3~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Be={href:"https://codepen.io/airen/full/BaVgoar",target:"_blank",rel:"noopener noreferrer"},Ye=l(`<p>以往我们实现下划线的宽度和标题内容等宽效果，会像下面这样来实现。第一种方式对标题 <code>h2</code> （它是一个块元素）改变视觉格式化模型，即改变它的 <code>display</code> 值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>h2 {
    display: inline-flex;
    padding-bottom: .25em;
    border-bottom: 2px solid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也有不少同学会选择在 <code>h2</code> 中套一个内联元素，比如 <code>span</code> ：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;h2&gt;
    &lt;span&gt;爆款直降&lt;/span&gt;
&lt;/h2&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在内联元素 <code>span</code> 设置边框效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>h2 span {
    padding-bottom: .25em;
    border-bottom: 2px solid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以在不额外嵌套内联标签元素，并且不改变元素的 <code>display</code> 属性值时，直接将元素的 <code>width</code> 设置为 <code>fit-content</code> 就可以实现相同的 UI 效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>h2 {
    width: fit-content;
    padding-bottom: .25em;
    border-bottom: 2px solid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有一天，设计师希望你实现的页面导航栏的宽度不再是和视窗宽度等宽，而是希望由内容的多少来决定导航栏的大小。现在，你只需要将导航栏容器的宽度 <code>width</code> 设置为 <code>max-content</code> 即可，你也不用再担心因为内容改变，来不断调整 <code>width</code> 的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    width: max-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f9b1187af154440b1e3790104434c26~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),Ze={href:"https://codepen.io/airen/full/QWxXjKY",target:"_blank",rel:"noopener noreferrer"},Oe=l(`<p>接着来看一个 Todo List App 页面的布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0502d0cf947e43cfb96ec4d51588ec13~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们可以使用 CSS Grid 来构建该页面的布局：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.todo--lists {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6462c64b9c0b4741be8b6e2fe3159b30~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Ue={href:"https://codepen.io/airen/full/WNyqyxj",target:"_blank",rel:"noopener noreferrer"},Qe=l(`<p>要知道，当 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 中同时出现 <code>auto</code> 和 <code>fr</code> 时，那么 <code>fr</code> 将“赢得”网格容器剩余空间的战斗，而 <code>auto</code> 将失去了它的宽度值，缩小到其元素内容所需的空间。<strong>剩下的网格空间被分成由</strong> <strong><code>fr</code></strong> <strong>单位定义的列或行，定义为</strong> <strong><code>auto</code></strong> <strong>的列或行不会获得更多的剩余空间</strong> 。</p><p>事实上，要实现该布局效果，除了上面方法之外，还可以使用下面这两种方式，能达到同等布局效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.todo--lists {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    
    /* 或者 */
    grid-template-rows: min-content minmax(0, 1fr) min-content;
    
    /* 或者 */
    grid-template-rows: min-content auto min-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2056dd42c0974733bafb4ad11e9bca74~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),Pe={href:"https://codepen.io/airen/full/WNyqKvK",target:"_blank",rel:"noopener noreferrer"},$e=l(`<p>在顶部和底部使用 <code>min-content</code> ，那么顶部和底部的高度就不会超过它们各自的内容所占高度！基于该原理，Web 中很多应用程序都可以采用相似的布局技术，比如市面上的一些聊天应用（如微信）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f7eb221accf4387b18cca38b2a3c780~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>拿其中一个为例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fbc49287e6b437d95c661eae9bb356d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>构建上图，你可能会需要下面这样的一个 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;chat&quot;&gt;
    &lt;!-- 最左侧（第一列）：菜单列  --&gt;
    &lt;nav&gt;
        &lt;!-- 用户头像 --&gt;
        &lt;figure&gt;&lt;/figure&gt;
        
        &lt;!-- 工具列表 --&gt;
        &lt;div class=&quot;tools--bar&quot;&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    &lt;!-- 中间列（第二列）：用户列表 --&gt;
    &lt;aside class=&quot;users&quot;&gt;
        &lt;!-- 搜索表单 --&gt;
        &lt;form class=&quot;search&quot;&gt;&lt;/form&gt;
        &lt;ul class=&quot;user--lists&quot;&gt;&lt;/ul&gt;
    &lt;/aside&gt;
    
    &lt;!-- 最右侧（第三列）： 聊天内容 --&gt;
    &lt;main class=&quot;message--wrapper&quot;&gt;
        &lt;!-- 页头 --&gt;
        &lt;header&gt;&lt;/header&gt;
        
        &lt;!-- 聊天区 --&gt;
        &lt;section class=&quot;messages&quot;&gt;&lt;/section&gt;
        
        &lt;!-- 页脚: 发信息 --&gt;
        &lt;footer&gt;&lt;/footer&gt;
    &lt;/main&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样使用 CSS Grid 来构建布局，我们可以像下图这样来定义网格列轨道和行轨道：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbc08636fe60445c8d65a36ee15cafa3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.chat {
    display: grid;
    grid-template-columns: min-content fit-content(24rem) minmax(0, 1fr);
    grid-template-rows: min-content minmax(0, 1fr) min-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配合 CSS Grid 的子网格 <code>subgrid</code> 会让你的布局更灵活。上图中，我们可以让 <code>nav</code> 、<code>aside</code> 和 <code>main</code> 都跨三行，并且将它们的 <code>grid-template-rows</code> 都设置为 <code>subgrid</code> 。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>nav,
aside, 
main {
    grid-row: span 3;
    display: inherit;
    grid-template-rows: subgrid;
}

nav {
    grid-column: 1;
}

aside {
    grid-column: 2;
}

main {
    grid-column: 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初步结果出来了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/386b3a44326e47bc9fe2856ce296edcf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),ei={href:"https://codepen.io/airen/full/KKejxRg",target:"_blank",rel:"noopener noreferrer"},ii=l(`<p>注意，这是一个未完成的案例，我希望没完成的任务由小伙伴们自己接着完成！</p><p>最后再来看一个内在尺寸的用例。下图这种英雄（Hero）区域的设计在 Web 页面上很常见：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6eeff8ced60d4f1ea5437bb0ad85bbb7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图虚线框框起来的部分包含一个“标题”和“描述文本”。如果设计师期望“<strong>描述文本的宽度不要超过标题的宽度</strong>”。以往都是将“标题”和“描述文本”设置同一个宽度值，但这样做有着明显的缺陷，因为内容是动态的，很有可能输出的标题内容宽度会超出所设置的宽度，造成标题断行。严重的甚至会影响设计的美观，这估计是设计师无法接受的。为了满足设计的需求，我想也有不少同学会借助 JavaScript 脚本来实现该设计需求。</p><p>现在，我们使用 CSS 的内在尺寸就可以轻松实现上述的需求。我们只需要在“标题”和“描述文本”外部同时嵌套一个包裹元素，比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;section class=&quot;hero__content&quot;&gt;
    &lt;h3 class=&quot;hero__title&quot;&gt;CSS is awesome&lt;/h3&gt;
    &lt;p class=&quot;hero__describe&quot;&gt;CSS is awesome, it&#39;s simple but it&#39;s not easy! Many developers have a love-hate relationship with CSS!&lt;/p&gt;
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，把容器 <code>.hero__content</code> 的 <code>width</code> 设置为 <code>min-content</code> ，同时将标题 <code>.hero__title</code> 的 <code>width</code> 设置为 <code>max-content</code>：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.hero__content {
    width: min-content;
    text-align: center;
}

.hero__title {
    width: max-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2495df9f89d1427e8e291df4a6999596~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>看上去很完美了，但在移动端还是要对标题 <code>.hero__title</code> 的 <code>width</code> 做相应处理的，不然会让页面出现水平滚动条。为此，你可以考虑使用 CSS 媒体查询，调整 <code>.hero__title</code> 的 <code>width</code> 值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media only screen and (max-width: 441px) {
    .hero__title {
        width: min(100% - 1rem, 400px);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56acf9cf5cc9417792bcd137b0ac3424~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,12),ni={href:"https://codepen.io/airen/full/KKeOMVG",target:"_blank",rel:"noopener noreferrer"},di=l(`<h3 id="图片的适配处理" tabindex="-1"><a class="header-anchor" href="#图片的适配处理" aria-hidden="true">#</a> 图片的适配处理</h3><p>响应式 Web 设计（RWD）其中有一个最大的特色，那就它具有灵活的图片（Flexible Images）。事实上，接触过响应式设计的同学都知道，在构建响应式 Web 设计时，图片的适配处理是较为麻烦的，时常令 Web 开发者感到头痛。其中原委这里不展开了，后面关于响应式 Web 设计的课程中会有相关的阐述。</p><p>对于大多数 Web 开发者，处理响应式 Web 布局中的图片适配，最简单粗暴的方式就是：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>img {
    display: block;
    max-width: 100%;
    height: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它能满足大部分的场景。但有的时候会因为图片尺寸小于容器尺寸，造成图片拉伸扭曲：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5ce4eb531474d5593ff8969038a1688~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>其实，如果希望做得更好，我们应该利用更现代的 Web 技术来处理图片的适配处理。比如 <code>img</code> 图片元素，它新增了 <code>object-fit</code> 属性设置 <code>img</code> 图片样式：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd0e4c3ebbb7424baea36bb2a26603f1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>对于背景图片，也有一个相似的属性 <code>background-size</code> ：</p><blockquote><p><code>background-size</code> 取值为 <code>cover</code> 和 <code>contain</code> 的表现与 <code>object-fit</code> 取值为 <code>cover</code> 和 <code>contain</code> 相同。但 <code>oject-fit</code> 不能像 <code>background-size</code> 那样，取 <code>&lt;length-percentage&gt;</code> 值。</p></blockquote><p>大家需要注意的是，<code>background-size</code> 、<code>object-fit</code> 包括从未介绍过的 <code>mask-size</code> 取 <code>cover</code> 和 <code>contain</code> 值时，它的计算都是复杂的。它们如何计算已经超出我们这个课程的范畴了，这里不详细阐述。但是为了满足大家的好奇心，我把 <code>cover</code> 和 <code>contain</code> 计算所涉及到的公式告诉大家。就拿 <code>background-size</code> 为例吧：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f57050b208d47dab5f52bfc3fceac44~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>background-size</code> 取值为 <code>cover</code> 时，背景图片的尺寸计算：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>/** 
* Rimage     » 背景图片内在宽高比 » Rimage = Wimage ÷ Himage 
* Wimage     » 背景图片宽度（原始宽度） 
* Himage     » 背景图片高度（原始高度） 
* W&#39;         » 计算后的背景图片宽度 
* H&#39;         » 计算后的背景图片高度 
* R&#39;         » 计算后的背景图片宽高比，与背景图片内在宽高比相等 » R&#39; = Rimage * Wcontainer » 容器宽度（容器元素的width） 
* Hcontainer » 容器高度（容器元素的height） 
**/ 
if (Rimage ≥ Rcontainer) { 
    H&#39; = Hcontainer 
    W&#39; = H&#39; x Rimage = Hcontainer x Rimage 
} else { 
    W&#39; = Wcontainer 
    H&#39; = W&#39; ÷ Rimage = Wcontainer ÷ Rimage 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来看 <code>background-size</code> 取值为 <code>contain</code> 的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba25d84b379c44ffbfe859aed83a507e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>它和 <code>cover</code> 是惊人的相似，从计算来讲，<code>contain</code> 的逻辑和 <code>cover</code> 刚好相反：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>/** 
* Rimage     » 背景图片内在宽高比 » Rimage = Wimage ÷ Himage 
* Wimage     » 背景图片宽度（原始宽度） 
* Himage     » 背景图片高度（原始高度） 
* W&#39;         » 计算后的背景图片宽度 
* H&#39;         » 计算后的背景图片高度 
* R&#39;         » 计算后的背景图片宽高比，与背景图片内在宽高比相等 » R&#39; = Rimage 
* Wcontainer » 容器宽度（容器元素的width） 
* Hcontainer » 容器高度（容器元素的height） 
**/ 
if (Rimage ≥ Rcontainer) { 
    W&#39; = Wcontainer 
    H&#39; = W&#39; ÷ Rimage = Wcontainer ÷ Rimage 
} else { 
    H&#39; = Hcontainer 
    W&#39; = H&#39; x Rimage = Hcontainer x Rimage 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th></th><th><strong><code>cover</code></strong></th><th><strong><code>contain</code></strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td><strong><code>Rimage ≥ Rcontainer</code></strong></td><td><code>H&#39; = Hcontainer;\`\`W&#39; = H&#39; x Rimage = Hcontainer x Rimage</code></td><td><code>W&#39; = Wcontainer;\`\`H&#39; = W&#39; ÷ Rimage = Wcontainer ÷ Rimage</code></td><td>背景图片是横屏的，<code>width &gt; height</code></td></tr><tr><td><strong><code>Rimage ≤ Rcontainer</code></strong></td><td><code>W&#39; = Wcontainer;\`\`H&#39; = W&#39; ÷ Rimage = Wcontainer ÷ Rimage</code></td><td><code>H&#39; = Hcontainer;\`\`W&#39; = H&#39; x Rimage = Hcontainer x Rimage</code></td><td>背景图片是竖屏的，<code>width &lt; height</code></td></tr></tbody></table><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a69e72c2fd4047c1858e3416536a8da0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,20),li={href:"https://codepen.io/airen/full/MWXNjGb",target:"_blank",rel:"noopener noreferrer"},ci=l(`<p>有一点需要注意的是，这里提到的计算公式只适用于具有内在尺寸和比例的背景图片，比如位图。如果我们把背景图片换成 <code>&lt;gradient&gt;</code> 或部分矢量图，就不适用了。</p><p>除了在 CSS 方面为图片适配处理提供了更多属性之外， HTML 也有一定的革新，比如 <code>&lt;img&gt;</code> 标签新增了 <code>srcset</code> 、<code>sizes</code> 等新属性，另外还新增了 <code>&lt;picuture&gt;</code> 标签元素。让 Web 开发者有了更多的选择：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ef8d6aeec2f42f4ab11125d128b7de8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，有关于</strong> <strong><code>&lt;img&gt;</code></strong> <strong>的</strong> <strong><code>srcset</code></strong> <strong>和</strong> <strong><code>sizes</code></strong> <strong>特性以及</strong> <strong><code>&lt;picture&gt;</code></strong> <strong>已超出本节课的范畴，因此不在这里做过多阐述。感兴趣的同学，可以自己搜索相应关键词进行扩展阅读！</strong></p></blockquote><p>对于内在 Web 设计，上述图片适配（用于 RWD 中灵活的图片）相关技术同样也可以用于内在 Web 设计（IWD）中。而且根据情况，<strong>IWD 除了允许你使用灵活的图片之外</strong>，<strong>还可以使用固定尺寸的图片</strong>。</p><p>使用一个示例来阐述 IWD 设计中为什么还可以使用固定尺寸的图片，以及它和 RWD 中灵活的图片技术差异。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c671faea8e44733a4996d16b4d1fcf3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就我个人经验来看，实现上面页头的效果，对于 Logo 图，基本上是在 Logo 外套一个标签元素，并且在该元素上显式设置具体的宽高值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.logo__wrapper {
    width: 120px;
    aspect-ratio: 1;
}

.logo__wrapper img {
    max-width: 100%;
    height: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.logo__wrapper {
    width: 120px;
    aspect-ratio: 1;
}

.logo__wrapper img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看上去都没有问题。前提条件是 Web 开发者知道 Logo 图像的尺寸大小。突然，设计师的需求变了，他们需要 Logo 的图像尺寸变大或变小， Web 开发者不得不重新根据设计需求去手动调整 Logo 图像容器的尺寸，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Logo 变小 */
.logo__wrapper {
    width: 80px;
    aspect-ratio: 1;
}

/* Logo 变大 */
.logo__wrapper {
    width: 200px;
    aspect-ratio: 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单地说，即使在响应式 Web 设计中，只要设计对 Logo 尺寸有所调整， Web 开发者不得不跟进，手动调整尺寸。这其实也是响应式设计或者说常规情况之下，Web 开发者不得不去做的事情。</p><p>庆幸的是，如果采用内在尺寸来构建同样的 Web 布局，事情会变得容易得多。我们只需要将 Logo 容器的尺寸定义为 <code>max-content</code> 即可，这样一来，不管设计师有何需求变化，都可以自动匹配：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.logo__wrapper {
    width: max-content;
    aspect-ratio: 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该示列中，我们定义网格轨道的时候，是这样定义的：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
  display: grid;
  grid-template-columns: max-content auto auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以尝试一下，不管 Logo 尺寸怎么变化，Web 开发者都不需要去做额外的事情，整个导般布局中的 Logo 随时都可以符合设计师所需要的要求：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec2d4a17dfd54a8ea4c4d84842e67ce3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,20),si={href:"https://codepen.io/airen/full/ExRqgOo",target:"_blank",rel:"noopener noreferrer"},oi=l(`<p>我想再次提醒 Web 开发者的是，不管是 RWD 还是 IWD 中，图片的处理都不仅局限于课程中提到的相关的技术，要较好地处理图片的适配处理，我们所要涉及到的知识点是很多的，只不过这些知识点不适合于这里跟大家展开讨论。如果大家感兴趣，我们可以私下讨论。</p><h3 id="不依赖-css-媒体查询让-web-具备响应式能力" tabindex="-1"><a class="header-anchor" href="#不依赖-css-媒体查询让-web-具备响应式能力" aria-hidden="true">#</a> 不依赖 CSS 媒体查询让 Web 具备响应式能力</h3><p>在以往的技术条件之下，我们要构建一个具有响应式能力的 Web 页面，基本上离不开 CSS 媒体查询相关的特性。庆幸的是，现在，在特定的环境之下，我们可以脱离 CSS 媒体查询的特性。最为典型的就是 CSS Grid 布局中的 <strong>RAM</strong> 布局技术，我们不需要任何 CSS 媒体查询相关的特性就可以达到相应的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 400px), 1fr));
    gap: 1rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是 CSS Grid 布局技术中最为典型的布局之一。比如下面所示的效果，没有依赖任何 CSS 媒体查询特性，也能让每张卡片的布局适配任何终端：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bd2c5f81d4f4d28917c33e5a6586090~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),ti={href:"https://codepen.io/airen/full/GRGVNPj",target:"_blank",rel:"noopener noreferrer"},ai=e("p",null,"同样的，使用 CSS Flexbox 来布局，在某些情形之下，同样可以不依赖 CSS 媒体查询，可以响应不同环境下的布局效果：",-1),ri=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f09b8741525d4207b6de3b24923cf5df~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),mi={href:"https://codepen.io/airen/full/WNyVRrJ",target:"_blank",rel:"noopener noreferrer"},ui=l(`<p>如果你掌握了前面的 CSS Flexbox 课程的知识，构建上面的效果，对你来说是件非常容易的事情：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;card&quot;&gt;
    &lt;div class=&quot;media&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;content&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card {
    display: flex;
    flex-wrap: wrap;
    background: #27536d;
}

.card &gt; * {
    flex: 1 1 280px;
}

.media {
    background: black;
    min-height: 280px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面示例的基础上，稍微调整样式，就可以实现下图这样的布局效果，同样是不依赖任何 CSS 媒体查询就可以实现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b8ba04adeeb43f8a9d5c57870aef1b5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),pi={href:"https://codepen.io/airen/full/KKeOaar",target:"_blank",rel:"noopener noreferrer"},vi=l(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 calc(280px + 1rem);
}

.card &gt; * {
    flex: 1 1 280px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="内在-web-设计的上下文之间间距" tabindex="-1"><a class="header-anchor" href="#内在-web-设计的上下文之间间距" aria-hidden="true">#</a> 内在 Web 设计的上下文之间间距</h3><p>通过前面的学习，我们了解了元素的 <code>width</code> 设置 <code>min-content</code> 、<code>max-content</code> 和 <code>fit-content</code> 的差异，也清楚在 CSS Flexbox 和 CSS Grid 布局中不依赖任何 CSS 媒体查询，也可以让 Web 布局具有一定的响应式能力，尤其是 CSS Grid 布局的 RAM 布局技术。</p><p>除此之外，在 CSS Grid 布局中还可以使用 <code>fit-content(&lt;length-percentage&gt;)</code> 。使用 <code>fit-content()</code> 函数意味着我们可以提供自己的<strong>首选最大值</strong>，就像下面这个示例一样，侧边栏的最大值为 <code>20ch</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: grid;
    grid-template-columns: fit-content(20ch) minmax(0, 1fr);
    gap: 1rem; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51f4b1e3546b44b7891484aa6920da8e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),bi={href:"https://codepen.io/airen/full/yLEmMYN",target:"_blank",rel:"noopener noreferrer"},gi=l(`<p>总的来说，这条规则产生的行为是，如果容器（浏览器视窗）有足够空间，侧边栏宽度是 <code>20ch</code> ，如果没有足够的空间（或受其他元素挤压），侧边栏最小的宽度也将是 <code>min-content</code>。</p><p>我们可以通过再次包含自定义属性来提高此规则的灵活性。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    --sidebar-max: 220px;
    display: grid;
    grid-template-columns: fit-content(var(--sidebar-max, 20ch)) minmax(50%, 1fr);
    gap: 1rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回过头来想，我们现在知道了内在 Web 设计具备：</p><ul><li>收缩和扩展：设计可适应可变空间的变化；</li><li>灵活性：将 CSS Flexbox 和 CSS Grid 与更多新的 CSS 单位特性结合使用，使我们的 Web 布局能够以不同的方式适应可用空间。</li></ul><p>除了上面这些，我们还可以使用 CSS 的比较函数 <code>min()</code> 、<code>max()</code> 和 <code>clamp()</code> 让元素尺寸更灵活。就拿 <code>clamp()</code> 函数来说，它接受三个值：最小值、理想值和最大值。它允许你提供灵活的约束，在 CSS 中它也是一个多功能的 CSS 函数，也是内在 Web 设计中的关键。它最为巧妙之处在于，在设置理想值时，必须使用视窗单位（或与其类似的动态单位）来触发该函数中的最小值和最大值之间的过渡。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.title {
    font-size: clamp(1rem, 4vw + 2rem, 3rem);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的意思是，<code>.title</code> 的 <code>font-size</code> 值为 <code>clamp(1rem, 4vw + 2rem, 3rem)</code> ，其中：</p><ul><li>最小值 <code>MIN = 1rem</code>；</li><li>最大值 <code>MAX = 3rem</code>；</li><li>理想值 <code>VAL= 4vw + 2rem</code> 。</li></ul><p>使用 <code>clamp(MIN, VAL, MAX)</code> 函数时，具体返回值会根据 <code>MIN</code> 、<code>VAL</code> 和 <code>MAX</code> 三个值比较得出：</p><ul><li>如果 <code>VAL</code> 在 <code>MIN</code> 和 <code>MAX</code> 之间，则使用 <code>VAL</code> 作为函数的返回值；</li><li>如果 <code>VAL</code> 大于 <code>MAX</code>，则使用 <code>MAX</code> 作为函数的返回值；</li><li>如果 <code>VAL</code> 小于 <code>MIN</code>，则使用 <code>MIN</code> 作为函数的返回值。</li></ul><p>也就是说，最终 <code>font-size</code> 值将会根据 <code>4vw</code> 值来决定，字体大小将随着浏览器视窗大小的增大和缩小而调整，但它永远不会小于 <code>1rem</code> 或大于 <code>3rem</code> 。</p><p>与其类似的还有 <code>min()</code> 和 <code>max()</code> 函数，它们都可以提供上下文相关的选项，最终返回较为适合的值。简单地说，它们都可以接受两个或多个值。</p><ul><li>对于 <code>min()</code> 函数，浏览器将使用最小的计算值，即 <code>min()</code> 函数返回参数列表中的最小值；</li><li>对于 <code>max()</code> 函数，浏览器将使用最大的计算值，即 <code>max()</code> 函数返回参数列表中的最大值。</li></ul><p>它们还拥有另外一个特性，不需要嵌套 <code>calc()</code> 函数就可以做四则运算。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.box {
    width: min(100vw - 3rem, 72ch);
}

.box {
    width: max(100vw - 3rem, 72ch);
}

.box {
    font-size: clamp(1rem, 3vw + 1.5rem, 2rem)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意，这是有关于 <code>min()</code> 、<code>max()</code> 和 <code>clamp()</code> 函数最基本的使用，但这里不深入介绍，更详细的内容将会放在后面的“响应式 UI”的课程中介绍。</p></blockquote><p>先抛开 <code>min()</code> 、<code>max()</code> 和 <code>clamp()</code> 更深入的介绍不说。事实上，它们都是内在 Web 设计中很重要的一部分。另外，到目前为止，我们所讨论的是如何影响元素尺寸（它如何占用空间的和大小）。还未讨论如何影响元素之间的间距，比如：</p><ul><li>相邻元素之间的间距，对应 CSS 中 <code>margin</code> 的使用；</li><li>内部元素与父元素（或祖先元素）之间的间距，对应 CSS 中的 <code>padding</code> 的使用。</li></ul><p>就内在 Web 设计，我们有必要熟悉或掌握它们之间的关系，因为它将帮助我们最大限度地利用内在 Web 设计的特性。比如，我们可以使用 <code>min()</code>、<code>max()</code> 和 <code>clamp()</code> 几个比较函数来设置元素之间的间距，<code>padding</code> 或 <code>margin</code>，甚至是边框的粗细 <code>border</code>，圆角的大小 <code>border-radius</code> 等。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root {
    --padding-sm: clamp(1rem,    3%, 1.5rem);
    --padding-md: clamp(1.5rem,  6%,   3rem);
    --padding-lg: clamp(3rem,   12%,   6rem);

    --margin-sm: min(2rem,  4vh);
    --margin-md: min(4rem,  8vh);
    --margin-lg: min(8rem, 16vh);

    --gap-sm: clamp(1rem,   3vmax, 1.5rem);
    --gap-md: clamp(1.5rem, 6vmax,   3rem);
    --gap-lg: clamp(3rem,   8vmax,   4rem);
} 

.box {
    padding-inline: var(--padding-md);
    margin-block: var(--margin-md);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用该特性，我们就可以很容易实现类似一些具备条件判断的 UI 效果。比如在窄屏幕下，元素的圆角是 <code>0px</code> ，宽屏的时候是 <code>8px</code> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a138d24fb8e14de4ab40b750f8577005~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root { 
    --w: 760px; 
    --max-radius: 8px; 
    --min-radius: 0px; /* 这里的单位不能省略 */ 
    --radius: (100vw - var(--w)); 
    --responsive-radius: clamp( var(--min-radius), var(--radius) * 1000, var(--max-radius) ); 
} 

.box { 
    border-radius: var(--responsive-radius, 0); 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3559cef5fabe420a8f98e1b48b803d23~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,25),fi={href:"https://codepen.io/airen/full/ExRqmvd",target:"_blank",rel:"noopener noreferrer"},hi=l(`<p>我们还可以将 <code>min()</code> 和 <code>max()</code> 函数结合起来，实现等同的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b6f2012cbe7457ca7776898f0bc6696~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.box { 
    --min-radius: 0px; 
    --max-radius: 8px; 
    --ideal-radius: 4px; 
    border-radius: max( 
        var(--min-radius), 
        min(var(--max-radius), (100vw - var(--ideal-radius) - 100%) * 9999) 
    ); 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84ceebc1ca6e4410a0cfad97608d6dd4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),Si={href:"https://codepen.io/airen/full/VwdobRv",target:"_blank",rel:"noopener noreferrer"},_i=l('<p>甚至更为复杂的 UI，我们都可以采用这套技术体系来构建，比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa010ac589904fd1922677c504cedf36~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，上图这个效果是响应 UI 的最终效果，将会在后面花一节课来专门介绍，CSS 如何构建上图这种响应 UI 的布局技术</strong> 。</p></blockquote><h3 id="css-容器查询" tabindex="-1"><a class="header-anchor" href="#css-容器查询" aria-hidden="true">#</a> CSS 容器查询</h3><p>内在 Web 设计还有一个可用的 CSS 特性就是 <strong>CSS 容器查询特性</strong> 。该特性一直以来都是 Web 开发者最为期待的特性：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ae8c541a4d54761b0b19da45a208d91~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',6),xi={href:"https://2019.stateofcss.com/",target:"_blank",rel:"noopener noreferrer"},ki={href:"https://2020.stateofcss.com/en-US/",target:"_blank",rel:"noopener noreferrer"},Ci={href:"https://2021.stateofcss.com/en-US/",target:"_blank",rel:"noopener noreferrer"},ji=l(`<p>比如上面，响应式圆角的效果，如果我们使用 CSS 容器查询，可以像下面这样来编写：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.card--container { 
    container-type: inline-size; 
} 

.card { 
    border-radius: 0; 
} 

@container (width &gt; 700px) { 
    .card { 
        border-radius: 8px; 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c272065c28a4bd8a634ab518d992cec~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),wi={href:"https://codepen.io/airen/full/wvXVeMp",target:"_blank",rel:"noopener noreferrer"},Wi=e("p",null,[i("你可能现在不知道 CSS 容器查询 "),e("code",null,"@container"),i(" 特性是怎么一回事，那也不用担心，因为我们在介绍下一代响应式 Web 设计的时候有专门一节课会介绍该特性。如果你实在等不及，可以先行了解 CSS 容器查询特性是什么东东！")],-1),yi=e("h2",{id:"案例",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#案例","aria-hidden":"true"},"#"),i(" 案例")],-1),qi={href:"https://talks.jensimmons.com/15TjNW/slides",target:"_blank",rel:"noopener noreferrer"},zi=l(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0597d05feff94aee9920504abba9bfe2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，使用课程中介绍的 CSS 技术，你还可以实现类似上图中这种杂志封面的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67e81b382ed445289e6ca08a3f9bfe96~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>看上去是不是很有挑战性，我想很多 Web 开发者都会认为上图中的效果是很难使用 CSS 技术来实现的。事实上，现在使用 CSS 实现起来已经不是难事了。比如下图这个示例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0868b83797054b19adda6b88ecb4f56d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>构建上图这种效果，你可能需要一个像下面这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;header role=&quot;banner&quot;&gt;
    &lt;h1 class=&quot;site__name&quot;&gt;
        &lt;span&gt;G&lt;/span&gt;
        &lt;span&gt;r&lt;/span&gt;
        &lt;span&gt;a&lt;/span&gt;
        &lt;span&gt;p&lt;/span&gt;
        &lt;span&gt;h&lt;/span&gt;
        &lt;span&gt;i&lt;/span&gt;
        &lt;span&gt;c&lt;/span&gt;
        &lt;span&gt;D&lt;/span&gt;
        &lt;span&gt;e&lt;/span&gt;
        &lt;span&gt;s&lt;/span&gt;
        &lt;span&gt;i&lt;/span&gt;
        &lt;span&gt;g&lt;/span&gt;
        &lt;span&gt;n&lt;/span&gt;
    &lt;/h1&gt;
    &lt;nav role=&quot;navigation&quot; class=&quot;main__menu&quot;&gt;
        &lt;ul class=&quot;menu&quot;&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Episodes&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Guests&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Subscribe&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/nav&gt;
    &lt;img src=&quot;https://picsum.photos/300/600?random=21&quot; alt=&quot;Beyonce looking fierce&quot;&gt;
&lt;/header&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能发现了，我们把 “Graphicdesign” 中每个字母放在一个 <code>&lt;span&gt;</code> 元素中，这样做是因为效果中的每个字母都在不同的位置。</p><p>首先我们可以在 <code>header</code> 元素上使用 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性定义一个四列五行（<code>4 x 5</code>）的网格，并且使用 <code>gap</code> 设置网格轨道之间的间距：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    display: grid;
    grid-template-columns: 0 max-content 5rem auto;
    grid-template-rows: 1.5rem 50px min-content auto auto;
    gap: 0 1rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99ff70a1e96c437daeeaaac5291ed2d0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用 <code>grid-row</code> 和 <code>grid-column</code> 将元素放置到需要的位置：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.site__name {
    grid-column: 1 / 3;
    grid-row: 1 / 5;
}

.main__menu {
    grid-column: 3 / 5;
    grid-row: 3;
}

header img {
    grid-column: 3 / 5;
    grid-row: 3 / 6;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a139e52490a4bce82ebc701986c19ed~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>现在基本布局已经有了，我们还需要在 <code>h1.site__name</code> 上再创建一个网格，使用同样的方式来放置“Graphicdesign” 词中的每个字母：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.site__name {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
}

/* G */
.site__name span:nth-child(1) { 
    grid-column: 2;
    grid-row: 1;
}

/* R */
.site__name span:nth-child(2) { 
    grid-column: 3;
    grid-row: 1;
}

/* A */
.site__name span:nth-child(3) { 
    grid-column: 6;
    grid-row: 1;
}

/* P */
.site__name span:nth-child(4) { 
    grid-column: 3;
    grid-row: 2;
}

/* H */
.site__name span:nth-child(5) { 
    grid-column: 4;
    grid-row: 2;
}

/* I */
.site__name span:nth-child(6) { 
    grid-column: 5;
    grid-row: 3;
}

/* C */
.site__name span:nth-child(7) { 
    grid-column: 6;
    grid-row: 3;
}

/* D */
.site__name span:nth-child(8) { 
    grid-column: 1;
    grid-row: 4;
}

/* E */
.site__name span:nth-child(9) { 
    grid-column: 2;
    grid-row: 4;
}

/* S */
.site__name span:nth-child(10) { 
    grid-column: 5;
    grid-row: 5;
}

/* I */
.site__name span:nth-child(11) { 
    grid-column: 3;
    grid-row: 6;
}

/* G */
.site__name span:nth-child(12) { 
    grid-column: 5;
    grid-row: 6;
}

/* N */
.site__name span:nth-child(13) { 
    grid-column: 8;
    grid-row: 7;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5cc567f6e2645be8696ee93066ca721~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>再加上一些美化的样式规则，整体效果就出来了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb93a711754a47fe83ad7e7215fa2cd4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,19),Ri={href:"https://codepen.io/airen/full/ExRqMXY",target:"_blank",rel:"noopener noreferrer"},Fi=e("p",null,"感兴趣的同学，可以使用同样的方法来实现下图这个效果：",-1),Mi=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d594dde7bcca42e38b9ddf031bb8f4ff~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Hi=e("blockquote",null,[e("p",null,"参考链接： labs.jensimmons.com/2019/01-004.html")],-1),Di={href:"https://aneventapart.com/",target:"_blank",rel:"noopener noreferrer"},Li={href:"https://aneventapart.com/24ways",target:"_blank",rel:"noopener noreferrer"},Gi=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08e4a2c4a7064beba12993ae7cbef4ac~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Ni=e("p",null,"我在该示例基础上做了一些调整，接下来将要完成的是像下图这样的一个示例：",-1),Ti=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d0956c58b8a403688c9e7793bd2dcd2~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Ii={href:"https://codepen.io/airen/full/JjZgVoE",target:"_blank",rel:"noopener noreferrer"},Ki=l(`<p>构建这个效果，我们需要一个 HTML ：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;header&gt;
    &lt;h1&gt;An Event Apart:Set yourself Apart.&lt;/h1&gt;
    &lt;p&gt;Build your skills in the company of the smartest developers, designers, and strategists in the industry.&lt;/p&gt;
&lt;/header&gt;
&lt;main&gt;
    &lt;ul class=&quot;monoliths&quot;&gt;
        &lt;li&gt;
            &lt;a href=&quot;&quot;&gt;
                &lt;picture&gt;
                  &lt;img src=&quot;https://aneventapart.com/assets/img/landing/monoliths/rachel-andrew.jpg&quot; alt=&quot;&quot;&gt;
                &lt;/picture&gt;
                &lt;h4&gt;Rachel Andrew&lt;/h4&gt;
                &lt;span&gt;New CSS Features&lt;/span&gt;
            &lt;/a&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/main&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先在 <code>body</code> 上定义一个网格，可以让图片展示区域 <code>main</code> 占用除 <code>header</code> 之外的剩余区域：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body {
    display: grid;
    grid-template-rows: auto min-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>grid-row</code> 和 <code>grid-column</code> 分别将 <code>header</code> 和 <code>main</code> 放置到指定的网格区域：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    grid-row: 2 / 3;
}
main {
    grid-row: 1 / 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d431ef46573c4e9784673125939d9695~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>同时在 <code>header</code> 定义一个网格（它嵌套 <code>body</code> 网格中）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header {
    display: grid;
    grid-template-rows: 2rem min-content min-content;
    gap: 1rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/882ceec03a17483b9bb5fb5014b8315c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在这个示例中，使用 <code>header</code> 的伪元素 <code>::after</code> 绘制了一个斑马线效果，并且使用 <code>grid-row</code> 指定其放置的位置：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>header::before {
    grid-row: 1 / 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>header</code> 的另外两个子元素，使用的是网格自动放置的方式来指定其位置。</p><p>现在剩下的是主区域 <code>main</code> 的布局。在分享者列表 <code>.monoliths</code> 中重新定义了一个网格，一个 <code>17 x 3</code> （<code>17</code> 列，<code>3</code> 行的网格），每一列的列宽都是 <code>minmax(0, 1fr)</code> （相当于 <code>1fr</code> ），行网格轨道高度是，图片区域占用剩下区域空间，列表中的标题 <code>h4</code> 和描述文本 <code>span</code> 占用的高度是根据其自身内容高度来决定，即 <code>min-content</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.monoliths {
    display: grid;
    grid-template-columns: repeat(17, minmax(0, 1fr));
    grid-template-rows: auto min-content min-content;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/946a046f99eb4f80aaea6166547faafd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这里有一点需要特别注意，每个列表项跨越了 <code>5</code> 列，并且相邻的列都有一个单元格是相互重叠的：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.monoliths li {
    grid-row-start: 1;
    grid-row-end: span 3;
    grid-column-end: span 5;
}

.monoliths li:nth-child(1) {
    grid-column-start: 1;
}

.monoliths li:nth-child(2) {
    grid-column-start: 5;
}

.monoliths li:nth-child(3) {
    grid-column-start: 9;
}

.monoliths li:nth-child(4) {
    grid-column-start: 13;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e39d181f48c042e4b6f39dda27e7268c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这样做的主要目的是，为了避免在每个列表项中使用 <code>clip-path</code> 来裁剪列表项时，造成较大的空间：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/812008395afe4520a1783b7af775043a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们真正期望的是 <code>li</code> 运用 <code>clip-path</code> 达到下图这样的效果，所以需要列与列之间有一个列轨道是相互重叠的：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.monoliths li {
    clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acb126f9ad764e5cb040cf37bbf09f85~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，为了更好控制每一列的参数，图片 <code>picture</code> 、标题 <code>h4</code> 和描述文本 <code>span</code> 能更好的对齐。这里还使用了 CSS Grid 布局中的子网格 <code>subgrid</code> 特性。即，在 <code>li</code> 上定义了一个网格，并且使用 <code>subgrid</code> 特性，继承其父网格行网格轨道的相关参数：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.monoliths li {
    display: inherit;
    grid-template-rows: subgrid;
    row-gap: 0.2rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，在该示例中，<code>&lt;picture&gt;</code> 、<code>&lt;h4&gt;</code> 和 <code>&lt;span&gt;</code> 都被包裹在 <code>&lt;a&gt;</code> 标签元素内，它们不是 <code>&lt;li&gt;</code> 标签的子元素，也就无法成为 <code>li</code> 网格（它定义为一个网格）的网格项目。所以，需要显式将 <code>&lt;a&gt;</code> 元素的 <code>display</code> 的值设置为 <code>contents</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.monoliths a {
    display: contents;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做的好处是，可以让 <code>&lt;picture&gt;</code> 、<code>&lt;h4&gt;</code> 和 <code>&lt;span&gt;</code> 变成 <code>&lt;li&gt;</code> 网格中的网格项目，它们也可以使用 <code>grid-row</code> 和 <code>grid-column</code> 来放置位置：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.monoliths h4 {
    grid-row: 2;
    grid-column: 1 / -1;
}

.monoliths span {
    grid-row: 3;
    grid-column: 1 / -1;
}

.monoliths li::after {
    grid-row: 2 / 4;
    grid-column: 1 / -1;
    z-index: -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87d6396392724c28ba6d4c8d34378907~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>到此，基本布局你就已经完成了。再添加一些装饰性的 CSS 规则，你将完成最终的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a85d04beb34848b0bacadfe0ff7109df~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,33),Ei={href:"https://codepen.io/airen/full/JjZgVoE",target:"_blank",rel:"noopener noreferrer"},Ai=e("h2",{id:"小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#小结","aria-hidden":"true"},"#"),i(" 小结")],-1),Vi=e("p",null,"花了较长时间和大家一起探讨了内在 Web 设计，主要是通过这些基础性的内容让大家能更好领略到内在 Web 设计的魅力。正如 @Jen 分享当中所说： 内在 Web 设计是 Web 布局的新时代，它超越了响应式设计。我们正在使用 Web 本身作为一种媒介（设计受内容驱动），而不是试图模拟印刷设计（内容以设计为导向）。更为重要的是，内在 Web 布局不仅上下文的流畅，适应性高，还能够在 Web 布局和当前的 CSS 功能集上发挥真正的创造力。",-1);function Xi(Ji,Bi){const n=s("ExternalLinkIcon");return o(),t("div",null,[r,e("p",null,[i("在响应式 Web 设计（Responsive Web Design）诞生八周年之际，曾任 Mozilla 的设计师（现任苹果Safari Web 开发者体验团队的布道者） "),e("a",m,[i("@Jen Simmons"),d(n)]),i("在美国马萨诸塞州波士顿举办的 "),u,i(" 大会上分享的《"),e("a",p,[i("Designing Intrinsic Layouts"),d(n)]),i("》话题中，首次提出了"),v,i(" 的概念。在过去的几年里，@Jen Simmons 也称之为“"),b,i(" ”。但它到底是什么？它与响应式网页设计有什么不同？内在 Web 设计又将会用到哪些 CSS 技术？接下来，我们就一起来探讨这方向的话题！")]),g,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",f,[i("https://codepen.io/airen/full/dyKENyW"),d(n)])])]),h,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",S,[i("https://codepen.io/airen/full/KKeLazj"),d(n)])])]),_,e("p",null,[i("这些用于决定框大小的 CSS 属性都可以接受 "),x,i("、"),k,i("、"),C,i("、"),j,i("、"),w,i("，除此之外，在未来它们还可以接受 "),W,i("、"),y,i(" 和 "),q,i("（这几个属性值是在 "),e("a",z,[i("CSS Box Sizing Module Level 4"),d(n)]),i(" 模块中定义的）。")]),R,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",F,[i("https://codepen.io/airen/full/qBKGrEK"),d(n)])])]),M,e("p",null,[i("我在 Twitter 上看到 "),e("a",H,[i("@stefanjudis"),d(n)]),i(" 录制了"),e("a",D,[i("一个视频"),d(n)]),i("，来展示 "),L,i(" 、"),G,i(" 和 "),N,i(" 之间的差异，我觉得非常形象：")]),T,I,K,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",E,[i("https://codepen.io/airen/full/jOKoBMM"),d(n)])])]),A,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",V,[i("https://codepen.io/airen/full/mdKYWjy"),d(n)])])]),X,e("p",null,[J,i(" 、"),B,i(" 和 "),Y,i(" 除了可以当作元素的 "),Z,i(" 值之外，也可以作为 "),O,i(" 的值。当然，我们通过 《"),e("a",U,[i("08 | Flexbox 布局中的 flex-basis：谁能决定 Flex 项目的大小？"),d(n)]),i("》学习知道，Flexbox 中的 "),Q,i(" 计算是复杂的。有关于它的计算这里不再重复累述。我们来看看 "),P,i(" 、"),$,i(" 和 "),ee,i(" 在 Flex 项目上的使用。分两种情况。")]),ie,ne,e("p",null,[i("当 Flex 容器空间不足时，由于 "),de,i(" 的默认值为 "),le,i(" ，Flex 项目会按照 "),ce,i(" 的计算公式（《"),e("a",se,[i("07 | Flexbox 中的计算：通过收缩因子比例收缩 Flex 项目"),d(n)]),i("》）对 Flex 项目的 "),oe,i(" 进行计算，直到 Flex 项目的 "),te,i(" 计算值等于 "),ae,i(" 为止（不再进行收缩）：")]),re,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",me,[i("https://codepen.io/airen/full/eYKaXEp"),d(n)])])]),ue,e("p",null,[i("有关于 "),pe,i(" 函数在网格中的使用，更详细的介绍可以阅读前面的课程《"),e("a",ve,[i("13 | 可用于 Grid 布局中的函数"),d(n)]),i(" 》。除此之外，"),be,i(" 和 "),ge,i(" 还可以和 "),fe,i(" 函数结合起来使用，有关于这方面更详细的介绍，也在前面的课程（《"),e("a",he,[i("13 | 可用于 Grid 布局中的函数"),d(n)]),i(" 》）中详细介绍，这里不再重复阐述。")]),Se,e("p",null,[i("记得在 《"),e("a",_e,[i("18 | 使用 Grid 构建经典布局：10 种经典布局"),d(n)]),i(" 》这节课中，介绍网格轨道尺寸设置为 "),xe,i(" 和 "),ke,i(" 差别时介绍过，"),Ce,i(" 和 "),je,i(" 属性取值为 "),we,i(" 时，意味着网格轨道占用可用空间来容纳内容。如果网格容器有剩余空间，那么 "),We,i(" 是很“贪婪的”，它将占用容纳内容的空间加上它可以占用的最大剩余空间。")]),ye,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",qe,[i("https://codepen.io/airen/full/wvXbZmM"),d(n)])])]),ze,e("p",null,[i("正如前面课程《"),e("a",Re,[i("13 | 可用于 Grid 布局中的函数"),d(n)]),i(" 》中所述，在 "),Fe,i(" 函数中的最小值和最大值都设置 "),Me,i(" ，也更好地说明了 "),He,i(" 和 "),De,i(" 的差异：")]),Le,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ge,[i("https://codepen.io/hkdc/full/EXRjpJ"),d(n)])])]),Ne,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Te,[i("https://codepen.io/airen/full/NWzVZpe"),d(n)])])]),Ie,Ke,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Ee,[i("https://codepen.io/airen/full/eYKawep"),d(n)])])]),Ae,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ve,[i("https://codepen.io/airen/full/ZERNdjQ"),d(n)])])]),Xe,Je,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Be,[i("https://codepen.io/airen/full/BaVgoar"),d(n)])])]),Ye,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Ze,[i("https://codepen.io/airen/full/QWxXjKY"),d(n)])])]),Oe,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Ue,[i("https://codepen.io/airen/full/WNyqyxj"),d(n)])])]),Qe,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Pe,[i("https://codepen.io/airen/full/WNyqKvK"),d(n)])])]),$e,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ei,[i("https://codepen.io/airen/full/KKejxRg"),d(n)])])]),ii,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ni,[i("https://codepen.io/airen/full/KKeOMVG"),d(n)])])]),di,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",li,[i("https://codepen.io/airen/full/MWXNjGb"),d(n)])])]),ci,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",si,[i("https://codepen.io/airen/full/ExRqgOo"),d(n)])])]),oi,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ti,[i("https://codepen.io/airen/full/GRGVNPj"),d(n)])])]),ai,ri,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",mi,[i("https://codepen.io/airen/full/WNyVRrJ"),d(n)])])]),ui,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",pi,[i("https://codepen.io/airen/full/KKeOaar"),d(n)])])]),vi,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",bi,[i("https://codepen.io/airen/full/yLEmMYN"),d(n)])])]),gi,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",fi,[i("https://codepen.io/airen/full/ExRqmvd"),d(n)])])]),hi,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Si,[i("https://codepen.io/airen/full/VwdobRv"),d(n)])])]),_i,e("blockquote",null,[e("p",null,[i("自 2019 年开始，每年年底都会有一份关于 CSS 发展状态相关的报告（"),e("a",xi,[i("2019"),d(n)]),i("、"),e("a",ki,[i("2020"),d(n)]),i(" 和 "),e("a",Ci,[i("2021"),d(n)]),i("），其中 CSS 容器查询一直以来位居榜首！")])]),ji,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",wi,[i("https://codepen.io/airen/full/wvXVeMp"),d(n)])])]),Wi,yi,e("p",null,[e("a",qi,[i("@Jen Simmons 在她分享的 PPT"),d(n)]),i(" 中介绍了一些如何使用 CSS Flexbox 和 CSS Grid 布局技术实现内在 Web 设计的案例。你可以从 labs.jensimmons.com 中获取到相关的案例：")]),zi,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ri,[i("https://codepen.io/airen/full/ExRqMXY"),d(n)])])]),Fi,Mi,Hi,e("p",null,[i("可能很多同学会说上面示例实用性不强，那我们再来看一个更趋向于工作中的示例吧。比如类似 "),e("a",Di,[i("An Event Apart"),d(n)]),i(" 的 "),e("a",Li,[i("landing pages"),d(n)]),i(" 的效果：")]),Gi,Ni,Ti,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Ii,[i("https://codepen.io/airen/full/JjZgVoE"),d(n)]),i(" （请使用 Firefox 浏览器查看，效果更佳）")])]),Ki,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Ei,[i("https://codepen.io/airen/full/JjZgVoE"),d(n)])])]),Ai,Vi])}const Zi=c(a,[["render",Xi],["__file","index-24.html.vue"]]);export{Zi as default};
