# 06-响应系统-compute && watch

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

4. 2s后，修改`reactive`类型的`obj.name`值，会触发`createSetter`函数的触发，接着调用`trigger`函数，然后调用`triggerEffects`函数，触发依赖。这里就出现了调度的作用。

   ```typescript
   export function triggerEffects(
     dep: Dep | ReactiveEffect[],
     debuggerEventExtraInfo?: DebuggerEventExtraInfo
   ) {
     const effects = isArray(dep) ? dep : [...dep]
     for (const effect of effects) {
       // 如果是 computed  属性
       if (effect.computed) { 
         triggerEffect(effect, debuggerEventExtraInfo)
       }
     }
     for (const effect of effects) {
       if (!effect.computed) {
         triggerEffect(effect, debuggerEventExtraInfo)
       }
     }
   }
   
   function triggerEffect(
     effect: ReactiveEffect,
     debuggerEventExtraInfo?: DebuggerEventExtraInfo
   ) {
     if (effect !== activeEffect || effect.allowRecurse) {
       if (__DEV__ && effect.onTrigger) {
         effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
       }
       // 如果有调度器，就要调用调度器函数
       if (effect.scheduler) { 
         effect.scheduler()
       } else {
         effect.run()
       }
     }
   }
   ```

5. 这里就会调用调度器函数， 也就是`computedRefImpl`中的如下代码,而此时`this._dirty`已经变为false，然后随后又变为true，并执行依赖的触发`triggerRefValue(this)`，这里就会重新调用`() => { document.querySelector('#app').innerText = computedObj.value}` 函数，更新视图

   ```typescript
   	  // ReactiveEffect第二个参数几十调度器函数
       this.effect = new ReactiveEffect(getter, () => {
         if (!this._dirty) {
           this._dirty = true
           triggerRefValue(this)
         }
       })
   ```

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

那么到这里我们基本上了解了`computed`的执行逻辑，里面涉及到了一些我们前面没有来了解过的概念，比如**调度器 scheduler**,并且整体的`computed`的流程也是相当复杂的

所以接下来们就去实现`computd`的时候，分寸会一步步的进行。

## 03：框架实现：构建 computedRefImpl, 读取计算属性的值

对于 `computd`而言，整体比较复杂，所以我们将分步进行实现

那么对于本小节而言，我们首先的目标是：**构建 computedRefImpl 类，创建出 computed 方法，并且能够读取值**

1. 创建`packages/reactivity/src/computed.ts`

   >  判断传递的参数是否是一个函数，如果是，就赋值给 getter
   >
   > 在 get value函数中进行收集依赖，以及触发回调赋值给_value,并返回 _value

   ```typescript
   // @vue/shared
   export const isFunction = (val: unknown): val is Function => typeof val === 'function'
   
   // packages/reactivity/src/effect.ts
   import { ComputedRelImpl } from './computed'
   export class ReactiveEffect<T = any> {
     computed?: ComputedRelImpl<T> // 新增加
     constructor(public fn: () => T) {
       this.fn = fn
     }
     run() {
       activeEffect = this
       return this.fn()
     }
   }
   
   //computed.ts
   import { isFunction } from "@vue/shared"
   import { Dep } from './dep'
   import { ReactiveEffect } from './effect'
   import { trackRefValue } from './ref'
   
   export function computed(getterOrOptions) {
     let getter
     if (isFunction(getterOrOptions)) {
       getter = getterOrOptions
     }
   
     const cRef = new ComputedRelImpl(getter)
     return cRef
   }
   
   export class ComputedRelImpl<T> {
     public dep?: Dep = undefined
     private _value!: T
     private readonly effect: ReactiveEffect<T>
     public readonly __v_isRef = true
     constructor(getter) {
       this.effect = new ReactiveEffect(getter)
       this.effect.computed = this
     }
     get value() {
       trackRefValue(this)
       this._value = this.effect.run()
       return this._value
     }
   }
   ```

2. 接着我们分别进行导出`computed`函数即可

   ```typescript
   // packages/reactivity/src/index.ts
   export { computed } from "./computed"
   // packages/vue/src/index.ts
   export { reactive, effect, ref, computed } from "@vue/reactivity"
   ```

3. 创建测试实例`packages/vue/example/reactive/computed.html`

   ```html
   <script>
     const { reactive, effect, computed } = Vue
     const obj = reactive({
       name: '孙悟空',
       age: 80
     })
   
     const computedObj = computed(() => {
       return '姓名：' + obj.name
     })
   
     effect(() => {
       document.getElementById('app').innerText = computedObj.value
     })
     setTimeout(() => {
       obj.name = '猪八戒'
     }, 2000)
   </script>
   ```

