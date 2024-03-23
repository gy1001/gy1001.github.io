import{_ as t,M as i,p,q as c,R as s,t as n,N as e,a1 as o}from"./framework-e8cb8151.js";const l={},u=o('<h1 id="_26-webpack-工作流程" tabindex="-1"><a class="header-anchor" href="#_26-webpack-工作流程" aria-hidden="true">#</a> 26 Webpack 工作流程</h1><p>更新时间：2019-06-28 09:40:17</p><p><img src="https://img3.mukewang.com/5cd964700001973406390359.jpg" alt="img"></p><p>机会不会上门来找人，只有人去找机会。</p><p>——狄更斯</p><p>Webpack 主要工作是从一个入口开始，将小块独立的代码编制成更大而复杂的可以运行在浏览器中的代码，独立的代码就是一些 JavaScript 及其它可以被 JavaScript 引用的文件。今天章节来理解下 Webpack 的工作流程和基本原理。为了方便理解，我先将 Webpack 整个工作流程打个比方：</p><blockquote><p>Webpack 可以看做是一个工厂车间，<code>plugin</code>和<code>loader</code>是车间中的两类机器，工厂有一个车间主任和一个生产车间。车间主任叫<code>Compiler</code>，负责指挥生产车间机器<code>Compilation</code>进行生产劳动，<code>Compilation</code>会首先将进来的原材料（<code>entry</code>）使用一种叫做<code>loader</code>的机器进行加工，生产出来的产品就是<code>Chunk</code>；<code>Chunk</code>生产出来之后，会被组装成<code>Bundle</code>，然后通过一类<code>plugin</code>的机器继续加工，得到最后的<code>Bundle</code>，然后运输到对应的仓库（output）。这个工厂的生产线就是 Tapable，厂子运作的整个流程都是生产线控制的，车间中有好几条生产线，每个生产线有很多的操作步骤（<code>hook</code>），一步操作完毕，会进入到下一步操作，直到生产线全流程完成，再将产出传给下一个产品线处理。整个车间生产线也组成了一条最大的生产线。</p></blockquote><p>上面的例子揭示了整个 Webpack 工作流程，其中我们可以看到我们配置的<code>webpack.config.js</code>当中的<code>entry</code>和<code>output</code>，也可以看到我们配置的<code>loader</code>。</p>',8),d={href:"https://github.com/ronami/minipack",target:"_blank",rel:"noopener noreferrer"},r={href:"https://github.com/chinanf-boy/minipack-explain",target:"_blank",rel:"noopener noreferrer"},m=o(`<h2 id="基本流程" tabindex="-1"><a class="header-anchor" href="#基本流程" aria-hidden="true">#</a> 基本流程</h2><p>Webpack 的基本流程可以分为三个阶段：</p><ul><li>准备阶段：主要任务是创建 <code>Compiler</code> 和 <code>Compilation</code> 对象；</li><li>编译阶段：这个阶段任务是完成 modules 解析，并且生成 chunks；</li><li>module 解析：包含了三个主要步骤，创建实例、loaders 应用和依赖收集；</li><li>chunks 生成，主要步骤是找到每个 <code>chunk</code> 所需要包含的 <code>modules</code>。</li><li>产出阶段：这个阶段的主要任务是根据 <code>chunks</code> 生成最终文件，主要有三个步骤：模板 Hash 更新，模板渲染 chunk，生成文件。</li></ul><p>细化到具体的代码层次，大概可以分为：</p><ol><li>初始化参数：包括从配置文件和 shell 中读取和合并参数，然后得出最终参数；<strong>shell 中的参数要优于配置文件的</strong>；</li><li>使用上一步得到的参数实例化一个 Compiler 类，注册所有的插件，给对应的 Webpack 构建生命周期绑定 Hook；</li><li>开始编译：执行 Compiler 类的 run 方法开始执行编译；</li><li><code>compiler.run</code> 方法调用 <code>compiler.compile</code>，在<code>compile</code> 内实例化一个<code>Compilation</code>类，<code>Compilation</code>是做构建打包的事情，主要事情包括： 1）查找入口：根据 entry 配置，找出全部的入口文件； 2）编译模块：根据文件类型和 loader 配置，使用对应 loader 对文件进行转换处理； 3）解析文件的 AST 语法树； 4）找出文件依赖关系； 5）递归编译依赖的模块。</li><li>递归完后得到每个文件的最终结果，根据 entry 配置生成代码块 chunk；</li><li>输出所有 chunk 到对应的<code>output</code>路径。</li></ol><blockquote><p>Tips: shell 中的参数要优于配置文件。举例说明：配置文件指定了 mode 是<code>development</code>，而 shell 中传入了<code>--mode production</code>，则最终 mode 值为<code>production</code>。</p></blockquote><p>在 Webpack 工作流程里，<code>Tapable</code>始终贯穿其中，Tapable 各种 Hook（钩子）组成了 Webpack 的生命周期。Tapable Hook 和生命周期的关系为：</p><ul><li>Hook：钩子，对应 Tapable 的 Hook；</li><li>生命周期：Webpack 的执行流程，钩子实际就是生命周期，一般类似 entryOption 的 Hook，在生命周期中<code>entry-option</code>。</li></ul><p>参与 Webpack 流程的两个重要模块是：<code>Compiler</code>和<code>Compilation</code>。关于<code>Compiler</code>和<code>Compilation</code>这里先简单做下介绍，本文主要讲解 Webpack 的工作流程，它俩在后续章节会继续详细解释。</p><h4 id="compiler" tabindex="-1"><a class="header-anchor" href="#compiler" aria-hidden="true">#</a> Compiler</h4><p><code>Compiler</code> 继承自 <code>Tapable</code>，是 Webpack 的整个生命周期管理，代表了完整的 Webpack 环境配置。每个 Webpack 的配置，对应一个<code>Compiler</code>对象，记录了 Webpack 的 <code>options</code>、<code>loader</code> 和 <code>plugin</code>等信息，并且通过<code>Tapable</code>的 Hook 机制管理整个打包流程的生命周期。</p><h4 id="compilation" tabindex="-1"><a class="header-anchor" href="#compilation" aria-hidden="true">#</a> Compilation</h4><p><code>Compilation</code> 也继承自 <code>Tapable</code>，代表了一次资源版本构建，包含了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。每次构建过程都会产生一次<code>Compilation</code>，比如我们启动 watch 功能的时候，每当检测到一个文件变化，就会重新创建一个新的 <code>Compilation</code>，从而生成一组新的编译资源。</p><blockquote><p>Tips：Webpack 的插件是在<code>apply</code>方法接收<code>Compiler</code>对象来给某个流程添加钩子回调，钩子回调函数接收的是记录当前状态的<code>Compilation</code>对象，后面 plugin 小节内容继续做介绍。</p></blockquote><h4 id="compiler-和-compilation-关系" tabindex="-1"><a class="header-anchor" href="#compiler-和-compilation-关系" aria-hidden="true">#</a> Compiler 和 Compilation 关系</h4><ul><li>Compiler：代表的是不变的 Webpack 环境，是针对 Webpack 的。例如 watch 模式下，传入的 Webpack 配置是不变的，不管执行几次 Compilation 都不变；</li><li>Compilation：针对的是随时可变的项目文件，只要文件有改动，Compilation 就会被重新创建。</li></ul><h2 id="webpack-流程源码解析" tabindex="-1"><a class="header-anchor" href="#webpack-流程源码解析" aria-hidden="true">#</a> Webpack 流程源码解析</h2><h3 id="准备阶段" tabindex="-1"><a class="header-anchor" href="#准备阶段" aria-hidden="true">#</a> 准备阶段</h3><p>当我们开始运行 Webpack 的时候，就会创建 <code>Compiler</code> 实例并且加载内置插件。这里跟构建流程相关性比较大的内置插件是<code>EntryOptionPlugin</code>，它会解析传给 Webpack 的配置中的 <code>entry</code>。这里<strong>不同类型的 entry</strong>包括：<code>SingleEntryPlugin</code>、<code>MultiEntryPlugin</code>、<code>DynamicEntryPlugin</code>三类，分别对应着单文件入口、多文件入口和动态文件入口（忘记的翻下 Webpack 基础概念里面 entry 部分的内容），对应代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 4.29.6</span>
<span class="token comment">// lib/EntryOptionPlugin.js</span>
<span class="token keyword">const</span> <span class="token function-variable function">itemToPlugin</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> item<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MultiEntryPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> item<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SingleEntryPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> item<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token class-name">EntryOptionPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>entryOption<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&#39;EntryOptionPlugin&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> entry</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 看这里，判断webpack.config中entry的类型判断，然后选择对应的Entry</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> entry <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">||</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">itemToPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> entry<span class="token punctuation">,</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> entry <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> name <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">itemToPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> entry<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> entry <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">DynamicEntryPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了 <code>EntryOptionPlugin</code>，其他的内置插件也会监听特定的任务点来完成特定的逻辑，但我们这里不再仔细讨论。当 <code>Compiler</code> 实例加载完内置插件之后，下一步就会直接调用 <code>compiler.run</code> 方法来启动构建，这时候 Compiler 的<code>run</code> 钩子被触发，在<code>run</code>钩子回调中可以得到解析后的<code>compiler.options</code>。</p><blockquote><p>Tips：<code>run</code>钩子只有在 Webpack 以正常模式运行的情况下会触发，如果我们以监听 （watch）模式运行 Webpack，那么<code>run</code>是不会触发的，但是会触发<code>watchRun</code>钩子。</p></blockquote><p>完成了 Webpack 配置的处理，接下来开始构建流程，构建流程主要是在<code>Compiler</code>的<code>Compiler.compile</code>内：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack v4.29.6</span>
<span class="token comment">// lib/Compiler.js#L610-L636</span>
<span class="token function">compile</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Compilation类的参数</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newCompilationParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 1. 执行beforeCompile 钩子回调</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>beforeCompile<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 执行 Compiler.compile 钩子回调</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3. 实例化 Compilation</span>
        <span class="token keyword">const</span> compilation <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newCompilation</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4. 执行 Compiler.make 钩子回调</span>
        <span class="token comment">// make内实际主要是执行的compilation的addEntry方法(**注意这里**)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>make<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>compilation<span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>

            compilation<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// seal方法整理构建之后的chunk产出</span>
            <span class="token comment">// 这里会做一些优化相关的事情，比如压缩代码等</span>
            compilation<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 执行 Compiler.afterCompile 钩子回调</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>afterCompile<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>compilation<span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> compilation<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>newCompilationParams</code>主要是生成对应 compilation 用到的参数：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 4.29.6</span>
<span class="token comment">// lib/Compiler.js#L601</span>
<span class="token function">newCompilationParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">// normal module</span>
        <span class="token literal-property property">normalModuleFactory</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createNormalModuleFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// context module</span>
        <span class="token literal-property property">contextModuleFactory</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createContextModuleFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 依赖关系表</span>
        <span class="token literal-property property">compilationDependencies</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> params<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>紧接着 <code>Compiler</code> 实例开始创建 <code>Compilation</code> 对象，这个对象是后续构建流程中<strong>最核心最重要的对象</strong>，它包含了一次构建过程中所有的数据，一次构建过程对应一个 <code>Compilation</code> 实例。当 <code>Compilation</code> 实例创建完成之后，Webpack 的准备阶段已经完成，下一步将开始编译阶段。</p><h3 id="编译阶段" tabindex="-1"><a class="header-anchor" href="#编译阶段" aria-hidden="true">#</a> 编译阶段</h3><p>从 Compiler 的<code>make</code>钩子触发开始，此时内置插件<code>SingleEntryPlugin</code>、<code>MultiEntryPlugin</code>、<code>DynamicEntryPlugin</code>（根据不同类型 entry）的监听器会开始执行。监听器都会调用 Compilation 实例的 <code>compilation.addEntry()</code> 方法，该方法将会触发第一批 module 的解析，这些 module 就是 entry 中配置的模块。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 4.29.6</span>
<span class="token comment">// lib/Compilation.js#L1019</span>
<span class="token function">addEntry</span><span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> entry<span class="token punctuation">,</span> name<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 执行内部_addModuleChain方法</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_addModuleChain</span><span class="token punctuation">(</span>
        context<span class="token punctuation">,</span>
        entry<span class="token punctuation">,</span>
        <span class="token parameter">module</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先讲一个 module 解析完成之后的操作，它会递归调用它所依赖的 modules 进行解析，所以当解析停止时，我们就能够得到项目中所有依赖的 modules，它们将存储在 Compilation 实例的 modules 属性中，并触发<code>compilation</code>的<code>finishModules</code>钩子。</p><p><code>module</code>对象有 <code>NormalModule</code>、 <code>MultiModule</code>、<code>ContextModule</code>、<code>DLLModule</code>等多种类型（分别在对应的<code>lib/*Module.js</code>中实现）。下面以<code>NormalModule</code>为例讲解下 module 的解析流程，其他类型的解析都是类似。</p><p>NormalModule 的实例化需要借用对应的<code>NormalModuleFactory.create()</code>，<code>NormalModuleFactory</code>则来自于上一阶段创建<code>Compilation</code>对象传入的参数。创建<code>NormalModule</code>之前会调用<code>resolver</code>来获取一个 module 的属性，比如解析这个 module 需要用到的 <code>loaders</code>，资源路径<code>resource</code> 等等。</p>`,33),k=s("code",null,"Resolver",-1),v={href:"https://github.com/webpack/enhanced-resolve",target:"_blank",rel:"noopener noreferrer"},b=s("code",null,"require.resolve()",-1),h=s("code",null,"resolve",-1),g=s("code",null,"resolveLoader",-1),y=o(`<ul><li>Normal：通过绝对路径或相对路径，解析一个模块；</li><li>Context：通过给定的上下文（context）解析一个模块；</li><li>Loader：解析一个 webpack loader。</li></ul><p>在创建完 NormalModule 实例之后会调用 <code>NormalModule.build()</code> 方法继续进行内部的构建，<code>NormalModule.build()</code>会调用<code>NormalModule.doBuild()</code>，在<code>doBuild()</code>中执行 loader，生成 AST 语法树。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 4.29.6</span>
<span class="token comment">// lib/NormalModule.js#L274</span>
<span class="token function">doBuild</span><span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span> compilation<span class="token punctuation">,</span> resolver<span class="token punctuation">,</span> fs<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 生成loader上下文</span>
    <span class="token keyword">const</span> loaderContext <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createLoaderContext</span><span class="token punctuation">(</span>
        resolver<span class="token punctuation">,</span>
        options<span class="token punctuation">,</span>
        compilation<span class="token punctuation">,</span>
        fs
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 开始执行loader</span>
    <span class="token function">runLoaders</span><span class="token punctuation">(</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">resource</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resource<span class="token punctuation">,</span>
            <span class="token literal-property property">loaders</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>loaders<span class="token punctuation">,</span>
            <span class="token literal-property property">context</span><span class="token operator">:</span> loaderContext<span class="token punctuation">,</span>
            <span class="token literal-property property">readResource</span><span class="token operator">:</span> fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>fs<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// ...</span>
                <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">const</span> resourceBuffer <span class="token operator">=</span> result<span class="token punctuation">.</span>resourceBuffer<span class="token punctuation">;</span>
            <span class="token keyword">const</span> source <span class="token operator">=</span> result<span class="token punctuation">.</span>result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> sourceMap <span class="token operator">=</span> result<span class="token punctuation">.</span>result<span class="token punctuation">.</span>length <span class="token operator">&gt;=</span> <span class="token number">1</span> <span class="token operator">?</span> result<span class="token punctuation">.</span>result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> extraInfo <span class="token operator">=</span> result<span class="token punctuation">.</span>result<span class="token punctuation">.</span>length <span class="token operator">&gt;=</span> <span class="token number">2</span> <span class="token operator">?</span> result<span class="token punctuation">.</span>result<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

            <span class="token comment">// ...</span>
            <span class="token comment">// 这里是处理后的源码</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_source <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createSource</span><span class="token punctuation">(</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>binary <span class="token operator">?</span> <span class="token function">asBuffer</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">asString</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">,</span>
                resourceBuffer<span class="token punctuation">,</span>
                sourceMap
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 这里是ast</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_ast <span class="token operator">=</span>
                <span class="token keyword">typeof</span> extraInfo <span class="token operator">===</span> <span class="token string">&quot;object&quot;</span> <span class="token operator">&amp;&amp;</span>
                extraInfo <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
                extraInfo<span class="token punctuation">.</span>webpackAST <span class="token operator">!==</span> <span class="token keyword">undefined</span>
                    <span class="token operator">?</span> extraInfo<span class="token punctuation">.</span>webpackAST
                    <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当一个模块编译完成之后，有会根据其<code>AST</code>查找依赖，递归整个构建流程，直到整个所有依赖都被处理完毕。得到所有的 modules 之后，Webpack 会开始生成对应的 chunk。这些 chunk 对象是 Webpack 生成最终文件的一个重要依据。每个 chunk 的生成就是找到需要包含的 modules。这里大致描述一下 chunk 的生成算法：</p><ol><li>Webpack 先将 <code>entry</code> 中对应的 module 都生成一个新的 chunk；</li><li>遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中；</li><li>如果一个依赖 module 是动态引入（<code>import()</code>、<code>require.ensure()</code>）的模块，那么就会根据这个 module 创建一个新的 chunk，继续遍历依赖；</li><li>重复上面的过程，直至得到所有的 chunks。</li></ol><p>得到所有 chunks 之后，Webpack 会对 chunks 和 modules 进行一些优化相关的操作，比如分配 id、排序等，即进入到<code>compilation.seal()</code>内，这时候会触发<code>webpack.optimize</code>配置中用到的一些插件。</p><p>至此，编译阶段处理完成，进入产出阶段。</p><h3 id="产出阶段" tabindex="-1"><a class="header-anchor" href="#产出阶段" aria-hidden="true">#</a> 产出阶段</h3><p>在产出阶段，webpack 会根据 chunks 生成最终文件。主要有三个步骤：模板 hash 更新，模板渲染 chunk，生成 bunlde 文件。</p><p>Compilation 在实例化的时候，就会同时实例化三个对象： <code>MainTemplate</code>，<code>ChunkTemplate</code>，<code>ModuleTemplate</code>，这三个对象是用来渲染 chunk 对象，得到最终代码的模板。</p><ul><li><code>MainTemplate</code>：对应了在 entry 配置的入口 chunk 的渲染模板；</li><li><code>ChunkTemplate</code>：动态引入的非入口 chunk 的渲染模板；</li><li><code>ModuleTemplate</code>：chunk 中的 module 的渲染模板。</li></ul><p>在开始渲染之前， Compilation 实例会调用 <code>compilation.createHash</code> 方法来生成这次构建的 Hash，在 Webpack 的配置中，我们可以在 <code>output.filename</code> 中配置 <code>[hash]</code> 占位符，最终就会替换成这个 Hash。同样， <code>compilation.createHash</code> 也会为每一个 chunk 也创建一个 Hash，对应 <code>[chunkhash]</code> 占位符。</p><p>当 Hash 都创建完成之后，下一步就会遍历 <code>compilation</code>对象的<code>chunks</code>属性，来渲染每一个 chunk。如果一个 chunk 是入口（entry） chunk，那么就会调用 <code>MainTemplate</code> 实例的 <code>render</code> 方法，否则调用 <code>ChunkTemplate</code> 的 render 方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 4.29.6</span>
<span class="token comment">// lib/Compilation.js#L2314</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> chunks<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> chunk <span class="token operator">=</span> chunks<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
  <span class="token keyword">const</span> chunkHash <span class="token operator">=</span> <span class="token function">createHash</span><span class="token punctuation">(</span>hashFunction<span class="token punctuation">)</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>outputOptions<span class="token punctuation">.</span>hashSalt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      chunkHash<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>outputOptions<span class="token punctuation">.</span>hashSalt<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    chunk<span class="token punctuation">.</span><span class="token function">updateHash</span><span class="token punctuation">(</span>chunkHash<span class="token punctuation">)</span>
    <span class="token comment">// 根据类型选择模板</span>
    <span class="token keyword">const</span> template <span class="token operator">=</span> chunk<span class="token punctuation">.</span><span class="token function">hasRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mainTemplate <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>chunkTemplate
    template<span class="token punctuation">.</span><span class="token function">updateHashForChunk</span><span class="token punctuation">(</span>
      chunkHash<span class="token punctuation">,</span>
      chunk<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>moduleTemplates<span class="token punctuation">.</span>javascript<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>dependencyTemplates<span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span><span class="token function">chunkHash</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>chunk<span class="token punctuation">,</span> chunkHash<span class="token punctuation">)</span>
    chunk<span class="token punctuation">.</span>hash <span class="token operator">=</span> chunkHash<span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span>hashDigest<span class="token punctuation">)</span>
    hash<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>chunk<span class="token punctuation">.</span>hash<span class="token punctuation">)</span>
    chunk<span class="token punctuation">.</span>renderedHash <span class="token operator">=</span> chunk<span class="token punctuation">.</span>hash<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> hashDigestLength<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span><span class="token function">contentHash</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>errors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ChunkRenderError</span><span class="token punctuation">(</span>chunk<span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当每个 chunk 的源码生成之后，就会添加在 Compilation 实例对象的 <code>assets</code> 属性中。<code>assets</code> 中的对象 <code>key</code> 是最终要生成的文件名称， <code>value</code> 是一个对象，对象需要包含两个方法， <code>source</code> 和 <code>size</code> 分别返回文件内容和文件大小。当所有的 chunk 都渲染完成之后， assets 就是最终更要生成的文件列表。</p><p>完成上面的操作之后， Compilation 实例的 <code>seal</code> 方法结束，进入到 Compiler 实例的 <code>emitAssets</code> 方法。 Compilation 实例的所有工作到此也全部结束，意味着一次构建过程已经结束，接下来 Webpack 会直接遍历 compilation.assets 生成所有文件，然后触发任务点 done，结束构建流程。</p><h2 id="验证全流程" tabindex="-1"><a class="header-anchor" href="#验证全流程" aria-hidden="true">#</a> 验证全流程</h2><p>通过 Tapable 文章的内容得知，我们可以给 Tapable 的实例使用 tap 的方式添加回调函数，再结合 Webpack 的 API 章节内容得知<code>webpack(config)</code>返回的实际是<code>compiler</code>，所以我们可以遍历<code>comipler.hooks</code>，使用<code>hook.tap</code>的方法添加回调函数，将 hookName 打印出来，通过这样的方式，可以把 webpack compiler 部分的流程全部输出出来。代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 下面是只有一个entry的情况</span>
  <span class="token comment">// 没有output则默认输出是到dist的main</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/app.js&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token function">webpack</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
<span class="token comment">// 遍历hooks，添加回调，输出\`hookName\`</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">hookName</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">[</span>hookName<span class="token punctuation">]</span><span class="token punctuation">.</span>tap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">[</span>hookName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&#39;anyString&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">run -&gt; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>hookName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 触发webpack的编译流程</span>
compiler<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得到<code>compiler.run()</code>之后的工作流程：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>run -&gt; beforeRun
run -&gt; run
run -&gt; normalModuleFactory
run -&gt; contextModuleFactory
run -&gt; beforeCompile
run -&gt; compile
run -&gt; thisCompilation
run -&gt; compilation
run -&gt; make
run -&gt; afterCompile
run -&gt; shouldEmit
run -&gt; emit
run -&gt; afterEmit
run -&gt; done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的方式是得到了<code>compiler.run()</code>之后的流程，这个流程缺少了环境变量和参数处理的流程，因为这些事情已经在<code>run()</code>操作之前的<code>webpack()</code>调用期间实例化<code>Compiler</code>就做完了。再进一步，我们直接修改<code>node_modules/webpack/lib/Compiler.js</code>的代码，在<code>Compiler.constructor</code>最后添加代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">hookName</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">[</span>hookName<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hook<span class="token punctuation">.</span>tap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    hook<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&#39;anyString&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">compiler -&gt; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>hookName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样得到更加完整的执行过程：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>compiler -&gt; environment
compiler -&gt; afterEnvironment
compiler -&gt; entryOption
compiler -&gt; afterPlugins
compiler -&gt; afterResolvers
compiler -&gt; beforeRun
compiler -&gt; run
compiler -&gt; normalModuleFactory
compiler -&gt; contextModuleFactory
compiler -&gt; beforeCompile
compiler -&gt; compile
compiler -&gt; thisCompilation
compiler -&gt; compilation
compiler -&gt; make
compiler -&gt; afterCompile
compiler -&gt; shouldEmit
compiler -&gt; emit
compiler -&gt; afterEmit
compiler -&gt; done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>综上，在<code>compiler.run()</code>之前有一下流程：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>environment
afterEnvironment
entryOption
afterPlugins
afterResolvers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全流程图" tabindex="-1"><a class="header-anchor" href="#全流程图" aria-hidden="true">#</a> 全流程图</h2><p>通过上面的解释、源码分析和嵌入式代码验证，我们已经了解了 Webpack 打包的全流程，下面是结合上面的内容，整理的一张 Webpack 工作流程图，供大家进一步学习和巩固本文的内容。</p><p><img src="http://img.mukewang.com/5d0771640001eb5708160557.jpg" alt="图片描述"></p><blockquote><p>Tips: 我们还可以用同样的方法修改<code>node_modules/webpack/lib/Compilation.js</code> ，也添加上 hooks 的遍历，这样可以通过输出的 hookName 把全流程就串起来了！最终得到全流程如下：</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>compiler -&gt; environment
compiler -&gt; afterEnvironment
compiler -&gt; entryOption
compiler -&gt; afterPlugins
compiler -&gt; afterResolvers
compiler -&gt; beforeRun
compiler -&gt; run
compiler -&gt; normalModuleFactory
compiler -&gt; contextModuleFactory
compiler -&gt; beforeCompile
compiler -&gt; compile
compiler -&gt; thisCompilation
compiler -&gt; compilation
compiler -&gt; make
    compilation -&gt; addEntry
    compilation -&gt; buildModule
    compilation -&gt; normalModuleLoader
    compilation -&gt; succeedModule
    compilation -&gt; buildModule
    compilation -&gt; normalModuleLoader
    compilation -&gt; succeedModule
    compilation -&gt; succeedEntry
    compilation -&gt; finishModules
    compilation -&gt; seal
    compilation -&gt; optimizeDependenciesBasic
    compilation -&gt; optimizeDependencies
    compilation -&gt; optimizeDependenciesAdvanced
    compilation -&gt; afterOptimizeDependencies
    compilation -&gt; beforeChunks
    compilation -&gt; dependencyReference
    compilation -&gt; afterChunks
    compilation -&gt; optimize
    compilation -&gt; optimizeModulesBasic
    compilation -&gt; optimizeModules
    compilation -&gt; optimizeModulesAdvanced
    compilation -&gt; afterOptimizeModules
    compilation -&gt; optimizeChunksBasic
    compilation -&gt; optimizeChunks
    compilation -&gt; optimizeChunksAdvanced
    compilation -&gt; afterOptimizeChunks
    compilation -&gt; optimizeTree
    compilation -&gt; afterOptimizeTree
    compilation -&gt; optimizeChunkModulesBasic
    compilation -&gt; optimizeChunkModules
    compilation -&gt; optimizeChunkModulesAdvanced
    compilation -&gt; afterOptimizeChunkModules
    compilation -&gt; shouldRecord
    compilation -&gt; reviveModules
    compilation -&gt; optimizeModuleOrder
    compilation -&gt; advancedOptimizeModuleOrder
    compilation -&gt; beforeModuleIds
    compilation -&gt; moduleIds
    compilation -&gt; optimizeModuleIds
    compilation -&gt; afterOptimizeModuleIds
    compilation -&gt; reviveChunks
    compilation -&gt; optimizeChunkOrder
    compilation -&gt; beforeChunkIds
    compilation -&gt; optimizeChunkIds
    compilation -&gt; afterOptimizeChunkIds
    compilation -&gt; recordModules
    compilation -&gt; recordChunks
    compilation -&gt; beforeHash
    compilation -&gt; chunkHash
    compilation -&gt; contentHash
    compilation -&gt; afterHash
    compilation -&gt; recordHash
    compilation -&gt; beforeModuleAssets
    compilation -&gt; shouldGenerateChunkAssets
    compilation -&gt; beforeChunkAssets
    compilation -&gt; chunkAsset
    compilation -&gt; additionalChunkAssets
    compilation -&gt; record
    compilation -&gt; additionalAssets
    compilation -&gt; optimizeChunkAssets
    compilation -&gt; afterOptimizeChunkAssets
    compilation -&gt; optimizeAssets
    compilation -&gt; afterOptimizeAssets
    compilation -&gt; needAdditionalSeal
    compilation -&gt; afterSeal
compiler -&gt; afterCompile
compiler -&gt; shouldEmit
compiler -&gt; emit
compiler -&gt; afterEmit
    compilation -&gt; needAdditionalPass
compiler -&gt; done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更好理解 compiler 和 Compilation 的区别，再将<code>webpack.config.js</code>修改下，增加<code>watch</code>配置，这样只要 entry 文件修改过，就会重新启动一次编译。我们来看下 watch 编译的流程和第一次编译流程有什么区别：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 下面是只有一个entry的情况</span>
  <span class="token comment">// 没有output则默认输出是到dist的main</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/app.js&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 增加watch功能</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候执行<code>webpack --config webpack.config.js</code>，第一次编译触发，然后修改下<code>app.js</code>，通过 watch 监控，发生了第二次编译，得到下面的输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>compiler -&gt; invalid
compiler -&gt; watchRun
compiler -&gt; normalModuleFactory
compiler -&gt; contextModuleFactory
compiler -&gt; beforeCompile
compiler -&gt; compile
compiler -&gt; thisCompilation
compiler -&gt; compilation
compiler -&gt; make
    compilation -&gt; addEntry
    compilation -&gt; buildModule
    compilation -&gt; normalModuleLoader
    compilation -&gt; succeedModule
    compilation -&gt; succeedEntry
    compilation -&gt; finishModules
    compilation -&gt; seal
    compilation -&gt; optimizeDependenciesBasic
    compilation -&gt; optimizeDependencies
    compilation -&gt; optimizeDependenciesAdvanced
    compilation -&gt; afterOptimizeDependencies
    compilation -&gt; beforeChunks
    compilation -&gt; dependencyReference
    compilation -&gt; afterChunks
    compilation -&gt; optimize
    compilation -&gt; optimizeModulesBasic
    compilation -&gt; optimizeModules
    compilation -&gt; optimizeModulesAdvanced
    compilation -&gt; afterOptimizeModules
    compilation -&gt; optimizeChunksBasic
    compilation -&gt; optimizeChunks
    compilation -&gt; optimizeChunksAdvanced
    compilation -&gt; afterOptimizeChunks
    compilation -&gt; optimizeTree
    compilation -&gt; afterOptimizeTree
    compilation -&gt; optimizeChunkModulesBasic
    compilation -&gt; optimizeChunkModules
    compilation -&gt; optimizeChunkModulesAdvanced
    compilation -&gt; afterOptimizeChunkModules
    compilation -&gt; shouldRecord
    compilation -&gt; reviveModules
    compilation -&gt; optimizeModuleOrder
    compilation -&gt; advancedOptimizeModuleOrder
    compilation -&gt; beforeModuleIds
    compilation -&gt; moduleIds
    compilation -&gt; optimizeModuleIds
    compilation -&gt; afterOptimizeModuleIds
    compilation -&gt; reviveChunks
    compilation -&gt; optimizeChunkOrder
    compilation -&gt; beforeChunkIds
    compilation -&gt; optimizeChunkIds
    compilation -&gt; afterOptimizeChunkIds
    compilation -&gt; recordModules
    compilation -&gt; recordChunks
    compilation -&gt; beforeHash
    compilation -&gt; chunkHash
    compilation -&gt; contentHash
    compilation -&gt; afterHash
    compilation -&gt; recordHash
    compilation -&gt; beforeModuleAssets
    compilation -&gt; shouldGenerateChunkAssets
    compilation -&gt; beforeChunkAssets
    compilation -&gt; chunkAsset
    compilation -&gt; additionalChunkAssets
    compilation -&gt; record
    compilation -&gt; additionalAssets
    compilation -&gt; optimizeChunkAssets
    compilation -&gt; afterOptimizeChunkAssets
    compilation -&gt; optimizeAssets
    compilation -&gt; afterOptimizeAssets
    compilation -&gt; needAdditionalSeal
    compilation -&gt; afterSeal
compiler -&gt; afterCompile
compiler -&gt; shouldEmit
compiler -&gt; emit
compiler -&gt; afterEmit
    compilation -&gt; needAdditionalPass
compiler -&gt; done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面输出的内容可以发现，compiler 只是从<code>invalid -&gt; watchRun</code> 开始，没有重新走流程，而<code>compilation</code>却是走了一个完整的流程，所以我们更好地理解了：<strong>compiler 是管理整个生命周期的，而 compilation 是每次编译触发都会重新生成一次的</strong>。</p><blockquote><p>Tips: 当处于监听模式时，compiler 会触发诸如 watchRun, watchClose 和 invalid 等额外的事件，这个跟普通模式下的流程稍有不同，主要区别在下面的内容：</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 普通模式
compiler -&gt; afterResolvers
compiler -&gt; beforeRun （不同）
compiler -&gt; run （不同）
compiler -&gt; normalModuleFactory

# watch模式
compiler -&gt; afterResolvers
compiler -&gt; watchRun （不同）
compiler -&gt; normalModuleFactory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本小节主要是结合之前的 Webpack 内核知识，来讲解一次打包的过程 Webpack 做的事情有哪些。Webpack 打包流程从配置文件的读取开始，分别经过了准备阶段、modules 产出阶段、chunks 产出阶段和 bundle 产出物产出阶段。在各自阶段，分别有不同的「角色」参与，整个 Webpack 的打包流程是通过 Compiler 来控制的，而每次打包的过程是通过 Compilation 来控制的。在普通打包模式下，webpack 的 Compiler 和 Compilation 是一一对应的关系； watch 模式下，Webpack 的 Compiler 会因为文件变化而产生多次打包流程，所以 Compiler 和 Compilation 是一对多关系，通过 Hook Compiler 的流程，可以得到每次打包过程的回调。</p><p>本小节知识量较大，所以继续总结下 webpack 工作流程中涉及到的类（对象）的作用，我们也可以从这些对象的角度来梳理和记忆 Webpack 的工作流程：</p><ul><li>Tapbale：Webpack 事件流程核心类；</li><li>Compiler：Webpack 工作流程中最高层的对象，初始化配置，提供 Webpack 流程的全局钩子，比如<code>done</code>、<code>compilation</code>这类；</li><li>Compilation：由 Compiler 来创建的实例对象，是每次打包流程最核心的流程，该对象内进行模块依赖解析、优化资源、渲染 runtime 代码等事情，下面在 Compilation 中还有用到的一些对象： <ul><li>Resolver：解析模块（module）、loader 等路径，帮助查找对应的位置；</li><li>ModuleFactory：负责构造模块的实例，将 Resolver 解析成功的组件中把源码从文件中读取出来，然后创建模块对象；</li><li>Template：主要是来生成 runtime 代码，将解析后的代码按照依赖顺序处理之后，套上 Template 就是我们最终打包出来的代码。</li></ul></li></ul><blockquote><p>本小节 Webpack 相关面试题：</p><ol><li>能否说下 Webpack 的完整打包流程，从读取配置到输出文件这个过程尽量说全？</li><li>介绍几个你了解过的 Webpack 中的类，有什么用？</li></ol></blockquote>`,44);function f(C,w){const a=i("ExternalLinkIcon");return p(),c("div",null,[u,s("blockquote",null,[s("p",null,[n("Tips：为了更好的理解 Webpack 的工作原理，推荐阅读下"),s("a",d,[n("minipack"),e(a)]),n("这个项目，中文版本的"),s("a",r,[n("在这里"),e(a)]),n("。")])]),m,s("p",null,[k,n(" 是指来自于"),s("a",v,[n("enhanced-resolve"),e(a)]),n("模块，它主要功能是一个提供异步"),b,n("，即从哪里去查找文件的路径，可以通过 Webpack 的"),h,n("和"),g,n("来配置。Compiler 类有三种类型的内置 Resolver：")]),y])}const x=t(l,[["render",f],["__file","index-26.html.vue"]]);export{x as default};
