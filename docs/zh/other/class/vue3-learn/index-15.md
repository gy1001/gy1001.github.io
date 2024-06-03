# 15-运行时+编译时-合并 vue 处理逻辑

## 01：前言

到目前为止，我们已经完成了

1. 响应性
2. 运行时
3. 编译器

三大模块，这三大模块基本上描述了`vue`的核心业务逻辑

但是对于目前而言，这三大模块还是完全独立的系统，比如：如果想要渲染，那么必须单独的到如`render`

如果大家有过`vue3`的使用经验，那么我们知道，当我们构建一个`vue3`实例时，可以这么做

```html
<script>
  const {createApp} = Vue
  const APP = {
    template:"<div>hello world</div>"
  }
  const app = createApp(APP)
  app.mount("#app")
</script>
```

那么这里就涉及到两个方法

1. createApp: 创建 app 实例
2. mount：挂载

通过这两个方法，我们就可以直接关联上**运行时+编译器**，直接实现模板的渲染

咱们得框架目前还不支持这样的使用方式，所以本章我们就可以去实现这个功能

对于上述的功能我们需要分为两块来看：

1. 构建`createApp`通过`render`进行渲染

   ```html
   <script>
     const { createApp, h } = Vue
     const APP = {
       render(){
         return h("div", "hello world")
       }
     }
     const app = createApp(APP)
     app.mount("#app")
   </script>
   ```

2. 绑定`compiler`,直接通过模板渲染

   ```html
   <script>
     const {createApp} = Vue
     const APP = {
       template:"<div>hello world</div>"
     }
     const app = createApp(APP)
     app.mount("#app")
   </script>
   ```

## 02: 基于 render 渲染的 createApp 的构建逻辑

本小节我们先完成第一步，最终期望的渲染逻辑为

```html
<script>
  const { createApp, h } = Vue
  // 构建组件实例
  const APP = {
    render(){
      return h("div", "hello world")
    }
  }
  // 通过 createApp 标记挂载组件
  const app = createApp(APP)
  // 挂载位置
  app.mount("#app")
</script>
```

对于以上代码而言，`createApp`和`mount`这两个方法我们是不熟悉的，我们可以先看下之前的渲染逻辑，然后倒推一下`createApp`和`mount`都做了什么

比如，之前的测试示例`/vue/examples/run-time/render-component.html`代码如下

```html
<script>
  const { h, render } = Vue
  const component = {
    render() {
      return h('div', 'i am a component')
    }
  }
  // 通过h 函数生成 vnode
  const vnode = h(component)
  // 渲染
  render(vnode, document.querySelector('#app'))
</script>
```

而如今可以理解为通过`createApp`生成了一个对应的实例，这个实例中包含了生成好了的`vnode`,然后有了这个`vnode`,再通过它的`mount`方法来实现一个挂载。

可以把`const app = createApp(APP)`理解为**生成vnode**

把`app.mount("#app")`理解为挂载

那么接下来，我们来进行代码的实现

1. 修改`packages/runtime-core/src/renderer.ts`中的`baseCreateRender`方法

   ```typescript
   import { createAppAPI } from './apiCreateApp'
   
   export function baseCreateRender(options: RendererOptions) {
    return {
       render,
       createApp: createAppAPI(render)
     }
   }
   ```

2. 新建`createAppAPI.ts`文件

   ```typescript
   import { createVNode } from './vnode'
   
   export function createAppAPI(render) {
     return function createApp(rootComponent, rootProps = null) {
       const app = {
         _component: rootComponent,
         _container: null,
         mount(rootContainer) {
           const vnode = createVNode(rootComponent, rootProps, null)
           render(vnode, rootContainer)
         }
       }
   
       return app
     }
   }
   ```

3. 导出`createApp`方法

   ```typescript
   // packages/runtime-dom/src/index.ts
   export const createApp = (...args) => {
     const app = ensureRender().createApp(...args)
     return app
   }
   // packages/vue/src/index.ts
   export { createApp } from '@vue/runtime-dom'
   ```

4. 创建测试示例`packages/vue/examples/createApp/createApp.html`文件，内容如下

   ```html
   <script>
     const { h, createApp } = Vue
     const APP = {
       render() {
         return h('div', 'i am a component')
       }
     }
     const app = createApp(APP)
     app.mount('#app')
   </script>
   ```

5. 运行后报错如下（原因：目前我们传入的是一个字符串，而不是一个 dom容器）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bf1b582a779472288b6286b12ff5bdc~tplv-k3u1fbpfcp-watermark.image?)

