'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _es = require('../../utils/es');

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Model, config) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var model, curConfig, type;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            model = ctx.request.body;
                            curConfig = _3.default.elastic.getConfig(config, "/createItem");
                            type = _lodash2.default.first(_lodash2.default.filter(curConfig.type, function (t, key) {
                                return key === model.deviceType;
                            }));

                            if (model.NO) {
                                _context.next = 5;
                                break;
                            }

                            throw _boom2.default.badData('\u56FA\u5B9A\u8D44\u4EA7\u7F16\u53F7\u4E0D\u80FD\u4E3A\u7A7A');

                        case 5:

                            // console.log("--------", curConfig.type, type, model.deviceType);

                            _3.default.elastic.removeAttributes(model, curConfig.removeAttributes);
                            _3.default.elastic.setSuggest(model, curConfig.suggest);

                            // model.model_suggest = {
                            //     input: [model.model]
                            // };
                            // model.brand_suggest = {
                            //     input: [model.brand]
                            // };

                            _context.next = 9;
                            return _es.client.create({
                                index: "cmdb.device",
                                type: type || "other",
                                id: model.NO,
                                body: model
                            });

                        case 9:
                            ctx.body = _context.sent;

                        case 10:
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