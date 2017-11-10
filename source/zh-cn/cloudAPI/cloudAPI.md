# C-Life 开放平台云接口 #
## <span id = "access_method">一、接入方式</span>

![](http://i.imgur.com/hZnRP42.png)

如上图所示，C-Life云支持第三方云通过API同步用户信息、设备信息，下发控制设备和主动PUSH设备数据；
	
**API**：开发者可以根据C-Life云的API来封装HTTPS请求进行调用。

**PUSH设备数据**：PUSH设备数据是C-Life云提供给第三方云的一种推送服务，让第三方云及时收集所属产品的设备数据，为后续的产品研发提供最可靠的数据支持。

## <span id="process">二、API调用流程</span>

**1.	开发者申请appId和appSecret**

	appId作为服务端向开发者发放的授权标识，调用所有接口时的必传参数，用于后台对接口调用的权限管理和调用频次限制。
	appSecret是服务端分配给开发者的密钥，主要用于请求签名加密之用，证明开发者的合法身份。

**2.	开发者在平台绑定调用接口的IP白名单**

	绑定开发者调用平台接口的服务器IP

**3.开发者调用TOKEN接口从平台拿到accessToken**
		
	accessToken是全局唯一接口调用凭据，调用各接口时都需使用accessToken，开发者需要进行妥善保存。
	accessToken的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的accessToken失效。

**4.	开发者使用accessToken参数调用其他业务接口**d

**5.	开发者提交timestamp参数的值为当前北京时间戳**

**6.API签名机制**

**步骤：**

	1. 将请求方法+请求地址+所有参数按照参数名的字母顺序升序排序后拼接+appSecret
	2. 将第1步的结果MD5后生成签名参数sign。

**说明：**

	1. 请求方法为GET或POST，注意大写。
	2. 请求地址为客户端请求完整地址，如：http://open.api.clife.cn/v1/data/get
	3. 参数拼接，按照参数名的字母顺序升序排序后进行拼接，如：accessToken=xxx&appId=xxx&name1=value1&name2=value2&
	4. 组成完整的拼接，如：GEThttp://open.api.clife.cn/v1/data/getaccessToken=xxx&appId=xxx&name1=value1&name2=value2&appSecret
	5. 生成MD5值，如：74B024F42F3075C4C06E4E8F22CA7A5F


----------

## 三、<span id="description">PUSH设备数据接入说明</span>

PUSH设备数据是C-Life云提供给第三方云的一种推送服务，让第三方云及时收集所属产品的设备数据，为后续的产品研发提供最可靠的数据支持。

当C-Life云推送服务发送设备数据给第三方云服务接口时，会产生一个POST请求，第三方云服务接口需要在响应包(GET)中返回特定JSON结构，来对该推送进行响应。

C-Life云推送服务在将设备数据发给第三方云的推送服务器地址(开放平台产品接入的接入方案处配置)后，C-Life云推送服务在三秒内收不到响应会断掉连接，并且重新发起请求，总共重试三次。关于重试的设备数据排重，使用msgId进行排重。

假如第三方云服务器无法保证在三秒内处理并回复，必须做出下述回复，这样C-Life云推送服务才不会对此作任何处理，并且不会发起重试，否则，将出现第三方云服务接口被锁定的情况。详见下面说明：

	1、第三方云服务接口验证阶段（html包体没设备数据）时，直接回复{"code":0,data:token字符串}。
	2、第三方云服务接口接收推送服务（html包体有设备数据）时，直接回复{"code":0,data:msgId字符串}。

### **接入方案配置**

第三方云可以到C-Life开放平台的产品接入中的接入方案处进行配置。

**流程如下：**

	1)选择第三方云连接C-Life硬件云通道(设备连接第三方云服务器后，可通过设备openAPI与C-Life硬件云对接)
	2)填写URL和Token
    		URL:第三方云务接口的惟一标识，供C-Life云推送服务给第三方云推送数据用的。（现在仅支持http方式）
    		Token:第三方云服务接口在和C-Life云推送服务的凭证，用来验证厂商服务接口的合法性。

**请注意：**

	第三方云在接入方案配置前，请确保第三方云服务接口能够正常运行。当接入方案配置完成时，
	C-Life云即向第三方云服务接口URL发送一个空请求，
	第三方云服务接口此时就能返回规定的JSON字符串响应({"code":0,data:Token字符串}，
	Token字符串即为页面上所填写的Token内容), 否则C-Life云会发起重试机制。

###  **查询推送失败的设备数据**

第三方云发现推送设备数据有缺失的话，可以调用此接口获取产品的推送失败的设备数据。C-Life云会保留30天的推送失败的设备数据。

