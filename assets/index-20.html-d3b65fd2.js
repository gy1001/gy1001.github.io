import{_ as e,M as c,p as o,q as l,R as s,t as n,N as t,a1 as p}from"./framework-e8cb8151.js";const i="/assets/image-20230811145428539-9b4f5f3f.png",u="/assets/image-20230811145450037-a25f632b.png",r={},k=p('<h1 id="_20-状态模式-交通灯" tabindex="-1"><a class="header-anchor" href="#_20-状态模式-交通灯" aria-hidden="true">#</a> 20-状态模式：交通灯</h1><p><img src="https://img1.mukewang.com/5d2fd3dc000101fc06400359.jpg" alt="img"></p><blockquote><p>时间像海绵里的水，只要你愿意挤，总还是有的。 ——鲁迅</p></blockquote><p><strong>状态模式</strong> （State Pattern）允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类，类的行为随着它的状态改变而改变。</p><p>当程序需要根据不同的外部情况来做出不同操作时，最直接的方法就是使用 <code>switch-case</code> 或 <code>if-else</code> 语句将这些可能发生的情况全部兼顾到，但是这种做法应付复杂一点的状态判断时就有点力不从心，开发者得找到合适的位置添加或修改代码，这个过程很容易出错，这时引入状态模式可以某种程度上缓解这个问题。</p>',5),d=s("strong",null,"注意：",-1),v={href:"https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},m={href:"http://es6.ruanyifeng.com/#docs/let",target:"_blank",rel:"noopener noreferrer"},b={href:"http://es6.ruanyifeng.com/#docs/class",target:"_blank",rel:"noopener noreferrer"},f={href:"http://es6.ruanyifeng.com/#docs/function",target:"_blank",rel:"noopener noreferrer"},g=p('<h2 id="_1-你曾见过的状态模式" tabindex="-1"><a class="header-anchor" href="#_1-你曾见过的状态模式" aria-hidden="true">#</a> 1. 你曾见过的状态模式</h2><p>等红绿灯的时候，红绿灯的状态和行人汽车的通行逻辑是有关联的：</p><ol><li>红灯亮：行人通行，车辆等待；</li><li>绿灯亮：行人等待，车辆通行；</li><li>黄灯亮：行人等待，车辆等待；</li></ol><p><img src="'+i+`" alt="image-20230811145428539"></p><p>还有下载文件的时候，就有好几个状态，比如下载验证、下载中、暂停下载、下载完毕、失败，文件在不同状态下表现的行为也不一样，比如下载中时显示可以暂停下载和下载进度，下载失败时弹框提示并询问是否重新下载等等。类似的场景还有很多，比如电灯的开关状态、电梯的运行状态等，女生作为你的朋友、好朋友、女朋友、老婆等不同状态的时候，行为也不同 。</p><p>在这些场景中，有以下特点：</p><ol><li>对象有有限多个状态，且状态间可以相互切换；</li><li>各个状态和对象的行为逻辑有比较强的对应关系，即在不同状态时，对应的处理逻辑不一样；</li></ol><h2 id="_2-实例的代码实现" tabindex="-1"><a class="header-anchor" href="#_2-实例的代码实现" aria-hidden="true">#</a> 2. 实例的代码实现</h2><p>我们使用 JavaScript 来将上面的交通灯例子实现一下。</p><p>先用 IIFE 的方式：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 反模式，不推介</span>
<span class="token keyword">var</span> trafficLight <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> state <span class="token operator">=</span> <span class="token string">&#39;绿灯&#39;</span> <span class="token comment">// 闭包缓存状态</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 设置交通灯状态 */</span>
    <span class="token function-variable function">setState</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> <span class="token string">&#39;红灯&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token string">&#39;红灯&#39;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 红色，行人通行 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> <span class="token string">&#39;黄灯&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token string">&#39;黄灯&#39;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 黄色，行人等待 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> <span class="token string">&#39;绿灯&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token string">&#39;绿灯&#39;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 绿色，行人等待 &amp; 车辆通行&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯还有这颜色？&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">/* 获取交通灯状态 */</span>
    <span class="token function-variable function">getState</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> state
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">&#39;红灯&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 红色，行人通行 &amp; 车辆等待</span>
trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">&#39;黄灯&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 黄色，行人等待 &amp; 车辆等待</span>
trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">&#39;绿灯&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 绿色，行人等待 &amp; 车辆通行</span>

trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">&#39;紫灯&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯还有这颜色？</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模块模式里面通过 <code>if-else</code> 来区分不同状态的处理逻辑，也可以使用 <code>switch-case</code>，如果对模块模式不了解的，可以看一下本专栏第 27 篇，专门对模块模式进行了探讨。</p><p>但是这个实现存在有问题，这里的处理逻辑还不够复杂，如果复杂的话，在添加新的状态时，比如增加了 <code>蓝灯</code>、<code>紫灯</code> 等颜色及其处理逻辑的时候，需要到 <code>setState</code> 方法里找到对应地方修改。在实际项目中，<code>if-else</code> 伴随的业务逻辑处理通常比较复杂，找到要修改的状态就不容易，特别是如果是别人的代码，或者接手遗留项目时，需要看完这个 <code>if-else</code> 的分支处理逻辑，新增或修改分支逻辑的过程中也很容易引入 Bug。</p><p>那有没有什么方法可以方便地维护状态及其对应行为，又可以不用维护一个庞大的分支判断逻辑呢。这就引入了状态模式的理念，状态模式把每种状态和对应的处理逻辑封装在一起（后文为了统一，统称封装到状态类中），比如下面我们用一个类实例将逻辑封装起来：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 抽象状态类 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">AbstractState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">/* 抽象方法 */</span>
<span class="token class-name">AbstractState</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">employ</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯状态类 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">State</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> desc</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> desc <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">State</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbstractState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">State</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">employ</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">trafficLight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;，&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span>desc<span class="token punctuation">)</span>
  trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">TrafficLight</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 获取交通灯状态 */</span>
