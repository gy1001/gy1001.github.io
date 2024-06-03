# pnpm
> pnpm - performant npm, 速度快、节省磁盘空间的软件包管理器,[pnpm官网地址](https://www.pnpm.cn/)
## 1. 特点（官网介绍）
* 快速：pnpm 是同类工具速度的将近 2 倍
* 高效：node_modules 中的所有文件均克隆或硬链接自单一存储位置
* 支持单体仓库：pnpm 内置了对单个源码仓库中包含多个软件包的支持
* 权限严格：pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问

**创建非扁平化的 node_module 目录**
![img](https://www.pnpm.cn/assets/images/node-modules-structure-8ab301ddaed3b7530858b233f5b3be57.jpg)

## 2. 安装 pnpm
```shell
# 通过 npm 安装 pnpm
npm install -g pnpm
# 通过 Homebrew 安装 pnpm
brew install pnpm
```

## 3. 常用命令
### 3.1 安装依赖包
```shell
pnpm add pkg # 保存到 dependencies 配置项下
pnpm add -D pkg # 保存到 dependencies 配置项下
pnpm add -O pkg # 保存到 optionalDependencies 配置项下
pnpm add -g pkg # 安装软件包到全局环境中
pnpm add pkg@next	# 安装标记为 next 的版本
pnpm add pkg@3.0.0 # 安装指定版本 3.0.0
```
### 3.2 安装所有依赖项
```shell
pnpm install
# 或者
pnpm i
pnpm i --offline	# Install offline from the store only
pnpm i --frozen-lockfile	# pnpm-lock.yaml is not updated
pnpm i --lockfile-only	# Only pnpm-lock.yaml is updated
```
### 3.3 更新依赖项
```shell
pnpm update
pnpm up	
```
### 3.4 删除依赖项
```shell
pnpm remove 
pnpm rm 
pnpm uninstall 
pnpm un

# 可以增加如下参数，代表不同的含义
--global: 从全局环境中删除指定的软件包。
--save-dev, -D: 仅删除 devDependencies 中列出的依赖包。
--save-optional, -O: 仅删除 optionalDependencies 中列出的依赖包。
--save-prod, -P: 仅删除 dependencies 中列出的依赖包。
--recursive, -r: 当在 workspace 下使用时，将从 workspace 下的每个软件包中删除指定的一个或多个依赖包。当不在 workspace 下使用时，将在 子目录下寻找所有软件包并删除指定的一个或多个依赖包。
```
### 3.5 运行脚本
```shell
pnpm run xxx
```
**其他的可以参考官方地址**
