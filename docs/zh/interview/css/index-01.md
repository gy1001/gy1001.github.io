# CSS 面试题

## 01. CSS Modules

作用

- 避免 css 相互覆盖的方法，css modules 加入了局部作用域和模块依赖

实现原理

- css 的规则是全局的，任何一个样式的规则，对整个页面有效
- 使用独一无二的 className，每个类名编译成独一无二的 has 值

## 02. css 加载会造成阻塞吗？

结论

- css 不会阻塞 DOM 解析
- 会阻塞 DOM 树渲染
- css 加载会阻塞后面 JS 语句执行

提高 css 速度

- 使用 CDN
- CSS 压缩： gzip
- 合理使用缓存：cache-control expires e-tag
- 减少 http 请求数量，多个 css 文件合并或者写成内联样式（缺点：不能缓存）

## 03. css 预处理器

代码混合

嵌套选择器

继承选择器

- less
- sass
- stylus

## 04. CSS3 新增了哪些东西？

- 选择器
- 盒子模型：border-radius、box-shadow、border-image
- 背景：background-seiz background-origin background-clip
- 文本效果：text-shadow、word-wrap
- 渐变：线性渐变、径向渐变
- 字体：@font-size
- 2D/3D: transform、transform-origin
- 过渡与动画：transition、@keyframes、animation
- 媒体查询
- 多列布局

## 05. CSS3 中的 trasition 和 animation 的属性分别有哪些？

transition

- transition-property: 过渡 CSS 属性
- transition-duration: 完成时间
- transition-timing-function：过渡函数
- transition-delay: 延迟时间

animation:

- animation-name: 关键帧名称
- animation-duration: 事件（秒）或者毫秒
- animation-timing-function 如何完成一个周期
- animation-delay 延迟间隔
- animation-iteration-count: 播放次数
- animation-direction: 是否应该反向播放动画
- animation-fill-mode: 不播放，应用形式
- animation-play-state: 正在运行或者已暂停

## 06. flex 布局如何使用

flexible box 弹性布局，display: flex

- flex-direction: 主轴

- flex-wrap: 如何换行

- flex-flow：是 flex-direction 和 flex-wrap 的简写。 简写形式 row/nowrap

- justify-content: 主轴对齐方式

- align-items: 交叉轴对齐方式

- align-content: 多跟轴线对齐方式

子元素属性

- order 排列顺序
- flex-grow 放大比例，默认是 0
- flex-shrink 缩小比例，默认是 1
- flex-basis: 指定了 flex 元素在主轴方向上的初始大小
- flex: 此属性是以下 CSS 属性的简写: flex-grow flex-shrink flex-basis。默认是 0 1 auto

## 07：分析比较 opacity:0、display:none、visibility:hidden 的异同

在 CSS 中，opacity:0、display:none 和 visibility:hidden 都可以用于隐藏元素，但它们之间有一些区别：

display:none：

- 结构：会让元素完全从 DOM 中消失，渲染的时候不占据任何空间，不能点击。
- 继承：是非继承属性，子孙节点消失: 由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
- 性能：修改元素会造成文档重排，读屏器不会读取 display:none 元素内容，性能消耗较大。

visibility:hidden：

- 结构：不会让元素从 DOM 中消失，渲染元素继续占据空间，只是内容不可见，不能点击。
- 继承：是继承属性，子孙节点消失: 由于继承了 hidden，通过设置 visibility: visible 可以让子孙节点显式。
- 性能：修改元素只会造成本元素的重绘，性能消耗较少，读屏器读取 visibility:hidden 元素内容。

opacity:0：

- 结构：不会让元素从 DOM 中消失，渲染元素继续占据空间，只是内容不可见，可以点击。
- 继承：是非继承属性，子孙节点消失: 由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
- 性能：修改元素会造成重绘，性能消耗较少。

## 08: PostCss

> PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。可以理解为 css babel 可以让我们使用比较新的 css 语法

