# 04-Flexbox 布局中的对齐方式

Flexbox 布局中提供了多个用于对齐 Flex 项目以及 Flex 项目之间分配空间的属性。简单地说，这些属性能够在 Flex 容器的主轴和侧轴上对齐 Flex 项目，以及在 Flex 项目之间分配空间。

这些属性可以分为两组：**空间分配属性** 和 **对齐属性** 。用于分配 Flex 容器空间的属性主要有：

- `justify-content`：沿 Flex 容器的主轴分配 Flex 容器的剩余空间；

- `align-content`：沿 Flex 容器的侧轴分配 Flex 容器的剩余空间；

- `place-content`：它是 `justify-content` 和 `align-content` 的简写属性。

用于在 Flexbox 布局中对齐的属性如下：

- `align-self`：沿 Flex 容器侧轴对齐单个 Flex 项目；

- `align-items`：将所有 Flex 项目作为一个组，沿 Flex 容器侧轴对齐。

`justify-` 开头的属性主要用于 Flex 容器的主轴方向；`align-` 开头的属性主要用于 Flex 容器侧轴方向；`-items` 结尾的属性主要用于对齐 Flex 项目，`-self` 结尾的属性主要用于 Flex 项目的自对齐，`-content` 结尾的属性主要用于容器空间分配。

![img](./assets/bf7ec07188d34ae595c6c716b8a8e8ef~tplv-k3u1fbpfcp-zoom-1.jpeg)

只不过在做出正确的选择之前，你需要知道：

- 对齐方向（Flex 容器的主轴方向通常水平方向，否则也是内联轴方向；侧轴是垂直方向，否则也是块轴方向）；

<!---->

- 你在布局要在对齐什么（所有 Flex 项目，单个 Flex 项目或者两者之间的内容）。

|                            | **主轴(`justify-*`)** | **侧轴(`align-*`)** |
| -------------------------- | ------------------------------ | ---------------------------- |
| **对齐 Flex 项目**( `*-items`) |~~`justify-items`~~               | `align-items`                |
| **Flex 项目自对齐**( `*-self`)  |~~`justify-self`~~                 | `align-self`                 |
| 空间分配( `*-content`)         | `justify-content`              | `align-content`              |

需要提醒一下的是，Flex 容器的主轴和侧轴的方向是可以改变的，用于 Flex 容器上的 `flex-direction` ，CSS 的书写模式 `writing-mode` 属性，CSS 阅读模式 `dirction` 和 HTML 元素的 `dir` 属性都可以改变。另外，**在 Flexbox 布局中是没有** **`justify-self`属性的** ！

