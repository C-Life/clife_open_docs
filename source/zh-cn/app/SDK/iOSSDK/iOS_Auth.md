## 授权登录

参考`HETAuthorize`类里面方法,调用`authorizeWithCompleted`接口会弹出授权登录的界面，登录成功后接口返回openId（授权用户唯一标识）可用于与自己平台的账户体系关联。

### 1、授权登录

```
/**
 *  是否授权认证
 *
 *  @return   YES为已经授权登录
 */
- (BOOL)isAuthenticated;


/**
 *  授权认证
 *
 *  @param completedBlock 授权认证回调
 */
- (void)authorizeWithCompleted:(authenticationCompletedBlock)completedBlock;
```

【示例代码】

```
 HETAuthorize *auth = [[HETAuthorize alloc] init];
 self.auth = auth;
 if (![self.auth isAuthenticated]) {
      [self.auth authorizeWithCompleted:^(NSString *openId, NSError *error) {
    }];    
  }
```

### 2、取消授权登录，退出当前账号

```
/**
*  取消授权认证
*/
- (void)unauthorize;
```
【示例代码】


```
// 在授权登录成功的情况才执行操作
if ([self.auth isAuthenticated]) {
        [self.auth unauthorize];
}
```

### 3、获取用户信息

```
/**
*获取用户信息
*
* @param success 获取用户信息成功的回调
* @param failure 获取用户信息失败的回调
*/
-(void)getUserInformationSuccess:(successBlock)success
                         failure:(failureBlock)failure;
```

接口返回的结果数据

```
{
 "code":0,
 "data":{
    "userId": "d09f572c60ffced144d6cfc55a6881b9",   
    "userName": "葫芦娃",
    "email":"",
    "phone":"",
    "sex": 1,
    "birthday": "2014-12-31",
    "weight": 48000,
    "height": 163,
    "avatar": "",
    "city": "深圳"
 }
}
```

![](/assets/获取用户信息图片.png)

### 4、**修改密码**
```

/**
 修改密码

 @param success 成功
 @param failure 失败
 */
- (void)changePasswordSuccess:(successBlock)success
                      failure:(failureBlock)failure;
 ```
                   
### 5、**异地登录**、**accessToken过期** 通知

开放平台的账号只能在一台设备上面登录。当有账号在另一台设备登录时，SDK会抛出一个HETLoginOffNotification消息。 开发者可以在首页监听这个消息，处理异地登录的逻辑。 
例：

```
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(XXX) name:HETLoginOffNotification object: nil];
```



