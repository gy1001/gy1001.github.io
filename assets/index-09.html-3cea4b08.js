import{_ as p,M as e,p as o,q as c,R as n,t as s,N as t,a1 as l}from"./framework-e8cb8151.js";const i={},u=n("h1",{id:"_09-抽象工厂模式-又去小餐馆下馆子",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_09-抽象工厂模式-又去小餐馆下馆子","aria-hidden":"true"},"#"),s(" 09-抽象工厂模式：又去小餐馆下馆子")],-1),r=n("p",null,[n("img",{src:"https://img4.mukewang.com/5d11def100016edf06400359.jpg",alt:"img"})],-1),k=n("blockquote",null,[n("p",null,"机遇只偏爱那些有准备的头脑。 ——巴斯德")],-1),d=n("p",null,[n("strong",null,"工厂模式"),s(" （Factory Pattern），根据输入的不同返回不同类的实例，一般用来创建同一类对象。工厂方式的主要思想是"),n("strong",null,"将对象的创建与对象的实现分离"),s("。")],-1),v=n("strong",null,"注意：",-1),m={href:"http://es6.ruanyifeng.com/#docs/let",target:"_blank",rel:"noopener noreferrer"},b={href:"http://es6.ruanyifeng.com/#docs/class",target:"_blank",rel:"noopener noreferrer"},w={href:"http://es6.ruanyifeng.com/#docs/destructuring",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,[n("strong",null,"抽象工厂"),s(" （Abstract Factory）：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不是负责创建某一类产品的实例。关键在于使用抽象类制定了实例的结构，调用者直接面向实例的结构编程，"),n("strong",null,"从实例的具体实现中解耦"),s("。")],-1),g=n("p",null,"我们知道 JavaScript 并不是强面向对象语言，所以使用传统编译型语言比如 JAVA、C#、C++ 等实现的设计模式和 JavaScript 不太一样，比如 JavaScript 中没有原生的类和接口等（不过 ES6+ 渐渐提供类似的语法糖），我们可以用变通的方式来解决。最重要的是设计模式背后的核心思想，和它所要解决的问题。",-1),h=n("strong",null,"注意：",-1),f={href:"http://es6.ruanyifeng.com/#docs/let",target:"_blank",rel:"noopener noreferrer"},_={href:"http://es6.ruanyifeng.com/#docs/class",target:"_blank",rel:"noopener noreferrer"},E={href:"http://es6.ruanyifeng.com/#docs/destructuring",target:"_blank",rel:"noopener noreferrer"},D=n("p",null,[s("另外，本文建议在上一章"),n("strong",null,"工厂模式"),s("之后阅读。")],-1),x=l(`<h2 id="_1-你曾见过的抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#_1-你曾见过的抽象工厂模式" aria-hidden="true">#</a> 1. 你曾见过的抽象工厂模式</h2><p>还是使用上一节工厂模式中使用的饭店例子。</p><p>你再次来到了小区的饭店，跟老板说来一份鱼香肉丝，来一份宫保鸡丁，来一份番茄鸡蛋汤，来一份排骨汤（今天可能比较想喝汤）。无论什么样的菜，还是什么样的汤，他们都具有同样的属性，比如菜都可以吃，汤都可以喝。所以我们不论拿到什么菜，都可以吃，而不论拿到什么汤，都可以喝。对于饭店也一样，这个饭店可以做菜做汤，另一个饭店也可以，那么这两个饭店就具有同样的功能结构。</p><p>上面的场景都是属于抽象工厂模式的例子。菜类属于抽象产品类，制定具体产品菜类所具备的属性，而饭店和之前的工厂模式一样，负责具体生产产品实例，访问者通过老板获取想拿的产品。只要我们点的是汤类，即使还没有被做出来，我们就知道是可以喝的。推广一下，饭店功能也可以被抽象（抽象饭店类），继承这个类的饭店实例都具有做菜和做汤的功能，这样也完成了抽象类对实例的结构约束。</p><p>在类似场景中，这些例子有特点：只要实现了抽象类的实例，都实现了抽象类制定的结构；</p><h2 id="_2-实例的代码实现" tabindex="-1"><a class="header-anchor" href="#_2-实例的代码实现" aria-hidden="true">#</a> 2. 实例的代码实现</h2><p>我们知道 JavaScript 并不强面向对象，也没有提供抽象类（至少目前没有提供），但是可以模拟抽象类。用对 <code>new.target</code> 来判断 <code>new</code> 的类，在父类方法中 <code>throw new Error()</code>，如果子类中没有实现这个方法就会抛错，这样来模拟抽象类：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 抽象类，ES6 class 方式 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractClass1</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractClass1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 抽象类，ES5 构造函数方式 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">AbstractClass2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractClass2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 抽象方法，使用原型方式添加 */</span>
<span class="token class-name">AbstractClass2</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">operate</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面用 JavaScript 将上面介绍的饭店例子实现一下。</p><p>首先使用原型方式：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 饭店方法 */</span>
<span class="token keyword">function</span> <span class="token function">Restaurant</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Restaurant<span class="token punctuation">.</span><span class="token function-variable function">orderDish</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;鱼香肉丝&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">YuXiangRouSi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token string">&#39;宫保鸡丁&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GongBaoJiDing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token string">&#39;紫菜蛋汤&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ZiCaiDanTang</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;本店没有这个 -。-&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 菜品抽象类 */</span>
<span class="token keyword">function</span> <span class="token function">Dish</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">=</span> <span class="token string">&#39;菜&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 抽象方法 */</span>
<span class="token class-name">Dish</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 鱼香肉丝类 */</span>
<span class="token keyword">function</span> <span class="token function">YuXiangRouSi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;鱼香肉丝&#39;</span>
<span class="token punctuation">}</span>

<span class="token class-name">YuXiangRouSi</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dish</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token class-name">YuXiangRouSi</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 真香~&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 宫保鸡丁类 */</span>
<span class="token keyword">function</span> <span class="token function">GongBaoJiDing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;宫保鸡丁&#39;</span>
<span class="token punctuation">}</span>

