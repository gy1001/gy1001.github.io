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

## 03：文件上传 & 后悔药：网络请求的取消

### 网络请求的取消--服务端代码

```typescript
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import createError from 'http-errors'
// const multiparty = require('multiparty');

const port = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
const server = http.createServer(app)

//设置跨域访问
app.use(function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  //"*"
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  //允许携带cookie
  res.header('Access-Control-Allow-Credentials', 'true')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', [
    'X-PINGOTHER',
    'content-type',
    'Origin',
    'X-Requested-With',
  ])
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')

  res.header('Access-Control-Max-Age', `${20}`)
  if (req.method.toLowerCase() == 'options') res.send(200)
  //让options尝试请求快速结束
  else next()
})

app.post('/xhr', async (_req, _res) => {
  console.log('xhr: 收到请求')
  await sleep(10 * 1000)
  _res.json({
    code: 10000,
  })
})

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

app.get('/fetch', async (_req, res) => {
  console.log('fetch:收到请求', _req.url)
  await sleep(10 * 1000)
  return res.json({
    code: 10000,
  })
})

app.get('/test2', (_req, res) => {
  res.send('world')
})

app.get('/test4', async (_req, res) => {
  console.log('收到请求=test4=', _req.url)
  await sleep(30000)
  return res.json({
    REV: true,
    DATA: {
      msg: '成功',
    },
  })
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

process.on(
  'unhandledRejection',
  (reason: {} | null | undefined, p: Promise<any>) => {
    console.error('自定义错误 Unhandled Rejection at:', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
  },
)
```

### 网络请求的取消-XMLHttpRequest

* XMLHttpRequest.abort()

  ```javascript
  const xhrObj = new XMLHttpRequest();
  xhrObj.open("post", "http://127.0.0.1:3000/xhr", true);
  xhrObj.send();
  
  // 取消请求
  xhrObj.abort();
  ```

#### 代码示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>取消请求</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>测试ajax 界面</div>
    <button id="btnSend">发送请求</button>
    <button id="btnCancel">取消请求</button>
    <script>
      var xhrObj;
      function sendRequest() {
        xhrObj = new XMLHttpRequest();
        xhrObj.withCredentials = true;
        xhrObj.onreadystatechange = function () {
          console.log("onreadystatechange: status=", xhrObj.status, xhrObj.readyState, xhrObj );
          if (xhrObj.readyState == 4 && xhrObj.status == 200) {
            console.log(xhrObj.responseText);
          }
        };
        xhrObj.open("post", "http://127.0.0.1:3000/xhr", true);
        // xhrObj.setRequestHeader("headera","b");
        xhrObj.send();
      }

      btnSend.onclick = function () {
        sendRequest();
      };

      btnCancel.onclick = function(){
        xhrObj && xhrObj.abort();
      }
    </script>
  </body>
</html>
```

###  网络请求的取消-fetch

* AbortController 对象的 abort()

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
  <style>
    * {
      font-size: 28px;
    }
  </style>
  <body>
    <div>测试fetch 界面</div>
    <button id="btnSend">发送请求</button>
    <button id="btnCancel">取消请求</button>
    <script>
      const controller = new AbortController()
      const signal = controller.signal

      function sendFetch(test) {
        fetch('http://127.0.0.1:3000/fetch', { signal })
          .then((response) => {
            return response.text()
          })
          .then((text) => {
            console.log(text)
          })
      }

      btnSend.onclick = function () {
        sendFetch()
      }

      btnCancel.onclick = function () {
        console.log('取消请求')
        controller.abort()
      }
    </script>
  </body>
</html>
```

### 网络请求的取消-Axios

* AbortController 对象的 abort()

  ```javascript
  const controller = new AbortController()
  
  axios
    .get('/foo/bar', {
      signal: controller.signal,
    })
    .then(function (response) {
      //...
    })
  // cancel the request
  controller.abort()
  ```

* CancelToken（此 API 从 `v0.22.0` 开始已被弃用，不应在新项目中使用。）

### 文件上传思路

1. input 标签选择上传文件/拖拽方式获取文件/复制到粘贴板获取文件
2. File Api 获取文件信息
3. XMLHttpRequest 上传/Fetch 上传
4. 上传数据：FormData/Blob等，服务器端：formData 使用 multipart/form-data

### File 为特殊的 Blob 对象

