# jQuery 源码解读

## 1. 基本结构

1. 自执行函数：

   * 好处

     * 创建一个独立的作用域,保护内部变量不受污染
     * 立即执行

   * 代码展示(这里下载的是 jQuery 3.6.0 版本的)

     ```javascript
     (function (global, factory) {
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
     })(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
       console.log('我是factory函数')
       // 内部逻辑
       var version = '3.6.0',
         jQuery = function () {}
       if (typeof noGlobal === 'undefined') {
         window.jQuery = window.$ = jQuery
       }
     
       return jQuery
     })
     ```

2. 内容结构整理

   * (43, 152) 定义了一些变量和函数 jQuery = function(){ }
   * (154, 248) 给 JQ 对象，添加一些方法和属性
   * (250, 326) extend：JQ的继承方法
   * (328, 495) jQuery.extend(): 扩展一些工具方法
   * (530, 3148) Sizeele: 复杂选择器的实现
   * (3618, 3795) Callbacks: 回调对象：函数的统一管理
   * (3834, 4190) Deferred:  延迟对象：对异步的统一管理
   * (4605, 4693) data(): 数据缓存
   * (4763, 4829) queue(): 队列管理
   * (5014, 5034) show() hide() toggle() 隐藏/显示/切换操作
   * (5316, 5776) jQuery.event 
   * (5873, 5960) jQuery.Event
   * (6075, 6115) on()、one()、off() 事件处理
   * (6328, 6615) DOM操作：添加、删除、获取、包装等
   * (7089 ,7398) CSS操作：
   * (7508, 8224) 动画

   * (8265, 8361) attr() 针对元素属性的操作 
   * (8398, 8476) prop() 针对元素属性的操作
   * (8551, 8721) addClass() removeClass() toggleClass() hasClass() 
   * (9083, 9095) trigger() 事件触发操作
   * (9247, 11014) ajax() 相关方法
   * (10763, 10878) offset() position() offsetParent()
   * (11016, 11037) bind() unbind() delegate() undelegate() hover()


## 2、其中的一些注释

1. 为什么里面使用`use strict`

   >Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1 throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common enough that all such attempts are guarded in a try block.
   >
   >
   >
   >Edge<=12-13+、Firefox<=18-45+、IE 10-11、Safari 5.1-9+、iOS 6-9.1当非严格代码（例如ASP.NET 4.5）访问严格模式时引发异常
   >
   >arguments.callee。呼叫者（trac-13335）。但从jQuery 3.0（2016）开始，严格模式应该是常见的足以使所有此类尝试在try块中受到保护。

   



