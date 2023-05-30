# 08-被我们忽视的 BOM

## 01: window？你还有多少不知道

### window 是什么

- 一个包含 DOM 文档的窗口，表示浏览器窗口以及页面可见区域
- 是(global) 全局对象，全局变量和函数均时它的属性
- 全局变量

### 为什么会有 window.window 这种设计

- 主要是为了方便使用 this

  ```javascript
  ;(this === this.window(this即window, 其有window属性)) === this.window.window
  // 去掉this
  window === window.window
  ```

  ```javascript
  const log = console.log
  log(window === window.window) // true
  log(window.window === window.window.window) // true
  log(window.window.window === window.window.window.window) // true

  window === window.window // true
  window.window === window.window.window // true
  window.window.window === window.window.window.window // true

  this === window // true
  ```

#### 如何输出全局对象上的 aName 属性

  ```javascript
  var xxxx = this
  var aName = 'global的name'
  function a() {
    var aName = 'local的name'
    // 从xxxx上访问
    console.log(xxxx.name)
  }
  a()
  alert('哈哈')
  ```

解决办法如下

  ```javascript
  var xxxx = this
  var aName = 'global的name'
  function a() {
    var aName = 'local的name'
    // 从xxxx上访问
    console.log(xxxx.name)
  }
  a()
  alert('哈哈')
  ```

### window.isSecureContext

- 一个布尔值，标识当前上下文是否安全，安全 (true) 或者 不安全 (false)
- 这个很重要的一个表现就是网页是不是 https 协议的
- 比如：安全的 https://www.test.com 不安全的：http://wwww.test.com
- 浏览器一些特性是仅仅限于安全上下文执行的
- 不安全的情况：https://w3c.github.io/webappsec-secure-contexts

### window.isSecureContext 例外情况

- http://127.0.0.1
- http://localhost
- http://\*.localhost
- file://url

### screenX, screenY

- screenX: 浏览器左边界到操作系统桌面左边界的水平距离
- screenY：浏览器顶部距离系统桌面顶部的垂直距离

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9008bffe572448c4b5515f02774b9a0c~tplv-k3u1fbpfcp-watermark.image?)

### 尺寸

- innerWidth 和 innerHeight：可视化区域的宽高
- outerWidth 和 outerHeight: 窗口的外层的宽高

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fd9929d95114699bab8d44fe5db4251~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4823ccb5d7464b28bb2923ac447bb837~tplv-k3u1fbpfcp-watermark.image?)

### iframe 嵌套：window, self, this, parent, top

- self === window
- this 全局上下文/全局作用域下等于 window
- parent: 父窗口，没有父窗口时等于 self,也就是 window
- top：顶级窗口，最外层窗口

#### iframe 嵌套：三层嵌套例子

> 对于最外层的: this === window === self === parent === top

˛![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd61d6dc66c5494fad403c44dc138401~tplv-k3u1fbpfcp-watermark.image?)

### open, opener-window.openr

- window.open: 可以打开一个新空白窗口或者指定地址的新窗口
- opner: 返回当前窗口的那个窗口的引用，如果是同源，可以直接调用其窗体的方法

  ```javascript
  let windowObjectReference = window.open(strUrl, strWindowName, [
    strWindowFeatures,
  ])
  ```

