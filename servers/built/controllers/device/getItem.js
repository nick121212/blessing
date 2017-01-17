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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var _ctx$params, key, type, result;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _ctx$params = ctx.params, key = _ctx$params.key, type = _ctx$params.type;

                            if (!(!key || !type)) {
                                _context.next = 3;
                                break;
                            }

                            throw _boom2.default.badData('key,type\u4E0D\u80FD\u4E3A\u7A7A');

                        case 3:
                            _context.next = 5;
                            return _es.client.get({
                                index: 'cmdb.device',
                                type: type,
                                id: key
                            });

                        case 5:
                            result = _context.sent;


                            ctx.body = result;

                        case 7:
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