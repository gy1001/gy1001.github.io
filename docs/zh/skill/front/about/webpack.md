# Webpack

## webpack 初探

### webpack 究竟是什么

#### 早期开发 HTML

##### 实现步骤

1. 创建 index.html 文件
2. 创建并引入 index.js 文件
3. 如果有其他 js 文件，需要创建并在 index.html 中引入其他 js 文件，例如 index2.js 文件

##### 缺点：

1.  在一个 index.html 引入了多个 js 文件，带来如下问题：
2.  整个页面的加载速度会变慢
3.  从代码中看不出文件之间的相互关系。例如：在 index.js 中，假如里面有其它 JS 文件创建的类，不知道其来源，需要回到 index.html 中去查找
4.  很难去查错。假如文件依赖顺序不正确，会导致错误，这时候不容易去维护

所以，有没有一种办法，html 文件还是只引用 index.js 文件，对于其中需要的类或者方法，可以在这个 js 文件中去引用使用。并且原生方式是无法直接引入(比如利用 import 等方式)，而 webpack 可以帮助转译 import 为浏览器识别的方式

#### 利用 webpack 开发

##### 实现步骤:

```shell
// 创建webpack-demo文件夹
mkdir webpak-demo
// 进入文件夹
cd webpack-demo
// npm 初始化：前提需要安装nodejs、npm
npm init webpack-demo
// 然后一路回车，或者根据提示输入配置内容。最终文件夹中会产生一个package.jso文件，这是管理配置文件
// 接下来 安装 webpack-cli webpack
npm install webpack-cli webpack --save-dev
// 创建 index.js、index2.js、index.html文件
touch index.js
touch index2.js
touch index.html
```

index2.js 文件内容如下

```javascript
export default function add(a, b) {
	return a + b
}
```

index.js 文件内容如下

```javascript
import add from './index2.js'
console.log(add(2, 3))
```

使用 webpack 对 js 文件进行翻译

```shell
npx webpack ./index.js --mode development
```

结果会产生一个 dist 文件，里面是编译后的 main.js 文件

index.html 文件内容如下

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>

	<body></body>
	<script src="./dist/main.js"></script>
</html>
```

运行后，index.html 结果可以看到控制台中输出了 console.log(add(2,3)) 的结果 5

> 这里可以看出 webpack 做了翻译 js 文件的功能，此时可以简单理解为文件编译器。其实，它的功能远不止于此。

### 什么是模块打包工具

> 官方定义： _webpack_ is a module bundler.

在上一节中 index2.js 中 add 函数是通过 export default 方式来导出，并在 index.js 中通过 import add from "./index2.js"来引入的。这是 Es Module 的导出、导入方式。

同样地还是有别的模块导出、导入方式，例如 Common JS

index2.js 内容更改如下

```javascript
function add(a, b) {
	return a + b
}
module.exports = add
```

index.js 内容更改如下

```javascript
const add = require('./index2.js')
console.log(add(2, 3))
```

删除 dist 目录，并运行以下命令

```shell
npx webpack ./index.js --mode development
```

完毕后，再次打开 index.html 文件并运行在浏览器中，可以看到 控制台中打印结果仍然是 5

> 可以看出，webpack 不仅可以打包符合 Es Module 规范的 js 文件，还可以打包 Commonjs 规范的文件。其实他还可以打包 CSS 文件，image 图片，等等其他格式的文件。所以，准确地说，webpack 就是一个模块打包工具。

推荐阅读：

[webpack 之 Modules](https://webpack.js.org/concepts/modules/)

[webpack API 之 Module Methods](https://webpack.js.org/api/module-methods/)

[webpack API 之 Module Variables](https://webpack.js.org/api/module-variables/)

### webpack 的环境搭建

1. 安装 nodejs LTS 版本

   [nodejs 官网](https://nodejs.org/en/)

   ```shell
   // 查看node、npm版本
   node -v
   npm -v
   ```

2. 执行下述命令

   ```shell
   mkdir webpak-demo
   cd webpack-demo
   npm init webpack-demo
   npm install webpack-cli webpack --save-dev
   ```

   注意：使用本项目中 node_module 中 webpack 版本

   ```shell
   npx webpack -v
   ```

   此命令可满足在不同项目中使用不同版本的 webpack

### webpack 的配置文件
