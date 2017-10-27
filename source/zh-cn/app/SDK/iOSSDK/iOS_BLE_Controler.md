# 设备控制 - 蓝牙
蓝牙设备控制，参考`HETBLEBusiness`类里面的方法和实现。

## 一、设备控制流程
1、获取已绑定的设备列表，获取设备信息（`HETDevice`）。

2、根据获取的设备信息，监听设备状态，控制设备。
	

## 二、获取绑定设备列表

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


## 三、控制和监听设备

### 1、初始化

```
  if(!_bleBusiness)
    {
        _bleBusiness=[[[HETBLEBusiness alloc]init]initWithProductId:self.productId 
        deviceTypeId:self.deviceType 
        deviceSubtypeId:self.deviceSubType];
        
    }
    
```

### 2、监听获取设备状态

```
 WEAKSELF;
    [_bleBusiness fetchStatusDataWithPeripheral:self.blePeripheral macAddress:self.macAddress deviceId:self.deviceId completionHandler:^(CBPeripheral *currentPeripheral,NSDictionary *dic, NSError *error) {
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

### 3、控制设备



```
[_bleBusiness deviceControlRequestWithPeripheral:self.blePeripheral 
macAddress:self.macAddress 
sendDic:@{@"LED":@(ledColor %9)} 
completionHandler:^(CBPeripheral *currentPeripheral,NSError *error) {
        STRONGSELF;
        strongSelf.blePeripheral=currentPeripheral;
        NSLog(@"数据发送回调:%@",error);
        if(error)
        {
            [HETCommonHelp HidHud];
            [HETCommonHelp showHudAutoHidenWithMessage:@"数据发送失败"];
        }
        else
        {
            [HETCommonHelp HidHud];
            [HETCommonHelp showHudAutoHidenWithMessage:@"数据发送成功"];
        }
        
    }];


```

### 4、设备升级
* 从平台上传最新硬件版本
* 从服务器获取设备最新版本
* 下发最新版本给蓝牙设备

####4.1上传包文件
a) 登录开发平台，进去产品页面
![](/assets/蓝牙固件升级入口.png)
b)填写最新版本和选择包文件并且上传

![](/assets/蓝牙升级外部版本计算规则.png)
####4.2app检查更新，并且下发。
```
 //获取最新版本
    [HETDeviceUpgradeBusiness deviceUpgradeCheckWithDeviceId:self.deviceId 
    success:^(HETDeviceVersionModel * deviceVersionModel) {
        //        deviceVersionId = 2024;
        //        filePath = "http://200.200.200.58:8981/group1/M00/0D/83/yMjIOlj4drWAeBL-AAB2rNrxQug170.bin";
        //        newDeviceVersion = "V1.1.2";
        //        oldDeviceVersion = "1.0.0";
        //        releaseNote = "\U6d4b\U8bd5\U7528\U4f8b\Uff0c\U56fa\U4ef6\U5347\U7ea7";
        //        status = 1;
        if(deviceVersionModel.newDeviceVersion&&![deviceVersionModel.newDeviceVersion isEqualToString:deviceVersionModel.oldDeviceVersion])//有新固件
        {
            MBProgressHUD *hud=[[MBProgressHUD alloc] initWithView:[UIApplication sharedApplication].windows.lastObject] ;
            [[UIApplication sharedApplication].windows.lastObject addSubview:hud];
            hud.dimBackground = NO;
            hud.mode = MBProgressHUDModeDeterminateHorizontalBar;
            hud.labelText = @"MCU升级中";
            [hud show:YES];
            
            [_bleBusiness mcuUpgrade:self.blePeripheral macAddress:self.macAddress deviceVersionModel:deviceVersionModel progress:^(float progress) {
                //升级进度
                hud.progress=progress;
                
            } completionHandler:^(CBPeripheral *currentPeripheral,NSError *error) {
                if(error)
                {
                    [HETCommonHelp HidHud];
                    [HETCommonHelp showHudAutoHidenWithMessage:@"MCU升级失败"];
                }
                else
                {
                    [HETCommonHelp HidHud];
                    [HETCommonHelp showHudAutoHidenWithMessage:@"MCU升级成功"];
                }
                
            }];
            
        }else{
            
        }
        
    } failure:^(NSError *error) {
        NSLog(@"获取硬件版本信息错误:%@",error);
    }];


```