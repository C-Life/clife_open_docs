# wifi - 设备绑定

## 设备绑定概述

开放平台的设备按照功能划分类型，设备有大类，大类下面划分不同型号的小类。确定类型之后，设备还有WIFI和蓝牙设备之分。绑定设备之前首先就需要选择设备类型在扫描绑定。WIFI SSID和密码 需要开发者自己去获取手机当前连接的WIFI，让用户自己输入WIFI密码之后再调用开始扫描绑定的接口，productId是设备小类中productId字段。
设备绑定分为手动绑定和二维码扫描绑定，流程如下：

![](/assets/设备绑定流程图.jpg)


#一、扫描二维码绑定

二维码命名规则：

```
http://open.clife.net/v1/web/open/product?param={"a":产品id}

```

## 1、获取设备类型、确定设备绑定方式
* 通过扫一扫获取产品ID `productId`
* 根据 产品ID 获取设备信息
* 根据设备信息区分设备类型、设备绑定方式


a、获取产品ID

```
扫一扫内容：
urlStr: http://open.clife.net/v1/web/open/product?param={"a":3531}

```

```
"a":3531  3531 即是 产品ID
```
b、根据 产品ID 获取设备信息

```
/**
 *  根据productId获取产品的详细信息
 *
 *  @param productId 设备型号标识
 *  @param success  查询设备信息成功的回调
 *  @param failure  查询设备信息失败的回调
 */
+(void)fetchDeviceInfoWithProductId:(NSNumber *)productId
                                    success:(successBlock)success
                                    failure:(failureBlock)failure;


```

![](/assets/产品详细信息.jpg)


根据设备信息中的 **moduleType** 来区分设备类型

   moduleType    |     绑定类型   
   ------------- |-------------
	1             |    wifi设备 SmartLink绑定
	2             |    蓝牙设备
	9             |    wifi设备 AP绑定


	
蓝牙设备暂时只有一种绑定方式（蓝牙绑定）

## 2、wifi 绑定
### 2.1 wifi smartLink绑定

在开始配置前，设备要先进入配置模式，然后APP发送要配置的路由器ssid和密码,开启扫描设备服务将扫描到的设备进行绑定，获取绑定结果回调。


第一步：获取路由器ssid和密码
第二步：传入参数产品ID **productId**，**路由器ssid** 和 **密码**，启动绑定流程

![](/assets/UML_smartLink绑定流程图.jpg)


a、通过 **HETWIFIBindBusiness** 获取路由器ssid 

```
/**
 *  获得所连Wi-Fi的Mac地址
 *
 *  @return 返回mac地址
 */
-(NSString *)fetchmacSSIDInfo;

```
b、传入参数，通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

```
/**
 *  绑定SmartLink模式WiFi设备
 *
 *  @param productId         设备的productId
 *  @param ssid              设备所需要接入的路由器名称
 *  @param password          设备所需要接入的路由器密码
 *  @param interval          绑定的超时时间,单位是秒
 *  @param handler           绑定的回调
 */
-(void)startSmartLinkBindDeviceWithProductId:(NSString *)productId
                               withSSID:(NSString *)ssid
                           withPassWord:(NSString *)password
                        withTimeOut:(NSTimeInterval)interval
                  bindHandler:(void (^)(HETWiFiDeviceBindState state,HETDevice *deviceObj, NSError *error))handler;

```

### 2.2 wifi AP绑定

在开始配置前，设备进入配置模式后，会产生一个Wifi热点。手机连接设备热点，将发送要配置的路由器ssid和密码给设备，然后APP将配置信息给设备，之后设备自行于服务器绑定，APP想服务器查询绑定状态。
使用C-life提供的模组固件，设备产生的Wifi热点以“HET-xxx”开头，没有密码。其他厂商提供的模组，SoftAP热点名称由各自厂商指定。


AP绑定的交互流程：
* 获取路由器ssid和密码 
* 手机连接路由器热点 
* 手机切换设备热点 
* 传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**、**路由器ssid** 和 **密码**，启动绑定流程

![](/assets/UML_设备绑定流程图.jpg)


a、传入参数，通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

```
/**
 *  绑定AP模式的WiFi设备
 *
 *  @param productId         设备型号标识
 *  @param deviceTypeId      设备的大类
 *  @param deviceSubtypeId   设备的小类
 *  @param ssid              AP设备所需要接入的路由器名称
 *  @param password          AP设备所需要接入的路由器密码
 *  @param interval          绑定的超时时间,单位是秒
 *  @param handler           绑定的回调
 */
-(void)startAPBindDeviceWithProductId:(NSString *)productId
                     withDeviceTypeId:(NSUInteger)deviceTypeId
                  withDeviceSubtypeId:(NSUInteger )deviceSubtypeId
                             withSSID:(NSString *)ssid
                         withPassWord:(NSString *)password
                          withTimeOut:(NSTimeInterval)interval
                    bindHandler:(void (^)(HETWiFiDeviceBindState state,HETDevice *deviceObj, NSError *error))handler;

```

