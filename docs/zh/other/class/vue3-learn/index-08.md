# 08-runtime 运行时-构建 h 函数，生成 Vnode

## 01：前言

本章中，我们先来处理 h 函数的构建

我们知道 h 函数核心是用来：**创建 VNode 的**。但是对于 VNode 来说，它存在很多不同的节点类型

查看`packages/runtime-core/src/renderer.ts`中的第 354 行 patch 方法的代码可知，vue 总共处理了

1. `Text`：文本节点
2. `Comment`：注释节点
3. `Static`: 静态 DOM 节点
4. `Fragment`：包含多个根节点的模板被表示为一个片段（`Fragment`）
5. `ELEMENT`：DOM 节点
6. `COMPONENT`：组件
7. `TELEPORT`：新的内置组件
8. `SUSPENSE`：新的内置组件
9. 。。。

各种不同类别的节点，而每一种类型的处理都对应着不同的`VNode `

所以我们在本章节中，就需要把各种类型的 VNode 构建出来（不会全部处理所有类型，只会选择比较具有代表性的部分），以便后面进行 render 渲染

那么把这些内容，明确完成之后，我们就开始本章的学习吧~~~

## 02:阅读源码：初见 h 函数，跟踪 vue3 源码实现基础逻辑

本小节我们通过 h 函数生成 Element 的 VNode 来去查看 h 函数的源码实现

