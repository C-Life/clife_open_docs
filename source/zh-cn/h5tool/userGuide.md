## 界面概览

在开始设计属于您的产品专属APP之前，首先我们来对H5 Tool整体界面做个整体了解，H5 Tool总共分成：任务栏、页面菜单、控件库、面板区、属性区五大部分。   
![页面概览](\clife_open_docs-master\assets\h5tool\3User_guide\1Page_overview\1.png)

### 任务栏

“任务栏”定义的是全局的功能，包括返回、预览、保存功能

- 点击【返回】，退出H5-Tool   
- 点击【后退】/【前进】，返回上一步/下一步   
- 点击【预览】，进入预览界面，可以通过扫描二维码或者分享链接在手机端预览，或直接在电脑端预览   
- 点击【保存】，保存编辑内容      
### 页面菜单

页面菜单显示当前产品的所有交互页面，可对页面进行新增、复制、删除操作，也可以单击选中后在右侧的c ，对所选中页面进行重命名。

### 控件库

控件库是H5-Tool的交互设计的控件库，基本操作方式为：拖动需要的控件到面板，即可对控件进行相关的逻辑或属性操作，具体控件的功能及使用方法，可参考控件说明。

### 面板区

面板尺寸比例与选择的模拟尺寸对应（进入H5-Tool前需要选择面板尺寸），选中面板的不同控件，即可在右侧针对该控件进行属性和交互相关的操作，特定的控件可以通过的鼠标拖动的方式进行的控件尺寸的定制设设计。    
### 属性区 

属性区可对页面进行名称、属性，背景等设计；对控件进行文本、边框、填充、多状态、 交互等设计，针对不同控件其属性样式和及交互事件会有所不同。   






## 常规设置

#### 1.控件名修改      

控件名：控件名可支持更改，作为控件的文字标识，如，在参与下发控件指令时，需要根据控件名来选择对应的控件   
![控件名修改](\clife_open_docs-master\assets\h5tool\3User_guide\2common_set\CS1.png)

 

#### 2.默认/选中/禁用设置

默认/选中/禁用的作用是可以让控件有3种显示状态，在不同的状态下可以设置控件的位置、颜色、尺寸等参数，这里需要注意的是，并不是所有的控件都有这三种状态，如列表单选控件就不具备的默认、选中、禁用状态。当控件处于禁用状态时，控件对一些事件无效。  
 ![图片](\clife_open_docs-master\assets\h5tool\3User_guide\2common_set\CS2.png)

如：设计一个点击控件时让控件填充颜色为黄色的动作：

1.选中控件，控件的状态设为“选中”状态，勾选填充栏，并将颜色改为黄色后，点击“添加事件”   
 ![图片](\clife_open_docs-master\assets\h5tool\3User_guide\2common_set\CS2_1.png)

2.将事件选为“点击时”事件，添加动作选择“设置选中或禁用”，然后选择对应的控件，并将其状态改为选中状态，点击确定即完成设置。



#### 3.尺寸位置的设置

控件的位置尺寸可以通过鼠标直接拖动来实现，这里的设置是通过直接输入控件的位置尺寸参数参数实现位置和尺寸的设计，其中：

&ensp;&ensp;X：控件在画布中x轴的坐标值。

&ensp;&ensp;Y：控件在画布中y轴的坐标值。

&ensp;&ensp;W：控件的宽度值。

 &ensp;&ensp;H：控件的高度值。

#### 4.文本设置

文本设置的作用是对控件内文本内容设置字体大小、颜色、对齐方式等做设置，其中文本颜色的设置可以在颜色弹框内选择或直接输入颜色RGB值   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\2common_set\cs4.png)



#### 5.填充设置

填充作用是对控件的背景进行颜色填充，填充的方式和文本的颜色设置方式一致，可以通过输入RGB颜色值或颜在色窗口内选择对应的颜色，并且可以对填充进行不透明度的设置，不透明度的值越大，透明度越低，默认的不透明度的值为100   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\2common_set\cs5.png)

#### 6.边框设置

对边框的颜色、边框宽度以及边框的圆角设置，其中宽度和圆角的单位为px（像素），设置圆角参数输入值为圆角半径值，如圆角输入值为50，即控件的圆角半径为50px   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\2common_set\cs6.png)   









