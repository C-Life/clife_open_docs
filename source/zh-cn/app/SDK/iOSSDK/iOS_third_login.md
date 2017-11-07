# 第三方登录


##1. 申请各平台的App key和App secret
注意：app bundleId跟各平台注册的时候一致。

<a href="https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417694084&token=&lang=zh_CN">微信接入地址</a>

##2. 导入SDK 

```
pod 'WechatOpenSDK', '1.7.7'
pod 'WeiboSDK', '3.1.3'
pod 'TencentOpenApiSDK', '2.9.5'
```

##3. 项目配置


###3.1 URLScheme 配置

![](/assets/第三方登录URLTypes.jpeg)
###3.2 针对iOS9+，添加白名单
在info.plist文件中加入 LSApplicationQueriesSchemes

![](/assets/第三方登录白名单.jpeg)
```
<key>LSApplicationQueriesSchemes</key>
 <array>
    <!-- 微信 URL Scheme 白名单-->
    <string>wechat</string>
    <string>weixin</string>

    <!-- 新浪微博 URL Scheme 白名单-->
    <string>sinaweibohd</string>
    <string>sinaweibo</string>
    <string>sinaweibosso</string>
    <string>weibosdk</string>
    <string>weibosdk2.5</string>

    <!-- QQ、Qzone URL Scheme 白名单-->
    <string>mqqapi</string>
    <string>mqq</string>
    <string>mqqOpensdkSSoLogin</string>
    <string>mqqconnect</string>
    <string>mqqopensdkdataline</string>
    <string>mqqopensdkgrouptribeshare</string>
    <string>mqqopensdkfriend</string>
    <string>mqqopensdkapi</string>
    <string>mqqopensdkapiV2</string>
    <string>mqqopensdkapiV3</string>
    <string>mqzoneopensdk</string>
    <string>wtloginmqq</string>
    <string>wtloginmqq2</string>
    <string>mqqwpa</string>
    <string>mqzone</string>
    <string>mqzonev2</string>
    <string>mqzoneshare</string>
    <string>wtloginqzone</string>
    <string>mqzonewx</string>
    <string>mqzoneopensdkapiV2</string>
    <string>mqzoneopensdkapi19</string>
    <string>mqzoneopensdkapi</string>
    <string>mqzoneopensdk</string>
    
</array>

```

###3.4 针对iOS9默认使用https,现在先还原成http请求方式。

  在Info.plist中添加NSAppTransportSecurity类型Dictionary。

 在NSAppTransportSecurity下添加NSAllowsArbitraryLoads类型Boolean,值设为YES    

  第一步：在plist中添加NSAppTransportSecurity项，此项为NSDictionary

  第二步：在NSAppTransportSecurity下添加   NSAllowsArbitraryLoads类型为Boolean，value为YES
  
##4. 接入HETOpenSDK 第三方登录


###4.1 在appdelegate.m中，添加代码

第一步：注入appkey
	
```
   [HETOpenSDK setPlaform:HETAuthPlatformType_QQ appKey:QQ_APP_ID appSecret:nil redirectURL:nil];
   [HETOpenSDK setPlaform:HETAuthPlatformType_Weibo appKey:WB_APP_KEY appSecret:nil redirectURL:nil];
   [HETOpenSDK setPlaform:HETAuthPlatformType_Wechat appKey:WX_APP_KEY appSecret:WX_APP_SECRET redirectURL:nil];
  
```


第二步：添加请求方法
	
```
	- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
	{
    	BOOL result = [HETOpenSDK application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
   	 return result;
	}

	- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
	{
   	BOOL result = [HETOpenSDK handleOpenURL:url];
   	return result;
	}
```
