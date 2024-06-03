# JS-Web-API-DOM
## 1. 从 JS 基础知识到 JS Web Api
* JS 基础知识，规定语法（ECMA 262 标准）
* JS Web Api, 网页操作的Api (W3C 标准)
* 前者是后者的基础，两者结合才能真正实际应用

### 1.1 JS 基础知识
* 变量的类型和计算
* 原型和原型链
* 作用域和闭包

### 1.2 JS Web Api
* DOM 操作相关
* BOM 操作相关
* 事件绑定
* Ajax
* 存储

## 2. DOM 
### 2.1 前言
* Vue 和 React 框架应用广泛，封装了 DOM 操作
* 但是 DOM 操作一直都是前端工程师的基础、必备知识
* 只会 VUE 而不动 DOM 操作的前端程序员，不会长久

### 2.2 DOM 操作
> DOM: Document Object Model

### 2.3 题目
1. DOM 是那种数据结构
2. DOM 操作常用的 API
3. attr 和 property 的区别
4. 一次性插入多个 DOM 节点，考虑性能

## 3. 知识点
### 3.1. DOM 本质

> 一句话解释DOM： DOM，即我们所看到的网页，其在浏览器背后的文档结构（树状分支结构），涵盖了每一个节点（称之为对象）。可以通过JS等语言去操控改变每一个节点，达到我们想要呈现的效果。
> 
> DOM实际上是以面向对象方式描述的文档模型。

```xml
<?xml version="1.0" encoding="UTF-8">
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Do not forget me this weekend!</body>
  <other>
    <a></a>
    <b></b>
  </other>
</note>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body>
    <div id="app">i am App</div>
</body>
</html>
```

### 3.2 DOM 节点操作
1. 获取 DOM 节点
```javascript
const div1 = document.getElementById("div1") // 元素
const divList = document.getElementsByTagName("div") // 集合
console.log(divList.length)
console.log(divList[0])

cosnt containerList = document.getElementsByClassName('.container')
// 集合
const pList = document.querySelectorAll("p") // 集合 
```

2. attribute  
> 修改的是标签的属性，修改后，会在标签属性内部体现出来

```javascript 
const pList = document.querySelectorAll("p")
const p = pList[0]
p.getAttribute("data-name")
p.setAttribute("data-name", "xiyouxidaxue")
p.getAttribute("style")
p.setAttribute("style", "font-size:30px;")
```

3. property
> 设置的是 js 变量的属性，并不会对标签造成影响

```javascript
const pList = document.querySelectorAll("p") // 集合 
const p1 = pList[0]
console.log(p1.style.width) // 获取样式
p1.style.width = "100px" // 修改样式
console.log(p1.className) // 获取 class
p1.className = "p1" // 修改 class

// 获取 nodeName 和 nodeType
console.log(p1.nodeName)
console.log(p1.nodeType)
```
4. Property 和 Attribute
* property 修改对象属性，不会体现在 html 结构中
* attribute 修改 html 属性，会改变 html 结构
* 两者都有可能引起 DOM 重新渲染

### 3.3 DOM 结构操作
1. 新增/插入节点

```javascript
const div1 = document.getElementById("div1")
// 添加新节点
const p1 = document.createElement("p")
p1.innerHTML = "this is p1"
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点，注意是移动
const p2 = document.getElementById("p2")
div1.appendChild(p2)
```

2. 获取子节点列表，获取父元素
```javascript 
const p1 = document.createElement("p")
// 获取父元素
console.log(p1.parentNode)
// 获取子元素列表
const div1 = document.getElementById("div1")
console.log(div1.childNodes) // 里面还有元素节点(nodeType:1)、文本节点(nodeType:3)、属性节点(nodeType:2)、注释节点(nodeType:8)

const div1ChildeNodesP = Arrray.prototype.slice.call(div1.childeNodes).filter(child => {
  return child.nodeType === 1
})
console.log(div1ChildeNodesP)
```

3. 删除子节点
```javascript
const div1 = document.getElementById("div1")
const child = div1.childNodes
div1.removeChild(child[0])
```

### 3.4 DOM 性能
* DOM 操作非常“昂贵”，避免频繁的 DOM 操作
* 对 DOM 查询做缓存
* 将频繁操作改为一次性操作

```javascript
// 不缓存 DOM 查询结果
for(let index = 0;index<document.getElementsByTagName("p").length;index++){
  // 每一次循环，都会计算 length, 频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for(let index = 0; index< length; index++){
  // 缓存 length， 只进行一次 DOM 查询
}
```
将频繁操作改为一次性操作
```javascript
const listNode = document.getElementById("list")
// 创建一个文档片段，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragement()

// 执行插入
for(let x = 0; x<10;x++){
  const li = document.createElement("li")
  li.innerHTML = "List Item " + x
  frag.appendChild(li)
}
// 都完成以后，再插入到 DOM 树中
listNode.appendChild(frag)
```

## 问题
### 1. DOM是那种数据结构
* 树（DOM树）

### 2. DOM 操作的常用 API
1. DOM 节点操作
2. DOM 结构操作
3. attribute 和 property 的操作


### 3. attr 和 property 的区别
* property 修改对象属性，不会体现在 html 结构中
* attribute 修改 html 属性，会改变 html 结构
* 两者都有可能引起 DOM 重新渲染

### 4. 一次性插入多个节点，考虑性能

[点击，代码往上翻](#_3-4-dom-性能)