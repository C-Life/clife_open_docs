# Amazon Echo设备接入


# 1. 概述

描述将接入到开放平台的设备接入echo，通过echo实现语音控制设备的整个步骤，大致分为Amazon Alexa配置、开放平台配置、echo使用等几大部分来说明；本文档将以明灯香薰机为例，介绍整个接入流程。

## 1.2 参考资料

Amazon Alexa 开发文档：

<a href="https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html">https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html(Custom Skills)</a>


# 2. Amazon Alexa配置

## 2.1 程序描述

Amazon Echo内置的基于亚马逊云的语音助手Alexa，通过Amazon官方提供的Alexa开发者平台，开发、配置自己的技能，并通过Echo与该技能进行交互。

## 2.2 配置要求

Alexa 开发者平台：https://developer.amazon.com/alexa
账号：amazon developer账号

## 2.3 配置步骤

### 2.3.1 Alexa账号登录

打开alexa开发者平台首页后，首先点击右上角“Sign In”登录系统，（若没有账号，根据要求注册一个，此处略），登陆成功后，点击右上角“Your Alexa Dashboards”，进入alexa技能选择页面，选择Alexa Skills Kit下Get Started，进入列表管理页面，如图1、2所示：

<img src="/assets/echo/1Thelocationoftheloginlinkandthelistlink.jpg"  alt="设备主框架" align=center />              
图1 登录链接、列表链接所在位置
            
<img src="/assets/echo/2Skilltypeselection,skilllistpage.jpg"  alt="设备主框架" align=center />
<img src="/assets/echo/2Skilltypeselection,skilllistpage2.jpg"  alt="设备主框架" align=center />                           
图2 技能类型选择、技能列表页面

### 2.3.2 创建一个新的Skill

点击“Add a New Skill”按钮，创建一个新Skill，分为如图3中几部分配置：

<img src="/assets/echo/3Skillconfigurationclassification.jpg"  alt="Skill配置分类" align=center />                      
图3 Skill配置分类

Skill Information

<img src="/assets/echo/4SkillInformationFillintheitem.jpg"  alt="Skill Information填写项" align=center />               
图4 Skill Information填写项

如图4所示，创建一个技能，至少需要填入以上4项：

* 技能类型目前开放平台仅支持自定义类型，故应选择“Custom Interaction Model”；

* 语言目前支持英语（包括各地方英语如美式英语、英式英语、印度英语等）、德语及日语，按目前需求，请选择美式英语（English (U.S.)）即可；

* 技能名称即将要创建、发布的Skill的名称，此名称在发布后用于被用户查找使用；此例中输入：AromatherapyMachine

* 唤醒技能的名称，当用户对echo说当前名称时，即可唤醒该技能与其进行交互；此例中输入：aroma
Global Fields项中目前开放平台均不支持，故此文档不再介绍，点击下方“save”按钮保存，即可成功创建一个Skill，进入下一步配置。
Interaction Model
此页面有三部分配置：意图结构配置（Intent Schema）、自定义插槽配置（Custom Slot Types）及示例语句配置（Sample Utterances）,此部分配置决定了接入echo的设备是否能够被正常的控制。

* Custom Slot Types : 此处为接入设备，仅需配置自定义插槽即可（内置插槽可在官网进行了解）。此处需要注意的是，配置自定义插槽，需要对要接入设备的控制协议有一定的了解，以便在此处进行配置，同时，此处配置的自定义插槽，将作为在开放平台Echo接入中配置关联关系时参考使用，决定了是否可以正确控制设备，请慎重配置。按照明灯香薰机，此部分相关配置如图6所示：

<img src="/assets/echo/6ToconfigureCustomSlotTypes.jpg"  alt="明灯香薰机Custom Slot Types配置" align=center />              
图6 明灯香薰机Custom Slot Types配置

根据明灯香薰机协议，发现可以通过语音来达到控制效果的协议属性有：mist（雾化设置）、mode（模式设置）、brightness（亮度设置0~100）等，故此处产生以下slot配置：设置开关POWER（即亮度为100和0），识别词语为on、open、off等、设置雾化模式MIST，识别词语为close、high等，设置亮度BRIGHTNESS，识别词语填入香薰机协议中范围值；点击“Add Slot Type”按钮，可以添加新的插槽类型（英文字母需大写，单词之间可用_隔开）和值(以换行符隔开)，输入完成后点击“Add”保存按钮即可，如图7所示：