- PostCSS 具有很多插件，可以让我们使用很酷的 css 语法 (提供解析器，解析成 AST)
- PostCSS 具有强大的插件扩展能力，可以定制化非常多的配置
  - autoprefixer 自动添加浏览器前缀
  - cssnano 压缩 css 代码
  - postcss-pxtorem 把 px 转换成 rem
  - postcss-px-to-viewport 把 px 转换成 vw
  - precss 把 scss 转换成 css
  - postcss-cssnext 用于支持 CSS 的新特性，并将其转换为旧版本的 CSS 语法。 它支持许多新的 CSS 特性，如 calc()、var()、@media 查询、@support 规则等。

## 09: z-index 属性什么时候会失效

> z-index 只能作用于定位元素, 值越大越在上层，定位元素指的是 position 属性值不为 static 的元素

- 元素的父元素设置了 position 属性为 static。因为 static 定位的元素不参与定位和层叠上下文的计算，所以子元素的 z-index 属性将不会生效。
- 元素的 z-index 属性值为 auto。auto 值表示元素的层叠顺序将由浏览器自动确定，通常会根据元素在文档中的位置来确定。
- 元素的 z-index 属性值相同。当多个元素的 z-index 属性值相同时，它们的层叠顺序将由它们在文档中的位置来确定。
- 元素的父元素没有设置 z-index 属性。当父元素没有设置 z-index 属性时，子元素的 z-index 属性值将被视为 0，而不是父元素的 z-index 属性值。
- 元素被嵌套在其他元素中，并且嵌套的元素也设置了 z-index 属性。在这种情况下，子元素的 z-index 属性值将不会生效，除非嵌套的元素设置了 position 属性为 relative 或 absolute。
- 需要注意的是，z-index 属性的有效性还可能受到其他因素的影响，例如浏览器的版本和实现细节等。

## 10: 对 requestAnimationFrame 的理解

> requestAnimationFrame 是一个内置函数，用于在浏览器中执行动画。它使用系统时间来控制动画的帧率，确保动画的流畅性和一致性。

- requestAnimationFrame 函数接收一个回调函数作为参数，该回调函数将在下一帧动画之前执行。
- requestAnimationFrame 函数返回一个唯一的 ID，用于取消该动画。
- requestAnimationFrame 函数会根据浏览器的刷新率自动调整动画的帧率，确保动画的流畅性。
- requestAnimationFrame 函数可以用于实现各种动画效果，如平滑滚动、动画过渡等。

取消动画

- cancelAnimationFrame(id)
- 其中 id 是 requestAnimationFrame 函数返回的唯一 ID。

优势

- CPU 节能，处于未激活的状态下，刷新任务被暂停，停止渲染
- 每个刷新间隔内，如果多次调用 requestAnimationFrame 函数，那么只会执行一次重绘或回调函数
- 减少 DOM 操作次数，在每一占中把所有 DOM 操作集中起来，优化页面性能

setTimeout 执行动画缺点

- 无法保证在每一帧的时间间隔内只执行一次
- 如果在每一帧的时间间隔内做了很多 DOM 操作，那么这些 DOM 操作可能会被分批执行，无法保证动画的流畅性

## 11. 简单说下浏览器的渲染的流程

- 解析 HTML 文件， 生成 DOM 树
- 解析 CSS 生成 CSSOM 树
- 将 DOM 树和 CSSOM 树结合，生成渲染树
- 根据 render tree 进行布局（文档流、盒模型、计算大小和位置）, 将像素渲染到屏幕上

DOM 解析和 CSS 解析是两个并行的过程，它们都完成后，才会执行渲染树构建。

## 12. 介绍一下 png8 png16 png24 png32 的区别，并简单讲讲 png 的压缩原理

- png8： 每个像素使用 1 字节存储，支持 256 色 (2^8)
- png16：每个像素使用 2 字节存储，支持 65536 色 (2^16)
- png24：每个像素使用 3 字节存储，支持 16777216 色 (2^24)
- png32：每个像素使用 4 字节存储，支持 4294967296 色 (2^32)

压缩原理

- 压缩原理：使用 LZ77 算法对图片进行压缩，通过去除图片中的重复信息来减小图片的体积

PNG 图片压缩 两个阶段

- 预解析：对 png 进行预处理，方便后续压缩
- 压缩：deflate 压缩，使用 LZ77， huffman 算法，算法对图片进行压缩

## 13: 介绍一下 BFC 及其应用

