import{_ as s,M as c,p as x,q as o,R as e,t as i,N as d,a1 as l}from"./framework-e8cb8151.js";const a={},p=l(`<h1 id="_07-flexbox-中的计算-通过收缩因子比例收缩-flex-项目" tabindex="-1"><a class="header-anchor" href="#_07-flexbox-中的计算-通过收缩因子比例收缩-flex-项目" aria-hidden="true">#</a> 07-Flexbox 中的计算：通过收缩因子比例收缩 Flex 项目</h1><p>使用 Flexbox 布局时，Flex 容器难免有和所有 Flex 项目宽度总和不匹配的时候，比如说，Flex 容器有剩余空间（Flex 项目无法填满整个 Flex 容器），也有 Flex 容器空间不足的时候（Flex 项目溢出 Flex 容器）。</p><p>这两种情景有不同的处理方式，比如上一节课和大家聊的就是 Flex 容器有剩余空间时，如何通过扩展因子比例 <code>flex-grow</code> 的特性来扩展 Flex 项目。而这一节课，我们主要来探讨，当 Flex 容器空间不足时，我们又是如何使用收缩因子 <code>flex-shrink</code> 的特性，即，按照收缩比例来收缩 Flex 项目，从而让 Flex 项目也能填满整个 Flex 容器。</p><h2 id="flex-shrink-的计算" tabindex="-1"><a class="header-anchor" href="#flex-shrink-的计算" aria-hidden="true">#</a> flex-shrink 的计算</h2><p>前面我们聊的都是 <code>flex-grow</code> 是如何计算的，接着我们来一起探计 <code>flex</code> 属性中的 <code>flex-shrink</code> 是如何计算的。</p><p>首先，<code>flex-shrink</code> 属性所起的作用和 <code>flex-grow</code> 刚好相反，<strong>它是在 Flex 容器出现不足空间时（就是所有 Flex 项目的宽度总和大于 Flex 容器可用空间，Flex 项目溢出了 Flex 容器），让 Flex 项目根据自身的收缩因子</strong> <strong><code>flex-shrink</code></strong> <strong>来缩小尺寸</strong> 。</p><p>还是拿前面的示例来举例，只不过，我们稍微把一些参数调整一下：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;container&quot;&gt;
  &lt;!-- Flex 项目 A --&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;span&gt;A&lt;/span&gt;longlonglongword&lt;/div&gt; 
  &lt;!-- Flex 项目 B --&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;span&gt;B&lt;/span&gt;ook&lt;/div&gt;
  &lt;!-- Flex 项目 C --&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;span&gt;C&lt;/span&gt;ountries in the east&lt;/div&gt;
  &lt;!-- Flex 项目 D --&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;span&gt;D&lt;/span&gt;iscuss&lt;/div&gt;
  &lt;!-- Flex 项目 E --&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;span&gt;E&lt;/span&gt;astern&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
  display: flex;
  inline-size: 1000px;
  font-size: 1.5rem;
}

.item {
   flex-basis: 300px; /* 也可以使用 width 或 inline-size 来替代 */
   
   /* 等同于 */
   flex-grow: 0; /* flex-grow 的初始值 */
   flex-shrink: 1; /* flex-shrink 的初始值 */
   flex-basis: 300px;
}

.item span {
  font-size: 3rem;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候所有 Flex 项目的 <code>flex-basis</code> 值的总和 <code>1500px</code> （即 <code>300px × 5 = 1500px</code>）大于 Flex 容器的可用空间（它的<code>inline-size</code> ）<code>1000px</code> 。按理说，Flex 项目是会溢出 Flex 容器的，但因为 Flex 项目的 <code>flex-shrink</code> 初始值是 <code>1</code> ，所以浏览器会根据 <code>flex-shrink</code> 值对 Flex 项目按照相应的收缩因子进行收缩，让 Flex 项目填充整个 Flex 容器（Flex 项目不会溢出 Flex 容器）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d288965a59464f7ab4f9a8805b47b311~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果我们显式把 <code>flex-shrink</code> 属性的默认值 <code>1</code> 重置为 <code>0</code> 时，你将看到的浏览器不会对 Flex 项目进行收缩，此时 Flex 项目溢出了 Flex 容器，在这个示例中这个溢出部分大约会是 <code>500px</code> （即 <code>1500 - 1000px = 500px</code>），这个溢出部分也常称为 <strong>Flex 容器不足空间</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8b94a1fa1ee4e189c698957c186ea23~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>flex-shrink</code> 的计算和 <code>flex-grow</code> 是相似的，不同的是 <strong><code>flex-grow</code></strong> <strong>按扩展因子分配 Flex 容器的剩余空间，<code>flex-shrink</code>按收缩因子分配 Flex 容器的不足空间</strong> 。因此，<code>flex-shrink</code> 的计算，也可以像 <code>flex-grow</code> 一样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af9423d15df841c38649d587cef2617a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就这个示例而言，<strong>Flex 容器的不足空间</strong> 等于 <code>500px</code> :</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器不足空间 = Flex 容器可用空间 - 所有 Flex 项目的尺寸总和

Flex 容器不足空间 = 1000px - 300px × 5 = -500px 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器将会循环遍历去计算每个 Flex 项目的 <strong>弹性量</strong> ，即收缩值。先来看 Flex 项目 A:</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex 项目的收缩值（flex-shrink总和） × 当前 Flex 项目的收缩因子（flex-shrink值）
Flex 项目计算后的 flex-basis 值 = Flex 项目的弹性量 + Flex 项目当前的 flex-basis 值

Flex 项目 A 的弹性量 = -500px ÷ (1 + 1 + 1 + 1 + 1) × 1 = -100px
Flex 项目 A 计算后的 flex-basis 值 = -100px + 300px = 200px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据公式计算出来 Flex 项目 A 的 <code>flex-basis</code> 值（其宽度）是 <code>200px</code> ，但这个示例中，因为其内容是一个长单词，它的最小内容长度（<code>min-content</code>）大约是 <code>237.52px</code> 。计算出来的值小于该值（<code>200px &lt; 237.52px</code>），这个时候会取该 Flex 项目内容的最小长度值。</p><blockquote><p><strong>在 Flex 项目的计算中，不管是使用</strong> <strong><code>flex-grow</code></strong> <strong>还是</strong> <strong><code>flex-shrink</code></strong> <strong>对 Flex 项目进收缩扩展计算，计算出来的值不能比 Flex 项目的内容的最小长度（<strong><strong><code>min-content</code></strong></strong>）或内部固定元素的长度值还小</strong> 。</p></blockquote><p>因此，Flex 项目 A 计算之后的 <code>flex-basis</code> 值为 <code>237.52px</code> 。</p><p>接着，浏览器会按照同样的方式来计算 Flex 项目 B：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>// 计算 Flex 项目B
Flex 容器的不足空间 = 1000px - 237.52px - (300px × 4) = -437.52px

Flex 项目 B 的弹性量 = -437.52px ÷ (1 + 1 + 1 + 1) × 1 = -109.38px
Flex 项目 B 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依此类推，就可以计算出 Flex 项目 C、Flex 项目 D 和 Flex 项目 E 的 <code>flex-basis</code> 值：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器不足空间 = Flex 容器可用空间 - 所有Flex项目的尺寸总和（flex-basis 总和）
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex项目的收缩值（flex-srhink总和）× 当前flex项目的flex-shrink
Flex 项目计算后的flex-basis 值 = Flex项目弹性 + Flex项目初设的flex-basis值

// 计算 Flex 项目 C

Flex 项目 C 的弹性量 = (1000px - 237.52px - 190.62px - (300px + 300px + 300px)) ÷ (1 + 1 + 1) × 1  = -109.38px
Flex 项目 C 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px 

// 计算 Flex 项目 D
Flex 项目 D 的弹性量 = (1000px - 237.52px - 190.62px - 190.62px - (300px + 300px)) ÷ (1 + 1) × 1  = -109.38px  
Flex 项目 D 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px 

// 计算 Flex 项目 E
Flex 项目 E 的弹性值 = (1000px - 237.52px - 190.62px - 190.62px - 190.62px - 300px) ÷ 1 × 1  = -109.38px  
Flex 项目 E 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/333257f715ad4653bb6e2e62827646e5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,27),r={href:"https://codepen.io/airen/full/oNdwZoZ",target:"_blank",rel:"noopener noreferrer"},v=l(`<p>在 CSS 中给元素设置一个尺寸时，大多数开发者还是更喜欢使用 <code>width</code> (或 <code>inline-size</code>) ，和 <code>height</code>（或 <code>block-size</code>）属性，并不习惯使用 <code>flex-basis</code> 给 Flex 项目设置基础尺寸。在 Flex 项目中如果未显式设置 <code>flex-basis</code> 的值，浏览器将会采用其默认值 <code>auto</code> 作为 <code>flex-basis</code> 的值。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    inline-size: 1000px;
}

