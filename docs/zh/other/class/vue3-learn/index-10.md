# 10-runtime 运行时-组件的设计原理与渲染方案

## 01:前言

 在本章中，我们将要关注于 component 组件的渲染逻辑，对于组件而言，本身比较复杂所以我们单独拿出来一章来进行讲解

在学习本章节之前，我们需要先来回忆一下再学习 h 函数时，我们学到的内容

> 组件本身是一个对象（仅考虑对象的情况，忽略函数式组件）。它必须包含一个 render 函数，该函数决定了它的渲染内容
>
> 如果我们想要定义数据，那么需要通过 data 选项进行注册，data 选项应该是一个**函数**，并且 retrun 一个对象，对象中包含了所有的响应式数据
>
> 除此之外，我们还可以定义比如：生命周期，计算属性，watch 等对应内容

以上是关于组件的一些基本概念，这些是需要大家首先能够明确地

组件的处理非常复杂，所以我们依然会采用和之前一样的标准：**没有使用就当不存在、最少代码的实现逻辑**。来实现我们的组件功能。

## 02: 源码阅读：无状态基础组件挂载逻辑

> vue 中通常把 **状态** 比作 **数据** 的意思。我们所谓的无状态，指的就是 **无数据** 的意思

我们先来定一个目标：本小节我们**仅仅关注无状态基础组件挂载逻辑**，而忽略其他所有

基于以上目的我们创建对应测试示例`packages/vue/examples/mine/runtime/render-component.html`

```html
<script>
  const { h, render } = Vue

  const component = {
    render() {
      return h('div', 'hello component')
    }
  }

  const vnode = h(component)
  // 挂载
  render(vnode, document.querySelector('#app'))
</script>
```

上述的代码很简单

1. 使用`h`函数生成组件的`vnode`
2. 使用`render`函数组件将组件挂载到`dom`上

## 03: 框架实现：完成无状态基础组件的挂载逻辑

1. 在 `packages/runtime-core/src/renderer.ts` 的 `patch` 方法中，创建 `processComponent` 的触发：

   ```typescript
   import { createComponentInstance, setupComponent } from './component'
   import { renderComponentRoot } from './commponentRenderUtis'
   
   export function baseCreateRender(options: RendererOptions) {
     
     const patch = (oldVNode, newVNode, container, anchor) => {
       
       const { type, shapeFlag } = newVNode
       switch (type) {
         case xxx:
         	break;
         default:
           if (shapeFlag & ShapeFlags.ELEMENT) {
           } else if (shapeFlag & ShapeFlags.COMPONENT) {
             processComponent(oldVNode, newVNode, container, anchor)
           }
           break
       }
     }
     
     // 创建 processComponent 函数：
     const processComponent = (oldVNode, newVNode, container, anchor) => {
       if (oldVNode == null) {
         mountComponent(newVNode, container, anchor)
       }
     }
     
     const mountComponent = (initialVNode, container, anchor) => {
       const instance = (initialVNode.component =
         createComponentInstance(initialVNode))
       setupComponent(instance)
       setupRenderEffect(instance, initialVNode, container, anchor)
     }
     
     const setupRenderEffect = (instance, initialVNode, container, anchor) => {
       const componentUpdateFn = () => {
         if (!instance.isMounted) {
           const subTree = (instance.subTree = renderComponentRoot(instance))
           patch(null, subTree, container, anchor)
           initialVNode.el = subTree.el
         } else {
         }
       }
   
       const effect = (instance.effect = new ReactiveEffect(
         componentUpdateFn,
         () => {
           queuePreFlushCb(update)
         }
       ))
       const update = (instance.update = () => effect.run())
       update()
     }
     
     
   }
   ```

2. 创建 `packages/runtime-core/src/component.ts` 模块，构建 `createComponentInstance` 函数逻辑

   ```typescript
   let uid = 0
   export function createComponentInstance(vnode) {
     const { type } = vnode
     const instance = {
       uid: uid++,
       vnode,
       type,
       subTree: null,
       effect: null,
       update: null,
       render: null
     }
     return instance
   }
   
   export function setupComponent(instance) {
     setupStatefuleComponent(instance)
   }
   
   export function setupStatefuleComponent(instance) {
     finishComponentSetup(instance)
   }
   
   export function finishComponentSetup(instance) {
     const component = instance.type
   
     instance.render = component.render
   }
   ```

3. 在 `packages/runtime-core/src/componentRenderUtils.ts` 模块中构建 `renderComponentRoot` 函数：

   ```typescript
   import { ShapeFlags } from 'packages/shared/src/shapeFlags'
   import { createVNode, Text } from './vnode'
   
   export function renderComponentRoot(instance) {
     const { vnode, render } = instance
     let result
     try {
       if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
         result = normalizeVNode(render!())
       }
     } catch (error) {}
   
     return result
   }
   
   export function normalizeVNode(child) {
     if (typeof child === 'object') {
       return cloneIfMounted(child)
     } else {
       // strings and numbers
       return createVNode(Text, null, String(child))
     }
   }
   
   function cloneIfMounted(child) {
     return child
   }
   ```

4. 创建代码示例，`packages/vue/examples/runtime/render-component.html`，内容如下

   ```html
   <script>
     const { h, render } = Vue
     const component = {
       render() {
         return h('div', 'i am a component')
       }
     }
     const vnode = h(component)
     render(vnode, document.querySelector('#app'))
   </script>
   ```

5. 此时，组件渲染完成

## 参考文章

[vue3 源码学习，实现一个 mini-vue（十一）：组件的设计原理与渲染方案](https://juejin.cn/post/7187069728358629434#heading-1)
