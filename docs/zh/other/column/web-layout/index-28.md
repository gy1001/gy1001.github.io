# 28-下一代响应式 Web 设计：容器查询

CSS 的媒体查询引发了一场响应式 Web 设计的革命，为开发者提供了一种方法来查询用户代理或设备环境的各个方面，比如视窗的大小或用户偏好来改变 Web 页面的风格。直到现在，媒体查询还做不到根据一个最近的容器的大小来改变样式风格。也正因此，大家一直期待的容器查询来了。

**很难想象，从基于页面的响应式设计（媒体查询）到基于容器的响应式设计（容器查询）的转变，对设计生态系统的发展会起到什么作用** 。

为了回答这个问题，接下来我们分几个方面来介绍，希望能给大家带来一定的思考，从而得到自己想要的答案。

## 容器查询的发展历程

一直以来，CSS 容器查询都是大家期待的一个特性，在这几年的 CSS 发展报告中，它一直位居第一：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18f52d4afa58406b8dcb466de9ca9605~tplv-k3u1fbpfcp-zoom-1.image)

通过前面课程的学习，我们知道了。在 CSS 中，Web 开发者可以根据 CSS 媒体查询特性（通常是视窗宽度、媒体设备特性等）来为 Web 页面定制不同的表现形式，比如可以根据用户浏览内容的设备特性来呈现不同的布局、字体大小和图片等。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a049e0660b06465a8d50e8badaa5d0b2~tplv-k3u1fbpfcp-zoom-1.image)

但对于 Web 设计师或 Web 开发者来说，在现代 Web 设计或布局中仍然缺少一特性，页面的组件设计不能够响应其容器的宽度（或其他特性）。也就是说，如果 Web 开发者能够根据容器宽度来改变 UI 样式，那就更好了。容器查询将在很大程度上帮助 Web 开发者更好地完成他们的工作，在为 Web 开发基于组件代码时，容器查询特性的缺失是一个巨大的限制。

正因此，有关于容器查询的特性在社区中的探讨就没有停止过。

