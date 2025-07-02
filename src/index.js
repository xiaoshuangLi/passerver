import { createServer } from 'http';

import { PORT } from './shared/constants.js';

import router from './router/index.js';
import socket from './socket/index.js';

const local = 'http://127.0.0.1';
const message = `Server on ${local}:${PORT}`;

const callback = () => console.log(message);
const server = createServer(router);

socket(server);
server.listen(PORT, callback);
