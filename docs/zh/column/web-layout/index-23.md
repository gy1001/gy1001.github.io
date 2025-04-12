# 23-Web 中的向左向右：Web 布局中 LTR 切换到 RTL 常见错误

通过上节课的学习，我想你已经知道了，构建一个多语言的 Web 网站或应用，离不开对语言的书写模式、阅读模式、CSS 逻辑属性等特性，同时也知道了 CSS Flexbox 和 CSS Grid 布局都是基于文档书写模式设计，天然地能实现 LTR 和 RTL 的翻转设计。

构建一个多语言的 Web 布局，它所涉及的不仅是 LTR 和 RTL 的翻转设计，其中还会涉及很多其他的布局、排版、设计等相关知识。这节课，主要和大家一起探讨 Web 布局中 LTR 切换到 RTL 常见的错误以及一些设计上需要注意的细节，希望能帮助大家从设计阶段就构建好一个多语言的 Web 网站或应用。

## 字间距 letter-spacing

在 CSS 中，我们可以通过 `letter-spacing` 属性来给英文字母间增加间距（它也被称为**活版印刷跟踪** ）。比如下图所示：

![img](./assets/7e1348ba9b8543369fa4489307b214b1~tplv-k3u1fbpfcp-zoom-1.jpeg)

上图中的第二行使用了 `letter-spacing` 给字母间增加了间距，它看起来是正常的。但是，如果将相同的 `letter-spacing` 样式添加到阿拉伯语系的内容中，效果看起来就会非常的奇怪。比如下面这个示例：

```
[dir="ltr"] .media {
    letter-spacing: 4px;
}
```

