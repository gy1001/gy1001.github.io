# 02- 深入 TS 核心语法+各种实战应用（上）

## 01: 本章概述【先看】

1. TS 定义，环境准备，优势
2. TS 核心语法
   - 类型注解和类型推断
   - TS 编译和编译优化
   - 24 种 TS 数据类型
   - 字面量数据类型的应用
   - 枚举和真实应用场景
   - any unknown 的区别
   - 接口和接口真实应用场景
   - 接口可索引签名
   - 索引访问类型，索引访问类型的深入扩展
   - 函数类型
   - 函数类型的复杂实战--手写 Promise 开头源码
   - 元组，可变元组和它的应用场景，可变元组 tag
   - 类，静态属性，何时使用静态属性，静态成员问题
   - 单件模式的两种实现
   - TS 静态成员，方法拦截器实战

## 02：TS 的完整定义，环境搭建，6 大主要优势

### 定义

融合了后端面向对象思想的超级版的 JavaScript 语言

### 环境搭建

```bash
npm install typescript -g
或者
npm init -y
npm instal typescript -D

tsc --init
```

### 优势

1. **编译时静态类型检测**：函数或者方法传参或者变量赋值不匹配时，会出现变异错误提示，规避了开发期间的大量低级错误，省时省力
2. **自动提示更加清晰明确**
3. **引入了泛型和一系列的 TS 特有的类型**
4. **强大的 d.ts 声明文件**：声明文件像一个书的目录一样，清晰直观展示了依赖库文件的接口，type 类型，类，函数，变量等声明
5. **轻松编译成 JS 文件**：即使 TS 文件有错误，绝大多数情况下能输出 JS 文件
6. **灵活性高**：尽管 TS 是一门强类型语言，但是也提供了 any 类型和 as any 断言，这提供了 TS 的灵活性

## 03：一个非常重要的问题【请先看完本节再学习后面的视频】

## 04：类型注解和类型推断+重要细节+作业

```typescript
// 类型注解
let data: number = 123

// 类型推导
let data2 = '唐僧' // 推导为 string 类型
data2 = 123 // 报错
```

## 05：TS 编译和编译优化

### TS 编译

> tsc xxx.ts
>
> // 使用 tsc 把 ts 文件转换为 js 文件后，才可以 node 执行
>
> node xxx.js

### 编译优化

通过`tsc xx.ts`默认是会再当前文件目录下产生一个`xxx.js`.我们可以通过设置`tsconfig.json`文件来让其编译到一个指定目录中

```json
{
  // 输出目录
  "outDir": "./dist",
  // 需要编译的文件夹
  "rootDir": "./src"
}
```

重新运行`tsc`，就会使用配置文件中的路径进行编译处理

## 07：常用的 24 种 TS 数据类型

### 基本类型

- number
- string
- boolean
- symbol
- null
- undefined

### 根类型

- Object
- {}

### 对象类型

- Array
- object
- function

### 枚举类型

- enum

### 其他特殊类型

- any
- unkown
- never
- void
- 元组 tuple
- 可变元组

### 合成类型

- 联合类型

  ```typescript
  let str: number | string = '唐僧'
  str = 100
  ```

- 交叉类型

  ```typescript
  type Obj1 = { username: string }
  type Obj2 = { age: number }
  let obj1: Obj1 = { username: '猪八戒' }
  let obj2: Obj2 = { age: 300 }
  // 交叉类型
  let obj3: Obj2 & Obj1 = { username: '孙悟空', age: 600 }
  ```

### 字面量数据类型

> 就是拿值当做数据类型

## 08：never 的意义

> 使用 never 就是避免出现未来扩展新的类没有对应类型的熟悉爱你，目的就是写出类型绝对安全的代码

