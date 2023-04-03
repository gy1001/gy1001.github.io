# 13-compiler 编译器-构建 compile 编译器

## 01: 前言

在上一章节我们了解了 compiler  的作用和大致流程之后，那么这一章节我们将要在 vue-next-mine中实现一个自己的编译器

但是我们知道，compiler  是一个非常复杂的概念，我们无法在有限的课程中实现一个完善的编译器，所以，我们将会和之前一样，严格遵循：**没有使用就当不存在**和**最少代码的实现逻辑**这两个标准。只关注**核心**和**当前业务**相关的内容，而忽略其他

那么明确好了以上内容之后，接下来，就让我们进入编译器的学习把~~~

## 02：扩展知识：JavaScript与有限状态机

我们知道想要实现 compiler  第一步是构建 AST 对象，那么想要构建 AST，就需要利用 [有限状态机](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)的概念

有限状态机也被叫做**有限自动状态机**，表示**有限个[状态](https://zh.wikipedia.org/wiki/状态)以及在这些状态之间的转移和动作等行为的[数学计算模型](https://zh.wikipedia.org/wiki/计算模型_(数学))**。

光看着概念，可能难以理解，那么下面我们来看一个具体的例子

根据`packages/compiler-core/src/compile.ts`中的代码可知，`ast`对象的生成是通过`baseParse`方法得到的，

而对于`baseParse`方法而言，接收一个`template`作为参数，返回一个`ast`对象

即：**通过 parse方法，解析 template,得到ast  对象**。中键解析的过程，就需要使用到**有限自动状态机**

我们来写如下模板（template)

```html
<div>hello world</div>
```

`vue`想要把改模板解析成`AST`，那么就需要利用有限自动状态机队该模板进行分析，分析的过程中主要包含了三个特性

> 摘自：https://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html
> 1. 状态总数是有限的
> 	1. 初识状态
> 	2. 标签开始状态
> 	3. 标签名称状态
> 	4. 文本状态
> 	5. 结束标签状态
> 	6. 结束标签名称状态
> 	7. 。。。
> 2. 任一时刻，只处在一种状态之中
> 3. 某种条件下，会从一种状态转变为另一种状态
> 	1. 比如，从 1 到 2 意味着从初识状态切换到了标签开始状态

如下图所示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42c6b3e56ccd42da86110967a41f08ff~tplv-k3u1fbpfcp-watermark.image?)

1. 解析`<`：由**初始状态**进入到**标签开始状态**
2. 解析`div`：由**标签开始状态**进入到**标签名称状态**
3. 解析`>`：由**标签名称状态**进入**初始状态**
4. 解析`hello world`：由**初始状态**进入到**文本状态**
5. 解析`<`：由**文本状态**进入到**标签开始状态**
6. 解析`/`：由**标签开始状态**进入到**结束标签状态**
7. 解析`div`：由**结束标签状态**进入**结束标签名称状态**

经过这样一系列的解析，对于

```html
<div>hello world</div>
```

而言，我们将得到三个`token`：

```text
开始标签：<div>
文本标签：hello world
结束标签：</div>
```

而这样一个利用有限状态机的状态迁移，来获取`tokens`的过程，可以叫做：**对模板的标记化**

### 总结

那么这一小节，我们了解了什么是有限自动状态机，也知道了它的三个特性

`vue`利用它来实现了对模板的标记化，得到了对应的`token`

那么这样的一个`tokens`有什么用呢？我们下一个小节再说

## 03：扩展知识：扫描 tokens 构建 AST 结构的方案

在上一小节中，我们已经知道可以通过自动状态机解析模板为`tokens`，那么解析出来的`tokens`就是声场`AST`的关键

生成`AST`的过程，就是**`tokens`扫描的过程**

我们以以下`html`结构为例

```html
<div>
  <p>hello</p>
  <p>world</p>
</div>
```

该`html`可以被解析为以下`tokens`

```text
开始标签：<div>
开始标签：<p>
文本节点：hello
结束标签：</p>
开始标签：<p>
文本节点：world
结束标签：</p>
结束标签：</div>
```

