# 64-常用高阶类型

实践中场景往往比较复杂，因此许多时候我们需要一些复杂的高级类型来确保变量的类型与实际情况相符合。

这一章我们把一些常见的复杂类型单独拿出来与大家一起来学习一下。

## 1-枚举

使用关键字enum可定义一个枚举类型。

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

Direction.Up // 1
Direction.Down // 2
Direction.Left // 3
Direction.Right // 4
```

> 需要注意，与interface等类型约束关键字不同，枚举类型是真实运行的代码，因此枚举类型是真实存在的对象，而并非仅仅只是简单的类型约束。

如果不赋值，则从0开始递增。

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

Direction.Up // 0
Direction.Down // 1
Direction.Left // 2
Direction.Right // 3
```

也可以赋值为字符串

```typescript
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

Direction.Up // up
Direction.Down // down
Direction.Left // left
Direction.Right // right
```

可以反向映射访问

```typescript
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

Direction.up // Up
Direction.down // Down
Direction.left // Lfet
Direction.right // Right
```

前端的一个特殊性在于，我们通常会将枚举类型的值描述展示在页面上，因此此时如果使用枚举来表达会存在一些问题。

```typescript
// 实践中更多使用这样方式表达枚举的含义
const sources = {
  1: '微信',
  2: 'QQ',
  3: '今日头条',
}
```

## 2-`&` 交叉类型

当我们在封装 Drag 组件时，需要兼容移动端的 touch 与 pc 端的 mouse 事件。可问题在于 touch 的事件对象与 mouse 的事件对象是不一样的。那么我们在兼容了这两种事件的回调中，如何去描述该回调的事件对象呢？

通常使用 & 符号来解决这样的场景，将两种类型合并为一种类型。这样就能够在智能提示中同时访问到两个事件对象的所有属性了。

```typescript
type TouchEvent = React.TouchEvent & React.MouseEvent;
```

demo.gif

## 3-`|` 联合类型

当我们想要设定一个变量的类型为 number 时，

```typescript
let a: number = 10;
```

但是当我们想要设定他的数据只能是`10, 20, 30`时，就需要用到 `|`

```typescript
type Source = 10 | 20 | 30;
let a: Source = 10;
```

通常这种场景与枚举数据有关。

当然，我们也可以扩展一个数据的类型。

```typescript
const attr: number | string = 20;
```

> 注意体会 & 与 |  的区别

## 4-类型保护

一个变量，被定义为可能是字符串，也可能是数组。

```typescript
per: string | string[]
```

我们在代码编写时，希望能够自动提示对应的 api，typescript 则不知道应该如何处理这种情况。

试图调用数组的map方法，结果无法找到

为此，我们应该使用一些判断，帮助编辑器做出正确推断。

自动提示所有字符串api自动提示所有数组api

这种处理，就叫做类型保护。

## 5-索引类型

我们可以使用 `keyof` 来获取一个对象中的 key 对应的具体值。

```typescript
interface Person {
  name: string,
  age: number
}

const key: keyof Person = 'name';
```

结果

他有点类似于

```typescript
type Key = 'name' | 'age';
```

但 keyof 具备更强的灵活性，它会动态的去识别对象中的所有 key 值。

结合泛型，用一个复杂的例子来体验一下：

我们来封装这样一个方法：对于一个对象，当我们指定对应的 key 值数组时，希望能够得到所有 key 值对应的 value 值数组。

需要思考几个问题。目标对象的类型，我们不确定，因此，只能使用一个泛型变量做一个简单约束。key 值的类型呢？我们可以使用 keyof 从泛型对象中获取。于是又定义另外一个泛型变量 K 来接收获取的结果。

函数定义如下：

```typescript
// 声明
function values<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}
// 使用
let defUser = {
  id: 'xxx1234sd',
  name: '张三',
  phone: '12312312313',
  pwd: '123123',
  age: 20
}

values(defUser, ['id', 'name'])
```

## 6-总结

这是最常用的高级类型，学会之后，能够应对实践中的大部分场景了。当然，更多的高级类型，大家还要结合官方文档继续学习。