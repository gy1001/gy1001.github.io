# 03-对象认知升级

推荐文章

[浅析 JS 对象中的排序属性和常规属性、对象内属性、快属性和慢属性 ](https://www.cnblogs.com/goloving/p/7009388.html)

## 01: 通过普通属性，排序属性和隐藏类提升对象属性认知

### 属性遍历

```javascript
// 属性遍历
const obj = {}
obj.p1 = 'str1'
obj.p6 = 'str6'
obj.p2 = 'str2'
obj[1] = 'num1'
obj[6] = 'num6'
obj[2] = 'num2'
for (let p in obj) {
  console.log('property: ', obj[p])
}
```

在浏览器中的输出结果为

```text
property:  num1
property:  num2
property:  num6
property:  str1
property:  str6
property:  str2
```

### 这个例子我们能发现什么

- 两种属性：字符串作为键和数字作为键的属性
- 键属性被遍历的顺序似乎是有规律的

### 常规属性

- 键为字符串的属性
- 特点：根据创建时的顺序排序

### 排序属性

- 属性键为数字的属性
- 特点：按照索引值大小升序排序

### 思考

- 数字字符串属性时排序属性不？：：：是的
- 为什么要设计常规属性和排序属性
  - 提升属性的访问速度
  - 两种线性数据结构保存

### 对象内属性

- 何为对象内属性：被保存到对象自身的**常规属性**

- 内属性的数量

- 那些是属于对象内属性

- **不过对象内属性的数量是固定的，默认是 10 个，如果添加的属性超出了对象分配的空间，则它们将被保存在常规属性存储中。**

  ```javascript
  // 属性遍历
  function CustomObject(eCount, pCount) {
    for (let index = 0; index < eCount; index++) {
      this[index] = `e-${index}`
    }
    // 添加常规属性
    for (let index = 0; index < eCount; index++) {
      this[`p-${index}`] = `p-${index}`
    }
  }
  ```

  ```javascript
  // 排序属性6 普通属性 6个
  var obj = new CustomObject(6, 6)
  ```

  运行这段 js 代码至浏览器中，我们查看浏览器的开发工具中的`Memory`选项中的`Take head snapshop`,打开快照，搜索`CustomObject`，可以看到如下内容(在 10 个以内直接挂载在对象属性身上)

  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4be9f58700b441d2972bdcb5c388b572~tplv-k3u1fbpfcp-watermark.image?)

  ```javascript
  // 排序属性6 普通属性 16个
  var obj = new CustomObject(6, 16)
  ```

  超过 10 个，新增加 properties 属性，并放置多余的

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f02fe783aff429186cdabfbe1bd2792~tplv-k3u1fbpfcp-watermark.image?)

  ```javascript
  // 排序属性6 普通属性 50个
  var obj = new CustomObject(6, 50)
  ```

  增加至 50 个时，

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c036e5a7af074dd7aa92bf9de5ab18a0~tplv-k3u1fbpfcp-watermark.image?)

### 隐藏类

- 什么是隐藏类
- 隐藏类的作用
- 怎么查看隐藏类

### 守护隐藏类

- 初始化时保持属性顺序一致
- 一次性初始化完毕
- 谨慎使用 delete

### （赋值 VS delete）排序属性和普通属性

- 100000 个对象，25 个普通属性，delete or 赋值快 ？：赋值快
- 100000 个对象，25 个排序属性，delete or 赋值快 ？：赋值快

### v8 原理——对象的存储和访问

V8 实现对象存储时，并没有完全采用字典的存储方式，这主要是出于性能的考量。 因为字典是非线性的数据结构，查询效率会低于线性的数据结构，V8 为了提升存储和查找 效率，采用了一套复杂的存储策略。

1、把对象中的数字属性称为**排序属性**，在 V8 中被称为 **elements**。 数字属性应该按照**索引值大小升序排列**

2、字符串属性就被称为**常规属性**，在 V8 中被称为 **properties**，字符串属性根据**创建时的顺序升序排列**

3、两个属性都有时，排序属性先于常规属性。

4、在 V8 内部，为了有效地提升存储和访问这两种属性的性能，分别使用了两个**线性数据结构**来分别保存排序属性和常规属性。

分解成这两种线性数据结构之后，如果执行索引操作，那么 V8 会先从 elements 属性中按照顺序读取所有的元素，然后再在 properties 属性中读取所有的元素，这样就完成一次索引操作。

5、对象内属性，将部分常规属性直接存储到对象本身， 对象内属性的数量是固定的，默认是 10 个，如果添加的属性超出了对象分配的空间， 则它们将被保存在常规属性存储中。

6、如果对象中的属性过多时，或者存在反复添加或者删除属性的操作，那么 V8 就会将线性的存储模式降级为非线性的字典存储模式，这样虽然降低了查找速度，但是却提升了修改对象属性的速度。

## 02：必须知识：属性描述符，属性冻结等

### 属性来源

- 静态属性：例如：Object.assign
- 原型属性：例如：Object.prototype.toString
- 实例属性，例如：function Person(name){ this.name = name }

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName = () => {
    return this.name
  }
  getAge() {
    return this.age
  }
}
const hasOwn = Object.hasOwnProperty
const print = console.log
const person = new Person()
print('getName: ', hasOwn.call(person, 'getName')) // getName: true
print('getAge: ', hasOwn.call(person, 'getAge')) // getAge: false