<span class="token class-name">TrafficLight</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state
<span class="token punctuation">}</span>

<span class="token comment">/* 设置交通灯状态 */</span>
<span class="token class-name">TrafficLight</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state
<span class="token punctuation">}</span>

<span class="token comment">// 实例化一个红绿灯</span>
<span class="token keyword">var</span> trafficLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrafficLight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 实例化红绿灯可能有的三种状态</span>
<span class="token keyword">var</span> redState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;红色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人等待 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> greenState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;绿色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人等待 &amp; 车辆通行&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> yellowState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;黄色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人等待 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>

redState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 红色，行人通行 &amp; 车辆等待</span>
yellowState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 黄色，行人等待 &amp; 车辆等待</span>
greenState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 绿色，行人等待 &amp; 车辆通行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的不同状态是同一个类的类实例，比如 <code>redState</code> 这个类实例，就把所有红灯状态处理的逻辑封装起来，如果要把状态切换为红灯状态，那么只需要 <code>redState.employ()</code> 把交通灯的状态切换为红色，并且把交通灯对应的行为逻辑也切换为红灯状态。</p><p>如果你看过前面的策略模式，是不是感觉到有那么一丝似曾相识，策略模式把可以相互替换的策略算法提取出来，而状态模式把事物的状态及其行为提取出来。</p><p>这里我们使用 ES6 的 Class 语法改造一下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 抽象状态类 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类 */</span>
<span class="token keyword">class</span> <span class="token class-name">State</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> desc</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> desc <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 覆盖抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token parameter">trafficLight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;，&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span>desc<span class="token punctuation">)</span>
    trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类 */</span>
<span class="token keyword">class</span> <span class="token class-name">TrafficLight</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 获取交通灯状态 */</span>
  <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state
  <span class="token punctuation">}</span>

  <span class="token comment">/* 设置交通灯状态 */</span>
  <span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> trafficLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrafficLight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> redState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;红色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人等待 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> greenState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;绿色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人等待 &amp; 车辆通行&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> yellowState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;黄色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人等待 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>

redState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 红色，行人通行 &amp; 车辆等待</span>
yellowState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 黄色，行人等待 &amp; 车辆等待</span>
greenState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 绿色，行人等待 &amp; 车辆通行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要新建状态，不用修改原有代码，只要加上下面的代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 接上面</span>

<span class="token keyword">const</span> blueState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">&#39;蓝色&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;行人倒立 &amp; 车辆飞起&#39;</span><span class="token punctuation">)</span>

blueState<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 蓝色，行人倒立 &amp; 车辆飞起</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传统的状态区分一般是基于状态类扩展的不同状态类，如何实现实现看需求具体了，比如逻辑比较复杂，通过新建状态实例的方法已经不能满足需求，那么可以使用状态类的方式。</p><p>这里提供一个状态类的实现，同时引入状态的切换逻辑：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 抽象状态类 */</span>
<span class="token keyword">class</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> AbstractState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象类不能直接实例化!&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;抽象方法不能调用!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类-红灯 */</span>
<span class="token keyword">class</span> <span class="token class-name">RedState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">=</span> <span class="token string">&#39;红色&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 覆盖抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">+</span> <span class="token string">&#39;，行人通行 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// const redDom = document.getElementById(&#39;color-red&#39;)    // 业务相关操作</span>
    <span class="token comment">//         // redDom.click()</span>
  <span class="token punctuation">}</span>

  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">trafficLight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">.</span>yellowState<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类-绿灯 */</span>
