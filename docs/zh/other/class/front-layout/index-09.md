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

