# 09: runtime 统一运行时- 构建 renderer 渲染器

## 01: 前言

从本章开始我们将要在 `VNode` 的基础上构建 `renderer 渲染器`

根据上一章中的描述我们知道，在 `packages/runtime-core/src/renderer.ts`中存放渲染相关的内容

`Vue` 提供了一个 `baseCreateRenderer` 的函数，该函数会返回一个对象，我们把这个返回的这个对象叫做 `renderer 渲染器`

对于该对象而言，提供了三个方法

1. `render: 渲染函数`
2. `hydrate: 服务端渲染相关`
3. `createApp：构建vue项目的开始`

查看`baseCreateRenderer`的代码，我们也可以发现整个 `baseCreateRenderer` 包含了 2000 行代码，可见整个渲染器是非常复杂的

所以说，对于我们的实现而言，还是和之前一样，我们将谨遵**没有使用就当不存在**和**最少代码的实现逻辑**这两个核心思想，类构建整个 `render` 的过程

在实现 `render` 的过程中，我们也会和学习 `h函数` 一样，利用 `h函数` 时的测试实例，配合上 `render` 函数来分类型进行依次处理

那么明确好了这些内容之后 ，我们下面就来进入渲染器的世界吧

## 02: 源码阅读：初见 render 函数，ELEMENT 节点的挂载操作

在上一小节，我们实现过一个这样的测试案例：`packages/vue/examples/mine/runtime/h-element.html`

```html
<script>
  const { h, render } = Vue
  // <div :class="{ red: true }"></div>
  const vnode = h('div', { class: 'test' }, 'hello render')
  render(vnode, document.querySelector('#app'))
</script>
```

这样我们可以得到一个对应的 `VNode`，我们可以使用 `render` 函数来渲染它

```typescript
render(vnode, document.querySelector('#app'))
```

我们可以在 `packages/runtime-core/src/renderer.ts`的第 2327 行，增加 `debugger`

1. 进入 `render 函数`

2. `render 函数`接收三个参数

   1. `vnode 虚拟节点`
   2. `container 容器`
   3. `isSVG 是否是SVG`

