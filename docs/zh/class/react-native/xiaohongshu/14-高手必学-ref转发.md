# 14-【高手必学-ref转发】具备更强的自定义组件能力

## 01: Ref转发案例演示1外层操作原始组件

### ref 转发解决了什么问题

* 使用自定义组件（组合模式），外层对原始组件的操作
* 函数式组件对外暴露实例（通常是 API）

## 02:案例1：使用自定义组件，外层操作原是组件

> `forwardRef` 允许组件使用 [ref](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 将 DOM 节点暴露给父组件。
>
> [官方地址之forwardRef](https://zh-hans.react.dev/reference/react/forwardRef)

写一个自定义组件

```jsx
// src/components/Ref/CustomInput.js
import React, {useRef, forwardRef} from 'react';
import {View, TextInput} from 'react-native';

export default forwardRef(function CustomInput(props, ref) {

  return (
    <View>
      <TextInput placeholder="请输入" ref={ref}></TextInput>
    </View>
  );
});
```

父组件中使用

```jsx
// app.tsx
import React, {useRef} from 'react';

function App(): React.JSX.Element {
  const inputRef = useRef(null);
  const handleCustomInputFocus = () => {
    console.log('handleCustomInputFocus');
    inputRef.current?.focus();
  };
  return (
    <View>
      <Button title="聚焦" onPress={handleCustomInputFocus} />
      <CustomInput ref={inputRef} />
    </View>
  )
}
export default App;
```

这样可以观察到：

点击按钮时候，触发组件的聚焦事件（键盘弹起）

## 03: 案例2：函数式组件对外暴露实例

### 函数式组件实现方式



> 使用 useImperativeHandle 暴露外部 API 供调用

```jsx
// src/components/Ref/CustomInput2.js
import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {View, TextInput} from 'react-native';

export default forwardRef(function CustomInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        selfFocus: () => {
          console.log('selfFocus');
          inputRef.current.focus();
        },
        selfBlur: () => {
          console.log('selfBlur');
          inputRef.current.blur();
        },
      };
    },
    [],
  );

  return (
    <View>
      <TextInput placeholder="请输入2" ref={inputRef}></TextInput>
    </View>
  );
});
```

外部组件使用

```jsx
// App.jsx

import React, {useRef} from 'react';
import CustomInput2 from './src/components/Ref/CustomInput2';

function App(): React.JSX.Element {
  
  const inputRef = useRef(null);
  
 	return (
    <View>
        <Button
          title="聚焦"
          onPress={() => {
            console.log(inputRef.current.selfFocus);
            if (inputRef.current && inputRef.current.selfFocus) {
              inputRef.current.selfFocus();
            }
          }}
        />
        <Button
          title="失焦"
          onPress={() => {
            if (inputRef.current) {
              inputRef.current.selfBlur();
            }
          }}
        />
        <CustomInput2 ref={inputRef} />
    </View>
  )
}
export default App;
```

这样我们通过点击时候获取根组件节点，然后触发其中通过 `useImperativeHandle` 暴露的 API 来调用实现功能，也是可以的

### class 组件实现方式

```jsx
// 使用 class 方式，改造以上组件
// src/components/Ref/CustomInput2Class.js
import React from 'react';
import {View, TextInput} from 'react-native';

export default class CustomInputClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  inputRef = React.createRef(null);

  selfFocus() {
    console.log('selfFocus');
    this.inputRef.current.focus();
  }

  selfBlur() {
    console.log('selfBlur');
    this.inputRef.current.blur();
  }

  render() {
    return (
      <View>
        <TextInput placeholder="请输入2" ref={this.inputRef}></TextInput>
      </View>
    );
  }
}
```

组件中进行使用

```jsx
import React, {useRef} from 'react';
import CustomInput2Class from './src/components/Ref/CustomInput2Class';

function App(): React.JSX.Element {
  
  const inputRef = useRef(null);
  
 	return (
    <View>
        <Button
          title="聚焦"
          onPress={() => {
            console.log(inputRef.current.selfFocus);
            if (inputRef.current && inputRef.current.selfFocus) {
              inputRef.current.selfFocus();
            }
          }}
        />
        <Button
          title="失焦"
          onPress={() => {
            if (inputRef.current) {
              inputRef.current.selfBlur();
            }
          }}
        />
        <CustomInput2Class ref={inputRef} />
    </View>
  )
}
export default App;
```

运行后，我们进行点击可以看到一样的聚焦、失焦的效果（键盘弹起，收起）