# 13-通关：前端工程化脚手架设计

## 01: 为什么需要前端工程化脚手架？

### 背景

思考下面几个问题

- 前端项目为什么需要使用脚手架

  - 提供：创建项目、项目运行、项目框架、项目打包、项目发布等一系列能力，提升研发效率，简化复杂流程
  - 如果我们没有脚手架时怎么使用 vue？
    - 创建项目：拷贝或者下载项目模板 VS **交互式项目创建**（询问自主选择）
    - 项目运行和打包：编写 webpack 配置、启动和启动脚本 VS **项目脚手架自动启动和打包命令**
    - 项目框架：手动完成 VUe 全家桶引入和框架搭建 VS **自动生成框架模板代码**

- Vue-Cli 和 CRA（Create-React-App）有什么局限

  - 只能解决本技术域的问题，不同技术域就需要生产不同的脚手架

- 如果解决大前端团队底层工程链路的统一问题

  - 技术栈

    ```mermaid
    graph LR;
    大前端 --> APP--> ReactNative
    大前端 --> 小程序--> Taro
    大前端 --> Web
    大前端 --> 组件库

    Web --> 移动端 --> Technology
    Web --> PC端 --> Technology

    组件库 --> Technology

     subgraph Technology
        Vue
        React
       end
    ```

  - 需要生产统一的工程化脚手架，解决项目创建、运行、打包、项目模板代码等问题

    ```mermaid
    graph LR;
       大前端-->project
       subgraph project
         APP
         小程序
         Web
         组件库
       end
        project--> imooc-cli
        project--> imooc-build
      subgraph imooc-cli
        项目创建
        项目发布
       end
       subgraph imooc-build
        项目启动
        项目打包
       end
    ```

## 02：深入脚手架的实现原理

### 什么是脚手架

- 操作系统的可执行文件，可以通过 `C、C++、Java、JavaScript（Node.js）、Python、Ruby` 等各种语言编写

### 脚手架执行流程

1. 人工输入：`vue create vue-test-app `

2. 在环境变量 `$path`中查询 `vue` 命令（相当于执行`which vue`）

3. 查询实际链接文件

4. 通过`/usr/bin/env node` 执行文件

   ```javascript
   #!/usr/bin/env node
   ```

这里需要理解几个基本概念

- 环境变量（相当于操作系统级别的全局变量）
- 软连接（相当于 windows 系统的快捷方式）
- 这里：`vue、which、env、node`本质都是脚手架

### 脚手架的执行原理如下

1. 在终端中输入`vue create vue-test-app`
2. 终端解析出`vue`命令
3. 终端在环境变量中找到`vue`命令
4. 终端根据`vue`命令连接到实际文件`vue.js`
5. 终端利用`node`执行`vue.js`
6. `vue.js`解析`commmand/options`
7. `vue.js`执行`command`
8. 执行完毕，退出执行

## 03：脚手架开发流程介绍

### 脚手架开发流程

- 创建`npm`项目

- 创建脚手架入口文件，最上方添加

  ```bash
  #!/usr/bin/env node
  //（如果是 python 环境，node 改为 python 即可）
  ```

- 配置`package.json`，添加`bin`属性

- 编写脚手架代码

- 将脚手架发布到`npm`

### 脚手架开发实例

- `imooc-ls`文件浏览器
- `imooc-ls`信息打印

## 04: 快速搭建脚手架和脚手架本地调试方法

1. 创建文件夹`imooc-ls`

2. 执行初始化命令

   ```bash
   npm init -y
   ```

3. 在`package.json`中增加`bin`属性

   ```javascript
   {
     "bin": {
       "imooc-ls": "./bin/index.js"
     }
   }
   ```

4. 创建`bin/index.js`文件，内容如下

   ```javascript
   #!/usr/bin/env node
   console.log('hello')
   ```

5. 我们此时执行`node bin/index.js`执行结果

   ```bash
   hello
   ```

6. 我们此时如果执行以下命令呢？

   ```bash
   ./bin/index.js
   ```

7. 结果如下

   ```bash
   $ ./bin/index.js
   zsh: permission denied: ./bin/index.js
   ```

8. 此时执行命令

   ```bash
   npm link
   ```

9. 创建成功后，我们可以进入

   ```bash
   执行 which node
   得到：/usr/local/bin/node
   再次执行 cd /usr/local/bin
   得到 xx xxx xxx
   再次执行 ll
   就可以看到当前目录的链接，可以找到 imooc-ls

   imooc-ls -> ../lib/node_modules/imooc-ls/bin/index.js
   ```

