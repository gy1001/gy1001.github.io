# 06-

响应系统-compute && watch

## 01: 开篇

对于响应性系统而言，除了我们在前两章接触的`ref`和`reactive`之外，还有另外来个两个也是我们经常使用的，那就是

1. 计算属性`computed`
2. 侦听器`watch`

那么在本章，我们就来看一下，这两个`API`是如何进行实现的

在看本章节的内容之前，大家需要：**搞明白 vue3 中 computed 和 watch 的作用和基本用法**

搞明白了这两个 `API`的基本用法之后，大家就可以开始本章节的学习啦~~~

## 02: 源码阅读：跟踪 vue3 源码实现逻辑

> 计算属性 computed 会**基于响应式依赖收集被缓存**，并且在依赖的响应式数据发生变化时候**重新计算**

那么根据计算属性的概念，我们可以创建对应的测试实例，例如：`packages/vue/examples/mine/computed.html`

```html
<script>
  const { computed, reactive, effect } = Vue
  const obj = reactive({
    name: '张三'
  })
  const computedObj = computed(() => {
    return '姓名：' + obj.name
  })
  effect(() => {
    document.querySelector('#app').innerText = computedObj.value
  })
  setTimeout(() => {
    obj.name = '孙悟空'
  }, 2000)
</script>
```

1. `computed`函数执行, 此时参数为一个函数，通过`isFunction`函数的处理,并把第一个参数(传递的函数)赋值给内部变量`getter`,而`setter`赋值为空

   ```typescript
   // packages/shared/src/index.ts
   export const isFunction = (val: unknown): val is Function => typeof val === 'function'
   
   // packages/reactivity/src/computed.ts
   export type ComputedGetter<T> = (...args: any[]) => T
   export type ComputedSetter<T> = (v: T) => void
   
   export function computed<T>(
     getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
     debugOptions?: DebuggerOptions,
     isSSR = false
   ) {
     let getter: ComputedGetter<T>
     let setter: ComputedSetter<T>
   
     const onlyGetter = isFunction(getterOrOptions) // 如果是函数，
     if (onlyGetter) {
       getter = getterOrOptions // 就赋值给 getter
       setter = __DEV__
         ? () => {
             console.warn('Write operation failed: computed value is readonly')
           }
         : NOOP
     } else {
       getter = getterOrOptions.get
       setter = getterOrOptions.set
     }
   
     const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)
   
     if (__DEV__ && debugOptions && !isSSR) {
       cRef.effect.onTrack = debugOptions.onTrack
       cRef.effect.onTrigger = debugOptions.onTrigger
     }
     return cRef as any
   }
   ```

2. 接着执行`new ComputedRefImpl`,创建一个`ComputedRefImpl`实例,`constructor`接收`getter setter等参数`,内部调用`new  ReactiveEffect`来实例化，并赋给给`this._effect`(说明调用 this._effect.run()方法时会调用传入的getter函数参数)。注意：这里有一个`_dirty`变量，它是来控制何时触发收集依赖。只有当其为`false`时，才会触发。

   ```typescript
   export class ComputedRefImpl<T> {
     public dep?: Dep = undefined
   
     private _value!: T
     public readonly effect: ReactiveEffect<T>
   
     public readonly __v_isRef = true	// 	如果用 isRef 判断，说明也会返回 true
     public readonly [ReactiveFlags.IS_READONLY]: boolean = false
   
     public _dirty = true
     public _cacheable: boolean
   
     constructor(
       getter: ComputedGetter<T>,
       private readonly _setter: ComputedSetter<T>,
       isReadonly: boolean,
       isSSR: boolean
     ) {
       //  注意： 这里多个第二个参数，是一个 scheduler 可以理解为一个调度器
       this.effect = new ReactiveEffect(getter, () => {
         if (!this._dirty) {
           this._dirty = true
           triggerRefValue(this)
         }
       })
       this.effect.computed = this
       this.effect.active = this._cacheable = !isSSR
       this[ReactiveFlags.IS_READONLY] = isReadonly
     }
   
     get value() {
       // the computed ref may get wrapped by other proxies e.g. readonly() #3376
       const self = toRaw(this)
       trackRefValue(self)
       if (self._dirty || !self._cacheable) {
         self._dirty = false
         // 这里调用的 fn 函数其实就是传递进来的 constructor 中的参数 getter
         self._value = self.effect.run()!
       }
       return self._value
     }
   
     set value(newValue: T) {
       this._setter(newValue)
     }
   }
   ```

3. 然后`computed`函数执行完毕，接着执行`effect`函数，会触发`computedObj.value`然后触发`ComputedRefImpl`中`get value()`函数。接着执行`trackRefValue(self)`来收集依赖。这时候判断`_dirty`状态，如果为真(此时为真)，`_dirty`又恢复为`false`，然后执行它的`run`方法(会执行回调，,它会导致 obj.name 的触发，也就是 reactive 的get行为，也就会收集当前依赖：getter 函数，并把函数的返回值也就是 computed 中的计算值赋值给`self._value`),接着返回`self._value`.此时`innerText`中展示的就是`姓名：张三`。

4. 然后联系之前学习内容，进行逻辑调用

至此，整个`obj.name`引发的副作用全部执行完成

由以上代码可知，整个的计算属性的逻辑是非常复杂的，我们来做一下整理

1. 整个实践由`obj.name`开始

2. 触发`proxy`实例的`setter`

3. 执行`trigger`,**第一次触发依赖**

4. 注意：此时`effect`包含调度器属性，所以会触发调度器

5. 在匿名函数中：**再次触发依赖**

6. 即：**两次都触发依赖**

7. 最后执行

   ```typescript
   		() => { return "姓名" + obj.name }
   ```

   得到值作为`computedObj`的值

### 总结

那么到这里我们基本上了解了`computed`的执行逻辑，里面涉及到了一些我们前面没有来了解过的概念，比如**调度器 schedular**,并且整体的`computed`的流程也是相当复杂的

所以接下来们就去实现`computd`的时候，分寸会一步步的进行。

## 03：框架实现：构建 computedRefImpl, 读取计算属性的值

对于 `computd`而言，整体比较复杂，所以我们将分步进行实现

那么对于本小节而言，我们首先的目标是：**构建 computedRefImpl 类，创建出 computed 方法，并且能够读取值**

1. 创建`packages/reactivity/src/computed.ts`

   ```typescript
   import { isFunction } from "@vue/shared"
   ```

   

04：框架实现：computed 的响应性：初见调度器，处理脏状态

05：框架实现：computed 的缓存性

06：总结：computed的计算属性

07：源码阅读：响应性的数据监听器 watch,跟踪源码实现逻辑

08：框架实现：深入 scheduler 调度系统实现机制

09：框架实现：初步实现 watch  数据监听器

10：问题分析：watch 下的依赖收集原则

11：框架实现：完成 watch 数据监听器的依赖收集

12：总结：watch 数据侦听器

13：总结
