# npm

> npm，全名 node package manger

- npm 是 Node 开放式模块登记和管理系统，是 Node.js 的标准发布平台，用于 Node.js 包的发布、传播、依赖控制，[npm 官网网址](https://www.npmjs.com/)
- npm 提供了命令行工具，可以方便的进行下载、安装、升级、删除包，也可以让你作为开发者发布并维护包

## 1. 如何安装

- npm 是随同 Nodejs 一期安装的包管理工具，所以你首先需要拥有 node 环境,

[Node.js 官网](https://nodejs.org/en/)

[Node.js 中文网](https://nodejs.org/zh-cn/)

点击下载安装 对应的包即可

## 2. 验证版本

打开终端，分别输入如下命令

```shell
// 查看当前 node 版本
node -v
// 查看当前 npm 版本
npm -v
```

本机测试如下图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cf871cbef4542a0a786ff65bfa5ca95~tplv-k3u1fbpfcp-watermark.image?)

## 3. 常用命令

> 注意：需要在终端中打开

### 3.1 项目初始化

```shell
npm init
```

> 输入命令后，按照提示一路输入项目相关的配置，如：项目名称，版本号，关键字，项目协议等后，最终会产生 package.json 文件，并记录下刚才输入的信息

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8017ecfe7f44031854ff23ea4e145be~tplv-k3u1fbpfcp-watermark.image?)

最终产生的 `package.json`文件如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6f70e5dcb964526b07fecaab59d6472~tplv-k3u1fbpfcp-watermark.image?)

### 3.2 安装依赖包

```shell
# 本地安装
npm install xxx
# 全局安装
$ sudo npm install -global <package name>
$ sudo npm install -g <package name>
# 强制重新安装
$ npm install <packageName> --force
# 如果你希望，所有模块都要强制重新安装，那就删除node_modules目录，重新执行npm install
$ rm -rf node_modules
$ npm install
# 也支持直接输入Github代码库地址
$ npm install git://github.com/package/path.git
$ npm install git://github.com/package/path.git#0.1.0
```

例如：我需要安装 express 可以使用如下命令

```shell
npm install express --save
```

安装后，项目中会产生一个 node_modules 文件夹，里面是从 npm 官网 下载复制了一份 express 的整体文件到本地

**注意：**
这里不同版本的 npm 使用不同的一个处理方式，这个后续我们会通过 和 yarn、pnpm 作比较时候细细道来,先有个初步了解
(**旧版本使用循环嵌套的处理，新版本做了一些扁平化的一些处理**)

1. 使用 如下版本安装

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/970b9f02cd134165a8709ff10ebe1b5e~tplv-k3u1fbpfcp-watermark.image?)

安装后的的 node_modules 包如下图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87c97f5d87b846a39ba06df2b7c53eed~tplv-k3u1fbpfcp-watermark.image?)

2. 使用 如下版本安装

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b36a184fa4648c3af15fb0c092ee79f~tplv-k3u1fbpfcp-watermark.image?)

安装后的的 node_modules 包如下图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce0af0ff100e4f8e944018fe92f74d92~tplv-k3u1fbpfcp-watermark.image?)

### 3.3 删除依赖包

删除后从 node_modules 中删除相关库文件，以及 package.json 中删除掉相关依赖项

```shell
$ npm uninstall [package name]

# 卸载全局模块
$ npm uninstall [package name] -global
```

### 3.4 更新依赖包

npm update 命令可以更新本地安装的模块

```shell
# 升级当前项目的指定模块
$ npm update [package name]
# 升级全局安装的模块
$ npm update -global [package name]
```

## 4. 其他命令

### 4.1 npm set 设置环境变量

```shell
npm set init-author-name 'Your name'
npm set init-author-email 'Your email'
npm set init-author-url 'http://yourdomain.com'
npm set init-license 'MIT'
```

上面命令等于为 npm init 设置了默认值，以后执行 npm init 的时候，package.json 的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的~/.npmrc 文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行 npm config。

```shell
npm set save-exact true
```

上面命令设置加入模块时，package.json 将记录模块的确切版本，而不是一个可选的版本范围。

### 4.2 npm info

> npm info 命令可以查看每个模块的具体信息

```shell
npm info underscore
npm info underscore description
npm info underscore homepage
npm info underscore version
```

### 4.3 npm search

npm search 命令用于搜索 npm 仓库，它后面可以跟字符串，也可以跟正则表达式

```shell
npm search <搜索词>
```

### 4.4 npm list

npm list 命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。

```shell
npm list
npm list -global
npm list vue
```

加上 global 参数，会列出全局安装的模块。

### 4.5 npm run

- npm 不仅可以用于模块管理，还可以用于执行脚本。package.json 文件有一个 scripts 字段，可以用于指定脚本命令，供 npm 直接调用。
- npm run 命令会自动在环境变量 $PATH 添加 node_modules/.bin 目录，所以 scripts 字段里面调用命令时不用加上路径，这就避免了全局安装 NPM 模块。
- npm run 如果不加任何参数，直接运行，会列出 package.json 里面所有可以执行的脚本命令。
- npm 内置了两个命令简写，npm test 等同于执行 npm run test，npm start 等同于执行 npm run start。

