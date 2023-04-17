# 12-大型前端项目：尝鲜——Webpack5 新特性通关

## 01: webpack4和5构建结果对比 

我们创建两个项目`webpack4-demo`和 `webpack5-demo`

### 创建 webpack4 项目

1. 新建`demo1/webpack4-demo`

2. 执行以下命令

   ```shell
   cd demo1/webpack4-demo
   npm init -y
   npm install webpack@4.46.0 webpack-cli@4.9.2 -D
   ```

3. 更新`packages.json`脚本命令

   ```javascript
   {
     "scripts": {
       "build": "webpack"
     },
   }
   ```

4. 新建`src/index.js`,内容如下

   ```javascript
   console.log('hello webpack')
   ```

5. 新建配置文件`weback4-demo/webpack.config.js`

   ```javascript
   const path = require('path')
   module.exports = {
     mode: 'production',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].js',
     },
   }
   ```

6. 执行`npm run dev`, 可能由于 node 版本过高而报错，建议使用 node 14 左右

7. 可以看到`dist`目录下已经正常打包有文件产生了

### 创建 webpack5 项目

1. 通过 n 模块切换 node 版本为 16 左右的版本

2. 新建`demo1/webpack5-demo`

3. 执行以下命令

   ```shell
   cd demo1/webpack5-demo
   npm init -y
   npm install webpack webpack-cli -D
   ```

4. 更新`packages.json`脚本命令

   ```shell
   {
     "scripts": {
       "build": "webpack"
     },
   }
   ```

5. 新建`src/index.js`,内容如下

   ```javascript
   console.log('hello webpack')
   ```

6. 新建配置文件`weback5-demo/webpack.config.js`

   ```javascript
   const path = require('path')
   module.exports = {
     mode: 'production',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].js',
     },
   }
   ```

7. 执行`npm run build`,可以看到`dist`目录下已经正常打包有文件产生了

### 差异

| 种类                               | webpack4                                                     | webapck5                                                     |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| dist/main.js文件内容差异           | ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5057ddcbc3f428a86e5f13650a1ea73~tplv-k3u1fbpfcp-watermark.image?) | ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f1f99dd58cb4345a4281f32e2b85471~tplv-k3u1fbpfcp-watermark.image?) |
| 构建时间差异<br />(log格式也异样） | Version: webpack **4.46.0**，<br /> Time: **47**ms           | webpack 5.79.0 compiled **successfully** in 161 ms           |

## 02: webpack4和5缓存特性对比 

> 缓存一直是前端性能优化的重头戏，利用好静态资源的缓存机制，可以使我们的构建速度更快

### webpack4 中

目前`src/index.js`中内容较少，我们新安装一个 vue

```shell
npm installl vue -D
```

修改`src/index.js`，内容如下

```javascript
console.log('hello webpack')
import { createApp } from 'vue'
createApp({})
```

重新执行`npm run build`可以看到`main.js`大小由`958 bytes`变为 61.4 KiB，说明 vue 内容被全部打包进去了

接着我们修改`webpack.config.js`内容

```javascript
module.exports = {
  ...
  optimization: {
    splitChunks: {
      minSize: 1 * 1024,
      chunks: 'all',
      name: 'common',
    },
  }
}
```

重新执行`npm run build`，可以看到`dist`目录下多了两个文件

* common.js 60.6kb
* main.js 1.56kb

接下来增加缓存配置，修改`webpack.config.js`内容

```javascript
module.exports = {
  ...
  optimization: {
    splitChunks: {
      minSize: 1 * 1024,
      chunks: 'all',
      name: 'common',
    },
  },
  cache: true
}
```

第一次执行`npm run build`，打包日志如下(耗时 1505ms)

```bash
Hash: 4331f7fd8bd86e286a6d
Version: webpack 4.46.0
Time: 1505ms
Built at: 2023/04/17 下午4:44:21
    Asset      Size  Chunks             Chunk Names
common.js  60.6 KiB       0  [emitted]  common
  main.js  1.56 KiB       1  [emitted]  main
Entrypoint main = common.js main.js
```

第二次执行`npm run build`，打包耗时(399ms)

```bash
Hash: 4331f7fd8bd86e286a6d
Version: webpack 4.46.0
Time: 399ms
Built at: 2023/04/17 下午4:44:38
    Asset      Size  Chunks             Chunk Names
common.js  60.6 KiB       0  [emitted]  common
  main.js  1.56 KiB       1  [emitted]  main
Entrypoint main = common.js main.js

```

另外，可以看到`node_modules`下的缓存目录为

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14aaa894b54845e7b49d9bb577c740cd~tplv-k3u1fbpfcp-watermark.image?)