> 这里提到的对齐相关的属性，最早是出于 Flexbox 布局模块的，但也可以用于 CSS Grid 布局中。因此，在后来 W3C 的 CSS 工作小组，将这些属性纳入到一个独立的功能模块中，即 **CSS Box Alignment Module** ，到目前为止该[模块最新版本是 Level 3](https://www.w3.org/TR/css-align-3)。

在这里，你可以了解，在 Flexbox 布局中它们如何工作。

为了让接下来的示例尽量避免复杂化，在这里我们对示例做一定的约束：

- Flex 容器是尺寸是 `600px x 300px` 的矩形；

- 所有 Flex 项目的尺寸是 `88px x 88px`；

- Flex 项目之间未显式设置任何间距；

- 左侧（或上面）容器是一个单行布局，右侧（或下面）是一个多行布局；

- CSS 书写模式和阅读模式都是 `ltr` （Left-To-Right）。

```html
<div class="flex-container">
    <div class="item"> 1 </div>
    <!-- 中间省略 两个 Item -->
    <div class="item"> 4 </div>
</div>
​
<div class="flex-container">
    <div class="item"> 1 </div>
    <!-- 中间省略 7个 Item -->
    <div class="item"> 8 </div>
</div>
```

```CSS
.flex-container {
    display: flex;
    flex-wrap: wrap;
    inline-size: 400px;
    block-size: 300px;
}
​
.item {
    inline-size: 120px;
    block-size: 120px;
}
```

初始效果（在没有使用任何对齐方式）：

![img](./assets/cdfe4851406749a39e205282a34ffb9a~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/MWGezqJ>

请注意，Flex 项目彼此相邻。由于 Flexbox 是一个单维布局，因此 Flex 项目要么按行对齐，要么按列对齐（默认为行对齐）。并且 Flex 项目换行之后，也是在自己所在行的主轴方向上排列。

还有，默认情况下，Flex 项目**在侧轴上会被拉伸伸展，** 因为 Flex 容器 `align-items` 属性的默认值为 `stretch` ，在我们的例子中，Flex 项目显式设置了固定的高度。让我们删除它，看看结果如何。

```css
.item {
    inline-size: 120px;
    block-size: initial;
}
```

![img](./assets/98ab3c0e295541bea66a05e6df4de720~tplv-k3u1fbpfcp-zoom-1.jpeg)

## 沿主轴分配空间

在上面这个初始化示例中，Flex 项目在主轴上排成一行，而且主轴方向有一定的剩余空间。这是因为，所有 Flex 项目的宽度总和小于 Flex 容器宽度，无法完全填满 Flex 容器。“Flex 项目会向主轴起点位置靠齐（即行上第一个 Flex 项目的起始位置和 Flex 容器主轴起点位置平齐），Flex 容器的剩余空间都位于结尾处（即行上最后 Flex 项目终点处与 Flex 容器主轴终点处之间的距离）”：

![img](./assets/a70ce1806bc2452f9e745b887a8a0cc3~tplv-k3u1fbpfcp-zoom-1.jpeg)

也就是说，你可以改变 `justify-content` 的值，来改变 Flex 项目在 Flex 容器上的对齐方式，即 **调整 Flex 容器剩余空间的位置** 。比如，将 `justify-content` 的值设置为 `flex-end` 时，Flex 项目将在 Flex 容器主轴终点处对齐，Flex 容器的剩余空间将位于主轴的起始点。

```css
.flex-container {
    justify-content: flex-end;
}
```

![img](./assets/4f23bb139faa44c6a33d1498fa4ad60c~tplv-k3u1fbpfcp-zoom-1.jpeg)

你也可以将 `justify-content` 属性设置为 `center` ，将 Flex 容器主轴（同行）上的剩余空间均分在 Flex 容器的两侧：

```css
.flex-container {
    justify-content: center;
}
```

![img](./assets/92bebd337e1c432dbab83e241a0f11ac~tplv-k3u1fbpfcp-zoom-1.jpeg)

其实，当 `justify-content` 取值为 `flex-start` 、`flex-end` 和 `center` 时，相当于：

- `flex-start` ：主轴起点对齐（`ltr` 模式是左对齐）；

- `flex-end` ：主轴终点对齐（`ltr` 模式是右对齐）；

- `center` ：主轴居中对齐。

因此，在 Flexbox 布局中，常常**使用** **`justify-content: center`** **来实现水平居中的布局效果** 。

你也可以将 `justify-content` 属性设置为 `space-around` 、`space-between` 或 `space-evenly` ，在 Flex 项目之间分配 Flex 容器的剩余空间。

- `space-between` 会让行上第一个 Flex 项目的起始边缘与 Flex 容器主轴起点相吻合，行上最后一个 Flex 项目的结束边缘与 Flex 容器主轴终点相吻合，其它相邻 Flex 项目之间间距相等。当 Flex 容器中只有一个 Flex 项目时，其表现行为和 `flex-start` 等同。

- `space-around` 会让行上第一个 Flex 项目的起始边缘与 Flex 容器主轴起点间距，和行上最后一个 Flex 项目的结束边缘与 Flex 容器主轴终点间距相等，并且等于其他相邻两个 Flex 项目之间间距的二分之一。当 Flex 容器中只有一个 Flex 项目时，其表现行为和 `center` 等同。

- `space-evenly` 会让行上第一个 Flex 项目的起始边缘与 Flex 容器主轴起点间距，和最后一个 Flex 项目的结束边缘与 Flex 容器主轴终点间距相等，并且等于其他相邻两个 Flex 项目之间间距。当 Flex 容器中只有一个 Flex 项目时，其表现行为和 `center` 等同。

![img](./assets/ea9308d6f3fb47a4ade43903e5e2fe11~tplv-k3u1fbpfcp-zoom-1.jpeg)

> 注意，在 Flexbox 布局中，可以用于 `justify-content` 属性的值，除了上述提到的（`flex-start`、`flex-end` 、`center` 、`space-around` 、`space-between` 和 `space-evenly`）之外，还可以使用 `start` （等同于 `flex-start`）和 `end` （等同于 `flex-end`）。另外，CSS 的关键词 `inherit` 、`initial` 、`revert` 和 `unset` 也可以用于 `justify-content` 属性。

<img src="./assets/486ae89b756d4f46a8c54f77b397b022~tplv-k3u1fbpfcp-zoom-1.gif" alt="img"  />

> Demo 地址： <https://codepen.io/airen/full/rNvMdEw>

如果 Flex 容器没有额外的剩余空间，或者说剩余空间为负值时， `justify-content` 属性的值表现形式和前面所述是有差异的：

- `flex-start` 会让 Flex 项目在 Flex 容器主轴终点处溢出 ；

- `flex-end` 会让 Flex 项目在 Flex 容器主轴起点处溢出；

- `center` 会让 Flex 项目在 Flex 容器两端溢出；

- `space-between` 和 `flex-start` 相同；

- `space-around` 和 `center` 相同；

- `space-evenly` 和 `center` 相同；

- `start` 和 `flex-start` 相同；

- `end` 和 `flex-end` 相同。

![img](./assets/1cdacd2bcb3a44c8a8d22b8167dd9a9c~tplv-k3u1fbpfcp-zoom-1.jpeg)

上面我们所探讨的是 `flex-direction` 为 `row` （默认值）时，使用 `justify-content` 可以用来控制 Flex 项目在行上的对齐方式和 Flex 容器剩余空间的分配。接下来，我们来看`justify-content` 将作用于列的效果（即 `flex-direction` 属性值为 `column` 时，`justify-content` 的表现）。

```css
.flex-container {
    display: flex;
    flex-direction: column;
    justify-content: var(--justify-content, flex-start);
}
```

<img src="./assets/cd25c4b9f55d487eb4a46503a5dfb24c~tplv-k3u1fbpfcp-zoom-1.gif" alt="img"  />

> Demo 地址： <https://codepen.io/airen/full/mdLrLQe>

事实上，不管 `flex-direction` 属性的值是什么，`justify-content` 属性**只作用于 Flex 容器主轴上，它会让 Flex 项目在主轴上进行排列或分配主轴方向的 Flex 容器剩余空间** 。不过，当 `flex-direction` 属性取值为 `column` 或 `column-reverse` 时，需要在代码中使用 `height` 或 `block-size` 显式指定容器的高度，只有这样才能让 Flex 容器有一定的剩余空间。否则，Flex 容器不会有任何剩余空间可供分配。这主要是因为，CSS 在计算块容器（Flex容器）高度（或块方向尺寸）时，默认以其内容或所有后代元素高度来计算。

## 沿侧轴分配空间

> **沿侧轴分配空间，又可以看作是 Flexbox 布局中多行（或多列）的对齐方式** ！

在 Flexbox 布局中，当 Flex 容器没有足够多的空间来容纳 Flex 项目时，且 Flex 容器上显式设置了 `flex-wrap` 属性的值为 `wrap` （或 `wrap-reverse`），Flex 项目会换行排列：

![img](./assets/defff9371a344771a10ceea8553bc456~tplv-k3u1fbpfcp-zoom-1.jpeg)

由于 `align-items` 属性的初始值为 `stretch` ，每个 Flex 项目在侧轴方向被拉伸，Flex 项目高度变高填充了 Flex 容器侧轴空间（即 Flex 容器的 `height` 或 `block-size`），并且每行的 Flex 项目高度是相等的。

我们从前面的课程中可以得知，当 Flex 项目换行排列时，每一行都有其自己独立的主轴方向（也称为 “弹性行”）:

![img](./assets/74adeea8b14d4d04b2fa82a9a0177bc2~tplv-k3u1fbpfcp-zoom-1.jpeg)

只不过，要是在 Flex 项目上显式设置了其高度（`height` 或 `block-size`）时，即使 `align-items` 的值为 `stretch` ，也不会拉伸 Flex 项目。这个时候弹性行（相邻两行）之间就会有额外的空间出来：

```css
.flex-container {
    display: flex;
    flex-wrap: wrap;
}
​
.item {
    inline-size: 88px;
    block-size: 88px;
}
```

![img](./assets/83dca7261a40473d8a019c44cd299b81~tplv-k3u1fbpfcp-zoom-1.jpeg)

这个时候，如果你想分配行与行之间的间距（Flex 容器侧轴方向的剩余空间），那就需要使用 `align-content` 属性。

Flexbox 布局中的 `align-content` 属性值和 `justify-content` 属性值相比多出了一个 `stretch` 值。这些值的表现行为和 `justify-content` 属性值相同，不同的是 **`align-content`** **用来分配 Flex 容器侧轴方向的剩余空间。**

![img](./assets/f61ea9b9cf9841079c625e83259ec832~tplv-k3u1fbpfcp-zoom-1.gif)

> 注意，`align-content` 属性可接受的值有 `flex-start` 、`flex-end` 、`center` 、`space-around` 、`space-between` 、`space-evenly` 、`start` 、`end` 和 `strecth` 。

如果 Flex 项目未显式设置 `height` 或 `block-size` 时，改变 `align-content` 属性值时，Flex 项目的高度将会作出相应改变，即它的高度将会是 Flex 项目内容的最大高度：

![img](./assets/f98e50396c5e40c09763647153621d81~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/RwyoVWW>

从上面的效果来看，你可以把 `align-content` 状态下侧轴中的整行（弹性行），当作是 `justify-content` 状态下单个 Flex 项目。

`align-content` 属性同样会受 `flex-direction` 属性值的影响：

![img](./assets/2b78d48c7b2b4497ab715a8c88ed16d8~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/WNJReYz>

上面示例展示的都是 Flex 容器在侧轴方向有剩余空间的效果。当 Flex 容器中，所有行的尺寸之和大于 Flex 容器侧轴尺寸（即 **Flex 容器侧轴方向没有剩余空间** ）时，`align-content` 属性值表现行为：

- `flex-start` 会让 Flex 容器的行在侧轴结束点溢出；

- `flex-end` 会让 Flex 容器的行在侧轴起点溢出；

- `center` 会让 Flex 容器行在侧轴两端溢出；

- `stretch` 表现行为类似于 `flex-start`；

- `space-around` 表现行为类似于 `center`；

- `space-between` 表现行为类似于 `flex-start`；

- `space-evenly` 表现行为类似于 `center`。

![img](./assets/1b18eb56efd24ba1ae6b79c23a7e67e5~tplv-k3u1fbpfcp-zoom-1.jpeg)

在构建 Web 布局时，可以**使用`align-content`实现多行垂直居中的布局** 。

> 需要注意的是，当 Flex 容器中只有一行 Flex 项目，那么 `align-content` 属性取值为 `sapce-around` 和 `space-evenly` 的效果等同于 `center`；`align-content` 属性取值为 `space-between` 的效果等同于 `flex-start` 和 `start` 。

在编码的时候，如果要同时设置 `justify-content` 和 `align-content` 两个属性的话，那么你可以使用它们的简写属性 `place-content` 。比如：

```css
.flex-container {
    justify-content: center;
    align-content: center;
}
​
/* 等同于 */
.flex-container {
    place-content: center;
}
```

`place-content` 属性可以接受一个值，也可以接受两个值：

- 如果只显式给 `place-content` 属性设置了一个值，则表示 `justify-content` 和 `align-content` 使用的是同一个值；

<!---->

- 如果给 `place-content` 属性设置了两个值，则第一个值将作用于 `align-content` ，第二个值将作用于 `justify-content`。

```css
.flex-container {
    place-content: center;
    
    /* 等同于 */
    align-content: center;
    justify-content: center;
}
​
.flex-container {
    place-content: center space-around;
    
    /* 等同于 */
    align-content: center;
    justify-content: space-around;
}    
```

这里有一个小技巧，在 Flexbox 布局中，你可以使用 `place-content: center` 构建一个**水平垂直居中** 的布局效果：

```css
/* 水平垂直居中 */
.flex-container {
    display: flex;
    flex-wrap: wrap;
    place-content: center;
}
```

![img](./assets/a065f38fbe42451b8f0268f66a2b7bf5~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/abGpzjG>

大家需要知道的是，**`align-content`** **只有当** **`flex-wrap`** **属性的值为非** **`nowrap`** **（即** **`wrap`** **或** **`wrap-reverse`** **）时才能生效** 。

![img](./assets/2aa871391f71495586181f29c4c68d79~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址：<https://codepen.io/airen/full/RwyKPLr>

到这里，我们已经知道了：

- 在 Flex 容器上使用 `justify-content`，可以控制 Flex 项目在 Flex 容器的主轴方向的对齐方式，以及 Flex 容器主轴方向剩余空间的分配；

<!---->

- 在 Flex 容器上使用 `align-content` 可以控制 Flex 行（即 `flex-wrap` 属性为非 `nowrap` 时 Flex 项目所在行）在 Flex 容器的侧轴方向的对齐方式，以及 Flex 容器侧轴方向剩余空间的分配。

> **最后再次提醒，`align-content`属性只有在** **`flex-wrap`** **取值为** **`wrap`** **或** **`wrap-reverse`** **时才有效** ！

## 沿侧轴对齐 Flex 项目

> **沿侧轴对齐 Flex 项目，指的是 Flex 容器中单行（或单例）以及单个 Flex 项目的对齐方式** ！

构建 Web 布局时，总有不需要断行（只是单行）的状态，即 `flex-wrap` 属性的值为 `nowrap` 。此时，要控制 Flex 项目在 Flex 容器侧轴上的对齐方式，就不能使用 `align-content` 属性了，但你可以使用 `align-items` 或 `align-self` 来控制整行 Flex 项目，或单个 Flex 项目在侧轴上的对齐方式：

- `align-items` 用于 Flex 容器上，控制 Flex 行（所有 Flex 项目所在行）在侧轴上对齐方式；

<!---->

- `align-self` 用于 Flex 项目上，控制单个 Flex 项目在侧轴上对齐方式。

你可以使用 `flex-start` 、`center` 、`flex-end` 、`stretch` 、`baseline` 、`start` 和 `end` 中的任一值在侧轴方向对齐 Flex 项目：

```css
.flex-container {
    display: flex;
    align-items: center;
}
```

![img](./assets/dc8d902da91d4367bde4efea54a17e07~tplv-k3u1fbpfcp-zoom-1.jpeg)

`align-items` 属性和 `justify-content` 一样，也会受 `flex-direction` 属性值的影响：

![img](./assets/f001b9f8205e493f90bfc33fecd67df7~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/jOxyWyb>

在 Flexbox 布局中，当 Flex 容器中只有一个 Flex 行（比如说，所有 Flex 项目都在同一行），那么这个 Flex 行的高度与 Flex 容器是等高的。

在 Flex 容器上使用 `align-items` 时，就相同于在整个 Flex 容器的侧轴上对齐 Flex 项目。这和前面课程所介绍的内容并不相矛盾，在介绍 `align-content` 属性时，我们有介绍过，即，**Flex 容器中的每一行都有自己的主轴方向和侧轴方向** ，而 `align-items` 属性的值，是用来控制 Flex 项目沿着侧轴方向对齐。言外之意，Flex 容器有多行时，`align-items` 属性可以用于 Flex 项目沿着侧轴方向对齐：

![img](./assets/f03d59946b2944e2adc8383c1473f22f~tplv-k3u1fbpfcp-zoom-1.jpeg)

默认情况下，Flex 项目在 Flex 容器中断行排列时，每一行的高度是均等的，比如上图中均分了 Flex 容器的高度。这个高度也是每个 Flex 行的初始高度。此时，使用 `align-items` 属性时，Flex 项目就会沿着所在行的 **侧轴** 方向排列。

![img](./assets/4df47c93a98640789e606810abb378a3~tplv-k3u1fbpfcp-zoom-1.jpeg)

使用 `flex-direction` 改变主轴和侧轴方向时，它们的表现形式是相同的，只不过当 `flex-direction` 属性的值是 `column` （或 `column-reverse`）时，`align-items` 属性取值为 `baseline` 时产生的结果与 `flex-start` 或 `start` 相同。

![img](./assets/2b0d835bbc73467f80a39de4452c7b1d~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/eYrgxJy>

从示例的结果我们还可以发现，**当 Flex 容器有多行出现时，使用** **`align-items: center`** **无法让它们在 Flex 容器中垂直居中（只能在所在 Flex 行中垂直居中）** 。

现在我们知道了，使用 Flexbox 布局的时候，在 Flex 容器的侧轴方向，我们可以使用 `align-content` 和 `align-items` 来控制 Flex 项目的对齐方式和分配 Flex 容器侧轴的剩余空间。

这两个属性在一些特定条件之下表现出来的结果是相似的。比如，当 Flex 容器中仅有一行（即 Flex 容器有足够多的空间容纳所有 Flex 项目），且显式将 `flex-wrap` 属性值设置为 `wrap` 或 `wrap-reverse` 时，`align-content` 属性取值 `flex-start` 、`center` 、`stretch`、`flex-end` 、`start` 和 `end` 表现的结果将和 `align-items` 属性取值 `flex-start` 、`center` 、`stretch`、`flex-end` 、`start` 和 `end` 相同。

当然，`align-content` 和 `align-items` 也有着本质性的差异：

- `align-content` 属性必须要在 `flex-wrap` 属性值为 `wrap` 或 `wrap-reverse` 条件下才能正常工作；但 `align-items` 属性则不需要；

<!---->

- `align-content` 属性除了可以让 Flex 项目所在行在 Flex 容器侧轴对齐之外，还可以用来分配 Flex 容器侧轴方向的剩余空间，比如 `space-around` 、`space-between` 和 `spac-evenly` 等属性；但 `align-items` 属性则只用于控制 Flex 项目在 Flex 行侧轴方向的对齐方式。

这里有一个小技巧，如果在 Flex 容器上，同时设置了`align-content`属性的值是非`stretch` 值和`align-items`属性任一值，那么客户端会以`align-content`属性为主，而`align-items`属性则会被客户端忽略；如果在 Flex 容器上，同时设置了`align-content`属性值是`stretch`(即默认值)和显式设置了`align-items`属性任一值，那么客户端会以`align-items`属性为主，而`align-content`则会被客户端忽略。

```css
/* 以 align-items 属性的值为主 */
.flex-container {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch; /* 被客户端忽略 */
    align-items: center; 
}
​
/* 以 align-content 属性的值为主 */
.flex-container {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-end; /* 被客户端忽略 */
}
​
/* align-content 属性被视为无效 */
.flex-container {
    display: flex;
    align-content: center; /* 需要配合 flex-wrap 属性值为 wrap 或 wrap-reverse 一起使用*/
}
```

![img](./assets/00d7e6d4ff324fcbaa023c44ee9d39fe~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/eYrgabP>

你可能已经发现了，不管是使用 `align-content` 还是 `align-items` 属性，都是用来控制整行的 Flex 项目（即 一组或多组 Flex 项目），却无法控制单个 Flex 项目。庆幸的是，在 Flexbox 布局中，可以在 Flex 项目上显式设置 `align-self` 属性，来控制单个 Flex 项目沿着 Flex 容器侧轴来对齐项目。

`align-self` 和用于 Flex 容器上的 `align-items` 属性非常相似，它在 `align-items` 属性值的基础上多了一个 `auto` 值，并且其默认值是 `auto` （`align-items` 属性的默认值是 `stretch` ）。

我们可以像下面这样使用 `align-self` ：

```css
.flex-container {
    display: flex;
}
​
.items:nth-child(3n) {
    align-self: var(--align-self, auto);
}
```

![img](./assets/fba544344440443d92ec77844ce47f72~tplv-k3u1fbpfcp-zoom-1.jpeg)

> 注意，只有 `align-content` 和 `align-items` 两个属性取默认值 `stretch` 时，`align-self` 属性的 `auto` 和 `stretch` 效果才是等同的。

虽然 `align-self` 可以使单个 Flex 项目沿着 Flex 行的侧轴方向对齐，但当它碰到运用于 Flex 容器的 `align-content` 和 `align-items` 还是有一定差异的。

```css
.flex-container {
    display: flex;
    flex-wrap: var(--flex-wrap, nowrap);
    align-content: var(--align-content, stretch);
}
​
.item {
    align-self: var(--algin-self, auto)
}
```

![img](./assets/5c60309aad2a4ae58d3e1f5f1762ebc4~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/xxjgoWZ>

从上面的效果中不难发现，**当** **`align-self`** **碰上了** **`align-content`** **属性时，只有** **`align-content`** **属性值为** **`stretch`** **时，`align-self`属性的值才有效。**

而 `align-items` 和 `align-self` 同时使用则不会像 `align-content` 属性这样，**只不过 Flex 项目的** **`align-self`** **属性取值为** **`auto`** **时，不会覆盖 Flex 容器上** **`align-items`** **属性值的效果** ：

```css
.flex-container {
    display: flex;
    align-items: var(--align-items, stretch);
} 
​
.item {
    align-self: var(--align-self, stretch);
}
```

![img](./assets/1bcaeb5950a6434b84bd7560d610afde~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/xxjgoWZ>

我们在实际生产时，在 Flexbox 中，不管是使用 `align-content` 、 `align-items` 还是 `justify-content` 时，总是不太好实现我们所期望的布局效果，但在 Flex 项目中使用 `align-self` 会让你变得容易很多，比如下面这个示例中的按钮居右显示：

![img](./assets/07a8ac6c08b9414cb21fac43cbe208b2~tplv-k3u1fbpfcp-zoom-1.png)

```html
<div class="card">
  <div class="card__thumb">
    <svg t="1662879804494" class="icon" viewBox="0 0 1445 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5503" width="200" height="200">
      <path d="M0.005421 131.312941V584.282353a30.117647 30.117647 0 0 0 49.995294 22.889412l271.661177-236.724706a60.235294 60.235294 0 0 1 77.101176 0l259.011765 207.209412 142.757647-142.757647a60.235294 60.235294 0 0 1 80.112941-4.216471l301.176471 240.941176a60.235294 60.235294 0 1 1-75.294118 93.967059l-259.011765-207.209412-142.757647 142.757648a60.235294 60.235294 0 0 1-80.112941 4.21647L361.417186 493.929412l-301.176471 262.625882a180.705882 180.705882 0 0 0-60.235294 136.131765A131.312941 131.312941 0 0 0 131.318362 1024h1183.021177A131.312941 131.312941 0 0 0 1445.65248 892.687059V131.312941A131.312941 131.312941 0 0 0 1314.339539 0H131.318362A131.312941 131.312941 0 0 0 0.005421 131.312941zM1114.358362 421.647059a144.564706 144.564706 0 1 1 144.564706-144.564706A144.564706 144.564706 0 0 1 1114.358362 421.647059z" fill="currentColor" p-id="5504"></path>
    </svg>
  </div>
  <div class="card__content">
    <h3 class="title">
      <small>UX Design</small>
      Make it easier to search and filter
    </h3>
​
    <button>Read More</button>
  </div>
</div>
```

```CSS
.card {
  display: flex;
  gap: 1rem;
}
​
.card__thumb {
  min-inline-size: 200px;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
​
.card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.25em;
}
​
h3 small {
  display: block;
}
​
.card__content button {
  align-items: center;
  justify-content: center;
  display: inline-flex;
  align-self: flex-end;
}
```

> Demo 地址： <https://codepen.io/airen/full/PoepOwp>

## Flex 项目上的 `margin`

> **在 Flexbox 布局中，Flex 容器上可以使用** **`align-items`** **和** **`align-self`** **在侧轴方向对齐和分配侧轴空间，但在主轴上不存在** **`justify-items`** **和** **`justify-self`** **。**

Flex 容器不存在 `justify-items` 和 `justify-self` ，主要是因为 Flex 项目在 Flex 容器的主轴上被当作一个组。因此，没有将单个 Flex 项目从该组中分离出来的概念，但它们却存在于 CSS Grid 布局中。`justify-self` 和 `justify-items` 属性作用于内联轴（Inline Axis），以沿该轴将网格区域内的项目对齐。由于 Flexbox 布局是将 Flex 项目视为一个组，因此，这些属性未在 Flexbox 上下文（FFC）中实现。

> 注意，有关于 `justify-self` 和 `justify-items` ，将会在后面的 CSS Grid 布局的课程中介绍。

虽然在 Flexbox 布局中，无法在 Flex 容器的主轴上，直接使用 `justify-self` 和 `justify-items` 将 Flex 项目从一个组中分离出来，但我们可以在 Flex 项目中使用 `margin: auto` 将 Flex 项目在 Flex 容器的主轴上进行分组。

![img](./assets/0b097664d9f44f878037c2ed37d81496~tplv-k3u1fbpfcp-zoom-1.jpeg)

我们来看一个使用 `margin:auto` 对 Flex 项目分组的示例。

![img](./assets/2e9126254302464baf5f16071375999d~tplv-k3u1fbpfcp-zoom-1.jpeg)

```html
<header>
    <Logo />
    <Nav />
    <UserProfile />
</header>
<style>
  header {
    display: flex;
    gap: var(--gap, 1rem);
    align-items: center;
	}
</style>
```

示例中的 `<Logo />` 、`<Nav />` 和 `<UserProfile />` 三个组件都是 Flex 项目：

![img](./assets/405c8fb9fa174b398f7631e92ff42355~tplv-k3u1fbpfcp-zoom-1.jpeg)

就这个示例而言，在 Flex 容器上 `<header>` 使用 `justify-content: space-between` 无法达到预期的效果：

![img](./assets/9fe413a90a1340939eb3e447d82a25a9~tplv-k3u1fbpfcp-zoom-1.jpeg)

最为简单的方法，就是在 `<UserProfile />` 使用 `margin-left: auto` 或 `margin-inline-start: auto` ：

```css
.header {
  display: flex;
  gap: var(--gap, 1rem);
}
​
.section {
  margin-inline-start: auto;
}
```

> Demo 地址： <https://codepen.io/airen/full/qBYrVva>

需要注意的是，**在 Flex 项目上使用** **`margin: auto`，会致使 Flex 项目上的** **`align-self`** **属性失效**。

## Flexbox 中的溢出对齐

使用 CSS 来构建 Web 布局时，有一个最大的目标，即 **保持 Web 页面的内容和元素对访问者（用户）是可见的** 。容器会根据其内容自动扩展到右侧或底部。当内容溢出时，容器变为可滚动的，用户可以滚动来访问“不可见的内容”。除非你在容器上使用 `overflow:hidden`，禁止容器因内容溢出出现滚动条的行为。

这是 CSS 最常见的一种设计，但在 Flexbox 布局中，却无法保证这一点。比如下面这个案例：

```css
<div class="container">
  <span>CSS</span>
  <span>is</span>
  <span>awesome!</span>
</div>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

`align-items` 将所有 Flex 项目（即 `span` 元素）沿着侧轴水平居中对齐。当 Flex 容器 `.container` 有足够空间时一切都完美，但如果容器没有足够多的空间来容纳 Flex 项目的内容时，就会出现“数据丢失”的情况：

![img](./assets/9a00c97cf0134c53b57d966bdb505251~tplv-k3u1fbpfcp-zoom-1.jpeg)

由于 Flex 项目始终在 Flex 容器水平居中，Flex 项目宽度大于 Flex 容器宽度时，Flex 项目就会在左右两边溢出。问题是 **左侧的溢出区域超出了 Flex 容器视口的起始边缘，你不能滚动到该区域** 。在这种情况下，就需要使用到 **[CSS Box Alignment Module Level 3](https://drafts.csswg.org/css-align-3/#overflow-values)** （仍处于草案状态）定义 **安全对齐** 。

> “安全”对齐会在溢出情况下更改对齐模式，以避免数据丢失。

就是给对齐属性新增了 `safe` 和 `unsafe` 两个关键词：

- `safe`关键字会将因为对齐方式导致溢出时，将设置的对齐模式切换到 `start` 对齐模式下，目的是避免“数据丢失”，其中部分项目超出对齐容器的边界并且无法滚动到。

<!---->

- `unsafe`，即使会导致此类数据丢失，也会遵守对齐方式。

在上面的示例中，如果我们设置了 `align-items: safe center` （注意，`safe` 的 `center` 之间有一个空格），那么最终 Flex 项目对齐方式会切换到 `start` (或 `flex-start`) 模式，不会强制 Flex 项目居中对齐。

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: safe center;
}
```

![img](./assets/71b198fcaf9e4b97bddaf16ce2005251~tplv-k3u1fbpfcp-zoom-1.jpeg)

如果你确实想要对齐（即使它会导致溢出），那么你可以指定 `align-items` 属性的值为 `unsafe center` 。然后，你已请求浏览器执行你选择的对齐方式，无论内容随后发生什么。

溢出对齐对于防止数据丢失是非常有益的，可惜的是，直到写本课程时，仅有 Firefox 浏览器支持该特性。不过，可以使用 `margin: auto` 来达到相似的效果。

![img](./assets/c80b8f7c354a48a3ad6bd8d6921b7055~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/KKRWZMO>

## 书写模式对 Flexbox 对齐方式的影响

通过前面内容的学习，我想大家对 Flex 项目中的对齐属性有了一定的了解：

- 可用于 Flex 容器的属性有 `justify-content` 、`align-content` 和 `align-items`；

<!---->

- 可用于 Flex 项目的属性有 `align-self` 和 `margin: auto`；

<!---->

- Flexbox 布局中的溢出对齐 `safe` 和 `unsafe` ；

<!---->

- Flexbox 布局中没有 `justify-items` 和 `justify-self` 属性。

在 Flexbox 布局中，这些属性都会受到 `flex-direction` 属性的影响，其中`justify-`属性始终用于在主轴上对齐，`align-`属性始终用于在侧轴上对齐。

但在 CSS 中，CSS 的书写模式 `writing-mode` 或阅读模式 `direction` （HTML 的 `dir`）也会影响 Web 布局，即 **Web 排版的方向** 。同样的，CSS 的 `writing-mode` 、`dirction` 和 HTML 的 `dir` 对 Flexbox 布局中对齐属性也会产生不同的结果。

![img](./assets/bdeef468bbd44e61a16837d6db9d0f18~tplv-k3u1fbpfcp-zoom-1.gif)

> Demo 地址： <https://codepen.io/airen/full/BaxWYLN>

## 小结

在社区中也有很多小游戏，帮助我们用趣味性来理解这些属性在 Flexbox 布局中的使用。这里也简单构建一个小 [Demo](https://codepen.io/airen/full/NWMpyYd)，希望能更好地帮助大家理解上面的相关属性：

![img](./assets/8aff9df2259e419b893892bd24c9d164~tplv-k3u1fbpfcp-zoom-1.jpeg)

> Demo 地址： <https://codepen.io/airen/full/NWMpyYd>
