'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db = require('../../utils/db');

var _db2 = _interopRequireDefault(_db);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var sql, filter, _ref2, depth, results;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            sql = [];
                            filter = _3.default.mysql.query(ctx.query);
                            _ref2 = filter.where || {}, depth = _ref2.depth;


                            sql.push('select node.lft,node.rgt,node.key,node.title,(count(parent.lft)-1) as depth');
                            sql.push('  from depart as node, depart as parent');
                            sql.push('  where node.lft between parent.lft and parent.rgt');
                            // sql.push('  and parent.rgt <=361');
                            sql.push('  group by node.key');
                            sql.push('  having count(parent.key)<$1');
                            sql.push('  order by node.lft;');

                            _context.next = 11;
                            return _db2.default.sequelize.query(sql.join(''), {
                                bind: [depth || 10000]
                                // bind: [_.map(results, (res) => { return res.key; })]
                            });

                        case 11:
                            results = _context.sent;


                            ctx.body = results[0];

                        case 13:
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