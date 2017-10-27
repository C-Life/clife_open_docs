# 蓝牙扫描绑定


蓝牙的扫描绑定主要看HETBLEBusiness相关接口
##	一、扫描二维码绑定

### 1、获取设备类型、确定设备绑定方式

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

![](/assets/产品详细信息.jpg)penPlatform/文档/image/产品详细信息.jpg)

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

c、初始化HETBLEBusiness对象，启动绑定流程

```
 //初始化蓝牙设备的业务类，需要设备的productId，deviceTypeId，deviceSubtypeId
    self.bleBusiness=[[HETBLEBusiness alloc]
    initWithProductId:self.productId.integerValue 
         deviceTypeId:self.deviceTypeId.integerValue
      deviceSubtypeId:self.deviceSubtypeId.integerValue];
```

扫描蓝牙设备,扫描到的蓝牙设备，用tableView显示出来，给用户选择。

```
    WEAKSELF
    [self.bleBusiness scanForPeripheralsWithTimeOut:timeOut name:nil mac:nil scanForPeripheralsBlock:^(NSArray<CBPeripheral *> *peripherals, NSError *error) {
        if (error) {
            [weakSelf scanDeviceFail];
            return ;
        }
        if (peripherals) {
            OPLog(@"peripherals = %@",peripherals);
            OPLog(@"[NSThread currentThread] = %@",[NSThread currentThread]);
            [peripherals enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                CBPeripheral *dev = (CBPeripheral*)obj;
                if (![weakSelf.deviceArr containsObject:dev]) {
                    [weakSelf.deviceArr addObject:dev];
                }
                [UIView animateWithDuration:2 animations:^{
                    [weakSelf.bindAnimationView stopSearchProgressing];
                    weakSelf.bindAnimationView.hidden = YES;
                } completion:^(BOOL finished) {
                    [weakSelf.tableView reloadData];
                    weakSelf.tableView.hidden = NO;
                }];
            }];
            return;
        }
    }];

```

d、绑定设备

选择需要绑定的设备，启动绑定流程。

```
 [self.bleBusiness bindBleDeviceWithPeripheral:cbp 
 macAddress:nil 
 completionHandler:^(NSString *deviceId, NSError *error) {

            [weakself.bleBusiness disconnectWithPeripheral:cbp];
            if(error)
            {
                [HETCommonHelp showAutoDissmissWithMessage:@"绑定失败"];
                [weakself.navigationController popViewControllerAnimated:YES];
            }
            else
            {
                [weakself.bindAnimationView startBindsuccess];
                [[NSNotificationCenter defaultCenter] postNotificationName:BindDeviceSuccess object:nil];
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                    [weakself.navigationController popToRootViewControllerAnimated:YES];
                });
            }
        }];


```

## 二、手动绑定

* 获取设备大类列表 (获取deviceTypeId)
* 获取设备小类列表（支持的设备列表,其中含有productId,deviceSubtypeId）
* 传入参数productId，deviceTypeId，deviceSubtypeId，启动绑定流程

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
![](/Users/yuanyunlong/Documents/OpenPlatform/文档/image/查询设备大类接口返回结果.jpg)

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

c、初始化HETBLEBusiness对象，启动绑定流程

```
 //初始化蓝牙设备的业务类，需要设备的productId，deviceTypeId，deviceSubtypeId
    self.bleBusiness=[[HETBLEBusiness alloc]
    initWithProductId:self.productId.integerValue 
         deviceTypeId:self.deviceTypeId.integerValue
      deviceSubtypeId:self.deviceSubtypeId.integerValue];
```

扫描蓝牙设备,扫描到的蓝牙设备，用tableView显示出来，给用户选择。

```
    WEAKSELF
    [self.bleBusiness scanForPeripheralsWithTimeOut:timeOut name:nil mac:nil scanForPeripheralsBlock:^(NSArray<CBPeripheral *> *peripherals, NSError *error) {
        if (error) {
            [weakSelf scanDeviceFail];
            return ;
        }
        if (peripherals) {
            OPLog(@"peripherals = %@",peripherals);
            OPLog(@"[NSThread currentThread] = %@",[NSThread currentThread]);
            [peripherals enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                CBPeripheral *dev = (CBPeripheral*)obj;
                if (![weakSelf.deviceArr containsObject:dev]) {
                    [weakSelf.deviceArr addObject:dev];
                }
                [UIView animateWithDuration:2 animations:^{
                    [weakSelf.bindAnimationView stopSearchProgressing];
                    weakSelf.bindAnimationView.hidden = YES;
                } completion:^(BOOL finished) {
                    [weakSelf.tableView reloadData];
                    weakSelf.tableView.hidden = NO;
                }];
            }];
            return;
        }
    }];

```

d、绑定设备

选择需要绑定的设备，启动绑定流程。

```
 [self.bleBusiness bindBleDeviceWithPeripheral:cbp 
 macAddress:nil 
 completionHandler:^(NSString *deviceId, NSError *error) {

            [weakself.bleBusiness disconnectWithPeripheral:cbp];
            if(error)
            {
                [HETCommonHelp showAutoDissmissWithMessage:@"绑定失败"];
                [weakself.navigationController popViewControllerAnimated:YES];
            }
            else
            {
                [weakself.bindAnimationView startBindsuccess];
                [[NSNotificationCenter defaultCenter] postNotificationName:BindDeviceSuccess object:nil];
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                    [weakself.navigationController popToRootViewControllerAnimated:YES];
                });
            }
        }];


```