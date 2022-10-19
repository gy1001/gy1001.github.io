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
- 识别函数
- 能识别引用类型（但是不能在细分）

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

- 存储位置不一样
  - 值类型的变量会保存在栈内存中。
  - 引用类型的变量名会保存在栈内存中，但是变量值会存储在堆内存中。
- 复制方式不一样
  - 值类型的变量直接赋值就是深复制。
  - 引用类型的变量直接赋值实际上是传递引用，只是浅复制。
- 值类型无法添加属性和方法，引用类型可以添加属性和方法
- 值类型的比较是值的比较，引用类型的比较是引用地址的比较

```javascript
const obj1 = { x: 100, y: 200 }
const obj2 = obj1
let x1 = obj1.x
obj2.x = 101
x1 = 102
console.log(obj1) // { x: 101, y: 200 }
```

#### 4. 手写深拷贝

- 注意判断值类型和引用类型
- 注意判断是数组还是对象
- 递归

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

#### 知识点总结

1. class 和 继承

- class
  - constructor
  - 属性
  - 方法
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>class-demo</title>
    </head>
    <body></body>
    <script>
      class Student {
        constructor(name, number) {
          this.name = name
          this.number = number
        }
        sayHi() {
          console.log(`姓名${this.name},学号${this.number}`)
        }
        study() {
          console.log('study')
        }
      }
      // 通过类可以声明一个实例
      const xiaLuo = new Student('夏洛', 100)
      console.log(xiaLuo.name) // 夏洛
      console.log(xiaLuo.number) // 100
      console.log(xiaLuo.sayHi()) // 姓名夏洛,学号100  undefined
    </script>
  </html>
  ```
- 继承

  - extends
  - super
  - 扩展或者重写方法

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>class-extends</title>
    </head>
    <body></body>
    <script>
      class People {
        constructor(name) {
          this.name = name
        }
        eat() {
          console.log(`${this.name} eat something`)
        }
      }
      // 子类
      class Student extends People {
        constructor(name, number) {
          super(name)
          this.number = number
        }
        sayHi() {
          console.log(`姓名${this.name},学号${this.number}`)
        }
      }
      // 子类
      class Teacher extends People {
        constructor(name, major) {
          super(name)
          this.major = major
        }
        teach() {
          console.log(`${this.name} 教授 ${this.major}`)
        }
      }
      // student 实例
      const xiaLuo = new Student('夏洛', 100)
      console.log(xiaLuo.name) // 夏洛
      console.log(xiaLuo.eat()) // 夏洛 eat something   undefined
      // teacher 实例
      const wangLaoShi = new Teacher('王老师', '语文')
      console.log(wangLaoShi.name) // 王老师
      console.log(wangLaoShi.teach()) // 王老师 教授 语文  undefined
      console.log(wangLaoShi.eat()) // 王老师 eat something  undefined
    </script>
  </html>
  ```

2. 类型判断 instanceof

```javascript
console.log(xiaLuo instanceof Student) // true
console.log(xiaLuo instanceof People) // true
console.log(xiaLuo instanceof Object) // true
console.log([] instanceof Array) // true
console.log([] instanceof Object) // true
console.log({} instanceof Object) // true
```

3. 原型和原型链

> class 实际上是函数，可见是语法糖

```javascript
typeof People // "function"
typeof Student // "function"

// 隐式原型和显式原型
console.log(xiaLuo.__proto__)
console.log(Student.prototype)
console.log(xiaLuo.__proto__ === Student.prototype)
```

- **原型关系**
  - 每个 class 都有显式原型 prototype
  - 每个实例都有隐式原型 \_\_proto\_\_
  - 实例的 \_\_proto\_\_ 指向对应 class 的 prototype
- **基于原型的执行规则**

  - 获取属性 xiaLuo.name 或者 执行 xiaLuo.sayHi()时
  - 先在自身属性和方法寻找
  - 如果找不到则自动去 \_\_proto\_\_ 中查找

- **原型链**

```javascript
console.log(Student.prototype.__proto__)
console.log(People.prototype)
console.log(People.prototype === Student.prototype.__proto__)
```

- **重要提示**
  - class 是 ES6 语法规范，由 ECMA 委员会发布
  - ECMA 只规定语法规则，即我们代码的书写规范，不规定如何实现
  - 以上实现方式都是 V8 引擎的实现方式，也是主流的

