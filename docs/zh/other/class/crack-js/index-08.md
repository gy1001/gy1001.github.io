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

## 02：窗口间如何进行亲密接触 

> 案例：QQ音乐 pc 端播放音乐时候，会新打开一个播放界面，而在上一页中重新点击打开别的歌曲时，会在播放界面进行更新播放歌曲，而不是又重新打开一个页面

### 同源策略

> **同源策略**是一个重要的安全策略，它用于限制一个[源](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)的文档或者它加载的脚本如何能与另一个源的资源进行交互。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b49ff21abf045b58068a11bdd43c6e9~tplv-k3u1fbpfcp-watermark.image?)

### webSocket

* 思路：引入第三者进行中转
* 缺点：需要引入服务端 

### 定时器 + 客户端存储

* 思路：本地存储 + 本地轮询
* 客户端存储技术：
  * cookie
  * localStorage/sessionStorage
  * indexDB
  * chrome 的 FileSystem

#### 示例

> 这里展示一个主界面，两个子iframe界面，然后两个子 iframe 界面互相传递消息

```html
// 主界面
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>setInterval</title>
    <style>
      html,
      body,
      section {
        height: 100%;
      }
      section {
        display: flex;
      }
      iframe {
        flex: 1;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <section>
      <iframe src="./page1.html"></iframe>
      <iframe src="./page2.html"></iframe>
    </section>
  </body>
</html>
```

```html
// page1.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>setInterval Page 1</title>
  </head>
  <body>
    <h3>Page 1</h3>
    <section style="margin-top: 50px; text-align: center">
      <input id="inputMessage" value="page 1的测试消息" />
      <input type="button" value="发送消息" id="btnSend" />
      <section id="messages">
        <p>收到的消息：</p>
      </section>
    </section>
  </body>
  <script>
    var messagesEle = document.getElementById('messages')
    var messageEl = document.getElementById('inputMessage')
    var btnSend = document.getElementById('btnSend')
    var lastMessage = null
    setInterval(() => {
      var message = sessionStorage.getItem('ls-message2')
      try {
        if (message) {
          message = JSON.parse(message)
          if (!lastMessage || lastMessage.date != message.date) {
            appendMessage(message)
            lastMessage = message
          }
        }
      } catch (err) {
        console.log(err)
      }
    }, 200)
    function appendMessage(data) {
      var msgEl = document.createElement('p')
      msgEl.innerText = data.date + ' ' + data.from + ':' + data.message
      messagesEle.appendChild(msgEl)
    }
    btnSend.addEventListener('click', function () {
      var message = messageEl.value
      sessionStorage.setItem(
        'ls-message1',
        JSON.stringify({
          date: Date.now(),
          message,
          from: 'page 1',
        }),
      )
    })
  </script>
</html>
```

```html
// page2.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>setInterval Page 1</title>
  </head>
  <body>
    <h3>Page 2</h3>
    <section style="margin-top: 50px; text-align: center">
      <input id="inputMessage" value="page 2的测试消息" />
      <input type="button" value="发送消息" id="btnSend" />
      <section id="messages">
        <p>收到的消息：</p>
      </section>
    </section>
  </body>
  <script>
    var messagesEle = document.getElementById('messages')
    var messageEl = document.getElementById('inputMessage')
    var btnSend = document.getElementById('btnSend')
    var lastMessage = null

    setInterval(() => {
      var message = sessionStorage.getItem('ls-message1')
      try {
        if (message) {
          message = JSON.parse(message)
          if (!lastMessage || lastMessage.date != message.date) {
            appendMessage(message)
            lastMessage = message
          }
        }
      } catch (err) {
        console.log(err)
      }
    }, 200)

    function appendMessage(data) {
      var msgEl = document.createElement('p')
      msgEl.innerText = data.date + ' ' + data.from + ':' + data.message
      messagesEle.appendChild(msgEl)
    }

    btnSend.addEventListener('click', function () {
      var message = messageEl.value

      sessionStorage.setItem(
        'ls-message2',
        JSON.stringify({
          date: Date.now(),
          message,
          from: 'page 2',
        }),
      )
    })
  </script>
</html>
```

### 定时器 + 客户端存储：缺点

* 可能会产生副租用：cookie 增加网络负担，FileSystem 数据需要清理
* 不够及时，毕竟使用的是定时器
* 受限于同源策略

### postMessage

* 思路：使用某种手段建立窗口之间的联系，通过 postMessage 进行跨窗体通讯
* 优点：不受同源策略的限制
* 缺点：必须拿到对应窗口的引用

