# 07-Flexbox 中的计算：通过收缩因子比例收缩 Flex 项目

使用 Flexbox 布局时，Flex 容器难免有和所有 Flex 项目宽度总和不匹配的时候，比如说，Flex 容器有剩余空间（Flex 项目无法填满整个 Flex 容器），也有 Flex 容器空间不足的时候（Flex 项目溢出 Flex 容器）。

这两种情景有不同的处理方式，比如上一节课和大家聊的就是 Flex 容器有剩余空间时，如何通过扩展因子比例 `flex-grow` 的特性来扩展 Flex 项目。而这一节课，我们主要来探讨，当 Flex 容器空间不足时，我们又是如何使用收缩因子 `flex-shrink` 的特性，即，按照收缩比例来收缩 Flex 项目，从而让 Flex 项目也能填满整个 Flex 容器。

## flex-shrink 的计算

前面我们聊的都是 `flex-grow` 是如何计算的，接着我们来一起探计 `flex` 属性中的 `flex-shrink` 是如何计算的。

首先，`flex-shrink` 属性所起的作用和 `flex-grow` 刚好相反，**它是在 Flex 容器出现不足空间时（就是所有 Flex 项目的宽度总和大于 Flex 容器可用空间，Flex 项目溢出了 Flex 容器），让 Flex 项目根据自身的收缩因子** **`flex-shrink`** **来缩小尺寸** 。

还是拿前面的示例来举例，只不过，我们稍微把一些参数调整一下：

```HTML
<div class="container">
  <!-- Flex 项目 A -->
  <div class="item"><span>A</span>longlonglongword</div> 
  <!-- Flex 项目 B -->
  <div class="item"><span>B</span>ook</div>
  <!-- Flex 项目 C -->
  <div class="item"><span>C</span>ountries in the east</div>
  <!-- Flex 项目 D -->
  <div class="item"><span>D</span>iscuss</div>
  <!-- Flex 项目 E -->
  <div class="item"><span>E</span>astern</div>
</div>
```

```CSS
.container {
  display: flex;
  inline-size: 1000px;
  font-size: 1.5rem;
}

.item {
   flex-basis: 300px; /* 也可以使用 width 或 inline-size 来替代 */
   
   /* 等同于 */
   flex-grow: 0; /* flex-grow 的初始值 */
   flex-shrink: 1; /* flex-shrink 的初始值 */
   flex-basis: 300px;
}

.item span {
  font-size: 3rem;
}
```

这个时候所有 Flex 项目的 `flex-basis` 值的总和 `1500px` （即 `300px × 5 = 1500px`）大于 Flex 容器的可用空间（它的`inline-size` ）`1000px` 。按理说，Flex 项目是会溢出 Flex 容器的，但因为 Flex 项目的 `flex-shrink` 初始值是 `1` ，所以浏览器会根据 `flex-shrink` 值对 Flex 项目按照相应的收缩因子进行收缩，让 Flex 项目填充整个 Flex 容器（Flex 项目不会溢出 Flex 容器）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d288965a59464f7ab4f9a8805b47b311~tplv-k3u1fbpfcp-zoom-1.image)

如果我们显式把 `flex-shrink` 属性的默认值 `1` 重置为 `0` 时，你将看到的浏览器不会对 Flex 项目进行收缩，此时 Flex 项目溢出了 Flex 容器，在这个示例中这个溢出部分大约会是 `500px` （即 `1500 - 1000px = 500px`），这个溢出部分也常称为 **Flex 容器不足空间** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8b94a1fa1ee4e189c698957c186ea23~tplv-k3u1fbpfcp-zoom-1.image)

`flex-shrink` 的计算和 `flex-grow` 是相似的，不同的是 **`flex-grow`** **按扩展因子分配 Flex 容器的剩余空间，`flex-shrink`按收缩因子分配 Flex 容器的不足空间** 。因此，`flex-shrink` 的计算，也可以像 `flex-grow` 一样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af9423d15df841c38649d587cef2617a~tplv-k3u1fbpfcp-zoom-1.image)