![img](./assets/4fd2e6bab00a4ef8ac6bf24c35bf867c~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/wvXOQjB>

正如上图所示，设置 `letter-spacing` 的阿拉伯语中每个单词的字母看起来彼此不相连。这是不正确的。阿拉伯字母看起来应该是连在一起的（像上图中 `letter-spacing: normal` 的那样），而英文（拉丁语体系）中使用 `letter-spacing` 增加字母之间间距，对于阅读体验来说是更佳的。

```
[dir="ltr"] {
    letter-spacing: 1px;
}
​
[dir="rtl"] {
    letter-spacing: 0;
}
```

![img](./assets/2ef8d81c74564efb8603be3675e9d7b9~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/oNyVQJQ>

因此，**在阿拉伯语中（RTL）中应该确保** **`letter-spacing`** **的值为** **`0`**。

## 文本的透明度

在 Web 开发中，给文本增加一定的透明度是很常见的一种行为。这在拉丁语体系（比如英语）和汉语体系（比如中文）都是可行的。然而，当内容是阿拉伯语体系（比如阿拉伯文）时，渲染出来的文本会给人一种怪怪的感觉：

![img](./assets/5348c9b9ad18461cb4c66b7912d64ea2~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/eYKXbJM>

你会发现字母之间有一些不同颜色的区域。看上去是有层叠区域造成的颜色不一致：

![img](./assets/067ee94236174271a8a43b1a9ce3d048~tplv-k3u1fbpfcp-zoom-1.jpeg)

在这个例子中，字母间距没有调整，所以这个问题与字母间距无关。解决方案很简单，**设置不带透明度的颜色值，也不给文本设置透明度** 。

## 不同语言之间字（词）大小差异

不同语言中的字大小是有一定差异的。比如说英文翻译成阿拉伯文后，有些单词就会变大或变小，因此元素的大小也会发生变化（内容容器）。比如：

![img](./assets/ee52974e06a842f492e11296d3ae2d49~tplv-k3u1fbpfcp-zoom-1.jpeg)

正如上图所示，当英文网站翻译成阿拉伯语时，由于翻译后一些单词变大或变小，元素的大小也会发生变化。比如说：

- `div.menu_login_container` 容器（登录表单）在英文版本时，它的宽度大约是 `393px` ，阿拉伯语版本时，它的宽度因词变宽，它的宽度也变大了，大约是 `441px`；
- `input` （登录按钮）在英文版本时，它的宽度大约是 `36.47px` ，在阿拉伯语版本中大约是 `84.66px`。

事实上，这种差异不只存在于拉丁语体系与阿拉伯语体系之间，它们也同样存在于汉语体系中。有些单词在不同语系中宽度有些相同，有些更大，也有一些更小：

![img](./assets/9dcccf8b6ed74256b2d6a35c6d7a80db~tplv-k3u1fbpfcp-zoom-1.jpeg)

在这种因语言不同，内容长度（大小）不同，要是在容器上显式设置宽度，就会造成内容被溢出，或断行；如果容器被设置了 `overflow: hidden`，还会造成内容被裁剪等现象。来看一个真实案例，比如 [Facebook 的登录页中的“新建帐户”按钮](https://zh-cn.facebook.com/)：

![img](./assets/afa6563b45ee4e3d885b7e69fe562595~tplv-k3u1fbpfcp-zoom-1.jpeg)

不管是给按钮设置宽度为 `104px` 或 `219px` 都不是最佳的。

- 如果设置最小值 `104px` ，其他语言版本就会内容溢出；
- 如果设置最大值 `219px` ，其他语言版本就有可能会有很大的空白空间。

![img](./assets/49d2cdbfd9744314bdcda84de2cf784d~tplv-k3u1fbpfcp-zoom-1.jpeg)

针对这样的场景，更好的做法是，使用 CSS 的内在尺寸来定义元素容器的大小，比如可以将按钮设置的宽度为 `auto` 、`min-content` 或 `max-content` ，这样使不同版本语言下都有一个较好的宽度：

![img](./assets/92846bcc717d4bb887a4ae4c5c0ddedd~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/ExRMrMN>

面对多语言的 Web 布局时，给元素设置尺寸大小，使用 `auto` 、`min-content` 和 `max-content` 要比具体尺寸更为合适。但有的场景也会让你的 UI 看上去不太完美。就拿下图为例：

![img](./assets/ae1fcfec712d41138462619a752194d8~tplv-k3u1fbpfcp-zoom-1.jpeg)

英文版本“Done”按钮，在英文版本下，它视觉上，甚至可点击区域都是符合 Web 设计的，但它一到阿拉伯语言版本中，“Done”被翻译成“إنجاز”，不管是 UI 视觉还是按钮可点击区域都变小了，有可能它不符合 Web 设计需求，比如按钮可点击区域要求是 `44px x 44px` 。因此，除了给按钮设置宽度为 `auto` 或 `min-content` 或 `max-content` 时，最好也同时给按钮设置一个 `min-width` 值，比如上图中的 “Done”按钮：

```
.button {
    width: auto; /* 或 min-content */
    
    /* 或者 */
    inline-size: auto; /* 或 min-content */
    
    /* 最好加上 min-width 或 min-inline-size */
    min-width: 100px;
}
```

![img](./assets/ad475b752c2447da9016175687f944d5~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/gOKEEXJ>

## 文本截取

在 CSS 中需要对文本进行截取，并且在被截取的末尾添加相应的省略指示器，一般会使用 `text-overflow: ellipsis` 来实现：

```
.text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
```

或者：

```
.line-clamp {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

![img](./assets/cf2951b325664dc692bfa5607a9b2d9f~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/wvXObbN>

上面的效果应该是符合我们预期的。如果不慎在拉丁语体系和汉语体系中设置了 `dir="rtl"` 时，效果和我们阅读习惯就不同了，甚至是一种错误的表现行为：

![img](./assets/8ddd739726394acca4b902c3e1411c79~tplv-k3u1fbpfcp-zoom-1.jpeg)

正如上图所示，英文和中文文本的截断不正确。它应该在元素的末尾，而不是开头。要解决这个问题，`dir` 需要根据语言的正确阅读方式来设置正确的值。如果你不清楚语言的阅读方式或者无法预判用户会将应用切换到何种语言的话，建议将 `dir` 的值设置为 `auto`。这样一来，浏览器会自动根据语言的阅读方式来处理文本截取的效果：

![img](./assets/bc82b275ab2e4e51852fe39891357551~tplv-k3u1fbpfcp-zoom-1.jpeg)

当然，这种情况一般会发生在混合排版中，比如：

```
<!-- 阿拉伯语为主，里面混合汉语或拉丁语 -->
<html lang="ar" dir="rtl">
    <body>
        <p dir="auto">Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.</p>
        <p dir="auto">Web and left to right, CSS floating layout, Flexbox layout and Grid layout, influenced by book template and reading mode.</p>
    </body>
</html>
​
<!-- 汉语或拉丁语中为主，里面混合阿拉伯语 -->
<html lang="ar" dir="ltr">
    <body>
        <p dir="auto">Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.</p>
        <p dir="auto">Web and left to right, CSS floating layout, Flexbox layout and Grid layout, influenced by book template and reading mode.</p>
    </body>
</html>
```

## 给 RTL 选择一个糟糕的字体

对于大部分 Web 开发者，在开发多语言 Web 网站或应用时，很少会根据语言版本来选择不同的字体，为了避免麻烦，习惯性地选择系统默认字体。但事实上，这并不是一种较好的选择，尤其是 RTL 版本的设计，还是需要精心选择对应的字体，这样才能确保它具有良好的可读性。就拿 “Twitter” 这个词为例：

![img](./assets/a3f1b10b9467464389acdf47bbfeb91e~tplv-k3u1fbpfcp-zoom-1.jpeg)

英文版本和阿拉伯语版本选择同一字体，但对于使用阿拉伯语的用户而言，“تغريد”这个词很难，原因如下:

- 字体不好；
- 加粗影响了可读性；
- 这个单词的点很小，非常接近字母。

针对这种情形，应该为阿拉伯语（LTR 版本）选择一个更为适合的字体。比如：

![img](./assets/09cd832e91754c4796acceee1ccbf2d2~tplv-k3u1fbpfcp-zoom-1.jpeg)

## 不宜设置相同的 line-height

如果需要更好的阅读体验，可能会为不同的语言（LTR 或 RTL）设置不同的布局。但是 LTR 和 RTL 排版设置相同的 `line-height` 的话，阅读体验就有可能达不到你预期的效果。比如给英文和阿拉伯文设置相同的 `line-height` ，在阿拉伯文中看上去行与行的间距要更小：

![img](./assets/9e9f340b2b2a44d0afa46101e7681bf3~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果想改变这样的现象，需要考虑为阿拉伯语的内容提供一个更适合的 `line-height`。比如：

```
/* LTR: Left To Right */
[dir="ltr"] {
    line-height: 1.5;
}
​
/* RTL: Right To Left */
[dir="rtl"] {
    line-height: 1.8;
}
```

![img](./assets/cb420196539544948a1e10e37a298378~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/NWzJZzG>

另外建议 `line-height` 不要使用固定单位的值，这样在一些语言的切换状态下很容易造成文本展示不全（类似被截）。比如下图的效果：

![img](./assets/9e2e33daf82d4302872fd7a3fed15bab~tplv-k3u1fbpfcp-zoom-1.jpeg)

## 不采用默认的文本下划线

有些文本会带有默认下划线的效果，比如 `<a>` 链接。在阿拉伯语言的文本中，默认的文本下划线会让阅读变得很困难。这种现象的产生，与阿拉伯语单词和字母的书写方式有关。如下图所示：

![img](./assets/b2c3012ac8474ae8b588f436a714c3bc~tplv-k3u1fbpfcp-zoom-1.jpeg)

你会发现，文本下划线会和一些文本重叠，比如单词中的一些点：

![img](./assets/e0b2bac15a6640f4a33f26190345e09f~tplv-k3u1fbpfcp-zoom-1.jpeg)

另外，采用默认的文本下划线，不同的浏览器渲染出的效果也会有所差异：

![img](./assets/8c719b0d80c34885b9db07accf2e0ca2~tplv-k3u1fbpfcp-zoom-1.jpeg)

很明显，Chrome 和 Firefox 浏览器不会出现我们上面所说的现象（在这方面可能做了一定的优化），但是在 Safari 浏览器中，就出现了上面所描述的现象。另外可能在一些 UI 效果上趋向于风格的统一。所以在给文本加下划线的时候，更建议采用自定义的下划线风格。

在 CSS 中有很多种不同的方案来实现自定义下划线的效果，比如 `border-bottom`、`box-shadow`、`background-image`等，还可以给文本添加 SVG 的下划线。除此之外，[CSS Text Decoration Module Level 4](https://drafts.csswg.org/css-text-decor-4/) 提供的一系列 `text-decoration-*` 属性也可以实现一些个性化的下划线效果：

![img](./assets/6dc50e1b46de48d6b6c26ed1f80c5207~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/dyKrxYL>

简单地说，可以使用 `text-decoration-*` 来设置下划线样式：

```
a:hover { 
    text-decoration: underline;
    text-decoration-color: rgba(21, 132, 196, 0.2); 
    text-decoration-skip-ink: auto;
    text-decoration-style: wavy; 
    text-underline-offset: 4px; 
    text-decoration-thickness: 2px; 
    text-decoration: underline;
}
```

![img](./assets/f2c6b48a214741d48c9af60224abd9ba~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/Yzvgomb>

## 断行需要独立处理

如果使用断行处理的相关样式，比如 `word-break`，那么在阿拉伯语的应用中需要进行单独的测试，因为它可能会破坏阿拉伯语单词。如下图所示：

![img](./assets/97d9b4cfa41741dcba27a0603e04899b~tplv-k3u1fbpfcp-zoom-1.jpeg)

上图中圈出的部分是由于断句带来的影响。**在阿拉伯语中，没有断字这回事** 。一个单词的字母是相互联系的，所以不可能打破一个单词。

## 尽量避免给文本加粗和使用斜体文本

在大多数 RTL 语言（比如阿拉伯语）的应用中，应该尽量避免使用粗体（`font-weight`）和斜体（`font-style: italic`）。因为大多数 RTL 语言中，粗体文本会让应用的可读性变得更为困难，而斜体几乎是不被使用。同样的，在 RTL 语言中，几乎会忽略大写字母。

![img](./assets/12f3a52c64b64cf89206e921bef29f5f~tplv-k3u1fbpfcp-zoom-1.jpeg)

## 双向语言的最佳用户体验

这里所谓的双向语言指的是 LTR 和 RTL 的输入顺序（语言）和文本显示布局的能力。前面我们花了一些时间和大家聊了聊双向语言在 Web 网站或应用中的差异以及开发者切入到 RTL 中会碰到的一些问题。

事实上除了开发者，对于设计师以及用户体验，双向语言都会有很多细节需要我们注意，或者说有很多问题需要我们一起面对。如果仅从 UI 布局上来看，**双向语言（LTR 和 RTL）的 UI 布局是一种镜向的布局效果**。

![img](./assets/cc66004cf8dc44bc8f60b16558d4a5a4~tplv-k3u1fbpfcp-zoom-1.jpeg)

表面看上去是一种反向的切换，但事实上，这里面有很多细节是需要我们注意或者单独处理的。接下来，我们来看看需要注意的一些细节（主要围绕着 UX 来展开）。

### 图标

在现代 Web 中开发中，图标的应用非常广泛，正所谓“一图胜过千言万言”，对于图标（Icon 图标）的使用也是如此，很多时候图标能很明确地告诉用户所代表的含义，比起文本的描述要更具效果。但在 RTL 开发中图标的使用要比 LTR 复杂得多，也麻烦得多。

> 在 RTL 语言中有些是具有较强的宗教信仰，民俗民风也较强，因此图标的使用也需要特别注意，因为一不小心就可能会冒犯到你的用户。

这是很复杂的事情，我们先抛开这个体系，只聊聊技术上实现的差异。

Web 中的图标有些是没有方向性的，有些是带有方向性。比如下图所示的图标，图标中心线左右两侧是对称的，可以说是没有任何方向性：

![img](./assets/8612f93a821143dcaf265b72e70985a1~tplv-k3u1fbpfcp-zoom-1.jpeg)

像上述这种对称性的图标，用在双向语言中，你不需要对这些图标做任何的处理（比如翻转）。

在双向语言系统中有些图标是具有方向性的。也就是说在 LTR 和 RTL 中要改变它们的方向，而且这一点对于用户来说是非常重要的，可以更清楚地理解图标的含义。比如：

![img](./assets/5dcc866547c54645bc7cfb25370d2b10~tplv-k3u1fbpfcp-zoom-1.jpeg)

对于需要镜像的图标，仅仅使用 `dir` (或 `direction` )无法达到所要的效果：

```
<!-- LTR: Left To Right -->
<div class="icons" dir="ltr">
    <svg></svg>
</div>

<!-- RTL: Right To Left -->
<div class="icons" dir="rtl">
    <svg></svg>
</div>
[dir="rtl"] {
    direction: rtl;
}
```

![img](./assets/4129022de1f448dbbfc0017c456e97da~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/mdKgMEb>

你可能已经发现了，`dir` 和 `direction` 只是对图片的排列顺序做了调整， RTL 版本中的图标没有水平翻转。要让 RTL 版本下的图片真的符合需求，需要对它们做一些额外的处理。

在 CSS 中，可以使用 `transform` 的 `scaleX(-1)` 让 RTL 版本下的图标做水平翻转：

```
[dir="rtl"] svg {
    transform: scaleX(-1);
}
```

![img](./assets/6bc3fd60d3d24ace8b8ccc288fede697~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/ZERZJLr>

也就是说，我们在 LTR 和 RTL 版本中使用图标时，应该尽可能像下图这样来使用：

![img](./assets/da9331f9cc8f45a996a8c08f3496e133~tplv-k3u1fbpfcp-zoom-1.jpeg)

然而，总是有例外的。根据 [Material Design 指南](https://m2.material.io/design/usability/bidirectionality.html)，如果一个图标代表一个可以用右手拿着的对象，那么它不需要翻转。例如，搜索图标的手柄通常位于右下角，因为大多数用户都是右撇子。在使用 RTL 语言的国家，大多数用户也是右撇子，所以这样的图标不应该被镜像。

![img](./assets/a00aca7c424140a5b181da162f3f346b~tplv-k3u1fbpfcp-zoom-1.jpeg)

还有一些图标是通用的，也不需要翻转它们。例如，播放器上的一些图标，它代表的是磁带播放的方向，而不是时间方向，所以不必要对它们做翻转。下图是 Spotify 应用程序的英语和阿拉伯语版本:

![img](./assets/b9754599e36a4868a6f3e7221e7880b5~tplv-k3u1fbpfcp-zoom-1.jpeg)

所以说，在 LTR 和 RTL 下使用图标时，需要根据实际环境做出最合适的选择。

### 带图标的按钮和表单控件

通常有些按钮会带上相应的 Icon 图标。在这种情况下，在 RTL 布局中，图标的位置也需要进行翻转：

![img](./assets/3aa9bef9a85742b3b1d2601d9b0b014e~tplv-k3u1fbpfcp-zoom-1.jpeg)

对于表单控件也是如此，特别是对于输入型的 `input` 表单控件，还应该保持输入的方向性：

![img](./assets/38689fa16b6c4f91977ee6bf4de8e93f~tplv-k3u1fbpfcp-zoom-1.jpeg)

在 RTL 中，有些表单输入应该保持左对齐，例如电子邮件和手机号码。值得注意的是，如果占位符内容是阿拉伯语或其他 RTL 语言，那么占位符应该向右对齐。一旦输入框获得焦点，用户开始输入，对齐方式将翻转到左侧。

![img](./assets/35e8ce0ca6b144a1bc3b61f6567bfc0c~tplv-k3u1fbpfcp-zoom-1.jpeg)

### 导航菜单和面包屑

对于导航菜单以及页头，还有面包屑等 UI 的设计在双向语言中是 UI 的镜像。

![img](./assets/a1e5fdfcde6248549fe77222ee05b111~tplv-k3u1fbpfcp-zoom-1.png)

### 数字顺序

在双向语言中，对于数字的顺序（比如电话号码、门牌号等），不需要做镜像的处理。但要是带有图标的话，对应的图标还是需要做镜像处理的。

![img](./assets/6df6c713914d47ffa94611c0733a6147~tplv-k3u1fbpfcp-zoom-1.jpeg)

### 组件的翻转

在处理一些组件时，我需要一种快速翻转它们的方法。在 Sketch 应用中，我将复制一个组件，然后用 “flip” 命令翻转它。同样的功能也可以在 Adobe XD 和 Figma 中使用。

![img](./assets/0a49dce378334638bab49064e31965a9~tplv-k3u1fbpfcp-zoom-1.jpeg)

而我们在 Web 中构建 Web 组件时，大部分通过 HTML 的 `dir` 或 CSS 的 `direction` 就可以实现水平翻转的效果：

![img](./assets/7505e9a0031e42f6b7c0879db2bc396b~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/LYrvzPE>

构建翻转的 Web 组件，我们这里采用的基本上是 CSS Flexbox 和 CSS Grid 布局技术，只不过在设置与方向有关的属性，我们尽可能地使用了 CSS 的逻辑属性，比如：

```
/* RTL 需要水平翻转的图标 */
[dir="rtl"] svg {
    transform: scaleX(-1);
}

figure {
    max-inline-size: 160px;
}

/* 自定义下划线，更符合 RTL 排版 */
header .active,
header a:hover {
    text-decoration: underline;
    text-decoration-color: #03a9f4;
    text-decoration-skip-ink: auto;
    text-decoration-style: wavy;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
}

.tabs li.active::after {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    block-size: 5px;
}

.toasts svg:last-child {
    margin-inline-start: auto;
}
```

## 实际案例

先来看一个简单示例，看看 LTR 和 RTL 两个版本的 Web 布局要如何处理。

![img](./assets/615ee46892184646ad7d8290413fbdd0~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/ZERZXwE>

构建 LTR 和 RTL 布局，它们在 HTML 结构上最大的差异在最外边的容器，比如示例中的 `.page` （往往单独的页面，可以设置在 `<html>` 和 `<body>`）显式设置了 `dir` 的值：

```
<!-- LTR -->
<div class="page" dir="ltr">
    <header></header>
    <div class="sub__title"></div>
    <main></main>
</div>

<!-- RTL -->
<div class="page" dir="rtl">
    <header></header>
    <div class="sub__title"></div>
    <main></main>
</div>
```

这样做的好处就是，我们可以提前设置 LTR 和 RTL 语言的的内联流（文档流）和块流的方向。尤其是我们使用 CSS Flexbox 和 CSS Grid 布局时，可以很好地匹配 LTR 和 RTL，那是因为这两种布局技术都是基于书写模式设计的布局。

先来看页头 `header` 的布局，它主要包含了 `.logo` 、`.nav` 和 `.user--profile` 三个部分：

![img](./assets/d6bf994ae90e404f96115e5ca883e461~tplv-k3u1fbpfcp-zoom-1.jpeg)

我们在 `header` 中使用 CSS Flexbox 布局，它可以自动适配 LTR 和 RTL 的布局：

```
header {
    display: flex;
    align-items: center;
    gap: 1rem;
}
```

注意，在主轴（Main Axis）并没有使用 `justify-content` 来控制这三个部分的对齐，示例中在 `.user--profile` 使用了逻辑属性 `margin-inline-start` 来控制它：

- LTR 中居右；
- RTL 中居左。

```
.user--profile {
    margin-inline-start: auto;
}
```

第二部分 `.sub__title` 和 `header` 采用的是相同的布局方式：

![img](./assets/86c37e6705624b2584245aa0c8953753~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
.sub__title {
    display: flex;
    align-items: center;
}

.sub__title form {
    margin-inline-start: auto;
}
```

对于主内容区域 `main` 中的卡片，我在这里使用了 CSS Grid 中的 RAM 布局技术，它也能很好匹配 LTR 和 RTL ：

![img](./assets/fd448b72e89d4d4f8369a07a08197bf1~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 460px), 1fr));
}
```

对于单张卡片，在这个示例中没有使用 CSS Grid 中的 `subgrid` 来构建布局，选择的还是 CSS Flexbox 来布局：

![img](./assets/6a1a9cefa1284576b43a89b73e6f110d~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
.media {
    display: flex;
    gap: 1rem;
}

.media__content {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
```

同样的，在卡片的按钮上使用逻辑属性，让按钮在靠近底部放着：

```
.media button {
    margin-inline-start: auto;
}
```

在我们这个示例中，很好地利用了 CSS Flexbox 和 CSS Grid 中的 `gap` 属性，来设置元素之间的间距：

![img](./assets/7ad5441032c041f8b911688e2fdf0d1c~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果不使用 `gap` 属性，很有可能需要使用到 `margin` 对应的逻辑属性，比如：

```
.logo {
    margin-inline-end: 1rem;
}

.user--profile span {
    margin-inline-start: 10px;
}

.sub__title dd span {
    maing-inline: 10px;
}
```

其实到这，LTR 和 RTL 布局基本上已经完成。不过，我还对示例中的图标做了些处理，比如：

![img](./assets/b519df2a5d374a2888ef71d651e7bd2c~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
[dir="rtl"] .sub__title a svg,
[dir="rtl"] .media button svg {
    transform: scaleX(-1);
}
```

这是一个关于 LTR 和 RTL 最基本的示例。你可能会说这是一个不真实的示例，那接下来，就以 [Facebook 的登录页](https://zh-cn.facebook.com/)为例：

![img](./assets/4084fa227c0241eda9e1a50b096ba069~tplv-k3u1fbpfcp-zoom-1.jpeg)

构建一个这样的登录页，你可能需要的 HTML 结构：

```
<!-- LTR: 中文简体 -->
<html lang="zh-Hans" dir="ltr">
    <body>
        <div class="page__sloga">
            <h1 class="logo">
                <a href="https://zh-cn.facebook.com/">
                    <svg class="icon__logo"></svg>
                </a>
            </h1>
            <p class="sloga">联系你我，分享生活，尽在 Facebook</p>
        </div>
        <div class="form--wrapper">
            <form class="login">
                <div class="control">
                    <input type="text" placeholder="邮箱或手机号" name="user" />
                </div>
                <div class="control">
                    <input type="password" placeholder="密码" name="password" />
                </div>
                <div class="control">
                    <button class="button button--primary">登录</button>
                </div>
                <div class="control">
                    <a href="">忘记密码？</a>
                </div>
                <div class="control">
                    <button class="button button--secondary">新建帐户</button>
                </div>
            </form>
            <p class="help--message">
                为名人、品牌或公司<a href="">创建公共主页</a>。
            </p>
        </div>
    </body>
</html>
```

对于日文或英文版本来说，它们的 HTML 结构和中文版本是一样的，对应的内容换成了日文或英文。唯 一的差别是 `<html>` 元素的 `lang` 值替换成 `ja` （日文）或 `en` （英文），而 `dir` 依旧是 `ltr` ，因为它们的书写模式和阅读模式也是 LTR ：

```
<!-- LTR: 日文 -->
<html lang="jp" dir="ltr">
    <body>
        <div class="page__sloga">
            <h1 class="logo">
                <a href="https://zh-cn.facebook.com/">
                    <svg class="icon__logo"></svg>
                </a>
            </h1>
            <p class="sloga">Facebookを使うと、友達や同僚、同級生、仲間たちとつながりを深められます。ケータイ、スマートフォンからもアクセスできます。</p>
        </div>
        <div class="form--wrapper">
            <form class="login">
                <div class="control">
                    <input type="text" placeholder="メールアドレスまたは電話番号" name="user" />
                </div>
                <div class="control">
                    <input type="password" placeholder="パスワード" name="password" />
                </div>
                <div class="control">
                    <button class="button button--primary">ログイン</button>
                </div>
                <div class="control">
                    <a href="">パスワードを忘れた場合</a>
                </div>
                <div class="control">
                    <button class="button button--secondary">新しいアカウントを作成</button>
                </div>
            </form>
            <p class="help--message">
                有名人、ブランドまたはビジネスのために<a href="">Facebookページを作成</a>できます。
            </p>
        </div>
    </body>
</html>
```

对于阿拉伯语体系，比如阿拉伯语，它的 HTML 结构除了内容变了之外，`<html>` 元素的 `lang` 要求被设置为 `ar` ，还需要将 `dir` 的值设置为 `rtl` ，因为阿拉伯语的书写模式和阅读模式是 LRT ，刚好和拉丁语体系的英文、汉语体系的中文或日文相反，因为它们都是 LTR：

```
<!-- RTL: 阿拉伯语 -->
<html lang="ar" dir="rtl">
    <body>
        <div class="page__sloga">
            <h1 class="logo">
                <a href="https://zh-cn.facebook.com/">
                    <svg class="icon__logo"></svg>
                </a>
            </h1>
            <p class="sloga">يمنحك فيسبوك إمكانية التواصل مع الأشخاص ومشاركة ما تريد معهم.</p>
        </div>
        <div class="form--wrapper">
            <form class="login">
                <div class="control">
                    <input type="text" placeholder="البريد الإلكتروني أو رقم الهاتف" name="user" />
                </div>
                <div class="control">
                    <input type="password" placeholder="كلمة السر" name="password" />
                </div>
                <div class="control">
                    <button class="button button--primary">تسجيل الدخول</button>
                </div>
                <div class="control">
                    <a href="">هل نسيت كلمة السر؟</a>
                </div>
                <div class="control">
                    <button class="button button--secondary">إنشاء حساب جديد</button>
                </div>
            </form>
            <p class="help--message">
                &rlm;<a href="">إنشاء صفحة</a>&rlm;لشخصية مشهورة أو علامة تجارية أو نشاط تجاري.
            </p>
        </div>
    </body>
</html>
```

基本样式，这里不做阐述。先看页面级的布局，在这里使用 CSS Grid 的 Full-Bleed 技术来构建整体的页面级布局：

```
body {
  display: grid;
  place-content: start center;
  grid-template-columns: 
      minmax(1rem, 1fr) 
      minmax(min(100% - 2rem, 960px), 1fr) 
      minmax(1rem, 1fr);
}

body > * {
  grid-column: 2;
}
```

![img](./assets/20dfbdef477b43bbb73a1479766d43a2~tplv-k3u1fbpfcp-zoom-1.jpeg)

对于页面的口号（Sloga）和登录表单两个部分自动换行，这里在它的容器 `section` 中使用 CSS Grid 的 RAM 布局技术，并限制了每个部分的最小宽度（`min-inline-size`）：

```
section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 400px), 1fr));
    gap: 1rem;
}

section > * {
    max-inline-size: 400px;
}

@media only screen and (min-width: 514px) {
    section {
        justify-items: center;
    }

    .login {
        min-inline-size: 400px;
    }
}

@media only screen and (min-width: 760px) {
    .form--wrapper {
        justify-self: end;
    }

    .login {
        min-inline-size: 400px;
    }
}
```

对于组件级，都采用了 CSS Flexbox 来构建的布局：

```
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.login input {
    display: flex;
    align-items: center;
    inline-size: 100%;
}

.login button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.page__sloga {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

@media only screen and (min-width: 760px) {
    .page__sloga {
        align-items: flex-start;
        text-align: start;
        align-self: center;
    }
}
```

这个时候，你将看到基本布局效果就出来了，而且能很好匹配 LTR 和 RTL 语言版本：

![img](./assets/ca1b960039eb4e4794128dd9d064e394~tplv-k3u1fbpfcp-zoom-1.gif)

当然，在开发 LTR 和 RTL （多语言版本）的 Web 网站或应用时，应该尽可能避免使用 CSS 的物理属性，我们这个示例中尽可能使用 CSS 的逻辑属性来替代其对应的物理属性：

```
.logo svg {
    block-size: 106px;
    margin-inline-start: -28px;
    margin-inline-end: -28px;
    margin-block-start: -28px;
    margin-block-end: -28px;
}

h1 {
    margin-block-start: 0;
}

.login {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    
    padding-inline: 20px;
    padding-block: 20px;
    max-inline-size: 400px;
    min-inline-size: calc(100% - 2rem);
  
}

.login .control {
    inline-size: 100%;
    text-align: center;
}

.login .control:last-of-type {
    padding-block-start: 1.625rem;
    border-block-start: 1px solid #dddfe2;
}

.login input {
    padding-inline: 16px;
    padding-block: 14px;
    border-radius: 6px;
    inline-size: 100%;
}

.login input:focus {
    box-shadow: 0 0 0 2px #e7f3ff;
}

.login button {
    border-radius: 6px;
  
    padding-block: 0;
    padding-inline: 16px;
    min-block-size: 3rem;
}

.login .button--primary {
    inline-size: 100%;
}

.help--message {
    text-align: center;
    margin-block-start: 28px;
}

section > * {
    max-inline-size: 400px;
}

.page__sloga {
    text-align: center;
}

@media only screen and (min-width: 514px) {
    .login {
        min-inline-size: 400px;
    }
}

@media only screen and (min-width: 760px) {
    .page__sloga {
        text-align: start;
    }
    
    .login {
        min-inline-size: 400px;
    }
}
```

不过在使用 CSS 逻辑属性也会面临一个新问题。在 CSS 中有很多属性是可以简写的，比如 CSS 盒模型中的 `margin` 、`padding` 、`border` 以及 `border-radius` 之类的属性。在开发多语言版本 Web 网站或应用时，如果我们使用简写属性，比如 `margin` :

```
.box {
    margin: 10px 20px 8px 5px;
}
```

你无法预测人们会怎么解读它。如果网站使用物理属性，这些值会被相应地解读成：

```
.box {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 8px;
    margin-left: 5px;
}
```

如果网站使用逻辑属性，这些值就会被解读为：

```
.box {
    margin-block-start: 10px;
    margin-inline-end: 20px;
    margin-block-end: 8px;
    margin-inline-start: 5px;
}
```

在英文网站中，物理属性和逻辑属性以相同的方式工作。在其他语言中，当我们使用 `margin` 等简写方式时，目的是根据 `direction` 或 `dir` 属性或新的 `writing-mode` 属性来工作。

对于开发者来说是件不易的事情，因为一些物理属性和逻辑属性是易于记忆的，像 `margin` 、`padding` 之类，但有一些是不易于记忆的，比如 `border` 和 `border-radius` 。就拿 `border-radius` 为例吧，与之对应的逻辑属性，在 `dir` 或 `direction` 和 `writing-mode` 下工作如下图所示：

![img](./assets/96567f6231164887bb59e28f5e67295e~tplv-k3u1fbpfcp-zoom-1.png)

这里我把以前整理的 `width` 、`hieght` 、`border` 、`padding` 、`top` 、`left` 、`bottom` 和 `right` 对应逻辑属性在 `dir` 、`direction` 和 `writing-mode` 下的工作情形用图来展示，希望有利于大家更好理解：

![img](./assets/0e879a7963f14956adc03487c6cc5bfc~tplv-k3u1fbpfcp-zoom-1.png)

最后，要是你对 CSS 逻辑属性和物理属性之间的对应关系记不住，也不要紧，查看下图的即可：

![img](./assets/a55b66f8f6174c1589c7b9d6cd8a3f3d~tplv-k3u1fbpfcp-zoom-1.jpeg)

另外，需要注意的是，我们的示例在媒体查询中并没有使用 CSS 的逻辑属性，比如 `min-inline-size` ，那是因为到目前为止，它还不能作为媒体查询中的媒体条件。比如，下面这段代码是无法正常工作的：

```
@media only screen and (min-inline-size: 514px) {
    .login {
        min-inline-size: 400px;
    }
}
​
@media only screen and (min-inline-size: 760px) {
    .page__sloga {
        text-align: start;
    }
    
    .login {
        min-inline-size: 400px;
    }
}
```

在这个示例中，我们不需要处理图标相关的事情，但根据前面所介绍的内容，我们应该在 LTR 和 RTL 版本中设置不同的行高 `line-height` ，给链接下划线设置不同的样式：

```
section[dir="ltr"] {
    line-height: 1.625;
}
​
section[dir="rtl"] {
    line-height: 1.325;
}
​
section[dir="rtl"] .form--wrapper a:hover {
      text-decoration: underline;
      text-decoration-color: rgba(21, 132, 196, 0.2);
      text-decoration-skip-ink: auto;
      text-underline-offset: 4px;
      text-decoration-thickness: 2px;
      text-decoration: underline;
}
```

最终你看到的效果如下：

![img](./assets/aa53b1d197b04a18a83a98eb706dfb74~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/poKBGzK>

再来看一个 [@Alaa Abd El-Rahim 在 Codepen 分享的一个示例](https://codepen.io/Alaa_AbdElrahim/full/XWaBBoq)，我在他的基础上 Fork 了一份，并在该示例的“英文”、“日文”、“阿拉伯文”的基础上新增了“中文”。这样就构建了一个四国语言的 Web 页面：

![img](./assets/155a87a3b565458591676b7922ddb292~tplv-k3u1fbpfcp-zoom-1.png)

> Demo 地址：<https://codepen.io/airen/full/qBKwwdM>

构建上图这样的多语言 Web 页面，对于 Web 开发者来说，要做的第一件事情就是在根元素 `<html>` 上设置 `lang` 和`dir` 属性的值，比如：

```
<!-- LTR: 中文 -->
<html lang="zh-Hans" dir="ltr"></html>
​
<!-- LTR: 日文 -->
<html lang="jp" dir="ltr"></html>
​
<!-- LTR: 英文 -->
<html lang="en" dir="ltr"></html>
​
<!-- LTR: 阿拉伯文 -->
<html lang="ar" dir="rtl"></html>
```

然后我们可以在选择器中使用这些属性来设置样式。比如使用 CSS 属性选择器来选择相应的元素：

```
[lang="zh"] {
    /* 匹配 lang="zh" 的元素 */
}
​
[lang^="zh"] {
    /* 匹配以 zh 开头的 lang ，比如 zh, zh-Hans, zh-HK 等*/
}
​
[lang|="zh"] {
    /* 匹配 lang 属性值中含有 zh 的值 ，比如 zh, zh-Hans, zh-HK 等*/
}
​
[dir="ltr"] {
    /* 匹配 dir 值为 ltr 的元素 */
}
​
[dir="rtl"] {
    /* 匹配 dir 值为 ltr 的元素 */
}
```

还可以上面选择器为父选择器，来匹配对应的后代元素，比如：

```
html[dir="rtl"] .hero,
html[dir="rtl"] .hero__content,
html[dir="rtl"] .hero__img img,
html[dir="rtl"] .hero__social > div {
    transform: rotateY(180deg);
}
```

甚至将来你还可以使用 `:dir()` 伪类匹配特定文字书写方向的元素。比如：

```
<div dir="rtl">
    <span>test1</span>
    <div dir="ltr">test2
        <div dir="auto">עִבְרִית</div>
    </div>
</div>
```

示例中的 `:dir(rtl)` 会匹配最外层的 `div`，内容为 `test1` 的 `span` 和有希伯来字符的 `div`。`:dir(ltr)` 会匹配到内容为 `test2` 的 `div` 。

值得注意的是，用 CSS 伪类 `:dir()` 并不等于使用 `[dir=…]` 属性选择器。后者匹配 `dir` 的值且不会匹配到未定义此属性的元素，即使该元素继承了父元素的属性；类似的， `[dir=rtl]` 或 `[dir=ltr]` 不会匹配到 `dir` 属性的值为 `auto` 的元素。

而`:dir()`会匹配经过客户端计算后的属性，不管是继承的 `dir` 值还是 `dir` 值为 `auto` 。另外，`:dir()` 伪类仅考虑文档（大多数情况是 HTML）中定义的文字方向的语义值，并不会考虑格式值，如 CSS 的 `direction` 的值。

不幸的是，CSS 的 `:dir()` 伪类到目前还只是一个实验属性，你还无法使用到生产环境中。所以，目前为止还是使用 `[dir="ltr"]` 或 `[dir="rtl"]` 这样的属性选择器更为安全。

另外，当你的 Web 排版中有 LTR 和 RTL 混排时，也建议在文档的标签元素上显式设置 `dir` 的值，最好是也能显式设置 `lang` 值，这样做除了避免混排的阅读困难之外，也更有利于使用 CSS 属性选择器选中需要设置样式的元素：

```
<h1 dir="rtl" lang="ar">مرحباً بكم في <strong dir="ltr" lang="en">W3cplus.com</strong></h1>
[dir="rtl"] {
    font-size: clamp(1.25rem, 4vw + 1.5rem, 2rem);
    color: #09f;
    font-weight: 500;
}
​
[dir="ltr"] {
    font-weight: 900;
    color: #f36;
    text-decoration: underline;
}
```

![img](./assets/65b4328de036454ba357feb9427bd35a~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/mdKgYOR>

除了使用 `[lang="en"]` 这样的属性选择器之外，还可以使用 `:lang()` 伪类选择器，针对特定的语言设置不同的样式。例如，在这个例子中，当 `:lang` 伪类切换为阿拉伯语、日语或中文时，我们可以改变字体大小：

```
 html:lang(ar),
  html:lang(jp),
  html:lang(zh){
      --offers-item-after-font-size: 1.2rem;
  }
```

也可以使用类似的方式，给特定的语言设置不同的字体，比如：

```
/* 阿拉伯语时使用的字体  */
html:lang(ar) {
    --font-family: "Tajawal", sans-serif;
}
​
/* 日语时使用的字体 */
html:lang(jp) {
    --font-family: "Noto Sans JP", sans-serif;
}
```

还可以针对不同语言，对相应元素改变其书写模式 `writing-mode` 的值，比如日文和中文时，将 `.about__text` 的内容修改成竖排，并且从右向左排列，即 `writing-mode` 设置为 `vertical-rl` ：

```
html:lang(jp) .about__text,
html:lang(zh) .about__text {
    writing-mode: vertical-rl;
    inline-size: 400px;
    block-size: max-content;
    margin-block-end: auto;
}
```

![img](./assets/dd1df52b7559421c90c344eec32c0b04~tplv-k3u1fbpfcp-zoom-1.jpeg)

示例中还使用到了前面课程中没有介绍过的 CSS 知识。就是在伪元素 `::before` 或 `::after` 使用 `attr()` 函数，根据 HTML 标签元素的属性值生成伪元素的内容：

```
<div data-badge="特殊报价"></div>
div::before {
    content: attr(data-badge);
}
```

这样做，在多语言网站中，`dir` 的值就决定了我们要选择什么和设置什么样式。

```
<div data-name="特殊报价" dir="ltr"></div>
<div data-name="اقتباس خاص" dir="rtl"></div>
```

这使得在切换语言后更改内容而不更改样式变得相对容易。回到我们的设计。卡片上有一个圆形的徽标设计，采用的就是这个方案：

```
.offers__item::after {
    content: attr(data-offer);
    
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 80px;
    inset-block-start: 20px;
    aspect-ratio: 1;
    text-align: center;
    
    padding: 2%;
    border-radius: 50%;
}
​
@media (min-width: 768px) {
    .offers__item::after {
        inline-size: 100px;
    }
}
​
@media (min-width: 1900px) {
    .offers__item::after {
        inline-size: 6.5rem;
    }
}
```

![img](./assets/7742ba2cfb954d48815c077b5036ee37~tplv-k3u1fbpfcp-zoom-1.jpeg)

需要注意的是，`[dir="..."]` 、`[lang="..."]` 和 `:lang(...)` 除了可以选中显式设置了 `dir` 和 `lang` 属性的元素之外，也可以利用 CSS 的选择器组合功能选择与其相邻的元素，它的子元素以及它的后代元素，比如：

```
html[dir="ltr"] {
    /* 选中 dir="ltr" 的 html 元素 */
}
​
html[dir="ltr"] .about__text {
    /* 选中 dir="ltr" 的 html 元素的后代名为 .about__text 元素 */
}
​
html:lang(en) {
    /* 选中 lang="en" 的 html 元素*/
}
​
html:lang(en) .about__text {
    /* 选中 lang="en" 的 html 元素的后代名为 .about__text 元素*/
}
```

接下来就是 CSS 逻辑属性的使用了，我将示例中涉及到的 CSS 物理属性基本上使用了逻辑属性来编码：

- `inline-size` 和 `block-size` 分别替代 `width` 和 `height`；
- `min-inline-size` 和 `min-block-size` 分别替代 `min-width` 和 `min-height`；
- `margin-inline-end` 替代了 `margin-right`；
- `border-inline-start` 替代 `border-left`；
- `inset-block-start` 、`inset-inline-end` 、`inset-block-end` 和 `inset-inline-start` 分别替代了 `top` 、`right` 、`bottom` 和 `left`。

```
.w-100 {
    inline-size: 100%;
}
​
.btn {
    padding-inline: calc(var(--btn-padding) * 2);
}
​
.about,
.offers,
.footer {
    padding-block-start: var(--sec-padding-block);
    padding-inline: var(--sec-padding-inline);
}
​
.offers,
.footer {
    padding-block-end: var(--sec-padding-block);
}
​
.sec__header {
    margin-block-end: var(--sec-heading-mbe);
    text-align: center;
}
​
.sec__header::after {
    inline-size: 50px;
    block-size: 2px;
    margin-inline: auto;
    margin-block-start: 20px;
}
​
.hero {
    min-block-size: var(--hero-height);
    padding-block: var(--hero-padding-block);
    padding-inline: var(--sec-padding-inline);
}
​
.hero__navbar {
    margin-block-end: var(--hero-navbar-padding-block-end);
}
​
​
.mode__switcher {
    inline-size: 20px;
    aspect-ratio: 1;
    margin-inline-end: 8px;
}
​
.mode__switcher::after {
    inset-inline-start: 50%;
    inset-block-start: 50%;
    transform: translate(-50%, -50%);
}
​
.hero__text {
    margin-block-end: var(--hero-text-mbe);
}
​
.hero__title,
.hero__para {
    margin-block-end: 20px;
}
​
.hero__social {
    inset-inline-start: 0;
    inset-block-start: 50%;
    transform: translateY(-50%);
    padding-block: 50px;
    padding-inline: 20px;
}
​
.hero__social a {
    margin-block-end: 10px;
}
​
.about__img {
    margin-block-end: var(--about-img-mbe);
}
​
.about__subtitle {
    margin-block: 30px;
}
​
.about__subtitle:first-of-type {
    margin-block-start: 0;
}
​
.cta__btn {
    margin-block-start: 1.5625rem;
}
​
.offers__content--has-margin {
    margin-block-end: 60px;
}
​
.offers__item .para {
    margin-block-end: 30px;
}
​
.offers__item::after {
    inline-size: 80px;
    aspect-ratio: 1;
    inset-block-start: 20px;
}
​
.offers__item_img {
    inline-size: 60%;
    margin-inline: auto;
    margin-block-end: 20px;
}
​
.footer {
    border-start-end-radius: 120px;
}
​
.footer__about,
.footer__newsletter,
.footer__navbar {
    margin-block-end: var(--item-mbe);
}
​
.footer__logo {
    margin-block-end: 40px;
}
​
.footer__navbar_head,
.footer__newsletter_head {
    margin-block-end: 50px;
}
​
.footer__navbar_item {
    margin-block: 10px;
}
​
.footer__newsletter .para {
    margin-block-end: 20px;
}
​
.footer__newsletter input {
    padding-block: var(--btn-padding);
    padding-inline-start: calc(var(--btn-padding) * 2);
    padding-inline-end: calc(110px + (var(--btn-padding) * 2));
}
​
.footer__newsletter_btn {
    inset-inline-end: 0;
}
​
@media (max-width: 899px) {
    .cta {
        padding-inline: 2.8%;
        margin-block-start: var(--sec-padding-block);
    }
}
​
@media (min-width: 768px) {
    .offers__item::after {
        inline-size: 100px;
    }
}
​
@media (min-width: 900px) {
    .hero__text {
        min-block-size: calc(
          var(--hero-height) - (var(--sec-padding-block) * 2) -
          var(--hero-navbar-padding-block-end) - 30px
        );
        inline-size: 56.5%;
        padding-inline-end: 2.75%;
    }
​
    .hero__img {
        inline-size: 33.33%;
    }
​
    .cta {
        padding-block-start: var(--sec-padding-block);
        padding-inline: var(--sec-padding-inline);
    }
​
    .cta__text {
        padding-block: 6.875rem 2.1875rem;
        padding-inline: 6.25rem var(--cta-text-mie);
        border-start-start-radius: 50%;
        border-end-start-radius: 50px;
    }
}
​
@media (min-width: 1200px) {
    .hero::before {
        block-size: 100%;
        inline-size: 33.33%;
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
    }
​
    .about__img {
        inline-size: 37%;
        margin-inline-start: 5%;
    }
​
    .about__img::after {
        inline-size: 100%;
        aspect-ratio: 1;
    }
​
    .about__text {
        inline-size: 53%;
    }
​
    html:lang(jp) .about__text,
    html:lang(zh) .about__text {
        writing-mode: vertical-rl;
        inline-size: 400px;
        block-size: max-content;
        margin-block-end: auto;
    }
​
    .cta {
        margin-inline-start: 3.8%;
    }
​
    .cta__text {
        margin-inline-start: calc(-1 * var(--sec-padding-inline) + 3%);
    }
​
    .cta__img {
        inline-size: var(--cta-img-width);
        margin-inline-start: calc(-1 * var(--cta-text-mie));
        border-inline-start-color: var(--light-color);
    }
​
    .footer__about,
    .footer__newsletter {
        inline-size: 30%;
    }
​
    .footer__navbar {
        inline-size: 20%;
    }
}
​
@media (min-width: 1900px) {
    .offers__item::after {
        inline-size: 6.5rem;
    }
}
```

比如示例中圆角的使用：

![img](./assets/7f984aba816347139ada810a65e06c0c~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
.cta__text {
    border-start-start-radius: 50%;
    border-end-start-radius: 50px;
}
​
.footer {
    border-start-end-radius: 120px;
}
```

你可能已经猜到了，整个页面的布局都是以 CSS Flexbox 和 CSS Grid 来构建的，所以不用太多担心 LTR 和 RTL 两种版本下因为布局会产生异常。具体原因在上一个示例中已经阐述过了。**CSS Flexbox 和 CSS Grid 都是基于文档书写模式而设计的** 。比如下图：

![img](./assets/2a6a9fd22dea47e7afabf2173e43508a~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
.d-xl-flex {
    display: flex;
    align-items: center;
}
​
.cta__text {
    padding-block: 6.875rem  2.1875rem;
    padding-inline: 6.25rem  var(--cta-text-mie);
    border-start-start-radius: 50%;
    border-end-start-radius: 50px;
}
​
.cta__img {
    inline-size: var(--cta-img-width);
    margin-inline-start: calc(-1 * var(--cta-text-mie));
    padding: 10px;
    border-radius: 50%;
    border: 1px dashed var(--secondary-color);
    border-inline-start-color: var(--light-color);
}
```

再比如示例中卡片展示区域，使用 CSS Grid 构建的布局，也能很好适配 LTR 和 RTL 版本，即使卡片由三个增加到四个，它也能很好地展示：

![img](./assets/0aea3e5ca7ac4c7884b7065a07b7e0cd~tplv-k3u1fbpfcp-zoom-1.jpeg)

```
.offers__content {
    display: grid;
    grid-template-columns: var(--offers-content-column);
    gap: var(--offers-content-gap);
}
```

在这个区域的布局，其实更好的方式是采用 CSS Grid 的 RAM 布局技术，它将会更好地响应浏览器不同断点的展示效果。有关于 CSS Grid 的 RAM 布局技术，这里就不过多阐述了，因为它在前面的课程中已经出现很多次了。

你可能已经发现了，在原作者的示例中，有些地方细节做得还是略有缺陷，比如示例中的按钮，因为不同版本语言，翻译出来的内容长度有所不同，有的按钮看上去较小：

![img](./assets/9b911556865b4df397857cef9e1c8650~tplv-k3u1fbpfcp-zoom-1.jpeg)

我在 Fork 的示例基础上对按钮做了一个最小尺寸的设置，这样做的主要原因是，在不同语言版本时，不会让有的语言版本下视觉看上去不美观，也避免按钮不好点击：

![img](./assets/309099ed834843fbb778cc2cf5bbc2f4~tplv-k3u1fbpfcp-zoom-1.gif)

这个示例还使用 CSS 自定义构建了 Dark Mode （暗黑模式）的效果：

```
html {
    /* colors */
    --dark-color: #161616;
    --light-color: #eee;
    --primary-text-color: var(--dark-color);
    --primary-bg-color: #fff;
    --shadow-color: var(--light-color);
    --hero-bg-gradient: linear-gradient(90deg, #30333f, #161616, #161616);
​
    /* font sizes */
    --logo-font-size: 2rem;
    --lang-switcher-font-size: 1.02em;
    --offers-item-after-font-size: 1.5rem;
​
    /* margin and padding */
    --btn-padding: 7px;
    --sec-padding-block: 120px;
​
    /* height and width */
    --hero-height: 500px;
    --cta-img-width: 45.75%;
}
​
body {
    background-color: var(--primary-bg-color);
    color: var(--primary-text-color);
}
​
body.dark {
    --primary-bg-color: #0f0f0f;
    --primary-text-color: var(--light-color);
​
    /* other changes */
    --shadow-color: #13151a;
    --hero-bg-gradient: linear-gradient(90deg, #191b20, #131313, #131313);
}
```

Dark Mode 的切换还是使用了一点点 JavaScript 脚本的：

```
(function () {
    document.getElementById("dark-mode").addEventListener("click", function () {
        document.body.classList.toggle("dark");
        this.classList.toggle("dark");
    });
})();
```

你切换模式的时候，能看到下图这样的效果：

![img](./assets/c1984c5b18284bf6a0048a29282074dd~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/qBKwwdM>

这是示例最终的效果。注意，这个示例也是具有响应式的效果，它能很好适配移动端、平板和 PC 等。

## 小结

我希望这些技术可以帮助你更轻松地创建多语言 Web 网站或应用。这节课向大家介绍了 LTR 和 RTL 中排版或 Web 布局中常会出的一些小问题以及设计上需要注意的一些细节。虽然罗列的所有注意项目不是最全面的，但希望这些能帮助你从设计的阶段就避免一些常识性的错误。

另外，在示例中我们学习了一些用来为这特定语言应用样式的 CSS 技巧，比如 `[dir="..."]` 、`[lang="..."]` 、`:dir(...)` 和 `:lang(...)` 。其中还介绍了 CSS 中的逻辑属性，以及它们如何适应文档的书写模式 `writing-mode` 、`direction` （或 HTML 的 `dir` 属性）。这比为不同语言版本编写额外的 CSS 样式规则要实用得多，而且还让你更易于维护一个多语言 Web 网站或应用的样式规则。

最后需要再次强调的是，**在构建一个多语言 Web 网站或应用时，首选的 Web 布局技术是 CSS Flexbox 和 CSS Grid，因为它们天然的能与文档书写模式相结合** 。除此之外，应该尽可能使用 CSS 逻辑属性来替换物理属性，尤其是涉及到方向性的属性，更应该使用逻辑属性。

对于不同语言版本的差异化的样式规则，可以考虑使用前面提到的 CSS 属性选择器 `[dir="..."]` 、`[lang="..."]` 或伪类选择器 `:dir(...)` 、`:lang(...)` 额外处理。

当然，在为特定语言优化网站时，可能还有其他需求需要考虑，但我们这里介绍的内容应该可以为你提供创建健壮 Web 布局所需的所有能力，以适应任何数量的语言和书写模式。换句话说，掌握课程中的内容，构建一个多语言 Web 网站或应用对于你来说已不是一件难事，但差异化的处理，还是需要针对实际场景运用课程中所介绍的知识，做进一步的优化。
