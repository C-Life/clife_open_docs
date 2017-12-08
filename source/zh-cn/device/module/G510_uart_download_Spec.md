# 1. 环境搭建

该文档是广和通G510串口烧录指导。
## 1.1 设备需求
- 电脑WINDOWS98 以上系统；
- USB串口板；
- GPRS模组：广和通G510；
## 1.2 软件需求
- PC机烧录软件“Fibocom_upgrade.exe”；
- 待烧录固件；
## 1.3 接线图

![](https://i.imgur.com/Wa3oSAc.png)

引脚接线说明：

![](https://i.imgur.com/t0gzh3Q.png)

# 2. 参数配置
- 按章节“1.3接线图”连接并通电；
- 打开烧录工具“Fibocom_upgrade.exe”；
- 打开“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项，查询端口号COM13；

![](https://i.imgur.com/5YelO77.png)

- 设置COM：COM13；
- 设置Baudrate：115200；
- 点击“Select”选择烧录固件；

![](https://i.imgur.com/pUwgEVx.png)

# 3. 操作步骤
- 点击“Upgrade”，模块重新上电；
- 进度条从0%加载到100%则为烧录完成；

![](https://i.imgur.com/JU8Po2I.png)
