# 02-初识 Vim，想说爱你不容易

## 01: 初识 Vim，想说爱你不容易

### 下载与安装

**作为开发者的你，安装 Vim 应该很简单**

* Linux/Unix(Mac) 自带 Vim, 直接终端里输入 Vim 即可进入
* Windows 用户可以下载 GVim 等安装和体验
* 建议 Windows 用户可以尝试使用虚拟机来体验 Linux 下的 Vim

### 初始 Vim

**据说 Stackoverflow 帮助过上百万开发者退出 Vim**

* 输入 Vim 似乎没法输入东西，起始模式进去是 normal 模式
* 使用 :q 可以退出 Vim

### 开始编辑

**进入编辑模式就可以像其他编辑器一样编辑了**

* 使用 i 进入编辑模式，开始输入文字
* i 表示 insert, a(append), o(open a line below)
* 使用 Esc 又可以回到 normal 模式，使用 :wq 保存退出
* i: 在光标所在字符前开始插入
* a: 在光标所在字符后开始插入
* o: 在光标所在行的下面另起一新行插入
* s: 删除光标所在的字符并开始插入
* r: 替换光标后的一个字符
* I: 在光标所在行的行首开始插入 如果行首有空格则在空格之后插入（insert before line）
* A: 在光标所在你行的行尾开始插入（append after line）
* O: 在光标所在行的上面另起一行开始插入（open a line above）
* S: 删除光标所在行并开始插入
* R: 替换光标所在行的所有字符

## 02: Vim，为什么你有这么多模式

### “怪异”的 Vim 模式

**Vim 和其他很多编辑器的区别在于多种模式**

* 进入 Vim 默认是 normal（普通）模式？为什么不是编辑模式呢 ？
* 使用 a(append) i(insert) 等进入编辑模式
* 还是有 :cmd 命令模式和 visual 可视化模式

### 进入 Vim 默认是 normal（普通）模式？为什么不是编辑模式呢 ？

**奇怪的是，为什么 Vim 进入之后不像其他编辑器一样直接插入？**

* 进入 Vim 模式默认是 normal 普通模式。使用 Esc 从插入回到普通模式
* 普通模式下可以进行各种命令操作和移动
* 大部分情况下你是在浏览而不是编辑，所以 Vim 默认是 normal

### Insert -插入模式

**插入模式下 Vim 可以直接编辑，和其他编辑器一样**

* 使用 i(insert) a(append) o(open a line below)进入插入模式
* 使用 Esc 退出插入模式到 noramal 模式
* 你来试试 I A O 如何进入插入模式的 ？

### Command(命令)模式

**Normal 模式下输入：之后执行命令，比如保存退出:wq一气呵成**

* 顾名思义，执行 Vim 命令，比如保存 :w ，退出 :q
* 比如分屏 :vs(vertical split) :sp(split)
* 比如使用 :% s/foo/bar/g 全局替换

### Visual 可视化模式

**Visual 模式一般用来块状选择文本**

* Normal 模式下使用 v 进入 visual 选择
* 使用 V 选择行
* 使用 ctrl + v 进行方块选择

## 03: Vim 插入模式小技巧
## 04: Vim 快速移动大法 
## 05: Vim快速增删改查
## 06: Vim 如何搜索替换
## 07: Vim 多文件操作 
## 08: 什么是 Vim 的 text object 
## 09: Vim复制粘贴与寄存器的使用 
## 10: Vim 如何用宏完成强大的批量操作
## 11: Vim 补全大法 
## 12: 给 Vim 换个配色 
## 13: 本章小结：裸 Vim 也很强 