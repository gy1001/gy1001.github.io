# JavaScript

## 定义(MDN)

JavaScript ( JS ) 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发 Web 页面的脚本语言而出名的，但是它也被用到了很多非浏览器环境中，例如 Node.js、 Apache CouchDB 和 Adobe Acrobat。JavaScript 是一种基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。了解更多 JavaScript。

JavaScript 的标准是 ECMAScript 。截至 2012 年，所有的现代浏览器都完整的支持 ECMAScript 5.1，旧版本的浏览器至少支持 ECMAScript 3 标准。2015 年 6 月 17 日，ECMA 国际组织发布了 ECMAScript 的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为 ECMAScript 6 或者 ES6。自此，ECMAScript 每年发布一次新标准。本文档目前覆盖了最新 ECMAScript 的草案，也就是 ECMAScript2020。

### 广义的定义

JavaScript 是一种脚本，一门编程语言，它可以在网页上实现复杂的功能，网页展现给你的不再是简单的静态信息，而是实时的内容更新，交互式的地图，2D/3D 动画，滚动播放的视频等等。JavaScript 怎能缺席。它是标准 Web 技术蛋糕的第三层，其中 HTML 和 CSS 我们已经在学习中心的其他部分进行了详细的讲解。

- HTML 是一种标记语言，用来结构化我们的网页内容并赋予内容含义，例如定义段落、标题和数据表，或在页面中嵌入图片和视频。
- CSS 是一种样式规则语言，可将样式应用于 HTML 内容， 例如设置背景颜色和字体，在多个列中布局内容。
- JavaScript 是一种脚本语言，可以用来创建动态更新的内容，控制多媒体，制作图像动画，还有很多。（好吧，虽然它不是万能的，但可以通过简短的代码来实现神奇的功能。）

### 它到底可以做什么

客户端（client-side）JavaScript 语言的核心包含一些普遍的编程特性，以让你可以做到如下的事情：

- 在变量中储存有用的值。比如上文的示例中，我们请求客户输入一个新名字，然后将其储存到 name 变量中。
- 操作一段文本（在编程中称为“字符串”（string））。上文的示例中，我们取字符串 "玩家 1："，然后把它和 name 变量连结起来，创造出完整的文本标签，比如："玩家 1：小明"。
- 运行代码以响应网页中发生的特定事件。上文的示例中，我们用一个 click (en-US) 事件来检测按钮什么时候被点击，然后运行代码更新文本标签。
- 以及更多！

**浏览器 API** 内建于 web 浏览器中，它们可以将数据从周边计算机环境中筛选出来，还可以做实用的复杂工作。例如：

- **文档对象模型 API（DOM（Document Object Model）API）** 能通过创建、移除和修改 HTML，为页面动态应用新样式等手段来操作 HTML 和 CSS。比如当某个页面出现了一个弹窗，或者显示了一些新内容（像上文小 demo 中看到那样），这就是 DOM 在运行。

* **地理位置 API（Geolocation API）** 获取地理信息。这就是为什么 谷歌地图 可以找到你的位置，而且标示在地图上。
* **画布（Canvas） 和 WebGL API** 可以创建生动的 2D 和 3D 图像。人们正运用这些 web 技术制作令人惊叹的作品。参见 Chrome Experiments 以及 webglsamples。
* **诸如 HTMLMediaElement 和 WebRTC** 等 影音类 API 让你可以利用多媒体做一些非常有趣的事，比如在网页中直接播放音乐和影片，或用自己的网络摄像头获取录像，然后在其他人的电脑上展示（试用简易版 截图 demo 以理解这个概念）。

**第三方 API** 并没有默认嵌入浏览器中，一般要从网上取得它们的代码和信息。比如：

- Twitter API、新浪微博 API 可以在网站上展示最新推文之类。

* 谷歌地图 API、高德地图 API 可以在网站嵌入定制的地图等等。

## JavaScript 在页面上做了什么？

