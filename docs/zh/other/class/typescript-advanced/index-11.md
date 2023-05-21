# 11-从装饰器应用，底层 JS 到 仿 Nestjs 实战，路由器底层复杂泛型（上）

## 01：本章概述，熟练透彻掌握装饰器对职业发展有何意义

装饰器是前端了不起的技术革命，弥补了只有后端语言才有的 AOP(类似装饰器)的短板，学习装饰器好处有：

1. 较大提升前端架构思维和前端架构能力，装饰器底层蕴含的拦截思想在 java spring Nestjs 框架，python 各种后端语言中都有广泛的应用，而拦截器展示的就是一种架构思维，通过学习装饰器能扩大视野，是作为一名前端架构师以及晋级更高职位必会技能
2. Nestjs 等相对新型的 非常优秀的 Nodejs 框架大量运用了 TS 装饰器：例如 @Controller @Service @Get @Post
3. 在面试中，如果告诉面试官，你精通装饰器，这也能成为你的大家分项目，因为公司需要架构思维能力强的前端工程师，因为具有架构思维的前端开发人员子啊大中项目中一定能够写出扩展性更好的代码

纵观本章，囊括了装饰器应用，装饰器底层 JS 源码，装饰器实战

## 02:【装饰器概述】装饰器定义，分类，要解决的问题

### 装饰器定义

装饰器就是一个方法，可以注入到类、方法、属性、参数、对象上，扩展其功能

**课外了解：高阶组件本质上就是才用了装饰器的思想**

### 装饰器分类

装饰器就就是解决在不修改原来类、方法，属性，参数的时候为其添加额外的功能。比如:为整个项目的所有业务类【假如 50 个类】 的所有方法【如 6 个方法】都增加日志信息，如果一个一个的增加，那要增加 300 次日志调用语句，假如日后日志文件格式发生了改变，也还需要修改 300 次。如果有了装饰器，只需要修改一次就可以。这个属于项目中的通用功能，大家了解下即可，后面我们仿 Nestjs 实战 时对装饰器的这个特性会有很深的体会。
在 Nestjs 中 装饰器可以解决依赖注入的问题，而依赖注入是 Java 等后端语言拥有的非常优秀的编程思想有了依赖注入，能大大降低项目的耦合度，大大提升项目的可扩展性。

**使用和创建分离**是依赖注入的核心思想

### 装饰器要解决的问题

常见的装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器、元数据装饰器

### 元数据装饰器初步理解：

元数据装饰器: 在定义类或者类方法的时候，可以设置一些元数据，我们可以获取到在类与类方法上添加的元数据，需要引入 reflect-metadata 第三方库 采用 @Reflect.metadata 来实现。元数据指的是描述东西时用的数据，例如: Reflect.metadata("importinfo"，"疫情期间用公筷,戴口罩")。

## 03:【类装饰器】类装饰器的两种实现

### 装饰器两种写法

写法 1：让调用时（使用时）不传递参数的装饰器

写法 2：装饰器工厂【让调用时（使用时）传递参数的装饰 器】

### 环境搭建

1. 安装 concurrently 支持合并执行，同时运行多个 script 命令

   ```bash
   npm install concurrently -S
   npm install nodemon -D
   npm install ts-node -D
   ```

2. tsconfig.json 文件修改如下

   ```json
   {
     "compilerOptions": {
       "outDir": "./dist",
       "rootDir": "./src",
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true
     }
   }
   ```

3. 配置 package.json 文件脚本信息

   ```json
   {
     "script": {
       "dev:build": "tsc -w",
       // 监控 dist/teaching 目录中的JS文件，变化时候执行 node 命令
       "dev:start": "nodemon --watch dist/teaching js --exec node ./dist/teaching/1ClassDecorator.js",
       // 合兵启动
       "start": "concurrently npm:dev:*",
       // 命令行解决 typescript 编译装饰器类时出现的bug
       "tsc": "tsc src/teaching/1ClassDecorator.ts --target ES5  -w --experimentalDecorators",
       // 本章后面章节会用到，先配置上
       "ctrl": "ts-node src/controller/HomeController.ts",
       "beginapp": "nodemon --watch src/ -e ts --exec ts-node ./src/expressapp.ts"
     }
   }
   ```

