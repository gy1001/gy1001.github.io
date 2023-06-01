# 09-深入探索网络请求
## 01: HTTP必备知识

> MDN: [HTTP 的发展](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)

### HTTP 简介

* 定义：HTTP（HyperText Transfer Protocol）超文本传输协议，是万维网(world Wide Web) 的基础协议

#### 最初的万维网(world wide web)

* 超文本标记语言（HTML）
* 超文本传输协议（HTTP）
* 超文本文档的客户端，即网络到浏览器
* 用于提供可访问的文档的服务器

### HTTP/0.9 (1991)

* 仅仅支持 GET 请求
* 不包含 HTTP 头，只能传输 HTML 文件
* 没有状态码或者错误代码

### HTTP/1.0 (1996)

* 发送时添加协议版本信息

  ```http
  GET /mypage.html HTTP/1.0
  User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
  
  200 OK
  Date: Tue, 15 Nov 1994 08:12:31 GMT
  Server: CERN/3.0 libwww/2.17
  Content-Type: text/html
  <HTML>
  一个包含图片的页面
    <IMG SRC="/myimage.gif">
  </HTML>
  ```

  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/264221a2e6134d9a99bf88a726d616c9~tplv-k3u1fbpfcp-watermark.image?)

* 相应添加状态码，我们熟知的 200、404 等

* 引入了 HTTP 头，多了传递信息的手段，更加灵活和方便扩展了

* HTTP 头里面引入了重要的 content-type 属性，具备了传输纯文本 HTML 文件以外其他类型文档的能力

### HTTP/1.1（1997）

* 连接可以复用，节省了多次打开 TCP 连接加载网页文档资源的时间。（如下请求过程中的请求头部有 Connection: Keep-Alive 属性，响应体里面有 Keep-Alive: timeout=5, max=1000 ）
* 增加管线化技术，允许在第一个应答被完全发送之前就发送第二个请求，以降低通信延迟。
* 支持响应分块。（就是单个请求返回部分内容，这个需要前后端配合）
* 引入额外的缓存控制机制。cache-control, eTag就是 1.1 引入的的，强缓存和协商缓存
* 引入内容协商机制，包括语言、编码、类型等。并允许客户端和服务器之间约定以最合适的内容进行交换。
* 凭借 [`Host`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Host) 标头，能够使不同域名配置在同一个 IP 地址的服务器上。

一个典型的请求流程，所有请求都通过一个连接实现，看起来就像这样：

```http
GET /en-US/docs/Glossary/Simple_header HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Wed, 20 Jul 2016 10:55:30 GMT
Etag: "547fa7e369ef56031dd3bff2ace9fc0832eb251a"
Keep-Alive: timeout=5, max=1000
Last-Modified: Tue, 19 Jul 2016 00:59:33 GMT
Server: Apache
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding

(content)


GET /static/img/header-background.png HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

200 OK
Age: 9578461
Cache-Control: public, max-age=315360000
Connection: keep-alive
Content-Length: 3077
Content-Type: image/png
Date: Thu, 31 Mar 2016 13:34:46 GMT
Last-Modified: Wed, 21 Oct 2015 18:27:50 GMT
Server: Apache

(image content of 3077 bytes)
```

### HTTP 1.x 报文，请求报文

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0747f4ec4d0d450693ec11a1093b467b~tplv-k3u1fbpfcp-watermark.image?)

```http
POST /user HTTP/1.1                       // 请求行
Host: www.user.com
Content-Type: application/x-www-form-urlencoded
Connection: Keep-Alive
User-agent: Mozilla/5.0.                  // 以上是请求头
（此处必须有一空行 |                         // 空行分割header和请求内容 
name=world                                // 请求体(可选，如get请求时可选)
```

* 请求行由三部分组成：**请求方法**、**请求URL**（不包括域名 | 、**HTTP协议版本**, (请求方法比较多：GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT)

### HTTP 1.x 报文，响应报文

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23dac32a93a94bd19a8ea76979485e0c~tplv-k3u1fbpfcp-watermark.image?)

