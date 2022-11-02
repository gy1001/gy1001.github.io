# 工作中遇到的问题

## 移动端下载图片调研

### 下载 app 安装包文件处理方式

> 直接打开下载地址即可

```javascript
window.location.href = this.phoneIos() ? this.iosUrl : this.androidUrl
```

### 下载图片处理方式

> 上述方案显然并不适用于图片，需要进行特殊处理

1. 参考示例: `w3cschool 官方demo`,[点击跳转](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download)

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

2. 移动端事件示例

> 这里模拟了点击下载文件流来实现下载功能。
>
> 优点：
>
> 1. pc 端可以，手机端也可以
>
> **缺点**：
>
> 1. 造成多次请求
>
> 2. 下载时会弹出确认框提示用户下载，提示框样式根据不同系统浏览器样式各异

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

## 使用 `webpack-theme-color-replacer` 来实现主题切换不生效

### 问题描述：

1.  使用 [d2Admin 框架](https://d2.pub/d2-admin-start-kit/preview/#/index)
2.  原项目 `router` 使用 `hash` 模式可以实现主题色的切换作用
3.  本地项目 clone 后使用 `history` 模式发现 刷新后 主题色切换失灵

### 解决办法

1. 可以使用 `hash`模式即可

> 原版是通过 hash 加载

2. 或者 想使用 `history` 模式，可以做如下更改

> injectCss 参数设置为 true，通过 js 注入，这样就不会加载不到生成的样式
>
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

## 前端复制方案复盘

> 同事做的已经很全面很详细了，在此借用一下

### 参考链接

[前端复制的三种主流方案，附真机验证和生产代码](https://www.yuque.com/docs/share/22e14fdb-7122-42af-80fe-064f324298b2?#)

## 三方图片资源 403

### 问题描述

1. 直接使用一个三方图片链接，发现显示 403
2. 富文本中引用一个 三方图片链接，渲染时候图片不显示

### 问题原因

1.
