# 快速接入

## 1.创建账号
&emsp;&emsp;用户在C-Life开放平台申请成为平台开发者，开发者可以在平台上创建及管理账户下的设备和应用。账户可分为个人账户和公司账户，在进入个人中心之后可进行维护。平台更开设了账号体系，账户可指定创建子账户，同一账号下的不同子账号可以进行分权限管理平台上的设备、应用。


## 2. 创建产品

第一步，填写产品信息

  &emsp;&emsp;在产品管理中，点击新建应用，选择产品的分类，输入产品名称和型号。注意：产品的分类决定了后续的协议配置和App模块提供，请谨慎选择。如果分类中没有你需要的选项，请联系我们。
  ![](/assets/product/CreateProduct.jpg)

第二步，选择技术方案

  &emsp;&emsp;根据产品模组选择技术方案，不同的技术方案将有不同的联网模式
![](/assets/product/CreateProduct-1.jpg)



第三步，完善产品信息


  &emsp;&emsp;创建产品成功，系统会根据产品类别等信息自动生成唯一的产品ID和设备编码，可以对该产品进行信息完善。

![](/assets/product/CreateProduct-1.jpg)



## 3.协议配置


  &emsp;&emsp;根据产品功能点进行协议的配置，协议中填写字节、参数类型、设定参数，添加保存即为一条协议。注意：产品协议位数必须为16的倍数。
![](/assets/product/ProtocolList.jpg)
![](/assets/product/ProtocolConfiguration.jpg)

### 3.1标准化协议模板

  &emsp;&emsp;根据选择的分类推荐标准化协议模板，可根据需求选择需要的协议内容，省去配置成本

## 4. H5页面配置


  &emsp;&emsp;产品实现智能化，需要由终端来进行控制。开发者可直接上传H5文件或者进入自助设计的页面，根据需求选择控件进行设计。
  ![](/assets/product/H5.jpg)

## 5.App接入

&emsp;&emsp;平台提供App开源，可通过平台下载源码进行二次开发，简单快捷的完成App的设计开发工作；App主要功能有登陆注册、设备管理、设备控制等基础功能，满足开发者的设备调试和设备管理需求
![](/assets/product/application.jpg)
![](/assets/product/application-1.jpg)

## 6.硬件接入

&emsp;&emsp;兼容市面上大部分的通讯模块，如WIFI、蓝牙、GSM、Zigbee等，提供了MCU开发基础框架，帮助开发者快速了解C-life硬件体系；平台提供多品类的标准协议模板，开发者可选择使用模板快捷开发，也可自定义协议配置
![](/assets/product/programme.jpg)

## 7.模拟调试

&emsp;&emsp;从设备调试页面进入，需要关联账号与设备mac地址，针对性的进行调试。开发者可以通过模拟调试来进行设备协议的调试，通过查看上行下行数据，以校验设备协议的配置是否正确。
![](/assets/product/AnalogDebugging.jpg)
![](/assets/product/AnalogDebugging-1.jpg)

## 8.拓展功能

### 8.1接入方案

  &emsp;&emsp;接入平台的方案分别有设备直连C-Life硬件云通道和厂商云连接C-Life硬件云通道，开发者可根据自身需求，选择合适的接入方案，这决定了设备联网的数据通道。
![](/assets/product/MarketScheme.jpg)

### 8.2联网配置

  &emsp;&emsp;用户在操作App绑定硬件时可能对绑定方式和流程不太熟悉，在本页面配置操作指引，提升App用户体验。
  ![](/assets/product/NetworkingConfiguration.jpg)

### 8.3固件升级

  &emsp;&emsp;用于管理设备固件，可针对单个或批量进行固件升级
  ![](/assets/product/FirmwareUpdate.jpg)

### 8.4发布产品

  &emsp;&emsp;完成产品的创建流程，即可申请发布到C家，在C家App上可以对设备进行管理。可享受C-Life的共享资源
![](/assets/product/ReleaseProducts.jpg)

