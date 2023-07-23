# 03-前端性能优化常见的四种方法

## 01：加载优化

- 什么是首屏时间
  
  - 浏览器显示第一屏页面所消耗的时间

- 为什么要优化首屏时间
  
  - 过长的等待时间，会让用户变得烦躁，更容易跳出或者关闭这个网站

- 怎么样优化首屏时间？
  
  - 针对**不是首屏的资源进行懒加载**

- 为什么一般都进行懒加载？
  
  - **资源文件较大**，加载完**既耗时又费力**，用户也不一定会浏览到全部页面内容

### 懒加载实践 - getBoundingClientRect()

![](assets/2023-07-23-17-44-16-image.png)

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // 获取所有的需要懒加载的图片
  let lazyImages = [].slice.call(document.querySelectorAll('img.img-lazy'))
  // 限制频繁调用
  let active = false
  window.addEventListener('scroll', lazyLoad)
  function lazyLoad() {
    if (active === false) {
      active = true
      setTimeout(() => {
        lazyImages.forEach(function (lazyImage) {
          if (
            lazyImage.getBoundingClientRect().top <= window.innerHeight &&
            lazyImage.getBoundingClientRect().bottom >= 0
          ) {
            lazyImage.src = lazyImage.dataset.src
            lazyImage.classList.remove('img-lazy')
            lazyImages = lazyImage.filter((image) => image !== lazyImage)
          }
          // 判断所有图片加载完毕，移除事件
          if (lazyImages.length === 0) {
            window.removeEventListener('scroll', lazyLoad)
          }
        })
        active = false
      }, 200)
    }
  }
})
```

有没有更方便的方案呢？

### 懒加载实现 - Intersection Observer

> intersection Observer 现在除了 IE 以及低版本的安卓浏览器，基本上兼容大部分浏览器
> 
> 实践：首选 Intersection Observer + 兼容性处理（选用 getBoundingClientRect）

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // 获取所有的需要懒加载的图片
  let lazyImages = [].slice.call(document.querySelectorAll('img.img-lazy'))
  if (
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'IntersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer,
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          lazyImage.classList.remove('img-lazy')
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })
    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage)
    })
  }
})
```

## 02：构建优化

## 03： 渲染优化

## 04： 缓存优化
