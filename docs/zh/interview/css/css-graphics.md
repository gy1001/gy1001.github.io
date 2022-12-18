# CSS-图文样式

## 1. Line-height 的继承问题

```html
<!-- 如下代码，p标签的行高将会是多少 -->
<style>
  body {
    font-size: 20px;
    line-height: 200%;
  }
  p {
    font-size: 16px;
  }
</style>
<body>
  <p>AAA</p>
</body>
```

**答案是 40px**

- 写具体数值，如 30px, 则继承该值（比较好理解）
- 写比例，如 2 / 1.5, 则继承该比例,然后在计算（比较好理解）
- 写百分比，如 200%, 则继承计算出来的值（考点）

如下代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>line-height 继承问题</title>
  </head>
  <style>
    body {
      font-size: 20px;
      line-height: 200%;
    }
    div {
      background-color: #ccc;
      font-size: 16px;
    }
  </style>
  <body>
    <div>这是一行文字</div>
    <p>讲解</p>
    <ol>
      <li>
        当body 的 line-height 是 50px时,div的 line-height 直接继承，是 50px
      </li>
      <li>
        当body 的 line-height 是 2 时,div的 line-height 是 div的 font-size 乘以
        2,是 32px
      </li>
      <li>
        当body 的 line-height 是 200% 时,div的 line-height 是父级元素 body的
        font-size 乘以 2,是 40px
      </li>
    </ol>
  </body>
</html>
```