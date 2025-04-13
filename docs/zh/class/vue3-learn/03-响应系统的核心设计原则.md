# 03-响应系统-响应系统的核心设计原则

## 01：前言

从本章节我们将陆续实现`Vue3`的核心内容，那么本章节首先先来

看的是：**响应系统**

我们通常把：**会影响视图变化的数据成为响应数据**，当响应式数据发生变化时，视图理应发生变化

1. 那么`Vue`中这样的响应性数据是如何进行实现的呢？
2. `Vue2`和`Vue3`之间响应性的设计有什么变化呢？为什么会产生这种变化呢？

如果想知道这些内容，那么就快开始本章节的学习吧

## 02：JS 的程序性

想要了解响应性，那么首先了解什么叫做：**JS 的程序性**

我们来看下面这段代码

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    // 定义一个商品对象，包含价格和数量
    let product = {
      price: 10,
      quantity: 2,
    }
    // 总价格
    let total = product.price * product.quantity
    // 第一次打印
    console.log(`总价格：${total}元`)
    // 修改了商品的数量
    product.quantity = 5
    // 第二次打印
    console.log(`总价格：${total}元`)
  </script>
</html>
```

大家可以想一下，在这段代码中，第一次打印的值是什么？第二次打印的值又是什么？

这是一个非常简单的 JS 逻辑，两次打印的值都是一样的：`总价格：20元`

但是大家有没有想过一个问题？

那就是当我们去进行第二次打印，**你真得希望它还是 20 吗？**

> 我们知道我们最终希望打印的是**总价格**，那么当`quantity`由 2 变为 5 de 时候，总价格不应该是 50 了吗？
>
> 我们打印出来的总价格，难道不应该是 50 吗？

那么此时有没有冒出来一个想法：**商品数量发生变化了，如果总价格能够够自己跟随变化，那就太好了！**

但是`js`本身具有**程序性**，所谓的程序性指的就是：**一套固定的，不会发生变化的执行流程，**在这样的一个程序性之下，我们是**不可能**拿到想要的`50`的

那么如果我们想要拿到这个`50`就必须让你的程序变得更加的”聪明“，也就是使其具备**响应性**

## 03：如何让你的程序变得更加”聪明“

> 你为了让你的程序变得更加”聪明“，所以你开始想：”如果数据变化了，重新执行运算就好了“

那么怎么去做呢？你进行了一个这样的初步设想

1. 创建一个函数 `effect`,在其内部封装`计算总价格的表达式`
2. 在第一次打印总价格之前，执行`effect`方法
3. 在第二次打印总价格之前，执行`effect`方法

那么这样我们是不是就可以在第二次打印的时候，就得到我们想要的`50`了吗？

根据以上设想，你得到了如下的代码

```javascript
// 定义一个商品对象，包含价格和数量
let product = {
  price: 10,
  quantity: 2,
}
// 总价格
let total = 0
// 计算总价格
let effect = () => {
  total = product.price * product.quantity // product.quantity getter 行为
}
// 第一次打印
effect()
console.log(`总价格：${total}元`)
// 修改了商品的数量
product.quantity = 5 // product.quantity setter 行为
effect()
// 第二次打印
console.log(`总价格：${total}元`)
```

在这样的代码中，我们成功的让第二次打印得到了我们期望的结果：**数据变化了，运算也重新执行了**

但是大家可以发现，在我们当前的代码中存在一个明显的问题，那就是：**必须主动在数量变化之后，重新主动触发 effect**才可以得到我们想要的结果。这样就未免有些麻烦，有什么更好的办法吗？

肯定是有的，我们继续往下看

## 04: Vue2 的响应性核心 API:Object.defineProperty

我们知道,在`Vue2`中是使用`Object.defineProperty`作为响应性的核心的。对于这个 API 而言，它可以监听指定对象上的指定属性的 getter、setter 行为。

那么接下来，针对于上节我们必须触发 effect 函数的问题，我们就可以用这个 API 来进行处理，

修改代码如下

```javascript
// 定义一个商品对象，包含价格和数量
let quantity = 2
let product = {
  price: 10,
  quantity,
}
// 总价格
let total = 0
// 计算总价格
let effect = () => {
  total = product.price * product.quantity
}
// 第一次打印
effect()
console.log(`总价格：${total}元`)
// 使用 Object.defineProperty 来监听 quantity 属性的 getter setter 行为
Object.defineProperty(product, 'quantity', {
  get() {
    return quantity
  },
  set(newValue) {
    quantity = newValue
    // 触发 effect
    effect()
  },
})
// 修改了商品的数量
product.quantity = 5
// 第二次打印
console.log(`总价格：${total}元`)
```

当我们修改`product.quantity`的值的时候，就会触发使用 `Object.defineProperty`监听的指定对象`product`的指定属性`product`的 `setter`行为，然后重新为全局变量`quantity`赋值，然后触发`effect`函数，此时 `effect`函数执行，会触发`product`属性`quantity`的 `getter`行为，然后返回值是全局变量`quantity`的值。此时 总价格`total`就更新为最新的数据，第二次打印时候，总价格就是计算后的最新的数据。

这样我们就解决了需要在打印前，手动触发更新总价格函数逻辑的行为。程序变得更加”智能“

## 05：Obejct.defineProperty 在设计层的缺陷

`Vue2`使用`Object.defineProperty`作为响应性的核心 API,但是在`Vue3`的时候却放弃了这种方式，转而使用`Proxy`实现，为什么会这样呢？

这是因为：**Obejct.defineProperty 存在一个致命的缺陷**

在[vue 官网存在这样的一段描述](https://v2.cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)：

> 由于 JavaScript 的限制，Vue**不能检测**数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性

他说：**由于 JavaScript 的限制，Vue 不能检测数组和对象的变化**这是什么意思呢？

我们开看下面的这个例子

```vue
<template>
  <div>
    <ul>
      <li v-for="(value, key) in obj" :key="value">{{ key }}--{{ value }}</li>
    </ul>
    <button @click="addObjKey">为对象新增属性</button>
    <div>----------------------------</div>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{ index }}--{{ item }}</li>
    </ul>
    <button @click="addArrItem">为数组新增元素</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      obj: {
        name: '孙悟空',
        age: 100,
      },
      arr: ['张三', '李四'],
    }
  },
  methods: {
    addObjKey() {
      this.obj.gender = '男'
      console.log(this.obj) // 通过打印可以发现，obj 中存在gender 属性，但是视图中并没有体现
    },
    addArrItem() {
      this.arr[2] = '王五'
      console.log(this.arr) // 通过打印可以发现，arr 中存在 王五，但是视图中并没有体现
    },
  },
}
</script>
```

在上面的例子中，我们呈现了`Vue2`中响应性的限制

1. 当为**对象**新增一个没有在 data 中声明的属性时，新增的属性**不是响应性**的
2. 当为**数组**通过下标的形式新增加一个元素时，新增的元素**不是响应性**的

那么为什么会这样的呢？

想要搞明白这个，那就必须明白官网说的**由于 JavaScript 的限制**指的是什么意思

我们知道

1. `vue2`中是以`Obejct.defineProperty`作为核心 API 实现的响应性
2. `Obejct.defineProperty`只可以监听**指定对象的指定属性的 getter 和 setter**
3. 被监听了`getter`和`setter`的属性，就被叫做**该属性具备了响应性**

那么这就意味着：我们**必须要知道指定对象中存在该属性**，才可以为该对象指定响应性，

但是**由于 JavaScript 的限制**我们**没有办法监听到为某一个对象新增了某一个属性**这样的一个行为，那么新增属性就没有办法通过 核心 API 来监听到该属性的 getter setter，所以**新增的属性将失去响应性**

> 那么如果想要增加的具备响应性的新属性，那么就可以通过 Vue.set 方法来实现

那么此时，我们已经知道这些 vue2 中的“缺陷”，那么 vue3 中是如何解决这些缺陷的呢？我们继续往下看

### 关于数组的冷知识

##### vm.items[indexOfItem] = newValue 真的不能被监听么？

> Vue 对数组的 7 个变异方法（push、pop、shift、unshift、splice、sort、reverse）实现了响应式。这里就不做测试了。我们测试一下通过索引改变数组的操作，能不能被监听到。
>
> 遍历数组，用 Object.defineProperty 对每一项进行监测

```javascript
function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function defineGet() {
      console.log(`get key: ${key} value: ${value}`)
      return value
    },
    set: function defineSet(newVal) {
      console.log(`set key: ${key} value: ${newVal}`)
      value = newVal
    },
  })
}

