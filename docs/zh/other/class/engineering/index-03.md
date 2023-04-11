# 03-[初探] 原生前端项目工程化改造

## 01: webpack 快读上手

### webpack 核心概念

- entry：入口模块文件路径
- output：输出 bundle 文件路径
- module: 模块，webpack 构建对象
- bundle：输出文件，webpack 构建产物
- chunk：中间文件，webpack 构建的中间产物
- loader：文件转换器
- plugin：插件，执行特定任务

## 02: webpack 快速入门+基础代码演示

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

## 03：webpack source-map 原理讲解

通过`devtool`可以得到完全不同的打包源码，会对打包性能也有重大影响。

### 参考文章

`devtool`的配置项可以通过官网获得:[https://webpack.js.org/configuration/devtool/](https://webpack.js.org/configuration/devtool/)

source-map 的原理可以参考阮一峰来世的文章：[http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

[打破砂锅问到底：详解 Webpack 中的 sourcemap](https://segmentfault.com/a/1190000008315937)

[生产上的问题你不会用 sourcemap 定位吗？](https://juejin.cn/post/7209648356530962489)

[万字长文：关于sourcemap，这篇文章就够了](https://juejin.cn/post/6969748500938489892#heading-18)

[sourcemap 这么讲，我彻底理解了](https://juejin.cn/post/7199895323187347514#heading-5)

### 代码实操

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
/******/ ;(() => {
  // webpackBootstrap
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
  // 转换前的文件。该项是一个数组，可能存在多个文件合并成一个文件。
  "sources": [
    "webpack://webpack-demo/./src/index.js"
  ],
  // sourceContent: 原始内容。
  "sourcesContent": [
    "console.log('hello webpack')\n"
  ],
  // 转换前的所有变量名和属性名。
  "names": [],
  "sourceRoot": ""
}
```

**mappings 位置对应的原理**

| 分析角度 | 含义                                                                                                                |
| :------- | ------------------------------------------------------------------------------------------------------------------- |
| 行对应   | 以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。             |
| 位置对应 | 以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。 |
| 分词信息 | 以 VLQ 编码表示，代表记录该位置对应的转换前的源码位置、原来属于那个文件等信息。                                     |

- 【行对应】很好理解，即一个分号为一行，因为压缩后基本上都是一行了，所以这个没啥有用信息；
- 【位置对应】可以理解为分词，每个逗号对应转换后源码的一个位置；
- 【分词信息】是关键，如`AAAA`代表该位置转换前的源码位置，以`VLQ`编码表示；

每个位置使用五位，表示五个字段（webpack 5.xx 打包后只留下四位，第五位不是必需的）

```tex
从左边开始
　　- 第一位，表示这个位置在（转换后的代码的）的第几列。
　　- 第二位，表示这个位置属于sources属性中的哪一个文件。
　　- 第三位，表示这个位置属于转换前代码的第几行。
　　- 第四位，表示这个位置属于转换前代码的第几列。
　　- 第五位，表示这个位置属于names属性中的哪一个变量。
```

### 个人总结

读了很多文章，大概了解了`VLQ编码`转换的一些规则

1. 实际上只有 **每个分号中的第一串英文** 是用来表示代码的 **第几行、第几列** 的绝对位置外，后面的都是相对于之前的位置来做 **加减法** 的

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/430f2bbe58b2452da5c40148097a9b2d~tplv-k3u1fbpfcp-watermark.image?)

2. 注意：Base-VLQ 编码》

   >对于正负而言，编码规则设定**第一个单元的最后一位用于表示正负数，零正一负**；
   >
   >* **这里需要注意，为什么说是【第一个单元】，因为一共六个位，去掉一个表示连续，一个表示正负，那能表示的范围是[-15,15]，如果数字过大，就会需要多个单元去描述非第一个单元是不需要表示正负的，所以只需要最高位表示是否终止即可。**

   * 见名知意，其实就是 VLQ 编码方式和 base64 编码的结合。不过有几点与 VLQ 的区别也需要注意一下
     * Base64 VLQ 需要能够表示负数,于是用第一个单元的最后一位来作为符号标志位
     * 在 Base64 VLQ 中，因为要和 base64 相对应，所以修改`vlq`7 位一组的设定，改为 5 位一组，加上设定为最高位的连续位正好六位。
   * 举例子
     * 对于 7： 二进制是 111，
       * 只有一个单元，自然最高位是 0；
       * 正数，所以最后一位是 0；
       * 最后只有三位，所以前置位补 0；
       * 得出的 VLQ 编码就是`001110`；
       * ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfef3c9831194a3bb1b24d4ee4339d38~tplv-k3u1fbpfcp-watermark.image?)
     * **对于 1200**：二进制是：10010110000
       * 多个单元，所以连续，最高位是 1；
       * 正数，所以最后一位是 0；
       * 超过一个单元，所以对于第一个单元在二进制中从后取出四个数出来填充四位即可
       * 那得到的第一个单元的组成就是`100000`
       * 再完成第二个单元
         * 还是填不满，所以联系，最高位是 1
         * 非第一个单元，所以不管正负了，取出五个数填充五位即可
         * 得到的第二个单元的组成就是`101011`
       * 例推下去，最后得到的结果即`100000101011000010`
       * ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4aa865e15d904a34ae4c8db322945c35~tplv-k3u1fbpfcp-watermark.image?)

3. VLQ 编码和 base64 编码的对应关系如下表：

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebe0b5c88f56454f9a7b2088d92b5b27~tplv-k3u1fbpfcp-watermark.image?)

## 04：通过 webpack loader 打包 css 文件

### loader 解决了什么问题

- 将除了`js`以外其他资源转换为`js`

### loader 执行顺序

- 从右到左（或者说：从下到上）依次执行

### Quick Start

1. 创建`index.css`,内容如下

   ```css
   .test {
     width: 100px;
     height: 100px;
     background-color: red;
   }
   ```

2. 在`index.js`(entry)中引入`index.css`

   ```javascript
   import './index.css'
   console.log('hello webpack')
   ```

3. 修改`public/index.html`如下

   ```html
   <body>
     <div class="test"></div>
   </body>
   ```

4. 重新执行`npm run build`会引发错误

   ```javascript
   Module parse failed: Unexpected token (1:0)
   You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
   > .test{
   |   width: 100px;
   |   height: 100px;
    @ ./src/index.js 1:0-20
   ```

5. 安装`css-loader`

   `npm install css-loader -D`

6. 修改配置文件`webpack.config.js`

   ```javascript
   module.exports = {
     ...
     module: {
       rules: [{ test: /.css$/, use: ['css-loader'] }],
     },
   }
   ```

7. 再次执行`npm run build`，打包编译成功

8. 但是运行页面至浏览器，发现仍然没有显示

9. 需要再安装一个插件`style-loader`

   ```shell
   npm install style-loader  -D
   ```

10. 修改配置文件`webpack.config.js`内容如下

    ```javascript
    module.exports = {
      ...
      module: {
        rules: [{ test: /.css$/, use: ['style-loader','css-loader'] }],
      },
    }
    ```
