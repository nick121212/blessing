'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = exports.routers = {
    'GET /manual/ad': [_auth2.default.passport, _auth2.default.permission, _list2.default]
};

var init = exports.init = function init(router, sequelizeModel) {};

var config = exports.config = {};