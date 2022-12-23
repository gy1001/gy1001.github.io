# 原型和原型链
> JS 是一种基于原型继承的语言，在ES6之前实现继承只能通过原型链

## 1. class 和 继承

### 1.1 Class
* constructor
* 属性
* 方法
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>class-demo</title>
  </head>
  <body></body>
  <script>
    class Student {
      constructor (name, number) {
        this.name = name
        this.number = number
      }
      sayHi () {
        console.log(`姓名${this.name},学号${this.number}`)
      }
      study () {
        console.log('study')
      }
    }
    // 通过类可以声明一个实例
    const xiaLuo = new Student('夏洛', 100)
    console.log(xiaLuo.name) // 夏洛
    console.log(xiaLuo.number) // 100
    console.log(xiaLuo.sayHi()) // 姓名夏洛,学号100  undefined
  </script>
</html>
```

### 1.2 继承

- extends
- super
- 扩展或者重写方法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>class-extends</title>
  </head>
  <body></body>
  <script>
    class People {
      constructor (name) {
        this.name = name
      }
      eat () {
        console.log(`${this.name} eat something`)
      }
    }
    // 子类
    class Student extends People {
      constructor (name, number) {
        super(name)
        this.number = number
      }
      sayHi () {
        console.log(`姓名${this.name},学号${this.number}`)
      }
    }
    // 子类
    class Teacher extends People {
      constructor (name, major) {
        super(name)
        this.major = major
      }
      teach () {
        console.log(`${this.name} 教授 ${this.major}`)
      }
    }
    // student 实例
    const xiaLuo = new Student('夏洛', 100)
    console.log(xiaLuo.name) // 夏洛
    console.log(xiaLuo.eat()) // 夏洛 eat something   undefined
    // teacher 实例
    const wangLaoShi = new Teacher('王老师', '语文')
    console.log(wangLaoShi.name) // 王老师
    console.log(wangLaoShi.teach()) // 王老师 教授 语文  undefined
    console.log(wangLaoShi.eat()) // 王老师 eat something  undefined
  </script>
</html>
```
## 2. 类型判断 instanceof

> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```javascript
console.log(xiaLuo instanceof Student) // true
console.log(xiaLuo instanceof People) // true
console.log(xiaLuo instanceof Object) // true
console.log([] instanceof Array) // true
console.log([] instanceof Object) // true
console.log({} instanceof Object) // true
```
## 3. 原型

> class 实际上是函数，可见是语法糖

```javascript
typeof People // "function"
typeof Student // "function"

// 隐式原型和显式原型
console.log(xiaLuo.__proto__)
console.log(Student.prototype)
console.log(xiaLuo.__proto__ === Student.prototype) // true
``` 

原型图如下

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1141452b532f4e9cab03ba48f58beade~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

大神图镇楼

![img](https://img2018.cnblogs.com/blog/1632878/201905/1632878-20190507094639999-1584111224.png)

### 3.1 原型关系
- 每个 class 都有显式原型 prototype
- 每个实例都有隐式原型 \_\_proto\_\_ 
- 实例的 \_\_proto\_\_ 指向对应 class 的 prototype

### 3.2 基于原型的执行规则

- 获取属性 xiaLuo.name 或者 执行 xiaLuo.sayHi()时
- 先在自身属性和方法寻找
- 如果找不到则自动去 \_\_proto\_\_ 中查找

## 4. 原型链
```javascript
console.log(Student.prototype.__proto__)
console.log(People.prototype)
console.log(People.prototype === Student.prototype.__proto__)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20b62d39e43b404b88d7d317b9f49557~tplv-k3u1fbpfcp-watermark.image?)

**继续往上找呢**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6bce650d8674850992e593d1e33aab2~tplv-k3u1fbpfcp-watermark.image?)


**重要提示**
- class 是 ES6 语法规范，由 ECMA 委员会发布
- ECMA 只规定语法规则，即我们代码的书写规范，不规定如何实现
- 以上实现方式都是 V8 引擎的实现方式，也是主流的

## 回答问题
### 1. 如何准确判断一个变量是不是数组？

- a instanceof Array(也是不太靠谱,具体参考延伸阅读链接)
- Array.isArray(a)
- Object.prototype.toString.call(a)=='[object Array]'

[javascript 判断变量是否是数组](https://segmentfault.com/a/1190000004479306)

[推荐：如何判断一个对象是不是数组？](https://blog.51cto.com/u_15219964/5502978?from_wecom=1)

[其他](https://github.com/wengjq/Basics/issues/36?from_wecom=1)

### 2. class 的原型本质，怎么理解？

- 原型本质：
  - 原型和原型链的图示
  - 属性和方法的执行规则

[参考链接](https://www.jianshu.com/p/b1cd77511ea7)

### 3. 手写一个简易的 jQuery， 考虑插件和扩展性


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>简易jQuery</title>
  </head>
  <body>
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </body>
  <script>
    class jQuery {
      constructor (selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for (let index = 0; index < length; index++) {
          this[index] = result[index]
        }
        this.length = length
      }
      get (index) {
        return this[index]
      }
      each (fn) {
        for (let index = 0; index < this.length; index++) {
          const el = this[index]
          fn(el)
        }
      }
      on (type, fn) {
        return this.each(elem => {
          elem.addEventListener(type, fn)
        })
      }
      // 扩展更多 DOM API
    }

    // 插件形式
    jQuery.prototype.dialog = function (info) {
      alert(info)
    }
    // 复写机制（“造轮子”）
    class MyJquery extends jQuery {
      constructor (selector) {
        super(selector)
      }
      // 扩展自己的方法
      addClass (className) {
        console.log('我是添加class')
      }
      // 等等
    }

    const $p = new jQuery('p')
    console.log($p.get(1))
    $p.each(elem => {
      console.log(elem.nodeName)
    })
    $p.on('click', () => {
      alert('click')
    })

    $p.dialog('abc')
  </script>
</html>
```
