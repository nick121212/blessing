'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

var _createItem = require('./createItem');

var _createItem2 = _interopRequireDefault(_createItem);

var _removeItem = require('./removeItem');

var _removeItem2 = _interopRequireDefault(_removeItem);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = exports.routers = {
    'POST /': [_auth2.default.passport, _auth2.default.permission, _createItem2.default],
    'DELETE /:key': [_auth2.default.passport, _auth2.default.permission, _removeItem2.default],
    'GET /all/menu': [_auth2.default.passport, _auth2.default.permission, _menu2.default],
    'POST /manual/crud': [_auth2.default.passport, _auth2.default.permission, _crud2.default]
};

var init = exports.init = function init(router, sequelizeModel) {};

var config = exports.config = {
    createItem: {},
    list: {},
    updateItem: {}
};