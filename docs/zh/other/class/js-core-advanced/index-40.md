

# 40-单例模式

单例模式是最简单的一种设计模式。同时也是使用最多的设计模式。我们在无意识中可能会大量使用它。

顾名思义，单例模式强调的就是**一个类只有一个实例**。

> JavaScript 中去思考单例，要比在其他开发语言里思考单例要简单很多。因为 JavaScript 本身就是单线程语言，不需要考虑多线程的情况下的同步锁问题。

例如，我们随便使用对象字面量创建一个对象，这就是最简单的单例。

```
const p1 = {
  token: '1xd33xsk21',
  time: 20201219
}
```

在实践中，某些场景只需创建一次实例，而不用反复创建实例。

例如，单页应用中的登陆弹窗组件。该组件可能会出现多次，但我们完全没有必要在他每次出现时都创建一个实例。而只需在项目中创建一个实例就可以满足要求。

![img](./assets/1-20240301114459185.png)

那么我们如何才能确保该登陆组件只会创建一个实例呢？

先按照正常的方式创建一个对象

```javascript
class Login {
  constructor() {}
  show() {}
  hide() {}
  // 渲染 DOM 节点
  render() {}
}
```

当前的写法，当我们多次使用 `new` 关键时，就会创建多个实例，还不符合单例模式的要求。那么我们需要思考的问题，就是如何在多次使用 `new` 的时候，不会重复创建实例呢？

我们知道，创建实例的关键就在于构造函数，因此，只需要在构造函数中做一个重复的判断，就可以达到要求。在一个可以在内存中持久存在的地方添加一个引用，用于存储已经创建好的实例，在构造函数中判断，如果该引用已经存在了一个实例，那么就不再返回新的实例。

可以使用静态属性来在内存中存储已创建好的实例

```javascript
class Login {
  // 使用静态属性在内存存储实例
  static instance = null
  constructor(parentNode) {
    // 判断，如果已经存在实例，直接返回该实例
    if (Login.instance) {
      return Login.instance
    }
    this.parentNode = parentNode
    this.render()
    Login.instance = this
    return this
  }

  show() { }
  hide() { }
  // 渲染 DOM 节点
  render() { }
}

const p2 = new Login()
const p1 = new Login()

console.log(p1 === p2) // true
```

当然，也可以使用闭包在内存存储实例，只是写法不一样，思路与上面的方案无差别

```javascript
const Login = (function () {
  // 使用 闭包 在内存存储实例
  let instance = null
  class LoginComponent {
    constructor(parentNode) {
      // 判断，如果已经存在实例，直接返回该实例
      if (instance) {
        return instance
      }
      this.parentNode = parentNode
      this.render()
      instance = this
      return this
    }

    show() { }
    hide() { }
    // 渲染 DOM 节点
    render() { }
  }
  return LoginComponent
})()

const p2 = new Login()
const p1 = new Login()

console.log(p1 === p2) // true
```

仔细观察用闭包存储实例，我们使用函数自执行的方式构建了闭包环境，如果我们换一种方式，假设我们的开发环境已经支持了模块化「import方式」，那么我们就可以将这种方式进行一个简单的调整

首先定义

```javascript
// components/login.js
let instance = null
class LoginComponent {
  constructor(parentNode) {
    // 判断，如果已经存在实例，直接返回该实例
    if (instance) {
      return instance
    }
    this.parentNode = parentNode
    this.render()
    instance = this
    return this
  }

  show() { }
  hide() { }
  // 渲染 DOM 节点
  render() { }
}

export default LoginComponent
```

在其他模块中使用

```javascript
import Login from 'components/login'

const p1 = new Login()
const p2 = new Login()

console.log(p1 === p2)  // true
```

基于这个例子，大家可以体会一下：模块、闭包、单例 之间的关系。

进一步思考，如果我想要把已经封装好的类，转化为单例模式应该怎么办？前提是我期望之前的代码不会更改，或者是第三方依赖无法更改。

此时我们可以借助代理的思维方式来处理。

```javascript
class Login {
  constructor() { }
  show() { }
  hide() { }
  // 渲染 DOM 节点
  render() { }
}

const LoginProxy = (function () {
  let instance = null
  return function() {
    if (!instance) {
      instance = new Login()
    }
    return instance
  }
})()

const p1 = new LoginProxy()
const p2 = new LoginProxy()

console.log(p1 === p2)
```

我们可以将这种方式进行一个简单的调整，让其扩展性变得更强。

核心的思想是创建一个单例创建方法 singleCreator。

singleCreator 借助高阶函数的思想，用于扩展构造函数的逻辑。

```javascript
class Login {
  constructor() { }
  show() { }
  hide() { }
  // 渲染 DOM 节点
  render() { }
}

// 该方法可以将其他的任何类改造成为单例模式
function singleCreator(constructor) {
  let instance = null
  return function() {
    if (!instance) {
      instance = new constructor()
    }
    return instance
  }
}

const _Login = singleCreator(Login)

const p1 = new _Login()
const p2 = new _Login()
console.log(p1)
console.log(p1 === p2)
```