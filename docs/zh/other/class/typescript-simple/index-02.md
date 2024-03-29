# 02-TypeScript 基础语法入门

## 01:TypeScript 究竟是什么？

> 由于历史愿因，JavaScript 在被创造时有许多未考虑的情况。在目前广泛使用的情况下，往往会暴露出很多问题。不方便我们排查问题。由此，Typescript 在JavaScript 基础上做了一系列的处理。

1. 我们新建文件`01/index.js`和`01/index.ts`，代码一样，如下

   ```javascript
   if ('' == 0) {
     console.log('hello')
   }
   
   function compare(x) {
     if (1 < x < 3) {
       console.log('hello')
     }
   }
   
   console.log(compare(100))
   
   const object = {
     firstName: '齐天大圣',
     lastName: '孙悟空',
   }
   // 注意这里我们故意写错误：fisrtName
   console.log(object.fisrtName + object.lastName)
   ```

2. 对于`.js`文件而言，他并不会关心代码的语法正确与否，只有在运行时候时候才会报错，

   * 对于`compare`方法，我们如果打印`console.log(compare(100))`，就会神奇的发现 `if`判断运行了，与我们想要的情况违背。
     * 代码执行时，会先执行`1<x`是`true`，然后`true<3`会进行一个类型转换，结果自然是`true`

3. 而对于`ts`文件，编译器会实时提示错误，错误信息如下

   ```typescript
   // This comparison appears to be unintentional because the types 'string' and 'number' have no overlap.ts(2367)
   // '' == 0 在编辑器下会报红
   if ('' == 0) {
     console.log('hello')
   }
   
   // function compare(x: any): void (+1 overload)
   function compare(x) {
     // Operator '<' cannot be applied to types 'boolean' and 'number'.ts(2365)
     // 1 < x < 3 在编辑器下会报红
     if (1 < x < 3) {
       console.log('hello')
     }
   }
   
   const object = {
     firstName: '齐天大圣',
     lastName: '孙悟空',
   }
   
   /*
     Property 'fisrtName' does not exist on type '{ firstName: string; lastName: string; }'. Did you mean 'firstName'?ts(2551)
     index.ts(14, 3): 'firstName' is declared here.
   */
   console.log(object.fisrtName + object.lastName) // fisrtName 在编辑器下会报红
   ```

## 02：TypeScript 相对于 JavaScript 的其他优势

> 上节课中我们看到 ts 中增加了一些变量类型，它可以帮助我们更容易更快的发现的问题所在

### 优势

* 更容易帮助我们发现程序的问题
* 语法提示更加完善，有了类型之后，写代码非常爽
* 语义化更强，代码可读性更高

1. 新建`02/index.js`，内容代码如下

   ```javascript
   function getDistance(point1, point2) {
     // 这里书写时进行的提示不够准确，只是编辑器记录了曾经书写过的变量或者属性
     return [point2.x - point1.x, point2.y - point1.y]
   }
   
   getDistance({ x: 1, y: 1 }, { x: 2, y: 2 })
   ```

2. 新建`02/index.ts`,内容代码如下

   ```typescript
   type Point = { x: number; y: number }
   function tsGetDistance(point1: Point, point2: Point) {
     // 书写时会进行属性的准确提示
     return [point2.x - point1.x, point2.y - point1.y]
   }
   
   tsGetDistance({ x: 1, y: 1 }, { x: 2, y: 2 })
   
   // 报错：Argument of type '{ x: number; }' is not assignable to parameter of type 'Point'.
   //   Property 'y' is missing in type '{ x: number; }' but required in type 'Point'.ts(2345)
   tsGetDistance({ x: 1 }, { x: 2, y: 2 })
   // 报错：Argument of type '{ y: number; }' is not assignable to parameter of type 'Point'.
   //  Property 'x' is missing in type '{ y: number; }' but required in type 'Point'.ts(2345)
   tsGetDistance({ x: 1, y: 1 }, { y: 2 })
   // 报错：Type 'string' is not assignable to type 'number'.ts(2322)
   // demo.ts(1, 16): The expected type comes from property 'x' which is declared here on type 'Point'
   tsGetDistance({ x: '21', y: 1 }, { y: 2 })
   ```

