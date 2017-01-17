'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return _lodash2.default.extend({}, {
        port: 6379,
        host: '127.0.0.1',
        family: 4,
        password: '',
        db: 0
    }, config.redis || {});
};