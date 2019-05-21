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
### 3.5 协议字段框架说明
![](/assets/mcu/ProtocolFieldFrame.png)  
![](/assets/mcu/ProtocolFieldFrameDescription.png)  
**主体框**：下拉可选的内容是基础功能或者使用的元器件，必填项。  
**主体扩展名框**：下拉可选的内容是修饰主体的也可以理解为是对主体的补充说明，例如如果选的是基础功能，可对基础功能做进一步说明，如果是元器件可以选择元器件的位置信息或者其他，该项为选填项，可以选择不填，下面举例说明：  
主体为基础功能: 基础功能_制冷_xxx_xxx  
主体为元器件: 温湿度传感器_控制板_xxx_xxx  
**功能框**：下拉可选内容是代表此字段的核心内容，例如开关、模式设置、状态、数值设置等等，必填项。  
**功能扩展名框**：下拉可选内容是用来修饰功能的也可以理解为是对功能名的补充说明，下面举例说明：    
xxx_xxx_开关_保温(保温开关)  
xxx_xxx_数值设置_制冷温度(制冷温度设置)  
xxx_xxx_模式_加热(加热模式)  
xxx_xxx_时钟_开机(开机时间)  
xxx_xxx_数值_累计耗电量(累计耗电量)  
#### 3.5.1 协议配置说明
第一步，点击右上角添加自定义数据。  
![](/assets/mcu/AddProtocol.png)     
第二步，编辑数据中文名称，完成之后点击选择，开始组合协议框架。    
![](/assets/mcu/EditCNname.png)     
第三步，选择查询，然后分别对主体框、主体扩展名框、功能框、功能扩展名框进行下拉选取与中文名称匹配的内容，下拉框可以滑动选择如果用户觉得麻烦可以直接输入中文关键字进行搜索查找。  
![](/assets/mcu/Edit.png)    
第四步，点击查询，确定协议字段，并编辑字段长度，然后点击保存，进入下一步。  
![](/assets/mcu/SaveEdit.png)   
第五步，输入协议内容后点击保存，生成协议字段。   
![](/assets/mcu/EditFinish.png) 
### 3.6 通讯协议导出
配置完协议之后为了方便查看，平台增加了自动导出协议文档的功能，导出操作如下：
![](/assets/mcu/Protocol.png)

开发者如需了解详细的串口通讯流程可以阅读以下文档：
* [串口数据协议](/assets/mcu/PDF/WiFi-McuProtocol.pdf)
* [串口通讯流程](./serialPortCommunicationProcess.html)

