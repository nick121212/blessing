'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.init = exports.routers = undefined;

var _createItem = require('./createItem');

var _createItem2 = _interopRequireDefault(_createItem);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

var _koaMulter = require('koa-multer');

var _koaMulter2 = _interopRequireDefault(_koaMulter);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _koaMulter2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, __dirname + '/../../uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + _path2.default.extname(file.originalname));
    }
});

var routers = exports.routers = {};

var init = exports.init = function init(router, sequelizeModel) {
    var uploadObj = (0, _koaMulter2.default)({ storage: storage });

    router.addRoute("post", "/", [_auth2.default.passport(), uploadObj.single('image'), (0, _createItem2.default)()]);
    router.addRoute("post", "/excel", [_auth2.default.passport(), uploadObj.single('excel'), (0, _createItem2.default)()]);
};

var config = exports.config = {};