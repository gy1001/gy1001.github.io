# this 指针

## 1、判断 this

1. 函数是否在 new 中调用(new 绑定) ？

   > 如果是的话，this 绑定的时新创建的对象

   ```javascript
   var bar = new Foo()
   ```

2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？

   > 如果是的话，this 绑定的是指定的对象

   ```javascript
   var bar = foo.call(obj2)
   ```

3. 函数是否在某个上下文对象中调用（隐式绑定）？

   > 如果是的话，this 绑定的是那个上下文对象

   ```javascript
   var bar = obj1.foo()
   ```

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined 中，否则绑定到全局对象

   ```javascript
   var bar = foo()
   ```

就是这样，对于正常的函数调用来说，理解了这些就可以明白 this 的绑定原理了。不过，凡事总有例外。

## 2、 箭头函数

**ES6** 中的箭头函数并不会使用上述四种标准的绑定规则，而是根据当前的词法作用域来决定 **this**，具体来说，箭头函数会继承外层函数调用的 **this** 绑定（无论 **this** 绑定到什么）。这其实 **ES6** 之前代码中的 **self = this** 机制一样
