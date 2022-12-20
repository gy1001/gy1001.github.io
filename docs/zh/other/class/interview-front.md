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
    function deepClone (obj) {
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
        city: '北京'
      },
      arr: ['a', 'b', 'c']
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
        constructor (name, number) {
          this.name = name
          this.number = number
        }
        sayHi () {
          console.log(`姓名${this.name},学号${this.number}`)
        }
        study () {
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
        constructor (name) {
          this.name = name
        }
        eat () {
          console.log(`${this.name} eat something`)
        }
      }
      // 子类
      class Student extends People {
        constructor (name, number) {
          super(name)
          this.number = number
        }
        sayHi () {
          console.log(`姓名${this.name},学号${this.number}`)
        }
      }
      // 子类
      class Teacher extends People {
        constructor (name, major) {
          super(name)
          this.major = major
        }
        teach () {
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
      constructor (selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for (let index = 0; index < length; index++) {
          this[index] = result[index]
        }
        this.length = length
      }
      get (index) {
        return this[index]
      }
      each (fn) {
        for (let index = 0; index < this.length; index++) {
          const el = this[index]
          fn(el)
        }
      }
      on (type, fn) {
        return this.each(elem => {
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
      constructor (selector) {
        super(selector)
      }
      // 扩展自己的方法
      addClass (className) {
        console.log('我是添加class')
      }
      // 等等
    }

    const $p = new jQuery('p')
    console.log($p.get(1))
    $p.each(elem => {
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
  function fn1 () {
    let a1 = 100
    function fn2 () {
      let a2 = 200
      function fn3 () {
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

- **所有的自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方**

```javascript
// 函数作为返回值
function create () {
  let a = 100
  return function () {
    console.log(a)
  }
}
let fn = create()
let a = 200
fn() // 100
// 函数作为参数
function print (fn) {
  let a = 20
  fn()
}
let a = 100
function fn () {
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
function fn1 () {
  console.log(this)
}
fn1() // window
fn1().call({ x: 100 }) // { x:100 }
const fn2 = fn1.bind({ x: 200 })
fn2() // { x:200 }

const zhangSan = {
  name: '张三',
  sayHi () {
    // this 即当前对象
    console.log(this)
  },
  wait () {
    setTimeout(function () {
      // this === window
      console.log(this)
    })
  }
}
const liSi = {
  name: '李四',
  sayHi () {
    // this 即当前对象
    console.log(this)
  },
  wait () {
    // 箭头函数中的this取的是它的上一级的作用域的 this 值
    setTimeout(() => {
      // this 即当前对象
      console.log(this)
    })
  }
}

class People {
  constructor (name) {
    this.name = name
    this.age = 20
  }
  sayHi () {
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
function createCache () {
  const data = {} // 闭包中的数据，被隐藏，不能被外界访问
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    }
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
$.get(url, data1 => {
  console.log(data1)
  // 获取第二份数据
  $.get(url2, data2 => {
    // 获取第三份数据
    $.get(url3, data3 => {
      console.log(data3)
      // 还有可能获取更多的数据
    })
  })
})
```

- Promise

```javascript
function getData (url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}
const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'
getData(url1)
  .then(data1 => {
    console.log(data1)
    return getData(url2)
  })
  .then(data2 => {
    console.log(data2)
    return getData(url3)
  })
  .then(data3 => {
    console.log(data3)
  })
  .catch(err => {
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
function loadImg (imgSrc) {
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
  .then(img => {
    console.log(img.width)
    return img
  })
  .then(img => {
    console.log(img.height)
  })
  .catch(err => {
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
function muti (num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}
const nums = [1, 2, 3]
nums.forEach(async i => {
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
async function fn () {
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
async function async1 () {
  console.log('async1 start')
  await async2()
  await async3()
  console.log('async1 end')
}
async function async2 () {
  console.log('async2')
}
async function async3 () {
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
btn.addEventListener('click', event => {
  console.log('clicked')
})

// 通用事件绑定
function bindEvent (elem, type, fn) {
  elem.addEventListener(type, fn)
}
const a = document.getElementById('link1')
bindEvent(a, 'click', e => {
  e.preventDefault() // 阻止默认行为
  // e.stopPropagation() // 阻止冒泡
  alert('clicked')
})
```

2. 事件冒泡

```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
  </div>
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
</body>
<script>
  const p1 = document.getElementById('p1')
  const body = document.body
  bindEvent(p1, 'click', function (e) {
    e.stopPropagation() // 注释这一行，来体会事件冒泡
    alert('激活')
  })
  bindEvent(body, 'click', function (e) {
    alert('取消')
  })
</script>
```

3. 事件委托（事件代理）

- 代码简洁

- 减少浏览器内存占用

- 但是，不要滥用

```html
<div id="div1">
  <p id="p1">p1</p>
  <p id="p2">p2</p>
  <p id="p3">p3</p>
  <p id="p4">p4</p>
  <button>点击增加一个p标签</button>
</div>

<script>
  const div1 = document.getElementById('#div1')
  div1.addEventListener('click', e => {
    const target = e.target
    if (e.nodeName === 'P') {
      alert(target.innerHTML)
    }
  })

  // 通用事件绑定
  function bindEvent (elem, type, fn) {
    elem.addEventListener(type, fn)
  }

  // 使用通用函数来进行绑定
  bindEvent(div1, 'click', e => {
    const target = e.target
    if (e.nodeName === 'P') {
      alert(target.innerHTML)
    }
  })
  // 代理绑定
  function bindAgentEvent (elem, type, selector, fn) {
    // 如果传递了三个参数
    if (fn === null || fn === undefined) {
      fn = selector
      selector = null
    }
    elem.addEventListener(type, event => {
      let target = event.target
      if (selector) {
        // 代理时
        if (target.matches(selector)) {
          fn.call(target, event)
        }
      } else {
        // 普通绑定
        fn.call(target, event)
      }
    })
  }
  // 使用代理绑定函数来进行处理
  bindAgentEvent(div1, 'click', p, function (e) {
    e.preventDefault()
    // 注意：这里用 this 不能用 箭头函数
    alert(this.innerHTML)
  })
</script>
```

**面试题**

1. 编写一个通用的事件监听函数

2. 描述时间冒泡的流程

- 基于 DOM 树形结构

- 事件会顺着触发元素往上冒泡

- 应用场景：代理

3. 无限下拉的图片列表，如何监听每个图片的点击？

- 事件代理

- 使用 e.target 获取触发元素

- 用 matches 来判断是否是触发元素

##### 4. Ajax

**知识点**

1. XMLHttpRequest

```javascript
// get 请求
const xhr = new XMLHttpRequest()
// 第三个参数：一个可选的布尔参数，表示是否异步执行操作，默认为 true。如果值为 false，send() 方法直到收到答复前不会返回。
xhr.open('GET', '/api', true)
xhr.onreadystatechange = function () {
  // 这里的异步执行，可参考之前 JS 基础中的异步模块
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('xhr.responseText', xhr.responseText)
    }
  }
}
xhr.send(null)

// post 请求
const xhr = new XMLHttpRequest()
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('xhr.responseText', xhr.responseText)
    }
  }
}
const postData = {
  userName: 'zhangsan',
  password: 'xxx'
}
xhr.send(JSON.stringify(postData))
```

2. 状态码

**`xhr.readyState`**

- 0：UNSENT，还没有调用 send 方法

- 1：OPENED，已调用 send 方法，正在发送请求

- 2：HEADERS_RECEIVED，send 方法执行完成，已经接收到全部响应内容

- 3：LOADING，正在解析响应内容

- 4：DONE，响应内容解析完成，可以在客户端调用

**`xhr.status`**

- 2xx：表示成功处理请求，如 200

- 3xx：需要重定向，浏览器直接跳转，如 301 302 304

- 4xx: 客户端请求错误，如 404 403 405

- 5xx：服务器端错误，如 500

3. 跨域：同源策略，跨域解决方案

**`什么是跨域（同源策略）`**

- ajax 请求时，浏览器要求当前网页和 server 必须同源(安全)

- 同源：协议、域名、端口，三者必须一致

- 前端：http://a.com:8080 , server: https://b.com/api/xxx

- 加载图片 css js 可以无视同源策略

  - img 可以用于统计打点，可用于第三方统计服务

  - link script 可以使用 CDN，CDN 一般都是外域

  - script 可以 实现 JSONP

  - 所有的跨域，都必须通过 server 端允许和配合

  - 未经 server 端允许就实现跨域，说明浏览器有漏洞，危险信号

  ```html
  <!-- 图片可能存在防盗链限制，需要在html 头部添加规则处理 -->
  <img src="跨域的图片地址" />
  <link href="跨域的css地址" />
  <script src="跨域的js地址"></script>
  ```

**`JSONP`**

- 访问 https://imooc.com/ 服务端一定返回一个 html 文件吗？

- 服务器可以任意动态拼接数据返回，只要符合 html 格式要求

- 同理于 `<script scr="https://imooc.com/getData.js"></script>`

- script 可以绕过跨域限制

- 服务端可以任意动态拼接参数数据返回

- 所以，script 就可以获得跨域的数据，只要服务端愿意返回

```html
<script>
  window.callback = function (data) {
    // 这里我们得到跨域信息
    console.log(data)
  }
</script>
<script src="http://imooc.com/getData.js"></script>
<!-- 上面的文件，将返回 callback({ x: 100, y: 200 }) -->
```

**`CORS（服务端支持）`**

> 服务端设置 http server

```javascript
// 第二个参数填写允许跨域的域名城，不建议直接写 *
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8011')
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
response.setHeader(
  'Access-Control-Allow-Methods',
  'PUT,POST,GET,DELETE,OPTIONS'
)
// 接收跨域的cookie
response.setHeader('Access-Control-Allow-Credentials', 'true')
```

**题目**

1. 手写一个简单的 ajax

```javascript
// 简易版
function ajax (url, successFn) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(xhr.responseText)
      }
    }
  }
  xhr.send(null)
}

// 带 promise 的 ajax
function ajaxPromise () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else if (xhr.status === 404) {
          reject(new Error('404 Not Found'))
        }
      }
    }
    xhr.send(null)
  })
}
const url = '/getUseInfo'
ajaxPromise(url)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.err(err)
  })
```

2. 跨域的常用实现方式

- JSONP

- CORS

##### 5. 存储

**知识点**

1. `Cookie`

- 本身用于浏览器和 server 通讯

- 被“借用”到本地存储来

- 使用 document.cookie = "xxxxxx" 来进行修改

- Cookie 的缺点

  - 存储大小，最大 4KB

  - http 请求时候需要发送到服务器，增加请求数据量

  - 只能用 document.cookie="xxxx" 来修改，太过简陋

2. `localStorage SessionStorage`

- HTML5 专门为存储而设计，最大可存 5M

- API 简单易用 setItem getItem

- 不会随着 http 请求发送出去

- **区别**

  - localStorage 数据会永久删除，除非代码或者手动删除

  - sessionStorage 数据只会存在于当前会话，浏览器关闭则清空

  - 一般用 localStorage 会更多一点

**题目**

1. 描述 cookie localStorage SessionStorage 区别

- 容量的区别

- API 易用性的区别

- 是否跟随 http 请求发送出去

## HTTP 面试题

- 前端工程师开发界面

- 需要调用后端的接口，提交/获取 数据 --- http 协议

- 要求事先掌握好 ajax

### http 状态码

- 状态码分类

  - 1xx: 服务器收到请求

  - 2xx: 请求成功，如 200

  - 3xx: 重定向，如 302

  - 4xx: 客户端错误，如 404

  - 5xx: 服务端错误，如 500

- 常见状态码

  - 200 成功

  - 301 永久重定向（配合 location,浏览器自动处理）

  - 302 临时重定向（配合 location,浏览器自动处理）

  - 304 资源未被修改

  - 404 资源未找到

  - 403 没有权限

  - 500 服务器错误

  - 504 网关超时

- 关于协议和规范

  - 就是一个约定

  - 要求大家都跟着执行

  - 不要违反规范，例如 IE 浏览器

### http Method

#### 传统的 methods

- get 获取服务器的数据

- post 向服务器提交数据

- 简单的网页操作，就这两个操作

#### 现在的 methods

- get 获取数据

- post 新建数据

- patch/put 更新数据

- delete 删除数据

### Restful API

- 一种新的 API 设计方法（早已推广使用）

- 传统 API 设计：把每个 URL 当做一个功能

- Restful API 设计：把每个 URL 当做一个唯一的资源

**如何设计成一个资源？？？**

- 尽量不用 url 参数

  - 传统 API 设计：/api/list?pageIndex=2: (这里可以把`？`前面`/api/list`看做一个函数方法，后面的是参数)

  - Restful API 设计: /api/list/2

- 用 method 表示操作类型

  - 传统 API 设计

    - post 请求：/api/create-blog

    - post 请求：/api/update-blog?i=100

    - get 请求： /api/get-blog?id=100

  - Restful API 设计

    - post 请求： /api/blog

    - patch 请求：/api/blog/100

    - get 请求：/api/blog/100

### http Headers

#### Request Headers

- Accept:浏览器可接收的数据格式 如：`text/css`，`application/json`，`text/html`

- Accept-Encoding: 浏览器可接收的压缩算法：如 `gzip`

- Accept-Language: 浏览器可接收的语言：如 `zh-CN`

- Connection: keep-alive 一次 TCP 链接可以重复使用

- cookie

- host

- User-Agent(简称 UA) 浏览器信息

- Content-type 发送数据的格式，如 application/json

#### Response Headers

- Content-type 返回数据的格式，如`application/json`

- Content-length 返回数据的大小，多少字节

- Content-Encoding 返回数据的压缩算法，如 `gzip`

- Set-Cookie

- 自定义 header

  `参考链接：https://axios-http.com/zh/docs/req_config`

  - headers: {'x-Request-With': 'XMLHttpRequest' }

- 缓存相关的 headers

  - Cache-Control Expires

  - Last-Modified If-Modified-Since

  - Etag If-None_match

#### http 缓存

1. 关于缓存的介绍

- 什么是缓存
  - 缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件
- 为什么需要缓存

  - 减少重复数据请求，避免通过网络再次加载资源，节省流量。

  - 降低服务器的压力，提升网站性能。
  - 加快客户端加载网页的速度， 提升用户体验。

- 哪些资源是可以被缓存？
  - 静态资源（js,css,img）

2. http 缓存策略(强制缓存 + 协商缓存)

- **强制缓存**

  - Cache-Control

    - 在 Response Headers 中，服务端来进行控制
    - 控制强制缓存的逻辑
    - 例如 Cache-Control: max-age=31536000 (单位是秒)
    - <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81MjQyMTI1LTA2YWMyNTFlMTUwOTk5NDkucG5n?x-oss-process=image/format,png" alt="img"  align="left" style="zoom:67%;" />
    - Cache-Control 的值可以分为以下集中
      - max-age: 设置缓存的最大过期时间
      - no-cache: 有本地缓存，不用强制缓存，向服务端请求
      - no-store: 不让服务端做缓存，完全不缓存
      - private: 发起请求的浏览器才能使用返回数据的缓存
      - public: 这个 HTTP 请求它返回的内容所经过的任何路径中，包括中间的一些 HTTP 代理服务器以及发出请求的客户端浏览器，都可以进行对返回内容的缓存操作

- 关于 Expires

  - 同在 Respinse Headers 中
  - 同为控制缓存过期
  - 已被 Cache-Control 代替

- **协商缓存**

  - 服务端缓存策略
  - 服务端潘达判断客户端资源，是否和服务端资源一样
  - 判断一致则返回 304，否则返回 200 和最新的资源
  - <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d9460548b8248a0aad44849eb494156~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" align="left" alt="image" style="zoom:67%;" />

  - 资源标识
    - 在 `Response Headers` 中，有两种
      - `Last-Modofied` 资源的最后修改时间
      - `Etag` 资源的唯一标识（一个字符串，类似人类的指纹）
  - `Last-Modified` 和 `Etag`

    - 会优先使用 `Etag`
    - `Last-Modified` 只能精确到秒级别
    - 如果资源被重复生成，但是内容不变，则 `Etag` 更精确

  - http 1.0

    - <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/250bdae9421f4a238f8300e8042a7ce7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="协商缓存之last-Modified" align="left" style="zoom:67%;" />

  - http 1.1
    - <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/099ff22bbcb141a5b48301a319c516a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="协商缓存之Etag" align="left" style="zoom:67%;" />

- **http 缓存流程图**

  <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81MjQyMTI1LWQ1YTUxYTI0ZjlkNjlkMGQucG5n?x-oss-process=image/format,png" alt=" http缓存流程" style="zoom:67%;" />

[http 面试必会的：强制缓存和协商缓存:评论有用](https://juejin.cn/post/6844903838768431118)

[http 缓存详解:多图](https://blog.csdn.net/express_yourself/article/details/107230954)

[浏览器的强缓存和协商缓存](https://segmentfault.com/a/1190000021661656)

[强烈推荐：一文彻底搞懂 http 缓存，图文解说+实战应用](https://juejin.cn/post/7051552782486077471)

3. 刷新操作方式，对缓存的影响

| 操作方式 | 场景                                                      | 强制缓存 | 协商缓存 |
| -------- | --------------------------------------------------------- | -------- | -------- |
| 正常操作 | 地址栏输入 url, 跳转链接，前进后退等                      | 有效     | 有效     |
| 手动刷新 | F5，点击刷新按钮，右击菜单刷新（Mac 快捷键：command + R） | 失效     | 有效     |
| 强制刷新 | ctrl + F5 （Mac 快捷键：shift + command + R）             | 失效     | 失效     |

**相关题目**

- http 常见状态码有哪些

- http 常见的 header 有哪些

- 什么是 RestFul API

- 描述一下 http 缓存机制（非常重要）

## 开发环境

> - 面试官想通过开发环境了解候选人的实际工作情况
> - 开发环境的工具，能体现工作产生的效率
> - 会以聊天的形式为主，不会问具体的问题

### Git

- 最常用的代码版本管理工具
- 大型项目需要多人协作开发，必须熟练使用 `git`
- Mac OS 自带 git 命令，windows 可去官网下载安装
- git 服务端常见的有 github、coding.net(码云) 等
- 大公司会搭建自己的内网 git 服务
- 常用的 git 命令
  - git status
  - git diff
  - git add .
  - git checkout xxx
  - git commit -m xxx
  - git push origin master
  - git pull origin master
  - git branch
  - git checkout -b xxx / git checkout xx
  - git merge xx
  - git stash
  - git stash pop

### 调试工具

- chrome 调试工具
  - Elements
  - Console
  - debugger
  - Network
  - Application

### 抓包

> - 移动端 H5 页面，查看页面请求，需要用抓包工具
> - windows 一般使用 fiddler
> - Mac OS 一般使用 charles

- 手机和电脑连接同一局域网
- 将手机代理到电脑上
- 手机浏览网页，即可抓包
- 查看网络请求
- 网址代理
- https 如何处理

### webpack babel

> - ES6 模块化，浏览器不支持
> - ES6 语法，浏览器并不完全支持
> - 压缩代码，整合代码，以让网页加载更快

### linux 常用命令

> - 公司的线上机器一般都是 Linux（参考阿里云）
> - 测试机也需要保持一致，用 Linux
> - 测试机或者线上机出了问题，本地又不能复现，需要去排查

## 运行环境

> - 运行环境即浏览器（serve 端有 nodejs）
> - 下载网页代码，渲染出页面，期间会执行若干 JS
> - 要保证代码在浏览器中：稳定且高效

### 网页加载过程

- 题目
  - 从输入 url 到渲染出页面的整个过程
    - 下载资源：各个资源类型、下载过程
    - 渲染页面：结合 html css JavaScript 图片等
  - window.onload 和 DOMContentLoaded 的区别
    - window.onload:`页面的全部资源加载完成才会执行，包括图片、视频`
    - DOMContentLoaded:`DOM渲染完即可执行，此时图片、视频可能还没有加载完`
- 知识点
  - 加载资源的形式
    - html 代码
    - 媒体文件，如图片、视频等
    - JavaScript Css
  - 加载资源的过程
    - DNS 解析：域名 => IP 地址
    - 浏览器根据 IP 地址向服务器发起 http 请求
    - 服务端处理 http 请求，并返回给浏览器
  - 渲染页面的过程
    - 根据 HTML 代码生成 DOM Tree
    - 根据 CSS 代码生成 CSSOM
    - 将 DOM Tree 和 CSSOM 整合行成 Render Tree
    - 根据 Render Tree 渲染页面
    - 遇到 script 则暂停渲染，优先加载并执行 JS 代码，完成再继续

### 性能优化（包括体验优化）

> - 是一个综合性问题，没有标准答案，但要求尽量全面
> - 某些细节问题可能会单独提问：手写防抖、节流
> - 只关注核心点，针对面试

#### 性能优化原则

- 多使用内存、缓存或其他方法
- 减少 CPU 计算量，减少网络加载耗时
- 适用于所有编程的性能优化-----空间换时间

#### 从何入手

- 让加载更快

  - 减少资源体积：压缩代码
  - 减少访问次数：合并代码，SSR 服务端渲染，缓存
    - 缓存
      - 静态资源加 `hash` 后缀，根据文件内容计算 `hash`
      - 文件内容不变，则 `hash` 不变，则 `url` 不变
      - `url` 和 `文件`不变，则会自动触发 `http` 缓存机制，返回`304`
    - SSR 服务端渲染
      - 服务端渲染：将网页和数据一起加载，一起渲染
      - 非 SSR(前后端分离)：先加载网页，再加载数据，再渲染数据
      - 早先的 JSP、ASP、PHP，现在的 Vue React SSR
  - 使用更快的网络：`CDN`

- 让渲染更快

  - CSS 放在 head，JS 放在 body 最下面
  - 尽早开始执行 JS，用 `DOMContentLoaded` 触发
    ```javascript
    window.addEventListener('load', function () {
      // 页面的全部资源加载完才会执行，包括图片、视频
    })
    document.addEventListener('DOMContentLoaded', function () {
      // DOM 渲染完即可执行，此时图片、视频可能还没有加载完
    })
    ```
  - 懒加载（图片懒加载，上滑加载更多）

    ```html
    <img id="img1" scr="preview.png" data-real-src="abc.png" />
    <script type="text/javascript">
      var img1 = document.getElementById('img1')
      img1.scr = img1.getAttribute('data-real-src')
    </script>
    ```

  - 对 DOM 查询进行缓存

    ```javascript
    // 不缓存 DOM 查询结果
    for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
      // 每次循环，都会计算 length, 频繁进行 DOM 查询
    }
    // 缓存  DOM 查询结果
    const pList = document.getElementsByTagName('p')
    const length = pList.length
    for (let i = 0; i < legnth; i++) {
      // 缓存 length, 只进行一次 DOM 查询
    }
    ```

  - 频繁 DOM 操作，合并到一起插入 DOM 结构

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

  - 节流 throttel 防抖 debounce

    - 防抖

      - 监听一个输入框的，文字变化后触发 `change` 事件
      - 直接用 keyup 事件，则会频繁触发 `change`事件
      - 防抖：用户输入结束或者暂停时，才会触发`change`事件
      - ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Document</title>
          </head>
          <body>
            <input type="text" id="input" />
          </body>
          <script>
            const input1 = document.getElementById('input')
            // 未使用防抖，会频繁触发
            input1.addEventListener('keyup', function (event) {
              console.log(event.target.value)
            })
          </script>
          <script>
            // 优化一下
            const input2 = document.getElementById('input')
            let timer = null
            input2.addEventListener('keyup', function () {
              if (timer) {
                clearTimeout(timer)
              }
              timer = setTimeout(() => {
                console.log(input2.value, '我是简单优化后的函数')
              }, 1000)
            })
          </script>

          <script>
            // 封装函数 debounce
            function debounce (fn, delay = 500) {
              // 这个 timer 是在 闭包 中的
              let timer = null

              return function () {
                if (timer) {
                  clearTimeout(timer)
                }
                timer = setTimeout(() => {
                  fn.apply(this, arguments)
                  timer = null
                }, delay)
              }
            }
            const debounceFunc = debounce(event => {
              //  如果想用 this， 这里不能用箭头函数
              console.log(event.target.value, '我是封装的debounce函数')
            }, 600)
            input2.addEventListener('keyup', debounceFunc)
          </script>
        </html>
        ```

    - 节流 throttle

      - 拖拽一个元素时，要随时拿到该元素被拖拽的位置
      - 直接用 drag 事件，则会频繁触发，很容易导致卡顿
      - 节流：无论拖拽速度多快，都会每隔 xxx ms 触发一次
      - ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>throttle 演示</title>
          </head>
          <style>
            #div1 {
              border: solid 1px #ccc;
              width: 200px;
              height: 100px;
            }
          </style>
          <body>
            <div id="div1" draggable="true">可拖拽</div>
          </body>
          <script>
            const div1 = document.getElementById('div1')
            div1.addEventListener('drag', function (e) {
              console.log(e.offsetX, e.offsetY)
            })
          </script>
          <script>
            // 优化一下
            let timer = null
            div1.addEventListener('drag', function (e) {
              if (timer) {
                return
              }
              timer = setTimeout(() => {
                console.log(e.offsetX, e.offsetY, '简单优化后的拖拽函数')
                timer = null
              }, 500)
            })
          </script>
          <script>
            function throttle (fn, delay) {
              let throttleTimer = null
              return function () {
                if (throttleTimer) {
                  return
                }
                throttleTimer = setTimeout(() => {
                  fn.apply(this, arguments)
                  throttleTimer = null
                }, delay)
              }
            }
            const throttleFunc = throttle(function (e) {
              console.log(
                e.offsetX,
                e.offsetY,
                '使用 throttle 优化后的拖拽函数'
              )
            }, 600)

            div1.addEventListener('drag', throttleFunc)
          </script>
        </html>
        ```

### 安全

> 问题：常见的 web 前端攻击公式有哪些？

#### XSS 跨站请求攻击

- 攻击方式
  - 一个博客网站，我发表一篇博客，其中嵌入 script 脚本
  - 脚本内容：获取 cookie（可能有客户的敏感信息），发送到我的服务器(服务器配合跨域)
  - 发布这篇博客，有人查看它，轻松收割访问者的 cookie
- XSS 预防
  - 替换特殊字符，如 `<` 变为`&lt;`, `>`变为`&gt;`
  - `<script>` 变为 `&lt;script&lg;` 直接显示，而不会作为脚本执行
  - 前端要替换，后端也要替换，都做总不会有错

#### XSRF

- XSRF 攻击 - 1
  - 你正在购物，看中了某个商品，商品 id 是 100
  - 付费接口是 xxx.com/pay?id=100 ，但是没有任何验证
  - 我是攻击者，我看中了一个商品，id 是 200
- XSRF 攻击 - 2
  - 我向你发送了一封电子邮件，邮件标题很吸引人
  - 但是邮件正文隐藏着 `<img src="xxx.com/pay?id=200" />`
  - 你一查看邮件，就帮我购买了 id 是 200 的商品
- XSRF 预防
  - 使用 post 接口
  - 增加验证，例如密码、短信验证码、指纹等

## 面试真题集

> - 搜集网上的高频 JS 初级面试题，不再是自己出题
> - 验证和复习之前学过的知识
> - 补充其他技能，如正则表达式、数组 API

### var 和 let const 的区别

- var 是 ES5 语法，let const 是 ES6 d 的语法，
- var 有变量提升，let const 没有
- var 和 let 是变量，可以修改，而 const 是常量，不可修改
- let const 有块级作用域，而 var 没有

### typeof 返回那些类型

- undefined string number boolean symbol
- object （注意：typeof null === "object"）
- function

### 列举强制类型转换和隐式类型转换

- 强制：parseInt、parseFloat、toString 等
- 隐式：if、逻辑运算、 ==、 +拼接字符串

### 手写深度比较，模拟 lodash isEqual

```javascript
// 实现如下效果
const obj1 = { a: 10, b: { x: 100, y: 200 } }
const obj2 = { a: 10, b: { x: 100, y: 200 } }
isEqual(obj1, obj2) === true

// 判断是否是对象或者数组
function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}
// 判断是否全相等
function isEqual (obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  if (obj1 === obj2) {
    return true
  }
  // 两个都是数组或者对象，且都不相等
  // 1. 先取出 obj1 和 obj2 的 keys 比较个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  // 2. 以 obj1 为基准，和 obj2 进行一次递归比较
  for (const key in obj1) {
    // 比较当前的 key 和 val
    const result = isEqual(obj1[key], obj2[key])
    if (!result) {
      return false
    }
  }
  return true
}
```

### split 和 join 的区别

```javascript
'1-2-3'
  .split('-') // [1,2,3]
  [(1, 2, 3)].join('-') // 1-2-3
```

### 数组的 pop push unshift shift 的区别

- 功能是什么？
- 返回值是什么？
- 是否会对原数组产生影响？

```javascript
// 数组 pop push shift unshift
const arr = [10, 20, 30, 40]
// pop
const arrPop = arr.pop()
console.log(arrPop, arr.toString()) // 40 , '10,20,30'
// push
const arrPush = arr.push(50) // 返回 length
console.log(arrPush, arr.toString()) // 4, '10,20,30,50'
// unshift
const arrUnshift = arr.unshift(5) // 返回 length
console.log(arrUnshift, arr.toString()) // 5, '5,10,20,30,50'
// shift
const arrShift = arr.shift()
console.log(arrShift, arr.toString()) // 5, '10,20,30,50'
```

### [扩展] 数组的 API 中，有哪些是纯函数

> 纯函数：不改变原数组（没有副作用），并且返回一个数组

```javascript
const arr = [10,20,30,40]

// concat
const arr1 = arr.concat([50, 60, 70])
console.log(arr) // [10,20,30,40]
console.log(arr1) // [10,30,30,40,50,60,70]

// map
const arr2 = arr.map((num) => num * 10)

// filter
const arr3 = arr.filter((num) => num > 25)

// slice
const arr4 = arr.slice()

// 非纯函数
push pop unshift shift
forEach
some evety
reduce
```

### 数组 slice 和 splice 的区别

- 功能区别（slice 是切片，splice 剪接）
- 参数和返回值
- 是否是纯函数

```javascript
// slice: 纯函数
const arr = [10, 20, 30, 40, 50]
const arr1 = arr.slice()
console.log(arr1) // [10, 20, 30, 40, 50]]
const arr2 = arr.slice(1, 4)
console.log(arr2) // [20, 30, 40]
const arr3 = arr.slice(2)
console.log(arr3) // [30, 40, 50]
const arr4 = arr.slice(-2)
console.log(arr4) // [40, 50]

// splice 非纯函数
// splice 可以删除、新增
const brr = [10, 20, 30, 40, 50]
const brr1 = brr.splice(1, 2, 'a', 'b', 'c', 'd')
const brr2 = brr.splice(1, 0, 'a', 'b', 'c')
const brr3 = brr.splice(1, 2)
console.log(brr1, brr.toString()) // [20, 30]  '10,a,b,c,d,40,50'
console.log(brr2, brr.toString()) // [],  '10,a,b,c,a,b,c,d,40,50'
console.log(brr3, brr.toString()) // ['a', 'b'] '10,c,a,b,c,d,40,50'
```

### [10,20,30].map(parseInt) 的返回结果是什么

- map 的参数和返回值
- parseInt 的参数和返回值

```javascript
const res = [10, 20, 30].map(parseInt)
console.log(res) // [10, NaN, NaN]
// 展开写如下
;[10, 20, 30].map((num, index) => {
  return parseInt(num, index)
})
```

### ajax 请求 get 和 post 的区别是什么

- get 一般用于查询操作，post 一般用于用户提交操作
- get 参数拼接在 url 上，post 放在请求体内（数据体积可更大）
- 安全性：post 易于防止 CSRF

### 函数 call 和 apply 的区别

```javascript
// 参数上的区别
fn.call(this, p1, p2, p3)
fn.apply(this, arguments)
```

### 事件代理(委托)是什么

```javascript
const p1 = document.getElementById('p1')
const bodyEl = document.body
bindEvent(p1, 'click', e => {
  e.stopPropagation() // 注释这一行，来体会事件冒泡
  console.log('激活')
})
bindEvent(bodyEl, 'click', e => {
  console.log('取消')
})
```

### 闭包是什么，有什么特性，有什么负面影响

- 回顾作用域和自由变量
- 回顾闭包应用场景：作为参数被传入，作为返回值被返回
- 回顾：自由变量的查找，要在函数定义的时候（不是执行的地方）
- 影响：
  - 变量会常驻内存，得不到释放。闭包不要乱用，使用不当，会造成内存泄漏

### 如何阻止事件冒泡和默认行为？

- event.stopPropagation()
- event.preventDefault()

### 查找、添加、删除、移动 DOM 节点的方法

- 基础中的基础，回顾之前即可

### 如何减少 DOM 操作

- 缓存 DOM 查询结果
- 多次 DOM 操作，合并到一次插入

### 解释 JSONP 的原理，为何他不是真正的 JSONP

- 浏览器的同源策略（服务端没有同源策略）和跨域
- 那些 html 标签可以绕过跨域
- JSONP 的原理

### Document load 和 ready 的区别

```javascript
window.addEventListener('load', function () {
  // 页面的全部资源加载完才会执行，包括图片、视频
})
// 其实就是ready
document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完即可执行，此时图片、视频可能还没有加载完
})
```

### === 和 == 的区别

- == 会尝试类型转换
- === 严格相等
- 哪些场景才用 ==

### 函数声明式和函数表达式的区别

- 函数声明式

  ```javascript
  function fn() { ... }
  ```

- 函数表达式

  ```javascript
  const fn = function() { ... }
  ```

- 函数声明式会在代码执行前`预加载`，而函数表达式则不会

### new Objcet() 和 Object.create() 的区别

- {} 等同于 new Object(), 原型是 Object.prototype
- Object.create(null) 没有原型
- Object.create({...}) 可以指定原型

```javascript
const objA = {
  a: 10,
  b: 20,
  sum () {
    return this.a + this.b
  }
}
const ObjB = new Object(objA)
const objC = new Object({
  a: 10,
  b: 20,
  sum () {
    return this.a + this.b
  }
})

// 以下两者都是有隐式原型的
console.log(objA)
console.log(objC)
console.log(objA === ObjB) // true
console.log(objA === objC) // false

// 使用 Object.create
const objD = Object.create(null)
const objE = new Object()
console.log(objD) // 是一个空对象，但是没有原型
console.log(objE) // 是一个空对象，但是有原型

const objF = Object.create({
  a: 10,
  b: 20,
  sum () {
    return this.a + this.b
  }
})
console.log(objF, 'objF') // 是一个空对象，但是 objF 的原型 是 里面的对象
// 如下代码
const objG = Object.create(objA)
console.log(objG.__proto__ === objA) // true
// 由上面可见，通过 Object.create 创建的返回值的函数的原型是 参数对象
objA.c = 10000
console.log(objG.c) // 10000
```

### 关于 this 的场景题

> this 只有在执行时候才能够确定

```javascript
const user = {
  count: 1,
  getCount: function () {
    return this.count
  }
}
console.log(user.getCount()) // 1 这里的 this 是 user
const func = user.getCount
console.log(func()) // undefined 这里的 this 是 window
```

### 关于作用域和自由变量的场景题目（1）

```javascript
let i
for(i = 1; i <= 3; i ++ ){
  setTimeout(function() {
    console.log(i)
  }, 0)
}
// 输出结果是什么？
4 4 4
```

### 判断字符串以字母开头，后面字母数字下划线，长度 6-30

- 学习正则表达式的规则
- 手写常见的正则表达式

```javascript
const reg = /^[a-zA-Z]\w{5-29}$/

// 常见的正则表达式
// 邮政编码
const reg1 = /\d{6}/

// 小写英文字母
const reg2 = /^[a-z]+$/

// 英文字母
const reg3 = /^[a-zA-Z]+$/

// 日期格式 2019-12-11
const reg4 = /^\d${4}-\d{1,2}-\d{1,2}$/

// 用户名
const reg5 = /^[a-zA-Z]\w{5,17}/

// 简单的 ip 地址 （这里没有限制 最大255）
const reg6 = /\d+\.\d+\.\d+\.\d+/
```

[推荐教程：正则表达式 30 分钟入门教程](https://deerchao.cn/tutorials/regex/regex.htm)

### 关于作用域和自由变量的场景题目（2）

```javascript
let a = 100
function test () {
  alert(a)
  a = 10
  alert(a)
}
test()
alert(a) // 100 10 10
```

### 手写字符换 trim 方法，保证浏览器兼容性

```javascript
String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
// 原型 this 正则表达式
```

### 如何获取多个数字中的最大值

```javascript
// 第一种
function max () {
  // arguments 是一个类数组
  const nums = Array.prototype.slice.call(arguments) // 变为数组
  let max = 0
  nums.forEach(n => {
    if (n > max) {
      max = n
    }
  })
  return max
}
max(10, 30, 20, 40)
// 第二种
Math.max(10, 30, 20, 40)
// 第三种
```

### 如何用 JS 实现继承

- class 继承
- prototype 继承

### 如何捕获 JS 程序中的异常

```javascript
// 第一种： try...catch 手动捕获
try {
  // todo
} catch (err) {
  console.log(err) // 手动捕获 异常
} finally {
}

// 第二种： 自动捕获
window.onerror = function (message, source, lineNom, colNom, error) {
  // 1、 对跨域的 js ，如 CDN, 不会有详细的报错信息
  // 2、 对于压缩的 js, 还要配合 sourceMap 反查到未压缩的 行、列
}
```

### 什么是 JSON

- JSON 是一种数据格式，本质是一段字符串
- JSON 格式和 JS 对象结构一致，对 JS 语言更加友好
- window.JSON 是一个全局对象：`JSON.parse` 和 `JSON.stringify`

### 获取当前页面中的 url 参数

- 传统方式，查找 location.search
- 新的 API, URLSearchParams

```javascript
// 传统方式: 使用正则，或者使用 拆分字符串变为数组类进行处理
function query (name) {
  const search = location.search.substr(1) // 删除第一个符号 ？
  // 比如 search 此刻类似如下结构 search: 'a=10&b=20&c=30'
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const result = search.match(reg)
  if (result === null) {
    return null
  }
  return result[2]
}
console.log("query('a')=", query('a'))

// 使用 URLSearchParams， 注意浏览器兼容性
function queryName (name) {
  const search = location.search
  const p = new URLSearchParams(search)
  return p.get(name)
}
console.log('此处用了 URLSearchParams, 注意浏览器兼容性')
console.log("query('a')=", queryName('a'))
```

### 将 url 参数解析为 JS 对象

```javascript
// 传统方式，分析 search
function queryToObj () {
  const result = {}
  const search = location.search.substr(1) // 删除第一个符号 ？
  search.split('&').forEach(paramStr => {
    const arr = paramStr.split('=')
    const key = arr[0]
    const value = arr[1]
    result[key] = value
  })
  return result
}

// 使用 URLSearchParams
function queryToObject () {
  const result = {}
  const pList = new URLSearchParams(location.search)
  pList.forEach((value, key) => {
    result[key] = value
  })
  return result
}
```

### 手写数组 flatten ,考虑多层级

```javascript
// flatten([[1,2], 3, [4,5,[6,7,[8,9,[10,11]]]]])
// [1,2,3,4,5,6,7,8,9,10,11]
function flatten (arr) {
  // 验证 arr 中，是否还有深层数组
  const isDeep = arr.some(item => item instanceof Array)
  if (!isDeep) {
    return arr // 已经是 拍平状态
  }
  const result = Array.prototype.concat.apply([], arr)
  return flatten(result) // 递归
}
const arr = [[1, 2], 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]]
const res = flatten(arr)
console.log(res)
```

### 数组去重

- 传统方式，遍历元素挨个比较、去重
- 使用 Set
- 考虑计算效率

```javascript
function unique (arr) {
  const result = []
  arr.forEach(item => {
    if (result.indexOf(item) < 0) {
      result.push(item)
    }
  })
  return result
}
// 使用 set ( 无序，不能重复)
function unique2 (arr) {
  return [...new Set(arr)]
}
```

### 手写深拷贝

注意注意： **Object.assign 不是深拷贝**

```javascript
function deepClone (obj = {}) {
  // 注意 null === null 是 false 此处判断 null 用的 ==
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (const key in obj) {
    // 保证key 不是 原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```

### 介绍一下 RAF： requestAnimateFrame

- 要想动画流畅，更新频率要 60 帧/s, 即 16.67 ms 更新一次视图
- setTimeout 要手动控制频率，而 RAF 是浏览器自动控制
- 后台标签或者 隐藏 iframe 中，RAF 会暂停，而 setTimeout 依然会执行

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RAF</title>
  </head>
  <style>
    #div1 {
      width: 100px;
      height: 50px;
      background-color: red;
    }
    #div2 {
      margin-top: 20px;
      width: 100px;
      height: 50px;
      background-color: red;
    }
  </style>
  <body>
    <div id="div1"></div>
    <div id="div2"></div>
  </body>
  <script>
    // 3s之内 把宽度从 100px 变为 640px，即增加 540px
    // 60帧/s 3s180帧，每次变化 3px
    // setTimeout
    let curWidth = 100
    let curWidth2 = 100
    const maxWidth = 600
    const div1 = document.getElementById('div1')
    const div2 = document.getElementById('div2')

    function animate () {
      curWidth += 3
      div1.style.width = curWidth + 'px'
      if (curWidth < maxWidth) {
        setTimeout(animate, 16.7) // 需要自己控制时间
      }
    }
    animate()

    // 使用 RAF
    function animate2 () {
      curWidth2 += 3
      div2.style.width = curWidth2 + 'px'
      if (curWidth2 < maxWidth) {
        window.requestAnimationFrame(animate2) // 时间浏览器会自动控制
      }
    }
    animate2()
  </script>
</html>
```

### 前端性能如何优化，一般从那几个方面考虑？

- 原则：多使用内存、缓存，减少计算，减少网络请求
- 方向：加载页面，页面渲染，页面操作流畅度
