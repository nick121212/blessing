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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var sql, groupIds, results;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            sql = [];
                            _context.next = 3;
                            return _db2.default.models.pergroup.findAll({
                                attributes: ["id"],
                                where: {
                                    key: { $in: ctx.req.__role__.groups || [] }
                                }
                            });

                        case 3:
                            groupIds = _context.sent;
                            _context.next = 6;
                            return _db2.default.models.module.findAll({
                                attributes: ["key"],
                                include: [{
                                    model: _db2.default.models.action,
                                    attributes: [],
                                    include: [{
                                        model: _db2.default.models.pergroupaction,
                                        attributes: [],
                                        where: {
                                            perGroupId: {
                                                $in: _lodash2.default.map(groupIds, function (item) {
                                                    return item.id;
                                                })
                                            }
                                        },
                                        required: true
                                    }]
                                }]
                            });

                        case 6:
                            results = _context.sent;


                            sql.push('select node.*,(count(parent.key)-1) as depth');
                            sql.push('  from module as node, module as parent');
                            sql.push('  where node.lft between parent.lft and parent.rgt');
                            sql.push('  and node.showed=true and node.key in ($1)');
                            sql.push('  group by node.key');
                            sql.push('  order by node.lft;');

                            _context.next = 15;
                            return _db2.default.sequelize.query(sql.join(''), {
                                bind: [_lodash2.default.map(results, function (res) {
                                    return res.key;
                                })]
                            });

                        case 15:
                            results = _context.sent;


                            ctx.body = results[0];

                        case 17:
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