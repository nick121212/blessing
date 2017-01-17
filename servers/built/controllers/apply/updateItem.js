'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _es = require('../../utils/es');

var _spa = require('../../spa');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    var callFunc = function callFunc(conn) {
        return new _bluebird2.default(function (resolve, reject) {
            conn.socket.clientProxy.createFile().onReady(function (result) {
                if (!result || result.isBoom) {
                    return reject(result);
                }
                process.nextTick(function () {
                    resolve(result);
                });
            });
        }).timeout(30000);
    };

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var _ctx$params, key, type, model, conn, res;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _ctx$params = ctx.params, key = _ctx$params.key, type = _ctx$params.type;
                            model = ctx.request.body;

                            if (key) {
                                _context.next = 4;
                                break;
                            }

                            throw _boom2.default.badData('key\u4E0D\u80FD\u4E3A\u7A7A');

                        case 4:
                            conn = _lodash2.default.first(_lodash2.default.filter(_spa.app.spaServer.connections, function (con) {
                                return con.doc.id == key;
                            }));

                            if (conn) {
                                _context.next = 7;
                                break;
                            }

                            throw _boom2.default.create(409, "没有发现客户端！");

                        case 7:
                            _context.next = 9;
                            return callFunc(conn);

                        case 9:
                            res = _context.sent;
                            _context.next = 12;
                            return _es.client.update({
                                index: 'cmdb.apply',
                                type: "est-agent",
                                id: key,
                                body: {
                                    doc: {
                                        status: res ? res.result : false,
                                        updatedAt: Date.now()
                                    }
                                }
                            });

                        case 12:
                            ctx.body = _context.sent;

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};