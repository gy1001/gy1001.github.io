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

> 这里我们要使用到一个 commander 库，因为上一节中的脚手架参数获取方式不够灵活，实际开发很少会使用
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

## 03：脚手架框架之 subcommand 解析

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

   program.parse()
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

## 04：commander 框架帮助文档生成规则

> 1. 生成脚手架的帮助文档：imooc-build -h
> 2. 生成脚手架 command 的帮助文档：imooc-build split -h / imooc-build help split

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

## 05：commander options 基础特性解析

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

> 不过这里获取的是全局的参数，而不是 某一个 option 中的 options

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

##### getOptionValue

> getOptionVaue 可以获得某一个选项的值
>
> 注意：这里是针对全局参数的一个方法

1. 修改`build/imooc-build.js` 文件

   ```javascript
   ...
   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .option('-s, --separator <char>', 'separator char', ',')
   	.option("-e --extra", "extra for something")
     .action((args, options) => {
       console.log(program.getOptionValue('extra')) // 这里想通过 getOptionVaue 获得 extra 的值
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })

   program.parse()
   ...
   ```

2. 执行命令以及结果如下

   ```bash
   $ imooc-build split aaa -e
   undefined // 获取不到 split 内部的参数值
   ```

3. 修改`build/imooc-build.js` 文件

   ```javascript
   ...
   program
     .option('-d, --debug', 'output extra debugging')

   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .option('-s, --separator <char>', 'separator char', ',')
   	.option("-e --extra", "extra for something")
     .action((args, options) => {
       console.log(program.getOptionValue('debug')) // 这里想通过 getOptionValue 获得 debug 的值
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })

   program.parse()
   ...
   ```

4. 执行命令以及结果如下

   ```bash
   $ imooc-build split aaa -d
   true // 这里通过 getOptionValue 方法获得 debug 的值为 true
   ```

5. 那么我在`command("split")`中如何通过 `optsWithGlobals()`获取参数呢？

6. 继续修改`build/imooc-build.js`文件，内容如下

   ```javascript
   ...
   program
     .option('-d, --debug', 'output extra debugging')

   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .option('-s, --separator <char>', 'separator char', ',')
   	.option("-e --extra", "extra for something")
     .action((args, options) => {
       console.log(program.commands[0].optsWithGlobals())
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })

   program.parse()
   ...
   ```

7. 执行命令以及结果如下

   ```bash
   $  split aaa --first -s a -d
   { separator: 'a', first: true, debug: true }
   ```

8. 这里由于`program.commands[0]`太过死板，我们也可以如下操作，`action`回调支持第三个参数

   ```javascript
   ...
   program
     .option('-d, --debug', 'output extra debugging')

   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .option('-s, --separator <char>', 'separator char', ',')
   	.option("-e --extra", "extra for something")
     .action((args, options, cmd) => {
       console.log(cmd.optsWithGlobals())
     	console.log(cmd.opts())
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })
   program.parse()
   ...
   ```

9. 执行命令以及结果如下(结果与上一步骤一致)

   ```bash
   $ imooc-build split aaa --first -s a -d
   { separator: 'a', first: true, debug: true }
   { separator: 'a', first: true }
   ```

10. 总结

    - .opts: 获取当前实例的`options`,比如全局`program`获取全局`options`,`subcommand`获取局部`options`
    - .optsWithGloabls: 获取全部`options`,全局获取全局`options`,`subcommand`获取全局+局部`options`

## 06: commander options 高级特性解析

### 支持连写

1. 修改`bin/imooc-build.js`,内容如下

   ```javascript
   ...
   program.option('-d, --debug', 'output extra debugging')
   program
     .command('split')
     .description('Split string to array')
     .argument('<string>', 'string to split')
     .option('--first', 'display just the first substring')
     .option('-s, --separator <char>', 'separator char', ',')
     .option('-e --extra', 'extra for something')
   	.option('-a --add [string]', 'add something')
     .action((args, options, cmd) => {
       console.log(cmd.optsWithGlobals())
       const limit = options.first ? 1 : undefined
       console.log(args.split(options.separator, limit))
     })

   program.parse()
   ...
   ```

