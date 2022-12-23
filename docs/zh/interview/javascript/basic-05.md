# 异步进阶
## 1. Event Loop: 事件循环/事件轮询
* JS是单线程运行的
* 异步要基于回调来实现
* Event Loop 就是异步回调的实现原理

### 1.1 JS 是如何执行
* 从前到后，一行一行执行
* 如果某一行执行报错，则停止下面的代码的执行
* 先把同步代码执行完，在执行异步

```javascript
// 示例
console.log("Hi")
setTimeout(()=>{
  console.log('cb1') // cb 即 callback
}, 5000)
console.log("Bye")

// 执行顺序： Hi Bye cb1
```
### 1.2 开始讲解 Event Loop 过程
* 同步代码，一行一行放在 Call Stack 执行
* 遇到异步，会先“记录”下，等待时机（定时、网络请求等）
* 时机到了，就移动到 Callback Queue 中
* 如果 Call Stack 为空（即同步代码执行完），Event Loop 开始工作
* 轮询查找 Callback Queue，如有则移动到 Call Stack 执行
* 然后继续轮询查找（永动机一样）

### 1.3 DOM 事件 和 Event Loop
- JS 是单线程的
- 异步（setTimeout, ajax 等）使用回调，基于 Event Loop
- DOM 事件也是使用回调，基于 Event Loop

```html
// dom 事件
<button id="btn1">提交</button>
<script>
  console.log('hi')
  $('#btn1').click(function () {
    console.log('button clicked')
  })
  console.log('Bye')
</script>
```

### 相关阅读：
[阮一峰：JavaScript 运行机制详解：再谈 Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)

## 2. Promise
### 2.1 三种状态
* pending、fulfilled、rejected
* pending => fulfilled 或者 pending => rejected
* 变化不可逆

### 2.2 状态的变化和表现
#### 2.2.1 状态的变化

```javascript
const p1 = new Promise((resolve, reject) => {

})
console.log(p1) // 此时的 PromiseState 为 pending 

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  })
})
console.log("p2", p2) // 此时的 PromiseState 还是 pending, 因为是一开始就打印了
setTimeout(() => {
  console.log('p2-setTimeout', p2) // 此时的 PromiseState 是 fulfilled
})

const p3 = new Promise((resolve, reject) => {
 setTimeout(() => {
    reject()
  })
})
console.log("p3", p3) // 此时的 PromiseState 还是 pending, 因为是一开始就打印了
setTimeout(() => {
  console.log('p3-setTimeout', p3) // 此时的 PromiseState 是 rejected
})
```

#### 2.2.2 状态的表现
* pending 状态，不会触发 then 和 catch
* fulfilled 状态，会触发后续的 then 回调函数
* rejected 状态，会触发后续的 catch 回调函数

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

#### 2.2.3 其他的一些 API
```javascript
// p1 直接是一个 PromiseState 为 fulfilled 状态的一个priomise
const p1 = Promise.resolve(100)
p1.then(data => {
  console.log(data) // 100
})

// p2 直接是一个 PromiseState 为 rejected 状态的一个priomise
const p2 = Promise.reject(200) 
p2.catch(err => {
  console.log(err) // 200
})
```
### 2.3 then 和 catch 对状态的影响
* then 正常返回状态为 fulfilled, 里面有报错则返回状态为 rejected
* catch 正常返回状态 fulfilled, 里面有报错则返回状态为 rejected

```javascript
const p1 = Promise.resolve().then(()=>{
  return 100
})
p1.then(() =>{
  console.log(123) // 正常执行打印
}).catch(err => {
  console.log(err)
})
setTimeout(( ) =>{
  console.log(p1) // 其 priomiseStatus 为 fulfilled
})

const p2 = Promise.resolve().then(()=>{
  throw new Error("then error")
})
p2.then(() =>{
  console.log(123)
}).catch((error) => {
  console.log(error) // 这里会执行打印，
})
setTimeout(() => {
  console.log(p2) // 其 PromiseState 为 rejected
})

const p3 = Promise.reject("my error").catch((err) => {
  console.log(err)
})
setTimeout(() => {
  console.log(p3) // 其 PromiseState 为 fulfilled
})

const p4 = Promise.reject("my error").catch((err) => {
  throw new Error("go on error")
})
setTimeout(() => {
  console.log(p4) // 其 PromiseState 为  
})

```
#### 2.3.1 实战题目
```javascript
Promise.resolve().then(() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})
// 执行结果 1,3
```

```javascript
Promise.resolve().then(() => {
  console.log(1)
  throw new Error("error2")
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})
// 执行结果 1, 2, 3
```

```javascript
Promise.resolve().then(() => {
  console.log(1)
  throw new Error("error3")
}).catch(() => {
  console.log(2)
}).catch(() => {
  console.log(3)
})
// 执行结果 1, 2
```