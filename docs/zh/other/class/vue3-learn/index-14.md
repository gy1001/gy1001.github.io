# 14-compiler 编译器 - 深入编辑器处理逻辑（困难）

## 01:前言

上一章中，我们处理了基础的编译器，但是针对于一些复杂的场景

1. 响应性数据
2. 多个子节点
3. 指令

我们还没有办法进行对应的处理

那么对于本章，我们将会深入编译器，来了解更加复杂的编译处理

因为我们前面已经查看很多的 vue 源码逻辑，多以对于本章节而言，我们不会再 从基础的源码逻辑进行跟踪查看，而是**针对当前场景，查看负责部分的差异性处理**，以此来让我们的整体节奏，变得更加清晰

那么明确好了以上问题之后，下面就让我们进入本章的学习吧

## 02：响应性数据的编译器处理：响应性数据的处理逻辑

那么首先我们先来看响应性数据的编译器处理逻辑，具体指的事什么呢？我们来看如下测试实例，`pacakges/vue/example/compiler/compiler-reactive.html`

```html
<script>
  const { compile, render, h } = Vue
  // 创建 template，复合表达式
  const template = `<div>hello {{msg}}</div>`
  // 生成 render 函数
  const renderFn = compile(template)
  console.log(renderFn)
  // 创建组件
  const component = {
    render: renderFn,
    data() {
      return {
        msg: 'world',
      }
    },
  }
  // 通过 h 函数，生成 vnode
  const vnode = h(component)
  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'))
</script>
```

在上面代码中，我们通过 data 声明了一个响应式数据，然后在 template 中通过 {{}} 进行使用，从而得到 hello {{msg}} 这样的一个表达式，这样的表达式我们把它叫做**复合表达式**

我们可以在 vue 的源码 baseCompile 方法中分别查看 AST JavaScript AST 和 render 函数的值

```json
// AST
{
  "type": 0,
  "children": [
    {
      "type": 1,
      "ns": 0,
      "tag": "div",
      "tagType": 0,
      "props": [],
      "isSelfClosing": false,
      "children": [
        {
          "type": 2,
          "content": "hello ",
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 12, "line": 1, "offset": 11 },
            "source": "hello "
          }
        },
        {
          "type": 5, // NodeTypes.INTERPOLATION
          "content": {
            "type": 4, // NodeTypes.SIMPLE_EXPRESSION
            "isStatic": false,
            "constType": 0,
            "content": "msg",
            "loc": {
              "start": { "column": 14, "line": 1, "offset": 13 },
              "end": { "column": 17, "line": 1, "offset": 16 },
              "source": "msg"
            }
          },
          "loc": {
            "start": { "column": 12, "line": 1, "offset": 11 },
            "end": { "column": 19, "line": 1, "offset": 18 },
            "source": "{{msg}}"
          }
        }
      ],
      "loc": {
        "start": { "column": 1, "line": 1, "offset": 0 },
        "end": { "column": 25, "line": 1, "offset": 24 },
        "source": "<div>hello {{msg}}</div>"
      }
    }
  ],
  "helpers": [],
  "components": [],
  "directives": [],
  "hoists": [],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "loc": {
    "start": { "column": 1, "line": 1, "offset": 0 },
    "end": { "column": 25, "line": 1, "offset": 24 },
    "source": "<div>hello {{msg}}</div>"
  }
}
```

打印的 `JavaScript AST` 类似如下结果

```json
// JavaScript AST
{
  "type": 0,
  "children": [
    {
      "type": 1,
      "ns": 0,
      "tag": "div",
      "tagType": 0,
      "props": [],
      "isSelfClosing": false,
      "children": [
        {
          "type": 8,
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 12, "line": 1, "offset": 11 },
            "source": "hello "
          },
          "children": [
            {
              "type": 2,
              "content": "hello ",
              "loc": {
                "start": { "column": 6, "line": 1, "offset": 5 },
                "end": { "column": 12, "line": 1, "offset": 11 },
                "source": "hello "
              }
            },
            " + ",
            {
              "type": 5, // NodeTypes.INTERPOLATION
              "content": {
                "type": 4, // NodeTypes.SIMPLE_EXPRESSION
                "isStatic": false,
                "constType": 0, // 这个需要加上，否则会报错误
                "content": "msg",
                "loc": {
                  "start": { "column": 14, "line": 1, "offset": 13 },
                  "end": { "column": 17, "line": 1, "offset": 16 },
                  "source": "msg"
                }
              },
              "loc": {
                "start": { "column": 12, "line": 1, "offset": 11 },
                "end": { "column": 19, "line": 1, "offset": 18 },
                "source": "{{msg}}"
              }
            }
          ]
        }
      ],
      "loc": {
        "start": { "column": 1, "line": 1, "offset": 0 },
        "end": { "column": 25, "line": 1, "offset": 24 },
        "source": "<div>hello {{msg}}</div>"
      },
      "codegenNode": {
        "type": 13,
        "tag": "\"div\"",
        "children": {
          "type": 8,
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 12, "line": 1, "offset": 11 },
            "source": "hello "
          },
          "children": [
            {
              "type": 2,
              "content": "hello ",
              "loc": {
                "start": { "column": 6, "line": 1, "offset": 5 },
                "end": { "column": 12, "line": 1, "offset": 11 },
                "source": "hello "
              }
            },
            " + ",
            {
              "type": 5,
              "content": {
                "type": 4,
                "isStatic": false,
                "constType": 0,
                "content": "msg",
                "loc": {
                  "start": { "column": 14, "line": 1, "offset": 13 },
                  "end": { "column": 17, "line": 1, "offset": 16 },
                  "source": "msg"
                }
              },
              "loc": {
                "start": { "column": 12, "line": 1, "offset": 11 },
                "end": { "column": 19, "line": 1, "offset": 18 },
                "source": "{{msg}}"
              }
            }
          ]
        },
        "patchFlag": "1 /* TEXT */",
        "isBlock": true,
        "disableTracking": false,
        "isComponent": false,
        "loc": {
          "start": { "column": 1, "line": 1, "offset": 0 },
          "end": { "column": 25, "line": 1, "offset": 24 },
          "source": "<div>hello {{msg}}</div>"
        }
      }
    }
  ],
  "helpers": [null, null, null],
  "components": [],
  "directives": [],
  "hoists": [],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "codegenNode": {
    "type": 13,
    "tag": "\"div\"",
    "children": {
      "type": 8,
      "loc": {
        "start": { "column": 6, "line": 1, "offset": 5 },
        "end": { "column": 12, "line": 1, "offset": 11 },
        "source": "hello "
      },
      "children": [
        {
          "type": 2,
          "content": "hello ",
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 12, "line": 1, "offset": 11 },
            "source": "hello "
          }
        },
        " + ",
        {
          "type": 5,
          "content": {
            "type": 4,
            "isStatic": false,
            "constType": 0,
            "content": "msg",
            "loc": {
              "start": { "column": 14, "line": 1, "offset": 13 },
              "end": { "column": 17, "line": 1, "offset": 16 },
              "source": "msg"
            }
          },
          "loc": {
            "start": { "column": 12, "line": 1, "offset": 11 },
            "end": { "column": 19, "line": 1, "offset": 18 },
            "source": "{{msg}}"
          }
        }
      ]
    },
    "patchFlag": "1 /* TEXT */",
    "isBlock": true,
    "disableTracking": false,
    "isComponent": false,
    "loc": {
      "start": { "column": 1, "line": 1, "offset": 0 },
      "end": { "column": 25, "line": 1, "offset": 24 },
      "source": "<div>hello {{msg}}</div>"
    }
  },
  "loc": {
    "start": { "column": 1, "line": 1, "offset": 0 },
    "end": { "column": 25, "line": 1, "offset": 24 },
    "source": "<div>hello {{msg}}</div>"
  }
}
```

模板中生成的 `renderFn` 内容如下

