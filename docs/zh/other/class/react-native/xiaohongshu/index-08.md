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

## 03：六种支持动画的组件

### Animated.Image

### Animated.ScrollView

### Animated.Text

### Animated.View

### Animated.FlatList

### Animated.SectionList

## 04: 平移动画的多种属性支持

* marginLeft、marginRight、marginTop、marginBottom
* translateX、translateY
* top、right、bottom、left

## 05：Animated.decay衰减动画函数

### 三大动画函数

* Anmiated.decay(): 衰减动画函数
* Animated.spring(): 弹性动画函数
* Animated.timing(): 时间动画函数

### Anmiated.decay(): 衰减动画函数

* veloctiy: 初始速度
* deceleration: 衰减系数

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
    Animated.decay(marginLeft, {
      velocity: 1,
      deceleration: 0.997, // 减速系数，系数越大，速度变化越小，最后接近静止
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

## 06: Animated.spring 弹性动画函数

* toValue: 目标值

* ### 弹性配置：三组配置

  * bounciness、speed、
  * tension、friction
  * stiffness、damping、mass

弹性模型配置参数(第一组)

* bounciness(弹性)：控制弹性，越大越弹，默认值 8
* speed(速度)：控制弹的速度，默认值 12

弹性模型配置参数(第二组)

* tension（张力）：控制速度，越大速度越快，默认值 40
* friction（摩擦）：控制弹性与过冲，越小越弹，默认值 7

弹性模型配置参数(第三组)

* stiffness(刚度)：弹簧刚度系数，越大越弹，默认为100
* damping（阻尼）：弹簧运动因摩擦力而受到阻尼，越小越弹，默认值为10
* mass（质量）：附着在弹簧末端的物体的质量，越大惯性越大，动画越难停下，越小惯性越小，动画很快停下，默认值为1

对应三种物理模型

### 其他弹性系数

* velocity(速度): 附着在弹簧上物体的初始速度，默认值为0
* overshootClamping(过冲)：弹簧是否应该夹紧而不应该弹跳，默认值为false
* restDisplacementThreshold(恢复位移阈值)：从静止状态开始的位移阈值，低于该阈值，弹簧应该被视为静止状态，默认值为0.001
* restSpeedthreshold(弹簧静止速度)，单位为像素/秒，默认值为 0.001
* delay(延迟)：延迟后启动动画，默认值为 0

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
    Animated.spring(marginLeft, {
      toValue: 200,
      useNativeDriver: false,
      // 第一组配置
      // bounciness: 10,
      // speed: 28,
      // 第二组配置
      // tension: 10,
      // friction: 5,
      // 第三组配置
      stiffness: 20,
      damping: 40,
      mass: 10,
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

## 07: Animated.timing 时间动画函数

* easing: 时间动画函数

### 四种内置动画

* Easing.back(3), 回拉幅度
* Easing.bounce：弹跳
* Easing.ease：平缓
* Easing.elastic(3)：弹性（弹跳次数）

### 三种标准函数：

* Easing.linear： 一次方函数
* Easing.quad：二次方函数
* Easing.cubic：三次方函数

### 四种补充函数

* Easing.bezier(0,0,1,1):贝塞尔曲线
* Easing.circle：环形
* Easing.sin：正弦
* Easing.exp：指数

```jsx
import React, {useRef} from 'react';
import {Button, View, StyleSheet, Animated, Easing} from 'react-native';

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
      useNativeDriver: false,
      // easing: Easing.elastic(3),
      // easing: Easing.cubic,
      easing: Easing.exp,
      // easing: Easing.sin,
      // easing: Easing.bezier(0.25, 0.1, 0.25, 1),
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

### 自由组合函数

* Easing.in(Easing.bounce): 加速 + 弹跳
* Easing.out(Easing.exp): 减速 + 指数
* Easing.inOut(Easing.elastic(1)): 加减速 + 弹性

### 所有组合函数效果

* [https://easings.net/#](https://easings.net/#)

## 08: Animated.ValueXY 矢量动画

* 矢量属性：ValueXY

```jsx
import React, {useRef} from 'react';
import {Button, View, StyleSheet, Animated, Easing} from 'react-native';

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
  const vector = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  ).current;
  const onPress = () => {
    Animated.timing(vector, {
      toValue: {
        x: 300,
        y: 400,
      },
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Button title="按钮" onPress={onPress} />
      {/* Animated.View 在布局上就可以当做 View */}
      <Animated.View
        style={[styles.view1, {marginLeft: vector.x, marginTop: vector.y}]}
      />
    </View>
  );
}
```

## 09: 四种组合动画

* Animated.parallel(): 并发
* Animated.sequence(): 序列
* Animated.stagger(): 有序/交错
* Animated.delay(): 延迟

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
  const marginTop = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const onPress = () => {
    const moveX = Animated.timing(marginLeft, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    });
    const moveY = Animated.timing(marginTop, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    });
    const scaleAnim = Animated.timing(scale, {
      toValue: 1.5,
      duration: 500,
      useNativeDriver: false,
    });
    // 并发
    // Animated.parallel([moveX, moveY, scaleAnim]).start();
    // 序列
    // Animated.sequence([moveX, moveY, scaleAnim]).start();
    // 间隔
    // Animated.stagger(1500, [moveX, moveY, scaleAnim]).start();
    // 延迟
    Animated.sequence([
      moveX,
      Animated.delay(1000),
      moveY,
      Animated.delay(1000),
      scaleAnim,
    ]).start();
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
              {scale: scale},
              {translateY: marginTop},
              {translateX: marginLeft},
            ],
          },
        ]}
      />
    </View>
  );
}
```

## 10: 跟随动画延迟难题



