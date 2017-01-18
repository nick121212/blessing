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

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var ips = {};

    _.forEach(_os2.default.networkInterfaces(), function (network) {
        _.each(network, function (ipInfo) {
            !ips[ipInfo.family] && (ips[ipInfo.family] = []);
            ipInfo.address != "127.0.0.1" && ips[ipInfo.family].push(ipInfo.address);
        });
    });

    console.log(ips);

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            ctx.req.file && (ctx.req.file.staticUrl = "http://" + ips + ":3000/uploads/" + ctx.req.file.filename);

                            ctx.body = ctx.req.file;

                        case 2:
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