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

     

## 参考文章

[Vue 中的 AST 与虚拟 Dom](https://blog.xiangfa.org/2021/01/AST-and-virtual-dom-in-vue/)
