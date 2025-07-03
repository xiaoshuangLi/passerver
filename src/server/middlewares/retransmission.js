import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { recoder, CONNECTION } from '../../shared/index.js';

const getFromRequest = (key) => (ctx) => ctx?.request?.[key];

const fileToBuffer = (file = {}) => {
  const { filepath } = file;

  return filepath && fs.readFileSync(filepath);
};

const forEntries = (source = {}) => (callback, object = {}) => {
  if (!callback) {
    return { ...object, ...source };
  }

  const entries = Object.entries(source);
  const reduce = (result = {}, entry = []) => {
    const [key, value] = entry;
    const got = callback(value);

    return { ...result, [key]: got };
  };

  return entries.reduce(reduce, object);
};

const getFilesFromRequest = (ctx = {}) => {
  const { request: { files } = {} } = ctx;

  const callback = (file = {}) => {
    const source = file.toJSON();
    const buffer = fileToBuffer(file);

    return { ...source, buffer };
  };

  return files && forEntries(files)(callback);
};

const bundle = {
  files: getFilesFromRequest,
  body: getFromRequest('body'),
  type: getFromRequest('type'),
  href: getFromRequest('href'),
  method: getFromRequest('method'),
  headers: getFromRequest('headers'),
};

const promise = (beacon) => {
  const handler = (resolve, reject) => {
    const combined = { resolve, reject };

    recoder.set(beacon, combined);
  };

  return new Promise(handler);
};

const promiseToContext = async (ctx, beacon) => {
  ctx.body = await promise(beacon);
};

const retransmission = (ctx = {}) => {
  const { request = {} } = ctx;
  const { hostname } = request;

  const socket = recoder.get(hostname);

  if (!socket) {
    return;
  }

  const beacon = uuidv4();
  const callback = (handler) => handler(ctx);
  const combined = forEntries(bundle)(callback, { beacon });

  socket.emit(CONNECTION.REQUEST, combined);
  return promiseToContext(ctx, beacon);
};

export default retransmission;
