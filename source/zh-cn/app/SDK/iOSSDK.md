#APP 集成流程
## 1.SDK配置
### 1.1 SDK初始化
**第一步:导入sdk库**
```
pod 'HETOpenSDK','2.0.0'

```

**第二步：导入模组库**
** 根据产品类型找到对应的芯片模组名称，如下：**
![](/assets/查看芯片模组类型.png)

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
**第三步：注册使用SDK **

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
// 1.SDK注册
[HETOpenSDK registerAppId:@"yourAPPId" appSecret:@"yourAPPSecret"];
// 2.设置SDK的日志信息开启
[HETOpenSDK openLog:YES];
//3.配置网络环境
[HETOpenSDK setNetWorkConfig:HETNetWorkConfigType_ETE];
return YES;
}

```
### 1.2 配置APP主题的信息
** 通过参数定义的JSON字符串来进行配置APP主题色，demoAPP是通过HETAuthorizeTheme.plist 这个文件来组装JSON字符串的。**
![](/assets/修改app主题色配置文件.png)


### 1.3 集成注意事项
**注意**:如果网络请求出现AppID不合法，请检查Xcode工程里面的BundleId和appId，必须跟在开放平台创建应用时填的BundleId和AppID保持一致。


## 2.用户模块
### 2.1 获取登录状态
【示例代码】
```
 HETAuthorize *auth = [[HETAuthorize alloc] init];
 [auth isAuthenticated];

```
### 2.2 Clife 授权登录


### 2.3 云云对接用户授权登录
【示例代码】

```
 HETAuthorize *auth = [[HETAuthorize alloc] init];
 self.auth = auth;
 if (![self.auth isAuthenticated]) {
      [self.auth authorizeWithCompleted:^(NSString *openId, NSError *error) {
    }];
  }
```
### 2.4 退出登录
【示例代码】
```
// 在授权登录成功的情况才执行操作
if ([self.auth isAuthenticated]) {
   [self.auth unauthorize];
}
```

### 2.5 获取用户信息

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
### 2.6 异地登录通知

开放平台的账号只能在一台设备上面登录。当有账号在另一台设备登录时，SDK会抛出一个HETLoginOffNotification消息。 开发者可以在首页监听这个消息，处理异地登录的逻辑。 
例：

【示例代码】
```
[[NSNotificationCenter defaultCenter] addObserver:self 
selector:@selector(XXX) name:HETLoginOffNotification object: nil];
```
### 2.7修改密码

【示例代码】

```
HETAuthorize  *auth = [[HETAuthorize alloc]init];
[auth changePasswordSuccess:^(id responseObject) {
         
} failure:^(NSError *error) {
       
}];
```
![](/assets/我的界面.png)

## 3.设备绑定
### 3.1绑定概述
#### 3.1.1 绑定流程
![](/assets/绑定流程介绍.png)

#### 3.1.2 设备分类
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

### 3.2 获取设备信息
####3.2.1 扫描二维码获取设备信息
** 二维码命名规则：**

```
http://open.clife.net/v1/web/open/product?param={"a":产品id}
```
  
** 第一步：获取产品ID**

```
扫一扫内容：
urlStr: http://open.clife.net/v1/web/open/product?param={"a":3531}

```

```
"a":3531 3531 即是 产品ID
```
** 第二步：根据产品ID获取设备信息**
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

> 到此，在上图中已经获取到 **productId**、**moduleType**、deviceTypeId、deviceSubTypeId 可以进行设备绑定。


####3.2.2 通过大类小类获取设备信息

** 第一步：获取设备大类列表**

在 **HETDeviceRequestBusiness** 查询设备信息获取相关接口

【示例代码】


```

[HETDeviceRequestBusiness fetchDeviceTypeListSuccess:^(id responseObject) 
{

} failure:^(NSError *error) {

}];

```

![](/assets/查询设备大类接口返回结果.jpg)


** 第二步：通过大类ID，获取设备小类 **

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

### 3.3 WiFi设备绑定
#### 3.3.1 smartLink绑定
>在开始配置前，设备要先进入配置模式，然后APP发送要配置的路由器ssid和密码，开启扫描设备服务将扫描到的设备进行绑定，获取绑定结果。

**第一步：获取路由器ssid **
【示例代码】

```
NSString  *macAddr = [[HETWIFIBindBusiness sharedInstance] fetchmacSSIDInfo];

