# 05-grid网格布局

> 目前网格布局趋势明显，能完成很多之前繁琐的布局形式，可以说是未来布局的重中之重，想进阶CSS布局，必须掌握网格布局，本章会配合大量案例进行消化。

[阮一峰：CSS Grid 网格布局教程](https://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## 01: 章节介绍

### grid 网格概念

* CSS 网格式一个用于 web 的二维布局系统。利用网格，你可以把内容按照行与列的格式进行排版。另外，网格还能非常轻松的实现一些复杂的布局

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4dc9c0eda9341a696794238423bcddf~tplv-k3u1fbpfcp-watermark.image?)

### grid 容器与子项

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d50c32bd487e4b018848aec88e13aa73~tplv-k3u1fbpfcp-watermark.image?)

* 定义网格以及 fr 单位
* 合并网格及网格命名
* 网格间隙及简写
* 网格对齐方式及简写
* 显式网格与隐式网格
* 基于线的元素放置
* 子项对齐方式
* repeat() 与 minmax()

### grid 布局案例

* 比定位更方便的叠加布局
* 多种组合排列布局
* 栅格布局
* 容器自适应行列布局

### 其他

* 综合案例一：百度热词风云榜
* 综合案例二：小米商品导航菜单
* 测试题
* 练习题

## 02：定义网格及fr单位

* `grid-template-columns`属性定义每一列的列宽，

* `grid-template-rows`属性定义每一行的行高。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53d9d36e484e498897b5918b571a0fcb~tplv-k3u1fbpfcp-watermark.image?)

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
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        /* grid-template-columns: 50px 50px 50px;
            grid-template-rows: 50px 50px 50px; */

        /* grid-template-columns: 50px 20% auto;
            grid-template-rows: 50px 50px; */

        grid-template-columns: 150px 1fr 1fr;
        grid-template-rows: 0.3fr 0.3fr;
      }
      .main div {
        background: pink;
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
    </div>
  </body>
</html>
```

效果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65d75764222a4cc1806c0e4cda71c150~tplv-k3u1fbpfcp-watermark.image?)

## 03: 合并网格及网格命名

* 网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义

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
              width:300px;
              height:300px;
              background:skyblue;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr 1fr;
              grid-template-areas: 
              "a1 a1 a2"
              "a1 a1 a2"
              "a3 a3 a3";
          }
          .main div{
              background:pink;
              border:1px black solid;
              box-sizing: border-box;
          }
          .main div:nth-of-type(1){
              grid-area: a1;
          }
          .main div:nth-of-type(2){
              grid-area: a2;
          }
          .main div:nth-of-type(3){
              grid-area: a3;
          } */
  
        /* .main{
              width:300px;
              height:300px;
              background:skyblue;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr 1fr;
              grid-template-areas: 
              "a1 a2 a3";
          }
          .main div{
              background:pink;
              border:1px black solid;
              box-sizing: border-box;
          }
          .main div:nth-of-type(1){
              grid-area: a3;
          } */
  
        .main {
          width: 300px;
          height: 300px;
          background: skyblue;
          display: grid;
          /* grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr 1fr;
              grid-template-areas: 
              "a1 a1 a2"
              "a1 a1 a2"
              "a3 a3 a3"; */
          /*  / 后面代表的是列的写法 */
          grid-template:
            'a1 a1 a2' 1fr
            'a1 a1 a2' 1fr
            'a3 a3 a3' 1fr
             / 1fr 1fr 1fr; 
        }
        .main div {
          background: pink;
          border: 1px black solid;
          box-sizing: border-box;
        }
        .main div:nth-of-type(1) {
          grid-area: a1;
        }
        .main div:nth-of-type(2) {
          grid-area: a2;
        }
        .main div:nth-of-type(3) {
          grid-area: a3;
        }
      </style>
    </head>
    <body>
      <div class="main">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </body>
  </html>
  ```

  效果如下

  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/961d00b52ed2487db69e0b0a6802cd2a~tplv-k3u1fbpfcp-watermark.image?)

## 04：网格间隙及简写

* `grid-row-gap`属性设置行与行的间隔（行间距）

* `grid-column-gap`属性设置列与列的间隔（列间距）。

* `grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

  ```css
  grid-gap: <grid-row-gap> <grid-column-gap>;
  ```

  > 如果`grid-gap`省略了第二个值，浏览器认为第二个值等于第一个值。
  >
  > 根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`。

* ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .main {
          width: 300px;
          height: 300px;
          background: skyblue;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas:
            'a1 a1 a2'
            'a1 a1 a2'
            'a3 a3 a3';
          /* grid-row-gap: 20px;
              grid-column-gap: 30px; */
          /* grid-gap: 20px 30px; */
          /* row-gap: 20px;
              column-gap: 30px; */
          gap: 20px 30px;
        }
        .main div {
          background: pink;
          border: 1px black solid;
          box-sizing: border-box;
        }
        .main div:nth-of-type(1) {
          grid-area: a1;
        }
        .main div:nth-of-type(2) {
          grid-area: a2;
        }
        .main div:nth-of-type(3) {
          grid-area: a3;
        }
  
        .main2 {
          width: 300px;
          background: skyblue;
          display: flex;
          flex-wrap: wrap;
          row-gap: 20px;
          column-gap: 30px;
        }
        .main2 div {
          width: 100px;
          height: 100px;
          background: pink;
        }
      </style>
    </head>
    <body>
      <div class="main">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div class="main2">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </body>
  </html>
  ```

* 效果如下

  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a1c7b7053bf44bb8c77ccac800b01fc~tplv-k3u1fbpfcp-watermark.image?)

## 05：网格对齐方式及简写

* `justify-items`属性设置单元格内容的水平位置（左中右）

  * start：对齐单元格的起始边缘。
  * end：对齐单元格的结束边缘。
  * center：单元格内部居中。
  * stretch：拉伸，占满单元格的整个宽度（默认值）。

* `align-items`属性设置单元格内容的垂直位置（上中下）。

  * start：对齐单元格的起始边缘。
  * end：对齐单元格的结束边缘。
  * center：单元格内部居中。
  * stretch：拉伸，占满单元格的整个宽度（默认值）。

* `place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

  * ```css
    place-items: <align-items> <justify-items>;
    ```

* `justify-content`属性是整个内容区域在容器里面的水平位置（左中右）

  * start - 对齐容器的起始边框。
  * end - 对齐容器的结束边框。
  * center - 容器内部居中。
  * stretch - 项目大小没有指定时，拉伸占据整个网格容器。
  * space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
  * space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
  * space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

* `align-content`属性是整个内容区域的垂直位置（上中下）。

  * start - 对齐容器的起始边框。
  * end - 对齐容器的结束边框。
  * center - 容器内部居中。
  * stretch - 项目大小没有指定时，拉伸占据整个网格容器。
  * space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
  * space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
  * space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

* `place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

  * ```css
    place-content: <align-content> <justify-content>  
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
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px 100px 100px;
        /* justify-items: start;
            align-items: end; */
        place-items: end start;
      }
      .main div {
        width: 50px;
        height: 50px;
        background: pink;
      }

      .main2 {
        width: 500px;
        height: 500px;
        background: skyblue;
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px 100px 100px;
        /* justify-content: space-evenly;
            align-content: end; */
        place-content: end space-evenly;
      }
      .main2 div {
        background: pink;
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
      <div>9</div>
    </div>

    <div class="main2">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </body>
</html>
```

结果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a0bbb89c8d14dc2add195e3169171c7~tplv-k3u1fbpfcp-watermark.image?)

## 06: 显式网格与隐式网格 

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

### grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。

### grid-auto-columns

> 属性用来设置，浏览器自动创建的多余网格的列宽

### grid-auto-rows

> 属性用来设置，浏览器自动创建的多余网格的行高

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
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        /* grid-template-columns: 100px 100px 100px;
            grid-template-rows: 100px; */
        /* 默认：row 就是行产生隐式网格 */
        /* grid-auto-flow: row; */
        /* 可以调节产生隐式网格的高度 */
        /* grid-auto-rows: 100px; */

        grid-template-columns: 100px;
        grid-template-rows: 100px 100px 100px;
        /* column 就是列产生隐式网格 */
        grid-auto-flow: column;
        /* 可以调节产生隐式网格的宽度 */
        grid-auto-columns: 100px;
      }
      .main div {
        background: pink;
        border: 1px black solid;
        box-sizing: border-box;
      }

      .main2 {
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px;
        grid-auto-flow: row dense; /* dense 紧密的 */
        grid-auto-rows: 100px;
      }
      .main2 div {
        background: pink;
        border: 1px black solid;
        box-sizing: border-box;
      }
      .main2 div:nth-of-type(1) {
        grid-column-start: 2;
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
    </div>
    <hr />
    <div class="main2">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  </body>
</html>
```

结果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c94f457e944c4ad88947f115bbe950df~tplv-k3u1fbpfcp-watermark.image?)

## 07: 基于线的元素放置

###  基于线的元素放置

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

- `grid-column-start`属性：左边框所在的垂直网格线

- `grid-column-end`属性：右边框所在的垂直网格线

- `grid-row-start`属性：上边框所在的水平网格线

