# 03-深入 TS 核心语法+各种实战应用（下）

## 01：TS函数类型和相关解构

```typescript
type TypeStuobj = { username: string; age: number; phone: string }
function info(stuObj: TypeStuobj) {
  console.log('name', stuObj.username, 'age', stuObj.age)
  return 3
}
let stuObj: TypeStuobj = { username: '唐僧', age: 100, phone: '11122' }
info(stuObj)

// 函数解构
function subInfo({ username, age }: TypeStuobj) {
  console.log('name:', username, 'age: ', age)
}
subInfo({ username: '李四', age: 22, phone: '33333' })
```

## 02: TS 函数类型复杂实战：手写 Promise 开头两段源码

## 03：interface 和 type 的区别

interface 和 type 类似，都用来定义类型，但是 type 和 interface 区别如下

### 1. 定义类型范围不同

* interface 只能定义对象类型或者接口当做名字的函数类型
* type 可以定义任何类型，包括基础类型、联合类型、交叉类型、元组

```typescript
// type 定义基础类型
type num = number

// type 定义联合类型-1
type baseType = string | number | symbol
// typ 定义联合类型-2
interface Car {
  branNo: string
}
interface Plane {
  No: string
  brandNo: string
}
type baseTyp2 = Car | Plane

// 元组
type TypeChild = [Car, Plane]
```

### 2. 接口可以 extends 一个或者多个接口或者类来实现一个接口，也可以继承 type，但是type 类型没有继承功能，但一般接口继承 类和 type 的应用场景很少见，记住这样的语法即可

```typescript
// vue 中的源码
export interface Node {
  type: NodeTypes
  loc: SourceLocation
}

export interface TextNode extends Node {
  type: NodeTypes.TEXT
  cotnent: string
}
```

```typescript
// interface 可以继承多个类型
interface TextNode extends Node, Element{
  
}
```

### 3. 用 type 交叉类型 & 可让类型中的成员合并成一个新的type类型，但接口不能交叉合兵

```typescript
type Group = { groupName: string; memberNum: number }
type GroupInfo = { info: string; happen: string }
type GrounMember = Group & GroupInfo // type 交叉类型合兵
let data: GrounMember = {
  groupName: '0001',
  memberNum: 11,
  info: '信息',
  happen: '有惊无险',
}
```

### 4：接口可以声明合兵

> 定义两个相同名称的接口会合兵声明，定义两个同名的type会出现编译错误

```typescript
interface Error {
  name: string
}
interface Error {
  message: string
  stack?: string
}
// 接口合并
let error: Error = {
  message: '空指针',
  name: 'NullPointException',
}
```

## 04: 元组 tuple

### 什么是元组

满足以下三点的数组就是元组

1. 在定义时每个元素的类型都确定
2. 元素值的数据类型必须是当前元素定义的类型
3. 元素值的个数必须和定义时个数相同

```typescript
let salary: [string, number, string, string, string] = [ '唐僧', 100, '猪八戒', '孙悟空', '沙僧'  ]
```

## 05：TS数组和数组元素怎么样同时为只读

```typescript
const account = [10, 20, 30, 40] as const
account[1] = 100 // Cannot assign to '1' because it is a read-only property.ts(2540)
```

## 06: 可变元组和它的应用场景

```typescript
// 可变元组
let customer: [string, string, ...any[]] = ['唐僧', '猪八戒', '孙悟空', '沙僧']
// 可变元组解构
const [a, b, c, ...d]: [string, string, string, ...any[]] = [
  '唐僧',
  '猪八戒',
  '孙悟空',
  '沙僧',
]
// 也可以通过索引取值
console.log(customer[0])
```

## 07: 可变元组 tag 和 tag 的意义

> 如下代码，这样每一个元素的标签和变量名类似，这样就可以快速的看到变量类型

```typescript
let [custome, age, address, ...rest]: [ custome_: string, age_: number, address: string, ...rest: any[] ] = ['王五', 19, '华腾世纪', '其他', 122]
```

## 08：类，静态属性，何时用静态属性

### 定义

> 类就是拥有相同属性和方法的一系列对象的集合

### 展开特征

> 类是一个模具，是从该类包含的所有具体对象中抽象出来的一个概念，类定义了它所包含的全体对象的静态特征和动态特征

### 举例

**people类**

* 静态特征[属性]: name, age, address, phone
* 动态特征[方法]: doEat, doStep

**desk类**

* 静态特征[属性]：height, width, color, price, brandno, material
* 动态特征[方法]：load

**order订单类**

* 静态特征[属性]：orderid, ordertime, custname
* 动态特征[方法]：createOrder, modifyOrder, delOrder, changeBack

### 代码

```typescript
class People {
  name: string
  age: number
  address: string
  constructor(_name: string, _age: number, _address: string) {
    this.name = _name
    this.age = _age
    this.address = _address
  }
  doEat() {}
  doStep() {}
}

// 通过 ts playground 转换后的代码如下：输出配置改为 es5
"use strict";
var People = /** @class */ (function () {
    function People(_name, _age, _address) {
        this.name = _name;
        this.age = _age;
        this.address = _address;
    }
    People.prototype.doEat = function () { };
    People.prototype.doStep = function () { };
    return People;
}());
```

