上一节课，我们实现了一个简单的静态资源 HTTP 服务器。

这个服务器能够处理静态资源请求，找到对应的文件，然后返回文件内容。但是这个服务器还有很多可以优化的地方。首先，因为静态资源文件一般不会变化，所以当客户端请求过某个文件之后，浏览器可以将这个文件缓存下来。这么做，可以节省 HTTP 请求，既能够降低服务器的带宽消耗，也能够提升用户的访问速度。

第 11 节中我们说过，在 HTTP 协议中，动作 GET 和 OPTIONS 是支持缓存的。浏览器支持两种标准的缓存策略：强缓存和协商缓存。这也是前端面试中经常提及的问题。

那这一节课，我们就通过实践来体会一下这两种缓存的具体策略。

## 强缓存

浏览器的缓存规范允许服务器返回资源的时候带有`Cache-Control`响应头。这个策略叫做**强缓存**。

`Cache-Control`响应头的最常用格式为：

```
Cache-Control: max-age=<seconds>
```

其中 seconds 是缓存的时间，单位是秒。

当浏览器请求资源得到的响应带有`Cache-Control`响应头时，浏览器会将该资源缓存到本地。当浏览器下一次访问该资源时，同时满足以下 3 个条件，浏览器会直接使用本地的资源，不发起 HTTP 请求：

1. 两次请求的 url 完全相同（包括了 host、pathname、query）
2. 请求的动作是 GET
3. 请求头不带有`Cache-Control: no-cache`和`Pragma: no-cache`这两个信息

我们修改一下上一节课的 HTTP 服务器，在响应头中添加`cache-control`设置。

```js
...
// http-cache-control.js

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file:///${req.url}`)));

  if(fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if(stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if(fs.existsSync(filePath)) {
      const {ext} = path.parse(filePath);
      res.writeHead(200, {
        'Content-Type': mime.getType(ext),
        'Cache-Control': 'max-age=86400', // 缓存一天
      });
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found</h1>');
  }
});

...
```

如上面代码，我们增加了一个响应头`'Cache-Control': 'max-age=86400'`，表示缓存一天。启动 HTTP 服务，我们访问`http://localhost:8080/index.html`。看到的内容和上一节课的一样：

