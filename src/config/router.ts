import Router from "@koa/router";

import Ping from "../controllers/ping";
import { getWebcastInfo } from "../services/open-douyin";
import Koa from "koa";

const router = new Router();

router.get("/v1/ping", Ping);

/**
 * router 对接ue，接收token，返回roomId
 */
router.post("/v1/roomId", async (ctx: Koa.Context, next) => {
  const { token } = ctx.request.body as any;
  const { room_id: roomId } = (await getWebcastInfo(token)) as any;
  ctx.body = { roomId };
  next();
});

export default router;
