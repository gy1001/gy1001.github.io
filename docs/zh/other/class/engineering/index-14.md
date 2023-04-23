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

## 08: 自定义 Option 处理函数

>  这个允许我们对传入的 option 参数做自定义处理

1. 修改`bin/imooc-build.js`为如下代码

   ```javascript
   ...
   program
     .command('custom')
     .option('-f --float <number>', 'float number')
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ imooc-build custom -f 1.2
   { float: '1.2' }
   ```

3. 增加第三个参数格式化函数

   ```javascript
   ...
   program
     .command('custom')
     .option('-f --float <number>', 'float number', parseFloat)
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   program.parse()
   ```

4. 执行命令及相应结果如下

   ```bash
   $ imooc-build custom -f 1.2
   { float: 1.2 }
   ```

5. 当然也可以传入自定义函数来进行格式化处理

   ```javascript
   const { InvalidArgumentError } = require('commander')
   ...
   
   function myParseInt(value) {
     const intValue = parseInt(value)
     if (isNaN(intValue)) {
       throw new InvalidArgumentError('it is not a int number')
     }
     return intValue
   }
   program
     .command('custom')
     .option('-f --float <number>', 'float number', parseFloat)
   	.option('-i --int <number>', 'int number', myParseInt)
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   program.parse()
   ```

6. 执行命令及相应结果如下

   ```bash
   $ imooc-build custom -i a  
   error: option '-i --int <number>' argument 'a' is invalid. it is not a int number
   $ imooc-build custom -i 100.1
   { int: 100 }
   ```

## 09: 高级特性：Option参数叠加处理

> option 支持四个参数，
>
> 第一个是 命令参数形式
>
> 第二个是 命令描述
>
> 第三个是处理函数，
>
> 第四个是默认初始值，也就是处理函数中 第二个参数 previous的值

1. 修改代码如下

   ```javascript
   ...
   
   function increaseVerbosity(dummyValue, previous) {
     dummyValue = +dummyValue || 0
     return previous + 1 + dummyValue
   }
   program
     .command('custom')
     .option(
       '--verbose <number>',
       'verbosity that can be increased',
       increaseVerbosity,
       0,
     )
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ imooc-build custom --verbose 10
   { verbose: 11 }
   $ imooc-build custom --verbose 10 --verbose 20 --verbose 40
   { verbose: 73 }
   ```

3. 再来看一个相似的例子

   ```javascript
   ...
   function collect(value, previous) {
     return previous.concat([value])
   }
   
   function increaseVerbosity(dummyValue, previous) {
     dummyValue = +dummyValue || 0
     return previous + 1 + dummyValue
   }
   
   program
     .command('custom')
   	.option(
       '--verbose <number>',
       'verbosity that can be increased',
       increaseVerbosity,
       0,
     )
     .option('-c, --collect <value>', 'repeatable value', collect, [])
     .action((options, cmd) => {
       console.log(cmd.optsWithGlobals())
     })
   program.parse()
   ```

4. 执行命令及相应结果如下

   ```bash
   $ imooc-build custom -c 1 -c 2 -c 4
   { collect: [ '1', '2', '4' ], verbose: 0 }
   ```

## 10: Command基本用法解析

### 直接在 .command()第一个参数中定义名字和参数

```typescript
// 用法结构
export **interface** CommandOptions {
  hidden?: boolean; // 表示可以在 help 中进行隐藏
  isDefault?: boolean; // 如果为 true，login 这个命令在终端调用时可以隐藏
  */*** **@deprecated** *since v7, replaced by hidden \*/*
  noHelp?: boolean;
}
.command(nameAndArgs: string, opts?: CommandOptions)
```

1. 修改代码如下

   ```javascript
   ...
   
   program
     .command('login <username> [pasword]')
     .option('-f --force', 'just a stand by here')
     // 如果不输入 password，这个password 位置也会占位
     // 并且 command login 后面定义多少个参数，这里就有多少个位置占用
     .action((username, password, options, cmd) => {
       console.log(username, password, options, cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ login root root123 
   root root123 {} {}
   $ imooc-build login root root123 -f
   root root123 { force: true } { force: true }
   $ imooc-build login root -f  
   root undefined { force: true } { force: true } 
   ```

