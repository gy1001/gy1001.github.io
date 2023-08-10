# 09-抽象工厂模式：又去小餐馆下馆子

![img](https://img4.mukewang.com/5d11def100016edf06400359.jpg)

> 机遇只偏爱那些有准备的头脑。 ——巴斯德

**工厂模式** （Factory Pattern），根据输入的不同返回不同类的实例，一般用来创建同一类对象。工厂方式的主要思想是**将对象的创建与对象的实现分离**。

> **注意：** 本文用到 ES6 的语法 [let/const](http://es6.ruanyifeng.com/#docs/let) 、[Class](http://es6.ruanyifeng.com/#docs/class)、[变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring) 等，如果还没接触过可以点击链接稍加学习 ~

**抽象工厂** （Abstract Factory）：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不是负责创建某一类产品的实例。关键在于使用抽象类制定了实例的结构，调用者直接面向实例的结构编程，**从实例的具体实现中解耦**。

我们知道 JavaScript 并不是强面向对象语言，所以使用传统编译型语言比如 JAVA、C#、C++ 等实现的设计模式和 JavaScript 不太一样，比如 JavaScript 中没有原生的类和接口等（不过 ES6+ 渐渐提供类似的语法糖），我们可以用变通的方式来解决。最重要的是设计模式背后的核心思想，和它所要解决的问题。

> **注意：** 本文用到 ES6 的语法 [let/const](http://es6.ruanyifeng.com/#docs/let) 、[Class](http://es6.ruanyifeng.com/#docs/class)、[变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring) 等，如果还没接触过可以点击链接稍加学习 ~
>
> 另外，本文建议在上一章**工厂模式**之后阅读。

## 1. 你曾见过的抽象工厂模式

还是使用上一节工厂模式中使用的饭店例子。

你再次来到了小区的饭店，跟老板说来一份鱼香肉丝，来一份宫保鸡丁，来一份番茄鸡蛋汤，来一份排骨汤（今天可能比较想喝汤）。无论什么样的菜，还是什么样的汤，他们都具有同样的属性，比如菜都可以吃，汤都可以喝。所以我们不论拿到什么菜，都可以吃，而不论拿到什么汤，都可以喝。对于饭店也一样，这个饭店可以做菜做汤，另一个饭店也可以，那么这两个饭店就具有同样的功能结构。

上面的场景都是属于抽象工厂模式的例子。菜类属于抽象产品类，制定具体产品菜类所具备的属性，而饭店和之前的工厂模式一样，负责具体生产产品实例，访问者通过老板获取想拿的产品。只要我们点的是汤类，即使还没有被做出来，我们就知道是可以喝的。推广一下，饭店功能也可以被抽象（抽象饭店类），继承这个类的饭店实例都具有做菜和做汤的功能，这样也完成了抽象类对实例的结构约束。

在类似场景中，这些例子有特点：只要实现了抽象类的实例，都实现了抽象类制定的结构；

## 2. 实例的代码实现

我们知道 JavaScript 并不强面向对象，也没有提供抽象类（至少目前没有提供），但是可以模拟抽象类。用对 `new.target` 来判断 `new` 的类，在父类方法中 `throw new Error()`，如果子类中没有实现这个方法就会抛错，这样来模拟抽象类：

```javascript
/* 抽象类，ES6 class 方式 */
class AbstractClass1 {
  constructor() {
    if (new.target === AbstractClass1) {
      throw new Error('抽象类不能直接实例化!')
    }
  }

  /* 抽象方法 */
  operate() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 抽象类，ES5 构造函数方式 */
var AbstractClass2 = function () {
  if (new.target === AbstractClass2) {
    throw new Error('抽象类不能直接实例化!')
  }
}
/* 抽象方法，使用原型方式添加 */
AbstractClass2.prototype.operate = function () {
  throw new Error('抽象方法不能调用!')
}
```

下面用 JavaScript 将上面介绍的饭店例子实现一下。

首先使用原型方式：

```javascript
/* 饭店方法 */
function Restaurant() {}

Restaurant.orderDish = function (type) {
  switch (type) {
    case '鱼香肉丝':
      return new YuXiangRouSi()
    case '宫保鸡丁':
      return new GongBaoJiDing()
    case '紫菜蛋汤':
      return new ZiCaiDanTang()
    default:
      throw new Error('本店没有这个 -。-')
  }
}

/* 菜品抽象类 */
function Dish() {
  this.kind = '菜'
}

/* 抽象方法 */
Dish.prototype.eat = function () {
  throw new Error('抽象方法不能调用!')
}

/* 鱼香肉丝类 */
function YuXiangRouSi() {
  this.type = '鱼香肉丝'
}

YuXiangRouSi.prototype = new Dish()

YuXiangRouSi.prototype.eat = function () {
  console.log(this.kind + ' - ' + this.type + ' 真香~')
}

/* 宫保鸡丁类 */
function GongBaoJiDing() {
  this.type = '宫保鸡丁'
}

GongBaoJiDing.prototype = new Dish()

GongBaoJiDing.prototype.eat = function () {
  console.log(this.kind + ' - ' + this.type + ' 让我想起了外婆做的菜~')
}

const dish1 = Restaurant.orderDish('鱼香肉丝')
dish1.eat()
const dish2 = Restaurant.orderDish('红烧排骨')

// 输出: 菜 - 鱼香肉丝 真香~
// 输出: Error 本店没有这个 -。-
```

使用 class 语法改写一下：

```javascript
/* 饭店方法 */
class Restaurant {
  static orderDish(type) {
    switch (type) {
      case '鱼香肉丝':
        return new YuXiangRouSi()
      case '宫保鸡丁':
        return new GongBaoJiDin()
      default:
        throw new Error('本店没有这个 -。-')
    }
  }
}

/* 菜品抽象类 */
class Dish {
  constructor() {
    if (new.target === Dish) {
      throw new Error('抽象类不能直接实例化!')
    }
    this.kind = '菜'
  }

  /* 抽象方法 */
  eat() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 鱼香肉丝类 */
class YuXiangRouSi extends Dish {
  constructor() {
    super()
    this.type = '鱼香肉丝'
  }

  eat() {
    console.log(this.kind + ' - ' + this.type + ' 真香~')
  }
}

/* 宫保鸡丁类 */
class GongBaoJiDin extends Dish {
  constructor() {
    super()
    this.type = '宫保鸡丁'
  }

  eat() {
    console.log(this.kind + ' - ' + this.type + ' 让我想起了外婆做的菜~')
  }
}

const dish0 = new Dish() // 输出: Error 抽象方法不能调用!
const dish1 = Restaurant.orderDish('鱼香肉丝')
dish1.eat() // 输出: 菜 - 鱼香肉丝 真香~
const dish2 = Restaurant.orderDish('红烧排骨') // 输出: Error 本店没有这个 -。-
```

这里的 `Dish` 类就是抽象产品类，继承该类的子类需要实现它的方法 `eat`。

上面的实现将产品的功能结构抽象出来成为抽象产品类。事实上我们还可以更进一步，将工厂类也使用抽象类约束一下，也就是抽象工厂类，比如这个饭店可以做菜和汤，另一个饭店也可以做菜和汤，存在共同的功能结构，就可以将共同结构作为抽象类抽象出来，实现如下：

```javascript
/* 饭店 抽象类，饭店都可以做菜和汤 */
class AbstractRestaurant {
  constructor() {
    if (new.target === AbstractRestaurant)
      throw new Error('抽象类不能直接实例化!')
    this.signborad = '饭店'
  }

  /* 抽象方法：创建菜 */
  createDish() {
    throw new Error('抽象方法不能调用!')
  }

  /* 抽象方法：创建汤 */
  createSoup() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 具体饭店类 */
class Restaurant extends AbstractRestaurant {
  constructor() {
    super()
  }

  createDish(type) {
    switch (type) {
      case '鱼香肉丝':
        return new YuXiangRouSi()
      case '宫保鸡丁':
        return new GongBaoJiDing()
      default:
        throw new Error('本店没这个菜')
    }
  }

  createSoup(type) {
    switch (type) {
      case '紫菜蛋汤':
        return new ZiCaiDanTang()
      default:
        throw new Error('本店没这个汤')
    }
  }
}

/* 菜 抽象类，菜都有吃的功能 eat */
class AbstractDish {
  constructor() {
    if (new.target === AbstractDish) {
      throw new Error('抽象类不能直接实例化!')
    }
    this.kind = '菜'
  }

  /* 抽象方法 */
  eat() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 菜 鱼香肉丝类 */
class YuXiangRouSi extends AbstractDish {
  constructor() {
    super()
    this.type = '鱼香肉丝'
  }

  eat() {
    console.log(this.kind + ' - ' + this.type + ' 真香~')
  }
}

/* 菜 宫保鸡丁类 */
class GongBaoJiDing extends AbstractDish {
  constructor() {
    super()
    this.type = '宫保鸡丁'
  }

  eat() {
    console.log(this.kind + ' - ' + this.type + ' 让我想起了外婆做的菜~')
  }
}

/* 汤 抽象类，汤都有喝的功能 drink */
class AbstractSoup {
  constructor() {
    if (new.target === AbstractDish) {
      throw new Error('抽象类不能直接实例化!')
    }
    this.kind = '汤'
  }

  /* 抽象方法 */
  drink() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 汤 紫菜蛋汤类 */
class ZiCaiDanTang extends AbstractSoup {
  constructor() {
    super()
    this.type = '紫菜蛋汤'
  }

  drink() {
    console.log(this.kind + ' - ' + this.type + ' 我从小喝到大~')
  }
}

const restaurant = new Restaurant()

const soup1 = restaurant.createSoup('紫菜蛋汤')
soup1.drink() // 输出: 汤 - 紫菜蛋汤 我从小喝到大~
const dish1 = restaurant.createDish('鱼香肉丝')
dish1.eat() // 输出: 菜 - 鱼香肉丝 真香~
const dish2 = restaurant.createDish('红烧排骨') // 输出: Error 本店没有这个 -。-
```

这样如果创建新的饭店，新的饭店继承这个抽象饭店类，那么也要实现抽象饭店类，这样就都具有抽象饭店类制定的结构。

## 3. 抽象工厂模式的通用实现

我们提炼一下抽象工厂模式，饭店还是工厂（Factory），菜品种类是抽象类（AbstractFactory），而实现抽象类的菜品是具体的产品（Product），通过工厂拿到实现了不同抽象类的产品，这些产品可以根据实现的抽象类被区分为类簇。主要有下面几个概念：

1. **Factory** ：工厂，负责返回产品实例；
2. **AbstractFactory** ：虚拟工厂，制定工厂实例的结构；
3. **Product** ：产品，访问者从工厂中拿到的产品实例，实现抽象类；
4. **AbstractProduct** ：产品抽象类，由具体产品实现，制定产品实例的结构；

概略图如下：

![图片描述](http://img.mukewang.com/5d1321610001a09511590468.png)
下面是通用的实现，原型方式略过：

```javascript
/* 工厂 抽象类 */
class AbstractFactory {
  constructor() {
    if (new.target === AbstractFactory) throw new Error('抽象类不能直接实例化!')
  }

  /* 抽象方法 */
  createProduct1() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 具体饭店类 */
class Factory extends AbstractFactory {
  constructor() {
    super()
  }

  createProduct1(type) {
    switch (type) {
      case 'Product1':
        return new Product1()
      case 'Product2':
        return new Product2()
      default:
        throw new Error('当前没有这个产品 -。-')
    }
  }
}

/* 抽象产品类 */
class AbstractProduct {
  constructor() {
    if (new.target === AbstractProduct) throw new Error('抽象类不能直接实例化!')
    this.kind = '抽象产品类1'
  }

  /* 抽象方法 */
  operate() {
    throw new Error('抽象方法不能调用!')
  }
}

/* 具体产品类1 */
class Product1 extends AbstractProduct {
  constructor() {
    super()
    this.type = 'Product1'
  }

  operate() {
    console.log(this.kind + ' - ' + this.type)
  }
}

/* 具体产品类2 */
class Product2 extends AbstractProduct {
  constructor() {
    super()
    this.type = 'Product2'
  }

  operate() {
    console.log(this.kind + ' - ' + this.type)
  }
}

const factory = new Factory()

const prod1 = factory.createProduct1('Product1')
prod1.operate() // 输出: 抽象产品类1 - Product1
const prod2 = factory.createProduct1('Product3') // 输出: Error 当前没有这个产品 -。-
```

如果希望增加第二个类簇的产品，除了需要改一下对应工厂类之外，还需要增加一个抽象产品类，并在抽象产品类基础上扩展新的产品。

我们在实际使用的时候不一定需要每个工厂都继承抽象工厂类，比如只有一个工厂的话我们可以直接使用工厂模式，在实战中灵活使用。

## 4. 抽象工厂模式的优缺点

抽象模式的优点：抽象产品类将产品的结构抽象出来，访问者不需要知道产品的具体实现，只需要面向产品的结构编程即可，**从产品的具体实现中解耦**；

抽象模式的缺点：

1. **扩展新类簇的产品类比较困难**，因为需要创建新的抽象产品类，并且还要修改工厂类，违反开闭原则；
2. 带来了**系统复杂度**，增加了新的类，和新的继承关系；

## 5. 抽象工厂模式的使用场景

如果一组实例都有相同的结构，那么就可以使用抽象工厂模式。

## 6. 其他相关模式

### 6.1 抽象工厂模式与工厂模式

工厂模式和抽象工厂模式的区别：

1. **工厂模式** 主要关注单独的产品实例的创建；
2. **抽象工厂模式** 主要关注产品类簇实例的创建，如果产品类簇只有一个产品，那么这时的抽象工厂模式就退化为工厂模式了；

根据场景灵活使用即可。