```http
GET /rest/mywork/latest/status/notification/count HTTP/1.1
Accept: application/json
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
Cookie: seraph.confluence=99455447%3Aa0267bacafdcecfc02e407a73cd09955c18e8536; JSESSIONID=B9DC00916AB977CD05B1021CA9A9BAF1
Host: wiki.hengchang6.com
Referer: http://xxxx.com/plugins/servlet/mobile?contentId=107755645
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
X-Requested-With: XMLHttpRequest
```

### 常用状态码

#### 信息响应：

* 101 协议切换

#### 成功响应

* 200 请求成功
* 204 请求成功，不返任何内容
* 206 范围请求成功

#### 重定向

* 301 永久的重定向
* 302 临时的重定向
* 304 资源未失效

#### 客户端响应

* 400 无法被服务器理解
* 401 未授权
* 403 禁止访问
* 404 未找到资源
* 405 禁止使用该方法

#### 服务端响应

* 500 服务器异常
* 503 服务不可达

### 必须知道的 header 头：请求头

| 名字            | 说明                                                         | 示例                                                         |
| --------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Accept          | 请求头用来告知（服务器）客户端可以处理的内容类型，这种内容类型用[MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)来表示。 | text/html, application/xhtml+xml, application/xml;q=0.9,\*/\*;q=0.8 |
| Accept-Encoding | HTTP 请求头 **Accept-Encoding** 会将客户端能够理解的内容编码方式——通常是某种压缩算法——进行通知（给服务端） | gzip、compress、deflate、br、identity                        |
| Accept-Language | 客户端可以理解的语言                                         | zh-CN,zh;qq=0.9, \*/\*;q=0.8                                 |
| Cache-Control   | **`Cache-Control`** 通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制 | Cache-Control: max-age=\<seconds\>                           |
| Cookie          | cookie信息                                                   |                                                              |
| Connection      | 是否是长连接                                                 | keep-alive                                                   |
| Content-type    | 实际发送的数据类型                                           | Content-Type: text/html; charset=utf-8<br/>Content-Type: multipart/form-data; boundary=something |
| Host            | 要发送到的服务器主机名和端口号                               | www.imooc.com                                                |
| User-Agent      | 用户代理，包含应用类型、操作系统、软件开发商那以及版本号等   |                                                              |
| Refer           | 当前请求的来源页面的地址                                     |                                                              |

### 必须知道的 header 头：响应头

| 名字             | 说明                                                         | 示例                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Date             | 服务器的相应日期和时间                                       |                                                              |
| Conection        | 是否会关闭网络连接                                           | Connection: keep-alvie                                       |
| Keep-Alive       | 空闲连接需要保持打开状态的最小时长和最大请求数<br />（Connection 设置为 keep-alive 才有意义） | keep-Alive:timeout = 5,,ax = 10<br />空闲5s，最多接收10次请求就断开 |
| Content-Encoding | 内容编码方式                                                 | Content-Encoding: gzip                                       |
| Content-Length   | 报文中实体主体的子节大小                                     | Content-Length: 1963                                         |
| Content-Type     | 内容的内容类型                                               | Content-Type: text/html;charset=utf-8                        |
| Server           | 服务器所用到的软件相关通信                                   | Server: openresty<br />基于 NGINX 的可伸缩的 WEB 平台        |
| Set-Cookie       | 向客户端发送 Cookie                                          | Set-Cookie: imooc_isnew=2;expires=Thu,02-Mar-2023 12:32:42 GMT;Max-Age=31536000;path=/;domain=.imooc.com |

### 实战练习

#### 服务端代码

```javascript
const express = require('express')
const path = require('path')
const multer = require('multer')

const server = express()

server.use(
  express.urlencoded({
    extended: true,
  }),
)

server.use(express.json())

server.use(express.static(path.join(__dirname, './static')))

server.use('/urlencoded', function (req, res) {
  console.log('收到请求(urlencoded)')
  console.log('body:', req.body)
  res.json({
    code: 10000,
    data: req.body,
  })
})

server.use('/multipart', multer().none(), function (req, res) {
  console.log('收到请求(multipart)')
  console.log('body:', req.body)
  res.json({
    code: 10000,
    data: req.body,
  })
})

server.use('/json', multer().none(), function (req, res) {
  console.log('收到请求(json)')
  console.log('body:', req.body)
  res.json({
    code: 10000,
    data: req.body,
  })
})

server.listen(3000, function () {
  console.log('listening at port 3000')
})
```

#### 客户端部分