1. 创建测试实例`packages/vue/examples/mine/runtime/h-element.html

   ```html
   <script>
     const { h } = Vue
     const vnode = h('div', { class: 'test' }, 'hello render')
     console.log(vnode)
   </script>
   ```

2. h 函数的代码位于`packages/runtime-core/src/h.ts`中，为 174 行增加 debugger

### h 函数

1. 代码进入 h 函数

   1. 通过源码可知，h 函数接收三个参数

   2. type：类型，比如当前的 div 就表示 Element 类型

   3. propOrChildren: props 或者 children

   4. children：子节点

   5. 在这三个参数中，第一个和第三个都比较好理解，它的第二个参数代表的是什么意思呢？查看[官方示例](https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes)可知，**h 函数存在多种调用方式**

      ```javascript
      import { h } from 'vue'

      const vnode = h(
        'div', // type
        { id: 'foo', class: 'bar' }, // props
        [
          /* children */
        ]
      )

      // 除了类型必填以外，其他的参数都是可选的
      h('div')
      h('div', { id: 'foo' })

      // attribute 和 property 都能在 prop 中书写
      // Vue 会自动将它们分配到正确的位置
      h('div', { class: 'bar', innerHTML: 'hello' })

      // 像 `.prop` 和 `.attr` 这样的的属性修饰符
      // 可以分别通过 `.` 和 `^` 前缀来添加
      h('div', { '.name': 'some-name', '^width': '100' })

      // 类与样式可以像在模板中一样
      // 用数组或对象的形式书写
      h('div', { class: [foo, { bar }], style: { color: 'red' } })

      // 事件监听器应以 onXxx 的形式书写
      h('div', { onClick: () => {} })

      // children 可以是一个字符串
      h('div', { id: 'foo' }, 'hello')

      // 没有 props 时可以省略不写
      h('div', 'hello')
      h('div', [h('span', 'hello')])

      // children 数组可以同时包含 vnodes 与字符串
      h('div', ['hello', h('span', 'hello')])
      ```

      1. 这些内容在源码中也存在对应的说明（查看 h.ts 的顶部注释）。并且这种方式在其他的框架或者 web api 中也是比较常见的
      2. 那么这样的功能是如何实现的呢？我们来继续看代码

2. 以下为这一块的逻辑的详细注释

   ```typescript
   export function h(type: any, propsOrChildren?: any, children?: any): VNode {
     // 获取用户传递的参数数量
     const l = arguments.length
     // 如果用户只传递了两个参数，那么证明第二个参数可能是props，也可能是 children
     if (l === 2) {
       // 如果第二个参数是对象，但不是数组，则第二个参数只有两种可能性，1：VNode 2：普通的props
       if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
         // 如果是 VNode，则第二个参数代表了 children
         if (isVNode(propsOrChildren)) {
           return createVNode(type, null, [propsOrChildren])
         }
         // 如果不是 VNode，那第二个参数就代表了 props
         return createVNode(type, propsOrChildren)
       } else {
         // 如果第二个参数不是单纯的Object，则第二个参数代表了 props
         return createVNode(type, null, propsOrChildren)
       }
     } else {
       // 如果参数在三个以上，则从第三个参数开始，把后续的所有参数视为 children
       if (l > 3) {
         children = Array.prototype.slice.call(arguments, 2)
       } else if (l === 3 && isVNode(children)) {
         // 如果传递的参数只有三个，则children就是单纯的children
         children = [children]
       }
       // 触发 createVNode 方法，创建 VNode 实例
       return createVNode(type, propsOrChildren, children)
     }
   }
   ```

3. 最终代码将会触发`createVNode`方法

   1. 代码进入 `createVNode`

      1. 此时三个参数的值为
         1. `type`: div
         2. `props`: {class:"test"}
         3. `children`: hello render

   2. 代码执行

      ```javascript
      const shapeFlag = isString(type)
        ? ShapeFlags.ELEMENT
        : __FEATURE_SUSPENSE__ && isSuspense(type)
        ? ShapeFlags.SUSPENSE
        : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
        ? ShapeFlags.STATEFUL_COMPONENT
        : isFunction(type)
        ? ShapeFlags.FUNCTIONAL_COMPONENT
        : 0
      ```

   3. 最终得到`shapeFlag`的值为 1，`shapeFlag`为当前的**类型标识**

      1. 那么这个 1 代表的是什么意思呢？查看`packages/shared/src/shapeFlags.ts`的代码
      2. 根据 `enum ShapeFlag` 可知：1 代表为 `Element`
      3. 即**当前 shapeFlag = ShapeFlags.Element**

   4. 代码继续执行，触发`createBaseVNode`

      1. 进入`createBaseVNode`

      2. 执行

         ```typescript
         const vnode = {
           __v_isVNode: true,
           __v_skip: true,
           type,
           props,
           key: props && normalizeKey(props),
           ref: props && normalizeRef(props),
           scopeId: currentScopeId,
           slotScopeIds: null,
           children,
           component: null,
           suspense: null,
           ssContent: null,
           ssFallback: null,
           dirs: null,
           transition: null,
           el: null,
           anchor: null,
           target: null,
           targetAnchor: null,
           staticCount: 0,
           shapeFlag,
           patchFlag,
           dynamicProps,
           dynamicChildren: null,
           appContext: null,
         } as VNode
         ```

      3. 生成 `VNode` 对象，此时生成的 `vnode`的值为

      4. 删除对我们无用的属性之后，得到

         ```json
         {
           "children": "hello render",
           "props": { "class": "test" },
           "shapeFlag": 1, // 表示为 Element
           "type": "div",
           "__v_isVNode": true
         }
         ```

      5. 代码执行`normalizeChildren(vnode, children)`

         1. 代码进入`normalizeChildren`方法
         2. 代码进入最后的` else`, 执行 `type=ShapeFlags.TEXT_CHILDREN` 执行完成之后，`type = 8`,此时的 8 表示 `ShapeFlages.TEXT_CHILDREN`
         3. **注意**： 最后执行**vnode.shapeFlage |= type**
            1. 此时 vnode.shapeFlag 原始值为 1，即 ShapeFlags.ELEMENT
            2. type 的值为 8，即：ShapeFlags.TEXT_CHILDREN
            3. 而 |= 表示 **按位或赋值** 运算：x|=y 意为 x = x|y
               1. 即 vnode.shapeFlag |= type 表示为 vnode.shapeFlag = vnode.shapeFlag | type
               2. 代入值后表示 vnode.shapeFlag = 1|8
               3. 1 是 10 进制，转换为 32 位的二进制之后为
                  1. 00000000 00000000 00000000 00000001
               4. 8 是 10 进制，转化为 32 位的二进制之后为
                  1. 00000000 00000000 00000000 00001000
               5. 两者进行 按位或赋值之后，得到的二进制为
                  1. 00000000 00000000 00000000 00001001
                  2. 转换为 10 进制，即为 9
            4. 所以，此时 **vnode.shapeFlag 的值为 9**

至此，整个 h 函数执行完成，最终得到的打印有效值为

```javascript
{
  "children": "hello render",
  props: { class: "test" },
  shapeFlag: 9, // 表示为 ShapeFlages.TEXT_CHILDREN 的值
  type: "div",
  __v_isVNode: true
}
```

由以上代码可知

1. `h函数`内部本质上只是处理了参数的问题
2. `createVNode` 是生成 `vnode`的核心方法
3. 执行了`createBaseVNode`方法，根据`type/props/children`生成了`vnode节点`,然后利用`vnode`节点通过**按位或运算**改变了`shapeFlag`的值并赋值给了`vnode`

## 03：框架实现：构建 h 函数，处理 ELEMENT+TEXT_CHILDREN 场景

1. 新建`vue-next-mini-mine/packages/shared/src/shapeFlags.ts`文件

   ```typescript
   export const enum ShapeFlags {
     ELEMENT = 1, // type = Element
     FUNCTIONAL_COMPONENT = 1 << 1, // 函数组件
     STATEFUL_COMPONENT = 1 << 2, // 有状态（响应数据）组件
     TEXT_CHILDREN = 1 << 3, //  chldren = text
     ARRAY_CHILDREN = 1 << 4, // children =Array
     SLOTS_CHILDREN = 1 << 5, // children = slot
     TELEPORT = 1 << 6,
     SUSPENSE = 1 << 7,
     COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
     COMPONENT_KEPT_ALIVE = 1 << 9,
     // 组件：有状态（响应数据）组件|函数组件
     COMPONENT = ShapeFlags.STATEFUL_COMPONENT |
       ShapeFlags.FUNCTIONAL_COMPONENT,
   }
   ```

2. 创建`packages/runtime-core/src/h.ts`，构建`h`函数

   ```typescript
   import { isArray, isObject } from '@vue/shared'
   import { createVNode, VNode, isVNode } from './vnode'

   export function h(type: any, propsOrChildren?: any, children?: any): VNode {
     const length = arguments.length
     if (length === 2) {
       if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
         if (isVNode(propsOrChildren)) {
           return createVNode(type, null, [propsOrChildren])
         }
         return createVNode(type, propsOrChildren, [])
       }
       return createVNode(type, null, propsOrChildren)
     } else {
       if (length > 3) {
         children = Array.prototype.slice.call(arguments, 2)
       } else if (length === 3 && isVNode(children)) {
         children = [children]
       }
       return createVNode(type, propsOrChildren, children)
     }
   }

   // @vue/shared
   export const isString = (val: unknown): val is string =>
     typeof val === 'string'

   // vnode.ts
   import { isArray, isString } from '@vue/shared'
   import { ShapeFlags } from 'packages/shared/src/shapeFlags'

   export function createVNode(type, props, children): VNode {
     const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0
     return createBaseVNode(type, props, children, shapeFlag)
   }

   export interface VNode {
     type: any
     __v_isVNode: true
     props: any
     children: any
     shapeFlag: number
   }

   export function isVNode(value: any): value is VNode {
     return value && value.__v_isVNode === true
   }

   export function createBaseVNode(type, props, children, shapeFlag) {
     const vnode = {
       __v_isVNode: true,
       type,
       props,
       shapeFlag,
     } as VNode

     normalizeChildren(vnode, children)
     return vnode
   }

   export function normalizeChildren(vnode: VNode, children?: unknown) {
     let type = 0
     if (children === null) {
       children = null
     } else if (isArray(children)) {
     } else if (typeof children === 'object') {
     } else if (isString(children)) {
       children = String(children)
       type = ShapeFlags.TEXT_CHILDREN
     }
     vnode.children = children
     vnode.shapeFlag |= type
     return vnode
   }
   ```

3. 导出 h 函数

   ```typescript
   // vue-next-mini-mine/packages/runtime-core/src/index.ts
   export { h } from './h'

   // vue-next-mini-mine/packages/vue/src/index.ts
   export { queuePreFlushCb, watch, h } from '@vue/runtime-core'
   ```

4. 增加测试实例`vue-next-mini-mine/packages/vue/example/run-time/h.html`

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>h</title>
     </head>
     <body></body>
     <script src="../../dist/vue.js"></script>
     <script>
       const { h } = Vue
       const vnode = h('div', { class: 'test' }, 'hello render')
       console.log(vnode)
     </script>
   </html>
   ```