```json
// paackage.json 中的 script 脚本命令
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

## 5. 其他管理工具

### 5.1 npx

> npx 只是一个临时的使用方案。 npm5.2 之后产生的

- npx 和 script 一致可以帮我们直接运行 .bin 目录下的内容
- 如果.bin 目录下存在 会执行对应脚本，如果不存在会下载运行

### 5.2 nrm

> nrm(npm registry manager )是 npm 的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换

1. 安装命令

```shell
npm install nrm -g
```

2. nrm ls 查看可选的源

```shell
nrm ls
# 执行后结果如下，其中，带*的是当前使用的源，
* npm -------- https://registry.npmjs.org/
yarn ------- https://registry.yarnpkg.com/
cnpm ------- http://r.cnpmjs.org/
taobao ----- https://registry.npm.taobao.org/
nj --------- https://registry.nodejitsu.com/
npmMirror -- https://skimdb.npmjs.com/registry/
edunpm ----- http://registry.enpmjs.org/
```

3. nrm use 切换源

```shell
# 切换到taobao源
nrm use taobao
# 执行后会出现如下结果
Registry has been set to: https://registry.npm.taobao.org/
```

4. nrm add 增加定制的源
   > 你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 `nrm add registry url`，其中 reigstry 为源名，url 为源的路径。

```shell
# 比如增加公司的私有源，私服地址为：http://public.npmjs.gyinner/
# 可以执行如下命令
nrm add gy http://public.npmjs.gyinner/
# 在执行 nrm ls 后就可以在列表最后查看到最后添加的 gy 源
```

5. nrm del 删除源
   > 执行命令`nrm del registry`删除对应的源。

```shell
# 删除上述添加的 gy 源
nrm del gy
```

6. nrm test 测试源的速度

```shell
# 测试 npm 源的响应时间
nrm test npm
```

### 5.3 nvm

> nvm 全英文也叫 node.js version management，是一个 nodejs 的版本管理工具。nvm 和 n 都是 node.js 版本管理工具，为了解决 node.js 各种版本存在不兼容现象可以通过它可以**安装和切换不同版本的 node.js**。

[nvm 官网地址](https://nvm.uihtm.com/)

**目前推荐使用 n 模块来管理**

### 5.4 n 版本管理工具

1. 安装命令

```shell
npm install -g n
```

2. 查看已经安装的 node 版本列表

```shell
n ls
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad32c051eccb41dba0481c1517cb0b21~tplv-k3u1fbpfcp-watermark.image?)

3. 利用 n 下载所需版本的 node

```shell
# 下载最新版本
sudo n latest
# 下载指定版本
sudo n 版本号
# 下载最新稳定版
sudo n stable
```

4. 删除某个版本

```shell
n rm 10.24.0
```

5. 切换版本

```shell
sudo n
# 输入后会列举出已安装的所有版本，通过上下箭头可以进行选择，回车后确定选择
  node/10.11.0
ο node/12.14.0
  node/14.15.5
```

### 5.5 fnm: Fast Node Manager

无意间看到这个，看了一眼，没有仔细深入这个包管理工具，目前我倾向于使用 n 来管理版本。这个就作为延伸阅读

### 5.6 nvs: Node Version Switcher

同上

## 6. 关于依赖管理

### 6.1 dependencies 和 devDependencies

1. 假设我们有项目 a，其 package.json 结构如下：

```javascript
{
  "name": "a",
  "dependencies": {
    "b": "^1.0.0"
  },
  "devDependencies": {
    "c": "^1.0.0"
  }
}
```

2. a 的依赖 b 和 c 的依赖信息如下：

```javascript
// node_modules/b/package.json
{
  "name": "b",
  "dependencies": {
    "d": "^1.0.0"
  },
  "devDependencies": {
    "e": "^1.0.0"
  }
}
// node_modules/c/package.json
{
  "name": "c",
  "dependencies": {
    "f": "^1.0.0"
  },
  "devDependencies": {
    "g": "^1.0.0"
  }
}
```

3. 执行 npm install 后，a 的 node_modules 目录最终内容如下

```javascript
node_modules
├── b       // a 的 dependencies
├── c       // a 的 devDependencies
├── d       // b 的 dependencies
└── f       // c 的 dependencies
```

- 包管理器将以项目的 package.json 为起点，安装所有 dependencies 与 devDependencies 中声明的依赖。
- 但是对于这些一级依赖项具有的更深层级依赖，在深度遍历的过程中，只会安装 dependencies 中的依赖，忽略 devDependencies 中的依赖。
- 因此，b 和 c 的 devDependencies —— e 和 g 被忽略， 而它们的 dependencies —— d 和 f 被安装。

## 参考链接

[新一代包管理工具 pnpm 使用心得](https://zhuanlan.zhihu.com/p/546400909)

[npm 超详细教程](https://zhuanlan.zhihu.com/p/258080852)

[nrm 安装与配置](https://www.jianshu.com/p/94d084ce6834)

[管理 node 版本，选择 nvm 还是 n？](https://blog.csdn.net/G_eorge/article/details/51379347)

[node 版本管理选 n 还是 nvm？我选 fnm](https://juejin.cn/post/7080414800274489351)

[NVS —— js 实现的 node 版本管理工具](https://juejin.cn/post/6961679951925870623)

<CommentService />
