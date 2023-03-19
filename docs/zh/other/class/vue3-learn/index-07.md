# 07-runtime 运行时-运行时核心设计原则

## 01：前言

从本章开始我们将要进入到**渲染系统**的学习，也就是**运行时 runtime**

在之前我们明确过什么是**运行时**，看下面的代码（第二章节运行时使用过该代码）

```html
 <body>
  <div id="app"></div>
</body>
<script>
  const { render, h } = Vue
  // 生成 VNode
  const vnode = h('div', { class: 'test' }, 'hello render')
  const container = document.querySelector('#app')
  render(vnode, container)
</script>
```

以上代码代表了一个基本的**运行时**。即：**把 vnode渲染到页面中**.所以大家可以简单的把运行时理解为：就是把vnode渲染到页面中

## 02: HTML DOM 节点树与虚拟DOM树

首先我们先来学习两个运行时的基本概念 

1. HTML DOM 节点树
2. 虚拟 DOM 树

我们来看下面这段 HTML

```html
<div>
  <h1>hello h1</h1>
  <!-- TODO: comment -->
  hello div
</div>
```

当浏览器看到这一段 html 时，它会生成一个对应的 DOM树 来进行表示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b27dd0ac1d6246eda7d56b7c7debc55c~tplv-k3u1fbpfcp-watermark.image?)

以上我们通过 节点 Node 来描述以上所有的元素，在HTML中所有的元素都是一个节点，注意、文本都属于节点的一部分

这样的通过节点构成的一个属性结构，我们就把它叫做**HTML DOM 节点树**

那么明确了什么叫做节点树之后，什么是**虚拟DOM树呢？**

可能有很多同学听过**虚拟DOM**的概念，**虚拟DOM树**和虚拟DOM是息息相关的

> [官方文档](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)
>
> 虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。这个概念是由 [React](https://reactjs.org/) 率先开拓，随后在许多不同的框架中都有不同的实现，当然也包括 Vue。

虚拟DOM是一种理念，比如我期望通过 一个 JavaScript 对象来描述一个 div 节点的子节点是一个文本节点 text ，则可以这么写

```javascript
// <div>text</div>
//  通过虚拟 dom 表示
const vnode = { type:"div", children: "text" }
```

在上面这个对象中，我们通过 type 来表示当前为一个div  节点，通过 children 来表示它的子节点，通过 text 表示子节点是一个文本节点，内容是 text

这里所设计的 vnode，是一个**纯JavaScript对象**。我们通常使用它来表示一个**虚拟节点（或者虚拟节点树）**。它里面的属性名不是固定的，比如我们可以使用 type 表示这个是一个 div,也可以使用 tag 进行表示，都是可以的

在 vue 的源码中，通过使用它来表示所需要创建元素的所有信息，比如

```html
<div>
  <h1>hello h1</h1>
  <!-- TODO: comment -->
  hello div
</div>
```

该例子如果使用 vnode 进行表示

```javascript
const vnode = {
  type: 'div',
  children: [
    { type: "h1", children: 'hello h1' },
    { type: Comment, chidren: "TODO comment"},
    "hello div"
	]
}
```

在运行时 runtime，渲染器 renderer 会遍历整个虚拟 DOM  树，并据此构建真实的 DOM 树，这个过程可以把它叫做**挂载mount**

当这个 VNode 对象发生变化时，我们会对比 **旧的VNode 和新的 VNode**之间的区别，找出它们的之间的区别，并把这些其中的变化应用到真实的DOM上，这个过程被称为**更新 patch**

那么这样的一个挂载和更新的过程，具体是怎么做的呢？

## 03: 挂载与更新

这一小节，我们将通过一个极简的案例，来了解两个比较重要的概念

1. 挂载：mount
2. 更新：patch

### 挂载：mount

首先我们先来构建这个案例（该案例在第二章第七小节《运行时》进行过大致的讲解）

```javascript
const VNode = { type: 'div', children: 'hello render' }
function render(oldVNode, newVNode, container) {
  if (!oldVNode) {
    mount(newVNode, container)
  }
}
function mount(vnode, container) {
  const ele = document.createElement(vnode.type)
  ele.innerText = vnode.children
  container.appendChildren(ele)
}
render(null, vnode, document.querySelector('#app'))
```

在当前案例中，我们首先创建了一个 render 渲染函数，该函数接收三个参数

1. oldVNode: 旧的 VNode
2. newVNode：新的 VNode
3. container：容器

当 oldVNode 不存在时，那么我们就认为这是一个全新的渲染，也就是**挂载**

所以以上的mount 方法，我们就可以把它称为一个**挂载方法**

### 更新：patch

旧的视图不可能被一直展示，它会在未来某一个时刻被更新为全新的视图

```javascript
const VNode = { type: 'div', children: 'hello render' }
const VNode2 = { type: 'div', children: 'hello render更新了' }
function render(oldVNode, newVNode, container) {
  if (!oldVNode) {
    mount()
  } else {
    patch(oldVNode, newVNode, container)
  }
}
function mount(vnode, container) {
  const ele = document.createElement(vnode.type)
  ele.innerText = vnode.children
  container.appendChildren(ele)
}

function unmount(container) {
  container.innerHTML = ''
}

function patch(oldVNode, newVNode, container) {
  unmount(container)
  mount(newVNode, container)
}
render(null, vnode, document.querySelector('#app'))

setTimeout(() => {
  render(vnode, vnode2, document.querySelector('#app'))
}, 200)
```

我们在原有的代码中新增了一部分，新增了 patch 函数

在 patch 函数中，我们先**删除了旧的 VNode，然后创建了一个新的VNode**。这样的一个过程，我们就把它叫做**更新：patch**

### 总结

本小节我们通过一个简单的例子讲解了**更新mount**和**更新Patch**的概念。这两个概念在 [Vue3官方文档](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)中也对此进行了详细的介绍

1. **挂载**：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。这一步会作为[响应式副作用](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)执行，因此它会追踪其中所用到的所有响应式依赖。
2. **更新**：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。

这两个概念在我们后面去实现 renderer 渲染器的时候还会经常的使用到

## 04：h函数与render 函数

不知道大家还记不记得，我们在**第二章节**讲解**运行时**的时候，曾经使用过这样的一个案例

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

当时，我们说：有些同学可能看不懂当前代码是什么意思，没有关系，这不重要，后面我们会详细去讲，那么现在就是讲解这个的时候了

根据前面两个小节的介绍，我们已经知道了，vue的渲染分为：挂载和更新。两个步骤

无论是挂载还是更新，都是借助于 VNode 来进行实现的

在以上代码中，我们知道了主要涉及了两个函数

1. h函数
2. render函数

那么下面我们一个一个来说

### h函数

根据以上代码，我们可以通过h函数得到一个vnode

```javascript
const vnode = h('div', {class:'test'}, 'hello render')
```

打印当前的 vnode,可以得到以下内容

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1376ca168914afcb92f716ff8ad868f~tplv-k3u1fbpfcp-watermark.image?)