2. 运行命令及结果如下

   ```bash
   // 因为 program 定义了 -d command('split')后面还有 -e -a xxxoption，所以可以连写
   // 注意：由于 -a 后面有参数，所以要特别注意顺序，否则可能存在参数获取不是你想要的情况
   $ imooc-build split aaa  -dea aaa
   { separator: ',', extra: true, add: 'aaa', debug: true }
   ```

### option() 参数\<string\>与[string]的区别

> \<string\>表示参数必须, 不加参数时候，会进行报错提示，
>
> [string]表示参数可选，不加参数时候，获取参数类型变为布尔值

1. 在上面那个例子中 `split`后面参数是`<string>`，是必须得，而`option('-a --add [string]')`这里是可选的

2. 运行如下命令，以及结果如下

   ```bash
   $ imooc-build split aaa  -dea aaa // 这里 -a 后面有参数，根据打印获得的值是 aaa
   { separator: ',', extra: true, add: 'aaa', debug: true }
   $ imooc-build split aaa  -dea  // 这里 -a 后面没有参数，根据打印获得的值是 布尔值 true
   { separator: ',', extra: true, add: true, debug: true }
   ```

### option() 后面也支持默认值

1. 比如上面的示例代码中

   ```javascript
   ...
     .option('-s, --separator <char>', 'separator char', ',') // 这里 -s 后面必须有参数，而这里代了默认值
   ...
   ```

2. 运行命令以及相应结果如下

   ```bash
   $ imooc-build split aaa
   { separator: ',' } // 默认值
   $ imooc-build split aaa -s // 如果后面写了 -s 或者 --separator 后面就必须跟一个数
   error: option '-s, --separator <char>' argument missing
   $ imooc-build split aaa --separator // 如果后面写了 -s 或者 --separator 后面就必须跟一个数
   error: option '-s, --separator <char>' argument missing
   ```

### Required option：必须的 option

> 目前示例中的 option 均是可选的，就是不加也不会报错
>
> ```
> .requiredOption
> ```

1. 修改`bin/imooc-build.js`,增加代码如下

   ```javascript
   ...
   program.requiredOption('-c, --cheese <type>', 'pizza must have cheese')

   program.parse()
   ```

2. 运行命令及相应结果如下

   ```bash
   $ imooc-build split aaa
   error: required option '-c, --cheese <type>' not specified
   ```

3. 当前如果赋值了默认值，比如

   ```javascript
   ...
   program.requiredOption('-c, --cheese <type>', 'pizza must have cheese', "default-cheese")

   program.parse()
   ```

4. 运行命令以及相应结果如下

   ```bash
   $ imooc-build split aaa // 这里就不会报错
   ```

### Variadic option

> 可以通过 ... 支持多个参数, 隔断方式是 正常分割 或者 -- 或者紧挨着

1. 修改`bin/imooc-build.js`，结果如下

   ```javascript
   ...
   program
     .option('-n, --number <numbers...>', 'specify numbers')
     .option('-l, --letter [letters...]', 'specify letters')
   program.parse()

   console.log('Options: ', program.opts())
   console.log('Remaining arguments: ', program.args)
   ```

2. 运行如下命令及相应结果如下

   ```bash
   // 第一种方式：正常书写
   $ imooc-build -n 1 2 3 --letter a b c
   Options:  { number: [ '1', '2', '3' ], letter: [ 'a', 'b', 'c' ] }
   Remaining arguments:  []
   
   // 第二种方式: = 等于号
   $ imooc-build --letter=A -n80 operand
   Options:  { letter: [ 'A' ], number: [ '80' ] }
   Remaining arguments:  [ 'operand' ]
   
   // 第三种方式: -- 分割方式
   $ imooc-build --letter -n 1 -n 2 3 -- operand
   Options:  { letter: true, number: [ '1', '2', '3' ] }
   Remaining arguments:  [ 'operand' ]
   ```

## 07：高能：利用 Option 对象创建脚手架属性

### Version option

>  version 这个值通常会从 package.json 中进行读取

