# 07-Express 项目代码改良

> 这里我们修改的是之前爬虫项目: 03-demo

## 01: 创建控制器和装饰器

1. 因为要使用装饰器，所以修改`tsconfig.json`文件，如下

   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": true, 
       "emitDecoratorMetadata": true,
     }
   }
   ```

2. 安装相关依赖库

   ```bash
   npm install reflect-metadata -D
   ```

3. 新建`03-demo/src/controller.LoginController.ts`,内容如下

   > 这里我们使用装饰器模式，来配置路由

   ```typescript
   import type { Request, Response } from 'express'
   import { getResponseData } from '../utils/index'
   import 'reflect-metadata'
   import { decoratorController, get } from './decorator'
   
   interface RequestWithBody extends Request {
     body: {
       password: string | undefined
     }
   }
   
   @decoratorController
   class LoginController {
     @get('/')
     home(req: Request, res: Response) {
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
     }
     @get('/login')
     login(req: RequestWithBody, res: Response) {
       const { password } = req.body
       const isLogin = req.session ? req.session.login : undefined
       if (isLogin) {
         res.json(getResponseData(false, '已经登录过了'))
         return
       }
       if (password === '123' && req.session) {
         req.session.login = true
         res.json(getResponseData(true))
       } else {
         res.json(getResponseData(false, '登录失败'))
       }
     }
   }
   ```

4. 新建`03-demo/src/controller.decorator.ts`，内容如下

   ```typescript
   import { Router } from 'express'
   export const router = Router()
   
   // 类装饰器，统一从类的原型上拿到 path下的不同路由地址以及方法
   export function decoratorController(target: any) {
     for (let key in target.prototype) {
       const path = Reflect.getMetadata('path', target.prototype, key)
       const handler = target.prototype[key]
       // 这里先注册 get 方法，后续再修改为其他方法(post、delete、put等)
       router.get(path, handler)
     }
   }
   // 这里我们处理 get 装饰器
   export function get(path: string) {
     return function (target: any, key: string, descriptor: PropertyDescriptor) {
       // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
       descriptor.enumerable = true
       return Reflect.defineMetadata('path', path, target, key)
     }
   }
   ```

## 02：通过装饰器实现项目路由功能

> 上一节中我们在 decorator.ts 文件中注册了路由配置以及方法，并进行了导出，但是 express 还没有使用

1. 修改`src/index.ts`

   ```typescript
   // import router from './router'
   import './controller/LoginController' // 引入类控制器，触发装饰器
   // 引入新的路由，这里就注册了 / /login 两个 get  路由
   import { router } from './controller/decorator'
   ```

2. 重新运行终端命令`npm run start`,就可以在浏览器里`http://localhost:7001/login`和`http://localhost:7001/`看到相应的内容，跳转其他路由目前都会报错

   ​	![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2639064958934c0ca93ecdf673d0719c~tplv-k3u1fbpfcp-watermark.image?)

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b9396aecb634e069b4f952a0ca969b1~tplv-k3u1fbpfcp-watermark.image?)

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e9d6339e98e434a9c9e05c3860f4182~tplv-k3u1fbpfcp-watermark.image?)

3. 修改`LoginController.ts`，引入`/logout`（因为它也是 `get`方式，且没有中间件）

   ```typescript
   @decoratorController
   class LoginController {
     @get('/logout')
     logout(req: RequestWithBody, res: Response) {
       if (req.session) {
         req.session.login = false
       }
       res.json(getResponseData(true))
     }
   }
   ```

4. 这样在浏览器里打开`http://localhost:7001/logout`就可以看到接口也是正常访问、返回

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c8147bb305d414781e609e33c03be08~tplv-k3u1fbpfcp-watermark.image?)

## 03：多种请求方法装饰器的生成

> 现在我们只处理了 get 请求，并没有处理 post 处理

1. 我们目前的`login`使用的是`get`请求，之前的路由用的是`post`请求，这里我们修改`login`为`post`请求

2. 修改`src/LoginController.ts`，代码如下

   ```typescript
   import { post } from './decorator'
   
   @decoratorController
   class LoginController {
     @post('/login')
     login(req: RequestWithBody, res: Response) {
       ....
     }
   }
   ```

