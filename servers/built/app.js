'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this = this;

        var server;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // 加载中间件
                        _middleware2.default.execute(_config2.default.middleware, app);
                        // 加载sequelize，初始化models
                        _context2.next = 3;
                        return _db2.default.execute(_config2.default.db, app);

                    case 3:
                        // 加载中间件
                        app.use(function () {
                            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                                var start;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:

                                                console.log(ctx.body);

                                                start = new Date();
                                                return _context.abrupt('return', next().then(function () {
                                                    var ms = new Date() - start;
                                                    console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');
                                                }));

                                            case 3:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x, _x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }());
                        // 初始化路由
                        _routers.router.execute(app);
                        // 初始化socket
                        server = _socket.socket.eventsIo.attach(app);
                        // spa server 启动

                        _context2.next = 8;
                        return (0, _spa2.default)(_config2.default, app.server);

                    case 8:
                        // 监听端口
                        app.listen(process.env.PORT || _config2.default.site.PORT || 3000, function () {
                            console.log("Server listening on %s", app.server._connectionKey);
                        });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('./utils/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _socket = require('./utils/socket');

var _db = require('./utils/db');

var _db2 = _interopRequireDefault(_db);

var _routers = require('./routers');

var _koaDocs = require('koa-docs');

var _koaDocs2 = _interopRequireDefault(_koaDocs);

var _spa = require('./spa');

var _spa2 = _interopRequireDefault(_spa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
process.on('unhandledRejection', function (reason, p) {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging, throwing an error, or other logic here
});

init();

exports.default = {
    app: app
};