<img src="/assets/echo/7AddtoCustomSlotTypes.jpg"  alt="添加Custom Slot Types" align=center />                     
图7 添加Custom Slot Types

* Intent Schema：意图表示满足用户的口头请求的动作，需要配置语音输入指令和Custom Slot Types之间的对应关系，一个Intent Schema支持配置多个意图，格式如下：

```
{
  "intents": [
    {
      "intent": "GetHoroscope",
      "slots": [
        {
          "name": "Sign",
          "type": "LIST_OF_SIGNS"
        }
      ]
    },
    {
      "intent": "GetLuckyNumbers"
    }
  ]
} 
```

本文档仅配置一个意图示例，如下所示：

```
{
  "intents": [
    {
      "slots": [
        {
          "name": "mist",
          "type": "MIST"
        },
        {
          "name": "mode",
          "type": "MODE"
        },
        {
          "name": "brightness",
          "type": "BRIGHTNESS"
        },
        {
          "name": "power",
          "type": "POWER"
        },
        {
          "name": "value",
          "type": "VALUE"
        }
      ],
      "intent": "AromatherapyMachineControl"
    }
  ]
}
```

其中“intent”项即为意图名称,name表示需要从Echo接收到的变量（稍后会用到），type表示该变量对应的Slot值。注意：只有配置在此处的Custom Slot Types，才可以被使用。
	Sample Utterances：示例语句，表示当用户使用Echo语音输入类似以下语句时，可得到相应的回应（即设备有相应控制）。此语句需有以下部分：意图名称、包含Intent Schema的短语+{name}，如图8所示（此为香薰机支持的几种控制短语）：

<img src="/assets/echo/8Acontrolphrasesupportedbyanaromatherapymachine.jpg"  alt="香薰机支持的控制短语" align=center />                                                      
图8 香薰机支持的控制短语

应用小提示：可根据自己的需求，配置多个{name}组合短语，如：tell aroma to turn {power} and switch to {mode} mode

至此，Interaction Model 页面已配置完成。
Configuration
此页面配置技能响应的服务接口、账号关联接口及相关政策地址等。

<img src="/assets/echo/9Responseserviceinterfaceconfiguration.jpg"  alt="响应服务接口配置" align=center />                
图9 响应服务接口配置

如图9所示，EndPoint选择HTTPS模式，Default地址栏，填写开放平台Echo接入中提供的url地址，下方根据服务器地理位置不同可填入不同区域（亚洲、美洲等）的地址，此处我们选No。

<img src="/assets/echo/10AccountAssociationandrelatedpolicyaddress.jpg"  alt="账号关联和相关政策地址" align=center />         
图10 账号关联和相关政策地址

如图10，首先在第一项“Do you allow users to create an account or link to an existing account with you?”选择Yes，在弹出的账号关联相关项中，Authorization URL项输入开放平台Echo接入中的授权URL ，Client Id可以随便填写，我们不对其进行校验，Authorization Grant Type选择Implicit Grant；最下方的隐私政策网址，理论上应由厂商自己填写自己产品相关的隐私政策网址。
至此，端口和账号关联页面配置完成。
SSL Certificate
证书选择，需要按照我们给出的端口来选择，此处为第一项，如图11所示：

<img src="/assets/echo/11SSLCertificateselection.jpg"  alt="SSL证书选择" align=center />                                     
图11 SSL证书选择

Test
至此，Skill基本配置已完成，可以开始执行技能调试，Alexa提供了一套模拟服务器，可以模拟echo请求，便于我们调试，如图12所示：

<img src="/assets/echo/12Demonstrationofthearomatherapymachine.jpg"  alt="香薰机调试结果演示" align=center />                            
图12 香薰机调试结果演示

