# 36-封装选项卡对象

选项卡在 web 中的应用可以说是无处不在。因此掌握它的实现对我们来说非常有用。

通常情况下，选项卡由两部分组成。一部分是头部，它包含一堆按钮，每一个按钮对应不同的页面，按钮包括选中，与无法选中两种状态。另一部分则由一堆具体的页面组成。当我们点击按钮时，切换到对应的页面。

> 如果每个页面中包含的是根据动态加载的数据渲染出来的界面，那么通常只会有一个页面，点击按钮时重新加载数据并重新渲染页面。

我们先在 html 中将这两部分代码写出来。

```html
<div class="box" id="tab_wrap">
  <ul class="tab_options">
    <li data-index="0" class="item active">tab1</li>
    <li data-index="1" class="item">tab2</li>
    <li data-index="2" class="item">tab3</li>
    <li data-index="3" class="item">tab4</li>
  </ul>
  <div class="tab_content">
    <div class="item_box active">tab box 1</div>
    <div class="item_box">tab box 2</div>
    <div class="item_box">tab box 3</div>
    <div class="item_box">tab box 4</div>
  </div>
</div>
```

并简单写一些css代码。

```css
body {
  margin: 0;
}

ul, li {
  list-style: none;
  padding: 0;
}

#tab_wrap {
  max-width: 400px;
  margin: 10px auto;
  background: #efefef;
}

#tab_wrap .tab_options {
  height: 40px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}
#tab_wrap .tab_options li {
  line-height: 40px;
  cursor: pointer;
}
#tab_wrap .tab_options li.active {
  color: red;
  border-bottom: 1px solid red;
}

#tab_wrap .tab_content {
  min-height: 400px;
  position: relative;
}

#tab_wrap .tab_content .item_box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: none;
  text-align: center;
}
#tab_wrap .tab_content .item_box.active {
  display: block;
}
```

选项卡的实现原理非常简单。大家可以注意我们在 html 代码中，每一个头部按钮都保存了一个 `data-index` 属性。这个属性告诉我们这是第几个按钮。这个值同时也对应第几页。因此我们只需要声明一个 index 变量来保存当前页的序列，并在点击时把当前页的值修改为`data-index`的值就可以了，与此同时，让当前按钮修改为选中状态，其他按钮修改为未选中状态，让当前页显示，其他页隐藏即可。JavaScript 代码如下。

```javascript
var tabHeader = document.querySelector('.tab_options');
var items = tabHeader.children;
var tabContent = document.querySelector('.tab_content');
var itemboxes = tabContent.children;

var index = 0;

tabHeader.addEventListener('click', function(e) {
  var a = [].slice.call(e.target.classList).indexOf('item');
  if (a > -1 && index != e.target.dataset.index) {
    items[index].classList.remove('active');
    itemboxes[index].classList.remove('active');
    index = e.target.dataset.index;
    items[index].classList.add('active');
    itemboxes[index].classList.add('active');
  }
}, false);
```

但是此时假设我们要新增一个功能，在html中新增两个按钮，点击他们我们可以分别切换到上一页跟下一页，我们应该怎么办？

```html
<button class="next">Next</button>
<button class="prev">Prev</button>
```

为了能够更直观的实现这个功能，我们尝试来将选项卡封装成为一个对象。代码如下：

```javascript
!function(ROOT) {
  var index = 0;
  function Tab(elem) {
    this.tabHeader = elem.firstElementChild;
    this.items = this.tabHeader.children;
    this.tabContent = elem.lastElementChild;
    this.itemboxes = this.tabContent.children;
    this.max = this.items.length - 1;

    this.init();
  }

  Tab.prototype = {
    constructor: Tab,
    init: function() {
      this.tabHeader.addEventListener('click', this.clickHandler.bind(this), false);
    },
    clickHandler: function(e) {
      var a = [].slice.call(e.target.classList).indexOf('item');
      if (a > -1) {
        this.switchTo(e.target.dataset.index);
      }
    },
    switchTo: function(i) {
      if (i == index) {
        return;
      }
      this.items[index].classList.remove('active');
      this.itemboxes[index].classList.remove('active');
      index = i;
      this.items[index].classList.add('active');
      this.itemboxes[index].classList.add('active');
    },
    next: function() {
      var tgIndex = 0;
      if (index >= this.max) {
        tgIndex = 0;
      } else {
        tgIndex = index + 1;
      }
      this.switchTo(tgIndex);
    },
    pre: function() {
      var tgIndex = 0;
      if (index == 0) {
        tgIndex = this.max;
      } else {
        tgIndex = index - 1;
      }
      this.switchTo(tgIndex);
    },
    getIndex: function() {
      return index;
    }
  }

  ROOT.Tab = Tab;
}(window);
```

在上面的代码中，我们将切换功能封装成为了基础的`switchTo`方法，它接收一个表示页面序列的参数，只要我们调用这个方法，就能够切换到对应的页面。

因此基于这个基础方法，我们就能够很简单的扩展出下一页 next 与上一页 pre 方法。

那么再使用时，就很简单了，代码如下：

```javascript
var tab = new Tab(document.querySelector('#tab_wrap'));

document.querySelector('.next').addEventListener('click', function() {
  tab.next();
  console.log(tab.getIndex());
}, false);

document.querySelector('.prev').addEventListener('click', function() {
  tab.pre();
  console.log(tab.getIndex());
}, false);
```

这样，一个简单的选项卡功能就实现了。并且拥有了一些简单的扩展功能。从使用中我们可以看到，封装好之后，想要实现什么功能，我们只需要调用对应的接口即可。面向对象封装之后我们的代码变得非常简单直观。

需要注意的是，为了考验大家对于闭包的理解，在上面的代码中，我故意留了一个坑，大家只要在页面中创建两个选项卡，就能够发现问题。建议大家结合闭包思考一下为什么会出现这样的情况。