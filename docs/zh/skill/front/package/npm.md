# npm 
> npm，全名 node package manger
* npm 是 Node 开放式模块登记和管理系统，是 Node.js 的标准发布平台，用于 Node.js 包的发布、传播、依赖控制，[npm官网网址](https://www.npmjs.com/)
* npm 提供了命令行工具，可以方便的进行下载、安装、升级、删除包，也可以让你作为开发者发布并维护包
## 1. 如何安装
* npm 是随同 Nodejs 一期安装的包管理工具，所以你首先需要拥有 node 环境, 

[Node.js官网](https://nodejs.org/en/)

[Node.js中文网](https://nodejs.org/zh-cn/)

点击下载安装 对应的包即可
## 2. 验证版本
打开终端，分别输入如下命令
```shell
// 查看当前 node 版本
node -v
// 查看当前 npm 版本
npm -v
```
本机测试如下图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cf871cbef4542a0a786ff65bfa5ca95~tplv-k3u1fbpfcp-watermark.image?)
## 3. 常用命令
> 注意：需要在终端中打开
### 3.1 项目初始化
```shell 
npm inint
```
> 输入命令后，按照提示一路输入项目相关的配置，如：项目名称，版本号，关键字，项目协议等后，最终会产生 package.json 文件，并记录下刚才输入的信息

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8017ecfe7f44031854ff23ea4e145be~tplv-k3u1fbpfcp-watermark.image?)

最终产生的 `package.json`文件如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6f70e5dcb964526b07fecaab59d6472~tplv-k3u1fbpfcp-watermark.image?)

### 3.2 安装依赖包

```shell
npm install xxx
```
例如：我需要安装 express 可以使用如下命令
```shell
npm install express --save
```
安装后，项目中会产生一个 node_modules 文件夹，里面是从 npm 官网 下载复制了一份 express 的整体文件到本地。截图如下

**注意：**
这里不同版本的 npm 使用不同的一个处理方式，这个后续我们会通过 和 yarn、pnpm作比较时候细细道来,先有个初步了解
1. 使用 如下版本安装

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/970b9f02cd134165a8709ff10ebe1b5e~tplv-k3u1fbpfcp-watermark.image?)

安装后的的 node_modules 包如下图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87c97f5d87b846a39ba06df2b7c53eed~tplv-k3u1fbpfcp-watermark.image?) 

2. 使用 如下版本安装

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b36a184fa4648c3af15fb0c092ee79f~tplv-k3u1fbpfcp-watermark.image?)

安装后的的 node_modules 包如下图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce0af0ff100e4f8e944018fe92f74d92~tplv-k3u1fbpfcp-watermark.image?)

### 3.3 删除依赖包
```shell
npm uninstall xxx
```