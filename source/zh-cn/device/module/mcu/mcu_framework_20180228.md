# 硬件MCU程序详解

## 1.程序功能简介及使用流程
MCU工程模板可以帮助开发者快速简单的接入平台，无需详细了解平台与接入设备之间的通讯流程，只需要专注于控制器（MCU端）与App、云端数据交互后的业务处理逻辑，完成产品开发即可，具体流程如下图：

![](/assets/mcu/hardSummary.png)

开发者如需了解详细的串口通讯流程可以阅读以下文档：
[串口数据协议](/assets/mcu/PDF/WiFi-McuProtocol.pdf)
[串口通讯流程](./serialPortCommunicationProcess.html)

## 2.代码目录
![](/assets/mcu/ProjectDirectory.png)
### 文件目录说明：
| 文件夹名称 | 说明 |
|-----------|------|
| Bsp | 硬件驱动程序目录 |
| HetWiFi | WiFi通讯、flash驱动、在线升级驱动目录 |
| Libraries | STM32官方驱动目录 |
| Project | 工程文件目录 |
| Startup | 官方启动文件 |
| UserAPP | 用户应用程序目录 |
| UserOTA | 用户升级程序目录 |
### 模板工程及相关文件说明
![](/assets/mcu/MCUProjectDetails.png)
#### 重点文件说明
 | 文件名称 | 说明 |
 |-----------|------|
 | het_ota.c | 升级数据处理、App应用区跳转等 |
 | FlashDivision.h | 单片机flash地址分区及升级信息 |
 | Upgrade.c | WiFi升级数据处理 |
 | Upgrade.h | 为Upgrade.c对应头文件 |
 | DriveWifi.c | WiFi通讯流程管控处理 |
 | DriveWifi.h | 为DriveWifi.c对应头文件，WiFi通讯流程管控处理相关信息声明 |
 | WifiConfig.h | WiFi模组接入平台选择、模组绑定信息、设备信息、服务功能选择、数据长度等声明非常重要 |
 | WifiPro.c | 用户与服务器数据交互业务处理 |
 | WifiPro.h | 为WifiPro.c对应头文件 |
## 3.程序操作介绍
### 3.1 修改WifiConfig.h配置文件确定功能需求
![](/assets/mcu/ConfigOptions.png)
接入模块可选种类有三种：普通低速WiFi模组、GPRS模组、高速WiFi模组。
联网的绑定方式可选两种：AP绑定方式、smartlink绑定方式。
接入平台可选择三种：和而泰C-Life平台、微信平台、京东平台。

![](/assets/mcu/DeviceInfo.png)
这部分的信息是在和而泰开放平台创建产品之后系统自动分配的，每一款产品对应唯一信息，如下图所示：
![](/assets/mcu/WebDeviceInfo.png)
#### 特别说明：绑定过程中如果产品devicekey和设备编码错误是无法绑定成功的。
![](/assets/mcu/VersionInfo.png)
此信息是设备绑定之后在云平台上记录的设备信息，包括设备的软件版本、硬件版本、整机型号等重要信息，信息由用户自定义，项目编号和整机型号都是由15位长度的ASCII组成，不足15位会自动用0补齐。

![](/assets/mcu/DataLenght.png)
数据长度是16位对齐，如果长度不正确解析数据时会报错。

### 3.2WiFi通讯重要函数API说明
#### 3.2.1 初始化函数	
	void Het_DriveWifi_WifiInit(pfUartSend _pf_uart_send,pfUartDecode _pf_uart_decode,pfWifiReset _pf_wifi_reset)
功能描述：WiFi模组初始函数，用于注册用户函数。
参数描述：
_pf_uart_send – 用户串口发送字符串函数，函数名可自定义，函数原型必须为：

	void fun(uint8_t*pbuf,uint16_t len)

_pf_uart_decode – 用户命令解码函数，函数名可自定义，函数原型必须为：  

	void fun(uint16_t cmd, uint8_t *pbuf,uint16_t len)

_pf_wifi_reset – 用户WiFi模组复位函数,函数名可自定义，函数原型必须为：

    void fun(uint8_t flag)
返回值：无
##### 示例如下：

![](/assets/mcu/InitializationFunction.png)

![](/assets/mcu/SendFunction.png)

