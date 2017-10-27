## 授权登录

参考HETAuthorize类里面方法,调用authorizeWithCompleted接口会弹出授权登录的界面，登录成功后接口返回openId（授权用户唯一标识）可用于与自己平台的账户体系关联。

###1、授权登录

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
      [auth authorizeWithCompleted:^(HETAccount *account, NSError  *error)      {


    }];	
  }
    

```

###2、取消授权登录，退出当前账号

```
/**
*  取消授权认证
*/
- (void)unauthorize; 

```

###3、获取用户信息

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

###4、**异地登录**、**accessToken过期** 通知

```
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(XXX) 
name:HETLoginOffNotification object: nil];
    
    
   
```