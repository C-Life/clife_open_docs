# 1. 环境搭建

该文档是Marvell WIFI模组HET-MW300串口烧录指导。
## 1.1 设备需求

- 电脑WINDOWS98 以上系统；
- USB串口板；
- WIFI模组HET-WM300；
## 1.2 软件需求

- 烧录工具“FlashPlus”；
- 待烧录固件；
## 1.3 接线图

![](https://i.imgur.com/ZVup2Jy.png)

引脚接线说明：

![](https://i.imgur.com/mImcU5U.png)

# 2. 参数配置

- 按章节“1.3接线图”连接并通电；
- 打开烧录工具“FlashPlus”；
- Chip：88MW30X；
- Interface：UART；
- 打开“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项，查询端口号COM8；
- COM Port：COM8；

![](https://i.imgur.com/6vgLrbL.png)

- 设置波特率：300000；
- Flash：Extermal Flash----QSPI----W25Q16BV/DV ；
- Step2：Erase Mode；

![](https://i.imgur.com/ll8xWdu.png)

# 3. 操作步骤

- 点击"![](https://i.imgur.com/tdt892P.png)"，短按按键S1，复位模组，出现下载进度条。

- 下载进度条走完，即为下载完成。