浏览器在读取一个网页时，代码（HTML, CSS 和 JavaScript）将在一个运行环境（浏览器标签页）中得到执行。就像一间工厂，将原材料（代码）加工为一件产品（网页）。

在 HTML 和 CSS 集合组装成一个网页后，浏览器的 JavaScript 引擎将执行 JavaScript 代码。**这保证了当 JavaScript 开始运行之前，网页的结构和样式已经就位。**

这样很好，因为 JavaScript 最普遍的用处是通过 DOM API（见上文）动态修改 HTML 和 CSS 来更新用户界面 （user interface）。如果 JavaScript 在 HTML 和 CSS 就位之前加载运行，就会引发错误。

## 浏览器安全

每个浏览器标签页就是其自身用来运行代码的独立容器（这些容器用专业术语称为“运行环境”）。大多数情况下，**每个标签页中的代码完全独立运行，而且一个标签页中的代码不能直接影响另一个标签页（或者另一个网站）中的代码**。这是一个好的安全措施，如果不这样，黑客就可以从其他网站盗取信息，等等。

## 代码的几种分类

### 解释代码 vs 编译代码

**解释（interpret）**：在解释型语言中，代码自上而下运行，且实时返回运行结果。代码在由浏览器执行前，不需要将其转化为其他形式。代码将直接以文本格式（text form）被接收和处理。

**编译(compile)**：编译型语言需要先将代码转化（编译）成另一种形式才能运行。比如 C/C++ 先被编译成汇编语言，然后才能由计算机运行。程序将以二进制的格式运行，这些二进制内容是由程序源代码产生的

JavaScript 是轻量级解释型语言。浏览器接受到 JavaScript 代码，并以代码自身的文本格式运行它。技术上，几乎所有 JavaScript 转换器都运用了一种叫做即时编译（just-in-time compiling）的技术；当 JavaScript 源代码被执行时，它会被编译成二进制的格式，使代码运行速度更快。尽管如此，JavaScript 仍然是一门解释型语言，因为编译过程发生在代码运行中，而非之前。

### 服务器端代码 vs 客户端代码

客户端代码是在用户的电脑上运行的代码，在浏览一个网页时，它的客户端代码就会被下载，然后由浏览器来运行并展示。这就是客户端 JavaScript。

而服务器端代码在服务器上运行，接着运行结果才由浏览器下载并展示出来。流行的服务器端 web 语言包括：PHP、Python、Ruby、ASP.NET 以及...... JavaScript！JavaScript 也可用作服务器端语言，比如现在流行的 Node.js 环境，

### 动态代码 vs 静态代码

“动态”一词既适用于客户端 JavaScript，又适用于描述服务器端语言。是指通过按需生成新内容来更新 web 页面 / 应用，使得不同环境下显示不同内容。服务器端代码会在服务器上动态生成新内容，例如从数据库中提取信息。而客户端 JavaScript 则在用户端浏览器中动态生成新内容，比如说创建一个新的 HTML 表格，用从服务器请求到的数据填充，然后在网页中向用户展示这个表格。两种情况的意义略有不同，但又有所关联，且两者（服务器端和客户端）经常协同作战。

没有动态更新内容的网页叫做“静态”页面，所显示的内容不会改变。

## 怎样向页面添加 JavaScript？

可以像添加 CSS 那样将 JavaScript 添加到 HTML 页面中。CSS 使用 <link> 元素链接外部样式表，使用 `<style>` 元素向 HTML 嵌入内部样式表，JavaScript 这里只需一个元素——`<script>`。我们来看看它是怎么工作的。

### 内部 JavaScript

在 `<script>` 元素中添加一些 JavaScript 代码，这个页面就能做一些更有趣的事。

### 外部 JavaScript

```javascript
<script src='script.js' async></script>
```

### 内联 JavaScript 处理器

```html
<button onclick="createParagraph()">点我呀</button>
<script>
	function createParagraph() {
		const para = document.createElement('p')
		para.textContent = '你点击了这个按钮！'
		document.body.appendChild(para)
	}
</script>
```

