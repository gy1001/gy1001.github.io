# 05-响应系统-ref 的响应性

## 01： 前言

在上一章中，我们完成了`reactive`函数，同时也知道了`reactive`函数的局限性，知道了仅靠`reactive`函数，`vue`是没有办法构建出完善的响应式系统的

所以我们还需要另外一个函数`ref`

本章我们将致力于解决以下三个问题

1. `	ref`函数是如何实现的呢？
2. `ref`可以构建简单数据类型的响应性吗？
3. 为什么`ref`类型的数据，必须要通过`.value`的形式访问值呢？

接下来准备好了吗？我们开始吧

## 02：源码阅读：ref  复杂数据类型的响应性

和学习`reactive`的时候一样，我们首先来看一下`ref`函数下，`vue3`的源码执行过程

1. 创建测试实例`packages/examples/mine/ref.html`（在 vue-next-3.2.37 项目中）

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>ref</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
     <script src="../../dist/vue.global.js"></script>
     <script>
       const { ref, effect } = Vue
       const obj = ref({
         name: '张三'
       })
       effect(() => {
         document.querySelector('#app').innerText = obj.value.name
       })
       setTimeout(() => {
         obj.value.name = '猪八戒'
       }, 2000)
     </script>
   </html>
   ```

2. 通过`Live Server`运行测试实例

3. `ref`的代码位于`packages/reactivity/src/ref.ts`之下，我们可以在这里打下断点

### ref 函数

1. `ref`函数中，直接触发`createRef`函数

   ```typescript
   export function ref(value?: unknown) {
     return createRef(value, false)
   }
   ```

   

2. 在`createRef`中，进行了判断如果当前如果已经是一个`ref`类型数据则直接返回，否则就**返回 RefImpl类型的实例**

   ```javascript
   export function isRef(r: any): r is Ref {
     return !!(r && r.__v_isRef === true) // 如果是 RefImpl类型的实例，会有一个 __v_isRef 属性标识
   }
   function createRef(rawValue: unknown, shallow: boolean) {
     if (isRef(rawValue)) {
       return rawValue
     }
     return new RefImpl(rawValue, shallow)
   }
   ```

3. 那么这个`RefImpl`是什么呢？

   ```typescript
   class RefImpl<T> {
     private _value: T
     private _rawValue: T
   
     public dep?: Dep = undefined
     public readonly __v_isRef = true
   
     constructor(value: T, public readonly __v_isShallow: boolean) {
       this._rawValue = __v_isShallow ? value : toRaw(value)
       this._value = __v_isShallow ? value : toReactive(value)
     }
   
     get value() {
       trackRefValue(this)
       return this._value
     }
   
     set value(newVal) {
       const useDirectValue =
         this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
       newVal = useDirectValue ? newVal : toRaw(newVal)
       if (hasChanged(newVal, this._rawValue)) {
         this._rawValue = newVal
         this._value = useDirectValue ? newVal : toReactive(newVal)
         triggerRefValue(this, newVal)
       }
     }
   }
   ```

   1. `RefImpl`是同样位于`packages/rectivity/ref.ts`之下的一个类
   2. 该类的构造函数中，执行了一个`toReactive`的方法，传入了`value`并把返回值赋值给了`this._value`,那么我们来看看`toReactive`的作用
      1. `toReactive`方法把数据分成了两种类型
         1. 复杂数据类型：调用了`reactive`函数，即把`value`变为响应性的
         2. 简单数据类型：直接把`value`原样返回
   3. 该类提供了一个别被`get`和`set`标记的函数`value`
      1. 当执行了 `xxx.value`时，就会触发`get`标记
      2. 当执行了`xxx.value = xxx`时，就会触发`set`标记
   4. 至此`ref`函数执行完毕

由以上逻辑可知：

1. 对于`ref`而言，主要生成了`RefImpl`的实例
2. 在构造函数中传入的数据进行了整理
   1. 复杂数据类型：转为响应性的`proxy`实例
   2. 简单数据类型：不处理直接返回
3. `RefImpl`分别提供了`get value`、`set value`以此来完成对`getter`和`setter`的监听，注意这里并没有使用`proxy`

### effect 函数

当 `ref`函数执行完毕之后，测试用例开始执行`effect`函数

`effect`函数我们之前已经跟踪过她的执行流程，我们知道整个`effect`主要做了3件事情

1. 生成`ReactiveEffect`实例
2. **触发 fn 方法，从而激活 getter**
3. 建立了 `targetMap`和`activeEffect`之间的联系
   1. `dep.add(activeEffect)`
   2. `activeEffect.deps.push(dep)`

通过以上可知，`effect`中会触发 `fn`函数，也就是说执行`obj.value.name`，那么根据`get value`机制，此时会触发`RefImpl`的`get value`方法

所以我们可以在 117 行增加断点，等代码进入`get value`

### get value()

1. 在`get value`中会触发`trackRefValue`方法

   1. 触发`trackEffects`函数，并且在此时为`ref`新增了一个`dep`属性

      ```typescript
      trackEffects(ref.dep || (ref.dep = createDep()), {
        target: ref,
        type: TrackOpTypes.GET,
        key: 'value'
      })
      ```

   2. 而`trackEffects`其实我们是有了解过的，我们知道`trackEffects`的主要作用就是:**收集所有的依赖**

2. 至此，`get value`执行完成

由以上逻辑可知

整个`get value`的处理逻辑还是比较简单的，主要是通过之前的`trackEffects`属性来收集依赖

### 再次出发 get value()

最后就是在两秒之后，修改数据源了

```javascript
setTimeout(() => {
  obj.value.name = '猪八戒'
}, 2000)
```

但是这里有一个很关键的问题，需要大家进行思考，那就是: **此时会触发 get value 还是 set value **?

我们知道以上代码可以拆解为：

```javascript
const value = obj.value
value.name = "猪八戒"
```

那么通过以上代码我们清晰可知，其实触发的应该是`get value`函数

在`get value`函数中

1. 再次执行`trackRefValue`函数
   1. 但是此时`activeEffect`为`undefined`，所以不会执行后续逻辑
2. 返回`this._value`
   1. 通过**构造函数**，我们可知，此时的`this._value`是经过`toReactive`函数过滤之后的数据，在当前实例中为`proxy`实例
3. `get value`执行完成

由以上逻辑可知

1. `const value`是`proxy`类型的实例，即：**代理对象**，被代理对象为`{name: "张三"}`
2. 执行`value.name = '李四'`，本质上就是触发了`proxy`的`setter`
3. 根据`reactive`的执行逻辑可知，此时会触发`trigger`的触发依赖
4. 至此，更新视图

### 总结

由以上逻辑可知：

1. 对于`ref`函数，会返回`RefImpl`类型的实例
2. 在该实例中，会根据传入的数据类型进行分开处理
   1. 复杂数据类型：转换为`reactive`返回的`proxy`实例
   2. 简单数据类型：不做处理，直接返回
3. 无论我们执行`obj.value.name`还是`obj.value.name = xx`本质上都是触发了`get value`
4. 之所以会进行**响应性**是因为`obj.value`是一个`reactive`函数生成的`proxy`

## 03: 框架实现：ref 函数-构建复杂数据类型的响应性

在上一小节中，我们已经查看了`vue3`中的`ref`函数针对复杂数据类型的执行逻辑，那么这一小节，我们就来进行代码的实现

1. 在`vue-next-mini`项目中，新建`packages/reactivity/src/ref.ts`文件

```typescript
import { createDep, Dep } from "./dep"
import { trackEffects } from './effects'
import { toReactive } from './reactive'

