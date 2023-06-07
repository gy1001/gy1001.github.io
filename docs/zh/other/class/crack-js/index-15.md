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

