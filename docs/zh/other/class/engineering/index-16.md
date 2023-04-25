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
     },
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
   
   // 增加全局参数 config，重启服务时候需要
   let configParams
   
   function runServer(args) {
     // 接收参数
     const { config } = args
     const srciprtPath = path.resolve(__dirname, './devService.js')
     // 运行脚本时也要增加参数
     configParams = ['--port 8080', '--config ' + config]
     child = cp.fork(srciprtPath, configParams)
     child.on('exit', (code) => {
       if (code) {
         process.exit(code)
       }
     })
   }
   
   function onChange(eventName, path) {
     child.kill()
     // 传入 configParams
     runServer(configParams)
   }
   
   module.exports = function startServer(args, opts, cmd) {
     console.log('start server')
     // 这里增加参数传入
     runServer(args)
     runWatcher()
   }
   ```

3. 接着修改`devService.js`文件，处理参数

   >  这里之前我们通过 **const** params = process.argv.slice(2) 来处理参数，并最终放在了 paramObj 中

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

2. 
