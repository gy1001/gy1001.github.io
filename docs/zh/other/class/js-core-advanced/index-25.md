# 25-高阶函数

我想大家对于面向对象相关的知识都应该有所涉猎「如果还没有接触过，可以在后面的章节中学习」，有一个问题会困扰很多人：

在构造函数中，如果我们使用了 this，那么这个 this 指向的是谁？ 如果在定义的原型方法中使用 this，这个 this 又指向谁？是构造函数？原型？还是实例？

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  return this.name;
}

const p1 = new Person('Jake', 18);
p1.getName();
```

我们知道构造函数其实就是普通的函数，我们也知道 this 其实是在函数运行时才确认的。那么是什么导致了构造函数变得特别？

**答案与new关键字有关。**

如果自定义一个 New 方法，来模拟关键字 new 的能力，那么应该如下实现：

```javascript
// 将构造函数以参数形式传入
function New(func) {

  // 声明一个中间对象，该对象为最终返回的实例
  var res = {};
  if (func.prototype !== null) {

    // 将实例的原型指向构造函数的原型
    res.__proto__ = func.prototype;
  }

  // ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
  var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

  // 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret;
  }

  // 如果没有明确指定返回对象，则默认返回res，这个res就是实例对象
  return res;
}
```

为了方便大家理解，我在例子中做了详细的注解。通过 New 方法的实现我们可以看出，当 New 执行时，利用apply 显示的指定了传入的构造函数的 this 指向。因此当我们使用 New 创建实例时，**构造函数中 this 是指向被创建的实例。**

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  return this.name;
}

// 使用上例中封装的New方法来创建实例
var p1 = New(Person, 'Jake', 18);
var p2 = New(Person, 'Tom', 20);
p1.getName(); // Jake
p2.getName(); // Tom
```

把当前函数看成基础函数的话，那么**高阶函数，就是让当前函数获得额外能力的函数。**

如果我们把构造函数看成基础函数的话，那么 New 方法，就是构造函数的高阶函数。构造函数本就是和普通函数一样，没有什么区别。但是因为 new 的存在，它获得了额外的能力。New 方法每次执行都会创建一个新的中间对象，并将中间对象的原型，指向构造函数的原型，将构造函数的 this 指向该中间对象。这样统一逻辑的封装，就是高阶函数的运用。

如果简单粗暴一点的理解，凡是接收一个函数作为参数的函数，都是高阶函数。但是如果这样理解，那么我们可能并不能很好的利用高阶函数的特性来让我们的代码变得更加优雅。因为高阶函数其实是一个高度封装的过程，理解他需要一点神奇的想象力。接下来，我们借助几个例子，来理解高阶函数的封装。

## 01-数组map方法封装的思考过程

数组有一个 map 方法，它对数组中的每一项运行特定的函数，返回每次函数调用的结果组成的新数组。通俗来说，就是遍历数组的每一项，并且在 map 的第一个参数中进行运算并返回结算结果。最后返回一个由所有计算结果组成的新数组。

```javascript
// 声明一个被遍历的数据array
var array = [1, 2, 3, 4];

// map方法第一个参数为一个回调函数，该函数拥有三个参数
//  + 第一个参数表示 array 数组中的每一项
//  + 第二个参数表示当前遍历的索引值
//  + 第三个参数表示数组本身
//  + 该函数中的 this 指向为 map 方法的第二个参数，若该参数不存在，则this指向丢失
const newArray = array.map(function(item, i, array) {
    console.log(item, i, array, this); // 可运行查看每一项参数的具体值
    return item + 1;
}, { a: 1})

// newArray为一个新数组，由map遍历的结果组成
console.log(newArray); // [2, 3, 4, 5]
```

上面的例子详细分析了 map 的所有细节。现在需要我们思考的是，如果要我们自己来封装这样一个方法，应该怎么办？

所有的数组遍历方法，都是在 for 循环的基础之上封装的，因此我们可以从 for 循环开始考虑。

一个 for 循环的过程其实很好封装，但是难点在于，for 循环里面要对数组每一子项所做的事情很难用一个固定的模式把它封装起来，在不同的场景下，for 循环对数据的处理肯定是不一样的。那么怎么办？

在封装函数时，一个不确定的变量，我们可以往函数中传入参数的方式来指定它。例如：

```javascript
function add(a) {
  return a + 10;
}
```

那么同样的道理，一个不确定的处理过程，我们可以往函数中传入另外一个函数的方式来自定义这个处理过程。这里也是体现了函数作为一等公民的重要特点。

