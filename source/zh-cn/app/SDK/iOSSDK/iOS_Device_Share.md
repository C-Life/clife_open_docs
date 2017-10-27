##IOS 设备分享

C-Life设备分享分为面对面分享和第三方应用分享


###一、分享流程
* 面对面分享：

A用户打开APP设备面对面分享产生一个分享二维码，
B用户打开APP的扫一扫，直接获取设备的控制权限。

* 第三方应用分享：

A用户打开APP设备第三方应用分享（微信，QQ），例如分享到微信好友，
B用户识别微信中的二维码，打开分享网页，尝试打开APP成功即获取设备的控制权限，失败就提示用户B下载APP。

 **注意：**
 
 1、URL scheme
 
 * 第三方分享需要APP提供URL scheme，方便web页面打开APP，并且传递分享码给APP。
 
 
2、分享码有效期
 
 * 面对面分享码有效期为10分钟
 * 第三方分享码有效期为一个小时

###二、面对面分享
第一步：请求分享码，并生成分享二维码

第二步：验证分享码，获取设备权限


###三、第三方应用分享

第一步：请求分享连接，分享到第三方应用

第二步：第三方应用打开连接，web页面尝试打开APP

第二步：验证分享码，获取设备权限

###四、接口说明

1、获取设备分享码

```
/**
 *  获取分享码
 *
 *  @param deviceId 分享的设备（加密的）
 *  @param shareType  分享方式 （5 -面对面；6-远程分享）
 *  @param success  成功的回调
 *  @param failure  失败的回调
 */
+(void)getShareCodeWithDeviceId:(NSString *)deviceId
                      shareType:(HETDeviceShareType)shareType
                        success:(successBlock)success
                        failure:(failureBlock)failure
```

参数说明

| 参数名称	| 是否必须 |	字段类型 |	参数说明          |
|----------|----------|---------|-----------------|
| deviceId | 是       | NSString|  设备ID          |
| shareType | 是       | HETDeviceShareType |  分享类型           |

2、授权分享

```
/**
 *  授权分享
 *
 *  @param shareCode 分享码
 *  @param shareType  分享方式 （5 -面对面；6-远程分享）
 *  @param success  成功的回调
 *  @param failure  失败的回调
 */
+(void)authShareDeviceWithShareCode:(NSString *)shareCode
                          shareType:(HETDeviceShareType)shareType
                            success:(successBlock)success
                            failure:(failureBlock)failure
                            
```


参数说明

| 参数名称	| 是否必须 |	字段类型 |	参数说明          |
|----------|----------|---------|-----------------|
| shareCode | 是       | NSString|  设备分享码          |
| shareType | 是       | HETDeviceShareType |  分享类型           |
