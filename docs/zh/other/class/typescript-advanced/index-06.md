# 06-深入 TS“ 三板斧”—类型守卫，类型转换，自定义守卫+真实应用场景

## 01：本章概述

* 类型守卫
* 类型转换
* 类型守卫相关：typeof 局现性和替代方案
* 类型守卫+应用
* 自定义守卫
* 自定义守卫晋级

## 02：类型断言、类型转换、应用场景

### 类型断言

语法格式： A 数据类型的变量 as B 数据类型

```typescript
let b:B
let c:C = b as C
```

**理解：**是绕过 TS 编译检查，类型断言就是对编译器说：我就是这个类型了，无序检查

### 类型断言使用场景

### 类型转换

> 编译器强制一个类型转换为另外一个类型

```typescript
 // 使用<>运算符进行类型转换
let a: typeA;
let b = <typeB>a;

let input = <HTMLInputElement>document.querySelector('input[type=text]');
console.log(input.value);
```

## 03: 类型守卫相关 JS ：typeof 局限性和替代方案【常见面试题】

### typeof 作用

> typeof 用来检测一个变量或者一个对象的数据类型

### typeof 检测范围

> typeof 检测变量的类型范围包括：string | number | bigint | boolean | symbol | undefined | object | function 等数据类型

```typescript
const arr = [30, 50]
console.log(typeof arr) // object
const set = new Set()
console.log(typeof set) // object
const map = new Map()
console.log(typeof map) // object

console.log(Object.prototype.toString.call(arr)) // [object Array]
console.log(Object.prototype.toString.call(set)) // [object Set]
console.log(Object.prototype.toString.call(map)) // [object Map]
```

## 04：深入类型守卫和企业项目中的真实应用场景

### 为什么要使用类型守卫

**类型守卫定义: **在语句的块级作用域【if语句或者条目运算表达式内】缩小变量的一种类型推断的行为

**类型守卫产生时机：**条件语句中遇到下列条件关键字时，会在语句的块级作用域内缩小变量的类型，这种类型推断的行为成为**类型守卫（Type Guard）**.类型守卫可以帮助我们在块级作用域中获得更为需要的精确变量类型

* 实例判断：`instanceof`
* 属性或者实例方法判断：`in`
* 类型判断：`typeof`
* 字面量相等判断：`==`、`===`、`!=`、`!==`

## 05：TS 自定义守卫和2个真实应用场景

### 自定义类型守卫格式

```typescript
function 函数名(形参：参数类型[参数类型大多为any]) :形参 is A类型{
  return true or false
}
```

```typescript
function isNum(num: any): num is number {
  return typeof num === 'number'
}
```

## 06：自定义守卫晋级：Vue3 源码中的自定义守卫

```typescript
export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef<r:any>:r is Ref{
  return Boolean(r && r.__v_isRef === true)
}
```

## 07：面试题：自定义守卫如何判断 promise 类型

```typescript
function isPromise(value: any): value is Promise<any> {
   return value instanceof Promise;
}
```

