# 02-数据类型容易忽略的细节

推荐文章

[NaN你都未必懂，花五分钟让你懂得不能再懂](https://juejin.cn/post/7023168824975294500)

## 01: 数据类型的陷阱，从表象看本质！

### 01、判断是不是 Object

```javascript
function isObject(obj){
  return typeof obj === "object"
}
```

#### 第一个问题：上面的方法有什么问题

>  `null`也会返回 `true`, 因为 `typeof null`的值就是`object`

#### 为什么 `typeof null`的返回值就是`object`

> 历史原因造成的历史原因造成的; 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。
>
> 
>
> 参考《[The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)》
>
> 作者看过JS引擎代码，得出结论。大致意思如下：
>
> 第一版的JavaScript是用32位[比特](https://www.zhihu.com/search?q=比特&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})来存储值的，且是通过值的低1位或3位来识别类型的（有点[哈法曼编码](https://www.zhihu.com/search?q=哈法曼编码&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})的味道）。
>
> 1. 1：整型（int）
> 2. 000：[引用类型](https://www.zhihu.com/search?q=引用类型&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})（object）
> 3. 010：[双精度浮点型](https://www.zhihu.com/search?q=双精度浮点型&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})（double）
> 4. 100：字符串（string）
> 5. 110：布尔型（boolean）
>
> 另外还用两个特殊值：
>
> 1. undefined，用整数−2^30（负2的30次方，不在整型的范围内）
> 2. null，[机器码](https://www.zhihu.com/search?q=机器码&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})空指针（C/C++ [宏定义](https://www.zhihu.com/search?q=宏定义&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})），低三位也是000
>
> 而在`JS_TypeOfValue`（也就是typeof的[源代码](https://www.zhihu.com/search?q=源代码&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1118265190})）里，是没有先过滤null的，导致在判断obj阶段产生了误会。
>
> ```c++
> JS_PUBLIC_API(JSType)
> JS_TypeOfValue(JSContext *cx, jsval v)
> {
>     JSType type = JSTYPE_VOID;
>     JSObject *obj;
>     JSObjectOps *ops;
>     JSClass *clasp;
> 
>     CHECK_REQUEST(cx);
>     if (JSVAL_IS_VOID(v)) {  // (1)
>         type = JSTYPE_VOID;
>     } else if (JSVAL_IS_OBJECT(v)) {  // (2)
>         obj = JSVAL_TO_OBJECT(v);
>         if (obj &&
>             (ops = obj->map->ops,
>               ops == &js_ObjectOps
>               ? (clasp = OBJ_GET_CLASS(cx, obj),
>                 clasp->call || clasp == &js_FunctionClass) // (3,4)
>               : ops->call != 0)) {  // (3)
>             type = JSTYPE_FUNCTION;
>         } else {
>             type = JSTYPE_OBJECT;
>         }
>     } else if (JSVAL_IS_NUMBER(v)) {
>         type = JSTYPE_NUMBER;
>     } else if (JSVAL_IS_STRING(v)) {
>         type = JSTYPE_STRING;
>     } else if (JSVAL_IS_BOOLEAN(v)) {
>         type = JSTYPE_BOOLEAN;
>     }
>     return type;
> }
> ```
>
> > JavaScript中的变量是没有类型的，只有值才有。
> > --《你不知道的JavaScript（中卷）》
>
> 作者：贝叶斯
> 链接：https://www.zhihu.com/question/21691758/answer/1118265190
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#### 什么不修复这个问题？

兼容性问题，历史性遗留问题太多，万一修复后导致其他的各种各样的问题，就会很难处理。

曾有一个 ECMAScript 的修复提案（通过选择性加入的方式），但[被拒绝了](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null)。该提案会导致 `typeof null === 'null'`。

### 02、一元运算符+转为数字

```javascript
function toNumber(val){ return +val }
```

#### 问题出现在哪里呢？

兼容性问题，在 ES5 中代码没有问题，但是在 ES6 中是不能够正常使用的

```javascript
toNumber(null) // 0
toNumber({}) //NaN
toNumber('10px') //NaN
toNumber(undefined) // NaN
toNumber(true) // 1

// Es6中的bigInt 和 Symbol
toNumber(10n) // Uncaught TypeError: Cannot convert a BigInt value to a number
toNumber(Symbol(1)) // VM79:2 Uncaught TypeError: Cannot convert a Symbol value to a number
```

### 03、位移转为数字

```javascript
function toNumber(val) {
  return val >> 0 // 有符号位移
}

function toNumber2(val) {
  return val >>> 0 // 无符号位移
}
```

#### 代码有什么问题？

```javascript
toNumber(null) // 0
toNumber({}) // 0
toNumber('10px') // 0
toNumber(10) // 10
toNumber(true) // 1

// 超大的数
toNumber(Number.MAX_SAFE_INTEGER) // -1
toNumber2(Number.MAX_SAFE_INTEGER) // 4294967295
```

#### 本质：

32位的有符号位移和无符号位移

### 04、字符串批量转换为整数

```javascript
["1", "2", "3"].map((val, index) => parseInt(val, index)) // [1, NaN, NaN]
// parseInt( "1", 0) // 1
// parseInt( "2", 1) NaN
// parseInt( "3", 2) NaN
```

#### 结果是什么

```javascript
 [1, NaN, NaN]
```

#### parseInt 第二个参数的取值范围

>  2-36 之间的整数，表示被解析字符串的基数。

### 05、if条件判断

```javascript
const result = {}
// name 存在
if(obj.name){
  result.name = obj.name
}
return result
```

#### 本质：转为布尔值

#### 问题：哪些值可以转为布尔值 false

下面6种值转化为布尔值时为false，其他转化都为true

* `undefined`（未定义，找不到值时出现）

* `null`（代表空值）

* `false`（布尔值的false，字符串"false"布尔值为true）

* `0`（数字0，字符串"0"布尔值为true）

* `NaN`（无法计算结果时出现，表示"非数值"；但是typeof NaN==="number"）

* `""`（双引号）或`''`（单引号） （空字符串，中间有空格时也是true）

### 06、宽松比较

```javascript
null == 0 // false 
"0" == false // true
```

#### 本质：隐式类型转换

#### 宽松比较-规律

* `NaN`
* `bigInt`、`Symbol`
* `null`、`undefined`
* 布尔值类型和其他类型的相等比较
* 数字类型和字符串类型的相等比较
* 对象类型和原始类型的相等比较

### 07、闲谈

* `typeof` 性能比 `instanceof` 高 20 倍？

  ```javascript
  var count = 1000000
  var func = function () {}
  
  var startTime = new Date()
  console.log(typeof func === 'function')
  
  for (let index = 0; index < count; index++) {
    typeof func === 'function'
  }
  console.log(
    "[typeof func === 'function']" + (new Date().getTime() - startTime.getTime()),
  )
  
  startTime = new Date()
  for (let index = 0; index < count; index++) {
    func instanceof Function
  }
  console.log(
    '[instace of Function]' + (new Date().getTime() - startTime.getTime()),
  )
  
  // 这样执行出来结果 大概前者是后者的 1/2 时间或者小于，远没有 20倍，并且这个前提是 1000000 次执行
  ```

* `null` 和 `undefined` 实现的机制完全不一样

  ```javascript
  // node 环境下执行的结果
  const print = console.log
  print(Object.getOwnPropertyDescriptor(global, 'null')) 
  // undefined
  print(Object.getOwnPropertyDescriptor(global, 'undefined')) 
  // { value: undefined,  writable: false, enumerable: false, configurable: false }
  ```

* 判断是不是数字， NaN

## 02：综合评定，数据类型8中判断方式

### typeof

* 主要用途：操作数的类型，只能识别基础数据类型和引用类型

* 特别注意：null、NaN、document.all 

  ```javascript
  typeof document.all //  'undefined'
  typeof null // 'object'
  typeof NaN // 'number'
  ```

* 注意事项：已经不是绝对安全（暂时性死去）

  ```javascript
  function log(){
    typeof a
    let a = 10
  }
  log()
  // VM517:2 Uncaught ReferenceError: Cannot access 'a' before initialization
  ```

### constructor

* 原理：`constructor` 指向创建实例对象的构造函数

* 注意事项：`null`、`undefined`

* 注意事项：`constructor` 可以被改写

* 实际应用

  ```javascript
  // https://github.com/reduxjs/redux/blob/4.x/src/utils/kindOf.js
  function miniKindOf(val) {
    if (val === void 0) return 'undefined'
    if (val === null) return 'null'
  
    const type = typeof val
    switch (type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'symbol':
      case 'function': {
        return type
      }
      default:
        break
    }
  
    if (Array.isArray(val)) return 'array'
    if (isDate(val)) return 'date'
    if (isError(val)) return 'error'
  
    const constructorName = ctorName(val)
    switch (constructorName) {
      case 'Symbol':
      case 'Promise':
      case 'WeakMap':
      case 'WeakSet':
      case 'Map':
      case 'Set':
        return constructorName
      default:
        break
    }
  
    // other
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '')
  }
  ```

### instanceof

* 原理：就是原型链上查找，查到即是其实例

* 注意事项：右操作数必须是 函数 或者 class

  ```javascript
  // https://github.com/reduxjs/redux/blob/4.x/src/utils/kindOf.js
  function isError(val) {
    return (
      // 先用 instanceof 判断
      val instanceof Error ||
      (typeof val.message === 'string' &&
        val.constructor &&
        typeof val.constructor.stackTraceLimit === 'number')
    )
  }
  
  function isDate(val) {
    // 先用 instanceof 判断
    if (val instanceof Date) return true
    return (
      typeof val.toDateString === 'function' &&
      typeof val.getDate === 'function' &&
      typeof val.setDate === 'function'
    )
  }
  ```

* 注意事项：多全局对象，例如多 window 之间（比如 `iframe` 中）

  ```javascript
  var frame = window.frames[0]
  var isInstanceOf = [] instanceof frame.Array
  console.log("fram.Array", frame.Array) // fram.Array f Array() { [native code] }
  console.log("isInstanceOf", isInstanceOf) // isInstanceOf false
  ```

### isProrotypeOf

* 原理：是否出现在实例对象的原型链上
* 注意事项：**能正常返回值**的情况下，基本等同于 `instanceof`

### Object.prototype.toString

* 原理：通过函数的动态 this 特性，返回其数据类型，`'[object Date]'`

* 思考题：自定义对象如何获得 `[object MyArray]` 类型(看下一节)

* 思考题：`Object.prototype.toString.call(Boolean.prototype)`

  > '[object Boolean]'

### 鸭子类型检测

* 原理：检查自身，属性的类型或者执行结果的类型

* 例子：`KindOf` 与 `p-is-promise`

  ```typescript
  // https://github.com/sindresorhus/p-is-promise/blob/main/index.js
  const isObject = (value) =>
    value !== null && (typeof value === 'object' || typeof value === 'function')
  
  export default function isPromise(value) {
    return (
      value instanceof Promise ||
      (isObject(value) &&
        typeof value.then === 'function' &&
        typeof value.catch === 'function')
    )
  }
  ```

* 总结：候选方案

### Symbol.toStringTag

* 原理：Object.prototype.toString 会读取该值

* 适用场景：需自定义类型

* 注意事项：兼容性

  ```javascript
  class MyArray {
    get [Symbol.toStringTag]() {
      return 'MyArray'
    }
  }
  
  var pf = console.log
  var a = new MyArray()
  console.log(Object.prototype.toString.call(a))
  // [object MyArray]
  ```

### 等比较

* 原理：与某个固定的值进行比较

* 使用场景：`undefined` `window` `document` `null` 等

  ```javascript
  // https://github.com/jashkenas/underscore/blob/master/underscore.js
  
  // Is a given variable undefined?
  function isUndefined(obj) {
    return obj === void 0;
  }
  ```

* 看下图，浏览器中的`undefined`的`writable`是`false`，不可改写的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba0d566e94a14592af62b251c0542d21~tplv-k3u1fbpfcp-watermark.image?)



### 总结

| 方法               | 基础数据类型 | 引用类型 | 注意事项                         |
| ------------------ | ------------ | -------- | -------------------------------- |
| typeof             | 可以         | 不可以   | NaN object document.all          |
| constructor        | 部分可以     | 可以     | 可以被改写                       |
| instanceof         | 不可以       | 可以     | 多窗口，右边是构造函数或者 class |
| isPrototypeOf      | 不可以       | 可以     | 小心 null 和 undefined           |
| toString           | 可以         | 可以     | 小心内置原型                     |
| 鸭子类型           |              | 可以     | 不得以或者兼容                   |
| Symbol.toStringTag | 不可以       | 可以     | 识别自定义对象                   |
| 等比较             | 可以         | 可以     | 特殊对象                         |

## 03：五分钟让你懂得透彻ES6增强的NaN 

#### NaN 和 Number.NaN

* 特点1：typeof 是数字

  ```javascript
  typeof NaN // 'number'
  typeof Number.NaN // 'number'
  ```

* 特点2：我不等于我自己

  ```javascript
  NaN === NaN // false
  Number.NaN === Number.NaN // false
  ```

* 不能被删除( `configurable` 是 `false` )

  ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/158ef8d59c42412f9df63a33a8c56280~tplv-k3u1fbpfcp-watermark.image?)

#### isNaN

* `isNaN`: 检查 `toNumber` 返回值，如果是 `NaN`, 就返回 `true`, 否则就返回 false

  

* ES 标准

  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b897b81602741a084f0bf837612b82e~tplv-k3u1fbpfcp-watermark.image?)

#### Number.isNaN

* Number.isNaN: 判断一个值是否是数字，并且值等于 NaN

#### 严格判断 NaN 汇总

* Number.isNaN: 它是原来的全局 [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 的更稳妥的版本。
* 自身比较
* Object.is
* typeof + NaN

```javascript

function isNaNVal(val) {
  return Object.is(val, NaN)
}

function isNaNVal(val) {
  return val !== val
}

function isNaNVal(val) {
  return typeof val === 'number' && isNaN(val)
}

// 综合垫片
if (!('isNaN' in Number)) {
  Number.isNaN = function (val) {
    return typeof val === 'number' && isNaN(val)
  }
}
```

### 透过陷阱看本质

```javascript
var arr = [NaN]
arr.indexOf(NaN) // -1
arr.includes(NaN) // true
```

* includes: 调用内部的 Number::sameValueZero

* indexOf: 调用内部的 Number::equal

* 我们深入规范看一看：

  ES标准的[Array.prototype.includes](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Findexed-collections.html%23sec-array.prototype.includes) 比较值相等调用的是内部的[ SameValueZero ( `x`, `y` )](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Fabstract-operations.html%23sec-samevaluezero)方法，其会检查值第一值是不是数字，如果是数字，调用的是 [Number::sameValueZero](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Fecmascript-data-types-and-values.html%23sec-numeric-types-number-sameValueZero)(`x`, `y`), 其具体比较步骤：

  > 1. If `x` is NaN and `y` is NaN, return true.
  > 2. If `x` is +0𝔽 and `y` is -0𝔽, return true.
  > 3. If `x` is -0𝔽 and `y` is +0𝔽, return true.
  > 4. If `x` is the same [Number value](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Fecmascript-data-types-and-values.html%23number-value) as `y`, return true.
  > 5. Return false

* ### indexOf

  ES标准中 [Array.prototype.indexOf](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Findexed-collections.html%23sec-array.prototype.indexof) 值比较调用的是[IsStrictlyEqual](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Fabstract-operations.html%23sec-isstrictlyequal)(`searchElement`, `elementK`), 其如果检查到第一个值为数字，调用的 [Number::equal](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Fecmascript-data-types-and-values.html%23sec-numeric-types-number-equal)(`x`, `y`).

  其比对逻辑

  > 1. If `x` is NaN, return false. 2. If `y` is NaN, return false. 3. If `x` is the same [Number value](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Fecmascript-data-types-and-values.html%23number-value) as `y`, return true. 4. If `x` is +0𝔽 and `y` is -0𝔽, return true. 5. If `x` is -0𝔽 and `y` is +0𝔽, return true.
  > 2. Return false.

  可以看到，任何一个为NaN，就直接返回false，必然不能严格的检查NaN.

## 04: 数值千分位6种方法 & 性能大比拼！

### 数值转字符串遍历

* 整体思路：数字转字符串，整体部分低位往高位遍历

  ```javascript
  function format_with_array(number) {
    // 转换为数字，并按照 . 拆分
    const arr = (number + '').split('.')
    // 整体部分再拆分
    const int = arr[0].split('')
    // 小数部分
    const fraction = arr[1] || ''
    let r = ''
    int.reverse().forEach((v, i) => {
      // 非第一位并且值是3的倍数 添加 ，
      if (i !== 0 && i % 3 === 0) {
        r = v + ',' + r
      } else {
        r = v + r
      }
    })
    return r + (!!fraction ? '.' + fraction : '')
  }
  
  console.log(format_with_array(9398222.02)) // 9,398,222.02 
  ```

### 字符串 + substring 截取

* 整体思路：数字转字符串，整体部分高位往低位遍历，三位分组

```javascript
function format_with_array(number) {
  // 转换为数字，并按照 . 拆分
  const arr = (number + '').split('.')
  const int = arr[0] + ''
  const fraction = arr[1] || ''
  // 多余的位数
  var f = int.length % 3
  let r = int.substring(0, f)

  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
  }
  // 多余的位数，上面
  if (f === 0) {
    r = r.substring(1)
  }

  return r + (!!fraction ? '.' + fraction : '')
}

console.log(format_with_array(9398222.02)) // 9,398,222.02 
```

### 除法+求模

* 整体思路：求模的值添加"," 求余值（是否大于1）计算是够结束
* 1. 值对 1000 求模，获得最高三位
  2. 值除于1000，值是否大于1 判定是否结束
  3. 重复1 2 直到退出
  4. 拼接整数部分 + 小数部分

```javascript
function format_with_array(number) {
  var n = number
  var r = ''
  var temp
  do {
    // 求模的值，用于获取最高三位，这里可能会有小数
    mod = n % 1000
    // 值是不是大于1，是继续的条件
    n = n / 1000
    // 高三位
    temp = ~~mod
    // 1、填充：n>1循环未结束，就要填充为比如 1 =》 不然 1001就会变成 11
    // 2、拼接 ","
    r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '')
  } while (n >= 1)
  var strNumber = number + ''
  var index = strNumber.indexOf('.')
  // 拼接小书部分
  if (index >= 0) {
    r += strNumber.substring(index)
  }
  return r
}
 
console.log(format_with_array(9398222.02)) // 9,398,222.02 
```

###  正则现行断言等

| 名字                   | 表达式        | 作用                   |
| ---------------------- | ------------- | ---------------------- |
| 先行断言（前瞻）       | exp1(?=exp2)  | 查找exp2前面的exp1     |
| 后行断言（后顾）       | (?<=exp2)exp1 | 查找exp2后面的exp1     |
| 正向否定查找（负前瞻） | exp1(?!exp2)  | 查找后面不是exp2的exp1 |
| 反向否定查找（负后顾） | (?<!exp2)exp1 | 查找前面不是exp2的exp1 |

```javascript
const print = console.log
print(/hello (?=[a=z]+)/.test("hello a")) // true
print(/hello (?=[a=z]+)/.test("hello 1")) // false

function format_with_array(number) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g
  return (number + '').replace(reg, '$&,')
}
console.log(format_with_array(9398222.02)) // 9,398,222.02
```

```javascript
function format_with_array(number) {
	var reg = /\d{1,3}(?=(\d{3})+$)/g
  return (number + "").replace(reg, function(match ,...args){
    return match + ","
  })
}
console.log(format_with_array(9398222.02)) // 9,398,222.02
```

