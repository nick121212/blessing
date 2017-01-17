'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElasticUtils = exports.MysqlUtils = exports.CommonUtils = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _es = require('../utils/es');

var _jsonPointer = require('json-pointer');

var jsonPointer = _interopRequireWildcard(_jsonPointer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonUtils = function () {
    function CommonUtils() {
        (0, _classCallCheck3.default)(this, CommonUtils);
    }

    /**
     * 提取query中的数据
     */


    (0, _createClass3.default)(CommonUtils, [{
        key: 'query',
        value: function query(_query) {
            var filter = _query || {};

            filter = _lodash2.default.extend({
                limit: 10,
                offset: 0
            }, filter);

            if (filter.attributes && _lodash2.default.isArray(filter.attributes)) {
                !filter.attributes.length && delete filter.attributes;
            } else {
                delete filter.attributes;
            }

            filter.limit = ~~filter.limit;
            filter.offset = ~~filter.offset;
            filter.where && typeof filter.where === "string" && (filter.where = JSON.parse(filter.where));
            filter.suggest && typeof filter.suggest === "string" && (filter.suggest = JSON.parse(filter.suggest));
            if (_lodash2.default.isEmpty(filter.where)) {
                delete filter.where;
            }
            if (_lodash2.default.isEmpty(filter.suggest)) {
                delete filter.suggest;
            }

            if (filter.order) {
                var orders = filter.order.split('-');
                // 返回的order信息是  -key|key,前面带"-"的是倒序
                if (orders.length > 0) {
                    switch (orders.length) {
                        case 1:
                            orders.push("asc");
                            break;
                        case 2:
                            orders = _lodash2.default.reverse(orders);
                            orders[1] = "desc";
                            break;
                    }
                    filter.order = [orders];
                }
            }

            return filter;
        }

        /**
         * 获取模型的配置信息
         */

    }, {
        key: 'getConfig',
        value: function getConfig(config, jsonPpath) {
            if (jsonPointer.default.has(config, jsonPpath)) {
                return jsonPointer.default.get(config, jsonPpath) || {};
            }

            return {};
        }
    }]);
    return CommonUtils;
}();

exports.CommonUtils = CommonUtils;

var MysqlUtils = function (_CommonUtils) {
    (0, _inherits3.default)(MysqlUtils, _CommonUtils);

    function MysqlUtils() {
        (0, _classCallCheck3.default)(this, MysqlUtils);
        return (0, _possibleConstructorReturn3.default)(this, (MysqlUtils.__proto__ || (0, _getPrototypeOf2.default)(MysqlUtils)).call(this));
    }

    /**
     * 获取模型的主键和外键
     * @params Model {Object} Sequelize对象
     */


    (0, _createClass3.default)(MysqlUtils, [{
        key: 'getUniqueFields',
        value: function getUniqueFields(Model) {
            var uniqueFields = [];
            var primaryKey = "";

            _lodash2.default.forEach(Model.attributes, function (attr, key) {
                if (attr.unique) {
                    uniqueFields.push(key);
                }
                if (attr.primaryKey) {
                    primaryKey = key;
                }
            });

            return {
                uniqueFields: uniqueFields,
                primaryKey: primaryKey
            };
        }

        /**
         * 检测主键或者必填字段是否完整
         * @params Model {Object} Sequelize对象
         * @params modelIntance {Object} 模型实例
         */

    }, {
        key: 'checkUniqueFields',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(Model, modelIntance) {
                var _this2 = this;

                var _getUniqueFields, uniqueFields;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _getUniqueFields = this.getUniqueFields(Model), uniqueFields = _getUniqueFields.uniqueFields;

                                if (!(_lodash2.default.isArray(uniqueFields) && uniqueFields.length)) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                                    var where, findModel;
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    where = [];


                                                    _lodash2.default.each(uniqueFields, function (field) {
                                                        if (modelIntance[field]) {
                                                            where.push((0, _defineProperty3.default)({}, field, modelIntance[field]));
                                                        } else {
                                                            throw boom.badData('\u3010' + field + '\u3011\u6CA1\u6709\u586B\u5199\u5B8C\u6574!');
                                                        }
                                                    });

                                                    if (!where.length) {
                                                        _context.next = 8;
                                                        break;
                                                    }

                                                    _context.next = 5;
                                                    return Model.count({
                                                        where: {
                                                            $or: where
                                                        }
                                                    });

                                                case 5:
                                                    findModel = _context.sent;

                                                    if (!findModel) {
                                                        _context.next = 8;
                                                        break;
                                                    }

                                                    throw boom.badData('\u4E3B\u952E' + _lodash2.default.join(uniqueFields, ',') + '\u5DF2\u7ECF\u5B58\u5728!');

                                                case 8:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                })(), 't0', 3);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function checkUniqueFields(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return checkUniqueFields;
        }()

        /**
         * 删除配置中的字段
         * @params modelIntance  {Object} 数据模型实例
         * @params Model  {Object} Sequelize对象
         * @params removeAttributes {Array}  删除对属性数组
         */

    }, {
        key: 'removeAttributes',
        value: function removeAttributes(modelIntance, Model) {
            var _removeAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            _lodash2.default.forEach(modelIntance, function (val, key) {
                if (!Model.attributes.hasOwnProperty(key)) {
                    delete modelIntance[key];
                }
            });

            if (_lodash2.default.isArray(_removeAttributes)) {
                _lodash2.default.each(_removeAttributes, function (attr) {
                    delete modelIntance[attr];
                });
            }
        }
    }]);
    return MysqlUtils;
}(CommonUtils);

