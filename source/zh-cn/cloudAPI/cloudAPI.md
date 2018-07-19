# C-Life 开放平台云接口 #
# 1. 接入方式

![](http://i.imgur.com/hZnRP42.png)

如上图所示，C-Life云支持第三方云通过API同步用户信息、设备信息，下发控制设备和主动PUSH设备数据；
	
**API**：开发者可以根据C-Life云的API来封装HTTPS请求进行调用。

**PUSH设备数据**：PUSH设备数据是C-Life云提供给第三方云的一种推送服务，让第三方云及时收集所属产品的设备数据，为后续的产品研发提供最可靠的数据支持。

# 2. API调用流程

**1.	开发者申请appId和appSecret**

	appId作为服务端向开发者发放的授权标识，调用所有接口时的必传参数，用于后台对接口调用的权限管理和调用频次限制。
	appSecret是服务端分配给开发者的密钥，主要用于请求签名加密之用，证明开发者的合法身份。

**2.	开发者在平台绑定调用接口的IP白名单**

	绑定开发者调用平台接口的服务器IP

**3.开发者调用TOKEN接口从平台拿到accessToken**
		
	accessToken是全局唯一接口调用凭据，调用各接口时都需使用accessToken，开发者需要进行妥善保存。
	accessToken的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的accessToken失效。

**4.	开发者使用accessToken参数调用其他业务接口**

**5.	开发者提交timestamp参数的值为当前北京时间戳**

**6.API签名机制**

**步骤：**

	1. 将请求方法+请求地址+所有参数按照参数名的字母顺序升序排序后拼接+appSecret
	2. 将第1步的结果MD5后生成签名参数sign。（签名后的MD5需要转换成小写）

**说明：**

	1. 请求方法为GET或POST，注意大写。
	2. 请求地址为客户端请求完整地址，如：http://open.api.clife.cn/v1/data/get
	3. 参数拼接，按照参数名的字母顺序升序排序后进行拼接，如：accessToken=xxx&appId=xxx&name1=value1&name2=value2&
	4. 组成完整的拼接，如：GEThttp://open.api.clife.cn/v1/data/getaccessToken=xxx&appId=xxx&name1=value1&name2=value2&appSecret
	5. 生成MD5值，如：74b024f42f3075c4c06e4e8f22ca7a5f



# 3. PUSH设备数据接入说明

PUSH设备数据是C-Life云提供给第三方云的一种推送服务，让第三方云及时收集所属产品的设备数据，为后续的产品研发提供最可靠的数据支持。

当C-Life云推送服务发送设备数据给第三方云服务接口时，会产生一个POST请求，第三方云服务接口需要在响应包(GET)中返回特定JSON结构，来对该推送进行响应。

C-Life云推送服务在将设备数据发给第三方云的推送服务器地址(开放平台产品接入的接入方案处配置)后，C-Life云推送服务在三秒内收不到响应会断掉连接，并且重新发起请求，总共重试三次。关于重试的设备数据排重，使用msgId进行排重。

假如第三方云服务器无法保证在三秒内处理并回复，必须做出下述回复，这样C-Life云推送服务才不会对此作任何处理，并且不会发起重试，否则，将出现第三方云服务接口被锁定的情况。详见下面说明：

	1、第三方云服务接口验证阶段（html包体没设备数据）时，直接回复{"code":0,data:token字符串}。
	2、第三方云服务接口接收推送服务（html包体有设备数据）时，直接回复{"code":0,data:msgId字符串}。

## 3.1 接入方案配置

第三方云可以到C-Life开放平台的产品接入中的接入方案处进行配置。

**流程如下：**

	1)选择第三方云连接C-Life硬件云通道(设备连接第三方云服务器后，可通过设备openAPI与C-Life硬件云对接)
	2)填写URL和Token
    		URL:第三方云服务接口的惟一标识，供C-Life云推送服务给第三方云推送数据用的。（现在仅支持http方式）
    		Token:第三方云服务接口在和C-Life云推送服务的凭证，用来验证厂商服务接口的合法性。

**请注意：**

	第三方云在接入方案配置前，请确保第三方云服务接口能够正常运行。当接入方案配置完成时，
	C-Life云即向第三方云服务接口URL发送一个空请求，
	第三方云服务接口此时就能返回规定的JSON字符串响应({"code":0,data:Token字符串}，
	Token字符串即为页面上所填写的Token内容), 否则C-Life云会发起重试机制。

##  3.2 查询推送失败的设备数据

第三方云发现推送设备数据有缺失的话，可以调用此接口获取产品的推送失败的设备数据。C-Life云会保留30天的推送失败的设备数据。

推送数据失败有下述原因：

	1)推送时第三方云服务接口出现问题;
	2)第三方云服务接口没有返回规定的JSON字符串响应；({"code":0,data:msgId字符串},msgId为推送设备数据的惟一标识，第三方云服务接口原样返回即可)
	3)第三方云服务处理业务超时没返回响应；(推送请求超时时间为三秒)
	4)第三方云服务接口返回的msgId与和C-Life云推送服务发送的msgId不一致。


# 4. 变量说明

## 4.1 全局返回码
	
**全局返回码说明**

	每次调用接口时，可能获得正确或错误的返回码，可以根据返回码信息调试接口，排查错误。

**全局返回码说明如下：**

| 返回码		| 说明			| 
|:-----   	|:-----   		|
| 0			| 请求成功		| 
| 100010100	| 缺少授权信息	| 
| 100010101	| AccessToken错误或已过期| 
| 100010103	| AppId不合法	| 
| 100010104	| timestamp过期	|	 
| 100010105	| 签名错误		|	 
| 100010111	| timestamp不合法| 
| 100010200	| 失败			| 
| 100010201	| 缺少参数		| 
| 100010202	| 参数错误		| 

## 4.2 分页信息

**分页JSON格式：**

	"pager" : {
		"pageIndex": 1,
		"pageRows": 20,
		"totalRows": 45,
		"totalPages": 3,
		"defaultPageRows":20,
		"currPageRows": 20,
		"pageStartRow": 0,
		"pageEndRow": 19,
		"hasPrevPage": false,
		"hasNextPage": true
	}

**分页信息说明：**

