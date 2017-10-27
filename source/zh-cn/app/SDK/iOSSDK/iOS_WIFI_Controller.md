## 设备控制

参考HETDeviceControlBusiness类里面方法，实现设备控制和运行状态的监听。

参考HETDeviceRequestBusiness类里面的方法，获取设备的信息。

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

### 三、控制和监听设备

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