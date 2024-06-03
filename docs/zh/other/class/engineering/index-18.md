# 18-工程化脚手架：高阶实战——Babel 工程化实战+React 插件开发

## 01: React 项目运行原理解析

新建`react-origin.html`，内容如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <body>
    <!-- 1、引入React 依赖 -->
    <div id="container"></div>
  </body>
  <script>
    const createElement = React.createElement
    // 2. 创建 React 组件
    function Container() {
      return createElement(
        'h1',
        {
          onClick: () => {
            alert('hello')
          },
        },
        'hello react',
      )
    }
    // 3. 生成 VDOM
    const container = document.getElementById('container')
    const root = window.ReactDOM.createRoot(container)
    // 4. 渲染VDOM
    root.render(createElement(Container))
  </script>
</html>
```

## 02: ReactHooks状态管理+组件化

###  转态管理

> 使用 useEffect useState

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <body>
    <!-- 1、引入React 依赖 -->
    <div id="container"></div>
  </body>
  <script>
    const createElement = React.createElement
    const { useEffect, useState } = React
    // 2. 创建 React 组件
    function Container() {
      const [name, SetName] = useState('唐僧')
      const [init, setInit] = useState(true)
      useEffect(() => {
        if (!init) {
          SetName('猪八戒')
        }
      }, [init])
      return createElement(
        'h1',
        {
          onClick: () => {
            setInit(false)
          },
        },
        'hello ' + name,
      )
    }
    // 3. 生成 VDOM
    const container = document.getElementById('container')
    const root = window.ReactDOM.createRoot(container)
    // 4. 渲染VDOM
    root.render(createElement(Container))
  </script>
</html>
```

###  组件化

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <body>
    <!-- 1、引入React 依赖 -->
    <div id="container"></div>
  </body>
  <script>
    const createElement = React.createElement
    const { useEffect, useState } = React
    // 2. 创建 React 组件
    function Button() {
      return createElement(
        'button',
        {
          key: 'button',
          onClick: () => {
            alert('i am a button')
          },
        },
        'hello button',
      )
    }
    function Container() {
      const [name, SetName] = useState('唐僧')
      const [init, setInit] = useState(true)
      useEffect(() => {
        if (!init) {
          SetName('猪八戒')
        }
      }, [init])
      return createElement(
        'h1',
        {
          onClick: () => {
            setInit(false)
          },
        },
        'hello ' + name,
        //  通过 createElement 来使用组件
        createElement(Button),
      )
    }
    // 3. 生成 VDOM
    const container = document.getElementById('container')
    const root = window.ReactDOM.createRoot(container)
    // 4. 渲染VDOM
    root.render(createElement(Container))
  </script>
</html>

```

## 03：ReactJSX+Babel开发模式

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useEffect, useState } = React
      function MyApp() {
        return <h1 onClick={() => alert(123)}>Hello, world!</h1>
      }

      function Container() {
        const [name, SetName] = useState('唐僧')
        const [init, setInit] = useState(true)
        useEffect(() => {
          if (!init) {
            SetName('猪八戒')
          }
        }, [init])
        return (
          <div onClick={() => setInit(false)}>
            <div> hello {name}</div>
            <MyApp />
          </div>
        )
      }

      const container = document.getElementById('root')
      const root = ReactDOM.createRoot(container)
      root.render(<Container />)
    </script>
  </body>
</html>
```

## 04: ReactBabel生产环境编译

1. 新建`index-04`文件夹，执行终端初始化

   ```bash
   npm init -y
   ```

2. 安装相关依赖

   ```bash
   npm install babel-cli babel-preset-react-app -D
   ```

