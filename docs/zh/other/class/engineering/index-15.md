# 工程化脚手架：进阶实战——工程化脚手架启动流程实战

## 01: Node文件监听chokidar库详解

1. 安装依赖库

   ```bash
   npm install chokidar -S
   ```

2. 修改`lib/start/startServer.js`文件，内容如下

   ```javascript
   const chokidar = require('chokidar')
   const path = require('path')
   
   function runServer() {
     // 启动 webpack 服务
   }
   
   function runWatcher() {
     // 启动配置监听服务
     // 使用三方库：chokidar
     // 这里先通过监听 start 文件夹来查看回调数据
     chokidar
       .watch(path.resolve(__dirname, '../start'))
       .on('all', (eventName, path) => {
         console.log(eventName, path)
       })
   }
   
   module.exports = function startServer(args, opts, cmd) {
     console.log('start server')
     // 1. 通过子进程启动一个 webpack-dev-server 服务
     // 1.1 子进程启动可以避免主进程收到影响
     // 1.2 子进程启动可以方便重启，解决修改配置后无法重启的问题
     runServer()
   
     // 2. 监听配置修改
     runWatcher()
   }
   ```

3. 新建`lib/start/config.js`，内容如下

   ```{  a: '1'}
   { a: '1' }
   ```

4. 运行如下命令，及相应效果如下(可以看到此时监听了三个项目：`start文件夹、config.js、startServer.js`)

   ```bash
   $  imooc-build start
   start server
   addDir /Users/gaoyuan/Desktop/imooc-build/lib/start
   add /Users/gaoyuan/Desktop/imooc-build/lib/start/config.js
   add /Users/gaoyuan/Desktop/imooc-build/lib/start/startServer.js
   ```

5. 如果修改了其中的文件，比如`config.js`，修改如下

   ```bash
   change /Users/gaoyuan/Desktop/imooc-build/lib/start/config.js
   ```

## 02: chokidar实现原理和源码分析

1. 打开`node_modules/chokidar/package.json`文件，可以看到如下内容

   ```json
   {
     ...
     "main": "index.js"
     ...
   }
   ```

2. 打开这个文件可以看到

   ```javascript
   const watch = (paths, options) => {
     const watcher = new FSWatcher(options); // 实例化这个 FSWatcher 类
     watcher.add(paths);
     return watcher;
   };
   
   exports.watch = watch;
   ```

3. 这个类继承于`EventEmitter`事件派发器

## 03：通过chokidar实现 config 配置文件监听

1. 修改`startServer.js`,监听`config.js`文件

   ```javascript
   ...
   function onChange(eventName, path) {
     console.log('change')
   }
   
   function runWatcher() {
     const configPath = path.resolve(__dirname, './config.js')
     const watcher = chokidar
       // .watch(path.resolve(__dirname, '../start'))
       .watch(configPath)
       .on('all', onChange)
       .on('erro', (error) => {
         console.error('file watch error!', error)
         process.exit(1)
       })
   }
   ...
   ```

## 04: 划重点：Node启动子进程方法之 execFile + exec

### 前置知识

* 进程是程序的一个最小单位，

* 在终端中可以通过`ps -ef`来查看所有的进程

* 进程都有 `PID、PPID`

  ```bash
  $ ps -ef
    UID   PID  PPID   C STIME   TTY           TIME CMD
      0     1     0   0 四06下午 ??         7:36.74 /sbin/launchd
      0    97     1   0 四06下午 ??         0:17.92 /usr/sbin/syslogd
      0    98     1   0 四06下午 ??         2:03.46 /usr/libexec/UserEventAgent (System)
      0   101     1   0 四06下午 ??         0:19.90 /System/Library/PrivateFrameworks/Uninstall.framework/Resources/uninstalld
      0   102     1   0 四06下午 ??         0:01.72 /usr/libexec/kextd
      0   103     1   0 四06下午 ??         3:37.02 /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/FSEvents.framework/Versions/A/Support/fseventsd
  ...
  ```