就这个示例而言，**Flex 容器的不足空间** 等于 `500px` :

```CSS
Flex 容器不足空间 = Flex 容器可用空间 - 所有 Flex 项目的尺寸总和

Flex 容器不足空间 = 1000px - 300px × 5 = -500px 
```

浏览器将会循环遍历去计算每个 Flex 项目的 **弹性量** ，即收缩值。先来看 Flex 项目 A:

```CSS
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex 项目的收缩值（flex-shrink总和） × 当前 Flex 项目的收缩因子（flex-shrink值）
Flex 项目计算后的 flex-basis 值 = Flex 项目的弹性量 + Flex 项目当前的 flex-basis 值

Flex 项目 A 的弹性量 = -500px ÷ (1 + 1 + 1 + 1 + 1) × 1 = -100px
Flex 项目 A 计算后的 flex-basis 值 = -100px + 300px = 200px
```

根据公式计算出来 Flex 项目 A 的 `flex-basis` 值（其宽度）是 `200px` ，但这个示例中，因为其内容是一个长单词，它的最小内容长度（`min-content`）大约是 `237.52px` 。计算出来的值小于该值（`200px < 237.52px`），这个时候会取该 Flex 项目内容的最小长度值。

> **在 Flex 项目的计算中，不管是使用** **`flex-grow`** **还是** **`flex-shrink`** **对 Flex 项目进收缩扩展计算，计算出来的值不能比 Flex 项目的内容的最小长度（****`min-content`****）或内部固定元素的长度值还小** 。

因此，Flex 项目 A 计算之后的 `flex-basis` 值为 `237.52px` 。

接着，浏览器会按照同样的方式来计算 Flex 项目 B：

```CSS
// 计算 Flex 项目B
Flex 容器的不足空间 = 1000px - 237.52px - (300px × 4) = -437.52px

Flex 项目 B 的弹性量 = -437.52px ÷ (1 + 1 + 1 + 1) × 1 = -109.38px
Flex 项目 B 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px
```

依此类推，就可以计算出 Flex 项目 C、Flex 项目 D 和 Flex 项目 E 的 `flex-basis` 值：

```CSS
Flex 容器不足空间 = Flex 容器可用空间 - 所有Flex项目的尺寸总和（flex-basis 总和）
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex项目的收缩值（flex-srhink总和）× 当前flex项目的flex-shrink
Flex 项目计算后的flex-basis 值 = Flex项目弹性 + Flex项目初设的flex-basis值

// 计算 Flex 项目 C

Flex 项目 C 的弹性量 = (1000px - 237.52px - 190.62px - (300px + 300px + 300px)) ÷ (1 + 1 + 1) × 1  = -109.38px
Flex 项目 C 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px 

// 计算 Flex 项目 D
Flex 项目 D 的弹性量 = (1000px - 237.52px - 190.62px - 190.62px - (300px + 300px)) ÷ (1 + 1) × 1  = -109.38px  
Flex 项目 D 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px 

// 计算 Flex 项目 E
Flex 项目 E 的弹性值 = (1000px - 237.52px - 190.62px - 190.62px - 190.62px - 300px) ÷ 1 × 1  = -109.38px  
Flex 项目 E 计算后的 flex-basis 值 = -109.38px + 300px = 190.62px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/333257f715ad4653bb6e2e62827646e5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/oNdwZoZ>

在 CSS 中给元素设置一个尺寸时，大多数开发者还是更喜欢使用 `width` (或 `inline-size`) ，和 `height`（或 `block-size`）属性，并不习惯使用 `flex-basis` 给 Flex 项目设置基础尺寸。在 Flex 项目中如果未显式设置 `flex-basis` 的值，浏览器将会采用其默认值 `auto` 作为 `flex-basis` 的值。比如：

```CSS
.container {
    display: flex;
    inline-size: 1000px;
}

