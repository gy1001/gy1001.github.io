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

```node
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