#### 启动子进程的方式

[Node.js 多进程:https://www.runoob.com/nodejs/nodejs-process.html#](https://www.runoob.com/nodejs/nodejs-process.html#)

[玩转 node 子进程 — child_process:https://juejin.cn/post/6882290865763680264](https://juejin.cn/post/6882290865763680264)

Node 提供了 child_process 模块来创建子进程，方法有：

- **exec** - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
- **execFile**: 启动一个子进程来执行可执行文件；
- **spawn** - child_process.spawn 使用指定的命令行参数创建新进程。
- **fork** - child_process.fork 是 spawn() 的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与 spawn 方法不同的是，fork 会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。

新建文件`start/devService.js`,内容如下

```javascript
console.log('-------- dev service start ----------')
console.log(process.argv)
console.log(process.pid)
console.log(process.ppid)
console.log('-------- dev service end ----------')
```

### exec 方式创建子进程

1. 修改`startServer.js`方法，代码如下

   ```javascript
   ...
   const cp = require('child_process')
   const path = require('path')
   function runServer() {
     // 启动子进程的方式
     console.log('pid', process.pid)
     // 第一中使用 exec
     cp.exec(
       'node ' + path.resolve(__dirname, './devService.js'),
       (err, stdout, stderr) => {
         if (err) {
           console.log('error', 'err')
         } else {
           console.log('dev callback')
           console.log(stdout)
         }
       },
     )
   }
   ...
   ```

2. 执行终端命令及效果如下

   ```bash
   $  imooc-build start
   start server
   pid 93502
   dev callback
   -------- dev service start ----------
   [
     '/usr/local/bin/node',
     '/Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js'
   ]
   93503
   93502
   -------- dev service end ----------
   ```

### execFile 方式创建子进程

1. 修改`startServer.js`方法，代码如下

   ```javascript
   function runServer() {
     console.log('pid', process.pid)
     // 第二种：使用 execFile 方式
     cp.execFile(
       'node',
       [path.resolve(__dirname, './devService.js')],
       {},
       (err, stdout) => {
         if (!err) {
           console.log(stdout)
         } else {
           console.log(err)
         }
       },
     )
   }
   ```

2. 执行终端命令及效果如下

   ```bash
   $ imooc-build start
   start server
   pid 97678
   -------- dev service start ----------
   [
     '/usr/local/bin/node',
     '/Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js'
   ]
   97680
   97678
   -------- dev service end ----------
   ```

## 05: 划重点：Node启动子进程方法之spawn+fork

### spawn

1. 修改`startServer.js`方法，代码如下

   ```javascript
   function runServer() {
     console.log('pid', process.pid)
     // 第三种：使用 spwan
     const child = cp.spawn('node', [path.resolve(__dirname, './devService.js')])
     // 输出相关的数据
     child.stdout.on('data', function (data) {
       console.log('data from child: ' + data)
     })
   
     // 错误的输出
     child.stderr.on('data', function (data) {
       console.log('error from child: ' + data)
     })
   
     // 子进程结束时输出
     child.on('close', function (code) {
       console.log('child exists with code: ' + code)
     })
   }
   ```

2. 执行终端命令及效果如下

   ```bash
   $  imooc-build start
   start server
   pid 98855
   data from child: -------- dev service start ----------
   
   data from child: [
     '/usr/local/bin/node',
     '/Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js'
   ]
   98856
   98855
   data from child: -------- dev service end ----------
   child exists with code: 0
   ```

### fork

> child_process.fork 是 spawn() 方法的特殊形式，用于创建进程, **可以帮会我们进行进程间的通信**

1. 修改`startServer.js`方法，代码如下

   ```javascript
   function runServer() {
     console.log('pid', process.pid)
     // 第四种：fork
     const srciprtPath = path.resolve(__dirname, './devService.js')
     const child = cp.fork(srciprtPath)
     child.on('data', (data) => {
       console.log(data)
     })
   }
   ```

2. 执行终端命令及效果如下

   ```bash
   $ imooc-build start
   start server
   pid 99720
   -------- dev service start ----------
   [
     '/usr/local/bin/node',
     '/Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js'
   ]
   99721
   99720
   -------- dev service end ----------
   ```

3. 那么如何进行通信呢？

4. 我们继续修改`startServer.js`方法，代码如下

   ```javascript
   function runServer() {
     console.log('pid', process.pid)
     // 第四种：fork
     const srciprtPath = path.resolve(__dirname, './devService.js')
     const child = cp.fork(srciprtPath)
     child.on('message', (data) => {
       // 接收来自子进程中的消息
       console.log('-------message from child process: start---')
       console.log(data)
       console.log('-------message from child process: end---')
     })
     child.send('hello child process')
   }
   ```

5. 修改`devServive.js`文件，增加接收和发送消息事件

   ```javascript
   console.log('-------- dev service start ----------')
   console.log(process.argv)
   console.log(process.pid)
   console.log(process.ppid)
   console.log('-------- dev service end ----------')
   // 增加以下功能
   process.on('message', (data) => {
     console.log('==========massage from main process: start=============')
     console.log(data)
     console.log('==========massage from main process: end================')
   })
   process.send('message from child process')
   ```

6. 终端运行命令，及相应结果如下

   ```bash
   $ imooc-build start
   start server
   pid 324
   -------- dev service start ----------
   [
     '/usr/local/bin/node',
     '/Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js'
   ]
   325
   324
   -------- dev service end ----------
   -------message from child process: start---
   message from child process
   -------message from child process: end---
   ==========massage from main process: start=============
   hello child process
   ==========massage from main process: end================
   ```

7. 根据上述打印过程，我们可以看到执行流程如下

   * 先执行脚本`devService.js`,其中的`console.log`率先执行
   * 然后`devService.js`中，执行监听函数，并发送消息
   * `startServer.js`中，监听到`message`事件并触发执行，然后打印出来
   * 接着`startServer.js`中，发送消息，
   * 子进程中监听函数执行，打印
   * 并且在终端中仍然可以看到，这个进程处于一个运行监听状态

## 06：子进程运行脚本获取默认端口号

### 如何进行传递信息

1. 修改`startServer.js`,内容如下

   ```javascript
   // 增加第二个参数   
   const child = cp.fork(srciprtPath, ['a=1'])
   ```

2. 修改`devService.js`,增加代码如下

   ```javascript
   console.log(process.argv)
   ```

3. 终端运行命令及结果如下

   ```bash
   $ imooc-build start
   
   [
     '/usr/local/bin/node',
     '/Users/gaoyuan/Desktop/imooc-build/lib/start/devService.js',
     'a=1'
   ]
   ```

4. 这里就可以拿到传递的参数

### 实现自定义端口号

1. 修改`startServer.js`,内容如下

   ```javascript
    const child = cp.fork(srciprtPath, ['--port 8080'])
   ```

2. 修改`devService.js`,增加代码如下

   ```javascript
   const params = process.argv.slice(2)
   const DEFAUL_PORT = 8000
   const paramObj = {}
   params.forEach((param) => {
     const paramsArr = param.split(' ')
     paramObj[paramsArr[0].replace('--', '')] = paramsArr[1]
   })
   const defaultPort = parseInt(paramObj.port || DEFAUL_PORT, 10)
   console.log(paramObj)
   ```

3. 终端运行命令，及结果如下

   ```bash
   imooc-build start
   
   { port: '8080' }
   ```

## 07: Node实现端口号是否被占用功能校验

> 这里用到一个 npm 库：detect-port

1. 安装这个库

   ```bash
   npm install detect-port -S
   ```

2. 修改`devService.js`,代码如下

   ```javascript
   const detectPort = require('detect-port')
   ;(async function () {
     const params = process.argv.slice(2)
     const DEFAUL_PORT = 8000
     const paramObj = {}
     params.forEach((param) => {
       const paramsArr = param.split(' ')
       paramObj[paramsArr[0].replace('--', '')] = paramsArr[1]
     })
     const defaultPort = parseInt(paramObj.port || DEFAUL_PORT, 10)
     try {
       const newPort = await detectPort(defaultPort)
       if (newPort === defaultPort) {
         console.log('端口号' + defaultPort + '可以使用')
       } else {
         console.log('端口号' + defaultPort + '被占用，建议使用新端口号' + newPort)
       }
     } catch (error) {}
   })()
   ```

3. 终端运行命令，及结果如下

   ```bash
   $ imooc-build start
   端口号8080被占用，建议使用新端口号8081
   ```

## 08: detect-port库源码分析

### 参考文章

[detect-port 源码心得:https://zhuanlan.zhihu.com/p/434454631#detect-port](https://zhuanlan.zhihu.com/p/434454631#detect-port)

* 源码核心是使用`nodeJs` 中 `net` 模块，来判断端口号是否可用, 同时设置最大端口号，是设置值 + 10，如果大于 65535，则是65535，如下代码

  ```javascript
  function listen(port, hostname, callback) {
    const server = new net.Server();
    ...
  }
    
  
  let maxPort = port + 10;
  if (maxPort > 65535) {
  maxPort = 65535;
  }  
  ```

* 如何判断端口被占用呢？

  ```javascript
  server.listen(port, hostname, () => {
    port = server.address().port;
    server.close();
    debug('get free %s:%s', hostname, port);
    return callback(null, port);
  });
  ```

* 同时这里会有多次判断，全部成功时才会认为这个端口可用

  ```javascript
   // 1. check null
  listen(port, null, (err, realPort) => {
  	...
    // 2. check 0.0.0.0
    listen(port, '0.0.0.0', err => {
      ...
      // 3. check localhost
      listen(port, 'localhost', err => {
      	...   
        // 4. check current ip
        listen(port, address.ip(), (err, realPort) => {
        	...  
        })
      })
    })
  }
  ```

* 其中一个一旦失败就会调用`handleError`方法，他会把端口号`port`加 1，然后再次执行

  ```javascript
   function handleError() {
    port++;
    if (port >= maxPort) {
      debug('port: %s >= maxPort: %s, give up and use random port', port, maxPort);
      port = 0;
      maxPort = 0;
    }
    tryListen(port, maxPort, hostname, callback);
  }
  ```

## 09：Node 内置库net详解

> [Node.js Net 模块:https://www.runoob.com/nodejs/nodejs-net-module.html](https://www.runoob.com/nodejs/nodejs-net-module.html)

### 基础使用

1. 在`devService.js`中增加如下代码

   ```javascript
   const net = require('net')
   const tcpServer = new net.Server()
   tcpServer.listen(8080, null, function () {
     console.log(tcpServer.address())
   })
   tcpServer.on('error', (err) => {
     console.log(err)
   })
   ```

2. 执行终端及结果如下

   ```bash
   $ imooc-build start
   { address: '::', family: 'IPv6', port: 8080 }
   ```

3. 修改`devService.js`代码, 把`null`改为`0.0.0.0`

   ```javascript
   tcpServer.listen(8080, "0,0,0,0", function () {
     console.log(tcpServer.address())
   })
   ```

4. 执行终端及结果如下（这里我是本地已经被占用了，所以会有如下报错）

   ```bash
   $ imooc-build start
   Error: listen EADDRINUSE: address already in use 0.0.0.0:8080
   ```

5. 修改`devService.js`代码, 把`8080`改为`8081`

   ```javascript
   tcpServer.listen(8081, "0.0.0.0", function () {
     console.log(tcpServer.address())
   })
   ```

6. 执行终端及结果如下

   ```bash
   $ imooc-build start
   { address: '0.0.0.0', family: 'IPv4', port: 8081 }
   ```

7. 继续修改`devService.js`代码, 把`0.0.0.0`改为`192.3.4.6`（一个不存在的`IP`）

   ```javascript
   tcpServer.listen(8081, "192.3.4.6", function () {
     console.log(tcpServer.address())
   })
   ```

8. 执行终端及结果如下

   ```bash
   $ imooc-build start
   Error: listen EADDRNOTAVAIL: address not available 192.3.4.6:8081
   ```

### 深入使用

> 我们写一个双向链接通信的功能
>
> [参考：net.Socket: https://www.runoob.com/nodejs/nodejs-net-module.html](https://www.runoob.com/nodejs/nodejs-net-module.html)

#### 初步链接

1. 修改`devService.js`代码中的`192.3.4.6`改为`localhost`，并监听`connection`事件

   ```javascript
   const net = require('net')
   const tcpServer = new net.Server()
   tcpServer.listen(8081, 'localhost', function () {
     console.log(tcpServer.address())
   })
   tcpServer.on('error', (err) => {
     console.log(err)
   })
   tcpServer.on('connection', (socket) => {
     console.log('socket链接')
   })
   ```

2. 然后我们建立客户端，新建`test/client.js`文件，内容如下

   ```javascript
   const net = require('net')
   const client = new net.Socket()
   client.connect(8081, 'localhost', function () {
     console.log('connect successful')
   })
   ```

3. 这里我们需要执行两个服务，一个服务端，一个客户端，且前者先执行

4. 用终端打开传程序执行`imooc-build start`来执行服务端(这个终端我们成为 Server 终端)

   ```bash
   $ imooc-build start
   { address: '127.0.0.1', family: 'IPv4', port: 8081 }
   ```

5. 再打开一个终端，执行`node test/client.js`（这个终端我们称为 Client 终端）

   ```bash
   $ node client.js
   connect successful
   ```

6. 第五步执行完成后，我们就可以在 `Server终端`中看到如下结果, 链接成功

   ```bash
   socket链接
   ```

#### 服务端向客户端通信

1. 修改`devServer.js`中的代码，在`connection`中写入代码，实现由服务端向客户端发送消息

   ```javascript
   tcpServer.on('connection', (socket) => {
     console.log('socket链接')
     setTimeout(() => {
       socket.write('服务端向客户端写入数据')
     }, 2000)
   })
   ```

2. 接着客户端这边需要进行一个接收，修改`client.js`，增加`.on("data")`的监听

   ```javascript
   client.on('data', (data) => {
     console.log('-------客户端接收到了服务端的数据:start--------')
     console.log(data.toString()) // 这里的data 是一个Buffer
     console.log('-------客户端接收到了服务端的数据:end--------')
   })
   
   client.on('error', (error) => {
     console.log('error', error)
   })
   
   client.on('end', () => {
     console.log('client end')
   })
   ```

3. 接着先重启`Server终端`，再重启`Client 终端`

4. 我们在`Client终端`进行观察，`Server终端`启动大约 2s 后日志打印结果如下

   ```bash
   -------客户端接收到了服务端的数据:start--------
   服务端向客户端写入数据
   -------客户端接收到了服务端的数据:end--------
   ```

#### 客户端向服务端通信

1. 我们修改`client.js`。在客户端内，接收到消息后 1s,向服务端发送消息

   ```javascript
   client.on('data', (data) => {
     console.log('-------客户端接收到了服务端的数据:start--------')
     console.log(data.toString()) // 这里的data 是一个Buffer
     console.log('-------客户端接收到了服务端的数据:end--------')
     setTimeout(() => {
       console.log('客户端要给服务端发送消息了')
       client.write('hello i am clinet')
     }, 1000)
   })
   ```

2. 同样服务端也要进行接受，我们在`devServer.js`内部的`tcpServer.on("connection")`回调函数内进行监听，修改如下

   ```javascript
    tcpServer.on('connection', (socket) => {
     console.log('socket链接')
     setTimeout(() => {
       socket.write('服务端向客户端写入数据')
     }, 2000)
     // ---------------这里我们进行监听通信------------------------
     socket.on('data', (data) => {
       console.log('-------服务端接收到了客户端的数据:start--------')
       const commandString = data.toString()
       console.log(commandString)
       if (commandString === 'END') {
         socket.end()
       }
       console.log('-------服务端接收到了客户端的数据:end----------')
     })
   })
   ```

3. 接着先重启`Server终端`，再重启`Client 终端`

4. 我们在`Server终端`进行观察，`Client终端`启动大约 3s 后日志打印结果如下

   ```bash
   -------服务端接收到了客户端的数据:start--------
   hello i am clinet
   -------服务端接收到了客户端的数据:end----------
   ```

5. 这里我们还做了一个特殊处理，当发现客户端发送过来的是`END`时候，就关闭客户端

#### 监听指令

> 当发现客户端发送过来的是`END`时候，就关闭客户端

1. 服务端核心代码就是上一小节中的

   ```javascript
   if (commandString === 'END') {
     socket.end()
   }
   ```

2. 接着我们在`client.js`中增加关闭字符串代码

   ```javascript
   setTimeout(() => {
     client.write('END')
   }, 5000)
   ```

3. 接着先重启`Server终端`，再重启`Client 终端`

4. 观察`Client终端`，最终这里会收到`end`事件的回调，打印效果如下

   ```bash
   client end
   ```

### 完整代码

#### test/client.js

```javascript
const net = require('net')
const client = new net.Socket()

client.connect(8081, 'localhost', function () {
  console.log('connect successful')
})

client.on('data', (data) => {
  console.log('-------客户端接收到了服务端的数据:start--------')
  console.log(data.toString()) // 这里的data 是一个Buffer
  console.log('-------客户端接收到了服务端的数据:end--------')
  setTimeout(() => {
    console.log('客户端要给服务端发送消息了')
    client.write('hello i am clinet')
  }, 2000)
})

client.on('end', () => {
  console.log('client end')
})

client.on('error', (error) => {
  console.log('error', error)
})

setTimeout(() => {
  client.write('END')
}, 5000)
```

#### start/devService.js

```javascript
try {
  const net = require('net')
  const tcpServer = new net.Server()
  tcpServer.listen(8081, 'localhost', function () {
    console.log(tcpServer.address())
  })
  tcpServer.on('error', (err) => {
    console.log(err)
  })
  tcpServer.on('connection', (socket) => {
    console.log('socket链接')
    setTimeout(() => {
      socket.write('服务端向客户端写入数据')
    }, 2000)
    socket.on('data', (data) => {
      console.log('-------服务端接收到了客户端的数据:start--------')
      const commandString = data.toString()
      console.log(commandString)
      if (commandString === 'END') {
        socket.end()
      }
      console.log('-------服务端接收到了客户端的数据:end----------')
    })
  })
} catch (error) {
  console.log(error)
}
```

## 10：命令行交互实现方案inquirer详解

> [npm库之 inquire:https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)

1. 安装`inquirer`:注意：官方文档中从v9以后是 ESmodule形式了，所以需要安装如下版本

   ```bash
   npm install --save inquirer@^8.0.0
   ```

2. 我们接着`devService.js`中的`else`中继续写

   ```javascript
   const inquirer = require('inquirer')  
   try {
     const newPort = await detectPort(defaultPort)
     if (newPort === defaultPort) {
       console.log('端口号' + defaultPort + '可以使用')
     } else {
       console.log('端口号' + defaultPort + '被占用，建议使用新端口号' + newPort)
       // 命令行交互
       const questions = {
         type: 'list',
         name: 'answer',
         message: '请选择',
         choices: ['a', 'b', 'c'],
       }
       const answer = await inquirer.prompt(questions)
       console.log(answer)
     }
   } catch (error) {
     console.log(error)
   }
   ```

3. 运行终端，可以看到效果如下

   ```bash
   imooc-build start
   ? 请选择 (Use arrow keys)
   ❯ a 
     b 
     c 
   ```

4. 使用箭头上下选择后，结果如下

   ```bash
   { answer: 'a' } // 或者 b、c
   ```

   



















