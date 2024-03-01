# 07-再谈引用数据类型

引用数据类型在实践中是一个雷区。由于引用类型引发的惨案，也频频发生。进一步掌握引用类型，是作为一个合格前端开发必不可少的学习过程。

**引用类型，是可变的。**当我们操作引用类型时，如果不小心，就可能会出现我们意想不到的结果。

## 01-纯函数

纯函数，是我们在学习函数式编程时，会接触到的概念。在维基百科中，这样介绍纯函数：

若一个函数符合以下要求，它就可以被认为是一个纯函数

**此函数在相同的输入值时，总会产生相同的输出**。函数的输出与输入值以外的其他隐藏信息或者状态无关，也和 I/O 设备产生的外部输出无关。

**该函数不能有语义上可观察的函数副作用**，例如“触发事件”

也就是说，纯函数的输出值，只和输入值有关，与其他因素都没有关系，也不能被外界干扰而影响输出或者影响外界的其他值。

那么我们看看下面这个例子中定义的函数，是纯函数吗？

```javascript
var person = {
  name: 'Tim',
  age: 20
}

function setting(p, name, age) {
  p.name = name; 
  p.age = age;
  return p;
}

var a = setting(person, 'Jake', 10);

console.log(a);
console.log(person);
console.log(a === person);
```

思考一分钟。

输入结果很奇怪，a 与 person 居然完全相等。他们都对应的是同一个对象。

分析一下这个例子。这里关键就在 setting 方法的第一个参数。当我们使用该方法时，将引用类型 person 作为一个参数传入了函数。然后就在函数中直接修改了传入的 person 属性。并将修改之后的结果返回。在这个过程中，person 的引用始终保持不变。

因此当我们使用变量 a 接收 setting 的执行结果时，其实也只是做了一个引用类型的赋值操作。于是变量 a 与 person 指向了同样的内存空间。

这种情况下，setting 函数就不能称之为纯函数了，因为它修改了外部的数据。这就是副作用。甚至我们还可以在函数执行完毕之后，修改 person 的值，这样 a 的值还会被改变，于是函数执行结果就变得不再可靠。

正因为这样，**我们在创建纯函数时，就必须要万分警惕引用类型带来的影响。**

实践过程中，我们有时候希望改变原有数据，但更多的时候是不希望改变原有数据「这种情况下基础数据类型的不可变特性，反而更为可靠」。例如一个简单的案例

```javascript
var foo = {
  a: 1,
  b: 2
};

var bar = Object.assign(foo, { c: 100 });

console.log(foo, bar);
```

我们希望得到一个新的值，结合 foo 所有属性与 `{c: 100}` 。于是使用 Object.assign 来实现。如果你对该方法了解不深，就会带来意想不到的结果。因为在这个过程中，原数组 foo 被改变了。

Object.assign 并不是一个纯函数。如果要达到得到一个新的值的目的，需要使用一些技巧来避免它本身的副作用。

```
var bar = Object.assign({}, foo, { c: 100 })
```

这样会修改原数组的类似方法还不少，例如操作数组的 api：splice

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 9];
arr.splice(7); // 对原数组arr的值造成影响

console.log(arr);
```

所以学习数组方法时，我们也要区分出来哪些是会改变原数组的，哪些不会改变。

## 02-拷贝/比较

引用数据类型的拷贝与比较略显复杂。我们知道，如果只是变量之间的拷贝与比较，参与的都是内存地址，而并非真正的值本身。因此，结果往往不尽人意。也因为这样，才有了浅拷贝，深拷贝，浅比较、深比较的概念。

### 浅拷贝

对于浅的概念没有非常严格的界定。直接赋值变量是一种浅拷贝，仅仅只拷贝引用类型的第一层也算一种浅拷贝。

```javascript
var a = { m: 1 }

// 通过赋值，实现浅拷贝
var b = a
```

这种方式在实践中的意义并不大，因为无论通过变量 a 还是变量 b 操作数据，都是修改的同样的对象。

一起来看看这个例子

```javascript
var foo = {
  a: 10,
  b: {
    m: 20,
    n: 30
  }
}

var copy = Object.assign({}, foo);

// 属性a的值，是基础数据类型，直接改变不会影响原值foo
copy.a = 20;

// 属性b是引用数据类型，浅拷贝仅仅只是第一层数据创建新的内存，而第二层数据指向同样的内存值，因此改变会影响foo的值。
copy.b.m = 100;
console.log(copy);
console.log(foo);
```

观察 copy 和 foo 的最终结果，对于 a 的操作互不干扰，而对于 m 的操作，则相互影响。这就是浅拷贝。除了第一层引用不同，更深层次的引用都是相同的。

可以封装一个通用的浅拷贝工具函数，代码如下；

```javascript
/**
 * desc: 判断一个值的具体数据类型
 */ 
