# 快速搞定前端技术一面 匹配大厂面试要求

## 题目考察的知识点

1. JS 中使用 typeof 能得到哪些类型（考点：JS 变量类型）
2. 何时使用 === 何时使用 == （考点：强制类型转换）
3. window.onload 和 DOMContentLoaded 的区别(考点：浏览器渲染过程)
4. 用 JS 创建 10 个 a 标签，点击的时候弹出来对应的序号（考点：js 作用域）
5. 简述如何实现一个模块加载器，实现类似 require.js 的基本功能（考点：js 模块化）
6. 实现数组的随机排序（考点：JS 基础算法）
7. 手写节流 throttle 防抖 debounce（考点：性能、体验优化）
8. Promise 解决了什么问题（考点：js 异步）

## 简历基本信息

### 个人信息

1. 必备：姓名、性别、电话、邮箱、籍贯（非必选）
2. 年龄可不写（能从教育经历评估出来）
3. 头像无所谓

### 教育经历

1. 写上最高学历即可
2. 学校、专业、入学和毕业时间
3. 不要写上高中，显得不够专业

### 专业技能

1. 表现自己的核心竞争力
2. 内容不要太多，3-5 条即可
3. 太基础的不用写，比如使用 vscode

### 工作经历

1. 如实写
2. 写明公司，职位，入职离职时间即可，多写无益
3. 如果有空窗期，如实填写即可

### 项目经历

1. 写 2-4 个具有说服力的项目（视工作时间）
2. 项目描述，技术栈，个人角色
3. 技巧：可以把别人的项目写上，只要你能 hold 住

### 博客或者开源

1. 有博客或者开源项目，会让你更有竞争力
2. 切记：需要真的有内容，不可临时抱佛脚
3. 可以从现在开始，慢慢积累

### 注意事项

1. 界面不要太花哨，简洁明了即可
2. 注意用词，”精通“，”熟练“等慎用
3. 不可造假，会被拉入黑名单（项目经历那里，不是造假！）

## HTML 面试题

### 如何理解 html 语义

- 让人更容易读懂（增加代码可读性）
- 让搜索引擎更容易读懂（SEO）

### 默认情况下，那些标签是块级元素，哪些是内联元素：

- display: block/table 有 div h1 h2 table ul ol p 等

- display: inline-block/inline 有 span img input button 等

## CSS 面试题

知识模块：布局、定位、图文样式、响应式、CSS3、

### 布局：

#### 1. 盒模型的宽度如何计算

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

#### 2. margin 纵向重叠的问题

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

#### 3. margin 负值的问题

- 对 margin 的 top left right bottom 设置负值，有何效果

  - **margin-top 和 margin-left 设置为负值时，元素会向上、向左移动**
  - **margin-right 设置负值时，右侧元素左移，自身不受影响**
  - **margin-bottom 设置负值时，下方元素上移，自身不受影响**

#### 4. BFC 的理解和应用

- 什么是 BFC？如何应用？
  - BFC: block format context 块级格式化上下文, 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
  - 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素，说人话：BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。 我们经常使用到 BFC，只不过不知道它是 BFC 而已。
- 形成 BFC 的常见条件

  - float 不是 none
  - position 是 absolute 或者 fixed
  - overflow 不是 visible
  - display 是 flex inline-block 等
    > 看吧，是不是经常在代码中用到上边列举的属性，你在不知不觉中就开启了 BFC，只是你不知道它是 BFC 而已。

- BFC 的常见应用
  - 清除浮动

