# 02-TypeScript 基础语法入门

## 01:TypeScript 究竟是什么？

> 由于历史愿因，JavaScript 在被创造时有许多未考虑的情况。在目前广泛使用的情况下，往往会暴露出很多问题。不方便我们排查问题。由此，Typescript 在JavaScript 基础上做了一系列的处理。

1. 我们新建文件`01/index.js`和`01/index.ts`，代码一样，如下

   ```javascript
   if ('' == 0) {
     console.log('hello')
   }
   
   function compare(x) {
     if (1 < x < 3) {
       console.log('hello')
     }
   }
   
   console.log(compare(100))
   
   const object = {
     firstName: '齐天大圣',
     lastName: '孙悟空',
   }
   // 注意这里我们故意写错误：fisrtName
   console.log(object.fisrtName + object.lastName)
   ```

2. 对于`.js`文件而言，他并不会关心代码的语法正确与否，只有在运行时候时候才会报错，

   * 对于`compare`方法，我们如果打印`console.log(compare(100))`，就会神奇的发现 `if`判断运行了，与我们想要的情况违背。
     * 代码执行时，会先执行`1<x`是`true`，然后`true<3`会进行一个类型转换，结果自然是`true`

3. 而对于`ts`文件，编译器会实时提示错误，错误信息如下

   ```typescript
   // This comparison appears to be unintentional because the types 'string' and 'number' have no overlap.ts(2367)
   // '' == 0 在编辑器下会报红
   if ('' == 0) {
     console.log('hello')
   }
   
   // function compare(x: any): void (+1 overload)
   function compare(x) {
     // Operator '<' cannot be applied to types 'boolean' and 'number'.ts(2365)
     // 1 < x < 3 在编辑器下会报红
     if (1 < x < 3) {
       console.log('hello')
     }
   }
   
   const object = {
     firstName: '齐天大圣',
     lastName: '孙悟空',
   }
   
   /*
     Property 'fisrtName' does not exist on type '{ firstName: string; lastName: string; }'. Did you mean 'firstName'?ts(2551)
     index.ts(14, 3): 'firstName' is declared here.
   */
   console.log(object.fisrtName + object.lastName) // fisrtName 在编辑器下会报红
   ```

   
