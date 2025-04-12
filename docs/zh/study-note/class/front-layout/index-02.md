# 02-CSS还原UI设计

## 01:章节简介

### 尺寸位置颜色文字
* PS 还原 UI 设计
* 蓝湖 APP 快速标注信息
* PxCook 自动标注工具
* imgcook 设计稿智能平台
### 其他
* 长度单位与颜色分类
* UI设计图的源文件种类
* 测试题与练习题

## 02: 长度单位与颜色分类
### 长度

&emsp;&emsp;CSS中使用的每个属性都允许拥有一个或一组值，例如：`color : red ` 代码中，其中color为属性，red为值。在CSS中有很多属性是用来控制位置和尺寸的，所以它们的值必须是一个表示长度的数值，而数值是需要添加单位的。

&emsp;&emsp;CSS中有两种长度单位——绝对长度单位和相对长度单位。重要的是要知道它们之间的区别，以便理解它们控制的元素将变得有多大。

### 绝对长度单位

&emsp;&emsp;以下都是绝对长度单位——它们与其他任何东西都没有关系，通常被认为总是相同的大小。

| 单位 | 名称 |
| ------ | ------ |
| cm | 厘米 |
| mm | 毫米 |
| in | 英寸 |
| pt | 点 |
| px | 像素 |

&emsp;&emsp;这些绝对长度单位中，除了px像素经常使用外，其他并不常用。

### 相对长度单位

&emsp;&emsp;相对长度单位相对于其他一些东西，比如父元素的字体大小，或者视图端口的大小。使用相对单位的好处是，经过一些仔细的规划，您可以使文本或其他元素的大小与页面上的其他内容相对应。以下列出了常见相对单位。

| 单位 | 名称 |
| ------ | ------ |
| em | 在font-size中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小 |
| ex | 字符“x”的高度 |
| ch | 数字“0”的宽度 |
| rem | 根元素的字体大小 |
| lh | 元素的line-height |
| vw | 视窗宽度的1% |
| vh | 视窗高度的1% |
| vmin | 视窗较小尺寸的1% |
| vmax | 视图大尺寸的1% |

&emsp;&emsp;像rem和vw单位会在移动端布局中所使用，本教程的第六章中将对rem和vw单位进行详细的讲解，这里就不再赘述了。

### 颜色

&emsp;&emsp;在CSS中指定颜色的方法有很多，其中一些是最近才实现的。在CSS中，相同的颜色值可以在任何地方使用，无论您指定的是文本颜色、背景颜色还是其他颜色。

&emsp;&emsp;现代计算机的标准颜色系统是24位的，它允许通过不同的红、绿、蓝通道的组合显示大约1670万种不同的颜色，每个通道有256个不同的值(256 x 256 x 256 = 16,777,216)。让我们来看看在CSS中指定颜色的一些方法。

### 颜色关键词

&emsp;&emsp;可以直接在代码中使用颜色单词进行赋值，例如：`color : red `，这是一种指定颜色的简单易懂的方式。

<div align=center>
	<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98dba04583b14e04b5fe86c830577fdf~tplv-k3u1fbpfcp-watermark.image?" />
    <div>部分颜色关键词</div>
</div>

### RGB颜色

&emsp;&emsp;在CSS中，可以使用公式`rgb(red, green, blue)`将颜色指定为RGB值。每个参数 (red、green 以及 blue) 定义了 0 到 255 之间的颜色强度。

&emsp;&emsp;要显示黑色，请将所有颜色参数设置为 0，如下所示：`rgb(0, 0, 0)`；要显示白色，请将所有颜色参数设置为 255，如下所示：`rgb(255, 255, 255)`。

<div align=center>
	<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1200f23a726401f8d503da8a54e4cdd~tplv-k3u1fbpfcp-watermark.image?" />
    <div>部分RGB颜色</div>
</div>

### HEX颜色

&emsp;&emsp;在CSS中，可以使用`#rrggbb`格式的十六进制值指定颜色。其中 rr（红色）、gg（绿色）和 bb（蓝色）是介于 00 和 ff 之间的十六进制值（与十进制 0-255 相同）。

<div align=center>
	<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf658ad38ffa414e896628c175a60dfa~tplv-k3u1fbpfcp-watermark.image?" />
    <div>部分HEX颜色</div>
</div>

### HSL颜色

&emsp;&emsp;在CSS中，可以使用色相、饱和度和明度（HSL）来指定颜色，格式如下：`hsla(hue, saturation, lightness)`。

&emsp;&emsp;色相（hue）是色轮上从 0 到 360 的度数。0 是红色，120 是绿色，240 是蓝色。饱和度（saturation）是一个百分比值，0％ 表示灰色阴影，而 100％ 是全色。亮度（lightness）也是百分比，0％ 是黑色，50％ 是既不明也不暗，100％是白色。

<div align=center>
	<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d195cb5432ed4c29bbbc86f123741a66~tplv-k3u1fbpfcp-watermark.image?" />
    <div>部分HSL颜色</div>
</div>

&emsp;&emsp;本章当中，将通过各种软件，测量出UI设计图中的尺寸长度及颜色取值。
## 03: UI设计图的源文件种类
布局与UI设计图

&emsp;&emsp;开发一个网页，通常需要先有一套UI设计图，然后web前端开发人员会根据设计图进行元素尺寸、位置、颜色等信息的获取，从而根据这些信息来完成CSS布局。

### 什么是设计图源文件

&emsp;&emsp;通常我们认知中的JPG、PNG、GIF等图片格式，属于设计图的效果展示类文件，并不属于真正的源文件。源文件是可以查看到图片的所有的图层，通道、参考线、注解和颜色模式等信息，开发人员通过操作源文件，可以更加方便的控制图片，并快速的获取到图片信息。

&emsp;&emsp;下面展示一下，PSD源文件在PhotoShop软件中打开的样子：

<div align=center>
	<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0dd73275ef8426d8e7662c4d92caf6b~tplv-k3u1fbpfcp-watermark.image" />
    <div>PSD源文件</div>
</div>

### 常见的源文件有哪些

1. .psd格式源文件，通过[PhotoShop](https://www.adobe.com/products/photoshop.html)工具制作。
2. .sketch格式源文件，通过[Sketch](https://www.sketch.com/)工具制作。
3. .xd格式源文件，通过[Xd](https://www.adobe.com/products/xd.html)工具制作。

<div align=center>
	<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89c36c2929dc452d9224e61d1abd0d04~tplv-k3u1fbpfcp-watermark.image" />
    <div>Ps Xd Sketch</div>
</div>

&emsp;&emsp;通常在项目中，UI设计师会提供给我们UI设计图的源文件，web前端开发人员会根据源文件进行切图处理和信息获取。在下一小节中，将选择PSD源文件给大家演示是如何进行操作的，其他格式操作类似，就不再赘述。

## 04: Photoshop还原UI设计
## 05: 蓝湖App快速标注信息
## 06: PxCook自动标注工具
## 07: imgcook设计稿智能平台
## 08: 章节总结
* Web前端开发工程师如何跟UI 设计师配合
* 了解常见三种设计稿源文件：PSD Sketch Xd
* 如何利用对应的软件进行UI还原
* 标注信息工具：蓝湖App、Pxcook
* 智能代码生成平台：imgCook