> BFC（Block Formatting Context）块级格式化上下文，是 Web 页面的可视化 CSS 渲染的一部分，用于决定块盒子的布局及浮动元素的行为。

创建 BFC 的条件

- 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

应用

- 解决浮动元素，令父元素高度坍塌
- 解决非浮动元素被浮动元素覆盖
- 外边距垂直方向重合问题

BFC 的特性

- 内部的 Box 会在垂直方向上一个接一个的放置
- 垂直方向上的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的左外边缘（margin-left）会触碰到容器的左边缘（border-left）
- BFC 的区域不会与 float 的元素区域重叠
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
- 计算 BFC 的高度时，浮动元素也参与计算

## 14. 介绍下 BFC、IFC、GFC 和 FFC

- BFC：Block Formatting Contexts (块级格式化上下文)
- IFC：Inline Formatting Contexts (内联格式化上下文)
- GFC：GridLayout Formatting Contexts (网格布局格式化上下文)
- FFC：Flex Formatting Contexts (自适应格式化上下文)

## 15. 介绍下粘性布局（sticky）

> position: sticky. 粘性布局是 CSS3 新增的属性，粘性布局可以让一个元素在容器内随滚动而移动，并且可以固定在一定的位置。

粘性布局的特性

- 粘性定位的元素是依赖于父元素的
- 粘性定位元素的位置是在屏幕滚动时发生变化的
- 粘性定位元素在屏幕滚动时，会“固定”在一定的位置
- 粘性定位元素在到达“阈值”位置时，会以某种方式进行“吸附”

## 16. 居中为什么要使用 transform 而不使用 marginLeft/Top (阿里)

> 对布局属性进行动画，浏览器需要为每一帧进行重绘并上传到 GPU 中
>
> 对合成属性进行动画，浏览器会为元素创建一个独立的复合层，当元素内容没有发生改变，该层就不会被重绘，浏览器会通过重新复合来创建动画帧

> [前端面试题：居中为什么用 transform，而不是 margin top/left](https://www.toutiao.com/article/7201306931070386728/?upstream_biz=doubao&source=m_redirect)

transform 合成属性

top/left 布局属性，属性变化，会导致重排, 所谓重排即指对这些节点以及受这些节点影响的其它节点，进行 CSS 计算->布局->重绘过程，浏览器需要为整个层进行重绘并重新上传到 GPU，造成了极大的性能开销。

- 使用 transform 不会使页面回流，而使用 marginLeft/Top 会使页面回流
- 使用 transform 不会使页面重绘，而使用 marginLeft/Top 会使页面重绘

## 17. 清除浮动的方法

- clear 清除浮动，{ clear: both; height: 0; overflow: hidden; }
- 给浮动元素的父元素设置高度
- 父级元素设置成 inline-block, margin: 0 auto 是无效的
- 父级元素 设置 overflow: hidden
- 万能消除法： ::after 伪元素清除浮动

## 18. 如何用 css 或者 js 实现多行文本溢出省略效果，考虑兼容性

css 单行

```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

css 多行

```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
```

兼容性

```css
p {
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
p::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}
```

js 实现

> split + 正则 words + ... + scrollHeight/ clientHeight 超出 从 words pop 出来

## 19. 如何用 css 实现一个三角形

主要使用 border 来实现上下左右边框宽度的颜色，来生成不同的三角形、梯形等

```html
<div></div>

<style>
  div {
    width: 0;
    height: 0;
    border: 10px solid red;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
</style>
```

## 20: 介绍一下 CSS 中的层叠上下文

> 层叠上下文（Stacking Context）是 HTML 中的一个三维的概念，它表示一个元素在其所在平面内的优先级。

- 创建层叠上下文的方式

  - 根元素
  - position 属性为 absolute 或 fixed
  - display 属性为 flex 或 inline-flex
  - z-index 属性值不为 auto
  - opacity 属性值小于 1
  - transform 属性值不为 none
  - mix-blend-mode 属性值不为 normal
    - filter 属性值不为 none
    - isolation 属性值为 isolate
    - will-change 属性值为 opacity、transform、top、left、bottom、right

- 层叠上下文的特性

  - 内部元素会覆盖外部元素
