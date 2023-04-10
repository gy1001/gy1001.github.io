# 03-【初探】原生前端项目工程化改造



## 01: webpack 快读上手

### webpack 核心概念

* entry：入口模块文件路径
* output：输出 bundle 文件路径
* module: 模块，webpack 构建对象
* bundle：输出文件，webpack 构建产物
* chunk：中间文件，webpack 构建的中间产物
* loader：文件转换器
* plugin：插件，执行特定任务

##  02: webpack快速入门+基础代码演示

### Quick Start

1. 新建文件夹`wepack-demo`

   ```shell
   mkdir webpack-demo
   ```

2. 执行初始化命令,根据提示输入内容

   ```shell
   cd webpack-demo
   npm init
   ```

3. 创建`src/index.js`

   ```shell
   mkdir src
   cd src
   touch index.js
   ```

   写入如下内容

   ```javascript
   console.log('hello webpack')
   ```

4. 创建`public/index.html`

   ```shell
   mkdir public
   cd public
   touch index.html
   ```

   写入如下内容(引入未来打包构建的`dist/bundle.js`文件)

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
     <script src="../dist/bundle.js"></script>
   </html>
   
   ```

5. 创建`wepack.config.js`，并写入配置如下

   ```javascript
   const path = require('path')
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, './dist'),
       filename: 'bundle.js',
     },
   }
   ```

6. 安装依赖

   ```shell
   npm install -D webpack webpack-cli
   ```

7. 配置`build`命令为`webpack`,在`package.json`中增加如下内容

   ```javascript
   {
     "scripts": {
       "build": "webpack"
     },
   }
   ```

8. 执行打包命令，完成打包构建

   ```shell
   npm run build
   ```

9. 运行`public/index.html`，可以看到打印结果

10. 这里我们可以打开打包后的文件，删除注释后，得到如下的一个结果

    ```javascript
    ;(() => {
      var __webpack_modules__ = {
        './src/index.js': () => {
          eval(
            "console.log('hello webpack')\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?",
          )
        },
      }
      var __webpack_exports__ = {}
      __webpack_modules__['./src/index.js']()
    })()
    ```

## 03：webpack source-map原理讲解

通过`devtool`可以得到完全不同的打包源码，会对打包性能也有重大影响。

`devtool`的配置项可以通过官网获得:[https://webpack.js.org/configuration/devtool/](https://webpack.js.org/configuration/devtool/)

source-map 的原理可以参考阮一峰来世的文章：[http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

修改`webpack.config.js`文件如下

```javascript
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map', // 添加如下代码
}
```

重新执行`npm run build`，可以看到`dist` 目录下多了一个`bundle.js.map`文件，而`bundle.js`文件内容如下

```javascript
/******/ ;(() => { // webpackBootstrap
  var __webpack_exports__ = {}
  /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
  console.log('hello webpack')

  /******/
})()
//# sourceMappingURL=bundle.js.map
```

而`bundle.js.map`文件内容如下

```javascript
{
  "version": 3,
  "file": "bundle.js", // 对应的源文件
  "mappings": ";;;;;AAAA",// 我对源文件中哪一行进行映射，第6行开始
  "sources": [
    "webpack://webpack-demo/./src/index.js"
  ],
  "sourcesContent": [
    "console.log('hello webpack')\n"
  ],
  "names": [],
  "sourceRoot": ""
}
```





