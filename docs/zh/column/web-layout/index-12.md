# 12-Grid 布局中的计算

通过前面课程的学习，我们可以使用 `grid-templte-rows` 和 `grid-template-columns` 设置显式网格轨道数量和尺寸，也可以使用 `grid-auto-rows` 和 `grid-auto-columns` 来设置隐式网格轨道尺寸。虽然它们服务的对象有所差异，但是使用方法几乎是相似的，只有个别函数不能用于 `grid-auto-rows` 和 `grid-auto-columns` 属性上，比如 `repeat()` 函数。

由于能给这些属性设置不同类型的值，因此在定义网格轨道的尺寸的时候就会涉及一些计算，比如 `%` 、`fr` 等。除此之外，还有其他的一些值类型，比如 `rem` 、 `em` 、`ex` 、`ch` 和视窗单位 `vw` 等，但这里只和大家聊聊 `%` 和 `fr` 单位，尤其是 `fr` 单位的计算。因为其他单位值的计算相对而言要更简单，比如：

- `rem` 是相对于 HTML 根元素（`<html>` 元素）的 `font-size` 计算；
- `em` 是相对于元素自身的 `font-size` 计算；
- `ex` 是相对于它的字体上下文的 `x` 高度，其中 `x` 的高度由 `font-family` 和 `font-size` 两个因素决定，即它等于特定字体在特定`font-size` 下的 `x` 高度；
- `ch` 是基于特定字体下的 `0` 字形宽度来计算，它也会随字体而变化，一般情况下，它是一个估计值，因为 `0` 字形的宽度通常是字体的平均字符宽度；
- `vw` 、`vh` 、`vmin` 和 `vmax` 是视窗单位，它是相对于浏览器视窗的宽度和高度来计算的。

我们先从百分比 `%` 开始吧！

## 网格中百分比的计算

熟悉 CSS 的同学都应该知道，当元素的 `width` 值是个百分比值时，它是相对于其父容器的 `width` 计算的；同样，它的 `height` 值是相对于父容器的 `height` 计算的。在网格布局中，如果网格轨道的值是一个百分比值时，它的计算是相对于网格容器的 `width` 或 `height` 来计算，其中：

- 列轨道的百分比（即 `grid-template-columns` 或 `grid-auto-columns` 属性的值是百分比值）是相对于网格容器宽度（`width`）计算，更为严格地说，它是相对网格容器的内联轴尺寸 `inline-size` 来计算。
- 行轨道的百分比（即 `grid-template-rows` 或 `grid-auto-rows` 属性的值是百分比值）是相对于网格容器高度（`height`）计算，更为严格地说，它是相对网格容器的块轴尺寸`block-size` 来计算。

> 注意，`inline-size` 和 `block-size` 涉及到 CSS 逻辑属性方面的知识，这里不做详细阐述，为了节约时间，减少课程的复杂度，这里只按书写模式 `ltr` 来举例！

比如下面这个网格，我们显式设置网格容器的 `width` 和 `height` ：

```CSS
.container {
    width: 800px;
    height: 400px;
    
    display: grid;
    grid-template-columns: 20% 50%  30%;
    grid-template-rows: repeat(2, 50%); /* 等同于 50% 50% */ 
}
```

`grid-template-columns` 和 `grid-template-rows` 分别相对于网格容器的 `width` 和 `height` ，可以计算出网格轨道（列轨道和行轨道）尺寸。如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15d4dc6f2306408abd5a08dedb2d2b9d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/ZEoVxNe>

注意，`grid-auto-columns` 计算等同于 `grid-template-columns` ；`grid-auto-rows` 计算等同于 `grid-template-rows` 。如果将上面示例代码改用 `grid-auto-*` 得到的结果是相似的：

```CSS
.container {
    width: 800px;
    height: 400px;
    
    display: grid;
    grid-auto-columns: 20%  50%  30%; /* 相对于网格容器的 width 计算 */
    grid-auto-rows: 50% 50%;          /* 相对于网格容器的 height 计算 */
    
    grid-template-areas: "col1 col2 col3"; /* 显式指定列网格轨道数量 */
}
```

众所周知，当 `width` 值为 `100%` 且该元素显式设置了 `padding` 或 `border-width` 值时，并且 `box-sizing` 不是 `border-box` 时，设置宽度为 `100%` 的元素就会溢出容器；或者 `width` 为 `100%` 的元素碰到外边距 `margin` 也会引起元素溢出容器：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8772c0f25c20465383c772e95b560621~tplv-k3u1fbpfcp-zoom-1.image)

在网格布局中同样会有类似的现象。当网格轨道的值都是百分比值，而且总值是 `100%` 时，要是加上 `gap` 设置网格轨道间距，就会造成总值超过网格容器，网格就会溢出。这是因为，网格轨道取值百分比时，它是基于网格容器的大小计算，并不会关心网格容中的其他情况。

比如上面示例，网格行轨道和列轨道值的总和都是 `100%` 了，此时网格容器要是设置 `gap:20px` ，其网格就会溢出网格容器：

```CSS
.container {
    width: 800px;
    height: 400px;
    
    display: grid;
    grid-template-columns: 20% 50%  30%;
    grid-template-rows: repeat(2, 50%); /* 等同于 50% 50% */ 
    
    gap: 20px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48ea1ed402694b7fa792e179e53306fb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/bGMzVgz>

因此，给网格轨道设置百分比值要尤其小心，**切勿让所有网格轨道都取百分比值** ，因为这样就无法利用 `gap` 属性，你无法确认所有网格轨道的尺寸值总和不是 `100%` 。当然，在某些情况下，网格轨道取百分比值还是很有意义的，比如你想保证某条（列或行）网格轨道在网格容器中占一定比例。另外就是，当 `fr` 不能用于网格沟槽的情况下（注意，`gap` 属性值不能是带有 `fr` 单位的值），百比值也可以让 `gap` 属性有一个良好的值。

在 CSS 中，当容器子元素宽度总和是 `100%` 时，要是在任何子元素上设置`margin` 值，也会造成子元素溢出容器，比如下面这个示例：

```HTML
<flex-container>
    <flex-item></flex-item>
    <!-- 总共有四个 Flex Item -->
