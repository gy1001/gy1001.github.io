# 09- 在真实应用中深入掌握 TS 高阶技能

## 01:infer——深入 infer 和 infer 的三种应用

### infer 的定义

> infer 表示在 extends 条件语句中以占位符出现的等到使用时才推断出来的数据类型

### 第一种用法：引用函数参数类型

```typescript
// 第一种用法啊
type CusFn = (params: Customer) => string
// 下面的 infer P 表示引用 params: Customer 中的 Customer 类型
type CustParaType = CusFn extends (param: infer P) => number ? P : CusFn // type CustParaType = (params: Customer) => string
type CustParaType2 = CusFn extends (param: infer P) => any ? P : CusFn // type CustParaType2 = Customer
```

### 第二种用法：引用函数返回采数类型

```typescript
// 第二种用法
type CusFn2 = (params: Customer) => string
// 这里的 infer P 表示引用 返回值的类型 string
type CustParaType3 = CusFn2 extends (param: any) => infer P ? P : CusFn2 // type CustParaType3 = string
type CustParaType4 = CusFn2 extends (param: infer P) => any ? P : CusFn2 // type CustParaType4 = Customer
```

### 第三种用法：泛型上的使用

```typescript
interface Customer {
  custname: string
  buymoney: number
}

type CusFn = (params: Customer) => string
type ParamsType<T> = T extends (params: any) => infer R ? R : never
type CustParaType = ParamsType<CusFn> // type CustParaType = string

type EleOfArr<T> = T extends Array<infer P> ? P : never
type EleOfArrTest = EleOfArr<Array<string>> // type EleOfArrTest = string
type EleOfArrTest2 = EleOfArr<Array<{ name: string; age: number }>> // type EleOfArrTest = { name: string,age: number }
```

## 02：视频作业 infer 在集合种的应用

```typescript
class Subject {
  constructor(public subid: number, public subname: string) {}
}

let chineseSubject = new Subject(100, '语文')
const mathSubject = new Subject(101, '数学')
const englishSubject = new Subject(101, '英语')
const setZhangSanSubject = new Set([chineseSubject, mathSubject]) // 此时推导出 const setZhangSanSubject: Set<Subject>
```

那么如何使用 infer 来推导出 Subject 类型？？？？？？ 解法如下

```typescript
type zhangSanType = typeof setZhangSanSubject // type zhangSanType = Set<Subject>
type inferSetType<T> = T extends Set<infer P> ? P : unknown
type setType = inferSetType<zhangSanType> // type setType = Subject
```

## 03：infer 进阶——Vue3 源码中的 infer 在响应数据的解套应用

```typescript
export function unref<T>(ref: T): T extends Ref<infer V> ? V : T {
  return isRef(ref) ? (ref.value as an) : ref
}

unref( ref(3) ) // 3
unref( { age: 23 } ) // { age: 23 }
```

## 04: 类型体操准备——Vue3 源码中的复杂类型体操准备：先理解 in keyof

```typescript
interface Customer {
  name: string
  degree: number
  phone: string
}
type CustKeyValsType = {
  [P in keyof Customer]: Customer[P]
}
/**
 * 推导出
 * type CustKeyValsType = {
    name: string;
    degree: number;
    phone: string;
}
 */
```

## 05: 类型体操——深入 Vue3 源码中的类型体操

```typescript
// 如果泛型变量T是ComputedRef的'子集'，那么使用UnwrapRefSimple处理infer指代的ComputedRef泛型参数V
// 否则进一步判断是否为Ref的'子集'，进一步UnwrapRefSimple
export type UnwrapRef<T> = T extends ComputedRef<infer V>
  ? UnwrapRefSimple<V>
  : T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>

// 我是分割线

// 如果T为Function | CollectionTypes | BaseTypes | Ref之一的'子集'，直接返回。
// 否则判断是否为数组的'子集'，不是的话视为object，调用UnwrappedObject
type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref
  ? T
  : T extends Array<any> ? T : T extends object ? UnwrappedObject<T> : T

// 我是分割线
// 调用UnwrapRef，产生递归效果，解决了ts类型递归
type UnwrappedObject<T> = { [P in keyof T]: UnwrapRef<T[P]> } & SymbolExtract<T>
```

如上源码，测试代码如下

