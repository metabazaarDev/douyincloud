/**
 * 直播间数据开放能力
 * https://developer.open-douyin.com/docs/resource/zh-CN/interaction/develop/server/live/danmu
 * 直播间消息类型，需要前置申请开通了对应类型直播间数据能力才可以调用。
 * 1. 评论：live_comment
 * 2. 礼物：live_gift
 * 3. 点赞：live_like
 * 4. 粉丝团：live_fansclub
 */
export enum LIVE_MSG_TYPE {
  COMMENT = 'live_comment',
  GIFT = 'live_gift',
  LIKE = 'live_like',
  FANSCLUB = 'live_fansclub',
}

/**
 * 开平推送失败的数据
 */
export interface FailedPushData {
  roomid: string; // "12345", // string类型，消息的房间id
  msg_type: string; // "live_gift", // string类型，表示消息类型
  payload: string; // "[...]" // string类型， 对应推送协议中的payload字符串，需要unmarshal
}

export interface PaginationRequest extends OpenDataRequest {
  page_num: number; // 页码：注意，需要从1开始
  page_size: number; // 每页数据条数, 最大不超过100
}

export interface OpenDYResponse {
  errcode?: number;
  errmsg?: string;
  data?: WebcastInfo;
}
export interface WebcastInfo {
  room_id: number;
  anchor_open_id: string;
  avatar_url: string;
  nick_name: string;
}
/**
   * {
      "room_id": 7214015683695250235,
      "anchor_open_id":  "_000oJIu6APhomK7KIBGqSYm5XYPxCJB_xxx",
      "avatar_url": "https://p11.douyinpic.com/aweme/720x720/aweme-avatar/tos-cn-avt-0015_973c31e8055f78a41d3f7de3def9821d.jpeg?from=3067671334",
       "nick_name": "xxx"
  }
   */

export interface StartStopResponse extends OpenDataBaseResponse {
  data: {
    task_id?: string; // "启动任务" 任务id, string, 每次启动任务都会返回一个任务id。停止请求成功时的返回数据data {}"
  };
}
export interface StatusResponse extends OpenDataBaseResponse {
  data: {
    status?: number; // "查询任务状态" 请求成功时的返回数据  // int, 取值：1 任务不存在 2任务未启动 3任务运行中
  };
}

export interface OpenDataRequest {
  roomid: string;
  appid: string;
  msg_type: LIVE_MSG_TYPE;
}

export interface OpenDataBaseResponse {
  err_no: number; //请求错误码，0表示成功，非0表示失败
  err_msg: string; //非0错误码时，携带额外的错误提示信息
  logid: string; //请求链路id, 用于出问题时提供给开平具体定位
  data: any;
}

/**
 * 评论数据payload
 * [{
    "msg_id": "123456781",  // string类型id
    "sec_openid":"xxxx",    // 评论用户的加密openid, 当前其实没有加密
    "content":"xxxx",       // 评论内容
    "avatar_url":"xxx",     // 评论用户头像
    "nickname":"xxxx",      // 评论用户昵称(不加密)
    "timestamp":1649068964, // 评论毫秒级时间戳
}]
 */

/**
 * 礼物数据-payload
 * [{
    "msg_id": "123456782",  // string类型id
    "sec_openid":"xxxx",    // 用户的加密openid，当前其实没有加密
    "sec_gift_id": "xxxx",  // 加密的礼物id
    "gift_num": 123,        // 送出的礼物数量
    "gift_value": 10000,    // 礼物总价值，单位分
    "avatar_url":"xxx",     // 用户头像
    "nickname":"xxxx",      // 用户昵称(不加密)
    "timestamp":1649068964, // 礼物毫秒级时间戳
}]
 */

/**
 * 点赞数据-payload
 * [{
    "msg_id": "123456783",  // string类型id
    "sec_openid":"xxxx",    // 点赞用户的加密openid，当前其实没有加密
    "like_num":"xxxx",      // 点赞数量，上游2s合并一次数据
    "avatar_url":"xxx",     // 点赞用户头像
    "nickname":"xxxx",      // 点赞用户昵称(不加密)
    "timestamp":1649068964, // 点赞毫秒级时间戳
}]
 */
