# 28-对象

如果要我总结一下学习编程以来，我遇到了那些瓶颈，那么面向对象一定是第一个毫不犹豫浮现在脑海里的。尽管我现在已经对于面向对象有了一些掌握，但是当初那种似懂非懂的痛苦，依然历历在目。

为了帮助大家能够更加直观的学习和了解面向对象，我会尽量使用简单易懂的方式在展示面向对象的相关知识。并且精心准备了一些实用的例子帮助大家更快的体会到面向对象的真谛。

## 01-对象为何而生

应用程序是对现实事物的描述。如果我们要使用代码的形式来描述一本书，我们没办法使用一个简单的基础数据类型的结构来描述。只能使用复杂的数据集合来表示。在 JavaScript 中，使用如下的方式：

```javascript
const book = {
  title: 'JavaScript 核心进阶',
  author: '这波能反杀',
  publish: '电子工业出版社'
}
```

在 JS 中，这种数据/属性集合，就是对象。

当然，简单的属性值并不能完整的表达一个实例，对于具体实例而言，还应该有一些具体的行为。例如，我想要给书籍添加一个自动阅读的行为，再来一个自毁装置。

```javascript
const book = {
  title: 'JavaScript 核心进阶',
  author: '这波能反杀',
  publish: '电子工业出版社',
  autoRead: function() {},
  destory: function() {}
}
```

在 ECMAScript 的标准中，对象被定义为**无序属性的集合，其属性可以包含基本值，对象，函数。**** 也就是说，对象是由一系列无序的 key-value 对组成。其中 value 可以是基本数据类型，对象，数组，函数等。这刚好符合了上面的案例。

## 02-创建对象

我们可以通过对象字面量的形式创建一个简单对象。

```javascript
const obj = {}
```

也可以通过关键字 new 创建一个对象。

```javascript
const obj = new Object()
```

当我们想要给我们创建的对象添加属性与方法时

```javascript
// 可以这样
const person = {}
person.name = 'TOM'
person.age = 20
person.getName = function {}

// 也可以这样
const person = {
  name: 'TOM',
  age: 20,
  getName: function() {}
}
```

## 03-访问对象的属性与方法

假如我们有一个简单对象如下：

```javascript
const person = {
  name: 'Jake',
  age: 21,
  run: () => {}
}
```

当我们想要访问它的 name 属性时，可以使用如下的方式

```javascript
person.name

// or
person['name']

// or
const _name = 'name'
person[_name]
```

因此，当我们想要访问的属性名是一个变量时，可以使用中括号的方式，例如

```javascript
['name', 'age'].forEach(item => {
  console.log(person[item])
})
```

当我们访问一个不存在的属性时，返回结果为 undefined

```javascript
// person 对象中不存在 gender 属性
person.gender   // undefined
```

## 04-删除

我们可以使用 delete 关键字删除对象中的属性。

```javascript
const person = {
  name: 'TOM'
}

delete person.name
console.log(person.name)  // undefined
```

除了使用输出是否为 undefined 来判断属性是否还存在与对象中，还可以使用 in 操作符。

```javascript
const person = {
  name: 'TOM',
  age: 20
}

delete person.name

console.log('name' in person)   // false
console.log('age' in person)   // true
```

在实践中，in 操作符特别有用，例如快速判断当前应用环境是移动端还是 web 端

```javascript
// 为 true，就表示当前环境支持 touchstart 事件，就是在移动端
'ontouchstart' in document
```

## 05-属性描述对象

在 ECMAScript 内部，针对对象的每一个属性，都有一个描述对象来表达该属性的状态和行为。该描述对象包含如下属性值：

**configurable：**表示该属性是否能被 delete 删除，其值为 false 时，描述对象的其他属性值都不能被改变。默认值为true。**enumerable：**该属性是否能被枚举。也就是是否能被 for-in 遍历，默认值为 true**writable：**该属性值是否能被修改。默认值为 true**value：**该属性的具体值。默认为 undefined**get：**当我们通过 `person.name` 访问 name 属性时，get 方法将被调用。该方法可以自定义返回的具体值。默认值为 undefined**set：**当我们通过 `person.name = 'Jake'` 设置 name 值时，set 方法将被调用。该方法可以自定义设置值的具体方式。默认值为 undefined

