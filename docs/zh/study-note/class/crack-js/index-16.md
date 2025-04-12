# 16-绕不过坎，字符编码
## 01: 不同字符表示方式背后编码知识

### '\141', '\x61','\u0061'背后的字符编码知识

#### 字符有几种表示方式

* 至少6种

  ```javascript
  console.log(`a`)        // 'a'
  console.log('a')        // 'a'
  console.log('\a')       // 'a'
  console.log('\141')     // 'a'
  console.log('\x61')     // 'a'
  console.log('\u0061')   // 'a'
  console.log('\u{0061}') // 'a'
  ```

### 编码基础知识：ASCII码

* ASCII 码占用一个字节，一个字节为 8个 bit 位
* ASCII 码第一位始终是0，那么实际可以表示的状态是 2^7 = 128 种字符
* 0-31 之间的 ASCII 码常用于控制比如打印机一样的外围设备

### ASCII 额外扩展的版本 EASCII

* ASCII 128-255 部分

### Unicode 和 码点

* Unicode 为世界上所有字符都分配了一个唯一的编号(码点), 这个编号范围从 0x000000 到 0x10FFFF (十六进制)，有100 多万(1114112) ，每个字符都有一个唯一的Unicode 编号
* Unicode 是字符集，为了兼容 ASCII，Unicode 规定前 0-127 个字符是和 ASCII 是一样的，不一样的是 128-255这一部分

### 码点

* 某个字符规定对应的数值，我们经常称其为码点

* 可以通过字符串的实例方法 codePointAt 获取码点

  ```javascript
  const print = console.log
  
  print('𠀠'.codePointAt(0)) // 131104 0x20020  正确
  // charCodeAt可以正确获取小于0xFFFF(65535)的码点
  print('𠀠'.charCodeAt(0)) // 55360  0xd840   错误
  print('a'.charCodeAt(0)) // 97     0x0061   正确
  ```

### UTF-8 UTF-16

* UTF-8 UTF-16 均是 Unicode 字符编码的一种实现
* JavaScript 代码中的字符，localStorage 存储的字符是基于 UTF-16 编码的
* Cookie 存储的字符是基于 UTF-8 编码的

### \字符

* \ 是一个特殊的存在，转义字符，大多数情况下，不产生任何作用。只对一些特殊的字符起作用

  ```javascript
  console.log("\a") // a
  console.log("\r") // 一个回车符
  ```

### \八进制

* 其能表示的码点范围是 0-255

* 有些码点的字符是不能被正常显示的，比如码点为 31 和 127 的字符

  ```javascript
  const print = console.log
  
  print('\\141:', '\141') // a
  
  // 我们看一些特殊码点的字符，因为码点为31和127的字符，不能被显示或者表示
  // 浏览器和nodejs得输出情况不一样
  // 37 = 31..toString(8)
  print('\37')
  
  // 177 = 127..toString(8)
  print('\177')
  print('\x7F')
  ```

### \x 两位十六进制

* 0x 表示 16进制的数字，所以 \x 大家也很好理解，是 16进制

* 两位十六进制码点，0x00-0xFF(0-255)，和 \八进制 一样，不可显示的码点字符，直接显示其编码

  ```javascript
  const print = console.log;
  
  // 1f = 31..toString(16)
  print('\x1F'); // '\x1F'
  
  // 20 = 32..toString(16)
  print('\x20'); // ' '
  
  // 7e = 126..toString(16)
  print('\x7e'); // '~'
  
  // 7f = 127..toString(16)
  print('\x7f'); // '\x7F'
  
  // 80 = 128..toString(16)
  print('\x80'); // '\x80'
  ```

### \u 四位十六进制

* 这里固定是4位，少一位都不行

* 超过，截取前4位，后面的直接追加

* 码点大于 0xFFFF, 大于4位16进制的字符怎么表示？

  ```javascript
  console.log('\\u0061:', '\u0061') // "a"
  
  // console.log("\u061")  // 报错
  
  // 多余4位直接追加
  console.log('\\u00610:', '\u00610') // 'a0'
  
  // Unicode的代理区 0xD800-0xDFFF， 其不代表任何字符
  
  console.log('\\uD800:', '\uD800')
  console.log('\\uD800:', '\uDFFF')
  ```

### \u{十六进制}

* ES6 新增的能力，这个多了个一个 {} 包裹

  ```javascript
  console.log('\\u{20020}:', '\u{20020}') // '𠀠'
  console.log('\\u{0061}:', '\u{0061}') // 'a'
  console.log('\\u{061}:', '\u{061}') // 'a'
  console.log('\\u{61}:', '\u{61}') // 'a'
  console.log('\\u{9}:', '\u{9}') // "\t"
  ```

### 总结

