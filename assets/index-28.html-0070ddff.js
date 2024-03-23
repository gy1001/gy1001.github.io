import{_ as s,M as a,p as t,q as r,R as i,t as n,N as d,a1 as l}from"./framework-e8cb8151.js";const v={},c=l('<h1 id="_28-下一代响应式-web-设计-容器查询" tabindex="-1"><a class="header-anchor" href="#_28-下一代响应式-web-设计-容器查询" aria-hidden="true">#</a> 28-下一代响应式 Web 设计：容器查询</h1><p>CSS 的媒体查询引发了一场响应式 Web 设计的革命，为开发者提供了一种方法来查询用户代理或设备环境的各个方面，比如视窗的大小或用户偏好来改变 Web 页面的风格。直到现在，媒体查询还做不到根据一个最近的容器的大小来改变样式风格。也正因此，大家一直期待的容器查询来了。</p><p><strong>很难想象，从基于页面的响应式设计（媒体查询）到基于容器的响应式设计（容器查询）的转变，对设计生态系统的发展会起到什么作用</strong> 。</p><p>为了回答这个问题，接下来我们分几个方面来介绍，希望能给大家带来一定的思考，从而得到自己想要的答案。</p><h2 id="容器查询的发展历程" tabindex="-1"><a class="header-anchor" href="#容器查询的发展历程" aria-hidden="true">#</a> 容器查询的发展历程</h2><p>一直以来，CSS 容器查询都是大家期待的一个特性，在这几年的 CSS 发展报告中，它一直位居第一：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18f52d4afa58406b8dcb466de9ca9605~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>通过前面课程的学习，我们知道了。在 CSS 中，Web 开发者可以根据 CSS 媒体查询特性（通常是视窗宽度、媒体设备特性等）来为 Web 页面定制不同的表现形式，比如可以根据用户浏览内容的设备特性来呈现不同的布局、字体大小和图片等。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a049e0660b06465a8d50e8badaa5d0b2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>但对于 Web 设计师或 Web 开发者来说，在现代 Web 设计或布局中仍然缺少一特性，页面的组件设计不能够响应其容器的宽度（或其他特性）。也就是说，如果 Web 开发者能够根据容器宽度来改变 UI 样式，那就更好了。容器查询将在很大程度上帮助 Web 开发者更好地完成他们的工作，在为 Web 开发基于组件代码时，容器查询特性的缺失是一个巨大的限制。</p><p>正因此，有关于容器查询的特性在社区中的探讨就没有停止过。</p>',11),u={href:"https://twitter.com/zachleat",target:"_blank",rel:"noopener noreferrer"},o={href:"https://www.zachleat.com/web/origin-container-queries/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://twitter.com/andyhume",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/ahume/selector-queries",target:"_blank",rel:"noopener noreferrer"},p={href:"https://twitter.com/wilto",target:"_blank",rel:"noopener noreferrer"},g=i("code",null,"<picture>",-1),q={href:"https://alistapart.com/article/container-queries-once-more-unto-the-breach/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://twitter.com/beep",target:"_blank",rel:"noopener noreferrer"},f={href:"https://ethanmarcotte.com/wrote/on-container-queries/",target:"_blank",rel:"noopener noreferrer"},x=i("strong",null,"在他最初关注的响应式 Web 设计的文章之后的几年里，Web 设计师和开发人员的工作越来越集中在组件上，而不是整个页面，这使得媒体查询不那么理想",-1),_={href:"https://twitter.com/davidbaron",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/dbaron/container-queries-implementability",target:"_blank",rel:"noopener noreferrer"},y=i("p",null,[i("strong",null,"容器查询要求样式取决于组件的大小，但考虑到 CSS 的工作原理，组件中的样式会影响其大小。任意打破这个循环，既会产生奇怪的结果，又会干扰浏览器的工作，还会增加浏览器优化的成本"),n(" 。")],-1),k={href:"https://twitter.com/gregwhitworth",target:"_blank",rel:"noopener noreferrer"},z={href:"https://noti.st/events/elQrNX/css-day-ux-special",target:"_blank",rel:"noopener noreferrer"},S={href:"https://noti.st/gregwhitworth/UDul7E/over-the-moon-for-container-queries",target:"_blank",rel:"noopener noreferrer"},j={href:"https://github.com/dbaron/container-queries-implementability",target:"_blank",rel:"noopener noreferrer"},C={href:"https://twitter.com/TerribleMia",target:"_blank",rel:"noopener noreferrer"},W=i("code",null,"@container 方法",-1),L=i("blockquote",null,[i("p",null,[i("code",null,"@container"),n(" 方法通过对被查询的元素应用大小和布局的限制来实现。任何具有尺寸和布局限制的元素都可以通过一个新的 "),i("code",null,"@container"),n(" 规则进行查询，其语法与现有的媒体查询类似。")])],-1),M={href:"https://drafts.csswg.org/css-contain-3/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://www.w3.org/TR/css-contain-3",target:"_blank",rel:"noopener noreferrer"},I={href:"https://github.com/w3c/csswg-drafts/projects/18",target:"_blank",rel:"noopener noreferrer"},D=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15fb2c4de8004eada8d8283406fdcc02~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),T=i("p",null,"其实，自从我们在 2021 年 4 月第一次看到容器查询原型以来，它的语法已经更改了几次。庆幸的是，现在容器查询的规范也稳定了，浏览器也准备发布了！现在使用，你也不必担心其语法规则的变化了。",-1),U=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d00258457baf49eba863a203afc1ae64~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),R=i("p",null,"当然，如果你在互联网上阅读 CSS 容器查询相关的教程，看到文章中的示例没有任何效果，很有可能示例使用的是老的语法规则。",-1),G={href:"https://caniuse.com/css-container-queries",target:"_blank",rel:"noopener noreferrer"},H=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4188c738c2445969576ad058fac47f9~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),N={href:"https://github.com/GoogleChromeLabs/container-query-polyfill",target:"_blank",rel:"noopener noreferrer"},P=l(`<h2 id="什么是容器查询" tabindex="-1"><a class="header-anchor" href="#什么是容器查询" aria-hidden="true">#</a> 什么是容器查询？</h2><p>CSS 容器查询最大的特点是： <strong>容器查询允许开发者定义任何一个元素为包含上下文，查询容器的后代元素可以根据查询容器的大小或计算样式的变化来改变风格</strong> ！</p><p>换句话说，一个查询容器是通过使用容器类型属性（<code>container-type</code> 或 <code>container</code>）来指定其查询类型。同时，查询容器的后代元素的样式规则可以通过使用 <code>@container</code> 条件组规则进行独立设置。简单地说，<strong>查询容器（也被称为 CSS 包容）提供了一种方法来隔离页面的各个部分，并向浏览器声明这些部分在样式和布局方面与页面的其他部分是独立的</strong> 。</p><p>容器查询为响应式 Web 设计提供了一种更加动态的方法。这意味着，如果你卡片组件同时放在侧边栏（<code>aside</code>）和页面主内容栏中（<code>main</code>），则卡片组件本身可以根据容器（<code>aside</code> 和 <code>main</code>）而不是浏览器视窗进行响应式的信息展示（卡片组件 UI 不同）。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7515be040494766bd8fa2fc12c9f295~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>简化一下，以卡片 <code>.card</code> 组件为例。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9e5f5a03e3944c58894355da448c3a3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>同一个卡片组件 <code>Card</code> ，它有三种不同的 UI 状态，分别是 <code>S</code> 、<code>M</code> 和 <code>L</code> 。</p><p>我们来看如何使用 CSS 容器查询构建这个卡片组件。首先，把卡片组件放到一个容器中，比如 <code>.card__container</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;card__container&quot;&gt;
    &lt;!-- Card 组件需要的 HTML 结构 --&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;figure&gt;
            &lt;img src=&quot;thumbnail.jpg&quot; alt=&quot;thumbnail&quot; /&gt;
        &lt;/figure&gt;
        &lt;ul class=&quot;badges&quot;&gt;
            &lt;li class=&quot;badge&quot;&gt;gluten free&lt;/li&gt;
            &lt;li class=&quot;badge&quot;&gt;main dish&lt;/li&gt;
        &lt;/ul&gt;
        &lt;h3 class=&quot;title&quot;&gt;Card Title&lt;/h3&gt;
        &lt;div class=&quot;votes&quot;&gt;
            &lt;svg&gt;&lt;/svg&gt;
            &lt;svg&gt;&lt;/svg&gt;
            &lt;svg&gt;&lt;/svg&gt;
            &lt;svg&gt;&lt;/svg&gt;
            &lt;svg&gt;&lt;/svg&gt;
            &lt;span&gt;(12 votes)&lt;/span&gt;
        &lt;/div&gt;
        &lt;p class=&quot;description&quot;&gt;Card Description&lt;/p&gt;
        &lt;button&gt;
            &lt;svg&gt;&lt;/svg&gt; Save
        &lt;/button&gt;
        &lt;dl class=&quot;lists&quot;&gt;
            &lt;dt&gt;Preparation Time: &lt;/dt&gt;
            &lt;dd&gt;3 hours&lt;/dd&gt;
            &lt;dt&gt;Cooking time:&lt;/dt&gt;
            &lt;dd&gt;25 min&lt;/dd&gt;
            &lt;dt&gt;Serving:&lt;/dt&gt;
            &lt;dd&gt;4-6 persons&lt;/dd&gt;
            &lt;dt&gt;Cost:&lt;/dt&gt;
            &lt;dd&gt;$3/person&lt;/dd&gt;
        &lt;/dl&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，当卡片组件（<code>.card</code>）被放在一个容器（<code>.card__container</code>）中时，代表着它被包含在该容器中，比如上面代码中的 <code>.card__container</code>。这也意味着，我们可以使用 CSS 的 <code>container</code> 来查询 <code>.card__container</code> 的宽度，并在 <code>@container</code> 对 <code>.card</code> 设置不同的样式规则，从而达到设计师真正的意图，比如，容器宽度（<code>.card__container</code>）分别在默认、 <code>&gt;650px</code>和<code>&gt;820px</code> 时，为 <code>.card</code> 设置不同样式：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8520402c0a9d45749c76a20fc8ce791e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>代码可能像下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container {
    min-width: 300px;
    width: 360px;
    overflow: hidden;
    resize: horizontal;
}
​
.card {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto;
    grid-template-rows: min-content auto auto auto minmax(0, 1fr);
    grid-template-areas:
        &quot;thumbnail&quot;
        &quot;badges&quot;
        &quot;title&quot;
        &quot;votes&quot;
        &quot;description&quot;;
}
​
.card figure {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    aspect-ratio: 4 / 3;
}
​
.card figure {
    grid-area: thumbnail;
}
​
.card .badges {
    grid-area: badges;
}
​
.card .title {
    grid-area: title;
}
​
.card .votes {
    grid-area: votes;
}
​
.card .description {
    grid-area: description;
}
​
.badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 1rem;
    gap: 5px;
}
​
.badges li {
    display: inline-flex;
    border: 1px solid currentColor;
    padding: 0.3em 0.5em 0.15em;
    color: #e05d26;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 85%;
    align-items: center;
    justify-content: center;
    line-height: 1;
}
​
.card .title {
    padding: 0 1rem;
    font-size: clamp(1.25em, 2vw + 1.35rem, 1.75em);
}
​
.card .votes {
    padding: 0 1rem;
    display: flex;
    gap: 2px;
    align-items: center;
    color: #e05d26;
}
​
.votes span {
    color: #666;
}
​
.card .description {
    padding: 0 1rem 1rem;
    font-size: 90%;
    line-height: 1.6;
    color: #666;
}
​
.card button {
    -webkit-appearance: button;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 14px 6px 12px;
    border-radius: 4px;
    border: 2px solid currentColor;
    color: #e05d26;
    background: #fff;
    cursor: pointer;
    font-weight: bold;
    gap: 5px;
    transition: all 0.2s linear;
    box-shadow: 0 0 0.2em 0.2em rgb(0 0 0 / 15%);
}
​
.card button:hover {
    opacity: 0.8;
} 
​
.card button:focus {
    outline-offset: 2px;
}
​
.card button {
    grid-area: thumbnail;
    justify-self: end;
    align-self: start;
    margin-top: 1rem;
    margin-right: 1rem;
}
​
.card .lists {
    display: none;
}
​
/* Container Queries Layout*/
.card__container {
    container-type: inline-size;
}
​
/* .card__container 宽度大于 650px */
@container (inline-size &gt; 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            &quot;thumbnail  .&quot;
            &quot;thumbnail  badges&quot;
            &quot;thumbnail  title&quot;
            &quot;thumbnail  votes&quot;
            &quot;thumbnail  description&quot;
            &quot;thumbnail  button&quot;
            &quot;thumbnail  .&quot;;
        column-gap: 1.5rem;
    }
​
    .card button {
        grid-area: button;
        justify-self: start;
        align-self: center;
        margin: 0;
    }
​
    .card figure {
        border-radius: 8px 0 0 8px;
        aspect-ratio: 1;
    }
