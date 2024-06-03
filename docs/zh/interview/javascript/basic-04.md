# 异步和单线程

## 1.应用场景
- 网络请求，如 ajax、图片加载
- 定时任务，如 setTimeout

```javascript
// ajax
console.log('start')
$.get('./data1.json', function (data1) {
  console.log(data1)
})
console.log('end')
````

```javascript
// 图片加载
console.log('start')
let img = document.createElement('img')
img.onload = function () {
  console.log('loaded')
}
img.src = 'xxx.png'
console.log('end')
```

```javascript
// 定时任务
// setTimeout
console.log(100)
setTimeout(function () {
  console.log(200)
}, 1000)
console.log(300)
```

```javascript
console.log(100)
setInterval(function () {
  console.log(200)
}, 1000)
console.log(300)
```

## 2. 一些基本概念
1. JS 是单线程语言，只能同时做一件事
2. 浏览器和 node.js 已经支持 JS 启动**进程**，如 Web Worker
3. JS 和 DOM 渲染共用一个进程，因为 JS 可修改 DOM 结构
4. 遇到等待（网络请求，定时任务）不能卡住
4. 需要异步
5. 异步是基于 callback 函数形式

## 3. 异步和同步

* 基于 JS 是单线程语言
* 异步不会阻塞代码执行
* 同步会阻塞代码执行

代码上的区别
```javascript
// 异步
console.log(100)
setTimeout(function(){
  console.log(200)
}, 1000)
console.log(300)
```

```javascript
// 同步
console.log(100)
alert(200)
console.log(300)
```

## 4. callback hell 

```javascript
// 获取第一份数据
$.get(url, data1 => {
  console.log(data1)
  // 获取第二份数据
  $.get(url2, data2 => {
    // 获取第三份数据
    console.log(data2)
    $.get(url3, data3 => {
      console.log(data3)
      // 还有可能获取更多的数据
    })
  })
})
```

## 5. Promise

```javascript
function getData (url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}
const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'
getData(url1)
  .then(data1 => {
    console.log(data1)
    return getData(url2)
  })
  .then(data2 => {
    console.log(data2)
    return getData(url3)
  })
  .then(data3 => {
    console.log(data3)
  })
  .catch(err => {
    console.log(err)
  })
```
## 6. 手写 Promise 加载一张图片

```javascript
const imgUrl = 'http://xxxx.xxx.com/xxx.png'
function loadImg (imgSrc) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('图片加载失败'))
    }
    img.src = imgSrc
  })
}
loadImg(imgUrl)
  .then(img => {
    console.log(img.width)
    return img
  })
  .then(img => {
    console.log(img.height)
  })
  .catch(err => {
    console.log(err)
  })
```