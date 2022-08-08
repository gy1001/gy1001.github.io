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

比如:  数据代码如下

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
<li v-for="item in arr"></li> // 这实际上就是一种模板引擎
```

### 1.2、历史上曾经出现的数据转变为视图的方法

* 纯 DOM 法

  * 非常笨拙，没有实战价值

  * 代码示例: 使用 纯dOM方法 遍历数据创建 DOM标签，而且还要手动上树。

    ```javascript
    const data = {
        array: [
            {name: 'Alex', sex: '男', age: 18},
            {name: 'Jack', sex: '男', age: 20},
            {name: '青峰', sex: '男', age: 19},
        ]
    }
    let ul = document.querySelector('.list')
    for(let i = 0; i < data.array.length; i++) {
        let oli = document.createElement('li')
        oli.innerText = data.array[i].name + '基本信息'
        let divhd = document.createElement('div')
        divhd.className = "hd"
        let divbd = document.createElement('div')
        divbd.className = "bd"
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

  * 效果图：

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7681731d30945b5a578235249f2aae7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="img" style="zoom:100%;float:left" />

* 数组 join 法

  * 曾几何时非常流行，是曾经的前端必会知识

  * 代码示例:  因为上面纯DOM的方法非常复杂，所以前人们想到了一个使用字符串代替结构化的html来代替DOM结构，用来创建DOM标签。

    ```javascript
    const list = document.querySelector('.list')     
    const data = {
        array: [
            {name: 'Alex', sex: '男', age: 18},
            {name: 'Jack', sex: '男', age: 20},
            {name: '青峰', sex: '男', age: 19},
        ]
    }
    // 遍历数据 以字符串的视角将html字符串添加到list中
    for(let i = 0; i < data.array.length; i++) {
        list.innerHTML += [
        '<li>',
        '    <div class="hd">' + data.array[i].name +'基本信息</div>',
        '    <div class="bd">',
        '        <p>姓名: '+ data.array[i].name + '</p>',
        '        <p>性别：'+ data.array[i].sex + '</p>',
        '        <p>年龄：'+ data.array[i].age + '</p>',
        '    </div>',
        '</li>'
        ].join('')    
    }
    ```

  * 效果图同上

* ES6的反引号法

  * ES6中新增的 \`${a}\` 语法糖, 很好用

  * 代码示例

    ```javascript
    const list = document.querySelector('.list')
    const data = {
        array: [
            {name: 'Alex', sex: '男', age: 18},
            {name: 'Jack', sex: '男', age: 20},
            {name: '青峰', sex: '男', age: 19},
        ]
    }
    for(let i = 0; i < data.array.length; i++) {
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

  * 效果图同上

* 模板引擎

  * 解决数据变为视图的最优雅的方法

## 2、mustache 基本使用

### 2.1 基本概念

* [mustache 官方git](https://github.com/mustache/mustache.github.com)
* mustache 是 “胡子”的意思，因为它的嵌入标记  `{{ }}` 非常像胡子
* 没错，`{{}} 的语法也被 vue 使用，这就是我们学习 mustache 的原因`
* `mustache`是最早的模板引擎库，它比Vue诞生的早多了，它的`底层实现机理在当时是非常有创造性的，轰动性的`，为后续模板引擎的发展提供了崭新的思路

### 2.2 基本使用

* 必须使用 mustache 库，可以在 `bootcdn.cn`上找到它

* mustache 的模板语法糖非常简单，比如前述案例的模板语法如下

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

* 语法：`Mustache.render(templateStr, data)`

#### 2.2.1 循环对象数组

>  在 mustache 中可以循环时候必须要 `有{{#}}` 开始符号和 `{{/}}` 结束符号。

* 示例代码

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
    array:['青峰', 'Alex', 'Jack']
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
  let dom = Mustache.render(templateStr,data)
	console.log(dom)
</script>

// 输出内容如下
<ul>
  <li> 青峰 </li>    
</ul>
<ul>
  <li> Alex </li>    
</ul>
<ul>
  <li> Jack </li>    
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

> 在mustache 还可以使用条件判断渲染的功能，这一点跟我们使用的 vue 的 v-if 非常相似。但是需要注意：`不能写表达式`，这也验证了 mustache 是一种弱类型的库。

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

以上就是mustache的基本用法，我们发现，除了不循环，其他的用法需要使用 `{{#}}` 开始符号和 `{{/}}` 结束符号。

## 3、mustache 的底层核心机理

经过上述示例的代码，我们的第一想法很可能就是说它的实现思路是利用了**正则表达式**。 实际上，**mustache库不能用简单的正则表达式思路实现**

* 在较为简单的示例情况下，可以用正则表达式来实现
* 但是，一些复杂的情况下，正则表达式的思路就不行了，例如循环嵌套

### 3.1 replace 方法

在实现之前，我们先了解一下正则表达式中的 replace 方法是如何使用的

使用 replace  方法用来匹配正则表达式，参数解释如下

* 第一个参数：**要匹配的正则**
* 第二个参数：**可以是替换的字符串，也可以是一个函数**
* 第三个参数是函数的形式：第一个参数表示**匹配到的正则部分**，第二个参数表示**匹配到的字符**，第三个表示**匹配到的字符所在位置**，第四个表示**需要匹配的字符串**。一般来说第二个参数是我们想要的数据

代码示例

```javascript
const data1 = { name: '青峰', age: 18 }
var templateStr = `<h3>姓名：{{name}},年龄：{{age}}</h3>`
// 正则里面()表示捕获里面的字母数据
let dom1 = templateStr.replace(/\{\{(\w+)\}\}/g, (...args) => data1[args[1]])
console.log(dom1)  // <h3>姓名：青峰,年龄：18</h3>
```

>  一个最简单的模板引擎的实现机理就写好了，利用的是正则表达式中的`replace（）方法`。`replace（）方法`的第二个参数可以是一个函数，这个函数提供捕获的东西的参数，再结合data对象，即可进行智能的替换。

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

// 相应的tokens
[
      ['text', '<ul>'],
      [
        '#',
        'array',
        [
          ['text', '<li>'],
          ['name', 'name'],
          ['text', '的爱好<ol>'],
          [
            '#',
            'hobbies',
            [
              ['text', '<li>'],
              ['name', '.'],
              ['text', '</li>'],
            ],
          ],
          ['text', '</ol></li>'],
        ],
      ],
      ['text', '</ul>'],
]
```

> 当循环是双重时候，那么 tokens 会更深一层

实现 mustache 库底层重点要做两个事情

* 将模板字符串编译为 tokens 形式
* 将 tokens 结合数据，解析为 dom 字符串

## 4、带你手写实现 mustache 库

### 4.1 使用 webpack 和 webpack-dev-server 构建

* 模块化打包工具有 webpack（webpack-dev-server）、rollup、Parcel 等
* mustache **官方库使用 rollup 进行 模块化打包**，而我们今天使用 webpack（webpack-dev-server） 进行模块化打包，这是因为 webpack（webpack-dev-server） 能让我们更方便地在浏览器中(而不是nodejs环境中)实时调用程序，相比 nodejs 控制台，浏览器控制台更好用，比如能够点击展开数组的每项
* 生成库是 umd 的，这意味着它可以同时在nodejs 环境中使用，也可以在浏览器环境中使用。实现 umd不难，只需要一个 "通用头"即可

### 4.2 代码实现

#### 4.2.1 初步搭建环境

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

#### 4.2.2