具体的扫描过程为（文档中仅显示初始状态和结束状态）

### 初始状态 

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e38871574ed40a3b1b11383ede9b89d~tplv-k3u1fbpfcp-watermark.image?)

### 结束状态

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d855e474f8f440198334ee3e0b6aca0d~tplv-k3u1fbpfcp-watermark.image?)

在刚才的图示中，我们通过[递归下降算法](https://zh.wikipedia.org/wiki/递归下降解析器)这样的一种扫描形式把`tokens`解析**栈**解析成了`AST(抽象语法树)`

## 04:源码阅读：编译器第一步：依据模板，生成 AST 抽象语法树

通过上一下节的学习我们知道，生成`AST`抽象语法树是在`packages/compile-core/src/compile.ts`中的第 85 行` const ast = isString(template) ? baseParse(template, options) : template`生成的

而当`template`是字符串时就会调用`baseParse`这个函数，根据这个方法来生成对应的`AST`。

那么我们直接进入这个方法中，这个方法位于`vue-next-3.2.37/packages/compiler-core/src/parse.ts`这个文件中，我们可以看到这个文件之中有 1000 多行代码，这也证明了 AST 的生成在内部其实是一个非常复杂的过程，并且里面包含了很多边缘性的处理

所以我们再去看这一块的逻辑，同样会按照之前的方式，只关注当前业务下的逻辑，忽略掉其他逻辑，以此来降低整体复杂度。

通过`packages/compile-core/src/compile.ts`中的`baseCompile`方法可以知道，整个`parse`的过程是从`baseParsr`开会的，所以我们可以直接从这个方式进行开始`debugger`

新建测试示例`vue-next-3.2.37/packages/vue/examples/mine/compiler/compiler-ast.html`，内容如下

```html
<script>
  const { compile } = Vue
  // 创建 template
  const template = `<div>hello world</div>`
  // 生成 render 函数
  const renderFn = compile(template)
</script>
```

当前对应的`template`对应的目标极简`AST`为（这意味着我们将不再关注其他的属性生成）

```javascript
const ast = {
  "type": 0,
  "children": [
    {
      "type": 1,
      "tag": "div",
      "tagType": 0,
      // 属性，目前我们没有做任何处理，但是需要添加上，否则，生成的ast放到vue源码中会抛出错误
      "props": [],
      "children": [
        { "type": 2, "content": " hello world "}
      ]
    }
  ],
  // loc: 位置，这个属性并不影响渲染，但是它必须存在，否则会报错，所以我们给了他一个 {}
 "loc": {}
}
```

模板解析的`token`流程为(以`<div> hello world</div>`为例)：

```text
1. <div
2. >
3. hello world
4. </div
5. >
```

由以上代码可知

1. 整个 AST 生成的核心方法是 parseChildren 方法
2. 生成的过程是，对于整个 template: `<div>hello world</div>`进行了解析，整个解析分为 5 步（第二小节的讲解）
   1. **第一次解析**：`<div`：此时`context.srouce = >hello world</div>`
   2. **第二次解析**：`>`：此时`context.srouce = hello world</div>`
   3. **第三次解析**：`hello world`：此时`context.srouce = </div>`
   4. **第四次解析**：`</div`：此时`>`
   5. **第五次解析**：`>`：此时`context.srouce = ""`

3. 在这个解析过程中，我们逐步扫描(第三小节的讲解)对应的每次`token`，得到一个对应的`AST`对象

`vue`源码中的`parse`逻辑是非常复杂的，我们当前只是针对`<div>hello world</div>`这一种类型的`element`类型进行处理

其他的比如`<pre>、<img />`这些标签类型的处理，大家可以根据本小节的内容，自己进行测试，我们在课程中就不会一一进行讲解了

## 05：框架实现：构建 parse 方法，生成 context 方法

从这一小节开始，我们将实现 vue-next-mini 中的编辑器模块。首先我们第一步要做的就是先生成 AST 对象。但是我们知道 AST 对象的生成颇为复杂，所以我们把整个过程分为三步进行处理

1. 构建 parse 方法，生成 context 实例
2. 构建 parseChildren, 处理所有子节点(**最复杂**)
   1. 构建有限自动状态机解析模板
   2. 构建 token 生成 AST 结构

那么本小节，我们先处理第一步

1. 创建`packages/compiler-core/src/compile.ts`模板，写入如下代码

   ```typescript
   import { baseParse } from './parse'
   
   export function baseCompile(template: string, options) {
     const ast = baseParse(template)
     console.log(JSON.stringify(ast))
     return {}
   }
   ```

2. 新建`packages/compiler-core/src/parse.ts`文件，内容如下

   ```typescript
   export interface ParserContext {
     source: string
   }
   
   function createParserContext(content: string): ParserContext {
     return {
       source: content
     }
   }
   
   export function baseParse(content: string) {
     const context = createParserContext(content)
     console.log(context)
     return {}
   }
   ```

3. 创建`packages/compiler-dom/src/index.ts`模块，导出`compile`方法

   ```typescript
   import { baseCompile } from 'packages/compiler-core/src/compile'
   
   export function compile(template: string, options) {
     return baseCompile(template, options)
   }
   ```

4. `vue-next-mini/packages/vue/src/index.ts`中，导出`compile`方法

   ```typescript
   export { compile } from '@vue/compiler-dom'
   ```

5. 新建测试示例`vue-next-mini/packages/vue/example/compile/compiler-ast.html`，内容如下

   ```html
   <script>
     const { compile } = Vue
     const template = `<div>hello world</div>`
     const renderFn = compile(template)
   </script>
   ```

6. 运行测试示例，可以看到如下打印

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbadb3ba729340fd8d1afd715cd0f95a~tplv-k3u1fbpfcp-watermark.image?)