输入“tell aroma to turn on”（模拟对着echo说），点击Ask AromatherapyMachine，会向在Configuration中配置的端口地址发送意图请求，Service Request 为Alexa解析短语后发送到C-Life服务器的请求信息，其中包含了要控制设备的意图（slot）及相应的控制值，Service Response 为C-Life服务器作出一系列动作后返回给Alexa的响应结果。
Publishing Information
一般来说，技能调试完成后，需要将技能发布至Skill 商城中，以便其他用户可以使用该技能，此时需要填写此页面的发布信息。
Category ：种类，按照接入开放平台的设备，选择Smart Home类
Testing Instructions ：测试说明，需要详细说明如何测试技能，如果有账号要求，请提供测试账号以便测试，如果有硬件要求，请硬件在测试过程中保持在线状态，不要出现任何控制短语都提示设备不在线的情况。此部分信息仅为Alexa测试团队使用，不会展示给客户。
Countries & Region ：默认选择第一个全部国家和地区均可使用该技能。
Short Skill Description ：技能简介，显示在Alexa技能应用列表中的介绍（160个字符内）
Full Skill Description ： 技能的目的和功能的描述。如：如何控制设备，支持控制设备的那些功能等。此说明在Alexa应用程序的技能明细卡上显示给客户。
Example Phrases ：出现在Alexa应用程序技能明细卡上的示例语句（3条），此示例语句需要帮助用户了解Skill的核心功能。
Keywords ：关键词，选填，可帮助快速查找Skill
Images ： 上传两张大小符合要求的icon图标。
Privacy & Compliance
隐私和政策法规，需要厂商根据实际情况来选择填写，如图13所示：

<img src="/assets/echo/13Privacyandpolicyandregulation.jpg"  alt="隐私和政策法规配置" align=center />                             
图13 隐私和政策法规配置

根据目前C-Life接入的设备，第一项此技能不需要进行购买，选择No，第二项，不会收集用户信息，选择No；第三项，不限制使用年龄；选择No，第四项，复选框选择同意出口合规性；第五项，此技能中不含有广告；第五项，隐私政策网址，使用条款网址(可选填)，应由厂商自己配置。
配置完以上所有页面，即左侧菜单全部通过（如图14所示）后，即可点击“Submit for certification”按钮，提交技能到Amazon处进行审核，审核通过后其它用户即可使用此skill。

<img src="/assets/echo/14Completeconfiguration.jpg"  alt="全部配置完成" align=center />                                       
图14 全部配置完成

# 3. 开放平台配置

## 3.1 程序描述

配置开放平台端，是为了让Alexa发送过来的指令，可以转化为具体产品的协议指令，从而达到控制设备的目的。

## 3.2 配置要求

1、产品成功接入开放平台
2、设备满足使用条件（即可用App对设备进行控制）
同时满足以上两个条件的产品，才可以接入echo。

## 3.3 配置步骤

端口详情
提供给厂商，需要在alexa端配置时填入的一些信息，包括端口地址及授权url（账号关联）地址。
Skill资料设置
目前开放平台仅支持Custom模式（即Custom Skills）接入，skillID处填入在alexa端创建的技能id。
语音命令配置
此部分配置需结合在alexa端配置的Interaction Model页进行配置，将会详细介绍开放平台中的配置与alexa端的配置对应关系。点击页面“添加按钮”，显示当前产品对应的控制协议，如图15所示：

<img src="/assets/echo/15Productcontrolprotocol.png"  alt="产品控制协议" align=center />                         
图15 产品控制协议

枚举类型属性：选择想要配置的属性，如“模式设置”，点击下一步，进入具体属性值对应配置，如图16所示：
<img src="/assets/echo/16Configurethepatternsettingproperty.png"  alt="配置'模式设置'属性" align=center />                               
图16 配置“模式设置”属性

* Type对应alexa端配置Interaction Model页，Intent Schema中对应的Slots中的name（注意，这里是小写），此处对应mode
* Values中左侧文本框，输入alexa端配置Interaction Model页，Custom Slot Types中对应Type的某一个value，此处可一次添加多条配置，即如图16所示。
* Values中右侧选择框，对应上一步中选择的属性获取到的具体属性值，用来和alexa中配置的value进行一对一关联。

范围值属性：选择想要配置的属性，如“亮度等级”，点击下一步进入详细配置，如图17所示：