```javascript
const _Vue = Vue

return function render(_ctx, _cache) {
  with (_ctx) {
    const {
      toDisplayString: _toDisplayString,
      openBlock: _openBlock,
      createElementBlock: _createElementBlock,
    } = _Vue

    return (
      _openBlock(),
      _createElementBlock(
        'div',
        null,
        'hello ' + _toDisplayString(msg),
        1 /* TEXT */,
      )
    )
  }
}
```

由以上内容可以看出，当我们增加了复合表达式之后，`AST`、`JavaScript AST`和`render` 函数中多出了如下内容

```json
// AST
{
  "type": 5, // NodeTypes.INTERPOLATION
  "content": {
    "type": 4, // NodeTypes.SIMPLE_EXPRESSION
    "isStatic": false,
    "constType": 0,
    "content": "msg",
    "loc": {
      "start": { "column": 14, "line": 1, "offset": 13 },
      "end": { "column": 17, "line": 1, "offset": 16 },
      "source": "msg"
    }
  },
  "loc": {
    "start": { "column": 12, "line": 1, "offset": 11 },
    "end": { "column": 19, "line": 1, "offset": 18 },
    "source": "{{msg}}"
  }
}
```

```json
// JavaScript AST
{
  "type": 8,
  "loc": {
    "start": { "column": 6, "line": 1, "offset": 5 },
    "end": { "column": 12, "line": 1, "offset": 11 },
    "source": "hello "
  },
  "children": [
    {
      "type": 2,
      "content": "hello ",
      "loc": {
        "start": { "column": 6, "line": 1, "offset": 5 },
        "end": { "column": 12, "line": 1, "offset": 11 },
        "source": "hello "
      }
    },
    // --------------------------- 以下为多出来的 ---------------------------
    " + ",
    {
      "type": 5, // NodeTypes.INTERPOLATION
      "content": {
        "type": 4, // NodeTypes.SIMPLE_EXPRESSION
        "isStatic": false,
        "constType": 0,
        "content": "msg",
        "loc": {
          "start": { "column": 14, "line": 1, "offset": 13 },
          "end": { "column": 17, "line": 1, "offset": 16 },
          "source": "msg"
        }
      },
      "loc": {
        "start": { "column": 12, "line": 1, "offset": 11 },
        "end": { "column": 19, "line": 1, "offset": 18 },
        "source": "{{msg}}"
      }
    }
  ]
}
```

```json
// render
// 增加了 toDisplayString  函数
const _Vue = Vue

return function render(_ctx, _cache) {
  with (_ctx) {
    const { toDisplayString: _toDisplayString, openBlock: _openBlock, createElementBlock: _createElementBlock } = _Vue
    return (_openBlock(), _createElementBlock("div", null, "hello " + _toDisplayString(msg), 1 /* TEXT */))
  }
}
```

那么当我们处理符合表达式的编译时，同样也是需要从差异入手，我们**只需要填充对应的数据差异**。

## 03：响应性数据的编译器处理：AST 解析逻辑

```json
// 需要新增的 AST 结构
{
  "type": 5, // NodeTypes.INTERPOLATION
  "content": {
    "type": 4, // NodeTypes.SIMPLE_EXPRESSION
    "isStatic": false,
    "constType": 0,
    "content": "msg",
    "loc": {
      "start": { "column": 14, "line": 1, "offset": 13 },
      "end": { "column": 17, "line": 1, "offset": 16 },
      "source": "msg"
    }
  },
  "loc": {
    "start": { "column": 12, "line": 1, "offset": 11 },
    "end": { "column": 19, "line": 1, "offset": 18 },
    "source": "{{msg}}"
  }
}
```

查看`packages/compiler-core/src/parse.ts`中的代码逻辑，找到 `parseChildren` 方法

我们知道该方法主要是用来解析子节点，内部存在的 `if` 逻辑

```typescript
if (startsWith(s, '{{')) {
}
```

我们再上述基础上增加以下逻辑处理

```typescript
function parseChildren(context: ParserContext, ancestors) {
  ...
  if (startsWith(s, '{{')) {
    node = parseInterpolation(context)
  }
}


function parseInterpolation(context: ParserContext) {
  // {{  }}
  const [open, close] = ['{{', '}}']
  advanceBy(context, open.length)
  const closeIndex = context.source.indexOf(close, open.length)
  const preTrimContent = parseTextData(context, closeIndex)
  advanceBy(context, close.length)
  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      content: preTrimContent.trim(),
      // Set `isConstant` to false by default and will decide in transformExpression
      constType: 0
    }
  }
}
```

然后在`/packages/compiler-core/src/compile.ts` 中打印 生成的 `ast`，代码如下

```typescript
export function baseCompile(template: string, options) {
  const ast = baseParse(template)
  console.log(JSON.stringify(ast)) // 打印生成的 ast
  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText],
    }),
  )
  return generate(ast)
}
```

打印后，结果如下

```typescript
{
  type: 0,
  children: [
    {
      type: 1,
      tag: 'div',
      tagType: 0,
      props: [],
      children: [
        { type: 2, content: 'hello ' },
        { type: 5, content: { type: 4, isStatic: false, content: 'msg', constType: 0 } }
      ]
    }
  ],
  loc: {}
}
```

我们怎么测试一下这个接口是否在 `vue`源码中可以使用呢，找到`vue`源码项目，修改如下

```typescript
// /vue-next-3.2.37/packages/compiler-core/src/compile.ts
// const ast = isString(template) ? baseParse(template, options) : template
const ast = {
  type: 0,
  children: [
    {
      type: 1,
      tag: 'div',
      tagType: 0,
      props: [],
      children: [
        { type: 2, content: 'hello ' },
        { type: 5, content: { type: 4, isStatic: false, content: 'msg', constType: 0  } },
      ],
    },
  ],
  loc: {},
}
```

在`vue-next-3.2.7`项目中，运行`npm run dev`并重新运行上一小节的测试示例

可以看到在浏览器中成功显示如下效果，说明我们的`ast`结构复合`vue`源码中的结构要求

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76478725d0274c2e9d55e1293e9bdc6a~tplv-k3u1fbpfcp-watermark.image?)

## 04：响应性数据的编译器处理：JavaScript AST 转化逻辑

```json
// 需要新增的 JavaScript AST 结构
{
  "type": 8,
  "loc": {
    "start": { "column": 6, "line": 1, "offset": 5 },
    "end": { "column": 12, "line": 1, "offset": 11 },
    "source": "hello "
  },
  "children": [
    {
      "type": 2,
      "content": "hello ",
      "loc": {
        "start": { "column": 6, "line": 1, "offset": 5 },
        "end": { "column": 12, "line": 1, "offset": 11 },
        "source": "hello "
      }
    },
    // --------------------------- 以下为多出来的 ---------------------------
    " + ",
    {
      "type": 5, // NodeTypes.INTERPOLATION
      "content": {
        "type": 4, // NodeTypes.SIMPLE_EXPRESSION
        "isStatic": false,
        "constType": 0,
        "content": "msg",
        "loc": {
          "start": { "column": 14, "line": 1, "offset": 13 },
          "end": { "column": 17, "line": 1, "offset": 16 },
          "source": "msg"
        }
      },
      "loc": {
        "start": { "column": 12, "line": 1, "offset": 11 },
        "end": { "column": 19, "line": 1, "offset": 18 },
        "source": "{{msg}}"
      }
    }
  ]
}
```

针对于 `JavaScript AST` 差异性的处理，我们的代码`transformText`方法以及针对于 + 号做了处理，所以我们需要对`Notypes.INTERPOLATION` 这种类型的节点进行处理即可(由源码可知，他会利用一个叫做`toDisplayString` 这样的一个函数来进行处理)