```

第二步：传入参数产品ID **productId**，**路由器ssid** 和 **密码**，启动绑定流程

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


#### 3.3.2 AP绑定
>在开始配置前，设备进入配置模式后，会产生一个Wifi热点。手机连接设备热点，将发送要配置的路由器ssid和密码给设备，然后APP将配置信息给设备，之后设备自行于服务器绑定，APP想服务器查询绑定状态。

>使用C-life提供的模组固件，设备产生的Wifi热点以“HET-xxx”开头，没有密码。其他厂商提供的模组，SoftAP热点名称由各自厂商指定。

**第一步：获取路由器ssid **
【示例代码】

```
NSString  *macAddr = [[HETWIFIBindBusiness sharedInstance] fetchmacSSIDInfo];

```

** 第二步：手机连接路由器热点 **

** 第三步：手机切换设备热点 **

设备AP热点命名规则: `radiocastName_deviceTypeId_deviceSubtypeId`

当判断用户已经成功连接设备AP热点，即可进入绑定流程。

** 第四步：传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**、**路由器ssid** 和 **密码**，启动绑定流程 **

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


### 3.4 蓝牙设备绑定
** 第一步：传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**，初始化 HETBLEBusiness对象**

【示例代码】

```
//初始化蓝牙设备的业务类，需要设备的productId，deviceTypeId，deviceSubtypeId
self.bleBusiness = [[HETBLEBusiness alloc]initWithProductId:self.productId.integerValue 
deviceTypeId:self.deviceTypeId.integerValue 
deviceSubtypeId:self.deviceSubtypeId.integerValue];
```

** 第二步 蓝牙扫描设备 **

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

** 第二步：选择需要绑定的设备，启动绑定流程**

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
##八、iOS 设备分享

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

<span id="H5设备控制"></span>
##九、H5设备控制


### 1、概述

H5设备控制，是指设备控制页面用html 5开发，嵌入到原生APP，实现设备控制页面动态更新的一种方式。


### 2、H5控制页面下载

   用html5开发的设备控制页面，在开发平台发布后，原生APP会下载H5的控制页面到本地Document目录。    
[示例代码]

```
[HETH5Manager launchWithAppSign:@"com.het.beauty.common"];
     
HETH5Manager *manager = [HETH5Manager deviceId:deviceModel.deviceId productId: 
       [NSString stringWithFormat:@"%@",deviceModel.productId]];
      
      //下载H5包到本地
[manager configWithController:self controllers:^NSArray<UIViewController *> *(NSString *h5PagePath) {
      NSLog(@"h5PagePath--->:%@",h5PagePath);
      NSString *desPath  = [NSString stringWithFormat:@"%@/index.html",h5PagePath];
      
            
}];       
```
    


### 3、H5与原生数据交互
 
SDK提供了原生与H5通讯的管理接口`HETWKWebViewJavascriptBridge`，其通讯原理图如下：
![](https://i.imgur.com/drm1OoC.png)



1、创建webView，添加bridge


创建自己的webView,再创建webView和原生的通信bridge,同时需要实现
`HETWKWebViewJavascriptBridgeDelegate`相关代理

```
HETWKWebViewJavascriptBridge* bridge = [HETWKWebViewJavascriptBridge   bridgeForWebView:webView];
bridge.delegate=self;
[bridge setNavigationDelegate:self];
    
```

2、加载本地H5


```
- (void)loadRequest
{
    if (self.h5Path&&self.h5Path.length>0) {
        
        if ([self.h5Path hasPrefix:@"http"]) {
            
            [_wkWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:self.h5Path]]];
        }else{
            NSRange webRange = [_h5Path rangeOfString:@"web"];
            NSRange locationRange = [_h5Path rangeOfString:@"household"];
            NSString *directory;
            if (webRange.length>0) {
                directory = [_h5Path substringWithRange:NSMakeRange(0, webRange.length+webRange.location+1)];
            }
            if (locationRange.length>0) {
                directory = [_h5Path substringWithRange:NSMakeRange(0, locationRange.length+locationRange.location+1)];
            }
            
            if (NSFoundationVersionNumber>NSFoundationVersionNumber_iOS_8_x_Max) {
                @try {
                    [_wkWebView loadFileURL:[NSURL URLWithString:[NSString stringWithFormat:@"file://%@",[self.h5Path stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]] allowingReadAccessToURL:[NSURL fileURLWithPath:directory]];
                } @catch (NSException *exception) {
                    NSLog(@"%@",exception);
                } @finally {
                    
                }
            }else{
                [_wkWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"file://%@",[self.h5Path  stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]]]];
            }
        }
    }
}

