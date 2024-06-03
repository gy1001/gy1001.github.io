# CSS-响应式

## 1.  rem 是什么

- rem 是一个长度单位
  - px 绝对长度单位，最常用
  - em 相对长度单位，相对于父元素，不常用
  - rem 相对长度单位，相对于根元素，常用于响应式布局

## 2.  如何实现响应式(响应式的常见方案)

- media-query 根据不同的屏幕宽度设置根元素 font-size
- rem 基于根元素的相对单位

  ```css
  @media only screen and(max-width: 374px) {
    /* iphone5或者更小的尺寸， */
    html {
      font-size: 86px;
    }
  }
  @media only screen and(min-width: 374px) and (max-width: 413px) {
    /* iphone 6/7/8 和 iphone x */
    html {
      font-size: 100px;
    }
  }
  @media only screen and(min-width: 414px) {
    /* iphone 6p/7p/8p 或者更大的尺寸 */
    html {
      font-size: 110px;
    }
  }
  ```
## 3. 响应式 vw/vh

- rem 的弊端
  - rem 的弊端之一："阶梯"性

- 网页的视口尺寸
  - window.screen.height：屏幕高度
  - window.innerHeight: 网页视口高度
  - document.body.clientHeight: body 高度

- vw/vh
  - vh 网页视口高度的 1/100
  - vw 网页视口宽度的 1/100
  - vmax 取两者最大值，vmin 取两者最小值
