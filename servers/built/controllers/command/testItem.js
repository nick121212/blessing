'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

var _rabbitmq = require('../../utils/rabbitmq');

var _rabbitmq2 = _interopRequireDefault(_rabbitmq);

var _es = require('../../utils/es');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _db = require('../../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeModel) {
    /**
     * 创建模块数据
     */
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var modelIntance, command, queueItem, bodies, esRes, result, res, resultTimeout, resTimeout;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            modelIntance = ctx.request.body;

                            if (!((typeof modelIntance === 'undefined' ? 'undefined' : (0, _typeof3.default)(modelIntance)) !== "object")) {
                                _context.next = 3;
                                break;
                            }

                            throw _boom2.default.badData('数据没有填写完整!');

                        case 3:

                            // let command = await db.models.command.findOne({
                            //     where: {
                            //         key: modelIntance.command
                            //     }
                            // });

                            command = modelIntance.command;

                            if (command) {
                                _context.next = 6;
                                break;
                            }

                            throw _boom2.default.badData("没有找到命令或已删除！");

                        case 6:
                            queueItem = {
                                cmdid: (0, _nodeUuid2.default)(),
                                cmd: command.cmd,
                                listip: _lodash2.default.map(modelIntance.listIps, function (service) {
                                    return {
                                        deviceSn: service._source.deviceSn,
                                        ip: service._source.minionid
                                    };
                                }),
                                args: command.args || [],
                                cmdKey: command.key
                            };
                            bodies = [];


                            bodies.push({
                                index: {
                                    _index: "cmdb.execute.cmd",
                                    _type: "salt",
                                    _id: queueItem.cmdid
                                }
                            });
                            bodies.push({
                                command: command,
                                cmdKey: command.key,
                                devLen: modelIntance.listIps.length,
                                complete: false,
                                createdAt: Date.now()
                            });

                            _lodash2.default.each(modelIntance.listIps, function (device) {
                                bodies.push({
                                    index: {
                                        _index: "commdone.logs",
                                        _type: "cmd",
                                        _id: queueItem.cmdid + "#" + device._source.deviceSn
                                    }
                                });
                                bodies.push(_lodash2.default.extend({
                                    return: "",
                                    jid: queueItem.cmdid,
                                    success: null,
                                    deviceSn: device._source.deviceSn,
                                    minionid: device._source.minionid,
                                    hostname: device._source.hostname
                                }, {}));
                            });

                            _context.next = 13;
                            return _es.client.bulk({
                                body: bodies
                            });

                        case 13:
                            esRes = _context.sent;
                            _context.next = 16;
                            return _rabbitmq2.default.getQueue("cmdb.command", {});

                        case 16:
                            result = _context.sent;
                            _context.next = 19;
                            return result.ch.publish("amq.topic", 'salt.commands', new Buffer((0, _stringify2.default)(queueItem)), {
                                persistent: true
                            });

                        case 19:
                            res = _context.sent;
                            _context.next = 22;
                            return _rabbitmq2.default.getQueue("cmdb.execute.timeout", {});

                        case 22:
                            resultTimeout = _context.sent;
                            _context.next = 25;
                            return resultTimeout.ch.publish("amq.topic", 'cmdb.execute.timeout', new Buffer((0, _stringify2.default)(queueItem)), {
                                persistent: true
                            });

                        case 25:
                            resTimeout = _context.sent;
                            _context.next = 28;
                            return result.ch.close();

                        case 28:
                            _context.next = 30;
                            return resultTimeout.ch.close();

                        case 30:

                            ctx.body = {
                                result: res,
                                esRes: esRes,
                                queueItem: queueItem,
                                jid: queueItem.cmdid
                            };

                        case 31:
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