## 03：搭建课程学习必备环境

1. 安装[nodejs](https://nodejs.org/zh-cn)
1. 安装[typeScript](https://www.typescriptlang.org/zh/)

## 04：TS代码的执行原理

> ts代码浏览器无法直接识别执行， 需要利用 tsc 命令先转换为 js

命令

* `tsc xxx.ts` ==> `xxx.js`

## 05：从静态类型校验的角度理解 TypeScript

### Static Type Cheker: 静态类型校验能力

> 静态校验能力：一门语言，在代码执行之前，就能做错误预警，那么我们就说这门语言具备静态校验能力

### TS 约等于 JS +Static Type Cheker

> TS 核心要学的就是 **类型**

## 06: 基础类型快速入门

## 07: 基础类型快速入门

## 08: 基础类型快速入门

### 基础类型

>  number string bollean

```typescript
const teacherName: string = "菩提老祖"
const teacherAge: number = 1000;
const teacherGender: boolean = true;
```

### 数组类型

```typescript
const numberArr: number[] = [1, 2, 3]
const stringArr: string[] = ["1", "2", "3"]
const booleanArr: Array<boolean> = [ true, false, false ] // 泛型
```

### 对象类型

```typescript
const user: { name:string, age: number } = {name:'孙悟空', age: 500}
const userOne: { name:string, age?: number } = { name: '猪八戒' }
```

### 联合类型

```typescript
function union(id: string | number){
  if(typeof id === "string"){ // 类型收窄 Narrowing
    console.log(id.toUpperCase())
  }else{
    console.log(id)
  }
}
```

### 类型别名

```typescript
type User = {name: string, age: number}
const user: User = {name:'孙悟空', age: 500}
const user2: User = {name:'猪八戒', age: 400}
```

### any

> 可以通过 tsconfig.json 中配置 
>
> { "compilerOptions": { "noImplicitAny": true } }

```typescript
function showMessage(message :any){
  console.log(message)
} 
```

### 函数类型

```typescript
// 函数的返回值是 number 类型
function abc(message: string): number{
  return 123
}

const def: (age: number) => number = (age: number) => age
```

### 接口类型 Interface

> 它的优势：支持继承、可以多次声明（类型会合并）

```typescript
interface Student{
  age: number
  sex?: string
}
const student: Student = { age: 18, sex: 'male' }

interface OldStudent extends Student {
  name: string
}
const oldStudent: OldStudent = { age: 18, sex: 'male', name: '沙僧' } 
```

### 交叉类型

```typescript
type User = { name: string; age: number }
type Employee = User & { salary: number }
const emeployee: Employee = { name: '唐僧', age: 500, salary: 1000 }
```

### 断言 Assersion

```typescript
const dom = document.getElementById('root') as HTMLElement
const dom1: 
```

### 字面量类型

```typescript
const str: "abcsss" = "abcsss"
function getPositon(postion: 'left' | 'right'): string {
  return postion
}
getPositon('left')
getPositon('right')
const truthy: true = true
```

#### 字面量习题

```typescript
function request(url: string, method: 'GET' | 'POST'): string {
  return 'sending request'
}

const parmas: { url: string; method: string } = {
  url: 'www.baidu.com',
  method: 'POST',
}
// parmas.method 需要加上断言，否则是不符合要求的
request(parmas.url, parmas.method as 'POST')
```

### null、undefined

> `null` 和 `undefined` 都有各自的类型名称。这些类型本身没有用处，因为我们只能将 `null` 和 `undefined` 赋值给定义为 `null` 或 `undefined` 类型的变量。
>
> 默认情况下，`null` 和 `undefined` 是所有类型的子类型。我们可以通过在 `tsconfig.json` 文件将 `strictNullChecks` 设置为 `true` 来启用。

### void

```typescript
function getNumber(): void {}
```

## 09: 类型注解和类型推断

* TS开发准则：只要是变量、对象属性，都应该有一个明确地类型

 ### 类型注解

> 人工的告诉 TS, 变量或者对象的明确属性类型

### 类型推断

> 根据程序自动推断出变量或者变量属性类型
>
> 如果类型推断能够自动推断出来类型并符合理想，就没有必要去手写类型注解

```typescript
const userName:string = "孙悟空"

const userAge = 500 ;// 类型推断为 number
```

## 10: 类型收窄

### typeof 类型收窄

```typescript
function uppercase(content: string | number) {
  if (typeof content === 'string') {
    return content.toUpperCase()
  }
  return content
}
```

### 真值收窄

```typescript
function getString(content?: string) {
  if (content) {
    return content.toUpperCase()
  }
}
```

### 相等收窄

```typescript
// 相等时候，就是 string 类型的
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    return x.toUpperCase()
  }
}
```

### 对象类型解构的代码怎么写

```typescript
function getObjectValue({ a, b }: { a: number; b: number }) {
  return a + b
}

getObjectValue({ a: 1, b: 2 })
```

### 变量类型以定义变量时的类型为准

```typescript
let userName = '123'
userName = 123  // 报错 
```

## 11：使用类型陈述语法实现类型收窄

> animal is Fish 叫做 类型陈述语法

```typescript
type Fish = {
  swim: () => {}
}
type Bird = {
  fly: () => {}
}
function test(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}

// instanceof 语法下的类型收窄
function test1(params: Date | string) {
  if (params instanceof Date) {
    return params.getTime()
  }
  return params.toUpperCase()
}

// 自定义函数如何实现类型收窄呢？
// isFish 如果定义后面的返回值为 boolean, 后面 test2函数无法得知是哪种类型，会报错
// animal is Fish 叫做 类型陈述语法
function isFish(animal: Fish | Bird): animal is Fish {
  if ((animal as Fish).swim) {
    return true
  }
  return false
}
function test2(animal: Fish | Bird) {
  if (isFish(animal)) {
    return animal.swim()
  }
  return animal.fly()
}
```

## 12: 复杂函数类型补充学习

### 有属性的函数类型定义方法

```typescript

interface FunctionWithAttributes {
  attr: string
  (str: string): void
}

const test3: FunctionWithAttributes = (str: string) => {
  console.log(str)
}
test3.attr = 'attributes'
```

### 构造函数的类型如何定义

```typescript
interface ClassWithConstructor {
  new (str: string): void
}

function testOne(outerClass: ClassWithConstructor) {
  const instance = new outerClass('new')
}

class TestOne {
  name: string
  constructor(str: string) {
    this.name = str
  }
}

testOne(TestOne) 
```

### 如何写 Date 的类型

> Date 类型支持 new Date() 也支持 Date(string)

```typescript
interface DateType {
  new (): Date
  (dateString: string): string
}
```

### 函数和泛型

```typescript
function getArrayFirstItem<Type>(arr: Type[]) {
  return arr[0]
}

const numberArr = [1, 2, 3, 4]
const resultOne = getArrayFirstItem(numberArr)

const stringArr = ['1', '2', '3', '4']
const stringOne = getArrayFirstItem(numberArr)
```

### 函数重载

```typescript
// 重载函数的定义
function getString(str: string): string
function getString(str: string, str1: string): number
// 重载函数的实现
function getString(str: string, str1?: string) {
  if (typeof str1 === 'string') {
    return (str + str1).length
  }
  return str
}
```

## 13：对象类型的补充学习

### 对象类型和对象解构语法要分离

```typescript
function showPerson({ name: nick = '孙悟空', age: old = 20, }: {
  name: string
  age: number
}) {
  console.log(nick)
  console.log(old)
}
```

### interface 中的 readonly 属性

```typescript
interface Person {
  readonly name: string
  age: number
}
const dell: Person = { name: '孙悟空', age: 30 }
// 这里就会报错：Cannot assign to 'name' because it is a read-only property.
dell.name = '猪八戒' 
```

### 如何给对象扩展属性

```typescript
interface ArrayOrObject {
  length: number
  [key: string]: string | number
}
const obj: ArrayOrObject = {
  length: 0,
  a: '123',
  b: 123,
}
```

### 对象类型的继承

```typescript
interface Animal {
  name: string
  age: number
  breath: () => void
}

const animal: Animal = {
  name: 'panda',
  age: 1,
  breath: () => {},
}

interface Dog extends Animal {
  bark: () => void
}
const dog: Dog = {
  name: 'wangcai',
  age: 1,
  breath: () => {},
  bark: () => {},
}
```

### 多个对象类型同时进行继承

```typescript
interface Circle {
  radius: number
}

interface Colorful {
  color: string
}

interface ColorfuleCircle extends Circle, Colorful {}

const colorfuleCircle: ColorfuleCircle = {
  radius: 1,
  color: 'red',
}
```

### 交叉类型

> 更推荐上面的 interface 来实现

```typescript
type ColorfuleCircleOne = Circle & Colorful
const colorfuleCircleOne: ColorfuleCircleOne = {
  radius: 3,
  color: 'blue',
}
```

## 14：泛型数组与元组(上)

### 泛型

```typescript
interface Box<Type> {
  content: Type
}

const box: Box<string> = { content: 'box' }
const box1: Box<number> = { content: 100 }
const box2: Box<boolean> = { content: true }
```

### 使用泛型类来扩展生成新的类型

```typescript
type orNull<Type> = Type | null
const test4: orNull<string> = '111'
const test5: orNull<string> = null

type oneOrMany<T> = T | T[]
const test6: oneOrMany<string> = ['123']
const test7: oneOrMany<string> = '123'

// 多层传递组合
type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>
const test8: OneOrManyOrNull<string> = null
const test9: OneOrManyOrNull<string> = '123'
const test10: OneOrManyOrNull<string> = ['123']
```

## 15：泛型数组与元组(下)

### 数组和泛型

```typescript
interface SelfArray<T> {
  [key: number]: T
  length: number
  pop(): T | undefined
  push(...items: T[]): number
}
const NumberArr: Array<number> = [1, 2, 3, 4]
const test11: SelfArray<number> = [2, 3, 4, 5]
```

### 数组的 readOnly 修饰符

```typescript
function doStuff(arr: readonly string[]) {
  arr.slice()
  // 使用push 会改变原数组，ts 会报错
}
```

### 元组

```typescript
type Tuple = [number, string]
const tuple: Tuple = [1, '2']

type Tuple = [number, string]
const tuple: Tuple = [1, '2']

type PointTest = [number, number]
function getPointTest([x, y]: PointTest) {
  return x + y
}
const point: PointTest = [1, 2]
getPointTest(point)

// 元组也是支持 readonly 修饰符的
```

## 16：泛型中使用extends和keyof语法

### 泛型中使用 extends

> 可以用来解决固定参数传递需求

```typescript
interface Peroson {
  name: string
}
function getName(person: Peroson) {
  return person.name
}
getName({ name: '孙悟空' })
getName({ name: '孙悟空', age: 100 }) // 就会报错

// 可以进行如下修改
function getNameNew<T extends Peroson>(person: T) {
  return person.name
}
getNameNew({ name: '孙悟空' })
getNameNew({ name: '孙悟空', age: 100 }) // 不会报错
```

### 泛型中使用 keyof

```typescript
interface Teacher {
  name: string
  age: number
  sex: 'male' | 'female'
}
const teacher: Teacher = {
  name: '唐僧',
  age: 100,
  sex: 'male',
}
function getTeacherInfo<T extends keyof Teacher>(teacher: Teacher, key: T) {
  return teacher[key]
}

getTeacherInfo(teacher, 'def') // 这里乱写就会报错，只能是 Teacher 类型的 key 值
getTeacherInfo(teacher, 'name')
```

## 17: 高阶知识点：条件类型(上)

>条件类型: 是根据条件，生成一个新的类型

```typescript
interface AnimalTest {
  breath: () => {}
}
interface DogTest extends AnimalTest {
  bark: () => {}
}
interface Tank {
  ph: number
}

type Example = Dog extends Animal ? string : number
```

### 使用条件类型的例子

#### 使用函数重载来实现

```typescript
interface IdLable {
  id: number
}
interface NameLabel {
  name: string
}
// 当然使用函数重载一样可以实现，不过比较麻烦，如下
// 如果将来在多一个 boolean 类型的参数，需要增加定义以及实现
function createLabel(key: string): IdLable
function createLabel(key: number): NameLabel
function createLabel(key: string | number): IdLable | NameLabel {
  if (typeof key === 'string') {
    return { name: key }
  }
  return { id: key }
}
const label = createLabel('孙悟空')
```

#### 使用泛型

> 使用条件类型，可以让我们的函数重载的语法更加简炼

```typescript
type IdOrNameLable<T> = T extends number ? IdLable : NameLabel
function createLabel<T extends string | number>(key: T): IdOrNameLable<T>
function createLabel(key: string | number): IdLable | NameLabel {
  if (typeof key === 'string') {
    return { name: key }
  }
  return { id: key }
}
const labelString = createLabel('孙悟空')
const labelNumber = createLabel(1122)
```

## 18：高阶知识点: 条件类型(下)

### 条件类型其他的应用场景

```typescript
type TypeOfMessageOf<T> = T extends { message: unknown } ? T['message'] : never
type Message = TypeOfMessageOf<{ message: string }> // 此时 Type Message 是 string 类型
type Messag1 = TypeOfMessageOf<string> // 此时 Type Message1 是 never 类型
```

如果不使用条件类型时，有如下代码

> 如下代码中，Email 和 EmailMessage 中的 message 类型有重复，那么该如何优化呢？

```typescript
interface Email {
  from: string
  to: string
  message: string
}
type EmailMessage = string

const emailObject: Email = {
  from: 'from@qq.com',
  to: 'to@qq.com',
  message: 'hello i send a message to you',
}
const email: EmailMessage = 'hello it is a message'
```

如果使用条件类型，就可以进行如下优化

```typescript
type TypeOfMessageOf<T> = T extends { message: unknown } ? T['message'] : never
interface Email {
  from: string
  to: string
  message: string
}

const emailObject: Email = {
  from: 'from@qq.com',
  to: 'to@qq.com',
  message: 'hello i send a message to you',
}
// 这里使用泛型，最终结果 email 类型是 string 类型
const email: TypeOfMessageOf<Email> = 'hello it is a message'
```

其他使用场景

例子1：

```typescript
type GetReturnType<T> = T extends (...args: never[]) => infer ReturnType
  ? ReturnType
  : never

type ExampleType = GetReturnType<() => string> // 推断出 ExampleType 是 string
type ExampleType2 = GetReturnType<string> // 推断出 ExampleType 是 never
```

例子2：

```typescript
type ToArray<Type> = Type extends any ? Type[] : never
type StringArray = ToArray<string> // 推断出 StringArray 类型是 string[]
type StringArray1 = ToArray<string | number> // 推断出 StringArray1 类型是 number[] | string[]
type StringArrray2 = ToArray<never> // 推断出 StringArray2 类型是 never
```

例子3：

```typescript
type ToArrayTest<T> = [T] extends [any] ? T[] : never
type StringOrNumberArray = ToArrayTest<string | number> // 推断出 StringArray 类型是 (string | number)[]
```

## 19: 高阶知识点映射类型

### 基础映射类型

#### 过滤修饰符

```typescript
interface User {
  readonly name: string
  readonly age: number
}

type FilterReadOnly<T> = {
  -readonly [Property in keyof T]: T[Property] // 前面通过 -readonly 变只读为可修改
}

// 此时 PublicUser 中的name、age被过滤掉了 readonly 修饰符
type PublicUser = FilterReadOnly<User> 
const publicUser: PublicUser = { name: '孙悟空', age: 500 }
publicUser.name = '猪八戒'
```

#### 变可选为必选项

```typescript
interface User {
  readonly name: string
  readonly age: number
  male?: boolean
}

type FilterReadOnly<T> = {
  -readonly [Property in keyof T]-?: T[Property] // 后面可以使用 -? 来变可选为 必选
}

type PublicUser = FilterReadOnly<User> // 此时 PublicUser 中的name、age被过滤掉了 readonly 修饰符
const publicUser: PublicUser = { name: '孙悟空', age: 500, male: true }
publicUser.name = '猪八戒'
```

### 高级映射类型语法

```typescript
interface User {
  name: string
  age: number
  male: boolean
}

type DeleteMaleProperty<T> = {
  [Property in keyof T as Exclude<Property, 'male'>]: T[Property]
}

type UserWithoutGender = DeleteMaleProperty<User> // 类型目前是 { name: string, age: number }
const user: UserWithoutGender = { name: '孙悟空', age: 500 }
```

例子2：字面量语法例子

```typescript
interface User {
  name: string
  age: number
  male: boolean
}

// 想要构建如下的类型，
// interface UserFunctions {
//   getName: () => string
//   getAge: () => number
//   getMale: () => boolean
// }

//Capitalize: 转换字符串字面量的第一个字母为大写字母
type GetPropertyFunctions<T> = {
  [Property in keyof T as `get${Capitalize<string & Property>}`]: () => T[Property]
}

type UserFunctions = GetPropertyFunctions<User> // 此类型就是想要的
```

例子3：union 类型使用

```typescript
type SquareEvent = {
  kind: 'square'
  x: number
  y: number
}

type CircleEvent = {
  kind: 'circle'
  radius: number
}

type GenerateEventsFunctions<T extends { kind: string }> = {
  [Event in T as Event['kind']]: (event: Event) => void
}

type NewType = GenerateEventsFunctions<SquareEvent | CircleEvent>
// 此时 NewType 类型为 { square: (event: SquareEvent) => void; circle: (event: CircleEvent) => void; }
```

## 20：类的定义与继承

### 类

```typescript
class PersonTest {
  name: string = '孙悟空'
  getName() {
    return this.name
  }
}
const person = new PersonTest()
console.log(person.getName())

```

### 继承

```typescript
class PersonTest {
  name: string = '孙悟空'
  getName() {
    return this.name
  }
}
class Teacher extends PersonTest {
  getTeacherName() {
    return '唐僧'
  }
  // 也可以对同名方法进行重写
  getName() {
    const name = super.getName() + '和' + '金蝉子'
    return name
  }
}

const teacherTest = new Teacher()
console.log(teacherTest.getName())
console.log(teacherTest.getTeacherName())
```

## 21: 类中的访问类型和构造器

### 访问类型

* public: 允许在类的内外(父类、子类)被调用
* private: 允许在类内(父类)被使用
* protected: 允许在类内(父类)及继承子类中使用

### 构造器

```typescript
class PersonTestTwo {
  //  传统写法
  // public name: string
  // constructor(name: string) {
  //   this.name = name
  // }
  // 简化写法
  constructor(public name: string) {
    this.name = name
  }
}
const perosonTestTwo = new PersonTestTwo('猪八戒')
console.log(perosonTestTwo.name)
```

#### 构造器的继承

```typescript
class PersonTwo {
  constructor(public name: string) {}
}

class TeacherTestTwo extends PersonTwo {
  constructor(public age: number) {
    super('teacher')
    this.age = age
  }
}
const teacherTestTwo = new TeacherTestTwo(28)
console.log(teacherTestTwo.name)
console.log(teacherTestTwo.age)
```

## 22：静态属性Setter和Getter

```typescript
class PersonTestThree {
  constructor(private _name: string) {}
  get name() {
    return '我的名字' + this._name
  }
  set name(value: string) {
    const realName = value.split(' ')[0]
    this._name = realName
  }
}
const personTestThree = new PersonTestThree('孙悟空')
console.log(personTestThree.name)
personTestThree.name = 'hello world'
console.log(personTestThree.name)
```

创建一个单例模式的类

```typescript
class Demo {
  private static instance: Demo

  private constructor(public name: string) {}

  // static 类属性
  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo('孙悟空')
    }
    return this.instance
  }
}

const demo1 = Demo.getInstance()
const demo2 = Demo.getInstance()
const demo3 = Demo.getInstance()
console.log(demo1 === demo2, demo2 === demo3)
```

## 23: 抽象类

```typescript
abstract class Geom {
  getType() {
    return 'Gemo'
  }
  // 子类必须实现这个方法
  abstract getArea(): number
}

class CircleShap extends Geom {
  getArea(): number {
    return 123
  }
}
class SquareShap extends Geom {
  getArea(): number {
    return 345
  }
}
```

