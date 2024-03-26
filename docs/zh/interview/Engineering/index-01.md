# 工程化相关面试题

## 1. 了解过 AST 吗？请说说它的运用场景？

### 代码的本质就是字符串

字符串的一些操作，就是所谓的编译

![image-20240326174356354](./assets/image-20240326174356354.png)

> 1. 词法分析（Lexical Analysis）：将代码转换为单词流，称为“词法单元”(tokens), 每个词法单元包含一个标识和一个属性值，比如变量名、数字、操作符号等等
> 2. 语法分析（parsing）:将词法单元流转换成抽象语法树（Abstract Syntax Tree 简称 AST），也就是标记所构成的数据结构，表示源代码的结构和规则。
> 3. 语义分析（Semantic Analysis）:在 AST 上执行类型检查、作用域检查等操作，以确保代码的正确性和安全性
> 4. 代码生成（Code Generation）:基于 AST 生成目标代码，包括优化代码结构、生成代码文本、进行代码压缩等等
>
> 下面是一个简单的 JavaScript 编译器实例代码
>
> 其中
>
> `laxer`是词法分析器，将源代码转换为词法单元流，生成 tokens
>
> `parser`是语法分析器，将词法单元流转换成抽象语法树；
>
> `samanticAnalysis`是语义分析器，对抽象语法树进行语义分析
>
> `codeGeneration`是代码生成器，将分析后的 AST 生成目标代码

### 一个编译器最核心的代码

```js
function compiler(sourceCode) {
  // 词法分析
  const tokens = laxer(sourceCode)
  // 语法分析
  const ast = parser(tokens)
  // 语义分析
  const analyzeAst = samanticAnalysis(ast)
  // 代码生成
  const targetCode = codeGeneration(analyzeAst)
  return targetCode
}
```

### 为什么在工作中需要用到编译原理？

> 一个公式编辑器、一个字符串复杂处理，特别是一些低代码平台，更是需要掌握 AST 以及编译原理。 比如： airtable、coda、glide、fibery 等

```ts
              LISP                      c
2 + 2         (add 2 2)                 add(2, 2)
4 - 2         (subtract 4 2)            subtract(4, 2)
2 + (4 - 2)   (add 2 (subtract 4 2))    add(2, subtract(4, 2))
```

将 LISP 的语言转换为 C
[实现一个 LISP to C 的语法转换器](https://zhuanlan.zhihu.com/p/140889954)

```js
// 词法分析，tokens
const tokenizer = (input: string) => {
  // 当前扫描字符的位置
  let current = 0
  // 存储的 token 值
  let tokens = []
  while (current < input.length) {
    let char = input[current]
    // 左括号
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      })
      current++
      continue
    }
    // 右括号
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      })
      current++
      continue
    }
    // 空格直接跳过
    let WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }
    // 数字取整个数字 直到遇到非数字的字符串为止
    let NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({ type: 'number', value })
      continue
    }
    // 双引号 取整个字符串 直到遇到下一个双引号为止
    if (char === '"') {
      let value = ''
      char = input[++current]
      while (char !== '"') {
        value += char
        char = input[++current]
      }
      char = input[++current]
      tokens.push({ type: 'string', value })

      continue
    }
    // 操作符 取整个字符串 直到遇到下一个非[a-z]的字符为止，一般为空格
    let LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''
      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({ type: 'name', value })

      continue
    }
    throw new TypeError('I dont know what this character is: ' + char)
  }
  return tokens
}
```

## 2. Babel 的 plugin 和 loader 的应用场景？

## 3. 请说说 webpack 的打包过程与原理？

<!-- ## 4. 请说说 webpack 的热更新原理？ -->

<!-- ## 5. 请说说 webpack 的 tree-shaking 原理？ -->

<!-- ## 6. 请说说 webpack 的代码分割原理？ -->

<!-- ## 7. 请说说 webpack 的动态 import 原理？ -->

<!-- ## 8. 请说说 webpack 的代码压缩原理？ -->

<!-- ## 9. 请说说 webpack 的 source map 原理？ -->

<!-- ## 10. 请说说 webpack 的代码缓存原理？ -->

<!-- ## 11. 请说说 webpack 的多进程打包原理？ -->

<!-- ## 12. 请说说 webpack 的多入口打包原理？ -->

<!-- ## 13. 请说说 webpack 的多页面打包原理？ -->

<!-- ## 14. 请说说 webpack 的多页面打包优化原理 -->
