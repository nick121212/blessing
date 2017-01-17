'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _testItem = require('./testItem');

var _testItem2 = _interopRequireDefault(_testItem);

var _getExecuteCommandList = require('./getExecuteCommandList');

var _getExecuteCommandList2 = _interopRequireDefault(_getExecuteCommandList);

var _getExecuteCommandResultList = require('./getExecuteCommandResultList');

var _getExecuteCommandResultList2 = _interopRequireDefault(_getExecuteCommandResultList);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = exports.routers = {
    'POST /manual/test': [_auth2.default.passport, _auth2.default.permission, _testItem2.default],
    'GET /manual/execCmdList': [_auth2.default.passport, _auth2.default.permission, _getExecuteCommandList2.default],
    'GET /manual/execCmdResList': [_auth2.default.passport, _auth2.default.permission, _getExecuteCommandResultList2.default]
};

var init = exports.init = function init(router, sequelizeModel) {};

var config = exports.config = {
    createItem: {},
    list: {},
    removeItem: {},
    updateItem: {},
    getItem: {}
};