| 格式         | 示例       | 码点范围   | 注意                                               |
| ------------ | ---------- | ---------- | -------------------------------------------------- |
| \8进制       | "\141"     | 0-255      | 模板字符串不可直接使用                             |
| \x两位16进制 | "\x61"     | 0-255      | 必须两位                                           |
| \u四位16进制 | "\u0061"   | 0-65535    | 必须四位                                           |
| \u{16进制}   | "\u{0061}" | 0-ox10FFFF | 码点大于 0xFFFF,length为2， 下标访问值是高低位的值 |

### ES6的模板字符串

* 可以使用 \u \u{} \x格式的

* \8进制，是不被允许的，非得用，那就用 ${""}包裹一下吧

  ```javascript
  // 61 = "a".charCodeAt(0).toString(16)
  console.log(`我\u{61}`) // 我a
  console.log(`我\x61`) // 我a
  console.log(`我\u0061`) // 我a
  console.log(`我\a`) // 我a
  
  // 141 = "a".charCodeAt(0).toString(8)
  // `我\141`   // 一场
  
  console.log(`我${'\141'}`) // '我
  ```

### 实际的应用

* 匹配中文的正则，只能识别常见的中文

  ```javascript
  var regZH = /[\u4e00-\u9fa5]/g;
  console.log(regZH.test("a"));   // false
  console.log(regZH.test("人"));  // true
  console.log(regZH.test("𠀠"));  // false  尴尬了不
  ```

* 去掉空白字符

  ```javascript
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    }
  }
  
  console.log('\t 啊 \n'.trim())
  ```

### CSS content 属性和 CSS 字体图标

```css
div.me::before{
  content: "\6211"; // 我
  padding-right: 10px;
}
div.me::before{
  content: "\20020"; 
}
```

### CSS 颜色色值

```css
.title{
  color: #FFF;
}
```

### 字符个数统计

* 个是利用了 UTF-16 编码特性。因为 \uD800-\DFFFF 是代理区，具体 UTF-16 编码的东西，单独来讲解

  ```javascript
  const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  function chCounts(str) {
    return str.replace(spRegexp, '_').length
  }
  ```

### 其他

* emoji 图标
* 编码转换，比如 utf-8 转 base64

## 02: 通过乱码�，理解UTF-16编码哲学

### 字符串的遍历

```javascript
var text = 'abc'
for (var i = 0; i < text.length; i++) {
  console.log(text[i])
}
// a
// b
// c
```

```javascript
var text = '𢂘'
for (var i = 0; i < text.length; i++) {
  console.log(text[i])
}

// �
// �
```

### 码点与码元

* JavaScript 内部，字符以 UTF-16 (字符用两个字节或者四个字节表示)的 格式存储，码点范围介于 U+0000 到 U+FFFF,两个字节。Unicode 码点大于 0xFFFF 的字符），四个字节
* 对于 UTF-16 来说，一个码元是 16bit（两个字节）

* 对于 UTF-32 来说，一个码元是 32bit（四个字节）

### 字符串的length 属性返回的是码元

* length 属性返回对应几个码元字符
* str 的 Unicode 编码是 \u0041,识别一个码元， str2 Unicode 编码是 \ud848\udc98 识别为2个码元

  ```javascript
  const str = 'A'
  const str2 = '𢂘' // 是一个生僻字
  console.log(str.length) // 1
  console.log(str2.length) // 2
  ```

### charCodeAt 与 codePonitAt

* charCodeAt: 根据**码元**匹配

* codePointAt: 根据**码点**匹配

  ```javascript
  let str = 'A'
  let str2 = '𢂘'
  console.log(str.charCodeAt(0)) //65    码点
  console.log(str.codePointAt(0)) //65     码点
  console.log(str2.charCodeAt(0)) //55368    返回第一个码元的码点
  console.log(str2.codePointAt(0)) //139416   返回两个码元合为一体的一个码点
  
  console.log(str2.charCodeAt(0).toString(16)) //d8d8  返回前两个字节，也就是前一个码元的16进制
  console.log(str2.charCodeAt(1).toString(16)) //dc98  返回后两个字节，也就是后一个码元的16进制
  ```

### charCodeAt 与 codePonitAt 参数

* charCodeAt 与 codePonitAt 接受的索引值都是根据码元
* codePonitAt 函数匹配规则是码点，当它匹配到当前索引的码元后，会识别当前的码元是否和后面的码元能否构成一个码点，如果是一个码点，则返回这两个码元的码点，如果不能构成一个码点，就按照当前的码元返回码点

```javascript
let str = 'A'
let str2 = '𢂘A'
console.log(str.charCodeAt(0)) //65

console.log(str2.charCodeAt(0)) //55368
console.log(str2.charCodeAt(1)) //56472
console.log(str2.charCodeAt(2)) //65

console.log(str2.codePointAt(0)) //139416
console.log(str2.codePointAt(1)) //56472
console.log(str2.codePointAt(2)) //65
```

### ES6 字符串遍历

* 了解了码元和码点的知识后，我们应该怎么遍历字符串呢？