#### 使用 window.open 打开新页面，并关闭打开的页面

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>

      <style>
        button {
          font-size: 28px;
        }
      </style>
    </head>

    <body>
      <div>
        <button type="button" id="btnOpen">打开新窗口</button>
        <button type="button" id="btnClose">关闭</button>
      </div>

      <script>
        let winRef
        let strWindowFeatures = `
          menubar=yes,
          location=yes,
          resizable=yes,
          scrollbars=yes,
          status=no,
          left=100px,
          top=100px,
        `

        btnOpen.addEventListener('click', function () {
          winRef = window.open(
            'https://www.imooc.com',
            '慕课网',
            strWindowFeatures,
          )
        })

        btnClose.addEventListener('click', function () {
          winRef && winRef.close()
        })
      </script>
    </body>
  </html>
  ```

#### 同源页面相互调用方法

以下两个页面，在同源页面可以实现，页面方法相互调用

  ```html
  // 父窗口
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        body {
          font-size: 28px;
        }

        button {
          font-size: 28px;
        }
      </style>
    </head>

    <body>
      <div>父窗口</div>

      <button id="btnOpen">打开子窗口</button>
      <button id="btnInvoke">调用子窗口方法</button>

      <script>
        let winRef
        btnOpen.addEventListener('click', function () {
          let strWindowFeatures = `
            menubar=yes,
            location=yes,
            resizable=yes,
            scrollbars=yes,
            status=no,
            left=100px,
            top=100px,
          `
          winRef = window.open('./ifr.html', '慕课网', strWindowFeatures)
        })

        function parentMethod() {
          alert('父窗口方法执行调用')
        }

        btnInvoke.addEventListener('click', function () {
          winRef && winRef.childMethod()
        })
      </script>
    </body>
  </html>

  // ifr.html 子窗口
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        body {
          font-size: 28px;
        }

        button {
          font-size: 28px;
        }
      </style>
    </head>

    <body>
      <div>子窗口</div>

      <button id="btnInvoke">调用父窗口方法</button>

      <script>
        function childMethod() {
          alert('子窗口方法执行调用')
        }

        btnInvoke.addEventListener('click', function () {
          window && window.opener && window.opener.parentMethod()
        })
      </script>
    </body>
  </html>
  ```

### 窗体可见性

#### focus + blur 事件

  ```javascript
  window.addEventListener('focus', function () {
    console.log('i am focused')
  })
  window.addEventListener('blur', function () {
    console.log('i am blurred')
  })
  ```

#### document.hidden

- 返回布尔值，表示页面是(true)否(false)隐藏

#### Document.visibilityState

- 返回 document 的可见性，由此可以知道当前文档（即为页面）是在背后，或者不可见的隐藏的标签页，或者（正在）被渲染
- 可见的值：visible、hidden、prerender

```javascript
console.log(
  'visibilityState:',
  document.visibilityState,
  ' hidden:',
  document.hidden,
)
console.log('')
// 监听窗口可见性事件
document.addEventListener('visibilitychange', function () {
  console.log(
    'visibilityState:',
    document.visibilityState,
    ' hidden:',
    document.hidden,
  )
})
```

#### 窗口可见性-总结

- hidden 与 visibilityState 返回值不同，一个是布尔值，一个是字符串
- visibilityState 的状态多一种 prerender, 其对应的 hidden 的值是 true
- visibilityState 相关的事件：visibilitychange

### window.devicePixelRatio

- 返回当前显示设备的物理像素分辨率与 CSS 像素分辨率之比
- 物理像素：设备能控制显示的最小单位，是设备屏幕上的像素点个数
- 逻辑像素：又称为设备独立像素，屏幕上的物理像素和逻辑像素，并不是相等，一般是物理像素大于逻辑像素，其比值就是 devicePixelRatio

比如：

- iphone12 物理分辨率：1170 \* 2352
- iphone12 逻辑分辨率：390 \* 844
- devicePixelRatio = 1170 / 390 = 3

### scrollTo、scroll、scrollBy

#### 滚动区别

| 方法名         | 作用             | 拥有此方法的对象 |
| -------------- | ---------------- | ---------------- |
| scroll         | 滚动到指定的位置 | Window, Element  |
| scrollTo       | 滚动到指定的位置 | Window, Element  |
| scrollBy       | 滚动指定的偏移量 | Window, Element  |
| scrollIntoView | 滚动到可视区     | Element          |

#### 其他滚动方法

- 设置 scrollTop, scrollLeft 等
- 设置锚点

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>滚动锚点</title>
      <style></style>
    </head>

    <body>
      <div style="position: fixed; top: 0; right: 0">
        <a href="#div1">滚动到Div1</a>
        <a href="#div2">滚动到a标签</a>
      </div>

      <div style="height: 500px"></div>
      <div id="div1" style="height: 500px">div1的内容</div>
      <a name="div2" style="height: 500px; display: block">a的内容</a>
    </body>
  </html>
  ```

### window.matchMedia()

