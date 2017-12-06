# 1. 环境搭建

该文档是移远M26串口烧录指导。
## 1.1 设备需求
- 电脑WINDOWS98 以上系统；
- USB串口板；
- GPRS模组：移远M26；
## 1.2 软件需求
- PC机烧录软件“QFlash_V3.4.exe”；
- 待烧录固件；
## 1.3 接线图

![](https://i.imgur.com/ng5aMGX.png)

引脚接线说明：

![](https://i.imgur.com/GT2T38w.png)

# 2. 参数配置
- 按章节“1.3接线图”连接并通电；
- 打开烧录软件“QFlash_V3.4.exe”；
- 打开“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项，查询端口号COM18；

![](https://i.imgur.com/vNzVjUl.png)

- 设置COM Port：COM18；
- 设置Baudrate：460800；
- 设置Module Type：M26；
- 点击“Load FW Files”选择并打开烧录固件“app_image_bin.cfg”；烧录软件会自动加载相关文件；

![](https://i.imgur.com/Na5CYLU.png)

# 3. 操作步骤
- 点击“Start”，模块重新上电；
- 进度条从0%加载到100%显示烧录进程，烧录成功显示“PASS，FW upgrade success”。

![](https://i.imgur.com/6zJdQHB.png)


