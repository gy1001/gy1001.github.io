# 源码探秘之数据响应式原理

## 前言：何为数据响应式

### 1.1 官方示图

<img src="https://v2.cn.vuejs.org/images/data.png" alt="img" style="zoom:50%;float:left;" />

### 1.2 其他相关

1. 从 MVVM 模式说开去

   模板：

   ```html
   <p>我{{age}}岁了</p>
   ```

   数据变化

   ```javascript
   this.age++
   ```

   数据变化，视图会自动变化（model <===view-model===> view）

2. 侵入式和非侵入式

   `Vue数据变化`： 非侵入式

   ```javascript
   this.a +++
   ```

   `React数据变化`：侵入式

   ```javascript
   this.setState({
     a: this.state.a + 1,
   })
   ```

   `小程序数据变化`：侵入式

   ```javascript
   this.setData({
     a: this.data.a + 1,
   })
   ```

### 1.3 核心

"上帝的钥匙"，API: `Object.defineProperty()`: 数据劫持/数据代理

利用 JavaScript 引擎赋予的功能，检测对象属性的变化，仅有"上帝的钥匙"不够，还需要设计一套精密的系统。

## 1、Object.defineProperty

> Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的原有属性，并返回此对象。

- 可以通过它设置一些额外隐藏的属性
- get/set：getter 和 setter 函数

代码示例

```javascript
const object1 = {}

Object.defineProperty(object1, 'property1', {
  value: 42,
  // 是否可写
  writable: false,
  // 是否可以被枚举
  enumerable: false,
})

object1.property1 = 77
// throws an error in strict mode

console.log(object1.property1)
// expected output: 42
```

## 2、defineReactive 函数

1. getter/setter 需要变量周转才可以成功

   代码示例

   ```javascript
   let temp
   const obj = {}

   Object.defineProperty(obj, 'a', {
     //getter
     get() {
       console.log('你试图访问obj的a属性')
       return temp
     },
     set(newValue) {
       console.log('你试图设置obj的a属性', newValue)
       temp = newValue
     },
   })
   console.log(obj.a)
   obj.a = 9
   console.log(obj.a)
   ```

2. 上述代码实现方式不够优雅，可以利用闭包特性来进一步优化实现

   代码示例

   ```javascript
   function defineReactive(data, key, val) {
     Object.defineProperty(data, key, {
       // 可枚举
       enumerable: true,
       // 可以被配置，比如可以被 delete
       configurable: true,
       get() {
         console.log('你试图访问obj的a属性')
         return val
       },
       set(newValue) {
         if (newValue === val) {
           return
         }
         console.log('你试图设置obj的a属性', newValue)
         val = newValue
       },
     })
   }
   ```

## 3、递归侦测对象全部属性

### 3.1 搭建基本环境

1. 执行以下命令

   ```shell
   mkdir vue-reactivity
   cd vue-reactivity
   npm init -y
   npm install webpack webpack-dev-server webpack-cli --save-dev
   npm install html-webpack-plugin --save
   ```