以上内容，我们剔除无用的内容之后，就得到一个精简的 json

```json
{
  // 当前节点类型
  type:"div",
  // 是否是一个 VNode 对象
  __v_isVNode : true,
  // 当前节点的属性
  props: {class: 'test'},
  // 它的子节点
  children: "hello render"
}
```

由此可知 h 函数本质上其实就是一个**用来生成 VNode 的函数**

[h 函数](https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes)最多可接收三个参数

1. type: string|Component:  既可以是一个字符串（用于原生元素）也可以是一个 Vue 组件定义
2. props?: object | null: 要传递的 prop
3. children?: Children | Slot | Slots: 子节点

官方示例详细描述了它的详细使用方式，这个就不在写在文档里了

### render 函数

那么在了解了 h 函数的作用之后，下面我们来看 [render 函数](https://cn.vuejs.org/guide/extras/render-function.html#declaring-render-function)

```javascript
render(vnode, container)
```

从以上代码我们可知，render 函数主要接收了两个参数

1. vnode: 虚拟节点树或者叫做 虚拟DOM树，两者叫法皆可
2. container：承载的容器。真实节点渲染的位置

通过 render 函数，我们可以：**使用编程式的方式，创建虚拟 DOM 树对应的真实 DOM 树，到指定位置**

### 总结

这小节，我们知道了 `h 函数`和 `render 函数`的作用，这两个函数是整个运行时的关键函数，后面我们实际运行的代码，核心就是实现这两个函数

## 05：运行时的核心设计原则

那么到这里为止，我们已经了解了在学习运行时之前需要掌握的前置知识

那么在本小节中，我们就需要看一下 vue3 运行时的一些设计原则，这样可以帮助我们更好的整体了解 `runtime`

需要大家在本小节中了解的设计原则分为两个

1. `runtime-core` 与` runtime-dom`的关系，为什么要这么设计
2. 渲染时，挂载和更新的逻辑处理

### runtime-core 与 runtime-core的关系，为什么要这么设计

在 vue 源码中，关于运行时的包主要由两个

1. `packages/runtime-core`：运行时的核心代码
2. `packages/runtime-dom`:运行时关于浏览器渲染的代码

其中第一个 `runtime-core`  的概念比较好理解，但是`runtime-dom`它是干什么的呢？为什么要单独分出来这样的一个包呢？

`runtime-dom`中包含了相关的一些 dom 操作函数，这样做的一个主要目的的进行逻辑抽离，对于 vue 而言，它的主要目的有两种：**浏览器渲染**、**服务器渲染**

除了这些，其实还有其他的一些渲染场景: 阿里的 weex、uni-app

所以`runtime-core`只会放一些运行时的核心代码，而不会把平台相关操作放进来。当我们需要对浏览器进行操作的时候，可以吧浏览器的相关操作当做参数传入，如果需要其他平台的操作，就把其他平台的操作对象传入即可。

本质就是为了针对不同的宿主环境，使用不同的API

### 渲染时，挂载和更新的逻辑处理



## 06：总结

在本章中，我们掌握了开发 `runtime`之前的一些必备知识

通过本章的内容，我们可知整个`runtime`  核心的方法有两个

1. `h函数`
2. `render函数`

那么我们在后面去实现` runtime `时，也会以这两个函数为核心进行实现

即：先实现 `h` 函数，在实现 `render` 函数

以此来完成整个运行时 `runtime` 的处理

那么准备好了吗
