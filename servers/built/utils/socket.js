'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.events = exports.socket = exports.Socket = exports.CmdbEvents = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _koaSocket = require('koa-socket');

var _koaSocket2 = _interopRequireDefault(_koaSocket);

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

var _rabbitmq = require('./rabbitmq');

var _rabbitmq2 = _interopRequireDefault(_rabbitmq);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _es = require('./es');

var _jsonPointer = require('json-pointer');

var jsonPointer = _interopRequireWildcard(_jsonPointer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CmdbEvents = exports.CmdbEvents = function () {
    function CmdbEvents(socket) {
        (0, _classCallCheck3.default)(this, CmdbEvents);

        this.socket = socket;
        // this.getEvents();
        // this.checkExecuteTimeout();

        // limit=50&offset=0&page=1&where=%7B%7D
        // bool:{

        // }
    }

    (0, _createClass3.default)(CmdbEvents, [{
        key: 'checkExecuteTimeout',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                var _this = this;

                var result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _rabbitmq2.default.getQueue('job.done', {});

                            case 2:
                                result = _context4.sent;
                                _context4.next = 5;
                                return result.ch.prefetch(1);

                            case 5:
                                _context4.next = 7;
                                return result.ch.consume(result.q.queue, function () {
                                    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(msg) {
                                        var commandResult, where, a, commlogs;
                                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        commandResult = JSON.parse(msg.content.toString());
                                                        where = {};
                                                        a = {
                                                            where: {
                                                                "/field/missing/filter/constant_score/-/must/bool": "ip"
                                                            }
                                                        };


                                                        jsonPointer.set(where, "/field/missing/filter/constant_score/-/must/bool", "_stamp");
                                                        jsonPointer.set(where, "/jid/match/-/must/bool", commandResult.jobid);

                                                        _context3.next = 7;
                                                        return _controllers2.default.getEsList({
                                                            where: where
                                                        }, "commdone.logs");

                                                    case 7:
                                                        commlogs = _context3.sent;

                                                        if (!commlogs.hits.total) {
                                                            _context3.next = 10;
                                                            break;
                                                        }

                                                        return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
                                                            var resultTimeout;
                                                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                                while (1) {
                                                                    switch (_context2.prev = _context2.next) {
                                                                        case 0:
                                                                            _context2.next = 2;
                                                                            return _rabbitmq2.default.getQueue("cmdb.events", {});

                                                                        case 2:
                                                                            resultTimeout = _context2.sent;

                                                                            _lodash2.default.each(commlogs.hits.hits, function () {
                                                                                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(item) {
                                                                                    var queueItem, resTimeout;
                                                                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                                                                        while (1) {
                                                                                            switch (_context.prev = _context.next) {
                                                                                                case 0:
                                                                                                    queueItem = { "jid": commandResult.jobid, "retcode": 1, "return": "timeout", "success": false, "_stamp": new Date(), timeout: true, deviceSn: item._source.deviceSn };
                                                                                                    _context.next = 3;
                                                                                                    return resultTimeout.ch.publish("amq.topic", 'salt.events', new Buffer((0, _stringify2.default)(queueItem)), {
                                                                                                        persistent: true
                                                                                                    });

                                                                                                case 3:
                                                                                                    resTimeout = _context.sent;

                                                                                                case 4:
                                                                                                case 'end':
                                                                                                    return _context.stop();
                                                                                            }
                                                                                        }
                                                                                    }, _callee, _this);
                                                                                }));

                                                                                return function (_x2) {
                                                                                    return _ref3.apply(this, arguments);
                                                                                };
                                                                            }());
                                                                            _context2.next = 6;
                                                                            return resultTimeout.ch.close();

                                                                        case 6:
                                                                        case 'end':
                                                                            return _context2.stop();
                                                                    }
                                                                }
                                                            }, _callee2, _this);
                                                        })(), 't0', 10);

                                                    case 10:
                                                        _context3.next = 12;
                                                        return _es.client.update({
                                                            index: "cmdb.execute.cmd",
                                                            type: "salt",
                                                            id: commandResult.jobid,
                                                            body: {
                                                                doc: {
                                                                    complete: true
                                                                }
                                                            }
                                                        });

                                                    case 12:

                                                        result.ch.ack(msg);

                                                    case 13:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this);
                                    }));

                                    return function (_x) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());

                            case 7:
                                return _context4.abrupt('return', result);

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function checkExecuteTimeout() {
                return _ref.apply(this, arguments);
            }

            return checkExecuteTimeout;
        }()
    }, {
        key: 'getEvents',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                var _this2 = this;

                var result;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return _rabbitmq2.default.getQueue('job.res', {});

                            case 2:
                                result = _context6.sent;
                                _context6.next = 5;
                                return result.ch.prefetch(1);

                            case 5:
                                _context6.next = 7;
                                return result.ch.consume(result.q.queue, function () {
                                    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(msg) {
                                        var commandResult;
                                        return _regenerator2.default.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        commandResult = JSON.parse(msg.content.toString());

                                                        _this2.socket.eventsIo.broadcast("events", {
                                                            _id: commandResult.jid + '#' + commandResult.deviceSn,
                                                            _source: commandResult
                                                        });
                                                        result.ch.ack(msg);

                                                    case 3:
                                                    case 'end':
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, _this2);
                                    }));

                                    return function (_x3) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());

                            case 7:
                                return _context6.abrupt('return', result);

                            case 8:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getEvents() {
                return _ref4.apply(this, arguments);
            }

            return getEvents;
        }()
    }]);
    return CmdbEvents;
}();

var Socket = exports.Socket = function Socket() {
    (0, _classCallCheck3.default)(this, Socket);

    this.eventsIo = new _koaSocket2.default({
        namespace: 'events'
    });
    this.eventsIo.use(_auth2.default.passport);
};

var socket = exports.socket = new Socket();
var events = exports.events = new CmdbEvents(socket);