> 主子页面中监听 message 事件
>
> iframe 子页面向父页面传递消息：window.parent.postMessage(msg)
>
> 主页面向子页面传递消息：document.getElementById("iframe").contentWindow.postMessage(msg)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>主页面</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <iframe
        src="./ifr.html"
        id="ifr"
        style="width: 600px; height: 300px"
      ></iframe>
    </div>

    index.html

    <div>
      <div>Message:</div>
      <div id="messages"></div>
    </div>
    <script>
      window.addEventListener('message', function (event) {
        messages.innerHTML += `
          <div>${event.data}</div>  
        `
      })
      setInterval(() => {
        ifr.contentWindow.postMessage(`message from index.html, ${Date.now()}`)
      }, 3000)
    </script>
  </body>
</html>
```

```html
// 子页面
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    ifr.html
    <div>
      <div>Message:</div>
      <div id="messages"></div>
    </div>
    <script>
      window.addEventListener('message', function (event) {
        messages.innerHTML += `
          <div>${event.data}</div>  
        `
      })

      setInterval(() => {
        window.parent.postMessage(`message from ifr.html, ${Date.now()}`)
      }, 3000)
    </script>
  </body>
</html>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
</html>
```

### sessionStorage/localStorage StorageEvent

* 思路：当前页面使用的 storage 被其他页面修改时会触发 storageEvent 事件

### sessionStorage/localStorage StorageEvent 的缺点

* 传递的数据大小有限制
* 可能需要进行清理工作(sessionStorge 关闭页面后会消失，localStorage 关闭页面后不清理还在)
* 遵循同源策略
* 同窗口不能监听

#### 示例

> index.html 中通过 localStorage.setItem 改变存储，
>
> other.html 页面中通过 window.addEventListener('storage', fn) 来监听到 storage 事件

```html
// index .html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>主页面</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <form>
      <div>
        <button id="btnSend" type="button">发送消息</button>
      </div>
      <div>消息:</div>
      <div id="message"></div>
      <script>
        btnSend.addEventListener('click', function () {
          localStorage.setItem(
            'key',
            JSON.stringify({
              key: 'key',
              data: Math.random(),
            }),
          )
        })

        window.addEventListener('storage', function (ev) {
          console.log('ev:', ev)
          message.textContent = JSON.stringify({
            oldValue: ev.oldValue,
            newValue: ev.newValue,
          })
        })
      </script>
    </form>
  </body>
</html>
```

```html
// other.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>其他页面</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>
  <body>
    <div>消息:</div>
    <div id="message"></div>

    <script>
      window.addEventListener('storage', function (ev) {
        console.log('ev:', ev)
        message.textContent = JSON.stringify({
          oldValue: ev.oldValue,
          newValue: ev.newValue,
        })
      })
    </script>
  </body>
</html>
```

#### 示例2：如何解决 本窗口不能监听到 storage 事件？

> 思路：使用 **Object.definePropert** 进行拦截重写，派发事件

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>主页面</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <form>
      <div>
        <button id="btnSend" type="button">发送消息</button>
      </div>
      <div>消息:</div>
      <div id="message"></div>
      <script>
        // 拦截，监听事件
        const oriSetItem = localStorage.setItem
        Object.defineProperty(localStorage.__proto__, 'setItem', {
          value: function (key, value) {
            var oldValue = localStorage.getItem(key)
            var event = new StorageEvent('storage', {
              key,
              newValue: value,
              oldValue,
              url: document.URL,
              storageArea: localStorage,
            })
            window.dispatchEvent(event)
            oriSetItem.apply(this, arguments)
          },
        })
      </script>
      <script>
        btnSend.addEventListener('click', function () {
          localStorage.setItem(
            'key',
            JSON.stringify({
              key: 'key',
              data: Math.random(),
            }),
          )
        })

        window.addEventListener('storage', function (ev) {
          console.log('ev:', ev)
          message.textContent = JSON.stringify({
            oldValue: ev.oldValue,
            newValue: ev.newValue,
          })
        })
      </script>
    </form>
  </body>
</html>
```

```html
// other.html 不变
```

### Broadcast Channel

* 允许同源的不同浏览器窗口，Tab页，frame 或者 iframe 下的不同文档之间相互通信
* 缺点：同源策略

```javascript
// page1
var channel = new BroadcastChannel('channel-BroadcastChannel')
channel.postMessage("hello, BroadcastChannel")

// page2
var channel = new BroadcastChannel('channel-BroadcastChannel')
channel.addEventListener('message', function (ev) {
  console.log(ev.data)
}
```

#### 示例

