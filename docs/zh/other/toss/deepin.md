# deepin 系统折腾笔记

## 1. 安装 node

### 1.1. 遇到的问题

使用系统自带命令安装的是老版本的 node 不能满足需求

### 1.2. 解决方法

1. 执行命令 `sudo vim /etc/apt/sources.list.d/nodesource.list`,
   写入以下内容(这里安装的是 14 版本，可以修改安装更高版本)

```txt
deb https://deb.nodesource.com/node_14.x buster main
# deb-src https://deb.nodesource.com/node_14.x buster main
```

2. 然后添加官方 key，就可以直接安装了(执行以下命令)。

```shell
curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
sudo apt update
sudo apt install nodejs
```

3. 查看版本，即可看到版本是 14

```shell
node -v
```

4. 安装 n 模块进行版本切换管理

```shell
sudo npm install n -g
```

5. 安装 yarn 包管理工具

```shell
sudo npm install yarn
```

参考地址
[在 Deepin 20.2 下安装 NodeJS](https://note.qidong.name/2021/05/deepin-install-nodejs/)