.item {
    width: 300px; /* 或 inline-size: 300px */
    
    /* 等同于 */
    flex-grow: 0;     /* flex-grow 初始值，不扩展 */
    flex-shrink: 1;   /* flex-shrink 初始值，会收缩 */
    flex-basis: auto; /* flex-basis 初始值，未显式设置 width 或 inline-size 时，会是其 max-content */
}
```

这个示例的 Flex 项目的 `flex-shrink` 的计算和上一个示例（即 Flex 项目上显式设置 `flex-basis: 300px`）是一样的。这主要是因为：

> `flex-basis` 取值为 `auto` 时，且该 Flex 项目未显式设置 `width` 或 `inline-size` 属性值（非`auto` ），那么浏览器将会把 Flex 项目的内容长度作为 `flex-basis` 的值；反之，有显式设置 `width` 或 `inline-size` 属性值（非`auto`），那么浏览器会把 `width` 或 `inline-size` 属性值作为 `flex-basis` 的值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a0e240490d0463b85405aaea3c8422c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/rNvwgKm>

不过有一点需要特别的注意，当你在 Flex 项目同时设置了 `width` （或 `inline-size`），且 `flex-basis` 值为 `0` （或任何一个非 `auto` 的值）时，那么 `flex-basis` 的值都会替代 `width` 或 `inline-size` 属性的值。比如下面这个示例：

```CSS
.container {
    display: flex;
    inline-size: 1000px;
}