</flex-container>
```

```CSS
.flex__container {
    width: 800px;
    height: 400px;
    
    display: flex;
    flex: 1 0 20%;
}

.flex__item {
    margin: 2rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/207390b724944ea7a8b8b68f6b3100a5~tplv-k3u1fbpfcp-zoom-1.image)

不过，这一现象在网格中的表现却有所不同。网格轨道的尺寸值总和是 `100%` ，这个时候在网格项目上设置 `margin` 值时，并不会致使网格溢出容器，只会让网格项目距所在单元格（或网格区域）四边有一定的间距（`margin` 值）。它表现出来的现象就像是网格项目向内收缩一样：

```CSS
.container {
    display: grid;
    grid-template-columns: 20% 50% 30%;
    grid-template-rows: repeat(2, 50%);
}

.item {
    margin: 20px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e1ccfb815e64acfbb7e8458b0608733~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/BaxMjbL>

## 网格中 fr 的计算

`fr` 单位值仅能用于 CSS 网格布局中，即它只用于 `grid-template-rows` 、`grid-template-columns` 、`grid-auto-rows` 和 `grid-auto-columns` 属性上。它是一种特殊的大小调整方法，可以根据网格容器中可用空间份额比例来调整网格轨道大小。

`fr` 的工作方式与 `flex` 中的 `auto` 非常类似。不过它的计算要比 Flexbox 中的 `flex` 简单得多。接下来，我们一起来看看它在网格中是如何计算的。

上一节中，我们聊到了“**网格轨道取百分比值时，很易于造成网格溢出网格容器** ”，比如上面展示的示例：

```CSS
.container {
    display: grid;
    grid-template-columns: 20% 50% 30%;
    grid-template-rows: repeat(2, 50%);
    gap: 20px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e25efb9d4cd94ce79501bb8276c958c0~tplv-k3u1fbpfcp-zoom-1.image)

正如你所看到的，网格溢出了容器。

如果我们把示例中的`%` 单位换成 `fr` 单位呢：

```CSS
.container {
    display: grid;
    grid-template-columns: 20fr 50fr 30fr;
    grid-template-rows: repeat(2, 50fr);
    gap: 20px;
}
```

你将看到，使用 `fr` 单位的网格，即 `gap` 设置的值为`20px` 也不会让网格溢出容器：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29d347af74be4ad284157d5a11ced44d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/xxjMOKV>

再来看一个示例，把`grid-template-columns` 的 `50%` （第二列）换成可调节的范围值，而其他的值都换成 `fr` 单位，比如：

```CSS
.container {
    display: grid;
    
    grid-template-columns: 20fr var(--col, 50%) 30fr;
    grid-template-rows: repeat(2, 50fr);
    gap: 20px;
}
```

你会发现，第一列和第三列轨道的大小会随着第二列轨道变化：

- 当第二列轨道变大时，第一列和第三列就会变小；
- 当第二列轨道变小时，第一列和第三列就会变大。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10946ba807894e31b53945d41681f473~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/NWMoNxa>

这两个示例都向你展示了 `fr` 的特性。继续往下，MDN 是这样描述 `fr` 的：

> **`fr`** **单位代表网格容器中可用空间的一等份** 。

从这个描述中不难发现，网格轨道使用 `fr` 单位确定尺寸大小的话，该网格轨道就被称为**弹性网格轨道** ，因为它会根据网格容器可用空间对网格轨道进行弹性缩放，看上去有点类似于 `flex` 的特征。

网格轨道使用 `fr` 单位时，一般会按下面公式来计算：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/315892da25114b3bb75fdf965fb50ca2~tplv-k3u1fbpfcp-zoom-1.image)

公式中所谓的**弹性系数指的就是设置了** **`fr`** **单位的值** ，即：

```CSS
网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和
// 弹性系数指的就是设置了 fr 单位的值
```

接下来，使用一个最基础的示例，来向大家阐述 `fr` 的功能和计算。

```HTML
<div class="container">
    <div class="item">
        CSS is Awesome!
    </div>
    <div class="item">
        W3cplus!
    </div>
    <div class="item">
        <img src="https://loremflickr.com/200/100?random=1" alt="">
    </div>
    <div class="item">
        现代Web布局: CSS Grid Layout!
    </div>
</div>
```

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
}

.item {
    padding: 10px;
}
```

注意，示例中的所有元素的 `box-sizing` 都是 `border-box`。

当`grid-template-columns` 的值是 `repeat(4, min-content)` 时：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: repeat(4, min-content);

    /* 等同于 */
    grid-template-columns: min-content min-content min-content min-content;
}
```

所有列网格轨道的尺寸都设置为 `min-content` 。在 Flexbox 的课程中我们介绍过 `min-content` 值，放到网格布局中是一样的，它对应的就是所在网格项目最小内容的长度。在我们这个示例中，这个时候网格容器会有一定的剩余空间出现：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/989ad249a92d402483080d7c4b0ee275~tplv-k3u1fbpfcp-zoom-1.image)

前面说了，设置了 `fr` 单位的网格轨道就是弹性网格轨道，它能像 Flexbox 布局中的设置了 `flex:auto` 的 Flex 项目一样，按照相应的弹性系数来分配空间（在网格中分配的是可用空间）。比如每个列网格轨道都显式设置是 `1fr` ：

```CSS
 .container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: repeat(4, 1fr);
 }
```

按照 `fr` 的计算公式，我们可以得知：

```CSS
步骤1 »» 网格容器内联轴可用空间 = 800px
步骤2 »» 总弹性系数 = 1fr × 4 = 4fr
步骤3 »» 每一个fr, 即 1fr = 800px ÷ 4 = 200px;
```

该示例的每个网格列轨道都**将分配到网格容器可用空间的一个等份，即** **`1fr`** ，因为我们显式示设置了 `grid-template-columns` 的值是 `repeat(4, 1fr)` （相当于 `1fr 1fr 1fr 1fr`）。根据公式计算，网格每个列轨道尺寸应该都相等，都应该是等于 `200px` ，即 :

```CSS
网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
网格列轨道2尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
网格列轨道3尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
网格列轨道4尺寸 = 1fr × 800px ÷ 4fr = 1 × 800 ÷ 4 = 200px
```

