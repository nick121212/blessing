'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _db = require('../../utils/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var key, model;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.params["key"];

                            if (key) {
                                _context.next = 3;
                                break;
                            }

                            throw _boom2.default.badData('key\u4E0D\u80FD\u4E3A\u7A7A');

                        case 3:
                            _context.next = 5;
                            return sequelizeModel.findById(key);

                        case 5:
                            model = _context.sent;

                            if (model) {
                                _context.next = 8;
                                break;
                            }

                            throw _boom2.default.badData('\u627E\u4E0D\u5230key:' + key + '\u7684\u6570\u636E\u6216\u8005\u5DF2\u5220\u9664!');

                        case 8:

                            ctx.body = model;

                        case 9:
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