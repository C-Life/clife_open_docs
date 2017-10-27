# wifi设备绑定

## 设备绑定概述
设备绑定分为手动绑定和二维码扫描绑定，流程如下：

![](/assets/设备绑定流程图.jpg)


#	一、扫描二维码绑定

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
	1             |    wifi设备
	2             |    蓝牙设备
	
根据 **moduleId** 再区分wifi设备的绑定方式(AP绑定和smartLink绑定)

	
	 moduleId    | 绑定类型   
   ------------- |-------------
	 70            |AP绑定
	其他             |smartLink绑定
	
蓝牙设备只有一种绑定方式（蓝牙绑定）

## 2、wifi 绑定
### 2.1 wifi smartLink

* 获取路由器ssid和密码
* 传入参数产品ID **productId**，**路由器ssid** 和 **密码**，启动绑定流程

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
* 获取路由器ssid和密码 
* 手机连接路由器热点 
* 手机切换设备热点 
* 传入参数 产品ID **productId**、**设备大类ID**、**设备小类ID**、**路由器ssid** 和 **密码**，启动绑定流程


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

#	二、手动绑定

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