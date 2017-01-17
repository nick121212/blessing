'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    var err = function err() {
        throw _boom2.default.badData("没有操作权限!");
    };

    /**
     * 查找用户
     * 查找用户的角色
     * 查找角色的权限组
     * 查找权限组中的所有的操作
     * 与当前操作最对比
     */
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var actionKey, member, action, role, groups, perGroupAction;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            actionKey = ctx.req.headers['action-key'] || ctx.query['action-key'];
                            _context.next = 3;
                            return _db2.default.models.member.findOne({
                                where: {
                                    username: ctx.state.user.username
                                }
                            });

                        case 3:
                            member = _context.sent;

                            if (member) {
                                _context.next = 6;
                                break;
                            }

                            return _context.abrupt('return', err());

                        case 6:
                            _context.next = 8;
                            return _db2.default.models.action.findOne({
                                where: {
                                    key: actionKey
                                }
                            });

                        case 8:
                            action = _context.sent;
                            _context.next = 11;
                            return _db2.default.models.role.findOne({
                                where: {
                                    key: member.role
                                }
                            });

                        case 11:
                            role = _context.sent;

                            if (!(!action || !role || !_lodash2.default.isArray(role.groups) || !role.groups.length)) {
                                _context.next = 14;
                                break;
                            }

                            return _context.abrupt('return', err());

                        case 14:
                            _context.next = 16;
                            return _db2.default.models.pergroup.findAll({
                                attributes: ["id"],
                                where: {
                                    key: {
                                        $in: role.groups
                                    }
                                }
                            });

                        case 16:
                            groups = _context.sent;


                            ctx.req.__role__ = role;
                            ctx.req.__action__ = action;
                            ctx.req.__groups__ = _lodash2.default.map(groups, function (group) {
                                return group.id;
                            });

                            _context.next = 22;
                            return _db2.default.models.pergroupaction.findOne({
                                where: {
                                    actionId: action.id,
                                    perGroupId: {
                                        $in: ctx.req.__groups__
                                    }
                                }
                            });

                        case 22:
                            perGroupAction = _context.sent;

                            if (perGroupAction) {
                                _context.next = 25;
                                break;
                            }

                            return _context.abrupt('return', err());

                        case 25:
                            _context.next = 27;
                            return next();

                        case 27:
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