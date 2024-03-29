# 33-封装进阶思考

## 01-从思维上理解

我们已经知道，封装，是对公共逻辑的提炼。

而如何提炼出来合理的逻辑，是一件需要持续精进的事情。

我们目前接触到的场景里，有使用函数封装一部分代码逻辑，也有使用面向对象的思维来封装实例。除此之外，我们还可以封装一个模块，封装一个组件，封装一个微服务。从简单到复杂，虽然表面上看上去是有不同，但是他们的本质都是一样：提炼公共逻辑。

因此，当我们面临一个具体的场景，要去做封装这个事情的时候，我们需要准确的考虑好两件事情

- 公共逻辑，或者你要封装的逻辑是什么
- 变量是什么
- 我们的目的是什么，也就是返回的结果是什么

而我们在思考变量是什么的时候，其实也就意味着，一个好的封装结果，是相对**独立**的。我们用三个简单的例子来说明这个结论。

## 02-案例一

有一段代码，大概如下

```javascript
var a = 10
var b = 20

var c = a * b + a
```

此时，我们使用一个表达式逻辑通过 a, b 的值，计算 c 的结果。这里的表达式可以很简单，也可以很复杂，可以单独对这段表达式逻辑进行一个封装，代码调整如下

```javascript
var a = 10
var b = 20

function cul() {
  return a * b + a
}

var c = cul()
```

这不是一个好的封装，因为被封装的逻辑并不完整。我们虽然封装了表达式的计算过程，但是计算过程中，需要使用到的 a， b 并没有思考。

一个完整的封装逻辑应该是这样

```javascript
var a = 10
var b = 20

function cul(m, n) {
  return m * n + m
}

var c = cul(a, b)

// --------------------------
// 进一步简化一下
function cul(m, n) {
  return m * n + m
}

var c = cul(10, 20)
```

此时，我们要封装的公共逻辑是表达式的计算过程，变量就是参与计算过程的两个数值。

> 其实已经对应了纯函数，相同的输入，总能得到相同的输出。

## 03-案例二

map 是一个遍历数组的工具方法，最后会返回一个处理之后的新数组。当我们在思考如何封装 map 时，也需要先思考公共逻辑是什么？变量是什么？

公共逻辑就只是一个 for 循环的遍历过程

变量则有，

1. 谁需要被遍历
2. for 循环中，如何处理每一项的结果

谁需要被遍历是一个数组，可以作为一个个体来考虑，直接传入变量即可。但是如何处理每一项一定是一个逻辑片段，因此只能用函数来表示，那么 map 方法大概就是如下的样子

```javascript
function map(arr, callback) {

}
```

之后才是考虑如何将 for 循环的逻辑体现出来的事情。完整代码如下

```javascript
function map(arr, cb) {
 // 创建一个空数组，作为返回结果
  const res = []
  
  for(var i = 0; i < arr.length; i++) {
    // 将每一项的执行结果，推入返回结果数组中
    res.push(cb(arr[i], i))
  }
  
  return res
}

// 使用时
map([1, 2, 3], function(item, index) { 
  return item + 10 + index 
})

// 返回结果为 [11, 13, 15]
```

## 04-案例三

外卖的逻辑设计

我们应该都点过外卖，真实的场景是这样，我们通过 app 下单，然后商家和外卖小哥接单，接单之后，商家开始为你准备外卖，外卖小哥去商家拿外卖，拿到之后再送给你。

这里面有很多的逻辑，例如外卖小哥是谁，外卖小哥使用什么样的交通工具把外面送到你手里，给你准备饭菜的厨师是谁，你的饭菜原材料从什么地方采购而来等等，这些都是点外卖的你不关心的。也就意味着，外卖这个整体的逻辑，已经被提炼出来，而你需要关心的，就是这个逻辑里的变量

- 点外卖的你是谁
- 你的电话是多少
- 你的地址是哪里
- 你需要吃什么

你把这些变量整理好之后，点外卖就类似于调用函数，最后你得到的结果就是外卖送到你手里。一个不太友好的外卖逻辑设计，会让整个过程变得非常繁琐，其中产生的价值也会大打折扣。例如，需要你关心外卖小哥是谁。

如果我们在点外卖的时候，必须指定特定的外卖小哥，就好比你必须指定外卖收货地址才能送到你家里。点外卖这个过程会变得非常复杂和低效。因此，确定封装逻辑的独立性，以及认真分析逻辑中的变量，是非常重要的过程。

继续往下思考，还会发现整个产业链并非那么简单，例如食材从何而来，食材如何管理，食材的购买价格如何，这些是外卖小哥也不用关心的问题。

相对独立，其实也就意味着**低耦合。**

## 05-从具体实现上去理解

从实现上来说，封装的本质是代码的复制。

例如一个简单的封装

```javascript
var a = 10
var b = 20

var c = a + b * a - b

// 封装之后
function sum(a, b) {
  return a + b * a - b
}

var c = sum(10, 20)
var c1 = sum(20, 10)
```

我们观察一下，封装的 `sum` 函数，发现就是把计算过程复制到函数中。每次执行时，不需要再重复写计算过程，而只需要调用函数即可。

因此，这里封装的函数，其实就是一个模板，当我们调用该函数时，就是让该模板复制一份内容执行。

所以，在内存空间上理解，函数模板，也就是**函数体**，独占一份内存。并且因为始终保持引用，在程序运行过程中，会在内存中持续存在。

当我们执行函数时，会分配一个新的内存空间「执行上下文」，该内存空间与函数体的内存空间完全不同。函数执行完毕之后，内存空间就会被释放掉。

对象的理解也是一样，

```javascript
// 类
class Person {}

// 实例
const p1 = new Person()
const p2 = new Person()
const p3 = new Person()
```

类是一个模板，独占一份内存空间

每一份实例的生成，都会从类的模板里，占据新的内存空间。