#二、手动绑定

## 1. smartLink 绑定


* 获取设备大类列表 (获取deviceTypeId)
* 获取设备小类列表（支持的设备列表,其中含有productId）
* 获取路由器ssid和密码
* 传入参数 产品ID **productId**、**路由器ssid** 和 **密码**，启动绑定流程

a、获取设备大类列表

在 **HETDeviceRequestBusiness** 查询设备信息获取相关接口

```

/**
 *  查询设备大类
 *
 *  @param success 成功的回调
 *  @param failure 失败的回调
 */


+ (void)fetchDeviceTypeListSuccess:(successBlock)success
                           failure:(failureBlock)failure;

```

![](/assets/查询设备大类接口返回结果.jpg)


b、通过大类ID，获取设备小类

```

/**
 *  根据设备大类查询APP支持的设备型号
 *
 *  @param success 成功的回调
 *  @param failure 失败的回调
 */

+ (void)fetchDeviceProductListWithDeviceTypeId:(NSString *)deviceTypeId
                                       success:(successBlock)success
                                       failure:(failureBlock)failure;

```

		
![](/assets/根据大类获取设备支持的产品类型返回.png)

![](/assets/通过大类获取支持设备类型返回字段说明.png)

c、通过 **HETWIFIBindBusiness** 获取路由器ssid 

```
/**
 *  获得所连Wi-Fi的Mac地址
 *
 *  @return 返回mac地址
 */
-(NSString *)fetchmacSSIDInfo;

```
d、传入参数，通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

```
/**
 *  绑定SmartLink模式WiFi设备
 *
 *  @param productId         设备的productId
 *  @param ssid              设备所需要接入的路由器名称
 *  @param password          设备所需要接入的路由器密码
 *  @param interval          绑定的超时时间,单位是秒
 *  @param handler           绑定的回调
 */
-(void)startSmartLinkBindDeviceWithProductId:(NSString *)productId
                               withSSID:(NSString *)ssid
                           withPassWord:(NSString *)password
                        withTimeOut:(NSTimeInterval)interval
                  bindHandler:(void (^)(HETWiFiDeviceBindState state,HETDevice *deviceObj, NSError *error))handler;

```

## 2. AP 绑定

* 获取设备大类列表 (获取deviceTypeId)
* 获取设备小类列表（支持的设备列表,其中含有productId）
* 获取路由器ssid和密码 
* 引导用户跳转到wifi连接页面，连接设备，待用户连接成功后，返回绑定页面
* 传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**、**路由器ssid** 和 **密码**，启动绑定流程

a、校验用户是否连接设备

	设备AP热点命名规则： radiocastName_deviceTypeId_deviceSubtypeId
	
当判断用户已经成功连接设备AP热点，即可进入绑定流程。


b、传入参数，通过 **HETWIFIBindBusiness** 调用接口， 启动绑定

```
/**
 *  绑定AP模式的WiFi设备
 *
 *  @param productId         设备型号标识
 *  @param deviceTypeId      设备的大类
 *  @param deviceSubtypeId   设备的小类
 *  @param ssid              AP设备所需要接入的路由器名称
 *  @param password          AP设备所需要接入的路由器密码
 *  @param interval          绑定的超时时间,单位是秒
 *  @param handler           绑定的回调
 */
-(void)startAPBindDeviceWithProductId:(NSString *)productId
                     withDeviceTypeId:(NSUInteger)deviceTypeId
                  withDeviceSubtypeId:(NSUInteger )deviceSubtypeId
                             withSSID:(NSString *)ssid
                         withPassWord:(NSString *)password
                          withTimeOut:(NSTimeInterval)interval
                    bindHandler:(void (^)(HETWiFiDeviceBindState state,HETDevice *deviceObj, NSError *error))handler;

```

*** 绑定无法绑定？这里给出设备无法绑定的几种检查方法：***

  * 设备是否置为绑定模式，是否在绑定的有效时间内
  * 是否正确输入wifi密码,请确认手机是否能正常连接网络
  * 是扫描不到设备还是绑定不了设备,扫描失败会有对应提示是扫描不到设备，还是绑定不了设备
  * 设备是否已在CLife开放平台注册，并按照要求将大小类信息写入设备中