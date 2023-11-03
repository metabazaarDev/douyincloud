// @ts-ignore
import cors from "@koa/cors";


export default function(){
    const corsOptions = {
        origin: ["https://metabazaar.com.cn","https://cloud.douyin.com"], // 允许的域名
      };

    return cors(corsOptions);
}