- `grid-row-end`属性：下边框所在的水平网格线

- `grid-column`
  此属性是`grid-column-start`和`grid-column-end`的合并简写形式，
  ```css
   grid-column: <start-line> / <end-line>;
  ```
  
-  `grid-row`
  属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。
  ```css
   grid-row: <start-line> / <end-line>;
  ```
  
- `grid-area`属性指定项目放在哪一个区域。`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

  ```css
  .item-1 {
    grid-area: e;
  }
  
  .item {
    grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
  }

### 示例1

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
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
      }
      .main div:nth-of-type(1) {
        background: pink;
        grid-column-start: 2;
        grid-column-end: 3;
        /* 默认值：auto */
        /* grid-row-start: 1;
            grid-row-end: 2; */
      }
      .main div:nth-of-type(2) {
        background: slategray;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
    </div>
  </body>
</html>
```

效果如下

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/034fb8cd88154707a00d5ccf597d4ea2~tplv-k3u1fbpfcp-watermark.image?)

### 示例2

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
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        grid-template-columns: [col1] 1fr [col2] 1fr [col3] 1fr [col4];
        grid-template-rows: [row1] 1fr [row2] 1fr [row3] 1fr [row4];
      }
      .main div:nth-of-type(1) {
        width: 50px;
        height: 50px;
        background: pink;
        justify-self: center;
        align-self: center;
        /* grid-column-start:2;
            grid-column-end:span 2; */
        /*  grid-column-start: col2;
            grid-column-end: col4; */

        /* grid-column: 2 / 3;
            grid-row: 2 / 4; */
        grid-area: 2 / 2 / 3 / 3;
      }
      .main div:nth-of-type(2) {
        background: slategray;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
    </div>
  </body>
</html>
```

效果如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45f77d6c54d3492daabe4ceeee92c31c~tplv-k3u1fbpfcp-watermark.image?)

### 子项对齐方式

*  `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
  * start：对齐单元格的起始边缘。
  * end：对齐单元格的结束边缘。
  * center：单元格内部居中。
  * stretch：拉伸，占满单元格的整个宽度（默认值）。

* `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

  * start：对齐单元格的起始边缘。
  * end：对齐单元格的结束边缘。
  * center：单元格内部居中。
  * stretch：拉伸，占满单元格的整个宽度（默认值）。

* `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。如果省略第二个值，`place-self`属性会认为这两个值相等。

  ```css
  place-self: center center;
  ```

## 08: repeat()与minmax()

### repeat

* repeat 方法及 auto-fill 可选值，指定可重复的数值

* `repeat()`接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。

  ```css
  .container {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: repeat(3, 33.33%);
  }
  ```

* `repeat()`重复某种模式也是可以的。

  ```css
  grid-template-columns: repeat(2, 100px 20px 80px); 
  // 定义了6列，第一列和第四列的宽度为100px，第二列和第五列为20px，第三列和第六列为80px。
  ```

### auto-fill

> 有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

[上面代码](https://jsbin.com/himoku/edit?css,output)表示每列宽度`100px`，然后自动填充，直到容器不能放置更多的列。

* 除了`auto-fill`，还有一个关键字`auto-fit`，两者的行为基本是相同的。只有当容器足够宽，可以在一行容纳所有单元格，并且单元格宽度不固定的时候，才会有[行为差异](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)：`auto-fill`会用空格子填满剩余宽度，`auto-fit`则会尽量扩大单元格的宽度。

### minmax()

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
// 上面代码中，minmax(100px, 1fr)表示列宽不小于100px，不大于1fr。
```

### 示例1

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
        height: 400px;
        background: skyblue;
        display: grid;
        /* grid-template-columns: 100px 100px 100px; */
        /* grid-template-columns: repeat(3, 100px); */
        /* grid-template-columns: 150px 100px 100px; */
        /* grid-template-columns: 150px repeat(2, 100px); */
        grid-template-columns: repeat(auto-fill, 100px);
        grid-template-rows: 100px;
      }
      .main div {
        background: pink;
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

效果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/955c1767eb464253a18748613098e7ff~tplv-k3u1fbpfcp-watermark.image?)

### 示例2

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
        height: 400px;
        background: skyblue;
        display: grid;
        /* grid-template-columns: 100px 1fr 100px; */
        grid-template-columns: 100px minmax(100px, 1fr) 100px;
        grid-template-rows: 100px;
      }
      .main div {
        background: pink;
        border: 1px black solid;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </body>
</html>
```

效果如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18df24eb5efc43a4b8d6655684af5087~tplv-k3u1fbpfcp-watermark.image?)

### 示例3

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
        background: skyblue;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-template-rows: 100px;
        grid-auto-rows: 100px;
        grid-gap: 20px 20px;
      }
      .main div {
        background: pink;
        border: 1px black solid;
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
      <div>9</div>
      <div>10</div>
      <div>11</div>
    </div>
  </body>
</html>
```

效果如下（会随着屏幕宽度的收缩，每一行的个数、宽度进行调整）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0b957a7fbbd4c7aa3cb095eb3e69fde~tplv-k3u1fbpfcp-watermark.image?)

