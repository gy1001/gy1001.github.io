# 01：框架设计前瞻--框架设计的基本概念

## 01: 前言

在了解 Vue3 框架设计之前，我们需要做两件事情，而这两件事情也是本章的主要内容

1. 我们需要同步并明确一些词汇的概念，比如：`声明式`、`命令式`、`运行时`、`编译时`... 等。这些词汇在后面的框架设计中被经常涉及到
2. 我们需要了解一些关于**前端框架**的一些基础的改变，框架的设计原则，开发者开发体验原则，还有一些同学比较关注的 **vue3 中 ts 支持友好**的问题。以此来帮助大家解决一些固有的疑惑，从而揭开 vue 神秘的面纱
   let us begin

## 02: 编程范式之命令式编程

针对目前的前端开发规范，主要存在两种**编程范式**

1. 命令式编程
2. 声明式编程
   这两种**范式**一般是相对来说的

### 命令式

什么叫做命令式呢？

> 张三的妈妈让张三去买酱油，

那么张三会怎么做呢？

> 1. 张三拿起钱
> 2. 打开门
> 3. 下了楼
> 4. 到商店
> 5. 拿钱买酱油
> 6. 回到家

以上的流程详细的描述了，张三在买酱油的过程中，每一步都做了什么。那么这样一种：**详细描述做事过程**的方式就可以被叫做**命令式**

那么如果把这样的方式放在具体的代码之中，又应该怎么做呢？

我们来看这样的一个事情

> 在指定的 div 中展示 "hello world"
>
> 那么如果想要完成这样的事情，通过命令式的方式如何实现呢？
>
> 我们知道命令式的核心在于：**关注过程**
>
> 所以，以上事情通过命令式实现则可得出以下逻辑代码

```javascript
// 1.获取到指定的div
const divEl = document.querySelector('div')
// 2. 为该 div 设置 innerHTML 为 hello world
divEl.innerHTML = 'hello world'
```

该代码虽然只有两步，但是它清楚的描述了：**完成这件事情，所需要经历的过程**

那么假如我们所做的事情，变得更加复杂了，则整个过程也会显得更加复杂

比如：

> 为指定的 div 字元素的 div 子元素的 p 标签，展示变量 msg

那么通过命令式完成以上功能，则会得出如下逻辑与代码

```javascript
// 1. 获取到第一层的 div
const divEle = document.querySelector('div#app')
// 2. 获取它的子  div
const subDivEle = divEle.querySelector('div')
// 3. 获取第三层的 p
const subPEl = subDivEle.querySelector('p')
// 4. 定义变量 msg
const msg = 'hello world'
// 5. 设置 p 元素的 innerHTML
subPEl.innerHTML = msg
```

那么通过以上例子，相信大家可以对命令式的概念有了一个基础的认识

最后做一个总结，什么叫做命令式呢？

命令式是：**关注过程**的一种编程范式，他描述了完成一个功能的**详细逻辑与步骤**

## 03：编程范式之声明式编程

针对于声明式而言，大家其实都是非常熟悉的
比如以下代码，就是一个典型的 **声明式**

```javascript
<div> {{ msg }} </div>
```

这就是 Vue 中非常常见的双大括号语法。所以我们在写 Vue **模板语法**的时候，其实一直写的就是 **声明式**编程

那么声明式编程具体指的是什么意思呢？

还以刚才的例子为例

> 张三的妈妈让张三去买酱油

那么张三会怎么做呢？

> 1. 张三拿起钱
> 2. 打开门
> 3. 下了楼
> 4. 到商店
> 5. 拿钱买酱油
> 6. 回到家

在这个例子中，我们说：张三所做的事情就是 命令式， 那么张三妈妈做的事情就是**声明式**

在这样一个事情中，张三妈妈只是发布了一个声明，她并不关心张三如何去买的酱油，只关心最后的结果

所以说，所谓的声明式指的是：**不关注过程，只关注结果**的范式

同样，如果我们通过代码形式来表示的话，以下例子

