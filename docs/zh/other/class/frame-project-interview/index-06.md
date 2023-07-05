# 06- Vue3 学习

## 01: Vue3 对 Vue2 有什么优势

- 性能更好
- 体积更小
- 更好的 TS 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

## 02: vue3 和 vue2 的生命周期有什么区别

### options Api 生命周期

![](https://v2.cn.vuejs.org/images/lifecycle.png)

### composition Api 生命周期

![](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

- beforeDestroy 改为 beforeUmount
- destroyed 改为 unmounted
- 其他沿用 vue2 生命周期

### 注意：

#### Vue3.0 的 setup 执行时机和注意点

1. 时机位于 beforeCreate 和 created 之前

2. beforeCreate:表示组件刚刚被创建出来，组件的 data 和 methods 还没初始化好

3. created:表示组件刚刚被创建出来，并且组件的 data 和 methods 已经初始化好

注意点

1. 由于在执行 setup 函数时候，还没有执行 created 生命周期方法,所以在 setup 函数中，是无法使用 data 和 methods

2. 由于我们不能在 setup 函数中使用 data 和 methods,所以 VUE 为了避免我们错误的使用,它直接将 setup 函数中 this 修改成了 undefined

3. setup 函数只能是同步的不能是异步的

### 代码示例

```vue
<template>
  <p>生命周期 {{ msg }}</p>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'

export default {
  name: 'LifeCycles',

  props: {
    msg: String,
  },

  // 等于 beforeCreate 和 created
  setup() {
    console.log('setup')

    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
  },

  // beforeCreate() {
  //     console.log('beforeCreate')
  // },
  // created() {
  //     console.log('created')
  // },
  // beforeMount() {
  //     console.log('beforeMount')
  // },
  // mounted() {
  //     console.log('mounted')
  // },
  // beforeUpdate() {
  //     console.log('beforeUpdate')
  // },
  // updated() {
  //     console.log('updated')
  // },
  // // beforeDestroy 改名
  // beforeUnmount() {
  //     console.log('beforeUnmount')
  // },
  // // destroyed 改名
  // unmounted() {
  //     console.log('unmounted')
  // }
}
</script>
```

执行顺序如下 (不建议同时使用，这里只是用来做示例)

```shell
setup
beforeCreate
created
onBeforeMount
beforeMount
onMounted
mounted

# 更新时
onBeforeUpdate
beforeUpdate
onUpdated
updated

# 卸载时
onBeforeUnmount
beforeUnmount
onUnmounted
unmounted
```

### 重点

- beforeDestroy 改为 beforeUmount
- destroyed 改为 unmounted

## 03: 如何理解 Composition API 和 Options API

### Composition API 带来了什么

[官方文档：为什么要有组合式 API？](https://cn.vuejs.org/guide/extras/composition-api-faq.html#better-logic-reuse)

- 更灵活的代码组织
  ![](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)

- 更好的逻辑复用 -（有一道专门的面试题）
- 更好的类型推导
- 更小的生产包体积

### Composition API 和 Options API 如何选择

- 不建议公用，会引起混乱
- 小型项目、业务逻辑简单的项目，可以考虑使用 Options API
- 中大型项目、业务逻辑复杂的项目，可以考虑使用 Composition API

### 别误解 Composition API

- Composition API 属于高阶技巧，不是基础必会
- Composition API 是为解决复杂业务逻辑而设计
- Composition API 就像 Hooks 在 React 中的地位

## 04: 如何理解 ref toRef 和 toRefs

### 是什么

### 最佳使用方式

### 进阶，深入理解

#### ref

- 生成值类型的响应式数据
- 可用于模板和 reactive
- 通过 .value 修改值

```vue
<template>
  <p>ref demo {{ ageRef }} {{ state.name }}</p>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'Ref',
  setup() {
    // 建议 ref 变量都增加 xxxRex 后缀
    const ageRef = ref(20) // 值类型 响应式
    const nameRef = ref('双越')

    const state = reactive({
      name: nameRef,
    })

    setTimeout(() => {
      console.log('ageRef', ageRef.value)

      ageRef.value = 25 // .value 修改值
      nameRef.value = '双越A'
    }, 1500)

    return {
      ageRef,
      state,
    }
  },
}
</script>
```

ref 还可以用于获取当前元素节点

```vue
<template>
  <p ref="elemRef">我是一行文字</p>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'RefTemplate',
  setup() {
    const elemRef = ref(null)

    onMounted(() => {
      console.log('ref template', elemRef.value.innerHTML, elemRef.value)
    })

    return {
      elemRef,
    }
  },
}
</script>
```

## 05: toRef 和 toRefs 如何使用

### toRef

- 针对一个响应式对象（reactive 封装）的 prop
- 创建一个 ref, 具有响应式
- 两者保持引用关系

```vue
<template>
  <p>toRef demo - {{ ageRef }} - {{ state.name }} {{ state.age }}</p>
</template>

<script>
import { ref, toRef, reactive } from 'vue'

export default {
  name: 'ToRef',
  setup() {
    const state = reactive({
      age: 20,
      name: '双越',
    })

    const age1 = computed(() => {
      return state.age + 1
    })

    // // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式
    // const state = {
    //     age: 20,
    //     name: '双越'
    // }

    const ageRef = toRef(state, 'age')

    setTimeout(() => {
      state.age = 25
    }, 1500)

    setTimeout(() => {
      ageRef.value = 30 // .value 修改值
    }, 3000)

    return {
      state,
      ageRef,
    }
  },
}
</script>
```

### toRefs

- 将响应式对象（reactive）封装为普通对象
- 对象的每个 prop 都是对应的 ref
- 两者保持引用关系
- 合成函数返回响应式对象

```vue
<template>
  <p>toRefs demo {{ age }} {{ name }}</p>
</template>

<script>
import { ref, toRef, toRefs, reactive } from 'vue'

export default {
  name: 'ToRefs',
  setup() {
    const state = reactive({
      age: 20,
      name: '双越',
    })

    const stateAsRefs = toRefs(state) // 将响应式对象，变成普通对象

    // const { age: ageRef, name: nameRef } = stateAsRefs // 每个属性，都是 ref 对象
    // return {
    //     ageRef,
    //     nameRef
    // }

    setTimeout(() => {
      state.age = 25
    }, 1500)

    return stateAsRefs
  },
}
</script>
```

#### 合成函数返回响应式对象

```vue
<template>
  <p>why ref demo {{ state.age }} - {{ age1 }}</p>
</template>

<script>
import { ref, toRef, toRefs, reactive, computed } from 'vue'

function useFeatureX() {
  const state = reactive({
    x: 1,
    y: 2,
  })
  // ...

  // 返回时转换为 ref
  return toRefs(state)
}

export default {
  name: 'WhyRef',
  setup() {
    const { x, y } = useFeatureX()

    const state = reactive({
      age: 20,
      name: '双越',
    })

    // computed 返回的是一个类似于 ref 的对象，也有 .value
    const age1 = computed(() => {
      return state.age + 1
    })

    setTimeout(() => {
      state.age = 25
    }, 1500)

    return {
      state,
      age1,
      x,
      y,
    }
  },
}
</script>
```

## 06: ref toRef 和 toRefs 的最佳使用方式

- 用 reactive 做对象的响应式，用 ref 做值类型响应式
- setup 中返回 toRefs(state), 或者 toRef(state, "xxx")
- ref 的变量名都用 xxxRef
- 合成函数返回响应式对象时，使用 toRefs

## 07: 为什么需要用 ref

> 进入，深入理解

- 返回值类型，会丢失响应式
- 如在 setup、computed、合成函数，都有可能返回值类型
- Vue 如不定义 ref, 用户将自造 ref, 反而混乱

## 08: 为何 ref 需要 value 属性

> 进入，深入理解

- ref 是一个对象（不丢失响应式），value 存储值
- 通过 .value 属性的 get 和 set 实现响应式
- 用于模板、reactive 时，不需要 .value 其他情况都需要

## 09: 为什么需要 toRef 和 toRefs

> 进入，深入理解

## 10: vue3 升级了哪些重要功能

## 11: Composition API 如何实现逻辑复用

## 12: Vue3 如何实现响应式

## 13: Proxy 基本使用

## 14: vue3 用 Proxy 实现响应式

## 15: v-model 参数的用法

## 16: watch 和 watchEffect 的区别

## 17: setup 中如何获取组件实例

## 18: 什么是 PatchFlag

## 19: 什么是 HoistStatic 和 CacheHandler

## 20: SSR 和 Tree-shaking 的优化

## 21: Vite 为什么启动非常快

## 22: ES Module 在浏览器中的应用

## 23: Composition API 和 React Hooks 的对比

## 24: vue3 考点总结
