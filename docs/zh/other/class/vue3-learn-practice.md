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

### 3.7 使用插槽和具名插槽解决组件内容传递问题

> 我们已经学习过组件能够接收任意类型的 JavaScript 值作为 props，但组件要如何接收模板内容呢？在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。这里就需要用到本节的插槽 slot 来完成

> 通过使用插槽， 组件更加灵活和具有可复用性。现在组件可以用在不同的地方渲染各异的内容，但同时还保证都具有相同的样式。

1. 作用域规则：任何父组件模板中的东西都只被编译到父组件的作用域中；而任何子组件模板中的东西都只被编译到子组件的作用域中。
2. 插槽也可以设置默认内容： 在外部没有提供任何内容的情况下，为插槽指定默认内容用于渲染是很有用的。
3. 具名插槽：有时在一个组件中包含多个插槽的插口是很有用的。对于这种场景，slot 元素可以有一个特殊的 attribute name，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容：
   - 要为具名插槽传入内容，我们需要使用一个含 v-slot 指令的 template 元素，并将目标插槽的名字传给该指令： template v-slot:header
   * v-slot 有对应的简写 #，因此 template v-slot:header 可以简写为 template #header 其意思就是“将这部分模板片段传入子组件的 header 插槽中”

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/20-component-slots.html)

### 3.8 作用域插槽

> 在默认插槽和具名插槽中，插槽的内容无法访问到子组件的状态
> 然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

1.  我门可以像对组件传递 prop 那样，向一个插槽的插口上传递 attribute

2.  子组件传入插槽的 props 作为了 v-slot 指令的值 比如 v-slot="slotProps"，可以在插槽内的表达式中访问。你可以将作用域插槽类比为一个传入子组件的函数。子组件会将相应的 prop 作为参数去调用它

3.  具名作用域插槽

    - 向具名插槽中传入 props：

      > 注意: 如下代码中，插槽上的 name 是由 Vue 保留的，不会作为 props 传递给插槽。 因此最终 headerProps 的结果是 { message: 'hello' }

      ```html
      <slot name="header" message="hello"></slot> // MyComponent.vue
      ```

    - 具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 `v-slot` 指令的值被访问到：`v-slot:name="slotProps"`

      ```html
      <MyComponent>
        <template #header="headerProps"> {{ headerProps }} </template>
      </MyComponent>
      ```

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/21-component-scoped-slots.html)

### 3.9 动态组件和异步组件

1. 动态组件： 根据数据的变化，结合 component 这个标签，来随时动态切换组件的显示
2. 异步组件： defineAsyncComponent 方法接收一个返回 Promise 的加载函数。这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用。

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/22-component-async-dynamic.html)

### 3.10 基础语法知识点查缺补漏

1. v-once: 只渲染一次，即使数据发生变化
2. ref: 实际上是获取 DOM 节点的一个语法, 还可以获取组件的引用
3. provide/inject

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/23-component-add.html)

## 4. Vue 中的动画

### 4.1 使用 Vue 实现基础的 CSS 过渡与动画效果

1. 基础的 过渡或者动画可以实现的方式
   - class 样式
   - 行内 style 样式

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/24-transition-animation.html)

### 4.2 使用 transition 标签实现单元素组件的过渡和动画效果

1. 初步使用 transition 实现 入场 和 出场动画
   - 需要配合使用相应的 css 样式：v-enter-from v-enter-to v-enter-active v-leave-from v-leave-active v-leave-to
2. 可以使用 transition 和 name 属性实现自定义 class 名的 入场 和 出场动画（假设 name 属性值为 hello）
   - 需要配合使用相应的 css 样式：hello-enter-from hello-enter-to hello-enter-active hello-leave-from hello-leave-active hello-leave-to
3. 支持自定义 class 类名：
   - enter-from-class、enter-active-class、enter-to-class、leave-from-class、leave-active-class、leave-to-class
4. 支持自定义 js 钩子函数

   - 这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。

   - 当只用 JavaScript 过渡的时候，在 enter 和 leave 钩子中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。添加 :css="false" 也会让 Vue 会跳过 CSS 的检测，除了性能略高之外，这也可以避免过渡过程中受到 CSS 规则的意外影响。

   - 支持的事件如下:

     ```html
     @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
     @enter-cancelled="enterCancelled" @before-leave="beforeLeave"
     @leave="leave" @after-leave="afterLeave" @leave-cancelled="leaveCancelled"
     ```

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/25-transition.html)

