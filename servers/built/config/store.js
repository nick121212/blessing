"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RedisStore = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

var _koaSession = require("koa-session2");

var _redis = require("./redis");

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisStore = exports.RedisStore = function (_Store) {
    (0, _inherits3.default)(RedisStore, _Store);

    function RedisStore() {
        (0, _classCallCheck3.default)(this, RedisStore);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RedisStore.__proto__ || (0, _getPrototypeOf2.default)(RedisStore)).call(this));

        _this.redis = new _ioredis2.default({
            port: _redis2.default.port,
            host: _redis2.default.host,
            family: _redis2.default.family,
            password: _redis2.default.password,
            db: _redis2.default.db
        });
        return _this;
    }

    (0, _createClass3.default)(RedisStore, [{
        key: "get",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(sid) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.redis.get("SESSION:" + sid);

                            case 2:
                                data = _context.sent;
                                return _context.abrupt("return", JSON.parse(data));

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function get(_x) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
    }, {
        key: "set",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(session, opts) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!opts.sid) {
                                    opts.sid = this.getID(24);
                                }
                                _context2.next = 3;
                                return this.redis.set("SESSION:" + opts.sid, (0, _stringify2.default)(session));

                            case 3:
                                return _context2.abrupt("return", opts.sid);

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function set(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return set;
        }()
    }, {
        key: "destroy",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sid) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.redis.del("SESSION:" + sid);

                            case 2:
                                return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function destroy(_x4) {
                return _ref3.apply(this, arguments);
            }

            return destroy;
        }()
    }]);
    return RedisStore;
}(_koaSession.Store);