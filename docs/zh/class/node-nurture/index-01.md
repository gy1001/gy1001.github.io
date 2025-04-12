# 01-Node 脚手架篇 - 打造自己的脚手架工具

## 01：自定义脚手架概述

### 什么是脚手架

* 全局命令行工具
* 具有创建项目初始化代码文件及目录的能力

### 脚手架的基本能力有哪些

* 全局命令行执行能力
* 命令行交互能力
* 项目初始化代码下载能力

### 如何实现一个自己的脚手架工具

* 创建自定义全局命令
* 命令参数接受处理
* 终端交互
* 下载远程项目代码
* 项目初始化完成提示

## 02: 创建自定义全局指令

### 新建本地软连`gy-cli-server`

新建文件夹 Node-Cli，并在新建文件 bin/index.js, 内容如下

```javascript
#! /usr/bin/env node
console.log('hello i am node-cli')
```

此时执行`npm init` 进行项目初始化后，生成的`package.json`内容如下（多增加 bin 相关的属性配置）

```json
{
  "name": "node-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "node-cli": "bin/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

修改上述`bin` 属性为如下

```json
	"bin": {
    "gy-cli-server": "bin/index.js"
  }
```

此时执行 `npm link` 后进行本地挂载软软连接, 成功后，在终端中执行命令`gy-cli-server` 就可以看到如下打印信息

```js
hello i am node-cli // bin/index.js 中的内容打印
```

### 如何获得命令行参数呢？

修改`bin/index.js` 内容如下

```javascript
#! /usr/bin/env node
console.log(process.argv)
```

再次执行脚本命令`gy-cli-server --help`，得到的打印结果如下

```javascript
$ gy-cli-server  --help
[ '/usr/local/bin/node', '/usr/local/bin/gy-cli-server', '--help' ] // 如下打印结果
// 第一个结果是使用的什么脚本
// 第二个结果是使用的脚本文件所在目录
// 第三个结果是使用脚本的命令行参数
```

所以我们修改代码如下来获取并处理命令行参数

```javascript
#! /usr/bin/env node
if(process.argv[2]=='--help'){
  console.log("这里获取的 --help命令行参数")
}
```

## 03：使用commander处理help选项

> 上一节中我们可以使用 `process.argv[2]` 来获取命令行参数，并进行逻辑处理，但是略显麻烦，我们可以使用目前已经成熟的方案库：commander

### 安装 依赖库

```bash
npm install commander --save-dev
```

修改`bin/index.js`代码如下

```javascript
#! /usr/bin/env node
const {program} = require("commander")

program.parse(process.argv); // 解析参数
```

此时再次终端中再次执行脚本命令`gy-cli-server --help`，得到的打印结果如下(默认会把 --help 选项参数写好)

```bash
$ gy-cli-server --help
Usage: gy-cli-server [options]
Options:
  -h, --help  display help for command
```

### 如何增加其他参数选项？？？

```javascript
#! /usr/bin/env node
const {program} = require("commander")
program
  .option("-d, --debug", "是否开启调试模式", true)
  .option('-e, --envName <envName>', '获取环境变量名称') // 创建 envName 命令
  .parse(process.argv); // 解析参数
```

此时再次终端中再次执行脚本命令，得到的打印结果如下

```bash
$ gy-cli-server --help
Usage: gy-cli-server [options]

Options:
  -d, --debug              是否开启调试模式 (default: true)
  -e, --envName <envName>  获取环境变量名称
  -h, --help               display help for command
  
$ gy-cli-server -d false
$ gy-cli-server --debug
$ gy-cli-server -e development
$ gy-cli-server --envName development
```

## 04: commander 处理自定义指令选项

修改`bin/index.js`代码如下

```javascript
#! /usr/bin/env node

const {program} = require("commander")

program
  .option("-d, --debug", "是否开启调试模式", true)
  .option('-e, --envName <envName>', '获取环境变量名称') // 创建 envName 命令

// 创建 create 命令
program
  .command("create <project> [other...]")
  .alias("crt") // 别名
  .description("创建项目")
  .action((project, other) => {
    console.log(project, other)
  })

program.parse(process.argv); // 解析参数
```

以上代码，创建了一个 create 的 command 命令

```bash
$ gy-cli-server create myDemo xxx
myDemo [ 'xxx' ]

