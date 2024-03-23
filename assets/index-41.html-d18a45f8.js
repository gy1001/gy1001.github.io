import{_ as n,p as s,q as a,a1 as p}from"./framework-e8cb8151.js";const t={},e=p(`<h1 id="_41-工厂模式" tabindex="-1"><a class="header-anchor" href="#_41-工厂模式" aria-hidden="true">#</a> 41-工厂模式</h1><p>要准确的理解工厂模式并不简单。</p><blockquote><p>JavaScript 中没有接口和抽象类的概念，因此基于 JavaScript 理解工厂模式，在实现上与其他语言有所不同。因此学习时要注意区分</p></blockquote><p>假设我有一个手机工厂，工厂里能生产各种手机。小米、苹果、华为等。</p><p>每一种手机的生产流程基本相同，但是需要的原材料不一样。</p><p>于是我们按照普通的思维定义类时，就会出现一种情况，他们只是在创建时传入的参数不同，但是其他的方法都相同。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Xiaomi</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">IPhone</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Huawei</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样封装没什么问题。不过我们在实践时，可能会遇到一些维护上的小问题。</p><p>时光飞逝，类 Xiaomi 已经在代码中用了很久，项目中有几十处代码使用 <code>new Xiaomi()</code> 创建了大量的实例。可是后来我们发现，<code>Xiaomi</code> 已经出了很多种品牌了，例如 小米 6，小米 7，小米 8，而且这些小米手机使用的材料也不一样。而我们最开始使用的 <code>Xiaomi</code>，其实是想要声明的是 小米 4。</p><p>为了适应场景的变动和调整，我们需要修改代码。但是 Xiaomi 类已经变成了祖传代码，此时如果轻易修改，风险非常大。即使只是改一个类名 Xiaomi -&gt; Xiaomi4，就要改动几十处。因此我们在设计之初，如何避免未来修改代码的风险呢？</p><p>工厂模式就是这里提供的一个解决方案。</p><p>工厂模式用于封装和管理对象的创建。工厂模式期望我们在创建对象时，不会对外暴露创建逻辑，并且是通过使用一个共同的接口来创建新的对象。</p><p>首先，创建一个工厂方法，通过传入不同的参数，然后声明不同的类。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Xiaomi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Huawei</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们就通过工厂方法，使用不同的字符串，与具体的类之间，建立了一个映射关系。</p><p>那么，我们在使用时，就不再直接通过 <code>new Xiaomi()</code> 的方式直接创建实例了。而是使用 factory 方法进行创建。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> xm <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> ip <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> hw <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未来需要将类名进行更改时，例如将 Xiaomi 修改为 Xiaomi4，那么只需要在类的声明和工厂方法里进行修改即可。而其他使用的地方，可以不做修改。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">-</span> <span class="token keyword">class</span> <span class="token class-name">Xiaomi</span> <span class="token punctuation">{</span>
<span class="token operator">+</span> <span class="token keyword">class</span> <span class="token class-name">Xiaomi4</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">function</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token operator">-</span>    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Xiaomi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">+</span>    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Xiaomi4</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Huawei</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是简单工厂模式。</p><p>这样能够解决一部分问题。</p><p>进一步思考，后续手机的品种会越来越多，小米 8，小米 9， 小米 10，华为 mete10，华为 p40 等等。那这个时候，我们会发现，除了要新增一个类之外，工厂方法 factory 也会持续被更改。</p><blockquote><p>违背了开闭原则</p></blockquote><p>那我们应该怎么解决这个问题呢？有没有一种方式，能够让工厂方法在后续的迭代过程中，不进行修改？</p><p>当然有：最简单的方式如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// window 表示声明的类 挂载的对象，可能是window，可能是global，可能是其他自定义的对象</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样处理之后，那么传入的 type 字符串，就必须与类名保持一致。因此在使用时会有一些限制</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> hw <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;Huawei&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，我们也可以维护一份配置文件，该配置文件就是显式的标明类型字符串与类名的映射关系。</p><p>我们可以将这份配置文件，定义在工厂函数的原型对象中。</p><p>于是，上面的工厂函数可以演变成为工厂类。并且具备了自己的方法，config 配置文件维护在工厂对象的原型中，被所有实例共享。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Factory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> cur <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>config<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">cur</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Factory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>config <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Factory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setConfig</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> sub</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>config<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> sub
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，每新增一个类，都需要使用工厂对象修改存储在原型对象中的配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Xiaomi5</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">Factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setConfig</span><span class="token punctuation">(</span><span class="token string">&#39;xiaomi5&#39;</span><span class="token punctuation">,</span> Xiaomi5<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以专门手动维护一个单独的模块作为配置文件。这样的方式更直观。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Xiaomi <span class="token keyword">from</span> <span class="token string">&#39;./Xiaomi&#39;</span>
<span class="token keyword">import</span> Xiaomi5 <span class="token keyword">from</span> <span class="token string">&#39;./Xiaomi5&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">xiaomi</span><span class="token operator">:</span> Xiaomi<span class="token punctuation">,</span>
  <span class="token literal-property property">xiaomi5</span><span class="token operator">:</span> Xiaomi5
<span class="token punctuation">}</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&#39;./config&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">config</span><span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很显然，在代码层面，还可以对类型声明进行优化。</p><p>我们分析上面三个类的情况，都是生成手机，所以所有的方法都完全相同。但是因为每一种手机的原材料不一样，因此构造函数里会不一样。利用封装的思维，我们可以将这三个类，合并成为一个类，不同的手机在构造函数中进行判断。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">PhoneFactory</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material1&#39;</span><span class="token punctuation">,</span>
        <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material2&#39;</span><span class="token punctuation">,</span>
        <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material3&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material1&#39;</span><span class="token punctuation">,</span>
        <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material2&#39;</span><span class="token punctuation">,</span>
        <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material3&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material1&#39;</span><span class="token punctuation">,</span>
        <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material2&#39;</span><span class="token punctuation">,</span>
        <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material3&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> xm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> ip <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> hw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式的底层思维是将所有的手机抽象成为同一种类型，然后在构造函数时针对不同的细节进行区分。之所以能够这样处理的原因，是因为 Xiaomi，IPhone，Huawei 这几个类高度相似，因此可以抽象成为同一种类型。但是如果只有部分相似，就需要区别对待。</p><p>在 jQuery 的封装里，也有同样的场景。例如 jQuery 的构造函数 <code>jQuery.fn.init</code> 中有这样的逻辑判断</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>init <span class="token operator">=</span> jQuery<span class="token punctuation">.</span>fn<span class="token punctuation">.</span><span class="token function-variable function">init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">selector<span class="token punctuation">,</span> context<span class="token punctuation">,</span> root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> match<span class="token punctuation">,</span> elem

  <span class="token comment">// $(&quot;&quot;), $(null), $(undefined), $(false)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>selector<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// $(&#39;.wrapper&#39;)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> selector <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token comment">// $(DOMElement)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>selector<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// $(function)</span>
    <span class="token comment">// Shortcut for document ready</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>jQuery<span class="token punctuation">.</span><span class="token function">isFunction</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//....</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> jQuery<span class="token punctuation">.</span><span class="token function">makeArray</span><span class="token punctuation">(</span>selector<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了扩展时，不直接修改对象而是修改配置文件，可以进一步调整一下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">xiaomi</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material1&#39;</span><span class="token punctuation">,</span>
    <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material2&#39;</span><span class="token punctuation">,</span>
    <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material3&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">iphone</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material1&#39;</span><span class="token punctuation">,</span>
    <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material2&#39;</span><span class="token punctuation">,</span>
    <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material3&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">huawei</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material1&#39;</span><span class="token punctuation">,</span>
    <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material2&#39;</span><span class="token punctuation">,</span>
    <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material3&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">PhoneFactory</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> config<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> xm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> ip <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> hw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果这几个类只是部分相似，只有部分接口是一样的，那么就需要区别对象，而不能直接合在一起。同样的方法使用继承的方式来简化</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>
  <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">step4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Xiaomi</span> <span class="token keyword">extends</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;xiaomi_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">IPhone</span> <span class="token keyword">extends</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;iphone_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Huawei</span> <span class="token keyword">extends</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>materials <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material1&#39;</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material2&#39;</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;huawei_material3&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">xiaomi</span><span class="token operator">:</span> Xiaomi<span class="token punctuation">,</span>
  <span class="token literal-property property">iphone</span><span class="token operator">:</span> IPhone<span class="token punctuation">,</span>
  <span class="token literal-property property">huawei</span><span class="token operator">:</span> Huawei<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">config</span><span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> xm <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;xiaomi&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> ip <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;iphone&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> hw <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token string">&#39;huawei&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂模式的核心思维在于不直接通过 new 来创建实例，而是使用工厂方法进行一层封装，隐藏实例的创建细节。因此上面提到的许多方式，都是能够基本满足这个特点，那么对应到实践场景中，就需要结合场景选择最适合的方式灵活使用。</p>`,47),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","index-41.html.vue"]]);export{k as default};
