# TypeScript

## TS 简介

### TypeScript 是什么

- 以 JavaScript 为基础构建的语言
- 一个 JavaScript 的超集
- 可以在任何支持 JavaScript 的平台中执行（**TS 不能被 JS 解析器直接执行，需要把 TS 编译为 TS**）
- TypeScript 扩展了 JavaScript，并添加了类型

### TypeScript 增加了什么

- 类型
- 支持 ES 的新特性
- 添加了 ES 不具备的新特性
- 丰富的配置选项
- 强大的开发工具

## 1、TypeScript 的开发环境搭建

### 1.1 下载并安装 Node.js

[官网下载](https://nodejs.org/zh-cn/)

### 1.2 使用 npm 全局安装 TypeScript

- 安装命令

  ```shell
  npm install -g typescript
  ```

- 编译命令

  ```shell
  tsc helloworld.ts
  ```

## 2、TS 的类型声明

### 2.1 类型声明

- 类型声明是 TS 非常重要的一个特点

- 通过类型声明可以指定 TS 中变量 （参数、形参）的类型

- 指定类型后，当为变量赋值时，TS 编译器回自动检查值是否符合类型声明，符合则赋值，否则报错

- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- 语法

  ```javascript
  let 变量：类型；
  let 变量：类型 = 值；
  function fn(参数：类型，参数：类型)：类型{
    ...
  }
  ```

- 自动类型判断

  - TS 拥有自动的类型判断机制
  - 当对变量的声明和赋值时同时进行的，TS 编译器会自动判断变量的类型
  - 所以如果你的变量的声明和赋值同时进行，可以省略类型声明

- 类型断言

  - 常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
  - 推荐 as 语法

- 类型

  | 类型    | 例子            | 描述                            |
  | ------- | --------------- | ------------------------------- |
  | number  | 1, -33, 2.5     | 任意数字                        |
  | string  | "hi", 'hi', hi  | 任意字符串                      |
  | boolean | true, false     | 布尔值 true 或者 false          |
  | 字面量  | 其本身          | 限制变量的值就是该字面量的值    |
  | any     | \*              | 任意类型                        |
  | unknown | \*              | 类型安全的 any                  |
  | void    | 空值(undefined) | 没有值(或者 undefined)          |
  | never   | 没有值          | 不能使任何值                    |
  | object  | {name:'孙悟空'} | 任意的 js 对象                  |
  | array   | [1,2,3]         | 任意 JS 数组                    |
  | tuple   | [4, 5]          | 元组，TS 新增类型，固定长度数组 |
  | enum    | enum{A, B}      | 枚举，Ts 新增类型               |

- 例子

  ```javascript
  let a:string = "孙悟空";
  let a = "孙悟空";

  // 类型断言
  let strLength: number = (someValue as string).length;

  // never
  function createError():never{
    throw new Error("报错了")
  }

  // 属性名后面加 ? 表示属性是可选的
  let b:{ name: string, age?: numebr}
  b = { name:'孙悟空', age: 20 }

  let c: {name: string, [propName: string]: any}
  c = { name: '猪八戒', age: 18, gender: "男" }

  // 设置函数结构的类型声明
  let d: (a: number, b: number) => number
  d = function(n1: number, n2: number):number => {
    return n1 + n2
  }

  // 数组
  let e:string[]
  e = ['a','b',"c"]

  let f = Array<number>
  f = [1,2,3,4,5,6,7,8]

  // 元组：固定长度的数组
  let h : [string, number]
  h = ["hello", 123]

  // enum：枚举
  Enum Gnder {
    Male,
    Female
  }
  let i: {name: string, gender: Gender}
  i = { name: '孙悟空', gender: Gender.Male }

  // 联合类型
  let j = string | numebr
  let j: {name:string} & { age: number }
  j = { name: '孙悟空', age: 20 }

  // 类型别名
  let k: 1|2|3|4|5;
  let l: 1|2|3|4|5;
  // 可以简化为如下
  type MyType = 1|2|3|4|5;
  let m: MyType;
  let n: MyType;
  ```

## 3、 编译选项

### 3.1 自动编译文件

- 编译文件时，使用 -w 指令后，TS 编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译

- 示例

  ```javascript
  tsc xxx.ts -w
  ```

### 3.2 自动编译整个项目

- 如果直接使用 tsc 命令，则可以自动将当前项目下的所有 ts 文件编译为 js 文件
- 但是如果能直接使用 tsc 命令的前提是，要在项目根目录下创建一个 ts 的配置文件 tsconfig.json
- tsconfig.json 是一个 json 文件，添加配置文件后，只需 tsc 命令即可完成对整个项目的编译

### 3.3 配置选项

- include

  - 定义希望被编译文件所在的目录

  - 默认值：["\*\*/\*"]

  - 示例

    - ```javascript
      "include": ["src/**", "tests/**/*"]
      ```

    - 上述示例中，所有 src 目录和 tests 目录下的文件都会被编译

- exclude

  - 定义需要排除在外的目录

  - 默认值：["node_modules", "bower_components", "jspm_packages"]

  - 示例

    - ```javascript
      "exclude": ["./src/hello/**/*"]
      ```

    - 上述示例中，src 下 hello 目录下的文件不会被编译

- extends

  - 定义被继承的配置文件

  - 示例

    - ```javascript
      "extends": "./config/base"
      ```

    - 上述示例中，当前配置文件中会自动包含 config 目录下 base.jso 中的所有配置信息

- files

  - 指定被编译文件的列表，只有需要编译的文件少时才会用到

  - 示例

    - ```javascript
      "files": {
        "core.ts",
        "sys.ts",
        "types.ts",
        ...
      }
      ```

    - 列表中的文件都会被 TS 编译器所编译

- compilerOptions

  - 编译选项时配置文件中非常重要也是比较复杂的配置选项

  - 在 compilerOptions 中包含多个子选项，用来完成对编译的配置

  - 项目选项

    - target

      - 设置 ts 代码编译的目标版本
      - 可选值
        - `ES3(默认值)`、`"ES5"`、`"ES6"`、 `"ES2015"`、`"ES2016"`、`"ES2017"`、`"ESNext"`

    - module

      - 指定生成哪个模块系统代码： `"None"`， `"CommonJS"`， `"AMD"`， `"System"`， `"UMD"`， `"ES6"`或 `"ES2015"`。
      - 只有 `"AMD"`和 `"System"`能和 `--outFile`一起使用。
      - `"ES6"`和 `"ES2015"`可使用在目标输出为 `"ES5"`或更低的情况下。
      - 默认值：`target === "ES6" ? "ES6" : "commonjs"`

    - lib

      - 编译过程中需要引入的库文件的列表。
      - 可能的值 `ES5`、 `ES6`、`ES2015` `ES7`、 `ES2016`、 `ES2017`、 `ES2018、` `ESNext、` `DOM`、 `DOM.Iterable`、 `WebWorker`、 `ScriptHost`、 `ES2015.Core`、 `ES2015.Collection、` `ES2015.Generator、` `ES2015.Iterable`
        `ES2015.Promise`、`ES2015.Proxy`、 `ES2015.Reflect、` `ES2015.Symbol、` `ES2015.Symbol.WellKnown`、 `ES2016.Array.Include、` `ES2017.object、` `ES2017.Intl`、`ES2017.SharedMemory`、 `ES2017.String`、
        `ES2017.TypedArrays、` `ES2018.Intl、` `ES2018.Promise`、 `ES2018.RegExp、` `ESNext.AsyncIterable、`ESNext.Array、` `ESNext.Intl`、`ESNext.Symbol`

    - outDir

      - 重定向输出目录。

      - 示例

        - ```javascript
          "outDir": "./dist"
          ```

    - outFile

      - 将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和 ` ///<reference``> `和 `import`的文件顺序决定的。查看输出文件顺序文件了解详情。

      - 示例

        - ```javascript
          outFile: './dist/app.js'
          ```

    - allowJs

      - 允许编译 javascript 文件。

      - 默认：false

      - 示例

        - ```javascript
          "allowJs": false
          ```

    - checkJs

      - 在 `.js`文件中报告错误。与 `--allowJs`配合使用。

      - 默认 `false`

      - 示例

        - ```javascript
          "checkJs": true
          ```

    - removeComments

      - 删除所有注释，除了以 `/!*`开头的版权信息。

      - 默认：`false`

      - 示例

        - ```javascript
          "removeComments": true
          ```

    - noEmit

      - 不生成输出文件(用途：可以用来进行 ts 检查而不输出文件)

      - 默认值：`false`

      - 示例

        - ```javascript
          "noEmit": true
          ```

    - noEmitOnError

      - 报错时不生成输出文件。

      - 默认值：`false`

      - 示例

        - ```javascript
          "noEmitOnError": true
          ```

    - alwaysStrict

      - 以严格模式解析并为每个源文件生成 `"use strict"`语句

      - 默认值： `false`

      - 示例

        - ```javascript
          "alwaysStrict": true
          ```

    - noImplicitAny

      - 在表达式和声明上有隐含的 `any`类型时报错。

      - 默认值：`false`

      - 示例

        - ```javascript
          "noImplicitAny": true
          ```

    - noImplicitThis

      - 当 `this`表达式的值为 `any`类型的时候，生成一个错误。

      - 默认值：`false`

      - 示例

        - ```javascript
          "noImplicitThis": true
          ```

    - strictNullChecks

      - 在严格的 `null`检查模式下， `null`和 `undefined`值不包含在任何类型里，只允许用它们自己和 `any`来赋值（有个例外， `undefined`可以赋值到 `void`）。

      - 默认值：`false`

      - 示例

        - ```javascript
          "strictNullChecks": true
          ```

    - strict

      - 启用所有严格类型检查选项。启用 `--strict`相当于启用 `--noImplicitAny`, `--noImplicitThis`, `--alwaysStrict`， `--strictNullChecks`和 `--strictFunctionTypes`和`--strictPropertyInitialization`

      - 默认值：`false`

      - 示例

        - ```javascript
          "strict": true
          ```

    - 等等还有很多：[具体参考官网](https://www.tslang.cn/docs/handbook/compiler-options.html)

## 4、使用 webpack 打包 TS 代码

### 4.1 初步打包 `TS` 文件

1. 创建 webpack-ts-demo, 然后执行初始化命令

   ```shell
   npm init
   ```

2. 安装相关依赖包

   ```shell
   npm install webpack webpack-cli typescript ts-loader -D
   ```

3. 创建 `webpack` 配置文件 `webpack.config.js`

   ```javascript
   const path = require('path')

   module.exports = {
     mode: 'development',
     // 指定入口文件
     entry: './src/index.ts',
     // 指定打包文件所在目录
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     // 指定webpack 打包时候使用的模块
     module: {
       // 指定加载规则
       rules: [
         {
           // test 指定生效的文件规则
           test: /\.ts$/,
           // 要使用的 loader
           use: 'ts-loader',
           // 要指定排除的文件夹
           exclude: /node_modules/,
         },
       ],
     },
   }
   ```

4. 创建 `ts` 配置文件 `tsconfig.js`

   - 可以手动创建，也可以执行命令`npx tsc --init` 进行创建

   - 内容如下

     ```javascript
     {
       "compilerOptions": {
         "target": "ES2015",
         "module": "ES2015",
         "strict": true
       }
     }
     ```

5. `package.jso` 中增加脚本命令

   ```javascript
   "scripts": {
     "build": "webpack"
   },
   ```

6. 执行打包命令，就可以看到 `dist` 目录下的 `bundle.js` 文件了

   ```shell
   npm run build
   ```

### 4.2 加入 HTML 文件

1. 增加 `html` 插件

   ```shell
   npm install html-webpack-plugin -D
   ```

2. 修改 `package.json` 文件

   ```javascript
   const htmlWebpackPlugin = require('html-webpack-plugin')

   module.exports = {
    	module: {...},
   	plugins: [
       new htmlWebpackPlugin({
         title: '我是自定义title',
         template: "./index.html" // 也可以指定 一个 html 模板文件进行渲染
       })
     ]
   }
   ```

3. 安装 `dev-serve`插件

   ```javascript
   npm install webpack-dev-server -D
   ```

4. 修改`package.json`，增加脚本

   ```javascript
    "scripts": {
      	...
       "start": "webpack serve --open"
     },
   ```

5. 运行`npm run start`，可以看到自动打开浏览器，并且当文件内容更新后，页面内容进行自动更新

### 4.3 其他

1. `clean-webpack-plugin`

   - 安装命令：`npm install clean-webpack-plugin -D`

   - 修改配置文件`package.json`引入

     ```javascript
     const {CleanWebpackPlugin} = require('clean-webpack-plugin')

     module.exports = {
       ...
       plugins: [
         ...,
         new CleanWebpackPlugin(),
       ]
     }
     ```

2. `resolve `

   - 用来设置引用模块

   - 示例

     - ```javascript
       module.exports = {
         ....,
         resolve: {
            extensions: ['.ts', '.js'],
         }
       }
       ```

### 4.4 使用 babel

1. 安装命令

   ```shell
   npm install @babel/core @babel/preset-env babel-loade core-js -D
   ```

2. 更改`package.json`中的 `rules`选项

   ```javascript
   ...
   module.exports = {
     ...
     rule: [
        {
           // test 指定生效的文件规则
           test: /\.ts$/,
           // 要使用的 loader
           use: [
             {
               // 指定加载器k
               loader: 'babel-loader',
               // 设置 babel
               options: {
                 // 设置自定义的环境
                 presets: [
                   [
                     '@babel/preset-env',
                     // 指定环境的插件
                     {
                       targets: {
                         chrome: '58',
                         ie: '11'
                       },
                       corejs: '3',
                       // 使用 corejs 的方式 为 usage,表示按需加载
                       useBuiltIns: 'usage',
                     },
                   ],
                 ],
               },
             },
             'ts-loader',
           ], // 加载器的执行顺序是
           // 要指定排除的文件夹
           exclude: /node_modules/,
         },
     ]
     ...
   }
   ```

3. 默认`webpack`打包会产生一个箭头函数进行包裹代码，如果你不想可以参考如下设置进行调整

   ```javascript
   // 参考相关如下配置项
   module.exports = {
     output: {
       environment: {
         // The environment supports arrow functions ('() => { ... }').
         arrowFunction: true,
         // The environment supports BigInt as literal (123n).
         bigIntLiteral: false,
         // The environment supports const and let for variable declarations.
         const: true,
         // The environment supports destructuring ('{ a, b } = obj').
         destructuring: true,
         // The environment supports an async import() function to import EcmaScript modules.
         dynamicImport: false,
         // The environment supports 'for of' iteration ('for (const x of array) { ... }').
         forOf: true,
         // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
         module: false,
         // The environment supports optional chaining ('obj?.a' or 'obj?.()').
         optionalChaining: true,
         // The environment supports template literals.
         templateLiteral: true,
       },
     },
   }
   ```

## 5、面向对象

面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然，面向对象很简单，简而言之就是程序之中所有的操作都需要通过对象来完成。

- 举例来说
  - 操作浏览器要使用 window 对象
  - 操作网页要使用 document 对象
  - 操作控制台要使用 console 对象

一切操作都通过对象，也就是所谓的面向对象，那么对象到底是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体骑车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变为了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能，数据在对象中被称为属性，而功能被称为方法。所以简而言之，在程序中一切皆是对象。

### 5.1 类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须先定义类，所谓的类可以理解为对象的模型，程序中可以已根据创建指定类型的对象，举例来说：可以通过 Person 类创建人的对象，通过 Dog 类创建狗的对象，通过 Car 来创建汽车的对象，不同的类可以用来创建不同的对象

- 定义类

  ```javascript
  class 类名 {
    属性名: 类型
    constructor(参数: 类型) {
      this.属性名 = 参数
    }
    方法名() {}
  }
  ```

- 示例

  ```javascript
  /*
  	直接定义的属性是实例属性，需要通过对象的实例去访问
  		const person = new Person("孙悟空")

    使用 static 开头的属性是静态属性(类属性)，可以直接通过类去访问
    Person.gener

    readonly 表示一个只读的属性，无法修改
  */
  class Person {
    name: string
    age: number

    static gender = "男"
    static readonly magic = '72般变化'

    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }

    sayHello() {
      console.log('hello say')
    }
  }
  ```

### 5.2 构造函数和 this

```javascript
class Dog {
  name: string
  age: number

  constructor(name: string, age: number) {
    // 在实例方法中，this 指的是当前的实例
    // 在构造函数中当前函数就是当前新建的那个对象
    // 可以通过 this 向新建的对象中添加属性
    this.name = name
    this.age = age
  }

  bark() {
    // 在方法中可以通过 this 来表示当前调用方法的对象
    console.log('汪汪汪')
  }
}

const dog = new Dog('孙悟空', 500)
const dog2 = new Dog('猪八戒', 300)

console.log(dog)
console.log(dog2)
```

### 5.3 继承简介

1. 未使用继承时

   ```javascript
   class Dog {
     name: string
     age: number

     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }

     sayHello() {
       console.log('汪汪汪')
     }
   }
   const dog = new Dog('旺财', 5)
   console.log(dog)
   dog.sayHello()

   class Cat {
     name: string
     age: number

     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }

     sayHello() {
       console.log('喵喵喵')
     }
   }

   const cat = new Cat('咪咪', 3)
   console.log(cat)
   cat.sayHello()

   // 发现有大量共同的逻辑处
   ```

2. 使用继承时

   - _使用继承类后，子类将拥有父类所有的方法和属性_
     - _通过继承可以将多个类中共有的代码写在一个父类中_
     - _这样只需写一次即可让所有的子类都同时拥有父类中的属性和方法_
   - _如果希望在子类中天津爱一些父类中没有的属性或者方法，直接添加即可_
   - _如果在子类中添加了和父类相同的方法，则子类方法会覆盖父类_
     - _这种子类覆盖掉父类的方法的形式，我们叫做重写_

   ```javascript
   class Animal {
     name: string
     age: number

     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }

     sayHello() {
       console.log('动物叫')
     }
   }

   // 定义一个表示狗的类
   // 使 Dog 类 继承 Animal 类, Animal 被称为父类
   class Dog extends Animal {
     run() {
       console.log(this.name + '正在跑')
     }

     sayHello(): void {
       console.log('汪汪汪')
     }
   }

   // 定义一个表示猫的类
   // 使 Cat 类 继承 Animal 类
   class Cat extends Animal {
     sayHello(): void {
       console.log('喵喵喵')
     }
   }

   const dog = new Dog('旺财', 5)
   console.log(dog)
   dog.sayHello()
   dog.run()

   const cat = new Cat('咪咪', 3)
   console.log(cat)
   cat.sayHello()
   ```

### 5.4 super 关键字

- _在类的方法中 super 就表示当前类的父类_

- _如果子类中写了构造函数 constructor 在子类构造函数中必须对父类构造函数进行调用_

- 示例

  ```javascript
  class Animal {
    name: string

    constructor(name: string) {
      this.name = name
    }

    sayHello() {
      console.log('动物叫')
    }
  }

  class Dog extends Animal {
    age: number
    gender: number

    constructor(name: string, age: number, gender: number) {
      //  如果子类中写了构造函数 constructor 在子类构造函数中必须对父类构造函数进行调用
      super(name) //  这里就是在调用父类构造函数并传参
      this.age = age
      this.gender = gender
    }
    run() {
      console.log(this.name + '正在跑')
    }

    sayHello(): void {
      // 在类的方法中 super 就表示当前类的父类
      super.sayHello()
      console.log('汪汪汪')
    }
  }

  const dog = new Dog('旺财', 5, 1)
  console.log(dog)
  dog.sayHello()
  dog.run()
  ```

### 5.5 抽象类

- _以 abstract 开头是抽象类_

  - _抽象类和其他类区别不大，只是不能用来创建对象_
  - _抽象类就是专门用来被继承的类_

- _抽象类可以添加抽象方法_

  - _定义一个抽象方法_
    - _使用 abstract 开头，没有办法体_
    - _抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写_

- 代码演示

  ```javascript
  abstract class Animal {
    name: string

    constructor(name: string) {
      this.name = name
    }

    // 定义一个抽象方法
    abstract sayHello(): void
  }

  class Dog extends Animal {
    // 不定义 sayHello 方法会报错
    sayHello(): void {
      console.log('汪汪汪')
    }
  }

  const dog = new Dog('旺财')
  console.log(dog)
  dog.sayHello()
  ```

### 5.6 接口

- _接口用来定义一个类结构, 用来定义一个类中应该包含哪些属性和方法_
- _同时接口也可以当成类型声明去使用_
- _interface 接口可以重复声明，type 声明类型不能重复_
- _接口可以在定义类的时候去限制类的结构_
  - _接口中的所有属性都不能有实际的值_
  - _接口只定义对象的结构，而不考虑实际值_
  - _在接口中所有的方法都是抽象方法_
- _定义一个类时候，可以使类去实现一个接口_，_实现接口就是使类满足接口的要求_

- 代码如下

  ```javascript
  interface myInterface {
    name: string
    age: number
  }

  interface myInterface {
    gender: string
  }

  const obj: myInterface = {
    name: '孙悟空',
    age: 500,
    gender: '男',
  }

  // 接口可以在定义类的时候去限制类的结构
  //  接口中的所有属性都不能有实际的值
  // 接口只定义对象的结构，而不考虑实际值
  //      在接口中所有的方法都是抽象方法

  interface myInter {
    name: string
    sayHello(): void
  }

  // 定义一个类时候，可以使类去实现一个接口
  //   实现接口就是使类满足接口的要求
  class MyClass implements myInter {
    name: string
   	constructor(name: string) {
      this.name = name
    }

    sayHello() {
      console.log('大家好')
    }
  }
  ```

- _接口类似于抽象类，不过接口中只能定义抽象方法，而抽象类中可以做具体实现，也可以不做具体实现_

### 5.7 属性的封装

- _TS 可以在属性前添加属性的修饰符_

- _public 修饰的属性可以在任意位置访问（修改）默认值是 public_
- _private 私有属性，私有属性只有在类的内部进行访问（修改）_
  - _可以在类中添加方法使得私有属性可以被外部访问_
- _protected 受包含的属性，只能在当前类和当前类的子类中访问（修改）_

- _TS 中设置 getter setter 方法的方式_

  - _getter 方法用来读取属性_
  - _setter 方法用来设置属性_

- _可以直接将属性定义在 构造函数 constructor 属性中_

- 代码如下

  ```javascript
  // 定义一个表示人的类
    class Person {
      // TS 可以在属性前添加属性的修饰符
      //      public 修饰的属性可以在任意位置访问（修改）默认值是 public
      //      private 私有属性，私有属性只有在类的内部进行访问（修改）
      //              可以在类中添加方法使得私有属性可以被外部访问
      //      protected 受包含的属性，只能在当前类和当前类的子类中访问（修改）
      private _name: string
      _age: number

      constructor(name: string, age: number) {
        this._name = name
        this._age = age
      }
      /**
       *  getter方法用来读取属性
       *  setter方法用来设置属性
       *
       */

      // 定义一个方法获得 name 属性
      getName() {
        return this._name
      }

      // 定义一个方法用来设置 name 属性
      setName(val: string) {
        this._name = val
      }

      // TS 中设置 getter 方法的方式
      get name() {
        return this._name
      }

      set name(val: string) {
        this._name = val
      }
    }

    // 目前属性是在对象中设置的，属性可以任意的被更改
    //         属性可以任意被修改，将会导致对象中的数据变得非常不安全
    const per = new Person('孙悟空', 500)
    // per._name = '猪八戒' // 这里报错
    per._age = 300
    // 获得 name 属性
    per.setName('猪八戒')
    console.log(per.getName())

    // 通过 get 前缀修饰后可以通过如下方式获取name 属性
    console.log(per.name)
    per.name = '沙悟净'
    console.log(per.name)
  ```

- `protected` 属性如下作用

  ```javascript
  class A {
    protected number: string
    constructor(num: string) {
      this.number = num
    }
  }

  class B extends A {
    text() {
      console.log(this.number)
    }
  }

  const bPer = new B('我是number')
  bPer.text()
  // console.log(b.number) // 因为number 是 protected 不能直接实力访问，报错
  ```

- 书写属性语法糖

  ```javascript
  class C {
    // 可以直接将属性定义在 构造函数 constructor 属性中
    constructor(public name: string, public age: number) {}
  }
  const c = new C('猪八戒', 300)
  console.log(c.name, c.age)
  // 与 如下代码是一样的效果
  class C {
    name: string
    age: number
    // 可以直接将属性定义在 构造函数 constructor 属性中
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  }
  const c = new C('猪八戒', 300)
  console.log(c.name, c.age)
  ```

### 5.8 泛型

- _在定义函数或者类时，如果遇到类型不明确就可以使用泛型_

- _可以直接调用具有泛型的函数_

  - _不指定泛型，TS 可以自动对类型进行推断_
  - _指定泛型_

- 泛型也可以继承接口类型

- 示例

  ```javascript
  function fn(a: number): number {
    return a
  }

  /**
   * 在定义函数或者类时，如果遇到类型不明确就可以使用泛型
   *
   */

  function fn2<K>(a: K): K {
    return a
  }

  // 可以直接调用具有泛型的函数
  fn2(20) // 不指定泛型，TS可以自动对类型进行推断
  fn2<string>('hello') // 指定泛型

  //  泛型也可以指定多个
  function fn3<T, K>(a: T, b: K): T {
    return a
  }
  fn3<number, string>(123, 'hello')

  interface Inter {
    length: number
  }
  function fn4<T extends Inter>(a: T): number {
    return a.length
  }
  fn4('1223')
  fn4({ length: 10 })

  class MyClass<T> {
    name: T

    constructor(name: T) {
      this.name = name
    }
  }
  const mc = new MyClass<string>('孙悟空')
  ```
