# axios 源码解析

## 1、执行过程

### axios 网络请求流程图

![img](https://s2.51cto.com/oss/202111/19/dcfed2c454bb95031e4c371da973ea6d.jpg)

### 从主入口分析

1. 下载 github 上 axios 库源码，打开`package.json`文件可以看到

   ```javascript
   { "main": "index.js" }
   ```

2. 打开`index.js`文件，可以看到如下

   ```javascript
   module.exports = require('./lib/axios')
   ```

3. 继续打开`./libe/axios.js`文件，就可以看到实际上我们常调用的 `axios`的源码

   ```javascript
   // 创建实例函数，参数为配置对象
   function createInstance(defaultConfig) {
     // 实际上这个上下文来自于Axios函数，传递的参数也是配置队形，下小节讲解
     const context = new Axios(defaultConfig)

     // 这里使用一个bind工具函数，类似于函数的bind方法，这行代码之后，函数就有了 request 方法
     const instance = bind(Axios.prototype.request, context)

     // 扩展 Axios.prototype 上的方法到 实例instance 身上
     // 这里扩展了诸如：delete、get、head、options、post、put、patch、getUri 等方法
     utils.extend(instance, Axios.prototype, context, { allOwnKeys: true })

     // 扩展 Context 上面的 方法到实例 instance 身上
     // 这里扩展了诸如：defaluts 属性、interceptors 属性
     utils.extend(instance, context, { allOwnKeys: true })

     // 创建实例的工厂函数
     instance.create = function create(instanceConfig) {
       return createInstance(mergeConfig(defaultConfig, instanceConfig))
     }
     // 返回实例
     return instance
   }
   // 创建一个默认到处的实例
   var axios = createInstance(defaults)
   // 暴露一个 Axios属性类来允许类的继承
   axios.Axios = Axios
   // 暴露一些取消相关的函数属性
   axios.CanceledError = require('./cancel/CanceledError')
   axios.CancelToken = require('./cancel/CancelToken')
   axios.isCancel = require('./cancel/isCancel')
   axios.VERSION = require('./env/data').version
   axios.toFormData = require('./helpers/toFormData')
   // 暴露一个 AxiosError 类属性
   axios.AxiosError = require('../lib/core/AxiosError')
   // CanceledError的别名，以实现向后兼容性
   axios.Cancel = axios.CanceledError
   // 暴露 all、spread 方法
   axios.all = function all(promises) {
     return Promise.all(promises)
   }
   axios.spread = require('./helpers/spread')
   // 暴露 isAxiosError 属性
   axios.isAxiosError = require('./helpers/isAxiosError')
   // 暴露 formToJSON 方法
   axios.formToJSON = function (thing) {
     return formDataToJSON(
       utils.isHTMLForm(thing) ? new FormData(thing) : thing
     )
   }
   // 导出 axios 属性
   module.exports = axios
   // 允许在 TypeScript 中使用默认导入语法
   module.exports.default = axios
   ```

4. `./helpers/bind.js` 函数

   ```javascript
   export default function bind(fn, thisArg) {
     return function wrap() {
       return fn.apply(thisArg, arguments)
     }
   }
   ```

5. ` utils.extend` 、 `utils.forEach`函数

   ```javascript
   // 可以看到循环 b(可能是对象、数组等)
   function extend(a, b, thisArg) {
     forEach(b, function assignValue(val, key) {
       // 如果 thisArg 存在并且 val 是一个函数，就使用 bind 赋值
       if (thisArg && typeof val === 'function') {
         a[key] = bind(val, thisArg)
       } else {
         a[key] = val
       }
     })
     return a
   }
   // forEach 函数，循环一个变量，并使用相应的函数函数
   function forEach(obj, fn) {
     // 如果没有提供值，就不需要再处理了，直接返回即可
     if (obj === null || typeof obj === 'undefined') {
       return
     }
     // 如果它不是一个可迭代对象，则强制使用数组
     if (typeof obj !== 'object') {
       obj = [obj]
     }
     // 如果是一个数组，源码参见下面的函数处理
     if (isArray(obj)) {
       // 这里使用 for循环，迭代一个数组值
       for (var i = 0, l = obj.length; i < l; i++) {
         fn.call(null, obj[i], i, obj)
       }
     } else {
       // 使用 for...in, 迭代对象键
       for (var key in obj) {
         if (Object.prototype.hasOwnProperty.call(obj, key)) {
           fn.call(null, obj[key], key, obj)
         }
       }
     }
   }
   // 判断一个值是不是一个数组
   function isArray(val) {
     return Array.isArray(val)
   }
   ```

6. `axios.all`、`axios.spread`（spread: 展开、打开、伸开） 函数

   ```javascript
   axios.all = function all(promises) {
     return Promise.all(promises)
   }
   axios.spread = require('./helpers/spread')

   // ./helpers/spread.js
   // 用于调用函数和扩展参数数组的语法糖。
   //  常见的用法是`Function.prototype.apply

   // function f(x, y, z) {}
   // var args = [1, 2, 3];
   // f.apply(null, args);

   //  使用 `spread` 来重写上例
   // spread(function(x, y, z) {})([1, 2, 3]);
   module.exports = function spread(callback) {
     return function wrap(arr) {
       return callback.apply(null, arr)
     }
   }
   ```

   使用示例：

   ```javascript
   function getA() {
     return axios.get('http://localhost:3000/comments')
   }
   function getB() {
     return axios.get('http://localhost:3000/posts')
   }
   // 不使用 spread 时
   axios.all([getA(), getB()]).then((res) => {
     console.log(res[0].data, res[1].data)
   })
   // 使用 spread 时
   axios.all([getA(), getB()]).then(
     axios.spread(function (resA, resB) {
       console.log(resA.data)
       console.log(resB.data)
     })
   )
   ```

   > 本质含义
   >
   > Promise.all 的 then 方法里面是个函数，函数的参数是所有请求的响应组成的数组；
   >
   > 而 axios.all 的 then 方法里面调用了 axios.spread 方法，axios.spread 方法接收一个函数作为参数，该参数函数的参数也是所有请求的响应，既然上文说了 axios.all 方法与 Promise.all 方法是一模一样的，那么我们只需想办法再让两个 then 方法相同即可。
   >
   > 也就是说我们创建一个 axios.spread 方法并且让 axios.spread((acct, perms) => {})的返回值与([acct,perms]) => {}等价即可。

   一步步理解

   ```javascript
   Promise.all([1, 2, 3]).then(function all(res) {})(
     // 这里的 all 函数可以理解为 一个普通函数，然后调用时候参数是 res（在promise.all中就是一个数组）,类似这样
     function (res) {}
   )(resArr)

   // 初步实现 spread, 只返回一个空函数时
   module.exports = function spread() {
     return function wrap(arr) {
       console.log(arr)
     }
   }
   Promise.all([1, 2, 3]).then(spread()) // 1,2,3
   // 进一步实现 spread, 把数组参数使用变为普通字符串并调用, 并返回调用后的计算值
   module.exports = function spread(callback) {
     return function wrap(arr) {
       return callback.apply(null, arr)
     }
   }
   ```

## 2、Axios 函数

### 内部结构详解

1. 内容源码结构

   ```javascript
   // Axios 构造函数，有 defaluts 属性 和 拦截器 interceptors
   function Axios(instanceConfig) {
     this.defaults = instanceConfig
     this.interceptors = {
       request: new InterceptorManager(),
       response: new InterceptorManager(),
     }
   }
   Axioe.prototype.request = function request() {
     // .... 请求 处理链
   }

   // 获取完整的请求地址(加参数的)
   Axios.prototype.getUri = function getUri(config) {}
   // 遍历 delete、get、head、options，并赋于 Axios 原型上
   utils.forEach(
     ['delete', 'get', 'head', 'options'],
     function forEachMethodNoData(method) {
       Axios.prototype[method] = function (url, config) {
         return this.request(
           mergeConfig(config || {}, {
             method: method,
             url: url,
             data: (config || {}).data,
           })
         )
       }
     }
   )
   // 遍历 post、put、patch ,并赋值于 Axios原型上
   utils.forEach(
     ['post', 'put', 'patch'],
     function forEachMethodWithData(method) {
       function generateHTTPMethod(isForm) {
         return function httpMethod(url, data, config) {
           return this.request(
             mergeConfig(config || {}, {
               method: method,
               headers: isForm
                 ? {
                     'Content-Type': 'multipart/form-data',
                   }
                 : {},
               url: url,
               data: data,
             })
           )
         }
       }
       Axios.prototype[method] = generateHTTPMethod()
       Axios.prototype[method + 'Form'] = generateHTTPMethod(true)
     }
   )
   ```

2. 解析：

   - 第 1 节中 axios 调用的其实就是这里的 Axios 的函数特性， 它拥有属性：defaults、interceptors, 已经方法 get、delete、patch、head、options、post、put、request、getUri 等
   - 这里还涉及到一些使用的工具函数：拦截器 InterceptorManager 函数、mergeConfig 参数合并参数、buildFullPath、buildURL、utils.forEach 循环函数等

   - 具体查看可以看到，get、post、delete、patch 等一系列请求方法调用的其实还是 request 方法

3. 在具体看 `Axios.prototype.request` 方法之前，可以简单先看一下重构前的 promise 链 经典代码

   ```javascript
   Axios.prototype.request = function request(config) {
     ...

   	// 创建存储链式调用的数组 首位是核心调用方法 dispatchRequest，第二位是空
     var chain = [dispatchRequest, undefined];
     // 创建 promise 为什么resolve(config）
     // 因为 请求拦截器最先执行 所以 设置请求拦截器时可以拿到每次请求的所有config配置
     var promise = Promise.resolve(config);
     // 把设置的请求拦截器的成功处理函数、失败处理函数放到数组最前面
     this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
       // 注意这里对于请求拦截器用到的 unshift 方法，所以多个请求拦截器的执行顺序需要注意
       chain.unshift(interceptor.fulfilled, interceptor.rejected);
     });
     // 把设置的响应拦截器的成功处理函数、失败处理函数放到数组最后面
     this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
       chain.push(interceptor.fulfilled, interceptor.rejected);
     });
     // 循环 每次取两个出来组成promise链.then执行
     while (chain.length) {
       promise = promise.then(chain.shift(), chain.shift());
     }
     // 返回promise
     return promise;
   }
   ```

4. 具体分析重新写的 `Axios.prototype.request` 这个函数

   > 改动的原因：如果请求拦截器中存在一些长时间的任务，会使得使用 axios 的网络请相较于不使用 axios 的网络请求会延后，为此，通过为拦截管理器增加 synchronous 和 runWhen 字段，来实现同步执行请求方法。
   >
   > 具体查看这个 [PR：Pull Request](https://github.com/axios/axios/issues/2609)

   ```javascript
   Axios.prototype.request = function request(config) {
     /********start: 这里进行 配置 相关的处理****************/
     if (typeof configOrUrl === 'string') {
       config = config || {}
       config.url = configOrUrl
     } else {
       config = configOrUrl || {}
     }
     // 配置合并默认配置
     config = mergeConfig(this.defaults, config)
     // 转化请求的方法 转化为小写
     if (config.method) {
       config.method = config.method.toLowerCase()
     } else if (this.defaults.method) {
       config.method = this.defaults.method.toLowerCase()
     } else {
       // 如果都没有，默认是 get 方法
       config.method = 'get'
     }
     var transitional = config.transitional
     if (transitional !== undefined) {
       validator.assertOptions(
         transitional,
         {
           silentJSONParsing: validators.transitional(validators.boolean),
           forcedJSONParsing: validators.transitional(validators.boolean),
           clarifyTimeoutError: validators.transitional(validators.boolean),
         },
         false
       )
     }
     /*********end***************/

     /********start: 这里进行请求拦截器、请求、响应拦截器的合并遍历 (责任链模式) ****************/
     // 请求拦截器储存数组
     var requestInterceptorChain = []
     // 默认所有请求拦截器都为同步
     var synchronousRequestInterceptors = true
     // 遍历 请求拦截器，拦截器每次 use 就会往 对应拦截器数组 中添加一个，后续会讲解
     this.interceptors.request.forEach(function unshiftRequestInterceptors(
       interceptor
     ) {
       // 这里interceptor是注册的每一个拦截器对象 axios 请求拦截器向外暴露了runWhen配置来针对一些需要运行时检测来执行的拦截器
       // 如果配置了该函数，并且返回结果为true，则记录到拦截器链中，反之则直接结束该层循环
       if (
         typeof interceptor.runWhen === 'function' &&
         interceptor.runWhen(config) === false
       ) {
         return
       }
       // interceptor.synchronous 是对外提供的配置，可标识该拦截器是异步还是同步 默认为false(异步)
       // 这里是来同步整个执行链的执行方式的，如果有一个请求拦截器为异步 那么下面的promise执行链则会有不同的执行方式
       synchronousRequestInterceptors =
         synchronousRequestInterceptors && interceptor.synchronous
       // 塞到请求拦截器数组中，注意这里用的 unshift
       requestInterceptorChain.unshift(
         interceptor.fulfilled,
         interceptor.rejected
       )
     })
     // 响应拦截器存储数组
     var responseInterceptorChain = []
     // 遍历按序push到拦截器存储数组中
     this.interceptors.response.forEach(function pushResponseInterceptors(
       interceptor
     ) {
       responseInterceptorChain.push(
         interceptor.fulfilled,
         interceptor.rejected
       )
     })
     var promise
     // 如果为异步 其实也是默认情况
     if (!synchronousRequestInterceptors) {
       // 定义请求队列
       var chain = [dispatchRequest, undefined]
       // 添加请求拦截队列、响应拦截器队列
       Array.prototype.unshift.apply(chain, requestInterceptorChain)
       chain = chain.concat(responseInterceptorChain)
       promise = Promise.resolve(config)
       while (chain.length) {
         // 开始遍历 请求队列
         promise = promise.then(chain.shift(), chain.shift())
       }
       // 返回结果
       return promise
     }
     // 这里则是同步的逻辑
     var newConfig = config
     // 请求拦截器一个一个的走 返回 请求前最新的config
     while (requestInterceptorChain.length) {
       var onFulfilled = requestInterceptorChain.shift()
       var onRejected = requestInterceptorChain.shift()
       try {
         // 最新的config
         newConfig = onFulfilled(newConfig)
       } catch (error) {
         // 做异常捕获 有错直接抛出
         onRejected(error)
         break
       }
     }
     // 到这里 微任务不会过早的创建
     // 也就解决了 微任务过早创建、当前宏任务过长或某个请求拦截器中有异步任务而阻塞真正的请求延时发起问题
     try {
       promise = dispatchRequest(newConfig)
     } catch (error) {
       return Promise.reject(error)
     }
     // 响应拦截器执行
     while (responseInterceptorChain.length) {
       promise = promise.then(
         responseInterceptorChain.shift(),
         responseInterceptorChain.shift()
       )
     }
     return promise
     /*********end***************/
   }
   ```

5. 拦截器增加两个配置参数：`synchronous`、`runWhen`

   ```javascript
   InterceptorManager.prototype.use = function use(
     fulfilled,
     rejected,
     options
   ) {
     this.handlers.push({
       fulfilled: fulfilled,
       rejected: rejected,
       // 默认情况下它们被假定为异步的
       // 如果您的请求拦截器是同步的，可以通过这个参数默认配置，它将告诉 axios 同步运行代码并避免请求执行中的任何延迟。
       synchronous: options ? options.synchronous : false,
       // 如果要基于运行时检查执行特定拦截器，可以通过这个runWhen这个参数，类型为函数
       runWhen: options ? options.runWhen : null,
     })
     return this.handlers.length - 1
   }
   ```

### 拦截器注意点

1. 只有当所有拦截器都是同步执行时，拦截器才会同步执行，否则都会异步执行。

   ```javascript
   // 注意以下代码
   let synchronousRequestInterceptors = true

   this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
     ...
     // 这里一旦多个请求拦截中有一个 拦截器属性为 false ，最终结果就是 false
     synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous
   })
   // 这里做异步处理
   if (!synchronousRequestInterceptors) {
   	...
     return
   }
   // 这里做同步处理
   ....
   ```

## 3、InterceptorManager

### 源码结构

```javascript
class InterceptorManager {
  constructor() {
    // 拦截器队列
    this.handlers = []
  }
  // 添加一个拦截器，参数：成功回调、失败回调、配置参数
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    })
    return this.handlers.length - 1
  }

  // 从队列中移除一个拦截器
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  // 清空拦截器队列
  clear() {
    if (this.handlers) {
      this.handlers = []
    }
  }

  // 循环拦截器队列
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      // h 是 拦截器 对象
      if (h !== null) {
        fn(h)
      }
    })
  }
}

