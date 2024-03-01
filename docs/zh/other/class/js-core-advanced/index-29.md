# 29-一切始于封装

面向对象思维，在任何开发语言中，都是必不可少的思维模式。那么什么是面向对象思维呢？

上一章我们知道，对象是使用代码描述一个具体的实例。现在有三个实例，张三，李四，王五。我们使用代码描述如下

```javascript
const p1 = {
  name: '张三',
  age: 20,
  run: function() {
    console.log('调用此方法张三就开始奔跑')
  },
}

const p2 = {
  name: '李四',
  age: 22,
  run: function() {
    console.log('调用此方法李四就开始奔跑')
  },
}

const p3 = {
  name: '王五',
  age: 21,
  run: function() {
    console.log('调用此方法王五就开始奔跑')
  },
}
```

我们仔细分析一下这段代码，当有需求定义三个实例时，我们会发现，他们的相似度很高，这里我们还是把人的对象进行了简化的结果。如果具体的真实实践，代码的重复逻辑还会更多。**于是，减少重复的代码编写就成为了很重要的代码优化思路。**

我们可以使用**封装**的思路来达到优化目的。

封装一个函数来帮助我们创建对象，**提取共同点，将不同点作为参数传入。**

```javascript
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    run: function() {
      console.log(`调用此方法${name}就会开始奔跑`)
    }
  }
}
```

封装好之后，创建对象就变得非常简单，一行代码搞定。

```javascript
const p1 = createPerson('张三', 20)
const p2 = createPerson('李四', 22)
const p3 = createPerson('王五', 21)
```

代码重复的问题解决了，又发现了新的优化项。

前面我们学习了内存空间和函数之后，我们会发现，当我们使用函数 createPerson 创建对象时，run 方法被反复创建了多次。几乎同样的内容，占据了多分内存空间。如果这个问题不解决，使用者一不小心，就有可能会导致内存空间的巨大消耗。因此，解决内存优化的问题势在必行。

那要如何解决呢？

如果我们在全局定义一个单独函数，行不行？

```javascript
function run() {}
function createPerson(name, age) {
  return {
    name: name, 
    age: age,
    run: run
  }
}
```

这样，我们在重复调用 createPerson 之后，就避免了反复创建 run 函数，所有的实例都引用同样的函数。

但是还有一个问题没有解决，在 run 函数内部，使用了实例的 name 属性，那么 run 函数如何访问的使用每个实例独有，并且值不一样的 name 属性呢？

通过函数传参肯定不行，这时我们想到了函数内部还有一个 this 属性。如果我们能够想办法让 run 函数内部 this，与 createPerson 函数内部的 this 都指向同样的对象，那么只需要把 name 属性，挂载到 this 上，在 run 函数内部就能够访问到 ceratePerson 内部的属性了。

然后 run 和 createPerson 可以这样封装

```javascript
function run() {
 console.log(`调用此方法${this.name}就会开始奔跑`)
}

function createPerson(name, age) {
  this.name = name
  this.age = age
  
  return this
}
```

那怎么样才能让两个方法的 this 指向都相同呢？

对于 run 方法来说，我们之前有提到过，谁是 run 的调用者，run 函数内部的 this 就会指向谁，因此一般情况，我们使用 run 方法，都是直接通过实例

```javascript
const p1 = createPerson('Tom', 20)

p1.run()
```

因此，当我们这样调用时，run 函数内部的 this 很自然的就会指向实例 p1。

关键就在于，如何让 createPerson 内部的 this 也指向 p1。我们可以使用高阶函数来解决这个问题。我们知道，高阶函数能够赋予基础函数更多的能力，此时，如果我们把 createPerson 作为基础函数传入高阶函数，让高阶函数内部来处理 createPerson this 指向，那么问题就能够得到解决。

因此，我们要设计这样一个高阶函数，他能够明确的指定 createPerson 函数内部的 this 指向。我们将这个高阶函数命名为 New。那么我们创建新的实例就会这样使用。

```javascript
const p1 = New(createPerson, 'Tom', 20)
```

New 的逻辑也很简单，就是在内部创建一个空的对象，然后通过 call/apply 强制指定 createPerson 执行时的 this 指向该空对象，并且最后返回该空对象作为实例即可。代码如下

```javascript
// 将构造函数以参数形式传入
function New(func) {

  // 声明一个中间对象，该对象为最终返回的实例
  const res = {};
  if (func.prototype !== null) {

    // 将实例的原型指向构造函数的原型
    res.__proto__ = func.prototype;
  }

  // ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
  const ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

  // 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret;
  }

  // 如果没有明确指定返回对象，则默认返回res，这个res就是实例对象
  return res;
}
```

原型的指向处理是为了构建原型链，我们这里的逻辑可以忽略。

此时，run 方法还处于游离状态，我们应该用一个专门的对象把所有的共有方法都收集在一起，在 JavaScript 的解决方案中，使用原型对象来做了这个事情。

因此，定义时，run 方法会这样写

```javascript
createPerson.prototype.run = function() {
  console.log(`调用此方法${this.name}就会开始奔跑`)
}
```

于是一个对象封装的完整思路就被我们整理出来了，完整代码如下

```javascript
// 将构造函数以参数形式传入
function New(func) {

  // 声明一个中间对象，该对象为最终返回的实例
  const res = {};
  if (func.prototype !== null) {

    // 将实例的原型指向构造函数的原型
    res.__proto__ = func.prototype;
  }

  // ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
  const ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

  // 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret;
  }

  // 如果没有明确指定返回对象，则默认返回res，这个res就是实例对象
  return res;
}

function createPerson(name, age) {
  this.name = name
  this.age = age
}
createPerson.prototype.run = function() {
  console.log(`调用此方法${this.name}就会开始奔跑`)
}

const p1 = New(createPerson, 'TOM', 20)
const p2 = New(createPerson, 'Jake', 22)
const p3 = New(createPerson, 'Amy', 21)

p1.run()
p2.run()
p3.run()
```

观察输出结果，完美的符合我们的预期。