4. 运行浏览器，可以看到数据被成功渲染，此时数据还不是响应式的，所以 2s后的试图数据并不会发生变化

## 04：框架实现：computed 的响应性：初见调度器，处理脏状态

根据之间的代码可知，如果我们想要实现**响应性**，那么必须具备以下两个条件

1. **收集依赖**：该操作我们目前已经在`get value`中进行了
2. **触发依赖**：该操作我们目前尚未完成，而这个也是我们本小节主要需要做的事情

那么根据第二小节的源码可知，这部份代码是写在`ReactiveEffect`第二个参数上的

```typescript
 this.effect = new ReactiveEffect(getter, () => {
    if (!this._dirty) {
      this._dirty = true
      triggerRefValue(this)
    }
  })
```

这个参数是一个匿名函数，被叫做`scheduler`调度器

该匿名函数中，又涉及到一个`_dirty`变量，该变量我们把它叫做**脏**

那么想要实现`computed`的响应性，就必须要明白这两个东西的概念

### 调度器

调度器`scheduler`是一个相对比较复杂的概念，它在`computed`和`watch`中都有涉及，但是在当前的`computed`实现中，它的作用还算比较清晰

所以根据我们秉承的**没有使用就当做不存在**的概念，我们只需要搞清楚，它在当前的作用即可

根据我们第二小节的源码阅读，我们可以知道，此时的`scheduler`就相当于一个**回调函数**

在`triggerEffect`只要`effect`存在`scheduler`,就会执行该函数

### dirty 脏

对于脏变量，他其实代表的是一个状态，如果当前状态为真，那么在每次通过`.value`形式调用`get value`的是时候就会把这个`dirty`状态置为 false。然后在调用调度器函数的时候，又会重新置为`true`,并触发依赖`triggerRefValue`，页面视图就会更新。

也就是这个变量决定了我们在什么时候来触发依赖

### 代码实现

1. 在`ComputedRefImpl`类中添加相关属性

   ```typescript
   // 新增引入 triggerRefValue
   import { trackRefValue, triggerRefValue } from './ref'
   
   export class ComputedRelImpl<T> {
     public dep?: Dep = undefined
     private _value!: T
     private readonly effect: ReactiveEffect<T>
     public readonly __v_isRef = true
     // 新增加
     public _dirty = true 
     constructor(getter) {
       // 新增加调度器函数 scheduler
       this.effect = new ReactiveEffect(getter, () => {
         if (!this._dirty) {
           this._dirty = true
           triggerRefValue(this)
         }
       })
       this.effect.computed = this
     }
     get value() {
       trackRefValue(this)
       // 增加判断函数，脏状态为 true 时候执行,并置为 false
       if (this._dirty) {
         this._dirty = false
         this._value = this.effect.run()
       }
       return this._value
     }
   }
   ```

2. 同时`ReactiveEffect`也要进行更改，因为新增加了第二个参数调度器`scheduler`

   ```typescript
   export type EffectScheduler = (...args: any[]) => any
   export class ReactiveEffect<T = any>{
     public computed?: ComputedRelImpl<T>
     // 新增加 
     constructor(public fn: () => T, public scheduler: EffectScheduler | null = null) {
       this.fn = fn
     }
     run() {
       activeEffect = this
       return this.fn()
     }
   }
   ```

3. 接着我们需要更改依赖触发里面的逻辑，如果有调度器函数，就要执行调度器函数,修改`packages/reactivity/src/effect.ts`

   ```typescript
   export function triggerEffect(effect: ReactiveEffect) {
     if (effect.scheduler) {
       effect.scheduler()
     } else {
       effect.fn()
     }
   }
   ```

4. 这样我们就实现了`computed`的一个响应性，运行测试用例，我们就可以看到 2s 后视图发生了变化

## 05：框架实现：computed 的缓存性

那么到现在呢，我们已经实现了`computed`属性的一个响应性。但是如果大家使用过计算属性的话，大家就很清楚`Vue`中计算属性`computed`区别于函数的一个重要特点就是**具备缓存性**.也就是当我们多次触发计算属性的时候，他只会执行一次。

我们修改测试示例代码为下

```html
  <script>
    const { reactive, effect, computed } = Vue
    const obj = reactive({
      name: '张三',
      age: 80
    })

    const computedObj = computed(() => {
      console.log('计算属性执行了')
      return '姓名：' + obj.name
    })

    effect(() => {
      document.getElementById('app').innerText = computedObj.value
      document.getElementById('app').innerText = computedObj.value
    })

    setTimeout(() => {
      obj.name = '李四'
    }, 2000)
  </script>
```