10. 如果想删除这个链接

    ```bash
    npm unlikn imooc-ls -g
    // 可能需要 sudo 命令
    ```

## 05：脚手架参数解析方法封装 1

> 比如 vue create hello-test，vue 命令后面有两个参数，那么我们该如何获取呢？

1. 我们可以通过以下方式进行获取`process.argv`

2. 我们修改`bin/index.js`文件如下

   ```javascript
   #!/usr/bin/env node
   console.log(process.argv)
   ```

3. 我们执行`imooc-ls`,获取结果如下

   ```bash
   $ imooc-ls
   [ '/usr/local/bin/node', '/usr/local/bin/imooc-ls' ] // 输出结果
   $ imooc-ls -a -l
   [ '/usr/local/bin/node', '/usr/local/bin/imooc-ls', '-a', '-l' ] // 输出结果
   ```

4. 我们继续修改`bin/index.js`,修改如下

   ```javascript
   #!/usr/bin/env node
   let isAll = false // 对应 -a
   let isList = false // 对应 -l
   const args = process.argv.slice(2)
   args.forEach((arg) => {
     if (arg.indexOf('a') >= 0) {
       isAll = true
     }

     if (arg.indexOf('l') >= 0) {
       isList = true
     }
   })

   console.log(args, isAll, isList)
   ```

5. 这样我们执行以下过程，均可以获得相应的值

   ```bash
   $ imooc-ls -al
   [ '-al' ] true true

   $ imooc-ls -l -a
   [ '-l', '-a' ] true true

   $ imooc-ls -l
   [ '-l' ] false true
   ```

6. 然后我们把这段代码封装为一个函数，以供扩展使用，新建`parseArgs.js`文件

   ```javascript
   module.exports = function parse() {
     let isAll = false // 对应 -a
     let isList = false // 对应 -l
     const args = process.argv.slice(2)
     args.forEach((arg) => {
       if (arg.indexOf('a') >= 0) {
         isAll = true
       }

       if (arg.indexOf('l') >= 0) {
         isList = true
       }
     })
     return {
       args,
       isAll,
       isList,
     }
   }
   ```

7. 修改`index.js`如下

   ```javascript
   #!/usr/bin/env node
   const parse = require('./parseArgs.js')
   const { args, isAll, isList } = parse()
   console.log(args, isAll, isList)
   ```

8. 再次执行以下命令，结果如常

   ```bash
   $ imooc-ls -al
   [ '-al' ] true true

   $ imooc-ls -l -a
   [ '-l', '-a' ] true true

   $ imooc-ls -l
   [ '-l' ] false true
   ```

## 06: imooc-ls 脚手架遍历文件功能实现

1. 修改`index.js`内容如下

   ```javascript
   #!/usr/bin/env node
   const parse = require('./parseArgs.js')
   const fs = require('fs') // 引入 fs 模块
   const { args, isAll, isList } = parse()
   const dir = process.cwd()

   console.log(args, isAll, isList)
   // 增加以下内容
   if (!isAll && !isList) {
     const files = fs.readdirSync(dir)
     console.log(files)
   }
   ```

2. 此时在`imooc-ls`文件夹中执行`imooc-ls`就会出现以下内容

   ```bash
   yuangao at yuandeMac-mini in ~/Desktop/imooc-ls  // 这是所在目录
   $ imooc-ls // 执行这个命令
   [] false false // 得到的打印结果 console.log(args, isAll, isList)
   [ 'bin', 'package-lock.json', 'package.json' ] // 得到的打印结果  console.log(files)
   ```

3. 继续修改`index.js`过滤掉，以.开头的隐藏文件

   ```javascript
   #!/usr/bin/env node
   const parse = require('./parseArgs.js')
   const fs = require('fs') // 引入 fs 模块
   const { args, isAll, isList } = parse()
   const dir = process.cwd()

   console.log(args, isAll, isList)
   // 增加以下内容
   if (!isAll && !isList) {
     //  遍历当前文件夹下的所有文件（这里并没有判断它是文件还是文件夹，后续会处理，并排除以.开头的文件或者文件夹）
     let files = fs.readdirSync(dir)
     files = files.filter((file) => file.indexOf('.') > 0)
     let output = ''
     files.forEach((file) => (output += file + '              '))
     console.log(output)
   }
   ```

4. 再次执行命令,我们就实现了和`ls`一样的效果，如下

   ```bash
   yuangao at yuandeMac-mini in ~/Desktop/imooc-ls
   $ ls
   bin               package-lock.json package.json

   yuangao at yuandeMac-mini in ~/Desktop/imooc-ls
   $ imooc-ls
   package-lock.json              package.json
   ```
