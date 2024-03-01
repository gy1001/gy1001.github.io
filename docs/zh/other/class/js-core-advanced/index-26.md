# 26-柯里化

通过上一个章节的学习我们知道，接收函数作为参数的函数，都可以叫做高阶函数。我们常常利用高阶函数来封装一些公共的逻辑。

这一章我们要学习的柯里化，其实就是高阶函数的一种特殊用法。

**柯里化是指这样一个函数(假设叫做createCurry)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数。**

这样的定义可能不太好理解，我们可以通过下面的例子配合理解。

假如有一个接收三个参数的函数 A。

```javascript
function A(a, b, c) {
  // do something
}
```

同时还有一个已经封装好了的柯里化通用函数 createCurry。他接收 A 作为参数，能够将 A 转化为柯里化函数，返回结果就是这个被转化之后的函数。

```
var _A = createCurry(A);
```

那么 _A 作为 createCurry 运行的返回函数，他能够处理A的剩余参数。因此下面的运行结果都是等价的。

```javascript
_A(1, 2, 3);
_A(1, 2)(3);
_A(1)(2, 3);
_A(1)(2)(3);
A(1, 2, 3);
```

函数A被createCurry转化之后得到柯里化函数_A，_A能够处理A的所有剩余参数。因此柯里化也被称为部分求值。

在简单的场景下，我们可以不用借助柯里化通用式来转化得到柯里化函数，凭借眼力自己封装。

例如有一个简单的加法函数，他能够将自身的三个参数加起来并返回计算结果。

```javascript
function add(a, b, c) {
  return a + b + c;
}
```

那么 add 函数的柯里化函数 _add 则可以如下：

```javascript
function _add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
```

下面的运算方式是等价的。

```javascript
add(1, 2, 3);
_add(1)(2)(3);
```

当然，柯里化通用式具备更加强大的能力，我们靠眼力自己封装的柯里化函数自由度偏低。因此我们仍然需要知道自己如何去封装这样一个柯里化的通用式。

首先通过 _add 可以看出，柯里化函数的运行过程其实是一个参数的收集过程，我们将每一次传入的参数收集起来，并在最里层处理。在实现 createCurry 时，可以借助这个思路来进行封装。

封装如下:

```javascript
function createCurry(func, ...args) {
  var wrapper = function(..._args) {
    // 如果参数个数小于最初的 func.length，则递归调用，继续收集参数
    if (args.length + _args.length < func.length) {
      // 合并参数，继续往下传递
      return createCurry(func, ...args, ..._args);
    }

    // 参数收集完毕，则执行func
    return func.apply(func, [...args, ..._args]);
  }

  return wrapper;
}
```

尽管我已经做了足够详细的注解，但是我想理解起来也并不是那么容易，因此建议大家用点耐心多阅读几遍。这个 createCurry 函数的封装借助闭包与递归，实现了一个参数收集，并在收集完毕之后执行所有参数的一个过程。

聪明的读者可能已经发现，把函数经过 createCurry 转化为一个柯里化函数，最后执行的结果，不是正好相当于执行函数自身吗？柯里化是不是把简单的问题复杂化了？

如果你能够提出这样的问题，那么说明你确实已经对柯里化有了一定的了解。柯里化确实是把简答的问题复杂化了，但是复杂化的同时，我们在使用函数时拥有了更加多的自由度。而这里对于函数参数的自由处理，正是柯里化的核心所在。

## 01-实例一

举一个非常常见的例子。

如果我们想要验证一串数字是否是正确的手机号，那么按照普通的思路来做，大家可能是这样封装，如下：

```javascript
function checkPhone(phoneNumber) {
  return /^1[34578]\d{9}$/.test(phoneNumber);
}
```

而如果我们想要验证是否是邮箱呢？这么封装：

```javascript
function checkEmail(email) {
  return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email);
}
```

除此之外，还可能会遇到验证身份证号，验证密码等各种验证信息，因此在实践中，为了统一逻辑，我们就会封装一个更为通用的函数，将用于验证的正则与将要被验证的字符串作为参数传入。

```javascript
function check(reg, targetString) {
  return reg.test(targetString);
}
```

但是这样封装之后，在使用时又会稍微麻烦一点，因为会总是输入一串正则，这样就导致了使用时的效率低下，并且容易出错。