但事实上并非如此，浏览器计算出来的结果不是你想象的那样，每个列网格轨道尺寸是 `200px` ，实际计算出来的如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dfc472f412d4d14acbfd681dd172e32~tplv-k3u1fbpfcp-zoom-1.image)

造成这种现象，是因为第三列网格轨道触发了最小尺寸的现象（它的最小尺寸是 `220px`）。简单地说，计算出来的网格轨道尺寸不能小于其内容的最小尺寸（即计算出来的 `1fr` 尺寸`200px` 小于`min-content` 的尺寸`220px`），即**计算出来的值不能小于 `min-content`** 。

如果出现这种现象，浏览器会再次进行计算，将多出来的值（`220px - 200px = 20px`）分配到其他的网格轨道上。也就是说，第三列网格轨道多出来的 `20px` 要重新分配到另外三个列网格轨道上，此时每一个 `fr` 就等于 `6.667px` （`20px ÷ 3fr = 6.667px` ）。第一、二和四列网格轨道重新计算后的尺寸是：

- 第一列网格轨道尺寸：`200px - 6.667px = 193.33px`；
- 第二列网格轨道尺寸：`200px - 6.667px = 193.33px`；
- 第四列网格轨道尺寸：`200px - 6.667px = 193.33px`。

这就是为什么浏览器计算出来的第一、二和四列网格轨道尺寸是 `193.33px` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36e07254da0483b9a8f7d0491b57f63~tplv-k3u1fbpfcp-zoom-1.image)

浏览器在计算网格轨道的尺寸时是循环遍历的一个过程。要是重新计算出来的网格轨道尺寸小于其最小尺寸，就需要再次按照上面的方式进行计算，直到符合要求为止。

换句话说，如果计算出来的网格轨道值都大于其所在网格项目中最小尺寸（`min-content`）时，浏览器就不需要做多次的计算，比如上例中，如果我们把第三列的值换成 `2fr` ，即：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: 1fr 1fr 2fr 1fr;
 }
```

此时，总的弹性系数就是 `5fr` （`1fr + 1fr + 2fr + 1fr = 5fr`），每个`fr` 计算出来的值 `1fr = 800px ÷ 5fr = 800 ÷ 5 = 160px` ，根据公式可以计算出相应列网格轨道尺寸：

```CSS
网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × 800px ÷ 5fr = 1 × 800 ÷ 5 = 160px
网格列轨道2尺寸 = 1fr × 800px ÷ 5fr = 1 × 800 ÷ 5 = 160px
网格列轨道3尺寸 = 2fr × 800px ÷ 5fr = 2 × 800 ÷ 5 = 320px
网格列轨道4尺寸 = 1fr × 800px ÷ 5fr = 1 × 800 ÷ 5 = 160px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2282abbd84484e24a94def1a80a53643~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/wvjNWYb>

在给网格轨道设置尺寸时，你还可以将 `fr` 单位值和别的单位值混合使用，比如将上例中的第三列网格轨道尺寸设置为 `220px` ，其他列网格轨道继续设置为 `fr` 单位值：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: 1fr 1fr 220px 1fr;
 }
```

由于第三列网格轨道的尺寸是一个固定值（`220px`），因此它不是一个弹性网格轨道（即大小是固定不变的，不会因为内容尺寸变大而变大，也不会因内容尺寸变小而变小）。这样一来，它就占去容器可用空间的一部分空间。弹性轨道的可用容器空间就会产生变化，需要在原来的尺寸上减去第三列所占空间，即 `800px - 220px = 580px` 。相应的每个`fr` 对应的值就等于 `193.33px` （`580px ÷ 3fr = 193.33px` ）：

```CSS
grid-template-columns: 1fr 1fr 220px 1fr;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px = 580px (第三列网格轨道尺寸是一个固定值，即 220px)
步骤2 »» 总弹性系数 = 1fr × 3 = 3fr
步骤3 »» 每一个fr, 即 1fr = （800px - 220px） ÷ 3fr = (800 - 220) ÷ 3 = 193.33px
```

计算出来的网格列轨道尺寸分别是：

```CSS
网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × (800px - 220px) ÷ 3fr = 1 × 580 ÷ 3 = 193.33px
网格列轨道2尺寸 = 1fr × (800px - 220px) ÷ 3fr = 1 × 580 ÷ 3 = 193.33px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 1fr × (800px - 220px) ÷ 3fr = 1 × 580 ÷ 3 = 193.33px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef1b42b2a1af4148830d6e6f2c7302db~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/wvjNReB>

同样的，CSS 的 `gap` 属性的值也会影响 `fr` 计算。如果你显式设置了 `gap` 属性的值，它也会占用网格容器的部分可用空间。比如在上面的示例基础上，你设置了 `gap` 的值为 `20px` ：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: 1fr 1fr 220px 1fr;
    
    gap: 20px;
 }
```

此时，网格容器的可用空间等于 `520px` （即 `800px - 220px - 20px × 3 = 520px`），弹性总系数是 `3fr` ，对应的每个 `fr` 的值是 `173.33px` （即 `520px ÷ 3 = 173.33px` ）：

```CSS
grid-template-columns: 1fr 1fr 220px 1fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 1fr × 3 = 3fr
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 3fr = (800 - 220 - 20 x 3) ÷ 3 = 173.33px
```

计算出来的网格轨道尺寸就会是：

```CSS
网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 1fr × (800px - 220px - 20px × 3) ÷ 3fr = 1 × 520 ÷ 3 = 173.33px
网格列轨道2尺寸 = 1fr × (800px - 220px - 20px × 3) ÷ 3fr = 1 × 520 ÷ 3 = 173.33px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 1fr × (800px - 220px - 20px × 3) ÷ 3fr = 1 × 520 ÷ 3 = 173.33px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed9f58fce30c470faf71c54285b30df5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/YzLBBXz>

注意，除了 `gap` 属性之外，设置非 `fr` 值的轨道值都会对 `fr` 计算产生影响，比如示例中的固定单位 `px` 值。

