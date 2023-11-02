import Router from '@koa/router'

import Ping from "../controllers/ping"
 
const router = new Router();

router.get('/v1/ping',Ping);

/**
 * router 对接ue，接收token，返回roomId
 */
router.post('/v1/roomId',(ctx, next) => {
    // ctx.request.body.token
    next();
    return '10086';
});


export default router;