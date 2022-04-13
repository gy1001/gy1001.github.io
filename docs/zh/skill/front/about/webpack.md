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

   > 注意：@babel/preset-env 是 Babel6 时代 babel-preset-latest 的增强版。该预设除了包含所有稳定的转码插件，还可以根据我们设定的目标环境进行针对性转码。
   >
   > Babel 的编译分为语法和 API 两部分：语法（诸如 const let ...解构、class 语法等）、API（诸如[].includes、[].reduce 等）
   >
   > 默认的 Babel 如下，只会编译语法，不会编译 API ；Babel 提供了 polyfill 库进行 api 的转换，同时 @babel/preset-env 提供了配置参数 useBuiltIns 进行设置如何处理。

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

   > 上面的意思是说当你使用配置 useBuiltIns 时候，建议增加 corejs 配置，如果不声明的话，会默认使用 2.x 版本，而 2.x 的版本已经不更新，建议使用版本 3.x ，可以修改为如下配置并安装相应依赖
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

##### 2.9.7.3 Babel 中 plugins 和 presets 的区别

###### 2.9.7.3.1 Plugin 与 Preset 执行顺序：

可以同时使用多个 Plugin 和 Preset，此时，它们的执行顺序非常重要。

1. **先执行完所有 Plugin，再执行 Preset。**

2. **多个 Plugin，按照声明次序顺序执行。**

3. **多个 Preset，按照声明次序逆序执行。**

#### 2.9.8 Webpack 实现对 React 框架代码的打包

1. React 是一种流行的前端框架，如何使用 webpack+babel 对 react 语法进行打包编译呢

