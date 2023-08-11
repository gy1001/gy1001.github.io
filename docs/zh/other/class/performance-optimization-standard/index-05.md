# 05-优化 (经典性能优化解决方案)

## 01：资源的压缩与合并【见效最明显的优化方法】

### 为什么要做压缩和合并

* 减少 http 请求数量

  > 请求越多，资源越多，所在网络造成的开销就越大

* 减少请求资源的大小

  > 节省流量，节省资源的大小，是我们不变的挑战

### HTML 压缩

* 使用在线工具进行压缩
* 使用 html-minifier 等 npm 工具

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd14684a8bff4926a3c654cddfbfd6c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

webpack 去进行 html 压缩时，也是集成了 html-minifier 工具 上图可以看到初始时候的大小，压缩后的大小，节省高达30%，右边也会把压缩选项列出来，想压缩到什么样的情况，根据需要把不同的情况进行勾选或者反选

### CSS 压缩

* 使用在线工具进行压缩

* 使用 clean-css 等npm工具

  > 前面讲的 html-minifier 已经包含了 clean-css

  ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f17e2a7cd1714723b8c29c9723f8c21a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### JS 压缩与混淆

* 使用在线工具进行压缩

* 使用Webpack对JS在构建时压缩

  > 压缩的同时做了混淆，所谓混淆，就是把它原来的变量名或者表达变成很难让别人理解的形式，也达到了安全的一个目的

### CSS JS文件合并

