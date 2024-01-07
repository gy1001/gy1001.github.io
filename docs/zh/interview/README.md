# 作用域

## 1. 题目

```javascript
var num1 = 55
var num2 = 66
function f1(num, num1) {
  num = 100
  num1 = 100
  num2 = 100
  console.log(num)
  console.log(num1)
  console.log(num2)
}
f1(num1, num2) // 100 100 100
console.log(num1) // 55
console.log(num2) // 100
console.log(num) // num is not defined
```
值类型和引用类型的传递
```js
function Person(name, age, salary){
  this.name = name;
  this.age = age;
  this.salary = salary;
}
function f1(person){
  person.name = "ls";
  person = new Person("xxx", 20, 2000);
}
var p = new Person("zs", 30, 3000);
console.log(p.name); // zs
f1(p);
console.log(p.name); // ls
```
## 2. 作用域相关概念

> 作用域是一套规则，用于规定在何处以及如何查找变量(标识符)。如果查找的目的是对变量进行赋值，那么就会使用 LHS 查询；如果目的是获取变量的值，就会使用 RHS 查询。
> 赋值操作会导致 LHS 查询。 = 操作符或者调用函数时传入参数的操作都会导致关联作用域的赋值操作。
>
> javaScript 引擎首先会在代码执行前对其进行编译，在这个过程中，像 var a = 2 这样的声明会被分解为两个独立的步骤
>
> 1. 首先，var a在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行
> 2. 接下来，a = 2 会查询(LHS查询)变量a并对其进行赋值。
>
> LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要(也就是说它们没有找到所需的标识符)，就会向上级作用域继续查找目标标识符，这样每次上升一级作用于（作用域），最后抵达全局作用域（顶层），无论找到或者没找到就停止。
>
> 不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS 引用会导致自动隐式地创建一个全局变量（非严格模式下），该变量使用 LHS 引用的目标标识符，或者抛出 ReferenceError 异常（严格模式下）

## 3. 小测试

```javascript
function foo(a) {
  var b = a
  return a + b
}
var c = foo(2)
```

1. 找出所有的 LHS 查询(这里有3处)

> c = ...; a = 2（隐式变量分配）、b = ...

2. 找出所有的 RHS 查询(这里有4出)

> foo(2...) = a; a..; ..b;

## 4、其他

* 词法作用域意味着作用域是书写代码时函数声明的位置来决定的。编译的词法分析阶段基本就可以知道全部标识再哪里以及是如何声明的，从而能够预测在执行过程中如何怼他进行查找

* JavaScript 中有两个机制可以欺骗词法作用域:`eval`和`widht`。前者可以对一段包含一个或者多个声明的`代码`字符串进行演算，并借此来修改已经存在的词法作用域(在运行时)。后者本质上是通过一个对象的引用当做作用域来处理，将对象的属性当做作用域中的标识符来处理，从而创建一个新的词法作用域(同样是在运行时)

* 这两个机制的副作用是引擎无法再编译时对作用域查找进行优化，因为引擎只能谨慎地认为这样的优化是无效的。使用其中任何一个机制都将导致代码运行变慢，**不要使用他们**

* 例如如下代码

  ```javascript
  function foo(obj) {
    with (obj) {
      a = 2
    }
  }
  var o1 = { a: 3 }
  var o2 = { b: 3 }
  foo(o1)
  console.log(o1.a) // 2 
  foo( o2 ); 
  console.log( o2.a ); // undefined 
  console.log( a ); // 2——不好，a 被泄漏到全局作用域上了！
  ```

## 5、函数作用域和块作用域

* 函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。这种设计方案是非常有用的，能充分利用 JavaScript 变量可以根据需要改变值类型的“动态”特性
* 块作用域是一个用来对之前的最小授权原则进行扩展的工具，将代码从在函数中隐藏信息扩展为在块中隐藏信息
