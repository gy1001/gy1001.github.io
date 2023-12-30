# 08-【夯实基础-RN动画系统】全面掌握RN动画所有技巧

## 01: 简单示例学习基础动画方法

* 演示一个简单的平移动画效果
* 使用 Animated.View、Animated.Value、UseRef

```jsx
import React, {useRef} from 'react';
import {Button, View, StyleSheet, Animated} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  view1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginTop: 10,
  },
});

export default function Anim1Demo() {
  const marginLeft = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    Animated.timing(marginLeft, {
      toValue: 200,
      duration: 1000,
      // 是否启用原生驱动
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Button title="按钮" onPress={onPress} />
      {/* Animated.View 在布局上就可以当做 View */}
      <Animated.View style={[styles.view1, {marginLeft: marginLeft}]} />
    </View>
  );
}
```

## 02: 四大动画类型

### 平移

上节已经讲过了

### 旋转

```jsx
import React, {useRef} from 'react';
import {Button, View, StyleSheet, Animated} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  view1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginTop: 10,
  },
});

export default function Anim1Demo() {
  const rotate = useRef(new Animated.Value(0)).current;
  const rotateValue = rotate.interpolate({
    inputRange: [0, 30],
    outputRange: ['0deg', '30deg'],
  });
  const onPress = () => {
    Animated.timing(rotate, {
      toValue: 30,
      duration: 1000,
      // 是否启用原生驱动
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Button title="按钮" onPress={onPress} />
      {/* Animated.View 在布局上就可以当做 View */}
      <Animated.View
        style={[styles.view1, {transform: [{rotate: rotateValue}]}]}
      />
    </View>
  );
}

```

### 缩放

```jsx
import React, {useRef} from 'react';
import {Button, View, StyleSheet, Animated} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  view1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginTop: 100,
  },
});

export default function Anim1Demo() {
  const scale = useRef(new Animated.Value(1)).current;

  const onPress = () => {
    Animated.timing(scale, {
      toValue: 2.5,
      duration: 1000,
      // 是否启用原生驱动
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(scale, {
        toValue: 0.5,
        duration: 1000,
        // 是否启用原生驱动
        useNativeDriver: false,
      }).start();
    }, 3000);
  };

  return (
    <View style={styles.root}>
      <Button title="按钮" onPress={onPress} />
      {/* Animated.View 在布局上就可以当做 View */}
      <Animated.View
        style={[
          styles.view1,
          {
            transform: [
              {
                scale: scale,
              },
            ],
          },
        ]}
      />
    </View>
  );
}

```

### 渐变

```jsx
import React, {useRef} from 'react';
import {Button, View, StyleSheet, Animated} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  view1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginTop: 10,
  },
});

export default function Anim1Demo() {
  const opacity = useRef(new Animated.Value(1)).current;
  const onPress = () => {
    Animated.timing(opacity, {
      toValue: 0.1,
      duration: 1000,
      // 是否启用原生驱动
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Button title="按钮" onPress={onPress} />
      {/* Animated.View 在布局上就可以当做 View */}
      <Animated.View style={[styles.view1, {opacity: opacity}]} />
    </View>
  );
}
```

