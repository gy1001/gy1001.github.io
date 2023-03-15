# 04-响应系统-初见 reactivity 模块

## 01：前言

从本章开始我们将开始实现`Vue3`中的`reactivity`模块，该模块中，将会利用我们上一章中学到的知识实现响应性数据，如

1. `reactive`
2. `ref`
3. `computed`
4. `watch`
5. 等等

在这些代码的的实现中，我们将会参考`Vue`的源代码，并在其基础上进行一些适当的`简化`和`修改`。以此来帮助大家掌握`vue3`中响应式的核心逻辑

那么明确好了这些内容之后，接下来就让我们进入到响应式的实现之中吧

## 02：源码阅读：reacitve 的响应性，跟踪 Vue3 源码实现逻辑

我们知道在`vue`中想要实现响应式是数据，拥有两种方式：

1. `reactive`
2. `ref`

在第三章节中，我们在`vue`的源码中，创建了`packages/vue/example/mine/reactive.html`测试实例，在该实例中，我们通过`reactive`方法创建了一个响应式数据，通过`effect`注册了一个函数

那么下面，我们就跟踪当前的代码，来详细看看 vue 内部到底做了什么？

1. `reactive`做了什么
2. `effect`是什么

明确好了之后，那么下面我们来去看

### reactive 方法

1. 触发`reactive`方法
2. 创建`reactive`对象：`return createReactveiObejcte`
3. 进入`new Proxy`
   1. 第一个参数`target`: 为传入的对象
   2. 第二个参数`handler`: `TargetType.COLLECTION = 2`， `tragetType = 1`，所以 `handler`为`baseHandlers`
   3. 那这个`baseHandlers`是什么呢？
4. 在`rective`方法中可知，`baseHandlers`是触发`createReactiveObject`传递的第三个参数：`mutableHandlers`
5. 而`mutableHandlers`则是`pacakages/reactivity/scr/baseHandler.ts`中导出的对象
6. 所以我们到`packages/reactivity/src/baseHandlers.ts`中，为他的`get(createGetter)`和`set(createSetter)`分别打入一个断点
7. 我们知道`get`和`set`会在`取值`和`赋值`时触发，所以此时这两个断点`不会执行`
8. 最后`reactive`方法内执行了`proxyMap.set(target, proxy)`方法
9. 最后返回了代理对象
10. 那么至此`reactive`方法执行完成

由以上执行逻辑可知，对于`reactive`方法而言，其实做的事情非常简单

1. 创建了`proxy`
2. 把`proxy`加到了`proxyMap`里面
3. 最后返回了`proxy`

### effect

那么接下来我们分析`effect`

1. 在`packages/reactivty/src/effect.ts`第 170 行可以找到`effect`方法，在这里给一个断点

2. 执行`new ReactiveEffect(fn)`,而其中的`fn`就是我们传入的匿名函数

   1. 这里涉及到了一个类`ReactiveEffect`
   2. 查看该类可知，内部实现了两个方法
      1. `run`
      2. `stop`
   3. 我们分别为 以上两个方法**增加断点**

3. 代码继续进行

4. 可以发现执行了`run`方法，进入方法内部

   1. 执行了`activeEffect = this`,赋值完成之后，`activeEffect`为**传入的匿名函数 fn**

   2. 然后执行 `return this.fn()` 触发 `fn`函数

   3. 我们知道`fn`函数其实就是**传入的匿名函数**，所以

      ```javascript
      document.querySelector('#app').innerText = obj.name
      ```

5. 但是大家不要忘记，`obj`是一个`proxy`，`obj.name`会触发`getter`,所以接下来我们就会进入到`mutableHandlers`的`createGetter`中

   1. 在该代码中，触发了该方法`const res = Reflect.get(target, key, receiver)`
   2. 此时的`res`为张三
   3. 注意：接下来触发了`track`函数，该函数是一个重点函数，track 在此为**追踪**的意思，我们来看它内部都做了什么
      1. 在 4-1 步，为`activeEffect`进行了赋值，我们知道`activeEffect`代表的就是`fn函数`
      2. 执行代码可知，`track`内部主要做了两件事情
         1. 为`targetMap`进行赋值，`targetMap`的组成比较复杂
            1. Key: target
            2. Value: Map
               1. Key: key
               2. Value: Set
         2. 最后执行了`trackEffects(dep, eventInfo)`
            1. 其中`eventInfo`是一个对象，内部包含四个属性：**其中 effect 即为 activeEffect 即 fn 函数**
         3. 在 `trackEffects`函数内部，核心也是做了两件事情
            1. 为`dep(targetMap[target][key]得到的Set实例子)`添加了`activeEffect`函数
            2. 为`activeEffect`函数的`静态属性`deps，增加了一个值`dep`
            3. 即：**建立起了 dep 和 activeEffect 的联系**
         4. 那么至此，整个`track`的核心逻辑执行完成
         5. 我们可以把整个`track`的核心逻辑说成：**收集了 activeEffect(即：fn)**
         6. 最后在`createGetter`函数返回了`res`（即：张三）
         7. 至此，整个`effct`执行完成

