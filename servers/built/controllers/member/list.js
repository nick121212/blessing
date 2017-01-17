'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _db = require('../../utils/db');

var _db2 = _interopRequireDefault(_db);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _activedirectory = require('activedirectory');

var _activedirectory2 = _interopRequireDefault(_activedirectory);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var ad = new _activedirectory2.default(_config2.default.auth.ldap);
    var findUsers = _bluebird2.default.promisify(ad.findUsers, { context: ad });

    // findUsers({
    //     sizeLimit: 20,
    //     filter: `(|(userPrincipalName=51031695*)(employeeID=51031695))`
    // }).then((dd) => {
    //     console.log(dd);
    // });

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var filter, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            filter = _2.default.mysql.query(ctx.query);
                            _context.next = 3;
                            return findUsers({
                                sizeLimit: 20,
                                filter: '(|(userPrincipalName=' + filter.suggest.text + '*)(employeeID=' + filter.suggest.text + '))'
                            });

                        case 3:
                            result = _context.sent;


                            ctx.body = {
                                rows: result
                            };

                        case 5:
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