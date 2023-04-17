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

```javascript
npm install hard-source-webpack-plugin -D

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
module.exports = {
  plugins: [new HardSourceWebpackPlugin()],
}
```

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

04: webpack4和5构建结果对比

05: webpack5高级特性：URIs解析

06: webpack5高级特性：TreeShaking和SideEffects 

07: webpack5高级特性：模块联邦

08: webpack5高级特性：PackageExports