##### application/x-www-form-urlencoded

```javascript
function fetchByUrlencoded() {
  fetch('/urlencoded', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'name=tom&age=18',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('收到结果:', res)
      result.innerHTML = JSON.stringify(res)
    })
}
```

注意上述参数的 body, 是字符串拼接，未免显得过于麻烦，如下方式，可以进行优化

```javascript
function fetchByUrlencoded() {
  // 对中文还能自行编码
  const params = new URLSearchParams({
    name: 'tom',
    age: 18,
  })
  fetch('/urlencoded', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('收到结果:', res)
      result.innerHTML = JSON.stringify(res)
    })
}
```

##### multipart/form-data

###### 示例1：表单提交

```html
<form action="/multipart" method="post" enctype="multipart/form-data">
</form>
```

>注意 form 标签中的 enctype="multipart/form-data" 属性值

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
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>结果:</div>
    <div id="result"></div>
    <div>表单提交</div>
    <form action="/multipart" method="post" enctype="multipart/form-data">
      <input type="text" name="name" value="tom" />
      <input type="text" name="age" value="18" />
      <button type="submit">提交表单</button>
    </form>
  </body>
</html>
```

###### 示例2：使用 FormData 格式参数

```html
<div>代码提交:</div>
<button type="button" id="btnSend">发送请求</button>
<script>
  btnSend.onclick = fetchByMultipart

  function fetchByMultipart() {
    const formData = new FormData()
    formData.append('name', 'tom')
    formData.append('age', 18)
    fetch('/multipart', {
      method: 'POST',
      // 不要设置 content-tyoe
      // headers: {
      //     "Content-Type": "multipart/form-data",
      // },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('收到结果:', res)
        result.innerHTML = JSON.stringify(res)
      })
  }
</script>
```

##### application/json

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>1.x-www-form-urlencoded</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnSend">发送请求</button>
    <div>
      <div>结果:</div>
      <div id="result"></div>
    </div>

    <script>
      btnSend.onclick = fetchByJSON

      function fetchByJSON() {
        fetch('/json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'tom', age: 18 }),
        })
          .then((res) => {
            console.log('返回的content-type:', res.headers.get('Content-Type'))
            return res
          })
          .then((res) => res.json())
          .then((res) => {
            console.log('收到结果:', res)
            result.innerHTML = JSON.stringify(res)
          })
      }
    </script>
  </body>
</html>
```

### HTTPS

* https(Hypertext Transfer Protocol Secure): 超文本传输安全协议，在 HTTP 的基础上加了一个 Secure 安全
* HTTPS 是 HTTP 协议的一种扩展，使用传输层安全性（TLS）或者安全套接字层（SSL）对通信协议进行加密
* **HTTP + SSL(LTS) = HTTPS**

### HTTP2

* 二进制帧
* 多路复用
* 头部压缩
* 服务端推送

### HTTP3

* 基于 UDP 的传输层协议，那就是快啊

## 0.2：ajax and fetch，都没你想得那么美

### Ajax 发展史

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c0c82357bd94f00be6ca39082e4c170~tplv-k3u1fbpfcp-watermark.image?)

### Ajax 技术集合

* 全称：Asynchronus Javascript And XML (异步 JavaScript 和 XML)
* 它并不是指单一的某种技术，而是多种现有技术的结合，实现“无页面刷新的数据获取”
* 这些技术包括了: HTML 或者 XHTML、CSS、JavaScript、DOM、XML、XSLT 以及最重要的 **XMLHttpRequest**

### XML (XMLHttpRequest) 简史

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

#### 2006年 XHR Level 1

* 只支持文本数据的传送，无法用来读取和上传二进制数据
* 传送和接收数据，没有进度信息
* 受到“同源限制”，只支持同一域名的服务器请求

#### 2008年 XHR Level 2

* 支持 HTTP 请求超时设置 => timeout
* 可以使用 FormData 对象管理表单数据 => xhr.send(formdata)
* 可以上传文件 => xhr.send(formdata)
* 可以请求不同域名下的数据(跨域)
* 可以获取服务器端的二进制数据 => reponseType="blob"
* 可以获取数据的传输进度 => onprogress

#### 2011 年 XHR Level 1 和 XHR Level 2 合并规范

### XMLHttpRequest 属性解读