6. 修改`packages/runtime-dom/src/index.ts`中的`createApp`方法

   > 注意：因为这个文件夹是用来支持 dom 渲染的，所以为了扩展方便，需要在这里进行扩展

   ```typescript
   import { isString } from '@vue/shared'
   export const createApp = (...args) => {
     const app = ensureRender().createApp(...args)
     const { mount } = app
     app.mount = (containerOrSelector: Element | string) => {
       const container = noramlizeContainer(containerOrSelector)
       if (!container) {
         console.log('容器必须存在')
         return
       }
       mount(container)
     }
     return app
   }
   
   function noramlizeContainer(container: Element | string): Element {
     if (isString(container)) {
       const res = document.querySelector(container)
       return res as Element
     }
     return container
   }
   ```

7. 再次运行浏览器，发现页面正常渲染了

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/429711b628f84919a6d89735ed3bddd7~tplv-k3u1fbpfcp-watermark.image?)

## 03：基于 template 渲染的 createApp 的构建逻辑

对于组件而言，我们不光要支持`render`还需要支持`template`的模板渲染

```html
<script>
  const { createApp } = Vue
  const APP = {
    template:"<div>hello world</div>"
  }
  const app = createApp(APP)
  app.mount("#app")
</script>
```

1. 新建测试示例`packages/vue/examples/createApp-template.html`

   ```html
   <script>
     const { createApp } = Vue
     const APP = {
       template: '<div>hello world</div>'
     }
     const app = createApp(APP)
     app.mount('#app')
   </script>
   ```

2. 运行测试示例，报错信息如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c865c146169140b59f2e684844374bcd~tplv-k3u1fbpfcp-watermark.image?)

3. 原因分析：

   1. 当我们触发`createApp`时，最终触发的是`createAppApI`中的`createApp`函数，在这个函数中触发mount 方法时候，是通过`createVNode`来生成`vnode`节点实例的。

   2. 对于`createVNode`而言，我们之前是先实现了`runtime`模块，然后实现了`compile`模块。换句话说，`runtime`模块和`compile`模块目前是没有联系的

   3. 在`/packages/runtime-core/src/component.ts`文件中，我们通过`finishComponentSetup`方法拿到了`instance.render`方法。而此时因为使用了模板`template`,组件中就不存在`render`函数,修改如下

      ```typescript
      let compile: any = null
      
      export function finishComponentSetup(instance) {
        const component = instance.type
        // 组件不存在 render 时，才需要重新赋值
        if (!instance.render) {
          if (compile && !component.render) 
            if (component.template) {
              const template = component.template
              component.render = compile(template)
            }
          }
          instance.render = component.render
        }
        applyOptions(instance)
      }
      
      export function registerRuntimeCompiler(_compile: any) {
        compile = _compile
      }
      ```

   4. 然后我们只需要触发`registerRuntimeCompiler`方法即可

      ```typescript
      // /packages/vue-compact/src/index.ts
      import { registerRuntimeCompiler } from 'packages/runtime-core/src/component'
      
      registerRuntimeCompiler(compileToFunction)
      ```

   5. 再次运行测试实例，结果还报错误

      ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06c27a6f3404461189b177040d05cc55~tplv-k3u1fbpfcp-watermark.image?)

   6. 根据错误，我们打开`packages/runtime-core/src/commponentRenderUtis.ts`中的`renderComponentRoot`方法，分析得知，call中的第二个参数`data`目前是`undefined`,修改如下

      ```typescript
      export function renderComponentRoot(instance) {
        const { vnode, render, data } = instance
        let result
        try {
          if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            result = normalizeVNode(render!.call(data, data || {})) // 增加一个默认值 {}
          }
        } catch (error) {
          console.log(error, 'error')
        }
        return result
      }
      ```

   7. 刷新页面，看到页面中正常渲染了

      ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1c43370aa834650a8cd76b791a010f0~tplv-k3u1fbpfcp-watermark.image?)

## 04：总结

 到这里我们已经完成了**运行时+编译器**的合并逻辑，那么我们可以运行如下测试实例，来查看一个相对完整的测试示例

```html
<script>
  const { createApp } = Vue
  const APP = {
    template: '<div>hello world,<h1 v-if="isShow">{{msg}}</h1></div>',
    data() {
      return {
        msg: '你好，世界',
        isShow: false
      }
    },
    created() {
      setTimeout(() => {
        this.isShow = true
      }, 2000)
    }
  }
  const app = createApp(APP)
  app.mount('#app')
</script>
```

运行浏览器，可以看到页面中先显示`hello world`，2s后显示`你好，世界`















