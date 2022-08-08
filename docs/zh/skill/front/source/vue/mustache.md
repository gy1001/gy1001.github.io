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



## 3、mustache 的底层核心机理

## 4、带你手写实现 mustache 库