由以上逻辑可知，整个`effect`主要做了三件事情：

1. 生成`ReactiveEffect`实例
2. 触发`fn`方法，从而激活`getter`
3. 建立了`targetMap`和`activeEffect`之间的联系
   1. `dep.add(activeEffect)`
   2. `activeEffect.deps.push(dep)`

那么至此，**页面中即可展示 obj.name**，但是不要忘记，等待两秒之后，我们会修改`obj.name`的值，我们知道，这样会触发`setter`,那么接下来我们来看`setter`中又做了什么呢？

1. 两秒后触发`setter`,会进入到`packages/reactivity/src/baseHandlers.ts`中的`createSetter`方法中

2. 创建变量：`olsValue` = "张三"

3. 创建变量: `value` = 李四

4. 执行`const result = Reflect.set(target, key, value, receiver)`，即：修改了`obj`的值为 "李四"

5. 触发: `trigger(traget, TriggerOpTypes.SET, key, value, oldValue)`, 此时各个参数的值为

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeecd9eb840e4b3ba2254ea990a9c395~tplv-k3u1fbpfcp-watermark.image?)

6. `trigger`在这里为**触发**的意思，那么我们来看`trigger`内部做了什么

   1. 首先执行：`const desMap = targetMap.get(target)`, 其中`targetMap`即我们在`track`函数中，保存`activeEffect`的`targetMap`

   2. 然后执行到: `deps.push(desMap.get(key))`. `depsMap.get(key)`获取到的即为之前保存的`activeEffect`，即`fn`函数

   3. 然后触发`triggerEffects(deps[0], eventInfo)`,我们来看`triggerEffects`中做了什么；

      1. 声明常量：`const effects = isArray(dep) ? dep :[...dep]` 此时的 `effects`保存的为`fn`的集合

      2. 遍历`effects`，执行: `triggerEffect(effect, debuggerEventExtraInfo)`方法，那么我们来看`triggerEffect`做了什么

         1. 执行`effect.run`方法，已知：`effect`是一个`ReactiveEffect`的类型的对象，则`run`方法会触发 `ReactiveEffect`的`run`,那么我们接下来来看`这一次`进入 `run`方法时，内部做了什么？

            1. 首先还是为`activeEffect = this` 赋值，但是要**注意**：此时的`this`不再是一个`fn`,而是一个复杂对象

               ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8452bef6418e45a095e16290a920b9a2~tplv-k3u1fbpfcp-watermark.image?)

            2. 最后执行`this.fun()`即：effect 传入的匿名函数

            3. 至此，`fn`执行，意味着`document.querySelector("#app").innerText= "李四"` 页面将会发生变化

      3. `triggerEffect` 完成

      4. `triggerEffects`完成

7. `trigger`完成

8. `setter`完成

由以上逻辑可知，整个`setter`主要做了 2 件事情

1. 修改`obj`的值
2. 触发`targetMap`下保存的`fn`函数

### 总结

那么到这里，我们就整个的跟踪了`pacakges/vue/examples/mine/reactive.html`的实例中的

1. `reactive`函数
2. `effect`函数
3. `obj.name = xxx` 表达式

这三块代码背后，`vue`究竟做了什么。虽然整个的过程比较复杂，但是如果我们简单的来看，其实内部的完成还是比较简单的

1. 创建 `proxy`
2. 收集`effect`的依赖
3. 触发收集的依赖

那么接下来我们自己的实现，将会围绕着这三个核心的理念进行

## 03：框架实现：构建 reactive 函数，获取 proxy 实例

根据上一小节的内容可知，整个`reactive`函数，本质上是返回了一个`proxy`实例，那么我们这一小节，就先去实现这个`reactive`函数，得到`proxy`实例