5. 运行至浏览器，查看打印效果

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b77e5bb076a4431cb357c28095f31716~tplv-k3u1fbpfcp-watermark.image?)

6. 此时就完成了 构建 h 函数，处理 ELEMENT+TEXT_CHILDREN 场景 的代码

## 04：源码阅读：h 函数，跟踪 ELEMENT+ARRAY_CHILDREN 场景下的源码实现

前两节我们处理了 h 函数下比较简单的场景：Element + Text Children

那么这一小节，我们来看 Element + Array Children

1. 修改测试实例

   ```html
   <script>
     const { h } = Vue
     const vnode = h('div', { class: 'test' }, [
       h('p', 'p1'),
       h('p', 'p2'),
       h('p', 'p3'),
     ])
     console.log(vnode)
   </script>
   ```

2. 最终打印为（剔除无用的）

   ```tonjson
   {
     "__v_isVNode": true,
     "type": "div",
     "props": { "class": "test"},
     "shapeFlag": 17
     "children": [
       {
         "__v_isVNode": true,
         "type": "p",
         "children": "p1",
         "shapeFlag": 9
       },
   		{
     	 	"__v_isVNode": true,
         "type": "p",
         "children": "p2",
         "shapeFlag": 9
     	},
       {
     	 	"__v_isVNode": true,
         "type": "p",
         "children": "p3",
         "shapeFlag": 9
     	}
     ]
   }
   ```

