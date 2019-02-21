# 硬件接入指导
## 1.接入流程简介
首先介绍一下硬件接入流程，为开发者展示清晰的接入逻辑，硬件接入流程如下：
![](/assets/mcu/hardSummary.png)
## 2.创建产品
第一步，新建产品，如下图所示：
![](/assets/mcu/NewProduct.png)
第二步，选择设备大小类型，如果在已有的设备类型中找不到需要创建的设备大小类型，可以联系clife平台的相关人员，申请添加新的设备大小类型，如下图所示：
![](/assets/mcu/DeviceType.png)
第三步，填写产品名称以及产品型号，如下图所示：
![](/assets/mcu/DeviceName.png)
第四步，选择产品技术方案，目前用的最多是AP和smartlink方式，本文档中也有对这两种方式做过说明，这个就不多说，下图是用的比较多的两种模块的示例（乐鑫8266和汉枫LPB100）：
![](/assets/mcu/ESP8266.png)
![](/assets/mcu/LPB100.png)
第五步，点击确定，创建产品过程结束，下面展示一下smartlink和AP创建成果之后的界面：
![](/assets/mcu/Smartlink.png)
![](/assets/mcu/AP.png)
## 3.配置协议
协议配置 协议配置指的是配置产品的功能，通过不同的数据类型进行定义表示。例如最简单的设备“开关”，具备功能为：开启、关闭，将其抽象为一个协议为布尔型，0表示关闭，1表示开启。配置协议时需要注意一点，协议的数据长度是16字节对齐，所以不足16字节时需增加保留字进行补齐。该操作平台上会有提示，如下图：
![](/assets/mcu/DataDefault.png)
协议配置是一个产品最重要的属性，因此产品智能化的第一步，就是明确产品功能，并逐一在平台上进行创建。
### 3.1 控制数据
控制数据即该数据的改变会引起设备功能逻辑变化，例如：开关机，按键操作等等。这类数据在通讯过程中发生改变需立即上报服务器，协议中添加控制数据操作如下：
![](/assets/mcu/ControlData.png)
### 3.2 运行数据
运行数据即设备正常运行产生的数据，例如：环境的温湿度、模式的工作时间、定时工作的剩余时间等等。这类数据在通讯过程中以10S为周期定时上报服务器（单片机端则以5S为周期发送给WiFi模块），协议中添加运行数据操作如下：
![](/assets/mcu/RunData.png)
### 3.3 故障数据
故障数据即设备运行中产生的故障报警数据，例如：温度传感器故障、设备中相应的元器件故障等等。这类数据在通讯中产生后需立即上报服务器，需要注意的是，为了方便服务器对该类数据进行统计，数据属性统一为枚举类型且0代表正常，1代表异常。协议中添加故障数据操作如下：
![](/assets/mcu/ErrorData.png)
### 3.4 配置数据
配置数据即必须通过服务器修改设备的一些基本使用参数的数据，这类数据的操作隐藏较深，一般用户是无法修改其中的参数配置，只有设备生产厂家有权利修改，可以理解为管理者才有权限修改，例如：温度的采集范围，滤芯使用寿命修改等等。这类数据一般是通过服务器主动下发，协议中添加配置数据操作如下：
![](/assets/mcu/ConfigData.png)
### 3.5 自定义数据编辑说明
自定义数据编辑框如下：
![](/assets/mcu/Data.png)
数据名称：使用中文名称输入。
数据标识：必须是英文，命名规则大驼峰
数据长度：超过4字节长度参数类型必须选择字符型
参数类型：根据实际需求选择，一般情况下选择数值型
参数设定：分为两种，一种是范围，具体应用例如温度、时间设置等，一种是枚举，具体应用例如开关量设置、工作模式设置等。
保留字：由于数据协议是16字节对齐，所以经常会有在编辑数据的时候需要增加保留字来凑足16字节，一般是没有实际意思的数据选择是，正常数据选择否。
数据备注：该数据有特殊描述可以在备注栏写清楚，这里为选填项。
下面举两个实例进行说明：
实例一（范围类数据编辑）：
![](/assets/mcu/Limits.png)
实例二（枚举类数据编辑）：
![](/assets/mcu/Enum.png)
### 3.6 通讯协议导出
配置完协议之后为了方便查看，平台增加了自动导出协议文档的功能，导出操作如下：
![](/assets/mcu/Protocol.png)

开发者如需了解详细的串口通讯流程可以阅读以下文档：
* [串口数据协议](/assets/mcu/PDF/WiFi-McuProtocol.pdf)
* [串口通讯流程](./serialPortCommunicationProcess.html)

