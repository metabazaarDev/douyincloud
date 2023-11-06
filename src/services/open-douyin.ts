import axios from "axios";
 
/**
 * 对接开平，传入token，获取直播信息，返回roomId
 * https://developer.open-douyin.com/docs/resource/zh-CN/interaction/develop/server/live/webcastinfo
 * POST https://webcast.bytedance.com/api/webcastmate/info
 * {
    "room_id": 7214015683695250235,
    "anchor_open_id":  "_000oJIu6APhomK7KIBGqSYm5XYPxCJB_xxx",
    "avatar_url": "https://p11.douyinpic.com/aweme/720x720/aweme-avatar/tos-cn-avt-0015_973c31e8055f78a41d3f7de3def9821d.jpeg?from=3067671334",
     "nick_name": "xxx"
}
 */
interface WebcastInfo {
  room_id: number;
  anchor_open_id: string;
  avatar_url: string;
  nick_name: string;
}
interface OpenDYResponse {
  errcode?: number;
  errmsg?: string;
  data?: WebcastInfo;
}
export async function getWebcastInfo(token: string) {
  const { data } = await axios.post<OpenDYResponse>(
    "https://webcast.bytedance.com/api/webcastmate/info",
    { token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (data.data || data.errcode === 0) {
    return data.data;
  }
  return {};
}

/**
 * 直播间数据开放能力
 * 获取access_token
 * 传统弹幕小玩法链路中，开发者服务器如果想访问抖音开放平台提供的弹幕小玩法openAPI，
 * 需要自行维护access_token相关逻辑，在抖音云上则这些过程可以省略，无需在请求头上
 * 携带access_token参数，抖音云网关托管该过程，直接可以免鉴权调用弹幕小玩法
 * openAPI服务，并且走内网专线，在性能、数据安全上都有更好的保证。
 */

/**
 * 直播间数据开放能力
 * 启动任务
 */

/**
 * 直播间数据开放能力
 * 停止任务
 */

/**
 * 直播间数据开放能力
 * 查询任务状态
 */

/**
 * 直播间数据开放能力
 * 分页查询推送失败数据（仅支持礼物数据）
 */

/**
 * 直播间数据开放能力
 * 礼物置顶
 */

/**
 * 直播间数据开放能力
 * 数据推送
 * 需要配置内网回调域名
 * 目前弹幕小玩法接入抖音云还在内测阶段，内网专线回调的配置还需要联系我们的技术同学
 */
