# 04-TypeScript 语法进阶

[TypeScript配置文件官方文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

## 01: TypeScript中的配置文件

## 02: TypeScript中的配置文件

1. 上一节中，我们新建项目后，会运行`tsc --init`命令，然后在文件夹下就会生成一个`tsconfig.json`文件，这里就是`ts`的配置文件

2. 注意：

   * 运行`tsc xxx.ts`文件，把指定文件编译时**不会**读取`tsconfig.json`中的配置项，
   * 运行`tsc`时候，**会**根据`tsconfig.json`中的配置项进行编译
   * 使用`ts-node`命令，**会**根据`tsconfig.json`中的配置项进行编译

3. 文件配置项中`include`/`exlcude`/`files`说明：[官方文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

   ```json
   {
     "include": [],
     "exclude": [],
     "files": []
   }
   ```

4. 接着就是`compilerOptions`选项（以下列举部分）:[官方文档:编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

   | **选项**           | **类型** | **默认值** | **描述**                                                     |
   | ------------------ | -------- | ---------- | ------------------------------------------------------------ |
   | noImplicitAny      | boolean  | false      | 在表达式和声明上有隐含的 `any`类型时报错。                   |
   | strictNullChecks   | boolean  | false      | 在严格的 `null`检查模式下， `null`和 `undefined`值不包含在任何类型里，只允许用它们自己和 `any`来赋值（有个例外， `undefined`可以赋值到 `void`）。 |
   | rootDir            | string   |            | 仅用来控制输出的目录结构 `--outDir`                          |
   | outDir             | string   |            | 重定向输出目录。                                             |
   | incremental        | boolean  | true       | 增量编译                                                     |
   | allowJs            | boolean  | false      | 允许编译javascript文件。                                     |
   | checkJs            | boolean  | false      | 在 `.js`文件中报告错误。与 `--allowJs`配合使用。             |
   | noUnusedLocals     | boolean  | false      | 若有未使用的局部变量则抛错。                                 |
   | noUnusedParameters | boolean  | false      | 若有未使用的参数则抛错。                                     |

## 04：联合类型和类型保护

```typescript
interface BirdTest {
  fly: boolean
  sing: () => {}
}
interface DogTest {
  fly: boolean
  bark: () => {}
}
// 类型断言的方式
function trainAnimal(animal: BirdTest | DogTest) {
  if (animal.fly) {
    ;(animal as BirdTest).sing()
  } else {
    ;(animal as DogTest).bark()
  }
}
// 使用 in 语法做类型保护
function trainAnimalSecond(animal: BirdTest | DogTest) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}
// 使用 typeof来做类型保护
function addTestOne(first: number | string, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}

// 使用 instanceof 来做类型保护
class NumberObj {
  count: number
}
function addTestSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  }
  return 0
}
// 等等
```

## 05：Enum枚举类型

```typescript
enum Status {
  OFFLINE = 0,
  ONLINE,
  DELETED,
}

function getResult(status) {
  if (status === Status.DELETED) {
    return 'offline'
  } else if (status === Status.ONLINE) {
    return 'online'
  } else if (status === Status.DELETED) {
    return 'deleted'
  }
  return 'error'
}
// 也可以反向查询
console.log(Status[0]) // "OFFLINE"
```

## 06: 函数泛型

```typescript
// 泛型：泛指的类型
function join<T>(first: T, second: T) {
  return `${first} + ${second}`
}

join<string>('1', '2')
join(1, 2)

function joinTwo<T, U>(first: T, second: U) {
  return `${first} + ${second}`
}
joinTwo<string, number>('1', 2)

// 返回值也可以限定为 泛型
function joinThree<T>(first: T): T {
  return first
}

function map<T>(params: T[]) {
  return params
}
map<string>(['123'])
```

## 07：类中的泛型以及泛型类型

### 类中的泛型

```typescript
class DataManager<T extends { name: string }> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name
  }
}

const dataTest = new DataManager<{ name: string }>([{ name: '孙悟空' }])

// 也可以限制为 number 或者 string
class DataManagerTwo<T extends number | string> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index]
  }
}
```

### 泛型类型注解

```typescript
// 函数的注解
const testTest: (a: number, b: number) => number = function (
  a: number,
  b: number,
): number {
  return a + b
}
// 可以简写为下面的形式，也是较为常见的形式
const testTestTwo: (a: number, b: number) => number = function (a, b) {
  return a + b
}
// 使用泛型作为类型注解
const helloTest: <T>(params: T) => T = function <T>(params: T) {
  return params
}
```

## 08：命名空间-namespace(上)

> 命名空间一个最明确的目的就是解决重名问题。命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的。

```typescript
namespace Home {
  class Header {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is a header'
      document.body.appendChild(elem)
    }
  }
  class Content {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is a content'
      document.body.appendChild(elem)
    }
  }
  class Footer {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is a footer'
      document.body.appendChild(elem)
    }
  }

  export class Page {
    constructor() {
      new Header()
      new Content()
      new Footer()
    }
  }
}

// 外部引用就可以这样使用
new Home.Page()
// 由于 Header Content Footer 并没有被 export 出去，所以不能通过以下方式使用
// new Home.Header()
```

## 09：命名空间-namespace(下)

1. 新建项目`04-demo`，执行以下命令

   ```bash
   npm init -y
   tsc --init
   ```

2. 修改`package.json`增加脚本命令

   ```json
   {
     "scripts": {
       "dev": "tsc -w"
     },
   }
   ```

3. 修改`tsconfig.json`

   ```json
   {
     "compilerOptions": {
        "rootDir": "./src/",
        "outDir": "./dist/",
     }
   }
   ```

4. 新建`src/index.ts`,内容如下

   ```typescript
   namespace Component {
     export class Header {
       constructor() {
         const elem = document.createElement('div')
         elem.innerText = 'this is a header'
         document.body.appendChild(elem)
       }
     }
     export class Content {
       constructor() {
         const elem = document.createElement('div')
         elem.innerText = 'this is a content'
         document.body.appendChild(elem)
       }
     }
     export class Footer {
       constructor() {
         const elem = document.createElement('div')
         elem.innerText = 'this is a footer'
         document.body.appendChild(elem)
       }
     }
   }
   ```

5. 新建`src/page.ts`,内容如下

   > 如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：

   ```typescript
   /// <reference path = "index.ts" />
   namespace Page {
     export class Page {
       constructor() {
         new Component.Header()
         new Component.Content()
         new Component.Footer()
       }
     }
   }
   ```

6. 新建`index.html`页面，内容如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body></body>
     <script src="./dist/index.js"></script>
     <script src="./dist/page.js"></script>
     <script>
       new Page.Page()
     </script>
   </html>
   ```

7. 运行终端命令`npm run dev`,运行`index.html`至浏览器即可看到效果

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/774b30885af34fbb84f01fc98b1b92a5~tplv-k3u1fbpfcp-watermark.image?)

## 10：import对应的模块化-缺代码

## 11：使用Parcel打包TS代码

1. 新建 `parcel-demo`文件夹，执行命令

   ```bash
   npm init -y
   tsc --init
   ```

2. 安装相关依赖

   ```bash
   npm install parcel -D
   ```

3. 修改`package.json`，增加脚本命令如下

   ```json
   {
     "scripts": {
       "dev": "parcel ./public/index.html"
     },
   }
   ```

4. 新建`public/index.html`，内容如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body></body>
     <script src="../src/page.ts"></script>
   </html>
   ```

5. 新建`src/pages.ts`文件，内容如下

   ```typescript
   const teacher: string = '唐僧'
   console.log(teacher)
   ```

6. 运行终端命令`npm run dev`，根据终端提示，打开指定服务页面，结果如下

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec24b05253c3485896da20bad1cd096e~tplv-k3u1fbpfcp-watermark.image?)

## 12：描述文件中的全局类型(上)

1. 在上一节项目`parcel-demo`项目中，修改`public/index.html`，内容如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body></body>
     // 增加引入 jquery.js
     <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js"></script>
     <script src="../src/page.ts"></script>
   </html>
   ```

2. 修改`src/page/ts`，代码如下

   ```typescript
   const teacher: string = '唐僧'
   console.log(teacher)
   
   $(function () {
     $('body').html('<h1>123</h1>')
   })
   ```

3. 这里我们增加相关`$`代码，虽然其可以在`index.html`中打开浏览器运行，但是在编译器中会提示报错

   ```bash
   Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.ts(2581)
   ```

4. 这里我们不通过安装文件类型库`@types/jquery`来声明`$`的类型，而是通过自定义文件的形式来声明

5. 新建`jquery.d.ts`文件，增加如下内容

   ```typescript
   interface JqueryInstance {
     html: (html: string) => JqueryInstance
   }
   
   // 定义全局变量(这里定义全局变量、定义全局函数均可)
   // declare var $: (param: () => void) => void
   
   // 定义全局函数
   // 函数重载
   declare function $(readyFunc: () => void): void
   declare function $(selector: string): JqueryInstance
   ```

## 13：描述文件中的全局类型(下)

### 使用interface语法来实现函数重载

上节中我们使用到了函数重载，当然我们也可以使用 `interface`来实现函数重载的问题

```typescript
interface JqueryInstance {
  html: (html: string) => JqueryInstance
}
// 使用 interface 语法，实现函数重载
interface JQuery {
  (readyFunc: () => void): void
  (selector: string): JqueryInstance
}
declare var $: JQuery
```

### 对类对象、类的类型定义+命名空间的嵌套

1. 修改`src/page.ts`文件，增加如下代码

   ```typescript
   $(function () {
     $('body').html('<h1>123</h1>')
     // 增加如下代码
     new $.fn.init()
   })
   ```

2. 修改`jquery.d.ts`，增加如下类型

   ```typescript
   // 使用函数重载
   interface JqueryInstance {
     html: (html: string) => JqueryInstance
   }
   declare function $(readyFunc: () => void): void
   declare function $(selector: string): JqueryInstance
   // 增加如下代码
   declare namespace $ {
     namespace fn {
       class init {}
     }
   }
   ```

## 14：模块代码的类型描述文件

上一节中我们用的`jquery`是通过`cdn`的形式引入的，那么对于模块化引入的该如何写声明文件呢？

1. 安装`jquery`依赖库

   ```bash
   npm install jquery -D
   ```

2. 修改`index.html`删除`jquery`引用

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body></body>
     <script src="../src/page.ts"></script>
   </html>
   ```

3. 修改`page.ts`，使用`es module`形式引入

   ```typescript
   import $ from 'jquery'
   
   $(function () {
     $('body').html('<h1>123</h1>')
     new $.fn.init()
   })
   ```

4. 修改`jquery.d.ts`内容如下

   ```typescript
   // ES6  模块化
   declare module 'jquery' {
     interface JqueryInstance {
       html: (html: string) => JqueryInstance
     }
     declare function $(readyFunc: () => void): void
     declare function $(selector: string): JqueryInstance
     declare namespace $ {
       namespace fn {
         class init {}
       }
     }
     export = $
   }
   ```

5. 这样，模块化的类型声明就已经完成了。

## 15 【讨论题】TypeScript 的描述文件作用

## 16：泛型中keyof语法的使用

```typescript
interface Person {
  name: string
  age: number
  gender: string
}
class Teacher {
  constructor(private info: Person) {}
	// 使用 keyof 来声明类型
  getInfo<T extends keyof Person>(key: T) {
    return this.info[key]
  }
}
const teacher = new Teacher({
  name: '唐僧',
  age: 100,
  gender: 'male',
})
const test = teacher.getInfo('name')
console.log(test)
```