## 控件说明

#### 图像控件   
图像控件是上传本地图片到APP端的入口，上传的图片可以用于APP的背景、banner、装饰图标，特殊按钮等，图标控件支持多种事件类型和状态，如，可以设计事件：单击图像时，跳转到页面或链接操作。    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\1tx.png)  

#### 滑块控件   
滑块控件通过手指按住滑块左右滑动调节参数，可用于调节灯光亮度、音量控制、窗帘开合、摄像头调节焦距等智能场景，在使用时，需要定义好其滑动边界、刻度\样式等   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\2_1hksx.png)    
#####&ensp;&ensp;属性   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\2_2hkys.png)

    
#####&ensp;&ensp;样式   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\3_1kgys.png) 

有2种滑块控件的样式可供选择，不同的样式的控件功能一致， 通过选择不同色调使得滑块显示不同的颜色来搭配APP



#### 开关控件

开关控件是一款通过点击方式实现状态切换（如断开和连接）的控件，可用于操作设备电源开关、网络连接、等应用场景，有多种风格和样式可供选择，通过选择不同色调使得滑块显示不同的颜色来搭配APP。   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\3kg.png)   
#####&ensp;&ensp;属性    
在开关属性中选择开关状态为打开APP后的开关默认显示状态  
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\3_1kgys.png)

#### 按钮控件

按钮控件作为APP的常用控件，在这里可用于设备控制，也可以脱离设备，仅用于APP的端的交互，通过在按钮上增加不同的文字描述，可使按钮用于不同的场景，结合自定义按钮的尺寸、颜色就可以定义出你所需要的设计。
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\4an.png)   


####数字加减控件
数字加减控件采用左减右加布局，通过点击触发，适用于对精度要求不高的设备的参数调节，如：空调温度设置，热水器的水温调节、湿度调节等，调用控件前需要对控件的参数调节范围、调节精度、默认显示参数做设置，控件拥有多种样式和多种颜色提供，可以根据你的APP设计风格来搭配出最适合设计。      
#####&ensp;&ensp;属性   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\5sz.png)



#### 颜色盘控件
颜色盘控件是一款特殊的通过RGB颜色来传达指令的控件，其基本的原理是将颜色转化为信号的方式下发到设备端，使设备执行根据不同的颜色参数来执行相应的动作，常用于控制灯光颜色，根据不同的应用场景可以选择不同的颜色盘样式。   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\6ys.png)   



##### 样式1:

&ensp;&ensp;<b>操作方式：</b>点击操作

&ensp;&ensp;<b>操作说明：</b>颜色盘内的不同区域对应不同的RGB色值（一个色值包含R、G、B 3个参数），点击颜色盘内任意区域，就会读取到点击区域的RGB值，可以通过协议将读取到的参数下发到设备，设备解析对应的色值后就可以通过如灯光将颜色显示出来   

&ensp;&ensp;<b>应用场景：</b>适用于快速切换灯光颜色的场景，通过点击颜色盘，实切换灯光颜色    


##### 样式2:
&ensp;&ensp;<b>操作方式：</b>拖动操作

&ensp;&ensp;<b>操作说明：</b>在色条上将滑块拖动到不同的位置，会读取到不同的RGB值，其指令发送方式同样式1一致。   
&ensp;&ensp;<b>应用场景：</b>适用于连续渐变的灯光场景，通过拖动色条，使得灯光以渐变的方式改变


##### 样式3:
&ensp;&ensp;<b>操作方式：</b>点击操作

&ensp;&ensp;<b>操作说明：</b>前7个色块为预置颜色，其作用是帮助快速选择灯光颜色，点击第8个色块后弹出颜色盘，对颜色盘的操作方式同样式1一致   
&ensp;&ensp;<b>应用场景：</b>适用预置灯光颜色场景，可以快速切换到预置的灯光颜色   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\6_1yssx.png)   


#### 过程控件

过程控件由多个单过程组合成而成的控件，用于反应事件的进度，可用于网络连接，设备连接等场景，也可以脱离设备作为APP交互进度展示功能，过程控件有16种色调搭配样式，可以根据实际APP风格 选择不同颜色的样式   
![图片](h\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\7gc.png)      
&ensp;&ensp;<b>填充</b>    


