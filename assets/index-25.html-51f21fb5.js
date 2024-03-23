import{_ as l,M as c,p as o,q as a,R as e,t as i,N as d,a1 as s}from"./framework-e8cb8151.js";const t={},p=s('<h1 id="_25-创建不规则-web-布局" tabindex="-1"><a class="header-anchor" href="#_25-创建不规则-web-布局" aria-hidden="true">#</a> 25-创建不规则 Web 布局</h1><p>到目前为止，我们前面所有课程中介绍的 Web 布局技术都遵循着同样的布局原则：<strong>让矩形块元素按行和列排列，即矩形内嵌套矩形。<strong>这也是 Web 页面一直以来的结构，在很大程度上受到印刷行业所遗留的影响</strong>。</strong> 虽然 CSS Grid 布局让我们可以实现更好、更优美布局效果，但与印刷传媒相比，一般的 Web 布局仍然显得很丑，特别是涉及到内容流时尤其如此。</p><p>另外，长期以来，Web 设计师一直被迫在矩形约束下进行设计。 Web 上的大多数内容仍然被困在简单的矩形盒子里，大多数非矩形布局的创造性尝试都以失败告终。虽然 CSS Grid 布局可以让我们更优雅地实现元素交叉或层叠的布局，以及使用 CSS 的 <code>clip-path</code> 可以让 UI 元素在视觉上有着不规则的图形，但并没有真正改变内容流在任意复杂形状内部和周围的流动方式。</p><p>这不管是对于 Web 设计师还是 Web 开发者而言，都是痛苦的，他们无法真正发挥自己的优势，把自己的创意带来到 Web 中。值得庆幸的是，Web 开发者一直没有放弃。社区中有着一群 Web 开发者一直在试图通过使用 CSS 创建几何形状来打破矩形限制，而且 CSS Shapes 真正改为了这一点。<strong>它为 Web 设计师提供了一种新的方式来改变内容在任意复杂形状内部和周围的流动式方</strong> —— 这是我们以前从未做到的，即使是使用 JavaScript 也无法做到。比如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09332bf4c25a4f55a3fc794ecf67fdb2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>简而言之，CSS Shapes 的出现，允许我们对文本进行包装，而不仅仅是矩形框。<strong>你现在可以将文本在圆形</strong> 、<strong>椭圆</strong> 、<strong>多边形甚至图像上周围或内部流动</strong>。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2866ed48c9e4bfc9035f91d625e0bae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这节课，我们就讲讲 CSS 如何实现类似上图这样不规则的布局。</p><p>我们要实现一个不规则的 Web 布局效果，主要是内容围绕着图形流动的布局，将需要掌握以下相关技术：</p><ul><li>CSS 的浮动 <code>float</code> 布局；</li><li>CSS Shapes 特性；</li><li><code>clip-path</code> 相关特性。</li></ul><p>我们先从 CSS 浮动开始！</p><h2 id="css-浮动" tabindex="-1"><a class="header-anchor" href="#css-浮动" aria-hidden="true">#</a> CSS 浮动</h2><p>不知道大家是否和我有同样的一个感觉，每当拿起一篇杂志文章，总能发现左边或右边有图片，文字流畅地围着图片，这就是打印世界中看到的浮动：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/952c59eaa7db43c8973812a5bb0bf6fd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在 Web 的世界中，CSS 浮动 <code>float</code> 设计初衷也是用来处理文本围绕图片排版的，就像在杂志布局中一样。碍于当时 Web 布局可用方案的局限性，才有了把浮动用于 Web 布局技术，而且一用就是很多年，直到 CSS Flexbox 布局的成熟才慢慢看不到浮动布局。</p><p>但这决不能表明，<strong>浮动就将退出历史的舞台</strong>。因为到目前为止，在 Web 中处理文本围绕图片的排版还是离不开 CSS 的浮动特性。这也再次印证我前面所说的观点：<strong>在 Web 布局中，绝不会有任何一种布局技术成为最终技术，也不会存在以一种布局技术替代另一种布局技术</strong>。</p><p>既然是要聊浮动，那么我们从它的定义开始聊起吧。W3C是这样对浮动定义的：</p><blockquote><p><strong>浮动是在当前行上向左或向右移动框（盒子）。浮动最有趣的特性是内容可能沿着它的<strong><strong>侧</strong></strong>边流动。内容沿着左浮动框的右侧向下流动，并沿着右浮动框的左侧向下流动</strong> 。</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/846afca4d21a49f4bdcc1abd827bb34c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在 Web 中，HTML 文档会受到一些规则约束，特别是正常的文档流。在正常的文档流中，每个块级元素（比如 <code>div</code>、<code>p</code>等）垂直地堆叠在一起，从视图的顶部向下堆叠。但元素要是使用了浮动特性，元素会脱离文档流。</p><p>咱们可以这样来理解，把 HTML 文档当作一张白纸。当我们在一个元素上运用浮动时，就像是在该元素上添加了另一张纸：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/536820af076f4e26b00c0e395f2df0f7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>浮动元素将会浮动到新图层上：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59c6c23d3d0146669f362895b7f330f2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>由于它不再是原始层（正常文档流）的一部分，下面的块元素会向上移动（非块元素表现行为有所差异），就像浮动元素从来没有在文档中存在过一样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f5148b65f0a40e2969dcbb83eaaa8ae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>事实上，浮动元素首先根据常规流布局，然后从常规流中取出并将其移到父元素的最右侧或最左侧（取决于应用浮动的哪个值）。也就是说，如果父元素中有足够的空间容纳每个浮动元素，那么它们就会从一个堆叠变成与另一个相邻。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59826e7870df4775b9060ed54f1f04c2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，容器中有多个元素使用浮动时，当容器没有足够空间的容纳浮动元素时，那么浮动元素就会另起新的一行排列。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4459ce8f8a840bda4734859ee028e55~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们来看一个录屏效果，可能会更清晰一些：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f1edd4d83ed4f1fb48fa848b6ba68a9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',32),r={href:"https://codepen.io/airen/full/dyKxxwj",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,[i("事实上，浮动的本质是浮动元素自身就是一个带有方位的 "),e("code",null,"display:inline-block"),i(" 属性。某种意义上的作用就是包裹，但浮动又无法完全等同 "),e("code",null,"display:inline-block"),i("，其中原因之一就是浮动的方向性：")],-1),v=e("ul",null,[e("li",null,[e("code",null,"display:inline-block"),i(" 仅仅一个水平排列方向，从左往右（也有可能从右向左，得看书写模式）；")]),e("li",null,"浮动不受书写模式的限制可以从左往右排列，也可以从右往左排列。")],-1),m=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8ec044c002f4f4fb9082e6e1bb09e80~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),b={href:"https://codepen.io/airen/full/LYrwwKB",target:"_blank",rel:"noopener noreferrer"},g=s(`<p>现在你对 CSS 浮动有一个基本认识了，接下来看看浮动如何使用？</p><p>CSS 浮动 <code>float</code> 的使用是很简单的，该属性主要接受：</p><ul><li><strong><code>none</code></strong> ：表示元素不进行浮动；</li><li><strong><code>left</code></strong> ：元素向左浮动，元素会浮动在其所在容器的最左侧；</li><li><strong><code>right</code></strong> ：元素向右浮动，元素会浮动在其所在容器的最右侧；</li><li><strong><code>inline-start</code></strong> ：元素必须浮动在其容器的开始一侧，具体是哪一侧，将根据书写模式或者 <code>direction</code> (或 HTML 的 <code>dir</code>) 的值来决定，如果取值 <code>ltr</code> 是左侧，如果取值 <code>rtl</code>是右侧；</li><li><strong><code>inline-end</code></strong> ：元素必须浮动在其容器的结束一侧，和 <code>inline-start</code> 类似，如果取值 <code>ltr</code> 是右侧，取值<code>rtl</code> 是左侧 。</li></ul><p>假设我们有一段这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;p&gt; 
    &lt;img class=&quot;bitey-img&quot; src=&quot;apex-predator.jpeg&quot;/&gt; The alligator is a crocodilian in the genus Alligator of the family Alligatoridae. The two living species are... 
&lt;/p&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别在 <code>img</code> 上运用 <code>float:left</code> 和 <code>float:right</code> ，你将看到的效果如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceb8857610ed4fa3877acfec7ff5bc80~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>从效果上可以看到文本会围绕着 <code>img</code> 排版。这个效果是 <code>float</code> 最初的设计效果。</p><p>CSS 的浮动是一个非常奇特的属性，它一方面给我们带来了足够的灵活性，但同时他也给我们带来很多影响元素的奇怪行为。正因为如此，很多 CSSer 非常讨厌浮动，特别是对浮动不了解的同学更是如此。这也是为什么浮动难于被掌握的原因之一。为了让大家能更好地掌握浮动，为后面使用浮动来给 Web 布局打下基础，这里有必要来了解浮动给元素带来的不良影响。</p><h3 id="父容器的塌陷" tabindex="-1"><a class="header-anchor" href="#父容器的塌陷" aria-hidden="true">#</a> 父容器的塌陷</h3><p>前面多次提到过，浮动元素会从正常文档流中脱离出来，不会继续停留在其父元素内。如果一个元素只有一个子元素，那么父元素就会塌陷，就像空的一样。其表现行为就有点类似于子元素做了绝对定位。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.parent { 
    padding: 10px; 
    border: 1px dashed; 
} 

.child { 
    float: left; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d25ef6042b7b470b87f8d731b8fd9e35~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>其实该现象如果要说的严谨一点的话：<strong>容器中的所有元素都浮动的话，容器元素就会塌陷；如果有任何一个非浮动元素存在，那么容器的高度将与非浮动元素高度等同</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab473d280bef4b028a32a12e2d1d84e6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="前面的元素会将浮动元素向下推" tabindex="-1"><a class="header-anchor" href="#前面的元素会将浮动元素向下推" aria-hidden="true">#</a> 前面的元素会将浮动元素向下推</h3><p>虽然浮动元素会尽量靠近父元素的顶部，然而文档中浮动元素前面的兄弟元素会把浮动元素向下推。无论前面的元素是内联元素还是块元素。也就是说，如果我们在浮动元素之前或之后有一个段落，将会得到不同的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f90453ca707443c08b4e0754842530b3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="前面的浮动元素将得到更好的位置" tabindex="-1"><a class="header-anchor" href="#前面的浮动元素将得到更好的位置" aria-hidden="true">#</a> 前面的浮动元素将得到更好的位置</h3><p>在浮动中，“最佳”的位置将会给第一个被定义为浮动的元素。比如说，有多个元素都使用了 <code>float:right</code>，那么 HTML 中的第一个定义了 <code>float:right</code> 的元素会最靠近容器（父元素）的最右边，而这个位置也是最佳位置：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt; 
    &lt;div class=&quot;right&quot;&gt;1&lt;/div&gt; 
    &lt;div class=&quot;right&quot;&gt;2&lt;/div&gt; 
    &lt;div class=&quot;right&quot;&gt;3&lt;/div&gt; 
    &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit...&lt;/p&gt; 
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d0b76ec9339430fa682b04df07c8b50~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="接近于父元素的顶部优先于左边-右边" tabindex="-1"><a class="header-anchor" href="#接近于父元素的顶部优先于左边-右边" aria-hidden="true">#</a> 接近于父元素的顶部优先于左边/右边</h3><p>当有多个浮动元素向同一个方向浮动时，随后的元素为了更接近父元素的顶部，将会选择远离父元素左边/右边的位置。这就意味着多个浮动元素将尽可能并排排列，只有当父元素的宽度不能容纳它们，它们才会移动到下面。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8e95ab5d5cb440d8d70e4bce9472c81~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="浮动元素不能延伸到它的父元素外面" tabindex="-1"><a class="header-anchor" href="#浮动元素不能延伸到它的父元素外面" aria-hidden="true">#</a> 浮动元素不能延伸到它的父元素外面</h3><p>左浮动的元素不会延伸到父元素的左边缘外。左浮动的元素不应该延伸到父元素的右外边缘外，除非父元素没有剩余的空间。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a471279a51cf460c8cb05568b71fb4f6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="对非浮动兄弟元素的影响" tabindex="-1"><a class="header-anchor" href="#对非浮动兄弟元素的影响" aria-hidden="true">#</a> 对非浮动兄弟元素的影响</h3><p>如果浮动元素的兄弟元素（非浮动）是一个块级元素，那么该元素会忽视浮动元素，而占据浮动元素的位置，并且元素会处在浮动元素的下层（并且无法通过 <code>z-index</code> 属性改变它们的层叠位置），但它的内部文字和其他行内元素都会环绕浮动元素。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d4f0676062c404b97d650293e72f97d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果非浮动的块元素在浮动元素的前面，其行为又将会有所不同：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e47a522361644228088819793dced2b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果非浮动元素不是块级元素，而是内联级元素，则元素会环绕浮动元素排列。如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c9c7bce8dd64304a1912c1ba946fff1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="清除浮动" tabindex="-1"><a class="header-anchor" href="#清除浮动" aria-hidden="true">#</a> 清除浮动</h2><p>我们看到，一个浮动元素会被移出正常文档流，且其他元素会显示在它的下方。如果我们不想让剩余元素也受到浮动元素的影响，我们需要 停止 它；这是通过添加 <code>clear</code> 属性实现的。它对应的值主要有：</p><ul><li><strong><code>none</code></strong> ：元素不会向下移动清除之前的浮动；</li><li><strong><code>left</code></strong> ：元素被向下移动用于清除之前的左浮动；</li><li><strong><code>right</code></strong> ：元素被向下移动用于清除之前的右浮动；</li><li><strong><code>both</code></strong> ：元素被向下移动用于清除之前的左右浮动；</li><li><strong><code>inline-start</code></strong> ：该关键字表示该元素向下移动以清除其包含块的起始侧上的浮动。即在某个区域的左侧浮动或右侧浮动；</li><li><strong><code>inline-end</code></strong> ：该关键字表示该元素向下移动以清除其包含块的末端的浮点，即在某个区域的右侧浮动或左侧浮动。</li></ul><p>前面，我们提到了浮动元素会对其他元素造成一定的影响，比如说浮动元素父元素塌陷。为了避免一些你无法预估的影响，在使用浮动的时候，建议配合使用清除浮动。 在 CSS 中清除浮动常见的方式主要有：</p><ul><li>使用块级格式化上下文（BFC）来清除浮动，比如在浮动父元素上使用 <code>float</code>、<code>overflow</code>、<code>display</code>等；</li><li>借助伪元素 <code>::before</code> 和 <code>::after</code> ，在该元素上添加 <code>clear:both</code> 样式 ；</li><li><code>display</code> 中最新属性之一 <code>flow-root</code>用来清除浮动。</li></ul><p>来看看这三种清除浮动的示例代码：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- HTML --&gt; 
&lt;div class=&quot;box clearfix&quot;&gt; 
    &lt;img src=&quot;/images/police.svg&quot; width=&quot;150&quot; alt=&quot;Police!&quot;&gt; Alice was beginning to get very tired of sitting by her sister on the bank... 
&lt;/div&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* BFC方式 */  
.clearfix { 
    overflow: hidden; 
} 

/* 伪元素方式 */  
.clearfix::after { 
    content: &#39;&#39;; 
    display: table; 
    clear: both; 
} 

/* flow-root方式 */  
.clearfix { 
    display: flow-root; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-exclusions" tabindex="-1"><a class="header-anchor" href="#css-exclusions" aria-hidden="true">#</a> CSS Exclusions</h2><p>我想你现在已经知道了，我们可以使用 CSS 的浮动 <code>float</code> 特性，让文本围绕着某个元素左侧或右侧排列，但 CSS 浮动特性始终无法实现文本围绕着某元素四周排版，就像一些办公软件（比如 Word）中，文本围绕着图片四周排列：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d639e88f30544122b135afce10693df2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,46),h={href:"https://www.w3.org/TR/css3-exclusions/",target:"_blank",rel:"noopener noreferrer"},f=e("strong",null,"文本围绕图片方式",-1),S=e("code",null,"float",-1),x=e("code",null,"position",-1),k=e("code",null,"absolute",-1),_=e("code",null,"relative",-1),C=e("code",null,"fixed",-1),y=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7f390626c8046d1b5a63a2a93d33a78~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),j=e("p",null,"该模块引入了两个新属性和值：",-1),q=e("ul",null,[e("li",null,[e("strong",null,[e("code",null,"wrap-flow")]),i(" ：设置排除（Exclusion） 区域以及内容围绕的方式；")]),e("li",null,[e("strong",null,[e("code",null,"wrap-through")]),i(" ：设置元素是否继承其父元素的包裹上下文。换句话说，在元素外部定义的排除不会影响元素的子元素布局。")])],-1),w={href:"https://caniuse.com/css-exclusions",target:"_blank",rel:"noopener noreferrer"},z=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da83f1ecc5f1472ea786c66226af11c4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>所以，到目前为止，这两个特性只能用于实验性的项目中，不适合用于生产项目。但如果你对这个特性感兴趣，建议你花几分钟时间了解一下，说不定哪一天，其他平台也快速支持了该特性。</p><p>先来看 <code>wrap-flow</code> 属性，可接受的值有 <code>auto</code> 、<code>both</code> 、<code>start</code> 、<code>end</code> 、<code>minimun</code> 、<code>maximum</code> 和 <code>clear</code> 。通过下面这个示例来模拟这几个值的作用：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;example&quot;&gt; 
    &lt;p&gt;Lorem ipsum dolor sit amet ...&lt;/p&gt; 
    &lt;img src=&quot;xxx&quot; alt=&quot;&quot; class=&quot;avatar&quot;&gt; 
    &lt;p&gt;Lorem ipsum dolor sit amet ...&lt;/p&gt; 
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在没有使用 CSS Exclusions 时，看到的效果类似于：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a46de749bb794c3996f93730dcc947d3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果使用 <code>wrap-flow</code> ，它对应的值取得的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33606440f1874b16b5e06a57e18d3acb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>可以说，一旦 <code>wrap-flow</code> 不再仅是一个实验性特性时，它可以让我们文本流的排列方式更接近像 Word 办公软件中的文本流排列方式。</p><p>另外，<code>wrap-flow</code> 中的 <code>start</code> 和 <code>end</code> 值也会受 CSS 的书写模式和语言的阅读模式所影响：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c172584104243acbb0d3cefba1ae7d9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>wrap-flow</code> 是一个可继承属性，如果不希望后代元素继承 <code>wrap-flow</code> 的特性，可以在其后代元素上使用 <code>wrap-through</code> 属性，并且设置其值为 <code>none</code> 。</p><blockquote><p><strong>特别声明， CSS 的</strong> <strong><code>wrap-flow</code></strong> <strong>和</strong> <strong><code>wrap-through</code></strong> <strong>还仅是 CSS 的实验特性，它对应的规范也随时有可能会随着 CSS 的发展而被改变。在此，大家仅能当其作为一个扩展知识进行了解，还不能使用到任何生产项目当中。切记！</strong></p></blockquote><h2 id="css-shapes" tabindex="-1"><a class="header-anchor" href="#css-shapes" aria-hidden="true">#</a> CSS Shapes</h2><p>熟悉 CSS 的 Web 开发者都知道，我们现在可以使用像 <code>border</code> 、<code>border-radius</code> 、<code>box-shadow</code> 、渐变 和 <code>clip-path</code> 等 CSS 属性来创建各种形状，但所有这些形状都不会影响它们内部或周围的内容流。</p><p>也就是说，如果你用 CSS 创建一个三角形或圆形，所创建的形状不会定义或影响其内部文本的流动方式，也不会影响它周围的内联文本的流动方式。因为 Web 上的大多数内容仍然被困在简单的盒子里，所以大多数非矩形布局的创造性尝试都以失败告终。</p><p>换句话说，即使 CSS 浮动结合可以创建出各种形状，你也只能让文本围着一个矩形流动，除非有一天 CSS Exclusions 不再是实验性属性，它或许有所改变，比如文本能四周都围绕着一个形状，但这个形状还是离不开矩形的限制。</p><p>庆幸的是，随着 CSS Shapes 模块的引入，我们将不再局限于将内容围绕着矩形流动。CSS Shapes 允许 Web 开发者围绕自定义路径(如圆、椭圆和多边形)来包装内容，从而摆脱矩形的限制。</p>`,18),L={href:"https://www.smashingmagazine.com/2019/04/art-direction-for-the-web-using-css-shapes/",target:"_blank",rel:"noopener noreferrer"},W=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bdf0c3f329a4a0c8841fe442a712dce~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),M={href:"https://www.smashingmagazine.com/2019/04/art-direction-for-the-web-using-css-shapes/",target:"_blank",rel:"noopener noreferrer"},T=s('<p>也就是说，我们现在除了使用 CSS Shapes 的基本特性，可以构建文本围绕着圆形（<code>circle()</code> ）、椭圆（<code>ellipse()</code>）、矩形（<code>inset()</code>）和多边形（<code>polygon()</code>）流动之外，还可以利用 CSS 的一些其他特性，比如剪切（<code>clip-path</code>）和蒙板（<code>mask</code>）等，使 CSS Shapes 更超常的发挥，构建出更复杂和令人惊叹的布局，比如 <strong>V字型布局</strong> 、<strong>Z字型布局</strong> 、<strong>曲线布局</strong> 、<strong>对角线形状布局</strong> 、<strong>旋转布局</strong> 和<strong>任意图像定义的布局</strong>等。</p><p>接下来的内容，我们先从 CSS Shapes 的规范与浏览器的兼容性开始，然后再向大家介绍 CSS Shapes 声明形状的基础知识，并使用这些新的 CSS 技术创建一些简单的布局。最后再向大家介绍，如何将 CSS Shapes 结合其他 CSS 的特性来构建更复杂、更有创意的布局。</p><h3 id="css-shapes-规范和兼容性" tabindex="-1"><a class="header-anchor" href="#css-shapes-规范和兼容性" aria-hidden="true">#</a> CSS Shapes 规范和兼容性</h3><p>CSS Shapes 规范曾经是 <strong>CSS Shapes 和 CSS Exclusions 规范</strong> ，但后面 W3C 的 CSS 工作小组将它们拆分出来成为两个独立的模块：</p>',4),B=e("li",null,[i("CSS Shapes 模块定义了 "),e("code",null,"shape-inside"),i(" 和 "),e("code",null,"shape-outside"),i(" 等属性；")],-1),D={href:"https://www.w3.org/TR/css3-exclusions/",target:"_blank",rel:"noopener noreferrer"},A=e("code",null,"wrap-flow",-1),H=e("code",null,"wrap-through",-1),R=e("code",null,"wrap-margin",-1),E=e("code",null,"shape-inside",-1),Y=e("code",null,"shape-outside",-1),N={href:"https://www.w3.org/TR/css-shapes-1/",target:"_blank",rel:"noopener noreferrer"},P=e("code",null,"shape-outside",-1),G=e("code",null,"shape-image-threshold",-1),O=e("code",null,"shape-margin",-1),K=e("ul",null,[e("li",null,[e("strong",null,[e("code",null,"shape-outside")]),i(" ：允许定义基本形状，比如圆形、椭圆形、矩形和多边形，它定义的形状定义了元素上的排除区域。")]),e("li",null,[e("strong",null,[e("code",null,"shape-image-threshold")]),i(" ：设定一个渗出阈值。如果一幅图像被用于定义形状，那么只有在大于等于渗出阈值的部分才会显示，其他部分不会显示出来；")]),e("li",null,[e("strong",null,[e("code",null,"shape-margin")]),i(" ：在形状外面加上外边距。")])],-1),V=e("code",null,"shape-inside",-1),Z={href:"https://drafts4.csswg.org/css-shapes-2/#shape-inside-property",target:"_blank",rel:"noopener noreferrer"},F=e("code",null,"shape-inside",-1),U=e("code",null,"shape-padding",-1),X=e("code",null,"shape()",-1),J=e("code",null,"shape-inside",-1),I=e("code",null,"display",-1),Q=s(`<div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div id=&quot;container&quot;&gt;
    &lt;p&gt;
        Some inline content
        &lt;img id=&quot;green-box&quot; src=&quot;green-box.jpg&quot; /&gt;
        with a float left and float right, in a
        &lt;img id=&quot;blue-box&quot; src=&quot;blue-box.jpg&quot; /&gt;
        simple box with a circle shape-inside.
    &lt;/p&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>#container {
    shape-inside: display;
}

#green-box { 
    float: left; 
}

#blue-box { 
    float: right; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ae7e64236a34b3eaa8d5b8d48a71a93~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),$=e("code",null,"shape-inside",-1),ee=e("code",null,"display",-1),ie={href:"https://www.w3.org/TR/css-round-display-1/#shape-inside-property",target:"_blank",rel:"noopener noreferrer"},ne=e("code",null,"shape-inside",-1),de=e("code",null,"shape-padding",-1),se=e("code",null,"shape()",-1),le={href:"https://drafts4.csswg.org/css-shapes-2/",target:"_blank",rel:"noopener noreferrer"},ce=e("strong",null,"未来的 CSS Shapes",-1),oe={href:"https://caniuse.com/css-shapes",target:"_blank",rel:"noopener noreferrer"},ae=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b982cf1a54854036b04a8874ba7d44c5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>所以接下来，我们的课程中主要会围绕着 CSS Shapes 中的 <code>shape-outside</code> 、<code>shape-image-threshold</code> 和 <code>shape-margin</code> 三个属性来展开。</p><blockquote><p><strong>特别声明，请尽量使用 Firefox 或 Safari 浏览器查看 CSS Shapes 相关的 Demo，效果会更佳！</strong></p></blockquote><h3 id="定义基本形状" tabindex="-1"><a class="header-anchor" href="#定义基本形状" aria-hidden="true">#</a> 定义基本形状</h3><p>这里所说的基本形状是指<strong>可以让 Web 开发者生成更抽象的几何化 Web 布局，而不仅仅是简单的矩形和正方形</strong> 。换句话说，就是使用 CSS Shapes 中的 <code>shape-outside</code> 绘制的基本形状。简单地说，你可以在一个元素上运用 <code>shape-outside</code> 属性指定的 <code>&lt;basic-shape&gt;</code> 值，为元素应用形状。</p><p><code>&lt;basic-shape&gt;</code> 主要包含了 <code>circle()</code>、<code>ellipse()</code>、<code>inset()</code> 和 <code>polygon()</code> 四个基本函数，我们可以利用它们来绘制：</p><ul><li><strong>圆形：</strong><code>circle()</code> ，它等于 <code>circle( &lt;shape-radius&gt;? [ at &lt;position&gt; ]? )</code>；</li><li><strong>椭圆形</strong> ：<code>ellipse()</code> ，它等于 <code>ellipse( [ &lt;shape-radius&gt;{2} ]? [ at &lt;position&gt; ]? )</code>；</li><li><strong>矩形</strong> ：<code>inset()</code> ，它等于 <code>inset( &lt;length-percentage&gt;{1,4} [ round &lt;&#39;border-radius&#39;&gt; ]? )</code>；</li><li><strong>多边形</strong> ：<code>polygon()</code> ，它等于 <code>polygon( &lt;&#39;fill-rule&#39;&gt;? , [&lt;length-percentage&gt; &lt;length-percentage&gt;]# )</code>。</li></ul><p>每个形状函数接受一组坐标，并与建立坐标系统的参考框配对，如果未显式指定参考框时，那么它们对应的是 <code>margin-box</code> 参考框。稍后会详细介绍参考框。</p><p>在详细介绍如何使用函数创建形状之前，我们有必要先暂停一下。我们需要知道的是，如果我们仅仅使用上面的函数，也就只能创建一个形状，但要将创建的形状运用到一个元素上，就必须具备两个条件：</p><ul><li><strong>应用形状的元素必须是一个浮动元素</strong>；</li><li><strong>应用形状的元素必须具有固有的尺寸</strong> 。在元素上设置的高度和宽度将用于在该元素上建立一个坐标系统。坐标系统是必要的，因为你声明的形状将由一组点定义(例如，如果你绘制圆或椭圆，则半径)，这些点具有 <code>x</code> 和 <code>y</code> 坐标，将放置在该坐标系统上。</li></ul><blockquote><p>注意，<code>shape-outside</code> 必须是一个浮动元素，在未来的 CSS Shapes，即 <code>shape-inside</code> 允许我们不在一个浮动元素上应用形状，但现在还不是时候。</p></blockquote><p>我们通过下面这个示例来向大家进一步阐述应用形状的元素是如何正常工作的。比如，你有一个下面这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;body&gt;
    &lt;div class=&quot;shape&quot;&gt;&lt;/div&gt;
    &lt;p&gt;Lorem ipsum…&lt;/p&gt; 
    &lt;p&gt;Lorem ipsum…&lt;/p&gt; 
    &lt;p&gt;Lorem ipsum…&lt;/p&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 CSS 给 <code>.shape</code> 绘制一个圆形：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    border-radius: 50%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候在 <code>.shape</code> 元素上显式设置 <code>float</code> 的值为 <code>left</code> 或 <code>right</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    border-radius: 50%;
    float: var(--float, left);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，文本内容会围绕着 <code>.shape</code> 元素流动：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bc754efe8f046ed9ef7deb039fe352f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>不过，<code>.shape</code> 视觉外形是一个圆，主要是因为 <code>border-radius</code> 属性定义的。但 <code>border-radius</code> 没有定义实际的元素形状，此段落并没有构成圆形曲线。使用浏览器的开发者工具审查该元素，我们会发现这个元素实际上仍然是一个矩形框。 所以，即使 <code>.shape</code> 有圆的形状，<code>border-radius</code> 对这个元素的实际形状并没有任何影响。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a00ef3343a5b4c229bb5534e743410a8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>为了让文本的流动能够贴到圆上面，我们需要通过 <code>shape-outside</code> 属性来改变 <code>.shape</code> 元素的实际的形状；比如，把 <code>shape-outside</code> 的值设置为 <code>circle()</code> ，将圆形这个形状应用到 <code>.shape</code> 函数上：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    border-radius: 50%;
    float: var(--float, left);
    shape-outside: circle();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7ff6bcb8d9b4e5da701e123c7aa64da~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,24),te={href:"https://codepen.io/airen/full/jOpNdaV",target:"_blank",rel:"noopener noreferrer"},pe=s(`<p>现在你已经看到了，文本围绕着圆在流动。另外，再用浏览器开发者工具审查 <code>.shape</code> 元素时，你会发现这个元素确实被正确地渲染成了一个圆。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c0396672f74db9b0fc2fe78cb29591~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="创建圆形" tabindex="-1"><a class="header-anchor" href="#创建圆形" aria-hidden="true">#</a> 创建圆形</h3><p>如果需要给一个元素应用圆形的形状，需要给 <code>shape-outside</code> 设置 <code>circle()</code> 函数。我们可以给 <code>circle()</code> 函数传入相应的参数：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>circle() = circle( &lt;shape-radius&gt;? [ at &lt;position&gt; ]? )
&lt;shape-radius&gt; = &lt;length-percentage [0,∞]&gt; | closest-side | farthest-side
&lt;position&gt; = (cx, cy) /* 圆心坐标位置 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用 <code>circle()</code> 函数时，我们还可以这样来记忆它的使用：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>circle() = circle(r at cx cy)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中：</p><ul><li><strong><code>r</code></strong> 指圆的半径，它的值可以是 <code>&lt;length-perecntage&gt;</code> ，如果取百分比值时，其值是从参考框的宽度和高度解析出来的；</li><li><strong><code>cx</code></strong> 和 <strong><code>cy</code></strong> 指的是圆心位置，其中 <code>cx</code> 对应的圆心在 <code>x</code> 轴上的坐标位置，<code>cy</code> 对应的圆心在 <code>y</code> 轴上的坐标位置。</li></ul><p>圆心的坐标（<code>cx</code> 和 <code>cy</code>）是可选的。如果省略它们，元素的中心(对角线的交点)将被用作默认值，元素的水平垂直中心点位置。</p><p>当你想要保持元素大小而改变形状大小，或者保持元素位置而移动形状，那么可以像上面示例那样，不给 <code>circle()</code> 传递任何参数即可：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: circle();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，你也可以显式地设置圆的半径为 <code>50%</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: circle(50%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实它们就相当于：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: circle(50% at 50% 50%);
    
    /* 等同于 */
    shape-outside: circle();
    
    /* 也等同于 */
    shape-outside: circle(50%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以根据需要手动调整圆心位置、圆半径等相关参数，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: circle(60px at 30% 70%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4856d53d2a904e6798dfed1aca8c80ae~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你除了可以使用任何长度单位 <code>&lt;length&gt;</code>（比如，<code>px</code>、<code>em</code>、<code>pt</code> 、<code>rem</code>等）和百分比单位指定圆的半径之外，还也可以使用关键词 <code>closest-side</code> 和 <code>farthest-side</code> 来指定圆的半径：</p><ul><li><strong><code>closest-side</code></strong> ：从形状中心到参考框最近边的长度。对于圆来说，这是任何维度中最近的边；对于椭圆来说，这是半径维度中最近的边；</li><li><strong><code>farthest-side</code></strong> ：从形状中心到参考框最远边的长度。对于圆来说，这是任何维度中最远的边；对于椭圆来说，这是半径维度中最远的边。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/874e629be2274ccaacbfb4903b11abdb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>circle()</code> 函数的半径要是以 <code>closest-side</code> 或 <code>farthest-side</code> 关键词作为半径时，只有元素是矩形的状态下，才会有差异，如果元素是正方形的状态下，它们的表现是相似的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/380b6a9d2cb04cc192b61f0530ea53c7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,24),re={href:"https://codepen.io/airen/full/rNrBRRX",target:"_blank",rel:"noopener noreferrer"},ue=e("code",null,"circle()",-1),ve=e("code",null,"r",-1),me={href:"https://www.w3.org/TR/css-shapes/#funcdef-circle",target:"_blank",rel:"noopener noreferrer"},be=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64f1c413af32461cb7be37110d034358~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>理解这一点很有用，因为它可以帮助你想象，如果元素的尺寸不相等，得到的圆会是什么形状。</p><h3 id="创建椭圆形" tabindex="-1"><a class="header-anchor" href="#创建椭圆形" aria-hidden="true">#</a> 创建椭圆形</h3><p><code>shape-outside</code> 创建椭圆形和圆形类似，它使用的是 <code>ellipse()</code> 函数：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>ellipse = ellipse( [ &lt;shape-radius&gt;{2} ]? [ at &lt;position&gt; ]? )
&lt;shape-radius&gt; = &lt;length-percentage [0,∞]&gt; | closest-side | farthest-side
&lt;position&gt; = (cx, cy) /* 椭圆圆心坐标位置 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它看起来像被压扁的圆。相对于 <code>circle()</code> 函数，它有两个半径：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>ellipse(rx ry at cx cy)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 <code>rx</code> 和 ry 是椭圆在 <code>x</code> 轴和 <code>y</code> 轴上的半径，而 <code>cx</code> 和 <code>cy</code> 是椭圆圆心的坐标，其中 <code>cx</code> 是椭圆圆心在 <code>x</code> 轴上的位置，<code>cy</code> 是椭圆圆心在 <code>y</code> 轴上的位置。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: ellipse(150px 300px at 50% 50%);
    width: 300px;
    aspect-ratio: 1 / 2;
    float: left;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/930d4d2c38d94c2ebf890ce3b3ee04c2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,10),ge={href:"https://codepen.io/airen/full/xxJxwYv",target:"_blank",rel:"noopener noreferrer"},he=s(`<p><code>ellipse()</code> 函数中的 <code>rx</code> 和 <code>ry</code> 也可以取百分比值，只不过它们取百分比值时的计算不会像 <code>circle()</code> 函数中的半径 <code>r</code> 取百分比计算那么复杂。这里的百分比值会根据应用形状元素参考框的宽度( <code>rx</code> 值)和高度( <code>ry</code> 值)进行解析。</p><p>另外，<code>ellipse()</code> 函数中的 <code>rx</code> 和 <code>ry</code> 也可以设置关键词 <code>closest-side</code> 和 <code>farthest-side</code> ，其中：</p><ul><li><strong><code>closest-side</code></strong> 表示半径等于椭圆中心到参考框最近边之间的距离；</li><li><strong><code>farthest-side</code></strong> 表示半径等于椭圆中心到参考框最远边之间的距离。</li></ul><p>上面的示例，我们也可以使用这两个关键词来描述椭圆形状的半径：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: ellipse(closest-side farthest-side at 50% 50%);
    
    /* 等同于 */
    shape-outside: ellipse(150px 300px at 50% 50%);
    
    width: 300px;
    aspect-ratio: 1 / 2;
    float: left;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建矩形" tabindex="-1"><a class="header-anchor" href="#创建矩形" aria-hidden="true">#</a> 创建矩形</h3><p>这听起来可能令人感到困惑。不是说 Web 中的任一元素都是一个矩形盒子？既然如此，为什么还要创建一个矩形呢？我尝试着用一个示例来阐述，为什么要单独使用一个函数来创建矩形。假设浮动元素是像下图所示的一张图片：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17d82ca6cead48409d1a5a6cfe6e413b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>但我们的需求是，文本流动的时候只围绕着图片中的蛋糕，就像下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb2b9b34a5654e2db999069989f06454~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这个时候，我们使用创建矩形的函数就比较适合：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37546faee0564ebf80f40dc19068768b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;section&gt;
    &lt;img src=&quot;&quot; alt=&quot;&quot; class=&quot;shape&quot; /&gt;
    &lt;p&gt;Lorem ipsum dolor&lt;/p&gt;
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 未使用 inset() */
.shape {
    float: left;
    width: 300px;
}

/* 使用 inset() */
.shape {
    float: left;
    width: 300px;
    shape-outside: inset(25% 20% 15% 0%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5c4f734dc124c14aef2b259e65cf48b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),fe={href:"https://codepen.io/airen/full/MWBWKKM",target:"_blank",rel:"noopener noreferrer"},Se=s(`<p>你已经看到了，在图片元素上应用 <code>inset()</code> 函数创建矩形之后，文本流动就围绕着 <code>inset()</code> 函数指定的区域，图片的其他区域会被文本覆盖。</p><p><code>inset()</code> 函数，它的使用语法规则如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>inset() = inset( &lt;length-percentage&gt;{1,4} [ round &lt;&#39;border-radius&#39;&gt; ]? )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>inset()</code> 函数的完整写法是 <code>inset(top right bottom left round border-radius)</code> 。前四个参数指定从参考框边缘向内的偏移量。它们指定了内嵌矩形在元素中的位置：</p><ul><li><strong><code>top</code></strong> ：内嵌矩形的顶部边缘距离参考框顶部边缘的距离；</li><li><strong><code>right</code></strong> : 内嵌矩形的右侧边缘距离参考框右侧边缘的距离；</li><li><strong><code>bottom</code></strong> ：内嵌矩形的底部边缘距离参考框底部边缘的距离；</li><li><strong><code>left</code></strong> ：内嵌矩形的左侧边缘距离参考框左侧边缘的距离。</li></ul><p>这四个参数值可以像 <code>margin</code> 或 <code>padding</code> 一样，显式设置 <code>1 ~ 4</code> 个值，当：</p><ul><li>取一个值时，表示 <code>top = right = bottom = left</code>；</li><li>取两个值时，第一个值表示 <code>top</code> 和 <code>bottom</code> ；第二个值表示 <code>right</code> 和 <code>left</code>；</li><li>取三个值时，第一个值表示 <code>top</code> ；第二个值表示 <code>right</code> 和 <code>left</code> ；第三个值表示 <code>bottom</code>；</li><li>取四个值时，第一个值表示 <code>top</code> ；第二个值表示 <code>right</code> ；第三个值表示 <code>bottom</code> ；第四个值表示 <code>left</code>。</li></ul><p>这四个参数值可以接受 <code>&lt;length-percentage&gt;</code> 值，比如 <code>px</code> 、 <code>rem</code> 和 <code>0%</code> 等。同样的，如果取百分比值时，它是相对于参考框的宽度和高度计算，其中：</p><ul><li><code>top</code> 和 <code>bottom</code> 相对于参考框高度计算；</li><li><code>right</code> 和 <code>left</code> 相对于参考框宽度计算。</li></ul><p>需要注意的是，这四个参数，无论使用哪一种尺寸（<code>&lt;length&gt;</code> 或 <code>&lt;perceante&gt;</code>），如果同一方向的总和超过了实际使用的尺寸，则会按比例降到 <code>100%</code> 。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    shape-outside: inset(75% 0% 50% 0%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定的 <code>inset(75% 0% 50% 0%)</code> 会使上边缘和下边缘之间距离达到参考框高度的 <code>125%</code> ，它们将按比例减少到总和为 <code>100%</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Step01: 75% + 50% = 125%;
Step02: 125% - 100% = 25%；
Step03: 25% ÷ 125% × 75% = 15%
Step04: 75% - 15% = 60%
Step05: 25% ÷ 125% × 50% = 10%
Step06: 50% - 10% = 40%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终 <code>inset(75% 0% 50% 0%)</code> 和 <code>inset(60% 0% 40% 0%)</code> 等同。</p><p><code>inset()</code> 函数还接受一个可选参数，用于将内嵌矩形的圆角。指定圆角的方式与 CSS 的 <code>border-radius</code> 完全相同，你可以使用一到四个值。不过，要是使用 <code>border-radius</code> 来设置内嵌矩形圆角的话，需要在该参数前加上关键词 <strong><code>round</code></strong> 。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    float: left;
    
    shape-outside: inset(10% 20% 10% 0% round 20px);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然 <code>inset()</code> 函数与圆或椭圆没有直接关系，但它可以在元素上内嵌一个矩形。不过，由于元素已经是矩形了，我们不需要它来创建更多的矩形。相反，<code>inset()</code> 可以帮助我们创建圆角的矩形，并且在这些圆角周围有内容流。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 未使用 inset() */
.shape {
    width: 480px;
    apspect-ratio: 16 / 9;
    border-radius: 200px;
    float: left;
}

/* 使用 inset() */
.shape {
    width: 480px;
    apspect-ratio: 16 / 9;
    border-radius: 200px;
    float: left;
    shape-outside: inset(0 round 200px);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aaf9c3db099496992746b55a6ccbe62~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,19),xe={href:"https://codepen.io/airen/full/bGjGEZy",target:"_blank",rel:"noopener noreferrer"},ke=s(`<h3 id="创建多边形" tabindex="-1"><a class="header-anchor" href="#创建多边形" aria-hidden="true">#</a> 创建多边形</h3><p>如果圆（<code>circle()</code>）、椭圆（<code>ellipse()</code>）和内嵌矩形（<code>inset()</code>）给你的选择限制太大，那么 <code>polygon()</code> 将为你提供一个更大的选择世界。我们可以使用 <code>polygon()</code> 绘制更多不同形状的图形。它的语法规则：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>polygon() = polygon( &lt;&#39;fill-rule&#39;&gt;? , [&lt;length-percentage&gt; &lt;length-percentage&gt;]# )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其格式为 <code>polygon(x1 y1, x2 y2，…)</code>，其中为多边形的每个顶点(点)指定一对 <code>(x, y)</code> 坐标。指定多边形的最小对数是 <code>3</code>，即三角形。如果使用 <code>polygon()</code> 来绘制一个三角形的话，那么就会有三对坐标点，每对之间用一个逗号（<code>,</code>）分隔，比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6172134e4197409ba011d0ac1c36b0b2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们要是把上图中 <code>polygon()</code> 绘制的三角形运用于 <code>shape-outside</code> 属性：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    
    float: left;
    shape-outside: polygon(50% 0%, 0% 100%, 100% 100%);
}

.shape2 {
    width: 300px;
    aspect-ratio: 1;
    
    float: right;
    shape-outside: polygon(50% 100%, 0% 0%, 100% 42%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c258f7eaa2944159f7e30882f9a1f8c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如你所看到的，文本流只是围绕着 <code>polygon()</code> 函数绘制的多边形流动，有些文本还是覆盖着元素框。但如果你希望元素也具备同等的形状，那就需要使用 CSS 的 <code>clip-path</code> 属性，将 <code>shape-outside</code> 属性上的 <code>polygon()</code> 函数同样运用于 <code>clip-path</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    
    float: left;
    shape-outside: polygon(50% 0%, 0% 100%, 100% 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.shape2 {
    width: 300px;
    aspect-ratio: 1;
    
    float: right;
    shape-outside: polygon(50% 100%, 0% 0%, 100% 42%);
    clip-path: polygon(50% 100%, 0% 0%, 100% 42%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e5d1574a20647ad95d5a98702a76174~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),_e={href:"https://codepen.io/airen/full/RwBwaXw",target:"_blank",rel:"noopener noreferrer"},Ce=s(`<p>你可以在 <code>polygon()</code> 函数运用更多的坐标点，比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2daf24d5edd46b6bd5a9115a70eb042~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>把相应坐标点运用到 <code>polygon()</code> 函数上，这个时候，文本就会围绕着 <code>polygon()</code> 函数绘制出来的图形流动：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>main::before {
    content: &quot;&quot;;
    float: left;
    width: 546px;
    height: 805px;
    shape-outside: polygon(
        55px -1px,
        9.57% 8.45%,
        15.06% 17.15%,
        0.41% 20.5%,
        -6.92% 29.07%,
        -22.67% 35.16%,
        -50.89% 41.37%,
        -75.8% 43.73%,
        -79.44% 49.93%,
        -58.94% 52.06%,
        -47.95% 47.33%,
        -3.26% 39.75%,
        -9.85% 47.7%,
        -39.52% 51.3%,
        -64.43% 58.76%,
        -73.59% 77.77%,
        -94.47% 84.85%,
        -93.73% 90.56%,
        -53.07% 84.1%,
        -40.26% 67.45%,
        0.77% 67.58%,
        -8.42% 80.59%,
        -21.22% 90.42%,
        -20.84% 99.38%,
        -4.57% 97.33%,
        13.13% 101.34%,
        28.72% 94.26%,
        43.75% 74.89%,
        56.35% 62.5%,
        76.74% 24.41%,
        101.7% 17.48%,
        101.87% 14.32%,
        92.52% 11.73%,
        74.31% 6.78%,
        57.63% 1.97%
    );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c605d7786194951970fd315ebd11e1a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),ye={href:"https://codepen.io/airen/full/LYBYZRw",target:"_blank",rel:"noopener noreferrer"},je=s(`<p>使用上面示例的方法，我们就可以使用 CSS Shapes 来构建“爱丽丝梦游仙境（Alice in Wonderland）”故事绘的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37d9ed893c454b599c3339f48f7446c6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>拿第一张为例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/721c48a96c9c4eb2a198878ab1c63d99~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果未来 <code>shape-inside</code> 得到支持之后，我们只需要将中间文本流对应的形状用 <code>polygon()</code> 绘制出来，并运用于 <code>shape-inside</code> 即可：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e788ab350304d62ba388e1f6a996cd6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>不过，在当下做不到的情况之下，只能基于 <code>shape-outside</code> 基础上，将原来的一个形状分成两个形状来做：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/568c6289301f42e9ad3687c2357d7360~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>所以我们需要一个这样的 HTML 结构：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;main&gt;
    &lt;div class=&quot;shape-shim--left shape&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;shape-shim--right shape&quot;&gt;&lt;/div&gt;
    &lt;h1 class=&quot;logo&quot;&gt;
      &lt;img src=&quot;https://www.w3cplus.com/sites/default/files/blogs/2022/2212/title-full.png&quot; alt=&quot;Alice in Wonderland&quot;&gt;
    &lt;/h1&gt;
    &lt;p&gt;Alice was beginning to get very tired of sitting by her sister on the bank...&lt;/p&gt;
&lt;/main&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>main {
    height: 1200px;
    width: 1920px;
    background: url(&quot;https://www.w3cplus.com/sites/default/files/blogs/2022/2212/bg_scn1.jpg&quot;)
    no-repeat left top / 100%;
    display: flow-root;
}

.shape {
    width: 50%;
    height: 100%;
}

.shape-shim--left {
    float: left;
    shape-outside: polygon(
        0px 0px,
        714px 0px,
        705px 200px,
        653px 262px,
        651px 345px,
        722px 381px,
        693px 411px,
        690px 455px,
        776px 476px,
        751px 516px,
        751px 556px,
        851px 559px,
        846px 611px,
        721px 650px,
        710px 694px,
        753px 728px,
        782px 790px,
        800px 839px,
        761px 898px,
        657px 923px,
        625px 1024px,
        598px 1199px,
        0px 1200px
    );
    /*   
    background-color: rgb(230 22 123 / 0.5);
    clip-path: polygon(
        0px 0px,
        714px 0px,
        705px 200px,
        653px 262px,
        651px 345px,
        722px 381px,
        693px 411px,
        690px 455px,
        776px 476px,
        751px 516px,
        751px 556px,
        851px 559px,
        846px 611px,
        721px 650px,
        710px 694px,
        753px 728px,
        782px 790px,
        800px 839px,
        761px 898px,
        657px 923px,
        625px 1024px,
        598px 1199px,
        0px 1200px
    ); 
    */
}

.shape-shim--right {
    float: right;
    shape-outside: polygon(
        94px 1007px,
        82px 886px,
        -2px 840px,
        -2px 794px,
        12px 756px,
        15px 685px,
        58px 618px,
        139px 600px,
        154px 532px,
        89px 472px,
        95px 414px,
        143px 374px,
        219px 285px,
        146px 177px,
        212px 1px,
        960px 0px,
        960px 1200px,
        59px 1199px
    );
    /*   
    background-color: rgb(30 22 123 / 0.5);
    clip-path: polygon(
        94px 1007px,
        82px 886px,
        -2px 840px,
        -2px 794px,
        12px 756px,
        15px 685px,
        58px 618px,
        139px 600px,
        154px 532px,
        89px 472px,
        95px 414px,
        143px 374px,
        219px 285px,
        146px 177px,
        212px 1px,
        960px 0px,
        960px 1200px,
        59px 1199px
    ); 
    */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f63238743ed42f8a7e006c4a2e855ab~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>把运用在 <code>.shape</code> 上的装饰样式去除掉，最终得到想要的布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/975df0c960b047919277998ad39e5d56~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,14),qe={href:"https://codepen.io/airen/full/RwBwRvp",target:"_blank",rel:"noopener noreferrer"},we=s(`<p><code>polygon()</code> 函数还接受一个可选的关键字，即 <strong><code>nonzero</code></strong> 或 <strong><code>evenodd</code></strong> 。用于确定给定点是否位于图形元素创建的剪切区域内形状的算法。</p><p><strong><code>nonzero</code></strong> 值采用的算法是：从需要判定的点向任意方向发射线，然后计算图形与线段交点处的走向；计算结果从 <code>0</code> 开始，每有一个交点处的线段是从左到右的，就加 <code>1</code> ；每有一个交点处的线段是从右到左的，就减 <code>1</code> ；这样计算完所有交点后，如果这个计算的结果不等于 <code>0</code> ，则该点在图形内，需要填充；如果该值等于 <code>0</code> ，则在图形外，不需要填充。比如下图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49d43c8071d24a6da352f5093e316ff4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>来看一个示例：</p><div class="language-XML line-numbers-mode" data-ext="XML"><pre class="language-XML"><code>&lt;svg width=&quot;250px&quot; height=&quot;250px&quot; viewBox=&quot;0 0 250 250&quot;&gt; 
    &lt;polygon fill=&quot;#F9F38C&quot; fill-rule=&quot;nonzero&quot; stroke=&quot;#E5D50C&quot; stroke-width=&quot;5&quot; stroke-linejoin=&quot;round&quot; points=&quot;47.773,241.534 123.868,8.466 200.427,241.534 7.784,98.208 242.216,98.208 &quot; /&gt; 
&lt;/svg&gt; 

&lt;svg width=&quot;250px&quot; height=&quot;250px&quot; viewBox=&quot;0 0 250 250&quot;&gt; 
    &lt;path fill=&quot;#F4CF84&quot; fill-rule=&quot;nonzero&quot; stroke=&quot;#D07735&quot; stroke-width=&quot;5&quot; d=&quot;M124.999,202.856 c-42.93,0-77.855-34.928-77.855-77.858s34.925-77.855,77.855-77.855s77.858,34.925,77.858,77.855S167.929,202.856,124.999,202.856z M125.003,245.385c-7.61,0-13.025-6.921-17.802-13.03c-2.79-3.559-6.259-8.002-8.654-8.638c-0.318-0.085-0.71-0.134-1.159-0.134 c-2.873,0-7.1,1.698-11.188,3.335c-4.929,1.973-10.029,4.021-14.774,4.021c-2.486,0-4.718-0.563-6.633-1.677 c-6.451-3.733-7.618-11.959-8.742-19.919c-0.646-4.571-1.45-10.261-3.292-12.096c-1.84-1.845-7.524-2.646-12.093-3.298 c-7.96-1.119-16.192-2.286-19.927-8.739c-3.682-6.358-0.614-14.005,2.35-21.404c1.829-4.563,3.904-9.735,3.201-12.352 c-0.638-2.392-5.073-5.861-8.64-8.648C11.539,138.025,4.618,132.612,4.618,125c0-7.61,6.921-13.025,13.027-17.802 c3.567-2.79,8.002-6.259,8.64-8.651c0.702-2.614-1.375-7.789-3.201-12.349c-2.961-7.399-6.029-15.046-2.347-21.409 c3.733-6.451,11.962-7.618,19.924-8.742c4.569-0.646,10.253-1.45,12.096-3.292c1.84-1.84,2.646-7.524,3.29-12.093 c1.127-7.96,2.291-16.192,8.745-19.924c1.914-1.111,4.147-1.674,6.633-1.674c4.745,0,9.845,2.045,14.771,4.021 c4.085,1.639,8.312,3.335,11.188,3.335c0.446,0,0.836-0.045,1.161-0.131c2.392-0.641,5.861-5.079,8.654-8.643 c4.782-6.109,10.194-13.03,17.804-13.03c7.612,0,13.025,6.921,17.804,13.027c2.782,3.565,6.259,8.002,8.654,8.643 c0.323,0.085,0.71,0.131,1.161,0.131c2.876,0,7.094-1.696,11.185-3.332c4.932-1.976,10.029-4.021,14.779-4.021 c2.478,0,4.715,0.563,6.627,1.671c6.448,3.733,7.618,11.962,8.739,19.927c0.646,4.569,1.453,10.253,3.292,12.093 c1.84,1.84,7.524,2.646,12.096,3.292c7.96,1.127,16.189,2.291,19.919,8.745c3.687,6.36,0.619,14.007-2.344,21.404 c-1.824,4.563-3.898,9.735-3.201,12.347c0.641,2.395,5.079,5.864,8.643,8.657c6.104,4.774,13.025,10.189,13.025,17.799 c0,7.612-6.921,13.025-13.03,17.804c-3.559,2.788-8.002,6.264-8.638,8.654c-0.702,2.614,1.375,7.783,3.201,12.347 c2.964,7.399,6.032,15.046,2.344,21.409c-3.733,6.448-11.959,7.618-19.924,8.739c-4.566,0.646-10.256,1.453-12.09,3.292 c-1.845,1.84-2.646,7.524-3.298,12.096c-1.119,7.96-2.291,16.189-8.745,19.919c-1.909,1.113-4.147,1.677-6.627,1.677 c-4.745,0-9.839-2.048-14.768-4.021c-4.091-1.637-8.315-3.335-11.19-3.335c-0.446,0-0.836,0.048-1.161,0.134 c-2.392,0.635-5.861,5.073-8.648,8.638C138.027,238.464,132.615,245.385,125.003,245.385z&quot; /&gt; 
&lt;/svg&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c9bbbf34648423b86509902f8ff43de~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>星星是由一条相交的路径组成的，太阳则是由一条长复合的路径组成。每个形状的内部最初并不清楚，可以根据作者的意图而有所不同。在这些情况下，<code>fill-rule</code> 允许进一步澄清。</p><p>在下一个例子中，我们可以看得更清楚些，当 <code>nonzero</code> 算法被应用到类似的图形时，究竟发生了什么？</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33e5546280c64eff8e4ae9bd26f4753a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>从上图中我们可以理解成，当方向是顺时针时，加 <code>1</code> ，逆时针时减 <code>1</code>。相交的值不等于 <code>0</code> 则填充，如果等于 <code>0</code> 则不填充。</p><p><strong><code>evenodd</code></strong> 值采用的算法是，从需要判定的点向任意方向发射线，然后计算图形与线段交点的个数，个数为奇数则该点在图形内，则需要填充；个数为偶数，则该点在图形外，不需要填充。如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb9d929560e3430ea2615da3f5ccca3f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上面的示例稍作调整：</p><div class="language-XML line-numbers-mode" data-ext="XML"><pre class="language-XML"><code>&lt;svg width=&quot;250px&quot; height=&quot;250px&quot; viewBox=&quot;0 0 250 250&quot;&gt; 
    &lt;polygon fill=&quot;#F9F38C&quot; fill-rule=&quot;evenodd&quot; stroke=&quot;#E5D50C&quot; stroke-width=&quot;5&quot; stroke-linejoin=&quot;round&quot; points=&quot;47.773,241.534 123.868,8.466 200.427,241.534 7.784,98.208 242.216,98.208 &quot; /&gt; 
&lt;/svg&gt; 

&lt;svg width=&quot;250px&quot; height=&quot;250px&quot; viewBox=&quot;0 0 250 250&quot;&gt; 
    &lt;path fill=&quot;#F4CF84&quot; fill-rule=&quot;evenodd&quot; stroke=&quot;#D07735&quot; stroke-width=&quot;5&quot; d=&quot;M124.999,202.856 c-42.93,0-77.855-34.928-77.855-77.858s34.925-77.855,77.855-77.855s77.858,34.925,77.858,77.855S167.929,202.856,124.999,202.856z M125.003,245.385c-7.61,0-13.025-6.921-17.802-13.03c-2.79-3.559-6.259-8.002-8.654-8.638c-0.318-0.085-0.71-0.134-1.159-0.134 c-2.873,0-7.1,1.698-11.188,3.335c-4.929,1.973-10.029,4.021-14.774,4.021c-2.486,0-4.718-0.563-6.633-1.677 c-6.451-3.733-7.618-11.959-8.742-19.919c-0.646-4.571-1.45-10.261-3.292-12.096c-1.84-1.845-7.524-2.646-12.093-3.298 c-7.96-1.119-16.192-2.286-19.927-8.739c-3.682-6.358-0.614-14.005,2.35-21.404c1.829-4.563,3.904-9.735,3.201-12.352 c-0.638-2.392-5.073-5.861-8.64-8.648C11.539,138.025,4.618,132.612,4.618,125c0-7.61,6.921-13.025,13.027-17.802 c3.567-2.79,8.002-6.259,8.64-8.651c0.702-2.614-1.375-7.789-3.201-12.349c-2.961-7.399-6.029-15.046-2.347-21.409 c3.733-6.451,11.962-7.618,19.924-8.742c4.569-0.646,10.253-1.45,12.096-3.292c1.84-1.84,2.646-7.524,3.29-12.093 c1.127-7.96,2.291-16.192,8.745-19.924c1.914-1.111,4.147-1.674,6.633-1.674c4.745,0,9.845,2.045,14.771,4.021 c4.085,1.639,8.312,3.335,11.188,3.335c0.446,0,0.836-0.045,1.161-0.131c2.392-0.641,5.861-5.079,8.654-8.643 c4.782-6.109,10.194-13.03,17.804-13.03c7.612,0,13.025,6.921,17.804,13.027c2.782,3.565,6.259,8.002,8.654,8.643 c0.323,0.085,0.71,0.131,1.161,0.131c2.876,0,7.094-1.696,11.185-3.332c4.932-1.976,10.029-4.021,14.779-4.021 c2.478,0,4.715,0.563,6.627,1.671c6.448,3.733,7.618,11.962,8.739,19.927c0.646,4.569,1.453,10.253,3.292,12.093 c1.84,1.84,7.524,2.646,12.096,3.292c7.96,1.127,16.189,2.291,19.919,8.745c3.687,6.36,0.619,14.007-2.344,21.404 c-1.824,4.563-3.898,9.735-3.201,12.347c0.641,2.395,5.079,5.864,8.643,8.657c6.104,4.774,13.025,10.189,13.025,17.799 c0,7.612-6.921,13.025-13.03,17.804c-3.559,2.788-8.002,6.264-8.638,8.654c-0.702,2.614,1.375,7.783,3.201,12.347 c2.964,7.399,6.032,15.046,2.344,21.409c-3.733,6.448-11.959,7.618-19.924,8.739c-4.566,0.646-10.256,1.453-12.09,3.292 c-1.845,1.84-2.646,7.524-3.298,12.096c-1.119,7.96-2.291,16.189-8.745,19.919c-1.909,1.113-4.147,1.677-6.627,1.677 c-4.745,0-9.839-2.048-14.768-4.021c-4.091-1.637-8.315-3.335-11.19-3.335c-0.446,0-0.836,0.048-1.161,0.134 c-2.392,0.635-5.861,5.073-8.648,8.638C138.027,238.464,132.615,245.385,125.003,245.385z&quot; /&gt; 
&lt;/svg&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运用 <code>fill-rule=&quot;evenodd&quot;</code> 的星星和太阳的效果就和刚才的不一样了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/216b872a21da48ee8657784706be01e6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>同样用一张图来描述，可能更易于理解：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04d3fd3a76a540439fb0ca0c92807661~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>evenodd</code> 规则是特定的算法，与 <code>nonzero</code> 情况不同，其算法和内部形状绘制的方向不相关，因为只是简单地计算它们穿过直线的路径数是不是奇偶数。</p><p>注意，如果 <code>polygon()</code> 函数中未显式指定 <code>&lt;&#39;fill-rule&#39;&gt;</code> 的值，默认会取 <code>nonzero</code> 值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.element{
    shape-outside: polygon(0 0, 0 100%, 100% 100%);
    /* 等同于 */
    shape-outside: polygon(nonzero, 0 0, 0 100%, 100% 100%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>W3C 规范中定义的 <code>&lt;basic-shape&gt;</code> 规则，除了上面介绍的 <code>circle()</code> 、<code>ellipse()</code> 、<code>inset()</code> 和 <code>polygon()</code> 函数之外，它还有 <code>xywh()</code> 、<code>rect()</code> 和 <code>path()</code> 三个函数：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>xywh() = xywh( &lt;length-percentage&gt;{2} &lt;length-percentage [0,∞]&gt;{2} [ round &lt;&#39;border-radius&#39;&gt; ]? )
rect() = rect( [ &lt;length-percentage&gt; | auto ]{4} [ round &lt;&#39;border-radius&#39;&gt; ]? )
path() = path( [&lt;&#39;fill-rule&#39;&gt;,]? &lt;string&gt; )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而且还把 <code>inset()</code> 、<code>xywh()</code> 和 <code>rect()</code> 定义为一个新规则，即 <code>&lt;basic-shape-rect&gt;</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>&lt;basic-shape-rect&gt; = &lt;inset()&gt; | &lt;rect()&gt; | &lt;xywh()&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只不过，到目前为止，这几个函数还不能用于 <code>shape-outside</code> 中绘制图形。</p><p>如果你有接触过 CSS 的 <code>clip-path</code> 的话，那么上述提到的绘制图形的函数都可能用于 <code>clip-path</code> 属性。而且 CSS 的 <code>clip-path</code> 属性还是 <code>shape-outside</code> 属性的极佳助手，因为它可以将创建的形状可视化，并裁剪出元素中超出形状之外的任何部分，所以在使用 <code>shape-outside</code> 时，我建议你和 <code>clip-path</code> 结合起来使用。有关于这方面的详细介绍，稍后在后面会详细阐述！</p><h3 id="由图像创建的形状" tabindex="-1"><a class="header-anchor" href="#由图像创建的形状" aria-hidden="true">#</a> 由图像创建的形状</h3><p>有意思的是，<code>shape-outside</code> 属性除了上述介绍的函数来创建形状之外，还可以使用带有透明 （Alpha） 通道的图像来创建形状的（路径），文本将会围绕不透明的图像部分。这个特性允许文本覆盖图像，有时候可以将文本围绕于一幅不可见的图像，达到一种多边形文本显示的效果。</p><p>比如你有一张像带有透明度的图像，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eae407db347846c5aa22179cacb93fbb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>假设上图用于下面这样的 HTML 结构中：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;section&gt;
    &lt;img class=&quot;shape&quot; src=&quot;https://www.w3cplus.com/sites/default/files/blogs/2022/2212/fig-25-63.png&quot; width=&quot;300&quot; alt=&quot;&quot; /&gt;
    &lt;p&gt;Espresso is coffee brewed by ...&lt;/p&gt;
&lt;/section&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    float: left;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先在 <code>img.shape</code> 上使用 <code>float: left</code> ，你会发现文本流会沿着元素框从右侧向下流动，并没有其他形状（还是矩形）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b040083aad1b460b85d901d27839a4ce~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可能会认为，这是因为在 <code>.shape</code> 上没有使用 <code>shape-outside</code> 。接下来，我们在上面的代码基础上添加：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    float: left;
    shape-outside: url(&quot;https://www.w3cplus.com/sites/default/files/blogs/2022/2212/fig-25-63.png&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39),ze=e("code",null,"url()",-1),Le=e("code",null,"url()",-1),We={href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS",target:"_blank",rel:"noopener noreferrer"},Me=e("code",null,"shape-outside",-1),Te=e("code",null,"none",-1),Be=e("code",null,"shape-outside",-1),De=s(`<p>尝试着将 <code>url()</code> 中的图片资源换成 URI：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c117aba875ab4ba3882fa0513036ddbc~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>你可以在浏览器开发者工具中，直接获取图片的 URI：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    float: left;
    shape-outside: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhE...&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/309932bd569c4324a2ae6cbe5edecfbf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Ae={href:"https://codepen.io/airen/full/wvxvoZW",target:"_blank",rel:"noopener noreferrer"},He=s(`<p>正如示例所示，CSS 声明 <code>shape-outside: url(image.png)</code> 会告诉浏览器从图像中提取形状。但有两个必要条件：</p><ul><li>图像必须是带有透明通道的；</li><li>图像必须是同域的。</li></ul><p>这个形状是由透明通道 Alpha 值大于某个阈值的像素定义，这个阈值默认为 <code>0</code> ，最大为 <code>1</code> 。你可以使用 <code>shape-image-threshold</code> 属性来控制图片透明通道的阈值。因此，任何不透明的像素都将作为图像中定义的形状的一部分。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    float: left;
    shape-image-threshold: .5;
    shape-outside: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhE...&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12d298ed3fcc41dd9e29fde865317bbf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Re={href:"https://codepen.io/airen/full/ZEjEeWg",target:"_blank",rel:"noopener noreferrer"},Ee=s(`<p>可能这个示例对于 <code>shape-image-threshold</code> 的使用不够典型，我们将图形换成一个带有渐变的图形，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;
    float: left;
    shape-image-threshold: var(--shape-image-threshold);
    background-image: linear-gradient(
        45deg,
        rgb(23 12 220 / 0.8) 20%,
        rgb(23 12 220 / 0.6) 40%,
        rgb(23 12 220 / 0.4) 60%,
        rgb(23 12 220 / 0.2) 80%,
        rgb(23 12 220 / 0) 100%
    );
    shape-outside: linear-gradient(
        45deg,
        rgb(23 12 220 / 0.8) 20%,
        rgb(23 12 220 / 0.6) 40%,
        rgb(23 12 220 / 0.4) 60%,
        rgb(23 12 220 / 0.2) 80%,
        rgb(23 12 220 / 0) 100%
    );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fcf9a9b9f644d74b6b7b5224dbbeb6e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Ye={href:"https://codepen.io/airen/full/KKBKWvL",target:"_blank",rel:"noopener noreferrer"},Ne=s(`<p>正如上图所示，如果你改变了阈值大小（<code>shape-image-threshold</code>），形状会随之变化，周围围绕的文本流动形状也将随之变化。</p><p>可以说，使用图像创建形状有自己强大的优势，是其他创建形状的函数无法做到的。当你有一个特别复杂的形状，或者有很多曲线和点，你想让你的内容可以更好地围绕这个图形，这个时候，可以使用 <code>url()</code> 来替代 <code>polygon()</code>。或者说，你定认形状非常棘手时，也可以考虑这样的方式。</p><p>比如，下面这个示例，你希望文本能围绕着下图中的鹦鹉流动：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0ea3117b8d0490bbf3bd3cb34a90e8a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这是 <code>polygon()</code> 函数无法做到的，即使能做到，最终绘制出来的形状曲线也是不够顺滑的。这个时候，你可以借助一些制作软件，比如 Photoshop，从原图中提取出鹦鹉图形的形状：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f63db4d891245809ccca47573881a41~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>然后将其保存为 <code>.png</code> 格式的图片，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b131b3bc4a724d8989c05d60914e0a48~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这样你就从原图中提取出所需要的图像形状。注意鹦鹉的颜色是什么不重要，你也可以将上图中的红色替换成任何你喜欢的颜色。这个时候你就可以像下面这样使用了：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>section {
    display: flow-root;
    width: 600px;
    height: 900px;
    background: url(&quot;https://www.w3cplus.com/sites/default/files/blogs/2022/2212/fig-25-70.jpg&quot;)
    no-repeat left top / 100%;
}

.shape {
    width: 600px;
    height: 900px;
    float: left;
    shape-image-threshold: var(--shape-image-threshold);
    shape-outside: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAOECAYAAAB97U88AA...&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/426ce2a8f79342dfa230a40d67e58a8b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,11),Pe={href:"https://codepen.io/airen/full/bGjGxJJ",target:"_blank",rel:"noopener noreferrer"},Ge=s(`<p>除了从原图中提取出和图片一样的形状之外，CSS 中还有另外一种方式，可以使用 CSS 的蒙板 <code>mask</code> 特性。比如像下面这个示例，你希望文本能围绕着一片叶子流动，你可以利用一张像下图这样的图片：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd66c7a3f4114ae3bc564cec3051989a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>将其用于 <code>.shape</code> 元素上：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    float: left;
    width: 400px;
    height: 400px;
    shape-outside: url(leaf.png);
    shape-image-threshold: 0.5;
    background: #009966 url(path/to/background-image.jpg);
    mask: url(leaf.png) no-repeat left top;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5e7476237d2493aba85aa6d7c0824cf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Oe={href:"https://codepen.io/airen/full/zYLYyNx",target:"_blank",rel:"noopener noreferrer"},Ke=e("code",null,"mask-image",-1),Ve=e("code",null,"shape-image-threshold",-1),Ze={href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS",target:"_blank",rel:"noopener noreferrer"},Fe=s(`<p>除了直接使用具有透明度的 PNG 图像之外，在 <code>url()</code> 函数中还可以使用 SVG 绘制的形状，比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f66c863a02b44491afbccd817ca2dda6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>尝试着将上面示例中的叶子换成枫叶形（SVG 绘制的枫叶形状）：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    float: left;
    width: 400px;
    height: 400px;
    shape-outside: url(leaf.svg);
    shape-image-threshold: 0.5;
    background: #009966 url(path/to/background-image.jpg);
    mask: url(leaf.svg) no-repeat left top;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4064c0db655749f0ba4180f8c9b19a94~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Ue={href:"https://codepen.io/airen/full/vYaYvjW",target:"_blank",rel:"noopener noreferrer"},Xe=s(`<p>使用 <code>.svg</code> 和 <code>.png</code> 一样，它们运用于 <code>mask-image</code> 和 <code>shape-outside</code> 时，都需要解决跨域问题。你也可以将 <code>.svg</code> 直接转换成 URI 格式图片来避免 CROS 兼容性。</p><h2 id="css-shapes-参考框" tabindex="-1"><a class="header-anchor" href="#css-shapes-参考框" aria-hidden="true">#</a> CSS Shapes 参考框</h2><p>现在我们知道了，我们可以在 <code>shape-outside</code> （或未来的 <code>shape-inside</code>）属性上运用 <code>circle()</code> 、 <code>ellipse()</code> 、<code>inset()</code> 、<code>polygon()</code> 和 <code>url()</code> 等函数，将形状运用于元素上，它们可以决定文本围绕着这些形状流动。</p><p>事实上，这些函数创建的形状都被定位在一个虚拟盒子（Virtual Box）中，也就是参考框（Reference Box）。 这个参考框是元素周围的一个虚拟框，它定义形状的坐标系统，坐标系统的原点在元素的左上角，<code>x</code> 轴指向右，<code>y</code> 轴指向下。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4319ab574d4f4bd680f6333a41737629~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>CSS Shpaes 参考框会影响绘制形状的函数如何如何绘制和定位。它对应有四种参考框可供选择：<code>margin-box</code> 、 <code>padding-box</code> 、 <code>border-box</code> 和 <code>content-box</code>。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69069735fe1349be8413316d9576e71b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>每种引用框都会产生不同的结果。请继续往下阅读，了解它们是如何工作。</p><p>通过前面的学习，我们知道 <code>shape-outside</code> 改变的是文本内容围绕浮动区域的形状的流动形状。其中浮动区域（<code>shape-outside</code> 绘制的形状）会延伸到 <code>margin</code> 属性定义的盒子的外部边缘。这就是 <code>margin-box</code> ，如果 <code>shape-outside</code> （或未来的 <code>shape-inside</code>）没有显式设置参考框 <code>&lt;shape-box&gt;</code> ，那么默认的参考框就是 <code>margin-box</code> 。比如，下面两个 CSS 声明具有相同的结果:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape{
    shape-outside: circle(50% at 0 0);
    
    /* 等同于 */
    shape-outside: circle(50% at 0 0) margin-box;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还没有为元素 <code>.shape</code> 设置外边距（<code>margin</code>）。此时可以假定坐标系统的原点和圆心位于元素内容区域的左上角。当你设置外边距时，情况会发生变化:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape{
    width: 200px;
    aspect-ratio: 1;
    
    shape-outside: circle(50% at 0 0) margin-box;
    margin: 100px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>坐标系统的原点现在位于元素内容区域之外(向上 <code>100px</code>，向左 <code>100px</code>)，圆心也是如此。圆半径的计算值也会随着 <code>margin-box</code> 参考框建立的坐标系统表面的增加而增加。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0526793fa2645cab4afce4ecbc8bb42~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>将参考框运用到示例中，它的作用如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ba0e380998943dd9ef4844f8b2c54f5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>最终示例效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae8be1f91cf7440a816e273f1e4197c6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),Je={href:"https://codepen.io/airen/full/ZEjEwQO",target:"_blank",rel:"noopener noreferrer"},Ie=s(`<p>上面示例使用的是 <code>circle()</code> 绘制的圆形形状，并且改变了圆心的位置。接下来，我们继续以圆形为例，只是调整形状参考框的值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 100px;
    aspect-ratio: 1;
    border-radius: 50%;
}

/* 参考框是 margin-box */
.shape-margin-box {
    margin: 50px;
    shape-outside: circle(50% at center) margin-box;
}

/* 参考框是 border-box */
.shape-border-box {
    border: 25px solid;
    shape-outside: circle(50% at center) border-box;
}

/* 参考框是 padding-box */
.shape-padding-box {
    padding: 25px;
    shape-outside: circle(50% at center) padding-box;
}

/* 参考框是 content-box */
.shape-content-box {
    shape-outside: circle(50% at center) content-box;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ada5505394fe43528fc39932a3f36de2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Qe={href:"https://codepen.io/airen/full/XWBWGjB",target:"_blank",rel:"noopener noreferrer"},$e=s('<p>CSS Shape 参考框所对应的关系如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33532149dfd34d3abebcea96d32845d9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，CSS Shape 参考框会受 CSS 的</strong> <strong><code>box-sizing</code></strong> <strong>属性的影响，上图是</strong> <strong><code>box-sizing</code></strong> <strong>取值</strong> <strong><code>border-box</code></strong> <strong>的效果</strong> 。</p></blockquote><table><thead><tr><th><strong>CSS Shape 参考框</strong></th><th><strong><code>box-sizing: content-box</code></strong></th><th><strong><code>box-sizing: border-box</code></strong></th></tr></thead><tbody><tr><td><strong><code>margin-box</code></strong></td><td><code>width = width + margin + border + padding</code> <code>height = height + margin + border + padding</code></td><td><code>width = width + margin</code> <code>height = height + margin</code></td></tr><tr><td><strong><code>border-box</code></strong></td><td><code>width = width + border + padding</code> <code>height = height + border + padding</code></td><td><code>width = width``height = height</code></td></tr><tr><td><strong><code>padding-box</code></strong></td><td><code>width = width + padding</code> <code>height = height + padding</code></td><td><code>width = width - padding</code> <code>height = height - padding</code></td></tr><tr><td><strong><code>content-box</code></strong></td><td><code>width = width</code> <code>height = hegiht</code></td><td><code>width = width - border - padding</code> <code>height = height - border -padding</code></td></tr></tbody></table><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d471f6caa5247fd87f7d0f4860d42bf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',5),ei={href:"https://codepen.io/airen/full/abjbxLd",target:"_blank",rel:"noopener noreferrer"},ii=s(`<p>为了简单起见，到目前为止的例子中，我们使用的都是正方形元素。在这种情况下，圆的半径等于正方形边的一半。</p><p>不过，我们前面也提到过，<code>circle()</code> 和 <code>ellipse()</code> 的百分比单位半径计算公式要稍微复杂一些：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3334b8f05064bc0b16419c70208f54e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这只是 <code>circle()</code> 和 <code>ellips()</code> 半径的特殊情况；其他形状函数，如 <code>polygon()</code>，则不受此限制。</p><p>当内容的数量会影响一个或两个维度时，理解这个公式对于想象 <code>content-box</code> 参考框很重要。值得注意的是，这种可变维度的情况也适用于其他参考框，而不是 <code>content-box</code> 特有的。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21652ca00c76452ba4213e8c9f0cb878~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在上面的插图中，我们观察到圆形没有触及内容框的上下边缘，但它扩展了其左右边缘。这是意料之中的，有两个原因:</p><ul><li>半径是用上面提到的公式从元素的尺寸中计算出来的；</li><li>我们省略了定义圆的中心应该在哪里，因此使用默认值——坐标系统的中心(在这个例子中是元素对角线的交点)。</li></ul><p>乍一看，<code>content-box</code> 参考框太麻烦了，不值得使用。然而，有一个有效的用例：渐进式形状。这意味着我们可以创建一个比立即需要或可见的形状大得多的形状，但随着内容数量的增加，更多的形状会显示出来。</p><p>想象一下，使用 <code>polygon()</code> 创建一个锯状的形状，沿着元素的一侧向下延伸。CSS 形状还没有 <code>repeat</code> 属性。在 <code>content-box</code> 参考框中使用渐进式形状显示，它可以与一种使用由重复模式组成的较大形状达到相同的效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b77cdf0a22cf4831948d242d40963074~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>需要记住的是，<code>margin-box</code> 参考框会负责实际裁剪超大形状。如果元素周围有外边距（<code>margin</code>），形状可能会扩展到 <code>content-box</code> 参考框之外，但只会被 <code>margin-box</code> 参考框裁剪。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de75abb3fe5740b899666b6e0c9b2de1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>通过这几个实例，只是想告诉大家，CSS Shape 中的参考框可以帮助我们更好地控制 <code>shape-outside</code> 绘制的形状大小和位置。它们抽象了坐标系统的一些复杂性，使我们不必手动定义每个元素的尺寸。这有助于制作在屏幕之间和项目之间都可移植的响应式形状。</p><p>如果你觉得 CSS Shape 中的参考框尺寸的计算不好理解，你可以把它视为 CSS 盒模型来计算。因为它们的计算都和 CSS 的 <code>box-sizing</code> 属性的取值有直接关系。有关于这部分，就不在这里表述了，感兴趣的同学可以补充一下 CSS 中的盒模型相关的概念和理论知识。</p><p>有了 CSS Shape 参考框的基础知识之后，我们来看两个非常有意思的例子。那就是基于 CSS Shape 参考框创建的形状。简单地说，如果不给 <code>shape-outside</code> 属性显式指定创建形状的函数（比如 <code>circle()</code> 、<code>ellipse()</code> 、<code>inset()</code> 、<code>polygon()</code> 和 <code>url()</code> 中的任一函数创建的形状），也可以让浏览器从元素的参考框中获取形状。</p><p>我们都知道了，CSS Shape 创建形状的默认参考框是 <code>margin-box</code> 。到目前为止没有什么特别的，这就是浮动的工作原理。但是应用这种技术，你可以重用元素的几何形状。比如，在元素上使用 <code>border-radius</code> 属性，将元素变成一个圆形。基于这个情况之下，<code>shape-outside</code> 即使不使用绘制形状的函数，你也可以重用元素自身的几何形状：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspec-ratio: 1;
    border-radius: 50%;
    
    float: left;
    shape-outside: margin-box;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97ef19a4f0784123873ae4a64cf36d37~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,19),ni={href:"https://codepen.io/airen/full/gOjONNW",target:"_blank",rel:"noopener noreferrer"},di=s(`<p>它其实等同于：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspec-ratio: 1;
    border-radius: 50%;
    
    float: left;
    shape-outside: circle(50% at center) margin-box;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，你可以以这种方式使用所有的参考框。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61498ae7da45459190d45d96b393dc75~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),si={href:"https://codepen.io/airen/full/KKBKOpG",target:"_blank",rel:"noopener noreferrer"},li=s(`<p>我们来看一个真实的案例，<code>shape-outside</code> 只使用参考框类型来复用元素自身的形状，并创建和元素相同的形状。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>blockquote {
    float: left;
    width: 400px;
    shape-outside: border-box;
    box-sizing: content-box;
    border-radius: 2.5rem;
    border: 2rem solid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00100955bfa241febca4858d55873ef7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),ci={href:"https://codepen.io/airen/full/LYBYwyR",target:"_blank",rel:"noopener noreferrer"},oi=s(`<h2 id="shape-margin-属性" tabindex="-1"><a class="header-anchor" href="#shape-margin-属性" aria-hidden="true">#</a> shape-margin 属性</h2><p>不知道大家有没有发现，前面所展示的示例，我们基本上没有设置 <code>margin</code> 值，文本紧贴着 <code>shape-outside</code> 属性绘制的形状。事实上，我们也可以像设置其他元素的外边距一样，在应用形状的元素上设置 <code>margin</code> 值，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 100px;
    height: 100px;
    
    float: left;
    shape-outside: polygon(10% 10%, 90% 50%, 40% 50%, 90% 90%, 10% 90%);
    margin: 10px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a185a3ef8d4e4efb81250c3ea8722440~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),ai={href:"https://codepen.io/airen/full/NWBPpyO",target:"_blank",rel:"noopener noreferrer"},ti=s(`<p>你会发现，<code>shape-outside</code> 绘制的形状离文本之间的间距并没有因为 <code>margin</code> 有所改变，它只会：</p><ul><li>改变元素框位置；</li><li>改变形状的大小（使用百分比单位）。</li></ul><p>根据课程前面介绍的内容，我们知道，当 <code>shape-outside</code> 属性中的函数值使用的是百分比单位时，它的计算和参考框大小有关系。但要改变形状与流动文本之间的间距，我们需要使用 CSS Shapes 中的另一个属性 <code>shape-margin</code> 。</p><p><code>shape-margin</code> 属性为 <code>shape-outside</code> 属性绘制的形状添加外边距。它使得流动的文本远离了形状本身。比如，我们使用 <code>shape-margin</code> 值来替代上面示例中的 <code>margin</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    height: 200px;
    
    float: left;
    shape-outside: polygon(10% 10%, 90% 50%, 40% 50%, 90% 90%, 10% 90%);
    shape-margin: 10px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13c5e71a831e4d89ac3579e70659a658~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),pi={href:"https://codepen.io/airen/full/oNMgZmw",target:"_blank",rel:"noopener noreferrer"},ri=s(`<p>我使用下图来描述 <code>shape-outside</code> 和 <code>shape-margin</code> 之间的关系：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41dd6327e5e5494b976613211d48b0de~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>shape-margin</code> 创建与多边形形状<code>shape-outside</code> 的偏移量。红色区域显示 <code>200 x 200px</code> 的浮动形状，蓝色区域显示 <code>10px</code> 的偏移量（<code>shape-margin</code> 的值）。</p><p>但这种情况不是绝对的，比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    border-radius: 50%;
    
    float: left;
    shape-outside: circle(40% at center);
    shape-margin: 1em;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87e9029a38d54123b7ad5a59fb7b56be~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),ui={href:"https://codepen.io/airen/full/bGjNWPE",target:"_blank",rel:"noopener noreferrer"},vi=s(`<p>这个效果和我们使用常规 <code>margin</code> 属性时的效果类似，但是 <code>shape-margin</code> 只影响 <code>shape-outside</code> 值周围的空间。只有在坐标系统中有空间时，它才会在形状周围添加间距。这就是为什么在上面的例子中，圆半径被设置为 <code>40%</code>，而不是 <code>50%</code>。如果半径设置为 <code>50%</code>，圆将占据坐标系统中的所有空间，因此没有 <code>shape-margin</code>的效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06fa2885a74449d782a16e5cbde70ac0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>记住，形状最终受限于元素的 <code>margin-box</code> (元素加上它周围的外边距 <code>margin</code>)。如果形状更大并且溢出，它将被剪切到 <code>margin-box</code>，最终会得到一个矩形形状。</p><h2 id="css-shapes-和-clip-path-的关系" tabindex="-1"><a class="header-anchor" href="#css-shapes-和-clip-path-的关系" aria-hidden="true">#</a> CSS Shapes 和 clip-path 的关系</h2><p>你可能会感到好奇，CSS Shapes 和 <code>clip-path</code> 会有啥关系呢？事实上，在 CSS 中 <code>shape-outside</code> （或未来的 <code>shape-inside</code> ）的属性中，可用于绘制形状的 CSS 函数与 CSS 的 <code>clip-path</code> 属性用于绘制图形的函数几乎是一致的。换句话说，可用在 <code>clip-path</code> 属性的函数基本都可以用在 <code>shape-outside</code> （或 <code>shpae-inside</code>）属性上。</p><p>正如前面所说的：</p><blockquote><p><strong>CSS 的</strong> <strong><code>clip-path</code></strong> <strong>属性还是</strong> <strong><code>shape-outside</code></strong> <strong>属性的极佳助手，因为它可以将创建的形状可视化，并裁剪出元素中超出形状之外的任何部分</strong> 。</p></blockquote><p>比如下图这个示例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d08152adfa845199041f66a283ec14f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>首先左、右浮动元素自身就是一个不规则的形状，在 CSS 中要实现上图这种不规则的效果，首先可以考虑的是 <code>clip-path</code> 属性。我们可以在 <code>clip-path</code> 属性上运用 <code>polygon()</code> 函数绘制出所需要的多边形状：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94570865d77f4b0cb1595affb5c5da43~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>clip-path</code> 要比 <code>shape-outside</code> 更具可视化。也就是说，如果你希望 <code>shape-outside</code> 绘制出来的形状通过可视化展示出来，那么使用 <code>clip-path</code> 要简易得多。</p><p>换句话说，你可以先使用 CSS 的 <code>clip-path</code> 绘制出相应的形状，然后将 <code>clip-path</code> 属性的值运用于 <code>shape-outside</code> （或 <code>shape-insdie</code>） 属性上即可。比如上图中 <code>clip-path</code> 的 <code>polygon()</code> 运用于 <code>shape-outside</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 50%;
    height: 100%;
    shape-margin: 1rem;
}

.shape--left {
    float: left;
    shape-outside: polygon(0 0, 50% 0, 30% 100%, 0% 100%);
}

.shape--right {
    float: right;
    shape-outside: polygon(50% 0, 100% 0, 100% 100%, 70% 100%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd27cd760a0e4b49b4a1759c61859999~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示，<code>shape-outside</code> 和 <code>clip-path</code> 的 <code>polygon()</code> 坐标点参数值都是相同的，文本围绕着相应的形状流动，但运用形状的元素还是矩形，这可能和你预期的效果不一样。如果希望元素的自身的形状和 <code>shape-outside</code> 绘制的形状一致，就需要显式在元素上使用 <code>clip-path</code> 属性，并且让 <code>clip-path</code> 和 <code>shape-outside</code> 的值相同：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 50%;
    height: 100%;
    shape-margin: 1rem;
}

.shape--left {
    float: left;
    clip-path: polygon(0 0, 50% 0, 30% 100%, 0% 100%);
    shape-outside: polygon(0 0, 50% 0, 30% 100%, 0% 100%);
}

.shape--right {
    float: right;
    clip-path: polygon(50% 0, 100% 0, 100% 100%, 70% 100%);
    shape-outside: polygon(50% 0, 100% 0, 100% 100%, 70% 100%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/488f2d20c0e34985ad9d7a1e6ad73979~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),mi={href:"https://codepen.io/airen/full/BaPyZzK",target:"_blank",rel:"noopener noreferrer"},bi=e("h2",{id:"css-shapes-的-mask-的关系",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#css-shapes-的-mask-的关系","aria-hidden":"true"},"#"),i(" CSS Shapes 的 mask 的关系")],-1),gi=e("p",null,"前面介绍过，我们可以通过图形来创建形状。",-1),hi=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/862761d314554cd4a976b6829044ff20~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),fi={href:"https://codepen.io/airen/full/BaPywYg",target:"_blank",rel:"noopener noreferrer"},Si=s(`<p>就上图的效果，可以通过 <code>shape-outside</code> 属性来引用一个带有透明度的 PNG 图像实现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5354a2ba29e74882b50e556d20877da5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然说，带有透明度的图像可以创建类似图像的形状，但元素框自身并不会受影响：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95585936e15e4e7fbd781744b95815f7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果希望元素也具备形状一样的效果，我们就需要借助 CSS 的 <code>mask</code> 来实现。也就是说，我们可以将 <code>shape-outside</code> （引用图像创建形状）和 <code>mask</code> 结合起来使用，让元素自身也具备一定的形状，而且还可以让文本围绕着形状流动：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 445px;
    height: 670px;

    float: left;
    shape-outside: url(&quot;data:image/png;bag==&quot;);
    mask: url(&quot;data:image/png;base64,iVBORw==&quot;) no-repeat left top / cover;
    
    shape-margin: 1.25rem;
    shape-image-threshold: 0.5;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这两个示例的效果中，我们不难发现，CSS Shapes 只影响应用于元素的形状。如果元素有背景，则不会被形状裁切。要实现这种效果，必须结合 CSS 的 <code>clip-path</code> 或者 <code>mask-image</code> 一起使用。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5b9cf7a5704403095ef380249aedeba~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li><strong>剪切</strong> 需要一个剪切路径，剪切路径可以是一个闭合矢量路径、形状或多边形；剪切路径是一个区域，该区域内部的所有内容都可以显示出来，外部的所有内容将被剪切掉，在页面上不可见；</li><li><strong>遮罩</strong> 需要一个高亮或 Alpha 遮罩层，将源和遮罩层合在一起会创建一个缓冲区域，在合层阶段之前，亮度和 Alpha 遮罩会影响这个缓冲区的透明度，从而实现完全或部分遮罩源的部分。</li></ul><blockquote><p>注意， CSS 的 <code>clip-path</code> 和 <code>mask</code> 的相关介绍已经超出这节课程的范畴，因此不会在这里详细阐述。</p></blockquote><h2 id="css-shapes-相关的工具" tabindex="-1"><a class="header-anchor" href="#css-shapes-相关的工具" aria-hidden="true">#</a> CSS Shapes 相关的工具</h2><p><code>shape-outside</code> 使用 <code>circle()</code> 、<code>inset()</code> 、<code>ellipse()</code> 和 <code>url()</code> 绘制图形形状还是比较简单的，但当你使用 <code>polygon()</code> 创建一个包含多个点坐标形状（创建一个复杂形状），可以说是一件复杂的事情。</p><p>值得庆幸的是， Chrome 和 Firefox 浏览器内置 CSS Shapes 功能（苹果 iOS 8 和Safari 8 即将支持该功能）。虽然说它是为 <code>clip-path</code> 服务，但我们可以基于该功能，可视化绘制出 <code>polygon()</code> 函数所需要的坐标点，然后将绘制好的坐标点复制到 <code>shape-outside</code> 的 <code>polygon()</code> 函数中即可。</p><p>有关于浏览器内置的 CSS Shapes 工具相关的介绍，可以移步阅读：</p>`,14),xi={href:"https://razvancaliman.com/writing/css-shapes-editor-chrome/",target:"_blank",rel:"noopener noreferrer"},ki={href:"https://blog.bitsrc.io/8-little-videos-about-the-firefox-shape-path-editor-96a12c7cd3b6",target:"_blank",rel:"noopener noreferrer"},_i=s(`<p>相比而言，Firefox下的工具更好用一些。假设你想让文本围绕下图来做布局，你可以先用图片当作背景图，成为 CSS Shapes 的一个占位图，比如下面这张图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a078a91e02b541f79f4b029abd7c7fa6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>接着先随便绘制几个点，使用 <code>polygon(55px -1px, 9.57% 8.45%)</code> ，再借助浏览器插件跟着背景图来描边（拖动点，添加点）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/169f76c1fe0548bb834c7e1b81361815~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>然后将最终的 <code>polygon()</code> 的值复制出来给 <code>shape-outside</code>:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 546px;
    height: 805px;
    
    float: left;
    shape-outside: polygon(55px -1px, 9.57% 8.45%, 15.06% 17.15%, 0.41% 20.5%, -6.92% 29.07%, -22.67% 35.16%, -50.89% 41.37%, -75.8% 43.73%, -79.44% 49.93%, -58.94% 52.06%, -47.95% 47.33%, -3.26% 39.75%, -9.85% 47.7%, -39.52% 51.3%, -64.43% 58.76%, -73.59% 77.77%, -94.47% 84.85%, -93.73% 90.56%, -53.07% 84.1%, -40.26% 67.45%, 0.77% 67.58%, -8.42% 80.59%, -21.22% 90.42%, -20.84% 99.38%, -4.57% 97.33%, 13.13% 101.34%, 33.12% 94.38%, 43.75% 74.89%, 53.42% 62.5%, 67.94% 37.95%, 78.99% 24.94%, 101.86% 17.67%, 96.55% 11.86%, 74.31% 6.78%, 57.63% 1.97%);
    shape-margin: 10px;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终你能看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7282416bc3742a3982ab1a53c8c0a12~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),Ci={href:"https://codepen.io/airen/full/LYBYZRw",target:"_blank",rel:"noopener noreferrer"},yi=e("p",null,"如此一来，你可以发挥你的想象力和创造力，做出任何你觉得很有意思的东西。",-1),ji={href:"https://bennettfeely.com/clippy/",target:"_blank",rel:"noopener noreferrer"},qi=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe2c27a7415e4d3e9f91f9a1c57552d1~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),wi={href:"https://bennettfeely.com/clippy/",target:"_blank",rel:"noopener noreferrer"},zi=s(`<p>正如上图所示，将五角形的位置节点信息分别用于 <code>clip-path</code> 和 <code>shape-outside</code> 可以得到下面这个示例的效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 480px;
    aspect-ratio: 1;

    float: left;
    shape-margin: 1.25rem;
  
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    shape-outside: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86c4daabe07142919800d064ba390890~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Li={href:"https://codepen.io/airen/full/qByEVge",target:"_blank",rel:"noopener noreferrer"},Wi=s(`<h2 id="给-css-shapes-添加动效" tabindex="-1"><a class="header-anchor" href="#给-css-shapes-添加动效" aria-hidden="true">#</a> 给 CSS Shapes 添加动效</h2><p>熟悉 CSS 的 <code>clip-path</code> 同学应该知道，我们可以将 <code>clip-path</code> 和 CSS 的 <code>transition</code> 以及 <code>animation</code> 结合起来，可以给 <code>clip-path</code> 绘制的形状添加动画效果。比如，我们使用 <code>circle()</code> 绘制的一个圆形，从半径 <code>30%</code> 过渡到半径 <code>50%</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape-animation {
    width: 200px;
    aspect-ratio: 1;
    clip-path: circle(30% at center);
    transition: clip-path .2s linear;
}

.shape-animation:hover {
    clip-path: circle(50% at center);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/307f137a560b47b8ac93a1c0316e41d7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),Mi={href:"https://codepen.io/airen/full/abjzEZo",target:"_blank",rel:"noopener noreferrer"},Ti=s(`<p>还可以使用 <code>@keyframes</code> 和 <code>animation</code> 为形状（<code>clip-path</code>）设置动效：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    clip-path: circle(30% at center);
    animation: clipPathAni 4s linear infinite;
}

@keyframes clipPathAni {
    0% {
        clip-path: circle(0% at center);
    }
    20% {
        clip-path: circle(25% at center);
    }
    40% {
        clip-path: circle(50% at center);
    }
    60% {
        clip-path: circle(50% at center);
    }
    80% {
        clip-path: circle(25% at center);
    }
    100% {
        clip-path: circle(0% at center);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b1a8aba8ebf4a4392173e8eec4dd135~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Bi={href:"https://codepen.io/airen/full/MWBYrbL",target:"_blank",rel:"noopener noreferrer"},Di=s(`<p>同样的，我们也可以将 <code>shape-outside</code> 和 <code>transition</code> 和 <code>animation</code> 结合起来，让 <code>shape-outside</code> 绘制的形状也带有动画效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape-animation {
    width: 200px;
    aspect-ratio: 1;
    float: left;
    clip-path: circle(30% at center);
    shape-outside: circle(30% at center);
    transition: clip-path .2s linear, shape-outside .2s linear;
}

.shape-animation:hover {
    clip-path: circle(50% at center);
    shape-outside: circle(50% at center);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da2c19f412d844fba7f2e66e6dd7c470~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Ai={href:"https://codepen.io/airen/full/gOjbeYY",target:"_blank",rel:"noopener noreferrer"},Hi=s(`<p>将上面示例的 <code>transition</code> 换成 <code>@keyframes</code> 和 <code>animation</code> 也可以让 <code>shape-outside</code> 带有动画效果：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    float: left;
    clip-path: circle(30% at center);
    shape-outside: circle(30% at center);
    animation: clipPathAni 4s linear infinite;
}

@keyframes clipPathAni {
    0% {
        clip-path: circle(0% at center);
        shape-outside: circle(0% at center);
    }
    20% {
        clip-path: circle(25% at center);
        shape-outside: circle(25% at center);
    }
    40% {
        clip-path: circle(50% at center);
        shape-outside: circle(50% at center);
    }
    60% {
        clip-path: circle(50% at center);
        shape-outside: circle(50% at center);
    }
    80% {
        clip-path: circle(25% at center);
        shape-outside: circle(25% at center);
    }
    100% {
        clip-path: circle(0% at center);
        shape-outside: circle(0% at center);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36aa7628bbcf4573b5fd8f5d45833e37~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Ri={href:"https://codepen.io/airen/full/dyjPmoa",target:"_blank",rel:"noopener noreferrer"},Ei=s(`<p>不管是 <code>clip-path</code> 还是 <code>shape-outside</code> 属性，其他函数也可以像上面示例中的 <code>circle()</code> 函数一样，让形状带有动画效果。只不过使用 <code>polygon()</code> 函数绘制形状的时候，应该尽可能保持一样的节点数。比如我们希望形状从一个五角形过渡到一个正方形。一般情况下，五角形有十个节点位置，而正方形只有四个节点位置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68a6469a815345f4b32c33fc3470f8f0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>两个图形的节点数要是不一致的话，做出来的动画效果就会让人感到不协调：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 300px;
    aspect-ratio: 1;

    float: left;
    shape-margin: 1rem;

    shape-outside: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
    );

    clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
    );
    transition: clip-path 0.2s linear, shape-outside 0.2s linear;
}

.shape:hover {
    clip-path: inset(0 0 0 0);
    shape-outside: inset(0 0 0 0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b007e6950852449fb07ebe2adf3439f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Yi={href:"https://codepen.io/airen/full/dyjPmoa",target:"_blank",rel:"noopener noreferrer"},Ni=s(`<p>你已经看到了，示例中的矩形是使用的是 <code>inset()</code> 函数绘制的。其实，我们也可以使用 <code>polygon()</code> ，也用十个点来绘制矩形：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/664a411fd53c438e8aeec82bfb44cb39~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape{
    width: 300px;
    aspect-ratio: 1;
  
    float: left;
    shape-margin: 1rem;

    shape-outside: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
    );

    clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
    );
    transition: clip-path 0.2s linear, shape-outside 0.2s linear;
}

.shape:hover {
    clip-path: polygon(
        0 0,
        50% 0,
        100% 0,
        100% 34%,
        100% 68%,
        100% 100%,
        50% 100%,
        0 100%,
        0 68%,
        0 34%
    );
    shape-outside: polygon(
        0 0,
        50% 0,
        100% 0,
        100% 34%,
        100% 68%,
        100% 100%,
        50% 100%,
        0 100%,
        0 68%,
        0 34%
    );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/112c98ee9646494ca4fec83a06133ecd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),Pi={href:"https://codepen.io/airen/full/bGjNvRB",target:"_blank",rel:"noopener noreferrer"},Gi=e("p",null,"你会发现，两个形状中的点（节点位置）数量相同，就可以轻松地从一个形状过渡到另一个形状，产生的动画效果也要更协调，不会像上面那样生硬。",-1),Oi=e("h2",{id:"综合示例",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#综合示例","aria-hidden":"true"},"#"),i(" 综合示例")],-1),Ki={href:"https://www.smashingmagazine.com/2019/04/art-direction-for-the-web-using-css-shapes/",target:"_blank",rel:"noopener noreferrer"},Vi=e("strong",null,"V字型布局",-1),Zi=e("strong",null,"Z字型布局",-1),Fi=e("strong",null,"曲线布局",-1),Ui=e("strong",null,"对角线形状布局",-1),Xi=e("strong",null,"旋转布局",-1),Ji=e("strong",null,"任意图像定义的布局",-1),Ii=s(`<div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;main&gt; 
    &lt;div class=&quot;placeholder&quot;&gt;&lt;/div&gt; 
    &lt;h1&gt;V-Shapes&lt;/h1&gt; 
    &lt;p&gt;After giving the ... &lt;/p&gt; 
    &lt;!-- 其他的HTML结构 --&gt; 
&lt;/main&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>div.placeholder</code> 是用来当作 CSS Shapes 的占位符，比如我们要的是一个 V 字型，其实是两个三角形拼出来的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ea70f8f71f441478f42e32cfba2104c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Qi=e("code",null,"::before",-1),$i=e("code",null,"::after",-1),en=e("code",null,"polygon()",-1),nn={href:"https://bennettfeely.com/clippy/",target:"_blank",rel:"noopener noreferrer"},dn=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88ff108ea6004a09b1fe40a649e1a6c8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape-placeholder { 
    width: 100%; 
}

.shape-placeholder::before, 
.shape-placeholder::after { 
    content: &#39;&#39;; 
    width: 35vw; 
    height: 100vh; 
} 

.shape-placeholder::before { 
    float: left; 
    shape-outside: polygon(0 0, 0% 100%, 70% 100%); 
} 

.shape-placeholder::after { 
    float: right; 
    shape-outside: polygon(100% 0, 30% 100%, 100% 100%); 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92893ec0e3c6478bb6d402a451b95b30~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),sn={href:"https://codepen.io/airen/full/ExpaEer",target:"_blank",rel:"noopener noreferrer"},ln=e("p",null,"利用类似的原理，还可以实现很多其他的效果。比如下面这个示例：",-1),cn=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58691dd7d64841828a921ad22920efd4~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),on={href:"https://codepen.io/airen/full/eYjmrNx",target:"_blank",rel:"noopener noreferrer"},an=s(`<p>示例中的文本分别围绕着数字 <code>2</code> 和 <code>8</code> 流动。如果我们要用 <code>polygon()</code> 函数来描绘出 <code>2</code> 和 <code>8</code> 的形状，那对于 Web 开发者是件痛苦的事情。为了减少 Web 开发者绘制图形的痛苦，我们可以考虑使用图像来创建形状。因此，我在这个例中使用两张矢量图（分别对应的是 <code>2</code> 和 <code>8</code>），然后结合 CSS 的 <code>mask</code> 属性，让浮动元素自身也有 <code>2</code> 和 <code>8</code> 的形状：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.shape {
    width: 200px;
    aspect-ratio: 1;
    background-color: #fff;
    shape-margin: 1rem;
}

section div:nth-of-type(1) .shape {
    float: left;
    mask: url(&quot;data:image/svg+xml;base64,PD94bWwgd===...&quot;) no-repeat left top / cover;
    shape-outside: url(&quot;data:image/svg+xml;base64,PD94bWwgdmVy===...&quot;);
}

section div:nth-of-type(2) .shape {
    float: right;
    mask: url(&quot;data:image/svg+xml;base64,PD94bWwgdmV==+...&quot;) no-repeat left top / cover;
    shape-outside: url(&quot;data:image/svg+xml;base64,PD94bWwgdm===+...&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>页面的整体布局，我们使用的是 CSS Grid 布局：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>section {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
        &quot;title    title&quot;
        &quot;column1  column2&quot;;
    gap: 1rem 2rem;
}

section h1 {
    grid-area: title;
}

section div:nth-of-type(1) {
    grid-area: column1;
}

section div:nth-of-type(2) {
    grid-area: column2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你感兴趣，还可以查看 @Jen Simmons 的 labs.jensimmons.com 中提供的示例 ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbcc823d5dc74f6aabcc86b1115d2efb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>在内容大多被困在简单盒子里（矩形）的 Web 中，CSS Shapes 提供了一种创建富有表现力的布局方法，弥合了 Web 设计和印刷设计之间的保真度差距。当然， CSS Shapes 也可能会被滥用并造成干扰。但是，如果应用的好（有品味和良好判断力），CSS Shapes 可以增强内容的呈现，并以一种独特的方式集中用户的注意力。</p><p>虽然现在主流浏览器都对 CSS Shapes 有一定的支持度，但到目前为止，用于真实生产中的案例还很少见。但这种方式构建的 Web 布局，可以让 Web 设计尽可能地发挥其创意，能在 Web 页面上尽可能地展现与印刷设计相同的效果。换句话说，你可以将 CSS Shapes 作为渐进增强工作中的一部分，在不支持的浏览器对不规则布局做一个降级处理。</p><p>最后我想说的是，文章中的示例都是一些很简单的示例，但这些简单的示例应该可以为你创建任何杂志或海报那样复杂的设计提供基础。同时也希望，你能在文章中的示例基础上发挥自己的创意，构建更有创意的 Web 布局！</p>`,10);function tn(pn,rn){const n=c("ExternalLinkIcon");return o(),a("div",null,[p,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",r,[i("https://codepen.io/airen/full/dyKxxwj"),d(n)])])]),u,v,m,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",b,[i("https://codepen.io/airen/full/LYrwwKB"),d(n)])])]),g,e("p",null,[i("庆幸的是，CSS 中提供了一个新模块，即 "),e("a",h,[i("CSS Exclusions 模块"),d(n)]),i("，它致力于解决"),f,i(" 。它不需要依赖浮动 "),S,i(" ，也不管是否设置了 "),x,i(" 的值为 "),k,i("、"),_,i(" 或者 "),C,i(" 。允许内容围绕一个内联元素。如下图所示：")]),y,j,q,e("p",null,[i("不幸运的是，到目前为止，该模块中提供的属性还只是一个实验性属性，目前只有在"),e("a",w,[i("微软平台的浏览器中可以查看到相应的效果"),d(n)]),i("：")]),z,e("p",null,[i("比如，@Andy Clarke 在他的文章《"),e("a",L,[i("Art Direction For The Web Using CSS Shapes"),d(n)]),i("》中，使用 CSS Shapes 给 Web 设计带来很多边界性的突破，可以说它已超越了基本的 CSS Shapes，并向大家展示了如何使用它们给 Web 布局带来的突破。")]),W,e("blockquote",null,[e("p",null,[i("上图来自于 @Andy Clarker 的《"),e("a",M,[i("Art Direction For The Web Using CSS Shapes"),d(n)]),i("》一文！")])]),T,e("ul",null,[B,e("li",null,[e("a",D,[i("CSS Exclusions 模块"),d(n)]),i("定义了 "),A,i(" 和 "),H,i(" 等属性（最早还有 "),R,i(" ，现在没有了）。")])]),e("p",null,[i("不过，后面 CSS Shapes 模块又将 "),E,i(" 和 "),Y,i(" 拆分出来放在不同的版本中。要是你查阅相关规范的话，你可以在 "),e("strong",null,[e("a",N,[i("CSS Shapes Module Level 1"),d(n)])]),i(" 中查到 "),P,i(" 、"),G,i(" 和 "),O,i(" 三个属性，它们分别用来：")]),K,e("p",null,[i("如果你要查阅 "),V,i(" 就需要在 "),e("strong",null,[e("a",Z,[i("CSS Shapes Module Level 2"),d(n)])]),i(" 中才能索引到。在该模块中，你除了可以找到 "),F,i(" 属性之外，你还可以找到 "),U,i(" 和 "),X,i(" 函数。另外，"),J,i(" 还被扩展出一个新值 "),I,i(" ，具有此值的元素将使其内容(或包含的元素)自动沿显示边界对齐。")]),Q,e("p",null,[i("只不过，"),$,i(" 新扩展出来的 "),ee,i(" 值相关的介绍，主要在 "),e("strong",null,[e("a",ie,[i("CSS Round Display Level 1"),d(n)])]),i(" 模中进行阐述。而且这部分相关的阐述已超出本文要阐述的范围，因此接下来不会做过多阐述。")]),e("p",null,[i("W3C 的 CSS 工作小组把 "),ne,i(" 、"),de,i(" 和 "),se,i(" 单独放到 "),e("a",le,[i("Level2"),d(n)]),i(" 中阐述，主要是到目前为止，还没有得到任何主流浏览器的支持。因此，这几个特性也被称为"),ce,i(" 。")]),e("p",null,[i("虽然 Level 2 没得到主流浏览器支持，但就目前来看，"),e("strong",null,[e("a",oe,[i("主流浏览器对 CSS Shapes Module Level 1 的支持度还是很好的"),d(n)])]),i("：")]),ae,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",te,[i("https://codepen.io/airen/full/jOpNdaV"),d(n)])])]),pe,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",re,[i("https://codepen.io/airen/full/rNrBRRX"),d(n)])])]),e("p",null,[i("再回过头来看 "),ue,i(" 函数的半径 "),ve,i(" 取百分比的情况。前面说过，如果半径的值是个百分比值，它是从参考框的宽度和高度解析出来的。它的"),e("a",me,[i("计算稍微比较复杂"),d(n)]),i("，不过，我们可以按照下面这个公式来计算：")]),be,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ge,[i("https://codepen.io/airen/full/xxJxwYv"),d(n)])])]),he,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",fe,[i("https://codepen.io/airen/full/MWBWKKM"),d(n)])])]),Se,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",xe,[i("https://codepen.io/airen/full/bGjGEZy"),d(n)])])]),ke,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",_e,[i("https://codepen.io/airen/full/RwBwaXw"),d(n)])])]),Ce,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ye,[i("https://codepen.io/airen/full/LYBYZRw"),d(n)])])]),je,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",qe,[i("https://codepen.io/airen/full/RwBwRvp"),d(n)])])]),we,e("p",null,[i("通过 "),ze,i(" 函数引用带有透明度的图片。可能会令大家感到意外，即使这么做了，效果依旧。这里有一个细节需要注意，"),Le,i(" 引入的图片必须是同域的（要解决 "),e("a",We,[i("图片 CROS 兼容性"),d(n)]),i("），否则 "),Me,i(" 会被视为是 "),Te,i(" 。所以你看到的效果和没有设置 "),Be,i(" 是一样的。")]),De,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ae,[i("https://codepen.io/airen/full/wvxvoZW"),d(n)])])]),He,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Re,[i("https://codepen.io/airen/full/ZEjEeWg"),d(n)])])]),Ee,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ye,[i("https://codepen.io/airen/full/KKBKWvL"),d(n)])])]),Ne,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Pe,[i("https://codepen.io/airen/full/bGjGxJJ"),d(n)])])]),Ge,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Oe,[i("https://codepen.io/airen/full/zYLYyNx"),d(n)])])]),e("p",null,[i("需要注意的是，"),Ke,i(" 和 "),Ve,i(" 一样，引入的图片必须是同域的（要解决"),e("a",Ze,[i("图片 CROS 兼容性"),d(n)]),i("），建议你直接使用 URI，这样易于避免图片 CROS 的兼容性问题。")]),Fe,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ue,[i("https://codepen.io/airen/full/vYaYvjW"),d(n)])])]),Xe,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Je,[i("https://codepen.io/airen/full/ZEjEwQO"),d(n)])])]),Ie,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Qe,[i("https://codepen.io/airen/full/XWBWGjB"),d(n)])])]),$e,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ei,[i("https://codepen.io/airen/full/abjbxLd"),d(n)])])]),ii,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ni,[i("https://codepen.io/airen/full/gOjONNW"),d(n)])])]),di,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",si,[i("https://codepen.io/airen/full/KKBKOpG"),d(n)])])]),li,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ci,[i("https://codepen.io/airen/full/LYBYwyR"),d(n)])])]),oi,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",ai,[i("https://codepen.io/airen/full/NWBPpyO"),d(n)])])]),ti,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",pi,[i("https://codepen.io/airen/full/oNMgZmw"),d(n)])])]),ri,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",ui,[i("https://codepen.io/airen/full/bGjNWPE"),d(n)])])]),vi,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",mi,[i("https://codepen.io/airen/full/BaPyZzK"),d(n)])])]),bi,gi,hi,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",fi,[i("https://codepen.io/airen/full/BaPywYg"),d(n)])])]),Si,e("ul",null,[e("li",null,[e("a",xi,[i("CSS Shapes Editor for Chrome"),d(n)])]),e("li",null,[e("a",ki,[i("8 Little Videos About the Firefox Shape Path Editor"),d(n)])])]),_i,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ci,[i("https://codepen.io/airen/full/LYBYZRw"),d(n)])])]),yi,e("p",null,[i("除了浏览器内置的 CSS Shapes 形状编辑器之外，还可以借助 "),e("a",ji,[i("Clippy 工具"),d(n)]),i("来编辑复杂的形状：")]),qi,e("blockquote",null,[e("p",null,[i("Clippy 工具地址："),e("a",wi,[i("https://bennettfeely.com/clippy/"),d(n)])])]),zi,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Li,[i("https://codepen.io/airen/full/qByEVge"),d(n)])])]),Wi,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Mi,[i("https://codepen.io/airen/full/abjzEZo"),d(n)])])]),Ti,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Bi,[i("https://codepen.io/airen/full/MWBYrbL"),d(n)])])]),Di,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Ai,[i("https://codepen.io/airen/full/gOjbeYY"),d(n)])])]),Hi,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Ri,[i("https://codepen.io/airen/full/dyjPmoa"),d(n)])])]),Ei,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",Yi,[i("https://codepen.io/airen/full/dyjPmoa"),d(n)])])]),Ni,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",Pi,[i("https://codepen.io/airen/full/bGjNvRB"),d(n)])])]),Gi,Oi,e("p",null,[i("文章开头提到 @Andy Clarke 在他的文章《"),e("a",Ki,[i("Art Direction For The Web Using CSS Shapes"),d(n)]),i("》向大家展示了很多有意思的不规则 Web 布局。比如 "),Vi,i(" 、"),Zi,i(" 、"),Fi,i(" 、"),Ui,i(" 、"),Xi,i(" 和"),Ji,i(" 等。我们就先以 V 字型布局为例。")]),Ii,e("p",null,[i("如此一来，可以借助 "),Qi,i(" 和 "),$i,i(" 来使用两张图片，不过对于类似这样的三角形，还可以借助"),en,i(" 来绘制。为了方便，可以使用 "),e("a",nn,[i("Clippy"),d(n)]),i(" 工具来完成：")]),dn,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",sn,[i("https://codepen.io/airen/full/ExpaEer"),d(n)])])]),ln,cn,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",on,[i("https://codepen.io/airen/full/eYjmrNx"),d(n)])])]),an])}const vn=l(t,[["render",tn],["__file","index-25.html.vue"]]);export{vn as default};
