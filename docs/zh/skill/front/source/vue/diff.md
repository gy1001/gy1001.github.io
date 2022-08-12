# 源码探秘之虚拟 Dom 和 Diff 算法

现代的框架 React、Vue 都有几个重要的概念，其中就包含了 **虚拟 DOM** 和 **DIff 算法**。后者我们知道是为了实现精细化比较、完成最小量的更新任务，达到优化性能的目的，而 diff 算法是基于 虚拟 Dom 来完成的。因为对真实的 DOM 进行处理开销是比较大的，在目前的项目中往往存在频繁更新 DOM 的情况，显然直接操作真实 DOM 会产生一定的性能问题。虚拟 DOM 就是为了解决这个问题而产生的。

## 什么是虚拟 Dom

> 虚拟 DOM 就是一个描述一个 DOM 节点特征的 JS 对象。

而操作 JS 对象，显然性能影响更小。其实虚拟 DOM 带来的一个最大的优势是实现了**跨平台**，因为基于此，抽象了原本的渲染过程，是他能够不仅仅局限于浏览器的 DOM, 还可以是安卓和 IOS 的原生组件，以及各类小程序，还可以是各种 GUI。

虚拟 DOM 包含了 `tag` 、`props`、`children` 三个属性 , 用代码展示如下

比如真实的 DOM 节点如下

```html
<div id="app">
  <p class="text">hello world!!!</p>
</div>
```

而上面的真实 DOM 节点如果转换为虚拟 DOM 以后，大概得结构类似如下

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

> 该对象就是我们常说的虚拟 DOM 了，因为 DOM 是树形结构，所以使用 JavaScript 对象就能很简单的表示。而原生 DOM 因为浏览器厂商需要实现众多的规范（各种 HTML5 属性、DOM 事件），即使创建一个空的 div 也要付出昂贵的代价。虚拟 DOM 提升性能的点在于 DOM 发生变化的时候，通过 diff 算法比对 JavaScript 原生对象，计算出需要变更的 DOM，然后只对变化的 DOM 进行操作，而不是更新整个视图。

## 1、Snabbdom 简介

> snabbdom 是著名的虚拟 DOM 库，是 diff 算法的鼻祖，vue 源码借鉴了 snabbdom

