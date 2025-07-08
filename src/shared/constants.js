export const PORT = process.env.PORT || 1638;
export const HOST_NAME = process.env.HOST_NAME || 'passerver.lowcode.cloud.netease.com';

export const CONNECTION_PREFIX = 'connection';

export const CONNECTION = {
  CREATE: `${CONNECTION_PREFIX}_create`,
  REQUEST: `${CONNECTION_PREFIX}_request`,
  RESPONSE: `${CONNECTION_PREFIX}_response`,
};