* `upload`: 返回一个 XMLHttpRequestUpload 对象，表示上传的进度
* `withCredentials`: 用来指定跨度请求是否应当带有授权信息，如 cookie
* `abort()`: 如果请求已经发出，立刻将终止请求
* `getAllResponseHeaders()`: 获取所有的响应头
* `getResponseHeader()`: 获取指定的响应头文本字符串
* `open()`: 初始化一个请求
* `overrideMimeType()`: 指定一个 MIME 类型, 替代服务器指定的类型
* `send()`: 发送请求
* `setRequestHeader()`: 设置请求头部
* `readState`: 返回 XHR 代理当前所处的状态(0-4)
* `status`: 返回响应的状态码，请求之前为 9，成功为 200
* `statusText`: 服务器返回的状态码文本
* `timeout`: 指定 ajax 的超时时长
* `response`: 服务器响应的内容
* `responseText`: 服务器响应内容的文本形式
* `responseType`: 响应的类型： arrayBuffer, document.json, text
* `responseXML`: xml 形式的响应数据
* `responseURL`: ajax 最终请求的 url, 存在重定向，就是重定向后的 url

### XMLHttpRequest 事件

* `onreadystatechange/readystatechang`: readState 属性变化时候触发
* `ontimeout/timeout`: 在预设时间内没有收到响应触发
* `onabort/abort`: request 被停止时触发
* `onloadstart/loadstart`: 接收到响应数据时触发
* `onload/load`: 请求成功完成时完成触发
* `onloadend/loadend`: 请求结束触发，无论请求成功与否
* `onerror/error`: 请求遇到错误时触发
* `onprogress/progress`: 当请求收到更多数据时，周期性触发

### XHR 的使用

```javascript
function test() {
  //1. 创建实例对象
  var xhrObj = new XMLHttpRequest()

  //注册readystatechange回调监听
  xhrObj.onreadystatechange = function () {
    console.log('xhrObj.readyState==', xhrObj.readyState)
    console.log('xhrObj.status==', xhrObj.status)
    //readyState==4 && status=200 代表请求成功
    if (xhrObj.readyState == 4 && xhrObj.status == 200) {
      //局部刷新文本
      document.getElementById('responseDiv').innerHTML = xhrObj.responseText
    }
  }

  //请求错误回调
  xhrObj.onerror = function () {
    console.log('-------onerror-------:')
  }

  //请求成功完成回调
  xhrObj.onload = function () {
    console.log('-------onload-------:', xhrObj.responseText)
  }

  //请求开始回调
  xhrObj.onloadstart = function () {
    console.log('-------onloadstart-------')
  }

  //请求完成回调，不论请求成功与否
  xhrObj.onloadend = function () {
    console.log('-------onloadend-------')
  }

  //设置请求地址, true 异步请求，false:同步请求，
  xhrObj.open('post', 'http://127.0.0.1:3000/xhr', true)
  //设置请求携带header
  xhrObj.setRequestHeader(
    'Content-Type',
    'application/x-www-form-urlencoded',
  )
  //发送请求数据
  xhrObj.send('xhr=1')
}
```

### XHR（传统Ajax）的缺点

* 回调地狱的窘境
* XHR 不符合关注点分离原则：(一系列属性、事件都在 xhrObj 上，不太好分离。也不好复用)

### fetch 诞生

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

* 在原有 xhr 的基础上改革，但是因为技术债的约束，不好更新
* 重新设计一套，这就是 Fetch API, 好处是没有历史包袱

### fetch 的优点

* Promise 语法，解决了 回调地狱的问题
* 更合理的设计，分离 Request, Response 等通用对象
* 前端可拦截 301 302 等跳转
* 支持数据流(Stream),方便处理大文件
* 语法简单

### fetch 优雅使用

#### fetch 基本使用

```javascript
// get
fetch('http://127.0.0.1:3000/test1')
  .then((response) => response.text())
  .then((text) => console.log('获取到的数据对象===', text))
  .catch((err) => console.log('Request Failed', err))

//post
fetch('http://127.0.0.1:3000/report', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;',
  },
  body: 'report=2',
  mode: 'cors', //设置跨域
})
  .then((response) => response.json())
  .then((json) => console.log('post 获取到的数据对象===', json))
  .catch((err) => console.log('Request Failed', err))
```

