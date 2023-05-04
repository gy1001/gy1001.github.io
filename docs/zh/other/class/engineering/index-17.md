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

## 02: entry 和 output 配置移植

### 设置 entry

1. 修改`lib/service/Service.js`文件，内容如下

   ```javascript
   class Service {
     async start() {
       await this.resolveConfig()
       await this.registerWebpackConfig()
       await this.registerHooks()
       await this.emitHooks(HOOK_START)
       await this.registerPlugin()
       await this.runPlugin()
       await this.initWebpack()
       // 增加如下代码
       log.verbose('webpack config', this.webpackConfig.toConfig())
     }
     
     // 先注释掉 registerWebpackConfig 方法内部代码
     registerWebpackConfig() {
       // entry: { inedx: "index.js" }
       // this.webpackConfig
       //   .entry('index')
       //   .add('src/index.js')
       //   .end()
       //   .output.path('dist')
       //   .filename('[name].bundle.js')
       // const entry = this.webpackConfig.entry('index')
       // entry.clear()
       // entry.add('src/main.js').add('src/bundle.js')
       // if (entry.has('src/main.js')) {
       //   entry.delete('src/main.js')
       // }
       // this.webpackConfig.module
       //   .rule('lint')
       //   .test('/.js$/')
       //   .include.add('src')
       //   .end()
       //   .exclude.add('node_modules')
       //   .end()
       //   .use('eslint')
       //   .loader('eslint-loader')
       //   .options({
       //     rules: {
       //       semi: 'off',
       //     },
       //   })
       // const lintRule = this.webpackConfig.module.rule('lint') // 注意这个名字和前面一致
       // lintRule.include.clear()
       // lintRule.exclude.clear()
       // lintRule.uses.clear()
       // log.verbose(
       //   'webpack config',
       //   JSON.stringify(this.webpackConfig.toConfig(), null, 2),
       // )
       // this.webpackConfig.plugin('clean').use('webpack-chain', [{ root: '/dir' }])
       // log.verbose('webpack config', this.webpackConfig.toConfig())
     }
   }
   module.exports = Service
   ```

2. 修改`imooc-build/plugins/initPlugin/index.js`，内容如下

   ```javascript
   const path = require('path')
   
   module.exports = function initPlugin(api, params) {
     console.log('init plugin')
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     const mode = process.env.IMOOC_BUILD_MODE || 'development'
     config.mode(mode)
     // 增加代码：设置默认 entry
     const dir = process.cwd()
     config.entry('index').add(path.resolve(dir, './src/index.js'))
   }
   ```

3. 修改`imooc-build/samples/plugins/imooc-build-plugin-one.js`文件，在测试实例中另增加入口文件，代码如下

   ```javascript
   const path = require('path')
   module.exports = function startPluginFirst(api, params) {
     const { getWebpackConfig } = api
     const dir = process.cwd()
     const config = getWebpackConfig()
     // 增加 login 入口文件
     config
       .entry('login')
       .add(path.resolve(dir, 'src/login.js'))
       .end()
   }
   ```

4. 至此，入口文件增加完成，运行终端命令，看下配置结果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/275c4d9783474027a4c20be090bfc438~tplv-k3u1fbpfcp-watermark.image?)

### 设置 output

1. 继续修改`imooc-build/plugins/initPlugin/index.js`，内容如下

   ```javascript
   const path = require('path')
   
   module.exports = function initPlugin(api, params) {
     console.log('init plugin')
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     const mode = process.env.IMOOC_BUILD_MODE || 'development'
     config.mode(mode)
     const dir = process.cwd()
     config.entry('index').add(path.resolve(dir, './src/index.js'))
     // 设置 output
     config.output.filename('js/[name].js').path(path.resolve(dir, '../dist'))
   }
   ```

2. 重新运行终端命令，效果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b798adc1ce524cd5b9b02d78948d8419~tplv-k3u1fbpfcp-watermark.image?)

   

   

   





