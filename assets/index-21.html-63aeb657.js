import{_ as p,M as e,p as c,q as o,R as n,t as s,N as t,a1 as i}from"./framework-e8cb8151.js";const l="/assets/image-20230811151007944-bba66120.png",u="/assets/image-20230811151045470-ff3718d3.png",k={},d=n("h1",{id:"_21-模板方法模式-咖啡厅制作咖啡",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_21-模板方法模式-咖啡厅制作咖啡","aria-hidden":"true"},"#"),s(" 21-模板方法模式：咖啡厅制作咖啡")],-1),r=n("p",null,[n("img",{src:"https://img3.mukewang.com/5d2fd44b0001b81006400359.jpg",alt:"img"})],-1),v=n("blockquote",null,[n("p",null,"智慧，不是死的默念，而是生的沉思。 ——斯宾诺莎")],-1),m=n("p",null,[n("strong",null,"模板方法模式"),s("（Template Method Pattern）父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时，重新定义算法中的某些实现步骤。模板方法模式的关键是"),n("strong",null,"算法步骤的骨架和具体实现分离"),s("。")],-1),b=n("strong",null,"注意：",-1),f={href:"http://es6.ruanyifeng.com/#docs/let",target:"_blank",rel:"noopener noreferrer"},w={href:"http://es6.ruanyifeng.com/#docs/function",target:"_blank",rel:"noopener noreferrer"},g=i('<h2 id="_1-你曾见过的模板方法模式" tabindex="-1"><a class="header-anchor" href="#_1-你曾见过的模板方法模式" aria-hidden="true">#</a> 1. 你曾见过的模板方法模式</h2><p>这里举个经典的咖啡厅例子，咖啡厅制作饮料的过程有一些类似的步骤：</p><ol><li>先把水煮沸</li><li>冲泡饮料（咖啡、茶、牛奶）</li><li>倒进杯子中</li><li>最后加一些调味料（咖啡伴侣、枸杞、糖）</li></ol><p>无论冲饮的是咖啡、茶、牛奶，他们的制作过程都类似，可以被总结为这几个流程。也就是说这个流程是存在着类似的流程结构的，这就给我们留下了将操作流程抽象封装出来的余地。</p><p><img src="'+l+`" alt="image-20230811151007944"></p><p>再举个栗子，做菜的过程也可以被总结为固定的几个步骤：</p><ol><li>准备食材（肉、蔬菜、菌菇）</li><li>食材放到锅里</li><li>放调味料（糖、盐、油）</li><li>炒菜</li><li>倒到容器里（盘子、碗）</li></ol><p>在类似的场景中，这些例子都有这些特点：</p><ol><li>有一个基本的操作流程，这个流程我们可以抽象出来，由具体实例的操作流程来实现，比如做咖啡的时候冲泡的就是咖啡，做茶的时候冲泡的就是茶；</li><li>一些共用的流程，就可以使用通用的公共步骤，比如把水煮沸，比如将食材放到锅里，这样的共用流程就可以共用一个具体方法就可以了；</li></ol><h2 id="_2-实例的代码实现" tabindex="-1"><a class="header-anchor" href="#_2-实例的代码实现" aria-hidden="true">#</a> 2. 实例的代码实现</h2><p>如果你已经看过<strong>抽象工厂模式</strong>，那么你对 JavaScript 中面向对象的方式提取公共结构应该比较熟悉了，这里再复习一下。JavaScript 中可以使用下面的方式来模拟抽象类：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 抽象类，ES6 class 方式 */</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面实现一下咖啡厅例子。</p><p>首先我们使用<strong>原型继承</strong>的方式：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 饮料类，父类，也是抽象类 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">Beverage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> Beverage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 烧开水，共用方法 */</span>
<span class="token class-name">Beverage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">boilWater</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;水已经煮沸&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 冲泡饮料，抽象方法 */</span>
<span class="token class-name">Beverage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">brewDrink</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 倒杯子里，共用方法 */</span>
<span class="token class-name">Beverage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">pourCup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;倒进杯子里&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 加调味品，抽象方法 */</span>
<span class="token class-name">Beverage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">addCondiment</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 制作流程，模板方法 */</span>
<span class="token class-name">Beverage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">boilWater</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pourCup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addCondiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 咖啡类，子类 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">Coffee</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Coffee</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Beverage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">/* 冲泡饮料，实现抽象方法 */</span>
<span class="token class-name">Coffee</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">brewDrink</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;冲泡咖啡&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 加调味品，实现抽象方法 */</span>
<span class="token class-name">Coffee</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">addCondiment</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;加点咖啡伴侣&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Coffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
coffee<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 输出：水已经煮沸</span>
<span class="token comment">// 输出：冲泡咖啡</span>
<span class="token comment">// 输出：倒进杯子里</span>
<span class="token comment">// 输出：加点咖啡伴侣</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用 ES6 的 class 方式来改写一下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 饮料类，父类 */</span>
<span class="token keyword">class</span> <span class="token class-name">Beverage</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> Beverage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 烧开水，共用方法 */</span>
  <span class="token function">boilWater</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;水已经煮沸&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 冲泡饮料，抽象方法 */</span>
  <span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 倒杯子里，共用方法 */</span>
  <span class="token function">pourCup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;倒进杯子里&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 加调味品，抽象方法 */</span>
  <span class="token function">addCondiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 制作流程，模板方法 */</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">boilWater</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pourCup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addCondiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 咖啡类，子类 */</span>
<span class="token keyword">class</span> <span class="token class-name">Coffee</span> <span class="token keyword">extends</span> <span class="token class-name">Beverage</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 冲泡饮料，实现抽象方法 */</span>
  <span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;冲泡咖啡&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 加调味品，实现抽象方法 */</span>
  <span class="token function">addCondiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;加点咖啡伴侣&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Coffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
coffee<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 输出：水已经煮沸</span>
<span class="token comment">// 输出：冲泡咖啡</span>
<span class="token comment">// 输出：倒进杯子里</span>
<span class="token comment">// 输出：加点咖啡伴侣</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要创建一个新的饮料，那么增加一个新的实例类，并实现父类中的抽象方法。如果不实现就去调用 <code>init</code> 方法即报错：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 接上一段代码</span>
<span class="token comment">/* 茶类，子类 */</span>
<span class="token keyword">class</span> <span class="token class-name">Tea</span> <span class="token keyword">extends</span> <span class="token class-name">Beverage</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 冲泡饮料，实现抽象方法 */</span>
  <span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;冲泡茶&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 注意这里，没有实现加调味品抽象方法 */</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> tea <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Tea</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
tea<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 输出：水已经煮沸</span>
<span class="token comment">// 输出：冲泡茶</span>
<span class="token comment">// 输出：倒进杯子里</span>
<span class="token comment">// Error: 抽象方法不能调用!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么这样就把冲泡饮料的流程框架抽象到了 <code>init</code> 方法中，在实例类中实现对应抽象方法，调用实例的 <code>init</code> 方法时就会调用覆盖后的实例方法，实现可变流程的扩展。</p><p>在灵活的 JavaScript 中，其实我们还可以使用<strong>默认参数</strong>来间接实现：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 虚拟方法 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">abstractFunc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 饮料方法，方法体就是模板方法，即上面的 init() */</span>
<span class="token keyword">function</span> <span class="token function">BeverageFunc</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">boilWater</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 烧开水，共用方法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;水已经煮沸&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  brewDrink <span class="token operator">=</span> abstractFunc<span class="token punctuation">,</span> <span class="token comment">// 冲泡饮料，抽象方法</span>
  <span class="token function-variable function">pourCup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 倒杯子里，共用方法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;倒进杯子里&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  addCondiment <span class="token operator">=</span> abstractFunc<span class="token punctuation">,</span> <span class="token comment">// 加调味品，抽象方法</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">boilWater</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">pourCup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">addCondiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 制作咖啡 */</span>
<span class="token function">BeverageFunc</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">/* 冲泡饮料，实现抽象方法 */</span>
  <span class="token function-variable function">brewDrink</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;水已经煮沸&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">/* 加调味品，实现抽象方法 */</span>
  <span class="token function-variable function">addCondiment</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;加点咖啡伴侣&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 输出：水已经煮沸</span>
<span class="token comment">// 输出：冲泡咖啡</span>
<span class="token comment">// 输出：倒进杯子里</span>
<span class="token comment">// 输出：加点咖啡伴侣</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这样实现语义化并不太好，我们可以把默认参数用在构造函数中，这样可以使用 <code>new</code> 关键字来创建实例，语义化良好，也符合直觉：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 虚拟方法 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">abstractFunc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 饮料方法 */</span>
<span class="token keyword">class</span> <span class="token class-name">Beverage</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    brewDrink <span class="token operator">=</span> abstractFunc<span class="token punctuation">,</span> <span class="token comment">// 冲泡饮料，抽象方法</span>
    addCondiment <span class="token operator">=</span> abstractFunc<span class="token punctuation">,</span> <span class="token comment">// 加调味品，抽象方法</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>brewDrink <span class="token operator">=</span> brewDrink
    <span class="token keyword">this</span><span class="token punctuation">.</span>addCondiment <span class="token operator">=</span> addCondiment
  <span class="token punctuation">}</span>

  <span class="token comment">/* 烧开水，共用方法 */</span>
  <span class="token function">boilWater</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;水已经煮沸&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 倒杯子里，共用方法 */</span>
  <span class="token function">pourCup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;倒进杯子里&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 模板方法 */</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">boilWater</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">brewDrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pourCup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addCondiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 咖啡 */</span>
<span class="token keyword">const</span> coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Beverage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">/* 冲泡饮料，覆盖抽象方法 */</span>
  <span class="token function-variable function">brewDrink</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;水已经煮沸&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">/* 加调味品，覆盖抽象方法 */</span>
  <span class="token function-variable function">addCondiment</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;加点咖啡伴侣&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

coffee<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 执行模板方法</span>

<span class="token comment">// 输出：水已经煮沸</span>
<span class="token comment">// 输出：冲泡咖啡</span>
<span class="token comment">// 输出：倒进杯子里</span>
<span class="token comment">// 输出：加点咖啡伴侣</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样通过构造函数默认参数来实现类似于继承的功能。</p><h2 id="_3-模板方法模式的通用实现" tabindex="-1"><a class="header-anchor" href="#_3-模板方法模式的通用实现" aria-hidden="true">#</a> 3. 模板方法模式的通用实现</h2><p>根据上面的例子，我们可以提炼一下模板方法模式。饮料类可以被认为是父类（AbstractClass），父类中实现了模板方法（templateMethod），模板方法中抽象了操作的流程，共用的操作流程是普通方法，而非共用的可变方法是抽象方法，需要被子类（ConcreteClass）实现，或者说覆盖，子类在实例化后执行模板方法，就可以按照模板方法定义好的算法一步步执行。主要有下面几个概念：</p><ol><li><strong>AbstractClass</strong> ：抽象父类，把一些共用的方法提取出来，把可变的方法作为抽象类，最重要的是把算法骨架抽象出来为模板方法；</li><li><strong>templateMethod</strong> ：模板方法，固定了希望执行的算法骨架；</li><li><strong>ConcreteClass</strong> ：子类，实现抽象父类中定义的抽象方法，调用继承的模板方法时，将执行模板方法中定义的算法流程；</li></ol><p>结构大概如下：</p><p><img src="`+u+`" alt="image-20230811151045470"></p><p>下面用通用的方法实现，这里直接用 class 语法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 抽象父类 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 共用方法 */</span>
  <span class="token function">operate1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;operate1&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">operate2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 模板方法 */</span>
  <span class="token function">templateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">operate1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">operate2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 实例子类，继承抽象父类 */</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteClass</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 覆盖抽象方法 operate2 */</span>
  <span class="token function">operate2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;operate2&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
instance<span class="token punctuation">.</span><span class="token function">templateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 输出：operate1</span>
<span class="token comment">// 输出：operate2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上面介绍的默认参数的方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 虚拟方法 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">abstractFunc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 饮料方法 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractClass</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    operate2 <span class="token operator">=</span> abstractFunc<span class="token punctuation">,</span> <span class="token comment">// 抽象方法</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>operate2 <span class="token operator">=</span> operate2
  <span class="token punctuation">}</span>

  <span class="token comment">/* 共用方法 */</span>
  <span class="token function">operate1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;operate1&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 模板方法 */</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">operate1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">operate2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 实例 */</span>
