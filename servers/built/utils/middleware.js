"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Middleware = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 管理中间件类
 * 执行中间件
 */
var Middleware = exports.Middleware = function () {
    function Middleware() {
        (0, _classCallCheck3.default)(this, Middleware);
    }

    (0, _createClass3.default)(Middleware, [{
        key: "error",
        value: function error(app) {
            var _this = this;

            return function () {
                var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return next();

                                case 3:
                                    if (ctx.status === 404) ctx.throw(404);
                                    _context.next = 11;
                                    break;

                                case 6:
                                    _context.prev = 6;
                                    _context.t0 = _context["catch"](0);

                                    if (_context.t0.isBoom) {
                                        ctx.status = _context.t0.output.statusCode;
                                    } else {
                                        ctx.status = _context.t0.status || 500;
                                    }
                                    ctx.body = {
                                        msg: _context.t0.body || _context.t0.message,
                                        status: ctx.status,
                                        url: ctx.url,
                                        stack: _context.t0.stack + "\n"
                                    };
                                    console.log(_context.t0);

                                case 11:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 6]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
        }
    }, {
        key: "execute",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(config, app) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                app.use(this.error());
                                _.each(config.order, function (key) {
                                    var middleware = config.middlewares[key];
                                    try {
                                        var module = require(key);

                                        if (module.default) {
                                            module = module.default;
                                        }
                                        if (middleware) {
                                            if (_.isArray(middleware)) {
                                                return app.use(module.apply(app, middleware));
                                            }

                                            if (_.isFunction(middleware)) {
                                                return middleware(app, module);
                                            }
                                        }

                                        app.use(module.apply(app, []));
                                    } catch (e) {
                                        middleware = config.custom[key];
                                        return middleware && middleware(app);
                                    }
                                });

                            case 2:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function execute(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return execute;
        }()
    }]);
    return Middleware;
}();

exports.default = new Middleware();