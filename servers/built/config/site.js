'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return _lodash2.default.extend({}, {
        PORT: 3000,
        backup: _path2.default.resolve(__dirname, '../../../uploads/backup'),
        env: process.env.NODE_ENV,
        events: 'http://localhost:3000/events'
    }, config.site || {});
};