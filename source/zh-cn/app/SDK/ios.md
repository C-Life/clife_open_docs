#iOS SDK 概述

## 目录
<!-- MarkdownTOC depth=4 autolink=true bracket=round -->

- [0、 设备接入SDK概述](#概述)
- [1、 SDK初始化](iOSSDK/iOS_init.md)
- [2、 SDK授权](iOSSDK/iOS_Auth.md)
- [3、 SDK第三方登录](iOSSDK/iOS_third_login.md)
- [4、 SDK蓝牙设备的扫描绑定](iOSSDK/iOS_BLE_Scan_Bind.md)
- [5、 SDK蓝牙设备的控制](iOSSDK/iOS_BLE_Controller.md)
- [6、 SDK WIFI设备的扫描绑定](iOSSDK/iOS_WIFI_Scan.md)
- [7、 SDK WIFI设备的控制](iOSSDK/iOS_WIFI_Controller.md)
- [8、 SDK 设备的分享](iOSSDK/iOS_Device_Share.md)
- [9、 SDK APP辅助信息接口](iOSSDK/iOS_APP_Info.md)




<span id="概述"></span>
## 设备接入SDK概述


####一. SDK功能简介
  
  
 clife开放平台（以下简称开放平台）设备接入的SDK封装了clife对外开放的服务接口，以及手机与智能硬件通讯接口。包括用户模块，设备绑定模块，设备控制模块和其他的开放平台接口。开发者不需要关注这些模块的具体内部逻辑，只需要根据自己的业务需求编写界面和调用SDK接口就可以完成APP的快速开发。

####二. SDK的总体框架
![](/assets/SDK架构图.jpg)

####三. 相关名词定义


#####3.1 大循环

智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。

#####3.2 productId

设备产品号，设备在开放平台管理系统录入设备的时候，系统会根据设备录入的设备大类、设备小类、客户代码、DeviceKey、设备编码生成一个productId，可在开放平台管理系统上看到。

#####3.3 deviceId

设备号，当一个设备通过设备绑定的接口初次接入开放平台时，开放平台会自动根据productId以及设备的mac地址为此设备注册一个deviceId，此deviceId全网唯一，用于通过开放平台进行设备的操作。



