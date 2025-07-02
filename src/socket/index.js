import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import {
  recoder,
  HOST_NAME,
  CONNECTION,
} from '../shared/index.js';

const toId = () => {
  const string = uuidv4() || '';
  const parts = string.split('-') || [];

  return parts[parts.length -1];
};

const onResponse = (source = {}) => {
  const { beacon } = source;

  const got = recoder.get(beacon);

  recoder.del(beacon);
  got?.resolve?.(source);
};

const hander = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    const id = toId();
    const hostname = `${id}.${HOST_NAME}`;

    recoder.set(hostname, socket);

    socket.on(CONNECTION.RESPONSE, onResponse);
    socket.emit(CONNECTION.CREATE, { hostname });
  });
};

export default hander;