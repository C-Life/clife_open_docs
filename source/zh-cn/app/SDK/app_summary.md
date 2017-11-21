# 1.SDK功能简介
clife开放平台（以下简称开放平台）设备接入的SDK封装了clife对外开放的服务接口，以及手机与智能硬件通讯接口。包括用户模块，设备绑定模块，设备控制模块和其他的开放平台接口。开发者不需要关注这些模块的具体内部逻辑，只需要根据自己的业务需求编写界面和调用SDK接口就可以完成APP的快速开发。
下面是SDK的基础架构图：  
 ![](https://i.imgur.com/44UiXao.jpg)

注：本文为C-Life iOS终端SDK的新手使用教程，只涉及教授SDK的使用方法，默认读者已经熟悉XCode开发工具的基本使用方法，以及具有一定的编程知识基础等。

# 2.相关名词定义

## 2.1 小循环

  智能硬件与手机通过连接同一个路由器实现局域网内部的通信，我们称之为小循环。

## 2.2 大循环

   智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
   
## 2.3 productId
   
   设备产品号，设备在开放平台管理系统录入设备的时候，系统会根据设备录入的设备大类、设备小类、客户代码、DeviceKey、设备编码生成一个productId，可在开放平台管理系统上看到。
   
   
## 2.4 deviceId

   设备号，当一个设备通过设备绑定的接口初次接入开放平台时，开放平台会自动根据productId以及设备的mac地址为此设备注册一个deviceId，此deviceId全网唯一，用于通过开放平台进行设备的操作。



# 3.集成准备

## 3.1 C-Life开放平台注册账户
进入[C-Life开放平台官网](https://open.clife.cn/#/)，注册开发者账号，此部分请参考[C-Life平台接入流程](../../product/index.md)。
  
  
## 3.2 新建设备接入
此部分请参考[C-Life平台接入流程](../../product/index.md)。

## 3.3 创建应用
   请到**应用中心**页面创建移动应用，填写资料(必须填写应用包名BundleId)后，将获得AppID和AppSecret，可立即用于开发。但应用登记完成后还需要提交审核，只有审核通过的应用才能正式发布使用。此部分请参考[C-Life平台接入流程](../../product/index.md)。
   
## 3.4 下载SDK终端DEMO

<a href="https://github.com/C-Life/clife_iOS_open_demo">iOS Demo下载地址</a>

<a href="https://github.com/C-Life/android_open_demo">android Demo下载地址</a>
 
[iOS SDK接入文档](./iOSSDK.md)

[Android SDK接入文档](android_sdk.md)





