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
