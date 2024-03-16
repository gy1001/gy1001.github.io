# 65-类型兼容性是关键

在 ts 的开发中，类型兼容性无处不在。

可是大家在学习 ts 时，往往会忽略类型兼容性的重要性。

不理解类型兼容性，就容易在使用时出现很多无法理解的错误。实际使用时，往往需要对各种类型声明进行融合，而要合理的融合，那么类型兼容性就是关键。

## 01-子类型

非常简单的案例，

```typescript
let a = 20
let b = 30

b = a // ✅ ok
```

在实践中，将一个变量，赋值给另外一个变量的场景非常多，因此这里就会涉及到，这两个变量的类型比较问题

如果 a 的类型，无法兼容 b 的类型，那么，这样的赋值就存在风险。

上面的例子中，a 与 b 的类型相同，因此可以相互兼容。

如果稍微调整一下，就会出现错误

```typescript
let a = 20
let b = '500'

b = a // ❌ error
```

错误提示：不能讲 number 类型分配给 string 类型

如果此时，我们将 b 的类型，进行一个扩展，让 b 的类型从 number 变成 `number | string`，就会发现错误消失了

```typescript
let a = 20
let b: number | string = '500'

b = a // ✅ ok
```

因为我们可以将 `number` 类型分配给 `number | string` 类型。

但是反过来就不行，

```typescript
let a = 20
let b: number | string = '500'

a = b // ❌ error
```

原因就是因为 b 的类型可能是一个 string 类型，当其为 string 类型时，就无法分配给 a 的 number 类型。

因此，在这种情况下。**被赋值的类型范围，要大于等于赋值的类型范围。**

此时我们基于这个例子，来探讨一下子类型的概念。

从语义上，我们可以很容易知道，Person 类，是父类，而 Student 类，是子类。因为 Person 类，概念更宽泛。而 Student 类，概念更具体。

因此，更具体的我们称之为子类。也可以称之为我们这里的**子类型。**

那么有如下两个类型

```typescript
type A = number
type B = number | string
```

他们谁是子类型，谁是父类型呢？

概念更宽泛的为父类型，也就是 B 概念更具体的为子类型，也就是 A

从概念范围上来说，我们用 `A <= B` 来表示 A 是 B 的子类型。

在设计模式的章节中，我们学习过里氏替换原则，也可以扩展到我们的类型兼容性里，任何使用父类型的地方，都能够用子类型替换。

因此，我们再来看一下这个例子，`b = a` ，其实就是子类型，替换父类型。也就是说，子类型能够赋值给父类型。反之则不行。

```typescript
let a = 20
let b: number | string = '500'

// 子类型、替换 父类型
b = a
```

再来看一个对象的例子。

首先定义一个数据类型如下

```typescript
interface User {
  id: string
  name: string
  phone: string
  pwd: string
}
```

声明一个变量，该变量的类型为 User，具体赋值的字段对象，要比 User 中的多一个

```typescript
interface User {
  id: string
  name: string
  phone: string
  pwd: string
}

let defUser1 = {
  id: 'xxx1234sd',
  name: '张三',
  phone: '12312312313',
  pwd: '123123',
  age: 20,
}

let defUser2 = {
  id: 'xxx1234sd',
  name: '张三',
  phone: '12312312313',
}

const user: User = defUser1 // ✅ ok
const user2: User = defUser2 // ❌ error
```

在这里我们要根据概念区分谁是父类型，谁是子类型。

从概念上来说，

字段更少的对象，概念更宽泛，为父类型

字段更多的对象，概念更具体，为子类型

因此，`defUser1 <= User <= DefUser2`，defUser1 能够赋值给 User，defUser2 不能赋值给 User。

这里对于子类型与父类型的理解，我们要多思考一下，如果没从概念范围的角度思考清楚，你会觉得好像我们列举的这两个例子明明是反着的，但是结论却又一样，就会很困扰。所以如果没能马上理解，建议回过头多阅读几遍。

## 02-函数类型

函数类型兼容性的理解，是一个难点。

首先我们要明确场景。如下场景，并非是把函数当类型进行比较，本质上仍然是比较的基础类型或对象类型。

```typescript
type Param = { a: number; b: number }

function foo(p: Param) {}

// 试图将父类型赋值给子类型，❌ error
foo({ a: 20 }) //

// 将子类型赋值给父类型， ✅ ok
foo({ a: 20, b: 20, c: 20 })
```

比较函数类型，我们来看一个简单的例子

```typescript
let x = (a: number) => {
  return a + 1
}

let y = (a?: number) => {
  return a ? a + 1 : 0
}

x = y // ✅ ok
y = x // ❌ error
```

函数类型的比较，比的是参数类型与返回值类型。这里返回值类型相同，我们暂时不考虑。参数类型上来看，

```typescript
xP <= yP
```

x 的参数类型是 y 参数类型的子类型。按道理来说，函数 x 应该能够赋值给 y。但是事实上恰好相反。

y 才是 x 的子类型。

```typescript
y <= x
```

这种情况，我们称之为**逆变**。

为什么会出现这种情况呢，我们思考一下。

我们把函数 x 赋值给 y 之后，

那么对于 y 的函数类型来说，是可以接收 `undefined` 作为参数的。

但是，此时 y 的真实函数已经变成了 x。

而 x 的内部实现并没有处理 `undefined`.

因此，把 x 赋值给 y，是一个危险操作。

## 03-泛型

泛型的兼容性问题，最后落点通常情况下在于泛型变量的类型。

```typescript
let p: Array<string> = ['1', '2']
let q: Array<number> = [1, 2]

p = q // ❌ error
```

而当我们调整一下，就可以搞定，让情况符合第一种基础类型，赋值就能成立

```typescript
let p: Array<string | number> = ['1', '2']
let q: Array<number> = [1, 2]

p = q // ✅ ok

// number <= number | string
// 最后是将 number 赋值给 string | number，这是合理的
```

这种 `Comp<T>` 的类型兼容性，和 `T` 的类型兼容保持一致时，我们称之为 **协变**。

泛型还可以有更复杂的区别，我们看看下一个例子

```typescript
interface SuperType {
  base: string
}
interface SubType extends SuperType {
  addition: string
}

let p: SuperType = { base: 'base' }
let c: SubType = { base: 'base', addition: 'hex' }

p = c // ✅ ok
c = p // ❌ error

type Contravariant<T> = (p: T) => void
let pf: Contravariant<SuperType> = function (p) {}
let cf: Contravariant<SubType> = function (p) {}

pf = cf // ❌ error
cf = pf // ✅ ok 逆变
```

这种 `Comp<T>` 的类型兼容性与 `T` 相反的场景，我们称之为**逆变。**

出现这种情况的原因，在于函数的特殊性。这个在上面我们已经分析过，就不在继续分析。

> **双向协变** 指的 `Comp<T>` 类型双向兼容。关于双向协变的理解，我个人认为不用过度解读，在实践中可以通过强制类型的方式来实现双向协变，但是这并非完美的解决方案，因此此处只是做个术语解释，不做强制理解。

在 `tsconfig.json` 中，我们可以通过配置属性 `strictFunctionTypes` 来选择是否启用逆变。如果该属性值为 false，规则判断时会使用双向协变，当该属性为 true 时，规则判断会使用逆变。

TypeScript 2.6 之后，`strictFunctionTypes` 都是默认启用，默认为逆变。