## 4.MCU通讯代码移植
### 4.1 MCU工程代码目录
![](/assets/mcu/ProjectDirectory.png)
#### 4.1.1 文件目录说明：
| 文件夹名称 | 说明 |
|-----------|------|
| Bsp | 硬件驱动程序目录 |
| HetWiFi | WiFi通讯、flash驱动、在线升级驱动目录 |
| Libraries | STM32官方驱动目录 |
| Project | 工程文件目录 |
| Startup | 官方启动文件 |
| UserAPP | 用户应用程序目录 |
| UserOTA | 用户升级程序目录 |
#### 4.1.2 模板工程及相关文件说明
![](/assets/mcu/MCUProjectDetails.png)
#### 4.1.3 重点文件说明
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
### 4.2 程序操作介绍
#### 4.2.1 修改WifiConfig.h配置文件确定功能需求
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

#### 4.2.2 WiFi通讯重要函数API说明
##### 4.2.2.1 初始化函数	
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

##### 4.2.2.2 心跳函数
	void Het_DriveWifi_SystickISR(void)
功能描述：此函数作用是给WiFi处理程序提供10ms时钟,必须放在10ms定时器里
参数描述：无
返回值：无 
##### 示例如下：

![](/assets/mcu/TimInterrupt_wifi.png)

##### 4.2.2.3 串口接收函数
	void Het_DriveWifi_UsartRecvISR(uint8_t *_pbuf, uint16_t _data_len)
功能描述：WiFi模组串口中断接收函数,必须放在串口中断函数里面
参数描述：
_pbuf – 串口接收数据首地址
_data_len – 接收数据长度
返回值：无 
##### 示例如下：

![](/assets/mcu/RxInterrupt_Wifi.png)

##### 4.2.2.4 绑定函数
	void Het_DriveWifi_WifiModuleBindCmd(uint8_t _flag)
功能描述：WiFi绑定触发条件
参数描述：_flag – 如果_flag大于0,表示使能绑定操作
返回值：无
##### 示例如下（本示例是通过长按按键触发绑定）：

![](/assets/mcu/Banding.png)

##### 4.2.2.5 厂测函数
	void Het_DriveWifi_WifiModuleTestCmd (uint8_t _flag)
功能描述：WiFi进入产测条件
参数描述：_flag – 如果_flag大于0,表示使能产测操作
返回值：无
#### 用法和绑定命令一样，这里就不做过多说明。 

##### 4.2.2.6 获取WiFi状态函数
	het_uint8_t Het_DriveWifi_GetWifiStatus(void)
功能描述：获取WiFi连接状态函数
参数描述：无
返回值：WiFi状态值
#### 函数原型如下：

![](/assets/mcu/WifiStatus.png)

##### 4.2.2.7 数据发送函数
	enum_WResult Het_DriveWifi_WifiDataSend(enum_CMDType _type,uint8_t *_pbuf,uint8_t _len)
功能描述：发送用户私有数据函数,
参数描述：
_type – 用户发送的数据所处类型，如CMD_TYPE_CTRL表示为控制命令数据,CMD_TYPE_STATUS表示为状态命令数据
_pbuf – 用户发送数据缓存的首地址
_len – 用户发送数据的长度
返回值：发送的状态,WR_OK表示发送成功 
##### 示例如下：

![](/assets/mcu/TxSend_Wifi.png)

##### 4.2.2.8 WiFi通讯管理函数
	enum_WResult Het_DriveWifi_WifiProcess(void)
功能描述：WiFi绑定和数据交互处理,此函数放在主循环里面
参数描述：无
返回值：返回当前程序的状态。特别注意的是，当返回状态等于WR_WAIT_SEND_CTRL_CMD或者WR_TIMER_SEND_STATUS_CMD时，程序正处于
阻塞状态,等待用户输入设备控制和状态数据。
##### 此函数管控整个WiFi通讯流程流程，用户可以不必理会里面的执行逻辑，只需要根据返回值做相应的数据处理，示例如下：

![](/assets/mcu/WifiHandle.png)

##### 4.2.2.9 在线升级心跳函数
	void Upgrade_SystickISR(void)
功能描述：此函数作用是给升级处理程序提供10ms时钟,必须放在10ms定时器里
参数描述：无
返回值：无 
##### 示例如下：

![](/assets/mcu/TimInterrupt-Upgrade.png)

##### 4.2.2.10 在线升级处理函数
	enum_UResult Upgrade_Process(void)