## 4.MCU通讯代码移植
[通讯代码下载地址](https://open.clife.cn/open_documentdownload/#/)
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
![](/assets/mcu/MCUProjectDetailsNew.png)
#### 4.1.3 重点文件说明
 | 文件名称 | 说明 |     
 |-----------|------|    
 | HET_OTA.c | 升级数据处理、App应用区跳转等 |    
 | FlashDivision.h | 单片机flash地址分区及升级信息 |     
 | het_config.h | 通讯数据内容结构体定义头文件 |    
 | HET_ClifeProtocol.c | WiFi通讯流程管控处理 |    
 | HET_ClifeProtocol.h | HET_ClifeProtocol.c对应头文件，WiFi通讯流程管控处理相关信息声明 |    
 | WifiConfig.h | WiFi模组接入平台选择、模组绑定信息、设备信息、服务功能选择等声明非常重要 |    
 | Product_Wifi.c | 用户与服务器数据交互业务处理 |    
 | Product_Wifi.h | 为Product_Wifi.c对应头文件 |    
### 4.2 程序操作介绍
#### 4.2.1 修改WifiConfig.h绑定信息配置文件确定绑定信息
![](/assets/mcu/ConfigOptionsNew.png)   
接入模块可选种类有三种：普通低速WiFi模组、GPRS模组、高速WiFi模组。  
联网的绑定方式可选两种：AP绑定方式、smartlink绑定方式。  
接入平台可选择三种：和而泰C-Life平台、微信平台、京东平台。

![](/assets/mcu/DeviceInfoNew.png)    
这部分的信息是在和而泰开放平台创建产品之后系统自动分配的，每一款产品对应唯一信息，如下图所示：
![](/assets/mcu/WebDeviceInfo.png)   
#### 特别说明：绑定过程中如果产品devicekey和设备编码错误是无法绑定成功的。
![](/assets/mcu/VersionInfo.png)    
此信息是设备绑定之后在云平台上记录的设备信息，包括设备的软件版本、硬件版本、整机型号等重要信息，信息由用户自定义，项目编号和整机型号都是由15位长度的ASCII组成，不足15位会自动用0补齐。
#### 4.2.2 修改het_config.h配置文件确定功能需求
新版本的驱动代码中实现了数据自动发送，用户不需要再关注数据上报的操作，只需负责数据解析即可。由于需要自动发送数据，因此WiFi相关数据的结构体命名必须统一，而结构体的成员则由用户自定义，下面对数据结构体进行一一讲解。  
##### 4.2.2.1 控制数据结构体
控制数据结构体中包含三部分用户自定义数据、保留字、功能变更位，如下图所示：   
![](/assets/mcu/ControlStruct.png)    
### 注意：   
1、保留字：保留字之所以存在是因为数据内容长度必须是16的整数倍，所有用来补齐字节长度。   
2、功能变更位(updataflag)：关于功能变更位解释：解析服务器或者APP下发的控制数据时先解析对应的功能变更位，再解析功能变更位对应的数据内容。
置位规则：功能变更位的字节个数=数据内容总长度（包括功能变更位）/8
对应关系：功能变更位的第一个字节，bit0对应控制数据的起始字节，依次类推，如下表格所示（以两字节updataflag为例）：
   
| 功能变更位 | updataflag1 | updataflag2 |     
|---------|-----------|-----------|       
| 对应关系 | bit7······bit0 | bit15······bit8 |        
| 数据内容 | 字节7······字节0 | 字节15······字节8 |     
   
##### 4.2.2.2 运行数据结构体    
运行数据结构体中包含两部分用户自定义数据、保留字，如下图所示：     
![](/assets/mcu/StatusStruct.png)  
##### 4.2.2.3 故障数据结构体    
故障数据结构体中包含两部分用户自定义数据、保留字，如下图所示：     
![](/assets/mcu/ErrorStruct.png)  
##### 4.2.2.4 故障数据结构体      
配置数据结构体中包含两部分用户自定义数据、保留字，如下图所示：     
![](/assets/mcu/ConfigStruct.png)  

结构体名称不能改变，声明如下图：   
![](/assets/mcu/StructDefine.png)    

### 所有结构体内容必须要对齐，所以需要在定义结构体数据前加上对齐付“#pragma pack(1)”和“#pragma pack()”，否则在数据传递的时候会出现指针地址不合法导致程序跑飞的情况。     

#### 4.2.3 WiFi通讯重要函数API说明
##### 4.2.3.1 初始化函数 
	void HET_Wifi_Open(void)  
函数名称：HET_Wifi_Open         
功能描述：WiFi通讯功能打开        
参数：无       
返回值：无         
##### 示例如下：
![](/assets/mcu/OpenProtocol.png)     
初始化代码中有关于串口硬件驱动的初始化需要用户添加，如下图：    
![](/assets/mcu/UartInit.png) 

##### 4.2.3.2 复位函数
	void HET_Wifi_Comm_Reset(value)	  
函数名称：HET_Wifi_Comm_Reset   
功能描述：WiFi模块复位脚控制        
参数：0:失效 1:有效         	
返回值：无          
##### 示例如下：   
![](/assets/mcu/ResetNew.png)     

##### 4.2.3.3 串口接收函数
	void HET_Wifi_RecvCB(uint8_t *_pbuf, uint16_t _data_len)
函数名称：HET_Wifi_RecvCB   
功能描述：Wifi串口接收回调   
参数：pBuf:数据指针 Len:数据长度   
返回值：无     
##### 示例如下：   
![](/assets/mcu/RecvNew.png)   
串口接收函数必须按照函数原型来定义，否则接收数据会出错。   

##### 4.2.3.4 串口发送函数
	void HET_Wifi_Usart_Send(uint8_t *_pbuf, uint16_t _data_len)
函数名称：HET_Wifi_Usart_Send   
功能描述：Wifi串口数据发送   
参数：pBuf:数据指针 Len:数据长度   
返回值：无     
##### 示例如下：   
![](/assets/mcu/SendNew.png)   
根据使用的单片机型号调整对应的串口发送函数，但是必须按照函数原型来定义，否则发送数据会出错。   

##### 4.2.3.5 Flash擦除函数
	void HET_Wifi_FlashErase(uint8_t Type, uint32_t StartAddress, uint32_t EndAddress)     
函数名称：HET_Wifi_FlashErase    
功能描述：Flash擦除   
参数：Type:flash类型，0-内部flash，1-外部flash(只有在使用外部flash的情况下才有效)
           StartAddress:开始地址    
           EndAddress:结束地址    
返回值：无      
##### 示例如下：   
![](/assets/mcu/FlashErase.png)      
如果需要修改Flash擦除函数，请与函数原型保持一致，否则会因为擦除数据出错，导致程序跑飞。      

##### 4.2.3.6 Flash写入函数
	void HET_Wifi_FlashWrite(uint8_t Type, uint32_t StartAddress, uint32_t EndAddress)     
函数名称：HET_Wifi_FlashWrite   
功能描述：写入升级数据   
参数：Type:0-内部flash，1-外部flash(只有在使用外部flash的情况下才有效)   
		   Address:写入地址   
           pData:数据指针  
           Len:数据长度   
返回值：无    
##### 示例如下：   
![](/assets/mcu/FlashWrite.png)      
如果需要修改Flash写入函数，请与函数原型保持一致，否则会因为写入数据出错，导致程序跑飞。

##### 4.2.3.7 Flash读取函数
	void HET_Wifi_FlashRead(uint8_t Type, uint32_t StartAddress, uint32_t EndAddress)     
函数名称：HET_Wifi_FlashRead   
功能描述：读取升级数据   
参数：Type:flash类型，0-内部flash，1-外部flash(只有在使用外部flash的情况下才有效)   
		   Address:写入地址   
           pData:数据指针   
           Len:数据长度   
返回值：空    
##### 示例如下：   
![](/assets/mcu/FlashRead.png)         
如果需要修改Flash读取函数，请与函数原型保持一致，否则会因为读取数据出错，导致程序跑飞。   

##### 4.2.3.8 绑定、产测操作函数
	void HET_CP_WriteCMD(TE_HET_CP_CONTROL Cmd)
函数名称：HET_CP_WriteCMD  
功能描述：发送CP操作指令   
参数：Cmd：HET_CP_BINDCMD-绑定，HET_CP_TESTCMD-产测   
返回值：无  
##### 示例如下（本示例是通过长按按键触发绑定）：
![](/assets/mcu/BindNew.png)
#### 产测操作用法和绑定命令一样，都是调用同一个函数，只是输入的参数不一样，这里就不做过多说明。 
触发产测之后，等待产测结果产生之后程序会自动进入产测处理函数中，用户可以自行添加产测处理代码，如下图所示：   
![](/assets/mcu/TestHandle.png)   

##### 4.2.3.9 通讯故障处理函数
	void HET_Wifi_ErrHandler(uint32_t Fault)
函数名称：HET_Wifi_ErrHandler   
功能描述：Wifi通讯故障处理   
参数：FaultCode - 故障代码   
返回值：空   
##### 示例如下：
![](/assets/mcu/ErrorHandle.png)     
   
##### 4.2.3.10 主动获取本地时间函数
	void HET_Wifi_SyncLocalTime(void)
函数名称：HET_Wifi_SyncLocalTime   
功能描述：本地数据上报类型标识控制(获取时间会自动触发，特殊情况下可手动则调用该函数)   
参数：无   
返回值：无 
##### 示例如下：
![](/assets/mcu/GetTime.png)  
除NB模块之外其他模块同步时间指令会自动发送，同步周期在初始化函数中设置，如下图：   
![](/assets/mcu/GetTimeInit.png)  


##### 4.2.3.11 获取网络状态函数
	TE_HET_NET_STATUS HET_CP_GetNetStatus(void)
函数名称：HET_CP_GetNetStatus   
功能描述：获取网络连接状态   
参数：无   
返回值：TE_HET_NET_STATUS - HET_ONLINE:在线  
                           HET_OFFLINE:离线    
#### 函数原型如下：
![](/assets/mcu/GetNetStatus.png)   

##### 4.2.3.12 获取信号强度函数
	uint8_t HET_CP_GetSignalStrength(void)
函数名称：HET_CP_GetSignalStrength   
功能描述：获取Wifi信号强度   
参数：无   
返回值：WiFi信号强度0~10     
#### 函数原型如下：
![](/assets/mcu/GetSignalStrength.png)    

##### 4.2.3.13 通讯任务函数
	void HET_CP_Task(void)   
函数名称：HET_CP_Task      
功能描述：通讯任务，每10ms运行一次该函数   
参数：无      
返回值：无       
#### 示例如下：   
![](/assets/mcu/CPTask.png)     
通讯任务必须每10ms执行一次，如果10ms偏差比较大会导致通讯异常。   

##### 4.2.3.14 服务器下发的控制数据处理函数
	void HET_Ctrl_Decode_CallBack(uint8_t *CtrlData)   
函数名称：HET_Ctrl_Decode_CallBack   
功能描述：控制数据处理     
参数：CtrlData:控制数据指针   
返回值：无    
#### 示例如下：
![](/assets/mcu/DecodeCtrl.png) 

##### 4.2.3.15 服务器下发的配置数据处理函数
	void HET_Config_Decode_CallBack(uint8_t *CtrlData)   
函数名称：HET_Config_Decode_CallBack   
功能描述：配置数据处理  
参数：CfgData:配置数据指针  
返回值：无  
#### 示例如下：
![](/assets/mcu/DecodeCfg.png) 

##### 4.2.3.16 本地时间数据存储函数
	void HET_SyncTime_Decode_CallBack(uint8_t *pBuf)   
函数名称：HET_SyncTime_Decode_CallBack
功能描述：时间数据处理
参数：pBuf:时间数据指针
返回值：无 
#### 示例如下：
![](/assets/mcu/DateBank.png) 

##### 4.2.3.17 在线升级说明
本工程模板包括两个项目工程，其中DempOTA工程负责管理芯片上电后检测是否有在线升级动作，如果有则把新的程序内容拷贝至原来的应用区，替换掉原来的老程序，如果没有则直接跳转到应用区启动程序。而DemoAPP则是应用程序代码区。通过修改FlashDivision.h文件里面的内容可以进行分区划分，具体的分区信息可以点击FlashDivision.h文件查看。    

* [单片机OTA原理介绍](/assets/mcu/PDF/McuOtaDescription.pdf)   

开启在线升级需要在两个头文件中修改相关配置：   
1、WifiConfig.h文件中将“HET_UPGRADE_FW_EN”的值设置为1，示例如下图：   
![](/assets/mcu/OTAswitch.png)  
2、FlashDivision.h中配置相关选项，具体操作示例如下图：  
![](/assets/mcu/FlashDivision.png)     
两个文件修改完之后编译工程即可，注意两个工程都需要同时编译(DemoOTA和DemoAPP)。

#### 4.2.5 主程序展示
![](/assets/mcu/MainNew.png)

## 5 设备绑定连接网络
再进行这一步操作之前必须先在平台通过扫描二维码下载好DemoApp，扫描地址如下：
![](/assets/mcu/DemoApp.png)
设备通过WiFi模组以无线通讯的方式连接上路由器并接入互联网，整个过程我们要做的就是通过手机把无线路由器的SSID和密码告诉设备，由于设备不能像手机或者电脑一样通过键盘或者屏幕进行操作，那么为了方便，我们提供了两种配网方式：SmartLink、AP。下面我们就来以本模板中开发板为例介绍一下这两种方式。
### 5.1 SmartLink (快连)配置网络
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
<img src="/assets/mcu/ApNext.png" width="250"  alt="ApNext" align=center /><img src="/assets/mcu/ApBindFinish.png" width="250"  alt="ApBindFinish" align=center />
</center>
<center>
<img src="/assets/mcu/ApDeviceOnline.png" width="250"  alt="ApDeviceOnline" align=center />
</center>
需要注意一下，示例是IOS版本的App操作，安卓和IOS界面不同，但是操作类似这里就不另做说明了。

## 6 在线调试说明
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


## 7.常见问题分析
对于刚刚接触智能硬件的人来说，调试一帆风顺的情况是非常少见的，以下我们总结了一些在调试过程中很容易遇到的一些问题，让大家少走弯路。
* [接入常见问题详解](./CommonProblem.html) 