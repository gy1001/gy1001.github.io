# 10-【练兵场-TypeScript快速进阶】掌握企业级开发的

## 01: TypeScript 介绍和优势

* JS 的超集，JS 有的TS都有，能运行jS 的就能运行 TS
* 强大的类型系统提升了代码的阅读星、可维护性
* 类型推断、类型检查、代码提示
* 有助于在团队中推动严格的代码检查

## 02: TS 的安装和项目配置

* 安装TS

  ```bash
  npm install --save-dev typescript
  ```

* 生成 tsconfig.json

  ```bash
  tsc --init
  ```

* 安装类型声明（众多）

  ```bash
  npm install --save-dev @types/react @types/react-native
  ```

## 03: number、string、boolean三大基础类型

* 数值类型：number
* 字符串类型：string
* 布尔类型：boolean

```ts
const num: number = 10; 
const floatNum: number = 3.14; 
const str: string = "Hello, World!"; 
const bool: boolean = true; 
```

## 04: 数组、元组、枚举类型的使用

* 数组类型：Array
* 元组类型
* 枚举类型

```typescript
const numbers: number[] = [1, 2, 3, 4, 5]; 

const person: [string, number] = ["张三", 25]; 

enum Color { Red, Green, Blue } 
const color: Color = Color.Red; 
```

## 05: 函数类型

* 基础的函数声明
* 函数的参数类型和返回值类型声明
* 函数的可选参数和默认参数

```typescript
type AddFunc = (a: number, b: number) => number;

const add: AddFunc = (a, b) => a + b;
const result = add(1, 2);

function add_numbers(a: number, b: number): number {
  return a + b;
}
// 可选参数
function printMessage(message: string, optionalParam?: number) {
 if (optionalParam) {
   console.log(optionalParam);
 }
 console.log(message);
}
printMessage("Hello, World!"); 
printMessage("Hello, World!", 123); 
// 默认参数
function calculateSum(a: number, b: number = 0) {
 	return a + b;
}
const sum = calculateSum(10); 
const sumWithDefaultValue = calculateSum(10, 5); 
```

## 06: 类型文件和命名空间

> TypeScript 类型文件是以 `.ts` 扩展名结尾的文件，其中包含 TypeScript 代码。类型文件可以包含类、接口、函数、变量等类型定义，以及对这些类型的使用。
>
> 1. 类型文件的主要目的是定义和声明代码中的类型，以便在其他地方可以使用这些类型。通过将类型定义放在单独的类型文件中，可以更好地组织和管理代码，并提供更好的可读性和可维护性。
>
>    例如，你可以创建一个名为 `math.ts` 的类型文件，其中定义了一些数学相关的类型和函数。
>
> 2. 命名空间（Namespaces）：
>
>    命名空间是一种用于组织代码的方式，它将相关的类型、函数和变量组合在一起，并通过命名行访问和引用。
>
>    在 TypeScript 中，你可以使用命名空间来创建一个上下文或范围，以便更好地组织和管理代码。命名空间可以通过使用 `namespace` 和 `export` 关键字来定义。
>
>    例如，你可以创建一个名为 `MyNamespace` 的命名空间，并在其中定义一些相关的类型和函数。

```typescript
// 类型文件 比如 math.ts
namespace Math {
 export interface Vector2 {
   x: number;
   y: number;
 }

export function addVectors(a: Vector2, b: Vector2): Vector2 {
   return {
     x: a.x + b.x,
     y: a.y + b.y
   };
 }
}
```

