'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaBetterRouter = require('koa-better-router');

var _koaBetterRouter2 = _interopRequireDefault(_koaBetterRouter);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    var router = (0, _koaBetterRouter2.default)({
        prefix: '/passport'
    });

    process.on("unhandledRejection", function (reason, p) {
        console.log("Unhandled Rejection at: Promise", reason);
    });

    router.addRoute('GET /login', [function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            ctx.logout();
                            throw _boom2.default.unauthorized("用户未登陆或没有权限!");

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }()]);
    // 默认ad域
    router.addRoute('POST /login', [function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _koaPassport2.default.authenticate("ActiveDirectory", function () {
                                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(err, user) {
                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    if (!(err === false)) {
                                                        _context2.next = 2;
                                                        break;
                                                    }

                                                    throw _boom2.default.create(402, user);

                                                case 2:
                                                    if (err) {
                                                        _context2.next = 4;
                                                        break;
                                                    }

                                                    throw _boom2.default.create(402, "用户名或密码不真确！");

                                                case 4:
                                                    ctx.login(err);

                                                    ctx.body = {};

                                                case 6:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined);
                                }));

                                return function (_x5, _x6) {
                                    return _ref3.apply(this, arguments);
                                };
                            }())(ctx);

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }(), function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            ctx.body = ctx.state.user;
                            _context4.next = 3;
                            return next();

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }()]);

    // gitlab第三方登陆
    router.addRoute('GET /auth/gitlab', [_koaPassport2.default.authenticate('gitlab')]);
    router.addRoute('GET /auth/gitlab/callback', [function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _koaPassport2.default.authenticate("gitlab", function () {
                                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(err, user) {
                                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    if (!(err === false)) {
                                                        _context5.next = 2;
                                                        break;
                                                    }

                                                    throw _boom2.default.create(402, user);

                                                case 2:
                                                    if (err) {
                                                        _context5.next = 4;
                                                        break;
                                                    }

                                                    throw _boom2.default.create(402, "用户名或密码不真确！");

                                                case 4:
                                                    ctx.login(err);
                                                    // ctx.body = {};
                                                    ctx.redirect("/");

                                                case 6:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, undefined);
                                }));

                                return function (_x11, _x12) {
                                    return _ref6.apply(this, arguments);
                                };
                            }())(ctx);

                        case 2:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function (_x9, _x10) {
            return _ref5.apply(this, arguments);
        };
    }(), function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            ctx.redirect("/");
                            // await next();

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        }));

        return function (_x13, _x14) {
            return _ref7.apply(this, arguments);
        };
    }()]);

    router.addRoute('POST /logout', [function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx) {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            ctx.logout();
                            ctx.redirect('/passport/login');

                        case 2:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, undefined);
        }));

        return function (_x15) {
            return _ref8.apply(this, arguments);
        };
    }()]);

    return router;
};