
# Android SDK 概述

## 1.SDK功能简介
和而泰开放平台设备接入SDK封装了和而泰开放平台（以下简称开放平台）接口，以及手机与智能硬件通讯接口。包括用户模块，设备绑定模块，设备控制模块和其他的开放平台接口。开发者不需要关注这些模块的具体内部逻辑，只需要根据自己的业务需求编写界面和调用SDK接口就可以完成APP的快速开发。

## 2.SDK功能简介下面是SDK的基础架构图：
![这里写图片描述](http://img.blog.csdn.net/20171023162454760?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 2.相关名词定义

###2.1 appId和appSecret

开放平台app的应用标识和密钥。开发者在开放平台接入设备创建APP的时候，后台会自动生成一个appId和appSecret。在初始化SDK的时候有用到。

###2.2 硬件模组

这里的硬件模组是指的WIFI模组。在开放平台创建WIFI产品的时候需要指定设备的WIFI模组。在SDK初始化和APP在设备绑定的时候需要用到。

###2.3 productId

设备产品号，设备在开放平台管理系统录入设备的时候，系统会根据设备录入的设备大类、设备小类、客户代码、DeviceKey、设备编码生成一个productId，可在开放平台管理系统上看到。

###2.4 deviceId

设备号，当一个设备通过设备绑定的接口初次接入开放平台时，开放平台会自动根据productId以及设备的mac地址为此设备注册一个deviceId，此deviceId全网唯一，用于通过开放平台进行设备的操作。

## 3.SDK 快速开发，相关第三方库支持

### 3.1 RxJava 函数式编程  

开放平台SDK 集成了RxJava。开发者可以根据自己的需要来使用，不需要自己再在项目中集成了。
### 3.2 RxBus 事件传递总线 

开放平台SDK事件总线提供了RxBus的支持，开发者用于事件的发布和订阅来实现数据的传递，开发者可以根据项目需求来使用。  
使用实例：
RxBus事件的发布：  

	//发布 HetLoginSDKEvent.Login.LOGIN_SUCCESS 事件
	RxManage.getInstance().post(HetLoginSDKEvent.Login.LOGIN_SUCCESS, object);
RxBus事件的订阅：  

    RxManage.getInstance().register(HetLoginSDKEvent.Login.LOGIN_SUCCESS, o -> {
         //订阅 HetLoginSDKEvent.Login.LOGIN_SUCCESS 事件
    });
RxBus事件的取消订阅：

    RxManage.getInstance().unregister(HetLoginSDKEvent.Login.LOGIN_SUCCESS);

### 3.3 retrofit+okhttp 网络库的支持

开放平台SDK集成了retrofit+okhttp的网络库支持，开发者可以直接使用这个网络库来请求服务器数据。
### 3.4 ActiveAndroid 数据库支持

SDK集成了ActiveAndroid这个第三方的轻量级的数据库。开发者可以自己查阅资料直接使用，不需要再在项目中集成了。
### 3.5 X5内核 浏览服务的支持

SDK集成了X5内核的浏览服务，来提高H5的加载性能和兼容性。开发者在需要使用X5内核WebView的时候可以直接使用：
使用实例：

	<com.tencent.smtt.sdk.WebView
		android:id="@+id/forum_context"
		android:layout_width="fill_parent"
		android:layout_height="fill_parent"
		android:paddingLeft="5dp"
		android:paddingRight="5dp" />

注意：将源码和XML里的系统包和类替换为SDK里的包和类，如：  
android.webkit.WebChromeClient 替换成 com.tencent.smtt.sdk.WebChromeClient 这样。

## 4.集成准备

### 4.1 注册开放平台账号  
  通过https://open.clife.cn/#/home注册一个开发者账号。登录到开放平台创建应用完善详细资料。此部分请参考《和而泰开发平台使用手册》。  创建产品之后创建APP获取到后台分配的appId和appSecret。

### 4.2. 下载SDK终端DEMO 请前往下载中心下载最新SDK包。

### 4.3 在Android Studio上集成SDK，配置项目根目录build.gradle如下：

	allprojects {
	    repositories {
	        jcenter()
	        //和而泰对外仓库
	        maven { url "https://oss.sonatype.org/content/repositories/snapshots/" }
	    }
	}
	
	dependencies {
	    //和而泰sdk库
	     compile 'com.github.szhittech:HetOpenSdk:1.0.7-SNAPSHOT'
	}


### 4.4 引用SDK到工程中
	 dependencies {
	    compile fileTree(include: ['*.jar'], dir: 'libs')
	    testCompile 'junit:junit:4.12'
	    compile project(':HetOpenLib')
	    compile 'com.android.support:appcompat-v7:23.0.1'
	    compile 'com.android.support:support-v4:23.0.1'
	    compile 'com.android.support:design:23.1.1'
	    compile 'com.facebook.shimmer:shimmer:0.1.0@aar'
	    compile 'com.facebook.fresco:fresco:0.8.1+'
	    compile 'com.google.code.gson:gson:2.5'
	    compile 'org.greenrobot:eventbus:3.0.0'
	    compile 'com.readystatesoftware.systembartint:systembartint:1.0.3'
	    compile 'com.github.szhittech:hetrecyclersdk:1.0.9-SNAPSHOT'
	    //乐鑫信息科技(esptouchmodule) 模组ID：7
	    compile 'com.github.szhittech:esptouchmodule:1.0.1-SNAPSHOT'
	    //和而泰AP绑定(hetapmodule) 模组ID：28
	    compile 'com.github.szhittech:hetapmodule:1.0.1-SNAPSHOT'
	    //和而泰smartlink绑定(在庆科基础上修改 hetsmartlink) 模组ID：10
	    compile 'com.github.szhittech:hetsmartlink:1.0.1-SNAPSHOT'
	    //科中龙(realtekmodule) 模组ID：4
	    compile 'com.github.szhittech:realtekmodule:1.0.1-SNAPSHOT'
	    //新力维_NL6621底层库(xlwmodule) 模组ID：6
	    compile 'com.github.szhittech:xlwmodule:1.0.1-SNAPSHOT'
	    //双驰达(sctechmodule) 模组ID：15
	    compile 'com.github.szhittech:sctechmodule:1.0.1-SNAPSHOT'
	    //信驰达_MTK7681底层库(elianmodule) 模组ID：5
	    compile 'com.github.szhittech:elianmodule:1.0.1-SNAPSHOT'
	    //Marvell(marvellmodule) 模组ID：v1=8，v2=27
	    compile 'com.github.szhittech:marvellmodule:1.0.1-SNAPSHOT'
	    //博通(cooeemodule) 模组ID：20
	    compile 'com.github.szhittech:cooeemodule:1.0.1-SNAPSHOT'
	    //二维码扫描
	    compile 'com.google.zxing:core:3.3.0'
	    compile 'cn.bingoogolapple:bga-qrcodecore:1.1.8@aar'
	    compile 'cn.bingoogolapple:bga-zxing:1.1.8@aar'
	}

引用SDK，根据自己硬件的模组来选择引用那个模组，其他的可以不用。 二维码扫描库在SDk demo中设备绑定中有用到，可以按照demoApp的实例来使用，也可以用自己的二维码扫描库。

###4.5 配置AndroidManifest.xml
请将下面权限配置代码复制到 AndroidManifest.xml 文件中：

    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

权限说明：

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="50%">权限</th>
			<th width="50%">用途</th>
		</tr>
		
	    <tr>
			<td>VIBRATE</td>
			<td>允许设置时区的权限</td>
		</tr>
		<tr>
			<td>CAMERA</td>
			<td>相机权限</td>
		</tr>
		<tr>
			<td>INTERNET</td>
			<td>允许程序打开网络接口</td>
		</tr>
		<tr>
			<td>WAKE_LOCK</td>
			<td>电源管理</td>
		</tr>
	</tbody>
</table>

####4.6 Android6.0系统文件读写权限设置
Android 6.0+新增了运行时权限动态检测，敏感权限必选要动态申请。开发者可以提供SDK提供的RxPermissions来动态申请权限

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            RxPermissions.getInstance(AppDelegate.getAppContext())
                    .request(Manifest.permission.READ_PHONE_STATE,
                            Manifest.permission.WRITE_EXTERNAL_STORAGE
                    )
                    .subscribe(grant -> {
                        if (!grant) {//申请权限成功与否
                            finish();
                        }
                    });
        }




# SDK集成流程
## 1.SDK集成流程图
初始化SDK(日志信息开关、环境设置、app主题的配置信息)
## 1.SDK初始化