// getName 是实例属性
// getAge 是原型属性
```

使用 [Babel 编译](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.21.9&externalPlugins=&assumptions=%7B%7D) (编译选项 TARGETS 选择 ie 9)把上述代码编译，结果如下

```javascript
function _typeof(obj) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }),
    _typeof(obj)
  )
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key)
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string')
  return _typeof(key) === 'symbol' ? key : String(key)
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input
  var prim = input[Symbol.toPrimitive]
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default')
    if (_typeof(res) !== 'object') return res
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (hint === 'string' ? String : Number)(input)
}
var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    var _this = this
    _classCallCheck(this, Person)
    _defineProperty(this, 'getName', function () {
      return _this.name
    })
    this.name = name
    this.age = age
  }
  _createClass(Person, [
    {
      key: 'getAge',
      value: function getAge() {
        return this.age
      },
    },
  ])
  return Person
})()
```

从上述代码中可以看到，getAge 是 挂载在 Person 上，而 getName 是挂载在 this 上

### 属性描述符

- 设置属性描述符：
  - Object.defineProperty
  - Object.defineproperties
- 获取属性描述符
  - Object.getOwnPropertyDescriptor
  - Object.getOwnPropertyDescriptors
- 属性相关
  - configurable: 是否可配置
  - enumerable: 是否可枚举
  - value: 值
  - writable: 是否可以被更改
  - get: 访问器函数
  - set: 访问器函数
- 又分为
  - 数据属性: value + writable + configurable + enumerable
  - 访问器属性: get + set + configurable + enumerable

#### 属性描述符：注意事项

- 有趣的默认值：

  ```text
  {
  	value: undefined,
  	writable: false,
  	enumerable: false,
  	configurable: false
  }
  ```

  ```javascript
  const obj = {}
  Object.defineProperty(obj, 'name', {})
  obj.name = 1
  console.log(obj.name) // undefined
  console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
  // { "writable": false, "enumerable": false, "configurable": false }
  ```

- configurable 的小意外？（demo): writable 的状态值可由 true 改为 false

  ```javascript
  const obj = {}
  Object.defineProperty(obj, 'name', {
    writable: true,
    configurable: false,
  })
  // 尝试修改描述信息
  Object.defineProperty(obj, 'name', {
    writable: false,
  })
  // 读取信息
  console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
  // { "writable": false, "enumerable": false, "configurable": false }

  // 这里由 true 改为 false 成功了
  当 configurable 为 false，且 writable 为 false 时，调用 Object.defineProperty()方法修改 writable 为 true 时会报错。
  当 configurable 为 false，且 writable 为 true 时，调用 Object.defineProperty() 方法修改 writable 为 false 时会修改成功，不会报错。

  ```

  ```javascript
  const obj = {}
  Object.defineProperty(obj, 'name', {
    value: 1,
    writable: true,
    configurable: false,
  })
  // 尝试修改描述信息
  Object.defineProperty(obj, 'name', {
    value: 2,
  })
  // 读取信息
  console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
  // { value: 2, writable: true, enumerable: false, configurable: false }
  ```

  ```javascript
  const obj = {}
  Object.defineProperty(obj, 'name', {
    value: 1,
    writable: false,
    configurable: false,
  })
  // 尝试修改描述信息
  Object.defineProperty(obj, 'name', {
    value: 2,
  })
  // 报错
  // demo.js:76 Uncaught TypeError: Cannot redefine property: name
  ```

  对于上述问题，我们查看[https://tc39.es/ecma262/#sec-property-attributes](https://tc39.es/ecma262/#sec-property-attributes) 可以看到如下内容

| [[Configurable]] | [data property](https://tc39.es/ecma262/#sec-object-type) or [accessor property](https://tc39.es/ecma262/#sec-object-type) | a Boolean | false | If false, attempts to delete the property, change it from a [data property](https://tc39.es/ecma262/#sec-object-type) to an [accessor property](https://tc39.es/ecma262/#sec-object-type) or from an [accessor property](https://tc39.es/ecma262/#sec-object-type) to a [data property](https://tc39.es/ecma262/#sec-object-type), or make any changes to its attributes (other than replacing an existing [[Value]] or setting [[Writable]] to false) will fail. |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                  |                                                                                                                            |           |       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Object.defineProperty 缺点

- **Object.defineProperty** 虽然能监听到数组索引值的变化，但是却监听不到数组的增加或删除的。
- 只能劫持对象的属性，因为我们需要对每个对象的每个属性进行遍历。如果属性也是对象，还得进行递归。

### 对象的可扩展--Object.preventExtensions

- Object.preventExtensions: 对象变的不可扩展，也就是永远不能再添加新的属性
- Object.isExtensible: 判断一个对象是否是可扩展

### 对象的封闭-Object.seal

- Object.seal: 阻止添加新属性 + **属性标记为不可配置**
- Object.isSealed: 检查一个对象是否被封闭

### 对象的冻结--Object.freeze

- Object.freeze: 不添加新属性 + 不可配置 + 不能修改值
- Object.isFrozen: 检查一个对象是否被冻结

### 总结

| 方法                     | 新增属性 | 修改描述符            | 删除属性 | 更改属性值 |
| ------------------------ | -------- | --------------------- | -------- | ---------- |
| Object.preventExtensions | 否       | 可                    | 可       | 可         |
| Object.seal              | 否       | 否（writable 有例外） | 否       | 可         |
| Object.freeze            | 否       | 否（writable 有例外） | 否       | 否         |

## 03：8+种姿势访问原型

### prototype

- prototype 是一个对象
- 原型会形成原型链，原型链上查找属性比较耗时，访问不存在的属性会访问整个原型链

### 两个问题

- class 的 ES5 实现？

  ```javascript
  // Es6的 class
  class Person {
    // 私有属性
    #canTalk = true
    // 静态属性
    static isAnimal = true

    constructor(name, age) {
      // 实例属性
      this.name = name
      // 实例属性
      this.age = age
    }
    // 原型属性
    sayName() {
      console.log(this.name)
    }
  }
  ```

  使用 [babel 在线转译](https://babeljs.io/repl#?browsers=ie%209%0A&build=&builtIns=usage&corejs=3.21&spec=false&loose=false&code_lz=MYewdgzgLgBAhgJwTAvDA2mApgdxgBQRAFsBLCLACkoEpUA-GAbwF8aAaGbPQk8q2g2ZsAugCgxiBADpicAA7VSULMTopGTMQEhQkEABss0gyADmlZappi2E4AbgQIBLAgjhmOiHACeYOGIqOi1tbQQsKABXBDAYAHIAoPidFlsxADdEGAArEAALOLRuV3dwWjE9DyMTc0o8wpsgA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=unambiguous&lineWrap=true&presets=env%2Creact&prettier=true&targets=&version=7.21.9&externalPlugins=babel-plugin-runtime%401.0.7&assumptions=%7B%7D)--配置 TARGETS 为 ie 9,内容如下

  ```javascript
  'use strict'

  function _typeof(obj) {
    '@babel/helpers - typeof'
    return (
      (_typeof =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (obj) {
              return typeof obj
            }
          : function (obj) {
              return obj &&
                'function' == typeof Symbol &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }),
      _typeof(obj)
    )
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    Object.defineProperty(Constructor, 'prototype', { writable: false })
    return Constructor
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key)
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      obj[key] = value
    }
    return obj
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, 'string')
    return _typeof(key) === 'symbol' ? key : String(key)
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== 'object' || input === null) return input
    var prim = input[Symbol.toPrimitive]
    if (prim !== undefined) {
      var res = prim.call(input, hint || 'default')
      if (_typeof(res) !== 'object') return res
      throw new TypeError('@@toPrimitive must return a primitive value.')
    }
    return (hint === 'string' ? String : Number)(input)
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap)
    privateMap.set(obj, value)
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError(
        'Cannot initialize the same private elements twice on an object',
      )
    }
  }
  var _canTalk = /*#__PURE__*/ new WeakMap()
  var Person = /*#__PURE__*/ (function () {
    function Person(name, age) {
      _classCallCheck(this, Person)
      // 私有属性
      _classPrivateFieldInitSpec(this, _canTalk, {
        writable: true,
        value: true,
      })
      // 实例属性
      this.name = name
      // 实例属性
      this.age = age
    }
    // 原型属性
    _createClass(Person, [
      {
        key: 'sayName',
        value: function sayName() {
          console.log(this.name)
        },
      },
    ])
    return Person
  })()
  // 静态属性
  _defineProperty(Person, 'isAnimal', true)
  ```

- toString 的怪异现象:

  > 查看 ecma 协议：[https://tc39.es/ecma262/#sec-object.prototype.tostring](https://tc39.es/ecma262/#sec-object.prototype.tostring)
  >
  > 可以看到如下
  >
  > Else if O has a [[BooleanData]] internal slot, let builtinTag be "Boolean".

  ```javascript
  const proto = Boolean.prototype
  console.log(typeof proto) // object
  console.log(Object.prototype.toString.call(proto)) // [object Boolean]
  ```

### \_\_prot\_\_

- 构造函数的原型，null 以外的对象具有 \_\_proto\_\_属性

- Fucntion, class 的实例有 prototype 以及 \_\_proto\_\_属性

- 普通函数，祖上第三代必为 null

  ```javascript
  // 普通函数
  function a() {}
  console.log(a.__proto__.__proto__.__proto__) // null

  // 作为构造函数
  function Person() {}
  var person = new Person()
  console.log(person.__proto__.__proto__.__proto__) // null
  ```

### 两个思考题

- \_\_proto\_\_是实例对象的自身属性还是原型上属性：是原型上的属性
- 普通对象祖上第几代\_\_proto\_\_是 null: 两代

### instanceof

- 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

- 手写 instanceof

  ```javascript
  // 参数： instance： 实例 cclass: 构造函数
  function instanceOf(instance, cclass) {
    let proto = instance.__proto__
    let prototype = cclass.prototype
    while (proto) {
      if (proto === prototype) return true
      proto = proto.__proto__
    }
    return false
  }

  class Parent {}
  class Child extends Parent {}
  class CChild extends Child {}
  class Luren {}
  const cchild = new CChild()

  console.log(instanceOf(cchild, Parent)) // true
  console.log(instanceOf(cchild, Child)) // true
  console.log(instanceOf(cchild, CChild)) // true
  console.log(instanceOf(cchild, Object)) // true
  console.log(instanceOf(cchild, Date)) // false
  console.log(instanceOf(cchild, Luren)) // false
  ```

- Object instanceof Function, Function instanceof Object

  ```javascript
  Object instanceof Function // true
  Function instanceof Object // true
  ```

  注意以下代码

  ```javascript
  const getType = (val) => Object.prototype.toString.call(val)
  function getPrototypeChains(instance) {
    const chains = []
    let proto = instance.__proto__
    chains.push(getType(proto))
    while (proto) {
      proto = proto.__proto__
      chains.push(getType(proto))
    }
    return chains
  }

  console.log(getPrototypeChains(Function)) // ['[object Function]', '[object Object]', '[object Null]']
  console.log(getPrototypeChains(Object)) // ['[object Function]', '[object Object]', '[object Null]']
  ```

### getPrototypeOf

- 返回对象的原型
- Object.getPrototypeof Reflect.getPrototypeOf
- 内部先 toObject 转换，注意 null、undefined

### setPrototypeOf

- 指定对象的原型
- Object.setPrototypeOf Reflect.setPrototypeOf
- **原型的尽头是 null**

### isPrototypeOf

- 一个对象是否存在另一个对象的原型链上
- Object.isPrototypeof Object.prototype.isPrototypeOf Reflect.isPrototypeOf Function.isPrototypeOf

```javascript
console.log(Object.isPrototypeOf({})) // false
console.log(Object.prototype.isPrototypeOf({})) // true
console.log(Reflect.isPrototypeOf({})) // false
console.log(Function.isPrototypeOf({})) // false
```

### 其他

- Object.create

### 总结

| 方法          | 作用                                                                    | 重点和注意事项                                                                       |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| prototype     | 获取对象原型                                                            | 1. class ES6 转 ES5 基于 protortype<br />2. toString.call 的怪异现象\                |
| \_\_proto\_\_ | 构造函数的原型                                                          | 1. 函数祖上第三代\_\_proto\_\_是 null<br />2. 普通对象祖上第二代\_\_proto\_\_是 null |
| instanceof    | 构造函数（右侧）的 prototype 属性是否出现在某个实例对象(左侧)的原型链上 | 1. Object instanceof Fucntion<br />2. Function instanceof Function                   |
| getPrototype  | 获取对象的原型                                                          | null 和 undefined 没有原型                                                           |
| setPrototype  | 设置对象的原型                                                          | null 可以作为第二个参数，原型的尽头是 null                                           |
| Object.create | 使用现有的对象来提供新创建的对象的\_\_proto\_\_                         | 创建纯净对象                                                                         |

## 04：对象的属性遍历，你真的了解吗？

### 属性的类型

- 普通属性
- 不可枚举的属性
- 原型属性
- Symbol 属性
- 静态属性 ？？

### 总结

| 方法名                       | 普通属性 | 不可枚举属性 | Symbol 属性 | 原型属性 |
| ---------------------------- | -------- | ------------ | ----------- | -------- |
| for in                       | 可       | 不可         | 不可        | 可       |
| Object.keys                  | 可       | 不可         | 不可        | 不可     |
| Object.getOwnPropertyNames   | 可       | 可           | 不可        | 不可     |
| Object.getOwnPropertySymbols | 不可     | 可           | 可          | 不可     |
| Reflect.ownKeys              | 可       | 可           | 可          | 不可     |

### 获取对象的全部静态属性

- 不要被静态属性舞误导
- Reflect.ownKeys = Object.getOwnPropertyNames + Object.getOwnPropertySymbols

```javascript
const symbolSay = Symbol.for('say1')
class Person {
  static flag = '人'
  static getFlag() {
    return Person.flag
  }
  static [Symbol.for('symbolPro')]() {
    return 'symbolPro'
  }
  constructor(name) {
    this.name = name
    this[symbolSay] = 'haha'
  }
  getName() {
    return this.name
  }
  getAge = () => {
    return 15
  }
}
```

#### 使用 Reflect.ownKeys

```javascript
// 使用 Reflect.ownKeys
function getOwnPropertyStatics(_obj) {
  const KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
  }
  let result = []

  const keys = Reflect.ownKeys(_obj)
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (!KNOWN_STATICS[key]) {
      result.push(key)
    }
  }
  return result
}