export default InterceptorManager
```

## 4、dispatchRequest

1.  步骤分析

- 处理请求头 config 配置
- 调用 `adapter` 适配器发起真正的请求，针对浏览器环境发起 ajax 请求，node 环境发起 http 请求
- 构造响应数据， 会自动转换 JSON 数据

2. 源码内容

   ```javascript
   export default function dispatchRequest(config) {
     // 提前取消请求
     throwIfCancellationRequested(config)
     // 合并 headers 配置， 这里的 headers 可以在 Axios基本使用 章节看到具体的逻辑，着重注意优先级
     config.headers = AxiosHeaders.from(config.headers)
     // 转换数据，这里回调用配置中的 transformRequest，处理请求之前的数据 data
     config.data = transformData.call(config, config.transformRequest)
     // 适配器 axios是可以支持node端也支持浏览器端的
     const adapter = config.adapter || defaults.adapter
     // 执行请求
     return adapter(config).then(
       function onAdapterResolution(response) {
         // 取消请求情况
         throwIfCancellationRequested(config)
         // 转换数据，具体就是调用 config 中的 transformResponse
         response.data = transformData.call(
           config,
           config.transformResponse,
           response
         )
         response.headers = AxiosHeaders.from(response.headers)
         return response
       },
       function onAdapterRejection(reason) {
         if (!isCancel(reason)) {
           // 取消请求情况
           throwIfCancellationRequested(config)
           // 转换数据
           if (reason && reason.response) {
             reason.response.data = transformData.call(
               config,
               config.transformResponse,
               reason.response
             )
             reason.response.headers = AxiosHeaders.from(
               reason.response.headers
             )
           }
         }
         return Promise.reject(reason)
       }
     )
   }

   function throwIfCancellationRequested(config) {
     if (config.cancelToken) {
       config.cancelToken.throwIfRequested()
     }

     if (config.signal && config.signal.aborted) {
       throw new CanceledError()
     }
   }
   ```

## 5、适配器 adapter

> 经典的设计模式：适配器模式应用。

1. `dispatchRequest.js` 文件

   ```javascript
   // dispatchRequest.js
   module.exports = function dispatchRequest(config) {
     ...
     // 使用配置信息中的 adapter 或者 使用默认的 adapter
     var adapter = config.adapter || defaults.adapter;
     ...
   }
   ```

2. `defaults/index.js` 文件

   ```javascript
   import adapters from '../adapters'

   function getDefaultAdapter() {
     let adapter
     // 判断XMLHttpRequest对象是否存在 存在则代表为浏览器环境
     if (typeof XMLHttpRequest !== 'undefined') {
       adapter = adapters.getAdapter('xhr')
     } else if (
       typeof process !== 'undefined' &&
       utils.kindOf(process) === 'process'
     ) {
        // node环境 使用原生http发起请求
       adapter = adapters.getAdapter('http')
     }
     return adapter
   }

   var defaults = {
   	...
     adapter: getDefaultAdapter(),
     ...
   }
   // getDefaultAdapter 函数类似如下，这是之前版本的写法
   function getDefaultAdapter() {
     var adapter;
     if (typeof XMLHttpRequest !== 'undefined') {
       // For browsers use XHR adapter
       adapter = require('../adapters/xhr');
     } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
       // For node use HTTP adapter
       adapter = require('../adapters/http');
     }
     return adapter;
   }
   ```

3. `adapters/index.js` 文件

   `xhr.js` 是对原生 ajax `XMLHttpRequest` 对象的的封装

   `http.js`是对 node 中的 `http` 模块的封装，也会对 `https` 制作相应处理

   具体封装细节

   ```javascript
   import httpAdapter from './http.js'
   import xhrAdapter from './xhr.js'

   const adapters = {
     http: httpAdapter,
     xhr: xhrAdapter,
   }
   export default {
     getAdapter: (nameOrAdapter) => {
       // nameOrAdapter 是字符串的时候
       if (utils.isString(nameOrAdapter)) {
         const adapter = adapters[nameOrAdapter]
         if (!nameOrAdapter) {
           // adapter 不存在时候
           throw Error(
             utils.hasOwnProp(nameOrAdapter)
               ? `Adapter '${nameOrAdapter}' is not available in the build`
               : `Can not resolve adapter '${nameOrAdapter}'`
           )
         }
         return adapter
       }
       // 自定义 adapter 必须是函数, 否则就报错
       if (!utils.isFunction(nameOrAdapter)) {
         throw new TypeError('adapter is not a function')
       }
       return nameOrAdapter
     },
     adapters,
   }
   ```

4. `/adapters/xhr.js ` 文件

   大概分为以下几个步骤

   - 对 requestHeader 做处理
   - 创建 xhr: new XMLHttpRequest
   - 对 xhr.open 设置请求方式
   - 如果配置了 download 或者 upload, 针对 progress 事件，处理下载或者上传进度事件
   - 提供取消请求功能，调用原生 abort 方法
   - request.send() 发送请求

   ```javascript
   export default function xhrAdapter(config) {
     return new Promise(function dispatchXhrRequest(resolve, reject) {
       let requestData = config.data
       // 对 requestHeader 做处理
       const requestHeaders = AxiosHeaders.from(config.headers).normalize()
       const responseType = config.responseType
       let onCanceled
       function done() {
         if (config.cancelToken) {
           config.cancelToken.unsubscribe(onCanceled)
         }
         if (config.signal) {
           config.signal.removeEventListener('abort', onCanceled)
         }
       }

       if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
         requestHeaders.setContentType(false) //  删掉content-type，让浏览器来设置
       }
       // 创建xhr: new XMLHttpRequest
       let request = new XMLHttpRequest()
       if (config.auth) {
         const username = config.auth.username || ''
         const password = config.auth.password || ''
         requestHeaders.set(
           'Authorization',
           'Basic ' + btoa(username + ' ' + password)
         )
       }
       const fullPath = buildFullPath(config.baseURL, config.url)
       // 对 xhr.open 设置请求方式
       request.open(
         config.method.toUpperCase(),
         buildURL(fullPath, config.params, config.paramsSerializer),
         true
       )
       // 设置毫秒级的超时时间限制
       request.timeout = config.timeout
       // 设置loadend的回调
       function onloadend() {
         if (!request) {
           return
         }
         // 响应头处理
         const responseHeaders = AxiosHeaders.from(
           'getAllResponseHeaders' in request && request.getAllResponseHeaders()
         )
         // 响应内容处理
         const responseData =
           !responseType || responseType === 'text' || responseType === 'json'
             ? request.responseText
             : request.response
         // 构造出response
         const response = {
           data: responseData,
           status: request.status,
           statusText: request.statusText,
           headers: responseHeaders,
           config,
           request,
         }
         // 调用settle方法来处理promise
         settle(
           function _resolve(value) {
             resolve(value)
             done()
           },
           function _reject(err) {
             reject(err)
             done()
           },
           response
         )
         // 清空request
         request = null
       }
       // 如果request上有onloadend属性，则直接替换
       if ('onloadend' in request) {
         request.onloadend = onloadend
       } else {
         // 否则就用onreadystatechange来模拟onloadend
         request.onreadystatechange = function handleLoad() {
           if (!request || request.readyState !== 4) {
             return
           }
           // 请求出错，我们没有得到响应，这将由 onerror 处理。
           // 但只有一个例外：请求使用 file:协议，此时即使它是一个成功的请求,大多数浏览器也将返回状态为 0，
           if (
             request.status === 0 &&
             !(
               request.responseURL && request.responseURL.indexOf('file:') === 0
             )
           ) {
             return
           }
           // readystate 处理器在 onerror 或 ontimeout处理器之前调用， 因此我们应该在next 'tick' 上调用onloadend
           setTimeout(onloadend)
         }
       }
       // 处理浏览器对request的取消(与手动取消不同)
       request.onabort = function handleAbort() {
         if (!request) {
           return
         }
         reject(
           new AxiosError(
             'Request aborted',
             AxiosError.ECONNABORTED,
             config,
             request
           )
         )
         // 清空request
         request = null
       }
       // 处理更低级别的网络错误
       request.onerror = function handleError() {
         // 真正的错误被浏览器掩盖了
         // onerror应当只可被网络错误触发
         reject(
           new AxiosError(
             'NetWork Error',
             AxiosError.ERR_NETWORK,
             config,
             request
           )
         )
         request = null
       }
       // 处理超时
       request.ontimeout = function handleTimeout() {
         let timeoutMessage = config.timeout
           ? 'timeout of ' + config.timeout + 'ms exceeded'
           : 'timeout exceeded'

         let transitional = config.transitional || transitionalDefaults
         if (config.timeoutMessage) {
           timeoutMessage = config.timeoutMessage
         }
         reject(
           new AxiosError(
             timeoutMessage,
             transitional.clarifyTimeoutError
               ? AxiosError.ETIMEDOUT
               : AxiosError.ECONNABORTED,
             config,
             request
           )
         )
         // 清空request
         request = null
       }
       // 添加 xsrf 头
       // 只能在浏览器环境中生效
       // 在工作者线程或者RN中不生效
       if (utils.isStandardBrowserEnv()) {
         const xsrfValue =
           config.withCredentials ||
           (isURLSameOrigin(fullPath) &&
             config.xsrfCookieName &&
             cookies.read())
         if (xsrfValue) {
           // 添加 xsrf 头
           requestHeaders.set(config.xsrfHeaderName, xsrfValue)
         }
       }

       requestData === undefined && requestHeaders.setContentType(null)
       if ('setRequestHeader' in request) {
         utils.forEach(
           requestHeaders.toJSON(),
           function setRequestHeader(val, key) {
             // 把header添加给request
             request.setRequestHeader(key, val)
           }
         )
       }
       // 添加withCredentials
       if (!utils.isUndefined(config.withCredentials)) {
         request.withCredentials = !!config.withCredentials
       }
       // 添加 responseType
       if (responseType && responseType !== 'json') {
         request.responseType = config.responseType
       }
       // 如果配置了 download 或者 upload, 针对 progress 事件，处理下载或者上传进度事件
       if (typeof config.onDownloadProgress === 'function') {
         request.addEventListener(
           'progress',
           progressEventReducer(config.onDownloadProgress, true)
         )
       }
       // 不是所有的浏览器都支持上传事件
       if (typeof config.onUploadProgress === 'function' && request.upload) {
         request.upload.addEventListener(
           'progress',
           progressEventReducer(config.onUploadProgress)
         )
       }
       // 提供取消请求功能，调用原生 abort 方法
       if (config.cancelToken || config.signal) {
         onCanceled = (cancel) => {
           if (!request) {
             return
           }
           reject(
             !cancel || cancel.type
               ? new CanceledError(null, config, request)
               : cancel
           )
           request.abort()
           request = null
         }
         config.cancelToken && config.cancelToken.subscribe(onCanceled)
         if (config.signal) {
           config.signal.aborted
             ? onCanceled()
             : config.signal.addEventListener('abort', onCanceled)
         }
       }

       if (
         !requestData &&
         requestData !== false &&
         requestData !== 0 &&
         requestData !== ''
       ) {
         requestData = null
       }

       const protocol = parseProtocol(fullPath)
       if (protocol && platform.protocols.indexOf(protocol) === -1) {
         reject(
           new AxiosError(
             'unSupported protocol ' + protocol + ':',
             AxiosError.ERR_BAD_REQUEST,
             config
           )
         )
         return
       }
       // request.send()  发送请求
       request.send(requestData)
     })
   }
   ```

5. `/adapters/http.js ` 文件

   大概分为以下几个步骤

   - 转换数据格式
   - 处理代理
   - 解析 `URL`
   - 创建请求
   - 添加 `error`、 `end`、`data` 等事件
   - 发送请求

   ```javascript
   var platform = require('../platform')
   // 文件内容如下
   module.exports = {
     isNode: true,
     classes: {
       URLSearchParams: require('./classes/URLSearchParams'),
       FormData: require('./classes/FormData'),
       Blob: (typeof Blob !== 'undefined' && Blob) || null,
     },
     // 主要看这里，支持的协议前缀
     protocols: ['http', 'https', 'file', 'data'],
   }

   // http.js 文件

   //设置代理用的方法
   function setProxy(options, configProxy, location) {
     let proxy = configProxy
     if (!proxy && proxy !== false) {
       const proxyUrl = getProxyForUrl(location)
       if (proxyUrl) {
         proxy = url.parse(proxyUrl)
         // replace 'host' since the proxy object is not a URL object
         proxy.host = proxy.hostname
       }
     }
     if (proxy) {
       // basic形式的Proxy-Authorization头
       if (proxy.auth) {
         // Support proxy auth object form
         if (proxy.auth.username || proxy.auth.password) {
           proxy.auth =
             (proxy.auth.username || '') + ':' + (proxy.auth.password || '')
         }
         const base64 = Buffer.from(proxy.auth, 'utf8').toString('base64')
         options.headers['Proxy-Authorization'] = 'Basic ' + base64
       }

       options.headers.host =
         options.hostname + (options.port ? ':' + options.port : '')
       options.hostname = proxy.host
       options.host = proxy.host
       options.port = proxy.port
       options.path = location
       if (proxy.protocol) {
         options.protocol = proxy.protocol
       }
     }
     // 如果使用了代理，那么重定向时必须要经过代理
     options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
       // Configure proxy for redirected request, passing the original config proxy to apply
       // the exact same logic as if the redirected request was performed by axios directly.
       setProxy(redirectOptions, configProxy, redirectOptions.href)
     }
   }

   export default function httpAdapter(config) {
     return new Promise(function dispatchHttpRequest(
       resolvePromise,
       rejectPromise
     ) {
       // 获取配置并声明一些变量
       let onCanceled
       let data = config.data
       const responseType = config.responseType
       const responseEncoding = config.responseEncoding
       const method = config.method.toUpperCase()
       let isFinished
       let isDone
       let rejected = false
       let req
       // 在AxiosRequest类实现之前的临时内部发射器
       // temporary internal emitter until the AxiosRequest class will be implemented
       const emitter = new EventEmitter()

       function onFinished() {
         if (isFinished) return
         isFinished = true

         if (config.cancelToken) {
           config.cancelToken.unsubscribe(onCanceled)
         }

         if (config.signal) {
           config.signal.removeEventListener('abort', onCanceled)
         }

         emitter.removeAllListeners()
       }

       function done(value, isRejected) {
         if (isDone) return

         isDone = true

         if (isRejected) {
           rejected = true
           onFinished()
         }

         isRejected ? rejectPromise(value) : resolvePromise(value)
       }
       // 创建成功回调函数
       const resolve = function resolve(value) {
         done(value)
       }
       // 创建失败回调函数
       const reject = function reject(value) {
         done(value, true)
       }
       // 创建 abort 函数
       function abort(reason) {
         // 触发 abort 事件
         emitter.emit(
           'abort',
           !reason || reason.type
             ? new CanceledError(null, config, req)
             : reason
         )
       }
       // 监听 abort 事件
       emitter.once('abort', reject)

       if (config.cancelToken || config.signal) {
         config.cancelToken && config.cancelToken.subscribe(abort)
         if (config.signal) {
           config.signal.aborted
             ? abort()
             : config.signal.addEventListener('abort', abort)
         }
       }

       // 解析url
       const fullPath = buildFullPath(config.baseURL, config.url)
       const parsed = url.parse(fullPath)
       const protocol = parsed.protocol || supportedProtocols[0]

       if (protocol === 'data:') {
         // 协议开头为 data:
         let convertedData
         if (method !== 'GET') {
           // 并且请求方式不是 get，则拒绝：方法不允许
           return settle(resolve, reject, {
             status: 405,
             statusText: 'method not allowed',
             headers: {},
             config,
           })
         }

         try {
           // 解析 data 为 Buffer 或者 Blob
           convertedData = fromDataURI(config.url, responseType === 'blob', {
             Blob: config.env && config.env.Blob,
           })
         } catch (err) {
           throw AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config)
         }
         // 如果响应类型为 text
         if (responseType === 'text') {
           // 根据相应转码规则，转换为字符串
           convertedData = convertedData.toString(responseEncoding)
           //
           if (!responseEncoding || responseEncoding === 'utf8') {
             data = utils.stripBOM(convertedData)
           }
         } else if (responseType === 'stream') {
           convertedData = stream.Readable.from(convertedData)
         }
         // 返回
         return settle(resolve, reject, {
           data: convertedData,
           status: 200,
           statusText: 'OK',
           headers: {},
           config,
         })
       }
       // 如果是不支持的协议，就返回并提示协议不支持
       if (supportedProtocols.indexOf(protocol) === -1) {
         return reject(
           new AxiosError(
             'Unsupported protocol ' + protocol,
             AxiosError.ERR_BAD_REQUEST,
             config
           )
         )
       }

       const headers = AxiosHeaders.from(config.headers).normalize()

       // Set User-Agent (required by some servers)
       // See https://github.com/axios/axios/issues/69
       // User-Agent is specified; handle case where no UA header is desired
       // Only set header if it hasn't been set in config
       headers.set('User-Agent', 'axios/' + VERSION, false)

       const onDownloadProgress = config.onDownloadProgress
       const onUploadProgress = config.onUploadProgress
       const maxRate = config.maxRate
       let maxUploadRate = undefined
       let maxDownloadRate = undefined

       // support for https://www.npmjs.com/package/form-data api
       if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
         headers.set(data.getHeaders())
       } else if (data && !utils.isStream(data)) {
         if (Buffer.isBuffer(data)) {
           // Nothing to do...
         } else if (utils.isArrayBuffer(data)) {
           data = Buffer.from(new Uint8Array(data))
         } else if (utils.isString(data)) {
           data = Buffer.from(data, 'utf-8')
         } else {
           return reject(
             new AxiosError(
               'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
               AxiosError.ERR_BAD_REQUEST,
               config
             )
           )
         }
         // 如果data 存在的话，就添加 Content-Length header属性
         headers.set('Content-Length', data.length, false)
         // 如果 data.length 超过 配置中的 config.maxBodyLength 就报错并返回
         if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
           return reject(
             new AxiosError(
               'Request body larger than maxBodyLength limit',
               AxiosError.ERR_BAD_REQUEST,
               config
             )
           )
         }
       }

       const contentLength = +headers.getContentLength()

       if (utils.isArray(maxRate)) {
         maxUploadRate = maxRate[0]
         maxDownloadRate = maxRate[1]
       } else {
         maxUploadRate = maxDownloadRate = maxRate
       }

       if (data && (onUploadProgress || maxUploadRate)) {
         if (!utils.isStream(data)) {
           data = stream.Readable.from(data, { objectMode: false })
         }

         data = stream.pipeline(
           [
             data,
             new AxiosTransformStream({
               length: utils.toFiniteNumber(contentLength),
               maxRate: utils.toFiniteNumber(maxUploadRate),
             }),
           ],
           utils.noop
         )

         onUploadProgress &&
           data.on('progress', (progress) => {
             onUploadProgress(
               Object.assign(progress, {
                 upload: true,
               })
             )
           })
       }

       // HTTP basic authentication
       let auth = undefined
       if (config.auth) {
         const username = config.auth.username || ''
         const password = config.auth.password || ''
         auth = username + ':' + password
       }

       if (!auth && parsed.auth) {
         const urlAuth = parsed.auth.split(':')
         const urlUsername = urlAuth[0] || ''
         const urlPassword = urlAuth[1] || ''
         auth = urlUsername + ':' + urlPassword
       }

       auth && headers.delete('authorization')

       try {
         buildURL(parsed.path, config.params, config.paramsSerializer).replace(
           /^\?/,
           ''
         )
       } catch (err) {
         const customErr = new Error(err.message)
         customErr.config = config
         customErr.url = config.url
         customErr.exists = true
         return reject(customErr)
       }

       headers.set('Accept-Encoding', 'gzip, deflate, gzip, br', false)

       const options = {
         path: buildURL(
           parsed.path,
           config.params,
           config.paramsSerializer
         ).replace(/^\?/, ''),
         method,
         headers: headers.toJSON(),
         agents: { http: config.httpAgent, https: config.httpsAgent },
         auth,
         protocol,
         beforeRedirect: dispatchBeforeRedirect,
         beforeRedirects: {},
       }

       if (config.socketPath) {
         options.socketPath = config.socketPath
       } else {
         options.hostname = parsed.hostname
         options.port = parsed.port
         setProxy(
           options,
           config.proxy,
           protocol +
             '//' +
             parsed.hostname +
             (parsed.port ? ':' + parsed.port : '') +
             options.path
         )
       }

       let transport
       const isHttpsRequest = isHttps.test(options.protocol)
       // 判断是 http 还是 https
       options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent
       if (config.transport) {
         transport = config.transport
       } else if (config.maxRedirects === 0) {
         transport = isHttpsRequest ? https : http
       } else {
         if (config.maxRedirects) {
           options.maxRedirects = config.maxRedirects
         }
         if (config.beforeRedirect) {
           options.beforeRedirects.config = config.beforeRedirect
         }
         transport = isHttpsRequest ? httpsFollow : httpFollow
       }

       if (config.maxBodyLength > -1) {
         options.maxBodyLength = config.maxBodyLength
       } else {
         // follow-redirects does not skip comparison, so it should always succeed for axios -1 unlimited
         options.maxBodyLength = Infinity
       }

       if (config.insecureHTTPParser) {
         options.insecureHTTPParser = config.insecureHTTPParser
       }

       // 创建 request
       req = transport.request(options, function handleResponse(res) {
         if (req.destroyed) return

         const streams = [res]
         // 在需要的情况下，自动解压响应体
         let responseStream = res
         // 如果重定向，则返回最后一次请求的信息
         const lastRequest = res.req || req

         // if decompress disabled we should not decompress
         if (config.decompress !== false) {
           // if no content, but headers still say that it is encoded,
           // remove the header not confuse downstream operations
           if (data && data.length === 0 && res.headers['content-encoding']) {
             delete res.headers['content-encoding']
           }

           switch (res.headers['content-encoding']) {
             /*eslint default-case:0*/
             case 'gzip':
             case 'compress':
             case 'deflate':
               // add the unzipper to the body stream processing pipeline
               streams.push(zlib.createUnzip())

               // remove the content-encoding in order to not confuse downstream operations
               delete res.headers['content-encoding']
               break
             case 'br':
               if (isBrotliSupported) {
                 streams.push(zlib.createBrotliDecompress())
                 delete res.headers['content-encoding']
               }
           }
         }

         if (onDownloadProgress) {
           const responseLength = +res.headers['content-length']

           const transformStream = new AxiosTransformStream({
             length: utils.toFiniteNumber(responseLength),
             maxRate: utils.toFiniteNumber(maxDownloadRate),
           })

           onDownloadProgress &&
             transformStream.on('progress', (progress) => {
               onDownloadProgress(
                 Object.assign(progress, {
                   download: true,
                 })
               )
             })

           streams.push(transformStream)
         }

         responseStream =
           streams.length > 1
             ? stream.pipeline(streams, utils.noop)
             : streams[0]

         const offListeners = stream.finished(responseStream, () => {
           offListeners()
           onFinished()
         })

         const response = {
           status: res.statusCode,
           statusText: res.statusMessage,
           headers: new AxiosHeaders(res.headers),
           config,
           request: lastRequest,
         }

         if (responseType === 'stream') {
           response.data = responseStream
           settle(resolve, reject, response)
         } else {
           const responseBuffer = []
           let totalResponseBytes = 0

           responseStream.on('data', function handleStreamData(chunk) {
             responseBuffer.push(chunk)
             totalResponseBytes += chunk.length

             // make sure the content length is not over the maxContentLength if specified
             if (
               config.maxContentLength > -1 &&
               totalResponseBytes > config.maxContentLength
             ) {
               // stream.destroy() emit aborted event before calling reject() on Node.js v16
               rejected = true
               responseStream.destroy()
               reject(
                 new AxiosError(
                   'maxContentLength size of ' +
                     config.maxContentLength +
                     ' exceeded',
                   AxiosError.ERR_BAD_RESPONSE,
                   config,
                   lastRequest
                 )
               )
             }
           })

           responseStream.on('aborted', function handlerStreamAborted() {
             if (rejected) {
               return
             }

             const err = new AxiosError(
               'maxContentLength size of ' +
                 config.maxContentLength +
                 ' exceeded',
               AxiosError.ERR_BAD_RESPONSE,
               config,
               lastRequest
             )
             responseStream.destroy(err)
             reject(err)
           })

           responseStream.on('error', function handleStreamError(err) {
             if (req.destroyed) return
             reject(AxiosError.from(err, null, config, lastRequest))
           })

           responseStream.on('end', function handleStreamEnd() {
             try {
               let responseData =
                 responseBuffer.length === 1
                   ? responseBuffer[0]
                   : Buffer.concat(responseBuffer)
               if (responseType !== 'arraybuffer') {
                 responseData = responseData.toString(responseEncoding)
                 if (!responseEncoding || responseEncoding === 'utf8') {
                   responseData = utils.stripBOM(responseData)
                 }
               }
               response.data = responseData
             } catch (err) {
               reject(
                 AxiosError.from(err, null, config, response.request, response)
               )
             }
             settle(resolve, reject, response)
           })
         }

         emitter.once('abort', (err) => {
           if (!responseStream.destroyed) {
             responseStream.emit('error', err)
             responseStream.destroy()
           }
         })
       })

       emitter.once('abort', (err) => {
         reject(err)
         req.destroy(err)
       })

       // Handle errors
       req.on('error', function handleRequestError(err) {
         // @todo remove
         // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
         reject(AxiosError.from(err, null, config, req))
       })

       // set tcp keep alive to prevent drop connection by peer
       req.on('socket', function handleRequestSocket(socket) {
         // default interval of sending ack packet is 1 minute
         socket.setKeepAlive(true, 1000 * 60)
       })

       // Handle request timeout
       if (config.timeout) {
         // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
         const timeout = parseInt(config.timeout, 10)

         if (isNaN(timeout)) {
           reject(
             new AxiosError(
               'error trying to parse `config.timeout` to int',
               AxiosError.ERR_BAD_OPTION_VALUE,
               config,
               req
             )
           )

           return
         }

         // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
         // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
         // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
         // And then these socket which be hang up will devouring CPU little by little.
         // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
         req.setTimeout(timeout, function handleRequestTimeout() {
           if (isDone) return
           let timeoutErrorMessage = config.timeout
             ? 'timeout of ' + config.timeout + 'ms exceeded'
             : 'timeout exceeded'
           const transitional = config.transitional || transitionalDefaults
           if (config.timeoutErrorMessage) {
             timeoutErrorMessage = config.timeoutErrorMessage
           }
           reject(
             new AxiosError(
               timeoutErrorMessage,
               transitional.clarifyTimeoutError
                 ? AxiosError.ETIMEDOUT
                 : AxiosError.ECONNABORTED,
               config,
               req
             )
           )
           abort()
         })
       }

       // Send the request
       if (utils.isStream(data)) {
         let ended = false
         let errored = false

         data.on('end', () => {
           ended = true
         })

         data.once('error', (err) => {
           errored = true
           req.destroy(err)
         })

         data.on('close', () => {
           if (!ended && !errored) {
             abort(
               new CanceledError('Request stream has been aborted', config, req)
             )
           }
         })

         data.pipe(req)
       } else {
         req.end(data)
       }
     })
   }
   ```

## 6、取消请求

### 取消请求示例

```javascript
let cancel = null
axios({
  method: 'get',
  url: 'http://localhost:3000/posts',
  // 1. 添加配置对象的属性
  cancelToken: new axios.CancelToken(function (c) {
    // 3. 将 C 的值赋值给 cancel
    cancel = c
  }),
}).then((response) => {
  console.log(response)
  cancel = null
})