3. 执行 `patch(container._vnode ||null, vnode, container, null, null, null, isSVG)`

   1. 根据我们之前所说，我们知道 `patch` 表示更新节点，这里传递的参数我们主要关注**前三个**

   2. `container._vnode` 表示**旧节点(n1)**,`vnode`表示**新节点（n2）**，`container`表示**容器**

   3. 执行 `switch case 到 if(shapeFlag & ShapeFlags.ELEMENT )`

      1. 我们知道此时 `shapeFlag` 为 9，转换为二进制

         ```javascript
         00000000 00000000 00000000 00001001
         ```

      2. `ShapeFlags.ELEMENT` 的值为 1，转换为二进制是

         ```javascript
         00000000 00000000 00000000 00000001
         ```

      3. 进行按位与或，得到的二进制结果是

         ```javascript
         00000000 00000000 00000000 00000001 // 十进制 的 1
         ```

      4. 即 `if(shapeFlag & ShapeFlags.ELEMENT ) `

      5. 所以会进入 `if`

   4. 触发 `processElement` 方法

      1. 进入 `processElement` 方法

      2. 因为当前为**挂载操作**，所以**没有旧节点，即 n1 === null**

      3. 触发 `mountElement` 方法，即**挂载方法**

         1. 进入 `mountElemen` 方法

         2. 进入 `el = vnode.el = hostCreateElement(...)` 该方法为创建 Element 的方法

            1. 进入该方法，可以发现该方法指向 `packages/runtime-core/src/nodeOps.ts` 中的 `createElement` 方法
            2. 不知道大家还记不记得，之前我们说过：`vue` 为了保持兼容性，把所有和浏览器相关的 `API `封装到了 `runtime-core` 中
            3. 在 `createElement` 中的代码非常简单就是通过 `document.createElement` 方法`创建 dom`，并返回

         3. 此时 `el` 和 `vnode.el` 的值为 `createElement` 生成的 `div 实例`

         4. 接下来处理 子节点

         5. 执行 `if（shapeFlag & shapeFlags.TEXT_CHILDREN）`同样的按位与或&，大家可以自己进行下二进制的转换

         6. 触发 `hostSetElementText` 方法

            1. 进入该方法，同样指向 `packages/runtime-dom/src/nodeOps.ts`下的 `setElementText`方法
            2. 里面的代码非常简单，只有一行 `el.textContext = text`

         7. 那么至此 `div` 已经生成，并且 `textContent` 存在值，如果此时触发 `div 的 outerHTML`方法，得到 `<div>hello render</div>`

         8. 那么此时我们只缺少 `class` 属性了，所以接下来进入 `props` 的处理

         9. 执行 `for 循环`，进入 `hostPatchProp `方法，此时`key = class`,`props = { class: "text"}`

            1. 进入 `hostPatchProp` 方法

            2. 该方法位于 `packages/runtime-dom/src/patchProp.ts` 下的 `patchProp` 方法

            3. 此时 `key === class` 所以会触发 `patchClass`

               1. 进入 `patchClass`，我们可以看到它内部的代码也比较简单，主要分成了三种情况处理

                  ```typescript
                  export function patchClass(
                    el: Element,
                    value: string | null,
                    isSVG: boolean
                  ) {
                    // directly setting className should be faster than setAttribute in theory
                    // if this is an element during a transition, take the temporary transition
                    // classes into account.
                    const transitionClasses = (el as ElementWithTransition)._vtc
                    if (transitionClasses) {
                      value = (
                        value
                          ? [value, ...transitionClasses]
                          : [...transitionClasses]
                      ).join(' ')
                    }
                    //  以下三种方式
                    if (value == null) {
                      el.removeAttribute('class')
                    } else if (isSVG) {
                      el.setAttribute('class', value)
                    } else {
                      el.className = value
                    }
                  }
                  ```

               2. 完成 `class 设定`

         10. 当执行完 `hostPatchProp` 之后，如果此时触发 `div`的`outerHTML`方法，将得到 `<div class="test"> hello render</div>`

         11. 现在` dom` 已经构建好了，最后就只剩下 **挂载**操作了

         12. 继续执行代码将进入 `hostInsert(el,container,anchor)` 方法

             1. 进入 `hostInsert` 方法
             2. 该方法位于 `/packages/runtime-dom/src/modules` 中的 `insert` 方法
             3. 内部同样只有一行代码： `parent.inserBefore(child, anchor | null)`
             4. 我们知道 `insertBefore` 方法可以插入到 `dom `指定区域

         13. 那么到这里，我们已经成功的把 `div` 插入到`dom树`中，执行完成 `hostInsert`方法之后，浏览器会出现对应的 `div`

      4. 至此，整个 `patchElement` 执行完成

4. 执行`container._vnode = vnode`为**旧节点赋值**

由以上代码可知，

1. 整个挂在 `Element | Text_Children` 的过程可以分为以下步骤
   1. 触发 `patch` 方法
   2. 根据 `shapeFlag` 的值，判断触发 `processElement` 方法
   3. 在 `processElement` 中，根据**是否存在 就 VNode**来判定触发**挂载**还是**更新**的操作
      1. 挂载中分成了 4 大步
      2. 处理 `textContent`
      3. 处理 `patch`
      4. 挂载 `dom`
   4. 通过 `container._vnode = vnode` 为**旧节点赋值**

## 03：框架实现：构建 renderer 基本架构

在上一小节中，我们明确了 `render` 渲染 `Element | Text_Children` 的场景，那么接下来我们就可以根据阅读的源码来实现对应的框架渲染器了

实现渲染器的过程我们将分为两个部分

1. 搭建出 `renderer` 的基本架构，我们知道对于 `renderer` 而言，它内部分为 `core` 和 `dom` 两个部分，那么这两个部分怎么交互，我们都会在基本架构这里进行处理
2. 处理具体的 `procesElement`方法逻辑

那么这一小节，我们就先做一部分：搭建出 `renderer` 的基本架构

整个**基本架构**应该分为**三部分**进行处理