- (void)updateWebOrientation {
    UIInterfaceOrientation orientation = [UIApplication sharedApplication].statusBarOrientation;
    if (UIInterfaceOrientationIsLandscape(orientation)) {
        //[_webView stringByEvaluatingJavaScriptFromString:
        // @"document.body.setAttribute('orientation', 90);"];
        [_wkWebView evaluateJavaScript:@"document.body.setAttribute('orientation', 90);" completionHandler:nil];
    } else {
        //[_webView stringByEvaluatingJavaScriptFromString:
        // @"document.body.removeAttribute('orientation');"];
        [_wkWebView evaluateJavaScript:@"document.body.removeAttribute('orientation');" completionHandler:nil];
    }
}


```


3、监听设备数据，通过bridge传递给H5

```
_communicationManager=[[HETDeviceControlBusiness alloc]initWithHetDeviceModel:self.deviceModel deviceRunData:^(id responseObject) {
        [_bridge webViewRunDataRepaint:responseObject];
    } deviceCfgData:^(id responseObject) {
        [_bridge webViewConfigDataRepaint:responseObject];
    } deviceErrorData:^(id responseObject) {
        [_bridge webViewRunDataRepaint:responseObject];
    } deviceState:^(HETWiFiDeviceState state) {
        NSMutableDictionary *infoDic = [NSMutableDictionary dictionary];
        [infoDic setObject:@(state) forKey:@"onlineStatus"];
        [_bridge webViewRunDataRepaint:infoDic];
        
    } failBlock:^(NSError *error) {
        NSLog(@"失败了:%@",error);
}];
    
[_communicationManager start];
     
```


4、实现`HETWKWebViewJavascriptBridgeDelegate`,接受H5传递过来的参数

```

#pragma -mark HETWKWebViewJavascriptBridgeDelegate
/**
 *  js调用的配置接口
 *
 *  @param data
 */
-(void)config:(id)data
{
    [_bridge webViewReady:nil];
    if(self.communicationManager.deviceCfgData)
    {
        [_bridge webViewConfigDataRepaint:self.communicationManager.deviceCfgData];
    }
}


/**
 *  js调用的发送数据接口
 *
 *  @param data 将发送给app的数据，一般是完整的控制数据(json字符串)
 *  @param successCallback  app方数据处理成功时将调用该方法
 *  @param errorCallback    app方数据处理失败时将调用该方法
 */
-(void)send:(id)data successCallback:(id)successCallback errorCallback:(id)errorCallback
{
    //[_bridge updateDataSuccess:nil successCallBlock:successCallback];
    NSData *jsonData = [data dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *olddic = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil];
    NSMutableDictionary *responseObject=[[NSMutableDictionary alloc]initWithDictionary:olddic];
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    dic=responseObject;
    NSError * err;
    NSData * tempjsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&err];
    NSString * json = [[NSString alloc] initWithData:tempjsonData encoding:NSUTF8StringEncoding];
    [self.communicationManager deviceControlRequestWithJson:json withSuccessBlock:^(id responseObject) {
        [_bridge updateDataSuccess:responseObject successCallBlock:successCallback];
    } withFailBlock:^(NSError *error) {
        [_bridge updateDataError:responseObject errorCallBlock:errorCallback];
    }];
    
    
}


/**
 *  js调用的设置页面标题接口(该方法用于将标题发送给app，以供app进行标题更新。)
 *
 *  @param data  将设置的标题
 */
-(void)title:(id)data
{
    self.title=data;
}



/**
 *  js调用的系统toast接口(方法用于调用系统toast，以便app方统一toast风格)
 *
 *  @param data 将要弹出的提示信息
 */
-(void)toast:(id)data
{
    
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)relProxyHttp:(id)url data:(id)data httpType:(id) type sucCallbackId:(id) sucCallbackId errCallbackId:(id) errCallbackId needSign:(id) needSign
{
    
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)absProxyHttp:(id)url data:(id)data httpType:(id) type sucCallbackId:(id) sucCallbackId errCallbackId:(id) errCallbackId
{
    
}

/**
 *  加载H5页面失败
 *
 *  @param errCode  错误码
 *  @param errMsg   错误信息
 */
-(void)onLoadH5Failed:(id)errCode errMsg:(id)errMsg
{
    
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)h5SendDataToNative:(id) routeUrl data:(id) data successCallbackId:(id)successCallbackId failedCallbackId:(id) failedCallbackId
{
    [_bridge webViewNativeResponse:@{@"h5SendDataToNative":routeUrl} callBackId:successCallbackId];
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)h5GetDataFromNative:(id)routeUrl successCallbackId:(id)successCallbackId failedCallbackId:(id)failedCallbackId
{
    [_bridge webViewNativeResponse:@{@"h5GetDataFromNative":routeUrl} callBackId:successCallbackId];
}

```

<span id="业务性接口"></span>
## 十、其他接口

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