```javascript
check(/^1[34578]\d{9}$/, '14900000088');
check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com');
```

那么这个时候，我们就可以根据柯里化的特性，得到如下几种等价的写法

```javascript
// 参数的处理方式不同
createCurry(check, /^1[34578]\d{9}$/, '183888888')
createCurry(check)(/^1[34578]\d{9}$/)('183888888')
createCurry(check)(/^1[34578]\d{9}$/, '183888888')
```

我们可以选择一种使用最简单的方式，把参数拆分开，提炼出来两个工具方法

```javascript
var _check = createCurry(check)

var checkPhone = _check(/^1[34578]\d{9}$/)
var checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
```

最后在使用的时候就会变得更加直观与简洁了

```javascript
checkPhone('183888888');
checkEmail('xxxxx@test.com');
```

经过这个过程我们发现，柯里化能够应对更加复杂的逻辑封装。当情况变得多变，柯里化依然能够应付自如。

虽然柯里化确实在一定程度上将问题复杂化了，也让代码更加不容易理解，但是柯里化在面对复杂情况下的灵活性却让我们不得不爱。

当然这个案例本身情况还算简单，所以还不能够特别明显的凸显柯里化的优势，我们的主要目的在于借助这个案例帮助大家了解柯里化在实践中的用途。

## 02-实例二

继续来思考一个例子。这个例子与 map 有关。在高阶函数的章节中，我们分析了封装 map 方法的思考过程。由于我们没有办法确认一个数组在遍历时会执行什么操作，因此我们只能将调用 for 循环的这个统一逻辑封装起来，而具体的操作则通过参数传入的形式让使用者自定义。这就是 map 函数。

但是，这是针对了所有的情况我们才会这样想。

实践中我们常常会发现，在我们的某个项目中，针对于某一个数组的操作其实是固定的，也就是说，同样的操作，可能会在项目的不同地方调用很多次。

于是，这个时候，我们就可以在map函数的基础上，进行二次封装，以简化我们在项目中的使用。假如这个在我们项目中会调用多次的操作是将数组的每一项都转化为百分比 1 --> 100%。

普通思维下我们可以这样来封装。

```javascript
function getNewArray(array) {
  return array.map(function(item) {
    return item * 100 + '%'
  })
}

getNewArray([1, 2, 3, 0.12]);   // ['100%', '200%', '300%', '12%'];
```

而如果借助柯里化来二次封装这样的逻辑，则会如下实现：

```javascript
function _map(func, array) {
  return array.map(func);
}

var _getNewArray = createCurry(_map);

var getNewArray = _getNewArray(function(item) {
  return item * 100 + '%'
})
```

最后运用时

```javascript
// ['100%', '200%', '300%', '12%'];
getNewArray([1, 2, 3, 0.12]); 
 
// ['1%', '100%']
getNewArray([0.01, 1]);
```

如果我们的项目中的固定操作是希望对数组进行一个过滤，找出数组中的所有 Number 类型的数据。借助柯里化思维我们可以这样做。

```javascript
// 封装过程
function _filter(func, array) {
  return array.filter(func);
}

// 我们可以分开写
var _find = createCurry(_filter);

// 也可以合起来写
var findNumber = createCurry(_filter)(function(item) {
  if (typeof item == 'number') {
    return item;
  }
})
```

使用

```
findNumber([1, 2, 3, '2', '3', 4]);
 // [1, 2, 3, 4]
```

当我们继续封装另外的过滤操作时就会变得非常简单

```javascript
// 找出数字为10的倍数的子项
var find10 = _find(function(item) {
  if (item % 10 === 0) {
    return item;
  }
})

find10([1, 2, 3, 30, 20, 100]);
// [30, 20, 100]

// 找出数组中大于100的所有数据
var findGreater100 = _find(function(item) {
  if (item > 100) {
    return item;
  }
})

findGreater100([1, 2, 101, 300, 2, 122]); // [101, 300, 122]
```

这个案例采用了与 check 例子不一样的思维方向来想大家展示我们在使用柯里化时的想法。目的是想告诉大家，柯里化能够帮助我们应对更多更复杂的场景。