1. `renderer` 渲染器本身，我们需要构建出 `baseCreateRenderer` 方法
2. 我们知道所有和 `dom` 的操作都是与`core` 分离的，而和 `dom` 的操作包含了两个部分
   1. `Element操作`：比如 `insert`、 `createElement`等，这些将被放入到 `runtime-dom` 中
   2. `props操作`：比如**设置类名**，这些也将被放入到 `runtime-dom` 中

### renderer 渲染器本身

1. 创建`packages/runtime-core/src/renderer.ts`文件

   ```typescript
   import { ShapeFlags } from 'packages/shared/src/shapeFlags'
   import { Fragment, Text, Comment } from './vnode'

   export interface RendererOptions {
     /**
      * 未指定的 element 的 props 打补丁
      */
     patchProp(el: Element, key: string, preValue: any, nextValue: any): void
     /**
      * 未指定的 element 设置 textContent
      */
     setElementText(node: Element, text: string): void
     /**
      * 插入指定的 el 到 parent 中，anchor 表示插入的位置，即：锚点
      */
     insert(el, parent: Element, anchor?): void
     /**
      * 创建 element
      */
     createElement(type: string)
   }

   export function createRenderer(options: RendererOptions) {
     return baseCreateRender(options)
   }

   export function baseCreateRender(options: RendererOptions) {
     const {
       createElement: hostCreateElement,
       insert: hostInsert,
       patchProp: hostPatchProp,
       setElementText: hostSetElementText,
     } = options

     const processElement = (oldVNode, newVNode, container, anchor) => {
       if (oldVNode == null) {
         // 挂载节点
         mountElement(newVNode, container, anchor)
       } else {
         //  更新节点
       }
     }

     const mountElement = (vnode, container, anchor) => {
       const { type, props, children, shapeFlag } = vnode
       //  1. 创建 element
       const el = (vnode.el = hostCreateElement(type))
       //  2. 设置文本
       if (shapeFlag && ShapeFlags.TEXT_CHILDREN) {
         hostSetElementText(el, children)
       } else if (shapeFlag && ShapeFlags.ARRAY_CHILDREN) {
       }
       //  3. 设置 props
       if (props) {
         for (const key in props) {
           hostPatchProp(el, key, null, props[key])
         }
       }
       //  4. 插入
       hostInsert(el, container, anchor)
     }

     const patch = (oldVNode, newVNode, container, anchor) => {
       if (oldVNode === newVNode) {
         return
       }
       const { type, shapeFlag } = newVNode
       switch (type) {
         case Text:
           break
         case Comment:
           break
         case Fragment:
           break
         default:
           if (shapeFlag && ShapeFlags.ELEMENT) {
             processElement(oldVNode, newVNode, container, anchor)
           } else if (shapeFlag & ShapeFlags.COMPONENT) {
             // TODO
           }
           break
       }
     }
     const render = (vnode, container) => {
       if (vnode === null) {
         // TODO 卸载
       } else {
         // 打补丁
         patch(container._vnode || null, vnode, container, null)
       }
       container._vnode = vnode // 更新旧节点
     }
     return {
       render,
     }
   }
   // packages/runtime-core/src/index.ts 导出 createRenderer 函数
   export { createRenderer } from './renderer'
   ```