2. 我们目前只是书写也无文件，所以无需使用 plugin-transform-runtime, 只使用 preset-ent 即可，具体配置信息如下

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
   		],
       '@babel/preset-react',
   	]
   }
   ```

3. 安装 react 依赖模块

   ```shell
   yarn add react react-dom @babel/preset-react
   ```

4. 修改 index.js 文件内容如下

   ```javascript
   import React, { Component } from 'react'
   import ReactDom from 'react-dom/client'
   class App extends Component {
   	render() {
   		return <div>Hello World</div>
   	}
   }
   // 注意 index.html 中保证有元素id 为 root
   const root = ReactDom.createRoot(document.getElementById('root'))
   root.render(<App></App>)
   ```

5. 执行打包命令`npm run dev`, 查看浏览器运行效果

6. 可以看到有 hello world 显示

#### 2.9.9 参考文档

[强烈推荐 1:「前端基建」深入 Babel 的世界](https://mp.weixin.qq.com/s?__biz=Mzg3ODAyNDI0OQ==&mid=2247486933&idx=1&sn=50a9e7812f8bc60b95038283b15fab4b&chksm=cf1b4e83f86cc795bd8dc6da8e5b0007a835ac1314715326026e73f8eb2c3ceb53109fb3121e&mpshare=1&scene=1&srcid=0409aSB7Ktrj8y5vFbNND9Ra&sharer_sharetime=1649482090275&sharer_shareid=1d8b1570dbbf3ea076148a4c359b60bd#rd)

[强烈推荐 2:姜瑞涛的官方网站之 Babel 教程](https://www.jiangruitao.com/babel/rudiments/)

[吃一堑长一智系列: 99% 开发者没弄明白的 babel 知识](https://github.com/pigcan/blog/issues/26)

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)

[Show me the code，babel 7 最佳实践](https://github.com/SunshowerC/blog/issues/5)

[用了 babel 还需要 polyfill 吗？？？](https://juejin.cn/post/6845166891015602190)

[Babel 7 升级实践](https://blog.hhking.cn/2019/04/02/babel-v7-update/)

[关于 babel 的详细解读(精华又通俗)](https://juejin.cn/post/6844904199554072583)

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://blog.csdn.net/m0_37846579/article/details/103379084?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&utm_relevant_index=1)

## 3 Webpack 的高级概念

### 3.1 Tree Shaking 概念详解

#### 3.1.1 定义

> _tree shaking_ 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。具体来说，在 webpack 项目中，有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能。通过 tree-shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。

#### 3.1.2 为什么 tree-shaking 是最近几年流行起来了

前端模块化概念已经有很多年历史了，这是因为 `tree-shaking` 的消除原理是依赖于 ES6 的模块特性。

1. ES6 module 特点：

   - 能作为模块顶层的语句出现
   - import 的模块名只能是字符串常量
   - import binding 是 immutable(不可更改) 的

   ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础。所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6 之前的模块化，比如我们可以动态 require 一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。

#### 3.1.3 使用举例

1. 新建 math.js 文件，内容如下

   ```javascript
   export const add = (a, b) => {
   	console.log('add')
   	return a + b
   }

   export const minus = (a, b) => {
   	console.log('minus')
   	return a - b
   }
   ```

2. index.js 中引入 math.js 的 add 函数，内容如下

   ```javascript
   // Tree Shaking 只支持 ES Module
   import { add } from './math'
   console.log(add(1, 2))
   ```

3. 其中 babel 的配置文件 babel.config.js 内容如下

   ```javascript
   module.exports = {
   	// presets 执行顺序是从后往前执行
   	presets: [
   		[
   			'@babel/preset-env',
   			{
   				useBuiltIns: 'usage',
   				corejs: {
   					version: 3,
   					proposals: true,
   				},
   				// 	// 需要支持的目标浏览器版本，如果目标浏览器版本支持语法，就会略过转换处理
   				targets: {
   					ie: '8',
   					// 		// edge: '17',
   					// 		// firefox: '60',
   					// 		// chrome: '67',
   					// 		// safari: '11.1',
   				},
   			},
   		],
   	],
   }
   ```

4. 这里要区分开发环境和生产环境

   开发环境下

5. webpack.config.js 配置如下

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const { HotModuleReplacementPlugin } = require('webpack')

   module.exports = {
   	mode: 'development',
   	entry: {
   		bundle: './src/js/index.js',
   	},
   	output: {
   		publicPath: '/',
   		filename: '[name].js',
   		path: path.resolve(__dirname, 'bundle'),
   	},
   	optimization: {
   		usedExports: true, // 过标记某些函数是否被使用，之后通过Terser来进行优化的
   	},
   	module: {
   		rules: [
   			{
   				test: /\.(jpg|png|gif|jpeg)$/,
   				type: 'asset/resource',
   			},
   			{
   				test: /\.ts$/,
   				use: {
   					loader: 'ts-loader',
   				},
   			},
   			{
   				test: /\.css$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {},
   					},
   					'less-loader',
   				],
   			},
   			{
   				test: /\.less$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {
   							// 通过import 加载的less文件也需要执行前两个loader
   							importLoaders: 2,
   							modules: true,
   						},
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
   			{
   				test: /\.m?js$/,
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   				},
   			},
   		],
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [
   		new HtmlWebpackPlugin({
   			template: './index.html',
   		}),
   		new CleanWebpackPlugin(),
   		new HotModuleReplacementPlugin(),
   	],
   	devServer: {
   		open: true,
   		hot: 'only',
   	},
   }
   ```

6. 执行打包命令`npm run build`,查看打包后的编译效果, 内容大概类似如下

   ```javascript
   	/***/ './src/js/math.js':
   			/*!************************!*\
     !*** ./src/js/math.js ***!
     \************************/
   			/***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
   				eval(
   					"/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"add\": () => (/* binding */ add)\n/* harmony export */ });\n/* unused harmony export minus */\nvar add = function add(a, b) {\n  console.log('add');\n  return a + b;\n};\nvar minus = function minus(a, b) {\n  console.log('minus');\n  return a - b;\n};\n\n//# sourceURL=webpack://webpack-demo/./src/js/math.js?"
   				)

   				/***/
   			},
   ```

7. 这里发现两个模块均被打包进入了，但是有一个标记(unused harmony export minus),表示没有用过的模块( 在 usedExports 设置为 true 时，会有一段注释：unused harmony export mul；这段注释的意义是什么呢？告知 Terser 在优化时，可以删除掉这段代码; usedExports 实现 Tree Shaking 是结合 Terser 来完成的。)