| 字段名称		| 基础信息| 	字段类型| 	字段说明| 
|:-----   		|:-----   |:-----  |:-----  	|
| pageIndex		| 是		|   number| 请求的页（从1开始），不设则默认为1| 
| pageRows		| 是		|   number| 请求的每页行数，不设则默认为defaultPageRows| 
| totalRows		| 否		|   string| 总行数| 
| totalPages	| 否		| 	number| 总页数| 
| defaultPageRows| 是	| 	number| 默认每页行数：20| 
| currPageRows	| 否		|   number| 当前页的实际行数| 
| pageStartRow	| 是		|   number| 当前页的起始行（从0开始，有可能超出总行数）| 
| pageEndRow	| 是		| 	number| 当前页的结束行（从0开始，有可能超出总行数）| 
| hasPrevPage	| 否		| 	boolean| 是否有前一页| 
| hasNextPage	| 否		| 	boolean| 是否有后一页| 



## 4.3 全局变量说明

|字段		|说明|
|:-----   	|:-----   |
|deiveId	|加密后的设备标识|
|openId	    |加密后的开放账号标识|



# 5. 访问凭证接口

## 5.1 获取接口访问凭证

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/token

**参数说明**


|参数名称			|是否必须	|字段类型	|参数说明|
|:-----         |:----- |:----- |:----- |
|appId			|是		|string	|应用标识|
|appSecret	|是		|string	|应用密钥|
|timestamp		|是		|number	|时间戳|


**返回结果**

正确的Json返回结果：

	{
		"data": {
			"accessToken": "677c11e05aac4c85b6442ba99c6653a1",
			"expiresIn": 28800
		},
		"code": 0
	}

|字段名称		|字段类型		|字段说明|
|:-----      |:-----    |:-----    |
|accessToken|string	    |接口调用凭证|
|expiresIn	|string		|accessToken接口调用凭证超时时间，单位（秒）|



# 6. 用户相关接口

## 6.1 获取用户基本信息

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/get

**参数说明**

|参数名称	    |是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId	    |是	    |string	|应用标识|
|accessToken|是	    | string|接口调用凭证|
|timestamp	|是	    | number|时间戳|
|openId	    |是	    | string|openId（APP SDK里OAuth授权后返回的openId）|



**返回结果**

正确的Json返回结果：

	{
		"code":0,
		"data":{
			"userName": "葫芦娃",
			"sex": 1,
			"birthday": "2014-12-31",
			"weight": 48000,
			"height": 163,
			"avatar": "",
			"city": "深圳"
			"regTime":"2014-12-31 00:00:00"
		}
	}

| 字段名称 | 字段类型 | 字段说明|
|:-----   |:-----   |:-----  |
| userName | string   | 用户名称 | 
| sex      | number   | 性别 （1-男，2-女）| 
| birthday | Ostring    | 生日（yyyy-MM-dd） | 
| weight | Onumber| 体重（克） | 
| height | number | 身高（厘米） | 
| avatar | string | 头像URL| 
| city	| string	| 用户所在城市 |
| regTime| 	string	| 用户注册时间 |




## 6.2 获取用户列表

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/list

**参数说明**

| 参数名称 |是否必须	|字段类型	 |参数说明 |
|:-----   |:-----   |:-----  |:-----  |
|appId	    |是	     |string |	应用标识|
|accessToken|	是	|string	 | 接口调用凭证|
|timestamp	|是	    |number	 |时间戳|
|pageRows	|否	    |number	 |每页显示的行数（默认为20,最大为1000）|
|pageIndex	|否	    |number	 |当前页|

**返回结果**

正确的Json返回结果：

	{
	    "code": 0,
	    "data": {
			"list":[
				"OPENID1",
	            "OPENID2"
			],
			"pager":{
				"totalRows":2,
				"pageRows":10,
				"pageIndex":1,
				"paged":false,
				"pageStartRow":0,
				"pageEndRow":9,
				"hasPrevPage":false,
				"hasNextPage":false,
				"defaultPageRows":20,
				"totalPages":1,
				"currPageRows":2
			}
	    }
	}

|字段名称	|字段类型	|字段说明|
|:-----   |:-----   |:-----  |
|list	|数组	|开放账号标识列表|



## 6.3 获取用户设备信息

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/device/list

**参数说明**

|参数名称	    |是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId	    |是	    |string	|应用标识|
|accessToken|是	    | string|接口调用凭证|
|timestamp	|是	    | number|时间戳|
|openId	    |是	    | string|openId|



**返回结果**

正确的Json返回结果：

	{
		"data": [
		{
			"deviceId": "501D275D6CD840F39FF862CC9AE3ABBA",
			"macAddress": "5c313e08fc09",
			"deviceName": "CC13653",
			"bindTime": "2015-06-11 06:00:03",
			"onlineStatus":1,
			"deviceCode": "0000C3AA00010105"
		}],
		"code": 0
	}


|字段名称	     |字段类型 	|   字段说明|
|:-----      |:-----    |:-----    |
|deviceId	 |string	| 	设备标识|
|macAddress	 |string	|	MAC地址|
|deviceName	 |string	|	设备名称|
|bindTime	 |string	|	绑定时间|
|onlineStatus| number	|	在线状态（1-正常，2-异常）|
|deviceCode	 |string	|	设备编码|


## 6.4 获取设备信息

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/device/info


**参数说明**

|参数名称	    |是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId	    |是	    |string	|应用标识|
|accessToken|是	    | string|接口调用凭证|
|timestamp	|是	    | number|时间戳|
|deviceId	|是	    | string|设备唯一标识（加密）|

**返回结果**

正确的Json返回结果：

	{
	    "code": 0,
	    "data": {
	        "deviceId": "AD56A554A6A3C96A909AA02BBDC15F05",
	        "macAddress": "ACCF23F269F0",
	        "deviceName": "明灯智能香薰机",
	        "onlineStatus": 2,
	        "bindTime": "2018-05-10 09:32:10",
	        "deviceCode": "00000001000B0104"
	    }
	}

|字段名称	     |字段类型 	|   字段说明|
|:-----      |:-----    |:-----    |
|deviceId	 |string	| 	设备标识|
|macAddress	 |string	|	MAC地址|
|deviceName	 |string	|	设备名称|
|bindTime	 |string	|	绑定时间|
|onlineStatus| number	|	在线状态（1-正常，2-异常）|
|deviceCode	 |string	|	设备编码|

## 6.5  获取设备列表

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/device/bindlist


**参数说明**

|参数名称	    |是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId	    |是	    |string	|应用标识|
|accessToken|是	    | string|接口调用凭证|
|timestamp	|是	    | number|时间戳|
|pageIndex	|否	    | number|当前页（默认第一页）|
|pageRows	|否	    | number|每页显示的行数（默认20行）|