2. 新建`webpack.config.js`，写入以下内容

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const path = require('path')
   
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
   }
   ```

3. `package.json`中增加以下脚本

   ```javascript
   {
     ...
     "scripts": {
       "dev": "webpack serve"
     }
   }
   ```

4. 新建`src/index.html`、`src/index.js`文件，并写入想要的内容

5. 运行命令`npm run dev`，打开浏览器，输入相应地址就可以看到效果。至此，基本环境搭建完成

### 3.2 书写代码

涉及到以下类

**Observer**：将一个正常的 object 转换为每个层级的属性都是响应式（可以被侦测）的 object

1. `index.js`中 写入以下内容

   ```javascript
   import observe from './observe'
   const obj = {
     a: {
       m: {
         n: 5,
       },
     },
     b: 9,
   }
   
   observe(obj)
   obj.a.m.n = 8
   obj.b = 10
   console.log(obj.a.m.n)
   console.log(obj.b)
   ```

2. 新建`observe.js`,写入以下内容

   ```javascript
   import Observer from './Observer'
   
   // 创建 observe 函数
   export default function observe(value) {
     if (typeof value !== 'object') {
       return
     }
     var ob
     if (typeof value.__ob__ !== 'undefined') {
       ob = value.__ob__
     } else {
       ob = new Observer(value)
     }
     return ob
   }
   ```

3. 新建`Observer.js`,写入以下内容

   ```javascript
   import defineReactive from './defineReactive'
   import { def } from './utis'
   
   export default class Observer {
     constructor(value) {
       // 给实例(this,一定要注意，构造函数中的this不是类本身，而是表示实例)添加了 __ob__属性，值是这次new的实例
       def(value, '__ob__', this, false)
       this.walk(value)
     }
     // 遍历
     walk(value) {
       for (const key in value) {
         defineReactive(value, key, value[key])
       }
     }
   }
   ```

4. 新建`defineReactive.js`，写入以下内容

   ```javascript
   import observe from './observe'
   
   export default function defineReactive(data, key, val) {
     // value 可能也是对象，所以也要进行做处理
     observe(val)
     Object.defineProperty(data, key, {
       get() {
         console.log('获取' + key + '属性')
         return val
       },
       set(newVal) {
         console.log('设置' + key + '属性', newVal)
         if (newVal === val) {
           return
         }
         // 当设置了新值，新值也要被 observe
         observe(newVal)
         val = newVal
         return newVal
       },
     })
   }
   ```

## 4、数组的响应式处理

> push、pop、shift、unshift、splice、sort、reverse 这七种方法被改写了

### 4.1 对数组的 API 进行做拦截处理

1. 逻辑分析：

   * 对于数组，通过`Object.defineProperty`并不能获得setter 和 getter 的响应。我们只能通过对它的原型链上做拦截处理。在日常使用中，`vue`对我们常用的一些数组处理方式做了拦截处理，保留了原有的功能，并增加了响应的拦截处理（比如：触发依赖收集、更新，以及对新添加的数据进行响应式处理）

2. 代码实现(这里先做对数组的API拦截处理部分)

   * 对`Observer.js`进行修改，判断数据类型为数组时候做单独处理

     ```javascript
     import defineReactive from './defineReactive'
     import { def } from './utis'
     import { arrayMethods } from './array'
     
     export default class Observer {
       constructor(value) {
      		
         // 新增加
         // 如果类型是数组，要讲这个数组的原型指向新创建的 arrayMethods
         if(Array.isArray(value)){
            handleWithArray(value)
         }else{
         	this.walk(value)  
         }
         
       }
       // 遍历
       walk(value) {
         //...
       }
     }
       
     function handleWithArray(value) {
       // 实际上直接替换即可，但是源码中做了一个兼容处理。某些浏览器可能不支持 __proto__
       // value.__proto__ = arrayMethods
       // 以下代码为兼容处理
       const augment = hasProto ? protoAugment : copyAugment
       augment(value, arrayMethods, arrayKeys)
     }
     
     // 把数组的原型链指向 我们新创建的函数
     function protoAugment(target, src) {
       target.__proto__ = src
     }
     
     // 遇见不兼容时候，则调用copyAugment函数将拦截器中的方法挂载到value上
     function copyAugment(target, src, keys) {
       for (let index = 0; index < keys.length; index++) {
         const key = keys[index]
         def(target, key, src[key])
       }
     }
     ```

   * 创建`array.js`,内容如下

     ```javascript
     import { def } from './utils'
     
     const arrayProperty = Array.prototype
     // 新创建原型并暴露
     export const arrayMethods = Object.create(arrayProperty)
     
     const needChangeMethods = [
       'push',
       'pop',
       'shift',
       'unshift',
       'splice',
       'sort',
       'reverse',
     ]
     
     needChangeMethods.forEach((methodName) => {
       // 备份原来的方法
       const original = arrayProperty[methodName]
       // 定义新的方法
       def(
         arrayMethods,
         methodName,
         function () {
           const result = original.apply(this, arguments)
           console.warn('数组拦截器被拦截了', methodName, result)
           return result
         },
         false
       )
     })
     ```

     

   

