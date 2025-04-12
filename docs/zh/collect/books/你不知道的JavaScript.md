# 你不知道的 JavaScript

## 1. 作用域和闭包

## 2. this 和对象原型

### 2.1 关于 this

### 2.2 this 全面解析

### 2.3 对象

1. `in` 操作符会检查属性是否在对象及其`[[prototype]]原型链`中(参见第 5 章节)。相比之下，`hasOwnProperty(...)`只会检查属性是否在 `myObject`对象中，不会检查 `[[prototype]] 链`。

   ```javascript
   var myObject = {}
   Object.defineProperty(
     myObject,
     'a', // 让 a 像普通属性一样可以枚举
     { enumerable: true, value: 2 }
   )
   Object.defineProperty(
     myObject,
     'b', // 让 b 不可枚举
     { enumerable: false, value: 3 }
   )
   console.log(myObject.b) // 3
   console.log('b' in myObject) // true
   console.log(myObject.hasOwnProperty('b')) // true
   // .......
   for (var k in myObject) {
     console.log(k, myObject[k])
   }
   // "a" 2
   ```

   > 可以看到，_myObject.b_ 确实存在并且有访问值，但是却不会出现在 _for...in_ 循环中（尽管可以通过 in 操作符来判断是否存在）。原因是 **可枚举** 就相当于 **可以出现在对象属性的遍历中**
   

## 3. 类

## 4. 原型

