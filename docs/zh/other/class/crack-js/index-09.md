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

| 名字   | 说明                                                         | 示例                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Accept | 请求头用来告知（服务器）客户端可以处理的内容类型，这种内容类型用[MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)来表示。 | text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8 |
| A      |                                                              |                                                              |