1. 创建`packages/reactivity/src/reactive.ts`模块

   ```javascript
   import { mutableHandlers } from "./baseHandlers"

   /**
    * 响应性 Map 缓存对象
    * key: target
    * val: proxy
    */
   export const reactiveMap = new WeakMap<object, any>()
   /**
    * 创建响应性对象
    * @param target  被代理对象
    * @param baseHandlers handlder
    * @param proxyMap 代理对象
    * @returns
    */
   function createReactiveOject(target: object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
     // 如果该实例已经被代理，则直接读取即可
     const existingProxy = proxyMap.get(target)
     if (existingProxy) {
       return existingProxy
     }
     // 未被代理则生成 proxy 实例
     const proxy = new Proxy(target, baseHandlers)
     // 缓存该对象
     proxyMap.set(target, proxy)
     return proxy
   }

   /**
    * 为复杂数据类型，创建响应性对象
    * @param target 被代理对象
    * @returns 代理对象
    */
   export function reactive(target: object) {
     return createReactiveOject(target, mutableHandlers, reactiveMap)
   }
   ```

2. 创建`packages/reactivy/src/baseHandlers.ts`模块

   ```javascript
   /**
    * 响应性的 handler
    */
   export const mutableHandlers: ProxyHandler<object> = {}
   ```

3. 那么此时我们就已经构建了一个基本的`reactive`方法，接下来我们可以通过**测试案例**测试一下

4. 创建`packages/reactivity/src/index.ts`模块，作为`reactivity`的入口模块

   ```javascript
   export { reactive } from './reactive'
   ```

5. 在`packages/vue/src/inedx.ts`中，导入`reactive`模块

   ```javascript
   export { reactive } from '@vue/reactivity'
   ```

6. 执行`npm run build`进行打包，生成`vue.js`