此时我们发现在刚开始页面正常显示了，在 2s 之后进入了死循环。那么为什么呢？

如果我们想要实现计算属性的缓存性，又该如何进行实现呢？

### 为什么会出现死循

我们为当前的代码进行`debugger`,查看出现该问题的原因。我们知道这个死循环是在`延迟两秒后`出现的，而延迟两秒后是`obj.name`的调用，即：`reactive`的`getter`行为被触发，也就是`trigger`方法触发时

1. 为`packages/reactivity/src/effect.ts`中的`trigger`方法增加断点，延迟两秒之后，进入断点：
2. 此时执行的代码是`obj.name = "李四"`,所以在`target`为`{ name: "李四" }`
3. 但是要**注意**，此时`targetMap`中，以及收集过`effect`了，此时的`dep`中包含一个计算属性的`effect`

​	![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b725861acab457b893e556bdffda39e~tplv-k3u1fbpfcp-watermark.image?)

4. 代码继续向下执行，进入`triggerEffects(dep)`方法

5. 在`triggerEffects(dep)`方法中，继续进入`triggerEffect(effct)`

6. 在`triggerEffect`中接收到的`effect`，即为刚才查看到的**计算属性的effect**（如上图）

7. 此时因为`effect`中存在`scheduler`，所以会执行该计算属性的`scheduler`函数，在`scheduler`函数中，会触发`triggerRefValue(this)`，而`triggerRefValue`则再次触发`triggerEffects`

8. 特别注意：此时`effects`的值为**计算属性实例的 dep**

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fa97ef14ddd496a834755a37d7ecf50~tplv-k3u1fbpfcp-watermark.image?)

9. 循环`effects`，从而再次进入`triggerEffect`中

10. 再次进入`triggerEffect`，此时`effect`为**非计算属性**的`effect`，即`fn`函数

    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9992bc02125d491d9898263545e97c21~tplv-k3u1fbpfcp-watermark.image?)

11. 因为他不是**计算属性**的`effect`，所以会直接触发`run`方法

12. 而我们知道`run`方法中，其实就是触发了`fn`函数，所以最终会执行

    ```typescript
    () => {
      document.getElementById('app').innerText = computedObj.value
      document.getElementById('app').innerText = computedObj.value
    }
    ```

13. 但是在这个函数中，是有触发`computedObj.value`的，而`computedObj.value`其实就是触发了`computed`的`get value`方法

14. 那么这次`run`的执行会触发**两次 computed 的 get value**

    1. 第一次进入
       1. 进入`computed`的`get value`
       2. 首先依赖收集
       3. 接下来检查`dirty`脏的状态，执行`this.effect.run()`
       4. 获取最新值，返回
    2. 第二次进入
       1. 进入`computed`的`get value`
       2. 首先依赖收集
       3. 接下来检查`dirty`的脏的状态，**因为上一次中 dirty 已经为 false**，所以本次不会再触发`this.effect.run`
       4. 直接返回结束

15. **按说代码这里应该结束了**。但是不要忘记，在刚才我们计入到`triggerEffects`时，`effects`是一个数组，内部还存在一个`computed`的`effect`，所以代码会继续执行，再次来到`triggerEffect`中

    1. 此时`effect`为`computed`的`effect`

       ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/247457b1658c45d58b67ff6d9b9b505e~tplv-k3u1fbpfcp-watermark.image?)

    2. 这会导致，再次触发`scheduler`

    3. `scheduler`中还会再次触发`triggerRefValue`

    4. `triggerRefValue`又触发`triggerEffects`，**再次生成一个新的 effects 包含 两个 effect**, 就像**第7步**一样

    5. 从而导致**死循环**

那么明确好了导致死循环的代码逻辑之后，接下来就是如何解决这个死循环的问题呢？

> PS: 这里大家要注意：vue-next-mine是一个学习 vue3 核心源代码的库，所以它在一些复杂业务中会存在各种 bug。而这样的 bug 在 vue3 的源码中处理完善的逻辑非常非常复杂，我们不可能完全按照 vue3 的标准来处理
>
> 所以我们秉承着**最少量代码的实现逻辑**来解决对应的 bug,它**并不是一个完善的方案（相比于vue3的源代码）**，但是我们可以**保证vue3的源码逻辑，并且是合理的**

### 如何解决死循环

想要解决这个死循环问题，其实比较简单，我们只需要在`packages/reactivity/src/effect.ts`中的`triggerEffects`中修改如下代码

