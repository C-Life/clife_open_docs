#设备绑定


## 设备绑定概述

开放平台是通过大类和小类来区分设备，设备又分为蓝牙设备和wifi设备。例如，冰箱是大类，冰箱下有Clife智能冰箱，即小类，拿到小类设备的信息的时候，就能全段设备是wifi设备还是蓝牙设备，绑定方式是smartLink绑定或者AP绑定。


![](/assets/设备绑定流程图.jpg)

## 一、获取产品ID，确认绑定方式
	
###1、获取产品ID
####1.1、扫描二维码获取产品ID
	
	二维码命名规则：

	```
	http://open.clife.net/v1/web/open/product?param={"a":产品id}
	
	```
	
a、获取产品ID

```
扫一扫内容：
urlStr: http://open.clife.net/v1/web/open/product?param={"a":3531}

```

```
"a":3531 3531 即是 产品ID
```
b、根据 产品ID 获取设备信息

```
/**
* 根据productId获取产品的详细信息
*
* @param productId 设备型号标识
* @param success 查询设备信息成功的回调
* @param failure 查询设备信息失败的回调
*/
+(void)fetchDeviceInfoWithProductId:(NSNumber *)productId
success:(successBlock)success
failure:(failureBlock)failure;


```

![](/assets/产品详细信息.jpg)


####1.2、通过大类小类获取产品ID

a、获取设备大类列表

在 **HETDeviceRequestBusiness** 查询设备信息获取相关接口

```

/**
* 查询设备大类
*
* @param success 成功的回调
* @param failure 失败的回调
*/


+ (void)fetchDeviceTypeListSuccess:(successBlock)success
failure:(failureBlock)failure;

```

![](/assets/查询设备大类接口返回结果.jpg)


b、通过大类ID，获取设备小类

```

/**
* 根据设备大类查询APP支持的设备型号
*
* @param success 成功的回调
* @param failure 失败的回调
*/

+ (void)fetchDeviceProductListWithDeviceTypeId:(NSString *)deviceTypeId
success:(successBlock)success
failure:(failureBlock)failure;

```

![](/assets/根据大类获取设备支持的产品类型返回.png)

![](/assets/通过大类获取支持设备类型返回字段说明.png)


###2、确认设备绑定方式

根据设备信息中的 **moduleType** 来区分设备类型

moduleType | 绑定类型
------------- |-------------
1 | wifi设备 SmartLink绑定
2 | 蓝牙设备
9 | wifi设备 AP绑定

蓝牙设备暂时只有一种绑定方式（蓝牙绑定）

Wifi设备绑定方式介绍：

####a、smartLink绑定

>在开始配置前，设备要先进入配置模式，然后APP发送要配置的路由器ssid和密码，开启扫描设备服务将扫描到的设备进行绑定，获取绑定结果。


第一步：获取路由器ssid和密码

第二步：传入参数产品ID **productId**，**路由器ssid** 和 **密码**，启动绑定流程

![](/assets/UML_smartLink绑定流程图.jpg)

####b、AP绑定

>在开始配置前，设备进入配置模式后，会产生一个Wifi热点。手机连接设备热点，将发送要配置的路由器ssid和密码给设备，然后APP将配置信息给设备，之后设备自行于服务器绑定，APP想服务器查询绑定状态。

>使用C-life提供的模组固件，设备产生的Wifi热点以“HET-xxx”开头，没有密码。其他厂商提供的模组，SoftAP热点名称由各自厂商指定。

AP绑定的交互流程：

第一步：获取路由器ssid和密码

第二步：手机连接路由器热点

第三步：手机切换设备热点

第四步：传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**、**路由器ssid** 和 **密码**，启动绑定流程

![](/assets/UML_设备绑定流程图.jpg)

####C、蓝牙设备绑定流程
* 通过扫一扫获取产品ID `productId`
* 根据 产品ID 获取设备信息
* 根据设备信息区分设备类型、设备绑定方式

![](/assets/UML_蓝牙设备绑定.jpg)




##二、绑定

###1、wifi设备的smartLink绑定

####a、通过 **HETWIFIBindBusiness** 获取路由器ssid

```
/**
* 获得所连Wi-Fi的Mac地址
*
* @return 返回mac地址
*/
-(NSString *)fetchmacSSIDInfo;

```
####b、传入参数，通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

```
/**
* 绑定SmartLink模式WiFi设备
*
* @param productId 设备的productId
* @param ssid 设备所需要接入的路由器名称
* @param password 设备所需要接入的路由器密码
* @param interval 绑定的超时时间,单位是秒
* @param handler 绑定的回调
*/
-(void)startSmartLinkBindDeviceWithProductId:(NSString *)productId
withSSID:(NSString *)ssid
withPassWord:(NSString *)password
withTimeOut:(NSTimeInterval)interval
bindHandler:(void (^)(HETWiFiDeviceBindState state,HETDevice *deviceObj, NSError *error))handler;

```

### 2、wifi设备的AP绑定
####a、校验用户是否连接设备


设备AP热点命名规则: `radiocastName_deviceTypeId_deviceSubtypeId`

当判断用户已经成功连接设备AP热点，即可进入绑定流程。


####b、通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

```
/**
* 绑定AP模式的WiFi设备
*
* @param productId 设备型号标识
* @param deviceTypeId 设备的大类
* @param deviceSubtypeId 设备的小类
* @param ssid AP设备所需要接入的路由器名称
* @param password AP设备所需要接入的路由器密码
* @param interval 绑定的超时时间,单位是秒
* @param handler 绑定的回调
*/
-(void)startAPBindDeviceWithProductId:(NSString *)productId
withDeviceTypeId:(NSUInteger)deviceTypeId
withDeviceSubtypeId:(NSUInteger )deviceSubtypeId
withSSID:(NSString *)ssid
withPassWord:(NSString *)password
withTimeOut:(NSTimeInterval)interval
bindHandler:(void (^)(HETWiFiDeviceBindState state,HETDevice *deviceObj, NSError *error))handler;

```

### 3、蓝牙设备的绑定

蓝牙的扫描绑定主要看**HETBLEBusiness**相关接口

####a、初始化HETBLEBusiness对象，启动绑定流程

```
//初始化蓝牙设备的业务类，需要设备的productId，deviceTypeId，deviceSubtypeId
self.bleBusiness = [[HETBLEBusiness alloc]initWithProductId:self.productId.integerValue deviceTypeId:self.deviceTypeId.integerValue deviceSubtypeId:self.deviceSubtypeId.integerValue];
```

开始扫描蓝牙设备，扫描到的蓝牙设备，用tableView显示出来，给用户选择。

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

####b、绑定设备

选择需要绑定的设备，启动绑定流程。

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