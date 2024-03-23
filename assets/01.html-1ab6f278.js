import{_ as n,M as a,p as d,q as o,R as e,t as r,N as t,a1 as i}from"./framework-e8cb8151.js";const s={},c=i(`<h1 id="从-0-到-1-开发一款-ios-app-01" tabindex="-1"><a class="header-anchor" href="#从-0-到-1-开发一款-ios-app-01" aria-hidden="true">#</a> 从 0 到 1 开发一款 iOS App - 01</h1><h2 id="_01-创建第一个-xcode-工程" tabindex="-1"><a class="header-anchor" href="#_01-创建第一个-xcode-工程" aria-hidden="true">#</a> 01. 创建第一个 XCode 工程</h2><ol><li>打开 xcode 软件，选择新建项目，选择 APP 栏目，输入适当的项目信息，然后可以看到初始化后的一个项目</li><li>修改<code>ViewController.m</code>文件，添加如下内容</li></ol><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>// 创建一个简单的 hello world
- (void)viewDidLoad {
  [super viewDidLoad];
  [self.view addSubview:({
    UILabel *label = [[UILabel alloc] init];
    label.text = @&quot;hello world&quot;;
    [label sizeToFit];
    label.center = CGPointMake(self.view.frame.size.width/2, self.view.frame.size.height/2);
    label;
  })];
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>运行模拟机，你就会看到一个显示<code>hello world</code>的界面</li></ol><h2 id="_02-创建多个uiview" tabindex="-1"><a class="header-anchor" href="#_02-创建多个uiview" aria-hidden="true">#</a> 02. 创建多个<code>UIView</code></h2><blockquote><p>上一节我们看到一个显示 hello world 的界面，这节我们创建两个 UIView，并注意创建顺序和层级的关系</p></blockquote><ol><li>修改<code>ViewController.m</code> 中 <code>hello world</code> 的<code>UILable</code>界面内容，内容如下</li></ol><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)viewDidLoad {
    [super viewDidLoad];
    // 创建两个子view
    UIView *view = [[UIView alloc] init];
    view.backgroundColor = [UIColor redColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    [self.view addSubview:view];

    UIView *view2 = [[UIView alloc] init];
    view2.backgroundColor = [UIColor greenColor];
    view2.frame = CGRectMake(150, 150, 100, 100);
    [self.view addSubview:view2];
}

@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>运行模拟机后，可以看到两个方块，一个红色一个绿色，并且两个元素有重叠部分，且<code>后创建的元素在上面</code></p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/132600fea9554117a225c14192e4c6ce~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ol><h2 id="_03-uiview-的生命周期" tabindex="-1"><a class="header-anchor" href="#_03-uiview-的生命周期" aria-hidden="true">#</a> 03. UIView 的生命周期</h2><ol><li><p>UIView 也有很多生命周期，我们创建一个子 TestView 继承 UIView，并再实现其各个生命周期。</p></li><li><p>创建一个 <code>view</code>继承<code>TestView</code>,并进行挂载。</p></li><li><p>在<code>view</code>的创建和挂载出，以及<code>TestView</code>的各个生命周期处添加断点，然后运行模拟机</p></li><li><p>内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;ViewController.h&quot;

@interface TestView: UIView
@end

@implementation TestView
-(instancetype )init{
    self = [super init];
    return self;
}
- (void)willMoveToSuperview:(nullable UIView *)newSuperview{
    [super willMoveToSuperview:newSuperview]; // 此处 打断点 ，序号为 3
}
- (void)didMoveToSuperview{
    [super didMoveToSuperview];// 此处 打断点 ，序号为 4
}
- (void)willMoveToWindow:(nullable UIWindow *)newWindow{
    [super willMoveToWindow: newWindow];// 此处 打断点 ，序号为 5
}
- (void)didMoveToWindow{
    [super didMoveToWindow];// 此处 打断点 ，序号为 6
}
@end

@interface ViewController()
@end

@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    UIView *view = [[TestView alloc] init]; // 此处 打断点 ，序号为 1
    view.backgroundColor = [UIColor redColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    [self.view addSubview:view]; // 此处 打断点 ，序号为 2
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>运行模拟机可以，可以看到执行顺序：<code>序号1(创建)</code>=&gt;<code>序号2（挂载 addSubview）</code>=&gt;<code>序号3（willMoveToSuperview）</code>=&gt;<code>序号4（didMoveToSuperview）</code>=&gt;<code>序号5（willMoveToWindow）</code>=&gt;<code>序号6（didMoveToWindow）</code></li></ol></li></ol><h2 id="_04-uiviewcontroller" tabindex="-1"><a class="header-anchor" href="#_04-uiviewcontroller" aria-hidden="true">#</a> 04. UIViewController</h2><h3 id="_1-视图控制器-管理视图-view-层级结构" tabindex="-1"><a class="header-anchor" href="#_1-视图控制器-管理视图-view-层级结构" aria-hidden="true">#</a> 1. 视图控制器，管理视图 View 层级结构</h3><ol><li>自身包含 View,可以理解为一个容器</li></ol><ul><li>管理 View 视图的生命周期</li><li>响应用户操作</li><li>和 App 整体交互，视图的切换</li><li>作为一个 container 管理多个 Controller 和动画</li></ul><ol start="2"><li>ViewController 的生命周期</li></ol><ul><li>init</li><li>viewDidLoad</li><li>viewWillAppear</li><li>viewDidAppear</li><li>viewWillDisappear</li><li>viewDidDisappear</li><li>Dealloc</li></ul><p>选择合适的函数处理不同的业务</p><h3 id="_2-代码示范" tabindex="-1"><a class="header-anchor" href="#_2-代码示范" aria-hidden="true">#</a> 2. 代码示范</h3><ol><li><p>修改<code>ViewController.h</code>，内容修改如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;ViewController.h&quot;

@interface TestView: UIView
@end

@implementation TestView
-(instancetype )init{
    self = [super init];
    return self;
}
@end

@interface ViewController()
@end

@implementation ViewController

-(instancetype ) init{
    self = [super init];
    return self;
}
- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated]; // 这里打断点，序号3
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];// 这里打断点，序号4
}
// 这里的生命周期在页面消失后才会触发，这里是单页面，无法演示，后续再讲解
- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
}
- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
}
- (void)viewDidLoad {
    [super viewDidLoad];

    TestView *view = [[TestView alloc] init]; // 这里打断点，序号1
    view.backgroundColor = [UIColor redColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    [self.view addSubview:view];// 这里打断点，序号2
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>打完断点后，运行模拟器，可以看到执行顺序：<code>序号1（创建）</code>=&gt;<code>序号2（挂载）</code>=&gt;<code>序号3（viewWillAppear）</code>=&gt;<code>序号4（viewDidAppear）</code></p></li><li><p>注意：<code>viewWillAppear</code>时候页面中元素还没有展示出来，展示完成后才触发的<code>viewDidAppear</code></p></li></ol><h2 id="_05-实现你的第一个-tabbar-页面" tabindex="-1"><a class="header-anchor" href="#_05-实现你的第一个-tabbar-页面" aria-hidden="true">#</a> 05. 实现你的第一个 TabBar 页面</h2><h3 id="_1-通过-uiview-和-uiviewcontroller-的特性搭建-app" tabindex="-1"><a class="header-anchor" href="#_1-通过-uiview-和-uiviewcontroller-的特性搭建-app" aria-hidden="true">#</a> 1. 通过 UIView 和 UIViewController 的特性搭建 App</h3><ul><li>UIView 负责页面内的内容呈现</li><li>使用基础的 UIViewController 管理多个 UIView</li><li>UIViewController 在管理 UIView 的同时，负责不同的切换</li></ul><h3 id="_2-常用-app-页面结构分析" tabindex="-1"><a class="header-anchor" href="#_2-常用-app-页面结构分析" aria-hidden="true">#</a> 2. 常用 App 页面结构分析</h3><h4 id="_1-单页面展示" tabindex="-1"><a class="header-anchor" href="#_1-单页面展示" aria-hidden="true">#</a> 1. 单页面展示</h4><ul><li>通过列表展示简介</li><li>通过较长滚动页面展示内容</li></ul><h4 id="_2-多页面管理" tabindex="-1"><a class="header-anchor" href="#_2-多页面管理" aria-hidden="true">#</a> 2. 多页面管理</h4><ul><li>4 个或者 5 个底部按钮：<code>UITabBarController</code></li><li>通过 Push 的方式进行页面切换</li></ul><h4 id="_3-uitabbarcontroller" tabindex="-1"><a class="header-anchor" href="#_3-uitabbarcontroller" aria-hidden="true">#</a> 3. UITabBarController</h4><blockquote><p>UITabBarController 功能就是管理多个 ViewController 切换，通过点击底部对应按钮，选中对应需要展示的 ViewController.</p><p>国内 App 一般展示 4-5 个可选项</p></blockquote><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f99fc7f29f64cd6b87c30b4b2ced060~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="_4-uitabbar" tabindex="-1"><a class="header-anchor" href="#_4-uitabbar" aria-hidden="true">#</a> 4. UITabBar</h4><blockquote><p>可以包含 多个 UITabBarButton, UITabBarButton 又可以包含 tabBarItem.image、tabBarItem.title</p></blockquote><ul><li>按照加入 TabbarController 的顺序展示</li><li>展示的内容有对应的 ViewController 设置</li><li>系统负责点击的响应和切换</li></ul><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/779767e5f2834fd0b90cd5ff870ad388~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h3 id="_3-实现自己的-tabbar" tabindex="-1"><a class="header-anchor" href="#_3-实现自己的-tabbar" aria-hidden="true">#</a> 3. 实现自己的 TabBar</h3><ul><li><p>使用系统函数实现</p></li><li><p>相关开源框架和项目</p><ul><li>开源 Tabbar/Tabbarcontroller 主要是做了简易的封装+5 个按钮的样式</li></ul><ol><li>完全自己实现</li><li>TabBar 上粘贴自定义的 SubView，响应事件调用系统方法</li></ol></li></ul><h3 id="_4-代码实现" tabindex="-1"><a class="header-anchor" href="#_4-代码实现" aria-hidden="true">#</a> 4. 代码实现</h3><ol><li><p><code>AppDelegate.m</code>中进行如下更改，更给<code>rootViewController</code>指向</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    UITabBarController *tabbarController = [[UITabBarController alloc] init];

    UIViewController *controller1 = [[UIViewController alloc] init];
    controller1.view.backgroundColor = [UIColor redColor];

    UIViewController *controller2 = [[UIViewController alloc] init];
    controller2.view.backgroundColor = [UIColor yellowColor];

    UIViewController *controller3 = [[UIViewController alloc] init];
    controller3.view.backgroundColor = [UIColor greenColor];

    UIViewController *controller4 = [[UIViewController alloc] init];
    controller4.view.backgroundColor = [UIColor lightGrayColor];

    [tabbarController setViewControllers:@[controller1,controller2,controller3,controller4]];

    self.window.rootViewController = tabbarController;
    [self.window makeKeyAndVisible];
    return YES;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行模拟机发现报错了，报错信息如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>terminating with uncaught exception of <span class="token builtin class-name">type</span> NSException
*** Terminating app due to uncaught exception <span class="token string">&#39;NSInvalidArgumentException&#39;</span>, reason: <span class="token string">&#39;-[AppDelegate setWindow:]: unrecognized selector sent to instance 0x6000011d8280&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>解决办法</p><ul><li><p>删除<code>info.plist</code> 下的<code>Application scence Manifest</code></p></li><li><p>删除 <code>SceneDelegate（.h和.m）</code>文件</p></li><li><p>删除<code>AppDelegate.h</code>中的<code>SceneDelegate</code>回调方法,即如下代码（<s><strong>删掉删掉删掉删掉删掉删掉删掉</strong></s>）</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#pragma mark - UISceneSession lifecycle

- (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options{
  ....
}
- (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet&lt;UISceneSession *&gt; *)sceneSessions {
	...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>AppDelegate.h</code>里加声明<code>window</code>:</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@property (nonatomic, strong) UIWindow * window;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ol><h3 id="代码实现中报错参考文档" tabindex="-1"><a class="header-anchor" href="#代码实现中报错参考文档" aria-hidden="true">#</a> 代码实现中报错参考文档</h3>`,41),v={href:"https://www.jianshu.com/p/c30ff97996ce",target:"_blank",rel:"noopener noreferrer"},u=i(`<h3 id="_5-用新版本-xcode-实现-tabbar" tabindex="-1"><a class="header-anchor" href="#_5-用新版本-xcode-实现-tabbar" aria-hidden="true">#</a> 5. 用新版本 Xcode 实现 Tabbar</h3><blockquote><p>4 小节的方法可能涉及到诸多删除代码的问题，避免删错误，可以用如下方式</p></blockquote><h4 id="ios13-中-appdelegate-的职责发现了改变" tabindex="-1"><a class="header-anchor" href="#ios13-中-appdelegate-的职责发现了改变" aria-hidden="true">#</a> iOS13 中 appdelegate 的职责发现了改变：</h4><ul><li><p>iOS13 之前，Appdelegate 的职责全权处理 App 生命周期和 UI 生命周期；</p></li><li><p>iOS13 之后，Appdelegate 的职责是：</p></li><li><p>1、处理 App 生命周期</p></li><li><p>2、新的 Scene Session 生命周期， 那 UI 的生命周期交给新增的 Scene Delegate 处理</p></li><li><p>在 <code>SceneDelegate.m</code> 中添加如下代码</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
    // Use this method to optionally configure and attach the UIWindow \`window\` to the provided UIWindowScene \`scene\`.
    // If using a storyboard, the \`window\` property will automatically be initialized and attached to the scene.
    // This delegate does not imply the connecting scene or session are new (see \`application:configurationForConnectingSceneSession\` instead).
    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc] initWithWindowScene:windowScene];
    self.window.frame = windowScene.coordinateSpace.bounds;

    UITabBarController *tabbarController = [[UITabBarController alloc] init];

    UIViewController *controller1 = [[UIViewController alloc] init];
    controller1.view.backgroundColor = [UIColor redColor];
    controller1.tabBarItem.title = @&quot;新闻&quot;;

    UIViewController *controller2 = [[UIViewController alloc] init];
    controller2.view.backgroundColor = [UIColor yellowColor];
    controller2.tabBarItem.title = @&quot;视频&quot;;

    UIViewController *controller3 = [[UIViewController alloc] init];
    controller3.view.backgroundColor = [UIColor blueColor];
    controller3.tabBarItem.title = @&quot;推荐&quot;;

    UIViewController *controller4 = [[UIViewController alloc] init];
    controller4.view.backgroundColor = [UIColor greenColor];
    controller4.tabBarItem.title = @&quot;我的&quot;;

    // 将四个页面的 UIViewController 加入到 UITabBarController 之中
    [tabbarController setViewControllers: @[controller1, controller2, controller3, controller4]];

    self.window.rootViewController = tabbarController;
    [self.window makeKeyAndVisible];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重新模拟器，发现可以正常运行，显示四个导航</p></li><li><p>参考链接：https://time.geekbang.org/course/intro/100025901?tab=comment</p></li></ul><h2 id="_06-使用-uinavigationcontroller-管理页面" tabindex="-1"><a class="header-anchor" href="#_06-使用-uinavigationcontroller-管理页面" aria-hidden="true">#</a> 06. 使用 UINavigationController 管理页面</h2><h3 id="_1-uinavigationcontroller" tabindex="-1"><a class="header-anchor" href="#_1-uinavigationcontroller" aria-hidden="true">#</a> 1. UINavigationController</h3><h4 id="_1-相关功能" tabindex="-1"><a class="header-anchor" href="#_1-相关功能" aria-hidden="true">#</a> 1. 相关功能</h4><ul><li>通过栈管理页面间的跳转</li><li>通常只展示栈顶页面</li><li>Push/Pop 操作</li></ul><h4 id="_2-通过-uinavigationbar-响应操作-处理-uiviewcontroller-的切换" tabindex="-1"><a class="header-anchor" href="#_2-通过-uinavigationbar-响应操作-处理-uiviewcontroller-的切换" aria-hidden="true">#</a> 2. 通过 UINavigationBar 响应操作，处理 UIViewController 的切换</h4><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4800265617cc4890b21bb56f066f10ee~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="_3-uinavigationbar" tabindex="-1"><a class="header-anchor" href="#_3-uinavigationbar" aria-hidden="true">#</a> 3. UINavigationBar</h4><ul><li><p><code>UINavigationController</code>管理</p></li><li><p>顶部<code>UIViewController</code>变化，<code>UINavigationBar</code>则同步变化</p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0831288b8c4f4c2ba9318cf9ad25d2de~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ul><h4 id="_4-实现自己的navigation" tabindex="-1"><a class="header-anchor" href="#_4-实现自己的navigation" aria-hidden="true">#</a> 4. 实现自己的<code>Navigation</code></h4><ul><li><p>使用系统函数实现</p></li><li><p>相关开源框架和项目</p></li><li><p>开源<code>Navigation</code>相关都集中在过渡动画的样式上</p><ol><li>WRNavigationBar</li><li>KMNavigationBarTransition</li><li>RTRootNavigationController</li></ol><p>部分项目完全自定义实现 <code>NavigationController</code>,以实现特殊动画效果。</p></li></ul><h4 id="_5-代码实现" tabindex="-1"><a class="header-anchor" href="#_5-代码实现" aria-hidden="true">#</a> 5. 代码实现</h4><blockquote><p>注意：本章节是通过 05 小节中的最新版的实现 tabBar 方式来实现，即在<code>SceneDelegate.m</code>中设置 tabBar</p></blockquote><ol><li><p>上一节中我们实现底部四个 tabBar, 本节中我们设置第一个 tab 页面为<code>UINavigationController</code>, 并把<code>UINavigationController</code>的<code>initWithRootViewController</code>设置为我们最开始演示的一个<code>viewController</code>（红绿色方块的页面），代码如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>
#import &quot;ViewController.h&quot; // 此行添加

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {

    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc] initWithWindowScene:windowScene];
    self.window.frame = windowScene.coordinateSpace.bounds;
    UITabBarController *tabbarController = [[UITabBarController alloc] init];

  	// ------------------start:更改的部分----------------------------------------------------
    ViewController *viewController = [[ViewController alloc] init];
    UINavigationController * nagationController = [[UINavigationController alloc] initWithRootViewController:viewController];
    nagationController.view.backgroundColor = [UIColor whiteColor];
    nagationController.tabBarItem.title = @&quot;新闻&quot;;
    nagationController.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/page@2x.png&quot;];
    nagationController.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/page_selected@2x.png&quot;];

    // 以下部分删除
    //    UIViewController *controller1 = [[UIViewController alloc] init];
    //    controller1.view.backgroundColor = [UIColor redColor];
    //    controller1.tabBarItem.title = @&quot;新闻&quot;;
    //    controller1.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/page@2x.png&quot;];
  	//    controller1.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/page_selected@2x.png&quot;];
  	// ---------------------end-------------------------------------------------

   	[tabbarController setViewControllers:@[nagationController,controller2,controller3,controller4]];
  	// 其他保持不变
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>这里运行模拟器后，我们就可以看到页面中显示了的方块元素，证明页面挂载成功</p></li><li><p>接下来，我们实现 方块元素的点击跳转效果，<code>ViewController.m</code>文件中添加如下代码</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>
- (void)viewDidLoad {
    [super viewDidLoad];
    TestView *view = [[TestView alloc] init];
    view.backgroundColor = [UIColor systemGreenColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    [self.view addSubview:view];
    // 绑定点击事件
    UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(pushController)];
    [view addGestureRecognizer:tapGesture];
}
// 点击事件触发方法
-(void) pushController{
    UIViewController * viewController  = [[UIViewController alloc] init];
    viewController.view.backgroundColor = [UIColor whiteColor];
    viewController.navigationItem.title = @&quot;内容&quot;;
    viewController.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@&quot;右侧标题&quot; style:UIBarButtonItemStylePlain target:self action:nil];
    [self.navigationController pushViewController:viewController animated:YES];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_07-app-中的窗口" tabindex="-1"><a class="header-anchor" href="#_07-app-中的窗口" aria-hidden="true">#</a> 07. App 中的窗口</h2><table><thead><tr><th></th><th>UIBarButtonItem</th><th>UITabBar</th><th>UITabBarController</th></tr></thead><tbody><tr><td>MVC 中的角色</td><td>M</td><td>V</td><td>C</td></tr><tr><td></td><td>UITabBarItem</td><td>UINavigationBar</td><td>UINavigationController</td></tr></tbody></table><h3 id="_1-uiwindow" tabindex="-1"><a class="header-anchor" href="#_1-uiwindow" aria-hidden="true">#</a> 1. UIWindow</h3><ul><li><p>特殊形式的<code>UIView</code>, 提供 <code>App</code> 中展示内容的基础窗口</p></li><li><p>只作为容器，和 <code>ViewController</code> 一期协同工作</p></li><li><p>通常屏幕上只存在、展示一个<code>UIWindow</code></p></li><li><p>使用<code>storyborad</code>会帮我们自动创建</p></li><li><p>手动创建</p><ol><li><p>创建 <code>UIWindow</code></p></li><li><p>设置<code>rootViewController</code></p></li><li><p><code>makeKeyAndVisible</code></p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85086f5463f7463192599770d426cdf1~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" style="float:left;"></li></ol></li></ul><h3 id="_2-代码演示" tabindex="-1"><a class="header-anchor" href="#_2-代码演示" aria-hidden="true">#</a> 2. 代码演示</h3><ol><li><p>新建项目，修改<code>ViewController.m</code>的背景颜色，增加如下代码</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)viewDidLoad {
    [super viewDidLoad];
  	// 增加的代码
    UIView *view = [[UIView alloc] init];
    view.backgroundColor = [UIColor redColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    self.view.backgroundColor = [UIColor yellowColor];
    [self.view addSubview:view];
    UILabel *label = [[UILabel alloc] init];
    label.text = @&quot;hello world&quot;;
    [label sizeToFit];
    label.center = CGPointMake(self.view.frame.size.width/2, self.view.frame.size.height/2);
    [self.view addSubview:label];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行项目，可以看到正常运行，并且页面显示灰色背景</p></li><li><p>然后删除<code>Main.storyboard</code>和<code>LaunchScreen.storyboard</code>，并且删除<code>info.plist</code>下的<code>Storyboard Name</code>，删除项目<code>info</code>项目中的<code>Main storyboard file base name</code>以及<code>Application Scene Manifest</code>中的<code>Storyboard Name</code>选项</p></li><li><p>修改<code>SceneDelegate.m</code>中的代码，添加如下代码</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;ViewController.h&quot;

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc]initWithWindowScene:windowScene];
    self.window.frame = windowScene.coordinateSpace.bounds;

    ViewController *vc =[[ViewController alloc]init];
    self.window.rootViewController = vc;
    [self.window makeKeyAndVisible];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重新运行模拟器，就可以看到 App 重新启动了，并且显示的事 <code>ViewController.m</code>中的内容</p></li></ol><h3 id="_3-常用的启动窗口逻辑" tabindex="-1"><a class="header-anchor" href="#_3-常用的启动窗口逻辑" aria-hidden="true">#</a> 3. 常用的启动窗口逻辑</h3><blockquote><p>注意：查看下面两种滑动效果，以及差异</p></blockquote><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc8a8e7410ca432bbdfa533f2589767f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" style="display:inline;"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03660e69eaac4b46a476c82817a3198d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" style="display:inline;"><h3 id="_4-代码实现-01" tabindex="-1"><a class="header-anchor" href="#_4-代码实现-01" aria-hidden="true">#</a> 4. 代码实现-01</h3><p>我们目前的代码示例中实现的就是效果 1，点击进入新页面时，底部 tabbar 还是可以看到的，此处就不做演示了</p><h3 id="_5-代码实现-02" tabindex="-1"><a class="header-anchor" href="#_5-代码实现-02" aria-hidden="true">#</a> 5. 代码实现-02</h3><ol><li>修改<code>SceneDelegate.m</code>中的代码，修改代码如下</li></ol><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {

    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc] initWithWindowScene:windowScene];
    self.window.frame = windowScene.coordinateSpace.bounds;

    UITabBarController *tabbarController = [[UITabBarController alloc] init];
    // 第一个界面我们使用 viewController
    ViewController *viewController = [[ViewController alloc] init];
    viewController.view.backgroundColor = [UIColor whiteColor];
    viewController.tabBarItem.title = @&quot;新闻&quot;;
    viewController.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/page@2x.png&quot;];
    viewController.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/page_selected@2x.png&quot;];

    UIViewController *controller2 = [[UIViewController alloc] init];
    controller2.view.backgroundColor = [UIColor yellowColor];
    controller2.tabBarItem.title = @&quot;视频&quot;;
    controller2.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/video@2x.png&quot;];
    controller2.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/video_selected@2x.png&quot;];

    UIViewController *controller3 = [[UIViewController alloc] init];
    controller3.view.backgroundColor = [UIColor greenColor];
    controller3.tabBarItem.title = @&quot;推荐&quot;;
    controller3.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/like@2x.png&quot;];
    controller3.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/like_selected@2x.png&quot;];

    UIViewController *controller4 = [[UIViewController alloc] init];
    controller4.view.backgroundColor = [UIColor lightGrayColor];
    controller4.tabBarItem.title = @&quot;我的&quot;;
    controller4.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/home@2x.png&quot;];
    controller4.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/home_selected@2x.png&quot;];
    // tabbarController 设置为四个页面 Controller
    [tabbarController setViewControllers:@[viewController,controller2,controller3,controller4]];
    // nagationController 的容器设置为 tabbarController
    UINavigationController * nagationController = [[UINavigationController alloc] initWithRootViewController:tabbarController];
    // rootViewController 设置为 nagationController
    self.window.rootViewController = nagationController;
    [self.window makeKeyAndVisible];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_08-delegate-设计模式" tabindex="-1"><a class="header-anchor" href="#_08-delegate-设计模式" aria-hidden="true">#</a> 08. delegate 设计模式</h2><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c704635e370e428a99cf54f76858746d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><p>此处我们以<code>UITabBarController</code>来作为例子，比如我们点击底部 tab 时候，是否要进行切换<code>viewController</code>，以及切换完成后，要做什么动作，比如页面刷新，第一个视频进行自动播放诸如此类的（由此可以满足各种各样的自定义的需求逻辑）。</p><p>由此设计了相关的协议，暴露方法<code>shouldSelectViewController</code>、<code>didSelectViewController</code>等方法，在适当的时机由<code>delegate</code>进行调用</p><h3 id="_1-delegate-设计模式" tabindex="-1"><a class="header-anchor" href="#_1-delegate-设计模式" aria-hidden="true">#</a> 1. delegate 设计模式</h3><ol><li><p>设置 self 为 delegate 的接收者，也就是实现方法的对象</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>tabBar.delegate = self;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>根据需求按需实现方法</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (BOOL)tabBarController:(UITabBarController *)tabBarController ShouldSelectViewController:(UIViewController *)viewCotroller{
  return YES
}
- (VOID)tabBarController:(UITabBarController *)tabBarController didSelectViewController:(UIViewController *)viewController{
	// 播放当前 viewController 的第一个视频等等需求
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>UITabBarController</code>举例</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@property(nullable, nonatomic, weak)id&lt;UITabBarControllerDelegate&gt; delegate;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>从设计者和使用者来进行对比</p><table><thead><tr><th>设计者</th><th>使用者</th></tr></thead><tbody><tr><td>提供一些使用者可以自定义的操作<br>@optional/@requiered 注解<br>提供@property - delegate<br>在对应的时机，让 delegate 执行对应方法</td><td>设置 delegate = self<br>按需实现方法</td></tr></tbody></table></li></ol><h3 id="_2-代码示例" tabindex="-1"><a class="header-anchor" href="#_2-代码示例" aria-hidden="true">#</a> 2. 代码示例</h3><ol><li><p>修改<code>SceneDelegate.m</code>代码如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>// 添加 UITabBarControllerDelegate 调用属性
@interface SceneDelegate ()&lt;UITabBarControllerDelegate&gt;

@end
- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {

  // 在 tabbarController 添加 delegate 属性
  tabbarController.delegate = self; // 添加的

}
// 添加方法 didSelectViewController，打印 did selctor 字符串
- (void)tabBarController:(UITabBarController *)tabBarController didSelectViewController:(UIViewController *)viewController{
    NSLog(@&quot;did selctor&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行模拟器后，我们点击 tabBar 中任意一个 tab，即可以在编辑器里看到打印的信息</p></li></ol><h2 id="_09-使用-uitableview-实现简单的列表" tabindex="-1"><a class="header-anchor" href="#_09-使用-uitableview-实现简单的列表" aria-hidden="true">#</a> 09. 使用 UITableView 实现简单的列表</h2><h3 id="_1-列表" tabindex="-1"><a class="header-anchor" href="#_1-列表" aria-hidden="true">#</a> 1. 列表</h3><h4 id="_1-特点" tabindex="-1"><a class="header-anchor" href="#_1-特点" aria-hidden="true">#</a> 1. 特点</h4><ul><li>数据量大</li><li>样式比较统一</li><li>通常需要分组</li><li>垂直滚动</li><li>通常可视区只有一个（视图的复用）</li></ul><h4 id="_2-uitableview" tabindex="-1"><a class="header-anchor" href="#_2-uitableview" aria-hidden="true">#</a> 2. UITableView</h4><blockquote><p>包含：tableHeaderView、UITableViewCell、TableFooterView#</p></blockquote><h4 id="_3-代码示例" tabindex="-1"><a class="header-anchor" href="#_3-代码示例" aria-hidden="true">#</a> 3. 代码示例</h4><p>修改<code>ViewController.m</code>，使其显示内容为一个<code>tableView</code></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor =[UIColor whiteColor];

    UITableView *tableView = [[UITableView alloc] initWithFrame:self.view.bounds];
    [self.view addSubview:tableView];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-重新运行模拟器-就可以看到效果" tabindex="-1"><a class="header-anchor" href="#_4-重新运行模拟器-就可以看到效果" aria-hidden="true">#</a> 4. 重新运行模拟器，就可以看到效果</h4><h3 id="_2-uitableviewdatasource" tabindex="-1"><a class="header-anchor" href="#_2-uitableviewdatasource" aria-hidden="true">#</a> 2. UITableViewDataSource</h3><blockquote><p>UITableView 作为视图，只负责展示，协助管理，不管理数据，</p><p>需要开发者为<code>UITableView</code>提供展示所需要的数据以及<code>Cell</code></p><p>通过<code>delegate</code>的模式，开发者需要实现<code>UITableViewDataSource</code></p></blockquote><p><strong>@required</strong></p><ul><li>numberOfRowsInSection:(NSInteger)section;</li><li>cellForRowAtIndexPath:(NSIndexPath *)indexPath;</li></ul><h4 id="_1-代码示例" tabindex="-1"><a class="header-anchor" href="#_1-代码示例" aria-hidden="true">#</a> 1. 代码示例</h4><ol><li><p>修改<code>ViewController.m</code>，使其显示内容为一个<code>tableView</code></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@interface ViewController()&lt;UITableViewDataSource&gt; // 新增

@end

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor =[UIColor whiteColor];

    UITableView *tableView = [[UITableView alloc] initWithFrame:self.view.bounds];
    tableView.dataSource = self; // 新增的
    [self.view addSubview:tableView];
}
// 使用 UITableViewDataSource 后，这两个方法必须声明且实现
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return 20; // 多少个list
};

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell *cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@&quot;id&quot;];
    cell.textLabel.text = @&quot;主标题&quot;;
    cell.detailTextLabel.text=@&quot;副标题&quot;;
    cell.imageView.image=[UIImage imageNamed:@&quot;icon.bundle/video@2x.png&quot;];
    return cell;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>上述代码中的<code>UITableViewCellStyleSubtitle</code>知识其中一种，还有其他的如下图</p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b342eef3c3e14810b51328abc076a115~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><ol start="3"><li><p><code>UITableView</code>提供的属性如下图</p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34727405edf243cbb2aa2af43a8d8b0a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ol></li></ol><h3 id="_3-uitableviewcell-的复用" tabindex="-1"><a class="header-anchor" href="#_3-uitableviewcell-的复用" aria-hidden="true">#</a> 3. UITableViewCell 的复用</h3><blockquote><p>系统提供复用回收池，根据 reuseIdentifer 作为标识</p></blockquote><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ca63d84663c42ed9a9640ebb743a039~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h4><ol><li><p>在<code>tableView</code>中的<code>cellForRowAtIndexPath</code>中的方法中取出复用池子的<code>cell</code></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@&quot;id&quot;]; // 先从系统的复用回收池里取出一个
    if(!cell){
        NSLog(@&quot;新创建了&quot;);
        // 如果没有，就重新创建
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@&quot;id&quot;];
    }else{
        NSLog(@&quot;复用了&quot;);
    }
    cell.textLabel.text = @&quot;主标题&quot;;
    cell.detailTextLabel.text=@&quot;副标题&quot;;
    cell.imageView.image=[UIImage imageNamed:@&quot;icon.bundle/video@2x.png&quot;];
    return cell;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行模拟器，然后再编辑器控制台中就可以看到打印的信息，上一节中我们创建了 20 个 cell, 滚动后的打印结果如下。</p><blockquote><p>我得模拟器是 8p,我滚动后发现， <strong>新创建了</strong>：打印了 16 次，其余都是打印 <strong>复用的</strong>。由此可以看出这里的优化是起了作用的</p></blockquote></li></ol><h3 id="_4-其他" tabindex="-1"><a class="header-anchor" href="#_4-其他" aria-hidden="true">#</a> 4. 其他</h3><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54880208141f4b7ea88f5df4e47252dd~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="_1-nsindexpath" tabindex="-1"><a class="header-anchor" href="#_1-nsindexpath" aria-hidden="true">#</a> 1. NSIndexPath</h4><blockquote><p>我们可以获得列表中 cell 中某一行的所在 section 以及 row</p></blockquote><p>修改代码如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@&quot;id&quot;]; // 先从系统的复用回收池里取出一个
    if(!cell){
        NSLog(@&quot;新创建了&quot;);
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@&quot;id&quot;];
    }else{
        NSLog(@&quot;复用了&quot;);
    }
    cell.textLabel.text = [NSString stringWithFormat:@&quot;主标题 - %@ -%@&quot;, @(indexPath.section), @(indexPath.row)] ; // 这里新增
    cell.detailTextLabel.text=@&quot;副标题&quot;;
    cell.imageView.image=[UIImage imageNamed:@&quot;icon.bundle/video@2x.png&quot;];
    return cell;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：我们此处只有一个 <code>section</code>，<code>section</code> 始终是 0，<code>row</code>是变化的，结果如下：</p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1519a8295a724e889576a44094574999~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="_2-uitableviewdelegate" tabindex="-1"><a class="header-anchor" href="#_2-uitableviewdelegate" aria-hidden="true">#</a> 2. UITableViewDelegate</h4><ul><li>提供滚动过程中，<code>UITableViewCell</code>的出现、消失时机</li><li>提供<code>UITableViewCell</code>的高度、<code>headers</code> 以及 <code>footers</code> 设置</li><li>提供 <code>UITableViewCell</code> 各种行为的回调（点击、删除等）</li></ul><p>代码实现</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>// UITableViewDataSource, UITableViewDelegate中有很多方法，可以点击跳转定义查看
@interface ViewController()&lt;UITableViewDataSource,UITableViewDelegate&gt; //  新增加 UITableViewDelegate

@end

- (void)viewDidLoad {
  tableView.delegate = self; // 新增加
}
// 设置每一个 cell 的高度
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 100;
}
// 当每一个 row 被选中点击时候触发的回调
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    UIViewController *controller = [[UIViewController alloc]init];
    controller.view.backgroundColor =[UIColor whiteColor];
    controller.title = [NSString stringWithFormat:@&quot;%@&quot;, @(indexPath.row)];
    [self.navigationController pushViewController:controller animated:YES];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-总结-uitableview-基本使用" tabindex="-1"><a class="header-anchor" href="#_5-总结-uitableview-基本使用" aria-hidden="true">#</a> 5. 总结：<code>UITableView</code> 基本使用</h3><ul><li>提供最基础的列表类型视图组件</li><li>提供默认基础的 <code>UITableViewCell</code>样式、<code>header</code>、<code>footer</code>的管理</li><li>提供针对<code>UITableViewCell</code>的复用回收逻辑</li><li>提供列表基础功能，如点击、删除、插入等 <ol><li>创建<code>UITableView</code>，设置<code>delegate</code>和<code>datasource</code>，通过两个<code>delegate</code></li><li>选择实现<code>UITableViewDataSource</code>中方法，行数、cell 复用</li><li>选择实现<code>UITableViewDelegate</code>中的方法（高度、<code>header</code>、<code>footer</code>、点击等）</li></ol></li></ul><h2 id="_10-uicollectionview" tabindex="-1"><a class="header-anchor" href="#_10-uicollectionview" aria-hidden="true">#</a> 10. UICollectionView</h2><h3 id="_1-初识-uicollectionview" tabindex="-1"><a class="header-anchor" href="#_1-初识-uicollectionview" aria-hidden="true">#</a> 1. 初识 UICollectionView</h3><h4 id="_1-uitableview-的不足" tabindex="-1"><a class="header-anchor" href="#_1-uitableview-的不足" aria-hidden="true">#</a> 1. UITableView 的不足</h4><p>例如下面的需求，</p><p>对于左边，如果我们使用<code>UITableView</code>还是勉强可以实现的，我们可以把左右两个块当做一个<code>cell</code>，然后点击的会后我们判断点击的是 左边 还是 右边，在进行点击后的处理</p><p>对于右边，我们就没有办法了，因为他是以一个瀑布流的形式进行展示，左右错落不齐，没有办法进行复用</p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1d24ec515bc4c0886ab8fe5bec5086e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="_2-uicollectionview" tabindex="-1"><a class="header-anchor" href="#_2-uicollectionview" aria-hidden="true">#</a> 2. UICollectionView</h4><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33b03a39f0d9452c9203f6a1818a571b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><ul><li>提供列表复用的容器</li><li>内置复用回收池</li><li>支持横向 + 纵向布局</li><li>更加灵活的布局方式</li><li>更加灵活的动画</li><li>更多的装饰视图</li><li>布局之间的切换</li></ul><p>与 <code>UITableiew</code>有相同的 API 设计理念 --- 都是基于 datasource 以及 delegate 驱动的</p><p>row ====&gt; item : 由于一行可以展示多个视图，row 不能准确的表达</p><p><code>UICollectioniewDataSource</code>:</p><ul><li>numberOfItemsInSection:(NSInteger)section;</li><li>cellForItemAtIndexPath:(NSIndexPath *)indexPath;</li></ul><p><code>UICollectionViewDelegate</code></p><ul><li>willDisplayCell / endDisPlayCell ...</li><li>-(void)collectionView:(UICollectionView _)collectionView didSelectItemAtIndexPath:(NSIndexPath _)indexPath;</li></ul><p><code>UICollectionViewCell</code></p><ul><li>不提供默认的样式 <ul><li>不是以“行”为设计基础</li><li>只有 contentView / backgroundView</li><li>继承自<code>UICollectionReusableView</code></li></ul></li><li>必须先注册 Cell 类型用于重用 <ol><li>-(void)registerClass:(Class)cellClass forCellWithReuseIdentifier:(NSString *)identifier;</li><li>-(__kindof UICollectionViewCell _)dequeueReusableCellWithReuseIdentifier:(NSString _)identifier forIndexPath:(NSIndexPath *)indexPath;</li></ol></li></ul><h4 id="_3-代码实现" tabindex="-1"><a class="header-anchor" href="#_3-代码实现" aria-hidden="true">#</a> 3. 代码实现</h4><ol><li><p>新建 new File =&gt; 选择 Cocoa Touch Class =&gt; next =&gt; 选择 class:<code>GTVideoViewController</code>,Subclass of <code>UIViewController</code> ，这样我们新创建了<code>GTVideoViewController.h</code>和<code>GTVideoViewController.m</code>文件</p></li><li><p><code>GTVideoViewController.m</code>文件修改内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTVideoViewController.h&quot;
@interface GTVideoViewController ()&lt;UICollectionViewDelegate,UICollectionViewDataSource&gt;
@end

@implementation GTVideoViewController
-(instancetype) init{
    self = [super init];
    if(self){
        self.tabBarItem.title = @&quot;视频&quot;;
        self.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/video@2x.png&quot;];
        self.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/video_selected@2x.png&quot;];
    }
    return self;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];

    UICollectionView *collectionView = [[UICollectionView alloc] initWithFrame:self.view.bounds collectionViewLayout:flowLayout];
    collectionView.delegate = self;
    collectionView.dataSource = self;
    [collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@&quot;UICollectionViewCell&quot;];

    [self.view addSubview:collectionView];
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section{
    return 200;
};

- (__kindof UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath{
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@&quot;UICollectionViewCell&quot; forIndexPath:indexPath];
    cell.backgroundColor = [UIColor redColor];
    return cell;
};
@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改<code>SceneDelegate.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTVideoViewController.h&quot; // 新增

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
  // 把第二个 tab 视频页修改为新创建的 GTVideoViewController 实现的页面，并且删除之前的
  UIViewController *videoController = [[GTVideoViewController alloc] init];
 // ---------------------start:删除即可--------------------
 // UIViewController *controller2 = [[UIViewController alloc] init];
 // controller2.view.backgroundColor = [UIColor yellowColor];
 // controller2.tabBarItem.title = @&quot;视频&quot;;
 /// controller2.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/video@2x.png&quot;];
 // controller2.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/video_selected@2x.png&quot;];
 // ---------------------end:删除即可--------------------

 [tabbarController setViewControllers:@[viewController,videoController,controller3,controller4]];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="_2-uicollectionviewlayou" tabindex="-1"><a class="header-anchor" href="#_2-uicollectionviewlayou" aria-hidden="true">#</a> 2. UICollectionViewLayou</h3><blockquote><p>用于生成 UICollectionView 布局信息的抽象类</p></blockquote><h4 id="_1-uicollectionviewlayoutattributes" tabindex="-1"><a class="header-anchor" href="#_1-uicollectionviewlayoutattributes" aria-hidden="true">#</a> 1. UICollectionViewLayoutAttributes</h4><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cfdc8222240457b8b2669a99e110e56~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><blockquote><p>属性有：frame、center、size、transform3D、bounds 等等</p></blockquote><ul><li><code>UICollectionView</code> 提供基本的容器、滚动、复用功能</li><li>布局信息完全交给开发者</li><li>作为抽象类，业务逻辑需要继承</li><li>实现 <code>UICollectionViewLayout</code>(UISubclassingHooks)中的方法</li><li>开发者可以自定义生成 attributes，系统通过此进行布局</li><li>系统提供默认的流式布局 Layout</li></ul><h4 id="_2-uicollectionviewflowlayout" tabindex="-1"><a class="header-anchor" href="#_2-uicollectionviewflowlayout" aria-hidden="true">#</a> 2. UICollectionViewFlowLayout</h4><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b4fd878aaca4d2abdc31df0dfbdf6af~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><blockquote><p>流式布局，每行排满后自动换行</p></blockquote><ol><li><code>minimumInteritemSpacing</code>、<code>minimumLineSpacing</code>、<code>itemSize</code></li><li><code>UICollectionViewDelegateFlowLayout</code>：根据 <code>inexPath</code> 做更细化的自定义样式</li></ol><h4 id="_3-代码实现-1" tabindex="-1"><a class="header-anchor" href="#_3-代码实现-1" aria-hidden="true">#</a> 3. 代码实现</h4><ol><li><p>修改 <code>GTVideoViewController.m</code>文件</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
    flowLayout.minimumLineSpacing = 10; // 新增的，注意
    flowLayout.minimumInteritemSpacing = 20; // 新增的
    flowLayout.itemSize = CGSizeMake((self.view.frame.size.width - 30)/2, 300); // 新增的

    UICollectionView *collectionView = [[UICollectionView alloc] initWithFrame:self.view.bounds collectionViewLayout:flowLayout];
    collectionView.delegate = self;
    collectionView.dataSource = self;
    [collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@&quot;UICollectionViewCell&quot;];

    [self.view addSubview:collectionView];
}

// 通过实现此方法可以实现每一个 item 的具体信息
- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath{
    if(indexPath.item %3 == 0){
        return CGSizeMake(self.view.frame.size.width, 100);
    }else{
        return CGSizeMake((self.view.frame.size.width - 20)/2, 300);
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行模拟机后，可以看到如下效果</p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0b08e5a74134725be5bab1066bc55b4~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li><li><p>注意：minimumInteritemSpacing 是一个最小值的设置，假如屏幕有 700，每一个 item 设置为 300 ,那么两块中间就有 100 的间隙，设置的值小于这个值时候系统也会按照间隙 100 处理。</p></li></ol><h3 id="_3-uicollectionview-基本使用" tabindex="-1"><a class="header-anchor" href="#_3-uicollectionview-基本使用" aria-hidden="true">#</a> 3. UICollectionView 基本使用</h3><h4 id="_1-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-基本使用" aria-hidden="true">#</a> 1. 基本使用</h4><ul><li>提供灵活的、可定制的列表类型视图组件</li><li>提供默认基础的 Flow 样式布局</li><li>提供针对 UICollectionView 的复用回收逻辑</li><li>提供列表其他功能，如点击、删除、插入以及布局的切换等 <ol><li>创建 UICollectionViewLayout,使用系统默认流式布局，或者自定义布局</li><li>创建 UICollectionView,设置 delegate 和 dataSource，注册 cell 类型</li><li>选择实现 UICollectionViewDataSource 中方法，行数、cell 复用</li><li>选择实现 UICollectionViewDelegate 中方法（点击，滚动等）</li></ol></li></ul><h4 id="_2-列表的选择与使用" tabindex="-1"><a class="header-anchor" href="#_2-列表的选择与使用" aria-hidden="true">#</a> 2. 列表的选择与使用</h4><ul><li>UITableView 其实算是特殊 Flow 布局的 UICollectionView</li><li>简单的列表仍然可以使用 UITableView</li><li>有双向的布局，特殊布局等非普通场景（瀑布流、弹幕）</li><li>Layout 的切换，在选择屏幕时有优雅的动画</li></ul><h2 id="_11-uiscrollview" tabindex="-1"><a class="header-anchor" href="#_11-uiscrollview" aria-hidden="true">#</a> 11. UIScrollView</h2><blockquote><p>通过查看<code>UITableView</code>、<code>UICollectionView</code>的定义就可以看到，他们均继承于<code>UIScrollView</code></p><p>通过下图，可以初步了解一些相关属性</p></blockquote><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4da3f85d54714dc2a3fba9dda059a36a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h3 id="_1-初识-uiscrollview" tabindex="-1"><a class="header-anchor" href="#_1-初识-uiscrollview" aria-hidden="true">#</a> 1. 初识 UIScrollView</h3><blockquote><p>同步上图可以看到它的一些属性</p></blockquote><ol><li><p>新建 new File =&gt; 选择 Cocoa Touch Class =&gt; next =&gt; 选择 class:<code>GTRecommendViewController</code>,Subclass of <code>UIViewController</code> ，这样我们新创建了<code>GTRecommendViewController.h</code>和<code>GTRecommendViewController.m</code>文件</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>// GTRecommendViewController.m
#import &quot;GTRecommendViewController.h&quot;

@interface GTRecommendViewController ()

@end

@implementation GTRecommendViewController
-(instancetype)init{
    self = [super init];
    if(self){
        self.tabBarItem.title = @&quot;推荐&quot;;
        self.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/like@2x.png&quot;];
        self.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/like_selected@2x.png&quot;];
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];

    UIScrollView *scrollView = [[UIScrollView alloc] initWithFrame:self.view.bounds];
    scrollView.backgroundColor = [UIColor lightGrayColor];
    // 我们设置它的总体宽度为 5倍 屏幕宽
    scrollView.contentSize = CGSizeMake(self.view.bounds.size.width * 5, self.view.bounds.size.height);
    scrollView.showsHorizontalScrollIndicator = NO; // 是否显示水平方向滚动条
    scrollView.pagingEnabled = YES; // 可以实现翻页的效果
    NSArray *colorArr = @[[UIColor redColor], [UIColor blueColor], [UIColor yellowColor], [UIColor lightGrayColor], [UIColor grayColor]];
    for(int i=0;i&lt;5;i++){
       // 添加五个不同颜色的屏幕宽度的的view,x轴偏移位置依次增加，这样翻页时候我们就可以看到不同的颜色块
        [scrollView addSubview:({
            UIView *view = [[UIView alloc] initWithFrame:CGRectMake(scrollView.bounds.size.width * i, 0, scrollView.bounds.size.width, scrollView.bounds.size.height)];
            view.backgroundColor = [colorArr objectAtIndex:i];
            view;
        })];
    }
    [self.view addSubview: scrollView];
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改<code>SceneDelegate.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTRecommendViewController.h&quot; // 新增

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
  // --------------start:删除---------------------
	// UIViewController *controller3 = [[UIViewController alloc] init];
	// controller3.view.backgroundColor = [UIColor greenColor];
	// controller3.tabBarItem.title = @&quot;推荐&quot;;
	// controller3.tabBarItem.image = [UIImage imageNamed:@&quot;icon.bundle/like@2x.png&quot;];
	// controller3.tabBarItem.selectedImage = [UIImage imageNamed:@&quot;icon.bundle/like_selected@2x.png&quot;];
  // --------------end:删除---------------------

   GTRecommendViewController *recommendController = [[GTRecommendViewController alloc] init];

   [tabbarController setViewControllers:@[viewController,videoController,recommendController,controller4]];

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行手机模拟器，滑动 x 轴，可以看到滚动翻页的效果</p></li></ol><h3 id="_2-深入-uiscrollview-uiscorllviewdelegate" tabindex="-1"><a class="header-anchor" href="#_2-深入-uiscrollview-uiscorllviewdelegate" aria-hidden="true">#</a> 2.深入 UIScrollView： UIScorllViewDelegate</h3><ul><li><strong>滚动</strong>：监听页面滚动，以及根据 Offset 做业务逻辑 <ul><li>-(void)scrollViewDidScroll:(UIScrollView *)scrollView:</li></ul></li><li><strong>拖拽</strong>：中断一些业务逻辑，如视频/gif 播放 <ul><li>-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView;</li><li>-(void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate;</li></ul></li><li><strong>减速</strong>：页面停止时开始逻辑，如视频自动播放 <ul><li>-(void)scrollViewWillBeginDecelerating:(UIScrollView *)scrollView;</li><li>-(void)scrollDidEndDecelerating:(UIScrollView *)scrollView;</li></ul></li></ul><p><strong>代码实现如下</strong></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>// GTRecommendViewController.m 文件
@interface GTRecommendViewController ()&lt;UIScrollViewDelegate&gt; // 新增 UIScrollViewDelegate
- (void)viewDidLoad {

  scrollView.delegate = self;

}
- (void)scrollViewDidScroll:(UIScrollView *)scrollView{
    NSLog(@&quot;scrollViewDidScroll-y-%@&quot;,@(scrollView.contentOffset.y));
		NSLog(@&quot;scrollViewDidScroll-x-%@&quot;,@(scrollView.contentOffset.x));
}
- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView{
    NSLog(@&quot;scrollViewWillBeginDragging&quot;);
}
- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate{
    NSLog(@&quot;scrollViewDidEndDragging&quot;);
}
- (void)scrollViewWillBeginDecelerating:(UIScrollView *)scrollView{
}
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView{
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行模拟机后，滑动页面，即可以看到控制台中的打印信息</p><h2 id="_12-uiscrollview-实战场景" tabindex="-1"><a class="header-anchor" href="#_12-uiscrollview-实战场景" aria-hidden="true">#</a> 12.UIscrollView 实战场景</h2><p>UIKit 中的滚动视图，如下图：</p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/811b21aa14e74a1ea9e07e02108c0165~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06f179446e834e3796fef5bfa78ea6c8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h2 id="_13-利用-uilabel-让列表展示文字" tabindex="-1"><a class="header-anchor" href="#_13-利用-uilabel-让列表展示文字" aria-hidden="true">#</a> 13. 利用 UILabel 让列表展示文字</h2><blockquote><p>UILabel: 展示一行或者多行只读文字的视图</p></blockquote><ul><li>text：@”IOS 开发“</li><li>font: UIFont (大小、粗体、斜体)</li><li>textColor: 文字颜色</li><li>textAlignment: 对齐方式（居中、左对齐、右对齐）</li><li>numberOfLines: 最大展示行数</li><li>lineBreakMode: <ul><li>NsLineBreakByClipping</li><li>NsLineBreakByTruncatingMiddle</li><li>NSLineBreakByTruncating Tail</li><li>NSLineBreakTruncatingHead</li></ul></li><li>-(void)sizeToFit; <ol><li>固定大小的，通过展示行数截断</li><li>可变大小使用 sizeToFit 确定大小</li><li>从固定方向顺序逐一布局</li></ol></li></ul><h3 id="uilabl" tabindex="-1"><a class="header-anchor" href="#uilabl" aria-hidden="true">#</a> UILabl</h3><ul><li>替换 UITableViewCell 中的默认布局样式，使用自定义 UILabel 进行复杂布局</li><li>后期学习：展示复杂样式的文字---NSAttributedString</li></ul><p><strong>代码展示</strong></p><ol><li><p>新建 new File =&gt; 选择 Cocoa Touch Class =&gt; next =&gt; 选择 class:<code>GTNormalTableViewCell</code>,Subclass of <code>UITableViewCell</code> ，这样我们新创建了<code>GTNormalTableViewCell.h</code>和<code>GTNormalTableViewCell.m</code>文件</p></li><li><p>修改<code>GTNormalTableViewCell.h</code>暴露一个方法</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &lt;UIKit/UIKit.h&gt;

NS_ASSUME_NONNULL_BEGIN

@interface GTNormalTableViewCell : UITableViewCell
-(void)layoutTableViewCell; // 这个方法是暴露的方法
@end

NS_ASSUME_NONNULL_END
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改<code>GTNormalTableViewCell.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTNormalTableViewCell.h&quot;

@interface GTNormalTableViewCell()
@property(nonatomic, strong, readwrite) UILabel *titleLabel;
@property(nonatomic, strong, readwrite) UILabel *sourceLabel;
@property(nonatomic, strong, readwrite) UILabel *commentLabel;
@property(nonatomic, strong, readwrite) UILabel *timeLabel;

@end

@implementation GTNormalTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(nullable NSString *)reuseIdentifier{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if(self){
        [self.contentView addSubview:({
            self.titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, 15, 300, 50)];
            self.titleLabel.font = [UIFont systemFontOfSize:16];
            self.titleLabel.textColor = [UIColor blackColor];
            self.titleLabel;
        })];

        [self.contentView addSubview:({
            self.sourceLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, 80, 50, 20)];
            self.sourceLabel.font = [UIFont systemFontOfSize:12];
            self.sourceLabel.textColor = [UIColor grayColor];
            self.sourceLabel;
        })];
        [self.contentView addSubview:({
            self.commentLabel = [[UILabel alloc] initWithFrame:CGRectMake(100, 80, 50, 20)];
            self.commentLabel.font = [UIFont systemFontOfSize:12];
            self.commentLabel.textColor = [UIColor grayColor];
            self.commentLabel;
        })];
        [self.contentView addSubview:({
            self.timeLabel = [[UILabel alloc] initWithFrame:CGRectMake(150, 80, 50, 20)];
            self.timeLabel.font = [UIFont systemFontOfSize:12];
            self.timeLabel.textColor = [UIColor grayColor];
            self.timeLabel;
        })];
    }
    return self;
}
-(void)layoutTableViewCell{
    self.titleLabel.text = @&quot;极客时间IOS开发&quot;;
    self.sourceLabel.text = @&quot;极客时间&quot;;
    [self.sourceLabel sizeToFit];

    self.commentLabel.text = @&quot;1888评论&quot;;
    [self.commentLabel sizeToFit];
    self.commentLabel.frame = CGRectMake(self.sourceLabel.frame.origin.x + self.sourceLabel.frame.size.width + 15, self.commentLabel.frame.origin.y, self.commentLabel.frame.size.width, self.commentLabel.frame.size.height);

    self.timeLabel.text = @&quot;三分钟前&quot;;
    [self.timeLabel sizeToFit];
    self.timeLabel.frame = CGRectMake(self.commentLabel.frame.origin.x + self.commentLabel.frame.size.width + 15, self.timeLabel.frame.origin.y, self.timeLabel.frame.size.width, self.timeLabel.frame.size.height);
}

@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改<code>ViewController.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTNormalTableViewCell.h&quot; // 新增

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
   	// 造成继承的 UITableViewCell 改为 GTNormalTableViewCell
  	GTNormalTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@&quot;id&quot;]; // 先从系统的复用回收池里取出一个
    if(!cell){
        NSLog(@&quot;新创建了&quot;);
        // 这里也改为 GTNormalTableViewCell
        cell = [[GTNormalTableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@&quot;id&quot;];
    }else{
        NSLog(@&quot;复用了&quot;);
    }
  	// 使用暴露的 layoutTableViewCell 方法
    [cell layoutTableViewCell];
    return cell;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重新运行，可以看到如下效果</p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b91ed36ab7ed4d028be248cee5a6fa3f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ol><h2 id="_14-使用-uiimageview-在列表展示图片" tabindex="-1"><a class="header-anchor" href="#_14-使用-uiimageview-在列表展示图片" aria-hidden="true">#</a> 14. 使用 UIImageView 在列表展示图片</h2><blockquote><p>UIImage: 管理图片数据的对象</p></blockquote><h3 id="_1-基本概念" tabindex="-1"><a class="header-anchor" href="#_1-基本概念" aria-hidden="true">#</a> 1. 基本概念</h3><ul><li><p>UIImage 的使用场景</p><ul><li><p>通过 UIImageView 的视图展示</p></li><li><p>系统封装视图的图片展示</p></li><li><p>在上下文中绘制</p></li></ul></li><li><p>常用的图片类型：png、jpeg、pdf...</p></li><li><p>在 IOS 中，图片数据都会被封装成 <code>UIImage</code></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>(nullalbe UIImage *)imageNamed:(NSString *)name; // load from main bundle
(nullable UIImage *)imageWithContentsOfFile:(NSString *)path;
(nullable UIImage *)imageWithData:(NSData *)data;
(UIImage *)imageWithCGImage:(CGImageRef)cgImage;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>图片数据的存储与管理（后续课程）</p></li></ul><h3 id="_2-展示一张或者一组图片的视图" tabindex="-1"><a class="header-anchor" href="#_2-展示一张或者一组图片的视图" aria-hidden="true">#</a> 2. 展示一张或者一组图片的视图</h3><ul><li><p>展示一张静态图片</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>UIImageView.image = UIImage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>展示一组静态图片，成为动图</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>UIImageView.animationImages = @[UIImage, UIImage, ...]
UIImageView.animationDuration = 1
[UIImageView startAnimating]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-uiviewcontentmode" tabindex="-1"><a class="header-anchor" href="#_3-uiviewcontentmode" aria-hidden="true">#</a> 3. UIViewContentMode</h3><blockquote><p>当图片尺寸和 UIImageView 尺寸不符的时候，自定义填充方式</p></blockquote><ul><li>ToFill</li><li>AspectFill</li><li>AspectFit</li><li>TopLeft</li><li>BottomRight</li><li>Center</li><li>...</li></ul><h3 id="_4-本节实现功能" tabindex="-1"><a class="header-anchor" href="#_4-本节实现功能" aria-hidden="true">#</a> 4. 本节实现功能</h3><ul><li>替换 UITableViewCell 中的默认布局样式</li><li>使用自定义 UIImageView 进行复杂布局</li></ul><h3 id="_5-代码实现-1" tabindex="-1"><a class="header-anchor" href="#_5-代码实现-1" aria-hidden="true">#</a> 5. 代码实现</h3><p>修改<code>GTNormalTableViewCell.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@interface GTNormalTableViewCell()

@property(nonatomic, strong, readwrite)UIImageView *rightImageView;// 新增加
@end

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(nullable NSString *)reuseIdentifier{

  // 最后增加一列

  [self.contentView addSubview:({
    self.rightImageView = [[UIImageView alloc] initWithFrame:CGRectMake(330, 15, 70, 70)];
    self.rightImageView.contentMode = UIViewContentModeScaleToFill;
    self.rightImageView;
  })];
   return self;
}


-(void)layoutTableViewCell{
  self.rightImageView.image = [UIImage imageNamed:@&quot;icon.bundle/icon.png&quot;]; // 新增加
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行模拟器，效果如下</p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee0bb8b752574e48912dc21ca7fafc85~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h2 id="_15-ios-中的按钮、点击和手势" tabindex="-1"><a class="header-anchor" href="#_15-ios-中的按钮、点击和手势" aria-hidden="true">#</a> 15. iOS 中的按钮、点击和手势</h2><h3 id="_1-uibutton" tabindex="-1"><a class="header-anchor" href="#_1-uibutton" aria-hidden="true">#</a> 1. UIButton</h3><blockquote><p>可以展示文字、图片，不止有静态的展示功能，同时增加了用户交互（响应用户的点击、拖拽等开发者自定义业务）</p></blockquote><h4 id="_1-相关属性" tabindex="-1"><a class="header-anchor" href="#_1-相关属性" aria-hidden="true">#</a> 1. 相关属性</h4><ul><li>默认的 <code>UIButton</code>提供 <code>imageView</code>和<code>titleLabel</code>的基本布局</li><li>通过设置<code>enabled</code>/<code>selected</code>/<code>highlighted</code>改变基本状态</li><li>在每种状态下都有对应的视图</li><li>可以忽略默认视图，直接自定义<code>subView</code></li></ul><h4 id="_2-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-代码实现" aria-hidden="true">#</a> 2. 代码实现</h4><ol><li>修改<code>GTNormalTableViewCell.m</code>文件，内容如下</li></ol><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@interface GTNormalTableViewCell()

@property(nonatomic,strong,readwrite)UIButton *deleteButton; // 新增加
@end

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(nullable NSString *)reuseIdentifier{

   // 添加一个 button 按钮在视图中
   [self.contentView addSubview:({
     self.deleteButton = [[UIButton alloc] initWithFrame:CGRectMake(290, 80, 30, 20)];
     [self.deleteButton setTitle:@&quot;X&quot; forState:UIControlStateNormal];// 默认显示 X
     [self.deleteButton setTitle:@&quot;V&quot; forState:UIControlStateHighlighted]; // 点击的时候显示 V
     self.deleteButton.backgroundColor = [UIColor blueColor];
     self.deleteButton;
   })];
  return self;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>运行模拟器，效果如下</p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67e3dc50c39a4f478cf4235dbead70ab~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ol><h3 id="_2-target-action" tabindex="-1"><a class="header-anchor" href="#_2-target-action" aria-hidden="true">#</a> 2. Target-Action</h3><h4 id="_1-相关概念" tabindex="-1"><a class="header-anchor" href="#_1-相关概念" aria-hidden="true">#</a> 1. 相关概念</h4><ul><li><p>当某个事件触发时，调用对应 target 对象的相应方法</p></li><li><p>传值的限制比较多</p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6832efa5c6645e783e87f03e7e4b951~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/100a3b594e6945c19b52b9b972b08637~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li><li><p>UIButton 通过 <code>Target-Action</code>的模式，处理点击逻辑</p></li><li><p>系统封装用户操作事件</p></li><li><p>对应事件开发者实现自定义的方法</p></li></ul><h4 id="_2-代码实现-1" tabindex="-1"><a class="header-anchor" href="#_2-代码实现-1" aria-hidden="true">#</a> 2. 代码实现</h4><p>修改<code>GTNormalTableViewCell.m</code> 文件 ，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(nullable NSString *)reuseIdentifier{
	[self.contentView addSubview:({

    // 新增加
    // 当我按钮点击时候，self.deleButton 会调用 self 的 deleButtonClick 方法
    [self.deleteButton addTarget:self action:@selector(deleButtonClick) forControlEvents:UIControlEventTouchUpInside];

  })
}

// 新增加
-(void)deleButtonClick{
    NSLog(@&quot;deleButtonClick&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新运行模拟器，点击按钮可以看到打印的信息<code>deleButtonClick</code></p><h4 id="_3-uicontrol" tabindex="-1"><a class="header-anchor" href="#_3-uicontrol" aria-hidden="true">#</a> 3. UIControl</h4><p>通过查看<code>UIButton</code>的定义，我们可以看到 <code>UIButton</code>继承于<code>UIControl</code>,<code>UIControl</code>又继承于<code>UIView</code></p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bf50e64dcfc464aacc865ba13ae2735~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h3 id="_3-uigesturerecognizer" tabindex="-1"><a class="header-anchor" href="#_3-uigesturerecognizer" aria-hidden="true">#</a> 3. UIGestureRecognizer</h3><blockquote><p>识别用户在屏幕中的触摸</p></blockquote><h4 id="_1-手势封装方法" tabindex="-1"><a class="header-anchor" href="#_1-手势封装方法" aria-hidden="true">#</a> 1. 手势封装方法</h4><ul><li>UITapGestureRecognizer</li><li>UIPinchGestureRecognizer</li><li>UIRotationGestureRecognizer</li><li>UISwipeGestureRecognizer</li><li>UIPanGestureRecognizer</li><li>UILongPressGestureRecognizer</li></ul><h4 id="_2-创建步骤" tabindex="-1"><a class="header-anchor" href="#_2-创建步骤" aria-hidden="true">#</a> 2. 创建步骤</h4><p>可以在任何视图上，增加一个或者多个手势，系统自动识别手势，开发者自定义相应逻辑，采用 Target-Action 方式进行处理,步骤</p><ol><li>创建手势</li><li>设置响应处理</li><li>在视图中添加</li></ol><h4 id="_3-代码实现-2" tabindex="-1"><a class="header-anchor" href="#_3-代码实现-2" aria-hidden="true">#</a> 3. 代码实现</h4><p>修改<code>GTRecommendViewController.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>- (void)viewDidLoad {


   for(int i=0;i&lt;5;i++){
     [scrollView addSubview:({
       UIView *view = [[UIView alloc] initWithFrame:CGRectMake(scrollView.bounds.size.width * i, 0, scrollView.bounds.size.width, scrollView.bounds.size.height)];

       // --------------start: 新增加的-------------------
       [view addSubview:({
         // 添加一个view,并添加一个定义事件
         UIView *view = [[UIView alloc] initWithFrame:CGRectMake(100, 200, 100, 100)];
         view.backgroundColor = [UIColor purpleColor];
         UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(viewClick)];
         [view addGestureRecognizer:tapGesture];
         view;
       })];
       // --------------end: 新增加的-------------------

       view.backgroundColor = [colorArr objectAtIndex:i];
       view;
     })];
   }


}
// 实现这个方法
-(void)viewClick{
    NSLog(@&quot;viewClick&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行模拟器，底部导航切换到 推荐 位，点击屏幕中的 紫色方块，就可以在控制台看到打印的信息</p><h3 id="_4-uigesturerecognizerdelegate" tabindex="-1"><a class="header-anchor" href="#_4-uigesturerecognizerdelegate" aria-hidden="true">#</a> 4. UIGestureRecognizerDelegate</h3><h4 id="_1-手势的不同阶段-uigesturerecognizerstate" tabindex="-1"><a class="header-anchor" href="#_1-手势的不同阶段-uigesturerecognizerstate" aria-hidden="true">#</a> 1. 手势的不同阶段：<code>UIGestureRecognizerState</code></h4><ul><li><p><code>UIGestureRecognizerStatePossible</code></p></li><li><p><code>UIGestureRecognizerStateBegan</code></p></li><li><p><code>UIGestureRecognizerStateChanged</code></p></li><li><p><code>UIGestureRecognizerStateEnded</code></p></li><li><p><code>UIGestureRecognizerStateCancelled</code></p></li><li><p><code>UIGestureRecognizerStateFailed</code></p></li><li><p>通过 Delegate 的方式，扩展在手势识别过程中的自定义操作</p><ul><li>是否响应手势</li><li>是否支持多手势</li><li>多个手势冲突时如何处理</li></ul></li></ul><h4 id="_2-代码实现-2" tabindex="-1"><a class="header-anchor" href="#_2-代码实现-2" aria-hidden="true">#</a> 2. 代码实现</h4><p>修改<code>GTRecommendViewController.m</code>文件，如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@interface GTRecommendViewController ()&lt;UIScrollViewDelegate, UIGestureRecognizerDelegate&gt; // 新增 UIGestureRecognizerDelegate

@end

- (void)viewDidLoad {
  for(int i=0;i&lt;5;i++){
        [scrollView addSubview:({
            UIView *view = [[UIView alloc] initWithFrame:CGRectMake(scrollView.bounds.size.width * i, 0, scrollView.bounds.size.width, scrollView.bounds.size.height)];

            [view addSubview:({
                UIView *view = [[UIView alloc] initWithFrame:CGRectMake(100, 200, 100, 100)];
                view.backgroundColor = [UIColor purpleColor];
                UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(viewClick)];
                tapGesture.delegate = self; // 新增加
                [view addGestureRecognizer:tapGesture];
                view;
            })];

            view.backgroundColor = [colorArr objectAtIndex:i];
            view;
        })];
    }
}

//  新增加的方法
- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer{
    // 这里设置为 NO 后在进行点击，上面的 viewClick 方法不会执行
    // 重新设置为 YES 后，再次点击事件会恢复执行
    return NO;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行模拟器，再次点击上节中的紫色方块可以看到，在 <code>gestureRecognizerShouldBegin</code>中返回<code>NO</code>时，控制台并没有打印信息，重新改为<code>YES</code>运行后，再次点击信息可以打印。</p><h2 id="_16-展示一个提醒弹窗" tabindex="-1"><a class="header-anchor" href="#_16-展示一个提醒弹窗" aria-hidden="true">#</a> 16. 展示一个提醒弹窗</h2><blockquote><p>UIAlertView，在新版本中已经被 deprecated</p></blockquote><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b38675c46ce848cba86c145c95cdc1c1~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><ul><li><p>通过 UIView、UILabel、UIButton 可以组装成任何复杂的支持交互的视图组件</p></li><li><p>组件内封装基本逻辑，开发者提供需要展示的数据，将基本逻辑中的可定制业务，封装<code>Delegate</code></p></li></ul><h3 id="_1-uialertview-的基本封装逻辑" tabindex="-1"><a class="header-anchor" href="#_1-uialertview-的基本封装逻辑" aria-hidden="true">#</a> 1. UIAlertView 的基本封装逻辑</h3><ul><li><strong>组件内封装基本逻辑</strong><ol><li>创建 View、Label、Button 以及分割线</li><li>设置基本的样式、字体大小等</li><li>内置 Button 点击手势，取消隐藏</li></ol></li><li><strong>开发者提供需要展示的数据</strong><ol><li>主标题文字、副标题文字</li><li>按钮文字</li></ol></li><li><strong>将基本逻辑中的可定制业务，封装 Delegate</strong><ol><li>点击按钮之后的业务逻辑</li><li>展示 AlertView 前后的处理逻辑</li></ol></li></ul><h3 id="_2-uikit-使用" tabindex="-1"><a class="header-anchor" href="#_2-uikit-使用" aria-hidden="true">#</a> 2. UIKit 使用</h3><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1e3bd51fe864d1cbbabee7042a50309~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><ol><li><p><strong>提供构建 App 最核心的模块</strong></p><blockquote><p>主要处理提供视图展示内容，以及和用户的交互</p></blockquote></li><li><p><strong>基于 MVC 的设计模式</strong></p><blockquote><p>系统封装视图和逻辑，开发者提供数据驱动</p></blockquote></li><li><p><strong>交互</strong></p><blockquote><p>通过 <code>Delegate</code> 方式或者 <code>Target-Action</code> 方式</p></blockquote></li></ol><h2 id="_17-使用-wkwebview-展示网页与内容" tabindex="-1"><a class="header-anchor" href="#_17-使用-wkwebview-展示网页与内容" aria-hidden="true">#</a> 17.使用 WKWebView 展示网页与内容</h2><h3 id="_1-web-基础知识" tabindex="-1"><a class="header-anchor" href="#_1-web-基础知识" aria-hidden="true">#</a> 1. Web 基础知识</h3><blockquote><p>网络请求 + 解析渲染</p></blockquote><h4 id="_1-历史版本" tabindex="-1"><a class="header-anchor" href="#_1-历史版本" aria-hidden="true">#</a> 1. 历史版本</h4><p><strong>UIWebView(ios 2.0 - 12.0)</strong></p><ul><li>内存系统性泄漏</li><li>系统 OOM 较多</li><li>稳定性较差</li><li>WebCore 和 JSCore Crash 较多</li><li>对 HTML5 和 CSS3 支持较少</li></ul><p><strong>WKWebView(ios 8+)</strong></p><ul><li>独立进程，内存</li><li>Crash 不影响主 App</li><li>对 HTML 和 CSS 更好的支持</li><li>采用 JIT 技术</li></ul><h4 id="_2-使用-wkwebview" tabindex="-1"><a class="header-anchor" href="#_2-使用-wkwebview" aria-hidden="true">#</a> 2. 使用 WKWebView</h4><ul><li><p><strong>WebKit 框架</strong></p><ul><li>WebKit 是一个开源的 Web 浏览器引擎</li><li>对于 iOS 中的 WebKit.framework 就是在 WebCore、底层桥接、JSCore 引擎等核心模块的基础上，针对 iOS 平台的项目封装</li></ul></li><li><p>基本的加载</p><ul><li>通过 configuration 进行基本访问</li><li>加载 URL &amp; HTML</li><li>类比之前的 UIKit 提供基础的功能，在 delegate 中处理业务逻辑</li></ul><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>-(instancetype) initWithFrame:(CGRect)frame configuration:(WKWebViewConfiguration *)configuration;
-(nullable WKNavigation *)loadRequest:(NSURLRequest *)request;
-(nullable WKNavigation *)loadHTMLString:(NSString *)string baseURL:(nullable NSURL *)baseURL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Configuration</p><ul><li>基本的共享 Cookie 设置</li><li>基础偏好设置</li><li>播放视频设置</li><li>默认 JS 注入</li></ul></li></ul><h4 id="_3-wkwebview-delegates" tabindex="-1"><a class="header-anchor" href="#_3-wkwebview-delegates" aria-hidden="true">#</a> 3. WKWebView Delegates</h4><table><thead><tr><th>类别</th><th>回调方式</th><th>说明</th></tr></thead><tbody><tr><td>WKNavigationDelegate</td><td><strong>decidePolicyForNavigationAction</strong></td><td>是否加载请求（scheme 拦截、特殊逻辑、JS 和 Native 通信）</td></tr><tr><td></td><td><strong>didFinishNavigation</strong></td><td>webView 完成加载（业务逻辑）</td></tr><tr><td></td><td><strong>didFailNavigation</strong></td><td>webView 加载失败（loadingView 展示，重试按钮等）</td></tr><tr><td></td><td><strong>webViewWebContentProcessDidTerminate</strong></td><td>webView Crash 回调（自动重新加载）</td></tr><tr><td>WKUIDelegate</td><td><strong>runJavaScriptAlertPanelWithMessag</strong></td><td>处理 alert() 自定义样式</td></tr><tr><td></td><td><strong>runJavaScriptConfirmPanelWithMessage</strong></td><td>处理 confirm() 自定义样式</td></tr><tr><td></td><td><strong>runJavaScriptTextInputPanelWithPrompt</strong></td><td>处理 prompt() 自定义样式</td></tr></tbody></table><h3 id="_2-代码实现-3" tabindex="-1"><a class="header-anchor" href="#_2-代码实现-3" aria-hidden="true">#</a> 2. 代码实现</h3><h4 id="_1-新加载一个页面" tabindex="-1"><a class="header-anchor" href="#_1-新加载一个页面" aria-hidden="true">#</a> 1. 新加载一个页面</h4><ol><li><p>新建 new File =&gt; 选择 Cocoa Touch Class =&gt; next =&gt; 选择 class:<code>GTDetailViewController</code>,Subclass of <code>UIViewController</code> ，这样我们新创建了<code>GTDetailViewController.h</code>和<code>GTDetailViewController.m</code>文件, 实现上节中的列表点击跳转进入</p></li><li><p>修改<code>GTDetailViewController.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTDetailViewController.h&quot;
#import &lt;Webkit/WebKit.h&gt; // 引入 webkit

@interface GTDetailViewController ()
@property(nonatomic,strong,readwrite) WKWebView *webView;
@end

@implementation GTDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  	// 添加 webview
    [self.view addSubview:({
        self.webView = [[WKWebView alloc]initWithFrame:CGRectMake(0, 88, self.view.frame.size.width, self.view.frame.size.height - 88)];
        self.webView;
    })];
  	// 设置 webview 打开地址
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@&quot;https://time.geekbang.org/&quot;]]];
}

@end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改 导航首页 list 页面点击效果</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>#import &quot;GTDetailViewController.h&quot; // 新增

// 修改点击回调方法
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
//    UIViewController *controller = [[UIViewController alloc]init];
//    controller.view.backgroundColor =[UIColor whiteColor];
//    controller.title = [NSString stringWithFormat:@&quot;%@&quot;, @(indexPath.row)];
//    [self.navigationController pushViewController:controller animated:YES];

    GTDetailViewController *controller = [[GTDetailViewController alloc]init];
    controller.view.backgroundColor =[UIColor whiteColor];
    controller.title = [NSString stringWithFormat:@&quot;%@&quot;, @(indexPath.row)];
    [self.navigationController pushViewController:controller animated:YES];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重新运行模拟器，点击列表进行详情，可以看到加载的页面内容</p></li></ol><h4 id="_2-使用-wkwebview-delegates" tabindex="-1"><a class="header-anchor" href="#_2-使用-wkwebview-delegates" aria-hidden="true">#</a> 2. 使用 WKWebView Delegates</h4><ol><li>修改<code>GTDetailViewController.m</code>文件</li></ol><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@interface GTDetailViewController ()&lt;WKNavigationDelegate&gt; // 引入 WKNavigationDelegate

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view addSubview:({
        self.webView = [[WKWebView alloc]initWithFrame:CGRectMake(0, 88, self.view.frame.size.width, self.view.frame.size.height - 88)];
        self.webView.navigationDelegate = self; //  新增加
        self.webView;
    })];
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@&quot;https://time.geekbang.org/&quot;]]];
}
// -------------start:新增加--------------------------------
// 是否加载，使用 decisionHandler 回调方法来进行特殊处理
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    NSLog(@&quot;decidePolicyForNavigationAction&quot;);
    decisionHandler(WKNavigationActionPolicyAllow);
}
// 页面加载完成后的回调
- (void)webView:(WKWebView *)webView didFinishNavigation:(null_unspecified WKNavigation *)navigation{
    NSLog(@&quot;didFinishNavigation&quot;);
}
// -------------end:新增加--------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-总结-使用-wkwebview-流程" tabindex="-1"><a class="header-anchor" href="#_3-总结-使用-wkwebview-流程" aria-hidden="true">#</a> 3. 总结：使用 WKWebView 流程</h4><ol><li>创建 WKWebView</li><li>设置 Delegate 以及样式、JS 注入等</li><li>加载 URL 或者 HTML 字符串</li><li>在相应的回调中处理业务逻辑<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8377a7176224c1abd84fb4e0546b7e8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ol><h3 id="_3-观察者模式" tabindex="-1"><a class="header-anchor" href="#_3-观察者模式" aria-hidden="true">#</a> 3. 观察者模式</h3><ul><li>定义了一中一对多的关系，可以让多个观察者同时监听某一个对象或者对象的属性变化</li><li>被监听的对象在状态变化时，会通知所有的观察者，使他们能够及时的处理业务逻辑</li><li>和代理 delegate 模式的对比</li></ul><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4faa1adfe4c14989882beade48e9e3a2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><h4 id="_1-kvo" tabindex="-1"><a class="header-anchor" href="#_1-kvo" aria-hidden="true">#</a> 1. KVO</h4><blockquote><p>NSKeyValueObserving</p></blockquote><p><strong>注册监听</strong></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>[self.webview addObserver:self forkeyPath:@&quot;estimatedProgress&quot;] options:NSKeyValueObservingOPtionNew contenxt:nil];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>self</code> 作为监听者，接受事件</li><li>监听 <code>self.webview</code> 的 <code>estimatedProgress</code> 事件</li><li>在<code>NSKeyValueObservingOptionNew</code>的时候发通知</li></ul><p><strong>移出监听</strong></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>[self.webview removeObserver:self forKeyPath:@&quot;estimatedProgress&quot;];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>接收通知</strong></p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>-(void)observerValueForKeyPath:(nullable NSString *) keyPath ofObject:(nullable id)object change:(nullable NSDictionary&lt;NSKeyValueChangeKey&gt;, id&gt; *)change context:(nullable void *)context{
  // 业务逻辑
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>change</code> 对应上面的 <code>options</code></li></ul><h4 id="_2-代码实现-4" tabindex="-1"><a class="header-anchor" href="#_2-代码实现-4" aria-hidden="true">#</a> 2. 代码实现</h4><blockquote><p>使用 KVO 监听页面加载进度</p></blockquote><p>修改<code>GTDetailViewController.m</code>文件，内容如下</p><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>@property(nonatomic,strong,readwrite) UIProgressView *uiProgressView; // 新增加一个属性

// 页面卸载时候要移除
-(void)dealloc{
    [self.webView removeObserver:self forKeyPath:@&quot;estimatedProgress&quot;]; // 新增加
}

- (void)viewDidLoad {

    // 新增加一个 进度条
 		[self.webView addSubview:({
    	self.uiProgressView = [[UIProgressView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, 20)];
    	self.uiProgressView;
  	})];

  	// 监听事件
    [self.webView addObserver:self forKeyPath:@&quot;estimatedProgress&quot; options:NSKeyValueObservingOptionNew context:nil];
}

// 触发回调
-(void) observeValueForKeyPath:(nullable NSString *)keyPath ofObject:(nullable id)object change:(NSDictionary&lt;NSKeyValueChangeKey,id&gt; *)change context:(void *)context{
    NSLog(@&quot;监听函数&quot;);
    self.uiProgressView.progress = self.webView.estimatedProgress;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行模拟器，就可以在界面中看到一个进度条，逐渐的进行加载</p><h4 id="_3-kvo-框架" tabindex="-1"><a class="header-anchor" href="#_3-kvo-框架" aria-hidden="true">#</a> 3. KVO 框架</h4><p><strong>系统 KVO 的问题</strong></p><ul><li>需要移除 Crash 风险</li><li>复杂的方法名 &amp; 参数</li></ul><p><strong>常用开源 KVO</strong></p><ul><li>需要移除 Crash 风险</li><li>复杂的方法名 &amp; 参数</li><li><code>Block</code> 处理回调</li><li><code>KVOController</code></li></ul><h3 id="_4-ios-中的-web-应用" tabindex="-1"><a class="header-anchor" href="#_4-ios-中的-web-应用" aria-hidden="true">#</a> 4. iOS 中的 Web 应用</h3><blockquote><p>和浏览器不同，在展示的同时，所以需要和 Native 进行交互</p></blockquote><p><strong>Javascript Native 通信</strong></p><ul><li>JavascriptCore</li><li>JSBridge</li></ul><p><strong>跨平台&amp;热修复</strong></p><p>Weex、Flutter、cordova、Taro、ReacNative、Tagram、Hippy、PICASSO</p><p><strong>业务逻辑</strong></p><ul><li>JS open Api</li><li>模板引擎</li></ul><h2 id="_18-使用动画完善页面的动画" tabindex="-1"><a class="header-anchor" href="#_18-使用动画完善页面的动画" aria-hidden="true">#</a> 18. 使用动画完善页面的动画</h2><h3 id="_1-ios-中的动画" tabindex="-1"><a class="header-anchor" href="#_1-ios-中的动画" aria-hidden="true">#</a> 1. iOS 中的动画</h3><h4 id="_1-core-animation" tabindex="-1"><a class="header-anchor" href="#_1-core-animation" aria-hidden="true">#</a> 1. <strong>Core Animation</strong></h4><ul><li>UIView 动画：渐隐渐显、位置移动</li><li>UIKit 组件自带动画：UITableViewCell 添加删除、UIViewController 切换</li></ul><h4 id="_2-uiview-动画" tabindex="-1"><a class="header-anchor" href="#_2-uiview-动画" aria-hidden="true">#</a> 2. UIView 动画</h4><blockquote><p>UIView 内置动画封装 UIViewAnimationWithBlocks</p></blockquote><ul><li>解决日常开发 80% 以上的动画效果</li><li>处理基本的 Frame、Alpha、Transform</li><li><strong>不能自定义中间过程</strong></li><li>实现只需要两步 <ol><li>设置动画参数(时间、参数)</li><li>动画终止时属性的最终值</li></ol></li></ul><div class="language-objective-c line-numbers-mode" data-ext="objective-c"><pre class="language-objective-c"><code>+(void) animateWithDuration:(NSTimeInterval) duration // 动画时间
  delay:(NSTimeInterval) delay 	// 动画延迟
  usingSpringWithDamping:(CGFloat)dampingRation // 阻尼系数
  initialSpringVelocity:(CGFloat)velocity	// 回弹系数
  options:(UIViewAnimationOptions) options // 动画效果（有很多系统可定义的，最常用的比如 easeInOut、easeIn、easeOut）
  animations:^{
  	// 添加动画最终样式
	}completion:^(BOOL finished){
    // 动画结束之后逻辑
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,255);function b(m,w){const l=a("ExternalLinkIcon");return d(),o("div",null,[c,e("p",null,[e("a",v,[r("Xcode 11 版本纯代码设置 window.rootviewController"),t(l)])]),u])}const g=n(s,[["render",b],["__file","01.html.vue"]]);export{g as default};