#### 问题

1. 如何准确判断一个变量是不是数组？

- a instanceof Array(也是不太靠谱,具体参考延伸阅读链接)
- Array.isArray(a)
- Object.prototype.toString.call(a)=='[object Array]'

**延伸阅读：如何判断一个数据数据类型是数组**

[javascript 判断变量是否是数组](https://segmentfault.com/a/1190000004479306)

[推荐：如何判断一个对象是不是数组？](https://blog.51cto.com/u_15219964/5502978?from_wecom=1)

[其他](https://github.com/wengjq/Basics/issues/36?from_wecom=1)

2. 手写一个简易的 jQuery， 考虑插件和扩展性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>简易jQuery</title>
  </head>
  <body>
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </body>
  <script>
    class jQuery {
      constructor(selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for (let index = 0; index < length; index++) {
          this[index] = result[index]
        }
        this.length = length
      }
      get(index) {
        return this[index]
      }
      each(fn) {
        for (let index = 0; index < this.length; index++) {
          const el = this[index]
          fn(el)
        }
      }
      on(type, fn) {
        return this.each((elem) => {
          elem.addEventListener(type, fn)
        })
      }
      // 扩展更多 DOM API
    }

    // 插件形式
    jQuery.prototype.dialog = function (info) {
      alert(info)
    }
    // 复写机制（“造轮子”）
    class MyJquery extends jQuery {
      constructor(selector) {
        super(selector)
      }
      // 扩展自己的方法
      addClass(className) {
        console.log('我是添加class')
      }
      // 等等
    }

    const $p = new jQuery('p')
    console.log($p.get(1))
    $p.each((elem) => {
      console.log(elem.nodeName)
    })
    $p.on('click', () => {
      alert('click')
    })

    $p.dialog('abc')
  </script>
</html>
```

3. class 的原型本质，怎么理解？

- 原型本质：

  - 原型和原型链的图示

  - 属性和方法的执行规则

[参考链接](https://www.jianshu.com/p/b1cd77511ea7)

### 作用域和闭包

#### 知识点

1. 作用域和自由变量

- **作用域**

  - 全局作用域

  - 函数作用域

  - 块级作用域（ES6 新增）

  ```javascript
  // ES6块级作用域
  if (true) {
    let x = 100
  }
  console.log(x) // 会报错
  ```

  ```javascript
  let a = 0
  function fn1() {
    let a1 = 100
    function fn2() {
      let a2 = 200
      function fn3() {
        let a3 = 300
        return a1 + a2 + a3
      }
      fn3()
    }
    fn2()
  }
  fn1()
  ```

- **自由变量**

  - 一个变量在当前作用域没有定义，但是被使用了

  - 向上级作用域，一层一层依次寻找，直到找到为止

  - 如果找到全局作用域都没有找到，则报错 `xxx is not defined`

2. 闭包(closure)

- 作用域应用的特殊情况，有两种表现

  - 函数作为参数被传递

  - 函数作为返回值被返回

- **所有的自由变量的查找，是在函数定义到地方，向上级作用域查找，不是在执行的地方**

```javascript
// 函数作为返回值
function create() {
  let a = 100
  return function () {
    console.log(a)
  }
}
let fn = create()
let a = 200
fn() // 100
// 函数作为参数
function print(fn) {
  let a = 20
  fn()
}
let a = 100
function fn() {
  console.log(a)
}
print(fn) // 100
```

3. this

> this 取什么值，是在函数执行时确认的，不是在函数定义的时候

- 作为普通函数调用

- 使用 call apply bind 被调用

- 作为对象方法被调用

- 在 class 方法中调用

- 箭头函数

```javascript
function fn1() {
  console.log(this)
}
fn1() // window
fn1().call({ x: 100 }) // { x:100 }
const fn2 = fn1.bind({ x: 200 })
fn2() // { x:200 }

const zhangSan = {
  name: '张三',
  sayHi() {
    // this 即当前对象
    console.log(this)
  },
  wait() {
    setTimeout(function () {
      // this === window
      console.log(this)
    })
  },
}
const liSi = {
  name: '李四',
  sayHi() {
    // this 即当前对象
    console.log(this)
  },
  wait() {
    // 箭头函数中的this取的是它的上一级的作用域的 this 值
    setTimeout(() => {
      // this 即当前对象
      console.log(this)
    })
  },
}

class People {
  constructor(name) {
    this.name = name
    this.age = 20
  }
  sayHi() {
    console.log(this)
  }
}
const people = new People('张三')
people.sayHi() // people 对象
```

#### 问题

1. this 的不同应用场景下，如何取值

- 作为普通函数调用：**指向 window**

- 使用 call apply bind 被调用: **指向传入绑定的值**

- 作为对象方法被调用：**指向对象本身**

- 在 class 方法中调用：**当前实例本身**

- 箭头函数：**上一级作用域的 this 值**

2. 手写 bind 函数

```javascript
Function.prototype.bind1 = function () {
  // 将参数解析为数组
  const args = Array.prototype.slice.call(arguments)
  // 获取 this（取出数组第一项，数组剩余的就是传递的参数）
  const t = args.shift()
  const self = this // 当前函数
  // 返回一个函数
  return function () {
    // 执行原函数，并返回结果
    return self.apply(t, args)
  }
}
```

3. 实际开发中闭包的应用场景，举例说明

- 隐藏数据
- 做一个简单的 cache 工具

```javascript
// 闭包隐藏数据，只提供 API
function createCache() {
  const data = {} // 闭包中的数据，被隐藏，不能被外界访问
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    },
  }
}
const c = createCache()
c.set('a', 100)
console.log(c.get('a'))
```

4. 创建 10 个 a 标签,点击的时候弹出对应的序号

```javascript
let i, a
for (i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br/>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
// 上述代码执行后，进行点击，弹出的始终是 10
// 优化后的代码:
let a
for (let i = 0; i < 10; i++) {
  // 因为这里使用let ,就产生了一个块级作用域
  a = document.createElement('a')
  a.innerHTML = i + '<br/>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
```

### 异步和单线程

#### 知识点

1. 单线程和异步

2. 应用场景

- 网络请求，如 ajax、图片加载

- 定时任务，如 setTimeout

```javascript
// ajax
console.log('start')
$.get('./data1.json', function (data1) {
  console.log(data1)
})
console.log('end')
// 图片加载
console.log('start')
let img = document.createElement('img')
img.onload = function () {
  console.log('loaded')
}
img.src = 'xxx.png'
console.log('end')
// 定时任务
// setTimeout
console.log(100)
setTimeout(function () {
  console.log(200)
}, 1000)
console.log(300)
// setInterval
console.log(100)
setInterval(function () {
  console.log(200)
}, 1000)
console.log(300)
```

3. callback hell 和 Promise

- callback hell

```javascript
// 获取第一份数据
$.get(url, (data1) => {
  console.log(data1)
  // 获取第二份数据
  $.get(url2, (data2) => {
    // 获取第三份数据
    $.get(url3, (data3) => {
      console.log(data3)
      // 还有可能获取更多的数据
    })
  })
})
```

- Promise

```javascript
function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'
getData(url1)
  .then((data1) => {
    console.log(data1)
    return getData(url2)
  })
  .then((data2) => {
    console.log(data2)
    return getData(url3)
  })
  .then((data3) => {
    console.log(data3)
  })
  .catch((err) => {
    console.log(err)
  })
```

4. JS 是单线程语言，只能同时做一件事

5. 浏览器和 node.js 已经支持 JS 启动**进程**，如 Web Worker

6. JS 和 DOM 渲染共用一个进程，因为 JS 可修改 DOM 结构

7. 遇到等待（网络请求，定时任务）不能卡住

8. 需要异步

9. 回调 callback 函数形式

10. 异步和同步

- 基于 JS 是单线程语言

- 异步不会阻塞指向代码

- 同步会阻塞代码执行

```javascript
// 异步
console.log(100)
setTimeout(function () {
  console.log(200)
}, 1000)
console.log(300)

// 同步
console.log(100)
alert(200)
console.log(300)
```

#### 问题

1. 同步和异步的区别

- 异步是基于 JS 是单线程语言

- 异步不会阻塞代码执行

- 同步会阻塞代码执行

2. 手写 Promise 加载一张图片

```javascript
const imgUrl = 'http://xxxx.xxx.com/xxx.png'
function loadImg(imgSrc) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('图片加载失败'))
    }
    img.src = imgSrc
  })
}
loadImg(imgUrl)
  .then((img) => {
    console.log(img.width)
    return img
  })
  .then((img) => {
    console.log(img.height)
  })
  .catch((err) => {
    console.log(err)
  })
