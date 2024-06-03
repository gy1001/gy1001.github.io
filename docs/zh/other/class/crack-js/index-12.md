# 12-玩转客户端存储

## 01：cookie高级使用和注意事项

### 客户端写 Cookie

* `<cookie-name>`= `<cookie-value>`: 名称/值对
* `expires=date-in-GMTString-format`：有效期，如果没有定义，cookie 会在对话结束时过期
* `max-age=max-age-in-seconds`：距离 cookie 失效还要经过多少秒 (例如一年为 60\*60\*24\*365)
* `HttpOnly=<boolean>`: 属性可以阻止通过 javascript 访问 cookie，从而一定程度上遏制这类攻击。设置了这个属性的 cookie, 不能使用 Document.cookie, XMLhttpRequest 和 Request API 访问
* `domain=<domain-value>`: cookie 可以发送到的主机名
* `path=<path.value>`: 指定一个 URL 路径
* `SameSite`: 允许服务器设置一定 cookie, 不随跨域请求发送

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
    <button id="getCookie">获取cookie</button>
    <button id="setCookie">设置cookie</button>
    <button id="deleteCookie">删除一个cookie</button>
    <div class="show-cookie"></div>
    <script>
      const domNode = document.querySelector('.show-cookie')
      getCookie.onclick = function () {
        //读
        domNode.innerText = document.cookie
      }
      setCookie.onclick = function () {
        //写
        document.cookie = 'testUid=test;path=/;'
      }

      deleteCookie.onclick = function () {
        const expiresTime = new Date(0).toUTCString()
        //修改cookie或者删除cookie,需要保障path和domain两个值不变。
        document.cookie = `testUid=test;path=/;expires=${expiresTime};`
      }
    </script>
  </body>
</html>

```

### 客户端写 Cookie 注意点

* 删除 cookie，设置 cookie 的过期时间为过去时间即可
* 设置多个 cookie, 需要多次调用 document.cookie
* 修改和删除 cookie 字段，要保障 path 和 domain 值不变

### 服务端写 Cookie

```javascript
app.post('/login', (_req, res) => {
  //设置cookie
  res.setHeader('Set-Cookie', ['userToken=1111;Max-Age=86400;'])
  // 或者
  res.cookie('cid', '555', { maxAge: 86400, httpOnly: true })
  return res.json({
    REV: true,
    DATA: {
      msg: '成功',
    },
  })
})
```

```java
public void login(HttpServleRequest request, HttpServletResponse response) {
  Cookie cookie = new Cookie("cid", "555");
  cookie.setHttpOnly(true);
  cookie.setPath("/");
  cookie.setDomain("localhost");
  response.addCookie(cookie);
  response.sendRedirect("http://localhost:8080/index.html");
}
```

### Cookie 的几个特殊选项

* 会话期 cookie
* 持久化 cookie 
* httpOnly 
* secure
* cookie 作用域
* cookie 的 key 和 值编码解码

#### 会话期 cookie

* 定义：浏览器会话期间的 cookie， 浏览器关闭后会自动删除
* 设置会话期 cookie: 不指定过期时间（Expires）和 有效期（max-age）即可

#### 持久化 cookie 

* 定义：持久化cookie 的生命周期取决于过期时间(Expires)和有效期(Max-Age)，持久化 cookie 存储在客户端硬盘中。
* Max-Age:正数，cookie 持久化时间，单位秒。
* Max-Age: 0. 可以删除 cookie

#### HttpOnly

* 定义：设置为 true,可以阻止通过 js 访问 cookie.能有效的防止 XSS 攻击
* document.cookie 无法访问

#### secure

* 定义：设置为 true, cookie 只会被 https 传输到服务端

#### cookie 的作用域

* Domain:
  * 指定哪些域接受 cookie， 默认不包含子域名
  * 可以设置.test.com, (a.test.com)和 (b.test.com)公用 cookie
* Path
  * 允许接受 cookie 的 url 路径，一般设置为 /, 这样子路由也可以被匹配
* SameSite
  * None: 浏览器不限制，**同站和跨站**都可以发送 cookie
  * Strict: 浏览器只在相同站点发送 cookie 
  * Lax: 新版浏览器默认选项，允许部分第三方请求携带 cookie

### cookie 同源和同站区别

* 同源：协议 + 端口 + 域名
* 同站：有效顶级域名 + 二级域名。不考虑端口和协议
* 同站例子：(a.taobao.com 和 b.taobao.com)(127.0.0.1:8000, 127.0.0.1:443)
* 跨站：（a.github.io/b.github.io) // github.io 属于一个有效的顶级域名

### SameSite 跨站携带 cookie 

| 请求类型  | 实例                               | Strict 跨站 | Lax 跨站 | None 跨站 |
| --------- | ---------------------------------- | ----------- | -------- | --------- |
| 链接      | `<a href="..." />`                 | 否          | 是       | 是        |
| 预加载    | `<link href="" rel="prerender" />` | 否          | 是       | 是        |
| get 表单  | `<form method="GET" action="" />`  | 否          | 是       | 是        |
| post 表单 | `<form method="POST" action="" />` | 否          | 否       | 是        |
| iframe    | `<iframe src="">`                  | 否          | 否       | 是        |
| Ajax      | `$.get("")`                        | 否          | 否       | 是        |
| Image     | `<img src="" />`                   | 否          | 否       | 是        |

####  sameSite 实战代码

[SameSite 跨站携带 cookie 代码](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/12.%20%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/1.%20cookie/Cookie%E5%87%A0%E4%B8%AA%E7%89%B9%E6%AE%8A%E5%80%BC/sameSite/server/src/app.ts)

### SameSite 跨站携带 cookie 注意事项

* SameSite 必须和 Secure 同时设置为才生效
* 前端站点和后端站点接口为 https

### cooKie key 和 value 编解码

* 为什么要编解码？

* key 和 value 中出现分号，等号等特殊符号，影响我们解析操作

```javascript
const key = encodeURIComponent('testUid')
const value = encodeURIComponent('test=1')
document.cookie = `${key}=${value};path=/;`
```

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
    <button id="getCookie">获取cookie</button>
    <button id="setCookie">设置cookie</button>
    <div class="show-cookie"></div>
    <script>
      const domNode = document.querySelector('.show-cookie')
      getCookie.onclick = function () {
        domNode.innerText = document.cookie
      }
      setCookie.onclick = function () {
        // document.cookie = 'testUid=test=1;path=/;'
        const key = encodeURIComponent('testUid')
        const value = encodeURIComponent('test=1')
        document.cookie = `${key}=${value};path=/;`
      }
    </script>
  </body>
</html>
```

