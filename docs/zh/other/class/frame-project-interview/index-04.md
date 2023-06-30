# 04-Vue 原理

## 01- vue 原理-大厂必考

- 面试为何会考察原理 ？
- 面试中如何考察？以何种方式？
- Vue 原理包括哪些？

### 面试为何会考察原理

- 知其然知其所以然 - 各行各业通用的道理
- 了解原理，才能应用的更好 - 竞争激烈，择优录取
- 大厂造轮子（有钱有资源，业务定制，技术 KPI）

### 面试中如何考察？

- 考察重点，而不是考察细节。掌握 2/8 原则
- 和使用相关联的原理，如 VDom、模板渲染
- 整体流程是否全面？热门技术是否有深度？

### Vue 原理包括哪些？

- 组件化
- 响应式
- VDom 和 diff
- 模板编译
- 渲染过程
- 前端路由

## 02-组件化基础

- "很久以前"，就有组件化
- 数据驱动视图（MVVM， setState）

#### "很久以前"的组件化

- asp jsp php 已经有组件化了
- nodejs 也有类似的组件化

### 数据视图更新

- 传统组件，只是静态渲染，更新还要依赖于操作 DOM
- 数据驱动视图 - Vue MVVM
- 数据驱动视图 - React setState(后续讲解)

### MVVM

MVVM 的实现主要是三个核心点：

- 响应式：vue 如何监听 data 的属性变化
- 模板解析：vue 的模板是如何被解析的
- 渲染：vue 模板是如何被渲染成 HTML 的

![](https://pic2.zhimg.com/80/v2-90372327ee9f61cc27df99ff28dd613d_720w.webp)

可以看到 MVVM 分别指 View，Model，View-Model，View 通过 View-Model 的 DOM Listeners 将事件绑定到 Model 上，而 Model 则通过 Data Bindings 来管理 View 中的数据，View-Model 从中起到一个连接桥的作用。

```vue
<!-- view 部分-->
<template>
  <div id="app">
    <p @click="changeName">{{ name }}</p>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="addItem">添加一项</button>
  </div>
</template>

<!-- Model 部分  -->
<script>
export default {
  name: 'app',
  data() {
    return {
      name: 'vue',
      list: ['a', 'b', 'c'],
    }
  },
  methods: {
    changeName() {
      this.name = '双越'
    },
    addItem() {
      this.list.push(`${Date.now()}`)
    },
  },
}
</script>
```

### 总结

- 组件化
- 数据驱动视图
- MVVM

## 03-数据响应式

- 组件 data 数据一旦变化，立刻触发视图的更新
- 实现数据驱动视图的第一步
- 考察 Vue 原理的第一步

### Vue 响应时

- 核心 API - Object.defineProperty
- 如何实现响应时，代码演示
- Object.defineProperty 的一些缺点（Vue3.0 已经启用 Proxy）

### Proxy 有兼容性问题

- Proxy 兼容性不好，且无法 polyfill
- Vue2.x 还会存在一段时间，所以得学
- Vue3.0 相关知识，后续会讲

### Object.defineProperty 的基本使用

```javascript
const data = {}
const name = '张三'
Object.defineProperty(data, 'name', {
  get: function () {
    console.log('get')
    return name
  },
  set: function (newVal) {
    console.log('set')
    name = newVal
  },
})

// 测试
console.log(data.name) // get 张三
data.name = 'list' // set
```

### Object.defineProperty 实现响应式

- 监听对象，监听数组
- 复杂对象，深度监听
- 几个缺点

#### 代码演示

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1,maximum-scale=1,user-scalable=no"
    />
    <meta name="format-detection" content="telephone=no" />
    <title>Observe demo</title>
  </head>
  <body>
    <p>响应式 demo</p>

    <script src="./observe.js"></script>
  </body>
</html>
```

```javascript
// observe.js
// 触发更新视图
function updateView() {
  console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty)
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach((methodName) => {
  arrProto[methodName] = function () {
    updateView() // 触发视图更新
    oldArrayProperty[methodName].call(this, ...arguments)
    // Array.prototype.push.call(this, ...arguments)
  }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observer(value)

  // 核心 API
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听
        observer(newValue)

        // 设置新值
        // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
        value = newValue

        // 触发更新视图
        updateView()
      }
    },
  })
}

// 监听对象属性
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或数组
    return target
  }

  // 如下做，会污染全局的 Array 原型
  // Array.prototype.push = function () {
  //     updateView()
  //     ...
  // }

  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  // 重新定义各个属性（for in 也可以遍历数组）
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

// 准备数据
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京', // 需要深度监听
  },
  numbers: [10, 20, 30],
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// // console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
// data.info.address = '上海' // 深度监听
data.numbers.push(4) // 监听数组
```

### Object.defineProperty 监听的缺点

- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增属性、删除属性（Vue.set Vue.delete）
- 无法原生监听数组，需要特殊处理

## 04: 虚拟 DOM-面试里的网红

### 虚拟 DOM (Virtual DOM )和 Diff

- VDom 是实现 vue 和 react 的重要基石
- diff 算法是 VDom 中最核心、最关键的部分
- VDom 是一个热门话题，也是面试中的热门话题

### 背景

- DOM 操作非常损耗性能
- 以前用 jQuery，可以执行控制 DOM 操作的时机，手动调整
- Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作呢？

### 解决方案： VDom

- 有了一定复杂度，想减少计算次数比较难
- 能不能把计算，更多的转移为 JS 计算？因为 JS 执行速度很快
- VDom: 先用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM

#### 用 JS 模拟 DOM

```html
<div id="div1" class="container">
  <p>VDom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

