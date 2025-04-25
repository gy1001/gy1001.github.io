# 06-移动端适配布局

## 01：章节介绍

### 移动端适配概念

- 随着移动互联网的发展，移动端布局显得非常的重要。移动端布局并不复杂，主要是现实各种设备的等比适配，让所有移动端设备看起来是相同的。

### rem 布局方案

- 移动端 rem 布局原理解析
- 动态计算 font-size
- 测量 rem 数值以及插件使用
- rem 综合案例：网易移动端

### vw 布局方案

- 移动端 vw 布局及插件使用
- vw 综合案例：B 站移动端

### 其他

- 移动端概念及 UI 设计稿尺寸
- 测试题
- 练习题

## 02：移动端概念及 UI 设计稿尺寸

### 逻辑像素与物理像素

- 逻辑像素，也叫“设备独立像素”，对于前端来说就是 css 中的像素，举例：iphone6 下的逻辑像素为 375px。

- 物理像素，即设备屏幕实际拥有的像素点，一个设备生产出来，他们的像素就已经确定了，举例：iphone6 下的物理像素为 750px。

- 可以发现 iphone6 下，其物理像素是逻辑像素的 2 倍，可用“设备像素比”来表示这个比值（即物理像素除以逻辑像素的值），可通过 JavaScript 代码`window.devicePixelRatio`来获取设备像素比。

- 那究竟逻辑像素与物理像素的关系是什么呢？这里首先先确定什么是相对单位，什么又是绝对单位。像 m 这种绝对单位，定义是什么：米的长度等于氪－86 原子的 2P10 和 5d1 能级之间跃迁的辐射在真空中波长的 1650763.73 倍。查到的 m 的定义如上，也就是说在现实世界中，m 是一个固定的长度。

- px 全称为 pixel，像素长度，像素长度，那么就请问了，一个超大屏幕的像素和你笔记本或者手机屏幕的像素大小相同吗？也就是说 1px 在你手机屏幕上显示出来的长度可能为 0.1mm，在露天演出的电子屏幕上长度为 5cm，那么 0.1mm 和 5cm 相等吗？

- 感觉 px 好像是一个相对单位，但是如果放在网页或者设计人眼中，可能就不一定了，上面举得那个例子是物理像素，在物理像素的背景下，px 确实是一个相对单位，但是在逻辑像素上就不同了，css 中 1px 指的是逻辑像素，浏览器会将你的逻辑像素转化成物理像素，每个设备之间虽然物理像素点大小不一样，但是用例逻辑像素的单位后，显示的长度就会一样了。