#### fech 拦截 30x 的示例

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
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <button id="btnXhr">XHR</button>
      <button id="btnFetch">Fetch</button>
    </div>

    <script>
      btnXhr.onclick = xhr30x
      btnFetch.onclick = fetch30x

      function fetch30x() {
        fetch('http://www.baidu.com', { redirect: 'error' }).catch((err) =>
          console.log('err:', err),
        )
      }

      function xhr30x() {
        var xhrObj = new XMLHttpRequest()
        xhrObj.onreadystatechange = function () {
          console.log('xhrObj.readyState==', xhrObj.readyState)
          console.log('xhrObj.status==', xhrObj.status)
        }
        xhrObj.open('get', 'http://www.baidu.com', true)
        //设置请求携带header
        xhrObj.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded',
        )
        //发送请求数据
        xhrObj.send('xhr=1')

        xhrObj.onerror = function () {
          console.log('-------onerror-------:')
        }
      }
    </script>
  </body>
</html>
```

### Fetch VS XHR

#### 1: 关于请求中断

* fetch 缺少中断请求
* fetch 中断需要使用其他 API 来实现(AbortController 和 AbortSignal)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .abort {
      position: relative;
      font-size: 30px;
      width: 180px;
      height: 50px;
      background: red;
    }

    .start {
      position: relative;
      font-size: 30px;
      width: 180px;
      height: 50px;
      background: beige;
      margin-bottom: 20px;
    }
  </style>
  <body>
    <div class="start" id="startNet">startNet</div>
    <div class="abort" id="abort">abort</div>
    <script>
      const controller = new AbortController()
      const signal = controller.signal

      abort.onclick = function () {
        controller.abort()
      }

      startNet.onclick = function () {
        fetch('http://127.0.0.1:3000/test1', { signal })
          .then((response) => {
            return response.text()
          })
          .then((text) => {
            console.log(text)
          })
      }
    </script>
  </body>
</html>
```

#### 2. 关于上传进度

* fetch 缺少获取请求传输进度的能力，例如 XHR 的 onprogress 事件
* 其实可以获取，比较麻烦，使用 Response.body 给我们返回了一个 ReadableStream 对象

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      let progress = 0
      let contentLength = 0

      fetch('./test.mp4')
        .then((response) => {
          // 通过响应头获取文件大小
          contentLength = response.headers.get('Content-Length')
          const reader = response.body.getReader()

          return reader.read().then(function processResult(result) {
            if (result.done) {
              console.log('请求完毕')
              return
            }

            progress += result.value.byteLength
            console.log(
              'total:',
              contentLength,
              '=progress:',
              progress,
              '==%:',
              (progress / contentLength) * 100 + '%',
            )

            return reader.read().then(processResult)
          })
        })
        .catch((err) => console.log('Request Failed', err))
    </script>
  </body>
</html>
```

#### 3. 关于兼容性

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bd46fc9b3e74fcd9da6f3a2bf6ef3d3~tplv-k3u1fbpfcp-watermark.image?)

#### 4. 关于超时

* 不支持超时
* 需要使用 setTimeout 自己封装

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>fetch 不支持超时</div>
    <button id="ajaxBtn">发起超时请求</button>
    <div class="ajax-change" id="responseDiv">change区域</div>
    <script>
      const oldFetch = fetch
      window.fetch = function (input, opts) {
        return new Promise(function (resolve, reject) {
          //开启超时
          const timeoutId = setTimeout(function () {
            reject(new Error('fetch timeout'))
          }, opts.timeout)
          oldFetch(input, opts).then(
            (res) => {
              //清除超时
              clearTimeout(timeoutId)
              resolve(res)
            },
            (err) => {
              //清除超时
              clearTimeout(timeoutId)
              reject(err)
            },
          )
        })
      }

      function test() {
        // get
        fetch('http://127.0.0.1:3000/timeout', { timeout: 5 * 1000 })
          .then((response) => response.text())
          .then((text) => console.log('获取到的数据对象===', text))
          .catch((err) => console.error('Request Failed', err))
      }

      document.getElementById('ajaxBtn').addEventListener('click', function () {
        test()
      })
    </script>
  </body>
</html>
```

#### 5. 关于携带 cookie

