'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/* -runtime ignore */

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var https = require('https');

//const fromAxiosPromise = <T>(promise: AxiosPromise<T>): Rx.Observable<T> => {
//  return Rx.Observable.from(promise);
//};

var OpenVpn = function () {
  function OpenVpn(url) {
    _classCallCheck(this, OpenVpn);

    this.url = url;
    this.axios = _axios2.default.create({
      baseURL: url,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      maxRedirects: 0,
      withCredentials: true
    });
  }

  _createClass(OpenVpn, [{
    key: 'login',
    value: function login(username, password) {
      var _this = this;

      return _rxjs2.default.Observable.fromPromise(this.axios.get("/")).map(function (res) {
        return "";
      }).catch(function (err) {
        if (err.response.headers["location"] != _this.url + '__session_start__/') {
          return _rxjs2.default.Observable.throw(err);
        }
        var cookie = err.response.headers["set-cookie"][0].split(";")[0];
        return _rxjs2.default.Observable.fromPromise(_this.axios.get("/__session_start__", { headers: { Cookie: cookie } })).catch(function (err) {
          return _rxjs2.default.Observable.fromPromise(_this.axios.get("/", { headers: { Cookie: cookie } }));
        }).map(function (res) {
          return cookie;
        });
      }).flatMap(function (cookie) {
        return _rxjs2.default.Observable.fromPromise(_this.axios.post("/__login__", _qs2.default.stringify({
          username: username,
          password: password
        }), {
          headers: {
            Cookie: cookie,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })).map(function (res) {
          return cookie;
        });
      }).catch(function (err) {
        return _rxjs2.default.Observable.of(err.response).map(function (res) {
          return res.headers["set-cookie"][0].split(";")[0];
        });
      });
    }
  }, {
    key: 'getCurrentUsers',
    value: function getCurrentUsers(cookie) {
      return _rxjs2.default.Observable.fromPromise(this.axios.get("/current_users", { headers: { Cookie: cookie } })).catch(function (err) {
        if (err.response.status == 302) {
          var e = new Error("The cached cookie has expired", err);
          e.response = err.response;
          return _rxjs2.default.Observable.throw(e);
        }
        return _rxjs2.default.Observable.throw(err);
      }).map(function (res) {
        var users = [];
        var $ = _cheerio2.default.load(res.data);
        $('table[id="box-current-users-table"] tbody tr').each(function (i, elem) {
          if (i > 0) {
            users.push({
              name: $(elem).children().eq(0).text(),
              realAddress: $(elem).children().eq(1).text(),
              vpnAddress: $(elem).children().eq(2).text()
            });
          }
        });
        return users;
      });
    }
  }]);

  return OpenVpn;
}();

exports.default = OpenVpn;