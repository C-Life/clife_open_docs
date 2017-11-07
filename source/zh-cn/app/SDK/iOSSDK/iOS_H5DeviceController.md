#H5设备控制


## 1、概述

H5设备控制，是指设备控制页面用html 5开发，嵌入到原生APP，实现设备控制页面动态更新的一种实现方式。


## 2、H5控制页面下载

   用html5开发的设备控制页面，在开发平台发布后，原生APP，会下载H5的控制页面到本地。相关使用方法参考
    


## 3、H5与原生数据交互
 
  SDK提供了原生与H5通讯的管理接口`HETWKWebViewJavascriptBridge`，其通讯原理图如下：
![](https://i.imgur.com/drm1OoC.png)



1、创建webView，添加bridge


创建自己的webView,再创建webView和原生的通信bridge,同时需要实现
`HETWKWebViewJavascriptBridgeDelegate`相关代理
```
  HETWKWebViewJavascriptBridge* bridge = [HETWKWebViewJavascriptBridge bridgeForWebView:webView];
    bridge.delegate=self;
    [bridge setNavigationDelegate:self];
    
```