**返回结果**

正确的Json返回结果：
	{
	    "data": {
	        "pager": {
	            "totalRows": 193,
	            "pageRows": 20,
	            "pageIndex": 1,
	            "paged": false,
	            "defaultPageRows": 20,
	            "totalPages": 10,
	            "currPageRows": 20,
	            "pageStartRow": 0,
	            "pageEndRow": 19,
	            "hasPrevPage": false,
	            "hasNextPage": true
	        },
	        "list": [
	            {
	                "deviceId": "F6CEB018B367FA5C752CA2598AE7C1FD",
	                "macAddress": "ACCF234422D7",
	                "deviceName": "乐鑫-AP",
	                "onlineStatus": 2,
	                "bindTime": "2018-03-26 08:55:31",
	                "deviceCode": "0000C558000B0104"
	            }]
	    },
	    "code": 0
	}


|字段名称	     |字段类型 	|   字段说明|
|:-----      |:-----    |:-----    |
|deviceId	 |string	| 	设备标识|
|macAddress	 |string	|	MAC地址|
|deviceName	 |string	|	设备名称|
|bindTime	 |string	|	绑定时间|
|onlineStatus|number	|	在线状态（1-正常，2-异常）|
|deviceCode	 |string	|	设备编码|

|totalRows	 |number	|	总行数|
|pageRows	 |number	|	每页显示的行数|
|pageIndex	 |number	|	当前页|
|paged	 	 |boolean	|	是否传递分页对象|
|defaultPageRows	 |number	|	每页默认行数|
|totalPages	 |number	|	总页数|
|currPageRows	 |number	|	当前页显示的行数|
|pageStartRow	 |number	|	当前页起始行号|
|pageEndRow	 |number	|	当前页结束行号|
|hasPrevPage	 |boolean	|	是否有前一页|
|hasNextPage	 |boolean	|	是否有后一页|

# 7. 设备相关接口

## 7.1 获取设备最新配置数据

**接口调用请求说明**

	http请求方式: GET
	http(s):https://open.api.clife.cn/v1/cloud/device/data/getConfigData

**参数说明**

|参数名称	    |是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId	    |是		|string |应用标识|
|accessToken|是		|string |访问凭证|
|timestamp  |是		|number |时间戳	|
|deviceIds  |是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|




**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其配置数据)

	{
	    "code": 0, 
	    "data": [
	        {
	            "75a06180045a9f4e8228f330bb76f5fa": {
	                "timehour": 0, 
	                "reservation": 0, 
	                "timemin": 16, 
	                "power": 2
	            }
	        }, 
	        {
	            "2937f353e51177cec466067f3f430ea7": {
	                "timehour": 0, 
	                "reservation": 0, 
	                "timemin": 15, 
	                "power": 1
	            }
	        }
	    ]
	}


## 7.2 获取设备最新控制数据

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/config/get

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|是		|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其控制数据)

	{
		"code": 0,
		"data": [{
				"75a06180045a9f4e8228f330bb76f5fa": {
						"Airlevel": 1,
						"mode": 2,
						"AddLiquid": 0,
						"wash": 1
						"sound": 2,
						"updateFlag": "0000"
					}
				},
				{
				"2937f353e51177cec466067f3f430ea7": {
					"fanGear": 8,
					"childlock": 1,
					"onoff": 1,
					"uvsw": 2
					"mode": 0
					}
				}]
	}

## 7.3 获取设备最新运行数据

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/get

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其运行数据)

	{
		"code": 0,
		"data": [
		{
			"75a06180045a9f4e8228f330bb76f5fa": {
					"Deodorant": 3,
					"Ammoniahigh": 0,
					"Ammonialow": 0
				}
			},
		{
			"2937f353e51177cec466067f3f430ea7": {
				"RemainTime": 255,
				"powerOn": 1,
				"airQty": 3,
				"ambientTemp": 168,
				"anionSw": 2,
				"wifiSignal": 118,
				"ozoneSw": 2
			}
		}
		{
			"ffdab511175cd210ff53bb50be985817": {
				"FreezeWorkStatus": 1,
				"RefrDefrostCycle": "0",
				"dataTimeStamp": 1503252476902,
				"FreezeDefrostCy": "0"
			}
		}]
	}

## 7.4 获取设备最新故障信息

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/getErrorData

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其故障数据)

	{
		"code": 0,
		"data": [{
			"75a06180045a9f4e8228f330bb76f5fa": {
				"FanError2": 0,
				"AmmoniaSensorError": 0,
				"SolenoidValveError2": 0,
				"AtomizerError": 0,
				"FanError": 0
				}
			},
			{
				"2937f353e51177cec466067f3f430ea7": {
				"AirQtyErr": 0,
				"dataTimeStamp": 1499295434552,			
				"PM25SnrErr": 0,
				"LeakCurrentErr": 0
				}
			},
			{
			"ffdab511175cd210ff53bb50be985817": {
				"WiFiFlashErr": 0,
				"dataTimeStamp": 1503252319761,
				"reserved10": "",
				"FreezeCoilHeatErr": 0,
				"FreezeFanErr": 0,		
				"CompErr": 0,
				"RefrCoilTempErr": 0
				}
			}]
	}

## 7.5 获取设备运行数据列表（最多获取7天，每页最多100条）

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/getRunDataLists

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|
|startDate	|是		|string	|开始时间，格式：yyyy-MM-dd|
|endDate	|否		|string	|结束时间，默认当前时间，格式：yyyy-MM-dd，开始时间与结束时间间隔不能大于7天|
|pageRows	|否		|number	|每页显示的行数(每页最多显示100行)|
|pageUpOrDown	|否		|number	|查询上一页还是下一页(0-上一页 1-下一页,默认下一页)|
|rowDate	|否		|string	|row时间,格式:deciceID:timestamp,首次查询为NULL(查询上一页传第一条数据的rowDate,查询下一页传最后一条数据的rowDate,多个rowDate用英文逗号隔开) ) |


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其运行数据列表)

	{
    code: 0,
    data: {
        "list": [
              {
                "7dfebf6b9db29806be60e445102204d8": [
                  {
                    "timestamp": 1514023771918,
                    "rowkey": "2a54a1c-1715-23384186-20170929080022000",
                    "dataTimeStamp": "1506617896755",
                    "station": "3",
                    "ifctram": "0",
                    "nowAm": "255"
                  },
                  {
                    "timestamp": 1514023771918,
                    "rowkey": "2a54a1c-1715-23384186-20170928125405000",
                    "dataTimeStamp": "1506563643839",
                    "station": "3",
                    "ifctram": "0",
                    "nowAm": "255"
                  }
                ]
              },
              {
                "7dfebf6b9db29806be60e44510220438": {
                  "error": "deviceId不存在"
                }
              }
            ]
        }
	}

