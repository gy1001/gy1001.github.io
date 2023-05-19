# 05-TS 继承深入+手写优化底层源码

## 01:【TS 继承】前端深度掌握 TS 继承的重要+长远意义

### 练就更深厚的 js 原型 原型链功底

TS 编译后的 JS 中有经典的 JS 原型和原型链的源码实现，虽然稍显复杂，但源码并不长，这将是 练就 更深厚的 JS 原型，原型链功底的绝佳场景。通过这几次课的认真磨练，大家将拥有更深厚的 JS 原型，原型链功底[当然你必须认真看完，多练方可]。这不仅让你日后面试大受益，而且也为你能问读Vue3,React 源码或其他流行框架源码铺路，因为不管是那种源码，JS 原型链续承一定会用到，再加上你的 TS 功底，那么这些都成让你日后前端之路走的更远，走的更高!

### 提升前端项目架构的根基技术

如果要你现在用开发一个工具库，组件库，你打算怎么开发?可以写出n多个版本的代码，都可以实现，但版本和版本之间的价值却差别巨大，你可以用 JS 原型写出1年左右工作经验的前端水准的代码，当然，上乘之选肯定是用 TS 来开发，你也可以灵活运用TS继承，多态等多种技术写出高水准的代码。但如果你不具备后端思维能力，就算你工作了5年，你也不一定能有这样的思维，甚至随时有可能被一个拥有了后端思维的只有1到2年工作经验水准的前端工程师超越。

### 突破前段技术瓶颈之一的技能，晋级中、高级前端工程师必会技能

如果你只掌握了单个类的使用，而不知道如何运用继承，那这也是技能缺失，将会限制你日后技术发展的高度，限制你的技术视野，让你的前端变得过于前端化。

说深度掌握了 TS 继承就能突破所有的前端技术瓶颈，那很显然是夸大其词，但更想突破前端技术瓶颈，深度学握继承必然是其中一项技能，而目是根基技术之一，可见继承的重要性不言而喻，

比如一个简单的汽车租赁项目，让你来实现，你把前端功能实现了，展示在页面上了，但是打开你用 TS 写的Vuex代码，用T5写的 Nodeis代码，过于前端化的思维让你编写的代码可能让人不堪入目。这里不单单是说用到封装继承，多态，解耦这些技术，更多的是你过于前端化的思维编写的项目可扩展性将非带差，可读性也差，可重复用【复用性】也低，而这些是评判一个项目是否值钱的关键因素

如果你希望未来职业生涯拥有更广阔的技术视野，更远的未来你甚至希望自己能胜任技术总监，那么你就一定要从一个更广阔的技术视野来提升自己的技术能力，不能让自己被框在过于前端化的路上

虽然老师不能三言两语给同学们描述出什么才叫做完全突破前端瓶颈，但有一点是可以肯定的，就是要有一定的后端思维能力，这里当然不是要拥有 java 后端能力，而是起码具备 nodejs 后端的项目架构能力，NodeJs 可以是前端工程师提升晋级一定要掌握的技能。而深度掌握了 TS 继承已经为突破前端技术瓶颈开了一个好头

## 02：【TS继承准备】原型链继承+重要的一步

```javascript
function Parent(name, age) {
  this.name = name
  this.age = age
}
Parent.prototype.friends = ['小张', '小李']
Parent.prototype.eat = function () {
  console.log(this.name)
}

function Son(favor, sex) {
  this.favor = favor
  this.sex = sex
}
const parent = new Parent('王五', 30)
console.log('parent', parent)
const sonObj = new Son('打篮球', '男')
console.log('sonObj', sonObj)
console.log('Son.prototype', Son.prototype)

// 原型链继承
//继承带来的好处
// 子类可以访问父类的实例属性
// 子类访问访问父类原型对象空间中的属性和方法
Son.prototype = new Parent('王六', 38)
let sonObj2 = new Son('打篮球', '男')
console.log('Son.prototype 原型链继承之后的指向', Son.prototype)
console.log('sonObj2', sonObj2)
console.log(
  'sonObj2访问son类自身的favor属性【构造函数中this定义的对象属性】',
  sonObj2.favor,
)
console.log('sonObj2访问son对象原型上的name属性', sonObj2.name)
console.log('sonObj2访问friends属性', sonObj2.friends)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99e391a46c1d4dee8c45059e6616fc76~tplv-k3u1fbpfcp-watermark.image?)

1. 原型链继承实现的本质是改变 Son 构造函数的原型对象变量的指向【就是 Son.prototype 的指向】，Son.prototype = new Parent() 那么 Son.prototype 可以访问 Parent 对象空间中的属性和方法，所以顺着 【\_\_proto\_\_】属性，Son 类也可以访问 Parent 类的原型对象空间中的所有属性和方法

   **原型链继承的完整描述**：子对象首先在自己的对象空间中查找要访问的属性或者方法，如果找到，就调用输出，如果没有，就沿着子对象的\_\_proto\_\_属性指向的原型对象空间中去查找有没有这个属性或者方法，如果找到就输出，如果没有，就需要往上查找，直到找到 Object.prototype 原型对象属性指向的原型对象空间为止，如果找不到，返回 null

2. **原型链继承实现容易被遗忘的重要一步**

   ```javascript
   Son.prototype.constructor = Son // 让 Son 类的对象或者函数原型.prototype 指向的原型对象空间【new Parent()对象空间】有一个 Constructor 属性 指向了Son构造函数对象空间
   ```

3. **原型链继承常见疑问**

   Son.prototype = Parent.prototype 这样作为原型链继承的模式和 Son.prototype = new Parent(...) 又有什么区别呢？

   ```javascript
   Son.prototype = Parent.prototype
   Son.prototype.constructor = Son 
   // 这样会导致所有 Parent 的子类的 constructor 都指向 Son 
   // 这样执行后会让 Son.prototype 和 Parent.prototype 和 其他 Parent 子类的 __proto__指向的原型对象空间[Parent.prototype指向的原型对象空间]均指向Son 构造函数对象空间 
   // 这违背了 Parent 原型对象空间中的 constructor属性必须指向 Parent 自身的构造函数的对象
   ```

4. **原型链继承的不足**

   局限性：不能通过子类构造函数向父类构造函数传递参数

