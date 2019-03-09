
# 和而泰云端通讯MCU程序详解
## 通讯协议详解
### 1、通讯数据格式
![](/images/通信数据格式.png)
### 2、数据包格式
![](/images/数据包格式.png)
#### 说明
1> 起始标志：固定为5A;  
2> 数据长度：从数据长度到整包数据结束所占用的字节数;  
3> 协议版本：根据用户需要接入的平台选择版本信息，具体如下：
![](/images/版本信息.png)
4> wifi状态：wifi模块的连接信息，发送是填0，接收时具体解析如下：  
![](/images/wifi状态信息.png)
5> 数据帧序：设备主发0x00000000-0x0fffffff;服务器主发0X10000000-0x1fffffff;APP主发0X20000000-0x2fffffff;滚动增加,应答时原样返回;
6> 保留：固定0x0000;
7> 数据类型： 

|数据类型 | 数据说明 |
|--------|------------------------------------|
| 0x0108 | 心跳包 |
| 0x0208 | 心跳包应答 |
| 0x0150 | 绑定命令 |
| 0x0250 | 绑定命令应答 |
| 0x0104 | 控制数据 |
| 0x0204 | 控制数据应答 |
| 0x0105 | 运行数据 |
| 0x0205 | 运行数据应答 |
| 0x0107 | 配置数据 |
| 0x0207 | 配置数据应答 |
| 0x0406 | 时间同步请求 |
| 0x0206 | 时间同步请求应答 |

8> 数据内容：用户自定义数据区，数据长度必须是16倍数，长度小于512字节;
9> 校验码：校验码的计算方式采用(CRC16-0x8408)的方式，具体代码如下：
![](/images/CRC校验.png)
10> 


##一、此文档包含 3 个文档，分别为
1.DriveWifi.c – wifi绑定和通信模块驱动，不可更改文件。
2.DriveWifi.h – wifi驱动头文件,不可更改文件。
3.WifiConfig.h – wifi模块配置信息，根据不同的设备而修改。

##二、函数 API 说明
###2.1	void Het_DriveWifi_WifiInit(pfUartSend _pf_uart_send,pfUartDecode _pf_uart_decode,pfWifiReset _pf_wifi_reset)
<1> Description: wifi 模组初始函数，用于注册用户函数。
<2> Arguments:
_pf_uart_send – 用户串口发送字符串函数，函数名可自定义，函数原型必须为： 
void fun(het_uint8_t*pbuf,het_uint16_t len)。
_pf_uart_decode – 用户命令解码函数，函数名可自定义，函数原型必须为： 
void fun(het_uint16_t cmd,het_uint8_t *pbuf,het_uint16_t len)。
_pf_wifi_reset – 用户wifi 模组复位函数,函数名可自定义，函数原型必须为:
void fun(het_uint8_t flag)。
<3> Return:NONE

###2.2 void Het_DriveWifi_SystickISR (void)
<1> Description: 此函数作用是给程序提供 10ms 时钟,必须放在 10ms 定时器里
<2> Arguments: NONE
<3> Return: NONE 
###2.3 void Het_DriveWifi_UsartRecvISR (het_uint8_t _het_data)
<1> Description:WIFI 模组串口中断接收函数,必须放在串口中断函数里面
<2> Arguments: data – 串口接收到的字节
<3> Return: NONE

###2.4 void Het_DriveWifi_WifiModuleBindCmd (het_uint8_t _flag)
<1> Description: WIFI绑定触发条件
<2> Arguments: flag – 如果 flag 大于 0,表示使能绑定操作
<3> Return:NONE

###2.5 void Het_DriveWifi_WifiModuleTestCmd (het_uint8_t _flag)
<1> Description:WIFI 进入产测条件
<2> Arguments: flag – 如果 flag 大于 0,表示使能产测操作
<3> Return:NONE

###2.6 het_uint8_t Het_DriveWifi_GetWifiStatus (void)
<1> Description:获取 WiFi 连接状态函数
<2> Arguments: NONE
<3> Return:WiFi 状态值

###2.7 het_bool Het_DriveWifi_GetAppSynStatus (void)
<1> Description:获取 APP 同步状态函数
<2> Arguments: NONE
<3> Return:APP 同步值

