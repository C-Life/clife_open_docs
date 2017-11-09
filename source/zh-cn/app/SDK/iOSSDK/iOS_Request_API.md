# APP辅助接口调用方法

开放平台部分辅助接口，将会以接口文档的形式对外开发，开放平台提供一个基础的HTTPS网络请求，协助完成底层签名和token信息的插入，完成网络请求。

```
/**
 *  普通网络请求
 *
 *  @param method     HTTP网络请求方法
 *  @param requestUrl 网络请求的URL
 *  @param params     请求参数
 *  @param needSign   是否需要签名
 *  @param success    网络请求成功的回调
 *  @param failure    网络请求失败的回调
 */
+(void)startRequestWithHTTPMethod:(HETRequestMethod)method
                   withRequestUrl:(NSString *)requestUrl
                    processParams:(NSDictionary *)params
                         needSign:(BOOL)needSign
                 BlockWithSuccess:(successBlock)success
                          failure:(failureBlock)failure;
```

```
意见反馈接口：

URL： /v1/feedback/addFeedback
```

**参数说明**

<table width="100%" style="border-spacing: 0; border-collapse: collapse;" cellspacing="0">
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
			<td>number</td>
			<td>应用标识</td>
		</tr>
		<tr>
			<td>accessToken</td>
			<td>是</td>
			<td>String</td>
			<td>访问凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>contact</td>
			<td>否</td>
			<td>string</td>
			<td>联系方式</td>
		</tr>
		<tr>
			<td>content</td>
			<td>是</td>
			<td>string</td>
			<td>反馈内容</td>
		</tr>
		<tr>
			<td>productId</td>
			<td>否</td>
			<td>number</td>
			<td>产品id</td>
		</tr>	

		<tr>
			<td>feedbackType</td>
			<td>是</td>
			<td>number</td>
			<td>问题类型（1-APP问题，2-硬件设备，3-配网相关，4-意见建议 ，5 -其它）</td>
		</tr>	
		<tr>
			<td>source</td>
			<td>是</td>
			<td>number</td>
			<td>来源(1-web，2-app，3-微信)</td>
		</tr>
	</tbody>
</table>

**返回结果**

正确的Json返回结果：

	{
	  "code": 0
	}