前面几个示例向大家展示的是 `fr` 的值都是整数值，比如 `1fr` 、`2fr` ，其实在给网格轨道设置`fr` 值时也可以是小数值，比如 `0.1fr` ，`1.5fr` 等。接下来，通过两个示例来向大家展示 `fr` 值是带有小数值时如何计算，以及网格容器可用空间是如何分配的。比如下面这个示例：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: .5fr .5fr 220px .5fr;
    
    gap: 20px;
 }
```

示例中将第一列、第二列和第四列网格轨道都设置为 `0.5fr` 。通过前面示例我们可以得知，网格容器可用空间是 `520px` （即 `800px - 220px - 20px × 3 = 520px` ），弹性系数总值是 `1.5fr` （即 `0.5fr × 3 = 1.5fr`）。注意，**弹性系数总值是大于 `1`** **的** 。它的计算过程如下：

```CSS
grid-template-columns: 0.5fr 0.5fr 220px 0.5fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.5fr × 3 = 1.5fr (弹性系数总和是大于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1.5fr = (800 - 220 - 20 x 3) ÷ 1.5 = 346.667px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间 ÷ 所有网格轨道弹性系数总和

网格列轨道1尺寸 = 0.5fr × (800px - 220px - 20px × 3) ÷ 1.5fr = 0.5 × 520 ÷ 1.5 = 173.33px
网格列轨道2尺寸 = 0.5fr × (800px - 220px - 20px × 3) ÷ 1.5fr = 0.5 × 520 ÷ 1.5 = 173.33px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.5fr × (800px - 220px - 20px × 3) ÷ 1.5fr = 0.5 × 520 ÷ 1.5 = 173.33px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce88d4d05aa54d7caa98ca16cf2b064c~tplv-k3u1fbpfcp-zoom-1.image)

该示例的所有弹性列网格轨道总系数是 `1.5fr` ，它大于 `1fr` 。网格布局中 **`1` 个 `fr` （即 `1fr`）就是 `100%`** 网格容器可用空间，也正因为如此，弹性列网格轨道把网格容器可用空间都按弹性系数分完了，**网格容器也就不会有任何的剩余空间产生**。

既然弹性总和会有大于等于`1` 的情况，那也有可能会是小于 `1` 的情景。在网格布局中，如果弹性网格系数总和小于 `1` ，那计算 `fr` 的值就不能再使用前面的计算公式了，它需要按照下面的公式来计算网格轨道尺寸：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be5508b4e1bc4841982f62bd03605ff6~tplv-k3u1fbpfcp-zoom-1.image)

> **注意，你可以不改变计算公式，只不过当弹性系数小于 `1`** **时，那么** **`1fr`** **就是网格容器可用空间** !

比如，我们将列网格轨道的值设置为：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: .3fr .2fr 220px .2fr;
    
    gap: 20px;
 }
```

示例中所有列网格轨道弹性系数总和是 `0.7fr` （即 `0.3fr + 0.2fr + 0.2fr`），**它小于 `1fr`** 。根据公式，我们可以计算出相应的列网格轨道尺寸：

```CSS
grid-template-columns: 0.3fr 0.2fr 220px 0.2fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.3fr + 0.2fr + 0.2fr = 0.7fr (弹性系数总和是小于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1fr = (800 - 220 - 20 x 3) ÷ 1 = 520px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 20px × 3) = 0.3 × 520 = 156px
网格列轨道2尺寸 = 0.2fr × (800px - 220px - 20px × 3) = 0.2 × 520 = 104px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.2fr × (800px - 220px - 20px × 3) = 0.2 × 520 = 104px
```

计算之后的所有列网格轨道的尺寸总和是 `584px` （即 `156px + 104px + 220px + 104px = 584px`），即使加上列网格轨道之间的间距，总占用网格容器的空间是`644px` （`584px + 20px × 3 = 644px`），都小于网格容器的可用空间 `800px` 。也就是说，**当所有网格轨道弹性系数（****`fr`****）之和小于** **`1`** **时，它们将占用小于** **`100%`** **的网格容器的可用空间，即网格容器会有剩余空间出现** 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0320d765d784dd1a3c5010b2e63514c~tplv-k3u1fbpfcp-zoom-1.image)

值得注意的是，当网格轨道的弹性系数是一个小于 `1` 的值时，更易于触及网格轨道最小尺寸的边缘。

前面我们说过，网格轨道的尺寸最小不能小于其内容的最小尺寸，即 `min-content` 。一旦触发了，浏览器在计算弹性轨道尺寸时，就会重新遍历网格轨道，有可能会进行多次计算。不同的是，所有网格轨道弹性系数小于 `1` ，且触发最小尺寸时，浏览器会循环遍历网格轨道，重新计算网格容器的可用空间。比如，将上面示例的 `grid-template-columns` 值调整为 `0.3fr 0.1fr 220px 0.1fr`，即：

```CSS
.container {
    display: grid;
    width: 800px;
    height: 200px;
    
    grid-template-columns: .3fr .1fr 220px .1fr;
    
    gap: 20px;
 }
```

所有弹性列网格轨道的弹性系数总和是 `0.5fr` ，它小于 `1fr` ，根据相关公式，我们可以计算出对应的网格轨道尺寸：

```CSS
grid-template-columns: 0.3fr 0.1fr 220px 0.1fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.3fr + 0.1fr + 0.1fr = 0.5fr (弹性系数总和是小于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1fr = (800 - 220 - 20 x 3) ÷ 1 = 520px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 20px × 3) = 0.3 × 520 = 156px >  min-content, 即96.58px
网格列轨道2尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px < min-content，即89.08px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px < min-content，即75.38px
```

从第一次计算的结果中不难发现，第二列和第四列的计算值都小于其最小尺寸（`min-content`），此时浏览器将会再次计算网格容器的可用空间。浏览器第一次计算出来的第二列和第四列的值小于它们的最小尺寸（`min-content`），加上网格轨道尺寸是不能小于其最小尺寸，要是小于最小尺寸，将会取其 `min-content` 作为对应网格轨道的尺寸。如此一来：

- 第二列的`min-content` 尺寸值等于 `89.08px` ，浏览器会将该值作为第二列网格轨道尺寸的计算值；
- 第四列的 `min-content` 尺寸值等于 `75.38px` ，浏览器会将该值作为第四列网格轨道尺寸的计算值。

根据这些值，浏览器会重新计算出网格容器的可用空间，即 `800px - 220px - 20px × 3 - 89.08px - 75.38px = 355.54px` 。网格第一列根据公式可以计算出 `0.3fr` 对应的值，即 `0.3 × 355.54px = 106.66px` 。

整个计算过程如下：

```CSS
grid-template-columns: 0.3fr 0.1fr 220px 0.1fr;
gap: 20px;

