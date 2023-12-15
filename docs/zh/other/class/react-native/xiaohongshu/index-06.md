# 06-全面掌握系统组件的使用方法以及各种属性的应用场景

## 01-详解系统组件用法

* `View`: UI 构建的基石，一切页面的起点
* `Text`：使用占比最高的组件，使用简单，深入复杂
* `Image`：精美的UI从使用图片开始
* `ImageBackground`：View和Image 的合体
* `TextInput`：唯一且强大的输入组件
* `TouchableOpacity`：最好用的点击组件
* `TouchableHighlight`：稍显麻烦但是效果丰富的点击组件
* `TouchableWithoutFeedback`：使用很少的点击组件
* `Button`：固定样式的点击按钮组件，优点是使用简单
* 强大的 `Pressable`, 帮你实现复杂的交互效果（新）
* `ScrollView`：基础滚动组件，快速实现列表渲染
* `FlatList`：一个高性能的列表组件
* `SectionList`：强中之强，多类型分组列表
* `RefreshControl`: 下拉刷新，上拉加载
* `Modal`：实现不同样式的弹窗
* `StatusBar`: 状态栏适配的难题交给我
* `Switch`：开关切换，一键搞定
* 作业：个人信息页练习

## 02-View: UI 构建的基石，一切页面的起点

* `flexDirection`: 横向纵向布局
* `flexGrow` 和 `flex` 的区别
* 尺寸属性传百分比和数值
* `position`: `absolute` 绝对定位下仍然受父级属性的影响
* `onLayout`: 布局信息的回调
* `setNativeProps`: 性能瓶颈下的选择余地

## 03-Text：使用占比最高的组件

* 字体属性: `fontSize`、`fontFamily`、`fontWeight`
* 行数以及修饰模式：`numberOfLines`、`ellipsizeMode`
* 是否可选中以及选中颜色：`selectable`、`selectionColor`
* 点击和长按：`onPress`、`onLongPress`
* 跟随系统字号：`allowFontScaling`
* 文字嵌套以及注意事项：嵌套时候部分样式不生效，比如 `marginLeft`等
* 文本对齐：`textAlign`、`textAlignVertical`
* 文本装饰：`textDecorationStyle`、`textDecorationLine`
* 文字阴影：`textShadowColor`、`textShadowOffset`、`textShadowRadius`一起使用

## 04：Image：精美的UI从使用图片开始

* 图片源的两种类型：`source`
* 缩放模式：`resizeMode`
* `blurRadius`: 曾经的难题现在如此简单
* 占位图片：`defaultSource`
* 渐入动画时间：`fadeDuration`
* 加载成功和加载失败：`onLoad`、`onError`
* 加载开始与加载结束：`onLoadStart`、`onLoadEnd`
* 着色：`tintColor`
* api: `Image.getSize()`、`Image.prefetch()`

## 05：ImageBackground-View和Image的结合

## 06：TextInput：唯一且强大的输入组件

* 字体样式：与 `Text` 一致
* 自动聚焦：`autoFocus`: 布尔值 和 focus()
* 自动失焦：`blurOnSubmit`: 布尔值 和 blur()
* 隐藏光标：`caretHidden`
* 默认值：`defaultValue`
* 可编辑性：`editable`
* 键盘类型：`keyboardType`
  * `default`
  * `number-pad`
  * `decimal-pad`
  * `numeric`
  * `email-address`
  * `phone-pad`
* 确定键配置：`returnKeyType`
  * `done`
  * `go`
  * `next`
  * `search`
  * `send`
* 最大长度：`maxLength`
* 多行输入：`multiline` 和 `numberOfLines`
* 焦点回调：`onBlur` 和 `onFocus`
* 内容回调：`onChange` 和 `onChangeText`
* 选中相关：`selection`、`selectionColor`、`selectTextOnFocus`
* 对齐方式：`textAlign` 和 `textAlignVertical`
* 安全模式：`secureTextEntry`(),输入后前面输入的变为… 
  * 注意：不能和 `multiline` 同时使用

## 07：TouchableOpacity 最好用的点击组件

* 透明度渐变阈值：`activeOpacity`
* 点击事件：onPress、onLongPress、delayLongPress
* 点击事件起止：onPressIn、onPressout

```jsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#F0F0F0',
  },
  button: {
    width: 300,
    height: 65,
    backgroundColor: '#2030FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default function TouchableOpacityDemo(props) {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.button}
        onPress={() => {
          console.log('onPress');
        }}
        onLongPress={() => {
          console.log('onLongPress');
        }}
        delayLongPress={1000}
        onPressIn={() => {
          console.log('onPressIn');
        }}
        onPressOut={() => {
          console.log('onPressOut');
        }}>
        <Text style={styles.txt}>点击我</Text>
      </TouchableOpacity>
    </View>
  );
}
```

点击后执行顺序如下

```txt
onPressIn
onPressOut
onPress
```

长按后执行顺序如下

```txt
onPressIn
onLongPress
onPressOut
```

## 08: TouchableHighlight 使用略显麻烦的点击组件

> 用的不过，使用略显麻烦

* 所有点击类事件和 TouchableOpacity 相同
* 只支持一个子节点，且必须有一个子节点
* 使用陷阱：必须复写 onPress
* underlayColor: 指定点击时高亮的颜色

```jsx
import React from 'react';
import {View, TouchableHighlight, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#F0F0F0',
  },
  button: {
    width: 300,
    height: 65,
    backgroundColor: '#2030FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default function TouchableOpacityDemo(props) {
  return (
    <View style={styles.root}>
      <TouchableHighlight
        activeOpacity={0.4}
        style={styles.button}
				underlayColor="#00bcd4" // 指定点击时，高亮的颜色
        onPress={() => {
          console.log('onPress');
        }}
        onLongPress={() => {
          console.log('onLongPress');
        }}
        delayLongPress={1000}
        onPressIn={() => {
          console.log('onPressIn');
        }}
        onPressOut={() => {
          console.log('onPressOut');
        }}>
        <Text style={styles.txt}>点击我</Text>
      </TouchableHighlight>
    </View>
  );
}
```

点击后日志如下

```txt
onPressIn
onPressOut
onPress
```

## 09：TouchableWithoutFeedback 几乎不用的

> 官方文档：除非你有一个很好的理由 ，否则不要使用这个组件。所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈
>
> 只支持一个子节点，且自身不支持样式

```jsx
import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#F0F0F0',
  },
  button: {
    width: 300,
    height: 65,
    backgroundColor: '#2030FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default function TouchableOpacityDemo(props) {
  return (
    <View style={styles.root}>
      <TouchableWithoutFeedback>
        <View style={styles.button}>
          <Text style={styles.txt}>点击我</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
```

