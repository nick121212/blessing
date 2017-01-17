"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nspa = require("nspa");

var _nspa2 = _interopRequireDefault(_nspa);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _setStatus = require("./controllers/spa/setStatus");

var _setStatus2 = _interopRequireDefault(_setStatus);

var _applyAuth = require("./controllers/spa/applyAuth");

var _applyAuth2 = _interopRequireDefault(_applyAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var gitlab = require('node-gitlab');

// var client = gitlab.create({
//     api: 'http://code.4nb.tech/api/v3',
//     privateToken: 'iEQ5A1269sJPz6LXsyUW'
// });

// client.repository.getTags({ id: 15 }, function(err, milestones) {
//     console.log(err, milestones);
// });

var initServer = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(spaServer, config) {
        var serverCompose;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        serverCompose = new _nspa2.default.Spa();
                        _context3.t0 = spaServer;
                        _context3.next = 4;
                        return (0, _setStatus2.default)(config);

                    case 4:
                        _context3.t1 = _context3.sent;

                        _context3.t0.attachRouteToSocket.call(_context3.t0, "setStatus", _context3.t1);

                        _context3.t2 = spaServer;
                        _context3.next = 9;
                        return (0, _applyAuth2.default)(config);

                    case 9:
                        _context3.t3 = _context3.sent;

                        _context3.t2.attachRouteToSocket.call(_context3.t2, "applyAuth", _context3.t3);

                        serverCompose.use(spaServer.attach(serverCompose));
                        serverCompose.use(function () {
                            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return next();

                                            case 2:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x3, _x4) {
                                return _ref2.apply(this, arguments);
                            };
                        }());
                        spaServer.on("onconnect", function (connection, connectionObject) {
                            connection.clientProxy.status && connection.clientProxy.status().onReady(function () {
                                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(result) {
                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _lodash2.default.extend(connectionObject, result);

                                                case 1:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined);
                                }));

                                return function (_x5) {
                                    return _ref3.apply(this, arguments);
                                };
                            }());
                        });
                        spaServer.on("ondisconnect", function (connection, connectionObject) {});

                    case 15:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function initServer(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var app = exports.app = new _nspa2.default.Spa();

exports.default = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(config, server) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        app.initServer(config.saltServer || {}, server);
                        _context4.next = 3;
                        return initServer(app.spaServer);

                    case 3:
                        return _context4.abrupt("return", app);

                    case 4:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();