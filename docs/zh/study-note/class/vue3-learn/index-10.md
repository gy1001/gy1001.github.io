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
    },
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
           break
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
       render: null,
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
       },
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
    },
  }
  const vnode = h(component)
  render(vnode, document.querySelector('#app'))

  setTimeout(() => {
    const component2 = {
      render() {
        return h('div', 'component update')
      },
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

在我们的实际开发中，组件通常是**有状态（即：存在 data 响应式数据）**的，那么**有状态的组件**和**无状态组件**他们之间的渲染存在什么差异呢？让我们继续往下看

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

3. 至此，代码完成，我们可以创建对应测试示例`packages/vue/examples/runtime/render-component-data.html`

   ```html
   <script>
     const { h, render } = Vue
     const component = {
       data() {
         return {
           msg: 'hello component',
         }
       },
       render() {
         return h('div', this.msg)
       },
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
     MOUNTED = 'm',
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

​ 这样，我们注册`hooks`的一些基础逻辑完成

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
           msg: 'hello component',
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
       },
     }
     const vnode = h(component)
     // 挂载
     render(vnode, document.querySelector('#app'))
   </script>
   ```

7. 运行浏览器，可以看到如下效果

   ![4.gif](https://yejiwei.com/static/img/a0f887305803e10b0014458a647caf82.4.gif)

## 11：源码阅读：生命回调钩子中访问响应性数据

### created

通过之前的代码我们已经知道，`created`的回调是在`applyOptions`中触发的，所以我们可以直接在这个函数中进行`debugger`

1. 进入`applyOptions`
2. 剔除之前相同的逻辑，执行代码`if(created){...}`

![image.png](https://yejiwei.com/static/img/70db101d336f4b9e2058a0ba58b9b784.image.png)

通过以上，我们很容易分析`created`能获取到相应数据的原因

### mounted

对于`mounted`而言，我们知道它的生命周期注册是在`applyOptions`方法内的`registerLifecycleHook`方法中，我们可以直接来看一下源码中的`registerLifecycleHook`方法

```typescript
function registerLifecycleHook(
  register: Function,
  hook?: Function | Function[]
) {
  if (isArray(hook)) {
    hook.forEach((_hook) => register(_hook.bind(publicThis)))
  } else if (hook) {
    register((hook as Function).bind(publicThis))
  }
}
```

该方法中的逻辑也是非常简单，可以看到它和`created`处理几乎一样，都是通过`bind`方法来改变`this`指向

### 总结

无论是`created`也好，还是`mounted`也好，本质上都是通过`bind`方法来修改`this`指向，已达到在回调钩子中访问响应式数据的目的。

## 12：框架实现：生命回调钩子中访问响应性数据

根据上一节的描述，我们只需要改变生命周期钩子中的`this`指向即可

1. 在`packages/runtime-core/src/component.ts`为`callHook`方法增加参数，以此来改变`this`指向

   ```typescript
   // 创建对应的 callHook：
   function callHook(hook: Function, proxy) {
     hook.bind(proxy)()
   }
   ```

2. 在`applyOptions`方法中为`callHook`的调用，传递第二个参数

   ```typescript
   function applyOptions(instance: any) {
     // hooks
     if (beforeCreate) {
       callHook(beforeCreate, instance.data) //  此时 instance.data 自然是没有值的，不过没有关系
     }

     ...

     // hooks
     if (created) {
       callHook(created, instance.data)
     }
   }
   ```

3. 另外，在`registerLifecycleHook`中，为`hook`修改`this`指向

   ```typescript
   function registerLifecycleHook(register: Function, hook?: Function) {
     register(hook?.bind(instance.data), instance)
   }
   ```

4. 至此，代码完成。创建测试示例`packages/examples/runtime/render-component-hook-data.html`,代码如下

   ```html
   <script>
     const { h, render } = Vue
     const component = {
       data() {
         return {
           msg: 'hello component',
         }
       },
       render() {
         return h('div', this.msg)
       },
       beforeCreate() {
         alert('beforeCreate ' + this.msg)
       },
       created() {
         alert('created ' + this.msg)
       },
       mounted() {
         alert('mounted ' + this.msg)
       },
     }
     const vnode = h(component)
     // 挂载
     render(vnode, document.querySelector('#app'))
   </script>
   ```

5. 运行代码，正常打开显示

## 13：源码阅读：响应性数据改变，触发组件的响应性变化

虽然目前我们已经完成了在生命周期中访问响应性数据，但是还有个问题就是：**响应性数据改变，没有触发组件发生变化**

再来看这一块的内容之前,首先我们需要先来明确一些基本的概念

组件的渲染，本质上是`render`函数返回值的渲染，所谓响应性数据，指的是

1. `getter`时收集依赖
2. `setter`时触发依赖

那么根据以上概念，我们所需要做的是

1. 在组件的数据被触发`getter`时，我们应该收集依赖。那么组件什么时候触发的`getter`呢？在`packages/runtime-core/src/renderer.ts`的`setupRenderEffect`方法中，我们创建了一个`effect`，并且把`effect`的`fn`指向了`componentUpdateFn`函数。在该函数中，我们触发了`getter`，然后得到了`subTree`，然后进行渲染。所以收集依赖的函数为`componentUpdateFn`。
2. 在组件的数据被触发`setter`时，我们应该触发依赖。我们刚才说，收集的依赖本质上是`componentUpdateFn`函数，所以我们在触发依赖时，所触发的也应该是`componentUpdateFn`函数

明确好了以上内容之后，我们就去分析一下源码是怎么做的，我们创建测试示例`render-component-hook-data-change.html`

```html
<script>
  const { h, render } = Vue
  const component = {
    data() {
      return {
        msg: 'hello component',
      }
    },
    render() {
      return h('div', this.msg)
    },
    // 组件实例处理完所有与状态相关的选项之后
    created() {
      setTimeout(() => {
        this.msg = '你好，世界'
      }, 2000)
    },
  }
  const vnode = h(component)
  // 挂载
  render(vnode, document.querySelector('#app'))
</script>
```

在`comonentUpdateFn`中进行`debugger`，等待**第二次**进入`componentUpdateFn`函数（注意：此时我们仅仅关注依赖触发，生命周期的触发不再关注对象，会直接跳过）

1. 第二次进入`componentUpdateFn`，因为这次组件已经挂载过了，所以会执行 else, 在`else`中将下一次要渲染的`vnode`赋值给`next`，我们继续往下执行

   ![image.png](https://yejiwei.com/static/img/553092e70f7dfe9d654c61c486b4e514.image.png)

2. 在`else`中，代码最终会执行`renderComponentRoot`，而对于`renderComponentRoot`方法。我们也很熟悉了，它内部会调用

   ```typescript
   result = normalizeVNode(
     render!.call(
       proxyToUse,
       proxyToUse!,
       renderCache,
       props,
       setupState,
       data,
       ctx
     )
   )
   ```

同样通过`call`方法，改变`this`指向，触发`render`。然后通过`normalizeVNode`得到`vnode`,这次得到的`vnode`就是下一次要渲染的`subTree`.接着跳出`renderComponentRoot`方法继续执行代码

![image.png](https://yejiwei.com/static/img/9478446e52a89bfb5a27d8bf5fbf389e.image.png)

3. 可以看到，最终触发`patch`方法，完成**更新操作**
4. 至此，整个组件视图的更新完成

### 总结

所谓的组件响应性更新，本质上指的是:`componentUpdateFn`的再次触发，根据新的**数据**生成新的`subTree`，再通过`path`进行更新操作

## 14: 框架实现：响应性数据改变，触发组件的响应性变化

1. 在 `packages/runtime-core/src/renderer.ts` 的 `componentUpdateFn` 方法中，加入如下逻辑：

```typescript
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
      // 修改 mounted 状态
      instance.isMounted = true
    } else {
     	//-----------新增代码-------------------
      let { next, vnode } = instance
      if (!next) {
        next = vnode
      }
      // 获取下一次的 subTree
      const nextTree = renderComponentRoot(instance)
      // 保存对应的 subTree  以便进行更新操作
      const prevTree = instance.subTree
      instance.subTree = nextTree
      // 通过 patch  进行更新操作
      patch(prevTree, nextTree, container, anchor)
      // 更新 next
      next.el = nextTree.el
    }
}
```

至此，代码完成。创建对应测试示例`packages/vue/examples/runtime/render-component-hook-data-change.html`

```html
<body>
  <div id="app"></div>
</body>
<script>
  const { h, render } = Vue

  const component = {
    data() {
      return {
        msg: 'hello component',
      }
    },
    render() {
      return h('div', this.msg)
    },
    // 组件实例处理完所有与状态相关的选项之后
    created() {
      setTimeout(() => {
        this.msg = '你好，世界'
      }, 2000)
    },
  }

  const vnode = h(component)
  // 挂载
  render(vnode, document.querySelector('#app'))
</script>
```

![5.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bf76ad2419c49adb8fe0b13edb392fa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 15: 源码阅读：compositionAPI，setup 函数

我们已经处理好了组件非常多的概念，但是我们知道对于`vue3`而言，提供了`composition API`,即`setup`函数的概念

那么如果我们想要通过`setup`函数来进行一个响应性数据的挂载，那么又应该怎么做呢？

我们创建一个测试示例`render-component-setup.html`内容如下

```html
<script>
  const { reactive, h, render } = Vue
  const component = {
    setup() {
      const obj = reactive({
        name: '张三',
      })
      return () => h('div', obj.name)
    },
  }
  const vnode = h(component)
  // 挂载
  render(vnode, document.querySelector('#app'))
</script>
```

在上面的代码中，我们构建了一个`setup`函数，并且在`setup`函数中`return`了一个函数，函数中返回了一个`vnode`

我们知道，`vue`对于组件的挂载，本质上是触发`mountComponent`，在`mountComponent`中调用了`setUpComponent`函数，通过此函数来对组件的选项进行标准化

那么`setup`函数本质上就是一个`vue`组件的选项，所以对于`setup`函数处理的核心逻辑，就在`setupComponent`中。我们在这函数内部进行`debugger`

![image.png](https://yejiwei.com/static/img/0785e74a875899e33378037470f4286f.image.png)

1. 由上图我们看到了`setup`函数最终被执行了，由此得到`setupResult`的值为`()=>h('div', obj.name)`。即`setup`函数的返回值。我们代码继续执行

   ![image.png](https://yejiwei.com/static/img/061f608553715bfedff07f77d13b3a98.image.png)

2. 我们可以看到，先是触发了`handleSetupResult`方法，在`handleSetupResult`方法中会将`setupResult`赋值给`instance.render`，最后进行了`finishComponentSetup`

3. 后面的逻辑就是**有状态的响应性组件挂载逻辑**的逻辑了，这里就不再详细说明

### 总结

1. 对于`setup`函数的`composition API`语法的组件挂载，本质上只是多了一个`setup`函数的处理
2. 对于`setup`函数内部，可以完成对应的**自治**，所以我们**无需**通过`call`方法来改变`this`指向，即可得到真实的`render`
3. 得到真实的`render`之后，后面就是正常的组件挂载了

## 16：框架实现：compositionAPI，setup 函数

1. 在`packages/runtime-core/src/component.ts`模块中的`setupStatefulComponent`方法中，增加`setup`判定

   ```typescript
   import { isFunction } from '@vue/shared'
   export function setupStatefuleComponent(instance) {
     const { setup } = instance.type
     if (setup) {
       console.log('执行setup函数')
       const setupResult = setup()
       handleSetupResult(instance, setupResult)
     } else {
       finishComponentSetup(instance)
     }
   }

   export function handleSetupResult(instance, setupResult) {
     if (isFunction(setupResult)) {
       instance.render = setupResult
     }
     finishComponentSetup(instance)
   }

   // 在 finishComponentSetup 中，如果已经存在 render，则不需要重新赋值：
   export function finishComponentSetup(instance) {
     const component = instance.type
     // 组件不存在 render 时，才需要重新赋值
     if (!instance.render) {
       instance.render = component.render
     }
     // 改变 options 中的 this 指向
     applyOptions(instance)
   }
   ```

2. 至此，代码完成，创建对应测试示例`packages/vue/examples/runtime/render-component-setup.html`

   ```html
   <script>
     const { reactive, h, render } = Vue

     const component = {
       setup() {
         const obj = reactive({
           name: '张三',
         })

         setTimeout(() => {
           obj.name = '李四'
         }, 2000)

         return () => h('div', obj.name)
       },
     }

     const vnode = h(component)
     // 挂载
     render(vnode, document.querySelector('#app'))
   </script>
   ```

   **挂载**和**更新**完成

## 17. 总结

在本章中，我们处理了`vue`中组件对应的**挂载、更新逻辑**

我们知道组件本质上就是一个对象(或者函数)，组件的渲染本质上就是`render`函数返回值的渲染

组件渲染的内部，构建了`ReactiveEffect`的实例，其目的是为了实现组件的响应性渲染

而当我们期望在组件内部访问响应性数据时，分为两种情况

1. 通过`this`访问：对于这种情况我们需要改变`this`指向，改变的方式是通过`call`方法或者`bind`方法
2. 通过`setup`访问：这种方式因为不涉及`this`指向问题，反而更加简单当组件内部的响应性数据发生变化时，会触发`componentUpdateFn`函数，在该函数中根据`isMounted`的值的不同，进行了不同的处理

组件的生命周期钩子，本质上只是一些方法的回调，当然，如果我们希望在生命周期钩子中通过`this`访问响应性数据，那么一样需要改变`this`指向

## 参考文章

[vue3 源码学习，实现一个 mini-vue（十一）：组件的设计原理与渲染方案](https://juejin.cn/post/7187069728358629434#heading-1)