> 请注意，`fetch` 规范与 `jQuery.ajax()` 主要有以下的不同：
>
> - 当接收到一个代表错误的 HTTP 状态码时，从 `fetch()` 返回的 Promise **不会被标记为 reject**，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 [`ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。
> - `fetch` **不会发送跨域 cookie**，除非你使用了 *credentials* 的[初始化选项](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#参数)。（自 [2018 年 8 月](https://github.com/whatwg/fetch/pull/585)以后，默认的 credentials 政策变更为 `same-origin`。Firefox 也在 61.0b13 版本中进行了修改）

* 同源携带 cookie, 不同源不携带 cookie（XHR 与 fetch 相同）

#### 6. 错误不会被拒绝

* 错误不会被拒绝（状态码为 400-500时）,并不会触发 Promise的 reject 回调

### 选择 XHR 还是 Fetch

* 如果你需要兼容低版本 IE，那就使用 XHR
* 如果你希望结果 `streams API` 和 `service worker`, 那么使用 `fetch`
* 更加推荐 Axios

### Axios 推荐

* axios 是一个基于 Promise 网络请求库，作用域 Node.js 和浏览器中
* 对于客户端：XMLHttpRequest 进行了二次封装
* 对于服务器：使用 Node.js http 模块

## 03：同源策略和跨域请求不烦恼

### 同源策略

* 定义：同源策略限制了不同源之间进行资源交互，是用于隔离潜在恶意文件的重要安全机制
* 同源：protocol + hostname + port

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/650aefd62b864207ae0055c0e9da2af6~tplv-k3u1fbpfcp-watermark.image?)

### 同源策略下限制

* 非同源策略：localStorage, sessionStorage 和 indexDB 受限，cookie 以本域和父域为限制
* 非同源 DOM 获取受限
* 非同源发送 ajax 受限

### 跨域访问请求

* 跨域写操作一般被允许，例如：链接(a便签)、重定向，表单提交
* 跨域资源嵌入一般被允许，如 script link img video object embed ifram 标签等

### 不同源窗口/文档交流

#### window

* frames 只读
* length 只读
* closed 只读
* opener 只读
* parent 只读
* self 只读
* top 只读
* window 只读
* location 读/写

#### location

* replace()
* href 只写

#### 代码示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type="text/javascript">
      function loadEnd() {
        const iframe = document.getElementById('iframe')
        const win = iframe.contentWindow //window对象的属性和方法几乎是不可用的

        //console.log(win.blur);
        // win.location="http://www.baidu.com";
        // window.iframeWin=win;
        const doc = win.document //这里获取不到iframe里的document对象
        const name = win.name //这里同样获取不到window对象的name属性
        console.log(doc)
        console.log(name)
      }
    </script>
    <iframe
      id="iframe"
      src="https://www.imooc.com/"
      onload="loadEnd()"
      style="width: 800px; height: 600px"
    ></iframe>
  </body>
</html>
```

### 网络跨域解决方案-JSONP

* 原理：借助浏览器允许 script 标签跨域资源嵌套，执行回调

#### JSONP 步骤

1. script 标签 url 上携带回调函数名称
2. 后端解析 queryString 获取回调函数名称
3. 将数据传入回调函数，返回字符串
4. 客户端拿到结果，浏览器自动执行

#### 代码示例

##### 客户端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function jsonpCallback(data) {
        alert('收到数据了，快来控制台看看')
        console.log('收到的数据：', data)
      }
    </script>
    <script src="http://127.0.0.1:3000/jsonp_request?callback=jsonpCallback"></script>
  </head>
  <body></body>
</html>
```

##### 服务端

```typescript
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import createError from 'http-errors'
var urlLib = require('url')

const port = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
const server = http.createServer(app)

app.get('/jsonp_request', (_req, res) => {
  const params = urlLib.parse(_req.url, true)
  if (params.query && params.query.callback) {
    var str =
      params.query.callback + '(' + JSON.stringify({ test: '服务端数据' }) + ')'
    res.send(str)
  } else {
    res.send('world')
  }
  console.log(params.query.callback)
})

server.listen(port, () => {
  console.log('监听端口:', port)
})

// catch 404 and forward to error handler
app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction,
  ) => {
    const error = createError(404)
    next(error)
  },
)