console.log(getOwnPropertyStatics(Person)) // ['getFlag', 'flag', Symbol(symbolPro)]
```

#### 使用 Object.getOwnPropertyNames + Object.getOwnPropertySymbols

```javascript
function getOwnPropertyStatics(_obj) {
  const KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
  }
  let result = []

  // const keys = Reflect.ownKeys(_obj)
  const keys = Object.getOwnPropertyNames(_obj).concat(
    Object.getOwnPropertySymbols(_obj),
  )
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (!KNOWN_STATICS[key]) {
      result.push(key)
    }
  }
  return result
}

console.log(getOwnPropertyStatics(Person)) // ['getFlag', 'flag', Symbol(symbolPro)]
```

### 获取原型上的所有属性

- 递归
- 剔除内置属性

```javascript
// 下面没有剔除内置属性
class Grand {
  gName = 'Grand'
  gGetName() {
    return this.gName
  }
}
Grand.prototype[Symbol.for('gAge')] = 'G-12'

class Parent extends Grand {
  pName = '123'
  pGetName() {
    return this.pName
  }
}
Parent.prototype[Symbol.for('pAge')] = 'G-11'

class Child extends Parent {
  cName = '123'
  cGetName() {
    return this.cName
  }
}
const child = new Child()

const result = []
function logAllProperties(instance) {
  if (instance == null) {
    return
  }
  let proto = instance.__proto__
  while (proto) {
    result.push(...Reflect.ownKeys(proto))
    proto = proto.__proto__
  }
}
logAllProperties(child)
console.log('result == ', result)
//  ['constructor', 'cGetName', 'constructor', 'pGetName', Symbol(pAge), 'constructor', 'gGetName', Symbol(gAge), 'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString']
```

### 获取所有不可枚举的属性

- 如何知道某个属性不可枚举？
- 考虑不考虑原型上的不可枚举属性？

```javascript
// 这里暂不考虑原型上的不可枚举属性
const symbolIsAnimal = Symbol.for('pro_symbol_attr_isAnimal')
const symbolSay = Symbol.for('pro_symbol_method_say')
const symbolSalary = Symbol.for('ins_symbol_attr_salary')

function Person(age, name) {
  this.ins_in_attr_age = age
  this.ins_in_attr_name = name

  this.ins_in_method_walk = function () {
    console.log('ins_method_walk')
  }
}

// 原型方法
Person.prototype.pro_method_say = function (words) {
  console.log('pro_method_say:', words)
}
Person.prototype[symbolSay] = function (words) {
  console.log('pro_symbol_method_say', words)
}

// 原型属性
Person.prototype[symbolIsAnimal] = true
Person.prototype.pro_attr_isAnimal = true

const person = new Person(100, '程序员')

//Symbol 属性
person[symbolSalary] = 6000
person['ins_no_enumerable_attr_sex'] = '男'