第一步：我们需要在application里面初始化SDK。设置SDK的日志信息开关、环境设置、app主题的配置信息等

 	/**
     * 配置SKD
     *
     * @param appId
     * @param appSecret
     */
    private void configApplication(String appId, String appSecret) {
        ConfigModel configModel = new ConfigModel();
        configModel.setLog(true); //是否开启log信息
        configModel.setHost(GlobalAddr.TYPE_PRODUCE_HOST); //环境设置
        configModel.setH5UIconfig(UIJsonConfig.getInstance(this).getJsonString(UIJsonConfig.fileName, this));
        //配置第三方登录
        mLoginDelegate = new HetThirdDelegate.Builder(this)
                .registerQQ(UIJsonConfig.getTencentAppID())
                .registerWeixin(UIJsonConfig.getWechatAppID(),UIJsonConfig.getWechatAppSecret())
                .registerSinaWeibo(UIJsonConfig.getSinaAppID(), UIJsonConfig.getSinaAppSecret(), this.mSinaRedirectURL)
               .create();
        HetSdk.getInstance().init(this, appId, appSecret, configModel);
    }

1、appId、appSecret是开发者在开发平台创建应用申请到的。  
2、HetThirdDelegate 这个是配置第三方登录（微信、QQ、新浪微博登录），需要的自己配置，不需要的可以不要。关于第三方登录的集成请参考   **3.3（SDK第三方登录的集成）**。  
3、开发者可以自己去定义APP的配置configModel.setH5UIconfig(String h5UIconfig); h5UIconfig是定义的一个JSON字符串，demoAPP里面是通过assets/h5UIConfig.json来组装这个JSON字符串的。

**接口调用请求说明**  
SDK初始化接口 HetSdk.getInstance().init（）

**参数说明**
<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">参数名称</th>
			<th width="11%">是否必须</th>
			<th width="11%">字段类型</th>
			<th width="62%">参数说明</th>
		</tr>
		<tr>
			<td>appId</td>
			<td>是</td>
			<td>string</td>
			<td>应用标识</td>
		</tr>
		<tr>
			<td>context</td>
			<td>是</td>
			<td>Context</td>
			<td>上下文常量</td>
		</tr>
		<tr>
			<td>secret </td>
			<td>是</td>
			<td>string</td>
			<td>用户密匙</td>
		</tr>
		<tr>
			<td>configModel</td>
			<td>是</td>
			<td>ConfigModel</td>
			<td>初始配置</td>
		</tr>
	</tbody>
</table>

**configModel说明**
<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		
	    <tr>
			<td>isLog</td>
			<td>boolean</td>
			<td>是否开启调试信息</td>
		</tr>
		<tr>
			<td>host</td>
			<td>int</td>
			<td>网络环境设置: 0x01：正式 0x02：预发布 0x03:内网 0x04：测试环境</td>
		</tr>
		<tr>
			<td>H5UIconfig</td>
			<td>String</td>
			<td>APP初始配置</td>
		</tr>
	</tbody>
</table>

**H5UIconfig配置说明**  
SDK的授权登录页面需要这个JSON参数来配置，包括是否需要第三方登录，登录页面的样式等。可以参考SDk的DEMO工程通过assets/h5UIConfig.json的配置，以下给出配置详情：  

	 {
	  "app_id": "your_app_id",
	  "app_secret": "your_app_app_secret",
	  "navBackgroundColor": "FF3285FF",
	  "navTitleColor": "FFFFFFFF",
	  "logoshow": true,
	  "loginBtnBackgroundColor": "FFFFFFFF",
	  "loginBtnBorderColor": "FF5BA532",
	  "loginBtnFontColor": "FF000000",
	  "weiboLogin": true,
	  "weixinLogin": true,
	  "qqLogin": true,
	  "copyRight": "",
	  "privacyPolicy": "",
	  "SMSTemplet": "",
	  "tencent_app_id": "your_tencent_app_id",
	  "wechat_app_id": "your_wechat_app_id",
	  "wechat_app_secret": "your_wechat_app_secret",
	  "sina_app_id": "your_sina_app_id",
	  "sina_app_secret": "your_sina_app_secret"
	}

字段说明：
<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		
	    <tr>
			<td>app_id</td>
			<td>String</td>
			<td>APP标识(可以在开放平台创建应用申请获得)</td>
		</tr>
		<tr>
			<td>app_secret</td>
			<td>String</td>
			<td>APP密钥(可以在开放平台创建应用申请获得) </td>
		</tr>
		<tr>
			<td>navBackgroundColor</td>
			<td>String</td>
			<td>授权登录标题栏的背景色（例如：FF3285FF ） </td>
		</tr>
		<tr>
			<td>navTitleColor</td>
			<td>String</td>
			<td>授权登录标题栏的文字颜色（例如：FFFFFFFF） </td>
		</tr>
		<tr>
			<td>logoshow</td>
			<td>boolean</td>
			<td>授权登录页面的安全登录的图标是否显示（false，true） </td>
		</tr>
		<tr>
			<td>loginBtnBackgroundColor</td>
			<td>String</td>
			<td>授权登录页面登录按钮背景颜色（例如：FFFFFFFF）</td>
		</tr>
		<tr>
			<td>loginBtnBorderColor</td>
			<td>String</td>
			<td>授权登录页面登录按钮背景边框颜色（例如：FF5BA532）</td>
		</tr>
		<tr>
			<td>loginBtnFontColor</td>
			<td>String</td>
			<td>授权登录页面登录按钮文字颜色（例如：FF000000）</td>
		</tr>
		<tr>
			<td>weiboLogin</td>
			<td>boolean</td>
			<td>授权登录页面，是否显示微博登录（false，true）</td>
		</tr>
		<tr>
			<td>weixinLogin</td>
			<td>boolean</td>
			<td>授权登录页面，是否显示微信登录（false，true）</td>
		</tr>
		<tr>
			<td>qqLogin</td>
			<td>boolean</td>
			<td>授权登录页面，是否显示QQ登录（false，true）</td>
		</tr>
		<tr>
			<td>tencent_app_id</td>
			<td>String</td>
			<td>QQ登录的应用标识（可以在腾讯开放平台创建应用申请获得）</td>
		</tr>
		<tr>
			<td>wechat_app_id</td>
			<td>String</td>
			<td>微信登录的应用标识（可以在微信开放平台创建应用申请获得）</td>
		</tr>
		<tr>
			<td>wechat_app_secret</td>
			<td>String</td>
			<td>微信登录的应用密钥（可以在微信开放平台创建应用申请获得）</td>
		</tr>
		<tr>
			<td>sina_app_id</td>
			<td>String</td>
			<td>新浪微博登录的应用标识（可以在新浪开放平台创建应用申请获得）</td>
		</tr>
		<tr>
			<td>sina_app_secret</td>
			<td>String</td>
			<td>新浪微博的应用密钥（可以在新浪开放平台创建应用申请获得）</td>
		</tr>
		<tr>
			<td>copyRight</td>
			<td>String</td>
			<td>保留字段</td>
		</tr>
		<tr>
			<td>privacyPolicy</td>
			<td>String</td>
			<td>保留字段</td>
		</tr>
		<tr>
			<td>SMSTemplet</td>
			<td>String</td>
			<td>保留字段</td>
		</tr>
	</tbody>
</table>

**PS:   颜色值都使用argb的格式，前2位表示透明度，后6位是rgb颜色值。**