### 4.3 组件和元素切换动画的实现

1.  多个元素之间的切换
    - 可以通过 appear attribute 设置节点在初始渲染的过渡
    - 有时候我们正在处理更复杂的动作，需要协调进入和离开的状态，所以 Vue 提供了一个非常有用的工具，称之为**过渡模式**：
      - in-out: 新元素先进行进入过渡，完成之后当前元素过渡离开。
      - out-in: 当前元素先进行离开过渡，完成之后新元素过渡进入
2.  多个组件之间的切换
    - 使用以上配置也同样适用
    - 多个单组件之间的切换也同样可以用动态组件来实现

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/26-transition-between-components.html)

### 4.4 列表动画

> 使用 v-for 的场景下，我们会使用 transition-group 组件

1. 关于这个组件的几个特点：
   - 默认情况下，它不会渲染一个包裹元素，但是你可以通过 tag attribute 指定渲染一个元素
   - 过渡模式不可用，因为我们不再相互切换特有的元素
   - 内部元素总是需要提供唯一的 key attribute 值
   - CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身
2. transition-group 组件还有一个特殊之处。除了进入和离开，它还可以为定位的改变添加动画。只需了解新增的 v-move 类就可以使用这个新功能，它会应用在元素改变定位的过程中。像之前的类名一样，它的前缀可以通过 name attribute 来自定义，也可以通过 move-class attribute 手动设置。

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/27-transition-group.html)

### 4.5 状态动画

Vue 的过渡系统提供了非常多简单的方法来设置进入、离开和列表的动效，那么对于数据元素本身的动效呢？比如：数字和运算、颜色的显示、SVG 节点的位置、元素的大小和其他的 property

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/28-transition-state.html)

## 5. Vue 中的高级语法

### 5.1 Mixin 混入的基础语法

1.  mixin 混入
    - 组件 data 优先级高于 mixin data 优先级
    - 生命周期函数：先执行 mixin 里面的，在执行组件内的
    - 自定义属性例如 methods 中的方法：组件种的属性优先级高于 mixin 属性的优先级
    - mixin 也分为局部的 mixin 和 全局的 mixin
2.  自定义选项合并策略

- 自定义选项在合并时，默认策略为简单地覆盖已有值。如果想让某个自定义选项以自定义逻辑进行合并，可以在 `app.config.optionMergeStrategies` 中添加一个函数：

3.  不足：在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

- Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。
- 可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。
- 建议使用 [组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)。

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/29-mixin.html)

### 5.2 开发实现 Vue 中的自定义指令

> 除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令。

1. 一个自定义指令被定义为一个包含类似于组件的生命周期钩子的对象。(指令钩子,都是可选的)

   ```javascript
   const myDirective = {
     // 在绑定元素的 attribute 前
     // 或事件监听器应用前调用
     created(el, binding, vnode, prevVnode) {
       // 下面会介绍各个参数的细节
     },
     // 在元素被插入到 DOM 前调用
     beforeMount() {},
     // 在绑定元素的父组件
     // 及他自己的所有子节点都挂载完成后调用
     mounted() {},
     // 绑定元素的父组件更新前调用
     beforeUpdate() {},
     // 在绑定元素的父组件
     // 及他自己的所有子节点都更新后调用
     updated() {},
     // 绑定元素的父组件卸载前调用
     beforeUnmount() {},
     // 绑定元素的父组件卸载后调用
     unmounted() {},
   }
   ```

2. 全局注册指令

3. 局部注册指令

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/30-custom-direcitves.html)

### 5.3 teleport 传送门功能

> Teleport 是一个内置组件，使我们可以将一个组件的一部分模板“传送”到该组件的 DOM 层次结构之外的 DOM 节点中。

1. Teleport 挂载时，传送门的 to 目标必须是已经存在于 DOM 之中
2. 也可以禁用 teleport :disabled="isMobile" 这里的 isMobile 状态可以根据媒体查询的不同结果动态地更新
3. 同一目标上多个传送门

   ```html
   <Teleport to="#modals">
     <div>A</div>
   </Teleport>
   <Teleport to="#modals">
     <div>B</div>
   </Teleport>
   ```

   渲染的结果为：

   ```html
   <div id="modals">
     <div>A</div>
     <div>B</div>
   </div>
   ```

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/31-teleport.html)

### 5.4 更加底层的 render 函数

具体内容查看相应代码：[点击跳转 github](https://github.com/mineMineGo/Vue-Related/blob/master/vue3-learn-practice-demo/32-render.html)