[什么是 TTFB, 为什么 TTFB 很重要](https://blog.csdn.net/YITA90/article/details/100764662)

把若干资源合并成一个资源把它加载过来，这样比较快，在网络上可以达到节省的目的，比如有20个css，合成一个css一次性加载过来可能要比你20个分别加载要快，因为每个资源在请求时都要经历不同的阶段，要进行 dns 查找，tcp 链接建立，这两个可以复用，我们后面 TTFB 还有下载没有办法避免，下载20个资源分别下载和合成一个下载的下载量没什么变化，这个不考虑，但是 TTFB 没办法避免，20个肯定要比1个稍微大一些，但是合并在一起带来的问题是后续的解析处理和你自己的维护带来了一些麻烦，所以折中考虑一下问题

* 若干小文件，Maybe...

* 无冲突，服务相同的模块，OK

* 优化加载，No

  > 现在希望渐进式加载如果把 css 和 js 都合成一个，这两个文件只有加载和解析完才能进行渲染，这个时间会很长，用户会看到很长时间的白屏
  >
  > 我们现在会用很多缓存技术，如果文件全合成一个，其中修改了一点点会造成整个文件的过期，就需要缓存去重新的进行更新，这也是极大的效率上的浪费

## 02：图片格式优化【多种图片格式，哪种最合适】

### 图片优化的方案

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6609c22523db44dc902865074a3b1c6f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**如何正确选择图片格式？**

不同的格式有不同的优缺点，在不同场景中使用特定的图片会有一定的优势

**图片的大小要选择合适**，不要传一个过大的图片到客户端，然后再去进行尺寸大小的调整，这样过大的图片在网络上是一个浪费，需要多大就传多大的图片 能适配不同屏幕的尺寸，我有不同的用户屏幕，要去设计不同尺寸的图片在不同屏幕上进行显示，保证在每个显示器上都有合适尺寸的图片来进行合适的显示

**压缩**：对于图片压缩，一定要谨慎，当对图片进行压缩时对图片的质量也造成一定的损失，我们要根据我们网站的实际情况来看，摄影类网站图片要追求精致感，电商网站追求图片不高

**图片资源优先级**：重要的图片先进行加载, 图片懒加载

**用一些工具**：所有做的事情都不能手工去做，要有自动化的解决方案，要利用一些工具帮我们做这些事

### 图片格式比较

#### JPEG/JPG 的优点

**很高的压缩比**，画质还可以很好的被保存，色彩还是极为丰富 用得最多的一种图片格式，它是一种有损压缩的图片，这个图片它进行了很好的压缩，来减少本身的体积，

**本身的色彩感还很好**，压缩比很高，色彩还保存了很好，通常压缩比达到 50% 时，还能保持 60% 的画质，所以 jpg 会经常用于 web 开发中，通常采用24位的存储方式，2的24次方，大约是1万6千种颜色，所以画质色彩感非常好，下图是专门对jpg图片进行压缩的工具

[https://github.com/imagemin/imagemin](https://github.com/imagemin/imagemin)

![(在这里插入图片描述)](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c12c2825a744b92bac2ba3ef8de95d2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### JPEG/JPG 的使用场景

当需要展示比较大的图片时，还想保留画质和色彩

#### JPEG/JPG 的缺陷

如果图片比较强调纹理或者边缘，jpg 不是特别合适，显得有锯齿感，或者很模糊，比如 logo 不会用 jpg，会把边缘表现得特别粗糙

#### PNG 的优点

可以做透明背景的图片，最大的优点是对jpg图片的缺点进行弥补

#### PNG 的使用场景

想强调线条、纹理、边缘这些细腻程度时，jpg做不好，png做得比较好

#### PNG 的缺陷

因为保留了这些比较细节的东西，所以本身体积相对会较大些，色彩上 jpg 和png 是不相上下，因为 png 也有24位的格式，色彩丰富程度也是没问题的，所以经常用 png 做一些小的图片，比如图标，logo 之类的，如果想对 png 的图片进行优化，可以用下图中的工具，通常 quality 设置在65%-80%之间是比较好的，这样可以达到对图片 80% 的压缩比率，也能保证图片的质量

[https://github.com/imagemin/imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)

#### WebP 的优点

google 提出的新的图片格式,已经推了几年，普及程度不是特别高，跟 png 能有同样的质量，但是压缩比率比 png 要高，也就是说体积可以更小

png 压缩到10kb，WebP 可以压缩到7，8kb，这差距不是特别明显

#### 支持 WebP 的浏览器

WebP也要看下浏览器的兼容性，毕竟它不是一个标准，是google自己一家提出的，其他浏览器上不会特别支持（兼容性不太好，谨慎酌情使用）

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/475e20fe49f64958a7a4a8019b01f0b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### svg 图片应用也非常广泛，有非常多的优势适合我们手机端进行应用

## 03： 图片加载优化【突破大型网站图片加载的瓶颈】

### 图片的懒加载（lazy loading）

* 原生的图片懒加载方案

  > 需要浏览器去进行支持，自定义及可扩展性不是特别好，还是需要第三方插件帮我吗实现这些效果

  ```html
  <img 
    loading="lazy" 
    src="https://p3-passport.byteacctimg.com/img/user-avatar/43a4a02d442924332f918490d38ff173~300x300.image"
  />
  ```
  
  ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0f615db46124ad1b6533bd765e4b8ba~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
  
* 第三方图片懒加载方案

  * [https://github.com/verlok/vanilla-lazyload](https://github.com/verlok/vanilla-lazyload)

  * [https://github.com/malchata/yall.js](https://github.com/malchata/yall.js): 一个快速、灵活、小巧的 SEO 友好的懒加载器。

  * [https://github.com/dinbror/blazy](https://github.com/dinbror/blazy)

    > bLazy是一个轻量级, **`滚动懒加载图片的JavaScript库`**, 使用纯JavaScript编写, 不依赖任何第三方JavaScript库(如jQuery等). bLazy支持所有的主流浏览器, 包括IE7及以上版本.

  * [https://github.com/Aljullu/react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component)

    > * 示例网站(demo) [www.albertjuhe.com/react-lazy-load-image-component](https://link.juejin.cn/?target=https%3A%2F%2Fwww.albertjuhe.com%2Freact-lazy-load-image-component%2F)

    ```javascript
    import {LazyLoadImage} from 'react-lazy-load-image-component';
    <LazyLoadImage
      className={this.props.classes.media}
      src={this.props.image}
      effect="blur"
      rel="preconnect"
    />
    ```

### 使用渐进式图片

图片不是一步到位就能加载出来的，刚开始图片不是特别清楚，逐渐变清楚些，到最后变成非常清楚的图片，这实现的基础得益于jpg本身格式的特点，

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e077bfbf81ab4cc2b2fc6e983a4881cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**基线 jpg**，自上而下的行扫描的形式

**渐进式 jpg**，会从低像素到高像素的一个过程

这个图片可以和美工要，他们在图片制作和保存的时候实际上可以选择这样的格式

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faa32b3aa91f4de38937169f31b7bd35~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 渐进式图片的优点和不足

> 主要优点始终可以让用户看到图片的全貌，只不过刚开始不太清晰，然后逐渐把它加载得更清楚，等待的时间和图片本身的质量和大小是有关系的

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dc4295e95bf40cb9c415b264076cbd7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 渐进式图片的解决方案

> 可以用这些工具生成我们需要的图片，我们要自己帮自己

* [https://github.com/ccforward/progressive-image](https://github.com/ccforward/progressive-image)
* [https://github.com/ImageMagick/ImageMagick](https://github.com/ImageMagick/ImageMagick)
* libjpeg
* jpegtran
* jpeg-recompress
* imagemin

### 使用响应式图片

[响应式图片srcset属性解析](https://zhuanlan.zhihu.com/p/197567126)

[响应式图片之srcset & sizes详讲](https://juejin.cn/post/6844903922109267976)

所有设备所有的屏幕尺寸进行适配，不同的屏幕尺寸上都有一张合适的图片给用户达到最佳的视觉体验，如何做？肯定不希望用一张超大的图加载到所有设备上，然后再根据屏幕尺寸去进行缩放，这会造成浪费，而且在手机端网络情况本来不是特别好

```html
<img 
  srcset="elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" 
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" 
/>
```

注意格式要对：每一行都有不同的属性值，每个属性值之间都有逗号分隔

#### Srcset属性的使用：提供多图像源

> srcset 属性用于浏览器根据宽、高和像素密度来加载相应的图片资源。

属性格式：图片地址 宽度描述w 像素密度描述x，多个资源之间用逗号分隔。例如：

```html
<!-- 格式1：图片源地址 空格 图片像素宽度[, 图片源地址 空格 图片像素宽度, ...] -->
<img src="small.jpg " srcset="big.jpg 1440w, middle.jpg 800w, small.jpg 1x" />
```

上面的例子表示浏览器宽度达到 800px 则加载 middle.jpg ，达到 1400px 则加载 big.jpg。注意：像素密度描述只对固定宽度图片有效。

**千万注意：描述图片的像素宽度是用'w'单位，且一定要是图片的真实像素宽度，如果私自改动，那么会影响浏览器对图片的选择！**

```html
<!-- 格式2：图片源地址 空格 屏幕像素密度[, 图片源地址 空格 屏幕像素密度, ...] -->
<img 
  src="/static/flamingo-fallback.jpg"
  srcset="
  /static/flamingo4x.png 4x,
  /static/flamingo3x.png 3x,
  /static/flamingo2x.png 2x,
  /static/flamingo1x.png 1x " >
```

如果当前设备的像素比是1，则会显示图片`/static/flamingo1x.png`，通过缩放页面，当把页面放大到 200% 时，可以看到的当前显示的图片为已经被更新为`/static/flamingo2x.png`。

#### Sizes属性的使用：用媒体查询方法来指定图像宽度

定义了一组媒体条件（屏幕的宽度），以上边为例，当屏幕的宽度小于480px的时候，图像将填充的槽的宽度是440px。

##### 所以，有了这些属性，浏览器会：

- 查看设备宽度
- 检查sizes列表中哪个媒体条件是第一个为真
- 查看给予该媒体查询的槽大小
- 加载srcset列表中引用的最接近所选的槽大小的图像

```html
<!-- 属性格式：媒体查询 宽度描述（支持px），多条规则用逗号分隔。-->
<img src="images/gun.png"
  srcset="images/bg_star.jpg 1200w, images/share.jpg 800w, images/gun.png 320w"
  sizes="(max-width: 320px) 300w, 1200w" />
```

上面的例子表示浏览器视口为 320px 时图片宽度为 300px，其他情况为 1200px。

#### picture的使用

根据屏幕匹配的不同尺寸显示不同图片，如果没有匹配到或浏览器不支持 picture 属性则使用 img 元素：

```html
<picture>
  <source media="(min-width: 650px)" srcset="demo1.jpg">
  <source media="(min-width: 465px)" srcset="demo2.jpg">
  <img src="img_girl.jpg">
</picture>
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5062f5d83ad48c091faed9abc261ca3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 04：【讨论题】大家讨论一下图片加载的优化

## 05：字体优化【千万不可忽略】