3. 通过上述的打印其实我们可以看出一些不同的地方

   1. `children`: 数组
   2. `shapeFlag`：17

而这两点，也是 `h 函数`处理这种场景下，最不同的地方

那么下面我们就追踪源码，来看一下这次 `h 函数`的执行逻辑，由测试实例控制，我们一共触发了 4 次 `h 函数`

1. 第一次触发`h 函数`

   ```javascript
   h('p', 'p1')
   ```

2. 进入`_createVNode`方法，测试的参数为

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c5746fade414aa192d989ca25be3991~tplv-k3u1fbpfcp-watermark.image?)

3. 触发 createBaseVNode 时， shapeFlag = 1

   1. 进入 createBaseVNode
   2. 触发 normalizeChildren(vnode, children)
      1. 此时 children 时字符串
      2. 进入 else， 执行 type = ShapeFlags.TEXT_CHILDREN 此时 type = 8
      3. 最后执行 vnode.shapeFlag |= type 得到 vnode.shapeFlag = 9

4. 以上流程与之前的看到的完全相同

接下来就是**第二次**、**第三次**触发 h 函数，这两次触发代码流程与第一次相同，我们可以跳过

1. 进入到**第四次**触发 h 函数

   ```javascript
   h('div', { class: 'test' }, [h('p', 'p1'), h('p', 'p2'), h('p', 'p3')])
   ```

2. 此时进入到 \_createVNode 时的参数为

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f79e725650647eb98eda2b094e68cc1~tplv-k3u1fbpfcp-watermark.image?)

   1. 展开 children 数据为**解析完成之后的 vnode**

      ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42102fe9db904064a556f480d1226d8b~tplv-k3u1fbpfcp-watermark.image?)

3. 代码继续，计算 `shapeFlag = 1`