.item {
    width: 300px; /* 或 inline-size: 300px */
    
    /* 等同于 */
    flex-grow: 0;     /* flex-grow 初始值，不扩展 */
    flex-shrink: 1;   /* flex-shrink 初始值，会收缩 */
    flex-basis: auto; /* flex-basis 初始值，未显式设置 width 或 inline-size 时，会是其 max-content */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个示例的 Flex 项目的 <code>flex-shrink</code> 的计算和上一个示例（即 Flex 项目上显式设置 <code>flex-basis: 300px</code>）是一样的。这主要是因为：</p><blockquote><p><code>flex-basis</code> 取值为 <code>auto</code> 时，且该 Flex 项目未显式设置 <code>width</code> 或 <code>inline-size</code> 属性值（非<code>auto</code> ），那么浏览器将会把 Flex 项目的内容长度作为 <code>flex-basis</code> 的值；反之，有显式设置 <code>width</code> 或 <code>inline-size</code> 属性值（非<code>auto</code>），那么浏览器会把 <code>width</code> 或 <code>inline-size</code> 属性值作为 <code>flex-basis</code> 的值。</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a0e240490d0463b85405aaea3c8422c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),t={href:"https://codepen.io/airen/full/rNvwgKm",target:"_blank",rel:"noopener noreferrer"},b=l(`<p>不过有一点需要特别的注意，当你在 Flex 项目同时设置了 <code>width</code> （或 <code>inline-size</code>），且 <code>flex-basis</code> 值为 <code>0</code> （或任何一个非 <code>auto</code> 的值）时，那么 <code>flex-basis</code> 的值都会替代 <code>width</code> 或 <code>inline-size</code> 属性的值。比如下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    inline-size: 1000px;
}

.item {
    inline-size: 300px;
    flex-basis: 0%; /* flex-basis 替代了 inline-size */
    
    /* 等同于 */
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 <code>flex-basis</code> 属性值 <code>0%</code> 替代了<code>inline-size</code> 属性的值作为 Flex 项目的基础尺寸，因为 <code>flex-basis</code> 值显式设置了为 <code>0%</code> ，这个时候浏览器会将 Flex 项目的内容最小尺寸，即 <code>min-content</code>， 作为 Flex 项目的基础尺寸。如此一来，Flex 项目就有可能不会溢出 Flex 容器了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceac4b8df3b748fe96a01181408aeae3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),u={href:"https://codepen.io/airen/full/WNJOBBw",target:"_blank",rel:"noopener noreferrer"},m=l(`<p>如果大家在开发过程中，碰到在 Flex 项目上设置了 <code>width</code> ，<code>inline-size</code> 、<code>height</code> 或 <code>block-size</code> 无效时，就要先排查 Flex 项目的 <code>flex-basis</code> 是否设置了一个非<code>auto</code> 的值，比如 <code>0</code> 。</p><p>至于其中原委，这里先不聊（后面专门介绍 <code>flex-basis</code> 课程中会有介绍）。我们接着来看 <code>flex-shrink</code> 。</p><p>前面聊 <code>flex-grow</code> 属性时，可以给其设置不同的值，浏览器在计算时，会根据不同的扩展比例来扩展 Flex 项目的尺寸。同样的，可以给 Flex 项目设置不同的 <code>flex-shrink</code> 值，浏览器在计算时会根据不同的收缩比例来收缩 Flex 项目的尺寸。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.item {
    flex-basis: 300px;
    flex-shrink: var(--flex-shrink, 0);
}

.item:nth-child(2) {
    --flex-shrink: 1;
}

.item:nth-child(3) {
    --flex-shrink: 2;
}

.item:nth-child(4) {
    --flex-shrink: 3;
}

.item:nth-child(5) {
    --flex-shrink: 4;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器按照相应的收缩比例对 Flex 项目进行计算，其计算过程如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器不足空间 = Flex 容器可用空间 - 所有Flex项目的尺寸总和（flex-basis 总和）
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex项目的收缩值（flex-srhink总和）× 当前flex项目的flex-shrink
Flex 项目计算后的flex-basis 值 = Flex项目弹性 + Flex项目初设的flex-basis值


Flex 项目 A 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (0 + 1 + 2 + 3 + 4) × 0  = 0px  
Flex 项目 A 计算后的 flex-basis 值 = 0 + 300px = 300px // 不收缩  

Flex 项目 B 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (1 + 2 + 3 + 4) × 1  = -50px
Flex 项目 B 计算后的 flex-basis 值 = -50px + 300px = 250px
  
Flex 项目 C 的弹性量 = (1000px - 300px - 250px - 300px - 300px - 300px) ÷ (2 + 3 + 4) × 2 = -100px  
Flex 项目 C 计算后的 flex-basis 值 = -100px + 300px = 200px
  
Flex 项目 D 的弹性量 = (1000px - 300px - 250px - 200px - 300px - 300px) ÷ (3 + 4) × 3 = -150px  
Flex 项目 D 计算后的 flex-basis 值 = -150px + 300px = 150px
  
Flex 项目 E 的弹性量 = (1000px - 300px - 250px - 200px - 150px - 300px) ÷ 4 × 4 = -200px  
Flex 项目 E 计算后的 flex-basis 值 = -200px + 300px = 100px 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11c4f496f6504753bdda25f5c2093d9c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),f={href:"https://codepen.io/airen/full/RwygzZN",target:"_blank",rel:"noopener noreferrer"},F=l(`<p>我们多次提到过，浏览器对 Flex 项目尺寸的计算是一种 <strong>循环遍历计算</strong> 模式，因为浏览器无法一次性就知道，在计算 Flex 项目尺寸时就能把所有情况都预判到。比如下面这个示例（在上一个示例的基础上，将Flex 项目 E 的文本内容“<strong>Eastern</strong>”调整得更长一些，比如“Elonglonglongword” ）。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90156594251d4e3ca7c1d61da6296b71~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器不足空间 = Flex 容器可用空间 - 所有Flex项目的尺寸总和（flex-basis 总和）
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex项目的收缩值（flex-srhink总和）× 当前flex项目的flex-shrink
Flex 项目计算后的flex-basis 值 = Flex项目弹性 + Flex项目初设的flex-basis值


Flex 项目 A 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (0 + 1 + 2 + 3 + 4) × 0  = 0px  
Flex 项目 A 计算后的 flex-basis 值 = 0 + 300px = 300px // 不收缩  

Flex 项目 B 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (1 + 2 + 3 + 4) × 1  = -50px
Flex 项目 B 计算后的 flex-basis 值 = -50px + 300px = 250px
  
Flex 项目 C 的弹性量 = (1000px - 300px - 250px - 300px - 300px - 300px) ÷ (2 + 3 + 4) × 2 = -100px  
Flex 项目 C 计算后的 flex-basis 值 = -100px + 300px = 200px
  
Flex 项目 D 的弹性量 = (1000px - 300px - 250px - 200px - 300px - 300px) ÷ (3 + 4) × 3 = -150px  
Flex 项目 D 计算后的 flex-basis 值 = -150px + 300px = 150px
  
Flex 项目 E 的弹性量 = (1000px - 300px - 250px - 200px - 150px - 300px) ÷ 4 × 4 = -200px  
Flex 项目 E 计算后的 flex-basis 值 = -200px + 300px = 100px 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照公式计算出来的 Flex 项目 E 的 <code>flex-basis</code> 尺寸是 <code>100px</code> ，它小于 Flex 项目 E 的内容最小尺寸（<code>min-content</code>），大约 <code>233.38px</code>。因为 Flex 项目收缩不会小于其最小内容尺寸（也就是不会小于 <code>233.38px</code> ）。这个时候 Flex 容器的不足空间也随之产生了变化：</p><ul><li>Flex 项目 A 的 <code>flex-shrink</code> 值等于 <code>0</code> ，它不做任何收缩，因此它的宽度就是 <code>flex-basis</code> 初设的值，即 <code>300px</code> 。</li><li>Flex 项目 E 计算之后的 <code>flex-basis</code> 值小于 <code>min-content</code> ，因此，它的 <code>flex-basis</code> 的值是 <code>min-content</code> ，在该例中大约是 <code>233.38px</code>。</li></ul><p>这样一来，Flex 容器的不足空间就是：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器的不足空间 = 1000px - 300px - 233.38px - 300px - 300px - 300px = -433.38px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即，大约 <code>433.38px</code> 的不足空间再次按收缩因子的比例划分给 Flex 项目 B (<code>flex-shrink: 1</code>)、Flex 项目 C （<code>flex-shrink: 2</code>） 和 Flex 项目 D (<code>flex-shrink: 3</code>)。也就是说，Flex 项目 A 和 Flex 项目 E 不再参与第二次的计算了：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 项目 B 的弹性量 = (1000px - 300px - 233.38px - 300px - 300px - 300px) ÷ (1 + 2 + 3) × 1 = -72.23px
Flex 项目 B 计算后的 flex-basis 值 = -72.23px + 300px = 227.77px

Flex 项目 C 的弹性量 = (1000px - 300px - 233.38px - 227.77px - 300px - 300px) ÷ (2 + 3) × 2 = -144.46px
Flex 项目 C 计算后的 flex-basis 值 = -144.46px + 300px = 155.54px

Flex 项目 D 的弹性量 = (1000px - 300px - 233.38px - 227.77px - 155.54px - 300px) ÷ 3 × 3 = -216.69px
Flex 项目 D 计算后的 flex-basis 值 = -216.69px + 300px = 83.31px 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不幸的是，浏览器在进行第二轮计算的时候，又碰到了 Flex 项目 D 计算出来的 <code>flex-basis</code> 值 <code>83.31px</code> ，它也小于它内容的最小长度（<code>min-content</code>），大约 <code>100.69px</code> 。它也不能再做任何收缩。因此，浏览器需要再做第三轮计算，即 Flex 项目 B 和 Flex 项目 C 接着重新计算：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 容器不足空间 = 1000px - 300px - 233.38px - 100.69px - 300px - 300px = -234.07px

Flex 项目 B 的弹性量 = (1000px - 300px - 233.38px - 100.69px - 300px - 300px) ÷ (1 + 2) × 1 = -78.02px
Flex 项目 B 计算后的 flex-basis 值 = -78.02px + 300px = 221.98px

Flex 项目 C 的弹性量 = (1000px - 300px - 233.38px - 100.69px - 221.98px - 300px) ÷ 2 × 2 = -156.05px
Flex 项目 C 计算后的 flex-basis 值 = -156.05px + 300px = 143.95px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果计算出来的 Flex 项目 C 的 <code>flex-basis</code> 值还是小于其 <code>min-content</code> 的话，浏览器将会进行第四轮的计算，直到符合条件为止。所幸，我们这个示例第三轮计算就符合条件了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c50156e58b1406ea53a8be34dc24ba5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),g={href:"https://codepen.io/airen/full/qBYjeJq",target:"_blank",rel:"noopener noreferrer"},h=l(`<p><code>flex-shrink</code> 的使用还有一点和 <code>flex-grow</code> 类似，也可以在 <code>flex-shrink</code> 设置小于 <code>1</code> 的正整数。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.container {
    display: flex;
    inline-size: 1000px;
}

.item {
    flex-shrink: .1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算公式也是类似的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1652f17c80bd4b0498c91dd81bdbc85c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>Flex 项目的 flex-shrink 总和 =  (0.1 + 0.1 + 0.1 + 0.1 + 0.1) = 0.5 &lt; 1
Flex 项目的灵活性 = (Flex 容器的不足空间  × 当前 Flex 项目自身的扩展因子 flex-shrink
Flex 容器的剩余空间 = 1000px - 300px - 300px - 300px - 300px - 300px = -500px

Flex 项目 A 的弹性值 = -500px × 0.1 = -50px
Flex 项目 A 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 B 的弹性值 = -500px × 0.1 = -50px
Flex 项目 B 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 C 的弹性值 = -500px × 0.1 = -50px
Flex 项目 C 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 D 的弹性值 = -500px × 0.1 = -50px
Flex 项目 D 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 E 的弹性值 =  -500px × 0.1 = -50px
Flex 项目 E 计算后的 flex-basis 值 = -50px + 300px = 250px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0db27a3c273f4a4099c5f2f534fc4e7d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,6),k={href:"https://codepen.io/airen/full/qBYXWQY",target:"_blank",rel:"noopener noreferrer"},S=l('<p>如上图所示，当所有 Flex 项目的 <code>flex-shrink</code> 属性值的总和小于 <code>1</code> 时，Flex 容器的不足空间是分配不完的，Flex 项目依旧会溢出 Flex 容器。</p><p>如此一来，<code>flex-shrink</code> 的计算公式也分两种情景：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c5933377f9485b95254066e7422643~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，就 <code>flex-shrink</code> 计算，当所有 Flex 项目的 <code>flex-shrink</code> 值的总和大于 <code>1</code> 时，还可以使用下面这个公式来计算:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac195b17c58e4693b8c800e1f65df5b9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>不知道大家在这些示例中有没有发现过，<code>flex-shrink</code> 和 <code>flex-grow</code> 在计算时所运用的公式和过程都几乎是一样的，不同之处就是：</p><ul><li><code>flex-grow</code> 按比例分配 Flex 容器剩余空间，Flex 项目会按比例变大，但不会造成 Flex 项目溢出 Flex 容器（除非所有 Flex 项目自身的最小内容总和就大于 Flex 容器空间）。</li><li><code>flex-shrink</code> 按比例分配 Flex 容器不足空间，Flex 项目会按比例变小，但 Flex 项目仍然有可能溢出 Flex 容器。</li><li>当 <code>flex-grow</code> 属性值总和小于 <code>1</code> 时，Flex 容器的剩余空间分不完；同样的，当 <code>flex-shrink</code> 属性值总和小于 <code>1</code> 时，Flex 容器的不足空间分不完。</li></ul><p>另外，<code>flex-shrink</code> 有一点和 <code>flex-grow</code> 完全不同，如果某个 Flex 项目按照 <code>flex-shrink</code> 计算出来的新宽度（<code>flex-basis</code>）趋向于 <code>0</code> 或小于 Flex 项目内容的最小长度（<code>min-content</code>）时，Flex 项目将会按照该元素的 <code>min-content</code> 或其内部固定宽度的元素尺寸设置 <code>flex-basis</code> 新的值，同时这个宽度将会转嫁到其他 Flex 项目，浏览器会按照相应的收缩因子重新对 Flex 项目进行计算，直到符合条件为止。</p><p>简单地说，<strong>在 Flexbox 布局当中，<code>flex-shrink</code></strong> <strong>会阻止 Flex 项目宽度缩小至</strong> <strong><code>0</code></strong>。此时 Flex 项目会以 <strong><code>min-content</code></strong> <strong>的大小进行计算</strong>。这也是为什么在所有 Flex 项目显式设置 <code>flex:1</code> 不一定能让所有 Flex 项目宽度相等，或者说均分列的主要原因之一。</p><p>现在，基于前面课程提到的 Flex 容器的对齐属性、Flex 项目中的 <code>flex-shrink</code> 和 <code>flex-grow</code> 计算等知识，就可以很好地处理 Flex 容器的剩余空间和不足空间：</p><ul><li><strong>Flex 容器有剩余空间</strong> （所有 Flex 项目的宽度总和小于 Flex 容器的宽度），如果设置了 <code>flex-grow</code> ，Flex 项目会根据扩展因子分配 Flex 容器剩余空间；在未设置 <code>flex-grow</code> 时，就看在 Flex 容器中是否设置了对齐方式，如果是，那么会按对齐方式分配 Flex 容器剩余空间，如果不是，Flex 容器剩余空间不变 。</li><li><strong>Flex 容器有不足空间</strong> （所有 Flex 项目的宽度总和大于 Flex 容器的宽度），如果设置了 <code>flex-shrink</code> 值为 <code>0</code> ，Flex 项目不会收缩，Flex 项目溢出 Flex 容器；如果未显式设置 <code>flex-shrink</code> 值，Flex 项目会平均分配 Flex 容器不足空间，Flex 项目会变窄（Flex 项目的 <code>flex-shrink</code> 的默认值为 <code>1</code> ），如果显式设置了 <code>flex-shrink</code> 的值为非 <code>0</code> 的不同值，那么 Flex 项目会按照不同的收缩因子分配 Flex 容器不足空间，Flex 项目同样会变窄。</li></ul><p>具体的我们可以绘制一张这方面的流程图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cebbaa0a1e1046a9bcb6b285159a7b2c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',14);function C(_,w){const n=c("ExternalLinkIcon");return x(),o("div",null,[p,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",r,[i("https://codepen.io/airen/full/oNdwZoZ"),d(n)])])]),v,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",t,[i("https://codepen.io/airen/full/rNvwgKm"),d(n)])])]),b,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",u,[i("https://codepen.io/airen/full/WNJOBBw"),d(n)])])]),m,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",f,[i("https://codepen.io/airen/full/RwygzZN"),d(n)])])]),F,e("blockquote",null,[e("p",null,[i("Demo 地址： "),e("a",g,[i("https://codepen.io/airen/full/qBYjeJq"),d(n)])])]),h,e("blockquote",null,[e("p",null,[i("Demo 地址："),e("a",k,[i("https://codepen.io/airen/full/qBYXWQY"),d(n)])])]),S])}const j=s(a,[["render",C],["__file","index-07.html.vue"]]);export{j as default};
