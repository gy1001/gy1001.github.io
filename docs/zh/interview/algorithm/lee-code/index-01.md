# LeeCode

## 杨辉三角

给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

![img](./assets/1626927345-DZmfxB-PascalTriangleAnimated2.gif)

**示例 1:**

```
输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

**示例 2:**

```
输入: numRows = 1
输出: [[1]]
```

**提示:**

- `1 <= numRows <= 30`

### 解题

```js
const cache = {}
var generateRow = function (numRows) {
  if (cache[numRows]) {
    return cache[numRows]
  }
  if (numRows === 1) return [1]
  if (numRows === 2) return [1, 1]
  const result = [1]
  for (let i = 1; i < numRows - 1; i++) {
    result.push(
      generateRow([numRows - 1])[i - 1] + generateRow([numRows - 1])[i],
    )
  }
  result.push(1)
  cache[numRows] = result
  return result
}

var generate = function (numRows) {
  const result = []
  for (let i = 0; i < numRows; i++) {
    result.push(generateRow(i + 1))
  }
  return result
}
```

## 杨辉三角||

给定一个非负索引 `rowIndex`，返回「杨辉三角」的第 `rowIndex` 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。

**示例 1:**

```
输入: rowIndex = 3
输出: [1,3,3,1]
```

**示例 2:**

```
输入: rowIndex = 0
输出: [1]
```

**示例 3:**

```
输入: rowIndex = 1
输出: [1,1]
```

### 解题

```js

```