.item {
    inline-size: 300px;
    flex-basis: 0%; /* flex-basis 替代了 inline-size */
    
    /* 等同于 */
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

因为 `flex-basis` 属性值 `0%` 替代了`inline-size` 属性的值作为 Flex 项目的基础尺寸，因为 `flex-basis` 值显式设置了为 `0%` ，这个时候浏览器会将 Flex 项目的内容最小尺寸，即 `min-content`， 作为 Flex 项目的基础尺寸。如此一来，Flex 项目就有可能不会溢出 Flex 容器了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceac4b8df3b748fe96a01181408aeae3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/WNJOBBw>

如果大家在开发过程中，碰到在 Flex 项目上设置了 `width` ，`inline-size` 、`height` 或 `block-size` 无效时，就要先排查 Flex 项目的 `flex-basis` 是否设置了一个非`auto` 的值，比如 `0` 。

至于其中原委，这里先不聊（后面专门介绍 `flex-basis` 课程中会有介绍）。我们接着来看 `flex-shrink` 。

前面聊 `flex-grow` 属性时，可以给其设置不同的值，浏览器在计算时，会根据不同的扩展比例来扩展 Flex 项目的尺寸。同样的，可以给 Flex 项目设置不同的 `flex-shrink` 值，浏览器在计算时会根据不同的收缩比例来收缩 Flex 项目的尺寸。比如：

```CSS
.item {
    flex-basis: 300px;
    flex-shrink: var(--flex-shrink, 0);
}

.item:nth-child(2) {
    --flex-shrink: 1;
}

.item:nth-child(3) {
    --flex-shrink: 2;
}

.item:nth-child(4) {
    --flex-shrink: 3;
}

.item:nth-child(5) {
    --flex-shrink: 4;
}
```

浏览器按照相应的收缩比例对 Flex 项目进行计算，其计算过程如下：

```CSS
Flex 容器不足空间 = Flex 容器可用空间 - 所有Flex项目的尺寸总和（flex-basis 总和）
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex项目的收缩值（flex-srhink总和）× 当前flex项目的flex-shrink
Flex 项目计算后的flex-basis 值 = Flex项目弹性 + Flex项目初设的flex-basis值


Flex 项目 A 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (0 + 1 + 2 + 3 + 4) × 0  = 0px  
Flex 项目 A 计算后的 flex-basis 值 = 0 + 300px = 300px // 不收缩  

Flex 项目 B 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (1 + 2 + 3 + 4) × 1  = -50px
Flex 项目 B 计算后的 flex-basis 值 = -50px + 300px = 250px
  
Flex 项目 C 的弹性量 = (1000px - 300px - 250px - 300px - 300px - 300px) ÷ (2 + 3 + 4) × 2 = -100px  
Flex 项目 C 计算后的 flex-basis 值 = -100px + 300px = 200px
  
Flex 项目 D 的弹性量 = (1000px - 300px - 250px - 200px - 300px - 300px) ÷ (3 + 4) × 3 = -150px  
Flex 项目 D 计算后的 flex-basis 值 = -150px + 300px = 150px
  
Flex 项目 E 的弹性量 = (1000px - 300px - 250px - 200px - 150px - 300px) ÷ 4 × 4 = -200px  
Flex 项目 E 计算后的 flex-basis 值 = -200px + 300px = 100px 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11c4f496f6504753bdda25f5c2093d9c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/RwygzZN>

我们多次提到过，浏览器对 Flex 项目尺寸的计算是一种 **循环遍历计算** 模式，因为浏览器无法一次性就知道，在计算 Flex 项目尺寸时就能把所有情况都预判到。比如下面这个示例（在上一个示例的基础上，将Flex 项目 E 的文本内容“**Eastern**”调整得更长一些，比如“Elonglonglongword” ）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90156594251d4e3ca7c1d61da6296b71~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
Flex 容器不足空间 = Flex 容器可用空间 - 所有Flex项目的尺寸总和（flex-basis 总和）
Flex 项目的弹性量 = Flex 容器不足空间 ÷ 所有Flex项目的收缩值（flex-srhink总和）× 当前flex项目的flex-shrink
Flex 项目计算后的flex-basis 值 = Flex项目弹性 + Flex项目初设的flex-basis值


Flex 项目 A 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (0 + 1 + 2 + 3 + 4) × 0  = 0px  
Flex 项目 A 计算后的 flex-basis 值 = 0 + 300px = 300px // 不收缩  

Flex 项目 B 的弹性量 = (1000px - 300px - 300px - 300px - 300px - 300px) ÷ (1 + 2 + 3 + 4) × 1  = -50px
Flex 项目 B 计算后的 flex-basis 值 = -50px + 300px = 250px
  
Flex 项目 C 的弹性量 = (1000px - 300px - 250px - 300px - 300px - 300px) ÷ (2 + 3 + 4) × 2 = -100px  
Flex 项目 C 计算后的 flex-basis 值 = -100px + 300px = 200px
  
Flex 项目 D 的弹性量 = (1000px - 300px - 250px - 200px - 300px - 300px) ÷ (3 + 4) × 3 = -150px  
Flex 项目 D 计算后的 flex-basis 值 = -150px + 300px = 150px
  
Flex 项目 E 的弹性量 = (1000px - 300px - 250px - 200px - 150px - 300px) ÷ 4 × 4 = -200px  
Flex 项目 E 计算后的 flex-basis 值 = -200px + 300px = 100px 
```

按照公式计算出来的 Flex 项目 E 的 `flex-basis` 尺寸是 `100px` ，它小于 Flex 项目 E 的内容最小尺寸（`min-content`），大约 `233.38px`。因为 Flex 项目收缩不会小于其最小内容尺寸（也就是不会小于 `233.38px` ）。这个时候 Flex 容器的不足空间也随之产生了变化：

- Flex 项目 A 的 `flex-shrink` 值等于 `0` ，它不做任何收缩，因此它的宽度就是 `flex-basis` 初设的值，即 `300px` 。
- Flex 项目 E 计算之后的 `flex-basis` 值小于 `min-content` ，因此，它的 `flex-basis` 的值是 `min-content` ，在该例中大约是 `233.38px`。

这样一来，Flex 容器的不足空间就是：

```CSS
Flex 容器的不足空间 = 1000px - 300px - 233.38px - 300px - 300px - 300px = -433.38px
```

即，大约 `433.38px` 的不足空间再次按收缩因子的比例划分给 Flex 项目 B (`flex-shrink: 1`)、Flex 项目 C （`flex-shrink: 2`） 和 Flex 项目 D (`flex-shrink: 3`)。也就是说，Flex 项目 A 和 Flex 项目 E 不再参与第二次的计算了：

```CSS
Flex 项目 B 的弹性量 = (1000px - 300px - 233.38px - 300px - 300px - 300px) ÷ (1 + 2 + 3) × 1 = -72.23px
Flex 项目 B 计算后的 flex-basis 值 = -72.23px + 300px = 227.77px

Flex 项目 C 的弹性量 = (1000px - 300px - 233.38px - 227.77px - 300px - 300px) ÷ (2 + 3) × 2 = -144.46px
Flex 项目 C 计算后的 flex-basis 值 = -144.46px + 300px = 155.54px

Flex 项目 D 的弹性量 = (1000px - 300px - 233.38px - 227.77px - 155.54px - 300px) ÷ 3 × 3 = -216.69px
Flex 项目 D 计算后的 flex-basis 值 = -216.69px + 300px = 83.31px 
```

不幸的是，浏览器在进行第二轮计算的时候，又碰到了 Flex 项目 D 计算出来的 `flex-basis` 值 `83.31px` ，它也小于它内容的最小长度（`min-content`），大约 `100.69px` 。它也不能再做任何收缩。因此，浏览器需要再做第三轮计算，即 Flex 项目 B 和 Flex 项目 C 接着重新计算：

```CSS
Flex 容器不足空间 = 1000px - 300px - 233.38px - 100.69px - 300px - 300px = -234.07px

Flex 项目 B 的弹性量 = (1000px - 300px - 233.38px - 100.69px - 300px - 300px) ÷ (1 + 2) × 1 = -78.02px
Flex 项目 B 计算后的 flex-basis 值 = -78.02px + 300px = 221.98px

Flex 项目 C 的弹性量 = (1000px - 300px - 233.38px - 100.69px - 221.98px - 300px) ÷ 2 × 2 = -156.05px
Flex 项目 C 计算后的 flex-basis 值 = -156.05px + 300px = 143.95px
```

如果计算出来的 Flex 项目 C 的 `flex-basis` 值还是小于其 `min-content` 的话，浏览器将会进行第四轮的计算，直到符合条件为止。所幸，我们这个示例第三轮计算就符合条件了。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c50156e58b1406ea53a8be34dc24ba5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： <https://codepen.io/airen/full/qBYjeJq>

`flex-shrink` 的使用还有一点和 `flex-grow` 类似，也可以在 `flex-shrink` 设置小于 `1` 的正整数。比如：

```CSS
.container {
    display: flex;
    inline-size: 1000px;
}

.item {
    flex-shrink: .1;
}
```

计算公式也是类似的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1652f17c80bd4b0498c91dd81bdbc85c~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
Flex 项目的 flex-shrink 总和 =  (0.1 + 0.1 + 0.1 + 0.1 + 0.1) = 0.5 < 1
Flex 项目的灵活性 = (Flex 容器的不足空间  × 当前 Flex 项目自身的扩展因子 flex-shrink
Flex 容器的剩余空间 = 1000px - 300px - 300px - 300px - 300px - 300px = -500px

Flex 项目 A 的弹性值 = -500px × 0.1 = -50px
Flex 项目 A 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 B 的弹性值 = -500px × 0.1 = -50px
Flex 项目 B 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 C 的弹性值 = -500px × 0.1 = -50px
Flex 项目 C 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 D 的弹性值 = -500px × 0.1 = -50px
Flex 项目 D 计算后的 flex-basis 值 = -50px + 300px = 250px

Flex 项目 E 的弹性值 =  -500px × 0.1 = -50px
Flex 项目 E 计算后的 flex-basis 值 = -50px + 300px = 250px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0db27a3c273f4a4099c5f2f534fc4e7d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/qBYXWQY>

如上图所示，当所有 Flex 项目的 `flex-shrink` 属性值的总和小于 `1` 时，Flex 容器的不足空间是分配不完的，Flex 项目依旧会溢出 Flex 容器。

如此一来，`flex-shrink` 的计算公式也分两种情景：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c5933377f9485b95254066e7422643~tplv-k3u1fbpfcp-zoom-1.image)

另外，就 `flex-shrink` 计算，当所有 Flex 项目的 `flex-shrink` 值的总和大于 `1` 时，还可以使用下面这个公式来计算:

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac195b17c58e4693b8c800e1f65df5b9~tplv-k3u1fbpfcp-zoom-1.image)