```html
// 主页面
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BroadcastChannel</title>
    <style>
      html,
      body,
      section {
        height: 100%;
      }

      * {
        font-size: 28px;
      }
      section {
        display: flex;
      }
      iframe {
        flex: 1;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <section>
      <iframe src="./page1.html"></iframe>
      <iframe src="./page2.html"></iframe>
    </section>
  </body>
</html>
```

```html
// page1.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BroadcastChannel Page 1</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <h3>Page 1</h3>
    <section style="margin-top: 50px; text-align: center">
      <input id="inputMessage" value="page 1的测试消息" />
      <input type="button" value="发送消息" id="btnSend" />
      <section id="messages">
        <p>收到的消息：</p>
      </section>
    </section>

    <script>
      var messagesEle = document.getElementById('messages')
      var messageEl = document.getElementById('inputMessage')
      var btnSend = document.getElementById('btnSend')
      
      var channel = new BroadcastChannel('channel-BroadcastChannel')
      channel.addEventListener('message', function (ev) {
        var msgEl = document.createElement('p')
        msgEl.innerText =
          ev.data.date + ' ' + ev.data.from + ':' + ev.data.message
        messagesEle.appendChild(msgEl)
      })

      btnSend.addEventListener('click', function () {
        var message = messageEl.value
        channel.postMessage({
          date: new Date().toLocaleString(),
          message,
          from: 'page 1',
        })
      })
    </script>
  </body>
</html>
```

```html
// page2.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BroadcastChannel Page 1</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>
  <body>
    <h3>Page 2</h3>

    <section style="margin-top: 50px; text-align: center">
      <input id="inputMessage" value="page 2的测试消息" />
      <input type="button" value="发送消息" id="btnSend" />
      <section id="messages">
        <p>收到的消息：</p>
      </section>
    </section>

    <script>
      var messagesEle = document.getElementById('messages')
      var messageEl = document.getElementById('inputMessage')
      var btnSend = document.getElementById('btnSend')
      //
      var channel = new BroadcastChannel('channel-BroadcastChannel')
      channel.addEventListener('message', function (ev) {
        var msgEl = document.createElement('p')
        msgEl.innerText =
          ev.data.date + ' ' + ev.data.from + ':' + ev.data.message
        messagesEle.appendChild(msgEl)
      })

      btnSend.addEventListener('click', function () {
        var message = messageEl.value
        channel.postMessage({
          date: new Date().toLocaleString(),
          message,
          from: 'page 2',
        })
      })
    </script>
  </body>
</html>
```

### MessageChannel

* `Channel Messaging API` 的 `MessageChannel` 接口允许我们创建一个新的消息通道，并通过它的两个 `MessagePort` 属性发送数据。
* 缺点：需要先建立联系

```javascript
const channel = new MessageChannel()
const para = document.querySelctor("p")

const iframe = document.querySelector("iframe")
const otherWindow = iframe.contentWindow
ifr.addEventListener("load", iframeLoaded, false)

function iframeLoaded(){
  otherWindow.postMessage("hello message from the main page", "*", [channel.port2])
}

channel.port1.onMessage = handleMessage
function handleMessage(e){
  para.innerHTML = e.data
}
```

#### 示例

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <iframe
      id="ifr"
      src="./ifr.html"
      style="width: 600px; height: 300px"
    ></iframe>

    <div>index.html</div>

    <div>
      <div>Message:</div>
      <div id="messages"></div>
    </div>

    <script>
      const channel = new MessageChannel()

      var ifr = document.querySelector('iframe')
      var otherWindow = ifr.contentWindow

      ifr.onload = function () {
        ifr.contentWindow.postMessage('__init__', '*', [channel.port2])
      }
      // 监听消息
      channel.port1.onmessage = onMessage
      function onMessage(e) {
        messages.innerHTML += `
          <div>${event.data}</div>  
        `
      }
      setInterval(function () {
        channel.port1.postMessage(`message from index.html, ${Date.now()}`)
      }, 3000)
    </script>
  </body>
</html>
```

```html
// ifr.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    ifr.html
    <div>
      <div>Message:</div>
      <div id="messages"></div>
    </div>
    <script>
      window.addEventListener('message', function (event) {
        console.log(event, "event")
        if (event.data === '__init__') {
          initChannel(event.ports[0])
        }
      })
      function initChannel(port) {
        port.onmessage = function (event) {
          console.log('event', event)
          messages.innerHTML += `
            <div>${event.data}</div>  
          `
          port.postMessage(`message from the iframe, ${Date.now()}`)
        }
      }
    </script>
  </body>
