# 03-对象认知升级

推荐文章

[浅析JS对象中的排序属性和常规属性、对象内属性、快属性和慢属性 ](https://www.cnblogs.com/goloving/p/7009388.html)



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

* 两种属性：字符串作为键和数字作为键的属性
* 键属性被遍历的顺序似乎是有规律的

### 常规属性

* 键为字符串的属性
* 特点：根据创建时的顺序排序

### 排序属性

* 属性键为数字的属性
* 特点：按照索引值大小升序排序

### 思考

* 数字字符串属性时排序属性不？：：：是的
* 为什么要设计常规属性和排序属性
  * 提升属性的访问速度
  * 两种线性数据结构保存

### 对象内属性

* 何为对象内属性：被保存到对象自身的**常规属性**

* 内属性的数量

* 那些是属于对象内属性

* **不过对象内属性的数量是固定的，默认是10个，如果添加的属性超出了对象分配的空间，则它们将被保存在常规属性存储中。**

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

  超过 10个，新增加 properties 属性，并放置多余的

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f02fe783aff429186cdabfbe1bd2792~tplv-k3u1fbpfcp-watermark.image?)

  ```javascript
  // 排序属性6 普通属性 50个
  var obj = new CustomObject(6, 50)
  ```

  增加至 50个时，

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c036e5a7af074dd7aa92bf9de5ab18a0~tplv-k3u1fbpfcp-watermark.image?)

### 隐藏类

* 什么是隐藏类
* 隐藏类的作用
* 怎么查看隐藏类

### 守护隐藏类

* 初始化时保持属性顺序一致
* 一次性初始化完毕
* 谨慎使用 delete

### （赋值 VS delete）排序属性和普通属性

* 100000个对象，25个普通属性，delete or 赋值快 ？：赋值快
* 100000个对象，25个排序属性，delete or 赋值快 ？：赋值快

### v8原理——对象的存储和访问

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

* 静态属性：例如：Object.assign
* 原型属性：例如：Object.prototype.toString
* 实例属性，例如：function Person(name){ this.name = name }

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

* 设置属性描述符：
  * Object.defineProperty
  * Object.defineproperties
* 获取属性描述符
  * Object.getOwnPropertyDescriptor
  * Object.getOwnPropertyDescriptors
* 属性相关
  * configurable: 是否可配置
  * enumerable: 是否可枚举
  * value: 值
  * writable: 是否可以被更改
  * get: 访问器函数
  * set: 访问器函数
* 又分为
  * 数据属性: value + writable + configurable + enumerable
  * 访问器属性: get + set + configurable + enumerable

#### 属性描述符：注意事项

* 有趣的默认值：

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

* configurable 的小意外？（demo): writable 的状态值可由 true 改为 false

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

  对于上述问题，我们查看[https://tc39.es/ecma262/#sec-property-attributes](https://tc39.es/ecma262/#sec-property-attributes) 可以看到如下内容

  

| [[Configurable]] | [data property](https://tc39.es/ecma262/#sec-object-type) or [accessor property](https://tc39.es/ecma262/#sec-object-type) | a Boolean | false | If false, attempts to delete the property, change it from a [data property](https://tc39.es/ecma262/#sec-object-type) to an [accessor property](https://tc39.es/ecma262/#sec-object-type) or from an [accessor property](https://tc39.es/ecma262/#sec-object-type) to a [data property](https://tc39.es/ecma262/#sec-object-type), or make any changes to its attributes (other than replacing an existing [[Value]] or setting [[Writable]] to false) will fail. |
| ---------------- | ------------------------------------------------------------ | --------- | ----- | ------------------------------------------------------------ |
|                  |                                                              |           |       |                                                              |
