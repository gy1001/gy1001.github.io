# 07-【夯实基础-常用 API】深刻理解 RN 核心 API 的功能

## 01：常用 API 精讲

* Alert/console: 开发周期的调试工具
* Dimensions/useWindowDeimensions: 适配屏幕高度
* Platform: 轻松获取平台属性
* StyleSheet: 灵活构建样式表
* Linking: 一个 api 帮你省掉 50行代码
* PixelRatio: 像素比例工具
* BackHandler: 针对安卓返回键的适配不再是难题
* PermissionAndroid: 一个 API 帮你解决解决原生动态权限问题
* vibration: 简单好用的震动交互
* ToastAndroid: 安卓平台的提示
* transform: 矩阵变换的伪 3D 效果
* keyboard: 操作键盘有神器

## 02: Alert/console: 开发周期的调试工具

* alert(): 简单的弹框提示
* 区别 Alert.alert(), 这个是 RN 的对话框工具
* console.log
* console 日志输出分级
* console.log 字符串模板和占位符两种方式：%o-对象、%s-字符串、%d-数字
* console.log 添加样式：%c颜色和字号
  * color: orange
  * font-size: x-large、x-medium、x-small
* console.table 输出组件树
* console.group 输出分组日志

```jsx
import React from 'react';
import {Button, Text, View, Alert} from 'react-native';

export default function TestApiDemo() {
  return (
    <View>
      <Button
        title="按钮1"
        onPress={() => {
          console.log('点击了');
          console.info('日志输出');
          console.debug('调试日志输出');
          console.warn('警告日志输出');
          console.error('错误日志输出');
          // alert('这是一条提示信息');
          const buttons = [
            {
              text: '取消',
              onPress: () => {
                console.log('点击了取消');
              },
            },
            {
              text: '确定',
              onPress: () => {
                console.log('点击了确定');
              },
            },
          ];
          Alert.alert('我是标题', '我是内容', buttons);
        }}
      />
      <Button
        onPress={() => {
          const name = '猪八戒';
          console.log('猪的祖先%s', name);
          console.log('我是个人开发者,我学习%d年了', 1);
          const nameObj = {
            name: '猪八戒',
            age: 100,
          };
          console.log('我是一个对象：%o', nameObj);
          // 终端不能生效，在浏览器控制台可以
          console.log(
            '%c这行日志红色文字，字好大%c',
            'color:red;font-size:x-large',
          );
          console.log(
            '%c这行日志蓝色文字，字号中等%c',
            'color:blue;font-size:x-medium',
          );
          console.log(
            '%c这行日志绿色蚊子，字号小号%c',
            'color:green;font-size:x-small',
          );
          const viewLayout = (
            <View style={{flexDirection: 'column'}}>
              <Text> 我是标题</Text>
            </View>
          );
          // 组件状态也许是从后台获取的，然后数据不固定，这时候打印就比较清晰看到
          console.log(viewLayout);

          // 在浏览器中可以看出来效果，终端没有
          const users = [
            {name: '张三', age: 10},
            {name: '李四', age: 30},
          ];
          console.table(users);
          console.group();
          console.log('我是分组中的第一行');
          console.log('我是分组中的第二行');
          console.log('我是分组中的第三行');
          console.group();
          console.log('我是二级分组中的第一行');
          console.log('我是二级分组中的第二行');
          console.log('我是二级分组中的第三行');
          console.groupEnd();
          console.log('end');
        }}
        title="按钮2"
      />
    </View>
  );
}
```

## 03: Dimension 和 useWindowDimension 获取屏幕信息

* 获取屏幕宽高的两种方式
* 获取缩放 scale、文字缩放 fontScale
* Dimension.get 传递 screen 和 window 的区别

```jsx
import React, {useEffect} from 'react';
import {
  Button,
  Text,
  View,
  Alert,
  useWindowDimensions,
  Dimensions,
} from 'react-native';

export default function TestApiDemo() {
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  console.log('screenWidth', screenWidth, screenHeight);

  const {width, height, scale, fontScale} = Dimensions.get('window');
  console.log('width', width, height, scale, fontScale);
  // screen 会加上状态栏的高度,如果是通栏的,通过 window 和 screen 获得的 宽高度是一致的
  const {width: windowScreenWidth, height: windowScreenHeight} =
    Dimensions.get('screen');
  console.log('windowScreenWidth', windowScreenWidth, windowScreenHeight);

  useEffect(() => {
    // 比如某些安卓手机底部导航键是可以进行设置收起的，类似场景就会触发
    const subscription = Dimensions.addEventListener(
      'change',
      (window, screen) => {
        console.log('window', window, screen);
      },
    );

    return subscription.remove();
  }, []);

  const onPress = () => {
    Alert.alert('我是标题', '我是内容', buttons);
  };
  return (
    <View>
      <Button title="按钮1" onPress={onPress} />
    </View>
  );
}
```

## 04: PlatForm 获取平台属性

* 平台属性：OS、Version、constants
* 判断：isPad、isTv
* 平台选择：Platform.select()

```jsx
import React, {useEffect} from 'react';
import {
  View,
  Platform,
  StyleSheet,
} from 'react-native';

export default function TestApiDemo() {
  console.log(Platform.OS === 'android');
  console.log(Platform.OS === 'ios');
  console.log(Platform.Version); // 安卓 SDK 的版本号
  console.log(Platform.constants); // 品牌、型号、系统、SDK版本等
  console.log(Platform.isPad); // 针对 ios 判断的
  console.log(Platform.isTV);
  const style = Platform.select({
    ios: {
      marginTop: 200,
    },
    android: {
      marginTop: 150,
    },
    default: {
      marginTop: 100,
    },
  });
  console.log(style); // 安卓端就会打印出来 {"marginTop": 150}
  // 实际应用
  const styles = StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
      paddingTop: Platform.select({
        ios: 200,
        android: 150,
        default: 100,
      }),
      ...Platform.select({
        ios: {
          marginTop: 20,
        },
        android: {
          marginTop: 10,
        },
        default: {
          marginTop: 15,
        },
      }),
    },
  });
 
  return (
    <View style={styles.root}>
      <Button title="按钮1" />
    </View>
  );
}

```