```typescript
export function triggerEffects(deps: Dep) {
  // 依赖项目集合是否是数组，不是就变为一个数据，
  const effects = isArray(deps) ? deps : [...deps]
  // 使用两个 for  循环，来顺序执行相关依赖即可
  effects.forEach(effect => {
    if (effect.computed) {
      triggerEffect(effect)
    }
  })
  effects.forEach(effect => {
    if (!effect.computed) {
      triggerEffect(effect)
    }
  })
}

export function triggerEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler()
  } else {
    effect.fn()
  }
}
```

那为什么这样就可以解决死循环呢的`bug`呢？

我们再按照刚才的顺序追踪下代码进行查看

1. 为`packages/reactivity/src/effect.ts`中的`trigger`方法增加断点，延迟两秒之后，进入断点

2. 此时执行的代码是`obj.name="李四"`，所以现在`target`为`{ name: "李四" }`

3. 但是要**注意**，此时`targetMap`中，已经**收集过 effectl了**，其中包含一个计算属性

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a14ca742d4a4271a13066eb7c698fc9~tplv-k3u1fbpfcp-watermark.image?)

4. 代码继续往下执行，进`triggerEffects(dep)`方法

5. 在`triggerEffects(dep)`方法中，继续进入`triggerEffect(effect)`

6. 在`triggerEffect`中接收到的`effect`，即为刚才查看的**计算属性的`effect`**

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/191bca7948624fd1bba290e4b8029c5d~tplv-k3u1fbpfcp-watermark.image?)

7. 此时因为`effect`存在`scheduler`,所以会执行该计算属性的`scheduler`函数，在`scheduler`函数中，会触发`triggerRefValue(this)`,而`triggerRefValue`则会再次触发`triggerEffects`

8. ------------------ 不同从这里开始-------------------

9. 因为此时我们在`triggerEffects`中，增加了**判断逻辑**，所以**永远会先触发**计算属性的`effect`

10. 所以此时我们再次进入到`triggerEffect`时，此时的`effect`依然为**计算属性的 effect**

11. 从而因为存在`scheduler`,所以会执行调度器函数

    ```typescript
    () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    }
    ```

12. 但是此时要注意: **此时_dirty脏的状态**为`true`，即：**不会触发 triggerRefValue 来触发依赖**，此时计算属性的`scheduler`调度器会**直接结束**

13. 然后代码**跳回到 triggerEffects 两次循环中**，使用**非计算属性的 effect**执行`triggerEffect`方法

14. 本次进入`triggerEffect`方法时，`effect`数据如下

    ![image-20230318135905927](/Users/yuangao/Library/Application Support/typora-user-images/image-20230318135905927.png)

15. 那么这次`run`方法的执行会触发**两次 computed 的 get value**

16. 所以代码会进入到`computed`的`get value`中

    1. 第一次进入
       1. 进入`computed`的`get value`
       2. 首先收集依赖
       3. 接下来检查`dirty`的脏状态，执行`this.effect.run()`
       4. 获取最新值，返回
    2. 第二次进入
       1. 首先`computed`的`get value`
       2. 首先收集依赖
       3. 接下来检查 `dirty`的状态，**因为上一次中 dirty 已经为 false**,所以本次**不会再触发 this.effect.run()**
       4. 直接返回结束

17. 所有代码逻辑结束

查看测试实例的打印，`computed`只打印了一次

### 总结

那么到这里我们就解决了计算属性的死循环问题和**缓存问题**

其实解决的方式非常的简单，我们只需要控制`computed`的`effect`和非`computed`的`effect`的顺序执行 ，通过明确的`dirty`来控制 `run`和`triggerRefValue`的执行即可

## 06：总结：computed的计算属性

那么到这里我们已经完成了`computed`计算属性的构建

接下来我们来总计一下计算属性的重点

1. 计算属性的重点，本质上是一个`ComputedRefImpl`的实例
2. `ComputedRefImpl`中通过`dirty`变量来控制`run`的执行和`triggerRefValue`的触发
3. 想要访问计算属性的值，必须通过`.value`,因为它内部和`ref`一样是通过`get value`来进行实现的
4. 每次`.value`的时候都会触发`trackRefValue`即：收集依赖
5. 在依赖触发的时候，需要谨记，先触发`computed`的`effect`，再触发非`computed`的`effect`

## 07：源码阅读：响应性的数据监听器 watch,跟踪源码实现逻辑

