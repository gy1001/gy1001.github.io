# 12-大型前端项目：尝鲜——Webpack5 新特性通关

## 01: webpack4 和 5 构建结果对比

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

| 种类                                | webpack4                                                                                                                          | webapck5                                                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| dist/main.js 文件内容差异           | ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5057ddcbc3f428a86e5f13650a1ea73~tplv-k3u1fbpfcp-watermark.image?) | ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f1f99dd58cb4345a4281f32e2b85471~tplv-k3u1fbpfcp-watermark.image?) |
| 构建时间差异<br />(log 格式也异样） | Version: webpack **4.46.0**，<br /> Time: **47**ms                                                                                | webpack 5.79.0 compiled **successfully** in 161 ms                                                                                |

## 02: webpack4 和 5 缓存特性对比

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

- common.js 60.6kb
- main.js 1.56kb

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

- common.js 54.1kb
- main.js 1.26kb

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

- webpack5 比 webpack4 的文件压缩策略更优，分割文件后的 vendor 体积缩小
- webpack5 缓存构建性能优于 webpack4
- webpack5 缓存的功能显著优于 webpack4

## 03: webpack 缓存插件 hard-source-webpack-plugin

cache 这个功能实在 webpack4 以后才产生的

而对于早期版本，如果想使用缓存，并且是物理缓存的话可以使用这个插件

从`vue-cli`和`create-react-app`中可以知道并没有实用 dll，
是因为：**Webpack 4 的打包性能足够好的，dll 继续维护的必要了。**

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

2. 我们先修改`packages.json`中的`cache`为 false,即：不使用缓存的情况下，看下这个打包的一个时间过程,并且删除`node_modules/.cache`目录

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

## 04: webpack4 和 5 构建结果对比

### 资源模块处理

- webpack4 中处理字符图标等文件需要单独引入 loader 进行处理（以图片为例子）

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

- webpack5 中允许使用资源文件（字体、图标等）而无需配置额外 loader

  > 资源模块类型（asset modules types）通过四种新的模块类型，来替换所有的 loader

- asset/resource 发送一个单独的文件并导出 URL，之前通过 file-loader 实现

- asset/inline 导出一个资源的 data URL，之前通过 url-loader 实现

- asset/source 导出资源的源代码，之前通过使用 raw-loader 实现

- asset 在导出一个 data URL 和发送一个单独的文件之间自动选择，之前通过使用 url-loader 并且配置资源体积限制实现

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

## 05: webpack5 高级特性：URIs 解析

### [URIS](https://www.webpackjs.com/blog/2020-10-10-webpack-5-release/#uris)

> 更新文档内容
>
> Webpack5 支持在请求中处理协议
>
> - 支持 data: 支持 Base64 或者原始编码。MimeType 可以在 module.rule 中被映射到加载器和模块类型。例如：import x from "data:text/javascript,export default 42"
> - 支持 file: 支持引入本地资源文件（非项目中资源）
> - 支持 http(s): 需要通过 new webapck.experiments.schmemesHttp(s)UrlPlugin() 选择加入。
>   - 默认情况下，当目标为 Web 时，这些 URI 会导致对外部资源的请求（他们是外部资源）

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

### webpack 4 中

### webpack 5 中

1. 在`webpack5-demo/src/index.js`中加入以下代码

   ```javascript
   import data from "data:text/javascript,export default 'hello webpack5'"
   console.log(data)
   ```

2. 重新运行`npm run build`，在`dist/main.js`中搜索`hello webpack5`,发现可以搜索到

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9e78f8e38024eaf8dab99efc076f3a5~tplv-k3u1fbpfcp-watermark.image?)

3. 在`webpack5-demo/src/index.js`中再加入以下代码

   ```javascript
   // 这个路径根据自己的实际地址来处理
   import file from 'file:///Users/gaoyuan/Desktop/webpack-feature/demo1/webpack5-demo/assets/images/a.png'
   const addImg = document.querySelector('.addImg')
   addImg.setAttributes('src', file)
   ```

4. 重新运行`npm run build`,可以看到`dist/images`下多了`b.xxx.png`,而对应的`dist/main.js`中相关代码如下

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/580ae2303a7f4dfabf98ef012062880e~tplv-k3u1fbpfcp-watermark.image?)