### 静态成员：静态属性+静态方法

```typescript
class People {
  name: string
  age: number
  address: string
  // 静态属性
  static count: number = 10
  constructor(_name: string, _age: number, _address: string) {
    this.name = _name
    this.age = _age
    this.address = _address
    People.count++
  }
  doEat() {}
  doStep() {}
}

// 通过 ts playground 转换后的代码如下：输出配置改为 es5
"use strict";
var People = /** @class */ (function () {
    function People(_name, _age, _address) {
        this.name = _name;
        this.age = _age;
        this.address = _address;
        People.count++;
    }
    People.prototype.doEat = function () { };
    People.prototype.doStep = function () { };
  	// 静态属性
    People.count = 10;
    return People;
}());
```

## 09：企业项目何时用静态成员？

```typescript
// 类似这种工具类，使用一个就够了，不用多个实例
// 实现方式：1. 静态方法 2：单例模式
class DateUtil {
  static formatDate() {} //
  static diffDateByDay() {} // 两个日期之间的天数计算
  static diffDateByHour() {} // 两个日期之间的小时计算
  static timeConversion(restTime: number) {} // 天 时 分 秒
}

DateUtil.formatDate()
export default DateUtil
```

## 10：TS 常见面试题——TS 单件（例）模式的两种实现和静态成员执行的时机

### 单例模式实现

```typescript
// 单例模式
class DateUtil {
  // constructor 变为静态属性
  private constructor() {
    console.log("constructor")
  }
  static instance = new DateUtil()
  formatDate() {
    console.log('formate')
  }
  diffDateByDay() {} // 两个日期之间的天数计算
  diffDateByHour() {} // 两个日期之间的小时计算
  timeConversion(restTime: number) {} // 天 时 分 秒
}
let dateUtil1 = DateUtil.instance
let dateUtil2 = DateUtil.instance

console.log(dateUtil1 === dateUtil2) // true
dateUtil1.formatDate() // formate

export default DataUtil.instance // 可以直接导出实例化的结果
```

### 静态成员的执行时机

执行`ts-node xxx.ts`，`xxx.ts`为上述代码内容，打印内容如下

```shell
constructor // 先执行 constructor
true // 再执行外部方法
formate
```

## 11：常见面试题——单件（例）模式的第二种实现

> 上一节代码有一个问题：我们在未使用静态方法的时候，就已经执行 constructor 创建了静态属性，有些浪费空间。如何修改为：在需要获取实例时候，才进行创建呢？

```typescript
class DateUtil {
  private constructor() {
    console.log('constructor')
  }
  static instance: DateUtil
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new DateUtil()
    return this.instance
  }
  formatDate() {
    console.log('formate')
  }
  diffDateByDay() {} // 两个日期之间的天数计算
  diffDateByHour() {} // 两个日期之间的小时计算
  timeConversion(restTime: number) {} // 天 时 分 秒
}
let dateUtil1 = DateUtil.getInstance()
let dateUtil2 = DateUtil.getInstance()

console.log(dateUtil1 === dateUtil2) // true
dateUtil1.formatDate() // formate
```

## 12: TS 类 getter setter 使用和意义

* 可以加控制语句，对属性进行说明
* 可以添加自定义校验逻辑进行拦截

```typescript
class People {
  _name: string
  _age: number
  _address: string
  static count: number = 10
  constructor(_name: string, _age: number, _address: string) {
    this._name = _name
    this._age = _age
    this._address = _address
    People.count++
  }
  get age() {
    return this._age
  }
  set age(val: number) {
    // 这里可以添加自定义校验逻辑
    if (val > 18) {
      this._age = val
    } else {
      throw new Error('年来那个不在合适范围内')
    }
  }
}
```

## 13：实战晋级：TS 静态成员、方法拦截器在大中项目中的实战+作业

```typescript
class People {
  name: string
  age: number
  address: string
  // 静态属性
  static count: number = 10
  constructor(_name: string, _age: number, _address: string) {
    this.name = _name
    this.age = _age
    this.address = _address
    People.count++
  }
  doEat(who: string, where: string) {
    console.log(`who: ${who},where: ${where}`)
  }
  doStep() {}
}

const dateProp = Object.getOwnPropertyDescriptor(People.prototype, 'doEat')
const tragetMethod = dateProp?.value
dateProp!.value = function (...args: any[]) {
  console.log('前置拦截')
  tragetMethod.apply(this, args)
  console.log('后置拦截')
}
// dateProp?.value('传参数')
Object.defineProperty(People.prototype, 'doEat', dateProp!)
const p = new People('名字', 100, '四惠东')
p.doEat('我', '苹果')

// 前置拦截
// who: 我,where: 苹果
// 后置拦截
```

## 14：方法拦截器进一步深度理解和本章总结说明

