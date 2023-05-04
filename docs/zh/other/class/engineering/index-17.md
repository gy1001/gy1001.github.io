# 17: 工程化脚手架：高阶实战——深入工程化脚手架插件机制+Vue插件开发

## 01：webpack初始配置mode开发

1. 修改`imooc-build/plugins/initPlugin/index.js`中的代码如下

   ```javascript
   module.exports = function initPlugin(api, params) {
     console.log('init plugin')
     // 增加如下内容，
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     // 获取构建模式，默认为 development
     const mode = process.env.IMOOC_BUILD_MODE || 'development'
     config.mode(mode)
     console.log("mode", config.toConfig())
   }
   ```

2. 在`imooc-build/samples/`文件夹下安装`cross-env`

   ```bash
   npm install cross-env -D
   ```

3. 修改`samples/package.json`,增加如下脚本

   ```json
   {
      "dev:env": "cross-env IMOOC_BUILD_MODE=production imooc-build start -d"
   }
   ```

4. 在`samples`文件夹下运行终端命令`npm run dev:env`，效果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b5a739c632f485abd4451d2c1703271~tplv-k3u1fbpfcp-watermark.image?)