7. 创建`packages/vue/examples/reactivity/reactive.html`文件，作为测试实例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <script src="../../dist/vue.js"></script>
     <body></body>
     <script>
       const { reactive } = Vue
       const obj = reactive({
         name: '张三',
       })
       console.log(obj)
     </script>
   </html>
   ```

8. 运行到`Live Server`可见打印了一个`proxy`对象实例

那么至此我们已经得到了一个基础的`reactive`函数，但是在`reactive`函数中我们还存在三个问题

1. `WeakMap`是什么？它和`MaP`有什么区别？
2. `mutableHandlers`现在是一个空的，我们又该如何实现呢？
3. 难不成以后每次测试时，都要打包一次吗？

那么我们一个一个来看

## 04：框架实现：什么是 WeakMap? 它和 Map 有什么区别

对比[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)和[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)的文档可知，他们两个具备一个核心共同点，那就是:**都是{key, value}**的结构对象

但是对于`WeakMap`而言，它却存在两个不同的地方

1. `key`必须是对象
2. `key`是弱引用的

其中第一个不同点比较好理解，但是第二个不同点是什么意思呢？那么我们本小节就来看一下这个**弱引用**指的是什么

> 概念：
>
> 弱引用：不会影响垃圾回收机制。即: WeakMap 的 key **不再存在任何引用时**，会直接被回收
>
> 强引用：会影响垃圾回收机制，存在强应用的对象永远**不会**被回收

我们来看下面两个例子

```javascript
let obj = { name: '孙悟空' }
// 声明 Map 对象
const map = new Map()
// 保存键值对
map.set(obj, 'value')
// 把 obj 置空
obj = null
```

在当前这段代码中，如果我们在浏览器控制台中，打印 map，结果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ded635b78834dcc8354e21c5f85419a~tplv-k3u1fbpfcp-watermark.image?)

即：**虽然 obj 已经不存在任何引用了，但是它并没有被回收，依然存在于 Map 实例中**。这就证明 `Map`是强应用的，哪怕`obj`手动设置为 `null`,但是它依然存在于`Map实例中`

接下来同样的代码，我们来看 `WeakMap`

```javascript
let obj = { name: '孙悟空' }
// 声明 WeakMap 对象
const wm = new WeakMap()
// 保存键值对
wm.set(obj, 'value')
// 把 obj 置空
obj = null
```

在当前这段代码中，如果我们在浏览器中，打印`wm`，结果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd2dc0ad3ded44b78fb86aa765310697~tplv-k3u1fbpfcp-watermark.image?)

此时`WeakMap`中不存在任何任何值，即：**obj 不存在其他引用时，WeakMap 不会阻止垃圾回收，基于 obj 的引用将会被清除**。这就证明了`WeakMap`的**弱引用特性**

### 总结

那么由以上可知，对于`WeakMap`而言，它存在两个比较重要的特性

1. `key` 必须是对象
2. `key` 是弱引用的

### 好文推荐

[JS WeakMap 应该什么时候使用](https://www.zhangxinxu.com/wordpress/2021/08/js-weakmap-es6/)

## 05: 框架实现：CreateGetter && createSetter

1. 接下来我们来实现`mutableHandlers`函数, 对于当前这个 `proxyHandler`类型的函数而言，它是可以监听到`set` `get`函数的 ,我们就在其中进行实现

   ```javascript
   export const mutableHandlers: ProxyHandler<object> = {
     set,
     get,
   }
   ```

2. 这里的`get` `set`方法就是整个 handler 函数的一个核心部分，我们依次来进行实现

3. 首先实现`get`方法, 这个方法就是一个做了一个返回值的处理，并且每次触发时候，我们要对这个触发的 `getter` 的 函数进行对应的**依赖收集**，以便于在进行对应属性 `set` 触发时候，进行一个依赖函数的触发

   ```javascript
   const get = createGetter()

   function createGetter() {
     return function get(
       target: object,
       key: string | symbol,
       receiver: object
     ) {
       const res = Reflect.get(target, key, receiver)
       // 这里进行依赖收集
       track(target, key)
       return res
     }
   }
   ```

4. 接着实现`set`方法，`createSetter`也是一个闭包函数，返回`set 函数`；针对于 `set`函数而言，它具有四个参数，返回值同样我们利用`Reflect`处理后的结果作为返回值。同样的，在这里我们要进行依赖的触发。

   ```javascript
   const set = createSetter()

   function createSetter() {
     return function set(
       target: object,
       key: string | symbol,
       newValue: unknown,
       receiver: object
     ) {
       const result = Reflect.set(target, key, newValue, receiver)
       // 触发依赖
       trigger(target, key, newValue)
       return result
     }
   }
   ```

5. 接下来，我们来实现`track`和`trigger`

6. 创建`packages/reactivity/effects.ts`文件

   ```javascript
   export function track(target: object, key: unknown) {
     console.log('track:收集依赖')
   }

   export function trigger(target: object, key: unknown, newValue: unknown) {
     console.log('trigger:触发依赖')
   }
   ```

7. 接着，我们在`baseHandlers.ts`代码中，引入`track`、`trigger`,至此，我们就实现了`CreateGetter && createSetter`的大概逻辑

   ```javascript
   import { track, trigger } from './effect'
   ```

8. 我们需要对以上代码进行一个测试，修改`packages/vue/examples/reactivity/reactive.html`,修改后的代码如下

   ```javascript
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <script src="../../dist/vue.js"></script>
     <body></body>
     <script>
       const { reactive } = Vue
       const obj = reactive({
         name: '张三'
       })
       console.log(obj.name) // 触发 get 函数
       obj.name = '李四' // 触发 set 函数
     </script>
   </html>
   ```

9. 因为我们修改框架内部代码，所以我们需要重新打包, 重新执行`npm run build`命令，在`dist`目录下生成最新的`vue`文件

10. 在`Live Server`打开的测试页面，就可以看到如下打印结果

    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3ff740802354b1bba4b52b8beef45a2~tplv-k3u1fbpfcp-watermark.image?)

## 06: 热更新的开发时：提升开发体验

经过上一节的学习，我们已经成功的可以触发对应的`track`和`trigger`函数，但是在上一小节遇到了一个打包问题：就是每一次修改库代码后，都需要重新打包，然后我们才可以执行测试代码看到最新的逻辑效果。

那么这样就给以后得调试带来了很大的不便，有没有一种方式可以解决如此繁琐的过程呢？比如：热更新，当然是可以的

我们目前使用的打包工具是`rollup`，[官方命令行标志](https://www.rollupjs.com/guide/command-line-reference)也是支持的

```
-c, --config <filename>     使用配置文件（如果使用参数但是值没有指定, 默认就是 rollup.config.js)
-w, --watch                 监听 bundle 中的文件并在文件改变时重新构建
```

所以，我们修改`package.json`中的脚本，新增加一个`dev`命令

```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w" // 新增
  }
}
```

运行命令`npm run dev`，`rollup`就会实时监听包文件的变化，

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5779b26396004596aba06bbf3e306678~tplv-k3u1fbpfcp-watermark.image?)

我们可以修改`packages/reactivity/effects.ts`文件（一旦修改保存，`rollup 就会重新执行`）

```javascript
export function track(target: object, key: unknown) {
  console.log("track:收集依赖")
}

