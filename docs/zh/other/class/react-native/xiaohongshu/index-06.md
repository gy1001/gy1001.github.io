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