2. 导出 `render` 函数

   1. 在`/packages/runtime-dom/src/index.ts`下添加如下代码

      ```typescript
      import { extend } from '@vue/shared'
      import { createRenderer } from '@vue/runtime-core'
      import { nodeOps } from './nodeOps'
      import { patchProp } from './patchProp'

      export const render = (...args) => {
        ensureRender().render(...args)
      }
      let renderer
      const rendererOptions = extend({ patchProp }, nodeOps)

      function ensureRender() {
        return renderer || (renderer = createRenderer(rendererOptions))
      }
      ```

   2. 新建`/packages/runtime-dom/src/nodeOps.ts`文件，代码内容如下

      ```typescript
      const doc = document
      export const nodeOps = {
        insert: (child, parent, anchor) => {
          parent.insertBefore(child, anchor || null)
        },
        createElement: (tag: string): Element => {
          const el = doc.createElement(tag)
          return el
        },
        setElementText: (el: Element, text: string) => {
          el.textContent = text
        },
      }
      ```

   3. 新建`packages/runtime-dom/src/patchProp.ts`文件，内容如下

      ```typescript
      // @vue/shared
      const ONRE = /^on[^a-z]/
      export const isOn = (key: string): boolean => ONRE.test(key)

      // patchProp.ts
      import { isOn } from '@vue/shared' // 新增加的工具函数，是否以 on 开头
      import { patchClass } from './modules/class'

      export const patchProp = (el: Element, key, preValue, nextValue) => {
        if (key === 'class') {
          patchClass(el, nextValue)
        } else if (key === 'style') {
        } else if (isOn(key)) {
        } else {
        }
      }
      ```

   4. 新建`packages/runtime-dom/src/modules/class.ts`文件，内容如下

      ```typescript
      export function patchClass(el: Element, value: string | null) {
        if (value === null) {
          el.removeAttribute('class')
        } else {
          // 疑问：这里为什么不用 setAttributes
          el.className = value
        }
      }
      ```

   5. `vue/src/index.ts`导出`render`函数

      ```typescript
      export { render } from '@vue/runtime-dom'
      ```

3. 编写测试示例`packages/vue/examples/run-time/render-element.html`,内容如下

   ```html
   <script>
     const { h, render } = Vue
     const vnode = h('div', { class: 'test' }, 'hello render')
     render(vnode, document.querySelector('#app'))
   </script>
   ```

4. 效果如下

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b20f48939e8643bc8e7054d16fd8f530~tplv-k3u1fbpfcp-watermark.image?)

## 04：框架实现：渲染更新，ELEMENT 节点的更新实现

1. 继续完善`render`函数，之前已经完成了挂载节点，接下来继续实现更新节点，`packages/runtime-core/src/renderer.ts`

   ```typescript
   import { EMPTY_OBJ } from '@vue/shared'
   
   export function baseCreateRender(options: RendererOptions) {
     const processElement = (oldVNode, newVNode, container, anchor) => {
       if (oldVNode == null) {
         // 挂载节点
       } else {
         // 更新节点
         patchElement(oldVNode, newVNode)
       }
     }
   
     const patchElement = (oldVNode, newVNode) => {
       const el = (newVNode.el = oldVNode.el)
       const oldProps = oldVNode.props || EMPTY_OBJ
       const newProps = newVNode.props || EMPTY_OBJ
       // 比较新旧节点的 children 进行更新
       patchChildren(oldVNode, newVNode, el, null)
       // 比较新旧节点的 属性 props 进行更新
       patchProps(el, newVNode, oldProps, newProps)
     }
     // patchChildren 函数需要分为多种情况
     const patchChildren = (oldVNode, newVNode, container, anchor) => {
       const c1 = oldVNode && oldVNode.children
       const prevShapeFlag = oldVNode ? oldVNode.shapeFlag : 0
       const c2 = newVNode && newVNode.children
       const { shapeFlag } = newVNode
       // 注意：子类 children 有三种可能：text array 或者 没有 children
       // 1. 当新节点的 children 是 text 类型时
       // 		1.1 如果 旧节点的 children 是 array 类型时，xxxx
       // 		1.2 否则，都是字符串类型那个，当前后不相等时候，直接调用 hostSetElementText
       if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
         if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
           // TODO 卸载旧子节点
         }
         if (c2 !== c1) {
           // 挂在新子节点的文本即可
           hostSetElementText(container, c2)
         }
       } else {
         // 2.  否则，新节点的 children 类型不是 text，又分情况
         //    2.1 当旧节点的 children 类型是 array 类型时
         // 		 	2.1.1 如果新节点 children 类型也是 array, 需要做 diff 处理
         //    	2.1.2 否则新节点不是array，也不是 text，直接卸载旧的 children 即可
         if (prevShapeFlag && ShapeFlags.ARRAY_CHILDREN) {
           if (shapeFlag && ShapeFlags.ARRAY_CHILDREN) {
             // TODO Diff
           } else {
             // TODO 卸载式操作
           }
         } else {
           // 2.2 否则，新节点 是 text 或者空
           // prev children was text OR null
           // new children is array OR null
           // 如果 旧节点是 text 类型，那么删除 旧节点 text 内容即可
           if (prevShapeFlag && ShapeFlags.TEXT_CHILDREN) {
             // 删除纠结点的text
             hostSetElementText(container, '')
           }
           // 如果 新节点 children 是 array 类型
           if (shapeFlag && ShapeFlags.ARRAY_CHILDREN) {
             // TODO 单独新子节点的挂载
           }
         }
       }
     }
     // 比较新旧接节点的 props
     const patchProps = (el: Element, vnode, oldProps, newProps) => {
       // 如果前后节点 props 不相等
       if (oldProps !== newProps) {
         // 遍历新节点，如果 旧节点中的值与新节点的值不相等，旧更新这个 key
         for (const key in newProps) {
           const next = newProps[key]
           const prev = oldProps[key]
           if (next !== prev) {
             hostPatchProp(el, key, prev, next)
           }
         }
         // 如果旧节点不是 空对象，
         if (oldProps !== EMPTY_OBJ) {
           // 遍历旧节点，如果在新节点中这个 key 不存在，就更新此属性 key 为null
           for (const key in oldProps) {
             if (!(key in newProps)) {
               hostPatchProp(el, key, oldProps[key], null)
             }
           }
         }
       }
     }
   }
   ```

