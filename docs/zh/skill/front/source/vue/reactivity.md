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
     a: this.state.a + 1
   })
   ```

   `小程序数据变化`：侵入式

   ```javascript
   this.setData({
     a: this.data.a + 1
   })
   ```

### 1.3 核心

"上帝的钥匙"，API: `Object.defineProperty()`: 数据劫持/数据代理

利用 JavaScript 引擎赋予的功能，检测对象属性的变化，仅有"上帝的钥匙"不够，还需要设计一套精密的系统。

## 1. Object.defineProperty

> Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的原有属性，并返回此对象。

* 可以通过它设置一些额外隐藏的属性
* get/set：getter 和 setter 函数

代码示例

```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  // 是否可写
  writable: false,
  // 是否可以被枚举
  enumerable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```

