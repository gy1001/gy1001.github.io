import{_ as t,M as o,p as c,q as i,R as n,t as s,N as e,a1 as p}from"./framework-e8cb8151.js";const l={},r=n("h1",{id:"_27-模块模式",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_27-模块模式","aria-hidden":"true"},"#"),s(" 27-"),n("strong",null,"模块模式")],-1),u=n("p",null,[n("img",{src:"https://img4.mukewang.com/5d3e4d2e0001359706400360.jpg",alt:"img"})],-1),d=n("blockquote",null,[n("p",null,"天才就是长期劳动的结果。 —— 牛顿")],-1),k=n("p",null,"模块是任何健壮的应用程序体系结构不可或缺的一部分，特点是有助于保持应用项目的代码单元既能清晰地分离又有组织，下面我们来看看各种不同的模块模式解决方案。",-1),v=n("strong",null,"注意：",-1),m={href:"https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},b={href:"http://es6.ruanyifeng.com/#docs/module",target:"_blank",rel:"noopener noreferrer"},f=p(`<h2 id="_1-模块模式" tabindex="-1"><a class="header-anchor" href="#_1-模块模式" aria-hidden="true">#</a> 1. 模块模式</h2><h3 id="_1-1-命名空间模式" tabindex="-1"><a class="header-anchor" href="#_1-1-命名空间模式" aria-hidden="true">#</a> 1.1 命名空间模式</h3><p>命名空间模式是一个简单的模拟模块的方法，即创建一个全局对象，然后将变量和方法添加到这个全局对象中，这个全局对象是作为命名空间一样的角色。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token constant">MYNS</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token constant">MYNS</span><span class="token punctuation">.</span>param1 <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>
<span class="token constant">MYNS</span><span class="token punctuation">.</span>param2 <span class="token operator">=</span> <span class="token string">&#39;world&#39;</span>
<span class="token constant">MYNS</span><span class="token punctuation">.</span>param3 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">prop</span><span class="token operator">:</span> <span class="token string">&#39;name&#39;</span> <span class="token punctuation">}</span>

<span class="token constant">MYNS</span><span class="token punctuation">.</span><span class="token function-variable function">method1</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式可以隐藏系统中的变量冲突，但是也有一些缺点，比如：</p><ol><li>命名空间如果比较复杂，调用可能就会变成 <code>MYNS.param.prop.data...</code> 长长一溜，使用不便且增加代码量；</li><li>变量嵌套关系越多，属性解析的性能消耗就越多；</li><li>安全性不佳，所有的成员都可以被访问到；</li></ol><h3 id="_1-2-模块模式" tabindex="-1"><a class="header-anchor" href="#_1-2-模块模式" aria-hidden="true">#</a> 1.2 模块模式</h3><p>除了命名空间模式，也可以使用闭包的特性来模拟实现私有成员的功能来提升安全性，这里可以通过 IIFE 快速创建一个闭包，将要隐藏的变量和方法放在闭包中，这就是模块模式。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> myModule <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> privateProp <span class="token operator">=</span> <span class="token string">&#39;&#39;</span> <span class="token comment">// 私有变量</span>
  <span class="token keyword">var</span> <span class="token function-variable function">privateMethod</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 私有方法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>privateProp<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicProp</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 公有变量</span>
    <span class="token function-variable function">publicMethod</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 共有方法</span>
      privateProp <span class="token operator">=</span> prop
      <span class="token function">privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

myModule<span class="token punctuation">.</span><span class="token function">publicMethod</span><span class="token punctuation">(</span><span class="token string">&#39;new prop&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出：new prop</span>
myModule<span class="token punctuation">.</span>privateProp <span class="token comment">// Uncaught TypeError: myModule.privateMethod is not a function</span>
myModule<span class="token punctuation">.</span>privateProp <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的私有变量和私有方法，在闭包外面无法访问到，称为<strong>私有成员</strong>。而闭包返回的方法因为作用域的原因可以访问到私有成员，所以称为<strong>特权方法</strong>。</p><p>值得一提的是，在模块模式创建时，可以将参数传递到闭包中，以更自由地创建模块，也可以方便地将全局变量传入模块中，导入全局变量有助于加速即时函数中的全局符号解析的速度，因为导入的变量成了该函数的局部变量。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> myModule <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">opt<span class="token punctuation">,</span> global</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>options<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-揭示模块模式" tabindex="-1"><a class="header-anchor" href="#_1-3-揭示模块模式" aria-hidden="true">#</a> 1.3 揭示模块模式</h3><p>在上面的模块模式例子上稍加改动，可以得到<strong>揭示模块模式</strong>（Reveal Module Pattern），又叫暴露模块模式，在私有域中定义我们所有的函数和变量，并且返回一个匿名对象，把想要暴露出来的私有成员赋值给这个对象，使这些私有成员公开化。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> myModule <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> privateProp <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
  <span class="token keyword">var</span> <span class="token function-variable function">printProp</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>privateProp<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">setProp</span><span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    privateProp <span class="token operator">=</span> prop
    <span class="token function">printProp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">print</span><span class="token operator">:</span> printProp<span class="token punctuation">,</span>
    <span class="token literal-property property">set</span><span class="token operator">:</span> setProp<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

myModule<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;new prop&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出：new prop</span>
myModule<span class="token punctuation">.</span><span class="token function">setProp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Uncaught TypeError: myModule.setProp is not a function</span>
myModule<span class="token punctuation">.</span>privateProp <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>揭示模块暴露出来的私有成员可以在被重命名后公开访问，也增强了可读性。</p><h2 id="_2-es6-module" tabindex="-1"><a class="header-anchor" href="#_2-es6-module" aria-hidden="true">#</a> 2. ES6 module</h2>`,17),g={href:"https://www.bookstack.cn/read/es6-3rd/sidebar.md",target:"_blank",rel:"noopener noreferrer"},y=p(`<p>ES6 的 module 功能主要由两个命令组成 <code>export</code>、<code>import</code>，<code>export</code> 用于规定模块对外暴露的接口，<code>import</code> 用于输入其他模块提供的接口，简单来说就是一个作为输出、一个作为输入。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1.js</span>

<span class="token comment">// 写法一</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">&#39;a&#39;</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">&#39;b&#39;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> b <span class="token punctuation">}</span>

<span class="token comment">// 写法三</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">&#39;c&#39;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> c <span class="token keyword">as</span> e <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入时：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 2.js</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> a <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./1.js&#39;</span> <span class="token comment">// 写法一</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> b <span class="token keyword">as</span> f <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./1.js&#39;</span> <span class="token comment">// 写法二</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> e <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./1.js&#39;</span> <span class="token comment">// 写法二</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从前面的例子可以看出，使用 <code>import</code> 时，用户需要知道所要加载的变量名或函数名，否则无法加载，<code>export default</code> 方式提供了模块默认输出的形式，给用户提供了方便：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 3.js</span>

<span class="token comment">// 写法一</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> foo

<span class="token comment">// 写法三</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>add <span class="token keyword">as</span> <span class="token keyword">default</span><span class="token punctuation">}</span>

<span class="token comment">// 写法四</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token number">42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入时：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 4.js</span>

<span class="token keyword">import</span> bar <span class="token keyword">from</span> <span class="token string">&#39;./3.js&#39;</span> <span class="token comment">// 写法一</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 输出：foo</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./3.js&#39;</span> <span class="token comment">// 写法二</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 输出：foo</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是 <code>export</code>、<code>import</code> 都必须写在模块顶层，如果处于块级作用域内，就会报错，因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token string">&#39;bar&#39;</span> <span class="token comment">// SyntaxError</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function h(w,_){const a=o("ExternalLinkIcon");return c(),i("div",null,[r,u,d,k,n("blockquote",null,[n("p",null,[v,s(" 本文可能用到一些编码技巧比如 "),n("a",m,[s("IIFE"),e(a)]),s("（Immediately Invoked Function Expression, 立即调用函数表达式），ES6 "),n("a",b,[s("Module"),e(a)]),s(" 的语法 等，如果还没接触过可以点击链接稍加学习 ~")])]),f,n("p",null,[s("继社区提出的 CommonJS 和 AMD 之类的方案之后，从 ES6 开始，JavaScript 就支持原生模块（module）了，下面我们一起来简单看一下 ES6 的 module，更详细的建议看一下 "),n("a",g,[s("阮一峰的 《ES6 标准入门》 "),e(a)]),s("。")]),y])}const j=t(l,[["render",h],["__file","index-27.html.vue"]]);export{j as default};
