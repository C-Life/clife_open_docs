#iOS SDK 概述

## 目录
<!-- MarkdownTOC depth=4 autolink=true bracket=round -->

- [一、 设备接入SDK概述](#概述)
- [二、 SDK初始化](#SDK初始化)
- [三、 SDK授权](#SDK授权)
- [四、 SDK第三方登录](#SDK第三方登录)
- [五、 SDK设备扫描绑定](#SDK设备扫描绑定)
- [六、 SDKWIFI设备的控制](#WIFI设备的控制)
- [七、 SDK蓝牙设备的控制](#SDK蓝牙设备的控制)
- [八、 SDK设备的分享](#SDK设备的分享)
- [九、 其他接口](#业务性接口)










<span id="概述"></span>
## 一、设备接入SDK概述


###1. SDK功能简介
clife开放平台（以下简称开放平台）设备接入的SDK封装了clife对外开放的服务接口，以及手机与智能硬件通讯接口。包括用户模块，设备绑定模块，设备控制模块和其他的开放平台接口。开发者不需要关注这些模块的具体内部逻辑，只需要根据自己的业务需求编写界面和调用SDK接口就可以完成APP的快速开发。

###2. SDK的总体框架
![](/assets/SDK架构图.jpg)

###3. 相关名词定义


####3.1 大循环

智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。

####3.2 productId

设备产品号，设备在开放平台管理系统录入设备的时候，系统会根据设备录入的设备大类、设备小类、客户代码、DeviceKey、设备编码生成一个productId，可在开放平台管理系统上看到。

####3.3 deviceId

设备号，当一个设备通过设备绑定的接口初次接入开放平台时，开放平台会自动根据productId以及设备的mac地址为此设备注册一个deviceId，此deviceId全网唯一，用于通过开放平台进行设备的操作。



<span id="SDK初始化"></span>
## 二、初始化
###1. 注册开放平台账号

在<a href="https://open.clife.cn/#/home">C-Life开发平台</a>注册开发者账号，创建应用完善详细资料。此部分请参考《C-Life开发平台使用手册》。

![](/assets/注册开放平台账号1.png)


###2. 下载C-Life iOS SDK文件，并且配置工程
####2.1 确认本机安装的cocoapods能正常工作

```
pod --help 

```

####2.2 编辑Podfile文件

```
pod 'HETOpenSDK','2.0.0'

```

####2.3 安装

以下两种方式任选一种就可以：

```
pod install 
pod update 

```

###3. 导入硬件模组对应的SDK
####3.1 根据产品类型找到对应的芯片模组名称，如下：
![](/assets/查看芯片模组类型.png)
####3.2 在podfile中导入对应的sdk，并且安装，对应类表如下：

```
source 'https://github.com/C-Life/HETSDKSpecs.git'
source 'https://github.com/CocoaPods/Specs.git'

##支持真机调试和模拟器调试
# 汉枫-WiFi模组
pod 'HETPublicSDK_WiFiModule/HF_LPT100_V3','1.0.0'
# 乐鑫-WiFi模组
pod 'HETPublicSDK_WiFiModule/ESP8266','1.0.0'
# COOEE-WiFi模组
pod 'HETPublicSDK_WiFiModule/COOEE','1.0.0'
# MarvellV2-WiFi模组
pod 'HETPublicSDK_WiFiModule/Marvell_MW300_V2','1.0.0'

##支持真机调试
# TI-WiFi模组
pod 'HETPublicSDK_WiFiModule/TI_CC3200R2',     '1.0.0'
# 科中龙-WiFi模组
pod 'HETPublicSDK_WiFiModule/Realtek8711AF',     '1.0.0'
# 信驰达-WiFi模组
pod 'HETPublicSDK_WiFiModule/MTK7681',     '1.0.0'
# 信驰达-WiFi模组
pod 'HETPublicSDK_WiFiModule/MTK7687',     '1.0.0'
# 新力维-WiFi模组
pod 'HETPublicSDK_WiFiModule/NL6621',     '1.0.0'

```
**备注**：在使用了Wifi模组后，就不再支持模拟器调试。

###4. 注册使用SDK
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


<span id="SDK授权"></span>
## 三、授权登录

参考`HETAuthorize`类里面方法,调用`authorizeWithCompleted`接口会弹出授权登录的界面，登录成功后接口返回openId（授权用户唯一标识）可用于与自己平台的账户体系关联。

###1. 授权登录



【示例代码】

```
 HETAuthorize *auth = [[HETAuthorize alloc] init];
 self.auth = auth;
 if (![self.auth isAuthenticated]) {
      [self.auth authorizeWithCompleted:^(NSString *openId, NSError *error) {
    }];    
  }
```
![](/assets/登录授权界面.png)

###2. 取消授权登录，退出当前账号

【示例代码】


```
// 在授权登录成功的情况才执行操作
if ([self.auth isAuthenticated]) {
   [self.auth unauthorize];
}
```

###3. 获取用户信息

【示例代码】
```
WEAKSELF
[HETAuthorize getUserInformationSuccess:^(id responseObject) {

} failure:^(NSError *error) {
      NSLog(@"error ==%@",error);
}];
```

接口返回的结果数据

```
{
 "code":0,
 "data":{
    "userId": "d09f572c60ffced144d6cfc55a6881b9",   
    "userName": "葫芦娃",
    "email":"",
    "phone":"",
    "sex": 1,
    "birthday": "2014-12-31",
    "weight": 48000,
    "height": 163,
    "avatar": "",
    "city": "深圳"
 }
}
```

![](/assets/获取用户信息图片.png)

### 4. 修改密码

【示例代码】

```
HETAuthorize  *auth = [[HETAuthorize alloc]init];
[auth changePasswordSuccess:^(id responseObject) {
         
} failure:^(NSError *error) {
       
}];
```
![](/assets/我的界面.png)

                   
###5. 异地登录、accessToken过期通知

开放平台的账号只能在一台设备上面登录。当有账号在另一台设备登录时，SDK会抛出一个HETLoginOffNotification消息。 开发者可以在首页监听这个消息，处理异地登录的逻辑。 
例：

【示例代码】
```
[[NSNotificationCenter defaultCenter] addObserver:self 
selector:@selector(XXX) name:HETLoginOffNotification object: nil];
```


<span id="SDK第三方登录"></span>
## 四、第三方登录


###1. 申请各平台的App key和App secret
注意：app bundleId跟各平台注册的时候一致。

<a href="https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417694084&token=&lang=zh_CN">微信接入地址</a>

###2. 导入SDK 

```
pod 'WechatOpenSDK', '1.7.7'
pod 'WeiboSDK', '3.1.3'
pod 'TencentOpenApiSDK', '2.9.5'
```

###3. 项目配置


####3.1 URLScheme 配置

![](/assets/第三方登录URLTypes.jpeg)
####3.2 针对iOS9+，添加白名单
在info.plist文件中加入 LSApplicationQueriesSchemes

![](/assets/第三方登录白名单.jpeg)

```
<key>LSApplicationQueriesSchemes</key>
 <array>
    <!-- 微信 URL Scheme 白名单-->
    <string>wechat</string>
    <string>weixin</string>

    <!-- 新浪微博 URL Scheme 白名单-->
    <string>sinaweibohd</string>
    <string>sinaweibo</string>
    <string>sinaweibosso</string>
    <string>weibosdk</string>
    <string>weibosdk2.5</string>

    <!-- QQ、Qzone URL Scheme 白名单-->
    <string>mqqapi</string>
    <string>mqq</string>
    <string>mqqOpensdkSSoLogin</string>
    <string>mqqconnect</string>
    <string>mqqopensdkdataline</string>
    <string>mqqopensdkgrouptribeshare</string>
    <string>mqqopensdkfriend</string>
    <string>mqqopensdkapi</string>
    <string>mqqopensdkapiV2</string>
    <string>mqqopensdkapiV3</string>
    <string>mqzoneopensdk</string>
    <string>wtloginmqq</string>
    <string>wtloginmqq2</string>
    <string>mqqwpa</string>
    <string>mqzone</string>
    <string>mqzonev2</string>
    <string>mqzoneshare</string>
    <string>wtloginqzone</string>
    <string>mqzonewx</string>
    <string>mqzoneopensdkapiV2</string>
    <string>mqzoneopensdkapi19</string>
    <string>mqzoneopensdkapi</string>
    <string>mqzoneopensdk</string>
    
</array>

```

####3.4 针对iOS9默认使用https,现在先还原成http请求方式。

  在Info.plist中添加NSAppTransportSecurity类型Dictionary。

 在NSAppTransportSecurity下添加NSAllowsArbitraryLoads类型Boolean,值设为YES    

  第一步：在plist中添加NSAppTransportSecurity项，此项为NSDictionary

  第二步：在NSAppTransportSecurity下添加   NSAllowsArbitraryLoads类型为Boolean，value为YES
  
###4. 接入HETOpenSDK 第三方登录


####4.1 在appdelegate.m中，添加代码

第一步：注入appkey

【示例代码】
	
```
[HETOpenSDK setPlaform:HETAuthPlatformType_QQ appKey:QQ_APP_ID appSecret:nil redirectURL:nil];
[HETOpenSDK setPlaform:HETAuthPlatformType_Weibo appKey:WB_APP_KEY appSecret:nil redirectURL:nil];
[HETOpenSDK setPlaform:HETAuthPlatformType_Wechat appKey:WX_APP_KEY appSecret:WX_APP_SECRET redirectURL:nil];
  
```


第二步：添加请求方法

【示例代码】
	
```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    BOOL result = [HETOpenSDK application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
   	 return result;
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
   	BOOL result = [HETOpenSDK handleOpenURL:url];
   	return result;
}
```

<span id="SDK设备扫描绑定"></span>
## 五、设备绑定

### 1. 绑定概述

#### 1.1 绑定流程
![](/assets/绑定流程介绍.png)

#### 1.2 设备分类
从设备层级上分为 **设备大类** 和 **设备小类**。例如，冰箱是大类，冰箱下有Clife智能冰箱，即小类。

从设备类型上分为 **蓝牙设备** 和 **wifi设备**，当我们拿到 **设备的信息** 的时候，就能区别设备是wifi设备还是蓝牙设备。

wifi设备绑定方式为 **smartLink绑定 **或者 **AP绑定**；蓝牙设备绑定方式为 **蓝牙绑定**。

smartLink 、AP和蓝牙绑定凡是是根据 **moduleType **来区分，如下图所示：

moduleType | 绑定类型
------------- |-------------
1 | wifi设备 SmartLink绑定
2 | 蓝牙设备
9 | wifi设备 AP绑定

蓝牙设备暂时只有一种绑定方式（蓝牙绑定）


	
### 2. 获取设备信息
####2.1 扫描二维码获取设备信息
##### 2.1.1 二维码命名规则
	
二维码命名规则：

```
http://open.clife.net/v1/web/open/product?param={"a":产品id}
```
	
##### 2.1.2 获取产品ID

```
扫一扫内容：
urlStr: http://open.clife.net/v1/web/open/product?param={"a":3531}

```

```
"a":3531 3531 即是 产品ID
```
##### 2.1.3 根据产品ID获取设备信息
获取产品信息，区分设备绑定类型。

【示例代码】

```
WEAKSELF
[HETDeviceRequestBusiness fetchDeviceInfoWithProductId:productId success:^(id responseObject) {

    if ([[responseObject allKeys] containsObject:@"data"]) {
         NSDictionary *dataDict = [responseObject valueForKey:@"data"];

       HETDevice *device = [HETDevice mj_objectWithKeyValues:dataDict];
       // wifi绑定
       if ([device.moduleType integerValue] == 1 
       || [device.moduleType integerValue] == 9) {
                        }
       // 蓝牙绑定
       if ([device.moduleType integerValue] == 2) {

       }
  }
} failure:^(NSError *error) {
       
       
}];

```

![](/assets/产品详细信息.jpg)

* 到此，在上图中已经获取到 **productId**、**moduleType**、deviceTypeId、deviceSubTypeId 可以进行设备绑定。




####2.2 通过大类小类获取设备信息


##### 2.2.1 获取设备大类列表

在 **HETDeviceRequestBusiness** 查询设备信息获取相关接口

【示例代码】


```

[HETDeviceRequestBusiness fetchDeviceTypeListSuccess:^(id responseObject) 
{

} failure:^(NSError *error) {

}];

```

![](/assets/查询设备大类接口返回结果.jpg)


##### 2.2.2 通过大类ID，获取设备小类

【示例代码】

```

[HETDeviceRequestBusiness fetchDeviceProductListWithDeviceTypeId:
[NSString stringWithFormat:@"%@",deviceTypeId] success:^(id responseObject) {

} failure:^(NSError *error) {

}];

```

![](/assets/根据大类获取设备支持的产品类型返回.png)

![](/assets/通过大类获取支持设备类型返回字段说明.png)

>到此，在上图中已经获取到 **productId**、**moduleType**、deviceTypeId、deviceSubTypeId 可以进行设备绑定。

### 3. Wifi设备绑定方式介绍：

####3.1 smartLink绑定

>在开始配置前，设备要先进入配置模式，然后APP发送要配置的路由器ssid和密码，开启扫描设备服务将扫描到的设备进行绑定，获取绑定结果。


第一步：获取路由器ssid和密码

第二步：传入参数产品ID **productId**，**路由器ssid** 和 **密码**，启动绑定流程

![](/assets/UML_smartLink绑定流程图.jpg)

####3.2 AP绑定

>在开始配置前，设备进入配置模式后，会产生一个Wifi热点。手机连接设备热点，将发送要配置的路由器ssid和密码给设备，然后APP将配置信息给设备，之后设备自行于服务器绑定，APP想服务器查询绑定状态。

>使用C-life提供的模组固件，设备产生的Wifi热点以“HET-xxx”开头，没有密码。其他厂商提供的模组，SoftAP热点名称由各自厂商指定。

AP绑定的交互流程：

第一步：获取路由器ssid和密码

第二步：手机连接路由器热点

第三步：手机切换设备热点

第四步：传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**、**路由器ssid** 和 **密码**，启动绑定流程

![](/assets/UML_设备绑定流程图.jpg)

####3.3 蓝牙设备绑定流程
第一步：传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**，初始化
第二步：启动绑定流程

![](/assets/UML_蓝牙设备绑定.jpg)




###4. 绑定

####4.1 wifi设备的smartLink绑定

#####4.1.1 通过 **HETWIFIBindBusiness** 获取路由器ssid

【示例代码】


```
NSString  *macAddr = [[HETWIFIBindBusiness sharedInstance] fetchmacSSIDInfo];

```
#####4.1.2 传入参数，通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

【示例代码】


```
[[HETWIFIBindBusiness sharedInstance] 
startSmartLinkBindDeviceWithProductId:[NSString stringWithFormat:@"%@",self.device.productId]
                             withSSID:self.ssid withPassWord:self.password withTimeOut:timeOut
                          bindHandler:^(HETWiFiDeviceBindState state, HETDevice *deviceObj, NSError *error) {
       NSLog(@"HETWiFiDeviceBindState: %ld", state);
       
		if (error) {
		 			// 扫描失败
		}else{
		            // 扫描成功
		}

}];

```

###4.2 wifi设备的AP绑定
####4.2.1 校验用户是否连接设备


设备AP热点命名规则: `radiocastName_deviceTypeId_deviceSubtypeId`

当判断用户已经成功连接设备AP热点，即可进入绑定流程。


####4.2.2 通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

【示例代码】


```

NSString *productId = [NSString stringWithFormat:@"%@",self.device.productId];
NSString *typeId = [NSString stringWithFormat:@"%@",self.device.deviceTypeId];
NSString *subTypeId = [NSString stringWithFormat:@"%@",self.device.deviceSubtypeId];

[[HETWIFIBindBusiness sharedInstance] startAPBindDeviceWithProductId:productId 
 				                                    withDeviceTypeId:typeId 
                                                 withDeviceSubtypeId:subTypeId 
  															withSSID:self.ssid 
  														withPassWord:self.password 
  														withTimeOut:timeOut 
  bindHandler:^(HETWiFiDeviceBindState state, HETDevice *deviceObj, NSError *error) {
        OPLog(@"HETWiFiDeviceBindState: %ld", state);
        
        if (error) {
           
        }else{
        		 [weakSelf doSomeThingWithState:state deviceObj:deviceObj];
        }    
}];

```

###4.3 蓝牙设备的绑定

蓝牙的扫描绑定主要看**HETBLEBusiness**相关接口

####4.3.1 初始化HETBLEBusiness对象，启动绑定流程

【示例代码】


```
//初始化蓝牙设备的业务类，需要设备的productId，deviceTypeId，deviceSubtypeId
self.bleBusiness = [[HETBLEBusiness alloc]initWithProductId:self.productId.integerValue 
deviceTypeId:self.deviceTypeId.integerValue 
deviceSubtypeId:self.deviceSubtypeId.integerValue];
```

开始扫描蓝牙设备，扫描到的蓝牙设备，用tableView显示出来，给用户选择。

【示例代码】


```
WEAKSELF
[self.bleBusiness scanForPeripheralsWithTimeOut:timeOut name:nil mac:nil scanForPeripheralsBlock:^(NSArray<CBPeripheral *> *peripherals, NSError *error) {
if (error) {
	// 停止扫描
	return;
}
if (peripherals) {
	// 返回一个设备数组
	[peripherals enumerateObjectsUsingBlock:^(id _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
	// 过滤重复的设备，并且刷新蓝牙设备列表
	}];
	return;
}
}];

```

####4.3.2 绑定设备

选择需要绑定的设备，启动绑定流程。

【示例代码】


```
[self.bleBusiness bindBleDeviceWithPeripheral:cbp macAddress:nil completionHandler:^(NSString *deviceId, NSError *error) {
[weakself.bleBusiness disconnectWithPeripheral:cbp];
if(error) {
// 填写绑定失败的代码
}
else
{
// 填写绑定成功的代码
}
}];
```

<span id="WIFI设备的控制"></span>
##六、WIFI设备控制

参考`HETDeviceControlBusiness`类里面方法，实现设备控制和运行状态的监听。

参考`HETDeviceRequestBusiness`类里面的方法，获取设备的信息。


控制设备的流程如下：		
第一步：获取已绑定的设备列表，获取设备信息（`HETDevice`）。

第二步：根据获取的设备信息，监听设备状态，控制设备。
	



### 1、获取绑定设备列表

绑定成功后，用户可以获取绑定成功的设备列表，获取到设备列表拿到设备的HETDevice设备信息才可以控制设备

【示例代码】


```
[HETDeviceRequestBusiness fetchAllBindDeviceSuccess:^(NSArray<HETDevice *> *deviceArray) {
        NSLog(@"responseObject ==%@",deviceArray);
} failure:^(NSError *error) {
        NSLog(@"error ==%@",error);
}];

```

![](/assets/设备绑定返回参数.png)

### 2、监听设备状态

####2.1、初始化 

初始化HETDeviceControlBusiness的实例对象，传递需要监听的设备信息作为参数，监听block的回调信息，做相应的业务逻辑。对于运行数据、控制数据、错误数据的内容，请参考具体设备的配置协议内容。

【示例代码】


```
- (HETDeviceControlBusiness *)controlBusiness
{
    if (!_controlBusiness) {
        WEAKSELF
        _controlBusiness = [[HETDeviceControlBusiness alloc]initWithHetDeviceModel:self.device deviceRunData:^(id responseObject) {
			  // 监听设备运行数据，responseObject请具体参考协议配置。
            OPLog(@"deviceRunData:%@ " ,responseObject);

        } deviceCfgData:^(id responseObject) {
 			 // 监听设备控制数据
            OPLog(@"deviceCfgData:%@ " ,responseObject);
         
        } deviceErrorData:^(id responseObject) {
            // 监听设备错误数据
            OPLog(@"deviceErrorData:%@ " ,responseObject);
         
        } deviceState:^(HETWiFiDeviceState state) {
            // 监听设备在线状态数据
            OPLog(@"deviceState:%ld " ,(long)state);  //deviceState:2

        }];
    }
    return _controlBusiness;
}

```

####2.1、启动监听服务

【示例代码】

```
- (void)viewWillAppear:(BOOL)animated
{

    [self.controlBusiness start];
}


```


####2.3、停止监听服务

【示例代码】


```
- (void)viewWillDisappear:(BOOL)animated
{

    [self.controlBusiness stop];
}

```

### 3、设备控制

设备控制流程入下：
![](/assets/UML_WIFI设备控制.jpg)

【示例代码】


```
- (void)configDataSetWithColorTemp:(NSDictionary *)dict{

    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:nil];
    NSString * jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    [self.controlBusiness deviceControlRequestWithJson: jsonStr withSuccessBlock:^(id responseObject) {
        NSLog(@"responseObject = %@",responseObject);

    } withFailBlock:^(NSError *error) {
        NSLog(@"error = %@",error);

	}];
}

```

关于updateflag

这个修改标记位是为了做统计和配置下发的时候设备执行相应的功能。下发数据必须传递updateflag标志

例如，空气净化器（广磊K180）配置信息协议：

紫外线(1)、负离子(2)、臭氧(3)、儿童锁(4)、开关(5)、WiFi(6)、过滤网(7)、模式(8)、定时(9)、风量(10) 上面一共上10个功能，那么updateFlag就2个字节，没超过8个功能为1个字节，超过8个为2个字节，超过16个为3个字节，以此类推。

打开负离子，2个字节，每一个bit的值为下：

0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0


### 4、设备管理

####4.1、解绑设备
设备删除有2中情况,需要自己根据设备分享类型（device.share）来区分：
 第一种：设备是用户自己绑定的设备。调用`unbindDeviceWithDeviceId: success: failure:`来解除绑定。
 
 【示例代码】

```

 [HETDeviceRequestBusiness unbindDeviceWithDeviceId:device.deviceId success:^(id responseObject) {

        } failure:^(NSError *error) {
           
}];
```

第二种：设备是别人分享的过来的设备。调用HetDeviceShareApi.getInstance().deviceDel()方法来解绑分享关系。 

【示例代码】


```
[HETDeviceShareBusiness deviceAuthDelWithDeviceId:device.deviceId userId:@"" success:^(id responseObject) {
        
   } failure:^(NSError *error) {

}];
```

####4.2、修改设备信息

修改设备信息，用户可以修改设备的名称

【示例代码】

```
NSString *deviceId=self.hetDeviceModel.deviceId;
[HETDeviceRequestBusiness updateDeviceInfoWithDeviceId:deviceId
 deviceName:@"123fsdg" roomId:@"12" success:^(id responseObject) {
        
} failure:^(NSError *error) {
        
}];

```

<span id="SDK蓝牙设备的控制"></span>
##七、蓝牙设备控制 

蓝牙设备控制，参考`HETBLEBusiness`类里面的方法和实现。

###1. 设备控制流程
第一步、获取已绑定的设备列表，从中获取某个设备信息 **HETDevice**。

第二步、 根据获取的设备信息，监听设备状态，控制设备。

![](/assets/UML_蓝牙设备控制.jpg)

####1.1 获取绑定设备列表

【示例代码】

```
[HETDeviceRequestBusiness fetchAllBindDeviceSuccess:^(NSArray<HETDevice *> *deviceArray) {
        NSLog(@"responseObject ==%@",deviceArray);

} failure:^(NSError *error) {
        NSLog(@"error ==%@",error);

}];

```


###2. 控制和监听设备

####2.1 初始化

【示例代码】

```
- (void)setDevice:(HETDevice *)device
{
    _device = device;
    // 设备控制需要的设备信息
    _macAddress = device.macAddress;
    _deviceType = device.deviceTypeId.integerValue;
    _deviceSubType = device.deviceSubtypeId.integerValue;
    _productId = device.productId.integerValue;
    _deviceId = device.deviceId;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    if(!_bleBusiness)
    {
        _bleBusiness=[[[HETBLEBusiness alloc]init]initWithProductId:self.productId
         deviceTypeId:self.deviceType deviceSubtypeId:self.deviceSubType];
        
    }
}
    
```

####2.2 监听获取设备状态

【示例代码】

```
WEAKSELF;
[_bleBusiness fetchStatusDataWithPeripheral:self.blePeripheral 
macAddress:self.macAddress deviceId:self.deviceId 
completionHandler:^(CBPeripheral *currentPeripheral,NSDictionary *dic, NSError *error) {
    STRONGSELF;
    strongSelf.blePeripheral=currentPeripheral;
    NSLog(@"状态数据:%@,%@",dic,error);
    if(dic)
    {  
        uint8_t state ;
        UInt8 color;
        NSString *colorStr=dic[@"LED"];
        NSString *stateStr=dic[@"LIGHT"];
        color=colorStr.intValue;//@"MIST":@"0",@"LIGHT":@"1",@"LED"
        state=stateStr.intValue;
        strongSelf->ledColor = color%9;
        strongSelf->ledState = state;
        if (state == 3) {
            [strongSelf changeLED_color:0];//灯是关掉的
        }else if(state == 1) {
            [strongSelf changeLED_color:color];
        }    
    }
}];
```
####2.3 控制设备

【示例代码】


```
[_bleBusiness deviceControlRequestWithPeripheral:self.blePeripheral 
macAddress:self.macAddress 
sendDic:@{@"LED":@(ledColor %9)} 
completionHandler:^(CBPeripheral *currentPeripheral,NSError *error) {
    STRONGSELF;
    strongSelf.blePeripheral=currentPeripheral;
    NSLog(@"数据发送回调:%@",error);    
}];
```

###3. 设备升级
* 从平台上传最新硬件版本
* 从服务器获取设备最新版本
* 下发最新版本给蓝牙设备

####3.1 上传包文件
第一步：登录开发平台，进去产品页面
![](/assets/蓝牙固件升级入口.png)
第二步：填写最新版本和选择包文件并且上传

![](/assets/蓝牙升级外部版本计算规则.png)

####3.2 app检查固件版本，是否存在固件更新

【示例代码】

```
// 获取最新版本
[HETDeviceUpgradeBusiness deviceUpgradeCheckWithDeviceId:self.deviceId success:^(HETDeviceVersionModel * deviceVersionModel) {
        //        deviceVersionId = 2024;
        //        filePath = "http://200.200.200.58:8981/group1/M00/0D/83/yMjIOlj4drWAeBL-AAB2rNrxQug170.bin";
        //        newDeviceVersion = "V1.1.2";
        //        oldDeviceVersion = "1.0.0";
        //        releaseNote = "\U6d4b\U8bd5\U7528\U4f8b\Uff0c\U56fa\U4ef6\U5347\U7ea7";
        //        status = 1;
        if(deviceVersionModel.newDeviceVersion&&![deviceVersionModel.newDeviceVersion isEqualToString:deviceVersionModel.oldDeviceVersion])//有新固件
        {
           // 填写固件升级相关代码  
        }else{
           // 填写没有新固件升级提示 
        }
} failure:^(NSError *error) {
    NSLog(@"获取硬件版本信息错误:%@",error);
}];
```

####3.3 固件升级，下发最新版本给蓝牙设备

【示例代码】


```
[_bleBusiness mcuUpgrade:self.blePeripheral macAddress:self.macAddress deviceVersionModel:deviceVersionModel progress:^(float progress) {
    //升级进度
    hud.progress=progress;
} completionHandler:^(CBPeripheral *currentPeripheral,NSError *error) {
    if(error)
    {
    // 填写固件升级失败的处理
    }
    else
    {
    // 填写固件升级成功的处理
    }
}];
```

<span id="SDK设备的分享"></span>
##八、IOS 设备分享

C-Life设备分享分为面对面分享和第三方应用分享,分享相关接口请参考`HETDeviceShareBusiness`


###1、分享流程
* 面对面分享：

A用户打开APP设备面对面分享产生一个分享二维码，
B用户打开APP的扫一扫，直接获取设备的控制权限。

* 第三方应用分享：

A用户打开APP设备第三方应用分享（微信，QQ），例如分享到微信好友，
B用户识别微信中的二维码，打开分享网页，尝试打开APP成功即获取设备的控制权限，失败就提示用户B下载APP。

 **注意：**
 
 1、URL scheme
 
 * 第三方分享需要APP提供URL scheme，方便web页面打开APP，并且传递分享码给APP。
 
 
2、分享码有效期
 
 * 面对面分享码有效期为10分钟
 * 第三方分享码有效期为一个小时

###2、面对面分享
第一步：请求分享码，并生成分享二维码

第二步：验证分享码，获取设备权限

![](/assets/UML_设备分享_面对面.jpg)


###3、第三方应用分享

第一步：请求分享连接，分享到第三方应用

第二步：第三方应用打开连接，web页面尝试打开APP

第二步：验证分享码，获取设备权限

![](/assets/UML_设备分享_第三方.jpg)



###4、接口说明

####1、分享

#####1.1、获取设备分享码

【示例代码】

```
weakSelf
[HETDeviceShareBusiness getShareCodeWithDeviceId:self.deviceId shareType:HETDeviceShareType_ThirthShare success:^(id responseObject) {

            OPLog(@"responseObject == %@",responseObject);
            NSString *h5Url = [responseObject valueForKey:@"h5Url"];
       
      } failure:^(NSError *error) {
            OPLog(@"error == %@",error);
       
}];
```

参数说明

| 参数名称	| 是否必须 |	字段类型 |	参数说明          |
|----------|----------|---------|-----------------|
| deviceId | 是       | NSString|  设备ID          |
| shareType | 是       | HETDeviceShareType |  分享类型           |

####1.2、获取设备权限
#####1.2.1  本地扫描二维码获取设备权限。
【示例代码】

```
[HETDeviceShareBusiness authShareDeviceWithShareCode:shareCode shareType:HETDeviceShareType_FaceToFaceShare success:^(id responseObject) {

} failure:^(NSError *error) {

}];

```

#####1.2.2  微信、微博、QQ分享，通过浏览器打开APP获取设备控制权限。
【示例代码】

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    // 将URL转成字符串
    NSString *urlString = url.scheme;
    if ([urlString isEqualToString:@"hetopenplatform"]) {
        NSString *shareCode = [[url.host  componentsSeparatedByString:@"="] lastObject];
        [HETDeviceShareBusiness authShareDeviceWithShareCode:shareCode shareType:HETDeviceShareType_ThirthShare success:^(id responseObject) {
            OPLog(@"responseObject == %@",responseObject);
            [HETCommonHelp showHudAutoHidenWithMessage:@"获取设备权限成功"];
            [[NSNotificationCenter defaultCenter] postNotificationName:BindDeviceSuccess object:nil];

        } failure:^(NSError *error) {
            OPLog(@"error == %@",error);
            [HETCommonHelp showHudAutoHidenWithMessage:[error.userInfo valueForKey:@"NSLocalizedDescription"]];
        }];
        return YES;
    }else{
        BOOL result = [HETOpenSDK application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
        return result;
    }
}
                            
```


参数说明

| 参数名称	| 是否必须 |	字段类型 |	参数说明          |
|----------|----------|---------|-----------------|
| shareCode | 是       | NSString|  设备分享码          |
| shareType | 是       | HETDeviceShareType |  分享类型           |


####2.获取设备授权的用户列表

【示例代码】


```
[HETDeviceShareBusiness deviceGetAuthUserWithDeviceId:self.deviceId success:^(id responseObject) {
        OPLog(@"responseObject == %@",responseObject);
} failure:^(NSError *error) {
        OPLog(@"error == %@",error);
}];
```

####3.用户设备授权删除

【示例代码】

```

WEAKSELF
[HETDeviceShareBusiness deviceAuthDelWithDeviceId:self.deviceId userId:userId success:^(id responseObject) {

} failure:^(NSError *error) {

}];
    
```
## 九、其他接口

** 其他接口指业务性接口，如意见反馈、常见问题、隐私政策、版本声明 等 **

** 使用方法：用户选择对应的requestUrl作参数，调用sdk提供的通用接口 **

** 通用接口如下：**
```
/**
 *  普通网络请求
 *
 *  @param method     HTTP网络请求方法
 *  @param requestUrl 网络请求的URL
 *  @param params     请求参数
 *  @param needSign   是否需要签名
 *  @param success    网络请求成功的回调
 *  @param failure    网络请求失败的回调
 */
+(void)startRequestWithHTTPMethod:(HETRequestMethod)method
                   withRequestUrl:(NSString *)requestUrl
                    processParams:(NSDictionary *)params
                         needSign:(BOOL)needSign
                 BlockWithSuccess:(successBlock)success
                          failure:(failureBlock)failure
```
**requestUrl说明**


| requestUrl |   参数说明   |
|------------------|------------------|
| /v1/feedback/addFeedback | 意见反馈       |
| 暂未开放 | 常见问题       |
| 暂未开放 | 隐私政策       |
| 暂未开放 | 版本声明       |


### 1.意见反馈
【示例代码】
```
WEAKSELF
[HETDeviceRequestBusiness startRequestWithHTTPMethod:HETRequestMethodPost withRequestUrl:@"/v1/feedback/addFeedback" processParams:params needSign:NO BlockWithSuccess:^(id responseObject) {
[HETCommonHelp hideHudFromView:weakSelf.view];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [HETCommonHelp showHudAutoHidenWithMessage:@"提交成功，谢谢您的反馈"];
    });
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.5f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [weakSelf.navigationController  popViewControllerAnimated: YES];
    });
} failure:^(NSError *error) {
    [HETCommonHelp hideHudFromView:weakSelf.view];
    [HETCommonHelp showHudAutoHidenWithMessage:@"提交失败，请检测网络连接"];
}];
```
