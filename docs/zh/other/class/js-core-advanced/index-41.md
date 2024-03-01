# 41-工厂模式

要准确的理解工厂模式并不简单。

> JavaScript 中没有接口和抽象类的概念，因此基于 JavaScript 理解工厂模式，在实现上与其他语言有所不同。因此学习时要注意区分

假设我有一个手机工厂，工厂里能生产各种手机。小米、苹果、华为等。

每一种手机的生产流程基本相同，但是需要的原材料不一样。

于是我们按照普通的思维定义类时，就会出现一种情况，他们只是在创建时传入的参数不同，但是其他的方法都相同。

```
class Xiaomi {
  constructor() {
    this.materials = {
      1: 'xiaomi_material1',
      2: 'xiaomi_material2',
      3: 'xiaomi_material3',
    }
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}

class IPhone {
  constructor() {
    this.materials = {
      1: 'iphone_material1',
      2: 'iphone_material2',
      3: 'iphone_material3',
    }
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}

class Huawei {
  constructor() {
    this.materials = {
      1: 'huawei_material1',
      2: 'huawei_material2',
      3: 'huawei_material3',
    }
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}
```

这样封装没什么问题。不过我们在实践时，可能会遇到一些维护上的小问题。

时光飞逝，类 Xiaomi 已经在代码中用了很久，项目中有几十处代码使用 `new Xiaomi()` 创建了大量的实例。可是后来我们发现，`Xiaomi` 已经出了很多种品牌了，例如 小米6，小米7，小米8，而且这些小米手机使用的材料也不一样。而我们最开始使用的 `Xiaomi`，其实是想要声明的是 小米 4。

为了适应场景的变动和调整，我们需要修改代码。但是 Xiaomi 类已经变成了祖传代码，此时如果轻易修改，风险非常大。即使只是改一个类名 Xiaomi -> Xiaomi4，就要改动几十处。因此我们在设计之初，如何避免未来修改代码的风险呢？

工厂模式就是这里提供的一个解决方案。

工厂模式用于封装和管理对象的创建。工厂模式期望我们在创建对象时，不会对外暴露创建逻辑，并且是通过使用一个共同的接口来创建新的对象。

首先，创建一个工厂方法，通过传入不同的参数，然后声明不同的类。

```
function factory(type) {
  if (type == 'xiaomi') {
    return new Xiaomi()
  }
  if (type == 'iphone') {
    return new IPhone()
  }
  if (type == 'huawei') {
    return new Huawei()
  }
}
```

这样，我们就通过工厂方法，使用不同的字符串，与具体的类之间，建立了一个映射关系。

那么，我们在使用时，就不再直接通过 `new Xiaomi()` 的方式直接创建实例了。而是使用 factory 方法进行创建。

```
const xm = factory('xiaomi')
const ip = factory('iphone')
const hw = factory('huawei')
```

未来需要将类名进行更改时，例如将 Xiaomi 修改为 Xiaomi4，那么只需要在类的声明和工厂方法里进行修改即可。而其他使用的地方，可以不做修改。

```
- class Xiaomi {
+ class Xiaomi4 {
  constructor() {
    this.materials = {
      1: 'xiaomi_material1',
      2: 'xiaomi_material2',
      3: 'xiaomi_material3',
    }
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}


function factory(type) {
  if (type == 'xiaomi') {
-    return new Xiaomi()
+    return new Xiaomi4()
  }
  if (type == 'iphone') {
    return new IPhone()
  }
  if (type == 'huawei') {
    return new Huawei()
  }
}
```

这就是简单工厂模式。

这样能够解决一部分问题。

进一步思考，后续手机的品种会越来越多，小米8，小米9， 小米10，华为 mete10，华为 p40 等等。那这个时候，我们会发现，除了要新增一个类之外，工厂方法 factory 也会持续被更改。

> 违背了开闭原则

那我们应该怎么解决这个问题呢？有没有一种方式，能够让工厂方法在后续的迭代过程中，不进行修改？

当然有：最简单的方式如下

```
function factory(type) {
  // window 表示声明的类 挂载的对象，可能是window，可能是global，可能是其他自定义的对象
  return new window[type]()
}
```

这样处理之后，那么传入的 type 字符串，就必须与类名保持一致。因此在使用时会有一些限制

```
const hw = factory('Huawei')
```

当然，我们也可以维护一份配置文件，该配置文件就是显式的标明类型字符串与类名的映射关系。

我们可以将这份配置文件，定义在工厂函数的原型对象中。

于是，上面的工厂函数可以演变成为工厂类。并且具备了自己的方法，config 配置文件维护在工厂对象的原型中，被所有实例共享。

```
function Factory() {}
Factory.prototype.create = function(type) {
  var cur = this.config[type]
  if (cur) {
    return new cur()
  }
}
Factory.prototype.config = {}
Factory.prototype.setConfig = function(type, sub) {
  this.config[type] = sub
}
```