### 检查用户是否禁用 cookie

```javascript
window.navigator.cookieEnabled // true、false
```

### 编写 cookie 工具库-get

```javascript
// CookieUtils.js
/**
 *
 * 编码 -方便后续替换编解码方法
 * @param {any} s
 * @returns
 */
function encode(s) {
  return encodeURIComponent(s)
}
/**
 *
 * 解码-方便后续替换编解码方法
 * @param {any} s
 * @returns
 */
function decode(s) {
  return decodeURIComponent(s)
}

/**
 *
 * 获取cookie
 * @param {any} key
 * @returns
 */
function getCookieItem(key) {
  let result = key ? undefined : {},
    cookies = document.cookie ? document.cookie.split('; ') : [],
    i = 0,
    l = cookies.length
  for (; i < l; i++) {
    let parts = cookies[i].split('='),
      //取第一个等号前面的作为key
      name = decode(parts.shift()),
      cookie = parts.join('=')
    if (key === name) {
      result = decode(cookie)
      break
    }

    if (!key && cookie !== undefined) {
      //key 未定义，返回全部的key和value对象
      result[name] = decode(cookie)
    }
  }
  return result
}

/**
 *
 * 设置cookie
 * @param {any} key
 * @param {any} value
 * @param {any} [options={}]
 * @returns
 */
function setCookieItem(key, value, options = {}) {
  if (!key) return false
  console.log(options)

  let sExpires = ''
  if (options.expires) {
    switch (options.expires.constructor) {
      case Number:
        sExpires =
          options.expires === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : '; max-age=' + options.expires
        break
      case String:
        sExpires = '; expires=' + options.expires
        break
      case Date:
        sExpires = '; expires=' + options.expires.toUTCString()
        break
    }
  }

  window.document.cookie = [
    encode(key),
    '=',
    encode(value),
    sExpires,
    options.path ? '; path=' + options.path : '',
    options.domain ? '; domain=' + options.domain : '',
    options.secure ? '; secure' : '',
  ].join('')
  return true
}

/**
 *
 * 移除单个cookie字段
 * @param {any} key
 * @param {any} options
 * @returns
 */
function removeCookieItem(key, options) {
  setCookieItem(key, '', { ...options, expires: -1 })
  return !getCookieItem(key)
}
```

#### 测试示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./CookieUtils.js"></script>
  </head>
  <body>
    <button id="getCookie">获取cookie</button>
    <button id="setCookie">设置cookie</button>
    <button id="getSingleCookie">获取字段cookie</button>
    <button id="deleteCookie">删除一个cookie</button>
    <div class="show-cookie"></div>
    <script>
      const cookieOption = {
        path: '/',
        domain: '127.0.0.1',
        expires: 15,
      }
      const domNode = document.querySelector('.show-cookie')
      getCookie.onclick = function () {
        domNode.innerText = document.cookie
      }
      setCookie.onclick = function () {
        setCookieItem('testUid', 'test=222=1', cookieOption)
      }

      getSingleCookie.onclick = function () {
        domNode.innerText = getCookieItem('testUid')
        console.log(getCookieItem())
      }

      deleteCookie.onclick = function () {
        removeCookieItem('testUid', cookieOption)
      }
    </script>
  </body>
</html>
```

### 新异步操作 Cookie API - CookieStore

> 兼容性暂时一般

* `.get`： 获得一个具有给定名称或选项对象的 cookie
* `.delete`: 删除具有给定名称或者选项对象的 cookie 
* `.getAll`: 获取所有匹配的 cookie 
* `.set`: 设置一个具有给定名称和值或者 options 对象的 cookie 
* `Events`：change：当 cookie 变化时

### CookieStore 使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>cookieStorage</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <button id="btnAdd">添加</button>
      <button id="btnAddFail">添加失败</button>
      <button id="btnDel">删除</button>
      <button id="btnGet">获取</button>
      <button id="btnGetAll">获取全部</button>
    </div>
    <script>
      let index = 1
      btnAdd.onclick = function () {
        const day = 24 * 60 * 60 * 1000
        cookieStore
          .set({
            name: `cookie-${index}`,
            value: `cookie-${index}-value`,
            expires: Date.now() + day,
          })
          .then(
            function () {
              console.log('add cookie success')
            },
            function (reason) {
              console.error('add cookie failed: ', reason)
            },
          )
        index++
      }
      btnAddFail.onclick = function () {
        const day = 24 * 60 * 60 * 1000
        cookieStore
          .set({
            name: `cookie-1`,
            value: `cookie-1-value`,
            expires: Date.now() + day,
            domain: 'test.com',
          })
          .then(
            function () {
              console.log('add cookie success')
            },
            function (reason) {
              console.error('add cookie failed: ', reason)
            },
          )
      }

      btnDel.onclick = function () {
        cookieStore.delete('cookie-1').then(
          function () {
            console.log('delete cookie success')
          },
          function (reason) {
            console.error('delete cookie failed: ', reason)
          },
        )
      }

      btnGet.onclick = function () {
        cookieStore.get({ name: 'cookie-1' }).then(
          function (res) {
            console.log('get cookie success:', res)
          },
          function (reason) {
            console.error('get cookie failed: ', reason)
          },
        )
      }

      btnGetAll.onclick = function () {
        cookieStore.getAll().then(
          function (res) {
            console.log('getAll cookie success:', res)
          },
          function (reason) {
            console.error('getAll cookie failed: ', reason)
          },
        )
      }

      cookieStore.addEventListener('change', function (ev) {
        // ev.changed 变化的
        // ev.deleted 删除的
        console.log('cookieStorage change:', ev.changed, ev.deleted)
      })
    </script>
  </body>
</html>
```

