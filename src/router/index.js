import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body';

import {
  recoder,
  CONNECTION,
} from '../shared/index.js';

import local from './local.js';

const app = new Koa();
const router = new Router();

const retransmission = (ctx = {}) => {
  const { request = {} } = ctx;
  const {
    body,
    href,
    type,
    method,
    headers,
    hostname,
  } = request;

  const combined = {
    body,
    type,
    href,
    method,
    headers,
  };

  const got = recoder.get(hostname);

  got?.emit?.(CONNECTION.RETRANSMISSION, combined);
};

app
  .use(koaBody({ multipart: true }))
  .use(local.routes())
  .use(router.allowedMethods())
  .use(retransmission);

export default app.callback();
