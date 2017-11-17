ESP-WROOM-02 WiFi Module(Version 0.3)
# 1. 产品概述

乐鑫智能互联平台 ESP8266EX 拥有高性能无线 SOC，给移动平台设计师带来福音，它以最低成本提供最大实用性，为WiFi功能嵌入其他系统提供无限可能。  

![](https://i.imgur.com/20CO5e0.png)
             
					                                           
ESP8266EX是一个完整且自成体系的 WiFi 网络解决方案，能够独立运行，也可以作为从机搭载于其他主机 MCU 运行。ESP8266EX 在搭载应用并作为设备中唯一的应用处理器时，能够直接从外接闪存中启动。内置的高速缓冲存储器有利于提高系统性能，并减少内存需求。

另外一种情况是，ESP8266EX 负责无线上网接入承担 WiFi 适配器的任务时，可以将其添加到任何基于微控制器的设计中，连接简单易行，只需通过 SPI /SDIO 接口或 I2C/UART 口即可。

ESP8266EX 强大的片上处理和存储能力，使其可通过GPIO口集成传感器及其他应用的特定设备，实现了最低前期的开发和运行中最少地占用系统资源。

ESP8266EX 高度片内集成，包括天线开关 balun、电源管理转换器，因此仅需极少的外部电路，且包括前端模组在内的整个解决方案在设计时将所占PCB空间降到最低。

装有ESP8266EX 的系统表现出来的领先特征有：节能在睡眠/唤醒模式之间的快速切换、配合低功率操作的自适应无线电偏置、前端信号的处理功能、故障排除和无线电系统共存特性为消除蜂窝/蓝牙/DDR/LVDS/LCD 干扰。
## 1.1. 特点
- 802.11 b/g/n
- 内置低功耗32位CPU：可以兼作应用处理器
- 内置10bit高精度 ADC
- 内置TCP/IP 协议栈
- 内置TR开关、balun、LNA、功率放大器和匹配网络
- 内置PLL稳压器和电源管理组件
- 支持天线分集
- STBC、1x1 MIMO、2x1MIMO
- A-MPDU 、A-MSDU的聚合和0.4s的保护间隔
- WiFi@2.4 GHz，支持WPA/WPA2安全模式
- 支持STA/AP/STA+AP 工作模式
- 支持Smart Config 功能（包括Android和iOS设备）
- HSPI 、UART、I2C、I2S、IR Remote Control、PWM、GPIO
- 深度睡眠保持电流为10uA，关断电流小于5uA
- 2ms之内唤醒、连接并传递数据包
- 802.11b 模式下+20dBm的输出功率
- 待机状态消耗功率小于1.0mW(DTIM3)
- 工作温度范围：-40℃-125℃
- 模组通过FCC, CE, TELEC认证
## 1.2. 主要参数

表 1 介绍了该模组的主要参数。

![](https://i.imgur.com/MD6lj1e.png) 

# 2. 接口定义

ESP-WROOM-02共接出18个接口，表 2 是接口定义。

![](https://i.imgur.com/zHI5pPM.png)

**注意：**

![](https://i.imgur.com/LTIJFkW.png)

![](https://i.imgur.com/pAjaSIU.png)

# 3. 外型与尺寸
ESP-WROOM-02贴片式模组的外观尺寸为18mm＊20mm＊3mm（如图 2 所示）。该模组采用的是容量为4MB，封装为SOP-150mil的SPIFlash。模组使用的是3DBi的PCB板载天线。
            
![](https://i.imgur.com/Nrjmscv.png)

![](https://i.imgur.com/mSbmVZz.png)

# 4. 功能描述

## 4.1. MCU

ESP8266EX内置Tensilica L106超低功耗32位微型 MCU，带有16位精简模式，主频支持80MHz和160MHz，支持 RTOS。目前 WiFi 协议栈只用了20%的MIPS，其他的都可以用来做应用开发。MCU
可通过以下接口和芯片其他部分协同工作：

- 连接存储控制器、也可以用来访问外接闪存的编码RAM/ROM接口 (iBus)

- 同样连接存储控制器的数据 RAM 接口 (dBus)

- 访问寄存器的AHB接口
# 4.2. 存储描述

## 4.2.1. 内置 SRAM与 ROM

ESP8266EX芯片自身内置了存储控制器，包含ROM和SRAM。MCU可以通过iBus、dBus和AHB接口访问存储控制器。这些接口都可以访问ROM或RAM单元，存储仲裁器以到达顺序确定运行顺序。

基于目前我司Demo SDK的使用SRAM情况，用户可用剩余SRAM空间为：

RAM size < 36kB (station 模式下，连上路由后，heap+data 区大致可用36KB左右。)

目前ESP8266EX片上没有programmable ROM，用户程序存放在SPI Flash中。
## 4.2.2. SPI Flash

当前 ESP8266EX 芯⽚片支持使用 SPI 接口的外置 Flash，理论上最大可支持到16MB的SPI flash。目前该模组外接的是4MB的SPI Flash。

建议Flash容量：

不支持云端升级：512 kbit

可支持云端升级：1 MB

支持的SPI模式：支持Standard SPI 、Dual SPI 、DIO SPI、QIO SPI， 以及 Quad SPI 。

注意，在下载固件时需要在下载工具中选择对应模式，否则下载后程序将无法得到正确的运行。
## 4.3. 晶振

目前晶体40M，26M及24M均支持，使用时请注意在下载工具中选择对应晶体类型。晶振输入输出所加的对地调节电容C1、C2可不设为固定值，该值范围在 6pF〜～22pF，具体值需要通过对系统测试后进行调节确定。基于目前市场中主流晶振的情况，一般26Mhz晶振的输入输出所加电容C1、C2在10pF以内；一般40MHz晶振的输入输出所加电容10pF<C1、C2<22pF。

选用的晶振自身精度需在±10PPM。晶振的工作温度为 -20°C - 85°C。

晶振位置尽量靠近芯片的XTALPins (走线不要太长)，同时晶振走线须用地包起来良好屏蔽。

晶振的输入输出走线不能打孔走线，即不能跨层。晶振的输入输出走线不能交叉，跨层交叉也不行。

晶振的输入输出的bypas 电容请靠近芯片左右侧摆放，尽量不要放在走线上。

晶振下方4层都不能走高频数字信号，最佳情况是晶振下方不走任何信号线，晶振TOP面的铺通区域越大越好。晶振为敏感器件，晶振周围不能有磁感应器件，比如大电感等。

## 4.4. 接口说明

![](https://i.imgur.com/YjI5iHY.png)

## 4.5. 最大额定值

![](https://i.imgur.com/OrsgDBz.png)

## 4.6. 建议工作环境

![](https://i.imgur.com/EnmYNkm.png)

## 4.7. 数字端口特征

![](https://i.imgur.com/TXldD3r.png)

**注意：如无特殊说明，测试条件为：VDD=3.3 V，温度为20 ℃。**
## 5. RF参数

![](https://i.imgur.com/D7klj7Z.png)

# 6. 功耗

下列功耗数据是基于3.3V 的电源、25°C 的周围温度，并使用内部稳压器测得。


1. 所有测量均在没有 SAW 滤波器的情况下，于天线接口处完成。

2. 所有发射数据是基于 90% 的占空比，在持续发射的模式下测得的。

![](https://i.imgur.com/tMHtCmu.png)

注①：Modem-Sleep⽤用于需要CPU一直 处于工作状态 如PWM或I2S应用等。在保持WiFi连接时，如果没有数据传输，可根据802.11标准(如U-APSD)，关闭WiFiModem电路来省电。例如，在 DTIM3时，每sleep300mS，醒来3mS接收AP的Beacon包等，则整体平均电流约15mA。

注②：Light-Sleep用于CPU可暂停的应用，如WiFi开关。在保持WiFi连接时，如果没有数据传输，可根据802.11标准 (如U-APSD)，关闭WiFiModem电路并暂停CPU来省电。例如，在 DTIM3 时，每sleep300ms，醒来3ms接收AP的Beacon包等，则整体平均电流约0.9mA。

注③：Deep-Sleep不需一直保持WiFi连接，很长时间才发送一次数据包的应用，如每100 秒测量一次温度的传感器。例如，每300s醒来后需0.3s-1s连上AP发送数据,则整体平均电流可远小于1mA。
# 7. 倾斜升温

![](https://i.imgur.com/skZEL63.png)

# 8. 原理图

![](https://i.imgur.com/t7zoRTo.png)