## 7.6 获取设备故障数据列表（最多获取7天，每页最多100条）

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/getErrorDataLists

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|
|startDate	|是		|string	|开始时间，格式：yyyy-MM-dd|
|endDate	|否		|string	|结束时间，默认当前时间，格式：yyyy-MM-dd，开始时间与结束时间间隔不能大于7天|
|pageRows	|否		|number	|每页显示的行数(每页最多显示100行)|
|pageUpOrDown	|否		|number	|查询上一页还是下一页(0-上一页 1-下一页,默认下一页)|
|rowDate	|否		|string	|row时间,格式:deciceID:timestamp,首次查询为NULL(查询上一页传第一条数据的rowDate,查询下一页传最后一条数据的rowDate,多个rowDate用英文逗号隔开) ) |


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其故障数据列表)

	{
    code: 0,
    data: {
        "list": [
              {
                "7dfebf6b9db29806be60e445102204d8": []
              },
              {
                "7dfebf6b9db29806be60e44510220438": {
                  "error": "deviceId不存在"
                }
              }
            ]
        }  
	}

## 7.7 获取设备控制数据列表（最多获取7天，每页最多100条）

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/getConfigDataLists

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|
|startDate	|是		|string	|开始时间，格式：yyyy-MM-dd|
|endDate	|否		|string	|结束时间，默认当前时间，格式：yyyy-MM-dd，开始时间与结束时间间隔不能大于7天|
|pageRows	|否		|number	|每页显示的行数(每页最多显示100行)|
|pageUpOrDown	|否		|number	|查询上一页还是下一页(0-上一页 1-下一页,默认下一页)|
|rowDate	|否		|string	|row时间,格式:deciceID:timestamp,首次查询为NULL(查询上一页传第一条数据的rowDate,查询下一页传最后一条数据的rowDate,多个rowDate用英文逗号隔开) |


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其控制数据列表)

	{
    code: 0,
    data: {
        "list": [
              {
                "7dfebf6b9db29806be60e445102204d8": [
                  {
                    "control": "1",
                    "ctram": "0",
                    "rowkey": "2a54a1c-1715-23384186-20170929005806000",
                    "dataTimeStamp": "1506617886387",
                    "_source": "1",
                    "reserved": "00",
                    "timestamp": 1511871229382,
                    "reserved4": "00",
                    "updateFlag": "0000",
                    "reserved2": "00",
                    "reserved3": "00",
                    "_status": "4"
                  },
                  {
                    "control": "3",
                    "ctram": "0",
                    "rowkey": "2a54a1c-1715-23384186-20170928100613000",
                    "dataTimeStamp": "1506564373253",
                    "_source": "1",
                    "reserved": "40",
                    "timestamp": 1511871229382,
                    "reserved4": "10",
                    "updateFlag": "0001",
                    "reserved2": "12",
                    "reserved3": "06",
                    "_status": "4"
                  }
                ]
              },
              {
                "7dfebf6b9db29806be60e44510220438": {
                  "error": "deviceId不存在"
                }
              }
            ]
        }  
	}

## 7.8 获取设备配置数据列表（最多获取7天，每页最多100条）

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/getConfigurationDataLists

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|string	|访问凭证|
|timestamp	|是		|number	|时间戳|
|deviceIds	|是		|string	|设备标识（多个设备用英文逗号隔开，最多支持20个）|
|startDate	|是		|string	|开始时间，格式：yyyy-MM-dd|
|endDate	|否		|string	|结束时间，默认当前时间，格式：yyyy-MM-dd，开始时间与结束时间间隔不能大于7天|
|pageRows	|否		|number	|每页显示的行数(每页最多显示100行)|
|pageUpOrDown	|否		|number	|查询上一页还是下一页(0-上一页 1-下一页,默认下一页)|
|rowDate	|否		|number	|row时间,格式:deciceID:timestamp,首次查询为NULL(查询上一页传第一条数据的rowDate,查询下一页传最后一条数据的rowDate,多个rowDate用英文逗号隔开) |


**返回结果**

正确的Json返回结果：(ps:data里包括设备ID及其配置数据列表)

	{
    code: 0,
    data: {
        "list": [
              {
                "7dfebf6b9db29806be60e445102204d8": []
              },
              {
                "7dfebf6b9db29806be60e44510220438": {
                  "error": "deviceId不存在"
                }
              }
            ]
        }  
	}

## 7.9 下发设备控制数据

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/single/set

	ps:需要通知CLIFE云添加应用标识白名单

**参数说明**

|参数名称		|是否必须		|字段类型	|参数说明|
|:-----     |:-----     |:----- |:----- |
|appId		|是			|string	|应用标识|
|accessToken|	是		|string	|访问凭证|
|timestamp	|是			|number	|时间戳|
|deviceId	|是			|string	|设备标识|
|json		|是			|string	|设备控制JSON|
|sign		|是			|string	|签名|

**返回结果**

正确的Json返回结果：

	{"code":0}

## 7.10 批量下发控制命令

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/set

	ps:需要通知CLIFE云添加应用标识白名单

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----     |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|是		|string	|接口调用凭证|
|timestamp	|是		|number	|时间戳|
|json		|是		|string	|设备控制JSON|
|deviceIds	|是		|string	|设备标识列表(deviceId之间以逗号间隔)|


**返回结果**

正确的Json返回结果：

	返回流水批次号
	
	{
    	"code": 0,
    	"data": "152017032818000000025"
	}


## 7.11 广播下发控制命令

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/broadcast

**参数说明**

|参数名称|是否必须	|字段类型	|参数说明|
|:----- |:----- |:----- |:----- |
|appId|是	|string|应用标识|
|accessToken|是|string	|接口调用凭证|
|timestamp|是	|number|时间戳|
|json	|是	|string|设备控制JSON|
|productId|是	|int|产品标识|


**返回结果**

正确的Json返回结果：

	返回流水批次号
	
	{
    	"code": 0,
    	"data": "152017032818000000025"
	}

## 7.12 获取控制命令执行结果

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/getPushReprot

**参数说明**

