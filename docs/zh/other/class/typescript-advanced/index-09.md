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

## 09：高级类型——Extract 和它的真实应用

```typescript
// type Extract<T, U> = T extends U ? T : never;
type TestExtract = Extract<string, string | number> // type TestExtract = string
type TestExtract2 = Extract<string | number, string | number> // type TestExtract2 = string | number
type TestExtract3 = Extract<string | number | boolean, string | number> // type TestExtract3 = string | number
```

## 10: TS 高级类型——Exclude 和它的真实应用

```typescript
// type Exclude<T, U> = T extends U ? never : T;
type TestExclude = Exclude<string, string | number> // type TestExclude = never
type TestExclude2 = Exclude<string | number, string | number> // type TestExclude2 = never
type TestExclude3 = Exclude<string | number | boolean, string | number> // type TestExclude3 = boolean
```

## 11：技巧性解决 keyof 不能直观看到结果的问题

````typescript
interface Customer {
  name: string
  degree: number
  phone: string
}

type Keys = keyof Customer // type Keys = keyof Customer 这里不能直观的看到类型结果
// 解决办法
type DirectKeys<T> = T extends any ? T : never
type KeysNew = DirectKeys<keyof Customer> // type KeysNew = "name" | "degree" | "phone"
````

## 12：Record 类型和 Record 类型存在的意义

> Record 第一个参数类型只支持 string、number、address 三种
>
> keyof any 在 ts 中会被自动解析为 string | number | symbol 三种类型，无需理解，记住即可
>
> [P in K] 第一个参数类型遍历

```typescript
/**
  type Record<K extends keyof any, T> = { [P in K]: T };
  type Record<K extends string | number | symbol, T> = { [P in K]: T; }
*/
function addObj(obj: Record<'name' | 'age' | 'address', string | number>) {}

addObj({ name: '猪八戒', age: 23, address: 111 })
```

## 13：Record 经典实战应用准备——isPlainObject 类型

## 14：Record 完成包含无穷级或数组或对象的对象深拷贝+作业

```typescript
type BaseType = string | number | boolean
function deepCopy(data: Record<string, any> | BaseType) {
  ...
}

deepCopy({ name: '猪八戒' })
deepCopy([1, 2, 23, 3])

function isPlainObject(data: Record<string, any>) {
  return Object.prototype.toString.call(data) === '[object object]'
}
```

## 15: 扩展：Record 和 Map 对比

1. Record 是属于一个轻量级的 type 类型,Map 相对 Record 是重量级。 

2. Map 不能像 Record 一样直接转换为普通的对象，来应对只有查询的实际问题，只是为了频繁的查询去 new 一个 Map 是 一种不必要的浪费。 

3. 如果读取数据和显示数据频繁，就应该采用 Record。 
4. 如果增删改比较多，那还是使用 Map。 

## 16: 视频作业：Record 扁平化的子数组对象

### 作业

```typescript
interface Todo {
  title: string
  completed: boolean
  description: string
}

let todoList: Todo[] = [
  {
    title: '开发权限模块',
    completed: true,
    description: '使用 Vue3 + Ts 开发',
  },
  {
    title: '年会',
    completed: false,
    description: '12月29日上午',
  },
]
// 想要的实现效果如下
const pickTodoList = {
  开发权限模块: {
    title: '开发权限模块',
    completed: true,
  },
  年会: {
    completed: false,
    title: '年会',
  },
}
```

### 代码实现

```typescript

```

## 17: TS 更多重要的高级类型——抓取属性类型

> Pick 主要用于抓取 type 类型、接口、类中的属性组成一个新的对象类型

```typescript
interface Book {
  ISBN: string
  book_name: boolean
  book_price: string
  store_count: number
  publish: string
}

class Customer {
  name!: string
  age!: number
}

/**
 * 
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  */

type SubBook = Pick<Book, 'ISBN' | 'book_name' | 'book_price'>
// 推导出 type SubBook = { ISBN: string, book_name: boolean, book_price: string }
type SubCustmer = Pick<Customer, 'name'>
// 推导出 type SubCustmer = { name: string }
```

