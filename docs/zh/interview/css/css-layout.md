# CSS-布局

## 1. 盒模型的宽度如何计算

```html
<!-- 请问如下代码中，div1 的 offsetWidth 是多大？ -->
<style>
  #div1 {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
</style>
<div id="div1"></div>
```

- offsetWidth = (内容宽度+内边距+边框)，无外边距
- 因此，**答案是 122px**

* 补充：如果让 offsetWidth 等于 100px 该怎么做
  增加样式属性：`box-sizing: border-box;`


## 2. margin 纵向重叠的问题

```html
<!-- 如下代码，AAA和BBB之间的距离是多少 -->
<style>
  p {
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>
<p>AAA</p>
<p></p>
<p></p>
<p>BBB</p>
```

- 相邻元素的 margin-top 和 margin-bottom 会发生重叠
- 空白内容的 p 标签也会重叠
- **答案是 15px**

## 3. margin 负值的问题

- 对 margin 的 top left right bottom 设置负值，有何效果

  - **margin-top 和 margin-left 设置为负值时，元素会向上、向左移动**
  - **margin-right 设置负值时，右侧元素左移，自身不受影响**
  - **margin-bottom 设置负值时，下方元素上移，自身不受影响**


## 4. BFC 的理解和应用

- 什么是 BFC？如何应用？
  - BFC: block format context 块级格式化上下文, 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
  - 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素，说人话：BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。 我们经常使用到 BFC，只不过不知道它是 BFC 而已。

- 形成 BFC 的常见条件
  - float 不是 none
  - position 是 absolute 或者 fixed
  - overflow 不是 visible
  - display 是 flex、inline-block 等
    > 看吧，是不是经常在代码中用到上边列举的属性，你在不知不觉中就开启了 BFC，只是你不知道它是 BFC 而已。

- BFC 的常见应用
  - 清除浮动

[相关 BFC 阅读](https://zhuanlan.zhihu.com/p/25321647)


## 5. float 布局的问题，以及 clearfix

- 如何实现圣杯布局和双飞翼布局
  - 三栏布局：中间一栏最先加载和渲染（内容最重要）
  - 两侧内容固定，中间内容随着宽度自适应
  - 一般用于 PC 网页

- 圣杯布局和双飞翼布局的技术总结
  - 使用 float 布局
  - 两侧使用 margin 布局，以便和中间内容横向重叠
  - 防止中间内容被两侧覆盖，一个用 padding 一个用 margin

- 核心代码
  **圣杯布局代码**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圣杯布局</title>
  </head>
  <style>
    body {
      min-width: 550px;
    }
    #header {
      text-align: center;
      background-color: #f1f1f1;
    }
    #container {
      padding-left: 200px;
      padding-right: 150px;
    }
    #container .column {
      float: left;
    }
    #center {
      background-color: #ccc;
      width: 100%;
    }
    #left {
      background-color: yellow;
      width: 200px;
      margin-left: -100%;
      left: -200px;
      position: relative;
    }
    #right {
      background-color: red;
      width: 150px;
      margin-right: -150px;
    }
    #footer {
      text-align: center;
      background-color: #f1f1f1;
      clear: both;
    }
  </style>
  <body>
    <div id="header">this is header</div>
    <div id="container">
      <div id="center" class="column">this is center</div>
      <div id="left" class="column">this is left</div>
      <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
  </body>
</html>
```

**双飞翼布局代码**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>双飞翼布局</title>
  </head>
  <style>
    body {
      min-width: 550px;
    }
    .col {
      float: left;
    }
    #main {
      width: 100%;
      height: 200px;
      background-color: #ccc;
    }
    #main #main-wrap {
      margin: 0 190px;
    }
    #left {
      width: 190px;
      height: 200px;
      background-color: #0000ff;
      margin-left: -100%;
    }
    #right {
      width: 190px;
      height: 200px;
      background-color: #ff0000;
      margin-left: -190px;
    }
  </style>
  <body>
    <div id="main" class="col">
      <div id="main-wrap">this is main</div>
    </div>
    <div id="left" class="col">this is left</div>
    <div id="right" class="col">this is right</div>
  </body>
</html>
```
## 6. 手写 clearfix

> 在圣杯布局基础上进行修改

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圣杯布局</title>
  </head>
  <style>
    body {
      min-width: 550px;
    }
    #header {
      text-align: center;
      background-color: #f1f1f1;
    }
    #container {
      padding-left: 200px;
      padding-right: 150px;
    }
    #container .column {
      float: left;
    }
    #center {
      background-color: #ccc;
      width: 100%;
    }
    #left {
      background-color: yellow;
      width: 200px;
      margin-left: -100%;
      left: -200px;
      position: relative;
    }
    #right {
      background-color: red;
      width: 150px;
      margin-right: -150px;
    }
    #footer {
      text-align: center;
      background-color: #f1f1f1;
      /* clear: both; */
    }
    /* 手写 clearfix */
    .clearfix::after {
      content: '';
      display: table;
      clear: both;
    }
    /* 兼容 IE 低版本 */
    .clearfix {
      *zoom: 1;
    }
  </style>
  <body>
    <div id="header">this is header</div>
    <div id="container" class="clearfix">
      <div id="center" class="column">this is center</div>
      <div id="left" class="column">this is left</div>
      <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
  </body>
</html>
```

## 7. flex 画色子

- flex 实现一个三点的色子

* 常用语法回顾
  - flex-direction
  - justify-content
  - align-items
  - flex-wrap
  - align-self

```css
/* flex 画三个点的色子 */
.box {
  display: flex; /* flex 布局*/
  justify-content: space-between; /* 两端对齐*/
}
.item {
  /* 背景色 大小 边框 */
}
.item:nth-child(2) {
  align-self: center; /* 第二项居中对齐 */
}
.item:nth-child(3) {
  align-self: flex-end; /* 第三项尾对齐*/
}
```

整体代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>flex实现一个三点的色子</title>
  </head>
  <style>
    .box {
      width: 200px;
      height: 200px;
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
    }
    .item {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #666;
    }
    .item:nth-child(2) {
      align-self: center;
    }
    .item:nth-child(3) {
      align-self: flex-end;
    }
  </style>
  <body>
    <div class="box">
      <span class="item"></span>
      <span class="item"></span>
      <span class="item"></span>
    </div>
  </body>
</html>
```


## 题目：
### 1. 假设高度已知，请写出三栏布局，其中左栏、右栏目宽度各位 300px, 中间自适应

#### 第一种解决方案：浮动布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>layout</title>
    <style>
      html * {
        padding: 0;
        margin: 0;
      }
      .layout article div {
        min-height: 100px;
      }
      .layout.float .left {
        float: left;
        width: 300px;
        background: red;
      }
      .layout.float .right {
        float: right;
        width: 300px;
        background: blue;
      }
      .layout.float .center {
        background: yellow;
      }
    </style>
  </head>
  <body>
    <section class="layout float">
      <article class="left-right-center">
        <div class="left">我是左边</div>
        <div class="right">我是右边</div>
        <div class="center">
          <h1>浮动解决方案</h1>
          1. 这是三栏布局中间部分 2. 这是三栏布局中间部分
        </div>
      </article>
    </section>
  </body>
</html>
```