export function ref(value: unknown) {
  return createRef(value, false)
}

export function createRef(rawValue: unknown, isShallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefElmp(rawValue, isShallow)
}
// 判断是否属于 RefElmp 实例
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}

export class RefElmp<T> {
  private _value: T
  public readonly __v_isRef = true
  public dep?: Dep = undefined
  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }
}

export function trackRefValue(ref) {
  trackEffects(ref.dep || (ref.dep = createDep()))
}
```

2. 在`reactive.ts`中新增加`toReactive`函数

```typescript
import { isObject } from '@vue/shared'

// 如果是对象，就进行响应性处理，如果不是不做处理返回
export const toReactive = <T extends unknown>(value: T): T => isObject(value) ? reactive(value as object) : value
```

3. 在`packages/shared/src/index.ts`中增加`isObejct`函数

```typescript
export const isObject = (value: unknown) => value !== null && typeof value === "object"
```

4. 接着进行一些导出

   1. 在`packages/reactivity/src/index.ts`中导出`ref`,增加如下代码

      ```typescript
      export { ref } from "./ref"
      ```

   2. 在`packages/vue/src/index.ts`中导出`ref`,代码如下

      ```typescript
      export { reactive, effect, ref } from "@vue/reactivity"
      ```

5. 新建测试示例`packages/vue/example/reactive/ref.html`,内容如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>ref</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
     <script src="../../dist/vue.js"></script>
     <script>
       const { ref, effect } = Vue
       const obj = ref({
         name: '孙悟空',
         age: 80
       })
   
       effect(() => {
         document.querySelector('#app').innerText = obj.value.name
       })
       setTimeout(() => {
         obj.value.name = '猪八戒'
       }, 2000)
     </script>
   </html>
   ```

6. 运行打开页面，就可以看到页面数据的渲染，以及 2s  后页面视图的更新