## 18: TS 映射类型的高级玩法

> 上一节中，我们使用 Pick 从对象或者类中抓取出符合想要的属性以及值类型，假如想要摘取的属性过多，我们就想有没有一种排除语法，排除掉其中几个，剩余的我们都要抓取。如何操作呢，代码如下

```typescript
interface Book {
  ISBN: string
  book_name: boolean
  book_price: string
  store_count: number
  publish: string
}

type TestOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
type MyOmit = TestOmit<Book, 'ISBN' | 'book_price'>
// type MyOmit = { book_name: boolean, store_count: number, publish: string }
```

优化

上面代码 `P extends K ? never : P`很像 `Exclude`的作用，可以进行优化如下

```typescript
interface Book {
  ISBN: string
  book_name: boolean
  book_price: string
  store_count: number
  publish: string
}

type TestOmit<T, K extends keyof T> = {
  // [P in keyof T as P extends K ? never : P]: T[P]
  [P in keyof T as Exclude<P, K>]: T[P]
}
type MyOmit = TestOmit<Book, 'ISBN' | 'book_price'>
// type MyOmit = { book_name: boolean, store_count: number, publish: string }
```

## 19: Record, Capitalize, Exclude，映射类型，函数约束综合真实应用-1

### 问题

> 需求：把 add 变为 doAdd, del 变为 doDel 。。。

```typescript
interface Todo {
  title: string
  completed: boolean
  description: string
  add(): number
  del(): number
  upt(): number
}
```

### 代码实现步骤

```typescript
// 1. 获取 TODO 函数
type Degree<T> = {
  [P in keyof T as T[P] extends Function ? P : never]: T[P]
}
// type DegreeTodo = Degree<Todo>
// 推导出 type DegreeTodo = { add: () => number; del: () => number; upt: () => number }
// 2. 模板字符
type DegreeTwo<T> = {
  [P in keyof T as T[P] extends Function ? `do${P & string}` : never]: T[P]
}
type DegreeTodoTwo = DegreeTwo<Todo>
// 推导出 type DegreeTodoTwo = { doadd: () => number,dodel: () => number, doupt: () => number}

// 3. 首字母大写
type DegreeThree<T> = {
  [P in keyof T as T[P] extends Function
    ? `do${Capitalize<P & string>}`
    : never]: T[P]
}

type DegreeTodoThree = DegreeThree<Todo>
// type DegreeTodoThree = { doAdd: () => number, doDel: () => number, doUpt: () => number }
```

### 代码合并优化

```typescript
type Degree<T> = { 
  [P in keyof T as T[P] extends Function ? `do${Capitalize<P & string>}` : never]: T[P] 
}
type DegreeTodo = Degree<Todo>
// type DegreeTodoThree = { doAdd: () => number, doDel: () => number, doUpt: () => number }
```

## 20: Record, Capitalize, Exclude，映射类型，函数约束综合真实应用-2

> 上节代码中我们对 T 的类型没有做限制，可以传递任意类型

### 发现问题

````typescript
type Degree<T> = {
  [P in keyof T as T[P] extends Function
    ? `do${Capitalize<P & string>}`
    : never]: T[P]
}
// 对于数组类型，会展开数组类型原型的所有方法
type TestArr = Degree<Array<any>>

/**
 * 推导结果如下：
type TestArr = {
  doToString: () => string;
  doToLocaleString: () => string;
  doPop: () => any;
  doPush: (...items: any[]) => number;
  ...
}
 */
````

### 优化代码

```typescript
type Exc<T> = Exclude<T, Array<any>>
type Degree<T> = {
  [P in keyof Exc<T> as Exc<T>[P] extends Function
    ? `do${Capitalize<P & string>}`
    : never]: Exc<T>[P]
}

type TestArr = Degree<Array<any>>
// 推导结果: type TestArr = {}
```