我们可以点击[这里](https://cn.vuejs.org/guide/essentials/watchers.html)来查看watch 的官方文档

`watch`的实现 和 `computed`有一些相似的地方，但是作用却大不相同。`watch`可以**监听响应式数据的变化，从而触发指定的函数**

在`vue3`中使用`watch`的代码如下所示

```typescript
watch(() => obj.name, (value, oldValue) => {
      console.log('watch监听被触发')
      console.log('oldValue', oldValue)
      console.log('value', value)
    },
    {
      immediate: true,
      deep: true
    }
  )
```

上述代码中，`watch`函数接收三个参数

1. 监听的响应式对象
2. 回调函数 `cb`
3. `options` 配置对象
   1. `immediate`：watch 初始化后被立刻触发一次
   2. `deep`：深度监听

由此可见，`watch`函数颇为复杂，所以我们在跟踪`watch`的源码实现时，应当分步骤来进行跟踪

### 基础的 watch 实例

修改`packages/vue/examples/mine/watch.html`实力代码如下

```html
<script>
  const { wactch, reactive, effect } = Vue
  const obj = reactive({
    name: '张三'
  })
  watch(obj, (value, oldValue) => {
      console.log('watch监听被触发')
      console.log('oldValue：', oldValue)
      console.log('value：', value)
    },
    {
      immediate: true,
      deep: true
    }
  )
  setTimeout(() => {
    obj.name = '李四'
  }, 2000)
</script>
```

在以上代码中

1. 首先通过`reactive` 函数构建了响应性的实例
2. 然后触发 `watch`
3. 最后触发 `proxy` 的 `setter`

摒弃掉之前熟悉的 `reactiv`，我们从`watch` 函数开始追踪

### watch 函数

1. 在 `packages/runtime-core/src/apiWatch.ts` 中找到`watch` 函数，开始 `debugger`

2. 执行 `doWatch` 函数:

   1. 进入 `doWatch` 函数

   2. 因为 `source` 为 `reactive` 类型数据，所以 `getter = ()=> source`, 目前 `source`  为 `proxy` 实例，即

      ```typescript
      getter = () => Proxy{ name : "张三" }
      ```

   3. 紧接着，指定 `deep = true` 即 **source 为 reactive  时，默认添加 options.deep = true** 

   4. 执行 `if(cb && deep)`条件满足：

      1. 创建新的常量 `baseGetter = getter`
      2. 执行 `let oldValue = isMultiSource ? [ ] : ININIAL_WATCHER_VALUE`
      3. 其中 `isMultiSource` 表示是否有多个源，我们当前只有一个源，所以 `oldValue = ININIAL_WATCHER_VALUE`
      4. `ININIAL_WATCHER_VALUE = []`
   
   5. 执行 `const obj: SchedulerJob = { ... }` 我们知道 `Scheduler` 是一个调度器，`SchedulerJob` 其实就是一个调度器的处理函数，在之前我们接触了一下 `Scheduler` 调度器，但是并没有进行深入了解，那么这里设计到的调度器的比较负责的一些概念，所以后面我们想要实现 watch,  还需要**深入的了解下调度器的概念**，现在我们暂时先不需要管它
   
   6. 接下来还是**调度器**概念，直接执行：`let scheduler: EffectScheduler = () => queuePreFulushCb(job)`
   
   7. 6.7 结合，将得到一个完整的调度器函数 `scheduler `，该函数被触发时，会返回 `queuePreFlushCb(job)`  函数执行的结果
   
   8. 代码继续执行得到一个 `ReactiveEffect`的实例，**注意**：该实例包含一个完美的调度器`scheduler`
   
   9. 代码继续执行，进入如下判断逻辑
   
      ```typescript
      // cb是 watch 第二个参数
      if (cb) {
        // immediate 是 options  的 immediate  ，表示: watch 是否立即执行
        // 那么根据这个概念和代码，可以猜测：job 触发，表示 watch  被立即执行了一次
          if (immediate) {
            job()
          } else {
            // 不包含 immedidate  则通过 effect.run 获取旧值
            // 根据我们前面创建 effect  的代码可知，run()的执行其实就是 getteer 的执行
            // 所以我们此处可以理解为 getter 被触发，则获取了 oldValue
            // 我们的代码将执行 else 
           oldValue = effect.run()
          }
        } else if (flush === 'post') {
          queuePostRenderEffect(
            effect.run.bind(effect),
            instance && instance.suspense
          )
        } else {
          effect.run()
        }
      ```
   
   10. 最后 `return` 了一个函数
   
       ```typescript
       return () => {
           effect.stop()
           if (instance && instance.scope) {
             remove(instance.scope.effects!, effect)
           }
         }
       ```
   
   11. 回调函数中的代码我们无需深究，但是根据语义代码 `stop 停止`、`remove删除`，可以猜测：**该函数被触发 watch 将停止监听，并删除依赖**

那么至此 `watch`  函数的逻辑执行完成

由此以上代码可知

1. `watch` 函数的代码很长，但是逻辑还算清晰
2. 调度器 `scheduler` 在` watch `中很关键
3. `scheduler`、`ReactiveEffect`  两者之间存在互相作用的关系，一旦 `effect`  触发了 `scheduler`  那么会导致 `queuePreFulshCb(job)` 执行
4. 只要 `job()` 触发，那么就表示``watch`触发了一次

### reactive 触发 setter

等待 2s，reactive 实例将触发 setter  行为，setter行为的触发将会导致 trigger  函数的触发，所以我们可以直接在 trigger中进行debugger

1. 在trigger 中进行 debugger

2. 根据我们之前的经验可知，trigger 最终会触发 triggerEffect,所以我们可以**省略中间**步骤，直接进入 triggerEffect  中

   1. 进入 triggerEffect

   2. 此时 effect  为

      ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4650044666cd40d784f954edd742fd80~tplv-k3u1fbpfcp-watermark.image?)

   3. 关键其中两个比较重要的变量

      1. `fn`：值为 `traverse(baseGetter())`
         1. 根据2-4-1 可知 `baseGetter = getter`
         2. 根据 2-2 可知：`getter = () => Proxy{name:"xx"}`
         3. 所以 `fn = traverse(() => Proxy { name: xxx })`
      2. `scheduler`:  值为`()=> queuePreFlushCb(job)`
         1. 目前已经知道 `job() `触发表示` watch` 回调一次

   4. 因为 `scheduler ` 存在，所以会直接执行 `scheduler`,即等同于**直接执行 queuePreFlushCb(job)**

   5. 所以我们接下里进入 `queuePreFlushCb`函数，看看` queuePreFlushCb`  做了什么

      1. 进入 `queueFlushCb`
      2. 触发 `queueCb(cb,...,pendingPreFlushCbs,...)`函数，此时 `cb = job`,即：**cb()触发一次，意味着 watch 触发一次**
         1. 进入 `queueCb` 函数
         2. 执行 `pendingQueue.push(cb)`，`pendingQueue` 从语义中看出表示**队列**，为一个**数组**
         3. 执行 `queuseFlush()` 函数
            1. 进入 `queueFlush()`函数
            2. 执行 `isFlushingPending = true`
            3. 执行 `currentFlushPromise = resolvedPromise.then(flushJobs)`
               1. 查看 `resolvedPromise` 可知：`const resolvePromise = Promise.resolve()`  即：**Promise的成功状态**
               2. 我们知道 `Promise` 存在三种状态
               3. 待定` pending`: 初始化状态，既没有兑现，也没有被拒绝
               4. 已兑现 `fulfilled`: 意味着操作成功完成
               5. 已拒绝 `rejected`: 意味着操作失败
               6. 结合语义，其实可知：`isFlushPending = true` 应该是一个标记，表示 `Promise`  进入 `pending`  状态
               7. 而同时我们知道 `Promise.resolve()`是一个**已兑现**状态的状态切换函数，它是一个**异步的微任务**，即：**它是一个优先于 setTimeout(() =>{},0) 的异步任务**
            4. 而 `flushJobs` 是将一个 `.then`  中的回调，即**异步执行函数**，它会等到**同步任务执行完成之后**再触发
            5. 我们可以给**flushJobs 函数内部增加一个断点**
      3. 至此整个`trigger` 函数执行完成

由此以上代码可知

1. `job` 函数的主要作用其实就是有两个
   1. 拿到 `newValue` 和 `OldValue`
   2. 触发 `fn 函数`执行

### 总结

到目前为止，整个 `watch` 的逻辑就已经全部理清楚了。整体分为了 4 大块

1. `watch` 函数本身
2. `reactive`  中的 `setter`
3. `flushJobs`
4. `job`

整个 `watch` 还是比较复杂的，主要是因为 `vue` 内部做了很多的**兼容处理**，使代码的复杂度上升了好几个台阶，我们自己去实现的时候**就会简单很多的**

## 08：框架实现：深入 scheduler 调度系统实现机制

经过了 `computed` 的代码和 `watch` 的代码之后，其实我们可以发现，在这两块代码中包含了同样的一个概念：**调度器scheduler**.完整的说，我们应该叫他：**调度系统**

整个调度系统其实包含两个部分来实现

1. `lazy: 懒执行`
2. `scheduler:调度器`

### 懒执行

懒执行相对比较简单，我们来看`packages/reactivity/src/effect.ts`中第 183-185的代码

```typescript
if(!options || !options.lazy){
  _effect.run()
}
```

这段代码比较简单，其实就是如果存在 `options.lazy` 则**不立即**执行 `run 函数`

修改`packages/reactivity/src/effect.ts`文件（vue-next-mini项目中），修改 effect 函数

```typescript
export interface ReactiveEffectOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
}
// 增加第二个参数，判断如果传入的 lazy  有值并且为 true  就不立即执行
export function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = new ReactiveEffect(fn)
  if (!options || !options.lazy) {
    _effect.run()
  }
}
```

修改`vue-next-mini/packages/vue/example/reactive/effect-lazy.html`测试用例，代码如下

```html
<script>
  const { reactive, effect } = Vue
  const obj = reactive({
    count: 1
  })
  effect(
    () => {
      console.log(obj.count)
    },
    {
      lazy: true
    }
  )
  obj.count = 2
  console.log('代码结束')
