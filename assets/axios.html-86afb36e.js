import{_ as c,M as e,p as i,q as l,R as n,t as s,N as a,a1 as t}from"./framework-e8cb8151.js";const u={},r=t(`<h1 id="axios-源码解析" tabindex="-1"><a class="header-anchor" href="#axios-源码解析" aria-hidden="true">#</a> axios 源码解析</h1><h2 id="_1、执行过程" tabindex="-1"><a class="header-anchor" href="#_1、执行过程" aria-hidden="true">#</a> 1、执行过程</h2><h3 id="axios-网络请求流程图" tabindex="-1"><a class="header-anchor" href="#axios-网络请求流程图" aria-hidden="true">#</a> axios 网络请求流程图</h3><p><img src="https://s2.51cto.com/oss/202111/19/dcfed2c454bb95031e4c371da973ea6d.jpg" alt="img"></p><h3 id="从主入口分析" tabindex="-1"><a class="header-anchor" href="#从主入口分析" aria-hidden="true">#</a> 从主入口分析</h3><ol><li><p>下载 github 上 axios 库源码，打开<code>package.json</code>文件可以看到</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token string-property property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>打开<code>index.js</code>文件，可以看到如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./lib/axios&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>继续打开<code>./libe/axios.js</code>文件，就可以看到实际上我们常调用的 <code>axios</code>的源码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建实例函数，参数为配置对象</span>
<span class="token keyword">function</span> <span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token parameter">defaultConfig</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实际上这个上下文来自于Axios函数，传递的参数也是配置队形，下小节讲解</span>
  <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Axios</span><span class="token punctuation">(</span>defaultConfig<span class="token punctuation">)</span>

  <span class="token comment">// 这里使用一个bind工具函数，类似于函数的bind方法，这行代码之后，函数就有了 request 方法</span>
  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>request<span class="token punctuation">,</span> context<span class="token punctuation">)</span>

  <span class="token comment">// 扩展 Axios.prototype 上的方法到 实例instance 身上</span>
  <span class="token comment">// 这里扩展了诸如：delete、get、head、options、post、put、patch、getUri 等方法</span>
  utils<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> <span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> context<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">allOwnKeys</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// 扩展 Context 上面的 方法到实例 instance 身上</span>
  <span class="token comment">// 这里扩展了诸如：defaluts 属性、interceptors 属性</span>
  utils<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> context<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">allOwnKeys</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// 创建实例的工厂函数</span>
  instance<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">instanceConfig</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaultConfig<span class="token punctuation">,</span> instanceConfig<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回实例</span>
  <span class="token keyword">return</span> instance
<span class="token punctuation">}</span>
<span class="token comment">// 创建一个默认到处的实例</span>
<span class="token keyword">var</span> axios <span class="token operator">=</span> <span class="token function">createInstance</span><span class="token punctuation">(</span>defaults<span class="token punctuation">)</span>
<span class="token comment">// 暴露一个 Axios属性类来允许类的继承</span>
axios<span class="token punctuation">.</span>Axios <span class="token operator">=</span> Axios
<span class="token comment">// 暴露一些取消相关的函数属性</span>
axios<span class="token punctuation">.</span>CanceledError <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./cancel/CanceledError&#39;</span><span class="token punctuation">)</span>
axios<span class="token punctuation">.</span>CancelToken <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./cancel/CancelToken&#39;</span><span class="token punctuation">)</span>
axios<span class="token punctuation">.</span>isCancel <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./cancel/isCancel&#39;</span><span class="token punctuation">)</span>
axios<span class="token punctuation">.</span><span class="token constant">VERSION</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./env/data&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>version
axios<span class="token punctuation">.</span>toFormData <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./helpers/toFormData&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 暴露一个 AxiosError 类属性</span>
axios<span class="token punctuation">.</span>AxiosError <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../lib/core/AxiosError&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// CanceledError的别名，以实现向后兼容性</span>
axios<span class="token punctuation">.</span>Cancel <span class="token operator">=</span> axios<span class="token punctuation">.</span>CanceledError
<span class="token comment">// 暴露 all、spread 方法</span>
axios<span class="token punctuation">.</span><span class="token function-variable function">all</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">promises</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>promises<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
axios<span class="token punctuation">.</span>spread <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./helpers/spread&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 暴露 isAxiosError 属性</span>
axios<span class="token punctuation">.</span>isAxiosError <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./helpers/isAxiosError&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 暴露 formToJSON 方法</span>
axios<span class="token punctuation">.</span><span class="token function-variable function">formToJSON</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">thing</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">formDataToJSON</span><span class="token punctuation">(</span>
    utils<span class="token punctuation">.</span><span class="token function">isHTMLForm</span><span class="token punctuation">(</span>thing<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span>thing<span class="token punctuation">)</span> <span class="token operator">:</span> thing
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 导出 axios 属性</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> axios
<span class="token comment">// 允许在 TypeScript 中使用默认导入语法</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>default <span class="token operator">=</span> axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>./helpers/bind.js</code> 函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> thisArg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">wrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>thisArg<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code> utils.extend</code> 、 <code>utils.forEach</code>函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 可以看到循环 b(可能是对象、数组等)</span>
<span class="token keyword">function</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> thisArg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">forEach</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">assignValue</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果 thisArg 存在并且 val 是一个函数，就使用 bind 赋值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>thisArg <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      a<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">bind</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> thisArg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      a<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> a
<span class="token punctuation">}</span>
<span class="token comment">// forEach 函数，循环一个变量，并使用相应的函数函数</span>
<span class="token keyword">function</span> <span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果没有提供值，就不需要再处理了，直接返回即可</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> obj <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果它不是一个可迭代对象，则强制使用数组</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    obj <span class="token operator">=</span> <span class="token punctuation">[</span>obj<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果是一个数组，源码参见下面的函数处理</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里使用 for循环，迭代一个数组值</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> obj<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> obj<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用 for...in, 迭代对象键</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 判断一个值是不是一个数组</span>
<span class="token keyword">function</span> <span class="token function">isArray</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>axios.all</code>、<code>axios.spread</code>（spread: 展开、打开、伸开） 函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>axios<span class="token punctuation">.</span><span class="token function-variable function">all</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">promises</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>promises<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
axios<span class="token punctuation">.</span>spread <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./helpers/spread&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// ./helpers/spread.js</span>
<span class="token comment">// 用于调用函数和扩展参数数组的语法糖。</span>
<span class="token comment">//  常见的用法是\`Function.prototype.apply</span>

<span class="token comment">// function f(x, y, z) {}</span>
<span class="token comment">// var args = [1, 2, 3];</span>
<span class="token comment">// f.apply(null, args);</span>

<span class="token comment">//  使用 \`spread\` 来重写上例</span>
<span class="token comment">// spread(function(x, y, z) {})([1, 2, 3]);</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">spread</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">wrap</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;http://localhost:3000/comments&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;http://localhost:3000/posts&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 不使用 spread 时</span>
axios<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>data<span class="token punctuation">,</span> res<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 使用 spread 时</span>
axios<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  axios<span class="token punctuation">.</span><span class="token function">spread</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resA<span class="token punctuation">,</span> resB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resA<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resB<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>本质含义</p><p>Promise.all 的 then 方法里面是个函数，函数的参数是所有请求的响应组成的数组；</p><p>而 axios.all 的 then 方法里面调用了 axios.spread 方法，axios.spread 方法接收一个函数作为参数，该参数函数的参数也是所有请求的响应，既然上文说了 axios.all 方法与 Promise.all 方法是一模一样的，那么我们只需想办法再让两个 then 方法相同即可。</p><p>也就是说我们创建一个 axios.spread 方法并且让 axios.spread((acct, perms) =&gt; {})的返回值与([acct,perms]) =&gt; {}等价即可。</p></blockquote><p>一步步理解</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>
  <span class="token comment">// 这里的 all 函数可以理解为 一个普通函数，然后调用时候参数是 res（在promise.all中就是一个数组）,类似这样</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">(</span>resArr<span class="token punctuation">)</span>

<span class="token comment">// 初步实现 spread, 只返回一个空函数时</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">spread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">wrap</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token function">spread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1,2,3</span>
<span class="token comment">// 进一步实现 spread, 把数组参数使用变为普通字符串并调用, 并返回调用后的计算值</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">spread</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">wrap</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_2、axios-函数" tabindex="-1"><a class="header-anchor" href="#_2、axios-函数" aria-hidden="true">#</a> 2、Axios 函数</h2><h3 id="内部结构详解" tabindex="-1"><a class="header-anchor" href="#内部结构详解" aria-hidden="true">#</a> 内部结构详解</h3>`,8),k=t(`<li><p>内容源码结构</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Axios 构造函数，有 defaluts 属性 和 拦截器 interceptors</span>
<span class="token keyword">function</span> <span class="token function">Axios</span><span class="token punctuation">(</span><span class="token parameter">instanceConfig</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>defaults <span class="token operator">=</span> instanceConfig
  <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">request</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">InterceptorManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">response</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">InterceptorManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Axioe</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">request</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// .... 请求 处理链</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获取完整的请求地址(加参数的)</span>
<span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getUri</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">getUri</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 遍历 delete、get、head、options，并赋于 Axios 原型上</span>
utils<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span><span class="token string">&#39;delete&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;head&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;options&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token function">forEachMethodNoData</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
        <span class="token function">mergeConfig</span><span class="token punctuation">(</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">method</span><span class="token operator">:</span> method<span class="token punctuation">,</span>
          <span class="token literal-property property">url</span><span class="token operator">:</span> url<span class="token punctuation">,</span>
          <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">(</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>data<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token comment">// 遍历 post、put、patch ,并赋值于 Axios原型上</span>
utils<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span><span class="token string">&#39;post&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;put&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;patch&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token function">forEachMethodWithData</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">generateHTTPMethod</span><span class="token punctuation">(</span><span class="token parameter">isForm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">httpMethod</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
          <span class="token function">mergeConfig</span><span class="token punctuation">(</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">method</span><span class="token operator">:</span> method<span class="token punctuation">,</span>
            <span class="token literal-property property">headers</span><span class="token operator">:</span> isForm
              <span class="token operator">?</span> <span class="token punctuation">{</span>
                  <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;multipart/form-data&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span>
              <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">url</span><span class="token operator">:</span> url<span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> data<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">generateHTTPMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>method <span class="token operator">+</span> <span class="token string">&#39;Form&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">generateHTTPMethod</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>解析：</p><ul><li><p>第 1 节中 axios 调用的其实就是这里的 Axios 的函数特性， 它拥有属性：defaults、interceptors, 已经方法 get、delete、patch、head、options、post、put、request、getUri 等</p></li><li><p>这里还涉及到一些使用的工具函数：拦截器 InterceptorManager 函数、mergeConfig 参数合并参数、buildFullPath、buildURL、utils.forEach 循环函数等</p></li><li><p>具体查看可以看到，get、post、delete、patch 等一系列请求方法调用的其实还是 request 方法</p></li></ul></li><li><p>在具体看 <code>Axios.prototype.request</code> 方法之前，可以简单先看一下重构前的 promise 链 经典代码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">request</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>

	<span class="token comment">// 创建存储链式调用的数组 首位是核心调用方法 dispatchRequest，第二位是空</span>
  <span class="token keyword">var</span> chain <span class="token operator">=</span> <span class="token punctuation">[</span>dispatchRequest<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 创建 promise 为什么resolve(config）</span>
  <span class="token comment">// 因为 请求拦截器最先执行 所以 设置请求拦截器时可以拿到每次请求的所有config配置</span>
  <span class="token keyword">var</span> promise <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 把设置的请求拦截器的成功处理函数、失败处理函数放到数组最前面</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">unshiftRequestInterceptors</span><span class="token punctuation">(</span><span class="token parameter">interceptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 注意这里对于请求拦截器用到的 unshift 方法，所以多个请求拦截器的执行顺序需要注意</span>
    chain<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>interceptor<span class="token punctuation">.</span>fulfilled<span class="token punctuation">,</span> interceptor<span class="token punctuation">.</span>rejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 把设置的响应拦截器的成功处理函数、失败处理函数放到数组最后面</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">pushResponseInterceptors</span><span class="token punctuation">(</span><span class="token parameter">interceptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    chain<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>interceptor<span class="token punctuation">.</span>fulfilled<span class="token punctuation">,</span> interceptor<span class="token punctuation">.</span>rejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 循环 每次取两个出来组成promise链.then执行</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>chain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    promise <span class="token operator">=</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>chain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> chain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回promise</span>
  <span class="token keyword">return</span> promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,3),d=n("p",null,[s("具体分析重新写的 "),n("code",null,"Axios.prototype.request"),s(" 这个函数")],-1),v=n("p",null,"改动的原因：如果请求拦截器中存在一些长时间的任务，会使得使用 axios 的网络请相较于不使用 axios 的网络请求会延后，为此，通过为拦截管理器增加 synchronous 和 runWhen 字段，来实现同步执行请求方法。",-1),m={href:"https://github.com/axios/axios/issues/2609",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Axios</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">request</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/********start: 这里进行 配置 相关的处理****************/</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> configOrUrl <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config <span class="token operator">=</span> config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    config<span class="token punctuation">.</span>url <span class="token operator">=</span> configOrUrl
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config <span class="token operator">=</span> configOrUrl <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 配置合并默认配置</span>
  config <span class="token operator">=</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>defaults<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token comment">// 转化请求的方法 转化为小写</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>method <span class="token operator">=</span> config<span class="token punctuation">.</span>method<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>method <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>method<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果都没有，默认是 get 方法</span>
    config<span class="token punctuation">.</span>method <span class="token operator">=</span> <span class="token string">&#39;get&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> transitional <span class="token operator">=</span> config<span class="token punctuation">.</span>transitional
  <span class="token keyword">if</span> <span class="token punctuation">(</span>transitional <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    validator<span class="token punctuation">.</span><span class="token function">assertOptions</span><span class="token punctuation">(</span>
      transitional<span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">silentJSONParsing</span><span class="token operator">:</span> validators<span class="token punctuation">.</span><span class="token function">transitional</span><span class="token punctuation">(</span>validators<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">forcedJSONParsing</span><span class="token operator">:</span> validators<span class="token punctuation">.</span><span class="token function">transitional</span><span class="token punctuation">(</span>validators<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">clarifyTimeoutError</span><span class="token operator">:</span> validators<span class="token punctuation">.</span><span class="token function">transitional</span><span class="token punctuation">(</span>validators<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token boolean">false</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/*********end***************/</span>

  <span class="token doc-comment comment">/********start: 这里进行请求拦截器、请求、响应拦截器的合并遍历 (责任链模式) ****************/</span>
  <span class="token comment">// 请求拦截器储存数组</span>
  <span class="token keyword">var</span> requestInterceptorChain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">// 默认所有请求拦截器都为同步</span>
  <span class="token keyword">var</span> synchronousRequestInterceptors <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token comment">// 遍历 请求拦截器，拦截器每次 use 就会往 对应拦截器数组 中添加一个，后续会讲解</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">unshiftRequestInterceptors</span><span class="token punctuation">(</span>
    <span class="token parameter">interceptor</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里interceptor是注册的每一个拦截器对象 axios 请求拦截器向外暴露了runWhen配置来针对一些需要运行时检测来执行的拦截器</span>
    <span class="token comment">// 如果配置了该函数，并且返回结果为true，则记录到拦截器链中，反之则直接结束该层循环</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token keyword">typeof</span> interceptor<span class="token punctuation">.</span>runWhen <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span>
      interceptor<span class="token punctuation">.</span><span class="token function">runWhen</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// interceptor.synchronous 是对外提供的配置，可标识该拦截器是异步还是同步 默认为false(异步)</span>
    <span class="token comment">// 这里是来同步整个执行链的执行方式的，如果有一个请求拦截器为异步 那么下面的promise执行链则会有不同的执行方式</span>
    synchronousRequestInterceptors <span class="token operator">=</span>
      synchronousRequestInterceptors <span class="token operator">&amp;&amp;</span> interceptor<span class="token punctuation">.</span>synchronous
    <span class="token comment">// 塞到请求拦截器数组中，注意这里用的 unshift</span>
    requestInterceptorChain<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>
      interceptor<span class="token punctuation">.</span>fulfilled<span class="token punctuation">,</span>
      interceptor<span class="token punctuation">.</span>rejected
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// 响应拦截器存储数组</span>
  <span class="token keyword">var</span> responseInterceptorChain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">// 遍历按序push到拦截器存储数组中</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">pushResponseInterceptors</span><span class="token punctuation">(</span>
    <span class="token parameter">interceptor</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    responseInterceptorChain<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
      interceptor<span class="token punctuation">.</span>fulfilled<span class="token punctuation">,</span>
      interceptor<span class="token punctuation">.</span>rejected
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">var</span> promise
  <span class="token comment">// 如果为异步 其实也是默认情况</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>synchronousRequestInterceptors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义请求队列</span>
    <span class="token keyword">var</span> chain <span class="token operator">=</span> <span class="token punctuation">[</span>dispatchRequest<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span>
    <span class="token comment">// 添加请求拦截队列、响应拦截器队列</span>
    <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>chain<span class="token punctuation">,</span> requestInterceptorChain<span class="token punctuation">)</span>
    chain <span class="token operator">=</span> chain<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>responseInterceptorChain<span class="token punctuation">)</span>
    promise <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>chain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 开始遍历 请求队列</span>
      promise <span class="token operator">=</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>chain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> chain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 返回结果</span>
    <span class="token keyword">return</span> promise
  <span class="token punctuation">}</span>
  <span class="token comment">// 这里则是同步的逻辑</span>
  <span class="token keyword">var</span> newConfig <span class="token operator">=</span> config
  <span class="token comment">// 请求拦截器一个一个的走 返回 请求前最新的config</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>requestInterceptorChain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> onFulfilled <span class="token operator">=</span> requestInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> onRejected <span class="token operator">=</span> requestInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 最新的config</span>
      newConfig <span class="token operator">=</span> <span class="token function">onFulfilled</span><span class="token punctuation">(</span>newConfig<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 做异常捕获 有错直接抛出</span>
      <span class="token function">onRejected</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 到这里 微任务不会过早的创建</span>
  <span class="token comment">// 也就解决了 微任务过早创建、当前宏任务过长或某个请求拦截器中有异步任务而阻塞真正的请求延时发起问题</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    promise <span class="token operator">=</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span>newConfig<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 响应拦截器执行</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>responseInterceptorChain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    promise <span class="token operator">=</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
      responseInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      responseInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> promise
  <span class="token doc-comment comment">/*********end***************/</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),f=t(`<li><p>拦截器增加两个配置参数：<code>synchronous</code>、<code>runWhen</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">InterceptorManager</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">use</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token parameter">fulfilled<span class="token punctuation">,</span>
  rejected<span class="token punctuation">,</span>
  options</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">fulfilled</span><span class="token operator">:</span> fulfilled<span class="token punctuation">,</span>
    <span class="token literal-property property">rejected</span><span class="token operator">:</span> rejected<span class="token punctuation">,</span>
    <span class="token comment">// 默认情况下它们被假定为异步的</span>
    <span class="token comment">// 如果您的请求拦截器是同步的，可以通过这个参数默认配置，它将告诉 axios 同步运行代码并避免请求执行中的任何延迟。</span>
    <span class="token literal-property property">synchronous</span><span class="token operator">:</span> options <span class="token operator">?</span> options<span class="token punctuation">.</span>synchronous <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 如果要基于运行时检查执行特定拦截器，可以通过这个runWhen这个参数，类型为函数</span>
    <span class="token literal-property property">runWhen</span><span class="token operator">:</span> options <span class="token operator">?</span> options<span class="token punctuation">.</span>runWhen <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),y=t(`<h3 id="拦截器注意点" tabindex="-1"><a class="header-anchor" href="#拦截器注意点" aria-hidden="true">#</a> 拦截器注意点</h3><ol><li><p>只有当所有拦截器都是同步执行时，拦截器才会同步执行，否则都会异步执行。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 注意以下代码</span>
<span class="token keyword">let</span> synchronousRequestInterceptors <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">unshiftRequestInterceptors</span><span class="token punctuation">(</span><span class="token parameter">interceptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 这里一旦多个请求拦截中有一个 拦截器属性为 false ，最终结果就是 false</span>
  synchronousRequestInterceptors <span class="token operator">=</span> synchronousRequestInterceptors <span class="token operator">&amp;&amp;</span> interceptor<span class="token punctuation">.</span>synchronous
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 这里做异步处理</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>synchronousRequestInterceptors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span>
<span class="token comment">// 这里做同步处理</span>
<span class="token operator">...</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_3、interceptormanager" tabindex="-1"><a class="header-anchor" href="#_3、interceptormanager" aria-hidden="true">#</a> 3、InterceptorManager</h2><h3 id="源码结构" tabindex="-1"><a class="header-anchor" href="#源码结构" aria-hidden="true">#</a> 源码结构</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">InterceptorManager</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 拦截器队列</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>handlers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 添加一个拦截器，参数：成功回调、失败回调、配置参数</span>
  <span class="token function">use</span><span class="token punctuation">(</span><span class="token parameter">fulfilled<span class="token punctuation">,</span> rejected<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      fulfilled<span class="token punctuation">,</span>
      rejected<span class="token punctuation">,</span>
      <span class="token literal-property property">synchronous</span><span class="token operator">:</span> options <span class="token operator">?</span> options<span class="token punctuation">.</span>synchronous <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token literal-property property">runWhen</span><span class="token operator">:</span> options <span class="token operator">?</span> options<span class="token punctuation">.</span>runWhen <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 从队列中移除一个拦截器</span>
  <span class="token function">eject</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 清空拦截器队列</span>
  <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handlers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 循环拦截器队列</span>
  <span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    utils<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">forEachHandler</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// h 是 拦截器 对象</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fn</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> InterceptorManager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、dispatchrequest" tabindex="-1"><a class="header-anchor" href="#_4、dispatchrequest" aria-hidden="true">#</a> 4、dispatchRequest</h2><ol><li>步骤分析</li></ol><ul><li>处理请求头 config 配置</li><li>调用 <code>adapter</code> 适配器发起真正的请求，针对浏览器环境发起 ajax 请求，node 环境发起 http 请求</li><li>构造响应数据， 会自动转换 JSON 数据</li></ul><ol start="2"><li><p>源码内容</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 提前取消请求</span>
  <span class="token function">throwIfCancellationRequested</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token comment">// 合并 headers 配置， 这里的 headers 可以在 Axios基本使用 章节看到具体的逻辑，着重注意优先级</span>
  config<span class="token punctuation">.</span>headers <span class="token operator">=</span> AxiosHeaders<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
  <span class="token comment">// 转换数据，这里回调用配置中的 transformRequest，处理请求之前的数据 data</span>
  config<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transformData</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>config<span class="token punctuation">,</span> config<span class="token punctuation">.</span>transformRequest<span class="token punctuation">)</span>
  <span class="token comment">// 适配器 axios是可以支持node端也支持浏览器端的</span>
  <span class="token keyword">const</span> adapter <span class="token operator">=</span> config<span class="token punctuation">.</span>adapter <span class="token operator">||</span> defaults<span class="token punctuation">.</span>adapter
  <span class="token comment">// 执行请求</span>
  <span class="token keyword">return</span> <span class="token function">adapter</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
    <span class="token keyword">function</span> <span class="token function">onAdapterResolution</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 取消请求情况</span>
      <span class="token function">throwIfCancellationRequested</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
      <span class="token comment">// 转换数据，具体就是调用 config 中的 transformResponse</span>
      response<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transformData</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>
        config<span class="token punctuation">,</span>
        config<span class="token punctuation">.</span>transformResponse<span class="token punctuation">,</span>
        response
      <span class="token punctuation">)</span>
      response<span class="token punctuation">.</span>headers <span class="token operator">=</span> AxiosHeaders<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
      <span class="token keyword">return</span> response
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token function">onAdapterRejection</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isCancel</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 取消请求情况</span>
        <span class="token function">throwIfCancellationRequested</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
        <span class="token comment">// 转换数据</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>reason <span class="token operator">&amp;&amp;</span> reason<span class="token punctuation">.</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          reason<span class="token punctuation">.</span>response<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transformData</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>
            config<span class="token punctuation">,</span>
            config<span class="token punctuation">.</span>transformResponse<span class="token punctuation">,</span>
            reason<span class="token punctuation">.</span>response
          <span class="token punctuation">)</span>
          reason<span class="token punctuation">.</span>response<span class="token punctuation">.</span>headers <span class="token operator">=</span> AxiosHeaders<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>
            reason<span class="token punctuation">.</span>response<span class="token punctuation">.</span>headers
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">throwIfCancellationRequested</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">.</span><span class="token function">throwIfRequested</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>signal <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span>aborted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">CanceledError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_5、适配器-adapter" tabindex="-1"><a class="header-anchor" href="#_5、适配器-adapter" aria-hidden="true">#</a> 5、适配器 adapter</h2><blockquote><p>经典的设计模式：适配器模式应用。</p></blockquote><ol><li><p><code>dispatchRequest.js</code> 文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// dispatchRequest.js</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 使用配置信息中的 adapter 或者 使用默认的 adapter</span>
  <span class="token keyword">var</span> adapter <span class="token operator">=</span> config<span class="token punctuation">.</span>adapter <span class="token operator">||</span> defaults<span class="token punctuation">.</span>adapter<span class="token punctuation">;</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>defaults/index.js</code> 文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> adapters <span class="token keyword">from</span> <span class="token string">&#39;../adapters&#39;</span>

<span class="token keyword">function</span> <span class="token function">getDefaultAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> adapter
  <span class="token comment">// 判断XMLHttpRequest对象是否存在 存在则代表为浏览器环境</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> XMLHttpRequest <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    adapter <span class="token operator">=</span> adapters<span class="token punctuation">.</span><span class="token function">getAdapter</span><span class="token punctuation">(</span><span class="token string">&#39;xhr&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
    <span class="token keyword">typeof</span> process <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span>
    utils<span class="token punctuation">.</span><span class="token function">kindOf</span><span class="token punctuation">(</span>process<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;process&#39;</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// node环境 使用原生http发起请求</span>
    adapter <span class="token operator">=</span> adapters<span class="token punctuation">.</span><span class="token function">getAdapter</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> adapter
<span class="token punctuation">}</span>

<span class="token keyword">var</span> defaults <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
  <span class="token literal-property property">adapter</span><span class="token operator">:</span> <span class="token function">getDefaultAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token comment">// getDefaultAdapter 函数类似如下，这是之前版本的写法</span>
<span class="token keyword">function</span> <span class="token function">getDefaultAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> adapter<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> XMLHttpRequest <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// For browsers use XHR adapter</span>
    adapter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../adapters/xhr&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> process <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>process<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;[object process]&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// For node use HTTP adapter</span>
    adapter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../adapters/http&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> adapter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>adapters/index.js</code> 文件</p><p><code>xhr.js</code> 是对原生 ajax <code>XMLHttpRequest</code> 对象的的封装</p><p><code>http.js</code>是对 node 中的 <code>http</code> 模块的封装，也会对 <code>https</code> 制作相应处理</p><p>具体封装细节</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> httpAdapter <span class="token keyword">from</span> <span class="token string">&#39;./http.js&#39;</span>
<span class="token keyword">import</span> xhrAdapter <span class="token keyword">from</span> <span class="token string">&#39;./xhr.js&#39;</span>

<span class="token keyword">const</span> adapters <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">http</span><span class="token operator">:</span> httpAdapter<span class="token punctuation">,</span>
  <span class="token literal-property property">xhr</span><span class="token operator">:</span> xhrAdapter<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">getAdapter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">nameOrAdapter</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// nameOrAdapter 是字符串的时候</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isString</span><span class="token punctuation">(</span>nameOrAdapter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> adapter <span class="token operator">=</span> adapters<span class="token punctuation">[</span>nameOrAdapter<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>nameOrAdapter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// adapter 不存在时候</span>
        <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span>
          utils<span class="token punctuation">.</span><span class="token function">hasOwnProp</span><span class="token punctuation">(</span>nameOrAdapter<span class="token punctuation">)</span>
            <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Adapter &#39;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>nameOrAdapter<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39; is not available in the build</span><span class="token template-punctuation string">\`</span></span>
            <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Can not resolve adapter &#39;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>nameOrAdapter<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39;</span><span class="token template-punctuation string">\`</span></span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> adapter
    <span class="token punctuation">}</span>
    <span class="token comment">// 自定义 adapter 必须是函数, 否则就报错</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isFunction</span><span class="token punctuation">(</span>nameOrAdapter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;adapter is not a function&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> nameOrAdapter
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  adapters<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>/adapters/xhr.js </code> 文件</p><p>大概分为以下几个步骤</p><ul><li>对 requestHeader 做处理</li><li>创建 xhr: new XMLHttpRequest</li><li>对 xhr.open 设置请求方式</li><li>如果配置了 download 或者 upload, 针对 progress 事件，处理下载或者上传进度事件</li><li>提供取消请求功能，调用原生 abort 方法</li><li>request.send() 发送请求</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">xhrAdapter</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">dispatchXhrRequest</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> requestData <span class="token operator">=</span> config<span class="token punctuation">.</span>data
    <span class="token comment">// 对 requestHeader 做处理</span>
    <span class="token keyword">const</span> requestHeaders <span class="token operator">=</span> AxiosHeaders<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> responseType <span class="token operator">=</span> config<span class="token punctuation">.</span>responseType
    <span class="token keyword">let</span> onCanceled
    <span class="token keyword">function</span> <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">.</span><span class="token function">unsubscribe</span><span class="token punctuation">(</span>onCanceled<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> onCanceled<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isFormData</span><span class="token punctuation">(</span>requestData<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> utils<span class="token punctuation">.</span><span class="token function">isStandardBrowserEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      requestHeaders<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token comment">//  删掉content-type，让浏览器来设置</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 创建xhr: new XMLHttpRequest</span>
    <span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>auth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> username <span class="token operator">=</span> config<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>username <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>
      <span class="token keyword">const</span> password <span class="token operator">=</span> config<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>password <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>
      requestHeaders<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Authorization&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;Basic &#39;</span> <span class="token operator">+</span> <span class="token function">btoa</span><span class="token punctuation">(</span>username <span class="token operator">+</span> <span class="token string">&#39; &#39;</span> <span class="token operator">+</span> password<span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> fullPath <span class="token operator">=</span> <span class="token function">buildFullPath</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>baseURL<span class="token punctuation">,</span> config<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
    <span class="token comment">// 对 xhr.open 设置请求方式</span>
    request<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>
      config<span class="token punctuation">.</span>method<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">buildURL</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">,</span> config<span class="token punctuation">.</span>params<span class="token punctuation">,</span> config<span class="token punctuation">.</span>paramsSerializer<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token boolean">true</span>
    <span class="token punctuation">)</span>
    <span class="token comment">// 设置毫秒级的超时时间限制</span>
    request<span class="token punctuation">.</span>timeout <span class="token operator">=</span> config<span class="token punctuation">.</span>timeout
    <span class="token comment">// 设置loadend的回调</span>
    <span class="token keyword">function</span> <span class="token function">onloadend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 响应头处理</span>
      <span class="token keyword">const</span> responseHeaders <span class="token operator">=</span> AxiosHeaders<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>
        <span class="token string">&#39;getAllResponseHeaders&#39;</span> <span class="token keyword">in</span> request <span class="token operator">&amp;&amp;</span> request<span class="token punctuation">.</span><span class="token function">getAllResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token comment">// 响应内容处理</span>
      <span class="token keyword">const</span> responseData <span class="token operator">=</span>
        <span class="token operator">!</span>responseType <span class="token operator">||</span> responseType <span class="token operator">===</span> <span class="token string">&#39;text&#39;</span> <span class="token operator">||</span> responseType <span class="token operator">===</span> <span class="token string">&#39;json&#39;</span>
          <span class="token operator">?</span> request<span class="token punctuation">.</span>responseText
          <span class="token operator">:</span> request<span class="token punctuation">.</span>response
      <span class="token comment">// 构造出response</span>
      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> responseData<span class="token punctuation">,</span>
        <span class="token literal-property property">status</span><span class="token operator">:</span> request<span class="token punctuation">.</span>status<span class="token punctuation">,</span>
        <span class="token literal-property property">statusText</span><span class="token operator">:</span> request<span class="token punctuation">.</span>statusText<span class="token punctuation">,</span>
        <span class="token literal-property property">headers</span><span class="token operator">:</span> responseHeaders<span class="token punctuation">,</span>
        config<span class="token punctuation">,</span>
        request<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 调用settle方法来处理promise</span>
      <span class="token function">settle</span><span class="token punctuation">(</span>
        <span class="token keyword">function</span> <span class="token function">_resolve</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
          <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">function</span> <span class="token function">_reject</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
          <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        response
      <span class="token punctuation">)</span>
      <span class="token comment">// 清空request</span>
      request <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果request上有onloadend属性，则直接替换</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;onloadend&#39;</span> <span class="token keyword">in</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span>onloadend <span class="token operator">=</span> onloadend
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 否则就用onreadystatechange来模拟onloadend</span>
      request<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>request <span class="token operator">||</span> request<span class="token punctuation">.</span>readyState <span class="token operator">!==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 请求出错，我们没有得到响应，这将由 onerror 处理。</span>
        <span class="token comment">// 但只有一个例外：请求使用 file:协议，此时即使它是一个成功的请求,大多数浏览器也将返回状态为 0，</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          request<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
          <span class="token operator">!</span><span class="token punctuation">(</span>
            request<span class="token punctuation">.</span>responseURL <span class="token operator">&amp;&amp;</span> request<span class="token punctuation">.</span>responseURL<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;file:&#39;</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// readystate 处理器在 onerror 或 ontimeout处理器之前调用， 因此我们应该在next &#39;tick&#39; 上调用onloadend</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span>onloadend<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 处理浏览器对request的取消(与手动取消不同)</span>
    request<span class="token punctuation">.</span><span class="token function-variable function">onabort</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleAbort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
          <span class="token string">&#39;Request aborted&#39;</span><span class="token punctuation">,</span>
          AxiosError<span class="token punctuation">.</span><span class="token constant">ECONNABORTED</span><span class="token punctuation">,</span>
          config<span class="token punctuation">,</span>
          request
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token comment">// 清空request</span>
      request <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 处理更低级别的网络错误</span>
    request<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 真正的错误被浏览器掩盖了</span>
      <span class="token comment">// onerror应当只可被网络错误触发</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
          <span class="token string">&#39;NetWork Error&#39;</span><span class="token punctuation">,</span>
          AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_NETWORK</span><span class="token punctuation">,</span>
          config<span class="token punctuation">,</span>
          request
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      request <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 处理超时</span>
    request<span class="token punctuation">.</span><span class="token function-variable function">ontimeout</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> timeoutMessage <span class="token operator">=</span> config<span class="token punctuation">.</span>timeout
        <span class="token operator">?</span> <span class="token string">&#39;timeout of &#39;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span>timeout <span class="token operator">+</span> <span class="token string">&#39;ms exceeded&#39;</span>
        <span class="token operator">:</span> <span class="token string">&#39;timeout exceeded&#39;</span>

      <span class="token keyword">let</span> transitional <span class="token operator">=</span> config<span class="token punctuation">.</span>transitional <span class="token operator">||</span> transitionalDefaults
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>timeoutMessage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        timeoutMessage <span class="token operator">=</span> config<span class="token punctuation">.</span>timeoutMessage
      <span class="token punctuation">}</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
          timeoutMessage<span class="token punctuation">,</span>
          transitional<span class="token punctuation">.</span>clarifyTimeoutError
            <span class="token operator">?</span> AxiosError<span class="token punctuation">.</span><span class="token constant">ETIMEDOUT</span>
            <span class="token operator">:</span> AxiosError<span class="token punctuation">.</span><span class="token constant">ECONNABORTED</span><span class="token punctuation">,</span>
          config<span class="token punctuation">,</span>
          request
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token comment">// 清空request</span>
      request <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 添加 xsrf 头</span>
    <span class="token comment">// 只能在浏览器环境中生效</span>
    <span class="token comment">// 在工作者线程或者RN中不生效</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isStandardBrowserEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> xsrfValue <span class="token operator">=</span>
        config<span class="token punctuation">.</span>withCredentials <span class="token operator">||</span>
        <span class="token punctuation">(</span><span class="token function">isURLSameOrigin</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          config<span class="token punctuation">.</span>xsrfCookieName <span class="token operator">&amp;&amp;</span>
          cookies<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>xsrfValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 添加 xsrf 头</span>
        requestHeaders<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>xsrfHeaderName<span class="token punctuation">,</span> xsrfValue<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    requestData <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> requestHeaders<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;setRequestHeader&#39;</span> <span class="token keyword">in</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      utils<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>
        requestHeaders<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">function</span> <span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 把header添加给request</span>
          request<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 添加withCredentials</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>withCredentials<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>config<span class="token punctuation">.</span>withCredentials
    <span class="token punctuation">}</span>
    <span class="token comment">// 添加 responseType</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>responseType <span class="token operator">&amp;&amp;</span> responseType <span class="token operator">!==</span> <span class="token string">&#39;json&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span>responseType <span class="token operator">=</span> config<span class="token punctuation">.</span>responseType
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果配置了 download 或者 upload, 针对 progress 事件，处理下载或者上传进度事件</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> config<span class="token punctuation">.</span>onDownloadProgress <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
        <span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span>
        <span class="token function">progressEventReducer</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>onDownloadProgress<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 不是所有的浏览器都支持上传事件</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> config<span class="token punctuation">.</span>onUploadProgress <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span> request<span class="token punctuation">.</span>upload<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
        <span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span>
        <span class="token function">progressEventReducer</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>onUploadProgress<span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 提供取消请求功能，调用原生 abort 方法</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>cancelToken <span class="token operator">||</span> config<span class="token punctuation">.</span>signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">onCanceled</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">cancel</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token operator">!</span>cancel <span class="token operator">||</span> cancel<span class="token punctuation">.</span>type
            <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">CanceledError</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> request<span class="token punctuation">)</span>
            <span class="token operator">:</span> cancel
        <span class="token punctuation">)</span>
        request<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        request <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
      config<span class="token punctuation">.</span>cancelToken <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>onCanceled<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span>aborted
          <span class="token operator">?</span> <span class="token function">onCanceled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token operator">:</span> config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> onCanceled<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token operator">!</span>requestData <span class="token operator">&amp;&amp;</span>
      requestData <span class="token operator">!==</span> <span class="token boolean">false</span> <span class="token operator">&amp;&amp;</span>
      requestData <span class="token operator">!==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
      requestData <span class="token operator">!==</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      requestData <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> protocol <span class="token operator">=</span> <span class="token function">parseProtocol</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>protocol <span class="token operator">&amp;&amp;</span> platform<span class="token punctuation">.</span>protocols<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>protocol<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
          <span class="token string">&#39;unSupported protocol &#39;</span> <span class="token operator">+</span> protocol <span class="token operator">+</span> <span class="token string">&#39;:&#39;</span><span class="token punctuation">,</span>
          AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_REQUEST</span><span class="token punctuation">,</span>
          config
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// request.send()  发送请求</span>
    request<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>requestData<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>/adapters/http.js </code> 文件</p><p>大概分为以下几个步骤</p><ul><li>转换数据格式</li><li>处理代理</li><li>解析 <code>URL</code></li><li>创建请求</li><li>添加 <code>error</code>、 <code>end</code>、<code>data</code> 等事件</li><li>发送请求</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> platform <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../platform&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 文件内容如下</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">isNode</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">classes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">URLSearchParams</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./classes/URLSearchParams&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">FormData</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./classes/FormData&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Blob</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Blob <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> Blob<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 主要看这里，支持的协议前缀</span>
  <span class="token literal-property property">protocols</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;https&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;file&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;data&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// http.js 文件</span>

<span class="token comment">//设置代理用的方法</span>
<span class="token keyword">function</span> <span class="token function">setProxy</span><span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span> configProxy<span class="token punctuation">,</span> location</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> proxy <span class="token operator">=</span> configProxy
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>proxy <span class="token operator">&amp;&amp;</span> proxy <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> proxyUrl <span class="token operator">=</span> <span class="token function">getProxyForUrl</span><span class="token punctuation">(</span>location<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>proxyUrl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      proxy <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>proxyUrl<span class="token punctuation">)</span>
      <span class="token comment">// replace &#39;host&#39; since the proxy object is not a URL object</span>
      proxy<span class="token punctuation">.</span>host <span class="token operator">=</span> proxy<span class="token punctuation">.</span>hostname
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>proxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// basic形式的Proxy-Authorization头</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>auth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Support proxy auth object form</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>username <span class="token operator">||</span> proxy<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        proxy<span class="token punctuation">.</span>auth <span class="token operator">=</span>
          <span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>username <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>password <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> base64 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>auth<span class="token punctuation">,</span> <span class="token string">&#39;utf8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;base64&#39;</span><span class="token punctuation">)</span>
      options<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;Proxy-Authorization&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;Basic &#39;</span> <span class="token operator">+</span> base64
    <span class="token punctuation">}</span>

    options<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>host <span class="token operator">=</span>
      options<span class="token punctuation">.</span>hostname <span class="token operator">+</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>port <span class="token operator">?</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> options<span class="token punctuation">.</span>port <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
    options<span class="token punctuation">.</span>hostname <span class="token operator">=</span> proxy<span class="token punctuation">.</span>host
    options<span class="token punctuation">.</span>host <span class="token operator">=</span> proxy<span class="token punctuation">.</span>host
    options<span class="token punctuation">.</span>port <span class="token operator">=</span> proxy<span class="token punctuation">.</span>port
    options<span class="token punctuation">.</span>path <span class="token operator">=</span> location
    <span class="token keyword">if</span> <span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>protocol<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>protocol <span class="token operator">=</span> proxy<span class="token punctuation">.</span>protocol
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果使用了代理，那么重定向时必须要经过代理</span>
  options<span class="token punctuation">.</span>beforeRedirects<span class="token punctuation">.</span><span class="token function-variable function">proxy</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">beforeRedirect</span><span class="token punctuation">(</span><span class="token parameter">redirectOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Configure proxy for redirected request, passing the original config proxy to apply</span>
    <span class="token comment">// the exact same logic as if the redirected request was performed by axios directly.</span>
    <span class="token function">setProxy</span><span class="token punctuation">(</span>redirectOptions<span class="token punctuation">,</span> configProxy<span class="token punctuation">,</span> redirectOptions<span class="token punctuation">.</span>href<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">httpAdapter</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">dispatchHttpRequest</span><span class="token punctuation">(</span>
    <span class="token parameter">resolvePromise<span class="token punctuation">,</span>
    rejectPromise</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取配置并声明一些变量</span>
    <span class="token keyword">let</span> onCanceled
    <span class="token keyword">let</span> data <span class="token operator">=</span> config<span class="token punctuation">.</span>data
    <span class="token keyword">const</span> responseType <span class="token operator">=</span> config<span class="token punctuation">.</span>responseType
    <span class="token keyword">const</span> responseEncoding <span class="token operator">=</span> config<span class="token punctuation">.</span>responseEncoding
    <span class="token keyword">const</span> method <span class="token operator">=</span> config<span class="token punctuation">.</span>method<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> isFinished
    <span class="token keyword">let</span> isDone
    <span class="token keyword">let</span> rejected <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">let</span> req
    <span class="token comment">// 在AxiosRequest类实现之前的临时内部发射器</span>
    <span class="token comment">// temporary internal emitter until the AxiosRequest class will be implemented</span>
    <span class="token keyword">const</span> emitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">onFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isFinished<span class="token punctuation">)</span> <span class="token keyword">return</span>
      isFinished <span class="token operator">=</span> <span class="token boolean">true</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">.</span><span class="token function">unsubscribe</span><span class="token punctuation">(</span>onCanceled<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> onCanceled<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      emitter<span class="token punctuation">.</span><span class="token function">removeAllListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">done</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> isRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isDone<span class="token punctuation">)</span> <span class="token keyword">return</span>

      isDone <span class="token operator">=</span> <span class="token boolean">true</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>isRejected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rejected <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">onFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      isRejected <span class="token operator">?</span> <span class="token function">rejectPromise</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">resolvePromise</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 创建成功回调函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">done</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 创建失败回调函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">done</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 创建 abort 函数</span>
    <span class="token keyword">function</span> <span class="token function">abort</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 触发 abort 事件</span>
      emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span>
        <span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span>
        <span class="token operator">!</span>reason <span class="token operator">||</span> reason<span class="token punctuation">.</span>type
          <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">CanceledError</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> req<span class="token punctuation">)</span>
          <span class="token operator">:</span> reason
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 监听 abort 事件</span>
    emitter<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> reject<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>cancelToken <span class="token operator">||</span> config<span class="token punctuation">.</span>signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>cancelToken <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>cancelToken<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>abort<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span>aborted
          <span class="token operator">?</span> <span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token operator">:</span> config<span class="token punctuation">.</span>signal<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> abort<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 解析url</span>
    <span class="token keyword">const</span> fullPath <span class="token operator">=</span> <span class="token function">buildFullPath</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>baseURL<span class="token punctuation">,</span> config<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
    <span class="token keyword">const</span> parsed <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">)</span>
    <span class="token keyword">const</span> protocol <span class="token operator">=</span> parsed<span class="token punctuation">.</span>protocol <span class="token operator">||</span> supportedProtocols<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>protocol <span class="token operator">===</span> <span class="token string">&#39;data:&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 协议开头为 data:</span>
      <span class="token keyword">let</span> convertedData
      <span class="token keyword">if</span> <span class="token punctuation">(</span>method <span class="token operator">!==</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 并且请求方式不是 get，则拒绝：方法不允许</span>
        <span class="token keyword">return</span> <span class="token function">settle</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token number">405</span><span class="token punctuation">,</span>
          <span class="token literal-property property">statusText</span><span class="token operator">:</span> <span class="token string">&#39;method not allowed&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          config<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 解析 data 为 Buffer 或者 Blob</span>
        convertedData <span class="token operator">=</span> <span class="token function">fromDataURI</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>url<span class="token punctuation">,</span> responseType <span class="token operator">===</span> <span class="token string">&#39;blob&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">Blob</span><span class="token operator">:</span> config<span class="token punctuation">.</span>env <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>env<span class="token punctuation">.</span>Blob<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> AxiosError<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_REQUEST</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 如果响应类型为 text</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>responseType <span class="token operator">===</span> <span class="token string">&#39;text&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据相应转码规则，转换为字符串</span>
        convertedData <span class="token operator">=</span> convertedData<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>responseEncoding<span class="token punctuation">)</span>
        <span class="token comment">//</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>responseEncoding <span class="token operator">||</span> responseEncoding <span class="token operator">===</span> <span class="token string">&#39;utf8&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          data <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">stripBOM</span><span class="token punctuation">(</span>convertedData<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>responseType <span class="token operator">===</span> <span class="token string">&#39;stream&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        convertedData <span class="token operator">=</span> stream<span class="token punctuation">.</span>Readable<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>convertedData<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 返回</span>
      <span class="token keyword">return</span> <span class="token function">settle</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> convertedData<span class="token punctuation">,</span>
        <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        <span class="token literal-property property">statusText</span><span class="token operator">:</span> <span class="token string">&#39;OK&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        config<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果是不支持的协议，就返回并提示协议不支持</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>supportedProtocols<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>protocol<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
          <span class="token string">&#39;Unsupported protocol &#39;</span> <span class="token operator">+</span> protocol<span class="token punctuation">,</span>
          AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_REQUEST</span><span class="token punctuation">,</span>
          config
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> headers <span class="token operator">=</span> AxiosHeaders<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Set User-Agent (required by some servers)</span>
    <span class="token comment">// See https://github.com/axios/axios/issues/69</span>
    <span class="token comment">// User-Agent is specified; handle case where no UA header is desired</span>
    <span class="token comment">// Only set header if it hasn&#39;t been set in config</span>
    headers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;axios/&#39;</span> <span class="token operator">+</span> <span class="token constant">VERSION</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> onDownloadProgress <span class="token operator">=</span> config<span class="token punctuation">.</span>onDownloadProgress
    <span class="token keyword">const</span> onUploadProgress <span class="token operator">=</span> config<span class="token punctuation">.</span>onUploadProgress
    <span class="token keyword">const</span> maxRate <span class="token operator">=</span> config<span class="token punctuation">.</span>maxRate
    <span class="token keyword">let</span> maxUploadRate <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">let</span> maxDownloadRate <span class="token operator">=</span> <span class="token keyword">undefined</span>

    <span class="token comment">// support for https://www.npmjs.com/package/form-data api</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isFormData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> utils<span class="token punctuation">.</span><span class="token function">isFunction</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>getHeaders<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      headers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isStream</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Buffer<span class="token punctuation">.</span><span class="token function">isBuffer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Nothing to do...</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isArrayBuffer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isString</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
            <span class="token string">&#39;Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream&#39;</span><span class="token punctuation">,</span>
            AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_REQUEST</span><span class="token punctuation">,</span>
            config
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 如果data 存在的话，就添加 Content-Length header属性</span>
      headers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;Content-Length&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token comment">// 如果 data.length 超过 配置中的 config.maxBodyLength 就报错并返回</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>maxBodyLength <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> config<span class="token punctuation">.</span>maxBodyLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
            <span class="token string">&#39;Request body larger than maxBodyLength limit&#39;</span><span class="token punctuation">,</span>
            AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_REQUEST</span><span class="token punctuation">,</span>
            config
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> contentLength <span class="token operator">=</span> <span class="token operator">+</span>headers<span class="token punctuation">.</span><span class="token function">getContentLength</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>maxRate<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      maxUploadRate <span class="token operator">=</span> maxRate<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
      maxDownloadRate <span class="token operator">=</span> maxRate<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      maxUploadRate <span class="token operator">=</span> maxDownloadRate <span class="token operator">=</span> maxRate
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>onUploadProgress <span class="token operator">||</span> maxUploadRate<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isStream</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data <span class="token operator">=</span> stream<span class="token punctuation">.</span>Readable<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">objectMode</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      data <span class="token operator">=</span> stream<span class="token punctuation">.</span><span class="token function">pipeline</span><span class="token punctuation">(</span>
        <span class="token punctuation">[</span>
          data<span class="token punctuation">,</span>
          <span class="token keyword">new</span> <span class="token class-name">AxiosTransformStream</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">length</span><span class="token operator">:</span> utils<span class="token punctuation">.</span><span class="token function">toFiniteNumber</span><span class="token punctuation">(</span>contentLength<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">maxRate</span><span class="token operator">:</span> utils<span class="token punctuation">.</span><span class="token function">toFiniteNumber</span><span class="token punctuation">(</span>maxUploadRate<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        utils<span class="token punctuation">.</span>noop
      <span class="token punctuation">)</span>

      onUploadProgress <span class="token operator">&amp;&amp;</span>
        data<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">progress</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">onUploadProgress</span><span class="token punctuation">(</span>
            Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>progress<span class="token punctuation">,</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">upload</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// HTTP basic authentication</span>
    <span class="token keyword">let</span> auth <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>auth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> username <span class="token operator">=</span> config<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>username <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>
      <span class="token keyword">const</span> password <span class="token operator">=</span> config<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>password <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>
      auth <span class="token operator">=</span> username <span class="token operator">+</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> password
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>auth <span class="token operator">&amp;&amp;</span> parsed<span class="token punctuation">.</span>auth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> urlAuth <span class="token operator">=</span> parsed<span class="token punctuation">.</span>auth<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> urlUsername <span class="token operator">=</span> urlAuth<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>
      <span class="token keyword">const</span> urlPassword <span class="token operator">=</span> urlAuth<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>
      auth <span class="token operator">=</span> urlUsername <span class="token operator">+</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> urlPassword
    <span class="token punctuation">}</span>

    auth <span class="token operator">&amp;&amp;</span> headers<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&#39;authorization&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">buildURL</span><span class="token punctuation">(</span>parsed<span class="token punctuation">.</span>path<span class="token punctuation">,</span> config<span class="token punctuation">.</span>params<span class="token punctuation">,</span> config<span class="token punctuation">.</span>paramsSerializer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
        <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\?</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token string">&#39;&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> customErr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
      customErr<span class="token punctuation">.</span>config <span class="token operator">=</span> config
      customErr<span class="token punctuation">.</span>url <span class="token operator">=</span> config<span class="token punctuation">.</span>url
      customErr<span class="token punctuation">.</span>exists <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>customErr<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    headers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;Accept-Encoding&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;gzip, deflate, gzip, br&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token function">buildURL</span><span class="token punctuation">(</span>
        parsed<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
        config<span class="token punctuation">.</span>params<span class="token punctuation">,</span>
        config<span class="token punctuation">.</span>paramsSerializer
      <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\?</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      method<span class="token punctuation">,</span>
      <span class="token literal-property property">headers</span><span class="token operator">:</span> headers<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">agents</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">http</span><span class="token operator">:</span> config<span class="token punctuation">.</span>httpAgent<span class="token punctuation">,</span> <span class="token literal-property property">https</span><span class="token operator">:</span> config<span class="token punctuation">.</span>httpsAgent <span class="token punctuation">}</span><span class="token punctuation">,</span>
      auth<span class="token punctuation">,</span>
      protocol<span class="token punctuation">,</span>
      <span class="token literal-property property">beforeRedirect</span><span class="token operator">:</span> dispatchBeforeRedirect<span class="token punctuation">,</span>
      <span class="token literal-property property">beforeRedirects</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>socketPath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>socketPath <span class="token operator">=</span> config<span class="token punctuation">.</span>socketPath
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>hostname <span class="token operator">=</span> parsed<span class="token punctuation">.</span>hostname
      options<span class="token punctuation">.</span>port <span class="token operator">=</span> parsed<span class="token punctuation">.</span>port
      <span class="token function">setProxy</span><span class="token punctuation">(</span>
        options<span class="token punctuation">,</span>
        config<span class="token punctuation">.</span>proxy<span class="token punctuation">,</span>
        protocol <span class="token operator">+</span>
          <span class="token string">&#39;//&#39;</span> <span class="token operator">+</span>
          parsed<span class="token punctuation">.</span>hostname <span class="token operator">+</span>
          <span class="token punctuation">(</span>parsed<span class="token punctuation">.</span>port <span class="token operator">?</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> parsed<span class="token punctuation">.</span>port <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
          options<span class="token punctuation">.</span>path
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> transport
    <span class="token keyword">const</span> isHttpsRequest <span class="token operator">=</span> isHttps<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>protocol<span class="token punctuation">)</span>
    <span class="token comment">// 判断是 http 还是 https</span>
    options<span class="token punctuation">.</span>agent <span class="token operator">=</span> isHttpsRequest <span class="token operator">?</span> config<span class="token punctuation">.</span>httpsAgent <span class="token operator">:</span> config<span class="token punctuation">.</span>httpAgent
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>transport<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      transport <span class="token operator">=</span> config<span class="token punctuation">.</span>transport
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>maxRedirects <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      transport <span class="token operator">=</span> isHttpsRequest <span class="token operator">?</span> https <span class="token operator">:</span> http
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>maxRedirects<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        options<span class="token punctuation">.</span>maxRedirects <span class="token operator">=</span> config<span class="token punctuation">.</span>maxRedirects
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>beforeRedirect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        options<span class="token punctuation">.</span>beforeRedirects<span class="token punctuation">.</span>config <span class="token operator">=</span> config<span class="token punctuation">.</span>beforeRedirect
      <span class="token punctuation">}</span>
      transport <span class="token operator">=</span> isHttpsRequest <span class="token operator">?</span> httpsFollow <span class="token operator">:</span> httpFollow
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>maxBodyLength <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>maxBodyLength <span class="token operator">=</span> config<span class="token punctuation">.</span>maxBodyLength
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// follow-redirects does not skip comparison, so it should always succeed for axios -1 unlimited</span>
      options<span class="token punctuation">.</span>maxBodyLength <span class="token operator">=</span> <span class="token number">Infinity</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>insecureHTTPParser<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>insecureHTTPParser <span class="token operator">=</span> config<span class="token punctuation">.</span>insecureHTTPParser
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建 request</span>
    req <span class="token operator">=</span> transport<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>options<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>destroyed<span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token keyword">const</span> streams <span class="token operator">=</span> <span class="token punctuation">[</span>res<span class="token punctuation">]</span>
      <span class="token comment">// 在需要的情况下，自动解压响应体</span>
      <span class="token keyword">let</span> responseStream <span class="token operator">=</span> res
      <span class="token comment">// 如果重定向，则返回最后一次请求的信息</span>
      <span class="token keyword">const</span> lastRequest <span class="token operator">=</span> res<span class="token punctuation">.</span>req <span class="token operator">||</span> req

      <span class="token comment">// if decompress disabled we should not decompress</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>decompress <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// if no content, but headers still say that it is encoded,</span>
        <span class="token comment">// remove the header not confuse downstream operations</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> res<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;content-encoding&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">delete</span> res<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;content-encoding&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">switch</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;content-encoding&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">/*eslint default-case:0*/</span>
          <span class="token keyword">case</span> <span class="token string">&#39;gzip&#39;</span><span class="token operator">:</span>
          <span class="token keyword">case</span> <span class="token string">&#39;compress&#39;</span><span class="token operator">:</span>
          <span class="token keyword">case</span> <span class="token string">&#39;deflate&#39;</span><span class="token operator">:</span>
            <span class="token comment">// add the unzipper to the body stream processing pipeline</span>
            streams<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>zlib<span class="token punctuation">.</span><span class="token function">createUnzip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

            <span class="token comment">// remove the content-encoding in order to not confuse downstream operations</span>
            <span class="token keyword">delete</span> res<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;content-encoding&#39;</span><span class="token punctuation">]</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token string">&#39;br&#39;</span><span class="token operator">:</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>isBrotliSupported<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              streams<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>zlib<span class="token punctuation">.</span><span class="token function">createBrotliDecompress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token keyword">delete</span> res<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;content-encoding&#39;</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>onDownloadProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> responseLength <span class="token operator">=</span> <span class="token operator">+</span>res<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">&#39;content-length&#39;</span><span class="token punctuation">]</span>

        <span class="token keyword">const</span> transformStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AxiosTransformStream</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">length</span><span class="token operator">:</span> utils<span class="token punctuation">.</span><span class="token function">toFiniteNumber</span><span class="token punctuation">(</span>responseLength<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token literal-property property">maxRate</span><span class="token operator">:</span> utils<span class="token punctuation">.</span><span class="token function">toFiniteNumber</span><span class="token punctuation">(</span>maxDownloadRate<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        onDownloadProgress <span class="token operator">&amp;&amp;</span>
          transformStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">progress</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">onDownloadProgress</span><span class="token punctuation">(</span>
              Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>progress<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">download</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>

        streams<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>transformStream<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      responseStream <span class="token operator">=</span>
        streams<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span>
          <span class="token operator">?</span> stream<span class="token punctuation">.</span><span class="token function">pipeline</span><span class="token punctuation">(</span>streams<span class="token punctuation">,</span> utils<span class="token punctuation">.</span>noop<span class="token punctuation">)</span>
          <span class="token operator">:</span> streams<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

      <span class="token keyword">const</span> offListeners <span class="token operator">=</span> stream<span class="token punctuation">.</span><span class="token function">finished</span><span class="token punctuation">(</span>responseStream<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">offListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">onFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">status</span><span class="token operator">:</span> res<span class="token punctuation">.</span>statusCode<span class="token punctuation">,</span>
        <span class="token literal-property property">statusText</span><span class="token operator">:</span> res<span class="token punctuation">.</span>statusMessage<span class="token punctuation">,</span>
        <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">AxiosHeaders</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">,</span>
        config<span class="token punctuation">,</span>
        <span class="token literal-property property">request</span><span class="token operator">:</span> lastRequest<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>responseType <span class="token operator">===</span> <span class="token string">&#39;stream&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        response<span class="token punctuation">.</span>data <span class="token operator">=</span> responseStream
        <span class="token function">settle</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> responseBuffer <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">let</span> totalResponseBytes <span class="token operator">=</span> <span class="token number">0</span>

        responseStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleStreamData</span><span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          responseBuffer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span>
          totalResponseBytes <span class="token operator">+=</span> chunk<span class="token punctuation">.</span>length

          <span class="token comment">// make sure the content length is not over the maxContentLength if specified</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>
            config<span class="token punctuation">.</span>maxContentLength <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span>
            totalResponseBytes <span class="token operator">&gt;</span> config<span class="token punctuation">.</span>maxContentLength
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// stream.destroy() emit aborted event before calling reject() on Node.js v16</span>
            rejected <span class="token operator">=</span> <span class="token boolean">true</span>
            responseStream<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>
              <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
                <span class="token string">&#39;maxContentLength size of &#39;</span> <span class="token operator">+</span>
                  config<span class="token punctuation">.</span>maxContentLength <span class="token operator">+</span>
                  <span class="token string">&#39; exceeded&#39;</span><span class="token punctuation">,</span>
                AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_RESPONSE</span><span class="token punctuation">,</span>
                config<span class="token punctuation">,</span>
                lastRequest
              <span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        responseStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;aborted&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handlerStreamAborted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>rejected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">const</span> err <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
            <span class="token string">&#39;maxContentLength size of &#39;</span> <span class="token operator">+</span>
              config<span class="token punctuation">.</span>maxContentLength <span class="token operator">+</span>
              <span class="token string">&#39; exceeded&#39;</span><span class="token punctuation">,</span>
            AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_RESPONSE</span><span class="token punctuation">,</span>
            config<span class="token punctuation">,</span>
            lastRequest
          <span class="token punctuation">)</span>
          responseStream<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        responseStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleStreamError</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>destroyed<span class="token punctuation">)</span> <span class="token keyword">return</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>AxiosError<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> lastRequest<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        responseStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleStreamEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> responseData <span class="token operator">=</span>
              responseBuffer<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span>
                <span class="token operator">?</span> responseBuffer<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
                <span class="token operator">:</span> Buffer<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>responseBuffer<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>responseType <span class="token operator">!==</span> <span class="token string">&#39;arraybuffer&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              responseData <span class="token operator">=</span> responseData<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>responseEncoding<span class="token punctuation">)</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>responseEncoding <span class="token operator">||</span> responseEncoding <span class="token operator">===</span> <span class="token string">&#39;utf8&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                responseData <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">stripBOM</span><span class="token punctuation">(</span>responseData<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            response<span class="token punctuation">.</span>data <span class="token operator">=</span> responseData
          <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>
              AxiosError<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> response<span class="token punctuation">.</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token function">settle</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      emitter<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>responseStream<span class="token punctuation">.</span>destroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          responseStream<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
          responseStream<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    emitter<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
      req<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// Handle errors</span>
    req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleRequestError</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// @todo remove</span>
      <span class="token comment">// if (req.aborted &amp;&amp; err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>AxiosError<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> req<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// set tcp keep alive to prevent drop connection by peer</span>
    req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;socket&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleRequestSocket</span><span class="token punctuation">(</span><span class="token parameter">socket</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// default interval of sending ack packet is 1 minute</span>
      socket<span class="token punctuation">.</span><span class="token function">setKeepAlive</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// Handle request timeout</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// This is forcing a int timeout to avoid problems if the \`req\` interface doesn&#39;t handle other types.</span>
      <span class="token keyword">const</span> timeout <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>timeout<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
            <span class="token string">&#39;error trying to parse \`config.timeout\` to int&#39;</span><span class="token punctuation">,</span>
            AxiosError<span class="token punctuation">.</span><span class="token constant">ERR_BAD_OPTION_VALUE</span><span class="token punctuation">,</span>
            config<span class="token punctuation">,</span>
            req
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>

        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.</span>
      <span class="token comment">// And timer callback will be fired, and abort() will be invoked before connection, then get &quot;socket hang up&quot; and code ECONNRESET.</span>
      <span class="token comment">// At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.</span>
      <span class="token comment">// And then these socket which be hang up will devouring CPU little by little.</span>
      <span class="token comment">// ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.</span>
      req<span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">handleRequestTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isDone<span class="token punctuation">)</span> <span class="token keyword">return</span>
        <span class="token keyword">let</span> timeoutErrorMessage <span class="token operator">=</span> config<span class="token punctuation">.</span>timeout
          <span class="token operator">?</span> <span class="token string">&#39;timeout of &#39;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span>timeout <span class="token operator">+</span> <span class="token string">&#39;ms exceeded&#39;</span>
          <span class="token operator">:</span> <span class="token string">&#39;timeout exceeded&#39;</span>
        <span class="token keyword">const</span> transitional <span class="token operator">=</span> config<span class="token punctuation">.</span>transitional <span class="token operator">||</span> transitionalDefaults
        <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>timeoutErrorMessage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          timeoutErrorMessage <span class="token operator">=</span> config<span class="token punctuation">.</span>timeoutErrorMessage
        <span class="token punctuation">}</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token keyword">new</span> <span class="token class-name">AxiosError</span><span class="token punctuation">(</span>
            timeoutErrorMessage<span class="token punctuation">,</span>
            transitional<span class="token punctuation">.</span>clarifyTimeoutError
              <span class="token operator">?</span> AxiosError<span class="token punctuation">.</span><span class="token constant">ETIMEDOUT</span>
              <span class="token operator">:</span> AxiosError<span class="token punctuation">.</span><span class="token constant">ECONNABORTED</span><span class="token punctuation">,</span>
            config<span class="token punctuation">,</span>
            req
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        <span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Send the request</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isStream</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> ended <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token keyword">let</span> errored <span class="token operator">=</span> <span class="token boolean">false</span>

      data<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        ended <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      data<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        errored <span class="token operator">=</span> <span class="token boolean">true</span>
        req<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      data<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;close&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ended <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>errored<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">abort</span><span class="token punctuation">(</span>
            <span class="token keyword">new</span> <span class="token class-name">CanceledError</span><span class="token punctuation">(</span><span class="token string">&#39;Request stream has been aborted&#39;</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> req<span class="token punctuation">)</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      data<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      req<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_6、取消请求" tabindex="-1"><a class="header-anchor" href="#_6、取消请求" aria-hidden="true">#</a> 6、取消请求</h2><h3 id="取消请求示例" tabindex="-1"><a class="header-anchor" href="#取消请求示例" aria-hidden="true">#</a> 取消请求示例</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> cancel <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3000/posts&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 1. 添加配置对象的属性</span>
  <span class="token literal-property property">cancelToken</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">axios<span class="token punctuation">.</span>CancelToken</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 3. 将 C 的值赋值给 cancel</span>
    cancel <span class="token operator">=</span> c
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
  cancel <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 取消请求</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cancel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="源码解析" tabindex="-1"><a class="header-anchor" href="#源码解析" aria-hidden="true">#</a> 源码解析</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// CancelToken.js</span>

<span class="token keyword">class</span> <span class="token class-name">CancelToken</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 参数必须是一个函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> executor <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;executor must be a function.&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> resolvePromise
    <span class="token comment">// 设定一个 promise 实例</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">promiseExecutor</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      resolvePromise <span class="token operator">=</span> resolve
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token keyword">this</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">cancel</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>token<span class="token punctuation">.</span>_listeners<span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token keyword">let</span> i <span class="token operator">=</span> token<span class="token punctuation">.</span>_listeners<span class="token punctuation">.</span>length

      <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        token<span class="token punctuation">.</span>_listeners<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>cancel<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      token<span class="token punctuation">.</span>_listeners <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 重写 then 函数</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>promise<span class="token punctuation">.</span><span class="token function-variable function">then</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">onfulfilled</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> _resolve
      <span class="token comment">// eslint-disable-next-line func-names</span>
      <span class="token keyword">const</span> promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        token<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span>
        _resolve <span class="token operator">=</span> resolve
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>onfulfilled<span class="token punctuation">)</span>

      promise<span class="token punctuation">.</span><span class="token function-variable function">cancel</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        token<span class="token punctuation">.</span><span class="token function">unsubscribe</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> promise
    <span class="token punctuation">}</span>

    <span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token parameter">message<span class="token punctuation">,</span> config<span class="token punctuation">,</span> request</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">.</span>reason<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 取消集合已经被 执行了</span>
        <span class="token comment">// Cancellation has already been requested</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>

      token<span class="token punctuation">.</span>reason <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CanceledError</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> config<span class="token punctuation">,</span> request<span class="token punctuation">)</span>
      <span class="token function">resolvePromise</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>reason<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Throws a \`CanceledError\` if cancellation has been requested.
   */</span>
  <span class="token function">throwIfRequested</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reason
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 订阅 监听函数</span>
  <span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">listener</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">listener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_listeners<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_listeners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>listener<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_listeners <span class="token operator">=</span> <span class="token punctuation">[</span>listener<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 取消 监听函数</span>
  <span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token parameter">listener</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_listeners<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_listeners<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>listener<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_listeners<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Returns an object that contains a new \`CancelToken\` and a function that, when called,
   * cancels the \`CancelToken\`.
   */</span>
  <span class="token keyword">static</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> cancel
    <span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CancelToken</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">executor</span><span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cancel <span class="token operator">=</span> c
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      token<span class="token punctuation">,</span>
      cancel<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> CancelToken
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体流程可以参考如下：</p><ol><li><p>声明时候声明 cancel 变量并赋值</p></li><li><p>请求内部的 <code>xhr.js</code> 进行订阅 <code>subscribe</code> 一个取消函数(内部有 abort 相关逻辑)</p></li><li><p><code>subscribe</code> 方法实际上是往 cancelToken 实例中创建一个<code> listener</code> 数组，并 push 取消请求函数</p></li><li><p>当调用 <code>cancel()</code> 时候， 实例上的 <code>this.promise</code> 变为 fullefilled 状态，执行 <code>.then</code> 相关逻辑 （遍历 <code>listener</code> 数组，并传入参数 new Cancel（meesage） 示例）</p></li><li><p>一一执行 步骤 3 中 被 push 的 取消请求逻辑 ( 执行 request.abort() 取消请求 )</p></li></ol><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3378643bc45c4d928d1b9eaba7d053c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p><h2 id="_7、csrf-防御" tabindex="-1"><a class="header-anchor" href="#_7、csrf-防御" aria-hidden="true">#</a> 7、CSRF 防御</h2><p>Axios 支持防御 CSRF(Cross-site request forgery，跨站请求伪造)攻击，而防御 CSRF 攻击的最简单方式就是加 Token。</p><p>CSRF 的攻击可以简述为：服务器错把攻击者的请求当成了正常用户的请求。</p><p>加一个 Token 为什么就能解决呐?首先 Token 是服务端随用户每次请求动态生成下发的，用户在提交表单、查询数据等行为的时候，需要在网络请求体加上这个临时性的 Token 值，攻击者无法在三方网站中获取当前 Token，因此服务端就可以通过验证 Token 来区分是否是正常用户的请求。</p><p>Axios 在请求配置中提供了两个字段：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// cookie 中携带的 Token 名称，通过该名称可以从 cookie 中拿到 Token 值</span>
<span class="token literal-property property">xsrfCookieName</span><span class="token operator">:</span> <span class="token string">&#39;XSRF-TOKEN&#39;</span><span class="token punctuation">,</span>
<span class="token comment">// 请求 Header 中携带的 Token 名称，通过该成名可从 Header 中拿到 Token 值</span>
<span class="token literal-property property">xsrfHeaderName</span><span class="token operator">:</span> <span class="token string">&#39;X-XSRF-TOKEN&#39;</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用于附加验证防御 CSRF 攻击的 Token</p><h2 id="_8、一些工具函数" tabindex="-1"><a class="header-anchor" href="#_8、一些工具函数" aria-hidden="true">#</a> 8、一些工具函数</h2><h3 id="mergeconfig-函数" tabindex="-1"><a class="header-anchor" href="#mergeconfig-函数" aria-hidden="true">#</a> mergeConfig 函数</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span><span class="token parameter">config1<span class="token punctuation">,</span> config2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// eslint-disable-next-line no-param-reassign</span>
  config2 <span class="token operator">=</span> config2 <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> utils<span class="token punctuation">.</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> source<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> source<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> source<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source
  <span class="token punctuation">}</span>

  <span class="token comment">// eslint-disable-next-line consistent-return</span>
  <span class="token keyword">function</span> <span class="token function">mergeDeepProperties</span><span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span>config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">,</span> config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// eslint-disable-next-line consistent-return</span>
  <span class="token keyword">function</span> <span class="token function">valueFromConfig2</span><span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// eslint-disable-next-line consistent-return</span>
  <span class="token keyword">function</span> <span class="token function">defaultToConfig2</span><span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// eslint-disable-next-line consistent-return</span>
  <span class="token keyword">function</span> <span class="token function">mergeDirectKeys</span><span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token keyword">in</span> config2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span>config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">,</span> config2<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token keyword">in</span> config1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">getMergedValue</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> config1<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> mergeMap <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> valueFromConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">method</span><span class="token operator">:</span> valueFromConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> valueFromConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">baseURL</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">transformRequest</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">transformResponse</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">paramsSerializer</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">timeout</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">timeoutMessage</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">withCredentials</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">adapter</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">responseType</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">xsrfCookieName</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">xsrfHeaderName</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">onUploadProgress</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">onDownloadProgress</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">decompress</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">maxContentLength</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">maxBodyLength</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">beforeRedirect</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">transport</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">httpAgent</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">httpsAgent</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">cancelToken</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">socketPath</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">responseEncoding</span><span class="token operator">:</span> defaultToConfig2<span class="token punctuation">,</span>
    <span class="token literal-property property">validateStatus</span><span class="token operator">:</span> mergeDirectKeys<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  utils<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>config1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>config2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token function">computeConfigValue</span><span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> merge <span class="token operator">=</span> mergeMap<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">||</span> mergeDeepProperties
      <span class="token keyword">const</span> configValue <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span>
      <span class="token punctuation">;</span><span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">isUndefined</span><span class="token punctuation">(</span>configValue<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> merge <span class="token operator">!==</span> mergeDirectKeys<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token punctuation">(</span>config<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> configValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>

  <span class="token keyword">return</span> config
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9、一些拓展点" tabindex="-1"><a class="header-anchor" href="#_9、一些拓展点" aria-hidden="true">#</a> 9、一些拓展点</h2><h3 id="axios-与-axios-的关系" tabindex="-1"><a class="header-anchor" href="#axios-与-axios-的关系" aria-hidden="true">#</a> axios 与 Axios 的关系</h3><ol><li>从语法上来说，axios 不是 Axios 的实例</li><li>从功能上来说，axios 是 Axios 的实例</li><li>axios 是 Axios.prototype.request 函数 bind() 返回的函数</li><li>axios 作为对象由 Axios 原型对象上的所有方法（get/post/put 等），有 Axios 对象上所有属性(defaults, inteceptors)</li></ol><h3 id="instance-与-axios-的区别" tabindex="-1"><a class="header-anchor" href="#instance-与-axios-的区别" aria-hidden="true">#</a> instance 与 axios 的区别</h3><ol><li>相同 <ul><li>都是一个能发送任意请求的函数：request(config)</li><li>都能发送特定请求的各种放方法：get/put/post/delete 等</li><li>都有默认配置和拦截器的属性：defaults 和 interceptors</li></ul></li><li>不同 <ul><li>默认匹配的值很可能不一样</li><li>instance 没有 axios 后面添加的一些方法： create/CancelToken/all 等方法</li></ul></li></ol><h3 id="axios-的请求-响应数据转换器是什么" tabindex="-1"><a class="header-anchor" href="#axios-的请求-响应数据转换器是什么" aria-hidden="true">#</a> axios 的请求/响应数据转换器是什么</h3><ol><li><p>请求转换器：对请求头和请求体数据进行特定处理的函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">transformRequest</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">transformRequest</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> headers</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token keyword">const</span> hasJSONContentType <span class="token operator">=</span> contentType<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;application/json&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> isObjectPayload <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">isObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token operator">...</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isObjectPayload <span class="token operator">||</span> hasJSONContentType <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    headers<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&#39;application/json&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">stringifySafely</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> data<span class="token punctuation">;</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>响应转换器：将响应体 json 字符串解析为 js 对象或者数组 的函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">transformResponse</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">transformResponse</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token operator">...</span>
     <span class="token keyword">try</span> <span class="token punctuation">{</span>
     		<span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
 	<span class="token keyword">return</span> data<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="axios-create-的变化" tabindex="-1"><a class="header-anchor" href="#axios-create-的变化" aria-hidden="true">#</a> <code>axios.create</code> 的变化</h3>`,38),g=n("code",null,"axios.create",-1),h=n("em",null,"2021 年 9 月 5 号",-1),w={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fpull%2F2795",target:"_blank",rel:"noopener noreferrer"},x=n("strong",null,"详情见此条 PR",-1),q=t(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45e67be3bd784d82a636307ca7710eb2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img"></p><p>在创建 axios 实例的工厂方法内，绑定工厂方法到实例的 create 属性上。为什么不是在工厂方法外绑定呐?这是我们可能的习惯做法，Axios 之前确实也是这么做的。</p><p>原因简单来说就是，用户自己创建的实例依然可以调用 create 方法创建新的实例，例如：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;axios&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> jsonClient <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token string">&#39;json&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 该项配置可以在后续创建的实例中复用，而不必重复编码</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> serviceOne <span class="token operator">=</span> jsonClient<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token string">&#39;https://service.one/&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> serviceTwo <span class="token operator">=</span> jsonClient<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token string">&#39;https://service.two/&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 这样有助于复用实例的公共参数复用，减少重复编码。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),j=t(`<p>一个新的 PR</p><blockquote><p>链式调用骨架这里在 6 个月前一个新的 pr，重构了这部分的代码逻辑，<em>这个 pr 内容很大，你忍一下</em>：</p><p><strong><em>这里主要是针对了请求拦截器可能会出现异步情况、或有很长的宏任务执行，并且重构之前的代码中，因为请求事放到微任务中执行的，微任务创建的时机在构建 promise 链之前，如果当执行到请求之前宏任务耗时比较久，或者某个请求拦截器有做异步，会导致真正的</em></strong><code>ajax</code><strong><em>请求发送时机会有一定的延迟，所以解决这个问题是很有必要的。</em></strong></p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 请求拦截器储存数组</span>
<span class="token keyword">var</span> requestInterceptorChain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">// 默认所有请求拦截器都为同步</span>
<span class="token keyword">var</span> synchronousRequestInterceptors <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token comment">// 遍历注册好的请求拦截器数组</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">unshiftRequestInterceptors</span><span class="token punctuation">(</span>
  <span class="token parameter">interceptor</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这里interceptor是注册的每一个拦截器对象 axios请求拦截器向外暴露了runWhen配置来针对一些需要运行时检测来执行的拦截器</span>
  <span class="token comment">// 如果配置了该函数，并且返回结果为true，则记录到拦截器链中，反之则直接结束该层循环</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    <span class="token keyword">typeof</span> interceptor<span class="token punctuation">.</span>runWhen <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span>
    interceptor<span class="token punctuation">.</span><span class="token function">runWhen</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// interceptor.synchronous 是对外提供的配置，可标识该拦截器是异步还是同步 默认为false(异步)</span>
  <span class="token comment">// 这里是来同步整个执行链的执行方式的，如果有一个请求拦截器为异步 那么下面的promise执行链则会有不同的执行方式</span>
  synchronousRequestInterceptors <span class="token operator">=</span>
    synchronousRequestInterceptors <span class="token operator">&amp;&amp;</span> interceptor<span class="token punctuation">.</span>synchronous
  <span class="token comment">// 塞到请求拦截器数组中</span>
  requestInterceptorChain<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>
    interceptor<span class="token punctuation">.</span>fulfilled<span class="token punctuation">,</span>
    interceptor<span class="token punctuation">.</span>rejected
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 相应拦截器存储数组</span>
<span class="token keyword">var</span> responseInterceptorChain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">// 遍历按序push到拦截器存储数组中</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">pushResponseInterceptors</span><span class="token punctuation">(</span>
  <span class="token parameter">interceptor</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  responseInterceptorChain<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>interceptor<span class="token punctuation">.</span>fulfilled<span class="token punctuation">,</span> interceptor<span class="token punctuation">.</span>rejected<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> promise
<span class="token comment">// 如果为异步 其实也是默认情况</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>synchronousRequestInterceptors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这里和重构之前的逻辑是一致的了</span>
  <span class="token keyword">var</span> chain <span class="token operator">=</span> <span class="token punctuation">[</span>dispatchRequest<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span>
  <span class="token comment">// 请求拦截器塞到前面</span>
  <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>chain<span class="token punctuation">,</span> requestInterceptorChain<span class="token punctuation">)</span>
  <span class="token comment">// 响应拦截器塞到后面</span>
  chain <span class="token operator">=</span> chain<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>responseInterceptorChain<span class="token punctuation">)</span>
  promise <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token comment">// 循环 执行</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>chain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    promise <span class="token operator">=</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>chain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> chain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回promise</span>
  <span class="token keyword">return</span> promise
<span class="token punctuation">}</span>

<span class="token comment">// 这里则是同步的逻辑</span>
<span class="token keyword">var</span> newConfig <span class="token operator">=</span> config
<span class="token comment">// 请求拦截器一个一个的走 返回 请求前最新的config</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>requestInterceptorChain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> onFulfilled <span class="token operator">=</span> requestInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">var</span> onRejected <span class="token operator">=</span> requestInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 做异常捕获 有错直接抛出</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    newConfig <span class="token operator">=</span> <span class="token function">onFulfilled</span><span class="token punctuation">(</span>newConfig<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">onRejected</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 到这里 微任务不会过早的创建</span>
<span class="token comment">// 也就解决了 微任务过早创建、当前宏任务过长或某个请求拦截器中有异步任务而阻塞真正的请求延时发起问题</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  promise <span class="token operator">=</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span>newConfig<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 响应拦截器执行</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>responseInterceptorChain<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  promise <span class="token operator">=</span> promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
    responseInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    responseInterceptorChain<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">return</span> promise
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),R={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fissues%2F2609",target:"_blank",rel:"noopener noreferrer"},A=n("strong",null,"详情见此条 PR",-1),C=n("p",null,[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a9e873564e74066a76bd1993b94c220~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"img"})],-1),E=n("p",null,[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b0b2bfbf3d2496ca9f1b586a8d2e68a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"img"})],-1),T=n("p",null,"作者：思唯 链接：https://juejin.cn/post/7016255507392364557 来源：稀土掘金 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。",-1),_=t('<h3 id="转换器和拦截器的关系" tabindex="-1"><a class="header-anchor" href="#转换器和拦截器的关系" aria-hidden="true">#</a> 转换器和拦截器的关系</h3><blockquote><p>转换器和拦截器的最大的区别之一，transformer 里面只能“同步”操作，interceptor 里面可以“异步”。</p></blockquote><p>请求转换器（transformRequest）主要用来根据 data 格式，设置 http 请求头； 响应转换器（transformResponse）可以根据实际业务中服务端返回的数据格式，统一设置转换方法。 拦截器是被包装成了 Promise，显然主要是想用它来处理异步的。</p><p>汇总下就是：</p><p><strong>转换器是处理数据和请求头的，不能处理异步，不会阻断请求和响应流程；</strong></p><p><strong>拦截器可以处理异步需求，可以使用拦截器阻断请求或响应流程。</strong></p><h3 id="涉及到的设计模式" tabindex="-1"><a class="header-anchor" href="#涉及到的设计模式" aria-hidden="true">#</a> 涉及到的设计模式</h3><p>Axios 涉及到的设计模式就有：<strong>单例模式</strong>、<strong>工厂模式</strong>、<strong>职责链模式</strong>、<strong>适配器模式</strong>，因此绝对是值得学习的一个工具库，梳理之后不仅利于我们灵活使用其 API，更有助于根据业务去自定义扩展封装网络请求，将网络请求统一收口。</p><h3 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h3>',9),P={href:"https://juejin.cn/post/7016255507392364557#comment",target:"_blank",rel:"noopener noreferrer"},S={href:"https://juejin.cn/post/7029729114378469383",target:"_blank",rel:"noopener noreferrer"},D={href:"https://developer.51cto.com/article/691169.html",target:"_blank",rel:"noopener noreferrer"},O={href:"https://linjingyi.cn/posts/fe9fb5af.html",target:"_blank",rel:"noopener noreferrer"},I={href:"https://i-fanr.com/2022/03/22/axios-resource/",target:"_blank",rel:"noopener noreferrer"};function U(L,B){const p=e("ExternalLinkIcon"),o=e("CommentService");return i(),l("div",null,[r,n("ol",null,[k,n("li",null,[d,n("blockquote",null,[v,n("p",null,[s("具体查看这个 "),n("a",m,[s("PR：Pull Request"),a(p)])])]),b]),f]),y,n("ol",null,[n("li",null,[n("p",null,[s("针对"),g,s(" 方法，正当整理写此篇解析文章期间，发现了 于"),h,s("有了这么一条 PR 更新，为什么这么做那：是为了大型应用、或多域使用多实例情况下， 可以针对已经构造的实例再次封装构造，提供深度构造控制器能力："),n("a",w,[x,a(p)])]),q]),n("li",null,[j,n("p",null,[s("上面的内容需要反复的梳理，笔者也是结合源码及就该次重构的 PR 的讨论进行了仔细分析： "),n("a",R,[A,a(p)]),s(" !!!")]),C,E,T])]),_,n("p",null,[n("a",P,[s("最全、最详细 Axios 源码解读---看这一篇就足够了"),a(p)])]),n("p",null,[n("a",S,[s("这次终于弄懂 Axios 是如何中断请求了"),a(p)])]),n("p",null,[n("a",D,[s("刚出锅的 Axios 网络请求源码阅读笔记，你会吗"),a(p)])]),n("p",null,[n("a",O,[s("Axios 源码解析（二）：通用工具方法"),a(p)])]),n("p",null,[n("a",I,[s("Axios 源码解读看这一篇就够了"),a(p)])]),a(o)])}const H=c(u,[["render",U],["__file","axios.html.vue"]]);export{H as default};
