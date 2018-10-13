'use strict';

var _openvpn = require('./openvpn');

var _openvpn2 = _interopRequireDefault(_openvpn);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _http = require('axios/lib/adapters/http');

var _http2 = _interopRequireDefault(_http);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.adapter = _http2.default;


var baseUrl = process.env.OPENVPN_BASE_URL || "";
var username = process.env.OPENVPN_USER_NAME || "";
var password = process.env.OPENVPN_PASSWORD || "";
var openVpn = new _openvpn2.default(baseUrl);

it('should login with username/password and response cookie successfully', function (done) {
  openVpn.login(username, password).subscribe(function (cookie) {
    console.log(cookie);
    expect(cookie).not.toBeNull();
    done();
  }, function (err) {
    console.error(err);
    done.fail(err);
  });
});

it('should get current users', function (done) {
  openVpn.login(username, password).flatMap(function (cookie) {
    return openVpn.getCurrentUsers(cookie);
  }).subscribe(function (users) {
    console.log(users);
    done();
  }, function (err) {
    console.error(err);
    done.fail(err);
  });
});

it('should validate sockets', function (done) {
  expect((0, _types.isDomainNameSocket)("172.27.243.60")).toBe(false);
  expect((0, _types.isDomainNameSocket)("example.com")).toBe(false);
  expect((0, _types.isDomainNameSocket)("example.com:333")).toBe(true);
  expect((0, _types.isDomainNameSocket)("172.27.243.60:333")).toBe(false);
  expect((0, _types.isDomainNameSocket)("example:333")).toBe(false);

  expect((0, _types.isIpSocket)("172.27.243.60")).toBe(false);
  expect((0, _types.isIpSocket)("example.com")).toBe(false);
  expect((0, _types.isIpSocket)("example.com:333")).toBe(false);
  expect((0, _types.isIpSocket)("172.27.243.60:333")).toBe(true);
  expect((0, _types.isIpSocket)("172.27.243:333")).toBe(false);
  done();
});