- 在开发网页的时候，写了 10px，在你的设备上，逻辑 1px 为真实的 1.2 个像素大小，实际看上去为 10cm，没问题，换一个设备，逻辑 1px 为真实的 2.4 个像素大小，也就是说另外一个设备像素大小是你的设备一半，那么对于他来说 10px 就是 24 个像素了，但是实际大小仍然为 10cm，所以说，在有逻辑像素的概念的前提下，px 是一个绝对长度单位。(引自：[知乎](https://www.zhihu.com/question/48166345/answer/1631677955))

### 总结如下：

- 逻辑像素：CSS 中的像素，绝对单位，保证不同设备下元素的尺寸是相同的
- 物理像素：设备屏幕实际拥有的像素点，相对单位，不同设备下物理像素大小不同。

### **viewport 视口**

- 一般移动设备的浏览器都默认设置了一个 viewport 元标签，定义一个虚拟的布局视口（layout viewport），用于解决早期的页面在手机上显示的问题。iOS, Android 基本都将这个视口分辨率设置为 980px，所以 PC 上的网页基本能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

<div>
    <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f66e4e6332714c3bb0c3fb1c5c54638f~tplv-k3u1fbpfcp-watermark.image?" width="500" />
    <div>默认viewport</div>
</div>

- 上面截图中的方块为 100px，但是在 iphone6 设备的默认视口下显示的非常小，因为默认视口为 980px。为了解决这个问题，可通过 meta 标签来修改视口的尺寸大小（vsCode 工具初始创建 HTML 代码时，自动添加）。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- `width=device-width`表示视口宽度为设备的宽，也就是逻辑像素的大小。`initial-scale=1.0`表示初始缩放比例为 1，即正常大小。下面是设置了 viewport 视口后的样子。

<div >
    <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7df835f61144d6ba6cb4788c6964198~tplv-k3u1fbpfcp-watermark.image" width="500" />
    <div>设置viewport</div>
</div>

- viewport 可选的值有：

| 属性          | 值                    | 描述                                     |
| ------------- | --------------------- | ---------------------------------------- |
| width         | 正整数或 devive-width | 定义视口的宽度，单位为像素               |
| height        | 正整数                | 定义视口的高度，单位为像素，不常用       |
| initial-scale | 比例值                | 定义初始缩放值                           |
| minimum-scale | 比例值                | 定义缩小最小比例                         |
| maximum-scale | 比例值                | 定义放大最大比例                         |
| user-scalable | yes/on                | 定义是否允许用户手动缩放页面，默认值 yes |

总结如下：

- 在移动端布局中，一定要提前设置好视口大小，即 vsCode 默认添加形式，`<meta name="viewport" content="width=device-width, initial-scale=1.0">`，这样可以保证 CSS 逻辑像素不会受到缩放处理。

### 750px 的设计稿

- 通常移动端 UI 设计稿会按照 iphone6 的物理像素尺寸大小进行设计，即 750px。当然也可以按照逻辑像素进行设计，即 375px，但是一般设计师不会这么干，主要为了设计稿更加清晰。
- 所以前端在量取尺寸的时候，需要除以 2，才能适配页面中的 CSS 逻辑像素值。好在现代 UI 工具如：蓝湖、PxCook 等都具备自动除以 2 的标注信息方式，后面视频有详细介绍。

<div>
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be417734c114446f9994f869cc00b39f~tplv-k3u1fbpfcp-watermark.image" />
    <div>PxCook工具自动除以2的标注信息</div>
</div>
* 那么如何让唯一的一种设计稿尺寸，去适配不同设备的像素呢？让页面元素能够等比进行放大缩小呢？可通过rem和vw这两种相对单位来进行实现，这也是本章的重点学习内容。

### 总结如下：

- 移动端 UI 设计稿尺寸大小为 750px，即设备的物理像素，可使效果展示更加清晰。
- 移动端需要实现像素换算和设备适配，以及页面元素等比缩放布局等。

## 03：移动端 rem 布局原理解析

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html {
        /* font-size: 30px;  */ /* iphone6 */
        font-size: 35px; /* iphone6 plus */
      }
      body {
        font-size: 20px;
      }
      .box {
        font-size: 2em;
        width: 2rem;
        height: 2rem;
        background: pink;
        border: 2rem skyblue solid;
      }
      /* rem : root + em */
    </style>
  </head>

  <body>
    <div class="box"></div>
  </body>
</html>
```

## 04：动态计算 font-size

- JS 动态计算，flexible.js 库
- 利用 vm 相对单位，动态计算 font-size

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      html {
        /* font-size: 100vw; */ /* 在iphone6 -> 375px */
        font-size: 26.666667vw; /* 在iphone6 -> 100px */
      }
      body {
        font-size: 0.16rem; /* rem布局一定要在body重置font-size大小 */
      }
      .box {
        width: 1rem; /* 页面可视区分成了100vw和100vh */
        height: 1rem;
        background: pink;
      }
    </style>
  </head>
  <body>
    <div class="box">哈哈</div>
  </body>
</html>
```

## 05: 测量 rem 数值及插件使用

- VsCode 工具中的 px to rem 插件
- 利用蓝湖、PxCook，获取 rem 数值

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-size: 26.666667vw;
      }
      /* alt + z : 对选中px单位进行rem转换 */
      /* ps中量取的数值，是物理像素，css中设置的逻辑像素，所以对量取的值进行除以2 */
      .head {
        width: 0.72rem;
        height: 0.72rem;
        background: red;
      }
      .foot {
        width: 2rem;
        margin: 3rem;
      }
    </style>
  </head>
  <body>
    <div class="head"></div>
  </body>
</html>
```

## 06：rem 案例：网易移动端头部实现

## 07: rem 案例：网易移动端导航实现

## 08: rem 案例：网易移动端新闻列表实现(1)

## 09: 6-9 rem 案例：网易移动端新闻列表实现(2)

[源码地址](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_6/6_6/163.html)

## 10: 移动端 vw 布局及插件使用

- VsCode 工具中的 px-to-vw 插件
- 利用 PxCook, 获取 vw 数值

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        /* width: 30vw;
            height: 30vw; */
        width: 26.667vw;
        height: 26.667vw;
        background: pink;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

## 11: vw 案例：B 站移动端头部实现
## 12: vw 案例：B 站移动端导航实现
## 13: vw 案例：B 站移动端视频列表实现

[案例源码地址](https://github.com/gy1001/Javascript/blob/main/front-layout/chapter_6/6_11/bili.html)
