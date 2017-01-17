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

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _es = require('../../utils/es');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel) {
    /**
     * 创建模块数据
     */
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var filter, results;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            filter = _3.default.elastic.getEsQuery(ctx.query);


                            filter.esQuery.aggs = {
                                "count_success": {
                                    "terms": {
                                        "field": "success"
                                    }
                                }
                            };
                            _context.next = 4;
                            return _es.client.search({
                                index: "cmdb.execute.cmd",
                                from: filter.offset,
                                size: filter.limit,
                                body: filter.esQuery,
                                sort: filter.sort,
                                timeout: '10s'
                            });

                        case 4:
                            results = _context.sent;


                            ctx.body = results;

                        case 6:
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