// sex 不可枚举
Object.defineProperty(person, 'ins_no_enumerable_attr_sex', {
  enumerable: false,
})

Object.defineProperty(person, symbolSalary, {
  enumerable: false,
  value: 999,
})

//
function getNoEnumerable(_obj) {
  //获取原型对象
  const keys = Reflect.ownKeys(_obj)
  // const result = keys.filter(key=> {
  //     return !Object.getOwnPropertyDescriptor(_obj, key).enumerable
  // })
  // return result;

  const result = keys.filter((key) => {
    return !Object.prototype.propertyIsEnumerable.call(_obj, key)
  })
  return result
}

console.log(getNoEnumerable(person))
```

## 05：对象的隐式类型转换和注意事项

### 显式类型转换

- 显式转换：主要通过 JS 定义的转换方法进行转换
- String、Object 等
- parseInt、parstFloat 等
- 显式调用 toString 等

### 隐式转换

- 隐式转换：编译器自动完成类型转换的方式就称为隐式转换
- 总是**期望**返回基本类型值

### 什么时候会发生隐式类型转换

- 二元 + 运算符

- 关系运算符：< > <= >= ==

- 逻辑：！ if/while 三目条件

- 属性遍历：for in 等

- 模板字符串

  ```javascript
  const obj = {
    value: 10,
    toString: function () {
      return this.value + 10
    },
    valueOf: function () {
      return this.value
    },
  }

  obj[obj] = obj.value

  console.log('keys:', Object.keys(obj))
  console.log('${obj}:', `${obj}`)
  console.log('obj + 1:', obj + 1)
  console.log('obj + "":', obj + '')

  // 输出如下内容
  keys: [ '20', 'value', 'toString', 'valueOf' ]
  ${obj}: 20
  obj + 1: 11
  obj + "": 10
  ```

### 对象隐式转换三大扛把子

- Symbol.toPrimitive
- Object.prototype.valueOf
- Object.prototype.toString

### 对象隐式转换规则

- 如果 【Symbol.toPrimitive】(hint)方法存在，优先调用，无视 valueOf 和 toString 方法

- 否则，如果期望是 "string" ----- 优先调用 obj.toString() 如果返回不是原始值，继续调用 obj.valueOf()

- 否则，如果期望是 number 或者 default ------ 先调用 obj.valueOf() 如果返回不是原始值，继续调用 obj.toString()

  ```javascript
  const obj = {
    [Symbol.toPrimitive](hint) {
      if (hint == 'number') {
        return 10
      }
      if (hint == 'string') {
        return 'hello'
      }
      return true
    },
  }

  console.log(+obj) // 10      -- hint 参数值是 "number"
  console.log(`${obj}`) // "hello" -- hint 参数值是 "string"
  console.log(obj + '') // "true"  -- hint 参数值是 "default"
  ```

### 提个问题

- 如果未定义 【Symbol.toPrimitive】,期望是 string, toString 和 valueOf 都没有返回原始值:: 报错异常

```javascript
const obj = {
  value: 10,
  valueOf() {
    return this
  },
  toString() {
    return this
  },
}

console.log(10 + obj) // TypeError: Cannot convert object to primitive value
```

### Symbol.toPrimitive(hint)

- hint - "string"
- hint - "number"
- hint - "default"

### hint - string

- window.alert(obj)
- 模板字符串`${obj}`
- test[obj] = 123

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10
    }
    if (hint == 'string') {
      return 'hello'
    }
    return true
  },
}
// alert, 浏览器
// window.alert(obj);
// ${}
console.log(`${obj}`) // hello
// 属性键
obj[obj] = 123
console.log(Object.keys(obj)) // [ 'hello' ]
```

### hint - number

- 一元 + ， 位移
- \- \* / 关系运算
- Math.pow String.prototype.slice 等很多内部方法

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10
    }
    if (hint == 'string') {
      return 'hello'
    }
    return true
  },
}

// 一元+
console.log('一元+:', +obj) // 一元+: 10

// 位移运算符
console.log('位移运算符', obj >> 0) // 位移运算符 10

//除减算法, 没有 + 法，之前已经单独说过转换规则
console.log('减法:', 5 - obj) // 减法: -5
console.log('乘法:', 5 * obj) // 乘法: 50
console.log('除法:', 5 / obj) // 除法: 0.5

//逻辑 大于，小于，大于等于, 没有等于， 有自己的一套规则
console.log('大于:', 5 > obj) // 大于: false
console.log('大于等于:', 5 >= obj) // 大于等于: false

// 其他期望是整数的方法
console.log('Math.pow:', Math.pow(2, obj)) // Math.pow: 1024
```

### hint-default

- 二元 +
- == !=

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10
    }
    if (hint == 'string') {
      return 'hello'
    }
    return true
  },
}

console.log('相加:', 5 + obj) // 相加: 6
console.log('等等与:', 5 == obj) // 等等与: false
console.log('不等于:', 5 != obj) // 不等于: true
```

### valueOf

```javascript
// Array
let arr = [1, 2, 5]
// Object
let user = {
  name: 'Jason',
  age: 24,
}
// Date 返回时间撮
let now = new Date()
// Function
function fun() {
  return 10
}

console.log('Array:', arr.valueOf()) // Array: [ 1, 2, 5 ]
console.log('Object:', user.valueOf()) // Object: { name: 'Jason', age: 24 }
console.log('Date:', now.valueOf()) // Date: 1684893505844
console.log('Function:', fun.valueOf()) // Function: [Function: fun]
```

### toString

```javascript
// Array
let arr = [1, 2, 5]
// Object
let user = {
  name: 'Jason',
  age: 24,
}

//Date
let now = new Date()

// Function
function fun() {
  return 10
}
console.log('Array:', arr.toString()) // Array: 1,2,5
console.log('Object:', user.toString()) // Object: [object Object]
console.log('Date:', now.toString()) // Date: Wed May 24 2023 09:59:27 GMT+0800 (China Standard Time)
console.log('Function:', fun.toString()) //  Function: function fun() { return 10 }

// hint 是  default， valueOf => toString
console.log(1 + now) // 1Wed May 24 2023 09:59:27 GMT+0800 (China Standard Time)
```

### 误区：

- === !== 是否会触发隐式转换：不会
- == != 宽松比较是否触发隐式转换：也不一定，两个对象进行比较时是进行严格等判断的，其他情况下会触发隐式转换

```javascript
const obj1 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10
    }
    if (hint == 'string') {
      return 'hello'
    }
    return true
  },
}

const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10
    }
    if (hint == 'string') {
      return 'hello'
    }
    return true
  },
}

console.log('宽松比较: 对象和数字', obj1 == true) // 宽松比较: 对象和数字 true
console.log('宽松比较 两个对象:', obj1 == obj2) // 宽松比较 两个对象: false
console.log('严等:', obj1 === obj2) // 严等: false
console.log('不等:', obj1 != obj2) // 不等: true
```

```javascript
const user = {
  name: 'John',
  age: 10,
  toString() {
    return this.name
  },
  valueOf() {
    return this.age
  },
}

console.log('user:', +user) //  user: 10
console.log('user:', `${user}`) // user: John
```

```javascript
const user = {
  name: 'John',
  age: 10,
  toString() {
    return this.name
  },
  valueOf() {
    // return this.age
    return this
  },
}

console.log('user:', +user) //  user: NaN
console.log('user:', `${user}`) // user: John
```

```javascript
const user = {
  name: 'John',
  age: 10,
  toString() {
    return this.name
  },
}
console.log('user:', +user) // user: NaN
```

