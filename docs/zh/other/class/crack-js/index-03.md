# 03-对象认知升级

## 01: 通过普通属性，排序属性和隐藏类提升对象属性认知 

### 属性遍历

```javascript
// 属性遍历
const obj = {}
obj.p1 = 'str1'
obj.p6 = 'str6'
obj.p2 = 'str2'
obj[1] = 'num1'
obj[6] = 'num6'
obj[2] = 'num2'
for (let p in obj) {
  console.log('property: ', obj[p])
}
```

在浏览器中的输出结果为

```text
property:  num1
property:  num2
property:  num6
property:  str1
property:  str6
property:  str2
```

### 这个例子我们能发现什么

* 两种属性：字符串作为键和数字作为键的属性
* 键属性被遍历的顺序似乎是有规律的

### 常规属性

* 键为字符串的属性
* 特点：根据创建时的顺序排序

### 排序属性

* 属性键为数字的属性
* 特点：按照索引值大小升序排序

### 思考

* 数字字符串属性时排序属性不？：：：是的
* 为什么要设计常规属性和排序属性
  * 提升属性的访问速度
  * 两种线性数据结构保存
  * 