当然不得不承认，这些例子都太简单了，简单到如果使用柯里化的思维来处理他们显得有一点多此一举，而且变得难以理解。因此我想读者朋友们也很难从这些例子中感受到柯里化的魅力。不过没关系，如果我们能够通过这些例子掌握到柯里化的思维，那就是最好的结果了。在未来你的实践中，如果你发现用普通的思维封装一些逻辑慢慢变得困难，不妨想一想在这里学到的柯里化思维，应用起来，柯里化足够强大的自由度一定能给你一个惊喜。

当然也并不建议在任何情况下以炫技为目的的去使用柯里化，在柯里化的实现中，我们知道柯里化虽然具有了更多的自由度，但同时柯里化通用式里调用了 arguments 对象，使用了递归与闭包，因此柯里化的自由度是以牺牲了一定的性能为代价换来的。只有在情况变得复杂时，才是柯里化大显身手的时候。

------

> 该部分内容可忽略

**额外知识补充**

无限参数的柯里化。

在前端面试中，你可能会遇到这样一个涉及到柯里化的题目。

```javascript
// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```

这个题目的目的是想让 add 执行之后返回一个函数能够继续执行，最终运算的结果是所有出现过的参数之和。而这个题目的难点则在于参数的不固定。我们不知道函数会执行几次。因此我们不能使用上面我们封装的createCurry 的通用公式来转换一个柯里化函数。只能自己封装，那么怎么办呢？在此之前，补充 2 个非常重要的知识点。

一个是 ES6 函数的不定参数。假如我们有一个数组，希望把这个数组中所有的子项展开传递给一个函数作为参数。那么我们应该怎么做？

```javascript
// 大家可以思考一下，如果将args数组的子项展开作为add的参数传入
function add(a, b, c, d) {
  return a + b + c + d;
}
var args = [1, 3, 100, 1];
```

在ES5中，我们可以借助之前学过的apply来达到我们的目的。

```javascript
add.apply(null, args);  // 105
```

而在ES6中，提供了一种新的语法来解决这个问题，那就是不定参。写法如下：

```javascript
add(...args);  // 105
```

这两种写法是等效的。OK，先记在这里。在接下的实现中，我们会用到不定参数的特性。

第二个要补充的知识点是函数的隐式转换。当我们直接将函数参与其他的计算时，函数会默认调用toString方法，直接将函数体转换为字符串参与计算。

```javascript
function fn() { return 20 }
console.log(fn + 10);     // 输出结果 function fn() { return 20 }10
```

但是我们可以重写函数的toString方法，让函数参与计算时，输出我们想要的结果。

```javascript
function fn() { return 20; }
fn.toString = function() { return 30 }

console.log(fn + 10); // 40
```

除此之外，当我们重写函数的valueOf方法也能够改变函数的隐式转换结果。

```javascript
function fn() { return 20; }
fn.valueOf = function() { return 60 }

console.log(fn + 10); // 70
```

当我们同时重写函数的toString方法与valueOf方法时，最终的结果会取valueOf方法的返回结果。

```javascript
function fn() { return 20; }
fn.valueOf = function() { return 50 }
fn.toString = function() { return 30 }

console.log(fn + 10); // 60
```

补充了这两个知识点之后，我们可以来尝试完成之前的题目了。add方法的实现仍然会是一个参数的收集过程。当add函数执行到最后时，仍然返回的是一个函数，但是我们可以通过定义toString/valueOf的方式，让这个函数可以直接参与计算，并且转换的结果是我们想要的。而且它本身也仍然可以继续执行接收新的参数。实现方式如下。

```javascript
function add() {
  // 定义一个数组专门用来存储所有的参数
  var _args = [].slice.call(arguments);

  var _adder = function() {
    // [].push.apply(_args, [].slice.call(arguments));
    _args.push(...arguments);
    return _adder;
  };

  // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  }

  return _adder;
}


var a = add(1)(2)(3)(4);   // f 10
var b = add(1, 2, 3, 4);   // f 10
var c = add(1, 2)(3, 4);   // f 10
var d = add(1, 2, 3)(4);   // f 10

// 可以利用隐式转换的特性参与计算
console.log(a + 10); // 20
console.log(b + 20); // 30
console.log(c + 30); // 40
console.log(d + 40); // 50

// 也可以继续传入参数，得到的结果再次利用隐式转换参与计算
console.log(a(10) + 100);  // 120
console.log(b(10) + 100);  // 120
console.log(c(10) + 100);  // 120
console.log(d(10) + 100);  // 120
```