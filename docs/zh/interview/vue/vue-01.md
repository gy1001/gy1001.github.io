# Vue 基础

## 1. 说一下 Vue 的响应式原理

Vue 为 MVVM 框架，当数据模型 data 属性发生变化时，页面视图就会发生响应变化。其原理是通过对 data 的 getter/setter 属性方法进行拦截（vue2 中为 Object.defineProrperty，Vue3 中为 Proxy），利用发布订阅模式，在 getter 进行订阅，在 setter 中进行发布通知，让所有订阅者完成响应更新。

在该响应式系统中，Vue 会为 data 的每一个属性都新建一个订阅中心来作为发布者，而监听器 watch、计算属性 computed、视图渲染 template/render 三个角色同时作为订阅者。

对于监听器 watch，会直接订阅观察监听的属性，而对于计算属性 computed 和 视图渲染 template/render ，如果内部执行获取了 data 的某个属性，就会触发该属性的 getter，然后自动完成对该属性的订阅。如果对该属性进行更改，就会执行该属性的 setter 方法，从而完成该属性的发布通知，通知所有订阅者进行更新。

## 2. 怎么理解 nextTick 以及实现原理

### nextTick 定义

nextTick 定义：**在下次 DOM 更新循环结束执行延迟回调**。在修改数据之后调用这个方法，可以获得更新后的 DOM

在 Vue 中更新 DOM 时候，其实是一个异步的操作。当数据发生变化的时候，会执行一个异步更新的队列，用于存储数据变化导致页面更新的回调函数。并且如果同一个 watcher 被多次触发，只会被推入到队列中一次。这样就不会出现一个数据多次变化，而 DOM 更新多次的情况.

Vue 再内部会对异步队列尝试使用原生的 Promise.then、MutationObserver 和 SetImmediate

如果执行环境不支持以上 API，就会采用 SetTimeout(fn, 0)来代替

```vue
<div id="app">
  {{ message }}
</div>
<script>
const vm = new Vue({
  data() {
    return {
      message: 'hello world',
    }
  },
})

vm.message = 'change 1'
vm.message = 'change 2'
vm.message = 'change 3'

// 以上的多次更新，DOM 更新只会执行一次，而不会多次重复执行
</script>
```

### nextTick 原理

`src/core/util/next-tick.js`

```javascript
/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks = []
let pending = false

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true,
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise((resolve) => {
      _resolve = resolve
    })
  }
}
```

## 3. Vue2 与 Vue3 的区别

### 01. 重构了响应式原理

- Vue2 响应式原理：Object.defineProperty
- Vue3 响应式原理：Proxy

### 02. Vue3 增加了 composition API,优化了逻辑复用，函数式编程，hooks

- Vue2 逻辑复用：mixin
- Vue3 逻辑复用：composition API

### 03. VDOM diff 算法优化

- Vue2 虚拟 DOM 算法：diff 算法
- Vue3 虚拟 DOM 算法：patchFlag， 最长递增子序列

### 04. 类型检测的优化

- Vue2 使用的 flow 库
- Vue3 使用的 ts

### 05. Vue3 支持 tree-shaking

### 06. Vue3 模板编译方面，会编译为常量

### 07. Vue3 支持自定义渲染器

### 08. Vue3 支持多根节点

### 09. Vue3 支持一些新组件功能

- Fragment 组件
- Teleport 组件
- Suspense 组件

## 4. Vue 模板渲染原理

vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的 HTML 语法，所以需要将 template 转化成一个 JavaScript 函数，这样浏览器就可以执行这一个函数并渲染出对应的 HTML 元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。

模板编译又分三个阶段，解析 parse，优化 optimize，生成 generate，最终生成可执行函数 render。

- parse 阶段：使用大量的正则表达式对 template 字符串进行解析，将标签、指令、属性等转化为抽象语法树 AST。

- optimize 阶段：遍历 AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行 diff 比较时，直接跳过这一些静态节点，优化 runtime 的性能。

