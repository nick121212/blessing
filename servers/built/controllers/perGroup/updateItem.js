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

var _db = require('../../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var key, model, actions, modelInstance, trans;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.params["key"];
                            model = ctx.request.body;
                            actions = model.actions;

                            if (key) {
                                _context.next = 5;
                                break;
                            }

                            throw _boom2.default.badData('key\u4E0D\u80FD\u4E3A\u7A7A!');

                        case 5:
                            _context.next = 7;
                            return sequelizeModel.findById(key);

                        case 7:
                            modelInstance = _context.sent;
                            _context.next = 10;
                            return _db2.default.sequelize.transaction();

                        case 10:
                            trans = _context.sent;

                            if (modelInstance) {
                                _context.next = 13;
                                break;
                            }

                            throw _boom2.default.badData('\u627E\u4E0D\u5230key:' + key + '\u7684\u6570\u636E\u6216\u8005\u5DF2\u5220\u9664!');

                        case 13:

                            _3.default.mysql.removeAttributes(model, sequelizeModel);

                            _context.prev = 14;

                            model.groupActions = [];
                            _context.next = 18;
                            return modelInstance.updateAttributes(model, {
                                transaction: trans
                            });

                        case 18:
                            modelInstance = _context.sent;

                            _lodash2.default.each(actions, function (action) {
                                _lodash2.default.each(action.actions, function (action) {
                                    if (action.perGroupActions.length && action.perGroupActions[0].key === action.key) {
                                        model.groupActions.push({
                                            actionId: action.id,
                                            perGroupId: modelInstance.id
                                        });
                                    }
                                });
                            });
                            _context.next = 22;
                            return _db2.default.sequelize.query('delete from ' + _db2.default.models.pergroupaction.name + ' where perGroupId=$1', {
                                transaction: trans,
                                bind: [modelInstance.id]
                            });

                        case 22:
                            _context.next = 24;
                            return _db2.default.models.pergroupaction.bulkCreate(model.groupActions, {
                                transaction: trans
                            });

                        case 24:
                            _context.next = 26;
                            return trans.commit();

                        case 26:
                            _context.next = 33;
                            break;

                        case 28:
                            _context.prev = 28;
                            _context.t0 = _context['catch'](14);
                            _context.next = 32;
                            return trans.rollback();

                        case 32:
                            throw _context.t0;

                        case 33:

                            ctx.body = {};

                        case 34:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[14, 28]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};