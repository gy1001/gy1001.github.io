# 14-亡羊补牢-异常处理

## 01: 错误对象，不要只知道Error

### 错误类型

* 语法错误：代码中存在拼写错误，将导致程序完全或者部分不能运行
* 逻辑错误：代码语法正确，但是执行结果不匹配预期

### 错误对象

* Error: 通用的 Error
* EvalError: eval 的错误
* InternalError: 引擎内部错误
* RangeError: 数值变量或者参数超出其有效范围
* ReferenceError: 无效引用
* SynataxError: 语法错误
* TypeError: 变量或者参数不属于有效类型
* URIError: URL 编码/阶码错误
* AggergateError: 包含多个错误的错误

### Error

#### 定义

* 基础的错误对象，其他的错误对象均继承于它
* 属性
  * name: 错误名，用于识别错误类别
  * message: 错误文本消息
  * stack: 错误堆栈消息

#### Error: stack

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnEx">执行</button>
    <script>
      function trace() {
        try {
          throw new Error('哦豁，错误哦')
        } catch (err) {
          console.log('err.name', err.name)
          console.log('err.message', err.message)
          console.log('err.stack', err.stack)
          console.log('err.constructor:', err.constructor)
        }
      }
      function b() {
        trace()
      }
      function a() {
        b()
      }
      btnEx.onclick = a
    </script>
  </body>