```javascript
const user = {
  name: 'John',
  age: 10,
  toString() {
    // return this.name
    return this
  },
}

console.log('user:', `${user}`)
// TypeError: Cannot convert object to primitive value
```

```javascript
const user = {
  name: 'John',
  age: 10,
  // toString() {
  //     // return this.name;
  //     return this;
  // },
  valueOf() {
    return this.age
  },
}
// 这是以为自身没有 toString 方法，原型上还有
console.log('user:', `${user}`) //  user: [object Object]
```

```javascript
const user = {
  name: 'John',
  age: 10,
  // toString() {
  //     // return this.name;
  //     return this;
  // },
  valueOf() {
    return this.age
  },
}
// 消除原型上的 toString
Object.prototype.toString = undefined
console.log('user:', `${user}`) // user: 10
```

### 特殊的 Date

- hint 是 default, 是**优先调用的 toString, 然后调用 valueOf**

```javascript
const date = new Date()

console.log('date toString:', date.toString())
// date toString: Wed May 24 2023 10:29:08 GMT+0800 (China Standard Time)

console.log('date valueOf:', date.valueOf())
// date valueOf: 1684895455945

console.log(`date number:`, +date)
// date number: 1684895455945

console.log(`date str:`, `${date}`)
// date str: Wed May 24 2023 10:30:55 GMT+0800 (China Standard Time)

console.log(`date +:`, date + 1)
// date +: Wed May 24 2023 10:30:55 GMT+0800 (China Standard Time)1
```

### 练习题一

```javascript
const arr = [4, 10]
arr[Symbol.toPrimitive] = function (hint) {
  return hint
}
arr.valueOf = function () {
  return this
}

const obj = {}

console.log(+arr + obj + arr + obj)
// NaN[object Object]default[object Object]
console.log(NaN + obj)
// NaN[object Object]

console.log({} + arr)
// [object Object]default
```

### 练习题二

> 注意：这里一个是对象和对象比较，一个是对象 和 原始值比较

```javascript
const val = [] == ![]

;([+val, [] + 1] ==
  [1, 1] +
    [][
      // [1, '1'] == [1, 1] + ''
      // '1, 1'

      (+val, [] + 1)
    ]) ==
  [1, '1']
// [1, '1']  == [1, '1']

console.log([+val, [] + 1] == [1, '1']) // false
console.log([+val, [] + 1] == [1, 1] + []) // true
```

## 06: 吃透 JSON 和 toJSON，互相转换不再是问题

### JSON 对象

- 严格意义上 JSON 对象是不合理的，JSON 是文本协议
- 全局作用域下 JSON， 名为 JSON，是 Object 对象

### 一个问题

```javascript
// 它是 JSON 对象吗 ？？
var obj = {
  name: 'tom',
  [Symbol.for('sex')]: 1,
}

// 答案：它不是，它是一个对象字面量
```

### JSON 格式

- JSON 是一种轻量级的、基于文本的、与语言无关的语法，用于定义数据交换格式
- 它来源于 ECMAScript 编程语言，但是独立于编程语言

### 对象字面量

- 是创建对象的一种快捷方式，英文名：object literal
- 对应还有：函数字面量，数字字面量等
- 字面量的性能是优于使用 new 构建

### JSON 特征

- JSON 就是一种字符串，使用特定的符号标注
- {} 双括号表示对象
- [] 中括号表示数组
- "" 双引号表示属性键或者值

### JSON 键

- 只能是字符串
- 必须使用双引号包裹

### JOSN 值

必须是 object、array number string true false null

最后一行不能添加逗号 ,

### 合格的 JSON

```javascript
;`["你", "我", "她"]``{ "name": "帅哥", "age": 12 }``{ "IDS": ["123", "456"] }``{ "name": null }``{}``[]`
```

### 不合格的 JSON

```javascript
;`
{
    "name":"帅哥",
    [Symbol.for("sex")]: 1  // 键只能是字符串，这里不是
}``
{ 
  name: "帅哥", // 键只能是字符串，这里不是
  'age': 32    // 键必须使用双引号，这里不是
} ``
{
    "name": "帅哥",
    "age": undefined  // undefined 这个值在 json 中不允许，可以是 "undefined"
}``[-10, 0xDDFF]` // 只允许十进制，且没有键或者值
`
{ 
  "name": "牙膏",
  "created": new Date(),   // 值不能是 Date 类型
  "price": 18
  "getPrice": function() { // 值不能是函数类型
      return this.price;
  }
}``
{
   "name":"帅哥",
   "age": 32,  // 最后一个属性不能有逗号
}
`
```

### JSON.parse

- 注意：第二个参数函数 reciver(k, v) 如果返回 undefined 会被忽略这个属性

  ```javascript
  const jsonStr = `
  	{ 
    	"name": "帅哥", 
    	"age":  18, 
      "isFans": true,
      "IDCard": "xxxxxxxxxxxxxxxxxx"
     }
  `
  // 保密身份证
  var obj = JSON.parse(jsonStr, function (key, value) {
    if (key == 'IDCard') {
      return undefined
    } else {
      return value
    }
  })

  console.log(obj) // { name: '帅哥', age: 18, isFans: true }
  ```

- 注意：遍历的顺序

  ```javascript
  var jsonStr = `{
      "name": "牙膏",
      "count": 10, 
      "orderDetail": {
          "createTime": 1632996519781,
          "orderId": 8632996519781,
          "more": {
              "desc": "描述"
          }
      }
  }`

  JSON.parse(jsonStr, function (k, v) {
    console.log('key:', k)
    return v
  })
  // key: name
  // key: count
  // key: createTime
  // key: orderId
  // key: desc
  // key: more
  // key: orderDetail
  // key:
  ```

- 注意：this

  ```javascript
  // this
  var jsonStr = `{
      "name": "牙膏",
      "count": 10, 
      "orderDetail": {
          "createTime": 1632996519781,
          "orderId": 8632996519781
      }
  }`

  JSON.parse(jsonStr, function (k, v) {
    console.log('key:', k, ',this:', this)
    return v
  })
  /*
  key: name ,this: {
    name: '牙膏',
    count: 10,
    orderDetail: { createTime: 1632996519781, orderId: 8632996519781 }
  }
  key: count ,this: {
    name: '牙膏',
    count: 10,
    orderDetail: { createTime: 1632996519781, orderId: 8632996519781 }
  }
  key: createTime ,this: { createTime: 1632996519781, orderId: 8632996519781 }
  key: orderId ,this: { createTime: 1632996519781, orderId: 8632996519781 }
  key: orderDetail ,this: {
    name: '牙膏',
    count: 10,
    orderDetail: { createTime: 1632996519781, orderId: 8632996519781 }
  }
  key:  ,this: {
    '': {
      name: '牙膏',
      count: 10,
      orderDetail: { createTime: 1632996519781, orderId: 8632996519781 }
    }
  }
  
  */
  ```

### JOSN.stringfy()

- 语法：JSON.stringify(value, [, replacer [, space]])
- 第二个参数 replacer: 过滤属性或者处理值
- 第三个参数 space: 空格，美化输出格式

### JOSN.stringfy() 第二个参数 replacer

- 如果该参数是一个函数：则在序列化过程中，被序列化的值的每个属性都会讲过该函数的转换和处理
- 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中
- 如果该参数为 null 或者未提供，则对象所有的属性都会被序列化

```javascript
//replacer 方法
var person = {
  name: '帅哥',
  age: 45,
  birth: '1990-01-01',
}
var jsonString = JSON.stringify(person, function (key, value) {
  if (typeof value === 'string') {
    return undefined
  }
  return value
})

console.log(jsonString) // {"age":45}

var person = {
  name: '帅哥',
  age: 45,
  birth: '1990-01-01',
}

//replacer 数组
console.log(JSON.stringify(person, ['name', 'age'])) // { "name": "帅哥","age": 45 }
```