**然而请不要这样做。 这将使 JavaScript 污染到 HTML，而且效率低下。**

## 脚本调用策略

要让脚本调用的时机符合预期，需要解决一系列的问题。这里看似简单，实际大有文章。最常见的问题就是：HTML 元素是按其在页面中出现的次序调用的，如果用 JavaScript 来管理页面上的元素（更精确的说法是使用 文档对象模型 DOM），若 JavaScript 加载于欲操作的 HTML 元素之前，则代码将出错。

在上文的“内部”、“外部”示例中，JavaScript 调用于文档头处，解析 HTML 文档体之前。这样做是有隐患的，需要使用一些结构来避免错误发生。

```javascript
// 这是一个事件监听器，它监听浏览器的 "DOMContentLoaded" 事件，
// 即 HTML 文档体加载、解释完毕事件。事件触发时将调用 " . . ." 处的代码，
// 从而避免了错误发生（事件 的概念稍后学习）。
document.addEventListener("DOMContentLoaded", function() {
  . . .
});
```

解决此问题的旧方法是：把脚本元素放在文档体的底端（`</body>` 标签之前，与之相邻），这样脚本就可以在 HTML 解析完毕后加载了。此方案（以及上述的 DOMContentLoaded 方案）的问题是：只有在所有 HTML DOM 加载完成后才开始脚本的加载/解析过程。对于有大量 JavaScript 代码的大型网站，可能会带来显著的性能损耗。这也是 async 属性诞生的初衷。

### async 和 defer

浏览器遇到 **async** 脚本时不会阻塞页面渲染，而是直接下载然后运行。这样脚本的运行次序就无法控制，只是脚本不会阻止剩余页面的显示。当页面的脚本之间彼此独立，且不依赖于本页面的其它任何脚本时，async 是最理想的选择。

解决这按顺序加载可以使用 defer 属性，脚本将按照在页面中出现的顺序加载和运行：

**脚本调用策略小结：**

1. 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。
2. 如果脚本需要等待页面解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中。

## 发展历史

1994 年 12 月，Navigator 发布了 1.0 版浏览器，市场份额一举超过 90%。
Netscape 公司很快发现，Navigator 浏览器需要一种可以嵌入网页的脚本语言，用来控制浏览器行为。当时，网速很慢而且上网费很贵，有些操作不宜在服务器端完成。比如，如果用户忘记填写“用户名”，就点了“发送”按钮，到服务器再发现这一点就有点太晚了，最好能在用户发出数据之前，就告诉用户“请填写用户名”。这就需要在网页中嵌入小程序，让浏览器检查每一栏是否都填写了。

1995 年 5 月，Brendan Eich 只用了 10 天，就设计完成了这种语言的第一版。它是一个大杂烩，语法有多个来源。

- 基本语法：借鉴 C 语言和 Java 语言。
- 数据结构：借鉴 Java 语言，包括将值分成原始值和对象两大类。
- 函数的用法：借鉴 Scheme 语言和 Awk 语言，将函数当作第一等公民，并引入闭包。
- 原型继承模型：借鉴 Self 语言（Smalltalk 的一种变种）。
- 正则表达式：借鉴 Perl 语言。
- 字符串和数组处理：借鉴 Python 语言。

> 为了保持简单，这种脚本语言缺少一些关键的功能，比如块级作用域、模块、子类型（subtyping）等等，但是可以利用现有功能找出解决办法。这种功能的不足，直接导致了后来 JavaScript 的一个显著特点：对于其他语言，你需要学习语言的各种功能，而对于 JavaScript，你常常需要学习各种解决问题的模式。而且由于来源多样，从一开始就注定，JavaScript 的编程风格是函数式编程和面向对象编程的一种混合体

1995 年 12 月 4 日，Netscape 公司与 Sun 公司联合发布了 JavaScript 语言，对外宣传 JavaScript 是 Java 的补充，属于轻量级的 Java，专门用来操作网页。

