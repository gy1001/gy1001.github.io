# 手写简易 router

## JavaScript 部分
```javascript
const oriPushState = history.pushState
// 重写pushState
history.pushState = function (state, title, url) {
  // 触发原事件
  oriPushState.apply(history, [state, title, url])
  // 自定义事件
  var event = new CustomEvent('c-popstate', {
    detail: {
      state,
      title,
      url,
    },
  })
  window.dispatchEvent(event)
}

//  <c-link to="/" class="c-link">首页</c-link>
class CustomLink extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (ev) => {
      ev.preventDefault()
      const to = this.getAttribute('to')
      // 更新浏览器历史记录
      history.pushState('', '', to)
    })
  }
}
window.customElements.define('c-link', CustomLink)

// 优先于c-router注册
//  <c-route path="/" component="home" default></c-route>
class CustomRoute extends HTMLElement {
  #data = null
  getData() {
    return {
      default: this.hasAttribute('default'),
      path: this.getAttribute('path'),
      component: this.getAttribute('component'),
    }
  }
}
window.customElements.define('c-route', CustomRoute)

// 容器组件
class CustomComponent extends HTMLElement {
  async connectedCallback() {
    console.log('c-component connected')
    // 获取组件的path，即html的路径
    const strPath = this.getAttribute('path')
    // 加载html
    const cInfos = await loadComponent(strPath)
    const shadow = this.attachShadow({ mode: 'closed' })
    // 添加html对应的内容
    this.#addElements(shadow, cInfos)
  }

  #addElements(shadow, info) {
    // 添加模板内容
    if (info.template) {
      shadow.appendChild(info.template.content.cloneNode(true))
    }
    // 添加脚本
    if (info.script) {
      // 防止全局污染，并获得根节点
      var fun = new Function(`${info.script.textContent}`)
      // 绑定脚本的this为当前的影子根节点
      fun.bind(shadow)()
    }
    // 添加样式
    if (info.style) {
      shadow.appendChild(info.style)
    }
  }
}
window.customElements.define('c-component', CustomComponent)

//  <c-router>
class CustomRouter extends HTMLElement {
  // 私有变量
  #routes
  connectedCallback() {
    // const shadow = this.attachShadow({ mode: "open" });
    const routeNodes = this.querySelectorAll('c-route')
    // debugger;
    console.log('routes:', routeNodes)

    // 获取子节点的路由信息
    this.#routes = Array.from(routeNodes).map((node) => node.getData())
    // 查找默认的路由
    const defaultRoute = this.#routes.find((r) => r.default) || this.#routes[0]
    // 渲染对应的路由
    this.#onRenderRoute(defaultRoute)
    // 监听路由变化
    this.#listenerHistory()
  }

  // 渲染路由对应的内容
  #onRenderRoute(route) {
    var el = document.createElement('c-component')
    el.setAttribute('path', `/${route.component}.html`)
    el.id = '_route_'
    this.append(el)
  }

  // 卸载路由清理工作
  #onUnloadRoute(route) {
    this.removeChild(this.querySelector('#_route_'))
  }

  // 监听路由变化
  #listenerHistory() {
    // 导航的路由切换
    window.addEventListener('popstate', (ev) => {
      console.log('onpopstate:', ev)
      const url = location.pathname.endsWith('.html') ? '/' : location.pathname
      const route = this.#getRoute(this.#routes, url)
      this.#onUnloadRoute()
      this.#onRenderRoute(route)
    })
    // pushState或者replaceState
    window.addEventListener('c-popstate', (ev) => {
      console.log('c-popstate:', ev)
      const detail = ev.detail
      const route = this.#getRoute(this.#routes, detail.url)
      this.#onUnloadRoute()
      this.#onRenderRoute(route)
    })
  }

  // 路由查找
  #getRoute(routes, url) {
    return routes.find(function (r) {
      const path = r.path
      const strPaths = path.split('/')
      const strUrlPaths = url.split('/')

      let match = true
      for (let i = 0; i < strPaths.length; i++) {
        if (strPaths[i].startsWith(':')) {
          continue
        }
        match = strPaths[i] === strUrlPaths[i]
        if (!match) {
          break
        }
      }
      return match
    })
  }
}
window.customElements.define('c-router', CustomRouter)

// 动态加载组件并解析
async function loadComponent(path, name) {
  this.caches = this.caches || {}
  // 缓存存在，直接返回
  if (!!this.caches[path]) {
    return this.caches[path]
  }
  const res = await fetch(path).then((res) => res.text())
  // 利用DOMParser效验
  const parser = new DOMParser()
  const doc = parser.parseFromString(res, 'text/html')
  // 解析模板，脚本，样式
  const template = doc.querySelector('template')
  const script = doc.querySelector('script')
  const style = doc.querySelector('style')
  // 缓存内容
  this.caches[path] = {
    template,
    script,
    style,
  }
  return this.caches[path]
}
```
## HTML 测试示例

### 主页面
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>index</title>
    <style>
      .flex {
        display: flex;
      }

      .menu-x {
        flex: 0 0 200px;
      }

      .menu-x li {
        cursor: pointer;
      }

      .c-link {
        display: block;
        cursor: pointer;
      }

      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <div class="product-item">测试的产品</div>
    <div class="flex">
      <ul class="menu-x">
        <c-link to="/" class="c-link">首页</c-link>
        <c-link to="/about" class="c-link">关于</c-link>
      </ul>
      <div>
        <c-router>
          <c-route path="/" component="home" default></c-route>
          <c-route path="/detail/:id" component="detail"></c-route>
          <c-route path="/about" component="about"></c-route>
        </c-router>
      </div>
    </div>

    <script src="./router.js"></script>
  </body>
</html>
```
### 首页 home.html
```html
<template>
  <div>商品清单</div>
  <div id="product-list">
    <div>
      <a data-id="10" class="product-item c-link">香蕉</a>
    </div>
    <div>
      <a data-id="11" class="product-item c-link">苹果</a>
    </div>
    <div>
      <a data-id="12" class="product-item c-link">香蕉</a>
    </div>
  </div>
</template>

<script>
  let container = this.querySelector('#product-list')
  console.log('this:', this)
  // 演示代码触发更新历史
  // 事件代理
  container.addEventListener('click', function (ev) {
    console.log('item clicked')
    if (ev.target.classList.contains('product-item')) {
      const id = +ev.target.dataset.id
      history.pushState(
        {
          id,
        },
        '',
        `/detail/${id}`,
      )
    }
  })
</script>

<style>
  .product-item {
    cursor: pointer;
    color: blue;
  }
</style>
```

### 关于：about.html
```html
<template>
   About me!
</template>
```

### 详情：detail.html
```html
<template>
  <div>商品详情</div>
  <div id="detail">商品ID:<span id="product-id" class="product-id"></span></div>
</template>

<script>
  this.querySelector('#product-id').textContent = history.state.id
</script>

<style>
  .product-id {
    color: red;
  }
</style>
````
### 启动方式
1. 可以使用 http-server (这里使用 全局安装)
> 安装命令： npm install -g http-server
2. 在文件夹中打开终端，运行如下命令
> http-server
3. 按照提示打开访问地址即可进行验证