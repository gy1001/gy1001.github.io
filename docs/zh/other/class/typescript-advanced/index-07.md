# 07-泛型从入门到深度掌握

## 01: 本章概述

* 为什么要用泛型？泛型定义
* 泛型在类中的应用？封装一个面向对象的 ArrayList 类
* 泛型默认值
* 泛型约束
* 泛型在 Vue3 源码中的应用
* extends keyof + keyof 的联合应用
* 泛型反向赋值

## 02：泛型从入门到深入掌握

### 具有以下特点的数据类型叫做泛型

* 特点一：定义时不明确使用时必须明确成某种具体数据类型的数据类型【泛型的宽泛】
* 特点二：编译期间进行数据类型检查的数据类型【泛型的严谨】

```typescript
class 类名<泛型形参类型> 
泛型形参类型一般有两种表示：
	1: A-Z 任何一个字符 
  2: 语义化的单词来表示
绝大多数情况下，泛型都是采用第一种形式表示，如下
```

```typescript
class ArrayList<T> {
  array: Array<T>
  add(data: T){
    ...
  }
}
```

## 03：泛型的真实应用

```typescript
class ArrayList<T> {
  arr: Array<T>
  index: number = 0
  constructor() {
    this.arr = []
  }
  add(ele: T) {
    this.arr[this.index++] = ele
  }
  get(index: number) {
    return this.arr[index]
  }
}

const arr = new ArrayList<string>()
arr.add('唐僧')
arr.get(0)

const arr2 = new ArrayList<{ usename: string; age: number }>()
arr2.add({ usename: '唐僧', age: 100 })
arr2.get(0)

// 如果不写值会推断为 unknow
const arr3 = new ArrayList() // const arr3: ArrayList<unknown>
```

## 04: 泛型的默认值

> 上一节中最后，我们泛型不传递，会推断为 unknown,我们可以设置一个默认值来规避此问题

```typescript
// 泛型设置默认值为 string
class ArrayList<T = string> {
  arr: Array<T>
  index: number = 0
  constructor() {
    this.arr = []
  }
  add(ele: T) {
    this.arr[this.index++] = ele
  }
  get(index: number) {
    return this.arr[index]
  }
}
// 这里会推断类型为默认值 string
const arr3 = new ArrayList() // const arr3: ArrayList<string>
```

## 05: 泛型约束和它的真实应用

> keyof: 表示获取一个类或者一个对象类型或者一个接口类型的所有属性名 [key] 组成的联合类型，索引类型访问

```typescript
class Order {
  orderid!: number
  ordername!: string
  static count: number
  printOrd() {}
  static getCount() {}
}

type OrderIdType = Order['orderid'] // type OrderIdType = number
type OrderInstanceAttrNames = keyof Order // orderid | ordername | printOrd

type InstancePropKeys<T> = keyof T
type orderPropKeys = InstancePropKeys<Order> // orderid | ordername | printOrd
type stringKeys = InstancePropKeys<string> // type stringKeys = number | typeof Symbol.iterator | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | ... 28 more ... | "sup"
// 这里 T 可以是任意类型，但是我们想让他针对于 object 类型，而不是 string number 之类的
// 可以修改如下

// 使用泛型约束
type NewInstancePropKeys<T extends object> = keyof T
// type NewStringKeys = NewInstancePropKeys<string> // Type 'string' does not satisfy the constraint 'object'.ts(2344)
type NewOrrderPropKeys = NewInstancePropKeys<Order>
```

## 06：在 Vue3 源码深刻掌握泛型约束

```typescript
// 以下是 vue3 中的源码片段
// 这里使用了 泛型约束
class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true
  constructor(private readonly _object: T, private readonly _key: K) {}
  get value() {
    return this._object[this._key]
  }
  set value(newVal) {
    this._object[this._key] = newVal
  }
}
```

使用代码如下

```typescript
type ObjType = { username: string; age: number }
type ObjKeysType<T extends object, K> = K extends keyof T ? K : never

type TestObjKeysType = ObjKeysType<ObjType, 'username' | 'age'> // type TestObjKeysType =  "age" | "username"
type TestObjKeysType2 = ObjKeysType<ObjType, 'username' | 'age' | 'address'> // type TestObjKeysType2 = "age" | "username"

const obj = new ObjectRefImpl<ObjType, 'age'>({ username: '孙悟空', age: 100 }, 'age')
console.log(obj.value) // 100
```

## 07：高频使用的泛型赋值——反向为泛型赋值

> 上一节中最后我们知道前面的类型 "age" 确定后，后面的传递参数值就确定了，必须是 age，由此可以进行反向推导赋值

```typescript
class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true
  constructor(private readonly _object: T, private readonly _key: K) {}
  get value() {
    return this._object[this._key]
  }
  set value(newVal) {
    this._object[this._key] = newVal
  }
}

// 这里可以反向推断出类型，const obj: ObjectRefImpl<{ username: string, age: number }, "age">
const obj = new ObjectRefImpl({ username: '孙悟空', age: 100 }, 'age')
console.log(obj.value) // 100
```