$ gy-cli-server create myDemo a1 a2 
myDemo [ 'a1', 'a2' ]
```

## 05：逻辑代码模块化拆分

上一节中我们使用了 command 和 option 选项来实现各种命令以及参数，如果选项太多会造成逻辑复杂，需要进行逻辑代码上的拆分，方便后续优化

新建文件`lib/help.js`内容如下

```javascript
const myHelp = function (program) {
  program
    .option('-d, --debug', '是否开启调试模式', true)
    .option('-e, --envName <envName>', '获取环境变量名称') // 创建 envName 命令
}

module.exports = { myHelp }
```

新建`lib/commander.js`内容如下

```javascript
const { createAction } = require('./action')
const createCommander = function (program) {
  // 创建 create 命令
  program
    .command('create <project> [other...]')
    .alias('crt') // 别名
    .description('创建项目')
    .action(createAction)
}

module.exports = { createCommander }
```

新建`lib/action.js`内容如下

```javascript
const createAction = (project, other) => {
  console.log(project, other)
}

module.exports = {
  createAction
}
```

这样我们就对以上逻辑进行了拆分抽离

修改主入口文件`bin/index.js` 内容如下

```javascript
#! /usr/bin/env node
const { program } = require('commander')
const { myHelp } = require('../lib/help')
const { createCommander } = require('../lib/commander')
myHelp(program)
createCommander(program)

program.parse(process.argv) // 解析参数
```

在终端中运行命令，结果不变

```bash
$ gy-cli-server --help
Usage: gy-cli-server [options] [command]

Options:
  -d, --debug                      是否开启调试模式 (default: true)
  -e, --envName <envName>          获取环境变量名称
  -h, --help                       display help for command

Commands:
  create|crt <project> [other...]  创建项目
  help [command]                   display help for command
  
$ gy-cli-server create myDemo a1 a2
myDemo [ 'a1', 'a2' ]

$ gy-cli-server create myDemo xxx
myDemo [ 'xxx' ]
```

## 06: 命令行问答交互 inquirer

> 比如使用 npm init 命令后，会根据一定的提示以及用户输入来进行初始化
>
> 使用的npm 库为 inquirer

安装命令

```bash
// 注意 Inquirer v9 and higher are native esm modules
npm install --save inquirer@^8.0.0
```

我们修改 action.js 文件，内容如下

```javascript
const inquirer = require('inquirer')
const { framework } = require('../config')
const createAction = (project, other) => {
  // console.log(project, other)
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'framework',
        choices: framework,
        message: '请选择你要使用的框架',
      },
    ])
    .then((answers) => {
      console.log('then', answers)
    })
    .catch((error) => {
      console.log('catch', error)
    })
}

module.exports = {
  createAction,
}
```

这里我们把相关的配置信息，统一存放在 config.js 文件中，内容如下

```javascript
module.exports = {
  framework: ['express', 'koa', 'egg'],
}
```

此时执行终端命令，结果如下

```bash
$ gy-cli-server create myDemo
```

效果如下: (选择列表可以通过上下箭头来进行选择)

```bash
? 请选择你要使用的框架 (Use arrow keys)
❯ express 
  koa 
  egg 
```

点击确定按钮后，结果如下

```bash
then { framework: 'express' }
```

## 07: 下载远程仓库模板代码 download-git-repo

> 下载仓库地址：[https://gitee.com/beiyaoyaoyao](https://gitee.com/beiyaoyaoyao)
>
> 上述仓库下分别对应三个不同选择对应的模板代码

安装依赖库

```bash
npm install download-git-repo --save
```

测试文件 download.js

```javascript
const download = require('download-git-repo')
// 第一个参数// 第一个参数空下载链接
// 第二个参数：保存的本地文件目录
// 第三个参数：克隆等配置
// 第四个参数：回调函数
download(
  'direct:https://gitee.com/beiyaoyaoyao/egg-template.git',
  './dist',
  { clone: true },
  function (err) {
    if (err) console.log(err)
  },
)
```

在终端中执行命令`node download.js` 就可以进行下载，就可以看到本地文件目录内多了个一个 dist 目录，其中就是下载的文件模板

根据上一节的后续，我们可以得知，我们要根据用户选择的框架去下载不同的仓库模板，

修改配置文件`config.js`，内容如下

```javascript
module.exports = {
  framework: ['express', 'koa', 'egg'],
  frameworkUrl: {
    express: 'https://gitee.com/beiyaoyaoyao/express-template.git',
    koa: 'https://gitee.com/beiyaoyaoyao/koa-template.git',
    egg: 'https://gitee.com/beiyaoyaoyao/egg-template.git',
  },
}
```

新增文件`lib/download.js`,内容如下

```javascript
const download = require('download-git-repo')
const downloadFunc = function (url, dest) {
  download(url, dest, { clone: true }, (err) => {
    if (err) console.log(err)
  })
}