​
    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0 1rem 0 0;
    }
}
​
/* .card__container 宽度大于 820px */
​
@container (inline-size &gt; 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
            &quot;thumbnail  .            .&quot;
            &quot;thumbnail  badges       lists&quot;
            &quot;thumbnail  title        lists&quot;
            &quot;thumbnail  votes        lists&quot;
            &quot;thumbnail  description  lists&quot;
            &quot;thumbnail  button       lists&quot;
            &quot;thumbnail  .            .&quot;;
    }
​
    .card .lists {
        display: flex;
        flex-direction: column;
        padding-right: 1rem;
        grid-area: lists;
        gap: 0.5rem;
    }
​
    .lists dt {
        font-size: 1rem;
    }
​
    .lists dd {
        font-size: 85%;
        color: #666;
    }
​
    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0;
    }
​
    .card figure {
        aspect-ratio: 4 / 3;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拖动卡片右下角的滑块，改变 <code>.card__container</code> 容器大小，你可以看到卡片组件（<code>.card</code>）UI 效果的变化：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15e3014cd1d54e148d3f9bbbbb947736~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,16),V={href:"https://codepen.io/airen/full/QWBKdzP",target:"_blank",rel:"noopener noreferrer"},A=l('<p><code>@container</code> 规则，其工作方式与使用 <code>@media</code> 的媒体查询类似，不同的是，<code>@container</code> 查询父容器以获取信息，而不是视口和浏览器的 UserAgent。</p><h2 id="容器查询的使用" tabindex="-1"><a class="header-anchor" href="#容器查询的使用" aria-hidden="true">#</a> 容器查询的使用</h2><p>上面的示例说明了容器查询是什么，我想有不少同学应该不知道上面代码具体的含义。那我们就先从 <code>@container</code> 和 <code>container</code> 聊起。</p><h3 id="container-和-container" tabindex="-1"><a class="header-anchor" href="#container-和-container" aria-hidden="true">#</a> @container 和 container</h3>',4),Q=i("code",null,"container",-1),K=i("code",null,"@container",-1),E={href:"https://drafts.csswg.org/css-contain-3/#containment-types",target:"_blank",rel:"noopener noreferrer"},F=l(`<ul><li><code>container</code> 是 <code>container-type</code> 和 <code>container-name</code> 的简写属性，用来显式声明某个元素是一个查询容器，并且定义查询容器的类型（可以由 <code>container-type</code> 指定）和查询容器的名称（由 <code>container-name</code> 指定）。</li><li><code>@container</code>（带有 <code>@</code> 规则），它类似于条件 CSS 中的 <code>@media</code> 或 <code>@supports</code> 规则，是一个条件组规则，其条件是一个容器查询，它是大小（<code>size</code>）和（或）样式（<code>style</code>）查询的布尔组合。只有当其条件为真（<code>true</code>），<code>@container</code> 规则块中的样式都会被用户代理运用，否则将被视为无效，被用户代理忽略。</li></ul><h3 id="定义一个包含性上下文" tabindex="-1"><a class="header-anchor" href="#定义一个包含性上下文" aria-hidden="true">#</a> 定义一个包含性上下文</h3><p>要使用 CSS 容器查询特性，<strong>首先要定义一个包含性上下文（Containment Context）</strong> 。这个有点类似于使用 Flexbox 和 Grid 布局（定义 Flexbox 或 Grid 上下文使用的是 <code>display</code> 属性），只不过，定义一个包含性的上下文使用的不是我们熟知的 <code>display</code> 属性，而是一个新的 CSS 属性，即 <strong><code>container</code></strong> 。</p><p>在一个元素上显式使用 <code>container</code> 可以告诉浏览器以后要针对这个容器进行查询，以及具体如何查询该指定的容器。比如，上面演示的示例中，我们在 <code>.card__container</code> 元素上（<code>.card</code> 的父容器）显式设置了 <code>container-type</code> 的值为 <code>inline-size</code>:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container { 
    container-type: inline-size;
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码告诉浏览器，可以基于 <code>.card__container</code> 容器的内联轴（Inline Axis）方向尺寸变化进行查询。也就是说，当 <code>.card__container</code> 容器宽度大小变化到指定的某个值时，其后代元素的样式就可以进行调整。</p><p><code>container-type</code> 是 <code>container</code> 属性中的一个子属性，另外，还可以显式使用 <code>container-name</code> 来命名你的容器，即<strong>给一个包含性上下文指定一个具体的名称</strong> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container { 
    container-name: card; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式对于同一个上下文中有多个包含性上下文时非常有意义，可以更明确地知道哪些查询会影响元素。</p><p>你可以使用简写属性 <code>container</code>，只不过需要在 <code>container-type</code> 和 <code>container-name</code> 之间添加斜杠分割符 <code>/</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container { 
    container-type: inline-size; 
    container-name: card; 
} 
​
/* 等同于 */ 
.card__container { 
    container: card / inline-size; 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在使用</strong> <strong><code>container</code>简写方式时，<code>container-name</code></strong> <strong>要放在</strong> <strong><code>/</code></strong> <strong>前，<code>container-type</code></strong> <strong>要放在</strong> <strong><code>/</code></strong> <strong>后</strong> 。</p><p>另外，如果一个容器查询被应用到一个没有定义为包含上下文的祖先元素上，查询将无法应用。也就是说，无论是 <code>body</code> 还是 <code>html</code> 元素，都没有默认的回退包含上下文。而且，定义包含上下文名称时不能是 CSS 的关键词，比如 <code>default</code>、<code>inherit</code>、<code>initial</code> 等。</p><blockquote><p>注意：<code>container-name</code> 可以省略，如果省略将会使用其初始值 <code>none</code>，但 <code>container-type</code> 不可省略，如果省略的话则表示未显式声明包含性上下文！</p></blockquote><h3 id="定义一个容器查询" tabindex="-1"><a class="header-anchor" href="#定义一个容器查询" aria-hidden="true">#</a> 定义一个容器查询</h3><p>现在我们知道使用 <code>container</code>（或其子属性 <code>container-type</code> 和 <code>container-name</code>）对一个元素显式声明包含上下文（对一个元素应用包含性）。</p><p>CSS 包含性上下文提供了一种方法来隔离页面的各个部分，并向浏览器声明这些部分在样式和布局方面与页面的其他部分是独立的。也就是说，有了这个包含性上下文之后，就可以使用 CSS 的 <code>@</code> 规则 <code>@container</code> 来对应用了包含性元素进行查询，即<strong>对容器进行查询</strong> 。<code>@container</code> 规则的使用和 <code>@media</code> 以及 <code>@supports</code> 相似：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@container (width &gt; 45rem) { 
    /* 应用了包含性上下文后代元素的 CSS */ 
} 
​
@container card (width &gt; 45rem) { 
    /* 应用了包含性上下文后代元素的 CSS */ 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方式都是正确的使用姿势，第二个示例中的 <code>card</code> 指的是 <code>container-name</code> 显式声明的包含性上下文的名称。如果在 <code>@container</code> 中没有指定查询的容器名称，那么这个查询将是针对离样式变化最近的声明了包含性上下文的元素进行查询。比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@container (width &gt; 30em) { 
    .card { 
        border-radius: 20px; 
    } 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示这个查询将是针对 <code>.card</code> 元素最近的显式声明了包含性上下文的元素进行查询。</p>`,21),J={href:"https://codepen.io/una/full/NWgxXGV",target:"_blank",rel:"noopener noreferrer"},O=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.cart-button-container {
    container-type: inline-size;
}
​
.cart-icon {
    container-type: inline-size;
}
​
/* 购物车宽度大于或等于 30px */ 
@container (width &gt; 30px) {
    .cart-lines-group {
        display: block;
    }
}
​
/* 购物车宽度大于或等于 50px ，显示 &quot;+&quot; 符号 */ 
@container (width &gt; 50px) {
    .plus-group {
        display: block;
    }
}
​
/* 购物车宽度在 100px 时， Add 替代 “+” 符号 */
@container (width &gt; 100px) {
    .cart-button {
        padding: 0 1rem;
        display: grid;
        max-width: 120px;
        grid-template-columns: 1fr 1fr;
    }
​
    .plus-group {
        display: none;
    }
​
    .cart-text .add {
        display: inline-block;
    }
​
    .cart-icon {
       margin-right: 0;
    }
}
​
/* 更大的空间时，按钮添加 “Add to cart” */
@container (width &gt; 220px) {
    .cart-button {
        max-width: 260px;
        grid-template-columns: 1fr 3fr;
    }
​
    .cart-text .to-cart {
        display: inline-block;
    }
}
​
/* Product Card */ 
.product-card {
    padding: 1rem;
    border: 3px solid var(--btn-bg);
    text-align: center;
}
​
.product-card img {
    width: 100%;
    display: block;
    max-width: 200px;
    margin: 0 auto;
}
​
.product-card .desc {
    display: none;
}
​
.product-card .title {
    text-transform: uppercase;
    color: magenta;
    font-size: 1rem;
}
​
.product-card .price {
    display: block;
    margin: 1rem 0;
    line-height: 0;
    font-style: italic;
    color: #00b371;
}
​
/* Product Card Responsive */ 
.product-card-container {
    container-type: inline-size;
    container-name: product-card-container;
    width: 100%;
    max-width: 640px;
}
​
.product-card .cart-button {
    margin: 0 auto;
    container-name: product-card-container;
}
​
@container (width &gt; 200px) {
    .product-card .desc {
        display: block;
    }
​
    .product-card {
        padding: 1rem 1rem 2rem;
        border: 5px solid var(--btn-bg);
        text-align: left;
    }
​
    .product-card .title {
        font-size: 1.25rem;
    }
​
    .product-card .price {
        font-size: 1rem;
    }
}
​
@container (width &gt; 250px) {
    .product-card {
        border: 11px solid var(--btn-bg);
    }
​
    .product-card .title {
        font-size: 1.5rem;
    }
​
    .product-card .price {
        font-size: 1.25rem;
    }
}
​
@container product-card-container (width &gt;  400px) {
    .product-card {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 2rem;
    }
​
    .product-card .cart-button {
        margin: 0;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/160504ca68cc439ea42fcf53c5c5884e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,2),Z={href:"https://codepen.io/airen/full/jOpMmZa",target:"_blank",rel:"noopener noreferrer"},X=l('<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0052e9d1703a4b26bedbcff91d7ee06c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示， <code>.product-card-container</code> 、<code>.card-button-container</code> 和 <code>.cart-icon</code> 都是一个包含性上下文，因为它们都显式地设置了 <code>container-type</code> 的值为 <code>inline-size</code> 。如果没有使用 <code>container-type</code> 命名，那么像 <code>.card-button</code> 会先根据 <code>.cart-button-container</code> 查询容器进行查询，因为该包含性上下文离其最近。</p><h3 id="示例-容器查询卡片" tabindex="-1"><a class="header-anchor" href="#示例-容器查询卡片" aria-hidden="true">#</a> 示例：容器查询卡片</h3><p>我想大家对容器查询有了一个初步的认识。接下来，我们把前面示例中的卡片组件放到相应的布局中，比如把卡片分别放置到左侧边栏和主内容栏中：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77005055ea1d4283b56b9f059a7d2f26~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',5),Y={href:"https://codepen.io/airen/full/yLqawaQ",target:"_blank",rel:"noopener noreferrer"},$=l(`<p>我们把带有容器查询特性的卡片组件 <code>.card</code> 分别放置在页面的左侧边栏 <code>aside</code> 和主内容栏 <code>main</code> 中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
    &lt;header&gt;.header&lt;/header&gt;
    &lt;main&gt;
        &lt;div class=&quot;card__container&quot; style=&quot;--c: darkorchid&quot;&gt;
            &lt;!-- Card 组件需要的 HTML 结构 --&gt;
            &lt;div class=&quot;card&quot;&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;https://picsum.photos/1024/860?random=1&quot; alt=&quot;thumbnail&quot; /&gt;
                &lt;/figure&gt;
              &lt;ul class=&quot;badges&quot;&gt;
                  &lt;li class=&quot;badge&quot;&gt;Solarpunk&lt;/li&gt;
                  &lt;li class=&quot;badge&quot;&gt;Hope&lt;/li&gt;
              &lt;/ul&gt;
              &lt;h3 class=&quot;title&quot;&gt;We Don’t Have the Right: A Decolonized Approach to Innovation&lt;/h3&gt;
              &lt;div class=&quot;votes&quot;&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810506945&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;11048&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M902.211 410.358a31.766 31.766 0 0 0-25.644-21.62L644.34 354.994 540.485 144.561a31.765 31.765 0 0 0-56.971 0L379.659 354.995l-232.227 33.744a31.768 31.768 0 0 0-17.606 54.183l168.042 163.8-39.669 231.288a31.765 31.765 0 0 0 46.091 33.487L512 762.298l207.71 109.199c6.915 3.65 22.854 4.496 33.454-2.418 10.086-6.579 14.681-19.151 12.637-31.069l-39.669-231.288 168.041-163.8a31.765 31.765 0 0 0 8.038-32.564zM669.827 572.885a31.766 31.766 0 0 0-9.136 28.117l31.611 184.31-165.521-87.02a31.746 31.746 0 0 0-14.782-3.648 31.755 31.755 0 0 0-14.782 3.648l-165.521 87.02 31.611-184.31a31.766 31.766 0 0 0-9.135-28.117l-133.91-130.53 185.058-26.89a31.765 31.765 0 0 0 23.918-17.377L512 230.396l82.761 167.691a31.765 31.765 0 0 0 23.917 17.377l185.059 26.89-133.91 130.531z&quot; fill=&quot;currentColor&quot; p-id=&quot;11049&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;span&gt;(12 votes)&lt;/span&gt;
              &lt;/div&gt;
              &lt;p class=&quot;description&quot;&gt;It really is possible to make excellent gluten free pizza at home in your own oven with our recipes and techniques.&lt;/p&gt;
              &lt;button&gt;
                  &lt;svg t=&quot;1672810575352&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;16052&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M785.749333 849.578667l-274.5344-123.562667-274.568533 123.562667V149.981867c0-4.778667 3.925333-8.738133 8.738133-8.738134h531.626667c4.8128 0 8.738133 3.925333 8.738133 8.738134v699.5968zM777.0112 34.372267H245.384533A111.138133 111.138133 0 0 0 134.2464 145.5104V1016.1152l102.4-48.093867 274.568533-128.989866 274.5344 123.5968 102.4 46.08V145.5104A111.138133 111.138133 0 0 0 777.0112 34.372267z&quot; fill=&quot;currentColor&quot; p-id=&quot;16053&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt; Save
              &lt;/button&gt;
              &lt;dl class=&quot;lists&quot;&gt;
                  &lt;dt&gt;Preparation Time: &lt;/dt&gt;
                  &lt;dd&gt;3 hours&lt;/dd&gt;
                  &lt;dt&gt;Cooking time:&lt;/dt&gt;
                  &lt;dd&gt;25 min&lt;/dd&gt;
                  &lt;dt&gt;Serving:&lt;/dt&gt;
                  &lt;dd&gt;4-6 persons&lt;/dd&gt;
                  &lt;dt&gt;Cost:&lt;/dt&gt;
                  &lt;dd&gt;$3/person&lt;/dd&gt;
              &lt;/dl&gt;
           &lt;/div&gt;
        &lt;/div&gt;
    &lt;/main&gt;
    &lt;aside&gt;
        &lt;div class=&quot;card__container&quot; style=&quot;--c: darkorchid&quot;&gt;
            &lt;!-- Card 组件需要的 HTML 结构 --&gt;
            &lt;div class=&quot;card&quot;&gt;
                &lt;figure&gt;
                    &lt;img src=&quot;https://picsum.photos/1024/860?random=1&quot; alt=&quot;thumbnail&quot; /&gt;
                &lt;/figure&gt;
              &lt;ul class=&quot;badges&quot;&gt;
                  &lt;li class=&quot;badge&quot;&gt;Solarpunk&lt;/li&gt;
                  &lt;li class=&quot;badge&quot;&gt;Hope&lt;/li&gt;
              &lt;/ul&gt;
              &lt;h3 class=&quot;title&quot;&gt;We Don’t Have the Right: A Decolonized Approach to Innovation&lt;/h3&gt;
              &lt;div class=&quot;votes&quot;&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810464651&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10908&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z&quot; fill=&quot;currentColor&quot; p-id=&quot;10909&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;svg t=&quot;1672810506945&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;11048&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M902.211 410.358a31.766 31.766 0 0 0-25.644-21.62L644.34 354.994 540.485 144.561a31.765 31.765 0 0 0-56.971 0L379.659 354.995l-232.227 33.744a31.768 31.768 0 0 0-17.606 54.183l168.042 163.8-39.669 231.288a31.765 31.765 0 0 0 46.091 33.487L512 762.298l207.71 109.199c6.915 3.65 22.854 4.496 33.454-2.418 10.086-6.579 14.681-19.151 12.637-31.069l-39.669-231.288 168.041-163.8a31.765 31.765 0 0 0 8.038-32.564zM669.827 572.885a31.766 31.766 0 0 0-9.136 28.117l31.611 184.31-165.521-87.02a31.746 31.746 0 0 0-14.782-3.648 31.755 31.755 0 0 0-14.782 3.648l-165.521 87.02 31.611-184.31a31.766 31.766 0 0 0-9.135-28.117l-133.91-130.53 185.058-26.89a31.765 31.765 0 0 0 23.918-17.377L512 230.396l82.761 167.691a31.765 31.765 0 0 0 23.917 17.377l185.059 26.89-133.91 130.531z&quot; fill=&quot;currentColor&quot; p-id=&quot;11049&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt;
                  &lt;span&gt;(12 votes)&lt;/span&gt;
              &lt;/div&gt;
              &lt;p class=&quot;description&quot;&gt;It really is possible to make excellent gluten free pizza at home in your own oven with our recipes and techniques.&lt;/p&gt;
              &lt;button&gt;
                  &lt;svg t=&quot;1672810575352&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;16052&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                      &lt;path d=&quot;M785.749333 849.578667l-274.5344-123.562667-274.568533 123.562667V149.981867c0-4.778667 3.925333-8.738133 8.738133-8.738134h531.626667c4.8128 0 8.738133 3.925333 8.738133 8.738134v699.5968zM777.0112 34.372267H245.384533A111.138133 111.138133 0 0 0 134.2464 145.5104V1016.1152l102.4-48.093867 274.568533-128.989866 274.5344 123.5968 102.4 46.08V145.5104A111.138133 111.138133 0 0 0 777.0112 34.372267z&quot; fill=&quot;currentColor&quot; p-id=&quot;16053&quot;&gt;&lt;/path&gt;
                  &lt;/svg&gt; Save
              &lt;/button&gt;
              &lt;dl class=&quot;lists&quot;&gt;
                  &lt;dt&gt;Preparation Time: &lt;/dt&gt;
                  &lt;dd&gt;3 hours&lt;/dd&gt;
                  &lt;dt&gt;Cooking time:&lt;/dt&gt;
                  &lt;dd&gt;25 min&lt;/dd&gt;
                  &lt;dt&gt;Serving:&lt;/dt&gt;
                  &lt;dd&gt;4-6 persons&lt;/dd&gt;
                  &lt;dt&gt;Cost:&lt;/dt&gt;
                  &lt;dd&gt;$3/person&lt;/dd&gt;
              &lt;/dl&gt;
           &lt;/div&gt;
        &lt;/div&gt;
    &lt;/aside&gt;
    &lt;footer&gt;.footer&lt;/footer&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>卡片 <code>.card</code> 可以根据其容器 <code>.card__container</code> 的宽度调整 UI 布局：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f7f449b50b34c35bb1a0a0a5c3828e0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,4),ii={href:"https://codepen.io/airen/full/QWBKdzP",target:"_blank",rel:"noopener noreferrer"},ni=l(`<p>有了这样一个卡片组件之后，如果将其放在不同的位置，即使是同一页面，同一视窗断点下，也会根据其容器断点自动匹配最为适合的布局（或UI效果）。比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01f7a34d3b29457bbbe5b6940e9fb554~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>从上图的效果中不难发现，位于侧边栏 <code>aside</code> 的卡片组件，它始终能保持下图呈现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4fbe8c546e846d5a20a95302a8de9ab~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>位于 <code>main</code> 栏的卡片将会根据 <code>.card__container</code> 的宽度有着不同的方式呈现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b04f3388dc64487e904a1362b6387f6c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就我们这个示例，<code>aside</code> 和 <code>main</code> 的布局，我们采用了 CSS 媒体查询，分别在 <code>768px</code> 和 <code>1024px</code> 断点调整了网格列轨道的尺寸：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>body {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 1rem;
    grid-template-areas:
        &quot;header&quot;
        &quot;main&quot;
        &quot;aside&quot;
        &quot;footer&quot;;
}

header {
    grid-area: header;
}

main {
    grid-area: main;
}

aside {
    grid-area: aside;
}

footer {
    grid-area: footer;
}

@media only screen and (min-width: 768px) {
    body {
        grid-template-columns: 280px minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto;
        grid-template-areas:
          &quot;header header&quot;
          &quot;aside main&quot;
          &quot;footer footer&quot;;
    }
}

@media only screen and (min-width: 1024px) {
    body {
        grid-template-columns: 380px minmax(0, 1fr);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上在 <code>main</code> 栏中的 <code>.grid</code> （卡片列表的容器）采用 CSS Grid 的 RAM 布局技术：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.grid {
    display: grid;
    gap: 1rem;
}

main .grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 30em), 1fr));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让位于 <code>main</code> 栏中的卡片容器 <code>.card__container</code> 会随着 RAM 布局技术的调整具有不同的宽度，它有可能小于 <code>650px</code> ，有可能是 <code>650px ~ 820px</code> 之间，也有可能是大于 <code>820px</code> 。因此，卡片在主内容栏 <code>main</code> 会有三种不同的 UI 呈现。</p><p>除此之外，我们还可以将 <code>aside</code> 和 <code>main</code> 定义为一个包含性上下文。然后在 <code>main</code> 栏中对 <code>.grid</code> 设置不同的列，比如：</p><ul><li>大于 <code>40em</code> 时，<code>.grid</code> 为两列 <code>repeat(2, 1fr)</code>；</li><li>大于 <code>60em</code> 时，<code>.grid</code> 为三列 <code>repeat(3, 1fr)</code>；</li><li>大于 <code>80em</code> 时， <code>.grid</code> 为四列 <code>repeat(4, 1fr)</code>。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba0e22a8e4a74d4eab2e19b961f1f251~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>关键代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- HTML --&gt; 
&lt;main&gt;
    &lt;!-- 定义一个名为 layout 的容器查询 --&gt; 
    &lt;div class=&quot;grid&quot;&gt; &lt;!-- 根据main容器宽度，调整网布局 --&gt; 
        &lt;div class=&quot;card__container&quot;&gt;
            &lt;!-- 定义一个名为 card 的容器查询 --&gt; 
            &lt;Card /&gt;&lt;!-- 根据卡片容器 card__container 的宽度调整 Card 组件UI --&gt; 
        &lt;/div&gt; 
    &lt;/div&gt; 
&lt;/main&gt; 
&lt;aside&gt;
    &lt;!-- 定义一个名为 layout 的容器查询 --&gt; 
    &lt;div class=&quot;grid&quot;&gt;&lt;!-- 根据 aside 容器宽度，调整网布局 --&gt; 
        &lt;div class=&quot;card__container&quot;&gt;&lt;!-- 定义一个名为 component 的容器查询 --&gt; 
            &lt;Card /&gt;&lt;!-- 根据卡片容器 card__container 的宽度调整 Card 组件UI --&gt; 
        &lt;/div&gt; 
    &lt;/div&gt; 
&lt;/aside&gt;
aside,
main {
    container-name: layout;
    container-type: inline-size;
}
​
.grid {
    display: grid;
    gap: 1rem;
}
​
@container layout (width &gt; 40em) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
​
@container layout (width &gt; 60em) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
​
@container layout (width &gt; 80em) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
​
/* Container Queries Layout*/
.card__container {
    container-type: inline-size;
    container-name: card;
}
​
/* .card__container 宽度大于 650px */
@container card (inline-size &gt; 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            &quot;thumbnail  .&quot;
            &quot;thumbnail  badges&quot;
            &quot;thumbnail  title&quot;
            &quot;thumbnail  votes&quot;
            &quot;thumbnail  description&quot;
            &quot;thumbnail  button&quot;
            &quot;thumbnail  .&quot;;
          column-gap: 1.5rem;
    }
​
    .card button {
        grid-area: button;
        justify-self: start;
        align-self: center;
        margin: 0;
    }
​
    .card figure {
        border-radius: 8px 0 0 8px;
        aspect-ratio: 1;
    }
​
    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0 1rem 0 0;
    }
}
​
/* .card__container 宽度大于 820px */
@container card (inline-size &gt; 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
          &quot;thumbnail  .            .&quot;
          &quot;thumbnail  badges       lists&quot;
          &quot;thumbnail  title        lists&quot;
          &quot;thumbnail  votes        lists&quot;
          &quot;thumbnail  description  lists&quot;
          &quot;thumbnail  button       lists&quot;
          &quot;thumbnail  .            .&quot;;
    }