过程中颜色：正在执行的过程的颜色，当过程由过程外进入到过程中时，颜色变为过程中的颜色

过程外颜色：当下未执行的过程的颜色，当过程由过程中进入到过程外时，颜色变为过程外的颜色
     
&ensp;&ensp;<b>控件属性</b>     
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\7_1gcys.png)     

#### 图标单选控件    

图标单选控件是一款包含多种模式的单选控件，控件支持模式图标的样式、颜色更换、图标底部的文字设置，控件可以结合设备使用，如，当点击不同的图标就切换到不同的设备场景、读取设备参数，也可以脱离设备用于页面切换    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\8tb.png)    
&ensp;&ensp;<b>控件属性</b>    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\8_1tbms.png)      
数量：图标单选控件包含的图标总数，最少数量为2个，最多8个，可设置个数   
当前模式：进入的APP时的默认选项     
名称：选中模式的名称更改以及单个模式下的图标更换





#### 容器控件

容器控件是一个承装和展示API接口数据的平台，其作用是将接口返回数据进行筛选展示，针对单个数据和多个数据的显示有元素容器和列表容器两种类型容器选择。   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\9rq.png) 

 
##### 元素容器  
元素容器是针对单类元素的容器控件，通过选择不同的模板，可以使得元素有不同的展示方式    
&ensp;&ensp;<b>控件属性</b>  
 ![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\9_1rqsx.png)   
&ensp;&ensp;<b>添加事件</b>    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\9_2sx.png)   

##### 表格容器      


表格容器和元素容器不同的是同时显示多个数据并按照的列的方式显示，每一列代表一个属性，每一行所描述的是同一个事物的不同属性参数。针对每一列的显示内容属性，可以通过配置对应的接口和字段实现
  
&ensp;&ensp;<b>控件属性</b>    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\3block_explan\9_3rq.png)    
   
&ensp;&ensp;<b>添加事件</b>      






## 事件交互     

#### 新增事件     
<b>一.新增事件流程：</b>    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\1new\1.png)

<b>二.步骤说明：</b>    


步骤1.选中控件，点击【添加事件】    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\1new\2.png)  
步骤2：选择事件。在事件名称栏下拉菜单中选择需要的事件名称   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\1new\3.png)    
步骤3：选择交互动作。在交互动作下拉菜单选择对应交互动作，选择完成后点击【添加动作】   
步骤4：动作设置。设置动作内容   
步骤5：点击【确定】。设置完成点击【确定】完成设置；      











 ## 事件类型

<b>数据关联：</b>   数据关联是将源数据（协议数据和接口返回数据）与控件参数定义成特定映射关系，如，可以通过文本映射的方式将接口返回的数据通过文本的方式在矩形控件内显示。所有控件都支持数据关联事件。    


<b>1.接口返回数据：</b> 接口返回数据是数据关联事件的一类源数据来源，控件通过接口返回数据，将接口数据映射到控件   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\2tye\1.png)      


<b>2.协议数据：</b>协议数据是数据关联事件的一类源数据来源，控件通过调用协议，将协议数据映射到控件    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\2tye\2.png)    



<b>3.映射：</b>映射是源参数（协议参数或接口返回参数）通过一定的逻辑定义与控件参数形成一一对应的关系，这里的映射包括

文本映射：将源数据通过文本方式显示在控件内，如，接口返回参数是数字2，可直接将数字2显示在文本上

选项映射：根据不同的源数据与控件的不同目标选项对应，如可以定义返回参数1、2、3分别对应单选菜单的模式1、模式2、模式3选项

值映射：将源数据的值映射到控件值，如，将返回的源数据值映射到数字加减控件的值

图片映射：图片类控件的映射，如，对于不同的源数据值或者范围可以对应不同的图片显示。

状态映射：可以设定不同的源数据对应控件不同显示状态（默认、选中、禁用状态）

特殊映射：特殊映射是在常规映射的基础上增加对源数据的运算，包括持“=”、“<”、“>”、“≤”、“≥”、“=”、“≠”、 “+”、“-”、“×”、“÷”、“()”等逻辑运算和小数运算

![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\2tye\3.png)  

<b>点击事件：</b> 通过点击方式触发，如当点击按钮时，跳转页面

<b>打开/关闭事件：</b>点击方式触发的事件，如可以设计事件：当打开开关时，下发指令,让设备灯光打开

