##### 源码探秘之虚拟 DOM 和 Diff 算法

现代的框架 React、Vue 都有几个重要的概念，其中就包含了 **虚拟DOM** 和 **DIff算法**。后者我们知道是为了实现精细化比较、完成最小量的更新任务，达到优化性能的目的，而 diff 算法是基于 虚拟 Dom 来完成的。因为对真实的DOM 进行处理开销是比较大的，在目前的项目中往往存在频繁更新 DOM 的情况，显然直接操作真实DOM 会产生一定的性能问题。虚拟DOM 就是为了解决这个问题而产生的。

## 什么是虚拟DOM

> 虚拟DOM 就是一个描述一个  DOM 节点特征的  JS 对象。

而操作 JS 对象，显然性能影响更小。其实虚拟DOM 带来的一个最大的优势是实现了**跨平台**，因为基于此，抽象了原本的渲染过程，是他能够不仅仅局限于浏览器的DOM, 还可以是安卓和 IOS 的原生组件，以及各类小程序，还可以是各种 GUI。

虚拟DOM 包含了 `tag` 、`props`、`children` 三个属性 , 用代码展示如下

比如真实的DOM 节点如下

```html
<div id="app">
  <p class="text">hello world!!!</p>
</div>
```

而上面的真实DOM 节点如果转换为虚拟DOM 以后，大概得结构类似如下

```javascript
{
  tag: 'div',
  props: {
    id: 'app'
  },
  chidren: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      chidren: [
        'hello world!!!'
      ]
    }
  ]
}
```

> 该对象就是我们常说的虚拟 DOM 了，因为 DOM 是树形结构，所以使用 JavaScript 对象就能很简单的表示。而原生 DOM 因为浏览器厂商需要实现众多的规范（各种 HTML5 属性、DOM事件），即使创建一个空的 div 也要付出昂贵的代价。虚拟 DOM 提升性能的点在于 DOM 发生变化的时候，通过 diff 算法比对 JavaScript 原生对象，计算出需要变更的 DOM，然后只对变化的 DOM 进行操作，而不是更新整个视图。

## Snabbdom 简介



## Snabbdom 的 h 函数如何工作



## Diff 算法原理



## 手写 Diff 算法

