'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.IP = exports.Socket = exports.isSocket = exports.isIpSocket = exports.isIpSocketLike = exports.isDomainName = exports.isDomainNameSocket = exports.isDomainNameSocketLike = exports.URL = undefined;

var _flowRuntimeValidators = require('flow-runtime-validators');

var validators = _interopRequireWildcard(_flowRuntimeValidators);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var URL = exports.URL = _flowRuntime2.default.type('URL', _flowRuntime2.default.string());

URL.addConstraint(function (it) {
  if (!_validator2.default.isURL(it)) {
    return "must be valid URL";
  }
});

var isDomainNameSocketLike = exports.isDomainNameSocketLike = function isDomainNameSocketLike(it) {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}:[0-9]+$/.test(it)
  );
};

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

var Socket = exports.Socket = _flowRuntime2.default.type('Socket', _flowRuntime2.default.string());

Socket.addConstraint(function (it) {
  if (isSocket(it)) {
    return "must be valid socket";
  }
});

var IP = exports.IP = _flowRuntime2.default.type('IP', _flowRuntime2.default.string());

IP.addConstraint(function (it) {
  if (!_validator2.default.isIP(it, 4)) {
    return "must be valid IP";
  }
});

var User = exports.User = _flowRuntime2.default.type('User', _flowRuntime2.default.object(_flowRuntime2.default.property('name', _flowRuntime2.default.string()), _flowRuntime2.default.property('realAddress', Socket), _flowRuntime2.default.property('vpnAddress', IP)));