export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log("trigger:触发依赖
	console.log("WATCH")
}
```

再次回到浏览器中查看控制台，就可以看到如下打印结果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d66256f243d741b684118ed70fdcf9d1~tplv-k3u1fbpfcp-watermark.image?)

## 07: 框架实现：构建 effect 函数，生成 RectiveEffect 实例

根据之间的测试实例我们知道，在创建好了`reactive`实例之后，接下来我们需要触发`effect`：

```javascript
// 调用 effect 方法
effect(() => {
  document.querySelector('#app').innerText = obj.name
})
```

根据第二节，可查看的源码可知，在`effect`中，我们生成了`ReactiveEffect`实例，并且触发了`getter`（`obj.name` 触发的）

那么接下来我们就要完成这一系列的操作

1. 在`packages/reactivity/src/effect.ts`中，创建`effect`函数

   > effect 函数接受一个函数作为参数

   ```javascript
   // 表示当前被激活的 ReactiveEffect 实例
   export let activeEffect: ReactiveEffect | undefined

   /**
    * effect 函数
    * @param fn 执行方法
    * @returns 以 ReactiveEffect 实例为 this 的执行函数
    */
   export function effect<T = any>(fn: () => T) {
     // 生成 ReactiveEffect 函数
     const _effect = new ReactiveEffect(fn)
     _effect.run()
   }

   export class ReactiveEffect<T = any> {
     constructor(public fn: () => T) {
       this.fn = fn
     }
     run() {
       activeEffect = this
       return this.fn()
     }
   }
   ```

2. 然后在`packages/reactivity/src/index.ts`中进行导出

   ```javascript
   export { effect } from './effect'
   ```

3. 在`packages/vue/src/index.ts`中进行导出

   ```javascript
   export { reactive, effect } from '@vue/reactivity'
   ```

4. 修改测试用例代码

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <script src="../../dist/vue.js"></script>
     <body>
       <div id="app"></div>
     </body>
     <script>
       const { reactive, effect } = Vue
       const obj = reactive({
         name: '张三',
       })
       effect(() => {
         document.querySelector('#app').innerText = obj.name
       })
     </script>
   </html>
   ```

5. 可以看到页面中成功的显示了渲染的内容

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ff161a4be8e43acb02791975e7beaed~tplv-k3u1fbpfcp-watermark.image?)

那么次吃，我们成功**渲染了数据到 html 中**,那么接下来我们需要做就是:**当 obj.name 触发 setter 时，修改视图**，以此就可以实现**响应式数据变化**

所以，下面我们就需要分别处理`getter`和`setter`对应的情况了

## 08：框架实现：track && trigger

根绝我们在`packages/reactivity/scr/baseHandlers.ts`中的代码可知，当触发`getter`行为时，其实我们会触发`track`方法，进行**依赖收集**，当触发**setter**行为时，会触发`tritgger`方法，来触发依赖

那么这里就涉及到了两个概念

1. **依赖收集：track**
2. **触发依赖：trigger**

所以接下来如果我们想要实现这两个函数，那么就需要先搞清楚什么是`依赖收集`和`触发依赖`

### 什么是响应性

根据大家的开发经验和我们在第二小节查看源代码可知，所谓的响应性其实指的就是：**当响应性数据触发 setter 时触发 fn 函数**

那么想要达到这样一个目的，那就必须要在：**getter 时能够收集当前的 fn 函数，以便在 setter 的时候可以执行相应的 fn 函数**

但是对于收集而言，如果仅仅是把 fn 存起来自然是不够的，我们还需要知道，当前的这个 fn 是 **哪一个响应式数据对象的哪个对象**对应的，只有这样我们才可以在**该属性**触发 setter 的时候，准确的执行响应性

那么我们应该如搞定这一点呢？

### 如何进行依赖收集

大家还记不记得，我们在`packages/reactivity/src/reactive.ts`中创建过一个`WeakMap`

```javascript
export const reactiveMap = new WeakMap<object, any>()
```

我们知道`WeakMap`的`key`必须是一个对象，并且`key`是一个弱引用的

那么大家想一想我们可不可以这样做

1. `WeakMap`
   1. key: 响应性对象
   2. Value: Map 对象
      1. key：响应性对象的指定的属性
      2. Value: 指定对象的指定属性的执行函数

图表表示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/579143b2e7d9416691230e9d9143830b~tplv-k3u1fbpfcp-watermark.image?)

那么这样我们就可以关联上**指定对象的指定属性**与**执行函数 fn**之间的关系，当触发 `setter` 时执行执行**对应对象的指定属性的 fn** 即可

## 09： 框架实现：构建 track 依赖收集函数

