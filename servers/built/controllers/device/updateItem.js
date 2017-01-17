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

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Model, config) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var _ctx$params, key, type, model, curConfig, result;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _ctx$params = ctx.params, key = _ctx$params.key, type = _ctx$params.type;
                            model = ctx.request.body;
                            curConfig = _3.default.elastic.getConfig(config, "/updateItem");

                            if (!(!key || !type)) {
                                _context.next = 5;
                                break;
                            }

                            throw _boom2.default.badData('key,type\u4E0D\u80FD\u4E3A\u7A7A');

                        case 5:
                            _context.next = 7;
                            return _es.client.get({
                                index: 'cmdb.device',
                                type: type,
                                id: key
                            });

                        case 7:
                            result = _context.sent;

                            if (result.found) {
                                _context.next = 10;
                                break;
                            }

                            throw _boom2.default.badData('\u6CA1\u6709\u627E\u5230\u7F16\u53F7\u4E3A\u3010' + key + '\u3011\u7684\u8BBE\u5907\uFF01');

                        case 10:

                            _3.default.elastic.removeAttributes(model, curConfig.removeAttributes);
                            _3.default.elastic.setSuggest(model, curConfig.suggest);

                            _context.next = 14;
                            return _es.client.update({
                                index: 'cmdb.device',
                                type: type,
                                id: key,
                                body: {
                                    doc: model
                                }
                            });

                        case 14:
                            ctx.body = _context.sent;

                        case 15:
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