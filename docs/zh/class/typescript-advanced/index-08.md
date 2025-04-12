# 08-泛型晋级

## 01：为什么要用函数重载？

不使用函数重载时候，如果一个函数返回多个类型，使用时候，我们需要使用类型断言才能进行有效的准确提示，显得繁琐，并且不够灵活(假如增加新的类型返回，仍然需要类型断言新的类型)

```typescript
enum MessageTypes {
  Image = 'image',
  Audio = 'audio',
}
type Message = { id: number; type: MessageTypes; sendMessage: string }
const messages: Message[] = [
  { id: 1, type: MessageTypes.Audio, sendMessage: '你好啊' },
  { id: 2, type: MessageTypes.Image, sendMessage: '朝辞百度彩云间' },
  { id: 3, type: MessageTypes.Audio, sendMessage: '笑傲江湖' },
  { id: 4, type: MessageTypes.Image, sendMessage: '西游记' },
  { id: 5, type: MessageTypes.Image, sendMessage: '水浒传' },
]

// 类型推断出来 function searchMsg(condition: MessageTypes | number): Message | Message[] | undefined
function searchMsg(condition: MessageTypes | number) {
  if (typeof condition === 'number') {
    return messages.find((item) => item.id === condition)
  }
  return messages.filter((message) => message.type === condition)
}

// 这里单独使用.属性的时候不能进行提示，需要进行类型断言
console.log((searchMsg(1) as Message).id)
const result = (searchMsg(MessageTypes.Audio) as Message[]).map((item) => ({
  ...item,
  name: 'xx',
}))
```

## 02：使用函数重载改造上节代码【体会好处】

> 函数重载：一组具有相同名字，不同参数列表和返回值无关并且具有一个实现签名和一个或者多个重载签名的函数

```typescript
enum MessageTypes {
  Image = 'image',
  Audio = 'audio',
}
type Message = { id: number; type: MessageTypes; sendMessage: string }
const messages: Message[] = [
  { id: 1, type: MessageTypes.Audio, sendMessage: '你好啊' },
  { id: 2, type: MessageTypes.Image, sendMessage: '朝辞百度彩云间' },
  { id: 3, type: MessageTypes.Audio, sendMessage: '笑傲江湖' },
  { id: 4, type: MessageTypes.Image, sendMessage: '西游记' },
  { id: 5, type: MessageTypes.Image, sendMessage: '水浒传' },
]

function searchMsg(condition: MessageTypes): Message[] // 重载签名
function searchMsg(condition: number): Message // 重载签名
// 实现签名
function searchMsg(
  condition: MessageTypes | number,
): Message | Message[] | undefined {
  if (typeof condition === 'number') {
    return messages.find((item) => item.id === condition)
  }
  return messages.filter((message) => message.type === condition)
}
// 这里可以直接进行.语法操作，有提示
console.log(searchMsg(1).id)
const result = searchMsg(MessageTypes.Audio).map((item) => ({
  ...item,
  name: 'xx',
}))
```

## 03: 盘点函数重载最重要的要点

## 04：在真实应用中掌握泛型函数

> 准备知识：快速排序法

### 快速排序法的思想

1. 先从数列中取出一个数作为基准数
2. 分区过程，将比这个数大的数全放在它的右边，小于它的数全放在左边
3. 再对左右区间重复第二步，直到各区间只有一个数

```typescript
function quickSort(arr: Array<any>): Array<any> {
  if (arr.length < 2) {
    return arr
  }
  const left: Array<any> = []
  const right: Array<any> = []
  const middle = arr.splice(Math.floor(arr.length / 2), 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(middle, quickSort(right))
}
const chineseArr = [3, 1, 5, 55, 40, 30, 11, 2, 7, 9, 1, 11, 19, 30]
console.log(quickSort(chineseArr)) // [1,  1,  2,  3,  5,  7, 9, 11, 11, 19, 30, 30,40, 55]
```

## 05：深刻掌握泛型函数重载准备——经典复杂排序器

### 泛型函数重载准备

1. 中文排序
2. 字符串排序
3. 中文+英文、数字数组排序
4. 中文+英文、数字数组+数组内部字符串自排序
5. 字符串自排序 + 中文 + 英文、数字数组+数组内部字符串自排序