> MDN：[https://developer.mozilla.org/zh-CN/docs/Web/API/File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)

文件（**`File`**）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

通常情况下， `File` 对象是来自用户在一个 [`input`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素上选择文件后返回的 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象，也可以是来自由拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer) 对象，或者来自 [`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement) 上的 `mozGetAsFile`() API。在 Gecko 中，特权代码可以创建代表任何本地文件的 File 对象，而无需用户交互（有关详细信息，请参阅[注意事项](https://developer.mozilla.org/zh-CN/docs/Web/API/File#注意事项)。

**`File` 对象是特殊类型的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)**，且可以用在任意的 Blob 类型的 context 中。比如说， [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader), [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static), [`createImageBitmap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap), 及 [`XMLHttpRequest.send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#send()) 都能处理 `Blob` 和 `File`。

### 上传单个文件-客户端

```html
<input id="uploadFile" type="file" accept="image/*" />
```

* type 属性 file, 用户选择文件
* accept 属性，规定选择文件的类型
  * 文件扩展名：例如：".jpg .png .doc"
  * 一个有效的 MIME 类型。但是没有扩展名(text/html, video/mp4等)
  * audio/* 表示音频文件
  * video/* 表示视频文件
  * image/* 表示图片文件

#### 客户端-代码示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>上传单个文件</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <input id="uploadFile" type="file" accept="image/*" />

    <button type="button" id="uploadBtn" onClick="startUpload()">
      开始上传
    </button>
    <div class="progress">上传进度：<span id="progressValue">0</span></div>

    <div id="uploadResult" class="result"></div>

    <script>
      const uploadFileEle = document.getElementById('uploadFile')
      const progressValueEle = document.getElementById('progressValue')
      const uploadResultEle = document.getElementById('uploadResult')

      try {
        function startUpload() {
          if (!uploadFileEle.files.length) return
          //获取文件
          const file = uploadFileEle.files[0]
          //创建上传数据
          const formData = new FormData()
          formData.append('file', file)
          //上传文件
          this.upload(formData)
        }

        function upload(data) {
          const xhr = new XMLHttpRequest()
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const result = JSON.parse(xhr.responseText)
              console.log('result:', result)
              uploadResultEle.innerText = xhr.responseText
            }
          }

          xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
              progressValueEle.innerText = Math.ceil((event.loaded * 100) / event.total) + '%'
            }
          }

          xhr.open('POST', 'http://127.0.0.1:3000/upload', true)
          xhr.send(data)
        }
      } catch (e) {
        console.log('error==', e)
      }
    </script>
  </body>
</html>
```

### 上传单个文件-服务端

* 客户端使用 from-data 传递，服务器端以相同方式接收
* multer 库用来处理 multipart/form-data
* 服务端接收文件
  1. 设置文件存储目录
  2. 是否更改文件名称
  3. 上传成功，通知客户端可访问的 url
  4. url的产生，需要我们启动静态日志服务（上传文件保存地址）

#### 服务端-代码示例

```typescript
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import path = require('path')
import createError from 'http-errors'
const multer = require('multer')

const port = 3000
const app = express()

// 上传成功后返回URL地址
const resourceUrl = `http://127.0.0.1:${port}/`

// 存储文件目录
const uploadDIr = path.join(__dirname, '/upload')
// destination 设置资源保存路径，filename 设置资源名称
const storage = multer.diskStorage({
  destination: async function (_req, _file, cb) {
    cb(null, uploadDIr)
  },
  filename: function (_req, file, cb) {
    // 设置文件名
    cb(null, `${file.originalname}`)
  },
})

const multerUpload = multer({ storage })

//设置静态访问目录
app.use(express.static(uploadDIr))

app.use(bodyParser.urlencoded({ extended: true }))
const server = http.createServer(app)

//设置跨域访问
app.use(function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  //"*"
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  //允许携带cookie
  res.header('Access-Control-Allow-Credentials', 'true')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', ['content-type', 'Origin'])
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')

  res.header('Access-Control-Max-Age', `${20}`)
  if (req.method.toLowerCase() == 'options') res.send(200)
  //让options尝试请求快速结束
  else next()
})

app.post('/upload', multerUpload.any(), function (req, res, _next) {
  // req.file 是 `avatar` 文件的信息
  let urls = []
  //获取所有已上传的文件
  const files = (req as any).files

  if (files && files.length > 0) {
    //遍历生成url 集合返回给客户端
    urls = files.map((item, _key) => {
      return resourceUrl + item.originalname
    })
  }

  return res.json({
    REV: true,
    DATA: {
      url: urls,
    },
    MSG: '成功',
  })
})

server.listen(port, () => {
  console.log('监听端口:', port)
})

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

process.on('unhandledRejection', (reason: {} | null | undefined, p: Promise<any>) => {
   	console.error('自定义错误 Unhandled Rejection at:', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
  },
)
```

### 多文件上传

* input 属性：multiple 是否允许多个值（相关类型 email,file)

#### 代码示例-客户端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>上传多个文件</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <input id="uploadFile" type="file" accept="image/*" multiple />
    <button id="uploadBtn" onClick="startUpload()">开始上传</button>
    <div class="progress">上传进度：<span id="progressValue">0</span></div>

    <div id="uploadResult" class="result"></div>

    <script>
      const uploadFileEle = document.getElementById('uploadFile')
      const progressValueEle = document.getElementById('progressValue')
      const uploadResultEle = document.getElementById('uploadResult')

      try {
        function startUpload() {
          if (!uploadFileEle.files.length) return
          // 获取文件
          const files = uploadFileEle.files
          const formData = this.getUploadData(files)
          this.upload(formData)
        }

        // 添加多个文件
        function getUploadData(files) {
          const formData = new FormData()
          for (let i = 0; i < files.length; i++) {
            const file = files[i]
            formData.append(file.name, file)
          }
          return formData
        }

        function upload(data) {
          const xhr = new XMLHttpRequest()
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const result = JSON.parse(xhr.responseText)
              console.log('result:', result)
              uploadResultEle.innerText = xhr.responseText
            }
          }

          xhr.upload.addEventListener(
            'progress',
            function (event) {
              if (event.lengthComputable) {
                progressValueEle.innerText =
                  Math.ceil((event.loaded * 100) / event.total) + '%'
              }
            },
            false,
          )

          xhr.open('POST', 'http://127.0.0.1:3000/upload', true)
          xhr.send(data)
        }
      } catch (e) {
        console.log('error==', e)
      }
    </script>
  </body>
</html>
```

### 大文件上传-客户端

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fcd758d3430411d88c3da8a81769918~tplv-k3u1fbpfcp-watermark.image?)

### 大文件上传-客户端-切片

```javascript
/**
 * 文件分片
 * @param {*} file 文件
 * @param {*} chunkSize 分片大小
 * @returns
 */
const handleFileChunk = function (file, chunkSize) {
  const fileChunkList = []
  // 索引值
  let curIndex = 0
  while (curIndex < file.size) {
    //最后一个切片以实际结束大小为准。
    const endIndex = curIndex + chunkSize < file.size ? curIndex + chunkSize : file.size
    const curFileChunkFile = file.slice(curIndex, endIndex)
    curIndex += chunkSize
    fileChunkList.push({ file: curFileChunkFile })
  }
  return fileChunkList
}
```

### 大文件上传-客户端-大文件 hash

```javascript
/**
 *
 * 获取全部文件内容hash
 * @param {any} fileList
 */
async function getFileHash(fileList) {
  console.time('filehash')
  const spark = new SparkMD5.ArrayBuffer()
  //获取全部内容
  const result = fileList.map((item, key) => {
    return getFileContent(item.file)
  })
  try {
    const contentList = await Promise.all(result)
    for (let i = 0; i < contentList.length; i++) {
      spark.append(contentList[i])
    }
    //生成指纹
    const res = spark.end()
    console.timeEnd('filehash')
    return res
  } catch (e) {
    console.log(e)
  }
}
```

```javascript
/**
 *
 * 获取文件内容
 * @param {any} file
 * @returns
 */
function getFileContent(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    //读取文件内容
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = (e) => {
      //返回读取到的文件内容
      resolve(e.target.result)
    }
    fileReader.onerror = (e) => {
      reject(fileReader.error)
      fileReader.abort()
    }
  })
}
```

### 大文件上传-客户端-生成切片信息

```javascript
//给每个切片添加辅助内容信息
const chunksInfo = fileList.map(({ file }, index) => ({
  //整个文件hash
  fileHash: containerHash,
  //当前是第几个切片
  index,
  //文件个数
  fileCount: fileList.length,
  //当前切片的hash
  hash: containerHash + '-' + index,
  //切片内容
  chunk: file,
  //文件总体大小
  totalSize: bigFile.size,
  //单个文件大小
  size: file.size,
}))
```

### 大文件上传-客户端-封装单个请求

```javascript
/**
 *
 * 单个文件上传
 * @param {any} {
 *     url,
 *     method="post",
 *     data,
 *     headers={},
 * }
 * @returns
 */
function singleRequest({ url, method = 'post', data, headers = {} }) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach((key) =>
      xhr.setRequestHeader(key, headers[key]),
    )
    xhr.send(data)
    xhr.onload = (e) => {
      resolve({
        data: e.target.response,
      })
    }
  })
}
```

### 大文件上传-客户端-上传所有切片

```javascript
/**
 *
 * 上传所有的分片
 * @param {any} chunks
 * @param {any} fileName
 */
async function uploadChunks(chunks, fileName) {
  const requestList = chunks
    .map(({ chunk, hash, fileHash, index, fileCount, size, totalSize }) => {
      //生成每个切片上传的信息
      const formData = new FormData()
      formData.append('hash', hash)
      formData.append('index', index)
      formData.append('fileCount', fileCount)
      formData.append('size', size)
      formData.append('splitSize', DefaultChunkSize)
      formData.append('fileName', fileName)
      formData.append('fileHash', fileHash)
      formData.append('chunk', chunk)
      formData.append('totalSize', totalSize)
      return { formData, index }
    })
    .map(async ({ formData, index }) =>
      singleRequest({
        url: 'http://127.0.0.1:3000/uploadBigFile',
        data: formData,
      }),
    )
  //全部上传
  await Promise.all(requestList)
}
```

### 大文件上传-服务端

### 大文件上传-服务端-检查文件 hash

```javascript
const chunkDir = path.resolve(uploadDIr, fileHash)
// 大文件存在直接返回,根据内容hash存储，可以实现后续秒传
if (fse.existsSync(filePath)) {
  return res.json({
    code: 1000,
    data: { url: `${resourceUrl}${saveFileName}` },
    msg: '上传文件已存在',
  })
}
```

### 大文件上传-服务端-保存切片

```javascript
const fse = require('fs-extra')

// 切片目录不存在，创建切片目录
if (!fse.existsSync(chunkDir)) {
  await fse.mkdirs(chunkDir)
}

const chunkFile = path.resolve(chunkDir, hash)
if (!fse.existsSync(chunkFile)) {
  await fse.move(chunk.path, path.resolve(chunkDir, hash))
}
```

### 大文件上传-服务端-检车切片是否可以合并

```javascript
/**
 *
 * 检查切片是否可以合并
 * @export
 * @param {any} pathName 切片存储目录
 * @param {any} totalCount 大文件包含切片个数
 * @param {any} hash 大文件hash
 * @returns
 */
export function checkFileIsMerge(pathName, totalCount, hash) {
  var dirs = []
  //同步读取切片存储目录
  const readDir = fse.readdirSync(pathName)
  //判断目录下切片数量 小于 总切片数，不能合并
  if (readDir && readDir.length < totalCount)
    return false
    //获取目录下所有真正属于该文件的切片，以大文件hash为准
  ;(function iterator(i) {
    if (i == readDir.length) {
      return
    }
    const curFile = fse.statSync(path.join(pathName, readDir[i]))
    //提出目录和文件名不包含大文件hash的文件
    if (curFile.isFile() && readDir[i].includes(hash + '')) {
      dirs.push(readDir[i])
    }
    iterator(i + 1)
  })(0)
  //数量一直，可以合并
  if (dirs.length === totalCount) {
    return true
  }
  return false
}
```

### 大文件上传-服务端-合并所有切片

```javascript
/**
 *
 * 合并所有切片
 * @export
 * @param {any} {
 *     filePath:文件路径包含后缀名
 *     fileHash:文件hash
 *     chunkDir:切片存放的临时目录
 *     splitSize:每个切片的大小
 *     fileCount:文件总个数
 *     totalSize:文件总大小
 * }
 * @returns
 */
export async function chunkMerge({
  filePath,
  fileHash,
  chunkDir,
  splitSize,
  fileCount,
  totalSize,
}) {
  const chunkPaths = await fse.readdir(chunkDir)
  //筛选合适的切片
  const filterPath = chunkPaths.filter((item) => {
    return item.includes(fileHash)
  })
  //数量不对，抛出错误
  if (filterPath.length !== fileCount) {
    console.log('合并错误')
    return
  }
  // 根据切片下标进行排序,方便合并
  filterPath.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      //并发写入，需要知道开始和结束位置
      let end = (index + 1) * splitSize
      if (index === fileCount - 1) {
        end = totalSize + 1
      }
      return pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * splitSize,
          end: end,
        }),
      )
    }),
  )
  //删除所有切片
  // fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
  return filePath
}
```

### 完整项目参见目录

[大文件上传前后端示例代码](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/09.%20%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%B4%A2%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/9.4%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E5%92%8C%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82%E7%9A%84%E5%8F%96%E6%B6%88/4.%20%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0/client/index.html)

### 大文件上传的思考

* 大文件如何实现断点续传？
* 大文件上传进度如何实现？
* 内容 hash 的速度如何提升？

## 04：资源加载知多少

### 页面加载的流程

> 页面卸载(如果有的话) => DNS解析 => TCP链接 => HTTP请求 => 服务器响应 => 浏览器解析

### 渲染流程

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9f98f8edd8840faac17ea2a4db87f10~tplv-k3u1fbpfcp-watermark.image?)

