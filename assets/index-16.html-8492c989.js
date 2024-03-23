import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const i="/assets/1-20240301092651994-e082a157.png",p="/assets/1-20240301092652000-029b6752.png",c={},l=e('<h1 id="_16-栈操作原理与函数调用" tabindex="-1"><a class="header-anchor" href="#_16-栈操作原理与函数调用" aria-hidden="true">#</a> 16-栈操作原理与函数调用</h1><p>如果大家对寄存器的存在还是不够理解的话，可以简单粗暴的将寄存器理解为变量。每一个变量都用于存储特定的值，以协助 CPU 进行运算。</p><p>一个栈空间中的情况大概如下<img src="'+i+`" alt="img"></p><p>现有如下函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> b <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> r <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们观察 main 函数，发现内部调用了函数 foo。我们称 main 为<strong>调用者「caller」</strong>，foo 为<strong>被调用者「callee」</strong>。他们翻译成汇编语言<strong>简化</strong>之后的代码如下</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>// main 函数
push   ebp        // 先让 ebp 入栈，保留现场，用于函数出栈时还原现场
mov    ebp, esp   // 调整当前 ebp 的值为当前的栈顶元素 esp
sub    esp, 40h   // 调整栈顶元素，预留一部分空间给临时变量
push   ebx        // 后面就是函数的内部操作，参数入栈，变量入栈
push   esi
push   edi
lea    edi, [ebp - 40h]   // 也是一个赋值操作，与mov类似，但有一些区别，这里是真实的值
mov    ecx, 10h
mov    eax, 0ccccch
push   4          // 这里准备要调用 foo 方法，先让 foo 的参数入栈
push   2
call   foo
add    esp, 8     
push   eax
call   console.log
add    esp, 8
pop    edi        //  相关寄存器依次出栈
pop    esi
pop    ebx
mov    esp, ebp   // 调整栈顶元素为 刚开始函数入栈时的位置，准备还原现场
pop    ebp        // ebp 出栈，回到上一个函数的执行中去
ret               // 执行结束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键的逻辑注意看注释。</p><p>test 的调用也是类似。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// test 函数</span>
push   ebp
mov    ebp<span class="token punctuation">,</span> esp
sub    esp<span class="token punctuation">,</span> 40h
push   ebx
push   esi
push   edi
lea    edi<span class="token punctuation">,</span> <span class="token punctuation">[</span>ebp <span class="token operator">-</span> 40h<span class="token punctuation">]</span>
mov    ecx<span class="token punctuation">,</span> 10h
mov    eax<span class="token punctuation">,</span> 0ccccch
mov    eax<span class="token punctuation">,</span> <span class="token punctuation">[</span>ebp <span class="token operator">+</span> <span class="token number">8</span><span class="token punctuation">]</span>
add    eax<span class="token punctuation">,</span> <span class="token number">3</span>
mov    ecx<span class="token punctuation">,</span> <span class="token punctuation">[</span>ebp <span class="token operator">+</span> <span class="token number">8</span><span class="token punctuation">]</span>
add    ecx<span class="token punctuation">,</span> <span class="token number">5</span>
mov    eax<span class="token punctuation">,</span> ecx     <span class="token comment">// 将最后结果保存在 eax 并返回</span>
pop    edi
pop    esi
pop    ebx
mov    esp<span class="token punctuation">,</span> ebp
pop    ebp
ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与之对应的栈中情况如下：</p><p><img src="`+p+`" alt="img"></p><h2 id="_00-思考题" tabindex="-1"><a class="header-anchor" href="#_00-思考题" aria-hidden="true">#</a> 00-思考题</h2><p>结合之前的作用域链与这里的栈内存原理，思考一个问题，如下例子中，函数 main 中访问的变量 a，与函数 foo 中也能访问的变量 a ，在内存中是否是同一个地方？</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">20</span>  
  
  <span class="token comment">// 函数 main 中能访问 a</span>
  
  <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
    函数 foo 中，也能访问 a
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),t=[l];function o(u,d){return s(),a("div",null,t)}const v=n(c,[["render",o],["__file","index-16.html.vue"]]);export{v as default};
