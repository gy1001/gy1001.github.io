# Axios

## 1. Axios 的基础知识

### 1.1 什么是 Axios

> Axios 是一个前端流行的网络请求库，它是一个基于 promise 的 HTTP 库，可以在 浏览器 和 node.js 中使用

### 1.2 特性

- 从浏览器中创建 [XMLHttpReqeusts](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
- 从 nodejs 中创建 [http](https://nodejs.org/api/http.html) 请求
- 支持 [promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

### 1.3 安装方式

#### 1.3.1 使用 npm

```shell
npm install axios
```

#### 1.3.2 使用 brower

```shell
brower install axios
```

#### 1.3.3 使用 CDN

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 2. Axios 的 基本使用

### 2.1 案例

#### 2.1.1 执行 GET 请求

```javascript
// 为给定 ID 的 user 创建请求
axios
  .get('/user?ID=12345')
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })

// 上面的请求也可以这样做
axios
  .get('/user', { params: { ID: 12345 } })
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
```

#### 2.1.2 执行 POST 请求

```javascript
axios
  .post('/user', { firstName: 'Fred', lastName: 'Flintstone' })
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
```

#### 2.1.3 执行多个并发请求

```javascript
function getUserAccount() {
  return axios.get('/user/12345')
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions')
}

axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  })
)
```

#### 2.1.4 Axios API

可以通过向 `axios` 传递相关配置来创建请求

##### 2.1.4.1 axios(config)

```javascript
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone',
  },
})

// 获取远端图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream',
}).then(function (response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
```

##### 2.1.4.2 axios(url[, config])

```javascript
// 发送 GET 请求（默认的方法）
axios('/user/12345')
```

### 2.2 请求方法的别名

1. axios.request(config)
2. axios.get(url[, config])
3. axios.delete(url[, config])
4. axios.head(url[, config])
5. axios.options(url[, config])
6. axios.post(url[, data[, config]])
7. put(url[, data[, config]])
8. axios.patch(url[, data[, config]])

注意：在使用别名时候，url、method、data 这些属性都不必在配置中指定

### 2.3 并发

处理并发请求的助手函数

1. axios.all(iterable)

2. axios.spread(callback)

```javascript
axios.all([
 axios.get('https://api.github.com/users/abc');
 axios.get('https://api.github.com/users/abc/repos')
])
.then(axios.spread(function (userResponse, reposResponse) {
  console.log('User', userResponse.data);
  console.log('Repositories', reposResponse.data);
}));
```

### 2.4 创建实例

> 可以使用自定义配置新建一个 axios 实例: axios.create([config])

```javascript
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})
```

### 2.5 实例方法

> 以下是可用的实例方法。指定的配置将与实例的配置合并。

#### axios#request(config)

#### axios#get(url[, config])

#### axios#delete(url[, config])

#### axios#head(url[, config])

#### axios#options(url[, config])

#### axios#post(url[, data[, config]])

#### axios#put(url[, data[, config]])

#### axios#patch(url[, data[, config]])

### 2.6 请求配置

> 这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

```javascript
{
   	// url是用于请求的服务器 URL
   	url: "/user",
   	// method 是创建请求时候使用的方法
   	method: "get", // default
    // baseURL 将自动
    baseURL: 'http://some-dimain.com/api',
    // transformRequest 允许在向服务器发送前，修改请求数据，只能用在 put post patch 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或者 ArrayBuffer 或者 Stream
    transformRequest: [function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    }],
    // transformResponse 在传递给 then/catch 之前允许修改响应数据
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      return data;
    }],
    // headers: 是即将发送的自定义请求头
    headers:{
      'X-Requested-With': 'XMLHttpRequest'
    },
    // params 是即将与请求一起发送的 URL 参数
    params: {
      ID: 12345
    },
    // paramsSerializer 是一个负责 params 序列化的函数
  	// 示例：https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/
    paramsSerializer: function(params){
      return Qs.stringfy(params, { arrayFormat: "brackets" })
    },
    // data 是作为请求主体被发送的数据
    // 只适用于这些请求方法： PUT、POST、PATCH
    // 在没有设置 transformRequest 时候，必须是以下类型之一
    // string、plain object、ArrayBuffer、ArrayBufferView、URLSearchParams
    // 浏览器专属：FormData File Bolb
    // Node 专属： Stream
   	data: {
      firstName: 'Fred'
    },
    // timeout 指定请求超时的毫秒数（0表示无超时时间）
    // 如果请求超过了 timeout 的时间，请求将被中断
    timeout: 10000,
    // withCredentials 表示跨域请求时是否需要使用凭证
    withCredentials:false, // default
    // adapter 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api))
		adapter: function(config){

    },
    // auth 表示应该提供 http 基础验证，并提供凭证
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    auth: {
      username: 'janedoe',
    	password: 's00pers3cret'
    },
    // responseType: 表示服务器相应的数据类型，可以是 arraybuffer、blob、document、json、text、stream
    responseType: 'json',
    responseEncoding: 'utf8', // default
    // xsrfCookieName 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
		// `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
    // onUploadProgress: 允许为上传处理进度事件
    onUploadProgress： function(progressEvent){
      // Do whatever you want with the native progress event
    },
    // onDownloadProgress: 允许为下载处理进度事件
    onDownloadProgress: function(progressEvent){
      // 对原生进度事件的处理
    },
    // maxContentLength 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
    // validateStatus: 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function(status){
      return status >= 200 && status < 300; // default
    },
    // maxRedirects: 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5, // default
    // `socketPath` defines a UNIX Socket to be used in node.js.
    // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
    // Only either `socketPath` or `proxy` can be specified.
    // If both are specified, `socketPath` is used.
    socketPath: null, // default
		// `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  	// `keepAlive` 默认没有启用
  	httpAgent: new http.Agent({ keepAlive: true }),
  	httpsAgent: new https.Agent({ keepAlive: true }),
    // 'proxy' 定义代理服务器的主机名称和端口
    // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
    // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
    proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    },
    // `cancelToken` 指定用于取消请求的 cancel token
    // （查看后面的 Cancellation 这节了解更多）
    cancelToken: new CancelToken(function (cancel) {
    })
}
```