<b>选项改变：</b>当选项改变时触发的事件，如列表单选控件，选项不同，作为事件的触发，结合条件可以针对单个选项进行事件定义

<b>值改变：</b>通过监测控件值的改变来触发事件，例如滑块控件，当滑动滑块控件时，其对应的值会发生改变，可以以此定义事件

<b>状态改变：</b>有三种状态（默认、选中、禁用状态）的控件才支持状态改变事件，如，控件从默认状态切换到选中状态时，其状态发生改变。

<b>加载事件：</b>加事件是页面在加载信息时所触发的事件，可以用于页面加载时显示加载效果、页面跳转、下发指令等

<b>动态变化：</b>事件条件所能监控的所有参数的变化均属于动态变化的范畴，一般动态变化结合条件一起使用，用于精准监测某个或者多个参数的变化    




## 交互动作      

交互动作是事件成立时APP需要执行的动作，不同的事件所执行的动作会有所不同，交互动作包括页面交互和数据的交互。   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\1.png)  

<b>下发指令：</b>下发协议指令，如“灯光控制”协议，包括打开、关闭两个指令，当选择打开参数时，就会下发打开灯光的指令，选择关闭时参数，就会下发关闭灯光的指令，如下图。   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\2xf.png)  

<b>页面跳转：</b>事件成立时跳转到其他的界面的动作，跳到的页面为该页面的默认状态。   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\3tz.png)  

<b>显示/隐藏：</b> 事件成立时控件执行显示或隐藏的操作，当控件执行隐藏时，在页面不可见    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\4xs.png)  

<b>下发控件指令：</b>通过下发控件指令动作可以通过勾选，同时下发多个控件指令的动作，其作用是可以通过一个动作实现让多个控件的指令同时下发，提高交互设计效率，当执行指令下发时忽视下发控件的指令条件   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\5xfkj.png)  


<b>设置选中/禁用：</b>控件显示选中/禁用状态，当控件被设为禁用状态时不支持事件操作。

<b>设置文本：</b>当事件成立时，控件显示文本编辑内容
<b>设置变量：</b>设置变量动作有传递事件，计数统计、调用参数等功能，如可以通过设置变量的方式来统按钮控件被点击的次数     
&ensp;&ensp;<b>新建变量步骤：</b>   
1.在引用变量界面点击“创建变量    
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\6bl.png)   
2.点击1步“添加”，添加变量，点击第2步更改变量名，点击“确定”确认增加变量   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\7bl.png)    
3.设置变量参数   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\8bl.png)     
&ensp;&ensp;3.1.高级设置      
在给变量设置参数时，可以点击高级，通过接口返回参数赋值给变量，这样就可以通过变量绑定接口数据参数，方便交互   


&ensp;&ensp;&ensp;&ensp;1.点击“高级”，选择插入接口返回数据   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\9gj.png)     
&ensp;&ensp;&ensp;&ensp;2.选择对应接口，以及接口参数字段，点击“确认”完成高级设置   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\10gj.png)  

 

         

 

<b>设置图片：</b>当事件成立时，使图片控件显示切换为预置的图片，如，当点击图标单选控件不同选项时，让图片控件切换为预置的图片。

<b>触发API调用：</b>当事件成立时，通过接口调用的方式调取后台或者第三方接口数据    
&ensp;&ensp;<b>添加API接口步骤</b>   
1.选择“触发API接口调用”动作并点击【添加动作】，点击"创建API"，再点击【确认】   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\11api.png) 

2.输入需要添加的API接口参数，点击【确定】完成创建   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\12api.png)    


3.选择对应的接口，输请求body和请求header的参数，点击【确定】，完成API调用   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\13api.png)    


&ensp;&ensp;3.1.高级：通过点击“高级”可以在输入框插入变量，这样的好处是方便参数的修改复用和交互，这里需要注意的是支持同时添加多个变量     
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\3act\14api.png)          


## 事件条件    
条件分为条件匹配方式和条件判断两部分，其中条件匹配方式包括满足所有条件和满足任意一个条件；条件判断将源数据与目标数据通过逻辑运算判断条件真假   
![图片](\clife_open_docs-master\assets\h5tool\3User_guide\4.event_interanction\4condition\1tj.png)  