### 页面加载的时间

* 开发者工具可以查看页面的加载时间

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9af5e29e62524c588fe2f1a1418817d8~tplv-k3u1fbpfcp-watermark.image?)

#### Navigation Timing Api

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Navigation_timing](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Navigation_timing)

* 提供了可用于衡量一个网络性能的数据

* JS 的对象模型：PerformanceTiming 等

  > 可以在控制台中输入 performance.timing 查看结果

* 页面加载所需要的总时长：loadEventEnd - navigationStart

* 请求返回时长：responseEnd - requestStart

* DNS解析时间：domainLookupEnd - domainLookupStart

![img](https://wukongdoc.tingyun.com/browser/image/1f8ef4d83266f862ee9a6c252922a686.png)

### 资源加载的时间-Resource Timing API

* 获取和分析应用资源加载的详细网络计时数据，比如 XMLHttpRequest，SVG,图片，或者脚本

* JS 对象模型为 `PerformanceResourceTiming`

* 在控制台中输入：`performance.getEntries("source")` 即可发现如下结果

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a5b8d3f184f452b9af49c024204f476~tplv-k3u1fbpfcp-watermark.image?)

### 获取全部的加载性能数据

> performance.getEntries()

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16338708d5d4fc183c375c60ee7178b~tplv-k3u1fbpfcp-watermark.image?)

