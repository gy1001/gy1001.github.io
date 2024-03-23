import{_ as e,M as o,p as c,q as i,R as n,t as s,N as t,a1 as p}from"./framework-e8cb8151.js";const l={},u=n("h1",{id:"_10-建造者模式-组装小汽车",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_10-建造者模式-组装小汽车","aria-hidden":"true"},"#"),s(" 10-建造者模式：组装小汽车")],-1),r=n("p",null,[n("img",{src:"https://img1.mukewang.com/5d11e15d0001cae706400359.jpg",alt:"img"})],-1),k=n("blockquote",null,[n("p",null,"人只有献身于社会，才能找出那短暂而有风险的生命的意义。 ——爱因斯坦")],-1),d=n("p",null,[n("strong",null,"建造者模式"),s("（Builder Pattern）又称生成器模式，分步构建一个复杂对象，并允许按步骤构造。同样的构建过程可以采用不同的表示，将一个复杂对象的"),n("strong",null,"构建层与其表示层分离"),s("。")],-1),v=n("p",null,"在工厂模式中，创建的结果都是一个完整的个体，我们对创建的过程并不关心，只需了解创建的结果。而在建造者模式中，我们关心的是对象的创建过程，因此我们通常将创建的复杂对象的模块化，使得被创建的对象的每一个子模块都可以得到高质量的复用，当然在灵活的 JavaScript 中我们可以有更灵活的实现。",-1),m=n("strong",null,"注意：",-1),b={href:"http://es6.ruanyifeng.com/#docs/let",target:"_blank",rel:"noopener noreferrer"},g={href:"http://es6.ruanyifeng.com/#docs/class",target:"_blank",rel:"noopener noreferrer"},y=p(`<h2 id="_1-你曾见过的建造者模式" tabindex="-1"><a class="header-anchor" href="#_1-你曾见过的建造者模式" aria-hidden="true">#</a> 1. 你曾见过的建造者模式</h2><p>假定我们需要建造一个车，车这个产品是由多个部件组成，车身、引擎、轮胎。汽车制造厂一般不会自己完成每个部件的制造，而是把部件的制造交给对应的汽车零部件制造商，自己只进行装配，最后生产出整车。整车的每个部件都是一个相对独立的个体，都具有自己的生产过程，多个部件经过一系列的组装共同组成了一个完整的车。</p><p><img src="http://img.mukewang.com/5d1eb3f7000105ce06000400.jpg" alt="图片描述"></p><p>类似的场景还有很多，比如生产一个笔记本电脑，由主板、显示器、壳子组成，每个部件都有自己独立的行为和功能，他们共同组成了一个笔记本电脑。笔记本电脑厂从部件制造商处获得制造完成的部件，再由自己完成组装，得到笔记本电脑这个完整的产品。</p><p>在这些场景中，有以下特点：</p><ol><li>整车制造厂（指挥者）无需知道零部件的生产过程，零部件的生产过程一般由零部件厂商（建造者）来完成；</li><li>整车制造厂（指挥者）决定以怎样的装配方式来组装零部件，以得到最终的产品；</li></ol><h2 id="_2-实例的代码实现" tabindex="-1"><a class="header-anchor" href="#_2-实例的代码实现" aria-hidden="true">#</a> 2. 实例的代码实现</h2><p>我们可以使用 JavaScript 来将上面的装配汽车的例子实现一下。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 建造者，汽车部件厂家，提供具体零部件的生产</span>
<span class="token keyword">function</span> <span class="token function">CarBuilder</span><span class="token punctuation">(</span><span class="token punctuation">{</span> color <span class="token operator">=</span> <span class="token string">&#39;white&#39;</span><span class="token punctuation">,</span> weight <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
  <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight
<span class="token punctuation">}</span>

<span class="token comment">// 生产部件，轮胎</span>
<span class="token class-name">CarBuilder</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">buildTyre</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;small&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;小号轮胎&#39;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用小号轮胎&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;normal&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;中号轮胎&#39;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用中号轮胎&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;big&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;大号轮胎&#39;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用大号轮胎&#39;</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 生产部件，发动机</span>
<span class="token class-name">CarBuilder</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">buildEngine</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;small&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;小马力发动机&#39;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用小马力发动机&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;normal&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;中马力发动机&#39;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用中马力发动机&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;big&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;大马力发动机&#39;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用大马力发动机&#39;</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 奔驰厂家，负责最终汽车产品的装配 */</span>
<span class="token keyword">function</span> <span class="token function">benChiDirector</span><span class="token punctuation">(</span><span class="token parameter">tyre<span class="token punctuation">,</span> engine<span class="token punctuation">,</span> param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> _car <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
  _car<span class="token punctuation">.</span><span class="token function">buildTyre</span><span class="token punctuation">(</span>tyre<span class="token punctuation">)</span>
  _car<span class="token punctuation">.</span><span class="token function">buildEngine</span><span class="token punctuation">(</span>engine<span class="token punctuation">)</span>
  <span class="token keyword">return</span> _car
<span class="token punctuation">}</span>

<span class="token comment">// 获得产品实例</span>
<span class="token keyword">var</span> benchi1 <span class="token operator">=</span> <span class="token function">benChiDirector</span><span class="token punctuation">(</span><span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;big&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">weight</span><span class="token operator">:</span> <span class="token string">&#39;1600kg&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>benchi1<span class="token punctuation">)</span>

<span class="token comment">// 输出：</span>
<span class="token comment">// {</span>
<span class="token comment">//   color: &quot;red&quot;</span>
<span class="token comment">//   weight: &quot;1600kg&quot;</span>
<span class="token comment">//   tyre: Tyre {tyreType: &quot;小号轮胎&quot;, tyreIntro: &quot;正在使用小号轮胎&quot;}</span>
<span class="token comment">//   engine: Engine {engineType: &quot;大马力发动机&quot;, engineIntro: &quot;正在使用大马力发动机&quot;}</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果访问者希望获得另一个型号的车，比如有「空调」功能的车，那么我们只需要给 <code>CarBuilder</code> 的原型 <code>prototype</code> 上增加一个空调部件的建造方法，然后再新建一个新的奔驰厂家指挥者方法。</p><p>也可以使用 ES6 的写法改造一下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 建造者，汽车部件厂家，提供具体零部件的生产</span>
<span class="token keyword">class</span> <span class="token class-name">CarBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">{</span> color <span class="token operator">=</span> <span class="token string">&#39;white&#39;</span><span class="token punctuation">,</span> weight <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
    <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，轮胎 */</span>
  <span class="token function">buildTyre</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> tyre <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;small&#39;</span><span class="token operator">:</span>
        tyre<span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;小号轮胎&#39;</span>
        tyre<span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用小号轮胎&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;normal&#39;</span><span class="token operator">:</span>
        tyre<span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;中号轮胎&#39;</span>
        tyre<span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用中号轮胎&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;big&#39;</span><span class="token operator">:</span>
        tyre<span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;大号轮胎&#39;</span>
        tyre<span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用大号轮胎&#39;</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tyre <span class="token operator">=</span> tyre
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，发动机 */</span>
  <span class="token function">buildEngine</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;small&#39;</span><span class="token operator">:</span>
        engine<span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;小马力发动机&#39;</span>
        engine<span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用小马力发动机&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;normal&#39;</span><span class="token operator">:</span>
        engine<span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;中马力发动机&#39;</span>
        engine<span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用中马力发动机&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;big&#39;</span><span class="token operator">:</span>
        engine<span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;大马力发动机&#39;</span>
        engine<span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用大马力发动机&#39;</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 指挥者，负责最终汽车产品的装配 */</span>
<span class="token keyword">class</span> <span class="token class-name">BenChiDirector</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">tyre<span class="token punctuation">,</span> engine<span class="token punctuation">,</span> param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> _car <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
    _car<span class="token punctuation">.</span><span class="token function">buildTyre</span><span class="token punctuation">(</span>tyre<span class="token punctuation">)</span>
    _car<span class="token punctuation">.</span><span class="token function">buildEngine</span><span class="token punctuation">(</span>engine<span class="token punctuation">)</span>
    <span class="token keyword">return</span> _car
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获得产品实例</span>
<span class="token keyword">const</span> benchi1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BenChiDirector</span><span class="token punctuation">(</span><span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;big&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">weight</span><span class="token operator">:</span> <span class="token string">&#39;1600kg&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>benchi1<span class="token punctuation">)</span>

<span class="token comment">// 输出：</span>
<span class="token comment">// {</span>
<span class="token comment">//   color: &quot;red&quot;</span>
<span class="token comment">//   weight: &quot;1600kg&quot;</span>
<span class="token comment">//   tyre: Tyre {tyreType: &quot;小号轮胎&quot;, tyreIntro: &quot;正在使用小号轮胎&quot;}</span>
<span class="token comment">//   engine: Engine {engineType: &quot;大马力发动机&quot;, engineIntro: &quot;正在使用大马力发动机&quot;}</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为灵活的 JavaScript，我们还可以使用链模式来完成部件的装配，对链模式还不熟悉的同学可以看一下后面有一篇单独介绍链模式的文章～</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 建造者，汽车部件厂家</span>
<span class="token keyword">class</span> <span class="token class-name">CarBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">{</span> color <span class="token operator">=</span> <span class="token string">&#39;white&#39;</span><span class="token punctuation">,</span> weight <span class="token operator">=</span> <span class="token string">&#39;0&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
    <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，轮胎 */</span>
  <span class="token function">buildTyre</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> tyre <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;small&#39;</span><span class="token operator">:</span>
        tyre<span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;小号轮胎&#39;</span>
        tyre<span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用小号轮胎&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;normal&#39;</span><span class="token operator">:</span>
        tyre<span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;中号轮胎&#39;</span>
        tyre<span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用中号轮胎&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;big&#39;</span><span class="token operator">:</span>
        tyre<span class="token punctuation">.</span>tyreType <span class="token operator">=</span> <span class="token string">&#39;大号轮胎&#39;</span>
        tyre<span class="token punctuation">.</span>tyreIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用大号轮胎&#39;</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tyre <span class="token operator">=</span> tyre
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，发动机 */</span>
  <span class="token function">buildEngine</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;small&#39;</span><span class="token operator">:</span>
        engine<span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;小马力发动机&#39;</span>
        engine<span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用小马力发动机&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;normal&#39;</span><span class="token operator">:</span>
        engine<span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;中马力发动机&#39;</span>
        engine<span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用中马力发动机&#39;</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;big&#39;</span><span class="token operator">:</span>
        engine<span class="token punctuation">.</span>engineType <span class="token operator">=</span> <span class="token string">&#39;大马力发动机&#39;</span>
        engine<span class="token punctuation">.</span>engineIntro <span class="token operator">=</span> <span class="token string">&#39;正在使用大马力发动机&#39;</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 汽车装配，获得产品实例</span>
<span class="token keyword">const</span> benchi1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">weight</span><span class="token operator">:</span> <span class="token string">&#39;1600kg&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildTyre</span><span class="token punctuation">(</span><span class="token string">&#39;small&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEngine</span><span class="token punctuation">(</span><span class="token string">&#39;big&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>benchi1<span class="token punctuation">)</span>

<span class="token comment">// 输出：</span>
<span class="token comment">// {</span>
<span class="token comment">//   color: &quot;red&quot;</span>
<span class="token comment">//   weight: &quot;1600kg&quot;</span>
<span class="token comment">//   tyre: Tyre {tyre: &quot;小号轮胎&quot;, tyreIntro: &quot;正在使用小号轮胎&quot;}</span>
<span class="token comment">//   engine: Engine {engine: &quot;大马力发动机&quot;, engineIntro: &quot;正在使用大马力发动机&quot;}</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样将最终产品的创建流程使用链模式来实现，相当于将指挥者退化，指挥的过程通过链模式让用户自己实现，这样既增加了灵活性，装配过程也一目了然。如果希望扩展产品的部件，那么在建造者上增加部件实现方法，再适当修改链模式即可。</p><h2 id="_3-建造者模式的通用实现" tabindex="-1"><a class="header-anchor" href="#_3-建造者模式的通用实现" aria-hidden="true">#</a> 3. 建造者模式的通用实现</h2><p>我们提炼一下建造者模式，这里的生产汽车的奔驰厂家就相当于指挥者（Director），厂家负责将不同的部件组装成最后的产品（Product），而部件的生产者是部件厂家相当于建造者（Builder），我们通过指挥者就可以获得希望的复杂的产品对象，再通过访问不同指挥者获得装配方式不同的产品。主要有下面几个概念：</p><ol><li><strong>Director：</strong> 指挥者，调用建造者中的部件具体实现进行部件装配，相当于整车组装厂，最终返回装配完毕的产品；</li><li><strong>Builder：</strong> 建造者，含有不同部件的生产方式给指挥者调用，是部件真正的生产者，但没有部件的装配流程；</li><li><strong>Product：</strong> 产品，要返回给访问者的复杂对象；</li></ol><p>建造者模式的主要功能是构建复杂的产品，并且是复杂的、需要分步骤构建的产品，其构建的算法是统一的，构建的过程由指挥者决定，只要配置不同的指挥者，就可以构建出不同的复杂产品来。也就是说，建造者模式<strong>将产品装配的算法和具体部件的实现分离</strong>，这样构建的算法可以扩展和复用，部件的具体实现也可以方便地扩展和复用，从而可以灵活地通过组合来构建出不同的产品对象。</p><p>概略图如下：</p><p><img src="https://i.loli.net/2019/05/13/5cd95edc099fb31547.png" alt="img"></p><p>下面是通用的实现。</p><p>首先使用 ES6 的 class 语法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 建造者，部件生产</span>
<span class="token keyword">class</span> <span class="token class-name">ProductBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param <span class="token operator">=</span> param
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，part1 */</span>
  <span class="token function">buildPart1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... Part1 生产过程</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>part1 <span class="token operator">=</span> <span class="token string">&#39;part1&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，part2 */</span>
  <span class="token function">buildPart2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... Part2 生产过程</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>part2 <span class="token operator">=</span> <span class="token string">&#39;part2&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 指挥者，负责最终产品的装配 */</span>
<span class="token keyword">class</span> <span class="token class-name">Director</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> _product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductBuilder</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
    _product<span class="token punctuation">.</span><span class="token function">buildPart1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    _product<span class="token punctuation">.</span><span class="token function">buildPart2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> _product
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获得产品实例</span>
<span class="token keyword">const</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Director</span><span class="token punctuation">(</span><span class="token string">&#39;param&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合链模式：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 建造者，汽车部件厂家</span>
<span class="token keyword">class</span> <span class="token class-name">CarBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param <span class="token operator">=</span> param
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，part1 */</span>
  <span class="token function">buildPart1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>part1 <span class="token operator">=</span> <span class="token string">&#39;part1&#39;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 生产部件，part2 */</span>
  <span class="token function">buildPart2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>part2 <span class="token operator">=</span> <span class="token string">&#39;part2&#39;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 汽车装配，获得产品实例</span>
<span class="token keyword">const</span> benchi1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span><span class="token string">&#39;param&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">buildPart1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">buildPart2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果希望扩展实例的功能，那么只需要在建造者类的原型上增加一个实例方法，再返回 <code>this</code> 即可。</p><p>值得一提的是，结合链模式的建造者模式中，装配复杂对象的链式装配过程就是指挥者 Director 角色，只不过在链式装配过程中不再封装在具体指挥者中，而是由使用者自己确定装配过程。</p><h2 id="_4-实战中的建造者模式" tabindex="-1"><a class="header-anchor" href="#_4-实战中的建造者模式" aria-hidden="true">#</a> 4. 实战中的建造者模式</h2><h3 id="_4-1-重构一个具有很多参数的构造函数" tabindex="-1"><a class="header-anchor" href="#_4-1-重构一个具有很多参数的构造函数" aria-hidden="true">#</a> 4.1 重构一个具有很多参数的构造函数</h3><p>有时候你会遇到一个参数很多的构造函数，比如：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 汽车建造者</span>
<span class="token keyword">class</span> <span class="token class-name">CarBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">engine<span class="token punctuation">,</span> weight<span class="token punctuation">,</span> height<span class="token punctuation">,</span> color<span class="token punctuation">,</span> tyre<span class="token punctuation">,</span> name<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
    <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
    <span class="token keyword">this</span><span class="token punctuation">.</span>tyre <span class="token operator">=</span> tyre
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> benchi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span>
  <span class="token string">&#39;大马力发动机&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;2ton&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;white&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;大号轮胎&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;奔驰&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;AMG&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果构造函数的参数多于 3 个，在使用的时候就很容易弄不清哪个参数对应的是什么含义，你可以使用对象解构赋值的方式来提高可读性和使用便利性，也可以使用建造者模式的思想来进行属性赋值，这是另一个思路。代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 汽车建造者</span>
<span class="token keyword">class</span> <span class="token class-name">CarBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">engine<span class="token punctuation">,</span> weight<span class="token punctuation">,</span> height<span class="token punctuation">,</span> color<span class="token punctuation">,</span> tyre<span class="token punctuation">,</span> name<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
    <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
    <span class="token keyword">this</span><span class="token punctuation">.</span>tyre <span class="token operator">=</span> tyre
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type
  <span class="token punctuation">}</span>

  <span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
      <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Key error : </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 不是本实例上的属性</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> benchi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;engine&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;大马力发动机&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;weight&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2ton&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;height&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2000mm&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;color&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;white&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;tyre&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;大号轮胎&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;奔驰&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setCarProperty</span><span class="token punctuation">(</span><span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;AMG&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个键都是用一个同样的方法来设置，或许你觉得不太直观，我们可以将设置每个属性的操作都单独列为一个方法，这样可读性就更高了：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 汽车建造者</span>
<span class="token keyword">class</span> <span class="token class-name">CarBuilder</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">engine<span class="token punctuation">,</span> weight<span class="token punctuation">,</span> height<span class="token punctuation">,</span> color<span class="token punctuation">,</span> tyre<span class="token punctuation">,</span> name<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
    <span class="token keyword">this</span><span class="token punctuation">.</span>weight <span class="token operator">=</span> weight
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
    <span class="token keyword">this</span><span class="token punctuation">.</span>tyre <span class="token operator">=</span> tyre
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type
  <span class="token punctuation">}</span>

  <span class="token function">setPropertyFuncChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> funcName <span class="token operator">=</span> <span class="token string">&#39;set&#39;</span> <span class="token operator">+</span> key<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\w</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> str<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">[</span>funcName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
        <span class="token keyword">return</span> <span class="token keyword">this</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> benchi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CarBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setPropertyFuncChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setEngine</span><span class="token punctuation">(</span><span class="token string">&#39;大马力发动机&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setWeight</span><span class="token punctuation">(</span><span class="token string">&#39;2ton&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setHeight</span><span class="token punctuation">(</span><span class="token string">&#39;2000mm&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setColor</span><span class="token punctuation">(</span><span class="token string">&#39;white&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setTyre</span><span class="token punctuation">(</span><span class="token string">&#39;大号轮胎&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&#39;奔驰&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token string">&#39;AMG&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),h={href:"https://juejin.im/post/5b61b0f86fb9a04fd343af8f#heading-25",target:"_blank",rel:"noopener noreferrer"},w=p(`<h3 id="_4-2-重构-react-的书写形式" tabindex="-1"><a class="header-anchor" href="#_4-2-重构-react-的书写形式" aria-hidden="true">#</a> 4.2 重构 React 的书写形式</h3><p><strong>注意：</strong> 这个方式不一定推荐，只是用来开阔视野。</p><p>当我们写一个 React 组件的时候，一般结构形式如下；</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ContainerComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">fetchThings</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>PresentationalComponent <span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

ContainerComponent<span class="token punctuation">.</span>propTypes <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">fetchThings</span><span class="token operator">:</span> PropTypes<span class="token punctuation">.</span>func<span class="token punctuation">.</span>isRequired<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">mapStateToProps</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">things</span><span class="token operator">:</span> state<span class="token punctuation">.</span>things<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">mapDispatchToProps</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">dispatch</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">fetchThings</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">fetchThings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">selectThing</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">selectThing</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">blowShitUp</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">blowShitUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">connect</span><span class="token punctuation">(</span>mapStateToProps<span class="token punctuation">,</span> mapDispatchToProps<span class="token punctuation">)</span><span class="token punctuation">(</span>ContainerComponent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过建造者模式重构，我们可以将组件形式写成如下方式：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">ComponentBuilder</span><span class="token punctuation">(</span><span class="token string">&#39;ContainerComponent&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>PresentationalComponent <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span><span class="token function">fetchThings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">propTypes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">fetchThings</span><span class="token operator">:</span> PropTypes<span class="token punctuation">.</span>func<span class="token punctuation">.</span>isRequired<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mapStateToProps</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">things</span><span class="token operator">:</span> state<span class="token punctuation">.</span>things<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mapDispatchToProps</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">dispatch</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">fetchThings</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">fetchThings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">selectThing</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">selectThing</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">blowShitUp</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">blowShitUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至于建造者的实现，可以参见 [Github 代码](https://github.com/SHERlocked93/imooc-frontend-design-pattern/blob/20190704/10-建造者模式/10-08.builder react.js)，这里就不多加演示了～</p><h2 id="_5-建造者模式的优缺点" tabindex="-1"><a class="header-anchor" href="#_5-建造者模式的优缺点" aria-hidden="true">#</a> 5. 建造者模式的优缺点</h2><p>建造者模式的优点：</p><ol><li>使用建造者模式可以<strong>使产品的构建流程和产品的表现分离</strong>，也就是将产品的创建算法和产品组成的实现隔离，访问者不必知道产品部件实现的细节；</li><li><strong>扩展方便</strong>，如果希望生产一个装配顺序或方式不同的新产品，那么直接新建一个指挥者即可，不用修改既有代码，符合开闭原则；</li><li><strong>更好的复用性</strong>，建造者模式将产品的创建算法和产品组成的实现分离，所以产品创建的算法可以复用，产品部件的实现也可以复用，带来很大的灵活性；</li></ol><p>建造者模式的缺点：</p><ol><li>建造者模式一般适用于产品之间组成部件类似的情况，<strong>如果产品之间差异性很大、复用性不高</strong>，那么不要使用建造者模式；</li><li>实例的创建增加了许多额外的结构，无疑增加了许多复杂度，<strong>如果对象粒度不大</strong>，那么我们最好直接创建对象；</li></ol><h2 id="_6-建造者模式的适用场景" tabindex="-1"><a class="header-anchor" href="#_6-建造者模式的适用场景" aria-hidden="true">#</a> 6. 建造者模式的适用场景</h2><ol><li>相同的方法，不同的执行顺序，产生不一样的产品时，可以采用建造者模式；</li><li>产品的组成部件类似，通过组装不同的组件获得不同产品时，可以采用建造者模式；</li></ol><h2 id="_7-其他相关模式" tabindex="-1"><a class="header-anchor" href="#_7-其他相关模式" aria-hidden="true">#</a> 7. 其他相关模式</h2><h3 id="_7-1-建造者模式与工厂模式" tabindex="-1"><a class="header-anchor" href="#_7-1-建造者模式与工厂模式" aria-hidden="true">#</a> 7.1 建造者模式与工厂模式</h3><p>建造者模式和工厂模式最终都是创建一个完整的产品，但是在建造者模式中我们更关心对象创建的过程，将创建对象的方法模块化，从而更好地复用这些模块。</p><p>当然建造者模式与工厂模式也是可以组合使用的，比如建造者中一般会提供不同的部件实现，那么这里就可以使用工厂模式来提供具体的部件对象，再通过指挥者来进行装配。</p><h3 id="_7-2-建造者模式与模版方法模式" tabindex="-1"><a class="header-anchor" href="#_7-2-建造者模式与模版方法模式" aria-hidden="true">#</a> 7.2 建造者模式与模版方法模式</h3><p>指挥者的实现可以和模版方法模式相结合。也就是说，指挥者中部件的装配过程，可以使用模版方法模式来固定装配算法，把部件实现方法分为模板方法和基本方法，进一步提取公共代码，扩展可变部分。</p><p>是否采用模版方法模式看具体场景，如果产品的部件装配顺序很明确，但是具体的实现是未知的、灵活的，那么你可以适当考虑是否应该将算法骨架提取出来。</p><p>推介阅读</p>`,22),f={href:"https://medium.com/@jagardner2113/react-component-builder-pattern-5cb864ce5fc0",target:"_blank",rel:"noopener noreferrer"},_={href:"https://stackoverflow.com/questions/328496/when-would-you-use-the-builder-pattern",target:"_blank",rel:"noopener noreferrer"},T={href:"https://juejin.im/post/5b61b0f86fb9a04fd343af8f",target:"_blank",rel:"noopener noreferrer"};function C(q,j){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,r,k,d,v,n("blockquote",null,[n("p",null,[m,s(" 本文用到 ES6 的语法 "),n("a",b,[s("let/const"),t(a)]),s(" 、"),n("a",g,[s("Class"),t(a)]),s(" 等，如果还没接触过可以点击链接稍加学习 ~")])]),y,n("p",null,[s("这里用到了点正则的知识，如果不太理解的同学可以参见 "),n("a",h,[s("JS 正则表达式必知必会"),t(a)])]),w,n("ol",null,[n("li",null,[n("a",f,[s("React Component Builder Pattern – Jacob Gardner"),t(a)])]),n("li",null,[n("a",_,[s("Java - When would you use the Builder Pattern?"),t(a)])]),n("li",null,[n("a",T,[s("JS 正则表达式必知必会"),t(a)])])])])}const P=e(l,[["render",C],["__file","index-10.html.vue"]]);export{P as default};
