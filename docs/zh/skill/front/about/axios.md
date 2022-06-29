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
    }),
    // `decompress` 指示是否应该对响应体进行自动解压。如果设置为 `true` 也将删除掉所有来自被解压的响应对象的'content-encoding'请求头
    // 仅限Node.js（XHR 无法关闭自动解压）
    decompress: true // 默认值
}
```

### 2.7 响应结构

```javascript
{
  // data 由服务器提供的响应
  data: {},
  // status 来自服务器响应的 http 状态码
  status: 200,
  // statusText 来自服务器响应的 http 状态信息
  statusText: "OK",
  // `headers` 是服务器 HTTP 响应的响应头
  // 所有的 header 名都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},
  // config 是为请求提供的配置信息
  config: {},
  // `request` 是生成此响应的请求
  // 在 node.js 中它是最后一个 ClientRequest 实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

使用 then 时候，你将接收到下面这样的响应

```javascript
axios.get('/user/12345').then(function (response) {
  console.log(response.data)
  console.log(response.status)
  console.log(response.statusText)
  console.log(response.headers)
  console.log(response.config)
})
```

在使用 catch 时，或者传递 rejection callback 作为 then 第二个参数时，响应可以通过 error 对象可被使用，正如在[处理错误](https://www.kancloud.cn/yunye/axios/234845#handling-errors)这节所讲

```javascript
axios.get('/user/12345').catch(function (error) {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
})
```

也可以使用 validateStatus 配置选项定义一个自定义 http 状态码的错误范围

```javascript
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500 // 状态码在大于或等于500时才会 reject
  },
})
```

### 2.8 配置默认项

> 你可以指定将被用在各个请求的配置默认值

#### 2.8.1 全局的 axios 默认值

```javascript
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
```

#### 2.8.2 自定义实例默认值

```javascript
// set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://api.example.com',
})
// alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

#### 2.8.3 配置的优先顺序

配置会以一个优先顺序进行合并，这个顺序是在 `lib/defaults.js` 找到的库的默认值，然后是实例的 `defaults` 属性，最后是请求的`config` 参数，后者将优先于前者，这里是一个例子

```javascript
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 0
const instance = axios.create()

// 覆写库的超时默认值，
// 现在 在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000,
})
```

### 2.9 拦截器

> 在请求或者响应被 then 或者 catch 处理前拦截它们

```javascript
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
```

如果你想在稍后移除拦截器，可以这样

```javascript
const myInterceptor = axios.interceptors.request.use(function () {})
axios.interceptors.request.eject(myInterceptor)
```

也可以为自定义 axios 实例添加拦截器

```javascript
const instance = axios.create()
instance.interceptors.request.use(function () {})
```

### 2.10 错误处理

```javascript
axios.get('/user/12345').catch(function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
})
```

也可以使用 validateStatus 配置选型定义一个自定义 http 状态码的错误范围

```javascript
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500 // Reject only if the status code is greater than or equal to 500
  },
})
```

### 2.11 取消

> 使用 _cancel token_ 取消请求

可以使用 `CancelToken.source` 工厂方法创建 cancel token，像这样：

```javascript
//注意： 此 API 从 v0.22.0 开始已被弃用，不应在新项目中使用。
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/user/12345', {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request Canceled', thrown.message)
    } else {
      // 处理错误
    }
  })
axios.post(
  '/user/12345',
  {
    name: 'new name',
  },
  {
    cancelToken: source.token,
  }
)
// 取消请求, message 参数是可选的
source.cencel('Operation canceled by the user')
```

还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：

```javascript
const CancelToken = axios.CancelToken
let cancel

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c
  }),
})
// cancel the request
cancel()
```

**注意： 可以使用同一个 canel token 取消多个请求**，如果在发送 Axios 请求时已经取消了cancel token，则该请求会立即取消，而不会尝试发出任何实际请求。

### 2.12 请求编码体

默认情况下，axios 将 JavaScript 对象序列化为 `JSON` 格式 。 如果要换成`application/x-www-form-urlencoded`格式发送数据，可以使用以下选项之一。

#### 2.12.1 浏览器

在浏览器中，可以使用 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API， 如下所示

```javascript
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> 注意：不是所有的浏览器都支持(参见[can i use](http://www.caniuse.com/#feat=urlsearchparams))  都支持 `URLSearchParams` ， 但是可以使用 polyfill (确保 polyfill 在全局环境生效)

或者可以使用 qs 库编码数据

```javascript
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或者用另一种方式 (ES6)

```javascript
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

#### 2.12.2  Node.js

##### 2.12.2.1 Query String

在node.js 中，可以使用`querystring` 模块，如下所示

```javascript
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

或者 从 url 模块 中 使用`URLSearchParams`, 如下所示

```javascript
const url = require('url');
const params = new url.URLSearchParams({ foo: 'bar' });
axios.post('http://something.com/', params.toString());
```

也可以使用 `qs`库

##### 2.12.2.2  Form Data

在`node.js`可以使用`form-data`库，如下所示

```javascript
const FormData = require('form-data');
 
const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form, { headers: form.getHeaders() })
```

或者使用一个拦截器

```javascript
axios.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});
```

### 2.13  Promises

Axios 依赖于原生的 ES6 Promise 实现支持，如果你的环境不支持ES6 promise, 可以使用 polyfill 来兼容

### 2.14 TypeScript

axios 包含了 TypeScript 类型定义和 axios errors 的类型守卫

```java
let user: User = null;
try {
  const { data } = await axios.get('/user?ID=12345');
  user = data.userDetails;
} catch (error) {
  if (axios.isAxiosError(error)) {
    handleAxiosError(error);
  } else {
    handleUnexpectedError(error);
  }
}
```

### 3. 参考文献

[Axios源码解析（零）：文档翻译](https://linjingyi.cn/posts/27da006f.html)
