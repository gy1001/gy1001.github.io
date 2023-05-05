# 03-使用 TypeScript 编写爬虫工具

> 爬虫网址：[http://www.dell-lee.com/typescript/demo.html?secret=secretKey](http://www.dell-lee.com/typescript/demo.html?secret=secretKey)

## 01：爬虫概述及正版密钥获取

## 02：使用SuperAgent和类型定义文件获取页面内容

1. 新建文件夹`03-demo`

2. 执行以下命令

   ```bash
   npm init -y
   tsc --init
   ```

3. 安装相关依赖

   ```bash
   npm install ts-node -D
   npm install typescript -D
   npm install superagent -D
   npm install @types/superagent -D
   ```

4. 修改`package.json`，增加脚本命令

   ```json
   {
     "scripts": {
       "dev": "ts-node ./src/crowller.ts"
     },
   }
   ```

5. 新建文件`src/crowller.ts`

   ```typescript
   import superagent from 'superagent'
   class Crowller {
     private sercret = 'serretKey'
     private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.sercret}`
     private rawHtml = ''
     constructor() {
       this.getRawHtml()
     }
     async getRawHtml() {
       const result = await superagent.get(this.url)
       this.rawHtml = result.text
       console.log(this.rawHtml)
     }
   }
   
   const crowller = new Crowller()
   ```

6. 终端运行命令`npm run dev`，效果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea037ebfeae24178a3ac46e80b3cd05b~tplv-k3u1fbpfcp-watermark.image?)



​                                                                                       

