# MCU与WiFi协议模块化软件使用说明


##一、此文档包含 3 个文档，分别为
1.DriveWifi.c – wifi绑定和通信模块驱动，不可更改文件。
2.DriveWifi.h – wifi驱动头文件,不可更改文件。
3.WifiConfig.h –wifi模块配置信息，根据不同的设备而修改。

##二、函数 API 说明
###2.1	void Het_DriveWifi_WifiInit(pfUartSend _pf_uart_send,pfUartDecode _pf_uart_decode,pfWifiReset _pf_wifi_reset)
<1> Description:wifi 模组初始函数，用于注册用户函数。
<2> Arguments:
_pf_uart_send – 用户串口发送字符串函数，函数名可自定义，函数原型必须为： 
void fun(het_uint8_t*pbuf,het_uint16_t len)。
_pf_uart_decode – 用户命令解码函数，函数名可自定义，函数原型必须为： 
void fun(het_uint16_t cmd,het_uint8_t *pbuf,het_uint16_t len)。
_pf_wifi_reset– 用户wifi 模组复位函数,函数名可自定义，函数原型必须为:
void fun(het_uint8_t flag)。
<3> Return:NONE

###2.2	void Het_DriveWifi_SystickISR (void)
<1> Description:此函数作用是给程序提供 10ms 时钟,必须放在 10ms 定时器里
<2> Arguments:NONE
<3> Return: NONE 
###2.3	void Het_DriveWifi_UsartRecvISR (het_uint8_t _het_data)
<1> Description:WIFI 模组串口中断接收函数,必须放在串口中断函数里面
<2> Arguments: data – 串口接收到的字节
<3> Return: NONE

2.4	void Het_DriveWifi_WifiModuleBindCmd (het_uint8_t _flag)
<1> Description: WIFI绑定触发条件
<2> Arguments: flag – 如果 flag 大于 0,表示使能绑定操作
<3> Return:NONE

2.5	void Het_DriveWifi_WifiModuleTestCmd (het_uint8_t _flag)
<1> Description:WIFI 进入产测条件
<2> Arguments: flag – 如果 flag 大于 0,表示使能产测操作
<3> Return:NONE

2.6	het_uint8_t Het_DriveWifi_GetWifiStatus (void)
<1> Description:获取 WiFi 连接状态函数
<2> Arguments: NONE
<3> Return:WiFi 状态值

2.7	het_bool Het_DriveWifi_GetAppSynStatus (void)
<1> Description:获取 APP 同步状态函数
<2> Arguments: NONE
<3> Return:APP 同步值

2.8	enum_WResult Het_DriveWifi_WifiDataSend (enum_CMDType _type,het_uint8_t *_pbuf,het_uint8_t _len)
<1> Description:发送用户私有数据函数,
<2> Arguments:
type – 用户发送的数据所处类型， 如CMD_TYPE_CTRL 表示为控制命令数据,
CMD_TYPE_STATUS 表示为状态命令数据
Pbuf – 用户发送数据缓存的首地址
Len – 用户发送数据的长度
<3> Return:发送的状态, WR_OK 表示发送成功 

2.9	enum_WResult Het_DriveWifi_WifiProcess (void)
<1> Description:wifi 绑定和数据交互处理,此函数放在主循环里面
<2> Arguments:NONE
<3> Return:返回当前程序的状态。特别注意的是，当返回状态等于
WR_WAIT_SEND_CTRL_CMD 或者 WR_TIMER_SEND_STATUS_CMD 时，程序正处于
塞状态,等待用户输入设备控制和状态数据。

三、操作流程
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