推送数据失败有下述原因：

	1)推送时第三方云服务接口出现问题;
	2)第三方云服务接口没有返回规定的JSON字符串响应；({"code":0,data:msgId字符串},msgId为推送设备数据的惟一标识，第三方云服务接口原样返回即可)
	3)第三方云服务处理业务超时没返回响应；(推送请求超时时间为三秒)
	4)第三方云服务接口返回的msgId与和C-Life云推送服务发送的msgId不一致。

----------

## <span id="variable">四、变量说明</span>


## 4.1 全局返回码
	
**全局返回码说明**

	每次调用接口时，可能获得正确或错误的返回码，可以根据返回码信息调试接口，排查错误。

**全局返回码说明如下：**

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">返回码</th>
			<th width="84%">说明</th>
		</tr>
		<tr>
			<td>0</td>
			<td>请求成功</td>
		</tr>
		<tr>
			<td>100010100</td>
			<td>缺少授权信息</td>
		</tr>
		<tr>
			<td>100010101</td>
			<td>AccessToken错误或已过期</td>
		</tr>
		<tr>
			<td>100010103</td>
			<td>AppId不合法</td>
		</tr>
		<tr>
			<td>100010104</td>
			<td>timestamp过期</td>
		</tr>
		<tr>
			<td>100010105</td>
			<td>签名错误</td>
		</tr>
		<tr>
			<td>100010111</td>
			<td>timestamp不合法</td>
		</tr>
		<tr>
			<td>100010200</td>
			<td>失败</td>
		</tr>
		<tr>
			<td>100010201</td>
			<td>缺少参数</td>
		</tr>
		<tr>
			<td>100010202</td>
			<td>参数错误</td>
		</tr>
</table>

----------

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

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">基础信息</th>
			<th width="11%">字段类型</th>
			<th width="62%">字段说明</th>
		</tr>
		<tr>
			<td>pageIndex</td>
			<td>是</td>
			<td>number</td>
			<td>请求的页（从1开始），不设则默认为1</td>
		</tr>
		<tr>
			<td>pageRows</td>
			<td>是</td>
			<td>number</td>
			<td>请求的每页行数，不设则默认为defaultPageRows</td>
		</tr>
		<tr>
			<td>totalRows</td>
			<td>否</td>
			<td>string</td>
			<td>总行数</td>
		</tr>
		<tr>
			<td>totalPages</td>
			<td>否</td>
			<td>number</td>
			<td>总页数</td>
		</tr>
		<tr>
			<td>defaultPageRows</td>
			<td>是</td>
			<td>number</td>
			<td>默认每页行数：20</td>
		</tr>
		<tr>
			<td>currPageRows</td>
			<td>否</td>
			<td>number</td>
			<td>当前页的实际行数</td>
		</tr>
		<tr>
			<td>pageStartRow</td>
			<td>是</td>
			<td>number</td>
			<td>当前页的起始行（从0开始，有可能超出总行数）</td>
		</tr>
		<tr>
			<td>pageEndRow</td>
			<td>是</td>
			<td>number</td>
			<td>当前页的结束行（从0开始，有可能超出总行数）</td>
		</tr>
		<tr>
			<td>hasPrevPage</td>
			<td>否</td>
			<td>boolean</td>
			<td>是否有前一页</td>
		</tr>
		<tr>
			<td>hasNextPage</td>
			<td>否</td>
			<td>boolean</td>
			<td>是否有后一页</td>
		</tr>
	</tbody>
</table>

----------

## 4.3 全局变量说明


<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段</th>
			<th width="84%">说明</th>
		</tr>
		<tr>
			<td>deiveId</td>
			<td>加密后的设备标识</td>
		</tr>
		<tr>
			<td>openId</td>
			<td>加密后的开放账号标识</td>
		</tr>
</table>

----------

## <span id="accessToken">五、访问凭证接口</span>

### 1、获取接口访问凭证

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/token

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
			<td>appSecret</td>
			<td>是</td>
			<td>string</td>
			<td>凭证密钥</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
	</tbody>
</table>

**返回结果**

正确的Json返回结果：

	{
		"data": {
			"accessToken": "677c11e05aac4c85b6442ba99c6653a1",
			"expiresIn": 28800
		},
		"code": 0
	}

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>accessToken</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>expiresIn</td>
			<td>string</td>
			<td>accessToken接口调用凭证超时时间，单位（秒）</td>
		</tr>
	</tbody>
</table>

## <span id="user">六、用户相关接口</span>

### 1、获取用户基本信息

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/get

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>openId</td>
			<td>是</td>
			<td>string</td>
			<td>openId（APP SDK里OAuth授权后返回的openId）</td>
		</tr>
	</tbody>