[相关 BFC 阅读](https://zhuanlan.zhihu.com/p/25321647)

#### 5. float 布局的问题，以及 clearfix

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

- 手写 clearfix

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

#### 6. flex 画色子

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

### 定位：

#### 1. absolute 和 relative 分别依赖什么定位

- relative 依据自身定位
- absolute 依据最近一层的定位元素定位（**定位元素：absolute relative fixed body**）

#### 2. 居中对齐有哪些实现方式

- 水平居中
  - inline 元素：`text-align: center`
  - block 元素： `margin: auto`
  - absolute 元素：`left: 50% + margin-left 负值`
- 垂直居中
  - inline 元素： `line-height 的值等于 height 值`
  - absolute 元素：`top: 50% + margin-top 负值`
  - absolute 元素：`transform(-50%, -50%)`
  - absolute 元素：`top,left,right,bottom=0 + margin: auto`

### 图文样式

1. Line-height 的继承问题

```html
<!-- 如下代码，p标签的行高将会是多少 -->
<style>
  body {
    font-size: 20px;
    line-height: 200%;
  }
  p {
    font-size: 16px;
  }
</style>
<body>
  <p>AAA</p>
</body>
```

**答案是 40px**

- 写具体数值，如 30px, 则继承该值（比较好理解）
- 写比例，如 2 / 1.5, 则继承该比例,然后在计算（比较好理解）
- 写百分比，如 200%, 则继承计算出来的值（考点）

如下代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>line-height 继承问题</title>
  </head>
  <style>
    body {
      font-size: 20px;
      line-height: 200%;
    }
    div {
      background-color: #ccc;
      font-size: 16px;
    }
  </style>
  <body>
    <div>这是一行文字</div>
    <p>讲解</p>
    <ol>
      <li>
        当body 的 line-height 是 50px时,div的 line-height 直接继承，是 50px
      </li>
      <li>
        当body 的 line-height 是 2 时,div的 line-height 是 div的 font-size 乘以
        2,是 32px
      </li>
      <li>
        当body 的 line-height 是 200% 时,div的 line-height 是父级元素 body的
        font-size 乘以 2,是 40px
      </li>
    </ol>
  </body>
</html>
```

### 响应式

1.  rem 是什么

- rem 是一个长度单位
  - px 绝对长度单位，最常用
  - em 相对长度单位，相对于父元素，不常用
  - rem 相对长度单位，相对于根元素，常用于响应式布局

2.  如何实现响应式(响应式的常见方案)

- media-query 根据不同的屏幕宽度设置根元素 font-size
- rem 基于根元素的相对单位

3. 响应式 vw/vh

- rem 的弊端

  - rem 的弊端之一："阶梯"性

  ```css
  @media only screen and(max-width: 374px) {
    /* iphone5或者更小的尺寸， */
    html {
      font-size: 86px;
    }
  }
  @media only screen and(min-width: 374px) and (max-width: 413px) {
    /* iphone 6/7/8 和 iphone x */
    html {
      font-size: 100px;
    }
  }
  @media only screen and(min-width: 414px) {
    /* iphone 6p/7p/8p 或者更大的尺寸 */
    html {
      font-size: 110px;
    }
  }
  ```

- 网页的视口尺寸
  - window.screen.height：屏幕高度
  - window.innerHeight: 网页视口高度
  - document.body.clientHeight: body 高度
- vw/vh
  - vh 网页视口高度的 1/100
  - vw 网页视口宽度的 1/100
  - vmax 取两者最大值，vmin 取两者最小值

### CSS3

1.关于 css3 动画

- 并不是 面试的重点，除非你面试的是一个专门做动画的职位

## JS 面试题

### 变量类型和计算

> 知识点：值类型 vs 引用类型，typeof 运算符，深拷贝

```javascript
// 值类型
let a = 100
let b = a
a = 200
console.log(b) // 100
// 引用类型
let a = { age: 20 }
let b = a
b.age = 21
console.log(a.age) // 21
```

深入分析：基本类型的值是存放在 栈区 的，即内存中的栈内存，引用类型的值是同时保存在 栈内存和堆内存 的
(这么做是为了性能)
[相关阅读](https://learnku.com/articles/38192)

- **常见值类型：undefined string number null symbol undefined boolean**
- **常见引用类型：Array Function Object Date RegExp 等**（注意：Function 是一个特殊引用类型，但不用于存储数据，所以没有拷贝、复制函数这一说）
- **类型转换**
  - 字符串拼接
    ```javascript
    const a = 100 + 10 // 110
    const b = 100 + '10' // "10010"
    const c = true + '10' // "true10"
    ```
  - ==
    ```javascript
    100 == '100' // true
    0 == '' // true
    0 == false // true
    false == '' // true
    null == undefined // true
    ```
  - if 语句和逻辑运算
    - truly 变量：!!a === true 的变量
    - falsely 变量：!!a === false 的变量
    ```javascript
    // 以下是 falsely 变量，除此之外都是 truly 变量
    !!0 === false
    !!NaN === false
    !!'' === false
    !!null === false
    !!undefined === false
    !!false === false
    // 逻辑判断
    console.log(10 && 0) // 0
    console.log('' || 'abc') // "abc"
    console.log(!window.abc) // true
    // 等等
    ```

#### 1. typeof 能判断哪些类型

- 识别所有值类型

```javascript
let a
console.log(typeof a) // "undefined"
const str = 'abc'
console.log(typeof str) // "string"
const n = 100
console.log(typeof n) // "number"
const b = true
console.log(typeof b) // "boolean"
const s = Symbol('s')
console.log(typeof s) // "symbol"
console.log(typeof console.log) // "function"
console.log(typeof function () {}) // "function"
// 能识别引用类型（但是不能在细分）
typeof null // "object"
typeof ['a', 'b'] //"object"
typeof { x: 100 } // "object"
```

- 识别函数
- 判断是否是引用类型（不可再细分是哪种引用类型）

#### 2. 何时使用 === 何时使用 ==

> 除了 == null 之外，其他都一律用 === 例如

```javascript
const obj = { x: 100 }
if (obj.a == null) {
}
// 相当于
// if (obj.a === null || obj.a === undefined) { }
```

#### 3. 值类型和引用类型的区别

#### 4. 手写深拷贝

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>js -深拷贝</title>
  </head>
  <body></body>
  <script>
    /*
     * 深拷贝
     * obj: 要拷贝的对象
     */
    function deepClone(obj) {
      // obj 是null 或者 不是数组和对象，就直接返回
      if (typeof obj !== 'object' || obj === null) {
        return obj
      }
      // 初始化返回结果
      let result
      if (obj instanceof Array) {
        result = []
      } else {
        result = {}
      }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // 保证key不是原型的属性
          // 递归调用
          result[key] = deepClone(obj[key])
        }
      }
      return result
    }
    const objA = {
      age: 20,
      name: '孙悟空',
      address: {
        city: '北京',
      },
      arr: ['a', 'b', 'c'],
    }
    const objB = deepClone(objA)
    const objC = objA
    objA.address.city = '北京市朝阳区'
    console.log(objB.address.city) // 北京
    console.log(objC.address.city) // 北京市朝阳区
  </script>
</html>
```

### 原型和原型链

### 作用域和闭包

### 异步