4. 类装饰器两种实现【带参数和不带参数】

   1. 新建文件`src/teaching/1ClassDecorator.ts`，内容如下

      ```typescript
      // 不带参数
      function FirstClassDecorator(targetClass: any) {
        const targetClassObj = new targetClass()
        targetClassObj.buy()
      }
      
      @FirstClassDecorator
      class CustomerService {
        name: string = '下单'
        constructor() {}
        buy() {
          console.log(this.name + '购买')
        }
        placeOrder() {
          console.log(this.name + '下单购买')
        }
      }
      
      // 带参数类装饰器案例
      function FirstClassDecoratorFactory(classInfo: string) {
        return function (targetClass: any) {
          console.log(targetClass.prototype.constructor + '信息')
          Object.keys(targetClass.prototype).forEach((methodName) => {
            console.log('方法', methodName)
            const dataprop = Object.getOwnPropertyDescriptor(
              targetClass.prototype,
              methodName,
            )
            console.log('方法数据属性', dataprop)
          })
        }
      }
      
      @FirstClassDecorator({ name: '唐僧' })
      class CustomerServiceTwo {
        name: string = '下单'
        constructor() {}
        buy() {
          console.log(this.name + '购买')
        }
        placeOrder() {
          console.log(this.name + '下单购买')
        }
      }
      ```

## 04:【类装饰器底层源码】逐行深剖底层 JS 源码

1. 把不带参数的部分 ts 代码放入 ts playground 中，进行编译(内容如下)，注意：修改 Target 为 es5 experimentalDecorators 为 true, emitDecoratorMetadata 为 true

   ```javascript
   'use strict'
   var __decorate =
     (this && this.__decorate) ||
     function (decorators, target, key, desc) {
       var c = arguments.length,
         r =
           c < 3
             ? target
             : desc === null
             ? (desc = Object.getOwnPropertyDescriptor(target, key))
             : desc,
         d
       if (
         typeof Reflect === 'object' &&
         typeof Reflect.decorate === 'function'
       )
         r = Reflect.decorate(decorators, target, key, desc)
       else
         for (var i = decorators.length - 1; i >= 0; i--)
           if ((d = decorators[i]))
             r =
               (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
       return c > 3 && r && Object.defineProperty(target, key, r), r
     }
   var __metadata =
     (this && this.__metadata) ||
     function (k, v) {
       if (
         typeof Reflect === 'object' &&
         typeof Reflect.metadata === 'function'
       )
         return Reflect.metadata(k, v)
     }
   function FirstClassDecorator(targetClass) {
     var targetClassObj = new targetClass()
     targetClassObj.buy()
   }
   var CustomerService = /** @class */ (function () {
     function CustomerService() {
       this.name = '下单'
     }
     CustomerService.prototype.buy = function () {
       console.log(this.name + '购买')
     }
     CustomerService.prototype.placeOrder = function () {
       console.log(this.name + '下单购买')
     }
     CustomerService = __decorate(
       [FirstClassDecorator, __metadata('design:paramtypes', [])],
       CustomerService,
     )
     return CustomerService
   })()
   ```

