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
  // 创建 template
  const template = `<div>hello {{msg}}</div>`
  // 生成 render 函数
  const renderFn = compile(template)
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
                        "start": {
                            "column": 6,
                            "line": 1,
                            "offset": 5
                        },
                        "end": {
                            "column": 12,
                            "line": 1,
                            "offset": 11
                        },
                        "source": "hello "
                    },
                    "children": [
                        {
                            "type": 2,
                            "content": "hello ",
                            "loc": {
                                "start": {
                                    "column": 6,
                                    "line": 1,
                                    "offset": 5
                                },
                                "end": {
                                    "column": 12,
                                    "line": 1,
                                    "offset": 11
                                },
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
                                    "start": {
                                        "column": 14,
                                        "line": 1,
                                        "offset": 13
                                    },
                                    "end": {
                                        "column": 17,
                                        "line": 1,
                                        "offset": 16
                                    },
                                    "source": "msg"
                                }
                            },
                            "loc": {
                                "start": {
                                    "column": 12,
                                    "line": 1,
                                    "offset": 11
                                },
                                "end": {
                                    "column": 19,
                                    "line": 1,
                                    "offset": 18
                                },
                                "source": "{{msg}}"
                            }
                        }
                    ]
                }
            ],
            "loc": {
                "start": {
                    "column": 1,
                    "line": 1,
                    "offset": 0
                },
                "end": {
                    "column": 25,
                    "line": 1,
                    "offset": 24
                },
                "source": "<div>hello {{msg}}</div>"
            },
            "codegenNode": {
                "type": 13,
                "tag": "\"div\"",
                "children": {
                    "type": 8,
                    "loc": {
                        "start": {
                            "column": 6,
                            "line": 1,
                            "offset": 5
                        },
                        "end": {
                            "column": 12,
                            "line": 1,
                            "offset": 11
                        },
                        "source": "hello "
                    },
                    "children": [
                        {
                            "type": 2,
                            "content": "hello ",
                            "loc": {
                                "start": {
                                    "column": 6,
                                    "line": 1,
                                    "offset": 5
                                },
                                "end": {
                                    "column": 12,
                                    "line": 1,
                                    "offset": 11
                                },
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
                                    "start": {
                                        "column": 14,
                                        "line": 1,
                                        "offset": 13
                                    },
                                    "end": {
                                        "column": 17,
                                        "line": 1,
                                        "offset": 16
                                    },
                                    "source": "msg"
                                }
                            },
                            "loc": {
                                "start": {
                                    "column": 12,
                                    "line": 1,
                                    "offset": 11
                                },
                                "end": {
                                    "column": 19,
                                    "line": 1,
                                    "offset": 18
                                },
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
                    "start": {
                        "column": 1,
                        "line": 1,
                        "offset": 0
                    },
                    "end": {
                        "column": 25,
                        "line": 1,
                        "offset": 24
                    },
                    "source": "<div>hello {{msg}}</div>"
                }
            }
        }
    ],
    "helpers": [
        null,
        null,
        null
    ],
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
                "start": {
                    "column": 6,
                    "line": 1,
                    "offset": 5
                },
                "end": {
                    "column": 12,
                    "line": 1,
                    "offset": 11
                },
                "source": "hello "
            },
            "children": [
                {
                    "type": 2,
                    "content": "hello ",
                    "loc": {
                        "start": {
                            "column": 6,
                            "line": 1,
                            "offset": 5
                        },
                        "end": {
                            "column": 12,
                            "line": 1,
                            "offset": 11
                        },
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
                            "start": {
                                "column": 14,
                                "line": 1,
                                "offset": 13
                            },
                            "end": {
                                "column": 17,
                                "line": 1,
                                "offset": 16
                            },
                            "source": "msg"
                        }
                    },
                    "loc": {
                        "start": {
                            "column": 12,
                            "line": 1,
                            "offset": 11
                        },
                        "end": {
                            "column": 19,
                            "line": 1,
                            "offset": 18
                        },
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
            "start": {
                "column": 1,
                "line": 1,
                "offset": 0
            },
            "end": {
                "column": 25,
                "line": 1,
                "offset": 24
            },
            "source": "<div>hello {{msg}}</div>"
        }
    },
    "loc": {
        "start": {
            "column": 1,
            "line": 1,
            "offset": 0
        },
        "end": {
            "column": 25,
            "line": 1,
            "offset": 24
        },
        "source": "<div>hello {{msg}}</div>"
    }
}
```

























03：响应性数据的编译器处理：AST 解析逻辑

04：响应性数据的编译器处理：JavaScript AST 转化逻辑

05：响应性数据的编译器处理：render 转化逻辑分析

06：响应性数据的编译器处理：generate 生成 render 函数

07：响应性数据的编译器处理：render 函数的执行逻辑

