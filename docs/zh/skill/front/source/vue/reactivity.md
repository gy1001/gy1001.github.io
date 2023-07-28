# 源码探秘之数据响应式原理

## 前言：何为数据响应式

### 1.1 官方示图

<img src="https://v2.cn.vuejs.org/images/data.png" alt="img" style="float:left;" />

### 1.2 其他相关

1. 从 MVVM 模式说开去

   模板：

   ```html
   <p>我{{age}}岁了</p>
   ```

   数据变化

   ```javascript
   this.age++
   ```

   数据变化，视图会自动变化（model <===view-model===> view）

2. 侵入式和非侵入式

   `Vue数据变化`： 非侵入式

   ```javascript
   this.a +++
   ```

   `React数据变化`：侵入式

   ```javascript
   this.setState({
     a: this.state.a + 1,
   })
   ```

   `小程序数据变化`：侵入式

   ```javascript
   this.setData({
     a: this.data.a + 1,
   })
   ```

### 1.3 核心

"上帝的钥匙"，API: `Object.defineProperty()`: 数据劫持/数据代理

利用 JavaScript 引擎赋予的功能，检测对象属性的变化，仅有"上帝的钥匙"不够，还需要设计一套精密的系统。

## 1、Object.defineProperty

> Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的原有属性，并返回此对象。

- 可以通过它设置一些额外隐藏的属性
- get/set：getter 和 setter 函数, **其中在 `get` 和 `set` 方法中，`this` 指向某个被访问和修改属性的对象。**

代码示例

```javascript
const object1 = {}

Object.defineProperty(object1, 'property1', {
  value: 42,
  // 是否可写
  writable: false,
  // 是否可以被枚举
  enumerable: false,
})

object1.property1 = 77
// throws an error in strict mode

console.log(object1.property1)
// expected output: 42
```

## 2、defineReactive 函数

1. getter/setter 需要变量周转才可以成功

   代码示例

   ```javascript
   let temp
   const obj = {}

   Object.defineProperty(obj, 'a', {
     //getter
     get() {
       console.log('你试图访问obj的a属性')
       return temp
     },
     set(newValue) {
       console.log('你试图设置obj的a属性', newValue)
       temp = newValue
     },
   })
   console.log(obj.a)
   obj.a = 9
   console.log(obj.a)
   ```

2. 上述代码实现方式不够优雅，可以利用闭包特性来进一步优化实现

   代码示例

   ```javascript
   function defineReactive(data, key, val) {
     Object.defineProperty(data, key, {
       // 可枚举
       enumerable: true,
       // 可以被配置，比如可以被 delete
       configurable: true,
       get() {
         console.log('你试图访问obj的a属性')
         return val
       },
       set(newValue) {
         if (newValue === val) {
           return
         }
         console.log('你试图设置obj的a属性', newValue)
         val = newValue
       },
     })
   }
   ```

## 3、递归侦测对象全部属性

### 3.1 搭建基本环境

1. 执行以下命令

   ```shell
   mkdir vue-reactivity
   cd vue-reactivity
   npm init -y
   npm install webpack webpack-dev-server webpack-cli --save-dev
   npm install html-webpack-plugin --save
   ```

