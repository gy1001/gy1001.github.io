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

## 1、Snabbdom 简介

> snabbdom 是著名的虚拟 DOM 库，是 diff 算法的鼻祖，vue 源码借鉴了 snabbdom

[官方 github 地址](https://github.com/snabbdom/snabbdom)

使用以下官方Demo

### 1.1 搭配基础环境

1. 安装基础依赖包

   ```shell
   mkdir snabbdom-demo
   cd snabbdom-demo
   npm init -y
   npm install webpack webpack-cli webpack-dev-server --save-dev
   npm install html-webpack-plugin --save
   // 安装 snabbdom
   npm install snabbdom --save
   ```

2. 新建`webpack.config.js`文件，并修改内容如下

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const path = require('path')
   
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'bu'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
   }
   ```

3. 新建`src目录`，并创建 `index.html`、 `index.js` 文件: 这里利用官方的 demo 例子来查看实现 diff 后的效果

   ```javascript
   // index.html， 页面内容基本通用即可，不过要创建一个 <div id="container"></div
   
   // index.js
   import {
     init,
     classModule,
     propsModule,
     styleModule,
     eventListenersModule,
     h,
   } from 'snabbdom'
   
   const patch = init([
     // Init patch function with chosen modules
     classModule, // makes it easy to toggle classes
     propsModule, // for setting properties on DOM elements
     styleModule, // handles styling on elements with support for animations
     eventListenersModule, // attaches event listeners
   ])
   
   const container = document.getElementById('container')
   
   const vnode = h(
     'div#container.two.classes',
     {
       on: {
         click: function () {
           console.log('点击了')
         },
       },
     },
     [
       h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
       ' and this is just normal text',
       h('a', { props: { href: '/foo' } }, "I'll take you places!"),
     ]
   )
   // Patch into empty DOM element – this modifies the DOM as a side effect
   patch(container, vnode)
   
   const newVnode = h(
     'div#container.two.classes',
     {
       on: {
         click: () => {
           console.log('我点击被更新替换了')
         },
       },
     },
     [
       h(
         'span',
         { style: { fontWeight: 'normal', fontStyle: 'italic' } },
         'This is now italic type'
       ),
       ' and this is still just normal text',
       h('a', { props: { href: '/bar' } }, "I'll take you places!"),
     ]
   )
   // 3s后进行 新老节点的更新替换
   setTimeout(() => {
     // Second `patch` invocation
     patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state
   }, 3000)
   ```

### 1.2 虚拟DOM

**虚拟DOM**： 用JavaScript 对象描述 DOM 的层次结构。DOM 中的一切属性都在虚拟 DOM 中有对应的属性。

**Diff 是发生在虚拟 DOM 上的** : *新虚拟DOM和老虚拟DOM进行 diff（精细化比较），算出应该如何最小量更新，最后反映到真正DOM上*

## 2、 Snabbdom 的 h 函数如何工作

问题：虚拟DOM 如何被渲染函数（h函数）产生？

1. h 函数用来产生**虚拟节点(vnode)**

   * 示例：比如这样调用 h 函数 

     ```javascript
     h('a', { props: { href: 'http://www.atguigu.com' }}, "尚硅谷")
     ```

     将得到这样的虚拟节点

     ```javascript
     {"sel": "a", "data": { props: { href: "http://www.atguigu.com" } }, text: "尚硅谷" }
     ```

     它表示的真正的DOM 节点是

     ```html
     <a href="http://www.atguigu.com">尚硅谷</a>
     ```

2. h 函数也可以嵌套使用，从而得到虚拟 DOM 树(重要)

   * 比如这样嵌套使用 h 函数

     ```javascript
     h("ul", {}, [
       h("li", "牛奶"), // 第二个参数没有值时，也可以省略
       h("li", {}，"咖啡"),
       h("li", {}, "可乐")
     ])
     ```

     将得到这样的虚拟 DOM 树

     ```javascript
     {
       "sel": "ul",
       "data": {},
       "children": [
         {"sel": "li", "text": "牛奶"},
         {"sel": "li", "text": "咖啡"},
         {"sel": "li", "text": "可乐"},
       ]
     }
     ```

## 3、感受 diff 算法

### 3.1 代码示例展示

1. `index.js` 内容修改为如下

   ```javascript
   import {
     init,
     classModule,
     propsModule,
     styleModule,
     eventListenersModule,
     h,
   } from 'snabbdom'
   
   const patch = init([
     // Init patch function with chosen modules
     classModule, // makes it easy to toggle classes
     propsModule, // for setting properties on DOM elements
     styleModule, // handles styling on elements with support for animations
     eventListenersModule, // attaches event listeners
   ])
   
   const container = document.getElementById('container')
   
   const vnode1 = h('ul', {}, [
     h('li', {}, 'A'),
     h('li', {}, 'B'),
     h('li', {}, 'C'),
     h('li', {}, 'D'),
   ])
   
   patch(container, vnode1)
   
   const vnode2 = h('ul', {}, [
     h('li', {}, 'F'),
     h('li', {}, 'A'),
     h('li', {}, 'B'),
     h('li', {}, 'C'),
     h('li', {}, 'D'),
     h('li', {}, 'E'),
   ])
   
   const btn = document.createElement('button')
   btn.innerHTML = '点击我更改内容'
   btn.addEventListener('click', function () {
     patch(vnode1, vnode2)
   })
   
   document.body.appendChild(btn)
   ```

2. 点击后，发现试图进行了变更。但是又如何判断是最小更新了，而不是全部推到重新渲染的呢，可以进行如下操作，

   > 此时在页面中打开浏览器控制台，把 第一个元素的内的 A 内容进行替换 , 比如替换为 “A被改变了”。再次点击按钮，就会发现页面视图被全部替换为 F、A、B、C、D、E。显然这不是最小更新，而是全部删除重建。为什么呢？？？

   **因为少了一个key的属性，上述示例是全部删除重新渲染的操作，这时候体现了key属性的重要性**。

3. 下面对 `index.js`中的数据进行更新处理(添 加 `key` 属性) ，变为如下结果

   ```javascript
   const vnode1 = h('ul', {}, [
     h('li', { key: 'A' }, 'A'),
     h('li', { key: 'B' }, 'B'),
     h('li', { key: 'C' }, 'C'),
     h('li', { key: 'D' }, 'D'),
   ])
   
   
   const vnode2 = h('ul', {}, [
     h('li', { key: 'F' }, 'F'),
     h('li', { key: 'A' }, 'A'),
     h('li', { key: 'B' }, 'B'),
     h('li', { key: 'C' }, 'C'),
     h('li', { key: 'D' }, 'D'),
     h('li', { key: 'E' }, 'E'),
   ])
   // 其余的保持不变，
   ```

4. 结果：再次进行控制台的修改，把 第一个元素的内的 A 内容进行替换 , 比如替换为 “A被改变了”（其他几个也可以进行类似操作）。然后点击按钮，就会发现 把A修改为 "A被改变了"这个字符串进行了保留，而前面增加了 F ，说明 **相同的节点定是没有做任何处理的**，只对新增的 F、E 节点做了新增处理。这样就体现了 diff 算法的应用。

   Tips: 如果不在乎性能，当然可以全部清空，然后用新的数据重新渲染。

5. 具体操作可以参考下图

   [https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76f3c164a16f4dabbf0c7f33829029d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76f3c164a16f4dabbf0c7f33829029d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)



### 3.2 感受 DIff 算法的心得

* 最小量更新太厉害啦！真的是最小量更新！**当然，key很重要**

* **只有是同一个虚拟节点，才进行精细化比较，**否则就是暴力删除旧的、插入新的。

  * **延伸问题：如何定义是同一个虚拟节点：答：选择器相同且key相同**

* **只进行同层比较，不会进行跨层比较。** 即使是同一片虚拟节点，但是跨层了，对不起，精细化比较不 diff 你。而是暴力删除旧的、然后插入新的。

  <font color="red">diff 并不是那么那么“无微不至”啊！ 真的影响效率吗？<br/>答: 上面的操作在实际 Vue 开发中，基本不会遇见，所以这是合理的优化机制。</font>

  比如一般没有人会写如下的代码片段

  ```html
  <div>
    <section v-if="isFlag">
      <p>A</p>
      <p>B</p>
      <p>C</p>
    </section>
    <p v-if="!isFlag">A</p>
    <p v-if="!isFlag">B</p>
    <p v-if="!isFlag">C</p>
  </div>
  ```

  