|参数名称			|是否必须	|字段类型	|参数说明|
|:-----         |:----- |:----- |:----- |
|appId			|是		|string	|应用标识|
|accessToken	|是		|string	|接口调用凭证|
|timestamp		|是		|number	|时间戳|
|batchSendNo	|是		|string	|流水批次号|

**返回结果**

正确的Json返回结果：

	如果没有data节点，表明处理结果还没生成。
	
	{
	    "batch_send_no":"152017032818000000025",
	    "online_num":3,
	    "offline_num":2,
	    "illegal_num":1,
	    "online_success_num":2,
	    "online_fail_num":1,
	    "detailResult":{
	        "batchSendOnlineResult":{
	            "send_success":[
	                "EE91A91EEE12BF98EB4E4040C438FC9D","EE91A91EEE12BF98EB4E4040C438FC1D"
	            ],
	            "send_fail":[
	                "EE91A91EEE12BF98EB4E4040C438FC2D"
	            ]
	        },
	        "offline_info":[
	            "EE91A91EEE12BF98EB4E4040C438FC3D","EE91A91EEE12BF98EB4E4040C438FC4D"
	        ],
	        "illegal_info":[
	            "EE91A91EEE12BF98EB4E4040C438FC5D"
	        ]
	    }
	}

|字段名称					|字段类型			|字段说明|
|:-----                 |:-----         |:----- |
|batch\_send_no         |string			|流水批次号|
|online_num				|int			|在线数|
|offline_num			|int			|离线数|
|online\_success_num		|int			|在线设备推送成功|
|online\_fail_num		|int			|在线设备推送失败|
|illegal_num			|int			|无效设备数(广播接口无此属性)|
|detailResult			|				|推送结果详情(广播接口无此属性)|
|batchSendOnlineResult	|				|在线推送详情|
|send_success			|数组			|推送成功MAC列表|
|send_fail				|数组			|推送失败MAC列表|
|offline_info			|数组			|离线MAC列表|
|illegal_info			|数组			|无效MAC列表|

# 8. PUSH设备数据接口

## 8.1 查询推送失败的设备数据

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/devicepush/getPushFailData

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----        |:----- |:----- |:----- |
|appId		|是		|string	|应用标识|
|accessToken|	是	|	string|接口调用凭证|
|timestamp	|是		|number	|时间戳|
|productId	|是		|number	|产品标识|
|quaryDate	|否		|string	|查询天数（默认为7天，最多30天）|
|pageRows	|否		|number	|每页显示的行数（默认为20）|
|pageIndex	|否		|number	|当前页|

**返回结果**

正确的Json返回结果：

	{
		"code":0,
		"data":{
			"list":[{
				"productId":58,
				"content":"{...}"
			}],
			"pager":{
				"totalRows":2,
				"pageRows":10,
				"pageIndex":1,
				"paged":false,
				"pageStartRow":0,
				"pageEndRow":9,
				"hasPrevPage":false,
				"hasNextPage":false,
				"defaultPageRows":20,
				"totalPages":1,
				"currPageRows":2
			}
		}
	}

|字段名称				|字段类型			|字段说明|
|:-----             |:-----         |:----- |
|productId			|int			|产品ID|
|content			|	string		|失败消息内容，格式详情请看下面说明|


**推送数据格式说明**

   推送服务的POST数据示例如下：

	{
		"msgId":"000ad405-e7c4-44a7-84fd-f55f1d653efd",
		"list":[{
					"timestamp":1490858478589,
					"dataType":3,
					"data":{
								"authUserId":"7F74CC9DFEC3047685DAD6E48F142C4B",
								"breathRate":0,
								"activityEnergy":0,
								"source":3,
								"hasAnybody":0,
								"heartRate":0,
								"userId":"7F74CC9DFEC3047685DAD6E48F142C4B",
								"linkStatus":1,
								"timeZone":480,
								"turnOverTimes":0,
								"dataTime":1490858473434,
								"batteryPower":39
					},
					"mac":"405EE110006B"
			},
			{
					"timestamp":1490858478589,
					"dataType":3,
					"data":{
								"authUserId":"7F74CC9DFEC3047685DAD6E48F142C4B",
								"breathRate":0,
								"activityEnergy":1,
								"source":3,
								"hasAnybody":0,
								"heartRate":0,
								"userId":"7F74CC9DFEC3047685DAD6E48F142C4B",
								"linkStatus":1,
								"timeZone":480,
								"turnOverTimes":0,
								"dataTime":1490858473434,
								"batteryPower":39
					},
					"mac":"405EE110006B"
			}]
	}

|字段名称		|字段类型	|字段说明|
|:-----     |:-----       |:----- |
|msgId		|string	|消息标识|
|list		|数组	|设备数据列表|
|mac		|	string|设备MAC|
|dataType	|int	|数据类型 2-控制数据 3-运行数据 4-故障数据|
|timestamp	|date	|时间戳，数据生成时间|
|data		|		|设备数据区|
|authUserId	|string	|设备协议属性|
|breathRate	|int	|设备协议属性|
|...		|	...	|设备协议属性|



# 9. 第三方授权相关接口

## 9.1 第三方云请求C-Life云验证授权码

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/checkAuth

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----        |:----- |:----- |:----- |
|appId		|是		|number	|应用标识|
|appSecret	|是		|string	|应用密钥AppSecret，在C-Life开放平台提交应用审核通过后获得|
|authorizationCode|是		|string	|第一步得到的授权码，用于获取随机码|
|accessToken|	是	|string  |访问凭证|
|timestamp	|是		|number	|时间戳|


**返回结果**

正确的Json返回结果：

	{
	 "code":0,
	 "data":
			{
			  "randomCode":"b7573dbadfe84ba2b3659d1e49f8bf08"
			}
	}
	
	
|字段名称		|字段类型	|字段说明|
|:-----     |:----- |:----- |
|randomCode	|string	|随机码|


# 10. C-Life云提供服务接口

## 10.1 豆果菜谱推荐

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/douguo/recommend

**参数说明**

|参数名称		|是否必须	|字段类型	|参数说明|
|:-----        |:----- |:----- |:----- |
|gender		|是		|number	|性别（1-男 2-女）|
|height	|是		|string	|身高（cm）|
|weight|是		|string	|体重（kg）|
|diets|是		|string	|忌口（多个字段以","分割）|
|diseases|是		|string	|疾病（多个字段以","分割）|
|appid|是		|string	|应用标识|
|accessToken|	是	|string  |访问凭证|
|timestamp	|是		|number	|时间戳|