```typescript
type DataFlow = string | number
function dataFlowAnalysisWithNever(dataFlow: DataFlow) {
  if (typeof dataFlow === 'string') {
    console.log('字符串类型', dataFlow.length)
  } else if (typeof dataFlow === 'number') {
    console.log('数字类型', dataFlow.toFixed(2))
  } else {
    let data = dataFlow
  }
}

dataFlowAnalysisWithNever('唐僧')
dataFlowAnalysisWithNever(1.102)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aef26fb28464b2eb4a163490b3e80ca~tplv-k3u1fbpfcp-watermark.image?)

## 09: 为什么要用枚举?

> 解决多次 if/switch 判断中值的语义化的问题

* 常量解决
* 使用常量带来的局现性

1. 常量解决

   ```typescript
   const Status = {
     MANAGER_ADUIT_FAIL: -1,
     NO_AUDIT: 0,
     MANAGER_ADIT_SUCCESS: 1,
     FINAL_ADUIT_SUCCESS: 2,
   }
   
   // 审核类
   class MyAduit {
     getAduitStatus(status: number): void {
       if (status === Status.NO_AUDIT) {
         console.log('没有审核')
       } else if (status === Status.MANAGER_ADIT_SUCCESS) {
         console.log('经理审核通过')
       } else if (status === Status.FINAL_ADUIT_SUCCESS) {
         console.log('财务审核通过')
       }
     }
   }
   ```

2. 使用常量带来的局限性

   方法参数不能定义为具体类型，只能初级使用 number、string 基本类型作为替代，降低了代码的可读性和可维护性

## 10：枚举的定义 取值，分类

### 枚举的定义

> 用来存放一组固定的常量的序列

### 枚举的分类

```typescript
enum EnumAuditStats {
  MANAGER_ADUIT_FAIL = '项目经理审核失败',
  NO_AUDIT = '没有审核',
  MANAGER_ADIT_SUCCESS = '项目经理审核成功',
  FINAL_ADUIT_SUCCESS = '财务审核成功',
}
// 字符串枚举
enum WeekEnd {
  MONDAy = 'monday',
  TUESDAY = 'tuesday',
  WENSDAY = 'wensday',
  THIRSDAY = 'THIRSDAY',
  FRIDAY = 'friday',
  SARTURDAY = 'sarturday',
  SUNDAY = 'sunday',
}
// 数字枚举
enum WEEK {
  MONDAY = 1,
  TUESDAY = 2,
  WENSDAY,
  THIRSDAY,
  FRIDAY,
  SARTURDAY,
  SUNDAY,
}
```

### 取值方式

```typescript
console.log(EnumAuditStats.MANAGER_ADUIT_FAIL)
console.log(WEEK.MONDAY)
```

## 11: 解析枚举底层

### 数字类型枚举底层

```typescript
"use strict";
var WEEK;
(function (WEEK) {
    WEEK[WEEK["MONDAY"] = 1] = "MONDAY";
    WEEK[WEEK["TUESDAY"] = 2] = "TUESDAY";
    WEEK[WEEK["WENSDAY"] = 3] = "WENSDAY";
    WEEK[WEEK["THIRSDAY"] = 4] = "THIRSDAY";
    WEEK[WEEK["FRIDAY"] = 5] = "FRIDAY";
    WEEK[WEEK["SARTURDAY"] = 6] = "SARTURDAY";
    WEEK[WEEK["SUNDAY"] = 7] = "SUNDAY";
})(WEEK || (WEEK = {}));
```

### 字符串枚举底层

```typescript
var WeekEnd;
(function (WeekEnd) {
    WeekEnd["MONDAy"] = "monday";
    WeekEnd["TUESDAY"] = "tuesday";
    WeekEnd["WENSDAY"] = "wensday";
    WeekEnd["THIRSDAY"] = "THIRSDAY";
    WeekEnd["FRIDAY"] = "friday";
    WeekEnd["SARTURDAY"] = "sarturday";
    WeekEnd["SUNDAY"] = "sunday";
})(WeekEnd || (WeekEnd = {}));
```

## 12: 枚举更多好处+在企业项目中的真实应用+作业

### 枚举的好处

* 有默认值、可以自增值，节省编码时间
* 语义更清晰，可读性增强

因为枚举是一种值类型的数据类型，方法参数可以明确参数类型为枚举类型

### 枚举应用

```typescript
export enum EnumAuditStats {
  MANAGER_ADUIT_FAIL = -1, // 第一个常量值设置为 -1
  NO_AUDIT, // 第二个常量自动递增，就为 0
  MANAGER_ADIT_SUCCESS, // 第二个常量继续自动递增，就为 1
  FINAL_ADUIT_SUCCESS, // 为 2
}
```

##  13：any，unknown 的两点区别和多个应用场景

> any 和 unknown 在开发中和第三方包源码底层经常看到，弄清楚它们的场景也很重要

### 特点

#### 相同点

* any 和 unknown 可以是任何类的父类，所以任何类型的变量都可以赋值给 any 或者 unknown 类型的变量

#### 不同点

* any 可以是任何类的子类，但是 unknown 不可以，所以 any 类型的变量都可以赋值给其他类型的变量
* 不能拿 unknown 类型的变量来获取任何属性和方法，但是 any 类型的变量可以获取任意名称的属性和任意名称的方法

### any 比较典型的应用场景

1. 自定义守卫
2. 需要进行 as any 类型断言的场景

```typescript
// Vue3 源码片段
// any 的应用场景 --自定义守卫使用 any
export function isRef(r: any): r is Ref {
  return Boolean(r && r.__v_isRef === true) // any 类型的 r 参数在函数内部获取属性
}
```

### unknown 一般用做函数参数

> 用来接受任意类型的变量实参，但是在函数内部只用于再次传递或者输出结果，不获取属性的场景

```typescript
// Vue3 源码片段 ref 的 unknown 参数
export function ref(value: unknown) {
  return createRef(value) // 函数内部只用于再次传递值，而不获取属性
}
```

## 14：深入理解接口+真实应用场景

> 接口：另一种定义对象类型的类型

### 接口应用场景

1. 一些第三方或者框架底层源码中有大量的接口类型
2. 提供方法的对象类型的参数时使用
3. 为多个同类别的**类**提供统一的方法和属性声明

### 如何定义接口

```typescript
interface Product {
  name: string
  price: number
  account: number
  buy(): void
}

