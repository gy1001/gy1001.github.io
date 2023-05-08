# 05-使用 Express 框架开发数据爬取及展示接口

## 01：Express基础项目结构搭建

1. 修改原有项目`03-demo`中的爬虫项目

2. 修改`package.json`中的脚本命令

   ```json
   {
     "scripts": {
       "dev:start": "nodemon node ./build/index.js",
       "dev:build": "tsc -w",
       "start": "tsc && concurrently npm:dev:*"
     },
   }
   ```

3. 安装依赖库

   ```bash
   npm install express -D
   npm install @types/express -D
   ```

4. 新建`src/index.ts`，内容如下

   ```typescript
   import express from 'express'
   import router from './router'
   const app = express()
   app.use(router)
   
   app.listen(7001, () => {
     console.log('server is running')
   })
   ```

5. 新建`src/router.ts`，内容如下

   ```typescript
   import { Router } from 'express'
   import type { Request, Response } from 'express'
   import Analyzer from './Analyzer'
   import Crowller from './crowller'
   
   const router = Router()
   
   router.get('/', (req: Request, res: Response) => {
     res.send('hello word')
   })
   
   router.get('/getData', (req: Request, res: Response) => {
     const sercret = 'serretKey'
     const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
   
     // const analyzer = new Analyzer()
     const analyzer = Analyzer.getInstance()
     new Crowller(url, analyzer)
   
     res.send('getData successful')
   })
   
   export default router
   ```

6. 修改`src/crowller.ts`，增加内容如下

   ```typescript
   // import Analyzer from './Analyzer'
   
   // const sercret = 'serretKey'
   // const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
   
   // const analyzer = Analyzer.getInstance()
   export default Crowller
   ```

7. 运行命令`npm run start`，在浏览器中打开地址`http://localhost:7001/`即可看到如下结果

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50418d661377484bb7b5af0e90ad072a~tplv-k3u1fbpfcp-watermark.image?)

8. 然后访问一次`localhost:7001/getData`，就会执行爬取并抓取数据一次。

## 02：使用TS编写常规express代码遇到的问题

### 遇到的问题

1. 目前我们的接口没有做权限校验，任何人访问`localhost:7001/getData`都会触发数据的抓取、写入，这样势必导致文件飞快的变大，增加存储压力
2. 通过查看`Request`的声明，可以看到`ReqBody`是`any`类型，并没有类型限制以及类型提醒，这样就会增大出错几率，失去`TS`的优势

### 增加权限校验

### 思路

1. 在主页中，返回一个可以输入密码的输入框，并`form`提交，提交后跳转到`/getData`页面
2. `/getData`路由中从`body`中拿到输入数据，进行校验，如果成功则抓取并写入数据，如果失败就提示密码错误

#### 代码实现

1. 修改`router.ts`，文件内容如下

   ```typescript
   //  主页部分返回一个带密码输入框的 form 表单，提交后进入 /getData 页面
   router.get('/', (req: Request, res: Response) => {
     res.send(`<html>
       <body>
         <form action="/getData" method="post">
           <input  name="password" type="password" placeholder="请输入密码" />
           <button type="submit">提交</button>
         </form>
       </body>
     </html>`)
     res.send('hello word')
   })
   
   // 从 body 中拿到 password，如果是 "123"就进行爬虫抓取并写入数据，否则就提示失败
   router.post('/getData', (req: Request, res: Response) => {
     if (req.body.password === '123') {
       const sercret = 'serretKey'
       const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
       // const analyzer = new Analyzer()
       const analyzer = Analyzer.getInstance()
       new Crowller(url, analyzer)
       res.send('getData successful')
     } else {
       res.send('Password Error !')
     }
   })
   ```

2. 安装依赖库，

   ```bash
   npm install body-parser -D
   ```

3. 修改`src/index.ts`，修改如下

   ```typescript
   import bodyParser from 'body-parser'
   
   const app = express()
   // 此中间件需要在 router 中间件前面使用
   app.use(bodyParser.urlencoded({ extended: false }))
   app.use(router)
   ```

4. 新建`body-parser.d.ts`声明文件，内容如下

   ```typescript
   declare module 'body-parser'
   ```

5. 重新运行终端`npm run start`，进入`http://localhost:7001/`输入密码

6. 如果是`123`,就会进入`http://localhost:7001/getData`，提示`getData successful`并写入文件，否则就会提示`Password Error !`

#### 遗留问题

1. `express`库的类型定义文件，`x.d.ts`文件类型描述不准确
2. 当我们使用中间件的时候，对`req`或者`res`做了修改后，实际上并修改它的类型

## 03：扩展解决Express的类型定义文件问题

### 解决问题1