2. 新建`webpack.config.js`，写入以下内容

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const path = require('path')

   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
   }
   ```

3. `package.json`中增加以下脚本

   ```javascript
   {
     ...
     "scripts": {
       "dev": "webpack serve"
     }
   }
   ```

4. 新建`src/index.html`、`src/index.js`文件，并写入想要的内容

5. 运行命令`npm run dev`，打开浏览器，输入相应地址就可以看到效果。至此，基本环境搭建完成

### 3.2 书写代码

涉及到以下类

**Observer**：将一个正常的 object 转换为每个层级的属性都是响应式（可以被侦测）的 object

**注意**：<u>这里添加了一个不可枚举的`__ob__`属性,这个属性值是当前 Observer 的实例。 这样我们就可以通过数组数据的 `__ob__` 属性拿到 Observer
实例，然后就可以拿到 `__ob__`上的 dep 啦</u>

添加`__ob__`的作用：

- **为了在拦截器中访问 Observer 实例**
- **还可以用来标记当前 value 是否已经被 Observer 转换成了响应式数据**

1. `index.js`中 写入以下内容

   ```javascript
   import observe from './observe'
   const obj = {
     a: {
       m: {
         n: 5,
       },
     },
     b: 9,
   }

   observe(obj)
   obj.a.m.n = 8
   obj.b = 10
   console.log(obj.a.m.n)
   console.log(obj.b)
   ```

2. 新建`observe.js`,写入以下内容

   ```javascript
   import Observer from './Observer'

   // 创建 observe 函数
   export default function observe(value) {
     if (typeof value !== 'object') {
       return
     }
     var ob
     if (typeof value.__ob__ !== 'undefined') {
       ob = value.__ob__
     } else {
       ob = new Observer(value)
     }
     return ob
   }
   ```

3. 新建`Observer.js`,写入以下内容

   ```javascript
   import defineReactive from './defineReactive'
   import { def } from './utis'

   export default class Observer {
     constructor(value) {
       // 给实例(this,一定要注意，构造函数中的this不是类本身，而是表示实例)添加了 __ob__属性，值是这次new的实例
       def(value, '__ob__', this, false)
       this.walk(value)
     }
     // 遍历
     walk(value) {
       for (const key in value) {
         defineReactive(value, key, value[key])
       }
     }
   }
   ```

4. 新建`defineReactive.js`，写入以下内容

   ```javascript
   import observe from './observe'

   export default function defineReactive(data, key, val) {
     // value 可能也是对象，所以也要进行做处理
     observe(val)
     Object.defineProperty(data, key, {
       get() {
         console.log('获取' + key + '属性')
         return val
       },
       set(newVal) {
         console.log('设置' + key + '属性', newVal)
         if (newVal === val) {
           return
         }
         // 当设置了新值，新值也要被 observe
         observe(newVal)
         val = newVal
         return newVal
       },
     })
   }
   ```

## 4、数组的响应式处理

> push、pop、shift、unshift、splice、sort、reverse 这七种方法被改写了

### 4.1 对数组的 API 进行做拦截处理

1. 逻辑分析：

   - 对于数组，通过`Object.defineProperty`并不能获得 setter 和 getter 的响应。我们只能通过对它的原型链上做拦截处理。在日常使用中，`vue`对我们常用的一些数组处理方式做了拦截处理，保留了原有的功能，并增加了响应的拦截处理（比如：触发依赖收集、更新，以及对新添加的数据进行响应式处理）

2. 代码实现(这里先做对数组的 API 拦截处理部分)

   - 对`Observer.js`进行修改，判断数据类型为数组时候做单独处理

     ```javascript
     import defineReactive from './defineReactive'
     import { def } from './utis'
     import { arrayMethods } from './array'

     export default class Observer {
       constructor(value) {
         // 给实例(this,一定要注意，构造函数中的this不是类本身，而是表示实例)添加了 __ob__属性，值是这次new的实例
         def(value, '__ob__', this, false)
         // 新增加
         // 如果类型是数组，要讲这个数组的原型指向新创建的 arrayMethods
         if (Array.isArray(value)) {
           handleWithArray(value)
         } else {
           this.walk(value)
         }
       }
       // 遍历
       walk(value) {
         //...
       }
     }

     function handleWithArray(value) {
       // 实际上直接替换即可，但是源码中做了一个兼容处理。某些浏览器可能不支持 __proto__
       // value.__proto__ = arrayMethods
       // 以下代码为兼容处理
       const augment = hasProto ? protoAugment : copyAugment
       augment(value, arrayMethods, arrayKeys)
     }

     // 把数组的原型链指向 我们新创建的函数
     function protoAugment(target, src) {
       target.__proto__ = src
     }

     // 遇见不兼容时候，则调用copyAugment函数将拦截器中的方法挂载到value上
     function copyAugment(target, src, keys) {
       for (let index = 0; index < keys.length; index++) {
         const key = keys[index]
         def(target, key, src[key])
       }
     }
     ```

   - 创建`array.js`,内容如下

     ```javascript
     import { def } from './utils'

     const arrayProperty = Array.prototype
     // 新创建原型并暴露
     export const arrayMethods = Object.create(arrayProperty)

     const needChangeMethods = [
       'push',
       'pop',
       'shift',
       'unshift',
       'splice',
       'sort',
       'reverse',
     ]

     needChangeMethods.forEach((methodName) => {
       // 备份原来的方法
       const original = arrayProperty[methodName]
       // 定义新的方法
       def(
         arrayMethods,
         methodName,
         function () {
           const result = original.apply(this, arguments)
           console.warn('数组拦截器被拦截了', methodName, result)
           return result
         },
         false,
       )
     })
     ```

### 4.2 响应式处理数组中的元素

1. 遗留问题：上一节中对数组的原型链进行了处理，相当于增加了一层拦截器。但是并没有对数组中的元素进行响应式处理。

2. 逻辑分析：在`Observer.js`判断数据类型为 数组时，在处理数组拦截器后，还要对数组进行遍历，使其子项处理为响应式

3. 代码实现

   修改`Observer.js`,判断数据类型为数组时候继续新增加遍历处理部分

   ```javascript
   import observe from './observe'

   export default class Observer {
     constructor() {
       // 给实例(this,一定要注意，构造函数中的this不是类本身，而是表示实例)添加了 __ob__属性，值是这次new的实例
       def(value, '__ob__', this, false)
       if (Array.isArray(value)) {
         handleWithArray(value)
         // 新增加
         this.observeArray(value)
       } else {
         this.walk(value)
       }
     }

     // 侦测数组中的每一项
     observeArray(items) {
       for (let index = 0, l = items.length; index < l; index++) {
         observe(items[index])
       }
     }
   }
   ```

### 4.3 对数组拦截器的 API 做处理

> 对于 push、splice 等方法，涉及到新增加元素，这个元素也要实现响应式处理

1. 逻辑分析：针对需要处理的不同方法，把各自新增的元素提取处理，然后处理为响应式

   注意：这里用到了 3.2 章节中新增加的 `__ob__`属性，因为这里要调用 `Observer`中的`observerArray`方法来处理新项

2. 代码实现

   - 修改`array.js`,内容如下

     ```javascript
     needChangeMethods.forEach((methodName) => {
       // 备份原来的方法
       const original = arrayProperty[methodName]
       // 定义新的方法
       def(
         arrayMethods,
         methodName,
         function (...args) {
           const result = original.apply(this, arguments)
           console.warn('数组拦截器被拦截了', methodName, result)
           // 新增加(注意第1节中说的，在 get 和 set 中 this指向某个被访问和修改属性的对象。)
           const ob = this.__ob__
           let insertedItems
           switch (methodName) {
             case 'push':
             case 'unshift':
               insertedItems = args
               break
             case 'splice':
               insertedItems = args.slice(2)
               break
           }
           if (insertedItems) ob.observeArray(insertedItems)
           return result
         },
         false,
       )
     })
     ```

3. 测试代码

   - 修改`index.js`

     ```javascript
     import observe from './observe'
     import array from './array'
     const obj = {
       a: {
         m: {
           n: 5,
         },
       },
       b: 9,
       c: [1, 2, 3, 4, 5, 6, 7],
     }

     observe(obj)
     obj.a.m.n = 8
     obj.b = 10
     console.log(obj.a.m.n)
     console.log(obj.b)
     // 测试数组的方法
     obj.c.push(88)
     obj.c.splice(5, 0, { name: '孙悟空', age: '500' })
     console.log(obj.c)
     obj.c[5].name = '猪八戒'
     console.log(obj.c[5])
     ```

## 5、依赖收集

### 5.1 什么是依赖

> 需要用到数据的地方，被称为依赖

- 在 Vue1.x 中，**细粒度**依赖，用到数据的**DOM**都是依赖
- 在 Vue2.x 中，**中等粒度**依赖，用到数据的**组件**是依赖
- 重点：**在 getter 中收集依赖，在 setter 中触发依赖**

### 5.2 Dep 类和 Watcher 类

- 把依赖收集的代码封装成一个 `Dep` 类，它专门用来管理依赖，**每个 `Observer` 的实例，成员中都有一个 `Dep` 的实例**

- `Watcher` 是一个中介，数据发生变化时通过 `Watcher` 中转，通知组件

- 可以参考下图：([原文章地址](https://blog.csdn.net/Mikon_0703/article/details/111367773))

  <img src="https://img-blog.csdnimg.cn/2020121819281311.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L01pa29uXzA3MDM=,size_16,color_FFFFFF,t_70" alt="img" style="float:left;" />

- 依赖就是`Watcher`。只有`Watcher`触发的`getter`才会收集依赖，哪个`Watcher`触发了`getter`，就把哪个`Watcher`收集到`Dep`中

- `Dep`使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的`Watcher`都通知一遍

- 代码实现的巧妙之处：`Watcher`把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以会触发者数据的`getter`。在`getter`中就能得到当前正在读取数据的`Watcher`，并把这个`Watcher`收集到`Dep`中。

### 5.3 代码实现

1. 创建`Dep.js`类，它具有以下方法

   - 有一个数组属性，用来存储添加的依赖订阅者(其实就是 watcher 实例)

   - 有一个添加方法：用来添加订阅者，接收参数为 订阅者

   - 有一个通知方法：用来通知订阅者可以更新了

   - 代码展示

     ```javascript
     export default class Dep {
       constructor() {
         console.log('我是DEP类的构造器')
         // 用数组存储自己的订阅者，放的是watcher实例
         this.subs = new Set()
       }

       // 添加订阅
       addSub(sub) {
         this.subs.add(sub)
       }

       notify() {
         // 浅拷贝一份
         // 源码中使用了，浅拷贝，为什么要浅拷贝 呢？？？？？
         // const subs = this.subs.slice()
         this.subs.forEach((sub) => {
           sub.update()
         })
       }
     }
     ```

2. 创建`Watcher.js`类，它具有以下方法

   - 接受几个参数

     - vm: vm 实例
     - expOrFn: 要监听的表达式或者函数
     - cb: 执行回调函数

   - `update`方法：更新方法，更新自身值 并执行回调函数（回调函数参数为：新值，旧值）

   - `get`方法：计算要监听的表达式的值，把自身实例`this`暴露为`Dep`的`target`属性，然后触发依赖收集函数里面的逻辑，然后在把`Dep.target`置为`null`

   - 代码实现

     ```javascript
     import Dep from './Dep'

     // parsePath的改造，返回一个函数，处理监听 比如 a.m.n 表达式的属性
     function parsePath(path) {
       const segments = path.split('.')
       return function (obj) {
         for (let key of segments) {
           if (!obj) return
           obj = obj[key]
         }
         return obj
       }
     }

     export default class Watcher {
       constructor(vm, expOrFn, cb) {
         console.log('我是Watcher类的构造器')
         this.vm = vm
         // 修改
         if (typeof expOrFn === 'function') {
           this.getter = expOrFn
         } else {
           this.getter = parsePath(expOrFn)
         }
         this.cb = cb
         this.value = this.get()
       }
       update() {
         console.log('我是watcher类中的update方法')
         const oldValue = this.value
         this.value = this.get()
         this.cb.call(this.vm, this.value, oldValue)
       }

       get() {
         Dep.target = this
         const result = this.getter.call(this.vm, this.vm)
         Dep.target = null
         return result
       }
     }
     ```

3. 下面对`defineReactive.js`中进行修改

   > 宗旨：在 getter 中收集依赖，在 setter 中触发依赖

   - 逻辑分析：这里利用了一个闭包，每一个响应式数据内部都有一个`dep实例`(Vue2.x 中已经不这么做了)，然后在触发`getter`函数时候，判断`Dep.target`如果有值，就往`dep`实例上添加`Dep.target`。然后在`setter`函数中，触发这个`dep实例`的 update 方法即可

   - 代码展示

     ```javascript
     import Dep from './Dep'
     import observe from './observe'

     export default function defineReactive(data, key, val) {
       // 新增加
       const dep = new Dep()
       // value 可能也是对象，所以也要进行做处理
       observe(val)
       Object.defineProperty(data, key, {
         get() {
           console.log('获取' + key + '属性')
           // 新增加
           if (Dep.target) {
             dep.addSub(Dep.target)
           }
           return val
         },
         set(newVal) {
           console.log('设置' + key + '属性', newVal)
           if (newVal === val) {
             return
           }
           // 当设置了新值，新值也要被 observe
           observe(newVal)
           val = newVal
           // 新增加
           dep.notify()
           return newVal
         },
       })
     }
     ```

4. 测试代码，修改`index.js`如下

   ```javascript
   import observe from './observe'
   import array from './array'
   // 新增加
   import Watcher from './Watcher'
   const obj = {
     a: {
       m: {
         n: 5,
       },
     },
     b: 9,
     c: [1, 2, 3, 4, 5, 6, 7],
   }

   observe(obj)
   obj.a.m.n = 8
   obj.b = 10
   console.log(obj.a.m.n)
   console.log(obj.b)
   obj.c.push(88)
   obj.c.splice(5, 0, { name: '孙悟空', age: '500' })
   console.log(obj.c)
   obj.c[5].name = '猪八戒'
   console.log(obj.c[5])

   // 新增加
   new Watcher(obj, 'a.m.n', (newVal, oldVal) => {
     console.log('☆☆☆☆☆☆☆', newVal, oldVal)
   })
   obj.a.m.n = 10
   // 控制台中可以看到结果  ☆☆☆☆☆☆☆ 10 8
   ```