功能描述：在线升级处理，应和WiFi处理程序配套使用。
参数描述：无
返回值：返回在线升级状态
##### 此函数直接在主程序中调用即可，如有升级动作会自动处理，不需另外进行操作，示例如下：

![](/assets/mcu/Handle_Upgrade.png)

#### 4.2.3 程序初始化

![](/assets/mcu/SystemInit.png)

#### 初始化中需要注意的是WiFi模块处理初始化，需要按照API说明中的操作来做，请参照3.2.1。

![](/assets/mcu/WifiInit.png)

#### 4.2.4 主程序展示
主程序中包括系统初始化、在线升级检查、WiFi通讯、用户程序处理（本地控制）。

![](/assets/mcu/MainStruct.png)

#### 4.2.5 关于WiFi通讯数据处理
当服务器主动下发数据下来后，程序都会通过之前初始化函数中用户自定义的处理程序来处理接收到的数据，数据处理是需要用户自行解析的，具体示例如下：

![](/assets/mcu/DataHandleFunction.png)

#### 4.2.6 关于在线升级说明
本工程模板包括两个项目工程，其中DempOTA工程负责管理芯片上电后检测是否有在线升级动作，如果有则把新的程序内容拷贝至原来的应用区，替换掉原来的老程序，如果没有则直接跳转到应用区启动程序。而DemoAPP则是应用程序代码区。通过修改FlashDivision.h文件里面的内容可以进行分区划分，具体的分区信息可以点击FlashDivision.h文件查看。  

* [单片机OTA原理介绍](/assets/mcu/PDF/McuOtaDescription.pdf)

## 5 设备绑定连接网络
设备通过WiFi模组以无线通讯的方式连接上路由器并接入互联网，整个过程我们要做的就是通过手机把无线路由器的SSID和密码告诉设备，由于设备不能像手机或者电脑一样通过键盘或者屏幕进行操作，那么为了方便，我们提供了两种配网方式：SmartLink、AP。下面我们就来以本模板中开发板为例介绍一下这两种方式。
### 2.1 SmartLink (快连)配置网络
通过按键或其他方式开启设备SmartLink(快联)模式，开启后设备不断接收特定编码的WIFI广播包和组播包，手机连接可用的WiFi网络后，通过C-Life APP 发送编码后的WiFi网络的SSID和密码组播及广播，设备接收到之后自动连接此WiFi网络，连接后配网完成。
注意：SmartLink(快连)目前只支持2.4G WiFi，暂不支持5G WiFi。
1、首先手机必须先连接上无线路由器（该路由器可以正常上网）。
2、打开下载好的Demo App注册并登陆，点击添加设备，并进入绑定。
<center class="half">
<img src="/assets/mcu/SmartlinkAddDevice.png" width="250" alt="SmartlinkAddDevice" align=center /><img src="/assets/mcu/SmartlinkMainType.png" width="250" alt="SmartlinkMainType" align=center />
</center>
<center class="half">
<img src="/assets/mcu/SmartlinkSubType.png" width="250"  alt="SmartlinkSubType" align=center /><img src="/assets/mcu/SmartlinkSelectWifi.png" width="250"  alt="SmartlinkSelectWifi" align=center />
</center>
3、操作设备进入SmartLink绑定中，本模板中是长按S4键2S后，设备进入绑定模式。
4、返回到Demo App中进行绑定操作，直到绑定成功。
<center class="half">
<img src="/assets/mcu/SmartlinkFindDevice.png" width="250" alt="SmartlinkFindDevice" align=center /><img src="/assets/mcu/SmartlinkBinding.png" width="250" alt="SmartlinkBinding" align=center />
</center>
<center class="half">
<img src="/assets/mcu/SmartlinkBindFinish.png" width="250"  alt="SmartlinkBindFinish" align=center /><img src="/assets/mcu/SmartlinkDeviceOnline.png" width="250"  alt="SmartlinkDeviceOnline" align=center />
</center>
### 5.2 AP配置网络
通过按键或其他方式开启设备AP配网模式.开启后设备设置为AP模式，手机连接可用的WiFi网络后，输入WiFi密码；通过C-Life APP 扫描周围AP，发现特定AP(HET_XXXXXX_XXXX)后连接此AP,并将可用WiFi的SSID和密码发送给设备,设备接收到之后自动连接此WiFi网络，连接后配网完成。
1、首先手机必须先连接上无线路由器（改路由器可以正常上网）。
2、打开下载好的Demo App注册并登陆，点击添加设备，并进入绑定。
<center class="half">
<img src="/assets/mcu/ApAddDevice.png" width="250" alt="ApAddDevice" align=center /><img src="/assets/mcu/ApMainType.png" width="250" alt="ApMainType" align=center />
</center>
<center class="half">
<img src="/assets/mcu/ApSubType.png" width="250"  alt="ApSubType" align=center /><img src="/assets/mcu/ApSelectWifi.png" width="250"  alt="ApSelectWifi" align=center />
</center>
3、操作设备进入SmartLink绑定中，本模板中是长按S4键2S后，设备进入绑定模式。
4、手动切换WiFi模组广播出来的热点(由于手机系统权限原因，IOS系统手机手动切换，安卓系统手机则自动切换)，连接成功后返回到Demo App中进行绑定操作。
<center class="half">
<img src="/assets/mcu/ApCutoverWifi.png" width="250" alt="ApCutoverWifi" align=center /><img src="/assets/mcu/ApSelectWifi2.png" width="250" alt="ApSelectWifi2" align=center />
</center>
<center class="half">
<img src="/assets/mcu/ApNext.png" width="250"  alt="ApNext" align=center /><img src="/assets/mcu/ApBindFinish.png" width="250"  alt="ApFinish" align=center />
</center>
<center>
<img src="/assets/mcu/ApDeviceOnline.png" width="250"  alt="ApDeviceOnline" align=center />
</center>
需要注意一下，示例是IOS版本的App操作，安卓和IOS界面不同，但是操作类似这里就不另做说明了。

