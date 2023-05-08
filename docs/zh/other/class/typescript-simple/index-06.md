# 06-TypeScript 高级语法

## 01: 类的装饰器(上)

* 装饰器本身是一个函数
* 装饰器本身通过 @ 符号来使用
* 类装饰器接收到的参数是`constructor`

### 基础使用

1. 新建文件夹`06-demo`,执行以下命令

   ```bash
   npm init -y
   tsc --init
   ```

2. 安装依赖库

   ```bash
   npm install typescript ts-node -D
   ```

3. 修改`package.json`,增加脚本命令

   ```json
   {
     "scripts": {
       "dev": "tsc-node ./src/index.ts"
     },
   }
   ```

4. 新建`src/index.ts`,内容如下

   ```typescript
   function testDecorator(constructor: any) {
     console.log("testDecorator")
   }
   
   @testDecorator
   class Test {}
   
   const test = new Test()
   const test1 = new Test()
   ```

5. 这里使用**装饰器**是`TypeScript`的一个实验性特性，我们需要更改`tsconfig.json`中的配置项

   ```json
   {
     "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
     }
   }
   ```

6. 这时候，`src/index.ts`就不会报错了

7. 运行`npm run dev`，就会发现打印了`testDecorator`一次

8. 这里牵扯出，一个概念**装饰器在类编译时候会运行一次，而不是在实例化时运行，它是对类做修饰，而不是对实例**

### 多个装饰器

* 执行顺序：多个装饰器的运行顺序是**从后往前**

1. 修改`src/index.ts`，如下代码

   ```typescript
   function testDecorator(constructor: any) {
     console.log('testDecorator')
     constructor.prototype.getName = function () {
       console.log('唐僧')
     }
   }
   function testDecoratorTwo(constructor: any) {
     console.log('testDecoratorTwo')
   }
   
   @testDecorator
   @testDecoratorTwo
   class Test {}
   
   const test = new Test()
   ```

2. 执行终端运行`npm run dev`,打印顺序如下

   ```bash
   testDecoratorTwo
   testDecorator

### 增加判断，是否执行装饰器

> 某些情况下不想执行装饰器，某些情况下执行装饰器，该如何操作呢

1. 修改`src/index.ts`,代码如下

   ```typescript
   function shouleRunDerector(flag: boolean) {
     if (flag) {
       return function testDecorator(constructor: any) {
         console.log('testDecorator')
       }
     } else {
       return function testDecorator() {}
     }
   }
   
   @shouleRunDerector(true)
   class Test {}
   
   @shouleRunDerector(false)
   class TestTwo {}
   
   const test = new Test()
   ```

2. 这样我们就实现了是否执行装饰器的一个处理

## 02：类的装饰器(下)

```typescript
function testDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    name = '菩提老祖'
    age = 100
    getName() {
      return this.name
    }
  }
}

@testDecorator
class Test {
  name: string
  constructor(name: string) {
    this.name = name
  }
}


const test = new Test('唐僧')
console.log(test) // Test { name: '菩提老祖', age: 100 }
console.log((test as any).getName()) // 菩提老祖
```
