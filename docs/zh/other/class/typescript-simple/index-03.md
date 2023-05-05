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

## 03: 使用cheerio进行数据提取

> [cheerio库文档地址](https://www.npmjs.com/package/cheerio),用法类似于 jQuery

1. 安装相应依赖库

   ```bash
   npm install cheerio @types/cheerio -D
   ```

2. 修改`crowller.ts`，代码如下

   ```typescript
   // 引入 cheerio 库
   import cheerio from 'cheerio'
   import superagent from 'superagent'
   // 声明一个类型
   interface CourseInfo {
     title: string
     count: number
   }
   
   class Crowller {
     private sercret = 'serretKey'
     private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.sercret}`
     constructor() {
       this.getRawHtml()
     }
     async getRawHtml() {
       const result = await superagent.get(this.url)
       // 获取课程信息函数
       this.getCourseInfo(result.text)
     }
   
     getCourseInfo(html: string) {
       // 解析 html
       const $ = cheerio.load(html)
       // 得到想要的容器元素
       const courseItems = $('.course-item')
       const courseInfos: Array<CourseInfo> = []
       // 遍历结果，得到其中的课程信息、数量
       courseItems.map((index, element) => {
         const descs = $(element).find('.course-desc')
         const title = descs.eq(0).text()
         const count = parseInt(descs.eq(1).text().split('：')[1], 10)
         courseInfos.push({
           title,
           count,
         })
       })
       const result = {
         time: new Date().getTime(),
         data: courseInfos,
       }
       console.log(result)
     }
   }
   
   const crowller = new Crowller()
   ```

   

