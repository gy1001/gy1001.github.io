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
## 3. async/await
* 异步基于 callback hell
* Promise then catch 是链式调用，但也是基于回调函数
* async/await 是同步语法，彻底消灭回调函数

```javascript
const imgUrl1 = 'https://openfile.meizu.com/group1/M00/08/C8/Cgbj0GFESx-Adgf7AAJAq28ULxM401.png680x680.jpg'
const imgUrl2 = 'https://openfile.meizu.com/group1/M00/08/C9/Cgbj0GFESyOAaGwwAAJmcofys_E532.png680x680.jpg'
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
(async function(){
  // img1
  const img1 = await loadImg(imgUrl1)
  console.log(img1.height, img1.width)

  // img2
  const img2 = await loadImg(imgUrl2)
  console.log(img2.height, img2.width)
})()
```
### 3.1 async/await 和 Promise 的关系（重要）
* async/await 是消灭异步回调的终极武器
* 但和 Promise 并不排斥
* 反而，两者是相辅相成
* 执行 async 函数，返回的是 Promise 对象
* await 相当于 Promise 的 then
* try...catch 可以捕获异常，代替了 Promise 的 catch

```javascript
async function fn1(){
  // return 100 // 在 await 中这里相当于 return Promise.resolve(100)
  return Promise.resolve(200)
}
const res1 = fn1() //  执行 async 函数，返回的是一个 Promise 对象
// 执行 async 函数返回的是一个 Promise 对象
console.log(res1) // Promise {<fulfilled>: 200}
res1.then(data => {
  console.log(data) // 200
})


!(async function(){
  const p1 = Promise.resolve(300)
  const data = await p1 // await 相当于 Promise then 
  console.log(data) // 300
})()

!(async function(){
  const data1 = await 400 // 相当于 Promise.resolve(400)
  console.log(data1) // 400
})()

!(async function(){
  const data2 = await fn1()
  console.log(data2) // 200
})()


!(async function(){
  const data3 = Promise.reject("error")
  try{
    const result = await data3
    console.log(result, 111) // 不会执行打印
  }catch(err){
    console.log(err) //  try catch 相当于 promise catch
  }
})()

!(async function(){
  const data4 = Promise.reject("error")
  const result = await data4
  console.log(result) // 不会执行打印
})()
```

### 3.2 异步的本质
* async/await 是消灭异步回调的终极武器
* JS 还是单线程，还得是有异步，还得是基于 Event Loop
* async/await 知识一个语法糖，但这颗糖真香  
```javascript
async function async1(){
  console.log("async1 start") //2
  await async2() 
  console.log("asyn1 end") // 5
}

async function async2(){
  console.log('async2') //3
}

console.log("script start")// 1 
async1()
console.log("script end") // 4

执行顺序：
"script start" => "async1 start" => "async2" => "script end" => "asyn1 end"
```

基于上面代码的一个变种

```javascript
async function async1(){
  console.log("async1 start") 
  await async2() 
  console.log("asyn1 end") 
  await async3()
  console.log("async1 end2")
}

async function async2(){
  console.log('async2') 
}

async function async3(){
  console.log('async3') 
}

console.log("script start")
async1()
console.log("script end")

执行顺序：
"script start" => "async1 start" => "async2" => "script end" => "asyn1 end" => "async3" => "async1 end2"
```

[相关阅读:async/await 原理及执行顺序分析](https://juejin.cn/post/6844903988584775693)

## 4. for...of 异步遍历
* for...in（以及forEach for）是常规的同步遍历
* for...of 常用于异步的遍历

```javascript
function muti(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

const nums = [1,2,3]
nums.forEach(async num => {
  const result = await muti(num)
  console.log(result)
})

// 等待 1s 后，结果一次性全部打印出来，1,4,9
// 因为 forEach 是一个同步遍历，一瞬间全部遍历完
```

如果想实现，依次打印，该怎么实现呢
```javascript
!(async function(){
  for(let index of nums) { 
    const result = await muti(index)
    console.log(result)
  }
})()
// 打印结果
// 依次性，每隔 1s 后，打印出来结果
//  1s 后，打印 1
// 再过 1s 后，打印 4
// 再过 1s 后，打印 9
```
## 5. 宏任务 和 微任务
```javascript
console.log(100)
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)
// 执行顺序：100 =>  400 => 300 => 200
```
### 5.1 什么是宏任务(Macro Task),什么是微任务(Micro Task)
* 宏任务：setTimeout、setInterval, Ajax，DOM事件
* 微任务：Promise async/await
* 微任务的执行时机比宏任务要早(重点)

### 5.2 Event Loop 和 DOM 渲染
* 再次回归一下 Event Loop 的过程
* JS 是单线程的，而且和 DOM 渲染公用一个线程
* JS 执行的时候，得留一些时机提供 DOM 渲染

- Event Loop（**增加 DOM 渲染过程，注意这里不是最终的**）
  - 1. Call Stack 空闲：每次 Call Stack 清空（即每次轮询结束），即同步任务执行完毕
  - 2. 都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染
  - 3. 然后再去触发下一次 Event Loop
```html
<div id="container"></div>

const $p1 = $("<p>一段文字</p>")
const $p2 = $("<p>一段文字</p>")
const $p3 = $("<p>一段文字</p>")
$("#container").append($p1).append($p2).append($p3)
console.log("length", $("#container").children().length) // 3
alert("本次 call stack 结束，DOM 结构已经更新，但是尚未触发渲染")
// alert 会阻断 JS 执行，也会阻断 DOM 渲染，便于查看效果
```
### 5.2 微任务和宏任务的区别
* 宏任务：DOM 渲染后触发，如 SetTimeout
* 微任务：DOM 渲染前触发，如 Promise
* 为什么呢 ？

```html

<div id="container"></div>

const $p1 = $("<p>一段文字</p>")
const $p2 = $("<p>一段文字</p>")
const $p3 = $("<p>一段文字</p>")
$("#container").append($p1).append($p2).append($p3)

// 测试 微任务在 DOM 渲染前触发
Promise.resolve().then(() => {
  console.log("length1", $("#container").children().length) // 3
  alert('Promise then 执行完毕') // DOM 渲染了吗？？？---还没有
})

// 宏任务：DOM 渲染后触发，如 SetTimeout
setTimeout(() => {
  console.log("length2", $("#container").children().length) // 3
  alert('setTimout 执行完毕') // DOM 渲染了吗？？？---已经渲染染了
})
```
#### 5.2.1 从 `Event Loop` 解释，为什么微任务执行更早
* 微任务是 ES6 语法规定的
* 宏任务是浏览器规定的
* Event Loop（**增加 DOM 渲染过程，注意这里与上面的区别**）
  - 1. Call Stack 空闲：每次 Call Stack 清空（即每次轮询结束），即同步任务执行完毕
  - 2. 执行当前的微任务（Micro Task Queue）
  - 3. 尝试 DOM 渲染：都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染
  - 4. 触发 Event Loop：然后再去触发下一次 Event Loop

![img](https://upload-images.jianshu.io/upload_images/18747821-6e2e861f85a40176.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)