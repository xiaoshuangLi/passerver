import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import Router from '@koa/router';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.resolve(__dirname, '../../../');

const router = new Router();

const localHTML = fs.readFileSync(
  path.resolve(basePath, 'src/static/index.html'),
  { encoding: 'utf8' },
);

router.get('/@@static', (ctx = {}, next) => {
  ctx.body = localHTML;
});

export default router;