</table>

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

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>userName</td>
			<td>string</td>
			<td>用户名称</td>
		</tr>
		<tr>
			<td>sex</td>
			<td>number</td>
			<td>性别（1-男，2-女）</td>
		</tr>
		<tr>
			<td>birthday</td>
			<td>string</td>
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
			<td>string</td>
			<td>头像URL</td>
		</tr>
		<tr>
			<td>city</td>
			<td>string</td>
			<td>用户所在城市</td>
		</tr>
		<tr>
			<td>regTime</td>
			<td>string</td>
			<td>用户注册时间</td>
		</tr>
	</tbody>
</table>

----------

### 2、获取用户列表

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/list

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>pageRows</td>
			<td>否</td>
			<td>number</td>
			<td>每页显示的行数（默认为20,最大为1000）</td>
		</tr>
		<tr>
			<td>pageIndex</td>
			<td>否</td>
			<td>number</td>
			<td>当前页</td>
		</tr>
	</tbody>
</table>

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

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>list</td>
			<td>数组</td>
			<td>开放账号标识列表</td>
		</tr>
	</tbody>
</table>

----------
### 3、获取用户设备信息

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/device/list

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>openId</td>
			<td>是</td>
			<td>string</td>
			<td>openId</td>
		</tr>
	</tbody>
</table>

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
			<td>deviceName</td>
			<td>string</td>
			<td>设备名称</td>
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
			<td>deviceCode</td>
			<td>string</td>
			<td>设备编码</td>
		</tr>
	</tbody>
</table>

----------

## <span id="device">七、设备相关接口</span>

### 1、下发设备控制数据

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/single/set

	ps:需要通知CLIFE云添加应用标识白名单

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
			<td>deviceId</td>
			<td>是</td>
			<td>string</td>
			<td>设备标识</td>
		</tr>
		<tr>
			<td>json</td>
			<td>是</td>
			<td>string</td>
			<td>设备控制JSON</td>
		</tr>
		<tr>
			<td>sign</td>
			<td>是</td>
			<td>string</td>
			<td>签名</td>
		</tr>
	</tbody>
</table>

**返回结果**

正确的Json返回结果：

	{"code":0}

----------

### 2、获取设备最新控制数据

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/config/get

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
			<td>deviceIds</td>
			<td>是</td>
			<td>string</td>
			<td>设备标识（多个设备用英文逗号隔开，最多支持20个）</td>
		</tr>
	</tbody>
</table>

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


----------

### 3、获取设备最新运行数据

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/get

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
			<td>deviceIds</td>
			<td>是</td>
			<td>string</td>
			<td>设备标识（多个设备用英文逗号隔开，最多支持20个）</td>
		</tr>
	</tbody>
</table>

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


----------

### 4、获取设备最新故障信息

**接口调用请求说明**

	http请求方式: GET
	https://open.api.clife.cn/v1/cloud/device/data/getErrorData

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
			<td>deviceIds</td>
			<td>是</td>
			<td>string</td>
			<td>设备标识（多个设备用英文逗号隔开，最多支持20个）</td>
		</tr>
	</tbody>
</table>

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

-------------------

### 5、批量下发控制命令

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/set

	ps:需要通知CLIFE云添加应用标识白名单

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>json</td>
			<td>是</td>
			<td>string</td>
			<td>设备控制JSON</td>
		</tr>
		<tr>
			<td>deviceIds</td>
			<td>是</td>
			<td>string</td>
			<td>设备标识列表(deviceId之间以逗号间隔)</td>
		</tr>
	</tbody>
</table>

**返回结果**

正确的Json返回结果：

	返回流水批次号
	
	{
    	"code": 0,
    	"data": "152017032818000000025"
	}

### 6、获取控制命令执行结果

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/getPushReprot

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>batchSendNo</td>
			<td>是</td>
			<td>string</td>
			<td>流水批次号</td>
		</tr>
	</tbody>
</table>

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

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>batch_send_no</td>
			<td>string</td>
			<td>流水批次号</td>
		</tr>
		<tr>
			<td>online_num</td>
			<td>int</td>
			<td>在线数</td>
		</tr>
		<tr>
			<td>offline_num</td>
			<td>int</td>
			<td>离线数</td>
		</tr>	
		<tr>
			<td>online_success_num</td>
			<td>int</td>
			<td>在线设备推送成功数</td>
		</tr>
		<tr>
			<td>online_fail_num</td>
			<td>int</td>
			<td>在线设备推送失败数</td>
		</tr>
		<tr>
			<td>illegal_num</td>
			<td>int</td>
			<td>无效设备数(广播接口无此属性)</td>
		</tr>
		<tr>
			<td>detailResult</td>
			<td></td>
			<td>推送结果详情(广播接口无此属性)</td>
		</tr>
		<tr>
			<td>batchSendOnlineResult</td>
			<td></td>
			<td>在线推送详情</td>
		</tr>
		<tr>
			<td>send_success</td>
			<td>数组</td>
			<td>推送成功MAC列表</td>
		</tr>
		<tr>
			<td>send_fail</td>
			<td>数组</td>
			<td>推送失败MAC列表</td>
		</tr>
		<tr>
			<td>offline_info</td>
			<td>数组</td>
			<td>离线MAC列表</td>
		</tr>
		<tr>
			<td>illegal_info</td>
			<td>数组</td>
			<td>无效MAC列表</td>
		</tr>
	</tbody>