## 05：框架实现：处理新旧节点不同元素时，ELEMENT节点的更新

> 经过源码查看，我们知道处理新旧不同节点的时候，我们是先删除旧节点，然后挂载新节点实现的

1. 先到 `renderer` 函数里面，找到其中的 `patch函数`

   ```typescript
   // packages/runtime-core/src/vnode
   export interface VNode {
     type: any
     __v_isVNode: true
     props: any
     children: any
     shapeFlag: number
     key: any // 增加key 属性
   }
   
   // @vue/shared  增加工具函数
   import { VNode } from 'packages/runtime-core/src/vnode'
   export const isSameVNodeType = (n1: VNode, n2: VNode) => {
     return n1.key === n2.key && n1.type === n2.type
   }
   
   // renderer.ts
   export function baseCreateRender(options: RendererOptions) {
   
     const {
       removeElement: hostRemoveElement  // 新增加
     } = options
     
    	const unmount = vnode => {
       // 删除旧节点
       hostRemoveElement(vnode.el)
     }
     const patch = (oldVNode, newVNode, container, anchor) => {
       if (oldVNode === newVNode) {
         return
       }
       // 接下来处理 新旧节点不一致的情况
       if (oldVNode && !isSameVNodeType(oldVNode, newVNode)) {
         // 删除旧节点
         unmount(oldVNode)
         // 旧节点置为 null,然后后续 进行 processElement 时候会重新挂载新节点
         oldVNode = null
       }
       // 接下如之前，进行 type 的 switch case 不同情况的处理
       const { type, shapeFlag } = newVNode
       ...
     }
     ...
   }
   ```

2. 在`packages/runtime-dom/src/nodeOps.ts`中增加 `removeElement`方法

   ```typescript
   export const nodeOps = {
     removeElement: (el: Element) => {
       const parent = el.parentNode
       if (parent) {
         parent.removeChild(el)
       }
     }
   }
   ```

3. 创建测试示例代码`packages/vue/example/run-time/render-component-update-2.html`,内容如下

   ```html
   <script>
     const { h, render } = Vue
     const vnode = h('div', { class: 'test' }, 'hello render')
     render(vnode, document.querySelector('#app'))
   
     setTimeout(() => {
       const vnode2 = h('div', { class: 'active' }, 'update')
       render(vnode2, document.querySelector('#app'))
     }, 2000)
     setTimeout(() => {
       const vnode3 = h('p', 'update 标签为 p')
       render(vnode3, document.querySelector('#app'))
     }, 5000)
   </script>
   ```

4. 可以看到页面显示效果

   1. 先显示 **class为 test**， 内容显示 **hello render 的 div 元素**
   2. 2s后，内容变为 **update**, 属性 **class 变为 active**
   3. 再3s后，内容变为 **update 标签为 p**，**class **属性消失

