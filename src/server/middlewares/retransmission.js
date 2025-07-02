import { v4 as uuidv4 } from 'uuid';

import { recoder, CONNECTION } from '../../shared/index.js';

const keys = [
  'body',
  'type',
  'href',
  'method',
  'headers',
];

const promise = (beacon) => {
  const handler = (resolve, reject) => {
    const combined = { resolve, reject };

    recoder.set(beacon, combined);
  };

  return new Promise(handler);
};

const retransmission = (ctx = {}) => {
  const { request = {} } = ctx;
  const { hostname } = request;

  const socket = recoder.get(hostname);

  if (!socket) {
    return;
  }

  const beacon = uuidv4();
  const reduce = (result = {}, key) => {
    result[key] = request[key];
    return result;
  };

  const combined = keys.reduce(reduce, { beacon });

  socket.emit(CONNECTION.REQUEST, combined);
  return promise(beacon);
};

export default retransmission;