> 为指定的 div 字元素的 div 子元素的 p 标签，展示变量 msg

将会得到以下代码

```html
<div id="app">
  <div>
    <p>{{ msg }}</p>
  </div>
</div>
```

再这样的代码中，我们完全不关心 msg 是怎么被渲染到 p 标签中的，我们所关心的只是：在 p 标签中，渲染指定 文本而已。

最后做一个总结，什么叫做声明式呢？

声明式是：**关注结果**的一种编程式，他 **并不关心**完成一个功能的**详细逻辑与步骤**(注意：这并不是意味着声明式不需要过程！声明式只是把过程进行了隐藏而已)

## 04：命令式 VS 声明式

那么这个章节我们来对比一下，是声明式好，还是命令式更好？

那么想要弄清楚这个问题，我们首先要先搞清楚，评价一种编程范式好还是不好的标准是什么？

通常情况下，我们评价一个编程范式好还是不好的标准 会从两个方面入手：

1. 性能
2. 可维护性

那么，接下来我们就通过这两个方面，来分析一下命令式和声明式

### 性能

性能一直是我们在进行项目开发时特别关注的方向，那么我们通常如何来表述一个功能的性能好坏呢？

我们来看一个例子

> 在指定的 div 中展示 "hello world"

那么针对于这个需求而言，最简单的代码就是

```javascript
div.innerText = 'hello world' // 耗时比作为 1 （PS: 耗时越少，性能越强）
```

然后我们来看声明式，声明式的代码为

```html
<div>{{ msg }}</div>
// 耗时为 1 + n, 将 msg 修改为 hello world
```

那么：**已知修改 text 最简单的方式就是 innerText**, 所以说无论声明式的代码是如何实现的文本切换，那么它的耗时一定是 > 1 的，我们把它比作 1+n

所以，由以上举例可以得到：**命令式的性能** > **声明式的性能**

### 可维护性

可维护性代表的维度非常多，但是通常情况下，所谓的可维护性指的是：对代码可以方便 **阅读、修改、删除、增加**

那么想要达到这个目的，说白了就是 **代码的逻辑要足够简单**，让人一看就懂

那么明确了这个概念，我们来看下声明式和命令式在同一段业务下的代码逻辑

> 命令式

```javascript
// 1. 获取到第一层的 div
const divEle = document.querySelector('div#app')
// 2. 获取它的子  div
const subDivEle = divEle.querySelector('div')
// 3. 获取第三层的 p
const subPEl = subDivEle.querySelector('p')
// 4. 定义变量 msg
const msg = 'hello world'
// 5. 设置 p 元素的 innerHTML
subPEl.innerHTML = msg
```

> 声明式

```html
<div id="app">
  <div>
    <p>{{ msg }}</p>
  </div>
</div>
```

对比以上代码而言，**声明式**代码更加利于阅读，所以也更加利于维护

所以，由以上举例子可知，**命令式的可维护性** < **声明式的可维护性**

### 总结：

由以上分析可知两点内容：

1. **命令式的性能** > **声明式的性能**
2. **命令式的可维护性** < **声明式的可维护性**

那么双方各有优劣，我们在日常开发中应该使用那种范式呢？

想要明白这点，我们还需要学习更多的知识

## 05：企业应用的开发与设计原则

企业引用的设计原则，想要描述起来比较复杂，为什么呢？

因为对于 **不同的企业类型**(大厂、中小长、人员外包、项目外包),不同的项目类型(前台、后台、中台)来说，对应的企业应用设计原则上可能会存在一些差异

所以我们这里所做的描述，会抛弃一些细微的差异，仅仅抓住核心的重点来进行阐述

无论什么类型的企业，也无论他们在开发什么类型的项目，那么最关注的点无非就是两个

1. 项目成本
2. 开发体验

### 项目成本

项目成本非常好理解，他决定了一个公司完成 ”这件事“所付出的代价，从而直接决定了这个项目是否可以盈利（大厂的烧钱项目除外）

那么既然项目成本如此重要，大家可以思考一下，决定项目成本的又是什么

