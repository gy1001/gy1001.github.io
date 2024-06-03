# 23-函数是一等公民

谓一等公民，其实就是普通公民。

也就是说，函数和其他数据类型一样，没有什么特殊的，我们可以像对待任何其他数据类型一样，对待函数。

可以把函数赋值给一个变量

```javascript
const fn = function() {}
```

可以把函数存放在数组里

```javascript
function fn() {}

const arr = [0, 2, 'te', fn]
```

可以把函数当做一个参数传入给另外一个函数

```javascript
function fn(callback) {
  const a = 20
  return callback(20, 30) + a
}

function add(a, b) {
  return a + b
}

fn(add)
```

也可以把函数作为另外一个函数运行的返回值

```javascript
function add(x) {
  const y = 20
  return function() {
    x + y
  }
}

const _add = add(100)
_add() // 120


// 连着写
add(100)()   // 120
```

这些都是 JavaScript 的基本概念，可是许多人在使用代码时，会无视这些概念。我们可以用一个简单的例子来验证一下。

我们先自定义如下一个方法，要求是在 5000ms 之后，执行该方法。

```javascript
function delay() {
  console.log('5000ms 后执行 delay 方法！')
}
```

大家思考 10s 钟，代码应该怎么写。

我想肯定有许多人会这样来完成代码

```javascript
setTimeout(function() {
  delay()
}, 5000)

// 或者使用箭头函数
setTimeout(() => {
  delay()
}, 5000)
```

很显然，这样写达到了我们的目的。

但是这也正是我们忽视了上述概念写出来的糟糕代码。

函数既然能够作为一个参数传入另外一个函数，那么我们是不是可以直接将 delay 函数传入，而不用在固有的思维上额外多新增一个匿名函数呢？

```javascript
setTimeout(delay, 5000)
```

显然是可以的。如果你已经提前就想到要这样做了，那么恭喜你，说明你在 JavaScript 上比其他人更有天赋。第一种方式的糟糕写法，大量的人都在使用，并且还不知道问题出在哪里。

这种方式未来还会遇到许多次，为了验证大家确实理解了，我们一起来思考一下，如何优化下面的例子。

```javascript
function getUser(path, callback) {
  return $.get(path, function (info) {
    return callback(info);
  })
}

getUser('/api/user', function (resp) {
  // resp为成功请求之后返回的数据
  console.log(resp);
})
```

在这个例子中，我们封装了一个获取用户信息的函数。期望在请求成功之后，把需要处理的事情，放在回调函数 callback 中来做。

我们一起来分析一下这个例子，首先看看 getUser 的内部实现

```javascript
$.get(path, function(info) {
  return callback(info);
})
```

仔细观察这一段代码，是不是跟 setTimeout 的例子一模一样？我们会发现，其实 callback 函数被包裹了一层无意义的函数，因此第一步要先把这里优化掉，优化之后的代码为

```javascript
$.get(path, callback)
```

于是最初的例子，其实等同于

```javascript
function getUser(path, callback) {
  return $.get(path, callback)
}
```

仔细观察，我们又发现了同样的问题，$.get 也被做了一层无意义的封装，因此再优化得到结果

```javascript
// $.get 是 jquery 自带的工具方法
const getUser = $.get
```

嗯，是不是很神奇，到最后才发现，我们干了一件脱了裤子放屁的事情。

可能有的读者会对于参数的处理有一些疑问，那么可以通过下面的例子来进行简单的类比

```javascript
function add(a, b) {
  return a + b;
}

var other = add;
other(10, 20); // 30
```

总之，在未来的 coding 中，我们还会遇到非常多这种类似的情形，如果你能够意识到，自己正在正确的使用函数一等公民的身份，那么恭喜你，你对函数的理解，已经先人一步。