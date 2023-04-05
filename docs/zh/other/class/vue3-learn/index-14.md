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
        msg: 'world'
      }
    }
  }
  // 通过 h 函数，生成 vnode
  const vnode = h(component)
  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'))
</script>
```

在上面代码中，我们通过 data 声明了一个响应式数据，然后在 template  中通过 {{}} 进行使用，从而得到 hello {{msg}} 这样的一个表达式，这样的表达式我们把它叫做**复合表达式**

我们可以在 vue 的源码 baseCompile  方法中分别查看 AST JavaScript AST 和 render 函数的值

```json
// AST
{
  type: 0,
  children: [
    {
      type: 1,
      ns: 0,
      tag: 'div',
      tagType: 0,
      props: [],
      isSelfClosing: false,
      children: [
        {
          type: 2,
          content: 'hello ',
          loc: {
            start: { column: 6, line: 1, offset: 5 },
            end: { column: 12, line: 1, offset: 11 },
            source: 'hello '
          }
        },
        {
          type: 5, // NodeTypes.INTERPOLATION
          content: {
            type: 4, // NodeTypes.SIMPLE_EXPRESSION
            isStatic: false,
            constType: 0,
            content: 'msg',
            loc: {
              start: { column: 14, line: 1, offset: 13 },
              end: { column: 17, line: 1, offset: 16 },
              source: 'msg'
            }
          },
          loc: {
            start: { column: 12, line: 1, offset: 11 },
            end: { column: 19, line: 1, offset: 18 },
            source: '{{msg}}'
          }
        }
      ],
      loc: {
        start: { column: 1, line: 1, offset: 0 },
        end: { column: 25, line: 1, offset: 24 },
        source: '<div>hello {{msg}}</div>'
      }
    }
  ],
  helpers: [],
  components: [],
  directives: [],
  hoists: [],
  imports: [],
  cached: 0,
  temps: 0,
  loc: {
    start: { column: 1, line: 1, offset: 0 },
    end: { column: 25, line: 1, offset: 24 },
    source: '<div>hello {{msg}}</div>'
  }
}
```

打印的 `JavaScript AST` 类似如下结果

```json
// JavaScript AST
{
  type: 0,
  children: [
    {
      type: 1,
      ns: 0,
      tag: 'div',
      tagType: 0,
      props: [],
      isSelfClosing: false,
      children: [
        {
          type: 8,
          loc: {
            start: { column: 6, line: 1, offset: 5 },
            end: { column: 12, line: 1, offset: 11 },
            source: 'hello '
          },
          children: [
            {
              type: 2,
              content: 'hello ',
              loc: {
                start: { column: 6, line: 1, offset: 5 },
                end: { column: 12, line: 1, offset: 11 },
                source: 'hello '
              }
            },
            ' + ',
            {
              type: 5, // NodeTypes.INTERPOLATION
              content: {
                type: 4, // NodeTypes.SIMPLE_EXPRESSION
                isStatic: false,
                constType: 0,
                content: 'msg',
                loc: {
                  start: { column: 14, line: 1, offset: 13 },
                  end: { column: 17, line: 1, offset: 16 },
                  source: 'msg'
                }
              },
              loc: {
                start: { column: 12, line: 1, offset: 11 },
                end: { column: 19, line: 1, offset: 18 },
                source: '{{msg}}'
              }
            }
          ]
        }
      ],
      loc: {
        start: { column: 1, line: 1, offset: 0 },
        end: { column: 25, line: 1, offset: 24 },
        source: '<div>hello {{msg}}</div>'
      },
      codegenNode: {
        type: 13,
        tag: '"div"',
        children: {
          type: 8,
          loc: {
            start: { column: 6, line: 1, offset: 5 },
            end: { column: 12, line: 1, offset: 11 },
            source: 'hello '
          },
          children: [
            {
              type: 2,
              content: 'hello ',
              loc: {
                start: { column: 6, line: 1, offset: 5 },
                end: { column: 12, line: 1, offset: 11 },
                source: 'hello '
              }
            },
            ' + ',
            {
              type: 5,
              content: {
                type: 4,
                isStatic: false,
                constType: 0,
                content: 'msg',
                loc: {
                  start: { column: 14, line: 1, offset: 13 },
                  end: { column: 17, line: 1, offset: 16 },
                  source: 'msg'
                }
              },
              loc: {
                start: { column: 12, line: 1, offset: 11 },
                end: { column: 19, line: 1, offset: 18 },
                source: '{{msg}}'
              }
            }
          ]
        },
        patchFlag: '1 /* TEXT */',
        isBlock: true,
        disableTracking: false,
        isComponent: false,
        loc: {
          start: { column: 1, line: 1, offset: 0 },
          end: { column: 25, line: 1, offset: 24 },
          source: '<div>hello {{msg}}</div>'
        }
      }
    }
  ],
  helpers: [null, null, null],
  components: [],
  directives: [],
  hoists: [],
  imports: [],
  cached: 0,
  temps: 0,
  codegenNode: {
    type: 13,
    tag: '"div"',
    children: {
      type: 8,
      loc: {
        start: { column: 6, line: 1, offset: 5 },
        end: { column: 12, line: 1, offset: 11 },
        source: 'hello '
      },
      children: [
        {
          type: 2,
          content: 'hello ',
          loc: {
            start: { column: 6, line: 1, offset: 5 },
            end: { column: 12, line: 1, offset: 11 },
            source: 'hello '
          }
        },
        ' + ',
        {
          type: 5,
          content: {
            type: 4,
            isStatic: false,
            constType: 0,
            content: 'msg',
            loc: {
              start: { column: 14, line: 1, offset: 13 },
              end: { column: 17, line: 1, offset: 16 },
              source: 'msg'
            }
          },
          loc: {
            start: { column: 12, line: 1, offset: 11 },
            end: { column: 19, line: 1, offset: 18 },
            source: '{{msg}}'
          }
        }
      ]
    },
    patchFlag: '1 /* TEXT */',
    isBlock: true,
    disableTracking: false,
    isComponent: false,
    loc: {
      start: { column: 1, line: 1, offset: 0 },
      end: { column: 25, line: 1, offset: 24 },
      source: '<div>hello {{msg}}</div>'
    }
  },
  loc: {
    start: { column: 1, line: 1, offset: 0 },
    end: { column: 25, line: 1, offset: 24 },
    source: '<div>hello {{msg}}</div>'
  }
}
```

模板中生成的 `renderFn`  内容如下

```javascript
const _Vue = Vue

