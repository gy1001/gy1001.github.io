# 01-搭建开发环境

## 01:初始化一个 React 项目

```shell
yarn create react-app my-app --template typescript
npx create-react-app my-app --template typescript
```

TypeScript Error 配置：tsconfig.json 中 "jsx": "react"

## 02: 徒手写一个 button 组件感受下正在播放

### 规划组件目录

```text
* src
  * button
    * index.tsx
    * index.css
    * index.test.tsx
  * radio
  * checkbox
  * ...
```

### 新建 src/button/index.tsx 文件

内容如下

```tsx
import React from 'react'

const Button = (props: any) => {
  const { className, children } = props
  return <button className={className}>{children}</button>
}

export default Button
```

### 入口文件引入 button 组件

修改 index.tsx 如下

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Button from './button'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Button className='my-btn'>Click Me</Button>
  </React.StrictMode>,
)
```

```css
<!-- 增加如下代码 -->
.my-btn {
  color: blue;
  font-size: 30px;
}
```

可以看到渲染后的组件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddd7b35971524f6fbd746f8a8a104a94~tplv-k3u1fbpfcp-watermark.image?)

### 完成多种样式的书写

1. 安装依赖库

```bash
npm install classnames -D
```

2. 通过链接[https://unpkg.com/browse/antd@4.18.7/es/button/style/](https://unpkg.com/browse/antd@4.18.7/es/button/style/)找到 button 的样式文件 index.css, 下载至 src/button/index.css 中

3. button/index.tsx 中引入 index.css

```tsx
import './index.css'
```

4. 创建测试用例文件`button/index.test.tsx`

```tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './index'

test('renders learn react link', () => {
  render(<Button>i am button</Button>)
  const linkElement = screen.getByText(/i am button/i)
  expect(linkElement).toBeInTheDocument()
})
```

5. 增加 button 属性 props 类型声明

```tsx
import React from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import './index.css'

interface ButtonProps {
  className?: string
  type?: 'primary' | 'dangerous' | 'dashed' | 'text' | 'link'
  children?: ReactNode
  style?: React.CSSProperties
}

const Button = (props: ButtonProps) => {
  const { className, type, children } = props
  const classObj = {
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
  }
  if (className) {
    classObj[className] = true
  }
  const cls = classNames(classObj)
  return (
    <button className={cls} style={style}>
      {children}
    </button>
  )
}

export default Button
```

## 03: 组件开发 - 引入 storybook

1. 安装

```bash
npm install storybook -D
npx sb init
```

2. 安装完毕后，运行起来，可以看到响应的界面，以及对应的控制文件 `Button.stories.ts`

3. 我们删除无用的 stories 下的文件
   修改 stories/Button.tsx 为 组件的内容
   修改 stories/button.css 为 组件 button/index.css 的内容
   修改 stories/Button.stories.ts 种的内容

   ```typescript
   <!-- 修改为如下代码 -->
   export const Primary: Story = {
     args: {
       // primary: true,
       type: 'primary',
       children: 'Button',
     },
   }
   ```

4. 重新运行脚本`npm run storybook`即可看到，如下界面

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4f4ed014aea4a4ebe0a4a0606b857d4~tplv-k3u1fbpfcp-watermark.image?)

5. 以上完成初步演示

6. 增加更多演示类型
   修改 `Button.stories.ts` 为 `Button.stories.tsx`
7. 增加 export 类型

```tsx
const style = { marginLeft: '8px' }
export const ButtonGroup: Story = {
  render: () => (
    <>
      <Button type='primary'>Primary Button</Button>
      <Button style={style}>Default Button</Button>
      <Button type='dashed' style={style}>
        Dashed Button
      </Button>
      <Button type='text' style={style}>
        Text Button
      </Button>
      <Button type='link' style={style}>
        Link Button
      </Button>
    </>
  ),
}
```

最终效果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0803a77b9ab94d9dbe21835cf5774a53~tplv-k3u1fbpfcp-watermark.image?)

8. 修改目录
   移动 stories/Button.stories.tsx 到 src/button/ 目录下，删除 stories 文件夹，修改 Button.stories.tsx 中的组件引入

9. 可以看到 storybook 页面正常显示
