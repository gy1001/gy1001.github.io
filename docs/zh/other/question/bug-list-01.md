# 工作中遇到的问题

## 1.移动端下载图片调研
### 1.1 下载 app 安装包文件处理方式
> 直接打开下载地址即可

```javascript
window.location.href = this.phoneIos() ? this.iosUrl : this.androidUrl
```

### 1.2 下载图片处理方式
> 上述方案显然并不适用于图片，需要进行特殊处理
#### 1.2.1 参考示例: `w3cschool 官方demo`,[点击跳转](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download)
> 本例子中使用到了 a 标签的 download 属性，在移动端并不适用

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>The a download attribute</h1>
    <p>Click on the image to download it:</p>
    <p>
      <a href="/images/myw3schoolsimage.jpg" download>
        <img
          src="/images/myw3schoolsimage.jpg"
          alt="W3Schools"
          width="104"
          height="142"
        />
      </a>
    </p>
    <p>
      <b>Note:</b> The download attribute is not supported in IE or Edge (prior
      version 18), or in Safari (prior version 10.1).
    </p>
  </body>
</html>
```

#### 1.2.2 移动端事件示例
> 这里模拟了点击下载文件流来实现下载功能。

**优点：**
1. pc 端可以，手机端也可以

**缺点**：
1. 造成多次请求
2. 下载时会弹出确认框提示用户下载，提示框样式根据不同系统浏览器样式各异

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>下载功能</title>
  </head>
  <body>
    <button onclick="downloadImg()">点击下载</button>
  </body>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    function downloadImg () {
      axios({
        url:
          'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F6a600c338744ebf8ac3c831d1f102a206159a7bc.jpeg%3Ftoken%3D5904c74637643eb48f22f122a8f0dcfd&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1663952400&t=160148750bd29807d88bc0c804e41f85', //URL,根据实际情况来
        method: 'get',
        responseType: 'blob'
      }).then(function (response) {
        const link = document.createElement('a')
        let blob = new Blob([response.data], { type: response.data.type })
        let url = URL.createObjectURL(blob)
        link.href = url
        link.download = `实际需要的文件名.${response.data.type.split('/')[1]}`
        link.click()
        document.body.removeChild(link)
      })
    }
  </script>
</html>
```

3. 其他方案
> 点击按钮生成一张海报，然后提示用户长按进行保存

