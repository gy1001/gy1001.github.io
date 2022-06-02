# Vue3 从入门到实战

> 进阶式掌握完整知识体系

## 1. Vue 语法初探

### 1.1 课前须知，这里有你需要了解的一切

1. Vue3: 更多的 API 特性，体积更小，速度更快，解决遗留问题，更加强壮
2. 特点
   - 知识体系完整：基础语法，组件原理、动画、代码设计等技术点全面覆盖
   - 实战能力提升：企业级代码标准、工程化开发流程、真正提升 Vue3 落地能力
   - 经验技巧分享：前端工作中的“避坑秘籍”、数据驱动、MVVM 设计模式。。。
3. 知识储备：HTML、CSS、JS、Node、Npm、Webpack
4. 进阶式学习，构建 Vue3 完成知识体系
   - Vue 基础：体验 Vue 编程乐趣、生命周期函数概念、条件循环渲染指令、页面样式修饰语法、事件绑定语法解析
   - Vue 中的组件：真正理解组件的定义、全局组件与局部组件、组件之间的数据传递、插槽基础和复杂使用、动态组件与异步组件
   - Vue 中的动画：单组件元素的动画实现、列表动画的实现、状态动画的实现、CSS 动画与 JS 动画
   - Vue 中的高级扩展语法：Mixin 混入的开发、Vue 中的自定义指令、Teleport 传送门功能、更加底层的 render 函数、插件的定义和使用
   - Vue3 中的 CompositionAPI ：Composition Api 的产生背景、setup 函数的使用及参数、响应式引用语法、计算属性和侦听器的写法、案例开发帮你理解新语法
   - Vue 中的生态全家桶：VueCLI 脚手架工具，大型工程结构、单文件组件的使用、Vue-router 入门学习、Vuex 的基础内容学习
5. 实战环节：实现“京东到家”项目
6. 课程收货
   - 理解并运用 Vue3 的语法特性
   - 对 Vue 的原理具备一定理解
   - 形成不错的代码设计能力
   - 掌握一定的移动端开发经验
   - 水到渠成上手公司级别项目

### 1.2 初学编写 HelloWorld 和 Counter

具体内容查看相应代码: [点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/01-helloworld.html)

### 1.3 编写字符串反转和内容隐藏小功能

具体内容查看相应代码: [点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/02-stringReverse-display.html)

### 1.4 编写 TodoList 小功能，了解循环和双向绑定

具体内容查看相应代码: [点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/03-Todo-List.html)

### 1.5 组件概念初探，对 TodoList 进行组件代码拆分

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/04-todo-list-optimize.html)

## 2. Vue 基础语法

### 2.1 Vue 中应用和组件的基础概念

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/05-basic-api.html)

### 2.2 理解 Vue 中的生命周期函数

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/06-life-cycle.html)

### 2.3 常用模版语法讲解

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/07-common-template-syntax.html)

### 2.4 数据，方法，计算属性和侦听器

- computed:当计算属性依赖的内容发生变化时。才会重新执行
- methods: 主要页面重新渲染，才会重新计算
- computed 和 methods 都能实现的功能，建议使用 computed, 因为 computed 有缓存优化
- computed 和 watch 都能实现的功能，建议使用 computed，因为 computed 更加简洁

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/08-data-computed-watch.html)

### 2.5 样式绑定语法

支持 变量字符串、变量对象、变量数组、行内样式等

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/09-class-style.html)

### 2.6 条件渲染

v-if
v-else-if
v-else

v-show

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/10-conditional-rendering.html)

### 2.7 列表渲染

1. v-for

- 可以循环数组：v-for="(item, itemIndex) in listArray" :key="item"
  - 更改数组的方法
    - 使用数组的变更函数 push、pop、shift、unshift、splice、sort、reverse
    - 还可以直接改变数组 ：this.listArray = ['bey', 'world']
    - 直接更新数组的某一项内容（新版本支持，旧版本不支持如此）： this.listArray[0] = '唐三藏'
- 可以循环对象：v-for="(value, key) in listObject" :key="key"
- 循环一个数字： v-for="item in 10" :key="item"

2. v-for 与 v-if

   - 同时使用 `v-if` 和 `v-for` 是**不推荐的**，因为这样二者的优先级不明显
   - 当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

3. 通过 key 管理状态

   Vue 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

   默认模式是高效的，但**只适用于列表渲染输出不依赖子组件状态或者临时 DOM 状态 (例如表单输入值)**。

   为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个项目提供一个唯一的 `key` attribute：

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/11-list-rendering.html)

### 2.8 事件处理

1. 绑定事件

- @click="handleClick" 默认参数为 event
- @click="handleClick(2)" 传递参数 2
- @click="handleClick(2, $event)" 传递参数 2 和 event
- @click="handleClick(2, $event), handleClickTwo($event)" 绑定多个点击事件并传递参数

2. 修饰符

