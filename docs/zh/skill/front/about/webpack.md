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

#### 2.2.1 **webpack 4**

webpack 4 中 webpack.config.js 文件中内容配置如下

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

#### 2.2.2 **webpack 5 **

webpack 5 中的 webpack.config.js 文件中内容配置如下

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

#### 2.2.3 参考文档

[webpack4 之 file-loader](https://v4.webpack.js.org/loaders/file-loader/)

[webpack4 之 url-loader](https://v4.webpack.js.org/loaders/url-loader/)

[webpack 5 之 asset-modules](https://webpack.docschina.org/guides/asset-modules#root)

### 2.3 使用 Loader 打包静态资源（样式篇）

#### 2.3.1 css-loader

`css-loader` 解释(interpret) `@import` 和 `url()` ，会 `import/require()` 后再解析(resolve)它们。

#### 2.3.2 style-loader

建议将 `style-loader` 与 [`css-loader`](https://github.com/webpack/css-loader) 结合使用

#### 2.3.3 less-loader

一个 less 加载器，帮助 webpack 处理 less 文件的。同理，还有 sass-loader、stylus-loader 等, 这里以 less-loader 为例

#### 2.3.4 postcss-loader

实现样式兼容性处理，自动为样式添加浏览器前缀。

#### 2.3.5 示例

1. 在 src 下新建 css 文件夹，新建 index.css、img.less 文件，文件内容如下

   img.less 文件内容如下

   ```css
   html {
   	.el-img {
   		width: 100px;
   		transform: translate(100px, 100px) // 这里属于新特性，某些浏览需要增加相应前缀才会识别，postcss-loader 可以解决这个问题，自动增加前缀
   ;
   	}
   }
   ```

   index.css 文件内容如下

   ```css
   @import './img.less'; // 注意这里是 css 文件引入 less 文件
   ```

2. index.js 中引入 index.css 文件, 并修改引入 img 片段内容，更改如下

   1. 当不使用 modules: true 模块化配置时候如此引人，是作为全局样式引入

      ```javascript
      ...
      // 当不使用 modules: true 模块化配置时候如此引人，是作为全局样式引入, 假如其他文件中也有同名元素，将会收到影响
      import '../css/index.css'

      const img = require('../math.jpeg')
      const imgEl = document.getElementById('img')
      imgEl.classList.add('el-img')
      ...
      ```

   2. 当使用模块化引入时候，需要更改如下

      ```css
      ...
      // 当使用 modules: true 模块化配置时候如此引人，是作为局部样式引入，并不影响其他文件中同名样式的元素
      import styles from '../css/index.css'
   
      const img = require('../math.jpeg')
      const imgEl = document.getElementById('img')
      imgEl.classList.add(styles['el-img'])
      ...
      ```

3. 安装 css-loader style-loader less-loader postcss-loader ，因为 css、less 文件 webpack 并不能识别

   ```shell
   npm install css-loader style-loader -D
   npm install less less-loader -D
   npm install --save-dev postcss-loader postcss
   ```

4. webpack.config.js 文件修改如下

   > 注意：多个 loader 的执行顺序是 `从后往前` 执行的

   ```javascript
   ...
   	rules: [{
       ...
       ...
       	{
   				test: /\.css$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {
   							// 引入模块化，注意第2步中的引入区别
   							modules: true,
   						},
   					},
   					'less-loader',
   				],
   			},
         {
            test: /\.less$/,
            use: [
              'style-loader',
              {
       				 loader:'css-loader',
       				 options: {
       						// 通过 import 加载的less文件也需要执行前两个loader
       						importLoaders: 2
     					 }
     				 },
              'less-loader',
              {
                loader: 'postcss-loader',
                //  或者使用 PostCSS 本身的 配置文件：postcss.config.js
                options: {
                  postcssOptions: {
                    plugins: [require('autoprefixer')()],
                  },
                },
              },
            ],
          },
     ]
   ...
   ```

5. 运行脚本打包命令`npm run dev`

6. 运行 index.html 到浏览器中，发现图片身上有指定的 css, 且按照指定的样式显示

#### 2.3.6 参考文献

[webpack 之 postcss-loader](https://v4.webpack.js.org/loaders/postcss-loader/)

[webpack 之 Asset Management](https://webpack.js.org/guides/asset-management/)

### 2.4 使用 plugins 让打包更便捷

#### 2.4.1 html-webpack-plugin

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 会帮我自动创建或者根据引入的文件模板创建一个 html 文件，，并把打包生成的 js 文件自动引入。

#### 2.4.2 clean-webpack-plugin

在每次打包时候，帮你先清空目标文件夹：dist 或者配置的其他名称文件夹

#### 2.4.3 示例步骤

1. 安装插件

   ```shell
   npm install html-webpack-plugin --save-dev
   npm install clean-webpack-plugin --save-dev
   ```

2. webpack 引入插件，Webpack.config.js 文件修改如下

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')

   module.exports = {
     ...
     modules: {...},
     // plugin 会在webpack运行到某些时机的时候，处理一些事情
     plugins: [
       new HtmlWebpackPlugin({
           // 指定文件模板，也可以不指定
          	template: './index.html',
       }),
       new CleanWebpackPlugin(),
     ]
     ...
   }
   ```

3. 重新运行打包命令，并运行到浏览器里

4. 查看页面效果

#### 2.4.4 相关文档

[webpack 之 Plugin](https://webpack.docschina.org/plugins/)

### 2.5 Entry 与 Output 的基本配置

#### 2.5.1 entry 基本配置

1. 可以是一个字符串

   ```javascript
   entry: './src/js/index.js', // 入口文件

   ```

2. 也可以是一个对象，左侧键表示打包后生成的文件名字

   ```javascript
   entry: {
     // main 是打包后的文件名，右侧是文件入口
     main: "./src/index.js",
     publicPath: ''
   }
   ```

3. 也可以是多个键值对对象, 表示生成两个文件; 表示多个文件入口

   tips: 这里如果用的是 html-webpack-plugin 生成的 html 文件，将会自动引入这两个生成的 js 文件

   ```javascript
   entry: {
     main: "./src/index.js",
     sub: "./src/index.js"
   }
   ```

#### 2.5.2 output 基本配置

```javascript
output: {
  filename: '[name].js',
  path: path.resolve(__dirname, 'bundle'),
  // 如果打包后的文件不是直接饮用，而是放到了别的服务器，比如使用了CDN, 就可以使用publicPath来进行设置
  publicPath: 'https://xxcdn.com/',
},
```

#### 2.5.3 参考文档

[webpack 之 Entry Points](https://webpack.js.org/concepts/entry-points)

[webpack 之 Output Management](https://webpack.js.org/guides/output-management/)

[webpack 之 output](https://webpack.js.org/configuration/output/)

### 2.6 SourceMap 的配置

#### 2.6.1 sourceMap

> sourceMap 是一个映射关系。假如代码运行时候，控制台提示 96 行报错，因为代码是打包压缩后的，根据提示的 96 行根本不能快速定位到源文件中的错误位置。而 sourceMap 可以帮助我们快速定位到相应的错误位置。

#### 2.6.2 相应的配置选项 devtool

```javascript
devtool: 'source-map' // 此选项控制是否生成，以及如何生成 source map。
```

#### 2.6.3 可以配置的值

```shell
^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$

eval: 可以通过 eval 的方式 对我们的代码或者 sourcemap 进行打包，提高打包速度
module: loader等其中的错误也进行定位
cheap: 1: 只提示多少行出错了，不提示列数 2：只负责业务代码中的错误，loader等依赖三方的错误不定位
inline: 会把map文件打包入 js 文件中去
source-map: 会自动生成一个 .map 文件
```

#### 2.6.4 推荐的配置

mode: development 环境下的推荐配置

```javascript
devtool: 'cheap-module-eval-source-map'
```

mode: production 环境下的推荐配置

```javascript
devtool: 'cheap-module-source-map'
```

#### 2.6.5 参考文档

[webpack 之 Devtool：source-map](https://webpack.docschina.org/configuration/devtool/)

### 2.7 使用 WebpackDevServer 提升开发效率

#### 2.7.1 webpack-dev-server

[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 可用于快速开发应用程序。可以实现如下的效果：更改了代码时候，自动进行编译运行，刷新浏览器。

#### 2.7.2 使用 webpack -- watch 实现

1. 更改脚本 dev 的运行命令

```javascript
"scripts": {
  "dev": "webpack --watch"
},
```

2. 运行命令`npm run dev`
3. 修改文件内容，手动刷新浏览器, 然后观察效果

#### 2.7.3 使用 webpack-dev-server

1. 安装 webpack-dev-server

   ```shell
   npm install webpack-dev-server -D
   ```

2. 更改脚本命令如下

   ```javascript
   "scripts": {
     "dev": "webpack --watch",
     "start": "webpack-dev-server"
   },
   ```

3. 为 webpack.config.js 添加如下内容

   ```javascript
   ...
   module.exports = {
   	...
     plugins: [],
     devServer: {
   		open: true, // 自动打开浏览器，并运行本地启动时的服务器地址
   	}
   }
   ```

4. 运行命令`npm run start`

5. 可以看到控制台输出结果

   ```shell
   <i> [webpack-dev-server] Project is running at:
   <i> [webpack-dev-server] Loopback: http://localhost:8081/
   <i> [webpack-dev-server] On Your Network (IPv4): http://192.168.31.191:8081/
   <i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:8081/
   <i> [webpack-dev-server] Content not from webpack is served from '/Users/yuangao/Desktop/webpack-demo/public' directory
   ```

6. 打开如下提示的地址`http://localhost:8081` （可能会有出入，以本地运行为准）

7. 更改代码后，可以看到代码`自动编译`，浏览器`自动刷新`，呈现最新效果

#### 2.7.4 使用 node 方式

1. 更改脚本命令如下

   ```shell
   "scripts": {
     "dev": "webpack --watch",
     "start": "webpack-dev-server",
     "middle": "node server.js"
   },
   ```

2. 安装 express, webpack-dev-middle

   ```shell
   npm install webpack-dev-middleware express -D
   ```

3. 根目录下新建 server.js ,内容如下

   ```javascript
   const express = require('express')
   const webpack = require('webpack')
   const webpackDevMiddleware = require('webpack-dev-middleware')
   const config = require('./webpack.config')
   const compiler = webpack(config)
   const app = express()
   app.use(
   	webpackDevMiddleware(compiler, {
   		// 相应的webpack.config.js中的output需要进行设置，也可以简单设置如下为"/", 或不设置
   		publicPath: config.output.publicPath,
   	})
   )
   app.listen(3000, () => {
   	console.log('server is running')
   })
   ```

#### 2.7.5 参考文档

[webpack 之 webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

[webpack 之 development](https://webpack.js.org/guides/development/)

[webpack 之 nodejs Api](https://webpack.js.org/api/node/)

### 2.8 Hot Module Replacement 热模块替换

#### 2.8.1 定义

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除[模块](https://www.webpackjs.com/concepts/modules/)，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面时丢失的应用程序状态
- 只更新变更内容，以节省宝贵的开发时间
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式

#### 2.8.2 使用

1. 更改 webpack.config.js 中的相关配置, 更改如下

   ```javascript
   devServer: {
     open: true,
     hot: 'only',
   },
   ```

2. index.js 中添加如下代码

   ```javascript
   ...
   function createBtn() {
   	const btn = document.createElement('button')
   	btn.innerHTML = '我是按钮，点击我新增一个div'
   	btn.onclick = function () {
   		const div = document.createElement('div')
   		div.classList.add('test-btn')
   		div.innerHTML = 'item'
   		document.body.appendChild(div)
   	}
   	document.body.appendChild(btn)
   }

   createBtn()
   ...
   ```

3. 运行命令`npm run start`, 使用 `webpack-dev-server`进行编译运行

4. 点击 `我是按钮，点击我新增一个div` 查看页面效果，发现页面中多了许多 内容为 item 的`div`

5. 在`index.css` 中添加如下样式, 然后保存，查看浏览器效果

   ```css
   .test-btn:nth-child(2n) {
   	background-color: lightblue;
   }
   .test-btn:nth-child(2n + 1) {
   	background-color: lightgreen;
   }
   ```

6. 会发现，内容为 item 的`div` 并不会消失，同时背景色变为上述设置的背景色。（注意：这些 div，是点击以后才添加的，如果刷新就会消失，说明这时没有刷新，只是添加或者修改了某些模块）

7. 如果你再改变 index.css 中的背景色，会看到相应的元素背景色也发生了变化，这就是 HMR 的神奇之处。

#### 2.8.3 实现 JS 的热更新

##### 2.8.3.1 用上述代码看是否支持 JS 的热更新

> 上一节代码示例中，使用 hmr 来实现 css 内容的更新替换，同时不会影响页面元素，那么对于 JS 呢

1. 新建文件 counter.js、number.js 文件，并在 index.js 中引入

   counter.js 文件内容如下

   ```javascript
   function counter() {
   	var div = document.createElement('div')
   	div.innerHTML = 1
   	div.setAttribute('id', 'counter')
   	div.onclick = function () {
   		div.innerHTML = parseInt(div.innerHTML) + 1
   	}
   	document.body.appendChild(div)
   }

   export default counter
   ```

   number.js 文件内容如下

   ```javascript
   function number() {
   	var div = document.createElement('div')
   	div.innerHTML = 1000
   	div.setAttribute('id', 'number')
   	document.body.appendChild(div)
   }

   export default number
   ```

   index.js 中新增如下代码

   ```javascript
   import counter from './counter'
   import number from './number'
   counter()
   number()
   ```

2. 其余配置不变，运行编译命令 `npm run dev` 查看效果，可以看到页面中有一行显示 1，有一行显示 1000，点击 1 的元素 div 内容会进行自增加，例如此时点击使其变为 10

3. 此时对`numebr.js`文件进行更改，将 1000 变为 2000，然后保存运行，会发现页面内容没有发生变化。

4. 可以看出来：HMR 对 JS 文件内容的更新是做不到的

##### 2.8.3.2 实现 HMR 对 JS 文件的热更新

1. 修改 webpack.config.js 文件中的内容，增加如下插件配置

   ```javascript
   const { HotModuleReplacementPlugin } = require('webpack')

   plugins:[
     ...
     new HotModuleReplacementPlugin(),
     ...
   ]
   ```

2. index.js 中增加如下配置

   ```javascript
   // 代表 当 number.js 文件发生变化时候，执行后面的回调函数
   if (module.hot) {
   	module.hot.accept('./number.js', () => {
   		document.body.removeChild(document.getElementById('number'))
   		number()
   	})
   }
   ```

3. 重新运行 `npm run dev` 查看效果，然后先点击 1 使其变为 10， 在更改 numebr.js 中的 1000 为 2000， 为 300，

4. 可以看到结果 发生变化，而上面的 10 没有变化。这时就说明对 js 执行了热更新模块

##### 2.8.3.3 主流框架内置了上述处理函数

在日常开发中，像 vue 或者 react 技术栈都内置了热更新处理模块，所以我们并不需要写上一节的代码去手动处理。

#### 2.8.4 参考文献

[GUIDE 之 HMR](https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr)

[concepts 之 Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/#how-it-works)

[webpack 之 dev-server 中使用 HMR](https://webpack.js.org/configuration/dev-server/)

[API 之 HMR](https://webpack.js.org/api/hot-module-replacement/#module-api)

### 2.9 使用 babel 处理 ES6 函数

#### 2.9.1 不处理时候会怎么样

1. 清空 index.js 中的内容，修改为如下内容

   ```javascript
   const arr = [new Promise(() => {}), new Promise(() => {})]

   arr.map((item) => {
   	console.log(item)
   })
   ```

   > 注意： Promise 是新的语法，另外上面用到了新的语法 箭头函数，部分浏览器可能不兼容

2. 往 `package.json`中添加打包命令脚本

   ```javascript
   "scripts": {
     ...
     "build": "webpack",
     ...
   },
   ```

3. 运行打包命令`npm run build`，查看打包后的文件内容

4. 可以看到如下打包结果(可能版本不同，打包内容有差异)

   ```javascript
   ...
   /***/ "./src/js/index.js":
   /*!*************************!*\
     !*** ./src/js/index.js ***!
     \*************************/
   /***/ (() => {

   const arr = [new Promise(() => {}), new Promise(() => {})]

   arr.map((item) => {
   	console.log(item)
   })

   /***/ })
   ...
   ```

5. 从上面可以看到文件内容基本没有发生变化，这样运行到浏览器中肯定会遇到兼容性问题的

#### 2.9.2 如何解决呢

> 打开 [babel 之 setup](https://babeljs.io/setup#installation) 选择 webpack ，会出现如下命令, 按照操作即可

1. 安装 babel

   ```shell
   npm install --save-dev babel-loader @babel/core
   ```

2. Webpack.config.js 中增加相应配置

   ```javascript
   {
   	module: {
   		rules: [
   			{
   				test: /\.m?js$/,
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   					options: {
   						presets: ['@babel/preset-env'],
   					},
   				},
   			},
   		]
   	}
   }
   ```

3. 增加 `babel.config.json` 文件，并进行如下操作(此时 3.2 步可以不用操作，因为上述第 2 步已经引入，两种方式选择其一即可)

   1. 先安装依赖模块

      ```shell
      npm install @babel/preset-env --save-dev
      ```

   2. `babel.config.json`写入如下内容

      ```javascript
      {
        "presets": ["@babel/preset-env"]
      }
      ```

4. 运行打包命令`npm run build`，查看打包编译结果如下

   ```javascript
   /***/ "./src/js/index.js":
   /*!*************************!*\
     !*** ./src/js/index.js ***!
     \*************************/
   /***/ (() => {
   
   var arr = [new Promise(function () {}), new Promise(function () {})];
   arr.map(function (item) {
     console.log(item);
   });
   
   /***/ })
   ```

5. 可以发现上述代码中的箭头函数已经进行了编译转换，已经初步完成了转换，可是部分浏览器是不能识别 Promise 以及 map 语法的，那又该怎么办呢

   > 注意：@babel/preset-env是Babel6时代babel-preset-latest的增强版。该预设除了包含所有稳定的转码插件，还可以根据我们设定的目标环境进行针对性转码。
   >
   > Babel的编译分为语法和API两部分：语法（诸如const let ...解构、class语法等）、API（诸如[].includes、[].reduce等）
   >
   > 默认的Babel如下，只会编译语法，不会编译API ；Babel提供了polyfill库进行api的转换，同时 @babel/preset-env 提供了配置参数 useBuiltIns 进行设置如何处理。

#### 2.9.3 初步进行再转换

1. 此时就需要借助另一个 `babel/polyfill`, 同样的先安装

   ```shell
   npm install --save @babel/polyfill
   ```

2. 然后在 index.js 页面中进行引入, 增加以下代码

   ```javascript
   // 保证在顶端引入
   import '@babel/polyfill'
   ```

3. 此时在进行打包命令`npm run build`的执行, 查看编译后的结果,(大概类似如下结果)

   ```javascript
   ...
   /***/ "./node_modules/core-js/es6/index.js":
   /*!*******************************************!*\
     !*** ./node_modules/core-js/es6/index.js ***!
     \*******************************************/
   /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

   __webpack_require__(/*! ../modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
   __webpack_require__(/*! ../modules/es6.object.create */ "./node_modules/core-js/modules/es6.object.create.js");
   __webpack_require__(/*! ../modules/es6.object.define-property */ "./node_modules/core-js/modules/es6.object.define-property.js");
   __webpack_require__(/*! ../modules/es6.object.define-properties */ "./node_modules/core-js/modules/es6.object.define-properties.js");
   __webpack_require__(/*! ../modules/es6.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js");
   __webpack_require__(/*! ../modules/es6.object.get-prototype-of */ "./node_modules/core-js/modules/es6.object.get-prototype-of.js");
   __webpack_require__(/*! ../modules/es6.object.keys */ "./node_modules/core-js/modules/es6.object.keys.js");
   __webpack_require__(/*! ../modules/es6.object.get-own-property-names */ "./node_modules/core-js/modules/es6.object.get-own-property-names.js");
   __webpack_require__(/*! ../modules/es6.object.freeze */ "./node_modules/core-js/modules/es6.object.freeze.js");
   __webpack_require__(/*! ../modules/es6.object.seal */ "./node_modules/core-js/modules/es6.object.seal.js");
   __webpack_require__(/*! ../modules/es6.object.prevent-extensions */ "./node_modules/core-js/modules/es6.object.prevent-extensions.js");
   __webpack_require__(/*! ../modules/es6.object.is-frozen */ "./node_modules/core-js/modules/es6.object.is-frozen.js");
   __webpack_require__(/*! ../modules/es6.object.is-sealed */ "./node_modules/core-js/modules/es6.object.is-sealed.js");
   __webpack_require__(/*! ../modules/es6.object.is-extensible */ "./node_modules/core-js/modules/es6.object.is-extensible.js");
   __webpack_require__(/*! ../modules/es6.object.assign */ "./node_modules/core-js/modules/es6.object.assign.js");
   __webpack_require__(/*! ../modules/es6.object.is */ "./node_modules/core-js/modules/es6.object.is.js");
   __webpack_require__(/*! ../modules/es6.object.set-prototype-of */ "./node_modules/core-js/modules/es6.object.set-prototype-of.js");
   __webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
   __webpack_require__(/*! ../modules/es6.function.bind */ "./node_modules/core-js/modules/es6.function.bind.js");
   __webpack_require__(/*! ../modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
   __webpack_require__(/*! ../modules/es6.function.has-instance */ "./node_modules/core-js/modules/es6.function.has-instance.js");
   __webpack_require__(/*! ../modules/es6.parse-int */ "./node_modules/core-js/modules/es6.parse-int.js");
   __webpack_require__(/*! ../modules/es6.parse-float */ "./node_modules/core-js/modules/es6.parse-float.js");
   __webpack_require__(/*! ../modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
   __webpack_require__(/*! ../modules/es6.number.to-fixed */ "./node_modules/core-js/modules/es6.number.to-fixed.js");
   __webpack_require__(/*! ../modules/es6.number.to-precision */ "./node_modules/core-js/modules/es6.number.to-precision.js");
   __webpack_require__(/*! ../modules/es6.number.epsilon */ "./node_modules/core-js/modules/es6.number.epsilon.js");
   __webpack_require__(/*! ../modules/es6.number.is-finite */ "./node_modules/core-js/modules/es6.number.is-finite.js");
   __webpack_require__(/*! ../modules/es6.number.is-integer */ "./node_modules/core-js/modules/es6.number.is-integer.js");
   __webpack_require__(/*! ../modules/es6.number.is-nan */ "./node_modules/core-js/modules/es6.number.is-nan.js");
   __webpack_require__(/*! ../modules/es6.number.is-safe-integer */ "./node_modules/core-js/modules/es6.number.is-safe-integer.js");
   __webpack_require__(/*! ../modules/es6.number.max-safe-integer */ "./node_modules/core-js/modules/es6.number.max-safe-integer.js");
   __webpack_require__(/*! ../modules/es6.number.min-safe-integer */ "./node_modules/core-js/modules/es6.number.min-safe-integer.js");
   __webpack_require__(/*! ../modules/es6.number.parse-float */ "./node_modules/core-js/modules/es6.number.parse-float.js");
   __webpack_require__(/*! ../modules/es6.number.parse-int */ "./node_modules/core-js/modules/es6.number.parse-int.js");
   __webpack_require__(/*! ../modules/es6.math.acosh */ "./node_modules/core-js/modules/es6.math.acosh.js");
   __webpack_require__(/*! ../modules/es6.math.asinh */ "./node_modules/core-js/modules/es6.math.asinh.js");
   __webpack_require__(/*! ../modules/es6.math.atanh */ "./node_modules/core-js/modules/es6.math.atanh.js");
   __webpack_require__(/*! ../modules/es6.math.cbrt */ "./node_modules/core-js/modules/es6.math.cbrt.js");
   __webpack_require__(/*! ../modules/es6.math.clz32 */ "./node_modules/core-js/modules/es6.math.clz32.js");
   __webpack_require__(/*! ../modules/es6.math.cosh */ "./node_modules/core-js/modules/es6.math.cosh.js");
   __webpack_require__(/*! ../modules/es6.math.expm1 */ "./node_modules/core-js/modules/es6.math.expm1.js");
   __webpack_require__(/*! ../modules/es6.math.fround */ "./node_modules/core-js/modules/es6.math.fround.js");
   __webpack_require__(/*! ../modules/es6.math.hypot */ "./node_modules/core-js/modules/es6.math.hypot.js");
   __webpack_require__(/*! ../modules/es6.math.imul */ "./node_modules/core-js/modules/es6.math.imul.js");
   __webpack_require__(/*! ../modules/es6.math.log10 */ "./node_modules/core-js/modules/es6.math.log10.js");
   __webpack_require__(/*! ../modules/es6.math.log1p */ "./node_modules/core-js/modules/es6.math.log1p.js");
   __webpack_require__(/*! ../modules/es6.math.log2 */ "./node_modules/core-js/modules/es6.math.log2.js");
   __webpack_require__(/*! ../modules/es6.math.sign */ "./node_modules/core-js/modules/es6.math.sign.js");
   __webpack_require__(/*! ../modules/es6.math.sinh */ "./node_modules/core-js/modules/es6.math.sinh.js");
   __webpack_require__(/*! ../modules/es6.math.tanh */ "./node_modules/core-js/modules/es6.math.tanh.js");
   __webpack_require__(/*! ../modules/es6.math.trunc */ "./node_modules/core-js/modules/es6.math.trunc.js");
   __webpack_require__(/*! ../modules/es6.string.from-code-point */ "./node_modules/core-js/modules/es6.string.from-code-point.js");
   __webpack_require__(/*! ../modules/es6.string.raw */ "./node_modules/core-js/modules/es6.string.raw.js");
   __webpack_require__(/*! ../modules/es6.string.trim */ "./node_modules/core-js/modules/es6.string.trim.js");
   __webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
   __webpack_require__(/*! ../modules/es6.string.code-point-at */ "./node_modules/core-js/modules/es6.string.code-point-at.js");
   __webpack_require__(/*! ../modules/es6.string.ends-with */ "./node_modules/core-js/modules/es6.string.ends-with.js");
   __webpack_require__(/*! ../modules/es6.string.includes */ "./node_modules/core-js/modules/es6.string.includes.js");
   __webpack_require__(/*! ../modules/es6.string.repeat */ "./node_modules/core-js/modules/es6.string.repeat.js");
   __webpack_require__(/*! ../modules/es6.string.starts-with */ "./node_modules/core-js/modules/es6.string.starts-with.js");
   __webpack_require__(/*! ../modules/es6.string.anchor */ "./node_modules/core-js/modules/es6.string.anchor.js");
   __webpack_require__(/*! ../modules/es6.string.big */ "./node_modules/core-js/modules/es6.string.big.js");
   __webpack_require__(/*! ../modules/es6.string.blink */ "./node_modules/core-js/modules/es6.string.blink.js");
   __webpack_require__(/*! ../modules/es6.string.bold */ "./node_modules/core-js/modules/es6.string.bold.js");
   __webpack_require__(/*! ../modules/es6.string.fixed */ "./node_modules/core-js/modules/es6.string.fixed.js");
   __webpack_require__(/*! ../modules/es6.string.fontcolor */ "./node_modules/core-js/modules/es6.string.fontcolor.js");
   __webpack_require__(/*! ../modules/es6.string.fontsize */ "./node_modules/core-js/modules/es6.string.fontsize.js");
   __webpack_require__(/*! ../modules/es6.string.italics */ "./node_modules/core-js/modules/es6.string.italics.js");
   __webpack_require__(/*! ../modules/es6.string.link */ "./node_modules/core-js/modules/es6.string.link.js");
   __webpack_require__(/*! ../modules/es6.string.small */ "./node_modules/core-js/modules/es6.string.small.js");
   __webpack_require__(/*! ../modules/es6.string.strike */ "./node_modules/core-js/modules/es6.string.strike.js");
   __webpack_require__(/*! ../modules/es6.string.sub */ "./node_modules/core-js/modules/es6.string.sub.js");
   __webpack_require__(/*! ../modules/es6.string.sup */ "./node_modules/core-js/modules/es6.string.sup.js");
   __webpack_require__(/*! ../modules/es6.date.now */ "./node_modules/core-js/modules/es6.date.now.js");
   __webpack_require__(/*! ../modules/es6.date.to-json */ "./node_modules/core-js/modules/es6.date.to-json.js");
   __webpack_require__(/*! ../modules/es6.date.to-iso-string */ "./node_modules/core-js/modules/es6.date.to-iso-string.js");
   __webpack_require__(/*! ../modules/es6.date.to-string */ "./node_modules/core-js/modules/es6.date.to-string.js");
   __webpack_require__(/*! ../modules/es6.date.to-primitive */ "./node_modules/core-js/modules/es6.date.to-primitive.js");
   __webpack_require__(/*! ../modules/es6.array.is-array */ "./node_modules/core-js/modules/es6.array.is-array.js");
   __webpack_require__(/*! ../modules/es6.array.from */ "./node_modules/core-js/modules/es6.array.from.js");
   __webpack_require__(/*! ../modules/es6.array.of */ "./node_modules/core-js/modules/es6.array.of.js");
   __webpack_require__(/*! ../modules/es6.array.join */ "./node_modules/core-js/modules/es6.array.join.js");
   __webpack_require__(/*! ../modules/es6.array.slice */ "./node_modules/core-js/modules/es6.array.slice.js");
   __webpack_require__(/*! ../modules/es6.array.sort */ "./node_modules/core-js/modules/es6.array.sort.js");
   __webpack_require__(/*! ../modules/es6.array.for-each */ "./node_modules/core-js/modules/es6.array.for-each.js");
   __webpack_require__(/*! ../modules/es6.array.map */ "./node_modules/core-js/modules/es6.array.map.js");
   __webpack_require__(/*! ../modules/es6.array.filter */ "./node_modules/core-js/modules/es6.array.filter.js");
   __webpack_require__(/*! ../modules/es6.array.some */ "./node_modules/core-js/modules/es6.array.some.js");
   __webpack_require__(/*! ../modules/es6.array.every */ "./node_modules/core-js/modules/es6.array.every.js");
   __webpack_require__(/*! ../modules/es6.array.reduce */ "./node_modules/core-js/modules/es6.array.reduce.js");
   __webpack_require__(/*! ../modules/es6.array.reduce-right */ "./node_modules/core-js/modules/es6.array.reduce-right.js");
   __webpack_require__(/*! ../modules/es6.array.index-of */ "./node_modules/core-js/modules/es6.array.index-of.js");
   __webpack_require__(/*! ../modules/es6.array.last-index-of */ "./node_modules/core-js/modules/es6.array.last-index-of.js");
   __webpack_require__(/*! ../modules/es6.array.copy-within */ "./node_modules/core-js/modules/es6.array.copy-within.js");
   __webpack_require__(/*! ../modules/es6.array.fill */ "./node_modules/core-js/modules/es6.array.fill.js");
   __webpack_require__(/*! ../modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
   __webpack_require__(/*! ../modules/es6.array.find-index */ "./node_modules/core-js/modules/es6.array.find-index.js");
   __webpack_require__(/*! ../modules/es6.array.species */ "./node_modules/core-js/modules/es6.array.species.js");
   __webpack_require__(/*! ../modules/es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
   __webpack_require__(/*! ../modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
   __webpack_require__(/*! ../modules/es6.regexp.exec */ "./node_modules/core-js/modules/es6.regexp.exec.js");
   __webpack_require__(/*! ../modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
   __webpack_require__(/*! ../modules/es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
   __webpack_require__(/*! ../modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
   __webpack_require__(/*! ../modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
   __webpack_require__(/*! ../modules/es6.regexp.search */ "./node_modules/core-js/modules/es6.regexp.search.js");
   __webpack_require__(/*! ../modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
   __webpack_require__(/*! ../modules/es6.promise */ "./node_modules/core-js/modules/es6.promise.js");
   __webpack_require__(/*! ../modules/es6.map */ "./node_modules/core-js/modules/es6.map.js");
   __webpack_require__(/*! ../modules/es6.set */ "./node_modules/core-js/modules/es6.set.js");
   __webpack_require__(/*! ../modules/es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js");
   __webpack_require__(/*! ../modules/es6.weak-set */ "./node_modules/core-js/modules/es6.weak-set.js");
   __webpack_require__(/*! ../modules/es6.typed.array-buffer */ "./node_modules/core-js/modules/es6.typed.array-buffer.js");
   __webpack_require__(/*! ../modules/es6.typed.data-view */ "./node_modules/core-js/modules/es6.typed.data-view.js");
   __webpack_require__(/*! ../modules/es6.typed.int8-array */ "./node_modules/core-js/modules/es6.typed.int8-array.js");
   __webpack_require__(/*! ../modules/es6.typed.uint8-array */ "./node_modules/core-js/modules/es6.typed.uint8-array.js");
   __webpack_require__(/*! ../modules/es6.typed.uint8-clamped-array */ "./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js");
   __webpack_require__(/*! ../modules/es6.typed.int16-array */ "./node_modules/core-js/modules/es6.typed.int16-array.js");
   __webpack_require__(/*! ../modules/es6.typed.uint16-array */ "./node_modules/core-js/modules/es6.typed.uint16-array.js");
   __webpack_require__(/*! ../modules/es6.typed.int32-array */ "./node_modules/core-js/modules/es6.typed.int32-array.js");
   __webpack_require__(/*! ../modules/es6.typed.uint32-array */ "./node_modules/core-js/modules/es6.typed.uint32-array.js");
   __webpack_require__(/*! ../modules/es6.typed.float32-array */ "./node_modules/core-js/modules/es6.typed.float32-array.js");
   __webpack_require__(/*! ../modules/es6.typed.float64-array */ "./node_modules/core-js/modules/es6.typed.float64-array.js");
   __webpack_require__(/*! ../modules/es6.reflect.apply */ "./node_modules/core-js/modules/es6.reflect.apply.js");
   __webpack_require__(/*! ../modules/es6.reflect.construct */ "./node_modules/core-js/modules/es6.reflect.construct.js");
   __webpack_require__(/*! ../modules/es6.reflect.define-property */ "./node_modules/core-js/modules/es6.reflect.define-property.js");
   __webpack_require__(/*! ../modules/es6.reflect.delete-property */ "./node_modules/core-js/modules/es6.reflect.delete-property.js");
   __webpack_require__(/*! ../modules/es6.reflect.enumerate */ "./node_modules/core-js/modules/es6.reflect.enumerate.js");
   __webpack_require__(/*! ../modules/es6.reflect.get */ "./node_modules/core-js/modules/es6.reflect.get.js");
   __webpack_require__(/*! ../modules/es6.reflect.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js");
   __webpack_require__(/*! ../modules/es6.reflect.get-prototype-of */ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js");
   __webpack_require__(/*! ../modules/es6.reflect.has */ "./node_modules/core-js/modules/es6.reflect.has.js");
   __webpack_require__(/*! ../modules/es6.reflect.is-extensible */ "./node_modules/core-js/modules/es6.reflect.is-extensible.js");
   __webpack_require__(/*! ../modules/es6.reflect.own-keys */ "./node_modules/core-js/modules/es6.reflect.own-keys.js");
   __webpack_require__(/*! ../modules/es6.reflect.prevent-extensions */ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js");
   __webpack_require__(/*! ../modules/es6.reflect.set */ "./node_modules/core-js/modules/es6.reflect.set.js");
   __webpack_require__(/*! ../modules/es6.reflect.set-prototype-of */ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js");
   module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js");

   /***/ }),
     ....
   ```

4. 可以看到文件内容中多了很多处理函数，并且打包后的文件体积也变得很大(引入了全部的转换函数，即使代码中没有使用相应的语法功能，这时候就很没有必要，有没有办法进行优化呢)

#### 2.9.4 继续优化 1

> 上节打包中引入了全量的处理函数，即使我的代码中没有使用相应的语法，有没有可能我用了什么新语法，他就只转换某种语法呢，那些我没有使用的语法，相应的编译包就不引入呢

1. 更改 webpack.config.js 中相应 js 文件的处理规则，如下

   ```javascript
   {
     test: /\.m?js$/,
     exclude: /node_modules/,
     use: {
       loader: 'babel-loader',
         options: {
           presets: [
             [
               '@babel/preset-env',
               {
                 useBuiltIns: 'usage',  // 它的意思是只加用户使用的那些需要编译的处理函数
               },
             ],
           ],
         },
     },
   },
   ```

2. 此时在进行打包命令`npm run build`的执行, 查看编译后的结果,(大概类似如下结果)

   ```javascript
   ...
   /***/ "./src/js/index.js":
   /*!*************************!*\
     !*** ./src/js/index.js ***!
     \*************************/
   /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
   
   "use strict";
   __webpack_require__.r(__webpack_exports__);
   /* harmony import */ var core_js_modules_es6_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.to-string.js */ "./node_modules/core-js/modules/es6.object.to-string.js");
   /* harmony import */ var core_js_modules_es6_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
   /* harmony import */ var core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.promise.js */ "./node_modules/core-js/modules/es6.promise.js");
   /* harmony import */ var core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_1__);
   /* harmony import */ var core_js_modules_es6_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.map.js */ "./node_modules/core-js/modules/es6.array.map.js");
   /* harmony import */ var core_js_modules_es6_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
   
   var arr = [new Promise(function () {}), new Promise(function () {})];
   arr.map(function (item) {
     console.log(item);
   });
   
   /***/ }),
   ...
   ```

3. 注意这里的结果：只引入了代码中实际用到的处理函数，引入量少了很多

4. 注意：我目前的版本配置中有如下警告

   ```javascript
   WARNING (@babel/preset-env): We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.
   
   You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:
   
     npm install --save core-js@2    npm install --save core-js@3
     yarn add core-js@2              yarn add core-js@3
   
   More info about useBuiltIns: https://babeljs.io/docs/en/babel-preset-env#usebuiltins
   More info about core-js: https://babeljs.io/docs/en/babel-preset-env#corejs
   
   When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
   Please remove the direct import of `@babel/polyfill` or use `useBuiltIns: 'entry'` instead.
   ```

5. 可以先忽略，后续会进行处理

   > 上面的意思是说当你使用配置 useBuiltIns 时候，建议增加 corejs配置，如果不声明的话，会默认使用 2.x 版本，而2.x的版本已经不更新，建议使用版本 3.x ，可以修改为如下配置并安装相应依赖
   >
   > ```javascript
   > {
   >   test: /\.m?js$/,
   >   exclude: /node_modules/,
   >   use: {
   >     loader: 'babel-loader',
   >       options: {
   >         presets: [
   >           [
   >             '@babel/preset-env',
   >             {
   >               useBuiltIns: 'usage',  // 它的意思是只加用户使用的那些需要编译的处理函数
   >               corejs: 3 // 需要执行 yarn add core-js@3
   >             },
   >           ],
   >         ],
   >       },
   >   },
   > },
   > ```

#### 2.9.5 继续继续优化 2

1. 上述配置中，还有其他一些配置选项，具体参考 [babel-useage](https://babeljs.io/docs/en/usage)

   ```javascript
   {
     test: /\.m?js$/,
     exclude: /node_modules/,
     use: {
       loader: 'babel-loader',
         options: {
           presets: [
             [
               '@babel/preset-env',
               {
                 // 需要支持的目标浏览器版本，如果目标浏览器版本支持语法，就会略过转换处理
                 "targets": {
                   "edge": "17",
                   "firefox": "60",
                   "chrome": "67",
                   "safari": "11.1"
                 },
                 useBuiltIns: 'usage',  // 它的意思是只加用户使用的那些需要编译的处理函数
               },
             ],
           ],
         },
     },
   },
   ```

#### 2.9.6 @babel/preset-env useBuiltIns 说明

> useBuiltIns 选项可以配置的选项有：false、entry、usage

1. false: 此时不对 polyfill 做操作。如果引入 `@babel/polyfill`，则无视配置的浏览器兼容，引入所有的 polyfill。
2. entry: 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 `import '@babel/polyfill'`，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill

   > **注意**：`import '@babel/polyfill'` 官方已经提示废弃，建议改为如下配置：
   >
   > ```javascript
   > import 'core-js/stable'
   > import 'regenerator-runtime/runtime'
   > ```

3. usage: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了自动按需添加。

#### 2.9.7 使用 @babel/plugin-transform-runtime

##### 2.9.7.1 为什么要使用它

1. 不使用它的时候配置是这样时：

   ```javascript
   ```

   

@babel/plugin-transform-runtime 有三大作用

- 自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers 里的辅助函数来替代。这样就减少了我们手动引入的麻烦。
- 当代码里使用了 core-js 的 API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的 core-js/stable;
- 当代码里使用了 Generator/async 函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的 regenerator-runtime/runtime；

1. 使用如下配置其实已经满足基本需求了

   ```javascript
   {
   	"presets": [
   		[
   			"@babel/preset-env",
   			{
   				"useBuiltIns": "usage", // 实现按需加载
   				"corejs": {
   					"version": 3,
   					"proposals": true
   				},
               // 需要支持的目标浏览器版本，如果目标浏览器版本支持语法，就会略过转换处理
               targets: {
                  // edge: '17',
   				   // firefox: '60',
   				   // chrome: '67',
   				   // safari: '11.1',
               }
   			}
   		]
   	]
   }
   ```

2. index.js 中写入如下内容

   ```javascript
   const arr = [new Promise(() => {}), new Promise(() => {})]
   arr.map((item) => {
   	console.log(item)
   })

   class Person {
   	sayname() {
   		return 'name'
   	}
   }
   var john = new Person()
   console.log(john)
   ```

3. 执行打包命令`npm run build`,查看打包后的编译效果, 内容大概类似如下

   ```javascript
   /***/ "./src/index.js":
   /*!**********************!*\
     !*** ./src/index.js ***!
     \**********************/
   /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

   "use strict";
   __webpack_require__.r(__webpack_exports__);
   /* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
   /* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
   /* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
   /* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);
   /* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
   /* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
   /* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
   /* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_3__);
   function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

   function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

   function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

   var arr = [new Promise(function () {}), new Promise(function () {})];
   arr.map(function (item) {
     console.log(item);
   });

   var Person = /*#__PURE__*/function () {
     function Person() {
       _classCallCheck(this, Person);
     }

     _createClass(Person, [{
       key: "sayname",
       value: function sayname() {
         return 'name';
       }
     }]);

     return Person;
   }();

   var john = new Person();
   console.log(john);

   /***/ }),
   ```

4. 可以看到里面声明了很多变量和函数，这会产生以下问题

   1. 如果其他的文件也有类似的语法，并且打包后是两个文件，那么两个文件中都会有类似的函数和变量，这样会导致代码重复，影响最终体积的问题。不过这么多的辅助函数，一个个记住并手动引入，平常人做不到，Babel 插件@babel/plugin-transform-runtime 就来帮我们解决这个问题。

##### 2.9.7.2 初步使用

1. 更新 package.json 文件，更改为以下内容

   ```javascript
   module.exports = {
   	presets: [
   		[
   			'@babel/preset-env',
   			{
   				useBuiltIns: 'usage',
   				corejs: {
   					version: 3,
   					proposals: true,
   				},
   				// 需要支持的目标浏览器版本，如果目标浏览器版本支持语法，就会略过转换处理
   				targets: {
   					// edge: '17',
   					// firefox: '60',
   					// chrome: '67',
   					// safari: '11.1',
   				},
   			},
   		],
   	],
   	plugins: ['@babel/plugin-transform-runtime'],
   }
   ```

2. 执行打包命令`npm run build`,查看打包后的编译效果, 内容大概类似如下

   ```javascript
   /***/ "./src/js/index.js":
   /*!*************************!*\
     !*** ./src/js/index.js ***!
     \*************************/
   /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

   "use strict";
   __webpack_require__.r(__webpack_exports__);
   /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
   /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
   /* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
   /* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
   /* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
   /* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__);
   /* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
   /* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__);

   var arr = [new Promise(function () {}), new Promise(function () {})];
   arr.map(function (item) {
     console.log(item);
   });

   var Person = /*#__PURE__*/function () {
     function Person() {
       (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Person);
     }

     (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Person, [{
       key: "sayname",
       value: function sayname() {
         return 'name';
       }
     }]);

     return Person;
   }();

   var john = new Person();
   console.log(john);
   ...
   function _defineProperties(target, props) {
     for (var i = 0; i < props.length; i++) {
       var descriptor = props[i];
       descriptor.enumerable = descriptor.enumerable || false;
       descriptor.configurable = true;
       if ("value" in descriptor) descriptor.writable = true;
       Object.defineProperty(target, descriptor.key, descriptor);
     }
   }

   function _createClass(Constructor, protoProps, staticProps) {
     if (protoProps) _defineProperties(Constructor.prototype, protoProps);
     if (staticProps) _defineProperties(Constructor, staticProps);
     Object.defineProperty(Constructor, "prototype", {
       writable: false
     });
     return Constructor;
   }

   /***/ }),
   ```

3. 此时我们发现辅助函数并没有被提取出来，仍然在编译后的代码中，此时需要引入另一个模块`@babel/runtime`

##### 2.9.7.3 xxxxxxx

#### 2.9.8 参考文档

[强烈推荐 1:「前端基建」深入 Babel 的世界](https://mp.weixin.qq.com/s?__biz=Mzg3ODAyNDI0OQ==&mid=2247486933&idx=1&sn=50a9e7812f8bc60b95038283b15fab4b&chksm=cf1b4e83f86cc795bd8dc6da8e5b0007a835ac1314715326026e73f8eb2c3ceb53109fb3121e&mpshare=1&scene=1&srcid=0409aSB7Ktrj8y5vFbNND9Ra&sharer_sharetime=1649482090275&sharer_shareid=1d8b1570dbbf3ea076148a4c359b60bd#rd)

[强烈推荐 2:姜瑞涛的官方网站之 Babel 教程](https://www.jiangruitao.com/babel/rudiments/)

[吃一堑长一智系列: 99% 开发者没弄明白的 babel 知识](https://github.com/pigcan/blog/issues/26)

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)

[Show me the code，babel 7 最佳实践](https://github.com/SunshowerC/blog/issues/5)

[用了 babel 还需要 polyfill 吗？？？](https://juejin.cn/post/6845166891015602190)

[Babel 7 升级实践](https://blog.hhking.cn/2019/04/02/babel-v7-update/)

[关于 babel 的详细解读(精华又通俗)](https://juejin.cn/post/6844904199554072583)

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://blog.csdn.net/m0_37846579/article/details/103379084?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&utm_relevant_index=1)