- 可用于判定 Document 是否匹配媒体查询
- 监控一个 document 来判定它匹配了或者停止匹配了此媒体查询

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        * {
          font-size: 30px;
        }
      </style>
    </head>

    <body>
      <div>
        (min-width: 600px):
        <span style="color: red" id="mq-value"> </span>
      </div>
      <script>
        let mql = window.matchMedia('(min-width: 600px)')
        document.querySelector('#mq-value').innerText = mql.matches
        // 监听变化
        mql.addEventListener('change', function () {
          mql = window.matchMedia('(min-width: 600px)')
          document.querySelector('#mq-value').innerText = mql.matches
        })
      </script>
    </body>
  </html>
  ```

### window.getSelection()

- 表示用户选择的文本范围或者光标的当前位置
- 可使用 Document.activeElement 来返回当前的焦点元素
- 另外一个等价方法：Document.getSelection() 两个方法等价

  ```html
  以下示例，会不断输出当前选中的文本
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        body {
          font-size: 22px;
          margin: 50px;
        }
      </style>
    </head>
    <body>
      <div>我们都是好孩子，最最善良的孩子。</div>
      <div>好好学习，天天向上。</div>
      <input value="JS高级进阶" />
      <div style="margin-top: 50px"></div>
      选中的内容：
      <div id="selectedContent"></div>
      <script>
        setInterval(function () {
          selectedContent.textContent = window.getSelection().toString()
        }, 3000)
      </script>
    </body>
  </html>
  ```

### window.frameElement

- 返回嵌入当前 window 对象的元素的元素(比如 ifame 或者 object). 如果当前 window 对象已经是顶层窗口，则返回 null
- 例子：window.frameElement 获得 iframe 节点，然后设置其 src 属性，实现调整

  ```html
  // 父页面
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <div>
        <iframe src="./ifr.html"></iframe>
      </div>
    </body>
  </html>

  // ifr.html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        body {
          font-size: 28px;
        }
      </style>
    </head>
    <body>
      iframe 1
      <script>
        setTimeout(function () {
          window.frameElement.src = './ifr2.html'
        }, 5000)
      </script>
    </body>
  </html>

  // ifr2.html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        body {
          font-size: 28px;
        }
      </style>
    </head>

    <body>
      iframe 2
      <script>
        setTimeout(function () {
          window.frameElement.src = './ifr.html'
        }, 5000)
      </script>
    </body>
  </html>
  ```

### 网络状态

- window.onoffline = fn
- window.ononline = fn
- window.addEventListener("offline", fn)
- window.addEventListener('online', fn)

  ```javascript
  message.innerHTML += `i am ${navigator.onLine ? 'online' : 'offline'}<br />`

  window.onoffline = function () {
    message.innerHTML += 'i am offline <br />'
  }

  window.ononline = function () {
    message.innerHTML += 'i am online <br />'
  }

  window.addEventListener('offline', (event) => {
    console.log('网络连接已断开。')
  })

  window.addEventListener('online', (event) => {
    console.log('You are now connected to the network.')
  })
  ```

### window.print 打印

- 打开打印对话框打印当前文档

### window.print 样式设置
- 第一种： 媒体查询
  ```css
  @media print {
    .content1 {
      color: green;
      font-size: 18px;
    }
  }
  ```
- 第二种：设置 style ，media = "print"
  ```html
  <style media="print">
    .content1 {
      color: green;
      font-size: 18px
    }
  </style>
  ```
- 第三种，link 中增加 media="print" 属性
  ```html
  <link rel="stylesheet" href="./print.css" media="print" />
  ```
- 第四种： 使用 @import 时候，后面写明 print
  ```css
  @import url('print.css') print;
  ```

### window.print 打印局部内容？？？

- 思路：使用样式隐藏其他内容

```css
<style media="print">
  .content1 {
    color: green;
    font-size: 18px
  }
  .content2 {
      display: none;
  }
  #btnPrint {
      display: none
  }
</style>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    // <link rel="stylesheet" href="./print.css" media="print">
    <style>
        body {
            font-size: 28px;
        }

        .content1 {
            color: blue;
        }

        .content2 {
            color: red;
        }

        #btnPrint {
            font-size: 28px;
            position: fixed;
            right: 100px;
            top: 0
        }
    </style>

    <style media="print">
        .content1 {
            color: green;
            font-size: 18px
        }
        .content2 {
            display: none;
        }
        #btnPrint {
            display: none
        }
    </style>
</head>
<body>
  <div class="content1">
      <h3>关雎</h3>
      <p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。</p>
      <p>参差荇菜，左右流之。窈窕淑女，寤寐求之。</p>
      <p>求之不得，寤寐思服。悠哉悠哉，辗转反侧。</p>
      <p>参差荇菜，左右采之。窈窕淑女，琴瑟友之。</p>
      <p>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。</p>
  </div>
  <div class="content2">
    <h3>硕鼠</h3>
    <p></p>硕鼠硕鼠，无食我黍！三岁贯女，莫我肯顾。逝将去女，适彼乐土。乐土乐土，爰得我所。</p>
    <p>硕鼠硕鼠，无食我麦！三岁贯女，莫我肯德。逝将去女，适彼乐国。乐国乐国，爰得我直。</p>
    <p>硕鼠硕鼠，无食我苗！三岁贯女，莫我肯劳。逝将去女，适彼乐郊。乐郊乐郊，谁之永号？</p>
  </div>

  <button id="btnPrint">打印</button>
  <script>
    btnPrint.addEventListener("click", function () {
        window.print();
    })
  </script>
</body>
</html>
```