步骤1 »» 网格容器内联轴可用空间 = 800px - 220px - 20px × 3 = 520px (第三列网格轨道尺寸和网格沟槽会占用网格容器的可用空间)
步骤2 »» 总弹性系数 = 0.3fr + 0.1fr + 0.1fr = 0.5fr (弹性系数总和是小于1的)
步骤3 »» 每一个fr, 即 1fr = （800px - 220px - 20px × 3） ÷ 1fr = (800 - 220 - 20 x 3) ÷ 1 = 520px


网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 20px × 3) = 0.3 × 520 = 156px >  min-content, 即96.58px
网格列轨道2尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px < min-content，即89.08px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = 0.1fr × (800px - 220px - 20px × 3) = 0.1 × 520 = 52px < min-content，即75.38px

网格轨道尺寸不能小于其内容最小尺寸 min-content
当有网格轨道尺寸小于其最小尺寸时，将最小尺寸设置为网格轨道尺寸，浏览器重新计算网格容器的可用空间

-----浏览器重新计算网格容器的可用空间------
网格容器的可用空间 = 800px - 220px - 89.08px - 75.38px - 20px × 3 = 355.54px
每一个fr，即 1fr = (800px - 220px - 89.08px - 75.38px - 20px × 3) ÷ 1fr = 355.54px

网格轨道弹性尺寸 = （网格轨道弹性系数）× 网格容器可用空间

网格列轨道1尺寸 = 0.3fr × (800px - 220px - 89.08px - 75.38px - 20px × 3)  = 0.3 × 355.54 = 106.66px >  min-content, 即96.58px
网格列轨道2尺寸 =  min-content = 89.08px
网格列轨道3尺寸 = 220px，它是一个固定尺寸，不需要计算
网格列轨道4尺寸 = min-content = 75.38px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/497468ee3c9444d385561b65fc7a66e4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/XWqOOpy>

如果上面的计算公式和过程让你还是对 `fr` 计算感到困惑，那么你可以尝试着换下面的这种方式来理解 `fr` 的计算，用你熟悉的 `%` 知识来理解 `fr` 。

简单地说：

> **`1`****个****`fr`****（即****`1fr`****）就是****`100%`****网格容器的可用空间；****`2`****个****`fr`****（即****`2fr`****）是各****`50%`****网格容器的可用空间，即****`1fr`****是****`50%`****网格容器的可用空间。以此类推****，要是你有`25`****个****`fr`****（即****`25fr`****），那么每个****`fr`****（****`1fr`）就是** **`1/25`** **或** **`4%`** 。

 使用饼图可以很形象地描述`fr`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90bd56460a144ea6b88badeed11d63b9~tplv-k3u1fbpfcp-zoom-1.image)

**注意，一个饼图（圆）就相当于网格容器的可用空间，分割的份数就相当于设置了弹性系数的网格轨道** 。

无论你是要使用 `fr` 还是 `%` 来设置网格轨道的值，都可以按下面的方式来执行：

- ①：决定有多少个网格轨道（列或行） ；
- ②：进行计算 ；
- ③：创建轨道 ；
- ④：将数值应用于每个网格轨道 。

先使用 `%`。假设网格容器宽度是 `800px`（在无其他网格属性显式设置之下，这个值也是网格容器的可用空间），并且该网格有四列（为了好区别，给每个网格列轨道分别取个名，比如“**Tom** ”、"**Jack** "、"**Lucy** "和"**Nick** "）。 同时希望列宽相等，而且填充整个网格容器（网格容器可用空间全部用完），那么每列设置的值就是 `100 ÷ 4 × 100% = 25%`：

```CSS
.container { 
    width: 800px; 
    display: grid; 
    
    grid-template-columns: 25% 25% 25% 25%; 
}
```

每列网格轨道宽度都是网格容器可用空间（`800px`）的 `25%`，即：`800px × 25% = 200px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a552cdf095142d99097dd0263bf0caf~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/mdLvYME>

后来你决定让其中一列的宽度（比如“Tom”）是其他列的宽度的两倍，即 `2x + 1x + 1x + 1x = 100`，那么 `x` 是多少？如果仅仅是粗暴地将“Tom”列设置为 `50%`，其他依旧是 `25%`，这样就假设 `x = 25%` 了：

```CSS
.container { 
    grid-template-columns: 50% 25% 25% 25%; 
 } 
```

网格“Nick”列轨道溢出了网格容器：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a44debe3a74424297ac992ceb88a95e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNvPgRg>

**前面介绍** **`%`** **时说过，网格轨道取值** **`%`** **是相对于网格容器宽度计算** 。

如果我们希望网格轨道不溢出网格容器，就需要重新计算 `x` 的值，即 `2x + 1x + 1x + 1x = 100`，就可以算出 `x = 100 ÷ 5 = 20`，一个 `x` 就是网格容器可用宽度的 `20%`，对应的就是`160px`：

- ①：“Tom” 列宽就是 `2x = 2 x 20% = 40%`；
- ②：“Jack”列宽就是 `1x = 1 x 20% = 20%`；
- ③：“Lucy”列宽就是 `1x = 1 x 20% = 20%`；
- ④：“Nick”列宽就是 `1x = 1 x 20% = 20%`。

算出每个 `x` 值之后，需要重新改变每一列的轨道值：

```CSS
 .container { 
     grid-template-columns: 40% 20% 20% 20%; 
 } 
