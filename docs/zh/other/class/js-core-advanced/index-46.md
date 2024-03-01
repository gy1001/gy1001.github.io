# 46-ES6 常用语法

ES6 是 ECMAScript 6 的简称。也是 ECMAScript 新标准的一种统称。

之所以要单独将 ES6 拿出来学习，是因为与之前的版本相比较，它的语法很大程度上改变了我们的编程习惯。虽然在某种程度上来说， ES6 的出现，增加了我们的学习成本。但是它对于前端开发带来的改变是非常令人惊喜的。

在实践中，大多数前端团队已经将 ES6 全面运用到了工作中。

ES6 是前端必须掌握的技能。网络上也越来越多的优质资源开始使用 ES6 进行知识分享，包括我们之前的许多案例。

目前大多数最新版本的浏览器都能够直接支持 ES6 的许多特性。在开发中，我们也能够借助 babel 提供的编译工具，来解决兼容性的问题，这极大的推动了业内前端团队对 ES6 的接受。

> ES6 于 2015年6月正式发布，因此又被称为 ES2015，并在 2016 年进行了修改。在未来会每一年命名一个版本，如2017年发布的版本，会称为ES7，或者ES2017，依次往后类推。

我们可以使用 babel 官方提供的在线编译工具，将 ES6+ 编译为对应的 ES5 代码。观察两者的不同有助于深入理解 ES6+。

https://babeljs.io/repl

**新的声明方式 let/const**

在 ES5 中，我们使用 `var` 来声明一个变量。

新的变量声明方式带来了一些不一样的特性。其中最重要的就是具备了块级作用域。

通过两个简单的例子就能说明

```
{
  let a = 20
}

// Uncaught ReferenceError: a is not defined
console.log(a)
// ES5
console.log(a); // undefined
var a = 20;
// ES6
// Uncaught ReferenceError: Cannot access 'a' before initialization
console.log(a); 
let a = 20;
```

我们可以看到，

`var` 声明一个变量时，声明被提前，并且会得到一个值为 `undefined` 的赋值。

`let` 声明一个变量时，声明被提前，但不会得到任何赋值。因此无法访问，当我们试图访问没有赋值的变量时，报错信息为 Cannot access 'a' before initialization。

这就是**暂时性死区**

`let/const` 声明的暂时性死区，需要与自身形成的块级作用域结合起来理解。例如下面的例子，报错信息仍然一样

```
var a = 20;
if (true) {
  console.log(a); // Cannot access 'a' before initialization
  let a = 30;
}
```

因此，在我们的实践代码中，需要注意这些异常，尽量将声明主动放置于代码的最前面。

我们知道新的语法中，会使用 `let/const` 取代 var。那么一个新的问题就会出现：声明时候使用 `let`，什么时候使用 `const` ？

**我们常常使用 let 来声明一个引用可以被改变的变量，而使用 const 来声明一个引用不能被改变的变量。**

引用不能被改变的变量对应的值，可以是常量。也可以是引用数据类型。

我们会使用 let 来声明一个值总是会改变的变量

```
let a = 20;
a = 30;
a = 40;
console.log(a);
```

我们会使用 const 来声明一个常量。

```
const PI = 3.1415;
const MAX_LENGTH = 100;

// 试图改变常量的值
PI = 3; // Untaught TypeError: Assignment to constant variable
```

除此之外，当我们声明一个引用类型的数据时，也会使用 const。尽管我们可能会改变该数据的值，但是必须保持它的引用不变。

```
const a = [];
a.push(1);
console.log(a); // [1]
const b = {}
b.max = 20;
b.min = 0;
console.log(b); // { max: 20, min: 0 }
```

大家可以领会一个这个例子。想想能不能这样用？想完之后，在浏览器中运行试试看吧。

```
const arr = [1, 2, 3, 4];
arr.forEach(function (item) {
  const temp = item + 1;
  console.log(temp);
})
```

**箭头函数  arrow function**

箭头函数是一个更为简洁的函数写法，我们先看看基本语法

```
// es5
var fn = function (a, b) {
  return a + b;
}

// es6 箭头函数写法，当函数直接被return时，可以省略函数体的括号
const fn = (a, b) => a + b;

// es5
var foo = function () {
  var a = 20;
  var b = 30;
  return a + b;
}

// es6
const foo = () => {
  const a = 20;
  const b = 30;
  return a + b;
}
```

需要注意的是，箭头函数只能替换函数表达式，也就是使用 var/let/const 声明的函数。而直接使用 function 声明的函数是不能使用箭头函数替换掉的。

除了写法的不同，箭头函数还有一个非常重要的特性需要我们掌握。

学习过之前的 this 专题的话我想大家应该能够知道，函数内部的 this 指向，与它的调用者有关。或者使用 call/apply/bind 也可以修改内部的 this 指向。

通过下面的例子简单复习一下。

```
var name = 'TOM';
var getName = function () {
  console.log(this.name);
}

var person = {
  name: 'Alex',
  getName: getName
}

var other = {
  name: 'Jone'
}

getName(); // 独立调用，this 指向 undefined，并自动转向 window
person.getName(); // 被 person 调用，this指向 person
getName.call(other); // call 修改this，指向 other
```

明白了 this 的指向，那么就能够很简单的知道这几个不同的方法调用时会输出什么结果。但是当我们将最初声明的 getName 方法修改为箭头函数的形式，输出结果会发生什么变化呢？我们来看一下：

```
var name = 'TOM';

// 更改为箭头函数的写法
var getName = () => {
  console.log(this.name);
}

var person = {
  name: 'Alex',
  getName: getName
}

var other = {
  name: 'Jone'
}

getName();
person.getName();
getName.call(other);
```

通过运行我们发现，三次调用都输出了 TOM。

这也正是我要跟大家分享的箭头函数的不同。**箭头函数中的 this，就是声明函数时所处上下文中的 this，并且不会被其他方式所改变。**

或者通俗一点来说，就是箭头函数自身没有 this 属性。

因此这个例子中，getName在全局上下文中声明，那么this就会指向window对象。所以输出的结果全是TOM。

在实践中，我们常常会遇到this在传递过程中的改变给我们带来的困扰。例如：

```
var Mot = function (name) {
  this.name = name;
}
Mot.prototype = {
  constructor: Mot,
  do: function () {
    console.log(this.name);
    document.onclick = function () {
      console.log(this.name);
    }
  }
}

new Mot('Alex').do();
```

这个例子中当我们调用 do 方法时，我们期望点击 document 时，仍然也会输出 ‘Alex’。但是很遗憾，在 onclick 的回调函数中，this 的指向其实已经发生了变化，它指向了 document，因此此时我们肯定就得不到我们想要的结果。通常的解决方案我相信大家应该知道，这里也可以使用箭头函数来避免这样的困扰。

除此之外，arguments还有一个需要大家注意的不同。在箭头函数中，没有arguments对象。

```
var add = function (a, b) {
  console.log(arguments);
  return a + b;
}

add(1, 2);

// 结果输出一个类数组对象
/*
[
0: 1,
1: 2,
length: 2,
callee: ƒ (a, b),
Symbol(Symbol.iterator): ƒ values()
]
*/
var add = (a, b) => {
  console.log(arguments);
  return a + b;
}
add(1, 2); // arguments is not defined
```