那么这本小节，我们就来实现`track`函数，明确一下最终的目标，我们期望最终是`weackMap`中可以保存一下数据结构

`WeakMap`:

1. Key: 响应性对象
2. Value: Map 对象
   1. Key: 响应性对象的指定对象属性
   2. value：指定对象的指定属性的执行函数

在`packages/reactivity/src/effect.ts`写入如下代码

```typescript
type KeyToDepMap = Map<any, ReactiveEffect>
/**
 * 收集所有依赖的 weakMap 实例：
 * 1. key: 响应性对象
 * 2. value: map 对象
 *    1. key: 响应性对象的指定属性
 *    2. value: 指定对象的指定属性的 执行函数
 */
const targetMap = new WeakMap<any, KeyToDepMap>()
/**
 * 用于收集依赖的方法
 * @param target WeakMap 中的 key
 * @param key 代理对象的 key, 当依赖被触发时，需要根据该 key  获取
 * @returns
 */
export function track(target: object, key: unknown) {
  // 如果不存在执行函数，则直接 return
  if (!activeEffect) {
    return
  }
  // 尝试从 taregtMap 中，根据 target 获取 map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 如果获取不到，则生成 新的 map 对象，并把该对象赋值给对应的 value
    targetMap.set(target, (depsMap = new Map()))
  }
  // 为指定 map, 指定 key 设计回调函数
  depsMap.set(key, activeEffect)
  // 临时打印
  console.log(targetMap, 'targetMap')
}
```

此时运行测试函数，查看打印的`depsMap`，得到以下数据

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e45ae0abc5df494b8e29f77951cd9e84~tplv-k3u1fbpfcp-watermark.image?)

## 10： 框架实现：构建 trigger 触发依赖

在上一小节中，我们已经成功保存依赖到`WeakMap`中了，那么接下里我们就可以在`setter`的时候触发保存的依赖，以此来达到**响应行**数据的效果了

在`packages/reactivity/src/effects.ts`中

```typescript
/**
 * 触发依赖的方法
 * @param target WeakMap 的 key
 * @param key 代理对象的 key，当依赖被触发时，需要根据该 key 获取
 * @returns
 */
export function trigger(target: object, key: unknown) {
  console.log('依赖触发了')
  // 依据 target 获取存储的 map 实例
  const depsMap = targetMap.get(target)
  // 如果 depsMap 不存在，则直接 return
  if (!depsMap) {
    return
  }
  // 依据key, 从 depsMap 中取出 value，该 value 是一个 ReactiveEffect 类型的数据
  const effect = depsMap.get(key) as ReactiveEffect
  // 如果 effect 不存在，则直接 return
  if (!effect) {
    return
  }
  //  执行 effect 中保存的 fn 函数
  console.log('依赖触发了')
  effect.fn()
}
```

此时我们就可以触发 `setter` 时，执行保存的 `fn` 函数了

修改我们的测试代码`packages/vue/example/reactive/index.html`,修改代码内容如下

```javascript
const { reactive, effect } = Vue
const obj = reactive({
  name: '孙悟空',
  age: 80,
})
effect(() => {
  document.getElementById('app').innerText = obj.name
})

setTimeout(() => {
  obj.name = '猪八戒'
}, 2000)
```

此时我们在`Live Server`打开的页面控制台中可以看到如下效果：页面中的内容 2s 后发生了改变

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e081a67f62d047ac822fb9557d71ef71~tplv-k3u1fbpfcp-watermark.image?)

那么证明，此时：**指定对象的指定属性对应的 fn **已经成功的保存到了 `WeakMap` 中了

## 11： 总结：单一依赖的 reactive

通过以上的努力，我们目前已经构建了一个简单的`reactive`函数，使用`reactive`函数，配合`effect`可以实现在一个**响应式数据渲染功能跟**，那么这一小节，我们把整个的流程做一个总结

1. 首先我们在`packages/reactivity/src/reactive.ts`中，创建了一个`reactive`函数，该函数可以帮助我们生成一个`proxy`实例对象
2. 通过该`proxy`实例的`handler`可以监听到对应的`getter`和`setter`
3. 然后我们在`packages/reactivity/src/effects.ts`中，创建了一个`effect`函数，通过该函数可以创建一个`ReactiveEffect`的实例，该实例的构造函数可以接收传入的回调函数`fn`，并且提供了一个`run`方法
4. 触发`run`可以为`activeEffect`进行赋值，并且执行`fn`函数
5. 我们需要再`fn`函数中触发`proxy`的`getter`,以此来激活`handler`的`get`函数
6. 在`handler`的`get`函数中，我们通过`WeakMap`收集了**指定对象，指定属性**的`fn`，这样的一步操作，我们把它叫做**依赖收集**
7. 最后我们可以在**任意时刻**，修改`proxy`的数据，这样会触发`handler`的`setter`
8. 在`handlder`的`setter`中，我们会根据**指定对象**的`target`的**指定属性 key** 来获取到保存的**依赖**，然后我们只需要触发依赖，即可达到修改数据的效果

