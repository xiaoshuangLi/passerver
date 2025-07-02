import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body';

import local from './routers/local.js';
import retransmission from './middlewares/retransmission.js';

const app = new Koa();
const router = new Router();

app
  .use(koaBody({ multipart: true }))
  .use(local.routes())
  .use(router.allowedMethods())
  .use(retransmission);

export default app.callback();