###2.8 enum_WResult Het_DriveWifi_WifiDataSend (enum_CMDType _type,het_uint8_t *_pbuf,het_uint8_t _len)
<1> Description:发送用户私有数据函数,
<2> Arguments:
type – 用户发送的数据所处类型， 如CMD_TYPE_CTRL 表示为控制命令数据,
CMD_TYPE_STATUS 表示为状态命令数据
Pbuf – 用户发送数据缓存的首地址
Len – 用户发送数据的长度
<3> Return:发送的状态, WR_OK 表示发送成功 

###2.9 enum_WResult Het_DriveWifi_WifiProcess (void)
<1> Description:wifi 绑定和数据交互处理,此函数放在主循环里面
<2> Arguments:NONE
<3> Return:返回当前程序的状态。特别注意的是，当返回状态等于
WR_WAIT_SEND_CTRL_CMD 或者 WR_TIMER_SEND_STATUS_CMD 时，程序正处于
塞状态,等待用户输入设备控制和状态数据。

##三、操作流程
1、修改 WifiConfig.h 文件里面的如下配置信息：
<1>DEVICE_TYPE- 设备类型（该信息在开放平台上创建产品后获得）
<2>DEVICE_KEY - 设备秘钥（该信息在开放平台上创建产品后获得）
<3>MCU设备基本信息，如SOFT_CONTROL_BOARD_VERSION等（一般情况不用改）
此三项开发前申请。
2、把 Het_DriveWifi_SystickISR 函数放在 10ms 定时器里。
3、把 Het_DriveWifi_UsartRecvISR 函数放在 wifi 串口中断接收服务函数里。
4、初始化 wifi 模块，调用 DriveWifi.c 文件里面 Het_DriveWifi_WifiInit 函数。
5、在主循环调用 Het_DriveWifi_WifiProcess 函数，Het_DriveWifi_WifiProcess 函数会返回 wifi 模组当前状态，当返回的当前状态等于 WR_WAIT_SEND_CTRL_CMD 时，wifi 模组正等待设备调用Het_DriveWifi_WifiDataSend 函数发送当前控制参数；当返回的当前状态等于WR_TIMER_SEND_STATUS_CMD 时，wifi 模组正在等待设备调用 Het_DriveWifi_WifiDataSend 函数发送当前状态参数；但是返回的当前状态等于WR_TIMER_SEND_ERROR_CMD时，wifi模组正在等待设备调用Het_DriveWifi_WifiDataSend函数发送当前故障信息。当用户需要主动上传数据时，也可以调用 Het_DriveWifi_WifiDataSend 函数发送数据。 

## 四、 实例代码 

