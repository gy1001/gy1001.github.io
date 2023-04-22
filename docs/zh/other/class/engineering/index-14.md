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


## 03：脚手架框架之subcommand解析

1. 修改`bin/imooc-build.js`为以下内容

   ```javascript
   #!/usr/bin/env node
   // const { program } = require('commander')
   // program.option('--first').option('-s, --separator <char>')
   // program.parse()
   // const options = program.opts()
   // const limit = options.first ? 1 : undefined
   // console.log(program.args)
   // console.log(program.args[0].split(options.separator, limit))
   
   const { Command } = require('commander')
   const program = new Command()
   program
     .name('imooc-build')
     .description('CLI to build javascript project')
     .version('0.0.1')
   program.parse()
   ```

2. 然后我们打开终端，执行命令：可以发现目前这个脚本已经具有了`-h(其实就是--help)`以及`-V(其实就是--version)`的命令

   ```bash
   yuangao at yuandeMac-mini in ~/Desktop/imooc-build 
   $ imooc-build -h
   Usage: imooc-build [options]
   
   CLI to build javascript project
   
   Options:
     -V, --version  output the version number
     -h, --help     display help for command
   $ imooc-build --help
   Usage: imooc-build [options]
   
   CLI to build javascript project
   
   Options:
     -V, --version  output the version number
     -h, --help     display help for command
   
   
   $ imooc-build -V
   0.0.1
   $ imooc-build --version
   0.0.1
   ```

3. 继续修改`bin/imooc-build.js`，内容如下

   ```javascript
   #!/usr/bin/env node
   const { Command } = require('commander')
   const program = new Command()
   program
     .name('imooc-build')
     .description('CLI to build javascript project')
     .version('0.0.1')
   program.parse()
   
   // 增加如下内容
   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .options('-s, --separator <char>', 'separator char', ',')
     .action((args, options) => {
       console.log('args', args)
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })
   ```

4. 然后我们打开终端，执行命令，结果如下

   ```bash
   $ imooc-build split --separator=/ a/b/c --first
   args a/b/c { separator: '/', first: true } // 这里打印的是 args
   [ 'a' ] // split hou 后的参数
   
   $ imooc-build split --separator=/ a/b/c // 这里没有增加 --fist 参数
   args a/b/c { separator: '/' }
   [ 'a', 'b', 'c' ]
   
   $ imooc-build split -s=/ a/b/c         
   args a/b/c { separator: '=/' } // 注意这里 separator 参数略有不同
   [ 'a/b/c' ]
   
   $ imooc-build split --separator / a/b/c        
   args a/b/c { separator: '/' }
   [ 'a', 'b', 'c' ]
   
   $ imooc-build split -s /  a/b/c        
   args a/b/c { separator: '/' }
   [ 'a', 'b', 'c' ]
   ```

## 04：commander框架帮助文档生成规则

> 1. 生成脚手架的帮助文档：imooc-build -h
> 2. 生成脚手架command的帮助文档：imooc-build split -h / imooc-build help split

执行命令，可以看到如下结果

```bash
$ imooc-build -h
Usage: imooc-build [options] [command]

CLI to build javascript project

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  split [options] <string>  Split string to array
  help [command]   

$ imooc-build split -h
Usage: imooc-build split [options] <string>

Split string to array

Arguments:
  string                  string to split

Options:
  --first                 display just the first substring
  -s, --separator <char>  separator char (default: ",")
  -h, --help              display help for command
  
$ imooc-build help split
结果同上
```

## 05：commander options基础特性解析

### options 的四种定义方式

1. `options`有四种定义方式

   ```bash
   -s <char>
   -s<char>
   --separator <char>
   --separator=<char>
   ```

2. 通常情况下，`options type`的值可以是 boolean 也可以是 字符串

   > 如上面的 --first 最终获得的就是 布尔值
   >
   > -s --separator \<char\> 获得值就是一个字符串

### 通过 program.opts() 获取 options

1. `const options = program.opts();`获取`options`

> 不过这里获取的是全局的参数，而不是 某一个option 中的 options

2. 比如在`bin/imooc-build.js`最后加入以下几句

```javascript
...
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

program.parse()
const options = program.opts()
console.log("options", options)
```

3. 我们运行如下命令，查看效果

   ```bash
   $ imooc-build -d -s -p pizza split aaa --first
   options { debug: true, small: true, pizzaType: 'pizza' } // 这里打印的 options 并没有包含 split 的 options
   // split 是一个 command 它包含的 --first 和 -s 的 options 需要在 其内部接收
   ```

### `.optsWithGlobals()` returns merged local and global option values

> 通过 .optsWithGlobals() 可以获取全局的 options
>
> 它可以写在全局外面，也可以写在某一个 command 内部

1. 我们在`bin/imooc-build.js`后面加入以下几句

   ```javascript
   program.parse()
   const options = program.opts()
   console.log('options', options)
   // 新增加
   const globalOptions = program.optsWithGlobals()
   console.log('globalOptions', globalOptions)
   ```

2. 再次执行命令，效果如下(可以看到此时`globalOptions`和 上一步中的`options`结果一样)

   ```bash
   yuangao at yuandeMac-mini in ~/Desktop/imooc-build 
   $ imooc-build -d -s -p pizza split aaa --first
   options { debug: true, small: true, pizzaType: 'pizza' }
   globalOptions { debug: true, small: true, pizzaType: 'pizza' }
   ```

3. 接下来我们在`command('split')`的`action`对应的函数里面进行如上获取呢？

4. 修改`bin/imooc-build.js`中的代码，如下

   ```javascript
   const { Command } = require('commander')
   const program = new Command()
   program
     .name('imooc-build')
     .description('CLI to build javascript project')
     .version('0.0.1')
   
   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .option('-s, --separator <char>', 'separator char', ',')
     .action((args, options) => {
     	// 这里分别获取 options 和 globalOptions 
       const p_options = program.opts()
   		console.log('p_options', p_options)
   		const globalOptions = program.optsWithGlobals()
   		console.log('globalOptions', globalOptions)
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })
   
   program
     .option('-d, --debug', 'output extra debugging')
     .option('-s, --small', 'small pizza size')
     .option('-p, --pizza-type <type>', 'flavour of pizza')
   
   program.parse()
   ```

5. 我们继续执行在终端中执行命令，查看结果:（这里看到结果也是一样的）

   ```bash
   yuangao at yuandeMac-mini in ~/Desktop/imooc-build 
   $ imooc-build split aaa -d -s -p ppp 
   p_options { debug: true, small: true, pizzaType: 'ppp' }
   globalOptions { debug: true, small: true, pizzaType: 'ppp' }
   ```

### `.getOptionValue()` and `.setOptionValue()` work with a single option value