### 用代码统计页面和资源加载性能

```javascript
function getPerformanceEntries() {
  var p = performance.getEntries();
  for (var i = 0; i < p.length; i++) {
    console.log(p[i]);
    printPerformanceEntry(p[i]);
  }
}
function printPerformanceEntry(perfEntry) {
  var properties = ["name", "entryType", "startTime", "duration"];
  if (perfEntry.entryType === "navigation") {
    result.innerHTML += `
    <div>资源:${perfEntry.name}</div>
    <div>加载时间:${perfEntry.responseEnd - perfEntry.startTime}</div><hr>
  `;
  } else if (perfEntry.entryType == "resource") {
    result.innerHTML += `
    <div>资源:${perfEntry.name}</div>
    <div>加载时间:${perfEntry.duration}</div>
    <hr>
  `;
  }
}

getPerformanceEntries();
```

### 资源加载优先级

* html, css, font, 同步的 XMLHttpRequest 这三种类型的资源优先级最高
* 在可视区的图片，script 标签，异步 XMLHttpRequest 和 fetch 等，优先级次之
* 图片，音视频，优先级再次之
* prefetch 预读取的资源，优先级再次之

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e1de33f9a464bfd83ad289d77cf1c15~tplv-k3u1fbpfcp-watermark.image?)

