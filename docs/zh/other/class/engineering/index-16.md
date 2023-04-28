# 16-工程化脚手架：进阶实战——工程化脚手架构建服务实战

## 01：脚手架运行流程图绘制

```flow
start=>start: 开始
check_node=>condition: 检查Node版本是否>=8.9.0
imooc-build=>parallel: 开启服务

register_start=>operation: 注册start命令
register_build=>operation: 注册build命令
watch_start=>operation: 命令解析-
监听start命令
watch_build=>operation: 命令解析-
监听build命令
is_start=>condition: 是否是start命令
is_build=>condition: 是否是build命令
start_pc=>parallel: 启动子进程
运行DevService
register_config_change=>operation: 监听配置文件修改服务
watch_config_change=>condition: 是否发生修改
kill_pc_restart=>operation: kill子进程
重新启动子进程
parse_params=>operation: 解析参数
get_port=>operation: 获取port参数
check_port=>condition: 建立tcp链接
检查端口号是否被占用
use_port=>operation: 使用port作为端口号
is_use_new_port=>condition: 是否启用新端口号
add_port=>operation: 将port+1
new_service=>parallel: 实例化service对象
start_service=>operation: 调用service.start
create_config=>operation: 创建args对象
create_utils=>operation: 定义工具方法
parse_config=>operation: 解析配置方法
parse_plugins=>operation: 解析插件
plugins_run=>operation: 插件运行
hooks_run=>operation: 钩子函数运行
create_chainwebpack_config=>operation: 生成chainWebpack配置
new_webpack_compiler=>operation: 实例化wepack-compiler对象
new_webpack_dev_server=>operation: 实例化webpackDevServer
start_server=>operation: 启动服务
end=>end: 结束

start->check_node
check_node(yes)->imooc-build(path1,bottom)->register_start->watch_start->is_start
check_node(no)->end
imooc-build(path2,right)->register_build->watch_build->is_build
is_start(yes)->start_pc(path1, left)->register_config_change->watch_config_change
watch_config_change(yes)->kill_pc_restart
watch_config_change(no)->watch_config_change
start_pc(path2, bottom)->parse_params->get_port->check_port
check_port(yes)->is_use_new_port
is_use_new_port(yes)->add_port->check_port
is_use_new_port(no)->end

check_port(no)->use_port->new_service(path1,right)->start_service->parse_config->parse_plugins->plugins_run->hooks_run
hooks_run->create_chainwebpack_config->new_webpack_compiler->new_webpack_dev_server->start_server
new_service(path2,bottom)->create_config->create_utils

```

## 02: 重要：工程化脚手架核心服务架构设计

如上

## 03：创建工程化脚手架配套配置文件

### 基本框架雏形构建

1. 修改`service/Service.js`，增加解析流程

   ```javascript
   const DEFAULT_CONFIG_NAME = 'imooc-build.config.json'
   class Service {
     constructor(opts) {
       this.args = opts
       this.config = {}
       this.hooks = {}
     }
     start() {
       console.log('启动服务')
       this.resolveConfig()
     }
     // 解析配置文件
     resolveConfig() {
       console.log('解析配置文件')
     }
   }

   module.exports = Service
   ```

2. 重新运行终端，可以输出以下日志

   ```bash
    imooc-build start
   start server
   端口号8080被占用，建议使用新端口号8081
   ? 8080已被占用，是否启用新端口号8081? Yes
   启动服务
   解析配置文件
   
   ```

### 新建测试实例

1. 接下来我们新建测试实例，新建`samples`文件夹，终端运行初始化

   ```bash
   npm init -y
   ```

2. 修改`package.json`,增加运行脚本

   ```json
   {
     "scripts": {
       "dev": "imooc-build start"
     }
   }
   ```

3. 新建配置文件`samples/imooc-build.config.json`,内容如下

   ```json
   {
     "entry": "src/inedx.js",
     "plugins": []
   }
   ```

4. 新建`samples/src/inedx.js`内容如下

   ```javascript
   console.log('hello imooc-build test project')
   ```

## 04：配置文件解析功能开发

> 我们还可以需要支持通过 --config 来指定配置文件

### 获取参数流程

1. 修改`lib/imooc-build.js`文件，增加`--config`配置

   ```javascript
   ...
   program
     .command('start')
     .option('-c --config <config>', '配置文件路径')

   program
     .command('build')
     .option('-c --config <config>', '配置文件路径')
   ...
   ```

2. 修改`startServer.js`,接收参数

   ```javascript
   function runServer(args = {}) {
     // 接收参数，注意这里后续参数解析会变为字符串，
     // 如果不存在时，就会变为字符串的 undefinded, "undefined"
     // 需要给个默认值
     const { config = "" } = args
     const srciprtPath = path.resolve(__dirname, './devService.js')
     // 运行脚本时也要增加参数
     const configParams = ['--port 8080', '--config ' + config]
     child = cp.fork(srciprtPath, configParams)
     child.on('exit', (code) => {
       if (code) {
         process.exit(code)
       }
     })
   }
   
   function onChange(eventName, path) {
     child.kill()
     runServer()
   }
   
   module.exports = function startServer(args, opts, cmd) {
     console.log('start server')
     // 这里增加参数传入
     runServer(args)
     runWatcher()
   }
   ```

3. 接着修改`devService.js`文件，处理参数

   > 这里之前我们通过 **const** params = process.argv.slice(2) 来处理参数，并最终放在了 paramObj 中

   ```javascript
   const defaultPort = parseInt(paramObj.port || DEFAUL_PORT, 10)
   // 增加如下代码
   const config = paramObj.config || ''

   try{
     ...
     const args = {
       port: newPort,
       // 这里增加参数传递
       config,
     }
     const service = new Service(args)
     service.start()
   }catch(){

   }
   ```

4. 接着修改`/lib/service/Service.js`文件

   ```javascript
   class Service {
     // 解析配置文件
     resolveConfig() {
       console.log('解析配置文件', this.args)
     }
   }
   module.exports = Service
   ```

5. 运行终端，最终可以看到如下效果

   ```bash
   $ imooc-build start --config build.config.js
   解析配置文件 { port: 8081, config: 'build.config.js' }
   ```

6. 这个获取配置参数的流程就此完成了。

### 完善路径解析功能

1. 修改`Service.js`，代码如下

   ```javascript
   const path = require('path')
   
   class Service {
     // 增加是否是绝对路径的判断处理
     resolveConfig() {
       console.log('解析配置文件', this.args)
       const { config } = this.args
       let configPath = config
       if (config) {
         if (path.isAbsolute(config)) {
           configPath = config
         } else {
           // 注意：这里不要加__dirname: 可以用来动态获取当前文件所属目录的绝对路径
           configPath = path.resolve(config)
         }
       }
       console.log(configPath)
     }
   }
   module.exports = Service
   ```

2. 修改`samples/package.json`，内容如下

   ```javascript
   {
     "scripts": {
       "dev": "imooc-build start --config ./imooc-build.config.json"
     },
   }
   ```

3. 在`samples`文件夹下运行终端，结果如下

   ```bash
   $ npm run dev
   > imooc-build start --config ./imooc-build.config.json
   启动服务
   /Users/yuangao/Desktop/imooc-build/samples/imooc-build.config.json
   ```

## 05: fast-glob实现文件遍历功能

### 查找默认配置文件路径