function type(value) {
  return Object.prototype.toString.call(value).split(' ')[1].slice(0, -1)
    .replace(/^[A-Z]{1}/, (p) => p.toLowerCase());
}

/** 浅拷贝 */
export function clone(target) {
  let res = null;

  if (type(target) === 'array') {
    res = [];
    target.forEach(item => {
      res.push(item);
    })
  }

  if (type(target) === 'object') {
    res = {};
    Object.keys(target).forEach(key => {
      res[key] = target[key];
    })
  }

  // 如果需要完善后运用于生产环境，则需要在继续分别考虑各种其他数据类型，例如基础数据类型，函数，Map，并分别处理等
  return res || target;
}

const x = { a: 1, b: { m: 1, n: 2 } };
const y = clone(x);
console.log(y);
y.b.m = 20;
console.log(x); // y修改b属性之后，x也受到影响

const a1 = [1, 2, { m: 1, n: 2 }];
const a2 = clone(a1);
console.log(a2);
a2[2].m = 100;
console.log(a1); // a2修改第三个值，a1也受到影响
```

### 浅比较

浅比较与浅拷贝，在浅的概念上是一样的。

浅比较的应用比较广泛，以 React 为例「Vue 也类似」，每一个 React 组件本质上就是一个引用数据类型，不过通常情况下这个引用数据类型比较复杂。因此当我们期望判断出一个组件是否需要更新时，如果使用深比较来判断变化的话，性能上的消耗会远超我们的预期。

> 也正因为如此，我们在试图使用 PureComponent 和 shouldComponentUpdate 来优化性能时，如果运用不合理，可能会造成额外的性能损耗

React 中，浅比较的实现方法

```javascript
// React中，浅比较的实现方法
const hasOwn = Object.prototype.hasOwnProperty

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

export default function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}
```

### 深拷贝

深拷贝必须要每个引用类型都使用新的内存空间，做到拷贝前后完全不相互影响。

```javascript
/**
 * auth: yangbo
 * desc: 判断一个值的具体数据类型
 */

function type(value) {
  return Object.prototype.toString
    .call(value)
    .split(" ")[1]
    .slice(0, -1)
    .replace(/^[A-Z]{1}/, p => p.toLowerCase());
}

/** 深拷贝 */
export function deepClone(target) {
  let res = null;

  if (type(target) === "array") {
    res = [];
    target.forEach(item => {
      res.push(deepClone(item));
    });
  }

  if (type(target) === "object") {
    res = {};
    Object.keys(target).forEach(key => {
      res[key] = deepClone(target[key]);
    });
  }

  // 如果需要完善后运用于生产环境，则需要在继续分别考虑各种其他数据类型，例如基础数据类型，函数，Map，并分别处理等
  return res || target;
}

const x = { a: 1, b: { m: 1, n: 2 } };
const y = deepClone(x);
console.log(y);
y.b.m = 20;
console.log(x); // y修改b属性之后，x不受影响

const a1 = [1, 2, { m: 1, n: 2 }];
const a2 = deepClone(a1);
console.log(a2);
a2[2].m = 100;
console.log(a1); // a2修改第三个值，a1不受影响
```

深比较同理，因为几乎不在实践中使用，这里就不再做额外的介绍。

## 03-不可变数据集

**不可变数据是函数式编程的重要概念。**从上面关于纯函数的学习中我们得知，对于函数式编程而言，引用数据类型的可变性，简直是“万恶之源”。

我们在函数式编程的实践中，往往期望引用数据类型也具备基础数据类型不可变的特性，这样能使开发变得更加简单，状态可回溯，测试也更加友好。因此在开发中探索不可变数据集，是必不可少的行为。

最常规的办法就是使用完全深拷贝。很显然，由于性能的问题，在实践中使用深拷贝来达到不可变数据集的目的并不靠谱。我们常常会引入 [immutable.js](https://immutable-js.github.io/immutable-js/docs/)，[immer.js](https://github.com/immerjs/immer) 来达到目的。

> 不可变数据集常常用于大型项目，虽然底层实现思路优于深拷贝，但也会造成一定的性能损耗与内存。因此做技术选型时一定要综合考虑优劣。慎重采纳。

不可变数据集会在新书「React 知命境」中深入介绍，此处仅仅只是提供一个简单的概念，大家有进一步学习的可以查阅相关资料进行学习。
