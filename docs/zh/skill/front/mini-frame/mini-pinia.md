# mini-pinia

[pinia 的基本使用和核心实现原理](https://juejin.cn/post/7112091016450031653#comment)

index.ts

```typescript
export { createPinia } from './createPinia'
export { defineStore } from './defineStore'
```

rootStore.ts

```typescript
export const SymbolPinia = Symbol('my-pinia')
```

createPinia.ts

```typescript
import { markRaw, App, effectScope, reactive } from 'vue'
import { SymbolPinia } from './rootStore'
/**
 * 
 * 
为什么需要用到markRaw

有些值不应被设置为响应式的，例如复杂的第三方库

  比如一个响应式对象中，要放入axios，或者别的随机数字的第三方库
  如果不让他变成非响应式的，那么Vue就会去找到每一个层级，让其都能响应式处理
  这样的情况下，性能就会受到严重影响
  所以我们需要让其变成永远都不会成功响应式的数据，提高性能

当渲染具有不可变数据源的大列表时，跳过响应式可以提高性能

作者：李先来2分钟
链接：https://juejin.cn/post/7130812097469890597
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
export function createPinia() {
  // 创建一个scope独立空间
  const scope = effectScope(true)
  // run方法的返回值就是回调函数fn的返回值
  const state = scope.run(() => reactive({}))
  const pinia: any = markRaw({
    install(app: App) {
      // 将app保留一份在pinia上
      pinia._a = app
      // 将pinia实例暴露到app上，所有组件都可以inject注入使用
      app.provide(SymbolPinia, pinia)
      // 保证vue2里也可以通过$pinia使用
      app.config.globalProperties.$pinia = pinia
    },
    _a: null,
    state, // 所有的状态
    _e: scope, // 用来管理这个应用上的 effectScope
    _s: new Map(), // 记录所有的 store
  })
  return pinia
}
```

defineStore.ts

```typescript
import {
  getCurrentInstance,
  inject,
  effectScope,
  reactive,
  computed,
  toRefs,
} from 'vue'
import { SymbolPinia } from './rootStore'

export function defineStore(idOrOptions: any, setup?: any) {
  let id: string
  let options: any
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    options = setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }
  // 第二个参数是函数
  const isSetupStore = typeof setup === 'function'

  function createOptionsStore(id: string, options: any, pinia: any) {
    // createOptionsStore拿到用户传的state、getters、actions
    const { state, actions, getters } = options
    let scope
    const store = reactive({})
    function setup() {
      pinia.state[id] = state ? state() : {}
      // 注意注意：这里需要增加 toRefs ，否则 getter 不是响应式的，
      const localState = toRefs(pinia.state[id])
      const gettersValue = Object.keys(getters || {}).reduce(
        (computedGetters: any, name) => {
          computedGetters[name] = computed(() => {
            // 计算属性具有缓存的性质
            // 我们需要获取当前的 store 是谁
            return getters[name].call(store, store)
          })
          return computedGetters
        },
        {},
      )
      return Object.assign(localState, actions, gettersValue) // 这个地方的装填还要扩展
    }

    // _e 能停止所有的 scope
    // 每一个 store 还能停止自己的
    // 我们要让外面的effectScope能够停止所有的store，也要让每个store能停止自己
    const setupStore = pinia._e.run(() => {
      scope = effectScope()
      return scope.run(() => setup())
    })

    function wrapAction(name: string, action: Function) {
      return function () {
        // 触发 action 的时候，可以触发一些额外的逻辑
        // actions里面有this问题，所以我们要处理actions的方法里的this
        let result = action.apply(store, arguments)
        // 返回值也可以做处理
        return result
      }
    }

    for (let key in setupStore) {
      const prop = setupStore[key] // 拿到对应的值
      if (typeof prop === 'function') {
        setupStore[key] = wrapAction(key, prop) // 对 action 可以进行扩展 Aop 思想
      }
    }

    // setupStore
    Object.assign(store, setupStore)

    pinia._s.set(id, store)
  }

  function useStore() {
    const currentInstance = getCurrentInstance()

    // 注册了一个 store
    // 为了保证useStore在组件内部使用，那么我们需要通过判断currentInstance来保证useStore在组件内部使用ore
    const pinia: any = currentInstance && inject(SymbolPinia)
    // 看一下pinia上有没有这个store，如果没有，说明是第一次使用这个store，
    // 那么我们就去创建一个调用createOptionsStore去创建一个store
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetUpStore(id, setup, pinia)
      } else {
        createOptionsStore(id, options, pinia)
      }
    }
    const store = pinia._s.get(id)
    return store
  }

  function createSetUpStore(id, setup, pinia) {
    const store = reactive({}) // 每一个 store 都是一个响应式对象
    let scope
    const setupStore = pinia._e.run(() => {
      scope = effectScope()
      return scope.run(() => setup())
    })

    function wrapAction(name: string, action: Function) {
      return function () {
        // 触发 action 的时候，可以触发一些额外的逻辑
        // actions里面有this问题，所以我们要处理actions的方法里的this
        let result = action.apply(store, arguments)
        // 返回值也可以做处理
        return result
      }
    }

    for (let key in setupStore) {
      const prop = setupStore[key] // 拿到对应的值
      if (typeof prop === 'function') {
        setupStore[key] = wrapAction(key, prop) // 对 action 可以进行扩展 Aop 思想
      }
    }

    // setupStore
    Object.assign(store, setupStore)

    pinia._s.set(id, store)
  }

  // 返回useStore函数，内部注册一个Store
  return useStore
}
```
