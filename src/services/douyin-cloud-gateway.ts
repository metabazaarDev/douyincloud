import axios from "axios";

/**
 * https://developer.open-douyin.com/docs/resource/zh-CN/developer/tools/cloud/develop-guide/websocket-guide/websocket
 * 开发者服务可以通过域名ws-push.dycloud-api.service访问抖音云 WebSocket 网关，支持的功能如下：
 */
/**
* 下行消息推送
    method：POST
    path：/ws/push_data
*/

// const response:any = {
//     "data": {
//       "failed_session_id_list": []
//     },
//     "err_msg": "success",
//     "err_no": 0
//   }

const request = axios.create({
  baseURL: "ws-push.dycloud-api.service",
});
export async function pushData(dataToClient: string) {
  /**
   * header：
   * "X-TT-WS-SESSIONIDS" // sessionid的列表，单次请求不能超过5个；与X-TT-WS-OPENIDS参数二选一; [sessionid_1,sessionid_2,sessionid_3]
   * "X-TT-WS-OPENIDS" // openid的列表，单次请求不能超过5个；与X-TT-WS-SESSIONIDS参数二选一; ["openid_1","openid_2","openid_3"]
   */
  const headerName = "X-TT-WS-SESSIONIDS";
  const sessionIDs = ["111", "222"];
  const openIDs = [];
  const { data } = await request.post<any>(
    "/ws/push_data",
    { dataToClient },
    {
      headers: {
        [headerName]: sessionIDs,
      },
    }
  );
  if (data.data || data.errcode === 0) {
    return data.data;
  }
  return {};
}

/**
 * 查询连接信息
method：GET
path：/ws/query_info
header：
header
备注
举例
X-TT-WS-SESSIONIDS
sessionid的列表，单次请求不能超过5个；与X-TT-WS-OPENIDS参数二选一
[sessionid_1,sessionid_2,sessionid_3]
X-TT-WS-OPENIDS
openid的列表，单次请求不能超过5个；与X-TT-WS-SESSIONIDS参数二选一
["openid_1","openid_2","openid_3"]
--response--
{
  "data": {
    "xxx(sessionID)": {
      "AppID": "xxxxx",
      "ServiceID": "xxxxx",
      "EnvID": "xxxxx",
      "BackendPath": "xxxxx",
      "SessionID": xxx,
      "OpenID": "xxxx"
    }
  },
  "err_msg": "success",
  "err_no": 0
} 

*/

/**
 * 下行消息组推送
method：POST
path：/ws/group/push_data
header：
header
备注
举例
X-TT-WS-GROUPNAME
推送的组的Name，必填
"group_name_1"
X-TT-WS-GROUPVALUE
推送的组的Value，必填
"group_value_1"
--response--
{
  "data": "",
  "err_msg": "success",
  "err_no": 0
}
 */

/**
 * 查询组信息
method：POST
path：/ws/group/query_info
header：
header
备注
举例
X-TT-WS-GROUPNAME
推送的组的Name，必填
"group_name_1"
X-TT-WS-GROUPVALUE
推送的组的Value，必填
"group_value_1"

--response--
{
  "data": {
    "sessionId_list": [
      xxx
    ],
    "openId_list": [
      "xxxx"
    ]
  },
  "err_msg": "success",
  "err_no": 0
}
 */