![](/assets/mcu/HandleFunction.png)

![](/assets/mcu/ResetFunction.png)

#### 3.2.2 心跳函数
	void Het_DriveWifi_SystickISR(void)
功能描述：此函数作用是给WiFi处理程序提供10ms时钟,必须放在10ms定时器里
参数描述：无
返回值：无 
##### 示例如下：

![](/assets/mcu/TimInterrupt_wifi.png)

#### 3.2.3 串口接收函数
	void Het_DriveWifi_UsartRecvISR(uint8_t *_pbuf, uint16_t _data_len)
功能描述：WiFi模组串口中断接收函数,必须放在串口中断函数里面
参数描述：
_pbuf – 串口接收数据首地址
_data_len – 接收数据长度
返回值：无 
##### 示例如下：

![](/assets/mcu/RxInterrupt_Wifi.png)

#### 3.2.4 绑定函数
	void Het_DriveWifi_WifiModuleBindCmd(uint8_t _flag)
功能描述：WiFi绑定触发条件
参数描述：_flag – 如果_flag大于0,表示使能绑定操作
返回值：无
##### 示例如下（本示例是通过长按按键触发绑定）：

![](/assets/mcu/Banding.png)

#### 3.2.5 厂测函数
	void Het_DriveWifi_WifiModuleTestCmd (uint8_t _flag)
功能描述：WiFi进入产测条件
参数描述：_flag – 如果_flag大于0,表示使能产测操作
返回值：无
#### 用法和绑定命令一样，这里就不做过多说明。 

#### 3.2.6 获取WiFi状态函数
	het_uint8_t Het_DriveWifi_GetWifiStatus(void)
功能描述：获取WiFi连接状态函数
参数描述：无
返回值：WiFi状态值
#### 函数原型如下：

![](/assets/mcu/WifiStatus.png)

#### 3.2.7 数据发送函数
	enum_WResult Het_DriveWifi_WifiDataSend(enum_CMDType _type,uint8_t *_pbuf,uint8_t _len)
功能描述：发送用户私有数据函数,
参数描述：
_type – 用户发送的数据所处类型，如CMD_TYPE_CTRL表示为控制命令数据,CMD_TYPE_STATUS表示为状态命令数据
_pbuf – 用户发送数据缓存的首地址
_len – 用户发送数据的长度
返回值：发送的状态,WR_OK表示发送成功 
##### 示例如下：

![](/assets/mcu/TxSend_Wifi.png)

#### 3.2.8 WiFi通讯管理函数
	enum_WResult Het_DriveWifi_WifiProcess(void)
功能描述：WiFi绑定和数据交互处理,此函数放在主循环里面
参数描述：无
返回值：返回当前程序的状态。特别注意的是，当返回状态等于WR_WAIT_SEND_CTRL_CMD或者WR_TIMER_SEND_STATUS_CMD时，程序正处于
阻塞状态,等待用户输入设备控制和状态数据。
##### 此函数管控整个WiFi通讯流程流程，用户可以不必理会里面的执行逻辑，只需要根据返回值做相应的数据处理，示例如下：

![](/assets/mcu/WifiHandle.png)

#### 3.2.9 在线升级心跳函数
	void Upgrade_SystickISR(void)
功能描述：此函数作用是给升级处理程序提供10ms时钟,必须放在10ms定时器里
参数描述：无
返回值：无 
##### 示例如下：

![](/assets/mcu/TimInterrupt-Upgrade.png)

#### 3.2.10 在线升级处理函数
	enum_UResult Upgrade_Process(void)
功能描述：在线升级处理，应和WiFi处理程序配套使用。
参数描述：无
返回值：返回在线升级状态
##### 此函数直接在主程序中调用即可，如有升级动作会自动处理，不需另外进行操作，示例如下：

![](/assets/mcu/Handle_Upgrade.png)

### 3.3 程序初始化

![](/assets/mcu/SystemInit.png)

#### 初始化中需要注意的是WiFi模块处理初始化，需要按照API说明中的操作来做，请参照3.2.1。

![](/assets/mcu/WifiInit.png)

### 3.4 主程序展示
主程序中包括系统初始化、在线升级检查、WiFi通讯、用户程序处理（本地控制）。

![](/assets/mcu/MainStruct.png)

