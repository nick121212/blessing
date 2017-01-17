"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _store = require("./store");

var _ad = require("./passports/ad");

var _ad2 = _interopRequireDefault(_ad);

var _gitlab = require("./passports/gitlab");

var _gitlab2 = _interopRequireDefault(_gitlab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return {
        middlewares: {
            "koa-better-error-handler": function koaBetterErrorHandler(app, errorHandler) {
                app.context.onerror = errorHandler;
            },
            "koa-better-body": [{
                fields: "body",
                files: true
            }],
            "koa-body": [{}],
            "koa-methodoverride": [],
            "koa-compress": [{
                filter: function filter(content_type) {
                    return (/text/i.test(content_type)
                    );
                },
                threshold: 2048,
                flush: require("zlib").Z_SYNC_FLUSH
            }],
            "koa-passport": function koaPassport(app, passport) {
                app.use(passport.initialize());
                app.use(passport.session());
                passport.serializeUser(function (u, done) {
                    done(null, u);
                });
                passport.deserializeUser(function () {
                    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id, done) {
                        return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        done(null, id);

                                    case 1:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                    };
                }());
                (0, _ad2.default)(passport, config.auth.ldap);
                (0, _gitlab2.default)(passport, config.auth.gitlab);
            },
            "koa-session2": [{
                key: "NICKTYUI",
                store: new _store.RedisStore()
            }],
            "koa-cors": [{
                methods: ["PUT", "GET", "POST", "DELETE", "HEAD"],
                origin: "*"
            }],
            "koa-static": function koaStatic(app, statuc) {
                app.use(statuc('.'));
            }
        },
        custom: {
            "error": function error(app) {
                app.use(function () {
                    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.prev = 0;
                                        _context2.next = 3;
                                        return next();

                                    case 3:
                                        if (ctx.status === 404) ctx.throw(404);
                                        _context2.next = 11;
                                        break;

                                    case 6:
                                        _context2.prev = 6;
                                        _context2.t0 = _context2["catch"](0);

                                        console.log("middlewares--", _context2.t0);
                                        if (_context2.t0.isBoom) {
                                            ctx.status = _context2.t0.output.statusCode;
                                        } else {
                                            ctx.status = _context2.t0.status || 500;
                                        }
                                        ctx.body = {
                                            msg: _context2.t0.body || _context2.t0.message,
                                            status: ctx.status,
                                            url: ctx.url,
                                            name: app.name,
                                            stack: app.env === "production" ? "" : _context2.t0.stack + "\n"
                                        };

                                    case 11:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, undefined, [[0, 6]]);
                    }));

                    return function (_x3, _x4) {
                        return _ref2.apply(this, arguments);
                    };
                }());
            }
        },
        order: ["koa-better-error-handler", "koa-methodoverride", "koa-compress", "koa-conditional-get", "koa-etag",
        // "koa-cors",
        // "koa-better-body",
        "koa-body", "koa-session2", "koa-passport", "koa-static", "error"]
    };
};