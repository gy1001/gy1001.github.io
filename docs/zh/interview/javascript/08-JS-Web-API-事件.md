# JS-Web-API-事件
## 1. 知识点
### 1.1 事件绑定
```javascript
const btn = document.getElementById('btn1')
btn.addEventListener("click", event => {
  console.log("clicked")
})

// 通用的事件绑定
function bindEvent(elem, type, fn){
  elem.addEventListener(type, fn)
}

const a = document.getElementById("link1")
bindEvent(a ,"click", e => {
  e.preventDefault() // 阻止默认行为
  alert("a is clicked")
})

```
### 1.2 事件冒泡
```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
  </div>
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
</body>
<script>
  function bindEvent(elem, type, fn){
    elem.addEventListener(type, fn)
  }
  const p1 = document.getElementById("p1")
  const body = document.body
  bindEvent(p1, "click", event => {
    event.stopPropagation() // 注释这一行，来体会时间冒泡
    alert("激活")
  })
  bindEvent(body, "click", event => {
    alert("body is clicked, 取消")
    alert(event.target)
  })
</script>
```

### 1.3 事件代理
* 代码简洁
* 减少浏览器内存占用
* 但是，不要滥用

```html
<body>
  <div id="div1">
    <a id="a1">a1</a>
    <a id="a2">a2</a>
    <a id="a3">a3</a>
    <a id="a4">a4</a>
  </div>
  <button id="btn1">btn1 我是按钮</button>
</body>
<script>
  const div1 = document.getElementById("dvi1")
  div1.addEventListener("click", e => {
    e.preventDefault()
    const target = e.target
    if(target.nodeName === "A"){
      alert(target.innerHTML)
    }
  })
</script>
```

```javascript
// 升级版的通用事件函数：支持普通事件、事件代理
function bindEvent(ele, type, selector, fn){
  if(!fn){
    fn = selector
    selector = null
  }
  // 注意：这里为什么不用 箭头函数呢？  
  ele.addEventListener(type, (event) => {
    const target = event.target
    if(selector){
      // 这里是事件代理
      if(target.matches(selector)){
        fn.call(target, event)
      }
    } else {
      // 这里是普通的事件绑定
      fn.call(target, event)
    }
  })
}

// 普通代理
const btn1 = document.getElementById("btn1")
// 注意：这里为什么不用 箭头函数呢？
bindEvent(btn1, "click", function(event){
  // 如果用箭头函数这里 this 是 windows
  event.preventDefault() // 阻止默认行为
  alert(this.innerHTML)
})
// 代理绑定
const div1 = document.getElementById('div1')
bindEvent(div1, "click", "a", function(event){
  // 如果用箭头函数这里 this 是 windows
  console.log(this) 
  event.preventDefault()
  alert(this.innerHTML)
})
```

## 2. 题目以及解答

### 2.1 编写一个通用的事件监听函数
如上代码

### 2.2 描述事件冒泡的流程
* 基于 DOM 树形结构
* 事件会顺着触发元素往上冒泡
* 应用场景：代理

### 2.3 无限下拉的图片列表，如何监听每个图片的点击
* 事件代理
* 用 e.target 获取触发元素
* 用 matches 来判断是否是触发元素