process.on( 'unhandledRejection', (reason: {} | null | undefined, p: Promise<any>) => {
  	console.error('自定义错误 Unhandled Rejection at:', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
  },
)
```

### 网络跨域解决方案-JSONP缺点

* 只支持 GET 请求，不支持 POST 等其他类型的 http 请求
* JSONP 存在明显的安全问题

### 网络跨域解决方案-CORS

* 定义：跨资源共享(cross-origin sharing)，是一种基于 **HTTP 头的机制**，该机制通过允许服务器标示除了它自己以外的其他 origin （域，协议和端口），这样浏览器可以访问加载这些资源

### CORS相关响应头

* `Access-Control-Allow-Origin`: 允许访问资源的外域 URL
* `Access-Control-Max-Age`: 预检请求的结果能缓存多久
* `Access-Control-Expose-Headers`: 服务器把允许浏览器访问的响应头放入白名单
* `Access-Control-Allow-Methods`: 服务器支持的所有跨域请求的方法
* `Access-Control-Allow-Headers`: 请求头所有支持的首部字段列表
* `Access-Control-Allow-Credentials`: 是否可以使用 credentials

### CORS 相关请求头

* origin: 预检请求或者实际请求的源站，不包含路径信息，只有服务器明名称
* Access-Control-Request-Method: 将实际使用的 HTTP 方法告诉服务器，用于预检请求
* Access-Control-Request-Headers: 将实际携带的 header 字段告诉服务器，用于预检请求

### 网络跨域解决方案-CORS-简单请求

#### 条件一

使用下列方式之一：

* GET 
* POST
* HEAD

#### 条件二

如果被用户自动代理的字段，只允许Header 下列字段

* Accept
* Accept-Language
* Content-Language
* Content-Type
  * text/plain
  * multipart/form-data
  * application/x-www-form-urlencoded
* range

#### 条件三

请求中 XMLHttpRequest 对象没有注册任何事件监听器，可以使用 XMLHttpRequest.upload 属性访问

#### 条件三

请求中没有使用 ReadableStream 对象

### 网络跨域解决方案-CORS-复杂请求

* 与简单请求对应的就是复杂请求，复杂请求会先发一个预检请求
* 需要预检的请求，必须使用 OPTIONS 方法发起一个预检请求到服务器，查看服务器是否允许发送实际请求

### 网络跨域解决方案-复杂请求-流程

![image.png](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/preflight_correct.png)

### 网络跨域解决方案-CORS-注意事项

#### 附带身份凭证的请求与通配符

在响应附带身份凭证的请求时：

- 服务器**不能**将 `Access-Control-Allow-Origin` 的值设为通配符“`*`”，而应将其设置为特定的域，如：`Access-Control-Allow-Origin: https://example.com`。
- 服务器**不能**将 `Access-Control-Allow-Headers` 的值设为通配符“`*`”，而应将其设置为标头名称的列表，如：`Access-Control-Allow-Headers: X-PINGOTHER, Content-Type`
- 服务器**不能**将 `Access-Control-Allow-Methods` 的值设为通配符“`*`”，而应将其设置为特定请求方法名称的列表，如：`Access-Control-Allow-Methods: POST, GET`

对于附带身份凭证的请求（通常是 `Cookie`），

这是因为请求的标头中携带了 `Cookie` 信息，如果 `Access-Control-Allow-Origin` 的值为“`*`”，请求将会失败。而将 `Access-Control-Allow-Origin` 的值设置为 `https://example.com`，则请求将成功执行。

另外，响应标头中也携带了 `Set-Cookie` 字段，尝试对 Cookie 进行修改。如果操作失败，将会抛出异常。

### 网络跨域解决方案-CORS-服务端配置

```javascript
let whitList = ['http://127.0.0.1:5500'] //设置白名单

//设置跨域访问
app.use(function (req: any, res: any, next: any) {
  const origin = req.headers.origin as string
  if (whitList.includes(origin)) {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*')
    // 允许携带凭证
    res.header('Access-Control-Allow-Credentials', 'true')
    // 允许的header类型
    res.header('Access-Control-Allow-Headers', [
      'X-PINGOTHER',
      'content-type',
      'Origin',
      'Accept',
    ])
    // 允许浏览器获取的请求头
    res.header('Access-Control-Expose-Headers', 'test')
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    // 预检结果保存时间 1小时
    res.header('Access-Control-Max-Age', `${5}`)
    if (req.method.toLowerCase() == 'options') {
      res.send(204) // 让options尝试请求快速结束
      return
    }
  }
  next()
})
```

### 网络跨域解决方案-CORS-服务端配置(中间件)

```javascript
const cors = require('cors')
let whitList = ['http://127.0.0.1:5500'] //设置白名单

var corsOptions = {
  origin: function (origin, callback) {
    if (whitList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  maxAge: 20,
  allowedHeaders: ['X-PINGOTHER', 'content-type', 'Origin', 'Accept'],
}

app.use(cors(corsOptions))
```

### 网络跨域解决方案-CORS-什么情况需要使用

* XMLHttpRequest 或者 Fetch APIs 发起的跨源 HTTP 请求
* Web 字体（CSS中 通过 @font-face 使用跨源字体资源，）字体网站设置跨站调用
* WebGL 贴图
* 使用 drawImage 将 image/video 画面绘制成 canvas
* 来自图像的 CSS 图形

### 网络跨域解决方案-正向代理

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceec01a40e0c43038a2d812d03f1e703~tplv-k3u1fbpfcp-watermark.image?)