基于这个思路，就可以按照如下的方式封装 map 方法。

```javascript
Array.prototype._map = function(fn, context) {
  // 首先定义一个数组来保存每一项的运算结果，最后返回
  var temp = [];
  if(typeof fn == 'function') {
    var k = 0;
    var len = this.length;
    // 封装for循环过程
    for(; k < len; k++) {
      // 将每一项的运算操作丢进fn里，利用call方法指定fn的this指向与具体参数
      temp.push(fn.call(context, this[k], k, this))
    }
  } else {
    console.error('TypeError: '+ fn +' is not a function.');
  }

  // 返回每一项运算结果组成的新数组
  return temp;
}

var newArr = [1, 2, 3, 4]._map(function(item) {
  return item + 1;
})
// [2, 3, 4, 5]
```

回过头反思 map 方法的封装过程，可以发现，其实我们封装的是一个数组的 for 循环过程。每一个数组在使用for循环遍历时，虽然无法确认在 for 循环中到底会干什么事情，但是我们可以确定的是，他们一定会使用for循环。

于是，可以把使用 for 循环这个公共的逻辑封装起来，而具体要干什么事，则以一个函数作为参数的形式，来让使用者自定义。这个被作为参数传入的函数，我们可以称之为基础函数。而我们封装的 map 方法，就可以称之为高阶函数。

**高阶函数的使用思路正是在于此，他其实是一个封装公共逻辑的过程。**例如此处的 for 循环逻辑。

在实践中，高阶函数的用途也十分广泛，接下来我们通过另外一个例子再次来感受一下高阶函数的魅力。

## 02-实践

假设我们正在做一个音乐社区的项目。

很显然的，在进入这个项目中的每一个页面时，我们都必须判断当前用户是否已经登录。因为有人登录与没人登录所展示的页面肯定是有很多差别的。不仅如此，在确认用户登录之后，我们还要得到用户的具体信息，昵称，姓名，vip 等级，权限范围等。

因此用户状态的判断逻辑，是每一个页面都必须要做的一个公共逻辑。在学习了高阶函数之后，可以用高阶函数来做这件事情。

为了强化读者朋友们的模块化思维，这里继续使用模块化的方式来完成这个 demo。根据现有的知识，我们可以利用自执行函数来划分模块。

首先需要一个高阶函数来专门处理获取用户状态的逻辑。因此可以单独将这个高阶函数封装为一个独立的模块。

```javascript
// 高阶函数withLogin，用来判断当前的用户状态
(function() {
  // 用随机数的方式来模拟一个获取用户信息的方法
  const getLogin = function() {
    var a = parseInt(Math.random() * 10).toFixed(0));
    if (a % 2 == 0) {
      return { login: false }
    }

    return {
      login: true,
      userinfo: {
        nickname: 'jake',
        vip: 11,
        userid: '666666'
      }
    }
  }

  const withLogin = function(basicFn) {
    const loginInfo = getLogin();

    // 将loginInfo以参数的形式传入基础函数中
    return basicFn.bind(null, loginInfo);
  }

  window.withLogin = withLogin;
})();
```

假设我们要展示主页，可以通过一个 renderIndex 的方法来渲染。当然，渲染主页仍然是一个单独的模块。

```javascript
(function() {
  const withLogin = window.withLogin;

  const renderIndex = function(loginInfo) {
    // 这里处理index页面的逻辑

    if (loginInfo.login) {
      // 处理已经登录之后的逻辑
    } else {
      // 这里处理未登录的逻辑
    }
  }

  // 对外暴露接口时，使用高阶函数包一层，来执行当前页面的登录状态的判断
  window.renderIndex = withLogin(renderIndex);
})();
```

同样的道理，当我们想要展示其他的页面，例如个人主页时，会有一个 renderPersonal 方法，如下：

```javascript
(function() {
  const withLogin = window.withLogin;
  const renderPersonal = function(loginInfo) {
    if (loginInfo.login) {
      // do something
    } else {
      // do other something
    }
  }
  window.renderPersonal = withLogin(renderPersonal);
})();
```

使用高阶函数封装每个页面的公共逻辑之后，会发现代码逻辑变得非常清晰，而且更加统一。当我们再写新的页面逻辑，就在此基础上完成即可，就再也不用去考虑已经封装过的逻辑。

最后，在合适的时机使用这些渲染函数即可。

```javascript
(function() {
  window.renderIndex();
})();
```

在你的项目中使用高阶函数，你的代码会变得更加优雅，也更具逼格。