vite 内置了很多插件，然后我们作为普通开发者不需要承担这么高的心智负担

vite 也继承了 vue 团队一贯的作风，减少心智负担

vite 将很多核心插件都内置了

## 1. 了解 vite-plugin-html

[https://github.com/vbenjs/vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)

### 1.1. 安装 vite-plugin-html

```
pnpm install vite-plugin-html --save-dev
```

### 1.2. 修改 vite.base.config.js, 内容如下

```
import {defineConfig} from 'vite'
import ViteAliases from "../plugins/viteAliases"
import {createHtmlPlugin} from "vite-plugin-html"

const postcssPresetEnv = require('postcss-preset-env')
export default defineConfig({
  plugins: [
    ViteAliases(),
    createHtmlPlugin({
      template: './index.html',
      inject: {
        data: {
          title: "hello world"
        }
      }
    })
  ]
})
```

### 1.3. 修改 index.html 页面如下

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%- title %></title>
  </head>
  <body>

  </body>
  <script src="./main.js" type="module"></script>
</html>
```

### 1.4. 重新运行终端命令，打开页面效果如下

相应内容已经被替换了

![](https://cdn.nlark.com/yuque/0/2025/png/1358855/1743948916205-5d44e79e-dfd1-4a6d-b288-25e297f91f7e.png)

## 2. 手写 vite-plugin-html

查看官网有一个钩子函数 `transformIndexHtml`可以使用

### 2.1. 新建 plugins/VitePluginHtml.js 文件

```
export default function VitePluginHtml(options) {
  return {
    transformIndexHtml: (html, ctx) => {
      console.log(html, ctx)
      // ctx 表示当前整个请求的一个执行上下文：api
      return html
    }
  }
}
```

### 2.2. 修改 vite.base.config.js 文件内容

```
import VitePluginHtml from "../plugins/VitePluginHtml";

export default defineConfig({
  plugins: [
    VitePluginHtml(),
    // createHtmlPlugin({
    //   template: './index.html',
    //   inject: {
    //     data: {
    //       title: "hello world"
    //     }
    //   }
    // })
  ],
})
```

### 2.3. 运行终端可以在终端中以及浏览器中看到如下效果

![](https://cdn.nlark.com/yuque/0/2025/png/1358855/1743949620898-568a68b1-bbc9-40e1-82b7-cdad3063439b.png)

浏览器中效果如下

![](https://cdn.nlark.com/yuque/0/2025/png/1358855/1743949661395-a496a010-a2ae-4d33-a91c-a9c38bea9d15.png)

### 2.4. 修改 vite.base.config.js 中的内容

增加配置参数 inject 的 data 属性

```
VitePluginHtml({
  inject: {
    data: {
      title: "hello world"
    }
  }
}),
```

### 2.5. 继续修改 VitePluginHtml.js 文件内容

```
export default function VitePluginHtml(options) {
  return {
    transformIndexHtml: (html, ctx) => {
      console.log(html, options)
      // ctx 表示当前整个请求的一个执行上下文：api
      return html.replace(/<%- title %>/g, options.inject.data.title)
    }
  }
}
```

### 2.6. 运行终端命令，可以看到浏览器效果

![](https://cdn.nlark.com/yuque/0/2025/png/1358855/1743950787696-e1e074ee-9ae8-4a4b-9509-1a74c2dd3bb7.png)

### 2.7. 插件的执行顺序

如果我想让这个插件在最开始先执行呢？

vite 官网的介绍插件执行顺序如下：

![](https://cdn.nlark.com/yuque/0/2025/png/1358855/1743950820343-ad1f9caf-a338-4753-862d-272420f8e6a3.png)

### 2.8. 修改 VitePluginHtml.js 文件内容

这里我们就不能使用函数了，需要使用一个对象

```
export default function VitePluginHtml(options) {

  return {
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return html.replace(/<%- title %>/g, options.inject.data.title)
      }
    }
  }
}
```

### 2.9. 重新运行终端，浏览器中效果一样

![](https://cdn.nlark.com/yuque/0/2025/png/1358855/1743950994796-bf2c6456-78bc-4c82-a2d0-6078b156c971.png)