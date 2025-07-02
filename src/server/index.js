import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body';

import local from './routers/local.js';
import retransmission from './middlewares/retransmission.js';

const app = new Koa();
const router = new Router();

const options = {
  multipart: true,
  jsonLimit: '1gb',
  formLimit: '1gb',
  textLimit: '1gb',
};

app
  .use(koaBody(options))
  .use(local.routes())
  .use(router.allowedMethods())
  .use(retransmission);

export default app.callback();