1. 我们修改`bind/imooc-build.js`，代码如下

   ```javascript
   const pkg = require('../package.json')
   const { Command } = require('commander')
   const program = new Command()
   program
     .name('imooc-build')
     .description('CLI to build javascript project')
     .version(pkg.version)
   
   ...
   program.parse()
   ```

2. 运行命令及效果如下

   ```bash
   $ imooc-build -V                           
   0.0.1
   ```

3. 另外，我们也可以对`version`进行定制`option`,目前默认是支持 `-V`,可以通过 `help`类查看

   >  默认是  -V, --version ， description 是： output the version number

   ```bash
   $ imooc-build help
   Usage: imooc-build [options] [command]
   
   CLI to build javascript project
   
   Options:
     -V, --version              output the version number
     -d, --debug                output extra debugging
     -c, --cheese <type>        pizza must have cheese (default:
                                "default-cheese")
     -n, --number <numbers...>  specify numbers
     -l, --letter [letters...]  specify letters
     -h, --help                 display help for command
   
   Commands:
     split [options] <string>   Split string to array
     help [command]             display help for command
   ```

4. 修改`bin/imooc-build.js`如下

   ```javascript
   const pkg = require('../package.json')
   const { Command } = require('commander')
   const program = new Command()
   program
     .name('imooc-build')
     .description('CLI to build javascript project')
     .version(pkg.version, "-v, --version", "optput your version")
   
   ...
   program.parse()
   ```

5. 再行运行`xxx help`,查看效果

   > 这里变为 -v --version  description 变为：optput your version

   ```bash
   $ imooc-build help
   Usage: imooc-build [options] [command]
   
   CLI to build javascript project
   
   Options:
     -v, --version              optput your version
     -d, --debug                output extra debugging
     -c, --cheese <type>        pizza must have cheese (default:
                                "default-cheese")
     -n, --number <numbers...>  specify numbers
     -l, --letter [letters...]  specify letters
     -h, --help                 display help for command
   
   Commands:
     split [options] <string>   Split string to array
     help [command]             display help for command
   ```

### More configuration

>  之前我们都是通过 .option() 来增加方法，但是某些场景下已经不能满足，这时候可以使用构造函数：Option

#### 可以通过 Option 构造函数来增加方法

