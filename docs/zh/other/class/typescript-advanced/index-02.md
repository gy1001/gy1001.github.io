# 02- 全栈思维全面深度掌握 TS 类 

## 01:【TS 类准备】TS 类底层根基，不一样的方式理解 JS 原型

### 参考文章

[JS原型](https://juejin.cn/post/7128712557031850020JS原型)

### 为什么要用原型(好处)

> 原型上所有的方法和属性都可以被构造函数【实际开发原型主要是共享方法和所有实例公用引起属性】的实例共享，那么为什么要共享呢？先来看一个案例【先不管什么是原型】

### 没有使用原型会有什么问题？

> 总结问题：所有 QQUser 对象【也叫做 QQUser 实例】都有相同的好友属性，好友属性 commonfriends 英文表示，所有 QQUser 对象都有相同的 show 方法。但是我们发现每一个 QQUser 对象【也叫做 QQUser 实例】都单独分配一个 commonfriends 属性空间和 show 方法空间，导致了大量的空间浪费
>
> 答案：使用原型解决，解决了所有实例上的方法，还有所有实例上的共同属性都可以放到原型上去定义

## 02：【TS 类准备】TS 类底层根基，深入 JS 原型【不同以往的讲解，给你带去全新收】

### 原型图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c62924ca06ae400a9c945cb8c3df62b1~tplv-k3u1fbpfcp-watermark.image?)

```typescript
function QQUser(QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_ // QQ 号码
  this.QQAeg = QQAge_ // QQ 年龄
  this.QQMark = QQMark_ // QQ 标签
  // 引用类型、对象类型
  this.commoneFriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草'] // 共同好友
  // 函数也是一种引用数据类型
  this.show = function () {
    console.log(`QQ号码：{this.QQNo},QQ龄: ${this.QQAge},QQ标注：${this.QQMark}`)
    console.log(`共同的好友是:${this.commoneFriends}`)
  }
}
// QQZhangSan 叫做对象变量，对象是等号右边通过 new 出来的一个实例
// 而且是运行期间才在堆中开辟内存空间
let QQZhangSan = new QQUser('张三', 15, '王阳明传人')
let QQLisi = new QQUser('李四', 10, '袁隆平的徒弟')
let QQLiuwu = new QQUser('刘武', 12, '飞起来的鸭子')

QQZhangSan.show()
```

## 03：【原型】深度透彻掌握原型 【为深度透彻掌握 TS 类，继承扎根】-1

### 认识函数 + 原型定义

1. 函数也是一个对象，当真正开始执行函数，执行环境【开发时为浏览器或者控制台】会为函数分配一个函数对象变量空间和函数对象空间，函数对象变量用函数名表示，存在栈空间中，函数对象空间是再堆中开辟的一个内存空间，这个空间中有一个默认的 prototype 属性，这个 prototype 属性就是一个原型对象属性【也叫做对象变量】

2. 函数和构造函数的区别

   > 当通过 new 函数（）时，此刻这个函数就是构造函数【日后会演变成 TS 类的构造器】

3. 定义：原型【prototype】是定义函数由 js 自动分配给函数的一个可以被所有构造函数实例对象变量共享的对象变量【也叫对象属性】

### 如何访问原型对象空间上的属性和方法

1. 构造函数所有实例对象都可以访问原型对象空间上的属性和方法【每一个实例都有默认的 proto 属性，这个 proto 属性指向原型对象空间】
2. 关于\_\_proto\_\_: new 在创建新对象的时候，会赋于新对象一个属性指向构造函数的 prototype 属性对象空  间，这个属性就是 proto
3. 可以直接通过构造函数 .prototype 对象属性来访问原型对象空间上的属性和方法

```javascript
QQUser.prototype = {
  constructor: f QQUser(QQNo_, QQAge_, QQMark_)
  __proto__: Object
}
```

### 构造函数实例[也叫对象]如何访问原型对象上的属性和方法

1. 构造函数实例访问一个属性和方法，首先从实例空间上查找[当执行环境执行 new 构造函数时，构造函数中通过 this 定义的属性和方法会分配在这个空间中]，如果找到改属性和方法，就停止查找，表示找到了。如果没有找到，就继续在该实例的对象空间中去查找改属性和方法【实例中的默认的 proto 对象属性指向原型对象空间】
2. 实例正是借助自身的 \_\_proto\_\_ 对象属性来查找对象空间中的属性和方法，有点像儿子去和爸爸要它本身没有的东西一样，讲到这里，这其实就是 TS 继承的原模型图 
3. 增加或者修改原型独享的属性或者方法后，所有的实例或者叫做对象立即可以访问的到[但创建实例后在覆盖原型除外]

```javascript
// 把共同的属性挂在原型属性上
QQUser.prototype.commoneFriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草'] // 共同好友
QQUser.prototype.show = function () {
  console.log(`QQ号码：{this.QQNo},QQ龄: ${this.QQAge},QQ标注：${this.QQMark}`)
  console.log(`共同的好友是:${this.commoneFriends}`)
}

QQUser.prototype.commoneFriends.push("大叔")
```

## 04：【原型】深度透彻掌握原型 【为深度透彻掌握 TS 类，继承扎根】-2

### 高频面试题：创建实例后再覆盖原型，实例对象无法访问到，为什么？

```javascript
// 覆盖对象：
let obj = { username: "wangwu", age: 23 }
let objnew = obj;

obj = { address: "北京海淀区西三环", age: 39 }
console.log("obj:", obj);
console.log("obj2:", objnew)

// 结果：
// obj: { address: '北京海淀区西三环', age: 39 }
// objnew: { username: 'wangwu', age: 23 }

obj指向了新的内存空间，原来的内存空间还在被objnew使用，所以未被垃圾回收机制回收，objnew依然能访问到它
```

## 05：【原型】深度透彻掌握原型 【为深度透彻掌握 TS 类，继承扎根】-3

### 覆盖原型：

```javascript
function QQUsers (QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_;//QQ号
  this.QQAge = QQAge_;//Q龄
  this.QQMark = QQMark_;//QQ标签
}
//方法栈--执行方法时的栈区

QQUsers.prototype.commonfriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草']
QQUsers.prototype.show = function () {
  console.log(`QQ号:${this.QQNo},QQ龄:${this.QQAge},QQ标注:${this.QQMark}`)
  console.log(`共同的好友是:${this.commonfriends}`);
}

let QQZhangSan = new QQUsers("37834522", 15, "王阳明传人")
let QQLisi = new QQUsers("30424232", 10, "袁隆平的徒弟")
//QQUsers.prototype.commonfriends.push("大树");
console.log(QQZhangSan.commonfriends);
console.log(QQLisi.commonfriends);

QQUsers.prototype = {
  commonfriends: ["abc", "bcd", '骑驴看海']
}

console.log("QQUsers.prototype:", QQUsers.prototype)
console.log("QQZhangSan.commonfriends:", QQZhangSan.commonfriends)
console.log("QQUsers.prototype.commonfriends:", QQUsers.prototype.commonfriends)

// 结果：
// QQUsers.prototype: { commonfriends: [ 'abc', 'bcd', '骑驴看海' ] }
// QQZhangSan.commonfriends: [ '骑驴看海', '大漠上的英雄', '坚实的果子', '小草' ]
// QQUsers.prototype.commonfriends: [ 'abc', 'bcd', '骑驴看海' ]
```

### 思考题:

### `QQZhangSan.__proto__.show()`和`QQZhangSan.show()` 输出的结果完全一样吗？ 为什么呢？

```javascript
QQZhangSan.__proto__.show() 
// QQ号:undefined,QQ龄:undefined,QQ标注:undefined
// 共同的好友是:骑驴看海,大漠上的英雄,坚实的果子,小草

QQZhangSan.show()
// QQ号:37834522,QQ龄:15,QQ标注:王阳明传人
// 共同的好友是:骑驴看海,大漠上的英雄,坚实的果子,小草
```

`QQZhangSan.__proto__.show()` 执行的是构造函数原型上初始的show()方法，`QQZhangSan.show()` 执行对象变量个性化传参之后的show()方法。

## 05：环境搭建】搭建TS自动更新+TS自动运行+Parcel自动打包环境

### 步骤如下

1. 初始化`npm init -y`,建立`package.json`

2. 安装相关依赖

   ```bash
   npm install typescript -D
   或者
   npm install typescript -g
   npm install ts-node nodemon -D
   ```

3. 生成`tsconfig.json`文件

   ```bash
   tsc --init
   ```

4. 修改`tsconfig.json`中的配置

   ```json
   {
     "compilerOptions": {
       "outDir": "./dist", // ts 编译后生成js文件保存的目录
       "rootDir": "./src" // 自己编写的 ts 源文件所在目录
     }
   }
   // 注意 dist src package.json 必须是在同一个目录下
   ```

5. 安装`ts-node`

   > ts-node 可以让 node 能直接运行 ts代码，无需使用 tsc 先将 ts 代码编译成 js 代码。[ts-node包装了 node, 它可以直接运行 ts 代码]

6. 安装 nodemon 工具【自动检测工具】

   > nodemon 作用：nodemon可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于 nodejs 的应用程序

7. 在`package.json`中配置自动检测，自动重启应用程序

   ```json
   {
     "scripts": {
       "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
     },
   }
   ```

   `nodemon --watch src/` 表示检测目录是 `package.json` 同级目录

   `-e ts` 表示 `nodemon` 命令准备将要监听的是 `ts` 后缀的文件

   `-exec ts-node ./src/project/app.ts` 表示检测到 `src` 目录下有任何变化，都要重新执行 `app.ts` 文件

### Parcel 打包支持浏览器运行 TS 文件

1. 安装 `parcel`打包工具：`npm install parcel-bundler --save-dev`

2. 在`package.json`中给`npm`添加启动项，支持启动`parcel`工具包

   ```json
   {
     "scripts": {
       "start": "parcel ./public/index.html"
     },
   }
   ```

3. 启动`parcel`工具包

   ```bash
   npm run start
   ```

## 06: 全栈思维全面掌握 TS 类

### 学习 TypeScript 类的深远意义

* TypeScript类的出现完全改变了前端领域项目代码编写模式，配合 TypeScript 静态语言，编译期间就能检查语法错误的优势【项目上线后隐藏语法错误的风险几乎为零，相比不用 TypeScript 开发项目，使用 TS 后对前端项目尤其是大中项目的开发或者底层第三方插件，组件库的开发带来的优势已经超乎了想象】
* 相对以前 js 不得不用构造函数来充当“类”，TypeScript 类的出现就可以说试一次技术革命，让开发出来的项目尤其是大中项目的可读性好，可扩展性好了不是一点点
* TypeScript 类让前端开发人员和组织项目或者于都各大框架源码的思维方式变得先进和生活了许多。因为是 OOP【面向对象编程】的技术基石
* 在前端各大流行框架开发的项目中，比如 Vue3项目、Angular项目、基于 Antd库的项目还是后端 nodejs框架。比如 Nest.js 亦或者 Vue3底层源码，都可以频频见到类的身影
* 尽管 TypeScript 类照搬了 java 后端语言的四星，但是 TypeScript 的底层依然是基于 js 的，这一点对于 前端开发工程师更加深入理解 TS 打开了一条理解之道，提升他们更深厚的 js 功底从而为面试加分都有很大帮助

### TypeScript 哪些技能基于类

TypeScript 类是 OOP 的技术基石，包括类、属性封装、继承、多态、抽象、泛型、紧密关联的技术包括方法重写，方法审核、构造器、构造器重载、类型守卫、自定义守卫、静态方法、属性、关联引用属性，多种设计模式等

### 什么是类

定义：类就是拥有相同属性和方法的一系列对象的集合，类是一个模具，是从这类包含的所有具体对象中抽离出的一个概念，类定义了它所包含的全对象的静态特征和动态特征

* 类有静态特征和动态特征【以大家最熟悉的人类为例】
* 静态特征【软件界叫做属性】姓名、年龄、地址、身份号码、联系方式、家庭地址、微信号
* 动态特征【软件界叫做方法】吃饭、走路

【再看桌子类】

静态属性【属性】：高度、宽度、颜色、价格、品牌、材质

动态特征【方法】承载

【来看订单类】

静态属性【属性】订单号、下单时间、下单顾客、订单详情、顾客微信、收件地址、负责客服

动态特征【方法】下单、修改订单、增加订单、删除订单、查询订单、退单【这一些方法真正开发会归位 OrderService 类】但是从广义来说都同属于订单系列类的方法

```typescript
class Person {
  public name: string = '唐僧'
  public age: number = 10
  public phone: string = '11222'

  doEat():number { return 110 }
}
```

### 理解子类

#### 什么是子类

1. 有两个类，比如 A 类和 B 类，如果满足 A 类 is kind of B类，那么 A类就是 B类的子类，比如 A类是顾客类，B类是人类，因为顾客类 a kind of 人类成立【顾客类是人类的一种】，所以顾客类是人类的子类

2. 子类如何继承父类的属性和方法

   > 以顾客为例子：顾客类继承了父类【人类】的非私有的属性和方法，也具备了子类独有的属性和方法

​	顾客类继承父类：【人类】的全部私有属性和方法外，还有哪些独有的属性和方法呢？

​	顾客类独有属性：顾客登记、顾客编号

​	顾客类独有方法：购买

### 什么是对象【对象也叫 instance实例，对象变量也叫实例变量】

创建对象一共做了三件事

* 

1. 什么是对象（实例）

   > 就是一个拥有具体属性值和方法的实体，是类的一个具体表现表现，一个类可以创建一个或者多个对象

2. 如何通过类来创建对象【实例】？

   > let 对象变量名  =  new 类名()
   >
   > const 对象变量名 = new 类名()

3. 如何根据 People 类来创建叫做张三对象【实例】的人？

   >let kateCust = new Customer()
   >
   >kateCust 是对象变量名，new Customer() 表示 new 出来的是一个 Customer 对象，而是运行期间才在堆中分配 Customer 对象的内存空间【new 就是分配内存空间的意思】

4. 类的对象变量、对象内存图展示

5. 类的对象变量、对象的关系

   > 类的对象变量存在栈中，对象变量存储着对象的首地址，对象变量通过这个地址找到它的对象
