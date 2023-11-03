import Koa from "koa";

export default async function (ctx: Koa.Context, next: Koa.Next) {
  ctx.status = 200;
  next();
}