1996 年 3 月，Navigator 2.0 浏览器正式内置了 JavaScript 脚本语言。

### JavaScript 与 Java 的关系

它们是两种不一样的语言，但是彼此存在联系。

JavaScript 的基本语法和对象体系，是模仿 Java 而设计的。但是，JavaScript 没有采用 Java 的静态类型。正是因为 JavaScript 与 Java 有很大的相似性，所以这门语言才从一开始的 LiveScript 改名为 JavaScript。基本上，JavaScript 这个名字的原意是“很像 Java 的脚本语言”。

JavaScript 语言的函数是一种独立的数据类型，以及采用基于原型对象（prototype）的继承链。这是它与 Java 语法最大的两点区别。JavaScript 语法要比 Java 自由得多。

另外，Java 语言需要编译，而 JavaScript 语言则是运行时由解释器直接执行。

总之，JavaScript 的原始设计目标是一种小型的、简单的动态语言，与 Java 有足够的相似性，使得使用者（尤其是 Java 程序员）可以快速上手。

### JavaScript 与 ECMAScript 的关系

1996 年 8 月，微软模仿 JavaScript 开发了一种相近的语言，取名为 JScript（JavaScript 是 Netscape 的注册商标，微软不能用），首先内置于 IE 3.0。Netscape 公司面临丧失浏览器脚本语言的主导权的局面。

1996 年 11 月，Netscape 公司决定将 JavaScript 提交给国际标准化组织 ECMA（European Computer Manufacturers Association），希望 JavaScript 能够成为国际标准，以此抵抗微软。ECMA 的 39 号技术委员会（Technical Committee 39）负责制定和审核这个标准，成员由业内的大公司派出的工程师组成，目前共 25 个人。该委员会定期开会，所有的邮件讨论和会议记录，都是公开的。

1997 年 7 月，ECMA 组织发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript。这个版本就是 ECMAScript 1.0 版。之所以不叫 JavaScript，一方面是由于商标的关系，Java 是 Sun 公司的商标，根据一份授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 已经被 Netscape 公司注册为商标，另一方面也是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。

ECMAScript 只用来标准化 JavaScript 这种语言的基本语法结构，与部署环境相关的标准都由其他标准规定，比如 DOM 的标准就是由 W3C 组织（World Wide Web Consortium）制定的。

ECMA-262 标准后来也被另一个国际标准化组织 ISO（International Organization for Standardization）批准，标准号是 ISO-16262。

### JavaScript 的版本

1997 年 7 月，ECMAScript 1.0 发布。

1998 年 6 月，ECMAScript 2.0 版发布。

1999 年 12 月，ECMAScript 3.0 版发布，成为 JavaScript 的通行标准，得到了广泛支持。

2007 年 10 月，ECMAScript 4.0 版草案发布，对 3.0 版做了大幅升级，预计次年 8 月发布正式版本。草案发布后，由于 4.0 版的目标过于激进，各方对于是否通过这个标准，发生了严重分歧。以 Yahoo、Microsoft、Google 为首的大公司，反对 JavaScript 的大幅升级，主张小幅改动；以 JavaScript 创造者 Brendan Eich 为首的 Mozilla 公司，则坚持当前的草案。

2008 年 7 月，由于对于下一个版本应该包括哪些功能，各方分歧太大，争论过于激进，ECMA 开会决定，中止 ECMAScript 4.0 的开发（即废除了这个版本），将其中涉及现有功能改善的一小部分，发布为 ECMAScript 3.1，而将其他激进的设想扩大范围，放入以后的版本，由于会议的气氛，该版本的项目代号起名为 Harmony（和谐）。会后不久，ECMAScript 3.1 就改名为 ECMAScript 5。

