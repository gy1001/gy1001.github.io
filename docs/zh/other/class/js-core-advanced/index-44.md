# 44-策略模式

策略模式，是一种封装算法与规则的设计模式。

我们在学习封装的终极奥义时已经知道，封装就是提炼出来相同点，将不同点作为变量。

当不同点是一段逻辑、一个算法、一个规则时，我们就可以进一步将这个不同点进行封装。

这就是策略模式解决问题的思路。

## 1-计算员工奖金

公司里每位员工的奖金都不一样。

员工的奖金，由员工基本工资与员工等级相关。

奖金 = 基本工资 * 等级对应的倍数

- A 级 -> 5 倍
- B 级 -> 4 倍
- C 级 -> 3 倍
- D 级 -> 2 倍
- E 级 -> 1 倍

于是，我们就可以封装一个计算奖金的方法如下

```javascript
function getBouns(base, level) {
  if (level == 'A') {
    return base * 5
  }
  if (level == 'B') {
    return base * 4
  }
  if (level == 'C') {
    return base * 3
  }
  if (level == 'D') {
    return base * 2
  }
  if (level == 'E') {
    return base * 1
  }
}
```

有了这个方法，计算奖金就很简单

```javascript
const p1 = {
  name: '张三',
  base: 1000,
  level: 'A'
}
p1.bouns = getBouns(p1.base, p1.level)

console.log(p1)
```

这样封装虽然很简单，但是存在潜在的风险：**奖金的计算方式，随时可能会改变**。

当奖金的计算方式发生了变化，新增了更多的员工等级，我们就不得不修改 `getBouns` 方法。

因此我们需要对该方法进行进一步的提炼，把该方法中的变量：奖金的计算方式提炼出来。这样，我们就不担心变量发生改变了。

此处，我们需要关注两个地方

- 变量：奖金的计算方式，是一段逻辑，可以封装为一个函数
- 奖金的计算方法：与员工等级是一对一的映射关系

因此，我们应该建立一个员工等级与奖金计算方式的隐射关系

```javascript
const map = {
  A: function(base) {
    return base * 5
  },
  B: function (base) {
    return base * 4
  },
  C: function (base) {
    return base * 3
  },
  D: function (base) {
    return base * 2
  },
  E: function (base) {
    return base * 1
  },
}
```

即使以后有所修改，我们只需要修改该配置文件或者配置表即可。

员工的奖金依据该配置进行计算

```javascript
function getBouns(base, level) {
  return map[level](base)
}
const p2 = {
  name: '李四',
  base: 1200,
  level: 'B'
}
p2.bouns = getBouns(p2.base, p2.level)

console.log(p2)
```

## 02-表单验证

表单验证是一个非常常见的案例，我们也可以使用策略模式来解决规则的验证问题。

借鉴 antdesign 的表单规则，假设我们从组件中，获取得到的字段数据与其对应的规则如下

```javascript
// 从组件中获取到的字段内容，其中包括了具体的值，与传入的校验规则
const fields = {
  username: {
    value: '张三',
    rules: [{required: true, message: '该字段为必填'}, {max: 10}]
  },
  password: {
    value: '123',
    rules: [{required: true}, {min: 6}]
  },
  phone: {
    value: '123123',
    rules: [{pattern: /(^1[3|5|8][0-9]{9}$)/, message: '手机号码规则不匹配'}]
  }
}
```

分析之后我们发现，表单字段的规则，已经被提炼成为变量，通过在表单组件中配置 `rules` 来对每一个字段设定不同的规则。

同样的道理，每一个规则，都应该有对应的验证函数，该验证函数与 rules 中的字段是一对一的映射关系。因此我们也因为维护一份配置表

```javascript
var strategys = {
  required: function (value, rule) {
    if (value === '') {
      return rule.message || '该字段不能为空';
    }
  },
  // 限制最小长度
  min: function (value, rule) {
    if (value.length < rule.min) {
      return rule.message || `该字段最小长度为${rule.min}`;
    }
  },
  // 限制最小长度
  max: function (value, rule) {
    if (value.length > rule.max) {
      return rule.message || `该字段最大长度为${rule.max}`;
    }
  },
  // 手机号码格式
  pattern: function (value, rule) {
    if (!rule.pattern.test(value)) {
      return rule.message || '正则匹配失败';
    }
  }
};
```

规则作为变量被提炼出来，规则的映射表也有了，那么我们只需要再封装一个验证对象即可。

```javascript
function Validator () {
  // 格式 { username: { value: '张三', rules: [{}, {}] } }
  this.fields = {};
};

// 添加一个字段
Validator.prototype.addField = function (name, value, rules) {
  this.fields[name] = {
    value,
    rules
  }
};

// 添加多个字段
Validator.prototype.addFields = function(fields) {
  this.fields = fields
}

// 验证，并返回验证结果
Validator.prototype.validate = function() {
  // 通过的字段，与错误的字段
  const result = { fields: [], errorFields: [] }
  Object.keys(this.fields).forEach(key => {
    // 错误验证结果
    let errorMessage = ''
    const value = this.fields[key].value
    const rules = this.fields[key].rules
    
    for (var i = 0; i < rules.length; i++) {
      Object.keys(rules[i]).forEach(validateField => {
        if (strategys[validateField]) {
          const message = strategys[validateField](value, rules[i])
          if (message) {
            errorMessage = message
          }
        }
      })
      if (errorMessage) {
        break
      }
    }

    if (errorMessage) {
      result.errorFields.push({field: key, value, message: errorMessage})
    } else {
      result.fields.push({field: key, value})
    }
  })

  return result
};
```

这样，我们在使用时，就可以通过 `validate` 方法，得到表单验证的结果

```javascript
var validator = new Validator();
validator.addFields(fields)
const result = validator.validate()
console.log(result)

if (result.errorFields.length > 0) {
  console.error('字段验证不通过')
}
```

我们可以字段，来验证一下该封装是否合理。