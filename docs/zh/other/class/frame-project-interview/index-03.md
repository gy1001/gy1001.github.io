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

### 事件修饰符

vue 中修饰符分为以下五种：

- 表单修饰符

  ```html
  <!-- 默认情况下，v-model 会在每次 input 事件后更新数据。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据： -->
  <input type="text" v-model.lazy="value" />

  <!-- 如果你想要默认自动去除用户输入内容中两端的空格，你可以在 v-model 后添加 .trim 修饰符： -->
  <input type="text" v-model.trim="value" />

  <!-- 如果你想让用户输入自动转换为数字，你可以在 v-model 后添加 .number 修饰符来管理输入： -->
  <input v-model.number="age" type="number" />
  ```

- 事件修饰符

  - stop: 阻止单击事件继续传播

    ```html
    <!-- -->
    <a v-on:click.stop="doThis"></a>
    ```

  - prevent: 阻止了事件的默认行为，相当于调用了 event.preventDefault 方法，提交事件将不再重新加载页面

    ```html
    <!-- 阻止了事件的默认行为，相当于调用了event.preventDefault方法，提交事件将不再重新加载页面 -->
    <form @submit.prevent="onSubmit"></form>
    <!-- 修饰符还可以串联 -->
    <a v-on:click.prevent.stop="doThis"></a>
    ```

  - self:仅当 event.target 是元素本身时才会触发事件处理器，例如：事件处理器不来自子元素

    ```html
    <!-- 仅当 event.target 是元素本身时才会触发事件处理器，例如：事件处理器不来自子元素 -->
    <div v-on:click.self="doThat">...</div>
    ```

    > 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。
    >
    > 因此使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为
    >
    > 而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为。

  - once: 绑定了事件以后只能触发一次，第二次就不会触发

    ```html
    <button @click.once="shout(1)">ok</button>
    ```

  - capture: 添加事件监听器时，使用 capture 捕获模式，例如：指向内部元素的事件，在被内部元素处理前，先被外部处理。使事件触发从包含这个元素的顶层开始往下触发

    ```html
    <div @click.capture="shout(1)">
      obj1
      <div @click.capture="shout(2)">
        obj2
        <div @click="shout(3)">
          obj3
          <div @click="shout(4)">obj4</div>
        </div>
      </div>
    </div>
    // 输出结构: 1 2 4 3
    ```

  - passive: 在移动端，当我们在监听元素滚动事件的时候，会一直触发 onscroll 事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给 onscroll 事件整了一个.lazy 修饰符。
    滚动事件的默认行为 (scrolling) 将立即发生而非等待 onScroll 完成，以防其中包含

    ```html
    event.preventDefault()
    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll">...</div>
    ```

    > .passive 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。
    >
    > 请勿同时使用 .passive 和 .prevent，因为 .passive 已经向浏览器表明了你不想阻止事件的默认行为。
    >
    > 如果你这么做了，则 .prevent 会被忽略，并且浏览器会抛出警告。

  - native: 让组件变成像 html 内置标签那样监听根元素的原生事件，否则组件上使用 v-on 只会监听自定义事件

    > 使用.native 修饰符来操作普通 HTML 标签是会令事件失效的

    ```html
    <my-component v-on:click.native="doSomething"></my-component>
    ```

- 鼠标按键修饰符

  > 鼠标按钮修饰符针对的就是左键、右键、中键点击，有如下：
  >
  > left 左键点击
  >
  > right 右键点击
  >
  > middle 中键点击

  ```html
  <button @click.left="shout(1)">ok</button>
  <button @click.right="shout(1)">ok</button>
  <button @click.middle="shout(1)">ok</button>
  ```

- 键值修饰符

  键盘修饰符是用来修饰键盘事件（onkeyup，onkeydown）的，有如下：
  keyCode 存在很多，但 vue 为我们提供了别名，分为以下两种：

  - 普通键（enter、tab、delete、space、esc、up...）
  - 系统修饰键（ctrl、alt、meta、shift...）

  ```html
  // 只有按键为keyCode的时候才触发
  <input type="text" @keyup.keyCode="shout()" />
  ```

### 表单

- v-model
- 常见表单项：textarea、checkbox、radio、select 等
- 修饰符：lazy number trim

