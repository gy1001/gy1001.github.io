# Webpack

## 1. webpack 初探

### 1.1 webpack 究竟是什么

#### 1.1.1 早期开发 HTML

##### 1.1.1.1 实现步骤

1. 创建 index.html 文件
2. 创建并引入 index.js 文件
3. 如果有其他 js 文件，需要创建并在 index.html 中引入其他 js 文件，例如 index2.js 文件

##### 1.1.1.2 缺点：

1.  在一个 index.html 引入了多个 js 文件，带来如下问题：
2.  整个页面的加载速度会变慢
3.  从代码中看不出文件之间的相互关系。例如：在 index.js 中，假如里面有其它 JS 文件创建的类，不知道其来源，需要回到 index.html 中去查找
4.  很难去查错。假如文件依赖顺序不正确，会导致错误，这时候不容易去维护

所以，有没有一种办法，html 文件还是只引用 index.js 文件，对于其中需要的类或者方法，可以在这个 js 文件中去引用使用。并且原生方式是无法直接引入(比如利用 import 等方式)，而 webpack 可以帮助转译 import 为浏览器识别的方式

#### 1.1.2 利用 webpack 开发

##### 1.1.2.1 实现步骤:

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

### 1.2 什么是模块打包工具

> 官方定义： _webpack_ is a module bundler.

#### 1.2.1 更换其他规范进行打包

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

#### 1.2.2 推荐阅读

