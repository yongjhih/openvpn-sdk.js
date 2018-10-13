/* @flow */
/* @flow-runtime ignore */

import * as validators from 'flow-runtime-validators';
import Moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import fs from 'fs';
import validator from 'validator';

export type URL = string;
URL.addConstraint(
  it => {
    if (!validator.isURL(it)) {
      return "must be valid URL";
    }
  }
);

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
Socket.addConstraint(
  it => {
    if (isSocket(it)) {
      return "must be valid socket";
    }
  }
);

export type IP = string;
IP.addConstraint(
  it => {
    if (!validator.isIP(it, 4)) {
      return "must be valid IP";
    }
  }
);

export type User = {
  name: string,
  realAddress: Socket,
  vpnAddress: IP,
};