```
//------------------------------------------------------------------------------------------------------
//操作头文件WifiConfig.h对wifi通讯进行设备
#define MOUDLE_TYPE               MODULE_WIFI   		/*choose the type of module*/
#define BIND_TYPE					SMARTLINK_MODE		/*choose the type of bind*/
#define BIND_PLATFORM			WECHAT				/*connect the platform*/
#define HET_FACTORY_TEST_EN 		1					/*1:enable   0:disable*/
#define HET_UPGRADE_FW_EN 	    	1					/*1:enable   0:disable*/
#define HET_FILE_UPLOAD_EN 	    	1					/*1:enable   0:disable*/
#if BIND_PLATFORM == WECHAT							/*微信绑定相关信息*/
#define DEVICE_TYPE_WECHAT		"gh_d04b5c778911"
#define DEVICE_ID_WECHAT			"clife_7879_"
#define DEVICE_TYPE_LEN_WECHAT	15
#define DEVICE_ID_LEN_WECHAT		11
#endif
#define DEVICE_TYPE 0x00,0x00,0xC5,0x85,0x00,0x5A,0x01,0x01	//设备编码
#define DEVICE_KEY "5aa5fba81a864beb859f0fd8234d32dc"		//设备devicekey
#define DEVICE_INFO_LEN 			48						//设备信息
#define SOFT_CONTROL_BOARD_VERSION	0x01  		     /*ctrl board software version*/ 
#define SOFT_DISPLAY_BOARD_VERSION  	0x01  		  /*display board software version*/
#define SOFT_DRIVE_BOARD_VERSION   	0x01  		     /*drive board software version*/ 
#define SOFT_OTHER_VERSION         	0x01  		     /*other board software version*/ 
#define HARD_CONTROL_BOARD_VERSION	0x01  		     /*ctrl board hardware version*/                        
#define HARD_DISPLAY_BOARD_VERSION	0x01  		     /*ctrl board hardware version*/                       
#define HARD_DRIVE_BOARD_VERSION  	0x01  		     /*ctrl board hardware version*/                       
#define HARD_OTHER_VERSION         	0x01  		     /*ctrl board hardware version*/                        
#define DEVICE_MAIN_TYPE_H           	0X00  		     /*device mian type high byte*/               
#define DEVICE_MAIN_TYPE_L			0x4B  		     /*device mian type low byte*/         
#define DEVICE_SUB_TYPE            		0x03  		     /*device sub type*/         
#define DEVICE_FUN_TYPE				0x02  		     /*device function type */         
#define DEVICE_PROJECT_NUMBER		"Z029-A16033A"	/*project number*/
#define WIFI_CONTROL_LEN			48						/*控制数据长度*/
#define WIFI_STATUS_LEN			48						/*运行数据长度*/
#define WIFI_ERROR_LEN			16						/*故障数据长度*/
//-------------------------------------------------------------------------------------------------------

```
//main.c
//用户实现3个函数
/******************************************************************************
名称：WifiPro_UartRxPro
功能：处理WIFI下发给MCU的指令
输入：命令，缓存指针，缓存长度
输出：
说明：
*******************************************************************************/
void WifiPro_UartRxPro(unsigned short _cmd,unsigned char *_buf,unsigned short _data_len)
{   
	if(_cmd== CMD_0104_CTRL) 										//处理服务器下发的控制命令
	{
		//用户代码，用于解析下发的控制命令
		WifiPro_ControlHandle(_buf,_data_len);
		//MCU端响应控制指令
		WifiPro_SendMachineControlCommond();
		Het_DriveWifi_WifiDataSend(CMD_0204_CTRL_ACK,UartTxBuf,16);
	}
	else if(_cmd== CMD_0107_CONFIG) 									//接收服务器下发的硬件配置命令
	{
		//用户代码，用于解析下发的配置命令
		
		//MCU端响应配置指令
		Het_DriveWifi_WifiDataSend(CMD_0207_CONFIG_ACK,UartTxBuf,0);
	}
	else if(_cmd == CMD_0206_GET_TIME_ACK) 							//接受服务器下发的时间信息
	{
		;
	}
	else if(_cmd == CMD_0120_UPGRADE_START) 							//收到升级起始帧，开启升级程序
	{
		;
	}
	else if(_cmd == CMD_0122_UPGRADE_RECV_PACKET) 					//接收到升级的数据
	{
		;
	}
	else if(_cmd == CMD_0225_UPGRADE_END_ACK) 						//升级成功
	{	
		;
	}
}  
/******************************************************************************
名称：WifiPro_WifiReset
功能：WIFI复位状态设定
输入：复位状态
输出：
说明：
*******************************************************************************/
void WifiPro_WifiReset(het_uint8_t _status) 
{
	if(_status)
	{
		WIFI_RESET_LOW;
	}
	else 
	{
		WIFI_RESET_HIGH;
	}
}
/******************************************************************************
名称：WifiPro_ProtocolPro
功能：WIFI模块与MCU之间的通信处理
输入：
输出：
说明：每10ms处理一次
*******************************************************************************/
void WifiPro_ProtocolPro(void)
{
	enum_WResult run_wifi;
	
	//该部分处理WIFI模块下发的数据
	run_wifi = Het_DriveWifi_WifiProcess();								
	switch(run_wifi)
	{
		case WR_WAIT_SEND_CTRL_CMD:									//该部分是第一次连接服务器时设备端主动向服务器上传一次的控制状体信息
			WifiPro_SendMachineControlCommond();					//MCU端响应WIFI模块的控制指令
			Het_DriveWifi_WifiDataSend(CMD_0104_CTRL,UartTxBuf,WIFI_CONTROL_LEN);
			break;		

		case WR_TIMER_SEND_STATUS_CMD: 								//每5S发送一次状态信息
			WifiPro_SendMachineStateCommond();
			Het_DriveWifi_WifiDataSend(CMD_0105_STATUS,UartTxBuf,WIFI_STATE_LEN);
			break;
		
		case WR_TIMER_SEND_ERROR_CMD:								//发送错误信息
			WifiPro_SendMachineErrorCommond();
			Het_DriveWifi_WifiDataSend(CMD_010E_ERROR,UartTxBuf,WIFI_ERROR_LEN);
			break;
		
		case WR_WAIT_SEND_CTRL_REQUEST_ACK_CMD:						//WIFI模块请求发送控制数据
			WifiPro_SendMachineControlCommond();
			Het_DriveWifi_WifiDataSend(CMD_0304_STATUS_REQUEST_ACK,UartTxBuf,WIFI_CONTROL_LEN);
			break;
		
		case WR_WAIT_SEND_STATUS_REQUEST_ACK_CMD:  					//WIFI模块请求发送状态信息
			WifiPro_SendMachineStateCommond();
			Het_DriveWifi_WifiDataSend(CMD_0305_STATUS_REQUEST_ACK,UartTxBuf,WIFI_STATE_LEN);
			break;
		
		case WR_WIFI_TEST_OK: 										//WIFI模块告诉MCU测试OK
			break;
		case WR_WIFI_TEST_ERR: 										//WIFI模块告诉MCU测试出错
			break;
			
		default:
			break;
	}
	//该部分处理MCU主动上传的数据
	if(UpgradeAp.UpControlStatusF == UPGRADE_FALSE)					//保证不在升级状态
	{
		//这个标志位很重要，主动上传控制命令是为了保证控制状态的实时性，服务器可以立刻获取到当前设备的控制状态
		if(WifiPro.LocalControlF == WIFIPRO_TRUE && WifiPro.Tick10msCnt == WIFI_SEND_IDLE)
		{
			WifiPro.LocalControlF = WIFIPRO_FALSE;				//
			WifiPro_SendMachineControlCommond();					//单片机主动发送控制状态信息
			Het_DriveWifi_WifiDataSend(CMD_0104_CTRL,UartTxBuf,WIFI_CONTROL_LEN);
		}	
		if(WifiPro.LocalErrorF == WIFIPRO_TRUE && WifiPro.Tick10msCnt == WIFI_SEND_IDLE)
		{
			WifiPro.LocalErrorF = WIFIPRO_FALSE;					//
			WifiPro_SendMachineErrorCommond();						//单片机主动发送错误信息
			Het_DriveWifi_WifiDataSend(CMD_010E_ERROR,UartTxBuf,WIFI_ERROR_LEN);
		}	
	}	
}
/***************************************************************************************************
* Function Name: main
* Description  : 主函数
* Arguments   :	
* Return Value: void
****************************************************************************************************/