```

重新计算并设置网格列轨道值之后，网格列不会溢出网格容器了，但每列的列宽就变了，但还是保持了“Tom”列宽是其他列宽的两倍：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c19d05ea2f11485396c80c743efafc87~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/NWMoZGL>

如果说需要再新增一列（比如“**Tony** ”），这样一来网格容器就有五列，且每列网格轨道都是 `25%`。即：

```CSS
.container { 
    grid-template-columns: 25% 25% 25% 25% 25%; 
} 
```

新增的“Tony”列将会溢出网格容器：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6e8b46f60e4b618aa32c5f0ae89d20~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/QWrYXvY>

如果不希望新增的列溢出网格容器，那么就需要五列加起来的总数是 `100`，每列是 `100 ÷ 5 = 20%`。需要调整每列的宽度：

```CSS
.container { 
    grid-template-columns: 20% 20% 20% 20% 20%; 
} 
```

你会发现，网格列轨道的尺寸使用百分比值，在新增或删除一列，或添加网格沟槽，或改变它们的大小，都需要：

- 重新计算每一列网格轨道的大小；
- 将新的尺寸值重新应用于每列网格轨道。

而 `fr` 将改变这一切。同样的，需要创建四列，每一列的宽度是 `1fr`：

```CSS
 .container { 
     grid-template-columns: 1fr 1fr 1fr 1fr; 
 } 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f92b645f8c249cb89b3459d3beba333~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/wvjNLjR>

我们可以使用饼图来拆分上图中 `fr` 的计算。把网格容器可用空间（`800px`）当作是一张饼，它被网格列轨道（“Tom”，“Jack”，“Lucy”和“Nick”）分成了四份（即`4`个`1fr`），每份（`1fr`）等于 `1 ÷ 4 = 0.25`（即`25%`）：

![img](./assets/591fb0281fde47cc96766a0a893557d5~tplv-k3u1fbpfcp-zoom-1.jpeg)

和 `%` 有点类似，如果你想“Tom”列是其他列的两倍，只需要将这一列设置为 `2fr`。

```CSS
.container { 
    grid-template-columns: 2fr 1fr 1fr 1fr; 
 } 
```

