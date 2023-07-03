# mini-vue-router

[vueRouter 实现原理解析（从零实现一个简易版的 vueRouter）](https://blog.csdn.net/weixin_42707287/article/details/121019812)

## JavaScript 部分

```javascript
let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 判断插件是否注册过，如果未注册，走注册流程
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 用一个变量存储一下Vue, 方便后面在其他函数中使用
    _Vue = Vue
    // Vue.prototype.$router = this.$options.router
    // 为什么不能直接在Vue的原型对象上挂载$router呢，因为在当前函数中，this指向的是并不是vue实例，故this.$options是不存在的
    // 故我们通过混入的形式，在 vue 实例的 beforeCreate生命周期中去给vue原型添加$router
    Vue.mixin({
      beforeCreate() {
        if (Vue.prototype.$router) {
          return
        }
        Vue.prototype.$router = this.$options.router
      },
    })
  }

  constructor(options) {
    this.mode = options.mode || 'hash'
    // 实现routerMap（用于存储路由与组件的映射关系）
    this.routerMap = {}

    this.createRouteMap(options.routes || [])

    // 定义一个响应式对象，当后续current的值发生变化时，vue可以监测到
    this.data = _Vue.observable({
      current: this.mode === 'history' ? '/' : '#/', // 存放当前url地址
    })

    // 注册全局组件
    this.initComponent()
  }

  createRouteMap(routes, parentPath) {
    if (routes && routes.length && routes.length > 0) {
      routes.forEach((item) => {
        let currentPath = ''
        if (parentPath && item.path.indexOf('/') === -1) {
          currentPath = `${parentPath}/${item.path}`
        } else {
          currentPath = item.path
        }
        this.routerMap[currentPath] = item.component
        if (item.children && item.children.length > 0) {
          this.createRouteMap(item.children, currentPath)
        }
      })
    }
  }

  initComponent() {
    // 初始化router-link组件
    this.initLink()

    // 初始化router-view组件
    this.initView()
    // 注册事件
    this.initEvent()
  }

  initLink() {
    const that = this
    _Vue.component('router-link', {
      props: {
        to: String,
      },
      render(h) {
        return h(
          'a',
          {
            attrs: { href: this.to },
            on: {
              click: this.locationHref,
            },
          },
          [this.$slots.default],
        )
      },
      methods: {
        locationHref(e) {
          // 阻止a标签默认事件，这里需要阻止a标签的href跳转，因为a标签的href跳转是会让浏览器直接向服务器去发送请求的
          e.preventDefault()
          if (that.mode === 'history') {
            that.data.current = this.to
            window.history.pushState({}, '', this.to)
          } else {
            window.location.hash = `#${this.to}`
            that.data.current = `#${this.to}`
          }
        },
      },
    })
  }

  initView() {
    const that = this
    _Vue.component('router-view', {
      render(h) {
        // 从路由表中获取当前path对应的component组件
        let component = null
        if (that.mode === 'history') {
          // hash 模式下，截图#后面的地址作为path路径，然后再去路由表中匹配对应的组件
          component = that.routerMap[that.data.current]
        } else {
          // hash 模式下，截图#后面的地址作为path路径，然后再去路由表中匹配对应的组件
          const path = that.data.current.slice(1, that.data.current.length)
          component = that.routerMap[path]
        }
        // 渲染对应的组件
        return h(component)
      },
    })
  }

  initEvent() {
    if (this.mode === 'history') {
      window.addEventListener('load', () => {
        this.data.current = location.pathname || '/'
      })
      window.addEventListener('popstate', () => {
        this.data.current = location.pathname
      })
    } else {
      //  页面首次加载时，加载当前路由对应的组件
      window.addEventListener('load', () => {
        // 如果没有hash符，添加hash符
        this.data.current = location.hash || '#/'
      })
      window.addEventListener('hashchange', () => {
        this.data.current = location.hash || '#/'
      })
    }
  }
}
```

### 注意

1. Vue.use(VueRouter) 需要放在前面，后续依赖 `_Vue` 变量，否则会报错
2. 其中使用 `_Vue.observable` 声明一个响应式变量 `current`, 实现 只需要改变这个变量，视图自动更新
3. hash 模式使用 `window.addEventListener('hashchange', fn)`, history 模式使用 `window.addEventListener('popstate', fn)`
4. 首次加载也需要进行处理 `window.addEventListener('load', fn)`, 在此函数中进行`current` 的更新，视图会自动更新