第二步：在application注册模组

 	/**
     * 模组注册
     */
	private void registerModule() {
        try {
            ModuleManager.getInstance().registerModule(HeTApModuleImpl.class, getApplicationContext());//和而泰AP绑定
            ModuleManager.getInstance().registerModule(HeTSmartlinkImpl.class, getApplicationContext());//和而泰smartlink绑定
            ModuleManager.getInstance().registerModule(RealtekModuleImpl.class, getApplicationContext());//科中龙(realtekmodule)
            ModuleManager.getInstance().registerModule(XlwModuleImpl.class, getApplicationContext());//新力维_NL6621底层库
            ModuleManager.getInstance().registerModule(SctechModuleImpl.class, getApplicationContext());//双驰达(sctechmodule)
            ModuleManager.getInstance().registerModule(ElianModuleImpl.class, getApplicationContext());//信驰达_MTK7681底层库
            ModuleManager.getInstance().registerModule(MarvellV1WiFiImpl.class, getApplicationContext());//Marvell(marvellmodule)
            ModuleManager.getInstance().registerModule(MarvellV2WiFiImpl.class, getApplicationContext());//Marvell(marvellmodule)
            ModuleManager.getInstance().registerModule(EsptouchModuleImpl.class, getApplicationContext());//乐鑫信息科技(esptouchmodule)
            ModuleManager.getInstance().registerModule(CooeeModuleImpl.class, getApplicationContext());//博通(cooeemodule)
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

这里的模组注册是按需注册的。也就是根据自己的设备的模组类型来注册。

### 3.2 授权登录和用户模块

###3.2.1 无私有服务器授权登录
SDK提供了HetNewAuthApi.getInstance().authorize方法可以直接跳转到授权登录页面。

	 /**
	  * 授权登录
	  *
	  * @param authCallback 回调
	  * @param specifyTitle 标题栏文字
	  * @param navigationBarTextColor 标题栏文字颜色
	  * @param navBackground 标题栏背景颜色
	*/
	public void authorize(Context mContext, AuthCallback authCallback,String specifyTitle,int navigationBarTextColor,int navBackground) throws Exception {
	    ...
	}
	protected void auth() {
	  
	       HetNewAuthApi.getInstance().authorize(activity, new AuthCallback() {
	          @Override
	          public void onSuccess(int code, String msg) {
	                       //登录成功 do something
	          	}
	          @Override
	          public void onFailed(int code, String msg) {
	                       //登录失败 do something
	          	}
	          },"授权登录",Color.parseColor("#ff3285ff")，Color.parseColor("#FFFFFFFF"));
	       
	    }

**这里插图：登录界面**

###3.2.2 云云对接用户授权登录
为了适应不同的业务需求，同时也考虑平台的安全问题SDK也提供了云云对接用户授权验证接口，该流程请参考文档[C-Life开放平台验证码三方授权流程](%E9%AA%8C%E8%AF%81%E7%A0%81%E4%B8%89%E6%96%B9%E6%8E%88%E6%9D%83%E6%B5%81%E7%A8%8B)。


###3.2.3 退出登录

退出登录SDK接口

	HetSdk.getInstance().logout();

退出登录之后记得发出通知APP相应的页面跳转到首页，并刷新到未登录的状态。
例如：

	 public void logout() {
	        new AlertDialog.Builder(activity)
	                .setMessage(activity.getString(R.string.confirm_logout))
	                .setPositiveButton(activity.getString(R.string.logout_sure), (dialog, which) -> {
	                    dialog.dismiss();
	                    if (HetSdk.getInstance().isAuthLogin()) {
	                        HetSdk.getInstance().logout();
	                        RxManage.getInstance().post(HetLoginSDKEvent.Login.LOGINOUT_SUCCESS, "");
	                    }
	                })
	                .setNegativeButton(activity.getString(R.string.logout_cancel), null)
	                .show();
	    }


使用判断是否处于登录状态，处于登录状态下，我们调用HetSdk.getInstance.logout(),并使用RxBus(开发者可以使用自己习惯的事件通知，如：event bus等)来发送通知到相应的页面来刷新页面状态。
如：接收退出登录的事件，刷新页面

	RxManage.getInstance().register(HetLoginSDKEvent.Login.LOGINOUT_SUCCESS, o -> {
	            //退出登录刷新页面
	});

###3.2.4判断登录状态

判断登录状态的接口

	HetSdk.getInstance().isAuthLogin();

###3.2.5异地登录的

开放平台的账号只能在一台设备上面登录。当有账号在另一台设备登录时，SDK会抛出一个ECode.Token.EC_LOGINOUT的RxBus事件。
开发者可以在首页订阅这个事件，处理异地登录的逻辑。 例：
	
	RxManage.getInstance().register(ECode.Token.EC_LOGINOUT, s -> {
	          //账号在其他设备登录，此时HetSdk.getInstance().isAuthLogin() 为false，跳转页面刷新到未登录状态。
	          .............
	});


###3.2.6获取用户信息

HetUserApi.getInstance().getUserMess()可以获取到用户信息

    /**
     * 获取用户信息
     * @param iCallback 回调
     */
    public void getUserMess(final IHetCallback iCallback) {
       .......


调用实例：

 	public void getUserInfo() {
        //账号登录之后才可以获取到用户信息，否则获取不到
        if (!HetSdk.getInstance().isAuthLogin()) return;
        HetUserApi.getInstance().getUserMess(new IHetCallback() {
            @Override
            public void onSuccess(int code, String msg) {
                //获取用户信息成功
                Type type = new TypeToken<UserInfoBean>() {
                }.getType();
                //users 包含账号的所有用户信息
                UserInfoBean users = GsonUtil.getGsonInstance().fromJson(msg, type);
            }
            @Override
            public void onFailed(int code, String msg) {
                //获取用户信息失败
            }
        });
    }


接口返回UserInfoBean的用户详细参数说明：

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">参数名称</th>
			<th width="11%">字段类型</th>
			<th width="62%">参数说明</th>
		</tr>
		<tr>
			<td>userId</td>
			<td>String</td>
			<td>用户ID</td>
		</tr>
		<tr>
			<td>userName</td>
			<td>String</td>
			<td>用户名称</td>
		</tr>
		<tr>
			<td>email</td>
			<td>String</td>
			<td>用户邮箱</td>
		</tr>
		<tr>
			<td>sex</td>
			<td>number</td>
			<td>性别（1-男，2-女）</td>
		</tr>		
		<tr>
			<td>birthday</td>
			<td>String</td>
			<td>生日（yyyy-MM-dd）</td>
		</tr>		
		<tr>
			<td>weight</td>
			<td>number</td>
			<td>体重（克）</td>
		</tr>	
		<tr>
			<td>height</td>
			<td>number</td>
			<td>身高（厘米）</td>
		</tr>	
		<tr>
			<td>avatar</td>
			<td>String</td>
			<td>头像URL</td>
		</tr>	
		<tr>
			<td>city</td>
			<td>String</td>
			<td>	城市名</td>
		</tr>	
	</tbody>
</table>

###3.2.7修改密码

	/**
	     * 修改密码
	     * @param mContext 上下文
	     * @param authCallback  回调
	     * @param phone 手机号
	     * @param specifyTitle 标题栏文字
	     * @param navigationBarTextColor 标题栏文字颜色
	     * @param navBackground 标题栏背景颜色
	     * @throws Exception
	     */
	public void alterPassword(Context mContext, AuthCallback authCallback, String phone,String specifyTitle,int navigationBarTextColor,int navBackground) throws Exception{
	        ............
	}

这里手机号是需要通过获取用户信息之后才能得到的。这里有2种方式：
1、开发者可以登录成功之后就去获取用户信息，然后保存起来作为全局使用。（推荐使用）
2、在修改密码之前先调用获取用户信息的接口，获取到手机号之后再调用修改密码的接口。

	public void editPwd(String phone) {
	        if (!HetSdk.getInstance().isAuthLogin()) return;
	        HetNewAuthApi.getInstance().alterPassword(activity, new AuthCallback() {
	           @Override
	           public void onSuccess(int code, String msg) {
	                    //修改密码成功
	           }
	           @Override
	           public void onFailed(int code, String msg) {
	                   //修改密码失败
	           }
	        }, phone, "修改密码",Color.parseColor("#ff3285ff")，Color.parseColor("#FFFFFFFF"));
	}


##3.3 设备模块

###3.3.1 设备绑定模块（添加设备）

开放平台的设备按照功能划分类型，设备有大类，大类下面划分不同型号的小类。确定类型之后，设备还有WIFI和蓝牙设备之分。绑定设备之前首先就需要选择设备类型在扫描绑定。WIFI SSID和密码 需要开发者自己去获取手机当前连接的WIFI，让用户自己输入WIFI密码之后再调用开始扫描绑定的接口，productId是设备小类中productId字段。WIFI设备AP绑定流程图如下：

 ![这里写图片描述](http://img.blog.csdn.net/20171026144038416?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

WIFI设备SmartLink绑定流程图如下：

![这里写图片描述](http://img.blog.csdn.net/20171027163437204?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

SDK的设备绑定非常简单，只需要知道设备的产品ID就可以进行绑定了开放平台提供了三种方式来获取产品ID。  

第一种：拉取设备大类和设备小类（设备小类信息包含产品ID，也就是productId这个字段），具体分成2个步骤。  
第一步：获取设备大类型  
HetDeviceListApi.getInstance().getTypeList取APP支持绑定的设备大类型。  
调用实例：

	HetDeviceListApi.getInstance().getTypeList(new IHetCallback() {
            @Override
            public void onSuccess(int code, String s) {
                if (code == 0) {
                    Type type = new TypeToken<List<DeviceTypeModel>>() {
                    }.getType();
                    //获取设备大类成功  刷新UI
                    List<DeviceTypeModel> models = GsonUtil.getGsonInstance().fromJson(list, type);
                    ............
                }
            }
            @Override
            public void onFailed(int code, String msg) {
                //获取设备大类列表失败
                   .............
            }
     });

第二步：获取设备小类型  
HetDeviceListApi.getInstance().getSubTypeListProduct获取APP支持绑定的设备大类型。  
通过选择的设备大类，查询大类下的小类列表。设备小类信息包含产品ID，也就是productId这个字段

	HetDeviceListApi.getInstance().getSubTypeListProduct(new IHetCallback() {
            @Override
            public void onSuccess(int code, String msg) {
                if (code == 0) {
                    Type type = new TypeToken<List<DeviceSubModel>>() {
                    }.getType();
                    List<DeviceSubModel> models = GsonUtil.getGsonInstance().fromJson(list, type);
                }
            }
            @Override
            public void onFailed(int code, String msg) {
                ((BaseHetActivity) activity).showToast(msg);
            }
        }, deviceType);//deviceType 是大类类型

第二种：扫描开放平台创建的产品二维码来获取。  
扫描到的结果调用SDK的HetQrCodeApi的dealQrCode方法获取产品信息。产品信息包含了包含了产品ID

	//二维码规则
    private void parseQrCodeVersion(String url) {
        String param = Uri.parse(url).getQueryParameter("param");
        if (TextUtils.isEmpty(param)) {
            tips(getResources().getString(R.string.qr_code_error));
        } else {
            HetQrCodeApi.getInstance().dealQrCode(new IHetCallback() {
                @Override
                public void onSuccess(int code, String msg) {
                    DeviceProductBean deviceProductBean = new Gson().fromJson(msg, DeviceProductBean.class);
                    //获取到产品信息之后，按照第三步和第四步的流程来绑定
                }
                @Override
                public void onFailed(int code, String msg) {
                    tips(msg);
                    finish();
                }
            }, url);
        }
    }

第三种：在开放平台后台直接直接查看产品ID，详情请查《和而泰开发平台使用手册》。  

开发者可以通过项目需要选择适合自己项目的方式来获取产品ID。在获取到产品ID之后，开发者只需要根据自己的设备类型来选择SDK的绑定接口就好了。具体可以分为WIFI绑定和蓝牙绑定2种。判断是WIFI设备还是蓝牙设备，进入相应的绑定页面，可以通过设备小类的moduleType字段来判断。如：int type = deviceSubModel.getModuleType();  type == 1标识WIFI设备  type ==2标识蓝牙设备。  

下面对这2种绑定做具体说明   
WIFI设备绑定：SDK提供一个HetWifiBindApi接口,HetWifiBindApi里面有个startBind方法可以启动绑定。

	/**
	     * 开始绑定设备
	     *
	     * @param ssid wifi名称
	     * @param wifiPassword wifi密码
	     * @param productId    产品ID
	     * @param iWifiBind    绑定接口回调
	     */
	public void startBind(Activity activity,String ssid,String wifiPassword, String productId, IWifiBind iWifiBind) {
	           .............
	    }
	使用实例：
	HetWifiBindApi.getInstance().startBind(this, sSidInfoBean.getSsid(), sSidInfoBean.getPass(), "" + currentDevice.getProductId(), new IWifiBind() {
	            @Override
	            public void onStatus(HetWifiBindState hetWifiBindState, String msg) {
	            }
	            @Override
	            public void onFailed(int errId, String msg) {
	                //绑定失败  显示失败界面
	                showBindFail();
	            }
	            @Override
	            public void onSuccess(DeviceModel deviceModel) {
	                //绑定成功  显示成功界面
	                showBindSuccess();
	            }
	            @Override
	            public void onProgress(int type, int value) {
	                //扫描绑定的进度
	                if(HetDeviceConstans.SCAN_PROGESS == type) {//扫描的进度
	                    setTextProgress(value);
	                }else if(HetDeviceConstans.BIND_PROGESS == type){//绑定的进度
	                    showBindDialog();
	                }
	            }
	        });



BLE蓝牙设备绑定：SDK提供一个HetCommonBleBindApi接口，普通蓝牙设备可以扫描绑定.整个过程有2个步骤：  
第一步：扫描搜索周围设备；  
第二步：选择扫描的某个设备绑定到服务器；  
蓝牙网关设备绑定方式跟前面的方式有些小区别，两种方式的蓝牙设备绑定流程图如下：

![这里写图片描述](http://img.blog.csdn.net/20171027163756451?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

具体的接口调用说明：

	HetCommonBleBindApi.getInstance().startBind(this, "" + deviceProductBean1.getProductId(), new ICommonBleBind() {
	            @Override
	            public void onScanDevices(int code, String devices) {
	                if (code == 0) {
	                    Type type = new TypeToken<List<DeviceProductBean>>() {
	                    }.getType();
	                    List<DeviceProductBean> scanDevices = GsonUtil.getGsonInstance().fromJson(devices, type);
	                    //获取到扫描到的蓝牙设备,显示扫描的设备列表。选择某一个设备之后调用 bindToServer绑定到服务器
	                    showScanSucess(scanDevices);
	                }
	            }
	            @Override
	            public void onFailed(int errId, String msg) {
	                  //绑定失败 刷新界面
	                hideDialog();
	                showBindFail();
	            }
	            @Override
	            public void onSuccess(DeviceModel deviceModel) {
	                 //绑定成功 刷新界面
	                showBindSuccess();
	            }
	            @Override
	            public void onProgress(int type, int value) {
	                if (HetDeviceConstans.SCAN_PROGESS == type) { //扫描进度
	                    setTextProgress(value);
	                } else if (HetDeviceConstans.BIND_PROGESS == type) {//绑定进度
	                    showBindDialog();
	                }
	            }
	        });
	
	//扫描到设备列表，选择其中一个设备，绑定到服务器
	HetCommonBleBindApi.getInstance().bindToServer(deviceProductBean);


**绑定无法绑定？这里给出设备无法绑定的几种检查方法：**  

设备是否置为绑定模式，是否在绑定的有效时间内  
是否正确输入wifi密码,请确认手机是否能正常连接网络  
是扫描不到设备还是绑定不了设备,扫描失败会有对应提示是扫描不到设备，还是绑定不了设备  
设备是否已在CLife开放平台注册，并按照要求将大小类信息写入设备中  
APP端服务是否开启（udpservice）


### 3.3.2 设备管理
#### 3.3.2.1 设备model说明

SDK所有的设备devicemodel，参数说明

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>deviceId</td>
			<td>string</td>
			<td>设备标识</td>
		</tr>
		<tr>
			<td>macAddress</td>
			<td>string</td>
			<td>MAC地址</td>
		</tr>
		<tr>
			<td>deviceBrandId</td>
			<td>number</td>
			<td>设备品牌标识</td>
		</tr>
		<tr>
			<td>deviceBrandName</td>
			<td>string</td>
			<td>设备品牌名称</td>
		</tr>
		<tr>
			<td>deviceTypeId</td>
			<td>number</td>
			<td>设备大分类标识</td>
		</tr>
		<tr>
			<td>deviceTypeName</td>
			<td>string</td>
			<td>设备大分类名称</td>
		</tr>
		<tr>
			<td>deviceSubtypeId</td>
			<td>number</td>
			<td>设备子分标识</td>
		</tr>
		<tr>
			<td>deviceSubtypeName</td>
			<td>string</td>
			<td>设备子分类名称</td>
		</tr>
		<tr>
			<td>deviceName</td>
			<td>string</td>
			<td>设备名称</td>
		</tr>
		<tr>
			<td>roomId</td>
			<td>string</td>
			<td>房间标识</td>
		</tr>
		<tr>
			<td>roomName</td>
			<td>string</td>
			<td>房间名称</td>
		</tr>
		<tr>
			<td>authUserId</td>
			<td>string</td>
			<td>授权设备用户标识</td>
		</tr>
		<tr>
			<td>bindTime</td>
			<td>string</td>
			<td>绑定时间</td>
		</tr>
		<tr>
			<td>onlineStatus</td>
			<td>number</td>
			<td>在线状态（1-正常，2-异常）</td>
		</tr>
		<tr>
			<td>share</td>
			<td>number</td>
			<td>设备分享（1-是，2-否，3-扫描分享）<font color=#c00>【2015-11-11新增状态（3）】</font></td>
		</tr>
		<tr>
			<td>controlType</td>
			<td>number</td>
			<td>控制类型（1-原生，2-插件，3-H5插件）</td>
		</tr>
		<tr>
			<td>userKey</td>
			<td>string</td>
			<td>MAC与设备ID生成的KEY</td>
		</tr>
		<tr>
			<td>productId</td>
			<td>number</td>
			<td>设备型号标识</td>
		</tr>
		<tr>
			<td>productName</td>
			<td>string</td>
			<td>设备型号名称</td>
		</tr>
		<tr>
			<td>productCode</td>
			<td>string</td>
			<td>设备型号编码</td>
		</tr>
		<tr>
			<td>productIcon</td>
			<td>string</td>
			<td>设备型号图标</td>
		</tr>
		<tr>
			<td>moduleId</td>
			<td>number</td>
			<td>模块标识</td>
		</tr>
		<tr>
			<td>moduleType</td>
			<td>number</td>
			<td>模块类型（1-WiFi，2-蓝牙，3-音频，4-GSM，5-红外）</td>
		</tr>
		<tr>
			<td>moduleName</td>
			<td>string</td>
			<td>模块名称</td>
		</tr>
		<tr>
			<td>radiocastName</td>
			<td>string</td>
			<td>设备广播名</td>
		</tr>
		<tr>
			<td>deviceCode</td>
			<td>string</td>
			<td><font color=#c00>【2016-06-03新增】</font>设备编码</td>
		</tr>
	</tbody>
</table>
####3.3.2.2获取设备列表

HetDeviceListApi.getInstance().getBindList()获取设备列表，设备按照归属来划分有2种：  
第一种是用户自己绑定的设备。这类设备用户拥有这台设备的所有权限。  
第二种是别人分享给自己的设备。这类设备用户拥有控制权限，但是不可以再分享给其他人。  

	HetDeviceListApi.getInstance().getBindList(new IHetCallback() {
	        @Override
	        public void onSuccess ( int code, String s){
	            if (code == 0) {
	                if (!TextUtils.isEmpty(s)) {
	                    Type type = new TypeToken<List<DeviceModel>>() {
	                    }.getType();
	                    List<DeviceModel> models = GsonUtil.getGsonInstance().fromJson(list, type);
	                    //获取设备列表成功列表
	                }
	            }
	        }
	        @Override
	        public void onFailed ( int code, String msg){
	            //获取列表失败
	        }
	}


####3.3.2.2删除设备

设备删除有2中情况： 
第一种：设备是用户自己绑定的设备。调用HetDeviceManagerApi.getInstance().unBind()来解除绑定。这里 deviceModel 是选择要删除的设备对象。
实例：
 
	HetDeviceManagerApi.getInstance().unBind(deviceModel, new IHetCallback() {
	   @Override
	   public void onSuccess(int code, String msg) {
	   //解绑成功
	   }
	   @Override
	   public void onFailed(int code, String msg) {
	   //解绑失败
	   }
	});

第二种：设备是别人分享的过来的设备。调用HetDeviceShareApi.getInstance().deviceDel()方法来解绑分享关系。 
实例：  

	HetDeviceShareApi.getInstance().deviceDel(new IHetCallback() {
		 @Override
		 public void onSuccess(int code, String msg) {
		   iHetCallback.onSuccess(code, msg);
		 }
		@Override
		public void onFailed(int code, String msg) {
		  iHetCallback.onFailed(code, msg);
		}
	}, deviceModel.getDeviceId(), null);

传入的参数是选择要删除的设备ID和当前用户的UserId。UserId直接传null就好了。传null表示被分享者解除分享关系，传userId表示设备拥有者回收这个用户的设备控制授权。

####3.3.2.3设备控制

设备有WIFI设备的控制和蓝牙设备的控制区别，wifi设备控制流程图示如下：

![这里写图片描述](http://img.blog.csdn.net/20171026143540571?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

SDK提供统一的数据流接口。接收设备数据和监听设备状态都是通过IWifiDeviceData这个接口来完成，发送数据调用HetDeviceWifiControlApi.getInstance().setDataToDevice()。  

IWifiDeviceData 的接口说明：

	public interface IWifiDeviceData {
	    /**
	     * 获取控制数据
	     * @param jsonData
	     */
	    void onGetConfigData(String jsonData);
	
	    /**
	     * 获取运行数据
	     * @param jsonData
	     */
	    void onGetRunData(String jsonData);
	
	    /**
	     * 获取异常数据
	     * @param jsonData
	     */
	    void onGetErrorData(String jsonData);
	
	    /**
	     * 设备状态
	     * @param onlineStatus 在线状态（1-正常，2-异常不在线）
	     */
	    void onDeviceStatues(int onlineStatus);
	
	    /**
	     * 收取数据异常
	     * @param code 错误码
	     * @param msg  错误信息
	     *  1000 无法连接服务器
	     *  1001 设备不在线
	     */
	    void onDataError(int code, String msg);
	}

WIFI设备控制具体可以分成4个步骤：  
第一步：初始化

	HetWifiDeviceControApi.getInstance().init(this, iWifiDeviceData);
第二步：设置接收设备数据的监听 

	HetWifiDeviceControApi.getInstance().start(deviceModel.getDeviceId(), deviceModel.getMacAddress());
	private IWifiDeviceData iWifiDeviceData = new IWifiDeviceData() {
	        @Override
	        public void onGetConfigData(String jsonData) {
	            //获取到设备上报控制数据   根据开放平台配置的协议解析成相应的数据
	            System.out.println("onGetConfigData: " + jsonData);
	            LedConfigModel configModel = GsonUtil.getInstance().toObject(jsonData, LedConfigModel.class);
	            if (ledConfigModel != null) {
	                ledConfigModel = configModel;
	            }
	        }
	        @Override
	        public void onGetRunData(String jsonData) {
	             //获取到设备上报运行数据   根据开放平台配置的协议解析成相应的数据
	            System.out.println("onGetRunData: " + jsonData);
	            LedRunDataModel runDataModel = GsonUtil.getInstance().toObject(jsonData,    LedRunDataModel.class);
	            if (runDataModel != null) {
	                ledRunDataModel = runDataModel;
	            }
	        }
	        @Override
	        public void onGetErrorData(String jsonData) {
	           //获取到设备上报故障数据   根据开放平台配置的协议解析成相应的数据
	            System.out.println("onGetErrorData: " + jsonData);
	        }
	        @Override
	        public void onDeviceStatues(int onlineStatus) {
	        }
	        @Override
	        public void onDataError(int code, String msg) {
	            System.out.println("onDataError: " + msg + " code " + code);
	        }
	    };

开发者可以根据IWifiDeviceData 的回调接口来渲染UI。  
第三步：控制设备  
调用HetDeviceWifiControlApi.getInstance().setDataToDevice()发送控制数据到服务器。调用的时候把需要发送的控制数据组装好。

	HetDeviceWifiControlApi.getInstance().setDataToDevice(new IHetCallback() {
	            @Override
	            public void onSuccess(int code, String msg) {
	            }
	            @Override
	            public void onFailed(int code, String msg) {
	            }
	       }, deviceModel.getDeviceId(), GsonUtil.getInstance().toJson(ledConfigModel));

第四步：释放资源  
在不需要控制设备的时候释放资源，例如在退出控制界面的时候，实例：

	 @Override
	    protected void onDestroy() {
	        super.onDestroy();
	        HetWifiDeviceControApi.getInstance().stop();
	    }

注意:设备控制的时候会有一个updateFlag字段。这个字段标识是改变了那几个控制字段。

第二种 蓝牙设备控制：  
蓝牙设备控制主要是通过手机app和蓝牙设备先建立连接，然后根据定义的协议进行数据交互，具体的交互流程图如下：

![这里写图片描述](http://img.blog.csdn.net/20171027164150531?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

具体的蓝牙控制分成5个步骤：  

第一步：初始化HetCommonBleControlApi

	HetCommonBleControlApi.getInstance().init(this);

第二步：手机建立蓝牙连接,设置数据的收发回调

	private void connect() {
	    HetCommonBleControlApi.getInstance().connect(macAddress,connectCallback);
	}
	private final IConnectCallback connectCallback = new IConnectCallback() {
	    @Override
	    public void onConnectSuccess(BluetoothGatt gatt, int status) {
	            conDevice.setText("连接成功");
	            HookManager.getInstance().enableHook(true, "fuck@academy");
	            HookManager.getInstance().addHook(hookCallBack);
	    }
	    @Override
	    public void onConnectFailure(final BleException exception) {
	            conDevice.setText("连接失败");
	    }
	    @Override
	    public void onDisconnect(String mac) {
	            conDevice.setText("连接断开");
		}
	}


IHookCallBack 监听发送数据和接收数据的回调。开发者可以在此监听app发送的数据和收到的设备数据。
	
	 private IHookCallBack hookCallBack = new IHookCallBack() {
	        @Override
	        public void onWrite(byte[] bytes) {
	            showInfo("Send:" + HexUtil.encodeHexStr(bytes));
	        }
	        @Override
	        public void onRead(byte[] bytes) {
	            showInfo("Read:" + HexUtil.encodeHexStr(bytes));
	        }
	        @Override
	        public void onReceived(byte[] bytes) {
	            showInfo("Rec:" + HexUtil.encodeHexStr(bytes));
	        }
	    };

备注:connect方法是允许重复调用的。对于已经连接的成功的连接，在此调用connect方法，SDK会直接返回连接成功不会再次去连接设备。  

第三步：写数据  
SDK对开放平台蓝牙设备提供写数据的标准接口 HetCommonBleControlApi.getInstance().write()，调用实例：

    HetCommonBleControlApi.getInstance().write(macAddress,CmdIndexConstant.HET_COMMAND_BIND_APP,writeCallback);

    private IBleCallback<HetOpenPlatformCmdInfo> writeCallback = new IBleCallback<HetOpenPlatformCmdInfo>() {
        @Override
        public void onSuccess(HetOpenPlatformCmdInfo cmdInfo, int type) {
			//byte[] bytes = (byte[]) cmdInfo.getReceivePacket();
			//showInfo(HexUtil.encodeHexStr(bytes));
        }

        @Override
        public void onFailure(BleException exception) {
            showInfo(exception.getDescription());
        }
    };

第一个参数是设备mac。  
第二个参数是开放平台蓝牙协议标准接口类型。可以参照一下：  
CmdIndexConstant.HET_COMMAND_BIND_APP      			绑定APP  
CmdIndexConstant.HET_COMMAND_GET_TIME_APP   		获取设备时间  
CmdIndexConstant.HET_COMMAND_SET_TIME_APP			设置设备时间  
CmdIndexConstant.HET_COMMAND_GET_HISTORY_DATA_APP	获取设备历史数据  
CmdIndexConstant.HET_COMMAND_CLEAR_HISTORY_DATA_APP 清楚设备历史数据  
CmdIndexConstant.HET_COMMAND_GET_REAL_TIME_DATA_APP 获取真实时间  
CmdIndexConstant.HET_COMMAND_CONFIG_DATA_APP		下发控制协议  
第三个参数是写数据成功与否的监听回调。这里开发者可以自行做重发处理。  

第四步：读数据  
SDK对开放平台蓝牙设备提供写数据的标准接口 HetCommonBleControlApi.getInstance().read()。SDK中提供了标准的获取设备信息的接口，调用实例:

    HetCommonBleControlApi.getInstance().read(macAddress,CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_SYSTEM_ID,readCallback);

    private IBleCallback<HetOpenPlatformCmdInfo> readCallback = new IBleCallback<HetOpenPlatformCmdInfo>() {
        @Override
        public void onSuccess(HetOpenPlatformCmdInfo cmdInfo, int type) {
            byte[] bytes = (byte[]) cmdInfo.getReceivePacket();
            String msg = "Read:" + ConvertUtil.convertHexToString(HexUtil.encodeHexStr(bytes));
			//成功读取到设备数据
			.............

        }

        @Override
        public void onFailure(BleException exception) {
            //读取设备数据失败
			.......
        }
    };

第一个参数是设备mac。  
第二个参数是开放平台蓝牙协议标准接口类型。可以参照一下：  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_SYSTEM_ID     			System Id  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_FIRMWARE_REVISION   	Firmware Revision  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_HARDWARE_REVISION		Hardware Revision  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_SOFTWARE_REVISION		Software Revision  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_SERIAL_NUMBER 			Serial Number  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_MANUFACTURE_NAME 		Manufacture Name（）  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_MODEL_NUMBER			Model Number  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_PNP_ID					PnP ID  
CmdIndexConstant.DeviceInfoConstant.HET_COMMAND_BATTERY					Battery Level  
第三个参数是读数据成功与否的监听回调。  

第五步：释放资源(断开连接)

	HetCommonBleControlApi.getInstance().disConnect(macAddress);



###3.3.2.4设备分享

1.获取设备授权的用户列表    

调用HetDeviceShareApi.getInstance().getDeviceAuthUser()获取设备授权的用户列表，调用实例：

	HetDeviceShareApi.getInstance().getDeviceAuthUser(new IHetCallback() {
            @Override
            public void onSuccess(int code, String s) {
                if (code == 0) {
                    Type type = new TypeToken<List<DeviceAuthUserModel>>() {
                    }.getType();
                    List<DeviceAuthUserModel> deviceAuthUsers= GsonUtil.getGsonInstance().fromJson(s, type);
                    //获取到设备授权的用户列表
                        .................
                }
            }
            @Override
            public void onFailed(int code, String msg) {
                  //获取设备授权的用户列表失败
            }
        }, deviceId);

DeviceAuthUserModel 的字段说明：

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">参数名称</th>
			<th width="15%">字段类型</th>
			<th width="62%">参数说明</th>
		</tr>
		<tr>
			<td>userId</td>
			<td>String</td>
			<td>用户ID</td>
		</tr>
		<tr>
			<td>userName</td>
			<td>String</td>
			<td>用户名称</td>
		</tr>
		<tr>
			<td>avatar</td>
			<td>String</td>
			<td>用户头像</td>
		</tr>
		<tr>
			<td>authTime</td>
			<td>String</td>
			<td>授权时间</td>
		</tr>
	</tbody>
</table>

2.用户设备授权删除  

调用HetDeviceShareApi.getInstance().deviceDel()就可以解除分享关系。

	HetDeviceShareApi.getInstance().deviceDel(new IHetCallback() {
            @Override
            public void onSuccess(int code, String s) {
                if (code == 0) {
                   //删除成功,刷新获取设备授权用户列表
                    ...................
                }
            }
            @Override
            public void onFailed(int code, String msg) {
               //删除失败
            }
        }, deviceId, userId);


3.设备分享   

分享的方式有2种，一种是面对面二维码分享，第二种远程第三方平台（微信 、QQ等）的分享。 注意：只要是用户账号自己绑定的设备才能分享给别人，别人分享给自己的设备是不能再分享出去的。  
下面对2中分享方式进行详细说明：

第一种：面对面分享，通过deviceId（要分享的设备的标识）获取分享码，分享的流程图如下：

 ![这里写图片描述](http://img.blog.csdn.net/20171026143701789?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

具体的接口调用说明：

	 /**
	 * @param shareType   5是面对面分享  6远程分享
	 */
	HetDeviceShareApi.getInstance().getShareCode(new IHetCallback() {
            @Override
            public void onSuccess(int code, String s) {
                if (code == 0) {
                    Type treeType = new TypeToken<ShareCodeModel>() {
                    }.getType();
                    ShareCodeModel codeModel = GsonUtil.getGsonInstance().fromJson(s, treeType);
                    //分享邀请码获取成功
                }
            }
            @Override
            public void onFailed(int code, String msg) {
                //分享邀请码获取失败
            }
        }, deviceId, shareType);

ShareCodeModel字段说明:

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">参数名称</th>
			<th width="15%">字段类型</th>
			<th width="62%">参数说明</th>
		</tr>
		<tr>
			<td>shareCode</td>
			<td>String</td>
			<td>设备分享码 （面对面分享）</td>
		</tr>
		<tr>
			<td>h5Url</td>
			<td>String</td>
			<td>H5 页面地址（远程分享）</td>
		</tr>
	</tbody>
</table>

开发者获取到分享码之后用二维码的形式展示出来。被分享的用户，通过二维码扫描到之后，调用设备授权的接口HetDeviceShareApi.getInstance().authShareDevice()就可以完成设备的分享了.  

    HetDeviceShareApi.getInstance().authShareDevice(new IHetCallback() {
            @Override
            public void onSuccess(int code, String msg) {
                ToastUtil.showToast(mContext, "设备分享成功");
                RxManage.getInstance().post(HetShareEvent.HET_EVENT_MAIN_SHARE_SUCCEE,null);
            }
            @Override
            public void onFailed(int code, String msg) {
                ToastUtil.showToast(mContext, "设备分享失败");
            }
        }, code, "5");//5是面对面分享   6是远程分享


这里设备分享成功之后，抛出RxBus事件，设备列表页面注册事件之后刷新设备列表。  

第二种：远程分享（通过QQ、微信分享设备）。
这种分享主要利用的是第三方社交平台，可以快速的实现设备分享有利于实现产品的快速推广。特别注意：远程的第三方分享一定要集成第三方分享服务。详细集成实例请参考下面 **3.5 第三方平台服务（第三方登录和分享）的集成（暂时只支持微信，QQ，新浪微博）**的集成，跟第一种方式一样首先要获取分享码和分享的网页地址。分享的流程图如下：

![这里写图片描述](http://img.blog.csdn.net/20171026143758237?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE1MTMwMzY4NjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

具体的接口调用说明：

HetDeviceShareApi.getInstance().getShareCode(IHetCallback callback,String deviceId,String shareType)
deviceId传设备ID，shareType(5是面对面分享  6远程分享)。这里我们选择传"6",获取远程分享设备的分享地址。

	HetDeviceShareApi.getInstance().getShareCode(new IHetCallback() {
            @Override
            public void onSuccess(int code, String s) {
                if (code == 0) {
                    Type treeType = new TypeToken<ShareCodeModel>() {
                    }.getType();
                    ShareCodeModel codeModel = GsonUtil.getGsonInstance().fromJson(s, treeType);
                    //分享邀请码获取成功
                     String shareUrl = codeModel.getH5Url();
                     //调用第三分享接口把这个网页地址分享到第三方平台
                      .............
                }
            }
            @Override
            public void onFailed(int code, String msg) {
                //分享邀请码获取失败
            }
        }, deviceId, "6");


SDK提供了第三方分享的接口(暂时只支持微信，QQ，新浪微博)，实现第三方分享非常简单，只需要五步就可以完成：

第一步：集成第三方服务  
详细的集成流程请查看 **3.5 第三方平台服务（第三方登录和分享）的集成（暂时只支持微信，QQ，新浪微博）**

第二步：初始化SKD第三方分享接口

    HetThirdDelegate mShareManager = HetThirdDelegate.getInstance();
        CommonShareProxy mShareProxy = new CommonShareProxy(this);
        mShareManager.setShareOperate(new CommonShareOperate(mContext));
        mICommonShareListener = new ICommonShareListener() {
            @Override
            public void onStartShare(CommonSharePlatform sharePlatform) {
                CommonShareWebpage webpage = new CommonShareWebpage(sharePlatform);
                webpage.setUiListener(this);
                webpage.setTitle("设备分享");
                webpage.setDescription("设备分享，极速体验");
                webpage.setAppName(getString(R.string.app_name));
                webpage.setTargetUrl(shareUrl);
                webpage.setWebpageUrl(shareUrl);
                webpage.setBm(BitmapFactory.decodeResource(mContext.getResources(), R.mipmap.icon_share));
                webpage.setSharePlatform(sharePlatform);
                mShareManager.shareWebpage(webpage);
            }
            @Override
            public void onShareSuccess(CommonSharePlatform sharePlatform, String msg) {
                UserMessShareActivity.this.runOnUiThread(() -> {
                    ToastUtil.showToast(mContext, "分享成功");
                });
            }
            @Override
            public void onShareFialure(CommonSharePlatform sharePlatform, String msg) {
                UserMessShareActivity.this.runOnUiThread(() -> {
                    ToastUtil.showToast(mContext, "分享失败");
                });
            }
            @Override
            public void onShareCancel(CommonSharePlatform sharePlatform, String msg) {
                UserMessShareActivity.this.runOnUiThread(() -> {
                    ToastUtil.showToast(mContext, "分享取消");
                });
            }
        };

第二步：添加回调
 
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (mShareManager != null && mShareProxy != null) {
            mShareProxy.onActivityResult(requestCode, resultCode, data);
        }
    }

第三步：开始分享

	mICommonShareListener.onStartShare(CommonSharePlatform.WeixinFriend);//微信分享
	mICommonShareListener.onStartShare(CommonSharePlatform.QQ_Friend);//QQ分享
	分享类型有5种
	public enum CommonSharePlatform {
	    WeixinFriend,//微信好友
	    WeixinFriendCircle,//微信朋友圈
	    QQ_Friend,//QQ好友
	    QQ_Zone,//QQ空间
	    SinaWeibo;//新浪微博
	.....
	}

第四步：退出释放资源

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mShareManager != null) {
            mShareManager.releaseResource();
            mShareManager = null;
        }
    }


##3.4 其他接口

###3.4.1 意见反馈

调用HetFeedbackApi.getInstance().addFeedback()提交意见反馈

    /**
     * 意见反馈
     *
     * @param iCallback the callback
     * @param contact   联系方式  可以传null匿名提交
     * @param content   反馈内容
     */
    public void addFeedback(final IHetCallback iCallback, String contact, String content) {
        FeedbackDeal.addFeedback(iCallback, contact, content);
    }


###3.4.2消息模块

SDK提供了操作消息的接口HetMessageApi

    /**
     * 刷新列表
     *
     * @param callback    回调
     * @param messageId   消息ID
     * @param messageType 消息类型
     * @param pageRows    每页数据大小
     */
    public void refreshList(IHetCallback callback, String messageId, String messageType, String pageRows) {
        ....
    }
    /**
     * 加载更多
     *
     * @param callback    回调
     * @param messageId   消息ID
     * @param messageType 消息类型
     * @param pageRows    每页数据大小
     */
    public void loadList(IHetCallback callback, String messageId, String messageType, String pageRows) {
        ....
    }
    /**
     * 删除消息
     *
     * @param callback  回调
     * @param messageId 消息ID
     */
    public void deleteMessage(IHetCallback callback, String messageId) {
        ....
    }
    /**
     * 消息标记为已读
     *
     * @param callback  回调
     * @param messageId 消息ID
     */
    public void readMessage(IHetCallback callback, String messageId) {
        ....
    }
    /**
     * 消息标记为已读
     *
     * @param callback  回调
     * @param messageId 消息ID
     */
    public void updateMsg(IHetCallback callback, String messageId) {
        ....
    }

开发者根据项目的需求来调用就可以了。下面对获取的消息列表做详细说明。  
调用HetMessageApi.getInstance().refreshList()获取消息列表，调用传参说明：
<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">参数名称</th>
			<th width="11%">是否必须</th>
			<th width="11%">字段类型</th>
			<th width="62%">参数说明</th>
		</tr>
		<tr>
			<td>appId</td>
			<td>是</td>
			<td>string</td>
			<td>应用标识</td>
		</tr>
		<tr>
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>访问凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>messageId</td>
			<td>否</td>
			<td>number</td>
			<td>消息标识，只有上拉时传值，下拉时不能传值</td>
		</tr>
		<tr>
			<td>messageType</td>
			<td>否</td>
			<td>number</td>
			<td>0-系统消息；1-添加好友；2-邀请控制设备；3-查看帖子评论；5-运营互动</td>
		</tr>
		<tr>
			<td>selType</td>
			<td>否</td>
			<td>number</td>
			<td>查询类型。<font color="red">按照人查询消息时不传值，按照app查询时，必传1</font></td>
		</tr>
		<tr>
			<td>pageRows</td>
			<td>否</td>
			<td>number</td>
			<td>每页数据大小</td>
		</tr>
		<tr>
			<td>pageIndex</td>
			<td>否</td>
			<td>number</td>
			<td>加载第几页</td>
		</tr>
	</tbody>
</table>

返回json结果：

	{
	    "data":
	        {
	            "pager":{"totalRows":0,
	                "pageRows":1,
	                "pageIndex":1,
	                "paged":false,
	                "defaultPageRows":20,
	                "currPageRows":0,
	                "pageStartRow":0,
	                "hasPrevPage":false,
	                "hasNextPage":false,
	                "totalPages":0,
	                "pageEndRow":0},
	            "list": [{
	                    "messageId":1,
	                    "title":"特特特特",
	                    "description":"大声答答",
	                    "businessParam":"11111",
	                    "sender":1,
	                    "icon":"http://www.test.com",
	                    "createTime":1434014367000,
	                    "messageType":1,
	                    "status":1，
	                    "level2":3,
	                    "content":"http://200.200.200.50/clife_app/page/topic-view.html?type=2&id=927",
	                    "readed":0,                   
	                    "readonly":0,
	                    "summary":null,
	                    "pictureUrl":null
	                   }]
	          },
	    "code": 0
	} 
返回的结果字段说明：
<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>messageId</td>
			<td>number</td>
			<td>消息标识</td>
		</tr>
		<tr>
			<td>title</td>
			<td>string</td>
			<td>标题</td>
		</tr>
		<tr>
			<td>description</td>
			<td>string</td>
			<td>描述</td>
		</tr>
		<tr>
			<td>businessParam</td>
			<td>string</td>
			<td>业务参数的值(系统推送消息对应消息详情URL(businessParam为空时不要跳转)；添加好友消息对应用户Id，控制设备消息对应设备ID，查看帖子评论对应帖子详情URL。）
			</td>
		</tr>
		<tr>
			<td>sender</td>
			<td>number</td>
			<td>发送者ID</td>
		</tr>
		<tr>
			<td>icon</td>
			<td>string</td>
			<td>图标URL</td>
		</tr>
		<tr><td>messageType</td>
			<td>number</td>
			<td>消息类型：0-系统消息；1-添加好友；2-邀请控制设备；3-查看帖子评论；5-运营互动；其他后续补充
			</td>
		</tr>
		<tr>
			<td>createTime</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>status</td>
			<td>number</td>
			<td>消息状态(0-删除；1-未处理；2-已处理)</td>
		</tr>
		<tr>
			<td>level2</td>
			<td>number</td>
			<td> (系统消息的时候如果操作类标识)系统消息下的二级分类：1-无正文；2-文本H5；3-外链；4-设备
			</td>
		</tr>
		<tr>
			<td>content</td>
			<td>String</td>
			<td> (表示设备信息时候建议接口调用时传json格式值)系统消息内容
			</td>
		</tr>
		<tr>
			<td>readed</td>
			<td>number</td>
			<td>消息是否已读（0-已读 1-未读）
			</td>
		</tr>	
		<tr>
			<td>readonly</td>
			<td>number</td>
			<td>消息是否只读（0-只读类 1-操作类）
			</td>
		</tr>
		<tr>
			<td>summary</td>
			<td>String</td>
			<td>简要描述</td>
		</tr>
		<tr>
			<td>pictureUrl</td>
			<td>String</td>
			<td>简图路径</td>
		</tr>
	</tbody>
</table>

###3.5 第三方平台服务（第三方登录和分享）的集成（暂时只支持微信，QQ，新浪微博）

第三方登录的集成，SDK目前只支持三种方式，也是目前比较主流的支持第三方登录的平台。包括微信、QQ、和新浪微博。  
具体过程分4个步骤：  

第一步：在集成之前需要在微信开放平台、腾讯开放平台、新浪开放平台创建应用，获取到相应的appID和appSecret。  
第二步：在Application里面配置第三方登录SDK。  
可以参考开放平台DEMO 源码，这里就只需要在3.2介绍的assets/h5UIConfig.json中来配置第三方平台app_id和app_secret即可

    //配置第三方登录
    mLoginDelegate = new HetThirdDelegate.Builder(this)
                .registerQQ(UIJsonConfig.getTencentAppID())
                .registerWeixin(UIJsonConfig.getWechatAppID(), UIJsonConfig.getWechatAppSecret())
                .registerSinaWeibo(UIJsonConfig.getSinaAppID(), UIJsonConfig.getSinaAppSecret(), this.mSinaRedirectURL)
                .create();

也可以自己直接写，
registerQQ("your_qq_app_id")、registerWeixin("your_weixin_app_id","your_weixin_app_secret")、registerSinaWeibo("your_sina_app_id","your_sina_app_secret","your_sina_redirect_url")。  
这里注意your_sina_redirect_url是新浪微博用于OAuth authorize页面回调的url。

第三步：配置清单文件AndroidManifest.xml

    <!-- ====================第三方登录分享开始 ========================== -->
  		<activity
            android:name="com.het.open.lib.wb.WBEntryActivity"
            android:configChanges="keyboardHidden|orientation"
            android:launchMode="singleTask"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="stateAlwaysHidden">
            <intent-filter>
                <action android:name="com.sina.weibo.sdk.action.ACTION_SDK_REQ_ACTIVITY" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity
            android:name=".wxapi.WXEntryActivity"
            android:configChanges="keyboardHidden|orientation"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />
        <activity
            android:name="com.tencent.connect.common.AssistActivity"
            android:screenOrientation="portrait"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />
        <activity
            android:name="com.tencent.tauth.AuthActivity"
            android:launchMode="singleTask"
            android:noHistory="true"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <!-- 这里要把1106346235替换成自己在腾讯开放平台注册的appId -->
                <data android:scheme="tencent1106346235" />
            </intent-filter>
        </activity>
        <!-- sinaweibo -->
        <activity
            android:name="com.sina.weibo.sdk.component.WeiboSdkBrowser"
            android:configChanges="keyboardHidden|orientation"
            android:exported="false"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize" />
        <service
            android:name="com.sina.weibo.sdk.net.DownloadService"
            android:exported="false" />
        <!-- =====================第三方登录分享结束=========================== -->

并添加相应的权限

	<uses-permission android:name="android.permission.INTERNET"></uses-permission>
	<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
	<uses-permission android:name="android.permission.WRITE_APN_SETTINGS"></uses-permission>
	<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>

第四步：设置微信登录的回调页面。  
在项目包名目录下添加一个wxapi目录在wxapi里面新建一个WXEntryActivity页面，如：

	public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
	    private IWXAPI api;
	    @Override
	    public void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        Logc.e("Weixin", "WXEntryActivity....onCreate", false);
	        api = WXAPIFactory.createWXAPI(this, UIJsonConfig.getWechatAppID(), true);
	        api.registerApp(UIJsonConfig.getWechatAppID());
	        api.handleIntent(getIntent(), this);
	    }
	    @Override
	    public void onReq(BaseReq arg0) {
	        Logc.e("WXEntryActivity....onReq", false);
	    }
	    @Override
	    public void onResp(BaseResp resp) {
	        Logc.e("WXEntryActivity....onResp", false);
	        if (resp instanceof SendAuth.Resp) {
	            WeiXinLogin.getInstance().onResp(this, (SendAuth.Resp) resp);
	            return;
	        }
	        this.finish();
	    }
	}

注意：wxapi和WXEntryActivity的位置和名字都不能改变，否则不能回调到app中来。例如:DEMO APP的包名是com.het.sdk.demo，那就WXEntryActivity的完整名称就是com.het.sdk.demo.wxapi.WXEntryActivity。  
新浪微博分享回调SDK已经集成，com.het.open.lib.wb.WBEntryActivity,开发者不需要关注。

###3.6 H5+Native混合框架
为了适应APP不断添加新的设备和动态更新，clife平台结合APP开发一套动态的插件更新框架。基于这套框架可以实现app功能的快速开发迭代，减少产品的上线周期。
####3.6.1 H5开发框架
请参考 [基于React的JS-SDK框架](%E5%8F%82%E8%80%83H5%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6JSSDK)
####3.6.2 Android和H5通讯
SDK提供了原生与H5通讯的管理接口HtmlFiveManager。

	public HtmlFiveManager(Activity activity, WebView wv, IAppJavaScriptsInterface appJavaScriptsInterface) {
        ...........
    }

第一个参数是当前的原生活动Activity  
第二个参数传入自己创建的webView。可以直接在activity的layout中创建，也可以直接new WebView(context);（推荐后者）  
第三个参数是给H5页面调用的接口 IAppJavaScriptsInterface。  

	public interface IAppJavaScriptsInterface {
    	void send(String var1, IMethodCallBack var2);

    	String getModeJson();//在H5调用het.config之后，原生会调用getModeJson（）把这个原生方法返回的数据通过ready()回调到H5的ready() 方法。  其实就是原生把H5加载完之后初始化需要展示的数据通过这个接口传递给H5。

    	void onWebViewCreate();//H5加载完之后调用原生方法

    	void tips(String var1);//H5调用het.toast就会回调到原生的tips()方法。这个方法建议直接弹原生的Toast。

    	void setTitle(String var1);//H5调用het.setTitle调用的原生的setTitle方法

    	void onLoadH5Failed(int var1, String var2);//当H5页面加载失败时回调原生的onLoadH5Failed方法

    	void h5SendDataToNative(int var1, String var2, String var3, IH5CallBack var4);//h5把数据发送到原生，提供回调

    	void h5GetDataFromNative(int var1, String var2, IH5CallBack var3);//h5获取原生的数据
	}


HtmlFiveManager提供了3个方法把获取到的设备数据提交到H5。  
updateConfigData()//提交控制数据  
updateRunData()//提交运行数据  
updateErrorData()//提交故障数据  