<span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbstractClass</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">/* 覆盖抽象方法 */</span>
  <span class="token function-variable function">operate2</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;operate2&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

instance<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 输出：operate1</span>
<span class="token comment">// 输出：operate2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以不用构造函数的默认参数，使用高阶函数也是可以的，毕竟 JavaScript 如此灵活。</p><h2 id="_4-模板方法模式的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-模板方法模式的优缺点" aria-hidden="true">#</a> 4. 模板方法模式的优缺点</h2><p>模板方法模式的优点：</p><ol><li><strong>封装了不变部分，扩展可变部分，</strong> 把算法中不变的部分封装到父类中直接实现，而可变的部分由子类继承后再具体实现；</li><li><strong>提取了公共代码部分，易于维护，</strong> 因为公共的方法被提取到了父类，那么如果我们需要修改算法中不变的步骤时，不需要到每一个子类中去修改，只要改一下对应父类即可；</li><li><strong>行为被父类的模板方法固定，</strong> 子类实例只负责执行模板方法，具备可扩展性，符合开闭原则；</li></ol><p>模板方法模式的缺点：<strong>增加了系统复杂度</strong>，主要是增加了的抽象类和类间联系，需要做好文档工作；</p><h2 id="_5-模板方法模式的使用场景" tabindex="-1"><a class="header-anchor" href="#_5-模板方法模式的使用场景" aria-hidden="true">#</a> 5. 模板方法模式的使用场景</h2><ol><li>如果知道一个算法所需的关键步骤，而且<strong>很明确这些步骤的执行顺序，但是具体的实现是未知的、灵活的</strong>，那么这时候就可以使用模板方法模式来<strong>将算法步骤的框架抽象出来</strong>；</li><li>重要而复杂的算法，可以<strong>把核心算法逻辑设计为模板方法</strong>，周边相关细节功能由各个子类实现；</li><li>模板方法模式可以被用来将<strong>子类组件将自己的方法挂钩到高层组件中</strong>，也就是钩子，子类组件中的方法交出控制权，高层组件在模板方法中决定何时回调子类组件中的方法，类似的用法场景还有发布-订阅模式、回调函数；</li></ol><h2 id="_6-其他相关模式" tabindex="-1"><a class="header-anchor" href="#_6-其他相关模式" aria-hidden="true">#</a> 6. 其他相关模式</h2><h3 id="_6-1-模板方法模式与工厂模式" tabindex="-1"><a class="header-anchor" href="#_6-1-模板方法模式与工厂模式" aria-hidden="true">#</a> 6.1 模板方法模式与工厂模式</h3><p>模板方法模式的实现可以使用工厂模式来获取所需的对象。</p><p>另外，模板方法模式和抽象工厂模式比较类似，都是使用抽象类来提取公共部分，不一样的是：</p><ol><li><strong>抽象工厂模式</strong> 提取的是实例的功能结构；</li><li><strong>模板方法模式</strong> 提取的是算法的骨架结构；</li></ol><h3 id="_6-2-模板方法模式与策略模式" tabindex="-1"><a class="header-anchor" href="#_6-2-模板方法模式与策略模式" aria-hidden="true">#</a> 6.2 模板方法模式与策略模式</h3><p>参见策略模式介绍。</p>`,48);function y(h,_){const a=e("ExternalLinkIcon");return c(),o("div",null,[d,r,v,m,n("blockquote",null,[n("p",null,[b,s(" 本文可能用到一些 ES6 的语法 "),n("a",f,[s("let/const"),t(a)]),s(" ，"),n("a",w,[s("函数参数的默认值"),t(a)]),s(" 等，如果还没接触过可以点击链接稍加学习 ~")])]),g])}const x=p(k,[["render",y],["__file","index-21.html.vue"]]);export{x as default};