int main(void)
{
	Het_DriveWifi_WifiInit(WifiPro_WifiUartSend,WifiPro_UartRxPro,WifiPro_WifiReset);													//wifi模块化程序初始化	
	while (1)
	{
///////////////////////////////////////////////////////////////////////////////
//WIFI程序处理区		
		WifiPro_ProtocolPro();										//WIFI信息处理
///////////////////////////////////////////////////////////////////////////////
//应用程序处理区
		UserApplicationHandle();
	}
}


=======
# 和而泰云端通讯MCU程序详解
>>>>>>> 93292493d90aed6de5be12b7f9bd4871378b735f
## 通讯协议详解
### 1、通讯数据格式
![](https://i.imgur.com/6UaieWe.png)
![](/images/通信数据格式.png)
### 2、数据包格式
![](https://i.imgur.com/05bqhgj.png)
![](/images/数据包格式.png)
#### 说明
* 起始标志：固定为5A;
* 数据长度：从数据长度到整包数据结束所占用的字节数;
* 协议版本：根据用户需要接入的平台选择版本信息，具体如下：
![](https://i.imgur.com/FrmWsta.png)
![](/images/版本信息.png)
* wifi状态：wifi模块的连接信息，发送是填0，接收时具体解析如下：
![](https://i.imgur.com/7dN3SBS.png)
![](/images/wifi状态信息.png)
* 数据帧序：设备主发0x00000000-0x0fffffff;服务器主发0X10000000-0x1fffffff;APP主发0X20000000-0x2fffffff;滚动增加,应答时原样返回;
* 保留：固定0x0000;
* 数据类型： 

|数据类型 | 数据说明 |
|--------|------------------------------------|
| 0x0108 | 心跳包 |
| 0x0208 | 心跳包应答 |
| 0x0150 | 绑定命令 |
| 0x0250 | 绑定命令应答 |
| 0x0104 | 控制数据 |
| 0x0204 | 控制数据应答 |
| 0x0105 | 运行数据 |
| 0x0205 | 运行数据应答 |
| 0x0107 | 配置数据 |
| 0x0207 | 配置数据应答 |
| 0x0406 | 时间同步请求 |
| 0x0206 | 时间同步请求应答 |
| 0x015A | 厂测命令 |
| 0x025A | 厂测命令应答 |

* 数据内容：用户自定义数据区，数据长度必须是16倍数，长度小于512字节;
* 校验码：校验码的计算方式采用(CRC16-0x8408)的方式，具体代码如下：
![](https://i.imgur.com/uQeCfXK.png)
![](/images/CRC校验.png)
* 在联网的情况下发送的命令除0x0105外都会立即应答，如在200毫秒内无应答，则需重发，最多5次，在没有联网的情况下只有心跳命令、绑定命令、厂测命令有应答。

###3、数据区定义（这里的数据内容只针对本工程模板，后续用户可以自定义）
1、控制数据

| 相对地址 | 功能 | 说明 |
|-----------|------|------|
| 0 | 开关 | 0x00：关，0x01：开 |
| 1 | 亮度设置 | 0-100 |
| 2~15 | 保留 | 保留（填0） |

2、运行状态数据

| 相对地址 | 功能 | 说明 |
|-----------|------|------|
| 0 | 工作状态 | 0x00：待机，0x01：工作中 |
| 1~15 | 保留 | 保留（填0） |

3、故障数据

| 相对地址 | 功能 | 说明 |
|-----------|------|------|
| 0 | RGB灯故障 | 0x00：正常，0x01：异常 |
| 1~15 | 保留 | 保留（填0） |


# 程序详解

## 1、程序功能简介
通过和而泰云端服务，实现RGB三色灯的控制，并能够通过后台进行在线升级。
## 2、代码目录
![](https://i.imgur.com/KEs6XTO.png)
![](/images/工程文件目录.png)
### 文件目录说明：
| 文件夹名称 | 说明 |
|-----------|------|
| BootLoader | IAP程序目录 |
| Component | wifi通讯、flash驱动、在线升级驱动目录 |
| Libraries | STM32驱动目录 |
| Project | 工程文件目录 |
| Startup | 控制数据 |
| User | 用户主程序及终端服务程序目录 |
| UserApp | 用户应用程序目录 |
### 模板工程及相关文件说明
![](https://i.imgur.com/R11Ry8e.png)
![](/images/MCU工程模板详情.png)
#### 重点文件说明
 | 文件名称 | 说明 |
 |-----------|------|
 | IapHandler.c | 升级数据处理、APP应用区跳转等 |
 | FlashDivision.h | 单片机flash地址分区及升级信息 |
 | Upgrade.c | wifi升级数据处理 |
 | Upgrade.h | 为Upgrade.c对应头文件 |
 | DriveWifi.c | wifi通讯流程管控处理 |
 | DriveWifi.h | 为DriveWifi.c对应头文件，wifi通讯流程管控处理相关信息声明 |
 | WifiConfig.h | wifi模组接入平台选择、模组绑定信息、设备信息、服务功能选择、数据长度等声明非常重要 |
 | WifiPro.c | 用户与服务器数据交互业务处理 |
 | WifiPro.h | 为WifiPro.c对应头文件 |
## 3、程序操作介绍
### 3.1 修改WifiConfig.h配置文件确定功能需求
![](https://i.imgur.com/7dTh2J8.png)
![](/images/配置选项.png)
接入模块可选种类有三种：普通低速wifi模组、GPRS模组、高速wifi模组。
联网的绑定方式可选两种：AP绑定方式、smartlink绑定方式。
接入平台可选择三种：和而泰clife平台、微信平台、京东平台。

![](https://i.imgur.com/p4P4IpD.png)
![](/images/device信息.png)
这部分的信息是在和而泰开放平台创建产品之后系统自动分配的，每一款产品对应唯一信息，如下图所示：
![](https://i.imgur.com/T9QL6Re.png)
![](/images/开放平台device信息.png)
#### 特别说明：绑定过程中如果产品devicekey和设备编码错误是无法绑定成功的。
![](https://i.imgur.com/9z28IK0.png)
![](/images/设备信息48字节.png)
此信息是设备绑定之后在云平台上记录的设备信息，包括设备的软件版本、硬件版本、整机型号等重要信息，信息由用户自定义，项目编号和整机型号都是由15位长度的ASCII组成，不足15位会自动用0补齐。

![](https://i.imgur.com/67dk0R4.png)
![](/images/数据长度.png)
数据长度是16位对齐，如果长度不正确解析数据时会报错。

### 3.2 wifi通讯重要函数API说明
#### 3.2.1	void Het_DriveWifi_WifiInit(pfUartSend _pf_uart_send,pfUartDecode _pf_uart_decode,pfWifiReset _pf_wifi_reset)
功能描述：wifi模组初始函数，用于注册用户函数。
参数描述：
_pf_uart_send – 用户串口发送字符串函数，函数名可自定义，函数原型必须为：```void fun(het_uint8_t*pbuf,het_uint16_t len)```
_pf_uart_decode – 用户命令解码函数，函数名可自定义，函数原型必须为：```void fun(het_uint16_t cmd, het_uint8_t          *pbuf,het_uint16_t len)```
_pf_wifi_reset – 用户wifi模组复位函数,函数名可自定义，函数原型必须为:```void fun(het_uint8_t flag)```
返回值：无
##### 示例如下：
![](https://i.imgur.com/m5rAkKz.png)
![](/images/初始化函数.png)
![](https://i.imgur.com/xczucfM.png)
![](/images/send函数.png)
![](https://i.imgur.com/8XXpItm.png)
![](/images/处理函数.png)
![](https://i.imgur.com/ISzmXoa.png)
![](/images/复位函数.png)

#### 3.2.2 void Het_DriveWifi_SystickISR(void)
功能描述：此函数作用是给wifi处理程序提供10ms时钟,必须放在10ms定时器里
参数描述：无
返回值：无 
#####示例如下：
![](https://i.imgur.com/64krbor.png)
![](/images/定时中断函数-wifi.png)

#### 3.2.3 void Het_DriveWifi_UsartRecvISR(het_uint8_t _het_data)
功能描述：WIFI模组串口中断接收函数,必须放在串口中断函数里面
参数描述：_het_data – 串口接收到的字节
返回值：无 
#####示例如下：
![](https://i.imgur.com/TnEiob6.png)
![](/images/wifi串口接收中断.png)

#### 3.2.4 void Het_DriveWifi_WifiModuleBindCmd(het_uint8_t _flag)
功能描述：WIFI绑定触发条件
参数描述：_flag – 如果_flag大于0,表示使能绑定操作
返回值：无
#####示例如下（本示例是通过长按按键触发绑定）：
![](https://i.imgur.com/qyKlVZ8.png)
![](/images/绑定操作.png)

#### 3.2.5 void Het_DriveWifi_WifiModuleTestCmd (het_uint8_t _flag)
功能描述：WIFI进入产测条件
参数描述：_flag – 如果_flag大于0,表示使能产测操作
返回值：无
####用法和绑定命令一样，这里就不做过多说明。 

#### 3.2.6 het_uint8_t Het_DriveWifi_GetWifiStatus(void)
功能描述：获取WiFi连接状态函数
参数描述：无
返回值：WiFi状态值
####函数原型如下：
![](https://i.imgur.com/5AConG9.png)
![](/images/wifi状态获取.png)

#### 3.2.7 enum_WResult Het_DriveWifi_WifiDataSend(enum_CMDType _type,het_uint8_t *_pbuf,het_uint8_t _len)
功能描述：发送用户私有数据函数,
参数描述：
_type – 用户发送的数据所处类型，如CMD_TYPE_CTRL表示为控制命令数据,CMD_TYPE_STATUS表示为状态命令数据
_pbuf – 用户发送数据缓存的首地址
_len – 用户发送数据的长度
返回值：发送的状态,WR_OK表示发送成功 
#####示例如下：
![](https://i.imgur.com/oc20Nmw.png)
![](/images/数据发送函数.png)

#### 3.2.8 enum_WResult Het_DriveWifi_WifiProcess(void)
功能描述：wifi绑定和数据交互处理,此函数放在主循环里面
参数描述：无
返回值：返回当前程序的状态。特别注意的是，当返回状态等于WR_WAIT_SEND_CTRL_CMD或者WR_TIMER_SEND_STATUS_CMD时，程序正处于
阻塞状态,等待用户输入设备控制和状态数据。
#####此函数管控整个wifi通讯流程流程，用户可以不必理会里面的执行逻辑，只需要根据返回值做相应的数据处理，示例如下：
![](https://i.imgur.com/IJxEAJo.png)
![](/images/wifi通讯流程管控函数.png)

#### 3.2.9 void Upgrade_SystickISR(void)
功能描述：此函数作用是给升级处理程序提供10ms时钟,必须放在10ms定时器里
参数描述：无
返回值：无 
#####示例如下：
![](https://i.imgur.com/OE91lPO.png)
![](/images/定时中断函数-upgrade.png)

#### 3.2.10 enum_UResult Upgrade_Process(void)
功能描述：在线升级处理，应和wifi处理程序配套使用。
参数描述：无
返回值：返回在线升级状态
#####此函数直接在主程序中调用即可，如有升级动作会自动处理，不需另外进行操作，示例如下：
![](https://i.imgur.com/n93KXbz.png)
![](/images/升级处理程序.png)

### 3.3 程序初始化
![](https://i.imgur.com/huM5ylG.png)
![](/images/系统初始化.png)

####初始化中需要注意的是wifi模块处理初始化，需要按照API说明中的操作来做，请参照3.2.1。
![](https://i.imgur.com/16DKPBY.png)
![](/images/wifi初始化.png)

### 3.4 主程序展示
主程序中包括系统初始化、在线升级检查、wifi通讯、用户程序处理（本地控制）。
![](https://i.imgur.com/TzdSTFV.png)
![](/images/主程序结构.png)

### 3.5 关于绑定操作
本模板中是长按K1键1S后，设备进入绑定模式，然后通过手机APP输入wifi账号密码从而连接服务器，整个过程大概持续20-25S左右。
####操作详解：
第一步，需要准备好绑定时候需要的APP，并完成注册，这个APP可以通过开放平台网站上提供的二维码下载：
![](https://i.imgur.com/qEjrBLc.png)
![](/images/下载绑定工具.png)
第二步，程序中长按K1键1S后调用Het_DriveWifi_WifiModuleBindCmd函数，具体代码如下：
![](https://i.imgur.com/WSllbEd.png)
![](/images/发送绑定命令.png)
第三步，在绑定APP中输入一个能上网的wifi账号和密码，并开始扫描设备：
![](https://i.imgur.com/QdTmudx.png)
![](/images/绑定-大类选择.png)
![](https://i.imgur.com/G8KYzvr.png)
![](/images/绑定-小类选择.png)
![](https://i.imgur.com/QynPMuV.png)
![](/images/绑定-输入wifi账号密码.png)
![](https://i.imgur.com/QYFZ6zD.jpg)
![](/images/绑定-扫描设备.png)
![](https://i.imgur.com/3yvbgg4.png)
![](/images/绑定-选择设备开始连接服务器.png)
![](https://i.imgur.com/htre7HD.png)
![](/images/绑定-连接服务器.png)
![](https://i.imgur.com/8lHjOPT.png)
![](/images/绑定-完成绑定.png)

需要注意一下，示例是IOS版本的APP操作，安卓的APP和IOS界面不同，但是操作类似这里就不另做说明了。


### 3.6 关于wifi通讯数据交互

wifi数据处理都是在WifiPro.c文件中，通讯数据分为两种，一种是本地主动上传，另一种是应答服务器数据，下面我们一一给大家举例示范。

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

### 3.7 关于wifi通讯数据处理
当服务器主动下发数据下来后，程序都会通过之前初始化函数中用户自定义的处理程序来处理接收到的数据，数据处理是需要用户自行解析的，具体样例如下：
![](https://i.imgur.com/OKfgy8h.png)
![](/images/数据处理函数.png)

### 3.8 关于在线升级说明
本工程模板包括两个项目工程，其中HetBootloader工程负责管理芯片上电后检测是否有在线升级动作，如果有则把新的程序内容拷贝至原来的APP应用区，替换掉原来的老程序，如果没有则直接跳转到应用区启动程序。而HerApplication则是应用程序代码区。该在线升级完全在芯片内部实现，并未外挂flash用于存储升级的数据，具体的分区信息可以点击FlashDivision.h文件查看。
####说明：
使用该工程的时候不要对HetBootloader工程进行操作，以免程序不能正常工作。



>>>>>>> 600b0dfbb830044fc4487bc06b1ead1ed04f4330