document.getElementById('button').onclick = function () {
  // 取消请求
  if (cancel) {
    cancel()
  }
}
```

### 源码解析

```javascript
// CancelToken.js

class CancelToken {
  constructor(executor) {
    // 参数必须是一个函数
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.')
    }

    let resolvePromise
    // 设定一个 promise 实例
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve
    })

    const token = this

    this.promise.then((cancel) => {
      if (!token._listeners) return

      let i = token._listeners.length

      while (i-- > 0) {
        token._listeners[i](cancel)
      }
      token._listeners = null
    })

    // 重写 then 函数
    this.promise.then = (onfulfilled) => {
      let _resolve
      // eslint-disable-next-line func-names
      const promise = new Promise((resolve) => {
        token.subscribe(resolve)
        _resolve = resolve
      }).then(onfulfilled)

      promise.cancel = function reject() {
        token.unsubscribe(_resolve)
      }

      return promise
    }

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // 取消集合已经被 执行了
        // Cancellation has already been requested
        return
      }

      token.reason = new CanceledError(message, config, request)
      resolvePromise(token.reason)
    })
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  // 订阅 监听函数
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason)
      return
    }

    if (this._listeners) {
      this._listeners.push(listener)
    } else {
      this._listeners = [listener]
    }
  }

  // 取消 监听函数
  unsubscribe(listener) {
    if (!this._listeners) {
      return
    }
    const index = this._listeners.indexOf(listener)
    if (index !== -1) {
      this._listeners.splice(index, 1)
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel
    const token = new CancelToken(function executor(c) {
      cancel = c
    })
    return {
      token,
      cancel,
    }
  }
}