[官方 github 地址](https://github.com/snabbdom/snabbdom)

使用以下官方 Demo

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
   import { init, classModule, propsModule, styleModule, eventListenersModule, h } from 'snabbdom'
   
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

### 1.2 虚拟 DOM

**虚拟 DOM**： 用 JavaScript 对象描述 DOM 的层次结构。DOM 中的一切属性都在虚拟 DOM 中有对应的属性。

**Diff 是发生在虚拟 DOM 上的** : _新虚拟 DOM 和老虚拟 DOM 进行 diff（精细化比较），算出应该如何最小量更新，最后反映到真正 DOM 上_

## 2、 Snabbdom 的 h 函数如何工作

问题：虚拟 DOM 如何被渲染函数（h 函数）产生？

1. h 函数用来产生**虚拟节点(vnode)**

   示例：比如这样调用 h 函数

   ```javascript
   h('a', { props: { href: 'http://www.atguigu.com' } }, '尚硅谷')
   ```

   将得到这样的虚拟节点

   ```javascript
   {"sel": "a", "data": { props: { href: "http://www.atguigu.com" } }, text: "尚硅谷" }
   ```

   它表示的真正的 DOM 节点是

   ```html
   <a href="http://www.atguigu.com">尚硅谷</a>
   ```

2. h 函数也可以嵌套使用，从而得到虚拟 DOM 树(重要)

   比如这样嵌套使用 h 函数

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
   import { init, classModule, propsModule, styleModule, eventListenersModule, h } from 'snabbdom'
   
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

   > 此时在页面中打开浏览器控制台，把 第一个元素的内的 A 内容进行替换 , 比如替换为 “A 被改变了”。再次点击按钮，就会发现页面视图被全部替换为 F、A、B、C、D、E。显然这不是最小更新，而是全部删除重建。为什么呢？？？

   **因为少了一个 key 的属性，上述示例是全部删除重新渲染的操作，这时候体现了 key 属性的重要性**。

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

4. 结果：再次进行控制台的修改，把 第一个元素的内的 A 内容进行替换 , 比如替换为 “A 被改变了”（其他几个也可以进行类似操作）。然后点击按钮，就会发现 把 A 修改为 "A 被改变了"这个字符串进行了保留，而前面增加了 F ，说明 **相同的节点定是没有做任何处理的**，只对新增的 F、E 节点做了新增处理。这样就体现了 diff 算法的应用。

   Tips: 如果不在乎性能，当然可以全部清空，然后用新的数据重新渲染。

5. 具体操作可以参考下图

   [https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76f3c164a16f4dabbf0c7f33829029d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76f3c164a16f4dabbf0c7f33829029d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 3.2 感受 Diff 算法的心得

- 最小量更新太厉害啦！真的是最小量更新！**当然，key 很重要**

- **只有是同一个虚拟节点，才进行精细化比较，**否则就是暴力删除旧的、插入新的。

  - **延伸问题：如何定义是同一个虚拟节点：答：选择器相同且 key 相同**

- **只进行同层比较，不会进行跨层比较。** 即使是同一片虚拟节点，但是跨层了，对不起，精细化比较不 diff 你。而是暴力删除旧的、然后插入新的。

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

## 4、梳理一下 Diff 比较的流程

`patch` 函数被调用后的流程：

1. 判断 `oldVNode` 是虚拟节点还是真实 DOM

   - 如果是空，说明是 DOM 节点，就处理为空的虚拟节点，然后进行下一步
   - 如果不是，就不处理，直接进行下一步

2. 然后，比较 `oldVNode` 和 `newVNode` 是不是同一个节点（参考第 6 节、第 7 节）

   - 如果是，就不做处理，直接进行下一步
   - 如果不是，暴力删除旧的，新建新的（创建子节点时，所有子节点需要递归列出来的），然后结束

3. 然后，判断 `oldVNode` 和 `newVNode` 是不是内存中的同一个对象

   - 如果是，就不做处理，结束
   - 如果不是，就进行下一步

4. 判断 `newVNode` 有没有`text`属性（参考第 8 节）

   - 有`text`属性，说明没有`children`
     - 在判断 `newVNode`和 `oldVNode`的`text`属性是否相同
       - 如果相同，什么都不做，直接返回
       - 如果不同，把 `oldVnode.elm` 中的`text` 变为 `newVnode中的text`(即使`oldVnode`有`children`属性，`innerText`一旦改变后，老`children`也就没了)，然后结束
   - 没有`text`属性，说明有`children`属性，进行下一步判断

5. 判断`oldVNode`有没有`children`属性（参考第 8 节）

   - 如果没有，也也就是`oldVNode`没有`children`属性，而`newVNode`有`children`属性，那么就**清空老节点的内容，并把 newVnode 的 children 添加到 DOM 中**
   - 如果有，就需要进行下一步判断(此种情况只最复杂的情况，也是**diff 的重点**)

6. `newVNode`和`oldVNode`均有`children`（参考第 9 节）

## 5、Diff 处理新旧节点不是同一个节点时

### 5.1 代码示例

```javascript
function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}
```

### 5.2 结论

- 旧节点的 `key` 和 新节点的 `key` 相同
- **并且**， 旧节点的选择器要和新节点的选择器相同

## 6、手写第一次渲染到页面时的逻辑

1. `index.js` 中的内容进行如下修改

   ```javascript
   import { h } from 'snabbdom'
   import patch from './patch'
   const container = document.getElementById('container')

   const vnode1 = h('h1', {}, 'hello world')
   // 这里对 vnode1 进行处理渲染
   patch(container, vnode1)
   ```

2. 新建 `patch.js` 文件，内容如下

   ```javascript
   import createElement from './createElement'
   import vNode from './vnode'

   function patch(oldVNode, newVNode) {
     // 判断第一个参数 oldVNode 是虚拟节点还是 DOM 节点
     if (oldVNode.sel === '' || oldVNode.sel === undefined) {
       // 是空，说明是 DOM 节点，需要包装为空的虚拟节点
       oldVNode = vNode(
         oldVNode.tagName.toLowerCase(),
         {},
         [],
         undefined,
         oldVNode
       )
     }
     // 判断 oldVNode 和 newVNode 是不是同一个节点
     if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
       console.log('是同一个节点，需要做精细化比较')
     } else {
       console.log('不是同一个节点，暴力插入新的，删除旧的')
       createElement(newVNode, oldVNode.elm)
     }
   }

   export default patch
   ```

3. 上述代码中用到了两个函数， 创建虚拟节点函数的 `vnode.js` 、以及 创建真实元素并挂载的 `createELement.js`

   ```javascript
   // createElement.js
   /**
    * 真正 创建节点，将 vNode 创建为dom，并插入到 pivot 这个元素之前
    * @param {*} vNode
    * @param {*} pivot
    */
   export default function createElement(vNode, pivot) {
     console.log('目的是把虚拟节点', vNode, '插入到标杆', pivot, '前')
     let domNode = document.createElement(vNode.sel)
     // 判断有子节点还是有文本
     if (
       (vNode.text !== '') &
       (vNode.children === undefined || vNode.children.length === 0)
     ) {
       // 它的内部是文字
       domNode.innerText = vNode.text
       console.log(domNode)
       // 将孤儿节点 插入到 元素前:让标杆节点的父元素调用 insertBefore 方法，插入到标签节点之前
       pivot.parentNode.insertBefore(domNode, pivot)
     } else if (Array.isArray(vNode.children) && vNode.children.length > 0) {
       console.log('这里进行处理多个子节点的循环处理')
     }
   }

   // 创建虚拟节点函数
   export default function vNode(sel, data, children, text, elm) {
     return { sel, data, children, text, elm }
   }
   ```

4. 运行代码后，可以在页面中看到 `const vnode1 = h('h1', {}, 'hello world')` 元素被渲染为 html，并挂载到 `const container = document.getElementById('container')` 的父级元素内部

5. 当前这里没有处理 **多个子节点** 的情况，也就是 `createElement.js` 中 `else if ` 判断没有做更改，下一节进行完善

## 7、手写递归创建子节点

1. 这里就会遇到一个问题，当对虚拟节点中的子节点（存在多个时）进行递归调用时候，会发现要调用`createElement.js` 中`createElement`的方法，可是`createElement` 是有两个参数的，而第二个参数 是要指定一个标杆节点，而对于子节点来说，当然没有标杆节点，这就产生了矛盾，所以要对`createElement` 函数以及涉及到的其他函数进行修改

2. 修改情况如下

   ```javascript
   // createElement.js
   /**
    * 真正 创建节点，将 vNode 创建为dom，是孤儿节点，不进行插入，因为子节点需要递归，而子节点有没有标杆
    * @param {*} vNode
    * @param {*} pivot
    */
   export default function createElement(vNode) {
     const domNode = document.createElement(vNode.sel)
     // 判断有子节点还是有文本
     if ((vNode.text !== '') && (vNode.children === undefined || vNode.children.length === 0)) {
       // 它的内部是文字
       domNode.innerText = vNode.text
       //--------这是新增的---------------------
       // 补充 elm 属性
       vNode.elm = domNode
       //-----------------------------
     } else if (Array.isArray(vNode.children) && vNode.children.length > 0) {
       console.log('这里进行处理多个子节点的循环处理')
       // 它内部是子节点，需要进行 递归创建子节点
     }

     //--------这是新增的---------------------
     // 返回 elm，是一个纯 DOM 节点
     return vNode.elm
     //-----------------------------
   }
   // patch.js
   function patch(oldVNode, newVNode) {
     ...
     if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
       console.log('是同一个节点，需要做精细化比较')
     } else {
       //--------这是我改变的---------------------
       console.log('不是同一个节点，暴力插入新的，删除旧的')
       const newVNodeElm = createElement(newVNode)
       if (oldVNode.elm.parentNode && newVNodeElm) {
         oldVNode.elm.parentNode.insertBefore(newVNodeElm, oldVNode.elm)
       }
       // 删除 老节点
       oldVNode.elm.parentNode.removeChild(oldVNode.elm)
       //-----------------------------
     }
   }

   ```

3. 接下来我们更改`index.js` 文件中的 虚拟节点内容，使其拥有多个子节点，例如

   ```javascript
   ...
   const vnode1 = h('h1', {}, [
     h('h2', {}, 'hello world'),
     h('h2', {}, 'hello world'),
     h('h4', {}, 'hello world'),
     h('h5', {}, 'hello world'),
     h('h6', {}, 'hello world'),
     h('h7', {}, [
       h('ul', {}, [
         h('li', {}, 'hello world1'),
         h('li', {}, 'hello world2'),
         h('li', {}, 'hello world3'),
       ]),
     ]),
   ])
   ...

   ```

4. `createElement.js` 内容就要用做如下更改

   ```javascript
   export default function createElement(vNode) {
   	...
     if ( (vNode.text !== '') && (vNode.children === undefined || vNode.children.length === 0)) {
       ...
     } else if(Array.isArray(vNode.children) && vNode.children.length > 0){
       console.log('这里进行处理多个子节点的循环处理')
       // 它内部是子节点，需要进行 递归创建子节点
       for (let index = 0; index < vNode.children.length; index++) {
         const node = vNode.children[index]
         let nodeDOM = createElement(node)
         domNode.appendChild(nodeDOM)
       }
       vNode.elm = domNode
     }
     // 返回 vNode.elm，是一个纯 DOM 节点
     return vNode.elm
   }
   ```

5. 这里其实就完成了 **不是同一个虚拟节点** 以后进行的 **暴力删除旧的，新建新的(创建子节点时，所有子节点需要递归列出来的)** 这个分支的流程，可以进行如下代码测试

   ```javascript
   // 对于不同的节点
   const vnode2 = h('div', {}, [
     h('h1', {}, '我是新的H1'),
     h('h2', {}, '我是新的H2'),
   ])
   const btn = document.createElement('button')
   btn.innerText = '点击我进行内容更新'
   btn.addEventListener('click', function () {
     patch(vnode1, vnode2)
   })
   document.body.appendChild(btn)
   
   // 点击按钮后可以看到 页面内容 由虚拟节点 vnode1 产生的 DOM 换成了 由 vnode2 产生的 DOM
   ```

## 8、手写新旧节点 text 的不同情况

1. 这里接着进行**是同一个节点，需要做精细化比较**之后的逻辑处理

   - `newVNode`和`oldVNode`是同一个节点，直接结束
   - 如果不是同一个节点
     - 判断`newVNode`有没有`text`属性

2. 具体看以下代码

   ```javascript
   // patch.js
   function patch(oldVNode, newVNode) {
   	...
     if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
       console.log('是同一个节点，需要做精细化比较')
       // 在内存中是不是同一个节点
       if (oldVNode === newVNode) {
         return
       }
       // 判断 newVNode 有没有 text 属性
       if (newVNode.text !== undefined && (newVNode.children === undefined || newVNode.children.length === 0)) {
         console.log('判断 newVNode 有 text 属性')
         if (newVNode.text !== oldVNode.text) {
           // 把 oldVNode.elm 中的text 变为 newVNode 中的text(即使 oldVNode 有children属性，innerText一旦改变后，老children也就没了)
           oldVNode.elm.innerText = newVNode.text
           return
         }
       } else {
         // 如果 newVNode 没有 text 属性
         // 判断 oldVNode 有没有 children
         if (oldVNode.children !== undefined && oldVNode.children.length > 0) {
           // 老的节点有 children，此时是最复杂的情况，就是新老节点都有 children
   
         } else {
           // 老的没有 children 新的有 children
           oldVNode.elm.innerText = ''
           newVNode.children.forEach((node) => {
             const newNodeDom = createElement(node)
             oldVNode.elm.appendChild(newNodeDom)
           })
         }
       }
     } else {
      	...
     }
   }
   ```

3. 测试代码

   对于同一个节点，`newVNode`有`tex`属性，`index.js`中的虚拟节点更改如下：

   ```javascript
   const vnode1 = h('h1', { key: 'first' }, 'hello world')
   const vnode2 = h('h1', { key: 'first' }, 'hello world12222')
   ```

   对于同意节点，`newVnode`没有`text`属性，`index.js`中的虚拟节点更改如下：

   ```javascript
   const vnode1 = h('h1', { key: 'first' }, 'hello world')
   const vnode2 = h('h1', { key: 'first' }, [
     h('h2', {}, 'hello world'),
     h('h3', {}, 'hello world'),
     h('h4', {}, 'hello world'),
     h('h5', {}, 'hello world'),
     h('h6', {}, 'hello world'),
     h('h7', {}, [
       h('ul', {}, [
         h('li', {}, 'hello world1'),
         h('li', {}, 'hello world2'),
         h('li', {}, 'hello world3'),
       ]),
     ]),
   ])
   ```

## 9、Diff 算法的字节点更新策略

### 9.1 经典的 Diff 算法优化策略

这里就需要提到四中命中查找了。**newVNode 的头和尾 ：新前和新后，oldVNode的头和尾：旧前和旧后。** 为什么这种算法优秀，因为它符合人们的编程习惯。

定义四个指针 **newStartIndex,  newEndIndex, oldStartIndex, oldEndIndex**, 同时四个指针对应四个节点：**newStartNode,、newEndNode、oldStartNode、oldEndNode**; 当  <font color="red">oldStartIndex<=oldEndIndex && newStartIndex <= newEndIndex</font>  时候就进行while循环。循环结束后，就可以根据判断，新的节点是要插入节点还是删除节点，做最后的删除或者新增操作。

四种命名查找：

* 新前与旧前
* 新后与旧后
* 新后与旧前
* 新前与旧后

**命中其中一种就不就行其它三种的判断了**，如果都没有命中，就需要用循环来寻找了。