## 09：比定位更方便的叠加布局

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
        width: 530px;
        height: 300px;
        background: skyblue;
        display: grid;
      }
      .main img {
        grid-area: 1/1/1/1;
      }
      .main span {
        grid-area: 1/1/1/1;
        justify-self: end;
        align-self: end;
        margin: 5px;
      }
      .main p {
        grid-area: 1/1/1/1;
        align-self: center;
        margin: 0;
        padding: 0;
        background: rgba(0, 0, 0, 0.5);
        height: 30px;
        line-height: 30px;
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b2033d0cc4b48db8460ea5b289505ef~tplv-k3u1fbpfcp-watermark.image" alt="" />
      <span>自制</span>
      <p>手机热卖中.....</p>
    </div>
  </body>
</html>
```

结果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12b19eb5e23b4cc38b9be65e6873f243~tplv-k3u1fbpfcp-watermark.image?)

## 10：多种组合排列布局 

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
        width: 300px;
        height: 300px;
        background: skyblue;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 5px;
      }
      .main div {
        background: pink;
      }
      .main div:nth-of-type(1) {
        /* grid-area: 1/1/span 2/span 2; */
        grid-area: 2/1 / span 2 / span 2;
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
    </div>
  </body>
</html>
```

效果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc56f54d3ad94ef29820aaaa95b0b1a5~tplv-k3u1fbpfcp-watermark.image?)

## 11：栅格布局 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .row {
        background: skyblue;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 50px;
        grid-auto-rows: 50px;
      }
      .row div {
        background: pink;
        border: 1px black solid;
      }
      .row .col-1 {
        grid-area: auto/auto/auto/span 1;
      }
      .row .col-2 {
        grid-area: auto/auto/auto/span 2;
      }
      .row .col-3 {
        grid-area: auto/auto/auto/span 3;
      }
      .row .col-4 {
        grid-area: auto/auto/auto/span 4;
      }
      .row .col-5 {
        grid-area: auto/auto/auto/span 5;
      }
      .row .col-6 {
        grid-area: auto/auto/auto/span 6;
      }
      .row .col-7 {
        grid-area: auto/auto/auto/span 7;
      }
      .row .col-8 {
        grid-area: auto/auto/auto/span 8;
      }
      .row .col-9 {
        grid-area: auto/auto/auto/span 9;
      }
      .row .col-10 {
        grid-area: auto/auto/auto/span 10;
      }
      .row .col-11 {
        grid-area: auto/auto/auto/span 11;
      }
      .row .col-12 {
        grid-area: auto/auto/auto/span 12;
      }
    </style>
  </head>
  <body>
    <div class="row">
      <div class="col-6">1</div>
      <div class="col-3">2</div>
      <div class="col-4">3</div>
      <div class="col-5">4</div>
    </div>
  </body>
</html>
```

效果如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8f7b357482043baa9089e7a5cb97e36~tplv-k3u1fbpfcp-watermark.image?)

## 12：容器自适应行列布局

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
            width:300px;
            background:skyblue;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 100px;
            gap:5px;
        }
        .main div{
            background:pink;
        } */

      .main {
        height: 300px;
        background: skyblue;
        display: inline-grid;
        grid-template-rows: repeat(3, 1fr);
        grid-auto-flow: column;
        grid-auto-columns: 100px;
        gap: 5px;
      }
      .main div {
        background: pink;
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
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  </body>
</html>
```

效果如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acff8524cd244582bb09ef3e58fa322f~tplv-k3u1fbpfcp-watermark.image?)

## 13：综合案例一(百度热词风云榜) 

[代码示例](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_5/5_13/1demo.html)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8506a274d4734628985b1abc327e55e3~tplv-k3u1fbpfcp-watermark.image?)

## 14: 综合案例二(小米商品导航菜单)

[代码示例](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_5/5_14/1demo.html)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/187e04b6a08540b3b3659ad40654d293~tplv-k3u1fbpfcp-watermark.image?)

## 15：章节总结

* grid 容器相关功能及语法
* grid 子项相关功能以及语法
* repeat()方法 与 minmax() 方法
* grid 常见布局方案解析
* grid 综合案例：百度热词风云榜、小米商品导航菜单