2009 年 12 月，ECMAScript 5.0 版 正式发布。Harmony 项目则一分为二，一些较为可行的设想定名为 JavaScript.next 继续开发，后来演变成 ECMAScript 6；一些不是很成熟的设想，则被视为 JavaScript.next.next，在更远的将来再考虑推出。TC39 的总体考虑是，ECMAScript 5 与 ECMAScript 3 基本保持兼容，较大的语法修正和新功能加入，将由 JavaScript.next 完成。当时，JavaScript.next 指的是 ECMAScript 6。第六版发布以后，将指 ECMAScript 7。TC39 预计，ECMAScript 5 会在 2013 年的年中成为 JavaScript 开发的主流标准，并在此后五年中一直保持这个位置。

2011 年 6 月，ECMAScript 5.1 版发布，并且成为 ISO 国际标准（ISO/IEC 16262:2011）。到了 2012 年底，所有主要浏览器都支持 ECMAScript 5.1 版的全部功能。

2013 年 3 月，ECMAScript 6 草案冻结，不再添加新功能。新的功能设想将被放到 ECMAScript 7。

2013 年 12 月，ECMAScript 6 草案发布。然后是 12 个月的讨论期，听取各方反馈。

2015 年 6 月，ECMAScript 6 正式发布，并且更名为“ECMAScript 2015”。这是因为 TC39 委员会计划，以后每年发布一个 ECMAScript 的版本，下一个版本在 2016 年发布，称为“ECMAScript 2016”，2017 年发布“ECMAScript 2017”，以此类推。

### 周边大事记

JavaScript 伴随着互联网的发展一起发展。互联网周边技术的快速发展，刺激和推动了 JavaScript 语言的发展。下面，回顾一下 JavaScript 的周边应用发展。

1996 年，样式表标准 CSS 第一版发布。

1997 年，DHTML（Dynamic HTML，动态 HTML）发布，允许动态改变网页内容。这标志着 DOM 模式（Document Object Model，文档对象模型）正式应用。

1998 年，Netscape 公司开源了浏览器，这导致了 Mozilla 项目的诞生。几个月后，美国在线（AOL）宣布并购 Netscape。

1999 年，IE 5 部署了 XMLHttpRequest 接口，允许 JavaScript 发出 HTTP 请求，为后来大行其道的 Ajax 应用创造了条件。

2000 年，KDE 项目重写了浏览器引擎 KHTML，为后来的 WebKit 和 Blink 引擎打下基础。这一年的 10 月 23 日，KDE 2.0 发布，第一次将 KHTML 浏览器包括其中。

2001 年，微软公司时隔 5 年之后，发布了 IE 浏览器的下一个版本 Internet Explorer 6。这是当时最先进的浏览器，它后来统治了浏览器市场多年。

2001 年，Douglas Crockford 提出了 JSON 格式，用于取代 XML 格式，进行服务器和网页之间的数据交换。JavaScript 可以原生支持这种格式，不需要额外部署代码。

2002 年，Mozilla 项目发布了它的浏览器的第一版，后来起名为 Firefox。

2003 年，苹果公司发布了 Safari 浏览器的第一版。

2004 年，Google 公司发布了 Gmail，促成了互联网应用程序（Web Application）这个概念的诞生。由于 Gmail 是在 4 月 1 日发布的，很多人起初以为这只是一个玩笑。

2004 年，Dojo 框架诞生，为不同浏览器提供了同一接口，并为主要功能提供了便利的调用方法。这标志着 JavaScript 编程框架的时代开始来临。

2004 年，WHATWG 组织成立，致力于加速 HTML 语言的标准化进程。

2005 年，苹果公司在 KHTML 引擎基础上，建立了 WebKit 引擎。

2005 年，Ajax 方法（Asynchronous JavaScript and XML）正式诞生，Jesse James Garrett 发明了这个词汇。它开始流行的标志是，2 月份发布的 Google Maps 项目大量采用该方法。它几乎成了新一代网站的标准做法，促成了 Web 2.0 时代的来临。

2005 年，Apache 基金会发布了 CouchDB 数据库。这是一个基于 JSON 格式的数据库，可以用 JavaScript 函数定义视图和索引。它在本质上有别于传统的关系型数据库，标识着 NoSQL 类型的数据库诞生。

