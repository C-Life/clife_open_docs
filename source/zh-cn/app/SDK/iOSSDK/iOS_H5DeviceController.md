#H5设备控制


## 1、概述

H5设备控制，是指设备控制页面用html 5开发，嵌入到原生APP，实现设备控制页面动态更新的一种实现方式。


## 2、H5控制页面下载

   用html5开发的设备控制页面，在开发平台发布后，原生APP，会下载H5的控制页面到本地。相关使用方法参考
    

    ```
     [HETH5Manager launchWithAppSign:@"com.het.beauty.common"];
     
      HETH5Manager *manager = [HETH5Manager deviceId:deviceModel.deviceId productId: 
             [NSString stringWithFormat:@"%@",deviceModel.productId]];
      
      //下载H5包到本地
       [manager configWithController:self controllers:^NSArray<UIViewController *> *(NSString *h5PagePath) {
            NSLog(@"h5PagePath--->:%@",h5PagePath);
            NSString *desPath  = [NSString stringWithFormat:@"%@/index.html",h5PagePath];
            
        }];
     
    ```
    


## 3、H5与原生数据交互
 
  SDK提供了原生与H5通讯的管理接口`HETWKWebViewJavascriptBridge`，其通讯原理图如下：
![](https://i.imgur.com/drm1OoC.png)



1、创建webView，添加bridge


创建自己的webView,再创建webView和原生的通信bridge,同时需要实现
`HETWKWebViewJavascriptBridgeDelegate`相关代理

```
  HETWKWebViewJavascriptBridge* bridge = [HETWKWebViewJavascriptBridge   bridgeForWebView:webView];
    bridge.delegate=self;
    [bridge setNavigationDelegate:self];
    
```

2、加载本地H5

```
- (void)loadRequest
{
    if (self.h5Path&&self.h5Path.length>0) {
        
        if ([self.h5Path hasPrefix:@"http"]) {
            
            [_wkWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:self.h5Path]]];
        }else{
            NSRange webRange = [_h5Path rangeOfString:@"web"];
            NSRange locationRange = [_h5Path rangeOfString:@"household"];
            NSString *directory;
            if (webRange.length>0) {
                directory = [_h5Path substringWithRange:NSMakeRange(0, webRange.length+webRange.location+1)];
            }
            if (locationRange.length>0) {
                directory = [_h5Path substringWithRange:NSMakeRange(0, locationRange.length+locationRange.location+1)];
            }
            
            if (NSFoundationVersionNumber>NSFoundationVersionNumber_iOS_8_x_Max) {
                @try {
                    [_wkWebView loadFileURL:[NSURL URLWithString:[NSString stringWithFormat:@"file://%@",[self.h5Path stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]] allowingReadAccessToURL:[NSURL fileURLWithPath:directory]];
                } @catch (NSException *exception) {
                    NSLog(@"%@",exception);
                } @finally {
                    
                }
            }else{
                [_wkWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"file://%@",[self.h5Path  stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]]]];
            }
        }
    }
}

- (void)updateWebOrientation {
    UIInterfaceOrientation orientation = [UIApplication sharedApplication].statusBarOrientation;
    if (UIInterfaceOrientationIsLandscape(orientation)) {
        //[_webView stringByEvaluatingJavaScriptFromString:
        // @"document.body.setAttribute('orientation', 90);"];
        [_wkWebView evaluateJavaScript:@"document.body.setAttribute('orientation', 90);" completionHandler:nil];
    } else {
        //[_webView stringByEvaluatingJavaScriptFromString:
        // @"document.body.removeAttribute('orientation');"];
        [_wkWebView evaluateJavaScript:@"document.body.removeAttribute('orientation');" completionHandler:nil];
    }
}


```


3、监听设备数据，通过bridge传递给H5

```
   _communicationManager=[[HETDeviceControlBusiness alloc]initWithHetDeviceModel:self.deviceModel deviceRunData:^(id responseObject) {
        [_bridge webViewRunDataRepaint:responseObject];
    } deviceCfgData:^(id responseObject) {
        [_bridge webViewConfigDataRepaint:responseObject];
    } deviceErrorData:^(id responseObject) {
        [_bridge webViewRunDataRepaint:responseObject];
    } deviceState:^(HETWiFiDeviceState state) {
        NSMutableDictionary *infoDic = [NSMutableDictionary dictionary];
        [infoDic setObject:@(state) forKey:@"onlineStatus"];
        [_bridge webViewRunDataRepaint:infoDic];
        
    } failBlock:^(NSError *error) {
        NSLog(@"失败了:%@",error);
    }];
    
     [_communicationManager start];
     
```


4、实现`HETWKWebViewJavascriptBridgeDelegate`,接受H5传递过来的参数

```

#pragma -mark HETWKWebViewJavascriptBridgeDelegate
/**
 *  js调用的配置接口
 *
 *  @param data
 */
-(void)config:(id)data
{
    [_bridge webViewReady:nil];
    if(self.communicationManager.deviceCfgData)
    {
        [_bridge webViewConfigDataRepaint:self.communicationManager.deviceCfgData];
    }
}


/**
 *  js调用的发送数据接口
 *
 *  @param data 将发送给app的数据，一般是完整的控制数据(json字符串)
 *  @param successCallback  app方数据处理成功时将调用该方法
 *  @param errorCallback    app方数据处理失败时将调用该方法
 */
-(void)send:(id)data successCallback:(id)successCallback errorCallback:(id)errorCallback
{
    //[_bridge updateDataSuccess:nil successCallBlock:successCallback];
    NSData *jsonData = [data dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *olddic = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil];
    NSMutableDictionary *responseObject=[[NSMutableDictionary alloc]initWithDictionary:olddic];
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    dic=responseObject;
    NSError * err;
    NSData * tempjsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&err];
    NSString * json = [[NSString alloc] initWithData:tempjsonData encoding:NSUTF8StringEncoding];
    [self.communicationManager deviceControlRequestWithJson:json withSuccessBlock:^(id responseObject) {
        [_bridge updateDataSuccess:responseObject successCallBlock:successCallback];
    } withFailBlock:^(NSError *error) {
        [_bridge updateDataError:responseObject errorCallBlock:errorCallback];
    }];
    
    
}


/**
 *  js调用的设置页面标题接口(该方法用于将标题发送给app，以供app进行标题更新。)
 *
 *  @param data  将设置的标题
 */
-(void)title:(id)data
{
    self.title=data;
}



/**
 *  js调用的系统toast接口(方法用于调用系统toast，以便app方统一toast风格)
 *
 *  @param data 将要弹出的提示信息
 */
-(void)toast:(id)data
{
    
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)relProxyHttp:(id)url data:(id)data httpType:(id) type sucCallbackId:(id) sucCallbackId errCallbackId:(id) errCallbackId needSign:(id) needSign
{
    
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)absProxyHttp:(id)url data:(id)data httpType:(id) type sucCallbackId:(id) sucCallbackId errCallbackId:(id) errCallbackId
{
    
}

/**
 *  加载H5页面失败
 *
 *  @param errCode  错误码
 *  @param errMsg   错误信息
 */
-(void)onLoadH5Failed:(id)errCode errMsg:(id)errMsg
{
    
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)h5SendDataToNative:(id) routeUrl data:(id) data successCallbackId:(id)successCallbackId failedCallbackId:(id) failedCallbackId
{
    [_bridge webViewNativeResponse:@{@"h5SendDataToNative":routeUrl} callBackId:successCallbackId];
}

/**
 *  H5调用config接口后需要APP调用此方法，告知js准备好了(注意此方法调用之后，一般需要紧接着调用webViewConfigDataRepaint传配置数据给H5初始化界面)
 *
 *  @param dic
 */
-(void)h5GetDataFromNative:(id)routeUrl successCallbackId:(id)successCallbackId failedCallbackId:(id)failedCallbackId
{
    [_bridge webViewNativeResponse:@{@"h5GetDataFromNative":routeUrl} callBackId:successCallbackId];
}

```