​
    .card .lists {
        display: flex;
        flex-direction: column;
        padding-right: 1rem;
        grid-area: lists;
        gap: 0.5rem;
    }
​
    .lists dt {
        font-size: 1rem;
    }
​
    .lists dd {
        font-size: 85%;
        color: #666;
    }
​
    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0;
    }
​
    .card figure {
        aspect-ratio: 4 / 3;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed9e41f698734e13ab414b1d9abce2e9~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,17),ei={href:"https://codepen.io/airen/full/QWBKRmg",target:"_blank",rel:"noopener noreferrer"},di=l(`<p>我们前面有提到过，Web 内容输出是动态的，可能因为卡片的扩展或收缩，CSS Flexbox 布局最终呈现的效果会和设计效果不一致：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c5815e2204442c69a523773f124c9a2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>但有了 CSS 容器查询特性之后，这一切都变得很简单。就拿上面的示例来说，如果我们使用跨越多列来模拟卡片数量输出的不一致，你会发现，使用了容器查询的卡片会因为其查询容易自动匹配相应的布局效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>aside,
main {
    container-name: layout;
    container-type: inline-size;
}

.grid {
    display: grid;
    gap: 1rem;
    grid-auto-flow: dense;
}

@container layout (width &gt; 40em) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    main .grid .card__container:nth-child(2n + 1) {
        grid-column: span 2;
    }
}

@container layout (width &gt; 60em) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    main .grid .card__container:nth-child(2n + 1) {
        grid-column: span 3;
    }
}

@container layout (width &gt; 80em) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }

    main .grid .card__container:nth-child(2n + 1) {
        grid-column: span 4;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c25ebbf4e74fed9283323626190932~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),li={href:"https://codepen.io/airen/full/vYaXqNK",target:"_blank",rel:"noopener noreferrer"},si=l(`<h2 id="容器查询解决的是什么问题" tabindex="-1"><a class="header-anchor" href="#容器查询解决的是什么问题" aria-hidden="true">#</a> 容器查询解决的是什么问题？</h2><p>众所周知，响应式 Web 设计的概念的核心是 CSS 媒体查询的出现，它允许开发者根据浏览器视窗的尺寸来设置各种样式规则。也正因此，响应式 Web 设计和 CSS 媒体查询开启了更多的 Web 布局解决方案，以及多年来围绕响应视窗尺寸创建的最佳实践。而且，近些年来，设计系统和组件库也得到了更广泛的普及。对于更多开发者而言，更大的期望是：<strong>一次建成，随地部署</strong> ！</p><p>这也意味着一个单独开发的 Web 组件可以在任何情况下工作，使得建立的复杂界面更加有效和一致。只不过，这些组件会组合在一起，形成一个 Web 页面或 Web 应用界面。</p><p>目前，在只有媒体查询的情况下，往往需要额外的一层来协调跨视窗大小变化的组件的突变。在这些情况下，你可能不得不在更多的断点下，使用更多的类名来设置不同的样式规则。甚至更惨的是，即使这样做，很多情况之下仍然也无法达到最理想的 UI 表面。</p><p>很多时候，响应式 Web 设计不是关于浏览器视窗尺寸，而是关于容器的尺寸大小，比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6276e844b4854f0cbe16fb927ee38933~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>庆幸的是，CSS 容器查询的出现，使我们超越了只考虑浏览器视窗尺寸的范围，并允许任何组件或元素对定义的容器尺寸做出响应。因此，虽然你可能仍然使用响应式来给 Web 页面布局，但 Web 页面的任何一个组件都可能通过容器查询来定义自己的样式变化。然后，它可以根据它是在一个窄的还是宽的容器中显示，来调整它的样式。</p><blockquote><p><strong>容器查询使我们不再只考虑浏览器视窗尺寸大小，而是允许任何组件或元素对定义的容器尺寸做出响应</strong> ！</p></blockquote><p>也就是说，有了 CSS 容器查询，你就能以一种非常精确和可预测的方式定义一个组件的全部样式。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0e63613edb7428389f3ac57cb5d1884~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="设计时考虑容器查询" tabindex="-1"><a class="header-anchor" href="#设计时考虑容器查询" aria-hidden="true">#</a> 设计时考虑容器查询</h2><p>虽然响应式 Web 设计给 Web 设计师带来了更多的可能性，但响应式 Web 设计还是有很多的局限性。对于 Web 设计师而言，更期待的是能够根据组件容器尺寸来提供不同的设计风格。依旧拿卡片组件来举例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dc3d4b806a743a08bf13aa0dfec7ef4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>也就是说，CSS 容器查询特性来了之后，作为一名 Web 设计师，在设计 Web 页面（或组件）时，就需要基于容器尺寸考虑如何设计。这样一来，可以向 Web 开发人员提供组件的细节和变化，Web 开发人员也可以基于这些细节进行编码（进行开发）。</p><p>不过，这并不意味着容器查询特性之后，响应式 Web 设计是就失去了意义。在未来，容器查询和响应式设计是共存的，简单地说，Web 设计师在设计组件时可能会将组件分为以下几个部分：</p><ul><li>基于视窗（CSS 媒体查询）；</li><li>基于容器（CSS 容器查询）；</li><li>通用型（不受影响的组件）。</li></ul><p>比如：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06fbf92e923442e0998f8c5a59ecabc4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在未来，Web 设计师给 Web 开发者投喂的设计稿可能就会像下图这样了：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b0103f11fe4861be272bafb3349749~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>或许因为容器查询的到来，设计师在设计 Web 的时候，也可能会做出相应的调整。投喂给 Web 开发的设计稿也可能会和以往的模式有所差异。那么这个时候，Web 开发者就需要正确理解设计师的意图了。比如，Web 设计师可能在未来的设计中提供向下图的卡片组件设计：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e70a570ffee740ddab9c861cdca7288d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>作为 Web 开发人员，看到上图设计效果，需要改变以往对设计图意图的理解，不能继续执着于基于视窗尺寸来调整组件 UI。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9094d802c2294cb58da5a9380a84c8d4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上图是基于视窗的一种开发模式，需要为卡片组件设置不同的类名，并且基于视窗尺寸，在相应的类名下调整卡片组件 UI。有了容器特性时，我们可以基于现代的 Web 布局技术，比如 Flexbox 或 Grid 布局，让卡片组件基于其容器来调整其 UI：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fd2475dbc974b11a9ac5591bba3c394~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>正如上图所示，可以基于视窗大小采用 CSS 媒体查询特性，Flexbox 或 Grid 布局等技术改变卡片容器 <code>.card__container</code> 的大小，从而让卡片组件根据其容器尺寸大小做出相应响应。</p><p>拥有一个能根据其父容器尺寸做出响应（UI 调整）的组件是非常有用的，正如你看到的，我们可以只构建一个组件，就可以满足不同视窗布局下的设计诉求！</p><h2 id="容器查询不应该让组件变得复杂化" tabindex="-1"><a class="header-anchor" href="#容器查询不应该让组件变得复杂化" aria-hidden="true">#</a> 容器查询不应该让组件变得复杂化</h2><p>组件是由很多个元素组合在一起构成的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8153b89132914976bcd69b15ffc1f616~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>虽然容器查询特性到来，可以让组件根据其容器尺寸来做出响应，但要记住的是，做出响应变化应该要有一个度。如果过度设计的话，对于 Web 开发人员而言，与其使用容器查询特性来实现 UI 响应，还不如重新构建一个独立的全新组件。</p><p>拿用户信息组件（<code>UserProfile</code>）为例，组件内部结构保持不变，或者至少不会增加新的结构，只需稍加调整，比如调整布局，就可以实现不同的 UI 效果，或者让内部元素显示隐藏切换等。在这种情景之中，采用容器查询特性才能显现其魅力：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e2b70eece7a4e62ae39bcbe92774aa2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card {
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
        &quot;figure  title&quot;
        &quot;figure  description&quot;;
    gap: 0.25rem 1rem;
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 0.5em 0.5em rgb(0 0 0 / 0.125);
    color: #ce0063;
    align-items: center;
    align-content: center;
}
​
figure {
    grid-area: figure;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid currentColor;
    aspect-ratio: 1;
    padding: 4px;
}
​
.card h3 {
    grid-area: title;
    line-height: 1;
    font-size: 1.25rem;
    align-self: end;
}
​
.card p {
    grid-area: description;
    margin: 0;
    font-size: 90%;
    color: #797e8a;
    align-self: start;
}
​
.card ul {
    display: none;
    width: 100%;
    padding-top: 1rem;
    border-top: 3px solid;
}
​
.card svg {
    color: #ce0063;
    font-size: 48px;
}
​
.card__container {
    container-type: inline-size;
}
​
@container (width &gt; 20rem) {
    .card {
        grid-template-columns: auto;
        grid-template-areas:
            &quot;figure&quot;
            &quot;title&quot;
            &quot;description&quot;
            &quot;media&quot;;
        place-items: center;
        text-align: center;
        row-gap: 0.75rem;
    }
​
    figure {
        max-width: 160px;
    }
​
    .card ul {
        display: flex;
        grid-area: media;
        justify-content: space-evenly;
    }
​
    .card h3 {
        font-size: clamp(1.25rem, 2vw + 1.5rem, 1.75rem);
    }
}
​
@container (width &gt; 35rem) {
    .card {
        grid-template-columns: 120px minmax(0, 1fr);
        grid-template-areas:
            &quot;figure   title&quot;
            &quot;figure   description&quot;
            &quot;media    media&quot;;
        text-align: left;
        justify-items: start;
    }
}
​
@container (width &gt; 45rem) {
    .card {
        grid-template-columns: 180px minmax(0, 1fr);
        grid-template-areas:
            &quot;figure  title&quot;
            &quot;figure  description&quot;
            &quot;figure  media&quot;;
    }
  
    .card ul {
        justify-content: start;
        align-self: start;
        gap: 1rem;
    }
​
    .card svg {
        font-size: 24px;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf0a29068fc4cc0bed7bc0f198078a3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,36),ai={href:"https://codepen.io/airen/full/JjBRQvG",target:"_blank",rel:"noopener noreferrer"},ti=l('<p>从侧面来说，这一点和 CSS 媒体查询构建的响应式 Web 设计有相似之处。如果一个 Web 组件在不同的断点情况下需要对多个元素进行隐藏，那么你就需要重新思考，如此设计是否合适。</p><p>我们在构建响应式 Web 页面或组件时，根据屏幕尺寸或容器尺寸选择要隐藏或显示的内容时要谨慎。请不要仅仅因为您无法将内容合理安排在屏幕上就简单地将其隐藏。屏幕尺寸并不能明确指示用户的需求。我们应该根据用户的实际需求出发，做出更为适合的选择。</p><h2 id="媒体查询-vs-容器查询" tabindex="-1"><a class="header-anchor" href="#媒体查询-vs-容器查询" aria-hidden="true">#</a> 媒体查询 vs. 容器查询</h2><p>你在创建响应式 Web，经常会使用 CSS 媒体查询 <code>@media</code> ，根据浏览器视窗尺寸大小来改变 Web 页面布局。将 HTML 元素分组为可重用的组件是很常见的，这些组件根据页面中的可用空间具有特定的布局。可用空间可能不仅取决于浏览器视窗的尺寸大小，还取决于组件出现的上下文。</p><p>容器查询允许我们查看容器的大小，并根据容器的大小而不是浏览器视窗尺寸大小或其他设备特征为内容应用样式。例如，如果容器周围上下文中的空间较小，则可以隐藏某些元素或使用较小的字体。</p><p>简单地说，媒体查询，查询的是浏览器视窗宽度，而容器查询，查询的是组件容器的宽度。这个容器可以是组件的父元素，也可以是其祖先元素。也就是说，如果需要的话，可以在组件顶层容器上进行查询。用下图可以很清晰地阐述媒体查询和容器查询的差异：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13c522ecf5941f6ba53a858d4d495c1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>容器查询和媒体查询两者不是谁替代谁的关系，更应该是两者共存的关系。容器查询特性的出现，我们可以不再局限于视窗断点来调整布局或 UI 样式，还可以基于容器断点来调整布局或 UI 。</p><p>换句话说，<strong>媒体查询是一种宏观的布局（Macro Layout），可以用于整体页面布局；而容器查询可以调整组件的每个元素，创建了一种微观的布局（Micro Layout）</strong> 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfe193296ef94b0090ef618f691ab311~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就拿前面的示例为例。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98b0b34be6d0462291f97e4879a2a4f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>',12),ri={href:"https://codepen.io/airen/full/yLqawaQ",target:"_blank",rel:"noopener noreferrer"},vi=l(`<p>页面级的布局（<code>.header</code> 、<code>.aside</code> 、<code>.main</code> 和 <code>.footer</code>）使用了 CSS 媒体查询 <code>@media</code> 来调整布局：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Mobile */
body {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 1rem;
    grid-template-areas:
        &quot;header&quot;
        &quot;main&quot;
        &quot;aside&quot;
        &quot;footer&quot;;
}

header {
    grid-area: header;
}

main {
    grid-area: main;
}

aside {
    grid-area: aside;
}

footer {
    grid-area: footer;
}

/* Tablet */
@media only screen and (min-width: 768px) {
    body {
        grid-template-columns: 280px minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto;
        grid-template-areas:
            &quot;header header&quot;
            &quot;aside main&quot;
            &quot;footer footer&quot;;
    }
}

/* Desktop */
@media only screen and (min-width: 1024px) {
    body {
        grid-template-columns: 380px minmax(0, 1fr);
    }
}

.grid {
    display: grid;
    gap: 1rem;
}

main .grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 30em), 1fr));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件级（<code>.card</code>）使用了 CSS 容器查询 <code>@container</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto;
    grid-template-rows: min-content auto auto auto minmax(0, 1fr);
    grid-template-areas:
        &quot;thumbnail&quot;
        &quot;badges&quot;
        &quot;title&quot;
        &quot;votes&quot;
        &quot;description&quot;;
    background-color: #fff;
    border-radius: 8px;
    color: #333;
    height: 100%;
}
​
.card figure {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    aspect-ratio: 4 / 3;
}
​
.card figure {
    grid-area: thumbnail;
}
​
.card .badges {
    grid-area: badges;
}
​
.card .title {
    grid-area: title;
}
​
.card .votes {
    grid-area: votes;
}
​
.card .description {
    grid-area: description;
}
​
.badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 1rem;
    gap: 5px;
}
​
.badges li {
    display: inline-flex;
    border: 1px solid currentColor;
    padding: 0.3em 0.5em 0.15em;
    color: var(--c, #e05d26);
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 85%;
    align-items: center;
    justify-content: center;
    line-height: 1;
}
​
.card .title {
    padding: 0 1rem;
    font-size: clamp(1.25em, 2vw + 1.35rem, 1.75em);
}
​
.card .votes {
    padding: 0 1rem;
    display: flex;
    gap: 2px;
    align-items: center;
    color: #e05d26;
}
​
.votes span {
    color: #666;
}
​
.card .description {
    padding: 0 1rem 1rem;
    font-size: 90%;
    line-height: 1.6;
    color: #666;
}
​
.card button {
    -webkit-appearance: button;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 14px 6px 12px;
    border-radius: 4px;
    border: 2px solid currentColor;
    color: #e05d26;
    background: #fff;
    cursor: pointer;
    font-weight: bold;
    gap: 5px;
    transition: all 0.2s linear;
    box-shadow: 0 0 0.2em 0.2em rgb(0 0 0 / 15%);
}
​
.card button:hover {
    opacity: 0.8;
}
​
.card button:focus {
    outline-offset: 2px;
}
​
.card button {
    grid-area: thumbnail;
    justify-self: end;
    align-self: start;
    margin-top: 1rem;
    margin-right: 1rem;
}
​
.card .lists {
    display: none;
}
​
/* Container Queries Layout*/
.card__container {
    container-type: inline-size;
}
​
/* .card__container 宽度大于 650px */
@container (inline-size &gt; 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            &quot;thumbnail  .&quot;
            &quot;thumbnail  badges&quot;
            &quot;thumbnail  title&quot;
            &quot;thumbnail  votes&quot;
            &quot;thumbnail  description&quot;
            &quot;thumbnail  button&quot;
            &quot;thumbnail  .&quot;;
        column-gap: 1.5rem;
    }
​
    .card button {
        grid-area: button;
        justify-self: start;
        align-self: center;
        margin: 0;
    }
​
    .card figure {
        border-radius: 8px 0 0 8px;
        aspect-ratio: 1;
    }
​
    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0 1rem 0 0;
    }
}
​
/* .card__container 宽度大于 820px */
​
@container (inline-size &gt; 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
            &quot;thumbnail  .            .&quot;
            &quot;thumbnail  badges       lists&quot;
            &quot;thumbnail  title        lists&quot;
            &quot;thumbnail  votes        lists&quot;
            &quot;thumbnail  description  lists&quot;
            &quot;thumbnail  button       lists&quot;
            &quot;thumbnail  .            .&quot;;
    }
​
    .card .lists {
        display: flex;
        flex-direction: column;
        padding-right: 1rem;
        grid-area: lists;
        gap: 0.5rem;
    }
​
    .lists dt {
        font-size: 1rem;
    }
​
    .lists dd {
        font-size: 85%;
        color: #666;
    }
​
    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0;
    }
​
    .card figure {
        aspect-ratio: 4 / 3;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容器查询可用于哪些场景" tabindex="-1"><a class="header-anchor" href="#容器查询可用于哪些场景" aria-hidden="true">#</a> 容器查询可用于哪些场景？</h2><p>现在我们对容器查询有了一定的认识，接下来，我们来看看实际业务中，在哪些场景下使用 CSS 容器查询可以帮助我们快速构建，提高组件扩展性。</p><h3 id="搜索表单" tabindex="-1"><a class="header-anchor" href="#搜索表单" aria-hidden="true">#</a> 搜索表单</h3><p>搜索表单在一些业务场景很常见，它会根据容器的宽度有不同的状态，这样的搜索组件就非常适用于 CSS 容器查询：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9fd1c66aeae405d91266d8a8829ce99~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>构建这个搜索表单，可能需要一个这样的 HTML 结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;form__container&quot;&gt;
    &lt;form class=&quot;form&quot;&gt;
        &lt;svg t=&quot;1638370815485&quot; class=&quot;icon--search&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;3749&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
            &lt;path d=&quot;M874.798784 719.859059a456.211411 456.211411 0 1 0-152.8584 136.311873V659.976387l-8.667229 10.243088a293.897852 293.897852 0 1 1 48.063724-66.186111v228.499671l191.466965 191.466965V800.227909z&quot; p-id=&quot;3750&quot;&gt;&lt;/path&gt;
        &lt;/svg&gt;
        &lt;input type=&quot;search&quot; placeholder=&quot;皮裤女短裤真皮&quot; name=&quot;search&quot; class=&quot;search&quot; /&gt;
        &lt;svg t=&quot;1638370901048&quot; class=&quot;icon--camera&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;6029&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
            &lt;path d=&quot;M846.933333 238.933333h-140.8L646.4 149.333333c-6.4-10.666667-17.066667-17.066667-29.866667-17.066666h-209.066666c-12.8 0-23.466667 6.4-29.866667 17.066666l-59.733333 89.6H177.066667c-57.6 0-106.666667 46.933333-106.666667 106.666667v426.666667c0 57.6 46.933333 106.666667 106.666667 106.666666h672c57.6 0 106.666667-46.933333 106.666666-106.666666v-426.666667c-2.133333-59.733333-49.066667-106.666667-108.8-106.666667z m34.133334 533.333334c0 19.2-14.933333 34.133333-34.133334 34.133333H177.066667c-19.2 0-34.133333-14.933333-34.133334-34.133333v-426.666667c0-19.2 14.933333-34.133333 34.133334-34.133333h160c12.8 0 23.466667-6.4 29.866666-17.066667L426.666667 206.933333h170.666666l59.733334 89.6c6.4 10.666667 17.066667 17.066667 29.866666 17.066667h160c19.2 0 34.133333 14.933333 34.133334 34.133333v424.533334z&quot; p-id=&quot;6030&quot;&gt;&lt;/path&gt;
            &lt;path d=&quot;M512 364.8c-96 0-174.933333 78.933333-174.933333 174.933333 0 96 78.933333 174.933333 174.933333 174.933334 96 0 174.933333-78.933333 174.933333-174.933334 0-96-78.933333-174.933333-174.933333-174.933333z m0 279.466667c-57.6 0-104.533333-46.933333-104.533333-104.533334s46.933333-104.533333 104.533333-104.533333 104.533333 46.933333 104.533333 104.533333-46.933333 104.533333-104.533333 104.533334z&quot; p-id=&quot;6031&quot;&gt;&lt;/path&gt;
        &lt;/svg&gt;
        &lt;button class=&quot;button&quot;&gt;搜索&lt;/button&gt;
    &lt;/form&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 CSS 容器查询来完成所需要的搜索表单功能：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.form__container {
    container-type: inline-size;
}
​
.form {
    display: grid;
    font-size: 46px;
    border: 4px solid #ff5b0a;
    background-color: #fff;
    border-radius: 10rem;
    padding: 10px;
    align-items: center;
}
​
.icon--search,
.icon--camera {
    width: 1em;
    height: 1em;
    display: none;
}
​
.search {
    display: none;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    padding: 0 5px;
    border: none;
}
​
.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 88px;
    border: none 0;
    background-image: linear-gradient(90deg, #ff9602 0%, #ff5b0a 100%);
    border-radius: 10rem;
    color: #fff;
    font-size: 46px;
    font-weight: 700;
}
​
​
@container (width &gt; 480px) {
    ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #000;
    }
    
    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #000;
    }
    
    ::-ms-input-placeholder {
        /* IE 10+ */
        color: #000;
    }
    
    ::-moz-placeholder {
        /* Firefox 18- */
        color: #000;
    }
    
    .form {
        grid-template-columns: min-content 1fr 200px;
        grid-template-areas: &quot;searchIcon searchInput button&quot;;
        grid-template-rows: 88px;
        gap: 10px;
    }
​
    .icon--search {
        display: block;
        grid-area: searchIcon;
     }
​
    .search {
        grid-area: searchInput;
        display: flex;
        font-weight: 700;
    }
​
    .button {
        grid-area: button;
    }
}
​
@container (width &gt; 768px) {
    ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #b4b4b4;
    }
    
    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #b4b4b4;
    }
    
   ::-ms-input-placeholder {
        /* IE 10+ */
        color: #b4b4b4;
   }
   
    ::-moz-placeholder {
        /* Firefox 18- */
        color: #b4b4b4;
    }
    
    .form {
        grid-template-columns: min-content 1fr min-content 200px;
        grid-template-areas: &quot;searchIcon searchInput cameraIcon button&quot;;
        grid-template-rows: 88px;
        gap: 10px;
    }
    
    .icon--search {
        fill: #b4b4b4;
    }
    
    .search {
        color: #b4b4b4;
        font-weight: 400;
    }
    
    .icon--camera {
        display: block;
        grid-area: cameraIcon;
        fill: #b4b4b4;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你将看到的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b86a704901a4540bf082911fa7dc1b7~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,15),ci={href:"https://codepen.io/airen/full/xxJgaEZ",target:"_blank",rel:"noopener noreferrer"},ui=l(`<h3 id="导航栏" tabindex="-1"><a class="header-anchor" href="#导航栏" aria-hidden="true">#</a> 导航栏</h3><p>Web 页面导航栏是常见的一个组件，在宽屏和窄屏的时候，它会向用户呈现不同的 UI 效果，如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377da24573e94e7fad69e14c4a3bda2e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>就拿我自己的博客（<a href="www.w3cplus.com">www.w3cplus.com</a>）航栏为例吧。它也有类似的效果，只不过是使用 CSS 媒体查询实现的，现在我们使用 CSS 容器查询来实现：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1994924745e64cd18a4f2c29eaad28bd~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>具体代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;browser&quot;&gt;
    &lt;div class=&quot;browser__header&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;div class=&quot;browser__body&quot;&gt;
        &lt;div class=&quot;header&quot;&gt;
            &lt;h1 class=&quot;logo&quot;&gt;&lt;a href=&quot;https://www.w3cplus.com&quot;&gt;&lt;img src=&quot;https://www.w3cplus.com/sites/all/themes/w3cplusV2/images/logo.png&quot; alt=&quot;W3cplus&quot;&gt;&lt;/a&gt;&lt;/h1&gt;
            &lt;nav class=&quot;menu&quot;&gt;
                &lt;ul&gt;
                    &lt;li&gt;&lt;a href=&quot;https://www.w3cplus.com/blog/tags/686.html&quot;&gt;会员专栏&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;https://www.w3cplus.com/CSS3&quot;&gt;CSS&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;https://www.w3cplus.com/JavaScript&quot;&gt;JavaScript&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;https://www.w3cplus.com/mobile&quot;&gt;Mobile&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;https://www.w3cplus.com/svg-tutorial&quot;&gt;SVG&lt;/a&gt;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/nav&gt;
            &lt;div class=&quot;menu__icon&quot;&gt;
                &lt;span&gt;menu&lt;/span&gt;
                &lt;svg t=&quot;1638455499563&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;6454&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                    &lt;path d=&quot;M170.666667 213.333333m64 0l554.666666 0q64 0 64 64l0 0q0 64-64 64l-554.666666 0q-64 0-64-64l0 0q0-64 64-64Z&quot; fill=&quot;currentColor&quot; p-id=&quot;6455&quot;&gt;&lt;/path&gt;
                    &lt;path d=&quot;M234.666667 640h554.666666a64 64 0 0 1 0 128h-554.666666a64 64 0 0 1 0-128z m0-213.333333h554.666666a64 64 0 0 1 0 128h-554.666666a64 64 0 0 1 0-128z&quot; fill=&quot;currentColor&quot; p-id=&quot;6456&quot;&gt;&lt;/path&gt;
                &lt;/svg&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e4cb8166a3423182bfaa0ed2fc65ec~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,8),oi={href:"https://codepen.io/airen/full/OJwWovo",target:"_blank",rel:"noopener noreferrer"},mi=l(`<h3 id="分页器" tabindex="-1"><a class="header-anchor" href="#分页器" aria-hidden="true">#</a> 分页器</h3><p>分页器组件（<code>Pagination</code>）类似于导航栏，也很适合于使用容器查询：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ee84e06935c45e5a3b6f1313a5e6136~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;nav class=&quot;pagination__container&quot;&gt;
    &lt;ul class=&quot;pagination&quot;&gt;
        &lt;li class=&quot;prev&quot;&gt;
            &lt;a href=&quot;#&quot;&gt;
                &lt;svg t=&quot;1638460279078&quot; class=&quot;icon icon__prev&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;10124&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                    &lt;path d=&quot;M701.41952 852.35712a47.18592 47.18592 0 0 1-57.344-4.11648L333.9264 571.53536a79.60576 79.60576 0 0 1 0-119.05024L644.05504 175.73888a47.18592 47.18592 0 0 1 58.83904-3.072c15.29856 11.30496 18.45248 32.768 7.04512 47.9232l-192.14336 255.488a59.65824 59.65824 0 0 0 0 71.80288l192.14336 255.488 1.06496 1.47456a34.05824 34.05824 0 0 1-9.58464 47.49312z&quot; p-id=&quot;10125&quot; fill=&quot;currentColor&quot;&gt;&lt;/path&gt;
                &lt;/svg&gt;
            &lt;/a&gt;
        &lt;/li&gt;
        &lt;li class=&quot;first&quot;&gt;
            &lt;a href=&quot;#&quot;&gt;1&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class=&quot;more&quot;&gt;
            &lt;span&gt;
                &lt;svg t=&quot;1638534255503&quot; class=&quot;icon icon__more&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;2311&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                    &lt;path d=&quot;M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608z&quot; p-id=&quot;2312&quot;&gt;&lt;/path&gt;
                    &lt;path d=&quot;M512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608z&quot; p-id=&quot;2313&quot;&gt;&lt;/path&gt;
                    &lt;path d=&quot;M800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z&quot; p-id=&quot;2314&quot; fill=&quot;currentColor&quot;&gt;&lt;/path&gt;
                &lt;/svg&gt;
            &lt;/span&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;3&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;4&lt;/a&gt;&lt;/li&gt;
        &lt;li class=&quot;active&quot;&gt;&lt;span&gt;5&lt;/span&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;6&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;7&lt;/a&gt;&lt;/li&gt;
        &lt;li class=&quot;more&quot;&gt;
            &lt;span&gt;
                &lt;svg t=&quot;1638534255503&quot; class=&quot;icon icon__more&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;2311&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                    &lt;path d=&quot;M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608z&quot; p-id=&quot;2312&quot;&gt;&lt;/path&gt;
                    &lt;path d=&quot;M512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608z&quot; p-id=&quot;2313&quot;&gt;&lt;/path&gt;
                    &lt;path d=&quot;M800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z&quot; p-id=&quot;2314&quot; fill=&quot;currentColor&quot;&gt;&lt;/path&gt;
                &lt;/svg&gt;
            &lt;/span&gt;
        &lt;/li&gt;
        &lt;li class=&quot;last&quot;&gt;&lt;a href=&quot;#&quot;&gt;10&lt;/a&gt;&lt;/li&gt;
        &lt;li class=&quot;next&quot;&gt;
            &lt;a href=&quot;#&quot;&gt;
                &lt;svg t=&quot;1638460301528&quot; class=&quot;icon icon__next&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;12204&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;
                    &lt;path d=&quot;M322.58048 852.35712a34.05824 34.05824 0 0 1-8.51968-48.9472l192.14336-255.50848a59.65824 59.65824 0 0 0 0-71.80288l-192.14336-255.488a34.03776 34.03776 0 0 1 8.51968-48.9472 47.18592 47.18592 0 0 1 57.344 4.096l310.12864 276.70528a79.60576 79.60576 0 0 1 0 119.07072l-310.10816 276.6848a47.18592 47.18592 0 0 1-57.344 4.13696z&quot; p-id=&quot;12205&quot; fill=&quot;currentColor&quot;&gt;&lt;/path&gt;
                &lt;/svg&gt;
            &lt;/a&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
.pagination {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 4px solid #dedbdb;
    padding: 14px 24px;
    border-radius: 10rem;
}
​
.pagination li {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
​
.pagination li:not(.prev):not(.next) a,
.pagination li span {
    display: inline-flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #dedbdb;
    text-decoration: none;
    color: #231f1f;
    font-size: 22px;
    transition: all 0.2s ease;
}
​
.pagination li:not(.prev):not(.next) a:hover {
    background-color: #008fff;
    color: #fff;
}
​
.pagination .active span {
    background-color: #008fff;
    color: #fff;
}
​
.pagination .prev a,
.pagination .next a {
    font-size: 40px;
    color: #dedbdb;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
​
.pagination .prev a {
    padding-right: 24px;
}
​
.pagination .next a {
    padding-left: 24px;
}
​
.pagination .prev a::before,
.pagination .next a::before {
    content: &quot;&quot;;
    position: absolute;
    top: -18px;
    bottom: -20px;
    width: 4px;
    background-color: currentColor;
}
​
.pagination .prev a::before {
    right: 0;
}
​
.pagination .next a::before {
    left: 0;
}
​
.pagination .prev a:hover,
.pagination .next a:hover {
    color: #008fff;
}
​
.pagination .prev a:hover::before,
.pagination .next a:hover::before {
    color: #dedbdb;
}
​
.pagination li:not(.prev):not(.next) a,
.pagination li:not(.active) span {
    display: none;
}
​
.pagination__container {
    container-type: inline-size;
}
​
@container (width &gt; 540px) {
    .pagination li.first a,
    .pagination li.last a,
    .pagination li.more span {
        display: inline-flex !important;
    }
}
​
@container (width &gt; 768px) {
    .pagination li a,
    .pagination li span {
         display: inline-flex !important;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaef1633c72d4cc7a0b0b94b64b53548~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),bi={href:"https://codepen.io/airen/full/VwBPGEr",target:"_blank",rel:"noopener noreferrer"},pi=l(`<h3 id="侧边栏" tabindex="-1"><a class="header-anchor" href="#侧边栏" aria-hidden="true">#</a> 侧边栏</h3><p>在一些 Web 应用的侧边栏（比如 Gitlab 的侧边栏、Facebook 聊天界面，其实 Web 版本的微信群也有点类似于 Facebook 聊天室）像下图这样的模式：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a91bcb7022ee474791ff40c7a4aa77f5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>像上图这样的效果，我们可以使用 CSS 容器查询来实现。当有足够的空间时，侧边栏的列表会展开，如果没有足够空间时，侧边栏只会展示 Icon 图标（或用户头像）。我们来实现一个像下图的布局效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f32211f443d64fb6ae129e7fdb2f88bc~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;wrapper&quot;&gt;
    &lt;aside&gt;
        &lt;h1 class=&quot;logo&quot;&gt;
            &lt;svg width=&quot;36px&quot; height=&quot;36px&quot; viewBox=&quot;0 0 210 210&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; id=&quot;tanuki-logo&quot;&gt;&lt;/svg&gt;
            &lt;span&gt;GitLab&lt;/span&gt;
        &lt;/h1&gt;
        &lt;nav class=&quot;menu&quot;&gt;
            &lt;ul&gt;
                &lt;li&gt;
                    &lt;a href=&quot;#&quot;&gt;
                        &lt;svg t=&quot;1638543010000&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;2303&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;&lt;/svg&gt;
                        &lt;span&gt;Home&lt;/span&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;!-- 省略其他 li --&gt;
            &lt;/ul&gt;
        &lt;/nav&gt;
        &lt;div class=&quot;profile&quot;&gt;
            &lt;img src=&quot;https://www.w3cplus.com/sites/all/themes/w3cplusV2/images/logo.png&quot; alt=&quot;&quot;&gt;
            &lt;span&gt;w3cplus&lt;/span&gt;
        &lt;/div&gt;
    &lt;/aside&gt;
    &lt;main&gt;
        &lt;div class=&quot;card&quot;&gt;
            &lt;img src=&quot;https://picsum.photos/2568/600?random=1&quot; width=&quot;2568&quot; height=&quot;600&quot; alt=&quot;&quot; class=&quot;card__thumbnail&quot; /&gt;
            &lt;div class=&quot;card__badge&quot;&gt;Must Try&lt;/div&gt;
            &lt;h3 class=&quot;card__title&quot;&gt;Best Brownies in Town&lt;/h3&gt;
            &lt;p class=&quot;card__describe&quot;&gt;High quality ingredients and best in-class chef. Light, tender, and easy to make~&lt;/p&gt;
            &lt;button class=&quot;card__button&quot;&gt;Order now&lt;/button&gt;
       &lt;/div&gt;
       &lt;!-- 省略其他 card --&gt;
    &lt;/main&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键的 CSS 代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    width: 100vw;
}
​
aside {
    display: grid;
    grid-template-rows: min-content auto min-content;
}
​
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}
​
.menu a {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
}
​
.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
​
main {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    align-items: start;
    align-content: start;
}
​
.card {
    display: grid;
    gap: 10px;
}
​
.card__thumbnail {
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    border-radius: 24px 24px 0 0;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 1;
}
​
.card__badge {
    grid-area: 1 / 1 / 2 / 2;
    z-index: 2;
    align-self: start;
    justify-self: start;
}
​
.card__button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    justify-self: end;
}
​
aside {
    container-type: inline-size;
    min-width: 100px;
}
​
.wrapper {
    container-type: inline-size;
}
​
@container (width &lt; 200px) {
    .logo span,
    .menu span,
    .profile span {
        display: none;
    }
​
    .menu a {
        gap: 0;
        justify-content: center;
    }
}
​
@container (width &gt; 760px) and (width &lt; 1024px) {
    main {
        grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    }
    
    .card {
        grid-template-columns: 240px auto;
        grid-template-rows: min-content min-content auto;
        grid-template-areas:
            &quot;thumbnail title&quot;
            &quot;thumbnail describe&quot;
            &quot;thumbnail button&quot;;
        gap: 0;
    }
​
    .card__thumbnail {
        grid-area: thumbnail;
        aspect-ratio: 1 / 1;
        z-index: 1;
    }
​
    .card__badge {
        grid-area: thumbnail;
        z-index: 2;
        display: flex;
    }
    
    .card__describe {
        grid-area: describe;
        align-self: start;
        display: flex;
        margin-top: -24px;
    }
​
    .card__title {
        grid-area: title;
        margin-top: 20px;
        align-self: start;
    }
​
    .card__button {
        grid-area: button;
        align-self: end;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/445f2685103a4a02a4dda5fc50756b1d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,9),gi={href:"https://codepen.io/airen/full/KKBaroo",target:"_blank",rel:"noopener noreferrer"},qi=l(`<h2 id="其他容器尺寸大小的查询" tabindex="-1"><a class="header-anchor" href="#其他容器尺寸大小的查询" aria-hidden="true">#</a> 其他容器尺寸大小的查询</h2><p>我们平时看到的关于容器查询的案例大多数都是查询宽度（<code>width</code>）、最大宽度（<code>max-width</code>）和最小宽度（<code>min-width</code>）、高度（<code>height</code>）、块大小（<code>block-size</code>）和内联尺寸（<code>inline-size</code>）等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container {
    container: info-card / inline-size;
}
​
@container info-card (width &lt; 500px) { 
    .card { 
        flex-direction: column; 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),hi=i("code",null,"aspect-ratio",-1),fi=i("code",null,"orientation",-1),xi={href:"https://developer.mozilla.org/en-US/docs/Web/CSS/@container#descriptors",target:"_blank",rel:"noopener noreferrer"},_i=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* CSS 媒体查询 */
@media screen (orientation: landscape) { 
    .card { 
        /* CSS ... */ 
    } 
} 
​
/* CSS 容器查询 */
@container info-card (orientation: landscape) { 
    .card { 
        /* CSS ... */ 
    } 
}
​
@container info-card (aspect-ratio: 3/2) { 
    .card {
        /* CSS ... */
    }
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如下面这个示例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70e70650a1b44224b56b3564d2557735~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,3),wi={href:"https://codepen.io/airen/full/NWBpRYE",target:"_blank",rel:"noopener noreferrer"},yi=l(`<p>关键代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container {
    container-type: size;
    container-name: info-card;
}
​
.card {
    display: grid;
    grid-template-columns: .3fr minmax(0, 1fr);
    gap: clamp(.25rem, 5cqw + .5rem, 1.25rem) clamp(1rem, 5cqh + 1rem, 1.5rem);
    grid-template-rows: min-content minmax(0, 1fr);
    grid-template-areas: 
        &quot;figure  title&quot;
        &quot;figure  des&quot;;
    border-radius: clamp(2px, 3cqw + 2px, 8px);
}
​
.card figure {
    grid-area: figure;
    border-radius: clamp(2px, 3cqw + 2px, 8px) 0 0 clamp(2px, 3cqw + 2px, 8px);
}
​
.card h3 {
    grid-area: title;
    margin-top: 1rem;
    padding-right: 1rem;
    font-size: clamp(1.25rem, 9cqi + 1.25rem, 1.5rem);
}
​
.card p {
    grid-area: des;
    padding: 0 1rem 1rem 0;
}
​
@container info-card (max-aspect-ratio: 3/2) {
    .card {
        grid-template-columns: auto;
        grid-template-rows: auto min-content minmax(0, 1fr);
        grid-template-areas: 
            &quot;figure&quot;
            &quot;title&quot;
            &quot;des&quot;;
    }
  
    .card figure {
        border-radius: clamp(2px, 3cqw + 2px, 8px) clamp(2px, 3cqw + 2px, 8px) 0 0;
    }
  
    .card h3 {
        margin-top: 0;
        padding:  0 1rem;
    }
  
    .card p {
        padding: 0 1rem 1rem;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>甚至有一天，CSS 容器查询和 CSS 媒体查询一样，除了能查询上面提到的之外，也可以像 CSS 媒体查询一样，查询用户的偏好设置等！</p></blockquote><h2 id="容器查询单位" tabindex="-1"><a class="header-anchor" href="#容器查询单位" aria-hidden="true">#</a> 容器查询单位</h2><p>你知道吗？随着容器查询的出现，CSS 值单位也新增了<strong>容器查询单位</strong>。它的工作原理和视窗单位，比如 <code>vw</code> 、<code>vh</code> 、<code>vmin</code> 、<code>vmax</code> 等非常相似。不同的是，<strong>视窗单位是相对于浏览器视窗尺寸计算；容器查询单位是相对于查询容器尺寸计算</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ac1159cf2f44ee7952242d709c23213~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li><code>1cqw</code> 等于查询容器宽度（<code>width</code>）的 <code>1%</code>；</li><li><code>1cqh</code> 等于查询容器高度（<code>height</code>）的 <code>1%</code>；</li><li><code>1cqi</code> 等于查询容器内联大小（<code>inline-size</code>）的 <code>1%</code>；</li><li><code>1cqb</code> 等于查询容器块大小（<code>block-size</code>）的 <code>1%</code>；</li><li><code>1cqmin</code> 等于 <code>1cqi</code> 或 <code>1cqb</code> 中较小的一个值；</li><li><code>1cqmax</code> 等于 <code>1cqi</code> 或 <code>1cqb</code> 中较大的一个值。</li></ul><p>容器查询单位出现之后，可以帮助我们在处理组件内元素样式，比如 <code>font-size</code>、 <code>padding</code> 和 <code>margin</code> 等，节省很多的精力和时间。例如，我们可以使用容器查询单位代替手动增加字体大小。</p><p>容器查询单位还没有的时候，我们一般会像下面这样改写卡片组件标题的 <code>font-size</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__title {
    font-size: 1rem;
}
​
/* 容器宽度大于 400px */
@container (width &gt; 400px) {
    .card__title {
        font-size: 1.15rem;
    }
}
​
/* 容器宽度大于 600px */
@container (width &gt; 600px) {
    .card__title {
        font-size: 1.25rem;
    }
}
​
/* 容器宽度大于 800px */
@container (width &gt; 800px){
    .card__title {
        font-size: 2rem;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了容器查询单位之后，同样是给卡片组件标题设置 <code>font-size</code> ，只需要一行代码即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__title {
    font-size: clamp(1rem, 3cqw, 2rem);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们也可以像前面课程中介绍 <code>vw</code> 设置 <code>font-size</code> 的方法一样，使用容器查询单位来给卡片组件标题设置<code>font-size</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* 视窗单位设置 font-size */
.card__title {
    font-size: clamp(1.2rem, 5vw + 1rem, 3rem);
}
​
/* 容器查询单位设置 font-size */
.card__title {
    font-size: clamp(1.2rem, 5cqi + 1rem, 3rem);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c118fabbe2405e80d87c753319a99a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>注意，早期的容器查询单位原型是 <code>q*</code> 而不是现在的 <code>cq*</code> ，所以可能会在早期的一些容器查询单位的 Demo 中看到类似 <code>qw</code> 、<code>qh</code> 单位，而且很有可能不能正常运行。</p></blockquote>`,16),ki={href:"https://codepen.io/scottkellum",target:"_blank",rel:"noopener noreferrer"},zi={href:"https://codepen.io/scottkellum/full/jOwmOZE",target:"_blank",rel:"noopener noreferrer"},Si=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cab59d7f46124dd6b829331e90bff594~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),ji={href:"https://codepen.io/airen/full/rNryMVg",target:"_blank",rel:"noopener noreferrer"},Ci=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>html {
    font-size: min( 120%, 5vw);
    line-height: 1.25;
}
​
html,
main,
article {
  container-type: inline-size;
}
​
/* 容器查询单位*/
h1,
.product-price {
    font-size: max(1.25rem, 12cqi - 1rem);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例展示的都是容器查询单位运用于 <code>font-size</code> 的属性上，其实容器查询单位和其他长度（<code>&lt;length&gt;</code>）类似，只要是可以接受 <code>&lt;length&gt;</code> 值的 CSS 属性都可以使用容器查询单位，比如我们熟悉的 <code>font-size</code> 、<code>margin</code> 、<code>padding</code> 、<code>border-width</code> 、<code>background-size</code> 、<code>inset</code> 以及 <code>gap</code> 等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card-grid {
    container-type: inline-size;
    container-name: card-grid;
}
​
.card-grid__inner {
    --cols: 4;
    display: grid;
    gap: 2cqw;
    grid-template-columns: repeat(var(--cols), 1fr);
}
​
@container card-grid (width &lt; 900px) {
    .card-grid__inner {
        --cols: 3;
        gap: 3cqw;
    }
}
​
@container card-grid (width &lt; 600px) {
    .card-grid__inner {
        --cols: 2;
        gap: 4cqw;
    }
}
​
.card {
    container-type: size;
    container-name: card;
}
​
.card__inner {
    font-size: 5cqw;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容器查询的未来-样式查询" tabindex="-1"><a class="header-anchor" href="#容器查询的未来-样式查询" aria-hidden="true">#</a> 容器查询的未来：样式查询</h2><p>你现在知道容器查询是怎么一回事了，但我想你可能还没听说过，在 CSS 中除了媒体查询、容器查询之外，现在又新增了一个 <strong>样式查询（Style Queries）</strong> 。</p>`,5),Wi={href:"https://drafts.csswg.org/css-contain-3/",target:"_blank",rel:"noopener noreferrer"},Li=i("p",null,[n("就在最近，Chrome 团队发布了对"),i("strong",null,"样式查询"),n("的实验性支持。简而言之，"),i("strong",null,"样式查询允许我们查询容器的 CSS 属性或 CSS 自定义属性（CSS 变量）"),n(" 。")],-1),Mi={href:"https://www.google.com/intl/en_sg/chrome/canary/",target:"_blank",rel:"noopener noreferrer"},Bi=i("code",null,"chrome://flags",-1),Ii=i("code",null,"Enabled",-1),Di=l(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47a836af66f546ca94e5b2cee223864a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这样你就可以使用样式查询：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@container style(border-color: lightblue) {
    button {
        border-color: lightblue;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),Ti={href:"https://groups.google.com/a/chromium.org/g/blink-dev/c/ACL23q_nbK0/m/PaNJ81_qDAAJ?pli=1",target:"_blank",rel:"noopener noreferrer"},Ui=l(`<p>现在，我们可以检查变量 <code>——boxed: true</code> 是否被添加到容器中，如果是，则可以基于此更改子元素的样式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container {
    --boxed: true;
}
​
@container style(--boxed: true) {
    .card {
        /* CSS ... */
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请看下图。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20d623b746c742deba944b0dbdcca01c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>请注意，容器查询和样式查询的主要区别在于，<strong>容器查询用于查询容器尺寸大小，样式查询用于查询容器样式</strong> 。你可能会感到好奇，既然可以查询容器尺寸大小了，为什么还需要查询容器样式呢？</p><p>其实，在容器查询中，查询容器尺寸大小，允许我们根据组件的父容器（或祖先容器）的尺寸来控制组件样式，这非常有用。只不过，在某些情况下，我们可能不需要去查询容器尺寸大小，相反的是，我们想要查询容器的计算样式。那么，在这种情况之下，样式查询就会很有用处。</p><p>还是拿卡片组件 <code>Card</code> 为例吧：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3df7e48361e489ebb91680fc9e78453~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我们知道，使用容器查询可以很容易实现上图所示的效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;card__container&quot;&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;figure&gt;
            &lt;img src=&quot;&quot; alt=&quot;&quot; /&gt;
        &lt;/figure&gt;
        &lt;h3&gt;Card Ttitle &lt;/h3&gt;
        &lt;p&gt;Card Description&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键 CSS 代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card {
    display: grid;
    grid-template-rows: 300px min-content minmax(0, 1fr);
    grid-template-areas: 
        &quot;thumbnail&quot;
        &quot;title&quot;
        &quot;description&quot;;
    gap: 2cqh;
}
​
.card figure {
    grid-area: thumbnail;
}
​
.card h3 {
    grid-area: title;
}
​
.card p {
    grid-area: description;
}
​
.card figure {
    border-radius: 6px 6px 0 0;
    overflow: hidden;
}
​
.card &gt; *:not(figure) {
    padding: 0 1rem;
}
​
.card h3 {
    font-size: clamp(1.25rem, 3cqw + 1.25rem, 1.5rem);
    font-weight: 900;
}
​
.card p {
    font-size: 95%;
    color: #999;
    padding-bottom: 1rem;
}
​
/* 容器查询 */
.card__container{
    container-type: inline-size;
}
​
@container (width &gt; 400px) {
    .card {
        grid-template-columns: .4fr minmax(0, 1fr) 1rem;
        grid-template-rows: 1rem min-content minmax(0, 1fr) 1rem;
        grid-template-areas:
            &quot;thumbnail    .            .&quot;
            &quot;thumbnail    title        .&quot;
            &quot;thumbnail    description  .&quot;
            &quot;thumbnail    .            .&quot;;
        gap: .25rem 1rem;
    }
  
    .card figure {
        border-radius: 6px 0 0 6px;
    }
  
    .card &gt; *:not(figure) {
        padding: 0;
    }
}
​
@container (width &gt; 768px) {
    .card {
        grid-template-columns: auto;
        grid-template-rows: min-content  auto auto min-content;
        grid-template-areas:
            &quot;.&quot;
            &quot;title&quot;
            &quot;description&quot;
            &quot;.&quot;;
    }
  
    .card figure {
        grid-area: 1 / 1 / -1 / -1;
        max-height: 380px;
        border-radius: 0;
        position: relative;
    }
  
    .card figure::after {
        content: &quot;&quot;;
        background: darkorchid;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
        mix-blend-mode: screen;
   }
  
  
    .card &gt; *:not(figure) {
        place-self: center;
        z-index: 2;
        text-shadow: 1px 0px 1px rgb(0 0 0 / 25%);
        text-align: center;
    }
}
​
/* Page Layout */
.featured {
    display: grid;
    padding: 1rem;
}
​
.featured .card__container {
    grid-area: 1 / 1 / -1 / -1; 
}
​
.card--lists {
    display: grid;
    gap: 4cqw;
    padding: 1rem;
}
​
/* 媒体查询 */
@media only screen and (min-width: 768px) {
    .card--lists {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 3cqw;
    }
}
​
@media only screen and (min-width: 1024px) {
    .card--lists {
        grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 420px), 1fr));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/629754c9cf3d423a93a2ead0e710d2b4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,13),Ri={href:"https://codepen.io/airen/full/LYBWWWZ",target:"_blank",rel:"noopener noreferrer"},Gi=l(`<p>我们在上面的示例基础上加入样式查询，比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container{
    container-type: inline-size;
    --horizontal: true;
    --featured: true;
}
​
@container (width &gt; 400px) and style(--horizontal:true) {
    /* Horizontal Style */
}
​
@container (width &gt; 768px) and style(--featured: true) {
    /* Featured Style */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>卡片组件同时查询了容器尺寸大小和容器样式：</p><ul><li>容器宽度大于 <code>400px</code> ，并且容器中的 <code>--horizontal</code> 为 <code>true</code> 时，卡片组件会有水平排列的样式；</li><li>容器宽度大于 <code>768px</code> ，并且容器中的 <code>--featured</code> 为 <code>true</code> 时，卡片组件会有 Featured 样式网格。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad77b85ce7244589967b9cff405f842~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,5),Hi={href:"https://codepen.io/airen/full/JjBWNPN",target:"_blank",rel:"noopener noreferrer"},Ni=l(`<p>如果你在 <code>.card__container</code> 中将 <code>--featured</code> 设置为 <code>false</code> ，你会发现卡片组件的 Featured 效果永远不会呈现，即使容器宽度大于 <code>768px</code> 也是如此：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container{
    container-type: inline-size;
    --horizontal: true;
    --featured: false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b00300e84bba4508becaaad804280b50~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>上面示例是容器查询和样式查询组合在一起的。你可能还没有体会到样式查询所起的作用。那我们来看两个纯样式查询的示例。比如下图这个布局效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a313b06ad07f45a387f0ec4aace10310~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;avatars__container&quot;&gt;
    &lt;ul class=&quot;avatars&quot;&gt;
        &lt;li class=&quot;avatar&quot;&gt;&lt;img src=&quot;&quot; alt=&quot;&quot; /&gt;&lt;/li&gt;
        &lt;!-- 省略其他 li --&gt;
    &lt;/ul&gt;
&lt;/div&gt;
.avatars__container {
  container-name: avatar;
}
​
.avatars {
    display: flex;
    flex-wrap: wrap;
}
​
/* Default Style */
@container avatar style(--appearance: default) {
    .avatars {
        gap: 1cqw;
        justify-content: space-evenly;
    }
  
    .avatar {
        --size: 3.5rem;
    }
}
​
/* Stack Style */
@container avatar style(--appearance: stack) {
    .avatar {
        --size: 4.25rem;
        border: 4px solid #fff;
        padding: .2rem;
    }
  
    .avatar + .avatar {
        margin-inline-start: -1rem;
    }
}
​
/* Grid Style */
@container avatar style(--appearance: grid) {
    .avatars {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
        gap: 5cqw;
    }
  
     .avatar {
         --size: 100%;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebe6ef39a73d473281bb306eda6661d0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,7),Pi={href:"https://codepen.io/airen/full/abjJWeK",target:"_blank",rel:"noopener noreferrer"},Vi=i("p",null,"你可能从上面的示例中体验出样式查询所起的作用了。其实它用于主题切换（比如暗黑模式）、多语言 Web 网站等，会起更大的作用。比如下面这个卡片组件：",-1),Ai=i("p",null,[i("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b92927579bc7436e9b929903d01eb4c4~tplv-k3u1fbpfcp-zoom-1.image",alt:"img"})],-1),Qi={href:"https://codepen.io/airen/full/bGjqRrg",target:"_blank",rel:"noopener noreferrer"},Ki={href:"https://juejin.cn/book/7161370789680250917/section/7161625525763440647",target:"_blank",rel:"noopener noreferrer"},Ei={href:"https://juejin.cn/book/7161370789680250917/section/7161625415935590436",target:"_blank",rel:"noopener noreferrer"},Fi=l(`<p>先上 HTML 结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;card__container&quot; dir=&quot;ltr&quot; lang=&quot;zh-Hans&quot;&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;h3&gt;现代 Web 布局&lt;/h3&gt;
        &lt;p&gt;现代 Web 布局中的最后一节课，下一代响应式 Web 设计中的容器响应，就是容器查询！&lt;/p&gt;
        &lt;span&gt;&lt;svg t=&quot;1673340802729&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;2667&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;&lt;/svg&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;
​
&lt;div class=&quot;card__container&quot; dir=&quot;rtl&quot; lang=&quot;ar&quot;&gt;
    &lt;div class=&quot;card&quot;&gt;
        &lt;h3&gt;تصميم Web الحديثة&lt;/h3&gt;
        &lt;p&gt;الدرس الأخير في تصميم Web الحديثة، والجيل التالي من استجابة الحاويات في تصميم Web، هو البحث عن الحاويات!&lt;/p&gt;
        &lt;span&gt;&lt;svg t=&quot;1673340802729&quot; class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; p-id=&quot;2667&quot; width=&quot;200&quot; height=&quot;200&quot;&gt;&lt;/svg&gt;&lt;/span&gt;
    &lt;/div&gt;
 &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 LTR 的布局，我们可以这样写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card {
    --bg-angle: to right;
    --bg: linear-gradient(var(--bg-angle), #5521c3, #5893eb);
    background: var(--bg, lightgrey);
    border-radius: 12px;
}
​
.card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    grid-template-areas:
        &quot;title       icon&quot;
        &quot;description icon&quot;;
    gap: .5rem;
    padding: 18px;
}
​
.card h3 {
    grid-area: title;
    font-size: clamp(1.25rem, 5cqw + 1.5rem, 1.875rem);
}
​
.card p {
    grid-area: description;
}
​
.card span {
    grid-area: icon;
    place-self: center;
    font-size: 3rem;
}
​
.card svg {
    display: block;
    width: 1em;
    height: 2em;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RTL 和 LTR 不同之处是，渐变背景颜色刚好相反，另外 ICON 图标是带有方向性的，因此在 RTL 布局下，需要对其做一个水平镜像处理。我们使用样式查询来完成它：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card__container[dir=&quot;rtl&quot;] {
    --dir: rtl;
    direction: var(--dir);
}
​
​
@container style(--dir: rtl) {
    .card {
        --bg-angle: to left; /* 改变渐变方向 */
    }
​
    svg {
        transform: scaleX(-1); /* 水平镜像 */
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就这样搞定。你可以想想，如果没有样式查询，会是如何实现？它们有什么样的差异？这两个问题的答案就留给大家自己去寻找和思考了！</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>响应式 Web 设计已经将 Web 带到了今天人们所能接触到的每一个连接的屏幕上。Web 设计师和创意开发者用创造性的思维、大胆的想法和某种无畏的精神探索、测试和迭代他们的想法，使在线体验更有吸引力、更容易访问和更智能，推动了设计方法的发展。就好比这里所提到的组件驱动式 Web 设计。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8114cae1efe94c00a574c4605fc0b410~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>组件驱动式 Web 设计的到来或者说 CSS 容器查询、样式查询等特性的出现，这些先进的特性使我们有机会从页面布局、全局样式和用户样式中孤立组件样式，从而实现更具弹性的响应式设计。这意味着你现在可以使用基于页面的媒体查询设计宏观布局，包括多屏或折叠屏的细微差异；同时使用基于容器查询给组件设计做微观上布局，并添加基于用户偏好的媒体查询，来实现基于用户的独特偏好和需求的定制化体验。</p><p>如果我们将这些组件驱动的功能纳入设计系统，并从整体上改变我们对待 Web 设计的方式，我们就可以利用这些功能以及更多的功能来改善每一个登陆你网站的访问者的用户体验。为用户提供真正个性化的体验，提高参与度和转化率，并最终提高用户对你的品牌的感知。</p><p>我们不再是为用户群体设计。我们对 &quot;受众&quot;一词的理解将发生变化，因为内容和体验将为一个人而不是许多人，受众变得高度集中。 组件驱动的响应式 Web 设计将使 Web 真正的可移植，并能适应甚至还没有发明的设备。与其在今天的技术范围内追赶和设计，我们将只为用户设计。</p>`,13);function Ji(Oi,Zi){const e=a("ExternalLinkIcon");return t(),r("div",null,[c,i("p",null,[n("早在 2019 年底，"),i("a",u,[n("@Zach Leatherman"),d(e)]),n(" 在寻找"),i("a",o,[n("容器查询起源"),d(e)]),n("时，找到的最早有关于容器查询的解决方案是 "),i("a",m,[n("@Andy Hume"),d(e)]),n(" 的基于 "),i("a",b,[n("JavaScript 的选择器查询和响应式容器的解决方案"),d(e)]),n("。")]),i("p",null,[n("2015 年， "),i("a",p,[n("@Mat ‘Wilto’ Marquis"),d(e)]),n(" 在响应式图片社区小组引入了 "),g,n(" 元素，将响应式图片带到了响应式 Web 设计的世界，他在《"),i("a",q,[n("Container Queries: Once More Unto the Breach"),d(e)]),n("》一文中概述了容器查询的挑战和使用案例，演示了容器查询的特性。")]),i("p",null,[n("然后，在 2017年，"),i("a",h,[n("@Ethan Marcotte"),d(e)]),n(" 写了一篇关于"),i("a",f,[n("容器查询相关的文章"),d(e)]),n("，并提出了这样的看法： "),x,n(" 。")]),i("p",null,[n("从那时起，虽然有很多人开始主张使用容器查询，但容器查询向前推进的速度还是不够理想。"),i("a",_,[n("@L. David Baron"),d(e)]),n(" 在《"),i("a",w,[n("Thoughts on an implementable path forward for Container Queries"),d(e)]),n("》中简明扼要地解释了容器查询向前推进慢的问题出在哪。")]),y,i("p",null,[n("除了 @David Baron 之外，2018 年 6 月，"),i("a",k,[n("@Greg Whitworth"),d(e)]),n(" 在荷兰阿姆斯特丹举办的 "),i("a",z,[n("CSS Day + UX Special"),d(e)]),n(" 活动上的主题分享《"),i("a",S,[n("Over the moon for container queries"),d(e)]),n("》中也解释了容器查询在 Web 平台上推进慢的相关原因。")]),i("p",null,[n("更重要的是，@Greg Whitworth 还提供了使用新的 JavaScript API 和 CSS 的新技术来实现容器查询的特性。"),i("a",j,[n("@David Barrrron 也提出了一个可以避免这种困境的策略"),d(e)]),n("，更重要的是 "),i("a",C,[n("@Miriam Suzanne"),d(e)]),n(" 在 @David Baron 的策略基础上提出了 "),W,n("。")]),L,i("p",null,[n("这个提议已经被 "),i("a",M,[n("W3C 的 CSS 工作组"),d(e)]),n("采纳，并已经添加到 "),i("strong",null,[i("a",B,[n("CSS Containment Module Level 3"),d(e)])]),n(" 模块中。有关于该功能的相关问题和各网络平台推进进度，"),i("a",I,[n("可以点击这里查阅"),d(e)]),n("。")]),D,T,U,R,i("p",null,[n("直到现在为止（写这篇课程的时间），"),i("a",G,[n("CSS 容器查询在现代主流浏览器上都可以查看到相应的效果"),d(e)]),n("：")]),H,i("p",null,[n("但你要运用于实际生产中，还是需要慎重，或者可以尝试依赖 "),i("a",N,[n("CSS 容器查询相关的 Polyfill"),d(e)]),n(" 来保证其在生产中的正常运行。")]),P,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",V,[n("https://codepen.io/airen/full/QWBKdzP"),d(e)])])]),A,i("p",null,[Q,n(" 和 "),K,n(" 是 "),i("a",E,[n("CSS Containment Module Level 3"),d(e)]),n(" 新增的两个属性，它们看上去非常相似，但有着本质的区别：")]),F,i("p",null,[n("我们拿 "),i("a",J,[n("@Una Kravets 在 Codepen 上的案例来举例"),d(e)]),n("，因为这个案例有一个特点，查询容器嵌套：")]),O,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",Z,[n("https://codepen.io/airen/full/jOpMmZa"),d(e)])])]),X,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",Y,[n("https://codepen.io/airen/full/yLqawaQ"),d(e)])])]),$,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",ii,[n("https://codepen.io/airen/full/QWBKdzP"),d(e)])])]),ni,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",ei,[n("https://codepen.io/airen/full/QWBKRmg"),d(e)])])]),di,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",li,[n("https://codepen.io/airen/full/vYaXqNK"),d(e)])])]),si,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",ai,[n("https://codepen.io/airen/full/JjBRQvG"),d(e)])])]),ti,i("blockquote",null,[i("p",null,[n("Demo 地址： "),i("a",ri,[n("https://codepen.io/airen/full/yLqawaQ"),d(e)])])]),vi,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",ci,[n("https://codepen.io/airen/full/xxJgaEZ"),d(e)])])]),ui,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",oi,[n("https://codepen.io/airen/full/OJwWovo"),d(e)])])]),mi,i("blockquote",null,[i("p",null,[n("Demo 地址： "),i("a",bi,[n("https://codepen.io/airen/full/VwBPGEr"),d(e)])])]),pi,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",gi,[n("https://codepen.io/airen/full/KKBaroo"),d(e)])])]),qi,i("p",null,[n("事实上，除了上面提到的之外，还可以查询 "),hi,n(" 和 "),fi,n(" （"),i("a",xi,[n("MDN上有相关描述"),d(e)]),n("），这个就和媒体查询非常的相似了。也就是说，我们除了查询容器的尺寸大小之外，还可以像 CSS 媒体查询一样，查询容器的宽高比、取向等。")]),_i,i("blockquote",null,[i("p",null,[n("Dem 地址："),i("a",wi,[n("https://codepen.io/airen/full/NWBpRYE"),d(e)])])]),yi,i("p",null,[n("接下来看一个容器查询单位的真实案例，这个案例是 "),i("a",ki,[n("@Scott Kellum"),d(e)]),n(" 在 "),i("a",zi,[n("Codepen 上提供的"),d(e)]),n("，我直接 Fork 了一份出来：")]),Si,i("blockquote",null,[i("p",null,[n("Demo 地址： "),i("a",ji,[n("https://codepen.io/airen/full/rNryMVg"),d(e)])])]),Ci,i("blockquote",null,[i("p",null,[i("a",Wi,[n("CSS Containment Module Level 3规范"),d(e)]),n(" （当前还只是工作草案）定义了样式查询。")])]),Li,i("p",null,[n("样式查询仍然处于实验阶段，目前仅在 "),i("a",Mi,[n("Chrome Canary"),d(e)]),n(" 中实现。要测试它们，请访问 "),Bi,n(" 并激活“Experimental Web Platform features”，将其设置为 "),Ii,n(" 状态：")]),Di,i("p",null,[n("理想情况下，上述代码应该可以工作，但是 Chrome Canary 中，当前的样式查询原型仅限于 CSS 变量。样式查询有望在 "),i("a",Ti,[n("Chrome M111"),d(e)]),n(" 中发布。")]),Ui,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",Ri,[n("https://codepen.io/airen/full/LYBWWWZ"),d(e)])])]),Gi,i("blockquote",null,[i("p",null,[n("Demo 地址： "),i("a",Hi,[n("https://codepen.io/airen/full/JjBWNPN"),d(e)]),n(" （请使用 Chrome Canary 查看 ）")])]),Ni,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",Pi,[n("https://codepen.io/airen/full/abjJWeK"),d(e)]),n(" （请使用 Chrome Canary 查看 ）")])]),Vi,Ai,i("blockquote",null,[i("p",null,[n("Demo 地址："),i("a",Qi,[n("https://codepen.io/airen/full/bGjqRrg"),d(e)]),n(" （请使用 Chrome Canary 查看 ）")])]),i("p",null,[n("我们在 《"),i("a",Ki,[n("22 | Web 中的向左向右：Flexbox 和 Grid 布局中的 LTR 与 RTL"),d(e)]),n("》和《"),i("a",Ei,[n("23 | Web 中的向左向右：Web 布局中 LTR 切换到 RTL 常见错误"),d(e)]),n("》有详细介绍过如何实现上图这样的多语言 Web 组件，所以这里就不再重复阐述。我们直接来看，有了样式查询之后，它是如何实现的？")]),Fi])}const Yi=s(v,[["render",Ji],["__file","index-28.html.vue"]]);export{Yi as default};