### webpack5 中

同样新安装一个 vue

```bash
npm installl vue -D
```

修改`src/index.js`，内容如下

```javascript
console.log('hello webpack')
import { createApp } from 'vue'
createApp({})
```

重新执行`npm run build`可以看到`main.js`大小由`29 bytes`变为` 55 KB`，说明 vue 内容被全部打包进去了

接着我们修改`webpack.config.js`内容

```javascript
module.exports = {
  ...
  optimization: {
    splitChunks: {
      minSize: 1 * 1024,
      chunks: 'all',
      name: 'common',
    },
  }
}
```

重新执行`npm run build`，可以看到`dist`目录下多了两个文件

* common.js 54.1kb
* main.js 1.26kb

接下来增加缓存配置，修改`webpack.config.js`内容

```javascript
module.exports = {
  ...
  optimization: {
    splitChunks: {
      minSize: 1 * 1024,
      chunks: 'all',
      name: 'common',
    },
  },
  // cache: true, 适合开发模式，
  // cache: true, //cache: true 与 cache: { type: 'memory' } 配置作用一致。 传入 false 会禁用缓存:
	// 有了缓存，比如我们只修改了 main.js 有了缓存就不会重新打包所有的
  cache: {
    type: 'filesystem',
  }
}
```

第一次执行`npm run build`，打包日志如下(耗时 1712 ms)

```bash
asset common.js 54.1 KiB [compared for emit] [minimized] (name: common) (id hint: vendors)
asset main.js 1.26 KiB [compared for emit] [minimized] (name: main)
Entrypoint main 55.4 KiB = common.js 54.1 KiB main.js 1.26 KiB // 注意这里是打包后的文件大小
runtime modules 3 KiB 5 modules
orphan modules 375 KiB [orphan] 4 modules
cacheable modules 433 KiB
  ./src/index.js 76 bytes [built] [code generated]
  ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js + 3 modules 433 KiB [built] [code generated]
webpack 5.79.0 compiled successfully in 1712 ms
```

第二次执行`npm run build`，打包耗时(139 ms)，时间被大幅度缩减

```bash
asset common.js 54.1 KiB [compared for emit] [minimized] (name: common) (id hint: vendors)
asset main.js 1.26 KiB [compared for emit] [minimized] (name: main)
Entrypoint main 55.4 KiB = common.js 54.1 KiB main.js 1.26 KiB // 注意这里是打包后的文件大小
cached modules 808 KiB (javascript) 3 KiB (runtime) [cached] 11 modules
webpack 5.79.0 compiled successfully in 139 ms
```

另外，可以看到`node_modules`下的缓存目录如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaaa49a060bb49ef82307be1f6d746b5~tplv-k3u1fbpfcp-watermark.image?)

### 对比总结

* webpack5 比 webpack4 的文件压缩策略更优，分割文件后的 vendor 体积缩小
* webpack5 缓存构建性能优于 webpack4
* webpack5 缓存的功能显著优于 webpack4

## 03: webpack缓存插件hard-source-webpack-plugin

cache 这个功能实在 webpack4 以后才产生的

而对于早期版本，如果想使用缓存，并且是物理缓存的话可以使用这个插件

