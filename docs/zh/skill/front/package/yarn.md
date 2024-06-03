# yarn 
> Yarn 是一个软件包管理器，还可以作为项目管理工具。无论你是小型项目还是大型单体仓库（monorepos），无论是业余爱好者还是企业用户，Yarn 都能满足你的需求。
## 1. 如何安装
```shell 
npm install -g yarn
```
## 2. 更新到最新版本 
```shell
# 安装到最新版本
yarn set version latest
# 安装到最新稳定版本
yarn set version stable
```
## 3. 常见命令
### 3.1 项目初始化
```shell 
# 显示命令列表
yarn help

# 初始化一个项目
yarn init
```
### 3.2 安装依赖包
```shell
# 安装所有依赖项
yarn 
yarn install

# 添加相关依赖
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```
### 3.3 删除依赖包
```shell
yarn remove [package]
```
### 3.4 更新依赖包
```shell
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]
```
### 3.5 更新 Yarn 本体
```javascript
yarn set version latest
yarn set version from sources
```
## 4. 其他
### 4.1 yarn config set registry http:xxxx 报错
```shell
Usage Error: Couldn't find a configuration settings named "registry"
```
原因是，本机的yarn 版本为3.2.2，高于2.x版本已废除registy关键字。 猜想可能是在新版本中此配置项改名了，使用yarn config列出配置项：
![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64e1961020804626b6fd94a2607aa987~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

试图用新版本配置名称修改代理源
```shell
yarn config set npmRegistryServer https://registry.npm.taobao.org

➤ YN0000: Successfully set npmRegistryServer to 'https://registry.npm.taobao.org'
```