## 6 关于WiFi通讯数据交互

WiFi数据处理都是在WifiPro.c文件中，通讯数据分为两种，一种是本地主动上传，另一种是应答服务器数据，下面我们一一给大家举例示范。
#### 注：所有类型的数据交互都必须是设备实时数据
### 6.1 本地主动上传控制数据
本地主动上传控制数据可以通过按键等触发方式来实现，主要是控制逻辑发生变化之后把信息上传给服务器，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_0104_CTRL,UartTxBuf,WIFI_CONTROL_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_0104_CTRL，发送的数据缓存在UartTxBuf中，长度为WIFI_CONTROL_LEN。


### 6.2 应答服务器下发的控制数据
服务器下发控制数据之后，单片机需要执行完下发的控制数据后把最新的设备控制状态上报给服务器进行应答，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_0204_CTRL_ACK,UartTxBuf,WIFI_CONTROL_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_0204_CTRL_ACK，发送的数据缓存在UartTxBuf中，长度为WIFI_CONTROL_LEN。

### 6.3 本地主动上传运行状态数据
本地上报运行状态数据已5S为周期循环上报，运行状态数据服务器不会下发，属于被动接收类型，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_0105_STATUS,UartTxBuf,WIFI_STATUS_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_0105_STATUS，发送的数据缓存在UartTxBuf中，长度为WIFI_STATUS_LEN。

### 6.4 本地主动上传故障数据
当设备出现故障之后主动上报该信息给服务器，每种故障发生时上报一次，解除故障后再上报一次，与运行状态数据一样，故障数据也是服务器被动接收，不会主动下发，具体样例如下：
	Het_DriveWifi_WifiDataSend(CMD_010E_ERROR,UartTxBuf,WIFI_ERROR_LEN);
通过Het_DriveWifi_WifiDataSend函数发送，数据类型为CMD_010E_ERROR，发送的数据缓存在UartTxBuf中，长度为WIFI_ERROR_LEN。

## 7 在线调试说明
1、进入C-Life开放平台“设备调试”页面，添加设备的MAC地址；
2、点击“进入模拟调试”，进入调试窗口，查看C-Life开放平台与设备数据交互；
![](/assets/mcu/DebugOnline.png)
3、查看设备上报到服务器的数据，通过双击不同命令字可以在右边数据框查看对应的数据内容，确保上报到服务器的数据无误；
命令字0105代表运行数据，如下图：
![](/assets/mcu/DebugRun.png)
命令字0104代表控制数据，如下图：
![](/assets/mcu/DebugControl.png)
命令字010E代表故障数据和0105命令字类似，这里就不做过多说明；
4、通过平台编辑控制数据并下发，在无APP情况下进行远程控制模拟具体操作如下图；
![](/assets/mcu/DebugSendControl.png)

test

## 8.常见问题分析
对于刚刚接触智能硬件的人来说，调试一帆风顺的情况是非常少见的，以下我们总结了一些在调试过程中很容易遇到的一些问题，让大家少走弯路。
* [接入常见问题详解](./CommonProblem.html) 