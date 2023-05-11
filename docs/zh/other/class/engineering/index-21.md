# 21-加餐：高阶实战——彻底搞懂前端性能监控和优化

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

   