- generate 阶段：将最终的 AST 转化为 render 函数字符串。

## 5. computed 与 watch 的区别

计算属性 computed 和 watch 都可以进行观察属性的变化从而进行响应更新，但是不同点如下

计算属性 computed 更多的是要作为缓存功能的观察者，他可以监听data的一个属性或者多个属性，经过一些复杂的运算，得到一个新的值，提供给渲染函数使用。当依赖的属性发生变化的时候，他不会立即重新计算生成新的值，而是先标记为脏数据，在下次 computed 被获取的时候，才会进行计算并返回

而 watch 并不具备缓存性，监听器 watch 提供一个监听函数，当监听的属性发生变化时，立即执行该函数。

## 6. template 预编译是什么？

对于 vue 组件来说，编译组件只会在组件实例化时编译一次，生成渲染函数后不会在执行编译。因此，编译对组件的 runtime 是一种消耗。

模板编译的目的仅仅是将 template 转换成 render 函数，这个过程正好可以在项目构建的过程中完成。这样可以让实际组件在 runtime 的时候跳过模板编译，进而提升性能。

这个项目构建时编译 template 的过程，叫做预编译。

## 7. 那template和jsx的有什么分别？

对于 runtime 来说，只需要保证组件存在 render 函数即可，而我们有了预编译之后，我们只需要保证构建过程中生成 render 函数就可以。

在 webpack 中，我们使用vue-loader编译.vue文件，内部依赖的vue-template-compiler模块，在 webpack 构建过程中，将template预编译成 render 函数。

与 react 类似，在添加了jsx的语法糖解析器babel-plugin-transform-vue-jsx之后，就可以直接手写render函数。

所以，template 和 jsx 的都是 render 的一种表现形式，不同的是：

JSX 相对于 template 而言，具有更高的灵活性，在复杂的组件中，更具有优势，而 template 虽然显得有些呆滞。但是 template 在代码结构上更符合视图与逻辑分离的习惯，更简单、更直观、更好维护。

## 8. SSR有了解吗？原理是什么？

在客户端请求服务器的时候，服务器到数据库中获取到相关的数据，并且在服务器内部将 Vue 组件渲染成 HTML，并且将数据、HTML一并返回给客户端，这个在服务器将数据和组件转化为 HTML 的过程，叫做服务端渲染 SSR。

而当客户端拿到服务器渲染的 HTML 和数据之后，由于数据已经有了，客户端不需要再一次请求数据，而只需要将数据同步到组件或者Vuex内部即可。除了数据以外，HTML结构也已经有了，客户端在渲染组件的时候，也只需要将 HTML 的 DOM 节点映射到 Virtual DOM 即可，不需要重新创建 DOM 节点，这个将数据和 HTML 同步的过程，又叫做客户端激活。

使用SSR的好处：

**有利于SEO**：其实就是有利于爬虫来爬你的页面，因为部分页面爬虫是不支持执行 JavaScript 的，这种不支持执行JavaScript 的爬虫抓取到的非SSR的页面会是一个空的 HTML 页面，而有了 SSR 以后，这些爬虫就可以获取到完整的HTML 结构的数据，进而收录到搜索引擎中。

**白屏时间更短**：相对于客户端渲染，服务端渲染在浏览器请求 URL 之后已经得到了一个带有数据的 HTML 文本，浏览器只需要解析 HTML，直接构建 DOM树 就可以。而客户端渲染，需要先得到一个空的 HTML 页面，这个时候页面已经进入白屏，之后还需要经过加载并执行 JavaScript、请求后端服务器获取数据、JavaScript 渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载 JavaScript 脚本，越是复杂的应用，需要加载的 JavaScript 脚本就越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。

## 9. 在 Vue 中为 diff 设置 key 一定可以提升效率吗？

在 Vue 中，`diff`算法是用于比较新旧虚拟 DOM 节点，并对页面进行更新的一种机制。