```typescript
// transform.ts
import { TO_DISPLAY_STRING } from './runtimeHelpers'

function traverseNode(node, context: TransformContext) {
  ...
  switch (node.type) {
    ...
    case NodeTypes.INTERPOLATION:
      // ---------- 这里处理 INTERPOLATION ----------
  		context.helper(TO_DISPLAY_STRING)
      break
  }
}

// runtimeHelpers.ts,需要新增加一个 TO_DISPLAY_STRING
export const TO_DISPLAY_STRING = Symbol('toDisplayString')
export const helperNameMap: any = {
  ...
  [TO_DISPLAY_STRING]: `toDisplayString`
}
```

然后我们在`compile.ts` 中对于 `ast`进行打印

```typescript
export function baseCompile(template: string, options) {
  const ast = baseParse(template)
  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText],
    }),
  )
  console.log(ast)
  return generate(ast)
}
```

结果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cfb615ca3014dbfa5b87053fc540586~tplv-k3u1fbpfcp-watermark.image?)

## 05：响应性数据的编译器处理：render 转化逻辑分析

```json
// render 函数，内容进行了简化
const _Vue = Vue

return function render(_ctx, _cache) {
  with (_ctx) {
    const { toDisplayString: _toDisplayString, createElementBlock: _createElementBlock } = _Vue
    return (_openBlock(), _createElementBlock("div", null, "hello " + _toDisplayString(msg)))
  }
}
```

那么接下来我们就要处理 render 的转化逻辑了。由以上最终生成的方法克制，对于主要增加了以下两块代码

1. `toDisplayString`方法：该方法的作用非常简单，接收一个变量，返回对应的响应性数据。比如在以上代码和测试场景中，`_toDisplayString(msg)`方法的调用代表着接收 `msg` 变量作为参数，返回 `world` 字符串
2. `with(_ctx)` 由刚才的代码我们可知：在使用 `_toDisplayString` 时，我们用到了一个 `msg` 变量。但是在整个的 `render` 代码中却没有 `msg` 变量的存在。那么为什么没抛出对应的错误呢？这是以为[with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)的作用，它会改变语句的作用域链，从而找到 `msg` 变量

所以根据以上两点，我们再去处理时，就需要关注以下内容

1. 在 `generate` 方法中，增加 `with` 的 `push` 和 `toDisplayStrign` 方法的调用
2. 完成 `toDisplayStirng` 方法
3. 因为`with`改变作用域，所以我们在`runtime`时，需要注意新的作用域会不会引发其他的错误

## 06：响应性数据的编译器处理：generate 生成 render 函数

这一小节，我们来完成`generate`的函数拼接

1. 修改`codegen.ts`文件，修改如下

   ```typescript
   export function generate(ast) {
     const context = createCodegenContext(ast)
     const { push, newline, deindent, indent } = context
     getFunctionPreamble(context)
     const functionName = `render`

     const args = ['_ctx', '_cache']
     const signature = args.join(', ')
     push(`function ${functionName}(${signature}) {`)
     indent()
     // 新增加 with 函数 { 以及缩进
     push(`with(_ctx) {`)
     indent()

     const hasHelpers = ast.helpers.length > 0
     if (hasHelpers) {
       push(`const { ${ast.helpers.map(aliasHelper).join(', ')}} = _Vue`)
     }
     newline()
     push(`return `)
     if (ast.codegenNode) {
       genNode(ast.codegenNode, context)
     } else {
       push(`null`)
     }
     // 同样的需要增加 对应的缩进以及 {
     deindent()
     push('}')

     deindent()
     push('}')
     console.log(context.code)
     return {
       ast,
       code: context.code,
     }
   }
   ```

2. 在对表达式进行相应的处理

   ```typescript
   import { TO_DISPLAY_STRING } from './runtimeHelpers'

   function genNode(node, context) {
     switch (node.type) {
       case NodeTypes.VNODE_CALL:
         genVNodeCall(node, context)
         break
       case NodeTypes.TEXT:
         genText(node, context)
         break
       // ------------ 新增加 ---------------
       case NodeTypes.SIMPLE_EXPRESSION:
         genExpression(node, context)
         break
       case NodeTypes.INTERPOLATION:
         genInterpolation(node, context)
         break
       case NodeTypes.COMPOUND_EXPRESSION:
         genCompoundExpression(node, context)
         break
       // ----------------------------------
       default:
         break
     }
   }

   function genCompoundExpression(node, context) {
     for (let index = 0; index < node.children.length; index++) {
       const child = node.children[index]
       if (isString(child)) {
         context.push(child)
       } else {
         genNode(child, context)
       }
     }
   }

   function genExpression(node, context) {
     const { content, isStatic } = node
     context.push(isStatic ? JSON.stringify(content) : content)
   }

   function genInterpolation(node, context) {
     const { push, helper } = context
     push(`${helper(TO_DISPLAY_STRING)}(`)
     genNode(node.content, context)
     push(`)`)
   }
   ```

3. 回到测试用例`compiler-reactive.html`中打印`renderFn`，可以看到如下结果

   ```typescript
   const _Vue = Vue
   return function render(_ctx, _cache) {
     with (_ctx) {
       const {
         toDisplayString: _toDisplayString,
         createElementVNode: _createElementVNode,
       } = _Vue
       return _createElementVNode('div', [], ['hello ' + _toDisplayString(msg)])
     }
   }
   ```

## 07：响应性数据的编译器处理：render 函数的执行逻辑

现在我们已经成功地得到了 `render` 函数，但是也得到了一个错误

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc0feb7e5ae24d3d81bf171381ec13b9~tplv-k3u1fbpfcp-watermark.image?)

该错误指向 `componentRenderUtils.ts`模块中的`renderComponentRoor`

```typescript
// 解析 render 函数的返回值
export function renderComponentRoot(instance){
  ...
}
```

那么出现该错误的原因是什么呢？

因为`with`的作用，到时内部函数的作用域指向了`_ctx`，而此时`_ctx`是`undefined`

修改`renderComponentRoor`函数如下

```typescript
export function renderComponentRoot(instance) {
  ...
  result = normalizeVNode(render!.call(data, data)) // 增加第二个参数 data
  ...
}
```

此时再次运行，这个错误解决了，会出现另一个错误 _TypeError: \_toDisplayString is not a function_

新增加文件`packages/shared/src/toDisplayString.ts`,内容如下

```typescript
export const toDisplayString = (value): string => {
  return String(value)
}
```

进行导出

```typescript
// /packages/shared/src/index.ts
export { toDisplayString } from './toDisplayString'

// /packages/vue/src/index.ts
export { toDisplayString } from '@vue/shared'
```

再次运行，我们会发现页面中正常渲染了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96defd5fd232409b9b8ee1a85c641bbd~tplv-k3u1fbpfcp-watermark.image?)

此时数据已经是具有响应性的，修改测试示例如下

```html
<script>
  const { compile, render, h } = Vue
  // 创建 template
  const template = `<div>hello {{msg}}</div>`
  // 生成 render 函数
  const renderFn = compile(template)
  console.log(renderFn.toString())
  // 创建组件
  const component = {
    render: renderFn,
    data() {
      return {
        msg: 'world',
      }
    },
    created() {
      setTimeout(() => {
        this.msg = '世界'
      }, 2000)
    },
  }
  // 通过 h 函数，生成 vnode
  const vnode = h(component)
  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'))
</script>
```

运行，2s 后数据更新了

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4afe6f1a1b514c54bd1884f41dae36e2~tplv-k3u1fbpfcp-watermark.image?)

## 08: 多层级模板的编译器处理：多层级的处理逻辑

在我们处理好响应式的数据处理之后，接下来我们来看一下多层级的视图渲染

什么叫做多层级的视图渲染呢？我们来看下面的测试示例

```html
<script>
  const { compile, render, h } = Vue
  // 创建 template
  const template = `<div><h1>hello {{msg}}<h1></div>` // 多层级
  // 生成 render 函数
  const renderFn = compile(template)
  console.log(renderFn.toString())
  // 创建组件
  const component = {
    render: renderFn,
    data() {
      return {
        msg: 'world',
      }
    },
    created() {
      setTimeout(() => {
        this.msg = '世界'
      }, 2000)
    },
  }
  // 通过 h 函数，生成 vnode
  const vnode = h(component)
  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'))
</script>
```