**返回结果**

正确的Json返回结果：

	{
	"code": 0,
	"message": "",
	"data": {
	    "breakfast_nutritions": {
	        "energy": "651.21大卡",
	        "carbohydrate": "423.29克",
	        "fat": "162.8克",
	        "protein": "65.12克",
	        "vitamine": "77.22毫克",
	        "water": "660.0毫升",
	        "mineral": "1752.03毫克"
	    },
	    "lunch_nutritions": {
	        "energy": "868.29大卡",
	        "carbohydrate": "564.39克",
	        "fat": "217.07克",
	        "protein": "86.83克",
	        "vitamine": "102.96毫克",
	        "water": "880.0毫升",
	        "mineral": "2336.04毫克"
	    },
	    "dinner_nutritions": {
	        "energy": "651.21大卡",
	        "carbohydrate": "423.29克",
	        "fat": "162.8克",
	        "protein": "65.12克",
	        "vitamine": "77.22毫克",
	        "water": "660.0毫升",
	        "mineral": "1752.03毫克"
	    },
	    "dish_tags": [],
	    "dishs": [
	        {
	            "breakfast": [
	                {
	                    "日式美乃滋三文鱼盖饭": {
	                        "cook_id": "1606758",
	                        "tags": "高胆固醇,高血脂,增强记忆力,补肾,海鲜,炒,辣,主食,炒锅,锅具,早餐,午餐,晚餐,一人食,一家三口,腥膻,辣椒粉,料酒,三文鱼,米饭,豌豆尖,色拉油,蛋黄酱",
	                        "majors": "三文鱼:150g,米饭:1碗,洋葱（小）:1个,豆苗:30g,色拉油:1汤匙,料酒:1大勺,日式酱油:0.5大勺,辣椒粉:15g,美乃滋:20g",
	                        "suggested_usage": "137.0g"
	                    },
	                    "煮鸡酒": {
	                        "cook_id": "1622287",
	                        "tags": "一家三口,一人食,晚餐,午餐,早餐,锅具,煮锅,小吃,中国菜,煮,咸,无水印,鸡血,母鸡,姜,黄酒",
	                        "majors": "母鸡:半只,鸡血:2块,姜:3大块,客家黄酒:半瓶",
	                        "suggested_usage": "163.0g"
	                    },
	                    "西蓝花土豆培根浓汤": {
	                        "cook_id": "1648514",
	                        "tags": "无水印,香,煮,搅拌,汤,破壁机,料理机,电器,午餐,早餐,晚餐,一人食,培根,西兰花,土豆,食用油,盐",
	                        "majors": "培根:100g,西蓝花:250g,土豆:100g,食用油:少许,盐:少许",
	                        "suggested_usage": "110.0g"
	                    }
	                },
	                {
	                    "清明时节，带一份艾草青团出去踏青。": {
	                        "cook_id": "1532292",
	                        "tags": "无水印,汆,炒,蒸,咸,小吃,主食,炒锅,锅具,蒸锅,煮锅,料理机,电器,早餐,下午茶,午餐,晚餐,一人食,二人世界,一家三口,粘米粉,糯米粉,艾草,春笋,植物油,盐,酱油,红尖椒,草菇,雪菜,小苏打,猪肉馅",
	                        "majors": "艾草:1盆,糯米粉:200克,粘米粉:100克,春笋:1个,肉馅:500克,植物油:适量,小苏打:少许,红尖椒:少许,草菇:少许,雪菜:少许,食盐:适量,酱油:少许",
	                        "suggested_usage": "138.0g"
	                    },
	                    "石榴特饮": {
	                        "cook_id": "1609898",
	                        "tags": "榨汁,甜,香,饮品,原汁机,榨汁机,电器,早餐,午餐,下午茶,晚餐,一人食,一家三口,石榴,雪碧,薄荷",
	                        "majors": "石榴:一个,雪碧:180g,冰块、:少许,薄荷:少许",
	                        "suggested_usage": "103.0g"
	                    },
	                    "花生芝麻糊": {
	                        "cook_id": "1536378",
	                        "tags": "补硒,一家三口,养发,无水印,甜,香,搅拌,小吃,破壁机,料理机,电器,早餐,下午茶,夜宵,一人食,黑芝麻,花生,牛奶,清水,淀粉,白砂糖",
	                        "majors": "黑芝麻:100克,花生:200克,纯牛奶:100毫升,砂糖:100克,清水:900毫升,淀粉:3克",
	                        "suggested_usage": "153.0g"
	                    }
	                },
	                {
	                    "五分钟搞定金灿灿的炒馒头丁": {
	                        "cook_id": "1548354",
	                        "tags": "无水印,咸,家常味,炒,馒头,主食,炒锅,锅具,早餐,夜宵,一人食,一家三口,馒头,鸡蛋",
	                        "majors": "馒头:一个,鸡蛋:个到两个,速冻蔬菜:一小碗",
	                        "suggested_usage": "123.0g"
	                    },
	                    "一秒钟吸引宝宝，五分钟吃完，再也不用追着喂饭了！": {
	                        "cook_id": "1629709",
	                        "tags": "无水印,甜,香,煎,蒸,凹造型,宝宝辅食,蒸锅,锅具,煎锅,早餐,午餐,晚餐,一人食,婴幼儿,鸡蛋,紫薯,香芋,中筋面粉",
	                        "majors": "鸡蛋:1个,紫薯:1个,香芋:50克,中筋面粉:5克",
	                        "suggested_usage": "121.0g"
	                    },
	                    "纯甄黄豆浆": {
	                        "cook_id": "1562416",
	                        "tags": "健脾养胃,搅拌,甜,饮品,豆制饮品,豆浆机,电器,早餐,秋冬进补,糖尿病,高血压,高血脂,大豆,清水,白砂糖",
	                        "majors": "黄豆:70克,清水:适量,白糖适量:",
	                        "suggested_usage": "145.0g"
	                    }
	                }
	            ],
	            "lunch": [
	                {
	                    "夏至开胃凉面": {
	                        "cook_id": "1568411",
	                        "tags": "咸,辣,煮,凉面,面条,主食,炒锅,锅具,午餐,晚餐,一人食,一家三口,盐,鸡精,香醋,蚝油,味极鲜,黄瓜,腐乳,芝麻酱,香菜,蒜,油泼辣子,白砂糖,温水,橄榄油,鸡肉,面条",
	                        "majors": "高筋挂面:100g,芝麻酱:2勺,腐乳:1块,黄瓜:1根,鸡肉（腿肉或胸肉）:100g,味极鲜酱油:2勺,蚝油:1勺,香醋:1勺,鸡精:适量,盐:适量,橄榄油（麻油）:1勺,香菜:1颗,蒜:3瓣,油泼辣子:适量,白糖:适量,温水:适量",
	                        "suggested_usage": "132.0g"
	                    },
	                    "干煸土豆丝": {
	                        "cook_id": "1570946",
	                        "tags": "一人食,夜宵,晚餐,午餐,锅具,炒锅,热菜,素菜,下酒菜,家常菜,下饭菜,煸,炸,炒,家常味,香,辣,咸,一家三口,华北地区,食用油,白砂糖,葱花,土豆,葱姜蒜,花椒,干辣椒,胡椒盐",
	                        "majors": "土豆:2个,蒜蓉，姜末:适量,花椒，干红辣椒:适量,葱花:适量,椒盐:适量,白糖:适量,食用油:适量",
	                        "suggested_usage": "119.0g"
	                    },
	                    "法式吐司": {
	                        "cook_id": "1565864",
	                        "tags": "烘焙,面包,下午茶,午餐,锅具,不粘锅,西点,香,奶香味,甜,吐司,煎,无水印,一人食,一家三口,法国菜,外国菜,法棍,全脂牛奶,鸡蛋",
	                        "majors": "过夜法棍:1/2根,鸡蛋:2个,全脂牛奶:300毫升,黄油，无盐:30克",
	                        "suggested_usage": "110.0g"
	                    }
	                },
	                {
	                    "日式咖喱鸡腿饭": {
	                        "cook_id": "1582171",
	                        "tags": "炒锅,饭,主食,炖,焯,炒,咖喱味,辛辣,咸,无水印,锅具,午餐,晚餐,一人食,一家三口,花椒,干辣椒,米饭,料酒,红葱头,蒜,老姜,葱姜蒜,胡萝卜,土豆,鸡腿,咖喱",
	                        "majors": "鸡腿:2只,土豆:250g,胡萝卜:120g,固体咖喱1块:30g,葱:2根,老姜:1块,大蒜:4瓣,红葱头:4粒,料酒:适量,花椒:适量,干辣椒:2根,米饭:2碗,香松（装饰用）:适量,香菜（装饰用）:适量",
	                        "suggested_usage": "205.0g"
	                    },
	                    "三文鱼肠西兰花": {
	                        "cook_id": "1638827",
	                        "tags": "甲亢,干眼症,夜盲症,痤疮,亲友聚餐,一家三口,一人食,夜宵,晚餐,午餐,锅具,炒锅,热菜,荤菜,海鲜,咸鲜,咸,清淡,炒,鱼肠,蒜,鸡精,盐,西兰花",
	                        "majors": "三文鱼肠:200克,西兰花:200克,盐:,鸡精:,蒜碎:",
	                        "suggested_usage": "210.0g"
	                    },
	                    "烤肉串": {
	                        "cook_id": "1577750",
	                        "tags": "香,酱香味,孜然味,腌,炸,下饭菜,下酒菜,空气炸锅,电器,午餐,晚餐,一人食,一家三口,夜宵,烧烤,五花肉,烤肉酱,红椒,黄椒,孜然",
	                        "majors": "五花肉:500g,红灯笼椒:1个,黄灯笼椒:1个,烤肉酱:1大勺,孜然粉:适量",
	                        "suggested_usage": "208.0g"
	                    }
	                },
	                {
	                    "自制肯德基鸡肉卷": {
	                        "cook_id": "1581562",
	                        "tags": "无水印,烙,炸,腌,甜,咸,主食,炒锅,锅具,午餐,晚餐,一人食,一家三口,甜面酱,沙拉酱,淀粉,面粉,生菜,大葱,黄瓜,胡萝卜,鸡蛋,鸡腿,糖,胡椒",
	                        "majors": "鸡腿:,鸡蛋:,胡萝卜:,黄瓜:,大葱:,生菜:,面粉:,淀粉:,胡椒粉:,沙拉酱:,甜面酱:,糖:",
	                        "suggested_usage": "179.0g"
	                    },
	                    "小白菜汆丸子": {
	                        "cook_id": "1610143",
	                        "tags": "东北地区,一家三口,一人食,晚餐,午餐,锅具,焖烧锅,焖烧罐,热菜,荤菜,家常菜,下饭菜,咸,香,焖,蛋清,小白菜,大葱,姜末,酱油,十三香,香油,玉米淀粉,猪肉馅",
	                        "majors": "小白菜:3根,肉馅:50g,葱末:2g,姜末:2g,酱油:一勺,十三香:1g,香油:2ml,玉米淀粉:2g,蛋清:20ml",
	                        "suggested_usage": "111.0g"
	                    },
	                    "凉拌木耳": {
	                        "cook_id": "1603840",
	                        "tags": "煮,酸,咸,下饭菜,家常菜,快手菜,下酒菜,素菜,凉菜,煮锅,锅具,午餐,晚餐,一人食,无水印,华北地区,一家三口,排毒养颜,补钙,便秘,干木耳,糖,葱花,橄榄油,盐,蒜头,陈醋",
	                        "majors": "干木耳:15克,蒜头:2粒,陈醋:3大匙,酱油:2大匙,橄榄油:2大匙,盐:2勺,糖:2勺,大蒜粉:1勺,葱花:少许",
	                        "suggested_usage": "148.0g"
	                    }
	                }
	            ],
	            "dinner": [
	                {
	                    "奶香玉米窝窝头": {
	                        "cook_id": "1632704",
	                        "tags": "晚餐,早餐,电器,电饭煲,主食,窝头,蒸,香,奶香味,甜,无水印,夜宵,一家三口,便秘,美容养颜,牛奶,面粉,玉米面,白砂糖",
	                        "majors": "玉米面:300g,白面:100g,纯牛奶:200ml,白砂糖:30g",
	                        "suggested_usage": "127.0g"
	                    },
	                    "山楂小排": {
	                        "cook_id": "1635591",
	                        "tags": "一人食,晚餐,午餐,锅具,炒锅,热菜,荤菜,下酒菜,下饭菜,炖,香,酸,无水印,消食,一家三口,猪小排,糖,山楂,料酒,蚝油,生抽",
	                        "majors": "猪肋排:500g,山楂:15个,葱姜:适量,熟白芝麻:少许,糖:70g,生抽:2勺,蚝油:1勺,料酒:1勺",
	                        "suggested_usage": "140.0g"
	                    },
	                    "酱汁焖锅": {
	                        "cook_id": "1566293",
	                        "tags": "无水印,甜,咸,香,豆瓣味,茄汁味,酸,蚝油味,煮,焯,爆,炒,焖,下饭菜,下酒菜,荤菜,热菜,宴客菜,电炖锅,电器,炒锅,锅具,午餐,晚餐,一人食,一家三口,鸡翅根,鸡翅中,鸡爪,虾,胡萝卜,玉米,洋葱,红椒,芹菜,荷兰豆,葱姜蒜,蒜,姜,生抽,老抽,白砂糖,蚝油,蒸鱼豉油,豆瓣酱,番茄酱",
	                        "majors": "鸡翅根:6个,鸡翅中:6个,鸡爪:12个,虾:10只,胡萝卜:1个,玉米:1个,圆葱:半个,红椒:1个,芹菜:1棵,荷兰豆:50克,葱:1棵,蒜:1头,姜:5片,番茄酱:1勺,豆瓣酱:1勺,蚝油:1勺,蒸鱼豉油:1勺,生抽:1勺,老抽:1勺,白糖:1勺",
	                        "suggested_usage": "153.0g"
	                    }
	                },
	                {
	                    "素菜豆腐饼": {
	                        "cook_id": "1645923",
	                        "tags": "家常味,煎,饼,主食,煎锅,锅具,早餐,午餐,晚餐,一人食,一家三口,土豆,鸡蛋,面粉,香菇,豆腐,西红柿",
	                        "majors": "豆腐:40g,香菇:1朵,面粉:25g,鸡蛋:1个,土豆:30g,番茄:1小瓣",
	                        "suggested_usage": "138.0g"
	                    },
	                    "塔吉锅生煎虾": {
	                        "cook_id": "1571110",
	                        "tags": "下饭菜,下酒菜,宴客菜,荤菜,热菜,塔吉锅,锅具,午餐,晚餐,夜宵,一人食,华北地区,海鲜,腥膻,亲友聚餐,一家三口,咸,香,煎,腌,家常菜,料酒,生粉,蛋清,盐,虾,葱姜蒜,韭菜,糖,油,蚝油,红椒,蒜蓉,蒜",
	                        "majors": "韭菜:一小把,葱:一小把,虾:500克,盐:适量,蛋清:一个,料酒:适量,生粉:适量,生蒜末:6瓣,熟蒜蓉:适量,耗油:适量,糖:适量,油:适量,红椒:少许",
	                        "suggested_usage": "192.0g"
	                    },
	                    "菠萝咕噜肉": {
	                        "cook_id": "1542108",
	                        "tags": "华南地区,一家三口,晚餐,午餐,锅具,炒锅,家常菜,下饭菜,咸,咸甜,炒,炸,爆,生抽,蒜,面粉,鸡蛋,菠萝,红椒,青椒,猪肉,番茄酱,料酒,醋,淀粉,盐,白砂糖",
	                        "majors": "猪肉:500克,青椒:1/4个,红椒:1/4个,菠萝:1/4个,鸡蛋:1个,面粉:适量,大蒜:2瓣,生抽:2勺,番茄酱:2勺,料酒:1勺,砂糖:4勺,醋:3勺,淀粉:适量,盐:适量",
	                        "suggested_usage": "193.0g"
	                    }
	                },
	                {
	                    "泰式海鲜炒饭": {
	                        "cook_id": "1602195",
	                        "tags": "泰国菜,外国菜,咸,黑胡椒味,辛辣,煎,汆,炒饭,饭,主食,炒锅,锅具,早餐,午餐,晚餐,一人食,一家三口,鱿鱼,扇贝,虾,胡萝卜,洋葱,鸡蛋,黄油,黑胡椒粉,盐,葱花,隔夜饭",
	                        "majors": "隔夜剩饭:300g,鱿鱼:100g,扇贝:5个,大虾:6只,胡萝卜:50克,洋葱:50克,鸡蛋:2个,黄油:适量,黑胡椒粉:适量,盐:适量,葱花:适量",
	                        "suggested_usage": "112.0g"
	                    },
	                    "猪腿排骨藕汤＃膳魔师北咸主题月＃": {
	                        "cook_id": "1618109",
	                        "tags": "咸,炖,湖北菜,中国菜,下饭菜,下酒菜,宴客菜,荤菜,热菜,炖锅,锅具,午餐,晚餐,一人食,一家三口,亲友聚餐,排骨,姜片,猪腿肉,莲藕,盐,胡椒,味精",
	                        "majors": "排骨:1500克,猪弯弯:两个,藕:2000克,姜片:适量,盐胡椒味精:适量",
	                        "suggested_usage": "129.0g"
	                    },
	                    "凉拌米豆腐": {
	                        "cook_id": "1540833",
	                        "tags": "延缓衰老,爆,炒,煮,酸,咸,家常菜,下饭菜,炒锅,锅具,晚餐,午餐,一家三口,西南地区,蚝油,香油,白醋,盐,糖,味极鲜,青椒,蒜瓣,豆腐",
	                        "majors": "米豆腐:300g,蒜瓣:4瓣,青椒:2个,盐:1小勺,糖:一点,味极鲜:1勺,耗油:半勺,香油:1小勺,白醋:一点",
	                        "suggested_usage": "120.0g"
	                    }
	                }
	            ]
	        },
			{...}
	    ]
	}
}
	
	
|字段名称		|字段类型	|字段说明|
|:-----     |:----- |:----- |
|breakfast_nutrition	|string	|早餐所需营养信息|
|lunch_nutritions	|string	|早餐所需营养信息|
|dinner_nutritions	|string	|晚餐所需营养信息|
|energy	|string	|热量|
|carbohydrate	|string	|碳水化合物|
|fat	|string	|脂肪|
|protein	|string	|蛋白质|
|vitamine	|string	|维生素|
|water	|string	|水|
|mineral	|string	|矿物质|
|dish_tags	|list	|根据疾病生成的菜谱标签|
|dishs	|list	|推荐的菜谱列表|
|breakfast	|string	|早餐菜谱|
|lunch	|string	|午餐菜谱|
|dinner	|string	|晚餐菜谱|
|cook_id	|string	|菜谱id|
|tags	|string	|菜谱标签|
|majors	|string	|菜谱主料|
|suggested_usage	|string	|建议用量|