4. 触发 `createBaseVNode`

   1. 进入 `createBaseVNode`

   2. 执行 `normalizeChildren(vnode, children)`

      1. 进入 `normalizeChildren`

      2. 因为当前 `children = Array`,所以代码会进入到 `else if(isArray(children))`

      3. 执行 `type = ShapeFlags.ARRAY_CHILDREN` 即 type = 16

      4. 接下来执行 `vnode.shapeFlag |= type`

         1. 此时 vnode.shapeFlag = 1, 转换为二进制

            ```javascript
            00000000 00000000 00000000 00000001
            ```

         2. 此时 type=16，转换为二进制

            ```javascript
            00000000 00000000 00000000 00010000
            ```

         3. 所以最终之后的二进制为

            ```javascript
            00000000 00000000 00000000 00010001
            ```

         4. 转换为 10 进制：17

代码执行完毕

由以上代码可知，但我们处理 `ELEMENT + ARRAY_CHILDREN` 场景时

1. 整体的逻辑没有变得很复杂
2. 第一次计算 `shapeFlag`，依然为 `Element`
3. 第二次计算 `shapeFlag`，因为 `children 为 Array`，所以会进入`else if(isArray(children))` 判断中

## 05：框架实现：构建 h 函数，处理 ELEMENT+ARRAY_CHILDREN 场景

根据上一节的分析，我们修改`normalizeChildren`函数即可

```typescript
export function normalizeChildren(vnode: VNode, children?: unknown) {
  let type = 0
  if (children === null) {
    children = null
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN // 增加此行代码
  } else if (typeof children === 'object') {
  } else if (isString(children)) {
    children = String(children)
    type = ShapeFlags.TEXT_CHILDREN
  }
  vnode.children = children
  vnode.shapeFlag |= type
  return vnode
}
```

重新运行测试实例，即可打印如下结果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a04b90bdc4c488eb2d9691bc144fa49~tplv-k3u1fbpfcp-watermark.image?)

## 06：源码阅读：h 函数，组件的本质与对应的 VNode

组件是 `vue` 中非常重要的一个概念， 这一小节我们就来看一下**组件**生成 VNode 的情况

在 `vue` 中，组件本质上是**一个对象或者一个函数（Function component）**

> 我们这里**不考虑**组件是函数的情况，因为这个比较少见

我们可以直接利用 `h 函数`+ `render 函数`渲染出一个基本的组件，在 `vue-next-3.2.37/packages/vue/examples/mine/h.html`，内容如下

```html
<script>
  const { h, render } = Vue
  const component = {
    render() {
      const vnode1 = h('div', '这是一个component')
      console.log(vnode1)
      return vnode1
    },
  }
  const vnode2 = h(component)
  console.log(vnode2)
  render(vnode2, document.querySelector('#app'))
</script>
```

运行到浏览器，可以在界面中看到相关文字**这是一个 component**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f1a662943364d4d874a433c47e4cf7e~tplv-k3u1fbpfcp-watermark.image?)

注意查看两个打印结果中的 type, 第一个打印结果(对应代码：`console.log(vnode2)`)是一个对象，展开如下

![image-20230320150715758](/Users/gaoyuan/Library/Application Support/typora-user-images/image-20230320150715758.png)

所以，`compoent 组件`节点与之前的标签节点的几个不同点

1. **type** 不同，一个是对象，一个是字符串
2. **shapeFlag** 不同
3. 其他的相同

思考：那么我们可不可以直接使用一个`VNode节点`来直接调用`render`，而跳过 h 函数的调用呢，

答案是可以的，**因为本质上 h 函数返回的是一个 VNode 节点**

我们修改上述测试代码如下

```html
<script>
  const { h, render } = Vue
  const component = {
    render() {
      // const vnode1 = h('div', '这是一个component')
      // console.log(vnode1)
      // return vnode1
      return {
        __v_isVNode: true,
        type: 'div',
        children: '这是一个component',
        shapeFlag: 9,
      }
    },
  }
  // const vnode2 = h(component)
  const vnode2 = {
    __v_isVNode: true,
    type: component,
    children: '',
    shapeFlag: 4,
  }
  console.log(vnode2)
  render(vnode2, document.querySelector('#app'))
</script>
```

