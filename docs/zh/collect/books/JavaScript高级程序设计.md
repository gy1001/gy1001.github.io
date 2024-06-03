# JavaScript 高级程序设计.md

## 17. 事件

### 17.6 模拟 DOM 事件

任何时候，都可以通过`document.createEvent()`方法创建一个event 对象。这个方法接收一个参数，此参数是一个表示要创建事件类型的字符串。可用的字符串是以下值之一

* UIEvents：(DOM3中是 UIEvent) 通用用户界面事件（鼠标事件和键盘事件都继承自这个事件）
* MouseEvents: (DOM3中是 MouseEvent): 通用鼠标事件
* HTMLEvents:(DOM3中没有)：通用鼠标事件

事件模拟的最后一步是触发事件。为此要使用 *dispatchEvent()*方法，这个方法存在于所有支持事件的DOM节点上。 接收一个参数，即表示要触发事件的 event 对象。调用 dispatchEvent()后，事件就“转正”了，接着便冒泡并触发事件处理程序执行。

#### 17.6.1 模拟鼠标事件

> 要创建鼠标 event 对象，可以调用 createEvent() 方法并传入 MouseEvents  参数。这样可以返回一个 event 对象，这个对象有一个 initMouseEvent() 方法，用于为新对象指定鼠标的特定信息。

initMouseEvent()方法接收15个参数，分别对应鼠标事件会暴露的属性。这些参数列举如下

* type(字符串)：要触发的事件类型，如 click
* buddles(布尔值)：表示事件是否冒泡。为精确模拟鼠标事件，应该设置为 true
* cancelable(布尔值)：表示事件是否可以取消。为精确模拟鼠标事件，应该设置为 true
* view(AbstractView)：与事件关联的视图。只被事件处理程序使用，通常为 0
* detail(整数)：关于事件的额外信息。只被事件处理程序使用，通常为 0
* screenX(整数)：事件相对于屏幕的x坐标
* screenY（整数）：事件相对于屏幕的 y 坐标。
* clientX（整数）：事件相对于视口的 x 坐标。
* clientY（整数）：事件相对于视口的 y 坐标。
* ctrlkey（布尔值）：表示是否按下了 Ctrl 键。默认为 false。
* altkey（布尔值）：表示是否按下了 Alt 键。默认为 false。
* shiftkey（布尔值）：表示是否按下了 Shift 键。默认为 false。
* metakey（布尔值）：表示是否按下了 Meta 键。默认为 false。
* button（整数）：表示按下了哪个按钮。默认为 0。
* relatedTarget（对象）：与事件相关的对象。只在模拟 mouseover 和 mouseout 时使用。

代码如下

```javascript
let btn = document.getElementById('myBtn')
// 创建 event 对象
let event = document.createEvent('MouseEvents')
// 初始化 event 对象
event.initMouseEvent(
  'click',
  true,
  true,
  document.defaultView,
  0,
  0,
  0,
  0,
  0,
  false,
  false,
  false,
  false,
  0,
  null
)
// 触发事件
btn.dispatchEvent(event)
```
