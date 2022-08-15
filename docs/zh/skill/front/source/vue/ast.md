# 源码探秘之 AST 抽象语法树

## 前言

1. 抽象语法树是什么

   > 抽象语法树（Abstract Syntax Tree）本质上就是一个 JS 对象。
   >
   > 在计算机科学中，称之为抽象语法树，或简称语法树，是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。[维基百科](https://zh.wikipedia.org/zh-cn/抽象語法樹)

   * [AST Explorer](https://astexplorer.net/)这个网址可以帮助我们更加直观的展示AST的抽象结构。

2. 抽象语法树和虚拟节点的关系

   > **这两者没有并没有关系**。因为它们是不同的阶段的产物。
   >
   > AST 大多是在编译过程中出现，常规的开发框架并不涉及AST的概念，项目运行时就不会再有AST的概念
   >
   > 虚拟DOM 是运行时候(vue-runtime)出现的一种数据中间态，它是在 render 过程中出现的，主要用于比较 render 前后的数据结构变化

   * 过程：模板语法 ===> 抽象语法树 AST ===> 渲染函数（h函数）===> 虚拟节点 ===> 界面

## 1、相关算法储备：指针思想

1. 试寻找字符串中，连续重复次数最多的字符。

   ```javascript
   var string = "aaaaadddddddbbbbbbbbbcccccccceeeeffffggss"
   ```

   * 逻辑原理：运用双指针`i`和`j`，`i`开始指向索引 0，`j`开始指向索引 1

     * 如果`i`和`j`指向的字一样，那么`i`不对，`j`后移
     * 如果`i`和`j`指向的字不一样，此时说明它们之间的字都是连续相同的，让`i`追上`j`,`j`继续后移，继续上面的逻辑
     * 前提 `i`< `string.length`

   * 代码展示

     ```javascript
     // 1. 试寻找字符串中，连续重复次数最多的字符。
     var string = 'aaaaadddddddddddddddddbbbbbbbccccccccccccceeeeffffggss'
     function calcRepeatMaxNumber() {}
     
     // 指针
     let i = 0,
         j = 1
     // 当前重复次数最多的次数
     var maxRepeatCount = 0
     // 当前重复次数做多的字母
     var maxRepeatChar
     while (i <= string.length - 1) {
       if (string[i] !== string[j]) {
         console.log(
           `${i}和${j}之间的文字相同，文字${string[i]}重复了${j - i}次`
         )
         if (j - i > maxRepeatCount) {
           maxRepeatCount = j - i
           maxRepeatChar = string[i]
         }
         i = j
       }
       j++
     }
     console.log(maxRepeatCount, maxRepeatChar)
     // 17 'd'
     ```

## 2、算法相关储备-递归深入

1. 递归题目1：试输出斐波那契数列的前10项，即 1、1、2、3、5、8、13、21、34、55。然后请思考，代码中是否有大量重复的计算，如何解决重算计算的问题？

   * 逻辑原理：加入缓存对象，缓存之前已经计算的结果，后续直接使用那个，避免重复计算

   * 代码实现

     ```javascript
     // 试着输出斐波那契额数列中的前10项，即 1、1、2、3、5、8、13、21、34、55
     // 创建一个函数，功能是返回下标为n的这项的数字
     // function fib(n) {
     //   if (n === 0 || n === 1) {
     //     return 1
     //   }
     //   return fib(n - 2) + fib(n - 1)
     // }
     
     // 优化方案
     // 缓存对象
     const cacheObj = {}
     function fib(n) {
       if (cacheObj.hasOwnProperty(n)) {
         return cacheObj[n]
       }
       const result = n === 0 || n === 1 ? 1 : fib(n - 2) + fib(n - 1)
       cacheObj[n] = result
       return result
     }
     
     for (let index = 0; index < 10; index++) {
       console.log(fib(index))
     }
     ```

2. 递归题目2：试将高伪数组 [1,2,[3,[4,5],6],7,[8],9]变为如下的结构

   > 小技巧：只要出现了规则重复，就要想到用递归。

   ```javascript
   {
     children: [
       { value: 1 },
       { value: 2 },
       {
         children: [
           { value: 3 },
           { children: [{ value: 4 }, { value: 5 }] },
           { value: 6 },
         ],
       },
       { value: 7 },
       {
         children: [{ value: 8 }],
       },
       { value: 9 },
     ],
   }
   ```

   * 逻辑原理:

   * 代码实现：

     ```javascript
     var a = [1, 2, [3, [4, 5], 6], 7, [8], 9]
     
     function convert(arr) {
       // 准备一个结果数组
       const resultArr = []
     
       arr.forEach((item) => {
         if (typeof item === 'number') {
           resultArr.push({
             value: item,
           })
         } else if (Array.isArray(item)) {
           resultArr.push({ children: convert(item) })
         }
       })
       return resultArr
     }
     
     // 优化写法
     function convert2(item) {
       if (typeof item === 'number') {
         return { value: item }
       } else if (Array.isArray(item)) {
         return { children: item.map((_item) => convert2(_item)) }
       }
     }
     console.log(convert(a))
     console.log(convert2(a))
     ```

## 3、算法相关储备：栈

### 3.1 栈的定义

* 栈（stack）又名堆栈，它是一种运算受限的线性表，**仅在表尾能进行插入和删除操作**。这一端被称为**栈顶**，把另一端常伟**栈底**
* 向一个栈插入新元素又称为**进栈、入栈或者压栈**；从一个栈删除元素又被称作**出栈或退栈**
* **后进先出(LFIO)特点**：栈中的元素，最先进栈的必定是最后出栈，后进栈的一定会先出栈
* 在JavaScript中，栈可以用**数组模拟**。需要限制只能适用 push 和 pop, 不能使用 unshift 和 shift。即**数组尾是栈顶**。
* 当然，可以用面向对象等手段，将栈封装的更好。

### 3.2 利用栈的题目

1. 试着编写，”只能重复“ smartRepeat 函数， 实现

   * 以下效果

     * 将 3[a,b,c] 变为 abcabcabc
     * 将3[2[a]2[b]]变为aabbaabbaabb
     * 将2[1[a]3[b]2[3[c]4[d]]]变为 abbcccdddcccddddabbcccdddcccdddd
     * 不用考虑输入字符时非法的情况，比如
       * 2[a3[b]]是错误的，应该补一个1，即2[1[a]3[b]]
       * [abc]使错误的，应该补一个1，即1[abc]

   * 难点：我们需要分辨 ] 和前面的哪一个 [ 是一对的，所以用栈的思想更好处理

   * 逻辑原理：

     * 准备两个数组（模拟栈），一个用来存放数字，一个用来存放字符串。接着，遍历每一个字符
     * 如果这个字符是数字，那么就把数字压栈，把空字符串压栈
     * 如果这个字符是字母，那么就把栈顶这项改为这个字母
     * 如果这个字符是 ],那么将数字弹栈，并把字符串的栈顶元素重复刚刚的这个次数弹栈，然后拼接到字符串的新栈顶上

   * 代码展示

     ```javascript
     function smartRepeat(templateStr) {
       // 指针
       let index = 0
       // 两个栈
       const stackNumber = []
       const stackString = []
       // 剩余部分
       let restString = templateStr
       while (index < templateStr.length - 1) {
         // 剩余部分
         rest = templateStr.substring(index)
         // 判断剩余部分是不是以数字和【开头
         if (/^\d+\[/.test(rest)) {
           console.log('以数字开头')
           // 得到这个数字
           const number = Number(rest.match(/^(\d+)\[/)[1])
           stackNumber.push(number)
           stackString.push('')
           index += number.toString().length
         } else if (/^\w+\]/.test(rest)) {
           console.log('以字母开头')
           const word = rest.match(/^(\w+)\]/)[1]
           stackString[stackString.length - 1] = word
           index += word.length
         } else {
           if (/^\]/.test(rest)) {
             console.log(rest, '以]开头')
             const number = stackNumber.pop()
             const word = stackString.pop()
             // console.log(word, number)
             stackString[stackString.length - 1] += word.repeat(number)
           }
           index++
         }
       }
       return stackString[0].repeat(stackNumber[0])
     }
     // const string = '2[3[abc]]'
     const string = '2[1[abc]3[bef]]'
     console.log(smartRepeat(string))
     ```

## 4、AST 实现原理

### 4.1 搭建基本环境

1. 执行以下命令

   ```shell
   mkdir vue-ast
   cd vue-ast
   npm init -y
   npm install webpack webpack-cli webpack-dev-server --save-dev
   npm install html-webpack-plugin --save
   ```

2. 新建`webpack.config.js`，内容如下

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const path = require('path')
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
     },
     plugins: [new HtmlWebpackPlugin({
       template:"./src/index.html"
     })],
   }
   ```

3. `package.json`中增加以下脚本

   ```javascript
   {
     ...
     "scripts": {
       "dev": "webpack server"
     },
   }
   ```

4. 新建`src/index.html`、`src/index.js`文件，写入需要的内容

5. 运行命令`npm run dev`，打开`http://localhost:8080`就可以看到运行的效果

### 4.2、手写 AST 原理



## 参考文章

[Vue 中的 AST 与虚拟 Dom](https://blog.xiangfa.org/2021/01/AST-and-virtual-dom-in-vue/)
