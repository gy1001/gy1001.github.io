# 09-课程福利加餐
## 01: 横向瀑布流布局
### 横向瀑布流
* float 浮动，不推荐
* grid 网格，不推荐
* position 定位，需要配合 JS 实现（masonry.js、isotope.js）
* flex 弹性

[**源码地址**](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_9/9_1/1demo.html)

核心代码如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    /* 重置样式 */
    <link rel="stylesheet" href="./reset.css" />
    <style>
      .main {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .main .item {
        flex-grow: 1;
        height: 200px;
        /* flex-basis: 200px; */
      }
      .main .item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="item">
        <img src="./imgs/1.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/2.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/3.jpg" alt="" />
      </div>
      。。。
    </div>
    <script>
      var items = document.querySelectorAll('.item')
      for (var i = 0; i < items.length; i++) {
        items[i].style.flexBasis = Math.random() * 200 + 200 + 'px'
      }
    </script>
  </body>
</html>
</style>
```

## 02: 竖向瀑布流
### 实现思路发分析
* float 浮动，不推荐
* grid 网格，不推荐
* flex 弹性, 不推荐
* position 定位，需要配合 JS 实现（masonry.js、isotope.js）
* 多列方式，需要配合 JS 完成

[**源码地址**](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_9/9_2/1demo.html)

#### 代码展示
* 根据 js 获得当前应该显示几列
* 动态获取最低的一列，然后放入图片
* 监听视口变化时间，重新执行操作
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./reset.css" />
    <style>
      .container {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .item-col {
        flex-basis: 300px;
        flex-grow: 1;
      }
      .item-box {
        padding-top: 10px;
        break-inside: avoid;
      }
      .item-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .more-btn {
        display: block;
        margin: 30px auto;
        padding: 20px;
        font-size: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container"></div>
    <button class="more-btn">加载更多</button>
    <script>
      var container = document.querySelector('.container')
      var itemBox = document.getElementsByClassName('item-box')
      var moreBtn = document.querySelector('.more-btn')
      var now = 0
      var cols = Math.floor(window.innerWidth / 300)

      for (var i = 0; i < cols; i++) {
        var itemCol = document.createElement('div')
        itemCol.className = 'item-col'
        container.append(itemCol)
      }

      ;(function () {
        var _arg = arguments
        if (now === 15) {
          return
        }
        now++
        var itemBox = document.createElement('div')
        var itemImg = document.createElement('img')
        itemBox.className = 'item-box'
        itemImg.src = `./imgs/${now}.jpg`
        itemBox.append(itemImg)
        itemImg.onload = function () {
          minCols().append(itemBox)
          _arg.callee()
        }
      })()

      function minCols() {
        var itemCols = document.querySelectorAll('.item-col')
        var arr = [...itemCols]
        arr.sort(function (c1, c2) {
          return c1.offsetHeight - c2.offsetHeight
        })
        return arr[0]
      }

      window.onresize = function () {
        var changeCols = Math.floor(window.innerWidth / 300)
        if (changeCols === cols) {
          return
        }
        cols = changeCols
        var itemBoxs = document.querySelectorAll('.item-box')
        container.innerHTML = ''
        for (var i = 0; i < changeCols; i++) {
          var itemCol = document.createElement('div')
          itemCol.className = 'item-col'
          container.append(itemCol)
        }
        var itemCols = document.querySelectorAll('.item-col')

        for (var i = 0; i < itemBoxs.length; i++) {
          minCols().append(itemBoxs[i])
        }
      }

      moreBtn.onclick = function () {
        var itemCols = document.querySelectorAll('.item-col')
        var now = 14

        ;(function () {
          var _arg = arguments
          if (now === 20) {
            return
          }
          now++
          var itemBox = document.createElement('div')
          var itemImg = document.createElement('img')
          itemBox.className = 'item-box'
          itemImg.src = `./imgs/${now}.jpg`
          itemBox.append(itemImg)
          itemImg.onload = function () {
            minCols().append(itemBox)
            _arg.callee()
          }
        })()
      }
    </script>
  </body>
</html>
```

### Multi-Comlumns 多栏布局

* column-conunt: 多栏的个数

* column-width: 多栏的宽度

* column-gap: 多栏的间距

* column-rule: 多栏的边线

* column-span: 多栏的合并

  

[**源码地址**](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_9/9_2/2demo.html)

### Multi-Comlumns 多栏布局的缺点
因为它本身是竖向进行添加布局的，不适合做动态加载更多数据的操作，因为后者是一个横向布局的操作

#### 代码展示
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./reset.css" />
    <style>
      .main {
        /* column-count: 4; */
        column-width: 300px;
        column-gap: 20px;
        column-rule: 1px gray dashed;
      }
      h1 {
        column-span: all;
        text-align: center;
      }
      .main .item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <h1>我是标题</h1>
      <div class="item">
        <img src="./imgs/1.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/2.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/3.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/4.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/5.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/6.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/7.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/8.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/9.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/10.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/11.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/12.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/13.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/14.jpg" alt="" />
      </div>
      <div class="item">
        <img src="./imgs/15.jpg" alt="" />
      </div>
    </div>
  </body>
</html>
```

## 03：视觉差布局原理解析 

* 也叫做视察滚动布局，是指多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验。
* 苹果官网示例

### 视觉差布局原理

* 修改: background-attachment、position、left、top、transform、opacity 等等样式

### 代码示例

> 使用 skrollr.min.js 插件

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
        height: 3000px;
      }
      .box {
        width: 300px;
        height: 300px;
        border: 10px pink solid;
        background-image: url(./20.jpg);
        background-attachment: fixed;
      }
      .box2 {
        width: 500px;
        height: 100px;
        background: skyblue;
        margin-top: 400px;
      }
    </style>
    <script src="./skrollr.min.js"></script>
  </head>
  <body>
    <div class="box"></div>

    <div
      class="box2"
      data-200="width: 500px;"
      data-400="width: 1000px; transform:rotate(0deg)"
      data-600="transform:rotate(360deg)"
    >
      bbbbbbbbbbbbbbb
    </div>
    <script>
      skrollr.init()
    </script>
  </body>
</html>
```

## 04：视觉差布局案例实现

[源码地址](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_9/9_4/1demo.html)

## 05: 文字环绕布局

### **利用float浮动实现文字环绕**

* 假设在一个布局中有上下两个元素，如果给上面的元素添加float浮动，会使其脱离文档流，从而让下面元素跑到上面元素的后面。
* 但是如果下面元素是一段文本的话，那么将无法跑到上面元素的后面，而是会产生文字环绕的效果。为什么会这样呢？主要是因为最初设计的初衷就是为了实现这种文字环绕的效果。

```html
<style>
.main {
    width: 300px;
    border: 1px black solid;
}
.box {
    width: 100px;
    height: 100px;
    background: pink;
    float: left;
    margin: 10px;
}
</style>
<div class="main">
    <div class="box"></div>
    ^测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字$
</div>
```

<div align=center>
	<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c064ada787a4a819378f5c23b0e2168~tplv-k3u1fbpfcp-watermark.image" />
    <div>float浮动的文字环绕</div>
</div>

* 左浮动会产生右环绕，同理右浮动会产生左环绕。但是同时出现左右环绕，目前float属性还做不到，将来float属性可能会添加一个center值，专门用来实现左右文字环绕的需求。

* 当然我们可以分别实现对文字的左右环绕方式，代码如下：

```html
<style>
.main {
    width: 300px;
    border: 1px black solid;
}
.box1, .box2 {
    width: 100px;
    height: 100px;
    background: pink;
    float: right;
    margin: 10px;
}
.box2 {
    float: left;
}
</style>
<div class="main">
    <div class="box1"></div>
    ^测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字$
    <div class="box2"></div>
    ^测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字$
</div>
```

<div align=center>
	<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0ae998cfab74e478f8ee7e49a34b9aa~tplv-k3u1fbpfcp-watermark.image" />
    <div>float浮动的文字环绕</div>
</div>

### 利用CSS Shapes模块实现文字环绕

* CSS Shapes是一个CSS模块，用于定义几何形状。CSS Shapes模块可以实现不规则的文字环绕效果，需要和浮动配合使用。

```html
<style>
.main {
    width: 300px;
    border: 1px black solid;
}
.box {
    width: 100px;
    height: 100px;
    background: pink;
    float: left;
    margin: 10px;
    border-radius: 50%;
    shape-outside: margin-box;
}
</style>
<div class="main">
    <div class="box"></div>
    ^测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字$
</div>
```

<div align=center>
	<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/878419421e894c5f8fec7fa221df48dc~tplv-k3u1fbpfcp-watermark.image" />
    <div>CSS Shapes的文字环绕</div>
</div>

* 可以看到文字会围绕这圆形的边界进行环绕，而普通的float浮动环绕是做不到的。`shape-outside`的可选值比较多：

- **none** : 默认值
- **shape-box** : 图形盒子，例如：margin-box、border-box、padding-box、content-box
- **basic-shape** : 基本图形函数，例如：circle()、ellipse()、polygon()
- **image** : 图像类

* margin-box就是沿着元素margin区域进行环绕，border-box就是沿着元素border区域进行环绕。基本图形函数circle()就是沿着圆形区域进行环绕、ellipse()就是沿着椭圆形区域进行环绕、polygon()就是沿着自定义的折线区域进行环绕，下面是结合clip-path属性（使用裁剪方式创建元素的可显示区域）完成的一个围绕三角形区域进行的文字环绕。

```css
.box {
    width: 100px;
    height: 100px;
    background: pink;
    float: left;
    margin: 10px;
    clip-path: polygon(0 0, 0 100px, 100px 100px);
    shape-outside: polygon(0 0, 0 100px, 100px 100px);
    shape-margin: 15px;
}
```

<div align=center>
	<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e51269d8dd874d46bb69666552400012~tplv-k3u1fbpfcp-watermark.image" />
    <div>CSS Shapes的文字环绕</div>
</div>

* 还可以让文字环绕特殊图片，需要配合mask属性（遮罩）完成，而且需要在服务器环境下运行代码，因为图片的访问有浏览器的安全限制。

```css
.box {
    width: 100px;
    height: 164px;
    float: left;
    margin: 10px;
    shape-outside: url(./birds.png);
    shape-margin: 5px;
    background-color: pink;
    -webkit-mask: url(./birds.png) no-repeat;
    mask: url(./birds.png) no-repeat;
}
```

<div align=center>
	<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4219928f22a943608b3ae332ebce8750~tplv-k3u1fbpfcp-watermark.image" />
    <div>CSS Shapes的文字环绕</div>
</div>

### 利用CSS Exclusion模块实现文字环绕

* CSS Exclusion 是 Adob​​e 的另一项提议，旨在扩展CSS的现有可能性（以避免浮动的限制），并能够构建允许内联内容流入和/或围绕圆形或其他任意复杂形状的布局。

* 利用CSS Exclusion模块可以实现类似于Word文档的方式，可以让文字四周环绕元素，不过CSS Exclusion模块目前浏览器的支持程度还不高，只能针对IE10+的浏览器起作用。

&emsp;&emsp;CSS Exclusion模块主要使用wrap-flow属性，可选值有：start、end、both、clear等。


```html
<style>
.main {
    width: 300px;
    border: 1px black solid;
    position: relative;
}
.box {
    width: 100px;
    height: 100px;
    background-color: pink;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px;
    -ms-wrap-flow: both;
    -webkit-wrap-flow: both;
} 
</style>
<div class="main">
    <div class="box"></div>
    ^测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字$
</div>
```

<div align=center>
	<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/972b286c4fa04b468d3bb5f07e4e6cfb~tplv-k3u1fbpfcp-watermark.image" />
    <div>CSS Exclusion在IE11下的文字环绕</div>
</div>
