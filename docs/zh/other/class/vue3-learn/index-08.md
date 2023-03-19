# 08-runtime运行时-构建h函数，生成Vnode

## 01：前言

本章中，我们先来处理 h 函数的构建

 我们知道 h 函数核心是用来：**创建VNode的**。但是对于VNode来说，它存在很多不同的节点类型

查看`packages/runtime-core/src/renderer.ts`中的第354行 patch 方法的代码可知，vue 总共处理了

1. `Text`：文本节点
2. `Comment`：注释节点
3. `Static`: 静态 DOM 节点
4. `Fragment`：包含多个根节点的模板被表示为一个片段（`Fragment`）
5. `ELEMENT`：DOM节点
6. `COMPONENT`：组件
7. `TELEPORT`：新的内置组件
8. `SUSPENSE`：新的内置组件
9. 。。。

各种不同类别的节点，而每一种类型的处理都对应着不同的`VNode `

所以我们在本章节中，就需要把各种类型的VNode构建出来（不会全部处理所有类型，只会选择比较具有代表性的部分），以便后面进行render渲染

那么把这些内容，明确完成之后，我们就开始本章的学习吧~~~

## 02:阅读源码：初见 h函数，跟踪 vue3源码实现基础逻辑

本小节我们通过 h函数生成Element 的VNode来去查看h函数的源码实现

1. 创建测试实例`packages/vue/examples/mine/runtime/h-element.html

   ```html
   <script>
   	const { h } = Vue
     const vnode = h("div", { class: "test"}, "hello render" )
     console.log(vnode)
   </script>
   ```

2. h函数的代码位于`packages/runtime-core/src/h.ts`中，为174行增加debugger

### h函数

1. 代码进入 h 函数

   1. 通过源码可知，h函数接收三个参数

   2. type：类型，比如当前的 div 就表示 Element  类型

   3. propOrChildren: props  或者 children

   4. children：子节点

   5. 在这三个参数中，第一个和第三个都比较好理解，它的第二个参数代表的是什么意思呢？查看[官方示例](https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes)可知，**h函数存在多种调用方式**

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

      1. 这些内容在源码中也存在对应的说明（查看h.ts的顶部注释）。并且这种方式在其他的框架或者 web api中也是比较常见的
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

   3. 最终得到`shapeFlag`的值为1，`shapeFlag`为当前的**类型标识**

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
           appContext: null
         } as VNode
         ```

      3. 生成 `VNode` 对象，此时生成的 `vnode`的值为

      4. 删除对我们无用的属性之后，得到

         ```json
         {
           "children": "hello render",
           props: { class: "test" },
           shapeFlag: 1, // 表示为 Element
           type: "div",
           __v_isVNode: true
         }
         ```

      5. 代码执行`normalizeChildren(vnode, children)`

         1. 代码进入`normalizeChildren`方法
         2. 代码进入最后的` else`,  执行 `type=ShapeFlags.TEXT_CHILDREN` 执行完成之后，`type = 8`,此时的 8 表示 `ShapeFlages.TEXT_CHILDREN`
         3. **注意**： 最后执行**vnode.shapeFlage |= type**
            1. 此时 vnode.shapeFlag 原始值为1，即 ShapeFlags.ELEMENT
            2. type 的值为8，即：ShapeFlags.TEXT_CHILDREN
            3. 而 |= 表示 **按位或赋值** 运算：x|=y 意为 x = x|y
               1. 即 vnode.shapeFlag |= type 表示为 vnode.shapeFlag = vnode.shapeFlag | type
               2. 代入值后表示 vnode.shapeFlag = 1|8
               3. 1 是10 进制，转换为 32 位的二进制之后为
                  1. 00000000 00000000 00000000 00000001
               4. 8 是 10进制，转化为 32 位的二进制之后为
                  1. 00000000 00000000 00000000 00001000
               5. 两者进行 按位或赋值之后，得到的二进制为
                  1. 00000000 00000000 00000000 00001001
                  2. 转换为 10进制，即为 9
            4. 所以，此时 **vnode.shapeFlag的值为9**

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

## 03：框架实现：构建h函数，处理ELEMENT+TEXT_CHILDREN场景

## 04：源码阅读：h函数，跟踪ELEMENT+ARRAY_CHILDREN场景下的源码实现

## 05：框架实现：构建h函数，处理ELEMENT+ARRAY_CHILDREN场景

## 06：源码阅读：h函数，组件的本质与对应的VNode
