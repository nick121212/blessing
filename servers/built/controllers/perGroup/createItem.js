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

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel) {
    /**
     * 创建模块数据
     */
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
            var modelIntance, actions, trans;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            modelIntance = ctx.request.body;
                            actions = modelIntance.actions;
                            _context2.next = 4;
                            return _db2.default.sequelize.transaction();

                        case 4:
                            trans = _context2.sent;

                            if (!((typeof modelIntance === 'undefined' ? 'undefined' : (0, _typeof3.default)(modelIntance)) !== "object")) {
                                _context2.next = 7;
                                break;
                            }

                            throw _boom2.default.badData('数据没有填写完整!');

                        case 7:

                            _3.default.mysql.checkUniqueFields(sequelizeModel, modelIntance);
                            _3.default.mysql.removeAttributes();

                            delete modelIntance.actions;
                            modelIntance.createdAt = Date.now();
                            modelIntance.groupActions = [];

                            _context2.prev = 12;
                            return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                                var perGroup;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return sequelizeModel.create(modelIntance, {
                                                    transaction: trans
                                                });

                                            case 2:
                                                perGroup = _context.sent;


                                                _lodash2.default.each(actions, function (action) {
                                                    _lodash2.default.each(action.actions, function (action) {
                                                        if (action.perGroupActions.length && action.perGroupActions[0].key === action.key) {
                                                            modelIntance.groupActions.push({
                                                                actionId: action.id,
                                                                perGroupId: perGroup.id
                                                            });
                                                        }
                                                    });
                                                });

                                                _context.next = 6;
                                                return _db2.default.models.pergroupaction.bulkCreate(modelIntance.groupActions, {
                                                    transaction: trans
                                                });

                                            case 6:
                                                _context.next = 8;
                                                return trans.commit();

                                            case 8:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            })(), 't0', 14);

                        case 14:
                            _context2.next = 21;
                            break;

                        case 16:
                            _context2.prev = 16;
                            _context2.t1 = _context2['catch'](12);
                            _context2.next = 20;
                            return trans.rollback();

                        case 20:
                            throw _context2.t1;

                        case 21:

                            ctx.body = {};

                        case 22:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[12, 16]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};