# 21-加餐：高阶实战——彻底搞懂前端性能监控和优化

[可观测性之国内第一篇讲如何减少卡顿的代码级别详细文章](https://juejin.cn/post/7159807927908302884#comment)

[使用 Performance API 获取页面性能](https://juejin.cn/post/6973567030528065573)

## 01: 什么是前端性能？

> 产品性能是指产品具有适合用户要求的物理、化学或者技术特性，如强度、化学成分、纯度、功率、转速等。通常所说的产品性能，实际上指的是产品的功能和质量两个方面。

### 前端性能

前端性能通常指的是**前端页面的访问速度**

### 为什么要提升前端性能

提升前端性能可以显著提升用户访问体验，提高用户活跃度和留存率。

### 如何提升前端性能

核心是两步

* 监控前端性能
* 优化前端性能

## 02：深入剖析前端性能监控原理（上）

![img](https://pic2.zhimg.com/v2-9f63018694b9b4471e28295ddb675a91_r.jpg)

## 03：深入剖析前端性能监控原理（下）

## 04：如何监控前端性能 ？

### 前端性能监控

####  原理

* 核心指标：fp、fcp、fmp

* 监控方法：

  * Performance
    * PerformanceNavigation
    * PerformanceTiming
    * PerformanceNavigationTiming
  * PerformanceCbServer

  > [https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Navigation_timing](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Navigation_timing)

### 代码实操

1. 我们新建一个页面`performance-test.html `

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>performance-test</title>
     </head>
     <body></body>
     <script>
       window.onload = function () {
         console.log(JSON.stringify(window.performance, null, 2))
         const {
           domainLookupStart,
           domainLookupEnd,
           domComplete,
           domLoading,
           loadEventEnd,
           loadEventStart,
         } = window.performance.timing
         console.log('dns获取时间', domainLookupEnd - domainLookupStart)
         console.log('dom获取时间', domComplete - domLoading)
         console.log('dom渲染时间', loadEventEnd, loadEventStart) // 这时还没渲染，不准确
       }
     </script>
   </html>
   ```

2. 运行至浏览器结果如下

   ```shell
   {
     "timeOrigin": 1683795983810.5,
     "timing": {
       "connectStart": 1683795983810,
       "navigationStart": 1683795983810,
       "secureConnectionStart": 0,
       "fetchStart": 1683795983810,
       "domContentLoadedEventStart": 1683795983821,
       "responseStart": 1683795983810,
       "domInteractive": 1683795983821,
       "domainLookupEnd": 1683795983810,
       "responseEnd": 1683795983814,
       "redirectStart": 0,
       "requestStart": 1683795983810,
       "unloadEventEnd": 1683795983817,
       "unloadEventStart": 1683795983817,
       "domLoading": 1683795983818,
       "domComplete": 1683795983821,
       "domainLookupStart": 1683795983810,
       "loadEventStart": 1683795983821,
       "domContentLoadedEventEnd": 1683795983821,
       "loadEventEnd": 0,
       "redirectEnd": 0,
       "connectEnd": 1683795983810
     },
     "navigation": {
       "type": 1,
       "redirectCount": 0
     }
   }
   
   dns获取时间 0
   performance-test.html:23 dom获取时间 3
   performance-test.html:24 dom渲染时间 0 1683795983821
   ```

## 05: Performance Entry 解决监控精度和多资源性能

[使用 Performance API 获取页面性能](https://juejin.cn/post/6973567030528065573)

> 目前 mdn 推荐使用的是 Performance Entry
>
> 原有 performance.timing 具体到 **毫秒**, 它的一个数据类型是：**performanceTiming**
>
> 而 Performance Entry 获取的时间精确到 **纳秒**，它的一个数据类型是: **PerformanceNavigationTiming**

1. 修改`performance-test.html`,代码如下

   ```javascript
   window.onload = function () {
     // console.log(JSON.stringify(window.performance, null, 2))
     // const {
     //   domainLookupStart,
     //   domainLookupEnd,
     //   domComplete,
     //   domLoading,
     //   loadEventEnd,
     //   loadEventStart,
     // } = window.performance.timing
     // console.log('dns获取时间', domainLookupEnd - domainLookupStart)
     // console.log('dom获取时间', domComplete - domLoading)
     // console.log(dom渲染时间', loadEventEnd, loadEventStart) // 这时还没渲染，不准确
     const perfEntries = window.performance.getEntries()
     console.log(perfEntries)
   }
   ```

2. 以上代码在 chrome 中没有打印出来是空数组，延迟执行后有值

3. 而使用 safari 浏览器运行时，直接有值，不需要延迟执行，原因暂时未找到

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a673d00d850b4c2aa74ff70172a17009~tplv-k3u1fbpfcp-watermark.image?)

4. 修改`performance-test.html`,引入`js`文件以及图片文件

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>performance-test</title>
     </head>
     <body>
       <img
         src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
         alt=""
       />
     </body>
     <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
     <script>
       window.onload = function () {
         const perfEntries = window.performance.getEntries()
         console.log(perfEntries)
       }
     </script>
   </html>
   ```

5. 这时候在`chrome`浏览器中运行即可看到如下效果(强刷情况下 first-xxx 才会出现)

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/657c5eed34204dfe95a0bdab463419c8~tplv-k3u1fbpfcp-watermark.image?)

6. 而`safari`浏览器效果如下(强刷情况下 first-content-paint 才会出现)

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae21dde109234dc38a2d9e8adf8a7bab~tplv-k3u1fbpfcp-watermark.image?)

## 06：性能指标核心概念讲解：fp、fcp和lcp

### FP: First Paint

First Paint, part of the Paint Timing API, is the time between navigator and when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the queston "Is that happening ?"

[https://developer.mozilla.org/en-US/docs/Glossary/First_paint](https://developer.mozilla.org/en-US/docs/Glossary/First_paint)

### FCP: First contentful paint

**First Contentful Paint** (FCP) is when the browser renders the first bit of content from the DOM, providing the first feedback to the user that the page is actually loading. The question "Is it happening?" is "yes" when the first contentful paint completes.

[https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint)

### LCP: Largest Contentful Paint

The **Largest Contentful Paint** (LCP) performance metric provides the render time of the largest image or text block visible within the viewport, recorded from when the page first begins to load.

[https://developer.mozilla.org/en-US/docs/Glossary/Largest_contentful_paint](https://developer.mozilla.org/en-US/docs/Glossary/Largest_contentful_paint)

1. 修改`performance-test.html`,代码如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>performance-test</title>
     </head>
     <body>
       <img
         src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
         alt=""
       />
     </body>
     <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
     <script>
       window.onload = function () {
         const perfEntries = window.performance.getEntries()
         const paint = window.performance.getEntriesByType('paint')
         const fp = paint.find((e) => e.name === 'first-paint').startTime
         const fcp = paint.find(
           (e) => e.name === 'first-contentful-paint',
         ).startTime
         console.log(fp, fcp)
       }
     </script>
   </html>
   ```

2. 强刷浏览器，就可以看到控制台中打印的时间数据

## 07：性能监控和性能度量之 Performance Observe

> 目前我们的时间获取都是在 window.onload 回调中，有很多数据并不能准确的拿到。那么该如何操作呢？

### 前端的 DOM 加载性能

1. 修改`performance-test.html`,代码如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>performance-test</title>
     </head>
     <script>
       function callback(list, ob) {
         list.getEntries().forEach((e) => {
           console.log(e)
         })
       }
       let observer = new PerformanceObserver(callback)
       // 这里可以看到的前端 DOM 加载性能
       observer.observe({ entryTypes: ['element'] })
     </script>
     <body>
       // img 需要增加属性 elementtiming="big-image"
       <img
         src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
         alt=""
         elementtiming="big-image"
       />
     </body>
     <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
   </html>
   ```

2. 运行至浏览器，打开控制看，结果如下

   ```shell
   {
       "name": "image-paint",
       "entryType": "element",
       "startTime": 153.60000000009313,
       "duration": 0,
       "renderTime": 153.60000000009313,
       "loadTime": 141.60000000009313,
       "intersectionRect": {
           "x": 8,
           "y": 8,
           "width": 137,
           "height": 28,
           "top": 8,
           "right": 145,
           "bottom": 36,
           "left": 8
       },
       "identifier": "big-image",
       "naturalWidth": 137,
       "naturalHeight": 28,
       "id": "",
       "url": "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
   }
   ```

### navigation: 前端模板/文档(HTML)加载性能

1. 修改`performance-test.html`,代码如下

   ```html
   <script>
   	// 修改 entryTypes 为 navigation
     observer.observe({ entryTypes: ['navigation'] })
   </script>
   ```

2. 运行至浏览器，打开控制看，结果如下

   ```shell
   {
       "name": "",
       "entryType": "navigation",
       "startTime": 0,
       "duration": 1669.7000000001863,
       "initiatorType": "navigation",
       "nextHopProtocol": "",
       "renderBlockingStatus": "non-blocking",
       "workerStart": 0,
       "redirectStart": 0,
       "redirectEnd": 0,
       "fetchStart": 0.39999999990686774,
       "domainLookupStart": 0.39999999990686774,
       "domainLookupEnd": 0.39999999990686774,
       "connectStart": 0.39999999990686774,
       "secureConnectionStart": 0,
       "connectEnd": 0.39999999990686774,
       "requestStart": 0.39999999990686774,
       "responseStart": 0.39999999990686774,
       "responseEnd": 2.2999999998137355,
       "transferSize": 300,
       "encodedBodySize": 0,
       "decodedBodySize": 0,
       "responseStatus": 0,
       "serverTiming": [],
       "unloadEventStart": 5.2999999998137355,
       "unloadEventEnd": 5.2999999998137355,
       "domInteractive": 1668.6000000000931,
       "domContentLoadedEventStart": 1668.6000000000931,
       "domContentLoadedEventEnd": 1668.7999999998137,
       "domComplete": 1669.7000000001863,
       "loadEventStart": 1669.7000000001863,
       "loadEventEnd": 1669.7000000001863,
       "type": "reload",
       "redirectCount": 0,
       "activationStart": 0
   }
   ```

### resource: 前端HTML模板和资源的加载性能

1. 修改`performance-test.html`,代码如下

   ```html
   <script>
   	// 修改 entryTypes 为 resouce
     observer.observe({ entryTypes: ['resource'] })
   </script>
   ```

2. 运行至浏览器，打开控制看，结果如下

   ```shell
   {
       "name": "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg",
       "entryType": "resource",
       "startTime": 12.100000000093132,
       "duration": 22.100000000093132,
       "initiatorType": "img",
       "nextHopProtocol": "h2",
       "renderBlockingStatus": "non-blocking",
       "workerStart": 0,
       "redirectStart": 0,
       "redirectEnd": 0,
       "fetchStart": 12.100000000093132,
       "domainLookupStart": 12.100000000093132,
       "domainLookupEnd": 12.100000000093132,
       "connectStart": 12.100000000093132,
       "secureConnectionStart": 12.100000000093132,
       "connectEnd": 12.100000000093132,
       "requestStart": 32.10000000009313,
       "responseStart": 32.60000000009313,
       "responseEnd": 34.200000000186265,
       "transferSize": 0,
       "encodedBodySize": 1452,
       "decodedBodySize": 3234,
       "responseStatus": 0,
       "serverTiming": [
           {
               "name": "cdn-cache",
               "duration": 0,
               "description": "HIT"
           },
           {
               "name": "edge",
               "duration": 1,
               "description": ""
           }
       ]
   }
   
   {
       "name": "https://code.jquery.com/jquery-3.6.4.min.js",
       "entryType": "resource",
       "startTime": 12.600000000093132,
       "duration": 34.700000000186265,
       "initiatorType": "script",
       "nextHopProtocol": "",
       "renderBlockingStatus": "non-blocking",
       "workerStart": 0,
       "redirectStart": 0,
       "redirectEnd": 0,
       "fetchStart": 12.600000000093132,
       "domainLookupStart": 0,
       "domainLookupEnd": 0,
       "connectStart": 0,
       "secureConnectionStart": 0,
       "connectEnd": 0,
       "requestStart": 0,
       "responseStart": 0,
       "responseEnd": 47.3000000002794,
       "transferSize": 0,
       "encodedBodySize": 0,
       "decodedBodySize": 0,
       "responseStatus": 0,
       "serverTiming": []
   }
   ```

### mark 和 measure: 前端性能的度量

1. 修改`performance-test.html`,代码如下

   ```html
   <script>
   	// 修改 entryTypes 为 resouce
     observer.observe({ entryTypes: ['mark', "measure"] })
   </script>
   <script>
       // 以一个标志开始。
       performance.mark('mySetTimeout-start')
       // 等待一些时间。
       setTimeout(function () {
         // 标志时间的结束。
         performance.mark('mySetTimeout-end')
         // 测量两个不同的标志。
         performance.measure(
           'mySetTimeout',
           'mySetTimeout-start',
           'mySetTimeout-end',
         )
         // 清除存储的标志位
         performance.clearMarks()
         performance.clearMeasures()
       }, 1000)
     </script>
   ```

2. 运行至浏览器，打开控制看，结果如下

   ```shell
   {
       "name": "mySetTimeout-start",
       "entryType": "mark",
       "startTime": 51,
       "duration": 0
   }
   
   {
       "name": "mySetTimeout",
       "entryType": "measure",
       "startTime": 51,
       "duration": 1005.8999999999069 // 两者执行时间差
   }
   
   {
       "name": "mySetTimeout-end",
       "entryType": "mark",
       "startTime": 1056.8999999999069,
       "duration": 0
   }
   ```

### paint：Either `'first-paint'` or `'first-contentful-paint'`.

1. 修改`performance-test.html`,代码如下

   ```html
   <script>
   	// 修改 entryTypes 为 resouce
     observer.observe({ entryTypes: ['paint'] })
   </script>
   ```

2. 运行至浏览器，强制刷新，打开控制看，结果如下

   ```shell
   {
       "name": "first-paint",
       "entryType": "paint",
       "startTime": 151.90000000037253,
       "duration": 0
   }
   {
       "name": "first-contentful-paint",
       "entryType": "paint",
       "startTime": 151.90000000037253,
       "duration": 0
   }
   ```

## 08：ChromePerformance用法教学

### 工具

* Chrome Performance
* 前端性能监控平台

## 09：分享前端性能监控平台架构设计

### 如何构建前端性能监控平台

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3830de380fd46e8888f492322e2d430~tplv-k3u1fbpfcp-watermark.image?)