## 06：框架实现：删除元素，ELEMENT节点的卸载操作

那么现在对于我们的代码而言，他已经有了一个 unmount 函数，那么接下来我们就可以基于这个函数来实现某个元素的卸载操作，比如，新增测试用例为如下

1. 新增`packages/vue/example/run-time/render-element-remove.html`，如下

   我们

   ```html
   <script>
     const { h, render } = Vue
     const vnode = h('div', { class: 'test' }, 'hello render')
     render(vnode, document.querySelector('#app'))
   
     setTimeout(() => {
       // 把上一次的 元素卸载
       render(null, document.querySelector('#app'))
     }, 2000)
   </script>
   ```

2. 继续完善`render`函数，修改`packages/runtime-core/src/renderer.ts`

   ```typescript
   export function baseCreateRender(options: RendererOptions) {
     ...
     const render = (vnode, container) => {
       if (vnode === null) {
         // 当传入的新节点为空，但是旧节点存在
         if(container._vnode){
           // 直接对旧节点进行 卸载 即可
           unmount(container._vnode)
         }
       } else {
         // 打补丁
         patch(container._vnode || null, vnode, container, null)
       }
       container._vnode = vnode // 更新旧节点
     }
     return {
       render
     }
   }
   ```

3. 运行测试示例，看到页面中 2s 后，元素消失

## 07：深入属性挂载：HTML Attributes 和 DOM Properties

当我们为一个 DOM 设置对应属性的时候，其实分成了两种情况

1. `HTML Attributes`
2. `DOM Properties`

那么想要搞明白，上一小节中所出现的问题的原因，我们就需要搞明白上面的两种情况指的是什么意思

### HTML Attributes

[HTML Attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes) 所代表的是**定义在 HTML 标签上的属性**。比如我们以以下 DOM 为例

```html
<textarea class="test-class" type="text">textarea value</textarea>
```

这里 HTML Attributes 指的就是 class="test-class" 和 type="text"

### DOM Properties

