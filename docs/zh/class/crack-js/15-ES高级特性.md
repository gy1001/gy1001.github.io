# 15-ES高级特性
## 01: 能力增强：Decorator和装饰器模式

### 装饰器-Decorator

* 装饰器，可以认为它是一个包装，对类对象，方法，属性 进行包装
* JavaScript 中的装饰器是一种函数，写成 `@ + 函数名`
* 装饰器对类的行为的改变，是代码编译时产生的，而不是运行时

### 类装饰器

* 类装饰器接受一个参数，target 参数指的是类本身

#### 类装饰器-普通用法

```javascript
function addFly(target) {
  console.log('target==', target)
  console.log('addFlay isFly')
  target.prototype.isFly = true
}

@addFly
class Man {
  name = ''
  hp = 0
  constructor(name, hp = 3) {
    this.init(name, hp)
  }

  init(name, hp) {
    this.name = name
    this.hp = hp
  }
}

const p1 = new Man('钢铁侠1版', 5)
console.log('p1 钢铁侠是否可飞:', p1.isFly)
```

#### 类装饰器-传参以及多个执行顺序

* 由上到下依次对装饰器表达式求值

* 求值的结果会被当做函数，由下到上调用

  ```javascript
  function addFly(target) {
    console.log('addFly')
    target.prototype.isFly = true
  }
  
  function addFlyFun(flyHeight) {
    console.log('addFlyFun')
    return function (target) {
      console.log('addFlyFun 执行')
      target.prototype.fly = function () {
        console.log('飞行高度：', flyHeight)
      }
    }
  }
  
  function addTransShape() {
    console.log('addTransShape')
    return function (target) {
      console.log('addTransShape 执行')
      target.prototype.isTransShape = true
    }
  }
  
  @addTransShape()
  @addFlyFun(300)
  @addFly
  class Man {
    name = ''
    hp = 0
    constructor(name, hp = 3) {
      this.init(name, hp)
    }
  
    init(name, hp) {
      this.name = name
      this.hp = hp
    }
  }
  
  const p2 = new Man('钢铁侠1版', 5)
  console.log()
  console.log('p2 钢铁侠是否可飞:', p2.isFly)
  console.log('p2 钢铁侠是否可以变形:', p2.isTransShape)
  p2.fly()
  ```

#### 类装饰器-重载构造

```javascript
function classDecorator(constructor) {
  return class extends constructor {
    hp = 8
  }
}

@classDecorator
class Man {
  name = ''
  hp = 0
  constructor(name, hp = 3) {
    this.init(name, hp)
  }

  init(name, hp) {
    this.name = name
    this.hp = hp
  }

  run() {
    console.log('跑步')
  }
}

const p1 = new Man('钢铁侠3版', 5)
console.log(p1)
```

### 方法装饰器

* 方法装饰器三个参数

  * target: 参数

  * name：属性名

  * descriptor: 属性描述符

* 装饰器的本质是利用了 ES5 的 Object.defineProperty 属性，这三个参数其实是和 Object.defineProperty 参数是一致的

#### 方法装饰器-装饰器方法

```javascript
// equipUtils1.js
function methodReadonly(target, key, descriptor) {
  console.log('target=', target, '==key=', key, '==descriptor==', descriptor)
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false
  return descriptor
}

// 有参数的方法装饰器函数
function methodDecorator(moreHp = 0) {
  return function (target, key, descriptor) {
    //获取原来的方法
    const originalMethod = descriptor.value
    //重写该方法
    descriptor.value = function (...args) {
      console.log('当前参数=', args[1])
      //增加血量hp
      args[1] = args[1] + moreHp

      //注意,这里是this
      return originalMethod.apply(this, args)
    }
    return descriptor
  }
}

module.exports = {
  methodDecorator,
  methodReadonly,
}
```

#### 应用示例1-不带参数

```javascript
const { methodReadonly } = require('./equipUtils1')

class Man {
  name = ''
  hp = 0
  constructor(name, hp = 3) {
    this.init(name, hp)
  }

  init(name, hp) {
    this.name = name
    this.hp = hp
  }

  @methodReadonly
  toString() {
    return `${this.name}的血量:${this.hp}`
  }

  run() {
    console.log('跑步')
  }
}

var p1 = new Man('金刚侠', 5)
console.log(p1.toString())

p1.toString = function () {
  return '1111'
}

console.log(p1.toString()) 
```

#### 应用示例2-带参数

```javascript
const { methodDecorator } = require('./equipUtils1')

class Man {
  name = ''
  hp = 0
  constructor(name, hp = 3) {
    this.init(name, hp)
  }

  @methodDecorator(50)
  init(name, hp) {
    console.log('调用==', this, name, hp)
    this.name = name
    this.hp = hp
  }

  run() {
    console.log('跑步')
  }
}

var p1 = new Man('金刚侠', 5)
console.log('p1 的血量:', p1)
```

### 访问器装饰器

* 访问器装饰器和方法装饰器的参数一致

```javascript
function minHp(minValue) {
  return function (target, propertyKey, descriptor) {
    const oriSet = descriptor.set
    descriptor.set = function (value) {
      if (value <= minValue) {
        return
      }
      oriSet.call(this, value)
    }
  }
}
```

#### 示例1

```javascript
class Man {
  name = ''
  hp = 0
  constructor(name, hp = 3) {
    this.init(name, hp)
  }

  init(name, hp) {
    this.name = name
    this.hp = hp
  }

  @minHp(0)
  set hhp(value) {
    this.hp = value
  }
}

var p1 = new Man('金刚侠', 5)
p1.hhp = 10
console.log('hp', p1.hp)
p1.hhp = -10
console.log('hp', p1.hp)
```

### 属性装饰器

* javascript 属性装饰器和方法装饰器的参数一致
* 注意 Typescript 与 JavaScript的装饰器实现时不一致的。ts 属性装饰器只有前两个参数

#### 示例1-无参数

```javascript
function propertyReadonly(target, propertyName, direction) {
  console.log(target, '====', propertyName, '===', direction)
  direction.writable = false
}

class Man {
  @propertyReadonly name = 'default name'

  getName() {
    return this.name
  }

  setName(name) {
    this.name = name
  }
}

const p1 = new Man()
console.log(p1.getName())
p1.setName('haha') //报错： Cannot assign to read only property 'name' of object
console.log(p1.getName())

```

#### 示例2-有参数

