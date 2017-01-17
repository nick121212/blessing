'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _db = require('../../utils/db');

var _db2 = _interopRequireDefault(_db);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel, config) {

    /**
     * 创建模块数据
     */
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var modelIntance;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            modelIntance = ctx.request.body;

                            if (!((typeof modelIntance === 'undefined' ? 'undefined' : (0, _typeof3.default)(modelIntance)) !== "object")) {
                                _context.next = 3;
                                break;
                            }

                            throw _boom2.default.badData('数据没有填写完整!');

                        case 3:

                            _2.default.mysql.checkUniqueFields(sequelizeModel, modelIntance);
                            _2.default.mysql.removeAttributes();

                            modelIntance.createdAt = Date.now();

                            _context.next = 8;
                            return sequelizeModel.create(modelIntance);

                        case 8:
                            ctx.body = _context.sent;

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