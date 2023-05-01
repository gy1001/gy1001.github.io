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