### CookieStore-service worker 中使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>cookieStorage</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <button id="btnAdd">添加或更改</button>
      <button id="btnDel">删除</button>
    </div>
    <script>
      let index = 1
      btnAdd.onclick = function () {
        const day = 24 * 60 * 60 * 1000
        cookieStore
          .set({
            name: `cookie-x`,
            value: `cookie-x-${index}`,
            expires: Date.now() + day,
          })
          .then(
            function () {
              console.log('add cookie success')
            },
            function (reason) {
              console.error('add cookie failed: ', reason)
            },
          )
        index++
      }
      btnDel.onclick = function () {
        cookieStore.delete('cookie-x').then(
          function () {
            console.log('delete cookie success')
          },
          function (reason) {
            console.error('delete cookie failed: ', reason)
          },
        )
      }
    </script>
    <script>
      navigator.serviceWorker
        .register('./sw.js', {})
        .then(function (registration) {
          registration.addEventListener('updatefound', function () {
            var installingWorker = registration.installing
            console.log(
              'A new service worker is being installed:',
              installingWorker,
            )
          })
        })
        .catch(function (error) {
          console.log('Service worker registration failed:', error)
        })
    </script>
  </body>
</html>
```

```javascript
// sw.js
self.addEventListener('install', async (event) => {
  console.log('service worker is installed')
  const subscriptions = await self.registration.cookies.getSubscriptions()
  await self.registration.cookies.unsubscribe(subscriptions)

  await self.registration.cookies.subscribe([
    {
      name: 'cookie-x',
    },
  ])
})

// 监听变化
self.addEventListener('cookiechange', (ev) => {
  console.log('service worker cookiechange:', ev.changed, ev.deleted)
})

console.log('service worker !!!!')
```

### CookieStore-注意事项

* 安全上下文中使用，比如 `https, localhost` 等
* 返回的都是 `Promise`
* `FireFox 和 Safari 不支持`

## 02: 吃定 Web Storage 

### sessionStorage VS localStorage

* sessionStorage: 为每一个给定的源维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包含页面重新加载和恢复）
* localStorage: 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在
* sessionStorage 和 localStorage 一般统称为 Web Storage(API)
* 都遵循同源策略
* 容量一样

### web storage 注意事项

* 是同步 API，阻塞，如果存单个健或者值太大，会影响体验
* 存储的是字符串，要保存对象的时候，需要转为字符串，通常使用`JSON.stringify`

#### 键值比较大

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>键值比较大</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnAdd">添加</button>
    <button type="button" id="btnGet">取值</button>
    <script>
      const str = Array.from({ length: 5 * 1024 * 1023 }, (_) => '哦').join('')
      btnAdd.onclick = function () {
        console.time(`存长度${str.length}`)
        localStorage.setItem('_', str)
        console.timeEnd(`存长度${str.length}`)
      }
      btnGet.onclick = function () {
        console.time(`取长度${str.length}`)
        localStorage.getItem('_')
        console.timeEnd(`取长度${str.length}`)
      }
    </script>
  </body>
</html>
```

多次执行后结果如下

```shell
存长度5237760: 196.5849609375 ms
取长度5237760: 4.1201171875 ms
存长度5237760: 51.98388671875 ms
取长度5237760: 3.755126953125 ms
存长度5237760: 40.778076171875 ms
取长度5237760: 0.010986328125 ms
存长度5237760: 46.0537109375 ms
取长度5237760: 0.010986328125 ms
存长度5237760: 44.604736328125 ms
取长度5237760: 0.01318359375 ms
```

#### 键值比较大-对象

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>键值比较大</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnAdd">添加</button>
    <button type="button" id="btnGet">取值</button>
    <script>
      const arr = Array.from({ length: 5.12 * 1024 * 33 }, (v, index) => ({
        name: 'name' + index,
        age: ~~(Math.random() * 100),
      }))
      let str = ''
      btnAdd.onclick = function () {
        console.time(`存`)
        str = JSON.stringify(arr)
        localStorage.setItem('_', str)
        console.timeEnd(`存`)
      }
      btnGet.onclick = function () {
        console.time(`取长度${str.length}`)
        localStorage.getItem('_')
        console.timeEnd(`取长度${str.length}`)
      }
    </script>
  </body>
</html>
```

多次执行后结果如下

```shell
存: 99.951171875 ms
取长度5234991: 4.357177734375 ms
存: 43.543701171875 ms
取长度5234991: 4.340087890625 ms
存: 36.114013671875 ms
取长度5234991: 3.737060546875 ms
存: 43.527099609375 ms
取长度5234991: 4.1630859375 ms
存: 43.761962890625 ms
取长度5234991: 5.0771484375 ms
```

### SessionStorage 是共享的吗？

> 不是的

* 分别打开 index.html 和 other.html (demo)
* index.html 通过 a 标签打开 other.html (360浏览器（内置低版本chrome))(demo)
* index.html 通过 a 标签打开 other.html（最新chrome, 大于 89))
* 在新标签或者窗口打开一个页面时会复制顶级浏览器会话的上下文作为新会话的上下文
* 打开多个相同的 URL 的 Tabs 页面，会创建各自的 sessionStorage
* chrome 89版本后，通过 a 标签 target="_blank" 跳转到新页面时，sessionStorage 就会丢失，a 标签添加属性 **rel="opener"** 能够复制。仅仅能复制，之后的更改并不会同步

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>index</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnAdd">添加</button>
    <a href="./other.html" target="_blank">打开新页面</a>
    <!-- <a href="./other.html" target="_blank" rel="opener">打开新页面</a> -->
    <script>
      btnAdd.onclick = function () {
        console.time(`key-1`)
        sessionStorage.setItem('key-1', '值-1')
        console.timeEnd(`key-1`)
      }
    </script>
  </body>
</html>
```

```html
// other.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>other</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button id="btnGet" type="button">取key-1</button>
    <div>
      <div>消息：</div>
      <div id="message"></div>
    </div>
    <script>
      btnGet.onclick = function () {
        message.innerHTML = `结果: ${sessionStorage.getItem('key-1')}`
      }
    </script>
  </body>
</html>
```

