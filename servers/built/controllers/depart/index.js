'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = exports.routers = {
    'GET /manual/tree': [_auth2.default.passport, _auth2.default.permission, _tree2.default]
};

var init = exports.init = function init(router, sequelizeModel) {};

var config = exports.config = {};