3. 当然 command 后面还支持第二个参数

   ```javascript
   ...
   
   program
     .command('login <username> [pasword]',  { hidden: true, isDefault: true })
     .option('-f --force', 'just a stand by here')
     // 如果不输入 password，这个password 位置也会占位
     // 并且 command login 后面定义多少个参数，这里就有多少个位置占用
     .action((username, password, options, cmd) => {
       console.log(username, password, options, cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

4. 执行命令及相应结果如下

   ```bash
   $ imooc-build  root root123 -f
   root root123 { force: true } { force: true }
   ```

### 通过.argument()来定义参数

> 使用 .argument() 来定义参数
>
> 优点：可以设置 description 在 help 中进行解释、也可以设置默认值

1. 修改代码如下

   ```javascript
   ...
   program
     .command('login', { hidden: true, isDefault: true })
     .argument('<usernam>', 'it is our username')
     .argument('[password]', 'your password', 'default password')
     .option('-f --force', 'just a stand by here')
     .action((username, password, options, cmd) => {
       console.log(username, password, options, cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```javascript
   // 在help 中显示自定义 description
   $ imooc-build help login     
   Usage: imooc-build login [options] <usernam> [password]
   
   Arguments:
     usernam     it is our username
     password    your password (default: "default password")
   
   Options:
     -f --force  just a stand by here
     -h, --help  display help for command
     
   // 参数获取跟上一小节一样
   $ imooc-build  root root123 -f
   root root123 { force: true } { force: true }
   
   // 还支持默认值
   $ imooc-build  root  -f       
   root default password { force: true } { force: true }
   ```

3. 还支持一次性传入多个值

   ```javascript
   ...
   program
     .command('login', { hidden: true, isDefault: true })
     .argument('<usernam>', 'it is our username')
     .argument('[password]', 'your password', 'default password')
   	// 支持一次性传入多个，并且内部会有处理
     .argument('<dir...>', 'dir list')
     .option('-f --force', 'just a stand by here')
     .action((username, password, dir, options, cmd) => {
       console.log(username, password, dir, options, cmd.optsWithGlobals())
     })
   program.parse()
   ```

4. 执行命令及相应结果如下

   ```bash
   // 如果dir 参数以 空格 隔开会自动分割为数组
   $ imooc-build root root123 1 2 3 4 -f 
   root root123 [ '1', '2', '3', '4' ] { force: true } { force: true }
   $ imooc-build  root root123 "1 2 3 4" -f 
   root root123 [ '1 2 3 4' ] { force: true } { force: true }
   ```

5. 当然这里还有一个`.arguments()` 用法其实跟上面差不多

   ```javascript
   ...
   program
     .command('login', { hidden: true, isDefault: true })
     // .argument('<usernam>', 'it is our username')
     // .argument('[password]', 'your password', 'default password')
     .arguments('<username> [password]')
     .argument('<dir...>', 'dir list')
     .option('-f --force', 'just a stand by here')
     .action((username, password, dir, options, cmd) => {
       console.log(username, password, dir, options, cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

6. 执行命令及相应结果如下

   ```bash
   $ imooc-build root root123 dir1 dir2
   root root123 [ 'dir1', 'dir2' ] {} {}
   ```

## 11: Argument 高级用法解析

> .addArgument(new commander.Argument(...))
>
> 他也支持很多方法
>
> * .argRequired() 参数必须
> * .argOptional() 参数可选
> * .choices([...]) 参数必须是指定的
> * .argParser(fn) 自定义格式化参数函数
> * default(value, description) 默认值和解释

1. 修改代码如下

   ```javascript
   ...
   program
     .command('login', { hidden: true, isDefault: true })
     // .argument('<usernam>', 'it is our username')
     // .argument('[password]', 'your password', 'default password')
     // .arguments('<username> [password]')
     // .argument('<dir...>', 'dir list')
     .addArgument(
       new Argument('username', 'this is your username')
         .argRequired()
         .choices(['root', 'guest']),
     )
     .addArgument(
       new Argument('[password]', 'this is your password').argParser(parseFloat),
     )
     .option('-f --force', 'just a stand by here')
     .action((username, password,  options, cmd) => {
       console.log(username, password, options, cmd.optsWithGlobals())
     })
   
   program.parse()
   ```

2. 这里就不运行测试了

## 12：Commander action this用法+钩子函数

### action 中支持 this，前提是不可以使用箭头函数

1. 修改代码如下

   ```javascript
   ...
   program
     .command('login', { hidden: true, isDefault: true })
     .addArgument(
       new Argument('username', 'this is your username')
         .argRequired()
         .choices(['root', 'guest']),
     )
     .addArgument(
       new Argument('[password]', 'this is your password').argParser(parseFloat),
     )
     .option('-f --force', 'just a stand by here')
     .action(function (username, password, options, cmd) {
       console.log(this.args[0], this.args[1], this.opts())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ imooc-build login root root123  -f     
   root root123 { force: true }
   ```

### 钩子函数

1. 修改代码如下

   ```javascript
   ...
   program
     .command('login', { hidden: true, isDefault: true })
     .addArgument(
       new Argument('username', 'this is your username')
         .argRequired()
         .choices(['root', 'guest']),
     )
     .addArgument(
       new Argument('[password]', 'this is your password').argParser(parseFloat),
     )
     .option('-f --force', 'just a stand by here')
     .hook('preAction', (thisCommand, actionCommand) => {
       // 这里是前置钩子回调
       // 因为 .command  后面还可以再写 command 所以这里提供了两个参数
       // 在使用一个 command  时他们是相等的
       console.log('-------前置hook-------')
       console.log(thisCommand.args, thisCommand.opts())
       console.log('----------------------------')
     })
     .hook('postAction', (thisCommand, actionCommand) => {
       // 这里是后置钩子回调
       console.log('-------后置hook-------')
       console.log(thisCommand.args, thisCommand.opts())
     })
     .action(function (username, password, options, cmd) {
       console.log(this.args[0], this.args[1], this.opts())
     })
   
   program.parse()
   ```

2. 执行命令及相应结果如下

   ```bash
   $ imooc-build login root root123  -f
   -------前置hook-------
   [ 'root', 'root123' ] { force: true }
   ----------------------------
   root root123 { force: true }
   -------后置hook-------
   [ 'root', 'root123' ] { force: true }
   ```

3. 当然你可以在全局中写 hook, 如下代码

   ```javascript
   ...
   program
     .option('-d, --debug', 'output extra debugging')
     .hook('preAction', (thisCommand, actionCommand) => {
       console.log('===============全局 preAction hook:start===============')
       console.log(thisCommand === actionCommand)
       console.log(thisCommand === program)
       console.log(actionCommand.args, actionCommand.opts())
       console.log('===============全局 preAction hook:end===============')
     })
     .hook('postAction', (thisCommand, actionCommand) => {
       console.log('===============全局 postAction hook:start===============')
       console.log(thisCommand === actionCommand)
       console.log(thisCommand === program)
       console.log(actionCommand.args, actionCommand.opts())
       console.log('===============全局 postAction hook:end===============')
     })
   
   ...
   ```

4. 执行命令及相应结果如下

   ```bash
   $ imooc-build login root root123  -f
   ===============全局 preAction hook:start===============
   false
   true
   [ 'root', 'root123' ] { force: true }
   ===============全局 preAction hook:end===============
   -------前置hook-------
   [ 'root', 'root123' ] { force: true }
   ----------------------------
   root root123 { force: true }
   -------后置hook-------
   [ 'root', 'root123' ] { force: true }
   ===============全局 postAction hook:start===============
   false
   true
   [ 'root', 'root123' ] { force: true }
   ===============全局 postAction hook:end===============
   ```

## 13: 脚手架框架搭建之Node版本校验

### 前置知识: semver

```javascript
const semver = require('semver')

// valid: 校验输入的版本有效性
console.log(semver.valid('v1.0.0')) // 1.0.0
console.log(semver.valid('1.0.0')) // 1.0.0
console.log(semver.valid('1.0')) // null
console.log(semver.valid('v')) // null
console.log(semver.valid('v1.0.0.00')) // null

// clean: 从一个表达式中拿到想要的一个结果
console.log(semver.clean('  =v1.2.3   ')) // 1.2.3
console.log(semver.clean('v1.0.0')) // 1.0.0
console.log(semver.clean('1.0.0')) // 1.0.0
console.log(semver.clean('>v1.0.0')) // null
console.log(semver.clean('>1.0.0')) // null

// satisfies: 一个版本号是否满足后面的参数条件
console.log(semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3')) // true
console.log(semver.satisfies('1.2.3', '2.x')) // false

console.log(semver.validRange('6.0.1', '5.0.0-7.2.3')) // 6.0.1

// .gt 是否前者大于后者
console.log(semver.gt('1.2.3', '9.8.7')) // false

// .lt 是否前者小于后者
console.log(semver.lt('1.2.3', '9.8.7')) // true

console.log(semver.minVersion('>=1.0.0').version) // 1.0.0

console.log(semver.valid(semver.coerce('v2'))) // '2.0.0'
console.log(semver.valid(semver.coerce('42.6.7.9.3-alpha'))) // '42.6.7'
```

### 代码实操

1. 新建`lib/checkNode.js`文件，内容如下

   ```javascript
   const semver = require('semver')
   
   module.exports = function checkNode(minNodeVersion) {
     // 获取当前 node 版本号
     const nodeVersion = semver.valid(semver.coerce(process.version))
     return semver.satisfies(nodeVersion, '>=' + minNodeVersion)
   }
   ```

2. 修改`bin/imooc-build.js`内容如下

   ```javascript
   #!/usr/bin/env node
   const commander = require('commander')
   const pkg = require('../package.json')
   const checkNode = require('../lib/checkNode')
   // 创建自执行函数
   ;(async function () {
     try {
       // 设置node的最低版本
       const MIN_NODE_VERSION = '8.9.0'
       // 校验版本号，如果不符合要求就报错
       if (!checkNode(MIN_NODE_VERSION)) {
         throw new Error(
           'Please upgrade your node version to v' + MIN_NODE_VERSION,
         )
       }
     } catch (error) {
       console.log(error.message)
     }
   })()
   ```

## 14：脚手架框架搭建之命令注册 

1. 继续修改`bin/imooc-build.js`，如下

   ```javascript
   #!/usr/bin/env node
   const { program } = require('commander')
   const pkg = require('../package.json')
   const checkNode = require('../lib/checkNode')
   const startServer = require('../start/startServer')
   const build = require('../build/buildServer')
   ;(async function () {
     try {
       const MIN_NODE_VERSION = '8.9.0'
       if (!checkNode(MIN_NODE_VERSION)) {
         throw new Error(
           'Please upgrade your node version to v' + MIN_NODE_VERSION,
         )
       }
       // 设置版本号
       program.version(pkg.version)
       // 增加一个 start 命令
       program
         .command('start')
         .description('start server by imooc-build ')
         .allowUnknownOption()
         .action(startServer)
   		// 增加一个 build 命令
       program
         .command('build')
         .description('build server by imooc-build')
         .allowUnknownOption()
         .action(build)
   	
       program.parse(process.argv)
     } catch (error) {
       console.log(error.message)
     }
   })()
   ```

2. 新建`start/startServer.js`文件，内容如下

   ```javascript
   module.exports = function startServer(args, opts, cmd) {
     console.log('start server')
   }
   ```

3. 新建`build/buildServer.js`，内容如下

   ```javascript
   module.exports = function build(args, opts, cmd) {
     console.log('build server')
   }
   ```

4. 执行终端命令，查看效果

   ```bash
   $ imooc-build      
   Usage: imooc-build [options] [command]
   
   Options:
     -V, --version   output the version number
     -h, --help      display help for command
   
   Commands:
     start           start server by imooc-build
     build           build server by imooc-build
     help [command]  display help for command
   
   $ imooc-build -V
   0.0.1
   
   $ imooc-build start
   start server
   
   $ imooc-build build
   build server
   ```

   
