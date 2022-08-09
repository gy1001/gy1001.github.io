# Vue 源码之 Mustache

## 前言：为什么要学习 Vue 源码

- 面试变得越来越难
  - 2016-1019 年，面试主要考察的是`Vue`的**使用**
    - `Vue` 组件由哪三部分组成
    - `Vue` 父子自检如何通信
    - `Vuex` 的作用是什么
    - ...
  - 2020-2021 年，面试越来越爱考察`Vue`的底层
    - `Vue`是怎么实现双向绑定的
    - `Vue` 的最下化更新过程是什么样的
    - `Vue` 如何实现指令系统的
    - ...
- 中高级前端、Leader 职位必会底层知识
  - 为企业"造轮子"，开发通用组件
  - 解决编程中遇见的问题
  - 解决效率问题

## 学习前提

1. 学习本课程的**知识储备前提**
   - 会写一些**JavaScript 常见算法，比如递归、二归数组遍历等**
   - 熟悉**ES6 的常用特性**，比如 let 、箭头函数等
   - 了解**webpack 和 webpack-dev-server**

## 1、什么是模板引擎

### 1.1 、定义

> 模板引擎是将数据要变为视图最优雅的解决方案

比如: 数据代码如下

```javascript
var jsonData = [
  { name: '小明', age: 12, sex: '男' },
  { name: '小红', age: 11, sex: '女' },
  { name: '小丽', age: 16, sex: '女' },
]
```

要转换为如下视图

```html
<ul>
  <li>
    <div>小明的基本信息</div>
    <div>
      <p>姓名：小明</p>
      <p>年龄：12</p>
      <p>性别：男</p>
    </div>
  </li>
  <li>
    <div>小红的基本信息</div>
    <div>
      <p>姓名：小红</p>
      <p>年龄：11</p>
      <p>性别：女</p>
    </div>
  </li>
  <li>
    <div>小丽的基本信息</div>
    <div>
      <p>姓名：小丽</p>
      <p>年龄：16</p>
      <p>性别：女</p>
    </div>
  </li>
</ul>
```

Vue 的解决方法：

```html
<li v-for="item in arr"></li>
// 这实际上就是一种模板引擎
```

### 1.2、历史上曾经出现的数据转变为视图的方法

- 纯 DOM 法

  - 非常笨拙，没有实战价值

  - 代码示例: 使用 纯 dOM 方法 遍历数据创建 DOM 标签，而且还要手动上树。

    ```javascript
    const data = {
      array: [
        { name: 'Alex', sex: '男', age: 18 },
        { name: 'Jack', sex: '男', age: 20 },
        { name: '青峰', sex: '男', age: 19 },
      ],
    }
    let ul = document.querySelector('.list')
    for (let i = 0; i < data.array.length; i++) {
      let oli = document.createElement('li')
      oli.innerText = data.array[i].name + '基本信息'
      let divhd = document.createElement('div')
      divhd.className = 'hd'
      let divbd = document.createElement('div')
      divbd.className = 'bd'
      let p1 = document.createElement('p')
      let p2 = document.createElement('p')
      let p3 = document.createElement('p')
      p1.innerText = '姓名：' + data.array[i].name
      p2.innerText = '性别：' + data.array[i].sex
      p3.innerText = '年龄：' + data.array[i].age
      divbd.appendChild(p1)
      divbd.appendChild(p2)
      divbd.appendChild(p3)
      oli.appendChild(divhd)
      oli.appendChild(divbd)
      ul.appendChild(oli)
    }
    ```

  - 效果图：

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7681731d30945b5a578235249f2aae7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="img" style="zoom:100%;float:left" />

- 数组 join 法

  - 曾几何时非常流行，是曾经的前端必会知识

  - 代码示例: 因为上面纯 DOM 的方法非常复杂，所以前人们想到了一个使用字符串代替结构化的 html 来代替 DOM 结构，用来创建 DOM 标签。

    ```javascript
    const list = document.querySelector('.list')
    const data = {
      array: [
        { name: 'Alex', sex: '男', age: 18 },
        { name: 'Jack', sex: '男', age: 20 },
        { name: '青峰', sex: '男', age: 19 },
      ],
    }
    // 遍历数据 以字符串的视角将html字符串添加到list中
    for (let i = 0; i < data.array.length; i++) {
      list.innerHTML += [
        '<li>',
        '    <div class="hd">' + data.array[i].name + '基本信息</div>',
        '    <div class="bd">',
        '        <p>姓名: ' + data.array[i].name + '</p>',
        '        <p>性别：' + data.array[i].sex + '</p>',
        '        <p>年龄：' + data.array[i].age + '</p>',
        '    </div>',
        '</li>',
      ].join('')
    }
    ```

  - 效果图同上

