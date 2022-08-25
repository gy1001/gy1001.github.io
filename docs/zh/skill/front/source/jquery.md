# jQuery 源码解读

## 1. 基本结构

1. 自执行函数：

   - 好处

     - 创建一个独立的作用域,保护内部变量不受污染
     - 立即执行

   - 代码展示(这里下载的是 jQuery 3.6.0 版本的)

     ```javascript
     ;(function (global, factory) {
       'use strict'
       if (typeof module === 'object' && typeof module.exports === 'object') {
         // 对于 CommonJS 和 类似 CommonJS 的环境，其中有一个属性 window ,执行工厂函数然后获得 jQuery
         //  对于一些没有 document 的 window （例如 nodejs），将通过 module.exports 暴露一个 factory
         // 这个需要创建一个真的 window ，例子 var jQuery = require("jquery")(window);
         module.exports = global.document
           ? factory(global, true)
           : function (w) {
               if (!w.document) {
                 throw new Error('jQuery requires a window with a document')
               }
               return factory(w)
             }
       } else {
         factory(global)
       }
     })(
       typeof window !== 'undefined' ? window : this,
       function (window, noGlobal) {
         console.log('我是factory函数')
         // 内部逻辑
         var version = '3.6.0',
           jQuery = function () {}
         if (typeof noGlobal === 'undefined') {
           window.jQuery = window.$ = jQuery
         }
         return jQuery
       }
     )
     ```

2. 内容结构整理

   - (43, 152) 定义了一些变量和函数 jQuery = function(){ }
   - (154, 248) 给 JQ 对象，添加一些方法和属性
   - (250, 326) extend：JQ 的继承方法
   - (328, 495) jQuery.extend(): 扩展一些工具方法
   - (530, 3148) Sizeele: 复杂选择器的实现
   - (3618, 3795) Callbacks: 回调对象：函数的统一管理
   - (3834, 4190) Deferred: 延迟对象：对异步的统一管理
   - (4605, 4693) data(): 数据缓存
   - (4763, 4829) queue(): 队列管理
   - (5014, 5034) show() hide() toggle() 隐藏/显示/切换操作
   - (5316, 5776) jQuery.event
   - (5873, 5960) jQuery.Event
   - (6075, 6115) on()、one()、off() 事件处理
   - (6328, 6615) DOM 操作：添加、删除、获取、包装等
   - (7089 ,7398) CSS 操作：
   - (7508, 8224) 动画

   - (8265, 8361) attr() 针对元素属性的操作
   - (8398, 8476) prop() 针对元素属性的操作
   - (8551, 8721) addClass() removeClass() toggleClass() hasClass()
   - (9083, 9095) trigger() 事件触发操作
   - (9247, 11014) ajax() 相关方法
   - (10763, 10878) offset() position() offsetParent()
   - (11016, 11037) bind() unbind() delegate() undelegate() hover()

## 2、其中的一些注释

1. 为什么里面使用`use strict`

   > Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1 throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common enough that all such attempts are guarded in a try block.
   >
   > Edge<=12-13+、Firefox<=18-45+、IE 10-11、Safari 5.1-9+、iOS 6-9.1 当非严格代码（例如 ASP.NET 4.5）访问严格模式时引发异常
   >
   > arguments.callee。呼叫者（trac-13335）。但从 jQuery 3.0（2016）开始，严格模式应该是常见的足以使所有此类尝试在 try 块中受到保护。

## 3、一些神奇的代码片段

1. `jQuery.prototype.init`

   逻辑分析：这里 `jQuery`函数返回器原型上的`prototype.init()`，同时`jQuery.prototype.init.prototype = jQuery.prototype`,这样就可以保证`jQuery()`身上拥有其原型上的方法。也就是其中的`css`方法等，这里算是一个利用原型设计的一个巧妙之处。

   ```javascript
   function jQuery() {
     return new jQuery.prototype.init()
   }
   jQuery.prototype.init = function () {
     console.log('我是init 初始化')
   }
   jQuery.prototype.css = function () {
     console.log('我是css方法')
   }
   jQuery.prototype.init.prototype = jQuery.prototype

   jQuery().css()
   ```

