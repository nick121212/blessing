'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passport = require('./passport');

var _passport2 = _interopRequireDefault(_passport);

var _permission = require('./permission');

var _permission2 = _interopRequireDefault(_permission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    passport: _passport2.default,
    permission: _permission2.default
};