早在 2019 年底，[@Zach Leatherman](https://twitter.com/zachleat) 在寻找[容器查询起源](https://www.zachleat.com/web/origin-container-queries/)时，找到的最早有关于容器查询的解决方案是 [@Andy Hume](https://twitter.com/andyhume) 的基于 [JavaScript 的选择器查询和响应式容器的解决方案](https://github.com/ahume/selector-queries)。

2015 年， [@Mat ‘Wilto’ Marquis](https://twitter.com/wilto) 在响应式图片社区小组引入了 `<picture>` 元素，将响应式图片带到了响应式 Web 设计的世界，他在《[Container Queries: Once More Unto the Breach](https://alistapart.com/article/container-queries-once-more-unto-the-breach/)》一文中概述了容器查询的挑战和使用案例，演示了容器查询的特性。

然后，在 2017年，[@Ethan Marcotte](https://twitter.com/beep) 写了一篇关于[容器查询相关的文章](https://ethanmarcotte.com/wrote/on-container-queries/)，并提出了这样的看法： **在他最初关注的响应式 Web 设计的文章之后的几年里，Web 设计师和开发人员的工作越来越集中在组件上，而不是整个页面，这使得媒体查询不那么理想** 。

从那时起，虽然有很多人开始主张使用容器查询，但容器查询向前推进的速度还是不够理想。[@L. David Baron](https://twitter.com/davidbaron) 在《[Thoughts on an implementable path forward for Container Queries](https://github.com/dbaron/container-queries-implementability)》中简明扼要地解释了容器查询向前推进慢的问题出在哪。

**容器查询要求样式取决于组件的大小，但考虑到 CSS 的工作原理，组件中的样式会影响其大小。任意打破这个循环，既会产生奇怪的结果，又会干扰浏览器的工作，还会增加浏览器优化的成本** 。

除了 @David Baron 之外，2018 年 6 月，[@Greg Whitworth](https://twitter.com/gregwhitworth) 在荷兰阿姆斯特丹举办的 [CSS Day + UX Special](https://noti.st/events/elQrNX/css-day-ux-special) 活动上的主题分享《[Over the moon for container queries](https://noti.st/gregwhitworth/UDul7E/over-the-moon-for-container-queries)》中也解释了容器查询在 Web 平台上推进慢的相关原因。

更重要的是，@Greg Whitworth 还提供了使用新的 JavaScript API 和 CSS 的新技术来实现容器查询的特性。[@David Barrrron 也提出了一个可以避免这种困境的策略](https://github.com/dbaron/container-queries-implementability)，更重要的是 [@Miriam Suzanne](https://twitter.com/TerribleMia) 在 @David Baron 的策略基础上提出了 `@container 方法`。

> `@container` 方法通过对被查询的元素应用大小和布局的限制来实现。任何具有尺寸和布局限制的元素都可以通过一个新的 `@container` 规则进行查询，其语法与现有的媒体查询类似。

这个提议已经被 [W3C 的 CSS 工作组](https://drafts.csswg.org/css-contain-3/)采纳，并已经添加到 **[CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3)** 模块中。有关于该功能的相关问题和各网络平台推进进度，[可以点击这里查阅](https://github.com/w3c/csswg-drafts/projects/18)。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15fb2c4de8004eada8d8283406fdcc02~tplv-k3u1fbpfcp-zoom-1.image)

其实，自从我们在 2021 年 4 月第一次看到容器查询原型以来，它的语法已经更改了几次。庆幸的是，现在容器查询的规范也稳定了，浏览器也准备发布了！现在使用，你也不必担心其语法规则的变化了。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d00258457baf49eba863a203afc1ae64~tplv-k3u1fbpfcp-zoom-1.image)

当然，如果你在互联网上阅读 CSS 容器查询相关的教程，看到文章中的示例没有任何效果，很有可能示例使用的是老的语法规则。

直到现在为止（写这篇课程的时间），[CSS 容器查询在现代主流浏览器上都可以查看到相应的效果](https://caniuse.com/css-container-queries)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4188c738c2445969576ad058fac47f9~tplv-k3u1fbpfcp-zoom-1.image)

但你要运用于实际生产中，还是需要慎重，或者可以尝试依赖 [CSS 容器查询相关的 Polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) 来保证其在生产中的正常运行。

## 什么是容器查询？

CSS 容器查询最大的特点是： **容器查询允许开发者定义任何一个元素为包含上下文，查询容器的后代元素可以根据查询容器的大小或计算样式的变化来改变风格** ！

换句话说，一个查询容器是通过使用容器类型属性（`container-type` 或 `container`）来指定其查询类型。同时，查询容器的后代元素的样式规则可以通过使用 `@container` 条件组规则进行独立设置。简单地说，**查询容器（也被称为 CSS 包容）提供了一种方法来隔离页面的各个部分，并向浏览器声明这些部分在样式和布局方面与页面的其他部分是独立的** 。

容器查询为响应式 Web 设计提供了一种更加动态的方法。这意味着，如果你卡片组件同时放在侧边栏（`aside`）和页面主内容栏中（`main`），则卡片组件本身可以根据容器（`aside` 和 `main`）而不是浏览器视窗进行响应式的信息展示（卡片组件 UI 不同）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7515be040494766bd8fa2fc12c9f295~tplv-k3u1fbpfcp-zoom-1.image)

简化一下，以卡片 `.card` 组件为例。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9e5f5a03e3944c58894355da448c3a3~tplv-k3u1fbpfcp-zoom-1.image)

同一个卡片组件 `Card` ，它有三种不同的 UI 状态，分别是 `S` 、`M` 和 `L` 。

我们来看如何使用 CSS 容器查询构建这个卡片组件。首先，把卡片组件放到一个容器中，比如 `.card__container` ：

```
<div class="card__container">
    <!-- Card 组件需要的 HTML 结构 -->
    <div class="card">
        <figure>
            <img src="thumbnail.jpg" alt="thumbnail" />
        </figure>
        <ul class="badges">
            <li class="badge">gluten free</li>
            <li class="badge">main dish</li>
        </ul>
        <h3 class="title">Card Title</h3>
        <div class="votes">
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <span>(12 votes)</span>
        </div>
        <p class="description">Card Description</p>
        <button>
            <svg></svg> Save
        </button>
        <dl class="lists">
            <dt>Preparation Time: </dt>
            <dd>3 hours</dd>
            <dt>Cooking time:</dt>
            <dd>25 min</dd>
            <dt>Serving:</dt>
            <dd>4-6 persons</dd>
            <dt>Cost:</dt>
            <dd>$3/person</dd>
        </dl>
    </div>
</div>
```

也就是说，当卡片组件（`.card`）被放在一个容器（`.card__container`）中时，代表着它被包含在该容器中，比如上面代码中的 `.card__container`。这也意味着，我们可以使用 CSS 的 `container` 来查询 `.card__container` 的宽度，并在 `@container` 对 `.card` 设置不同的样式规则，从而达到设计师真正的意图，比如，容器宽度（`.card__container`）分别在默认、 `>650px`和`>820px` 时，为 `.card` 设置不同样式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8520402c0a9d45749c76a20fc8ce791e~tplv-k3u1fbpfcp-zoom-1.image)

代码可能像下面这样：

```
.card__container {
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
        "thumbnail"
        "badges"
        "title"
        "votes"
        "description";
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
@container (inline-size > 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            "thumbnail  ."
            "thumbnail  badges"
            "thumbnail  title"
            "thumbnail  votes"
            "thumbnail  description"
            "thumbnail  button"
            "thumbnail  .";
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
@container (inline-size > 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
            "thumbnail  .            ."
            "thumbnail  badges       lists"
            "thumbnail  title        lists"
            "thumbnail  votes        lists"
            "thumbnail  description  lists"
            "thumbnail  button       lists"
            "thumbnail  .            .";
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
```

拖动卡片右下角的滑块，改变 `.card__container` 容器大小，你可以看到卡片组件（`.card`）UI 效果的变化：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15e3014cd1d54e148d3f9bbbbb947736~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWBKdzP>

`@container` 规则，其工作方式与使用 `@media` 的媒体查询类似，不同的是，`@container` 查询父容器以获取信息，而不是视口和浏览器的 UserAgent。

## 容器查询的使用

上面的示例说明了容器查询是什么，我想有不少同学应该不知道上面代码具体的含义。那我们就先从 `@container` 和 `container` 聊起。

### @container 和 container

`container` 和 `@container` 是 [CSS Containment Module Level 3](https://drafts.csswg.org/css-contain-3/#containment-types) 新增的两个属性，它们看上去非常相似，但有着本质的区别：

- `container` 是 `container-type` 和 `container-name` 的简写属性，用来显式声明某个元素是一个查询容器，并且定义查询容器的类型（可以由 `container-type` 指定）和查询容器的名称（由 `container-name` 指定）。
- `@container`（带有 `@` 规则），它类似于条件 CSS 中的 `@media` 或 `@supports` 规则，是一个条件组规则，其条件是一个容器查询，它是大小（`size`）和（或）样式（`style`）查询的布尔组合。只有当其条件为真（`true`），`@container` 规则块中的样式都会被用户代理运用，否则将被视为无效，被用户代理忽略。

### 定义一个包含性上下文

要使用 CSS 容器查询特性，**首先要定义一个包含性上下文（Containment Context）** 。这个有点类似于使用 Flexbox 和 Grid 布局（定义 Flexbox 或 Grid 上下文使用的是 `display` 属性），只不过，定义一个包含性的上下文使用的不是我们熟知的 `display` 属性，而是一个新的 CSS 属性，即 **`container`** 。

在一个元素上显式使用 `container` 可以告诉浏览器以后要针对这个容器进行查询，以及具体如何查询该指定的容器。比如，上面演示的示例中，我们在 `.card__container` 元素上（`.card` 的父容器）显式设置了 `container-type` 的值为 `inline-size`:

```
.card__container { 
    container-type: inline-size;
} 
```

上面的代码告诉浏览器，可以基于 `.card__container` 容器的内联轴（Inline Axis）方向尺寸变化进行查询。也就是说，当 `.card__container` 容器宽度大小变化到指定的某个值时，其后代元素的样式就可以进行调整。

`container-type` 是 `container` 属性中的一个子属性，另外，还可以显式使用 `container-name` 来命名你的容器，即**给一个包含性上下文指定一个具体的名称** ：

```
.card__container { 
    container-name: card; 
}
```

这种方式对于同一个上下文中有多个包含性上下文时非常有意义，可以更明确地知道哪些查询会影响元素。

你可以使用简写属性 `container`，只不过需要在 `container-type` 和 `container-name` 之间添加斜杠分割符 `/`：

```
.card__container { 
    container-type: inline-size; 
    container-name: card; 
} 
​
/* 等同于 */ 
.card__container { 
    container: card / inline-size; 
} 
```

**在使用** **`container`简写方式时，`container-name`** **要放在** **`/`** **前，`container-type`** **要放在** **`/`** **后** 。

另外，如果一个容器查询被应用到一个没有定义为包含上下文的祖先元素上，查询将无法应用。也就是说，无论是 `body` 还是 `html` 元素，都没有默认的回退包含上下文。而且，定义包含上下文名称时不能是 CSS 的关键词，比如 `default`、`inherit`、`initial` 等。

> 注意：`container-name` 可以省略，如果省略将会使用其初始值 `none`，但 `container-type` 不可省略，如果省略的话则表示未显式声明包含性上下文！

### 定义一个容器查询

现在我们知道使用 `container`（或其子属性 `container-type` 和 `container-name`）对一个元素显式声明包含上下文（对一个元素应用包含性）。

CSS 包含性上下文提供了一种方法来隔离页面的各个部分，并向浏览器声明这些部分在样式和布局方面与页面的其他部分是独立的。也就是说，有了这个包含性上下文之后，就可以使用 CSS 的 `@` 规则 `@container` 来对应用了包含性元素进行查询，即**对容器进行查询** 。`@container` 规则的使用和 `@media` 以及 `@supports` 相似：

```
@container (width > 45rem) { 
    /* 应用了包含性上下文后代元素的 CSS */ 
} 
​
@container card (width > 45rem) { 
    /* 应用了包含性上下文后代元素的 CSS */ 
} 
```

这两种方式都是正确的使用姿势，第二个示例中的 `card` 指的是 `container-name` 显式声明的包含性上下文的名称。如果在 `@container` 中没有指定查询的容器名称，那么这个查询将是针对离样式变化最近的声明了包含性上下文的元素进行查询。比如：

```
@container (width > 30em) { 
    .card { 
        border-radius: 20px; 
    } 
} 
```

表示这个查询将是针对 `.card` 元素最近的显式声明了包含性上下文的元素进行查询。

我们拿 [@Una Kravets 在 Codepen 上的案例来举例](https://codepen.io/una/full/NWgxXGV)，因为这个案例有一个特点，查询容器嵌套：

```
.cart-button-container {
    container-type: inline-size;
}
​
.cart-icon {
    container-type: inline-size;
}
​
/* 购物车宽度大于或等于 30px */ 
@container (width > 30px) {
    .cart-lines-group {
        display: block;
    }
}
​
/* 购物车宽度大于或等于 50px ，显示 "+" 符号 */ 
@container (width > 50px) {
    .plus-group {
        display: block;
    }
}
​
/* 购物车宽度在 100px 时， Add 替代 “+” 符号 */
@container (width > 100px) {
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
@container (width > 220px) {
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
@container (width > 200px) {
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
@container (width > 250px) {
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
@container product-card-container (width >  400px) {
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
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/160504ca68cc439ea42fcf53c5c5884e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/jOpMmZa>

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0052e9d1703a4b26bedbcff91d7ee06c~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示， `.product-card-container` 、`.card-button-container` 和 `.cart-icon` 都是一个包含性上下文，因为它们都显式地设置了 `container-type` 的值为 `inline-size` 。如果没有使用 `container-type` 命名，那么像 `.card-button` 会先根据 `.cart-button-container` 查询容器进行查询，因为该包含性上下文离其最近。

### 示例：容器查询卡片

我想大家对容器查询有了一个初步的认识。接下来，我们把前面示例中的卡片组件放到相应的布局中，比如把卡片分别放置到左侧边栏和主内容栏中：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77005055ea1d4283b56b9f059a7d2f26~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/yLqawaQ>

我们把带有容器查询特性的卡片组件 `.card` 分别放置在页面的左侧边栏 `aside` 和主内容栏 `main` 中。

```
<body>
    <header>.header</header>
    <main>
        <div class="card__container" style="--c: darkorchid">
            <!-- Card 组件需要的 HTML 结构 -->
            <div class="card">
                <figure>
                    <img src="https://picsum.photos/1024/860?random=1" alt="thumbnail" />
                </figure>
              <ul class="badges">
                  <li class="badge">Solarpunk</li>
                  <li class="badge">Hope</li>
              </ul>
              <h3 class="title">We Don’t Have the Right: A Decolonized Approach to Innovation</h3>
              <div class="votes">
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810506945" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11048" width="200" height="200">
                      <path d="M902.211 410.358a31.766 31.766 0 0 0-25.644-21.62L644.34 354.994 540.485 144.561a31.765 31.765 0 0 0-56.971 0L379.659 354.995l-232.227 33.744a31.768 31.768 0 0 0-17.606 54.183l168.042 163.8-39.669 231.288a31.765 31.765 0 0 0 46.091 33.487L512 762.298l207.71 109.199c6.915 3.65 22.854 4.496 33.454-2.418 10.086-6.579 14.681-19.151 12.637-31.069l-39.669-231.288 168.041-163.8a31.765 31.765 0 0 0 8.038-32.564zM669.827 572.885a31.766 31.766 0 0 0-9.136 28.117l31.611 184.31-165.521-87.02a31.746 31.746 0 0 0-14.782-3.648 31.755 31.755 0 0 0-14.782 3.648l-165.521 87.02 31.611-184.31a31.766 31.766 0 0 0-9.135-28.117l-133.91-130.53 185.058-26.89a31.765 31.765 0 0 0 23.918-17.377L512 230.396l82.761 167.691a31.765 31.765 0 0 0 23.917 17.377l185.059 26.89-133.91 130.531z" fill="currentColor" p-id="11049"></path>
                  </svg>
                  <span>(12 votes)</span>
              </div>
              <p class="description">It really is possible to make excellent gluten free pizza at home in your own oven with our recipes and techniques.</p>
              <button>
                  <svg t="1672810575352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16052" width="200" height="200">
                      <path d="M785.749333 849.578667l-274.5344-123.562667-274.568533 123.562667V149.981867c0-4.778667 3.925333-8.738133 8.738133-8.738134h531.626667c4.8128 0 8.738133 3.925333 8.738133 8.738134v699.5968zM777.0112 34.372267H245.384533A111.138133 111.138133 0 0 0 134.2464 145.5104V1016.1152l102.4-48.093867 274.568533-128.989866 274.5344 123.5968 102.4 46.08V145.5104A111.138133 111.138133 0 0 0 777.0112 34.372267z" fill="currentColor" p-id="16053"></path>
                  </svg> Save
              </button>
              <dl class="lists">
                  <dt>Preparation Time: </dt>
                  <dd>3 hours</dd>
                  <dt>Cooking time:</dt>
                  <dd>25 min</dd>
                  <dt>Serving:</dt>
                  <dd>4-6 persons</dd>
                  <dt>Cost:</dt>
                  <dd>$3/person</dd>
              </dl>
           </div>
        </div>
    </main>
    <aside>
        <div class="card__container" style="--c: darkorchid">
            <!-- Card 组件需要的 HTML 结构 -->
            <div class="card">
                <figure>
                    <img src="https://picsum.photos/1024/860?random=1" alt="thumbnail" />
                </figure>
              <ul class="badges">
                  <li class="badge">Solarpunk</li>
                  <li class="badge">Hope</li>
              </ul>
              <h3 class="title">We Don’t Have the Right: A Decolonized Approach to Innovation</h3>
              <div class="votes">
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810464651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10908" width="200" height="200">
                      <path d="M777.312598 940.007027c-3.184529 0-6.380314-0.759293-9.307993-2.297322L512.694825 803.484677 257.385045 937.708682c-6.741541 3.543709-14.909571 2.952238-21.070898-1.52268-6.161327-4.475941-9.246595-12.062733-7.959276-19.568684l48.759517-284.289812L70.566172 430.990988c-5.453199-5.316076-7.4159-13.268188-5.062296-20.511149 2.353604-7.242961 8.614192-12.521175 16.150842-13.616112l285.444101-41.47767L494.753197 96.730065c3.370771-6.828522 10.326183-11.153014 17.941628-11.153014 7.615445 0 14.570857 4.323469 17.941628 11.153014l127.654378 258.655991 285.444101 41.47767c7.53665 1.094938 13.797237 6.373151 16.150842 13.616112 2.353604 7.242961 0.390903 15.19405-5.062296 20.511149l-206.54924 201.335495 48.759517 284.289812c1.287319 7.505951-1.798972 15.092743-7.959276 19.568684C785.589099 938.717661 781.461081 940.007027 777.312598 940.007027z" fill="currentColor" p-id="10909"></path>
                  </svg>
                  <svg t="1672810506945" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11048" width="200" height="200">
                      <path d="M902.211 410.358a31.766 31.766 0 0 0-25.644-21.62L644.34 354.994 540.485 144.561a31.765 31.765 0 0 0-56.971 0L379.659 354.995l-232.227 33.744a31.768 31.768 0 0 0-17.606 54.183l168.042 163.8-39.669 231.288a31.765 31.765 0 0 0 46.091 33.487L512 762.298l207.71 109.199c6.915 3.65 22.854 4.496 33.454-2.418 10.086-6.579 14.681-19.151 12.637-31.069l-39.669-231.288 168.041-163.8a31.765 31.765 0 0 0 8.038-32.564zM669.827 572.885a31.766 31.766 0 0 0-9.136 28.117l31.611 184.31-165.521-87.02a31.746 31.746 0 0 0-14.782-3.648 31.755 31.755 0 0 0-14.782 3.648l-165.521 87.02 31.611-184.31a31.766 31.766 0 0 0-9.135-28.117l-133.91-130.53 185.058-26.89a31.765 31.765 0 0 0 23.918-17.377L512 230.396l82.761 167.691a31.765 31.765 0 0 0 23.917 17.377l185.059 26.89-133.91 130.531z" fill="currentColor" p-id="11049"></path>
                  </svg>
                  <span>(12 votes)</span>
              </div>
              <p class="description">It really is possible to make excellent gluten free pizza at home in your own oven with our recipes and techniques.</p>
              <button>
                  <svg t="1672810575352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16052" width="200" height="200">
                      <path d="M785.749333 849.578667l-274.5344-123.562667-274.568533 123.562667V149.981867c0-4.778667 3.925333-8.738133 8.738133-8.738134h531.626667c4.8128 0 8.738133 3.925333 8.738133 8.738134v699.5968zM777.0112 34.372267H245.384533A111.138133 111.138133 0 0 0 134.2464 145.5104V1016.1152l102.4-48.093867 274.568533-128.989866 274.5344 123.5968 102.4 46.08V145.5104A111.138133 111.138133 0 0 0 777.0112 34.372267z" fill="currentColor" p-id="16053"></path>
                  </svg> Save
              </button>
              <dl class="lists">
                  <dt>Preparation Time: </dt>
                  <dd>3 hours</dd>
                  <dt>Cooking time:</dt>
                  <dd>25 min</dd>
                  <dt>Serving:</dt>
                  <dd>4-6 persons</dd>
                  <dt>Cost:</dt>
                  <dd>$3/person</dd>
              </dl>
           </div>
        </div>
    </aside>
    <footer>.footer</footer>
</body>
```

卡片 `.card` 可以根据其容器 `.card__container` 的宽度调整 UI 布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f7f449b50b34c35bb1a0a0a5c3828e0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWBKdzP>

有了这样一个卡片组件之后，如果将其放在不同的位置，即使是同一页面，同一视窗断点下，也会根据其容器断点自动匹配最为适合的布局（或UI效果）。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01f7a34d3b29457bbbe5b6940e9fb554~tplv-k3u1fbpfcp-zoom-1.image)

从上图的效果中不难发现，位于侧边栏 `aside` 的卡片组件，它始终能保持下图呈现：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4fbe8c546e846d5a20a95302a8de9ab~tplv-k3u1fbpfcp-zoom-1.image)

位于 `main` 栏的卡片将会根据 `.card__container` 的宽度有着不同的方式呈现：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b04f3388dc64487e904a1362b6387f6c~tplv-k3u1fbpfcp-zoom-1.image)

就我们这个示例，`aside` 和 `main` 的布局，我们采用了 CSS 媒体查询，分别在 `768px` 和 `1024px` 断点调整了网格列轨道的尺寸：

```
body {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 1rem;
    grid-template-areas:
        "header"
        "main"
        "aside"
        "footer";
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
          "header header"
          "aside main"
          "footer footer";
    }
}

@media only screen and (min-width: 1024px) {
    body {
        grid-template-columns: 380px minmax(0, 1fr);
    }
}
```

加上在 `main` 栏中的 `.grid` （卡片列表的容器）采用 CSS Grid 的 RAM 布局技术：

```
.grid {
    display: grid;
    gap: 1rem;
}

main .grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 30em), 1fr));
}
```

让位于 `main` 栏中的卡片容器 `.card__container` 会随着 RAM 布局技术的调整具有不同的宽度，它有可能小于 `650px` ，有可能是 `650px ~ 820px` 之间，也有可能是大于 `820px` 。因此，卡片在主内容栏 `main` 会有三种不同的 UI 呈现。

除此之外，我们还可以将 `aside` 和 `main` 定义为一个包含性上下文。然后在 `main` 栏中对 `.grid` 设置不同的列，比如：

- 大于 `40em` 时，`.grid` 为两列 `repeat(2, 1fr)`；
- 大于 `60em` 时，`.grid` 为三列 `repeat(3, 1fr)`；
- 大于 `80em` 时， `.grid` 为四列 `repeat(4, 1fr)`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba0e22a8e4a74d4eab2e19b961f1f251~tplv-k3u1fbpfcp-zoom-1.image)

关键代码如下：

```
<!-- HTML --> 
<main>
    <!-- 定义一个名为 layout 的容器查询 --> 
    <div class="grid"> <!-- 根据main容器宽度，调整网布局 --> 
        <div class="card__container">
            <!-- 定义一个名为 card 的容器查询 --> 
            <Card /><!-- 根据卡片容器 card__container 的宽度调整 Card 组件UI --> 
        </div> 
    </div> 
</main> 
<aside>
    <!-- 定义一个名为 layout 的容器查询 --> 
    <div class="grid"><!-- 根据 aside 容器宽度，调整网布局 --> 
        <div class="card__container"><!-- 定义一个名为 component 的容器查询 --> 
            <Card /><!-- 根据卡片容器 card__container 的宽度调整 Card 组件UI --> 
        </div> 
    </div> 
</aside>
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
@container layout (width > 40em) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
​
@container layout (width > 60em) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
​
@container layout (width > 80em) {
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
@container card (inline-size > 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            "thumbnail  ."
            "thumbnail  badges"
            "thumbnail  title"
            "thumbnail  votes"
            "thumbnail  description"
            "thumbnail  button"
            "thumbnail  .";
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
@container card (inline-size > 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
          "thumbnail  .            ."
          "thumbnail  badges       lists"
          "thumbnail  title        lists"
          "thumbnail  votes        lists"
          "thumbnail  description  lists"
          "thumbnail  button       lists"
          "thumbnail  .            .";
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
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed9e41f698734e13ab414b1d9abce2e9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWBKRmg>

我们前面有提到过，Web 内容输出是动态的，可能因为卡片的扩展或收缩，CSS Flexbox 布局最终呈现的效果会和设计效果不一致：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c5815e2204442c69a523773f124c9a2~tplv-k3u1fbpfcp-zoom-1.image)

但有了 CSS 容器查询特性之后，这一切都变得很简单。就拿上面的示例来说，如果我们使用跨越多列来模拟卡片数量输出的不一致，你会发现，使用了容器查询的卡片会因为其查询容易自动匹配相应的布局效果：

```
aside,
main {
    container-name: layout;
    container-type: inline-size;
}

.grid {
    display: grid;
    gap: 1rem;
    grid-auto-flow: dense;
}

@container layout (width > 40em) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    main .grid .card__container:nth-child(2n + 1) {
        grid-column: span 2;
    }
}

@container layout (width > 60em) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    main .grid .card__container:nth-child(2n + 1) {
        grid-column: span 3;
    }
}

@container layout (width > 80em) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }

    main .grid .card__container:nth-child(2n + 1) {
        grid-column: span 4;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c25ebbf4e74fed9283323626190932~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/vYaXqNK>

## 容器查询解决的是什么问题？

众所周知，响应式 Web 设计的概念的核心是 CSS 媒体查询的出现，它允许开发者根据浏览器视窗的尺寸来设置各种样式规则。也正因此，响应式 Web 设计和 CSS 媒体查询开启了更多的 Web 布局解决方案，以及多年来围绕响应视窗尺寸创建的最佳实践。而且，近些年来，设计系统和组件库也得到了更广泛的普及。对于更多开发者而言，更大的期望是：**一次建成，随地部署** ！

这也意味着一个单独开发的 Web 组件可以在任何情况下工作，使得建立的复杂界面更加有效和一致。只不过，这些组件会组合在一起，形成一个 Web 页面或 Web 应用界面。

目前，在只有媒体查询的情况下，往往需要额外的一层来协调跨视窗大小变化的组件的突变。在这些情况下，你可能不得不在更多的断点下，使用更多的类名来设置不同的样式规则。甚至更惨的是，即使这样做，很多情况之下仍然也无法达到最理想的 UI 表面。

很多时候，响应式 Web 设计不是关于浏览器视窗尺寸，而是关于容器的尺寸大小，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6276e844b4854f0cbe16fb927ee38933~tplv-k3u1fbpfcp-zoom-1.image)

庆幸的是，CSS 容器查询的出现，使我们超越了只考虑浏览器视窗尺寸的范围，并允许任何组件或元素对定义的容器尺寸做出响应。因此，虽然你可能仍然使用响应式来给 Web 页面布局，但 Web 页面的任何一个组件都可能通过容器查询来定义自己的样式变化。然后，它可以根据它是在一个窄的还是宽的容器中显示，来调整它的样式。

> **容器查询使我们不再只考虑浏览器视窗尺寸大小，而是允许任何组件或元素对定义的容器尺寸做出响应** ！

也就是说，有了 CSS 容器查询，你就能以一种非常精确和可预测的方式定义一个组件的全部样式。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0e63613edb7428389f3ac57cb5d1884~tplv-k3u1fbpfcp-zoom-1.image)

## 设计时考虑容器查询

虽然响应式 Web 设计给 Web 设计师带来了更多的可能性，但响应式 Web 设计还是有很多的局限性。对于 Web 设计师而言，更期待的是能够根据组件容器尺寸来提供不同的设计风格。依旧拿卡片组件来举例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dc3d4b806a743a08bf13aa0dfec7ef4~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，CSS 容器查询特性来了之后，作为一名 Web 设计师，在设计 Web 页面（或组件）时，就需要基于容器尺寸考虑如何设计。这样一来，可以向 Web 开发人员提供组件的细节和变化，Web 开发人员也可以基于这些细节进行编码（进行开发）。

不过，这并不意味着容器查询特性之后，响应式 Web 设计是就失去了意义。在未来，容器查询和响应式设计是共存的，简单地说，Web 设计师在设计组件时可能会将组件分为以下几个部分：

- 基于视窗（CSS 媒体查询）；
- 基于容器（CSS 容器查询）；
- 通用型（不受影响的组件）。

比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06fbf92e923442e0998f8c5a59ecabc4~tplv-k3u1fbpfcp-zoom-1.image)

在未来，Web 设计师给 Web 开发者投喂的设计稿可能就会像下图这样了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b0103f11fe4861be272bafb3349749~tplv-k3u1fbpfcp-zoom-1.image)

或许因为容器查询的到来，设计师在设计 Web 的时候，也可能会做出相应的调整。投喂给 Web 开发的设计稿也可能会和以往的模式有所差异。那么这个时候，Web 开发者就需要正确理解设计师的意图了。比如，Web 设计师可能在未来的设计中提供向下图的卡片组件设计：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e70a570ffee740ddab9c861cdca7288d~tplv-k3u1fbpfcp-zoom-1.image)

作为 Web 开发人员，看到上图设计效果，需要改变以往对设计图意图的理解，不能继续执着于基于视窗尺寸来调整组件 UI。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9094d802c2294cb58da5a9380a84c8d4~tplv-k3u1fbpfcp-zoom-1.image)

上图是基于视窗的一种开发模式，需要为卡片组件设置不同的类名，并且基于视窗尺寸，在相应的类名下调整卡片组件 UI。有了容器特性时，我们可以基于现代的 Web 布局技术，比如 Flexbox 或 Grid 布局，让卡片组件基于其容器来调整其 UI：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fd2475dbc974b11a9ac5591bba3c394~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，可以基于视窗大小采用 CSS 媒体查询特性，Flexbox 或 Grid 布局等技术改变卡片容器 `.card__container` 的大小，从而让卡片组件根据其容器尺寸大小做出相应响应。

拥有一个能根据其父容器尺寸做出响应（UI 调整）的组件是非常有用的，正如你看到的，我们可以只构建一个组件，就可以满足不同视窗布局下的设计诉求！

## 容器查询不应该让组件变得复杂化

组件是由很多个元素组合在一起构成的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8153b89132914976bcd69b15ffc1f616~tplv-k3u1fbpfcp-zoom-1.image)

虽然容器查询特性到来，可以让组件根据其容器尺寸来做出响应，但要记住的是，做出响应变化应该要有一个度。如果过度设计的话，对于 Web 开发人员而言，与其使用容器查询特性来实现 UI 响应，还不如重新构建一个独立的全新组件。

拿用户信息组件（`UserProfile`）为例，组件内部结构保持不变，或者至少不会增加新的结构，只需稍加调整，比如调整布局，就可以实现不同的 UI 效果，或者让内部元素显示隐藏切换等。在这种情景之中，采用容器查询特性才能显现其魅力：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e2b70eece7a4e62ae39bcbe92774aa2~tplv-k3u1fbpfcp-zoom-1.image)

```
.card {
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
        "figure  title"
        "figure  description";
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
@container (width > 20rem) {
    .card {
        grid-template-columns: auto;
        grid-template-areas:
            "figure"
            "title"
            "description"
            "media";
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
@container (width > 35rem) {
    .card {
        grid-template-columns: 120px minmax(0, 1fr);
        grid-template-areas:
            "figure   title"
            "figure   description"
            "media    media";
        text-align: left;
        justify-items: start;
    }
}
​
@container (width > 45rem) {
    .card {
        grid-template-columns: 180px minmax(0, 1fr);
        grid-template-areas:
            "figure  title"
            "figure  description"
            "figure  media";
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
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf0a29068fc4cc0bed7bc0f198078a3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/JjBRQvG>

从侧面来说，这一点和 CSS 媒体查询构建的响应式 Web 设计有相似之处。如果一个 Web 组件在不同的断点情况下需要对多个元素进行隐藏，那么你就需要重新思考，如此设计是否合适。

我们在构建响应式 Web 页面或组件时，根据屏幕尺寸或容器尺寸选择要隐藏或显示的内容时要谨慎。请不要仅仅因为您无法将内容合理安排在屏幕上就简单地将其隐藏。屏幕尺寸并不能明确指示用户的需求。我们应该根据用户的实际需求出发，做出更为适合的选择。

## 媒体查询 vs. 容器查询

你在创建响应式 Web，经常会使用 CSS 媒体查询 `@media` ，根据浏览器视窗尺寸大小来改变 Web 页面布局。将 HTML 元素分组为可重用的组件是很常见的，这些组件根据页面中的可用空间具有特定的布局。可用空间可能不仅取决于浏览器视窗的尺寸大小，还取决于组件出现的上下文。

容器查询允许我们查看容器的大小，并根据容器的大小而不是浏览器视窗尺寸大小或其他设备特征为内容应用样式。例如，如果容器周围上下文中的空间较小，则可以隐藏某些元素或使用较小的字体。

简单地说，媒体查询，查询的是浏览器视窗宽度，而容器查询，查询的是组件容器的宽度。这个容器可以是组件的父元素，也可以是其祖先元素。也就是说，如果需要的话，可以在组件顶层容器上进行查询。用下图可以很清晰地阐述媒体查询和容器查询的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13c522ecf5941f6ba53a858d4d495c1~tplv-k3u1fbpfcp-zoom-1.image)

容器查询和媒体查询两者不是谁替代谁的关系，更应该是两者共存的关系。容器查询特性的出现，我们可以不再局限于视窗断点来调整布局或 UI 样式，还可以基于容器断点来调整布局或 UI 。

换句话说，**媒体查询是一种宏观的布局（Macro Layout），可以用于整体页面布局；而容器查询可以调整组件的每个元素，创建了一种微观的布局（Micro Layout）** 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfe193296ef94b0090ef618f691ab311~tplv-k3u1fbpfcp-zoom-1.image)

就拿前面的示例为例。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98b0b34be6d0462291f97e4879a2a4f8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/yLqawaQ>

页面级的布局（`.header` 、`.aside` 、`.main` 和 `.footer`）使用了 CSS 媒体查询 `@media` 来调整布局：

```
/* Mobile */
body {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 1rem;
    grid-template-areas:
        "header"
        "main"
        "aside"
        "footer";
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
            "header header"
            "aside main"
            "footer footer";
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
```

组件级（`.card`）使用了 CSS 容器查询 `@container` ：

```
.card {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto;
    grid-template-rows: min-content auto auto auto minmax(0, 1fr);
    grid-template-areas:
        "thumbnail"
        "badges"
        "title"
        "votes"
        "description";
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
@container (inline-size > 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            "thumbnail  ."
            "thumbnail  badges"
            "thumbnail  title"
            "thumbnail  votes"
            "thumbnail  description"
            "thumbnail  button"
            "thumbnail  .";
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
@container (inline-size > 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
            "thumbnail  .            ."
            "thumbnail  badges       lists"
            "thumbnail  title        lists"
            "thumbnail  votes        lists"
            "thumbnail  description  lists"
            "thumbnail  button       lists"
            "thumbnail  .            .";
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
```

## 容器查询可用于哪些场景？

现在我们对容器查询有了一定的认识，接下来，我们来看看实际业务中，在哪些场景下使用 CSS 容器查询可以帮助我们快速构建，提高组件扩展性。

### 搜索表单

搜索表单在一些业务场景很常见，它会根据容器的宽度有不同的状态，这样的搜索组件就非常适用于 CSS 容器查询：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9fd1c66aeae405d91266d8a8829ce99~tplv-k3u1fbpfcp-zoom-1.image)

构建这个搜索表单，可能需要一个这样的 HTML 结构：

```
<div class="form__container">
    <form class="form">
        <svg t="1638370815485" class="icon--search" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3749" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
            <path d="M874.798784 719.859059a456.211411 456.211411 0 1 0-152.8584 136.311873V659.976387l-8.667229 10.243088a293.897852 293.897852 0 1 1 48.063724-66.186111v228.499671l191.466965 191.466965V800.227909z" p-id="3750"></path>
        </svg>
        <input type="search" placeholder="皮裤女短裤真皮" name="search" class="search" />
        <svg t="1638370901048" class="icon--camera" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6029" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
            <path d="M846.933333 238.933333h-140.8L646.4 149.333333c-6.4-10.666667-17.066667-17.066667-29.866667-17.066666h-209.066666c-12.8 0-23.466667 6.4-29.866667 17.066666l-59.733333 89.6H177.066667c-57.6 0-106.666667 46.933333-106.666667 106.666667v426.666667c0 57.6 46.933333 106.666667 106.666667 106.666666h672c57.6 0 106.666667-46.933333 106.666666-106.666666v-426.666667c-2.133333-59.733333-49.066667-106.666667-108.8-106.666667z m34.133334 533.333334c0 19.2-14.933333 34.133333-34.133334 34.133333H177.066667c-19.2 0-34.133333-14.933333-34.133334-34.133333v-426.666667c0-19.2 14.933333-34.133333 34.133334-34.133333h160c12.8 0 23.466667-6.4 29.866666-17.066667L426.666667 206.933333h170.666666l59.733334 89.6c6.4 10.666667 17.066667 17.066667 29.866666 17.066667h160c19.2 0 34.133333 14.933333 34.133334 34.133333v424.533334z" p-id="6030"></path>
            <path d="M512 364.8c-96 0-174.933333 78.933333-174.933333 174.933333 0 96 78.933333 174.933333 174.933333 174.933334 96 0 174.933333-78.933333 174.933333-174.933334 0-96-78.933333-174.933333-174.933333-174.933333z m0 279.466667c-57.6 0-104.533333-46.933333-104.533333-104.533334s46.933333-104.533333 104.533333-104.533333 104.533333 46.933333 104.533333 104.533333-46.933333 104.533333-104.533333 104.533334z" p-id="6031"></path>
        </svg>
        <button class="button">搜索</button>
    </form>
</div>
```

使用 CSS 容器查询来完成所需要的搜索表单功能：

```
.form__container {
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
@container (width > 480px) {
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
        grid-template-areas: "searchIcon searchInput button";
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
@container (width > 768px) {
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
        grid-template-areas: "searchIcon searchInput cameraIcon button";
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
```

你将看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b86a704901a4540bf082911fa7dc1b7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxJgaEZ>

### 导航栏

Web 页面导航栏是常见的一个组件，在宽屏和窄屏的时候，它会向用户呈现不同的 UI 效果，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377da24573e94e7fad69e14c4a3bda2e~tplv-k3u1fbpfcp-zoom-1.image)

就拿我自己的博客（[www.w3cplus.com](www.w3cplus.com)）航栏为例吧。它也有类似的效果，只不过是使用 CSS 媒体查询实现的，现在我们使用 CSS 容器查询来实现：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1994924745e64cd18a4f2c29eaad28bd~tplv-k3u1fbpfcp-zoom-1.image)

具体代码如下：

```
<div class="browser">
    <div class="browser__header">
        <span></span>
        <span></span>
        <span></span>
    </div>
    
    <div class="browser__body">
        <div class="header">
            <h1 class="logo"><a href="https://www.w3cplus.com"><img src="https://www.w3cplus.com/sites/all/themes/w3cplusV2/images/logo.png" alt="W3cplus"></a></h1>
            <nav class="menu">
                <ul>
                    <li><a href="https://www.w3cplus.com/blog/tags/686.html">会员专栏</a></li>
                    <li><a href="https://www.w3cplus.com/CSS3">CSS</a></li>
                    <li><a href="https://www.w3cplus.com/JavaScript">JavaScript</a></li>
                    <li><a href="https://www.w3cplus.com/mobile">Mobile</a></li>
                    <li><a href="https://www.w3cplus.com/svg-tutorial">SVG</a></li>
                </ul>
            </nav>
            <div class="menu__icon">
                <span>menu</span>
                <svg t="1638455499563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6454" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M170.666667 213.333333m64 0l554.666666 0q64 0 64 64l0 0q0 64-64 64l-554.666666 0q-64 0-64-64l0 0q0-64 64-64Z" fill="currentColor" p-id="6455"></path>
                    <path d="M234.666667 640h554.666666a64 64 0 0 1 0 128h-554.666666a64 64 0 0 1 0-128z m0-213.333333h554.666666a64 64 0 0 1 0 128h-554.666666a64 64 0 0 1 0-128z" fill="currentColor" p-id="6456"></path>
                </svg>
            </div>
        </div>
    </div>
</div>
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e4cb8166a3423182bfaa0ed2fc65ec~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/OJwWovo>

### 分页器

分页器组件（`Pagination`）类似于导航栏，也很适合于使用容器查询：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ee84e06935c45e5a3b6f1313a5e6136~tplv-k3u1fbpfcp-zoom-1.image)

```
<nav class="pagination__container">
    <ul class="pagination">
        <li class="prev">
            <a href="#">
                <svg t="1638460279078" class="icon icon__prev" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10124" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M701.41952 852.35712a47.18592 47.18592 0 0 1-57.344-4.11648L333.9264 571.53536a79.60576 79.60576 0 0 1 0-119.05024L644.05504 175.73888a47.18592 47.18592 0 0 1 58.83904-3.072c15.29856 11.30496 18.45248 32.768 7.04512 47.9232l-192.14336 255.488a59.65824 59.65824 0 0 0 0 71.80288l192.14336 255.488 1.06496 1.47456a34.05824 34.05824 0 0 1-9.58464 47.49312z" p-id="10125" fill="currentColor"></path>
                </svg>
            </a>
        </li>
        <li class="first">
            <a href="#">1</a>
        </li>
        <li class="more">
            <span>
                <svg t="1638534255503" class="icon icon__more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2311" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608z" p-id="2312"></path>
                    <path d="M512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608z" p-id="2313"></path>
                    <path d="M800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z" p-id="2314" fill="currentColor"></path>
                </svg>
            </span>
        </li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li class="active"><span>5</span></li>
        <li><a href="#">6</a></li>
        <li><a href="#">7</a></li>
        <li class="more">
            <span>
                <svg t="1638534255503" class="icon icon__more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2311" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608z" p-id="2312"></path>
                    <path d="M512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608z" p-id="2313"></path>
                    <path d="M800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z" p-id="2314" fill="currentColor"></path>
                </svg>
            </span>
        </li>
        <li class="last"><a href="#">10</a></li>
        <li class="next">
            <a href="#">
                <svg t="1638460301528" class="icon icon__next" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12204" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M322.58048 852.35712a34.05824 34.05824 0 0 1-8.51968-48.9472l192.14336-255.50848a59.65824 59.65824 0 0 0 0-71.80288l-192.14336-255.488a34.03776 34.03776 0 0 1 8.51968-48.9472 47.18592 47.18592 0 0 1 57.344 4.096l310.12864 276.70528a79.60576 79.60576 0 0 1 0 119.07072l-310.10816 276.6848a47.18592 47.18592 0 0 1-57.344 4.13696z" p-id="12205" fill="currentColor"></path>
                </svg>
            </a>
        </li>
    </ul>
</nav>
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
    content: "";
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
@container (width > 540px) {
    .pagination li.first a,
    .pagination li.last a,
    .pagination li.more span {
        display: inline-flex !important;
    }
}
​
@container (width > 768px) {
    .pagination li a,
    .pagination li span {
         display: inline-flex !important;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaef1633c72d4cc7a0b0b94b64b53548~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/VwBPGEr>

### 侧边栏

在一些 Web 应用的侧边栏（比如 Gitlab 的侧边栏、Facebook 聊天界面，其实 Web 版本的微信群也有点类似于 Facebook 聊天室）像下图这样的模式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a91bcb7022ee474791ff40c7a4aa77f5~tplv-k3u1fbpfcp-zoom-1.image)

像上图这样的效果，我们可以使用 CSS 容器查询来实现。当有足够的空间时，侧边栏的列表会展开，如果没有足够空间时，侧边栏只会展示 Icon 图标（或用户头像）。我们来实现一个像下图的布局效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f32211f443d64fb6ae129e7fdb2f88bc~tplv-k3u1fbpfcp-zoom-1.image)

```
<div class="wrapper">
    <aside>
        <h1 class="logo">
            <svg width="36px" height="36px" viewBox="0 0 210 210" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="tanuki-logo"></svg>
            <span>GitLab</span>
        </h1>
        <nav class="menu">
            <ul>
                <li>
                    <a href="#">
                        <svg t="1638543010000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2303" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"></svg>
                        <span>Home</span>
                    </a>
                </li>
                <!-- 省略其他 li -->
            </ul>
        </nav>
        <div class="profile">
            <img src="https://www.w3cplus.com/sites/all/themes/w3cplusV2/images/logo.png" alt="">
            <span>w3cplus</span>
        </div>
    </aside>
    <main>
        <div class="card">
            <img src="https://picsum.photos/2568/600?random=1" width="2568" height="600" alt="" class="card__thumbnail" />
            <div class="card__badge">Must Try</div>
            <h3 class="card__title">Best Brownies in Town</h3>
            <p class="card__describe">High quality ingredients and best in-class chef. Light, tender, and easy to make~</p>
            <button class="card__button">Order now</button>
       </div>
       <!-- 省略其他 card -->
    </main>
</div>
```

关键的 CSS 代码：

```
.wrapper {
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
@container (width < 200px) {
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
@container (width > 760px) and (width < 1024px) {
    main {
        grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    }
    
    .card {
        grid-template-columns: 240px auto;
        grid-template-rows: min-content min-content auto;
        grid-template-areas:
            "thumbnail title"
            "thumbnail describe"
            "thumbnail button";
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
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/445f2685103a4a02a4dda5fc50756b1d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/KKBaroo>

## 其他容器尺寸大小的查询

我们平时看到的关于容器查询的案例大多数都是查询宽度（`width`）、最大宽度（`max-width`）和最小宽度（`min-width`）、高度（`height`）、块大小（`block-size`）和内联尺寸（`inline-size`）等。

```
.card__container {
    container: info-card / inline-size;
}
​
@container info-card (width < 500px) { 
    .card { 
        flex-direction: column; 
    } 
}
```

事实上，除了上面提到的之外，还可以查询 `aspect-ratio` 和 `orientation` （[MDN上有相关描述](https://developer.mozilla.org/en-US/docs/Web/CSS/@container#descriptors)），这个就和媒体查询非常的相似了。也就是说，我们除了查询容器的尺寸大小之外，还可以像 CSS 媒体查询一样，查询容器的宽高比、取向等。

```
/* CSS 媒体查询 */
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
```

比如下面这个示例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70e70650a1b44224b56b3564d2557735~tplv-k3u1fbpfcp-zoom-1.image)

> Dem 地址：<https://codepen.io/airen/full/NWBpRYE>

关键代码如下：

```
.card__container {
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
        "figure  title"
        "figure  des";
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
            "figure"
            "title"
            "des";
    }
  
    .card figure {
        border-radius: clamp(2px, 3cqw + 2px, 8px) clamp(2px, 3cqw + 2px, 8px) 0 0;
    }
  
    .card h3 {
        margin-top: 0;
        padding:  0 1rem;
    }
  
    .card p {
        padding: 0 1rem 1rem;
    }
}
```

> 甚至有一天，CSS 容器查询和 CSS 媒体查询一样，除了能查询上面提到的之外，也可以像 CSS 媒体查询一样，查询用户的偏好设置等！

## 容器查询单位

你知道吗？随着容器查询的出现，CSS 值单位也新增了**容器查询单位**。它的工作原理和视窗单位，比如 `vw` 、`vh` 、`vmin` 、`vmax` 等非常相似。不同的是，**视窗单位是相对于浏览器视窗尺寸计算；容器查询单位是相对于查询容器尺寸计算** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ac1159cf2f44ee7952242d709c23213~tplv-k3u1fbpfcp-zoom-1.image)

- `1cqw` 等于查询容器宽度（`width`）的 `1%`；
- `1cqh` 等于查询容器高度（`height`）的 `1%`；
- `1cqi` 等于查询容器内联大小（`inline-size`）的 `1%`；
- `1cqb` 等于查询容器块大小（`block-size`）的 `1%`；
- `1cqmin` 等于 `1cqi` 或 `1cqb` 中较小的一个值；
- `1cqmax` 等于 `1cqi` 或 `1cqb` 中较大的一个值。

容器查询单位出现之后，可以帮助我们在处理组件内元素样式，比如 `font-size`、 `padding` 和 `margin` 等，节省很多的精力和时间。例如，我们可以使用容器查询单位代替手动增加字体大小。

容器查询单位还没有的时候，我们一般会像下面这样改写卡片组件标题的 `font-size` ：

```
.card__title {
    font-size: 1rem;
}
​
/* 容器宽度大于 400px */
@container (width > 400px) {
    .card__title {
        font-size: 1.15rem;
    }
}
​
/* 容器宽度大于 600px */
@container (width > 600px) {
    .card__title {
        font-size: 1.25rem;
    }
}
​
/* 容器宽度大于 800px */
@container (width > 800px){
    .card__title {
        font-size: 2rem;
    }
}
```

有了容器查询单位之后，同样是给卡片组件标题设置 `font-size` ，只需要一行代码即可：

```
.card__title {
    font-size: clamp(1rem, 3cqw, 2rem);
}
```

当然，我们也可以像前面课程中介绍 `vw` 设置 `font-size` 的方法一样，使用容器查询单位来给卡片组件标题设置`font-size`：

```
/* 视窗单位设置 font-size */
.card__title {
    font-size: clamp(1.2rem, 5vw + 1rem, 3rem);
}
​
/* 容器查询单位设置 font-size */
.card__title {
    font-size: clamp(1.2rem, 5cqi + 1rem, 3rem);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c118fabbe2405e80d87c753319a99a~tplv-k3u1fbpfcp-zoom-1.image)

> 注意，早期的容器查询单位原型是 `q*` 而不是现在的 `cq*` ，所以可能会在早期的一些容器查询单位的 Demo 中看到类似 `qw` 、`qh` 单位，而且很有可能不能正常运行。

接下来看一个容器查询单位的真实案例，这个案例是 [@Scott Kellum](https://codepen.io/scottkellum) 在 [Codepen 上提供的](https://codepen.io/scottkellum/full/jOwmOZE)，我直接 Fork 了一份出来：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cab59d7f46124dd6b829331e90bff594~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNryMVg>

```
html {
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
```

上面示例展示的都是容器查询单位运用于 `font-size` 的属性上，其实容器查询单位和其他长度（`<length>`）类似，只要是可以接受 `<length>` 值的 CSS 属性都可以使用容器查询单位，比如我们熟悉的 `font-size` 、`margin` 、`padding` 、`border-width` 、`background-size` 、`inset` 以及 `gap` 等。

```
.card-grid {
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
@container card-grid (width < 900px) {
    .card-grid__inner {
        --cols: 3;
        gap: 3cqw;
    }
}
​
@container card-grid (width < 600px) {
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
```

## 容器查询的未来：样式查询

你现在知道容器查询是怎么一回事了，但我想你可能还没听说过，在 CSS 中除了媒体查询、容器查询之外，现在又新增了一个 **样式查询（Style Queries）** 。

> [CSS Containment Module Level 3规范](https://drafts.csswg.org/css-contain-3/) （当前还只是工作草案）定义了样式查询。

就在最近，Chrome 团队发布了对**样式查询**的实验性支持。简而言之，**样式查询允许我们查询容器的 CSS 属性或 CSS 自定义属性（CSS 变量）** 。

样式查询仍然处于实验阶段，目前仅在 [Chrome Canary](https://www.google.com/intl/en_sg/chrome/canary/) 中实现。要测试它们，请访问 `chrome://flags` 并激活“Experimental Web Platform features”，将其设置为 `Enabled` 状态：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47a836af66f546ca94e5b2cee223864a~tplv-k3u1fbpfcp-zoom-1.image)

这样你就可以使用样式查询：

```
@container style(border-color: lightblue) {
    button {
        border-color: lightblue;
    }
}
```

理想情况下，上述代码应该可以工作，但是 Chrome Canary 中，当前的样式查询原型仅限于 CSS 变量。样式查询有望在 [Chrome M111](https://groups.google.com/a/chromium.org/g/blink-dev/c/ACL23q_nbK0/m/PaNJ81_qDAAJ?pli=1) 中发布。

现在，我们可以检查变量 `——boxed: true` 是否被添加到容器中，如果是，则可以基于此更改子元素的样式。

```
.card__container {
    --boxed: true;
}
​
@container style(--boxed: true) {
    .card {
        /* CSS ... */
    }
}
```

请看下图。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20d623b746c742deba944b0dbdcca01c~tplv-k3u1fbpfcp-zoom-1.image)

请注意，容器查询和样式查询的主要区别在于，**容器查询用于查询容器尺寸大小，样式查询用于查询容器样式** 。你可能会感到好奇，既然可以查询容器尺寸大小了，为什么还需要查询容器样式呢？

其实，在容器查询中，查询容器尺寸大小，允许我们根据组件的父容器（或祖先容器）的尺寸来控制组件样式，这非常有用。只不过，在某些情况下，我们可能不需要去查询容器尺寸大小，相反的是，我们想要查询容器的计算样式。那么，在这种情况之下，样式查询就会很有用处。

还是拿卡片组件 `Card` 为例吧：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3df7e48361e489ebb91680fc9e78453~tplv-k3u1fbpfcp-zoom-1.image)

我们知道，使用容器查询可以很容易实现上图所示的效果：

```
<div class="card__container">
    <div class="card">
        <figure>
            <img src="" alt="" />
        </figure>
        <h3>Card Ttitle </h3>
        <p>Card Description</p>
    </div>
</div>
```

关键 CSS 代码：

```
.card {
    display: grid;
    grid-template-rows: 300px min-content minmax(0, 1fr);
    grid-template-areas: 
        "thumbnail"
        "title"
        "description";
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
.card > *:not(figure) {
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
@container (width > 400px) {
    .card {
        grid-template-columns: .4fr minmax(0, 1fr) 1rem;
        grid-template-rows: 1rem min-content minmax(0, 1fr) 1rem;
        grid-template-areas:
            "thumbnail    .            ."
            "thumbnail    title        ."
            "thumbnail    description  ."
            "thumbnail    .            .";
        gap: .25rem 1rem;
    }
  
    .card figure {
        border-radius: 6px 0 0 6px;
    }
  
    .card > *:not(figure) {
        padding: 0;
    }
}
​
@container (width > 768px) {
    .card {
        grid-template-columns: auto;
        grid-template-rows: min-content  auto auto min-content;
        grid-template-areas:
            "."
            "title"
            "description"
            ".";
    }
  
    .card figure {
        grid-area: 1 / 1 / -1 / -1;
        max-height: 380px;
        border-radius: 0;
        position: relative;
    }
  
    .card figure::after {
        content: "";
        background: darkorchid;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
        mix-blend-mode: screen;
   }
  
  
    .card > *:not(figure) {
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
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/629754c9cf3d423a93a2ead0e710d2b4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/LYBWWWZ>

我们在上面的示例基础上加入样式查询，比如：

```
.card__container{
    container-type: inline-size;
    --horizontal: true;
    --featured: true;
}
​
@container (width > 400px) and style(--horizontal:true) {
    /* Horizontal Style */
}
​
@container (width > 768px) and style(--featured: true) {
    /* Featured Style */
}
```

卡片组件同时查询了容器尺寸大小和容器样式：

- 容器宽度大于 `400px` ，并且容器中的 `--horizontal` 为 `true` 时，卡片组件会有水平排列的样式；
- 容器宽度大于 `768px` ，并且容器中的 `--featured` 为 `true` 时，卡片组件会有 Featured 样式网格。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad77b85ce7244589967b9cff405f842~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/JjBWNPN> （请使用 Chrome Canary 查看 ）

如果你在 `.card__container` 中将 `--featured` 设置为 `false` ，你会发现卡片组件的 Featured 效果永远不会呈现，即使容器宽度大于 `768px` 也是如此：

```
.card__container{
    container-type: inline-size;
    --horizontal: true;
    --featured: false;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b00300e84bba4508becaaad804280b50~tplv-k3u1fbpfcp-zoom-1.image)

上面示例是容器查询和样式查询组合在一起的。你可能还没有体会到样式查询所起的作用。那我们来看两个纯样式查询的示例。比如下图这个布局效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a313b06ad07f45a387f0ec4aace10310~tplv-k3u1fbpfcp-zoom-1.image)

```
<div class="avatars__container">
    <ul class="avatars">
        <li class="avatar"><img src="" alt="" /></li>
        <!-- 省略其他 li -->
    </ul>
</div>
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
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebe6ef39a73d473281bb306eda6661d0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/abjJWeK> （请使用 Chrome Canary 查看 ）

你可能从上面的示例中体验出样式查询所起的作用了。其实它用于主题切换（比如暗黑模式）、多语言 Web 网站等，会起更大的作用。比如下面这个卡片组件：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b92927579bc7436e9b929903d01eb4c4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/bGjqRrg> （请使用 Chrome Canary 查看 ）

我们在 《[22 | Web 中的向左向右：Flexbox 和 Grid 布局中的 LTR 与 RTL](https://juejin.cn/book/7161370789680250917/section/7161625525763440647)》和《[23 | Web 中的向左向右：Web 布局中 LTR 切换到 RTL 常见错误](https://juejin.cn/book/7161370789680250917/section/7161625415935590436)》有详细介绍过如何实现上图这样的多语言 Web 组件，所以这里就不再重复阐述。我们直接来看，有了样式查询之后，它是如何实现的？

先上 HTML 结构：

```
<div class="card__container" dir="ltr" lang="zh-Hans">
    <div class="card">
        <h3>现代 Web 布局</h3>
        <p>现代 Web 布局中的最后一节课，下一代响应式 Web 设计中的容器响应，就是容器查询！</p>
        <span><svg t="1673340802729" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2667" width="200" height="200"></svg></span>
    </div>
</div>
​
<div class="card__container" dir="rtl" lang="ar">
    <div class="card">
        <h3>تصميم Web الحديثة</h3>
        <p>الدرس الأخير في تصميم Web الحديثة، والجيل التالي من استجابة الحاويات في تصميم Web، هو البحث عن الحاويات!</p>
        <span><svg t="1673340802729" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2667" width="200" height="200"></svg></span>
    </div>
 </div>
```

对于 LTR 的布局，我们可以这样写：

```
.card {
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
        "title       icon"
        "description icon";
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
```

RTL 和 LTR 不同之处是，渐变背景颜色刚好相反，另外 ICON 图标是带有方向性的，因此在 RTL 布局下，需要对其做一个水平镜像处理。我们使用样式查询来完成它：

```
.card__container[dir="rtl"] {
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
```

就这样搞定。你可以想想，如果没有样式查询，会是如何实现？它们有什么样的差异？这两个问题的答案就留给大家自己去寻找和思考了！

## 总结

响应式 Web 设计已经将 Web 带到了今天人们所能接触到的每一个连接的屏幕上。Web 设计师和创意开发者用创造性的思维、大胆的想法和某种无畏的精神探索、测试和迭代他们的想法，使在线体验更有吸引力、更容易访问和更智能，推动了设计方法的发展。就好比这里所提到的组件驱动式 Web 设计。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8114cae1efe94c00a574c4605fc0b410~tplv-k3u1fbpfcp-zoom-1.image)

组件驱动式 Web 设计的到来或者说 CSS 容器查询、样式查询等特性的出现，这些先进的特性使我们有机会从页面布局、全局样式和用户样式中孤立组件样式，从而实现更具弹性的响应式设计。这意味着你现在可以使用基于页面的媒体查询设计宏观布局，包括多屏或折叠屏的细微差异；同时使用基于容器查询给组件设计做微观上布局，并添加基于用户偏好的媒体查询，来实现基于用户的独特偏好和需求的定制化体验。

如果我们将这些组件驱动的功能纳入设计系统，并从整体上改变我们对待 Web 设计的方式，我们就可以利用这些功能以及更多的功能来改善每一个登陆你网站的访问者的用户体验。为用户提供真正个性化的体验，提高参与度和转化率，并最终提高用户对你的品牌的感知。

我们不再是为用户群体设计。我们对 "受众"一词的理解将发生变化，因为内容和体验将为一个人而不是许多人，受众变得高度集中。 组件驱动的响应式 Web 设计将使 Web 真正的可移植，并能适应甚至还没有发明的设备。与其在今天的技术范围内追赶和设计，我们将只为用户设计。
