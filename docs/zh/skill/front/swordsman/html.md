# HTML

## 定义

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML): HTML（超文本标记语言——HyperText Markup Language）是构成 Web 世界的一砖一瓦。它定义了网页内容的含义和结构。除 HTML 以外的其它技术则通常用来描述一个网页的表现与展示效果（如 CSS），或功能与行为（如 JavaScript）。

所谓超文本，大家应该能联想到超，即超出文本，那超文本比我们的文本更高一级，它里面包含了我们常见的音频、视频以及超链接等。

## HTML 的历史发展过程

- HTML 1.0：在 1993 年 6 月作为互联网工程工作小组(IETF)工作草案发布,由此超文本标记语言第一版诞生。
- HTML 2.0：1995 年 1 1 月作为 RFC 1866 发布，于 2000 年 6 月发布之后被宣布已经过时。
- HTML 3.2：1997 年 1 月 14 日，W3C 推荐标准。
- HTML 4.0：1997 年 12 月 18 日，W3C 推荐标准。
- HTML 4.01（微小改进）：1999 年 12 月 24 日，W3C 推荐标准。
- HTML 5：HTML5 是公认的下一代 Web 语言，极大地提升了 Web 在富媒体、富内容和富应用等方面的能力，被喻为终将改变移动互联网的重要推手。 2014 年 10 月 28 日，W3C 推荐标准。

HTML5 的诞生，标记着互联玩时代的发展，比如所 HTML5 里面诞生的音频、视频、图像、动画等都做了新的标准，它对于浏览器的兼容也是得到了一定的处理，由此可见，HTML 的整个历史发展目前为止我们所使用的版本主要是 99 年诞生的 HTML 4.01 以及 2014 年诞生的 HTML5。

## HTML 的特点

超级文本标记语言(HTML)文档的制作其实不是很复杂，但其功能非常强大，且支持不同数据格式的文件镶入，其主要特点如下：

- 简易性：超级文本标记语言版本升级采用超集方式，从而更加灵活方便。
- 可扩展性：超级文本标记语言的广泛应用带来了加强功能，增加标识符等要求，超级文本标记语言采取子类元素的方式，为系统扩展带来保证。
- 平台无关性：虽然个人计算机有各式各样，但使用 MAC 等其他机器的大有人在，超级文本标记语言可以使用在广泛的平台上，这也是万维网（WWW）盛行的另一个原因。
- 通用性：HTML 是网络的通用语言，一种简单、通用的全置标记语言。它允许网页制作人建立文本与图片相结合的复杂页面，这些页面可以被网上任何其他人浏览到，无论使用的是什么类型的电脑或浏览器。

## 常见的标签

```html
HTML 使用“标记”（markup）来注明文本、图片和其他内容，以便于在 Web 浏览器中显示。
HTML 标记包含一些特殊“元素”如
<head>，<title>，<body>，<header>，<footer>，> <article><section>，
<p>，<div>，<span>，<img>，<aside>，<audio>，<canvas>，<datalist>，
<details>，<embed>，<nav>，<output>，<progress>，<video>
等等等等。
```

## 语义化标签

语义化标签替代了之前的满屏的 div 元素，更加直观的表现出了网页结构，当多人合作或者回看自己写的页面时，就很容易体现出这一特点
除此之外，语义化标签的作用一共大体有这几大点：

1. 优化了代码结构，在不看 css 的情况下，也能够呈现出很好的内容结构
2. 爬虫依赖标签来确定关键字的权重，更多的语义化标签，帮助爬虫抓取更多的有效信息，也增加了页面权重
3. 增加了无障碍阅读的体验，让每一部分都附有其意义

常见的语意化标签如下

### article

**页面独立的内容区域**

作用：

1.  表示的是一个文档、页面、应用或是网站中的一个独立的容器。
2.  HTML5 规范声明 article 标签适用于自包含的窗口小部件:股票行情，计算器，钟表，天气窗口小部件等。
3.  article 标签可以嵌套使用，但他们必须是部分与整体的关系

### aside

**页面的侧边栏内容**

1. 表示一部分内容与页面的主体并没有较大的关系，并且可以独立存在。
2. 实现比如升式引用、侧边栏、相关文章的链接、广告、友情链接等功能。

### bdi

**允许您设置一段文本，使其脱离其父元素的文本方向设置。**

1. bdi 指的是 bidi 隔离（Bi-directional Isolation）。
2. bdi 标签允许您设置一段文本，使其脱离其父元素的文本方向设置。
3. 在发布用户评论或其他您无法完全控制的内容时，该标签很有用。
4. bdi 标签是 HTML5 中的新标签。

```html
// 比如我们设置了文字方向是从右向左的，但是姓名是从左到右。 // 有三个值可以选择: rtl ltr auto

<bdo dir="rtl"><bdi style="color:red">李四：</bdi>大家好我是李四！！！</bdo>

效果：（在发布用户评论或其他您无法完全控制的内容时，该标签很有用） !!!四李：大家好我是李四！！！
```

### details

用于描述文档或文档某个部分的细节

### summary

标签包含 details 元素的标题

```html
<details>
	<summary>Epcot Center</summary>
	<p>
		Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions,
		award-winning fireworks and seasonal special events.
	</p>
</details>
```

