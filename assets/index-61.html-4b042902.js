import{_ as p,M as t,p as o,q as c,R as s,t as n,N as l,a1 as a}from"./framework-e8cb8151.js";const i="/assets/1-20240301120004138-6b9c3933.png",r="/assets/1-20240301120004146-457b102a.png",u="/assets/1-20240301120004125-cf7d9d75.png",d="/assets/1-20240301120004146-457b102a.png",k="/assets/1-20240301120004138-6b9c3933.png",v={},m=a(`<h1 id="_61-react-拖拽实践" tabindex="-1"><a class="header-anchor" href="#_61-react-拖拽实践" aria-hidden="true">#</a> 61-React 拖拽实践</h1><h2 id="_1-方法" tabindex="-1"><a class="header-anchor" href="#_1-方法" aria-hidden="true">#</a> 1-方法</h2><p>通过上一篇文章的学习，我们知道，TypeScript 其实是一套约束规则。</p><p>理解了这一点，就可以大概确定我们的学习方向。</p><ul><li>是规则，那么知识点之间，就不会有太强的关联性。我们可以一条一条的逐步学习。也就意味着我们并不用急于把官方文档里所有的规则一次性学完。甚至可以把文档当成一个手册，在具体使用时再去查询。</li><li>是约束，也就意味着开发方式的改变与限制。ts 的开发会与通常情况下松散灵活的开发不太一样，这就必然会带来初期的不适应。约束带来的痛苦无法避免，我们要有这样一个心理预期。</li></ul><p>最后抛开规则的学习，最重要的应该是什么？<strong>毫无疑问，是实践</strong>。这也是无法从官方文档获取到的重要讯息。</p><p>许多人只看官方文档，一脸懵逼！规则的学习好像不难，可运用到实践到底是什么样子？不知道。</p><p>所以，第一件事情，我们要抛开规则，来看一看，把 ts 用在实践里到底是什么样。这里以 react 中实现拖拽为例。</p><blockquote><p>拖拽的原理与实现过程之前已经学习过，所以这里就把之前的代码直接拿过来调整一下</p></blockquote><h2 id="_2-环境" tabindex="-1"><a class="header-anchor" href="#_2-环境" aria-hidden="true">#</a> 2-环境</h2><p>一个简单的方式，是直接使用 <code>create-react-app</code> 创建一个已经支持 typescript 开发的项目。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npx create-react-app tsDemo --template typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，在不同的脚手架项目中支持 typescript 可能不太一样，因此这里就不做统一讲解，大家根据自己的需求在网上搜索方案即可。</p>`,13),b={href:"https://github.com/daraluv/practice",target:"_blank",rel:"noopener noreferrer"},y=a(`<blockquote><p>https://github.com/daraluv/practice</p></blockquote><h2 id="_3-d-ts" tabindex="-1"><a class="header-anchor" href="#_3-d-ts" aria-hidden="true">#</a> 3-.d.ts</h2><p>在 ts 的开发中，<code>.d.ts</code> 文件扮演着至关重要的作用。通常情况下，这样的文件，我们称之为声明文件。</p><p>那么声明文件是一个什么样的东西呢？</p><p>前一篇文章我们讲过，ts 的规则能够描述一个简单的变量，能够描述一个复杂的 JSON 数据，能够描述函数，也能够描述对象 class。可是大量的描述规则代码如果和实际功能代码糅合在一起，势必会导致整个代码冗余杂乱。因此在实践中，当声明内容很多时，通常会统一在一个文件中编写 ts 的描述规则，这个文件，就是以 <code>.d.ts</code>为后缀名的声明文件。</p><p>如果声明文件过多，那么就非常可能重名，为了避免相互干扰，typescript 又引入了作用域 <code>namespace</code> 概念。</p><p>因此，如果我们要利用 ts 实现拖拽组件，那么文件结构会如下展示：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token punctuation">;</span><span class="token operator">+</span>Drag <span class="token operator">-</span> index<span class="token punctuation">.</span>tsx <span class="token operator">-</span> style<span class="token punctuation">.</span>scss <span class="token operator">-</span> <span class="token keyword">interface</span><span class="token punctuation">.</span>d<span class="token punctuation">.</span>ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 <code>interface.d.ts</code> 中会声明在开发过程中遇到的所有复杂数据结构。大概内容如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">namespace</span> drag <span class="token punctuation">{</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用 <code>interface</code> 语法来约束一个 JSON 数据。</p><p><img src="`+i+'" alt="img"></p><p>在创建一个需要符合这个约束规则的数据时，只需要直接使用命名空间 <code>drag</code> 即可。ts 会自动帮助我们识别而无需引入，或者 ts 会自动帮助我们引入(必要时)。</p><p><img src="'+r+`" alt="img"></p><p>整个拖拽功能完整声明文件如下</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/** declare 为声明关键字，让外部组件能访问该命名空间*/</span>
<span class="token keyword">declare</span> <span class="token keyword">namespace</span> drag <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">JSONDemo</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">interface</span> <span class="token class-name">DragProps</span> <span class="token punctuation">{</span>
    width<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    height<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    left<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    top<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    zIndex<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    maxWidth<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    maxHeight<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
    className<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    onDragEnd<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> DragEndParam<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span>
    children<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">interface</span> <span class="token class-name">DragState</span> <span class="token punctuation">{</span>
    left<span class="token operator">:</span> <span class="token builtin">number</span>
    top<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">interface</span> <span class="token class-name">DragEndParam</span> <span class="token punctuation">{</span>
    <span class="token constant">X</span><span class="token operator">:</span> <span class="token builtin">number</span>
    <span class="token constant">Y</span><span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">type</span> <span class="token class-name">TouchEvent</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>TouchEvent <span class="token operator">&amp;</span> React<span class="token punctuation">.</span>MouseEvent

  <span class="token keyword">interface</span> <span class="token class-name">LiteralO</span> <span class="token punctuation">{</span>
    width<span class="token operator">:</span> <span class="token builtin">number</span>
    height<span class="token operator">:</span> <span class="token builtin">number</span>
    <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>本文的主要目的在于帮助大家了解实践中 ts 的运用，所以如果初学 ts，对一些语法不是很熟悉不用太过在意，具体的语法可以通过官方文档，或者后续文章中学习</p></blockquote><p>通常情况下，每个「复杂」组件都会对应创建一个 <code>.d.ts</code> 的声明文件。</p><blockquote><p>如果声明比较简单，我们可以不需要 .d.ts</p></blockquote><h2 id="_4-react-with-typescript" tabindex="-1"><a class="header-anchor" href="#_4-react-with-typescript" aria-hidden="true">#</a> 4-React with TypeScript</h2><p>我们可以使用 ES6 语法的 class 来创建 React 组件，所以如果熟悉 ES6 class 语法，则可以比较轻松的进一步学习 TypeScript 的 class 语法。在 React 中使用结合 TypeScript 是非常便利的。</p><p>首先，应该使用明确的访问控制符表明变量的有效范围</p><p>借鉴于其他编程语言的特性，一个类中的角色可能会包含</p><ul><li><code>private</code> 声明的私有变量/方法</li><li><code>public</code> 声明的共有变量/方法</li><li><code>static</code>声明的静态变量/方法</li></ul><p>也就是说，每声明一个变量或者方法，我们都应该明确指定它的角色。而不是直接使用<code>this.xxxx</code> 随意的给 class 新增变量。</p><p>然后，我们可以通过 TypeScript 的特性阅读 React 的声明(<code>.d.ts</code>)文件。以进一步了解 React 组件的使用。</p><p>React 的声明文件，详细的描述了 React 的每一个变量/方法的实现。通过阅读它的声明文件，我们可以进一步加深对 React 的理解。</p><p>最后，理解泛型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Component<span class="token operator">&lt;</span><span class="token constant">P</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> contextType<span class="token operator">?</span><span class="token operator">:</span> Context<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span>

  context<span class="token operator">:</span> <span class="token builtin">any</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token constant">P</span><span class="token operator">&gt;</span><span class="token punctuation">)</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@deprecated</span>
   * <span class="token keyword">@see</span> https://reactjs.org/docs/legacy-context.html
   */</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token operator">:</span> <span class="token constant">P</span><span class="token punctuation">,</span> context<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span>

  <span class="token generic-function"><span class="token function">setState</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">S</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
    state<span class="token operator">:</span>
      <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>prevState<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> props<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token constant">P</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Pick<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token constant">S</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
      <span class="token operator">|</span> <span class="token punctuation">(</span>Pick<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token constant">S</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    callback<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>

  <span class="token function">forceUpdate</span><span class="token punctuation">(</span>callBack<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ReactNode

  <span class="token keyword">readonly</span> props<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span> children<span class="token operator">?</span><span class="token operator">:</span> ReactNode <span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token operator">&amp;</span> Readonly<span class="token operator">&lt;</span><span class="token constant">P</span><span class="token operator">&gt;</span>
  state<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@deprecated</span>
   * https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
   */</span>
  refs<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> ReactInstance
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是在 React 的声明文件中，对于 <code>React.Component</code> 的描述。我们可以看到一些常用的 <code>state, setState, render</code> 等都有对应的描述。关键的地方是声明文件中有许多用到泛型的地方可能大家理解起来会比较困难。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Component<span class="token operator">&lt;</span><span class="token constant">P</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token operator">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里的<code>&lt;P, S&gt;</code>就是传入的泛型约束变量。</p><p>从构造函数 <code>constructor(props: P, context?: any);</code> 的约束中，我们可以得知，P 其实就是 react 组件中 props 的约束条件。</p><p>其中对于 state 的约束 <code>state: Readonly&lt;S&gt;;</code> 也可以看到，S 是对 State 的约束。</p><blockquote><p>暂时对泛型不理解也没关系，后续我们再进一步学习</p></blockquote><p>基于上面几点理解，我们就可以实现 Drag 组件了。如下。代码仅仅只是阅读可能难以理解，一定要动手试试看！</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// index.tsx</span>

<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> classnames <span class="token keyword">from</span> <span class="token string">&#39;classnames&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./style.css&#39;</span>

<span class="token keyword">const</span> isMoblie<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token string">&#39;ontouchstart&#39;</span> <span class="token keyword">in</span> window <span class="token comment">// 是否为移动端</span>

<span class="token keyword">class</span> <span class="token class-name">Drag</span> <span class="token keyword">extends</span> <span class="token class-name">React</span><span class="token punctuation">.</span>Component<span class="token operator">&lt;</span>drag<span class="token punctuation">.</span>DragProps<span class="token punctuation">,</span> drag<span class="token punctuation">.</span>DragState<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> elementWid<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> elementHeight<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> left<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> top<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> zIndex<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> clientWidth<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> clientHeight<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token keyword">private</span> clientX<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> clientY<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token keyword">private</span> startX<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> startY<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token keyword">private</span> disX<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> disY<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token keyword">private</span> <span class="token function-variable function">_dragStart</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span>
  <span class="token keyword">private</span> <span class="token function-variable function">_dragMove</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span>
  <span class="token keyword">private</span> <span class="token function-variable function">_dragEnd</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token operator">:</span> drag<span class="token punctuation">.</span>DragProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>elementWid <span class="token operator">=</span> props<span class="token punctuation">.</span>width <span class="token operator">||</span> <span class="token number">100</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>elementHeight <span class="token operator">=</span> props<span class="token punctuation">.</span>height <span class="token operator">||</span> <span class="token number">100</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> props<span class="token punctuation">.</span>left <span class="token operator">||</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>top <span class="token operator">=</span> props<span class="token punctuation">.</span>top <span class="token operator">||</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>zIndex <span class="token operator">=</span> props<span class="token punctuation">.</span>zIndex <span class="token operator">||</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>clientWidth <span class="token operator">=</span> props<span class="token punctuation">.</span>maxWidth <span class="token operator">||</span> <span class="token number">600</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>clientHeight <span class="token operator">=</span> props<span class="token punctuation">.</span>maxHeight <span class="token operator">||</span> <span class="token number">600</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_dragStart <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dragStart</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      left<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>left<span class="token punctuation">,</span>
      top<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>top<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">dragStart</span><span class="token punctuation">(</span>ev<span class="token operator">:</span> React<span class="token punctuation">.</span>TouchEvent <span class="token operator">&amp;</span> React<span class="token punctuation">.</span>MouseEvent<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> target <span class="token operator">=</span> ev<span class="token punctuation">.</span>target
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isMoblie <span class="token operator">&amp;&amp;</span> ev<span class="token punctuation">.</span>changedTouches<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>startX <span class="token operator">=</span> ev<span class="token punctuation">.</span>changedTouches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageX
      <span class="token keyword">this</span><span class="token punctuation">.</span>startY <span class="token operator">=</span> ev<span class="token punctuation">.</span>changedTouches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageY
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>startX <span class="token operator">=</span> ev<span class="token punctuation">.</span>clientX
      <span class="token keyword">this</span><span class="token punctuation">.</span>startY <span class="token operator">=</span> ev<span class="token punctuation">.</span>clientY
    <span class="token punctuation">}</span>
    <span class="token comment">// @ts-ignore 偏移位置 = 鼠标的初始值 - 元素的offset</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>disX <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>startX <span class="token operator">-</span> target<span class="token punctuation">.</span>offsetLeft

    <span class="token comment">// @ts-ignore</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>disY <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>startY <span class="token operator">-</span> target<span class="token punctuation">.</span>offsetTop

    <span class="token keyword">this</span><span class="token punctuation">.</span>zIndex <span class="token operator">+=</span> <span class="token number">1</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>_dragMove <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dragMove</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_dragEnd <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dragEnd</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMoblie<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mousemove&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_dragMove<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mouseup&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_dragEnd<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">dragMove</span><span class="token punctuation">(</span>ev<span class="token operator">:</span> drag<span class="token punctuation">.</span>TouchEvent<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isMoblie <span class="token operator">&amp;&amp;</span> ev<span class="token punctuation">.</span>changedTouches<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>clientX <span class="token operator">=</span> ev<span class="token punctuation">.</span>changedTouches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageX
      <span class="token keyword">this</span><span class="token punctuation">.</span>clientY <span class="token operator">=</span> ev<span class="token punctuation">.</span>changedTouches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageY
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>clientX <span class="token operator">=</span> ev<span class="token punctuation">.</span>clientX
      <span class="token keyword">this</span><span class="token punctuation">.</span>clientY <span class="token operator">=</span> ev<span class="token punctuation">.</span>clientY
    <span class="token punctuation">}</span>

    <span class="token comment">// 元素位置 = 现在鼠标位置 - 元素的偏移值</span>
    <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientX <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>disX
    <span class="token keyword">let</span> top <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientY <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>disY

    <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      top <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientWidth <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elementWid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientWidth <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elementWid
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientHeight <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elementHeight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      top <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientHeight <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elementHeight
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> left<span class="token punctuation">,</span> top <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">dragEnd</span><span class="token punctuation">(</span>ev<span class="token operator">:</span> drag<span class="token punctuation">.</span>TouchEvent<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> onDragEnd <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props
    document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mousemove&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_dragMove<span class="token punctuation">)</span>
    document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mouseup&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_dragEnd<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>onDragEnd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">onDragEnd</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token constant">X</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>startX <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientX<span class="token punctuation">,</span>
        <span class="token constant">Y</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>startY <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clientY<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> className<span class="token punctuation">,</span> width <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> height <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> zIndex <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props
    <span class="token keyword">const</span> <span class="token punctuation">{</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> top <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state

    <span class="token keyword">const</span> styles<span class="token operator">:</span> drag<span class="token punctuation">.</span>LiteralO <span class="token operator">=</span> <span class="token punctuation">{</span>
      width<span class="token punctuation">,</span>
      height<span class="token punctuation">,</span>
      left<span class="token punctuation">,</span>
      top<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>zIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      styles<span class="token punctuation">[</span><span class="token string">&#39;zIndex&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>zIndex
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * dragbox 为拖拽默认样式
     * className 表示可以从外部传入class修改样式
     */</span>
    <span class="token keyword">const</span> cls <span class="token operator">=</span> <span class="token function">classnames</span><span class="token punctuation">(</span><span class="token string">&#39;dragbox&#39;</span><span class="token punctuation">,</span> className<span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div
        className<span class="token operator">=</span><span class="token punctuation">{</span>cls<span class="token punctuation">}</span>
        onTouchStart<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dragStart<span class="token punctuation">}</span>
        onTouchMove<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dragMove<span class="token punctuation">}</span>
        onTouchEnd<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dragEnd<span class="token punctuation">}</span>
        onMouseDown<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dragStart<span class="token punctuation">}</span>
        onMouseUp<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dragEnd<span class="token punctuation">}</span>
        style<span class="token operator">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Drag

<span class="token comment">// /**</span>
<span class="token comment">//  * 索引类型</span>
<span class="token comment">//  * 表示key值不确定，但是可以约束key的类型，与value的类型</span>
<span class="token comment">//  */</span>
<span class="token comment">// interface LiteralO {</span>
<span class="token comment">//   [key: number]: string</span>
<span class="token comment">// }</span>

<span class="token comment">// const enx: LiteralO = {</span>
<span class="token comment">//   1: &#39;number&#39;,</span>
<span class="token comment">//   2: &#39;axios&#39;,</span>
<span class="token comment">//   3: &#39;http&#39;,</span>
<span class="token comment">//   4: &#39;zindex&#39;</span>
<span class="token comment">// }</span>

<span class="token comment">// /**</span>
<span class="token comment">//  * 映射类型用另外一种方式约束JSON的key值</span>
<span class="token comment">//  */</span>
<span class="token comment">// type keys = 1 | 2 | 3 | 4 | 5;</span>
<span class="token comment">// type Mapx = {</span>
<span class="token comment">//   [key in keys]: string</span>
<span class="token comment">// }</span>

<span class="token comment">// const enx2: Mapx = {</span>
<span class="token comment">//   1: &#39;number&#39;,</span>
<span class="token comment">//   2: &#39;axios&#39;,</span>
<span class="token comment">//   3: &#39;http&#39;,</span>
<span class="token comment">//   4: &#39;zindex&#39;,</span>
<span class="token comment">//   5: &#39;other&#39;</span>
<span class="token comment">// }</span>

<span class="token comment">// interface Person {</span>
<span class="token comment">//   name: string,</span>
<span class="token comment">//   age: number</span>
<span class="token comment">// }</span>
<span class="token comment">// type Mapo = {</span>
<span class="token comment">//   [P in keyof Person]: string</span>
<span class="token comment">// }</span>

<span class="token comment">// const enx3: Mapo = {</span>
<span class="token comment">//   name: &#39;alex&#39;,</span>
<span class="token comment">//   age: &#39;20&#39;</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，React 与 ts 的结合使用，并没有特别。我们只需要把 React 组件，看成一个 class，他和其他的 calss，并没有什么特别的不同了。</p><p>函数式组件同理。</p><h2 id="_5-jsx" tabindex="-1"><a class="header-anchor" href="#_5-jsx" aria-hidden="true">#</a> 5-JSX</h2><p>普通的 ts 文件，以 <code>.ts</code> 作为后缀名。</p><p>而包含 JSX 的文件，则以 <code>.tsx</code> 作为后缀名。这些文件通常也被认为是 React 组件。</p><p>若要支持 jsx，我们需要在 tsconfig.js 中，配置 jsx 的模式。一般都会默认支持。</p><p>ts 支持三种 jsx 模式，<code>preserve, react, react-native</code>。这些模式只在代码生成阶段起作用 - 类型检查并不受影响。</p><p>这句话怎么理解呢？也就意味着，typescript 在代码生成阶段，会根据我们配置的模式，对代码进行一次编译。例如，我们配置 <code>jsx: preserve</code>，根据下面的图，.tsx 文件会 被编译成 .jsx 文件。而这个阶段是在代码生成阶段，因此，生成的 .jsx 还可以被后续的代码转换操作。例如再使用 babel 进行编译。</p><p><img src="`+u+'" alt="img"></p><p><strong>类型检查</strong></p><blockquote><p>这部分内容可能会难理解一点，大家不必强求现在就掌握，以后再说也 OK</p></blockquote><p>我们在实际使用过程中，经常会遇到组件类型兼容性的错误，甚至也看不太明白报错信息在说什么。这大概率是对 JSX 的属性类型理解不到位导致。</p><p>理解 JSX 的类型检测之前，我们需要理清楚两个概念。</p><p>「<strong>固有元素</strong>」</p><p>通常情况下，固有元素是指 html 中的已经存在元素。例如 div。</p><p><img src="'+d+`" alt="img"></p><p>固有元素使用特殊的接口 JSX.IntrinsicElements 来查找。我们也可以利用这个接口，来定义自己的固有元素「但是没必要」。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 官网demo</span>
<span class="token keyword">declare</span> <span class="token keyword">namespace</span> <span class="token constant">JSX</span> <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">IntrinsicElements</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token builtin">any</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">;</span><span class="token operator">&lt;</span>foo <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 正确</span>
<span class="token punctuation">;</span><span class="token operator">&lt;</span>bar <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>固有元素都以小写开头。</p></blockquote><p>我们可以通过以下方式，给固有元素定义属性。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">namespace</span> <span class="token constant">JSX</span> <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">IntrinsicElements</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token punctuation">{</span> bar<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \`foo\`的元素属性类型为\`{bar?: boolean}\`</span>
<span class="token punctuation">;</span><span class="token operator">&lt;</span>foo bar <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>「<strong>基于值的元素</strong>」</p><p>也就是 React 中常常提到的自定义元素。规定必须以大写字母开头。基于值的元素会简单的在它所在的作用域里按标识符查找。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// demo来自官方</span>
<span class="token keyword">import</span> MyComponent <span class="token keyword">from</span> <span class="token string">&#39;./myComponent&#39;</span>
<span class="token punctuation">;</span><span class="token operator">&lt;</span>MyComponent <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 当前作用域找得到，正确</span>
<span class="token punctuation">;</span><span class="token operator">&lt;</span>SomeOtherComponent <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 找不到，错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>React 自定义组件有两种方式</p><ul><li>class 类组件</li><li>function 函数组件</li></ul><p>由于这两种基于值的元素在 JSX 表达式里无法区分，因此 TypeScript 首先会尝试将表达式做为函数组件进行解析。如果解析成功，那么 TypeScript 就完成了表达式到其声明的解析操作。如果按照函数组件解析失败，那么 TypeScript 会继续尝试以类组件的形式进行解析。如果依旧失败，那么将输出一个错误。</p><p>「<strong>函数组件</strong>」</p><p>正如其名，组件被定义成 JavaScript 函数，它的第一个参数是 props 对象。 TypeScript 会强制它的「函数执行的」返回值可以赋值给 JSX.Element。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// demo来自官方文档</span>
<span class="token keyword">interface</span> <span class="token class-name">FooProp</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    <span class="token constant">X</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token constant">Y</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">AnotherComponent</span><span class="token punctuation">(</span>prop<span class="token operator">:</span> <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">ComponentFoo</span><span class="token punctuation">(</span>prop<span class="token operator">:</span> FooProp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>AnotherComponent name<span class="token operator">=</span><span class="token punctuation">{</span>prop<span class="token punctuation">.</span>name<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Button</span> <span class="token operator">=</span> <span class="token punctuation">(</span>prop<span class="token operator">:</span> <span class="token punctuation">{</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">}</span><span class="token punctuation">,</span> context<span class="token operator">:</span> <span class="token punctuation">{</span> color<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>「<strong>类组件</strong>」</p><p>当一个组件由 class 创建而成「例如我们刚才实践的 Drag 组件」，那么当我们在使用该组件「即生成实例对象」时，则该实例类型必须赋值给 JSX.ElementClass 或抛出一个错误。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// demo来自官方文档</span>
<span class="token keyword">declare</span> <span class="token keyword">namespace</span> <span class="token constant">JSX</span> <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">ElementClass</span> <span class="token punctuation">{</span>
    render<span class="token operator">:</span> <span class="token builtin">any</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">MyFactoryFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">;</span><span class="token operator">&lt;</span>MyComponent <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 正确</span>
<span class="token punctuation">;</span><span class="token operator">&lt;</span>MyFactoryFunction <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数组件的 props 直接作为参数传入，而类组件的 props，则取决于 JSX.ElementAttributesProperty。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 案例来自官方文档</span>
<span class="token keyword">declare</span> <span class="token keyword">namespace</span> <span class="token constant">JSX</span> <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">ElementAttributesProperty</span> <span class="token punctuation">{</span>
    props <span class="token comment">// 指定用来使用的属性名</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">{</span>
  <span class="token comment">// 在元素实例类型上指定属性</span>
  props<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \`MyComponent\`的元素属性类型为\`{foo?: string}\`</span>
<span class="token punctuation">;</span><span class="token operator">&lt;</span>MyComponent foo<span class="token operator">=</span><span class="token string">&#39;bar&#39;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果未指定 JSX.ElementAttributesProperty，那么将使用类元素构造函数或 SFC 调用的第一个参数的类型。因此，如果我们在定义类组件时，应该将 props 对应的泛型类型传入，以确保 JSX 的正确解析。</p></blockquote><p>「<strong>子孙类型检查</strong>」</p><p>从 TypeScript 2.3 开始，ts 引入了 children 类型检查。children 是元素属性「attribute」类型的一个特殊属性「property」，子 JSXExpression 将会被插入到属性里。 与使用 JSX.ElementAttributesProperty 来决定 props 名类似，我们可以利用 JSX.ElementChildrenAttribute 来决定 children 名。 JSX.ElementChildrenAttribute 应该被声明在单一的属性里。</p><p>简单来说，我们可以在 <code>this.props</code> 的智能提示中，得到 children 的索引。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">namespace</span> <span class="token constant">JSX</span> <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">ElementChildrenAttribute</span> <span class="token punctuation">{</span>
    children<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// specify children name to use</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>「<strong>JSX 表达式结果类型</strong>」</p><p>默认地 JSX 表达式结果的类型为 any。 我们可以自定义这个类型，通过指定 JSX.Element 接口。 然而，不能够从接口里检索元素、属性或 JSX 的子元素的类型信息。 它是一个黑盒。</p><p><img src="`+k+'" alt="img"></p>',80);function g(h,w){const e=t("ExternalLinkIcon");return o(),c("div",null,[m,s("p",null,[n("除此之外，也可以 clone 我们的 "),s("a",b,[n("练习项目"),l(e)]),n("。")]),y])}const x=p(v,[["render",g],["__file","index-61.html.vue"]]);export{x as default};
