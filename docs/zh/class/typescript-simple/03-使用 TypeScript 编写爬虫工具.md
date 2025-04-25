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

3. 运行终端命令，结果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17a6deff02fd4cfd830da722d3c6ddb9~tplv-k3u1fbpfcp-watermark.image?)

## 04：爬取数据的结构设计和存储

1. 修改`crowller.ts`，代码如下

   ```typescript
   import superagent from 'superagent'
   import cheerio from 'cheerio'
   import fs from 'fs'
   import path from 'path'
   
   interface CourseInfo {
     title: string
     count: number
   }
   // 课程信息结构
   interface CourseResult {
     time: number
     data: CourseInfo[]
   }
   // 声明一个内容数据的结构
   interface FileContent {
     [propName: number]: CourseInfo[]
   }
   
   class Crowller {
     private sercret = 'serretKey'
     private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.sercret}`
     constructor() {
       this.initSpiderProcess()
     }
     async getRawHtml() {
       const result = await superagent.get(this.url)
       return result.text
     }
   
     getCourseInfo(html: string) {
       const $ = cheerio.load(html)
       const courseItems = $('.course-item')
       const courseInfos: Array<CourseInfo> = []
       courseItems.map((index, element) => {
         const descs = $(element).find('.course-desc')
         const title = descs.eq(0).text()
         const count = parseInt(descs.eq(1).text().split('：')[1], 10)
         courseInfos.push({
           title,
           count,
         })
       })
       return {
         time: new Date().getTime(),
         data: courseInfos,
       }
     }
   
     async initSpiderProcess() {
       const result = await this.getRawHtml()
       const courseResult = this.getCourseInfo(result)
       // 产生课程信息结构
       this.genereateJsonContent(courseResult)
     }
   
     genereateJsonContent(courseResult: CourseResult) {
       const filePath = path.resolve(__dirname, '../data/course.json')
       let fileContent: FileContent = {}
       // 如果存在就读取，并解析
       if (fs.existsSync(filePath)) {
         fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
       }
       // 赋上这一次抓取的值
       fileContent[courseResult.time] = courseResult.data
       // 写入数据
       fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2))
     }
   }
   
   const crowller = new Crowller()
   ```

2. 重新运行终端，即可看到`data/course.json`文件已经被新建，并且写入了数据，多次运行，会持续写入，效果如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55949b6b7c7647d19c15d9a278eb9c85~tplv-k3u1fbpfcp-watermark.image?)

## 05: 使用组合设计模式优化代码

### 优化思路

* 把公共部分抽离抽离：
  * 获取网址内容，返回 `html`
  * 调用解析器方法`analyzer`方法，返回字符串，然后写入文件
* 新建解析器类
  * 实现`analyzer`方法，接受`html`字符串，返回处理后的字符串信息
* 这样我们如果要解析为不同的内容时候，只需要换一个解析类返回解析的符合格式的内容即可

### 代码实现

1. 新建`src/Analyzer.ts`，代码如下

   ```typescript
   import cheerio from 'cheerio'
   import fs from 'fs'
   import type { AnalyzerSchema } from './crowller'
   
   interface CourseResult {
     time: number
     data: CourseInfo[]
   }
   
   interface CourseInfo {
     title: string
     count: number
   }
   
   interface FileContent {
     [propName: number]: CourseInfo[]
   }
   
   class Analyzer implements AnalyzerSchema {
     private getCourseInfo(html: string) {
       const $ = cheerio.load(html)
       const courseItems = $('.course-item')
       const courseInfos: Array<CourseInfo> = []
       courseItems.map((index, element) => {
         const descs = $(element).find('.course-desc')
         const title = descs.eq(0).text()
         const count = parseInt(descs.eq(1).text().split('：')[1], 10)
         courseInfos.push({
           title,
           count,
         })
       })
       return {
         time: new Date().getTime(),
         data: courseInfos,
       }
     }
   
     public analyzer(html: string, filePath: string) {
       const courseResult = this.getCourseInfo(html)
       const fileContent = this.genereateJsonContent(courseResult, filePath)
       return JSON.stringify(fileContent, null, 2)
     }
   
     genereateJsonContent(courseResult: CourseResult, filePath: string) {
       let fileContent: FileContent = {}
       if (fs.existsSync(filePath)) {
         fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
       }
       fileContent[courseResult.time] = courseResult.data
       return fileContent
     }
   }
   
   export default Analyzer
   ```

2. 修改`src/crowller.ts`，代码如下

   ```typescript
   import superagent from 'superagent'
   import fs from 'fs'
   import path from 'path'
   import Analyzer from './Analyzer'
   
   export interface AnalyzerSchema {
     analyzer: (html: string, filePath: string) => string
   }
   
   class Crowller {
     private filePath = path.resolve(__dirname, '../data/course.json')
     constructor(private url: string, private analzer: AnalyzerSchema) {
       this.initSpiderProcess()
     }
     async getRawHtml() {
       const result = await superagent.get(this.url)
       return result.text
     }
   
     async initSpiderProcess() {
       const result = await this.getRawHtml()
       const fileContent = this.analzer.analyzer(result, this.filePath)
       this.writeFile(fileContent)
     }
   
     writeFile(fileContent: string) {
       fs.writeFileSync(this.filePath, fileContent)
     }
   }
   const sercret = 'serretKey'
   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
   
   const analyzer = new Analyzer()
   const crowller = new Crowller(url, analyzer)
   ```

3. 重新运行终端，效果如常

## 06：单例模式实战复习

> 如何把上节中的`Analyzer`类变为单例模式

1. 修改`Analyzer.ts`部分，代码如下

   ```typescript
   class Analyzer implements AnalyzerSchema {
     // 声明一个私有属性 instance
     private static instance: Analyzer
     // 把 constructor 变为 private 修饰后，外部就无法通过 new 来进行实例化
     private constructor() {}
     // 声明一个方法，用于获取返回实例
     static getInstance() {
       if (!this.instance) {
         this.instance = new Analyzer()
       }
       return this.instance
     }
     // 其他不变
     ...
   }
   ```

2. 修改`crowller.ts`中的调用方式

   ```typescript
   // 如果不想暴露 Crowller 中的方法，可以如下修改,使其均变为私有属性
   class Crowller {
     private async getRawHtml() {
       
     }
     private async initSpiderProcess() {
       
     }
     private writeFile(fileContent: string) {
       
     }
   }
   // const analyzer = new Analyzer()
   const analyzer = Analyzer.getInstance()
   ```

## 07：TypeScript的编译运转过程的进一步理解

> 目前我们的代码脚本是通过 ts-node 直接运行 .ts 文件产生的结果，无法直接被被人使用

### 编译 ts 为 js + 实时监听编译

1. 新建脚本文件命令

   > tsc 命令还支持 `-w`命令，表示实时监听编译

   ```json
   {
     "scripts": {
       "build": "tsc -w"
     },
   }
   ```

2. 如果这样直接运行命令`npm run build`，我们直接在`ts`文件同级目录产生相应的`js`文件，但是如果我们想要指定一个输出目录，该如何做呢

3. 可以修改`tsconfig.json`,如下

   ```json
   {
     "compilerOptions": {
       // 指定输出文件夹
       "outDir": "./build",
     }
   }
   ```

4. 这样运行命令`npm run build`后，就会产生`build`目录，生成的`js`文件也会在其中

### 使用 nodemon 监听系统变化并运行

1. 安装相应依赖

   ```bash
   npm install nodemon -D
   ```

2. 修改`package.json`，添加如下脚本

   > 注意：nodemon 会监听系统中的变化，然后重新运行后面的命令，如果不忽略 data/course.json ，会一直运行（因为执行 node ./build/crowller.js 后，会往 data/course.json文件中写入数据，然后监听到变化，重新运行，一直运行下去）

   ```json
   {
     "scripts": {
       "dev:start": "nodemon node ./build/crowller.js"
     },
     "nodemonConfig": {
       "ignore": [
         "data/*"
       ]
     },
   }
   ```

3. 然后运行终端命令`npm run dev:start`就可以发现终端已经运行，如果此时修改`build/Aanlyzer.js`或者`build/crowller.js`中的代码，`nodemon`会触发脚本命令执行，然后往`course.json`中写入数据

### 使用 concurrently 并行终端命令

1. 目前我们需要运行两个终端命令

   * `npm run build`实时监听`ts`文件的变化，生成相应的`js`文件
   * `npm run dev:start`：实时监听`js`文件的变化，往`course.json`中写入数据

2. `concurrently`可以并行运行终端命令

3. 安装相应依赖

   ```bash
   npm install concurrently -D
   ```

4. 添加如下脚本命令

   ```json
   {
     "scripts": {
       "dev:start": "nodemon node ./build/crowller.js",
       "dev:build": "tsc -w",
       "start": "concurrently npm:dev:*"
     },
   }
   ```

5. 运行终端命令`npm run start`命令即可

6. 这样我们修改任意`ts`文件，就会触发编译`js`动作，然后触发往`course.json`中写入数据
