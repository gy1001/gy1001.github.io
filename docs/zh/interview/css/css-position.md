# CSS-定位

## 1. absolute 和 relative 分别依赖什么定位
- relative 依据自身定位
- absolute 依据最近一层的定位元素定位（**定位元素：absolute relative fixed body**）

## 2. 居中对齐有哪些实现方式
- 水平居中
  - inline 元素：`text-align: center`
  - block 元素： `margin: auto`
  - absolute 元素：`left: 50% + margin-left 负值自身宽度的一半`
- 垂直居中
  - inline 元素： `line-height 的值等于 height 值`
  - absolute 元素：`top: 50% + margin-top 负值自身高度的一半`
  - absolute 元素：`transform: translate(-50%, -50%)`
  - absolute 元素：`top,left,right,bottom=0 + margin: auto`
