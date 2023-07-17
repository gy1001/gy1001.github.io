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
    '#c655dd',
  ],
  changeSelector: forElementUI.changeSelector,
  isJsUgly: process.env.NODE_ENV === 'production' ? true : undefined,
  injectCss: true, // 加上这一行,其他不变
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

- 直接使用一个三方图片链接，发现显示 403
- 富文本中引用一个 三方图片链接，渲染时候图片不显示

### 4.2 问题原因

- 因为我们的服务器里面的图片并不是自己的，而是从网上找的一些图片链接;
- 403 原因：没有权限。 有的服务器图片做了防盗链处理，不允许在别人的网页去获取他们的服务器;
- 404 原因：路径错误。 有的图片可能被别人删除、更改域名、服务器、项目停止维护等原因，导致目标资源不存在, 无法获取.

### 4.3 解决办法

- 解决方案：给你的 html 页面添加 meta 信息

```html
<meta name="referrer" content="no-referrer" />
```

### 4.4 原理分析

- 原理：别人怎么知道我在使用他的图片呢？ 因为我们网页再发请求的时候，会自动的在 referrer 中告诉别人服务器我们自己的 ip.这样别人服务器就知道这个人不是他们的网站，是其他网站来偷图片。
- 设置 no-referrer，别人就不知道我们是谁。就会把我们当成自己人了。
  ![img](https://img-blog.csdnimg.cn/5838a7c1d3ca4e2d8b9341eece09d1ef.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njg3MzI1NA==,size_16,color_FFFFFF,t_70)

## 5. null 和 undefined 与数值进行比较时的处理

### 5.1 null 在比较的时候，是当作 0 处理的。

![img](https://img-blog.csdnimg.cn/20201217193722160.png)

### 5.2 null 和 数值比较**全等**时候

![img](https://img-blog.csdnimg.cn/20201217193828164.png)

### 5.3 Math.max 中 null 的表现如何？

> 这里看得出来，null 在这些操作符号中，视作为 0。

![img](https://img-blog.csdnimg.cn/20201217194244153.png)

### 5.4 undefined 与数值比较时，不管怎样都是 false

> undefined 进行比较的时候，返回的是 NaN，这里很明显是进行了数字转换。我们也对 null 进行数字转换。
> **可以看出来，null 在这些操作 API 中，应该做了 number 转换**。

![img](https://img-blog.csdnimg.cn/20201217194046193.png)

### 5.5 其他：空字符表现

> 空字符串与 null 在数字比较是相同的。

![img](https://img-blog.csdnimg.cn/20201217194738251.png)

### 5.6 undefined 与 null 不同

![img](https://img-blog.csdnimg.cn/20201217195038459.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dkdXRSZXg=,size_16,color_FFFFFF,t_70)

### 5.7 总结

从 MDN 上可以发现：

> - undefined 是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined 的最初值就是原始数据类型 undefined。
> - 值 null 是一个字面量，不像 undefined，它不是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象。

- undefined 由于是全局的属性，其实是一个对象来处理，而对象进行转换的时候，是当做 NaN。
- 而 null 与空字符串都是字面量，并且都是表示没有数据，在 ascii 码中，都是 000000，所以转换成数据就是 0 本身。
  ![img](https://img-blog.csdnimg.cn/20201217201209558.png)

### 参考链接

[JavaScript 中的“null”与“undefined“在进行数值比较时，当作 0 处理?null == 0?](https://blog.csdn.net/gdutRex/article/details/111322781)

## 6. CSS 中的 last-child 和 last-of-type

### 6.1 last-child

#### 6.1.1 问题描述

> 遇到下面的层级关系，我想实现最后一个的 `demo`类样式特殊设置，比如：实现 第三个 p.demo 为 蓝色,如下写，发现没有生效

```html
<style>
  .demo:last-child {
    color: blue;
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

- .demo:last-child 选择属于其父元素最后一个子元素每个 .demo 元素。看着很懵逼,费解
- .demo:last-child 可以如下理解：选择父节点最后一个子节点，并且与选择器进行匹配， 父节点 div 的最后一个节点是.demo1，而匹配的选择器是.demo,两者不对应所以匹配不上。

#### 6.1.3 解决办法

1. 把想要使用的类放在父元素的最后一项,结构变为如下

```html
<style>
  .demo:last-child {
    color: blue;
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
    color: blue;
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
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
   :last-of-type 是从父节点的子节点中寻找最后一个与选择器相同的子节点，也就是说，这次寻找的并不是最后一个节点，而是每种类型的最后一个元素节点是不是 .demo
2. 注意：这里的选择的是`每种类型的最后一个元素`
3. 例如下面的例子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>last-of-type</title>
  </head>
  <style>
    .demo:last-child {
      color: blue;
    }

    .demo:nth-child(3) {
      color: red;
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
</html>
```

### 6.3 总结

- :last-child 就像 w3c 描述的一样他侧重的是最后一个元素
- :last-of-type 侧重的是与之选择器匹配的相同的类型的最后一个

[掘金：:last-child 与:last-of-type 区别](https://juejin.cn/post/7036556924736765983)

## 7. element-ui 组件 el-autocomplete 组件 bug

### 需求背景

关联产品进行添加时候，需要进行输入搜索远程拉取数据，前端渲染 list 选择，并支持清空选择框（此次 bug 关键点）
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58b3c33cbddf4c38917cec9ae8d7959a~tplv-k3u1fbpfcp-watermark.image?)

### 组件选择

[select:远程搜索](https://element.eleme.cn/#/zh-CN/component/select#yuan-cheng-sou-suo)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e21f55c5d6ef440f9f45018d6e8717f7~tplv-k3u1fbpfcp-watermark.image?)

[input:autocompelete 远程搜索](https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo)
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9b428f7cd6d4d7886312a401a9d2181~tplv-k3u1fbpfcp-watermark.image?)

因为目前需求中存在添加多个产品的一个要求，如果用 select 就要进行多个拉取数据的一个维护，如果维护一个数据，在这个数据框进行搜索下拉建议选择时，无法保证上一个选择产品的输入框聚焦时下拉列表中选中选择的产品，使用 input:autocompelete 就不存在这种情况，因为数据在单一个的组件内部进行维护（这里后来想了一下，总是需要一定性能来进行维护）

### 踩坑记录

#### 复现方式

```vue
<template>
  <div
    class="related-content-list"
    v-for="(relatedItem, relatedIndex) in ruleForm.list"
    :key="relatedItem.keyIndex"
  >
    <el-form-item
      :prop="'list.' + relatedIndex + '.productNameCode'"
      :rules="rules.list[relatedIndex].productNameCode"
      label="推荐产品"
    >
      <el-autocomplete
        clearable
        v-model="relatedItem.productNameCode"
        :fetch-suggestions="
          (queryString, callback) =>
            querySearchAsync(queryString, callback, relatedIndex)
        "
        :trigger-on-focus="false"
        @select="handleSelect(relatedIndex, $event)"
        @blur="handlerBlur(relatedIndex)"
        placeholder="请输入推荐产品关键字"
        placement="bottom-start"
        :popper-append-to-body="false"
      >
        <template slot-scope="{ item }">
          <!-- 显示 productName：code -->
          {{ getProductNameCode(item.productName, item.productCode) }}
        </template>
      </el-autocomplete>
    </el-form-item>
  </div>
</template>

<script>
export default {
  methods: {
    querySearchAsync(queryString, cb) {
      try {
        queryProductList({ productStr: queryString }).then((result) => {
          cb(result)
        })
      } catch (error) {
        showErrorInfo(error)
      }
    },
  },
}
</script>
```

2. 上述方案遇到的问题

> 进行搜索时候，如果这一次搜索的结果为空，因为配置了 clearable，点击组件自带 icon 进行清空时候，重新进行输入，会请求接口，但是下拉框不会出现

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/748f2245082e41269ad0d9e3d4133a9c~tplv-k3u1fbpfcp-watermark.image?)

#### 网友的解决方案

> 最开始并没有想到是清除 icon 的问题，在意的是 下拉框没有出现

由此搜到的一个解决方案：

[elementui el-autocomplete 当输入建议调用了接口后为空时，输入建议的下拉框一闪而过然后为空，去掉这个状态的解决方法](https://blog.csdn.net/m0_37528005/article/details/117806202)

原理：就是手动进行下拉框的样式修改，改为 display: block，它这个例子中是单个。目前需求中是多个输入下拉框就需要进行在特定时间的样式处理为 display: none, 试了一个在 blur 时间中进行立即触发样式的处理。发现选择产品后， @blur 事件会优先于 @select 事件的触发，如果 blur 后立即隐藏下拉框，select 事件就不会触发(选不了产品)。如果采用延迟 setTimeout 这个时间不好把握，过长会导致其他的一个样式 bug。也试了 this.$nextTick 也不好用

#### 最终解决 element-ui github issue

> bug 源于点击清空按钮后会执行 this.activated = false，而执行 this.activated = true 是在输入框再次获取焦点后。所以需要你失去焦点再次让输入框获取焦点。

[el-autocomplete 设置 clearable 后，点击清除后，再次搜索无法出现搜索下拉框](https://github.com/ElemeFE/element/issues/19050)

**自定义清除 icon**

```vue
<template>
 <el-autocomplete>
    <template slot="suffix">
      <i
        class="el-input__icon el-icon-circle-close el-input__clear"
        @click="clearHandler(relatedIndex)"
      ></i>
    </template>
  <el-autocomplete>
</template>
<script>
export default {
  methods: {
    clearHandler(index) {
      this.ruleForm.list[index].productNameCode = ''
    },
  }
}
</script>
```

[其他文章：ElementUi el-autocomplete 踩坑 （使用 clearable 清除,点击输入框下拉条件不再显示）](https://blog.csdn.net/weixin_42190844/article/details/120768467)

**其他**

vant 的 input 组件使用 clearable 属性时候，有部分手机存在点击并没有清空输入框的问题，采用自定义 clear-icon 处理就可以解决。

## 8. nginx 重定向公告页

### 需求背景

微服务上线时候，部分网站需要挂载升级公告页

验证完毕后，需要下掉，并重新指向新的验证过的环境

### 技术方案

A 项目：坤元官网（www.a.com）使用了如下配置

```nginx
 location / {
  rewrite ^/(.*)$  http://static-cdn.kunyuanfund.com/html/kunyuan/pc/upgrade.html/$1 permanent;
 }
```

B 项目: 活动项目(www.b.com) 使用了如下配置

> 目前容器项目由于有健康检查，如果失败，就会发布不成功。需要排除健康检查 icon，或者联系运维关闭健康检查

```nginx
  rewrite ^(?!/favicon.ico).*  http://static-cdn.kunyuanfund.com/html/kunyuan/pc/upgrade.html;
```

### 问题描述

#### 操作步骤

1. 挂载后都正常跳转至公告页，A 项目通过绑定 本地 host 访问新的域名进行验证（运维配合），B 项目通过新的域名进行验证
2. 验证完毕后，A 项目需要下掉公告页（删除重定向），B 项目需要重定向至另一个域名 https://www.c.com

活动项目修改为如下配置

```nginx
rewrite ^/(.*)$ https://c.xxx.com permanent;
# $1为正则匹配的内容，即域名后边的字符串
```

3. 重新配置后发现如下问题

#### 出现的问题

1. A 项目 公告下掉后，仍然会跳转至公告页，

```text
正常打开： www.a.com 会跳转至 升级公告页
无痕模式打开： www.a.com 可以正常打开显示
添加后缀： www.a.com?id=1 可以正常打开显示
```

2. B 项目修改重定向地址后，可以正常跳转至新的重定向

```text
正常打开： www.b.com 会跳转至 www.c.com
```

### 问题原因

redirect 跟 permanent 都是 Nginx 的 rewrite 的 flag

redirect 是临时重定向, 浏览器地址会显示跳转新的 URL 地址,请求日志中的状态码为 302

permanent 是永久重定向, 浏览器地址会显示跳转新的 URL 地址, 请求日志中的状态码为 301

起初我也是无法理解这俩个概念，最后经测试，会发现，服务器配置好 redirect 后，发开浏览器会重定向你需要的网站，这个时候关闭网站是会直接报出无法连接的错误,但是 permanent 永久重定向定义以后，关闭 nginx 服务器，这个时候在访问同样会成功,这就是 redirect 跟 permanent 的区别

```nginx
 rewrite ^/(.*) http://www.baidu.com/$1 redirect;
```

```nginx
 rewrite ^/(.*) http://www.baidu.com/$1 permanent;
```

### 后续兜底方案

通过修改 公告页的逻辑判断，进行跳转目标网站（加上后缀参数）

```javascript
//定义一个函数判断是手机端还是pc端
function isMobile() {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    )
  ) {
    return true // 移动端
  } else {
    return false // PC端
  }
}
//    判断后的操作
if (isMobile()) {
  location.href = './mobile/index.html'
  // 判断true跳转到这个主页
} else {
  location.href = './pc/index.html'
  // 判断false跳转到这个主页
}
```
