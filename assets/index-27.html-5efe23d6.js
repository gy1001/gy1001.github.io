import{_ as l,M as a,p as r,q as c,R as i,t as e,N as d,a1 as s}from"./framework-e8cb8151.js";const o={},t=i("h1",{id:"_27-下一代响应式-web-设计-组件式驱动式-web-设计",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_27-下一代响应式-web-设计-组件式驱动式-web-设计","aria-hidden":"true"},"#"),e(" 27-下一代响应式 Web 设计：组件式驱动式 Web 设计")],-1),v={href:"https://twitter.com/beep",target:"_blank",rel:"noopener noreferrer"},m={href:"https://alistapart.com/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://alistapart.com/article/responsive-web-design/",target:"_blank",rel:"noopener noreferrer"},b=i("p",null,"从提出这个概念到今天，十多年过去了，CSS 也发生了巨大的变化，新增了很多新的特性，近两年尤其如此。这些变化，对于响应式 Web 设计的开发也有较大的改变。",-1),p={href:"https://twitter.com/una",target:"_blank",rel:"noopener noreferrer"},g={href:"https://io.google/2021/session/a1760fa3-879a-4e98-a616-994ca8d3aab5/?lng=zh-CN",target:"_blank",rel:"noopener noreferrer"},f=i("strong",null,"组件驱动式 Web 设计（Component-Driven Web Design）",-1),h=i("strong",null,"下一代响应式 Web 设计",-1),S=s('<p>也就是说，我们又一次见证了响应式设计生态系统的演变，即 <strong>CSS</strong> <strong>新增的特性将直接基于组件而不是基于页面注入样式响应能力</strong>。这种能力被称为 <strong>组件驱动 Web 设计（Component-Driven Web Design）</strong> ，基于组件驱动的开发将会成为一种真正流行的开发模式。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed25203aec9044bab5962863af6033cf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>为了理解这种开发模式的转变，并为即将到来的变化浪潮做好准备，让我们看看在响应式 Web 设计运动中，我们可以期待的变化。</p><h2 id="响应式-web-设计简介" tabindex="-1"><a class="header-anchor" href="#响应式-web-设计简介" aria-hidden="true">#</a> 响应式 Web 设计简介</h2><p>理论上，响应式 Web 页面能够适应不同的终端设备：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acb583f6b4ec4fb0a20927ce6c7dc80e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果用一句话来描述响应式 Web 设计的话，我觉得这句最经典：“<strong>Content is like water</strong>”，即 “<strong>如果将屏幕看作容器器皿，那么内容就像水一样</strong>”，可以随着器皿的不同成不同的形状：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0294bbb6d2444d46904eae1a1a1b7c75~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这也正如 @Ethan Marcotte 所言： “<strong>未来我们应该这样，随着访问网页的设备增加，我们不会为每个设备单独设计，而只会做一份设计，把每个设备作为这份设计要照顾的一个方面</strong> ”。</p><p>也就是说，每个设备上都会去追求最佳的用户体验，设计会自动适应各个设备。在过去的时代，设计师精确知道自己的媒介材质，比如一张 A4 纸张，一个名片，或者一张海报。但是在我们这个多屏时代，Web 设计必须有这样的思维，<strong>我们要为“任意尺寸”而去设计</strong>。</p><p>另外，易与 RWD 搞混淆的是<strong>自适应设计</strong> ，即 <strong>Adaptive Web Design</strong> ，简称 <strong>AWD</strong> 。 RWD 和 AWD 都是为了适配各种不同终端设备，致力于提升用户体验所产生的设计方案（或适配方案）。核心思想是用技术来使 Web 页面适应从小到大的不同分辨率的屏幕。从历史的发展角度来说，AWD 早于 RWD，也正因此，常有人把 RWD 当作 AWD 的一个子集，甚至有很多人认为 RWD 就是 AWD。</p>',11),_={href:"https://twitter.com/beep",target:"_blank",rel:"noopener noreferrer"},k={href:"https://alistapart.com/article/responsive-web-design/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://twitter.com/zeldman",target:"_blank",rel:"noopener noreferrer"},w=i("blockquote",null,[i("p",null,"RWD 是一切能用来为各种分辨率和设备性能优化视觉体验的技术。")],-1),C={href:"https://twitter.com/AaronGustafson",target:"_blank",rel:"noopener noreferrer"},q={href:"https://adaptivewebdesign.info/",target:"_blank",rel:"noopener noreferrer"},y=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e666b5ed917c47189f9815c02d0f3950~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>他认为 AWD 在包括 RWD 的 CSS 媒体查询技术以外，还需要借助 JavaScript 脚本来操作 HTML ，使其更适应移动终端的能力。AWD 有可能会针对移动端用户“<strong>减去内容，减少功能</strong> ”。 AWD 可以在服务端就进行优化，把优化过的内容输送到客户端上。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dde059fc8d1a4988adb2d7dcc98a28d0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果用一句话来描述 RWD 和 AWD 区别的话：</p><blockquote><p><strong>RWD是一套代码，适用于所有终端屏幕；AWD 则是多端多套代码</strong> ！</p></blockquote><p>但两者本质都是：<strong>致力于适配不同终端设备，更好提升用户体验</strong> ！</p><h2 id="响应式布局中的几个重要概念" tabindex="-1"><a class="header-anchor" href="#响应式布局中的几个重要概念" aria-hidden="true">#</a> 响应式布局中的几个重要概念</h2><p>在响应式 Web 布局中有几个重要概念，我们有必要花一点时间进行了解。比如，<strong>CSS 像素</strong>、<strong>设备像素、分辨率</strong>、<strong>显示分辨率</strong>、<strong>图片分辨率</strong>、<strong>分辨率比例</strong>、<strong>屏幕尺寸</strong>、<strong>设备独立像素</strong>、<strong>设备像素比（DPR）</strong>、<strong>像素密度（PPI）</strong>、<strong>DPI</strong> 和 <strong>视窗</strong>等。</p><h3 id="css-像素" tabindex="-1"><a class="header-anchor" href="#css-像素" aria-hidden="true">#</a> CSS 像素</h3><p>CSS 像素（CSS Pixel，简称 <code>px</code>）也称为<strong>设备独立像素</strong> 、<strong>逻辑像素</strong> ，在 iOS 中称为 <strong>PT</strong> ，Android 中称之为 <strong>DIP</strong> 或 <strong>DP</strong> ，默认情况下在 PC 端等于一个<strong>物理像素</strong> 。比如，使用 CSS 的 <code>px</code> 单位给 <code>img</code> 元素指定了一个 <code>375px</code> 宽，<code>812px</code> 的高，则刚好填满了 iPhone 11 Pro (或 iPhone X)的整个屏幕：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> img { 
     width: 375px; 
     height: 812px; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e39d84bf6fa34f4fb039497561f71d57~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果你在设计软件中（比如 Sketch ）把一张 <code>375px x 815px</code> 图片放大（使用软件中的放大镜工具，放大到 <code>N</code> 倍），可以看到一个个方块点：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/556a1de25f9740ffa08ec7358fb9dded~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这些个小方块点具有特定的位置和颜色。正如上图所示，图片（或电子屏幕，比如手机、显示器屏幕等）就是由无数个具有特定颜色和特定位置的小方块拼接而成。</p><p>一般情况下， CSS 像素（<code>px</code>）相对的是设备像素（Device Pixel）。</p><p>CSS 像素具有两个方面的相对性：</p><ul><li>在同一个设备上，每一个 CSS 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）；</li><li>在不同的设备之间，每一个 CSS 像素所代表的设备像素是可以变化的（比如两个不同型号的手机） 。</li></ul><p>你可能在用浏览器访问一个 Web 页面的时候，会有放大缩小的操作，会引起 CSS 中 <code>px</code> 的变化，可能会出现等于、大于或小于的三种情况：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1a2ab47acc64b63841d7c5dc2a5a733~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>另外，CSS像素也会受到 “<strong>每英寸像素（PPI）” 和 “设备像素比（DPR）</strong> ” 的影响。</p><h3 id="设备像素" tabindex="-1"><a class="header-anchor" href="#设备像素" aria-hidden="true">#</a> 设备像素</h3><p>设备像素（Device Pixels，简写 <code>DP</code>），又称<strong>物理像素</strong> ，是设备能控制显示的最小单位，我们可以把它看作显示器上的一个点，即屏幕上可以显示的最小颗粒，在同一设备上，它的物理像素是固定的。我们常说的 <code>1920 x 1080</code> 像素分辨率就是用的<strong>设备像素单位</strong> 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d31fcf092a2c4f50a4ce364c6949a414~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们平时所说的一倍屏、两倍屏和三倍屏，指的是设备以多少物理像素来显示一个 CSS 像素，所用的物理像素越多，一个 CSS 像素清晰度就越高。。</p><p>在开发的过程中，可以使用下面的 API 来获取屏幕真实的物理像素：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>window.screen.width  //获得屏幕水平方向上的像素数 
window.screen.height //获得屏幕垂直方向上的像素数 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>了解了设备像素概念之后，我们来试着回答：平时设计稿中的 <code>750px</code> 中的像素，跟 Web 布局中的 CSS 像素是一致的吗？如果你理解了 CSS 像素和物理像素概念，我想你肯定知道答案。如果你的回答是否（不一样），那说明你理解对了。是的，实际上我们在设计稿（设计师提供的稿子）的像素指的就是<strong>设备像素</strong> ，它是按照设备像素来的。</p><h3 id="分辨率" tabindex="-1"><a class="header-anchor" href="#分辨率" aria-hidden="true">#</a> 分辨率</h3><p>分辨率分为<strong>显示分辨率</strong>和<strong>图像分辨率</strong> 两种。</p><p><strong>显示分辨率</strong> 指的是屏幕图像的精密度，是指显示器所能显示的像素有多少。由于屏幕上的点、线和面都是由像素组成的，显示器可以显示的像素越多，画面就越精细，同样的屏幕区域内能显示的信息也就越多。 通常用每行像素数目乘以每列像素数目来表示分辨率。</p><p>如 MacBook Pro 16″的原始分辨率为 <code>3072px x 1920px</code>。就是说屏幕水平方向上有 <code>3072</code> 个像素点；在垂直方向有 <code>1920</code> 个像素点。屏幕分辨率是机器生产时已经确定好的了，即已经规定好了机器屏幕上是有多少个像素点组合而成。但我们也知道，我们可以修改电脑的屏幕分辨率。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/454703cbfa9547648a3df5664f53d3f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>图片分辨率则是单位英寸中所包含的像素点数，其定义更趋近于分辨率本身的定义。从这个定义上来看很明显，跟 PPI（像素密度）的含义是一样的，所以 PPI 是用来表示图片分辨率的单位，比如，<code>100ppi</code> 的图片分辨率，其意思是每英寸中有 <code>100</code> 个像素。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/042b9223dec340a5a3405521a6068401~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>跟显示分辨率一样，图片分辨率也可以用<code>水平像素数 x 垂直像素数</code>来表达。其实我们知道 <code>ppi</code>，也知道图片的宽高（如英寸为单位），就能算出图片是由多少个像素组成，即<code>水平像素数 x 垂直像素数</code>。</p><p>我们要知道，图片的显示宽高尺寸不会受到 PPI 值直接影响，对于计算机的显示系统来说，PPI 是没意义的，真正起作用的是图片的<code>水平像素数 × 垂直像素数</code>，只要<code>水平像素数 × 垂直像素数</code>一样，就算 PPI 不一样，图片同样显示一样的宽高尺寸。</p><p>此外，其实在不同的应用领域，图片分辨率也可以用不同的单位进行描述，如在打印领域中，也可以用 <code>dpi</code> 来描述。</p><h3 id="分辨率比例" tabindex="-1"><a class="header-anchor" href="#分辨率比例" aria-hidden="true">#</a> 分辨率比例</h3><p>分辨率比例（Resolution Ratio）同样分为屏幕分辨率比例和图像分辨率比例：</p><ul><li>屏幕分辨率比例是指屏幕的宽和高的像素比例；</li><li>图片分辨率比例是指图片的宽和高的像素比例。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e1bd06513741c29e4a54d1c21b7d28~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="屏幕尺寸" tabindex="-1"><a class="header-anchor" href="#屏幕尺寸" aria-hidden="true">#</a> 屏幕尺寸</h3><p>屏幕尺寸指的不是屏幕的宽高，它说的就是屏幕的尺寸。实际上，在介绍产品时常说的，手机屏幕尺寸是 <code>5.3</code> 英寸，电脑屏幕多少英寸之类的，不是指屏幕的宽高，而是指屏幕的对角线长度：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55f12ec82ee5415a9cefe762127be330~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="设备独立像素" tabindex="-1"><a class="header-anchor" href="#设备独立像素" aria-hidden="true">#</a> 设备独立像素</h3><p>设备独立像素（Density Independent Pixel），简称 <strong>DIP</strong> ，也称<strong>密度无关像素</strong> ，又有人称 <strong>CSS 像素</strong>或<strong>逻辑像素</strong> 。设备独立像素可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素。</p><p>在 CSS 规范中，长度单位可以分为绝对单位和相对单位。<code>px</code> 是一个 相对单位，相对的是设备像素。比如有些 iPhone 设备（iPhone 12系列）使用的是视网膜屏幕（Retina），用 <code>3 x 3</code> 的设备像素（Device Pixels）代表 <code>1 x 1</code> 的 CSS 像素（CSS Pixel）。拿 iPhone 12 Pro Max来说，它的设备像素是 <code>1284px x 2778px</code>，而 CSS 逻辑像素是 <code>428px x 926px</code>。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7775fe417c64bb1ac940d66ee4e111b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="设备像素比-dpr" tabindex="-1"><a class="header-anchor" href="#设备像素比-dpr" aria-hidden="true">#</a> 设备像素比（DPR）</h3><p>设备像素比一般是指 <strong>DPR</strong> 或 <strong>DPPX</strong> ：</p><ul><li>DPR 是 Device Pixel Ratio 简写，指的是每个 CSS 像素的设备像素；</li><li>DPPX 是 Dots Per Pixel 简写，指的是每个 CSS 像素的设备像素数量 。</li></ul><p>我们平时所说的设备像素比，更多指的是 DPR：</p><blockquote><p>设备像素比，级联样式表（CSS）使用的物理像素和逻辑像素之间的比率：它的其他名称是“CSS像素比”和&quot;DPPX&quot; 。</p></blockquote><p>所以，设备像素比表示 一个CSS像素（宽度）等于几个物理像素（宽度）。我们可以用下面的公式来计算设备像素比：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>DPR = 物理像素数 / 逻辑像素数 = 屏幕物理像素数 / 设备独立像素数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注，上面公式中物理像素数和逻辑像素数指的是同一方向的，比如水平方向（<code>x</code> 轴）或垂直方向（<code>y</code> 轴）。</p><p>简单地说，一个逻辑像素（<code>1pt</code>）既可以对应一个物理像素点（<code>1px</code>），也可以对应 <code>1.5px</code>、<code>2px</code> 或更多个<code>px</code>。这也是我们常说的几倍屏：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c42e60b7fd064549b8791282af4a5d4e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也就是说：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>DPR = 1,   1pt = 1px 
DPR = 1.5, 1pt = 1.5px 
DPR = 2,   1pt = 2px 
DPR = 3,   1pt = 3px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58b27fed1c7d4c48b86d8324d180f441~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>对于 Web 开发者而言，我们可以使用 <code>window.devicePixelRatio</code> 来获取设备的 <code>dpr</code>：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f105def283084840a0a961bc70a3af34~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在 CSS 中可以通过 <code>@media</code> 的 <code>min-device-pixel-ratio</code> 来区分 <code>dpr</code>：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media (min-device-pixel-ratio:2){ 
    /* CSS */ 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，上面的规则也有例外，比如 iPhone6、iPhone7 和 iPhone8 Plus 的实际物理像素是 <code>1080 x 1920</code>，在开发者工具中可以看到，它的设备独立像素是 <code>414 px 736</code>，设备像素比（<code>dpr</code>）是 <code>3</code>，设备独立像素和设备像素比的乘积并不等于 <code>1080 x 1920</code>，而是 <code>1242 x 2208</code>。</p><p>实际上，设备会自动把 <code>1242 x 2208</code> 个像素点塞进 <code>1080 x 1920</code> 个物理像素点来渲染，我们不用关心这个过程，而 <code>1242 x 2208</code> 被称为屏幕的“设计像素”（我们开发也是以这个设计像素为准）也称为渲染像素：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e962bd1ec8e34610b281b48b85fe4439~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="像素密度-ppi" tabindex="-1"><a class="header-anchor" href="#像素密度-ppi" aria-hidden="true">#</a> 像素密度（PPI）</h3><p>像素密度指的是每英寸长度上有多少个像素，又叫像素数目。像素越多，代表画面越细腻越清晰。我们常说的视网膜屏幕（Retina），就是指 PPI 较普通屏幕要高。PPI（Pixels Per Inch）是图片像素分辨率的单位，图片 PPI 值越高，画面的细节就越丰富，因为单位面积的像素数量更多。</p><p>对于一个设备来说，屏幕尺寸指的是屏幕对角线长度，屏幕的分辨率是指屏幕宽高的像素值，那么屏幕的宽高和对角线就形成了一个垂直三角形。利用勾股定理，可以算出对角线的像素值。而知道了对角线的英寸值，那么就可以算出屏幕的 PPI 值。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7a3e641a7f3448d918c19d321085205~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>比如 iPhone XS Max，根据上面公式可以算出其 <code>PPI = 458</code>：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56465a58cce547ca92caa49b9a0f9dcc~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="dpi" tabindex="-1"><a class="header-anchor" href="#dpi" aria-hidden="true">#</a> DPI</h3><p>DPI 是指 Dots Per Inch，即每英寸点数，在点阵数码影像的每一英寸长度中，取样、可显示或输出点的数目。这里说的点，类似打印机的“墨点”，打印成像是由这些墨点成线，线成面这样组合而成。</p><p>它是一个输出分辨率（打印分辨率），常用于描述打印机的打印精度，一般来说， DPI 值越高，表明打印机的打印精度越高。它表示每英寸所能打印的点数，即打印精度。</p><p>一般的激光打印机的输出分辨率是 <code>300dpi ~ 600dpi</code>，印刷的照排机达到 <code>1200dpi~2400dpi</code>，常见的冲印一般在 <code>150dpi ~ 300dpi</code> 之间。</p><p>图片的像素、打印分辨率和打印尺寸的关系如下：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>图片的横向（或竖向）像素数 = 打印横向（或竖向）分辨率 x 打印的横向（或竖向）尺寸
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：希望打印照片的尺寸是 <code>4 x 3inch</code>，而打印分辨率横向和竖向都是 <code>300dpi</code>，则需要照相机采集的像素数至少为 <code>(300 x 4) x (300 x 3)=1080000</code> 像素，约一百万像素。采集的像素数过低（采集图像机器的PPI决定）会降低图像的打印质量，过高也不能提升打印质量。</p><p>PPI 和 DPI 经常都会出现混用现象。但是他们所用的领域也存在区别。从技术角度说，“像素”只存在于电脑显示领域，而“点”只出现于打印或印刷领域。 DPR 和 PPI 相关，一般是：<code>DPR = PPI / 160</code>。</p><h2 id="响应式-web-布局的三大核心技术" tabindex="-1"><a class="header-anchor" href="#响应式-web-布局的三大核心技术" aria-hidden="true">#</a> 响应式 Web 布局的三大核心技术</h2><p>构建响应式 Web 布局有三大核心技术：<strong>流体网格（Fluid Grids）</strong> 、<strong>灵活的图片（Flexible Images）</strong> 和<strong>媒体查询（Media Queries）</strong> 。我们可以使用这三种技术来构建一个适应不同屏幕尺寸或不同移动终端设备的 Web 页面。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35f42571af484d78bcdd93a4da497a8b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="流体网格" tabindex="-1"><a class="header-anchor" href="#流体网格" aria-hidden="true">#</a> 流体网格</h3><p>响应式 Web 布局中最常见的列结构有 <code>8</code>、<code>12</code>、<code>16</code> 和 <code>20</code> 列网格。选择多少列网格，取决于你的设计需求。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f4b4b58b9bc470b84bef9425b6714b3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>其中 <code>12</code> 列的结构是最灵活的。它可以进一步分解为在 <code>4-4-4</code> 或 <code>3-3-3</code> 大小的父容器中对齐内容。</p><p>而且，网格的列结构、列宽度、列间距和边距依赖于浏览器视窗的断点。父容器根据不同的断点进行堆叠或缩放，重新调整以获得最佳视图。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dbaf2ffaccc4e429860fd2130336d17~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在原生 CSS Grid 还没得到主流浏览器支持的时候，响应式 Web 中的流体网格实质上采用的是百分比来构建的单一维度的网格。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d319ed4924f3469bb0770e4b2a0ad21e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,94),j={href:"http://www.responsivegridsystem.com/calculator/",target:"_blank",rel:"noopener noreferrer"},W=s(`<div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;section group&quot;&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
    &lt;div class=&quot;col span_1_of_12&quot;&gt;1 of 12&lt;/div&gt;
&lt;/div&gt;
/*  SECTIONS  */
.section {
    clear: both;
    padding: 0px;
    margin: 0px;
}

/*  COLUMN SETUP  */
.col {
    display: block;
    float:left;
    margin: 1% 0 1% 1.6%;
}
.col:first-child { 
    margin-left: 0; 
}

/*  GROUPING  */
.group::before,
.group::after { 
    content:&quot;&quot;; 
    display:table; 
}
.group::after { 
    clear:both;
}

/*  GRID OF TWELVE  */
.span_12_of_12 {
    width: 100%;
}

.span_11_of_12 {
    width: 91.53%;
}
.span_10_of_12 {
    width: 83.06%;
}

.span_9_of_12 {
    width: 74.6%;
}

.span_8_of_12 {
    width: 66.13%;
}

.span_7_of_12 {
     width: 57.66%;
}

.span_6_of_12 {
    width: 49.2%;
}

.span_5_of_12 {
    width: 40.73%;
}

.span_4_of_12 {
    width: 32.26%;
}

.span_3_of_12 {
    width: 23.8%;
}

.span_2_of_12 {
    width: 15.33%;
}

.span_1_of_12 {
    width: 6.866%;
}

/*  GO FULL WIDTH BELOW 480 PIXELS */
@media only screen and (max-width: 480px) {
    .col {  
        margin: 1% 0 1% 0%; 
    }
    
    .span_1_of_12, 
    .span_2_of_12, 
    .span_3_of_12, 
    .span_4_of_12, 
    .span_5_of_12, 
    .span_6_of_12, 
    .span_7_of_12, 
    .span_8_of_12, 
    .span_9_of_12, 
    .span_10_of_12, 
    .span_11_of_12, 
    .span_12_of_12 {
        width: 100%; 
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),z={href:"https://getbootstrap.com/docs/5.3/layout/grid/",target:"_blank",rel:"noopener noreferrer"},P=i("p",null,"但随着 CSS Flexbox 和 CSS Grid 布局技术出现，大部分流体网格布局都采用了 CSS Flexbox 和 CSS Grid 来完成。",-1),D={href:"https://juejin.cn/book/7161370789680250917/section/7161623855054716935",target:"_blank",rel:"noopener noreferrer"},R={href:"https://juejin.cn/book/7161370789680250917/section/7161624078397210638",target:"_blank",rel:"noopener noreferrer"},I=i("code",null,"12",-1),M=s(`<p>尤其是原生的 CSS Grid 布局技术，用来构建流体网格系统具备天然优势，而且还是一个二维的流体网格（有关于它们的详细介绍，这里就不再重复阐述了）。</p><h3 id="灵活的图片" tabindex="-1"><a class="header-anchor" href="#灵活的图片" aria-hidden="true">#</a> 灵活的图片</h3><p>图片是 Web 中不可或缺的元素之一，但在构建响应式 Web 布局时，图片一直以来都令 Web 开发者感到头疼。因为要让同一张图片适配不同终端，甚至还有不确定的终端环境。在当初，Web 开发者往往都会像下面这样暴力执行：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>img {
    display: block;
    max-width: 100%;
    height: auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这么做对于 Web 开发者来说，可以省不少的时间，但最终呈现给用户的效果还是有较大差异的。尤其是当一张小尺寸的图片在大屏幕终端上呈现时，会无法填充其容器，造成大面积的空白区域出现。这或许是你和你的设计师都不想要的结果。</p><p>庆幸的是，HTML 的 <code>&lt;img&gt;</code> 标签元素新增的 <code>srcset</code> 、<code>sizes</code> 等新属性以及新增的 <code>&lt;picuture&gt;</code> 标签元素，让 Web 开发者在构建响应式 Web 布局时，对图片的使用有了更多的选择，可以说真正解决了图片在响应式 Web 布局中的适配痛点，真正达到了“灵活的图片”一原则：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b49350eff54a19a87e43641b2849c2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p><strong>注意，有关于</strong> <strong><code>&lt;img&gt;</code></strong> <strong>的</strong> <strong><code>srcset</code></strong> <strong>和</strong> <strong><code>sizes</code></strong> <strong>特性以及</strong> <strong><code>&lt;picture&gt;</code></strong> <strong>已超出本节课的范畴，因此不在这里做过多阐述。感兴趣的同学，可以自己搜索相应关键词进行扩展阅读！</strong></p></blockquote><h3 id="媒体查询" tabindex="-1"><a class="header-anchor" href="#媒体查询" aria-hidden="true">#</a> 媒体查询</h3><p>虽然前面课程中有很多个示例，向大家展示了不依赖任何 CSS 媒体查询也能构建一个具有响应式效果的 Web 布局，比如 CSS Grid 中的 RAM 布局技术。但对于一些复杂的页面或场景，如果你要实现响应式 Web 布局，那么 <strong>CSS 的媒体查询是不可或缺的</strong>。</p><p>CSS 媒体查询也是一个复杂的体系，所涉及到的知识点较多，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e223e34ecfee4975b5b471bbd99bd940~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>只不过，构建响应式 Web 的时候，大多数是使用 CSS 媒体查询 的 <code>@media</code> 规则，根据指定的<strong>媒体类型</strong> 、<strong>媒体逻辑运算符</strong>和<strong>媒体特性</strong> 给元素指定样式规则：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/201e1f2bd8bc4dde841e80ad94035b9e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>简单地说，CSS 媒体查询根据浏览器视窗的断点来给元素设置不同的样式规则：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f7dd7dfbbd64cbd987ab2950a1e6476~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Mobile First */
.container {
    width: 100%;
    margin-inline: auto;
}

/* Tablet */
@media only screen and (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

/* Tablet Landscape */
@media only screen and (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
}


/* Laptop */
@media only screen and (min-width: 1600px) {
    .container {
        max-width: 1140px;
    }
}

/* Desktop */
@media only screen and (min-width: 1920px) {
    .container {
        max-width: 1320px;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，<strong>请不要根据设备类别来定义断点</strong> 。根据如今被广泛使用的特定设备、产品、品牌名称或操作系统来定义断点可能会导致维护的噩梦。反之，应该由内容本身来决定布局如何与容器相适配。</p><p>在选择断点时，你可以<strong>由小到大地选择断点，并在必要时选择次断点</strong> 。这样做的好处是，可以首先将内容设计为适合小屏幕的尺寸，然后逐步扩展屏幕尺寸，直到需要设置一个断点。这个做法使你能够根据内容来优化断点，同时保持尽可能小的断点。</p><p>另外，除了在布局发生显著变化时选择主断点之外，针对微小的变化进行调整时，你可以设置次断点，这样也很有帮助。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e4ebe2562d74082949f3ae0c0869d64~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当然，如果你不想追求极致的话，可以考虑几个常用的断点：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb5dcf5917144a51a1171a2275b794cd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然说分主，次断点能给响应式 Web 布局带来更极致的体验，但对于 Web 开发者而言，开发成本和维护成本也随断点数量增加而增加。而且，常用断点可以满足大部分场景。比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41dde3c6c6cc48ae984eb00016d85976~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这里，我们仅向大家展示了 CSS 媒体查询最基本的功能，使用 <code>min-width</code> 或 <code>max-width</code> 来指定不同断点的条件。假设，你需要在 <code>480px</code> 断插入一个断点，请在 CSS 的末尾为布局创建两个媒体查询，一个在浏览器视窗宽度处于 <code>480px</code> 及以下时使用，另一个在浏览器宽度大于 <code>480px</code> 时使用：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media (max-width: 480px) {
    /* 浏览器视窗宽度小于或等于 480px 时，Web 页面样式*/
}

@media (min-width: 481px) {
    /* 浏览器视窗宽度大于 480px 时， Web 页面样式*/
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，请重构 CSS。在<code>max-width</code>为<code>480px</code>的媒体查询中添加仅适用于小屏幕的 CSS。在<code>min-width</code>为<code>481px</code>的媒体查询中添加适用于更大屏幕的 CSS。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3be88067433f4cebb4c6eb88ae3af4a8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,30),L=i("code",null,"@media",-1),A=i("code",null,"min-width",-1),T=i("code",null,"max-width",-1),F={href:"https://www.w3.org/TR/mediaqueries-4/",target:"_blank",rel:"noopener noreferrer"},E=i("code",null,">",-1),G=i("code",null,">=",-1),B=i("code",null,"<",-1),H=i("code",null,"<=",-1),U=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/328be8cd992a41798e2ef6c6a3dace60~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图中使用 <code>@media</code> 语法表达的话，像下面这样：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 老语法规则 */ 
@media (max-width: 768px) { 
    /* CSS … */
} 

@media (min-width: 375px) { 
    /* CSS … */
} 

@media (min-width: 375px) and (max-width: 768px) { 
    /* CSS … */
} 

/* 新语法规则 */ 
@media (width &lt;= 768px) { 
    /* CSS … */ 
} 

@media (width &gt;= 375px) { 
    /* CSS … */ 
} 

@media (375px &lt;= width &lt;= 768px) { 
    /* CSS  … */
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),N={href:"https://www.w3.org/TR/mediaqueries-5/",target:"_blank",rel:"noopener noreferrer"},O=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d48817ebe5041c7bcd2acdec7c9cd25~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这些媒体查询特性可以用来构建响应用户需求的响应式。这已是下一代响应式 Web 中的一部分，我们稍后会介绍。</p><h2 id="响应式-web-设计的现状" tabindex="-1"><a class="header-anchor" href="#响应式-web-设计的现状" aria-hidden="true">#</a> 响应式 Web 设计的现状</h2><p>我们分别从两种不同角色（Web 设计师和 Web 开发者）的角度来看响应式 Web 设计的现状。</p><p>先从 Web 设计师的角色来聊。</p><p>时至今日，虽然已是移动终端的天下，但如果要给不同终端提供设计稿的话，Web 设计师还是会为不同的设备终端提供不同的设计稿。比如，为不同的设备视窗尺寸（如手机、平板和桌面端）提供不同的设计稿：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15ace11cf4f74efa94c19411e30043b5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们来看下简化后的不同版本的设计线框图，如下所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe097cd7d8b54a75a0484296332fb820~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在上图中，设计师为卡片（Card）组件提供了三种不同的 UI 效果。虽然卡片在不同设备视窗下有着不同的 UI 效果，但它们构成的元素是相同，都有卡片容器、卡片缩略图、卡片标题 和 卡片描述等：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60a46c56db3b4252b1566b2ad22314e0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>作为 Web 设计师，已经使用了多个版本的布局来展示同一个组件三种不同状态下的 UI 变化。可以说把足够多的信息传递给了 Web 开发者！到这一步，Web 设计师已给 Web 开发者提供了具有响应式的 Web 设计稿。</p><p>接下来，再从另一种角色（Web 开发者）来看响应式 Web 设计的现状。对于 Web 开发者而言，要实现上图中三种状态下的卡片 UI 效果非常简单。借助 CSS 媒体查询特性，在不同断点下调整 CSS 样式规则即可：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div class=&quot;card&quot;&gt;
    &lt;figure&gt;&lt;img src=&quot;&quot;/&gt;&lt;/figure&gt;
    &lt;h3&gt;Card Title&lt;/h3&gt;
    &lt;p&gt;&lt;span&gt;Card Description&lt;/span&gt;&lt;/p&gt;
&lt;/div&gt;
/* Mobile First */
.card {
    padding: 1rem;
    border-radius: 6px;
    background-color: #fff;
    color: #333;
    box-shadow: 0 0 0.25em 0.2em rgb(0 0 0 / 3%);

    display: grid;
    grid-template-columns: 0.3fr 0.7fr;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
        &quot;figure title&quot;
        &quot;figure description&quot;;
    gap: 0.5rem 1rem;
}

.card img {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
}

.card h3 {
    font-size: clamp(1.25rem, 3vw + 1.5rem, 1.75rem);
}

.card p {
    line-height: 1.6;
    color: #666;
    font-size: 1rem;
}

.card p span {
    --line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp);
    -webkit-box-orient: vertical;
}

.card figure {
    grid-area: figure;
}

.card h3 {
    grid-area: title;
}

.card p {
    grid-area: description;
}

/* Tablet */
@media only screen and (min-width: 768px) {
    .card {
        grid-template-columns: auto;
        grid-template-rows: min-content auto minmax(0, 1fr);
        gap: 0.5rem;
        grid-template-areas:
            &quot;figure&quot;
            &quot;title&quot;
            &quot;description&quot;;
    }

    .card p span {
        --line-clamp: 4;
    }
}

/* Laptop and Desktop */
@media only screen and (min-width: 1024px) {
    .card {
        grid-template-rows: minmax(0, 1fr) auto auto;
        grid-template-areas:
          &quot;....&quot;
          &quot;title&quot;
          &quot;description&quot;;
    }

    .card figure {
        grid-area: 1 / 1 / -1 / -1;
    }

    .card::after {
        content: &quot;&quot;;
        grid-area: 1 / 1/ -1 / -1;
        display: block;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          to top,
          rgb(0 0 0 / 0.85) min(10vh, 80px),
          rgb(0 0 0 / 0.0125)
        );
        z-index: 2;
    }

    .card p span {
        --line-clamp: 1;
    }

    .card h3,
    .card p {
        z-index: 3;
        color: #fff;
        padding: 0 1rem;
    }

    .card p {
        margin-bottom: 0.5rem;
        color: #999;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a456401c96db433a9ba7835d9229eeb2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),V={href:"https://codepen.io/airen/full/abjZwgw",target:"_blank",rel:"noopener noreferrer"},X=i("p",null,[e("这种方式只能适合于"),i("strong",null,"同一组件独立存在于不同断点下"),e(" 。如果同一组件的两种（或多种）效果存在于同一断点下时，上面的示例代码就无法达成所需效果了。")],-1),Z=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fd9825738294dffb3b48b21083dba6d~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),K={href:"https://codepen.io/airen/full/bGjerYd",target:"_blank",rel:"noopener noreferrer"},J=s(`<p>正如你所看到的，移动端（Mobile）和平板端（Tablet）都能符合设计稿所示的效果，但在桌面端（Desktop）有两种 UI 的卡片存在。上面的示例代码就无法达到设计稿的效果。此时，为了满足该设计效果，我们需要额外添加一些类名，在同一断点下为不同 UI 的卡片组件设置样式：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8aa36cda7c934a598e7ef493c5f9f470~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Mobile */
.container {
    width: 100%;
    margin-inline: auto;
    display: grid;
    gap: 1rem;
}

.card {
    padding: 1rem;
    border-radius: 6px;
    background-color: #fff;
    color: #333;
    box-shadow: 0 0 0.25em 0.2em rgb(0 0 0 / 3%);

    display: grid;
    grid-template-columns: 0.3fr 0.7fr;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
        &quot;figure title&quot;
        &quot;figure description&quot;;
    gap: 0.5rem 1rem;
}

.card img {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
}

.card h3 {
      font-size: clamp(1.25rem, 3vw + 1.5rem, 1.75rem);
}

.card p {
    line-height: 1.6;
    color: #666;
    font-size: 1rem;
}

.card p span {
    --line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp);
    -webkit-box-orient: vertical;
}

.card figure {
    grid-area: figure;
}

.card h3 {
    grid-area: title;
}

.card p {
    grid-area: description;
}

/* Tablet */
@media only screen and (min-width: 768px) {
    .container {
        max-width: 720px;
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100% - 2rem, 280px), 1fr)
        );
        gap: 1rem;
    }
    
    .card {
        grid-template-columns: auto;
        grid-template-rows: min-content auto minmax(0, 1fr);
        gap: 0.5rem;
        grid-template-areas:
            &quot;figure&quot;
            &quot;title&quot;
            &quot;description&quot;;
    }

    .card p span {
        --line-clamp: 4;
    }
}

/* Desktop */
@media only screen and (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
    
    .card--feature {
        grid-template-rows: minmax(0, 1fr) auto auto;
        grid-template-areas:
            &quot;....&quot;
            &quot;title&quot;
            &quot;description&quot;;
    }

    .card--feature figure {
        grid-area: 1 / 1 / -1 / -1;
    }

    .card--feature::after {
        content: &quot;&quot;;
        grid-area: 1 / 1/ -1 / -1;
        display: block;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          to top,
          rgb(0 0 0 / 0.85) min(10vh, 80px),
          rgb(0 0 0 / 0.0125)
        );
        z-index: 2;
    }

    .card--feature p span {
        --line-clamp: 1;
    }

    .card--feature h3,
    .card--feature p {
        z-index: 3;
        color: #fff;
        padding: 0 1rem;
    }

    .card--feature p {
        margin-bottom: 0.5rem;
        color: #999;
    }

    .container--cards {
        gap: 2rem;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34cb5e3b6f4e4c168eb428bb482e6a29~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),Q={href:"https://codepen.io/airen/full/rNrLqKo",target:"_blank",rel:"noopener noreferrer"},Y=s(`<p>看上去是不错，但问题是，只有当视窗宽度大于一个特定的值时（常指的分辨率断点值），相应的组件变体才会生效，比如当视窗宽度大于 <code>1024px</code> 时，<code>.card--feature</code> 卡片 UI 效果才生效。换句话说，如果在平板端无法看到 <code>.card--feature</code> 卡片效果，那是因为它要媒体查询在 <code>1024px</code> 或更大的视窗宽度下才会生效。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ecd843229484469ad0dc6fee320d858~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>不仅如此，Web 的内容是动态的，有的时候输出的内容可能和设计预定的卡片数量不相符，在这种情况之下，要么会有一个空的空间，要么卡片会扩展以填补容器的剩余（或可用）空间。</p><p>比如我们这个示例中，在视窗宽度为 <code>768px</code> 或更大的视窗宽度中，<code>.card--feature</code> 都有可能出现这样的场景。如果你的卡片容器 <code>.container</code> 不是使用 CSS Grid 的 RAM 布局，而是采用的 CSS Flexbox 布局，那卡片 <code>.card</code> 还可能出现跨越多列的现象：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baad18730c9e4ca2a48724ee037bc570~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图只是 Web 开发者基于 CSS 媒体查询实现的响应式卡片布局效果。但这可能并不是设计师真正的意图，设计师的意图可能是像下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc825efa4b8642a5817395fb9b63714c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在这种场景之下，使用 CSS 媒体查询特性实现起来会比较棘手，但使用 CSS 容器查询特性就会容易得多，我们可以通过查询卡片父容器来决定如何显示卡片去解决这些问题（稍后会介绍）。</p><p>从这个示例的效果呈现来看，目前的响应式 Web 设计，主要方案还是利用 CSS 媒体查询特性在不同的终端上提供布局的切换。虽然它能满足 Web 页面布局大部分场景，但也相对丧失了一些其他能力，比如说将响应式的样式注入到组件本身的能力。换句话说，<strong>基于视窗宽度查询构建的响应式 Web 页面，尤其是响应式组件，其能力是有限的</strong> 。</p><p>如果用一句话来概述： <strong>虽然 Web 开发者可以使用全局的视窗信息来设置组件的样式，但组件仍然不能拥有自已的样式，而且当我们的设计系统基于组件而不是基于页面时，那么媒体查询就无能为力</strong> ！</p><p>庆幸的是，生态系统正在改变，这两年尤其突出。比如说，我们一直期望的容器查询特性就如约而至。如果我们将组件自身的响应式样式思路从查询视窗转换到查询其祖先容器，是不是前面的问题就可以轻易解决。除此之外，早期的 CSS 媒体查询只能查询视窗宽度和媒体特性，但不能查询用户对设备喜好的设置。前面也提到过，这两年 CSS 媒体查询特性也有巨大的变化，我们除了查询媒介（设备）特性之外，也可以查询用户偏好设置。</p><p>正如 @Una Kravets 所言： <strong>Web 生态再一次让 CSS 腾飞，这些新的特性将会让响应式 Web 设计注入新的能力。我们也将进入响应式设计的新时代，并转变我们对其含义的看法</strong> 。</p><h2 id="下一代响应式-web-设计-组件驱动式-web-设计" tabindex="-1"><a class="header-anchor" href="#下一代响应式-web-设计-组件驱动式-web-设计" aria-hidden="true">#</a> 下一代响应式 Web 设计：组件驱动式 Web 设计</h2><p>我们今天使用的响应式 Web 设计方法很快就会被认为是过时的，就像我们从 90 年代最初的基于表格的 HTML 开发过渡到现在的感觉一样。</p><p>Web 设计师现在要克服的挑战是，目前的响应式 Web 设计方法本质上是一种一刀切的方法，把整个页面和用户体验当作一个整体，没有任何个性化。</p><p>基于视窗的媒体查询给我们提供了许多媒体查询的能力，但缺少为我们的 Web 设计提供精细度的能力，并创造一个对能根据用户的环境和他们在页面上采取行动的独特体验。我们也缺乏将响应式样式注入组件本身的能力。</p><blockquote><p>这里所说的组件是 Web 上的元素，可以由其他设计元素的集合或分组组成。如果我们把组件看成是由积木组成的，并把这个概念应用到像幻灯片、卡片或内容块这样的常见 UI 元素的构造中，就会更容易理解，在不久的某一天，我们可能会把响应式设计样式注入单个组件或积木中，以定制和调整用户的体验，而不是把一套固定的样式和规则应用于整个页面的布局。</p></blockquote><p>我们可以使用全局视窗信息来控制元素的字体大小和最大宽度等样式，或者调整这些组件的背景图像和布局，但它们仍然无法控制拥有自己的样式。<strong>当我们的响应式设计系统是基于组件的，而不是基于页面的时候，这种限制就更难了</strong>。</p><p>好消息是，全世界的 Web 设计师和开发人员正在努力改变响应式 Web 设计的生态系统，尽管为了改变我们对响应式设计的思考方式以及组件如何适应其周围环境，需要转变基本的设计思维。</p><p>现在为创新之火推波助澜的是 CSS 和灵活布局的快速发展，比如添加了一些新的查询规则、Flexbox 和 Grid 布局。这里所取得的进步正在迅速迎来一个新的响应式 Web 设计的时代，而这个时代就在地平线之外。</p><blockquote><p><strong>CSS 生态快速的发展，即将彻底改变响应式 Web 设计的概念</strong> ！</p></blockquote><p>现在，在我们被引入响应式 Web 设计这个激进的新概念的十多年后，我们又一次见证了响应式设计生态系统的演变，即 CSS 新增的特性将直接基于组件而不是基于页面注入样式响应能力。这种能力被称为 <strong>组件驱动 Web 设计（Component-Driven Web Design）</strong> ，基于组件驱动的开发将会成为一种真正流行的开发模式。</p><p>换句话说，针对下一代响应式 Web 布局，它应该具备：</p><ul><li>响应用户的需求；</li><li>响应外形的需求；</li><li>响应容器的需求。</li></ul><blockquote><p>注意，在这节课程中，我们只会和大家一起探讨 响应用户和外形需求的两个方面，响应容器的需求将放到下一节课中！</p></blockquote><h3 id="响应用户的需求" tabindex="-1"><a class="header-anchor" href="#响应用户的需求" aria-hidden="true">#</a> 响应用户的需求</h3><p>你可能对基于视窗可视区域大小的媒体查询比较熟悉，比如通过 <code>min-width</code>、<code>max-width</code>、<code>min-height</code>、<code>max-height</code>、<code>orientation</code> 和 <code>aspect-ratio</code> ：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> @media (max-width: 45rem) { 
     /* 浏览器视窗宽度小于 45rem */ 
 } 
 
 @media (min-width: 45rem) { 
     /* 浏览器视窗宽度大于 45rem */ 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),$=i("code",null,"@media",-1),ee=i("code",null,"@media",-1),ie=i("code",null,"24",-1),ne=i("code",null,"19",-1),de={href:"https://www.w3.org/TR/mediaqueries-5/#mf-user-preferences",target:"_blank",rel:"noopener noreferrer"},se=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c7a59b3a3ec424eba512f3359b634e9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也意味着这些新增的媒体查询特性允许你根据用户的偏好来调整用户的体验。</p><p>现在很多设备提供了一些用户偏好的设置。比如在 Mac 电脑上，用户可以根据自己喜好做一些设置：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/072b37a9f8b74df88a518498935150b8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>CSS 媒体查询提供了一些用户喜好的查询特性，这些特性可以识别出用户在系统上的偏好设置，帮助 Web 开发者构建更加健壮和个性化的 Web 体验，特别是对于那些具有可访问性需求的用户。</p><h4 id="prefers-reduced-motion" tabindex="-1"><a class="header-anchor" href="#prefers-reduced-motion" aria-hidden="true">#</a> prefers-reduced-motion</h4><p>Web 页面或应用少不了用一些动效来点缀，但有些用户不喜欢这些动画效果，甚至对于少数用户来说，这些动效会让他们身体不适。这就是为什么现在大多数设备都支持用户根据自己的喜好来做设置。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c735fd4782a94f24a19a4bd77e5e7241~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>prefers-reduced-motion</code> 媒体查询用于检测用户的系统是否被开启了动画减弱功能。比如下面的这个示例，将会展示一组令人心烦的动画，不过当你开启了系统的“减少运动”后，就能看到动画减弱的效果了。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.pulse { 
    animation: pulse 2s infinite; 
} 

@media screen and (prefers-reduced-motion: reduce) { 
    .pulse { 
        animation: none; 
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cea8cad3360445bd95a54af7e2d011ca~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>示例效果演示的是 <code>prefers-reduced-motion</code> 媒体特性如何让 <code>animation</code> 停止，其实 CSS 的 <code>transition</code> 也可以实现动画效果，加上并不是所有设备对动效都有很好的性能支持（毕竟动效是较耗性能的），因此，我们可以像下面这样来写 CSS：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media screen and (prefers-reduced-motion: reduce), (update: slow) { 
    * { 
        animation-duration: 0.001ms !important; 
        animation-iteration-count: 1 !important; 
        transition-duration: 0.001ms !important; 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码强制所有使用动画持续时间或过渡持续时间声明的动画以人眼无法察觉的速度结束。当用户要求减少动画体验，或者设备屏幕刷新率较低时，比如廉价智能手机，它就能工作。</p>`,14),le={href:"https://css-tricks.com/revisiting-prefers-reduced-motion/",target:"_blank",rel:"noopener noreferrer"},ae=s(`<blockquote><p>“并不是每一个可以访问网络的设备都可以呈现动画，或者流畅地呈现动画。”</p></blockquote><p>对于刷新率低的设备来说，可能会导致动画出现问题，比如动画卡顿。这样的话，删除动画可能是更好的选择。我们可以将 <code>prefers-reduced-motion</code> 和 <code>update</code> 结合在一起使用：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media screen and (prefers-reduced-motion: reduce), (update: slow) { 
    * { 
        animation-duration: 0.001ms !important; 
        animation-iteration-count: 1 !important; 
        transition-duration: 0.001ms !important; 
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码强制所有使用 <code>animation-duration</code> 或 <code>transition-duration</code> 声明的动画以人眼难以察觉的速度结束。当一个人要求减少动效体验，或者设备有一个刷新率较低的屏幕，比如电子墨水或廉价的智能手机，它就能发挥作用。</p><p>但需要注意的是，使用动态减弱并不意味着“没有动效”，因为动效在 Web 页面中传达信息能起到至关重要的作用。相反，你应该使用一个坚实的、去除非必须的动效基础体验去引导这些用户，同时逐步增强没有此项偏好设置的其他用户的体验。</p><h4 id="prefers-color-scheme" tabindex="-1"><a class="header-anchor" href="#prefers-color-scheme" aria-hidden="true">#</a> prefers-color-scheme</h4><p>你可能知道了，macOS 系统和 iOS13 之后，苹果设备具备 <strong>Dark Mode 效果</strong> ，就是用户可以根据自己的喜好来选择系统提供的色系：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35ee4ccb1342443eafb267f14eb75aad~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用 <code>prefers-color-scheme</code> 查询特性可以让你对用户是否打开了设备上 Dark Mode 来做出响应。</p><p>换句话说，给 Web 页面或应用添加 Dark Mode 只需要几行代码即可。首先我们默认加载的主题是亮色系，我们可以在 <code>:root</code> 中声明亮色系所需要的颜色，比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root { 
    --text-color: #444; 
    --background-color: #f4f4f4; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过媒体查询 <code>prefers-color-scheme: dark</code> 为暗色系重置所需要的颜色：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media screen and (prefers-color-scheme: dark) { 
    :root { 
        --text-color: rgba(255,255,255,.8); 
        --background-color: #121212; 
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c780f0cdb8cf4c48bed02098e87fe8d9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们来看一个具体的案例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root {
    --color: #333;
    --primary-color: #ffffff;         /* 主色 */
    --body-bg-color: #f1f1f1;         /* body背景颜色 */
    --card-box-shadow-color: #405070; /* card盒子阴影颜色 */
    --btn-bg-color: #28c3f5;          /* button背景颜色 */
    --paragraph-color: gray;         /* 段落文本颜色 */
    --card-object-bg-color: #eaeff8; /* card顶部背景颜色 */
    --title-color: #101c34;          /* 标题2文本颜色 */
    --avatar-bg-color: #fff;
    --light: #fff;
    --saturation: 0;
    --invert: none;
}

@media (prefers-color-scheme: dark) {
    :root {
        --color-mode: &quot;dark&quot;;
    }

    :root:not([data-user-color-scheme]) {
        --color: #fff;
        --primary-color: #1a1515;         /* 主色 */
        --body-bg-color: #1a1818;         /* body背景颜色 */
        --card-box-shadow-color: #6a716e; /* card盒子阴影颜色 */
        --btn-bg-color: #ff5722;          /* button背景颜色 */
        --paragraph-color: #c7c1c1;       /* 段落文本颜色 */
        --card-object-bg-color: #282035;  /* card顶部背景颜色 */
        --title-color: #ffffff;           /* 标题2文本颜色 */
        --avatar-bg-color: #673ab7;
        --saturation: 1;
        --invert: 0.8;
    }
}

[data-user-color-scheme=&quot;dark&quot;] {
    --color: #fff;
    --primary-color: #1a1515; /* 主色 */
    --body-bg-color: #1a1818; /* body背景颜色 */
    --card-box-shadow-color: #6a716e; /* card盒子阴影颜色 */
    --btn-bg-color: #ff5722; /* button背景颜色 */
    --paragraph-color: #c7c1c1; /* 段落文本颜色 */
    --card-object-bg-color: #282035; /* card顶部背景颜色 */
    --title-color: #ffffff; /* 标题2文本颜色 */
    --avatar-bg-color: #673ab7;
    --saturation: 1;
    --highlight: #00fdcf;
    --invert: 0.8;
}

body {
    background-color: var(--body-bg-color);
    color: var(--color);
}

.card {
    background: var(--primary-color);
    box-shadow: 0px 1px 10px 1px var(--card-box-shadow-color);
}

.card__object {
    background-color: var(--card-object-bg-color);
}

.card__avatar {
    background-color: var(--avatar-bg-color);
}

.card__body h4 {
    color: var(--title-color);
}

.card__body p {
    color: var(--paragraph-color);
}

.card__body .btn {
    background: var(--btn-bg-color);
  color: var(--primary-color);
}

.card__body .btn:hover {
    color: var(--btn-bg-color);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9a7d55f9f444060999740a569c72cd1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,17),re={href:"https://codepen.io/airen/full/rNrLoGw",target:"_blank",rel:"noopener noreferrer"},ce=s(`<p>使用 <code>prefers-color-scheme</code> 来定制不同外观主题时，还可以和 <code>theme-color</code> 以及 <code>color-scheme</code> 结合起来使用。这将能控制系统应用的（比如浏览器）主题颜色：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/188e9fcbb7de4da788e8a7f906974bf3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>而 <code>color-scheme</code> 这个 CSS 属性和 <code>&lt;meta&gt;</code> 的 <code>name</code> 为 <code>theme-color</code> 是相同的。它们都是让开发者更容易根据用户的喜好设置来控制 Web 应用或页面的主题，即<strong>允许开发者根据用户喜好设置添加特定的主题样式</strong> 。</p><p>其实 <code>color-scheme</code> 属性和相应的 <code>&lt;meta&gt;</code> 标签与 <code>prefers-color-scheme</code> 相互作用，它们在一起可以发挥更好的作用。最重要的一点是，<strong><code>color-scheme</code></strong> <strong>完全决定了默认的外观，而</strong> <strong><code>prefers-color-scheme</code></strong> <strong>则决定了<strong><strong>可</strong></strong>样式化的外观</strong> 。</p><p>假设你有下面这样的一个简单页面：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;head&gt; 
    &lt;meta name=&quot;color-scheme&quot; content=&quot;dark light&quot;&gt; 
    &lt;style&gt; 
        fieldset { 
            background-color: gainsboro; 
        } 
        
        @media (prefers-color-scheme: dark) { 
            fieldset { 
                background-color: darkslategray; 
            } 
        } 
     &lt;/style&gt; 
&lt;/head&gt; 
&lt;body&gt; 
    &lt;p&gt; Lorem ipsum dolor sit amet, legere ancillae ne vis. &lt;/p&gt; 
    &lt;form&gt; 
        &lt;fieldset&gt; 
            &lt;legend&gt;Lorem ipsum&lt;/legend&gt; 
            &lt;button type=&quot;button&quot;&gt;Lorem ipsum&lt;/button&gt; 
        &lt;/fieldset&gt; 
    &lt;/form&gt; 
&lt;/body&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>页面上 <code>&lt;style&gt;</code> 中的 CSS 代码，把 <code>&lt;fieldset&gt;</code> 元素的背景颜色设置为 <code>gainsboro</code>，如果用户更喜欢暗色模式，则根据 <code>prefers-color-scheme</code> 媒体查询，将 <code>&lt;fieldset&gt;</code> 的背景颜色设置为 <code>darkslategray</code>。</p><p>通过 <code>&lt;meta name=&quot;color-scheme&quot; content=&quot;dark light&quot;&gt;</code> 元数据的设置，页面告诉浏览器，它支持深色（<code>dark</code>）和亮色（<code>light</code>）主题，并且优先选择深色主题。</p><p>根据操作系统的设置，它是深色还是亮色模式。整个页面在深色上显示为浅色，反之亦然，基于用户代理样式表。开发者没有额外提供 CSS 来改变段落文本或页面的背景颜色。</p><p>请注意，<code>&lt;fieldset&gt;</code> 元素的背景颜色是如何根据是否启用了深色模式而改变的，它遵循了开发者在页面上提供的内联样式表的规则。它要么是 <code>gainsboro</code>，要么是 <code>darkslategray</code>。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08ca64f90b024dcba468ac537f694c7e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图是亮色模式（<code>light</code>）下，由开发者和用户代理指定的样式。根据用户代理的样式表，文本是黑色的，背景是白色的。<code>&lt;fieldset&gt;</code> 元素的背景颜色是 <code>gainsboro</code>，由开发者在内联的式表中指定颜色。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83a5e465f672432595672b43ce44eb32~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图是暗色模式（<code>dark</code>）下，由开发者和用户代理指定的样式。根据用户代理的样式表，文本是白色的，背景是黑色的。<code>&lt;fieldset&gt;</code> 元素的背景色是 <code>darkslategray</code>，由开发者在内联样式表中指定颜色。</p><p>按钮 <code>&lt;button&gt;</code> 元素的外观是由用户代理样式表控制的。它的颜色被设置为 <code>ButtonText</code> 系统颜色，其背景颜色和边框颜色被设置为 <code>ButtonFace</code> 系统颜色。</p><p>现在注意 <code>&lt;button&gt;</code> 元素的边框颜色是如何变化的。</p><p><code>border-top-color</code> 和 <code>border-bottom-color</code> 的计算值从 <code>rgba(0,0,0,.847)</code>（偏黑）切换到 <code>rgba(255, 255, 255, .847)</code>（偏白），因为用户代理根据颜色方案动态地更新 <code>ButtonFace</code>，同样适用于 <code>&lt;button&gt;</code> 元素的 <code>color</code> 属性，它被设置为相应的系统颜色<code>ButtonText</code> 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1764f3bc0231453bbc6b383651d023ab~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,18),oe={href:"https://drafts.csswg.org/css-color/#css-system-colors",target:"_blank",rel:"noopener noreferrer"},te=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d85882dc94542ccaa4831b4f7fa4171~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),ve=i("p",null,[e("再回过头来看 "),i("code",null,"theme-color"),e(" 的一个示例。它能和一些组件一起实现一些不一样的交互效果。比如和进度条组件（Progress Bar）结合起来，可以实现，在完成不同的步数就改变 "),i("code",null,"theme-color"),e(" 的值：")],-1),me=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16a77c602e64810ba3a57f70705f8bc~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),ue={href:"https://codepen.io/airen/full/poZbqKR",target:"_blank",rel:"noopener noreferrer"},be=s(`<p>点击示例中的 “next” 和 “pre” 按钮，就能看到标签栏颜色随之改变：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9050b0f2eb294ae3b95f9140879f1876~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h4 id="prefers-reduced-data" tabindex="-1"><a class="header-anchor" href="#prefers-reduced-data" aria-hidden="true">#</a> prefers-reduced-data</h4><blockquote><p>不是每个人都能幸运地拥有快速、可靠或无限的数据（流量）套餐。</p></blockquote><p>你可能有过出差旅行的经历，也可能碰到了手机数据不够用的情况，那么访问一个重图片的网站是很糟糕的（虽然说现在流量对于大家来说不是很大的事情，花钱总是能摆平的）。不过，一旦 <code>prefers-reduced-data</code> 得到支持，那么这个头痛的事情就可以避免了，也可以帮用户省下一定的费用。因为，该特性可以让用户跳过大图或高分辨率的图像。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> .image { 
     background-image: url(&quot;images/heavy.jpg&quot;); 
 } 
 
 @media (prefers-reduced-data: reduce) { 
     .image { 
         background-image: url(&quot;images/light.avif&quot;); 
     } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当用户在设备上开启了 “Low Data Mode”（低数据模式），会加载占流量更低的 <code>light.avif</code> 图像，可以帮助iPhone 上的应用程序减少网络数据的使用：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/306c6d4c878b4c5580823b7c8c199c95~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>插个题外话，上面提到的这三个媒体查询特性主要是运用于 CSS 中，但它们还可以和 HTML 的 <code>&lt;picture&gt;</code> 元素的 <code>&lt;source&gt;</code> 标签元素结合起来使用。可以根据用户对设备的偏好设置来选择不同的图片源：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- 根据 prefers-color-scheme 为不同模式选择不同图片 --&gt; 
&lt;picture&gt; 
    &lt;source srcset=&quot;dark.png&quot; media=&quot;(prefers-color-scheme: dark)&quot; /&gt; 
    &lt;source srcset=&quot;light.png&quot; media=&quot;(prefers-color-scheme: light)&quot; /&gt; 
    &lt;img src=&quot;light.png&quot; alt=&quot;&quot; /&gt; 
&lt;/picture&gt; 

&lt;!-- 根据 prefers-reduced-motion 为用户呈现动图或静态图 --&gt; 
&lt;picture&gt; 
    &lt;source srcset=&quot;animation.jpg&quot; media=&quot;(prefers-reduced-motion: reduce)&quot; /&gt; 
    &lt;img srcset=&quot;animation.gif&quot; alt=&quot;&quot; /&gt; 
&lt;/picture&gt; 

&lt;!-- 根据 prefers-reduced-data 为用户选择不同的图片 --&gt; 
&lt;picture&gt; 
    &lt;source srcset=&quot;light.jpg&quot; media=&quot;(prefers-reduced-data: reduce)&quot; /&gt; 
    &lt;img src=&quot;heavy.jpg&quot; alt=&quot;&quot; srcset=&quot;heavy@2x.jpg 2x&quot; /&gt; 
&lt;/picture&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="prefers-contrast-prefers-contrast" tabindex="-1"><a class="header-anchor" href="#prefers-contrast-prefers-contrast" aria-hidden="true">#</a> prefers-contrast prefers-contrast</h4><p>媒体查询主要用于检测用户是否要求系统增加或减少相邻颜色之间的对比度。比如一些喜欢阅读电子书的用户，在阅读与文本背景对比度相差不大的文本时会遇到困难，他们更喜欢较大的对比度，利于阅读。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5158c663a7604d91bcea051989be662b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>比如像下面这个示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.contrast { 
    background-color: #0958d8; 
    color: #fff; 
} 

@media (prefers-contrast: high) { 
    .contrast { 
        background-color: #0a0db7; 
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他与用户偏好有关的媒体特性" tabindex="-1"><a class="header-anchor" href="#其他与用户偏好有关的媒体特性" aria-hidden="true">#</a> 其他与用户偏好有关的媒体特性</h4><p>从 W3C 规范中不难发现，规范中提供了六个有关于用户偏好的媒体查询特性，除了前面介绍的三个之外，还有：</p><ul><li><strong><code>prefers-reduced-transparency</code></strong> ：用户是否倾向于选择更低的透明度；</li><li><strong><code>forced-colors</code></strong> ：检测是用户代理否限制调色板；</li><li><strong><code>light-level</code></strong> 环境光亮度。</li></ul><p>我们来看一个 <code>forced-colors</code> 的示例：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root {
    --color-background: #FFFFFF;
    --color-blue-100: #D6E4FF;
    --color-blue-200: #ADC8FF;
    --color-blue-300: #84A9FF;
    --color-blue-400: #6690FF;
    --color-blue-500: #3366FF;
    --color-blue-600: #254EDB;
    --color-blue-700: #1939B7;
    --color-blue-800: #102693;
    --color-blue-900: #091A7A;
    --color-gray-100: #ECECED;
    --color-gray-200: #E0E0E0;
    --color-gray-300: #D3D3D4;
    --color-gray-400: #CECECE;
    --color-gray-500: #C3C3C3;
    --color-gray-600: #7E7E7E;
    --color-gray-700: #5B5B5C;
    --color-gray-800: #434344;
    --color-gray-900: #353535;
    
    --border-width-100: 1px;
    --border-width-200: 2px;
    --border-width-300: 3px;
    --border-width-400: 4px;
    --border-width-500: 5px;
    --border-width-600: 6px;
    
    --line-height-100: 1;
    --line-height-200: 1.2;
    --line-height-300: 1.3;
    --line-height-400: 1.4;
    --line-height-500: 1.5;
    --transition-fastest: 150ms;
    --transition-fast: 250ms;
    
    --font-size-100: 1rem;
    --font-size-200: 1.5rem;
    --font-size-300: 2.25rem;
    --font-size-400: 3.375rem;
    --font-size-500: 5.063rem;
    
    --size-100: 1rem;
    --size-200: 1.5rem;
    --size-300: 2.25rem;
    --size-400: 3.375rem;
    --size-500: 5.063rem;
}

.c-dialog {
    --dialog-border-width: var(--border-width-100);
    --dialog-border-color: var(--color-gray-300);
    --dialog-color-backdrop: #2b2e38e6;
    --dialog-color-background: var(--color-gray-900);
    --dialog-color-body: var(--color-gray-100);
    --dialog-color-icon-close: var(--color-blue-100);
    --dialog-color-title: var(--color-blue-100);
    --dialog-padding-outer: var(--size-300);
    --dialog-size-icon-close: var(--size-200);
}

.c-dialog__content {
    background-color: var(--dialog-color-background);
    box-shadow: 0 1rem 2rem 0 #00000099;
    outline: var(--dialog-border-width) solid var(--dialog-border-color);
    padding: var(--dialog-padding-outer);
    width: min(90vw, 38rem);
    z-index: 1;
}

@media (forced-colors: active) {
    .c-dialog__content {
        --dialog-border-width: var(--size-300);
    }
}

.c-dialog__title {
    color: var(--dialog-color-title);
    margin-right: var(--size-100);
}

.c-dialog__close-button:focus {
    --dialog-focus-ring-inner: var(--dialog-color-background);
    --dialog-focus-ring-outer: var(--dialog-color-icon-close);
    box-shadow: 0 0 0 var(--border-width-200) var(--dialog-focus-ring-inner), 0 0 0 var(--border-width-600) var(--dialog-focus-ring-outer);
    outline: var(--border-width-300) solid transparent;
}

.c-dialog__close-icon {
    fill: var(--dialog-color-icon-close);
    forced-color-adjust: auto;
    height: var(--dialog-size-icon-close);
    width: var(--dialog-size-icon-close);
    transition: fill var(--transition-fastest) ease-in-out;
}
.c-dialog__close-icon:hover {
    --dialog-color-icon-close: var(--color-blue-400);
    fill: var(--dialog-color-icon-close);
}
.c-dialog__close-icon:active {
    --dialog-color-icon-close: var(--color-blue-800);
    fill: var(--dialog-color-icon-close);
    transition: none;
}

.c-dialog__body {
    color: var(--dialog-color-body);
    font-size: var(--font-size-200);
    line-height: var(--line-height-200);
}

body {
    background-color: var(--color-background);
    color: var(--color-gray-800);
}

main p {
    line-height: var(--line-height-400);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37510eafa002425eac4de0117d03e0bf~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,21),pe={href:"https://codepen.io/airen/full/BaPzvbo",target:"_blank",rel:"noopener noreferrer"},ge=s('<p>在 <code>forced-colors</code> 媒体查询特性中，重新定义了 <code>--dialog-border-width</code> 的值。这是一个非常有意思的调整。它把细的焦点框（<code>outline</code>）变成了一个粗的。这样调整有助于显示模态框的外部边界，并传达它是漂浮在页面其他内容之上的信息。强制色彩模式删除了模态框的盒子阴影（<code>box-shadow</code>），所以我们不能在这种专门的浏览模式下依赖这种视觉效果。</p><h3 id="响应外形的需求" tabindex="-1"><a class="header-anchor" href="#响应外形的需求" aria-hidden="true">#</a> 响应外形的需求</h3><p>新一代响应式 Web 设计除了响应用户需求，还有响应外形的需求。</p><p>什么是外形响应需求呢？</p><p>折叠设备在市场上已经存在多年，你可能已经接触过像下图这样的一些设备：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab483b6c1c7c48b1af4bc260b03dcb2a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>大致主要分为两种类型，双屏可折叠设备（如 Microsoft Surface Duo）和单屏可折叠设备（如 Huawei Mate XS）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c10f2a9c51ef411b80343121f44e4fd1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在多屏幕或可折叠设备上，Web 应用或 Web 页面在这些设备上的打开姿势也将会有所不同，应用可以单屏显示，也可以跨屏显示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3704992cab1c47238b0318b9e299cd9e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>换句话说，我们的应用或页面要具备这种跨越屏幕的能力，也要具备响应这种跨越的能力，以及还可能需要具备逻辑分隔内容的能力等。</p><p>可以说，多屏幕或折叠屏设备开启了更广阔的屏幕空间，以及用独特的姿势将用户带入到另一个世界。针对于这种设备，除了用户之外，UI 设计师、用户体验师和 Web 开发人员都需要重新面临解锁前所未有的 Web 体验。这也将是近十年来 Web 开发带来最大的变化之一，以及开发人员所要面临的最大挑战之一。</p><p>在这里我们针对多屏幕和折叠屏设备的响应，就称之为响应外形的需求。这也是响应式 Web 设计的一部分。</p><p>由于可折叠设备相对来说是新型设备，面对这些新型设备时，很多开发者并没有做好相应的知识储备，甚至不知道从何入手。</p>',14),fe={href:"https://developer.samsung.com/internet",target:"_blank",rel:"noopener noreferrer"},he={href:"https://twitter.com/diekus",target:"_blank",rel:"noopener noreferrer"},Se={href:"https://intel.com/",target:"_blank",rel:"noopener noreferrer"},_e={href:"https://github.com/kenchris",target:"_blank",rel:"noopener noreferrer"},ke={href:"https://blogs.windows.com/msedgedev/",target:"_blank",rel:"noopener noreferrer"},xe={href:"https://github.com/boggydigital",target:"_blank",rel:"noopener noreferrer"},we={href:"https://github.com/dlibby-",target:"_blank",rel:"noopener noreferrer"},Ce={href:"https://github.com/Zouhir",target:"_blank",rel:"noopener noreferrer"},qe={href:"https://w3c.github.io/screen-fold/",target:"_blank",rel:"noopener noreferrer"},ye={href:"https://github.com/argyleink",target:"_blank",rel:"noopener noreferrer"},je=i("code",null,"@media",-1),We=i("code",null,"screen-spanning",-1),ze=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/758143c70a4d4f8ea2d7c942e7f1f0e4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也可以使用 <code>screen-fold-posture</code> 和 <code>screen-fold-angle</code> 两个媒体查询来对无缝设备进行查询：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6a4d38f61104a6595205f1253012f01~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>还可以使用 <code>horizontal-viewport-segments</code> 和 <code>vertical-viewport-segments</code> 查询视口的数量：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2bc43c9a48a4545bc25e1cb301ae8f9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><code>horizontal-viewport-segments</code> 和 <code>vertical-viewport-segments</code> 是最新的两个查询特性，它们将替代最初的 <code>screen-spanning</code> 这个媒体查询特性！</p><p>除此之外，还可以通过一些折叠姿势来进行查询：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6e912108d134f53ae86446c38a25e81~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>除了 CSS 媒体查询之外，还引入了六个新的 CSS 环境变量，以帮助开发者计算显示区域的几何形状，计算铰链区域被物理特征遮挡的几何形状：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16bbfc0c50284fc4909fdb04742caf8d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图中展示的这六个 CSS 环境变量将替代以前的 <code>env(fold-top)</code>、<code>env(fold-left)</code>、<code>env(fold-width)</code> 和 <code>env(fold-height)</code>。</p><p>对于 Web 开发者来说，我们可以像下面这样来使用：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* 有缝折叠 */  
@media (spanning: single-fold-vertical) { 
    /* CSS Code... */  
} 

/* 无缝折叠 */  
@media (screen-fold-posture: laptop){ 
    /* CSS Code... */ 
} 

/* 折叠角度查询 */  
@media (max-screen-fold-angle: 120deg) { 
    /* CSS Code... */  
} 

/* 视口数量查询 */  
@media (horizontal-viewport-segments: 2) { 
    /* CSS Code... */  
} 

@media (vertical-viewport-segments: 2) { 
    /* CSS Code... */  
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在现代布局中，将这些媒体查询特性、CSS 环境变量和 CSS Grid 布局结合在一起，就可以很轻易地满足外形响应的需求变化。比如：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>:root { 
    --sidebar-width: 5rem; 
} 

@media (spanning: single-fold-vertical) { 
    :root { 
        --sidebar-width: env(viewport-segment-left 0 0); 
    } 
} 

main { 
    display: grid; 
    grid-template-columns: var(--sidebar-width) 1fr; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f49f183439f46ba9032b2c8225d89d0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),Pe={href:"https://www.smashingmagazine.com/2022/03/building-web-layouts-dual-screen-foldable-devices/",target:"_blank",rel:"noopener noreferrer"},De={href:"https://www.stephaniestimac.com/demos/smashing-ds-demo",target:"_blank",rel:"noopener noreferrer"},Re=i("code",null,"horizontal-viewport-segments: 2",-1),Ie=s(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.recipe { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: minmax(175px, max-content); 
    grid-gap: 1rem; 
} 

.recipe-meta { 
    grid-column: 1 / 4; 
} 

img { 
    grid-column: 1 / 4; 
} 

.recipe-details__ingredients { 
    grid-row: 3; 
} 

.recipe-details__preparation { 
    grid-column: 2 / 4; 
    grid-row: 3;
} 

@media (horizontal-viewport-segments: 2) { 
    .recipe { 
        grid-template-columns: env(viewport-segment-width 0 0) 1fr 1fr; 
        grid-template-rows: repeat(2, 175px) minmax(175px, max-content); 
    } 
    
    .recipe-meta { 
        grid-column: 1 / 2; 
    } 
    
    img { 
        grid-column: 2 / 4; 
        grid-row: 1 / 3; 
    } 
    
    .recipe-details__ingredients { 
        grid-row: 2; 
    } 
    
    .recipe-details__preparation { 
        grid-column: 2 / 4; 
        grid-row: 3; 
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是从示例中截取的有关于布局的关键代码。最终效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d5acc8f39af4be884708053a75a7008~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),Me={href:"https://stephaniestimac.com/demos/smashing-ds-demo/",target:"_blank",rel:"noopener noreferrer"},Le=s(`<p>你可能会好奇，折叠屏的布局是如何完成的吧。如果上面的示例只是一个展示效果的话，接下来的这两个示例，我想能让你有更深入的体会。</p><p>先来看一个简单的示例，在 <code>body</code>上设置一个背景颜色：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body { 
    background: orange;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在不同的终端上看到的效果如下（比如 PC 机显示器上，移动设备上和折叠设备）：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/430679a64aa64d858d93a11abcea4b81~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用 <code>@media</code> 可以在手机上设置一个 <code>green</code> 背景色：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media (max-width: 540px) { 
    body { 
        background: green; 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候，手机上的背景颜色变成了绿色：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d12ff9c6c2644f59bada78c9362efce2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果把 <code>screen-spanning</code> 媒体查询加进来，可以给折叠设备设置另一个背景颜色：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@media (screen-spanning: single-fold-vertical) and (min-width: 541px) { 
    body { 
        background: yellow;
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候，三种不同类型设备<code>body</code> 背景颜色将分别是 <code>orange</code>，<code>green</code> 和 <code>yellow</code>：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59b8d4f7c3ff4767b4f56a64221fb76a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>按类似的方式，我们可以使用 CSS 的 Grid、<code>env()</code> 和 <code>screen-spanning</code> 构建一个更复杂的布局。比如：</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;!-- HTML --&gt; 
&lt;head&gt; 
    &lt;script src=&quot;./sfold-polyfill.js&quot;&gt;&lt;/script&gt; 
    &lt;script src=&quot;./spanning-css-polyfill.js&quot;&gt;&lt;/script&gt; 
&lt;/head&gt; 
&lt;body&gt; 
    &lt;div class=&quot;App&quot;&gt; 
        &lt;div class=&quot;header&quot;&gt;Header&lt;/div&gt; 
        &lt;div class=&quot;stories&quot;&gt;Story Data&lt;/div&gt; 
        &lt;div class=&quot;content&quot;&gt;Content&lt;/div&gt; 
        &lt;div class=&quot;related&quot;&gt;Related&lt;/div&gt; 
    &lt;/div&gt; 
&lt;/body&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加相应的 CSS：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>body { 
    margin: 0; 
    font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
} 

.App { 
    display: grid; 
    grid-template-columns: 10vw 67vw 20vw; 
    grid-template-rows: 5vh 60vh 33vh; 
    grid-template-areas: 
        &quot;header    header    header&quot; 
        &quot;stories   content   related&quot; 
        &quot;stories   content   .&quot;; 
    column-gap: 1vw; 
    row-gap: 1vh; 
} 

.header { 
    grid-area: header; 
    background-color: lime; 
} 

.stories { 
    grid-area: stories; 
    background-color: maroon; 
} 

.content { 
    grid-area: content; 
    background-color: mediumorchid; 
    overflow-y: auto; 
    min-height: 50vh; 
} 

.related { 
    grid-area: related; 
    background-color: mediumslateblue; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在浏览器中打开这个页面，看到的效果会像下图这样：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6db09e5b0af84c6998b0eb8b9ecb9859~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在上面基础上使用 <code>@media</code> 给 iPhone 和 iPad 中改变布局：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* phone layout portrait */ 
@media screen and (max-device-width: 480px) and (orientation: portrait) { 
    .App { 
        display: grid; 
        grid-template-columns: 100vw; 
        grid-template-rows: 10vh 10vh auto 10vh; 
        grid-template-areas: 
            &quot;header&quot; 
            &quot;stories&quot; 
            &quot;content&quot; 
            &quot;related&quot;; 
        column-gap: 1vw; 
        row-gap: 1vh; 
    } 
} 

/* tablet layout portrait */ 
@media screen and (min-device-width: 480px) and (max-device-width: 1200px) and (orientation: portrait) { 
    .App { 
        display: grid; 
        grid-template-columns: 25vw auto; 
        grid-template-rows: 10vh 80vh 8vh; 
        grid-template-areas: 
            &quot;header   header&quot; 
            &quot;stories  content&quot; 
            &quot;stories  related&quot;; 
        column-gap: 1vw; 
        row-gap: 1vh; 
        font-size: 2.4vh; 
     } 
}         
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d06a5ae71254ef8bff37810814593de~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>使用 <code>screen-spanning</code>、<code>env()</code> 和 <code>calc()</code> 给像微软 Surface Due 这样的折叠设备添加样式：</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code> /* 横向双屏布局 */ 
 @media (screen-spanning: single-fold-vertical) { 
     .App { 
         display: grid; 
         grid-template-columns: calc(env(fold-left) - 1vw) env(fold-width) calc( 100vw - env(fold-left) - env(fold-width) - 1vw ); 
         grid-template-rows: 5vh 60vh 33vh; 
         grid-template-areas: 
             &quot;header   header  header&quot; 
             &quot;stories  .       content&quot; 
             &quot;related  .       content&quot;; 
         column-gap: 1vw; 
         row-gap: 1vh;
     } 
} 

/* 纵向双屏 */ 
@media (screen-spanning: single-fold-horizontal) { 
    .App { 
        display: grid; 
        grid-template-columns: 60vw 39vw; 
        grid-template-rows: 9vh calc(env(fold-top) - 10vh - 2vh) env(fold-height) calc(99vh - env(fold-top) - env(fold-height) - 2vh); 
        grid-template-areas: 
            &quot;header    header&quot; 
            &quot;stories   related&quot; 
            &quot;.         .&quot; 
            &quot;content   content&quot;; 
        column-gap: 1vw; 
        row-gap: 1vh; 
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以在模拟器上看到像下图这样的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3881a55737e44946970539dc6eb48cff~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果你感兴趣的话，可以使用折叠屏API中提供的 <code>screen-fold-posture</code> 或 <code>screen-fold-angle</code> 给像三星Galaxy Fold、三星 Galaxy Flip Z 折叠设备提供不同的布局效果。要是你有华为 Mate x 设备，也可以尝试着改写上面的 Demo，查看效果。</p><p>技术的变革是永无止境的，我们将来要面对的用户终端也绝不会仅现于目前能看到的终端设备和媒介，就好比现在运用于游戏行业的 VR（虚拟现实）和 AR（增强现实）设备。</p><p>虽然现在 VR 和 AR 用于其他行业的场景还很少见，但我们可以预见，在 VR 和 AR 设备越来越成熟和更多的设备发布之后，我们看到 VR 和 AR，就像我们已经看到几十年前的触摸屏设备一样。或许有一天，你设计（或开发）的 Web 页面或应用就能在 VR 和 AR 设备上有一个较好的呈现。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9be7bd2a309a456bb9c8990e5632d868~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,31),Ae={href:"https://www.theuxda.com/blog/how-online-banking-design-should-work-ux-case-study",target:"_blank",rel:"noopener noreferrer"},Te=i("p",null,"在这里，我想表达的是，未来的响应式 Web 设计要响应的外形需求可能会更丰富，更复杂。",-1),Fe=i("h2",{id:"待续",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#待续","aria-hidden":"true"},"#"),e(" 待续")],-1),Ee=i("p",null,[e("有关于下一代响应式 Web 设计，我们介绍了其中的两个部分，即 "),i("strong",null,"响应用户的需求"),e(" 和 "),i("strong",null,"响应外形的需求"),e(" ，但还有最重要一部分没有和大家阐述，那就是 "),i("strong",null,"响应容器"),e(" 。因为响应容器的需求所涉及到的知识和内容较多，所以我把它单独放置到一节课程中来向大家介绍。")],-1),Ge=i("p",null,"在接下来的这节课程中，将会和大家一起探讨下一代响应式 Web 设计（即组件驱动式 Web 设计）中最为关键的部分 —— 容器查询。",-1);function Be(He,Ue){const n=a("ExternalLinkIcon");return r(),c("div",null,[t,i("p",null,[e("自从著名设计师 "),i("a",v,[e("@Ethan Marcotte"),d(n)]),e(" 在 "),i("a",m,[e("A List Apart"),d(n)]),e(" 上发表了一篇名为《 "),i("a",u,[e("Responsive Web Design"),d(n)]),e(" 》的文章之后，响应式 Web 设计（RWD，即 Responsive Web Design）的身影就出现在了公众面前。自此就有了响应式 Web 设计这个概念。")]),b,i("p",null,[i("a",p,[e("@Una Kravets"),d(n)]),e(" 在 2021 的 "),i("a",g,[e("Google I/O 大会上的分享"),d(n)]),e(" 提出新的响应式："),f,e("。Web 生态即将进入响应式 Web 设计的新时代，并转变我们对其含义的看法，也为会 Web 设计带来新的变化。组件式驱动 Web 设计（或开发）也被称为是"),h,e("。")]),S,i("p",null,[e("大家都认为 RWD 的概念是源于 "),i("a",_,[e("@Ethan Marcotte"),d(n)]),e(" 的《"),i("a",k,[e("Responsive Web Design"),d(n)]),e("》一文。他提出了采用 CSS 的媒体查询特性配合流体布局技术，在尽可能不改变 HTML 的 DOM 结构的基础上，只改变 UI 效果和布局风格。")]),i("p",null,[i("a",x,[e("@zeldman"),d(n)]),e(" 曾对 RWD 做过这样的定义：")]),w,i("p",null,[i("a",C,[e("@Aaron Gustafson"),d(n)]),e(" 有一本书叫《"),i("a",q,[e("Adaptive Design"),d(n)]),e("》：")]),y,i("blockquote",null,[i("p",null,[e("上图是在线流体网格生成器："),i("a",j,[e("http://www.responsivegridsystem.com/calculator/"),d(n)])])]),W,i("p",null,[e("上面生成的代码还是采用 CSS 浮动加百分比完成的流体布局。除了使用在线网格生成器之外，个人还是比较推荐 "),i("a",z,[e("Twitter 团队的 Bootstrap 的网格系统"),d(n)]),e("，也是很成熟的一套流体网格，并且做了响应式处理。")]),P,i("p",null,[e("我们曾在前面的《"),i("a",D,[e("09 | 使用 Flexbox 构建经典布局：10 种经典 Web 布局"),d(n)]),e("》和《"),i("a",R,[e("18 | 使用 Grid 构建经典布局：10 种经典布局"),d(n)]),e("》课程中分别介绍了 CSS Flexbox 和 CSS Grid 是如何构建 "),I,e(" 列网格。")]),M,i("p",null,[e("不知道大家和我是否有同样的感觉，在 "),L,e(" 中使用 "),A,e(" 或 "),T,e(" 时，总是傻傻分不清楚，易于搞错。要告诉大家的是，自 "),i("a",F,[e("CSS Media Queries Level 4"),d(n)]),e(" 开始，我们可以使用较为熟悉的数学表达式了，在媒体条件中使用 "),E,e(" 、"),G,e(" 、"),B,e(" 或 "),H,e(" 等数学表达式：")]),U,i("p",null,[e("除此之外，"),i("a",N,[e("CSS Media Queries Level 5"),d(n)]),e(" 引入了一些用户偏好的媒体查询设置：")]),O,i("blockquote",null,[i("p",null,[e("Demo 地址："),i("a",V,[e("https://codepen.io/airen/full/abjZwgw"),d(n)])])]),X,Z,i("blockquote",null,[i("p",null,[e("Demo 地址："),i("a",K,[e("https://codepen.io/airen/full/bGjerYd"),d(n)])])]),J,i("blockquote",null,[i("p",null,[e("Demo 地址："),i("a",Q,[e("https://codepen.io/airen/full/rNrLqKo"),d(n)])])]),Y,i("p",null,[e("这只是 CSS 的 "),$,e(" 最基础的一部分规则，事实上，"),ee,e(" 规则大约包含了 "),ie,e(" 个可供查询的特性，其中大约 "),ne,e(" 个查询规则得到较好的支持。其中有些新增的查询特性是用来改善用户体验的，比如 "),i("a",de,[e("Media Queries Level 5"),d(n)]),e(" 规范中的第十一部分，能够让你根据用户自身的特定偏好和需求来设计 Web 体验。")]),se,i("p",null,[e("另外，@Eric Bailey 在他的文章《"),i("a",le,[e("Revisiting prefers-reduced-motion, the reduced motion media query"),d(n)]),e("》中提出了一个观点：")]),ae,i("blockquote",null,[i("p",null,[e("Demo 地址： "),i("a",re,[e("https://codepen.io/airen/full/rNrLoGw"),d(n)])])]),ce,i("p",null,[e("看上去不错，但这也引出另一个新的概念，"),i("a",oe,[e("系统颜色"),d(n)]),e("。")]),te,ve,me,i("blockquote",null,[i("p",null,[e("Demo 地址："),i("a",ue,[e("https://codepen.io/airen/full/poZbqKR"),d(n)])])]),be,i("blockquote",null,[i("p",null,[e("Demo 地址："),i("a",pe,[e("https://codepen.io/airen/full/BaPzvbo"),d(n)])])]),ge,i("p",null,[e("事实上呢？有些 Web 开发者已经开始在为我们制定这方面的 API ，除了 "),i("a",fe,[e("三星（Samsung）"),d(n)]),e(" 的 "),i("a",he,[e("@Diego González"),d(n)]),e("， "),i("a",Se,[e("英特尔（Intel Corporation）"),d(n)]),e(" 的 "),i("a",_e,[e("@Kenneth Rohde Christiansen"),d(n)]),e(" 之外，还有"),i("a",ke,[e("微软（Microsoft）"),d(n)]),e("的 "),i("a",xe,[e("@Bogdan Brinza"),d(n)]),e("、"),i("a",we,[e("@Daniel Libby"),d(n)]),e(" 和 "),i("a",Ce,[e("@Zouhir Chahoud"),d(n)]),e("。只不过对于 Web 开发者来说，现在这些制定的规范（CSS 相关的特性）和Web API（JavaScript API）还很新，不确定因素过多，甚至差异性也比较大。")]),i("p",null,[e("到目前为止主要分为两个部分。其中一个部分是由微软（Microsoft）的 @Bogdan Brinza、@Daniel Libby 和 @Zouhir Chahoud 一起制定的，更适用于“有缝”的折叠处设备；另一部分是目前处于 "),i("a",qe,[e("W3C 规范 ED 阶段的屏幕折叠 API"),d(n)]),e("，它更适用于“无缝”的折叠设备。")]),i("p",null,[i("a",ye,[e("@argyleink"),d(n)]),e(" 在 Github 上发起了一个使用 CSS 媒体特性来检测折叠屏的讨论。也就是说，Web 开发者可以使用"),je,e(" 相关的特性来识别折叠屏，为折叠屏的类型（比如“有缝”和“无缝”）提供相应的媒体查询。 比如，我们可以使用 "),We,e(" 这个特性可以用来帮助 Web 开发人员检测“根视图”是否跨越多个相邻显示区域，并提供有关这些相邻显示区域配置的详细信息。")]),ze,i("p",null,[e("@Stephanie 在她的最新博文《"),i("a",Pe,[e("Building Web Layouts For Dual-Screen And Foldable Devices"),d(n)]),e("》中也向大家提供了"),i("a",De,[e("一个示例"),d(n)]),e("，演示了按屏幕数量（"),Re,e("）查询的示例：")]),Ie,i("blockquote",null,[i("p",null,[e("Demo 地址："),i("a",Me,[e("https://stephaniestimac.com/demos/smashing-ds-demo/"),d(n)])])]),Le,i("blockquote",null,[i("p",null,[e("上图来自于《"),i("a",Ae,[e("UX Case Study: Metaverse Banking VR / AR Design Concept of the Future"),d(n)]),e("》一文。UXDA的专业金融用户体验架构师和设计师团队向您介绍第一个混合现实银行概念，包括 VR 和 AR 银行设计、平板电脑、可穿戴设备、桌面和移动银行 UI / UX。")])]),Te,Fe,Ee,Ge])}const Oe=l(o,[["render",Be],["__file","index-27.html.vue"]]);export{Oe as default};