### StorageEvent

* 当前页面使用的 storage 被其他页面修改时会触发 StorageEvent 事件
* 事件在同一个域下的不同页面之间触发，即在 A页面注册了 storage 的监听处理，只有在与 A 同域名下的 B 页面操作 storage 对象，A 页面才会被触发 storage 时间。B 页面本身不会触发事件

#### sessiongStorage 能触发 StorageEvent 事件嘛？

* a 标签打开：不触发

* iframe 嵌套：可以触发

* sessiongStorage、localStorage 都能触发 StorageEvent，怎么区分是谁触发的呢？

  ```javascript
  window.addEventListener('storage', function (ev) {
    if(ev.storageArea === sessionStorage){
        // code
    }
  })
  ```

#### storageEvent-link

* index.html 通过 a 标签打开 other.html
* other.html 内部有监听 stroageEvent 事件
* index.html 页面中触发 sessionStorage 变化
* other.html 中有无反应？？？**没有反应！没有反应！没有反应！**

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>index</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnAdd">添加</button>
    <a href="./other.html" target="_blank" rel="opener">打开新页面</a>
    <script>
      let index = 1
      btnAdd.onclick = function () {
        console.time(`key-1`)
        sessionStorage.setItem('key-1', `值-${index}`)
        console.timeEnd(`key-1`)
        index++
      }
    </script>
  </body>
</html>
```

```html
// other.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>other</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <div>消息：</div>
      <div id="message"></div>
    </div>
    <script>
      window.addEventListener('storage', function (ev) {
        message.innerHTML = ev.newValue
      })
    </script>
  </body>
</html>
```

#### sessionStorage-iframe

* index.html 通过 iframe 标签打开 other.html
* index.html 页面有监听 stroageEvent 事件
* other.html 内部有监听 stroageEvent 事件
* index.html 页面中触发 sessionStorage 变化
* other.html 中有无反应？？？**有反应！有反应！有反应！**
* index.html 内部是否可以监听到stroageEvent 事件？**不可以，不可以，不可以！**

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>index</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnAdd">添加</button>
    <iframe src="./other.html"></iframe>
    <script>
      let index = 1
      btnAdd.onclick = function () {
        console.time(`key-1`)
        sessionStorage.setItem('key-1', `值-${index}`)
        console.timeEnd(`key-1`)
        index++
      }
      window.addEventListener('storage', function (ev) {
        message.innerHTML = ev.newValue
      })
    </script>
  </body>
</html>
```

```html
// other.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>other</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div>
      <div>消息：</div>
      <div id="message"></div>
    </div>
    <script>
      window.addEventListener('storage', function (ev) {
        message.innerHTML = ev.newValue
      })
    </script>
  </body>
</html>
```

### localStorage 支持过期

#### localStorage 支持过期：简答的实现

> **localStorage 默认是没有过期时间**的，

* 添加一个属性，记住过期的时间
* 添加数据的时候，一起保存
* 查询数据，比对时间，过期删除

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>localStorage</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <div>
    <button type="button" id="btnSetItem">添加</button>
    <button type="button" id="btnGetItem">查询</button>
  </div>

  <body>
    <script>
      const myLocalStore = {
        setItem: (key, value, expire) => {
          const lsValue = JSON.parse(localStorage.getItem(key) || '{}')
          localStorage.setItem(
            key,
            JSON.stringify({
              ...lsValue,
              value,
              expire,
            }),
          )
        },
        getItem: (key) => {
          // 在取值之前先判断是否过期
          const lsValue = JSON.parse(localStorage.getItem(key) || '{}')
          if (lsValue.expire && lsValue.expire >= Date.now()) {
            return lsValue.value
          } else {
            localStorage.removeItem(key)
            return null
          }
        },
      }
    </script>

    <script>
      btnSetItem.onclick = function () {
        myLocalStore.setItem('key-x', 'value-1', Date.now() + 10000)
      }
      btnGetItem.onclick = function () {
        console.log('getItem:', myLocalStore.getItem('key-x'))
      }
    </script>
  </body>
</html>
```

#### localStorage 支持过期：第三方库

* web-storage-cache

### localStroage 存储加密

#### localStroage 存储加密: 简单加密

* URL方式：encodeURIComponent + decodeURIComponent
* 转为 base 64: window.btoa  + window.atob

#### localStroage 存储加密: 复杂加密

* Web Crypto API 的 SubtleCrypto 接口提供了许多底层加密功能(兼容性也不错)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Crypto API</title>
    <style>
      * {
        font-size: 28px;
      }

      .flex {
        display: flex;
      }

      .side {
        flex: 0 0 50%;
      }

      textarea {
        min-height: 400px;
        min-width: 400px;
      }
    </style>
  </head>

  <body>
    <div class="flex">
      <div class="side">
        <div>加密前内容</div>
        <div>
          <textarea id="textAreaClearText"></textarea>
        </div>
      </div>
      <div>
        <div>加密后内容</div>
        <div>
          <textarea id="textAreaCipherText"></textarea>
        </div>
      </div>
    </div>

    <div>
      <button type="button" id="btnEncrypt">加密</button>
      <button type="button" id="btnDecrypt">解密</button>
    </div>

    <script>
      let publicKey
      let privateKey

      let arrayBuffer
      ;(async function init() {
        // 生成私钥(privateKey)和公钥(publicKey)
        // 加密用公钥， 解密用私钥
        const keyPair = await crypto.subtle.generateKey(
          {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256',
          },
          true,
          ['encrypt', 'decrypt'],
        )
        publicKey = keyPair.publicKey
        privateKey = keyPair.privateKey
      })()

      /**
       * 返回ArrayBuffer
       */
      function encrypt(text, publicKey) {
        // 字符串转为TypedArray
        const clearText = new TextEncoder().encode(text)
        return window.crypto.subtle.encrypt(
          {
            name: 'RSA-OAEP',
          },
          publicKey,
          // an ArrayBuffer, or a TypedArray
          clearText,
        )
      }

      /**
       *  cipherText: ArrayBuffer
       *
       */
      async function decrypt(cipherText, privateKey) {
        // cipherText 是ArrayBuffer
        let decrypted = await window.crypto.subtle.decrypt(
          {
            name: 'RSA-OAEP',
          },
          privateKey,
          cipherText,
        )
        const dec = new TextDecoder()
        return dec.decode(decrypted)
      }

      btnEncrypt.onclick = async () => {
        const text = textAreaClearText.value
        arrayBuffer = await encrypt(text, publicKey)

        // ArrayBuffer转为字符串
        const dec = new TextDecoder()
        textAreaCipherText.value = dec.decode(arrayBuffer)
        console.log('arrayBuffer:', arrayBuffer)
      }

      btnDecrypt.onclick = async () => {
        const text = await decrypt(arrayBuffer, privateKey)
        textAreaClearText.value = text
      }
    </script>
  </body>
</html>
```

