import Koa from "koa";
// @ts-ignore
import cors from "@koa/cors";


export default async function(ctx: Koa.Context,next: Koa.Next){
    const corsOptions = {
        origin: ["https://metabazaar.com.cn","https://cloud.douyin.com"], // 允许的域名
      };

      cors(corsOptions);
}