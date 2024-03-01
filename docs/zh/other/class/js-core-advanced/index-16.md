# 16-闭包的应用

对于闭包的理解，有许多错误的言论。其中一个比较常见的言论就是：我们应该尽量避免使用闭包。

闭包给我们的功能实现，带来了许多的便利，在代码中，闭包几乎是无处不在，无论你愿意或者不愿意，你都在有意或者无意的使用闭包来解决问题。

## 01-一道面试题

利用闭包的知识，修改如下这段代码，让代码的执行结果为隔秒输出 1、2、3、4、5

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

我们首先来分析一下如果直接运行这个例子会输入什么结果。

我们知道，如果使用 var 声明 i，那么 for 循环的大括号就不会形成自己的作用域，因此这个时候 i 值就是存在于全局的一个变量，会随着循环过程持续递增。因此循环结束之后， i 的值会递增为 6。

每一个循环中，setTimeout 的第二个参数都是访问的当前 i 值，因此循环过程中，会执行 5 次 setTimeout，它们的第二个参数中的 i 值会分别为 1、2、3、4、5。而第一个参数 timer 函数虽然也访问的是同一个 i 值，但是 timer 会至少延迟 1s 执行，因此当 timer 执行时，此时的 i 值早就已经变成了 6。

因此这段代码的输入结果为：隔秒输出 6.

而我们想要达到隔秒输出 1、2、3、4、5 的目的，就必须要想办法将 i 值分开，让 循环过程中的 i 值，处于不同的作用域环境中，以确保 timer 函数执行时，访问的是不同的 i ，这样才能达到目的。

最简单的方法，就是把 i 的声明方式修改成为 let

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

当然，这并不是我们想要的结果，因为我们的初衷还是想要对闭包更为了解。

上面我们分析过，要达到目的，就需要形成不同的作用域，把每次循环的 i 值与 timer 函数中访问的 i 值保持一致，而 除了 let 声明能够形成作用域，函数也可以。所以，我们也可以借助函数来达到目的。

最简单的方式，就是利用自执行函数，将循环内的代码包裹起来

```javascript
// 原代码
setTimeout(function timer() {
  console.log(i);
}, i * 1000);

// 等价于
(function() {
 setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
})()
```

此时，timer 函数中的 i 值，访问的仍然是 for 循环上的 i 值，作用域虽然有了，但是 i 值并没有区分开。只需要做一个简单的操作，就能将 i 值区分开，那就是，将 i 值，作为参数传入自执行函数形成的作用域中。

```javascript
(function(i) {
 setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
})(i)
```

这样，timer 函数中访问的 i 值，就变成了自执行函数的参数 i，也就达到了隔离 i 值的目的。

完整代码为：

```javascript
for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })(i)
}
```

我们会发现，每一次循环中，自执行函数与 timer 形成了闭包。这也是的 i 值在各自的作用域中能够保存下来。

我们再仔细分析，发现仅仅只是 timer 函数中的 i 值需要被隔离，因此我们可以把自执行函数的范围缩小到只约束 timer 函数。调整如下：

```javascript
for(var i = 1; i <= 5; i++) {
  setTimeout((function (i) {
    return function timer() {
      console.log(i);
    }
  })(i), i * 1000);
}
```

## 02-单例模式与闭包

在 JavaScript 中有许多解决特定问题的编程模式，例如工厂模式，发布订阅模式，装饰模式，代理模式，单例模式等等。其中，单例模式是我们在实践中最常用的模式之一，而他在实践中的应用，与闭包息息相关。

所谓的单例模式，就是只有一个实例的对象。

对象字面量的方法，就是最简单的单例模式，我们可以将属性与方法依次放在字面量里。

```javascript
var per = {
  name: 'Jake',
  age: 20,
  getName: function () {
    return this.name;
  },
  getAge: function () {
    return this.age;
  }
}
```

但是这样的单例有一个小问题，他的属性可以被外部修改。因此在许多场景这样的写法并不符合我们的需求。我们期望对象能够有自己的私有方法与属性。

通过前面的知识我们知道，实例想要拥有一个自己的私有方法/属性，那么需要一个单独的作用域将实例内部与外部隔离开。我们借助匿名函数自执行的方式就能够达到这个目的。

将上面的代码修改如下：

```javascript
var per = (function () {
  var name = 'Jake';
  var age = 20;

  return {
    getName: function () {
      return name;
    },

    getAge: function () {
      return age;
    }
  }
})();

// 访问私有变量
per.getName();
```

我们将属性 name 与 age 封装在实例内部，并且对外抛出两个方法 getName 和 getAge。当我们想要访问内部属性 name 时，就不能直接通过 `per.name` 的方式访问，而只能通过公开的方法 getName 进行访问。

私有变量的好处在于，外界要对私有变量进行什么操作，是可控的。我们可以提供一个 getName 方法用于外界访问到属性 name，也可以提供一个 setName 方法来修改 name，对外提供什么样的能力，完全由我们自己决定。

不知不觉中，我们已经在利用闭包来解决问题。我们在匿名函数中，声明变量 name，并且在 getName 中访问它，闭包就已经产生。

而这个时候，我们使用的案例，已经非常接近模块化思维了。在模块化的开发中，每一个模块都是一个与此类似的单例。

有的时候「使用频次较少」，我们希望自己的实例，仅仅只是在调用的时候才会初始化，而不是如上面的例子那样，在声明时就已经是一个实例了。此时需要在上面例子的基础上，做一个简单的判断。