#### localStroage 存储加密: 使用加密库

* crypto-js: [文档](http://www.npmdoc.org/crypto-jszhongwenwendangcrypto-js-jszhongwenjiaochengjiexi.html)

  ```javascript
  // 对象加密
  var CryptoJS = require("crypto-js");
  var data = [{id: 1}, {id: 2}]
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
  // Decrypt
  var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData); // [{id: 1}, {id: 2}]

#### localStroage 存储加密: 第三方库

* secure-ls: [npm 文档](https://www.npmjs.com/package/secure-ls)

  > - Example 1: With `default` settings i.e. `Base64` Encoding and Data Compression
  >
  > ```javascript
  > > var ls = new SecureLS();
  > > ls.set('key1', {data: 'test'}); // set key1
  > > ls.get('key1'); // print data
  >   {data: 'test'}
  > ```

* localstorage-slim: [npm 文档](https://www.npmjs.com/package/localstorage-slim)

  ```javascript
  // using ES6 modules
  import ls from 'localstorage-slim';
  
  // using CommonJS modules
  var ls = require('localstorage-slim');
  
  
  /*** Store in localstorage ***/
  const value = {
    a: new Date(),
    b: null,
    c: false,
    d: 'superman',
    e: 1234
  }
  
  ls.set('key1', value); // value can be anything (object, array, string, number, ...)
  ls.get('key1');  // { a: "currentdate", b: "null", c: false, d: 'superman', e: 1234 }
  
  /* with optional ttl in seconds */
  ls.set('key2', value, { ttl: 5 });
  ls.get('key2');  // within 5 secs => { a: "currentdate", b: "null", c: false, d: 'superman', e: 1234 }
  ls.get('key2');  // after 5 secs => null
  
  /* with optional encryption */
  ls.set('key3', value, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
  ls.get('key3', { decrypt: true }); // { a: "currentdate", b: "null", c: false, d: 'superman', e: 1234 }
  ```

### web storage 的存储空间

#### localStorage 存储的键值采用什么字符编码

> 答案： UTF-16
>
> UTF-16，每个字符使用两个字节，是有前提条件的，就是码点小于 0xFFFF(65535),大于这个码点的是四个字节

#### 5M 的单位是什么

有以下几种选项？

1. 字符的个数
2. 字节数
3. 字符的长度值
4. bit 数
5. utf-16 编码单元

```javascript
"a".length // 1
"人".length // 1
"𠮷".length // 2
"😄".length // 2
```

> 答案是：选项3 字符的长度 或者是 选项5：utf-16 编码单元
>
> 另外，字符的个，并不等于字符的长度

 ### localStorage 键占不占存储空间

答案：占, 所以键名尽量短小

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
    <button type="button" id="btnSave">保存</button>
    <script>
      btnSave.onclick = function () {
        const charTxt = 'a'
        let count = 2.5 * 1024 * 1024
        let content = Array.from({ length: count }, (_) => charTxt).join('')
        const key = Array.from({ length: count }, (_) => charTxt).join('')
        localStorage.clear()
        try {
          console.time('setItem')
          localStorage.setItem(key, content)
          console.timeEnd('setItem')
        } catch (err) {
          console.log('err code:', err.code)
          console.log('err message:', err.message)
        }
      }
    </script>
  </body>
</html>
```

## 03：indexedDB的精华和使用

###  什么是 indexedDB

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

* 一个**事务型**数据库系统
* 一个基于 JavaScript 的面向对象数据库
* 支持索引
* 可以存储 **结构化克隆算法** 支持的任何对象

### 不能够被结构化克隆算法复制的数据

* Error 以及 Function 对象
* DOM 节点
* 属性描述符，getters setters
* 原型链上的属性

### indexedDB 特点

* 以键值对方式存储。键可以是二进制对象
* 支持事务
* 异步操作。基于回调函数的异步，不是 Promise
* 遵循同源策略
* 存储空间，配额很大
* 支持直接存储二进制内容

### indexedDB 主要对象模型

#### [连接数据库](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API#连接数据库)

- [`IDBFactory`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBFactory)

  提供数据库访问。这是全局对象 [`indexedDB`](https://developer.mozilla.org/zh-CN/docs/Web/API/indexedDB) 实现的接口，因此是 API 的入口。

- [`IDBOpenDBRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBOpenDBRequest)

  表示一个打开数据库的请求。

- [`IDBDatabase`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase)

  表示一个数据库连接。这是在数据库中获取事务的唯一方式。

#### [接收和修改数据](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API#接收和修改数据)

* [`IDBTransaction`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBTransaction)

  表示一个事务。在数据库上创建一个事务，指定作用域（例如要访问的存储对象），并确定所需的访问类型（只读或读写）。

* [`IDBRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBRequest)

  处理数据库请求并提供对结果访问的通用接口。

* [`IDBObjectStore`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore)

  表示允许访问通过主键查找的 IndexedDB 数据库中的一组数据的对象存储区。

* [`IDBIndex`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBIndex)

  也是为了允许访问 IndexedDB 数据库中的数据子集，但使用索引来检索记录而不是主键。这有时比使用 [IDBObjectStore](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore) 更快。

* [`IDBCursor`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBCursor)

  迭代对象存储和索引。

* [`IDBCursorWithValue` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursorWithValue)

  迭代对象存储和索引并返回游标的当前值。

* [`IDBKeyRange`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)

  定义可用于从特定范围内的数据库检索数据的键范围。

* [`IDBLocaleAwareKeyRange` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/IDBLocaleAwareKeyRange) 非标准

  定义一个键范围，可用于从特定范围内的数据库中检索数据，并根据为特定索引指定的语言环境的规则进行排序（详见 [createIndex() (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex) 的参数）。这个接口不再是 2.0 规范的一部分。

### 基本操作流程

1. 打开数据库
2. 在数据库中创建/打开一个对象仓库
3. 启动一个事务，并发送一个请求来执行一些数据库操作，像增加或者提取数据等
4. 通过监听 时间以等待操作完成
5. 继续后续的操作

#### 基本流程代码

```javascript
// 我们先打开一个数据库, window.indexedDB(IDBFactory)
const openRequest = window.indexedDB.open('fThings', 1)
// 升级的时候创建对象库和对应的索引
openRequest.onupgradeneeded = function (event) {}
openRequest.onerror = function (event) {}
openRequest.onsuccess = function (event) {
  console.log('open success')
  // 获得database
  db = event.target.result
}

btnQuery.onclick = function () {
  // 事务
  const transaction = db.transaction(['fThings'], 'readonly')
  // 对象库
  const objectStore = transaction.objectStore('fThings')
  // 键
  const keyRangeValue = IDBKeyRange.bound('A', 'F')
  // 游标
  objectStore.openCursor(keyRangeValue).onsuccess = function (event) {
    var cursor = event.target.result
    if (cursor) {
      console.log('value:', cursor.value)
      cursor.continue()
    } else {
      console.log('Entries all displayed.')
    }
  }
}
```

#### 整体代码示例

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
      <button id="btnAdd">添加数据</button>
      <button id="btnQuery">查询数据</button>
    </div>
    <script>
      // https://github.com/mdn/indexeddb-examples/blob/master/idbkeyrange/scripts/main.js
      var db
      var things = [
        { fThing: 'Drum kit', fRating: 10 },
        { fThing: 'Family', fRating: 10 },
        { fThing: 'Batman', fRating: 9 },
        { fThing: 'Brass eye', fRating: 9 },
        { fThing: 'The web', fRating: 9 },
        { fThing: 'Mozilla', fRating: 9 },
        { fThing: 'Firefox OS', fRating: 9 },
        { fThing: 'Curry', fRating: 9 },
        { fThing: 'Paneer cheese', fRating: 8 },
        { fThing: 'Mexican food', fRating: 8 },
        { fThing: 'Chocolate', fRating: 7 },
        { fThing: 'Heavy metal', fRating: 10 },
        { fThing: 'Monty Python', fRating: 8 },
        { fThing: 'Aphex Twin', fRating: 8 },
        { fThing: 'Gaming', fRating: 7 },
        { fThing: 'Frank Zappa', fRating: 9 },
        { fThing: 'Open minds', fRating: 10 },
        { fThing: 'Hugs', fRating: 9 },
        { fThing: 'Ale', fRating: 9 },
        { fThing: 'Christmas', fRating: 8 },
      ]

      // 插入数据
      function insertData() {
        // 事务
        var transaction = db.transaction(['fThings'], 'readwrite')
        // 对象库
        var objectStore = transaction.objectStore('fThings')
        // 添加数据
        for (i = 0; i < things.length; i++) {
          var request = objectStore.put(things[i])
        }
        // 成功的回调
        transaction.oncomplete = function () {
          console.log('insert data success')
        }
      }

      // 我们先打开一个数据库, window.indexedDB(IDBFactory)
      const openRequest = window.indexedDB.open('fThings', 1)
      // 升级的时候创建对象库和对应的索引
      openRequest.onupgradeneeded = function (event) {
        var db = event.target.result
        db.onerror = function (event) {
          console.log('Error loading database')
        }
        var objectStore = db.createObjectStore('fThings', {
          keyPath: 'fThing',
        })
        objectStore.createIndex('fRating', 'fRating', { unique: false })
      }

      openRequest.onerror = function (event) {
        console.log('open error:', event)
      }

      openRequest.onsuccess = function (event) {
        console.log('open success')
        // 获得database
        db = event.target.result
      }

      btnQuery.onclick = function () {
        // 事务
        const transaction = db.transaction(['fThings'], 'readonly')
        // 对象库
        const objectStore = transaction.objectStore('fThings')
        // 键
        const keyRangeValue = IDBKeyRange.bound('A', 'F')
        // 游标
        objectStore.openCursor(keyRangeValue).onsuccess = function (event) {
          var cursor = event.target.result
          if (cursor) {
            console.log('value:', cursor.value)
            cursor.continue()
          } else {
            console.log('Entries all displayed.')
          }
        }
      }

      btnAdd.onclick = insertData
    </script>
  </body>
</html>
```

### 适用场景

* 缓存数据，比如游戏数据
* 缓存图片，脚本，json文件等等静态资源
* service workder 的第三方库，就有利于 indexedDB

### indexedDB 第三方库：localForage

> [官方文档：https://localforage.docschina.org/](https://localforage.docschina.org/)

* localFroage 是一个 JavaScript 库，通过简单类似 localStorage API 的异步存储来改进你的 web 应用程序的离线体验。它能存储多种类型的数据，而不仅仅是字符串
* ocalForage 有一个优雅降级策略，若浏览器不支持 indexedDNB 或者 WebSQL, 则使用 localStorage
* localFroage 提供的回调 API 同时也支持 ES6 Promise API, 你可以自行选择

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>localForage</title>
  </head>

  <body>
    <script src="https://raw.githubusercontent.com/mozilla/localForage/master/dist/localforage.min.js"></script>
    <script>
      localforage.config({
        // 指定存储媒介， localStorage, web sql, localStorage
        driver: localforage.INDEXEDDB,
        // 数据库名
        name: 'myApp',
        // 版本
        version: 1.0,
        // 配额
        size: 4980736,
        // 对象库名
        storeName: 'keyvaluepairs',
        description: 'some description',
      })

      // 实例1
      var store = localforage.createInstance({
        name: 'nameHere',
      })

      // 实例2
      var store2 = localforage.createInstance({
        name: 'otherName',
      })

      ;(async function () {
        // 实例1存和取
        await store.setItem('key-1', 'value-1', console.log)
        const storeValue1 = await store.getItem('key-1')
        console.log('store key-1:', storeValue1)
        // 实例2存和取
        await store2.setItem('key-1', 'value-1', console.log)
        const store2Value1 = await store.getItem('key-1')
        console.log('store2 key-1:', storeValue1)

        // 纯二进制
        store.setItem('key-2', new Blob(['sdsd']))
      })()
    </script>
  </body>
</html>
```

### indexDB 第三方库：dexie.js

> [官方文档：https://dexie.org/](https://dexie.org/)

解决了原生 indexdb API 的三个主要问题

1. 不明确的错误处理
2. 糟糕的查询
3. 代码复杂性

[代码在线示例](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/12.%20%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/3.%20indexedDB/2.%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93/2.%20dexie.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>dexie</title>
  </head>

  <body>
    <script type="module">
      import Dexie from './dexie.min.mjs'
      // 实例化
      const db = new Dexie('FriendDatabase')
      db.version(1).stores({
        friends: '++id,name,age',
      })

      try {
        // 添加
        await db.friends.add({ name: 'Josephine', age: 21 })
        // 查询
        const youngFriends = await db.friends.where('age').below(25).toArray()
        console.log(`My young friends: ${JSON.stringify(youngFriends)}`)
      } catch (e) {
        console.log(`Error: ${e}`)
      }
    </script>
  </body>
</html>
```

### indexDB 第三方库：ZangoDB

> [https://github.com/erikolson186/zangodb](https://github.com/erikolson186/zangodb)

* 一个类 MongoDB 的 IndexedDB 接口实现，提供了诸如过滤、投影、排序、更新和聚合等大多数 MongoDB 常见的特性

[代码在线示例](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/12.%20%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/3.%20indexedDB/2.%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93/3.zangodb.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>zangodb</title>
  </head>

  <body>
    <script src="./zangodb.min.js"></script>
    <script>
      let db = new zango.Db('mydb', { people: ['age'] })
      let people = db.collection('people')

      let docs = [
        { name: 'Frank', age: 20 },
        { name: 'Thomas', age: 33 },
        { name: 'Todd', age: 33 },
        { name: 'John', age: 28 },
        { name: 'Peter', age: 33 },
        { name: 'George', age: 28 },
      ]

      people
        .insert(docs)
        .then(() => {
          return people
            .find({
              name: { $ne: 'John' },
              age: { $gt: 20 },
            })
            .group({
              _id: { age: '$age' },
              count: { $sum: 1 },
            })
            .project({
              _id: 0,
              age: '$_id.age',
            })
            .sort({
              age: -1,
            })
            .forEach((doc) => console.log('doc:', doc))
        })
        .catch((error) => console.error(error))
    </script>
  </body>
</html>
```

### indexDB 第三方库：JsStore

> [https://jsstore.net/tutorial/get-started/](https://jsstore.net/tutorial/get-started/)

* 一个具备类 SQL 语法的简单和先进的 IndexedDB 封装实现

[代码在线示例](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/12.%20%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/3.%20indexedDB/2.%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93/4.%20JsStore.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JsStore</title>
  </head>

  <body>
    <script src="./jsstore.min.js"></script>
    <script src="./jsstore.worker.js"></script>
    <script>
      // 定义数据结构
      function getDbSchema() {
        var table = {
          name: 'Student',
          columns: {
            id: {
              primaryKey: true,
              autoIncrement: true,
            },
            name: {
              notNull: true,
              dataType: 'string',
            },
            gender: {
              dataType: 'number',
              default: 'male',
            },
            country: {
              notNull: true,
              dataType: 'string',
            },
            city: {
              dataType: 'string',
              notNull: true,
            },
          },
        }

        var db = {
          name: 'My-Db',
          tables: [table],
        }
        return db
      }
      // 实例化
      var jsstoreCon = new JsStore.Connection()

      async function initDb() {
        // 创建数据库
        var isDbCreated = await jsstoreCon.initDb(getDbSchema())
        if (isDbCreated) {
          console.log('db created')
        } else {
          console.log('db opened')
        }
        // 添加
        await addStudent()
        // 查询
        var students = await jsstoreCon.select({
          from: 'Student',
        })

        console.log('students', students)
      }

      async function addStudent() {
        try {
          var noOfDataInserted = await jsstoreCon.insert({
            into: 'Student',
            values: [
              {
                name: '小名',
                gender: 1,
                country: '北京',
                city: '北京',
              },
              {
                name: '小红',
                gender: 0,
                country: '新疆',
                city: '乌鲁木齐',
              },
            ],
          })
        } catch (ex) {
          console.log('addStudent error:', ex.message)
        }
      }

      initDb()
    </script>
  </body>
</html>
```

### 基于 indexedDB 的客户端文件系统

[客户端文件系统](https://github.com/gy1001/Javascript/blob/main/JavaScript-Crack/12.%20%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/3.%20indexedDB/3.%20%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F/index.html)

## 04: 客户端存储 大比拼

### 客户端存储方案

* Cookie
* localStorage
* sessionStorage
* indexedDB
* Cache API 与 service worker
* FileSystem

### Cookie

* 单个 cookie 大小一般为 4k
* 默认采用 utf-8 存储
* 同一域名下存放个数有限，一般为 20-30 个，不同浏览器不一样
* 存储分为会话期间和持久性存储
* 会通过请求携带

#### 采用 utf-8存储

> utf-8   a:一个字节， 人：三个字节

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b884297912446a3b1a89cbc667cacb2~tplv-k3u1fbpfcp-watermark.image?)

#### 代码示例 1: 单个大小为 4k, 过大会失败

>如下代码中，键名 人 占用 3 个字节，所以 count 需要 4 * 1024 - 3，如果改为 -2 或者 以下的数，将会保存不成功，浏览器的 application 选项中的 cookie 将没有新值被设置进去

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./utils.js"></script>
  </head>

  <body>
    cookie存储
    <script>
      // utf-8   a:一个字节， 人：三个字节
      const charTxt = 'a'
      let count = 4 * 1024 - 3
      console.log(count)
      let content = new Array(parseInt(count)).fill(charTxt).join('')
      const key = '人' // 人， -3
      try {
        document.cookie = `${key}=${content};`
      } catch (err) {
        console.log('err', err)
      }
      const contentSize = sizeofUtfBytes(content)
      const keySize = sizeofUtfBytes(key)
      console.log('contentSize size:', contentSize)
      console.log('key size:', keySize)
      console.log('total size:', contentSize + keySize)
    </script>
  </body>
</html>
```

依赖的工具函数

```javascript
var sizeofUtfBytes = function (str, charset) {
  var total = 0,
    charCode,
    i,
    len
  charset = charset ? charset.toLowerCase() : ''
  if (charset === 'utf-16' || charset === 'utf16') {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i)
      if (charCode <= 0xffff) {
        total += 2
      } else {
        total += 4
      }
    }
  } else {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i)
      if (charCode <= 0x007f) {
        total += 1
      } else if (charCode <= 0x07ff) {
        total += 2
      } else if (charCode <= 0xffff) {
        total += 3
      } else {
        total += 4
      }
    }
  }
  return total
}
```

#### 代码示例 2：存放个数有限

> 如下 chrome 浏览器中 100个设置成功

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./utils.js"></script>
  </head>

  <body>
    cookie存储个数
    <script>
      // utf-8 a:一个字节， 人：三个字节
      const charTxt = 'a'
      let count = 4 * 1024 - 6
      console.log(count)
      let content = new Array(parseInt(count)).fill(charTxt).join('')
      const key = '人'

      for (let i = 0; i < 100; i++) {
        try {
          console.log('key==', `${key}_${i}`)
          document.cookie = `${key}_${i}=${content}; path=/`
        } catch (err) {
          console.log('err', err)
        }
      }
    </script>
  </body>
</html>
```

### localStorage

* 总大小：10M **字节**（ 5M 的编码单元，注意：一个编码单元是两个字节）
* 同源数据共享
* 存储为 UTF-16 编码
* 不存在过期
* 数据操作同步

#### 代码示例：*测试存储是否与数量有关*

> 第二个 key1 不能被设置成功

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../utils.js"></script>
  </head>
  <body>
    <button id="lBtn">localStorage 存储</button>
    <script>
      lBtn.onclick = function () {
        const charTxt = '人'
        let count = (10 * 1024 * 1024) / 2 - 8 / 2
        let content = new Array(count).fill(charTxt).join('')
        const key = 'aa🔴'
        const key1 = 'bb🔴'
        localStorage.clear()
        try {
          localStorage.setItem(key, content)
          //测试存储是否与数量有关。
          localStorage.setItem(key1, content)
        } catch (err) {
          console.log('err', err.code, err)
        }
        const sizeKey = sizeofUtfBytes(key, 'utf16')
        const contentSize = sizeofUtfBytes(content, 'utf16')
        console.log('key size:', sizeKey, content.length)
        console.log('content size:', contentSize, content.length)
        console.log(
          'total size:',
          sizeKey + contentSize,
          content.length + key.length,
        )
      }
    </script>
  </body>
</html>
```

### sessionStorage

* 总大小：10M **字节**（ 5M 的编码单元，注意：一个编码单元是两个字节）
* 同源限制（与窗口也有关系）
* 存储为 UTF-16 编码
* 浏览器关闭，数据消失
* 数据操作同步

### indexedDB

* 存储空间大
* 支持二进制存储，不仅仅文本字符串
* 同源限制
* 数据一直存在
* 数据操作异步

### Cache API 与 Service work

### FileSystem (非标准)

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
    <button id="saveFile">存储文件</button>
    <script>
      //1. 获取fileSystem 对象
      window.requestFileSystem =
        window.requestFilsSystem || window.webkitRequestFileSystem

      saveFile.onclick = function () {
        //2. 申请空间大小
        window.requestFileSystem(
          Window.TEMPORARY,
          10 * 1024 * 1024,
          (fs) => {
            //3. 创建文件
            fs.root.getFile(
              'test1.txt',
              { create: true, exclusive: false },
              (fileEntry) => {
                //打印创建好的文件访问URL
                console.log(fileEntry.toURL())
                //4. 创建一个写入对象
                fileEntry.createWriter((fileWriter) => {
                  //注册书写成功监听
                  fileWriter.onwriteend = function (e) {
                    console.log('书写成功')
                  }
                  fileWriter.onerror = function (e) {
                    console.log('书写失败 ' + e.toString())
                  }
                  var blob = new Blob(
                    [
                      '测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的测试已下阿大纲的',
                    ],
                    { type: 'text/plain' },
                  )
                  //5. 写入内容
                  fileWriter.write(blob)
                })
              },
              (e) => {
                console.log('eee', e)
              },
            )
          },
          (err) => {
            console.log('file error')
          },
        )
      }
    </script>
  </body>
</html>
```

### 总结

| 特性             | cookie                           | localStorage               | sessionStorage             | IndexedDB          |
| ---------------- | -------------------------------- | -------------------------- | -------------------------- | ------------------ |
| **数据生命周期** | 一般由服务器生成，可设置过期时间 | 一直存在，需要手动清理     | 浏览器关闭就会被清理       | 一直存在，手动清理 |
| **数据存储大小** | 单个Cookie 大小 4k，可存储多个   | 10M字节(5M UTF-16编码单元) | 10M字节(5M UTF-16编码单元) | 几十G甚至更多      |
| **数据获取方式** | 同步                             | 同步                       | 同步                       | 异步，支持事务     |
| **与服务器通讯** | 会携带在请求 header 中           | 不参与                     | 不参与                     | 不参与             |
| **作用域**       | 同站                             | 同源                       | 同源（有限定窗口）         | 同源               |
| **存储类型**     | 字符串                           | 字符串                     | 字符串                     | 字符串，二进制     |