```typescript
const urf:UnwrapRef<Ref<string>> //推导出： const urf:string
const urf1:UnwrapRef<string> //推导出： const urf:string
const urf2: UnwrapRef<{ name: Ref<string>, age: Ref<number>  }> // 推导出 const urf2: { name: string, age: number }
```

## 06: TS 条件类型——容易混淆的问题，条件类型的好处

```typescript
type Test = string | number | boolean extends string | number ? string : never // type Test = never

type ConditionType<T> = T extends string | number ? T : never
type TestConditionType = ConditionType<string | number | boolean> // type TestConditionType = string | number
// 原因： 上面的使用时整体一次性比较，后面使用泛型采用的时 逐个进行比较，结果略有差异
```

## 07: 条件类型的复杂应用

给接口增加不确定属性，以及值类型

```typescript
// 第一种
interface Customer {
  name: string
  degree: number
  phone: string
  [key: string]: any
}
```

使用条件类型进行增加

```typescript
interface Customer {
  name: string
  degree: number
  phone: string
}
type AppAttrToObj<T, K extends string, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

type Test = AppAttrToObj<Customer, 'weixn', string> 
// 推导出 type Test = { name: string, weixn: string, degree: number, phone: string }
// 这样原有类型身上就可以添加属性
```

## 08：TS in keyof keyof 在大中项目中的综合实战应用---扁平模块化属性名

### 问题：

对于以下代码

```typescript
type Modules = {
  menu: {
    setActiveIndex: (index: string) => string
    setCollapse: (index: string) => string
  }
  tabs: {
    seteditableTabsValue: (editValue: string) => void
    setTabs: (index: string) => void
    setTabsList: (index: string) => void
  }
}
```

如何书写一种如下类型,使其类型为

```typescript
type GetKeysMenu = "menu/setActiveIndex" | "menu/setCollapse" | "tabs/seteditableTabsValue" | "tabs/setTabs" | "tabs/setTabsList"
```

### 补充知识

> 使用 keyof 获取值类型的联合类型

```typescript
type Person = { id: number; name: string; age: number }
type P2 = Person[keyof Person] // number | string
```

解释：

1. Person['key'] 是查询类型(Lookup Types), 可以获取到对应属性类型的类型； 

2. Person[keyof Person]本质上是执行 Person['id' | 'name' | 'age']； 

3. 由于联合类型具有分布式的特性，Person['id' | 'name' | 'age'] 变成了 Person['id'] ｜ Person['name'] ｜ Person['age']； 

4. 最后得到的结果就是 number | string.

### 代码实现

```typescript
type Modules = {
  menu: {
    setActiveIndex: (index: string) => string
    setCollapse: (index: string) => string
  }
  tabs: {
    seteditableTabsValue: (editValue: string) => void
    setTabs: (index: string) => void
    setTabsList: (index: string) => void
  }
}

// 1. 模板字符类型
type TestMB<T, U> = `${T & string}/${U & string}`
type TestMoBan = TestMB<'menu', 'setActiveIndex' | 'setCollapse'> // type TestMoBan = "menu/setActiveIndex" | "menu/setCollapse"

// 2. 先拿到父模块的属性名
type ModulesSpliceKeys<T> = {
  [Key in keyof T]: T[Key]
}

type TestModulesSpliceKeys = ModulesSpliceKeys<Modules>
// 3. 父子模块联合起来
type ModulesSplceKeys<T> = {
  [Key in keyof T]: TestMB<Key, keyof T[Key]>
}
type TestModulesKeys = ModulesSplceKeys<Modules>
/**
  * 
	type TestModulesKeys = {
    menu: "menu/setActiveIndex" | "menu/setCollapse";
    tabs: "tabs/seteditableTabsValue" | "tabs/setTabs" | "tabs/setTabsList";
  }
*/

// 4. 最后一步，第三步为了更好的理解，
type ModulesSplceKeysNew<T> = {
  [Key in keyof T]: TestMB<Key, keyof T[Key]>
}[keyof T]
// [keyof T]跟在对象后面表示舍弃前面的 key
type GetKeysMenu = ModulesSplceKeysNew<Modules> 
// type GetKeysMenu = "menu/setActiveIndex" | "menu/setCollapse" | "tabs/seteditableTabsValue" | "tabs/setTabs" | "tabs/setTabsList"
```