```javascript
var person = (function () {
  // 定义一个变量，用来保存实例
  var instance = null;
  var name = 'Jake';
  var age = 20;

  // 初始化方法
  function initial() {
    return {
      getName: function () { return name; },
      getAge: function () { return name; }
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = initial();
      }
      return instance;
    }
  }
})();

// 只在使用时获得实例
var p1 = person.getInstance();
var p2 = person.getInstance();

console.log(p1 === p2); // true
```

在匿名函数中，定义了一个 instance 变量来保存实例。在 getInstance 方法中判断是否对它进行重新赋值。由于这个判断的存在，变量 instance 就永远只会被赋值一次。所以这样写就完美符合了单例模式的思路。

## 03-模块与闭包

如果我们想要项目中的所有地方，都能够访问到同一个变量，应该怎么办？在实践中有非常多这样的需求，例如全局状态管理。

但是我们之前也有提到过，实践中不能轻易使用全局变量，这个时候想要一个变量能够被所有地方访问，就需要一点转变。模块化思维能够轻松帮我们解决这个问题。这是目前最流行，也是必须要掌握的一种开发思路。

模块化其实是建立在单例模式的基础之上，一个模块，其实就是一个单例。我们可以直接使用自执行函数模拟一个模块，变量名就是模块名。

```javascript
var module_test = (function() {

})();
```

每一个模块想要与其他模块进行交互，那么就必须具备获取其他模块的能力，例如 requirejs 中的 require，ES6 Modules 中 import

```javascript
// require
var $ = require('jquery');

// es6 modules
import $ from 'jquery';
```

当然，我们这里再定义模块时，模块名就已经是一个全局变量了，于是就省略了这一步。

每一个模块都应该有对外提供的接口，以保证具备与其他模块交互的能力，我们这里直接使用 return 返回一个字面量对象的方式来对外提供接口即可。

```javascript
var module_test = (function () {
  ...

  return {
    testfn1: function () { },
    testfn2: function () { }
  }
})();
```

有了这些关于模块的基本概念，那么我们现在结合一个简单的例子，走一遍模块化开发的过程。

我们这个案例，想要实现的功能是每隔一秒，body 背景就随着一个数字的递增而在固定的三种颜色之间切换。

首先创建一个专门用来管理全局状态的模块。这个模块中，有一个私有变量，保存了所有的状态值，并对外提供了访问与设置这个私有变量的方法：

```javascript
var module_status = (function () {
  var status = {
    number: 0,
    color: null
  }

  var get = function (prop) {
    return status[prop];
  }

  var set = function (prop, value) {
    status[prop] = value;
  }

  return {
    get: get,
    set: set
  }
})();
```

然后专门创建一个负责 body 背景颜色变化的模块

在这个模块中，引入了管理状态的模块，并且将颜色的管理与改变方式都定义在该模块中，在使用只需要调用 render 方法就可以了。

```javascript
var module_color = (function () {
  // 假装用这种方式执行第二步引入模块 类似于 import state from 'module_status';
  var state = module_status;
  var colors = ['orange', '#ccc', 'pink'];

  function render() {
    var color = colors[state.get('number') % 3];
    document.body.style.backgroundColor = color;
  }

  return {
    render: render
  }
})();
```

接下来，我们需要创建另外一个模块来负责显示当前的 number 值，用于参考对比。

```javascript
var module_context = (function () {
  var state = module_status;

  function render() {
    document.body.innerHTML = 'this Number is ' + state.get('number');
  }

  return {
    render: render
  }
})();
```

OK，这些功能模块都创建完毕之后，最后只需要创建一个主模块即可。这个模块的目的，是借助功能模块来实现最终的效果。

```javascript
var module_main = (function () {
  var state = module_status;
  var color = module_color;
  var context = module_context;

  setInterval(function () {
    var newNumber = state.get('number') + 1;
    state.set('number', newNumber);

    color.render();
    context.render();
  }, 1000);
})();
```

如果你有过模块化开发的经验，那么结合前面对于闭包的理解，这段代码就再简单不过了，而如果你是初次正式学习模块化的概念，这个例子也是非常值得细细品味。具体的展示效果，大家把这段代码摘抄到一个 html文件的script标签中即可查看。

完整代码如下：

```javascript
var module_status = (function () {
  var status = {
    number: 0,
    color: null
  }

  var get = function (prop) {
    return status[prop];
  }

  var set = function (prop, value) {
    status[prop] = value;
  }

  return {
    get: get,
    set: set
  }
})();

var module_color = (function () {
  // 假装用这种方式执行第二步引入模块 类似于 import state from 'module_status';
  var state = module_status;
  var colors = ['orange', '#ccc', 'pink'];

  function render() {
    var color = colors[state.get('number') % 3];
    document.body.style.backgroundColor = color;
  }

  return {
    render: render
  }

})();

var module_context = (function () {
  var state = module_status;

  function render() {
    document.body.innerHTML = 'this Number is ' + state.get('number');
  }

  return {
    render: render
  }
})();

var module_main = (function () {
  var state = module_status;
  var color = module_color;
  var context = module_context;

  setInterval(function () {
    var newNumber = state.get('number') + 1;
    state.set('number', newNumber);

    color.render();
    context.render();
  }, 1000);
})();
```

这里就先以这个简单的例子让大家初步感受一下模块化的开发思维，等后续的章节学习了更加规范的模块化语法之后，我们再结合涉及面更广的实际案例来学习。当然，这里介绍的模块化思维与开发方式大家仍然可以用在稍微简单一点的页面中（或者你的项目还没用到构建工具），这样的思路来开发代码，肯定要比把代码从头码到尾更加的合理。