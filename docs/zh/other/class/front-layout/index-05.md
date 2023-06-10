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