## 06：框架实现：构建有限自动状态机解析模板，扫描 token 生成 AST 结构

上一节中我们成功拿到了上下文对象`context`,这一节我们就要通过`parseChildren`方法处理所有的子节点，整个处理的过程可以分为两大块：

1. 构建有限自动状态机解析模板
2. 扫描`token`生成`AST`结构

接下里我们来进行实现

1. `baseParse`方法中调用`parseChildren`方法

   ```typescript
   export function baseParse(content: string) {
     const context = createParserContext(content)
     const children = parseChildren(context, []) // 新增加
     console.log(children)
     return {}
   }
   ```

2. 创建`parseChildren`方法

   ```typescript
   import { ElementTypes, NodeTypes } from './ast'
   
   export interface ParserContext {
     source: string
   }
   
   enum TagType {
     Start,
     End
   }
   
   // ancestors 是一个 elementNode 节点数组
   function isEnd(context: ParserContext, ancestors) {
     const s = context.source
     // 如果是 </ 为开始
     if (startsWith(s, '</')) {
       // TODO: probably bad performance
       for (let i = ancestors.length - 1; i >= 0; --i) {
         if (startsWithEndTagOpen(s, ancestors[i].tag)) {
           return true
         }
       }
     }
     return !s
   }
   
   // 是否以打开标签的结束标签为开始
   function startsWithEndTagOpen(source: string, tag: string): boolean {
     return (
       startsWith(source, '</') &&
       source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
     )
   }
   
   function startsWith(source: string, searchString: string): boolean {
     return source.startsWith(searchString)
   }
   
   function parseChildren(context: ParserContext, ancestors) {
     const nodes = []
     // while 循环，直到最后是一个结束标签
     while (!isEnd(context, ancestors)) {
       const s = context.source
       let node
       if (startsWith(s, '{{')) {
         // TODO: {{}}
       } else if (s[0] === '<') {
         if (/[a-z]/i.test(s[1])) {
           node = parseElement(context, ancestors)
         }
       }
       // 如果上面的判断没有进入，那node就是空的，说明此时内容是 文本
       if (!node) {
         node = parseText(context)
       }
       pushNodes(nodes, node)
     }
     return nodes
   }
   
   // 把 node 放入 nodes
   function pushNodes(nodes, node) {
     nodes.push(node)
   }
   
   // 处理标签节点
   function parseElement(context: ParserContext, ancestors) {
     // 获得当前 tag 元素
     const element = parseTag(context, TagType.Start)
     ancestors.push(element)
     // 处理子节点
     const children = parseChildren(context, ancestors)
     ancestors.pop()
     element.children = children
     if (startsWithEndTagOpen(context.source, element.tag)) {
       parseTag(context, TagType.End)
     }
     return element
   }
   
   // 处理文本节点（静态文本节点），所以以 < 或者 {{ 为最后的一个位置处理，
   function parseText(context: ParserContext) {
     const endTokens = ['<', '{{']
     // 先创建当前文本节点的最后索引位置是 当前字符串的长度
     let endIndex = context.source.length
     // 如果有找到 上面两种类型的索引位置，并且位置索引小于 endIndex,就更新这个最后的索引位置 endIndex
     for (let index = 0; index < endTokens.length; index++) {
       const j = context.source.indexOf(endTokens[index], 1)
       if (j !== -1 && endIndex > j) {
         endIndex = j
       }
     }
     // 截取获得当前文本
     const content = parseTextData(context, endIndex)
     return {
       type: NodeTypes.TEXT,
       content
     }
   }
   
   // 按照长度截取当前文本，把字符串进行截取
   function parseTextData(context: ParserContext, length: number) {
     const rawText = context.source.slice(0, length)
     advanceBy(context, length)
     return rawText
   }
   
   // 按照长度，对当前上下文中的 source 进行截取
   function advanceBy(context: ParserContext, numberOfCharacters) {
     context.source = context.source.slice(numberOfCharacters)
   }
   
   // 解析标签，
   function parseTag(context: ParserContext, type: TagType) {
     // 通过 context.source  解析出 tag 名字
     const match: any = /^<\/?([a-z][^\r\n\t\f />]*)/i.exec(context.source)
     const tag = match[1]
     advanceBy(context, match[0].length)
     let isSelfClosing = startsWith(context.source, '/>') // 是否是自闭合标签
     // 如果是闭合标签，就需要在往后截取2位，否则就是1位
     advanceBy(context, isSelfClosing ? 2 : 1)
   
     return {
       type: NodeTypes.ELEMENT,
       tag: tag,
       tagType: ElementTypes.ELEMENT,
       props: [],
       children: []
     }
   }
   ```

