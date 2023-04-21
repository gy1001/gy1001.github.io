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

## 07： imooc-ls支持查询全部文件和列表渲染模式

> 下面实现第二种模式：ls -a 显示包含以.开头的隐藏文件
>
> gaoyuan@gaoyuandeMac bin % ls -a
>
> .		..		index.js	parseArgs.js

1. 修改`index.js`内容如下

   ```javascript
   let output = ''
   let files = fs.readdirSync(dir)
   if(!isAll && !isList){
     
   } else if (isAll && !isList) {
     files.forEach((file) => (output += file + '              '))
   }
   console.log(output)
   ```

2. 目前我们没有隐藏文件，可以新建一个`.prettierrc.json`，内容如下

   ```json
   {
     "singleQuote": true,
     "semi": false
   }
   ```

3. 再次执行以下命令，查看差异

   ```bash
   gaoyuan@gaoyuandeMac imooc-ls % ls   
   bin		package.json
   gaoyuan@gaoyuandeMac imooc-ls % ls -a
   .			.DS_Store		bin
   ..			.prettierrc.json	package.json
   
   
   gaoyuan@gaoyuandeMac imooc-ls % imooc-ls
   package.json              
   gaoyuan@gaoyuandeMac imooc-ls % imooc-ls -a
   .DS_Store              .prettierrc.json              bin              package.json              
   gaoyuan@gaoyuandeMac imooc-ls % 
   ```

> 接着我们来实现 ls -l 的功能
>
> gaoyuan@gaoyuandeMac imooc-ls % ls -l
>
> total 8
>
> drwxr-xr-x 4 gaoyuan staff 128 4 21 10:07 bin
>
> -rwxr-xr-x 1 gaoyuan staff 250 4 21 10:10 package.json

1. 对于目前`index.js`中的内容，我们可以做如下抽象优化，最终代码如下

   ```javascript
   const parse = require('./parseArgs.js')
   const { args, isAll, isList } = parse()
   const fs = require('fs')
   const dir = process.cwd()
   let output = ''
   let files = fs.readdirSync(dir)
   if (!isAll) {
     files = files.filter((file) => file.indexOf('.') > 0)
   }
   if (!isList) {
     files.forEach((file) => (output += file + '              '))
   } else {
     files.forEach((file, index) => {
       output += file + (index === files.length - 1 ? '' : '\n')
     })
   }
   
   console.log(output)
   ```

2. 再次执行以下命令，可以得到下面结果

   ```bash
   gaoyuan@gaoyuandeMac imooc-ls % imooc-ls -al
   .DS_Store
   .prettierrc.json
   bin
   package.json
   
   // 系统的
   gaoyuan@gaoyuandeMac imooc-ls % ls -al
   total 32
   drwxr-xr-x@  6 gaoyuan  staff   192  4 21 10:18 .
   drwx------@ 24 gaoyuan  staff   768  4 21 09:26 ..
   -rwxr-xr-x@  1 gaoyuan  staff  6148  4 21 10:16 .DS_Store
   -rw-r--r--   1 gaoyuan  staff    42  4 21 10:18 .prettierrc.json
   drwxr-xr-x   4 gaoyuan  staff   128  4 21 10:07 bin
   -rwxr-xr-x   1 gaoyuan  staff   250  4 21 10:10 package.json
   ```

3. 上述可以看到，我们系统`ls- al`和`imooc-ls -al`结果上还是有一定差异的

## 08: 深入讲解MacOS（含Linux）文件权限体系

推荐阅读

