'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var results, _headers, _data, headers, data, output, outputPos, ref, wb;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _3.default.elastic.getEsList(ctx.query, 'cmdb.device');

                        case 2:
                            results = _context.sent;
                            _headers = ['id', 'name', 'age', 'country', 'remark'];
                            _data = [{
                                id: '1',
                                name: 'test1',
                                age: '30',
                                country: 'China',
                                remark: 'hello'
                            }, {
                                id: '2',
                                name: 'test2',
                                age: '20',
                                country: 'America',
                                remark: 'world'
                            }, {
                                id: '3',
                                name: 'test3',
                                age: '18',
                                country: 'Unkonw',
                                remark: '???'
                            }];
                            headers = _headers
                            // 为 _headers 添加对应的单元格位置
                            // [ { v: 'id', position: 'A1' },
                            //   { v: 'name', position: 'B1' },
                            //   { v: 'age', position: 'C1' },
                            //   { v: 'country', position: 'D1' },
                            //   { v: 'remark', position: 'E1' } ]
                            .map(function (v, i) {
                                return (0, _assign2.default)({}, { v: v, position: String.fromCharCode(65 + i) + 1 });
                            })
                            // 转换成 worksheet 需要的结构
                            // { A1: { v: 'id' },
                            //   B1: { v: 'name' },
                            //   C1: { v: 'age' },
                            //   D1: { v: 'country' },
                            //   E1: { v: 'remark' } }
                            .reduce(function (prev, next) {
                                return (0, _assign2.default)({}, prev, (0, _defineProperty3.default)({}, next.position, { v: next.v }));
                            }, {});
                            data = _data
                            // 匹配 headers 的位置，生成对应的单元格数据
                            // [ [ { v: '1', position: 'A2' },
                            //     { v: 'test1', position: 'B2' },
                            //     { v: '30', position: 'C2' },
                            //     { v: 'China', position: 'D2' },
                            //     { v: 'hello', position: 'E2' } ],
                            //   [ { v: '2', position: 'A3' },
                            //     { v: 'test2', position: 'B3' },
                            //     { v: '20', position: 'C3' },
                            //     { v: 'America', position: 'D3' },
                            //     { v: 'world', position: 'E3' } ],
                            //   [ { v: '3', position: 'A4' },
                            //     { v: 'test3', position: 'B4' },
                            //     { v: '18', position: 'C4' },
                            //     { v: 'Unkonw', position: 'D4' },
                            //     { v: '???', position: 'E4' } ] ]
                            .map(function (v, i) {
                                return _headers.map(function (k, j) {
                                    return (0, _assign2.default)({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) });
                                });
                            })
                            // 对刚才的结果进行降维处理（二维数组变成一维数组）
                            // [ { v: '1', position: 'A2' },
                            //   { v: 'test1', position: 'B2' },
                            //   { v: '30', position: 'C2' },
                            //   { v: 'China', position: 'D2' },
                            //   { v: 'hello', position: 'E2' },
                            //   { v: '2', position: 'A3' },
                            //   { v: 'test2', position: 'B3' },
                            //   { v: '20', position: 'C3' },
                            //   { v: 'America', position: 'D3' },
                            //   { v: 'world', position: 'E3' },
                            //   { v: '3', position: 'A4' },
                            //   { v: 'test3', position: 'B4' },
                            //   { v: '18', position: 'C4' },
                            //   { v: 'Unkonw', position: 'D4' },
                            //   { v: '???', position: 'E4' } ]
                            .reduce(function (prev, next) {
                                return prev.concat(next);
                            })
                            // 转换成 worksheet 需要的结构
                            //   { A2: { v: '1' },
                            //     B2: { v: 'test1' },
                            //     C2: { v: '30' },
                            //     D2: { v: 'China' },
                            //     E2: { v: 'hello' },
                            //     A3: { v: '2' },
                            //     B3: { v: 'test2' },
                            //     C3: { v: '20' },
                            //     D3: { v: 'America' },
                            //     E3: { v: 'world' },
                            //     A4: { v: '3' },
                            //     B4: { v: 'test3' },
                            //     C4: { v: '18' },
                            //     D4: { v: 'Unkonw' },
                            //     E4: { v: '???' } }
                            .reduce(function (prev, next) {
                                return (0, _assign2.default)({}, prev, (0, _defineProperty3.default)({}, next.position, { v: next.v }));
                            }, {});
                            // 合并 headers 和 data

                            output = (0, _assign2.default)({}, headers, data);
                            // 获取所有单元格的位置

                            outputPos = (0, _keys2.default)(output);
                            // 计算出范围

                            ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
                            // 构建 workbook 对象

                            wb = {
                                SheetNames: ['mySheet'],
                                Sheets: {
                                    'mySheet': (0, _assign2.default)({}, output, { '!ref': ref })
                                }
                            };
                            // 导出 Excel


                            ctx.type = 'application/vnd.openxmlformats';
                            ctx.attachment("devices.xlsx");

                            ctx.body = _xlsx2.default.write(wb, { type: "buffer" });

                        case 14:
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