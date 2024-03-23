import{_ as p,M as o,p as c,q as i,R as s,t as n,N as e,a1 as t}from"./framework-e8cb8151.js";const l="/assets/image-20230811112531681-292b58a3.png",u="/assets/image-20230811112550013-71ed6022.png",r={},d=t('<h1 id="_14-装饰者模式-给新房子装修" tabindex="-1"><a class="header-anchor" href="#_14-装饰者模式-给新房子装修" aria-hidden="true">#</a> 14-<strong>装饰者模式：给新房子装修</strong></h1><p><img src="https://img4.mukewang.com/5d24499d00014b5a06400359.jpg" alt="img"></p><blockquote><p>加紧学习，抓住中心，宁精勿杂，宁专勿多。 —— 周恩来</p></blockquote><p><strong>装饰者模式</strong> （Decorator Pattern）又称装饰器模式，在不改变原对象的基础上，通过对其添加属性或方法来进行包装拓展，使得原有对象可以动态具有更多功能。</p><p>本质是功能<strong>动态组合</strong>，即动态地给一个对象添加额外的职责，就增加功能角度来看，使用装饰者模式比用继承更为灵活。好处是有效地把对象的核心职责和装饰功能区分开，并且通过动态增删装饰去除目标对象中重复的装饰逻辑。</p>',5),k=s("strong",null,"注意：",-1),v={href:"https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},m={href:"http://es6.ruanyifeng.com/#docs/let",target:"_blank",rel:"noopener noreferrer"},b={href:"http://es6.ruanyifeng.com/#docs/class",target:"_blank",rel:"noopener noreferrer"},g=t('<h2 id="_1-你曾见过的装饰者模式" tabindex="-1"><a class="header-anchor" href="#_1-你曾见过的装饰者模式" aria-hidden="true">#</a> 1. 你曾见过的装饰者模式</h2><p>相信大家都有过房屋装修的经历，当毛坯房建好的时候，已经可以居住了，虽然不太舒适。一般我们自己住当然不会住毛坯，因此我们还会通水电、墙壁刷漆、铺地板、家具安装、电器安装等等步骤，让房屋渐渐具有各种各样的特性，比如墙壁刷漆和铺地板之后房屋变得更加美观，有了家具居住变得更加舒适，但这些额外的装修并没有影响房屋是用来居住的这个基本功能，这就是装饰的作用。</p><p><img src="'+l+`" alt="image-20230811112531681"></p><p>再比如现在我们经常喝的奶茶，除了奶茶之外，还可以添加珍珠、波霸、椰果、仙草、香芋等等辅料，辅料的添加对奶茶的饮用并无影响，奶茶喝起来还是奶茶的味道，只不过辅料的添加让这杯奶茶的口感变得更多样化。</p><p>生活中类似的场景还有很多，比如去咖啡厅喝咖啡，点了杯摩卡之后我们还可以选择添加糖、冰块、牛奶等等调味品，给咖啡添加特别的口感和风味，但这些调味品的添加并没有影响咖啡的基本性质，不会因为添加了调味品，咖啡就变成奶茶。</p><p>在类似场景中，这些例子有以下特点：</p><ol><li>装饰不影响原有的功能，原有功能可以照常使用；</li><li>装饰可以增加多个，共同给目标对象添加额外功能；</li></ol><h2 id="_2-实例的代码实现" tabindex="-1"><a class="header-anchor" href="#_2-实例的代码实现" aria-hidden="true">#</a> 2. 实例的代码实现</h2><p>我们可以使用 JavaScript 来将装修房子的例子实现一下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 毛坯房 - 目标对象 */</span>
<span class="token keyword">function</span> <span class="token function">OriginHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">OriginHouse</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getDesc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;毛坯房&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 搬入家具 - 装饰者 */</span>
<span class="token keyword">function</span> <span class="token function">Furniture</span><span class="token punctuation">(</span><span class="token parameter">house</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>house <span class="token operator">=</span> house
<span class="token punctuation">}</span>

<span class="token class-name">Furniture</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getDesc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>house<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;搬入家具&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 墙壁刷漆 - 装饰者 */</span>
<span class="token keyword">function</span> <span class="token function">Painting</span><span class="token punctuation">(</span><span class="token parameter">house</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>house <span class="token operator">=</span> house
<span class="token punctuation">}</span>

<span class="token class-name">Painting</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getDesc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>house<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;墙壁刷漆&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OriginHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Furniture</span><span class="token punctuation">(</span>house<span class="token punctuation">)</span>
house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Painting</span><span class="token punctuation">(</span>house<span class="token punctuation">)</span>

house<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 输出： 毛坯房  搬入家具  墙壁刷漆</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 ES6 的 Class 语法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 毛坯房 - 目标对象 */</span>
<span class="token keyword">class</span> <span class="token class-name">OriginHouse</span> <span class="token punctuation">{</span>
  <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;毛坯房&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 搬入家具 - 装饰者 */</span>
<span class="token keyword">class</span> <span class="token class-name">Furniture</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">house</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>house <span class="token operator">=</span> house
  <span class="token punctuation">}</span>

  <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>house<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;搬入家具&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 墙壁刷漆 - 装饰者 */</span>
<span class="token keyword">class</span> <span class="token class-name">Painting</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">house</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>house <span class="token operator">=</span> house
  <span class="token punctuation">}</span>

  <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>house<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;墙壁刷漆&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OriginHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Furniture</span><span class="token punctuation">(</span>house<span class="token punctuation">)</span>
