"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _middleware = require("./middleware");

var _middleware2 = _interopRequireDefault(_middleware);

var _site = require("./site");

var _site2 = _interopRequireDefault(_site);

var _configUtils = require("./configUtils");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _lodash2.default.extend({}, _configUtils.config, {
    middleware: (0, _middleware2.default)(_configUtils.config),
    site: (0, _site2.default)(_configUtils.config),
    db: require('./db').default(_configUtils.config), //_.extend({}, config.db || {}, require('./db').default),
    es: require('./es').default(_configUtils.config), //_.extend({}, config.es || {}, require('./es').default),
    rabbitmq: require('./rabbitmq').default(_configUtils.config), // _.extend({}, config.rabbitmq || {}, require('./rabbitmq').default),
    redis: require('./redis').default(_configUtils.config) // _.extend({}, config.redis || {}, require('./redis').default)
});