</script>
```

运行浏览器可以看到，只有 `代码结束`  被打印出来,说明 是懒执行的

### 调度器

调度器比懒执行要稍微复杂一些，整体的作用分为两块

1. **控制执行顺序**
2. **控制执行规则**

#### 控制执行顺序

我们先来看一个 `vue3` 的官网的例子，创建测试实例

```javascript
const { reactive, effect } = Vue
const obj = reactive({
  count: 1
})
effect(() => {
  console.log(obj.count)
})
obj.count = 2
console.log('代码结束')
```

打印结果是：**1、2、打印结束**

如果我们修改`effect.ts`文件如下

```typescript
import { extend } from '@vue/shared'
export function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = new ReactiveEffect(fn)
  if (options) {
    extend(_effect, options) // 增加合并代码
  }
  if (!options || !options.lazy) {
    _effect.run()
  }
}

// @vue/shared
export const extend = Object.assign
```

修改参数实例代码

```html
<script>
  const { reactive, effect } = Vue
  const obj = reactive({
    count: 1
  })
  effect(
    () => {
      console.log(obj.count)
    },
    {
      // lazy: true
      scheduler: () => {
        setTimeout(() => {
          console.log(obj.count)
        })
      }
    }
  )
  obj.count = 2
  console.log('代码结束')
