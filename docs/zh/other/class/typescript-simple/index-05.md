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