>  上一小节中，只处理了 config 存在的时候，如果没有存在呢？我们就需要进行一个全局的搜索，有两种形式一种是 imooc-build.config.js 还有一种是 imooc-build.config.json
>
> [npm库：fast-glob: https://www.npmjs.com/package/fast-glob](https://www.npmjs.com/package/fast-glob)

1. 安装`fast-glob`依赖库

   ```bash
   npm install fast-glob -D
   ```

2. 修改`Service.js`，修改如下

   ```javascript
   // 默认文件配置名字
   const DEFAULT_CONFIG_NAME = ['imooc-build.config.(json|js)']
   const fg = require('fast-glob')
   
   class Service {
     constructor(opts) {
       ...
       // 设置绝对路径文件夹
       this.dir = process.cwd()
     }
     
     resolveConfig() {
       if (config) {
         ...
       }else{
         // 如果没有获取到配置文件的参数，就开始查询默认的文件是否存在
         const [configFile] = fg.sync(DEFAULT_CONFIG_NAME, {
           cwd: this.dir,
           absolute: true,
         })
         configPath = configFile
       }
       console.log(configPath)
     }
   }
   module.exports = Service
   ```

3. 如果`samples`文件夹下有这个文件`imooc-build.config.json`或者`imooc-build.config.js`

4. 修改`package.json`中的配置脚本

   ```json
   {
     "scripts": {
       "dev": "imooc-build start --config imooc-build.config.json",
       "dev:noconfig": "imooc-build start"
     },
   }
   ```

5. 运行终端，就会有如下效果

   ```bash
   $ npm run dev:noconfig
   /Users/gaoyuan/Desktop/imooc-build/samples/imooc-build.config.json
   ```

### 没有找到默认文件逻辑处理

> 如果没有找到默认文件，我们就直接退出程序

1. 修改`Service.js`，文件，内容如下

   ```javascript
   const fs = require('fs')
   
   class Service {
     resolveConfig() {
       if (config) {
         
       }else{
         
       }
       // 这里增加配置文件判断逻辑，
       if (configPath && fs.existsSync(configPath)) {
         console.log(configPath)
       } else {
         console.log('配置文件不存在，终止执行')
         process.exit(1)
       }
     }
   }
   ```

2. 修改`samples`文件夹下的配置文件名字，比如: `imooc-build.config.json`改为`imooc-build.config.json1`,

3. 重新终端运行`npm run dev:noconfig`,效果如下

   ```bash
   $ npm run dev:noconfig
   配置文件不存在，终止执行 // 直接退出了

## 06：多类型配置文件结构解析

> * 如果文件是 json 文件，我们就直接 require 进来，获取各个参数
> * 如果是 js 文件，我们也可以通过 require 进来
>   * 如果内部文件采用 cjs 方式引入依赖，那就会解析正常
>   * 如果内部文件采用 esModule 方式引入依赖，那就会造成解析错误  
> * node 目前是支持运行 .mjs 类型的采用 esModule 标准书写的代码的

### 文件是 json 类型

1. 配置文件名字修改为`imooc-build.config.json`，内容如下

   ```json
   {
     "entry": "src/inedx.js",
     "plugins": []
   }
   ```

2. 修改`Service.js`中的代码，如下

   ```javascript
   class Service {
     resolveConfig() {
       if (config) {
         
       }else{
         
       }
       // 这里增加配置文件判断逻辑，
        if (configPath && fs.existsSync(configPath)) {
         console.log(configPath)
         // 这里增加 json 文件处理逻辑
         const isJson = configPath.endsWith('.json')
         if (isJson) {
           const config = require(configPath)
           console.log(config)
         }
       } else {
         console.log('配置文件不存在，终止执行')
         process.exit(1)
       }
     }
   }
   ```

3. 重新运行终端，效果如下

   ```bash
   $ npm run dev:noconfig
   /Users/gaoyuan/Desktop/imooc-build/samples/imooc-build.config.json
   { entry: 'src/inedx.js', plugins: [] } // 这是文件内容，获取成功
   ```

### 文件是 js 类型

1. 配置文件名字修改为`imooc-build.config.js`，修改内容如下

   ```javascript
   module.exports = {
     entry: 'src/inedx.js',
     plugins: [],
   }
   ```

2. 修改`Service.js`中的代码，增加处理`.js`文件逻辑，如下

   ```javascript
   class Service {
     resolveConfig() {
       if (config) {
         
       }else{
         
       }
        if (configPath && fs.existsSync(configPath)) {
         console.log(configPath)
         const isJson = configPath.endsWith('.json')
         // 增加 isJs 文件逻辑判断
         const isJs = configPath.endsWith('.js')
         if (isJson) {
           ...
         } else if (isJs) {
           const config = require(configPath)
           console.log(config)
         }
       } else {
         console.log('配置文件不存在，终止执行')
         process.exit(1)
       }
     }
   }
   ```

3. 重新运行终端，效果如下(这里正常解析，没问题)

   ```bash
   $ npm run dev:noconfig
   解析配置文件 { port: 8080, config: '' }
   { entry: 'src/inedx.js', plugins: [] }
   ```

4. 修改`imooc-build.config.js`，内容如下(用 cjs 形式引入代码)

   ```javascript
   const entry = 'src/index.js'
   const path = require('path')
   
   module.exports = {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     plugins: [],
   }
   ```

5. 重新运行终端，效果如下(这里也会正常解析，没问题)

   ```bash
   $ npm run dev:noconfig
   解析配置文件 { port: 8080, config: '' }
   {
     entry: '/Users/gaoyuan/Desktop/imooc-build/samples/src/index.js',
     plugins: []
   }
   ```

6. 但是如果代码中含有 esModule 标准的代码，修改`imooc-build.config.js`如下

   ```javascript
   const entry = 'src/index.js'
   import path from 'path'
   
   module.exports = {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     plugins: [],
   }
   ```

7. 重新运行终端，效果如下(这里就会解析报错)

   ```bash
   import path from 'path'
   ^^^^^^
   
   SyntaxError: Cannot use import statement outside a module
   ```

### 文件是 mjs 类型

1. 新建测试代码`src/test.mjs`,内容如下

   ```javascript
   import path from 'path'
   console.log(path.isAbsolute('package.json'))
   ```

2. 运行终端命令，效果如下（运行正常）

   ```bash
   $ node src/test.mjs 
   false
   ```

3. 配置文件名字修改为`imooc-build.config.mjs`，修改内容如下

   ```javascript
   const entry = 'src/index.js'
   import path from 'path'
   
   module.exports = {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     plugins: [],
   }
   ```

4. 当然，这里需要修改`service/Service.js`，修改地方如下

   ```javascript
   const DEFAULT_CONFIG_NAME = ['imooc-build.config.(json|mjs|js)'] // 增加 mjs 类型
   ```

5. 修改`Service.js`中的代码，增加处理`.mjs`文件逻辑，如下

   ```javascript
   class Service {
     resolveConfig() {
       if (config) {
         
       }else{
         
       }
        if (configPath && fs.existsSync(configPath)) {
         console.log(configPath)
         const isJson = configPath.endsWith('.json')
         const isJs = configPath.endsWith('.js')
         // 增加 isMJs 文件逻辑判断
         const isMjs = configPath.endsWith('.mjs')
         if (isJson) {
           ...
         } else if (isJs) {
           ...
         } else if (isMjs) {
           const config = require(configPath)
           console.log(config)
         }
       } else {
         console.log('配置文件不存在，终止执行')
         process.exit(1)
       }
     }
   }
   ```

6. 重新运行终端，效果如下(报错)

   ```bash
   Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/gaoyuan/Desktop/imooc-build/samples/imooc-build.config.mjs not supported.
   Instead change the require of /Users/gaoyuan/Desktop/imooc-build/samples/imooc-build.config.mjs to a dynamic import() which is available in all CommonJS modules.
       at Service.resolveConfig (/Users/gaoyuan/Desktop/imooc-build/lib/service/Service.js:47:24)
       at Service.start (/Users/gaoyuan/Desktop/imooc-build/lib/service/Service.js:15:10)
       at /Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js:50:13 {
     code: 'ERR_REQUIRE_ESM'
   }
   ```

7. 这里和视频教程有出入，需要修改`Service.js`中的代码，修改处理`.mjs`文件逻辑，如下

   ```javascript
   class Service {
     // 需要支持异步
     async resolveConfig() {
       if (config) {
         
       }else{
         
       }
        if (configPath && fs.existsSync(configPath)) {
         console.log(configPath)
         const isJson = configPath.endsWith('.json')
         const isJs = configPath.endsWith('.js')
         const isMjs = configPath.endsWith('.mjs')
         if (isJson) {
           ...
         } else if (isJs) {
           ...
         } else if (isMjs) {
           // 修改 isMjs 文件类型逻辑处理
           const config = await import(configPath)
           console.log(config.default)
         }
       } else {
         console.log('配置文件不存在，终止执行')
         process.exit(1)
       }
     }
   }
   ```

8. 并且修改`imooc-build.config.mjs`，内容如下

   ```javascript
   const entry = 'src/index.js'
   import path from 'path'
   export default {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     plugins: [],
   }
   ```

9. 重新运行终端，效果如下(解析正常)

   ```bash
   $ npm run dev:noconfig
   解析配置文件 { port: 8080, config: '' }
   {
     entry: '/Users/gaoyuan/Desktop/imooc-build/samples/src/index.js',
     plugins: []
   }
   ```

### 总体代码整合

1. `Service.js`中的代码如下

   ```javascript
   const DEFAULT_CONFIG_NAME = ['imooc-build.config.(json|mjs|js)']
   const path = require('path')
   const fg = require('fast-glob')
   const fs = require('fs')
   class Service {
     constructor(opts) {
       this.args = opts
       this.config = {}
       this.hooks = {}
       //
       this.dir = process.cwd()
     }
     start() {
       console.log('启动服务')
       this.resolveConfig()
     }
     // 解析配置文件
     async resolveConfig() {
       console.log('解析配置文件', this.args)
       const { config } = this.args
       let configPath = config
       if (config) {
         if (path.isAbsolute(config)) {
           configPath = config
         } else {
           configPath = path.resolve(config)
         }
       } else {
         // 如果没有配置，就查找默认文件
         const [configFile] = fg.sync(DEFAULT_CONFIG_NAME, {
           cwd: this.dir,
           absolute: true,
         })
         configPath = configFile
       }
       let configParams = {}
       if (configPath && fs.existsSync(configPath)) {
         const isJson = configPath.endsWith('.json')
         const isJs = configPath.endsWith('.js')
         const isMjs = configPath.endsWith('.mjs')
         if (isJson) {
           configParams = require(configPath)
         } else if (isJs) {
           configParams = require(configPath)
         } else if (isMjs) {
           configParams = await import(configPath)
           configParams = configParams.default
         }
         console.log(configParams)
       } else {
         console.log('配置文件不存在，终止执行')
         process.exit(1)
       }
     }
   }
   
   module.exports = Service
   ```

2. 重新运行终端，效果如下

   ```bash
   $ npm run dev:noconfig
   解析配置文件 { port: 8080, config: '' }
   {
     entry: '/Users/gaoyuan/Desktop/imooc-build/samples/src/index.js',
     plugins: []
   }
   ```

### 注意：

* 从上面可以看出，如果配置文件是 json 类型，可以正常 require 加载
* 如果文件是 js 类型且内部没有 esmodule 形式的代码，也可以正常通过 require 来加载
* 如果文件是 js 类型且内部代码符合 esmodule 形式，那就要变为 mjs 文件后缀，且导出采用 export default 形式。外部导入使用 import 

## 07：基于npmlog的公共日志类封装

> 我们目前的日志都是基于 console.log 但是某些是测试日志，这样我们就可以通过 npmlog 这个库来进行处理
>
> [npmlog库代码: https://www.npmjs.com/package/npmlog](https://www.npmjs.com/package/npmlog)
>
> 举例：下述方法是不同 level 的打印
>
> - log.silly(prefix, message, ...)
> - log.verbose(prefix, message, ...)
> - log.info(prefix, message, ...)
> - log.http(prefix, message, ...)
> - log.warn(prefix, message, ...)
> - log.error(prefix, message, ...)

### 初步了解 npmlog 库

1. 安装依赖库（在脚手架中）

   ```bash
   npm install npmlog -D
   ```

2. 新建`utils/log.js`文件，内容如下

   ```javascript
   const npmlog = require('npmlog')
   const LOG_LEVELS = ['verbose', 'info', 'warn', 'error']
   const LOG_LEVEL = process.env.LOG_LEVEL
   npmlog.level = LOG_LEVELS.indexOf(LOG_LEVEL) !== -1  ? LOG_LEVEL : 'info'
   module.exports = npmlog
   ```

3. 我们修改`Service.js`,增加如下代码

   ```javascript
   const log = require('../../utils/log')
   
   class Service {
       // 解析配置文件
     async resolveConfig() {
       log.verbose('解析配置文件', this.args)
       log.info('解析配置文件', this.args)
       ...
     }
   }
   ```

4. 此时我们在`samples`文件夹下，重新运行终端命令（效果如下，并且是有不同颜色的区别）

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6208a08896a142088dfd2c28c48e1acd~tplv-k3u1fbpfcp-watermark.image?)

5. 由上图可以看到我们的日志输出，只输出了`info`类型的日志，`verbose`类型的日志并没有输出

6. 如果更改`utils/log.js`文件，改变`level`配置

   ```javascript
   const npmlog = require('npmlog')
   const LOG_LEVELS = ['verbose', 'info', 'warn', 'error']
   // npmlog.level = LOG_LEVELS.indexOf(LOG_LEVEL) > 0 ? LOG_LEVEL : 'info'
   npmlog.level = 'verbose'
   module.exports = npmlog
   ```

7. 再次运行终端命令（效果如下）

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73be3f8e462742a08e17c58d97122aa4~tplv-k3u1fbpfcp-watermark.image?)

### 完善代码

1. 修改`utils/log.js`，代码如下

   ```javascript
   const npmlog = require('npmlog')
   const LOG_LEVELS = ['verbose', 'info', 'warn', 'error']
   const LOG_LEVEL = process.env.LOG_LEVEL
   npmlog.level = LOG_LEVELS.indexOf(LOG_LEVEL) !== -1 ? LOG_LEVEL : 'info'
   module.exports = npmlog
   ```

2. 这个时候我们可以在脚手架中增加一个`-d`的全局 option  来表示正在调试阶段，并且利用前置钩子，修改`bin/imooc-build.js`文件，内容如下

   ```javascript
    // 增加一个全局的 -d 表示 debug 模式
   program.option('-d --debug', '开启调试模式')
     .hook('preAction', (thisCommand, actionCommand) => {
       const { debug } = actionCommand.optsWithGlobals()
       if (debug) {
         process.env.LOG_LEVEL = 'verbose'
       }
     })
   ```

3. 我们在`samples/package.json`中新建一个脚本

   ```javascript
   {
     "dev:debug": "imooc-build start -d"
   }
   ```

4. 这样我们在`samples`文件夹下的终端运行

5. 运行`npm run dev:noconfig`时效果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e524ff91dcb74a05be33df70b055ce5c~tplv-k3u1fbpfcp-watermark.image?)

6. 运行`npm run dev:debug`时效果如下

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47ff40e2623945e6b736631be7df03f8~tplv-k3u1fbpfcp-watermark.image?)

## 08：配置文件修改时自动重启服务逻辑优化

### 抽离配置文件获取逻辑

> 目前我们的脚手架是再监听`start/config.js`这个临时配置文件，我们需要改为监听实际运行项目中的测试文件，这里有两个部分都使用了
>
> * 一个是 **startServer.js** 中的 **runWatcher** 函数
> * 一个是 **service/Service.js** 中的读取配置文件部分

1. 新建`utils/index.js`,里面导出`getConfigFile`功能的函数

   ```javascript
   const DEFAULT_CONFIG_NAME = ['imooc-build.config.+(json|mjs|js)']
   const fg = require('fast-glob')
   function getConfigFile({ cwd = process.cwd() } = {}) {
     const arr = fg.sync(DEFAULT_CONFIG_NAME, {
       cwd,
       absolute: true,
     })
     // 这里返回数组的最后一项，因为如果有多个匹配了,优先使用 .json 文件
     return arr[arr.length - 1]
   }
   module.exports = { getConfigFile }
   ```

2. 修改`service/Service.js`中的部分

   ```javascript
   const { getConfigFile } = require('../../utils')
   class Service {
     async resolveConfig() {
       if (config) {
         if (path.isAbsolute(config)) {
           ...
         } else {
           ...
         }
       } else {
        	// 修改为根据方式获取
         configPath = getConfigFile()
       }
     }
   }
   ```

3. 修改`start/StartServer.js`中的`runWatcher`函数

   ```javascript
   const { getConfigFile } = require('../../utils')
   const log = require('../../utils/log')
   // 定义全局参数，重启时候需要记得上一次命令时候传递的参数
   let serverArgs
   
   function onChange(eventName, path) {
     log.verbose('config file changed')
     log.info('config fill changed-----')
     child.kill()
     runServer(serverArgs)
   }
   
   function runWatcher(args) {
     // 启动配置监听服务
     // 通过公共方法进行获取配置文件
     let configPath
     // 如果当前配置参数里面有 config 就进行监听，如果没有就是用默认文件地址
     if (args.config) {
       configPath = path.isAbsolute(args.config) ? args.config : path.resolve(args.config)
     } else {
       configPath = getConfigFile()
     }
     chokidar
       .watch(configPath)
       .on('change', onChange)
       .on('erro', (error) => {
         console.error('file watch error!', error)
         process.exit(1)
       })
   }
   
   module.exports = function startServer(args, opts, cmd) {
     console.log('start server', args)
     // 接收参数
     serverArgs = args
     runServer(args)
     // 配置文件这里要传递参数
     runWatcher(args)
   }
   ```

4. 此时我们重新运行终端，效果正常（运行命令：`npm run dev:debug`，此时全部日志均被打印出来，如下图）

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/061f5bcab63f4b7093dd76e5e9cd3efb~tplv-k3u1fbpfcp-watermark.image?)

5. 并且此时我们监听配置文件是`samples`文件夹下的`imooc-build.config.mjs`，修改文件，比如增加`output: path.resolve('dist')` 效果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee2b7f9d39464649951c0c43cd11e02f~tplv-k3u1fbpfcp-watermark.image?)

6. 这里明显有问题：因为我们在`onChange`事件中打印了**两个console**，而上图中只有一个，下面就来解决,很显然是`npmlog.level`被重置了

### 重启服务后问题的解决

1. 此时我们在`onChange`、`startServer`函数中查看两个值

   ```javascript
   function onChange(eventName, path) {
     // 这里我们查看 process.env.LOG_LEVEL、log.level
     console.log(process.env.LOG_LEVEL, log.level)
     log.verbose('config file changed')
     log.info('config fill changed-----')
     child.kill()
     runServer(serverArgs)
   }
   
   module.exports = function startServer(args, opts, cmd) {
     // 这里我们也进行一个查看
     console.log(process.env.LOG_LEVEL, log.level)
     serverArgs = args
     // 1. 通过子进程启动一个 webpack-dev-server 服务
     // 1.1 子进程启动可以避免主进程收到影响
     // 1.2 子进程启动可以方便重启，解决修改配置后无法重启的问题
     runServer(args)
     // 2. 监听配置修改
     runWatcher(args)
   }
   ```

2. 重新更改配置文件，查看终端结果

   ```bash
   verbose info
   verbose info
   ```

3. 这里可以看到`process.env.LOG_LEVEL`已经发生了更改，但是`log.level`并没有，因为这里并不是数据绑定，在钩子执行时候，`startServer.js`中的`log`已经完成了引用，后续的更改，所以重点是，在引入前进行更改

4. 可以在`StartServer.js`函数中进行更改

   ```javascript
   module.exports = function startServer(args, opts, cmd) {
     // 这里进行更改
     log.level = process.env.LOG_LEVEL
     serverArgs = args
     runServer(args)
     runWatcher(args)
   }
   ```

5. 从新更改配置文件，就可以看到如下打印日志

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b890fd3895474c708486eda9d21802de~tplv-k3u1fbpfcp-watermark.image?)

## 09：高级特性：生命周期函数hooks注册

> 目前这个脚手架我们支持，在配置文件中注册钩子函数，数据格式如下
>
>  hooks: [
>
> ​    [ 'created', **function** () {},],
>
> ​    [ 'configResolved', **function** () { },],
>
>   ]

1. 修改`samples`文件夹下的配置文件`samples/imooc-build.config.mjs`,添加钩子配置

   ```javascript
   export default {
     ...
     hooks: [
       [ 'start', function () {
           console.log('start')
         },
       ],
       [ 'configResolved', function () {
           console.log('configResolved')
         },
       ],
     ],
   }
   ```

2. 修改`service/Service.js`中的代码，注册钩子函数

   ```javascript
   class Service {
     // 这里需要增加改为同步代码，解析配置后需要赋值给 this 上
     async start() {
       await this.resolveConfig()
       this.registerHooks()
     }
     
     async resolveConfig() {
       ...
       if (configPath && fs.existsSync(configPath)) {
         ...
         // 最后加上赋值
         this.config = configParams
       }else{
         ...
       }
       
     }
       
     // 注册钩子函数
     registerHooks() {
       log.verbose('解析hooks')
       // hooks 数据结构 [["int", function()],"success", function(){}]
       const { hooks } = this.config
       hooks.forEach((hook) => {
         const [key, fn] = hook
         if (key && fn && typeof key === 'string' && typeof fn === 'function') {
           const existHook = this.hooks[key]
           if (!existHook) {
             this.hooks[key] = []
           }
           this.hooks[key].push(fn)
         }
       })
       log.verbose('hooks', this.hooks)
     } 
   }
   module.exports = Service
   ```

3. 重新再`samples`终端内部运行命令`npm run dev:debug`，效果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a7c9f6171ee4706b4f0152d4446991b~tplv-k3u1fbpfcp-watermark.image?)

## 10: 实现自定义hooks的触发逻辑

1. 新建`service/const.js`文件，在这里定义所有的钩子类型，初步代码如下

   ```javascript
   const HOOK_START = 'start'
   
   module.exports = {
     HOOK_START,
   }
   ```

2. 修改`service/Service.js`文件，内容如下

   ```javascript
   const { HOOK_START } = require('./const')
   const HOOKSARR = [HOOK_START]
   
   class Service {
     ...
     async start() {
       await this.resolveConfig()
       this.registerHooks()
       // 在这里我们进行触发钩子函数
       this.emitHooks(HOOK_START)
     }
   	
     // 注册钩子函数中，我们过滤掉不符合定义钩子的 key
     registerHooks() {
       log.verbose('解析hooks')
       // hooks 数据结构 [["int", function()],"success", function(){}]
       const { hooks } = this.config
       hooks.forEach((hook) => {
         const [key, fn] = hook
         if (
           key &&
           HOOKSARR.indexOf(key) !== -1 && // 增加折行代码，过滤掉不属于我们定义的钩子
           fn &&
           typeof key === 'string' &&
           typeof fn === 'function'
         ) {
           const existHook = this.hooks[key]
           if (!existHook) {
             this.hooks[key] = []
           }
           this.hooks[key].push(fn)
         }
       })
       log.verbose('hooks', this.hooks)
     }
     // 触发钩子函数
     async emitHooks(key) {
       const hook = this.hooks[key]
       if (hook) {
         for (const fn of hook) {
           try {
             // 使用 for of 实现同步执行，并传入参数 this，根据自己需要来
             await fn(this)
           } catch (error) {
             log.error(error)
           }
         }
       }
     }
   }
   ```

3. 重新运行终端命令`npm run dev:debug`，内容如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e40457f919694fcf8ff2a3183beef9ae~tplv-k3u1fbpfcp-watermark.image?)

## 11: 高级特性：json 配置支持 function 传入

> 上小节中的配置文件类型是 .mjs, 内部可以直接使用 函数，可以是对于 json 配置文件呢？他应该是支持输入文件路径，如
>
> { "hooks": [[ "start", "xxx/xxx/文件1.js"], [ "start", "xxx/xxx/文件2.js"]] }
>
> 或者后面这个函数直接在 node_modules 中，这样写
>
> { "hooks": [[ "start", "文件1.js"], [ "start", "文件2.js"]] }

### json配置 hooks中加载非node_modules的文件

1. 修改`imooc-build.config.mjs`为`imooc-build.config.json`文件如下

   ```javascript
   {
     "entry": "./src/index.js",
     "plugins": [],
     "hooks": [
       [
         "start",
         "./plugins/start.hook.js"
       ],
       [
         "start",
         "./plugins/start.hook.second.mjs"
       ]
     ]
   }
   ```

2. 新建`plugins/start.hook.js`以及`plugins/start.hook.second.mjs`，内容如下

   ```javascript
   // start.hook.js
   module.exports = function startHookOne() {
     console.log('start-hooks-one')
   }
   // start.hook.second.mjs
   export default function startHookTwo() {
     console.log('start-hooks-two')
   }
   ```

3. 在`utils/index.js`中增加`loadMoudle`方法用来处理加载模块(包括是 json、js、mjs的处理),内容如下

   ```javascript
   const fs = require('fs')
   const path = require('path')
   
   async function loadMoudle(modulePath) {
     const configPath = path.isAbsolute(modulePath) ? modulePath : path.resolve(modulePath)
     if (fs.existsSync(configPath)) {
       const isJson = configPath.endsWith('.json')
       const isJs = configPath.endsWith('.js')
       const isMjs = configPath.endsWith('.mjs')
       let configParams = {}
       if (isJson) {
         configParams = require(configPath)
       } else if (isJs) {
         // 注意这里 使用了 require 方式加载，所以 js 中需要使用 cjs 标准
         configParams = require(configPath)
       } else if (isMjs) {
         // mjs 类型就代表内部使用了 esModule 标准
         configParams = (await import(configPath)).default
       }
       return configParams
     } else {
       return ''
     }
   }
   
   module.exports = { loadMoudle }
   ```

4. 修改`Service.js`中的代码,修改部分如下

   ```javascript
   const { loadMoudle } = require('../../utils')
   class Service {
     ...
     async start() {
       await this.resolveConfig()
       // 注册函数需要使用 同步，因为内部有使用 mjs 同步加载的可能
       await this.registerHooks()
       this.emitHooks(HOOK_START)
     }
     // 注册钩子函数
     async registerHooks() {
       log.verbose('解析hooks')
       const { hooks } = this.config
       // 修改 forEach 为 for...of
       for (const hook of hooks) {
         const [key, fn] = hook
         if ( key && HOOKSARR.indexOf(key) !== -1 && fn && typeof key === 'string') {
          	const existHook = this.hooks[key]
           if (!existHook) {
             this.hooks[key] = []
           }
           // 如果是函数类型，直接添加
           if (typeof fn === 'function') {
             this.hooks[key].push(fn)
           } else if (typeof fn === 'string') {
             // 如果是字符串类型，默认是一个文件路径，就需要进行加载调用
             this.hooks[key].push(await loadMoudle(fn))
           }
         }
       }
       log.verbose('hooks', this.hooks)
     }
   }
   
   module.exports = Service
   ```

5. `samples`终端重新运行`npm run dev:debug`,结果如下

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bedde8585ec44cf9f9f6fd6cb424d11~tplv-k3u1fbpfcp-watermark.image?)

### json配置 hooks中加载node_modules的文件

1. 修改`imooc-build.config.json`文件如下

   ```json
   {
     "entry": "./src/index.js",
     "plugins": [],
     "hooks": [
       [
         "start",
         "./plugins/start.hook.js"
       ],
       [
         "start",
         "./plugins/start.hook.second.mjs"
       ],
       [
         "start",
         "imooc-build-start-hook"
       ]
     ]
   }
   ```

2. 接着新建文件`samples/node_modules/imooc-build-start-hook/index.js`，内容如下

   ```javascript
   module.exports =  function startHookThree() {
     console.log('start-hooks-three')
   }
   ```

3. 此时如果执行终端，发现会报错

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa8e2bf846f84a95b03dcedc131d4cca~tplv-k3u1fbpfcp-watermark.image?)

4. 查看上图我们得知，最后一个`hooks`配置后获得是空字符串`""`,分析原因可知是如下代码的问题`utils/index.js`中的`loadModule`函数中，根据路径判断是否为绝对路径后，然后又判断了路径是否存在，如果把路径进行打印，更改如下

   ```javascript
   async function loadMoudle(modulePath) {
     const configPath = path.isAbsolute(modulePath) ? modulePath : path.resolve(modulePath)
     console.log('configPath', configPath) // 增加这一行
     ....
   }
   ```

5. 运行终端，可以看到如下结果（显然第三个路径代码路径与我们的`node_modules`下的文件路径不一致）

   ```bash
   configPath /Users/yuangao/Desktop/imooc-build/samples/plugins/start.hook.js
   configPath /Users/yuangao/Desktop/imooc-build/samples/plugins/start.hook.second.mjs
   configPath /Users/yuangao/Desktop/imooc-build/samples/imooc-build-start-hook // 显然这个文件路径下没有该文件
   ```

6. 这里我们要对`loadModule`函数进行处理

   ```javascript
   async function loadMoudle(modulePath) {
     // aaa.js ./src/aaa.js
     let configPath
     if (modulePath.indexOf('/') !== -1 || modulePath.indexOf('.') !== -1) {
       // 说明他是一个路径
       configPath = path.isAbsolute(modulePath) ? modulePath : path.resolve(modulePath)
     } else {
       // 它是一个包, 需要借助 require.resolve 来加载 运行命令目录下的 node_modules下的文件或者一层层往上找
       configPath = require.resolve(modulePath, {
         paths: [path.resolve(process.cwd())],
       })
     }
     console.log('configPath', configPath)
   }
   ```

7. 运行终端，可以看到如下结果（这里就加载成功了。钩子函数也执行成功）

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4700afd91ed7452fafe724a7a99dacd8~tplv-k3u1fbpfcp-watermark.image?)

8. 接着我们继续修改`imooc-build.config.json`文件如下（因为默认不值 .mjs 后缀，如果是 .mjs类型我们需要配置时加上）

   ```javascript
   {
     "entry": "./src/index.js",
     "plugins": [],
     "hooks": [
       [
         "start",
         "./plugins/start.hook.js"
       ],
       [
         "start",
         "./plugins/start.hook.second.mjs"
       ],
       [
         "start",
         "imooc-build-start-hook"
       ],
       [
         "start",
         "imooc-build-start-hook-second/index.mjs"
       ]
     ]
   }
   ```

9. 新建`samples/node_modules/imooc-build-start-hook-second/index.mjs`，内容如下

   ```javascript
   export default function startHookFour() {
     console.log('start-hooks-four')
   }
   ```

10. 这里我们要对`loadModule`函数进行处理（因为 `index.mjs` 中含有 `/`,但是他是一个包）,当然我觉得这里有很多种方法解决，需要根据具体的业务场景来进行处理，此处方案不一定是最好的

    ```javascript
    async function loadMoudle(modulePath) {
      // ./src/aaa.js
      let configPath
      // 如果文件路径不是以 / 或者 . 开头我就认为你是一个包
      if (modulePath.startsWith('/') || modulePath.startsWith('.')) {
        // 说明他是一个路径
        configPath = path.isAbsolute(modulePath)
          ? modulePath
          : path.resolve(modulePath)
      } else {
        // 它是一个包
        configPath = require.resolve(modulePath, {
          paths: [path.resolve(process.cwd())],
        })
      }
      console.log('configPath', configPath)
      ...
    }
    ```

11. 运行终端，可以看到如下结果（这里就加载成功了。钩子函数也执行成功）

    ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d4a64a500a34cee82a2da17fd1cf5bb~tplv-k3u1fbpfcp-watermark.image?)

## 12：模块加载问题修复和模块加载原理解析

### 参考文章

[node的路径解析require.resolve: https://juejin.cn/post/6844904055806885895](https://juejin.cn/post/6844904055806885895)

[Node.js模块路径解析方法: https://juejin.cn/post/7040728919967793160](https://juejin.cn/post/7040728919967793160)

> 见上节
>
> require.resolve：这里查找模块时，中间会调用 Module._resolveLookupPaths，如果为模块路径时，返回`parent.paths`，后续在这些模块文件夹里查找。

主要点是上一小节中的如下代码，使用`require.resolve`加载模块时候，重新指定目录

```javascript
configPath = require.resolve(modulePath, {
  paths: [path.resolve(process.cwd())],
})
```

## 13: 插件注册逻辑开发

对于插件逻辑，我们支持以下几种形式

* 数组形式：**[[xxx, { xx: xxx}], "xxx", ['xxx', function(){ }],  function(){ } ]**, 
  * 数组内部支持字符串形式，
  * 也支持数组形式：第一个参数是库包，第二个是一个对象配置参数
  * 也支持数组形式：第一个参数是字符串，第二个参数是函数
  * 也支持直接是一个参数形式
* 函数形式

### 支持字符串形式

1. 修改`samples/imooc-build.config.json`文件，增加`plugins`属性，增加代码如下

   ```json
   {
     "plugins": [
       "imooc-build-test"
     ],
   }
   ```

2. 在`samples/node_modules`文件夹下，新建`imooc-build-test/index.js`,内容如下

   ```javascript
   module.exports = function pluginFirst(){
     console.log("this is a imooc-build-test plugin")
   }
   ```

3. 在`service/Service.js`中增加**注册插件**和**执行插件**函数

   ```javascript
   class Service {
     constructor(opts) {
       ...
       // 增加插件属性
       this.plugins = []
     }
    	...
    
     async start(){
       await this.resolveConfig()
       await this.registerHooks()
       // 触发钩子函数使用 await 改为同步
       await this.emitHooks(HOOK_START)
       // 增加注册插件、运行插件函数
       await this.registerPlugin()
       await this.runPlugin()
     }
   
     // 注册插件
     // 支持的插件形式繁多
     // 1. 数组形式：[[xxx, { xx: xxx}], "xxx"]
     // 2. 也支持 前面是函数名，后面是具体的函数实现：[['xxx', function(){ }]]
     // 3. 就是一个函数 [ function(){ }, ]
     async registerPlugin() {
       const { plugins } = this.config
       if (plugins) {
         if (Array.isArray(plugins)) {
           for (const plugin of plugins) {
             // 这里先判断是字符串形式的情况下
             if (typeof plugin === 'string') {
               const module = await loadMoudle(plugin)
               this.plugins.push(module)
             }
           }
         }
       }
     }
   
     // 运行插件
     async runPlugin() {
       log.verbose('run plugins', this.plugins)
     }
   }
   ```

4. 运行终端，可以看到如下结果

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6eb424e9edd34aa2b0cf5b7021bce7ae~tplv-k3u1fbpfcp-watermark.image?)

### 支持字符串+入参形式

1. 修改`samples/imooc-build.config.json`文件，增加代码如下

   ```json
   {
     "plugins": [
       "imooc-build-test",
       // 增加数组形式的
       [
         "imooc-build-test-two",
         {
           "a": 1,
           "b": 2
         }
       ]
     ],  
   }
   ```

2. 新建`samples/node_modules/imooc-build-test-two/index.js`文件，内容如下

   ```javascript
   module.exports = function pluginTwo(){
     console.log("this is a imooc-build-two plugin")
   }
   ```

3. 在`service/Service.js`增加处理代码

   ```javascript
   class Service {
     
     async registerPlugin() {
       const { plugins } = this.config
       if (plugins) {
         if (Array.isArray(plugins)) {
           for (const plugin of plugins) {
             if (typeof plugin === 'string') {
               const module = await loadMoudle(plugin)
               // 这里我们修改为 对象形式
               this.plugins.push({ mod: module })
             } else if (Array.isArray(plugin)) {
               // 如果是数组形式，就进行解构，然后加载，添加
               const [pluginPath, pluginParams] = plugin
               const module = await loadMoudle(pluginPath)
               this.plugins.push({
                 mod: module,
                 params: pluginParams,
               })
             }
           }
         }
       }
     }
   }
   ```

4. 重新运行终端，可以看到如下结果

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/492a8a6c1ecf489fb0d28de18527ab93~tplv-k3u1fbpfcp-watermark.image?)

### 支持文件形式+（参数）

1. 修改`samples/imooc-build.config.json`文件，增加代码如下

   ```json
   {
     "plugins": [
       "imooc-build-test",
       [
         "imooc-build-test-two",
         {
           "a": 1,
           "b": 2
         }
       ],
      	// 这里我们增加一个文件
       "./plugins/imooc-build-plugin-one.js",
       // 然后在执行一个文件形式，+ 配置参数
       [
         "./plugins/imooc-build-plugin-one.js",
         {
           "a": 1,
           "b": 2,
           "c": 3
         }
       ]
     ],
   }
   ```

2. 新建`samples/plugins/imooc-build-plugin-one.js`文件，内容如下

   ```javascript
   module.exports = function startPluginFirst(params) {
     console.log('start-plugins-one', params)
   }
   ```

3. 其实目前的代码我们是支持这种形式的，运行终端，效果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15a7a7dad9744db7aeeddc36f3597df0~tplv-k3u1fbpfcp-watermark.image?)

### 支持函数形式

1. 这时候我们不能用`json`形式了，修改`samples/imooc-build.config.json`文件为`samples/imooc-build.config.mjs`，代码如下

   ```json
   const entry = 'src/index.js'
   import path from 'path'
   export default {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     plugins: [
       'imooc-build-test',
       [
         'imooc-build-test-two',
         {
           a: 1,
           b: 2,
         },
       ],
       './plugins/imooc-build-plugin-one.js',
       [
         './plugins/imooc-build-plugin-one.js',
         {
           a: 1,
           b: 2,
           c: 3,
         },
       ],
       // 注意注意：这里我们有一个函数形式的插件形式
       function pluginInner() {
         console.log('this is a plugin inner func')
       },
     ],
     hooks: [
       [
         'start',
         function () {
           console.log('start')
         },
       ],
     ],
   }
   ```

2. 修改`service/Service.js`文件内容，支持函数形式，代码如下

   ```javascript
   class Service {
     
     async registerPlugin() {
       const { plugins } = this.config
       if (plugins) {
         if (Array.isArray(plugins)) {
           for (const plugin of plugins) {
             if (typeof plugin === 'string') {
               
             } else if (Array.isArray(plugin)) {
               
             }else if (typeof plugin === 'function') {
               // 如果参数为函数，我们直接 push 即可
               this.plugins.push({ mod: plugin })
             }
           }
         }
       }
     }
   }
   ```

3. 重新运行终端命令，效果如下(可以看到函数形式的参数，我们也正常添加了)

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25b46529914149d691aa300142026d57~tplv-k3u1fbpfcp-watermark.image?)

## plugins 属性是一个函数形式

配置文件中的 plugins 属性返回一个数组，返回的数组参数形式跟上述形式一致

1. 修改`samples/imooc-build.config.mjs`,代码如下

   ```javascript
   const entry = 'src/index.js'
   import path from 'path'
   export default {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     // plugins 属性变为一个函数
     plugins: function () {
       return [
         'imooc-build-test',
         [
           'imooc-build-test-two',
           {
             a: 1,
             b: 2,
           },
         ],
         './plugins/imooc-build-plugin-one.js',
         [
           './plugins/imooc-build-plugin-one.js',
           {
             a: 1,
             b: 2,
             c: 3,
           },
         ],
         function pluginInner() {
           console.log('this is a plugin inner func')
         },
       ]
     },
     hooks: [
       [
         'start',
         function () {
           console.log('start')
         },
       ],
     ],
   }
   ```

2. 修改`service/Service.js`文件内容，支持函数形式，代码如下

   ```javascript
   class Service {
     
     async registerPlugin() 
     	// 这里 const 修改为 let
       let { plugins } = this.config
       if (plugins) {
         // 在最开始就行是否是函数判断
         if (typeof plugins === 'function') {
           // 如果是函数，就执行函数并返回
           plugins = plugins()
         }
         // 以下逻辑和之前一样不变
         if (Array.isArray(plugins)) {
           for (const plugin of plugins) {
             if (typeof plugin === 'string') {
               
             } else if (Array.isArray(plugin)) {
               
             }else if (typeof plugin === 'function') {
               
             }
           }
         }
       }
     }
   }
   ```

3. 重新运行终端，效果如下（可以看到正常运行）

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39d2c87e9c3148629c111612d150265b~tplv-k3u1fbpfcp-watermark.image?)

## 14：高级特性：webpack-chain详细讲解

> [webpack-chain npm文档地址: https://www.npmjs.com/package/webpack-chain](https://www.npmjs.com/package/webpack-chain)

我们经常使用的 **vue-cli** 中配置webpack 就有两种方式，一种是

* 简单的配置方式: [**configureWebpack 官方文档**](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)
  * 该对象将会被 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并入最终的 webpack 配置。
* 链式操作 (高级)：[点击打开：官方地址](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7)
  * `Vue CLI` 内部的 webpack 配置是通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 维护的。

1. 安装依赖库

   ```bash
   npm install webpack-chain -D
   ```

2. 修改`service/Service.js`中增加`webpack-chain`

   ```javascript
   const Config = require('webpack-chain')
   
   class Service {
     constructor(opts) {
       ...
       this.webpackConfig = new Config()
     }
     
     async start() {
       await this.resolveConfig()
       // 在解析配置项后，进行注册 webpack 配置
       await this.registerWebpackConfig()
       await this.registerHooks()
       await this.emitHooks(HOOK_START)
       await this.registerPlugin()
       await this.runPlugin()
     }
     
     // 注册webpack 配置
     registerWebpackConfig() {
       // entry: { inedx: "index.js" }
       this.webpackConfig
         .entry('index')
         .add('src/index.js')
         .end()
         .output.path('dist')
         .filename('[name].bundle.js')
       log.verbose('webpack config', this.webpackConfig.toConfig())
     }
   }
   
   module.exports = Service
   ```

3. 运行终端，可以看到如下效果（注意查看这里都是 webpack的配置相关，只不过它让我们可以用链式调用的方式来进行操作，方便了很多）

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54582fc4d1c541428d52a60ec42d538d~tplv-k3u1fbpfcp-watermark.image?)

4. 我们可以点击其中一个方法，比如`.entry`进入到内部查看它有哪些方式，如下图

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d08bf8d23c6f4276af4f734a0a4e4194~tplv-k3u1fbpfcp-watermark.image?)

5. 当然还有其他用法

   ```javascript
   const entry = this.webpackConfig.entry('index')
   // 清空所有的
   entry.clear()
   // entry 添加 src/main.js src/bundle.js
   entry.add('src/main.js').add('src/bundle.js')
   if (entry.has('src/main.js')) {
     entry.delete('src/main.js')
   }
   // entry 是一个 chainset 类型的解构，根据官网他还有以下方式：add(value)、prepend(value)、clear()、delete(value)、has(value)、values()、merge(arr)、batch(handler)、when(condition, whenTruthy, whenFalsy) 等
   ```

## 15：webpack-chain支持 loader 和 plugin

### 支持 loader

1. 修改`service/Service.js`，修改如下

   ```javascript
   class Service {
      registerWebpackConfig() {
       // entry: { inedx: "index.js" }
       this.webpackConfig
         .entry('index')
         .add('src/index.js')
         .end()
         .output.path('dist')
         .filename('[name].bundle.js')
       const entry = this.webpackConfig.entry('index')
       entry.clear()
       entry.add('src/main.js').add('src/bundle.js')
       if (entry.has('src/main.js')) {
         entry.delete('src/main.js')
       }
       // module 中 rule 添加处理 js 
       this.webpackConfig.module
         .rule('lint')
         .test('/.js$/')
         .include.add('src')
         .end()
         .exclude.add('node_modules')
         .end()
         .use('eslint')
         .loader('eslint-loader')
         .options({
           rules: {
             semi: 'off',
           },
       })
       log.verbose('webpack config', JSON.stringify(this.webpackConfig.toConfig(), null, 2),)
     }
   }
   ```

2. 此时运行终端，效果如下(这里我们就可以看到如下配置)

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bcee74b767c461f88779b3e49f7024d~tplv-k3u1fbpfcp-watermark.image?)

3. 这上面我们就添加了部分`loader`,我们还可以使用如下代码进行继续处理

   ```javascript
   const lintRule = this.webpackConfig.module.rule('lit') // 注意这个名字和前面一致
   lintRule.include.clear()
   lintRule.exclude.clear()
   lintRule.uses.clear()
   ```

### 支持 plugin

1. 修改`service/Service.js`，修改如下

   ```javascript
   class Service {
      registerWebpackConfig() {
       // entry: { inedx: "index.js" }
       this.webpackConfig
         .entry('index')
         .add('src/index.js')
         .end()
         .output.path('dist')
         .filename('[name].bundle.js')
       const entry = this.webpackConfig.entry('index')
       entry.clear()
       entry.add('src/main.js').add('src/bundle.js')
       if (entry.has('src/main.js')) {
         entry.delete('src/main.js')
       }
       this.webpackConfig.module
         .rule('lint')
         .test('/.js$/')
         .include.add('src')
         .end()
         .exclude.add('node_modules')
         .end()
         .use('eslint')
         .loader('eslint-loader')
         .options({
           rules: {
             semi: 'off',
           },
       })
       // 添加 plugin 处理,这里的包会实时加载判断，不能为假,否则会报错
      	this.webpackConfig.plugin('clean').use('webpack-chain', [{ root: '/dir' }])
       log.verbose('webpack config', this.webpackConfig.toConfig())
     }
   }
   ```

2. 重新运行终端，效果如下（其中的 **pluigins** 就是）

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bb9be4277314586ac9a66e6e71d3a70~tplv-k3u1fbpfcp-watermark.image?)

## 16：插件运行功能开发

1. 修改`service/Service.js`文件，内容如下

   ```javascript
   class Service {
     constructor(opts) {
       ...
       // 增加
   		this.internalValue = {}
     }
     
     ...
     // 运行插件
     async runPlugin() {
       for (const plugin of this.plugins) {
         const API = {
           getWebpackConfig: this.getWebpackConfig,
           emitHooks: this.emitHooks,
           setValue: this.setValue,
           getValue: this.getValue,
           log,
         }
         const { mod, params } = plugin
         if (!mod) {
           continue
         }
         const options = {
           ...params,
         }
         await mod(API, options)
       }
     }
   	
     // 获取配置
     getWebpackConfig() {
       return this.webpackConfig
     }
   
     setValue(key, value) {
       this.internalValue[key] = value
     }
   
     getValue(key) {
       return this.internalValue[key]
     }
   }
   ```

2. 记者我们修改配置文件中的插件运行时候的代码，因为插件函数接收了两个参数，

   ```javascript
   // /samples/imooc-build.config.mjs
   const entry = 'src/index.js'
   import path from 'path'
   export default {
     entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
     plugins: function () {
       return [
         'imooc-build-test',
         [ 'imooc-build-test-two', { a: 1, b: 2 } ],
         './plugins/imooc-build-plugin-one.js',
         [ './plugins/imooc-build-plugin-one.js', { a: 1, b: 2, c: 3, } ],
         // 增加参数
         function pluginInner(api, params) {
           console.log('this is a plugin inner func', api, params)
         },
       ]
     },
     hooks: [
       [ 'start', function () { console.log('start') } ],
     ],
   }
   
   // samples/plugins/imooc-build-plugin-one.js
   // 增加接受参数
   module.exports = function startPluginFirst(api, params) {
     console.log('start-plugins-one', api, params)
   }
   ```

3. 重新运行终端，效果如下

   ```bash
   gaoyuan@gaoyuandeMac samples % npm run dev:debug
   
   > samples@1.0.0 dev:debug
   > imooc-build start -d
   
   info 开始监听文件: /Users/gaoyuan/Documents/Code/learn/MyGithub/Vue-Related/imooc-build/samples/imooc-build.config.mjs 
   端口号8080可以使用
   verb 解析配置文件 { port: 8080, config: '' }
   info 解析配置文件 { port: 8080, config: '' }
   verb 解析hooks 
   verb hooks { start: [ [Function (anonymous)] ] }
   start
   this is a imooc-build-test plugin
   this is a imooc-build-two plugin
   start-plugins-one {...} {}
   start-plugins-one {
     chainWebpack: <ref *1> { ... } { a: 1, b: 2, c: 3 }
   ```

## 17：imooc-build插件实现 webpack 配置修改

接下来我们可以在某个插件中使用上一节传递的参数来修改 webpack 配置

1. 比如我们修改`samples/plugins/imooc-build-plugin-one.js`文件内容如下

   ```javascript
   module.exports = function startPluginFirst(api, params) {
     const { getWebpackConfig } = api
     const config = getWebpackConfig()
     config
       .entry('index2')
       .add('src/index2.js')
       .end()
       .output.filename('[name].bundle.js')
       .path('dist')
   }
   ```

2. 运行发现报错

   ```bash
   /Users/gaoyuan/Documents/Code/learn/MyGithub/Vue-Related/imooc-build/lib/service/Service.js:201
       return this.webpackConfig
                   ^
   
   TypeError: Cannot read properties of undefined (reading 'webpackConfig')
   ```

3. 经过梳理我们发现，实际调用函数时候，是在 `imooc-build-plugin-one.js`中，此时自然 `this` 就是 `undefined`,所以会报错

4. 知道了错误，我们对`Service.js`做如下更改

   ```javascript
   class Service {
     async start() {
       await this.resolveConfig()
       await this.registerWebpackConfig()
       await this.registerHooks()
       await this.emitHooks(HOOK_START)
       await this.registerPlugin()
       await this.runPlugin()
       console.log('查看最后的webpackConfig', this.webpackConfig.toConfig())
     }
     
      // 运行插件
     async runPlugin() {
       for (const plugin of this.plugins) {
         // 这里我们把各个方法通过 bind 来该表内部 this,
         // 也可以把各个方法改为 箭头函数。两种方式任选其一即可
         const API = {
           getWebpackConfig: this.getWebpackConfig.bind(this),
           emitHooks: this.emitHooks.bind(this),
           setValue: this.setValue.bind(this),
           getValue: this.getValue.bind(this),
           log,
         }
         ...
       }
     }
   }
   ```

5. 再次运行终端，得到如下效果

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed87395f813a4880a7a5eda5d14df462~tplv-k3u1fbpfcp-watermark.image?)

## 18: 插件间状态共享+自定义hook功能实现

### 插件间状态共享