<span class="token keyword">class</span> <span class="token class-name">GreenState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">=</span> <span class="token string">&#39;绿色&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 覆盖抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">+</span> <span class="token string">&#39;，行人等待 &amp; 车辆通行&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// const greenDom = document.getElementById(&#39;color-green&#39;)</span>
    <span class="token comment">// greenDom.click()</span>
  <span class="token punctuation">}</span>

  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">trafficLight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">.</span>redState<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类-黄灯 */</span>
<span class="token keyword">class</span> <span class="token class-name">YellowState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">=</span> <span class="token string">&#39;黄色&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 覆盖抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">+</span> <span class="token string">&#39;，行人等待 &amp; 车辆等待&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// const yellowDom = document.getElementById(&#39;color-yellow&#39;)</span>
    <span class="token comment">// yellowDom.click()</span>
  <span class="token punctuation">}</span>

  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">trafficLight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    trafficLight<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>trafficLight<span class="token punctuation">.</span>greenState<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 交通灯类 */</span>
<span class="token keyword">class</span> <span class="token class-name">TrafficLight</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>redState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>greenState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GreenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>yellowState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YellowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>greenState
  <span class="token punctuation">}</span>

  <span class="token comment">/* 设置交通灯状态 */</span>
  <span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state
  <span class="token punctuation">}</span>

  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> trafficLight <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrafficLight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