```javascript
function CheckType(type) {
  return function (target, name, descriptor) {
    console.log('descriptor.initializer:', descriptor.initializer.toString())
    let value = descriptor.initializer && descriptor.initializer.call(this)

    return {
      enumerable: true,
      configurable: true,
      get: function () {
        return value
      },
      set: function (c) {
        var cType = typeof c == type
        if (cType) {
          value = c
        }
      },
    }
  }
}

class Man {
  @CheckType('string')
  name = '钢铁侠'

  getName() {
    return this.name
  }

  setName(name) {
    this.name = name
  }
}

const p1 = new Man()
p1.setName(55)
console.log('修改后的名字：', p1.getName())
```

### 装饰器加载顺序

* 总体表达式求值顺序：类装饰器 => 属性装饰器，方法装饰器
* 求值结果：属性装饰器，方法装饰器 => 类装饰器
* 属性与方法装饰器，谁在前面谁先执行
* 表达式：从上到下执行
* 求值结果：从下到上执行

#### 装饰器加载顺序示例

```javascript
// DecoratorUtils.js
function classDecorator1() {
  console.log('classDecorator1')
  return function (target) {
    console.log('classDecorator1 执行')
  }
}

function classDecorator2() {
  console.log('classDecorator2')
  return function (target) {
    console.log('classDecorator2 执行')
  }
}

function methodDecorator1() {
  console.log('methodDecorator1')
  return function (target) {
    console.log('methodDecorator1 执行')
  }
}

function methodDecorator2() {
  console.log('methodDecorator2')
  return function (target, key, descriptor) {
    console.log('methodDecorator2 执行')
    return descriptor
  }
}

function propertyDecorator1() {
  console.log('propertyDecorator1')
  return function (target, key, descriptor) {
    console.log('propertyDecorator1 执行')
    return descriptor
  }
}

function propertyDecorator2() {
  console.log('propertyDecorator2')
  return function (target, key, descriptor) {
    console.log('propertyDecorator2 执行')
    return descriptor
  }
}

module.exports = {
  classDecorator1,
  classDecorator2,
  methodDecorator1,
  methodDecorator2,
  propertyDecorator1,
  propertyDecorator2,
}
```

```javascript
const {
  classDecorator1,
  classDecorator2,
  methodDecorator1,
  methodDecorator2,
  propertyDecorator1,
  propertyDecorator2,
} = require('./DecoratorUtils')

@classDecorator1()
@classDecorator2()
class Man {
  constructor(name, hp = 3) {
    this.init(name, hp)
  }

  init(name, hp) {
    this.name = name
    this.hp = hp
  }
  //故意放在最后，测试顺序
  @propertyDecorator1()
  @propertyDecorator2()
  name = ''

  @methodDecorator1()
  @methodDecorator2()
  run() {
    console.log('跑步')
  }

  hp = 0
}

const p2 = new Man('钢铁侠1版', 5)
```

### 装饰器叠加注意问题

* Decorator 本身叠加使用时是没有问题的，因为你的每次包装，都会将属性的 descriptor 返回给上一层的包装，最后就是一个函数包函数包函数的结果，最终返回的还是这个属性的 descriptor
* 我们尽量避免装饰器冲突

### 为什么不能直接作用于装饰函数

* 装饰器只能用于类和类方法，不能用于普通函数

### 装饰器模式（结构型）

* 定义：给对象动态增加职责，并不真正改动对象本身
* 简单来说就是：包装现有的模块，使之更加强大，并不会影响原有接口的功能，可以理解为锦上添花

### 装饰器模式-需求

> 用户在登录后，打印日志

```javascript
//登录
var showLogin = function () {
  console.log('用户登录')
}

//上报日志
var log = function () {
  console.log('上报日志')
}

//我们想在登录后，打印日志
//方案一:
var showLogin1 = function () {
  showLogin()
  log()
}

showLogin1()

//方案二：直接修改showLogin
var showLogin = function () {
  console.log('用户登录')
  log()
}
```

#### 装饰器模式-传统实现

```javascript
var showLogin = function () {
  console.log('用户登录')
}

var _showLogin = showLogin

showLogin = function () {
  _showLogin()
  console.log('发射激光炮')
}

showLogin()
```

#### 装饰器模式-AOP模式（面向切面编程）

```javascript
Function.prototype.after = function (afterFn) {
  var __self = this
  return function () {
    var ret = __self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

var showLogin = function () {
  console.log('用户登录')
}

var log = function () {
  console.log('上报日志')
}

showLogin = showLogin.after(log)

showLogin()
```

### 装饰器模式-何时使用

* 需要扩展一个类的功能，或者给一个类增加附加责任
* 需要动态给一个对象增加功能，这些功能可以再动态地撤销
* 需要增加一些基本功能的排列组合而产生非常大量的功能

### 装饰器与装饰器模式

* ES7 装饰器是 AOP 的一种实现，可以很方便的实现装饰器模式
* 装饰器模式的原则是不影响原有功能，ES7 的装饰器可以修改类和方法的原有功能

### 装饰器应用场景

* 异常处理
* 日志记录
* 与工厂模式或者装饰器模式结合
* react 中封装 @connect 装饰器等
* 节流，防抖等装饰器
* 。。。

## 02：基于装饰器优雅的捕获异常

### 基础版

#### 示例：方法装饰器使用

```javascript
class DemoClass {
  @methodCatch({
    message: '创建订单失败',
    toast: true,
    report: true,
    log: true,
  })
  async createOrder() {
    const data = {...}
    const res = await createOrder()
    if(!res || res.errCode !== 0){
      	return Toast.error("创建订单异常")
    }
    ...
    其他可能产生异常的代码
    ...
    Toast.sucess("创建订单成功")
  }
}
```

#### 实例：装饰器 methodCatch 的代码

```javascript
// Const.js
const DEFAULT_ERROR_CATCH_OPTIONS = {
  report: true,
  log: true,
  toast: false,
}

module.exports = {
  DEFAULT_ERROR_CATCH_OPTIONS,
}
```

