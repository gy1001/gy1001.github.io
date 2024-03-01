# 24-纯函数

相同的输入总会得到相同的输出，并且不会产生副作用的函数，就是纯函数。

这里需要关注两个重点

**相同的输入总会得到相同的输出**

一个非常简单的例子来说明纯函数与其他函数的不同

```javascript
var a = 10

function add(b) {
 a += b
  return a
}

add(1) // 11
add(1) // 12
add(1) // 13
add(1) // 14
```

该例子中，多次调用 add 方法，我们发现，每次的返回结果都不一样。虽然传入的参数每次都是一样的，但是返回结果发生了变化，返回结果无法准确预测，因此此处的 add 方法，就不是纯函数。

再来一个例子。

```javascript
function add(a, b) {
  return a + b
}

add(1, 2)   // 3
add(1, 2)   // 3
add(1, 2)   // 3
add(1, 2)   // 3
```

该例子中，相同的输入总能返回同样的值，因此满足了纯函数的定义。

也就是说，纯函数有一个非常重要的特点，**那就是除了传入的参数之外，不依赖任何外界的信息与状态**。例如下面这个不纯的例子。

```javascript
var name = 'Jake';

function sayHello() {
  return 'Hello, ' + name;
}

sayHello();  // Hello, Jake

// 当我们有其他需求需要改变name的值
name = 'Tom';
sayHello(); // Hello, Tom
```

同样的调用，但是由于 sayHello 函数依赖于外界的 name 变量，因此当外界发生变化时，函数的运行结果就变得不一样。很显然这并不是我们封装函数时希望看到的状况。因为这样的变化无法预测。因此，如果优化上面的例子，那么我们应该把 name 当做一个参数传入，这样我们就能够直观的知道，该函数执行时会输出上面结果。

```
function sayHello(name) {
  return 'Hello, ' + name;
}
```

纯函数另外一个重要的特点，就是

**不会产生副作用**

副作用的意思，就是产生了额外的影响。例如我们吃了感冒药常常会犯困，或者一些过敏反应，这些都是副作用。我吃感冒药只想要治疗感冒，但是结果犯困和过敏。

在我们的函数里也是一样，我只想获得函数的最后一项，但是却把函数的最后一项给删除了，这就是副作用。

```javascript
function getLast(arr) {
  return arr[arr.length];
}

function getLast_(arr) {
  return arr.pop();
}

var source = [1, 2, 3, 4];

var last = getLast(source);  // 返回结果4  原数组不变
var last_ = getLast_(source); // 返回结果4 原数据最后一项被删除，产生了副作用
```

getLast 与 getLast_ 虽然同样能够获得数组的最后一项值，但是 getLast_ 改变了原数组。而当原始数组被改变，那么当我们再次调用该方法时，得到的结果就会变得不一样。这样不可预测的封装方式，在我们看来是非常糟糕的。它会把我们的数据搞得非常混乱。在JavaScript原生支持的数据方法中，也有许多不纯的方法，我们在使用时需要非常警惕，我们要清晰的知道原始数据的改变是否会留下隐患。

```javascript
var source = [1, 2, 3, 4, 5];

source.slice(1, 3);  // 纯函数 返回[2, 3] source不变
source.splice(1, 3); // 不纯的 返回[2, 3, 4] source被改变

source.pop(); // 不纯的
source.push(6); // 不纯的
source.shift(); // 不纯的
source.unshift(1); // 不纯的
source.reverse(); // 不纯的

// 我也不能短时间知道现在source被改变成了什么样子，干脆重新约定一下
source = [1, 2, 3, 4, 5];

source.concat([6, 7]);  // 纯函数 返回[1, 2, 3, 4, 5, 6, 7] source不变
source.join('-'); // 纯函数 返回1-2-3-4-5 source不变
```

与这种会改变原始数据的函数相比，纯函数明显更加可靠。很显然谁都不希望自己的数据经过几次调用之后就变得一团糟。

## 01-纯函数的可移植性

无论在封装一个函数，一个库还是一个组件时，都期望一次封装，多处使用。而纯函数刚好具备这样的特性。

纯函数不依赖参数之外的值，因此纯函数的依赖非常明确。

一个页面的 url 里常常会在 "?" 后面带有参数，例如

https://www.baidu.com/s?tn=baidu&wd=javascript&rsv_sug=1

应用中常常需要从这段 url 中，获取到某些参数对应的值。例如这个例子中的 "wd" 的值为javascript。那么想要封装这样一个纯函数我们应该怎么做呢？如下：

```javascript
function getParams(url, param) {
  if (!/\?/.test(url)) {
    return null;
  }

  var search = url.split('?')[1];
  var array = search.split('&');

  for(var i = 0; i < array.length; i++) {
    var tmp = array[i].split('=');
    if (tmp[0] === param) {
      return decodeURIComponent(tmp[1]);
    }
  }

  return null;
}

var url = 'https://www.baidu.com/s?tn=baidu&wd=javascript&rsv_sug=1';
getParams(url, 'wd'); // javascript
```

虽然 getParams 并非完全健壮，但是已经足以体现纯函数可移植的特点。我们可以在任何需要从url中取得参数对应值的地方调用该方法。

## 02-纯函数的可缓存性

因为相同的输入总能得到相同的输出，因此，如果函数内部计算非常复杂，当我们发现输入与上一次相同时，可以直接返回结果而不用经过内部的计算。这是一种性能优化的策略。

项目中我们可能会处理大量的数据，例如根据日期，得到当日相关的数据，并处理成为我们前端能够使用的数据。假设封装一个 process 方法来处理每天的数据，而这个处理过程会很复杂。如果我们不缓存处理结果，那么每次想要得到当天的数据时，就不得不从原始数据再转换一次。我们可以利用纯函数的课缓冲性策略，减少冗余的转换计算过程。

```javascript
// 传入日期，获取当天的数据
function process(date) {
  var result = '';

  // 假设这中间经历了复杂的处理过程

  return result;
}

function withProcess(base) {
  var cache = {}

  return function() {
    var date = arguments[0];
    if (cache[date]) {
      return cache[date];
    }
    cache[date] = base.apply(base, arguments);
    return cache[date]
  }
}

var _process = withProcess(process);

// 经过上面一句代码处理之后，我们就可以使用_process来获取我们想要的数据，
// 如果数据存在，会返回缓存中的数据，
// 如果不存在，则会调用process方法重新获取。
_process('2017-06-03');
_process('2017-06-04');
_process('2017-06-05');
```

上面例子中利用了闭包的特性，将处理过的数据都缓存在cache中。这种方式算是高阶函数的一种运用。我们将在下面一个小节介绍高阶函数。也正是因为纯函数的可靠性，才能够让我们非常放心的确保缓存的数据一定就是我们想要的正确结果。

我想到这里，大家已经明白了什么是纯函数，纯函数有什么特点，以及我们为什么要尽量使用纯函数。当然在实践中并不是所有的场景都能够使用纯函数，我们只需要在合适的场景使用即可。