从`vue-cli`和`create-react-app`中可以知道并没有实用dll，
是因为：**Webpack 4 的打包性能足够好的，dll继续维护的必要了。**

更好的代替者`DLL，选择hard-source-webpack-plugin`

```javascript
npm install hard-source-webpack-plugin -D

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  // ......
  plugins: [
    new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
  ]
}
```

1. 我们在`webapck4-demo`中进行安装

   ```bash
   npm install hard-source-webpack-plugin -D
   ```

2. 我们先修改`packages.json`中的`cache`为false,即：不使用缓存的情况下，看下这个打包的一个时间过程,并且删除`node_modules/.cache`目录

   ```javascript
   const path = require('path')
   module.exports = {
     mode: 'production',
     ...
     cache: false,
   }
   ```

3. 重新执行`npm run build`，打印日志如下

   ```bash
   Hash: 4331f7fd8bd86e286a6d
   Version: webpack 4.46.0
   Time: 1664ms
   Built at: 2023/04/17 下午5:20:55
       Asset      Size  Chunks             Chunk Names
   common.js  60.6 KiB       0  [emitted]  common
     main.js  1.56 KiB       1  [emitted]  main
   Entrypoint main = common.js main.js
   ```

4. 再次执行`npm run build`,打印日志如下

   ```bash
   Hash: 929d247d9241bcef072a
   Version: webpack 4.46.0
   Time: 396ms
   Built at: 2023/04/17 下午5:24:18
       Asset      Size  Chunks             Chunk Names
   common.js  60.6 KiB       0  [emitted]  common
     main.js  1.56 KiB       1  [emitted]  main
   Entrypoint main = common.js main.js
   ```

5. 查看`node_modules/.cache`目录下已经产生了缓存目录(`/webpack4-demo/node_modules/.cache/terser-webpack-plugin`),有点奇怪，没有禁用掉，

6. 我们增加如下插件配置

   ```javascript
   const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
   module.exports = {
     plugins: [new HardSourceWebpackPlugin()],
   }
   ```

7. 执行`npm run build`.打印日志如下

   ```javascript
   Hash: 929d247d9241bcef072a
   Version: webpack 4.46.0
   Time: 450ms
   Built at: 2023/04/17 下午5:29:34
       Asset      Size  Chunks             Chunk Names
   common.js  60.6 KiB       0  [emitted]  common
     main.js  1.56 KiB       1  [emitted]  main
   Entrypoint main = common.js main.js
   ```

8. 再次执行`npm run build`.打印日志如下

   ```bash
   Hash: e439ca4d2cf3a8a49531
   Version: webpack 4.46.0
   Time: 305ms
   Built at: 2023/04/17 下午5:30:27
       Asset      Size  Chunks             Chunk Names
   common.js  60.6 KiB       0  [emitted]  common
     main.js  1.56 KiB       1  [emitted]  main
   Entrypoint main = common.js main.js
   ```

9. 可以看到`node_modules`下的缓存目录多了一个`node_modules/.cache/hard-source`

10. 同样的，这个插件也是至此一些配置选项的