### 资源加载优先级注意事项

* css 在 head 里面和在 body 里面的优先级不一样
* 可视区的图片优先级高于 js, 但是 js 会优先加载
* 可推迟加载资源：图片、视频等

### 自定义优先级

* link, image, iframe, script 标签均有一个属性 importance. 现在是实验性的功能

  > `importance` 实验性，指示资源的相对重要性。优先级提示使用以下值委托：
  >
  > **`auto`**: 表示**没有偏好**。浏览器可以使用其自己的启发式方法来确定资源的优先级。
  >
  > **`high`**: 向浏览器指示资源具有高优先级。
  >
  > **`low`**: 向浏览器指示资源的优先级较低。
  >
  > **备注：** 只有存在 rel=“preload”或 rel=“prefetch”时，importance 属性才能用于<link>元素。

#### 示例代码

[资源加载优先级示例代码](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/09.%20%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%B4%A2%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/9.5%20%E5%A6%82%E4%BD%95%E6%9B%B4%E9%AB%98%E6%95%88%E7%9A%84%E5%8A%A0%E8%BD%BD%E7%BD%91%E7%BB%9C%E8%B5%84%E6%BA%90/2.%20%E8%B5%84%E6%BA%90%E5%8A%A0%E8%BD%BD%E4%BC%98%E5%85%88%E7%BA%A7/index.html)

