# 05-深学 TS 必会的 JS 技术【不会 JS 原型继承的进入学习】

## 01: 本章概述【学习本章技能的重要性】

## 02: 本章准备：tsconfig 多级目录配置

## 03：TS 相关 JS：ES5 原型继承

```javascript
function Vechile(brandNo, price) {
  // 父类
  this.brandNo = brandNo
  this.price = price
}

Vechile.prototype.sale = function () {
  console.log(this + ' 销售')
}
// 继承
function Bus(brandNo, price, seatNo) {
  // 子类
  Vechile.call(this, brandNo, price)
  this.seatNo = seatNo
}

function Car(brandNo, price, type) {
  Vechile.call(this, brandNo, price)
  this.type = type
}
```

## 04：TS 相关 JS：深入ES5 原型继承和组合继承

```javascript
function Vechile(brandNo, price) {
  this.brandNo = brandNo
  this.price = price
}

Vechile.prototype.sale = function () {
  console.log(this + ' 销售')
}
function Bus(brandNo, price, seatNo) {
  Vechile.call(this, brandNo, price) // 借用构造函数继承
  this.seatNo = seatNo
}
// 原型链继承
Bus.prototype = new Vechile()

function Car(brandNo, price, type) {
  Vechile.call(this, brandNo, price)
  this.type = type
}

const bus = new Bus('奥迪', 3000, '我的伙伴')
bus.sale()
```

## 05: TS 继承底层实现方式：ES5 原型继承升级

> 上一节中我们使用 一个父类的实例对象作为子类的原型指向，这里面父类的实例对象上有两个属性 brandNo, price 就会浪费空间，

```javascript

function Vechile(brandNo, price) {
  this.brandNo = brandNo
  this.price = price
}

Vechile.prototype.sale = function () {
  console.log(this + ' 销售')
}
function Bus(brandNo, price, seatNo) {
  Vechile.call(this, brandNo, price)
  this.seatNo = seatNo
}
// TS 继承的思想雏形：借助于一个中间对象, 也叫做：：：：寄生式组合继承
function protoExtendsWithMdl(ParentClass, ChildClass) {
  function Middle() {
    this.constructor = childClass
  }
  Middle.prototype = ParentClass.prototype
  ChildClass.prototype = new Middle()
}

protoExtendsWithMdl(Vechile, Bus)

function Car(brandNo, price, type) {
  Vechile.call(this, brandNo, price)
  this.type = type
}

const bus = new Bus('奥迪', 3000, '我的伙伴')
bus.sale()
```

## 06：深入 TS 继承——微信，支付宝支付继承类-1

```typescript
class Pay {
  // 支付父类
  bank_card_no: string // 捆绑银行卡
  balance: number // 银行卡余额
  const: number // 消费费用
  tokenid: string // 登录后用户访问令牌
  pay() {}
}

enum PayType {
  WebChat = 1,
  AliPay = 2,
  CloundFlashPayment = 3,
}

class BankPay extends Pay {
  bank_network: string // 银行网点
  bankno_type // 银行卡类型
  bank_card_psw // 银行卡密码
  custname // 顾客姓名
}

class MobilePay extends Pay {
  type: PayType
  change: number // 支付平台零钱
  opendid: string // 用户识别身份 id
  appid: string // 微信小程序 appid
}
```

## 07：
