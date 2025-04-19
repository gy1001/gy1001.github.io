我们来实现一套简单的 vite 的开发服务器

1. 解决我们刚刚这个问题
2. 让大家对开发服务器的原理层面有一定基础的简单的认识

会涉及到 node 的一些知识

- koa: node 端的一个框架

那么我们平时去访问一个网页的时候，我们敲下域名：baidu.com 发送一个请求到一个域名
## 1. AI 回答

Vite能让浏览器识别`.vue`文件主要得益于以下几个关键处理机制：

### 1.1. 1. 基于ES模块的原生支持

- **现代浏览器对ES模块的支持**：现代浏览器原生支持ES模块（ESM），可以通过`<script type="module">`标签引入JavaScript模块。Vite利用这一特性，将项目中的各种模块，包括`.vue`文件，以ES模块的形式进行处理和提供给浏览器。
- **按需加载**：ES模块支持按需加载，Vite利用此特性在开发阶段只加载当前页面所需的模块，而不是一次性加载整个应用程序，从而大大加快了开发服务器的启动速度。

### 1.2. 2. 自定义插件系统

- **解析.vue文件**：Vite使用插件来解析和转换`.vue`文件。其中，`@vitejs/plugin - vue`插件是专门用于处理`.vue`文件的。这个插件会将`.vue`文件拆分成不同的部分（`<template>`、`<script>`、`<style>`），并分别进行处理。
- **模板编译**：对于`<template>`部分，`@vitejs/plugin - vue`会将其编译成JavaScript渲染函数。例如，以下面的简单`.vue`组件为例：

```
<template>
  <div>{{ message }}</div>
</template>
<script setup>
  const message = 'Hello, Vite!';
</script>
```

插件会将`<template>`编译为类似这样的JavaScript渲染函数：

```
import { createVNode as _createVNode } from 'vue';

const _hoisted_1 = { class: "root" };

const render = function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _createVNode("div", _hoisted_1, _ctx.message);
};
```

- **脚本处理**：`<script>`部分会根据其内容进行相应处理。如果是`<script setup>`，插件会自动将其中的顶层变量和函数提升到组件的 `setup` 函数中，并进行适当的作用域处理。
- **样式处理**：`<style>`部分会被提取并注入到页面中。Vite支持多种CSS预处理器，如Sass、Less、Stylus等，插件会调用相应的预处理器将样式编译为浏览器可识别的CSS。

### 1.3. 3. 热模块替换（HMR）

- **实时更新**：Vite通过HMR技术实现了对`.vue`文件更改的实时更新。当开发者修改了`.vue`文件中的任何部分（模板、脚本或样式），Vite会精确地识别出更改的部分，并只将这些更改推送给浏览器，而不需要重新加载整个页面。
- **状态保持**：在HMR过程中，Vite会尽量保持应用程序的状态。例如，在一个表单输入了一些内容，当修改`.vue`文件中的样式并保存后，表单中的输入内容仍然保留，这大大提升了开发体验。

### 1.4. 4. 开发服务器代理与优化

- **开发服务器**：Vite启动了一个开发服务器，这个服务器负责拦截浏览器对`.vue`文件的请求。服务器根据文件的依赖关系，动态生成并返回经过处理的JavaScript代码，确保浏览器能够正确解析和执行。
- **优化构建**：在生产构建阶段，Vite会对`.vue`文件进行进一步的优化。它会将组件进行摇树优化（tree - shaking），去除未使用的代码，并且会将多个`.vue`组件打包成高效的JavaScript和CSS文件，以减少加载时间。

通过以上一系列处理，Vite使得浏览器能够识别和正确处理`.vue`文件，为Vue开发者提供了快速、高效的开发和构建体验。