之后，每新增一个类，都需要使用工厂对象修改存储在原型对象中的配置

```
class Xiaomi5 {
  constructor() {
    this.materials = {
      1: 'xiaomi_material1',
      2: 'xiaomi_material2',
      3: 'xiaomi_material3',
    }
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}

new Factory().setConfig('xiaomi5', Xiaomi5)
```

我们也可以专门手动维护一个单独的模块作为配置文件。这样的方式更直观。

```
import Xiaomi from './Xiaomi'
import Xiaomi5 from './Xiaomi5'

export default {
  xiaomi: Xiaomi,
  xiaomi5: Xiaomi5
}
import config from './config'

export default function factory(type) {
  if (config[type]) {
    return new config[type]()
  }
}
```

很显然，在代码层面，还可以对类型声明进行优化。

我们分析上面三个类的情况，都是生成手机，所以所有的方法都完全相同。但是因为每一种手机的原材料不一样，因此构造函数里会不一样。利用封装的思维，我们可以将这三个类，合并成为一个类，不同的手机在构造函数中进行判断。

```
class PhoneFactory {
  constructor(type) {
    if (type == 'xiaomi') {
      this.materials = {
        1: 'xiaomi_material1',
        2: 'xiaomi_material2',
        3: 'xiaomi_material3',  
      }
    }
    if (type == 'iphone') {
      this.materials = {
        1: 'iphone_material1',
        2: 'iphone_material2',
        3: 'iphone_material3',
      }
    }
    if (type == 'huawei') {
      this.materials = {
        1: 'huawei_material1',
        2: 'huawei_material2',
        3: 'huawei_material3',
      }
    }
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}

const xm = new PhoneFactory('xiaomi')
const ip = new PhoneFactory('iphone')
const hw = new PhoneFactory('huawei')
```

这种方式的底层思维是将所有的手机抽象成为同一种类型，然后在构造函数时针对不同的细节进行区分。之所以能够这样处理的原因，是因为 Xiaomi，IPhone，Huawei 这几个类高度相似，因此可以抽象成为同一种类型。但是如果只有部分相似，就需要区别对待。

在 jQuery 的封装里，也有同样的场景。例如 jQuery 的构造函数 `jQuery.fn.init` 中有这样的逻辑判断

```
init = jQuery.fn.init = function (selector, context, root) {
  var match, elem;

  // $(""), $(null), $(undefined), $(false)
  if (!selector) {
    return this;
  }

  // $('.wrapper')
  if (typeof selector === "string") {

    //...

    // $(DOMElement)
  } else if (selector.nodeType) {

  // $(function)
  // Shortcut for document ready
  } else if (jQuery.isFunction(selector)) {
    //....
  }

  return jQuery.makeArray(selector, this);
};
```

为了扩展时，不直接修改对象而是修改配置文件，可以进一步调整一下

```
const config = {
  xiaomi: {
    1: 'xiaomi_material1',
    2: 'xiaomi_material2',
    3: 'xiaomi_material3',
  },
  iphone: {
    1: 'iphone_material1',
    2: 'iphone_material2',
    3: 'iphone_material3',
  },
  huawei: {
    1: 'huawei_material1',
    2: 'huawei_material2',
    3: 'huawei_material3',
  }
}

class PhoneFactory {
  constructor(type) {
    this.materials = config[type]
  }
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}

const xm = new PhoneFactory('xiaomi')
const ip = new PhoneFactory('iphone')
const hw = new PhoneFactory('huawei')
```

但是如果这几个类只是部分相似，只有部分接口是一样的，那么就需要区别对象，而不能直接合在一起。同样的方法使用继承的方式来简化

```
class Phone {
  step1() {}
  step2() {}
  step3() {}
  step4() {}
}

class Xiaomi extends Phone {
  constructor() {
    this.materials = {
      1: 'xiaomi_material1',
      2: 'xiaomi_material2',
      3: 'xiaomi_material3',
    }
  }
}

class IPhone extends Phone {
  constructor() {
    this.materials = {
      1: 'iphone_material1',
      2: 'iphone_material2',
      3: 'iphone_material3',
    }
  }
}

class Huawei extends Phone {
  constructor() {
    this.materials = {
      1: 'huawei_material1',
      2: 'huawei_material2',
      3: 'huawei_material3',
    }
  }
}

const config = {
  xiaomi: Xiaomi,
  iphone: IPhone,
  huawei: Huawei
}

function factory(type) {
  if (config[type]) {
    return new config[type]()
  }
}

const xm = factory('xiaomi')
const ip = factory('iphone')
const hw = factory('huawei')
```

工厂模式的核心思维在于不直接通过 new 来创建实例，而是使用工厂方法进行一层封装，隐藏实例的创建细节。因此上面提到的许多方式，都是能够基本满足这个特点，那么对应到实践场景中，就需要结合场景选择最适合的方式灵活使用。