## 2. 使用 `webpack-theme-color-replacer` 来实现主题切换不生效
### 2.1 问题描述：
1.  使用 [d2Admin 框架](https://d2.pub/d2-admin-start-kit/preview/#/index)
2.  原项目 `router` 使用 `hash` 模式可以实现主题色的切换作用
3.  本地项目 clone 后使用 `history` 模式发现 刷新后 主题色切换失灵

### 2.2 解决办法
1. 可以使用 `hash`模式即可
> 原版是通过 hash 加载
2. 或者 想使用 `history` 模式，可以做如下更改
> injectCss 参数设置为 true，通过 js 注入，这样就不会加载不到生成的样式
> npm 文档： injectCss： Optional. Changing css selectors, in order to raise css priority, to resolve lazy-loading problems.

```javascript
// 生成仅包含颜色的替换样式（主题色等）
new ThemeColorReplacer({
  fileName: 'style/theme-colors.[contenthash:8].css',
  matchColors: [
    ...forElementUI.getElementUISeries(appConfig.themeColor), // element-ui主色系列
    '#0cdd3a', // 自定义颜色
    '#c655dd'
  ],
  changeSelector: forElementUI.changeSelector,
  isJsUgly: process.env.NODE_ENV === 'production' ? true : undefined,
  injectCss: true // 加上这一行,其他不变
})
```

### 参考链接

[webpack-theme-color-replacer 路由跳转之后，样式丢失](https://blog.csdn.net/qq_27007423/article/details/108093072)

[webpack-theme-color-replacer 插件，实现自定义主题色](https://www.jianshu.com/p/2d39c26c4e9a)

[npm: webpack-theme-color-replacer](https://www.npmjs.com/package/webpack-theme-color-replacer)

## 3. 前端复制方案复盘

> 同事做的已经很全面很详细了，在此借用一下

### 参考链接

[前端复制的三种主流方案，附真机验证和生产代码](https://www.yuque.com/docs/share/22e14fdb-7122-42af-80fe-064f324298b2?#)

## 4. 三方图片资源 403
### 4.1 问题描述

* 直接使用一个三方图片链接，发现显示 403
* 富文本中引用一个 三方图片链接，渲染时候图片不显示

### 4.2 问题原因
* 因为我们的服务器里面的图片并不是自己的，而是从网上找的一些图片链接;
* 403原因：没有权限。 有的服务器图片做了防盗链处理，不允许在别人的网页去获取他们的服务器;
* 404原因：路径错误。 有的图片可能被别人删除、更改域名、服务器、项目停止维护等原因，导致目标资源不存在, 无法获取.

### 4.3 解决办法
* 解决方案：给你的html页面添加meta信息
```html
<meta name="referrer" content="no-referrer" />
```
### 4.4 原理分析
* 原理：别人怎么知道我在使用他的图片呢？ 因为我们网页再发请求的时候，会自动的在referrer中告诉别人服务器我们自己的ip.这样别人服务器就知道这个人不是他们的网站，是其他网站来偷图片。
* 设置no-referrer，别人就不知道我们是谁。就会把我们当成自己人了。
![img](https://img-blog.csdnimg.cn/5838a7c1d3ca4e2d8b9341eece09d1ef.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njg3MzI1NA==,size_16,color_FFFFFF,t_70)

## 5. null 和 undefined 与数值进行比较时的处理
### 5.1 null在比较的时候，是当作0处理的。
![img](https://img-blog.csdnimg.cn/20201217193722160.png)
### 5.2 null 和 数值比较**全等**时候
![img](https://img-blog.csdnimg.cn/20201217193828164.png)
### 5.3 Math.max 中 null 的表现如何？
>这里看得出来，null在这些操作符号中，视作为0。

![img](https://img-blog.csdnimg.cn/20201217194244153.png)

### 5.4 undefined 与数值比较时，不管怎样都是 false 
> undefined进行比较的时候，返回的是NaN，这里很明显是进行了数字转换。我们也对null进行数字转换。
> **可以看出来，null在这些操作API中，应该做了number转换**。

![img](https://img-blog.csdnimg.cn/20201217194046193.png)

### 5.5 其他：空字符表现
> 空字符串与null在数字比较是相同的。

![img](https://img-blog.csdnimg.cn/20201217194738251.png)
### 5.6 undefined与null不同
![img](https://img-blog.csdnimg.cn/20201217195038459.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dkdXRSZXg=,size_16,color_FFFFFF,t_70)
### 5.7 总结
从MDN上可以发现：
> * undefined 是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined 的最初值就是原始数据类型 undefined。
> * 值 null 是一个字面量，不像 undefined，它不是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象。
* undefined 由于是全局的属性，其实是一个对象来处理，而对象进行转换的时候，是当做 NaN。
* 而 null 与空字符串都是字面量，并且都是表示没有数据，在 ascii 码中，都是 000000，所以转换成数据就是0本身。
![img](https://img-blog.csdnimg.cn/20201217201209558.png)

### 参考链接
[JavaScript中的“null”与“undefined“在进行数值比较时，当作0处理?null == 0?](https://blog.csdn.net/gdutRex/article/details/111322781)

## 6. CSS 中的 last-child 和 last-of-type 
### 6.1 last-child
#### 6.1.1 问题描述
> 遇到下面的层级关系，我想实现最后一个的 `demo`类样式特殊设置，比如：实现 第三个 p.demo 为 蓝色,如下写，发现没有生效
```html
<style>
  .demo:last-child{
    color: blue
  }
</style>
<div>
  <p class="demo">1</p>
  <p class="demo">2</p>
  <p class="demo">3</p>
  <p class="demo1">4</p>
</div>
```
#### 6.1.2 问题分析
* .demo:last-child 选择属于其父元素最后一个子元素每个 .demo 元素。看着很懵逼,费解
* .demo:last-child 可以如下理解：选择父节点最后一个子节点，并且与选择器进行匹配， 父节点div的最后一个节点是.demo1，而匹配的选择器是.demo,两者不对应所以匹配不上。
#### 6.1.3 解决办法
1. 把想要使用的类放在父元素的最后一项,结构变为如下
```html
<style>
  .demo:last-child{
    color: blue
  }
</style>
<div>
  <p class="demo">1</p>
  <p class="demo">2</p>
  <p class="demo">3</p>
</div>
<p class="demo1">4</p>
```
2. 如果知道 .demo 节点的长度，可以使用精准匹配
```html
<style>
  .demo:nth-child(3) {
    color: blue
  }
</style>
<div>
  <p class="demo">1</p>
  <p class="demo">2</p>
  <p class="demo">3</p>
  <p class="demo1">4</p>
</div>
```
#### 6.1.4 扩展
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta
    http-equiv="X-UA-Compatible"
    content="IE=edge"
  >
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>last-child</title>
</head>
<style>
  .demo:last-child {
    color: blue;
  }
</style>

<body>
  <h1>last-child</h1>
  <div class="last-child-container">
    <div class="demo1">
      <p class="demo">我是 demo1-1</p>
      <div class="other-demo">我是other-demo-1</div>
    </div>
    <div class="demo2">
      <p class="demo">我是 demo2-1</p>
      <p class="demo">我是 demo2-2-我是蓝色</p>
    </div>
    <div class="demo3">
      <p class="demo">我是 demo3-1</p>
      <p class="demo">我是 demo3-2</p>
      <span class="demo">我是 demo3-3-我是蓝色</span>
    </div>
  </div>
  <div>
    <p class="demo">1</p>
    <p class="demo">2</p>
    <p class="demo">3-我是蓝色</p>
  </div>
  <p class="demo1">4</p>
</body>

</html>
```
### 6.2 last-of-type
> .demo:last-of-type 选择属于其父元素的最后 .demo 元素的每个 .demo 元素。
1. 可以如下理解
:last-of-type是从父节点的子节点中寻找最后一个与选择器相同的子节点，也就是说，这次寻找的并不是最后一个节点，而是每种类型的最后一个元素节点是不是 .demo 
2. 注意：这里的选择的是`每种类型的最后一个元素`
3. 例如下面的例子
```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta
    http-equiv="X-UA-Compatible"
    content="IE=edge"
  >
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>last-of-type</title>
</head>
<style>
  .demo:last-child {
    color: blue;
  }

  .demo:nth-child(3) {
    color: red
  }

  .demo:last-of-type {
    color: blue;
  }
</style>

<body>
  <h1>last-of-type</h1>
  <div class="last-of-type-container">
    <div class="demo1">
      <p class="demo">我是 demo1-1</p>
      <p class="demo">我是 demo1-2</p>
      <p class="demo">我是 demo1-3:我是蓝色</p>
      <div class="demo">我是other-demo-1</div>
      <div class="demo">我是other-demo-2：我是蓝色</div>
      <span class="demo">我是span.demo-1：我是蓝色</span>
    </div>
    <div class="demo2">
      <p class="demo">我是 demo2-1</p>
      <p class="demo">我是 demo2-2：我是蓝色</p>
    </div>
    <div class="demo3">
      <p class="demo">我是 demo3-1</p>
      <p class="demo">我是 demo3-2：我是蓝色</p>
      <span class="demo">我是 demo3-3：我是蓝色</span>
    </div>
  </div>
</body>
```
### 6.3 总结
* :last-child 就像w3c描述的一样他侧重的是最后一个元素
* :last-of-type 侧重的是与之选择器匹配的相同的类型的最后一个

[掘金：:last-child与:last-of-type区别](https://juejin.cn/post/7036556924736765983)