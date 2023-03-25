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

## 04：源码阅读：无状态组件的更新与卸载

所谓的组件更新，其实本质上就是一个 **卸载、挂载** 的逻辑

1. 对于这样的卸载逻辑，我们之前已经完成过。
2. 所以，目前我们的代码 **支持** 组件的更新操作。

## 05：代码实现：无状态组件的更新与卸载

上一节我们知道，针对于组件的更新，它是通过先卸载旧节点，然后更新新节点来实现的。所以我们目前的代码是支持的

我们编写测试用例代码`packages/vue/examples/runtime/render-component-update.html`

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

  setTimeout(() => {
    const component2 = {
      render() {
        return h('div', 'component update')
      }
    }
    const vnode2 = h(component2)
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

查看效果，测试通过

## 06：局部总结

那么到现在我们已经完成了**无状态组件的挂载、更新、卸载**操作

从以上的内容中我们可以发现

1. 所谓组件的渲染，本质上指的是`render`函数返回值的渲染
2. 组件渲染的过程，会生成`ReactiveEffect`实例`effect`
3. 额外还存在一个`instance`实例，该示例表示**组件本身**，同时`vnode.component`指向它
4. 组件本身额外提供了很多的状态，比如`isMounted`

但是以上的内容，全部都是针对于**无状态**组件来看的

在我们的实际开发中，组件通常是**有状态（即：存在data响应式数据）**的，那么**有状态的组件**和**无状态组件**他们之间的渲染存在什么差异呢？让我们继续往下看

## 07：源码实现：有状态的响应性组件挂载逻辑

### 总结

1. 有状态的组件渲染，核心的点是**让`render`函数中的`this.xxx`得到真实数据**
2. 那么想要达到这个目的，我们就必须要**改变**`this`的指向
3. 改变的方式就是在：生成`subTree`时，通过`call`方法，指定`this`

## 08：框架实现：有状态的响应性组件挂载逻辑

1. 在 `packages/runtime-core/src/component.ts`的`finishComponentSetup` 方法中，触发 `applyOptions`：

   ```typescript
   import { reactive } from '@vue/reactivity'
   import { isObject } from '@vue/shared'
   
   export function finishComponentSetup(instance) {
     const component = instance.type
   
     instance.render = component.render
    // 改变 options 中的 this 指向
     applyOptions(instance)
   }
   
   function applyOptions(instance: any) {
     const { data: dataOptions } = instance.type
   
     // 存在 data 选项时
     if (dataOptions) {
       // 触发 dataOptions 函数，拿到 data 对象
       const data = dataOptions()
       // 如果拿到的 data 是一个对象
       if (isObject(data)) {
         // 则把 data 包装成 reactiv 的响应性数据，赋值给 instance
         instance.data = reactive(data)
       }
     }
   }
   ```

2. 在`packages/runtime-core/src/componentRenderUtils.ts`中，为`render`的调用，通过`call`方法来修改`this`的指向

   ```typescript
   export function renderComponentRoot(instance) {
     const { vnode, render, data } = instance
     let result
     try {
       if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
         // 新增：获取到 result 返回值，如果 render 中使用了 this，则需要修改 this 指向
         result = normalizeVNode(render!.call(data))
       }
     } catch (error) {
       console.error(error)
     }
     return result
   }
   ```

3. 至此，代码完成，我们可以创建对应测试示例`packages/vue/examples/runtime/render-comment-data.html`

   ```html
   <script>
     const { h, render } = Vue
     const component = {
       data() {
         return {
           msg: 'hello component'
         }
       },
       render() {
         return h('div', this.msg)
       }
     }
     const vnode = h(component)
     // 挂载
     render(vnode, document.querySelector('#app'))
   </script>
   ```

## 09：源码阅读：组件生命周期回调处理逻辑

在前面几节中，我们其实已经在源码中查看到了对应的一些生命周期处理逻辑

我们知道`vue`把生命周期叫做生命周期钩子，说白了就是：**在指定时间触发的回调方法**

整个源码过程可以分为两大块

1. 第一块是`beforeCreate`和`created`，它的执行主要是再`applyOptions`中执行的，我们直接通过`options.beforeCreate`和`options.created`来判断是否有这两个钩子，再通过`callHook`执行
2. 第二块是对于其余的`11`个生命周期，我们都是通过`registerLifecycleHook`方法将这些声明周期注入到`instance`里面，然后在合适的时机进行触发

## 10：框架实现：组件生命周期回调处理逻辑

明确好了源码的生命周期以后，那么接下来我们来实现一下对应的逻辑

我们本小节要处理的生命周期有四个，首先我们先处理前两个`beforeCreate`和`created`，我们知道这两个回调方法是在`applyOptions`方法中回调的

1. 在`packages/runtime-core/src/components.ts`的`applyOptions`方法中

   ```typescript
   function applyOptions(instance: any) {
       const {
         data: dataOptions,
         beforeCreate,
         created,
         beforeMount,
         mounted
       } = instance.type
   
       // hooks
       if (beforeCreate) {
           callHook(beforeCreate)
       }
   
       // 存在 data 选项时
       if (dataOptions) {
           ...
       }
   
       // hooks
       if (created) {
          callHook(created)
       }
   }
    
   // 创建对应的 callHook：
   function callHook(hook: Function) {
     hook()
   }
   ```

2. 至此，`beforeCreate`和`created`完成

接下来我们来处理`beforeMount`和`mounted`在，对于这两个生命周期而言，它需要先注册，再触发

那么我们先来处理注册的逻辑

**首先我们需要先创建`LifecycleHooks`**

1. 在`packages/runtime-core/src/component.ts`中

   ```typescript
   export const enum LifecycleHooks {
     BEFORE_CREATE = 'bc',
     CREATED = 'c',
     BEFEORE_MOUNT = 'bm',
     MOUNTED = 'm'
   }
   ```

2. 同样，在此文件中，在生成组件实例时，提供对应的生命周期相关选项

   ```typescript
   export function createComponentInstance(vnode) {
     const { type } = vnode
   
     const instance = {
       ...
       // 生命周期相关
       isMounted: false, // 是否挂载
       bc: null, // beforeCreate
       c: null, // created
       bm: null, // beforeMount
       m: null // mounted
     }
     return instance
   }
   ```

3. 创建`packages/runtime-core/src/apiLifecycle.ts`模块，处理对应的`hooks`注册方法

   ```typescript
   import { LifecycleHooks } from './component'
   
   export function injectHook(
     type: LifecycleHooks,
     hook: Function,
     instance
   ): Function | undefined {
     // 将hook  注册到组件实例中
     if (instance) {
       instance[type] = hook
       return hook
     }
   }
   
   export const createHook = (lifecycle: LifecycleHooks) => {
     return (hook, target) => injectHook(lifecycle, hook, target)
   }
   
   export const onBeforeMount = createHook(LifecycleHooks.BEFEORE_MOUNT)
   export const onMounted = createHook(LifecycleHooks.MOUNTED)
   ```

​	这样，我们注册`hooks`的一些基础逻辑完成

4. 接下来我们就可以在`applyOptions`方法中，完成对应的注册

   ```typescript
   import { onBeforeMount, onMounted } from './apiLifecycle'
   
   function applyOptions(instance: any) {
      const {
       data: dataOptions,
       beforeCreate,
       created,
       beforeMount,
       mounted
     } = instance.type
       ...
       function registerLifecycleHook(register: Function, hook?: Function) {
           register(hook, instance)
       }
   
       // 注册 hooks
       registerLifecycleHook(onBeforeMount, beforeMount)
       registerLifecycleHook(onMounted, mounted)
   }
   ```

5. 这样就把`bm`和`m`注册到组件实例之后了，下面就可以在`componentUpdateFn`中触发响应的`hook`了

   ```typescript
   export function baseCreateRender(options: RendererOptions) {
   	... 
     const setupRenderEffect = (instance, initialVNode, container, anchor) => {
       const componentUpdateFn = () => {
         // 当前处于 mounted 之前，即执行 挂载 逻辑
         if (!instance.isMounted) {
           // 获取 hook
           const { bm, m } = instance
           // beforeMount hook
           if (bm) {
             bm()
           }
           const subTree = (instance.subTree = renderComponentRoot(instance))
           patch(null, subTree, container, anchor)
           // mounted hook
           if (m) {
             m()
           }
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
     ...
     return {
   
     }
   }
   ```

6. 至此，生命周期逻辑处理完成，我们可以创建对应测试示例`packages/vue/examples/runtime/render-component-hook.html`

   ```html
   <script>
     const { h, render } = Vue
     const component = {
       data() {
         return {
           msg: 'hello component'
         }
       },
       render() {
         return h('div', this.msg)
       },
       // 组件初始化完成之后
       beforeCreate() {
         alert('beforeCreate')
       },
       // 组件实例处理完所有与状态相关的选项之后
       created() {
         alert('created')
       },
       // 组件被挂载之前
       beforeMount() {
         alert('beforeMount')
       },
       // 组件被挂载之后
       mounted() {
         alert('mounted')
       }
     }
     const vnode = h(component)
     // 挂载
     render(vnode, document.querySelector('#app'))
   </script>
   ```

7. 运行浏览器，可以看到如下效果

   ![4.gif](https://yejiwei.com/static/img/a0f887305803e10b0014458a647caf82.4.gif)

## 参考文章

[vue3 源码学习，实现一个 mini-vue（十一）：组件的设计原理与渲染方案](https://juejin.cn/post/7187069728358629434#heading-1)