1. 修改`src/router.js`，增加如下代码

   ```typescript
   interface RequestWithBody extends Request {
     body: {
       password: string | undefined
     }
   }
   
   router.post('/getData', (req: RequestWithBody, res: Response) => {
     const { password } = req.body
   }
   ```

2. 这样就解决了类型声明不准确的问题

### 解决问题2

1. 假如我们使用了一个中间件，它的作用就是在`req`上增加了一个`teacherName`属性，

2. 比如：修改`src/index.ts`，增加如下代码

   ```typescript
   import type { Request, Response, NextFunction } from 'express'
   
   app.use((req: Request, res: Response, next: NextFunction) => {
     req.teacherName = '唐僧'
     next()
   })
   ```

3. 新建`custom.d.ts`,添加内容如下

   > 通过点击 Request进入声明内容，可以看到如下代码,在此基础上进行扩展即可
   >
   > **declare** global {
   >
   > ​    **namespace** Express {
   >
   > ​        *// These open interfaces may be extended in an application-specific manner via declaration merging.*
   >
   > ​        *// See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)*
   >
   > ​        **interface** Request {}
   >
   > ​        **interface** Response {}
   >
   > ​        **interface** Locals {}
   >
   > ​        **interface** Application {}
   >
   > ​    }
   >
   > }

   ```typescript
   declare namespace Express {
     interface Request {
       teacherName: string
     }
   }
   ```

4. 然后此时再去看`src/index.ts`中`teacherName`的类型推断即可看到如下（可能需要重启编辑器）

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a2d4576e1004bf2b59584d916453829~tplv-k3u1fbpfcp-watermark.image?)

## 04：登陆功能的开发

> 目前的程序，我们每次进入都需要输入密码，然后确认密码，这样才可以进行爬虫抓取数据，显然不太友好，我们需要增加一个登录页，登录成功后，存储用户信息，否则提示错误；下次进入,如果之前登录成功，就可以直接进行抓取爬虫

1. 安装依赖库`cookie-session`

   > [cookie-session 官方文档:https://www.npmjs.com/package/cookie-session](https://www.npmjs.com/package/cookie-session)

   ```bash
   npm install cookie-session -D
   npm install @types/cookie-session -D
   ```

2. 修改`src/index.ts`，增加引入使用包

   ```typescript
   import CookieSession from 'cookie-session'
   
   // 在路由中间件前使用
   app.use(
     CookieSession({
       name: 'session',
       keys: ['teacher-dell'],
       // Cookie Options
       maxAge: 24 * 60 * 60 * 1000, // 24 hours
     }),
   )
   ```

3. 修改`src/router.ts`，增加内容如下

   ```typescript
   import fs from 'fs'
   import path from 'path'
   
   // 修改首页，增加判断：如果登录成功过，就显示 退出、开始抓取内容
   router.get('/', (req: Request, res: Response) => {
     const isLogin = req.session ? req.session.login : undefined
     if (isLogin) {
       res.send(`<html>
         <body>
         <a href="/getData">开始抓取内容</a>
         <br />
         <a href="/logout">退出</a>
         </body>
       </html>`)
       return
     }
     res.send(`<html>
       <body>
         <form action="/login" method="post">
           <input name="password" type="password" placeholder="请输入密码" />
           <button type="submit">提交</button>
         </form>
       </body>
     </html>`)
     res.send('hello word')
   })
   
   // 增加退出登录操作
   router.get('/logout', (req: RequestWithBody, res: Response) => {
     if (req.session) {
       req.session.login = false
     }
     res.redirect('/')
   })
   
   // 增加登录页面
   router.post('/login', (req: RequestWithBody, res: Response) => {
     const { password } = req.body
     const isLogin = req.session ? req.session.login : undefined
     if (isLogin) {
       res.send('已经登录过了')
       return
     }
     if (password === '123' && req.session) {
       req.session.login = true
       res.send('登录成功')
     } else {
       res.send('登录失败')
     }
   })
   
   // 修改 getData 访问逻辑，
   router.get('/getData', (req: RequestWithBody, res: Response) => {
     const isLogin = req.session ? req.session.login : undefined
     if (isLogin) {
       const sercret = 'serretKey'
       const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
       // const analyzer = new Analyzer()
       const analyzer = Analyzer.getInstance()
       new Crowller(url, analyzer)
       res.send('getData successful')
     } else {
       res.send('请登录后在进行爬取内容')
     }
   })
   
   // 增加 showData 页面
   router.get('/showData', (req: RequestWithBody, res: Response) => {
     try {
       const filePath = path.resolve(__dirname, '../data/course.json')
       const content = fs.readFileSync(filePath, 'utf-8')
       res.json(JSON.parse(content))
     } catch (error) {
       res.send('还没有爬取到内容')
     }
   })
   ```

4. 运行终端，自行验证逻辑即可
