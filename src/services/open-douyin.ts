import axios from 'axios';
import {
  OpenDYResponse,
  OpenDataRequest,
  StartStopResponse,
  StatusResponse,
  PaginationRequest,
  OpenDataBaseResponse,
  FailedPushData,
} from '../types/open-douyin';

const request = axios.create({
  baseURL: 'https://webcast.bytedance.com',
  headers: {
    'Content-Type': 'application/json',
    // "access-token":"123123"
  },
});

/**
 * 获取直播信息，返回roomId
 * https://developer.open-douyin.com/docs/resource/zh-CN/interaction/develop/server/live/webcastinfo
 * POST https://webcast.bytedance.com/api/webcastmate/info
 *
 */
/**
 * 主播使用直播伴侣或移动端云启动玩法后，直播伴侣/移动端云启动会传入 token 到玩法中.
 * 当玩法获取 token 后，传递给玩法的服务端。玩法服务端通过该接口，使用 token 获取直播间信息。
 * @param token
 * @returns
 */
export async function getWebcastInfo(token: string) {
  const { data } = await request.post<OpenDYResponse>(
    '/api/webcastmate/info',
    { token },
    {
      headers: {
        'X-Token': '123', // 通过接口获取的 access_token
      },
    }
  );
  if (data.data || data.errcode === 0) {
    return data.data;
  }
  return {};
}
/**
 * 免token换取直播间信息
 * https://developer.open-douyin.com/docs/resource/zh-CN/developer/tools/cloud/develop-guide/danmu_douyincloud
 * 开发者服务部署在抖音云上后，开发者无需进行此步骤，只需要在抖音云unity sdk初始化时传入token参数，后续通过抖音云unity-sdk发起HTTP或Websocket请求，
 * 抖音云网关会自动对token进行解密，并将获取到的直播间信息写在请求头中，整个链路对开发者透明，数据安全性更高。请求头信息如下：
 * 请求头key 含义 示例
 * X-Room-ID 直播间id 7214015683695250235
 * X-Anchor-OpenID 主播id _000oJIu6APhomK7KIBGqSYm5XYPxCJB_xxx
 * X-Avatar-Url 主播头像 https://p11.douyinpic.com/aweme/720x720/aweme-avatar/tos-cn-avt-0015_973c31e8055f78a41d3f7de3def9821d.jpeg?from=3067671334
 * X-Nick-Name 主播昵称 xxx
 */

/**
 * 直播间数据开放能力
 * 获取access_token
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/interface-request-credential/non-user-authorization/get-access-token
 * 传统弹幕小玩法链路中，开发者服务器如果想访问抖音开放平台提供的弹幕小玩法openAPI，
 * 需要自行维护access_token相关逻辑，在抖音云上则这些过程可以省略，无需在请求头上
 * 携带access_token参数，抖音云网关托管该过程，直接可以免鉴权调用弹幕小玩法
 * openAPI服务，并且走内网专线，在性能、数据安全上都有更好的保证。
 */

/**
 * 直播间数据开放能力
 * 启动任务
 * POST https://webcast.bytedance.com/api/live_data/task/start
 */
export async function startTask(openDataReq: OpenDataRequest) {
  const { data } = await request.post<StartStopResponse>(
    '/api/live_data/task/start',
    openDataReq
  );
  if (data.err_no !== 0) {
    // logger
    console.log(data);
    throw new Error(data.err_msg);
  }
  return data.data;
}
// startTask({ appid: '123', roomid: '2222', msg_type: LIVE_MSG_TYPE.COMMENT });
// startTask(LIVE_MSG_TYPE.GIFT)
// startTask(LIVE_MSG_TYPE.LIKE)
// startTask(LIVE_MSG_TYPE.FANSCLUB)

/**
 * 直播间数据开放能力
 * 停止任务
 * POST https://webcast.bytedance.com/api/live_data/task/stop
 */

export async function stopTask(openDataReq: OpenDataRequest) {
  // TODO: 网络错误、500、open-douyin错误
  const { data, status } = await request.post<StartStopResponse>(
    '/api/live_data/task/stop',
    openDataReq
  );
  if (data.err_no !== 0) {
    // logger
    console.log(data);
    throw new Error(data.err_msg);
  }
  return data.data;
}
/**
 * 直播间数据开放能力
 * 查询任务状态
 * GET https://webcast.bytedance.com/api/live_data/task/get
 */

export async function getTaskStatus(openDataReq: OpenDataRequest) {
  // TODO: 网络错误、500、open-douyin错误
  const { data, status } = await request.get<StatusResponse>(
    '/api/live_data/task/get',
    {
      params: openDataReq,
    }
  );
  if (data.err_no !== 0) {
    // logger
    console.log(data);
    throw new Error(data.err_msg);
  }
  return data.data;
}

/**
 * 直播间数据开放能力
 * 分页查询推送失败数据（据仅支持礼物、粉丝团数据）
 * GET https://webcast.bytedance.com/api/live_data/task/fail_data/get
 */
export async function getTaskFailedData(paginationReq: PaginationRequest) {
  // TODO: 网络错误、500、open-douyin错误
  const { data, status } = await request.get<TaskFailedDataResponse>(
    '/api/live_data/task/get',
    {
      params: paginationReq,
    }
  );
  if (data.err_no !== 0) {
    // logger
    console.log(data);
    throw new Error(data.err_msg);
  }
  return data.data;
}

/**
 * 直播间数据开放能力
 * 礼物置顶
 * POST https://webcast.bytedance.com/api/gift/top_gift
 */

/**
 * 直播间数据开放能力
 * 数据推送
 * 需要配置内网回调域名
 * 目前弹幕小玩法接入抖音云还在内测阶段，内网专线回调的配置还需要联系我们的技术同学
 */

// 错误码说明
// Required Parameters Are Absent 40023 缺少必要的请求参数
// Invalid Access Token 40022 无效的AccessToken
// Request params error 10011 请求的分页查询参数不合法

/**
 * 分页查询返回的开平推送失败分页数据
 */
interface TaskFailedDataResponse extends OpenDataBaseResponse {
  data: {
    page_num: number; // 1,
    total_count: number; // 100,
    data_list: FailedPushData[]; // 当页的数据列表
  };
}