```vue
<template>
  <div>
    <p>输入框: {{ name }}</p>
    <input type="text" v-model.trim="name" />
    <input type="text" v-model.lazy="name" />
    <input type="text" v-model.number="age" />

    <p>多行文本: {{ desc }}</p>
    <textarea v-model="desc"></textarea>
    <!-- 注意，<textarea>{{desc}}</textarea> 是不允许的！！！ -->

    <p>复选框 {{ checked }}</p>
    <input type="checkbox" v-model="checked" />

    <p>多个复选框 {{ checkedNames }}</p>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>

    <p>单选 {{ gender }}</p>
    <input type="radio" id="male" value="male" v-model="gender" />
    <label for="male">男</label>
    <input type="radio" id="female" value="female" v-model="gender" />
    <label for="female">女</label>

    <p>下拉列表选择 {{ selected }}</p>
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <p>下拉列表选择（多选） {{ selectedList }}</p>
    <select v-model="selectedList" multiple>
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '双越',
      age: 18,
      desc: '自我介绍',

      checked: true,
      checkedNames: [],

      gender: 'male',

      selected: '',
      selectedList: [],
    }
  },
}
</script>
```

### 总结

- 必须掌握，否则面试不会通过
- 重点和考点

## 04: vue 父子组件如何通讯

- props 和 $emit
- 组件间通讯 - 自定义事件
- 组件生命周期

### props $emit 代码演示

```vue
<!-- index.vue -->
<template>
  <div>
    <Input @add="addHandler" />
    <List :list="list" @delete="deleteHandler" />
  </div>
</template>

<script>
import Input from './Input'
import List from './List'

export default {
  components: {
    Input,
    List,
  },
  data() {
    return {
      list: [
        {
          id: 'id-1',
          title: '标题1',
        },
        {
          id: 'id-2',
          title: '标题2',
        },
      ],
    }
  },
  methods: {
    addHandler(title) {
      this.list.push({
        id: `id-${Date.now()}`,
        title,
      })
    },
    deleteHandler(id) {
      this.list = this.list.filter((item) => item.id !== id)
    },
  },
  created() {
    // eslint-disable-next-line
    console.log('index created')
  },
  mounted() {
    // eslint-disable-next-line
    console.log('index mounted')
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('index before update')
  },
  updated() {
    // eslint-disable-next-line
    console.log('index updated')
  },
}
</script>
```

```vue
<!-- input.vue -->
<template>
  <div>
    <input type="text" v-model="title" />
    <button @click="addTitle">add</button>
  </div>
</template>

<script>
import event from './event'

export default {
  data() {
    return {
      title: '',
    }
  },
  methods: {
    addTitle() {
      // 调用父组件的事件
      this.$emit('add', this.title)

      // 调用自定义事件
      event.$emit('onAddTitle', this.title)

      this.title = ''
    },
  },
}
</script>
```

```vue
<!-- list.vue -->
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.title }}

        <button @click="deleteItem(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import event from './event'

export default {
  // props: ['list']
  props: {
    // prop 类型和默认值
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    deleteItem(id) {
      this.$emit('delete', id)
    },
    addTitleHandler(title) {
      // eslint-disable-next-line
      console.log('on add title', title)
    },
  },
  created() {
    // eslint-disable-next-line
    console.log('list created')
  },
  mounted() {
    // eslint-disable-next-line
    console.log('list mounted')

    // 绑定自定义事件
    event.$on('onAddTitle', this.addTitleHandler)
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('list before update')
  },
  updated() {
    // eslint-disable-next-line
    console.log('list updated')
  },
  beforeDestroy() {
    // 及时销毁，否则可能造成内存泄露
    event.$off('onAddTitle', this.addTitleHandler)
  },
}
</script>
```

```javascript
// event.js
import Vue from 'vue'

export default new Vue()
```

### 生命周期（当个组件）

- 挂载阶段
- 更新阶段
- 销毁阶段

