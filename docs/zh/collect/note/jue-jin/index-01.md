# Vue 组件间的属性透传 (01)--Vue2.x

## 前置知识

1. **一个非 prop 的 attribute 是指传向一个组件**，但是该组件并没有相应 prop 定义的 attribute。
2. **“透传 attribute”** 指的是传递给一个组件，却没有被该组件声明为[`props`](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fcomponents%2Fprops.html)或 [`emits`](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fcomponents%2Fevents.html%23defining-custom-events) 的 `attribute` 或者 `v-on` 事件监听器。最常见的例子就是 `class`、`style` 和 `id`。

## 官方文档

### vue2.x

[Vue2.x 官方文档：替换-合并已有的-Attribute](https://link.juejin.cn?target=https%3A%2F%2Fv2.cn.vuejs.org%2Fv2%2Fguide%2Fcomponents-props.html%23%E6%9B%BF%E6%8D%A2-%E5%90%88%E5%B9%B6%E5%B7%B2%E6%9C%89%E7%9A%84-Attribute)

## 父子组件

```vue
// parent.vue
<template>
  <div>
    我是父组件
    <Child
      id="parent"
      class="parent"
      type="parent"
      name="传入name"
      style="font-size: 36px; border: 1px solid red"
    ></Child>
  </div>
</template>

<script>
import Child from './child.vue'
export default {
  name: 'parent-demo',
  components: {
    Child: Child,
  },
}
</script>


// child.vue
<template>
  <div
    style="color: red; font-size: 24px"
    class="child"
    id="child"
  >
    我是子组件
  </div>
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
}
</script>
```

从上例中我们可以看到，对于`child.vue`中接收了一个 `name` 的 `prop`，以及自身组件中分别有 `style`、`id`、`class` 等一系列属性

## 效果

我们把代码放在创建的 vue2 项目中，运行至浏览器后，可以看到如下效果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba064e89415e4b039523361e11f1e3e1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=698&h=135&s=10377&e=png&b=ffffff)

打开控制台后，效果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/494ffb9792464fe3afae4ddef6b0fb07~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1064&h=131&s=28409&e=png&b=fbfbfb)

由上图我们可以看出，对于**一个非 prop 的 attribute**，会按照 **父组件属性 > 子组件属性** 的优先级进行合并

## 如果使用 v-bind 呢 ？

> 官方文档：在 2.x 中，如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 attribute，那么这个独立 attribute 总是会覆盖 `object` 中的绑定。

修改父组件 `parent.vue` 内容如下

```vue
<template>
  <div>
    我是父组件
    <Child
      id="parent"
      class="parent"
      type="parent"
      name="传入name"
      style="font-size: 36px; border: 1px solid red"
      v-bind="apiProps"
    ></Child>
  </div>
</template>

<script>
import Child from './child.vue'
export default {
  name: 'parent-demo',
  components: {
    Child: Child,
  },
  data() {
    return {
      apiProps: {
        name: '我是bind 传入的name',
        type: '我是bind 传入的type',
        class: 'bind-class',
        style: 'line-height: 100px;',
        dataId: 'bind-data-id',
        text: 'bind-text',
      },
    }
  },
}
</script>
```

修改子组件如下

```vue
<template>
  <div
    style="color: red; font-size: 24px"
    class="child"
    id="child"
    text="child-text" // 注意我们新添加折行代码
  >
    我是子组件
  </div>
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
}
</script>
```

如上，我用 `v-bind` 增加了一系列的属性，并且在属性顺序上 `v-bind` 放在了最后, Vue 处理渲染后会是怎么样的效果呢？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4162bc6bc774103ab9525deb84766ee~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=534&h=238&s=12659&e=png&b=ffffff)

打开控制台，效果如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64f456a8c079416a940b84462cbfede3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1517&h=228&s=44411&e=png&b=fbfbfb)

在父子组件属性上 **父组件调用时候传直接递给子组件的属性优先级**  > **通过 v-bind 传递属性的优先级** > **子组件内容部默认的属性优先级**

## 结论

### Vue2.x

1. Vue.2 会透传 **非 prop 的 attribute**，class 和 style 会进行合并处理，其他会按照**父层优先级 > 子层优先级** 进行覆盖合并
2. 在 2.x 中，如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 attribute，那么这个独立 attribute 总是会覆盖 `object` 中的绑定。
