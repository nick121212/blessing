"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createItem = require("../apply/createItem");

var _createItem2 = _interopRequireDefault(_createItem);

var _getItem = require("../apply/getItem");

var _getItem2 = _interopRequireDefault(_getItem);

var _es = require("../../utils/es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var item, device, status;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            item = void 0, device = void 0;
                            _context.prev = 1;
                            _context.next = 4;
                            return _es.client.get({
                                index: 'cmdb.apply',
                                type: 'est-agent',
                                id: ctx.params.doc.id
                            });

                        case 4:
                            item = _context.sent;
                            _context.next = 9;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context["catch"](1);

                        case 9:
                            status = !item || !item.found ? false : item._source.status;
                            _context.next = 12;
                            return _es.client.index({
                                index: 'cmdb.apply',
                                type: 'est-agent',
                                id: ctx.params.doc.id,
                                body: {
                                    id: ctx.params.doc.id,
                                    ips: ctx.params.ips["IPv4"],
                                    hostname: ctx.params.hostname,
                                    status: status,
                                    lastCheck: Date.now()
                                }
                            });

                        case 12:
                            item = _context.sent;

                            ctx.body = status;

                            _context.next = 16;
                            return next();

                        case 16:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[1, 7]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};