import{_ as t,M as p,p as e,q as o,R as n,t as s,N as c,a1 as i}from"./framework-e8cb8151.js";const l={},u=n("h1",{id:"mini-pinia",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mini-pinia","aria-hidden":"true"},"#"),s(" mini-pinia")],-1),k={href:"https://juejin.cn/post/7112091016450031653#comment",target:"_blank",rel:"noopener noreferrer"},r=i(`<p>index.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> createPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./createPinia&#39;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./defineStore&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>rootStore.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> SymbolPinia <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;my-pinia&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>createPinia.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> markRaw<span class="token punctuation">,</span> App<span class="token punctuation">,</span> effectScope<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SymbolPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./rootStore&#39;</span>
<span class="token doc-comment comment">/**
 * 
 * 
为什么需要用到markRaw

有些值不应被设置为响应式的，例如复杂的第三方库

  比如一个响应式对象中，要放入axios，或者别的随机数字的第三方库
  如果不让他变成非响应式的，那么Vue就会去找到每一个层级，让其都能响应式处理
  这样的情况下，性能就会受到严重影响
  所以我们需要让其变成永远都不会成功响应式的数据，提高性能

当渲染具有不可变数据源的大列表时，跳过响应式可以提高性能

作者：李先来2分钟
链接：https://juejin.cn/post/7130812097469890597
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建一个scope独立空间</span>
  <span class="token keyword">const</span> scope <span class="token operator">=</span> <span class="token function">effectScope</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token comment">// run方法的返回值就是回调函数fn的返回值</span>
  <span class="token keyword">const</span> state <span class="token operator">=</span> scope<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> pinia<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token function">markRaw</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">install</span><span class="token punctuation">(</span>app<span class="token operator">:</span> App<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将app保留一份在pinia上</span>
      pinia<span class="token punctuation">.</span>_a <span class="token operator">=</span> app
      <span class="token comment">// 将pinia实例暴露到app上，所有组件都可以inject注入使用</span>
      app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span>SymbolPinia<span class="token punctuation">,</span> pinia<span class="token punctuation">)</span>
      <span class="token comment">// 保证vue2里也可以通过$pinia使用</span>
      app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$pinia <span class="token operator">=</span> pinia
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    _a<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    state<span class="token punctuation">,</span> <span class="token comment">// 所有的状态</span>
    _e<span class="token operator">:</span> scope<span class="token punctuation">,</span> <span class="token comment">// 用来管理这个应用上的 effectScope</span>
    _s<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 记录所有的 store</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> pinia
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>defineStore.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
  getCurrentInstance<span class="token punctuation">,</span>
  inject<span class="token punctuation">,</span>
  effectScope<span class="token punctuation">,</span>
  reactive<span class="token punctuation">,</span>
  computed<span class="token punctuation">,</span>
  toRefs<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SymbolPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./rootStore&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineStore</span><span class="token punctuation">(</span>idOrOptions<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> setup<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> id<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token keyword">let</span> options<span class="token operator">:</span> <span class="token builtin">any</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> idOrOptions <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    id <span class="token operator">=</span> idOrOptions
    options <span class="token operator">=</span> setup
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    options <span class="token operator">=</span> idOrOptions
    id <span class="token operator">=</span> idOrOptions<span class="token punctuation">.</span>id
  <span class="token punctuation">}</span>
  <span class="token comment">// 第二个参数是函数</span>
  <span class="token keyword">const</span> isSetupStore <span class="token operator">=</span> <span class="token keyword">typeof</span> setup <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>

  <span class="token keyword">function</span> <span class="token function">createOptionsStore</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> options<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> pinia<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// createOptionsStore拿到用户传的state、getters、actions</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> state<span class="token punctuation">,</span> actions<span class="token punctuation">,</span> getters <span class="token punctuation">}</span> <span class="token operator">=</span> options
    <span class="token keyword">let</span> scope
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">function</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      pinia<span class="token punctuation">.</span>state<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> state <span class="token operator">?</span> <span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token comment">// 注意注意：这里需要增加 toRefs ，否则 getter 不是响应式的，</span>
      <span class="token keyword">const</span> localState <span class="token operator">=</span> <span class="token function">toRefs</span><span class="token punctuation">(</span>pinia<span class="token punctuation">.</span>state<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> gettersValue <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>getters <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span>computedGetters<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          computedGetters<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 计算属性具有缓存的性质</span>
            <span class="token comment">// 我们需要获取当前的 store 是谁</span>
            <span class="token keyword">return</span> getters<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> store<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token keyword">return</span> computedGetters
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span>
      <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>localState<span class="token punctuation">,</span> actions<span class="token punctuation">,</span> gettersValue<span class="token punctuation">)</span> <span class="token comment">// 这个地方的装填还要扩展</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// _e 能停止所有的 scope</span>
    <span class="token comment">// 每一个 store 还能停止自己的</span>
    <span class="token comment">// 我们要让外面的effectScope能够停止所有的store，也要让每个store能停止自己</span>
    <span class="token keyword">const</span> setupStore <span class="token operator">=</span> pinia<span class="token punctuation">.</span>_e<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      scope <span class="token operator">=</span> <span class="token function">effectScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> scope<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">wrapAction</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> action<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 触发 action 的时候，可以触发一些额外的逻辑</span>
        <span class="token comment">// actions里面有this问题，所以我们要处理actions的方法里的this</span>
        <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">action</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
        <span class="token comment">// 返回值也可以做处理</span>
        <span class="token keyword">return</span> result
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> setupStore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> prop <span class="token operator">=</span> setupStore<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token comment">// 拿到对应的值</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> prop <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        setupStore<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">wrapAction</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token comment">// 对 action 可以进行扩展 Aop 思想</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// setupStore</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> setupStore<span class="token punctuation">)</span>

    pinia<span class="token punctuation">.</span>_s<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> store<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> currentInstance <span class="token operator">=</span> <span class="token function">getCurrentInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 注册了一个 store</span>
    <span class="token comment">// 为了保证useStore在组件内部使用，那么我们需要通过判断currentInstance来保证useStore在组件内部使用ore</span>
    <span class="token keyword">const</span> pinia<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> currentInstance <span class="token operator">&amp;&amp;</span> <span class="token function">inject</span><span class="token punctuation">(</span>SymbolPinia<span class="token punctuation">)</span>
    <span class="token comment">// 看一下pinia上有没有这个store，如果没有，说明是第一次使用这个store，</span>
    <span class="token comment">// 那么我们就去创建一个调用createOptionsStore去创建一个store</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pinia<span class="token punctuation">.</span>_s<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isSetupStore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">createSetUpStore</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> setup<span class="token punctuation">,</span> pinia<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">createOptionsStore</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> options<span class="token punctuation">,</span> pinia<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> pinia<span class="token punctuation">.</span>_s<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token keyword">return</span> store
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">createSetUpStore</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> setup<span class="token punctuation">,</span> pinia<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 每一个 store 都是一个响应式对象</span>
    <span class="token keyword">let</span> scope
    <span class="token keyword">const</span> setupStore <span class="token operator">=</span> pinia<span class="token punctuation">.</span>_e<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      scope <span class="token operator">=</span> <span class="token function">effectScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> scope<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">wrapAction</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> action<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 触发 action 的时候，可以触发一些额外的逻辑</span>
        <span class="token comment">// actions里面有this问题，所以我们要处理actions的方法里的this</span>
        <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">action</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
        <span class="token comment">// 返回值也可以做处理</span>
        <span class="token keyword">return</span> result
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> setupStore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> prop <span class="token operator">=</span> setupStore<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token comment">// 拿到对应的值</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> prop <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        setupStore<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">wrapAction</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token comment">// 对 action 可以进行扩展 Aop 思想</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// setupStore</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> setupStore<span class="token punctuation">)</span>

    pinia<span class="token punctuation">.</span>_s<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> store<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 返回useStore函数，内部注册一个Store</span>
  <span class="token keyword">return</span> useStore
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function d(v,m){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,n("p",null,[n("a",k,[s("pinia 的基本使用和核心实现原理"),c(a)])]),r])}const y=t(l,[["render",d],["__file","mini-pinia.html.vue"]]);export{y as default};