![](https://p3.ssl.qhimg.com/t0178700f186debc72b.jpg)

但是，如果你再次刷新页面，在浏览器开发者工具中查看 Network 选项，你会看到以下结果：

![](https://p3.ssl.qhimg.com/t0108682e06db9e5639.jpg)

注意第二行 logo.png，Size 那一栏是`(memory cache)`，Time 是 0ms，这就表示浏览器直接使用了缓存的内容，并没有向服务器发起请求。

为了验证这个结果，我们将 logo.png 这张图片换成灰色：

![](https://p3.ssl.qhimg.com/t01154608041a9c9148.png)

然后再刷新页面，我们看到的结果里，图片还是原来的颜色。只有我们让浏览器强制刷新（按下 shift 点击刷新按钮）页面，才能看到图片的变化。

这个例子中，虽然我们修改了 index.html 里的图片地址，但为什么只有图片被缓存了，而 index.html 页面没有被缓存呢？

这是因为在这个例子中，index.html 页面是直接通过浏览器地址栏访问的。根据浏览器的标准，通过地址栏访问、以及强制刷新网页的时候，HTTP 请求头自动会带上`Cache-Control: no-cache`和`Pragma: no-cache`的信息。只要有这两个请求头之一，浏览器就会忽略响应头中的`Cache-Control`字段。

![](https://p2.ssl.qhimg.com/t0171d9265d914d3b86.jpg)
_浏览器请求中带有 Cache-Control:no-cache 和 Pragam:no-cache_

💡注意，这并不是说网页不会被缓存，而是 _资源被访问的方式_ （比如直接通过地址栏）会导致服务器返回给浏览器响应头中的`Cache-Control`信息被忽略。如果这个网页是通过 iframe 加载的，那么这个网页就可能被浏览器缓存。

通常，在开发 Web 应用时，服务器都会带有强缓存策略。一般的网站，静态资源的内容还会被放到 CDN（内容分发网络）中，以提升访问速度。CDN 网关会给资源文件添加很长时间的强缓存策略甚至是永久的缓存。所以我们更新 Web 应用时，如果有部分静态资源文件，比如图片、JS、CSS 的内容改变，但是文件名没有改变，应用更新后，会发现 html 内容更新了，而页面中的图片、脚本还是旧的，但是用浏览器地址栏访问这些文件，看到的又是新的。产生这种“奇怪”的现象，就是因为**我们浏览器的强缓存策略，在不是通过地址栏访问资源的情况下，需要强制刷新才能更新资源**。

我们无法强迫用户去强制刷新浏览器，所以一般来说，Web 应用更新时应该主动变更修改过的资源文件的 URL。要改变 URL，我们可以修改文件名，或者在 URL 上增加随着发布版本改变的 query 字段，以避免强缓存被触发。这个步骤在现在的 Web 开发中，一般交给工程化脚本去完成。

## 协商缓存

上面介绍的强缓存，资源一旦被缓存，在过期时间之前，浏览器不会再向服务器发起请求，而是直接使用缓存的文件，这样完全避免了HTTP请求。不过强缓存的使用条件比较严格，对浏览器地址栏访问的资源无效。

强缓存对浏览器地址栏访问的资源无效，但浏览器提供了另一种缓存策略，可以缓存地址栏访问的文件，这种策略叫做**协商缓存**。

协商缓存，顾名思义，以 HTTP 内容协商的方式来实现的缓存。协商缓存规定，浏览器再发起 HTTP 请求的时候，服务器可以返回`Last-Modified`响应头，这个响应头的值是一个时间戳。如果服务器这么做了，那么浏览器会缓存这个资源，并且在今后请求该资源的时候，会带有`if-modified-since`请求头，它的值是上一次`Last-Modified`响应头中的时间戳。

服务器收到带有`if-modified-since`请求头的请求，根据请求头中的时间戳，对文件进行判断，如果文件内容在该时间戳之后到当前时间里没有被修改，那么服务器返回一个 304 响应，该响应表示只有 HEAD 没有 BODY。浏览器如果收到 304 响应，就会以缓存的内容作为 BODY。

我们修改一下代码：

```js
// http-last-modified.js

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file:///${req.url}`)));

  if(fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if(stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if(fs.existsSync(filePath)) {
      const {ext} = path.parse(filePath);
      const stats = fs.statSync(filePath);
      const timeStamp = req.headers['if-modified-since'];
      let status = 200;
      if(timeStamp && Number(timeStamp) === stats.mtimeMs) {
        // 如果timeStamp和stats.mtimeMS相等，说明文件内容没有修改
        status = 304;
      }
      res.writeHead(status, {
        'Content-Type': mime.getType(ext),
        'Cache-Control': 'max-age=86400', // 强缓存一天
        'Last-Modified': stats.mtimeMs, // 协商缓存响应头
      });
      if(status === 200) {
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } else { 
        res.end(); // 如果状态码不是200，不用返回Body
      }
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found</h1>');
  }
});
```

如上面代码所示，我们通过`fs.statSync(filePath)`获取文件信息，其中的`stats.mtimeMs`表示文件的修改时间。我们设置`Last-Modified`响应头的值为`stats.mtimeMs`。这样，当浏览器第一次收到响应时，就会缓存响应内容，并且在以后访问同一个 URL 的时候，自动带上`If-Modified-Since`请求头，内容为之前`Last-Modified`响应头的时间戳。

![](https://p2.ssl.qhimg.com/t013f8676928edeaa8f.jpg)

我们判断如果`If-Modified-Since`请求头存在，我们比较`stats.mtimeMs`和请求头所带的时间戳，如果相等，那么说明文件没有修改，这时候返回响应状态码 304，并且不需要返回响应的 Body 内容。

我们在浏览器开发者工具可以看到，第二次访问 index.html 文件的时候，返回的状态码是 304，而且响应内容的 size 很小，只有 179 字节，这是因为服务器只返回了响应头，而不用返回响应内容。

![](https://p1.ssl.qhimg.com/t016901819b8ab3f51d.jpg)

此时，如果我们修改了 index.js 文件：

```html
  <h1>君喻教育2</h1>
  <img src="assets/image/logo.png">
```

那这时候文件的修改时间发生了变化，timeStamp 不再等于`stats.mtimeMs`，所以服务器又返回 200，浏览器就能理解获得的是最新的资源。

因为协商缓存是浏览器和客户端通过内容协商实现的缓存机制，所以一般来说，不会像强缓存那样出现服务器上的内容更新了，但是客户端浏览器因为缓存而没有获取到最新内容的情况。

但也会有例外，比如服务器意外判断错了协商缓存的过期条件，返回了 304 状态。在这种情况下，浏览器的强制刷新也可以清除协商缓存，因为当浏览器强制刷新的时候，请求头不会带上`if-modified-since`信息。

协商缓存不止`Last-Modified`一种，还有一种协商缓存是`Etag`，它的机制和`Last-Modified`大同小异，只是把`Last-Modified`的时间戳换成`Etag`签名，相应地把`If-Modified-Since`字段换成`If-None-Match`字段。`Etag`的值可以用资源文件的 MD5 或 sha 签名。

协商缓存为什么要有两种呢？因为，有时候我们的网站是分布式部署在多台服务器上，一个资源文件可能在每台服务器上都有副本，相应地资源文件被修改时候，新的文件要同步到各个服务器上，导致各个文件副本的修改时间不一定相同。那么当用户一次访问请求的服务器和另一次访问请求的服务器不同时，就有可能因为两个文件副本的修改时间不同而使得`Last-Modified`形式的协商缓存失效。

如果这种情况采用`Etag`形式的协商缓存，根据文件内容而不是修改时间来判断缓存，就不会有这个问题了。使用`Etag`实现协商缓存的思路，与使用`Last-Modified`类似，只是用文件内容的 checksum 校验代替文件信息中的`stats.mtimeMs`来判断文件内容是否被修改。这里就不赘述了，放上具体代码，大家可以对比一下：

```js
// http-etag.js

const checksum = require('checksum');

const server = http.createServer((req, res) => {
  const srvUrl = url.parse(`http://${req.url}`);
  let path = srvUrl.path;
  if(path === '/') path = '/index.html';

  const resPath = `resource${path}`;

  if(!fs.existsSync(resPath)) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end('<h1>404 Not Found</h1>');
  }

  checksum.file(resPath, (err, sum) => {
    const resStream = fs.createReadStream(resPath);
    sum = `"${sum}"`; // etag 要加双引号

    if(req.headers['if-none-match'] === sum) {
      res.writeHead(304, {
        'Content-Type': getMimeType(resPath),
        etag: sum,
      });
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': getMimeType(resPath),
        etag: sum,
      });
      resStream.pipe(res);
    }
  });
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8080, () => {
  console.log('opened server on', server.address());
});
```

### 总结

在 HTTP 协议中，只有 GET 和 OPTIONS 是支持缓存的。它有两种缓存策略，分别是强缓存和协商缓存。

强缓存通过`Cache-Control`响应头设置。如果强缓存生效，浏览器不会向服务器发送请求，而是直接使用缓存的内容。但是如果资源是通过地址栏访问，或者强制刷新网页的时候，浏览器的请求头就会带有`Cache-Control: no-cache`和`Pragma: no-cache`，这会导致了服务器响应头的强缓存被浏览器忽略。

强缓存发生的条件比较严格，只有同时满足以下 3 个条件才会发生：
1. 两次请求的 url 完全相同（包括了 host、pathname、query）
2. 请求的动作是 GET 或者是 OPTIONS
3. 请求头不带有`Cache-Control: no-cache`和`Pragma: no-cache`这两个信息

如果通过地址栏直接访问的资源也能被浏览器缓存的话，我们需要进行协商缓存。协商缓存是通过`Last-Modified`或`Etag`响应头设置。如果协商缓存生效，浏览器仍然会发送请求，但是服务器会返回 304 响应，并且不会返回 Body 内容。

如果浏览器被用户强制刷新，那么强缓存和协商缓存都会失效。因为强制刷新会带上`Cache-Control: no-cache`和`Pragma: no-cache`请求头且不会带上`If-Modified-Scene`和`If-None-Match`请求头。