```

3. 前端使用异步的场景有哪些

- 网络请求，如 ajax, 图片加载
- 定时任务，如 setTimeout

4. 场景题

```javascript
// setTimeout 笔试题
console.log(1)
setTimeout(function () {
  console.log(2)
}, 1000)
console.log(3)
setTimeout(function () {
  console.log(4)
}, 0)
console.log(5)
// 1, 3, 5, 4, 2
```

### 异步进阶

#### 知识点

1. event loop

- js 是单线程进行的

- 异步要基于回调来实现

- Event Loop 就是异步回调的实现原理

- JS 如何执行

  - 从前到后，一行一行执行

  - 如果某一行执行报错，则停止下面代码的执行

  - 先把同步代码执行完，再去执行异步

- 总结下 event loop 过程

  - 同步代码，一行一行放在 Call Stack 执行

  - 遇到异步，会先"记录"下来，等待时机（定时、网络请求等）

  - 时机到了，就移动到 Callback Queue

  - 如果 Call Stack 为空（即同步代码执行完毕）Event Loop 开始工作

  - 轮询查找 Callback Queue，如果有移动到 Call Stack 就执行

  - 然后继续轮询查找（永动机一样）

- DOM 事件和 Event Loop

  - JS 是单线程的

  - 异步（setTimeout, ajax 等）使用回调，基于 event loop

  - DOM 事件也适用回调，基于 Event Loop

```html
// dom 事件
<button id="btn1">提交</button>
<script>
  console.log('hi')
  $('#btn1').click(function () {
    console.log('button clicked')
  })
  console.log('Bye')