## 小结

不知道大家在这些示例中有没有发现过，`flex-shrink` 和 `flex-grow` 在计算时所运用的公式和过程都几乎是一样的，不同之处就是：

- `flex-grow` 按比例分配 Flex 容器剩余空间，Flex 项目会按比例变大，但不会造成 Flex 项目溢出 Flex 容器（除非所有 Flex 项目自身的最小内容总和就大于 Flex 容器空间）。
- `flex-shrink` 按比例分配 Flex 容器不足空间，Flex 项目会按比例变小，但 Flex 项目仍然有可能溢出 Flex 容器。
- 当 `flex-grow` 属性值总和小于 `1` 时，Flex 容器的剩余空间分不完；同样的，当 `flex-shrink` 属性值总和小于 `1` 时，Flex 容器的不足空间分不完。

另外，`flex-shrink` 有一点和 `flex-grow` 完全不同，如果某个 Flex 项目按照 `flex-shrink` 计算出来的新宽度（`flex-basis`）趋向于 `0` 或小于 Flex 项目内容的最小长度（`min-content`）时，Flex 项目将会按照该元素的 `min-content` 或其内部固定宽度的元素尺寸设置 `flex-basis` 新的值，同时这个宽度将会转嫁到其他 Flex 项目，浏览器会按照相应的收缩因子重新对 Flex 项目进行计算，直到符合条件为止。

