# 42-发布订阅模式

观察者模式也可以称之为监听者模式。

它由观察者「Observer」与被观察者「Subject」共同组成。

![img](http://wechatapppro-1252524126.cdn.xiaoeknow.com/appxw863qeq2150/image/default/cop7Qj017016682103j.png?imageView2/2/q/80%7CimageMogr2/ignore-error/1)

> 又名发布订阅模式，在复杂场景下，为了适应更多需求，除了观察者与被观察者，还会引入更多的角色，因此复杂场景下，大家更愿意称之为发布订阅模式。

我们会遇到很多这种场景，例如事件监听。当我们点击按钮时，对应按钮如果添加了点击事件监听，那么对应的逻辑就会自动执行。而不需要我们显示的调用该逻辑去执行他。

我们也可以自定义事件。

```javascript
var event = new Event('build')

// 添加观察者
document.addEventListener('build', function () {
  console.log('我是新增的一个观察者1，我现在观察到 document 触发了 build 事件')
})

// 添加观察者
document.addEventListener('build', function () {
  console.log('我是新增的一个观察者2，我现在观察到 document 触发了 build 事件')
})

// 被观察者触发事件
document.dispatchEvent(event)
```

观察者模式解决的就是这样的问题。当某一个条件满足要求或者触发某一种事件时，所有的观察者都会感知到并执行对应的逻辑。

在前端里最常见的就是 React/Vue 的数据思维：当我们改变 state/data 里的数据时，就会自动渲染 UI。

![img](http://wechatapppro-1252524126.cdn.xiaoeknow.com/appxw863qeq2150/image/default/cv9D9RP1701668210vX.png?imageView2/2/q/80%7CimageMogr2/ignore-error/1)

上图就是 Vue 的内部原理，观察者 Observer 观察数据 Data 的变化，如果一旦发现数据产生了变化就会通知后续的流程，最终完成 View 的更新。

## 1-基本实现

代码逻辑比较简单，直接上代码。

```javascript
let subjectid = 0
let observerid = 0

class Subject {
  constructor(name) {
    // 观察者队列
    this.observers = []
    this.id = subjectid++
    this.name = name
  }

  // 添加观察者
  addListener(observer) {
    this.observers.push(observer)
  }

  // 删除观察者
  removeListener(observer) {
    this.observers = this.observers.filter(item => item.id !== observer.id)
  }

  // 通知
  dispatch() {
    this.observers.forEach(item => {
      item.watch(this.name)
    })
  }
}

class Observer {
  constructor() {
    this.id = observerid++
  }
  watch(subjectName) {
    console.log(`观察者${this.id}发现了被观察者 ${subjectName} 产生了变化。`)
  }
}

const sub = new Subject('div元素')
const observer1 = new Observer()
const observer2 = new Observer()

sub.addListener(observer1)
sub.addListener(observer2)

sub.dispatch()
```

被观察者，通过 addListener 添加观察者。

当被观察者发生变化时，调用 `sub.dispatch` 通知所有观察者。

观察者通过 watch 接收到通知之后，执行预备好的逻辑。

以 DOM 元素事件绑定为例，我们进行一个类比

```javascript
div.addEventListener('click', fn, false)
div.addEventListener('mousemove', fn, false)
div.addEventListener('mouseup', fn, false)
```

此时，被观察者，就是 div 元素。

没有明确的观察者，而是直接传入回调函数 fn，事件触发时，回调函数全部执行。因此也可以将此处的回调函数理解为观察者。

这种以回调函数作为观察者的方式更符合事件绑定机制。

此处还需要传入一个字符串用于区分事件类型。这种方式又应该怎么实现呢？

思考一下，直接上代码

```javascript
class Subject {
  constructor(name) {
    // 观察者队列
    // 格式为： { click: [fn1, fn2], scroll: [fn1, fn2] }
    this.events = {}
    this.name = name
  }

  // 添加观察者
  addListener(type, fn) {
    const cbs = this.events[type]
    if (cbs && cbs.length > 0) {
      const _cbs = cbs.filter(cb => cb != fn)
      _cbs.push(fn)
      this.events[type] = _cbs
    } else {
      this.events[type] = [fn]
    }
  }

  // 删除观察者
  removeListener(type) {
    delete this.events[type]
  }

  // 通知
  dispatch(type) {
    this.events[type].forEach(cb => cb())
  }
}

const sub = new Subject('div')

sub.addListener('build', function() {
  console.log('build 事件触发1')
})
sub.addListener('build', function () {
  console.log('build 事件触发2')
})
sub.addListener('click', function() {
  console.log('click 事件触发')
})

sub.dispatch('build')
```

## 2-Vue 的实现原理

![img](http://wechatapppro-1252524126.cdn.xiaoeknow.com/appxw863qeq2150/image/default/clbUGhS1701668210TM.png?imageView2/2/q/80%7CimageMogr2/ignore-error/1)

Vue 的核心是监听 data 中的数据变化，然后让数据的变化自动响应到 View 的变化。

由于 Vue 的场景更为复杂，因此在这个过程中引入了许多其他的角色。

Data：数据，最初的被观察者

Observer：Data 的观察者，数据劫持，监听数据的变化

Dep：订阅器，收集 Watcher。

Watcher：Dep 的订阅者，收到通知之后更新试图

数据的变化，会被 Observer 劫持，并且通知订阅器 Dep。Dep 收到通知之后，又会通知 Watcher，Watcher 收到属性的变化通知并执行响应的函数去更新试图 View。

**Observer**

data 数据的监听机制不需要我们去实现，因为在 JavaScript 中，对象中的每一个属性都具备自身的描述对象 `descriptor`。

当访问数据时，描述对象中 get 方法会执行。

当修改数据时，描述对象中的 set 方法会执行。

因此，我们只需要利用这个机制，去监听数据即可。核心的方法是 JavaScript 提供的 `Object.defineProperty`。

此处我们使用递归的方式，监听数据的所有属性。

与此同时，还需要关注的一个点是，我们需要

在 get 执行时，让 Dep 收集 Watcher。

在 set 执行时，通知 Watcher 执行更新逻辑。

因此，完整的实现如下：

```javascript
class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(data, key, val) {
    const dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }
}
```

使用时，可以直接 new，也可以增加一个额外的判断

```javascript
function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value);
};
```

**Dep**

此处的 Dep，也是一个被观察者，它与 Watcher 也是被观察者与观察者的关系。因此 Dep 的实现也非常简单，作用就是收集观察者 Watcher，以及通知 Watcher 更新。

```javascript
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
}
```

**Watcher**

对于订阅者 Watcher 一个非常重要的思考就是何时将自己添加到 Dep 中。

我们刚才在 Observer 的实现中，已经明确好了时机，也就是在访问数据时，可以将 Watcher 添加进去。

因此，我们在初始化 Watcher 时，可以手动去访问一次 data 中的数据，强制触发 get 执行。这样我们就可以在 get 的逻辑中，将 Watcher 添加到 Dep 里了。

```javascript
class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }
  update() {
    this.run()
  }
  run() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
  get() {
    Dep.target = this;
    // 访问data，触发 get 执行，把当前的 Watcher 实例，添加到 Dep 中
    var value = this.vm.data[this.exp]  
    // 添加成功之后，释放掉自身，其他的实例还需要该引用
    Dep.target = null;
    return value;
  }
}
```

**Vue**

最后，我们需要将 data，Observer，Watcher 关联起来，形成一个整体。

```javascript
class Vue {
  constructor(options, el, exp) {
    this.data = options.data;
    
    // 劫持 data
    observe(this.data);
    
    // 初始化显示
    el.innerHTML = this.data[exp];
    
    // 创建 Watcher 实例
    new Watcher(this, exp, function (value) {
      el.innerHTML = value;
    });
    return this;
  }
}
```

这样，我们就可以 new 一个 Vue 对象，然后通过 `vue.data.text = 'xxx'` 去改变 View 的显示了。

我们也可以对 Vue 的数据做一个代理处理，让 `vue.data.text` 与 `vue.text` 的操作是等价的。

```javascript
class Vue {
  constructor(options, el, exp) {
    this.data = options.data;
    Object.keys(this.data).forEach((key) => {
      this.proxyKeys(key);
    });

    // 劫持 data
    observe(this.data);
    
    // 初始化显示
    el.innerHTML = this.data[exp];  
    new Watcher(this, exp, function (value) {
      el.innerHTML = value;
    });
    return this;
  }
  proxyKeys(key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: () => {
        return this.data[key];
      },
      set: (newVal) => {
        this.data[key] = newVal;
      }
    });
  }
}
```

封装好之后，最后的使用代码就很简单了。

```javascript
var ele = document.querySelector('#wrap');
var vue = new Vue({
  data: {
    text: 'hello world'
  }
}, ele, 'text');

document.addEventListener('click', function() {
  vue.data.text = `${vue.data.text} vue click.`
}, false)
```