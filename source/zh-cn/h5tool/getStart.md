 
## 设计空调控制界面   
### 实现目标：    
1.实现温度控制在17度~37度，默认控制在27度   
2.实现控制界面有自主、制冷、制热、、除湿送风4个模式自由切换   
3.显示实时室内温度    
4.可控制空调电源开关   
### 预置条件：   
1.在clife官网注册为开发者并新建空调产品   
2.提供读取室内温度API接口   
3.完成下发指令：温度设置、模式切换、开关控制协议开发   
### 操作步骤：   
1登录Clife开放平台后，找到对应的“空调产品”，点击【查看产品】，进入产品详情页!   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k1.png)   
2.依次选中“页面配置—>+新建H5页面“    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k2.png)    
3选择”在线设计H5工具“，点击【确认】，进入编辑H5编辑界面；   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k3.png)      
4.实现通过图片控件更换界面背景      
 &ensp;   &ensp;4.1.从界面拖动图片控件到面板    
 [图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k4_1.png)    
 &ensp; &ensp;4.2.选中图片控件，点击上传图片，更换图片背景   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k4_2.png)   
 
 &ensp; &ensp;4.3.点击层级图标，将图片背景放置在底层    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k4_3.png)   
     
5.实现app端显示室内温度。通过关联数据事件将接口返回的室内温度参数值以文本映射的方式显示。   
 &ensp; &ensp;5.1.拖动两个文本控件到到面板     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k5_1.png) 
 
 &ensp; &ensp;5.2.单击选中文本控件，更换文本字体大小及颜色   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k5_2.png)  
  
 &ensp; &ensp;5.3.单击选中温度显示的文本控件，再点击“添加事件”     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k5_3.png) 
  
 &ensp; &ensp;5.4.选择数据关联事件，通过接口返回数据将室内温度以文本映射的方式显示在文本控件内    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k5_4.png)   
  
6.实现温度可调在17~37度之间控制，默认显示27度的功能：   
 &ensp; &ensp;6.1从控件库拖动“数字加减”控件到面板    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k6_1.png)   

 &ensp; &ensp;6.2.点击选中数字加减按钮，设置控数字加减控件的范围值为17~37度，默认显示值为27度，刻度为1     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k6_2.png) 
  
 &ensp; &ensp;6.3.点击选中数字加减按钮，点击“添加事件”；       
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k6_3.png) 


 &ensp; &ensp;6.4.设置加减控件的事件。这里会涉及到两个事件，一个是在设置温度之前要同步当前空调实际温度，另外要下发指令，      
&ensp; &ensp; &ensp; &ensp;6.4.1 数据关联事件设置。将加减控件的数据关联协议参数温度。    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k6_4_1.png) 
    
 &ensp; &ensp; &ensp; &ensp;6.4.2.下发指令设置。通过加减控件的值变化下发给协议参数温度    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k6_4_2.png)     
 &ensp; &ensp;6.5.从控件库拖出文本控件，将文本内容改为温度，并按照如下样式更文字样式    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k6_5.png)    
7.实现界面自主、制冷、制热、除湿四个模式的自由切换       
&ensp; &ensp;7.1.从控件库拖出图标单选控件到控制面板   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k7_1.png)    
&ensp; &ensp;7.2.单击选中图标单选控件，更改图标单选控件的模式名称、模式图片   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k7_2.png)      


&ensp; &ensp;7.3.单击选中图标单选控件，点击“添加事件”，通过选项改变事件，下发控件指令，选择自主、制冷、制热、、除湿4个模式分别下发模式协议不同模式指令。  
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k7_3.png)   
8.点击"预览"图标,预览设计效果   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\1Air_conditioner\k8.png)  
 




    


## 灯光控制界面   
### 实现目标：   
1.实现点击颜色盘任意颜色区域，下发到灯光显示所选颜色预置条件：     
2.可以拖动调整灯光亮度;   
3.预置多个灯光场景实现灯光快速切换；   
### 预置条件：   
1.在clife官网注册为开发者并新建灯光产品   
2.提供读取当前灯光亮度API接口    
3.完成下发指令：模式切换、灯光颜色控制、灯光亮度的协议开发      
### 操作步骤：   
1登录Clife开放平台后，找到对应“智能灯光”产品，点击【查看产品】，进入产品详情页   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D1.png)     
2.依次选中“页面配置—>+新建H5页面“      
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D2.png)  
3选择”在线设计H5工具“，点击【确认】，进入编辑H5编辑界面；    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D3.png)      
4.进入编辑界面，依次点击【样式】—>【上传图片】，选择背景11为APP界面背景      
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D4.png)   
5.实现点击APP颜色盘，让灯光显示对应的颜色   
&ensp;&ensp;5.1从界面拖出颜色盘，至于面板内     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D5_1.png)    
 &ensp;&ensp;5.2.单击选中颜色盘，点击【添加事件】     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D5_2.png)       
 &ensp;&ensp;5.3.依次选择值改变事件、下发指令动作、以及下发指令参数，添加完成后点击确认。    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D5_3.png)     
6.实现拖动进度条显示灯光亮度：    
&ensp;&ensp;6.1.从控件库拖动滑块控件到面板    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D6_1.png)     
&ensp;&ensp;6.2.单击选中滑块控件，点击【添加事件】     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D6_2.png)       
&ensp;&ensp;6.3.单击选中滑块控件，点击【添加事件】，这里涉及两个事件，一个就是将灯光的亮度回传到APP，使APP的灯光亮度值与灯光实际的亮度值一致；另一个事件为下发指令，使滑动滑块时，下发指令调节灯光亮度   
&ensp;&ensp;&ensp;&ensp;6.3.1数据关联设置。 通过数据关联的方式将灯光亮度参数回传到当前控件的亮度值       
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D6_3_1.png)  
&ensp;&ensp;&ensp;&ensp;6.3.2灯光下发指令设置。按照如下配置完成灯光进度条事件的配置    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D6_3_2.png)        
7.实现预定的灯光模式功能的自主切换 
&ensp;&ensp;7.1从控件库拖动图标单选控件到 面板      
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D7_1.png)  
&ensp;&ensp;7.2.选中图标单选控件,点击【属性】，分别设置模式为吃饭、睡觉、阅读、休闲4个灯光模式，点击【选择图标】更改模式图标；     
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D7_2.png)   
&ensp;&ensp;7.3. 选中图标单选控件，点击【添加事件】,选择选项改变事件，执行下发指令，当选择不同的模式时，下发对应模式的指令    
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D7_3.png)      
8设置完成，点击预览，查看设计效果   
[图片](\clife_open_docs-master\assets\h5tool\2Quick_start\2light_control\D8.png)  
  












