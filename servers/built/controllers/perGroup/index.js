'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

var _getTree = require('./getTree');

var _getTree2 = _interopRequireDefault(_getTree);

var _createItem = require('./createItem');

var _createItem2 = _interopRequireDefault(_createItem);

var _updateItem = require('./updateItem');

var _updateItem2 = _interopRequireDefault(_updateItem);

var _removeItem = require('./removeItem');

var _removeItem2 = _interopRequireDefault(_removeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = exports.routers = {
    'POST /': [_auth2.default.passport, _auth2.default.permission, _createItem2.default],
    'PUT /:key': [_auth2.default.passport, _auth2.default.permission, _updateItem2.default],
    'DELETE /:key': [_auth2.default.passport, _auth2.default.permission, _removeItem2.default],
    'GET /manual/modAndAct': [_auth2.default.passport, _auth2.default.permission, _getTree2.default]
};

var init = exports.init = function init(router, sequelizeModel) {};

var config = exports.config = {
    updateItem: {
        removeAttributes: ["createdAt", "updatedAt"]
    }
};