生产环境下

5. webpack.config.js 的配置如下

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const { HotModuleReplacementPlugin } = require('webpack')

   module.exports = {
   	mode: 'production',
   	entry: {
   		bundle: './src/js/index.js',
   	},
   	output: {
   		publicPath: '/',
   		filename: '[name].js',
   		path: path.resolve(__dirname, 'bundle'),
   	},
   	module: {
   		rules: [
   			{
   				test: /\.(jpg|png|gif|jpeg)$/,
   				type: 'asset/resource',
   			},
   			{
   				test: /\.ts$/,
   				use: {
   					loader: 'ts-loader',
   				},
   			},
   			{
   				test: /\.css$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {},
   					},
   					'less-loader',
   				],
   			},
   			{
   				test: /\.less$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {
   							// 通过import 加载的less文件也需要执行前两个loader
   							importLoaders: 2,
   							modules: true,
   						},
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
   			{
   				test: /\.m?js$/,
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   				},
   			},
   		],
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [
   		new HtmlWebpackPlugin({
   			template: './index.html',
   		}),
   		new CleanWebpackPlugin(),
   		new HotModuleReplacementPlugin(),
   	],
   	devServer: {
   		open: true,
   		hot: 'only',
   	},
   }
   ```

6. 执行打包命令`npm run build`,查看打包后的编译效果, 内容大概类似如下

   ```javascript
   'use strict' var e,r,n = {782: () => {console.log((1, 2, console.log('add'), 3))},},t = {}
   ```

7. 全局中搜不到 miuns 函数中的 console.log("miuns"),说明此函数在生产环境下没有被编译进入。已经被忽略了

#### 3.1.4 **usedExports**、**sideEffects**

事实上 webpack 实现 Tree Shaking 采用了两种不同的方案：

- usedExports：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的；
- sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用；

1. **usedExports**

   将 mode 设置为 development 模式：

   - 为了可以看到 usedExports 带来的效果，我们需要设置为 development 模式
   - 因为在 production 模式下，webpack 默认的一些优化会带来很大额影响。

   设置 usedExports 为 true 和 false 对比打包后的代码

   - 在 usedExports 设置为 true 时，会有一段注释：unused harmony export mul；
   - 这段注释的意义是什么呢？告知 Terser 在优化时，可以删除掉这段代码；

   这个时候，我们讲 minimize 设置 true：

   - usedExports 设置为 false 时，mul 函数没有被移除掉；
   - usedExports 设置为 true 时，mul 函数有被移除掉；

   所以，usedExports 实现 Tree Shaking 是结合 Terser 来完成的。

2. **sideEffects**

   sideEffects 用于告知 webpack compiler 哪些模块时有副作用的：

   - 副作用的意思是这里面的代码有执行一些特殊的任务，不能仅仅通过 export 来判断这段代码的意义；
   - 副作用的问题，在讲 React 的纯函数时是有讲过的；

   在 package.json 中设置 sideEffects 的值：

   - 如果我们将 sideEffects 设置为 false，就是告知 webpack 可以安全的删除未用到的 exports；
   - 如果有一些我们希望保留，可以设置为数组；

   比如我们有一个 format.js、style.css 文件：

   - 该文件在导入时没有使用任何的变量来接受；
   - 那么打包后的文件，不会保留 format.js、style.css 相关的任何代码；

   ```javascript
   "sideEffects": [
   	"./src/util/format.js",
   	"*.css"
   ]
   ```

3. **Webpack 中 tree shaking 的设置**

   所以，如何在项目中对 JavaScript 的代码进行 TreeShaking 呢（生成环境）？

   - 在 optimization 中配置 usedExports 为 true，来帮助 Terser 进行优化；

   - 在 package.json 中配置 sideEffects，直接对模块进行优化；

### 3.2 Develoment 和 Production 模式的区分打包

#### 3.2.1 分离的配置文件

1. 实际开发中要区分 development、production 模式，所以配置文件需要分离开

2. 新建开发环境下的配置文件 webpack.dev.js，内容如下

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const { HotModuleReplacementPlugin } = require('webpack')

   module.exports = {
   	// development 默认没有 tree shaking
   	mode: 'development',
   	devtool: 'eval-cheap-module-source-map',
   	entry: {
   		bundle: './src/js/index.js',
   	},
   	output: {
   		publicPath: '/',
   		// publicPath: 'https://xxcdn.com/',
   		filename: '[name].js',
   		path: path.resolve(__dirname, 'bundle'),
   	},
   	optimization: {
   		usedExports: true,
   	},
   	module: {
   		rules: [
   			{
   				test: /\.(jpg|png|gif|jpeg)$/,
   				type: 'asset/resource',
   			},
   			{
   				test: /\.ts$/,
   				use: {
   					loader: 'ts-loader',
   				},
   			},
   			{
   				test: /\.css$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {
   							// 引入模块化，
   							// modules: true,
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
   						loader: 'css-loader',
   						options: {
   							// 通过import 加载的less文件也需要执行前两个loader
   							importLoaders: 2,
   							modules: true,
   						},
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
   			{
   				test: /\.m?js$/,
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   				},
   			},
   		],
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [
   		new HtmlWebpackPlugin({
   			template: './index.html',
   		}),
   		new CleanWebpackPlugin(),
   		new HotModuleReplacementPlugin(),
   	],
   	devServer: {
   		open: true,
   		hot: 'only',
   	},
   }
   ```

