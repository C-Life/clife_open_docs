# 1.SDK功能简介
clife开放平台（以下简称开放平台）设备接入的SDK封装了clife对外开放的服务接口，以及手机与智能硬件通讯接口。包括用户模块，设备绑定模块，设备控制模块和其他的开放平台接口。开发者不需要关注这些模块的具体内部逻辑，只需要根据自己的业务需求编写界面和调用SDK接口就可以完成APP的快速开发。
下面是SDK的基础架构图：  
 ![](https://i.imgur.com/44UiXao.jpg)

# 2.相关名词定义

## 2.1.appId和appSecret

开放平台app的应用标识和密钥。开发者在开放平台接入设备创建APP的时候，后台自动生成appId和appSecret，用于初始化SDK。

## 2.2.硬件模组

这里的硬件模组是指的WIFI模组。在开放平台创建WIFI产品的时候需要指定设备的WIFI模组。开发者需要在APP中先注册WIFI模组才可以进行设备绑定。

## 2.3.产品ID

产品唯一标识。

## 2.4.设备ID

设备的唯一标识。

# 3.SDK 快速开发，第三方库支持


## 3.6.第三方社交平台服务

SDK集成了第三方社交平台服务库，支持微信、qq和新浪微博的分享和登录。 详细使用请查看 **第三方平台服务的集成（登录和分享）**

# 4.集成准备

## 4.1.注册开放平台账号  
  通过https://open.clife.cn/#/home注册一个开发者账号。登录到开放平台创建应用完善详细资料。此部分请参考《clife开发平台使用手册》。  创建产品之后创建APP获取到后台分配的appId和appSecret。

## 4.2.下载SDK终端DEMO 请前往下载中心下载最新SDK包。

<a href="iOSSDK.html">iOS SDK接入文档 html</a>
<a href="iOSSDK.html">iOS SDK接入文档 html</a>

[iOS SDK接入文档](iOSSDK.md)
[Android SDK接入文档](android_sdk.md)


查看开放平台产品模组类型，选择模组的依赖包。 

![](https://i.imgur.com/98xFDg4.png)


