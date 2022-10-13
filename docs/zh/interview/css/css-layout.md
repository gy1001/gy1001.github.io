# 页面布局

题目：
假设高度已知，请写出三栏布局，其中左栏、右栏目宽度各位 300px, 中间自适应

## 第一种解决方案：浮动布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>layout</title>
    <style>
      html * {
        padding: 0;
        margin: 0;
      }
      .layout article div {
        min-height: 100px;
      }
      .layout.float .left {
        float: left;
        width: 300px;
        background: red;
      }
      .layout.float .right {
        float: right;
        width: 300px;
        background: blue;
      }
      .layout.float .center {
        background: yellow;
      }
    </style>
  </head>
  <body>
    <section class="layout float">
      <article class="left-right-center">
        <div class="left">我是左边</div>
        <div class="right">我是右边</div>
        <div class="center">
          <h1>浮动解决方案</h1>
          1. 这是三栏布局中间部分 2. 这是三栏布局中间部分
        </div>
      </article>
    </section>
  </body>
</html>
```
