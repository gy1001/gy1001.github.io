import{_ as t,M as o,p as c,q as l,R as s,t as n,N as e,a1 as p}from"./framework-e8cb8151.js";const i="/assets/image-20230903230050165-f9185af4.png",r="/assets/image-20230903230101847-d1d64aff.png",u="/assets/image-20230903230125644-5a0f3fce.png",d="/assets/image-20230903230453296-6364726c.png",k={},v=p('<h1 id="_10-webpack-中样式相关的配置" tabindex="-1"><a class="header-anchor" href="#_10-webpack-中样式相关的配置" aria-hidden="true">#</a> 10-Webpack 中样式相关的配置</h1><p><img src="'+i+`" alt="image-20230903230050165"></p><blockquote><p>人的影响短暂而微弱，书的影响则广泛而深远。 ——普希金</p></blockquote><p>Webpack 中一切皆模块，CSS 也可以在 JavaScript 中被直接引用，但是 CSS 的语法 JavaScript 是不能解析的，所以下面代码会报错：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> css <span class="token keyword">from</span> <span class="token string">&#39;./css/index.css&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>css<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+`" alt="image-20230903230101847"></p><p>这时候就需要添加 Webpack 的<code>loader</code> 来处理 CSS 了。</p><h2 id="css-loader" tabindex="-1"><a class="header-anchor" href="#css-loader" aria-hidden="true">#</a> css-loader</h2><p>首先添加 css-loader：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev css-loader
<span class="token comment"># or</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> css-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后给<code>webpack.config.js</code>添加<code>rule</code>：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候修改<code>app.js</code> 添加下面代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> css <span class="token keyword">from</span> <span class="token string">&#39;./css/index.css&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>css<span class="token punctuation">,</span> css<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下：</p><p><img src="`+u+`" alt="image-20230903230125644"></p><p>这时候 CSS 会被转成字符串， JS 就可以直接使用。</p><p>除了上面直接在<code>webpack.config.js</code>中添加<code>rule</code>，还可以在 <code>JavaScript</code> 中直接使用下面的方式引入：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> css <span class="token keyword">from</span> <span class="token string">&#39;css-loader!./css/index.css&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>css<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中<code>import css from &#39;css-loader!./css/index.css&#39;</code>是 <code>webpack loader</code> 的内联写法。</p><h2 id="style-loader" tabindex="-1"><a class="header-anchor" href="#style-loader" aria-hidden="true">#</a> style-loader</h2><p>有了 <code>css-loader</code> 可以识别 CSS 语法了，下面就需要 style-loader 出场了。</p><p>简单来说，style-loader 是将 css-loader 打包好的 CSS 代码以<code>&lt;style&gt;</code>标签的形式插入到 HTML 文件中，所以<code>style-loader</code>是和<code>css-loader</code>成对出现的，并且<code>style-loader</code>是在<code>css-loader</code>之后。</p><p>首先安装<code>style-loader</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev style-loader
<span class="token comment"># or</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> css-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mini-css-extract-plugin" tabindex="-1"><a class="header-anchor" href="#mini-css-extract-plugin" aria-hidden="true">#</a> mini-css-extract-plugin</h2>`,26),m=s("code",null,"<style>",-1),b=s("code",null,"<link>",-1),g={href:"https://github.com/webpack-contrib/mini-css-extract-plugin",target:"_blank",rel:"noopener noreferrer"},y=p(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev mini-css-extract-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>mini-css-extract-plugin</code>这个使用的时候需要分别配置 loader 和 plugin，loader 需要放在<code>css-loader</code>之后代替<code>style-loader</code>：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;mini-css-extract-plugin&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 添加 plugin</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].css&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">chunkFilename</span><span class="token operator">:</span> <span class="token string">&#39;[id].css&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token comment">// 添加 loader</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-modules" tabindex="-1"><a class="header-anchor" href="#css-modules" aria-hidden="true">#</a> CSS Modules</h2><p>CSS Modules 指的是所有的 CSS 类名及其动画名都只是局部作用域的 CSS 文件。</p>`,5),h={href:"https://getadblock.com/",target:"_blank",rel:"noopener noreferrer"},S=s("p",null,"CSS Modules 主要解决的问题有：",-1),x=s("ol",null,[s("li",null,"解决 CSS 类都是全局的，容易造成全局污染（样式冲突）；"),s("li",null,"JS 和 CSS 共享类名；"),s("li",null,"可以方便的编写出更加健壮和扩展方便的 CSS。")],-1),f={href:"http://getbem.com/introduction/",target:"_blank",rel:"noopener noreferrer"},_={href:"http://oocss.org/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/MicheleBertoli/css-in-js",target:"_blank",rel:"noopener noreferrer"},j=p(`<p>下面来看下 CSS Modules 究竟是什么，我们来看下代码表现，首先创建一个<code>app.css</code>文件，内容如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* app.css */</span>
<span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道了，在 JS 中可以直接<code>import</code>一个 CSS 文件：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// app.js</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./app.css&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>那么 CSS Modules 中，JS 可以直接使用 CSS 的类名作为对象值，例如下面代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// app.js</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./app.css&#39;</span>

<span class="token keyword">let</span> element <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div class=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>styles<span class="token punctuation">.</span>element<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;&gt;
    &lt;p&gt;CSS Modules&lt;/p&gt;
  &lt;/div&gt;
</span><span class="token template-punctuation string">\`</span></span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 css-loader 增加<code>modules</code>的选项，说明打开 CSS Modules 支持。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 WebPack 打包，最终效果如下：</p><p><img src="`+d+'" alt="image-20230903230453296"></p>',10),w=s("code",null,"css-loader",-1),P={href:"https://github.com/webpack-contrib/css-loader",target:"_blank",rel:"noopener noreferrer"},L=s("h2",{id:"css-预处理器",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#css-预处理器","aria-hidden":"true"},"#"),n(" CSS 预处理器")],-1),q=s("p",null,"由于 CSS 标准自诞生以来，一直致力于在表现力层面的发展，相对基本语法和核心机制并没有实质性的变化，所以产生了好多 CSS 的预处理器。预处理器补足了 CSS 的一些语法上的缺陷，支持变量、运算、函数、作用域、继承、嵌套写法等，使用 CSS 预处理器可以大大的提升开发效率和体验，同时能够更好的做好模块化开发。",-1),M=s("blockquote",null,[s("p",null,"Tips：CSS 核心语法直到近些年才有大的发展，比如自定义属性（custom properties，又称为变量 variables） 、嵌套写法，但是已经远远的落后于 CSS 预处理器的发展。")],-1),E={href:"http://lesscss.org/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://sass-lang.com/",target:"_blank",rel:"noopener noreferrer"},W={href:"http://stylus-lang.com/",target:"_blank",rel:"noopener noreferrer"},$=s("h3",{id:"使用预处理器-loader",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#使用预处理器-loader","aria-hidden":"true"},"#"),n(" 使用预处理器 loader")],-1),J={href:"https://github.com/webpack-contrib/less-loader",target:"_blank",rel:"noopener noreferrer"},A=s("code",null,"less-loader",-1),T=p(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> less-loader
<span class="token comment"># or</span>
<span class="token function">npm</span> <span class="token function">install</span> less-loader --save-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改<code>webpack.config.js</code>：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//   ...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 将 Less 编译为 CSS</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>less-loader</code>只是将 Less 语法编译成 CSS，后续还需要使用<code>css-loader</code>和<code>style-loader</code>处理才可以，所以一般来说需要配合使用：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//   ...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 将 Less 编译为 CSS</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Tips：注意一些预处理语言需要安装对应的解析器，例如 sass-loader，需要同时安装 node-sass：<code>npm install sass-loader node-sass --save-dev</code></p></blockquote><h2 id="postcss-css-后处理器" tabindex="-1"><a class="header-anchor" href="#postcss-css-后处理器" aria-hidden="true">#</a> PostCSS：CSS 后处理器</h2>`,7),z={href:"https://github.com/postcss/autoprefixer",target:"_blank",rel:"noopener noreferrer"},B=p(`<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/*没有前缀的写法*/</span>
<span class="token selector">.flex</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*经过 postcss autoprefixer 处理后*/</span>
<span class="token selector">.flex</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-flex<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -ms-flexbox<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),D=s("p",null,"Tips：PostCSS 是一个使用 JavaScript 插件来转换 CSS 的工具，PostCSS 核心是将 CSS 解析成 AST，然后通过各种插件做各种转换，最终生成处理后的新 CSS，跟 Babel 在功能和实现上都类似，这里就不再详细讲解实现原理了。",-1),N={href:"http://cssnext.io",target:"_blank",rel:"noopener noreferrer"},V=s("h3",{id:"postcss-loader",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#postcss-loader","aria-hidden":"true"},"#"),n(" postcss-loader")],-1),R={href:"https://github.com/postcss/postcss-loader",target:"_blank",rel:"noopener noreferrer"},H=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//   ...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">resule</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">importLoader</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有 CSS 预处理语言，则配置写法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//   ...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">importLoader</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="postcss-配置" tabindex="-1"><a class="header-anchor" href="#postcss-配置" aria-hidden="true">#</a> PostCSS 配置</h3><p>通过 PostCSS 的强大插件系统，不仅可以处理 CSS 语法，还可以处理 CSS 预处理器的语法，实现的功能也有很多，包括添加前缀、最新语法转义、压缩等，甚至可以扩展 CSS 的语言特性。配置了 postcss-loader 之后，WebPack 就可以使用 PostCSS 来处理 CSS 了。但是 PostCSS 本身只不过是将 CSS 解析成 AST ，真正起作用的还需要依赖其强大的插件系统。</p><p>所以，PostCSS 配置其实主要是配置其使用哪些插件，PostCSS 的配置写法有以下三种方式：</p><ol><li>通过配置文件<code>postcss.config.js</code>，一般放置在项目的根目录下；</li><li>通过 loader 的配置项<code>options</code>；</li><li>直接在 package.json 中添加个<code>postcss</code>属性。</li></ol><h4 id="postcss-config-js" tabindex="-1"><a class="header-anchor" href="#postcss-config-js" aria-hidden="true">#</a> postcss.config.js</h4><p><code>postcss.config.js</code>完全是按 Node.js 模块写法来写，使用什么插件就引入什么插件依赖：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// postcss.config.js</span>
<span class="token keyword">const</span> autoprefixer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;autoprefixer&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">autoprefixer</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;IE 10&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="loader-配置项-options" tabindex="-1"><a class="header-anchor" href="#loader-配置项-options" aria-hidden="true">#</a> loader 配置项 options</h4><p>在<code>webpack.config.js</code>中，直接配置了<code>postcss-loader</code>之后，然后通过<code>loader</code>的<code>options</code>可以配置 postcss 的参数。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 引入postcss 插件</span>
<span class="token keyword">const</span> autoprefixer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;autoprefixer&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">// 通过 plugins 选项</span>
              <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">autoprefixer</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;IE 10&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="package-json-中添加个postcss属性" tabindex="-1"><a class="header-anchor" href="#package-json-中添加个postcss属性" aria-hidden="true">#</a> package.json 中添加个<code>postcss</code>属性</h4><p>最后一种方式是在<code>package.json</code>文件中添加<code>postcss</code>属性，<strong>这种方式受限于 json 的语法，可扩展性较弱，一般不推荐！</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;postcss&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;autoprefixer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IE 10&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面介绍几个项目中可能用到的 postcss 插件，带大家学习下 postcss 插件的基本用法。</p><h3 id="autoprefixer" tabindex="-1"><a class="header-anchor" href="#autoprefixer" aria-hidden="true">#</a> Autoprefixer</h3><p><code>Autoprefixer</code>这个插件前面内容已经简单提到过，就是给 css 补齐各种浏览器私有的前缀，例如<code>-webkit</code>、<code>-moz</code>、<code>-ms</code>等，当然还会处理各种兼容性问题，比如 flex 语法，不能简单添加<code>-webkit</code>就解决，还需要处理成<code>-webkit-box</code>这类老版本的标准。</p><p>Autoprefixer 还支持各种 IDE 插件，可以在 IDE 中直接转换对应的 css 文件（不推荐这样用，多人合作项目跟进 IDE 配置不同，转换的文件也会存在差异）。</p><p>Autoprefixer 的主要参数就是 browserslist，即需要代码支持的浏览器列表，这部分内容在 babel 章节已经介绍过了。其他相关的参数说明可以在文档中找到：https://github.com/postcss/autoprefixer#options。</p><h3 id="postcss-preset-env" tabindex="-1"><a class="header-anchor" href="#postcss-preset-env" aria-hidden="true">#</a> postcss-preset-env</h3>`,22),O={href:"https://preset-env.cssdb.org",target:"_blank",rel:"noopener noreferrer"},U=s("p",null,"postcss-preset-env 支持的 CSS 标准，完全可以媲美 CSS 预处理器的功能，所以如果对 cssnext 新的标准比较熟悉，可以直接用新标准来写样式，这样等到浏览器支持新标准之后可以无缝切换到 cssnext 语法，那么可以直接抛弃 CSS 预处理器，直接使用 cssnext 语法来写样式，通过 webPack 和 postcss-preset-env 来构建。",-1),F=s("h3",{id:"precss",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#precss","aria-hidden":"true"},"#"),n(" PreCSS")],-1),K={href:"https://github.com/jonathantneal/precss",target:"_blank",rel:"noopener noreferrer"},G={href:"https://github.com/jonathantneal/precss",target:"_blank",rel:"noopener noreferrer"},Q=s("h3",{id:"cssnano",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#cssnano","aria-hidden":"true"},"#"),n(" cssnano")],-1),X={href:"https://cssnano.co/",target:"_blank",rel:"noopener noreferrer"},Y=s("strong",null,"智能",-1),Z=p(`<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/*未经 cssnano 处理之前的 css*/</span>
<span class="token selector">.a</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> bolder<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.c</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> bolder<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.d</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过 cssnano 处理之后的 CSS 文件，会合并压缩一些类，缩短一些常见的值，例如颜色值等：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/*经 cssnano 处理之后的 css*/</span>
<span class="token selector">.a</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #ff0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.a,
.b</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b,
.c</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> bolder<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.c</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #ff0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.c,
.d</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.d</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cssnano 的配置会在 WebPack 优化章节继续详细介绍。</p><h2 id="解惑-理解-css-loader-的-importloaders-参数" tabindex="-1"><a class="header-anchor" href="#解惑-理解-css-loader-的-importloaders-参数" aria-hidden="true">#</a> 解惑：理解 css-loader 的 importLoaders 参数</h2><p>在 css-loader 的文档中，有个比较引起疑惑的参数项：<code>importLoaders</code>，这个参数用于配置 <strong>css-loader 作用于 <code>@import</code>的资源之前</strong>有多少个 loader。</p><p>给出的示例代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">importLoaders</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token comment">// 0 =&gt; 默认，没有 loader; 1 =&gt; postcss-loader; 2 =&gt; postcss-loader, sass-loader</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;sass-loader&#39;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过示例并不能看出来配置<code>importLoaders</code>是否对项目打包有什么差异，下面通过实例代码来看下加上<code>importLoaders</code>和没添加有什么区别。</p><p>首先我们创建两个文件：<code>style.css</code>和<code>body.css</code>，<code>style.css</code>中通过<code>@import &#39;body.css&#39;;</code>引入<code>body.css</code>：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* style.css */</span>
<span class="token atrule"><span class="token rule">@import</span> <span class="token string">&#39;body.css&#39;</span><span class="token punctuation">;</span></span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token comment">/*background: yellow;*/</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* body.css */</span>
<span class="token selector">.body-import</span> <span class="token punctuation">{</span>
  <span class="token comment">/* body import */</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这两个文件中，分别添加了两个特殊属性的 CSS 值：<code>display: flex;</code>，目的是使用<code>autoprefixer</code>对其进行处理，如果 postcss-loader 都起作用，则 <code>display: flex;</code>都会被处理添加对应的浏览器前缀，如果<code>importLoaders</code>设置不同，则根据文档输出的 CSS 会有差异，具体的差异就是我们需要理解的地方。</p>`,12),ss=s("code",null,"import-loader.js",-1),ns=s("code",null,"webpack.config.importLoader.js",-1),as=s("code",null,"importLoaders",-1),es=s("code",null,"importLoaders=1",-1),ps={href:"https://github.com/webpack-contrib/mini-css-extract-plugin",target:"_blank",rel:"noopener noreferrer"},ts=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// entry: import-loader.js</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./css/style.css&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>styles<span class="token punctuation">)</span>

<span class="token comment">// webpack.config.importLoader.js</span>
<span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;mini-css-extract-plugin&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./import-loader.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
          <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 添加 plugin</span>
      <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;no-import-loaders.css&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./import-loader.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
          <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
              <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">importLoaders</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 添加 plugin</span>
      <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;with-import-loaders.css&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三步创建 PostCSS 配置文件，添加<code>autoprefixer</code>，增加一个 IE10 浏览器的配置：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// postcss.config.js</span>
<span class="token keyword">const</span> autoprefixer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;autoprefixer&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">autoprefixer</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;IE 10&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>都准备完毕了，下面执行命令<code>webpack --config webpack.importLoader.js</code>，打包后的文件内容如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* no-import-loaders.css */</span>
<span class="token selector">.body-import</span> <span class="token punctuation">{</span>
  <span class="token comment">/* body import */</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token comment">/*background: yellow;*/</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -ms-flexbox<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* with-import-loaders.css */</span>
<span class="token selector">.body-import</span> <span class="token punctuation">{</span>
  <span class="token comment">/* body import */</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -ms-flexbox<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token comment">/*background: yellow;*/</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -ms-flexbox<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过观察打包出来的两个 CSS 文件发现，使用<code>@import &#39;body.css&#39;</code>引入了<code>body.css</code>文件之后，<code>body.css</code>的 CSS 因为配置了不同的<code>importLoaders</code>所以表现不一样：</p><ul><li>未使用<code>importLoaders</code>：被<code>styles.css</code>引入的 <code>body.css</code>内的<code>display: flex;</code><strong>未添加了前缀</strong>，说明 postcss <strong>没有作用</strong>到<code>@import</code>引入的文件中；</li><li>使用了<code>importLoaders=1</code>：被<code>styles.css</code>引入的 <code>body.css</code>内的<code>display: flex;</code><strong>也被添加了前缀</strong>，说明 postcss <strong>作用到了</strong>被<code>@import</code>引入的文件中。</li></ul>`,7),os=s("code",null,"importLoaders",-1),cs={href:"https://github.com/postcss/postcss-import",target:"_blank",rel:"noopener noreferrer"},ls=s("code",null,"@import",-1),is=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> autoprefixer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;autoprefixer&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> postcssImport <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;postcss-import&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">postcssImport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
    <span class="token function">autoprefixer</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;IE 10&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h5><p>本小节主要介绍了 Webpack 中 CSS 相关的配置，主要内容包含：CSS Webpack 配置、CSS 预处理器配置和 PostCSS 配置。</p><p>CSS 配置相对来说比较复杂，如果我们使用 CSS 的预处理器来编写代码，首先需要配置对应的预处理器 loader，将扩展的语法转成 CSS 代码，然后在配合 css-loader 和 style-loader。</p><p>在生产环境推荐使用 mini-css-extract-plugin 将 CSS 内容导出到 CSS 文件来供页面单独引入。</p><p>PostCSS 是一个强大的 CSS 后处理器，我们通过 PostCSS 的强大插件可以实现 CSS 前缀的自动添加（autoprefixer），还可以更加智能的实现 CSS 的压缩（cssnano）等功能。</p><blockquote><p>本小节 Webpack 相关面试题：</p><ol><li>怎么使用 PostCSS 来处理 CSS；</li><li>你会在 Webpack 中使用 CSS module 吗？</li><li>Webpack 的 style-loader 和 css-loader 有什么区别？</li></ol></blockquote>`,7);function rs(us,ds){const a=o("ExternalLinkIcon");return c(),l("div",null,[v,s("p",null,[n("CSS 作为"),m,n("标签放到 HTML 内还是不够的，我们还需要将 CSS 以"),b,n("的方式通过 URL 的方式引入进来，这时候就需要使用"),s("a",g,[n("mini-css-extract-plugin"),e(a)]),n("这个插件了，首先安装它：")]),y,s("p",null,[n("CSS Modules 既不是官方标准，也不是浏览器的特性，而是在构建过程中对 CSS 类名选择器限定作用域的一种方式，如我们的广告样式、某个 UI 通用弹层 SDK 这类样式，都需要避免自己的命名跟宿主环境的样式冲突或者避免被 "),s("a",h,[n("AdBlock"),e(a)]),n(" 这类广告拦截器拦截掉。")]),S,x,s("p",null,[n("这类 CSS 模块化的解决方案很早之前前端社区就有一些讨论和方案，比如最早的通过 CSS 命名约定的"),s("a",f,[n("BEM"),e(a)]),n("、"),s("a",_,[n("OOCSS"),e(a)]),n("等，再到 React 中使用的用 JavaScript 来写 CSS 规则的 "),s("a",C,[n("CSS in JS"),e(a)]),n(" 方案，再到通过编译工具来帮助 JavaScript 可以使用 CSS 的 CSS Modules 方案。")]),j,s("p",null,[n("跟 CSS Modules 相关的配置还有很多，具体可以在"),w,n("对应的"),s("a",P,[n("文档"),e(a)]),n("找到。")]),L,q,M,s("p",null,[n("常见的 CSS 预处理器有："),s("a",E,[n("Less"),e(a)]),n("，"),s("a",I,[n("Sass 及其语法变种 Scss"),e(a)]),n("和"),s("a",W,[n("Stylus"),e(a)]),n("。")]),$,s("p",null,[n("下面以 Less 预处理器为例，介绍 CSS 预处理器的用法。首先安装对应的 loader："),s("a",J,[A,e(a)]),n("：")]),T,s("p",null,[n("好吧，可能是 CSS 实在是太弱了，有了预处理器之后，又出现了后处理器 PostCSS（另外也有称 PostCSS 也为另外一种 CSS 预处理器的），不过 PostCSS 的出现的确解决了很多问题，让我们写 CSS 更加轻松，类似不同浏览器前缀的写法，只需要使用引入一个名字叫"),s("a",z,[n("Autoprefixer"),e(a)]),n("的 PostCSS 插件就可以使用标准的语法，在构建的过程中，PostCSS 会根据适配的浏览器使用 Autoprefixer 插件自动添加不同浏览器的适配。")]),B,s("blockquote",null,[D,s("p",null,[n("在语法转换上还有一个开源项目"),s("a",N,[n("cssnext"),e(a)]),n("，使用最新的 CSS 标准来写 CSS，通过 cssnext 可以转换成对应的 CSS 版本。")])]),V,s("p",null,[n("使用 PostCSS 需要安装 "),s("a",R,[n("postcss-loader"),e(a)]),n("，然后按照 loader 顺序，在 css-loader 之前（注意 loader 顺序：从右到左，从后到前）加上 postcss-loader：")]),H,s("p",null,[s("a",O,[n("postcss-preset-env"),e(a)]),n(" 是跟 babel 的 preset-env 类似的功能，通过它可以安心的使用最新的 CSS 语法来写样式，不用关心浏览器兼容性，浏览器兼容的问题交给了 postcss-preset-env 和 webpack，在打包构建的时候，会根据不同的配置输出对应支持的 CSS 文件。")]),U,F,s("p",null,[n("如果我们厌倦 cssnext 的变量定义方式，想使用 Sass 的语法，而又不想引入 Sass 这个 CSS 预处理器，"),s("a",K,[n("PreCSS"),e(a)]),n("就是你的选择。")]),s("p",null,[n("使用 PreCSS，可以写类 Sass 和 cssnext 语法的 CSS，详细可以参考它的"),s("a",G,[n("文档"),e(a)]),n("。")]),Q,s("p",null,[s("a",X,[n("cssnano"),e(a)]),n("是一个强大的 PostCss 插件，在 CSS 压缩优化中会经常被用到，它有别于常规的 CSS 压缩工具只是去除空格注释，还支持根据 CSS 语法解析结果"),Y,n("压缩代码，比如合并一些类写法：")]),Z,s("p",null,[n("第二步，创建 entry 文件"),ss,n("和 WebPack 配置文件"),ns,n("，在 WebPack 配置文件中，一个 css-loader 没有使用"),as,n("，一个使用了"),es,n("，内容如下（为了方便查看 CSS 的差异，这里使用了"),s("a",ps,[n("mini-css-extract-plugin"),e(a)]),n(" 直接打包出两个 CSS 文件）：")]),ts,s("blockquote",null,[s("p",null,[n("Tips：除了设置 css-loader 的"),os,n("，如果使用 PostCSS 则可以使用它的插件："),s("a",cs,[n("postcss-import"),e(a)]),n(" 同样可以处理"),ls,n("引入的 CSS 代码：")])]),is])}const vs=t(k,[["render",rs],["__file","index-10.html.vue"]]);export{vs as default};
