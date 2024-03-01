# 49-展开运算符

在ES6中，使用 `...` 来表示展开运算符，它可以将数组/对象进行展开。

通过一个简单的例子来了解一下展开运算符的作用。

```
// 首先声明一个数组
const arr1 = [1, 2, 3];

// 其次声明另一个数组，我们期望新数组中包含数组arr1的所有元素，那么可以利用暂开运算符
const arr2 = [...arr1, 4, 5, 6];

// 那么arr2就变成了 [1, 2, 3, 4, 5, 6]
```

当然，展开对象也可以得到类似的结果。

```
const object1 = {
  a: 1,
  b: 2,
  c: 3
}

const object2 = {
  ...object1,
  d: 4,
  e: 5,
  f: 6
}

// object2的结果等价于
object2 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6
}
```

在解析结构中，我们也常常使用展开运算符。

```
const tom = {
  name: 'TOM',
  age: 20,
  gender: 1,
  job: 'student'
}

const { name, ...others } = tom;

// others = {age: 20, gender: 1, job: "student"}
```

利用这样的方式，我们可以将 tom 对象中的剩余参数全部丢在 others 中，而不用一个一个的去列举所有的属性。

在 react 组件中，我们也常常使用展开运算符来传递数据。

```
const props = {
  size: 1,
  src: 'xxxx',
  mode: 'si'
}

const { size, ...others } = props;

// 利用展开运算符传递数据
<button {...others} size={size} />
```

展开运算符还可以运用在函数参数中，放置于函数参数的最后一个参数(且只能放置于最后)，表示不定参。

```
// 求所有参数之和
const add = (a, b, ...more) => {
  return more.reduce((m, n) => m + n) + a + b
}

console.log(add(1, 23, 1, 2, 3, 4, 5)) // 39
```

展开运算符能够大大提高我们的代码效率，因此记住这些常见的应用场景非常重要。