---

没错，就是你的**开发周期**

开发周期越长，所付出的人员成本越高，从而导致项目成本变得越高

通过前面的分析我们可知，声明式的开发范式在**可维护性**上，是**大于**命令式的。

而可维护性从一定程度上就决定了，它会使项目的：**开发周期变短**、**升级变得更容易** 从而大量节约开发成本

所以这就是为什么 Vue 会变得越来越受欢迎的原因

### 开发体验

决定开发体验的核心要素，主要就是在开发时和阅读时的难度，这个被叫做：**心智负担**

心智负担可以作为衡量开发难易度的一个标准，心智负担高则证明开发的难度较高，心智负担低则表示开发的难度较低，开发更加舒服

那么根据我们之前所说，声明式的开发难度明显低于命令式的开发难度

所以，对于开发体验而言，声明式的开发体验更好，也就是 **心智负担更低**

### 总结

综合本小节所描述的内容，在企业级项目开发中，**声明式明显优于命令式**

但是有人可能会说：“你说的是不是太片面了？命令式一无是处吗？” “命令式在性能上不是优于声明式吗？，项目开发者不考虑性能吗？”

当然不是，如果大家也有疑惑，请继续往下看

## 06：为什么说框架的设计过程其实是一个不断取舍的过程

Vue 作者尤大 再一次演讲中说到：**框架的设计过程其实是一个不断取舍的过程**

这句话代表什么意思呢？

想要搞明白这个，那么再来明确一下之前说过的概念：

1. 命令式的性能 > 声明式的性能
2. 命令式的可维护性 < 声明式的可维护性
3. 声明式的框架本质上是由命令式的代码来实现的
4. 企业项目开发时，大多使用声明式框架

当我们明确好了这样的一个问题之后，那么我们接下来思考一个问题：**框架的开发与设计原则是什么呢？**

我们知道对于 Vue 而言，当我们使用它的是通过 **声明式**的方式进行使用，但是对于 Vue 内部而言，是通过 **命令式** 来进行的实现

所以我们可以理解为：**Vue 封装了命令式的逻辑，而对外暴露了声明式的接口**

那么，既然如此，我们明知 **命令式的性能** > **声明式的性能**, 那么 Vue 为什么还要选择声明式的方案呢？

其实原因非常的简单，那就是因为：**命令式的可维护性** < **声明式的可维护性**

以下面这个例子为例

> 为指定的 div 字元素的 div 子元素的 p 标签，展示变量 msg

对于开发者而言，不需要关注实现过程，只需要关注最终的结果即可

而对于 Vue 而言，他所需要做的就是:封装命令式逻辑，同时**尽可能的减少性能的损耗!**它需要再 **性能**与 **可维护性**之间找到一个平衡点，从而找到一个**可维护性更好，性能相对更优**的一个点

所以，对于 Vue 而言，它的设计原则就是：**在保证可维护性的基础上，尽可能的减少性能的损耗**

那么回到标题，为什么说：为什么说框架的设计过程其实是一个不断取舍的过程

答案就呼之欲出了，因为：

> 我们需要在可维护性和性能之间，找到一个平衡点，在保证可维护性的基础上，尽可能的减少性能的损耗
>
> 所以框架的设计其实是一个不断在 **可维护性和性能** 之间进行取舍的过程

## 07: .vue 中的 html 是真实的 html 吗

本小节思考一个问题：**在.vue 文件中的 template 中写入的 html 是真实的 html 标签节点吗？**

---

答案是：不是的

原因非常简单，如果我们写入的事真实的 html 节点，那么对于其中的 v-if v-bind keep-alive 这些东西，浏览器明显是不认识的，所以这些东西理应无法解析

但是现实中这些指令或者组件被正确解析了，所以 **vue 一定在中间做了什么**，让假的 html 标签节点 被渲染成了 真实的 html 标签节点

那么，Vue 在中间做了什么事情呢？

简单来说可以分为两件事（排序按照执行顺序）:

1. 编译时：`compiler`
2. 运行时：`runtime`

