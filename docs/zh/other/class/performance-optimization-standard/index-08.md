# 08-前沿优化解决方案

## 01: 拯救移动端图标SVG【拯救移动端图标】

常见的字体方案经历了三种：PNG、Iconfont、SVG。

### （一）PNG

先说说PNG，是比较早的方案了。PNG 属于一种图片格式，颜色丰富、边缘平滑，而且还支持透明度，所以最早被设计师作为 Icon 输出的格式，从而沿用到前端代码中；但这种图片icon也存在很大的缺陷：

1. 尺寸问题，必须关注图片的宽高、比例，以免导致失真、变形。
2. 请求数量和体积问题，多个图片Icon需要通过雪碧图等技术来规避请求数量，而雪碧图的应用还需要关心icon的定位。
3. 灵活性，比较难以使用CSS3中的一些属性，效果不佳。比如：hover、阴影、transform、filter

### （二）Iconfont

> [iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)、[IcoFont](https://icofont.com/)、[Font Awesome](http://www.fontawesome.com.cn/faicons/)

**Iconfont 相较于 PNG 的优势：**

* 多个图标使用一套字体，减少获取时的请求数量和体积

  > 因为网站会有很多图标，如果使用 PNG，每个图标都需要单独设计一个文件，这样浏览器就需要对每一个文件进行加载。虽然可以使用雪碧图来规避请求数量，但是这就需要关心 icon 的定位了。
  >
  > iconfont 就是一套字体，就只需要获取一套字体即可

* 矢量图形，可伸缩

* 可以直接通过 CSS 修改样式（颜色、大小等）

  > PNG 需要关注图片的宽度、比例，以避免失真、变形

**Iconfont 缺陷：**

* Iconfont 很难做到多色（自定义复杂颜色）
* 浏览器和搜索引擎很难理解这个字体图标代表什么意思

**Iconfont 背后原理是怎样的呢？**

1. 将Icon制作成字体文件

2. 字符是如何被计算机渲染的？

   > 通过 i 标签（比较常见），并设置 class 来添加伪元素，而伪元素的值为字体文件中的字形编码，浏览器通过字形编码找到字符并渲染出来的。

**字符是如何被计算机渲染的？**

 绝大多数的字体都包含一个或多个Charmap，它的作用是就是把一个字符从它的字符编码印射到字形索引。

 一般一个字符的渲染过程是这样的：

1. 加载字体文件
2. 确定要输出的字体大小
3. 输入这个字符的编码值
4. 根据字体文件中的 Charmap，把编码值转换成字形索引（就是这个字符对应字体文件中的第几个形状）
5. 根据索引从字体中加载这个字形
6. 将这个字形渲染成位图，有可能进行加粗、倾斜等变换。

### (三）SVG

**SVG 的优点：**

1. 作为普通的页面元素，更具语义化， XML语法，搜索引擎SEO 和 无障碍读屏软件读取
2. 独立的矢量图形，足够灵活
3. 保持图片能力，支持多彩色图标
4. 节省体积（Iconfont 往往需要一整套字体）

这里在 **React** 中使用 **svg-sprite-loader** 对 **svg** 进行处理

* 首先采用 **@svgr/webpack** 支持 svg 作为组件引用

  ```shell
  npm install -D @svgr/webpack
  ```
  
* 之后在 **webpack.config.js** 里配置即可

  ```javascript
  module.exports = smp.wrap({
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
  })
  ```

* 在页面里直接当**组件**使用

  ```react
  class About extends Component {
    render() {
      return (
        <main className={this.props.classes.root}>
          <AddressCardSvg width={100} color={'#fa1010'}/>
        </main>
      )
    }
  }
  ```

## 02: 使用 FlexBox 优化布局

> 布局经历了几种方案：table布局、传统布局（float、position、display、盒模型）、flex布局、grid布局。
>
> table布局已经彻底淘汰了，传统布局PC端还有一些使用，尤其是CSS响应式；相较于最新的Grid、Flex来说，兼容性最好，但是效率最低，开发起来比较麻烦。
>
> 当下用的最多的是 flex布局 和 grid布局。
>
> flex布局 移动端用的特别多，学习成本低，开发效率高，兼容性也还不错，它依据某个轴布局，可以看做是一维布局。
>
> grid布局 在水平垂直两个方向上同时控制，可以称之为二维布局。Grid布局 非常强大，但概念也最多，学习成本高一些，兼容性不如flex。

我们设置元素的 display: flex，这个元素就会变成 flex 容器

### Flexbox 优势

* 更好性能的实现方案：使用 Flexbox 布局在 Layout 和 Paint 耗时小于其他布局方式
* 容器可以决定子元素的几何属性：大小、顺序、对齐方式、间隔等
* 双向（横向、纵向）布局

## 03: 优化资源加载的顺序【给资源设置优先级】

使用 `Preload` 和 `Prefetch` 改变浏览器默认的资源加载优先级

### 资源优先级

* 浏览器默认安排资源加载优先级
* 使用 `preload` 和 `prefetch` 调整优先级

### Preload

> 提前加载较晚出现，但对当前页面非常重要的资源
>
> 对于字体而言比较特殊，需要设置 **crossorigin="anonymous"**

```html
<link rel="preload" href="test.jpg" as="image" />
<link
  rel="preload"  
  href="https://xxx.com/v15/LYjAdGP8kkgoTec8zkRgqBgxXsWsMfnCm1_q1j3gcsptb8OMg_Z2HVZhDbPBCIyx.119.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

### Prefetch

> 提前加载后续路由需要的资源，优先级低
>
> 包括资源预加载、DNS预解析、http预连接和页面预渲染。

资源预加载：`<link rel="prefetch" href="test.css">`

DNS预解析：`<link rel="dns-prefetch" href="//haitao.nos.netease.com">`

http预连接：`<link rel="prefetch" href="//www.kaola.com">` 将建立对该域名的TCP链接

页面预渲染：`<link rel="prerender" href="//m.kaola.com">` 将会预先加载链接文档的所有资源

### 那么 Prefetch 和 Preload有什么区别呢？

具体来讲，Preload来告诉浏览器预先请求当前页需要的资源，从而提高这些资源的请求优先级。比如，对于那些本来请求优先级较低的关键请求，我们可以通过设置 Preload 来提升这些请求的优先级。

Prefetch 来告诉浏览器用户将来可能在其他页面（非本页面）可能使用到的资源，那么浏览器会在空闲时，就去预先加载这些资源放在http缓存内，最常见的dns-prefetch。比如，当我们在浏览A页面，如果会通过A页面中的链接跳转到B页面，而B页面中我们有些资源希望尽早提前加载，那么我们就可以在A页面里添加这些资源Prefetch，那么当浏览器空闲时，就会去加载这些资源。

所以，对于那些可能在当前页面使用到的资源可以利用 Preload ，而对一些可能在将来的某些页面中被使用的资源可以利用 Prefetch 。如果从加载优先级上看，Preload 会提升请求优先级；而 Prefetch 会把资源的优先级放在最低，当浏览器空闲时才去预加载。

资源加载优先级可以放在首屏资源优化中，通过首屏那一帧找出对应的关键请求链，然后调整这些资源的加载优先级可以提高首屏加载速度。

另外，首屏速度也可以基于关键请求链做文章，从 Localstorage、缓存等角度着手

### 总结：

对于那些在当前页面使用的资源可以利用 Preload，而对一些可能在将来某些页面中使用的资源可以利用 Prefetch。从加载优先级上看，Preload 会提升请求优先级，而 Prefetch 会把资源的优先级防止最低，当浏览器空闲时采取加载

webpack 提前预加载处理，只需要加上一行注释

```javascript
import(/* webpackPrefetch: true */ './path/to/LoginModal.js')
import(/* webpackPreload: true */ 'ChartingLibrary')
```

## 04: 预渲染页面【提前完成任务的意义】

[vue项目配置预渲染](https://juejin.cn/post/7022890151567179784)

> 预渲染页面有点类似于我们使用的**服务端渲染**（SSR），通过这项技术可以帮助我们在打包的时候将单页应用的页面进行提前渲染，这样可以加快用户看到首屏的时间

### 预渲染的作用：

* 大型单页应用的性能瓶颈：

  > **JS 下载 + 解析 + 执行**

* SSR 主要问题

  > 牺牲 TTFB 来补救 First Paint，相当于给后台增加了任务量。
  >
  > 并且由于很多插件都是基于前端渲染的，即使有 Next.js等技术,SSR 实现起来还是比较复杂

* Pre-rendering（预渲染）

  > **针对首屏优化，打包时提前渲染页面，没有服务端参与**

下面以 **react-snap** 插件为例进行介绍

> [https://github.com/stereobooster/react-snap](https://github.com/stereobooster/react-snap)

首先，先对插件进行安装

```shell
npm install -D react-snap
```

然后在 **package.json** 中增加一条 scipts，这里可以通过 npm 一个钩子函数，在 build 完成后，自动触发 **postbuild**

> **npm提供了两种钩子**，**pre**和**post**，分别代表操作前和操作后。比如
>
> "prebuild" "build" "postbuild" ------------- "preinstall" "install" "postinstall"
>
> 当执行npm run build的时候，会按序执行npm run prebuild && npm run build && npm run postbuild。

```javascript
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack",
    "postbuild": "react-snap"
  }
}
```

如果使用 **react** 做 SSR，它会对页面渲染进行修改，通常使用 **ReactDOM.render**，对主节点上相关元素进行渲染，如果主节点已经有元素了，就不需要触发 **ReactDOM.render**

```javascript
let root = document.getElementById('main')
 
if (root.hasChildNodes()) {
  ReactDOM.hydrate(<App />, root)
} else {
  ReactDOM.render(<App />, root)
}
```

最后，在 **package.json** 中，可以配置内联样式，避免明显的**样式闪动（FOUC）**

```javascript
"reactSnap": {    
  "inlineCss": true, // 内联样式，避免明显的样式闪动 
}
```

## 05: Windowing提高列表性能【开源节流，用什么画什么】

## 06: 使用骨架组件减少布局移动【论占位置的重要性】