重新打开浏览器，渲染页面效果一致

## 07：框架实现：处理组件的 VNode

上一节中我们说到 h 函数最终返回的是一个 VNode 节点，而对于**组件类型**，项目中没有做处理，所以我们在`vue-next-mini/packages/runtime-core/src/vnode.ts`中修改代码如下

```typescript
import { isObject } from '@vue/shared'

export function createVNode(type, props, children): VNode {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0 // 增加判断：如果是对象，类型返回：STATEFUL_COMPONENT = 1 << 2, 有状态（响应数据）组件
  return createBaseVNode(type, props, children, shapeFlag)
}
```

1. 新建`packages/vue/examples/run-time/h-component.html`文件，内容如下

   ```html
   <script>
     const { h } = Vue
     const component = {
       render() {
         const vnode1 = h('div', '这是一个component')
         console.log(vnode1)
         return vnode1
       },
     }
     const vnode2 = h(component)
     console.log(vnode2)
   </script>
   ```

2. 运行该实例，可以看到如下打印结果

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec6bded486c4415882bedc20c8935d5d~tplv-k3u1fbpfcp-watermark.image?)

3. 注意：`normalizeChildren`函数中需要处理`children`为 null 或者 undefinded 的情况

   ```typescript
   export function normalizeChildren(vnode: VNode, children?: unknown) {
     let type = 0
     if (children == null) { // 这里需要用双等号 ==
       children = null
     } else
     ...
   }
   ```

## 08：源码阅读：h 函数，跟踪 Text、Comment、Fragment 场景

当组件类型处理完成后，然后我们接下来看下`Text`、`Component`、`Fragement`这三个场景下的`VNode`

### Text

Text 标记为**文本**，即：纯文本的 VNode

创建`vue-next-3.2.37/packages/vue/examples/run-time/h-other.html`测试实例，查看`Text`的打印

```html
<script>
  const { h, render, Text, Comment, Fragment } = Vue
  const vnodeText = h(Text, '这是一个文本节点')
  console.log(vnodeText)
  // 可以通过 render 进行渲染
  render(vnodeText, document.querySelector('#app'))
</script>
```

查看打印

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1464fc7fa2a4a29bd99e8c7d43f18cf~tplv-k3u1fbpfcp-watermark.image?)

查看结果，对于 `Text` 类型，我们看到`type` 是一个 `Symbol` 类型的，`shapeFlag`是 8

### Comment

修改测试实例代码如下

```html
<script>
  const { h, render, Text, Comment, Fragment } = Vue
  const vnodeComment = h(Comment, '这是一段注释')
  console.log(vnodeComment)
  render(vnodeComment, document.querySelector('#app'))
</script>
```

查看打印

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d134c83a24b549069808358a3ae4071d~tplv-k3u1fbpfcp-watermark.image?)

可以看到 `Comment` 类型的节点 `type` 是一个`Symbol(Comment)`，`shapeFlag`是 8

### Fragment

修改测试示例

```html
<script>
  const { h, render, Text, Comment, Fragment } = Vue
  const vnodeFragment = h(Fragment, '这是一个 Fragment')
  console.log(vnodeFragment)
  render(vnodeFragment, document.querySelector('#app'))
</script>
```

查看打印

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d82d1706ea9d4268a19ee439d74d66f0~tplv-k3u1fbpfcp-watermark.image?)

可以看到 `Fragment` 类型的节点 `type` 是一个`Symbol(Fragment)`，`shapeFlag`是 8

注意：`Fragement`类型渲染出来与文本节点类型不一致，如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d76ebf5a5ac4b64966decb42ae1940e~tplv-k3u1fbpfcp-watermark.image?)

## 09: 框架实现：实现剩余场景：Text、Comment、Fragment

经过上一小节的学习，我们知道这三种类型其实只是 type 类型的不同而已