5. xx

   ```javascript
   import ModuleA from 'http://imooc-dev.youbaobao.xyz/test/moduleA.js'
   console.log(ModuleA.a + 2)
   ```

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/848a94c964c7413a8652a5b121420e82~tplv-k3u1fbpfcp-watermark.image?)

6. 执行`npm run build`,报错信息如下

   ```javascript
   ERROR in external "https://imooc-dev.youbaobao.xyz/test/moduleA.js"
   The target environment doesn't support dynamic import() syntax so it's not possible to use external type 'module' within a script
   Error: The target environment doesn't support dynamic import() syntax so it's not possible to use external type 'module' within a script
   ```

7. 因为这个特性是一个实验特性，所以我们需要修改配置文件`webpack.config.js`

   ```javascript
   module.exports = {
     experiments: {
       buildHttp: {
         // 白名单域名
         allowedUris: ['http://imooc-dev.youbaobao.xyz'],
         // 还可以增加额外的特性
         cacheLocation: false,
       },
     },
   }
   ```

8. 再次执行`npm run build`，可以看到一个报错信息

   ```javascript
   ERROR in ./src/index.js 18:0-68
   Module not found: Error: http://imooc-dev.youbaobao.xyz/test/moduleA.js has no lockfile entry and lockfile is frozen
   ```

9. 我们修改`webpack.config.js`，如下

   ```javascript
   module.exports = {
     experiments: {
       buildHttp: {
         allowedUris: ['http://imooc-dev.youbaobao.xyz'],
         cacheLocation: false,
         frozen: false,
       },
     },
   }
   ```

10. 再次执行`npm run build`，打包成功，打开`dist/main.js`中寻找结果，如下(直接把结果计算后，赋值)

    ![image-20230418183209214.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3af54be2c64a4f7fa52cbf3632c6c986~tplv-k3u1fbpfcp-watermark.image?)

## 06: webpack5 高级特性：TreeShaking 和 SideEffects

### Tree Shaking

> tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码，webapck5 现在能够跟踪对导出的嵌套属性的访问。这可以改变重新导出命名空间对象的 tree shaking，
>
> Webpack4 没有分析模块的导出和引用之间的依赖关系，webpack5 有一个新的选项 optimization.innerGraph 在生产模式下默认是开启的，他可以对模块中的标志进行分析，找出导出和引用之间的依赖关系

### 更高效的 TreeShaking

#### webpack4 tree shaking

在 webpack4 中是没有办法对 export default 中的对象进行 tree shaking 的

例如下面的，demo1 中导出一个对象含有 a、b 属性，index.js 中调用了 obj.a(), 而最终打包后的 main.js，中既有 a 属性又有 b 属性

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d676667e6cd412a8260c1b6329f1ea2~tplv-k3u1fbpfcp-watermark.image?)

#### webpack5 tree shaking

而在 webpack5 中可以看到最终的 main.js 中直接把静态的结果放入到最后相应位置上，来解决 tree shaking 的问题。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/463301f5ac224fd688d72d13436efd02~tplv-k3u1fbpfcp-watermark.image?)

### SideEffect

[将文件标记为 side-effect-free(无副作用):https://webpack.docschina.org/guides/tree-shaking/#mark-the-file-as-side-effect-free](https://webpack.docschina.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)

#### webpack4 中

1. 注释`src/index.js`中所有内容，删除 `dist` 目录，添加如下代码

   ```javascript
   // index.js
   import './lib'
   console.log(1)

   // src/lib.js ：注意此文件并没有 export 任何内容
   console.log('lib')
   ```

2. 运行`npm run build`,`dist/main.js`结果如下(可以看到 lib 文件有被加载进来)

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84714ff4e2748b9bc35a4e1b825f885~tplv-k3u1fbpfcp-watermark.image?)

3. 接下来我们注释掉`src/lib.js`中的代码

   ```javascript
   // console.log('lib')
   ```

4. 再次进行打包`npm run build`，可以看到如下结果

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c95f99b792d46ed932fc886faa1a8a1~tplv-k3u1fbpfcp-watermark.image?)