我们可以通过 `Object.defineProperty` 来修改属性的描述对象。需要注意的是，不能同时设置 value/writable 与 get/set 的值。

下面我们使用一些具体的实践案例来演示这些属性的具体表现。

**configurable**

```javascript
// 用普通的方式给person对象添加一个name属性，值为TOM
  const person = {
    name: 'TOM'
  }

  // 使用delete删除该属性
  delete person.name; // 返回true 表示删除成功

  // 通过Object.defineProperty重新添加name属性
  // 并设置name的属性类型的configurable为false，表示不能再用delete删除
  Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'Jake' // 设置name属性的值
  })

  // 再次delete，已经不能删除了
  delete person.name // false

  console.log(person.name) // 值为Jake

  // 试图改变value
  person.name = "alex";
  console.log(person.name) // Jake 改变失败，结果仍然为 Jake
```

**enumerable**

```javascript
const person = {
  name: 'TOM',
  age: 20
}

// 使用for-in枚举person的属性
const params = [];

for (var key in person) {
  params.push(key);
}

// 查看枚举结果
console.log(params); // ['name', 'age']

// 重新设置name属性的类型，让其不可被枚举
Object.defineProperty(person, 'name', {
  enumerable: false
})

const params_ = [];
for (var key in person) {
  params_.push(key)
}

// 再次查看枚举结果
console.log(params_); // ['age']
```

**writable**

```javascript
const person = {
  name: 'TOM'
}

// 修改name的值
person.name = 'Jake';

// 查看修改结果
console.log(person.name); // Jake 修改成功

// 设置name的值不能被修改
Object.defineProperty(person, 'name', {
  writable: false
})

// 再次试图修改name的值
person.name = 'alex';

console.log(person.name); // Jake 修改失败
```

**value**

```javascript
const person = {}

// 添加一个name属性
Object.defineProperty(person, 'name', {
  value: 'TOM'
})

console.log(person.name) // TOM
```

**get/set**

```javascript
const person = {}

// 通过get与set自定义访问与设置name属性的方式
Object.defineProperty(person, 'name', {
  get: function () {
    // 一直返回TOM
    return 'TOM'
  },
  set: function (value) {
    // 设置name属性时，返回该字符串，value为新值
    console.log(value + ' in set');
  }
})

// 第一次访问name，调用get
console.log(person.name) // TOM

// 尝试修改name值，此时set方法被调用
person.name = 'alex' // alex in set

// 第二次访问name，还是调用get
console.log(person.name) // TOM
```

在使用 get/set 时，应该尽量同时自定义 get/set，如果仅仅只设置了 get，我们将无法设置该属性值，如果仅仅只设置了 set，我们也无法读取该属性值。

Object.defineProperty 只能设置一个属性的属性对象值，当我们想要同时设置多个属性的特性值时，需要使用 **Object.defineProperties**

```javascript
const person = {}

Object.defineProperties(person, {
  name: {
    value: 'Jake',
    configurable: true
  },
  age: {
    get: function () {
      return this.value || 22
    },
    set: function (value) {
      this.value = value
    }
  }
})

person.name // Jake
person.age // 22
```

**读取属性的描述对象**

属性的描述对象为私有属性，无法直接访问，但是我们可以使用 **Object.getOwnPropertyDescriptor** 方法读取某一个属性的特性值。

```javascript
const person = {}

  Object.defineProperty(person, 'name', {
    value: 'alex',
    writable: false,
    configurable: false
  })

  var descripter = Object.getOwnPropertyDescriptor(person, 'name');

  console.log(descripter); // 返回结果如下

  descripter = {
    configurable: false,
    enumerable: false,
    value: 'alex',
    writable: false
  }
```