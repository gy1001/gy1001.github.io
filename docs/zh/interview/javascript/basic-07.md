# BOM操作
> BOM: Browser Object Model

## 1. 知识点
### 1.1 navigator

```javascript 
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

### 1.2 screen
```javascript
console.log(screen.width)
console.log(screen.height)
```

### 1.3 location
```javascript
console.log(location.href)
console.log(location.protocol) // http、https
console.log(location.pathname) // /learn/199 
console.log(location.search) 
console.log(location.hash)
```

### 1.4 history
```javascript
history.back()
history.forward()
```

## 2. 题目以及 解答

### 2.1 如何识别浏览器的类型
使用 userAgent ，代码如上

### 2.2 分析拆解 URL 各个部分
使用 location 代码如上