1. 修改`vue-next-mini/packages/runtime-core/src/vnode.ts`,新增如下内容

   ```typescript
   export const Fragment = Symbol('Fragment')
   export const Text = Symbol('Text')
   export const Comment = Symbol('Comment')
   ```

2. 在`runtime-core/index.ts`文件中进行导出

   ```typescript
   export { Comment, Text, Fragment } from './vnode'
   ```

3. 在`packages/vue/src/index.ts`中也进行导出

   ```typescript
   export { Text, Comment, Fragment } from '@vue/runtime-core'
   ```

4. 创建测试示例代码文件`packages/vue/examples/run-time/h-other.html`

   ```html
   <script>
     const { h, Text, Comment, Fragment } = Vue
     const vnodeText = h(Text, '这是一个文本节点')
     console.log('vnodeText', vnodeText)
     const vnodeComment = h(Comment, '这是一段注释')
     console.log('vnodeCommentv', vnodeComment)
     const vnodeFragment = h(Fragment, '这是一个 Fragment')
     console.log('vnodeFragment', vnodeFragment)
   </script>
   ```

5. 查看打印结果

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f029ceb43cfa412a9353e4f08236784a~tplv-k3u1fbpfcp-watermark.image?)

## 10：源码阅读：对 class 和 style 的增强处理

Vue 中对 [class 和 style](https://cn.vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings)做了专门的增强处理，使其可以支持 `Object` 和 `Array`

比如说，我们可以写如下测试案例`packages/vue/examples/mine/h-element-class.html`

```html
<script>
  const { h, render } = Vue
  // <div :class="{ red: true }"></div>
  const vnode = h('div', { class: { red: true } }, '增强的class')
  render(vnode, document.querySelector('#app'))
</script>
```

这样，我们就可以得到一个 `class: red`的`div`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/111be122c9b642bfa444c693b8bd5c25~tplv-k3u1fbpfcp-watermark.image?)

这样的 h 函数，最终得到的 `vnode` 如下

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43cdb26719c74cb6a8874337294e1a70~tplv-k3u1fbpfcp-watermark.image?)

在源码处`vue-next-3.2.37/packages/runtime-core/src/vnode.ts`文件中的`createVNode`方法中`if (props) `处增加断点

```typescript
if (props) {
  // for reactive or proxy objects, we need to clone it to enable mutation.
  props = guardReactiveProps(props)!
  let { class: klass, style } = props
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass)
  }
  if (isObject(style)) {
    // reactive state objects need to be cloned since they are likely to be
    // mutated
    if (isProxy(style) && !isArray(style)) {
      style = extend({}, style)
    }
    props.style = normalizeStyle(style)
  }
}
```

1. 此时`props`为`{ class : { red: true } }`,

2. `let { class: klass, style } = props`从中取出 class style

3. 当前 class 存在并且不是 字符串，所以会进入 `if (klass && !isString(klass))`中，进入`normalizeClass(klass)`函数

4. 进入`normalizeClass`函数：此时 参数 `class`为 `{ red: true}`

   ```typescript
   export function normalizeClass(value: unknown): string {
     let res = ''
     // 如果此时是字符串，就直接赋值
     if (isString(value)) {
       res = value
     } else if (isArray(value)) {
       // 如果是 数组，递归调用，并拼接到 res 变量上
       for (let i = 0; i < value.length; i++) {
         const normalized = normalizeClass(value[i])
         if (normalized) {
           res += normalized + ' '
         }
       }
     } else if (isObject(value)) {
       // 如果是一个对象，遍历这个对象，如果值为 true，就进行 res 变量拼接
       for (const name in value) {
         if (value[name]) {
           res += name + ' '
         }
       }
     }
     // 去除两端空格后，返回 res
     return res.trim()
   }
   ```

5. 其实对于 style 的处理同上差不多，我们看以下源码

