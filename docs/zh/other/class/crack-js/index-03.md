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

* 显式转换：主要通过 JS 定义的转换方法进行转换
* String、Object 等
* parseInt、parstFloat 等
* 显式调用 toString 等

### 隐式转换

* 隐式转换：编译器自动完成类型转换的方式就称为隐式转换
* 总是**期望**返回基本类型值

### 什么时候会发生隐式类型转换

* 二元 + 运算符

* 关系运算符：< > <= >= ==

* 逻辑：！ if/while 三目条件

* 属性遍历：for in 等

* 模板字符串

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

* Symbol.toPrimitive
* Object.prototype.valueOf
* Object.prototype.toString

### 对象隐式转换规则

* 如果 【Symbol.toPrimitive】(hint)方法存在，优先调用，无视 valueOf 和 toString 方法

* 否则，如果期望是 "string" ----- 优先调用 obj.toString() 如果返回不是原始值，继续调用 obj.valueOf()

* 否则，如果期望是 number 或者 default ------ 先调用 obj.valueOf() 如果返回不是原始值，继续调用 obj.toString()

  ```javascript
  const obj = {
    [Symbol.toPrimitive](hint) {
      if (hint == "number") {
        return 10;
      }
      if (hint == "string") {
        return "hello";
      }
      return true;
    }
  };
  
  console.log(+obj);     // 10      -- hint 参数值是 "number"
  console.log(`${obj}`); // "hello" -- hint 参数值是 "string"
  console.log(obj + ""); // "true"  -- hint 参数值是 "default"
  ```

### 提个问题

* 如果未定义 【Symbol.toPrimitive】,期望是 string, toString 和 valueOf 都没有返回原始值:: 报错异常

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

* hint - "string"
* hint - "number"
* hint - "default"

### hint - string

* window.alert(obj)
* 模板字符串`${obj}`
* test[obj] = 123

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

* 一元 + ， 位移
* \- \* / 关系运算
* Math.pow String.prototype.slice 等很多内部方法

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

* 二元 +
* == !=

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

* === !== 是否会触发隐式转换：不会
* == != 宽松比较是否触发隐式转换：也不一定，两个对象进行比较时是进行严格等判断的，其他情况下会触发隐式转换

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

* hint 是 default, 是**优先调用的 toString, 然后调用 valueOf**

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
const val = [] == ![];

[+val, [] + 1] == [1, 1] + []
// [1, '1'] == [1, 1] + ''
// '1, 1'

[+val, [] + 1] == [1, '1']
// [1, '1']  == [1, '1']

console.log([+val, [] + 1] == [1, '1']) // false
console.log([+val, [] + 1] == [1, 1] + []) // true
```