在该测试示例中，我们的`template`包含了一个子节点`h1`元素，从现在的`vue-next-mini`中运行该测试示例，大家可以发现是无法运行的

那么如果想解析当前的子节点我们应该怎么做呢？

我们知道`compile`的作用就是把模板解析成`render`函数，我们现在看一下，现在解析出来的`render`

```json
function render(_ctx, _cache) {
 with(_ctx) {
  const { toDisplayString: _toDisplayString, createElementVNode: _createElementVNode} = _Vue
  return _createElementVNode("div", [], [])
 }
}
```

在以上代码中，我们可以发现，没有渲染出`h1`的原因，其实就非常简单了，就是因为第三个参数 `[]`

如果想要渲染出`h1`,那么就需要提供出如下的`render`

```json
function render(_ctx, _cache) {
 with(_ctx) {
  const { toDisplayString: _toDisplayString, createElementVNode: _createElementVNode} = _Vue
  return _createElementVNode("div", [], [" ", _createElement("h1", [],["hello world"]), " "])
 }
}
```

那么这样`render`函数如何实现呢？

对于我们现在的代码而言，解析`render`的代码位于`packages/compiler-core/src/codegen.ts`中，此时我们`ast`结构如下

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
          "type": 1,
          "tag": "h1",
          "tagType": 0,
          "props": [],
          "children": [
            {
              "type": 8,
              "children": [
                {
                  "type": 2,
                  "content": "hello "
                },
                " + ",
                {
                  "type": 5,
                  "content": {
                    "type": 4,
                    "isStatic": false,
                    "content": "msg"
                  }
                }
              ]
            },
            {
              "type": 1,
              "tag": "h1",
              "tagType": 0,
              "props": [],
              "children": [],
              "codegenNode": {
                "type": 13,
                "tag": "\"h1\"",
                "props": [],
                "children": []
              }
            }
          ],
          "codegenNode": {
            "type": 13,
            "tag": "\"h1\"",
            "props": [],
            "children": [
              {
                "type": 8,
                "children": [
                  {
                    "type": 2,
                    "content": "hello "
                  },
                  " + ",
                  {
                    "type": 5,
                    "content": {
                      "type": 4,
                      "isStatic": false,
                      "content": "msg"
                    }
                  }
                ]
              },
              {
                "type": 1,
                "tag": "h1",
                "tagType": 0,
                "props": [],
                "children": [],
                "codegenNode": {
                  "type": 13,
                  "tag": "\"h1\"",
                  "props": [],
                  "children": []
                }
              }
            ]
          }
        }
      ],
      "codegenNode": {
        "type": 13,
        "tag": "\"div\"",
        "props": [],
        "children": [
          {
            "type": 1,
            "tag": "h1",
            "tagType": 0,
            "props": [],
            "children": [
              {
                "type": 8,
                "children": [
                  {
                    "type": 2,
                    "content": "hello "
                  },
                  " + ",
                  {
                    "type": 5,
                    "content": {
                      "type": 4,
                      "isStatic": false,
                      "content": "msg"
                    }
                  }
                ]
              },
              {
                "type": 1,
                "tag": "h1",
                "tagType": 0,
                "props": [],
                "children": [],
                "codegenNode": {
                  "type": 13,
                  "tag": "\"h1\"",
                  "props": [],
                  "children": []
                }
              }
            ],
            "codegenNode": {
              "type": 13,
              "tag": "\"h1\"",
              "props": [],
              "children": [
                {
                  "type": 8,
                  "children": [
                    {
                      "type": 2,
                      "content": "hello "
                    },
                    " + ",
                    {
                      "type": 5,
                      "content": {
                        "type": 4,
                        "isStatic": false,
                        "content": "msg"
                      }
                    }
                  ]
                },
                {
                  "type": 1,
                  "tag": "h1",
                  "tagType": 0,
                  "props": [],
                  "children": [],
                  "codegenNode": {
                    "type": 13,
                    "tag": "\"h1\"",
                    "props": [],
                    "children": []
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "loc": {},
  "codegenNode": {
    "type": 13,
    "tag": "\"div\"",
    "props": [],
    "children": [
      {
        "type": 1,
        "tag": "h1",
        "tagType": 0,
        "props": [],
        "children": [
          {
            "type": 8,
            "children": [
              {
                "type": 2,
                "content": "hello "
              },
              " + ",
              {
                "type": 5,
                "content": {
                  "type": 4,
                  "isStatic": false,
                  "content": "msg"
                }
              }
            ]
          },
          {
            "type": 1,
            "tag": "h1",
            "tagType": 0,
            "props": [],
            "children": [],
            "codegenNode": {
              "type": 13,
              "tag": "\"h1\"",
              "props": [],
              "children": []
            }
          }
        ],
        "codegenNode": {
          "type": 13,
          "tag": "\"h1\"",
          "props": [],
          "children": [
            {
              "type": 8,
              "children": [
                {
                  "type": 2,
                  "content": "hello "
                },
                " + ",
                {
                  "type": 5,
                  "content": {
                    "type": 4,
                    "isStatic": false,
                    "content": "msg"
                  }
                }
              ]
            },
            {
              "type": 1,
              "tag": "h1",
              "tagType": 0,
              "props": [],
              "children": [],
              "codegenNode": {
                "type": 13,
                "tag": "\"h1\"",
                "props": [],
                "children": []
              }
            }
          ]
        }
      }
    ]
  },
  "helpers": [null, null],
  "components": [],
  "directives": [],
  "imports": [],
  "hoists": [],
  "temps": [],
  "cached": []
}
```

其中的`h1`标签的`type`为 1，而 1 对应 `nodeTypes`中的`ELEMENT`类型

```typescript
function genNode(node, context) {

  // 增加如下代码
  case NodeTypes.ELEMENT:
    genNode(node.codegenNode, context)
    break
}
```

此时再重新运行此时示例，可以发现正常渲染了

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b0ca9a9c8424c58b83471f56ccfc914~tplv-k3u1fbpfcp-watermark.image?)

## 09: 基于编译器的指令(v-xxx)处理:指令解析逻辑

在 vue 中，指令是一个非常重要的环节。vue 的指令主要集中在`compiler`编译器中。那么接下来我们来看一下`vue`中的指令处理逻辑

vue 中提供的指令非常多，大家可以点击[这里来查看所有的内置指令](https://cn.vuejs.org/api/built-in-directives.html),针对于这么多的指令，我们不可能全部进行讲解实现逻辑，所以我们在这里以`v-if`为例子，为大家讲解指令的解析与处理方案

我们创建如下测试示例`packages/vue/examples/mine/compiler/compiler-directive.html`

```html
<script>
  const { compile, render, h } = Vue
  // 创建 template
  const template = `<div>hello {{msg}}<h1 v-if="isShow">你好，世界</h1></div>`
  // 生成 render 函数
  const renderFn = compile(template)
  console.log(renderFn.toString())
  // 创建组件
  const component = {
    render: renderFn,
    data() {
      return {
        msg: 'world',
        isShow: false,
      }
    },
    created() {
      setTimeout(() => {
        this.msg = '世界'
        this.isShow = true
      }, 2000)
    },
  }
  // 通过 h 函数，生成 vnode
  const vnode = h(component)
  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'))
</script>
```

在源码项目运行该实例，可以看到生成的`render`函数如下

```json
function render(_ctx, _cache) {
  with (_ctx) {
    const { toDisplayString: _toDisplayString, openBlock: _openBlock, createElementBlock: _createElementBlock, createCommentVNode: _createCommentVNode, createTextVNode: _createTextVNode } = _Vue

    return (_openBlock(), _createElementBlock("div", null, [
      _createTextVNode("hello " + _toDisplayString(msg), 1 /* TEXT */),
      isShow
        ? (_openBlock(), _createElementBlock("h1", _hoisted_1, "你好，世界"))
        : _createCommentVNode("v-if", true)
    ]))
  }
}
```

根据之间的经验和上面的代码可知

1. `with(_ctx)`将改变作用域，使`isShow`指向`data`。即：`data.isShow`
2. `isShow ? xx : xx` 。这三个表达式是渲染的关键，我们`v-if`本质上就是一个`if`判断，满足条件则渲染，不满足则不渲染。

那么明确好了对应的`render`逻辑之后，接下来我们就来看对应的`ast`和`JavaScript AST`

```json
// ast
{
  "type": 0,
  "children": [
    {
      "type": 1,
      "ns": 0,
      "tag": "div",
      "tagType": 0,
      "props": [],
      "isSelfClosing": false,
      "children": [
        {
          "type": 2,
          "content": "hello ",
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 12, "line": 1, "offset": 11 },
            "source": "hello "
          }
        },
        {
          "type": 5,
          "content": {
            "type": 4,
            "isStatic": false,
            "constType": 0,
            "content": "msg",
            "loc": {
              "start": { "column": 14, "line": 1, "offset": 13 },
              "end": { "column": 17, "line": 1, "offset": 16 },
              "source": "msg"
            }
          },
          "loc": {
            "start": { "column": 12, "line": 1, "offset": 11 },
            "end": { "column": 19, "line": 1, "offset": 18 },
            "source": "{{msg}}"
          }
        },
        {
          "type": 1, // NodeTypes.Element
          "ns": 0,
          "tag": "h1",
          "tagType": 0,
          "props": [
            {
              "type": 7, // NodeTypes.DIRECTIVE
              "name": "if", // 指令名字
              "exp": {
                // 表达式
                "type": 4, // NodeTypes.SIMPLE_EXPRESSION
                "content": "isShow", // 值
                "isStatic": false,
                "constType": 0,
                "loc": {
                  "start": { "column": 29, "line": 1, "offset": 28 },
                  "end": { "column": 35, "line": 1, "offset": 34 },
                  "source": "isShow"
                }
              },
              "modifiers": [],
              "loc": {
                "start": { "column": 23, "line": 1, "offset": 22 },
                "end": { "column": 36, "line": 1, "offset": 35 },
                "source": "v-if=\"isShow\""
              }
            }
          ],
          "isSelfClosing": false,
          "children": [
            {
              "type": 2,
              "content": "你好，世界",
              "loc": {
                "start": { "column": 37, "line": 1, "offset": 36 },
                "end": { "column": 42, "line": 1, "offset": 41 },
                "source": "你好，世界"
              }
            }
          ],
          "loc": {
            "start": { "column": 19, "line": 1, "offset": 18 },
            "end": { "column": 47, "line": 1, "offset": 46 },
            "source": "<h1 v-if=\"isShow\">你好，世界</h1>"
          }
        }
      ],
      "loc": {
        "start": { "column": 1, "line": 1, "offset": 0 },
        "end": { "column": 53, "line": 1, "offset": 52 },
        "source": "<div>hello {{msg}}<h1 v-if=\"isShow\">你好，世界</h1></div>"
      }
    }
  ],
  "helpers": [],
  "components": [],
  "directives": [],
  "hoists": [],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "loc": {
    "start": { "column": 1, "line": 1, "offset": 0 },
    "end": { "column": 53, "line": 1, "offset": 52 },
    "source": "<div>hello {{msg}}<h1 v-if=\"isShow\">你好，世界</h1></div>"
  }
}
```

以上的`AST`，主要看备注部分

由以上的`AST`可知，针对于指令的处理，主要集中在`props`选项中，所以针对于`AST`而言，我们**只需要额外增加属性(props)的处理即可**

接下来我们来看`JavaScript AST`

`JavaScript AST`决定了最终的`render`渲染，它的处理更加复杂。我们之前创建过`transformElement`与`transformText`用来处理`element`和`text`的渲染，那么同样的道理，针对于指令的处理，我们也需要创建对应的`transformXXX`才可以进行处理

如果以`v-if`为例，那么我们需要增加对应的`vif.ts`模块

`vif.ts`模块，需要为模块增加额外的`branches`属性，以此来处理对应的分支指令渲染逻辑

```json
// 部分的 JavaScript AST
{
  "type": 9,
  // 分支处理
  "branches": [
    {
      "type": 10, // NodeTypes.IF_BRANCH
      "condition": {
        "type": 4, // NodeTypes.SIMPLE_EXPRESSION
        "content": "isShow",
        "isStatic": false,
        "constType": 0
      },
      "children": [
        {
          "type": 1,
          "ns": 0,
          "tag": "h1",
          "tagType": 0,
          "props": [],
          "isSelfClosing": false,
          "children": [
            {
              "type": 2,
              "content": "你好，世界",
              "loc": {
                "start": {
                  "column": 37,
                  "line": 1,
                  "offset": 36
                },
                "end": {
                  "column": 42,
                  "line": 1,
                  "offset": 41
                },
                "source": "你好，世界"
              }
            }
          ],
          "codegenNode": {
            "type": 13, // NodeTypes.VNODE_CALL
            "tag": "\"h1\"",
            "props": {
              "type": 4,
              "content": "_hoisted_1",
              "isStatic": false,
              "constType": 2,
              "hoisted": {
                "type": 15,
                "properties": [
                  {
                    "type": 16,
                    "key": {
                      "type": 4,
                      "content": "key",
                      "isStatic": true,
                      "constType": 3
                    },
                    "value": {
                      "type": 4,
                      "content": "0",
                      "isStatic": false,
                      "constType": 2
                    }
                  }
                ]
              }
            },
            "children": {
              "type": 2,
              "content": "你好，世界"
            },
            "isBlock": true,
            "disableTracking": false,
            "isComponent": false
          }
        }
      ],
      "isTemplateIf": false
    }
  ],
  "codegenNode": {
    "type": 19,
    "test": {
      "type": 4,
      "content": "isShow",
      "isStatic": false,
      "constType": 0
    },
    "consequent": {
      "type": 13,
      "tag": "\"h1\"",
      "props": {
        "type": 4,
        "content": "_hoisted_1",
        "isStatic": false,
        "constType": 2,
        "hoisted": {
          "type": 15,
          "properties": [
            {
              "type": 16,
              "loc": {
                "source": "",
                "start": {
                  "line": 1,
                  "column": 1,
                  "offset": 0
                },
                "end": {
                  "line": 1,
                  "column": 1,
                  "offset": 0
                }
              },
              "key": {
                "type": 4,
                "content": "key",
                "isStatic": true,
                "constType": 3
              },
              "value": {
                "type": 4,
                "content": "0",
                "isStatic": false,
                "constType": 2
              }
            }
          ]
        }
      },
      "children": {
        "type": 2,
        "content": "你好，世界"
      },
      "isBlock": true,
      "disableTracking": false,
      "isComponent": false
    },
    "alternate": {
      "type": 14,
      "arguments": ["\"v-if\"", "true"]
    },
    "newline": true
  }
}
```

## 10： 基于编译器的指令(v-xxx)处理：AST 解析逻辑

那么首先我们先处理`AST`的解析逻辑

我们知道`AST`的解析，主要集中在`packages/compiler-core/src/parse.ts`中，在该模块下，存在`parseTag`方法，该方法主要用来**解析标签**。那么对于我们的属性解析，也需要在该方法下进行

该方法目前的标签解析，主要分成三部分

1. 标签开始
2. 表签名
3. 标签结束

根据标签`<div v-if="xxx">`的结构，我们的指令处理，应该在**标签名-标签结果**中间进行处理：

1. 在`parseTag`增加属性处理逻辑

   ```typescript
   function parseTag(context: ParserContext, type: TagType) {
     const match: any = /^<\/?([a-z][^\r\n\t\f />]*)/i.exec(context.source)
     const tag = match[1]
     advanceBy(context, match[0].length)
     // -------------------- 属性和指令的处理 --------------------
     advanceSpaces(context)
     let props = parseAttributes(context, type)
     // ------------------------------------------------------------
     let isSelfClosing = startsWith(context.source, '/>') // 是否是自闭合标签
     advanceBy(context, isSelfClosing ? 2 : 1)
     return {
       type: NodeTypes.ELEMENT,
       tag: tag,
       tagType: ElementTypes.ELEMENT,
       props: props, // 注意：这里需要改为 props
       children: [],
     }
   }
   
   function parseAttributes(context, type) {
     const props: any = []
     const attributeNames = new Set<string>()
     while (
       context.source.length > 0 &&
       !startsWith(context.source, '>') &&
       !startsWith(context.source, '/>')
     ) {
       const attr = parseAttribute(context, attributeNames)
       if (type === TagType.Start) {
         props.push(attr)
       }
       advanceSpaces(context)
     }
     return props
   }
   
   function parseAttribute(context: ParserContext, nameSet: Set<string>) {
     const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)!
     const name = match[0]
     nameSet.add(name)
     advanceBy(context, name.length)
     let value: any = undefined
     if (/^[\t\r\n\f ]*=/.test(context.source)) {
       advanceSpaces(context)
       advanceBy(context, 1)
       advanceSpaces(context)
       value = parseAttributeValue(context)
     }
     // 属性中的指令处理
     if (/^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(name)) {
       // 正则匹配指令，
       const match =
         /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(
           name,
         )!
       // 拿到指令名字
       let dirname = match[1]
       return {
         type: NodeTypes.DIRECTIVE,
         name: dirname,
         exp: value && {
           type: NodeTypes.SIMPLE_EXPRESSION,
           content: value.content,
           isStatic: false,
           loc: {},
         },
         arg: undefined,
         modifiers: undefined,
         loc: {},
       }
     }
     return {
       type: NodeTypes.ATTRIBUTE,
       name,
       value: value && {
         type: NodeTypes.TEXT,
         content: value.context,
         loc: {},
       },
       loc: {},
     }
   }
   
   function parseAttributeValue(context: ParserContext) {
     let content = ''
     const quote = context.source[0] // 这里有可能是 '，也有可能是是 "
     advanceBy(context, 1)
     const endIndex = context.source.indexOf(quote)
     if (endIndex === -1) {
       content = parseTextData(context, context.source.length)
     } else {
       content = parseTextData(context, endIndex)
       advanceBy(context, 1)
     }
     return { content, loc: {}, isQuoted: true }
   }
   
   function advanceSpaces(context: ParserContext): void {
     const match = /^[\t\r\n\f ]+/.exec(context.source)
     if (match) {
       advanceBy(context, match[0].length)
     }
   }
   ```

2. 这样，我们的指令 AST 转换处理就已经完成了，在`compile`函数中进行打印

   ```typescript
   export function baseCompile(template: string, options) {
     const ast = baseParse(template)
     console.log(JSON.stringify(ast)) // 打印
     transform(
       ast,
       extend(options, {
         nodeTransforms: [transformElement, transformText],
       }),
     )

     return generate(ast)
   }
   ```

3. 运行测试示例`compiler-directive.html`

   ```html
   <script>
     const { compile, render, h } = Vue
     // 创建 template
     const template = `<div>hello {{msg}}<h1 v-if="isShow">你好，世界</h1></div>`
     // 生成 render 函数
     const renderFn = compile(template)
     console.log(renderFn.toString())
     // 创建组件
     const component = {
       render: renderFn,
       data() {
         return {
           isShow: false,
         }
       },
       created() {
         setTimeout(() => {
           this.isShow = true
         }, 2000)
       },
     }
     // 通过 h 函数，生成 vnode
     const vnode = h(component)
     // 通过 render 函数渲染组件
     render(vnode, document.querySelector('#app'))
   </script>
   ```

4. 得到`AST`打印结果如下

   ```json
   {
     type: 0,
     children: [
       {
         type: 1,
         tag: 'div',
         tagType: 0,
         props: [],
         children: [
           { type: 2, content: 'hello ' },
           {
             type: 5,
             content: { type: 4, isStatic: false, content: 'msg', constType: 0 }
           },
           {
             type: 1,
             tag: 'h1',
             tagType: 0,
             props: [
               {
                 type: 7,
                 name: 'if',
                 exp: {
                   type: 4,
                   content: 'isShow',
                   isStatic: false,
                   loc: {},
                   constType: 0
                 },
                 loc: {}
               }
             ],
             children: [{ type: 2, content: '你好，世界11111' }]
           }
         ]
       }
     ],
     loc: {}
   }
   ```

5. 把当前`AST`替换到`vue`源码中，发现指令可以被正常渲染

## 11：基于编译器的指令(v-xxx)处理：JavaScript AST，构建 v-if 转换模块

`vue`内部具备非常多的指令，所以我们需要有一个统一的方法来对这些指令进行处理，在`packages/compiler-core/src/transform.ts`模块下，创建`createStrucaDirectiveTransform`方法，该方法返回一个闭包函数

1. `packages/compiler-core/src/compile.ts` 这里增加 transformIf.ts 方法

   ```typescript
   import { transformIf } from './transform/vif'

   export function baseCompile(template: string, options) {
     const ast = baseParse(template)
     transform(
       ast,
       extend(options, {
         nodeTransforms: [transformElement, transformText, transformIf],
       }),
     )
     console.log(ast) // 这里最后查看打印结果
     return generate(ast)
   }
   ```

2. 在`packages/compiler-core/src/transform.ts`中增加`createStructuralDirectiveTransform`方法

   ```typescript
   import { isString } from '@vue/shared'

   export function createStructuralDirectiveTransform(
     name: string | RegExp,
     fn,
   ) {
     const matches = isString(name)
       ? (n: string) => n === name
       : (n: string) => name.test(n)

     return (node, context) => {
       if (node.type === NodeTypes.ELEMENT) {
         const exitFns: any = []
         const { props } = node
         for (let index = 0; index < props.length; index++) {
           const prop = props[index]
           if (prop.type === NodeTypes.DIRECTIVE && matches(prop.name)) {
             props.splice(index, 1)
             index--
             const onExit = fn(node, prop, context)
             if (onExit) exitFns.push(onExit)
           }
         }
         return exitFns
       }
     }
   }
   ```

3. 新建`/packages/compiler-core/src/transform/vif.ts`,内容如下

   ```typescript
   import {
     createStructuralDirectiveTransform,
     TransformContext,
   } from '../transform'
   import { isString } from '@vue/shared'
   import { CREATE_COMMENT } from '../runtimeHelpers'
   import {
     NodeTypes,
     createConditionalExpression,
     createObjectProperty,
     createSimpleExpression,
   } from '../ast'
   import { getMemoedVNodeCall } from '../utils'

   export const transformIf = createStructuralDirectiveTransform(
     /^(if|else|else-if)$/,
     (node, dir, context) => {
       return processIf(node, dir, context, (ifNode, branch, isRoot) => {
         let key = 0
         return () => {
           if (isRoot) {
             ifNode.codegenNode = createCodegenNodeForBranch(
               branch,
               key,
               context,
             )
           }
         }
       })
     },
   )

   function createCodegenNodeForBranch(
     branch,
     keyIndex,
     context: TransformContext,
   ) {
     if (branch.condition) {
       return createConditionalExpression(
         branch.condition,
         createChildrenCodegenNode(branch, keyIndex),
         // 第三个参数是替代方案，比如：v-if为false时候的渲染效果
         createCallExpression(context.helper(CREATE_COMMENT), [
           "'v-if'",
           'true',
         ]),
       )
     } else {
       return createChildrenCodegenNode(branch, keyIndex)
     }
   }

   export function createCallExpression(callee, args) {
     return {
       type: NodeTypes.JS_CALL_EXPRESSION,
       loc: {},
       callee,
       arguments: args,
     }
   }

   // 创建指定子节点的 codegen
   function createChildrenCodegenNode(branch, keyIndex: number) {
     const keyProperty = createObjectProperty(
       'key',
       createSimpleExpression(`${keyIndex}`, false),
     )
     const { children } = branch
     const firstChild = children[0]
     const ret = firstChild.codegenNode
     const vnodeCall = getMemoedVNodeCall(ret)
     injectProp(vnodeCall, keyProperty)
     return ret
   }

   export function injectProp(node, prop) {
     let propsWithInjection
     let props =
       node.type === NodeTypes.VNODE_CALL ? node.props : node.arguments[2]
     if (props === null || isString(props)) {
       propsWithInjection = createObjectExpresssion([prop])
     }
     node.props = propsWithInjection
   }

   export function createObjectExpresssion(properties) {
     return {
       type: NodeTypes.JS_OBJECT_EXPRESSION,
       loc: {},
       properties: properties,
     }
   }

   export function processIf(
     node,
     dir,
     context: TransformContext,
     processCodegen?: (node, branch, isRoot: boolean) => () => void,
   ) {
     if (dir.name === 'if') {
       const branch = createIfBranch(node, dir)
       const ifNode = {
         type: NodeTypes.IF,
         branches: [branch],
         loc: {},
       }
       // 这里调用了 replaceNode方法，所以在 TransformContext 声明和实现中要进行增加方法的声明和实现
       context.replaceNode(ifNode)
       if (processCodegen) {
         return processCodegen(ifNode, branch, true)
       }
     }
     return () => {
       console.log('processIf 中的 else 暂时不实现')
     }
   }
   ```

4. 在`runtimeHelpers.ts`中增加`CREATE_COMMENT`

   ```typescript
   export const CREATE_COMMENT = Symbol('createCommentVNode')
   export const helperNameMap: any = {
     ...
     [CREATE_COMMENT]: `createCommentVNode`
   }
   ```

5. `在`ast.ts`中增加`createConditionalExpression、createObjectProperty、createSimpleExpression `方法

   ```typescript
   import { isString } from '@vue/shared'

   export function createConditionalExpression(
     test,
     consequent,
     alternate,
     newline = true,
   ) {
     return {
       type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
       test,
       consequent,
       alternate,
       newline,
       loc: {},
     }
   }

   export function createObjectProperty(key, value) {
     return {
       type: NodeTypes.JS_PROPERTY,
       loc: {},
       key: isString(key) ? createSimpleExpression(key, true) : key,
       value,
     }
   }

   export function createSimpleExpression(content, isStatic: boolean) {
     return {
       type: NodeTypes.SIMPLE_EXPRESSION,
       loc: {},
       content,
       isStatic,
     }
   }
   ```

6. 在`utils.ts`中增加`getMemoedVNodeCall`方法

   ```typescript
   export function getMemoedVNodeCall(node) {
     return node
   }
   ```

7. 在`packages/compiler-core/src/transform.ts`中修改代码如下

   ```typescript
   import { isArray } from '@vue/shared'

   export interface TransformContext {
     // 新增 replaceNode 方法
     replaceNode(node): void
   }

   export function createTransformContext(root, { nodeTransforms = [] }) {
     const context: TransformContext = {
       // 新增 replaceNode 的实现
       replaceNode(node) {
         if (context.parent) {
           context.parent.children[context.childIndex] = context.currentNode =
             node
         }
       },
     }
     return context
   }

   function traverseNode(node, context: TransformContext) {
     context.currentNode = node
     // apply transform plugins
     const { nodeTransforms } = context
     const exitFns: any = []
     for (let index = 0; index < nodeTransforms.length; index++) {
       const onExit = nodeTransforms[index](node, context)
       if (onExit) {
         // 增加判断是数组的处理逻辑
         // 指令中的 transforms 返回为数组，需要解构
         if (isArray(onExit)) {
           exitFns.push(...onExit)
         } else {
           exitFns.push(onExit)
         }
       }
       // 因为触发了 replaceNode 可能会导致 context.currentNode  发生变化，所以需要在这里校正
       if (!context.currentNode) {
         // 节点已删除
         return
       }
       // 节点更换
       node = context.currentNode
     }
     switch (node.type) {
       // 新增加 case 类型 NodeTypes.IF_BRANCH 的处理
       case NodeTypes.IF_BRANCH:
       case NodeTypes.ELEMENT:
       case NodeTypes.ROOT:
         traversChildren(node, context)
         break
       case NodeTypes.INTERPOLATION:
         context.helper(TO_DISPLAY_STRING)
         break
       // 新增加 NodeTypes.IF 的处理
       case NodeTypes.IF:
         console.log('if')
         break
     }
     context.currentNode = node
     let i = exitFns.length
     while (i--) {
       exitFns[i]()
     }
   }
   ```

8. 重新运行测试示例`packages/vue/examples/compiler/compiler-directive.html`，内容如下

   ```html
   <script>
     const { compile, render, h } = Vue
     // 创建 template
     const template = `<div>hello {{msg}}<h1 v-if="isShow">你好，世界</h1></div>`
     // 生成 render 函数
     const renderFn = compile(template)
     console.log(renderFn.toString())
     // 创建组件
     const component = {
       render: renderFn,
       data() {
         return {
           msg: 'world',
           isShow: false,
         }
       },
       created() {
         setTimeout(() => {
           this.msg = '世界'
           this.isShow = true
         }, 2000)
       },
     }
     // 通过 h 函数，生成 vnode
     const vnode = h(component)
     // 通过 render 函数渲染组件
     render(vnode, document.querySelector('#app'))
   </script>
   ```

9. 在控制台可以看到如下信息

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/136a9363e3214de49e40b7188d62e22d~tplv-k3u1fbpfcp-watermark.image?)

## 12：基于编译器的指令(v-xxx)处理：JavaScript AST，transform 的转换逻辑

当`vif`模块构建完成之后，接下来我们就只需要在`transform`中针对`IF`使用`vif`模块进行转化即可

我们知道转化的主要方法为`traverseNode`函数，所以我们需要在该函数内增加如下代码

```typescript
function traverseNode(node, context: TransformContext) {
	...
  switch (node.type) {
    // v-if 指令处理
    case NodeTypes.IF:
      console.log('if')
      for (let i = 0; i < node.branches.length; i++) {
        traverseNode(node.branches[i], context)
      }
      break
  }
  ...
}
```

至此，我们在`transform`中拥有了处理`if`的能力

运行测试实例`compiler-directive.html`,打印出`JavaScript AST`,(注意：因为 `Symbol` 不会再 `json` 字符串下打印，所以需要我们手动加上)

```json
import { CREATE_COMMENT, CREATE_ELEMENT_VNODE, TO_DISPLAY_STRING } from './runtimeHelpers' // 要引入
// 以下是 JavaScript AST
{
  type: 0,
  children: [
    {
      type: 1,
      tag: 'div',
      tagType: 0,
      props: [],
      children: [
        {
          type: 8,
          children: [
            { type: 2, content: 'hello ' },
            ' + ',
            { type: 5, content: { type: 4, isStatic: false, content: 'msg', constType: 0 } }
          ]
        },
        {
          type: 9,
          loc: {},
          branches: [
            {
              type: 10,
              loc: {},
              condition: {
                type: 4,
                content: 'isShow',
                isStatic: false,
                loc: {},
                constType: 0
              },
              children: [
                {
                  type: 1,
                  tag: 'h1',
                  tagType: 0,
                  props: [],
                  children: [{ type: 2, content: '你好，世界' }],
                  codegenNode: {
                    type: 13,
                    tag: '"h1"',
                    children: [{ type: 2, content: '你好，世界' }]
                  }
                }
              ]
            }
          ],
          codegenNode: {
            type: 19,
            test: { type: 4, content: 'isShow', isStatic: false, loc: {}, constType: 0 },
            consequent: {
              type: 13,
              tag: '"h1"',
              children: [{ type: 2, content: '你好，世界' }]
            },
            alternate: { type: 14, loc: {}, arguments: ["'v-if'", 'true'] },
            newline: true,
            loc: {}
          }
        }
      ],
      codegenNode: {
        type: 13,
        tag: '"div"',
        props: [],
        children: [
          {
            type: 8,
            children: [
              { type: 2, content: 'hello ' },
              ' + ',
              { type: 5, content: { type: 4, isStatic: false, content: 'msg', constType: 0 } }
            ]
          },
          {
            type: 9,
            loc: {},
            branches: [
              {
                type: 10,
                loc: {},
                condition: {
                  type: 4,
                  content: 'isShow',
                  isStatic: false,
                  loc: {},
                  constType: 0
                },
                children: [
                  {
                    type: 1,
                    tag: 'h1',
                    tagType: 0,
                    props: [],
                    children: [{ type: 2, content: '你好，世界' }],
                    codegenNode: {
                      type: 13,
                      tag: '"h1"',
                      children: [{ type: 2, content: '你好，世界' }]
                    }
                  }
                ]
              }
            ],
            codegenNode: {
              type: 19,
              test: { type: 4, content: 'isShow', isStatic: false, loc: {}, constType: 0 },
              consequent: {
                type: 13,
                tag: '"h1"',
                children: [{ type: 2, content: '你好，世界' }]
              },
              alternate: { type: 14, loc: {}, arguments: ["'v-if'", 'true'] },
              newline: true,
              loc: {}
            }
          }
        ]
      }
    }
  ],
  loc: {},
  codegenNode: {
    type: 13,
    tag: '"div"',
    props: [],
    children: [
      {
        type: 8,
        children: [
          { type: 2, content: 'hello ' },
          ' + ',
          { type: 5, content: { type: 4, isStatic: false, content: 'msg', constType: 0 } }
        ]
      },
      {
        type: 9,
        loc: {},
        branches: [
          {
            type: 10,
            loc: {},
            condition: { type: 4, content: 'isShow', isStatic: false, loc: {}, constType: 0 },
            children: [
              {
                type: 1,
                tag: 'h1',
                tagType: 0,
                props: [],
                children: [{ type: 2, content: '你好，世界' }],
                codegenNode: {
                  type: 13,
                  tag: '"h1"',
                  children: [{ type: 2, content: '你好，世界' }]
                }
              }
            ]
          }
        ],
        codegenNode: {
          type: 19,
          test: { type: 4, content: 'isShow', isStatic: false, loc: {},  constType: 0 },
          consequent: {
            type: 13,
            tag: '"h1"',
            children: [{ type: 2, content: '你好，世界' }],
          },
          alternate: { 
            type: 14, 
            loc: {}, 
            arguments: ["'v-if'", 'true'],
            callee: CREATE_COMMENT // 这里 callee 也是symbol类型，json序列化后会消失，需要手动加上
          },
          newline: true,
          loc: {}
        }
      }
    ]
  },
  helpers: [CREATE_COMMENT, CREATE_ELEMENT_VNODE, TO_DISPLAY_STRING],
  components: [],
  directives: [],
  imports: [],
  hoists: [],
  temps: [],
  cached: []
}
```

直接把以上内容复制到`vue3`源码中的`generate`方法调用处(替换`ast`),页面可正常渲染，证明当前的`JavaScript AST` 处理完成

## 13：基于编译器的指令(v-xxx)处理：生成 render 函数

当`JavaScript AST`构建完成之后，最后我们只需要生成对应的`render`函数即可

```json
const _Vue = Vue
return function render(_ctx,_cache){
  with(_ctx){
    const {createElementVNode: _createElementVNode, createCommentVNode:_createCommentVNode } = _Vue
    return _createElementVNode("div", [], [
      "hello world",
      isShow ? _createElementVNode("h1", null, ["你好，世界"]) : _createCommentVNode("v-if", true)
    ])
  }
}
```

依据以上模板，可以看出，`render`函数的核心是在于当前的三元表达式 { children } 处理

而对于`codegen`模板而言，解析当前参数的函数为`genNode`,所以我们需要在`genNode`中增加对应的节点处理

1. 在`packages/compiler-core/src/codegen.ts`中的`genNode`方法下增加节点处理

```typescript
function genNode(node, context) {
  switch (node.type) {
    ...
    // 条件表达式
  	case NodeTypes.JS_CONDITIONAL_EXPRESSION:
     genConditionalExpression(node, context)
     break
    // 调用表达式
   	case NodeTypes.JS_CALL_EXPRESSION:
      genCallExpression(node, context)
      break
    case NodeTypes.IF:
      genNode(node.codegenNode, context)
      break
  }
}

function genCallExpression(node, context) {
  const { push, helper } = context
  const callee = isString(node.callee) ? node.callee : helper(node.callee)
  push(callee + '(')
  genNodeList(node.arguments, context)
  push(')')
}

// isShow ? _createElementVNode("h1", null, ["你好，世界"]) : _createCommentVNode("v-if", true)
function genConditionalExpression(node, context) {
  const { test, newline: needNewLine, consequent, alternate } = node
  const { push, indent, deindent, newline } = context

  if (test.type === NodeTypes.SIMPLE_EXPRESSION) {
    genExpression(test, context)
  }
  // 换行
  needNewLine && indent()
  context.indentLevel++
  needNewLine || push(` `)
  push('?')
  genNode(consequent, context)
  context.indentLevel--
  needNewLine && newline()
  needNewLine || push(' ')
  push(': ')
  const isNested = alternate.type === NodeTypes.JS_CONDITIONAL_EXPRESSION
  if (!isNested) {
    context.indentLevel++
  }
  genNode(alternate, context)
  if (!isNested) {
    context.indentLevel--
  }
  needNewLine && deindent()
}
```

再次运行测试示例`compiler-directive.html`，内容如下

```html
<script>
  const { compile, render, h } = Vue
  // 创建 template
  const template = `<div>hello {{msg}}<h1 v-if="isShow">你好，世界</h1></div>`
  // 生成 render 函数
  const renderFn = compile(template)
  console.log(renderFn.toString())
  // 创建组件
  const component = {
    render: renderFn,
    data() {
      return {
        isShow: false,
        msg: 'world'
      }
    },
    created() {
      setTimeout(() => {
        this.isShow = true
      }, 2000)
    }
  }
  // 通过 h 函数，生成 vnode
  const vnode = h(component)
  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'))
</script>
```

可以看到生成的`renderFn.toSring()`结果如下

```json
function render(_ctx, _cache) {
 with(_ctx) {
  const { toDisplayString: _toDisplayString, createElementVNode: _createElementVNode, createCommentVNode: _createCommentVNode} = _Vue
  return _createElementVNode("div", [], ["hello " + _toDisplayString(msg), isShow
   ?_createElementVNode("h1", null, ["你好，世界"])
   : _createCommentVNode('v-if', true)
  ])
 }
}
```

同时页面报错（显然是因为`_createCommentVNode`我们没有创建并导出）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/762b032af4294929b7b26a56a27ba43a~tplv-k3u1fbpfcp-watermark.image?)

在`packages/runtime-core/src/vnode.ts`中创建`createCommentVNode`函数

```typescript
export function createCommentVNode(text) {
  return createVNode(Comment, null, text) // 注意第一个参数代表 Comment 类型
}
```

分别进行导出

```typescript
// /packages/runtime-core/src/index.ts
export { createCommentVNode } from './vnode'

// /packages/vue/src/index.ts
export { createCommentVNode } from '@vue/runtime-core'
```

再次刷新页面，报错就会消失了

## 14：总结

那么到这里，咱们的编译器处理，就已经全部完成了。

在本章中我们对编译器进行了一些深入的了解，对于编译器而言，本质上就是把`template`转换为`render`函数

对于指令或者`{{}}`而言，本质只是模板解析的一部分，所以这部分的核心处理逻辑都是在编译器中进行的

而对于指令而言，每一个指令的处理都会对应一个`transformXXX`函数，这个函数的存在本质上就是为了生成一个对应的**属性节点**，以便在`genrate`时，进行对应的解析。