- 事件修饰符:.stop、.prevent、.self、.capture、.once、.passive
- 按键修饰符：.enter、.tab、.esc、.space、.up、.down、.left、.right
- 鼠标修饰符： left、right、middle
- 精确修饰符：exact

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/12-event-handling.html)

### 2.9 表单输入绑定

1. v-model 还可以用于各种不同类型的输入，**textarea**、**select** 元素。它会根据所使用的元素自动扩展到不同的 DOM 属性和事件组合：

2. 单选框 input type="radio"

3. 复选框 input type="checkbox"

4. 选择器 select

   - 单个选择器
   - 多个选择器（值绑定到一个数组）

5. 对于复选框 type="checkbox" 还可以使用 true-value 和 false-value。 它们 是 Vue 特有的 attributes 且仅会在 v-model 存在时工作。

   ```html
   <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
   ```

6. 选择器选项：v-model 同样也支持非字符串类型的值绑定！在上面这个例子中，当某个选项被选中，selected 会被设为该对象字面量值 { number: 123 }

   ```html
   <select v-model="selected">
     <!-- 内联对象字面量 -->
     <option :value="{ number: 123 }">123</option>
   </select>
   ```

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/13-form-input-binding.html)

## 3. 探索组件的理念

### 3.1 组件的定义及复用性，局部组件和全局组件

1. 全局注册： app.component()
   - 定义了以后，处处可以使用，性能不高，但是使用方便，名字建议 小写字母，中间用 - 链接
2. 局部注册：：components: { ComponentA }
   - 定义了以后，要注册以后才能使用，性能比较高，使用起来稍微麻烦点，建议大写驼峰式命名
   - 局部组件使用时，要做一个名字和组件之间的映射对象

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/14-component-registration.html)

### 3.2 组件间传值及传值校验

1. 组件间传值用 props
2. props 校验
   - type 可以是下列这些原生构造器： String、Number、Boolean、Array、Object、Date、Function、Symbol、
   - required: true/false 可以声明属性非（必）需传
   - default: '' 可以声明属性默认值, 也可以用一个函数表达式进行返回
   - validator: 支持检验函数

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/15-component-props.html)

### 3.3 单项数据流的理解

> 所有的 prop 都遵循着单向绑定原则，prop 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改了父组件的状态，不然应用的数据流就会变得难以理解了。

1. 传递多个属性值时候可以用 v-bind
2. 组件属性名字过长时候，用-连接，但是组件内部需要用驼峰法来接入
3. 单向数据流：
   - 想要更改 prop 通常都符合以下两种场景： - prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从 prop 上获取初始值即可： - prop 以原始的形式传入，但还需作转换。在这种情况中，最好是基于该 prop 值定义一个计算属性：

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/16-component-props-one-way-flow.html)

### 3.4 Non-Props 属性是什么

> 其实很简单，之前讲的组件传参，子组件会使用 props:[''] 的方式接收父组件传递的参数，如果子组件不使用 props:[''] 接收参数，那这个参数就是一个 Non-Props 属性。

1. 父组件传递子组件属性值，子组件却没有使用，也没有声明 props, 最后渲染时，会把传递的属性比如 message = "hello" 原封不动的渲染到了 比如 test 子组件的最外层标签上
2. 在子组件中增加属性 inheritAttrs:false，Non-Props 属性 就不会渲染到最外层标签了

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/17-component-props-non-props.html)

### 3.5 父子组件间如何通过事件进行通信

1. 子组件中通过使用 $emit 函数触发自定义事件，支持 @ 缩写，也支持.once 修饰符
2. 另外 像组件与 prop 一样，事件的名字也提供了自动的转换。请注意，我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 prop 大小写格式一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。
3. 可以给 $emit 提供一个值作为额外的参数来传递参数
4. emits 可以声明 触发的事件，也可以通过设置为函数对其进行校验
5. 组件上的 v-model
   - 默认属性名为 modelValue, 触发的事件名为 update:modelValue
   * 也支持自定义，比如 v-model:app , 则子组件中需要接收的属性名为 app, 需要触发的事件名字为 update:app

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/18-component-events.html)

### 3.6 组件间双向绑定高级内容

1. 多个 v-model 的绑定

2. v-model 的参数
   - 默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，以 update:modelValue 作为对应的事件。我们可以通过给 v-model 指定一个参数来更改这些名字： v-model:title="bookTitle"，在这个例子中，子组件应该有一个 title prop，并通过触发 update:title 事件更新父组件值：
3. 处理 v-model 修饰符

   - v-model.capitalize="myText"： 要给组件的 v-model 添加修饰符，都可以通过 modelModifiers prop 在组件内访问到。在下面的例子中，我们会创建一个包含 modelModifiers prop 的组件，它的默认值是一个空对象：

   - 对于又有参数又有修饰符的 v-model 绑定，生成的 prop 名将是 arg + "Modifiers"。举个例子：

     ```javascript
     v-model:title.capitalize="myText"

     // console.log(props.titleModifiers) // { capitalize: true }
     // 触发事件 emit("update:title")
     // props: ['title', 'titleModifiers']
     ```

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/19-component-events-add.html)
