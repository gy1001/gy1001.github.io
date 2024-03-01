# 32-继承

**承是对类的封装。**这是继承最核心的理念。

怎么来理解呢？通过一个实践案例来聊一聊。

现在有许多的类，如下，学生，教师，医生等等。

```javascript
class Student {}
class Teacher {}
class Doctor {}
```

这些类，都需要处理 name，age 等人员的基本信息。

```javascript
class Student {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() { return this.name }
}

class Teacher {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() { return this.name }
}

class Doctor {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() { return this.name }
}
```

此时我们发现，这些逻辑代码基本上都是一致的，因此我们可以考虑将这些共同的逻辑代码抽离出来，成为一个基类

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() { return this.name }
}
```

然后通过继承的方式，复用代码逻辑

```javascript
class Student extends Person {}
class Teacher extends Person {}
class Doctor extends Person {}
```

代码得到了极大的简化。这也是为什么我们要总结为，继承，是对类的封装。对于实践应用这个观念特别重要，因为他会涉及到一个很重要的理念：**先有父类还是先由子类？**

初学时，可能会认为，应该先有父类，再有子类。但是实际情况并非如此，继承是对类的封装，那么也就意味着，应该先有子类，然后从子类中提炼出来父类。

## 01-继承

class 语法本质上来说是一个语法糖，在 JavaScript 中，面向对象仍然是通过构造函数与原型对象来体现。因此，继承也要分两部分来理解，一部分是构造函数的继承，一部分是原型的继承。

因为继承是对子类的封装，因此**当子类继承时，其实是将父类的代码逻辑，复制到子类中去。**

那么构造函数的继承写法就很简单，我们借助 call 方法来达到复制逻辑的目的。

```javascript
// 父类构造函数
function Person(name, age) {
  this.name = name
  this.age = age
}

// 构造函数的继承
function Student(name, age, grade) {
  Person.call(this, name, age)
  this.grade = grade
}

// 等价于
function Student(name, age, grade) {
  this.name = name
  this.age = age
  this.grade = grade
}
```

原型的继承也可以使用代码复制的思路去理解和实现，不过在实现中，有更节省内存空间的方案。我们知道，原型能够访问到原型链上其他原型的方法，因此，我们只需要想办法，让子类的原型对象，成为父类的实例，就能到达到复制的效果，也不用创建新的函数。

```javascript
// 将父类的原型对象作为参数传入
function create(proto, options) {
  // 创建一个空对象
  const tmp = {};

  // 让这个新的空对象成为父类对象的实例
  tmp.__proto__ = proto;

  // 传入的方法都挂载到新对象上，新的对象将作为子类对象的原型
  Object.defineProperties(tmp, options);
  return tmp;
}
```

然后我们就可以使用 create 方法来实现原型的继承了。

```javascript
Student.prototype = create(Person.prototype, {
  // 不要忘了重新指定构造函数
  constructor: {
    value: Student
  },
  getGrade: {
    value: function () {
      return this.grade
    }
  }
})
```

在 ECMAScript 5 中也直接提供了一个 `Object.create` 方法来完成上面封装的 create 的功能，我们可以在实践中直接使用 Object.create

示例代码如下：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function () {
  return this.name
}
Person.prototype.getAge = function () {
  return this.age;
}

function Student(name, age, grade) {
  // 构造函数继承
  Person.call(this, name, age);
  this.grade = grade;
}

// 原型继承
Student.prototype = Object.create(Person.prototype, {
  // 不要忘了重新指定构造函数
  constructor: {
    value: Student
  },
  getGrade: {
    value: function () {
      return this.grade
    }
  }
})


var s1 = new Student('ming', 22, 5);

console.log(s1.getName()); // ming
console.log(s1.getAge()); // 22
console.log(s1.getGrade()); // 5
```