2. 分析 Init 函数

   ```javascript
   var rootjQuery,
     // rquickExpr包含两个分组，一个匹配HTML、一个匹配ID。
     rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
     init = (jQuery.fn.init = function (selector, context, root) {
       //参数selector可以是任意类型的值，但只有undefined、DOM元素、
       //字符串、函数、jQuery对象、普通JavaScript对象这几种类型是有效的，
       //其他类型的值也可以接受但没有意义。
       //参数context可以不传，或传入DOM元素、jQuery对象、普通JavaScript对象之一。
       //参数root用于document.getElementById()查找失败、selector是选择器表达式且未指定context、selector是函数三种情况情况。
       var match, elem
       // 排除: $(""), $(null), $(undefined), $(false), 直接返回this。这时this是空jQuery对象，其属性length为0
       if (!selector) {
         return this
       }
       // 重置root：rootjQuery包含了document对象的jQuery对象，以此支持jquery.sub
       root = root || rootjQuery
       // 处理HTML字符串参数
       // $('#div1') $(".box") $("div") $("#div div.box")
       // $("<li>") $("<li>hello") $("<li>1</li><li>2</li>")
       if (typeof selector === 'string') {
         // 如果参数selector以“<”开头以“>”结尾，且长度大于3。
         // 则“假设”这个字符串是HTML片段，跳过正则表达式检查。
         // 否则就用正则rquickExpr检查字符串是否是ID、标签、类选择器，匹配的结果放到match数组中。
         if (
           selector[0] === '<' &&
           selector[selector.length - 1] === '>' &&
           selector.length >= 3
         ) {
           // 匹配如下方式的
           // 处理 html 字符串
           // $("<li>"): match = [null, "<li>", null]
           // $("<li>1</li><li>2</li>") match = [null, <li>1</li><li>2</li>, null]
           match = [null, selector, null]
         } else {
           // $('#div1'): match = ['#div1', undefined, 'div1']
           // $(".box"):  macth = null
           // $("div")    match = null
           // $("#div div.box") match = null
           // $("<li>hello") match = ['<li>hello', '<li>', undefined]
           match = rquickExpr.exec(selector)
         }
         // 匹配 html 元素 或者确保 没有为 id 选择器指定 context
         // 如果match[1]不是undefined，即参数selector是HTML代码，
         // 或者match[2]不是undefined，即参数selector是#id，并且未传入参数context。
         // 完整版的判断如下 if (match && (match[1] || match[2] && !context)) {} ，为什么省略了对//match[2]的判断？
         // 因为如果match不是null且match[1]是undefined，那么此时match[2]必然不是undefined，所以对match[2]的判断可以省略。
         if (match && (match[1] || !context)) {
           // HANDLE: $(html) -> $(array)
           // 判断字符串是HTML
           if (match[1]) {
             // 修正context：context = context instanceof jQuery ? context[0] : context;。
             // 先判断第二个参数的类型在将context赋值成原生的节点。例如输入的是：$('li',document)或$('li',$(document))。
             context = context instanceof jQuery ? context[0] : context
             // Option to run scripts is true for back-compat
             // Intentionally let the error be thrown if parseHTML is not present
             //判断能否向后兼容：jQuery.merge(this, jQuery.parseHTML())。
             // jQuery.parseHTML()用于将HTML字符串解析为对应的DOM节点数组。有三个参数：htmlString,context,keepScripts。HTMLString，string类型，需要解析并转为DOM节点数组的字符串。context，element类型。指定在那个document中创建元素。默认为当前文档的document。keepscript，boolean类型，指定传入的字符串中是否包含脚本，默认为false。
             // 我们传入了三个参数："match[ 1 ],context && context.nodeType ? context.ownerDocument || context : document,true"。如果context与context的节点存在，使用context或context的owner document，否则用默认参数domcument。
             // jQuery.merge()用于合并两个数组内容到第一个数组。注意这时传入的this是个json对象而不是数组，通过这种方式也能进行合并并返回jQuery想要的json格式。
             // 这里的this 结构类似于对象性数组，比如 $("li") 选中一组元素，其本身this是 { 0:"li", 1: "li",length: 2, version:"3.0.6" ... }
             jQuery.merge(
               this,
               jQuery.parseHTML(
                 match[1],
                 context && context.nodeType
                   ? context.ownerDocument || context
                   : document,
                 true
               )
             )
             // HANDLE: $(html, props)
             // 解析$(HTML, props)格式
             // 如果正则rsingleTag验证"match[1]"是否是一个单独的标签，且context是一个纯粹的对象条件成立。循环这个json对象，并判断json里的属性是否是jq自带的方法，如果是，则直接调用方法，否则，用jq的attr方法为这个标签加一个“match”属性。
             if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
               for (match in context) {
                 // Properties of context are called as methods if possible
                 if (isFunction(this[match])) {
                   this[match](context[match])
                   // ...and otherwise set as attributes
                 } else {
                   this.attr(match, context[match])
                 }
               }
             }
             return this
             // HANDLE: $(#id)
           } else {
             // 判断字符串是ID且未指定参数
             //使用getElementById()方法查找含有Id属性的DOM元素
             elem = document.getElementById(match[2])
             //如果DOM元素存在，设置第一个元素，属性length，并返回当前对象。
             if (elem) {
               // Inject the element directly into the jQuery object
               this[0] = elem
               this.length = 1
             }
             // 返回当前对象
             return this
           }
           // HANDLE: $(expr, $(...))
           // 判断字符串是选择器表达式
         } else if (!context || context.jquery) {
           // 如果没有指定上下文，则执行root.find(selector);
           // 如果指定了上下文，且上下文是jQuery对象，则执行context.find(selector);
           return (context || root).find(selector)
           // HANDLE: $(expr, context)
           // (which is just equivalent to: $(context).find(expr)
         } else {
           // 如果制定了上下文，但上下文不是jQuery对象，则执行this.constructor(context).find(selector)
           // 即先创建一个包含了context的jQuery对象，然后在该对象上调用find()方法。
           return this.constructor(context).find(selector)
         }
         // HANDLE: $(DOMElement)
         // 如果参数selector含有属性nodeType，则认为selector是DOM元素，设置第一个元素指向该DOM元素、属性length为1，然后返回包含了改DOM元素引用的jQuery对象。nodeType声明了文档树中节点的类型，例如，element节点的该属性值是1，text节点是3，comment是9，document是9, documentfragment节点是11。
         // 参数selector是节点，设置第一个元素、属性length，并返回当前对象。
       } else if (selector.nodeType) {
         this[0] = selector
         this.length = 1
         return this
         // HANDLE: $(function)
         // Shortcut for document ready
         // 参数selector是函数
       } else if (isFunction(selector)) {
         // 判断root.ready是否存在，存在则执行root.ready(selector)，否则执行该方法；
         return root.ready !== undefined
           ? root.ready(selector)
           : // Execute immediately if ready is not present
             selector(jQuery)
       }
       // 如果selector是JavaScript对象，则作为第一个元素放入当前jQuery对象中；
       // 如果是其他类型的值，则作为第一个元放入当前jQuery对象中。最后返回当前对象。
       // 参数selector是任意值，如果selector是数组或伪数组（如jQuery对象），则都添加到当前jQuery对象中；
       return jQuery.makeArray(selector, this)
     })
   // Give the init function the jQuery prototype for later instantiation
   // 通过 init.prototype = jQuery.fn; 用jQuery()原型对象覆盖了jQuery.fn.init()的原型对象。
   init.prototype = jQuery.fn
   // Initialize central reference
   // 初始化rootjQuery
   rootjQuery = jQuery(document)
   ```
   
   参考链接:
   
   [jQuery 源码之构造 jQuery 对象——jQuery.fn.init(selector, context, root)](https://blog.csdn.net/chunchun1230/article/details/104123590)