### dialog

对话框，比如提示框

> [**`open`**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog#attr-open) 指示这个对话框是激活的和能互动的。当这个 `open` 特性没有被设置，对话框不应该显示给用户。

```html
<dialog open>
	<p>Greetings, one and all!</p>
</dialog>
```

### figure

figure 元素代表一段独立的内容，经常与说明（caption）figcaption 配合使用，并且作为一个独立的引用单元。当它属于主内容流（main flow）时，它的位置独立于主体。这个标签经常是在主文中引用的图片，插图，表格，代码段等等，当这部分转移到附录中或者其他页面时不会影响到主体。

```html
<figure>
	<img
		src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg"
		alt="Elephant at sunset"
	/>
	<figcaption>An elephant at sunset</figcaption>
</figure>
```

使用说明

- 通常，`<figure>`是图像，插图，图表，代码片段等，在文档的主流程中引用，但可以移动到文档的另一部分或附录而不影响主流程。
- 作为[sectioning root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#sectioning_roots)，`<figure>`元素的内容轮廓将从文档的主要轮廓中排除。
- 通过在其中插入[figure](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption)（作为第一个或最后一个子元素），可以将标题与`<figure>`元素相关联。图中找到的第一个`<figcaption>`元素显示为图的标题。

### figcaption

> figure 元素的标题

### footer

section 或 document 的页脚。

**和 `<header>` 标签对应，可以实现比如附录、索引、版权页、许可协议等功能。**

### header

文档的头部区域

**HTML5 规范描述为“**一组解释性或导航型性的条目**”，通常有网站标志、主导航、全站链接以及搜索框。**

### mark

带有记号的文本。

```html
<p>&lt;mark&gt; 元素用于 <mark>高亮</mark> 文本</p>
```

### meter

**`<meter>元素用来显示已知范围的标量值或者分数值。`**

属性： value、min、max、low、high、optimum、form

### nav

导航链接的部分。

1. 页面的导航链接区域，用于定义页面的主要**导航**部分。
2. 导航通常使用 **`<ul>`** 无序列表。若是面包屑链接，则使用 **`<ol>`** 有序列表。
3. HTML5 规范不推荐对辅助页脚链接使用 nav，除非页脚再次显示顶级全局导航、或者是招聘信息等重要链接。

### progress

任何类型的任务的进度(进度指示元素)。

属性：max、value

```html
<progress value="70" max="100">70 %</progress>
```

### ruby

**HTML `<ruby>` 元素**的意思是旁註標記。旁註標記用於標示東亞文字的發音。

```html
<ruby> 漢 <rp>(</rp><rt>Kan</rt><rp>)</rp> 字 <rp>(</rp><rt>ji</rt><rp>)</rp> </ruby>
```

### rt

**HTML Ruby 文本 (`<rt>`) 元素**包含字符的发音，字符在 ruby 注解中出现，它用于描述东亚字符的发音。这个元素始终在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ruby) 元素中使用。

### rp

**HTML `<rp>` 元素**用于为那些不能使用 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ruby) 元素展示 ruby 注解的浏览器，提供随后的圆括号

### section

**HTML `<section>`元素**表示一个包含在 HTML 文档中的独立部分，它没有更具体的语义元素来表示，一般来说会有包含一个标题。

给定文档中可以包含多篇文章;例如，阅读器在博客上滚动时一个接一个地显示每篇文章的文本，每个帖子将包含在`<article>`元素中，可能包含一个或多个`<section>`。

- 每个`<article>`，通常包括标题（`<h1> - <h6>`元素）作为`<article>`元素的子元素。
- 当`<article>`元素嵌套使用时，则该元素代表与外层元素有关的文章。例如，代表博客评论的`<article>`元素可嵌套在代表博客文章的`<article>`元素中。
- `<article>`元素的作者信息可通过[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address)元素提供，但是不适用于嵌套的`<article>`元素。
- `<article>`元素的发布日期和时间可通过[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time)元素的[`pubdate`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time#attr-pubdate)属性表示。
- 可以使用[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素的[`datetime`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time#attr-datetime)属性来描述`<article>`元素的发布日期和时间。请注意[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time)的*[`pubdate`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time#attr-pubdate)* 属性不再是*[W3C (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/W3C)* *[HTML5](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML5)*标准。

### time

HTML _time_ 标签 (`<time>`) 用来表示 24 小时制时间或者[公历日期](http://en.wikipedia.org/wiki/Gregorian_calendar)，若表示日期则也可包含时间和时区。

如果**未定义** datetime 属性，则必须在元素的内容中规定日期或时间。

属性：datetime、pubdate

```html
<p>The concert starts at <time>20:00</time>.</p>
```

### wbr

**HTML `<wbr>` 元素** — 一个文本中的位置，其中浏览器可以选择来换行，虽然它的换行规则可能不会在这里换行。

## 参考文献

[博客园-HTML 的简介和历史发展过程](https://www.cnblogs.com/zyx110/p/13113457.html)

[前端面试题-HTML 语义化标签](https://segmentfault.com/a/1190000013901244)

[MDN-HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

<CommentService />