exports.MysqlUtils = MysqlUtils;

var ElasticUtils = function (_CommonUtils2) {
    (0, _inherits3.default)(ElasticUtils, _CommonUtils2);

    function ElasticUtils() {
        (0, _classCallCheck3.default)(this, ElasticUtils);
        return (0, _possibleConstructorReturn3.default)(this, (ElasticUtils.__proto__ || (0, _getPrototypeOf2.default)(ElasticUtils)).call(this));
    }

    (0, _createClass3.default)(ElasticUtils, [{
        key: 'getEsQuery',
        value: function getEsQuery(query) {
            var filter = this.query(query);
            var sort = [];
            var esQuery = {};

            !filter.where && (filter.where = {});
            !filter.suggest && (filter.suggest = {});
            // 处理搜索条件
            _lodash2.default.each(jsonPointer.dict(filter.where), function (d, key) {
                var path = jsonPointer.parse(key.replace(/\d/i, '-'));
                jsonPointer.set(esQuery, jsonPointer.compile(_lodash2.default.reverse(path)), d);
            });
            // 处理排序
            filter.order && _lodash2.default.each(filter.order, function (order) {
                if (_lodash2.default.isArray(order) && order.length == 2) {
                    sort.push([order[0]] + ':' + order[1]);
                }
            });

            filter.sort = sort;
            filter.esQuery = {};
            !_lodash2.default.isEmpty(esQuery) && (filter.esQuery = { query: esQuery });

            return filter;
        }
    }, {
        key: 'removeAttributes',
        value: function removeAttributes(modelIntance, _removeAttributes2) {
            _lodash2.default.each(_removeAttributes2, function (attr) {
                if (modelIntance.hasOwnProperty(attr)) {
                    delete modelIntance[attr];
                }
            });
        }

        /**
         * 搜索es数据
         */

    }, {
        key: 'getEsList',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(query, index) {
                var filter, results;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                filter = this.getEsQuery(query);
                                _context3.next = 3;
                                return _es.client.search({
                                    index: index,
                                    from: filter.offset,
                                    size: filter.limit,
                                    body: filter.esQuery,
                                    sort: filter.sort,
                                    searchType: 'dfs_query_then_fetch',
                                    timeout: '10s'
                                });

                            case 3:
                                results = _context3.sent;
                                return _context3.abrupt('return', results);

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getEsList(_x4, _x5) {
                return _ref2.apply(this, arguments);
            }

            return getEsList;
        }()
    }, {
        key: 'getEsSuggest',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(query, index) {
                var filter;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                filter = this.getEsQuery(query);

                                if (filter.suggest.text) {
                                    _context4.next = 3;
                                    break;
                                }

                                return _context4.abrupt('return', {});

                            case 3:
                                return _context4.abrupt('return', _es.client.suggest({
                                    index: index,
                                    body: {
                                        results: {
                                            text: filter.suggest.text,
                                            completion: {
                                                field: filter.suggest.field
                                            }
                                        }
                                    }
                                }));

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getEsSuggest(_x6, _x7) {
                return _ref3.apply(this, arguments);
            }

            return getEsSuggest;
        }()
    }, {
        key: 'setSuggest',
        value: function setSuggest(modelIntance, suggests) {
            _lodash2.default.forEach(suggests, function (valKey, key) {
                if (modelIntance[valKey]) {
                    if (_lodash2.default.isArray(modelIntance[valKey])) {
                        modelIntance[key] = {
                            input: modelIntance[valKey]
                        };
                    } else {
                        modelIntance[key] = {
                            input: [modelIntance[valKey]]
                        };
                    }
                }
            });
        }
    }]);
    return ElasticUtils;
}(CommonUtils);

exports.ElasticUtils = ElasticUtils;
exports.default = {
    mysql: new MysqlUtils(),
    elastic: new ElasticUtils()
};