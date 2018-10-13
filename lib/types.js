"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSocket = exports.isIpSocket = exports.isIpSocketLike = exports.isDomainName = exports.isDomainNameSocket = exports.isDomainNameSocketLike = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDomainNameSocketLike = exports.isDomainNameSocketLike = function isDomainNameSocketLike(it) {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}:[0-9]+$/.test(it)
  );
};
/* -runtime ignore */

var isDomainNameSocket = exports.isDomainNameSocket = function isDomainNameSocket(it) {
  if (isDomainNameSocketLike(it)) {
    return _validator2.default.isPort(it.split(":")[1]);
  }
  return false;
};

var isDomainName = exports.isDomainName = function isDomainName(it) {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(it)
  );
};

var isIpSocketLike = exports.isIpSocketLike = function isIpSocketLike(it) {
  return (/^[0-9]+(.[0-9]{1,3}){1,3}:[0-9]+$/.test(it)
  );
};

var isIpSocket = exports.isIpSocket = function isIpSocket(it) {
  if (isIpSocketLike(it)) {
    var ipSocket = it.split(":");
    return _validator2.default.isIP(ipSocket[0]) && _validator2.default.isPort(ipSocket[1]);
  }
  return false;
};

var isSocket = exports.isSocket = function isSocket(it) {
  return isIpSocket(it) || isDomainNameSocket(it);
};