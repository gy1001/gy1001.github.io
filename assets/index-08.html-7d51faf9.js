import{_ as i,M as l,p as o,q as r,R as n,t as s,N as e,a1 as t}from"./framework-e8cb8151.js";const p={},c=t('<h1 id="_08-前沿优化解决方案" tabindex="-1"><a class="header-anchor" href="#_08-前沿优化解决方案" aria-hidden="true">#</a> 08-前沿优化解决方案</h1><h2 id="_01-拯救移动端图标svg【拯救移动端图标】" tabindex="-1"><a class="header-anchor" href="#_01-拯救移动端图标svg【拯救移动端图标】" aria-hidden="true">#</a> 01: 拯救移动端图标SVG【拯救移动端图标】</h2><p>常见的字体方案经历了三种：PNG、Iconfont、SVG。</p><h3 id="一-png" tabindex="-1"><a class="header-anchor" href="#一-png" aria-hidden="true">#</a> （一）PNG</h3><p>先说说PNG，是比较早的方案了。PNG 属于一种图片格式，颜色丰富、边缘平滑，而且还支持透明度，所以最早被设计师作为 Icon 输出的格式，从而沿用到前端代码中；但这种图片icon也存在很大的缺陷：</p><ol><li>尺寸问题，必须关注图片的宽高、比例，以免导致失真、变形。</li><li>请求数量和体积问题，多个图片Icon需要通过雪碧图等技术来规避请求数量，而雪碧图的应用还需要关心icon的定位。</li><li>灵活性，比较难以使用CSS3中的一些属性，效果不佳。比如：hover、阴影、transform、filter</li></ol><h3 id="二-iconfont" tabindex="-1"><a class="header-anchor" href="#二-iconfont" aria-hidden="true">#</a> （二）Iconfont</h3>',7),d={href:"https://www.iconfont.cn/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://icofont.com/",target:"_blank",rel:"noopener noreferrer"},v={href:"http://www.fontawesome.com.cn/faicons/",target:"_blank",rel:"noopener noreferrer"},m=t(`<p><strong>Iconfont 相较于 PNG 的优势：</strong></p><ul><li><p>多个图标使用一套字体，减少获取时的请求数量和体积</p><blockquote><p>因为网站会有很多图标，如果使用 PNG，每个图标都需要单独设计一个文件，这样浏览器就需要对每一个文件进行加载。虽然可以使用雪碧图来规避请求数量，但是这就需要关心 icon 的定位了。</p><p>iconfont 就是一套字体，就只需要获取一套字体即可</p></blockquote></li><li><p>矢量图形，可伸缩</p></li><li><p>可以直接通过 CSS 修改样式（颜色、大小等）</p><blockquote><p>PNG 需要关注图片的宽度、比例，以避免失真、变形</p></blockquote></li></ul><p><strong>Iconfont 缺陷：</strong></p><ul><li>Iconfont 很难做到多色（自定义复杂颜色）</li><li>浏览器和搜索引擎很难理解这个字体图标代表什么意思</li></ul><p><strong>Iconfont 背后原理是怎样的呢？</strong></p><ol><li><p>将Icon制作成字体文件</p></li><li><p>字符是如何被计算机渲染的？</p><blockquote><p>通过 i 标签（比较常见），并设置 class 来添加伪元素，而伪元素的值为字体文件中的字形编码，浏览器通过字形编码找到字符并渲染出来的。</p></blockquote></li></ol><p><strong>字符是如何被计算机渲染的？</strong></p><p>绝大多数的字体都包含一个或多个Charmap，它的作用是就是把一个字符从它的字符编码印射到字形索引。</p><p>一般一个字符的渲染过程是这样的：</p><ol><li>加载字体文件</li><li>确定要输出的字体大小</li><li>输入这个字符的编码值</li><li>根据字体文件中的 Charmap，把编码值转换成字形索引（就是这个字符对应字体文件中的第几个形状）</li><li>根据索引从字体中加载这个字形</li><li>将这个字形渲染成位图，有可能进行加粗、倾斜等变换。</li></ol><h3 id="三-svg" tabindex="-1"><a class="header-anchor" href="#三-svg" aria-hidden="true">#</a> (三）SVG</h3><p><strong>SVG 的优点：</strong></p><ol><li>作为普通的页面元素，更具语义化， XML语法，搜索引擎SEO 和 无障碍读屏软件读取</li><li>独立的矢量图形，足够灵活</li><li>保持图片能力，支持多彩色图标</li><li>节省体积（Iconfont 往往需要一整套字体）</li></ol><p>这里在 <strong>React</strong> 中使用 <strong>svg-sprite-loader</strong> 对 <strong>svg</strong> 进行处理</p><ul><li><p>首先采用 <strong>@svgr/webpack</strong> 支持 svg 作为组件引用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> @svgr/webpack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>之后在 <strong>webpack.config.js</strong> 里配置即可</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> smp<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.svg$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@svgr/webpack&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在页面里直接当<strong>组件</strong>使用</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>class About extends Component {
  render() {
    return (
      &lt;main className={this.props.classes.root}&gt;
        &lt;AddressCardSvg width={100} color={&#39;#fa1010&#39;}/&gt;
      &lt;/main&gt;
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_02-使用-flexbox-优化布局" tabindex="-1"><a class="header-anchor" href="#_02-使用-flexbox-优化布局" aria-hidden="true">#</a> 02: 使用 FlexBox 优化布局</h2><blockquote><p>布局经历了几种方案：table布局、传统布局（float、position、display、盒模型）、flex布局、grid布局。</p><p>table布局已经彻底淘汰了，传统布局PC端还有一些使用，尤其是CSS响应式；相较于最新的Grid、Flex来说，兼容性最好，但是效率最低，开发起来比较麻烦。</p><p>当下用的最多的是 flex布局 和 grid布局。</p><p>flex布局 移动端用的特别多，学习成本低，开发效率高，兼容性也还不错，它依据某个轴布局，可以看做是一维布局。</p><p>grid布局 在水平垂直两个方向上同时控制，可以称之为二维布局。Grid布局 非常强大，但概念也最多，学习成本高一些，兼容性不如flex。</p></blockquote><p>我们设置元素的 display: flex，这个元素就会变成 flex 容器</p><h3 id="flexbox-优势" tabindex="-1"><a class="header-anchor" href="#flexbox-优势" aria-hidden="true">#</a> Flexbox 优势</h3><ul><li>更好性能的实现方案：使用 Flexbox 布局在 Layout 和 Paint 耗时小于其他布局方式</li><li>容器可以决定子元素的几何属性：大小、顺序、对齐方式、间隔等</li><li>双向（横向、纵向）布局</li></ul><h2 id="_03-优化资源加载的顺序【给资源设置优先级】" tabindex="-1"><a class="header-anchor" href="#_03-优化资源加载的顺序【给资源设置优先级】" aria-hidden="true">#</a> 03: 优化资源加载的顺序【给资源设置优先级】</h2><p>使用 <code>Preload</code> 和 <code>Prefetch</code> 改变浏览器默认的资源加载优先级</p><h3 id="资源优先级" tabindex="-1"><a class="header-anchor" href="#资源优先级" aria-hidden="true">#</a> 资源优先级</h3><ul><li>浏览器默认安排资源加载优先级</li><li>使用 <code>preload</code> 和 <code>prefetch</code> 调整优先级</li></ul><h3 id="preload" tabindex="-1"><a class="header-anchor" href="#preload" aria-hidden="true">#</a> Preload</h3><blockquote><p>提前加载较晚出现，但对当前页面非常重要的资源</p><p>对于字体而言比较特殊，需要设置 <strong>crossorigin=&quot;anonymous&quot;</strong></p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>preload<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>test.jpg<span class="token punctuation">&quot;</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>preload<span class="token punctuation">&quot;</span></span>  
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://xxx.com/v15/LYjAdGP8kkgoTec8zkRgqBgxXsWsMfnCm1_q1j3gcsptb8OMg_Z2HVZhDbPBCIyx.119.woff2<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>font<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>font/woff2<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>anonymous<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prefetch" tabindex="-1"><a class="header-anchor" href="#prefetch" aria-hidden="true">#</a> Prefetch</h3><blockquote><p>提前加载后续路由需要的资源，优先级低</p><p>包括资源预加载、DNS预解析、http预连接和页面预渲染。</p></blockquote><p>资源预加载：<code>&lt;link rel=&quot;prefetch&quot; href=&quot;test.css&quot;&gt;</code></p><p>DNS预解析：<code>&lt;link rel=&quot;dns-prefetch&quot; href=&quot;//haitao.nos.netease.com&quot;&gt;</code></p><p>http预连接：<code>&lt;link rel=&quot;prefetch&quot; href=&quot;//www.kaola.com&quot;&gt;</code> 将建立对该域名的TCP链接</p><p>页面预渲染：<code>&lt;link rel=&quot;prerender&quot; href=&quot;//m.kaola.com&quot;&gt;</code> 将会预先加载链接文档的所有资源</p><h3 id="那么-prefetch-和-preload有什么区别呢" tabindex="-1"><a class="header-anchor" href="#那么-prefetch-和-preload有什么区别呢" aria-hidden="true">#</a> 那么 Prefetch 和 Preload有什么区别呢？</h3><p>具体来讲，Preload来告诉浏览器预先请求当前页需要的资源，从而提高这些资源的请求优先级。比如，对于那些本来请求优先级较低的关键请求，我们可以通过设置 Preload 来提升这些请求的优先级。</p><p>Prefetch 来告诉浏览器用户将来可能在其他页面（非本页面）可能使用到的资源，那么浏览器会在空闲时，就去预先加载这些资源放在http缓存内，最常见的dns-prefetch。比如，当我们在浏览A页面，如果会通过A页面中的链接跳转到B页面，而B页面中我们有些资源希望尽早提前加载，那么我们就可以在A页面里添加这些资源Prefetch，那么当浏览器空闲时，就会去加载这些资源。</p><p>所以，对于那些可能在当前页面使用到的资源可以利用 Preload ，而对一些可能在将来的某些页面中被使用的资源可以利用 Prefetch 。如果从加载优先级上看，Preload 会提升请求优先级；而 Prefetch 会把资源的优先级放在最低，当浏览器空闲时才去预加载。</p><p>资源加载优先级可以放在首屏资源优化中，通过首屏那一帧找出对应的关键请求链，然后调整这些资源的加载优先级可以提高首屏加载速度。</p><p>另外，首屏速度也可以基于关键请求链做文章，从 Localstorage、缓存等角度着手</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结：</h3><p>对于那些在当前页面使用的资源可以利用 Preload，而对一些可能在将来某些页面中使用的资源可以利用 Prefetch。从加载优先级上看，Preload 会提升请求优先级，而 Prefetch 会把资源的优先级防止最低，当浏览器空闲时采取加载</p><p>webpack 提前预加载处理，只需要加上一行注释</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackPrefetch: true */</span> <span class="token string">&#39;./path/to/LoginModal.js&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackPreload: true */</span> <span class="token string">&#39;ChartingLibrary&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_04-预渲染页面【提前完成任务的意义】" tabindex="-1"><a class="header-anchor" href="#_04-预渲染页面【提前完成任务的意义】" aria-hidden="true">#</a> 04: 预渲染页面【提前完成任务的意义】</h2>`,44),b={href:"https://juejin.cn/post/7022890151567179784",target:"_blank",rel:"noopener noreferrer"},h=t('<blockquote><p>预渲染页面有点类似于我们使用的<strong>服务端渲染</strong>（SSR），通过这项技术可以帮助我们在打包的时候将单页应用的页面进行提前渲染，这样可以加快用户看到首屏的时间</p></blockquote><h3 id="预渲染的作用" tabindex="-1"><a class="header-anchor" href="#预渲染的作用" aria-hidden="true">#</a> 预渲染的作用：</h3><ul><li><p>大型单页应用的性能瓶颈：</p><blockquote><p><strong>JS 下载 + 解析 + 执行</strong></p></blockquote></li><li><p>SSR 主要问题</p><blockquote><p>牺牲 TTFB 来补救 First Paint，相当于给后台增加了任务量。</p><p>并且由于很多插件都是基于前端渲染的，即使有 Next.js等技术,SSR 实现起来还是比较复杂</p></blockquote></li><li><p>Pre-rendering（预渲染）</p><blockquote><p><strong>针对首屏优化，打包时提前渲染页面，没有服务端参与</strong></p></blockquote></li></ul><p>下面以 <strong>react-snap</strong> 插件为例进行介绍</p>',4),g={href:"https://github.com/stereobooster/react-snap",target:"_blank",rel:"noopener noreferrer"},k=t(`<p>首先，先对插件进行安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> react-snap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在 <strong>package.json</strong> 中增加一条 scipts，这里可以通过 npm 一个钩子函数，在 build 完成后，自动触发 <strong>postbuild</strong></p><blockquote><p><strong>npm提供了两种钩子</strong>，<strong>pre</strong>和<strong>post</strong>，分别代表操作前和操作后。比如</p><p>&quot;prebuild&quot; &quot;build&quot; &quot;postbuild&quot; ------------- &quot;preinstall&quot; &quot;install&quot; &quot;postinstall&quot;</p><p>当执行npm run build的时候，会按序执行npm run prebuild &amp;&amp; npm run build &amp;&amp; npm run postbuild。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cross-env NODE_ENV=production webpack&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;postbuild&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-snap&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用 <strong>react</strong> 做 SSR，它会对页面渲染进行修改，通常使用 <strong>ReactDOM.render</strong>，对主节点上相关元素进行渲染，如果主节点已经有元素了，就不需要触发 <strong>ReactDOM.render</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">)</span>
 
<span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span><span class="token function">hasChildNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  ReactDOM<span class="token punctuation">.</span><span class="token function">hydrate</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，在 <strong>package.json</strong> 中，可以配置内联样式，避免明显的<strong>样式闪动（FOUC）</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string-property property">&quot;reactSnap&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>    
  <span class="token string-property property">&quot;inlineCss&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 内联样式，避免明显的样式闪动 </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_05-windowing提高列表性能【开源节流-用什么画什么】" tabindex="-1"><a class="header-anchor" href="#_05-windowing提高列表性能【开源节流-用什么画什么】" aria-hidden="true">#</a> 05: Windowing提高列表性能【开源节流，用什么画什么】</h2>`,10),f={href:"https://www.jianshu.com/p/40c4dd721c21",target:"_blank",rel:"noopener noreferrer"},q={href:"https://juejin.cn/post/6979865534166728711",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/tangbc/vue-virtual-scroll-list",target:"_blank",rel:"noopener noreferrer"},_=t(`<h3 id="windowing-的作用" tabindex="-1"><a class="header-anchor" href="#windowing-的作用" aria-hidden="true">#</a> windowing 的作用</h3><ul><li>加载大列表、大表单的每一行严重影响性能</li><li><code>Lazy loading</code> 仍然会让 DOM 变得过大</li><li><code>windowing</code> 只渲染可见的行，渲染和滚动的性能都会提升</li></ul><p><img src="https://img-blog.csdnimg.cn/img_convert/9facaa468e9d0a71aafe30daeb0e9a42.png" alt="img"></p><p><strong>安装：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> react-window
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>以一个二维列表为例，进行使用：</strong></p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>import { FixedSizeGrid, FixedSizeList } from &#39;react-window&#39;
import model from &#39;./model&#39;
import React from &#39;react&#39;
 
const items = []
 
for (let i = 0; i &lt; 100; i++) {
  items.push(model.map(m =&gt; &lt;img src={m.image} alt={m.name} width={100} height={90} /&gt;))
}
 
const Row = ({ index, style }) =&gt; {
  let styleExt = {
    ...style,
    borderBottom: &#39;1px solid #fff&#39;,
    display: &#39;flex&#39;,
    alignItems: &#39;center&#39;,
    justifyContent: &#39;center&#39;,
  }
  return &lt;div style={styleExt}&gt;{items[index]}&lt;/div&gt;
}
 
class ListComponent extends React.Component {
  listRef = React.createRef()
 
  scrollToRow = rowNum =&gt; () =&gt; {
    if (rowNum &lt;= 0 || rowNum &gt; items.length) return
    this.listRef.current.scrollToItem(rowNum)
  }
 
  render() {
    return (
      &lt;div&gt;
        &lt;button onClick={this.scrollToRow(50)}&gt;Scroll&lt;/button&gt;
				/* 一维列表List */
        &lt;FixedSizeList
          ref={this.listRef}
          height={360}
          width={400}
          itemSize={120}
          itemCount={items.length}
          className={this.props.className}
        &gt;
          {Row}
        &lt;/FixedSizeList&gt;
				/* 二维列表Grid */
        {/* &lt;FixedSizeGrid
          columnCount={1000}
          columnWidth={100}
          height={150}
          rowCount={1000}
          rowHeight={35}
          width={300}
        &gt;
          {Row}
        &lt;/FixedSizeGrid&gt; */}
      &lt;/div&gt;
    )
  }
}

export default ListComponent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_06-使用骨架组件减少布局移动【论占位置的重要性】" tabindex="-1"><a class="header-anchor" href="#_06-使用骨架组件减少布局移动【论占位置的重要性】" aria-hidden="true">#</a> 06: 使用骨架组件减少布局移动【论占位置的重要性】</h2><blockquote><p>当相关组件数据还没有完全加载时，如果样式没有控制好，会导致组件没有完全撑开，当样式加载好之后，组件的布局会发生变化，对周围的组件也会造成影响，这个性能消耗比较高，我们应该尽量避免</p><p>骨架组件也叫 Skeleton 或 Placeholder（占位符），用来占位和提升用户感知性能，可以在 Google DevTools 里键入 ctrl + shift + p，输入 Layout Shift Regions 查看是否发生布局移动</p></blockquote><h3 id="骨架组件-skeleton-placeholder-的作用" tabindex="-1"><a class="header-anchor" href="#骨架组件-skeleton-placeholder-的作用" aria-hidden="true">#</a> 骨架组件（Skeleton/Placeholder）的作用：</h3><ol><li>占位</li><li>提升用户感知性能</li></ol><blockquote><p>注意：Placeholder要根据要替换的组件进行定制，从而避免 Layout Shift。</p></blockquote><p><strong>安装插件</strong></p>`,13),w={href:"https://www.npmjs.com/package/react-placeholder",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> react-placeholder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>import ReactPlaceholder from &#39;react-placeholder&#39;
 
class Contact extends Component {
  render() {
    const { ready } = this.state
    const imageStyle = !ready ? { display: &#39;none&#39; } : {}
    const becomeReady = () =&gt; {
      this.setState({ ready: true })
    }
    let cardMedia = (
      &lt;CardMedia
        component={&#39;img&#39;}
        style={imageStyle}
        className={this.props.classes.media}
        image={this.props.image}
        onLoad={this.becomeReady}
      /&gt;
    )
 
    return (
      &lt;div className={this.props.classes.root}&gt;
        &lt;ReactPlaceholder ready={this.state.ready} customPlaceholder={&lt;ContactPlaceholder /&gt;}&gt;
          /* ... */
        &lt;/ReactPlaceholder&gt;
        {!ready &amp;&amp; cardMedia}
      &lt;/div&gt;
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function P(S,j){const a=l("ExternalLinkIcon");return o(),r("div",null,[c,n("blockquote",null,[n("p",null,[n("a",d,[s("iconfont-阿里巴巴矢量图标库"),e(a)]),s("、"),n("a",u,[s("IcoFont"),e(a)]),s("、"),n("a",v,[s("Font Awesome"),e(a)])])]),m,n("p",null,[n("a",b,[s("vue项目配置预渲染"),e(a)])]),h,n("blockquote",null,[n("p",null,[n("a",g,[s("https://github.com/stereobooster/react-snap"),e(a)])])]),k,n("p",null,[n("a",f,[s("使用react-window构造虚拟列表（性能优化）"),e(a)])]),n("p",null,[n("a",q,[s("Vue 超长列表渲染性能优化实战"),e(a)])]),n("p",null,[n("a",x,[s("https://github.com/tangbc/vue-virtual-scroll-list"),e(a)])]),_,n("p",null,[n("a",w,[s("https://www.npmjs.com/package/react-placeholder"),e(a)])]),y])}const C=i(p,[["render",P],["__file","index-08.html.vue"]]);export{C as default};