3. 接着修改`src/decorator.ts`文件，这里要导出一个`post`方式

   ```typescript
   import { Methods } from '../types/index'
   
   export function decoratorController(target: any) {
     for (let key in target.prototype) {
       const path = Reflect.getMetadata('path', target.prototype, key)
       // 取出来当前 method
       const method: Methods = Reflect.getMetadata('method', target.prototype, key)
       const handler = target.prototype[key]
       // 注册到路由中
       if (path && method && handler) {
         router[method](path, handler)
       }
     }
   }
   
   export function get(path: string) {
     return function (target: any, key: string, descriptor: PropertyDescriptor) {
       // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
       descriptor.enumerable = true
       Reflect.defineMetadata('path', path, target, key)
       // 这里增加设置一个属性 method,值为 get 
       Reflect.defineMetadata('method', 'get', target, key)
     }
   }
   
   export function post(path: string) {
     return function (target: any, key: string, descriptor: PropertyDescriptor) {
       descriptor.enumerable = true
       Reflect.defineMetadata('path', path, target, key)
       // 这里增加设置一个属性 method,值为 post
       Reflect.defineMetadata('method', 'post', target, key)
     }
   }
   ```

4. 新建`src/types/index.ts`,内容如下

   ```typescript
   export enum Methods {
     get = 'get',
     post = 'post',
   }
   ```

5. 我们对`src/decorator.ts`中为`get、post`方法等做一个优化处理，因为后续可能会有一个`put、delete`等方法

   ```typescript
   // src/decorator.ts
   function getRequstMethod(method: Methods) {
     return function (path: string) {
       return function (target: any, key: string, descriptor: PropertyDescriptor) {
         // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
         descriptor.enumerable = true
         Reflect.defineMetadata('path', path, target, key)
         Reflect.defineMetadata('method', method, target, key)
       }
     }
   }
   
   export const get = getRequstMethod(Methods.GET)
   export const post = getRequstMethod(Methods.POST)
   export const put = getRequstMethod(Methods.PUT)
   export const del = getRequstMethod(Methods.DELETE)
   
   // src/types/index.ts
   export enum Methods {
     GET = 'get',
     POST = 'post',
     DELETE = 'delete',
     PUT = 'put',
   }
   ```

6. 重新运行`npm run start`,页面效果不变

## 04：中间件装饰器的编写

1. 新建`src/controller/CrowllerController.ts`，内容如下

   > 注意：我们这里使用了 中间件装饰器 useMiddleware、showData中的文件路径有所变动

   ```typescript
   import type { Request, Response, NextFunction } from 'express'
   import fs from 'fs'
   import path from 'path'
   import Analyzer from '../Analyzer'
   import Crowller from '../crowller'
   import { getResponseData } from '../utils/index'
   import { get, decoratorController, useMiddleware } from './decorator'
   
   interface RequestWithBody extends Request {
     body: {
       password: string | undefined
     }
   }
   
   function checkLogin(req: RequestWithBody, res: Response, next: NextFunction) {
     const isLogin = req.session ? req.session.login : undefined
     if (isLogin) {
       next()
     } else {
       res.json(getResponseData(null, '请先登录'))
     }
   }
   
   @decoratorController
   export default class CroweController {
     @get('/getData')
     @useMiddleware(checkLogin)
     getData(req: RequestWithBody, res: Response) {
       const sercret = 'serretKey'
       const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
       const analyzer = Analyzer.getInstance()
       new Crowller(url, analyzer)
       res.json(getResponseData(true))
     }
   
     @useMiddleware(checkLogin)
     @get('/showData')
     showData(req: RequestWithBody, res: Response) {
       try {
         // 这里的路径有所变动
         const filePath = path.resolve(__dirname, '../../data/course.json')
         const content = fs.readFileSync(filePath, 'utf-8')
         res.json(getResponseData(JSON.parse(content)))
       } catch (error) {
         res.json(getResponseData(false, '还没有爬取到内容'))
       }
     }
   }
   ```

2. 修改`src/controller/decorator.ts`,增加中间件修饰符`useMiddleware`方法

   ```typescript
   import type { RequestHandler } from 'express'
   
   export function decoratorController(target: any) {
     for (let key in target.prototype) {
       const path = Reflect.getMetadata('path', target.prototype, key)
       const method: Methods = Reflect.getMetadata('method', target.prototype, key)
       // 增加获取 middleware 中间件的方式
       const middleware = Reflect.getMetadata('middleware', target.prototype, key)
       const handler = target.prototype[key]
       if (path && method && handler) {
         // 如果有中间件，就使用
         if (middleware) {
           router[method](path, middleware, handler)
         } else {
           router[method](path, handler)
         }
       }
     }
   }
   
   // 中间件类型是一个函数，可以定义为 RequestHandler
   export function useMiddleware(middleware: RequestHandler) {
     return function (target: any, key: string, descriptor: PropertyDescriptor) {
       descriptor.enumerable = true
       Reflect.defineMetadata('middleware', middleware, target, key)
     }
   }
   ```

3. 修改`src/index.ts`,引入`CrowllerController.ts`

   ```typescript
   // 引入 CrowllerController.ts 需要在引入路由之前
   import './controller/CrowellerController'
   import { router } from './controller/decorator'
   ```

4. 终端运行`npm run start`，可以在浏览器里进行校验



