# 工作中遇到的问题

## 移动端下载图片调研

### 下载 app 安装包文件处理方式

> 直接打开下载地址即可

```javascript
window.location.href = this.phoneIos() ? this.iosUrl : this.androidUrl
```

### 下载图片处理方式

> 上述方案显然并不适用于图片，需要进行特殊处理

1. 参考示例: `w3cschool 官方demo `,[点击跳转](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download)

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
    function downloadImg() {
      axios({
        url: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F6a600c338744ebf8ac3c831d1f102a206159a7bc.jpeg%3Ftoken%3D5904c74637643eb48f22f122a8f0dcfd&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1663952400&t=160148750bd29807d88bc0c804e41f85', //URL,根据实际情况来
        method: 'get',
        responseType: 'blob',
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
