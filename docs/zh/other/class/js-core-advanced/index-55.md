# 55-模块化实践案例一

我们先来实现一个简单的场景。

首先有一个普通的 div。

然后有一堆设置按钮。

我们可以通过这堆按钮，来控制 div 的显示或隐藏，背景颜色，边框颜色，长，宽等属性。

实践中的类似场景非常多，例如手机的设置、控制中心、每个网页的个人中心设置等。

当然，如果我们仅仅只是通过一个按钮来控制 div 的单一属性。非常简单，但是实践中的场景往往更复杂，第一个难点是我们会有更多的属性需要控制，也会有更多的目标需要控制。第二个难点是我们构建代码之初，目标元素可能存在于不同的模块中，我们如何通过单一的变量来控制不同的目标元素？

当我们的项目变得越来越复杂，需要管理的状态值也会变得越来越多。如果只是使用我们初学时在当前作用域随便定义一个变量的方式来做，那么多余项目的后期维护而来，是一场灾难。我们需要更多的时间去调试，会修复更多的 bug，需要面对杂乱无章的代码，还要克制我们烦躁的心态，以及无休止的加班。而当需求变动时，我们还不得不忍受自己都看不下去的代码，再重复之前一样的痛苦，没人愿意尝试这种经历。

所以，针对大型项目中，过多的状态管理，我们应该怎么办？

目前市面上有许多流行的状态管理机制。例如 redux、mobx、vuex 等。他们就是专门解决状态管理的方案。当然，我们也可以基于观察者模式，创建自己的状态管理工具。

一起来试试看。

## 01-准备工作

首先，按照上节课的内容，使用 create react app 创建一个项目。

