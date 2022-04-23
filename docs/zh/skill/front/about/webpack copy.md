### 3.9 Shimming 的作用

### 4.0 环境变量的使用方法

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

[webpack 使用环境变量](https://webpack.js.org/guides/environment-variables/)

## 4. Webpack 实战配置案例讲解

### 4.1 Library 的打包