* ES6 考虑到了这个问题，其原型上实现了 Symbol.iterator，使得其可以使用 for of 来遍历其值

  ```javascript
  //String.prototype[Symbol.iterator];
  
  var text = "𢂘";
  for (let v of text) {
    console.log(v);
  }
  ```

### 不适用 for of 遍历-根据码点范围判断

* 码点大于 Oxfff 的下一个索引值的值，是不可用的，直接跳过就好

  ```javascript
  function strForEach(str, callback) {
    var code;
    var skip;
    var index = 0;
    for (var i = 0; i < str.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }
      code = str.codePointAt(i);
      callback(String.fromCodePoint(+`0x${code.toString(16)}`), index, str);
      index++;
      //我们知道如果码点大于0xffff的下一个索引值的值，是不可用的。我们直接跳过就好。
      if (code > 0xffff) {
        skip = true;
      }
    }
  }
  
  var text = "𢂘a𠮷人";
  // 𢂘，𠮷码点大于65535, 都占两个码元
  console.log("text.length:", text.length);
  strForEach(text, function (ch, index, str) {
    console.log(ch, index, str);
  });
  
  for(i = 0 ; i< text.length; i++){
    console.log(text[i], i);
  }
  ```

### 不适用 for of 遍历

* 能否使用 Object.values()来获取字符串的全部值呢？：：不能 不能

  ```javascript
  console.log(Object.values("𢂘a𠮷人"));
  // [ '�', '�', 'a', '�', '�', '人' ]
  // (6) ['\uD848', '\uDC98', 'a', '\uD842', '\uDFB7', '人']
  ```
  
* 能否使用 拓展运算符获取全部值吗？？可以可以,因为字符串实现了 Symbol.iterator

  ```javascript
  console.log([..."𢂘a𠮷人"]);
  //['𢂘', 'a', '𠮷', '人']
  ```

### UTF-16 存储原理

* Unicode 本身只规定了每个字符的数字编号是多少，并没有规定这个编号如何存储
* 第0平面，包含了大量的常用字符和符号，同时还包含了代理区 (高码点代理区和低码点代理区)
* 高代理区 (High Surrogates) U+D800 ~ U+DBFF
* 低代理区 (Low Surrogate) U+DCO0 ~ U+DFFF

## 03：Base64编码知识，一文打尽，探索起源，追求真相

### Baes64在前端应用

#### Canvas 图片生成

* canvas 的 toDataURL 可以把 canvas 的画布内容转换为 base64 编码格式包含图片展示的 data URI

```javascript
const ctx = canvasEl.getContext('2d')
// ...... other code
const dataUrl = canvasEl.toDataURL()

// data:image/png;base64,iVBORw0KGgoAAAANSUhE.........
```

#### 文件获取

* FileReader 的 readAsDataURL 可以把上传的文件转为 base64格式的 dataURL,比较常见的场景就是用户头像的裁剪和上传

```javascript
function readAsDataURL() {
  const fileEl = document.getElementById('inputFile')
  return new Promise((resolve, reject) => {
    const fd = new FileReader()
    fd.readAsDataURL(fileEl.files[0])
    fd.onload = function () {
      resolve(fd.result)
      // data:image/png;base64,iVBORw0KGgoAAAA.......
    }
    fd.onerror = reject
  })
}
```

##### 示例代理

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文件读取</title>
    <style>
      * {
        font-size: 28px;
      }
    </style>
  </head>

  <body>
    <input type="file" id="inputFile" />

    <div>
      <img id="preview" src="" style="width: 200px" />
    </div>
    <script>
      function readAsDataURL() {
        const fileEl = document.getElementById('inputFile')
        return new Promise((resolve, reject) => {
          const fd = new FileReader()
          fd.readAsDataURL(fileEl.files[0])
          fd.onload = function () {
            resolve(fd.result)
            // data:image/png;base64,iVBORw0KGgoAAAA.......
          }
          fd.onerror = reject
        })
      }

      inputFile.onchange = async function onchange() {
        console.log('onchange')
        const url = await readAsDataURL()
        preview.src = url
      }
    </script>
  </body>
</html>
```

#### Base64 在前端的应用-JWT

* jwt 是由 header、payload、signature三个部分组成，前两个解码后，都是可以明文看到的

##### 示例：简单的数据加密

* 当然这不是好方法，但是至少让你不好解读

```javascript
const username = document.getElementById('username').value
const password = document.getElementById('password').value
const secureKey = '%%S%$%DS)_sdsdj_66'
const sPass = utf8_to_base64(password + secureKey)

doLogin({
  username,
  password: sPass,
})
```

#### 移动端网站图标优化

#### 小图片

#### sourceMap

#### 混淆加密代码

* 著名的代码混淆加密库，javascript-obfuscator, 也是有应用 base64 编码的，webpack-obfuscator 也是基于其封装的，

#### 其他

* X.509公钥证书，github SSH Key, mht 文件，邮件附件等等，

## 04：看破字符 %20 之谜，百分号编码以及其背后
