# 初始化

##1. 集成准备
####1.1 注册开放平台账号

在<a href="https://open.clife.cn/#/home">C-Life开发平台</a>注册开发者账号，创建应用完善详细资料。此部分请参考《C-Life开发平台使用手册》。

## 2. 下载C-Life iOS SDK文件，并且配置工程
####2.1 确认本机安装的cocoapods能正常工作

```
pod --help 

```

####2.2 编辑Podfile文件

```
pod 'HETOpenSDK','0.1.1'

```

####2.3 安装

以下两种方式任选一种就可以：

```
1.pod install 
2.pod update 

```

## 3. 导入硬件模组对应的SDK
####3.1 根据产品类型找到对应的芯片模组名称，如下：
![](/assets/查看芯片模组类型.png)
####3.2 在podfile中导入对应的sdk，并且安装，对应类表如下：

```
# TI-WiFi模组
pod 'HETPublicSDK_WiFiModule_TI_CC3200R2',      '1.0.0'
# 汉枫-WiFi模组
pod 'HETPublicSDK_WiFiModule_HF_LPT100_V3',     '1.0.0'
# 科中龙-WiFi模组
pod 'HETPublicSDK_WiFiModule_Realtek8711AF',    '1.0.0'
# 信驰达-WiFi模组
pod 'HETPublicSDK_WiFiModule_MTK7681',          '1.0.0'
# 信驰达-WiFi模组
pod 'HETPublicSDK_WiFiModule_MTK7687',          '1.0.1'
# 新力维-WiFi模组
pod 'HETPublicSDK_WiFiModule_NL6621',           '1.0.0'
# 乐鑫-WiFi模组
pod 'HETPublicSDK_WiFiModule_ESP8266',          '1.0.0'
# COOEE-WiFi模组
pod 'HETPublicSDK_WiFiModule_COOEE',            '1.0.0'
# MarvellV2-WiFi模组
pod 'HETPublicSDK_WiFiModule_Marvell_MW300_V2', '1.0.0'

```
**备注**：在使用了Wifi模组后，就不再支持模拟器调试。

### 四. 注册使用SDK

####4.1 在AppDelegate中如下地方添加，注册使用SDK，打开Log

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
   // 1.注册HET开发平台SDK
   [HETOpenSDK registerAppId:@"yourAPPId" appSecret:@"yourAPPSecret"];
   [HETOpenSDK openLog:YES];
   return YES;
}

```

**yourAPPId**、**yourAPPSecret** 的值是在“应用创建”时生成的 **AppID**、**AppSecret**。 在如下图查看: 


![](/assets/获取appkeyandappsecrect.jpg)

**注意**:如果网络请求出现AppID不合法，请检查Xcode工程里面的BundleId和appId，必须跟在开放平台创建应用时填的BundleId和AppID保持一致。