```javascript
const { DEFAULT_ERROR_CATCH_OPTIONS } = require('../Const')

const W_TYPES = ['string', 'object']

function methodCatch(options) {
  const type = typeof options
  let opt
  if (options == null || !W_TYPES.includes(type)) {
    // null 或者 不是字符串或者对象
    opt = DEFAULT_ERROR_CATCH_OPTIONS
  } else if (typeof options === 'string') {
    // 字符串
    opt = {
      ...DEFAULT_ERROR_CATCH_OPTIONS,
      message: options || DEFAULT_ERROR_CATCH_OPTIONS.message,
    }
  } else {
    // 有效的对象
    opt = { ...DEFAULT_ERROR_CATCH_OPTIONS, ...options }
  }

  return function (_target, _name, descriptor) {
    // 保存旧的方法
    const oldFn = descriptor.value
    // 重写旧的方法，
    // 调用自定义的方法，自定义的方法内部再去调用旧的方法
    // descriptor.value = function(){}
    Object.defineProperty(descriptor, 'value', {
      get() {
        async function proxy(...args) {
          try {
            const res = await oldFn.apply(this, args)
            return res
          } catch (err) {
            if (err.__type__ == '__CATCH_ERROR__') {
              console.log(opt, err.options)
              const mOpt = { ...opt, ...(err.options || {}) }
              const message = err.message || mOpt.message
              if (mOpt.log) {
                console.error('asyncMethodCatch:', message, err)
              }
              if (mOpt.report) {
                console.info('report:', message)
              }

              if (mOpt.toast) {
                console.info('toast:', message)
              }
            } else {
              const message = opt.message || err.message
              console.error('asyncMethodCatch:', message, err)

              if (opt.toast) {
                console.info('toast 输出:', message)
              }
            }
          }
        }
        proxy._bound = true
        return proxy
      },
    })
    return descriptor
  }
}

module.exports = {
  methodCatch,
}
```

### 基础版存在的不足

* 抽象不够
* 同步方法经过转换后会变为异步方法
* 错误处理函数再异常怎么办
* 功能局限

### 优化-封装 getOptions

```javascript
// options类型白名单
const W_TYPES = ['string', 'object']

function getOptions(options) {
  const type = typeof options
  let opt
  if (options == null || !W_TYPES.includes(type)) {
    // null 或者 不是字符串或者对象
    opt = DEFAULT_ERROR_CATCH_OPTIONS
  } else if (typeof options === 'string') {
    // 字符串
    opt = {
      ...DEFAULT_ERROR_CATCH_OPTIONS,
      message: options || DEFAULT_ERROR_CATCH_OPTIONS.message,
    }
  } else {
    // 有效的对象
    opt = { ...DEFAULT_ERROR_CATCH_OPTIONS, ...options }
  }
  return opt
}
```

### 优化-定义默认处理函数

```javascript
/**
 *
 * @param err 默认的错误处理函数
 * @param options
 */
function defaultErrorHandler(err, options) {
  const message = err.message || options.message
  console.error(
    'defaultErrorHandler:',
    message,
    '==toast==',
    options.message,
    '==errInfo=' /*err*/,
  )
}
```

### 优化-区分同步方法和异步方法

```javascript
/**
 * 同步函数处理
 * @param {AnyFunction} fn
 * @param {*} context
 * @param {ErrorHandler} callback
 * @returns
 */
function observerSyncHandler(fn, context, callback) {
  return function (...args) {
    try {
      const r = fn.call(context || this, ...args)
      return r
    } catch (err) {
      callback(err)
    }
  }
}


/**
 *
 * 异步函数处理
 * @export
 * @param {AnyFunction} fn
 * @param {*} context
 * @param {ErrorHandler} callback
 * @returns
 */
function observerAsyncHandler(fn, context, callback) {
  return async function (...args) {
    try {
      const r = await fn.call(context || this, ...args)
      return r
    } catch (err) {
      callback(err)
    }
  }
}


/**
 *
 * 自动识别同步还是异步方法
 * @param {any} fn
 * @param {any} context
 * @param {any} callback
 * @returns
 */
function observerAllHandler(fn, context, callback) {
  //AsyncGeneratorFunction 和  AsyncFunction
  if (fn.constructor.name.startsWith('Async')) {
    return observerAsyncHandler(fn, context, callback)
  }
  return observerSyncHandler(fn, context, callback)
}

```

### 优化-方法异常捕获

```javascript
/**
 * class { method(){} }
 * @param {string | CatchOptions} options
 * @param handler
 * @returns
 */
function catchMethod(
  options = DEFAULT_ERROR_CATCH_OPTIONS,
  handler = defaultErrorHandler,
) {
  const opt = getOptions(options)

  return function (_target, _name, descriptor) {
    const oldFn = descriptor.value

    Object.defineProperty(descriptor, 'value', {
      get() {
        const proxy = observerAllHandler(oldFn, undefined, (error) => {
          handler(error, opt)
        })
        proxy._bound = true
        return proxy
      },
    })
    // return descriptor;
  }
}
```

### 优化-具有多级选项定义能力

```javascript
/**
 * // class A{ method = ()=>{} }
 * @param options
 * @param handler
 */
function catchInitializer(
  options = DEFAULT_ERROR_CATCH_OPTIONS,
  handler = defaultErrorHandler,
) {
  const opt = getOptions(options)

  return function (_target, _name, descriptor) {
    const initValue = descriptor.initializer()
    if (typeof initValue !== 'function') {
      return descriptor
    }

    descriptor.initializer = function () {
      initValue.bound = true
      return observerAllHandler(initValue, this, (error) => {
        handler(error, opt)
      })
    }
    return descriptor
  }
}

function createErrorCatch(handler, baseOptions = DEFAULT_ERROR_CATCH_OPTIONS) {
  return {
    catchMethod(options) {
      return catchMethod({ ...baseOptions, ...getOptions(options) }, handler)
    },
    catchGetter(options) {
      return catchGetter({ ...baseOptions, ...getOptions(options) }, handler)
    },
    catchInitializer(options) {
      return catchInitializer(
        { ...baseOptions, ...getOptions(options) },
        handler,
      )
    },
  }
}
```

### 增强-支持 getter

```javascript
/**
 * class {  get method(){} }
 * @param options
 * @param handler
 * @returns
 */
function catchGetter(
  options = DEFAULT_ERROR_CATCH_OPTIONS,
  handler = defaultErrorHandler,
) {
  const opt = getOptions(options)

  return function (_target, _name, descriptor) {
    const { constructor } = _target
    const { get: oldFn } = descriptor

    defineProperty(descriptor, 'get', {
      value() {
        // Class.prototype.key lookup
        // Someone accesses the property directly on the prototype on which it is
        // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
        if (this === _target) {
          return oldFn()
        }
        // Class.prototype.key lookup
        // Someone accesses the property directly on a prototype but it was found
        // up the chain, not defined directly on it
        // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
        if (
          this.constructor !== constructor &&
          getPrototypeOf(this).constructor === constructor
        ) {
          return oldFn()
        }
        const boundFn = observerAllHandler(oldFn, this, (error) => {
          handler(error, opt)
        })
        boundFn._bound = true

        return boundFn()
      },
    })

    return descriptor
  }
}
```