- ES6 的反引号法

  - ES6 中新增的 \`${a}\` 语法糖, 很好用

  - 代码示例

    ```javascript
    const list = document.querySelector('.list')
    const data = {
      array: [
        { name: 'Alex', sex: '男', age: 18 },
        { name: 'Jack', sex: '男', age: 20 },
        { name: '青峰', sex: '男', age: 19 },
      ],
    }
    for (let i = 0; i < data.array.length; i++) {
      list.innerHTML += `
            <li>
                <div class="hd">${data.array[i].name}的基本信息</div>
                <div class="bd">
                    <p>姓名：${data.array[i].name}</p>
                    <p>性别：${data.array[i].sex}</p>
                    <p>年龄：${data.array[i].age}</p>
                </div>
            </li>
        `
    }
    ```

  - 效果图同上

- 模板引擎

  - 解决数据变为视图的最优雅的方法

## 2、mustache 基本使用

### 2.1 基本概念

- [mustache 官方 git](https://github.com/mustache/mustache.github.com)
- mustache 是 “胡子”的意思，因为它的嵌入标记 `{{ }}` 非常像胡子
- 没错，`{{}} 的语法也被 vue 使用，这就是我们学习 mustache 的原因`
- `mustache`是最早的模板引擎库，它比 Vue 诞生的早多了，它的`底层实现机理在当时是非常有创造性的，轰动性的`，为后续模板引擎的发展提供了崭新的思路

### 2.2 基本使用

- 必须使用 mustache 库，可以在 `bootcdn.cn`上找到它

- mustache 的模板语法糖非常简单，比如前述案例的模板语法如下

  ```html
  <ul>
    {{#arr}}
    <li>
      <div>{{name}}的基本信息</div>
      <div>
        <p>姓名：{{name}}</p>
        <p>年龄：{{age}}</p>
        <p>性别：{{sex}}</p>
      </div>
    </li>
    {{/arr}}
  </ul>
  ```

- 语法：`Mustache.render(templateStr, data)`

#### 2.2.1 循环对象数组

> 在 mustache 中可以循环时候必须要 `{ { # } }` 开始符号和 `{ { / } }` 结束符号

- 示例代码

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>mustache</title>
    </head>
    <body>
      <ul>
        {{#arr}}
        <li>
          <div>{{name}}的基本信息</div>
          <div>
            <p>姓名：{{name}}</p>
            <p>年龄：{{age}}</p>
            <p>性别：{{sex}}</p>
          </div>
        </li>
        {{/arr}}
      </ul>
    </body>
    <script src="./mustache.js"></script>
    <script>
      var jsonData = {
        arr: [
          { name: '小明', age: 12, sex: '男' },
          { name: '小红', age: 11, sex: '女' },
          { name: '小丽', age: 16, sex: '女' },
        ],
      }
      var templateStr = `<ul>
          {{#arr}}
            <li>
              <div>{{name}}的基本信息</div>
              <div>
                <p>姓名：{{name}}</p>
                <p>年龄：{{age}}</p>
                <p>性别：{{sex}}</p>
              </div>
            </li>
          {{/arr}}
        </ul>`
      const html = mustache.render(templateStr, jsonData)
      console.log(html)
    </script>
  </html>
  
  // 输入结果如下
  <ul>
    <li>
      <div>小明的基本信息</div>
      <div>
        <p>姓名：小明</p>
        <p>年龄：12</p>
        <p>性别：男</p>
      </div>
    </li>
    <li>
      <div>小红的基本信息</div>
      <div>
        <p>姓名：小红</p>
        <p>年龄：11</p>
        <p>性别：女</p>
      </div>
    </li>
    <li>
      <div>小丽的基本信息</div>
      <div>
        <p>姓名：小丽</p>
        <p>年龄：16</p>
        <p>性别：女</p>
      </div>
    </li>
  </ul>
  ```

#### 2.2.2 循环嵌套数组

代码如下

```html
<div class="container"></div>
<script src="https://cdn.bootcdn.net/ajax/libs/mustache.js/4.0.1/mustache.js"></script>
<script>
  const container = document.querySelector('.container')
  const data = {
    array: [
      { name: 'Alex', hobies: ['打篮球', '羽毛球'] },
      { name: 'Jack', hobies: ['游泳', '唱歌'] },
      { name: '青峰', hobies: ['玩游戏', '踢足球'] },
    ],
  }
  var templateStr = `
      <ul>
        {{#array}}
          <li>
            {{name}}的爱好
            <ol>
              {{#hobies}}
                <li>{{.}}</li>
            {{/hobies}}    
            </ol>
          </li>
        {{/array}}
    </ul>`
  let dom = Mustache.render(templateStr, data)
  console.log(dom)
</script>

// 输出内容如下
<ul>
  <li>
    Alex的爱好
    <ol>
      <li>打篮球</li>
      <li>羽毛球</li>
    </ol>
  </li>
  <li>
    Jack的爱好
    <ol>
      <li>游泳</li>
      <li>唱歌</li>
    </ol>
  </li>
  <li>
    青峰的爱好
    <ol>
      <li>玩游戏</li>
      <li>踢足球</li>
    </ol>
  </li>
</ul>
```

#### 2.2.3 循环简单数组

代码如下

```html
<div class="container"></div>
<script src="https://cdn.bootcdn.net/ajax/libs/mustache.js/4.0.1/mustache.js"></script>
<script>
  const container = document.querySelector('.container')
  const data = {
    array: ['青峰', 'Alex', 'Jack'],
  }
  var templateStr = `
  		{{#array}}
      		<ul>
          		<li>
              	{{.}}
  						</li>    
  					</ul>
       {{/array}}
    `
  let dom = Mustache.render(templateStr, data)
  console.log(dom)
</script>

// 输出内容如下
<ul>
  <li>青峰</li>
</ul>
<ul>
  <li>Alex</li>
</ul>
<ul>
  <li>Jack</li>
</ul>
```

#### 2.2.4 不循环

```html
<script src="https://cdn.bootcdn.net/ajax/libs/mustache.js/4.0.1/mustache.js"></script>
<script>
  const container = document.querySelector('.container')
  const data = {
    name: '青峰',
    age: 18,
  }
  var templateStr = `<h1>姓名：{{name}}，年龄为：{{age}}</h1>`
  let dom = Mustache.render(templateStr, data)
  console.log(dom)
</script>

// 输出内容如下
<h1>姓名：青峰，年龄为：18</h1>
```

#### 2.2.5 布尔值

> 在 mustache 还可以使用条件判断渲染的功能，这一点跟我们使用的 vue 的 v-if 非常相似。但是需要注意：`不能写表达式`，这也验证了 mustache 是一种弱类型的库。

```html
<script src="https://cdn.bootcdn.net/ajax/libs/mustache.js/4.0.1/mustache.js"></script>
<script>
  const data = {
    isShow: true,
  }
  var templateStr = `
	{{#isShow}}
   	<h3>青峰</h3>
  {{/isShow}}
`
  let dom = Mustache.render(templateStr, data)

  console.log(dom)
</script>

// 输出内容如下
<h3>青峰</h3>
```

以上就是 mustache 的基本用法，我们发现，除了不循环，其他的用法需要使用 `{ { # } }`开始符号和 `{ { / } }` 结束符号。

## 3、mustache 的底层核心机理

经过上述示例的代码，我们的第一想法很可能就是说它的实现思路是利用了**正则表达式**。 实际上，**mustache 库不能用简单的正则表达式思路实现**

- 在较为简单的示例情况下，可以用正则表达式来实现
- 但是，一些复杂的情况下，正则表达式的思路就不行了，例如循环嵌套

### 3.1 replace 方法

在实现之前，我们先了解一下正则表达式中的 replace 方法是如何使用的

使用 replace 方法用来匹配正则表达式，参数解释如下

- 第一个参数：**要匹配的正则**
- 第二个参数：**可以是替换的字符串，也可以是一个函数**
- 第三个参数是函数的形式：第一个参数表示**匹配到的正则部分**，第二个参数表示**匹配到的字符**，第三个表示**匹配到的字符所在位置**，第四个表示**需要匹配的字符串**。一般来说第二个参数是我们想要的数据

代码示例

```javascript
const data1 = { name: '青峰', age: 18 }
var templateStr = `<h3>姓名：{{name}},年龄：{{age}}</h3>`
// 正则里面()表示捕获里面的字母数据
let dom1 = templateStr.replace(/\{\{(\w+)\}\}/g, (...args) => data1[args[1]])
console.log(dom1) // <h3>姓名：青峰,年龄：18</h3>
```

> 一个最简单的模板引擎的实现机理就写好了，利用的是正则表达式中的`replace（）方法`。`replace（）方法`的第二个参数可以是一个函数，这个函数提供捕获的东西的参数，再结合 data 对象，即可进行智能的替换。

### 3.2 底层 tokens 思想

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7aa2b534b3d4246bdb17f0d82e217c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="image.png" style="zoom:100%;float:left;" />

上述图片的基本流程：先将`模板字符串`编译为`tokens`, tokens 当做中间的过渡形态，然后`再将数据与tokens结合`，并`解析为DOM字符串`。

> tokens 是一个`JS嵌套的数组`，说白了，就是`模板字符串的JS表示`

它是 **抽象语法树**、**虚拟节点**等等的开山鼻祖

#### 3.2.1 简单的 tokens

示例代码：

```javascript
// 模板字符串
<h1>我买了一个{{thing}},好{{mood}}啊</h1>
// tokens
[
  ["text", "<h1>我买了个一个"],
  ["name", "thing"],
  ["text", "好"],
  ["name", "mood"]，
  ["text", "啊</h1>"]
]
```

#### 3.2.2 循环嵌套的 tokens

示例代码

```html
// 模板字符串
<ul>
  {{#array}}
  <li>
    {{name}}的爱好
    <ol>
      {{#hobbies}}
      <li>{{.}}</li>
      {{/hobbies}}
    </ol>
  </li>
  {{/array}}
</ul>

// 相应的tokens [ ['text', '
<ul>
  '], [ '#', 'array', [ ['text', '
  <li>
    '], ['name', 'name'], ['text', '的爱好
    <ol>
      '], [ '#', 'hobbies', [ ['text', '
      <li>'], ['name', '.'], ['text', '</li>
      '], ], ], ['text', '
    </ol>
  </li>
  '], ], ], ['text', '
</ul>
'], ]
```

> 当循环是双重时候，那么 tokens 会更深一层

实现 mustache 库底层重点要做两个事情

- 将模板字符串编译为 tokens 形式
- 将 tokens 结合数据，解析为 dom 字符串

## 4、带你手写实现 mustache 库

### 4.1 原理分析

mustache 的渲染步骤分为两步

```javascript
var tokens = parseTemplateToTokens(templateStr)
// 调用 renderTemplate 函数，让tokens 数组变成 dom 字符串
var domHtml = renderTemplate(tokens, data)
```

### 4.2 使用 webpack 和 webpack-dev-server 构建

- 模块化打包工具有 webpack（webpack-dev-server）、rollup、Parcel 等
- mustache **官方库使用 rollup 进行 模块化打包**，而我们今天使用 webpack（webpack-dev-server） 进行模块化打包，这是因为 webpack（webpack-dev-server） 能让我们更方便地在浏览器中(而不是 nodejs 环境中)实时调用程序，相比 nodejs 控制台，浏览器控制台更好用，比如能够点击展开数组的每项
- 生成库是 umd 的，这意味着它可以同时在 nodejs 环境中使用，也可以在浏览器环境中使用。实现 umd 不难，只需要一个 "通用头"即可

### 4.3 代码实现

#### 4.3.1 搭建基本框架

1. 创建一个文件夹 `vue-mustache`, 并进行项目初始化

   ```shell
   mkdir vue-mustache
   cd vue-mustache
   npm init -y
   ```

2. 安装相关依赖

   ```shell
   npm install webpack webpack-cli webpack-dev-server --save-dev
   npm install html-webpack-plugin --save
   ```

3. 创建 `webpack.config.js` 并写入如下内容

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const path = require('path')
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, './dist'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
   }
   ```

4. 新建`src/index.js`入口文件，写入内容如下

   ```javascript
   // 先进行一个简单的字符串处理，后续再进行复杂的循环模板处理

   import MyMustache from './my-mustache/index.js'

   var templateStr = `我买了一个{{thing}},好{{mood}}啊`
   var data = {
     thing: '华为手机',
     mood: '开心',
   }

   const result = MyMustache.render(templateStr, data)
   ```

5. 在`src` 目录下 新建`my-mustache/index.js`文件，内容如下

   ```javascript
   // 初步搭建文件结构
   import parseTemplateToTokens from './parseTemplateToTokens.js'
   import renderTemplate from './renderTemplate.js'

   const MyMustache = {
     render(templateStr, data) {
       var tokens = parseTemplateToTokens(templateStr)
       // 调用 renderTemplate 函数，让tokens 数组变成 dom 字符串
       var domHtml = renderTemplate(tokens, data)
       console.log(domHtml)
     },
   }
   export default MyMustache
   ```

6. 在`src/my-mustache`目录下新建`parseTemplateToTokens.js` 和 `renderTemplate.js`，内容如下

   ```javascript
   // parseTemplateToTokens.js
   const parseTemplateToTokens = (templateStr) => {
     console.log(templateStr)
   }
   
   export default parseTemplateToTokens
   
   // renderTemplate.js
   const renderTemplate = () => {}
   export default renderTemplate
   ```

#### 4.3.2 实现扫描 Scanner 类

##### 4.3.2.1 实现功能分析

书写一个扫描类，遍历字符串模板，里面有两个方法，一个是开始扫描，一个是扫描截止

1. 跳过某个字符的扫描方法： 接受一个参数，当剩余字符串是以这个 参数 为标准来处理更新当前指针和剩余字符串模板，比如 参数为 \{ \{ , 就需要把当前指针向后移动两位( \{ \{ 的长度 )，并且 剩余字符串 也要进行相应截取
2. 扫描截止方法：接受一个字符串参数，进行循环，当循环到 该参数字符串 时候，就停止，并且返回开始循环到停止循环时中间的字符串。 例如当第一次扫描到 \{ \{ 时，返回从开始位置到当前位置之间的字符串；接着扫描指针移动 \{ \{ 的位置，再次调用，遇到 \} \}，返回当前扫描指针到 \} \} 的字符，那就是 \{ \{ 和 \} \} 中间的变量
3. 再加一个方法：指针位置是否已经到最后了，返回值是一个布尔值

##### 4.3.2.2 代码实现

1. 新建`src/my-mustache/Scanner.js`文件，内容如下

   ```javascript
   class Scanner {
     constructor(templateStr) {
       // 指针
       this.pos = 0
       // 未遍历的字符串，一开始就是模板字符串原文
       this.tail = templateStr
       // 要遍历的字符串
       this.templateStr = templateStr
     }
   
     scan(tag) {
       if (this.tail.indexOf(tag) === 0) {
         // tag 有多长，比如 {{ 长度是2，就让指针后移动几位
         this.pos += tag.length
         this.tail = this.templateStr.substring(this.pos)
       }
     }
   
     // 让指针进行扫描 直到遇到指定内容结束，并且能够返回结束之前路过的文字
     scanUtil(stopTag) {
       // 记录一下当前开始的位置
       var POS_BACKUP = this.pos
       // 当 未遍历的字符串不是以 stopTag 开头的时候，说明没有遍历到相应位置，就继续遍历
       while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
         this.pos++
         // 改变剩余字符串,从当前指针这个字符开始到最后的全部字符
         this.tail = this.templateStr.substring(this.pos)
       }
       // 返回当前截取到的字符串
       return this.templateStr.substring(POS_BACKUP, this.pos)
     }
   
     // 指针是否到头，返回布尔值
     eos() {
       return this.pos >= this.templateStr.length
     }
   }
   
   export default Scanner
   ```

2. 修改`parseTemplateToToken.js`文件，如下

   ```javascript
   import Scanner from './Scanner'
   
   const parseTemplateToTokens = (templateStr) => {
     const scanner = new Scanner(templateStr)
     // 遍历当前字符串模板
     while (scanner.pos !== templateStr.length) {
       const str1 = scanner.scanUtil('{{')
       console.log(str1)
       scanner.scan('{{')
       const str2 = scanner.scanUtil('}}')
       console.log(str2)
       scanner.scan('}}')
     }
   }
   
   export default parseTemplateToTokens
   
   // 可以在控制台中看到截取的相应字符串
   ```

3. 上面代码可以看到初步实现了`scanner` 类的编写，下面进行 `parseTemplateToToken.js` 的完善，修改为如下内容

   ```javascript
   import Scanner from './Scanner'
   
   const parseTemplateToTokens = (templateStr) => {
     // 实例化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串，
     // 也就是这个扫描器是针对这个模板字符串工作的
     const scanner = new Scanner(templateStr)
     const tokens = []
     let words
     // 当这个 scanner 没有到头时候
     while (!scanner.eos()) {
       words = scanner.scanUtil('{{')
       if (words) {
         tokens.push(['text', words])
       }
       // 过 双大括号
       scanner.scan('{{')
       words = scanner.scanUtil('}}')
       if (words) {
         tokens.push(['name', words])
       }
       // 过 双大括号
       scanner.scan('}}')
     }
     console.log(tokens)
   }
   
   export default parseTemplateToTokens
   
   // 对于简单的一维模板字符串
   var templateStr = `我买了一个{{thing}},好{{mood}}啊`
   
   // 上述代码生成的 tokens 是
   [
     ['text', '我买了一个'],
     ['name', 'thing'],
     ['text', ',好'],
     ['name', 'mood'],
     ['text', '啊'],
   ]
   ```

4. 但是假如对于二维及以上模板字符串，上述代码就不适应了

   ```javascript
   // 多维的模板字符串
   var templateStr = `
     <div>
         <div class="mine">{{name}}</div>
         <ol id="me" style="color: red">
           {{#students}}
             <li>
               学生{{name}}的爱好是
               <ol>
                 {{#hobbies}}
                   <li>{{.}}</li>
                 {{/hobbies}}
               </ol>
             </li>
           {{/students}}
         </ol>
       </div>
     `
   // 生成的 tokens 为
   [
    		['text', '\n  <div>\n      <div class="mine">'],
      	['name', 'name'],
   		['text', '</div>\n      <ol id="me" style="color: red">\n        '],
   		['name', '#students'],
   		['text', '\n          <li>\n            学生'],
   		['name', 'name']
   		['text', '的爱好是\n            <ol>\n              '],
   		['name', '#hobbies'],
   		['text', '\n                <li>'],
   		['name', '.'],
   		['text', '</li>\n              '],
   		['name', '/hobbies'],
   		['text', '\n            </ol>\n          </li>\n        '],
   		['name', '/students'],
   		['text', '\n      </ol>\n    </div>\n  '],
   ]
   ```

5. 要对`parseTemplateToTokens.js` 遍历时候进行修改判断处理(处理开头为\#或者/的字符)，结果如下

   ```javascript
   import Scanner from './Scanner'
   
   const parseTemplateToTokens = (templateStr) => {
     // 实例化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串，
     // 也就是这个扫描器是针对这个模板字符串工作的
     const scanner = new Scanner(templateStr)
     const tokens = []
     let words
     // 当这个 scanner 没有到头时候
     while (!scanner.eos()) {
       words = scanner.scanUtil('{{')
       if (words) {
         tokens.push(['text', words])
       }
       // 过 双大括号
       scanner.scan('{{')
       words = scanner.scanUtil('}}')
       if (words) {
         // 这个words 存在首字符是 # 或者 / 或者都不是的情况,需要做特殊处理
         if (words.indexOf('#') === 0) {
           tokens.push(['#', words.slice(1)])
         } else if (words.indexOf('/') === 0) {
           tokens.push(['/', words.slice(1)])
         } else {
           tokens.push(['name', words])
         }
       }
       // 过 双大括号
       scanner.scan('}}')
     }
     console.log(tokens)
   }
   
   export default parseTemplateToTokens
   // 可以看到对于上述多维模板字符串的结果已经变为
   [
     ['text', '\n  <div>\n      <div class="mine">']
   	['name', 'name']
   	['text', '</div>\n      <ol id="me" style="color: red">\n        ']
   	['#', 'students']
   	['text', '\n          <li>\n            学生'],
   	['name', 'name'],
   	['text', '的爱好是\n            <ol>\n              '],
   	['#', 'hobbies'],
   	['text', '\n                <li>'],
   	['name', '.'],
   	['text', '</li>\n              '],
   	['/', 'hobbies'],
   	['text', '\n            </ol>\n          </li>\n        '],
   	['/', 'students'],
   	['text', '\n      </ol>\n    </div>\n  '],
   ]
   // 显然下一步只要把 # 和 / 之间的数据放到，对应的数组 第三个位置上即可（当做某个数组的一个子项）
   ```

6. 接下来：将零散的 `tokens` 嵌套起来

   > 上一节中最后我们提到需要对 结果 tokens进行在嵌套处理即可，这里我们新建一个 nestTokens.js 方法来进行处理

   ```javascript
   // parseTemplateToTokens.js 修改如下
   import nestTokens from './nestTokens'
   。。。
   
   const parseTemplateToTokens = function (templateStr){
   	....
     const tokens = []
     while(){
         // 中间遍历不变
     }
    	// 最终结果返回经过 nestTokens 处理过的结果
     return nestToken(tokens)
   }
   ```

   `nestTokens.js`内容修改如下：

   注意：下面代码 **最精妙** 的地方就是声明了一个 **收集器 collector 数组**，

   <font size="4" color=#FF000> 当遇到 # 的时候，收集器要指向当前项目的下标为2的一项并且设置为空数组，此后遍历的 token项是 被收集到收集器中，也就是在 token[2] 中变为子项，并且有一个数组 sections (模拟栈结构) push 当前token项；当遇到到 / 时候，对 sections 进行弹栈处理，并且进行判断处理，如果之前已经有过了 # (sections数组length还不为0)，那么收集器就指向sections栈顶的那一项的下标为2的数组，否则就代表是最外层 nestTokens </font>

   ```javascript
   // nestTokens.js 内容如下
   export default function nestTokens(tokens) {
     // 结果数组
     const nestTokens = []
     // 收集器，收集子元素或者孙元素等,天生指向 nestTokens 数组，引用类型值，所以指向的是同一个数组
     // 收集器的指向会发生变化。当遇见 # 时候，收集器会遇到 当前token 的下标为2的新数组，
     let collector = nestTokens
     // 栈结构，存放小tokens, 栈顶(靠近端口的，最新进入的)tokens数组中前操作的这个tokens小数组
     const sections = []
     for (let index = 0; index < tokens.length; index++) {
       const token = tokens[index]
       switch (token[0]) {
         case '#':
           // 收集器放入这个token
           collector.push(token)
           // 入栈
           sections.push(token)
           // 收集器要换人了, 给token 添加下标为2的项目，并让收集器指向它
           collector = token[2] = []
           break
         case '/':
           // 出栈 pop 会返回刚刚弹出的项
           sections.pop()
           // 改变收集器为栈结构队尾(队尾就是栈顶) 那项下标为2的数组
           collector =
             sections.length > 0 ? sections[sections.length - 1][2] : nestTokens
           break
         default:
           // 不管当前收集器是什么，都往收集器中 push 当前项
           collector.push(token)
           break
       }
     }
     return nestTokens
   }
   // 修改后再次查看结果，就可以看到正确的结果了
   ```

7. 接下来就是：将 `tokens` 注入数据，就是完成 `renderTemplate.js` 文件的内容；这里我们先使用简单的模板字符串进行处理，然后在替换为复杂的模板字符串

8. 先使用简单的模板字符串，如下

   * `index.js`  中的数据如下

     ```javascript
     import MyMustache from './my-mustache/index.js'
     
     var templateStr = `我买了一个{{thing}},好{{mood}}啊`
     var data = {
       thing: '华为手机',
       mood: '开心',
     }
     
     const result = MyMustache.render(templateStr, data)
     ```

   * `renderTemplate.js` 内容修改如下

     ```javascript
     const renderTemplate = (tokens, data) => {
       let htmlStr = ''
       for (let index = 0; index < tokens.length; index++) {
         const token = tokens[index]
         if (token[0] === 'text') {
           htmlStr += token[1]
         } else if (token[0] === 'name') {
           htmlStr += data[token[1]]
         }
       }
       return htmlStr
     }
     
     export default renderTemplate
     ```

   * 最终的字符串结果为

     ```html
     我买了一个华为手机,好开心啊
     ```

9. 现在切回复杂的多维字符串模板中，

   * `index.js`中的数据如下

     ```javascript
     import MyMustache from './my-mustache/index.js'
     
     var templateStr = `
       <div>
           <div class="mine">{{name}}</div>
           <ol id="me" style="color: red">
             {{#students}}
               <li>
                 学生{{name}}的爱好是
                 <ol>
                   {{#hobbies}}
                     <li>{{.}}</li>
                   {{/hobbies}}
                 </ol>
               </li>
             {{/students}}
           </ol>
         </div>
       `
     var data = {
       name: '我是三年二班',
       students: [
         { name: '小明', hobbies: ['游泳', '健身'] },
         { name: '小哄', hobbies: ['足球', '篮球', '羽毛球'] },
         { name: '小强', hobbies: ['吃饭', '睡觉', '打豆豆'] },
       ],
     }
     const result = MyMustache.render(templateStr, data)
     ```

   * `renderTemplate.js` 内容修改如下

     ```javascript
     /**
      * 处理数组，结合 renderTemplate 实现递归，
      * 注意：这里函数接受的参数是 token 而不是 tokens
      * token 就类似于一个简单的 ['#', "students", [ ...]] 中的 第 2 个索引的值
      *
      * @param {*} token  []
      * @param {*} array []
      */
     function parseArray(token, array) {
       let htmlStr = ''
       array.forEach((item) => {
         htmlStr += renderTemplate(token, { ...item, '.': item })
       })
       return htmlStr
     }
     
     const renderTemplate = (tokens, data) => {
       let htmlStr = ''
       for (let index = 0; index < tokens.length; index++) {
         const token = tokens[index]
         switch (token[0]) {
           case 'text':
             htmlStr += token[1]
             break
           case 'name':
             // 这里存在多个 . 的情况，暂不处理
             htmlStr += data[token[1]]
             break
           case '#':
             // ['#',"students", [...]]
             htmlStr += parseArray(token[2], data[token[1]])
             break
           default:
             break
         }
       }
       return htmlStr
     }
     
     export default renderTemplate
     ```

   * 输出的结果如下

     ```html
     <div>
       <div class="mine">我是三年二班</div>
       <ol id="me" style="color: red">
         <li>
           学生小明的爱好是
           <ol>
             <li>游泳</li>
             <li>健身</li>
           </ol>
         </li>
         <li>
           学生小哄的爱好是
           <ol>
             <li>足球</li>
             <li>篮球</li>
             <li>羽毛球</li>
           </ol>
         </li>
         <li>
           学生小强的爱好是
           <ol>
             <li>吃饭</li>
             <li>睡觉</li>
             <li>打豆豆</li>
           </ol>
         </li>
       </ol>
     </div>
     ```

10. 上面的代码没有处理字符串模板中存在多个`.`的情况，现在进行如下优化

    * `index.js`中的数据如下

      ```javascript
      import MyMustache from './my-mustache/index.js'
      
      var templateStr = `
        <div>
            <div class="mine">{{name}}</div>
            <div >总成绩为：{{a.b.c}}分</div>
            <ol id="me" style="color: red">
              {{#students}}
                <li>
                  学生{{name}}的爱好是
                  <ol>
                    {{#hobbies}}
                      <li>{{.}}</li>
                    {{/hobbies}}
                  </ol>
                </li>
              {{/students}}
            </ol>
          </div>
        `
      var data = {
        name: '我是三年二班',
        a: { b: { c: 1000 } }, // 增加一个多层次的对象数据
        students: [
          { name: '小明', hobbies: ['游泳', '健身'] },
          { name: '小哄', hobbies: ['足球', '篮球', '羽毛球'] },
          { name: '小强', hobbies: ['吃饭', '睡觉', '打豆豆'] },
        ],
      }
      const result = MyMustache.render(templateStr, data)
      ```

    * `renderTemplate.js` 内容修改如下

      ```javascript
      //  case :"name" 那一段代码要进行特殊处理
      ...
      case 'name:
          htmlStr += lookUp(token[1], data)
          break
      ...
      
      /**
       * 功能是可以在 dataObj 对象中，寻找用连续点符号的 keyName 属性
       * 比如 dataObj是 {a:{b:{c:100}}}
       * 那么 lookUp('a.b.c', dataObj) 结果就是100
       */
      function lookUp(keyName, data) {
        if (keyName !== '.' && keyName.indexOf('.') !== -1) {
          // 处理含有多个 . 的字符串
          let temp = data
          const keysArr = keyName.split('.')
          keysArr.forEach((key) => {
            temp = temp[key]
          })
          return temp
        }
        return data[keyName]
      }
      ```

11. 大体上完成了目前的代码的处理，如果想处理 类型为`text` 的 字符串 之间的存在空格处理，可以进行如下优化

    > 这里要进行特殊处里：标签内的空格不做处理，例如  \<div class="mine"\> 之类的

    ```javascript
    import nestTokens from './nestTokens'
    import Scanner from './Scanner'
    
    const parseTemplateToTokens = (templateStr) => {
      // 实例化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串，
      // 也就是这个扫描器是针对这个模板字符串工作的
      const scanner = new Scanner(templateStr)
      const tokens = []
      let words
      // 当这个 scanner 没有到头时候
      while (!scanner.eos()) {
        words = scanner.scanUtil('{{')
        if (words) {
          // tokens.push(['text', words])
          //--------修改为如下代码-----------
          let _word = ''
          let isInnerTag = false
          for (let index = 0; index < words.length; index++) {
            const word = words[index]
            if (word === '<') {
              isInnerTag = true
            } else if (word === '>') {
              isInnerTag = false
            }
            // 如果当前 element 是空格，只有在 isInnerTag 为 true 时候才能加
            if (/\s/.test(word)) {
              if (isInnerTag) {
                _word += word
              }
            } else {
              _word += word
            }
          }
          tokens.push(['text', _word])
          //-------------------
        }
        // 过 双大括号
        scanner.scan('{{')
        words = scanner.scanUtil('}}')
        if (words) {
          // 这个words 存在首字符是 # 或者 / 或者都不是的情况,需要做特殊处理
          if (words.indexOf('#') === 0) {
            tokens.push(['#', words.slice(1)])
          } else if (words.indexOf('/') === 0) {
            tokens.push(['/', words.slice(1)])
          } else {
            tokens.push(['name', words])
          }
        }
        // 过 双大括号
        scanner.scan('}}')
      }
      return nestTokens(tokens)
    }
    
    export default parseTemplateToTokens
    ```

    

