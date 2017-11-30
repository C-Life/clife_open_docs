# 1. 环境搭建

该文档是TI CC2541串口烧录指导，对应蓝牙模组“和而泰HET-BT2541”。
## 1.1 设备需求
- 电脑WINDOWS98 以上系统；
- 仿真器CC-Debugger；；
- 蓝牙模组“和而泰HET-BT2541”；；
## 1.2 软件需求
- 烧录工具“SmartRF Flash Programmer”；
- 待烧录固件；
## 1.3 接线图

![](https://i.imgur.com/NfkwXlR.png)

引脚接线说明：

![](https://i.imgur.com/z8CGLah.png)

# 2. 参数配置
1. 按章节“1.3接线图”连接并通电；
1. 运行SmartRF Flash Programmer.exe软件；
1. What do you want to program：Program CCXXXX SoC or MSP430；
1. Interface：fast；
1. Flash image：选择烧录文件；
1. 激活Retain IEEE address when reprogramming the chip
1. Actions：Erase，program and verify。

![](https://i.imgur.com/RdlUZ2F.png)

# 3. 操作步骤
1. 点击 “Perform actions”开始下载程序，下载进度条重新加载。
1. 下载成功显示“CC2541-ID0266：Erase,program and verify OK”。

![](https://i.imgur.com/ii1vrB6.png)