export default CancelToken
```

具体流程可以参考如下：

1. 声明时候声明 cancel 变量并赋值

2. 请求内部的 `xhr.js` 进行订阅 `subscribe` 一个取消函数(内部有 abort 相关逻辑)
3. `subscribe` 方法实际上是往 cancelToken 实例中创建一个` listener` 数组，并 push 取消请求函数
4. 当调用 `cancel()` 时候， 实例上的 `this.promise` 变为 fullefilled 状态，执行 `.then` 相关逻辑 （遍历 `listener` 数组，并传入参数 new Cancel（meesage） 示例）
5. 一一执行 步骤 3 中 被 push 的 取消请求逻辑 ( 执行 request.abort() 取消请求 )

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3378643bc45c4d928d1b9eaba7d053c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## 7、CSRF 防御

Axios 支持防御 CSRF(Cross-site request forgery，跨站请求伪造)攻击，而防御 CSRF 攻击的最简单方式就是加 Token。

CSRF 的攻击可以简述为：服务器错把攻击者的请求当成了正常用户的请求。

加一个 Token 为什么就能解决呐?首先 Token 是服务端随用户每次请求动态生成下发的，用户在提交表单、查询数据等行为的时候，需要在网络请求体加上这个临时性的 Token 值，攻击者无法在三方网站中获取当前 Token，因此服务端就可以通过验证 Token 来区分是否是正常用户的请求。

Axios 在请求配置中提供了两个字段：

```javascript
// cookie 中携带的 Token 名称，通过该名称可以从 cookie 中拿到 Token 值
xsrfCookieName: 'XSRF-TOKEN',
// 请求 Header 中携带的 Token 名称，通过该成名可从 Header 中拿到 Token 值
xsrfHeaderName: 'X-XSRF-TOKEN',
```

用于附加验证防御 CSRF 攻击的 Token

## 8、一些工具函数

### mergeConfig 函数

```javascript
export default function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {}
  const config = {}

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source)
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source)
    } else if (utils.isArray(source)) {
      return source.slice()
    }
    return source
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop])
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop])
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop])
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop])
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop])
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop])
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop])
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
  }

  utils.forEach(
    Object.keys(config1).concat(Object.keys(config2)),
    function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties
      const configValue = merge(prop)
      ;(utils.isUndefined(configValue) && merge !== mergeDirectKeys) ||
        (config[prop] = configValue)
    }
  )

  return config
}
```

## 9、一些拓展点

### axios 与 Axios 的关系

1. 从语法上来说，axios 不是 Axios 的实例
2. 从功能上来说，axios 是 Axios 的实例
3. axios 是 Axios.prototype.request 函数 bind() 返回的函数
4. axios 作为对象由 Axios 原型对象上的所有方法（get/post/put 等），有 Axios 对象上所有属性(defaults, inteceptors)

### instance 与 axios 的区别

1. 相同
   - 都是一个能发送任意请求的函数：request(config)
   - 都能发送特定请求的各种放方法：get/put/post/delete 等
   - 都有默认配置和拦截器的属性：defaults 和 interceptors
2. 不同
   - 默认匹配的值很可能不一样
   - instance 没有 axios 后面添加的一些方法： create/CancelToken/all 等方法

### axios 的请求/响应数据转换器是什么

1. 请求转换器：对请求头和请求体数据进行特定处理的函数

   ```javascript
   transformRequest: [function transformRequest(data, headers) {
     ...
     const hasJSONContentType = contentType.indexOf('application/json') > -1;
     const isObjectPayload = utils.isObject(data);
   	...
     if (isObjectPayload || hasJSONContentType ) {
       headers.setContentType('application/json', false);
       return stringifySafely(data);
     }
     return data;
     ...
   }
   ```

2. 响应转换器：将响应体 json 字符串解析为 js 对象或者数组 的函数

   ```javascript
   transformResponse: [function transformResponse(data) {
     ...
     if(...){
       ...
        try {
        		return JSON.parse(data);
         } catch (e) {
           ...
         }
     }
    	return data;
   }
   ```

### `axios.create` 的变化

1. 针对`axios.create` 方法，正当整理写此篇解析文章期间，发现了 于*2021 年 9 月 5 号*有了这么一条 PR 更新，为什么这么做那：是为了大型应用、或多域使用多实例情况下， 可以针对已经构造的实例再次封装构造，提供深度构造控制器能力：[**详情见此条 PR**](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fpull%2F2795)

   ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45e67be3bd784d82a636307ca7710eb2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

   在创建 axios 实例的工厂方法内，绑定工厂方法到实例的 create 属性上。为什么不是在工厂方法外绑定呐?这是我们可能的习惯做法，Axios 之前确实也是这么做的。

   原因简单来说就是，用户自己创建的实例依然可以调用 create 方法创建新的实例，例如：

   ```javascript
   const axios = require('axios')
   const jsonClient = axios.create({
     responseType: 'json', // 该项配置可以在后续创建的实例中复用，而不必重复编码
   })
   const serviceOne = jsonClient.create({
     baseURL: 'https://service.one/',
   })
   const serviceTwo = jsonClient.create({
     baseURL: 'https://service.two/',
   })
   // 这样有助于复用实例的公共参数复用，减少重复编码。
   ```

2. 一个新的 PR

   > 链式调用骨架这里在 6 个月前一个新的 pr，重构了这部分的代码逻辑，_这个 pr 内容很大，你忍一下_：
   >
   > **_这里主要是针对了请求拦截器可能会出现异步情况、或有很长的宏任务执行，并且重构之前的代码中，因为请求事放到微任务中执行的，微任务创建的时机在构建 promise 链之前，如果当执行到请求之前宏任务耗时比较久，或者某个请求拦截器有做异步，会导致真正的_**`ajax`**_请求发送时机会有一定的延迟，所以解决这个问题是很有必要的。_**

   ```javascript
   // 请求拦截器储存数组
   var requestInterceptorChain = []
   // 默认所有请求拦截器都为同步
   var synchronousRequestInterceptors = true
   // 遍历注册好的请求拦截器数组
   this.interceptors.request.forEach(function unshiftRequestInterceptors(
     interceptor
   ) {
     // 这里interceptor是注册的每一个拦截器对象 axios请求拦截器向外暴露了runWhen配置来针对一些需要运行时检测来执行的拦截器
     // 如果配置了该函数，并且返回结果为true，则记录到拦截器链中，反之则直接结束该层循环
     if (
       typeof interceptor.runWhen === 'function' &&
       interceptor.runWhen(config) === false
     ) {
       return
     }
     // interceptor.synchronous 是对外提供的配置，可标识该拦截器是异步还是同步 默认为false(异步)
     // 这里是来同步整个执行链的执行方式的，如果有一个请求拦截器为异步 那么下面的promise执行链则会有不同的执行方式
     synchronousRequestInterceptors =
       synchronousRequestInterceptors && interceptor.synchronous
     // 塞到请求拦截器数组中
     requestInterceptorChain.unshift(
       interceptor.fulfilled,
       interceptor.rejected
     )
   })
   // 相应拦截器存储数组
   var responseInterceptorChain = []
   // 遍历按序push到拦截器存储数组中
   this.interceptors.response.forEach(function pushResponseInterceptors(
     interceptor
   ) {
     responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
   })

   var promise
   // 如果为异步 其实也是默认情况
   if (!synchronousRequestInterceptors) {
     // 这里和重构之前的逻辑是一致的了
     var chain = [dispatchRequest, undefined]
     // 请求拦截器塞到前面
     Array.prototype.unshift.apply(chain, requestInterceptorChain)
     // 响应拦截器塞到后面
     chain = chain.concat(responseInterceptorChain)
     promise = Promise.resolve(config)
     // 循环 执行
     while (chain.length) {
       promise = promise.then(chain.shift(), chain.shift())
     }
     // 返回promise
     return promise
   }

   // 这里则是同步的逻辑
   var newConfig = config
   // 请求拦截器一个一个的走 返回 请求前最新的config
   while (requestInterceptorChain.length) {
     var onFulfilled = requestInterceptorChain.shift()
     var onRejected = requestInterceptorChain.shift()
     // 做异常捕获 有错直接抛出
     try {
       newConfig = onFulfilled(newConfig)
     } catch (error) {
       onRejected(error)
       break
     }
   }
   // 到这里 微任务不会过早的创建
   // 也就解决了 微任务过早创建、当前宏任务过长或某个请求拦截器中有异步任务而阻塞真正的请求延时发起问题
   try {
     promise = dispatchRequest(newConfig)
   } catch (error) {
     return Promise.reject(error)
   }
   // 响应拦截器执行
   while (responseInterceptorChain.length) {
     promise = promise.then(
       responseInterceptorChain.shift(),
       responseInterceptorChain.shift()
     )
   }

   return promise
   ```

   上面的内容需要反复的梳理，笔者也是结合源码及就该次重构的 PR 的讨论进行了仔细分析： [**详情见此条 PR**](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fissues%2F2609) !!!

   ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a9e873564e74066a76bd1993b94c220~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

   ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b0b2bfbf3d2496ca9f1b586a8d2e68a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

   作者：思唯
   链接：https://juejin.cn/post/7016255507392364557
   来源：稀土掘金
   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 转换器和拦截器的关系

> 转换器和拦截器的最大的区别之一，transformer 里面只能“同步”操作，interceptor 里面可以“异步”。

请求转换器（transformRequest）主要用来根据 data 格式，设置 http 请求头；
响应转换器（transformResponse）可以根据实际业务中服务端返回的数据格式，统一设置转换方法。
拦截器是被包装成了 Promise，显然主要是想用它来处理异步的。

汇总下就是：

**转换器是处理数据和请求头的，不能处理异步，不会阻断请求和响应流程；**

**拦截器可以处理异步需求，可以使用拦截器阻断请求或响应流程。**

### 涉及到的设计模式

Axios 涉及到的设计模式就有：**单例模式**、**工厂模式**、**职责链模式**、**适配器模式**，因此绝对是值得学习的一个工具库，梳理之后不仅利于我们灵活使用其 API，更有助于根据业务去自定义扩展封装网络请求，将网络请求统一收口。

### 参考文献

[最全、最详细 Axios 源码解读---看这一篇就足够了](https://juejin.cn/post/7016255507392364557#comment)

[这次终于弄懂 Axios 是如何中断请求了](https://juejin.cn/post/7029729114378469383)

[刚出锅的 Axios 网络请求源码阅读笔记，你会吗](https://developer.51cto.com/article/691169.html)

[Axios 源码解析（二）：通用工具方法](https://linjingyi.cn/posts/fe9fb5af.html)

[Axios 源码解读看这一篇就够了](https://i-fanr.com/2022/03/22/axios-resource/)


<CommentService />