### 素材

```typescript
var pattern1 = /[\u4e00-\u9fa5]/g
```

```typescript
// 中文排序
const chineseArr = ['武汉', '石家庄', '郑州', '太原', '济南', '沈阳', '大连']

function sortChinese(arr: Array<string>): Array<string> {
  return arr.sort(function (preStr, curStr) {
    return preStr.localeCompare(curStr, 'zh-CN')
  })
}

console.log(sortChinese(chineseArr)) // [ '大连', '济南','沈阳', '石家庄','太原', '武汉','郑州']
```

如何将两个排序结合起来呢？需要判断是否是中文

```typescript
function isChinese(arr: Array<string>): boolean {
  var pattern = /[\u4e00-\u9fa5]/g
  return chineseArr.some((item) => pattern.test(item))
}
```

## 06：深入理解为什么要用泛型函数重载

```typescript
// 字符串排序
function strSelfSort(str: string) {
  const strArr = str.split('')
  const strSortArr = quickSort(strArr)
  return strSortArr.join('')
}
```

结合以上写的方法，综合代码如下

```typescript
function sort<T>(data: T): Array<any> | string | undefined {
  if (data instanceof Array) {
    if (isChinese(data)) {
      return sortChinese(data)
    } else {
      return quickSort(data)
    }
  } else if (typeof data === 'string') {
    return strSelfSort(data)
  }
}

console.log(sort(chineseArr)) // [ '大连', '济南','沈阳', '石家庄','太原', '武汉','郑州']
console.log(sort('srcfgfdf')) // cdfffgrs
```

## 07: 视频作业——泛型函数中分化出来子功能

## 10: 深入泛型工厂函数类型和拓展知识

### 泛型工厂函数类型定义

> 可以代表任意一个类构造函数的函数类型

```typescript
class CommercialBank {
  public address: string = '北京'
  public name: string = '王五'
  static count: number
  constructor(name: string, address: string) {
    this.address = address
    this.name = name
  }
  loan(): void {
    console.log(this.name + ' 银行贷款')
  }
}

// 注意这里的 new
type ConstructorType = new (...args: any) => CommercialBank
let CommericalBankInstance: ConstructorType = CommercialBank

const customer = new CommericalBankInstance('孙悟空', '水帘洞')
customer.loan() // 孙悟空 银行贷款
```

## 11: 泛型工厂函数类型的真实应用

> 如何使用泛型工厂函数类型，来为所有的类提供一个通用的构造器，目前在构造器中先不关心参数，只是在创建实例时候打印一条日志信息（通用的语句），其实它是装饰器的一个雏形（类似的一个思想）

```typescript
class CommercialBank {
  public address: string = '北京'
  public name: string = '王五'
  static count: number
  constructor(name: string, address: string) {
    this.address = address
    this.name = name
  }
  loan(): void {
    console.log(this.name + ' 银行贷款')
  }
}
// 注意这里的 new
type ConstructorType = new (...args: any) => any
interface ConstructroInter {
  new (...args: any): any
}
// 使用接口、type声明类型，效果是相同的
// function createFactoryConstructor(constructorType: new (...args: any) => any) {
// function createFactoryConstructor(constructorType: ConstructorType) {
function createFactoryConstructor(constructorType: ConstructroInter) {
  console.log(constructorType.name + ' 被创建了')
  new constructorType()
}
createFactoryConstructor(CommercialBank) // 执行时候，会打印：CommercialBank 被创建了
```

## 12: 交叉类型

### 交叉类型

```typescript
type Obj1 = { a: string; b: number }
type Obj2 = { c: number; d: string }
type Obj3 = Obj1 & Obj2 // 两者的并集
const o3: Obj3 = { a: '唐僧', b: 11, c: 33, d: '金蝉子' }

// 交叉类型表示取两个类型的并集，用在基本类型上是没有意义的，等同于声明了never
type Obj4 = string & number // 推断出：type Obj4 = never
```

## 13: 通用交叉方法

## 14: 代码实战演练

> 如何用交叉类型 **+** 方法重载 **+** 泛型 **rest** 参数合参并 **n** 多个对象。