```javascript
{
  tag: "div",
  props: {
    className: "container",
    id: "div1"
  },
  children: [
    { tag: "p", children: "VDom" },
    {
      tag: "ul",
      props: {
        style : "font-size: 20px",
      },
      children: [
        { tag: "li", children:"a" }
      ]
    }
  ]
}
```

### 通过 snabbdom 学习 VDom

- 简洁强大的 VDom 库，易学易用
- Vue 参考它实现的 VDom 和 Diff
- [https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)
- Vue3.0 重写了 VDom 的代码，优化了性能
- 但是 VDom 的基本理念不变，面试考点也不变
- React VDom 的具体实现和 Vue 也不同，但是不妨碍统一学习

### snabbdom 代码演示

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div id="container"></div>
    <button id="btn-change">change</button>

    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
    <script src="./demo1.js"></script>
  </body>
</html>
```

```javascript
// demo1.js
const snabbdom = window.snabbdom

// 定义 patch
const patch = snabbdom.init([
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners,
])

// 定义 h
const h = snabbdom.h
const container = document.getElementById('container')

// 生成 vnode
const vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item 1'),
  h('li.item', {}, 'Item 2'),
])
patch(container, vnode)

document.getElementById('btn-change').addEventListener('click', () => {
  // 生成 newVnode
  const newVnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item B'),
    h('li.item', {}, 'Item 3'),
  ])
  patch(vnode, newVnode)

  // vnode = newVnode // patch 之后，应该用新的覆盖现有的 vnode ，否则每次 change 都是新旧对比
})
```

### table-with-vdom 代码样式

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div id="container"></div>
    <button id="btn-change">change</button>

    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
    <script type="text/javascript">
      const snabbdom = window.snabbdom
      // 定义关键函数 patch
      const patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners,
      ])

      // 定义关键函数 h
      const h = snabbdom.h

      // 原始数据
      const data = [
        {
          name: '张三',
          age: '20',
          address: '北京',
        },
        {
          name: '李四',
          age: '21',
          address: '上海',
        },
        {
          name: '王五',
          age: '22',
          address: '广州',
        },
      ]
      // 把表头也放在 data 中
      data.unshift({
        name: '姓名',
        age: '年龄',
        address: '地址',
      })

      const container = document.getElementById('container')

      // 渲染函数
      let vnode
      function render(data) {
        const newVnode = h(
          'table',
          {},
          data.map((item) => {
            const tds = []
            for (let i in item) {
              if (item.hasOwnProperty(i)) {
                tds.push(h('td', {}, item[i] + ''))
              }
            }
            return h('tr', {}, tds)
          }),
        )

        if (vnode) {
          // re-render
          patch(vnode, newVnode)
        } else {
          // 初次渲染
          patch(container, newVnode)
        }

        // 存储当前的 vnode 结果
        vnode = newVnode
      }

      // 初次渲染
      render(data)

      const btnChange = document.getElementById('btn-change')
      btnChange.addEventListener('click', () => {
        data[1].age = 30
        data[2].address = '深圳'
        // re-render
        render(data)
      })
    </script>
  </body>
</html>
```

### snabbdom 重点总结

- h 函数
- vnode 数据结构
- patch 函数

### vdom 总结

- 用 JS 模拟 DOM 结构（vnode）
- 新旧 VNode 对比，得出最小的更新范围，最后更新 DOM
- 数据驱动视图的模式下，有效控制 DOM 操作

## 05: 虚拟 DOM-diff 算法概述

### diff 算法

- diff 算法是 VDom 中最核心、最关键的部分
- diff 算法能在日常使用 Vue React 中体现出来（如 key）
- diff 算法是前端热门话题，面试“宠儿”

### diff 算法概述

- diff 即对比，是一个广泛的概念，如 linux diff 命令、git diff 等
- 两个 JS 对象之间也可以做 diff, 如：[JSON Diff and Patch: https://github.com/cujojs/jiff](https://github.com/cujojs/jiff)
- 两棵树做 diff, 如这里的 VDom diff

![](./diff.jpg)

### 树 diff 的时间复杂度 O(n^3)

> 将两颗树中所有的节点一一对比需要 O(n²)的复杂度，在对比过程中发现旧节点在新的树中未找到，那么就需要把旧节点删除，删除一棵树的一个节点(找到一个合适的节点放到被删除的位置)的时间复杂度为 O(n),同理添加新节点的复杂度也是 O(n),合起来 diff 两个树的复杂度就是 O(n³)

- 第一，遍历 tree1
- 第二，遍历 tree2
- 第三 排序
- 1000 个节点，要计算 1 亿次，算法不可用

### 优化时间复杂度到 O(n)

- 只比较同一层级，不跨级比较

  ![](https://img2020.cnblogs.com/blog/915803/202008/915803-20200806200406059-1674663436.png)

- tag 不相同，则直接删除重建，不再深度比较

  ![](https://img2020.cnblogs.com/blog/915803/202008/915803-20200806201145342-575903302.png)

- tag 和 key，两者都相同，则认为是相同节点，不再深度比较

  > 通过 key 来标识区分相同节点

  ![](https://img2020.cnblogs.com/blog/915803/202008/915803-20200806201351909-1243081644.png)