let P: Product = {
  name: 'iphone',
  price: 1000,
  account: 10,
  buy() {
    console.log('buying')
  },
}
```

### 继承接口

> 新的接口只是在原来接口继承之上增加了一些属性或者方法，这时就用接口继承

## 15：可索引签名和 2 个容易忽略的重要细节

> 注意细节：
>
> * 键名类型需要注意
> * 可索引签名的值类型需要是兼容其他属性的值的类型

```typescript
interface Product {
  name: string
  price: number
  account: number
  buy(): void
  // 可索引签名
  [x: string]: any
}

let P: Product = {
  name: 'iphone',
  price: 1000,
  account: 10,
  buy() {
    console.log('buying')
  },
  age: 500,
}
```

## 16：索引访问类型，索引访问类型的深入扩展

```typescript

const symid = Symbol('productNo')
interface Product {
  name: string
  price: number
  account: number
  buy(): string
  [symid]: number | string
}
type A = Product['price'] // number
type B = Product['price' | 'name'] // string | number
type S = Product[typeof symid] // number | string
type PKeys = keyof Product // "name" | "price" | "account" | "buy" || typeof  symid
let pKeys: PKeys = 'name'

type AllKeys<T> = T extends any ? T : never
type Pkeys2 = AllKeys<keyof Product> // typeof symid | "name" | "price" | "account" | "buy"
```

## 17: 视频作业：容易被忽略的 ts 类型

> 说说你理解的 void

## 18: null 和 undefined + 相关重要细节

> javascript 中 null 表示什么都没有，表示一个空对象引用

在 JavaScript 中

```javascript
let obj = null
console.log(typeof null) // object

// 声明一个变量，但是没有赋值，该变量的值为 undefined
var x
console.log("x:", x)
console.log(typeof undefined) // undefined 
```

在 Typescript 中

```typescript
let str: string | undefined
console.log('str: ', str)
```

undefined 的一些应用

```typescript
// 参数可选后，会解析为： (parameter) data: string | undefined
function fn(data?: string) {}
fn()
```

那些数据类型可以接收 undefined

```typescript
// any unknown undefined 可以接收 undefined
// any unknown null 可以接收 null
let data: undefined = undefined
let data1: any = undefined
let data2: unknown = undefined
```

## 19：看似简单的取值为何总抛出错误？

```typescript
let obj = { username: '唐僧', age: 240 }
let username = 'username'
// username = '猪八戒'
let u = obj[username] // 推到出来：u: any，因为 username 可以变为其他值，比如 猪八戒

// 可改为如下
let obj = { username: '唐僧', age: 240 }
const username = 'username'
let u = obj[username] // 推到出来：u: string
```

```typescript
let obj: object = { username: '唐僧', age: 240 }
const username = 'username'
let u = obj[username] // 推到出来：u: any
```

## 20: TS 函数和 TS 函数类型，rest 参数

### TS 函数

```typescript
// 返回值类型可以省略，因为会推导出类
function info(name: string, age: number): number {
  return 3
}

info('唐僧', 100)
```

### TS 函数类型

```typescript
type InfoFunType = (name: string, age: number) => number

let info2: InfoFunType = function (name, age) {
  return 3
}
info2('孙悟空', 500)
```

### rest 参数

```typescript
type InfoFunType = (name: string, age: number, ...rest: any) => any
let info2: InfoFunType = function (name, age, ...rest) {
  return rest
}
info2('孙悟空', 500, 122, '撒旦法撒旦', '如来佛祖')
```