5. 我们再次修改`inde.js`文件如下

   ```javascript
   // 可能会需要先安装 vue 那就执行 npm install vue -S

   import './lib'
   import 'vue' // 引入 vue 但是没有使用
   console.log(1)
   ```

6. 再次进行打包`npm run build`，可以看到如下结果(`dist/main.js`瞬间变大了，因为它把`vue`包全部打入进入了，它并不能准确的判断出我们有没有使用，为了避免出错，就直接全部打入)

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06f5904f757842d0b32daeabbd47a545~tplv-k3u1fbpfcp-watermark.image?)

#### webpack5 中

1. 注释`src/index.js`中所有内容，删除 `dist` 目录，添加如下代码

   ```javascript
   // index.js
   import './lib'
   console.log(1)
   
   // src/lib.js ：注意此文件并没有 export 任何内容
   console.log('lib')
   ```

2. 运行`npm run build`,`dist/main.js`结果如下(可以看到 lib 文件有被加载进来,但是文件内容已经少了很多)

   ![image-20230418230349844.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79daf8573a8a4763b4869515fffcc1e7~tplv-k3u1fbpfcp-watermark.image?)

3. 接下来我们注释掉`src/lib.js`中的代码

   ```javascript
   // console.log('lib')
   ```

4. 再次进行打包`npm run build`，可以看到如下结果(就剩下一行代码了)

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b84bcde16e94e2a9ad082420bd0020d~tplv-k3u1fbpfcp-watermark.image?)

5. 我们再次修改`index.js`文件如下

   ```javascript
   // 可能会需要先安装 vue 那就执行 npm install vue -S
   
   import './lib'
   import 'vue' // 引入 vue 但是没有使用
   console.log(1)
   ```

6. 再次进行打包`npm run build`，可以看到如下结果(`dist/main.js`并没有变大，因为`webpack5`默认采取了一种激进的方式，我认为你并没有使用，所以我并不对它进行打包)，当然它采取了一种相对只能的方式来进行处理，比如如果你有 对其进行 console.log 之类的，他就会打进去

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aabc76e412148a6bdc4030fd2f80951~tplv-k3u1fbpfcp-watermark.image?)

7. 上面步骤显示了 webpack5 和 webpack4 之间的一个打包差异，那么我们能不能自己进行控制呢？

8. 答案是可以的，这里就要用到这个新特性 `Effects`

9. 首先我们更改`index.js`文件内容如下

   ```javascript
   import './lib'
   // import "vue" // 引入 vue 但是没有使用
   console.log(1)
   
   // lib.js 打开注释
   console.log('lig') // 这里前面我们已经看到了，如果注释，webpack5  打包就会忽略这个文件，打包结果只有一行，如果不注释，这行代码就会被打包进打包文件
   ```

10. 我们可以修改`package.json`中的`Effects`来处理

    ```javascript
    {
      "sideEffects": true // 表示我认为它有副作用
    }
    ```

11. 再次进行打包`npm run build`，可以看到如下结果

    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b99780c01744a9281bf6edf54110055~tplv-k3u1fbpfcp-watermark.image?)

12. 再次修改`package.json`中的`Effects`来处理

    ```javascript
    {
      "sideEffects": false
    }
    ```

13. 再次进行打包`npm run build`，可以看到如下结果

    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b84bcde16e94e2a9ad082420bd0020d~tplv-k3u1fbpfcp-watermark.image?)

14. 同时我们还可以对某个文件进行精准控制，比如修改`sideEffects`为如下结果

    ```javascript
    {
      "sideEffects": [
        "./src/lib.js" // 认为它有副作用，要打包
      ]
    }
    ```

15. 由此我们知道，除了常规的`import { a } from "moduleA"`的 tree shaking 方式以外，还有一个 `sideEffects` 方式来进行精准的 `tree shaking`（其实绝大多数情况下，是不需要进行更改的，使用默认值 false 让 webpack 进行决策即可，如果你发现打包结果与想要的效果不一致时，就可以检查是否是由于副作用导致了其他问题，从而可以使用`sideEffects`来进行精准控制）

## 07: webpack5 高级特性：模块联邦

### 模块联邦

