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
    var idField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var key, trans, modelInstance;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.params["key"];
                            _context.next = 3;
                            return _db2.default.sequelize.transaction();

                        case 3:
                            trans = _context.sent;

                            if (key) {
                                _context.next = 6;
                                break;
                            }

                            throw _boom2.default.badData('key\u4E0D\u80FD\u4E3A\u7A7A');

                        case 6:
                            _context.next = 8;
                            return sequelizeModel.findById(key);

                        case 8:
                            modelInstance = _context.sent;

                            if (modelInstance) {
                                _context.next = 11;
                                break;
                            }

                            throw _boom2.default.badData('\u627E\u4E0D\u5230key:' + key + '\u7684\u6570\u636E\u6216\u8005\u5DF2\u5220\u9664!');

                        case 11:
                            _context.prev = 11;
                            _context.next = 14;
                            return _db2.default.sequelize.query('delete from ' + _db2.default.models.pergroupaction.name + ' where perGroupId=$1', {
                                transaction: trans,
                                bind: [modelInstance.id]
                            });

                        case 14:
                            _context.next = 16;
                            return modelInstance.destroy({
                                transaction: trans
                            });

                        case 16:
                            _context.next = 18;
                            return trans.commit();

                        case 18:
                            _context.next = 25;
                            break;

                        case 20:
                            _context.prev = 20;
                            _context.t0 = _context['catch'](11);
                            _context.next = 24;
                            return trans.rollback();

                        case 24:
                            throw _context.t0;

                        case 25:

                            ctx.body = {};

                        case 26:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[11, 20]]);
        }));

        return function (_x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
};