</html>
```

### SharedWorker

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker)

* 这是 Web Worker 之后共享出来的 Worker, 不同页面可以共享这个 Worker
* 缺点：兼容性、同源策略

```javascript
var myWorker = new SharedWorker("worker.js");
myWorker.port.postMessage("port message");
myWorker.port.onmessage = function(e) { }

// worker.js
onconnect = function(e) {
  var port = e.ports[0];
  port.addEventListener('message', function(e) {
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    port.postMessage(workerResult);
  });
  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
```

#### 示例

```html
// index.html--主页面
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SharedWorker</title>
    <style>
      html,
      body,
      section {
        height: 100%;
      }

      section {
        display: flex;
      }

      iframe {
        flex: 1;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <section>
      <iframe src="./page1.html"></iframe>
      <iframe src="./page2.html"></iframe>
    </section>
    <script>
      //mdn demo: https://github.com/mdn/simple-shared-worker
    </script>
  </body>
</html>
```

```html
// page1.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SharedWorker Page 1</title>
    <style>
      * {
        font-size: 28px
      }
    </style>
  </head>
  <body>
    <h3>Page 1</h3>
    <section style="margin-top:50px; text-align: center">
      <input id="inputMessage" value="page 1的测试消息" />
      <input type="button" value="发送消息" id="btnSend" />
      <section id="messages">
        <p>收到的消息：</p>
      </section>
    </section>

    <script src="./worker.js"></script>
    <script>
      var messagesEle = document.getElementById("messages");
      var messageEl = document.getElementById("inputMessage");
      var btnSend = document.getElementById("btnSend");

      if (!window.SharedWorker) {
        alert("浏览器不支持SharedWorkder!");
      } else {
        var myWorker = new SharedWorker("./worker.js");

        myWorker.port.onmessage = function(e) {
          var msgEl = document.createElement("p");
          var data = e.data;
          msgEl.innerText = data.date + " " + data.from + ":" + data.message;
          messagesEle.appendChild(msgEl);
        };

        btnSend.addEventListener("click", function() {
          var message = messageEl.value;
          myWorker.port.postMessage({
            date: new Date().toLocaleString(),
            message,
            from: "page 1"
          });
        });

        myWorker.port.start();
      }
    </script>
  </body>
</html>
```

```html
// page2.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SharedWorker Page 1</title>
    <style>
      * {
        font-size: 28px
      }
    </style>
  </head>
  <body>
    <h3>Page 2</h3>
    <section style="margin-top:50px; text-align: center">
      <input id="inputMessage" value="page 1的测试消息" />
      <input type="button" value="发送消息" id="btnSend" />
      <section id="messages">
        <p>收到的消息：</p>
      </section>
    </section>

    <script src="./worker.js"></script>
    <script>
      var messagesEle = document.getElementById("messages");
      var messageEl = document.getElementById("inputMessage");
      var btnSend = document.getElementById("btnSend");
      //
      if (!window.SharedWorker) {
        alert("浏览器不支持SharedWorkder!");
      } else {
        var myWorker = new SharedWorker("./worker.js");

        myWorker.port.onmessage = function(e) {
          var msgEl = document.createElement("p");
          var data = e.data;
          msgEl.innerText = data.date + " " + data.from + ":" + data.message;
          messagesEle.appendChild(msgEl);
        };

        btnSend.addEventListener("click", function() {
          var message = messageEl.value;
          myWorker.port.postMessage({
            date: new Date().toLocaleString(),
            message,
            from: "page 2"
          });
        });

        myWorker.port.start();
      }
    </script>
  </body>
</html>
```

```javascript
// worker.js
var portList = [];

onconnect = function(e) {
  var port = e.ports[0];
  ensurePorts(port);
  port.onmessage = function(e) {
    console.log(e, "e")
    var data = e.data;
    disptach(port, data);
  };
  port.start();
};

function ensurePorts(port) {
  if (portList.indexOf(port) < 0) {
    portList.push(port);
  }
}

function disptach(selfPort, data) {
  portList
    .filter(port => selfPort !== port)
    .forEach(port => port.postMessage(data));
}
```

### 汇总

| 方法方式            | 是否需要有强关联 | 遵守同源策略 | web worker 可用    |
| ------------------- | ---------------- | ------------ | ------------------ |
| WebSocket           |                  |              | 是                 |
| 定时器 + 客户端存储 |                  | 是           | indexDB            |
| postMessage         | 是               |              | 自己的 postMessage |
| StorageEvent        |                  | 是           |                    |
| Broadcast Channel   |                  | 是           | 是                 |
| MessageChannel      | 是               |              | 是                 |
| SharedWoeker        |                  | 是           | 是                 |

## 03: location对象几个重要的知识点

### 了解 location 对象

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/Location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)

* 
