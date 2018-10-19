/* @flow */
/* @flow-runtime ignore */

import validator from 'validator';

export type URL = string;

export const isDomainNameSocketLike = (it: string): boolean => {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}:[0-9]+$/.test(it));
};

export const isDomainNameSocket = (it: string): boolean => {
  if (isDomainNameSocketLike(it)) {
    return validator.isPort(it.split(":")[1]);
  }
  return false;
};

export const isDomainName = (it: string): boolean => {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(it));
};

export const isIpSocketLike = (it: string): boolean => {
  return (/^[0-9]+(.[0-9]{1,3}){1,3}:[0-9]+$/.test(it));
};

export const isIpSocket = (it: string): boolean => {
  if (isIpSocketLike(it)) {
    const ipSocket = it.split(":");
    return validator.isIP(ipSocket[0]) && validator.isPort(ipSocket[1]);
  }
  return false;
};

export const isSocket = (it: string): boolean => {
  return isIpSocket(it) || isDomainNameSocket(it);
};

export type Socket = string;

export type IP = string;

export type User = {
  name: string,
  realAddress: Socket,
  vpnAddress: IP,
};
