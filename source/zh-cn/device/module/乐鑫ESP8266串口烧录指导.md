# 1. 环境搭建
 
该文档是乐鑫WIFI模组ESP-WROOM-02（芯片ESP8266）串口烧录指导。
## 1.1 设备需求

电脑WINDOWS98 以上系统；

USB串口板；

WIFI模组ESP-WROOM-02；
## 1.2 软件需求

烧录工具“ESP_DOWNLOAD_TOOL_V2.4”；

待烧录固件；
## 1.3 接线图

![](https://i.imgur.com/4gCy0u9.png)

引脚接线说明：

![](https://i.imgur.com/hBIalSS.png)

# 2. 参数配置
- 按章节“1.3接线图”连接并通电；
- 打开烧录工具“ESP_DOWNLOAD_TOOL_V2.4 ”；
- 选择烧录固件；
- 选择26M晶振；
- 打开“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项，查询端口号COM8；

![](https://i.imgur.com/VLIaHkV.png)

- COM PORT：COM8；
- 设置波特率：57600；
- FLASH SIZE：16Mbit-C1；

![](https://i.imgur.com/43DC1UG.png)

# 3. 操作步骤
- 点击"![](https://i.imgur.com/0i1jR0B.png)"图标变成"![](https://i.imgur.com/JwagEef.png)"
- 按住KEY2，再短按KEY1复位模组，启动烧录模式，图标由“等待上电同步”变成“下载中”，再松开KEY2；
    
![](https://i.imgur.com/ci3xeYT.png)

- 进度条走完，“下载中”变成“完成”即为烧录成功。
- 模组重新上电即可正常运行程序。


    