<img src="/assets/echo/17Selectthebrightnesslevel.png"  alt="模式设置" align=center />                        
图17 选择亮度等级

对于范围值属性，仅需配置Type为alexa端配置Interaction Model页，Intent Schema中对应的Slots中的name即可，执行控制时，后台会自动计算传入的数值是否超出协议属性值的范围，如图18所示：

<img src="/assets/echo/18Configurethebrightnesslevel.jpg"  alt="配置'模式设置'属性" align=center />                                                  
图18 配置亮度等级

至此，开放平台端配置已完成，可以通过Echo开始进行调试。

# 4. Echo调试

## 4.1 程序描述

通过echo，使用预定义的语音，可实现对设备的控制，代替手动操作App。

## 4.2 调试要求

1、alexa端、开放平台端均已配置完成
2、echo绑定在创建Skill的账户上
3、设备被某一用户（如18012345678）绑定在某App上，可以通过App进行控制

## 4.3 使用流程

* 设备端
以账号18012345678为例，成功将设备绑定至App，并可以使用App进行控制。
* Echo端
** 新Echo绑定Amazon账户（若使用已配置好的Echo，可直接跳至下一步）
对于新Echo，需要将Echo绑定至指定账户（即创建Skill的账号），进入如图所示主界面：

<img src="/assets/echo/19CreatetheSkillaccount.jpg"  alt="绑定echo账户" align=center /> 
                               
 
点击左侧“Settings”选项菜单，右侧出现相应页面后，点击“Set up a new device”，如图所示：

<img src="/assets/echo/19CreatetheSkillaccount2.jpg"  alt="添加设备" align=center /> 
                                 

点击后出现设备选择页面(如下图)：

<img src="/assets/echo/20Deviceselectionpage.jpg"  alt="添加设备" align=center /> 
                             

选择Echo后出现选择语言页面(如下图)，目前选择English（United States）

<img src="/assets/echo/21Choiceoflanguage.jpg"  alt="添加设备" align=center /> 
                           

选择语言后continue，提示连接WiFi，直接进入下一步连接WiFi页面(如下图)：

<img src="/assets/echo/22ConnecttheWiFipage.jpg"  alt="添加设备" align=center /> 
                      

根据提示，此时需按Echo顶部功能键一定时间(约5-10秒)，Echo出现如图橘色光圈，及说明已Echo进入绑定模式，点击continue进入下一步；

<img src="/assets/echo/23binding.jpg"  alt="添加设备" align=center /> 

                      

此时Echo会发出一个名为Amazon-XXX（本台设备为Amazon-29F）的无线信号，连接后页面自动跳转至设备配置页面(如下图)：

<img src="/assets/echo/24Connectionwireless.jpg"  alt="添加设备" align=center /> 
                               

按需选择一个WiFi进行关联，成功后即绑定完成，可与Echo进行交互。此时可开始下一步“启用Skill并关联C-Life账号”。
* 启动Skill并关联C-Life账号
进入主页面后，点击左侧菜单中“Skills”，再点击右上角“Your Skills”，如图所示：

<img src="/assets/echo/25start-upskill.jpg"  alt="添加设备" align=center /> 
                               

在列表中找到自己创建的Skill，点击进入skill详情页，如图所示：

<img src="/assets/echo/26skilldetails.jpg"  alt="添加设备" align=center /> 
                         

当前Skill显示已在enable状态，表示此时技能已启用且已绑定一个账号，如果需要换成绑定设备的账号，则点击“DISABLE SKILL”按钮，弃用技能后状态如图所示：

<img src="/assets/echo/27Switchingbinding.jpg"  alt="添加设备" align=center /> 
                      
再次点击“ENABLE”按钮，跳转到C-Life登录页面，如图所示：

<img src="/assets/echo/28Switchinglogon.jpg"  alt="添加设备" align=center /> 
         

在此处输入绑定设备的账号和密码（此例中账号为18012345678），点击 LogIn后，出现以下页面，说明账号已关联成功，此时即已可以使用Echo控制绑定的设备，开始进行调试。

<img src="/assets/echo/29Associationsuccess.jpg"  alt="添加设备" align=center /> 


