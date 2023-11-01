import Router from '@koa/router'

import Ping from "../controllers/ping"

const router = new Router();

router.get('/v1/ping',Ping);


export default router;