设置`key`可以提高`diff`算法的效率，但并不是绝对的。 

当使用`v-for`遍历元素列表时，Vue 会默认采用`就地复用`策略，即尽可能地复用已渲染的 DOM 元素，而不是移动它们的位置来匹配数据项的顺序。这种默认模式在大多数情况下是高效的，但仅适用于不依赖子组件状态或临时 DOM 状态（例如表单输入值）的简单列表渲染。 

如果数据项的顺序发生改变，Vue 将不会移动 DOM 元素来匹配新的顺序，而是简单地复用每个元素，并确保它们在特定的索引下显示正确的内容。这种行为可能会导致一些意外的渲染结果，例如在表单输入值发生变化时，可能会出现数据错位的问题。 

通过为每个元素提供一个唯一的`key`值，可以告诉 Vue 在比较新旧节点时，要依据`key`来进行判断。这样可以更准确、快速地找到对应的`vnode`节点，从而提高`diff`算法的效率。

但是，如果列表渲染的内容非常简单，或者故意依赖默认行为来获得性能提升，那么不使用`key`可能会更高效。 

因此，建议在使用`v-for`时尽可能地提供`key`，除非你确定不需要或者遍历输出的 DOM 内容非常简单。

> ```
> 该怎么理解上面那句话，有没有实际例子
> ```

好的，我用一个简单的例子来解释一下`diff`算法以及`key`值的作用：

假设有一个列表，包含三个元素`A`、`B`、`C`，当它们的顺序发生变化时，如果不使用`key`，`Vue`会将整个列表重新渲染。而如果为每个元素设置了`key`，`Vue`就会根据`key`来判断哪些元素发生了变化，从而只更新发生变化的元素，而不是整个列表。

下面是一个代码示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <!-- 使用 v-for 循环渲染列表 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
  </div>

  <script>
    // 创建一个 Vue 实例
    const app = new Vue({
      el: '#app',
      data: {
        items: [
          { id: 1, text: 'A' },
          { id: 2, text: 'B' },
          { id: 3, text: 'C' }
        ]
      }
    });

    // 模拟数据更新
    setInterval(() => {
      app.items.splice(1, 1, { id: 4, text: 'D' });
    }, 1000);
  </script>
</body>
</html>
```

在上述示例中，为每个元素设置了`key`值为`id`，当列表中的元素顺序发生变化时，`Vue`会根据`key`值来判断哪些元素发生了变化，从而只更新发生变化的元素，提高了`diff`效率。

请注意，`key`值应该是唯一的，并且最好是能够反映元素身份的属性。如果`key`值不唯一，或者没有提供`key`值，`Vue`可能无法正确地识别哪些元素发生了变化，从而导致不必要的重新渲染。

## 10. Vue 自定义指令 应用场景

### 表单的重复提交

```vue
<template>
	<button v-throttle="formSubmit">表单提交</button>
</template>

<script>
  Vue.directive("throttle", {
  bind: (el, binding) => {
    let throttleTime = binding.value
    if(!throttleTime){
      throttleTime = 2000
    }
    let cbFunc
    el.addEventListener("click", event => {
      if(cbFunc){
        cbFunc = setTimeout(() => {
          cbFunc = null
        }, throttleTime)
      }else {
        event.stopImmediatePropagation()
      }
    }, true)
  }
})
</script>
```

### 一键复制

## 11. Vue 组件间的通信方式

props、emit、attrs

$parent $root

ref、eventBus、Vuex

### 1. 父子之间的组件通信

* props
* emit
* $parent
* $ref
* $attrs

### 2. 兄弟组件之间

* $parent
* $root
* eventBus
* vuex

### 3. 跨层级组件通信

* eventBus
* vuex
* provide/inject

## 12. Vue 跨域

### 什么是跨域

* 协议 protocol
* 主机名（域名）host
* 端口 prot

### 如何解决跨域

* JSONP
* CORS
* Proxy
* Nginx



