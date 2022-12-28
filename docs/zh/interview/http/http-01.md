# Http 相关面试
* 前端工程师开发界面
* 需要调用后端的接口，提交/获取 数据 ---- http协议
* 要求事先掌握好 Ajax

## 1. 状态码
### 1.1 状态码分类
* 1xx： 服务器收到请求
* 2xx: 请求成功，如 200
* 3xx：重定向，如 302
* 4xx: 客户端错误，如 404
* 5xx: 服务端错误，如 500

### 1.2 常见状态码
* 200 成功
* 301 永久重定向（配合 response header 中的 location，浏览器自动处理）
* 302 临时重定向（配合 response header 中的 location, 浏览器自动处理）
* 304 资源未被修改（重要）
* 404 资源未找到
* 403 没有权限
* 500 服务器错误
* 504 网关超时

### 1.3 关于协议和规范
* 就是一个约定
* 要求大家都跟着执行
* 不要违反规范，例如：IE 浏览器

## 2. Http Methods
### 2.1 传统的 methods
* get 获取服务器的数据
* post 向服务器提交数据
* 简单的网页功能，就这两个操作
### 2.2 现在的 methods
* get 获取数据
* post 新建数据
* patch/put 更新数据
* delete 删除数据
### 2.3 Restful API
* 一种新的 API 设计方法（早已推广使用）
* 传统的 API 设计：把每个 URL 当做一个功能
* Restful API 设计：把每个 URL 当做一个唯一的资源
### 2.4 如何设计成一个资源呢？
#### 2.4.1 尽量不用 url 参数
* 传统的API 设计：/api/list?pageIndex=2
* Restfule API 设计：/api/list/2
#### 2.4.2 用 method 表示操作类型
**1. 传统 API 设计**
* post 请求 /api/create-blog
* post 请求 /api/update-log?id=100
* get 请求  /api/get-blog?id=100

**2. Restful API 设计**
* post 请求 /api/blog
* patch 请求 /api/blog/100
* get 请求 /api/blog/100

## 3. http headers
### 3.1 常见的 Request Headers
* Accept 浏览器可接收的数据格式
* Accept-Encoding 浏览器可接收的压缩算法，如 gzip
* Accept-Languange 浏览器可接收的语言，如 zh-CN
* Connection: keep-alive 一次 TCP 链接重复使用
* cookie
* Host
* User-Agent: 简称UA，浏览器信息
* Content-type: 发送数据的格式，如 application/json

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/274cbe0e2a6841008eb26fa8caaf0f41~tplv-k3u1fbpfcp-watermark.image?)
### 3.2 常见的 Response Headers
* Content-type 返回数据的格式，如 application/json
* Content-length 返回数据的大小，多少字节
* Content-Encoding 返回数据的压缩算法，如 gzip
* Set-Cookie

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ba6082f7427427f814199e4ef3ee04d~tplv-k3u1fbpfcp-watermark.image?)
### 3.3 自定义 header
```javascript
// http://axios-js.com/docs/#Request-Config
// headers are custom headers to be sent
heades: { 'X-Requested-With': 'XMLHttpRequest' }
```
### 3.4 缓存相关的 headers
* Cache-Control Expires
* Last-Modified If-Modified-Since
* Etag If-None-Match
## 4. http 缓存
### 4.1 关于缓存的介绍
#### 4.1.1 什么是缓存
* 缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件
#### 4.1.2 为什么需要缓存
* 缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件
* 降低服务器的压力，提升网站性能。
* 加快客户端加载网页的速度， 提升用户体验。
#### 4.1.3 哪些资源是可以被缓存？
* 静态资源（js,css,img）
## 题目
### 1. http 常见的状态码有哪些？

### 2. http 常见的 header有哪些

### 3. 什么是 Restful API

### 4. 描述一下 http 的缓存机制(重要)