</script>
```

这里我们加了一个调度器，并且内部增加了一个定时器任务，我们知道他会等主线程执行完毕后，在执行

此时的打印顺序是：**1，代码结束， 2**

#### 控制执行规则

修改测试实例，如下

```html
<script>
  const { reactive, effect } = Vue
  const obj = reactive({
    count: 1
  })
  effect(
    () => {
      console.log(obj.count)
    }
  )
  obj.count = 2
  obj.count = 3
</script>
```

我们看到打印结果是 `1 2 3`

其实 2 完全可以省略，有没有这个可能呢？

我们在`vue-next-mini-mine/packages/runtime-core/src`下新建文件`scheduler.ts`文件，内容如下

```typescript
let isFlushPending = false
const pendingPreFlushCbs: Function[] = []
const resolvedPromise = Promise.resolve() as Promise<any>
let currentFlushPromise: Promise<void> | null = null
export function queuePreFlushCb(cb: Function) {
  queueCb(cb, pendingPreFlushCbs)
}
function queueCb(cb: Function, pendingQueue: Function[]) {
  pendingQueue.push(cb)
  queueFlush()
}
function queueFlush() {
  if (!isFlushPending) {
    isFlushPending = true
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}
function flushJobs() {
  isFlushPending = false
  flushPreFlushCbs()
}
export function flushPreFlushCbs() {
  if (pendingPreFlushCbs.length) {
    let activePreFlushCbs = [...new Set(pendingPreFlushCbs)]
    pendingPreFlushCbs.length = 0
    for (let index = 0; index < activePreFlushCbs.length; index++) {
      activePreFlushCbs[index]()
    }
  }
}
```

修改我们的测试实例

```html
  <script>
    const { reactive, effect, queuePreFlushCb } = Vue
    const obj = reactive({
      count: 1
    })
    effect(
      () => {
        console.log(obj.count)
      },
      {
        scheduler: () => {
          queuePreFlushCb(() => console.log(obj.count))
        }
      }
    )
    obj.count = 2
    obj.count = 3
  </script>
```

这时候再次运行测试实例，打印效果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/840d5105b67d4d4bbb0c89f04f2687f5~tplv-k3u1fbpfcp-watermark.image?)

## 09：框架实现：初步实现 watch  数据监听器

那么在上一小节完成了我们的调度器后呢，接下来就可以基于这个调度器来实现我们的 watch 数据监听器

1. 新建文件`vue-next-mini-mine/packages/compiler-core/src/apiWatch.ts`

   ```typescript
   import { queuePreFlushCb } from '@vue/runtime-core'
   import { EMPTY_OBJ, hasChanged } from '@vue/shared'
   import { ReactiveEffect } from 'packages/reactivity/src/effect'
   import { isReactive } from 'packages/reactivity/src/reactive'
   
   export interface WatchOptions<immedidate = boolean> {
     immediate?: immedidate,
     deep?: boolean
   }
   
   export function watch(source, cb: Function, options?: WatchOptions) {
     return doWatch(source, cb, options)
   }
   function doWatch(source, cb: Function,
     { immediate, deep }: WatchOptions = EMPTY_OBJ) {
     let getter: () => any
     if (isReactive(source)) {
       getter = () => source
       deep = true
     } else {
       getter = () => { }
     }
     if (cb && deep) {
       // TODO
       const baseGetter = getter
       getter = () => baseGetter()
     }
     let oldValue = {}
     const job = () => {
       if (cb) {
         const newValue = effect.run()
         if (deep || hasChanged(newValue, oldValue)) {
           cb(newValue, oldValue)
           oldValue = newValue
         }
       }
     }
     let scheduler = () => queuePreFlushCb(job)
     const effect = new ReactiveEffect(getter, scheduler)
     if (cb) {
       if (immediate) {
         job()
       } else {
         oldValue = effect.run()
       }
     } else {
       effect.run()
     }
     return () => {
       effect.stop()
     }
   }
   // /packages/reactivity/src/effect.ts
   export class ReactiveEffect<T = any> {
     computed?: ComputedRelImpl<T>
     constructor(public fn: () => T, public scheduler: EffectScheduler | null = null) {
       this.fn = fn
     }
     run() {
       activeEffect = this
       return this.fn()
     }
   	// 新增加
     stop() {
       console.log("TODO ReactiveEffect.stop")
     }
   }
   
   // reactivity/src/reactive.ts
   export const enum ReactiveFlags {
     IS_REACTIVE = "__v_isReactive"
   }
   export function isReactive(value): boolean {
     return !!(value && value[ReactiveFlags.IS_REACTIVE] === true)
   }
   function createReactiveOject(target: object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
     const existingProxy = proxyMap.get(target)
     if (existingProxy) {
       return existingProxy
     }
     const proxy = new Proxy(target, baseHandlers)
     proxyMap.set(target, proxy)
     proxy[ReactiveFlags.IS_REACTIVE] = true // 增加这一行代码标识
     return proxy
   }
   // packages/shared/src/index.ts
   export const EMPTY_OBJ: { readonly [key: string]: any } = {}
   ```

2. 导出函数

   ```typescript
   // packages/runtime-core/src/index.ts
   export { watch } from "./apiWatch"
   
   // packages/vue/src/index.ts
   export { watch } from "@vue/runtime-core"
   ```

3. 修改测试实例，代码如下

   ```html
   <script>
     const { watch, reactive, effect } = Vue
     const obj = reactive({
       name: '张三'
     })
   
     watch(
       obj,
       (newValue, oldValue) => {
         console.log('watch监听被触发')
         console.log('newValue', newValue)
         console.log('oldValue', oldValue)
       },
       {
         immediate: true,
         deep: true
       }
     )
     setTimeout(() => {
       obj.name = '李四'
     }, 2000)
   </script>
   ```

4. 打印效果如下

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aab004440c7046469bd8c9d9e24bce76~tplv-k3u1fbpfcp-watermark.image?)

5. 但是 2s 后，`watch`  函数并没有被触发，这是为什么呢？

## 10：问题分析：watch 下的依赖收集原则

上一节中我们成功的创建出了 `watch` 函数，但是并没有响应式，因为我们并没有对对象属性进行依赖收集，自然触发依赖时候是触发不成功的。

在上一小节中的 `todo` 部分增加如下代码

```typescript
 if (cb && deep) {
    // TODO
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }


// 如果是对象，就循环触发依赖收集
export function traverse(value: unknown) {
  if (!isObject(value)) {
    return value
  }
  for (const key in value as Object) {
    traverse((value as Object)[key])
  }
  return value
}
```

这样情况下，依赖就会触发收集，重新运行测试实例，就会发现2s后函数重新运行了。

## 11：框架实现：完成 watch 数据监听器的依赖收集

参考上节

## 12：总结：watch 数据侦听器



## 13：总结
