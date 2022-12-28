# JS-Web-API-存储

## 知识点
### 1. cookie
* 本身用于浏览器和 server 通讯
* 被“借用”到本地存储来
* 可用 document.cookie=xxxx 来修改

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb5ce55f165f41f1bacaad050891c7c8~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9acc174e32304012a369bcad79a0b140~tplv-k3u1fbpfcp-watermark.image?)

#### 1.1 cookie 的缺点
* 存储大小，最大 4kb
* http 请求时会发送到服务端，增加请求数据量
* 只能用 document.cookie=xxx 来修改，太过简陋

### 2. localStorage 和 sessionStorage
* HTML5 专门为存储而设计的，最大可存 5M
* API 简单易用，使用 setItem getItem
* 不会随着 http 请求被发送出去
####  2.1 区别
* localStorage 数据会永久存储，除非代码或者手动删除
* sessionStorage 数据这会存在于当前会话，浏览器关闭则清空
* 一般用 localStorage 会更多一些

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbb2175f94234aa8830eea8ec0345abd~tplv-k3u1fbpfcp-watermark.image?)

```javascript
localStorage.setItem("a" ,100)
localStorage.getItem("a")

sessionStorage.setItem("b", 200)
sessionStorage.getItem("b")
```
## 题目
### 1. 描述 cookie localStorage sessionStorage 区别
* 容量
* API 易用性
* 是否跟随 HTTP 发送到服务器端