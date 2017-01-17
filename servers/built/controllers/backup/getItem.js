'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mysqlTools = require('mysql-tools');

var _mysqlTools2 = _interopRequireDefault(_mysqlTools);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var key;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            key = ctx.params["key"];

                            if (!_fs2.default.existsSync(_path2.default.join(_config2.default.db.backup, key))) {
                                _context.next = 7;
                                break;
                            }

                            ctx.set('Content-disposition', 'inline; filename=' + key);
                            ctx.set('Content-type', 'application/sql');

                            ctx.body = _fs2.default.readFileSync(_path2.default.join(_config2.default.db.backup, key));
                            _context.next = 8;
                            break;

                        case 7:
                            throw boom.badData('\u6CA1\u6709\u627E\u5230\u6587\u4EF6\uFF01');

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};