![img](./assets/583a34bcdd094b1c884175b56e53bb2a~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/GRdLqVd>

同样的，网格容器的可用空间这张饼图（`800px`）分成了四份，其中“Tom”列是 `2fr`，等于`2`个`fr`，而且是其他列（“Jack”，“Lucy”和“Nick”）的两倍（`1fr`）。所以`1fr`的值是`1 ÷ 5 = 20%`（`2fr + 1fr + 1fr + 1fr = 5fr`）。因此，“Tom”列的 `2fr` 是 `2/5`（`40%`）：

![img](./assets/fdb39336b49c422186fd73d14e16c91a~tplv-k3u1fbpfcp-zoom-1.jpeg)

网格轨道使用 `fr` 单位时，如果饼图大小改变了（网格容器可用空间改变了），我们也不需要重新调整网格轨道的值：

![img](./assets/4bf666fd8b53427f9e2ce6617348c71b~tplv-k3u1fbpfcp-zoom-1.jpeg)

网格容器 `.container` 从 `800px` 宽度变到 `1200px` 时，`fr` 单位会根据网格容器可用空间自动调整网格项目大小：

![img](./assets/2569adb389e2434b989879fd97948532~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/xxjeRye>

同样的原理，即使有网格沟槽的出现（比如 `20px`），或者新增非 `fr` 的网格轨道出现（比如“Tony”列列宽是 `200px`）：

```CSS
 .container { 
     grid-template-columns: 1fr 1fr 1fr 1fr 200px; 
     gap: 20px; 
 } 
```

![img](./assets/17157b7177e24f56ae252716ac6c1b3b~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/Poegbrp>

正如上图所示，“Tony”列先从饼图中分去 `200px`，其中网格沟槽占用了 `80px`（即 `20px x 4`），整个饼图并不完整了，只剩下 `520px`（`800px - 280px`），相当于网格容器可用空间只有 `520px`。不过，剩下的饼图同样分成了四分，“Tom”、“Jack”、“Lucy”和“Nick” 分到相同的等份，即`1`个`fr`（`1fr`），每个`fr`是 `1/4`（`25%`）。

如此一来，`1fr` 可以用两种方式来描述：

- **用分数表示** ：`1fr = 1 ÷ 所有网格轨道弹性系数总和`（`fr`总和）；

- **用百分比表示** ：`1fr = 100 ÷ 所有网格轨道弹性系数总和`（`fr`总和）。

用示例来描述的话：

- ①：所有网格列轨道是`4`列，且每列宽都是`1fr`，那么 `1fr = 1 ÷ 4 = 1/4 = 25%`，即网格容器可用空间的`25%`。
- ②：设置网格容器可用空间是 `800px`，那么每个 `fr` 计算出来的值是 `800 x 1/4 = 200px`（`800 x 25% = 200px`）。
- ③：如果网格容器新增一列，此时所有网格列轨道就是`5`，那么 `1fr = 1 ÷ 5 = 1/5 = 20%`，即网格容器可用空间的`20%`。
- ④：如果设置第一列（或某个列）的宽度是`2fr`，其他列宽仍然是 `1fr`，那么`fr`总和是 `2fr + 1fr + 1fr + 1fr + 1fr = 6fr`。  
- ⑤：此时，`1fr = 1/6 = 16.6667%`，即网格容器可用空间的 `16.6667%`；第一列是`2fr`，它的值是 `2fr = 2/6 = 33.33%`，即网格容器可用空间的`33.33%`。
- ⑥：如果设置第一列宽度是`200px`，其他列仍然是`1fr`宽。现在的总数是 `200px + 1fr + 1fr + 1fr + 1fr = 200px + 4fr`，那么所有列的 fr 总和就是`4fr`，对应的`1fr = 1/4 = 25%`，即网格容器可用空间的`25%`。由于第一列宽度是`200px`，那么网格容器可用空间就是 `800px - 200px = 600px`（即网格容器宽度减去第一列列宽）。也就是说，`1fr`等于网格容器可用空间`600px`的`25%`，等于`600 x 25% = 150px`（即`1fr=150px`）。

在 CSS 网格布局中，`1fr` 的计算大致就是这样的一个过程。

### 网格项目中的最小尺寸

不过值得一提的是，**设置** **`1fr`** **的网格轨道并不代表着网格轨道的列宽（或行高）都是相等的** 。这个就好比 Flexbox 布局中的 `flex` 属性，即 **所有设置** **`flex:1`** **的** **Flex** **项目并不一定就是相等的（或者说均分容器）**。

这是因为，它和网格轨道中的内容有着关联。换句话说，**只要内容是灵活的（网格项目大小会随着内容扩大或收缩），一个** **`fr`** **单位就是总量的一部分** 。意思是说，**只要网格项目中的内容能够缩放以适合该网格轨道（列或行），设置** **`1fr`** **网格轨道的大小就相等** 。

然而，一旦网格项目内容停止缩放以适应网格轨道，设置 `fr` 值的网格轨道就会被重新调整，使内容能更好的适配。比如，如果网格布局中有一列具有一个固定宽度的网格项目，该网格列轨道的宽度将永远不会小于这个网格项目的宽度。

因此，一个具有 `1fr` 的网格列轨道，其最小值等于内容的最小宽度（即 `min-content`），其中 `min-content` 可以是网格轨道中网格项目的一个固定尺寸的元素，比如图片的宽度，也可以是一个文本节点中最长的字。如果这种情况在网格布局中产生的话，那么其他设置 `1fr` 值的网格轨道就会相应地按比例缩小。

简单地说：

> **将所有网格列（或行）轨道的值为** **`1fr`** **，并不一定能让所有网格列（或行）轨道相等** 。

![img](./assets/eafe541c03ca4c7e86ebaba4b2faceb9~tplv-k3u1fbpfcp-zoom-1.jpeg)

碰到这种现象并不等于无解，还是可以通过一些技术手段来规避这种现象产生的：

![img](./assets/4e1b897b96f44161af5808844045bc99~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/eYrovrg>

为了增强大家的理解，我们以上面示例为例，一步一步来阐述。

这个示例是一个 `3 x 1` （三列一行）的网格，在 `grid-template-columns` 属性设置 `repeat(3, 1fr)` 值，表示三列网格轨道尺寸都是 `1fr` ：

```CSS
.container {
    inline-size: 1000px;
    
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}
```

当网格轨道中的内容（网格项目）的尺寸小于 `1fr` 时，三列是均等的，达到了均分容器宽度的效果。即 `1fr` 等于网格容器可用空间（`1000px - 20px × 2rem` ）的 `1/3=33.333%` 。

```HTML
<div class="container">
    <div class="item">
        <h4>1fr</h4>
        <p>Tom</p>
    </div>
    <div class="item">
        <h4>1fr</h4>
        <p>Jack</p>
    </div>
    <div class="item">
        <h4>1fr</h4>
        <p>Lucy</p>
    </div>
</div>
```

![img](./assets/d43f66268cb442f4b61e182cdd05f1f4~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址：<https://codepen.io/airen/full/zYjXwbe>

如果你在 “Tom” 列加入一张 `480px` 宽的图片时，并且样式中没有对 `img` 设置 `max-width: 100%` 或者 `aspect-ratio` 相关的样式（假设没有设置其他与该图片尺寸有关的任何 CSS 样式规则），你将看到的效果如下：

![img](./assets/f83fd74faee847baa2a25c008331889f~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/vYjMZLX>

按照 `1fr` 的计算方式，在该例中，`1fr = 322.67px`，而事实上，包含图片的“Tom”列，其列宽度不可能小于 `500px` ，即 图片的宽度 `480px` 加上网格项目的内距 `10px` 。也就是说，“Tom” 列的宽度要比 `1fr` 计算出来值要更大。即使如此，也不代表着该列的 `1fr` 就等于 `500px`，它仅能代表的是该列的列宽现在是 `500px`（因为该列的最小内容宽度就是 `img` 的 `width` 值）。

同时“Tom”列占用网格容器可用空间中的 `500px`，相应留给 `fr` 计算的空间就只剩下 `468px` （`1000px - 500px - 2 × 2rem` ，其中`1rem` 是 `16px` ），其他两列各占剩余空间的 `1fr`，即 `1fr = 1/2=50%`，“Jack” 和 “Lucy” 两例计算出来的列宽约是 `234px` 。

如果在网格项目中有长单词，或没有任何连字符（`-`）和空格的字符，比如一个 URL，也有可能会致使所在网格列轨道变宽（比计算出来的 `1fr` 值要大）。比如，你 “Tom” 列中的 `<img ``/>` 换成长字符，你会发现，它所在列轨道也要比其他列宽，即三列不相等：

![img](./assets/57a64aff9f734604a9c0d14486a408d0~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/NWMmVRN>

示例中在 “Tom” 列添加了一个长字单词，其字符形长度大约是 `507.74px` ，另一个是 URL 地址，在没有中连字符（`-`）和空格等条件之下，也会被视为一个长字符，其字形长度大约是`659.7px` 。也就是说，“Tom” 列内容最小尺寸（`min-content`）就是 URL 地址所用字符长度。

所以，“Tom” 列的列宽大约是 `679.7px` （URL 字符长度加上所在网格项目内距，`659.7px + 20px`），网格容器留给 “Jack” 和 “Lucy” 两列可分的空间就只剩下 `288.30px` （`1000px - 679.7px - 2 × 16px` ，共中 `1rem` 等于 `16px`），对应的 `1fr = 1 / 2 = 50%` ，“Jack” 和 “Lucy” 两列的列宽是 `144.15px` （`288.30× 50%` ）。

从这两个示例展示的效果中不难发现，`fr` 会自动设置**最小值（****`min-width`****）** ，这将尊重里面的内容，相当于 `min-width` 的值为 `min-content`。对于`fr`来说：

> **最小值（****`min-width`****）是自动设置的（相当于****`min-content`****）；最大值（****`max-width`**）就是显式设置的值（比如 **`1fr`**、 **`2fr`**、 **`3fr`** 等）。

`1fr` 的底层实现逻辑其实就是 `minmax(auto,1fr)` （`minmax()` 是用来设置网格轨道尺寸一个 CSS 函数），意味着 `min=auto`（即`min-width: min-content`），`max=1fr`。

![img](./assets/aa1b3da0eeae45e6b79207c4d3aafebb~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/VwxNOqZ>

也就是说，如果你真的需要均分列（所有设置 `1fr` 的列宽相等），就应该使用 `minmax(0, 1fr)` 来替代 `1fr` ，将 `1fr` 的默认`min-width` 从 `min-content` （即 `auto`）重置为 `0` 。这样就允许网格轨道尺寸保持在 `0` 至 `1f` 范围内（最小小到 `0` ，最大大到 `1fr`），从而创建保持相等的列。

![img](./assets/24c575f300c942909a22c0251c312aae~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/BaxeByB>

但是，请注意，如果网格轨道中有元素内容最小尺寸大于 `1fr` 计算出来的网格轨道尺寸时，这将导致内容溢出，比如上面示例中的图片和长字符单词。如果需要避免内容溢出，则需要通过其他的 CSS 来处理，比如在 `img` 上设置 `max-width: 100%` ，对长字符设置 `word-break` 或在包裹它们的网格项目上设置 `overflow` 的值为 `scroll` 或 `hidden` ：

![img](./assets/ed8c82dff0c2440ebe8e70a27483b1c7~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/eYraOey>

`fr` 这个表现行为和 Flexbox 中的 `flex:1` 有点类似，除了使用 `minmax(0, 1fr)` 来替代 `1fr` 之外，可以在网格项目上显式设置 `min-width: 0` 来达到同等的效果：

```CSS
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.item {
    min-width: 0;
}
```

![img](./assets/88e6f69281e643a69e537a4b66108e01~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/XWqwJRK>

同样的，对于图像或长字符单词，需要做额外处理，不然会有溢出的可能。

在 CSS 网格布局中，`fr` 是一个非常有用的单位，也是 CSS 网格布局中独有的特性。虽然 `fr` 很强大，但也不能说随时随地都可以使用`fr`。比如说：

- 在`calc()` 表达式中使用 `fr` 就无效，因为 `fr` 的 `<flex>` 值类型，它和其他 `<length>`值类型不兼容；
- `gap` 属性中也不能使用 `fr`，因为 `fr` 是用来指定网格轨道尺寸的，不是用来指定网格沟槽大小的；
- `calc()` 中使用 `var()` 和 `fr` 计算也是一种无效行为，比如  `.container{--fr: 2; grid-template-columns: calc(var(--fr) * 1fr)`。

`fr` 有点类似 `flex`，一般情况都将其视为默认动态单位，可以根据容器可用空间来指定网格轨道。类似 `fr` 这样的动态单位，特别适用于自适应布局中。比如两列布局，侧边栏固定宽度，主内容自动分割网格容器的可用空间：

```CSS
.container { 
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 220px 1fr;  /* 1fr 也可以使用 minmax(0, 1fr) 替代 */
    gap: 20px; 
}   
```

![img](./assets/5e0785e75418497685f842136fdf24d2~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/NWMVPBQ>

使用 `fr` 虽然能很好地帮助我们构建 Web 布局的效果，尤其是一些弹性布局的效果，但还是要尽可能地规避其最小值的状况。也就是说，我们在使用 `fr` 构建一些布局时，可以在网格项目上显式设置 `min-width` 的值为 `0` 。这样你的代码更具防御性，你构建的 Web 布局也更健壮。

比如下面这个文本截取的案例（它属于十大经典 Web 案例之一，介绍 Flexbox 的时候有专门介绍过）：

![img](./assets/9b1642549e854b3ab52418657a84ba2d~tplv-k3u1fbpfcp-zoom-1.gif)

我们使用 CSS Grid 可以这样来完成：

```HTML
<div class="target">
  <div class="target__title">
    <strong>Grid Layout:</strong> Text here is very very long that it might
    get truncate if this box get resized too small
  </div>
  <div class="target__emoji">
    🎃
  </div>
</div>
```

```CSS
.target {
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  align-items: center;
  gap: 1rem;
}

.target__title {
  overflow: hidden;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

> Demo 地址： <https://codepen.io/airen/full/VwxOYVd>

## 小结

前面只是和大家一起探讨了网格布局中的百分比值和 `fr` 值的计算：

- `<percentage>`： 非负值的百分比值，它相对于网格容器宽度（或高度）计算。采用百分比时有一个细节需要注意，如果网格容器的尺寸大小依赖网格轨道大小时，百分比值将被视为 `auto`；
- `<flex>` ： 非负值，用单位 `fr` 来定义网格轨道大小的弹性系数，有点类似于 Flexbox 布局中的 `flex` 属性，按比例分配网格容器的剩余空间。

但这绝不是说网格中涉及到计算的就这两种值，其实还有很多其他值也会涉及到计算，比如 `grid-template-columns` 取值为 `auto` 、`min-content` 、`max-content` 关键词，以及一些 CSS 函数，比如 `fit-content()`  、`minmax()`、`min()` 、`max()` 、`clamp()` 和 `clac()` 等。

- `max-content`：表示以同一网格轨道中内容最大内容的网格项目来计算格轨道网格轨道尺寸。
- `min-content`：表示以同一网格轨道中最大的最小内容的网格项目来计算网格轨道尺寸。
- `auto` ： 如果轨道为最大时，等同于 `<max-content>`，为最小时，则等同于 `<min-content>`。
- `minmax(min, max)` ： 是一个来定义大小范围的函数，大于等于 min 值，并且小于等于 max 值。如果 max 值小于 min 值，则该值会被视为 min 值。最大值可以设置为网格轨道系数值 `<flex>`，但最小值则不行。
- `fit-content([<length> | <percentage>])` ： 相当于 `min(max-content, max(auto, argument))`，类似于 `auto` 的计算（即 `minmax(auto, max-content)`），除非网格轨道大小值是确定下来的，否则该值都大于 `auto` 的最小值。
- `repeat([<positive-integer> | auto-fill | auto-fit], <track-list>)`： 表示网格轨道的重复部分，以一种更简洁的方式去表示大量而且重复列的表达式

你会发现，这些尺寸的计算大多会和内容有关，因此有关于这方面更详细的介绍，将放到内在尺寸 Web 设计这节课程中介绍。

这里要提醒大家的是，**虽然本节课程中的示例大都以** **`grid-template-columns`** **属性为例，但不代表这些计算只存在于该属性上，相关的理论与细节也同样存在于** **`grid-template-rows`** **、`grid-auto-rows`** **和** **`grid-auto-columns`，只不过部分 CSS 的函数可以运用于** **`grid-auto-rows`** **和** **`grid-auto-columns`** **属性上，比如** **`repeat()`** **函数** 。
