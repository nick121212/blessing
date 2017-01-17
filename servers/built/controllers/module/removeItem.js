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

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var key, trans, modelIntance;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.params["key"];

                            if (key) {
                                _context.next = 3;
                                break;
                            }

                            throw _boom2.default.badData('id\u4E0D\u80FD\u4E3A\u7A7A');

                        case 3:
                            _context.next = 5;
                            return _db2.default.sequelize.transaction();

                        case 5:
                            trans = _context.sent;
                            _context.next = 8;
                            return sequelizeModel.findOne({
                                where: {
                                    key: key
                                }
                            });

                        case 8:
                            modelIntance = _context.sent;

                            if (modelIntance) {
                                _context.next = 11;
                                break;
                            }

                            throw _boom2.default.badData('\u627E\u4E0D\u5230id:' + key + '\u7684\u6570\u636E\u6216\u8005\u5DF2\u5220\u9664!');

                        case 11:
                            _context.prev = 11;
                            _context.next = 14;
                            return _db2.default.sequelize.query('delete from module where lft between $1 and $2;', {
                                transaction: trans,
                                bind: [modelIntance.lft, modelIntance.rgt]
                            });

                        case 14:
                            _context.next = 16;
                            return _db2.default.sequelize.query('update module set lft=lft-$1 where lft > $2;', {
                                transaction: trans,
                                bind: [modelIntance.rgt - modelIntance.lft + 1, modelIntance.rgt]
                            });

                        case 16:
                            _context.next = 18;
                            return _db2.default.sequelize.query('update module set rgt=rgt-$1 where rgt > $2;', {
                                transaction: trans,
                                bind: [modelIntance.rgt - modelIntance.lft + 1, modelIntance.rgt]
                            });

                        case 18:
                            _context.next = 20;
                            return trans.commit();

                        case 20:
                            _context.next = 27;
                            break;

                        case 22:
                            _context.prev = 22;
                            _context.t0 = _context['catch'](11);
                            _context.next = 26;
                            return trans.rollback();

                        case 26:
                            throw _context.t0;

                        case 27:

                            ctx.body = modelIntance;

                        case 28:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[11, 22]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};