3. 新建生产环境配置文件 webpack.prod.js, 文件内容如下

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const { HotModuleReplacementPlugin } = require('webpack')

   module.exports = {
   	mode: 'production',
   	devtool: 'nosources-source-map',
   	entry: {
   		bundle: './src/js/index.js',
   	},
   	output: {
   		publicPath: '/',
   		// publicPath: 'https://xxcdn.com/',
   		// filename: 'bundle.js',
   		filename: '[name].js',
   		path: path.resolve(__dirname, 'bundle'),
   	},
   	module: {
   		rules: [
   			{
   				test: /\.(jpg|png|gif|jpeg)$/,
   				type: 'asset/resource',
   				// generator: {
   				// 	filename: 'images/[name][ext]',
   				// },
   				// use: {
   				// 	loader: 'file-loader',
   				// 	options: {
   				// 		esModule: false,
   				// 		// placeholder 占位符
   				// 		name: '[name].[ext]',
   				// 		// 设置打包后的文件夹
   				// 		outputPath: 'images/',
   				// 	},
   				// },
   			},
   			{
   				test: /\.ts$/,
   				use: {
   					loader: 'ts-loader',
   				},
   			},
   			{
   				test: /\.css$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {
   							// 引入模块化，
   							// modules: true,
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
   						loader: 'css-loader',
   						options: {
   							// 通过import 加载的less文件也需要执行前两个loader
   							importLoaders: 2,
   							modules: true,
   						},
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
   			{
   				test: /\.m?js$/,
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   				},
   			},
   		],
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [
   		new HtmlWebpackPlugin({
   			template: './index.html',
   		}),
   		new CleanWebpackPlugin(),
   	],
   }
   ```

4. 相应编译时候的命令更改如下

   ```javascript
   "scripts": {
     "start": "webpack-dev-server --config webpack.dev.js",
     "build": "webpack --config webpack.prod.js",
   }
   ```

#### 3.2.2 如何合并相同部分，分离差异部分

> 涉及到 webpack-merge, 帮助我们合并相关配置
>
> 安装命令：npm install webpack-merge

1. 新建 webpack.common.js 文件，文件内容（是相同的部分）如下：

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')

   module.exports = {
   	entry: {
   		bundle: './src/js/index.js',
   	},
   	output: {
   		publicPath: './',
   		filename: '[name].js',
   		path: path.resolve(__dirname, 'bundle'),
   		assetModuleFilename: 'images/[name][ext]',
   	},
   	module: {
   		rules: [
   			{
   				test: /\.(jpg|png|gif|jpeg)$/,
   				type: 'asset/resource',
   				// generator: {
   				// 	filename: 'images/[name][ext]',
   				// },
   				// use: {
   				// 	loader: 'file-loader',
   				// 	options: {
   				// 		esModule: false,
   				// 		// placeholder 占位符
   				// 		name: '[name].[ext]',
   				// 		// 设置打包后的文件夹
   				// 		outputPath: 'images/',
   				// 	},
   				// },
   			},
   			{
   				test: /\.ts$/,
   				use: {
   					loader: 'ts-loader',
   				},
   			},
   			{
   				test: /\.css$/,
   				use: [
   					'style-loader',
   					{
   						loader: 'css-loader',
   						options: {
   							// 引入模块化，
   							// modules: true,
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
   						loader: 'css-loader',
   						options: {
   							// 通过import 加载的less文件也需要执行前两个loader
   							importLoaders: 2,
   							modules: true,
   						},
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
   			{
   				test: /\.m?js$/,
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   				},
   			},
   		],
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [
   		new HtmlWebpackPlugin({
   			template: './index.html',
   		}),
   		new CleanWebpackPlugin(),
   	],
   }
   ```

2. 开发环境下的配置文件 webpack.dev.js，内容精简如下

   ```javascript
   const { HotModuleReplacementPlugin } = require('webpack')
   const { merge } = require('webpack-merge')
   const commonConfig = require('./webpack.common.js')
   const devConfig = {
   	mode: 'development',
   	devtool: 'eval-cheap-module-source-map',
   	optimization: {
   		usedExports: true,
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [new HotModuleReplacementPlugin()],
   	devServer: {
   		open: true,
   		hot: 'only',
   	},
   }
   module.exports = merge(commonConfig, devConfig)
   ```

3. 生产环境配置文件 webpack.prod.js, 内容精简如下

   ```JavaScript
   const commonConfig = require('./webpack.common.js')
   const { merge } = require("webpack-merge")
   const prodConfig = {
   	mode: 'production',
   	devtool: 'nosources-source-map',
   }
   module.exports = merge(commonConfig, prodConfig )
   ```

4. 其他的打包命令不变

### 3.3 Webpack 和 Code Splitting

#### 3.2.3.1 Code Splitting 是什么以及为什么

> 在以前，为了减少 HTTP 请求，通常地，我们都会把所有的代码都打包成一个单独的 JS 文件。但是，如果这个 JS 文件体积很大的话，那就得不偿失了。
>
> 这时，我们不妨把所有代码分成一块一块，需要某块代码的时候再去加载它；还可以利用浏览器的缓存，下次用到它的话，直接从缓存中读取。很显然，这种做法可以加快我们网页的加载速度，美滋滋！

#### 3.2.3.2 Code Splitting 怎么做

主要有 2 种方式：

- [分离业务代码和第三方库](https://webpack.js.org/guides/code-splitting/#resource-splitting-for-caching-and-parallel-loads)（ vendor ）: 之所以把业务代码和第三方库代码分离出来，是因为产品经理的需求是源源不断的，因此业务代码更新频率大，相反第三方库代码更新迭代相对较慢且可以锁版本，所以可以充分利用浏览器的缓存来加载这些第三方库。
- [按需加载](https://webpack.js.org/guides/code-splitting/#resource-splitting-for-caching-and-parallel-loads)（利用 [import()](https://github.com/tc39/proposal-dynamic-import) 语法）:而按需加载的适用场景，比如说「访问某个路由的时候再去加载对应的组件」，用户不一定会访问所有的路由，所以没必要把所有路由对应的组件都先在开始的加载完；更典型的例子是「某些用户他们的权限只能访问某些页面」，所以没必要把他们没权限访问的页面的代码也加载。

1. 假设我们的项目中使用了 vue、lodash、element-ui 等三方依赖，如果不使用 code spliting 的话，打包后的文件内容全部在目标文件 dist.js 中，文件就显得很大很臃肿，下次业务代码发生了改变，重新打包，仍然要重新加载很大的文件。相对的效率不太友好；对于第三方依赖的库，一般情况下，不会有改变，其实完全可以抽离出去，变为一个不变的文件处理

##### 3.2.3.2.1 分离 Vendor

> 最简单方法就是：加一个 entry ( [File Changes](https://github.com/lyyourc/webpack-code-splitting-demo/commit/6324e8a591b0c2b1fe5cd6c288a2cdfe56e17550) )：

```javascript
// webpack.config.js
module.exports = {
	entry: {
		main: './src/index.js',
		vendor: ['vue', 'axios', 'element-ui', 'jquery'],
	},
}
```

1. 安装 vue、axios

   ```shell
   yarn add vue axios
   ```

2. index.js 中引入相应依赖，增加如下代码

   ```javascript
   import Vue from 'vue'
   import Axios from 'axios'
   ```

3. 打包命令中添加如下命令

   ```javascript
   "scripts": {
     "build": "webpack --config webpack.prod.js",
     "start": "webpack-dev-server --config webpack.dev.js",
     "build:test": "webpack --config webpack.dev.js"
   },
   ```

4. `webpack.dev.js`中的配置文件增加如下内容

   ```javascript
   entry: {
     vendor: ['vue', 'axios'],
   },
   ```

5. 执行命令`npm run build:test`, 后发现 dist 目录中有文件 vendor.js 和 main.js

6. 我们如果打开时候会发现：虽然 vendor.js 这个 entry chunk 包含了我们想要的 vue 和 axios ，但是 main.js 也包含了他们！为什么！？这是因为：每个 entry 都包含了他自己的依赖，这样他才能作为一个入口，独立地跑起来。很难受，事实上我们并不想 app.js 还包含了 vue 和 axios 。如果可以把他们俩相同的依赖提取出来就好了。如果想要提取公共模块的话，就需要用到 [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) 这个插件。

##### 3.2.3.2.2 ~~使用 CommonsChunkPlugin 插件~~（ webpack4 后已被移除，推荐使用 `optimization.splitChunks`.）

> 注意：从 webpack4 以后， `CommonsChunkPlugin` 被移除了，来支持 `optimization.splitChunks`.

1. webpack.dev.js 文件中需要做如下修改配置

   ```javascript
   const { optimize } = require('webpack')

   plugins: [
     ...,
     new optimize.CommonsChunkPlugin({
       name: 'vendor',
     }),
   ]
   ```

##### 3.2.3.2.3 使用`optimization.splitChunks`

1. webpack.dev.js 中的以下代码删除

   ~~entry~~: {~~
   ~~vendor: ['vue', 'axios'],~~
   ~~},~~

2. 添加如下代码

   ```javascript
   const { optimize } = require('webpack')

   plugins: [
   	...new optimize.SplitChunksPlugin({
   		name: 'vendor',
   	}),
   ]
   ```

3. 执行命令`npm run build:test`, 后发现 dist 目录中有文件 vendor.js 和 main.js, 并且 vendor.js 中添加了 vue、axios 等第三方库，而 main.js 文件只有我们编写的相关业务代码

4. 虽然说这样将第三方模块单独打包出去能够减小入口文件的大小，但这样仍然是个不小的文件；这个小的测试项目中我们使用到了 axios 和 lodash 这两个第三方模块，因此我们希望的应该是将这两个模块单独分离出来两个文件，而不是全部放到一个 vendors 中去，那么我们继续配置 webpack.config.js:

5. **如何将每个 npm 包单独分离出来**

   > 这里我们主要做了几件事：为了避免每次打包的文件哈希变化，我们可以使用 webpack 内置的 HashedModuleIdsPlugin，这样可以避免每次打包的文件哈希值变化
   >
   > 首先增加 maxInitialRequests 并设置成 Infinity，指定这个入口文件最大并行请求数
   >
   > 然后将 minSize 和 minChunks 分别设置成 0 和 1，即使模块非常小也将其提取出来，并且这个模块的引用次数只有 1 也要提取
   >
   > 最后配置匹配的依赖以及分离出的文件名格式
   >
   > 另外，我们还将运行时代码分离出来，这块代码还可以配合 **InlineManifestWebpackPlugin** 直接插入到 HTML 文件中。这里我们将这个配置设置成 single，即将所有 chunk 的运行代码打包到一个文件中

   ```javascript
   const path = require('path')
   const webpack = require('webpack')

   module.exports = {
   	mode: 'development',
   	entry: path.resolve(__dirname, 'src/index.js'),
   	plugins: [
   		new webpack.ids.HashedModuleIdsPlugin(), // 根据模块的相对路径生成 HASH 作为模块 ID
   	],
   	output: {
   		path: path.resolve(__dirname, 'dist'),
   		filename: '[name].[contenthash].js',
   	},
   	optimization: {
   		runtimeChunk: 'single',
   		splitChunks: {
   			chunks: 'all', // 默认 async 可选值 all 和 initial
   			maxInitialRequests: Infinity, // 一个入口最大的并行请求数
   			minSize: 0, // 避免模块体积过小而被忽略
   			minChunks: 1, // 默认也是一表示最小引用次数
   			cacheGroups: {
   				vendor: {
   					test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称
   					name(module, chunks, chcheGroupKey) {
   						// 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
   						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称
   						return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除
   					},
   				},
   			},
   		},
   	},
   }
   ```

### 3.4 SplitChunksPlugin 配置参数详解

1. Webpack 之魔法注释 /_ webpackChunkName: x x x x _/ 的做用

   魔术注释是由 Webpack 提供的，可以为代码分割服务的一种技术。通过在 import 关键字后的括号中使用指定注释，我们可以对代码分割后的 chunk 有更多的控制权，让我们看一个例子：

   **通过这样的配置，我们可以对分离出的 chunk 进行命名，这对于我们 debug 而言非常方便。**

   ```javascript
   // index.js
   import (
     /* webpackChunkName: "my-chunk-name" */
     './footer'
   )
   同时，也要在 webpack.config.js 中做一些改动：
   // webpack.config.js
   {
     output: {
       filename: "bundle.js",
       chunkFilename: "[name].lazy-chunk.js"
     }
   }
   ```

2. 参数详解

   > `chunks`的意思是对那些类型的代码进行分割，`all`是全部、`async`是异步、`initial`是同步;
   >
   > `minSize`的意思是引入的模块必须大于 30kb，才会进行代码分割；
   >
   > `maxSize`的意思是如果引入的模块，如果大于 50kb，进行二次分割，分成多个文件；
   >
   > `minChunks`当模块引入次数大于 1 时，才会进行代码分割；
   >
   > `maxAsyncRequests`同时加载 5 个以上的 js 文件，并行请求的最大数目为 5；
   >
   > `maxInitialRequests` 入口文件中，如果加载的模块大于 3 个时，不再进行代码分割；
   >
   > `automaticNameDelimiter`表示拆分出的 chunk 的名称连接符。默认为~。如 vendors~main.js;
   >
   > `name` 可重新定义打包后的文件名称，cacheGroups 的 vendors 的 filename 生效;
   >
   > `priority`当一个文件的打包条件同时满足`vendors`以及`default`中的条件时,会根据`priority`的大小优先选择应用那个，数值越大优先级越高；
   >
   > `reuseExistingChunk`如果 a 模块引用的模块 b 已经打包过，再打包时 b 模块不再进行打包，直接使用;

   ```javascript
   splitChunks: {
      chunks: 'async', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 30000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      maxSize: 0, // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
      automaticNameDelimiter: '~', // 文件生成时的连接符
      automaticNameMaxLength: 30, // 自动生成的文件名的最大长度
      cacheGroups: {
         vendor: {
            test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
            priority: -10, // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
               name(module, chunks, cacheGroupKey) { // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
               const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称
               return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除
            }
         },
         defaultVendors: {
            priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
            reuseExistingChunk: true // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
            filename: (pathData) => {
               // Use pathData object for generating filename string based on your requirements
               return `${pathData.chunk.name}-bundle.js`;
            },
         }
      }
   }
   ```

3. 参考文档:

   [使用 webpack 代码分割和魔术注释提升应用性能](https://segmentfault.com/a/1190000039134142)

   [Code Splitting 以及 SplitChunksPlugin 配置参数详解](https://juejin.cn/post/6975898319780315173)

### 3.5 Lazy Loading 懒加载，Chunk 是什么？
