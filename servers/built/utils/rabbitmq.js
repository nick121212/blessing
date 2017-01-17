'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _amqplib = require('amqplib');

var _amqplib2 = _interopRequireDefault(_amqplib);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionStr = 'amqp://' + _config2.default.rabbitmq.username + ':' + _config2.default.rabbitmq.password + '@' + _config2.default.rabbitmq.host;
var connPromise = _amqplib2.default.connect(connectionStr);

var channel = null;
var connection = null;

var getQueue = function getQueue(qName, qSetting) {
    var ch = null;

    return connPromise.then(function (conn) {
        connection = conn;
        return conn.createChannel();
    }).then(function (c) {
        channel = ch = c;
        return c.assertQueue(qName, _lodash2.default.extend({
            durable: true,
            exclusive: false,
            autoDelete: false
        }, qSetting));
    }).then(function (q) {
        return {
            ch: ch,
            q: q
        };
    });
};

exports.default = {
    getQueue: getQueue,
    cancel: function cancel(tag) {
        return channel.cancel(tag);
    }
};