</script>
```

**相关阅读：**

[阮一峰：JavaScript 运行机制详解：再谈 Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)

2. promise 进阶

3. async/await

4. 异步的本质

- async/await 是消灭异步回调的终极武器

- JS 还是单线程，还得是有异步，还得是基于 event loop

- async/await 只是一个语法糖，但是这颗糖真香！

5. for ... of

- for...in(以及 forEach for) 是常规的同步遍历

- **for...of 常用于异步的遍历**

```javascript
function muti(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}
const nums = [1, 2, 3]
nums.forEach(async (i) => {
  const res = await muti(i)
  console.log(res)
})
// 1s 后结果全部出来，1, 4, 9
// 使用 for..of 的代码
;(async function () {
  for (let i of nums) {
    const res = await muti(i)
    console.log(res)
  }
})()
```

6. 微任务/宏任务

> 宏任务和微任务都是异步任务

- 宏任务一般是：包括整体代码 script，setTimeout，setInterval、I/O、UI render。

  - **DOM 渲染后触发**,如 SetTimeout

- 微任务主要是：Promise.then、Object.observe、MutationObserver。

  - **DOM 渲染前触发**，如 Promise

- 微任务执行时机比宏任务要早(先记住)

- Event Loop 和 DOM 渲染

  - JS 是单线程的，而且和 DOM 渲染共用一个线程

  - JS 执行的时候，得留一些时间供 DOM 渲染

- Event Loop（增加 DOM 渲染过程）

  - 1. Call Stack 空闲：每次 Call Stack 清空（即每次轮询结束），即同步任务执行完毕

  - 2. 执行当前的微任务

  - 3. 尝试 DOM 渲染：都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染

  - 4. 触发 Event Loop：然后再去触发下一次 Event Loop

- 从 Event Loop 解释，为什么微任务执行更早

  - 为什么？

    - 微任务是 ES6 语法规定的

    - 宏任务是浏览器规定的

- **相关阅读**:

[宏任务和微任务都是异步任务](https://juejin.cn/post/6880787856353132552#comment)

[深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678)

#### 面试题

1. 请描述 Event Loop(事件循环/事件轮询)的机制，可画图

2. 什么是宏任务和微任务，两者有什么区别

3. Promise 有哪三种状态，如何变化

- 三种状态：pending resolved rejected

- 状态的表现和变化:

  - pending => resolved 或者 pending => rejected

  - 变化不可逆

  - pending 状态,不会触发 then 和 catch

  - resolve 状态，会触发后续的 then 回调函数

  - reject 状态，会触发后续的 catch 回调函数

- then 和 catch 对状态的影响

  - then 正常返回 resolved, 里面有报错则返回 rejected

  - catch 正常返回 resolved, 里面有报错则返回 rejected

4. Promise then 和 catch 的连接的问题

```javascript
// 第一题
Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .catch(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
//  答案：1 3

// 第二题
Promise.resolve()
  .then(() => {
    console.log(1)
    throw new Error('error1')
  })
  .catch(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
//  答案：1 2 3

// 第三题
Promise.resolve()
  .then(() => {
    console.log(1)
    throw new Error('error1')
  })
  .catch(() => {
    console.log(2)
  })
  .catch(() => {
    // 注意：这里是catch
    console.log(3)
  })
//  答案：1 2
```

5. async/await 语法

- 异步回调 callback hell

- Promise then catch 链式调用，但也是基于回调函数

- async/await 是同步函数，彻底消灭回调函数

```javascript
// 第一题
async function fn() {
  return 100
}
;(async function () {
  const a = fn()
  console.log('a', a) // a Promise{<fulfilled>: 100}
  const b = await fn()
  console.log('b', b) // b 100 Promise {<fulfilled>: undefined}
})()
// 第二题
;(async function () {
  console.log('start') // start
  const a = await 100
  console.log('a', a) // a 100
  const b = await Promise.resolve(200)
  console.log('b', b) // b 200
  const c = await Promise.reject(300)
  console.log('c', c) //
  console.log('end')
})()
```

6. async/await 和 Promise 的关系

- async/await 是消灭异步回调的终极武器

- 但和 Promise 并不互斥

- 反而，两者相辅相成

  - 执行 async 函数，返回的是 Promise 对象

  - await 相当于 Promise 的 then

  - try...catch 可捕获异常，代替了 Promise 的 catch

7. Promise 和 setTimeout 的顺序问题

```javascript
console.log(100)
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)
// 100 400 300 200
```

8. 外加 async/await 的顺序问题

> await 后面的函数执行完毕时，await 会产生一个微任务(Promise.then 是微任务)。但是我们要注意这个微任务产生的时机，它是执行完 await 之后，直接跳出 async 函数，执行其他代码(此处就是协程的运作，A 暂停执行，控制权交给 B)。其他代码执行完毕后，再回到 async 函数去执行剩下的代码，然后把 await 后面的代码注册到微任务队列当中。

```javascript
// 据说是该题来自 头条
async function async1() {
  console.log('async1 start')
  await async2()
  await async3()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
async function async3() {
  console.log('async3')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
/**
 *  script start
 *  async1 start
 *  async2
 *
 *  promise1
 *  script end
 *  async3
 *
 *  promise2
 *  async1 end
 *  setTimeout
 */
```

[相关阅读:async/await 原理及执行顺序分析](https://juejin.cn/post/6844903988584775693)

### JS-WEB-API-DOM

- JS 基础知识，规定语法（ECMA 262 标准）
- JS WEB API 网页操作的 API（W3C 标准）
- 前者是后者的基础，两者结合才能真正实际应用

#### 前言

- Vue 和 React 框架应用广泛，封装了 DOM 操作
- 但是 DOM 操作一直都是前端工程师的基础、必备知识
- 只会 Vue 而不懂 DOM 操作的程序员，不会长久

#### 知识点

##### 1. DOM

> Document Object Model

**题目**

1. DOM 是那种数据结构

2. DOM 操作的常用 API

3. Attr 和 Props 的区别

4. 一次性插入多个 DOM 节点，考虑性能

**知识点**

1. DOM 本质

> 一句话解释 DOM: DOM 即我们所看到的网页，其在浏览器背后的文档（树状分支结构），涵盖了每一个节点（称之为对象），可以通过 JS 等语言去操作改变每一个节点，达到我们想要呈现的效果。
> DOM 实际上是以面向对象方式描述的文档模型

可以简单的理解为：从 HTML 语言或者文件解析出来的一棵树

参考文献

[DOM 的本质 和 方法](https://www.cnblogs.com/nosink/p/12361674.html)

2. DOM 节点操作

- 获取 DOM 节点

```javascript
const div1 = document.getElementById('div1') // 元素
const divList = document.getElementsByTagName('div') // 元素集合
console.log(divList.length)
console.log(divList[0])

const containerList = document.getElementsByClassName('container') // 集合
const pList = document.querySelectorAll('p') // 集合
```

- Attribute

```javascript
const pList = document.querySelectorAll('p')
const p0 = pList[0]
p0.getAttribute('data-name')
p0.setAttribute('data-name', 'imooc')
p0.getAttribute('style')
p0.setAttribute('style', 'font-size:30px;')
```

- Property

```javascript
const pList = document.querySelectorAll('p')
const p0 = pList[0]
p0.style.width = '100px'
console.log(p0.style.width)
p0.className = 'red'
console.log(p0.className)

console.log(p0.nodeName)
console.log(p0.nodeType)
```

- Attribute 和 Property 的区别

  - attribute（特性），是我们赋予某个事物的特质或对象。

  - property（属性），是早已存在的不需要外界赋予的特质。

  - property: 修改对象属性，不会体现在 html 结构中的

  - attribute: 修改 html 属性，会改变 html 结构

  - 两者都有可能引起 DOM 重新渲染

[相关阅读：](https://cloud.tencent.com/developer/article/1344995)

[attribute 和 property 区别](https://github.com/cy0707/Learn_JavaScript/issues/32)

3. DOM 结构操作

- 新增/插入节点

```javascript
const div1 = document.getElementById('div1')
// 添加新节点
const p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点，注意是移动
const p2 = document.getElementById('p2')
div1.appendChild(p2)
```

- 获取子节点列表，获取父元素

```javascript
// 获取子元素列表
const div1 = document.getElementById('div1')
const child = div1.childNodes

// 获取父元素
const div1 = document.getElementById('div1')
const parent = div1.parentNode
```

- 删除子节点

```javascript
const div1 = document.getElementById('div1')
const child = div1.childNodes
div1.removeChild(child[0])
```

4. DOM 性能

- DOM 操作非常“昂贵”，避免频繁的 DOM 操作

- 对 DOM 查询做缓存

```javascript
// 不缓存 DOM 查询结果
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // 每次循环，都会计算 length，导致频繁进行 DOM 的查询
}
// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for (let i = 0; i < length; i++) {
  // 缓存 length，只进行一次 DOM 查询
}
```

- 将频繁操作改为一次性操作

```javascript
// 将频繁操作改为一次性操作
const listNode = document.getElementById('list')
// 创建一个文档片段，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragment()
// 执行插入
for (let x = 0; x < 10; x++) {
  const li = document.createElement('li')
  li.innerHTML = 'List item ' + x
  frag.appendChild(li)
}
// 都完成之后，再插入到 DOM 树中
listNode.appendChild(frag)
```

**面试题**

1. DOM 是那种数据结构

- 树（DOM 树）

2. DOM 常用 API

- DOM 节点操作

- DOM 结构操作

- Attribute 和 Property 的操作

3. Attribute 和 Property 的区别

- property: 修改对象属性，不会体现在 html 结构中的

- attribute: 修改 html 属性，会改变 html 结构

- 两者都有可能引起 DOM 重新渲染（尽量使用 property）

4. 一次性插入多个节点，考虑性能

> 通过 fragment 来进行操作, 代码如上

##### 2. BOM

> BOM 操作：Browser Object Model

**题目**

1. 如何识别浏览器的类型
2. 分析拆解 url 各个部分

**知识点**

1. navigator

```javascript
// navigator
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

2. screen

```javascript
console.log(screen.width)
console.log(screen.height)
// 等等
```

3. location

```javascript
console.log(location.href)
console.log(location.protocol)
console.log(location.host)
console.log(location.search)
console.log(location.hash)
console.log(location.pathname)
// 等等
```

4. history

```javascript
history.back()
history.forward()
```

##### 3. 事件绑定

**知识点**

1. 事件绑定

```javascript
const btn = document.getElementById('btn1')
btn.addEventListener('click', (event) => {
  console.log('clicked')
})

// 通用事件绑定
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
}
const a = document.getElementById('link1')
bindEvent(a, 'click', (e) => {
  e.preventDefault() // 阻止默认行为
  // e.stopPropagation() // 阻止冒泡
  alert('clicked')
})
```

2. 事件冒泡

```javascript

```

3. 事件委托

**面试题**

1. 编写一个通用的事件监听函数

2. 描述时间冒泡的流程

3. 无限下拉的图片列表，如何监听每个图片的点击？

##### 4. Ajax

##### 5. 存储

#### 面试题