</table>

### 7、广播下发控制命令

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/device/config/broadcast

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>json</td>
			<td>是</td>
			<td>string</td>
			<td>设备控制JSON</td>
		</tr>
		<tr>
			<td>productId</td>
			<td>是</td>
			<td>int</td>
			<td>产品标识</td>
		</tr>
	</tbody>
</table>

**返回结果**

正确的Json返回结果：

	返回流水批次号
	
	{
    	"code": 0,
    	"data": "152017032818000000025"
	}

## <span id="push">八、PUSH设备数据接口</span>

### 1、查询推送失败的设备数据

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/devicepush/getPushFailData

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
			<td>accessToken</td>
			<td>是</td>
			<td>string</td>
			<td>接口调用凭证</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>是</td>
			<td>number</td>
			<td>时间戳</td>
		</tr>
		<tr>
			<td>productId</td>
			<td>是</td>
			<td>number</td>
			<td>产品标识</td>
		</tr>
		<tr>
			<td>quaryDate</td>
			<td>否</td>
			<td>string</td>
			<td>查询天数（默认为7天，最多30天）</td>
		</tr>
		<tr>
			<td>pageRows</td>
			<td>否</td>
			<td>number</td>
			<td>每页显示的行数（默认为20）</td>
		</tr>
		<tr>
			<td>pageIndex</td>
			<td>否</td>
			<td>number</td>
			<td>当前页</td>
		</tr>
	</tbody>
</table>

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

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>productId</td>
			<td>int</td>
			<td>产品ID</td>
		</tr>
		<tr>
			<td>content</td>
			<td>string</td>
			<td>失败消息内容，格式详情请看下面说明</td>
		</tr>
	</tbody>
</table>

### **推送数据格式说明**
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

<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>msgId</td>
			<td>string</td>
			<td>消息标识</td>
		</tr>
		<tr>
			<td>list</td>
			<td>数组</td>
			<td>设备数据列表</td>
		</tr>
		<tr>
			<td>mac</td>
			<td>string</td>
			<td>设备MAC</td>
		</tr>
		<tr>
			<td>dataType</td>
			<td>int</td>
			<td>
				数据类型 2-控制数据 3-运行数据 4-故障数据
			</td>
		</tr>
		<tr>
			<td>timestamp</td>
			<td>date</td>
			<td>时间戳，数据生成时间</td>
		</tr>
		<tr>
			<td>data</td>
			<td></td>
			<td>设备数据区</td>
		</tr>
		<tr>
			<td>authUserId</td>
			<td>string</td>
			<td>设备协议属性</td>
		</tr>
		<tr>
			<td>breathRate</td>
			<td>int</td>
			<td>设备协议属性</td>
		</tr>
		<tr>
			<td>...</td>
			<td>...</td>
			<td>设备协议属性</td>
		</tr>
	</tbody>
</table>

----------

## <span id="authorization">九、第三方授权相关接口</span>

### 1、第三方云请求CLife云验证授权码

**接口调用请求说明**

	http请求方式: POST
	https://open.api.clife.cn/v1/cloud/user/checkAuth

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
			<td>number</td>
			<td>应用标识</td>
		</tr>
		<tr>
			<td>appSecret</td>
			<td>是</td>
			<td>string</td>
			<td>应用密钥AppSecret，在C-Life开放平台提交应用审核通过后获得</td>
		</tr>
		<tr>
			<td>authorizationCode</td>
			<td>是</td>
			<td>string</td>
			<td>第一步得到的授权码，用于获取随机码</td>
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
	</tbody>
</table>

**返回结果**

正确的Json返回结果：

	{
	 "code":0,
	 "data":
			{
			  "randomCode":"b7573dbadfe84ba2b3659d1e49f8bf08"
			}
	}
	
<table width="100%" style="border-spacing: 0;  border-collapse: collapse;">
	<tbody>
		<tr>
			<th width="16%">字段名称</th>
			<th width="11%">字段类型</th>
			<th width="74%">字段说明</th>
		</tr>
		<tr>
			<td>randomCode</td>
			<td>string</td>
			<td>随机码</td>
		</tr>
	</tbody>
</table>
	

----------