### JSON.stringify() 第三个参数 space

- 如果参数是个数字，他代表有多少的空格；上限为 10，该值若小于 1，则意味着没有空格
- 如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格
- 如果该参数没有提供：(或者为 null), 将没有空格

```javascript
//space 美化格式
var person = {
  name: '帅哥',
  age: 45,
  birth: '1990-01-01',
}
const a = JSON.stringify(person)
console.log(a) // {"name":"帅哥","age":45,"birth":"1990-01-01"}

var person = {
  name: '帅哥',
  age: 45,
  birth: '1990-01-01',
}
const c = JSON.stringify(person, null, '\t')
console.log(c)
/**
{
	"name": "帅哥",
	"age": 45,
	"birth": "1990-01-01"
}
*/
```

### 规则 - undefined、任意的函数、symbol

- 作为对象属性值，会被自动忽略

  ```javascript
  // 自动忽略
  const data = {
    a: 'test1',
    b: undefined,
    c: Symbol('test2'),
    fn: function () {
      return true
    },
  }
  console.log(JSON.stringify(data)) // {"a":"test1"}
  ```

- 作为数组，序列化返回 null

  ```javascript
  //数组返回null
  const data = [
    'test1',
    undefined,
    function aa() {
      return true
    },
    Symbol('test2'),
  ]
  console.log(JSON.stringify(data)) // ["test1",null,null,null]
  ```

- 单独序列化时，返回 undefined

  ```javascript
  //返回undefined
  const a1 = JSON.stringify(function a() {
    console.log('test1')
  })
  console.log('a1==', a1) // a1== undefined
  const a2 = JSON.stringify(undefined)
  console.log('a2==', a2) // a2== undefined
  const a3 = JSON.stringify(Symbol('test2'))
  console.log('a3==', a3) // a3== undefined
  ```

### JSON.stringify 其他规则

- Date 返回 ISO 字符串

  ```javascript
  //Date
  console.log(JSON.stringify({ now: new Date() }))
  // {"now":"2023-05-24T03:54:03.618Z"}
  ```

- 循环引用报错

  ```javascript
  //循环引用报错
  const obj = {
    name: 'loopObj',
  }
  const loopObj = {
    obj,
  }
  // 对象之间形成循环引用，形成闭环
  obj.loopObj = loopObj

  // 封装一个深拷贝的函数
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  // 执行深拷贝，抛出错误
  deepClone(obj)

  // TypeError: Converting circular structure to JSON
  //    --> starting at object with constructor 'Object'
  ```

- NaN Infinity null 都会作为 null

  ```javascript
  // NaN 和 Infinity 以及null
  console.log(JSON.stringify(NaN)) // null
  console.log(JSON.stringify(Infinity)) // null
  console.log(JSON.stringify(null)) // null
  ```

- 对象类型的原始值类型数据转换为对应的原始值

  ```javascript
  // 转换为对应的原始值
  console.log(
    JSON.stringify([new Number(2), new String('test'), new Boolean(false)]),
  )
  // [2,"test",false]
  ```

- BigInt 报错

  ```javascript
  var c = {
    test: 1n,
  }
  console.log(JSON.stringify(c))
  // TypeError: Do not know how to serialize a BigInt
  ```

- Map/Set/WeakMap 等对象，仅序列化可枚举属性

  ```javascript
  //仅序列化可枚举属性
  const a = JSON.stringify(
    Object.create(null, {
      test1: { value: 'testa', enumerable: false },
      test2: { value: 'testb', enumerable: true },
    }),
  )
  console.log(a) // {"test2":"testb"}
  ```

### toJSON

- 对象拥有 toJSON 方法，toJSON 会覆盖对象默认的序列化行为

```javascript
var product = {
  name: '牙膏',
  count: 10,
  orderDetail: {
    createTime: 1632996519781,
    orderId: 8632996519781,
  },
  toJSON() {
    return {
      name: '牙膏',
    }
  },
}

console.log(JSON.stringify(product)) // '{"name":"牙膏"}
```

### 讨论题

- JSON.parse(JSON.stringify(obj))深度复制的局限性

```javascript
const deepClone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}
```

## 07: 学习自检, 你能得几分

### 题目一：

```javascript
const obj = {},
  objA = { propertyA: 'A' },
  objB = { propertyB: 'B' }

obj[objA] = 'objectA'
obj[objB] = 'ObjectB'

for (let [p, v] of Object.entries(obj)) {
  console.log('p:', p, ', v:', v)
}
// p: [object Object] , v: ObjectB
```

### 知识点

- Object.entries: 迭代器，能获取键值对数组
- 对象键的特性：本质上是字符串，如果是数字，用数字和数字字符串一致
- 隐式转换：对象的隐式转换，Symbol.toPrimitvie valueOf toString

```javascript
const obj = {},
  objA = {
    propertyA: 'A',
    toString() {
      return 'objA'
    },
  },
  objB = {
    propertyB: 'B',
    valueOf() {
      return 'objB'
    },
  }

obj[objA] = 'objectA'
obj[objB] = 'ObjectB'
console.log('' + objA) // objA
console.log('' + objB) // objB

for (let [p, v] of Object.entries(obj)) {
  console.log('p:', p, ', v:', v)
}
// p: objA , v: objectA
// p: [object Object] , v: ObjectB 注意注意注意注意
```

### 题目二

```javascript
const person = {
  name: '二哈',
}
const person2 = Object.create(person)
delete person2.name

console.log(person2.name) // 二哈
```

### 题目三

```javascript
const val = (+{} + [])[+[]]
console.log(val) // N

/*
(+{} + [])[+[]]
// +{}  => NaN
(NaN + [])[+[]]
// [] 隐式转换 ''
(NaN + '')[+[]]
// NaN + '' => 'NaN'
('NaN')[+[]]
// +[] => 0
('NaN')[0]
// 'N'
*/
```

### 题目四

```javascript
const proto = {
  name: '原型',
  arr: [1, 2],
}
const person = Object.create(proto)
person.name = '实例'
person.arr.push(3)

console.log(person.name) // 实例
console.log(proto.name) // 原型

console.log(person.arr) // [1,2,3]
console.log(proto.arr) // [1,2,3]
```

### 题目五

```javascript
const toString = Object.prototype.toString
function getObjectType(obj) {
  return toString.call(obj).slice(8, -1)
}
const obj = String.prototype
console.log(typeof obj) // object
console.log(getObjectType(obj)) // [Object String].slice(8, -1) = String
```

### 题目六

> javascript 总是严格的按照从左到右计算表达式。

```javascript
let a = { n: 1 }
let b = a
a.x = a = { n: 2 }

// 求a.x
console.log(a.x) // undefined
console.log(a) // { n: 2 }
console.log(b) //  { n: 1; x: { n: 2 } }
```

### 题目七

```javascript
const proto = {
  name: 'p_parent',
  type: 'p_object',
  [Symbol.for('p_address')]: '地球',
}

const ins = Object.create(proto)
// 通过 defineProperty 声明的属性，默认是不可枚举的
Object.defineProperty(ins, 'age', {
  value: 18,
})
ins.sex = 1
ins[Symbol.for('say')] = function () {
  console.log('say')
}

const inKeys = []
for (let p in ins) {
  inKeys.push(p)
}

console.log(inKeys)
// [ 'sex', 'name', 'type' ]
console.log(Reflect.ownKeys(ins)) // 不能获取原型上的属性
// [ 'age', 'sex', Symbol(say) ]
console.log(ins)
// { sex: 1, [Symbol(say)]: [Function (anonymous)] }
```

