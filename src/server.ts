import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Redis from 'ioredis';
import mongoose from 'mongoose';
import assert from "assert";

import router from './config/router';
import cors from './config/cors';

// 初始化各服务的连接 redis, mongo
async function initService() {
    const {REDIS_ADDRESS, REDIS_USERNAME, REDIS_PASSWORD, MONGO_ADDRESS, MONGO_USERNAME, MONGO_PASSWORD} = process.env;
    const [ REDIS_HOST, REDIS_PORT] = REDIS_ADDRESS.split(':');
    const redis = new Redis({
        port: parseInt(REDIS_PORT, 10),
        host: REDIS_HOST,
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        db: 0,
    });

    assert(await redis.echo('echo') === 'echo', `redis echo error`);

    const mongoUrl = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_ADDRESS}`;
    await mongoose.connect(mongoUrl); 
    
    return {
        redis,
        mongoose,
    }
}

initService().then(async ({ redis, mongoose}) => {
   
    const app = new Koa();

    app.use(async (ctx, next) => {
        ctx.redis = redis;
        ctx.mongoose = mongoose;
        await next();
    });

    app.use(cors);
    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));