### 网络跨域解决方案-常见正向代理

* cli工具：webpack 配置 devServer proxy
* charles, fidler 等代理软件，本质就是拦截请求代理

### 网络跨域解决方案-反向代理

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df84c9747e134f68a4e868190a6a1664~tplv-k3u1fbpfcp-watermark.image?)

### 网络跨域解决方案-Websocket

* 简单来说就是：客户端和服务端之间存在持续的链接，而且双方都可以随时开始发送数据

#### 服务端

```javascript
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 18000 })

server.on('open', function open() {
  console.log('connected')
})

server.on('close', function close() {
  console.log('disconnected')
})

server.on('connection', function connection(ws, req) {
  // 发送欢迎信息给客户端
  ws.send('服务器欢迎你链接')

  ws.on('message', function incoming(message) {
    // 广播消息给所有客户端
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send('服务器收到客户端消息 -> ' + message)
      }
    })
  })
})
```

#### 客户端

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>聊天室</title>
  </head>

  <style>
    .txt {
      font-size: 30px;
    }
    .inputBtn {
      font-size: 40px;
    }
  </style>
  <body>
    <form onsubmit="return false;">
      <h1>慕课聊天室：</h1>
      <textarea
        id="repText"
        class="txt"
        style="width: 800px; height: 600px"
      ></textarea>
      <br />
      <input
        class="inputBtn"
        type="text"
        id="myInput"
        name="message"
        style="width: 300px"
        value="Hello world"
      />
      <input
        class="inputBtn"
        type="button"
        id="mySend"
        value="发送消息"
        onclick="send(this.form.message.value)"
      />
    </form>

    <script type="text/javascript">
      let socket
      const repTextEl = document.getElementById('repText')
      if (window.WebSocket) {
        socket = new WebSocket('ws://127.0.0.1:18000')
        socket.onmessage = function (event) {
          repTextEl.value = repTextEl.value + '\n' + event.data
        }
        socket.onopen = function (event) {
          repTextEl.value = 'webSocket已链接'
        }
        socket.onclose = function (event) {
          repTextEl.value = repTextEl.value + '连接被关闭'
        }
      } else {
        console.log('浏览器不支持webSocket')
      }

      function send(message) {
        if (!window.WebSocket) {
          return
        }
        if (socket.readyState == WebSocket.OPEN) {
          socket.send(message)
        } else {
          console.log('webSocket还没有开启')
        }
      }
    </script>
  </body>
</html>
```

### 网络跨域解决方案-总结

* JSONP 只支持 GET 请求，存在安全风险
* CORS 支持所有类型 hTTP 请求，是跨域 HTTP 请求的根本解决方案
* 正向代理和 nginx反向代理，主要是通过 同源策略对服务器不加限制
* Websocker 需要替换协议
* CORS 和 nginx 反向代理（**推荐使用**）

### Access-Control-Allow-Origin 异常“背锅”

以下原因都可能导致异常：

* 服务器突然重启
* 服务器宕机
* 服务器报错