module.exports = {
  downloadFunc,
}
```

在`action.js` 中进行引入

```javascript
const inquirer = require('inquirer')
const { framework, frameworkUrl } = require('../config')
const { downloadFunc } = require('./download')

const createAction = (project, other) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'framework',
        choices: framework,
        message: '请选择你要使用的框架',
      },
    ])
    .then((answers) => {
      const url = frameworkUrl[answers.framework]
      downloadFunc('direct:' + url, project)
    })
    .catch((error) => {
      console.log('catch', error)
    })
}

module.exports = {
  createAction,
}
```

这样我们就可以在终端中根据交互获得用户选择的框架下载对应的仓库模板。

这里有个小问题：下载时候是没有任何提示的，也就是一直等待中，是不是可以做成普遍框架下载时候的圈圈动画，以及有相应的提示语呢？

## 08：下载等待提示交互 ora

> 命令行任务等待工具 ORA

安装命令

```bash 
npm install ora 
// 注意：从 6.0 以后开始使用了ES Module 方式进行引入，使用require 方式引入的话可以使用最近的 5.4.1

npm install ora@5.4.1
```

### 测试代码

新建`test/ora.js`，内容如下

```javascript
// ora 的使用方式
const ora = require('ora')

const spinner = ora('正在下载模板...')

spinner.text = '这是一条提示信息'
spinner.start()

setTimeout(() => {
  spinner.succeed('下载完成')
  // spinner.fail('下载失败')
  // spinner.info('下载中...')
}, 3000)
```

使用命令`node test/ora.js` 运行结果如下

```bash
$ node ora.js
⠋ 这是一条提示信息 // 一条信息转圈并显示
// 3s 后输出
下载完成
```

### 正式代码演示

修改`lib/download.js`，内容如下

```javascript
const download = require('download-git-repo')
const ora = require('ora')
const downloadFunc = function (url, dest) {
  const spinner = ora('正在下载模板...')
  spinner.start()
  download(url, dest, { clone: true }, (err) => {
    if (err) {
      spinner.fail('下载失败')
      return
    }
    spinner.succeed('下载完成')
    console.log(`请使用 cd ${dest} 进入项目`)
    console.log('并使用 npm install 或 yarn 安装依赖')
    console.log('然后使用 npm run dev 或 yarn dev 启动项目')
  })
}

module.exports = {
  downloadFunc,
}
```

修改后运行终端，重新执行脚本`gy-cli-server create myDemo` 我们就可以看到在下载时就会有：转圈圈提示语：正在下载模板...

下载完成后，提示下载完成并由相关帮助语，进行启动项目

小Tips: 最后的提示语我们使用了 console.log 打印出来是白色，有没有办法变成五彩的或者指定的颜色的

## 09：命令行样式渲染工具 chalk

> Chalk 5 is ESM. If you want to use Chalk with TypeScript or a build tool, you will probably want to use Chalk 4 for now. [Read more.](https://github.com/chalk/chalk/releases/tag/v5.0.0)

这里我们要使用 require 方式进行引入

安装方式如下

```bash
npm install chalk@4
```

### 测试代码

新建`test/chalk.js` 内容如下

```javascript
const chalk = require('chalk')
console.log(chalk.green('Hello'))
console.log(chalk.red('Hello'))
console.log(chalk.rgb(123, 45, 67)('内容'))
console.log(chalk.bold('加粗内容'))
console.log(chalk.rgb(123, 45, 67).underline('内容'))
```

执行脚本`node chalk.js`后，效果如下

![image-20240221160318186](./assets/image-20240221160318186.png)

### 结合项目代码

修改`lib/download.js`,代码如下

```javascript
const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk') // 引入 chalk 方式
const downloadFunc = function (url, dest) {
  const spinner = ora('正在下载模板...')
  spinner.start()
  download(url, dest, { clone: true }, (err) => {
    if (err) {
      spinner.fail('下载失败')
      return
    }
    spinner.succeed('下载完成')
    console.log(chalk.blue(`请使用 cd ${dest} 进入项目`)) // 使用 chalk 方式改变字体样式
    console.log('并使用 npm install 或 yarn 安装依赖')
    console.log('然后使用 npm run dev 或 yarn dev 启动项目')
  })
}

module.exports = {
  downloadFunc,
}
```

## 10：总结：如何实现一个自己的脚手架工具

1. 创建自定义全局命令
2. 命令参数接受处理
3. 终端交互
4. 下载远程项目代码
5. 项目初始化完成提示
