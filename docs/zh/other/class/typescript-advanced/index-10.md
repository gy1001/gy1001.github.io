# 10: TS 声明文件，TS 模块

## 01: 为什么要用声明文件？

### 为什么要使用声明文件

1. 如果文件使用 TS 编写，在编译成 JS 文件时可以自动生成声明文件，并在发布的时候将 .d.ts 文件一起发布，我们无需编写声明文件
2. 当我们在 TS 文件中引入使用第三方库的类型或者使用集成库时，比如 axios 库，ES6 的 Map 类型，这些库用 JS 开发，不能获取 TS 一样的类型提示，需要一个声明文件来帮助库的使用者来获取库的类型提示

**声明文件只针对类型定义，不能进行赋值和实现**

## 02：如何感知声明文件存在的意义

## 03: 声明文件实现+作业

定义和使用声明文件

```typescript
// 定义 declare 表示 声明的意思，我们可以用它做出各种声明
declare let / const // 声明全局变量
declare funciton  // 声明全局方法
declare class // 声明全局类
declare enum // 声明全局枚举变量
declare namespace // 声明全局命名空间（可含有子属性）
interface/type // 声明全局类型
```

```typescript
// jquery.d.ts
declare function $(ready: () => void): void
declare function $(selector: string): CssSelector
type CssSelector = {
  css: (key: string, value: string) => this
}

// xx.ts
$(function () {})
$('div').css('border', '1px red solid').css('width', '100px')
```

## 04：一个很重要的细节问题

## 05：正确理解 declare 和相关细节

- **declare** 可以去掉，可以不去掉，但是 **tsconfig.json** 中的配置 **skipLibCheck** 默认是 **true**. 如果改为**false**,就会报错：**d.ts** 文件中的顶级声明必须以 **declare** 或者 **export** 修饰符开头（export 后面的函数就**不支持**函数重载了）
- **type、interface** 也是可以使用 **declare** 的，也可以不加，建议不用加

## 06：命名空间和嵌套命名空间在声明文件中的使用

> 使用命名空间，防止重名

```typescript

```

## 07：用模块声明定义声明文件，理解优势

## 08：如何在 TS 中引入 js 文件
