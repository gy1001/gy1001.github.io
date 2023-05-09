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
   import { loginDecorator, get } from './decorator'
   
   interface RequestWithBody extends Request {
     body: {
       password: string | undefined
     }
   }
   
   @loginDecorator
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
   export function loginDecorator(target: any) {
     for (let key in target.prototype) {
       const path = Reflect.getMetadata('path', target.prototype, key)
       const handler = target.prototype[key]
       // 这里先注册 get 方法，后续再修改为其他方法(post、delete、put等)
       router.get(path, handler)
     }
   }
   // 这里我们处理 get 装饰器
   export function get(path: string) {
     return function (target: any, key: string, desciptopr: PropertyDescriptor) {
       // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
       desciptopr.enumerable = true
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
   @loginDecorator
   class LoginController {
     @get('/logout')
     logout(req: RequestWithBody, res: Response) {
       if (req.session) {
         req.session.login = false
         res.json(getResponseData(true))
       } else {
         res.json(getResponseData(false, '退出失败'))
       }
     }
   }
   ```

4. 这样在浏览器里打开`http://localhost:7001/logout`就可以看到接口也是正常访问、返回

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c8147bb305d414781e609e33c03be08~tplv-k3u1fbpfcp-watermark.image?)



