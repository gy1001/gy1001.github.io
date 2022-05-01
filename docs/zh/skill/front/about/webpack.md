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
   optimization: {
   	splitChunks: {
   		chunks: 'async', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
       minSize: 30000, // 例如导入10kb的依赖包小于30kb便不会拆分代码块
       maxSize: 50000, // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
   		minChunks: 1, // 引入的次数大于等于1时才进行代码分割
   		maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
   		maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
   		automaticNameDelimiter: '~', // 文件生成时的连接符
   		cacheGroups: {
   			vendor: {
   				test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
   				priority: -10, // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
   				name(module, chunks, cacheGroupKey) {
   					// 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
   					const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称
   					return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除
   				},
   			},
   			defaultVendors: {
   				priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
   				reuseExistingChunk: true, // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
   				filename: (pathData) => {
   					// Use pathData object for generating filename string based on your requirements
   					return `${pathData.chunk.name}-bundle.js`
   				},
   			},
   		},
   	},
   }
   ```

3. 参考文档:

   [使用 webpack 代码分割和魔术注释提升应用性能](https://segmentfault.com/a/1190000039134142)

   [Code Splitting 以及 SplitChunksPlugin 配置参数详解](https://juejin.cn/post/6975898319780315173)

   [代码干燥计划之 SplitChunksPlugin](https://drylint.com/Webpack/SplitChunksPlugin.html)

### 3.5 Lazy Loading 懒加载，Chunk 是什么？

#### 3.5.1 Lazy Loading 基本示例

1. index.js 中更改为如下内容

   ```javascript
   import { add } from './math'
   console.log(add(1, 2))

   function getVueComponent() {
   	return import(/*webpackChunkName:"vue"*/ 'vue').then((vue) => {
   		console.log(vue)
   	})
   }

   setTimeout(() => {
   	getVueComponent()
   }, 3000)
   ```

2. 重新运行编译命令`npm run start`，打开浏览器观看效果

3. 首先加载`add`函数，打印出结果，3s 延迟后加载 vue 模块，并打印出结果。可以在开发工具中的网络查看懒加载过程。

#### 3.5.2 chunk 是什么

> ##### `webpack`打包的过程种，生成的`JS文件`，每一个`JS文件`我们都把它叫做`Chunk`。

注意上面配置的参数 minChunks、以及 chunks：all 配置等

#### 3.5.3 参考文献

[Chunk 是什么？](https://www.jianshu.com/p/c73570cb934b)

### 3.6 打包分析，Preloading, Prefetching

#### 3.6.1 官方打包分析

1. 打开地址 https://github.com/webpack/analyse 查看 analyse 打包命令

2. 修改打包脚本命令，增加如下命令

   ```shell
   "scripts": {
     "analyse": "webpack --profile --json > stats.json --config webpack.prod.js",
   },
   ```

3. 执行命令`npm run analyse`, 查看文件新增加 stats.json

4. 打开网址：https://webpack.github.io/analyse/ 上传 stats.json ，它会显示分析结果

#### 3.6.2 官方其他工具分析

> 地址：https://webpack.js.org/guides/code-splitting/#bundle-analysis

1. [webpack-chart](https://alexkuz.github.io/webpack-chart/): Interactive pie chart for webpack stats.
2. [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): Visualize and analyze your bundles to see which modules are taking up space and which might be duplicates.
3. [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): A plugin and CLI utility that represents bundle content as a convenient interactive zoomable treemap.
4. [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize): This tool will analyze your bundle and give you actionable suggestions on what to improve to reduce your bundle size.
5. [bundle-stats](https://github.com/bundle-stats/bundle-stats): Generate a bundle report(bundle size, assets, modules) and compare the results between different builds.

#### 3.6.3 preloading、prefetching

> preloading：设置这个指令，就会在当前的页面中，以较高优先级预加载某个资源。其实就相当于浏览器的预加载，但是浏览器的预加载只会加载 html 中声明的资源，但是 preloading 突破了这个限制，连 css 和 js 资源也可以预加载一波。
>
> Prefetching：设置这个指令，就表示允许浏览器在后台（空闲时）获取将来可能用得到的资源，并且将他们存储在浏览器的缓存中。
> 这两种其实都是 webpack 提供的资源加载优化的方式，反正如果就是设置了这几个指令，就会先走个 http 的缓存，然后下次再次请求的时候直接从缓存里面拿，这样就节省了加载的时间。

##### 3.6.3.1 设置 Prefetching

> 使用魔法注释的方式，在需要预加载的地方添加：

```javascript
document.body.addEventListener('click', () => {
	import(/* webpackPrefetch: true */ './footer.js').then((module) => {
		console.log(module)
		module.createFooter()
	})
})
```

##### 3.6.3.2 设置 Preloading

```javascript
document.body.addEventListener('click', () => {
	import(/* webpackPreload: true */ './footer.js').then((module) => {
		console.log(module)
		module.createFooter()
	})
})
```

##### 3.6.3 使用时机

Preloading 什么时候用呢？比如说，你页面中的很多组件都用到了 jQuery，比较强依赖这个东西，那么我们就可以当 import 引入 jQuery 库的时候设置为 Preloading，让他预加载一波。

而 Prefetching 我们一般用的比较多，也比较好理解，用官网的例子来说：一般当我们进入一个网站首页，只有当点击登录按钮的时候模态框才需要弹出来，那么我们就可以对这个 login 模态框组件做下 Prefetching，当首页加载完毕，浏览器空闲的时候提前加载一下，这样当用户点击登录按钮就可以直接从缓存里面加载这个组件了。

##### 参考文献

[prefetching 和 preloading](https://www.jianshu.com/p/2ad9535968aa)

[webpack Prefetching/Preloading](https://blog.csdn.net/ks8380/article/details/107825899)

[聊一聊 webpack 中的 preloading 和 Prefetching](http://www.360doc.com/content/20/0820/08/65839755_931232900.shtml)

### 3.7 CSS 文件的分割

> 知识点： output 中有 filename、chunkFilename 两个配置项，有何区别呢？前者表示是入口文件打包后的文件名规则，而后者是相关依赖产生的文件名配置规则。

#### 3.7.1 MiniCssExtractPlugin

1. 安装命令

   ```shell
   npm install --save-dev mini-css-extract-plugin
   ```

2. 创建 style.css, 并在 index.js 中引用， 内容如下

   ```css
   body {
   	background: green;
   }
   ```

3. **webpack.dev.config.js** 修改如下

   ```javascript
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')

   module.exports = {
   	plugins: [new MiniCssExtractPlugin()],
   	module: {
   		rules: [
   			{
   				test: /\.css$/i,
   				use: [MiniCssExtractPlugin.loader, 'css-loader'],
   			},
   		],
   	},
   }
   ```

4. 注意 package.json 中的 相关配置需要有如下设置

   ```javascript
   {
     "sideEffects": ["*.css"],
   }
   ```

#### 3.7.2 css-minimizer-webpack-plugin

> 注意： Optimize CSS Assets Webpack Plugin： For webpack v5 or above please use [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin) instead.
>
> Webpack 5 中建议使用 css-minimizer-webpack-plugin

1. 安装

   ```shell
   npm install css-minimizer-webpack-plugin --save-dev
   ```

2. Webpack.配置文件中做如下更改（本例中为 webpack.prod.js）

   ```javascript
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

   module.exports = {
   	module: {
   		rules: [
   			{
   				test: /.s?css$/,
   				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
   			},
   		],
   	},
   	optimization: {
   		minimizer: [
   			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
   			// `...`,
   			new CssMinimizerPlugin(),
   		],
   	},
   	plugins: [new MiniCssExtractPlugin()],
   }
   ```

   注意：This will enable CSS optimization only in production mode。If you want to run it also in development set the `optimization.minimize` option to `true` （这只在生产环境中使 CSS 优化器生效，如果你想要在开发环境中使用，设置 optimization.minimize 选项为 true）

   ```javascript
   // [...]
   module.exports = {
   	optimization: {
   		// [...]
   		minimize: true,
   	},
   }
   ```

3. 运行打包命令`npm run build`, 即可发现打包后的文件被压缩了

4.

#### 3.7.3 文档参考

[webpack 之 MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)

[『Webpack 系列』—— MiniCssExtractPlugin 插件用法详解](https://juejin.cn/post/6850418117500715015)

[webpack 之 CssMinimizerWebpackPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

### 3.8 Webpack 与浏览器缓存( Caching )

#### 3.8.1 filename 和 chunkFilename

1. 目前的 打包设置 output 是类似下面这样的

   ```javascript
   output: {
      publicPath: '/',
      filename: '[name].js',
      path: path.resolve(__dirname, 'bundle'),
      assetModuleFilename: 'images/[name][ext]',
   },
   ```

2. 打包后的文件是类似 vendor.js、main.js 等，

3. 这样把文件上传到服务器后，如果用户访问，第一次是会获取最新的代码，然后浏览器会缓存下来

4. 下次在进行访问时候，会通过本地缓存进行获取渲染页面

5. 如果这时候我们更改了一些业务代码，再次执行打包命令，打包后的文件名字没有变化(其实内容已经变化了)，然后把文件上传到服务器

6. 这时候用户如果刷新(非强刷)时，这时候是不会获取最新上传的代码的

7. 那怎么处理呢

#### 3.8.2 contenthash

> contenthash 占位符，是根据内容生成的 hash，内容不变，hash 就不变

1. 这时候我们可以在 output 项目设置如下

   ```javascript
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].js"
   },
   ```

2. 这样修改后通过打包命令打包后的文件会是如下的样子

   ```javascript
   index.html、main.fadsff787f89675.js  vendor.78asdfasdh90s90f89.js
   ```

3. 这样把文件上传到服务器后，如果用户访问，第一次是会获取最新的代码，然后浏览器会缓存下来

4. 如果这时候我们更改了一些业务代码，再次执行打包命令，打包后的文件名字没有变化(其实内容已经变化了)，然后把文件上传到服务器

   ```javascript
   // 打包后，未发生变化的 vendor 是不会变化的
   index.html、main.fadsff787f8788.js  vendor.78asdfasdh90s90f89.js
   ```

5. 这样用户在服务器更新后，没有变化的文件本地有同名文件，直接使用；而发生变化的，由于 contenthash 不同，所以本地没有同名文件，就会去服务器重新获取最新的文件

6. 这样就起到了始终访问的是最新的，并且又合理利用了缓存功能，加快了响应速度

#### 3.8.3 文献参考

[webpack 与浏览器缓存（caching）](https://cloud.tencent.com/developer/article/1602205)

下面的文章又对老版本的 webapck，做单独处理：相关理论如下

> 我们已经知道，业务代码存在于 main 中，第三方库代码存在于 vendors 中，但是库和业务逻辑之间也是有关联的，这个关联就是`manifest`，默认 manifest 是存在于 main 也存在于 vendors 中的，在不同版本的 webapck 中，`manifest`可能有差异，（可能存在 content 不改变改变 manifest 改变，从而影响其他文件改变）这就导致了上面出现的，旧版本 webpack4 中，即使没有改变 content，hash 也会改变。当我们配置了`runtimeChunk`就会吧`manifest`中的代码提出来到 runtime.js 中，这样的话，main 和 vendors 相对独立一点，就不会出现上面的问题了。当然了，新版本的 webpack 也是可以配置的，大家不放试一试，不过新版本可以不用配置。

[webpack 与浏览器缓存(Caching)](https://www.jianshu.com/p/906c61a716e6)

### 3.9 Shimming 的作用

> **_shimming_** **将一个新的 API 引入到一个旧的环境中，而且仅靠旧的环境中已有的手段实现。**
>
> **_ProvidePlugin_** 我们在程序中暴露一个变量，通知 webpack 某个库被使用，webpack 将在最终的 bundle 中引入该库。

#### 3.9.1 初步使用

1. 安装 `lodash`

   ```shell
   npm install lodash -D
   ```

2. index.js 中更改为如下代码

   ```javascript
   // 注意：这里没有写：import _ from "lodash"
   function component() {
   	var element = document.createElement('div')
   	element.innerHTML = _.join(['hello', 'webpack'], ' ')
   	return element
   }
   document.body.appendChild(component())
   ```

3. `webpack.common.js`中进行如下添加

   ```javascript
   plugins: [
   	new webpack.ProvidePlugin({
   		_: 'lodash',
   	}),
   ]
   ```

4. 运行命令`npm run start`, 打开浏览器，可以看到界面中显示 "hello webpack"

5. 运行命令`npm run build`, 可以看到打包后的文件大小略大，1M 左右

#### 3.9.2 还可以利用 ProvidePlugin 暴露库中的单一函数（变量）

1. index.js 中代码可以更改为如下

   ```javascript
   function component() {
   	var element = document.createElement('div')
   	element.innerHTML = join(['hello', 'webpack'], ' ')
   	return element
   }
   document.body.appendChild(component())
   ```

2. 注意，这个文件里不需要 import \_ from lodash 了

   ```javascript
   // webpack.common.js 更改如下
   plugins: [
   	new CleanWebpackPlugin(),
   	new HtmlWebpackPlugin({
   		title: 'shimming',
   	}),
   	// 参照官网使用 webpack.ProvidePlugin 的 treeshaking 写法无效: join: ['lodash', 'join']
   	// 更改为如下有效
   	new webpack.ProvidePlugin({
   		join: 'lodash-es/join',
   	}),
   ]
   ```

   注意：这样，就可以将 lodash 库中的其他没用到的部分去除。（tree shaking）

   > 任何需要 AST 的功能，ProvidePlugin 都无法正常运行

3. 运行命令`npm run start`, 打开浏览器，可以看到界面中显示 "hello webpack"

4. 运行打包命令`npm run prod-build` , 打包体积明显减少了很多

5. 注意：以下问题

   > 我想要使用 `lodash` 中的 `chunk` 方法，但是直接导入 `lodash` 并打包显然很冗余，因为我就用 `chunk` 那个方法而已，多了没用。`treeshaking` 就负责帮你只引用 `chunk`，把多余的代码像摇树一样摇掉。
   >
   > `treeshaking` 是基于 `ES6` 的 `import` 和 `export` 语法，我在实践中遇到了以下几个问题
   >
   > **1. 如下语法无效**
   >
   > ```jsx
   > import { chunk } from 'lodash'
   > ```
   >
   > `lodash` 模块不支持 `ES6` 写法，需要使用 `lodash-es` 模块
   > **2. 参照官网使用 webpack.ProvidePlugin 的 treeshaking 写法无效** > [官网写法](https://links.jianshu.com/go?to=https%3A%2F%2Fwebpack.docschina.org%2Fguides%2Fshimming%2F%23shimming-%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F)：
   >
   > ```csharp
   >     plugins: [
   >       new webpack.ProvidePlugin({
   > -       _: 'lodash'
   > +       join: ['lodash', 'join']
   >       })
   >     ]
   > ```
   >
   > 目前写法：
   >
   > ```css
   > new webpack.ProvidePlugin({
   >   _join: "lodash-es/join"    //   lodash/join 也可
   > })
   > ```
   >
   > **3. treeshaking 在 development 模式下无效，production 下效果正常** > **4. 还有一种情况也会导致 treeshaking 无效。当你使用 babel 进行语法转换时， babel 有可能会将你的 import 语法进行了转换，而 treeshaking 是基于 import 语法的。你需要做的是把 babel 的配置文件 .babelrc 中添加如下字段 "modules":false**
   >
   > ```json
   > {
   > 	"presets": [
   > 		[
   > 			"env",
   > 			{
   > 				"modules": false
   > 			}
   > 		]
   > 	]
   > }
   > ```
   >
   > PS：**[modules](https://links.jianshu.com/go?to=https%3A%2F%2Fbabel.docschina.org%2Fdocs%2Fen%2Fbabel-preset-env%23modules)** 字段用于将 `ES6` 写法转换为 `CommonJS`、`AMD` 等规范的写法，`false` 就是保留 `ES6` 的 `import` 写法，不进行转换
   >
   > 作者：\_月光临海
   > 链接：https://www.jianshu.com/p/193b00d57ef5
   > 来源：简书
   > 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#### 3.9.3 imports-loader 覆写 this 指向

> [参考官网](https://webpack.docschina.org/guides/shimming/#granular-shimming)

1. 先进行安装

   ```shell
   npm i imports-loader
   ```

2. 在 CommonJS 环境下，this 指向 module.exports。通过 imports-loader 将 this 指向 window.

3. index.js 修改如下

   ```javascript
   function component() {
   	var element = document.createElement('div')
   	element.innerHTML = join(['hello', 'webpack'], ' ')
   	this.alert('test hahaha')
   	return element
   }
   document.body.appendChild(component())
   ```

4. module 中的 rules 添加如下规则

   ```javascript
   module: {
   	rules: [
   		{
   			test: require.resolve('./src/index.js'),
   			use: 'imports-loader?wrapper=window',
   		},
   	]
   }
   ```

5. 运行命令 `npm run start` , 打开浏览器, 可以看到界面中显示 "hello webpack"

#### 3.9.4 全局 Exports: **_exports-loader_** 将一个全局变量作为一个普通模块导出。

> [官网链接](https://webpack.docschina.org/guides/shimming/#global-exports)

1. 安装命令

   ```shell
   npm i exports-loader
   ```

2. 新建 global.js 文件

   > 注意：这个文件中没有任何 export 语句。

   ```javascript
   const file = 'blah.txt'
   const helpers = {
   	test: function () {
   		console.log('test something')
   	},
   	parse: function () {
   		console.log('parse something')
   	},
   }
   ```

3. `webpack.common.js` 增加如下代码

   ```javascript
   module: {
   	rules: [
   		{
   			test: require.resolve('./src/global.js'),
   			use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
   		},
   	]
   }
   ```

4. `index.js`中修改如下

   ```javascript
   const { file, parse } = require('./global.js')

   parse()
   console.log(file)
   ```

5. 运行命令`npm run start`, 打开浏览器可以在控制台看到效果

   ```shell
   "scripts": {
   	"start": "webpack server --config webpack.common.js",
   },
   ```

#### 3.9.5 加载 Polyfills

> 我们通常的做法是先检查当前浏览器是否支持某个 API，如果不支持的话就加载对应的 polyfill。

#### 3.9.6 **_script-loader_**

> 会在全局上下文中对代码进行取值，类似于通过一个 `script` 标签引入脚本。在这种模式下，每一个标准的库(library)都应该能正常运行。require,module 等取值为 undefine.
>
> 当使用 script-loader 时，模块将转化为字符串，然后添加到 bundle 中。它不会被 webpack 压缩，所以应该选择一个 min 版本。同时，script-loader 将不会有 devtool 的支持。

这些老旧的模块如果没有 AMD/CommonJS 规范版本，但你也想将他们加入 /dist 目录，你可以使用 **_`noParse`_** 来标识出这个模块。这样就能使 webpack 将引入这些模块，但是不进行转化(parse)和解析(resolve) `require`和 `import` 语句。这个实践将提升构建性能。

#### 3.9.7 **_thread-loader_**

可以将非常消耗资源的 loaders 转存到 worker pool 中。

#### 3.9.8 **_cache-loader_** 启用持久化缓存

可以在多个编译之间共享缓存。使用 `package.json` 中的 `"postinstall"` 清除缓存目录。

#### 3.9.x 参考文献

[webpack 指南：shimming](https://www.cnblogs.com/ceceliahappycoding/p/12259786.html)

[webpack 官网之 shimming](https://webpack.js.org/guides/shimming/)

[webpack 中文文档之 shimming](https://www.webpackjs.com/guides/shimming/)

[webpack4 模板配置及遇到的问题](https://www.jianshu.com/p/193b00d57ef5)

### 3.10 环境变量的使用方法

#### 3.10.1 初步应用

> 此用法不建议，只做了解就可，主流的不用这种

1. 修改打包脚本命令如下

   ```javascript
   "scripts": {
      "dev-build": "webpack --config webpack.common.js",
      "prod-build": "webpack --env production --config webpack.common.js"
   },
   ```

2. 修改 `webpack.common.js` 文件内容如下
   ```javascript
   ...
   const { merge } = require('webpack-merge')
   const devConfig = require('./webpack.dev')
   const prodConfig = require('./webpack.prod')
   const commonConfig = {
     entry:{ ...},
   ...
   }
   module.exports = (env) => {
     if (env && env.production) {
       return merge(commonConfig, prodConfig)
     }
     return merge(commonConfig, devConfig)
   }
   ```
3. 再次执行如下打包命令

   ```shell
   npm run dev-build  // 产生测试环境的结果
   npm run prod-build // 产生生产环境的结果
   ```

#### 3.10.2 参考文献

[webpack 使用环境变量](https://webpack.js.org/guides/environment-variables/)

## 4. Webpack 实战配置案例讲解

### 4.1 Library 的打包

#### 4.1.1 没有使用依赖的自有库 library

> 上面的教程更多是开发业务代码，除了打包应用程序，webpack 还可以用于打包 JavaScript library。以下指南适用于希望简化打包策略的 library 作者。

1. 新创建一个文件夹，名字比如叫做 `library`

2. 进行初始化

   ```javascript
   npm init
   ```

3. 安装 webpack webpack-cli

   ```shell
   npm install webpack webpack-cli
   ```

4. 创建 `index.js`、`math.js`、`string.js` 文件，内容如下

   ```javascript
   // index.js: 注意这里写法不同，引入方式也会不同
   export * from './math'
   export * from './string'

   // math.js
   export function add(a, b) {
   	return a + b
   }

   export function minus(a, b) {
   	return a - b
   }

   export function multiply(a, b) {
   	return a * b
   }

   export function division(a, b) {
   	return a / b
   }

   // string.js
   export function join(a, b) {
   	return a + '' + b
   }
   ```

5. 创建 `webpack.config.js`，内容如下

   ```javascript
   const path = require('path')

   module.exports = {
   	mode: 'production',
   	entry: './src/index.js',
   	output: {
   		filename: 'library.js',
   		path: path.resolve(__dirname, 'dist'),
   	},
   }
   ```

6. 修改`package.json`文件中的打包命令，更改如下

   ```javascript
    "scripts": {
       "build": "webpack build"
     },
   ```

7. 运行打包命令`npm run build`, 进行打包，结果输出`dist` 目录和`librarya.js`文件

8. 这时候，显然作为业务代码开发是上面的流程，也是可以使用。但是如果作为库文件供其他开发者使用，显然是不可以的

9. 首先，作为开发者，使用第三方依赖库有如下几种调用方式

   ```javascript
   // 第一种:es6方式
   import library from "library"

   // 第二种:commonjs方式
   const library = require('library')

   // 第三种:AMD方式
   define("library", function(library){

   })

   // 第四种:script标签引入
   <script src="http://xxx.com/library.js"></script>
   <script>
     // 这里直接使用 library
   </script>
   ```

10. 我们可以在`webpack.config.js`中的`output`项目中在添加一项`libraryTarget`

    ```javascript
    output:{
      ...
      // libraryTarget: 'umd',
      // library: 'library'
      // 上述写法在官网提到：未来可能会移除，建议更改为如下写法
      //
      library: {
        name: 'library',
        type: 'umd',
      },
    }
    ```

11. 注意：这里的 `libraryTarget`、`library`有几种不同的配置(官方网站建议更改为：[`output.library.type`](https://webpack.docschina.org/configuration/output/#outputlibrarytype))

    > 类型默认包括 `'var'`、`'module'`、`'assign'`、`'assign-properties'`、`'this'`、`'window'`、`'self'`、`'global'`、`'commonjs'`、`'commonjs2'`、`'commonjs-module'`、`'commonjs-static'`、`'amd'`、`'amd-require'`、`'umd'`、`'umd2'`、`'jsonp'` 以及 `'system'`，除此之外也可以通过插件添加。

    1. var：当 library 加载完成，**入口起点的返回值**将分配给一个变量：
    2. This：**入口起点的返回值** 将会被赋值给 this 对象下的 `output.library.name` 属性。
    3. global：**入口起点的返回值** 将会被复制给全局对象下的 `output.library.name`。取决于 [`target`](https://webpack.docschina.org/configuration/target/) 值，全局对象可以分别改变,例如，`self`、`global` 或者 `globalThis`。
    4. window：**入口起点的返回值**将使用 `output.library` 中定义的值，分配给 `window` 对象的这个属性下。

12. 参考文档

    [详解 webpack 的 out.libraryTarget 属性](https://www.xlaoyu.info/2018/01/05/webpack-output-librarytarget/)

    [webpack 官网之 library](https://webpack.docschina.org/configuration/output/#outputlibrary)

    [如何使用 webpack 打包一个库 library](https://segmentfault.com/a/1190000021318631)

#### 4.1.2 引入其他的库用法

> `externals` 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 **library 开发人员**来说是最有用的，然而也会有各种各样的应用程序用到它。

1. 上述项目中未使用 `lodash`, 假如引入第三方时候，更改`string.js`文件如下

   ```javascript
   import _ from 'lodash'
   export function join(a, b) {
   	return _.join(a, b)
   }
   ```

2. 安装`lodash`依赖

   ```shell
   npm install lodash --save-dev
   ```

3. 此时如果进行打包`npm run build`，可以发现打包文件`bundle.js`文件略大，因为它把`lodash`库也打包进入了。

4. 在开发相关库或者其他功能时，我们并不希望打包文件引入相关依赖库，因为如果其他使用者也使用了相关依赖，就会造成加载的重复。为此，通过`externals`配置项就可以解决这个问题

5. `string.js`修改为如下代码

   ```javascript
   import _ from 'lodash1'
   export function join(a, b) {
   	return _.join(a, b)
   }
   ```

6. `webpack.common.js`中的配置文件修改如下

   ```javascript
   module.exports = {
   	//...
   	externals: {
   		lodash1: 'lodash',
   	},
   }
   ```

7. 此时如果进行打包`npm run build`，可以发现打包文件`bundle.js`文件已经变小了，因为它把`lodash`库在打包过程中忽略了

8. 关于 externals 的赋值方式有以下几种

   1. 数组：

      ```javascript
      externals: ['lodash']
      ```

   2. 对象

      > 外部 library 可能是以下任何一种形式：
      >
      > - **root**：可以通过一个全局变量访问 library（例如，通过 script 标签）。
      > - **commonjs**：可以将 library 作为一个 CommonJS 模块访问。
      > - **commonjs2**：和上面的类似，但导出的是 `module.exports.default`.
      > - **amd**：类似于 `commonjs`，但使用 AMD 模块系统。

      ```javascript
       externals: {
          jquery: 'jQuery',
        }
      // 或者
       externals: {
         lodash: {
           commonjs: 'lodash',
           amd: 'lodash',
           root: '_', // 指向全局变量
         },
       },
      ```

   3. 还有其他的函数、正则等，常见的是上述方式

#### 4.1.3 参考文献

[webpack 之 externals](https://webpack.docschina.org/configuration/externals/)

[webpack externals 深入理解:把依赖包变为 CDN 引用，减少加载时间，配置 External 忽略库文件的打包](https://segmentfault.com/a/1190000012113011)

[Webpack 优化总会让你不得不爱](https://juejin.cn/post/6844904079320154126)

### 4.2 PWA: Progressive Web Application

> Progressive Web Apps（PWA）是一个结合了最好的 web 和 app 经验的渐进式网络应用程序。它对用户来说是非常有用的，它不需要安装，只需要从浏览器标签开始访问。随着用户与 app 建立的关系，它变得越来越强大。即使在片状网络上，它也可以实现快速加载，并发送相关推送通知。它可以在主屏幕上创建图标，并加载为顶级全屏体验。

#### 4.2.1 不使用时的情况

1. 删除 node_modules 文件夹，以及其他一些不必要的 package.json 中的依赖删除，并更改打包命令（可以参考以下配置内容）

   ```javascript
   // package.json
   {
     "name": "webpack-demo",
     "sideEffects": [
       "*.css"
     ],
     "version": "1.0.0",
     "description": "我的",
     "private": true,
     "scripts": {
       "dev": "webpack server --config webpack.common.js",
       "dev-build": "webpack --config webpack.common.js",
       "prod-build": "webpack --env production --config webpack.common.js"
     },
     "author": "",
     "license": "ISC",
     "dependencies": {
       "@babel/core": "^7.17.9",
       "@babel/preset-env": "^7.16.11",
       "@babel/preset-react": "^7.16.7",
       "@babel/runtime-corejs2": "^7.17.9",
       "core-js": "3",
       "webpack": "^5.71.0",
       "webpack-cli": "^4.9.2",
       "webpack-merge": "^5.8.0"
     },
     "devDependencies": {
       "@babel/plugin-transform-runtime": "^7.17.0",
       "autoprefixer": "^10.4.4",
       "babel-loader": "^8.2.4",
       "clean-webpack-plugin": "^4.0.0",
       "css-loader": "^6.7.1",
       "css-minimizer-webpack-plugin": "^3.4.1",
       "file-loader": "^6.2.0",
       "html-webpack-plugin": "^5.5.0",
       "less": "^4.1.2",
       "less-loader": "^10.2.0",
       "mini-css-extract-plugin": "^2.6.0",
       "postcss": "^8.4.12",
       "postcss-loader": "^6.2.1",
       "style-loader": "^3.3.1",
       "webpack-dev-middleware": "^5.3.1",
       "webpack-dev-server": "^4.8.1"
     }
   ```

2. 重新执行安装命令

   ```shell
   npm install
   ```

3. 入口文件内容进行更改

   ```javascript
   // index.js
   console.log('hello, this is pwa')
   ```

4. ```webpack.common.js`文件中删除不必要配置项(可以参考下述配置)

   ```javascript
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   const { merge } = require('webpack-merge')
   const devConfig = require('./webpack.dev')
   const prodConfig = require('./webpack.prod')
   const webpack = require('webpack')

   const commonConfig = {
   	entry: {
   		bundle: '/src/js/index.js',
   	},

   	output: {
   		publicPath: '/',
   		filename: '[name].js',
   		path: path.resolve(__dirname, 'bundle'),
   		assetModuleFilename: 'images/[name][ext]',
   	},
   	module: {
   		rules: [
   			{
   				test: /\.(jpg|png|gif|jpeg)$/,
   				type: 'asset/resource',
   			},
   			{
   				test: /\.css$/,
   				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
   			},
   		],
   	},
   	// plugin 会在webpack运行到某些时机的时候，处理一些事情
   	plugins: [
   		new MiniCssExtractPlugin({
   			filename: 'css/[name].[hash:3].css', // 此选项决定了输出的每个 CSS 文件的名称。机制类似于 output.filename。
   			chunkFilename: 'css/[name].[hash:3].css', // 此选项决定了非入口的 chunk 文件名称机制类似于 output.chunkFilename
   		}),
   		new HtmlWebpackPlugin({
   			template: './index.html',
   		}),
   		new CleanWebpackPlugin(),
   	],
   }

   module.exports = (env) => {
   	if (env && env.production) {
   		return merge(commonConfig, prodConfig)
   	}
   	return merge(commonConfig, devConfig)
   }
   ```

5. `pwa`技术主要用于生产环境, `webpack.prod.js`文件内容如下(仅供参考)

   ```javascript
   const { merge } = require('webpack-merge')
   const CommonConfig = require('./webpack.common')
   const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')

   const prodConfig = {
   	mode: 'production',
   	output: {
   		publicPath: '/',
   		filename: '[name].[contenthash].js',
   	},
   	devtool: 'nosources-source-map',
   	module: {},
   	optimization: {
   		minimizer: [
   			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
   			// `...`,
   			new CssMinimizerPlugin(),
   		],
   	},
   	plugins: [new MiniCssExtractPlugin()],
   }

   module.exports = merge(CommonConfig, prodConfig)
   ```

6. 执行打包命令`npm run prod-build`，生成 `bundle`文件夹。

7. 安装`http-server`模块，模拟线上服务器环境

   ```shell
   npm install http-server -D
   ```

8. 添加运行脚本命令

   ```javascript
   // package.json
    "scripts": {
      "start": "http-server ./bundle", // 后面是打包文件夹，具体以自己项目打包配置文件夹为准
      ....
    },
   ```

9. 运行命令`npm run start`进行模拟效果，可在浏览器中打包服务网页，控制台中打印出`index.js`中的结果`hello, this is pwa`

10. 关闭终端模拟服务命令，再次刷新浏览器可以看待页面已经不能正常显示。有没有办法，可以在服务器挂掉后，还可以正常显示呢，答案自然是有的

#### 4.2.2 实战 PWA

1. 安装相关依赖

   ```shell
   npm install workbox-webpack-plugin --save-dev
   ```

2. `webpack.prod.js`中添加插件

   ```javascript
   const { GenerateSW } = require('workbox-webpack-plugin')

   const prodConfig = {
     ...,
       plugins:[
         ...
      	// sw 全写 service worker
         new GenerateSW({
           clientsClaim: true,
           skipWaiting: true,
         }),
       ]
   }

   module.exports = merge(CommonConfig, prodConfig)
   ```

3. 执行打包命令`npm run prod-build`，生成 `bundle`文件夹。会发现文件夹中多了几个文件，其中有一个是`service-worker.js`, 这个文件就是用来做 pwa 处理

4. 不过，`index.js`还要做如下更改

   ```javascript
   console.log('hello, this is pwa')

   // 添加如下代码
   if ('serviceWorker' in navigator) {
   	window.addEventListener('load', () => {
   		navigator.serviceWorker
   			.register('./service-worker.js')
   			.then((registration) => {
   				console.log('service-worker registered')
   			})
   			.catch((error) => {
   				console.log('service-worker registered error')
   			})
   	})
   }
   ```

5. 再次运行打包命令`npm run prod-build`，重新打包

6. 然后运行`npm run start`, 在浏览器里看效果，正常输出

7. 此后，把终端运行的本地服务器命令退出，此时在看浏览器中，还可以正常运行。PWA 效果配置完成

#### 4.2.3 PWA 其他

[神奇的 Workbox 3.0：让你的 Web 站点轻松做到离线可访问](https://toutiao.io/posts/eie19m/preview)

### 4.3 TypeScript 的打包配置

#### 4.3.1 ts 项目实战

1. 新建文件夹 `ts-demo`, 并进行项目初始化

   ```shell
   mkdir ts-demo
   cd ts-demo
   npm init -y
   ```

2. 安装 `webpack`相关依赖

   ```shell
   npm i webpack webpack-cli -D
   ```

3. 新建 `src/index.ts`文件，内容如下

   ```javascript
   class Greeter {
   	greeting: string
   	constructor(message: string) {
   		this.greeting = message
   	}
   	greet() {
   		return 'Hello, ' + this.greeting
   	}
   }

   let greeter = new Greeter('world')

   alert(greeter.greet())
   ```

4. 新建`webpack.config.js`文件，并写入以下内容

   ```javascript
   const path = require('path')

   module.exports = {
   	mode: 'production',
   	entry: './src/index.ts',
   	module: {
   		rules: [
   			{
   				test: /\.ts?$/,
   				use: 'ts-loader',
   				exclude: /node_modules/,
   			},
   		],
   	},
   	output: {
   		filename: 'bundle.js',
   		path: path.resolve(__dirname, 'dist'),
   	},
   }
   ```

5. 注意这里用到一个新的`ts-loader`, 需要进行安装

   ```shell
   npm install typescript ts-loader --save-dev
   ```

6. `package.json` 文件中新增加打包命令

   ```javascript
   "scripts": {
     "build": "webpack build"
   }
   ```

7. 此时直接进行`npm run build` 会提示，缺少`tsconfig.json`文件

8. 根目录下新建文件`tsconfig.json`文件，内容如下

   ```javascript
   {
     "compilerOptions": {
       "outDir": "./dist", // 写不写都行
       "module": "es6", // 用 es6 模块引入 import
       "target": "es5", // 打包成 es5
       "allowJs": true // 允许在 ts 中也能引入 js 的文件
     }
   }
   ```

9. 再次执行 `npm run build` , 打包后的 js 文件就可以直接在浏览器控制台运行了。说明文件中的 ts 语法已经被转换为浏览器可以识别的 js 语法了。

#### 4.3.2 ts 中使用三方库，如何处理

> 在上述的 index.ts 文件中，Greeter 的实例对象要求是 string 类型，如果通过 new 进行实例化时候传入不是 string 类型的，就会提示报错。而假如直接引入三方库，并使用时候，是没有办法感知的。如何处理，看下面操作

1. 引入第三方库， 比如`lodash`

   ```javascript
   npm install lodash -D
   ```

2. 修改`index.ts`

   ```javascript
   import _ from 'lodash'

   class Greeter {
   	greeting: string
   	constructor(message: string) {
   		this.greeting = message
   	}
   	greet() {
   		return _.join(['Hello', '', this.greeting], ' ')
   		// return 'Hello, ' + this.greeting
   	}
   }
   let greeter = new Greeter('world')
   alert(greeter.greet())
   ```

3. 这里首行会报错

   > 找不到模块“lodash”。你的意思是要将 "moduleResolution" 选项设置为 "node"，还是要将别名添加到 "paths" 选项中?ts(2792)
   >
   > 问题在于：问题出在没有 *声明文件*来描述你的代码库

4. 安装声明文件库，解决上述问题

   ```javascript
   npm install @types/lodash -D
   ```

5. 安装后会发现没有了最开始的报错，会变为其他的报错，`index.ts` 需要更新为下面的代码

   ```javascript
   import * as _ from 'lodash'

   class Greeter {
   	greeting: string
   	constructor(message: string) {
   		this.greeting = message
   	}
   	greet() {
   		// 这样写会进行类型检查，会提示报错：应有 1-2 个参数，但获得 0 个
   		// return _.join()

   		// 这样写也会报错：类型“number”的参数不能赋给类型“List<any>”的参数。
   		// return _.join(1)

   		// 正确的写法
   		return _.join(['Hello', '', this.greeting], ' ')
   	}
   }

   let greeter = new Greeter('world')
   alert(greeter.greet())
   ```

6. 以上的类型检查就体现出了`typescript` 的优势

#### 4.3.3 如何知道使用的库需要安装对应的类型插件呢?

1. 打开[TypeSearch](https://link.segmentfault.com/?enc=oi9pp6M%2BLjGa5UX2Y%2FbphQ%3D%3D.80p4Ag6FsglGkTHM791PokbHE%2F9iRIwgvMrXfRGVudvejRgrTW6%2BvGu0YITO4Xsw)，在这里对应的去搜索你想用的库有没有类型插件，如果有, 只需要 `npm i @types/xxx-D` 即可

   > 例如 需要 jquery 就执行 `npm i @types/jquery -D` 即可

### 4.4 使用 WebpackDevServer 实现请求转发

#### 4.4.1 使用 proxy 处理跨域

1. 回到最开始的项目，项目里的文件内容都是静态渲染的，但是实际开发中，往往是通过网络请求进行获取数据然后渲染的。这时往往域名是不一致的，如果直接进行请求服务器借口，会产生跨域问题，开发环境下通过配置 devserver 可以解决这个问题

   > 这里模拟使用的是公共开放接口：https://api.apiopen.top/swagger/index.html#/%E5%BC%80%E6%94%BE%E6%8E%A5%E5%8F%A3/get_getHaoKanVideo
   >
   > [具体文档参考](https://api.apiopen.top/swagger/index.html)

2. 安装相关依赖`axios`

   ```javascript
   npm install axios --save-dev
   ```

3. 修改 `index.js`中的内容，增加如下代码

   ```javascript
   import axios from 'axios'

   axios
   	.get('https://api.apiopen.top/api/getHaoKanVideo', {
   		data: {
   			page: 0,
   			size: 10,
   		},
   	})
   	.then((res) => {
   		console.log(res)
   	})
   ```

4. 此时`package.json`中的脚本命令如下

   ```javascript
     "scripts": {
       "start": "http-server ./bundle",
       "dev": "webpack server --config webpack.common.js",
       "dev-build": "webpack --config webpack.common.js",
       "prod-build": "webpack --env production --config webpack.common.js"
     },
   ```

5. 运行命令`npm run dev`, 用浏览器打开相应本地服务，可以发现，提示跨域报错

   ```javascript
   Access to XMLHttpRequest at 'https://api.apiopen.top/api/getHaoKanVideo' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
   ```

6. 此时可以对`webpack.dev.js`中的 `devServer`选项进行配置如下

   ```javascript
   	devServer: {
   		proxy: {
   			'/videoApi/': {
   				target: 'https://api.apiopen.top',
   				changeOrigin: true,
   				pathRewrite: { '^/videoApi': '' },
   			},
   		},
   	},
   ```

7. 再次运行`npm run dev`, 用浏览器打开相应本地服务，可以发现，控制台中`network`选项可以正常返回接口

#### 4.4.2 proxy 中其他的一些配置

1. 使用一：

   > 请求到 `/api/xxx` 现在会被代理到请求 `http://localhost:3000/api/xxx`, 例如 `/api/user` 现在会被代理到请求 `http://localhost:3000/api/user`

   ```javascript
   module.exports = {
   	//...
   	devServer: {
   		proxy: {
   			'/api': 'http://localhost:3000',
   		},
   	},
   }
   ```

2. 使用二：

   > 如果你想要代码多个路径代理到同一个 target 下, 你可以使用由一个或多个「具有 context 属性的对象」构成的数组：

   ```javascript
   module.exports = {
   	//...
   	devServer: {
   		proxy: [
   			{
   				context: ['/auth', '/api'],
   				target: 'http://localhost:3000',
   			},
   		],
   	},
   }
   ```

3. 使用三：

   > 如果你不想始终传递 /api ，则需要重写路径：
   >
   > 请求到 /api/xxx 现在会被代理到请求 `http://localhost:3000/xxx`, 例如 /api/user 现在会被代理到请求 `http://localhost:3000/user`

   ```javascript
   module.exports = {
   	//...
   	devServer: {
   		proxy: {
   			'/api': {
   				target: 'http://localhost:3000',
   				pathRewrite: { '^/api': '' },
   			},
   		},
   	},
   }
   ```

4. 使用四：

   > 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，只要设置 `secure: false` 就行。修改配置如下：

   ```javascript
   module.exports = {
   	//...
   	devServer: {
   		proxy: {
   			'/api': {
   				target: 'https://other-server.example.com',
   				secure: false,
   			},
   		},
   	},
   }
   ```

5. 使用五：

   > 有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。
   > 在函数中你可以访问请求体、响应体和代理选项。必须返回 false 或路径，来跳过代理请求。
   >
   > 例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做：

   ```javascript
   module.exports = {
   	//...
   	devServer: {
   		proxy: {
   			'/api': {
   				target: 'http://localhost:3000',
   				bypass: function (req, res, proxyOptions) {
   					if (req.headers.accept.indexOf('html') !== -1) {
   						console.log('Skipping proxy for browser request.')
   						// 也可以通过 return false 来跳过代理
   						return '/index.html'
   					}
   				},
   			},
   		},
   	},
   }
   ```

#### 4.4.3 解决跨域原理

> 上面的参数列表中有一个`changeOrigin`参数, 是一个布尔值, 设置为 true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求,

1. vue-cli 中 proxyTable 配置接口地址代理示例

   ```javascript
   module.exports = {
       dev: {
       // 静态资源文件夹
       assetsSubDirectory: 'static',
       // 发布路径
       assetsPublicPath: '/',

       // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
       // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
       proxyTable: {
           // 例如将'localhost:8080/api/xxx'代理到'https://wangyaxing.cn/api/xxx'
           '/api': {
               target: 'https://wangyaxing.cn', // 接口的域名
               secure: false,  // 如果是https接口，需要配置这个参数
               changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
           },
           // 例如将'localhost:8080/img/xxx'代理到'https://cdn.wangyaxing.cn/xxx'
           '/img': {
               target: 'https://cdn.wangyaxing.cn', // 接口的域名
               secure: false,  // 如果是https接口，需要配置这个参数
               changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
               pathRewrite: {'^/img': ''}  // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
           }
       },
       // Various Dev Server settings
       host: 'localhost', // can be overwritten by process.env.HOST
       port: 4200, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
   }
   ```

2. 更多的参数参考

   `dev-server` 使用了非常强大的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) , `http-proxy-middleware` 基于 `http-proxy` 实现的，可以查看 http-proxy 的源

   码和文档:https://github.com/nodejitsu/node-http-proxy 。

   ```javascript
   target：要使用url模块解析的url字符串
   forward：要使用url模块解析的url字符串
   agent：要传递给http（s）.request的对象（请参阅Node的https代理和http代理对象）
   ssl：要传递给https.createServer（）的对象
   ws：true / false，是否代理websockets
   xfwd：true / false，添加x-forward标头
   secure：true / false，是否验证SSL Certs
   toProxy：true / false，传递绝对URL作为路径（对代理代理很有用）
   prependPath：true / false，默认值：true - 指定是否要将目标的路径添加到代理路径
   ignorePath：true / false，默认值：false - 指定是否要忽略传入请求的代理路径（注意：如果需要，您必须附加/手动）。
   localAddress：要为传出连接绑定的本地接口字符串
   changeOrigin：true / false，默认值：false - 将主机标头的原点更改为目标URL
   ```

#### 4.4.x 参考文档

[webpack 开发配置 API 代理解决跨域问题-devServer](https://segmentfault.com/a/1190000016199721)

[webpack 配置 changeOrigin 无效的说明](https://blog.csdn.net/qq_39291919/article/details/108807111)

[Webpack-dev-server 的 proxy 用法](https://segmentfault.com/a/1190000016314976)

[github 之 http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
