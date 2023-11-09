import Router from '@koa/router';
import Koa from 'koa';

import Ping from '../controllers/ping';
import { getWebcastInfo, startTask } from '../services/open-douyin';
import { LIVE_MSG_TYPE } from '../types/open-douyin';

const router = new Router();

router.get('/v1/ping', Ping);

/**
 * router 对接ue，接收token，返回roomId
 * 如果接入SDK则可弃用
 */
router.post('/v1/roomId', async (ctx: Koa.Context, next) => {
  const { token } = ctx.request.body as any;
  const { room_id: roomId } = (await getWebcastInfo(token)) as any;
  ctx.body = { roomId };
  next();
});

/**
 * 启动抖音开平推送任务
 */
router.get('/v1/api/live_data/task/start', async (ctx, next) => {
  const baseReq = {
    roomid: `${ctx.request.headers['X-Room-ID']}`,
    appid: `${ctx.request.header['X-TT-APPID'] || process.env.APP_ID}`,
  };
  startTask({ ...baseReq, msg_type: LIVE_MSG_TYPE.COMMENT });
  startTask({ ...baseReq, msg_type: LIVE_MSG_TYPE.LIKE });
  startTask({ ...baseReq, msg_type: LIVE_MSG_TYPE.GIFT });
});







/**
 * 服务端使用云托管webSocket
 * 开发者服务需要提供一个后端 http 接口以接收处理小程序的建连、断连、上行消息的请求。
 * 接口的路径在小程序建连时进行传入（对应Cloud.connectContainer中的path参数）。
 * TODO:和群对一下path是什么
 */

/**
 * https://developer.open-douyin.com/docs/resource/zh-CN/developer/tools/cloud/develop-guide/websocket-guide/websocket
 * 建连请求
 *  method：GET
 *  path：path
 *  header：X-tt-event-type=connect
 * 断连请求
 *  method：GET
 *  path：path
 *  header：X-tt-event-type=disconnect
 * 上行消息请求
 *  method：POST
 *  path：path
 *  header：X-tt-event-type=uplink
 */

/**
 * 请求开发者服务的公共 header
 */
interface PubReqHeader {
  'X-TT-APPID': string; // 小程序的APPID
  'X-TT-ENVID': string; // 小程序的ENVID
  'X-TT-SERVICEID': string; // 小程序的SERVICEID
  'X-TT-OPENID': string; // 用户的OPENID
  'X-TT-SESSIONID': string; // WebSocket的连接ID
  'X-FORWARDED-FOR': string; // 客户端的访问地址
}
router.get('/v1/some-path', (ctx, next) => {
  console.log('APPID: ', ctx.request.header['X-TT-APPID']);
  // 建连请求
  if (ctx.request.header['X-tt-event-type'] === 'connect') {
    // do something...
    ctx.status = 200;
    ctx.body = 'connect success';
    return;
  }
  // 断连请求
  else if (ctx.request.header['X-tt-event-type'] === 'disconnect') {
    // do something...
    ctx.status = 200;
    ctx.body = 'disconnect success';
    return;
  }
});
router.post('/v1/some-path', (ctx, next) => {
  if (ctx.request.header['X-tt-event-type'] !== 'uplink') {
    ctx.status = 500;
    ctx.body = 'event type incorrect';
    return;
  }
  // 上行消息请求
  // do something with request body
  console.log(ctx.request.body);

  ctx.status = 200;
  ctx.body = 'uplink success';
});

export default router;
