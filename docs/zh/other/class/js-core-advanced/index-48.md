# 48-解构

解构是一种从对象/数组中取值的全新写法。

一个简单的例子就能搞定它。

首先假设有如下对象。

```
var tom = {
  name: 'TOM',
  age: 20,
  gender: 1,
  job: 'studend'
}
```

我们使用对象的方式，保存了 TOM 的一些基本信息。在传统方法中，当我们想要取得其中的信息时，通常会采用如下的方式

```
var name = tom.name;
var age = tom.age;
var gender = tom.gender;
var job = tom.job;
```

新的结构语法则要简单许多

```
const { name, age, gender, job } = tom;
```

`name, age, gender, job` 此时就已经是可以使用的变量。

但是需要注意的是，这样的写法是一种缩写。完整的写法应该为

```
// 左侧是 key 值，右侧是变量
// 变量名与值是对应关系
const { 
  name: name, 
  age: age, 
  gender: gender, 
  job: job 
} = tom;
```

因此，当我们结合缩写，并且想要对变量重命名时，就应该放弃缩写的形式

```
// 此时的变量名为 name2，age, gedner, job
const { name: name2, age, gender, job } = tom;
```

还可以给变量指定默认值

```
// 如果数据中能找到 name，则变量的值与数据中相等，找不到，则使用默认值
const { name = 'Jake', stature = '170' } = tom;
```

我们还可以利用解析结构获取嵌套数据中的值。

```
const peoples = {
  counts: 100,
  detail: {
    tom: {
      name: 'tom',
      age: 20,
      gender: 1,
      job: 'student'
    }
  }
}

// 获取tom
const { detail: { tom } } = peoples;

// 直接获取tom的age与gender
const { detail: { tom: { age, gender } } } = peoples;
```

如果你暂时看不懂这样的嵌套结构，在使用时你也可以拆解来看。

```
const { detail } = peoples;
const { tom } = detail;
const { age, gender } = tom;
```

从对象中取值时，会查找原型链。

```
const p = {
  name: 'tony'
}
p.__proto__.age = 20

const {name, age} = p
console.log(name, age) // tony  20
```

除此之外，数组也具有自己的解析结构。当然，写法上与对象的解析结构略有不同，通过一个简单的例子观察。

```
const arr = [1, 2, 3];
const [a, b, c] = arr;

// 等价于
const a = arr[0];
const b = arr[1];
const c = arr[2];
```

与对象不同的是，数组中变量与值的关系是与序列号一一对应的，这是一个有序的对应关系。而对象则根据属性名一一对应，这是一个无序的对应关系。因此在实践中，对象的解析结构使用更加频繁与便利。

在使用时，无论是对象还是数组，建议大家将解析结构的运用重点放在取值上，而不是试图利用解析结构来声明初始变量。

运用重点放在取值上的意思就是，当我们想要从一个已经有的数据中，获取我们想要的信息时使用解析结构。而不是为了声明几个初始变量，自己拼凑一个对象或者数组出来。

在一个函数中，当传入的参数是数组或者对象时，我们也可以使用解析结构来简化我们的代码。这是解析结构在不同场景下的取值。

```
const fn = ({ name, age }) => {
  return `${name} is age is ${age}`;
}

fn({ name: 'TOM', age: 20 });
```

另外总结一个关于默认值应用场景的小知识点。

```
// 对象解析结构中的默认值
const { name, age = 20 } = tom;

// 数组解析结构中的默认值
const [a, b = 20] = [1]

// 函数参数中的默认值
const fn = (x = 20, y = 30) => x + y;
fn(); // 50
```

另外还有一些小技巧

例如，使用解构语法进行变量交换

```
var a = 10;
var b = 20;

[a, b] = [b, a];
console.log(a); // 20
console.log(b); // 10
```