3. 新建`index.html`结果如下

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <title>ReactJSX+Babel 开发模式</title>
       <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
       <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
       <!-- Don't use this in production: -->
       <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
     </head>
     <body>
       <div id="root"></div>
     </body>
     <script type="text/babel" src="./src/index.js"></script>
   </html>
   ```

4. 新建`src/index.js`文件，内容如下

   ```javascript
   const { useEffect, useState } = React
   function MyApp() {
     return <h1 onClick={() => alert(123)}>Hello, world!</h1>
   }
   
   function Container() {
     const [name, SetName] = useState('唐僧')
     const [init, setInit] = useState(true)
     useEffect(() => {
       if (!init) {
         SetName('猪八戒')
       }
     }, [init])
     return (
       <div onClick={() => setInit(false)}>
         <div> hello {name}</div>
         <MyApp />
       </div>
     )
   }
   
   const container = document.getElementById('root')
   const root = ReactDOM.createRoot(container)
   root.render(<Container />)
   ```

5. 此时如果运行`index.html`至浏览器中，就可以看到正常结果

6. 但是目前使用的`index.html`引入`script`的标签中需要写入`type="text/babel"`显然不太合适，我们可以使用以下方式进行转换

7. 终端中运行如下命令(运行 JSX 预处理器)

   ```bash
    npx babel --watch src --out-dir . --presets react-app/prod
   ```

8. 运行后，就会在根目录下新产生一个`index.js`文件，此文件可以直接被`index.html`页面引入使用

9. 修改`index.html`，更改引入方式

   ```html
   <!-- <script type="text/babel" src="./src/index.js"></script> -->
   <script src="./index.js"></script>
   ```

10. 重新运行`index.html`至浏览器中，效果如常

11. 但是如果里面使用了模块化语法，比如：`src/index.js`中引入了外部的`Button.js`,`babel`并不会做转换，`index.html`中使用如此编译后的`index.js`运行至浏览器中，就会报错

    ```javascript
    import Button from "./Button.js"
    ```

## 05：Babel 编译原理解析

> [Babel 是一个 JavaScript 编译器，官方文档地址](https://babel.docschina.org/)

**babel的三个主要处理步骤：解析parse、转换transform、生成generate**

[babel 编译原理参考文档](https://juejin.cn/post/6844904055945314312)

### 解析

解析步骤接收代码并输出 AST,这个步骤分为两个阶段：**词法分析**、**语法分析**

#### 词法分析

词法分析阶段把字符串形式的代码转换为 **令牌（tokens）** 流。.

#### 语法分析

语法分析阶段会把一个令牌流转换成 AST 的形式。 这个阶段会使用令牌中的信息把它们转换成一个 AST 的表述结构，这样更易于后续的操作。

### 转换

[转换](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FProgram_transformation)步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。 这是 Babel 或是其他编译器中最复杂的过程 同时也是插件将要介入工作的部分

### 生成

[代码生成](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCode_generation_(compiler))步骤把最终（经过一系列转换之后）的 AST 转换成字符串形式的代码，同时还会创建[源码映射（source maps）](https://link.juejin.cn/?target=http%3A%2F%2Fwww.html5rocks.com%2Fen%2Ftutorials%2Fdevelopertools%2Fsourcemaps%2F)。.

代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

## 06：super-tiny-compiler编译器原理分析

> [super-tiny-compiler项目地址](https://github.com/jamiebuilds/the-super-tiny-compiler/tree/master)

1. 可以如下如下两个文件

   ```shell
   - test.js
   - the-super-tiny-compiler.js
   ```

2. 其中`test.js`,代码如下

   ```javascript
   const {
     tokenizer, // token 化
     parser, // 生成 AST
     transformer, // 生成新的 AST
     codeGenerator, // 生成源码
     compiler, // 编译
   } = require('./the-super-tiny-compiler');
   const assert = require('assert');
   
   const input  = '(add 2 (subtract 4 2))';
   const output = 'add(2, subtract(4, 2));';
   
   ```

## 07：super-tiny-compiler编译器之词法解析

## 08：super-tiny-compiler编译器之AST生成

## 09: super-tiny-compiler编译器之AST转换

## 10: Super-tiny-compiler编译器之代码生成

## 11：Babel typescript预设功能详解

## 12：Babel preset混合实现tsx编译

## 13：webpack+babel-loader实现模块化+jsx编译

## 14：CRA项目初始化+react-scripts启动源码分析

## 15：zbestpc项目移植React 

## 16：zbestpc项目集成ReactRouter

## 17：react项目集成工程化脚手架