1. 修改`bin/imooc-build.js`,代码如下

   ```javascript
   const { Command, Option } = require('commander')
   ...
   
   // 增加 -se --secret， 并且调用 hideHelp 来隐藏 help 时的描述信息
   program
     .command('test')
     .addOption(new Option('-m, --secret', 'secret something').hideHelp())
     .action((options, cmd) => { // 注意：这里的 actions 只有两个参数
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下(注意：command test 中没有提示语)

   ```bash
   $ imooc-build help      
   Usage: imooc-build [options] [command]
   
   CLI to build javascript project
   
   Options:
   	...
   
   Commands:
     split [options] <string>   Split string to array
     test [options]
     help [command]             display help for command
   ```

###  .default() 添加默认值

1. 修改`bin/imooc-build.js`,代码如下

   ```javascript
   const { Command, Option } = require('commander')
   ...
   
   // 使用.default来设置默认值，第一个值是默认值，第二个参数是对默认值的一个解释
   program
     .command('test')
     .addOption(new Option('-m, --secret', 'secret something').hideHelp())
   	.addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $  imooc-build test -h   
   Usage: imooc-build test [options]
   
   Options:
     -t, --timeout <delay>  timeout in seconds (default: one minute)
     -h, --help             display help for command
     
   $ imooc-build test help 
   { timeout: 60, cheese: 'default-cheese' }
   
   $ imooc-build test -t 10
   { timeout: '10', cheese: 'default-cheese' }
   ```

### .choices() 来提供选择项

1. 修改`bin/imooc-build.js`,代码如下

   ```javascript
   ...
   program
     .command('test')
     .addOption(new Option('-m, --secret [char]', 'secret something').hideHelp())
     .addOption(
       new Option('-t, --timeout <delay>', 'timeout in seconds').default(
         60,
         'one minute',
       ),
     )
   	.addOption(new Option('-f, --choose <size>', 'drink size').choices(['small', 'medium', 'large']))
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   program.parse()
   ```

2. 执行命令及相应结果如下(如果值不符合，就会报错提示)

   ```bash
   $ imooc-build test -f a
   error: option '-f, --choose <size>' argument 'a' is invalid. Allowed choices are small, medium, large.
   
   $ imooc-build test -f small
   { timeout: 60, choose: 'small', cheese: 'default-cheese' }
   ```

### .env() 来设置 port 等

1. 修改`bin/imooc-build.js`,代码如下

   ```javascript
   ...
   program
     .command('test')
     .addOption(new Option('-m, --secret [char]', 'secret something').hideHelp())
     .addOption(
       new Option('-t, --timeout <delay>', 'timeout in seconds').default(
         60,
         'one minute',
       ),
     )
   	.addOption(new Option('-f, --choose <size>', 'drink size').choices(['small', 'medium', 'large']))
     .addOption(new Option('-p, --port <number>', 'port number').env('PORT'))
   	.addOption(new Option('-j, --jtest <number>', 'just a test').env('TEST'))
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ imooc-build test -p 80
   { timeout: 60, port: '80', cheese: 'default-cheese' }
   
   // 还可以通过环境变量来获取
   $ PORT=80 imooc-build test 
   { timeout: 60, port: '80', cheese: 'default-cheese' }
   $ PORT=80 TEST=jest imooc-build test
   { timeout: 60, port: '80', jtest: 'jest', cheese: 'default-cheese' }
   ```

### .preset()和.argParser()

> .preset： 用于设置默认值，它的强大之处在于可以动态进行设置
>
> .argParser: 参数为函数，可以用这个函数格式化后的值返回作为最终结果

1. 修改`bin/imooc-build.js`,代码如下

   ```javascript
   ...
   program
     .command('test')
   	.addOption(new Option('--donate [amount]', 'optional donation in dollars').preset('20').argParser(parseFloat))
     .addOption(new Option('--color [color]', 'text color').preset(getDefaultColor())).argParser(parseFloat))
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $  imooc-build test  --donate
   { donate: 20 }
   $ imooc-build test  --donate 10
   { donate: 10 }
   $ imooc-build test --color     
   { color: 'green' }
   $ imooc-build test --color white
   { color: 'white' }
   ```

### .conflicts()

>  表示不能和 xxx 一起使用

1. 修改`bin/imooc-build.js`,代码如下

   ```javascript
   ...
   program
     .command('test')
     .addOption(new Option('-p, --port <number>', 'port number').env('PORT'))
     .addOption(
       new Option('--disable-server', 'disables the server').conflicts('port'),
     )
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ PORT=80 imooc-build test --disable-server
   error: option '--disable-server' cannot be used with environment variable 'PORT'
   $ imooc-build test --disable-server  
   { disableServer: true }
   $ imooc-build % imooc-build test --disable-server -p 80
   error: option '--disable-server' cannot be used with option '-p, --port <number>'
   ```

3. 这里还支持与多个 option 进行冲突，参数是一个字符串数组

4. 可以修改`bin/imooc-build.js`为如下代码

   ```javascript
   ...
   program
     .command('test')
     .addOption(new Option('-p, --port <number>', 'port number').env('PORT'))
     .addOption(new Option('-j, --jtest <number>', 'just a test').env('TEST'))
     .addOption(
       new Option('--disable-server', 'disables the server').conflicts(['port', 'jtest']),
     )
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

5. 执行命令及相应结果如下

   ```bash
   $ imooc-build test --disable-server -j 11
   error: option '--disable-server' cannot be used with option '-j, --jtest <number>'
   ```

### .implies()

> 暗示，意味着

1. 修改`bin/imooc-build.js`为如下代码

   ```javascript
   ...
   program
     .command('test')
     .addOption(new Option('--free-drink', 'small drink included free ').implies({ drink: 'small' }));
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ imooc-build test             
   {}
   $ imooc-build test --free-drink
   { freeDrink: true, drink: 'small' }
   ```

   