2006 年，jQuery 函数库诞生，作者为 John Resig。jQuery 为操作网页 DOM 结构提供了非常强大易用的接口，成为了使用最广泛的函数库，并且让 JavaScript 语言的应用难度大大降低，推动了这种语言的流行。

2006 年，微软公司发布 IE 7，标志重新开始启动浏览器的开发。

2006 年，Google 推出 Google Web Toolkit 项目（缩写为 GWT），提供 Java 编译成 JavaScript 的功能，开创了将其他语言转为 JavaScript 的先河。

2007 年，Webkit 引擎在 iPhone 手机中得到部署。它最初基于 KDE 项目，2003 年苹果公司首先采用，2005 年开源。这标志着 JavaScript 语言开始能在手机中使用了，意味着有可能写出在桌面电脑和手机中都能使用的程序。

2007 年，Douglas Crockford 发表了名为《JavaScript: The good parts》的演讲，次年由 O'Reilly 出版社出版。这标志着软件行业开始严肃对待 JavaScript 语言，对它的语法开始重新认识。

2008 年，V8 编译器诞生。这是 Google 公司为 Chrome 浏览器而开发的，它的特点是让 JavaScript 的运行变得非常快。它提高了 JavaScript 的性能，推动了语法的改进和标准化，改变外界对 JavaScript 的不佳印象。同时，V8 是开源的，任何人想要一种快速的嵌入式脚本语言，都可以采用 V8，这拓展了 JavaScript 的应用领域。

2009 年，Node.js 项目诞生，创始人为 Ryan Dahl，它标志着 JavaScript 可以用于服务器端编程，从此网站的前端和后端可以使用同一种语言开发。并且，Node.js 可以承受很大的并发流量，使得开发某些互联网大规模的实时应用变得容易。

2009 年，Jeremy Ashkenas 发布了 CoffeeScript 的最初版本。CoffeeScript 可以被转换为 JavaScript 运行，但是语法要比 JavaScript 简洁。这开启了其他语言转为 JavaScript 的风潮。

2009 年，PhoneGap 项目诞生，它将 HTML5 和 JavaScript 引入移动设备的应用程序开发，主要针对 iOS 和 Android 平台，使得 JavaScript 可以用于跨平台的应用程序开发。

2009，Google 发布 Chrome OS，号称是以浏览器为基础发展成的操作系统，允许直接使用 JavaScript 编写应用程序。类似的项目还有 Mozilla 的 Firefox OS。

2010 年，三个重要的项目诞生，分别是 NPM、BackboneJS 和 RequireJS，标志着 JavaScript 进入模块化开发的时代。

2011 年，微软公司发布 Windows 8 操作系统，将 JavaScript 作为应用程序的开发语言之一，直接提供系统支持。

2011 年，Google 发布了 Dart 语言，目的是为了结束 JavaScript 语言在浏览器中的垄断，提供更合理、更强大的语法和功能。Chromium 浏览器有内置的 Dart 虚拟机，可以运行 Dart 程序，但 Dart 程序也可以被编译成 JavaScript 程序运行。

2011 年，微软工程师 Scott Hanselman 提出，JavaScript 将是互联网的汇编语言。因为它无所不在，而且正在变得越来越快。其他语言的程序可以被转成 JavaScript 语言，然后在浏览器中运行。

2012 年，单页面应用程序框架（single-page app framework）开始崛起，AngularJS 项目和 Ember 项目都发布了 1.0 版本。

2012 年，微软发布 TypeScript 语言。该语言被设计成 JavaScript 的超集，这意味着所有 JavaScript 程序，都可以不经修改地在 TypeScript 中运行。同时，TypeScript 添加了很多新的语法特性，主要目的是为了开发大型程序，然后还可以被编译成 JavaScript 运行。

