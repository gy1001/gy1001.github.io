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

## 03: 方法装饰器

```typescript
// 普通方法中，target 对应的是 property, key: 装饰的方法的名字
// 静态方法中，target 对应的是类的构造函数
function getNameDecerator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  // 不允许被重写
  descriptor.writable = false
  descriptor.value = function () {
    return '我是新的值'
  }
}

class Test {
  name: string
  constructor(name: string) {
    this.name = name
  }
  @getNameDecerator
  getName() {
    return this.name
  }
}
const test = new Test('唐僧')

console.log(test.getName()) // 我是新的值
// 装饰器中设置 descriptor.writable = false 再次运行就会如下错误
// Cannot assign to read only property 'getName' of object '#<Test>'
// test.getName = function () {
//   return '23333'
// }
```

## 04: 访问器的装饰器

[官网文档:https://www.tslang.cn/docs/handbook/decorators.html](https://www.tslang.cn/docs/handbook/decorators.html)

> 注意: TypeScript不允许同时装饰一个成员的`get`和`set`访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个*属性描述符*时，它联合了`get`和`set`访问器，而不是分开声明的。

```typescript
function visiDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  descriptor.writable = false
}

class Test {
  private _name: string
  constructor(name: string) {
    this._name = name
  }
  get name() {
    return this._name
  }
  @visiDecorator
  set name(name: string) {
    this._name = name
  }
}

const test = new Test('唐僧')
// 此时因为 descriptor.writable = false 所以这里运行会报错
// test.name = '1123'
console.log(test.name) // 1123
```

## 05: 属性的装饰器

> 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
>
> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. 成员的名字。

### 如何限制修改属性

```typescript
// 注意属性装饰器函数的返回值是 any 或者 void
function nameDecorator(target: any, key: string): any {
  console.log(target, key)
  const descriptor: PropertyDescriptor = {
    writable: false,
  }
  return descriptor
}

class Test {
  @nameDecorator
  name = '唐僧'
}

const test = new Test()
setTimeout(() => {
  test.name = '猪八戒' // 这里导致错误
}, 1000)
console.log(test.name)
```

### 注意点

> 属性装饰器中：使用   target[key] = xxx 修改的是原型上的属性

```typescript
// 装饰器这里修改的是原型上的 name
function nameDecorator(target: any, key: string): any {
  target[key] = '菩提祖师'
}
// 这里的属性 name 是放在了实例中
class Test {
  @nameDecorator
  name = '唐僧'
}

const test = new Test()
// 这里调用时候肯定先从实例上寻找
console.log(test.name) // 唐僧
console.log((test as any).__proto__.name) // 菩提祖师
```

如下操作也是如此

```typescript
function nameDecorator(target: any, key: string): any {
  // target[key] = '菩提祖师'
  return {
    writable: true,
    value: '猪八戒',
  }
}
// 这里的属性 name 是放在了实例中
class Test {
  @nameDecorator
  name = '唐僧'
}

const test = new Test()
// 这里调用时候肯定先从实例上寻找
console.log(test.name) // 唐僧
console.log((test as any).__proto__.name) // 猪八戒
```

## 06：参数装饰器

> 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
>
> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. 成员的名字。
> 3. 参数在函数参数列表中的索引。
>
> > 注意  参数装饰器只能用来监视一个方法的参数是否被传入。

```typescript

function paramDecorator(target: any, method: string, paramIndex: number) {
  // target[method] = ''
  console.log(target, method, paramIndex)
}
class Test {
  getInfo(@paramDecorator name: string, age: number) {
    return `${name}的年龄是${age}`
  }
}

const test = new Test()
console.log(test.getInfo('孙悟空', 500))
```

## 07：装饰器实际使用的小例子

1. 不使用装饰器的小例子（这里需要多次使用 try...catch... ）

   ```typescript
   const userInfo: any = undefined
   class Test {
     getName() {
       try {
         return userInfo.name
       } catch (error) {
         console.log('userInfo.name 不存在')
       }
     }
     getAge() {
       try {
         return userInfo.age
       } catch (error) {
         console.log('userInfo.age 不存在')
       }
     }
   }
   
   const test = new Test()
   console.log(test.getName())
   ```

2. 使用装饰器优化后的代码

   ```typescript
   // 使用装饰器后，我们就实现了复用
   function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
     const fn = descriptor.value
     descriptor.value = function () {
       try {
         fn()
       } catch (error: any) {
         console.log(error.message)
       }
     }
   }
   const userInfo: any = undefined
   class Test {
     @catchError
     getName() {
       return userInfo.name
     }
     @catchError
     getAge() {
       return userInfo.age
     }
   }
   
   const test = new Test()
   console.log(test.getName())
   console.log(test.getAge())
   ```

3. 也可以对装饰器函数传入参数，来实现自定义提示语

   ```typescript
   function catchError(msg: string) {
     return function (target: any, key: string, descriptor: PropertyDescriptor) {
       const fn = descriptor.value
       descriptor.value = function () {
         try {
           fn()
         } catch (e) {
           console.log(msg)
         }
       }
     }
   }
   const userInfo: any = undefined
   class Test {
     @catchError('userInfo.name 不存在')
     getName() {
       return userInfo.name
     }
     @catchError('userInfo.age 不存在')
     getAge() {
       return userInfo.age
     }
   }
   
   const test = new Test()
   console.log(test.getName())
   console.log(test.getAge())
   ```

## 08：reflect-metadata

> [reflect-metadata官方文档](https://www.npmjs.com/package/reflect-metadata)

1. 安装依赖库

   ```bash
   npm i reflect-metadata -D
   ```

1. 代码如下

   ```typescript
   import 'reflect-metadata'
   
   const user = {
     name: '唐僧',
   }
   // 往 user 上增加一个 data 属性 值为 test
   Reflect.defineMetadata('data', 'test', user)
   console.log(Reflect.getMetadata('data', user)) // test
   
   @Reflect.metadata('data', 'test')
   class User {
     @Reflect.metadata('data2', 'test2')
     name = '唐僧'
     @Reflect.metadata('data3', 'test3')
     getName() {
       return '菩提祖师'
     }
   }
   console.log(Reflect.getMetadata('data', User)) // test
   console.log(Reflect.getMetadata('data2', User.prototype, 'name')) // test2
   console.log(Reflect.getMetadata('data3', User.prototype, 'getName')) // test3
   ```

## 09：装饰器的执行顺序

### 方法装饰器 先于 类装饰器

```typescript
import 'reflect-metadata'

function showData(target: typeof User) {
  console.log(Reflect.getMetadata('data', target.prototype, 'getName')) // name
  console.log(Reflect.getMetadata('data', target.prototype, 'getAge')) // age
  console.log(Reflect.getMetadata('generData', target.prototype, 'getGender')) // gender
}

function setData(dataKey: string, msg: string) {
  return function (target: User, key: string) {
    Reflect.defineMetadata(dataKey, msg, target, key)
  }
}

@showData
class User {
  @Reflect.metadata('data', 'name')
  getName() {}
  @Reflect.metadata('data', 'age')
  getAge() {}
  @setData('generData', 'gender')
  getGender() {}
}
```

