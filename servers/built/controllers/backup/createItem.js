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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return new _bluebird2.default(function (resolve, reject) {
                                var tool = new _mysqlTools2.default();

                                tool.dumpDatabase({
                                    host: _config2.default.db.options.host,
                                    user: _config2.default.db.username,
                                    password: _config2.default.db.password,
                                    database: _config2.default.db.database,
                                    dumpPath: _path2.default.join(_config2.default.db.backup, Date.now().toString() + ".sql")
                                }, function (error, output, message, dumpFileName) {
                                    if (error instanceof Error) {
                                        reject(error);
                                    } else {
                                        resolve();
                                    }
                                });
                            });

                        case 2:

                            ctx.body = { ret: 0 };

                        case 3:
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