[DOM Properties](https://developer.mozilla.org/zh-CN/docs/Web/API/element)  所代表的就是在**DOM对象上的属性**，比如下面的

```javascript
const el = document.querySelector("textarea")
```

我们就可以通过 . 的形式获取对应的属性

```html
el.type // "textarea"
el.className // "test-class"
el.value // "textarea-value"
```

### 对比

然后我们对比 HTML Attributes 和 DOM Properties  可以发现双方对于**同样属性的描述是不同的**，而这个是`HTML Attributes`和`DOM Properties`之间的关键

那么明确好了这个之后，我们再来看对应方法，根据上一小节的代码，我们可以知道，设置属性，我们一共使用了两个方法

1. [Element.setAttribute](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute): 该方法**可以设置指定元素上的某个属性值**
2. [dom.xx](https://developer.mozilla.org/zh-CN/docs/Web/API/element#%E5%B1%9E%E6%80%A7)：相当于**直接修改指定对象的属性**

但是这两个方式却有一个很尴尬的问题，那就是**属性名不同**

比如

1. 针对于 `class` 获取
   1. `HTML Attributes`：`el.getAttribute("class")`
   2. `DOM Properties`: `el.className`
2. 针对于 `textarea` 的 `type` 获取
   1. `HTML Attributes`：`el.getAttribute('type')`
   2. `DOM Properties`: `el.type 无法获取`
3. 针对于 `textarea` 的`value` 获取
   1. `HTML Attributes`：`el.getAttribute('value')无法获取`
   2. `DOM Properties`: `el.value`

所以为了解决这种问题，咱们就必须要能够**针对不同属性，通过不同方式**进行属性指定。**所以**，vue **才会通过一系列的判断进行处理**，有些判断会最终通过`setAttribute`来处理，而有些判断会最终通过 `el[key]` 的形式来处理，本质原因就是`HTML Attribute`和`DOM Properties`不一样导致的。

源码中的`pathDomProps`是用来处理`DOM Properties`的，而`patchAttr`方法是用来处理`HTML Attributes`的属性指定

接下来我们来看一个比较特殊的属性`class`,通过上面的演示我们知道，无论是通过`el.setAttribute('class')`还是`el.className`来进行指定，最终都可以达到效果。但是查看源码中有这样一段代码

```typescript
export function patchClass(el: Element, value: string | null, isSVG: boolean) {
  const transitionClasses = (el as ElementWithTransition)._vtc
  if (transitionClasses) {
    
  }
  if (value == null) {
    
  } else if (isSVG) {
    el.setAttribute('class', value)  // 这里用了 setAttribute("class", xxx)来处理
  } else {
    el.className = value // 这里又通过 el.className 形式来处理
  }
}
```

那么他为什么要这么做呢，我们先看下面的一个测试示例文件`/packages/vue/examples/mine/attrVsProps.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>attr Vs Props</title>
  </head>
  <body>
    <div id="app"></div>
    <div id="app1"></div>
  </body>
  <script>
    const div1 = document.querySelector('#app')
    const div2 = document.querySelector('#app1')

    console.time('className')
    for (let index = 0; index < 10000; index++) {
      div1.className = 'test1'
    }
    console.timeEnd('className')
    console.time('attrs')
    for (let index = 0; index < 10000; index++) {
      div2.setAttribute('class', 'test2')
    }
    console.timeEnd('attrs')
  </script>
</html>
```

运行代码，查看控制台的打印时间

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb26a7a9fc13418ab7856f1b5d38457c~tplv-k3u1fbpfcp-watermark.image?)

可以看出来

**通过 className 形式设置的耗时要 快于 通过 attrs 形式来处理 class 的时间的**，所以在 `vue` 源码中，才会这样处理：除了 `SVG 元素`采用 `setAttribute` 形式处理 `class` 以外，其他的元素处理 `class` 采用 `className` 形式

知悉：**设置 class 时，className 的形式处理性能要优于 attributes 的形式处理**

## 08： 框架实现：区分处理ELEMENT节点的各种属性挂载

上一小节我们了解了设置属性的多种方式以及它们的不同

1. 修改`packages/runtime-dom/src/patchProp.ts`文件，

   ```typescript
   import { patchAttr } from './modules/attr'
   import { patchDomProp } from './modules/prop'
   export const patchProp = (el: Element, key, preValue, nextValue) => {
     if (key === 'class') {
       patchClass(el, nextValue)
     } else if (key === 'style') {
     } else if (isOn(key)) {
       
     } else if (shouldSetAsProp(el, key)) { 
       // 新增的
       patchDomProp(el, key, nextValue)
     } else {
       patchAttr(el, key, nextValue)
     }
   }
   
   
   function shouldSetAsProp(el: Element, key: string) {
     if (key === 'form') {
       // #1787, #2840 form 表单元素的表单属性是只读的，必须设置为属性 attribute
       return false
     }
     // #1526 <input list> 必须设置为属性 attribute
     if (key === 'list' && el.tagName === 'INPUT') {
       return false
     }
     // #2766 <textarea type> 必须设置为属性 attribute
     if (key === 'type' && el.tagName === 'TEXTAREA') {
       return false
     }
     return key in el
   }
   ```

2. 创建`packages/runtime-dom/src/modules/attr.ts`文件，内容如下

   ```typescript
   export function patchAttr(el: Element, key: string, value: any) {
     if (value === null) {
       el.removeAttribute(key)
       return
     }
     el.setAttribute(key, value)
   }
   ```

3. 创建`packages/runtime-dom/src/modules/prop.ts`文件，内容如下

   ```typescript
   export function patchDomProp(el: Element, key: string, value: any) {
     try {
       el[key] = value
     } catch (error) {}
   }
   ```

4. 增加测试用例`packages/vue/examples/run-time/render-element-props.html`,内容如下

   ```html
   <script>
     const { h, render } = Vue
     const vnode = h(
       'textarea',
       { class: 'test', value: 'textarea value', type: 'text' },
       'hello render'
     )
     render(vnode, document.querySelector('#app'))
   </script>
   ```

5. 打开浏览器，页面内容如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d23bf93498a4a1c844cdd31ed507312~tplv-k3u1fbpfcp-watermark.image?)

## 09：框架实现：ELEMENT节点下，style属性的挂载和