</html>
```

执行后，错误信息如下

```text
err.name Error
err.message 哦豁，错误哦
err.stack Error: 哦豁，错误哦
    at trace (file:///Users/yuangao/Code/Learn/MyGithub/Javascript/JavaScript-Crack/14.%20Errror/14.1%E5%B8%B8%E8%A7%81%E7%9A%84%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B%EF%BC%8C%E4%B8%8D%E8%A6%81%E5%8F%AA%E7%9F%A5%E9%81%93Error/0.%20Error.html:20:17)
    at b (file:///Users/yuangao/Code/Learn/MyGithub/Javascript/JavaScript-Crack/14.%20Errror/14.1%E5%B8%B8%E8%A7%81%E7%9A%84%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B%EF%BC%8C%E4%B8%8D%E8%A6%81%E5%8F%AA%E7%9F%A5%E9%81%93Error/0.%20Error.html:29:9)
    at HTMLButtonElement.a (file:///Users/yuangao/Code/Learn/MyGithub/Javascript/JavaScript-Crack/14.%20Errror/14.1%E5%B8%B8%E8%A7%81%E7%9A%84%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B%EF%BC%8C%E4%B8%8D%E8%A6%81%E5%8F%AA%E7%9F%A5%E9%81%93Error/0.%20Error.html:32:9)
err.constructor: ƒ Error() { [native code] }
```

### EvalError

* 历史遗孤。eval相关的错误
* **产生：1. 不是被直接调用 2. 被赋值**
* 理论上你碰不到这个错误了（demo）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EvalError</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnEx">执行</button>

    <script>
      btnEx.onclick = function () {
        try {
          new eval()
          eval = function () {}
        } catch (err) {
          console.log('err', err)
          console.log('err.constructor:', err.constructor)
          console.log('instanceof EvalError:', err instanceof EvalError)
        }
      }
    </script>
  </body>
</html>
```

执行后，报错信息如下

```text
err TypeError: eval is not a constructor
    at btnEx.onclick (1. EvalError.html:21:11)
err.constructor: ƒ TypeError() { [native code] }
instanceof EvalError: false
```

### InternalError

* 高级程序的红皮书和 MDN 都有提到这个对象，可惜的是 just firefox 支持
* 产生：过多 case 语句，正则表达式中括号过多，递归过深等

### RangeError

* 当一个值不在其所允许的范围或者集合中
* 当传递一个不合法的 length 值作为 Arry 构造器的参数创建数组
* 传递错误值到数值计算方式(`Number.toExponential()`、`Number.toFixed()`、`Number.toPrecision()`等)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RangeError</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnEx">执行</button>

    <script>
      btnEx.onclick = function () {
        try {
          new Array(Number.MAX_VALUE)
          // Uncaught RangeError: Invalid array length
          ;(12).toFixed(101)
          // Uncaught RangeError: toFixed() digits argument must be between 0 and 100
          'abc'.repeat(-1)
          // Uncaught RangeError: Invalid count value
        } catch (err) {
          console.log('err', err)
          console.log('err.constructor:', err.constructor)
        }
      }
    </script>
  </body>
</html>
```

#### ReferenceError

* 一个不存在的变量被引用时发生的错误

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ReferenceError</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <button type="button" id="btnEx">执行</button>

    <script>
      btnEx.onclick = function () {
        try {
          var a = xyz
        } catch (e) {
          console.log(
            'e instanceof ReferenceError:',
            e instanceof ReferenceError,
          )
          console.log('e.message:', e.message)
          console.log('e.name:', e.name)
          console.log('e.fileName:', e.fileName)
          console.log('e.lineNumber:', e.lineNumber)
          console.log('e.columnNumber:', e.columnNumber)
          console.log('e.stack:', e.stack)
        }
      }
    </script>
  </body>
</html>
```

错误如下

```text
e instanceof ReferenceError: true
e.message: xyz is not defined
e.name: ReferenceError
e.fileName: undefined
e.lineNumber: undefined
e.columnNumber: undefined
e.stack: ReferenceError: xyz is not defined
    at btnEx.onclick (file:///Users/yuangao/Code/Learn/MyGithub/Javascript/JavaScript-Crack/14.%20Errror/14.1%E5%B8%B8%E8%A7%81%E7%9A%84%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B%EF%BC%8C%E4%B8%8D%E8%A6%81%E5%8F%AA%E7%9F%A5%E9%81%93Error/4.%20ReferenceError.html:21:19)
```

### SyntaxError

* 解析语法上不合法的代码的错误
* 不能被用户代码 catch 的 SyntaxError
* 可以被用户代码捕获的

### TypeError

* 值的类型非预期类型时发生的错误

### URIError

* URI 处理函数而产生
* 不是 encodeURL encodeURIComponent decodeURI decodeURIComponent 方法产生的错误的都是 URIError

### AggregateError

* 包含多个错误信息的错误

## 02：异常类型判断和自定义异常

### catch 的一定是 Error 吗

* 在 JavaScript 中，throw 关键字可以将错误抛出，但是 throw 不仅仅只能抛出错误对象，还可以抛出基本类型数据

```javascript
try {
  throw '错误字符串'
} catch (e) {
  console.log(typeof e, '==name==', e.name, '===', e)
}

try {
  throw 22
} catch (e) {
  console.log(typeof e, '==name==', e.name, '===', e)
}

function UserException(message) {
  this.message = message
  this.name = 'UserException'
}

try {
  throw new UserException('无效异常')
} catch (e) {
  console.log(typeof e, '==name==', e.name, '===', e)
}
```

结果如下

```shell
string ==name== undefined === 错误字符串
number ==name== undefined === 22
object ==name== UserException === UserException { message: '无效异常', name: 'UserException' }
```

### throw 内置Error: 更推荐这样跑出错误

```javascript
function throwError(a) {
  if (a > 10) {
    throw new RangeError('值超出限制')
  }
}

try {
  throwError(15)
} catch (e) {
  console.log(e.name, '==e.message==', e.message)
}
```

### 不隐藏错误，不做鸵鸟

```javascript
try {
  throw 500
} catch (e) {
  if (e <= 50) {
    console.log('已处理')
  } else {
    // 异常无法处理，重新抛出
    throw e
  }
}
```

### 捕获到错误的思考

* 是否致命，会不会导致连带错误
* 是否会影响用户操作
* 是否需要将错误信息反馈给用户
* 是否将错误上报
* 是否需要抛出错误

### 自定义异常类型并抛出异常

> 上一节已经讲了已有的错误类型

#### 自定义异常类型-ES6实现

```javascript
class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    super(...params)
		// 以下代码保证 error.stack 
    // ES6 实现中不是必须得，有没有都不会导致 stack 的不同
    if (Error.captureStackTrace) {
    	Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError'
    this.foo = foo
    this.date = new Date()
  }
}
```

测试代码

```javascript
function b() {
  trace()
}

function a() {
  b()
}

a()
```

#### 自定义异常类型-ES5 实现

```javascript
function MyError(message) {
  this.name = 'MyError'
  this.message = message || 'Default Message'
  // this.stack = (new Error()).stack;
  /*
   * Error.captureStackTrace(targetObject[, constructorOpt])
   * 参数 targetObject -> 表示一个对象
   * 参数 constructorOpt -> 表示对象的构造函数
   * 在targetObject上创建一个.stack属性， 调用是返回一个调用 Error.captureStackTrace() 的位置的字符串。
   */
  // Error.captureStackTrace(this, MyError)
}

MyError.prototype = Object.create(Error.prototype)
MyError.prototype.constructor = MyError

function trace() {
  try {
    throw new MyError('custom message')
  } catch (e) {
    console.log('是否是MyError类型错误:', e instanceof MyError) // true
    console.log('e.message:', e.message) // 'custom message'

    console.log('stack:', e.stack)
  }
}

function b() {
  trace()
}

function a() {
  b()
}

a()
```

### 异常类型判断

* instanceof
* constructor
* Error.prototype.name

```javascript
const error = new TypeError("类型错误")
error instanceof TypeError // true
error.constructor === TypeError // true 可被改写
error.name  // TypeError 可被改写
```

#### instanceof

```javascript
function testReferenceError() {
  try {
    let a = undefinedVariable
  } catch (e) {
    console.log('instanceof ReferenceError :', e instanceof ReferenceError) // true
  }
}

testReferenceError()
```

#### constructor

```javascript
function testTypeError() {
  // TypeError类型错误
  try {
    new eval()
    eval = function () {}
  } catch (err) {
    console.log('constructor TypeError', err.constructor == TypeError)
  }
}

function testError() {
  //Error
  try {
    throw new Error('哦豁，错误哦')
  } catch (err) {
    console.log('constructor Error', err.constructor == Error)
  }
}

testTypeError()
testError()
```

#### Error.name

```javascript
function testURIError() {
  try {
    decodeURIComponent('%')
  } catch (e) {
    console.log('ErrorName:', e.name === 'URIError')
  }
}

testURIError()
```

#### AggregateError(注意注意注意！)

```javascript
function print(e) {
  console.log('错误类型：', e.constructor.name)
  console.log('错误信息：', e.message)
  if (e.constructor.name == 'AggregateError' && e.errors) {
    for (let i = 0; i < e.errors.length; i++) {
      console.log(`错误信息${i}:`, e.errors[i].message)
    }
  }
  console.log('--------------------------------')
}

function testError() {
  //AggregateError
  Promise.any([
    Promise.reject(new Error('error 1')),
    Promise.reject(new Error('error 2')),
  ]).catch((e) => {
    print(e)
  })
}

testError()
```

## 03：异常们，跪下来唱征服，然后被我上报

### try catch-可以区域报错使用

```javascript
const str = 'aaaa'

try {
  JSON.parse(str)
} catch (e) {
  console.log('解析字符串错误')
} finally {
  console.log('finally处理')
}
```

```javascript
//编译时错误，还没有执行到try catch
try{
    dd.
}catch(e){
    console.log("捕捉到错误",e.message);
}

//try catch 执行时
try{
    var a={};
   a.b();
}catch(e){
    console.log("捕捉到错误",e.message);
}


//try catch已经执行完毕,无法捕获
try{
   setTimeout(()=>{
     var a={};
     a.b();
   })
}catch(e){
    console.log("捕捉到错误",e.message);
}
```

### window.onerror(全局JS 异常)

#### 示例1：捕获错误

```javascript
window.onerror = function (message, url, line, column, error) {
  console.log(
    '捕获到错误:',
    message,
    '==line:',
    line,
    '==column:',
    column,
    '==error:',
    error,
  )
}

setTimeout(() => {
  a.b()
})

var f = {}
f.cc.ee
```

#### 示例2：可以捕获到远程引用文件的错误，但是捕获不到细节

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>script error</title>
  </head>
  <body>
    <div>window.onerror捕获到的错误</div>

    <script>
      window.onerror = function (message, url, line, column, error) {
        console.log(
          '捕获到错误:',
          message,
          '==line:',
          line,
          '==column:',
          column,
          '==error:',
          error,
        )
      }
    </script>
    <script src="http://127.0.0.1:8080/test.js" ></script>
  </body>
</html>
```

#### 示例3：如何拿到远程文件的错误详细信息呢？

* script 引用 JS 文件时增加 crossorigin = "anonymous"的属性。如果是动态加载的 JS, 可以写作 script.crossOrigin = true
* 为 JS 资源文件增加 CORS 响应头（服务），一般的 CDN 网站都会将 Access-Control-Allow-Origin 配置为 * 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>script error 解决</title>
    <style></style>
  </head>
  <body>
    <div>script error 解决</div>

    <script>
      window.onerror = function (message, url, line, column, error) {
        console.log(
          '捕获到错误:',
          message,
          '==line:',
          line,
          '==column:',
          column,
          '==error:',
          error,
        )
      }
    </script>
    <script src="http://127.0.0.1:8080/test.js" crossorigin="anonymous" ></script>
  </body>
</html>
```

### window.addEventListener("error")-静态资源

* window.onerror 与 window.addEventListener("error") 都可以捕获 JS 错误
* addEventListener 可以捕获静态资源错误，但必须是捕获阶段
* 捕获到静态资源错误，但是无法五分 404 或者 500，需要结合服务端日志

#### 示例1：都可以捕获到错误

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>script error 解决</div>

    <script>
      window.onerror = function (message, url, line, column, error) {
        console.log(
          'window.onerror 捕获到错误:',
          message,
          '==line:',
          line,
          '==column:',
          column,
          '==error:',
          error,
        )
      }

      window.addEventListener('error', function (e) {
        console.log('window.addEventListener:', e, '==e.error:', e.error)
      })

      setTimeout(() => {
        a.b()
      })

      var f = {}
      f.cc.ee
    </script>
  </body>
</html>
```

#### 示例2：捕获静态资源的错误

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>script error 解决</div>

    <script>
      window.onerror = function (message, url, line, column, error) {
        console.log(
          'window.onerror 捕获到错误:',
          message,
          '==line:',
          line,
          '==column:',
          column,
          '==error:',
          error,
        )
      }

      window.addEventListener(
        'error',
        function (event) {
          console.log(
            'window.addEventListener:',
            event,
            '==e.error:',
            event.error,
          )
          if (event.target && (event.target.src || event.target.href)) {
            // 静态资源
            console.log({
              type: 'error', //resource
              errorType: 'resourceError',
              filename: event.target.src || event.target.href, //加载失败的资源
              tagName: event.target.tagName, // 标签名
            })
          }
        },
        true,
      ) // 由于网络请求不会冒泡，必须在捕获阶段处理
    </script>

    <img src="http://127.0.0.1:3000/test.png" />
    <script src="http://127.0.0.1:3000/test2.js" ></script>
  </body>
</html>
```

### unhandledrejection rejectionhandled

* unhandledrejection: 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
* rejectionhandled: 当 Promise 被 rejected 且有 rejection 处理器时会在全局触发 rejectionhandled 事件

#### 示例1：unhandledrejection

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>rejectionhandled</title>
  </head>

  <body>
    <div>promise 错误</div>

    <script>
      window.addEventListener('unhandledrejection', function (e) {
        //阻断异常继续抛出
        e.preventDefault()
        console.log('unhandledrejection捕获到promise错误的原因是：', e.reason)
        console.log('unhandledrejection Promise 对象是：', e.promise)
        return true
      })
      //promise异常被处理了
      window.addEventListener('rejectionhandled', (e) => {
        // rejected的原因
        console.log('rejectionhandled:', e.reason)
      })

      const p1 = new Promise((resolve, reject) => {
        reject('promise error1')
      })

      setTimeout(() => {
        p1.catch((e) => {
          console.log('catch捕获到promise1 错误:', e)
        })
      }, 1000)
    </script>
  </body>
</html>
```

#### 示例2：rejectionhandled

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>unhandledrejection</title>
  </head>

  <body>
    <div>promise 错误</div>

    <script>
      window.onerror = function (message, url, line, column, error) {
        console.log(
          'window.onerror 捕获到错误:',
          message,
          '==line:',
          line,
          '==column:',
          column,
          '==error:',
          error,
        )
      }

      window.addEventListener('error', function (e) {
        console.log('window.addEventListener:', e, '==e.error:', e.error)
      })

      window.addEventListener('unhandledrejection', function (e) {
        //阻断异常继续抛出
        e.preventDefault()
        console.log('unhandledrejection捕获到promise错误的原因是', e.reason)
        console.log('Promise 对象是', e.promise)
        return true
      })

      new Promise((resolve, reject) => {
        reject('promise error1')
      })

      new Promise((resolve) => {
        resolve()
      }).then(() => {
        throw new Error('promise error2')
      })

      try {
        new Promise((resolve) => {
          resolve()
        }).then(() => {
          throw new Error('promise error3')
        })
      } catch (e) {
        console.log('try catch:', e)
      }
    </script>
  </body>
</html>
```

### XMLHttpRequest fetch axios-网络请求

* XMLHttpRequest: 自己有 noerror 事件，可以自己封装一下
* fetch: 自带catch，不处理就是自己的问题了
* axios：有完整的错误处理机制

### ErrorBoundary-react异常

* 子组件的渲染
* 生命周期函数
* 构造函数

### errorHandler-vue异常

```javascript
Vue.config.errorHandler = (err, vm ,info) => {
	// 捕获异常
}
```

### 异常上报-sendBeacon

* 数据发送可靠
* 数据异步传输
* 不影响下一个导航的载入

### 异常上报-gif 图片

* 图片 src 属性可以直接跨域访问
* 相比 PNG/JPG gif的体积可以达到最小，合法的 GIF 只需要 43 个字节
* 一般采用 1 * 1 像素透明色来上报，不存储色彩空间数据，节约体积
