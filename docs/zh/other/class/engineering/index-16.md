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

imooc-build(path2,right)->register_build->watch_build->is_build

is_start(yes)->start_pc(path1, left)->register_config_change->watch_config_change
watch_config_change(yes)->kill_pc_restart
watch_config_change(no)->watch_config_change

start_pc(path2, right)->parse_params->get_port->check_port


check_port(no)->use_port->new_service(path1,right)->start_service->parse_config->parse_plugins->plugins_run->hooks_run
hooks_run->create_chainwebpack_config->new_webpack_compiler->new_webpack_dev_server->start_server
new_service(path2,bottom)->create_config->create_utils
check_port(yes)->is_use_new_port
is_use_new_port(yes)->add_port->check_port
is_use_new_port(no)->end
```

## 02: 重要：工程化脚手架核心服务架构设计

如上
