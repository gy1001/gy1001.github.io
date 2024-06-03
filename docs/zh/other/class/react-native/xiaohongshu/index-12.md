# 12-【进阶学习-HOC高阶组件】掌握高阶组件强大的解耦和封装

## 01: HOC高阶组件介绍

### 什么是高阶函数？

> 如果一个函数接受的参数是函数，或者返回值是一个新函数，那么该函数就是高阶函数

```javascript
setTimeout(() => {}, 1000)

array.filter((item, index) => item === target)

Promise
```

### 什么是高阶组件？

> 如果一个组件的参数是组件，返回值是一个新组件，那么该组件就是高阶组件

```js
export const withHocView = (OriginView) => {
  return (prps) => {
    return (
      <>
      	<OriginView ...props />
      	<View> ... </View>
      </>
    )
  }
}
```

### 高阶组件应用场景：解决了什么问题

使用 HOC 高阶组件解决横切关注点问题，使得组件功能更加单一，组件逻辑服务组件UI，从而降低耦合性，增加组件的复用性

## 02: HOC 高阶组件案例演示

高阶组件函数（为各个组件添加一个右侧加号图标）

```jsx
// components/HOC/withAddIcon
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AddIcon from '../../assets/images/icon_add.png';

const styles = StyleSheet.create({
  addIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    // position: 'fixed',
    bottom: 50,
    right: 30,
  },
});

export default function AddButton(OriginComponent) {
  const handleClick = onAdd => {
    onAdd && onAdd();
  };
  return props => (
    <View>
      <OriginComponent></OriginComponent>
      <TouchableOpacity onPress={() => handleClick(props.onAdd)}>
        <Image style={styles.addIcon} source={AddIcon}></Image>
      </TouchableOpacity>
    </View>
  );
}
```

使用

```jsx
// app.tsx
import RootView from './src/components/RootView';
import WithAddIcon from './src/components/HOC/withAddIcon';

export default () => {
  const WithAddIconHoc = WithAddIcon(RootView);
  const handleClickAddIcon = () => {
    console.log('click add icon'); // 点击 add 图标时候，会触发这里的回调函数
  };
  return (
     <WithAddIconHoc onAdd={handleClickAddIcon} />
  )
}
```

## 03： 高阶组件使用思考

* 不要改变原始组件的原型
* 必要的话，可以传递多个参数