function observe(data) {
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key])
  })
}

let arr = [1, 2, 3]
observe(arr)
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfb613ce7c8747fdaf242033a1fc28fb~tplv-k3u1fbpfcp-watermark.image?)

**测试说明**

> 通过索引改变 arr[1]，我们发现触发了 set，也就是 Object.defineProperty 是可以检测到通过索引改变数组的操作的，那 Vue2.0 为什么没有实现呢？是尤大能力不行？这肯定毋庸置疑。那他为什么不实现呢？

#### 后续

后来我在网上找的时候发现了这个。🌀🔥 这是 github 上，一位开发小哥对尤大提到问题。

![image-20230313113310445](/Users/gaoyuan/Library/Application Support/typora-user-images/image-20230313113310445.png)

`小结`：原来是出于对性能原因的考虑，没有去实现它。而不是不能实现。

对于对象而言，每一次的数据变更都会对对象的属性进行一次枚举，一般对象本身的属性数量有限，所以对于遍历枚举等方式产生的性能损耗可以忽略不计，但是对于数组而言呢？数组包含的元素量是可能达到成千上万，假设对于每一次数组元素的更新都触发了枚举/遍历，其带来的性能损耗将与获得的用户体验不成正比，故 vue 无法检测数组的变动。

不过 Vue3.0 用 proxy 代替了 defineProperty 之后就解决了这个问题。