本文的实例项目地址：[点击这里查看](https://github.com/yangbo5207/jsCore/tree/master/6.9模块化开发实例/controldiv)

因为默认的 demo 中，有了自己的 DOM 渲染，因此我们需要清空他们。将 App.tsx 修改为如下即可

```javascript
import React from 'react'
function App() {
  return <div className='App'></div>
}

export default App
```

## 02-状态管理模块

在 src 目录中，创建一个状态管理模块，命名为 `state.ts`

首先，我们要创建一个状态树。

在整个项目中，状态树是唯一的，我们会把所有的状态名与状态值通过 `key - value` 的形式，保存在状态树中。

```javascript
const store = {}
```

在我们的案例中，状态树可能会长这样

```javascript
store = {
  show: 0,
  backgroundColor: '#cccccc',
  width: '200',
  height: '200',
  // ... more
}
```

因此，给 store 一个类型声明

```javascript
interface Store {
  [key: string]: any;
}

const store: Store = {}
```

我们在使用时，会对状态树有一些基本的操作和访问，因此会有如下基本方法

- registerState: 新增需要管理的状态值
- getStore: 获取当前整个状态树
- getState: 获取某一个状态的值
- setState: 修改某一个状态的值

具体代码如下：

```javascript
// 往store中添加一个状态值，并确保传入一个初始值
export const registerState = (status: string, value: any) => {
  if (store[status]) {
    throw new Error('状态已经存在。')
  }
  store[status] = value
  return value
}

// 获取整个状态树
export const getStore = () => store

// 获取某个状态的值
export const getState = (status: string) => store[status]

// 设置某个状态的值
export const setState = (status: string, value: any) => {
  store[status] = value
  dispatch(status, value)
  return value
}
```

> 为了简化学习，方法比较简单，没有过多的考虑异常情况与健全处理，请勿直接运用于实践，实践可在此基础根据需要扩展

当我们通过交互改变状态值时，其实期待的是界面 UI 能够发生相应的改变。

UI 的变动可能会比较简单，也可能会非常复杂，因此为了能够更好的维护 UI 改变，我们将每个 UI 变化用函数封装起来，并与对应的状态值对应「绑定」。这样，当状态值改变的同时，调用一下对应的 UI 函数就能够实现界面的实时变动了。

因此，我们还需要一个 events 对象，来保存专门用于改变 UI 的函数。

```javascript
type EventCallback = (...args: any[]) => any

interface Events {
  [key: string]: EventCallback;
}

const events: Events = {}
```

这里有一个关键因素，就是 store 的 key 值，要与 events 的 key 值保持一致。

所以，状态值与 UI 函数的对应关系如下：

```javascript
store = {
  show: 0,
  backgroundColor: '#cccccc',
  width: '200',
  height: '200',
  // ... more
}

events = {
  show: function () {},
  backgroundColor: function () {},
  width: function () {},
  height: function () {},
  // ... more
}

// 通过相同的状态命名，我们可以访问到对应的状态值与函数
```

同样的道理，我们需要提供几个能够操作 events 的方法

- bind: 绑定函数，将函数保存在 events 中，在有的地方，也成为订阅
- remove: 移出函数的绑定
- dispatch: 执行函数，setState 中会调用该方法

```javascript
// 将状态值与事件绑定在一起，通过status-events 的形式保存在events对象中
export const bind = (status: string, eventFn: EventCallback) => {
  events[status] = eventFn
}

// 移除绑定
export const remove = (status: string) => {
  delete events[status]
  return status
}

export const dispatch = (status: string, value: any) => {
  if (!events[status]) {
    throw new Error('未绑定任何事件！')
  }
  events[status](value)
  return value
}
```

这样，一个简单的状态管理模块就完成了。完整代码如下

```javascript
// src/state.ts
interface Store {
  [key: string]: any;
}

type EventCallback = (...args: any[]) => any

interface Events {
  [key: string]: EventCallback;
}

const events: Events = {}
const store: Store = {}

// 往store中添加一个状态值，并确保传入一个初始值
export const registerState = (status: string, value: any) => {
  if (store[status]) {
    throw new Error('状态已经存在。')
  }
  store[status] = value
  return value
}

// 获取整个状态树
export const getStore = () => store

// 获取某个状态的值
export const getState = (status: string) => store[status]

// 设置某个状态的值
export const setState = (status: string, value: any) => {
  store[status] = value
  dispatch(status, value)
  return value
}

// 将状态值与事件绑定在一起，通过status-events 的形式保存在events对象中
export const bind = (status: string, eventFn: EventCallback) => {
  events[status] = eventFn
}

// 移除绑定
export const remove = (status: string) => {
  delete events[status]
  return status
}

export const dispatch = (status: string, value: any) => {
  if (!events[status]) {
    throw new Error('未绑定任何事件！')
  }
  events[status](value)
  return value
}
```

接下来的重点，就是如何运用该模块。

## 03-注册状态值模块

我们需要管理很多的状态，可以在每一个使用到这些状态值的模块中各自注册。也可以使用一个单独的模块来注册状态。如果你担心自己会忘记状态值的作用，建议每一个都做好注释。

注册状态的方式就是利用状态管理模块中定义 registerState 方法来完成。

```javascript
// src/register.ts
import { registerState } from './state'

registerState('show', true)
registerState('backgroundColor', '#cccccc')
registerState('borderColor', '#000')
registerState('width', 200)
registerState('height', 200)
```

## 04-工具函数模块

每一个项目中，都会使用到大量的工具函数。

我们可以创建一个工具函数模块，把一些封装好的功能性的方法都在放这个模块中。

例如我们在实践中常常会遇到在一个数组中拿到最大的那个值，获取 url 中某个属性对应的具体值，对时间格式按需进行处理等等需求，我们就可以直接将这些操作封装好，存放于工具函数模块中，在使用时引入即可。

当然，这个例子中我们不会用到特别多的功能函数，因此这里就封装了一个示意一下。

```javascript
// src/utils.ts
export const getStyle = (ele: Element, key: any) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[key]
  }
  // @ts-ignore for IE
  return ele.currentStyle[key]
}
```

除此之外，我们也可以引入 lodash.js 这样的工具库。lodash 是一个具有一致接口、模块化、高性能的工具库，它封装了许多我们常用的工具函数，在实践开发中对我们的帮助非常大。

## 05-目标元素模块

目标元素，也就是可能会涉及到 UI 改变的元素。

之前在创建状态管理模块时已经提到，我们需要将 UI 改变的动作封装为函数，并保存/绑定到 events 对象中。这个操作就选择在目标元素模块中来完成。

首先在 `public/index.html` 中写入一个 div 元素。

root 元素用于 create react app 默认 demo 中的逻辑，我们不管它。我们新起一个 div 元素用于管理自己的逻辑。

control_wrap 中是所有的控制按钮

target 是目标元素

```html
<div id="control">
  <div class="control_wrap">
    <div><button class="show">show/hide</button></div>
    <div>
      <input
        class="bgcolor_input"
        type="text"
        placeholder="input background color"
      />
      <button class="bgcolor_btn">sure</button>
    </div>
    <div>
      <input
        type="text"
        class="bdcolor_input"
        placeholder="input border color"
      />
      <button class="bdcolor_btn">sure</button>
    </div>
    <div>
      <span>width</span>
      <button class="width_reduce">-5</button>
      <button class="width_add">+5</button>
    </div>
    <div>
      <span>height</span>
      <button class="height_reduce">-</button>
      <input type="text" class="height_input" readonly />
      <button class="height_add">+</button>
    </div>
  </div>
  <div class="target"></div>
</div>
```

清空原有的 `index.css`，重新写一些简单的默认样式

```css
#control .target {
  width: 200px;
  height: 200px;
  background-color: #cccccc;
  transition: 0.3s;
}
#control .target.hide {
  display: none;
}
```

此处我们的目标元素是一个正方形的 div 元素，我们将会通过控制按钮来改变它的显示/隐藏，边框，背景，长宽等属性。因此该模块主要要做的事情，就是根据注册的状态变量，绑定 UI 变化的函数。具体代码如下：

```javascript
// src/box.ts
import { bind } from './state'
import { getStyle } from './utils'
import './register'

const div = document.querySelector < HTMLElement > '.target'

if (!div) {
  throw new Error('元素对象 target 不存在')
}

// control show or hide
bind('show', (value) => {
  if (value === true) {
    div.classList.add('hide')
  }
  if (value === false) {
    div.classList.remove('hide')
  }
})

// change background color
bind('backgroundColor', (value) => {
  div.style.backgroundColor = value
})

// change border color
bind('borderColor', (value) => {
  const width = parseInt(getStyle(div, 'borderWidth'))
  if (width === 0) {
    div.style.border = '2px solid #ccc'
  }
  div.style.borderColor = value
})

// change width
bind('width', (value) => {
  div.style.width = `${value}px`
})

bind('height', (value) => {
  div.style.height = `${value}px`
})
```

## 06-按钮控制模块

我们可能会通过按钮，input 框，或者滑块等不同的方式来改变状态值，因此控制模块将会是一个比较复杂的模块。 为了更好的组织代码，一个可读性和可维护性都很强的方式是将整个控制模块拆分为许多小模块，每一个小模块仅仅只完成一个状态值的控制操作。

因此我们需要根据需求，分别创建对应的控制模块。

在 src 目录下创建一个 controlButtons 文件夹，该文件夹中全部用来存放控制模块。然后依次编写控制模块的代码即可。

控制目标元素显示隐藏的模块

```javascript
// src/controlButtons/show.ts
import { getState, setState } from '../state'

const btn = document.querySelector('.show')

if (!btn) {
  throw new Error('元素对象不存在')
}

btn.addEventListener(
  'click',
  () => {
    setState('show', !getState('show'))
  },
  false,
)
```

控制目标元素背景颜色变化的模块。

```javascript
// src/controlButtons/bgColor.ts
import { setState } from '../state'

const input = document.querySelector < HTMLInputElement > '.bgcolor_input'
const btn = document.querySelector('.bgcolor_btn')

if (!input || !btn) {
  throw new Error('元素对象不存在')
}

btn.addEventListener(
  'click',
  () => {
    if (input.value) {
      setState('backgroundColor', input.value)
    }
  },
  false,
)
```

控制目标元素边框颜色变化的模块。

```javascript
// src/controlButtons/borderColor.ts
import { setState } from '../state'

const input = document.querySelector < HTMLInputElement > '.bdcolor_input'
const btn = document.querySelector('.bdcolor_btn')

if (!input || !btn) {
  throw new Error('元素对象不存在')
}

btn.addEventListener(
  'click',
  () => {
    if (input.value) {
      setState('borderColor', input.value)
    }
  },
  false,
)
```

控制目标元素宽度变化的模块。

```javascript
// src/controlButtons/width.ts
import { getState, setState } from '../state'

const red_btn = document.querySelector('.width_reduce')
const add_btn = document.querySelector('.width_add')

if (!red_btn || !add_btn) {
  throw new Error('元素对象不存在')
}

red_btn.addEventListener(
  'click',
  () => {
    const cur = getState('width')
    if (cur > 50) {
      setState('width', cur - 5)
    }
  },
  false,
)

add_btn.addEventListener(
  'click',
  () => {
    const cur = getState('width')
    if (cur < 400) {
      setState('width', cur + 5)
    }
  },
  false,
)
```

控制目标元素高度变化的模块。

```javascript
// src/controlButtons/height.ts
import { getState, setState } from '../state'

const red_btn = document.querySelector('.height_reduce')
const add_btn = document.querySelector('.height_add')
const height_input = document.querySelector < HTMLInputElement > '.height_input'

if (!red_btn || !add_btn || !height_input) {
  throw new Error('元素对象不存在')
}

height_input.value = getState('height') || 200

red_btn.addEventListener(
  'click',
  () => {
    const cur = getState('height')
    if (cur > 50) {
      setState('height', cur - 5)
      height_input.value = cur - 5 + ''
    }
  },
  false,
)

add_btn.addEventListener(
  'click',
  () => {
    const cur = getState('height')
    if (cur < 400) {
      setState('height', cur + 5)
      height_input.value = cur + 5
    }
  },
  false,
)
```

最后将这些模块拼合起来

```javascript
// src/controlButtons/index.ts
import './show'
import './bgColor'
import './borderColor'
import './width'
import './height'
```

在构建工具中，如果我们引入一个文件夹当做模块，那么相当于默认引入的是该文件下的名为 index.ts 的模块，因此我们可以通过在 controlButtons 文件夹下创建 index.ts 的方式，来让该文件夹成为一个模块。

也就是说，在引入这个模块时：

```javascript
import './controlButtons'

// 等价于
import './controlButtons/index' // 后缀名可简写
```

**后面这段话非常重要。**

细心的读者肯定已经发现了，我们给按钮绑定点击事件时，仅仅只是对状态值做了改变，而没有考虑对应的 UI 变化。这是为什么？

可能在大家以前的开发经验中，要改变一个元素的某个属性，一般来说会有状态值的变化，并且还有对应的 UI 操作。我们这里的做法好像有点不太一样。

其实我这里是利用这样的一个例子，带大家尝试一下分层的开发思维。这里例子中，我们将状态控制设定为控制层，而 UI 变化设定为 view 层。我们只需要在目标元素模块中，将 view 层的变化封装好，那么利用状态管理模块中的机制，在控制层，我们就只需要单一的考虑状态值的变化即可。

这样处理之后，我们开发重心，就从考虑整个界面的变化，转移到了仅仅只考虑状态值的变化。这样做的好处是极大的简化了我们在实现需求的过程中所需要考虑的问题。在未来的进阶学习中，大家可能还会大量接触到这样的开发思路。

## 07-最后的拼合模块

在 src 目录下的 index.tsx 文件中，我们可以通过 import 将需要的模块拼合起来。

```javascript
// src/index.tsx
import './controlButtons'
import './box'

import './index.css'
```

OK，这时候，我们需要的项目就已经全部完成了，如果你在跟着动手实践的话，相信现在你已经能够看到项目的最终效果。整个项目的相关目录结构如下：

```javascript
;+public -
  index.html +
  src -
  index.tsx -
  index.css -
  box.ts -
  state.ts -
  utils.ts -
  register.ts +
  controlBtns -
  index.ts -
  show.ts -
  bgColor.ts -
  borderColor.ts -
  width.ts -
  height.ts
```

## 08-项目小结

模块化的开发思路，实际上是通过视觉元素，功能性等原则，将代码划分为一个一个拥有各自独立职能的模块。我们通过 ES6 的 modules 语法按需将这些模块组合起来，并借助构建工具打包成为我们熟知的 js 文件的这样一个过程。

当然在实践中我们可能会遇到更复杂的情况。例如目标元素并非单一元素的改变，而是整个区域发生变化，又例如控制目标元素变化的好几个状态值同时发生变化时带来的性能问题等等。当然大家并不用太过担心，这些问题都会是新的挑战，但是我相信大家在掌握了书中知识的情况下，花点时间去调试和折腾都是能够克服这些挑战的。这也是大家从初级往更高级进步的必经之路。

当然，大家也可以主动在此例子的基础上去增加复杂度。例如新增多个目标元素。让目标元素某个属性同时由几个状态值控制等。
