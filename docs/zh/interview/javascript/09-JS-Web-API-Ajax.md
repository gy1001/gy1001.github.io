# JS-Web-API-Ajax

知识点

## 1. XMLHttpRequset

```javascript
// get 请求
const xhr = new XMLHttpRequest()
xhr.open("GET","/api", true) // 第三个参数 true代表异步
xhr.onreadystatechange = function () {
  // 这里的函数异步执行，可参考之前的 JS 基础中的异步模块
  if(Number(xhr.readyState) === 4){
    if(Number(xhr.status) === 200){
      console.log(xhr.responseText)
    }
  }
}
xhr.send(null)
```
```javascript
// post 请求
const xhr = new XMLHttpRequest()
xhr.open("POST","/login", true) // 第三个参数 true代表异步
xhr.onreadystatechange = function () {
  // 这里的函数异步执行，可参考之前的 JS 基础中的异步模块
  if(Number(xhr.readyState) === 4){
    if(Number(xhr.status) === 200){
      console.log(xhr.responseText)
    }
  }
}
const postData = {
  userName: 'zhangsan',
  password: 'xxx'
}
xhr.send(JSON.stringify(postData))
```

**注意** 

当您使用 async=false 时，请不要编写 onreadystatechange 函数 - 把代码放到 send() 语句后面即可：代表同步
```javascript
xmlhttp.open("GET","/try/ajax/ajax_info.txt",false);
xmlhttp.send();
document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
```

## 2. 状态码
### 2.1 xhr.readyState
* 0-(未初始化)，还没有调用 send() 方法
* 1-(载入)已经调用 send() 方法，正在发送请求
* 2-(载入完成)send 方法正在执行，已经接收到全部响应内容
* 3-(交互)正在解析响应内容
* 4-(完成)响应内容解析完成，可以在客户端调用

### 2.2 xhr.status
* 2xx-表示成功处理请求，如200
* 3xx-需要重定向，浏览器直接跳转，如 301 302 304
* 4xx-客户端请求错误，如 404 403
* 5xx-服务端报错

## 3. 跨域：同源策略，跨域解决方案
### 3.1 什么是跨域（同源策略）
* ajax 请求时，浏览器要求当前网页和 server 必须同源(安全策略)
* 同源：协议、域名、端口，三者必须一致
* 前端：http://a.com:8080/ server: https://b.com/api/xxx
### 3.2 加载图片 css js 可以无视同源策略
* img src=跨域的图片地址
* link href=跨域的css地址
* script src=跨域的js地址
* img 可用于统计大打点，可用于第三方统计服务
* link、script 可以使用 CDN, CDN一般都是外域
* script 可以实现 JSONP
### 3.3 跨域
* 所有的跨域，都必须经过 server 端允许和配合
* 未经 server 端允许就实现跨域，说明浏览器有漏洞，危险信号

### 3.2 JSONP
* 访问 https://imooc.com 服务器一定返回一个 html 文件吗？
* 服务器可以任意动态拼接数据返回，只要返回 html 格式要求
* 同理于 `script scr='http://imooc.com/getData.js'`
* script 可以绕过跨域限制
* 服务端可以任意动态拼接数据返回
* 所以，script 就可以获得跨域的数据，只要服务端愿意返回
```html
<script>
window.func = function(data){
  // 这里是我们跨域得到的信息
  console.log(data)
}
</script>
// script 也可以通过脚本去动态创建
<script src="http://localhost:8082/jsonp.js?name=xxx&callback=func"></script>
<!-- 将返回 callback({x:100, y:200}) -->
```
```javascript
// jsonp.js
func({
  name: '孙悟空'
})
```
**使用 jQuery 实现 JSONP**
```javascript
$.ajax({
  url: 'http://localhost:8082/jsonp.js',
  dataType:'jsonp',
  jsonpCallback: "func",
  success: function (data){
    console.log(data)
  }
})
```

### 3.3 CORS(服务端支持)
```javascript
// 第二个参数填写允许跨域的域名城，不建议直接写 *
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011")
response.setHeader("Access-Control-Allow-Headers", "x-Requested-With")
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
// 接收跨域的 cookie
response.setHeader("Access-Control-Allow-Credentials", true)
```

## 题目
### 1. 手写一个简易的 ajax
```javascript
function ajax(url, successFn){
  const xhr = new XMLHttpRequest()
  xhr.open("GET", url, true) // 第三个参数 true代表异步
  xhr.onreadystatechange = function () {
    // 这里的函数异步执行，可参考之前的 JS 基础中的异步模块
    if(Number(xhr.readyState) === 4){
      if(Number(xhr.status) === 200){
        successFn(xhr.responseText)
      }
    }
  }
  xhr.send(null)
}
```

**带 promise 的 ajax**
```javascript
function ajaxPromise () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else if (xhr.status === 404) {
          reject(new Error('404 Not Found'))
        }
      }
    }
    xhr.send(null)
  })
}
const url = '/getUseInfo'
ajaxPromise(url)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.err(err)
  })
```

### 2. 跨域的常用实现方式
- JSONP
- CORS

## 3. 实际项目中 ajax 的常用插件
### 3.1 jQuery
```javascript
// 请求的完整示例
var param={
 "rtspaddr":document.getElementById("rtsp").value
}
$.ajax({
  type:"post",
  url:"/ConvertRtsp",
  contentType: "application/json;charset=UTF-8",//请求的媒体类型
  data:JSON.stringify(param),//很重要，但是不知道为啥一定要强行转一下
  dataType:"json",//返回对象
  success: function(res){
    if(res.Code==0){
      console.log(res.FlvAddr)
    }
  },
  error: function(e) {
    console.log("失败"+e);
  } 
});
```
### 3.2 Fetch
[MDN:使用 Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
```javascript

fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

```

**请注意**

fetch 规范与 jQuery.ajax() 主要有以下的不同：

* 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。
* fetch 不会发送跨域 cookie，除非你使用了 credentials 的初始化选项。（自 2018 年 8 月以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改）

### 3.3 Axios

[Axios 文档](https://www.axios-http.cn/docs/intro)

```javascript
// 发起一个post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// 这样也可以
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```