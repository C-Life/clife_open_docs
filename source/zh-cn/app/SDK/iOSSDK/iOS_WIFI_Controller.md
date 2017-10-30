## Wifi - 设备控制

参考`HETDeviceControlBusiness`类里面方法，实现设备控制和运行状态的监听。

参考`HETDeviceRequestBusiness`类里面的方法，获取设备的信息。

### 一、设备控制流程
		
1、获取已绑定的设备列表，获取设备信息（`HETDevice`）。

2、根据获取的设备信息，监听设备状态，控制设备。
	



### 二、获取绑定设备列表

绑定成功后，用户可以获取绑定成功的设备列表，获取到设备列表拿到设备的HETDevice设备信息才可以控制设备

```
/**
 *  查询绑定的所有设备列表
 *
 *  @param success  设备列表返回HETDevice对象数组
 *  @param failure 失败的回调
 */
+ (void)fetchAllBindDeviceSuccess:(void (^)(NSArray<HETDevice *>* deviceArray))success
                               failure:(failureBlock)failure;

```

![](/assets/设备绑定返回参数.png)

### 三、监听设备状态

####1、初始化 

初始化HETDeviceControlBusiness的实例对象，传递需要监听的设备信息作为参数，监听block的回调信息，做相应的业务逻辑。对于运行数据、控制数据、错误数据的内容，请参考具体设备的配置协议内容。


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

####2、启动监听服务

```
- (void)viewWillAppear:(BOOL)animated
{

    [self.controlBusiness start];
}


```


####3、停止监听服务

```
- (void)viewWillDisappear:(BOOL)animated
{

    [self.controlBusiness stop];
}

```

### 四、设备控制

设备控制流程入下：
![](/assets/UML_WIFI设备控制.jpg)


```
/**
*  设备控制
*
*  @param jsonString   设备控制的json字符串,协议中的控制数据协议里面的字节属性名和对应值组成的字典经转换为json字符串,下发数据必须传递updateflag标志

*  @param successBlock 控制成功的回调
*  @param failureBlock 控制失败的回调
*/
- (void)deviceControlRequestWithJson:(NSString *)jsonString withSuccessBlock:(void(^)(id responseObject))successBlock 
withFailBlock:(void(^)( NSError *error))failureBlock; 

```

关于updateflag

这个修改标记位是为了做统计和配置下发的时候设备执行相应的功能。下发数据必须传递updateflag标志

例如，空气净化器（广磊K180）配置信息协议：

紫外线(1)、负离子(2)、臭氧(3)、儿童锁(4)、开关(5)、WiFi(6)、过滤网(7)、模式(8)、定时(9)、风量(10) 上面一共上10个功能，那么updateFlag就2个字节，没超过8个功能为1个字节，超过8个为2个字节，超过16个为3个字节，以此类推。

打开负离子，2个字节，每一个bit的值为下：

0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0


### 五：设备管理
1、解绑设备
设备删除有2中情况,需要自己根据设备分享类型（device.share）来区分：
 第一种：设备是用户自己绑定的设备。调用`unbindDeviceWithDeviceId: success: failure:`来解除绑定。

```
/**
*  解除设备绑定
*
*  @param deviceId 设备deviceId
*  @param success  成功的回调
*  @param failure  失败的回调
*/
  [HETDeviceRequestBusiness unbindDeviceWithDeviceId:device.deviceId success:^(id responseObject) {
            // 删除数据源的数据,self.cellData是你自己的数据
            [weakSelf.deviceArr removeObjectAtIndex:indexPath.row];
            // 删除列表中数据
            [weakSelf.deviceListTableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];

        } failure:^(NSError *error) {
           
        }];
```

第二种：设备是别人分享的过来的设备。调用HetDeviceShareApi.getInstance().deviceDel()方法来解绑分享关系。 
```
  [HETDeviceShareBusiness deviceAuthDelWithDeviceId:device.deviceId userId:@"" success:^(id responseObject) {
            // 删除数据源的数据,self.cellData是你自己的数据
            [weakSelf.deviceArr removeObjectAtIndex:indexPath.row];
            // 删除列表中数据
            [weakSelf.deviceListTableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];

            [weakSelf getDeviceList];
            [HETCommonHelp showHudAutoHidenWithMessage:UnBindDeviceSuccess];
        } failure:^(NSError *error) {
            [HETCommonHelp showHudAutoHidenWithMessage:UnBindDeviceError];
            [weakSelf.deviceListTableView endEditing:YES];
        }];
```