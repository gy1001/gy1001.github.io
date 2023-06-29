# 03-Vue 使用

## 01:先学 vue2 再学 vue3

### 为什么呢？

- Vue3 不是 从 0 开始，而是从 Vue2 进化出来
- Vue2 还会被继续使用，面试会继续考察
- Vue2 的语法，绝大部分被 Vue3 支持

### vue 和 React 越来越近

- Vue3 Options API 对应 React class Component
- Vue3 Composition API 对应 React Hooks
- 不要在纠结哪个好、哪个坏

## 02: vue 基本使用 part1

### vue 使用

- 基本使用，组件使用 --- 常用，必须会
- 高级特性 --- 不常用，但是体现深度
- Vuex 和 Vue-router 的使用

### 自己看文档不行吗？

- 行，但是效率不高
- 文档是一个备忘录，给会用的人查阅，并不是入门教程
- 文档全面冗长且细节过多，不能突出面试考点

## 03: vue 基本知识点串讲-part2

### Vue 基本使用

- 日常使用，必须掌握，面试必考（不一定全考）
- 梳理知识点，从冗长的文档中摘出考点和重点
- 考察形式不限（参考后面的面试真题），但都在范围之内

### 指令、插值

- 插值、表达式
- 指令、动态属性
- v-html: 会有 XSS 风险，会覆盖子组件

```vue
<template>
  <div>
    <p>文本插值 {{ message }}</p>
    <p>JS 表达式 {{ flag ? 'yes' : 'no' }} （只能是表达式，不能是 js 语句）</p>

    <p :id="dynamicId">动态属性 id</p>

    <hr />
    <p v-html="rawHtml">
      <span>有 xss 风险</span>
      <span>【注意】使用 v-html 之后，将会覆盖子元素</span>
    </p>
    <!-- 其他常用指令后面讲 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello vue',
      flag: true,
      rawHtml: '指令 - 原始 html <b>加粗</b> <i>斜体</i>',
      dynamicId: `id-${Date.now()}`,
    }
  },
}
</script>
```

### computed 和 watch

- computed 有缓存，data 不变则不会重新计算
- watch 如何深度监听
- watch 监听引用类型，拿不到 oldVal

```vue
<!-- computed-demo -->
<template>
  <div>
    <p>num {{ num }}</p>
    <p>double1 {{ double1 }}</p>
    <input v-model="double2" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 20,
    }
  },
  computed: {
    double1() {
      return this.num * 2
    },
    double2: {
      get() {
        return this.num * 2
      },
      set(val) {
        this.num = val / 2
      },
    },
  },
}
</script>
```

```vue
<!-- watchDemo -->
<template>
  <div>
    <input v-model="name" />
    <input v-model="info.city" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '双越',
      info: {
        city: '北京',
      },
    }
  },
  watch: {
    name(oldVal, val) {
      // eslint-disable-next-line
      // 值类型，可正常拿到 oldVal 和 val
      console.log('watch name', oldVal, val)
    },
    info: {
      handler(oldVal, val) {
        // eslint-disable-next-line
        // 引用类型，拿不到 oldVal 。因为指针相同，此时已经指向了新的 val
        console.log('watch info', oldVal, val)
      },
      deep: true, // 深度监听
    },
  },
}
</script>
```

### class 和 style

- 使用动态属性
- 使用驼峰式写法

```vue
<template>
  <div>
    <p :class="{ black: isBlack, yellow: isYellow }">使用 class</p>
    <p :class="[black, yellow]">使用 class （数组）</p>
    <p :style="styleData">使用 style</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBlack: true,
      isYellow: true,

      black: 'black',
      yellow: 'yellow',

      styleData: {
        fontSize: '40px', // 转换为驼峰式
        color: 'red',
        backgroundColor: '#ccc', // 转换为驼峰式
      },
    }
  },
}
</script>

<style scoped>
.black {
  background-color: #999;
}
.yellow {
  color: yellow;
}
</style>
```

### 条件渲染: v-if、v-show

- v-if v-else 的用法，可使用变量，也可以使用 === 表达式
- v-if 与 v-show 的区别
- v-if 与 v-show 的使用场景？

```vue
<template>
  <div>
    <p v-if="type === 'a'">A</p>
    <p v-else-if="type === 'b'">B</p>
    <p v-else>other</p>

    <p v-show="type === 'a'">A by v-show</p>
    <p v-show="type === 'b'">B by v-show</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'a',
    }
  },
}
</script>
```

### 循环（列表）渲染

- 如何遍历对象？ --- 也可以使用 v-for
- key 的重要性，key 不能乱写（如 random 或者 index）
- v-for 不能和 v-if 一起使用
  - [vue 2.x 官方链接](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-%E4%B8%8E-v-for-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8): 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。
  - [vue 3.x 官方链接](https://cn.vuejs.org/guide/essentials/conditional.html#v-if-with-v-for): 当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。
  - [Vue 3 迁移指南](https://v3-migration.vuejs.org/zh/)

```vue
<template>
  <div>
    <p>遍历数组</p>
    <ul>
      <li v-for="(item, index) in listArr" :key="item.id">
        {{ index }} - {{ item.id }} - {{ item.title }}
      </li>
    </ul>

    <p>遍历对象</p>
    <ul>
      <li v-for="(val, key, index) in listObj" :key="key">
        {{ index }} - {{ key }} - {{ val.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      listArr: [
        { id: 'a', title: '标题1' }, // 数据结构中，最好有 id ，方便使用 key
        { id: 'b', title: '标题2' },
        { id: 'c', title: '标题3' },
      ],
      listObj: {
        a: { title: '标题1' },
        b: { title: '标题2' },
        c: { title: '标题3' },
      },
    }
  },
}
</script>
```

### 事件

- event 参数，自定义参数
- 事件修饰符，按键修饰符
- 【观察】事件被绑定到哪里？

```vue
<template>
  <div>
    <p>{{ num }}</p>
    <button @click="increment1">+1</button>
    <button @click="increment2(2, $event)">+2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
    }
  },
  methods: {
    increment1(event) {
      // eslint-disable-next-line
      console.log('event', event, event.__proto__.constructor) // 是原生的 event 对象
      // eslint-disable-next-line
      console.log(event.target)
      // eslint-disable-next-line
      console.log(event.currentTarget) // 注意，事件是被注册到当前元素的，和 React 不一样
      this.num++

      // 1. event 是原生的
      // 2. 事件被挂载到当前元素
      // 和 DOM 事件一样
    },
    increment2(val, event) {
      // eslint-disable-next-line
      console.log(event.target)
      this.num = this.num + val
    },
    loadHandler() {
      // do some thing
    },
  },
  mounted() {
    window.addEventListener('load', this.loadHandler)
  },
  beforeDestroy() {
    //【注意】用 vue 绑定的事件，组建销毁时会自动被解绑
    // 自己绑定的事件，需要自己销毁！！！
    window.removeEventListener('load', this.loadHandler)
  },
}
</script>
```

## 04: vue 父子组件如何通讯
