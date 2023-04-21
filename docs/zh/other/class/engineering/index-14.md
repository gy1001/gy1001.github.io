# 14-工程化脚手架：进阶实战——深入脚手架框架 Commander+脚手架框架搭建

## 01: 脚手架框架

1. 创建文件夹`imooc-build`

2. 执行初始化命令

   ```bash
   npm init -y
   ```

3. 修改`package.json`文件内容，如下

   ```json
   {
     "name": "imooc-build",
     "version": "0.0.1",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "bin": {
       "imooc-build": "./bin/imooc-build.js"
     }
   }
   ```

4. 新建`bin/imooc-build.js`文件，内容如下

   ```javascript
   #!/usr/bin/env node
   console.log('imooc-build')
   ```

5. 执行以下命令创建本地连接

   ```bash
   sudo npm link 
   ```

6. 再次执行`imooc-build`可以看到如下内容

   ```bash
   yuangao at yuandeMac-mini in /usr/local/bin 
   $ imooc-build
   imooc-build
   ```

## 02: 脚手架框架之框架搭建+参数解析

>  这里我们要使用到一个 commander 库，因为上一节中的脚手架参数获取方式不够灵活，实际开发很少会使用
>
> [comander:npm 官方文档](https://www.npmjs.com/package/commander)

1. 安装`commander`库

   ```bash
   npm install commander -D
   ```

2. 修改`bin/imooc-build.js`文件，内容如下

   ```javascript
   #!/usr/bin/env node
   const { program } = require('commander')
   program.option('--first').option('-s, --separator <char>') // 主持 --fist -s或者 --separator char参数
   program.parse()
   const options = program.opts()
   console.log(options)
   ```

3. 运行以下命令，结果如下

   ```bash
   $ imooc-build --first -s
   error: option '-s, --separator <char>' argument missing // -s 后面必须需要参数
   yuangao at yuandeMac-mini in ~/Desktop/imooc-build 
   $ imooc-build --first -s test
   { first: true, separator: 'test' }  // 输出 options 参数
   $ imooc-build -s --separator 
   { separator: '--separator' }
   $ imooc-build --separator -s 
   { separator: '-s' }     // -s  --seperator 是一样的效果，且后面的是前面的参数
   ```

4. 继续按照官方实例，修改`bin/imooc-build.js`文件

   ```javascript
   #!/usr/bin/env node
   const { program } = require('commander')
   program.option('--first').option('-s, --separator <char>')
   program.parse()
   const options = program.opts()
   // 分割参数的个数
   const limit = options.first ? 1 : undefined
   console.log(program.args)
   console.log(program.args[0].split(options.separator, limit))
   ```

5. 运行以下命令，结果如下

   ```bash
   yuangao at yuandeMac-mini in ~/Desktop/imooc-build 
   $ imooc-build -s / --first a/b/c  
   [ 'a/b/c' ] // program.args 的值
   [ 'a' ]
   上述命令可以解释为：以 / 为参数 分割 /a/b/c 截取1个数
   
   $ imooc-build --fitst a/b/c -s /
   error: unknown option '--fitst'
   (Did you mean --first?)
   这里脚手架会帮助我们匹配最接近的命令参数，并进行提示
   ```

   