return function render(_ctx, _cache) {
  with (_ctx) {
    const { toDisplayString: _toDisplayString, openBlock: _openBlock, createElementBlock: _createElementBlock } = _Vue

    return (_openBlock(), _createElementBlock("div", null, "hello " + _toDisplayString(msg), 1 /* TEXT */))
  }
}
```

由以上内容可以看出，当我们增加了复合表达式之后，`AST`、`JavaScript AST`和`render`  函数中多出了如下内容

```json
// AST
{
  type: 5, // NodeTypes.INTERPOLATION
  content: {
    type: 4, // NodeTypes.SIMPLE_EXPRESSION
    isStatic: false,
    constType: 0,
    content: 'msg',
    loc: {
      start: { column: 14, line: 1, offset: 13 },
      end: { column: 17, line: 1, offset: 16 },
      source: 'msg'
    }
  },
  loc: {
    start: { column: 12, line: 1, offset: 11 },
    end: { column: 19, line: 1, offset: 18 },
    source: '{{msg}}'
  }
}
```

```json
// JavaScript AST
{
  type: 8,
  loc: {
    start: { column: 6, line: 1, offset: 5 },
    end: { column: 12, line: 1, offset: 11 },
    source: 'hello '
  },
  children: [
    {
      type: 2,
      content: 'hello ',
      loc: {
        start: { column: 6, line: 1, offset: 5 },
        end: { column: 12, line: 1, offset: 11 },
        source: 'hello '
      }
    },
    // --------------------------- 以下为多出来的 ---------------------------
    ' + ',
    {
      type: 5, // NodeTypes.INTERPOLATION
      content: {
        type: 4, // NodeTypes.SIMPLE_EXPRESSION
        isStatic: false,
        constType: 0,
        content: 'msg',
        loc: {
          start: { column: 14, line: 1, offset: 13 },
          end: { column: 17, line: 1, offset: 16 },
          source: 'msg'
        }
      },
      loc: {
        start: { column: 12, line: 1, offset: 11 },
        end: { column: 19, line: 1, offset: 18 },
        source: '{{msg}}'
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
  type: 5, // NodeTypes.INTERPOLATION
  content: {
    type: 4, // NodeTypes.SIMPLE_EXPRESSION
    isStatic: false,
    constType: 0,
    content: 'msg',
    loc: {
      start: { column: 14, line: 1, offset: 13 },
      end: { column: 17, line: 1, offset: 16 },
      source: 'msg'
    }
  },
  loc: {
    start: { column: 12, line: 1, offset: 11 },
    end: { column: 19, line: 1, offset: 18 },
    source: '{{msg}}'
  }
}
```

查看`packages/compiler-core/src/parse.ts`中的代码逻辑，找到 `parseChildren`  方法

我们知道该方法主要是用来解析子节点，内部存在的 `if`  逻辑

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
      content: preTrimContent.trim()
    }
  }
}
```

然后在`/packages/compiler-core/src/compile.ts`  中打印 生成的 `ast`，代码如下

```typescript
export function baseCompile(template: string, options) {
  const ast = baseParse(template)
  console.log(JSON.stringify(ast)) // 打印生成的 ast
  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText]
    })
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
        { type: 5, content: { type: 4, isStatic: false, content: 'msg' } }
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
        { type: 2, content: 'hello--' },
        { type: 5, content: { type: 4, isStatic: false, content: 'msg' } }
      ]
    }
  ],
  loc: {}
}
```

在`vue-next-3.2.7`项目中，运行`npm run dev`并重新运行上一小节的测试示例

可以看到在浏览器中成功显示如下效果，说明我们的`ast`结构复合`vue`源码中的结构要求

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76478725d0274c2e9d55e1293e9bdc6a~tplv-k3u1fbpfcp-watermark.image?)

## 04：响应性数据的编译器处理：JavaScript AST 转化逻辑

```json
// 需要新增的 JavaScript AST 结构
{
  type: 8,
  loc: {
    start: { column: 6, line: 1, offset: 5 },
    end: { column: 12, line: 1, offset: 11 },
    source: 'hello '
  },
  children: [
    {
      type: 2,
      content: 'hello ',
      loc: {
        start: { column: 6, line: 1, offset: 5 },
        end: { column: 12, line: 1, offset: 11 },
        source: 'hello '
      }
    },
    // --------------------------- 以下为多出来的 ---------------------------
    ' + ',
    {
      type: 5, // NodeTypes.INTERPOLATION
      content: {
        type: 4, // NodeTypes.SIMPLE_EXPRESSION
        isStatic: false,
        constType: 0,
        content: 'msg',
        loc: {
          start: { column: 14, line: 1, offset: 13 },
          end: { column: 17, line: 1, offset: 16 },
          source: 'msg'
        }
      },
      loc: {
        start: { column: 12, line: 1, offset: 11 },
        end: { column: 19, line: 1, offset: 18 },
        source: '{{msg}}'
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

然后我们在`compile.ts`  中对于 `ast`进行打印

```typescript
export function baseCompile(template: string, options) {
  const ast = baseParse(template)
  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText]
    })
  )
  console.log(ast)
  return generate(ast)
}
```

结果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cfb615ca3014dbfa5b87053fc540586~tplv-k3u1fbpfcp-watermark.image?)

## 05：响应性数据的编译器处理：render 转化逻辑分析

## 06：响应性数据的编译器处理：generate 生成 render 函数

## 07：响应性数据的编译器处理：render 函数的执行逻辑