## 08：对象的多种克隆方式以及注意事项

### 克隆的意义和常见场景

- 意义：保证原数据的完整性和独立性
- 常见场景: 复制数据、函数入参、class 构造函数等

### 克隆分类

- 浅克隆
- 深克隆

### 浅克隆

#### 特点

- 只克隆对象的第一层级
- 如果属性值是原始数据类型，拷贝其值，也就是我们常说的值拷贝
- 如果属性值是引用类型，拷贝其内存地址，也就是我们常说的引用拷贝

#### 常用的浅克隆方式

- ES6 拓展运算符号：...
- Object.assign
- for in 和其他的一层遍历复制

```javascript
// 浅克隆：拓展运算符
const person = {
  name: '帅哥',
  age: 18,
  getName: function () {
    return this.name
  },
  address: {
    province: '北京',
  },
}

const person2 = { ...person }

person2.name = '帅哥2'
person2.getName = function () {
  return `person2` + this.name
}
person2.address.province = '上海'

console.log('person.name:', person.name)
console.log('person.getName:', person.getName.toString())
/**
person.name: 帅哥
person.getName: function () {
    return this.name
  }
person.address.province: 上海
*/
```

```javascript
// 浅克隆 for...in一层
const person = {
  name: '帅哥',
  age: 18,
  getName: function () {
    return this.name
  },
  address: {
    province: '北京',
  },
}

const hasOwn = Object.prototype.hasOwnProperty
function clone(obj) {
  const result = {}
  for (let p in obj) {
    if (hasOwn.call(obj, p)) {
      result[p] = obj[p]
    }
  }
  return result
}
var person2 = clone(person)

person2.name = '帅哥2'
person2.getName = function () {
  return `person2` + this.name
}
person2.address.province = '上海'

console.log('person.name:', person.name)
console.log('person.getName:', person.getName.toString())
console.log('person.address.province:', person.address.province)
/*
person.name: 帅哥
person.getName: function () {
    return this.name
  }
person.address.province: 上海
*/
```

#### 数组常用的浅克隆

- ES6 的拓展运算符...
- slice
- [].concat

```javascript
const arr = [1, 2, 3]
// 拓展运算符
const arr2 = [...arr]
const arr3 = arr.slice(0)
const arr4 = [].concat(arr)

console.log('arr', arr)
console.log('arr2', arr2, arr2 == arr)
console.log('arr3', arr3, arr3 == arr)
console.log('arr4', arr4, arr4 == arr)
/**
arr [ 1, 2, 3 ]
arr2 [ 1, 2, 3 ] false
arr3 [ 1, 2, 3 ] false
arr4 [ 1, 2, 3 ] false 
*/
```

### 深克隆

#### 特点

- 克隆对象的每个层级
- 如果属性值是原始值类型，拷贝其值，也就是我们常说的值拷贝
- 如果属性值是引用类型，就递归拷贝

#### JSON.stringify + JSON.parse

- 优点：纯天然，无污染
- 缺点
  - 性能差
  - 具有局限性
- 局限性：
  - 只能复制普通健的属性，Symbol 类型的无能为力
  - 循环引用对象，比如 Window 不能复制
  - 函数，Date, Regex, Blob 等类型不能复制

```javascript
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const a = clone({ a: 1, c: { b: 2 } }) // {a:1,c:{b:2}}
console.log('common object:', a)
// common object: { a: 1, c: { b: 2 } }

// 时间：转为字符串
console.log('date:', clone({ date: new Date() })) // {date: '2021-09-26T08:23:40.517Z'}
// date: { date: '2023-05-24T07:38:02.486Z' }

// 正则： 变为了空对象  异常
console.log('regex', clone({ regex: /[0-9]/ })) // {regex: {…}}
// regex { regex: {} }

// Blob: 变为空对象， 异常
console.log('blob:', clone({ blob: new Blob(['123']) })) // {blob: {…}}
// blob: { "blob": {} }

// 函数
console.log('function:', clone({ fn() {} })) // {}
// function: {}

// window
console.log(clone(window)) // Uncaught TypeError: Converting circular structure to JSON
// Uncaught TypeError: Converting circular structure to JSON
```

#### 消息通讯

- window.postMessage
- Broadcast Channel
- Shared Worker
- Message Channel

```html
<!DOCTYPE html>

<body>
  <script>
    let chId = 0
    function clone(data) {
      chId++
      var cname = `__clone__${chId}`
      var ch1 = new BroadcastChannel(cname)
      var ch2 = new BroadcastChannel(cname)
      return new Promise((resolve) => {
        ch2.addEventListener("message", ev => resolve(ev.data),
          { once: true })
        ch1.postMessage(data)
      })
    }
    // 复制对象： 正确
    var obj1 = { a: { b: 1 } }
    clone(obj1).then(function (o) {
      console.log("克隆普通对象:")
      console.log(o, o === obj1)
      console.log("")
    })

    // 复制时间： 正确, 依旧能调用getFullYear方法
    var obj2 = {
      a: new Date()
    }
    clone(obj2)
      .then(function (o) {
        console.log("克隆对象:包含时间")
        console.log(o, o === obj2, o.a.getFullYear())
        console.log("")
      })


    // 复制正则, 正确，依旧能调用正则的test方法
    var obj3 = {
      a: /[0-9]/
    }
    clone(obj3)
      .then(function (o) {
        console.log("克隆对象:包含正则")
        console.log(o, o === obj3, o.a.test(1))
        console.log("")
      })


    // 复制Blob, 正确，依旧还是Blob类型
    var obj4 = {
      a: new Blob(["123"])
    }
    clone(obj4)
      .then(function (o) {
        console.log("克隆对象:包含Blob")
        console.log(o, o === obj3, o.a instanceof Blob)
        console.log("")
      })


    // 复制 window，异常
    var obj5 = {
      a: 1,
      window
    }
    clone(obj5).then(function (o) {
      console.log(o, o === obj5)
    }).catch(err => {
      console.log("克隆window:", err)
    })


    // 复制自定义函数, 异常
    var obj6 = {
      a: 1,
      fn: function fn() { return false },
    }
    clone(obj6)
      .then(o => console.log(o, o === obj6))
      .catch(err => {
        console.log("克隆window:", err)
      })
  </script>
  <div>BroadcastChannel</div>
</body>

</html>
```

#### 基于消息通讯克隆的局限

- 循环引用对象不能复制：如 Windows
- 函数不能复制
- 同步变成异步

#### 手写简单版深度克隆

```javascript
const { hasOwnProperty } = Object.prototype

function isObject(obj) {
  return obj !== null && typeof obj == 'object'
}

function isArray(obj) {
  return Array.isArray(obj)
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function deepClone(obj) {
  if (!isObject(obj)) return obj
  let data

  if (isArray(obj)) {
    data = []
    for (let i = 0; i < obj.length; i++) {
      data[i] = deepClone(obj[i])
    }
  } else if (isObject(obj)) {
    data = {}
    for (let key in obj) {
      if (hasOwn(obj, key)) {
        data[key] = deepClone(obj[key])
      }
    }
  }
  return data
}

const arr = [1, 2]
arr.ccc = 'ccc'

var obj1 = {
  name: 'obj1',
  age: 18,
  date: new Date(),
  arr,
}
const a = deepClone(obj1)
console.log(a)
// { name: 'obj1', age: 18, date: {}, arr: [ 1, 2 ] }
// arr上的 ccc属性丢失，以及 date 数据类型丢失
```

#### 优化简单版本深度克隆