```javascript
const { catchGetter } = require('./createErrorCatch.js')

class Test {
  price = 100
  count = 20

  @catchGetter({ message: '计算价格失败', toast: true })
  get totalPrice() {
    throw new Error('A')
    return this.price * this.count
  }
}

const test = new Test()
console.log(test.totalPrice)

```

### 增强-支持属性定义和赋值

```javascript

/**
 * // class A{ method = ()=>{} }
 * @param options
 * @param handler
 */
function catchInitializer(
  options = DEFAULT_ERROR_CATCH_OPTIONS,
  handler = defaultErrorHandler,
) {
  const opt = getOptions(options)

  return function (_target, _name, descriptor) {
    const initValue = descriptor.initializer()
    if (typeof initValue !== 'function') {
      return descriptor
    }

    descriptor.initializer = function () {
      initValue.bound = true
      return observerAllHandler(initValue, this, (error) => {
        handler(error, opt)
      })
    }
    return descriptor
  }
}
```

```javascript
const { catchInitializer } = require('./createErrorCatch.js')

class Test {
  @catchInitializer('nono')
  doSomethings = () => {
    throw Error('doSomethings error')
  }
}

const test = new Test()
test.doSomethings()
```

### 一览风采：捕获的范围

* Class 的静态同步方法
* Class 的静态异步方法
* Class 的同步方法
* Class 的异步方法
* Class 的同步属性赋值方法
* Clss 的异步属性赋值方法
* Class 的 getter 方法

### 代码示例

