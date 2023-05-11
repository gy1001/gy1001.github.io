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

7. 