[webpack 之 Modules](https://webpack.js.org/concepts/modules/)

[webpack API 之 Module Methods](https://webpack.js.org/api/module-methods/)

[webpack API 之 Module Variables](https://webpack.js.org/api/module-variables/)

### 1.3 webpack 的环境搭建

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

### 1.4 webpack 的配置文件

#### 1.4.1 使用默认配置文件

1. 上述编译命令中没有指明配置文件，一样可以打包编译。那时因为 webpack 为了便于使用， 本身设置了一些默认配置。

   默认配置文件名：webpack.config.js

2. webpack.config.js 配置文件内容如下

   ```javascript
   import path from 'path'

   module.exports = {
   	entry: './index.js', // 入口文件
   	output: {
   		// 打包后的文件配置
   		filename: 'bundle.js', // 文件名
   		path: path.resolve(__dirname, 'bundle'), // 文件所在路径配置，
   	},
   }
   ```

3. 重新运行命令`npx webpck`

4. 结果出现了

   1. 一个 bundle.js 文件
   2. 一个 bundle 文件夹

5. 更改 index.html 中的引入文件为 bundle/bundle.js

6. 运行到浏览器，控制台输出结果仍然是 5

#### 1.4.2 使用自定义配置文件名

1. 例如自定义配置文件为 webpack.mine.js

2. 文件内容同上

3. 删除 bundle 文件夹及内容

4. 运行命令需要更改为

   ```shell
   npx webpack --config webpack.mine.js
   ```

5. 重新运行上述命令，并再次打开 index.html 文件

6. 运行到浏览器中，控制台输出结果仍然是 5

#### 1.4.3 使用脚本命令

1. 创建 js 文件夹，并把 js 文件都移入文件夹内

   ```shell
   // 文件夹结构如下
   - index.html
   - node_modules
   - package.json
   - webpack.config.js
   - src
     - js
       - index.js
       - index2.js
   ```

2. webpack.config.js 内容更改如下

   ```shell
   const path = require('path')

   module.exports = {
   	mode: 'development',
   	entry: './src/js/index.js',
   	output: {
   		filename: 'bundle.js',
   		path: path.resolve(__dirname, 'bundle'),
   	},
   }
   ```

3. 更改 package.json 内容如下

   ```javascript
   {
     "name": "webpack-demo",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "private": true,
     "scripts": {
       "dev": "webpack"
     },
     "author": "",
     "license": "ISC",
     "dependencies": {
       "webpack": "^5.71.0",
       "webpack-cli": "^4.9.2"
     }
   }
   ```

4. 此时只需要运行 `npm run dev` 即可

   > 实际上 这里运行的也是 webapack , 当然是 node_modules 中的 webpack，然后寻找相应的配置文件

#### 1.4.4 本节小结

1. 使用全局安装并运行

   ```shell
   npm install webpack -g
   webpack index.js
   ```

2. 使用本地安装并运行

   ```shell
   npm install webpack --save-dev
   npx webpack index.js
   ```

3. 本地安装，并使用 npm 脚本运行

   安装方式参考上述文档

   ```shell
   npm run webpack // 本质还是运行 webpack
   ```

#### 1.4.5 官方参考文档

[webpack 之 Getting Started](https://webpack.js.org/guides/getting-started/)

### 1.5 浅谈 Webpack 打包知识点

1. webpack.config.js 中 mode 模式可设置为 development、production ,默认是 production。后者打包会进行压缩、处理空格等
2. 在 npm run webpack 脚本运行后，webpack 也会出现相应的一些打包信息，比如：打包耗费时间、打包文件名字等

### 1.6 小结

- Webpack 是什么
- 模块是什么
- Webpack 配置文件的作用是什么，以及基本的配置信息

## 2. webpack 的核心观念

### 2.1 什么是 loader

> Webpack 默认是知道如何打包 js、json 文件的，但是对于 css、image 等文件是不能识别的，所以需要一种方式来帮助 webpack 识别相应的文件类型，这种方式可以称为 loader。常见的如：ts-loader、css-loader、style-loader、ts-loader、file-loader 等

Loader 就是一个打包方案，

例如：下属代码引入一个 img 图片

1.  找到一张图片放置 scr 目录下

2.  index.js 中引入图片，增加以下代码

    ```javascript
    const img = require('../math.jpeg') // 类型可能有出入，以自身为准
    document.getElementById('img').src = img
    ```

3.  index.html 中增加如下代码

    ```html
      <img id="img"></div>
    ```

4.  终端安装 file-loader

    ```shell
    npm install file-loader --save-dev
    ```

5.  webpakc 中设定规则，使用 file-loader，webpack.config.js 文件变为如下配置

    ```javascript
    const path = require('path')
    module.exports = {
    	mode: 'development',
    	entry: './src/js/index.js',
    	output: {
    		filename: 'bundle.js',
    		path: path.resolve(__dirname, 'bundle'),
    	},
    	module: {
    		rules: [
    			{
    				test: /\.jpeg$/, // 这里注意同上面图片类型保持一致
    				use: {
    					loader: 'file-loader',
    					options: {
    						esModule: false, // file-loader在新版本中esModule默认为true，因此手动设置为false
    					},
    				},
    			},
    		],
    	},
    }
    ```

6.  重新运行打包命令`npm run dev`

7.  重新运行 index.html 会看到图片正常显示

### 2.2 使用 Loader 打包静态资源（图片篇）

1. 上节发现图片打包后名字变为了一长串字符串，那么如何让他变为自己想要的名字呢
2. 如果想让图片打包后放在一个文件夹中呢

**webpack 4** 中 webpack.config.js 文件中内容配置如下

```javascript
const path = require('path')
module.exports = {
	mode: 'development',
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle'),
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				use: {
					loader: 'file-loader',
					options: {
						esModule: false,
						// placeholder 占位符
						name: '[name].[ext]',
						// 设置打包后的文件夹
						outputPath: 'images/',
					},
				},
			},
		],
	},
}
```

以上是使用 file-loader 进行处理，其实还可以使用 url-loader 来进行处理，后者可以设 limit,当大小小于设置的大小时候，url-loader 会把他打包为一个 base64 位流数据，而不是一个文件，这样可以减少资源的请求，当然图片要尽量小。

**webpack 5 **中的 webpack.config.js 文件中内容配置如下

```javascript
const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle'),
		// 通过这里也可以设置, webpack5中不用加.
		// assetModuleFilename: 'images/[name][ext]',
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
		],
	},
}
```

注意：webpack 5 中 file-loader 已经废弃

### 参考文档

[webpack4 之 file-loader](https://v4.webpack.js.org/loaders/file-loader/)

[webpack4 之 url-loader](https://v4.webpack.js.org/loaders/url-loader/)

[webpack 5 之 asset-modules](https://webpack.docschina.org/guides/asset-modules#root)