[文档：https://github.com/mzgoddard/hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin)

## 04: webpack4和5构建结果对比

### 资源模块处理

* webpack4 中处理字符图标等文件需要单独引入 loader 进行处理（以图片为例子）

  ```javascript
  npm install url-loader file-loader -S
  
  {
    test: /\.(png|jpe?g|gif|svg)$/, // 处理图片新增代码
    loader: "url-loader",
    options: {
      name: "[name].[hash:5].[ext]",
      limit: 100 * 1024,
      outputPath: "images"
    }
  }
  ```

* webpack5 中允许使用资源文件（字体、图标等）而无需配置额外 loader

  > 资源模块类型（asset modules types）通过四种新的模块类型，来替换所有的 loader

* asset/resource 发送一个单独的文件并导出 URL，之前通过 file-loader 实现

* asset/inline 导出一个资源的 data URL，之前通过 url-loader 实现

* asset/source 导出资源的源代码，之前通过使用 raw-loader 实现

* asset 在导出一个 data URL 和发送一个单独的文件之间自动选择，之前通过使用 url-loader 并且配置资源体积限制实现

### 代码实操

#### webpack4 

1. 我们在 webpack4-demo 项目下的新建 `assets/images`文件夹, 并放入一张图片，比如`a.png`

2. 我们在`src/index.js`中增加如下代码

   ```javascript
   const aImg = require('../assets/images/a.png')
   const img = new Image()
   img.src = aImg
   document.body.insertBefore(img, document.body.firstChild)
   
   // 也可以如下写
   // const aImg = require('../assets/images/a.png')
   // const img = document.createElement('img')
   // img.src = aImg
   // document.body.insertBefore(img, document.body.firstChild)
   ```

3. 修改`webpack.config.js`，增加如下配置

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.(png|jpe?g|gif|svg)$/, // 处理图片新增代码
           loader: 'url-loader',
           options: {
           	esModule: false, // 这里设置为false，否则打包出来是 [object Module]
             name: '[name].[hash:5].[ext]',
             limit: 10 * 1024,
             outputPath: 'images',
           },
         },
       ],
     },
   }
   ```

4. 安装依赖库

   ```shell
   npm installl file-loder url-loader -D
   ```

5. 运行打包命令`npm run build`，新建`dist/index.html`,引用`dist/main.js`，打开至浏览器就可以看到图片渲染效果

#### webpack5 

1. 我们在 webpack4-demo 项目下的新建 `assets/images`文件夹, 并放入一张图片，比如`a.png`

2. 我们在`src/index.js`中增加如下代码

   ```javascript
   const aImg = require('../assets/images/a.png')
   const img = document.createElement('img')
   img.src = aImg
   document.body.insertBefore(img, document.body.firstChild)
   ```

3. 修改`webpack.config.js`，增加如下配置

   ```javascript
   module.exports = {
     ...
     module: {
       rules: [
         {
           test: /\.(png|jpe?g|gif|svg)$/, // 处理图片新增代码
           type: 'asset',
           parser: {
             dataUrlCondition: {
               maxSize: 1024,
             },
           },
           generator: {
             filename: 'images/[name].[hash:5][ext]',
           },
         },
       ],
     },
   }
   ```

4. 重新运行`npm run build`，打包`dist`目录

5. 新建`dist/index.html`,引用`dist/main.js`，打开至浏览器就可以看到图片渲染效果

## 05: webpack5高级特性：URIs解析

### URIS

> 更新文档内容
>
> Webpack5 支持在请求中处理协议
>
> * 支持 data: 支持 Base64 或者原始编码。MimeType 可以在 module.rule  中被映射到加载器和模块类型。例如：import x from "data:text/javascript,export default 42"
> * 支持 file: 支持引入本地资源文件（非项目中资源）
> * 支持 http(s): 需要通过 new webapck.experiments.schmemesHttp(s)UrlPlugin() 选择加入。
>   * 默认情况下，当目标为 Web 时，这些 URI 会导致对外部资源的请求（他们是外部资源）

```javascript
// data  
import data from "data:text/javascript,export default 'hello webapck4'"
console.log(data)

// file
import file from "file:///Users/gaoyuan/Desktop/demo/a.png"
const addImg = document.querySelector(".addImg")
addImg.setAttributes("src", data)

// https
// webpack.config.js
experiments: {
  buildHttp: {
    allowedUris: [
      "https://fast-learn-oss.youbaobao.xyz/",
      "http://hp.hpbb.me//upload/20171108173745476048.jpeg?x-oss-process"
    ],
    frozen: false,
    cacheLocation: false,
    upgrade: true
  }
}
```

## 06: webpack5高级特性：TreeShaking和SideEffects 



## 07: webpack5高级特性：模块联邦



## 08: webpack5高级特性：PackageExports

