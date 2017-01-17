'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.client = undefined;

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = exports.client = new _elasticsearch2.default.Client({
    host: _config2.default.es.host + ':' + _config2.default.es.port,
    log: _config2.default.es.log
});

// setInterval(() => {
//     client.ping({
//         requestTimeout: Infinity,
//         hello: "elasticsearch!"
//     }).catch((err) => {
//         throw err;
//     });
// }, 10000);