3. 创建`ast.ts`，内容如下

   ```typescript
   export const enum NodeTypes {
     ROOT,
     ELEMENT,
     TEXT,
     COMMENT,
     SIMPLE_EXPRESSION,
     INTERPOLATION,
     ATTRIBUTE,
     DIRECTIVE,
     // containers
     COMPOUND_EXPRESSION,
     IF,
     IF_BRANCH,
     FOR,
     TEXT_CALL,
     // codegen
     VNODE_CALL,
     JS_CALL_EXPRESSION,
     JS_OBJECT_EXPRESSION,
     JS_PROPERTY,
     JS_ARRAY_EXPRESSION,
     JS_FUNCTION_EXPRESSION,
     JS_CONDITIONAL_EXPRESSION,
     JS_CACHE_EXPRESSION,
   
     // ssr codegen
     JS_BLOCK_STATEMENT,
     JS_TEMPLATE_LITERAL,
     JS_IF_STATEMENT,
     JS_ASSIGNMENT_EXPRESSION,
     JS_SEQUENCE_EXPRESSION,
     JS_RETURN_STATEMENT
   }
   
   export const enum ElementTypes {
     ELEMENT,
     COMPONENT,
     SLOT,
     TEMPLATE
   }
   ```

4. 重新运行浏览器，可以看到如下打印效果(`parseChildren(context, [])`的返回值)

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98324f74245b4cc5b93efc19f4668d48~tplv-k3u1fbpfcp-watermark.image?)

## 07：框架实现：生成AST，构建测试

接下来我们就需要处理上节返回的一个`chilren`，我们需要返回一个带有根节点的内容

