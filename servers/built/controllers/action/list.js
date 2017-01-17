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
            var key, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.query.key;
                            _context.next = 3;
                            return sequelizeModel.findAndCountAll({
                                where: {
                                    key: key
                                },
                                include: [{
                                    model: _db2.default.models.pergroupaction,
                                    attributes: ['id'],
                                    where: {
                                        perGroupId: {
                                            $in: ctx.req.__groups__
                                        }
                                    }
                                }]
                            });

                        case 3:
                            result = _context.sent;


                            ctx.body = result;

                        case 5:
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