简单地说，**在 Flexbox 布局当中，`flex-shrink`** **会阻止 Flex 项目宽度缩小至** **`0`**。此时 Flex 项目会以 **`min-content`** **的大小进行计算**。这也是为什么在所有 Flex 项目显式设置 `flex:1` 不一定能让所有 Flex 项目宽度相等，或者说均分列的主要原因之一。

现在，基于前面课程提到的 Flex 容器的对齐属性、Flex 项目中的 `flex-shrink` 和 `flex-grow` 计算等知识，就可以很好地处理 Flex 容器的剩余空间和不足空间：

- **Flex 容器有剩余空间** （所有 Flex 项目的宽度总和小于 Flex 容器的宽度），如果设置了 `flex-grow` ，Flex 项目会根据扩展因子分配 Flex 容器剩余空间；在未设置 `flex-grow` 时，就看在 Flex 容器中是否设置了对齐方式，如果是，那么会按对齐方式分配 Flex 容器剩余空间，如果不是，Flex 容器剩余空间不变 。
- **Flex 容器有不足空间** （所有 Flex 项目的宽度总和大于 Flex 容器的宽度），如果设置了 `flex-shrink` 值为 `0` ，Flex 项目不会收缩，Flex 项目溢出 Flex 容器；如果未显式设置 `flex-shrink` 值，Flex 项目会平均分配 Flex 容器不足空间，Flex 项目会变窄（Flex 项目的 `flex-shrink` 的默认值为 `1` ），如果显式设置了 `flex-shrink` 的值为非 `0` 的不同值，那么 Flex 项目会按照不同的收缩因子分配 Flex 容器不足空间，Flex 项目同样会变窄。

具体的我们可以绘制一张这方面的流程图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cebbaa0a1e1046a9bcb6b285159a7b2c~tplv-k3u1fbpfcp-zoom-1.image)
