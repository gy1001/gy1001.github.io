# Vue 源码探究相关问题

## 1. 为什么不推荐挂载 root 实例到 html 或者 body 上

> 我们在 Vue 官方文档中，肯定看到过这样一段提示内容：el 提供的元素只能作为挂载点。不同于 Vue 1.x，所有的挂载元素会被 Vue 生成的 DOM 替换。因此不推荐挂载 root 实例到 html 或者 body 上。

注意：在$mount 方法中，我们也可以看到这样一段代码，它提示我们不能直接挂载到 html 或 body 上：

```javascript
if (el === document.body || el === document.documentElement) {
  process.env.NODE_ENV !== 'production' &&
    warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
  return this
}
```

那么 为什么不能呢？因为 **$mount 方法执行后，会直接替换挂载节点上面的内容，如果直接挂载 html 或者 body 上，很有可能会丢失掉一些东西，比如：meta，link 或者 script 等。**

[参考资料](https://wangtunan.github.io/blog/vueAnalysis/component/mount.html#%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90)

## 2. Vue 的庐山真面目是一个 Function 的类，为什么不用 ES6 的 Class 去实现呢？

Vue 的定义代码如下

```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

解答：我们往后看这里有很多 `xxxMixin` 的函数调用，并把 `Vue` 当参数传入，它们的功能都是给 `Vue` 的 `prototype` 上扩展一些方法（这里具体的细节会在之后的文章介绍，这里不展开），`Vue` 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 `Class` 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习

[参考资料](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/entrance.html#vue-%E7%9A%84%E5%85%A5%E5%8F%A3)