<span class="token class-name">GongBaoJiDing</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dish</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token class-name">GongBaoJiDing</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 让我想起了外婆做的菜~&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dish1 <span class="token operator">=</span> Restaurant<span class="token punctuation">.</span><span class="token function">orderDish</span><span class="token punctuation">(</span><span class="token string">&#39;鱼香肉丝&#39;</span><span class="token punctuation">)</span>
dish1<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> dish2 <span class="token operator">=</span> Restaurant<span class="token punctuation">.</span><span class="token function">orderDish</span><span class="token punctuation">(</span><span class="token string">&#39;红烧排骨&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 输出: 菜 - 鱼香肉丝 真香~</span>
<span class="token comment">// 输出: Error 本店没有这个 -。-</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 class 语法改写一下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 饭店方法 */</span>
<span class="token keyword">class</span> <span class="token class-name">Restaurant</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">orderDish</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;鱼香肉丝&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">YuXiangRouSi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">case</span> <span class="token string">&#39;宫保鸡丁&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GongBaoJiDin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;本店没有这个 -。-&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 菜品抽象类 */</span>
<span class="token keyword">class</span> <span class="token class-name">Dish</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> Dish<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">=</span> <span class="token string">&#39;菜&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 鱼香肉丝类 */</span>
<span class="token keyword">class</span> <span class="token class-name">YuXiangRouSi</span> <span class="token keyword">extends</span> <span class="token class-name">Dish</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;鱼香肉丝&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 真香~&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 宫保鸡丁类 */</span>
<span class="token keyword">class</span> <span class="token class-name">GongBaoJiDin</span> <span class="token keyword">extends</span> <span class="token class-name">Dish</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;宫保鸡丁&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 让我想起了外婆做的菜~&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dish0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dish</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出: Error 抽象方法不能调用!</span>
<span class="token keyword">const</span> dish1 <span class="token operator">=</span> Restaurant<span class="token punctuation">.</span><span class="token function">orderDish</span><span class="token punctuation">(</span><span class="token string">&#39;鱼香肉丝&#39;</span><span class="token punctuation">)</span>
dish1<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出: 菜 - 鱼香肉丝 真香~</span>
<span class="token keyword">const</span> dish2 <span class="token operator">=</span> Restaurant<span class="token punctuation">.</span><span class="token function">orderDish</span><span class="token punctuation">(</span><span class="token string">&#39;红烧排骨&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出: Error 本店没有这个 -。-</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 <code>Dish</code> 类就是抽象产品类，继承该类的子类需要实现它的方法 <code>eat</code>。</p><p>上面的实现将产品的功能结构抽象出来成为抽象产品类。事实上我们还可以更进一步，将工厂类也使用抽象类约束一下，也就是抽象工厂类，比如这个饭店可以做菜和汤，另一个饭店也可以做菜和汤，存在共同的功能结构，就可以将共同结构作为抽象类抽象出来，实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 饭店 抽象类，饭店都可以做菜和汤 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractRestaurant</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractRestaurant<span class="token punctuation">)</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>signborad <span class="token operator">=</span> <span class="token string">&#39;饭店&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法：创建菜 */</span>
  <span class="token function">createDish</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法：创建汤 */</span>
  <span class="token function">createSoup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 具体饭店类 */</span>
<span class="token keyword">class</span> <span class="token class-name">Restaurant</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractRestaurant</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">createDish</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;鱼香肉丝&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">YuXiangRouSi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">case</span> <span class="token string">&#39;宫保鸡丁&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GongBaoJiDing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;本店没这个菜&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">createSoup</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;紫菜蛋汤&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ZiCaiDanTang</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;本店没这个汤&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 菜 抽象类，菜都有吃的功能 eat */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractDish</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractDish<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">=</span> <span class="token string">&#39;菜&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 菜 鱼香肉丝类 */</span>
<span class="token keyword">class</span> <span class="token class-name">YuXiangRouSi</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractDish</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;鱼香肉丝&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 真香~&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 菜 宫保鸡丁类 */</span>
<span class="token keyword">class</span> <span class="token class-name">GongBaoJiDing</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractDish</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;宫保鸡丁&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 让我想起了外婆做的菜~&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 汤 抽象类，汤都有喝的功能 drink */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractSoup</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractDish<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">=</span> <span class="token string">&#39;汤&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">drink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 汤 紫菜蛋汤类 */</span>
<span class="token keyword">class</span> <span class="token class-name">ZiCaiDanTang</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractSoup</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;紫菜蛋汤&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">drink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">+</span> <span class="token string">&#39; 我从小喝到大~&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> restaurant <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Restaurant</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> soup1 <span class="token operator">=</span> restaurant<span class="token punctuation">.</span><span class="token function">createSoup</span><span class="token punctuation">(</span><span class="token string">&#39;紫菜蛋汤&#39;</span><span class="token punctuation">)</span>
soup1<span class="token punctuation">.</span><span class="token function">drink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出: 汤 - 紫菜蛋汤 我从小喝到大~</span>
<span class="token keyword">const</span> dish1 <span class="token operator">=</span> restaurant<span class="token punctuation">.</span><span class="token function">createDish</span><span class="token punctuation">(</span><span class="token string">&#39;鱼香肉丝&#39;</span><span class="token punctuation">)</span>
dish1<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出: 菜 - 鱼香肉丝 真香~</span>
<span class="token keyword">const</span> dish2 <span class="token operator">=</span> restaurant<span class="token punctuation">.</span><span class="token function">createDish</span><span class="token punctuation">(</span><span class="token string">&#39;红烧排骨&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出: Error 本店没有这个 -。-</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样如果创建新的饭店，新的饭店继承这个抽象饭店类，那么也要实现抽象饭店类，这样就都具有抽象饭店类制定的结构。</p><h2 id="_3-抽象工厂模式的通用实现" tabindex="-1"><a class="header-anchor" href="#_3-抽象工厂模式的通用实现" aria-hidden="true">#</a> 3. 抽象工厂模式的通用实现</h2><p>我们提炼一下抽象工厂模式，饭店还是工厂（Factory），菜品种类是抽象类（AbstractFactory），而实现抽象类的菜品是具体的产品（Product），通过工厂拿到实现了不同抽象类的产品，这些产品可以根据实现的抽象类被区分为类簇。主要有下面几个概念：</p><ol><li><strong>Factory</strong> ：工厂，负责返回产品实例；</li><li><strong>AbstractFactory</strong> ：虚拟工厂，制定工厂实例的结构；</li><li><strong>Product</strong> ：产品，访问者从工厂中拿到的产品实例，实现抽象类；</li><li><strong>AbstractProduct</strong> ：产品抽象类，由具体产品实现，制定产品实例的结构；</li></ol><p>概略图如下：</p><p><img src="http://img.mukewang.com/5d1321610001a09511590468.png" alt="图片描述"> 下面是通用的实现，原型方式略过：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 工厂 抽象类 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractFactory<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">createProduct1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 具体饭店类 */</span>
<span class="token keyword">class</span> <span class="token class-name">Factory</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">createProduct1</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;Product1&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Product1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">case</span> <span class="token string">&#39;Product2&#39;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Product2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;当前没有这个产品 -。-&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 抽象产品类 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractProduct</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractProduct<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">=</span> <span class="token string">&#39;抽象产品类1&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 具体产品类1 */</span>
<span class="token keyword">class</span> <span class="token class-name">Product1</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractProduct</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;Product1&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 具体产品类2 */</span>
<span class="token keyword">class</span> <span class="token class-name">Product2</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractProduct</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;Product2&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39; - &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> prod1 <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createProduct1</span><span class="token punctuation">(</span><span class="token string">&#39;Product1&#39;</span><span class="token punctuation">)</span>
prod1<span class="token punctuation">.</span><span class="token function">operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出: 抽象产品类1 - Product1</span>
<span class="token keyword">const</span> prod2 <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createProduct1</span><span class="token punctuation">(</span><span class="token string">&#39;Product3&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出: Error 当前没有这个产品 -。-</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果希望增加第二个类簇的产品，除了需要改一下对应工厂类之外，还需要增加一个抽象产品类，并在抽象产品类基础上扩展新的产品。</p><p>我们在实际使用的时候不一定需要每个工厂都继承抽象工厂类，比如只有一个工厂的话我们可以直接使用工厂模式，在实战中灵活使用。</p><h2 id="_4-抽象工厂模式的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-抽象工厂模式的优缺点" aria-hidden="true">#</a> 4. 抽象工厂模式的优缺点</h2><p>抽象模式的优点：抽象产品类将产品的结构抽象出来，访问者不需要知道产品的具体实现，只需要面向产品的结构编程即可，<strong>从产品的具体实现中解耦</strong>；</p><p>抽象模式的缺点：</p><ol><li><strong>扩展新类簇的产品类比较困难</strong>，因为需要创建新的抽象产品类，并且还要修改工厂类，违反开闭原则；</li><li>带来了<strong>系统复杂度</strong>，增加了新的类，和新的继承关系；</li></ol><h2 id="_5-抽象工厂模式的使用场景" tabindex="-1"><a class="header-anchor" href="#_5-抽象工厂模式的使用场景" aria-hidden="true">#</a> 5. 抽象工厂模式的使用场景</h2><p>如果一组实例都有相同的结构，那么就可以使用抽象工厂模式。</p><h2 id="_6-其他相关模式" tabindex="-1"><a class="header-anchor" href="#_6-其他相关模式" aria-hidden="true">#</a> 6. 其他相关模式</h2><h3 id="_6-1-抽象工厂模式与工厂模式" tabindex="-1"><a class="header-anchor" href="#_6-1-抽象工厂模式与工厂模式" aria-hidden="true">#</a> 6.1 抽象工厂模式与工厂模式</h3><p>工厂模式和抽象工厂模式的区别：</p><ol><li><strong>工厂模式</strong> 主要关注单独的产品实例的创建；</li><li><strong>抽象工厂模式</strong> 主要关注产品类簇实例的创建，如果产品类簇只有一个产品，那么这时的抽象工厂模式就退化为工厂模式了；</li></ol><p>根据场景灵活使用即可。</p>`,36);function A(S,P){const a=e("ExternalLinkIcon");return o(),c("div",null,[u,r,k,d,n("blockquote",null,[n("p",null,[v,s(" 本文用到 ES6 的语法 "),n("a",m,[s("let/const"),t(a)]),s(" 、"),n("a",b,[s("Class"),t(a)]),s("、"),n("a",w,[s("变量的解构赋值"),t(a)]),s(" 等，如果还没接触过可以点击链接稍加学习 ~")])]),y,g,n("blockquote",null,[n("p",null,[h,s(" 本文用到 ES6 的语法 "),n("a",f,[s("let/const"),t(a)]),s(" 、"),n("a",_,[s("Class"),t(a)]),s("、"),n("a",E,[s("变量的解构赋值"),t(a)]),s(" 等，如果还没接触过可以点击链接稍加学习 ~")]),D]),x])}const j=p(i,[["render",A],["__file","index-09.html.vue"]]);export{j as default};
