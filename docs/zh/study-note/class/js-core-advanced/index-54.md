# 54-ES6 Modules

Create React App 是一个用于学习 React 的集成环境。与此同时，他也是一个学习 ES6 Modules 的舒适环境。因此为了降低学习成本，我们直接使用该环境来学习 ES6 Moduels 语法。

## 1-创建项目

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

项目启动需要花费一点时间，启动之后，通常浏览器会自动打开一个新的页面运行项目，我们也可以在浏览器中输入 http://localhost:3000 来运行项目。

## 2-认识项目

**package.json 与 yarn.lock**

这两个文件是构建工具需要的配置信息与项目依赖包信息。目前暂时不用过多的考虑他们的用处，等之后大家在深入学习构建工具时自然会明白他们的作用。

**node_modules**

项目依赖包的安装目录。当我们创建项目时，会根据配置文件 package.json 中的依赖包信息把所有需要的插件工具模块等都安装在该目录下。

**public**

用于存放静态文件。主要作用是 html 入口文件的存放。我们也可以存放其他公用的静态资源，如图片，css 文件等。其中的 index.html 就是我们项目的入口 html 文件。

**src**

模块与组件的存放目录。在 create-react-app 创建的项目中，每一个单独的文件都可以被看成一个单独的模块，单独的 image，单独的 css，单独 js 等，而所有的组件都存放于 src 目录中，其中 index.tsx 则是 js 的入口文件。虽然我们并没有在 index.html 中使用 script 标签引入它，但是他的作用就和此一样。

项目地址：[点这里](https://github.com/yangbo5207/jsCore/tree/master/6.8.1+模块化语法/my-app)

> typescript 可以通过阅读最后的附录章节学习

> 如果你要直接使用我的项目，则需要先使用 `npm run install` 重新安装依赖才能正常使用

项目中的 `src/index.tsx` 是项目的入口文件，其他的代码我们先不关注，在 src 目录下创建一个新的模块用于学习。

## 3-创建模块

一个 js/ts 文件就是一个单独的模块。模块创建的目的，就是让其他模块能够使用该模块的功能。因此，除了主模块，其他的模块都需要抛出接口，以决定该模块中那些能够可以被其他模块使用。

通过 `export` 关键字可以对外抛出接口。

```javascript
export const name1 = 'TOM'
```

`export` 可以多次使用，抛出多个接口。

```javascript
// module01.js
export const name1 = 'TOM'
export const name2 = 'Jake'
```

当我们在其他模块引入该模块的接口时，如果只需要其中一个接口

```javascript
import { name1 } from './module01'
```

但是如果我们需要引入该模块中所有的对外接口，一种方式是在大括号中将所有的名称都列出来，另外一种方式就是使用通配符与 as 配合。

```javascript
import { name1, name2 } from './module01'

// or 利用别名的方式
import * as module01 from './module01'
// 那么就有
name1 = module01.name1
name2 = module01.name2
```

我们还可以通过 `export default` 来对外提供接口，这种情况下，对外的接口通常都是一个对象。

```javascript
// 修改module01.js
const name1 = 'TOM'
const name2 = 'Jake'

// ES6对象的简写语法
export default {
  name1,
  name2,
}
```

那么，在引入模块时的写法我们需要相应的做一些调整。当模块中有 `export default` 命令抛出接口时，引入模块时就可以直接这样写：

```javascript
import module01 from './module01'
```

此时的 `module01` 就是 `export default` 抛出的对象。

需要注意的是，一个模块中只允许出现一次 `export default`。

不过可以同时拥有多个 `export` 与一个 `export default`。

### **3.1 创建模块 1**

开始尝试使用一些简单的 ts 语法。

```javascript
// src/person.ts
class Person {
  private name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
}

export default Person
```

在其他模块使用

```javascript
// src/index.tsx
import Person from './person'

const p1 = new Person('Tom', 20)
console.log(p1.getName())
```

### **3.2 创建模块 2**

该案例演示多个 `export` 与一个 `export default` 同时存在的情况。

```javascript
// src/person2.ts
export function fn() {
  console.log('this is a function named fn.');
}

export function bar() {
  console.log('hello everybody.');
}

class Person {
  private name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name
  }
}

export default Person;
```

使用时，写法如下

```javascript
import Person2, { fn, bar } from './person2'
```