trafficLight<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 红色，行人通行 &amp; 车辆等待</span>
trafficLight<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 黄色，行人等待 &amp; 车辆等待</span>
trafficLight<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 绿色，行人等待 &amp; 车辆通行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),h={href:"https://codepen.io/SHERlocked93/pen/OKOgYp",target:"_blank",rel:"noopener noreferrer"},w=p('<p>效果如下：</p><p><img src="'+u+`" alt="image-20230811145450037"></p><p>如果我们要增加新的交通灯颜色，也是很方便的：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 接上面</span>

<span class="token comment">/* 交通灯类-蓝灯 */</span>
<span class="token keyword">class</span> <span class="token class-name">BlueState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">=</span> <span class="token string">&#39;蓝色&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 覆盖抽象方法 */</span>
  <span class="token function">employ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;交通灯颜色变为 &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorState <span class="token operator">+</span> <span class="token string">&#39;，行人倒立 &amp; 车辆飞起&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> redDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;color-blue&#39;</span><span class="token punctuation">)</span>
    redDom<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> blueState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BlueState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

trafficLight<span class="token punctuation">.</span><span class="token function">employ</span><span class="token punctuation">(</span>blueState<span class="token punctuation">)</span> <span class="token comment">// 输出： 交通灯颜色变为 蓝色，行人倒立 &amp; 车辆飞起</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对原来的代码没有修改，非常符合开闭原则了。</p><h2 id="_3-状态模式的原理" tabindex="-1"><a class="header-anchor" href="#_3-状态模式的原理" aria-hidden="true">#</a> 3. 状态模式的原理</h2><p>所谓对象的状态，通常指的就是对象实例的属性的值。行为指的就是对象的功能，行为大多可以对应到方法上。状态模式把状态和状态对应的行为从原来的大杂烩代码中分离出来，把每个状态所对应的功能处理封装起来，这样选择不同状态的时候，其实就是在选择不同的状态处理类。</p><p>也就是说，状态和行为是相关联的，它们的关系可以描述总结成：<strong>状态决定行为</strong>。由于状态是在运行期被改变的，因此行为也会在运行期根据状态的改变而改变，看起来，同一个对象，在不同的运行时刻，行为是不一样的，就像是类被修改了一样。</p><p>为了提取不同的状态类共同的外观，可以给状态类定义一个共同的状态接口或抽象类，正如之前最后的两个代码示例一样，这样可以面向统一的接口编程，无须关心具体的状态类实现。</p><h2 id="_4-状态模式的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-状态模式的优缺点" aria-hidden="true">#</a> 4. 状态模式的优缺点</h2><p>状态模式的优点：</p><ol><li><strong>结构相比之下清晰</strong>，避免了过多的 <code>switch-case</code> 或 <code>if-else</code> 语句的使用，避免了程序的复杂性提高系统的可维护性;</li><li><strong>符合开闭原则</strong>，每个状态都是一个子类，增加状态只需增加新的状态类即可，修改状态也只需修改对应状态类就可以了；</li><li><strong>封装性良好</strong>，状态的切换在类的内部实现，外部的调用无需知道类内部如何实现状态和行为的变换。</li></ol><p>状态模式的缺点：引入了多余的类，每个状态都有对应的类，导致系统中类的个数增加。</p><h2 id="_5-状态模式的适用场景" tabindex="-1"><a class="header-anchor" href="#_5-状态模式的适用场景" aria-hidden="true">#</a> 5. 状态模式的适用场景</h2><ol><li>操作中含有庞大的多分支的条件语句，且这些分支依赖于该对象的状态，那么可以使用状态模式来将分支的处理分散到单独的状态类中；</li><li>对象的行为随着状态的改变而改变，那么可以考虑状态模式，来把状态和行为分离，虽然分离了，但是状态和行为是对应的，再通过改变状态调用状态对应的行为；</li></ol><h2 id="_6-其他相关模式" tabindex="-1"><a class="header-anchor" href="#_6-其他相关模式" aria-hidden="true">#</a> 6. 其他相关模式</h2><h3 id="_6-1-状态模式和策略模式" tabindex="-1"><a class="header-anchor" href="#_6-1-状态模式和策略模式" aria-hidden="true">#</a> 6.1 状态模式和策略模式</h3><p>状态模式和策略模式在之前的代码就可以看出来，看起来比较类似，他们的区别：</p><ol><li><strong>状态模式：</strong> 重在强调对象内部状态的变化改变对象的行为，状态类之间是<strong>平行</strong>的，无法相互替换；</li><li><strong>策略模式：</strong> 策略的选择由外部条件决定，策略可以动态的切换，策略之间是<strong>平等</strong>的，可以相互替换；</li></ol><p>状态模式的状态类是<strong>平行</strong>的，意思是各个状态类封装的状态和对应的行为是相互独立、没有关联的，封装的业务逻辑可能差别很大毫无关联，相互之间不可替换。但是策略模式中的策略是<strong>平等</strong>的，是同一行为的不同描述或者实现，在同一个行为发生的时候，可以根据外部条件挑选任意一个实现来进行处理。</p><h3 id="_6-2-状态模式和发布-订阅模式" tabindex="-1"><a class="header-anchor" href="#_6-2-状态模式和发布-订阅模式" aria-hidden="true">#</a> 6.2 状态模式和发布-订阅模式</h3><p>这两个模式都是在状态发生改变的时候触发行为，不过发布-订阅模式的行为是固定的，那就是通知所有的订阅者，而状态模式是根据状态来选择不同的处理逻辑。</p><ol><li><strong>状态模式：</strong> 根据状态来分离行为，当状态发生改变的时候，动态地改变行为；</li><li><strong>发布-订阅模式：</strong> 发布者在消息发生时通知订阅者，具体如何处理则不在乎，或者直接丢给用户自己处理；</li></ol><p>这两个模式是可以组合使用的，比如在发布-订阅模式的发布消息部分，当对象的状态发生了改变，触发通知了所有的订阅者后，可以引入状态模式，根据通知过来的状态选择相应的处理。</p><h3 id="_6-3-状态模式和单例模式" tabindex="-1"><a class="header-anchor" href="#_6-3-状态模式和单例模式" aria-hidden="true">#</a> 6.3 状态模式和单例模式</h3><p>之前的示例代码中，状态类每次使用都 <code>new</code> 出来一个状态实例，实际上使用同一个实例即可，因此可以引入单例模式，不同的状态类可以返回的同一个实例。</p>`,26);function y(S,_){const a=c("ExternalLinkIcon");return o(),l("div",null,[k,s("blockquote",null,[s("p",null,[d,n(" 本文可能用到一些编码技巧比如 "),s("a",v,[n("IIFE"),t(a)]),n("（Immediately Invoked Function Expression, 立即调用函数表达式），还有一些 ES6 的语法 "),s("a",m,[n("let/const"),t(a)]),n(" 、"),s("a",b,[n("Class"),t(a)]),n("、"),s("a",f,[n("rest 参数"),t(a)]),n(" 等，如果还没接触过可以点击链接稍加学习 ~")])]),g,s("p",null,[n("代码和预览参见："),s("a",h,[n("Codepen - 状态模式 traffic-light"),t(a)])]),w])}const x=e(r,[["render",y],["__file","index-20.html.vue"]]);export{x as default};