## 12 ：功能升级：响应数据对应多个 effect

在我们之前的实现中，还存在一个小的问题，那就是**每一个响应性数据属性只能对应一个 effect 回调**

我们来看下面这个例子，`packages/vue/examples/reactivity/reactive-dep.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <div id="p1"></div>
      <div id="p2"></div>
    </div>
  </body>
  <script src="../../dist/vue.js"></script>
  <script>
    const { reactive, effect } = Vue
    const obj = reactive({
      name: '孙悟空',
      age: 80,
    })
    effect(() => {
      document.querySelector('#p1').innerText = obj.name
    })
    effect(() => {
      document.querySelector('#p2').innerText = obj.name
    })
    setTimeout(() => {
      obj.name = '猪八戒'
    }, 2000)
  </script>
</html>
```

在以上的代码中，我们新增了一个`effect`函数，即：**name 属性对应两个 DOM 的变化**

但是当我们运行代码的时候发现，`p1`的更新渲染是无效的

那么这是为什么呢？

查看我们的代码可以发现，我们在构建`keyToDepMap`对象时，它的`value`只能是一个`ReactiveEffect`，所以就导致了**一个 key 只能对应一个有效的 effect 函数**

那么假如我们期望：一个 `key`可以对应**多个**有效的`effect`函数的话，那么应该怎么做呢？

可能有些同学已经想到了，我们只需要**keyToDepMap 的 Value 可以对应一个数组**不就可以了吗？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbe31417028d4013bf1f4306ebce6107~tplv-k3u1fbpfcp-watermark.image?)

如上图所示，我们可以构建一个`Set`（set 是一个“数组”，值不会重复）类型的对象，作为 `Map`的 `Value`

我们可以把它叫做`Dep`,通过 `Dep`来保存**指定 key 的所有依赖**

那么明确好了这样的概念之后，接下来我们到项目中，进行一个对应的实现

## 13: 框架实现：构建 Dep 模块，处理一对多的依赖关系

通过上一节的学习，我们知道对于我们`effect.ts`中的`keyToDepMap`而言，它的一个 value 不能再是一个简单的`ReacticveEffect`了，而需要是一个集合(使用 Set 类型)

1. 修改`effect.ts`

   ```typescript
   type KeyToDepMap = Map<any, Dep>
   ```

2. 我们新建`reactivity/src/dep.ts`文件, 内容如下

   ```typescript
   import { ReactiveEffect } from './effects'
   // 声明一个 Set 合集，值为 ReactiveEffect 类型
   export type Dep = Set<ReactiveEffect>
   // 创建一个集合并返回，解构
   export const createDep = (effects?: ReactiveEffect[]) => {
     const deps = new Set<ReactiveEffect>(effects) as Dep
     return deps
   }
   ```

3. 然后我们修改`reactivity/src/reactive.ts`文件中的**收集依赖 track**和**触发依赖函数 trigger**

   ```typescript
   import { isArray } from '@vue/shared'
   export function track(target: object, key: unknown) {
     console.log('track:收集依赖')
     if (!activeEffect) {
       return
     }
     let depsMap = targetMap.get(target)
     if (!depsMap) {
       targetMap.set(target, (depsMap = new Map()))
     }
     //  ------------------start:  以下为修改 ---------------
     // 根据 指定属性获取 依赖集合
     let deps = depsMap.get(key)
     if (!deps) {
       // 如果没有，就创建
       depsMap.set(key, (deps = createDep()))
     }
     trackEffects(deps)
     //  ------------------ end ---------------
   }

   /**
    * 利用 dep 依次追踪指定 key 的所有 effect
    * @param dep
    */
   export function trackEffects(deps: Dep) {
     if (activeEffect) {
       // 添加 包含当前依赖项函数 实例
       deps.add(activeEffect)
     }
   }

   // 触发依赖函数
   export function trigger(target: object, key: unknown, newValue: unknown) {
     console.log('trigger:触发依赖')
     const depsMap = targetMap.get(target)
     if (!depsMap) {
       return
     }
     //  ------------------start:  以下为修改 ---------------
     // 从当前依赖集合中获取指定属性的所有依赖实例
     const deps: Dep | undefined = depsMap.get(key)
     if (!deps) return
     // 如果有就依次执行
     triggerEffets(deps)
     //  ------------------ end ---------------
   }

   /**
    *  依次触发 dep 中 保存的依赖
    * @param deps
    */
   export function triggerEffets(deps: Dep) {
     // 依赖项目集合是否是数组，不是就变为一个数据，
     const effects = isArray(deps) ? deps : [...deps]
     effects.forEach((effect) => {
       triggerEffect(effect)
     })
   }

   export function triggerEffect(effect: ReactiveEffect) {
     effect.fn()
   }
   ```

