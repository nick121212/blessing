'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _createItem = require('./createItem');

var _createItem2 = _interopRequireDefault(_createItem);

var _getItem = require('./getItem');

var _getItem2 = _interopRequireDefault(_getItem);

var _removeItem = require('./removeItem');

var _removeItem2 = _interopRequireDefault(_removeItem);

var _updateItem = require('./updateItem');

var _updateItem2 = _interopRequireDefault(_updateItem);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = exports.routers = {
    'GET /': [_auth2.default.passport, _auth2.default.permission, _list2.default],
    'GET /:key': [_auth2.default.passport, _auth2.default.permission, _getItem2.default],
    'POST /': [_auth2.default.passport, _auth2.default.permission, _createItem2.default],
    'DELETE /:key': [_auth2.default.passport, _auth2.default.permission, _removeItem2.default],
    'PUT /:key': [_auth2.default.passport, _auth2.default.permission, _updateItem2.default]
};

var init = exports.init = function init(router, sequelizeModel) {};

var config = exports.config = {
    createItem: {},
    list: {},
    removeItem: {},
    updateItem: {
        removeAttributes: ["createdAt", "updatedAt"]
    },
    getItem: {}
};