### 3.5 关于绑定操作
本模板中是长按K1键1S后，设备进入绑定模式，然后通过手机App输入WiFi账号密码从而连接服务器，整个过程大概持续20-25S左右。
#### 操作详解：
第一步，需要准备好绑定时候需要的App，并完成注册，这个App可以通过开放平台网站上提供的二维码下载：

![](/assets/mcu/DownloadBandingTool.png)  

第二步，程序中长按K1键1S后调用Het_DriveWifi_WifiModuleBindCmd函数，具体代码如下：

![](/assets/mcu/SendBandingCmd.png)  

第三步，在绑定App中输入一个能上网的WiFi账号和密码，并开始扫描设备：

<center>
<img src="/assets/mcu/Banding-Category.PNG" width="250" alt="Category" align=center />
<img src="/assets/mcu/Banding-Small.PNG" width="250" alt="Small" align=center />
<img src="/assets/mcu/Banding-AccountPassword.PNG" width="250"  alt="AccountPassword" align=center />
<img src="/assets/mcu/Banding-ScanEquipment.PNG" width="250"  alt="ScanEquipment" align=center />
<img src="/assets/mcu/Banding-ConnectServer.PNG" width="250"  alt="ConnectServer" align=center />
<img src="/assets/mcu/Banding-Connecting.PNG" width="250" alt="Connecting" align=center />
<img src="/assets/mcu/Banding-Finish.PNG" width="250" alt="Banding-Finish" align=center />
</center>


需要注意一下，示例是IOS版本的App操作，安卓和IOS界面不同，但是操作类似这里就不另做说明了。


### 3.6 关于WiFi通讯数据交互

WiFi数据处理都是在WifiPro.c文件中，通讯数据分为两种，一种是本地主动上传，另一种是应答服务器数据，下面我们一一给大家举例示范。

#### 3.6.1 本地主动上传控制数据
本地主动上传控制数据可以通过按键等触发方式来实现，主要是控制逻辑发生变化之后把信息上传给服务器，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_0104_CTRL,UartTxBuf,WIFI_CONTROL_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_0104_CTRL，发送的数据缓存在UartTxBuf中，长度为WIFI_CONTROL_LEN。

#### 3.6.2 应答服务器下发的控制数据
服务器下发控制数据之后，单片机需要执行完下发的控制数据后把最新的设备控制状态上报给服务器进行应答，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_0204_CTRL_ACK,UartTxBuf,WIFI_CONTROL_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_0204_CTRL_ACK，发送的数据缓存在UartTxBuf中，长度为WIFI_CONTROL_LEN。

#### 3.6.3 本地主动上传运行状态数据
本地上报运行状态数据已5S为周期循环上报，运行状态数据服务器不会下发，属于被动接收类型，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_0105_STATUS,UartTxBuf,WIFI_STATUS_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_0105_STATUS，发送的数据缓存在UartTxBuf中，长度为WIFI_STATUS_LEN。

#### 3.6.4 本地主动上传故障数据
当设备出现故障之后主动上报该信息给服务器，每种故障发生时上报一次，解除故障后再上报一次，与运行状态数据一样，故障数据也是服务器被动接收，不会主动下发，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_010E_ERROR,UartTxBuf,WIFI_ERROR_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_010E_ERROR，发送的数据缓存在UartTxBuf中，长度为WIFI_ERROR_LEN。

### 3.7 关于WiFi通讯数据处理
当服务器主动下发数据下来后，程序都会通过之前初始化函数中用户自定义的处理程序来处理接收到的数据，数据处理是需要用户自行解析的，具体样例如下：

![](/assets/mcu/DataHandleFunction.png)

### 3.8 关于在线升级说明
本工程模板包括两个项目工程，其中DomeOTA工程负责管理芯片上电后检测是否有在线升级动作，如果有则把新的程序内容拷贝至原来的应用区，替换掉原来的老程序，如果没有则直接跳转到应用区启动程序。而DomeAPP则是应用程序代码区。该在线升级支持在芯片内部实现和外挂flash之间进行选择，具体的选择和分区信息可以点击FlashDivision.h文件查看。  

#### 说明： 
使用该工程的时候不要对DomeOTA工程进行操作，以免程序不能正常工作。

## 4.常见问题分析

[接入常见问题详解](./CommonProblem.html) 