[15.2 基于装饰器优雅的捕获异常](https://github.com/gy1001/Javascript/tree/main/JavaScript-Crack/15 ES高级特性/15.2 基于装饰器优雅的捕获异常)

### 具备相似功能的库

* catch-decorator: 仅仅捕捉方法，处理比较初级
* catch-decorator-ts: 仅仅捕捉方法，处理比较初级
* catch-error-decorator: 通过 AsyncFunction 判断，提供失败后的默认返回值
* auto-inject-async-catch-loader: 主要捕获异步方法，原理是 webpack loader, 遍历 AST

## 03：Proxy和代理模式

### Reflect

* 反射
* 它囊括了 JavaScript 引擎内部专用的"内部方法"。例如： Object.keys、Object.getOwnPropertyNames、delete等

### Proxy 对象

* 创建一个对象的代理，从而实现基本操作的额拦截和自定义（如属性查找、赋值、枚举、函数调用等）
* 语法：`const p = new Proxy(target, handler)`
* target: 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
* handler: 一个对象。各属性的函数分别定义了在执行各种操作的代理的 p 的行为，**每个属性，代表这一种代办的事项**

### Proxy 捕获器

* handler 的函数属性是 Proxy 的各个捕获器

1. [`handler.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf)

   [`Object.getPrototypeOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 方法的捕捉器。

2. [`handler.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf)

   [`Object.setPrototypeOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 方法的捕捉器。

3. [`handler.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible)

   [`Object.isExtensible`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) 方法的捕捉器。

4. [`handler.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions)

   [`Object.preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) 方法的捕捉器。

5. [`handler.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor)

   [`Object.getOwnPropertyDescriptor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 方法的捕捉器。

6. [`handler.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty)

   [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法的捕捉器。

7. [`handler.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)

   [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符的捕捉器。

8. [`handler.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)

   属性读取操作的捕捉器。

9. [`handler.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)

   属性设置操作的捕捉器。

10. [`handler.deleteProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty)

    [`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 操作符的捕捉器。

11. [`handler.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys)

    [`Object.getOwnPropertyNames`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 方法和 [`Object.getOwnPropertySymbols`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 方法的捕捉器。

12. [`handler.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply)

    函数调用操作的捕捉器。

13. [`handler.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct)

    [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符的捕捉器。

### get, set 读取和设置捕获器

#### get: 拦截属性值的读取操作

1. `target` 目标对象
2. `prop` 被获取的属性名
3. `receiver` Proxy 或者继承 Proxy 的对象
4. `返回值` 可以是任何值

#### set: 拦截设置属性值的操作

1. `target` 目标对象。
   1. `property` 将被设置的属性名或 `Symbol`。
2. `value` 新属性值。
3. `receiver` **最初被调用的对象**。通常是 `proxy` 本身，但 `set` 方法在原型链上，或以其他方式被间接地调用的时候则不是 `proxy` 本身。
4. `返回值` 为 `true` 时表示设置成功。

* 语法

  ```javascript
  var p = new Proxy(target, {
    get: function (target, property, receiver){ }
  })
  
  const p = new Proxy(target, {
    set: function(target, property, value, receiver){ }
  })
  // target: 目标对象
  // property: 属性名
  // value: 值
  // receiver: 最初被调用对象，通常是 proxy 本身
  ```

* 示例

  ```javascript
  var obj = {}
  var proxyObj = new Proxy(obj, {
    get(target, property, receiver) {
      console.log('get:=============== ')
      console.log('target:', target)
      console.log('property:', property)
      console.log('receiver:', receiver)
      console.log('target === obj:', target === obj)
      console.log('receiver === proxyObj:', receiver === proxyObj)
      console.log(' ')
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      console.log('set:=============== ')
      console.log('target:', target)
      console.log('property:', property)
      console.log('value:', value)
      console.log('receiver:', receiver)
      console.log('target === obj:', target === obj)
      console.log('receiver === proxyObj:', receiver === proxyObj)
      console.log('')
      return Reflect.set(target, property, value, receiver)
    },
  })
  
  // 设置属性
  proxyObj.name = 'name'
  // 读取属性
  console.log('proxyObj.name:', proxyObj.name)
  console.log('obj.name:', obj.name)
  ```

  打印结果如下

  ```text
  set:=============== 
  target: {}
  property: name
  value: name
  receiver: {}
  target === obj: true
  receiver === proxyObj: true
  
  get:=============== 
  target: { name: 'name' }
  property: name
  receiver: { name: 'name' }
  target === obj: true
  receiver === proxyObj: true
   
  proxyObj.name: name
  obj.name: name
  ```

### receiver 不是代理对象的情况

* 某个对象 obj 的原型是一个代理对象

* 当其设置 obj 某个属性，obj 自身不存在这个属性，但是原型（代理对象）上存在这个属性

* 会触发 set 捕获器，这个时候 receiver === 某个对象 obj (不是代理对象)

  ```javascript
  // receiver 不是 proxy对象
  const proto = {
    name: 'parent',
  }
  
  let testObj
  const proxyProto = new Proxy(proto, {
    set(target, property, value, receiver) {
      console.log('触发set捕获器:')
      console.log('receiver === proxyProto:', receiver === proxyProto)
      console.log('receiver === testObj:', testObj === receiver)
  
      console.log('target:', target)
      console.log('property:', property)
      console.log('receiver:', receiver)
      return Reflect.set(target, property, value, receiver)
    },
  })
  
  function TestObject(message) {
    this.message = message
  }
  
  TestObject.prototype = proxyProto
  
  testObj = new TestObject('message')
  console.log()
  console.log('准备设置message属性')
  testObj.message = 'message 啊'
  console.log()
  console.log('准备设置name属性')
  testObj.name = 'parent 啊'
  ```

  打印结果如下

  ```text
  触发set捕获器:
  receiver === proxyProto: false
  receiver === testObj: false
  target: { name: 'parent' }
  property: message
  receiver: {}
  
  准备设置message属性
  
  准备设置name属性
  触发set捕获器:
  receiver === proxyProto: false
  receiver === testObj: true
  target: { name: 'parent' }
  property: name
  receiver: { message: 'message 啊' }
  ```

### receiver 不是代理对象的情况-2

* 某个对象 obj 的原型是一个代理对象

* 实例和原型都有某个属性比如 name

* obj 访问原型某个 getter 方法，getter 里面访问 this.name

  ```javascript
  const proto = {
    name: 'proto name',
    age: 18,
    get nameValue() {
      return this.name
    },
  }
  
  const proxyObj = new Proxy(proto, {
    get(target, property, receiver) {
      console.log('receiver === proxyObj', receiver === proxyObj)
      console.log('receiver === obj', receiver === obj)
      // 相当于 target[property]
      return Reflect.get(target, property)
  
      // 相当于 receiver[property]
      // return Reflect.get(target, property, receiver);
    },
  })
  
  const obj = {
    name: 'obj name',
    age: 10,
  }
  
  // 设置原型
  Object.setPrototypeOf(obj, proxyObj)
  // proxyObj.nameValue receiver === proxyObj
  console.log('proxyObj.nameValue:', proxyObj.nameValue)
  console.log('')
  // obj.nameValue, obj不存在，访问原型链上的方法，所以触发捕获器
  // 期望获取的是对象上的属性，而不是原型上的
  // receiver === obj
  console.log('obj.nameValue:', obj.nameValue)
  console.log('')
  // proxyObj.age
  console.log('proxyObj.age:', proxyObj.age)
  console.log('')
  // obj.age
  console.log('obj.age:', obj.age)
  ```

  执行结果如下

  ```text
  receiver === proxyObj true
  receiver === obj false
  proxyObj.nameValue: proto name
  
  receiver === proxyObj false
  receiver === obj true
  obj.nameValue: proto name
  
  receiver === proxyObj true
  receiver === obj false
  proxyObj.age: 18
  
  obj.age: 10
  ```

### apply 函数调用捕获器

* 语法

  ```javascript
  var p = new Proxy(taregt, {
    apply: function(target, thisArg, argumentsList) {
      // taregt: 目标对象，thisArg: 上下文， argumentsList: 参数数组
    }
  })
  ```

* 拦截范围

  ```javascript
  proxy(...args)
  Function.prototype.apply() 和 Function.prototype.call()
  Reflect.apply()
  ```

* 代码示例

  ```javascript
  function sum(num1, num2) {
    return num1 + num2
  }
  
  const proxySum = new Proxy(sum, {
    apply(target, thisArg, argumentsList) {
      console.log('target:', target)
      console.log('thisArg:', thisArg)
      console.log('argumentsList:', argumentsList)
      return Reflect.apply(target, thisArg, argumentsList)
    },
  })
  
  // 正常调用 proxy(...arguments)
  console.log('proxySum():', proxySum(0, -1))
  console.log()
  
  // call
  console.log('proxySum.call:', proxySum.call(null, 1, 2))
  console.log()
  // apply
  console.log('proxySum.apply:', proxySum.apply(undefined, [3, 4]))
  console.log()
  // Reflect.apply
  console.log('Reflect.apply:', Reflect.apply(proxySum, {}, [5, 6]))
  console.log()
  ```

  执行结果如下

  ```text
  target: [Function: sum]
  thisArg: undefined
  argumentsList: [ 0, -1 ]
  proxySum(): -1
  
  target: [Function: sum]
  thisArg: null
  argumentsList: [ 1, 2 ]
  proxySum.call: 3
  
  target: [Function: sum]
  thisArg: undefined
  argumentsList: [ 3, 4 ]
  proxySum.apply: 7
  
  target: [Function: sum]
  thisArg: {}
  argumentsList: [ 5, 6 ]
  Reflect.apply: 11
  ```

### getPrototypeOf 捕获器

* 语法

  ```javascript
  var p = new Proxy(obj, {
    getPrototypeOf(target) {
      console.log('proxyObj getPrototypeOf')
      return Reflect.getPrototypeOf(target)
    },
  })
  ```
  
* 拦截范围
	
	```javascript
	Object.getPrototypeOf()
	Reflect.getPrototypeOf()
	__proto__
	Object.prototype.isPrototypeOf()
	instanceof
	```
	
* 代码

  ```javascript
  var obj = new Object()
  
  var proxyObj = new Proxy(obj, {
    getPrototypeOf(target) {
      console.log('proxyObj getPrototypeOf')
      return Reflect.getPrototypeOf(target)
    },
  })
  
  console.log('Object.getPrototypeOf:')
  Object.getPrototypeOf(proxyObj)
  console.log()
  
  console.log('Reflect.getPrototypeOf:')
  Reflect.getPrototypeOf(proxyObj)
  console.log()
  
  console.log('__proto__')
  proxyObj.__proto__
  console.log()
  
  console.log('Object.prototype.isPrototypeOf')
  Object.prototype.isPrototypeOf(proxyObj)
  console.log()
  
  console.log('instanceof')
  proxyObj instanceof Object
  console.log()
  ```

  执行结果如下

  ```tex
  Object.getPrototypeOf:
  proxyObj getPrototypeOf
  
  Reflect.getPrototypeOf:
  proxyObj getPrototypeOf
  
  __proto__
  proxyObj getPrototypeOf
  
  Object.prototype.isPrototypeOf
  proxyObj getPrototypeOf
  
  instanceof
  proxyObj getPrototypeOf
  ```

### setPrototypeOf 捕获器

```javascript
var handlerThrows = {
  setPrototypeOf(target, newProto) {
    throw new Error('custom error')
  },
}

var newProto = {},
  target = {}
var p2 = new Proxy(target, handlerThrows)
// Object.setPrototypeOf(p2, newProto); // throws new Error("custom error")
Reflect.setPrototypeOf(p2, newProto) // throws new Error("custom error")
```

### constructor 捕获器 

* 拦截 new 操作，Function 和 Class都可以 new ,所以都可以被拦截

* 语法

  ```javascript
  const handler = {
    // 拦截new 操作符
    // new proxy(...args)
    // Reflect.construct()
    construct(target, argumentsList, newTarget) {
      console.log('construct:', target.name)
      return Reflect.construct(target, argumentsList, newTarget)
    },
  }
  ```

* 代码示例

  ```javascript
  const handler = {
    // 拦截new 操作符
    // new proxy(...args)
    // Reflect.construct()
    construct(target, argumentsList, newTarget) {
      console.log('construct:', target.name)
      return Reflect.construct(target, argumentsList, newTarget)
    },
  }
  
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  
  Person.prototype.getName = function () {
    return this.name
  }
  
  class PersonClass {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
  
    getName() {
      return this.name
    }
  }
  
  var proxyFun = new Proxy(Person, handler)
  var proxyClass = new Proxy(PersonClass, handler)
  
  console.log('ProxyFun:', new proxyFun('小红', 18))
  console.log('')
  console.log('proxyClass:', new proxyClass('小明', 12))
  ```

  执行结果如下

  ```txt
  construct: Person
  ProxyFun: Person { name: '小红', age: 18 }
  
  construct: PersonClass
  proxyClass: PersonClass { name: '小明', age: 12 }
  ```

### 一个场景覆盖其他捕获器

一个对象 obj 有 name age sex 属性

* name不可被配置(defineProperty)

* 尝试删除 name 属性（delete)

* 再查询 name 的属性描述符(getOwnPropertyDescriptor)

* 让 obj 不可被扩展（preventExtensions)

* 在查询 obj 的扩展性状态 (isExtensible)

* 判断是不是 in 对象(has)

* 打印 obj 的健(ownKeys)

* 代码如下

  ```javascript
  const handler = {
    // 拦截修改属性描述符信息
    // Object.defineProperty()
    // Reflect.defineProperty()，
    // proxy.property='value'
    defineProperty(target, prop, descriptor) {
      console.log('handler:defineProperty')
      return Reflect.defineProperty(target, prop, descriptor)
    },
  
    // 拦截delete操作
    // delete proxy[property] 和 delete proxy.property
    // Reflect.deleteProperty()
    deleteProperty(target, prop) {
      console.log('handler:deleteProperty')
      return Reflect.deleteProperty(target, prop)
    },
  
    // 拦截获取属性描述符
    // Object.getOwnPropertyDescriptor()
    // Reflect.getOwnPropertyDescriptor()
    getOwnPropertyDescriptor(target, prop) {
      console.log('handler:getOwnPropertyDescriptor')
      return Reflect.getOwnPropertyDescriptor(target, prop)
    },
  
    // 拦截in
    // property in proxy
    // 继承属性查询: foo in Object.create(proxy)
    // with 检查: with(proxy) { (property); }
    // Reflect.has()
    has(target, prop) {
      console.log('handler:has')
      return Reflect.has(target, prop)
    },
  
    // Object.preventExtensions()
    // Reflect.preventExtensions()
    preventExtensions(target) {
      console.log('handler:preventExtensions')
      return Object.preventExtensions(target)
    },
  
    // Object.isExtensible()
    // Reflect.isExtensible()
    isExtensible(target) {
      console.log('handler:isExtensible')
      return Reflect.isExtensible(target)
      // return true; 也可以return 1;等表示为true的值
    },
  
    // Object.getOwnPropertyNames()
    // Object.getOwnPropertySymbols()
    // Object.keys()
    // Reflect.ownKeys()
    ownKeys(target) {
      console.log('handler:ownKeys')
      return Reflect.ownKeys(target)
    },
  }
  
  const obj = {
    name: 'tom',
    age: 18,
    sex: 1,
  }
  const proxyObj = new Proxy(obj, handler)
  
  // defineProperty ，让name不可配置
  Object.defineProperty(proxyObj, 'name', {
    configurable: false,
  })
  console.log('\r\n')
  //delete 尝试删除
  console.log('delete proxyObj.name:', delete proxyObj.name, '\r\n')
  
  // getOwnPropertyDescriptor
  console.log(
    'getOwnPropertyDescriptor',
    Object.getOwnPropertyDescriptor(proxyObj, 'name'),
    '\r\n',
  )
  
  // has
  console.log('name in proxyObj:', 'name' in proxyObj, '\r\n')
  
  // preventExtensions
  Object.preventExtensions(proxyObj)
  console.log()
  
  console.log('proxyObj isExtensible:', Object.isExtensible(proxyObj), '\r\n')
  
  // ownKeys
  console.log('ownKeys:', Reflect.ownKeys(proxyObj), '\r\n')
  ```

  执行结果如下

  ```text
  handler:defineProperty
  
  handler:deleteProperty
  delete proxyObj.name: false 
  
  handler:getOwnPropertyDescriptor
  getOwnPropertyDescriptor { value: 'tom', writable: true, enumerable: true, configurable: false } 
  
  handler:has
  name in proxyObj: true 
  
  handler:preventExtensions
  
  handler:isExtensible
  proxyObj isExtensible: false 
  
  handler:ownKeys
  ownKeys: [ 'name', 'age', 'sex' ] 
  ```

### 注意事项

* 捕获器函数里面的 this 是 new Proxy 的第二个参数对象

  ```javascript
  var obj = {}
  
  const handler = {
    get(target, property, receiver) {
      console.log('get: this === handler:', this === handler)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      console.log('set: this === handler:', this === handler)
      return Reflect.set(target, property, value, receiver)
    },
  }
  
  var proxyObj = new Proxy(obj, handler)
  
  // 设置属性
  proxyObj.name = 1
  // 读取属性
  console.log('proxyObj.name', proxyObj.name)
  ```

  执行结果如下

  ```txt
  set: this === handler: true
  get: this === handler: true
  proxyObj.name 1
  ```

* Proxy的实例，数据类型和被代理数据类型一致

  ```javascript
  function sum(num1, num2) {
    return num1 + num2
  }
  
  const proxySum = new Proxy(sum, {
    apply(target, thisArg, argumentsList) {
      return Reflect.apply(target, thisArg, argumentsList)
    },
  })
  
  console.log('typeof proxySum:', typeof proxySum)
  console.log('toString proxySum:', Object.prototype.toString.call(proxySum))
  ```

  执行结果如下

  ```txt
  typeof proxySum: function
  toString proxySum: [object Function]
  ```

### 可取消代理

* `Proxy.revovable(taregt, handler) `

* 返回值： `{ "proxy": proxy, "revoke": revoke }`

* proxy: 和用一般方式 new Proxy(target, handler)创建的代理对象没什么不同

* revoke: 撤销掉和它一起生成的那个代理对象

* 代码: 

  ```javascript
  var revocable = Proxy.revocable(
    {
      name: 'person',
    },
    {
      get(target, propertyKey, receiver) {
        return Reflect.get(target, propertyKey, receiver)
      },
    },
  )
  var proxy = revocable.proxy
  console.log('proxy.name:', proxy.name) // "person"
  
  revocable.revoke()
  console.log('typeof proxy', typeof proxy) // "object"，
  
  // TypeError: Cannot perform 'get' on a proxy that has been revoked
  console.log('proxy.name:', proxy.name)
  proxy.name = 1 // 还是 TypeError
  delete proxy.name // 又是 TypeError

### 代理模式

* 当不方便直接访问一个对象（被代理对象），提供另外一个对象（代理对象）来控制对这个对象的访问。代理对象对请求做出一些处理之后，再把请求转交给被代理对象

#### 场景1：代理-缓存

```javascript
function sum(a, b) {
  return a + b
}

function cacheProxy(fn) {
  var cache = Object.create(null)
  return function (...args) {
    const key = args.map((arg) => JSON.stringify(arg)).join('__')
    if (cache[key] != null) {
      console.log('cached:', cache[key])
      return cache[key]
    }
    const result = fn.apply(null, args)
    cache[key] = result
    console.log('no cache:', result)
    return result
  }
}

const proxySum = cacheProxy(sum)
proxySum(3, 5)
proxySum(3, 5)
```

#### 场景2：代理-校验

```javascript
function sum(num1, num2) {
  return num1 + num2
}

const proxySum = new Proxy(sum, {
  apply(target, thisArg, argumentsList) {
    const num1 = argumentsList[0]
    const num2 = argumentsList[1]

    if (typeof num1 !== 'number') {
      throw new TypeError('num1 must be a number')
    }
    if (typeof num2 !== 'number') {
      throw new TypeError('num2 must be a number')
    }
    return Reflect.apply(target, thisArg, argumentsList)
  },
})

console.log('3 + 9:', proxySum(3, 9))
console.log('3 + undefined:', proxySum(3))
```

### 代理 VS 装饰器

* 装饰器模式：装饰其能力，多个装饰，层层增加其能力
* 代理模式：控制器访问能力，隐藏底层操作的具体信息

## 04：基于proxy的不可变数据

### 可变数据

* 对象被赋值了几次后，更改了对象的某个属性，发现其被引用的对象也发生了变化。这就是可变对象

* 因为两个对象用的相同的引用地址

* 存在问题：除非你清楚的知道你要修改的 对象/属性 及其关联的对象，否则你很难发现它是何时被变化的

  ```javascript
  const test = { a:1 }
  const bar = test
  bar.a = 1 // test.a 也变为 2 
  ```

### 不可变数据

* Immutable Data(不可变数据)就是一旦创建，就不能被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象
* 实现原理就是使用旧数据创建新数据时，要保证旧数据可用且不变。同时为了避免 深度克隆，把所有节点都复制一遍带来的性能损耗，immutable 使用了结构共享，即如果对象树中一个结点发生变化，只修改这个节点和受它影响的父节点，其他节点则进行共享

### 不可变数据优点

* **保护数据，减少bug**：防止意外的更改，没有更改就没有伤害
* **方便跟踪数据变更，便于排错**：每次变更，都有变更前的数据和变更后的数据

### 实现不可变数据-方法

* 用专门独立的方法，去更改数据的属性

```javascript
function updateProperty(obj, key, value) {
  const newObj = {
    ...obj,
    [key]: value,
  }
  return newObj
}

var person = {
  name: 'person',
  age: 18,
}

const person1 = updateProperty(person, 'name', 'person 1')

console.log('person1.name:', person1.name)
console.log('person === person1', person === person1)
```

### 实现不可变数据-方法（缺点）

* 调用麻烦
* 没有面向对象编程的”气味“

### 实现不可变数据-定制对象

* 自定义新的对爱类型，把对数据的操作细节封装在新的对象类型上

  ```javascript
  class MyObject {
    constructor(obj = {}) {
      this.obj = { ...obj }
    }
  
    get(name) {
      return this.obj[name]
    }
  
    set(name, value) {
      return new MyObject({
        ...this.obj,
        [name]: value,
      })
    }
  }
  
  var person = new MyObject({
    name: 'person',
    age: 18,
  })
  
  const person1 = person.set('name', 'person 1')
  
  console.log('person1.name:', person1.get('name'))
  console.log('person === person1', person === person1)
  ```

#### 自定义对象库-immutableJS

> [https://immutable-js.com/](https://immutable-js.com/)

* 著名的 immutable-js，就是这个思路，定义 List Stack Map OrderedMap Set OrderedSet 和 Record 这么多对象

  ```javascript
  const { Map } = require('immutable');
  const map1 = Map({ a: 1, b: 2, c: 3 });
  const map2 = map1.set('b', 50);
  map1.get('b') + ' vs. ' + map2.get('b'); // 2 vs. 50
  ```

### 实现不可变数据-函数+复制的思路

* 通过函数调用，内部复制，产生新的对象

* 之后，你对新的对象操作

* 最后返回你的更新完毕的新对象

  ```javascript
  function produce(obj, recipe) {
    const newObj = { ...obj }
    recipe(newObj)
    return newObj
  }
  
  const person = {
    name: 'person',
    age: 21,
  }
  
  const person1 = produce(person, (draft) => {
    draft.name = 'person 1'
    draft.age = 10
  })
  
  console.log('person:', person) // person: { name: 'person', age: 21 }
  console.log('person1', person1) // person1 { name: 'person 1', age: 10 }
  console.log('person1 === person', person1 === person // person1 === person false
  ```

### 实现不可变数据-函数+复制的思路（性能问题）

* 假设 10000 个对象，每个 10个属性

* 深度复制，结果的消耗是 30多毫秒，2帧左右，这不能接受

  ````javascript
  const arr = Array.from({ length: 10000 }, (v, index) => {
    return {
      name: 'name' + index,
      age: ~~(Math.random() * 100),
      sex: ~~(Math.random() * 10) / 2,
      p4: Math.random(),
      p5: Math.random() + '',
      p6: Math.random(),
      p7: Math.random(),
      p8: Math.random(),
      p9: Math.random(),
      p10: Math.random() + '',
    }
  })
  
  function deepClone_JSON(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  
  function produce(obj, recipe) {
    console.time('deep clone')
    const newObj = deepClone_JSON(obj)
    console.timeEnd('deep clone')
    recipe(newObj)
    return newObj
  }
  
  console.time('produce')
  const arr1 = produce(arr, (draft) => {
    draft[500] = {}
    draft[500].name = 'tom'
  })
  console.timeEnd('produce')
  console.log('arr[500].name', arr[500].name)
  console.log('arr1[500].name', arr1[500].name)
  ````

  执行结果如下

  ```txt
  deep clone: 164.71ms
  produce: 168.182ms
  arr[500].name name500
  arr1[500].name tom
  ```

### 不可变对象-新思路

* 基于函数

* 利用 Proxy 代理，操作代理对象

* 关注被更改的数据，不可改的数据可以复用

  ```javascript
  const arr = Array.from({ length: 10000 }, (v, index) => {
    return {
      name: 'name' + index,
      age: ~~(Math.random() * 100),
      sex: ~~(Math.random() * 10) / 2,
      p4: Math.random(),
      p5: Math.random() + '',
      p6: Math.random(),
      p7: Math.random(),
      p8: Math.random(),
      p9: Math.random(),
      p10: Math.random() + '',
    }
  })
  
  function produce(obj, recipe) {
    const state = {
      base: obj, // 基础对象
      copy: {}, // 被更改后得数据
      draft: {}, // 代理信息
      currentKey: 0, // 当前操作的key
    }
  
    // 代理数据里面具体得某条数据得读写
    // arr[500].name
    const handlerItem = {
      get(target, property, receiver) {
        // 优先从copy里面读取
        if (state.copy[state.currentKey]) {
          return state.copy[state.currentKey][property]
        }
        // 从基础对象里面读取
        return state.base[state.currentKey][property]
      },
      set(target, property, value, receiver) {
        console.log('set:', property, value)
        return Reflect.set(state.copy[state.currentKey], property, value)
      },
    }
  
    // 代理数组得读写
    const handler = {
      get(target, property, receiver) {
        console.log('get:', property)
        state.currentKey = property
  
        // arr[500].name = x
        // 如果读取，就进一步代理某个具体的对象
        if (!state.draft[property]) {
          const val = { ...state.base[property] }
          const proxy = new Proxy(val, handlerItem)
          state.draft[property] = proxy
          state.copy[property] = val
        }
        return state.draft[property]
      },
      set(target, property, value, receiver) {
        console.log('set:', property, value)
        Reflect.set(state.copy, property, value)
        console.log('state.copy[property]', state.copy)
      },
    }
    const proxyObj = new Proxy(obj, handler)
    //传递代理对象出去
    recipe(proxyObj)
    return proxyObj
  }
  
  console.time('produce')
  const arr1 = produce(arr, (draft) => {
    //draft为代理对象
    draft[500] = {}
    draft[500].name = 'tom'
  })
  console.timeEnd('produce')
  
  console.log()
  console.log('arr[500].name', arr[500].name)
  console.log('arr1[500].name', arr1[500].name)
  ```

  执行结果如下

  ```txt
  set: 500 {}
  state.copy[property] { '500': {} }
  get: 500
  set: name tom
  produce: 9.123ms
  
  arr[500].name name500
  get: 500
  arr1[500].name tom
  ```

### 第三方库

* JavaScript 没有开箱即用的不可变结构，但是有第三方实现
* 最受欢迎的是 Immutable.js 和 immer.js

#### Immutable.js用法

```javascript

const { Map } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: { cd: 1 } });

//getIn
console.log("map1:", map1.getIn(['c', 'cd']));
//set
const map2 = map1.set('b', 50);
console.log("map2:", map2.toJS())
//setIn
const map3 = map1.setIn(["c", "cd"], 50);
console.log("map3:", map3.toJS())
```

#### immer.js 用法

```javascript
// import produce from "immer";

const immer = require('immer')
const { produce } = immer

const baseState = [
  {
    title: 'Learn TypeScript',
    done: true,
  },
  {
    title: 'Try Immer',
    done: false,
  },
]

const nextState = produce(baseState, (draft) => {
  draft[1].done = true
  draft.push({ title: 'Tweet about it' })
})

console.log('nextState:', nextState)
console.log('nextState==baseState:', nextState == baseState)
console.log('nextState[0]==baseState[0]:', nextState[0] == baseState[0])
```

#### Immutable.js VS immer.js

* Immutable.js 需要使用者学习它的数据结构操作方式，没有 immer 提供的使用原生对象的操作方式更简单、易用
* Immutable.js 它的操作结果需要通过 toJS 方法才能得到原生对象，这使得在操作一个对象的时候，时刻要注意操作的是原生对象还是 Immutable.js 的返回结果，稍不注意，就会产生意想不到的 bug、
* immer.js 体积小

### React 中的 state

* PureComponent 会在每次更新前做一次浅比较

  ```tsx
  import React, { PureComponent } from 'react'
  import TestItem from './TestItem'
  
  interface IState {
    listData: any[]
  }
  
  class TestDemo extends PureComponent<{}, IState> {
    constructor(props) {
      super(props)
      this.state = {
        listData: [
          { data: 1, id: 1, info: { test: 1 } },
          { data: 2, id: 1, info: { test: 2 } },
        ],
      }
    }
  
    changeList = () => {
      const { listData } = this.state
      const newListData = [...listData]
      console.log(newListData)
      newListData[0].info.test = 7
      this.setState({
        listData: newListData,
      })
    }
  
    render() {
      const { listData } = this.state
      console.log('listData：', listData)
      return (
        <div className='page1'>
          <button type='button' onClick={this.changeList}>
            改变数据
          </button>
          {listData.map((item, key) => (
            <TestItem key={item.data} data={item.info}></TestItem>
          ))}
        </div>
      )
    }
  }
  
  export default TestDemo
  ```

  ```tsx
  import React, { PureComponent } from 'react'
  
  interface IProps {
    data: any
  }
  
  class TestItem extends PureComponent<IProps> {
    render() {
      const { data } = this.props
      return <div>{data.test}</div>
    }
  }
  
  export default TestItem
  ```

### immer.js 在 React 的几个应用场景

* useState + Immer
* useImmer
* useReducer + Immer
* useImmerReducer
* Redux + Immer