[鸟哥：Linux 的文件权限:https://zhuanlan.zhihu.com/p/64008541](https://zhuanlan.zhihu.com/p/64008541)

[Linux如何用二进制代表文件权限（不懂来砍我）:https://blog.csdn.net/weixin_44824500/article/details/109370750](https://blog.csdn.net/weixin_44824500/article/details/109370750)

> unix、Linux、MacOs 文件权限体系
>
> drwxr-xr-x   4 gaoyuan  staff   128  4 21 10:07 bin 这是 bin 目录的一个权限
>
> -rwxr-xr-x   1 gaoyuan  staff   250  4 21 10:10 package.json
>
> r: 访问 w: 编辑 x：执行
>
> u: 当前登录用户（user），g:当前登录用户所在分组(group)，o：其他分组/用户(other)
>
> drwxr-xr-- 2 root root 6 Mar 9 01:37 test
> \#讲解：第一个d是文件类型，后面9位3个为一组

![img](https://pic2.zhimg.com/80/v2-4939f396ef7ed364d6ba6c812accd941_720w.webp)

如：

```bash
-rwxr-xr-x   1 gaoyuan  staff   250  4 21 10:10 package.json
```

我们可以看到当前用户，有 rwx三个功能，执行以下操作可以加减权限

```bash
// 减去 当前用户的访问权限
gaoyuan@gaoyuandeMac imooc-ls % chmod -r package.json 
gaoyuan@gaoyuandeMac imooc-ls % ls -al
total 32
drwxr-xr-x@  6 gaoyuan  staff   192  4 21 10:18 .
drwx------@ 24 gaoyuan  staff   768  4 21 09:26 ..
-rwxr-xr-x@  1 gaoyuan  staff  6148  4 21 10:16 .DS_Store
-rw-r--r--   1 gaoyuan  staff    42  4 21 10:18 .prettierrc.json
drwxr-xr-x   4 gaoyuan  staff   128  4 21 10:07 bin
--wx--x--x   1 gaoyuan  staff   250  4 21 10:10 package.json

// 查看这个文件就会报错：权限不足
gaoyuan@gaoyuandeMac imooc-ls % cat package.json 
cat: package.json: Permission denied

// 增加阅读权限
gaoyuan@gaoyuandeMac imooc-ls % chmod +r package.json
gaoyuan@gaoyuandeMac imooc-ls % ls -al               
total 32
drwxr-xr-x@  6 gaoyuan  staff   192  4 21 10:18 .
drwx------@ 24 gaoyuan  staff   768  4 21 09:26 ..
-rwxr-xr-x@  1 gaoyuan  staff  6148  4 21 10:16 .DS_Store
-rw-r--r--   1 gaoyuan  staff    42  4 21 10:18 .prettierrc.json
drwxr-xr-x   4 gaoyuan  staff   128  4 21 10:07 bin
-rwxr-xr-x   1 gaoyuan  staff   250  4 21 10:10 package.json
// 执行查看文件，可以正常查看
gaoyuan@gaoyuandeMac imooc-ls % cat package.json 
```

那么`Node.js`如何获取文件类型和权限呢？

## 09：解析MacOS（含Linux）文件类型和权限存储原理

* Unix 使用 32位二进制数存储文件类型和权限
  * 在 UNIX 文件系统中，文件类型和权限被编码为一个 32 位的二进制数，其中前 16 位表示文件类型，后 16 位表示文件权限。下面是这个 32 位数的详细解释：
  * 文件类型：
    - 前 4 位（高位）表示文件类型，例如：普通文件、目录、符号链接等等。
    - 中间 12 位表示一些特定的文件类型和子类型，例如：字符设备、块设备、套接字等等。
    - 后 4 位（低位）保留。
  * 文件权限：
    - 前 9 位表示文件的访问权限，分别为读、写、执行权限，其中每一位为 1 表示允许该操作，为 0 表示禁止该操作。
    - 后 7 位表示其他一些特殊的权限标志，例如：设置用户 ID、设置组 ID、粘着位等等。

## 参考链接

[Linux文件系统详解:https://juejin.cn/post/6844903668504854535](https://juejin.cn/post/6844903668504854535)

## 10：应用fs.Stat的mode属性获取文件类型

1. 修改`index.js`文件内容如下

   ```javascript
   // index.js
   if (!isList) {
     
   }else {
     files.forEach((file, index) => {  
       // 增加这一行
       const stat = fs.statSync(file)
     	console.log(file, stat)
       ...
     })
   }
   ```

2. 我们重新运行`imooc-ls`试试，查看打印结果

   ```bash
   // 这里文件较多，我们只复制 package.json 的信息如下：
   package.json Stats {
     dev: 16777220,
     mode: 33261,
     nlink: 1,
     uid: 501,
     gid: 20,
     rdev: 0,
     blksize: 4096,
     ino: 12895078648,
     size: 250,
     blocks: 8,
     atimeMs: 1682043018304.4077,
     mtimeMs: 1682043017983.716,
     ctimeMs: 1682047502675.9448,
     birthtimeMs: 1682040419303.1807,
     atime: 2023-04-21T02:10:18.304Z,
     mtime: 2023-04-21T02:10:17.984Z,
     ctime: 2023-04-21T03:25:02.676Z,
     birthtime: 2023-04-21T01:26:59.303Z
   }
   ```

3. 这里我们着重关注其中的`mode`属性

   ```bash
   packages.json mode: 33261 转换为二近制数是：1000 0001 1110 1101
   bin mode: 16877 => 转换为二进制数是：0100 0001 1110 1101
   
   我们可以用 stat.isDirectory() 来进行判断是否是一个文件夹
   ```

4. 我们继续修改`index.js`,内容如下

   ```javascript
   // index.js
   if (!isList) {
     
   }else {
     files.forEach((file, index) => {  
       // 增加这一行
       const stat = fs.statSync(file)
       ...const mode = stat.mode
       const isDir = mode & fs.constants.S_IFDIR
       console.log(file, mode, stat.isDirectory(), isDir > 0, fs.constants.S_IFDIR)
       output += file + (index === files.length - 1 ? '' : '\n')
     })
   }
   ```

5. 再次执行`imoooc-ls -la`，结果如下

   ```bash
   gaoyuan@gaoyuandeMac imooc-ls % imooc-ls -la
   .DS_Store 33261 false false 16384
   .prettierrc.json 33188 false false 16384
   bin 16877 true true 16384
   package.json 33261 false false 16384
   ```

6. 这里稍微解释下 16384 这个值

   ```javascript
   16384 转换为二进制就是：0100 0000 0000 0000
   // 同样的还是有 isFile 判断
   const isFile = mode & fs.constants.S_IFREG
   
   fs.constants.S_IFREG: 32768 转换为二进制是：1000 0000 0000 0000
   ```

## 11： 使用与运算（&）获取文件权限

我们分析，

```javascript
packages.json mode: 33261 转换为二近制数是：1000 0001 1110 1101
bin mode: 16877 => 转换为二进制数是：0100 0001 1110 1101

packages.json 最后九位分为三组分别是：1000 000 111 101 101：（111 101 101）文件权限主要看后三组，那么分别对应rwx的能力那就是：rwx r-x r-x
同理，bin 对应的后三组是 111 101 101 rwx r-x r-x

我们在终端中执行 ls -la 查看结果：文件权限结果对应一致
drwxr-xr-x   4 gaoyuan  staff   128  4 21 10:07 bin
-rwxr-xr-x   1 gaoyuan  staff   250  4 21 10:10 package.json
```

那么，我们就可以根据以上原理在代码中增加响应逻辑，如下

1. 新建 `bin/getFileType.js`  文件，负责输出文件类型的字符串，内容如下

   ```javascript
   const fs = require('fs')
   module.exports = function getFileType(mode) {
     const isDirectory = mode & fs.constants.S_IFDIR
     const isFile = mode & fs.constants.S_IFREG
     const isLink = mode & fs.constants.S_IFLNK
   
     if (isDirectory) {
       return 'd'
     } else if (isFile) {
       return '-'
     } else if (isLink) {
       return 'l'
     }
   }
   ```

2. 新建`bin/auth.js`文件，负责输出文件权限相关字符串，内容如下

   ```javascript
   const fs = require('fs')
   // 这个函数根据 mode 获得 权限组
   module.exports = function auth(mode) {
     let authString = ''
     // 先判断 user 的权限 r w x
     const canUsrRead = mode & fs.constants.S_IRUSR
     const canUsrWrite = mode & fs.constants.S_IWUSR
     const canUsrExecute = mode & fs.constants.S_IXUSR
     canUsrRead ? (authString += 'r') : (authString += '-')
     canUsrWrite ? (authString += 'w') : (authString += '-')
     canUsrExecute ? (authString += 'x') : (authString += '-')
     // 接着判断 group 的权限 r w x
     const canGroupRead = mode & fs.constants.S_IRGRP
     const canGroupWrite = mode & fs.constants.S_IWGRP
     const canGroupExecute = mode & fs.constants.S_IXGRP
     canGroupRead ? (authString += 'r') : (authString += '-')
     canGroupWrite ? (authString += 'w') : (authString += '-')
     canGroupExecute ? (authString += 'x') : (authString += '-')
     // 接着判断 other 的权限 r w x
     const canOtherRead = mode & fs.constants.S_IROTH
     const canOtherWrite = mode & fs.constants.S_IWOTH
     const canOtherExecute = mode & fs.constants.S_IXOTH
     canOtherRead ? (authString += 'r') : (authString += '-')
     canOtherWrite ? (authString += 'w') : (authString += '-')
     canOtherExecute ? (authString += 'x') : (authString += '-')
     return authString
   }
   ```

3. `index.js`引入以上文件，最终结果如下

   ```javascript
   #!/usr/bin/env node
   const parse = require('./parseArgs.js')
   // 引入 auth、getFileType
   const auth = require('./auth.js')
   const getFileType = require('./getFileType.js')
   const { args, isAll, isList } = parse()
   const fs = require('fs')
   const dir = process.cwd()
   let output = ''
   let files = fs.readdirSync(dir)
   if (!isAll) {
     files = files.filter((file) => file.indexOf('.') > 0)
   }
   if (!isList) {
     files.forEach((file) => (output += file + '              '))
   } else {
     files.forEach((file, index) => {
       const stat = fs.statSync(file)
       const mode = stat.mode
       const authString = auth(mode)
       const fileType = getFileType(mode)
       output +=
         fileType +
         authString +
         '\t' +
         file +
         (index === files.length - 1 ? '' : '\n')
     })
   }
   
   console.log(output)
   ```

4. 回到终端中我们输入命令，可以得到以下结果

   ```bash
   // 先用 系统命令，得到如下结果，方便后续作对比
   gaoyuan@gaoyuandeMac imooc-ls % ls -la
   total 32
   drwxr-xr-x@  6 gaoyuan  staff   192  4 21 10:18 .
   drwx------@ 24 gaoyuan  staff   768  4 21 09:26 ..
   -rwxr-xr-x@  1 gaoyuan  staff  6148  4 21 10:16 .DS_Store
   -rw-r--r--   1 gaoyuan  staff    42  4 21 10:18 .prettierrc.json
   drwxr-xr-x   6 gaoyuan  staff   192  4 21 14:39 bin
   -rwxr-xr-x   1 gaoyuan  staff   250  4 21 10:10 package.json
   
   // 执行我们自己的命令
   gaoyuan@gaoyuandeMac imooc-ls % imooc-ls -la
   -rwxr-xr-x	.DS_Store
   -rw-r--r--	.prettierrc.json
   drwxr-xr-x	bin
   -rwxr-xr-x	package.json
   
   可以看到权限列表一一对应无误
   ```

## 12：应用id命令获取用户信息

1. 这里我们需要用到 `id` 这个命令

2. 我们可以在终端执行以下代码获取相关信息

   ```bash
   gaoyuan@gaoyuandeMac imooc-ls % which id
   /usr/bin/id
   
   gaoyuan@gaoyuandeMac imooc-ls % id 
   uid=501(gaoyuan) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserveradm),98(_lpadmin),33(_appstore),100(_lpoperator),204(_developer),250(_analyticsusers),395(com.apple.access_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh),400(com.apple.access_remote_ae),701(com.apple.sharepoint.group.1)
   
   gaoyuan@gaoyuandeMac imooc-ls % id -un 501
   gaoyuan
   
   gaoyuan@gaoyuandeMac imooc-ls % id -gn 501
   staff
   ```

3. 这里我们需要重新开一个进程开运行 `id` 命令以便获取用户名称等

4. 接着我们新建`bin/getFileUser.js`文件，内容如下

   ```javascript
   const cp = require('child_process')
   
   module.exports = function getFileUser(stat) {
     const { uid, gid } = stat
     const userName = cp
       .execSync('id -un ' + uid)
       .toString()
       .trim()
     const groupIdsStr = cp
       .execSync('id -G ' + uid)
       .toString()
       .trim()
     const groupIds = groupIdsStr.split(' ')
     const groupIdsNameStr = cp
       .execSync('id -Gn ' + uid)
       .toString()
       .trim()
   
     const groupIdsName = groupIdsNameStr.split(' ')
     const index = groupIds.findIndex((id) => +id === +gid)
     const groupName = groupIdsName[index]
   
     return userName + '\t' + groupName
   }
   ```

5. `index.js`中进行引用

   ```javascript
   #!/usr/bin/env node
   const parse = require('./parseArgs.js')
   const auth = require('./auth.js')
   const getFileType = require('./getFileType.js')
   // 引用 getFuleUser
   const getFileUser = require('./getFileUser.js')
   const { args, isAll, isList } = parse()
   const fs = require('fs')
   const dir = process.cwd()
   let output = ''
   let files = fs.readdirSync(dir)
   if (!isAll) {
     files = files.filter((file) => file.indexOf('.') > 0)
   }
   if (!isList) {
     files.forEach((file) => (output += file + '              '))
   } else {
     files.forEach((file, index) => {
       const stat = fs.statSync(file)
       const mode = stat.mode
       const authString = auth(mode)
       const fileType = getFileType(mode)
       // 获取 fileUser
       const fileUser = getFileUser(stat)
       output +=
         fileType +
         authString +
         '\t' +
         fileUser +
         '\t' +
         file +
         (index === files.length - 1 ? '' : '\n')
     })
   }
   
   console.log(output)
   ```

6. 打开终端执行命令,输入`imooc-ls -la`结果如下

   ```bash
   gaoyuan@gaoyuandeMac imooc-ls % imooc-ls -la
   -rwxr-xr-x	gaoyuan	staff	.DS_Store
   -rw-r--r--	gaoyuan	staff	.prettierrc.json
   drwxr-xr-x	gaoyuan	staff	bin
   -rwxr-xr-x	gaoyuan	staff	package.json
   ```





