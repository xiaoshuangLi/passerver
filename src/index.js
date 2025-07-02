import { createServer } from 'http';

import { PORT } from './shared/constants.js';

import server from './server/index.js';
import socket from './socket/index.js';

const local = 'http://127.0.0.1';
const message = `Server on ${local}:${PORT}`;

const callback = () => console.log(message);
const created = createServer(server);

socket(created);
created.listen(PORT, callback);