[参考文章：Vue2.0 为什么不能检查数组的变化？又该如何解决？](https://juejin.cn/post/6970752937047883789)

## 06：Vue3 的响应性核心 API: Proxy

因为 `Obejct.defineProperty`存在问题，所以`vue3`中修改了这个核心 API,改为使用 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 进行实现

`proxy`顾名思义就是**代理**的意思，我们来看如下代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>proxy</title>
  </head>
  <body></body>
  <script>
    // 定义一个商品
    let product = {
      price: 10,
      quantity: 2,
    }
    // product: 被代理对象
    // proxyProduct: 代理对象
    // new Proxy 接收两个参数：被代理对象，handler 对象
    // 生成 proxy 代理对象实例，该实例拥有<<被代理对象的所有属性>>，并且可以被监听 setter 和 getter
    const proxyProduct = new Proxy(product, {
      // 监听 proxyProduct 的 set 方法，在 proxyProduct.xx = xx 时候被触发
      // 接收4个参数：被代理对象 target,指定的属性名 key，新值 newValue, 最初被调用对象 receiver
      // 返回值为一个 boolean 类型，true 表示设置成功
      set(target, key, newValue, receiver) {
        // console.log('setter')
        target[key] = newValue
        effect()
        return true
      },
      // 监听 proxyProduct 的 get 方法，在proxyProduct.xx 时候，被触发
      // 接收三个参数：被代理对象 target, 指定的属性名 key，最初被调用的 对象 receiver
      // 返回值 为 在proxyProduct.xx 的结果
      get(target, key, receiver) {
        // console.log('getter')
        return target[key]
      },
    })

    // 总价格
    let total = 0
    // 计算总价格
    let effect = () => {
      total = proxyProduct.price * proxyProduct.quantity
    }
    effect()
    console.log(`总价格为: ${total}`)
    proxyProduct.quantity = 50
    console.log(`总价格为: ${total}`)
  </script>
</html>
```

在以上代码中，我们可以发现`Proxy`和`Object.defineProperty`存在一个非常大的区别，就是：

1. Proxy:
   1. Proxy 将代理一个对象（被代理队形），得到一个新对象（代理对象），同时拥有被代理对象中的所有属性
   2. 当想要修改对象的指定属性时，我们应该使用**代理对象**进行修噶
   3. **代理对象**的任何一个属性都可以触发 `handler`的`setter`和`getter`
2. Object.defineProperty
   1. Object.defineProperty 为**指定对象的指定属性** 设置 **属性描述符**
   2. 当想要修改对象的指定属性时，可以使用原对象进行修改
   3. 通过属性描述符，只有**被监听**的指定属性，才可以触发`getter`和`setter`

所以，当 `Vue3`通过 `Proxy`实现响应性核心 API 之后，`vue`将不会在存在新增属性丢失响应性的问题

## 07: Proxy 的最佳拍档：Reflect--拦截 JS 对象操作

当我们了解了`Proxy`之后，那么接下来我们需要了解另一个 `Proxy` 的"伴生对象": [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

`Reflect` 属性，多数时候会与 `proxy` 配合使用，在 `MDN` `proxy` 的例子中， `Reflect` 也有出现

那么 Reflect 的作用是什么呢？

查看 MDN 的文档介绍，我们可以发现`Reflect`提供了非常多的静态方法，并且很巧的是这些方法与`Proxy` 中`Handler`的方法类似

> ## Reflect 静态方法
>
> [`Reflect.get(target, propertyKey[, receiver\])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)
>
> [`Reflect.has(target, propertyKey)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)
>
> [`Reflect.set(target, propertyKey, value[, receiver\])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)
>
> ...
>
> ## Proxy 的 Handler 对象方法
>
> [`handler.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
>
> [`handler.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)
>
> [`handler.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
>
> ...

我们已经知道了 `handler`中`get`和`set`的作用，那么`Reflect`中的`get`和`set`作用是什么呢？

我们来看一下代码

```javascript
const p1 = {
  name: '张三',
}
console.log(p1.name) // 张三
console.log(Reflect.get(p1, 'name')) // 张三
```

由以上代码可以发现，两次打印的结果都是相同的，这其实就说明了`Reflect.get(obj, "name")`本质上和 `obj.name`的作用相同

那么既然如此，为什么还需要`Reflect`呢？

根据官方文档可知，对于`Reflect.get`而言，它还存在第三个参数`receiver`,那么这个参数的作用是什么呢？

根据官网的介绍为：

> 如果 target 对象中指定了 getter ,receiver 则为 getter 调用时候的 this 值

什么意思呢？我们来看以下代码

```javascript
const p1 = {
  firstName: '张',
  lastName: '三',
  // 通过 get 标识符标记，可以方法的调用像属性的调用一样
  get funllName() {
    return this.firstName + this.lastName
  },
}
const p2 = {
  firstName: '李',
  lastName: '四',
  get funllName() {
    return this.firstName + this.lastName
  },
}
console.log(p1.funllName) // 张三
console.log(Reflect.get(p1, 'funllName')) // 张三
// 第三个参数 receiver 在对象指定了  getter 时表示为 this
console.log(Reflect.get(p1, 'funllName', p2)) // 李四
```

在以上代码中，我们可以利用 `p2`作为第三个参数`receiver`，以此来修改`fullName`的打印结果。即：**此时触发的 fullName 不是 p1 的而是 p2 的**

那么明确好了以后，我们再来看下面这个例子

```javascript
const p1 = {
  firstName: '张',
  lastName: '三',
  get funllName() {
    console.log(this)
    return this.firstName + this.lastName
  },
}
const proxy = new Proxy(p1, {
  get(target, key, receiver) {
    // console.log('getter 行为被触发', receiver)
    return target[key]
  },
})
console.log(proxy.funllName) // 张三
//  思考：getter 行为应该被触发几次呢？ 应该被触发三次
```

在这个代码中，我问大家，此时我们触发了 `proxy.fullName`,在这个`fullName`中又触发了`this.lastName + this.firstName` 那么，**getter 应该触发几次？**

**此时 getter 应该触发 3 次**，但是**实际只触发了 1 次**，这是为什么呢？

可能有同学已经想到了，因为在 `this.lastName + this.firstName`这个代码中，我们的`this`是 `p1`,而不是`proxy`！所以，`lastName`和`firstName`的触发，不会再次出发`getter`

想要实现这个想法，那么就需要使用 `Reflect.get`了。

我们已知，`Reflect.get`的第三个参数`receiver`可以修改`this`指向，那么我们可不可以**利用 Reflect.get 把 fullName 中的 this 指向修改为 proxy**.依次来达到触发三次的效果呢？

我们修改如上代码为

```javascript
const p1 = {
  firstName: '张',
  lastName: '三',
  get funllName() {
    console.log(this)
    return this.firstName + this.lastName
  },
}
const proxy = new Proxy(p1, {
  get(target, key, receiver) {
    // console.log('getter 行为被触发', receiver)
    return Reflect.get(target, key, receiver)
  },
})
console.log(proxy.funllName) // 张三
```

修改代码后，我们发现，此时`getter`得到了三次的触发

### 总结

本小节的内容比较多，但是核心其实就是在描述一件事情，那就是`Reflect`的作用，我们为什么要使用它呢？

最后做一个总结：

当我们期望监听到代理对象的 `getter` 和 `setter` 时，**不应该使用 target[key]**, 因为它在某些时候（比如`fullName`）下是不可靠的。**应该使用 Reflect**, 借助于它的 `get` 和 `set` 方法，使用 `receiver`（proxy 实例）作为 `this`, 已达到期望的结果（触发三次）

## 08： 总结

在本章节中，我们首先了解了 `JS的程序性`，我们知道了默认情况下，JS 是非常死板的，所以如果想要让程序变得更加”聪明“，那么就需要额外做一些事情。

通常我们有两种方式来监听`target`的`getter`和`setter`分别是：

1. `Object.defineProperty`: 这是`Vue2`的响应性核心 API,但是这个 API 存在一定的缺陷，他只能监听**指定对象**的**指定属性**的 `getter`和 `setter`。所以在”某些情况下“，vue2 对象或者数组会失去响应性
2. `Proxy`:这是 `Vue3`的响应式核心 API。该 API 表示代理某一个对象，代理对象将拥有被代理对象的所有属性和方法，并且可以通过操作代理对象来监听对应的`getter`和`setter`

最后如果我们想要”安全“的使用`Proxy`，还需要配合`Reflect`一起才可以。因为一旦我们在**被代理对象的内部，通过 this 触发 getter 和 setter 时，**也需要被监听到。
