# Vue 组件间的事件透传 (02)--Vue2.x

## 官方文档

> 你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

[Vu2.x 将原生事件绑定到组件](https://link.juejin.cn?target=https%3A%2F%2Fv2.cn.vuejs.org%2Fv2%2Fguide%2Fcomponents-custom-events.html%23%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)

## 父子组件

```vue
// parent.vue
<template>
  <div>
    我是父组件
    <Child @click="handleClick"></Child>
  </div>
</template>

<script>
import Child from './child.vue'
export default {
  name: 'parent-demo',
  components: {
    Child: Child,
  },
  methods: {
    handleClick: () => {
      console.log('parent')
    },
  },
  data() {
    return {}
  },
}
</script>


// child.vue
<template>
  <div @click="handleClick">我是子组件</div>
</template>

<script>
export default {
  name: 'child-index',
  data() {
    return {}
  },
  props: {
    name: {
      type: String,
      default: '默认name',
    },
  },
  methods: {
    handleClick() {
      console.log('child')
    },
  },
}
</script>
```

从上面看到我们在 `chiild.vue` 中绑定了 `click` 事件，然后在 `parent.vue` 中也绑定了 `click` 事件，那么会是如何执行呢？？？？

## 效果

我们在浏览器中点击子组件时候，触发 log 如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/022b61db87fb4ef289d2586198a0b3e4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=720&h=206&s=22398&e=png&b=ffffff)

我们发现它只触发了子组件的事件，并没有触发在父组件中绑定的 click 事件 ？？？

如果我想在父组件中直接绑定 click 事件，该如何处理？

- 一个是通过子组件属性监听，然后 emit 出去，
- 一个就是通过上面文档中提到的 `native` 修饰符的

## native 修饰符

我们修改 `parent.vue` 中的代码，最后如下

```vue
<template>
  <div>
    我是父组件
    <Child @click.native="handleClick"></Child> // 注意：这里添加了 native 修饰符
  </div>
</template>

<script>
import Child from './child.vue'
export default {
  name: 'parent-demo',
  components: {
    Child: Child,
  },
  methods: {
    handleClick: () => {
      console.log('parent')
    },
  },
  data() {
    return {}
  },
}
</script>
```

打开浏览器控制台，点击子组件，效果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91d3a2b4cf1542af8820f465964e3c81~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=863&h=255&s=27302&e=png&b=ffffff)

**先触发子组件事件，然后再触发父组件绑定的事件**

## 结论

1. 如果我们想在父组件中，给引入的子组件绑定事件（注意：需要原生支持），可以通过 **.native 修饰符**直接绑定即可
2. 注意执行顺序：**先执行子组件中先绑定的事件回调，然后再触发父组件中绑定的事件**