![](https://v2.cn.vuejs.org/images/lifecycle.png)

#### 生命周期详解

1. beforeCreate() 创建前，指的是数据监测和数据代理创建之前。该钩子函数执行后，初始化数据，并通过 Object.defineProperty()和给组件实例配置 watcher 观察者实例（发布-订阅者模式），实现数据监测与数据代理。
2. created()创建后，指的是数据监测和数据代理创建之后。该钩子函数执行后，实例创建完成，实例已完成以下配置：数据观测、属性和方法的运算，watch/event 事件回调，完成了 data 数据的初始化，可以访问 data、computed、watch、methods 上的方法和数据。但是，未挂载到 DOM，不能访问到 el 属性，el 属性，ref 属性内容为空。
3. beforeMount() 执行时，页面呈现的是未经 Vue 编译的 DOM 结构，所有对 DOM 的操作，最终都不奏效。
4. mounted()挂载完成:此时，页面上呈现的是经过 Vue 编译的 DOM；对 DOM 的操作均有效（但是要尽量避免操作 DOM）。至此，初始化阶段全部完成。一般在此执行：开启定时器，发送网络请求，订阅消息，绑定自定义事件等初始化操作。
5. beforeUpdate() 更新前: 当数据发生变化，执行 beforeUpdate()钩子函数，此时，内存中数据是新的，但是页面是旧的，也就是，在这个钩子函数中，页面和数据不同步
6. updated() 更新后: 此时：内存中数据是新的，但是页面是新的，也就是，在这个钩子函数中，页面和数据保持同步
7. beforeDestroy() 销毁前: 在销毁前，实例中所有的 data、methods、computed、指令等，都处于可用状态在此阶段，一般进行：关闭定时器、取消订阅消息解绑自定义事件等收尾工作。接下来的环节，移除监视、所有的子组件、（自定义）事件的监听器
8. destroyed() 销毁完成,销毁完成后，执行 destroyed。该实例的生命周期结束。

### 生命周期（父子组件）

以下为多层父子组件的生命周期执行

![](./IMG_5530.jpg)

其他的生命周期，例如更新、销毁周期如下

![](https://img-blog.csdnimg.cn/20210719092812386.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlaWxlaV9fNjY=,size_16,color_FFFFFF,t_70)

### 总结

- props 和 $emit
- 组件间通讯 - 自定义事件
- 组件生命周期

## 05: 面试会考察哪些 vue 高级特性

### Vue 高级特性

- 不是每个都很常用，但是用到的时候必须要知道
- 考察候选人对 Vue 的掌握是否全面，且有深度
- 考察做过的项目是否有深度和复杂度（至少能用到高级特性）

#### 特性

- 自定义 v-model
- $nextTick
- slot
- 动态、异步组件
- keep-alive
- mixin
- refs

## 06: vue 如何自己实现 v-model

```vue
<template>
  <div>
    <p>vue 高级特性</p>
    <hr />
    <!-- 自定义 v-model -->
    <p>{{ name }}</p>
    <CustomVModel v-model="name" />
  </div>
</template>
<script>
import CustomVModel from './CustomVModel'

export default {
  components: {
    CustomVModel,
  },
  data() {
    return {
      name: '双越',
      website: {
        url: 'http://imooc.com/',
        title: 'imooc',
        subTitle: '程序员的梦工厂',
      },
      // NextTickName: "NextTick",
      showFormDemo: false,
    }
  },
}
</script>
```

```vue
<!-- CustomVModel.vue -->
<template>
  <!-- 例如：vue 颜色选择 -->
  <input
    type="text"
    :value="text1"
    @input="$emit('change1', $event.target.value)"
  />
  <!--
    1. 上面的 input 使用了 :value 而不是 v-model
    2. 上面的 change1 和 model.event1 要对应起来
    3. text1 属性对应起来
    -->
</template>

<script>
export default {
  model: {
    prop: 'text1', // 对应 props text1
    event: 'change1',
  },
  props: {
    text1: {
      type: String,
      default: '',
    },
  },
}
</script>
```

## 07: vue 组件更新之后如何获取最新 DOM

### $nextTick

- vue 是异步渲染的（原理部分会详细讲解）
- data 改变之后，DOM 不会立刻渲染
- $nextTick 会在 DOM 渲染之后再触发，以获取最新的 DOM 节点

### 代码演示

```vue
<template>
  <div id="app">
    <ul ref="ul1">
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="addItem">添加一项</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      list: ['a', 'b', 'c'],
    }
  },
  methods: {
    addItem() {
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)

      // 1. 异步渲染，$nextTick 待 DOM 渲染完再回调
      // 3. 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次
      this.$nextTick(() => {
        // 获取 DOM 元素
        const ulElem = this.$refs.ul1
        // eslint-disable-next-line
        console.log(ulElem.childNodes.length)
      })
    },
  },
}
</script>
```

## 08: slot

- 基本使用
- 作用域插槽
- 具名插槽

### 基本使用（默认插槽）

```vue
<template>
  <div>
    <p>vue 高级特性</p>
    <hr />
    <!-- slot -->
    <SlotDemo :url="website.url">
      {{ website.title }}
    </SlotDemo>
    <ScopedSlotDemo :url="website.url">
      <template v-slot="slotProps">
        {{ slotProps.slotData.title }}
      </template>
    </ScopedSlotDemo>
  </div>
</template>
<script>
import CustomVModel from './CustomVModel'
import SlotDemo from './SlotDemo'
import ScopedSlotDemo from './ScopedSlotDemo'

export default {
  components: {
    SlotDemo,
    ScopedSlotDemo,
  },
  date() {
    return {
      website: {
        url: 'http://imooc.com/',
        title: 'imooc',
        subTitle: '程序员的梦工厂',
      },
    }
  },
}
</script>
```

```vue
<!-- SlotDemo.vue -->
<template>
  <a :href="url">
    <slot> 默认内容，即父组件没设置内容时，这里显示 </slot>
  </a>
</template>

<script>
export default {
  props: ['url'],
  data() {
    return {}
  },
}
</script>
```

### 作用域插槽

```vue
<!-- ScopedSlotDemo.vue -->
<template>
  <a :href="url">
    <slot :slotData="website">
      {{ website.subTitle }}
      <!-- 默认值显示 subTitle ，即父组件不传内容时 -->
    </slot>
  </a>
</template>

<script>
export default {
  props: ['url'],
  data() {
    return {
      website: {
        url: 'http://wangEditor.com/',
        title: 'wangEditor',
        subTitle: '轻量级富文本编辑器',
      },
    }
  },
}
</script>
```

### slot 具名插槽

```vue
<!-- <base-layout> 组件 -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```vue
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

## 09: 动态组件

- 用法：`:is="currentTabComponent"`

  ```vue
  <component v-bind:is="currentTabComponent"></component>
  ```

- 需要根据数据，动态渲染的场景。即组件类型不确定

### 代码演示

```vue
<template>
  <div>
    <p>vue 高级特性</p>
    <hr />
    <!-- 动态组件 -->
    <component :is="NextTickName" />
    <div v-for="item in componentsArr" :key="item">
      <component :is="item" />
    </div>
  </div>
</template>

<script>
import NextTick from './NextTick'
import Index1 from 'index1.vue'
import Index2 from 'index2.vue'
import Index3 from 'index3.vue'

export default {
  components: {
    NextTick,
    Index1,
    Index2,
    Index3,
  },
  data() {
    return {
      NextTickName: 'NextTick',
      componentsArr: ['Index1', 'Index2', 'Index3'],
    }
  },
}
</script>
```

```vue
<!-- NextTick.vue -->
<template>
  <div id="app">
    <ul ref="ul1">
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="addItem">添加一项</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      list: ['a', 'b', 'c'],
    }
  },
  methods: {
    addItem() {
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)

      // 1. 异步渲染，$nextTick 待 DOM 渲染完再回调
      // 3. 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次
      this.$nextTick(() => {
        // 获取 DOM 元素
        const ulElem = this.$refs.ul1
        // eslint-disable-next-line
        console.log(ulElem.childNodes.length)
      })
    },
  },
}
</script>
```

## 10: 异步组件: vue 如何异步加载组件

- import 函数
- 按需加载，异步加载大组件

```vue
<template>
  <div>
    <p>vue 高级特性</p>
    <hr />
    <!-- 异步组件 -->
    <FormDemo v-if="showFormDemo" />
    <button @click="showFormDemo = true">show form demo</button>
  </div>
</template>
<script>
export default {
  components: { FormDemo: () => import('./FormDemo') },
  data() {
    return {
      showFormDemo: false,
    }
  },
}
</script>
```

```vue
<!-- FormDemo.vue -->
<template>
  <div>我是form 动态加载组件</div>
</template>
```

## 11: keep-alive: vue 如何缓存组件

- 缓存组件
- 频繁切换，不需要重新渲染
- Vue 常见性能优化

```vue
<template>
  <div>
    <button @click="changeState('A')">A</button>
    <button @click="changeState('B')">B</button>
    <button @click="changeState('C')">C</button>

    <keep-alive>
      <!-- tab 切换 -->
      <KeepAliveStageA v-if="state === 'A'" />
      <!-- 注意与 v-show 的区别 -->
      <KeepAliveStageB v-if="state === 'B'" />
      <KeepAliveStageC v-if="state === 'C'" />
    </keep-alive>
  </div>
</template>

<script>
import KeepAliveStageA from './KeepAliveStateA'
import KeepAliveStageB from './KeepAliveStateB'
import KeepAliveStageC from './KeepAliveStateC'

export default {
  components: {
    KeepAliveStageA,
    KeepAliveStageB,
    KeepAliveStageC,
  },
  data() {
    return {
      state: 'A',
    }
  },
  methods: {
    changeState(state) {
      this.state = state
    },
  },
}
</script>
```

```vue
<!-- KeepAliveStageA.vue -->
<template>
  <p>state A</p>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line
    console.log('A mounted')
  },
  destroyed() {
    // eslint-disable-next-line
    console.log('A destroyed')
  },
}
</script>
```

```vue
<!-- KeepAliveStageB.vue -->
<template>
  <p>state B</p>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line
    console.log('B mounted')
  },
  destroyed() {
    // eslint-disable-next-line
    console.log('B destroyed')
  },
}
</script>
```

```vue
<!-- KeepAliveStageC.vue -->
<template>
  <p>state C</p>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line
    console.log('C mounted')
  },
  destroyed() {
    // eslint-disable-next-line
    console.log('C destroyed')
  },
}
</script>
```

## 12: mixin: vue 组件如何抽离公共逻辑

- 多个组件有相同的逻辑，抽离出来
- mixin 并不是完美的解决方案，会有一些问题
- Vue3 提出的 composition API 旨在解决这些问题

```vue
<template>
  <div>
    <p>vue 高级特性</p>
    <hr />

    <!-- mixin -->
    <MixinDemo />
  </div>
</template>
<script>
import MixinDemo from './MixinDemo'
components: {
    MixinDemo,
  },
</script>
```

```vue
<!-- MixinDemo.vue -->
<template>
  <div>
    <p>{{ name }} {{ major }} {{ city }}</p>
    <button @click="showName">显示姓名</button>
  </div>
</template>

<script>
import myMixin from './mixin'

export default {
  mixins: [myMixin], // 可以添加多个，会自动合并起来
  data() {
    return {
      name: '双越',
      major: 'web 前端',
    }
  },
  mounted() {
    // eslint-disable-next-line
    console.log('component mounted', this.name)
  },
}
</script>
```

```javascript
// mixin.js
export default {
  data() {
    return {
      city: '北京',
    }
  },
  methods: {
    showName() {
      // eslint-disable-next-line
      console.log(this.name)
    },
  },
  mounted() {
    // eslint-disable-next-line
    console.log('mixin mounted', this.name)
  },
}
```

### mixin 的问题

- 变量来源不明确， 不利于阅读
- 多个 mixin 可能会导致命名冲突
- mixin 和组件可能出现多对多的关系，复杂度较高

> 在父组件中引入了 mixin，生命周期顺序如下：
>
> mixin 的 beforeCreate > 父 beforeCreate > mixin 的 created > 父 created > mixin 的 beforeMount > 父 beforeMount > 子 beforeCreate > 子 created > 子 beforeMount > 子 mounted > mixin 的 mounted >父 mounted

[vue 父子组件及 mixin 生命周期执行顺序](https://www.jianshu.com/p/f0b7950b3ab0)

## 13: vue 高级特性知识点小结

### 特性小结

- 自定义 v-model
- $nextTick
- slot
- 动态组件、异步组件
- keep-alive
- mixin

### 相关的面试技巧

- 可以不太深入，但是必须知道
- 熟练基本用法，了解使用场景
- 最好能和自己的项目经验结合起来

## 14: vuex 知识点串讲

- 面试考点并不多（因为熟悉 Vue 之后，vuex 没有难度）
- 但是基本概念、基本使用和 API 必学掌握
- 可能会考察 state 的数据结构设计（后面会讲）

### vuex 基本概念

- state
- getters
- action
- mutation

### 用于 vue 组件

- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutations

![](https://vuex.vuejs.org/vuex.png)

## 15:vue-router 知识点串讲

- 面试考点并不多（前提是熟悉 Vue）
- 理由模式（hash、history、abstract）
- 路由配置（动态路由、懒加载）

### vue-router 路由模式

- hash 模式（默认）：使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。

  > 如：`http://abc.com/#/user/10`

- H5 history 模式，依赖 HTML5 History API 和服务器配置

  > 如：`http://abc.com/user/10`

- abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

### vue-router 路由模式

```javascript
const router = new VueRouter({
  mode: 'history', // 使用 h5 history 模式
  routes: [ ... ]
})
```

### vue-router 路由配置 动态路由

```javascript
const User = {
  template: '<div>{{ $route.params.id }}</div>',
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User },
  ],
})
```

### vue-router 路由配置 懒加载

```javascript
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/baz', component: Baz },
  ],
})
```

### vue-router 总结

- 面试考点并不多（前提是 熟悉 Vue）
- 掌握基本概念，基本使用
- 面试官时间有限，需考察最核心、最常用的问题，而非边界问题

## 16:vue 使用-考点总结和复习

- 基本使用,组件使用
- 高级特性
- Vuex 和 Vue-router 使用
