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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel, config) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var key, model, modelInstance, curConfig;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.params["key"];
                            model = ctx.request.body;

                            if (key) {
                                _context.next = 4;
                                break;
                            }

                            throw _boom2.default.badData('key\u4E0D\u80FD\u4E3A\u7A7A!');

                        case 4:
                            _context.next = 6;
                            return sequelizeModel.findById(key);

                        case 6:
                            modelInstance = _context.sent;

                            if (modelInstance) {
                                _context.next = 9;
                                break;
                            }

                            throw _boom2.default.badData('\u627E\u4E0D\u5230key:' + key + '\u7684\u6570\u636E\u6216\u8005\u5DF2\u5220\u9664!');

                        case 9:
                            curConfig = _3.default.mysql.getConfig(config, "/updateItem");

                            _3.default.mysql.removeAttributes(model, sequelizeModel, curConfig.removeAttributes);

                            _context.next = 13;
                            return modelInstance.updateAttributes(model);

                        case 13:
                            ctx.body = _context.sent;

                        case 14:
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