> 模块联邦是 Webpack5 新内置的一个重要功能，可以让跨应用间真正做到模块共享，webpack5 新增 Module Federation（模块联邦）功能，它可以帮助多个独立的构建组成一个应用程序，不同的构建可以独立的开发与部署
>
> - name 应用名，全局唯一，不可冲突
> - library UMD 标准导出，和 name 保持一直即可
> - remotes 声明需要引用的远程应用
> - filenames 远程应用时被其他应用引入的 js 文件名称，
> - exposes 远程应用暴露出的模块名
> - share 依赖的包

### Federated Module

这个方案是直接将一个应用的包应用于另一个应用，同时具备整体应用一起打包的公共依赖抽取能力。让应用具备模块化输出能力，其实开辟了一中新的应用形态，即“中心应用”，这个中心应用用于在线动态分布 Runtime 子模块，并不直接提供给用户使用。所有子应用都可以利用 Runtime 方式复用主要的 Npm 包和模块，更好的集成到主应用中

1. 新建文件夹`demo2/app_a`（做为子应用）以及 `demo2/app_b` (b 作为主应用)

2. 终端进入`app_a`文件夹，执行命令

   ```shell
   npm init -y
   ```

3. 新建`app_a/webpack.config.js`(拷贝`demo1/webpack5-demo/webpack.config.js`，并增加 devServer 配置)

   ```javascript
   const path = require('path')
   module.exports = {
     mode: 'production',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].js',
     },
     optimization: {
       splitChunks: {
         minSize: 1 * 1024,
         chunks: 'all',
         name: 'common',
       },
     },
     // cache: true, 适合开发模式
     // cache: true, //cache: true 与 cache: { type: 'memory' } 配置作用一致。 传入 false 会禁用缓存:
     cache: {
       type: 'filesystem',
     },
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
     experiments: {
       buildHttp: {
         // 白名单域名
         allowedUris: ['http://imooc-dev.youbaobao.xyz'],
         // 还可以增加额外的特性
         cacheLocation: false,
         frozen: false,
       },
     },
     // 需要增加如下配置
     devServer: {
       host: 'localhost',
       port: 3000,
     },
   }
   ```

4. 新建文件`src/index.js`，内容如下

   ```javascript
   function run() {
     console.log('子应用启用中')
   }

   export default run
   ```

5. 安装`webpack webpack-cli webpack-dev-server ` 模块

   ```shell
   npm install webpack webpack-cli webpack-dev-server -D
   ```

6. 接着我们修改`package.json`中的脚本命令

   ```javascript
   {
     "scripts": {
       "build": "webapck",
       "start": "webpack server"
     },
   }
   ```

7. 执行 `npm run start` 来启动服务

8. 此时打开 `http://localhost:3000/main.js`时就可以看到相应打包后的代码

9. 接着处理 `app_b`

10. 终端进 入 `app_b` 文件夹，执行命令

    ```shell
    npm init -y
    ```

11. 新建 `app_a/webpack.config.js` (拷贝`demo1/webpack5-demo/webpack.config.js`，并增加 `devServer plugins` 配置)

    ```javascript
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      mode: 'production',
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
      },
      optimization: {
        splitChunks: {
          minSize: 1 * 1024,
          chunks: 'all',
          name: 'common',
        },
      },
      // cache: true, 适合开发模式
      // cache: true, //cache: true 与 cache: { type: 'memory' } 配置作用一致。 传入 false 会禁用缓存:
      cache: {
        type: 'filesystem',
      },
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
      experiments: {
        buildHttp: {
          // 白名单域名
          allowedUris: ['http://imooc-dev.youbaobao.xyz'],
          // 还可以增加额外的特性
          cacheLocation: false,
          frozen: false,
        },
      },
      // 需要增加如下配置
      devServer: {
        host: 'localhost',
        port: 3001,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
      ],
    }
    ```

12. 由于`webpack-dev-server`默认会使用`public`作为静态资源文件夹