2012 年，Mozilla 基金会提出 asm.js 规格。asm.js 是 JavaScript 的一个子集，所有符合 asm.js 的程序都可以在浏览器中运行，它的特殊之处在于语法有严格限定，可以被快速编译成性能良好的机器码。这样做的目的，是为了给其他语言提供一个编译规范，使其可以被编译成高效的 JavaScript 代码。同时，Mozilla 基金会还发起了 Emscripten 项目，目标就是提供一个跨语言的编译器，能够将 LLVM 的位代码（bitcode）转为 JavaScript 代码，在浏览器中运行。因为大部分 LLVM 位代码都是从 C / C++ 语言生成的，这意味着 C / C++ 将可以在浏览器中运行。此外，Mozilla 旗下还有 LLJS （将 JavaScript 转为 C 代码）项目和 River Trail （一个用于多核心处理器的 ECMAScript 扩展）项目。目前，可以被编译成 JavaScript 的语言列表，共有将近 40 种语言。

2013 年，Mozilla 基金会发布手机操作系统 Firefox OS，该操作系统的整个用户界面都使用 JavaScript。

2013 年，ECMA 正式推出 JSON 的国际标准，这意味着 JSON 格式已经变得与 XML 格式一样重要和正式了。

2013 年 5 月，Facebook 发布 UI 框架库 React，引入了新的 JSX 语法，使得 UI 层可以用组件开发，同时引入了网页应用是状态机的概念。

2014 年，微软推出 JavaScript 的 Windows 库 WinJS，标志微软公司全面支持 JavaScript 与 Windows 操作系统的融合。

2014 年 11 月，由于对 Joyent 公司垄断 Node 项目、以及该项目进展缓慢的不满，一部分核心开发者离开了 Node.js，创造了 io.js 项目，这是一个更开放、更新更频繁的 Node.js 版本，很短时间内就发布到了 2.0 版。三个月后，Joyent 公司宣布放弃对 Node 项目的控制，将其转交给新成立的开放性质的 Node 基金会。随后，io.js 项目宣布回归 Node，两个版本将合并。

2015 年 3 月，Facebook 公司发布了 React Native 项目，将 React 框架移植到了手机端，可以用来开发手机 App。它会将 JavaScript 代码转为 iOS 平台的 Objective-C 代码，或者 Android 平台的 Java 代码，从而为 JavaScript 语言开发高性能的原生 App 打开了一条道路。

2015 年 4 月，Angular 框架宣布，2.0 版将基于微软公司的 TypeScript 语言开发，这等于为 JavaScript 语言引入了强类型。

2015 年 5 月，Node 模块管理器 NPM 超越 CPAN，标志着 JavaScript 成为世界上软件模块最多的语言。

2015 年 5 月，Google 公司的 Polymer 框架发布 1.0 版。该项目的目标是生产环境可以使用 WebComponent 组件，如果能够达到目标，Web 开发将进入一个全新的以组件为开发基础的阶段。

2015 年 6 月，ECMA 标准化组织正式批准了 ECMAScript 6 语言标准，定名为《ECMAScript 2015 标准》。JavaScript 语言正式进入了下一个阶段，成为一种企业级的、开发大规模应用的语言。这个标准从提出到批准，历时 10 年，而 JavaScript 语言从诞生至今也已经 20 年了。

2015 年 6 月，Mozilla 在 asm.js 的基础上发布 WebAssembly 项目。这是一种 JavaScript 引擎的中间码格式，全部都是二进制，类似于 Java 的字节码，有利于移动设备加载 JavaScript 脚本，执行速度提高了 20+ 倍。这意味着将来的软件，会发布 JavaScript 二进制包。

2016 年 6 月，《ECMAScript 2016 标准》发布。与前一年发布的版本相比，它只增加了两个较小的特性。

2017 年 6 月，《ECMAScript 2017 标准》发布，正式引入了 async 函数，使得异步操作的写法出现了根本的变化。

2017 年 11 月，所有主流浏览器全部支持 WebAssembly，这意味着任何语言都可以编译成 JavaScript，在浏览器运行。

## 参考链接

[MDN-JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

[JavaScript 语言的历史](https://wangdoc.com/javascript/basic/history.html)

<CommentService />