这两个东西对于大家而言，可能比较陌生，但是在 [Vue 官网](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#runtime-vs-compile-time-reactivity)中就提到了这几个概念

这些概念一共有三个，如果我们想要学习 vue 的框架设计，那么必须要了解它们，它们分别是

1. 运行时：`runtime`
2. 编译时：`compiler`
3. 运行时 + `编译时：runtime + compiler`

## 08: 什么是运行时

在 vue3 的源代码中存在一个 runtime-core 文件夹，该文件夹内存放的就是 运行时 的核心代码逻辑

runtime-core 中对外暴露一个函数，叫做 渲染函数 render

我们可以通过 [render](https://cn.vuejs.org/api/options-rendering.html#render) 代替 template 来完成 DOM 的渲染

> 有些同学可能看不懂当前代码是什么意思，没有关系，这不重要，后续我们会详细去讲

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script>
    const { render, h } = window.Vue
    // 生成 vnode
    const vnode = h('div', { class: 'test' }, 'hello render')
    // 拿到 承载的容器
    const container = document.querySelector('#app')
    render(vnode, container)
  </script>
</html>
```

我们知道，在 Vue 的项目中，我们可以通过 template 渲染 DOM 节点，如下

```vue
<template>
  <div class="test">hello render</div>
</template>
```

但是对于 render 的例子而言，我们并没有使用 template，而是通过一个名字叫做 render 的函数，返回了一个不知道是什么的东西，为什么也可以渲染出 DOM 呢？

带着这样的问题，我们来看

我们知道在上面的代码中，存在一个核心函数：渲染函数 render，这个 render 在这里到底做了什么事情呢？

我们通过一段代码示例来看下

> 假如有一天你们领导跟你说：我希望你根据以下数据
> `{ type: 'div', props: { class: 'test' },children: 'hello render' }`
>
> 渲染出来这样一个 div: `<div class="test">hello render</div>`

那么针对这样的一个需求你会如何进行实现呢？大家可以在这里先思考一下，

```javascript
const VNode = {
  type: 'div',
  props: {
    class: 'test',
  },
  children: 'hello render',
}
// 创建 render 函数
function render(vnode) {
  // 根据type 生成 element
  const ele = document.createElement(vnode.type)
  // 把 props 中的 class 赋值给 ele 的 className
  ele.className = vnode.props.class
  // 把 children 赋值给 ele 的 innerText
  ele.innerText = vnode.children
  // 把 ele 作为子节点插入 body 中
  document.body.appendChild(ele)
}
render(VNode)
```

再这样一个代码中，我们成功的通过一个 render 函数渲染出了对应的 DOM, 和前面的 render 示例类似，它们都是渲染了一个 vnode, 你觉得这样的代码真是 妙极了

> 但是你的领导用了一段时间你的 render 之后，却说：天天这样写太麻烦了，每次都得写一个复杂的 vnode ,能不能直接让我写**HTML 标签结构的方式**，你来进行渲染呢
>
> 你想了想之后，说：如果是这样的话，那就不是以上 运行时的代码可以解决的

没错，我们刚刚所编写的这样一个"框架"，就是**运行时**的代码框架

那么最后，我们做一个总结：**运行时可以利用 render 把 vnode 渲染成真是的 dom 节点**

## 09: 什么是编译时

在上一节中，我们明确了，如果只靠**运行时**,那么是没有办法通过 **HTML 标签结构的方式**来进行渲染的

那么想要实现这一点，我们就需要借助另外一个东西，就是 **编译时**

VUe 中的编译时，更准确的说法应该是 **编译器**的意思，它的代码主要在于 `compiler-core`模块下
我们来看如下代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script>
    const { compiler, createApp } = window.Vue
    const html = `
      <div class="test">hello compiler</div>
    `
    // 利用 compile 函数，生成 render 函数
    const renderFn = compiler(html)
    // 创建实例
    const app = createApp({
      // 利用 render 函数进行渲染
      render: renderFn,
    })
    // 挂载
    app.mount('#app')
  </script>
</html>
```

对于编译器而言，它的主要作用就是：**把 template 中的 html 编译成 render 函数**。然后再利用 **运行时** 通过 render 挂载对应的 DOM

最后，我们做一个总结：**编译时可以把 html 的节点，编译成 render 函数**

## 10: 运行时 + 编译时

前面两小节我们分别已经了解了 **运行时 和 编译时**, 同时我们也知道了:**vue 是一个运行时 + 编译时的框架**

> vue 通过 compiler 解析 html 模板，生成 render 函数，然后通过 runtime 解析成 render, 从而挂载真实 dom

那么看到这里有些童鞋就会有疑惑了，既然 **compiler 可以直接解析 html 模板**，那么为什么还要生成 render 函数，然后再去渲染呢？为什么不直接利用 compiler 进行渲染呢？

即：**为什么 vue 要设计为一个 运行时 + 编译时 的框架呢？**

那么想要弄清楚这个问题，我们就需要知道 **dom 渲染是如何进行的**

对于 dom 而言，可以被分为两个部分

1. 初次渲染，我们可以把它叫做 **挂载**
2. 更新渲染，我们可以把他叫做 **打补丁**

### 初次渲染

那么什么是初次渲染呢？

当初始 div 的 innerHTML 为空时，

```html
<div id="app"></div>
```

我们在该 div 中渲染如下节点

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

那么这样的一次渲染，就是**初识渲染**，在这样的一个渲染中，我们会生成一个 `ul` 标签，同时生成 三个 `li` 标签，并且把他们挂载到 `div` 中

### 更新渲染

如果此时 ul 标签内部发生了变化

```html
<ul>
  <li>3</li>
  <li>2</li>
  <li>1</li>
</ul>
```

`li-3`上升到了第一位，那么此时大家可以想一下，我们期望浏览器如何来更新这个渲染呢？

浏览器更新此次渲染无非有两种方式

1. 删除原有的所有节点，重新渲染新的节点
2. 删除原位置的 `li-3` ,在新位置插入 `li-3`

那么大家觉得这两种方式哪一种更好呢，我们来分析一下

1. 首先对于第一种方式而言：它的好处在于不需要进行任何的对比，仅仅需要执行 6 次(删除 3 次，重新渲染三次) dom 处理即可
2. 第二种方式，在逻辑上相对比较复杂，他需要分为两步来做
   2.1 对比 **旧节点** 和 **新节点**之间的差异
   2.2 根据差异，删除一个**旧节点**,增加一个**新节点**

那么根据以上分析，我们知道了

1. 第一种方式：会涉及到更多的 dom 操作
2. 第二种方式：会涉及到 js 计算 + 少量的 DOM 操作

那么这两种方式，哪一种更快呢？？我们来实验一下

```javascript
const lenth = 10000
console.time('element')
for (let index = 0; index < length; index++) {
  const newEle = document.createElement('div')
  document.body.appendChild(newEle)
}
console.timeEnd('element')
console.time('js')
const divList = []
for (let index = 0; index < length; index++) {
  const newEle = { type: 'div' }
  divList.push(newEle)
}
console.timeEnd('js')
```

从结果上看， **dom 的操作要比 js 的耗时多得多**,即**dom 操作比 js 更加耗费性能**

那么根据这样的一个结论，回到我们刚才所说的场景中，就可以得出如下结论

**方式一 会比 方式二 更加消耗性能(即：性能更差)**

那么得出这样的结论之后，我们回过头再来看最初的问题：**为什么 vue 要设计成一个 运行时 + 编译时 的框架呢？**
答案

1. 针对于 **纯运行时**而言：因为不存在编译器，所以我们只能够提供一个复杂的 js 对象
2. 针对于 **纯编译**而言：因为缺少运行时，所以它只能把分析差异的操作，放到**编译时**进行，同样因为省略了运行时，所以速度可能会更快。但是这种方式将损失灵活性（具体查看第六章：虚拟 DOM，或者点击[这里](https://cn.vuejs.org/guide/extras/render-function.html)查看官方示例） 比如 [svelte](https://www.sveltejs.cn/)，他就是一个纯编译时的框架，但是它的实际运行速度可能达不到理论上的速度
3. **运行时 + 编译时**：比如 vue 或者 react 都是通过这种方式类进行构建的，使其可以在保持灵活性的基础上，尽量的进行性能的优化，从而达到一种平衡

## 11：什么是副作用

在 vue 的源码中，会大量的涉及到一个概念，就是 **副作用**，所以我们需要先了解一下副作用代表的什么意思

副作用指的是：当我们**对数据进行 setter 或者 getter 操作时，所产生的一系列后果**

那么具体是什么意思呢？我们分别来说下

### setter

`setter` 所表示的是 `赋值`操作，比如说，当我们执行以下代码时

```javascript
msg = '你好，世界'
```

这个时候，msg 就触发了一次 `setter` 的行为

那么假如说，msg 是一个响应性数据，那么这样的一次数据改变，就会影响到对应的视图改变

那么我们就可以说，msg 的 setter 行为，触发了一次副租用，导致视图跟随发生了变化

### getter

getter 所表示的就是 取值 操作，比如说，当我们执行如下代码时

```javascript
element.innerText = msg
```

此时对于变量 msg 而言，就触发了一次 getter 操作，那么这样的一次取值操作，同样会导致 element 的 innerText 发生改变

所以我们说，msg 的 getter 行为触发了一次副作用，导致了 element 的 innerText 发生了变化

### 副作用会产生多个吗？

那么明确了副租用的基本概念以后，那么大家想一想：副租用可以会有多个吗

答案是：可以的

举个简单的例子

```vue
<template>
  <div>
    <p>姓名：{{ obj.name }}</p>
    <p>年龄：{{ obj.age }}</p>
  </div>
</template>
<script>
const obj = ref({
  name: '孙悟空',
  age: 500,
})
obj.vaule = {
  name: '猪八戒',
  age: 300,
}
</script>
```

再这样的一个代码中， obj.value 触发了一次 setter 行为，但是会导致两个 p 标签的内容发生变化，也就是产生了两次 副作用

### 总结

1. 副作用指的是：**对数据进行 setter 或者 getter 操作时，所产生的一系列后果**
2. 副作用可能是会有多个的

## Vue3 框架设计概述

根据前面的学习我们已经知道了

1. 什么是声明式
2. 什么是命令式
3. 什么是运行时
4. 什么是编译时
5. 什么是运行时 + 编译时
6. 同时也知道了框架的设计过程是一个 不断取舍的过程

那么了解了这些内容之后，下来 Vue3 的一个基本框架设计:

对于 Vue3 而言，核心大致可以分为三大模块

1. 响应式：`reactivity`
2. 运行时：`runtime`
3. 编译器： `compiler`

我们可以以以下基本结构来描述一下三者之间的关系

```vue
<template>
  <div>{{ proxyTarget.name }}</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const target = {
      name: '张三',
    }
    const proxyTarget = reactive(target)
    return {
      proxyTarget,
    }
  },
}
</script>
```

## 13：所谓良好的额 Typescript 支持，是如何提供的？

目前在网上对于 vue3 的讨论是非常多的，我印象中看到类似的如下内容（包括面试中也有人说过）：

> 说：vue3 对 ts 的支持好，是因为 vue3 本身是使用 ts 编写的（ps:这是一个错误的概念）

所以说才会有这样的一块内容，其目的就是纠正这样一个问题

### 良好的 Typescript 支持，是如何提供的

Typescript（简称:TS）是微软发布的一个 js 的超集，大家可以理解为这是一个包含类型的 Javascript

我们来看如下通过 ts 来写的一个例子

```typescript
// 使用 ts 声明了一个方法，他期望接受两个数字，并且返回两者相加的和
function sum(s1: number, s2: number) {
  return s1 + s2
}
sum('1', '2') // 这里会提示错误
```

那么这样的例子告诉我们：ts 编写的程序 和 ts 类型支持友好是两回事情。如果想要让你的程序拥有更好的 ts 支持，那么你需要做很多额外的事情

为了 vue 拥有良好的 ts 类型支持，vue 内部做了非常多的事情， 比如如下代码(来自于：packages/runtime-core/scr/componentPublicInstance.ts 这样的代码很多，绝不限于一个文件)

```typescript
export interface ComponentCustomProperties {}

type IsDefaultMixinComponent<T> = T extends ComponentOptionsMixin
  ? ComponentOptionsMixin extends T
    ? true
    : false
  : false

type MixinToOptionTypes<T> = T extends ComponentOptionsBase<
  infer P,
  infer B,
  infer D,
  infer C,
  infer M,
  infer Mixin,
  infer Extends,
  any,
  any,
  infer Defaults
>
  ? OptionTypesType<P & {}, B & {}, D & {}, C & {}, M & {}, Defaults & {}> &
      IntersectionMixin<Mixin> &
      IntersectionMixin<Extends>
  : never

// ExtractMixin(map type) is used to resolve circularly references
type ExtractMixin<T> = {
  Mixin: MixinToOptionTypes<T>
}[T extends ComponentOptionsMixin ? 'Mixin' : never]

type IntersectionMixin<T> = IsDefaultMixinComponent<T> extends true
  ? OptionTypesType<{}, {}, {}, {}, {}>
  : UnionToIntersection<ExtractMixin<T>>

type UnwrapMixinsType<
  T,
  Type extends OptionTypesKeys
> = T extends OptionTypesType ? T[Type] : never

type EnsureNonVoid<T> = T extends void ? {} : T

export type ComponentPublicInstanceConstructor<
  T extends ComponentPublicInstance<
    Props,
    RawBindings,
    D,
    C,
    M
  > = ComponentPublicInstance<any>,
  Props = any,
  RawBindings = any,
  D = any,
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
> = {
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never
  new (...args: any[]): T
}

export type CreateComponentPublicInstance<
  P = {},
  B = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = {},
  PublicProps = P,
  Defaults = {},
  MakeDefaultsOptional extends boolean = false,
  I extends ComponentInjectOptions = {},
  PublicMixin = IntersectionMixin<Mixin> & IntersectionMixin<Extends>,
  PublicP = UnwrapMixinsType<PublicMixin, 'P'> & EnsureNonVoid<P>,
  PublicB = UnwrapMixinsType<PublicMixin, 'B'> & EnsureNonVoid<B>,
  PublicD = UnwrapMixinsType<PublicMixin, 'D'> & EnsureNonVoid<D>,
  PublicC extends ComputedOptions = UnwrapMixinsType<PublicMixin, 'C'> &
    EnsureNonVoid<C>,
  PublicM extends MethodOptions = UnwrapMixinsType<PublicMixin, 'M'> &
    EnsureNonVoid<M>,
  PublicDefaults = UnwrapMixinsType<PublicMixin, 'Defaults'> &
    EnsureNonVoid<Defaults>
> = ComponentPublicInstance<
  PublicP,
  PublicB,
  PublicD,
  PublicC,
  PublicM,
  E,
  PublicProps,
  PublicDefaults,
  MakeDefaultsOptional,
  ComponentOptionsBase<P, B, D, C, M, Mixin, Extends, E, string, Defaults>,
  I
>
```

这些代码的存在的目的只是为了进行更好的 ts 支持，所以说要得到一个良好的 ts 支持，是需要进行非常多的努力的

## 14：总结

在本章节中，我们对整个 vue 框架设计中的一些基本概念都做了一个了解

明确了如下概念

1. 命令式
2. 声明式
3. 心智负担
4. 框架设计于取舍之间的关系
5. 运行时
6. 编译时
7. 运行时 + 编译时
8. 副作用
9. `reactivity` `runtime` `compiler` 三者之间的运行关系
10. 扩展：良好的 ts 支持

当我们把这些基本概念了解清楚以后，那么下一章我们就可以开始构建我们的 `vue3`框架了