13. 我们新建`app_b/public/index.html`，内容如下

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Main Module</title>
      </head>
      <body></body>
    </html>
    ```

14. 新建文件`src/index.js`，内容如下

    ```javascript
    console.log('主应用启动中')
    ```

15. 安装`webpack webpack-cli webpack-dev-server ` 模块

    ```shell
    npm install html-webpack-plugin webpack webpack-cli webpack-dev-server -D
    ```

16. 接着我们修改`package.json`中的脚本命令

    ```javascript
    {
      "scripts": {
        "build": "webapck",
        "start": "webpack server"
      },
    }
    ```

17. 执行 `npm run start` 来启动服务 http://localhost:3001/ 就可以在控制台看到输出信息

18. 接下来就到了关键时候，这时候我们是启动了两个单独的服务，并且两个服务之间还没有任何的关联、联动

19. 修改 app_a 中的 webpack.config.js 增加内容如下

    ```javascript
    const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

    module.exports = {
      plugins: [
        new ModuleFederationPlugin({
          // 暴露的文件名称
          filename: 'app_a.js',
          // 应用名，全局唯一，不可冲突。 f
          name: 'app_a',
          // 远程应用暴露出的模块名。
          exposes: {
            './moduleA': './src/index.js',
          },
        }),
      ],
    }
    ```

20. 在 app_a 中重新运行 npm run start ，就会重新打包，从而向外部暴露一个模块

21. 接着我们来到 app_b 中对暴露的模块进行一个接收,修改 package.json 如下

    ```javascript
    const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

    module.exports = {
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
        // 增加插件
        new ModuleFederationPlugin({
          filename: 'app_b.js',
          name: 'app_b',
          // 远程访问地址入口
          remotes: {
            app_a: 'app_a@http://localhost:3000/main.js',
          },
        }),
      ],
    }
    ```

22. 接这修改 app_a/src/index.js 中的代码

    ```javascript
    console.log('主应用启动中')

    import('app_a/moduleA')
      .then((res) => {
        const moduleA = res.default
        console.log(moduleA())
      })
      .catch((err) => {
        console.log(err, 11122)
      })
    ```

23. 在 app_b 中启动脚本 npm run dev ,打开 localhost:3001 就可以看到控制台输出日志

24. 目前本地运行报错，不知道为什么，？？？？？？？？？？？待解决

## 08: webpack5 高级特性：PackageExports

### 支持全新的 node.js 生态特性

> 现在支持 package.json 中的 exports 和 imports 字段，原生支持 Yarn Pnpm 更多细节参见[package exports](https://webpack.docschina.org/guides/package-exports/)

1. 新建 demo3/lib demo3/work 文件夹

2. 进入 demo3/lib，执行以下命令

   ```bash
   npm init -y
   ```

3. 新建 lib/a.js lib/b.js

   ```javascript
   // a.js
   export default function () {
     console.log('a.js')
   }
   
   // b.js
   export default function () {
     console.log('b.js')
   }
   ```

4. 在 `demo3/lib` 文件夹下，执行

   ```bash
   npm link
   ```

5. 修改 `lib/package.json`

   ```javascript
   {
     "name": "lib",
     "version": "1.0.0",
     "description": "",
     // 修改 main 属性
     "main": "a.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
      // 增加 exports 属性，require 的时候调用 a.js, import的时候加载 b.js
     "exports": {
       "require": "./a.js",
       "import": "./b.js"
     }
   }
   ```

6. 进入 `demo3/work`  目录下

7. 执行以下命令

   ```bash
   npm init -y
   ```

8. 新建`webpack.config.js`， 内容如下

   ```javascript
   // demo3/work/webpack.config.js
   const path = require('path')
   module.exports = {
     mode: 'production',
     entry: './index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].js',
     },
   }
   ```

9. 新建 `index.js`，内容如下

   ```javascript
   const library = require('lib')
   library()
   ```

10. 执行一个命令，对 lib 进行一个链接引用

    ```bash
    npm link lib
    ```

11. 安装相关依赖

    ```bash
    npm install webpack webpack-cli -D
    ```

12. 修改 `package.json` 文件如下

    ```javascript
    {
     "scripts": {
        "build": "webpack"
      },
    }
    ```

13. 然后执行 `npm run build`，查看 `dist/main.js` 文件

14. 

15. 接着我们换一种方式，修改 `demo3/work/index.js`

    ```javascript
    // const library = require('lib')
    import library from "lib"
    library()
    ```

16. 再次执行 `npm run build`，查看 `dist/main.js` 文件

    

## 参考文章

[webpack5 新特性:https://juejin.cn/post/6983985071699001357#heading-1](https://juejin.cn/post/6983985071699001357#heading-1)