## 21: 一个有点诡异的复杂映射类型的重要应用

### 问题

```typescript
type TestMouseEvent = {
  eventType: 'click'
  x: number
  y: number
}
type TestKeyEvent = {
  eventType: 'keyUp'
  key: number
}
// 如何实现 EventFunctions
type EventRec = EventFunctions<TestMouseEvent | TestKeyEvent, 'eventType'>
// 推导结果如下：
/*
  type EventRec = {
    click: (event: TestMouseEvent) => any
    keyUp: (event: TestKeyEvent) => any
  }
*/
```

### 代码实现

```typescript
type EventFunctions<
  Events extends Record<string, any>,
  EventKey extends keyof Events,
> = {
  [Event in Events as Event extends Events ? Event[EventKey] : never]: (
    event: Event,
  ) => any
  // [Event in Events as Event[EventKey]]: (event: Event) => any
}
type EventRec = EventFunctions<TestMouseEvent | TestKeyEvent, 'eventType'>
// 推导结果如下：
/*
  type EventRec = {
    click: (event: TestMouseEvent) => any
    keyUp: (event: TestKeyEvent) => any
  }
*/
```

## 22: 一个有点诡异的复杂映射类型的重要应用【其他更多理解】

## 23: TS 三个实用的高级辅助类型

### Required：可选项变为必选项

```typescript
interface Todo {
  readonly title: string
  completed: boolean
  description: string
  date?: Date
  publishers?: string // 发言人
}

/**
 * Make all properties in T required
 
  type Required<T> = {
      [P in keyof T]-?: T[P];
  };
 */

type TodoRequired = Required<Todo>
/*
-? 可选项目变为 必选项
推导结果如下，
type TodoRequired = {
  readonly title: string;
  completed: boolean;
  description: string;
  date: Date;
  publishers: string;
}
 */
```

### Partial

```typescript
// Make all properties in T optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

```typescript
type TodoRequired = Partial<Todo>
/*
-? 可选项目变为 必选项
推导结果如下，
  type TodoRequired = {
    readonly title?: string | undefined;
    completed?: boolean | undefined;
    description?: string | undefined;
    date?: Date | undefined;
    publishers?: string | undefined;
  }
*/
```

### Readonly

```typescript
// Make all properties in T readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}
```

```typescript
type TodoRequired = Readonly<Todo>
/*
-? 可选项目变为 必选项
推导结果如下，
  type TodoRequired = {
    readonly title: string;
    readonly completed: boolean;
    readonly description: string;
    readonly date?: Date | undefined;
    readonly publishers?: string | undefined;
  }
*/
```

## 24: TS 高级类型视频作业：一个大中项目非常实用的复杂实战题

### 问题

```typescript
const arr = [
  {
    stuNo: 100,
    stuName: '孙悟空',
    teacherNo: 500,
    teacherName: '菩提祖师',
  },
  {
    stuNo: 200,
    stuName: '猪八戒',
    teacherNo: 300,
    teacherName: '黎山老母',
  },
  {
    stuNo: 50,
    stuName: '金蝉子',
    teacherNo: 500,
    teacherName: '如来佛祖',
  },
]

getSubItemsFromArr(arr, 'stuNo', 'stuName')
// 实现 getSubItemsFromArr， 获得 'stuNo', 'stuName' 的属性值组成的新对象数组
```

### 代码实现

```typescript
```



## 25: 作业：百度复杂面试题



## 26: 本章总结

### 诸多重要的 TS 高级类型语法

1. infer: infer、在 Vue3 源码中的 infer 应用
2. 类型体操：类型体操（类型递归），in keyof
3. 条件类型：条件类型，条件类型的复杂应用
4. in keyof 实战中的应用
5. TS 高级类型：Extract、Exclude、Record、Pick、Omit、Capitalize
6. 映射类型： in 
7. 诡异的复杂映射机制
8. TS 高级辅助类型：ReadOnly Required Paritial
