import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const p="/assets/1-20240301170437606-e7a3a921.png",t="/assets/1-20240301170437640-c0abf97d.png",o={},l=e('<h1 id="_06-数据结构链表" tabindex="-1"><a class="header-anchor" href="#_06-数据结构链表" aria-hidden="true">#</a> 06-数据结构链表</h1><p>链表是一种递归的数据结构，它由多个节点组成，节点之间使用引用相互关联，组成一根链条。</p><p><img src="'+p+`" alt="img"></p><p>从上图中，我们可以总结出链表的几个特征</p><p>在内存中，链表是<strong>松散不连续</strong>的结构，通过引用确定节点之间的联系，不像数组那样，是排列在一起的连续内存地址</p><p><strong>链表没有序列</strong>，如果引用是单向的，只能通过上一个节点，找到下一个节点</p><p><strong>节点之间的引用可以是单向的「单向链表」，也可以是双向的「双向链表」，还可以首尾连接「循环链表」</strong></p><blockquote><p>从知识点的角度来说，链表与数组几乎是一对孪生兄弟，他们都能解决同样的问题。</p></blockquote><p>链表的节点通常是这样一个类似的对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ts 语法，用于描述 Node 对象的具体结构</span>
type Node <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 指向其他节点的引用</span>
  <span class="token literal-property property">next</span><span class="token operator">:</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">prev</span><span class="token operator">:</span> Node<span class="token punctuation">,</span>

  <span class="token comment">// 其他表示这个节点具体内容的属性</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> number
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>next 与 prev 属性，表示节点中指向下一个节点或者上一个节点的引用，该引用的属性名在不同的引用场景中可能命名不同。其他的属性，则表示该节点的具体内容。我们可以通过 next 与 prev 找到其他节点。</p><p>在学习过程中我们能够遇到非常多这样的案例，例如 HTML div 元素对象中有这样两条属性</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 伪代码</span>
div <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">nextSibling</span><span class="token operator">:</span> nextDiv
  <span class="token literal-property property">previousSibling</span><span class="token operator">:</span> prevDiv
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>又例如在原型链中，每一个实例对象，都有一个 <code>__proto__</code> 属性，用以指向该实例的原型对象。该原型对象，自身也会有一个 <code>__proto__</code> 属性，指向自己的原型对象。<img src="`+t+`" alt="image.png"></p><p>原型链是一个由 <code>__proto__</code> 进行关联的单向链表。</p><p>又例如在 React 源码实现中，会对多任务进行切片，每一个切片就是一个 Fiber 节点。而这个节点的数据结构大概如下，暂时可只关注前两个属性，我们会发现链表的体现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ts 语法，用于表示一个节点的数据结构</span>
type Fiber <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 单向链表引用：指向自己的第一个子节点</span>
  <span class="token literal-property property">child</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>

  <span class="token comment">// 单向链表引用：快速查找下一个 side effect</span>
  <span class="token literal-property property">nextEffect</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>

  <span class="token comment">// Fiber 节点的其他属性，可忽略</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> WorkTag<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">elementType</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">stateNode</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">sibling</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token keyword">return</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">index</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  <span class="token literal-property property">ref</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">handle</span><span class="token operator">:</span> mixed</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span> <span class="token literal-property property">_stringRef</span><span class="token operator">:</span> <span class="token operator">?</span>string <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">|</span> RefObject<span class="token punctuation">,</span>
  <span class="token literal-property property">pendingProps</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">memoizedProps</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">updateQueue</span><span class="token operator">:</span> UpdateQueue<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">memoizedState</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">firstContextDependency</span><span class="token operator">:</span> ContextDependency<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> TypeOfMode<span class="token punctuation">,</span>
  <span class="token literal-property property">effectTag</span><span class="token operator">:</span> SideEffectTag<span class="token punctuation">,</span>
  <span class="token literal-property property">firstEffect</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lastEffect</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">expirationTime</span><span class="token operator">:</span> ExpirationTime<span class="token punctuation">,</span>
  <span class="token literal-property property">childExpirationTime</span><span class="token operator">:</span> ExpirationTime<span class="token punctuation">,</span>
  <span class="token literal-property property">alternate</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  actualDuration<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  actualStartTime<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  selfBaseDuration<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  treeBaseDuration<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  _debugID<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  _debugSource<span class="token operator">?</span><span class="token operator">:</span> Source <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  _debugOwner<span class="token operator">?</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  _debugIsCurrentlyTiming<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为链表的松散性，如果我们要在实践中使用链表，只需要约定好每个节点的数据格式，在创建节点时，通过引用指向上一个节点或者下一个节点即可。因此我们往往会依据上一个节点来创建下一个节点，这样很容易建立联系，而不是凭空产生。</p><p>例如我们创建一个数组对象，是根据 Array 对象来创建</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// new 的实现中，完成了 __proto__ 的指向</span>
<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样 实例 arr 就依据 Array 对象，加入了原型链中。</p><p>所以，我们可以看出，<strong>链表常常用于解决不关注序列的的线性场景</strong>。</p><p>从知识点的角度分析，数组与链表可以算是一对孪生兄弟。都是作为线性数据结构，几乎能够解决同样的问题。我们完全可以定义一个 LinkedList，实现与 Array 一模一样的功能。但是他们在内存空间中的位置特性，决定了他们适应的场景不一样</p><p><strong>链表，在内存空间是松散的，不连续的</strong>。因此，如果我们要关注链表的序列的话，就很麻烦。我们需要找到头部节点，根据引用找到下一个节点，然后再依次找下去。也就是说，如果想要找到链表中的第 9 个节点，那么我们必须要依次找出前面 8 个节点，才能通过第八个节点的引用，知道第九个节点是谁。而数组就没那么麻烦，可以通过序列直接找到第九个元素。</p><p><strong>数组，在内存空间是紧密的，连续的</strong>。那么也就意味着，如果我要在长度为 100 的数组中的第二个位置，新增一个成员，后面的 99 个数组成员，在内存空间中都得往后挪动位置，这样才能空出新的空间让新成员加入。而链表在新成员加入的时候就没那么麻烦，因为空间的不连续性，新节点不需要任何成员让位置。</p><p>在性能的角度上考虑，访问某个成员，数组远远优于链表，而如果新增/删除元素，链表远远优于数组。因此基于这个特性，面对实际场景，我们要选择最适合的解决方案。</p><h2 id="_01-代码实现" tabindex="-1"><a class="header-anchor" href="#_01-代码实现" aria-hidden="true">#</a> 01-代码实现</h2><p>单向链表的代码实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 单向链表</span>
<span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 链表首部节点</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 约定此时的节点格式</span>
  <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token parameter">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">num</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
      <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createNode</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node
      <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">++</span>
      <span class="token keyword">return</span> node
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head

    <span class="token comment">// 此处的节点处理是关键，从头部开始遍历，只要还能找到下一个，说明就还不是最后一个，直到最后找不到了，就表示 current 指向了最后的节点</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    current<span class="token punctuation">.</span>next <span class="token operator">=</span> node
    <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">++</span>
    <span class="token keyword">return</span> node
  <span class="token punctuation">}</span>

  <span class="token comment">// 根据索引位置，插入新节点：默认此处传入的 i 值 &gt;= 0，小于 length</span>
  <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">i<span class="token punctuation">,</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createNode</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span>
    <span class="token keyword">let</span> curIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
      prevNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      node<span class="token punctuation">.</span>next <span class="token operator">=</span> current
      <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node
      <span class="token keyword">return</span> node
    <span class="token punctuation">}</span>
    <span class="token comment">// 找到 i 对应的节点</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>curIndex<span class="token operator">++</span> <span class="token operator">&lt;</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      prevNode <span class="token operator">=</span> current
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token comment">// 上一个节点指向新增节点，新增节点指向下一个节点</span>
    node<span class="token punctuation">.</span>next <span class="token operator">=</span> current
    prevNode<span class="token punctuation">.</span>next <span class="token operator">=</span> node
    <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">++</span>
    <span class="token keyword">return</span> node
  <span class="token punctuation">}</span>

  <span class="token comment">// 找到节点所在的位置</span>
  <span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token parameter">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
      curIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
      current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head

    <span class="token comment">// 直到找到最后一个节点</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      index<span class="token operator">++</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>num <span class="token operator">==</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curIndex <span class="token operator">=</span> index
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> curIndex
  <span class="token punctuation">}</span>

  <span class="token comment">// 根据索引位置，删除节点，默认 i 值是合理的</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> prevNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">,</span>
      curIndex <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> rmNode <span class="token operator">=</span> current
      <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> current<span class="token punctuation">.</span>next
      <span class="token keyword">return</span> rmNode
    <span class="token punctuation">}</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>curIndex<span class="token operator">++</span> <span class="token operator">&lt;</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      prevNode <span class="token operator">=</span> current
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token comment">// 被删除的节点</span>
    <span class="token keyword">const</span> rmNode <span class="token operator">=</span> current
    prevNode<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">.</span>next
    <span class="token keyword">return</span> rmNode
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码实现，引入了索引位置的概念来实现链表的部分功能。我们发现，一旦涉及到位置信息，都需要进行遍历处理，这也是链表在索引位置上的弊端所在。</p><p>我们还可以根据实际需求再新增新的方法。双向链表的实现也只需要额外多处理一个 prev 引用即可。</p><h2 id="_02-思考题" tabindex="-1"><a class="header-anchor" href="#_02-思考题" aria-hidden="true">#</a> 02-思考题</h2><p>需要排序的应用场景「例如我之前章节中实现的二叉堆」，适合用链表来实现吗？为什么？</p>`,33),r=[l];function c(i,u){return s(),a("div",null,r)}const k=n(o,[["render",c],["__file","index-06.html.vue"]]);export{k as default};