2. 上面的 \_\_decorate 函数不太好理解，我们优化如下

   ```javascript
   // 底层 JS 组合装饰器和目标类 __decorate 函数
   var __decorate =
     (this && this.__decorate) ||
     function (decorators, target, key, desc) {
       // argsnum：参数个数
       var argsnum = arguments.length,
         // targetInfo：被装饰器修饰的目标【本案例为类】
         // argsnum = 2 装饰器修饰的是类或者构造函数参数，targetInfo = target【类名】
         // argsnum = 4 装饰器修饰的是方法【第四个参数 desc 等于 null】targetInfo = 该方法的数据
         // argsnum = 3 装饰器修饰的是方法参数或者属性，targetInfo = undefined
         targetInfo =
           argsnum < 3
             ? target
             : desc === null
             ? (desc = Object.getOwnPropertyDescriptor(target, key))
             : desc,
         // decorator 保存装饰器数组元素
         decorator
       // 元数据西悉尼，支持 relect-metadata 元素
       if (
         typeof Reflect === 'object' &&
         typeof Reflect.decorate === 'function'
       ) {
         targetInfo = Reflect.decorate(decorators, target, key, desc)
       } else {
         // 装饰器循环，倒着循环，说明同一个目标上有多个装饰器，执行顺序是倒着执行
         for (var i = decorators.length - 1; i >= 0; i--) {
           if ((decorator = decorators[i])) {
             // 如果参数小于3【decorator 为类装饰器或者构造器参数装饰器】执行decorator(target, key)
             // 如果参数大于3【decorator 为方法装饰器】直接执行decorator(target, key, targetInfo)
             // 如果参数等于3【decorator 为方法参数装饰器或者属性装饰器】直接执行 decorator(target, key)
             // targetInfo 最终为各个装饰器执行后的返回值，但是如果没有返回值，直接返回
             targetInfo =
               (argsnum < 3
                 ? decorator(targetInfo)
                 : argsnum > 3
                 ? decorator(target, key, targetInfo)
                 : decorator(target, key)) || targetInfo
           }
         }
       }
       // return argsnum > 3 && targetInfo && Object.defineProperty(target, key, targetInfo), targetInfo;
       // 这里的代码效果同下
       argsnum > 3 &&
         targetInfo &&
         Object.defineProperty(target, key, targetInfo)
       return targetInfo
     }
   ```

3. 带参数的原码编译后的原码如下

   ```javascript
   'use strict'
   var __decorate =
     (this && this.__decorate) ||
     function (decorators, target, key, desc) {
       var c = arguments.length,
         r =
           c < 3
             ? target
             : desc === null
             ? (desc = Object.getOwnPropertyDescriptor(target, key))
             : desc,
         d
       if (
         typeof Reflect === 'object' &&
         typeof Reflect.decorate === 'function'
       )
         r = Reflect.decorate(decorators, target, key, desc)
       else
         for (var i = decorators.length - 1; i >= 0; i--)
           if ((d = decorators[i]))
             r =
               (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
       return c > 3 && r && Object.defineProperty(target, key, r), r
     }
   var __metadata =
     (this && this.__metadata) ||
     function (k, v) {
       if (
         typeof Reflect === 'object' &&
         typeof Reflect.metadata === 'function'
       )
         return Reflect.metadata(k, v)
     }
   function FirstClassDecoratorFactory(classInfo) {
     return function (targetClass) {
       console.log(targetClass.prototype.constructor + '信息')
       Object.keys(targetClass.prototype).forEach(function (methodName) {
         console.log('方法', methodName)
         var dataprop = Object.getOwnPropertyDescriptor(
           targetClass.prototype,
           methodName,
         )
         console.log('方法数据属性', dataprop)
       })
     }
   }
   var CustomerServiceTwo = /** @class */ (function () {
     function CustomerServiceTwo() {
       this.name = '下单'
     }
     CustomerServiceTwo.prototype.buy = function () {
       console.log(this.name + '购买')
     }
     CustomerServiceTwo.prototype.placeOrder = function () {
       console.log(this.name + '下单购买')
     }
     CustomerServiceTwo = __decorate(
       [
         FirstClassDecorator({ name: '唐僧' }),
         __metadata('design:paramtypes', []),
       ],
       CustomerServiceTwo,
     )
     return CustomerServiceTwo
   })()
   ```

## 05:【泛型工厂类继承装饰器】 泛型工厂类继承装饰器意义

课程安排：1. 泛型工厂类继承装饰器实现 2. 泛型工厂类继承装饰器意义

如何实现以下需求：

对已经开发好的项目中的任何一个类，创建实例时，打印日志信息，输出哪一个类被创建了，并输出传递了哪些参数信息？

## 06:【泛型工厂类继承装饰器】 泛型工厂类继承装饰器实现

