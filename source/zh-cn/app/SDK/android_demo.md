## Android开源框架使用指南
 

### Demo APP简介

Demo APP以开放平台sdk和主流的APP开发框架为基础搭建一套可以帮助开发者快速开发APP的脚手架.在此基础上开发者可以一天开发一款智能硬件控制APP.


### Demo APP下载地址

下载地址 https://github.com/C-Life/clife_open_android_sdk 本项目在Android Studio进行开发。

### Demo APP项目功能模块说明

#### 目录结构

<center>
<img src="https://i.imgur.com/rQdI4cb.jpg"  align=center />
</center>

#### 项目包括的主要UI
 
##### 1.账号授权页面和APP侧边栏框架
<center>
<img src="https://i.imgur.com/70XYbO6.png" width = "300" height = "520" alt="授权登录" align=center />
<img src="https://i.imgur.com/o6wLc2q.png" width = "300" height = "520" alt="设备主框架" align=center />
</center>
##### 2.我的设备列表页面，H5设备控制页面，原生设备控制页面
<center>
<img src="https://i.imgur.com/muCRjrG.png" width = "300" height = "520" alt="设备主框架" align=center />
<img src="https://i.imgur.com/S67eM6R.png" width = "300" height = "520" alt="H5页面控制页面" align=center />
<img src="https://i.imgur.com/AUSyVhG.png" width = "300" height = "520" alt="原生控制页面" align=center />
</center>
##### 3.设备类型选择页面，设备扫描页面，设备绑定页面
<center>
<img src="https://i.imgur.com/MAJoiLD.png" width = "300" height = "520" alt="设备大类选择" align=center />
<img src="https://i.imgur.com/J1bQKOD.png" width = "300" height = "520" alt="设备小类选择" align=center />
<img src="https://i.imgur.com/68qFvm6.png" width = "300" height = "520" alt="输入WIFI密码" align=center />
<img src="https://i.imgur.com/tMiFAeb.png" width = "300" height = "520" alt="设备搜索" align=center />
<img src="https://i.imgur.com/257LaT2.png" width = "300" height = "520" alt="输入WIFI密码" align=center />
<img src="https://i.imgur.com/qY9eOMu.png" width = "300" height = "520" alt="搜索失败常见问题" align=center />
</center>
 
 
#### 主要包名下面的内容介绍

##### 1.com.het.sdk.demo.base

该包名的类主要对Activity,Fragement和基于MVP架构的P和V进行简单的封装，应用开发可以基于这些类进行扩展。

##### 2.com.het.sdk.demo.adapter

该包名的类主要对列表的ViewHolder和BaseAdapter进行封装，应用开发只要实现对应的item layout和注入数据列表就可以快速列表类页面。

##### 3.com.het.sdk.demo.event

该包名的类主要对应用所用的消息事件和常量进行定义，然后RxBus进行应用。

##### 4.com.het.sdk.demo.manager

该包名的类主要对Activity,Fragement和基于MVP架构的P和V进行简单的封装，应用开发可以基于这些类进行扩展。

##### 5.com.het.sdk.demo.model

该包名主要对网络请求json和页面DTO进行数据定义，然后数据在页面中传输和逻辑使用。

##### 6.com.het.sdk.demo.push

该包名下的类主要对百度和极光推送进行集成而形成的类，用户如果需要就可以直接套用，修改一下推送初始化信息即可完成推送集成。

##### 7.com.het.sdk.demo.ui.activity

该包名下面主要是Activity页面有关的类，具体就不详细介绍，提取几个重要的讲一下。

###### 1.APP侧菜单框架：com.het.sdk.demo.ui.activity.sidebarlayout

基于侧边栏的APP框架，主要包括SidebarMainActivity.java,闪屏页面SplashActivity.java，在结合NavigationDrawerFragment.java来实现侧边导航框架。

###### 2.APP底部Tab框架：com.het.sdk.demo.ui.activity.tablayout

基于底部Tab APP框架，主要包括承载Fragment的TabMainActivity.java，底部选择指示器TabIndicator.java，自定义item视图TabIconView.java和样例SimpleFragment，用户可以基于这几个组件可以非常简单的开发基于底部导航应用。

###### 3.设备绑定：com.het.sdk.demo.ui.activity.bind

此包名下包含了设备大小类型选择DeviceSubTypeListActivity.java，蓝牙绑定页面BleBindActivity.java,二维码扫描页面QrScanActivity.java,WIFI信息输入页面WifiBindActivity.java,设备扫描绑定页面SmartLinkConfigActivity.java，开发者可以修改页面的style或者按照这些页面的逻辑自定义UI就可以快速开发。

###### 5.设备控制：com.het.sdk.demo.ui.activity.device

该包下有蓝牙设备控制页面BleCommonControlActivity.java，Android元素LED控制页面ControlLedActivity.java和H5加载页面H5ControlLedActivity.java,这个几个页面包含了不同通讯方式的设备控制通讯开发样例。

###### 6.消息中心：com.het.sdk.demo.ui.activity.message

该包名下的类主要包含推送消息列表展示，开发者可以结合开发平台的消息推送服务可以实现运营消息的推送。

###### 7.设备分享：com.het.sdk.demo.ui.activity.share

该包名主要包含设备分享的业务逻辑，用户可以实现应用内扫描分享，也可以把设备分享的链接发送到微信，QQ,微博等第三方社交平台推广应用。

##### 9.com.het.sdk.demo.utils

该包名下的类主要常用工具，方便业务开发共用。

##### 9.com.het.sdk.demo.widget

该包名下的类主要常用控件进行封装，比如Button，EditText,ToggleButton,Dialog等，用户可以方便去快速选择自己想要的，或者继承进行扩展。




### 集成指南
这个具体浏览Android sdk的集成文档。

### 常见问题

#### 关于账号

1.手机号码+手机验证码登录生成账号。

2.验证码登录进去以后，可以通过调用设置密码接口设置密码，后期可以通过验证码或者账号密码登录。

#### 关于设备绑定不上

1.产品列表找不到对应的产品？请检查开放平台APP是否关联具体的硬件产品，可以参考产品接入文档说明。

2.产品绑定不上？设备绑定目前支持SmartLink绑定和AP绑定，在进行设备绑定时，必须让设备处于绑定模式。

3.密码是否正确？确认输入路由网关的密码。

#### 关于设备控制不了

1.检查网络是否异常

2.开发调试打开调试信息，查看log日志信息。


### 最后

#### 上面所有问题都可以直接咨询clife开放平台技术支持，我们讲竭尽全力为你们服务。