4. 然后再次执行测试示例`packages/vue/examples/reactivity/reactive-dep.html`,可以看到 2s 后，视图均发生了变化

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6921a3f34de841f880d35fa54f486d09~tplv-k3u1fbpfcp-watermark.image?)

## 14：reactive 函数的局限性

那么此时我们就已经完成了相对完善的`reactive`函数，但是它依然还是有很多局限性的。

有哪些局限性呢，我们可以思考以下两个问题：

1. 对于目前的`reactive`函数而言，它支持 简单数据类型吗？
2. 当我们对`reactive`返回值进行**解构**之后，那么它还具备响应性吗？

### 对于目前的`reactive`函数而言，它支持 简单数据类型吗？

创建文件`packages/vue/examples/reactivity/reactive-test.html`,内容如下

```html
<script>
  const { reactive, effect } = Vue
  const obj = reactive('孙悟空')
  console.log(obj)
</script>
```

打开浏览器，会发现控制台报错，信息如下

> Uncaught TypeError: Cannot create proxy with a non-object as target or handler

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/954f151841844402b36576ebda23b05b~tplv-k3u1fbpfcp-watermark.image?)

为什么会抛出这样一个错误呢？因为我们知道我目前的`createReactiveOject`函数中的最终生成 proxy 实例调用的是

```javascript
const proxy = new Proxy(target, baseHandlers) // target 即为 reactive 函数的参数
```

而`new Proxy`的第一个参数官方文档原话如下：**target: 要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）**，所以会抛出一个错误

### 当我们对`reactive`返回值进行**解构**之后，那么它还具备响应性吗？

> 答案：不具备了

修改文件`packages/vue/examples/reactivity/reactive-test.html`,内容如下

```javascript
const { reactive, effect } = Vue
const obj = reactive({
  name: '孙悟空',
  age: 500,
})
const { name } = obj
effect(() => {
  document.querySelector('#app').innerText = name
})
setTimeout(() => {
  name = '猪八戒'
}, 2000)
```

打开浏览器，看到如下结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee2b939e154748ee82af157523475cd0~tplv-k3u1fbpfcp-watermark.image?)

可以看出来，2s 后，数据发生了变化，但是视图没有发生变化；由此可见：响应性数据经过解构后，会失去了响应性

为什么呢？

因为我们触发 `getter`和`setter`行为的核心在于数据需要是`proxy`类型的，而经过解构以后的属性就是一个普通的数据类型，自然就不会触发`setter`和`getter`行为的监听。

### vue3 的处理

对于第一个问题，我们知道 `vue3`提供了一个`ref`函数来实现简单数据类型的响应性呢？

对于第二个问题，`vue3`提供了`toRef`以及`toRefs`来保持数据解构后的一个响应性

那么他们分别是怎么做的呢，后续继续讲解

## 15：总结

在本章，我们初次解除了`reactivity`模块，并且在模块中构建了`reactive`响应性函数

对于`reactive`的响应性函数而言，我们知道它：

1. 是通过`proxy`的`setter`和`gsetter`来实现的数据监听
2. 是需要通过配合 `effect` 函数进行使用的
3. 基于`WeakMap`完成的依赖收集和处理
4. 可以存在一对多的依赖关系

同时我们有也了解了`reactiv`函数的不足：

1. `reactive`只能对**复杂数据**类型进行使用
2. `reactive`的响应性数据，不可进行解构

因为`reactive`的不足，所以`vue3`又为我们提供了`ref`函数构建响应性，那么

1. `ref`函数的内容是如何进行实现的呢 ？
2. `ref`可以构建简单数据类型的响应性吗 ？
3. 为什么`ref`类型的数据，必须要通过 `.value`访问值呢？

带着以上三个问题，我们来看下一章节 **ref 的响应性**
