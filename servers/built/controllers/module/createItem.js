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

exports.default = function (sequelizeModel) {
    var uniqueFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    /**
     * 创建模块数据
     * 1、验证数据的合法性
     * 2、判断数据库中是否存在【key】的模块,有则报错
     * 3、判断父级模块是否存在,如果存在,而创建的模块又是父级模块,则报错
     * 4、更新数据库中的模块的左右值
     * 5、创建新数据,数据的左值=父级模块的右值,右值=父级模块的右值+2
     */
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var modelIntance, trans, findModel, parentModel, parentCount, newModel;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            modelIntance = ctx.request.body;
                            _context.next = 3;
                            return _db2.default.sequelize.transaction();

                        case 3:
                            trans = _context.sent;

                            if (!((typeof modelIntance === 'undefined' ? 'undefined' : (0, _typeof3.default)(modelIntance)) !== "object" || !modelIntance.title || !modelIntance.key)) {
                                _context.next = 6;
                                break;
                            }

                            throw _boom2.default.badData('数据没有填写完整!');

                        case 6:

                            _2.default.mysql.checkUniqueFields(sequelizeModel, modelIntance);

                            _context.next = 9;
                            return sequelizeModel.count({
                                where: {
                                    key: modelIntance.key
                                }
                            });

                        case 9:
                            findModel = _context.sent;

                            if (!findModel) {
                                _context.next = 12;
                                break;
                            }

                            throw _boom2.default.badData('\u5DF2\u7ECF\u5B58\u5728\u3010' + modelIntance.key + '\u3011\u7684\u6A21\u5757!');

                        case 12:
                            _context.next = 14;
                            return sequelizeModel.findOne({
                                where: {
                                    key: modelIntance.parentKey || ""
                                }
                            });

                        case 14:
                            parentModel = _context.sent;
                            _context.next = 17;
                            return sequelizeModel.count({
                                where: {
                                    lft: 1
                                }
                            });

                        case 17:
                            parentCount = _context.sent;

                            if (!(parentCount && !parentModel)) {
                                _context.next = 20;
                                break;
                            }

                            throw _boom2.default.badData('没有指定父节点!');

                        case 20:
                            _context.prev = 20;

                            if (!parentModel) {
                                _context.next = 30;
                                break;
                            }

                            _context.next = 24;
                            return _db2.default.sequelize.query('update module set lft=lft+2 where lft > $1;', {
                                transaction: trans,
                                bind: [parentModel.rgt]
                            });

                        case 24:
                            _context.next = 26;
                            return _db2.default.sequelize.query('update module set rgt=rgt+2 where rgt >= $1;', {
                                transaction: trans,
                                bind: [parentModel.rgt]
                            });

                        case 26:

                            modelIntance.lft = parentModel.rgt;
                            modelIntance.rgt = parentModel.rgt + 1;
                            _context.next = 32;
                            break;

                        case 30:
                            modelIntance.lft = 1;
                            modelIntance.rgt = 2;

                        case 32:
                            _context.next = 34;
                            return sequelizeModel.create(modelIntance, { transaction: trans });

                        case 34:
                            newModel = _context.sent;
                            _context.next = 37;
                            return trans.commit();

                        case 37:

                            ctx.body = newModel;
                            _context.next = 45;
                            break;

                        case 40:
                            _context.prev = 40;
                            _context.t0 = _context['catch'](20);
                            _context.next = 44;
                            return trans.rollback();

                        case 44:
                            throw _context.t0;

                        case 45:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[20, 40]]);
        }));

        return function (_x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
};