1. 增加并调用`createRoot`方法

   ```typescript
   export function createRoot(children) {
     return {
       type: NodeTypes.ROOT,
       children,
       loc: {}
     }
   }
   
   export function baseParse(content: string) {
     const context = createParserContext(content)
     const children = parseChildren(context, [])
     return createRoot(children) // 返回 createRoot 处理后的对象
   }
   ```

2. 这时重新运行打印，结果如下（`baseCompile中的console.log(JSON.stringify(ast))`）

   ```json
   {
     "type": 0,
     "children": [
       {
         "type": 1,
         "tag": "div",
         "tagType": 0,
         "props": [],
         "children": [
           {
             "type": 2,
             "content": "hello world"
           }
         ]
       }
     ],
     "loc": {}
   }
   ```

3. 怎么样验证这个结构是否正确呢？我们修改`vue-next-3.2.37/packages/vue/dist/vue.global.js`中的`ast`生成内容，然后修改为

   ```javascript
   // const ast = isString(template) ? baseParse(template, options) : template;
   const ast = {
     type: 0,
     children: [
       {
         type: 1,
         tag: 'div',
         tagType: 0,
         props: [],
         children: [{ type: 2, content: 'hello world test' }]
       }
     ],
     loc: {}
   }
   ```

4. 这样先把`ast`生成内容修改成我们在第2步中生成的相似的任意内容，然后创建测试示例`ue-next-3.2.37/packages/vue/examples/mine/compiler/compile-ast-test.html`

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
     <script src="../../../dist/vue.global.js"></script>
     <script>
       const { compile, render, h } = Vue
       const template = `
             <div>hello world</div>
           `
       const renderFn = compile(template)
       const component = {
         render: renderFn
       }
       const vnode = h(component)
       render(vnode, document.querySelector('#app'))
     </script>
   </html>
   ```

5. 运到到浏览器中，可以看到页面中正常渲染出来了`hello world test`内容

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8b2a567e0ee401b9ed6823e59899424~tplv-k3u1fbpfcp-watermark.image?)

## 08：扩展知识：AST 到 JavaScript AST 的转化策略和注意事项

在生成了`AST`之后，我们知道接下来就需要把`AST`转换为`JavaScript AST`了。但是在转化过程中，有一些对应的策略和注意事项，我们需要再本小节中进行描述

### 转换策略

我们知道从`AST`转换为`JavaScript AST`本质上就是一个对象结构的变化，变化的本质是为了后面更方便的解析对象，生成`render`函数

在转换的过程中，我们需要遵循如下策略

1. 深度优先
2. 转化函数分离
3. 上下文对象

#### 深度优先

我们知道`AST`而言，它是包含层级的，比如

1. 最外层是`ROOT`
2. `children`是根节点
3. 。。。

这样的结构下，就会存在一个自上而下的层级，那么针对这样的一个层级而言，我们需要遵循**深度优先，自上而下**的一个转化方案

因为父节点的状态往往需要根据子节点的情况才能进行确定，比如：

```html
<div>hello world</div>
<div>hello {{msg}}</div>
```

#### 转换函数分离

在处理`AST` 的时候，我们知道，针对不同的 `token`，那么会使用不同的 `parseXXX` 方法进行处理，那么同样的，在 `transfrom` 的过程中，我们也会通过不同的 `transformXXX` 方法进行转化

但是为了防止 `transform` 模块过于臃肿，所以我们会通过 `options` 的方式对 `transformXXX` 方法进行注入(类似于 `render` 的 `option`)

所有注入的方法，会生成一个 `nodeTransFrorms` 数组，通过 `options`  传入

#### 上下文对象

上下文对象即 `context`, 对于上下文对象而言我们并不陌生。比如在 `parse` 时、`setup` 函数中、`vuex` 的 `action`  上，都出现过 `context` 对象

对于 `context` 而言，我们可以把他理解为一个 **全局变量** 或者 **单例的全局变量**，它是一个多模块都可以访问的唯一对象

在 `transform` 的策略中，因为存在**转化函数分离**这样的一个特性，所以我们必须要构建出这样的`context`  对象，用来保存当前节点的 `node` 节点等数据

### 注意事项

说完了转化策略以后，我们来看下注意事项

对于 `transform` 转化方法而言，`vue` 本身的视线非常复杂，比如：指令、{{}}。。。 都会在这里处理

但是对于我们当前而言，我们不需要考虑这些复杂的情况，仅查看最简单的静态数据渲染，以此来简化整体逻辑

## 09： 源码阅读：编译器第二步：转换AST，得到JavaScript AST

这一小节，我们就来看下对应的`transform`逻辑，我们创建如下测试示例



## 10：框架实现：转换 JavaScript AST，构建深度优先

明确好了 transform 的大致逻辑之后，这一小节我们就开始实现以下对应的代码，我们代码的逻辑实现我们分为两个小节来讲

1. 深度优先排序
2. 完成具体的节点转化

这一小节，我们先来完成深度优先排序

1. 在 packages/compiler-core/src/compile.ts  中的 baseCompile 中，增加 transform  的方法触发

   ```typescript
   import { extend } from '@vue/shared'
   import { baseParse } from './parse'
   import { transform } from './transform'
   import { transformElement } from './transform/transformElement'
   import { transformText } from './transform/transformText'
   
   
   export function baseCompile(template: string, options) {
     const ast = baseParse(template)
     // 新增加 transform 函数调用
     transform(
       ast,
       extend(options, {
         nodeTransforms: [transformElement, transformText]
       })
     )
     console.log(JSON.stringify(ast))
     return {}
   }
   ```

2. 创建`packages/compile-core/src/tranforms/transforElement.ts`模块，导出`transformElement`方法

   ```typescript
   // 对 element 节点的转化方法
   export function transformElement(node, context) {
     return function postTransformElement() {}
   }
   ```

3. 创建`packages/compiler-core/src/transforms/transformText.ts`模块，导出`transformText`方法

   ```typescript
   import { NodeTypes } from '../ast'
   
   export function transformText(node, context) {
     if (
       node.type === NodeTypes.ROOT ||
       node.type === NodeTypes.ELEMENT ||
       node.type === NodeTypes.FOR ||
       node.type === NodeTypes.IF_BRANCH
     ) {
       return () => {}
     }
   }
   ```

4. 创建`packages/compiler-core/src/transform.ts`模块，创建`transform`方法

   ```typescript
   import { NodeTypes } from './ast'
   
   // 声明 transform 上下文
   export interface TransformContext {
     // AST  根节点
     root 
     // 每次转化时记录的父节点
     parent: ParentNode | null 
     // 每次转化时记录的子节点索引
     childIndex: number
     // 当前处理的节点
     currentNode
     // 协助创建 JavaScript AST 属性 helpers, 该属性是一个 map,key值为 Symbol(方法名)表示 helper 函数中创建节点的方法
     helpers: Map<symbol, number>
     helper<T extends symbol>(name: T): T
     // 转化方法的集合
     nodeTransforms: any[]
   }
   
   // 创建 transform 上下文
   export function createTransformContext(root, { nodeTransforms = [] }) {
     const context: TransformContext = {
       nodeTransforms,
       root,
       helpers: new Map(),
       currentNode: root,
       parent: null,
       childIndex: 0,
       helper(name) {
         const count = context.helpers.get(name) || 0
         context.helpers.set(name, count + 1)
         return name
       }
     }
     return context
   }
   
   /**
    * 根据 AST 生成 JavaScript AST
    * @param root AST
    * @param options 配置对象
    */
   export function transform(root, options) {
     // 创建 transform 上下文
     const context = createTransformContext(root, options)
     // 按照深度优先依次处理 node 节点转化
     traverseNode(root, context)
   }
   
   // 深度优先
   /**
    * 遍历转化节点，转化的过程中一定是深度优先的（即：孙 -> 子 -> 父) 因为当时节点的状态往往需要根据子节点的情况来确定
    * 转化的过程分为两个阶段
    * 1. 进入阶段：存储所有节点的转化函数到 exitFns  中
    * 2. 退出阶段：执行 exitFns中缓存的函数，且一定是倒序的，因为这样才能保证整个执行过程中是深度优先的
    */
   function traverseNode(node, context: TransformContext) {
     context.currentNode = node
     // apply transform plugins
     const { nodeTransforms } = context
     const exitFns: any = []
     for (let index = 0; index < nodeTransforms.length; index++) {
       const onExit = nodeTransforms[index](node, context)
       if (onExit) {
         exitFns.push(onExit)
       }
     }
     switch (node.type) {
       case NodeTypes.ELEMENT:
       case NodeTypes.ROOT:
         traversChildren(node, context)
         break
     }
     // exit transforms
     context.currentNode = node
     let i = exitFns.length
     while (i--) {
       exitFns[i]()
     }
   }
   
   function traversChildren(parent, context: TransformContext) {
     parent.children.forEach((node, index) => {
       context.parent = parent
       context.childIndex = index
       traverseNode(node, context)
     })
   }
   ```

## 11：构建 transformXXX 方法，转化对应节点

1. 新建`packages/compiler-core/src/transform/transformElement.ts`文件，内容如下

   ```typescript
   import { NodeTypes, createVNodeVall } from '../ast'
   
   export function transformElement(node, context) {
     return function postTransformElement() {
       node = context.currentNode
       // 如果节点不是 ELEMENT 类型直接返回
       if (node.type !== NodeTypes.ELEMENT) {
         return
       }
       const { tag } = node
       let vnodeTag = `"${tag}"`
       let vnodeProps = []
       let vnodeChildren = node.children
   		// 为当前节点增加 codegenNode 属性
       node.codegenNode = createVNodeVall(
         context,
         vnodeTag,
         vnodeProps,
         vnodeChildren
       )
     }
   }
   
   // ast.ts 中增加 createVNodeCall 方法
   export function createVNodeCall(context, tag, props?, children?) {
     if (context) {
       context.helper(CREATE_ELEMENT_VNODE)
     }
     return {
       type: NodeTypes.VNODE_CALL,
       tag,
       props,
       children
     }
   }
   ```

2. 新建`packages/compiler-core/src/transform/transformText.ts`文件，内容如下

   ```typescript
   import { NodeTypes } from '../ast'
   import { isText } from '../utils'
   
   /**
    * 将 相邻的文本节点 和表达式 合并为一个表达式
    * 例如：
    * <div> hello {{ msg }} </div>
    * 上述模板包含两个节点：
    * 1. hello TEXT文本节点
    * 2. {{ msg }} INTERPOLATION 表达式节点
    * 这两个节点在 生成 render 函数时候，需要被合并成 "hello" + _toDisplayString(_ctx.msg)
    * 那么在合并时候需要多出来这个 + 加号
    * 例如：children: [ {TEXT 文本节点}， " + ", { INTERPOLATION 表达式节点 }]
    * @param node
    * @param context
    * @returns
    */
   export function transformText(node, context) {
     if (
       node.type === NodeTypes.ROOT ||
       node.type === NodeTypes.ELEMENT ||
       node.type === NodeTypes.FOR ||
       node.type === NodeTypes.IF_BRANCH
     ) {
       return () => {
         const children = node.children
         let currentContainer
         for (let index = 0; index < children.length; index++) {
           const child = children[index]
           if (isText(child)) {
             for (let j = index + 1; j < children.length; j++) {
               const next = children[j]
               // 如果接下来的节点也是 文本节点
               if (isText(next)) {
                 if (!currentContainer) {
                   currentContainer = children[index] = createCompundExpression(
                     [child],
                     child.loc
                   )
                 }
                 currentContainer.children.push(` + `, next)
                 children.splice(j, 1)
                 j--
               } else {
                 // 如果第一个节点是 text 第二个节点不是 text 则不需要合并
                 currentContainer = undefined
                 break
               }
             }
           }
         }
       }
     }
   }
   
   export function createCompundExpression(children, loc) {
     return {
       type: NodeTypes.COMPOUND_EXPRESSION,
       loc,
       children
     }
   }
   
   // 新建 utils.ts 文件
   import { NodeTypes } from './ast'
   export function isText(node) {
     return node.type === NodeTypes.INTERPOLATION || node.type === NodeTypes.TEXT
   }
   ```

## 12：框架实现：处理根节点的转化，生成 JavaScript AST

1. 修改`transform.ts`中的 `transform`方法

   ```typescript
   import { isSingleElementRoot } from './transform/hoistStatic'
   
   export function transform(root, options) {
     const context = createTransformContext(root, options)
     traverseNode(root, context)
     // 处理根节点
     createRootCodegen(root)
     root.helpers = [...context.helpers.keys()]
     root.components = []
     root.directives = []
     root.imports = []
     root.hoists = []
     root.temps = []
     root.cached = []
   }
   
   function createRootCodegen(root) {
     const { children } = root
     // vue2 仅支持单个根节点
     if (children.length === 1) {
       const child = children[0]
       if (isSingleElementRoot(root, child) && child.codegenNode) {
         root.codegenNode = child.codegenNode
       }
     }
     // vue3 支持多个根节点
   }
   ```

2. 新建文件`transform/hoistStatic.ts`文件，内容如下

   ```typescript
   import { NodeTypes } from '../ast'
   
   export function isSingleElementRoot(root, child) {
     const { children } = root
     return children.length === 1 && child.type === NodeTypes.ELEMENT
   }
   ```

3. 打开测试示例`/packages/vue/examples/compiler/compiler-ast.html`，内容如下

   ```html
    <script>
     const { compile } = Vue
     const template = `<div>hello world</div>`
     const renderFn = compile(template)
   </script>
   ```

4. 运行浏览器，查看打印结果

   > 注意：baseCompile 方法中的打印代码: console.log(ast); console.log(JSON.stringify(ast))

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c878cb152da4676942b90bbaff0043d~tplv-k3u1fbpfcp-watermark.image?)

5. 怎么样验证这个结果对吗，我们在`vue-next-3.2.37/packages/compiler-core/src/compile.ts`中修改代码

   ```typescript
   import { CREATE_ELEMENT_VNODE } from './runtimeHelpers'
   
   export function baseCompile(
     template: string | RootNode,
     options: CompilerOptions = {}
   ): CodegenResult {
   	...
     
     // 第一个参数结构与上面浏览器打印结果结构保持一致
     return generate(
       {
         type: 0,
         children: [
           {
             type: 1,
             tag: 'div',
             tagType: 0,
             props: [],
             children: [{ type: 2, content: 'hello world111' }],
             codegenNode: {
               type: 13,
               tag: '"div"',
               props: [],
               children: [{ type: 2, content: 'hello world111' }]
             }
           }
         ],
         loc: {},
         codegenNode: {
           type: 13,
           tag: '"div"',
           props: [],
           children: [{ type: 2, content: 'hello world111' }]
         },
         // 注意：这里 JSON.stringify 后，是 null, 需要我们手动更改引入
         helpers: [CREATE_ELEMENT_VNODE],
         components: [],
         directives: [],
         imports: [],
         hoists: [],
         temps: [],
         cached: []
       },
   
       extend({}, options, {
         prefixIdentifiers
       })
     )	
   }
   ```

6. 在源码项目中运行命令:`npm run dev`

7. 运行源码`vue-next-3.2.7`中的测试示例，内容如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body>
       <div id="app"></div>
     </body>
     <script src="../../../dist/vue.global.js"></script>
     <script>
       const { compile, render, h } = Vue
       const template = `
             <div>hello world</div>
           `
       const renderFn = compile(template)
       const component = {
         render: renderFn
       }
       const vnode = h(component)
       render(vnode, document.querySelector('#app'))
     </script>
   </html>
   ```

8. 可以看到页面中正确显示了文本内容

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87ff1f1229f84f97b2eb697e8b88e07e~tplv-k3u1fbpfcp-watermark.image?)



## 13：扩展知识：render 函数的生成方案 