以下这样做，可以保证在实例被创建时候，才进行打印，而不是再类编译时候就执行

```typescript
// 完成日志信息的装饰器
function LoggerInfoDecorator<T extends { new (...args: any[]): any }>(
  mytargetClass: T,
) {
  console.log('mytargetClass', mytargetClass)
  class SonClass extends mytargetClass {
    constructor(...args: any[]) {
      super(args)
      console.log('sonClass 执行结束')
    }
    commonMethod() {
      console.log('this', this)
      console.log('name: ', this.name)
    }
  }
  return SonClass
}

// 目标类
// @LoggerInfoDecorator('我是一个装饰器类')
@LoggerInfoDecorator
class Test {
  name!: string
  age!: number
  // 先执行原来的构造函数
  constructor(name: string) {
    this.name = name
  }
  eat() {
    console.log(this.name + ' 吃饭')
  }
}

const testOne = new Test('我是测试')
console.log('testOne', testOne)
```

## 07:【泛型工厂类继承装饰器底层源码】逐行深剖+优化底层 JS 源码

```javascript
'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null',
        )
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
function LoggerInfoDecorator(mytargetClass) {
  console.log('mytargetClass', mytargetClass)
  var SonClass = /** @class */ (function (_super) {
    __extends(SonClass, _super)
    function SonClass() {
      var args = []
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      var _this = _super.call(this, args) || this
      console.log('sonClass 执行结束')
      return _this
    }
    SonClass.prototype.commonMethod = function () {
      console.log('this', this)
      console.log('name: ', this.name)
    }
    return SonClass
  })(mytargetClass)
  return SonClass
}
// 目标类
// @LoggerInfoDecorator('我是一个装饰器类')
var Test = /** @class */ (function () {
  // 先执行原来的构造函数
  function Test(name) {
    this.name = name
  }
  Test.prototype.eat = function () {
    console.log(this.name + ' 吃饭')
  }
  Test = __decorate(
    [LoggerInfoDecorator, __metadata('design:paramtypes', [String])],
    Test,
  )
  return Test
})()
var testOne = new Test('我是测试')
console.log('testOne', testOne)
```

## 08:【泛型工厂类匿名类+继承装饰器】匿名类在装饰器中的实现

```typescript
// 完成日志信息的装饰器
function LoggerInfoDecorator<T extends { new (...args: any[]): any }>(
  mytargetClass: T,
) {
  console.log('mytargetClass', mytargetClass)
  return class SonClass extends mytargetClass {
    constructor(...args: any[]) {
      super(args)
      console.log('sonClass 执行结束')
    }
    commonMethod() {
      console.log('this', this)
      console.log('name: ', this.name)
    }
  }
}
```

编译后的结果

```javascript
function LoggerInfoDecorator(mytargetClass) {
  console.log('mytargetClass', mytargetClass)
  return /** @class */ (function (_super) {
    __extends(class_1, _super)
    function class_1() {
      var args = []
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      var _this = _super.call(this, args) || this
      console.log('sonClass 执行结束')
      return _this
    }
    class_1.prototype.commonMethod = function () {
      console.log('this', this)
      console.log('name: ', this.name)
    }
    return class_1
  })(mytargetClass)
}
```

## 09:【方法装饰器】方法装饰器的实现

```typescript
function MyMethodDecorator(
  targetClassPrototype: any,
  methodName: string,
  methodDescri: PropertyDescriptor,
) {
  console.log('targetClassPrototype: ', targetClassPrototype)
  console.log('methodName: ', methodName)
  console.log('数据属性: ', methodDescri)
  methodDescri.value() // 执行被装饰器装饰的方法[输出分配角色...]
}

// 目标类
class ReleService {
  public roleName: string = '管理员'
  constructor() {}

  @MyMethodDecorator
  DistribRoles() {
    // 分配角色
    console.log('分配角色...')
  }
}
```

运行`ts-node xxx.ts`执行上述代码后，结果如下