house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Painting</span><span class="token punctuation">(</span>house<span class="token punctuation">)</span>

house<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 输出： 毛坯房  搬入家具  墙壁刷漆</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是不是感觉很麻烦，装饰个功能这么复杂？我们 JSer 大可不必走这一套面向对象花里胡哨的，毕竟 JavaScript 的优点就是灵活：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 毛坯房 - 目标对象 */</span>
<span class="token keyword">var</span> originHouse <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;毛坯房 &#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 搬入家具 - 装饰者 */</span>
<span class="token keyword">function</span> <span class="token function">furniture</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;搬入家具 &#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 墙壁刷漆 - 装饰者 */</span>
<span class="token keyword">function</span> <span class="token function">painting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;墙壁刷漆 &#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 添加装饰 - 搬入家具 */</span>
originHouse<span class="token punctuation">.</span>getDesc <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> getDesc <span class="token operator">=</span> originHouse<span class="token punctuation">.</span>getDesc
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">furniture</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">/* 添加装饰 - 墙壁刷漆 */</span>
originHouse<span class="token punctuation">.</span>getDesc <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> getDesc <span class="token operator">=</span> originHouse<span class="token punctuation">.</span>getDesc
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">painting</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

originHouse<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 输出： 毛坯房  搬入家具  墙壁刷漆</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简洁明了，且更符合前端日常使用的场景。</p><h2 id="_3-装饰者模式的原理" tabindex="-1"><a class="header-anchor" href="#_3-装饰者模式的原理" aria-hidden="true">#</a> 3. 装饰者模式的原理</h2><p>装饰者模式的原理如下图：</p><p><img src="`+u+'" alt="image-20230811112550013"></p><p>可以从上图看出，在表现形式上，装饰者模式和适配器模式比较类似，都属于包装模式。在装饰者模式中，一个对象被另一个对象包装起来，形成一条包装链，并增加了原先对象的功能。</p><p>值得注意的是：</p>',20),h={href:"https://github.com/tc39/proposal-decorators",target:"_blank",rel:"noopener noreferrer"},f=s("p",null,"— 尤雨溪 2019.6.12",-1),y=t(`<p>因此本文并没有对 JavaScript 的装饰器 Decorator 进行相关介绍。</p><h2 id="_4-实战中的装饰者模式" tabindex="-1"><a class="header-anchor" href="#_4-实战中的装饰者模式" aria-hidden="true">#</a> 4. 实战中的装饰者模式</h2><h3 id="_4-1-给浏览器事件添加新功能" tabindex="-1"><a class="header-anchor" href="#_4-1-给浏览器事件添加新功能" aria-hidden="true">#</a> 4.1 给浏览器事件添加新功能</h3><p>之前介绍的添加装饰器函数的方式，经常被用来给原有浏览器或 DOM 绑定事件上绑定新的功能，比如在 <code>onload</code> 上增加新的事件，或在原来的事件绑定函数上增加新的功能，或者在原本的操作上增加用户行为埋点：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原先的 onload 事件 &#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 发送埋点信息 */</span>
<span class="token keyword">function</span> <span class="token function">sendUserOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;埋点：用户当前行为路径为 ...&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 将新的功能添加到 onload 事件上 */</span>
window<span class="token punctuation">.</span>onload <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> originOnload <span class="token operator">=</span> window<span class="token punctuation">.</span>onload
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    originOnload <span class="token operator">&amp;&amp;</span> <span class="token function">originOnload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">sendUserOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 输出： 原先的 onload 事件</span>
<span class="token comment">// 输出： 埋点：用户当前行为路径为 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到通过添加装饰函数，为 <code>onload</code> 事件回调增加新的方法，且并不影响原本的功能，我们可以把上面的方法提取出来作为一个工具方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原先的 onload 事件 &#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 发送埋点信息 */</span>
<span class="token keyword">function</span> <span class="token function">sendUserOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;埋点：用户当前行为路径为 ...&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 给原生事件添加新的装饰方法 */</span>
<span class="token keyword">function</span> <span class="token function">originDecorateFn</span><span class="token punctuation">(</span><span class="token parameter">originObj<span class="token punctuation">,</span> originKey<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  originObj<span class="token punctuation">[</span>originKey<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> originFn <span class="token operator">=</span> originObj<span class="token punctuation">[</span>originKey<span class="token punctuation">]</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      originFn <span class="token operator">&amp;&amp;</span> <span class="token function">originFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 添加装饰功能</span>
<span class="token function">originDecorateFn</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token string">&#39;onload&#39;</span><span class="token punctuation">,</span> sendUserOperation<span class="token punctuation">)</span>

<span class="token comment">// 输出： 原先的 onload 事件</span>
<span class="token comment">// 输出： 埋点：用户当前行为路径为 ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),w={href:"https://codepen.io/SHERlocked93/pen/LwjBZw",target:"_blank",rel:"noopener noreferrer"},_=t(`<h3 id="_4-2-typescript-中的装饰器" tabindex="-1"><a class="header-anchor" href="#_4-2-typescript-中的装饰器" aria-hidden="true">#</a> 4.2 TypeScript 中的装饰器</h3><p>现在的越来越多的前端项目或 Node 项目都在拥抱 JavaScript 的超集语言 TypeScript，如果你了解过 C# 中的特性 Attribute、Java 中的注解 Annotation、Python 中的装饰器 Decorator，那么你就不会对 TypeScript 中的装饰器感到陌生，下面我们简单介绍一下 TypeScript 中的装饰器。</p><p>TypeScript 中的装饰器可以被附加到类声明、方法、访问符、属性和参数上，装饰器的类型有参数装饰器、方法装饰器、访问器或参数装饰器、参数装饰器。</p><p>TypeScript 中的装饰器使用 <code>@expression</code> 这种形式，<code>expression</code> 求值后为一个函数，它在运行时被调用，被装饰的声明信息会被做为参数传入。</p><p>多个装饰器应用使用在同一个声明上时：</p><ol><li>由上至下依次对装饰器表达式求值；</li><li>求值的结果会被当成函数，<strong>由下至上</strong>依次调用；</li></ol><p>那么使用官网的一个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;f(): evaluated&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    <span class="token parameter">target<span class="token punctuation">,</span>
    <span class="token literal-property property">propertyKey</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    <span class="token literal-property property">descriptor</span><span class="token operator">:</span> PropertyDescriptor<span class="token punctuation">,</span></span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;f(): called&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;g(): evaluated&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    <span class="token parameter">target<span class="token punctuation">,</span>
    <span class="token literal-property property">propertyKey</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    <span class="token literal-property property">descriptor</span><span class="token operator">:</span> PropertyDescriptor<span class="token punctuation">,</span></span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;g(): called&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
  @<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  @<span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// f(): evaluated</span>
<span class="token comment">// g(): evaluated</span>
<span class="token comment">// g(): called</span>
<span class="token comment">// f(): called</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到上面的代码中，高阶函数 <code>f</code> 与 <code>g</code> 返回了另一个函数（装饰器函数），所以 <code>f</code>、<code>g</code> 这里又被称为装饰器工厂，即帮助用户传递可供装饰器使用的参数的工厂。另外注意，演算的顺序是从下到上，执行的时候是从下到上的。</p><p>再比如下面一个场景</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">greeting</span><span class="token operator">:</span> string

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">message</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greeting <span class="token operator">=</span> message
  <span class="token punctuation">}</span>

  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;Hello, &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>greeting
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> <span class="token keyword">new</span> <span class="token class-name">Greeter</span><span class="token punctuation">(</span><span class="token string">&#39;Jim&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出： greeting  greet</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们不希望 <code>greet</code> 被 <code>for-in</code> 循环遍历出来，可以通过装饰器的方式来方便地修改属性的属性描述符：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">enumerable</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
    <span class="token literal-property property">propertyKey</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    <span class="token literal-property property">descriptor</span><span class="token operator">:</span> PropertyDescriptor<span class="token punctuation">,</span></span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    descriptor<span class="token punctuation">.</span>enumerable <span class="token operator">=</span> value
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">greeting</span><span class="token operator">:</span> string

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">message</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greeting <span class="token operator">=</span> message
  <span class="token punctuation">}</span>

  @<span class="token function">enumerable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;Hello, &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>greeting
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> <span class="token keyword">new</span> <span class="token class-name">Greeter</span><span class="token punctuation">(</span><span class="token string">&#39;Jim&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出： greeting</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样 <code>greet</code> 就变成不可枚举了，使用起来比较方便，对其他属性进行声明不可枚举的时候也只用在之前加一行 <code>@enumerable(false)</code> 即可，不用大费周章的 <code>Object.defineProperty(...)</code> 进行繁琐的声明了。</p>`,14),D={href:"https://www.typescriptlang.org/docs/handbook/decorators.html",target:"_blank",rel:"noopener noreferrer"},x=t('<h2 id="_5-装饰者模式的优缺点" tabindex="-1"><a class="header-anchor" href="#_5-装饰者模式的优缺点" aria-hidden="true">#</a> 5. 装饰者模式的优缺点</h2><p>装饰者模式的优点：</p><ol><li>我们经常使用继承的方式来实现功能的扩展，但这样会给系统中带来很多的子类和复杂的继承关系，装饰者模式允许用户在不引起子类数量暴增的前提下动态地修饰对象，添加功能，<strong>装饰者和被装饰者之间松耦合</strong>，可维护性好；</li><li>被装饰者可以使用装饰者<strong>动态地增加和撤销功能</strong>，可以在运行时选择不同的装饰器，实现不同的功能，灵活性好；</li><li>装饰者模式把一系列复杂的功能分散到每个装饰器当中，一般一个装饰器只实现一个功能，可以给一个对象增加多个同样的装饰器，也可以把一个装饰器用来装饰不同的对象，<strong>有利于装饰器功能的复用</strong>；</li><li>可以通过选择不同的装饰者的组合，<strong>创造不同行为和功能的结合体</strong>，原有对象的代码无须改变，就可以使得原有对象的功能变得更强大和更多样化，符合开闭原则；</li></ol><p>装饰者模式的缺点：</p><ol><li>使用装饰者模式时会产生很多细粒度的装饰者对象，这些装饰者对象由于接口和功能的多样化导致系统复杂度增加，功能越复杂，需要的细粒度对象越多；</li><li>由于更大的灵活性，也就更容易出错，特别是对于多级装饰的场景，错误定位会更加繁琐；</li></ol><h2 id="_6-装饰者模式的适用场景" tabindex="-1"><a class="header-anchor" href="#_6-装饰者模式的适用场景" aria-hidden="true">#</a> 6. 装饰者模式的适用场景</h2><ol><li>如果不希望系统中增加很多子类，那么可以考虑使用装饰者模式；</li><li>需要通过对现有的一组基本功能进行排列组合而产生非常多的功能时，采用继承关系很难实现，这时采用装饰者模式可以很好实现；</li><li>当对象的功能要求可以动态地添加，也可以动态地撤销，可以考虑使用装饰者模式；</li></ol><h2 id="_7-其他相关模式" tabindex="-1"><a class="header-anchor" href="#_7-其他相关模式" aria-hidden="true">#</a> 7. 其他相关模式</h2><h3 id="_7-1-装饰者模式与适配器模式" tabindex="-1"><a class="header-anchor" href="#_7-1-装饰者模式与适配器模式" aria-hidden="true">#</a> 7.1 装饰者模式与适配器模式</h3><p>装饰者模式和适配器模式都是属于包装模式，然而他们的意图有些不一样：</p><ol><li><strong>装饰者模式：</strong> 扩展功能，原有功能还可以直接使用，一般可以给目标对象多次叠加使用多个装饰者；</li><li><strong>适配器模式：</strong> 功能不变，但是转换了原有接口的访问格式，一般只给目标对象使用一次；</li></ol><h3 id="_7-2-装饰者模式与组合模式" tabindex="-1"><a class="header-anchor" href="#_7-2-装饰者模式与组合模式" aria-hidden="true">#</a> 7.2 装饰者模式与组合模式</h3><p>这两个模式有相似之处，都涉及到对象的递归调用，从某个角度来说，可以把装饰者模式看做是只有一个组件的组合模式。</p><ol><li><strong>装饰者模式：</strong> 动态地给对象增加功能；</li><li><strong>组合模式：</strong> 管理组合对象和叶子对象，为它们提供一致的操作接口给客户端，方便客户端的使用；</li></ol><h3 id="_7-3-装饰者模式与策略模式" tabindex="-1"><a class="header-anchor" href="#_7-3-装饰者模式与策略模式" aria-hidden="true">#</a> 7.3 装饰者模式与策略模式</h3><p>装饰者模式和策略模式都包含有许多细粒度的功能模块，但是他们的使用思路不同：</p><ol><li><strong>装饰者模式：</strong> 可以递归调用，使用多个功能模式，功能之间可以叠加组合使用；</li><li><strong>策略模式：</strong> 只有一层选择，选择某一个功能；</li></ol>',17);function j(E,S){const a=o("ExternalLinkIcon");return c(),i("div",null,[d,s("blockquote",null,[s("p",null,[k,n(" 本文可能用到一些编码技巧比如 "),s("a",v,[n("IIFE"),e(a)]),n("（Immediately Invoked Function Expression, 立即调用函数表达式），ES6 的语法 "),s("a",m,[n("let/const"),e(a)]),n(" 、"),s("a",b,[n("Class"),e(a)]),n(" 等，如果还没接触过可以点击链接稍加学习 ~")])]),g,s("blockquote",null,[s("p",null,[n("EcmaScript 标准中的 Decorator "),s("a",h,[n("提案"),e(a)]),n("仍然在 stage-2 且极其不稳定。过去一年内已经经历了两次彻底大改，且和 TS 现有的实现已经完全脱节。")]),f]),y,s("p",null,[n("代码和预览参见： "),s("a",w,[n("Codepen -给浏览器事件添加新功能"),e(a)])]),_,s("p",null,[n("TypeScript 的装饰器还有很多有用的用法，感兴趣的同学可以阅读一下 TypeScript 的 Decorators "),s("a",D,[n("官网文档"),e(a)]),n(" 相关内容。")]),x])}const H=p(r,[["render",j],["__file","index-14.html.vue"]]);export{H as default};
