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

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel, config) {

    config = config || {};

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var curConfig, filter, attributes;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            curConfig = _2.default.mysql.getConfig(config, "/list/attrubutes");
                            filter = _2.default.mysql.query(ctx.query);
                            attributes = curConfig.attributes;


                            attributes && (filter.attributes = attributes);
                            _context.next = 6;
                            return sequelizeModel.findAndCountAll(filter);

                        case 6:
                            ctx.body = _context.sent;

                        case 7:
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