> 还存在的问题：
>
> 1. 循环引用没有处理
> 2. 递归：可能爆栈
> 3. 特殊类型未做处理，比如 blod date 等

```javascript
const { hasOwnProperty } = Object.prototype

function isObject(obj) {
  return obj !== null && typeof obj == 'object'
}

function isArray(obj) {
  return Array.isArray(obj)
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function deepClone(obj) {
  if (!isObject(obj)) return obj
  const data = isArray(obj) ? [] : {}
  for (let key in obj) {
    const val = obj[key]
    if (hasOwn(obj, key)) {
      data[key] = deepClone(val)
    }
  }
  return data
}

const arr = [1, 2]
arr.ccc = 'ccc'

var obj1 = {
  name: 'obj1',
  age: 18,
  date: new Date(),
  arr,
}
const a = deepClone(obj1)
console.log(a) // { name: 'obj1', age: 18, date: {}, arr: [ 1, 2, ccc: 'ccc' ] }

// // 循环引用
// var obj2 = {
//     name: "obj2"
// };
// obj2[obj2] = obj2;
// deepClone(obj2)
```

#### Jquery 中的 Jquery.extends

```javascript
jQuery.extend = jQuery.fn.extend = function () {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target

    // Skip the boolean and the target
    target = arguments[i] || {}
    i++
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        copy = options[name]

        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === '__proto__' || target === copy) {
          continue
        }

        // Recurse if we're merging plain objects or arrays
        if (
          deep &&
          copy &&
          (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          src = target[name]

          // Ensure proper type for the source value
          if (copyIsArray && !Array.isArray(src)) {
            clone = []
          } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
            clone = {}
          } else {
            clone = src
          }
          copyIsArray = false

          // Never move original objects, clone them
          target[name] = jQuery.extend(deep, clone, copy)

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // Return the modified object
  return target
}
```

#### 深度复制-循环引用

- 循环引用问题解决（WeakMap）

```javascript
const { hasOwnProperty } = Object.prototype
function isObject(obj) {
  return obj !== null && typeof obj == 'object'
}
function isArray(obj) {
  return Array.isArray(obj)
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function deepClone(obj) {
  const wmap = new WeakMap()
  wmap.set(obj, 1)

  function deepCloneInner() {
    if (!isObject(obj)) return obj
    const data = isArray(obj) ? [] : {}
    for (let key in obj) {
      const val = obj[key]
      if (hasOwn(obj, key)) {
        // 原始数据类型
        if (!isObject(val)) {
          data[key] = val
          continue
        }
        if (wmap.has(val)) {
          continue
        }
        wmap.set(val, 1)
        data[key] = deepCloneInner(val)
      }
    }
    return data
  }

  return deepCloneInner(obj)
}

// 循环引用
var obj2 = {
  name: 'obj2',
}
obj2['obj2'] = obj2
console.log(deepClone(obj2))
```

#### 深度复制-爆栈问题

- 爆栈问题解决（循环代替递归）

```javascript
const { toString, hasOwnProperty } = Object.prototype
function hasOwnProp(obj, property) {
  return hasOwnProperty.call(obj, property)
}
function getType(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase()
}
function isObject(obj) {
  return getType(obj) === 'object'
}
function isArray(arr) {
  return getType(arr) === 'array'
}
function isCloneObject(obj) {
  return isObject(obj) || isArray(obj)
}
// 循环
function cloneDeep(x) {
  // 先设置默认值
  let root = x

  if (isArray(x)) {
    root = []
  } else if (isObject(x)) {
    root = {}
  }

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ]

  while (loopList.length) {
    // 深度优先

    // 出栈
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = isArray(data) ? [] : {}
    }

    if (isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        // 避免一层死循环 a.b = a
        if (data[i] === data) {
          res[i] = res
        } else if (isCloneObject(data[i])) {
          // 需要深度复制的属性值
          // 下一次循环， 入栈
          loopList.push({
            parent: res,
            key: i,
            data: data[i],
          })
        } else {
          res[i] = data[i]
        }
      }
    } else if (isObject(data)) {
      for (let k in data) {
        if (hasOwnProp(data, k)) {
          // 避免一层死循环 a.b = a
          if (data[k] === data) {
            res[k] = res
          } else if (isCloneObject(data[k])) {
            // 需要深度复制的属性值
            // 下一次循环
            loopList.push({
              parent: res,
              key: k,
              data: data[k],
            })
          } else {
            res[k] = data[k]
          }
        }
      }
    }
  }

  return root
}

// console.log(cloneDeep({ a: 1, b: { fn: function () { } } }));
function createData(deep) {
  var data = {}
  var temp = data

  for (var i = 0; i < deep; i++) {
    temp = temp['data'] = {}
    temp[i + 1] = i + 1
  }

  return data
}

const data = createData(10000)
// const f=JSON.parse(JSON.stringify(data));
// console.log(JSON.parse(JSON.stringify(data)));

// clone deep
const f = cloneDeep(data)
console.log('f==', f)
```

#### 思考：特殊类型处理

- Map Set Blob 等
- 提示：构造函数识别

### 浅克隆 vs 深克隆

| 方法方式 | 优点         | 缺点                       | 备注                               |
| -------- | ------------ | -------------------------- | ---------------------------------- |
| 浅克隆   | 性能高       | 数据可能不完全独立         | 一层属性全是值类型，等同于深度克隆 |
| 深克隆   | 不影响原对象 | 性能低，时间和空间消耗更大 | 保持数据独立行，让函数无副作用等   |

### 终极版本的深克隆

```javascript
const { toString, hasOwnProperty } = Object.prototype

function hasOwnProp(obj, property) {
  return hasOwnProperty.call(obj, property)
}

function getType(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase()
}

function isObject(obj) {
  return getType(obj) === 'object'
}

function isArray(arr) {
  return getType(arr) === 'array'
}

function isCloneObject(obj) {
  return isObject(obj) || isArray(obj)
}

function cloneDeep(x) {
  //使用WeakMap
  let uniqueData = new WeakMap()
  let root = x

  if (isArray(x)) {
    root = []
  } else if (isObject(x)) {
    root = {}
  }

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const source = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let target = parent
    if (typeof key !== 'undefined') {
      target = parent[key] = isArray(source) ? [] : {}
    }

    // 复杂数据需要缓存操作
    if (isCloneObject(source)) {
      // 命中缓存，直接返回缓存数据
      let uniqueTarget = uniqueData.get(source)
      if (uniqueTarget) {
        parent[key] = uniqueTarget
        continue // 中断本次循环
      }

      // 未命中缓存，保存到缓存
      uniqueData.set(source, target)
    }

    if (isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        if (isCloneObject(source[i])) {
          // 下一次循环
          loopList.push({
            parent: target,
            key: i,
            data: source[i],
          })
        } else {
          target[i] = source[i]
        }
      }
    } else if (isObject(source)) {
      for (let k in source) {
        if (hasOwnProp(source, k)) {
          if (isCloneObject(source[k])) {
            // 下一次循环
            loopList.push({
              parent: target,
              key: k,
              data: source[k],
            })
          } else {
            target[k] = source[k]
          }
        }
      }
    }
  }

  uniqueData = null
  return root
}

var obj = {
  p1: 'p1',
  p2: [
    'p22',
    {
      p23: undefined,
      p24: 666,
    },
  ],
  null: null,
  p4: new RegExp(),
  p3: undefined,
  func: function () {
    console.log('func')
    return 1
  },
  Symbol: Symbol(2),
  bigint: BigInt(100),
}
obj.loop = obj

const f = cloneDeep(obj)
console.log('f==', f)
```