### CSS 不阻塞DOM的解析，阻塞页面渲染

* 当 CSS 没有回来之前，我们的页面没有渲染出任何东西

* 请求其实差不多同一时间发出来了，说明其了解了 DOM 后来的内容

  (如下图，CSS 和 其他的 js 几乎是同一时间进行了请求)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8159f59ada8b49cd8db26b2fa59f0d53~tplv-k3u1fbpfcp-watermark.image?)

### JS 的执行 阻塞 DOM 解析

### pre系列

#### preload、prefetch、prerender、preconnect

* preload: 表示用户十分有可能需要再当前浏览器中加载目标资源，所以浏览器必须预先获取和缓存对应资源
* prefetch: 是为了提示浏览器，用户未来的浏览有可能需要加载目标资源，所以浏览器有可能通过事先获取和缓存对应资源，优化用户体验。主要用于预取将在下一次导航/页面加载中使用的资源
* prerender: 内容被预先取出，然后在后台被浏览器渲染，就好像内容已经被渲染到一个不可见的单独的标签页。
* preconnect: 预先建立连接（TCP）

#### dns-prefetch

* dns-prefetch: 是尝试在请求资源之前解析域名
* 仅对跨域域上的 DNS 查找有效，因此请避免用它来指向您的站点
* dns-prefetch 与 preconnect（预链接）一起使用，效果更佳。一个解析 DNS ，一个预先建立 TCP 链接

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com/">
```

#### pre 示例一览

```html
// 预加载，优先级高
<link rel="preload" href="./assets/index.js?t=1" as="script">
// 资源预加载，优先级低
<link rel="prefetch" href="//xxxx.com/a,css">
// DNS预解析
<link rel="dns-prefetch" href="//xxx.com">
// 预链接，建立 TCP 链接
<link rel="preconnect" href="//www.cdn.com">
// 预渲染，预先加载链接文档的链接
<link rel="prerender" href="./ifr.html" />
```

### 图片的加载

加快加载的方式

* 压缩图片
* 选择合适的图片格式，优先 jpg 和 webp 格式
* 使用 CDN
* 使用 dns-prefetch
* 图片多的话，放不同的域名，提高并发数
* 大图 png 交错，jpg 渐进式提高视觉体验（另一种叫做 基准式，数据将按照存储时的顺序从上到下一行一行的被显示出来）
* 懒加载，intersecionObserver 进入可视区后再去加载图片
* 。。。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #imgContainers {
        border: 1px solid #333;
        height: 400px;
        width: 500px;
        overflow: auto;
      }

      #imgContainers img {
        border: 1px solid #666;
        width: 400px;
        height: 400px;
        display: block;
      }
    </style>
  </head>

  <body>
    <div id="imgContainers">
      <img data-src="./images/dragon.png?t=1" />
      <img data-src="./images/dragon.png?t=2" />
      <img data-src="./images/dragon.png?t=3" />
      <img data-src="./images/dragon.png?t=4" />
      <img data-src="./images/dragon.png?t=5" />
      <img data-src="./images/dragon.png?t=6" />
      <img data-src="./images/dragon.png?t=7" />
      <img data-src="./images/dragon.png?t=8" />
    </div>

    <script>
      window.onload = function () {
        var imagesCol = imgContainers.querySelectorAll('img[data-src]')

        var options = {
          threshold: 0,
          rootMargin: '0px',
          root: null,
        }

        var ioCallBack = function (entries, obs) {
          console.log('entries:', entries)
          entries.forEach((entry) => {
            console.log('entry:', entry)
            if (entry.isIntersecting) {
              // 可见
              entry.target.src = entry.target.dataset.src
              obs.unobserve(entry.target) // 停止观察
            }
          })
        }
        const observer = new IntersectionObserver(ioCallBack, options)

        imagesCol.forEach(function (item) {
          console.log('observer', item.dataset.src)
          observer.observe(item)
        })
      }
    </script>
  </body>
</html>
```

