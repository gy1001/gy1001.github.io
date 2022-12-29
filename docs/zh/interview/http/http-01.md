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
## 3. Restful API
* 一种新的 API 设计方法（早已推广使用）
* 传统的 API 设计：把每个 URL 当做一个功能
* Restful API 设计：把每个 URL 当做一个唯一的资源
### 3.1 如何设计成一个资源呢？
#### 3.1.1 尽量不用 url 参数
* 传统的API 设计：/api/list?pageIndex=2
* Restfule API 设计：/api/list/2
#### 3.1.2 用 method 表示操作类型
**1. 传统 API 设计**
* post 请求 /api/create-blog
* post 请求 /api/update-log?id=100
* get 请求  /api/get-blog?id=100

**2. Restful API 设计**
* post 请求 /api/blog
* patch 请求 /api/blog/100
* get 请求 /api/blog/100

## 4. http headers
### 4.1 常见的 Request Headers
* Accept 浏览器可接收的数据格式
* Accept-Encoding 浏览器可接收的压缩算法，如 gzip
* Accept-Languange 浏览器可接收的语言，如 zh-CN
* Connection: keep-alive 一次 TCP 链接重复使用
* cookie
* Host
* User-Agent: 简称UA，浏览器信息
* Content-type: 发送数据的格式，如 application/json

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/274cbe0e2a6841008eb26fa8caaf0f41~tplv-k3u1fbpfcp-watermark.image?)
### 4.2 常见的 Response Headers
* Content-type 返回数据的格式，如 application/json
* Content-length 返回数据的大小，多少字节
* Content-Encoding 返回数据的压缩算法，如 gzip
* Set-Cookie

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ba6082f7427427f814199e4ef3ee04d~tplv-k3u1fbpfcp-watermark.image?)
### 4.3 自定义 header
```javascript
// http://axios-js.com/docs/#Request-Config
// headers are custom headers to be sent
heades: { 'X-Requested-With': 'XMLHttpRequest' }
```
### 4.4 缓存相关的 headers
* Cache-Control Expires
* Last-Modified If-Modified-Since
* Etag If-None-Match
## 5. http 缓存
### 5.1 关于缓存的介绍
#### 5.1.1 什么是缓存
* 缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件
#### 5.1.2 为什么需要缓存
* 缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件
* 降低服务器的压力，提升网站性能。
* 加快客户端加载网页的速度， 提升用户体验。
#### 5.1.3 哪些资源是可以被缓存？
* 静态资源（js,css,img）
### 5.2 强制缓存
![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81MjQyMTI1LTA2YWMyNTFlMTUwOTk5NDkucG5n?x-oss-process=image/format,png)
#### 5.2.1  Cache-Control
* 在 `Response Headers` 中，服务端来进行控制
* 控制强制缓存的逻辑
* 例如 Cache-Control: max-age=31536000 (单位是秒)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/679b625e20c7448296d6f58011d96976~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/686977128949457e8775d57bdcbba03c~tplv-k3u1fbpfcp-watermark.image?)
#### 5.2.2 cache-control 的值
* max-age: 设置缓存的最大过期时间
* no-cache: 不用本地缓存，向服务端请求，交给服务端来处理
* no-store: 不让服务端做缓存，完全不缓存
* private: 发起请求的浏览器才能使用返回数据的缓存
* public: 这个 HTTP 请求它返回的内容所经过的任何路径中，包括中间的一些 HTTP 代理服务器以及发出请求的客户端浏览器，都可以进行对返回内容的缓存操作

[Cache-Control字段值详解](https://juejin.cn/post/6844903751493369870)

[图文讲解 Cache-Control 浅显易懂](https://zhuanlan.zhihu.com/p/79042406)
#### 5.2.3 关于 Expires
* 同在 Respinse Headers 中
* 同为控制缓存过期
* 已被 Cache-Control 代替
### 5.3 协商缓存（对比缓存）
![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d9460548b8248a0aad44849eb494156~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 服务端缓存策略
* 服务端来达判断客户端资源，是否和服务端资源一样
* 判断一致则返回 304，否则返回 200 和最新的资源

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae7feab903074999947f862ce9083bfb~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/190da8bab7b54585bbe1bac5722e18f4~tplv-k3u1fbpfcp-watermark.image?)
#### 5.3.1 资源标识
* 在 `Response Headers` 中，有两种
* `Last-Modofied` 资源的最后修改时间
* `Etag` 资源的唯一标识（一个字符串，类似人类的指纹）
* `Last-Modified` 是 HTTP 1.0 的字段，而 `Etag` 是 HTTP 1.1 的字段

#### 5.3.2 http 1.0: last-modified
![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/250bdae9421f4a238f8300e8042a7ce7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
#### 5.3.3 http 1.1: Etag
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/099ff22bbcb141a5b48301a319c516a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
#### 5.3.4 `Last-Modified` 和 `Etag` 共存时
* 会优先使用 Etag
* Last-Modified 只能精确到秒级
* 如果资源被重复生成，但是内容不变，则 `Etag` 更精确

### 5.4 http 缓存流程图

<img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81MjQyMTI1LWQ1YTUxYTI0ZjlkNjlkMGQucG5n?x-oss-process=image/format,png" alt=" http缓存流程" style="zoom:67%;" />

### 5.5 刷新操作方式，对缓存的影响

| 操作方式 | 场景                                                      | 强制缓存 | 协商缓存 |
| -------- | --------------------------------------------------------- | -------- | -------- |
| 正常操作 | 地址栏输入 url, 跳转链接，前进后退等                      | 有效     | 有效     |
| 手动刷新 | F5，点击刷新按钮，右击菜单刷新                            | 失效     | 有效     |
| 强制刷新 | shift + F5                                           | 失效     | 失效     |

### http 缓存-相关阅读

[http 面试必会的：强制缓存和协商缓存:评论有用](https://juejin.cn/post/6844903838768431118)

[http 缓存详解:多图](https://blog.csdn.net/express_yourself/article/details/107230954)

[浏览器的强缓存和协商缓存](https://segmentfault.com/a/1190000021661656)

[强烈推荐：一文彻底搞懂 http 缓存，图文解说+实战应用](https://juejin.cn/post/7051552782486077471)


## 题目
### 1. http 常见的状态码有哪些？
[点击跳转 状态码](#_1-状态码)
### 2. http 常见的 header有哪些
[点击跳转 http headers](#_3-http-headers)
### 3. 什么是 Restful API
[首先说出 Http Methods](#_2-http-methods)

[然后说出 Restful API](#_3-restful-api)
### 4. 描述一下 http 的缓存机制(重要)
[点击跳转 http 缓存](#_5-http-缓存)