6. 如果 props 中有 style，并且是一个对象，就调用`normalizeStyle`来处理

   注意：如果一个响应式对象，并且不是数组，就需要进行克隆一份

   ```typescript
   if (props) {
     props = guardReactiveProps(props)!
     let { class: klass, style } = props
     if (klass && !isString(klass)) {
       props.class = normalizeClass(klass)
     }
     // 处理 style 的逻辑
     if (isObject(style)) {
       // reactive state objects need to be cloned since they are likely to be mutated
       if (isProxy(style) && !isArray(style)) {
         style = extend({}, style)
       }
       props.style = normalizeStyle(style)
     }
   }
   ```

7. 进入`normalizeStyle`函数

   ```typescript
   export function normalizeStyle(
     value: unknown
   ): NormalizedStyle | string | undefined {
     // 如果是数组
     if (isArray(value)) {
       const res: NormalizedStyle = {}
       for (let i = 0; i < value.length; i++) {
         const item = value[i]
         const normalized = isString(item)
           ? parseStringStyle(item)
           : (normalizeStyle(item) as NormalizedStyle)
         if (normalized) {
           for (const key in normalized) {
             res[key] = normalized[key]
           }
         }
       }
       return res
     } else if (isString(value)) {
       // 如果是字符串，就直接返回
       return value
     } else if (isObject(value)) {
       // 如果是对象也直接返回
       return value
     }
   }

   const propertyDelimiterRE = /:(.+)/
   const listDelimiterRE = /;(?![^(]*\))/g
   export function parseStringStyle(cssText: string): NormalizedStyle {
     const ret: NormalizedStyle = {}
     // 按照正则进行分割然后遍历
     cssText.split(listDelimiterRE).forEach((item) => {
       if (item) {
         // 按照正则进行分割
         const tmp = item.split(propertyDelimiterRE)
         tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
       }
     })
     return ret
   }
   ```

## 11：框架实现：完成虚拟节点下的 class 和 style 的增强

本章节我们就来实现一下 `class 和 style` 的增强

1. 打开`vue-next-mini/packages/runtime-core/src/vnode.ts`文件，修改如下

   ```typescript
   import { normalizeClass } from '@vue/shared'
   export function createVNode(type, props, children): VNode {
     // 新增处理 props 逻辑
     if (props) {
       let { class: klass, style } = props
       // 新增处理 class 逻辑
       if (klass && !isString(klass)) {
         props.class = normalizeClass(klass)
       }
     }

     const shapeFlag = isString(type)
       ? ShapeFlags.ELEMENT
       : isObject(type)
       ? ShapeFlags.STATEFUL_COMPONENT
       : 0
     return createBaseVNode(type, props, children, shapeFlag)
   }
   ```

2. 新建`vue-next-mini/packages/shared/src/normalProp.ts`文件，内容如下

   ```typescript
   import { isArray, isObject, isString } from './index'

   export function normalizeClass(value: unknown): string {
     let res = ''
     // 如果是字符串，直接返回
     if (isString(value)) {
       res = value
     } else if (isArray(value)) {
       // 如果是数组
       for (let index = 0; index < value.length; index++) {
         const normalized = normalizeClass(value[index])
         if (normalized) {
           res += normalized + ' '
         }
       }
     } else if (isObject(value)) {
       // 如果是对象
       for (const key in value as object) {
         if ((value as object)[key]) {
           res += key + ' '
         }
       }
     }
     return res.trim()
   }
   ```

3. `vue-next-mini/packages/shared/src/index.ts`文件导入

   ```typescript
   export { normalizeClass } from './normalProp'
   ```

4. 新建测试示例`vue-next-mini/packages/vue/examples/run-time/h-component-class.html`,内容如下

   ```html
   <script>
     const { h } = Vue
     // <div :class="{ red: true }"></div>
     const vnode = h(
       'div',
       { class: [{ red: true, blue: false }, { white: true }] },
       '增强的class'
     )
     console.log(vnode)
   </script>
   ```

5. 打开浏览器，打印结果如下

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a02cfb7e4a94081a1f760813baf34f4~tplv-k3u1fbpfcp-watermark.image?)

6. 由此可见，`class` 的处理逻辑完成了

## 12： 总结