```shell
targetClassPrototype:  {}
methodName:  DistribRoles
数据属性:  {
  value: [Function: DistribRoles],
  writable: true,
  enumerable: false,
  configurable: true
}
```

## 10:方法装饰器拦截器意义，拦截器失效解决

```typescript
function MethodInterceptor(params: string) {
  return function (
    tragetClassPrototype: any,
    methodname: string,
    dataProps: PropertyDescriptor,
  ) {
    const targetMethod = dataProps!.value
    dataProps.value = function (...args: any[]) {
      args = args.map((arg) => {
        if (typeof arg === 'string') {
          return arg.replace(/\s+/g, '')
        }
        return arg
      })
      console.log('这里做前置拦截处理')
      targetMethod()
      console.log('这里做后置拦截处理')
    }
  }
}

// 目标类
class RoleService {
  public roleName: string = '管理员'
  constructor() {}

  @MethodInterceptor('DistribRols方法')
  DistribRols(username: string, isValid: boolean) {
    console.log('分配角色...')
  }
}

const roleService = new RoleService()
roleService.DistribRols('张   三', true)
```

执行`ts-node xxx.ts`后执行的结果如下

```shell
这里做前置拦截处理
分配角色...
这里做后置拦截处理
```

使用 ts playground 转化后的源码效果如下

```javascript
'use strict'
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
function MethodInterceptor(params) {
  return function (tragetClassPrototype, methodname, dataProps) {
    var targetMethod = dataProps.value
    dataProps.value = function () {
      var args = []
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      args = args.map(function (arg) {
        if (typeof arg === 'string') {
          return arg.replace(/\s+/g, '')
        }
        return arg
      })
      console.log('这里做前置拦截处理')
      targetMethod()
      console.log('这里做后置拦截处理')
    }
  }
}
// 目标类
var RoleService = /** @class */ (function () {
  function RoleService() {
    this.roleName = '管理员'
  }
  RoleService.prototype.DistribRols = function (username, isValid) {
    console.log('分配角色...')
  }
  __decorate(
    [
      MethodInterceptor('DistribRols方法'),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [String, Boolean]),
      __metadata('design:returntype', void 0),
    ],
    RoleService.prototype,
    'DistribRols',
    null,
  )
  return RoleService
})()
var roleService = new RoleService()
roleService.DistribRols('张   三', true)
```

这里需要注意 `var __decorate`函数中的这一行代码

```javascript
c > 3 && r && Object.defineProperty(target, key, r)
```

如果去掉，就会导致拦截器失效

## 11:【属性装饰器】属性装饰器应用，JS 源码深剖

```typescript
function loginProperty(attrValue: any) {
  return function (tragetClassPrototype: object, attrname: string | symbol) {
    console.log('tragetClassPrototype', tragetClassPrototype)
    console.log('attrname', attrname)
    ;(tragetClassPrototype.constructor as any).custLevelDescri = function () {
      console.log('消费5000元升级为贵宾')
      console.log('消费10000元升级为贵宾，赠送微波炉一个')
    }
  }
}

// 顾客目标
class CustomerService {
  public custname: string = '王五'
  @loginProperty('顾客登记')
  public degree!: string
  constructor() {}
}
```

经过 ts playground 源码如下

```javascript
'use strict'
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
function loginProperty(attrValue) {
  return function (tragetClassPrototype, attrname) {
    console.log('tragetClassPrototype', tragetClassPrototype)
    console.log('attrname', attrname)
    tragetClassPrototype.constructor.custLevelDescri = function () {
      console.log('消费5000元升级为贵宾')
      console.log('消费10000元升级为贵宾，赠送微波炉一个')
    }
  }
}
// 顾客目标
var CustomerService = /** @class */ (function () {
  function CustomerService() {
    this.custname = '王五'
  }
  __decorate(
    [loginProperty('顾客登记'), __metadata('design:type', String)],
    CustomerService.prototype,
    'degree',
    void 0,
  )
  return CustomerService
})()
```

## 12:【属性、类、方法装饰器综合应用】依赖注入+请求方法，控制器初步实现

