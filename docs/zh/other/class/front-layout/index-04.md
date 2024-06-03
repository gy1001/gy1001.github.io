# 04-flex 弹性布局

> 目前最流行的布局方式，特别是移动端，小程序中，对弹性布局深入讲解，并配合大量案例巩固，公司必会技能

[阮一峰：Flex 布局教程](https://ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 01：章节介绍

### flex 弹性概念

- 弹性盒子是一种用于按行或者按列布局元素的一维布局方法。元素可以膨胀以填充额外的空间，收缩以适应更小的空间

### Flex 容器

- 主轴与交叉轴
- 换行与缩写
- 主轴对其详解
- 交叉轴对齐详解

### 容器布局

- 内联和块的上下左右布局
- 不定项居中布局
- 均分列布局
- 组合嵌套布局

### Flex 子项

- flex-grow 扩展比例
- flex-shrink 收缩比例
- flex-basis 及 flex 缩写
- order 与 align-self

### 子项布局

- 等高布局
- 两列与三列布局
- Sticky Footer 布局
- 溢出项布局

### 其他

- 综合案例 1：swiper 轮播图
- 综合案例 2：知乎导航
- 测试题
- 练习题

## 02: 主轴与交叉轴

### 基本概念

- 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
- 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。
- 项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。
- ![image](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

### flex 容器与 flex 子项

#### flex 容器

- flex-direction: 属性决定主轴的方向（即项目的排列方向）。
  - `row`（默认值）：主轴为水平方向，起点在左端。
  - `row-reverse`：主轴为水平方向，起点在右端。
  - `column`：主轴为垂直方向，起点在上沿。
  - `column-reverse`：主轴为垂直方向，起点在下沿。
- flex-wrap： 默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

  - `nowrap`（默认）：不换行。
  - `wrap`：换行，第一行在上方
  - `wrap-reverse`：换行，第一行在下方。

- flex-flow：此属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

  ```css
  .box {
    flex-flow: <flex-direction> || <flex-wrap>;
  }
  ```

- justify-content：属性定义了项目在主轴上的对齐方式。

  - `flex-start`（默认值）：左对齐
  - `flex-end`：右对齐
  - `center`： 居中
  - `space-between`：两端对齐，项目之间的间隔都相等。
  - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

- align-items：属性定义项目在交叉轴上如何对齐。

  - `flex-start`：交叉轴的起点对齐。
  - `flex-end`：交叉轴的终点对齐。
  - `center`：交叉轴的中点对齐。
  - `baseline`: 项目的第一行文字的基线对齐。
  - `stretch`（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。

- align-content：属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

  - `flex-start`：与交叉轴的起点对齐。
  - `flex-end`：与交叉轴的终点对齐。
  - `center`：与交叉轴的中点对齐。
  - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
  - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  - `stretch`（默认值）：轴线占满整个交叉轴。

#### flex 子项

- order：属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

- flex-grow：属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

  > 如果所有项目的`flex-grow`属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

- flex-shrink: 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

  > 如果所有项目的`flex-shrink`属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

- flex-basis: 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小

  > 它可以设为跟`width`或`height`属性一样的值（比如 350px），则项目将占据固定空间。

- flex: `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

  > 该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。
  >
  > 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

  ```css
  .item {
    flex: none | [ < 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' >];
  }
  ```

- align-self: `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

  > 该属性可能取 6 个值，除了 auto，其他都与 align-items 属性完全一致。

  ```css
  .item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
  }
  ```

## 03：换行与缩写

> flex-wrap： 默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        /* flex-direction: column;
          flex-wrap: wrap; */
        flex-flow: column wrap;
      }

      .main div {
        width: 100px;
        height: 100px;
        background: pink;
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
    </div>
  </body>
</html>
```

## 04: 主轴对齐详解

> justify-content：属性定义了项目在主轴上的对齐方式。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        flex-wrap: wrap;
      }

      .main div {
        width: 100px;
        height: 100px;
        background: pink;
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <!-- <div>4</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div> -->
    </div>
  </body>
</html>
```

## 05：交叉轴对齐详解

> align-content：属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
>
> align-items：属性定义项目在交叉轴上如何对齐。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        flex-wrap: wrap;
        /* 当不折行的情况下，align-content是不生效的 */
        /*  align-content:space-evenly; */
        /*  align-content: stretch; */
        /*  align-items:center; */
      }

      .main div {
        width: 100px;
        /* height: 100px; */
        background: pink;
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </body>
</html>
```

## 06: 内联与块的上下左右居中布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            display: flex;
            align-items: center;
        } */
      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
        } */
      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            line-height: 200px;
        } */

      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            display: flex;
            align-items: center;
        } */

      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            display:table-cell;
            vertical-align: middle;
        } */

      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .box div{
            width:100px;
            height:100px;
            background:pink;
        } */

      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            position: relative;
        }
        .box div{
            width:200px;
            height:50px;
            background:pink;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);
        } */

      /* .box {
            width: 300px;
            height: 200px;
            background: skyblue;
            position: relative;
            display: flex;
        }
        .box div{
            width:200px;
            height:50px;
            background:pink;
            margin:auto;
        } */

      .box {
        width: 300px;
        height: 200px;
        background: skyblue;
        position: relative;
      }
      .box div {
        width: 200px;
        height: 50px;
        background: pink;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    </style>
  </head>

  <body>
    <!-- <div class="box">
        测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
    </div> -->

    <div class="box">
      <div></div>
    </div>
  </body>
</html>
```

## 07: 不定项居中布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* .box {
            width: 300px;
            height: 150px;
            background: skyblue;
            display: flex;
            justify-content: center;
            align-items: flex-end;
        }

        .box div {
            width: 30px;
            height: 30px;
            background: pink;
            border-radius: 50%;
            margin:5px;
        } */

      .box {
        width: 300px;
        height: 150px;
        background: skyblue;
        position: relative;
      }
      .box section {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 0;
        font-size: 0;
      }
      .box div {
        width: 30px;
        height: 30px;
        background: pink;
        border-radius: 50%;
        display: inline-block;
        font-size: 16px;
        margin: 5px;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <section>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </section>
    </div>
  </body>
</html>
```

## 08: 均分列布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        height: 200px;
        background: skyblue;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 20px;
      }
      .main div {
        width: 30px;
        height: 30px;
        background: pink;
        border-radius: 50%;
      }

      /* .main{
            width:500px;
            height:200px;
            background:skyblue;
            overflow: hidden;
            padding:0 20px;
            box-sizing: border-box;
        }
        .main section{
            width:600px;
        }
        .main div{
            width:30px;
            height:30px;
            background:pink;
            border-radius: 50%;
            float:left;
            margin-right:77px;
        } */
    </style>
  </head>
  <body>
    <div class="main">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- <div class="main">
        <section>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </section>
    </div> -->
  </body>
</html>
```

## 09：子项分组布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* .main{
            height:200px;
            background: skyblue;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .main div:nth-of-type(2){
            display: flex;
            margin-left:10px;
        }
        .main .box{
            width:50px;
            height:100px;
            background:pink;
        } */
      .main {
        height: 200px;
        background: skyblue;
        display: flex;
        align-items: center;
      }
      .main div {
        width: 50px;
        height: 100px;
        background: pink;
        margin-right: 10px;
      }
      .main div:nth-of-type(3) {
        margin-right: auto;
      }
      .main div:nth-of-type(6) {
        margin-right: auto;
      }
    </style>
  </head>
  <body>
    <!-- <div class="main">
        <div class="box">1</div>
        <div>
            <div class="box">2</div>
            <div class="box">3</div>
        </div>
    </div> -->
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
    </div>
  </body>
</html>
```

## 10：flex-grow 扩展比例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 300px;
        background: skyblue;
        display: flex;
      }

      .main div {
        width: 100px;
        height: 100px;
        background: pink;
        /* flex-grow: 0;   默认的 */
        /* 如果比例值为1，就占满剩余的所有空间 */
        /* 400 * 0.5 -> 200 + 100 -> 300 */
        /* flex-grow: 0.5; */
        /* 当比例值大于等于1的时候，都会占满整个空间 */
        flex-grow: 2;
      }

      .main2 {
        width: 500px;
        height: 300px;
        background: skyblue;
        display: flex;
      }
      .main2 div:nth-of-type(1) {
        width: 200px;
        height: 100px;
        background: pink;
        flex-grow: 0.2;
      }
      .main2 div:nth-of-type(2) {
        width: 100px;
        height: 100px;
        background: pink;
        flex-grow: 0.1;
      }
    </style>
  </head>

  <body>
    <!-- <div class="main">
        <div>1</div>
    </div> -->
    <div class="main2">
      <div>1</div>
      <div>2</div>
    </div>
  </body>
</html>
```

## 11: flex-shrink 收缩比例

> 注意 flex-shrink 的计算收缩比例与 flex-grow 不同，

### lex-shrink 的计算方式

前文已经说到，flex 几乎一次性解决了前端布局的所有问题。那么既然可以在空间有多余时把多余空间分配给各个子元素，当然也可以在空间不够时让各个子元素收缩以适应有限的空间了。这就是 flex-shrink 属性的作用。

你可能会觉得 flex-shrink 的计算方式跟 flex-grow 很类似，然而事情并没有这么简单。

flex-shrink 属性定义空间不够时各个元素如何收缩。其值默认为 1。很多文章对此基本是一笔带过：“flex-shrink 属性定义了元素的收缩系数”，根本就不说它具体是怎么计算的。

flex-shrink 定义的仅仅只是元素宽度变小的一个权重分量。

每个元素具体收缩多少，还有另一个重要因素，即它本身的宽度。

举个例子：

父元素 500px。三个子元素分别设置为 150px，200px，300px。

三个子元素的 flex-shrink 的值分别为 1，2，3。

首先，计算子元素溢出多少：150 + 200 + 300 - 500 = -150px。

那这 -150px 将由三个元素的分别收缩一定的量来弥补。

具体的计算方式为：每个元素收缩的权重为其 flex-shrink 乘以其宽度。

所以总权重为 1 _ 150 + 2 _ 200 + 3 \* 300 = 1450

三个元素分别收缩：

- 150 _ 1(flex-shrink) _ 150(width) / 1450 = -15.5
- 150 _ 2(flex-shrink) _ 200(width) / 1450 = -41.4
- 150 _ 3(flex-shrink) _ 300(width) / 1450 = -93.1

三个元素的最终宽度分别为：

- 150 - 15.5 = 134.5
- 200 - 41.4 = 158.6
- 300 - 93.1 = 206.9

同样，当所有元素的 flex-shrink 之和小于 1 时，计算方式也会有所不同：

此时，并不会收缩所有的空间，而只会收缩 flex-shrink 之和相对于 1 的比例的空间。

还是上面的例子，但是 flex-shrink 分别改为 0.1，0.2，0.3。

于是总权重为 145（正好缩小 10 倍，略去计算公式）。

三个元素收缩总和并不是 150px，而是只会收缩 150px 的 (0.1 + 0.2 + 0.3) / 1 即 60% 的空间：90px。

每个元素收缩的空间为：

- 90 _ 0.1(flex-shrink) _ 150(width) / 145 = 9.31
- 90 _ 0.2(flex-shrink) _ 200(width) / 145 = 24.83
- 90 _ 0.3(flex-shrink) _ 300(width) / 145 = 55.86

三个元素的最终宽度分别为：

- 150 - 9.31 = 140.69
- 200 - 24.83 = 175.17
- 300 - 55.86 = 244.14

当然，类似 flex-grow，flex-shrink 也会受到 min-width 的影响。

### 总结

虽然上面的公式看起来很复杂，其实计算过程还是比较简单的：如果所有元素的 flex-grow/shrink 之和大于等于 1，则所有子元素的尺寸一定会被调整到适应父元素的尺寸（在不考虑 max/min-width/height 的前提下），而如果 flex-grow/shrink 之和小于 1，则只会 grow 或 shrink 所有元素 flex-grow/shrink 之和相对于 1 的比例。grow 时的每个元素的权重即为元素的 flex-grow 的值；shrink 时每个元素的权重则为元素 flex-shrink 乘以 width 后的值。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 200px;
        background: skyblue;
        display: flex;
      }
      .main div {
        width: 600px;
        height: 100px;
        background: pink;
        /* flex-shrink : 1; 自动收缩，跟容器大小相同 */

        /*  flex-shrink: 0; */
        flex-shrink: 0.5;
      }

      .main2 {
        width: 500px;
        height: 200px;
        background: skyblue;
        display: flex;
      }
      .main2 div:nth-of-type(1) {
        width: 300px;
        height: 100px;
        background: pink;
        flex-shrink: 0.2;
      }
      .main2 div:nth-of-type(2) {
        width: 400px;
        height: 100px;
        background: pink;
        flex-shrink: 0.1;
      }

      /* 300 + 400 - 500 -> 200 */

      /* 300 - 3/7 * 200   
        400 - 4/7 * 200 */

      /* 300 - 6/10 * 200
        400 - 4/10 * 200 */
    </style>
  </head>
  <body>
    <!-- <div class="main">
        <div>1</div>
    </div> -->

    <div class="main2">
      <div>1</div>
      <div>2</div>
    </div>
  </body>
</html>
```

## 12: flex-basis 及 flex 缩写

### flex-basis

> 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        flex-direction: column;
      }
      .main div {
        width: 100px;
        height: 100px;
        background: pink;
        flex-basis: 200px;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div></div>
    </div>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        align-items: flex-start;
      }
      .main div {
        background: pink;
        flex-basis: 100%; /* 0% auto 200px 100% */
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>测试文字</div>
    </div>
  </body>
</html>
```

### flex

> `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        align-items: flex-start;
      }
      .main div {
        background: pink;
        /* flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0%; */
        /* flex:1; */

        /*  flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 0%; */
        /*  flex:0; */

        /* flex-grow: 1;
            flex-shrink: 1;
            flex-basis: auto; */
        /* flex:auto; */

        /* flex-grow: 1;
           flex-shrink: 0;
           flex-basis: 50%; */
        flex: 1 0 50%;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>测试文字</div>
    </div>
  </body>
</html>
```

### order、align-self

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: flex;
        align-items: center;
      }
      .main div {
        width: 100px;
        height: 100px;
        background: pink;
      }
      .main div:nth-of-type(1) {
        /*  order:1; */
      }
      .main div:nth-of-type(4) {
        /*  order:-1; */
        height: 50px;
        /* align-self: auto; */ /* center */
        align-self: flex-end;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </body>
</html>
```

## 13: 等高布局

> 推荐使用弹性布局，默认就是等高效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* .main{
            width:500px;
            background:skyblue;
            display: flex;
            justify-content: space-between;
        }
        .main div{
            width:100px;
            background:pink;
        } */

      .main {
        width: 500px;
        background: skyblue;
        overflow: hidden;
      }
      .main div {
        width: 100px;
        background: pink;
        float: left;
        margin-bottom: -2000px;
        padding-bottom: 2000px;
      }
      .main div:nth-of-type(2) {
        float: right;
      }
    </style>
  </head>
  <body>
    <!-- <div class="main">
        <div>
            <p>测试内容</p>
            <p>测试内容</p>
            <p>测试内容</p>
            <p>测试内容</p>
        </div>
        <div>
            <p>测试内容</p>
            <p>测试内容</p>
            <p>测试内容</p>
            <p>测试内容</p>
            <p>测试内容</p>
            <p>测试内容</p>
        </div>
    </div> -->
    <div class="main">
      <div>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
      </div>
      <div>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
      </div>
    </div>
  </body>
</html>
```

## 14：两列与三列布局

> 其中有一列或者多列是等宽的，其他的自动撑开

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
      /* .main{
            height:100vh;
            background:skyblue;
            display: flex;
        }
        .col1{
            width:200px;
            background:pink;
        }
        .col2{
            flex-grow: 1;
            background:springgreen;
        }
        .col3{
            width:100px;
            background: tomato;
        } */

      .main {
        height: 100vh;
        background: skyblue;
      }
      .col1 {
        width: 200px;
        height: 60%;
        float: left;
        background: pink;
      }
      .col2 {
        height: 100%;
        background: lightcoral;
        margin-left: 200px;
        /*  overflow: hidden; */
      }
    </style>
  </head>
  <body>
    <!-- <div class="main">
        <div class="col1"></div>
        <div class="col2"></div>
        <div class="col3"></div>
    </div> -->
    <div class="main">
      <div class="col1"></div>
      <div class="col2"></div>
    </div>
  </body>
</html>
```

## 15：Sticky Footer 布局

> 底部不满一屏时再底部，超过一屏时，底部自动往后排列，滚动出现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
      .main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .main .header {
        height: 100px;
        background: pink;
      }
      .main .content {
        flex-grow: 1;
      }
      .main .footer {
        height: 100px;
        background: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="header"></div>
      <div class="content">
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
        <p>测试内容</p>
      </div>
      <div class="footer"></div>
    </div>
  </body>
</html>
```

## 16: 溢出项布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
      .main {
        height: 100px;
        background: skyblue;
        display: flex;
        align-items: center;
      }
      .main div {
        width: 100px;
        height: 80px;
        background: pink;
        margin-right: 10px;
        flex-shrink: 0;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
    </div>
  </body>
</html>
```

## 17: 综合案例一(Swiper轮播图)

[Swiper轮播图](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_4/4_17/1swiper.html)

## 18: 综合案例二(知乎导航) 

[知乎导航代码](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_4/4_18/1demo.html)

## 19：章节总结 

* flex 容器相关功能及语法
* flex 容器相关布局
* flex 子项相关功能以及语法
* flex 子项相关布局
* flex 综合案例：Swiper 轮播图、知乎导航