条件匹配方式：满足条件的方式有同时满足所有条件和任意满足一个条件两种匹配方式，条件和事件是逻辑与的关系，即当事件触发且同时条件满足时，才执行动作   
条件主体：条件主体包括协议参数和变量值   
逻辑规则：逻辑规则包括“=”、“<”、“>”、“≤”、“≥”、“=”、“≠”、包含逻辑规则   
条件目标：条件目标可以是协议状态、协议参数，变量、数字等    
复制条件：复制图标所在行的条件     
删除条件：删除图标所在行的条件    






## 数据定位       


当需要从接口返回数据中取出指定信息时，数据定位功能提供了一套标准的标记方法，能够从对象或数组中找到指定的一个数据或一类数据。


<b>1.从对象中找到指定的数据</b>


示例：接口返回数据如下

data:{

      name:{

            key1:'Hello World

            key2:'Hello Sir'

      }

}

若需要从返回数据中取到key2的值“Hello Sir”，则可以编写数据定位为：data.name.key2

当返回的对象比较多比较深的时候，可以一直往定位，直到找到具体的字段数据；如：data.name1.name2.name3.key2


<b>2.从数组中找到指定的数据</b>


示例：接口返回数据如下

data:{

         name:[

                    {key:'Hello World,number:0},

                    {key:'Hello Sir',number:1}

         ]

}

若需要从返回数据中取到第二个key的值“Hello Sir”，则可以编写数据定位为：data.name[1].key注意：[]里是标记数组里对象的序号，要从0开始数。这里取第二个所以是1。


<b>3.从数组中找到指定一类的数据</b>


示例：接口返回数据如下

data:{

         name:[

                    {key:'Hello World,number:0},

                    {key:'Hello Sir',number:1},

                    [key:'Hello Miss',number:2}

         ]

}

这种用法是用于给容器控件定位数据，让字段知道从数组里取出所有对象的这个字段的值，若需要取出数组里所有对象的序列号number，则可以编写数据定位为：data.name[i].number .这里跟从数组里取指定数据有些许差别，是通过一个指代字母“i”来替代具体的序号，即时代表取所有对象，而不是具体某一个对象。



注意：数据定位的方式是不区分控件的展示类型的。如数据定位的结果与控件形式不匹配，会出现展示的异常。例如给一个文本控件关联数据时，本应该定位为一个值，但编写定位时编写有误，定位到一个对象或数组中的一类数据，这时候程序仍然能正常执行，但界面会显示异常。所以编写数据定位时，请认真检查核验展现效果。    
   
## 视频专区   
   
  


<center class="sixth">

 <a href="https://v.youku.com/v_show/id_XMzg4ODQ3NjkyMA==.html?spm=a2hzp.8244740.0.0"><img src="\clife_open_docs-master\assets\h5tool\3User_guide\7video_area\1.png" width="120" height="112" border="0"></a> 
<a href="https://v.youku.com/v_show/id_XMzg4ODQ3NDU5Mg==.html?spm=a2hzp.8244740.0.0"><img src="\clife_open_docs-master\assets\h5tool\3User_guide\7video_area\2.png" width="120" height="112" border="0"></a>
<a href="https://v.youku.com/v_show/id_XMzg4ODQ3NzYyOA==.html?spm=a2hzp.8244740.0.0"><img src="\clife_open_docs-master\assets\h5tool\3User_guide\7video_area\3.png" width="120" height="112" border="0"></a>
<a href="https://v.youku.com/v_show/id_XMzg4ODQ2NDkzMg==.html?spm=a2hzp.8244740.0.0"><img src="\clife_open_docs-master\assets\h5tool\3User_guide\7video_area\4.png" width="120" height="112" border="0"></a> 
<a href="https://v.youku.com/v_show/id_XMzg4ODQ3NjA2MA==.html?spm=a2hzp.8244740.0.0"><img src="\clife_open_docs-master\assets\h5tool\3User_guide\7video_area\5.png" width="120" height="112" border="0"></a>
<a href="https://v.youku.com/v_show/id_XMzg4ODQ3ODQ4OA==.html?spm=a2hzp.8244740.0.0"><img src="\clife_open_docs-master\assets\h5tool\3User_guide\7video_area\6.png" width="120" height="112" border="0"></a>

</center>   